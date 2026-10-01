// The Sprint plan: what each squad has, has promised and still holds, sprint by sprint across the
// quarter. Ported from the workbook's Sprint plan sheet (the capacity, demand, remaining and
// utilisation blocks), which spreads three things three different ways:
//   - capacity by working days: each sprint takes the share of the quarter's working days it holds,
//     and a person's week capacity is pro-rated by the days of that week inside the sprint;
//   - demand evenly per sprint: an item's MW is its total over the number of sprints it spans, and
//     every sprint of that span inside the quarter takes one whole share, partial sprint or not;
//   - reservations by the same working-day share as capacity, so a short sprint holds less of them.
import type { EngineContext } from "./context";
import { itemSpan, sprintEnd, sprintStart } from "./context";
import { personWeek } from "./capacity";
import { addDays, networkdays, weekday } from "./dates";
import { commitment, counts, ownMW } from "./work";
import { squadReservedMW } from "./reservations";

/** What the workbook writes where there is demand but no capacity at all. */
const OVER = 9.99;

export interface SprintPlanSprint {
  num: number;
  label: string;
  from: Date;
  to: Date;
  workingDays: number;
}

export interface SprintPlanCell {
  available: number;
  committed: number;
  proposed: number;
  reserved: number;
  remaining: number;
  utilisation: number;
}

export interface SprintPlanSquad {
  name: string;
  cells: SprintPlanCell[];
  totals: SprintPlanCell;
}

export interface SprintPlan {
  sprints: SprintPlanSprint[];
  squads: SprintPlanSquad[];
  totals: SprintPlanCell[];
  /** The corner of the matrix: every squad across the whole quarter. */
  grand: SprintPlanCell;
}

/** The sprint numbers of the quarter, in order. */
function sprintNumbers(ctx: EngineContext): number[] {
  const out: number[] = [];
  for (let num = ctx.firstSprint; num <= ctx.lastSprint; num += 1) out.push(num);
  return out;
}

/** The week Mondays a sprint touches, and how many of each week's working days it holds inside the quarter. */
function sprintWeeks(ctx: EngineContext, num: number): { mon: Date; days: number }[] {
  const out = new Map<number, { mon: Date; days: number }>();
  const last = sprintEnd(ctx, num);
  for (let d = sprintStart(ctx, num); d <= last; d = addDays(d, 1)) {
    if (weekday(d) >= 5 || d < ctx.qstart || d > ctx.qend) continue;
    const mon = addDays(d, -weekday(d));
    const found = out.get(mon.getTime());
    if (found) found.days += 1;
    else out.set(mon.getTime(), { mon, days: 1 });
  }
  return [...out.values()];
}

/**
 * Productive MW for one person in one sprint: the engine's own week rule, which is the contracted
 * days less bank holidays and leave at (1 - modifier) over the MW week, pro-rated by the share of
 * each week's working days that falls inside both the sprint and the quarter. An open vacancy
 * carries no capacity.
 */
export function sprintAvailableMW(ctx: EngineContext, name: string, num: number): number {
  const p = ctx.data.people.find((x) => x.name === name);
  if (!p || p.employment === "Open vacancy") return 0;
  return sprintWeeks(ctx, num).reduce((t, wk) => {
    const { avail, mod } = personWeek(ctx, name, wk.mon);
    return t + ((avail * (1 - mod)) / ctx.mwDays) * (wk.days / ctx.mwDays);
  }, 0);
}

/** Committed over available, with the workbook's own reading of demand against nothing. */
function utilisationOf(available: number, committed: number): number {
  if (available > 0) return committed / available;
  return committed > 0 ? OVER : 0;
}

function emptyCell(): SprintPlanCell {
  return { available: 0, committed: 0, proposed: 0, reserved: 0, remaining: 0, utilisation: 0 };
}

function addInto(total: SprintPlanCell, cell: SprintPlanCell): void {
  total.available += cell.available;
  total.committed += cell.committed;
  total.proposed += cell.proposed;
  total.reserved += cell.reserved;
  total.remaining += cell.remaining;
}

/**
 * The whole matrix: a row per squad on the Squads sheet, a column per sprint of the quarter, and the
 * quarter itself as the last column. Remaining is what is left once the committed work and the
 * reservations still held are taken off what the squad brings; proposed work is reported beside it,
 * as Squads reports it, and is not taken off.
 */
export function sprintPlan(ctx: EngineContext): SprintPlan {
  const nums = sprintNumbers(ctx);
  const sprints: SprintPlanSprint[] = nums.map((num) => ({
    num,
    label: `S${num}`,
    from: sprintStart(ctx, num),
    to: sprintEnd(ctx, num),
    workingDays: ctx.sprintWorkingDays.get(num) ?? 0,
  }));

  const quarterDays = Math.max(0, networkdays(ctx.qstart, ctx.qend));
  const share = sprints.map((s) => (quarterDays === 0 ? 0 : s.workingDays / quarterDays));

  const totals: SprintPlanCell[] = nums.map(() => emptyCell());
  const grand = emptyCell();

  const squads: SprintPlanSquad[] = ctx.data.squads.map((squad) => {
    const held = squadReservedMW(ctx, squad.name);
    const people = ctx.data.people.filter((p) => p.squad === squad.name);
    const work = ctx.data.work.filter((w) => w.squad === squad.name && !ctx.parents.has(w.title));

    const cells = nums.map((num, k) => {
      const available = people.reduce((t, p) => t + sprintAvailableMW(ctx, p.name, num), 0);
      let committed = 0;
      let proposed = 0;
      for (const w of work) {
        const [ks, ke] = itemSpan(w);
        if (num < ks || num > ke) continue;
        const perSprint = ownMW(ctx, w) / Math.max(1, ke - ks + 1);
        if (counts(ctx, w)) committed += perSprint;
        else if (ctx.impact[w.state] === "Reserved" && commitment(w) === "Proposed") {
          proposed += perSprint;
        }
      }
      const reserved = held * share[k];
      const cell: SprintPlanCell = {
        available,
        committed,
        proposed,
        reserved,
        remaining: available - committed - reserved,
        utilisation: utilisationOf(available, committed),
      };
      addInto(totals[k], cell);
      return cell;
    });

    const rowTotal = emptyCell();
    for (const cell of cells) addInto(rowTotal, cell);
    rowTotal.utilisation = utilisationOf(rowTotal.available, rowTotal.committed);
    addInto(grand, rowTotal);
    return { name: squad.name, cells, totals: rowTotal };
  });

  for (const cell of totals) cell.utilisation = utilisationOf(cell.available, cell.committed);
  grand.utilisation = utilisationOf(grand.available, grand.committed);

  return { sprints, squads, totals, grand };
}
