// Quarter close: the quarter close the workbook runs, the record it leaves behind, and the view past it.
import { useMemo, useState } from "react";
import { Undo2 } from "lucide-react";
import Section from "./Section";
import { useDataset } from "../store/useDataset";
import type { CloseSummary } from "../store/useDataset";
import { buildContext, itemSpan } from "../engine/context";
import { MONTHS, quarterRange, toISO } from "../engine/dates";
import { counts, inPlan, ownMW } from "../engine/work";
import { calibrationBand, estimateAccuracy } from "../engine/calibration";
import { benefitValue, fteClaimed } from "../engine/value";
import type { ArchiveRow, HistorySnapshot, WorkItem } from "../model/types";
import { Band, ConfirmDialog, DataTable, Field, Pill, Stat, Tile, Toolbar } from "../ui";
import type { Column, PillTone } from "../ui";
import "./quarter-close.css";

type Tab = "close" | "history" | "compare" | "calibration" | "outlook" | "archive";

const TABS: [Tab, string][] = [
  ["close", "Close the quarter"],
  ["history", "History"],
  ["compare", "Compare"],
  ["calibration", "Calibration"],
  ["outlook", "Outlook"],
  ["archive", "Archive"],
];

/** A difference smaller than this is the same number rounded twice, not a change. */
const TOLERANCE = 0.0005;

const mw = (n: number) => n.toFixed(1);
const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
const pct = (n: number) => Math.round(n * 100) + "%";
const times = (n: number) => n.toFixed(2) + "x";

/** The ratio read as words as well as a tone, so the tint is never the only thing saying it. */
function readRatio(ratio: number): { tone: PillTone; label: string } {
  if (ratio >= 0.9 && ratio <= 1.1) return { tone: "good", label: "on estimate" };
  if (ratio >= 0.75 && ratio <= 1.25) return { tone: "warn", label: ratio > 1 ? "over" : "under" };
  return { tone: "bad", label: ratio > 1 ? "well over" : "well under" };
}

interface CompareRow {
  measure: string;
  prior: number;
  current: number;
  format: (n: number) => string;
}

/** Size, not a verdict: the change is read as more, fewer or the same, never as better or worse. */
function readChange(row: CompareRow): string {
  const change = row.current - row.prior;
  if (Math.abs(change) <= TOLERANCE) return "same";
  return change > 0 ? "more" : "fewer";
}

interface SparkPoint {
  quarter: string;
  value: number;
}

/** A sparkline is a picture of a column: the sr-only table beside it carries the same figures. */
function Sparkline({ label, points, format }: {
  label: string;
  points: SparkPoint[];
  format: (n: number) => string;
}) {
  const values = points.map((p) => p.value);
  const low = Math.min(...values, 0);
  const high = Math.max(...values, low + 1);
  const step = points.length > 1 ? 100 / (points.length - 1) : 0;
  const y = (v: number) => 34 - ((v - low) / (high - low)) * 30;
  const coords = points.map((p, i) => `${i * step},${y(p.value)}`).join(" ");
  const last = points[points.length - 1];

  return (
    <figure className="wp-spark">
      <figcaption>{label}</figcaption>
      {points.length === 0 ? <p>No snapshots yet.</p> : (
        <>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <polyline points={coords} />
            <circle cx={(points.length - 1) * step} cy={y(last.value)} r={2} />
          </svg>
          <p>{`Latest: ${format(last.value)} in ${last.quarter}.`}</p>
          <table className="sr-only">
            <caption>{label} by quarter</caption>
            <thead>
              <tr>
                <th scope="col">Quarter</th>
                <th scope="col">{label}</th>
              </tr>
            </thead>
            <tbody>
              {points.map((p) => (
                <tr key={p.quarter}>
                  <th scope="row">{p.quarter}</th>
                  <td>{format(p.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </figure>
  );
}

export default function QuarterClose() {
  const store = useDataset();
  const { data, view } = store;
  const ctx = useMemo(() => buildContext(data), [data]);
  const quarter = data.settings.quarter;

  const [tab, setTab] = useState<Tab>("close");
  const [force, setForce] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [result, setResult] = useState<CloseSummary | null>(null);
  const [archiveQuarter, setArchiveQuarter] = useState("");
  const [search, setSearch] = useState("");

  const quarterEnd = quarterRange(quarter)[1];
  const early = new Date() < quarterEnd;
  const guard = `${quarter} does not end until ${toISO(quarterEnd)}. `
    + "Close it from that date, or force the close.";

  // MarkEndedDone: a counted item whose last sprint is inside the quarter is Done at the close
  const ending = useMemo(
    () => data.work.filter((w) => w.title && counts(ctx, w) && itemSpan(w)[1] <= ctx.lastSprint),
    [ctx, data.work],
  );
  // the archive pass runs after the marking, so the items about to be marked Done go on the record too
  const archiving = useMemo(() => {
    const done = new Set(ending.map((w) => w.title));
    return data.work.filter((w) => {
      if (!w.title || w.archivedInQuarter === quarter) return false;
      const impact = ctx.impact[w.state];
      return impact === "Historical" || impact === "Removed" || done.has(w.title);
    });
  }, [ctx, data.work, ending, quarter]);

  const alreadySnapped = data.history.some((h) => h.quarter === quarter);
  const netMW = view.compare.rows.net_capacity.b;

  const close = () => {
    setConfirming(false);
    setResult(store.closeQuarter(force));
  };

  const undo = () => {
    store.undo();
    setResult(null);
    setForce(false);
  };

  // ---- History ----
  const historyColumns: Column<HistorySnapshot>[] = [
    { key: "quarter", label: "Quarter", sort: (h) => h.quarter, cell: (h) => h.quarter },
    { key: "net", label: "Net MW", numeric: true, sort: (h) => h.netMW, cell: (h) => mw(h.netMW) },
    {
      key: "committed",
      label: "In plan MW",
      numeric: true,
      sort: (h) => h.inPlanMW,
      cell: (h) => mw(h.inPlanMW),
    },
    {
      key: "delivered",
      label: "Delivered MW",
      numeric: true,
      sort: (h) => h.deliveredMW,
      cell: (h) => mw(h.deliveredMW),
    },
    { key: "fte", label: "FTE in-year", numeric: true, sort: (h) => h.fte, cell: (h) => h.fte.toFixed(2) },
    { key: "gbp", label: "£ in-year", numeric: true, sort: (h) => h.gbp, cell: (h) => gbp(h.gbp) },
    {
      key: "load",
      label: "Plan load",
      numeric: true,
      sort: (h) => (h.netMW ? h.inPlanMW / h.netMW : 0),
      cell: (h) => pct(h.netMW ? h.inPlanMW / h.netMW : 0),
    },
    {
      key: "reliability",
      label: "Predictability",
      numeric: true,
      sort: (h) => (h.inPlanMW ? h.deliveredMW / h.inPlanMW : 0),
      cell: (h) => pct(h.inPlanMW ? h.deliveredMW / h.inPlanMW : 0),
    },
    { key: "note", label: "Note", sort: (h) => h.note, cell: (h) => h.note || "—" },
  ];

  const sparks: [string, (h: HistorySnapshot) => number, (n: number) => string][] = [
    ["Net MW", (h) => h.netMW, mw],
    ["In plan MW", (h) => h.inPlanMW, mw],
    ["Delivered MW", (h) => h.deliveredMW, mw],
    ["FTE in-year", (h) => h.fte, (n) => n.toFixed(2)],
    ["£ in-year", (h) => h.gbp, gbp],
    ["Predictability", (h) => (h.inPlanMW ? h.deliveredMW / h.inPlanMW : 0), pct],
  ];

  // ---- Compare: this quarter against the last snapshot taken ----
  const prior = data.history[data.history.length - 1];
  const inPlanCount = data.work.filter((w) => w.title && inPlan(ctx, w)).length;
  const compareRows: CompareRow[] = prior ? [
    { measure: "Net capacity (MW)", prior: prior.netMW, current: netMW, format: mw },
    { measure: "In-plan MW", prior: prior.inPlanMW, current: view.in_plan.value, format: mw },
    { measure: "Delivered MW", prior: prior.deliveredMW, current: view.delivered.value, format: mw },
    {
      measure: "Predictability",
      prior: prior.inPlanMW ? prior.deliveredMW / prior.inPlanMW : 0,
      current: view.reliability.value,
      format: pct,
    },
    {
      measure: "Plan load",
      prior: prior.netMW ? prior.inPlanMW / prior.netMW : 0,
      current: netMW ? view.in_plan.value / netMW : 0,
      format: pct,
    },
    {
      measure: "FTE in-year",
      prior: prior.fte,
      current: fteClaimed(ctx),
      format: (n) => n.toFixed(2),
    },
    {
      measure: "£ in-year",
      prior: prior.gbp,
      current: view.compare.rows.gbp_in_year.b,
      format: gbp,
    },
    {
      measure: "Scope: items in plan",
      prior: data.archive.filter((a) => a.quarter === prior.quarter).length,
      current: inPlanCount,
      format: (n) => String(n),
    },
  ] : [];

  const compareColumns: Column<CompareRow>[] = [
    { key: "measure", label: "Measure", cell: (row) => row.measure },
    {
      key: "prior",
      label: prior ? prior.quarter : "Previous quarter",
      numeric: true,
      cell: (row) => row.format(row.prior),
    },
    {
      key: "current",
      label: `${quarter} (live, to date)`,
      numeric: true,
      cell: (row) => row.format(row.current),
    },
    {
      key: "change",
      label: "Change",
      numeric: true,
      cell: (row) => row.format(row.current - row.prior),
    },
    { key: "read", label: "Read", cell: (row) => readChange(row) },
  ];

  // ---- Calibration: what the closed work says each size band really costs ----
  interface CalRow {
    size: string;
    items: number;
    estimated: number;
    actual: number;
    ratio: number;
    suggested: number | null;
  }
  const calibrationRows: CalRow[] = useMemo(() => {
    // the engine holds the averages, so a band's member weeks are its average over its item count
    const bands: CalRow[] = Object.keys(data.settings.sizes).map((size) => {
      const band = calibrationBand(ctx, size);
      return {
        size,
        items: band.items,
        estimated: band.avgOriginal * band.items,
        actual: band.avgActual * band.items,
        ratio: band.ratio,
        suggested: band.items ? band.suggested : null,
      };
    });
    const sum = (read: (row: CalRow) => number) => bands.reduce((t, row) => t + read(row), 0);
    const estimated = sum((row) => row.estimated);
    const actual = sum((row) => row.actual);
    return [...bands, {
      size: "Total",
      items: sum((row) => row.items),
      estimated,
      actual,
      ratio: estimated ? actual / estimated : 0,
      suggested: null,
    }];
  }, [ctx, data.settings.sizes]);

  const calibrationColumns: Column<CalRow>[] = [
    {
      key: "size",
      label: "Size",
      cell: (row) => (row.size === "Total" ? <strong>Total</strong> : row.size),
    },
    { key: "items", label: "Items done", numeric: true, cell: (row) => String(row.items) },
    { key: "estimated", label: "Estimated MW", numeric: true, cell: (row) => mw(row.estimated) },
    { key: "actual", label: "Actual MW", numeric: true, cell: (row) => mw(row.actual) },
    {
      key: "ratio",
      label: "Ratio",
      numeric: true,
      cell: (row) => {
        if (!row.items || !row.ratio) return "—";
        const read = readRatio(row.ratio);
        return <Pill tone={read.tone}>{`${times(row.ratio)} ${read.label}`}</Pill>;
      },
    },
    {
      key: "suggested",
      label: "Suggested MW",
      numeric: true,
      cell: (row) => (row.suggested == null ? "—" : mw(row.suggested)),
    },
  ];

  // ---- Outlook: what this quarter hands on to the next ----
  const quarters = data.settings.quarters;
  const nextQuarter = quarters[quarters.indexOf(quarter) + 1] ?? "";
  const carriedMW = (item: WorkItem): number => {
    if (ctx.parents.has(item.title)) return 0;
    const [start, end] = itemSpan(item);
    const sprints = Math.max(1, end - start + 1);
    return (ownMW(ctx, item) * Math.max(0, end - ctx.lastSprint)) / sprints;
  };
  const carrying = data.work
    .filter((w) => w.title && counts(ctx, w) && itemSpan(w)[1] > ctx.lastSprint)
    .map((w) => ({ item: w, carried: carriedMW(w) }));
  const carriedTotal = carrying.reduce((t, row) => t + row.carried, 0);

  const carryColumns: Column<{ item: WorkItem; carried: number }>[] = [
    { key: "title", label: "Item", sort: (row) => row.item.title, cell: (row) => row.item.title },
    { key: "squad", label: "Squad", sort: (row) => row.item.squad, cell: (row) => row.item.squad || "—" },
    {
      key: "end",
      label: "Last sprint",
      numeric: true,
      sort: (row) => itemSpan(row.item)[1],
      cell: (row) => "S" + itemSpan(row.item)[1],
    },
    {
      key: "carried",
      label: "Carried MW",
      numeric: true,
      sort: (row) => row.carried,
      cell: (row) => mw(row.carried),
    },
  ];

  interface Landing {
    key: string;
    label: string;
    items: number;
    fte: number;
    gbp: number;
  }
  const landings = useMemo(() => {
    const out = new Map<string, Landing>();
    for (const w of data.work) {
      if (!w.title || !counts(ctx, w) || !w.landingMonth) continue;
      const year = w.landingYear ?? data.settings.benefitYear;
      const month = MONTHS.indexOf(w.landingMonth);
      if (month < 0) continue;
      const key = `${year}-${String(month + 1).padStart(2, "0")}`;
      const row = out.get(key)
        ?? { key, label: `${w.landingMonth} ${year}`, items: 0, fte: 0, gbp: 0 };
      row.items += 1;
      row.fte += w.claimedFTE ?? 0;
      row.gbp += benefitValue(ctx, w).inYear;
      out.set(key, row);
    }
    return [...out.values()].sort((a, b) => a.key.localeCompare(b.key));
  }, [ctx, data.settings.benefitYear, data.work]);

  const landingColumns: Column<Landing>[] = [
    { key: "month", label: "Month", sort: (row) => row.key, cell: (row) => row.label },
    { key: "items", label: "Items", numeric: true, sort: (row) => row.items, cell: (row) => String(row.items) },
    {
      key: "fte",
      label: "FTE claimed",
      numeric: true,
      sort: (row) => row.fte,
      cell: (row) => row.fte.toFixed(2),
    },
    { key: "gbp", label: "£ in-year", numeric: true, sort: (row) => row.gbp, cell: (row) => gbp(row.gbp) },
  ];

  // ---- Archive ----
  const archiveQuarters = [...new Set(data.archive.map((a) => a.quarter))].sort();
  const archiveRows = data.archive.filter((a) => {
    if (archiveQuarter && a.quarter !== archiveQuarter) return false;
    const q = search.trim().toLowerCase();
    return !q || a.title.toLowerCase().includes(q) || a.epic.toLowerCase().includes(q)
      || a.id.toLowerCase().includes(q);
  });

  const archiveColumns: Column<ArchiveRow & { index: number }>[] = [
    { key: "quarter", label: "Quarter", sort: (a) => a.quarter, cell: (a) => a.quarter },
    { key: "id", label: "ID", sort: (a) => a.id, cell: (a) => a.id || "—" },
    { key: "title", label: "Title", sort: (a) => a.title, cell: (a) => a.title },
    { key: "epic", label: "Epic", sort: (a) => a.epic, cell: (a) => a.epic || "—" },
    { key: "squad", label: "Squad", sort: (a) => a.squad, cell: (a) => a.squad || "—" },
    { key: "state", label: "State at close", sort: (a) => a.state, cell: (a) => a.state },
    { key: "status", label: "Delivery status", sort: (a) => a.status, cell: (a) => a.status || "—" },
    { key: "size", label: "Size", sort: (a) => a.size, cell: (a) => a.size || "—" },
    {
      key: "original",
      label: "Original (MW)",
      numeric: true,
      sort: (a) => a.original,
      cell: (a) => mw(a.original),
    },
    { key: "latest", label: "Latest (MW)", numeric: true, sort: (a) => a.latest, cell: (a) => mw(a.latest) },
    { key: "actual", label: "Actual (MW)", numeric: true, sort: (a) => a.actual, cell: (a) => mw(a.actual) },
  ];

  return (
    <Section
      eyebrow={quarter}
      title="Quarter close"
      lede="What the quarter delivered, what it carries over, and the record each close leaves behind."
    >
      <Band kicker="How the quarter ends">
        <Stat onBrand label="Delivered" value={mw(view.delivered.value)} unit="MW" sub="Work that reached Released or later" />
        <Stat onBrand label="Carried over" value={mw(carriedTotal)} unit="MW" sub={`${carrying.length} item(s) run past the quarter`} />
        <Stat
          onBrand
          tone="accent"
          label="On time"
          value={pct(view.delivery.on_time_pct)}
          sub={`${view.delivery.on_time} of ${view.delivery.delivered} delivered`}
        />
      </Band>

      <div className="wp-tabs wp-quarter-close-tabs" role="group" aria-label="Close views">
        {TABS.map(([key, label]) => (
          <button key={key} type="button" aria-pressed={tab === key} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "close" ? (
        <>
          <h2 className="wp-h2">{"Closing " + quarter}</h2>
          <dl className="wp-tiles wp-quarter-close-tiles">
            <Tile kicker="Net capacity" value={mw(netMW) + " MW"} note="The snapshot's net member weeks." />
            <Tile kicker="In plan" value={mw(view.in_plan.value) + " MW"} note="Committed work plus what is already delivered." />
            <Tile kicker="Delivered" value={mw(view.delivered.value) + " MW"} note="Work that reached Released or later." />
            <Tile kicker="£ in-year" value={gbp(view.compare.rows.gbp_in_year.b)} note="Claims pro-rated by landing month." />
          </dl>

          <div className="wp-quarter-close-grid">
            <div className="wp-card wp-quarter-close-card">
              <h3 className="wp-card-title">{ending.length + " item(s) to be marked Done"}</h3>
              {ending.length === 0 ? <p>Nothing reaches its last sprint inside the quarter.</p> : (
                <ul>
                  {ending.map((w) => (
                    <li key={w.title}>
                      <Pill tone="good">{w.state}</Pill>
                      {`${w.title} (last sprint S${itemSpan(w)[1]})`}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="wp-card wp-quarter-close-card">
              <h3 className="wp-card-title">{archiving.length + " item(s) to be archived"}</h3>
              {archiving.length === 0 ? <p>Nothing new goes on the record.</p> : (
                <ul>
                  {archiving.map((w) => (
                    <li key={w.title}>
                      <Pill>{w.state}</Pill>
                      {w.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="wp-card wp-quarter-close-card">
              <h3 className="wp-card-title">Snapshot</h3>
              <p>
                {alreadySnapped
                  ? `${quarter} is already in History, so no new snapshot is taken.`
                  : `A snapshot of ${quarter} is written to History before Settings moves on.`}
              </p>
            </div>
          </div>

          {early ? <p className="wp-guard">{guard}</p> : null}
          {early ? (
            <p className="wp-force">
              <input
                id="wp-force-close"
                type="checkbox"
                checked={force}
                onChange={(e) => setForce(e.target.checked)}
              />
              <label htmlFor="wp-force-close">Close anyway, before the quarter ends</label>
            </p>
          ) : null}

          <Toolbar
            label="Close actions"
            actions={(
              <button type="button" className="wp-btn-primary" onClick={() => setConfirming(true)}>
                {"Close " + quarter}
              </button>
            )}
          >
            <p className="wp-count">{`Quarter ends ${toISO(quarterEnd)}`}</p>
          </Toolbar>

          {result ? (
            <div className="wp-quarter-close-result" role="status">
              <p>
                {`${result.done} item(s) marked Done, ${result.archived} archived. ${result.message}`}
              </p>
              {result.snapshot ? (
                <p>
                  {`Snapshot: ${mw(result.snapshot.netMW)} net MW, ${mw(result.snapshot.inPlanMW)} in plan, `
                    + `${mw(result.snapshot.deliveredMW)} delivered, ${gbp(result.snapshot.gbp)} in-year.`}
                </p>
              ) : null}
              <button type="button" onClick={undo}>
                <Undo2 size={14} aria-hidden="true" />
                Undo the close
              </button>
            </div>
          ) : null}
        </>
      ) : null}

      {tab === "history" ? (
        <>
          <DataTable
            caption="History: one row per closed quarter, kept for audit and comparison."
            columns={historyColumns}
            rows={data.history}
            rowKey={(h) => h.quarter}
            empty="No quarter has been closed yet."
          />
          <div className="wp-sparks">
            {sparks.map(([label, read, format]) => (
              <Sparkline
                key={label}
                label={label}
                points={data.history.map((h) => ({ quarter: h.quarter, value: read(h) }))}
                format={format}
              />
            ))}
          </div>
        </>
      ) : null}

      {tab === "compare" ? (
        prior ? (
          <>
            <p className="wp-count">
              {`${prior.quarter} against ${quarter}. Figures for the live quarter are to date, `
                + "so a part-quarter is being read against a whole one."}
            </p>
            <DataTable
              caption="Compare: the last snapshot against the live quarter, measure by measure."
              columns={compareColumns}
              rows={compareRows}
              rowKey={(row) => row.measure}
            />
          </>
        ) : <p>No snapshot to compare against: close a quarter first.</p>
      ) : null}

      {tab === "calibration" ? (
        <>
          <p className="wp-count">
            Original estimate against actual effort for work that finished, by size band.
          </p>
          <p className="sr-only">
            {`Across the work that finished, actual effort is ${times(estimateAccuracy(ctx))} of the `
              + "original estimate."}
          </p>
          <div className="wp-cal wp-fill">
            <DataTable
              caption="Calibration: what each size band was estimated at, what it really took, and the member weeks the closed work suggests."
              columns={calibrationColumns}
              rows={calibrationRows}
              rowKey={(row) => row.size}
              empty="No size band is set on Settings."
            />
            <p className="wp-count">
              {"The suggested MW is advisory: the sizes on Settings change only when someone edits "
                + "them there."}
            </p>
          </div>
        </>
      ) : null}

      {tab === "outlook" ? (
        <>
          <h2 className="wp-h2">
            {nextQuarter ? `What ${quarter} hands on to ${nextQuarter}` : "No later quarter on Settings"}
          </h2>
          <dl className="wp-tiles">
            <Tile
              kicker="Items carrying over"
              value={String(carrying.length)}
              note="Counted work whose sprints run past the end of the quarter."
            />
            <Tile
              kicker="Carried MW"
              value={mw(carriedTotal) + " MW"}
              note="The share of each item's member weeks that falls after the quarter."
            />
          </dl>
          <DataTable
            caption="Outlook: the work whose sprints run past the end of the quarter."
            columns={carryColumns}
            rows={carrying}
            rowKey={(row) => row.item.title}
            empty="Nothing runs past the end of the quarter."
          />
          <h2 className="wp-h2">Expected landings by month</h2>
          <DataTable
            caption="Expected landings: the months the benefits still to come are claimed to land in."
            columns={landingColumns}
            rows={landings}
            rowKey={(row) => row.key}
            empty="No benefit is claimed to land yet."
          />
        </>
      ) : null}

      {tab === "archive" ? (
        <>
          <Toolbar label="Archive filters">
            <Field label="Quarter">
              {(p) => (
                <select {...p} value={archiveQuarter} onChange={(e) => setArchiveQuarter(e.target.value)}>
                  <option value="">All quarters</option>
                  {archiveQuarters.map((q) => <option key={q} value={q}>{q}</option>)}
                </select>
              )}
            </Field>
            <Field label="Search">
              {(p) => (
                <input {...p} type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
              )}
            </Field>
          </Toolbar>
          <p className="wp-count">{archiveRows.length} of {data.archive.length} archived rows</p>
          <DataTable
            caption="Archive: what each quarter held, written at its close."
            columns={archiveColumns}
            rows={archiveRows.map((a, i) => ({ ...a, index: i }))}
            rowKey={(a) => `${a.quarter}-${a.title}-${a.index}`}
            empty="Nothing matches those filters."
          />
        </>
      ) : null}

      <ConfirmDialog
        open={confirming}
        title={"Close " + quarter}
        body={"The close marks the items that have ended Done, snapshots History, archives what is closed, "
          + "then moves Settings on to the next quarter. It can be undone."}
        confirmLabel={"Yes, close " + quarter}
        onCancel={() => setConfirming(false)}
        onConfirm={close}
      />
    </Section>
  );
}
