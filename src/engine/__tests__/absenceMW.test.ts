// The productive MW absence takes out of the quarter, by person and by type.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { buildContext } from "../context";
import { absenceMW } from "../capacity";
import { parseDate } from "../dates";

const ctx = buildContext(seedDataset);

describe("absenceMW", () => {
  it("costs one person's sickness by hand from the seed", () => {
    // Helena Vos is off sick 3 to 4 November 2026: two working days, no India bank holiday in the
    // way, five days a week and the default 0.3 modifier.
    const report = absenceMW(ctx, { type: "Sick" });
    expect(report.byPerson["Helena Vos"].days).toBe(2);
    expect(report.byPerson["Helena Vos"].mw).toBeCloseTo((2 * (5 / 5) * (1 - 0.3)) / 5, 6);
  });

  it("uses the lead modifier where the person leads", () => {
    // Eloise Bennett leads, so the 0.4 lead modifier applies to her 5 and 6 October sickness.
    const report = absenceMW(ctx, { type: "Sickness" });
    expect(report.byPerson["Eloise Bennett"].days).toBe(2);
    expect(report.byPerson["Eloise Bennett"].mw).toBeCloseTo((2 * (1 - 0.4)) / 5, 6);
  });

  it("sums by type and by person to the total", () => {
    const report = absenceMW(ctx);
    const byType = Object.values(report.byType);
    expect(byType.length).toBeGreaterThan(1);
    expect(byType.reduce((t, r) => t + r.days, 0)).toBe(report.days);
    expect(byType.reduce((t, r) => t + r.mw, 0)).toBeCloseTo(report.mw, 6);
    expect(Object.values(report.byPerson).reduce((t, r) => t + r.mw, 0)).toBeCloseTo(report.mw, 6);
    expect(report.byType.Sickness.mw).toBeCloseTo(absenceMW(ctx, { type: "Sick" }).mw, 6);
  });

  it("counts only the days inside the window", () => {
    const from = parseDate("2026-11-03");
    const report = absenceMW(ctx, { type: "Sick", from, to: parseDate("2026-11-03") });
    expect(report.days).toBe(1);
    expect(report.byPerson["Eloise Bennett"]).toBeUndefined();
  });

  it("keeps absence outside the quarter out of the figure", () => {
    expect(absenceMW(ctx, { from: parseDate("2026-08-03"), to: parseDate("2026-08-14") }).days)
      .toBe(0);
  });

  it("holds one squad's absence alone", () => {
    const squad = ctx.personSquad["Eloise Bennett"];
    const report = absenceMW(ctx, { squad });
    expect(report.byPerson["Helena Vos"]).toBeUndefined();
    expect(report.days).toBeGreaterThan(0);
  });

  it("reports whether the absence is coming off capacity", () => {
    expect(absenceMW(ctx).deducted).toBe(true);
    const off = buildContext({
      ...seedDataset,
      settings: { ...seedDataset.settings, logAbsences: "No" },
    });
    const report = absenceMW(off);
    expect(report.deducted).toBe(false);
    expect(report.mw).toBeCloseTo(absenceMW(ctx).mw, 6);
  });
});
