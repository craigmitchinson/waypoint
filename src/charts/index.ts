// Every chart in Waypoint is a pure function from data to an SVG string, drawn through an image.
// The same builders port one to one into Power Apps as named formulas feeding an Image control.
export { paletteFor, resetPalettes, FONT } from "./palette";
export type { Palette, Size } from "./palette";
export { monthBarsSvg, MONTH_BARS_SIZE } from "./monthBars";
export type { MonthBarsInput } from "./monthBars";
export { sparklineSvg, SPARKLINE_SIZE } from "./sparkline";
export type { SparkPoint } from "./sparkline";
export {
  landingSvg, landingItems, landingMonth, itemValue, shortGbp, LANDING_SIZE,
  LANDING_COMPACT_SIZE,
} from "./landing";
export type { LandingItem, LandingOptions } from "./landing";
