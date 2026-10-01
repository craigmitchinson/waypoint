// A series as one SVG string: the line and the dot on the marked point. Pure: no React, no DOM.
import type { Palette, Size } from "./palette";
import { FONT, num, svgOpen } from "./palette";

export interface SparkPoint {
  label: string;
  value: number;
}

export const SPARKLINE_SIZE: Size = { width: 100, height: 20 };

/**
 * The line, drawn to fill the box it is shown in, with a dot on the marked point: the last one
 * unless another is named.
 */
export function sparklineSvg(
  points: SparkPoint[],
  palette: Palette,
  size: Size = SPARKLINE_SIZE,
  mark?: number,
): string {
  const w = size.width;
  const h = size.height;
  if (points.length === 0) return svgOpen(w, h, "none") + "</svg>";
  const values = points.map((p) => p.value);
  const low = Math.min(...values, 0);
  const high = Math.max(...values, low + 1);
  const step = points.length > 1 ? w / (points.length - 1) : 0;
  const y = (v: number) => h - 2 - ((v - low) / (high - low)) * (h - 4);
  const coords = points.map((p, i) => num(i * step) + "," + num(y(p.value))).join(" ");
  const at = mark == null ? points.length - 1 : Math.min(Math.max(mark, 0), points.length - 1);

  return svgOpen(w, h, "none")
    + "<g font-family=\"" + FONT + "\">"
    + "<polyline points=\"" + coords + "\" fill=\"none\" stroke=\"" + palette.brand
    + "\" stroke-width=\"1.5\" vector-effect=\"non-scaling-stroke\"/>"
    + "<circle cx=\"" + num(at * step) + "\" cy=\"" + num(y(points[at].value))
    + "\" r=\"2\" fill=\"" + palette.brand + "\"/>"
    + "</g></svg>";
}
