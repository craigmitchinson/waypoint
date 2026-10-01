// The whole quarter, worked from a Dataset. The shape mirrors wp_model.py's compute() so the engine
// can be held against the generator's expected values row for row; the workbook cell references are
// carried with the numbers because that is what the parity fixture names them by. Nothing here reads
// a named seed row: the probe rows the fixture asks for live in parity.ts.
import type { Dataset } from "../model/types";
import { buildContext, itemSpan } from "./context";
import { netMW, squadNetMW, timelineWeek } from "./capacity";
import { counts, commitment, inPlan, workMW } from "./work";
import { gbpInYear } from "./value";
import { deliverySummary } from "./delivery";
import { reservationRows, reservedTotal } from "./reservations";

/** The top row of each block in the workbook, and the timeline's column anchors. */
export const COORDS = {
  P_TOP: 5, W_TOP: 5, SQ_TOP: 5, SQ_N: 12, RS_TOP: 5, H_TOP: 5, HD_TOP: 23, CB_TOP: 5,
  CM_TOP: 6, WK0: 6, TC_FD0: 335,
};

/** The Compare rows, in sheet order: the row number a measure sits on. */
const COMPARE_ROWS = [
  "Net capacity (MW)", "In-plan MW", "Delivered MW", "Predictability", "Plan load", "Reserved MW",
  "FTE in-year", "£ in-year", "£ recorded", "Return on TCO", "On-time %", "Late items",
  "Carry-over MW", "Cycle time (sprints)", "Estimate accuracy", "Scope: items in plan",
  "Scope: features", "Scope: components", "Scope: spikes", "Squads over capacity",
];

const r = (x: number, places: number): number => {
  const f = 10 ** places;
  return Math.round(x * f) / f;
};

/** A dataset with no history compares against nothing rather than falling over. */
const NO_SNAPSHOT = { quarter: "", netMW: 0, gbp: 0, deliveredMW: 0 };

export function compute(data: Dataset, today: Date = new Date()) {
  const ctx = buildContext(data, today);
  const st = data.settings;

  let allCommitted = 0;
  let allProposed = 0;
  let delivered = 0;
  for (const w of data.work) {
    if (!w.squad) continue;
    const mw = workMW(ctx, w);
    if (counts(ctx, w)) allCommitted += mw;
    if (ctx.impact[w.state] === "Reserved" && commitment(w) === "Proposed") allProposed += mw;
    if (ctx.impact[w.state] === "Historical") delivered += mw;
  }
  let inPlanMW = 0;
  let deliveredAll = 0;
  for (const w of data.work) {
    const mw = workMW(ctx, w);
    if (inPlan(ctx, w)) inPlanMW += mw;
    if (ctx.impact[w.state] === "Historical") deliveredAll += mw;
  }
  const reliability = inPlanMW === 0 ? 0 : deliveredAll / inPlanMW;

  const resRows = reservationRows(ctx);
  const summary = deliverySummary(ctx);

  // ---- compare: this quarter against the last snapshot taken ----
  const netTotal = data.people.filter((p) => p.squad).reduce((t, p) => t + netMW(ctx, p.name), 0);
  const histA = data.history[data.history.length - 1] ?? NO_SNAPSHOT;
  const cmpRow = (label: string, a: number, b: number) => {
    const d = b - a;
    return {
      row: COORDS.CM_TOP + COMPARE_ROWS.indexOf(label),
      a: r(a, 4), b: r(b, 4), change: r(d, 4),
      read: Math.abs(d) <= 0.0005 ? "same" : d > 0 ? "better" : "worse",
    };
  };

  // ---- checksums, squads, the close list ----
  let tlAvailable = 0;
  let tlAssigned = 0;
  for (const p of data.people) {
    for (const mon of ctx.weeks) {
      const wk = timelineWeek(ctx, p.name, mon);
      tlAvailable += wk.available;
      tlAssigned += wk.assigned;
    }
  }
  const squadTable = data.squads.map((s, i) => {
    const net = squadNetMW(ctx, s.name);
    const committed = data.work
      .filter((w) => w.squad === s.name && counts(ctx, w))
      .reduce((t, w) => t + workMW(ctx, w), 0);
    return {
      name: s.name, row: COORDS.SQ_TOP + i, net: r(net, 4), committed: r(committed, 4),
      utilisation: net === 0 ? 0 : r(committed / net, 6),
    };
  });
  const ended = data.work
    .filter((w) => counts(ctx, w) && itemSpan(w)[1] <= ctx.lastSprint)
    .map((w) => w.title)
    .sort();

  return {
    quarter: st.quarter,
    /** Net capacity across the people on a squad: the sum Compare's net capacity row is built from. */
    net_total: r(netTotal, 4),
    committed_total: {
      sheet: "Squads", cell: `I${COORDS.SQ_TOP + COORDS.SQ_N}`, value: r(allCommitted, 4),
    },
    proposed_total: {
      sheet: "Squads", cell: `J${COORDS.SQ_TOP + COORDS.SQ_N}`, value: r(allProposed, 4),
    },
    delivered: { sheet: "History", cell: `D${COORDS.H_TOP}`, value: r(delivered, 4) },
    in_plan: { sheet: "History", cell: `C${COORDS.H_TOP}`, value: r(inPlanMW, 4) },
    reliability: { value: r(reliability, 6) },
    compare: {
      quarter_a: histA.quarter,
      quarter_b: st.quarter,
      rows: {
        net_capacity: cmpRow("Net capacity (MW)", histA.netMW, netTotal),
        gbp_in_year: cmpRow("£ in-year", histA.gbp, gbpInYear(ctx)),
        delivered_mw: cmpRow("Delivered MW", histA.deliveredMW, delivered),
      },
    },
    reservations: {
      rows: resRows.map((row, i) => ({
        sheet: "Reservations", row: COORDS.RS_TOP + i, squad: row.squad, quarter: row.quarter,
        category: row.category, mw: row.mw, drawn: r(row.drawn, 6), remaining: r(row.remaining, 6),
      })),
      reserved_total: r(reservedTotal(ctx, resRows), 6),
    },
    checksums: { tl_available: r(tlAvailable, 4), tl_assigned: r(tlAssigned, 4) },
    squads: { rows: squadTable },
    ended_items: { count: ended.length, titles: ended },
    delivery: {
      cur_sprint: summary.currentSprint,
      on_time_pct: r(summary.onTimePct, 6),
      delivered: summary.delivered,
      on_time: summary.onTime,
      cycle_time: r(summary.cycleTime, 6),
      cycle_rows: summary.cycleRows,
      carry_over_count: summary.carryOverCount,
      carry_over_mw: r(summary.carryOverMW, 4),
      counts: summary.counts,
    },
  };
}

export type QuarterView = ReturnType<typeof compute>;
