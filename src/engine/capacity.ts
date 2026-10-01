// Capacity: what one person really brings to a quarter, and what a squad has once work and
// reservations are taken off it. Ported from wp_model.py (net_mw, net_factor, week_days, _person_week,
// _booked_days, _own_days, _free_for, _tl_week).
import type { EngineContext, Span } from "./context";
import { bankHolidayCount, bookingKey, itemSpan } from "./context";
import type { Person, WorkItem } from "../model/types";
import { addDays, daysBetween, networkdays, overlapWeek, parseDate } from "./dates";
import { consumingSpan } from "./stopped";

function person(ctx: EngineContext, name: string): Person {
  const p = ctx.data.people.find((x) => x.name === name);
  if (!p) throw new Error(`No such person: ${name}`);
  return p;
}

export function daysPerWeek(ctx: EngineContext, name: string): number {
  return person(ctx, name).daysPerWeek ?? ctx.mwDays;
}

export function modifier(ctx: EngineContext, name: string): number {
  const p = person(ctx, name);
  return p.modifierOverride ?? (p.lead ? ctx.leadModifier : ctx.defaultModifier);
}

/**
 * Working days in the quarter, less region bank holidays and absence days, times (1 - modifier), over
 * five. A part-time week scales the working days, the bank holidays and the absence days alike.
 */
export function netMW(ctx: EngineContext, name: string): number {
  const p = person(ctx, name);
  const dpw = daysPerWeek(ctx, name);
  const workDays = p.employment === "Open vacancy"
    ? 0
    : (Math.max(0, networkdays(ctx.qstart, ctx.qend)) * dpw) / ctx.mwDays;
  const bhDays = ctx.logAbsences
    ? (bankHolidayCount(ctx, p.region, ctx.qstart, ctx.qend) * dpw) / ctx.mwDays
    : 0;
  const absDays = ctx.logAbsences ? ((ctx.absenceDays[name] ?? 0) * dpw) / ctx.mwDays : 0;
  const avail = Math.max(0, workDays - bhDays - absDays);
  return (avail * (1 - modifier(ctx, name))) / ctx.mwDays;
}

/** Net MW over gross MW: the share of a booked week the person really brings. */
export function netFactor(ctx: EngineContext, name: string): number {
  const gross = networkdays(ctx.qstart, ctx.qend) / ctx.mwDays;
  if (gross <= 0) return 0;
  return netMW(ctx, name) / gross;
}

export interface PersonWeek {
  assigned: number;
  leave: number;
  free: number;
}

/**
 * Assigned days, leave days and free days for one person in one week. Bookings in the same week are
 * taken as a union: the smaller of the days summed and the span from the earliest start to the latest
 * end, capped at five.
 */
export function weekDays(ctx: EngineContext, name: string, mon: Date): PersonWeek {
  const p = person(ctx, name);
  const dpw = daysPerWeek(ctx, name);
  const bh = bankHolidayCount(ctx, p.region, mon, addDays(mon, 4));
  const leave = (ctx.personAbsences[name] ?? []).reduce((t, [a, b]) => t + overlapWeek(a, b, mon), 0);
  const avail = Math.max(0, dpw - (ctx.logAbsences ? ((bh + leave) * dpw) / ctx.mwDays : 0));
  const overlapping = (ctx.personBookings[name] ?? []).filter(([a, b]) => overlapWeek(a, b, mon) > 0);
  let assigned = 0;
  if (overlapping.length) {
    const fri = addDays(mon, 4);
    const earliest = overlapping.reduce((m, [a]) => (a < m ? a : m), overlapping[0][0]);
    const latest = overlapping.reduce((m, [, b]) => (b > m ? b : m), overlapping[0][1]);
    const first = earliest > mon ? earliest : mon;
    const last = latest < fri ? latest : fri;
    const summed = overlapping.reduce((t, [a, b]) => t + overlapWeek(a, b, mon), 0);
    assigned = Math.min(5, summed, daysBetween(first, last) + 1);
  }
  return { assigned, leave, free: Math.max(0, avail - assigned) };
}

/** Contracted days in the week less bank holidays and leave, the modifier, and the days left free. */
export function personWeek(
  ctx: EngineContext, name: string, mon: Date,
): { avail: number; mod: number; free: number } {
  const p = person(ctx, name);
  const dpw = daysPerWeek(ctx, name);
  const lost = bankHolidayCount(ctx, p.region, mon, addDays(mon, 4))
    + (ctx.personAbsences[name] ?? []).reduce((t, [a, b]) => t + overlapWeek(a, b, mon), 0);
  const avail = Math.max(0, dpw - (ctx.logAbsences ? (lost * dpw) / ctx.mwDays : 0));
  return { avail, mod: modifier(ctx, name), free: weekDays(ctx, name, mon).free };
}

/** Every booking that week, uncapped: a week booked twice over reads ten days, not five. */
export function bookedDays(ctx: EngineContext, name: string, mon: Date): number {
  return (ctx.personBookings[name] ?? []).reduce((t, [a, b]) => t + overlapWeek(a, b, mon), 0);
}

/**
 * That person's own bookings on one item: any typed row, plus the automatic one from Work, each
 * clipped to the days it still consumes capacity on.
 */
export function itemBookings(ctx: EngineContext, name: string, item: WorkItem): Span[] {
  const out: Span[] = [];
  for (const a of ctx.data.assignments) {
    if (a.person !== name || a.item !== item.title) continue;
    const span = consumingSpan(ctx.data, item, [parseDate(a.from), parseDate(a.to)]);
    if (span) out.push(span);
  }
  if (item.assignees.includes(name) && !ctx.typedPairs.has(bookingKey(name, item.title))) {
    const [ks, ke] = itemSpan(item);
    const span = consumingSpan(ctx.data, item, [
      addDays(ctx.epoch, (ks - 1) * ctx.sprintDays),
      addDays(ctx.epoch, ke * ctx.sprintDays - 1),
    ]);
    if (span) out.push(span);
  }
  return out;
}

export function ownDays(ctx: EngineContext, name: string, item: WorkItem, mon: Date): number {
  return itemBookings(ctx, name, item).reduce((t, [a, b]) => t + overlapWeek(a, b, mon), 0);
}

/**
 * The MW that person can really give this item in timeline week k (1-based): the days they have that
 * week less the days their other bookings take, never more than the capacity they have that week.
 */
export function freeFor(ctx: EngineContext, name: string, item: WorkItem, k: number): number {
  const mon = ctx.weeks[k - 1];
  const { avail, mod, free } = personWeek(ctx, name, mon);
  const assigned = weekDays(ctx, name, mon).assigned;
  const other = Math.max(0, bookedDays(ctx, name, mon) - ownDays(ctx, name, item, mon));
  return Math.min(
    (avail * (1 - mod)) / ctx.mwDays,
    (Math.max(0, free + assigned - other) * (1 - mod)) / ctx.mwDays,
  );
}

/** Available and assigned MW for one person-week, as the TLcalc grid works them out. */
export function timelineWeek(
  ctx: EngineContext, name: string, mon: Date,
): { available: number; assigned: number } {
  const p = person(ctx, name);
  if (p.employment === "Open vacancy") return { available: 0, assigned: 0 };
  const mod = modifier(ctx, name);
  if (mod >= 1) return { available: 0, assigned: 0 };
  const { assigned, leave } = weekDays(ctx, name, mon);
  const dpw = daysPerWeek(ctx, name);
  const bh = bankHolidayCount(ctx, p.region, mon, addDays(mon, 4));
  const availDays = Math.max(0, dpw - (ctx.logAbsences ? ((bh + leave) * dpw) / ctx.mwDays : 0));
  return {
    available: (availDays * (1 - mod)) / ctx.mwDays,
    assigned: (Math.min(assigned, availDays) * (1 - mod)) / ctx.mwDays,
  };
}

/** The seed writes sickness as "Sickness"; a reader, and the planner, call it Sick. */
export function isSickness(type: string): boolean {
  return type.toLowerCase().startsWith("sick");
}

const sameType = (a: string, b: string): boolean =>
  (isSickness(a) && isSickness(b)) || a.toLowerCase() === b.toLowerCase();

export interface AbsenceLoss {
  days: number;
  mw: number;
}

export interface AbsenceReport extends AbsenceLoss {
  byPerson: Record<string, AbsenceLoss>;
  byType: Record<string, AbsenceLoss>;
  /** Whether Settings has the absence coming off capacity; the MW is reported either way. */
  deducted: boolean;
}

/**
 * The productive MW absence takes out of a window: working days inside both the window and the
 * quarter, less the person's own bank holidays, scaled exactly as netMW deducts them, which is
 * days x dpw / mwDays x (1 - modifier) / mwDays.
 */
export function absenceMW(
  ctx: EngineContext,
  opts: { type?: string; from?: Date; to?: Date; squad?: string } = {},
): AbsenceReport {
  const lo = opts.from && opts.from > ctx.qstart ? opts.from : ctx.qstart;
  const hi = opts.to && opts.to < ctx.qend ? opts.to : ctx.qend;
  const out: AbsenceReport = {
    days: 0, mw: 0, byPerson: {}, byType: {}, deducted: ctx.logAbsences,
  };
  for (const [name, spans] of Object.entries(ctx.absenceSpans)) {
    if (opts.squad && ctx.personSquad[name] !== opts.squad) continue;
    if (!ctx.data.people.some((p) => p.name === name)) continue;
    const region = ctx.personRegion[name] ?? "England";
    const scale = (daysPerWeek(ctx, name) / ctx.mwDays) * (1 - modifier(ctx, name)) / ctx.mwDays;
    for (const span of spans) {
      if (opts.type && !sameType(span.type, opts.type)) continue;
      const a = span.from > lo ? span.from : lo;
      const b = span.to < hi ? span.to : hi;
      const days = Math.max(0, networkdays(a, b) - bankHolidayCount(ctx, region, a, b));
      if (days === 0) continue;
      const mw = days * scale;
      out.days += days;
      out.mw += mw;
      const person = out.byPerson[name] ?? (out.byPerson[name] = { days: 0, mw: 0 });
      person.days += days;
      person.mw += mw;
      const type = out.byType[span.type] ?? (out.byType[span.type] = { days: 0, mw: 0 });
      type.days += days;
      type.mw += mw;
    }
  }
  return out;
}

/** Net capacity for one squad: the net MW of the people in it. */
export function squadNetMW(ctx: EngineContext, squad: string): number {
  return ctx.data.people
    .filter((p) => p.squad === squad)
    .reduce((t, p) => t + netMW(ctx, p.name), 0);
}
