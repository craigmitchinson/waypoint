// The benefits landing view as one SVG string: the year as a band of twelve months, every work item
// that lands drawn as a marker in its month, and the pounds the plan accrues under them against the
// target. Pure: no React, no DOM, plain colours from the palette.
import type { BenefitCalendar, CalendarRow } from "../engine/value";
import type { Palette, Size } from "./palette";
import { FONT, esc, num, svgOpen } from "./palette";

/** One marker: a work item landing in a month of the year. */
export interface LandingItem {
  title: string;
  /** The month it lands in, 0 to 11. */
  month: number;
  gbpInYear: number;
  fte: number;
}

export interface LandingOptions {
  /** The month to mark, 0 to 11; nothing is marked outside that. */
  currentMonth: number;
  /** The items to draw; every plan row that lands in the year by default. */
  items?: LandingItem[];
  /** The strip form: titles only, over the cumulative walk, for a band above a table. */
  compact?: boolean;
}

export const LANDING_SIZE: Size = { width: 960, height: 420 };
export const LANDING_COMPACT_SIZE: Size = { width: 880, height: 110 };

const PAD = 8;
const AXIS_Y = 206;
const PLOT_TOP = 246;
const PLOT_BOTTOM = 386;
const MARKER_H = 34;
const STACK = 4;
const COMPACT_MARKER_H = 16;
const COMPACT_STACK = 2;

/** Short money, so a marker can carry it: £1.2m, £240k, £980. */
export const shortGbp = (n: number): string => {
  if (Math.abs(n) >= 1000000) return "£" + (n / 1000000).toFixed(1) + "m";
  if (Math.abs(n) >= 1000) return "£" + Math.round(n / 1000) + "k";
  return "£" + Math.round(n);
};

/** The month a row lands in, 0 to 11, or -1 when it does not land in the year. */
export function landingMonth(row: CalendarRow, year: number, months: string[]): number {
  if (!row.lands) return -1;
  const [month, landed] = row.lands.split(" ");
  if (Number(landed) !== year) return -1;
  return months.indexOf(month);
}

/** The plan's rows that land in the year, in month order. */
export function landingItems(calendar: BenefitCalendar, rows?: CalendarRow[]): LandingItem[] {
  return (rows ?? calendar.rows)
    .filter((r) => r.inPlan)
    .map((r) => ({
      title: r.title,
      month: landingMonth(r, calendar.year, calendar.months),
      gbpInYear: r.gbpInYear,
      fte: r.fteClaimed,
    }))
    .filter((i) => i.month >= 0)
    .sort((a, b) => a.month - b.month);
}

/** What a marker says it brings: the pounds when there are any, the FTE otherwise. */
export const itemValue = (item: LandingItem): string =>
  (item.gbpInYear >= 1 ? shortGbp(item.gbpInYear) : item.fte.toFixed(1) + " FTE");

/** As many characters as fit the width at 12px, with an ellipsis when the rest is cut. */
const clip = (body: string, width: number): string => {
  const max = Math.max(Math.floor(width / 6.1), 3);
  return body.length <= max ? body : body.slice(0, max - 1).trimEnd() + "…";
};

/** One run of text, placed and coloured. */
const text = (cx: number, cy: number, anchor: string, fill: string, sizePx: number,
  weight: number, body: string) =>
  "<text x=\"" + num(cx) + "\" y=\"" + num(cy) + "\" text-anchor=\"" + anchor + "\" fill=\""
  + fill + "\" font-size=\"" + sizePx + "\" font-weight=\"" + weight + "\">" + esc(body)
  + "</text>";

/**
 * The strip form: a title a month over the cumulative walk and its target, for the band above the
 * benefits table. Context, not the hero, so the money labels and the legend go.
 */
function compactSvg(
  calendar: BenefitCalendar,
  palette: Palette,
  size: Size,
  options: LandingOptions,
): string {
  const w = size.width;
  const h = size.height;
  const items = options.items ?? landingItems(calendar);
  const slot = (w - PAD * 2) / 12;
  const x = (m: number) => PAD + m * slot;
  const mid = (m: number) => x(m) + slot / 2;
  const { gbpCumulative, gbpTarget } = calendar.totals;
  const plotTop = h - 40;
  const plotBottom = h - 8;
  const high = Math.max(...gbpCumulative, ...gbpTarget, 1);
  const y = (v: number) => plotBottom - (Math.max(0, v) / high) * (plotBottom - plotTop);

  const band = calendar.months.map((month, m) => {
    const marked = m === options.currentMonth;
    const fill = m % 2 === 0 ? palette.gridline : "none";
    return "<rect x=\"" + num(x(m)) + "\" y=\"2\" width=\"" + num(slot) + "\" height=\""
      + num(plotBottom - 2) + "\" fill=\"" + fill + "\" opacity=\"0.45\"/>"
      + (marked
        ? "<line x1=\"" + num(mid(m)) + "\" x2=\"" + num(mid(m)) + "\" y1=\"2\" y2=\""
          + num(plotBottom) + "\" stroke=\"" + palette.accent + "\" stroke-dasharray=\"3 3\"/>"
        : "")
      + text(mid(m), 13, "middle", marked ? palette.accent : palette.muted, 12,
        marked ? 700 : 400, month);
  }).join("");

  const used: number[] = calendar.months.map(() => 0);
  const markers = items.map((item) => {
    const depth = used[item.month];
    used[item.month] += 1;
    if (depth >= COMPACT_STACK) return "";
    const mx = x(item.month) + 3;
    const mw = slot - 6;
    const my = 20 + depth * (COMPACT_MARKER_H + 3);
    return "<rect x=\"" + num(mx) + "\" y=\"" + num(my) + "\" width=\"" + num(mw)
      + "\" height=\"" + COMPACT_MARKER_H + "\" rx=\"4\" fill=\"" + palette.panel + "\" stroke=\""
      + palette.brandMid + "\"/>"
      + "<rect x=\"" + num(mx + 1) + "\" y=\"" + num(my + 3) + "\" width=\"2.5\" height=\""
      + (COMPACT_MARKER_H - 6) + "\" rx=\"1.25\" fill=\"" + palette.brand + "\"/>"
      + text(mx + 7, my + 12, "start", palette.ink, 12, 600, clip(item.title, mw - 11));
  }).join("");

  const over = used.map((n, m) => (n > COMPACT_STACK
    ? text(mid(m), 20 + COMPACT_STACK * (COMPACT_MARKER_H + 3) + 11, "middle", palette.muted, 12,
      400, "+" + (n - COMPACT_STACK))
    : "")).join("");

  const walk = (series: number[]) => series.map((v, m) => num(mid(m)) + "," + num(y(v))).join(" ");

  return svgOpen(w, h, "xMidYMid meet")
    + "<g font-family=\"" + FONT + "\">"
    + band + markers + over
    + "<polyline points=\"" + walk(gbpTarget) + "\" fill=\"none\" stroke=\"" + palette.muted
    + "\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/>"
    + "<polyline points=\"" + walk(gbpCumulative) + "\" fill=\"none\" stroke=\"" + palette.brand
    + "\" stroke-width=\"2\"/>"
    + "<line x1=\"" + PAD + "\" x2=\"" + num(w - PAD) + "\" y1=\"" + num(plotBottom) + "\" y2=\""
    + num(plotBottom) + "\" stroke=\"" + palette.line + "\"/>"
    + "</g></svg>";
}

/**
 * A year of landings over the pounds they accrue. Twelve month columns across the width, the items
 * stacked in the month they land in, the accrual columns under them with the cumulative walk and the
 * dashed target over them, and the year-end gap called out at the right.
 */
export function landingSvg(
  calendar: BenefitCalendar,
  palette: Palette,
  size?: Size,
  options: LandingOptions = { currentMonth: -1 },
): string {
  const box = size ?? (options.compact ? LANDING_COMPACT_SIZE : LANDING_SIZE);
  if (options.compact) return compactSvg(calendar, palette, box, options);
  const w = box.width;
  const h = box.height;
  const items = options.items ?? landingItems(calendar);
  const slot = (w - PAD * 2) / 12;
  const x = (m: number) => PAD + m * slot;
  const mid = (m: number) => x(m) + slot / 2;
  const { gbpByMonth, gbpCumulative, gbpTarget } = calendar.totals;
  const high = Math.max(...gbpCumulative, ...gbpTarget, ...gbpByMonth, 1);
  const y = (v: number) => PLOT_BOTTOM - (Math.max(0, v) / high) * (PLOT_BOTTOM - PLOT_TOP);

  // the month band: a quiet column a month, the current one marked
  const band = calendar.months.map((month, m) => {
    const marked = m === options.currentMonth;
    const fill = m % 2 === 0 ? palette.gridline : "none";
    return "<rect x=\"" + num(x(m)) + "\" y=\"8\" width=\"" + num(slot) + "\" height=\""
      + num(AXIS_Y - 8) + "\" fill=\"" + fill + "\" opacity=\"0.45\"/>"
      + (marked
        ? "<line x1=\"" + num(mid(m)) + "\" x2=\"" + num(mid(m)) + "\" y1=\"8\" y2=\""
          + num(PLOT_BOTTOM) + "\" stroke=\"" + palette.accent + "\" stroke-dasharray=\"3 3\"/>"
        : "")
      + text(mid(m), AXIS_Y + 20, "middle", marked ? palette.accent : palette.muted, 13,
        marked ? 700 : 400, month);
  }).join("");

  // the markers, stacked upward from the axis in the month they land in
  const used: number[] = calendar.months.map(() => 0);
  const markers = items.map((item) => {
    const depth = used[item.month];
    used[item.month] += 1;
    if (depth >= STACK) return "";
    const mx = x(item.month) + 4;
    const mw = slot - 8;
    const my = AXIS_Y - 14 - (depth + 1) * MARKER_H - depth * 6;
    return "<rect x=\"" + num(mx) + "\" y=\"" + num(my) + "\" width=\"" + num(mw)
      + "\" height=\"" + MARKER_H + "\" rx=\"7\" fill=\"" + palette.panel + "\" stroke=\""
      + palette.brandMid + "\"/>"
      + "<rect x=\"" + num(mx + 1) + "\" y=\"" + num(my + 7) + "\" width=\"3\" height=\""
      + (MARKER_H - 14) + "\" rx=\"1.5\" fill=\"" + palette.brand + "\"/>"
      + text(mx + 9, my + 15, "start", palette.ink, 12, 600, clip(item.title, mw - 14))
      + text(mx + 9, my + 28, "start", palette.muted, 12, 400, itemValue(item));
  }).join("");

  const over = used.map((n, m) => (n > STACK
    ? text(mid(m), AXIS_Y - 20, "middle", palette.muted, 12, 400, "+" + (n - STACK) + " more")
    : "")).join("");

  // the accrual columns, the cumulative walk and the target
  const bars = gbpByMonth.map((v, m) => "<rect x=\"" + num(x(m) + slot * 0.28) + "\" y=\"" + num(y(v))
    + "\" width=\"" + num(slot * 0.44) + "\" height=\"" + num(PLOT_BOTTOM - y(v))
    + "\" fill=\"" + palette.brandSoft + "\"/>").join("");
  const walk = (series: number[]) => series.map((v, m) => num(mid(m)) + "," + num(y(v))).join(" ");
  const lines = "<polyline points=\"" + walk(gbpTarget) + "\" fill=\"none\" stroke=\""
    + palette.muted + "\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/>"
    + "<polyline points=\"" + walk(gbpCumulative) + "\" fill=\"none\" stroke=\"" + palette.brand
    + "\" stroke-width=\"2\"/>";

  const gap = gbpCumulative[11] - gbpTarget[11];
  const gapText = (gap >= 0 ? "Year-end gap: " + shortGbp(gap) + " ahead of target"
    : "Year-end gap: " + shortGbp(Math.abs(gap)) + " behind target");

  // a quiet legend, with the gap called out at the right of the same line
  const key = (kx: number, swatch: string, label: string) =>
    swatch + text(kx + 22, h - 8, "start", palette.muted, 12, 400, label);
  const legend = key(PAD, "<rect x=\"" + PAD + "\" y=\"" + num(h - 19)
      + "\" width=\"14\" height=\"12\" rx=\"2\" fill=\"" + palette.brandSoft + "\"/>",
      "£ in month")
    + key(PAD + 110, "<line x1=\"" + (PAD + 110) + "\" x2=\"" + (PAD + 126) + "\" y1=\""
      + num(h - 12) + "\" y2=\"" + num(h - 12) + "\" stroke=\"" + palette.brand
      + "\" stroke-width=\"2\"/>", "Cumulative £")
    + key(PAD + 240, "<line x1=\"" + (PAD + 240) + "\" x2=\"" + (PAD + 256) + "\" y1=\""
      + num(h - 12) + "\" y2=\"" + num(h - 12) + "\" stroke=\"" + palette.muted
      + "\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/>", "Target £")
    + key(PAD + 350, "<rect x=\"" + (PAD + 350) + "\" y=\"" + num(h - 19)
      + "\" width=\"14\" height=\"12\" rx=\"3\" fill=\"" + palette.panel + "\" stroke=\""
      + palette.brandMid + "\"/>", "Item landing");

  return svgOpen(w, h, "xMidYMid meet")
    + "<g font-family=\"" + FONT + "\">"
    + band + markers + over
    + "<line x1=\"" + PAD + "\" x2=\"" + num(w - PAD) + "\" y1=\"" + AXIS_Y + "\" y2=\"" + AXIS_Y
    + "\" stroke=\"" + palette.line + "\"/>"
    + bars + lines
    + "<line x1=\"" + PAD + "\" x2=\"" + num(w - PAD) + "\" y1=\"" + PLOT_BOTTOM + "\" y2=\""
    + PLOT_BOTTOM + "\" stroke=\"" + palette.line + "\"/>"
    + text(w - PAD, h - 8, "end", gap >= 0 ? palette.good : palette.bad, 13, 600, gapText)
    + legend
    + "</g></svg>";
}
