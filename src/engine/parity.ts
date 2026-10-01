// The parity surface: the probe rows the generator proves each rule on, worked from the seed and held
// against wp_expected.json. The app never reads this; compute() carries the figures the app shows.
import type { Dataset, WorkItem } from "../model/types";
import { buildContext } from "./context";
import type { EngineContext } from "./context";
import { bookedDays, netMW, ownDays, squadNetMW, weekDays } from "./capacity";
import { capacityCheck } from "./capacityCheck";
import type { CapacityCheck } from "./capacityCheck";
import { COORDS, compute } from "./compute";
import { addDays, roundHalfEven, toISO } from "./dates";
import { commitment, counts, ownMW, totalMW, workMW } from "./work";
import { benefitValue } from "./value";
import { deliverySummary } from "./delivery";
import { reservationRows, squadReservedMW } from "./reservations";
import { actualMW, calibrationBand, estimateAccuracy, originalMW, originalOwnMW } from "./calibration";

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];

/** The seed rows the generator proves each rule on. */
export const PROBES = {
  person: "Theo Marshall",
  partTimer: "Lena Brooks",
  workItem: "Exception queue UI",
  capacityItems: ["Exception queue UI", "Bank feed monitoring and alerts"],
  valueItem: "Statement matching rules v2",
  squad: "Squad 1",
  reservationSquad: "Squad 4",
  calibrationSize: "M",
  noSnapshotQuarter: "Q1 2027",
  deliverySample: ["Real-time status page", "Data warehouse access for analytics", "CI pipeline overhaul"],
  countsClasses: [
    ["Consumed", "Invoice capture and OCR: handwritten route to exception queue"],
    ["Reserved, committed", "3-way match and posting engine"],
    ["Reserved, proposed", "Multi-bank feed normaliser: long tail formats"],
    ["None", "Payments SDK v3 migration"],
  ] as [string, string][],
};

const r = (x: number, places: number): number => {
  const f = 10 ** places;
  return Math.round(x * f) / f;
};

function item(ctx: EngineContext, title: string): WorkItem {
  const w = ctx.byTitle.get(title);
  if (!w) throw new Error(`No such work item: ${title}`);
  return w;
}

function workRow(ctx: EngineContext, title: string): number {
  return COORDS.W_TOP + ctx.data.work.findIndex((w) => w.title === title);
}

function personRow(ctx: EngineContext, name: string): number {
  return COORDS.P_TOP + ctx.data.people.findIndex((p) => p.name === name);
}

function squadRow(ctx: EngineContext, name: string): number {
  return COORDS.SQ_TOP + ctx.data.squads.findIndex((s) => s.name === name);
}

function capacityItem(ctx: EngineContext, check: CapacityCheck) {
  const row = workRow(ctx, check.title);
  return {
    title: check.title, sheet: "Work", row, helper_row: row,
    check_cell: `DB${row}`, says_cell: `DC${row}`, slip_cell: `DD${row}`,
    end_sprint: check.endSprint, sprint_from: check.sprintFrom, sprint_to: check.sprintTo,
    total: r(check.total, 6), outside: check.outside,
    first_week: check.firstWeek, last_week: check.lastWeek, required: r(check.required, 6),
    assignees: check.assignees.map((a) => ({
      name: a.name,
      available_cell: "KLM"[a.slot],
      short_cell: "NOP"[a.slot],
      finish_cell: "UVW"[a.slot],
      available: r(a.available, 6),
      shortfall: r(a.shortfall, 6),
      finish_week: a.finishWeek,
    })),
    finish_week: check.finishWeek, says: check.says, slip: check.slip,
  };
}

/** compute(), with every probe row the fixture names laid over it. Seed rows only. */
export function computeParity(data: Dataset, today: Date = new Date()) {
  const base = compute(data, today);
  const ctx = buildContext(data, today);

  const probe = item(ctx, PROBES.workItem);
  const value = benefitValue(ctx, item(ctx, PROBES.valueItem));
  const valueRow = workRow(ctx, PROBES.valueItem);

  const countsClasses: Record<string, unknown> = {};
  for (const [cls, title] of PROBES.countsClasses) {
    const w = item(ctx, title);
    countsClasses[cls] = {
      title, sheet: "Work", cell: `BU${workRow(ctx, title)}`, state: w.state,
      commitment: commitment(w), value: counts(ctx, w) ? "Yes" : "No",
    };
  }

  const resRows = reservationRows(ctx);
  const resSquad = PROBES.reservationSquad;
  const resNet = squadNetMW(ctx, resSquad);
  const resCommitted = data.work
    .filter((w) => w.squad === resSquad && counts(ctx, w))
    .reduce((t, w) => t + workMW(ctx, w), 0);
  const resHeld = squadReservedMW(ctx, resSquad, resRows);
  const resSqRow = squadRow(ctx, resSquad);

  // ---- free days and the next free window ----
  const qoff = ctx.quarterWeekOffset;
  let fdName = "";
  let busyK = 0;
  let clearK = 0;
  for (const p of data.people) {
    if (p.employment === "Open vacancy" || !ctx.personBookings[p.name]) continue;
    let busy: number | null = null;
    let clear: number | null = null;
    for (let k = qoff; k < qoff + 13; k += 1) {
      const wk = weekDays(ctx, p.name, ctx.weeks[k]);
      if (wk.assigned === 3 && busy === null) busy = k;
      if (wk.assigned === 0 && wk.leave === 0 && clear === null) clear = k;
    }
    if (busy !== null && clear !== null) {
      fdName = p.name;
      busyK = busy;
      clearK = clear;
      break;
    }
  }
  const quarterFree: number[] = [];
  for (let k = qoff; k < qoff + 13; k += 1) {
    quarterFree.push(roundHalfEven(weekDays(ctx, fdName, ctx.weeks[k]).free));
  }
  const winIndex = quarterFree.findIndex((v) => v >= 3);
  const win = winIndex < 0 ? 0 : winIndex + 1;
  let run = 0;
  if (win) {
    for (const v of quarterFree.slice(win - 1)) {
      if (v < 3) break;
      run += 1;
    }
  }
  const freeDays = {
    name: fdName, sheet: "TLcalc", row_col: 3, fd_col: COORDS.TC_FD0,
    busy: {
      col: COORDS.TC_FD0 + busyK, week: toISO(ctx.weeks[busyK]), assigned: 3,
      value: r(weekDays(ctx, fdName, ctx.weeks[busyK]).free, 4),
    },
    clear: {
      col: COORDS.TC_FD0 + clearK, week: toISO(ctx.weeks[clearK]), assigned: 0,
      value: r(weekDays(ctx, fdName, ctx.weeks[clearK]).free, 4),
    },
    window: {
      week: win || "", date: win ? toISO(ctx.weeks[qoff + win - 1]) : "",
      run, total: quarterFree.reduce((t, v) => t + v, 0),
    },
  };

  // a person-week that carries both a bar and leave
  const onLeave = (name: string, mon: Date): boolean =>
    (ctx.personAbsences[name] ?? []).some(([a, b]) => a <= addDays(mon, 4) && b >= mon);
  let lbName = "";
  let lbK = 0;
  outer: for (const p of data.people) {
    for (let k = 0; k < ctx.weeks.length; k += 1) {
      const mon = ctx.weeks[k];
      const bars = (ctx.personBookings[p.name] ?? []).filter(([a, b]) => a <= addDays(mon, 4) && b >= mon).length;
      if (bars === 1 && onLeave(p.name, mon)) {
        lbName = p.name;
        lbK = k;
        break outer;
      }
    }
  }
  const leaveBar = {
    name: lbName, week: lbName ? toISO(ctx.weeks[lbK]) : "", col: lbName ? COORDS.WK0 + lbK : 0,
    on_leave: lbName ? data.people.filter((p) => onLeave(p.name, ctx.weeks[lbK])).length : 0,
  };

  // ---- capacity check ----
  const checks = new Map<string, CapacityCheck | null>();
  for (const w of data.work) checks.set(w.title, capacityCheck(ctx, w));
  let doubleBooked = "";
  outer2: for (const w of data.work) {
    const c = checks.get(w.title);
    if (!c || c.outside || PROBES.capacityItems.includes(w.title)) continue;
    for (const a of c.assignees) {
      for (let k = c.firstWeek; k <= c.lastWeek; k += 1) {
        const mon = ctx.weeks[k - 1];
        if (bookedDays(ctx, a.name, mon) - ownDays(ctx, a.name, w, mon) > 0
          && weekDays(ctx, a.name, mon).free <= 0) {
          doubleBooked = w.title;
          break outer2;
        }
      }
    }
  }
  const capacityTitles = [...PROBES.capacityItems, ...(doubleBooked ? [doubleBooked] : [])];

  // ---- estimates ----
  const estimateItems: Record<string, unknown> = {};
  const withActuals = data.work
    .filter((w) => w.actualEffort != null)
    .map((w) => w.title)
    .sort();
  for (const title of withActuals) {
    const w = item(ctx, title);
    const row = workRow(ctx, title);
    const o = originalMW(ctx, w);
    const a = actualMW(ctx, w);
    estimateItems[title] = {
      sheet: "Work", row,
      original_cell: `CT${row}`, original: r(o, 4),
      latest_cell: `CU${row}`, latest: r(totalMW(ctx, w), 4),
      actual_cell: `CV${row}`, actual: r(a, 4),
      variance_cell: `CW${row}`, variance: r(a - o, 4),
      variance_pct: o ? r((a - o) / o, 6) : 0,
    };
  }
  const parentTitle = [...ctx.parents].sort()[0];
  const parent = item(ctx, parentTitle);
  const parentRow = workRow(ctx, parentTitle);
  const chunkOriginals: Record<string, number> = {};
  for (const w of data.work.filter((x) => x.parent === parentTitle).sort((a, b) => (a.title < b.title ? -1 : 1))) {
    chunkOriginals[w.title] = r(originalOwnMW(ctx, w), 4);
  }
  const chunks: Record<string, unknown> = {};
  for (const w of data.work.filter((x) => x.parent === parentTitle)) {
    chunks[w.title] = {
      sheet: "Work", cell: `H${workRow(ctx, w.title)}`, value: r(workMW(ctx, w), 4),
      total_mw: ownMW(ctx, w), kind: w.kind,
    };
  }
  const spike = data.work.find((w) => w.kind === "Spike") as WorkItem;

  const band = calibrationBand(ctx, PROBES.calibrationSize);
  const squadCommitted = data.work
    .filter((w) => w.squad === PROBES.squad && counts(ctx, w))
    .reduce((t, w) => t + workMW(ctx, w), 0);

  const statuses = deliverySummary(ctx).statuses;
  const deliverySample: Record<string, unknown> = {};
  for (const title of PROBES.deliverySample) {
    deliverySample[title] = {
      sheet: "Work", cell: `CS${workRow(ctx, title)}`, value: statuses.get(title),
    };
  }

  return {
    ...base,
    work_value: { title: PROBES.valueItem, sheet: "Work", cell: `AF${valueRow}`, value: r(value.inYear, 2) },
    work_rate: { title: PROBES.valueItem, sheet: "Work", cell: `AD${valueRow}`, value: value.rate },
    work_recorded: {
      title: PROBES.valueItem, sheet: "Work", cell: `BI${valueRow}`, value: r(value.recorded, 2),
    },
    person: {
      name: PROBES.person, sheet: "People", cell: `Y${personRow(ctx, PROBES.person)}`,
      value: r(netMW(ctx, PROBES.person), 4),
    },
    part_timer: {
      name: PROBES.partTimer, sheet: "People", cell: `Y${personRow(ctx, PROBES.partTimer)}`,
      value: r(netMW(ctx, PROBES.partTimer), 4),
    },
    work: {
      title: PROBES.workItem, sheet: "Work", cell: `H${workRow(ctx, PROBES.workItem)}`,
      value: r(workMW(ctx, probe), 4),
    },
    squad: {
      name: PROBES.squad, sheet: "Squads", cell: `I${squadRow(ctx, PROBES.squad)}`,
      value: r(squadCommitted, 4),
    },
    feature: {
      title: parentTitle, sheet: "Work", cell: `BC${parentRow}`, value: totalMW(ctx, parent),
      mw_cell: `H${parentRow}`, mw_value: 0.0, chunks,
    },
    spike: {
      title: spike.title, sheet: "Work", cell: `H${workRow(ctx, spike.title)}`,
      value: r(workMW(ctx, spike), 4), state: spike.state,
    },
    estimates: {
      items: estimateItems,
      feature: {
        title: parentTitle, sheet: "Work", original_cell: `CT${parentRow}`,
        original: r(originalMW(ctx, parent), 4), chunk_originals: chunkOriginals,
      },
      accuracy: { sheet: "History", cell: `F${COORDS.HD_TOP + 2}`, value: r(estimateAccuracy(ctx), 6) },
    },
    compare: {
      ...base.compare,
      no_snapshot: {
        quarter: PROBES.noSnapshotQuarter, text: `no snapshot for ${PROBES.noSnapshotQuarter}`,
      },
    },
    calibration: {
      size: band.size, sheet: "Calibration", row: COORDS.CB_TOP + SIZE_ORDER.indexOf(band.size),
      items: band.items, avg_original: r(band.avgOriginal, 6), avg_actual: r(band.avgActual, 6),
      ratio: r(band.ratio, 6), current: band.current, suggested: band.suggested,
    },
    free_days: freeDays,
    capacity: {
      items: capacityTitles.map((t) => capacityItem(ctx, checks.get(t) as CapacityCheck)),
      double_booked: doubleBooked,
    },
    leave_bar: leaveBar,
    counts_classes: countsClasses,
    reservations: {
      ...base.reservations,
      squad: {
        name: resSquad, sheet: "Squads", cell: `K${resSqRow}`, reserved_cell: `S${resSqRow}`,
        net: r(resNet, 6), committed: r(resCommitted, 6), reserved: r(resHeld, 6),
        remaining: r(resNet - resCommitted - resHeld, 6),
      },
    },
    delivery: { ...base.delivery, items: deliverySample },
  };
}
