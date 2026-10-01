import { describe, expect, it } from "vitest";
import { landingItems, landingSvg, monthBarsSvg, paletteFor, sparklineSvg } from "..";
import { MONTHS } from "../../engine/dates";
import { benefitCalendar } from "../../engine/value";
import { buildContext } from "../../engine/context";
import seed from "../../seed";

const palette = paletteFor("light");
const dark = paletteFor("dark");
const calendar = benefitCalendar(buildContext(seed));
const count = (svg: string, tag: string) => svg.split("<" + tag).length - 1;

describe("charts", () => {
  it("gives every palette name a plain colour in both themes", () => {
    for (const value of [...Object.values(palette), ...Object.values(dark)]) {
      expect(value).not.toContain("var(");
      expect(value.length).toBeGreaterThan(3);
    }
    expect(palette.ink).not.toBe(dark.ink);
  });

  it("builds the month bars as a rect a month with the two lines over them", () => {
    const svg = monthBarsSvg({
      months: MONTHS,
      values: MONTHS.map((_, m) => m * 100),
      cumulative: MONTHS.map((_, m) => m * 200),
      target: MONTHS.map(() => 1000),
      currentMonth: 4,
    }, palette);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain("viewBox=\"0 0 144 48\"");
    expect(count(svg, "rect")).toBe(12);
    expect(count(svg, "polyline")).toBe(2);
    expect(svg).toContain(palette.brandSoft);
    expect(svg).toContain(palette.accent);
    expect(svg).toContain("'Segoe UI', sans-serif");
  });

  it("marks nothing when the current month is outside the year", () => {
    const flat = MONTHS.map(() => 1);
    const input = { months: MONTHS, values: flat, cumulative: flat, target: flat };
    expect(count(monthBarsSvg({ ...input, currentMonth: 0 }, palette), "line x1")).toBe(0);
    expect(count(monthBarsSvg({ ...input, currentMonth: 12 }, palette), "line x1")).toBe(1);
  });

  it("builds a sparkline as one line and one dot, and nothing from no points", () => {
    const points = [1, 4, 2, 8].map((value, i) => ({ label: "p" + i, value }));
    const svg = sparklineSvg(points, palette);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(count(svg, "polyline")).toBe(1);
    expect(count(svg, "circle")).toBe(1);
    expect(sparklineSvg([], palette)).toBe(
      "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 20\" preserveAspectRatio=\"none\""
      + " role=\"presentation\"></svg>",
    );
  });

  it("builds the landing view with a marker per item over the twelve accrual columns", () => {
    const items = landingItems(calendar);
    expect(items.length).toBeGreaterThan(0);
    const svg = landingSvg(calendar, palette, undefined, { currentMonth: 3, items });
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain("viewBox=\"0 0 960 420\"");
    // twelve month columns, twelve accrual bars, two legend swatches and the marker rects, which
    // are two apiece and stack no more than four deep in a month
    const drawn = MONTHS
      .map((_, m) => Math.min(items.filter((i) => i.month === m).length, 4))
      .reduce((t, n) => t + n, 0);
    expect(count(svg, "rect")).toBe(12 + 12 + 2 + drawn * 2);
    expect(count(svg, "polyline")).toBe(2);
    for (const month of MONTHS) expect(svg).toContain(">" + month + "</text>");
    expect(svg).toContain("Year-end gap:");
    expect(svg).toContain("Item landing");
    expect(svg).not.toContain("var(--");
  });

  it("stacks no more than four markers in a month and counts the rest", () => {
    const many = Array.from({ length: 7 }, (_, i) => ({
      title: "Item " + i, month: 5, gbpInYear: 1000 * i, fte: i,
    }));
    const svg = landingSvg(calendar, palette, undefined, { currentMonth: -1, items: many });
    expect(count(svg, "rect")).toBe(12 + 12 + 2 + 4 * 2);
    expect(svg).toContain("+3 more");
  });

  it("escapes what a work item is called", () => {
    const svg = landingSvg(calendar, palette, undefined, {
      currentMonth: -1,
      items: [{ title: "A & B <C>", month: 0, gbpInYear: 0, fte: 1 }],
    });
    expect(svg).toContain("&amp;");
    expect(svg).not.toContain("<C>");
  });

  it("draws the landing view in the colours of the theme it is given", () => {
    const svg = landingSvg(calendar, dark, undefined, { currentMonth: 0 });
    expect(svg).toContain(dark.surface === dark.panel ? dark.ink : dark.panel);
    expect(svg).not.toContain(palette.brandSoft);
  });
});
