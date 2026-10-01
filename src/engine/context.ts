// Everything the rules are worked against: the quarter, the sprint grid, the timeline weeks and the
// per-person bookings. Built once from a Dataset; every engine function is pure over it.
import type { CapacityImpact, Dataset, WorkItem } from "../model/types";
import { addDays, MS_DAY, networkdays, parseDate, quarterRange, weekday } from "./dates";
import { consumingSpan } from "./stopped";

export type Span = [Date, Date];

/** One absence, kept with the type the row carries so reporting can read it back. */
export interface AbsenceSpan {
  from: Date;
  to: Date;
  type: string;
}

export interface EngineContext {
  data: Dataset;
  today: Date;
  qstart: Date;
  qend: Date;
  epoch: Date;
  sprintDays: number;
  mwDays: number;
  defaultModifier: number;
  leadModifier: number;
  logAbsences: boolean;
  firstSprint: number;
  sprints: number;
  lastSprint: number;
  currentSprint: number;
  sprintWorkingDays: Map<number, number>;
  weeks: Date[];
  quarterWeekOffset: number;
  impact: Record<string, CapacityImpact>;
  byTitle: Map<string, WorkItem>;
  parents: Set<string>;
  kids: Record<string, number>;
  absenceDays: Record<string, number>;
  personAbsences: Record<string, Span[]>;
  /** The same absences with their type, for reporting; capacity reads personAbsences. */
  absenceSpans: Record<string, AbsenceSpan[]>;
  personBookings: Record<string, Span[]>;
  typedPairs: Set<string>;
  personSquad: Record<string, string>;
  personRegion: Record<string, string>;
}

/** The key a typed booking is recognised by: one person on one item. */
export function bookingKey(person: string, item: string): string {
  return `${person}|${item}`;
}

export function sprintStart(ctx: EngineContext, num: number): Date {
  return addDays(ctx.epoch, (num - 1) * ctx.sprintDays);
}

export function sprintEnd(ctx: EngineContext, num: number): Date {
  return addDays(sprintStart(ctx, num), ctx.sprintDays - 1);
}

/**
 * The absolute sprint span of a work item; an empty span when it carries no sprints. A row written
 * before span was stored, or by a form that only sets the sprint fields, still schedules.
 */
export function itemSpan(item: WorkItem): [number, number] {
  if (item.span) return item.span;
  if (typeof item.startSprint !== "number") return [0, -1];
  return [item.startSprint, typeof item.endSprint === "number" ? item.endSprint : item.startSprint];
}

export function bankHolidayCount(ctx: EngineContext, region: string, a: Date, b: Date): number {
  const reg = region === "Wales" ? "England" : region;
  let count = 0;
  for (const bh of ctx.data.bankHolidays) {
    const d = parseDate(bh.date);
    if (bh.region === reg && d >= a && d <= b && weekday(d) < 5) count += 1;
  }
  return count;
}

export function buildContext(data: Dataset, today: Date = new Date()): EngineContext {
  const st = data.settings;
  const [qstart, qend] = quarterRange(st.quarter);
  const epoch = parseDate(st.epoch);
  const sprintDays = st.sprintDays;
  const firstSprint = Math.floor((qstart.getTime() - epoch.getTime()) / MS_DAY / sprintDays) + 1;
  const sprints = Math.min(
    8,
    Math.floor((qend.getTime() - epoch.getTime()) / MS_DAY / sprintDays) + 1 - firstSprint + 1,
  );

  const impact: Record<string, CapacityImpact> = {};
  for (const s of st.states) impact[s.name] = s.impact;

  const byTitle = new Map<string, WorkItem>();
  for (const w of data.work) byTitle.set(w.title, w);

  const parents = new Set<string>();
  const kids: Record<string, number> = {};
  for (const w of data.work) {
    if (w.parent) {
      parents.add(w.parent);
      kids[w.parent] = (kids[w.parent] ?? 0) + 1;
    }
  }

  const personRegion: Record<string, string> = {};
  const personSquad: Record<string, string> = {};
  for (const p of data.people) {
    personRegion[p.name] = p.region;
    personSquad[p.name] = p.squad;
  }

  const ctx: EngineContext = {
    data, today, qstart, qend, epoch, sprintDays,
    mwDays: st.mwDays,
    defaultModifier: st.defaultModifier,
    leadModifier: st.leadModifier,
    logAbsences: st.logAbsences === "Yes",
    firstSprint,
    sprints,
    lastSprint: firstSprint + sprints - 1,
    currentSprint: Math.floor((today.getTime() - epoch.getTime()) / MS_DAY / sprintDays) + 1,
    sprintWorkingDays: new Map(),
    weeks: [],
    quarterWeekOffset: 0,
    impact, byTitle, parents, kids,
    absenceDays: {},
    personAbsences: {},
    absenceSpans: {},
    personBookings: {},
    typedPairs: new Set(),
    personSquad, personRegion,
  };

  for (let k = 0; k < sprints; k += 1) {
    const num = firstSprint + k;
    const s = sprintStart(ctx, num);
    const e = sprintEnd(ctx, num);
    ctx.sprintWorkingDays.set(num, Math.max(0, networkdays(s > qstart ? s : qstart, e < qend ? e : qend)));
  }

  for (const a of data.absences) {
    const from = parseDate(a.from);
    const to = parseDate(a.to);
    (ctx.personAbsences[a.person] ??= []).push([from, to]);
    (ctx.absenceSpans[a.person] ??= []).push({ from, to, type: a.type });
    const lo = from > qstart ? from : qstart;
    const hi = to < qend ? to : qend;
    const region = personRegion[a.person] ?? "England";
    const days = Math.max(0, networkdays(lo, hi) - bankHolidayCount(ctx, region, lo, hi));
    ctx.absenceDays[a.person] = (ctx.absenceDays[a.person] ?? 0) + days;
  }

  for (const a of data.assignments) {
    ctx.typedPairs.add(bookingKey(a.person, a.item));
    const span = consumingSpan(data, byTitle.get(a.item), [parseDate(a.from), parseDate(a.to)]);
    if (span) (ctx.personBookings[a.person] ??= []).push(span);
  }
  // the sheet writes an automatic booking for each assignee of live work with no components, unless a
  // typed row for the same person and item already stands in for it
  for (const w of data.work) {
    if (impact[w.state] === "Removed" || (kids[w.title] ?? 0) > 0) continue;
    const [ks, ke] = itemSpan(w);
    const span = consumingSpan(data, w, [
      addDays(epoch, (ks - 1) * sprintDays),
      addDays(epoch, ke * sprintDays - 1),
    ]);
    if (!span) continue;
    const seen: string[] = [];
    for (const nm of w.assignees) {
      if (!nm || seen.includes(nm) || ctx.typedPairs.has(bookingKey(nm, w.title))) continue;
      seen.push(nm);
      (ctx.personBookings[nm] ??= []).push(span);
    }
  }

  const jan1 = new Date(Date.UTC(st.timelineYear, 0, 1));
  const isoDow = jan1.getUTCDay() === 0 ? 7 : jan1.getUTCDay();
  const mon0 = addDays(jan1, -(isoDow - 1));
  for (let k = 0; k < st.weeks; k += 1) ctx.weeks.push(addDays(mon0, 7 * k));
  ctx.quarterWeekOffset = Math.max(0, ctx.weeks.filter((m) => m <= qstart).length - 1);

  return ctx;
}
