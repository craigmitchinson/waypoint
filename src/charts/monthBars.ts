// Twelve months of benefit as one SVG string: a bar a month on its own scale, the cumulative and
// target lines over them on theirs. Pure: no React, no DOM, plain colours from the palette.
import type { Palette, Size } from "./palette";
import { FONT, num, svgOpen } from "./palette";

export interface MonthBarsInput {
  months: string[];
  /** One value per month: the bars. */
  values: number[];
  /** The running total drawn over the bars. */
  cumulative: number[];
  /** The target line drawn over the bars. */
  target: number[];
  /** The month to mark, 1 to 12; nothing is marked outside that. */
  currentMonth: number;
}

export const MONTH_BARS_SIZE: Size = { width: 144, height: 48 };

/** The bars, the cumulative line and the target line, drawn to fill the box they are shown in. */
export function monthBarsSvg(
  input: MonthBarsInput,
  palette: Palette,
  size: Size = MONTH_BARS_SIZE,
): string {
  const { months, values, cumulative, target, currentMonth } = input;
  const w = size.width;
  const h = size.height;
  const slot = w / Math.max(months.length, 1);
  const barMax = Math.max(...values, 1);
  const lineMax = Math.max(...cumulative, ...target, 1);
  const barY = (v: number) => h - (Math.max(0, v) / barMax) * h;
  const lineY = (v: number) => h - 2 - (Math.max(0, v) / lineMax) * (h - 4);
  const mid = (i: number) => i * slot + slot / 2;
  const points = (series: number[]) =>
    series.map((v, i) => num(mid(i)) + "," + num(lineY(v))).join(" ");

  const bars = values.map((v, i) => "<rect x=\"" + num(i * slot + 1.5)
    + "\" y=\"" + num(barY(v))
    + "\" width=\"" + num(Math.max(slot - 3, 0.5))
    + "\" height=\"" + num(h - barY(v))
    + "\" fill=\"" + palette.brandSoft + "\"/>").join("");

  const marked = currentMonth >= 1 && currentMonth <= months.length;
  const now = marked
    ? "<line x1=\"" + num(mid(currentMonth - 1)) + "\" x2=\"" + num(mid(currentMonth - 1))
      + "\" y1=\"0\" y2=\"" + num(h) + "\" stroke=\"" + palette.accent
      + "\" stroke-width=\"1\" vector-effect=\"non-scaling-stroke\"/>"
    : "";

  const line = (series: number[], stroke: string, dash: string) =>
    "<polyline points=\"" + points(series) + "\" fill=\"none\" stroke=\"" + stroke
    + "\" stroke-width=\"1.5\" vector-effect=\"non-scaling-stroke\"" + dash + "/>";

  return svgOpen(w, h, "none")
    + "<g font-family=\"" + FONT + "\">"
    + bars
    + now
    + line(target, palette.muted, " stroke-dasharray=\"4 3\"")
    + line(cumulative, palette.brand, "")
    + "</g></svg>";
}
