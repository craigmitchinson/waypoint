// Work: what an item is worth, what it charges to this quarter, and whether it counts against
// capacity. Ported from wp_model.py (own_mw, total_mw, work_mw, commitment, counts).
import type { Commitment, WorkItem } from "../model/types";
import type { EngineContext } from "./context";
import { itemSpan } from "./context";
import { isStopped } from "./stopped";

export function sizeMW(ctx: EngineContext, size: string): number {
  return ctx.data.settings.sizes[size] ?? 0;
}

export function commitment(item: WorkItem): Commitment {
  return item.state === "Identified" || item.state === "In discovery" || item.proposed
    ? "Proposed"
    : "Committed";
}

/**
 * Consumed and Allocated work always counts; Reserved work counts once it is committed. A stopped
 * item counts for nothing: it has left every capacity figure.
 */
export function counts(ctx: EngineContext, item: WorkItem): boolean {
  if (isStopped(item)) return false;
  const imp = ctx.impact[item.state];
  return imp === "Allocated" || imp === "Consumed"
    || (imp === "Reserved" && commitment(item) === "Committed");
}

/** Work we committed to deliver, are delivering, or have delivered. */
export function inPlan(ctx: EngineContext, item: WorkItem): boolean {
  if (isStopped(item)) return false;
  return counts(ctx, item) || ctx.impact[item.state] === "Historical";
}

/** The item's own total MW: a typed override, else its size band. */
export function ownMW(ctx: EngineContext, item: WorkItem): number {
  return item.sizeOverride ?? sizeMW(ctx, item.size);
}

/** A feature with components is worth the sum of them; anything else is worth its own size. */
export function totalMW(ctx: EngineContext, item: WorkItem): number {
  if (ctx.parents.has(item.title)) {
    return ctx.data.work
      .filter((w) => w.parent === item.title)
      .reduce((t, w) => t + ownMW(ctx, w), 0);
  }
  return ownMW(ctx, item);
}

/**
 * MW charged to this quarter: the total spread evenly over the item's sprints, times the share of
 * those sprints' working days that falls inside the quarter. A feature with components charges nothing.
 */
export function workMW(ctx: EngineContext, item: WorkItem): number {
  const [ks, ke] = itemSpan(item);
  const total = ownMW(ctx, item);
  if (ctx.parents.has(item.title)) return 0;
  const effStart = Math.max(ks, ctx.firstSprint) - ctx.firstSprint + 1;
  const effEnd = Math.min(ke, ctx.lastSprint) - ctx.firstSprint + 1;
  if (effEnd < effStart) return 0;
  const perSprint = total / Math.max(1, ke - ks + 1);
  let inQuarter = 0;
  for (const [num, wd] of ctx.sprintWorkingDays) if (num >= ks && num <= ke) inQuarter += wd;
  return (perSprint * inQuarter) / ((ctx.sprintDays / 7) * 5);
}

/** MW this quarter for the counted work in one squad. */
export function squadCommittedMW(ctx: EngineContext, squad: string): number {
  return ctx.data.work
    .filter((w) => w.squad === squad && counts(ctx, w))
    .reduce((t, w) => t + workMW(ctx, w), 0);
}
