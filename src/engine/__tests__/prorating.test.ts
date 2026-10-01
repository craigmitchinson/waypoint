// The pro-rating edge cases, and a week with nothing left in it.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { buildContext } from "../context";
import { benefitValue } from "../value";
import { freeFor, weekDays } from "../capacity";
import type { BenefitActual, Dataset, WorkItem } from "../../model/types";

const base = seedDataset.work.find((w) => w.title === "Statement matching rules v2") as WorkItem;

function withClaim(item: Partial<WorkItem>, actuals: BenefitActual[] = []): Dataset {
  const work: WorkItem = { ...base, title: "Test claim", claims: {}, ...item };
  return { ...seedDataset, work: [work], benefitActuals: actuals };
}

const RATE = 55000; // grade D on the seed's Settings

describe("in-year and recorded pro-rating", () => {
  it("gives a December landing one twelfth of the year", () => {
    const data = withClaim({ claimedFTE: 1.2, grade: "D", landingMonth: "Dec" });
    const ctx = buildContext(data);
    expect(benefitValue(ctx, ctx.data.work[0]).inYear).toBeCloseTo((1.2 * RATE) / 12, 6);
  });

  it("gives a claim that landed before the benefit year the whole year", () => {
    const data = withClaim({ claimedFTE: 1, grade: "D", landingMonth: "Jun", landingYear: 2025 });
    const ctx = buildContext(data);
    expect(benefitValue(ctx, ctx.data.work[0]).inYear).toBeCloseTo(RATE, 6);
  });

  it("gives a claim that lands after the benefit year nothing", () => {
    const data = withClaim({ claimedFTE: 1, grade: "D", landingMonth: "Jan", landingYear: 2027 });
    const ctx = buildContext(data);
    expect(benefitValue(ctx, ctx.data.work[0]).inYear).toBe(0);
  });

  it("takes the recorded month when a January claim is recorded in June", () => {
    const data = withClaim(
      { claimedFTE: 1, grade: "D", landingMonth: "Jan", landingYear: 2026 },
      [{ title: "Test claim", type: "FTE released", value: 1, when: "2026-06-15", note: "" }],
    );
    const ctx = buildContext(data);
    // seven months of the year are left once June has been recorded
    expect(benefitValue(ctx, ctx.data.work[0]).recorded).toBeCloseTo((RATE * 7) / 12, 6);
  });

  it("keeps the full year for an actual recorded against a claim that landed earlier", () => {
    const data = withClaim(
      { claimedFTE: 1, grade: "D", landingMonth: "Jun", landingYear: 2025 },
      [{ title: "Test claim", type: "FTE released", value: 1, when: "2026-09-01", note: "" }],
    );
    const ctx = buildContext(data);
    expect(benefitValue(ctx, ctx.data.work[0]).recorded).toBeCloseTo(RATE, 6);
  });
});

describe("a saturated week", () => {
  it("offers an item nothing when another booking already fills the week", () => {
    const person = seedDataset.people.find((p) => p.name === "Theo Marshall")!;
    const item: WorkItem = {
      ...base, title: "Test item", assignees: [person.name], span: [21, 21], size: "M",
    };
    const other: WorkItem = {
      ...base, title: "Other item", assignees: [person.name], span: [21, 21], size: "M",
    };
    const data: Dataset = { ...seedDataset, work: [item, other], benefitActuals: [] };
    const ctx = buildContext(data);
    const week = ctx.weeks.findIndex((m) => m >= ctx.qstart) + 2;
    expect(weekDays(ctx, person.name, ctx.weeks[week - 1]).free).toBe(0);
    expect(freeFor(ctx, person.name, item, week)).toBe(0);
  });
});
