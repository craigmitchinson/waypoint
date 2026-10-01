// Command: one screen. The quarter's position in the band, everything that needs a decision on the
// left, and the squads, the sprint and the benefit year on the right. Every rule here is the
// engine's; nothing is worked twice.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDataset } from "../store/useDataset";
import { buildContext, sprintEnd, sprintStart } from "../engine/context";
import { absenceMW, isSickness, weekDays } from "../engine/capacity";
import { addDays, MONTHS, networkdays } from "../engine/dates";
import { benefitCalendar, benefitValue } from "../engine/value";
import { deliveryStatuses } from "../engine/delivery";
import { commitment, counts, inPlan } from "../engine/work";
import Section from "./Section";
import { workPath } from "./WorkItem";
import { Band, MonthBars, Pill, Stat } from "../ui";
import type { PillTone } from "../ui";
import "./command.css";

const mw = (n: number) => n.toFixed(1) + " MW";
const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
const pct = (n: number) => Math.round(n * 100) + "%";
const days = (n: number) => (Math.round(n * 10) / 10).toString();
const shortDate = (d: Date) => d.getUTCDate() + " " + MONTHS[d.getUTCMonth()];

interface Decision {
  tone: PillTone;
  label: string;
  text: string;
  to: string;
}

/** The order the decision sections are read in; the first two with rows stand open. */
const SECTIONS = ["Over capacity", "Late", "At risk", "Sickness this sprint", "Unassigned",
  "Ready, not committed", "Spikes to conclude"];

export default function Command() {
  const { data, view, source } = useDataset();
  const ctx = useMemo(() => buildContext(data), [data]);
  const net = view.net_total;
  const committed = view.committed_total.value;
  const reserved = view.reservations.reserved_total;
  const inSquads = data.people.filter((p) => p.squad).length;
  const recorded = data.work
    .filter((w) => inPlan(ctx, w))
    .reduce((t, w) => t + benefitValue(ctx, w).recorded, 0);

  const statuses = useMemo(() => deliveryStatuses(ctx), [ctx]);

  // Outside the quarter there is no current sprint to report on, so the card reads the nearest one.
  const sprintNum = Math.min(Math.max(ctx.currentSprint, ctx.firstSprint), ctx.lastSprint);
  const sStart = sprintStart(ctx, sprintNum);
  const sEnd = sprintEnd(ctx, sprintNum);
  const sickness = absenceMW(ctx, { type: "Sick", from: sStart, to: sEnd });
  const quarterAbsence = absenceMW(ctx).mw;

  // Everything a planner would have to act on today: squads over their limit, work that will not
  // land, work we have promised with nobody on it, work ready but uncommitted, and open spikes.
  const attention: Decision[] = [];
  for (const row of view.squads.rows) {
    if (row.utilisation > data.settings.utilisationBad) {
      attention.push({
        tone: "bad",
        label: "Over capacity",
        text: row.name + " is Red: " + pct(row.utilisation) + " of its net capacity is committed.",
        to: "/team",
      });
    }
  }
  for (const item of data.work) {
    const status = statuses.get(item.title) ?? "";
    if (status === "Late" || status.startsWith("At risk")) {
      attention.push({
        tone: status === "Late" ? "bad" : "warn",
        label: status === "Late" ? "Late" : "At risk",
        text: item.title + " is " + status + ".",
        to: workPath(item.title),
      });
    }
  }
  for (const [name, lost] of Object.entries(sickness.byPerson)) {
    attention.push({
      tone: "warn",
      label: "Sickness this sprint",
      text: name + " is off sick for " + days(lost.days) + (lost.days === 1 ? " day" : " days")
        + " this sprint, " + mw(lost.mw) + " lost.",
      to: "/team",
    });
  }
  for (const item of data.work) {
    if (counts(ctx, item) && commitment(item) === "Committed" && item.assignees.length === 0) {
      attention.push({
        tone: "warn",
        label: "Unassigned",
        text: item.title + " is committed with nobody on it.",
        to: workPath(item.title),
      });
    }
  }
  for (const item of data.work) {
    if (item.state === "Ready" && item.proposed) {
      attention.push({
        tone: "neutral",
        label: "Ready, not committed",
        text: item.title + " is Ready but still proposed.",
        to: workPath(item.title),
      });
    }
  }
  for (const item of data.work) {
    if (item.kind === "Spike" && !item.spikeOutcome
      && (item.state === "In discovery" || item.state === "Ready")) {
      attention.push({
        tone: "neutral",
        label: "Spikes to conclude",
        text: item.title + " is an open spike with no outcome recorded.",
        to: workPath(item.title),
      });
    }
  }

  const groups = SECTIONS
    .map((label) => ({ label, rows: attention.filter((a) => a.label === label) }))
    .filter((g) => g.rows.length > 0);

  // The first two sections with anything in them open; the rest are one press away.
  const [turned, setTurned] = useState<string[]>([]);
  const toggle = (label: string) => setTurned(
    (all) => (all.includes(label) ? all.filter((l) => l !== label) : [...all, label]),
  );

  const utilTone = (u: number): "good" | "warn" | "bad" => {
    if (u > data.settings.utilisationBad) return "bad";
    if (u > data.settings.utilisationWarn) return "warn";
    return "good";
  };

  // currentSprint counts from the epoch, so the quarter's own position is the offset from its
  // first sprint; outside the quarter there is no sprint to name.
  const sprintInQuarter = ctx.currentSprint - ctx.firstSprint + 1;
  const inQuarter = sprintInQuarter >= 1 && sprintInQuarter <= ctx.sprints;
  const position = sprintInQuarter < 1
    ? "before the quarter"
    : sprintInQuarter > ctx.sprints
      ? "after the quarter"
      : "sprint " + sprintInQuarter + " of " + ctx.sprints;

  const daysLeft = networkdays(ctx.today > sStart ? ctx.today : sStart, sEnd);
  const mondays: Date[] = [];
  for (let d = sStart; d <= sEnd; d = addDays(d, 7)) mondays.push(d);
  const openDays = data.people
    .filter((p) => p.squad)
    .reduce((t, p) => t + mondays.reduce((w, m) => w + weekDays(ctx, p.name, m).free, 0), 0);
  const inSprint = (p: { name: string }, sick: boolean) => (ctx.absenceSpans[p.name] ?? []).some(
    (a) => a.from <= sEnd && a.to >= sStart && isSickness(a.type) === sick,
  );
  const onSick = data.people.filter((p) => inSprint(p, true)).length;
  const onLeave = data.people.filter((p) => inSprint(p, false)).length;
  const sprintWorkingDays = networkdays(sStart, sEnd);
  const sprintCaption = "S" + (sprintNum - ctx.firstSprint + 1) + " · " + shortDate(sStart)
    + " to " + shortDate(sEnd) + " · " + sprintWorkingDays + " working days";

  const squads = view.squads.rows
    .map((row) => ({
      ...row,
      lead: data.squads.find((s) => s.name === row.name)?.lead ?? "",
      people: data.people.filter((p) => p.squad === row.name).length,
      tone: utilTone(row.utilisation),
    }))
    .sort((a, b) => b.utilisation - a.utilisation);

  const calendar = useMemo(() => benefitCalendar(ctx), [ctx]);
  const totals = calendar.totals;
  const thisMonth = ctx.today.getUTCFullYear() === calendar.year ? ctx.today.getUTCMonth() + 1 : 0;

  return (
    <Section
      eyebrow={view.quarter + " · " + position
        + (inQuarter ? " · " + daysLeft + " days left" : "")}
      title="Command"
      lede="The quarter's position, and what needs a decision today."
      actions={(
        <>
          <Pill tone="brand">{source}</Pill>
          <Link className="wp-command-action" to="/quarter-close">Close the quarter</Link>
        </>
      )}
    >
      <div className="wp-command">
        <Band kicker="Capacity this quarter">
          <Stat
            onBrand
            label="Available"
            value={net.toFixed(1)}
            unit="MW"
            sub={inSquads + " people · " + view.squads.rows.length + " squads · "
              + mw(quarterAbsence) + " lost to absence"}
          />
          <Stat
            onBrand
            label="Committed"
            value={committed.toFixed(1)}
            unit="MW"
            sub={(
              <>
                {pct(net ? committed / net : 0) + " of available"}
                <span className="wp-command-util">
                  <span
                    className="wp-command-util__fill"
                    style={{ width: Math.min(100, Math.round((net ? committed / net : 0) * 100)) + "%" }}
                  />
                </span>
              </>
            )}
          />
          <Stat
            onBrand
            tone="accent"
            label="Remaining"
            value={(net - committed - reserved).toFixed(1)}
            unit="MW"
            sub={mw(reserved) + " held in reservations"}
          />
          <Stat
            onBrand
            label="Value in-year"
            value={gbp(view.compare.rows.gbp_in_year.b)}
            sub="Claims pro-rated by landing month"
          />
          <Stat
            onBrand
            label="Value recorded"
            value={gbp(recorded)}
            sub="Actuals against the claims that have landed"
          />
          <Stat
            onBrand
            label="On time"
            value={pct(view.delivery.on_time_pct)}
            sub={view.delivery.on_time + " of " + view.delivery.delivered + " delivered"}
          />
        </Band>

        <div className="wp-command-cols">
          <section className="wp-card wp-command-decisions">
            <h2 className="wp-card-title">Decisions</h2>
            <div className="wp-command-decisions__body">
              {groups.length === 0 ? (
                <p>Nothing is over capacity, late, unassigned or waiting on a decision.</p>
              ) : groups.map((group, i) => {
                const open = (i < 2) !== turned.includes(group.label);
                return (
                  <div className="wp-command-group" key={group.label}>
                    <h3>
                      <button
                        type="button"
                        className="wp-command-group__head"
                        aria-expanded={open}
                        onClick={() => toggle(group.label)}
                      >
                        <span aria-hidden="true" className="wp-command-group__mark">
                          {open ? "−" : "+"}
                        </span>
                        {group.label}
                        <span className="wp-command-group__count">{group.rows.length}</span>
                      </button>
                    </h3>
                    {open ? (
                      <ul className="wp-command-rows">
                        {group.rows.map((row) => (
                          <li key={row.label + row.text}>
                            <Pill tone={row.tone}>{row.label}</Pill>
                            <span className="wp-command-rows__text">{row.text}</span>
                            <Link to={row.to}>Open</Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <div className="wp-command-right">
            <section className="wp-card wp-command-squads">
              <h2 className="wp-card-title">Squads</h2>
              <ul>
                {squads.map((squad) => (
                  <li key={squad.name}>
                    <Link to="/team">{squad.name}</Link>
                    <span className="wp-command-squads__people">
                      {squad.people} {squad.people === 1 ? "person" : "people"}
                    </span>
                    <span className="wp-util-bar wp-command-squads__bar">
                      <span
                        className={"wp-util-bar__fill wp-util-bar__fill--" + squad.tone}
                        style={{ width: Math.min(100, Math.round(squad.utilisation * 100)) + "%" }}
                      />
                    </span>
                    <span className="wp-command-squads__pct">{pct(squad.utilisation)}</span>
                    <span className="wp-command-squads__mw">
                      {mw(squad.committed) + " of " + mw(squad.net)}
                    </span>
                  </li>
                ))}
              </ul>
              <table className="sr-only">
                <caption>Each squad's net capacity, committed MW and utilisation this quarter.</caption>
                <thead>
                  <tr>
                    <th scope="col">Squad</th>
                    <th scope="col">Lead</th>
                    <th scope="col">People</th>
                    <th scope="col">Net MW</th>
                    <th scope="col">Committed MW</th>
                    <th scope="col">Utilisation</th>
                  </tr>
                </thead>
                <tbody>
                  {squads.map((squad) => (
                    <tr key={squad.name}>
                      <th scope="row">{squad.name}</th>
                      <td>{squad.lead}</td>
                      <td>{squad.people}</td>
                      <td>{mw(squad.net)}</td>
                      <td>{mw(squad.committed)}</td>
                      <td>{pct(squad.utilisation)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="wp-card wp-command-sprint">
              <h2 className="wp-card-title">
                This sprint
                <Link to="/timeline">Timeline</Link>
              </h2>
              <p className="wp-command-sprint__dates">{sprintCaption}</p>
              <dl className="wp-command-sprint__stats">
                <div>
                  <dt>Days left</dt>
                  <dd>{daysLeft}</dd>
                </div>
                <div>
                  <dt>Open days</dt>
                  <dd>{days(openDays)}</dd>
                </div>
                <div>
                  <dt>Sick</dt>
                  <dd>{onSick}</dd>
                </div>
                <div>
                  <dt>Leave</dt>
                  <dd>{onLeave}</dd>
                </div>
              </dl>
            </section>

            <section className="wp-card wp-command-benefits">
              <h2 className="wp-card-title">
                {"Benefits " + calendar.year}
                <Link to="/benefits">Benefits calendar</Link>
              </h2>
              <MonthBars
                label={"Benefit by month in " + calendar.year}
                months={calendar.months}
                values={totals.gbpByMonth}
                cumulative={totals.gbpCumulative}
                target={totals.gbpTarget}
                currentMonth={thisMonth}
                format={gbp}
                caption={(
                  <span>
                    {gbp(totals.gbpCumulative[11]) + " of " + gbp(totals.gbpTarget[11])
                      + " by year end"}
                  </span>
                )}
              />
            </section>
          </div>
        </div>
      </div>
    </Section>
  );
}
