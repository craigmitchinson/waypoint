// Delivery: the status ladder, on-time delivery, cycle time and carry-over.
// Ported from wp_model.py (delivery, the At risk (capacity) overlay and the parent roll-up).
import type { WorkItem } from "../model/types";
import type { EngineContext } from "./context";
import { itemSpan } from "./context";
import { capacityCheck } from "./capacityCheck";
import { counts, inPlan, workMW } from "./work";

export type DeliveryStatus =
  | "" | "On track" | "At risk" | "At risk (capacity)" | "Late"
  | "Done on time" | "Done late" | "Done, sprint unknown";

export const STATUS_RANK: Record<string, number> = {
  "On track": 1,
  "Done on time": 2,
  "Done, sprint unknown": 3,
  "Done late": 4,
  "At risk": 5,
  "At risk (capacity)": 6,
  Late: 7,
};

/** One row's status before the capacity overlay. */
export function deliveryStatus(ctx: EngineContext, item: WorkItem, currentSprint: number): DeliveryStatus {
  if ((ctx.kids[item.title] ?? 0) > 0) return "";
  if (item.state === "Identified" || item.state === "Deferred" || item.state === "Cancelled") return "";
  const [, end] = itemSpan(item);
  if (item.doneInSprint != null) return item.doneInSprint <= end ? "Done on time" : "Done late";
  if (ctx.impact[item.state] === "Historical") return "Done, sprint unknown";
  if (currentSprint > end) return "Late";
  if ((item.state === "In development" && currentSprint === end)
    || ((item.state === "In discovery" || item.state === "Ready") && currentSprint >= end - 1)) {
    return "At risk";
  }
  return "On track";
}

/** Every row's status: the ladder, then the capacity overlay, then the worst component per feature. */
export function deliveryStatuses(ctx: EngineContext): Map<string, DeliveryStatus> {
  const out = new Map<string, DeliveryStatus>();
  for (const w of ctx.data.work) out.set(w.title, deliveryStatus(ctx, w, ctx.currentSprint));

  for (const w of ctx.data.work) {
    const check = capacityCheck(ctx, w);
    if (!check || check.outside || w.doneInSprint != null || (ctx.kids[w.title] ?? 0) > 0) continue;
    if (!counts(ctx, w)) continue;
    const status = out.get(w.title);
    if (check.assignees.some((a) => a.shortfall > 0) && (status === "On track" || status === "At risk")) {
      out.set(w.title, "At risk (capacity)");
    }
  }

  for (const parent of Object.keys(ctx.kids)) {
    const ranks = ctx.data.work
      .filter((w) => w.parent === parent && out.get(w.title))
      .map((w) => STATUS_RANK[out.get(w.title) as string]);
    if (!ranks.length) {
      out.set(parent, "");
    } else {
      const worst = Math.max(...ranks);
      const name = Object.keys(STATUS_RANK).find((k) => STATUS_RANK[k] === worst) as DeliveryStatus;
      out.set(parent, name);
    }
  }
  return out;
}

export interface DeliverySummary {
  currentSprint: number;
  statuses: Map<string, DeliveryStatus>;
  delivered: number;
  onTime: number;
  onTimePct: number;
  cycleTime: number;
  cycleRows: number;
  carryOverCount: number;
  carryOverMW: number;
  counts: Record<string, number>;
}

export function deliverySummary(ctx: EngineContext): DeliverySummary {
  const statuses = deliveryStatuses(ctx);
  // delivered and on-time read the ladder before the capacity overlay and roll-up, as wp_model.py does
  const delivered = ctx.data.work.filter(
    (w) => w.doneInSprint != null
      && w.doneInSprint >= ctx.firstSprint && w.doneInSprint <= ctx.lastSprint
      && deliveryStatus(ctx, w, ctx.currentSprint) !== "",
  );
  const onTime = delivered.filter((w) => deliveryStatus(ctx, w, ctx.currentSprint) === "Done on time");
  // a blank start sprint is an assumption, not a measurement, so it is left out of cycle time
  const cycleRows = delivered.filter((w) => w.startSprint !== "" && w.startSprint != null);
  const cycleTime = cycleRows.length
    ? cycleRows.reduce((t, w) => t + ((w.doneInSprint as number) - itemSpan(w)[0]), 0) / cycleRows.length
    : 0;

  let carryOverCount = 0;
  let carryOverMW = 0;
  for (const w of ctx.data.work) {
    // carry-over reads the ladder before the roll-up: a feature is carried by its components, not twice
    if (deliveryStatus(ctx, w, ctx.currentSprint) === "" || w.doneInSprint != null) continue;
    const [, end] = itemSpan(w);
    if (inPlan(ctx, w) && end >= ctx.firstSprint && end <= ctx.lastSprint) {
      carryOverCount += 1;
      carryOverMW += workMW(ctx, w);
    }
  }

  const keys = ["Done on time", "Done, sprint unknown", "Done late", "On track", "At risk",
    "At risk (capacity)", "Late"];
  const countsByStatus: Record<string, number> = {};
  for (const k of keys) {
    countsByStatus[k] = ctx.data.work.filter(
      (w) => statuses.get(w.title) === k && (ctx.kids[w.title] ?? 0) === 0,
    ).length;
  }

  return {
    currentSprint: ctx.currentSprint,
    statuses,
    delivered: delivered.length,
    onTime: onTime.length,
    onTimePct: delivered.length ? onTime.length / delivered.length : 0,
    cycleTime,
    cycleRows: cycleRows.length,
    carryOverCount,
    carryOverMW,
    counts: countsByStatus,
  };
}
