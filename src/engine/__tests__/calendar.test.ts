// The Calendar sheet: one row per work item across the benefit year, and the totals under it.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { buildContext } from "../context";
import { benefitCalendar, benefitValue, claimShare } from "../value";
import { inPlan } from "../work";
import type { Dataset, WorkItem } from "../../model/types";

const ctx = buildContext(seedDataset);
const cal = benefitCalendar(ctx);

describe("the benefits calendar", () => {
  it("lists every work item in Work order, across the twelve months", () => {
    expect(cal.year).toBe(seedDataset.settings.benefitYear);
    expect(cal.months).toHaveLength(12);
    expect(cal.months[0]).toBe("Jan");
    expect(cal.rows.map((r) => r.title)).toEqual(seedDataset.work.map((w) => w.title));
    for (const row of cal.rows) expect(row.fteByMonth).toHaveLength(12);
  });

  it("values every row as the in-year walk does", () => {
    ctx.data.work.forEach((item, i) => {
      const row = cal.rows[i];
      expect(row.gbpInYear).toBeCloseTo(benefitValue(ctx, item).inYear, 6);
      expect(row.fteInYear).toBeCloseTo((item.claimedFTE ?? 0) * claimShare(ctx, item), 6);
    });
  });

  it("carries the claim from the month it lands in to December", () => {
    const item = ctx.data.work.find((w) => w.landingMonth === "Oct" && w.claimedFTE) as WorkItem;
    const row = cal.rows[ctx.data.work.indexOf(item)];
    expect(row.lands).toBe(`Oct ${item.landingYear}`);
    expect(row.fteByMonth[8]).toBe(0);
    expect(row.fteByMonth[9]).toBe(item.claimedFTE);
    expect(row.fteByMonth[11]).toBe(item.claimedFTE);
    expect(row.fteInYear).toBeCloseTo((item.claimedFTE as number) * (3 / 12), 6);
  });

  it("gives a claim that lands after the benefit year no month at all", () => {
    const data: Dataset = {
      ...seedDataset,
      work: [{
        ...seedDataset.work[0], title: "Next year", claims: {}, claimedFTE: 1, grade: "D",
        landingMonth: "Mar", landingYear: seedDataset.settings.benefitYear + 1,
      }],
    };
    const row = benefitCalendar(buildContext(data)).rows[0];
    expect(row.fteByMonth.every((v) => v === 0)).toBe(true);
    expect(row.gbpInYear).toBe(0);
  });

  it("counts the plan in the totals, and keeps the cumulative a running sum", () => {
    const { totals } = cal;
    let running = 0;
    totals.gbpByMonth.forEach((v, m) => {
      running += v;
      expect(totals.gbpCumulative[m]).toBeCloseTo(running, 6);
    });
    const planned = cal.rows
      .filter((r) => r.inPlan)
      .reduce((t, r) => t + r.gbpInYear, 0);
    expect(totals.gbpCumulative[11]).toBeCloseTo(planned, 6);
    const live = cal.rows
      .filter((r) => r.inPlan)
      .reduce((t, r) => t + r.fteByMonth[11], 0);
    expect(totals.fteLive[11]).toBeCloseTo(live, 6);
    expect(cal.rows.every((r, i) => r.inPlan === inPlan(ctx, ctx.data.work[i]))).toBe(true);
  });

  it("lands new FTE in the month the claim names", () => {
    const { totals } = cal;
    const november = cal.rows.filter((r, i) => r.inPlan
      && ctx.data.work[i].landingMonth === "Nov"
      && (ctx.data.work[i].landingYear ?? cal.year) === cal.year);
    expect(totals.fteNew[10]).toBeCloseTo(november.reduce((t, r) => t + r.fteClaimed, 0), 6);
    expect(totals.fteNew.reduce((t, v) => t + v, 0)).toBeLessThanOrEqual(totals.fteLive[11] + 1e-9);
  });

  it("spreads the target evenly and reads the gap at the year end", () => {
    const { totals } = cal;
    const settings = seedDataset.settings;
    expect(totals.gbpTarget[0]).toBeCloseTo(settings.gbpTarget / 12, 6);
    expect(totals.gbpTarget[11]).toBeCloseTo(settings.gbpTarget, 6);
    expect(totals.fteTarget).toBe(settings.fteTarget);
    expect(totals.gap).toBeCloseTo(totals.fteLive[11] - settings.fteTarget, 6);
  });

  it("reads the hypothesis over every listed item, counted or not", () => {
    const { totals } = cal;
    expect(totals.fteIfAllLands)
      .toBeCloseTo(cal.rows.reduce((t, r) => t + r.fteByMonth[11], 0), 6);
    expect(totals.fteIfAllLands).toBeGreaterThanOrEqual(totals.fteLive[11]);
    expect(totals.gbpIfAllLands[11])
      .toBeCloseTo(cal.rows.reduce((t, r) => t + r.gbpInYear, 0), 6);
    expect(totals.gbpIfAllLands[11]).toBeGreaterThanOrEqual(totals.gbpCumulative[11]);
  });
});
