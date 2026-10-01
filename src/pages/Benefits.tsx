// Benefits: the roll-up from outcome to feature, the actuals recorded against the claims, and
// the summary by benefit type. The workbook's Roll-up and Benefits sheets, on one £ basis: claimed is
// the full year, in-year is claimed pro-rated by landing month, recorded values the actuals the same
// way. Counted work only, and never split by funding.
import { Fragment, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "./Section";
import { workPath } from "./WorkItem";
import { useDataset } from "../store/useDataset";
import { BENEFIT_TYPES, CLAIM_COLUMN, knownYears, outcomeOfEpic } from "../store/validate";
import { buildContext } from "../engine/context";
import { MONTHS } from "../engine/dates";
import { benefitCalendar, benefitValue, claimShare, gradeRate } from "../engine/value";
import type { CalendarRow } from "../engine/value";
import { commitment, inPlan, workMW } from "../engine/work";
import type { BenefitActual, WorkItem } from "../model/types";
import { Band, ConfirmDialog, DataTable, Drawer, Field, Pill, Stat, Toolbar } from "../ui";
import type { Column } from "../ui";
import "./benefits.css";

type Tab = "rollup" | "calendar" | "actuals" | "types";

const TABS: [Tab, string][] = [
  ["rollup", "Roll-up"],
  ["calendar", "Benefits calendar"],
  ["actuals", "Benefits actuals"],
  ["types", "By benefit type"],
];

const NO_OUTCOME = "Outcome not set";

export const gbp = (n: number): string => new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: Math.abs(n) < 1000 ? 2 : 0,
}).format(n);

const fte = (n: number) => n.toFixed(1);
const pct = (n: number) => Math.round(n * 100) + "%";

/** What one row of the roll-up is worth, whichever level it sits at. */
interface Totals {
  fte: number;
  others: number;
  inYear: number;
  recorded: number;
}

const ZERO: Totals = { fte: 0, others: 0, inYear: 0, recorded: 0 };

const add = (a: Totals, b: Totals): Totals => ({
  fte: a.fte + b.fte,
  others: a.others + b.others,
  inYear: a.inYear + b.inYear,
  recorded: a.recorded + b.recorded,
});

const blankActual = (): BenefitActual => ({
  title: "", type: BENEFIT_TYPES[0], value: "", when: "", note: "",
});

/** An actual is a number when it reads as one, and the words typed otherwise ("In progress"). */
const readValue = (text: string): number | string => {
  const trimmed = text.trim();
  if (trimmed === "") return "";
  const num = Number(trimmed);
  return trimmed === String(num) ? num : trimmed;
};

/** The month a row's claim starts paying in: 1 before the year, 13 after it or with no landing. */
const landingIndex = (row: CalendarRow, year: number): number => {
  if (!row.lands) return 13;
  const [month, landed] = row.lands.split(" ");
  if (Number(landed) < year) return 1;
  if (Number(landed) > year) return 13;
  return MONTHS.indexOf(month) + 1;
};

/** What one row accrues in one month: its FTE at the grade rate, plus its share of cost avoidance. */
const gbpInMonth = (row: CalendarRow, year: number, m: number): number => {
  const index = landingIndex(row, year);
  if (m + 1 < index) return 0;
  const months = 13 - index;
  const avoidance = row.gbpInYear - row.fteInYear * row.gradeRate;
  return (row.fteByMonth[m] * row.gradeRate) / 12 + (months > 0 ? avoidance / months : 0);
};

export default function Benefits() {
  const store = useDataset();
  const { data } = store;
  const ctx = useMemo(() => buildContext(data), [data]);

  const [tab, setTab] = useState<Tab>("rollup");
  const [year, setYear] = useState("");
  const [calYear, setCalYear] = useState(String(data.settings.benefitYear));
  const [measure, setMeasure] = useState<"fte" | "gbp">("fte");
  const [squad, setSquad] = useState("");
  const [openOutcomes, setOpenOutcomes] = useState<string[]>([]);
  const [openEpics, setOpenEpics] = useState<string[]>([]);

  const [open, setOpen] = useState(false);
  const [actual, setActual] = useState<BenefitActual>(blankActual);
  const [valueText, setValueText] = useState("");
  const [index, setIndex] = useState(-1);
  const [message, setMessage] = useState("");
  const [removing, setRemoving] = useState(false);

  const landsIn = (item: WorkItem) => String(item.landingYear ?? data.settings.benefitYear);

  // Calendar: the benefit years the work names, and the settings year, whether work lands in it or not
  const calendarYears = [...new Set([
    data.settings.benefitYear,
    ...data.work.map((w) => w.landingYear).filter((y): y is number => Boolean(y)),
  ])].sort((a, b) => a - b);
  const calendar = useMemo(() => benefitCalendar(ctx, Number(calYear)), [ctx, calYear]);
  // the totals count the plan, so the rows under them do too; a row with nothing in-year is left out
  const calendarRows = calendar.rows.filter((r) => r.inPlan
    && (r.fteInYear !== 0 || r.gbpInYear !== 0 || (!r.lands && r.fteClaimed !== 0))
    && (!squad || r.squad === squad));
  // landing month first, title second; a claim with no landing month falls to its own group
  const datedRows = calendarRows
    .filter((r) => r.lands)
    .sort((a, b) => landingIndex(a, calendar.year) - landingIndex(b, calendar.year)
      || a.title.localeCompare(b.title, "en-GB"));
  const undatedRows = calendarRows
    .filter((r) => !r.lands)
    .sort((a, b) => a.title.localeCompare(b.title, "en-GB"));
  const today = new Date();
  const currentMonth = today.getFullYear() === calendar.year ? today.getMonth() : -1;
  const landingCount = calendarRows
    .filter((r) => r.lands?.endsWith(String(calendar.year))).length;

  // odd months (Jan, Mar, …) carry a faint tint so the columns read as bands
  const bandClass = (m: number) => (m % 2 === 0 ? " wp-cal-cell--band" : "");

  const cellText = (row: CalendarRow, m: number): string => {
    const value = measure === "fte" ? row.fteByMonth[m] : gbpInMonth(row, calendar.year, m);
    if (measure === "fte" ? Math.abs(value) < 0.05 : Math.abs(value) < 0.5) return "·";
    return measure === "fte" ? fte(value) : gbp(value);
  };

  /** Both readings of a live month cell, whichever one is not shown. */
  const cellTitle = (row: CalendarRow, m: number): string => {
    const inMonth = gbpInMonth(row, calendar.year, m);
    return `${calendar.months[m]} ${calendar.year} · ${fte(row.fteByMonth[m])} FTE · `
      + `${gbp(inMonth)} accrued this month · ${gbp(row.gbpInYear)} in-year`;
  };

  /** One line of the calendar: the item and its caption, then the FTE live in each month. */
  const calendarLine = (row: CalendarRow) => {
    const index = landingIndex(row, calendar.year);
    return (
      <tr key={row.title} className={row.lands ? undefined : "wp-cal-row--undated"}>
        <th scope="row" title={row.title}>
          <Link to={workPath(row.title)}>{row.title}</Link>
          <span className="wp-cal-row__meta">
            {`${row.squad} · ${row.lands ? `lands ${row.lands}` : "not yet dated"} · `}
            {gbp(row.gbpInYear)}
          </span>
        </th>
        {calendar.months.map((month, m) => {
          const live = m + 1 >= index;
          const classes = ["wp-num", "wp-cal-cell--month" + bandClass(m)];
          if (live) classes.push("wp-cal-cell--live");
          if (m + 1 === index) classes.push("wp-cal-cell--lands");
          return (
            <td
              key={month}
              className={classes.join(" ")}
              title={live ? cellTitle(row, m) : undefined}
            >
              {live ? cellText(row, m) : ""}
            </td>
          );
        })}
        <td className="wp-num">{row.fteInYear.toFixed(2)}</td>
        <td className="wp-num">{gbp(row.gbpInYear)}</td>
        <td><Pill tone="brand">{row.state}</Pill></td>
      </tr>
    );
  };

  /** The totals block the Calendar ends at: the plan by month, and the target it is read against. */
  const calendarFooter: [string, (m: number) => string, string][] = (() => {
    const t = calendar.totals;
    return [
      ["FTE live", (m) => fte(t.fteLive[m]), fte(t.fteLive[11])],
      ["New FTE landing", (m) => fte(t.fteNew[m]), fte(t.fteNew.reduce((a, v) => a + v, 0))],
      ["£ in-year", (m) => gbp(t.gbpByMonth[m]), gbp(t.gbpCumulative[11])],
      ["Cumulative £", (m) => gbp(t.gbpCumulative[m]), gbp(t.gbpCumulative[11])],
      ["Target", (m) => gbp(t.gbpTarget[m]), gbp(t.gbpTarget[11])],
      [
        "Gap",
        (m) => gbp(t.gbpCumulative[m] - t.gbpTarget[m]),
        gbp(t.gbpCumulative[11] - t.gbpTarget[11]),
      ],
    ];
  })();

  const rows = data.work.filter((w) => {
    if (!inPlan(ctx, w)) return false;
    if (squad && w.squad !== squad) return false;
    if (year && landsIn(w) !== year) return false;
    return true;
  });

  const claimsOf = (item: WorkItem) =>
    Object.values(item.claims).filter((v) => v).length;

  const totalsFor = (item: WorkItem): Totals => {
    const value = benefitValue(ctx, item);
    const own: Totals = {
      fte: item.claimedFTE ?? 0,
      others: claimsOf(item),
      inYear: value.inYear,
      recorded: value.recorded,
    };
    return rows
      .filter((w) => w.parent === item.title)
      .reduce((t, w) => add(t, totalsFor(w)), own);
  };

  /** Features and spikes lead the roll-up; a component is counted under the feature it sits in. */
  const leaves = rows.filter((w) => !w.parent || !rows.some((p) => p.title === w.parent));
  // the Outcome table on Settings names the epics that serve it; anything it does not name falls
  // under "Outcome not set"
  const outcomeOf = (item: WorkItem) => outcomeOfEpic(data, item.epic) || NO_OUTCOME;
  const outcomeKey = (name: string) =>
    data.settings.outcomes.find((o) => o.name === name)?.jiraAlignKey ?? name;

  const outcomes = (() => {
    const byOutcome = new Map<string, Map<string, WorkItem[]>>();
    for (const item of leaves) {
      const outcome = outcomeOf(item);
      const epics = byOutcome.get(outcome) ?? new Map<string, WorkItem[]>();
      const epic = item.epic || "No epic";
      epics.set(epic, [...(epics.get(epic) ?? []), item]);
      byOutcome.set(outcome, epics);
    }
    return [...byOutcome.entries()].sort((a, b) => a[0].localeCompare(b[0], "en-GB"));
  })();

  const grand = leaves.reduce((t, w) => add(t, totalsFor(w)), ZERO);
  const recordedFTE = data.benefitActuals
    .filter((a) => a.type === "FTE released" && typeof a.value === "number"
      && rows.some((w) => w.title === a.title))
    .reduce((t, a) => t + (a.value as number), 0);
  const inPlanMW = rows.reduce((t, w) => t + workMW(ctx, w), 0);
  const deliveredMW = rows
    .filter((w) => ctx.impact[w.state] === "Historical")
    .reduce((t, w) => t + workMW(ctx, w), 0);
  const reliability = inPlanMW === 0 ? 0 : deliveredMW / inPlanMW;

  const join = (base: string, key: string) => base.replace(/\/$/, "") + "/" + key;

  const alignLink = (key: string) => (key && data.settings.jiraAlignBase
    ? <a href={join(data.settings.jiraAlignBase, key)}>{key}</a>
    : <span className="wp-muted">—</span>);

  const jiraLink = (item: WorkItem) => (item.jira && data.settings.jiraBase
    ? <a href={join(data.settings.jiraBase, item.jira)}>{item.jira}</a>
    : <span className="wp-muted">—</span>);

  const toggle = (list: string[], set: (next: string[]) => void, key: string) =>
    set(list.includes(key) ? list.filter((k) => k !== key) : [...list, key]);

  const lands = (item: WorkItem) => (item.landingMonth
    ? `${item.landingMonth} ${item.landingYear ?? data.settings.benefitYear}`
    : "—");

  const openActual = (row: BenefitActual | null, at: number) => {
    setActual(row ? { ...row } : blankActual());
    setValueText(row ? String(row.value) : "");
    setIndex(at);
    setMessage("");
    setOpen(true);
  };

  const save = () => {
    const next = { ...actual, value: readValue(valueText) };
    const said = index >= 0
      ? store.updateBenefitActual(index, next)
      : store.addBenefitActual(next);
    setMessage(said);
    if (!said) setOpen(false);
  };

  const remove = () => {
    setRemoving(false);
    store.removeBenefitActual(index);
    setOpen(false);
  };

  const actualRows = data.benefitActuals.map((a, i) => ({ ...a, index: i }));
  const actualColumns: Column<BenefitActual & { index: number }>[] = [
    {
      key: "title",
      label: "Work item",
      sort: (a) => a.title,
      cell: (a) => (
        <button type="button" className="wp-link-btn" onClick={() => openActual(a, a.index)}>
          {a.title}
        </button>
      ),
    },
    {
      key: "type",
      label: "Benefit type",
      sort: (a) => a.type,
      cell: (a) => <Pill tone="brand">{a.type}</Pill>,
    },
    { key: "value", label: "Actual", sort: (a) => String(a.value), cell: (a) => String(a.value) },
    { key: "when", label: "Recorded on", sort: (a) => a.when, cell: (a) => a.when || "—" },
    { key: "note", label: "Note", cell: (a) => a.note || "—" },
  ];

  /**
   * What one work item claims of a benefit type: the claimedFTE field for FTE released, else the
   * Benefits column the type sits in. Some columns carry a worded claim, such as "+12 NPS", so a
   * claim is not always a figure.
   */
  const claimOf = (item: WorkItem, type: string): number | string => (type === "FTE released"
    ? item.claimedFTE ?? 0
    : item.claims[CLAIM_COLUMN[type]] ?? 0);

  const figure = (claim: number | string): number => (typeof claim === "number" ? claim : 0);

  /**
   * The pounds recorded against one type. benefitValue adds the FTE and the cost avoidance actuals
   * together, so cost avoidance is read with no grade, which zeroes the FTE rate, and FTE released
   * is what is left.
   */
  const recordedOf = (item: WorkItem, type: string): number => {
    const avoidance = benefitValue(ctx, { ...item, grade: null }).recorded;
    return type === "Cost avoidance"
      ? avoidance
      : benefitValue(ctx, item).recorded - avoidance;
  };

  /** Claims and actuals of one benefit type, over the work the filters leave. */
  const typeRow = (type: string) => {
    const claiming = rows.filter((w) => Boolean(claimOf(w, type)));
    const claimed = claiming.reduce((t, w) => t + figure(claimOf(w, type)), 0);
    const money = type === "FTE released"
      ? claiming.reduce(
        (t, w) => t + figure(claimOf(w, type)) * claimShare(ctx, w)
          * gradeRate(data.settings, w.grade),
        0,
      )
      : type === "Cost avoidance"
        ? claiming.reduce(
          (t, w) => t + figure(claimOf(w, type)) * 1000000 * claimShare(ctx, w),
          0,
        )
        : null;
    const recorded = money === null
      ? null
      : claiming.reduce((t, w) => t + recordedOf(w, type), 0);
    return {
      type,
      column: CLAIM_COLUMN[type] ?? "FTE",
      items: claiming.length,
      claimed,
      money,
      recorded,
    };
  };

  const typeRows = BENEFIT_TYPES.map(typeRow);
  const typeTotals = typeRows.reduce(
    (t, row) => ({
      items: t.items + row.items,
      money: t.money + (row.money ?? 0),
      recorded: t.recorded + (row.recorded ?? 0),
    }),
    { items: 0, money: 0, recorded: 0 },
  );

  return (
    <Section
      eyebrow={data.settings.quarter}
      title="Benefits"
      lede="What the plan claims, what it is worth inside the benefit year, and what has been recorded against it."
    >
      <Band kicker="Benefits this year">
        <Stat onBrand label="Value in-year" value={gbp(grand.inYear)} sub="Claims pro-rated by landing month" />
        <Stat onBrand label="Value recorded" value={gbp(grand.recorded)} sub="Actuals against the claims that have landed" />
        <Stat
          onBrand
          tone="accent"
          label="Gap"
          value={gbp(grand.inYear - grand.recorded)}
          sub="In-year value still to be recorded"
        />
        <Stat
          onBrand
          label="FTE released"
          value={`${fte(recordedFTE)} of ${fte(grand.fte)}`}
          sub="Recorded against claimed: the primary benefit."
        />
        <Stat
          onBrand
          label="Reliability"
          value={pct(reliability)}
          sub="Delivered member weeks over the member weeks in plan."
        />
      </Band>

      <div className="wp-tabs wp-benefits-tabs" role="group" aria-label="Value views">
        {TABS.map(([key, label]) => (
          <button key={key} type="button" aria-pressed={tab === key} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      <Toolbar
        label="Filter the benefits"
        actions={tab === "actuals" ? (
          <button type="button" className="wp-btn-primary" onClick={() => openActual(null, -1)}>
            <Plus size={14} aria-hidden="true" />
            Record actual
          </button>
        ) : undefined}
      >
        {tab === "calendar" ? (
          <Field label="Benefit year">
            {(p) => (
              <select {...p} value={calYear} onChange={(e) => setCalYear(e.target.value)}>
                {calendarYears.map((y) => <option key={y} value={String(y)}>{y}</option>)}
              </select>
            )}
          </Field>
        ) : (
          <Field label="Benefit year">
            {(p) => (
              <select {...p} value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">All years</option>
                {knownYears(data).map((y) => <option key={y} value={String(y)}>{y}</option>)}
              </select>
            )}
          </Field>
        )}
        <Field label="Squad">
          {(p) => (
            <select {...p} value={squad} onChange={(e) => setSquad(e.target.value)}>
              <option value="">All squads</option>
              {data.squads.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          )}
        </Field>
        {tab === "calendar" ? (
          <div className="wp-tabs wp-cal-measure" role="group" aria-label="Month cells">
            <button
              type="button"
              aria-pressed={measure === "fte"}
              onClick={() => setMeasure("fte")}
            >
              FTE
            </button>
            <button
              type="button"
              aria-pressed={measure === "gbp"}
              onClick={() => setMeasure("gbp")}
            >
              £
            </button>
          </div>
        ) : null}
      </Toolbar>

      {tab === "rollup" ? (
        <>
          <h2 className="wp-h2">Roll-up by outcome</h2>
          <div className="wp-table-wrap">
            <table className="wp-table wp-benefits-rollup">
              <caption className="sr-only">
                Benefits roll-up: outcome, the epics that serve it, and the work underneath them.
                Counted work only, and never split by funding.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Outcome, epic or work item</th>
                  <th scope="col" className="wp-num">FTE claimed</th>
                  <th scope="col" className="wp-num">Other claims</th>
                  <th scope="col" className="wp-num">£ in-year</th>
                  <th scope="col" className="wp-num">£ recorded</th>
                  <th scope="col">Lands</th>
                  <th scope="col">State</th>
                  <th scope="col">Commitment</th>
                  <th scope="col">References</th>
                </tr>
              </thead>
              <tbody>
                {outcomes.map(([outcome, epics]) => {
                  const items = [...epics.values()].flat();
                  const total = items.reduce((t, w) => add(t, totalsFor(w)), ZERO);
                  const shown = openOutcomes.includes(outcome);
                  return (
                    <Fragment key={outcome}>
                      <tr className="wp-benefits-row wp-benefits-row--outcome">
                        <th scope="row">
                          <button
                            type="button"
                            className="wp-link-btn"
                            aria-expanded={shown}
                            onClick={() => toggle(openOutcomes, setOpenOutcomes, outcome)}
                          >
                            {shown
                              ? <ChevronDown size={14} aria-hidden="true" />
                              : <ChevronRight size={14} aria-hidden="true" />}
                            {outcome}
                          </button>
                        </th>
                        <td className="wp-num">{fte(total.fte)}</td>
                        <td className="wp-num">{total.others}</td>
                        <td className="wp-num">{gbp(total.inYear)}</td>
                        <td className="wp-num">{gbp(total.recorded)}</td>
                        <td>—</td>
                        <td>—</td>
                        <td>—</td>
                        <td>{alignLink(outcomeKey(outcome))}</td>
                      </tr>
                      {shown ? [...epics.entries()].map(([epic, members]) => {
                        const epicKey = outcome + "/" + epic;
                        const epicTotal = members.reduce((t, w) => add(t, totalsFor(w)), ZERO);
                        const epicShown = openEpics.includes(epicKey);
                        return (
                          <Fragment key={epicKey}>
                            <tr className="wp-benefits-row wp-benefits-row--epic">
                              <th scope="row">
                                <button
                                  type="button"
                                  className="wp-link-btn"
                                  aria-expanded={epicShown}
                                  onClick={() => toggle(openEpics, setOpenEpics, epicKey)}
                                >
                                  {epicShown
                                    ? <ChevronDown size={14} aria-hidden="true" />
                                    : <ChevronRight size={14} aria-hidden="true" />}
                                  {epic}
                                </button>
                              </th>
                              <td className="wp-num">{fte(epicTotal.fte)}</td>
                              <td className="wp-num">{epicTotal.others}</td>
                              <td className="wp-num">{gbp(epicTotal.inYear)}</td>
                              <td className="wp-num">{gbp(epicTotal.recorded)}</td>
                              <td>—</td>
                              <td>—</td>
                              <td>—</td>
                              <td>{alignLink(epic)}</td>
                            </tr>
                            {epicShown ? members.map((item) => {
                              const t = totalsFor(item);
                              return (
                                <tr key={epicKey + "/" + item.title} className="wp-benefits-row wp-benefits-row--item">
                                  <th scope="row">{item.title}</th>
                                  <td className="wp-num">{fte(t.fte)}</td>
                                  <td className="wp-num">{t.others}</td>
                                  <td className="wp-num">{gbp(t.inYear)}</td>
                                  <td className="wp-num">{gbp(t.recorded)}</td>
                                  <td>{lands(item)}</td>
                                  <td>{item.state}</td>
                                  <td>{commitment(item)}</td>
                                  <td>{jiraLink(item)}</td>
                                </tr>
                              );
                            }) : null}
                          </Fragment>
                        );
                      }) : null}
                    </Fragment>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">All outcomes</th>
                  <td className="wp-num">{fte(grand.fte)}</td>
                  <td className="wp-num">{grand.others}</td>
                  <td className="wp-num">{gbp(grand.inYear)}</td>
                  <td className="wp-num">{gbp(grand.recorded)}</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : null}

      {tab === "calendar" ? (
        <>
          <h2 className="wp-h2">{`Benefits calendar ${calendar.year}`}</h2>
          <p className="sr-only">
            {`${landingCount} items land in ${calendar.year}; `}
            {`${gbp(calendar.totals.gbpCumulative[11])} of `}
            {`${gbp(calendar.totals.gbpTarget[11])} by December.`}
          </p>
          <div className="wp-cal-wrap wp-fill">
            <table className="wp-table wp-cal-table">
              <caption className="sr-only">
                {`Benefits calendar ${calendar.year}: one row per work item in the plan, with the FTE `}
                {"live in each month from the month it lands. The totals at the end count the whole "}
                {"plan, whichever squad the filter shows."}
              </caption>
              <colgroup>
                <col className="wp-cal-col--item" />
                {calendar.months.map((month) => <col key={month} className="wp-cal-col--month" />)}
                <col className="wp-cal-col--fte" />
                <col className="wp-cal-col--total" />
                <col className="wp-cal-col--state" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Work item</th>
                  {calendar.months.map((month, m) => (
                    <th
                      key={month}
                      scope="col"
                      className={(m === currentMonth
                        ? "wp-num wp-cal-cell--month wp-cal-cell--now"
                        : "wp-num wp-cal-cell--month") + bandClass(m)}
                      aria-current={m === currentMonth ? "true" : undefined}
                    >
                      {month}
                    </th>
                  ))}
                  <th scope="col" className="wp-num">FTE in-year</th>
                  <th scope="col" className="wp-num">£ in-year</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                {datedRows.map((row) => calendarLine(row))}
                {undatedRows.length > 0 ? (
                  <tr className="wp-cal-group">
                    <th scope="colgroup" colSpan={16}>Not yet dated</th>
                  </tr>
                ) : null}
                {undatedRows.map((row) => calendarLine(row))}
              </tbody>
              <tfoot>
                {calendarFooter.map(([label, cell, yearEnd]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {calendar.months.map((month, m) => (
                      <td key={month} className={"wp-num wp-cal-cell--month" + bandClass(m)}>
                        {cell(m)}
                      </td>
                    ))}
                    <td className="wp-num" colSpan={3}>{`${yearEnd} at year end`}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">£ in-year if all lands</th>
                  {calendar.months.map((month, m) => (
                    <td key={month} className={"wp-num wp-cal-cell--month" + bandClass(m)} />
                  ))}
                  <td className="wp-num" colSpan={3}>
                    {gbp(calendar.totals.gbpIfAllLands[11])}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Gap to target at year end</th>
                  {calendar.months.map((month, m) => (
                    <td key={month} className={"wp-num wp-cal-cell--month" + bandClass(m)} />
                  ))}
                  <td className="wp-num" colSpan={3}>{`${fte(calendar.totals.gap)} FTE`}</td>
                </tr>
                <tr>
                  <th scope="row">FTE live in December</th>
                  {calendar.months.map((month, m) => (
                    <td key={month} className={"wp-num wp-cal-cell--month" + bandClass(m)} />
                  ))}
                  <td className="wp-num" colSpan={3}>{fte(calendar.totals.fteLive[11])}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : null}

      {tab === "actuals" ? (
        <>
          <h2 className="wp-h2">Benefits actuals</h2>
          <DataTable
            caption="Benefit actuals: one row per work item and benefit type, with the date it was recorded."
            columns={actualColumns}
            rows={actualRows}
            rowKey={(a) => `${a.title}-${a.type}-${a.index}`}
            empty="Nothing has been recorded yet."
          />
        </>
      ) : null}

      {tab === "types" ? (
        <>
          <h2 className="wp-h2">By benefit type</h2>
          <div className="wp-table-wrap wp-fill">
            <table className="wp-table">
              <caption className="sr-only">
                By benefit type: the Benefits column each type is claimed in, the work claiming it,
                and what those claims are worth this year.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Column</th>
                  <th scope="col">Benefit type</th>
                  <th scope="col" className="wp-num">Items claiming</th>
                  <th scope="col" className="wp-num">Claimed</th>
                  <th scope="col" className="wp-num">£ in-year</th>
                  <th scope="col" className="wp-num">£ recorded</th>
                </tr>
              </thead>
              <tbody>
                {typeRows.map((row) => (
                  <tr key={row.type}>
                    <td>{row.column}</td>
                    <th scope="row"><Pill tone="brand">{row.type}</Pill></th>
                    <td className="wp-num">{row.items}</td>
                    <td className="wp-num">{row.claimed ? row.claimed.toFixed(2) : "—"}</td>
                    <td className="wp-num">{row.money === null ? "—" : gbp(row.money)}</td>
                    <td className="wp-num">{row.recorded === null ? "—" : gbp(row.recorded)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan={2}>All benefit types</th>
                  <td className="wp-num">{typeTotals.items}</td>
                  <td className="wp-num">—</td>
                  <td className="wp-num">{gbp(typeTotals.money)}</td>
                  <td className="wp-num">{gbp(typeTotals.recorded)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : null}

      <Drawer
        open={open}
        title={index >= 0 ? "Edit actual" : "Record a benefit actual"}
        onClose={() => setOpen(false)}
        footer={(
          <>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            {index >= 0 ? (
              <button type="button" onClick={() => setRemoving(true)}>Remove</button>
            ) : null}
            <button type="button" className="wp-btn-primary" onClick={save}>Save</button>
          </>
        )}
      >
        {message ? (
          <div className="wp-errors" role="alert">
            <p>That did not save:</p>
            <p>{message}</p>
          </div>
        ) : null}

        <Field label="Work item" hint="The claim this is an actual of.">
          {(p) => (
            <select
              {...p}
              value={actual.title}
              onChange={(e) => setActual({ ...actual, title: e.target.value })}
            >
              <option value="">Pick a work item</option>
              {data.work.map((w) => <option key={w.title} value={w.title}>{w.title}</option>)}
            </select>
          )}
        </Field>
        <Field label="Benefit type">
          {(p) => (
            <select
              {...p}
              value={actual.type}
              onChange={(e) => setActual({ ...actual, type: e.target.value })}
            >
              {BENEFIT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
        </Field>
        <Field label="Actual" hint="A number, or the words that describe it.">
          {(p) => (
            <input {...p} value={valueText} onChange={(e) => setValueText(e.target.value)} />
          )}
        </Field>
        <Field label="Recorded on" hint="The month it landed in.">
          {(p) => (
            <input
              {...p}
              type="date"
              value={actual.when}
              onChange={(e) => setActual({ ...actual, when: e.target.value })}
            />
          )}
        </Field>
        <Field label="Note">
          {(p) => (
            <input
              {...p}
              value={actual.note}
              onChange={(e) => setActual({ ...actual, note: e.target.value })}
            />
          )}
        </Field>
      </Drawer>

      <ConfirmDialog
        open={removing}
        title="Remove this actual"
        body="The claim stays on the work item; only what was recorded against it goes."
        confirmLabel="Yes, remove"
        onCancel={() => setRemoving(false)}
        onConfirm={remove}
      />
    </Section>
  );
}
