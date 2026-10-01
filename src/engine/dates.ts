// Dates, worked in UTC so a day is always a day. Ported from wp_model.py's date helpers.

export const MS_DAY = 86400000;

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * MS_DAY);
}

export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MS_DAY);
}

/** Monday is 0, Sunday is 6: Python's weekday(). */
export function weekday(d: Date): number {
  return (d.getUTCDay() + 6) % 7;
}

/** Working days from a to b inclusive. */
export function networkdays(a: Date, b: Date): number {
  if (b < a) return 0;
  let count = 0;
  for (let t = a.getTime(); t <= b.getTime(); t += MS_DAY) {
    if (weekday(new Date(t)) < 5) count += 1;
  }
  return count;
}

/** "Q4 2026" to its first and last day. */
export function quarterRange(label: string): [Date, Date] {
  const q = Number(label[1]);
  const y = Number(label.slice(-4));
  const start = new Date(Date.UTC(y, (q - 1) * 3, 1));
  const m = start.getUTCMonth() + 1 + 3;
  const end = addDays(new Date(Date.UTC(y + (m > 12 ? 1 : 0), (m - 1) % 12, 1)), -1);
  return [start, end];
}

/** Working days an interval covers in one Monday-to-Friday week. */
export function overlapWeek(a: Date | null, b: Date | null, mon: Date): number {
  const fri = addDays(mon, 4);
  if (!a || !b || a > fri || b < mon) return 0;
  const lo = a > mon ? a : mon;
  const hi = b < fri ? b : fri;
  return Math.max(0, Math.min(5, daysBetween(lo, hi) + 1));
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Banker's rounding: ties round to the nearest even integer, matching Python's round(). */
export function roundHalfEven(n: number): number {
  const floor = Math.floor(n);
  const diff = n - floor;
  if (diff < 0.5) return floor;
  if (diff > 0.5) return floor + 1;
  return floor % 2 === 0 ? floor : floor + 1;
}
