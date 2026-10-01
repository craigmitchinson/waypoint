// Estimates and calibration: what a row was committed at, what it really took, and what the size
// bands are worth once the closed work has spoken. Ported from wp_model.py (orig_own, orig_mw,
// actual_mw, the accuracy walk and the size band).
import type { WorkItem } from "../model/types";
import type { EngineContext } from "./context";
import { roundHalfEven } from "./dates";
import { commitment, ownMW, sizeMW, totalMW } from "./work";

const DELIVERED_STATUSES = ["Done on time", "Done late", "Done, sprint unknown"];

/** The estimate a row was committed at: nothing for proposed work or a feature with components. */
export function originalOwnMW(ctx: EngineContext, item: WorkItem): number {
  if (commitment(item) !== "Committed" || ctx.parents.has(item.title)) return 0;
  return ownMW(ctx, item) || 0;
}

export function originalMW(ctx: EngineContext, item: WorkItem): number {
  if (ctx.parents.has(item.title)) {
    return ctx.data.work
      .filter((w) => w.parent === item.title)
      .reduce((t, w) => t + originalOwnMW(ctx, w), 0);
  }
  return originalOwnMW(ctx, item);
}

export function actualMW(ctx: EngineContext, item: WorkItem): number {
  if (ctx.parents.has(item.title)) {
    return ctx.data.work
      .filter((w) => w.parent === item.title)
      .reduce((t, w) => t + (w.actualEffort ?? 0), 0);
  }
  return item.actualEffort ?? 0;
}

export interface EstimateRow {
  title: string;
  original: number;
  latest: number;
  actual: number;
  variance: number;
  variancePct: number;
}

export function estimates(ctx: EngineContext): EstimateRow[] {
  return ctx.data.work
    .filter((w) => w.actualEffort != null)
    .map((w) => {
      const original = originalMW(ctx, w);
      const actual = actualMW(ctx, w);
      return {
        title: w.title, original, latest: totalMW(ctx, w), actual,
        variance: actual - original,
        variancePct: original ? (actual - original) / original : 0,
      };
    });
}

/** The live rows a quarter's accuracy is read from: childless, committed and delivered. */
export function liveDeliveredRows(ctx: EngineContext): WorkItem[] {
  return ctx.data.work.filter(
    (w) => w.actualEffort != null && !ctx.parents.has(w.title)
      && originalMW(ctx, w) > 0 && actualMW(ctx, w) > 0,
  );
}

/** Actual over original for the delivered rows that carry both. */
export function estimateAccuracy(ctx: EngineContext): number {
  const rows = liveDeliveredRows(ctx);
  const original = rows.reduce((t, w) => t + originalMW(ctx, w), 0);
  return original ? rows.reduce((t, w) => t + actualMW(ctx, w), 0) / original : 0;
}

export interface CalibrationBand {
  size: string;
  items: number;
  avgOriginal: number;
  avgActual: number;
  ratio: number;
  current: number;
  suggested: number;
}

/**
 * One size band end to end: the archived rows of that size plus this quarter's, each delivered item
 * counted once. The suggestion is the Settings MW times the ratio, to the nearest half week.
 */
export function calibrationBand(ctx: EngineContext, size: string): CalibrationBand {
  const seen = new Set<string>();
  const archived = ctx.data.archive.filter((r) => {
    if (!DELIVERED_STATUSES.includes(r.status) || seen.has(r.title)) return false;
    seen.add(r.title);
    return true;
  });
  const live = liveDeliveredRows(ctx).filter((w) => w.size === size);
  const originals = [
    ...archived.filter((r) => r.size === size).map((r) => r.original),
    ...live.map((w) => originalMW(ctx, w)),
  ];
  const actuals = [
    ...archived.filter((r) => r.size === size).map((r) => r.actual),
    ...live.map((w) => actualMW(ctx, w)),
  ];
  const sum = (xs: number[]) => xs.reduce((t, x) => t + x, 0);
  const ratio = sum(originals) ? sum(actuals) / sum(originals) : 0;
  const current = sizeMW(ctx, size);
  return {
    size,
    items: originals.length,
    avgOriginal: originals.length ? sum(originals) / originals.length : 0,
    avgActual: actuals.length ? sum(actuals) / actuals.length : 0,
    ratio,
    current,
    suggested: Math.max(0.5, roundHalfEven((current * ratio) / 0.5) * 0.5),
  };
}
