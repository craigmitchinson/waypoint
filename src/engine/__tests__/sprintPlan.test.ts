// The Sprint plan matrix: capacity by working days, demand evenly per sprint, reservations by share.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { buildContext } from "../context";
import { squadNetMW } from "../capacity";
import { networkdays } from "../dates";
import { workMW } from "../work";
import { squadReservedMW } from "../reservations";
import { sprintPlan } from "../sprintPlan";
import type { SprintPlanSquad } from "../sprintPlan";
import type { Dataset, WorkItem } from "../../model/types";

const ctx = buildContext(seedDataset);
const plan = sprintPlan(ctx);

const row = (name: string) => plan.squads.find((s) => s.name === name) as SprintPlanSquad;

describe("sprintPlan", () => {
  it("draws a column for every sprint of the quarter", () => {
    expect(plan.sprints.map((s) => s.num)).toEqual([20, 21, 22, 23, 24, 25, 26]);
    expect(plan.sprints[0].label).toBe("S20");
    // the quarter opens part way through S20, so it carries seven of its ten working days
    expect(plan.sprints[0].workingDays).toBe(7);
  });

  it("gives a squad back its net MW over the quarter's sprints", () => {
    for (const squad of plan.squads) {
      expect(Math.abs(squad.totals.available - squadNetMW(ctx, squad.name))).toBeLessThan(0.5);
    }
  });

  it("spreads an item evenly over its sprints, to the MW it charges the quarter", () => {
    // Exception queue UI: four MW across S22 to S24, every one of them a full sprint inside the quarter
    const item = seedDataset.work.find((w) => w.title === "Exception queue UI") as WorkItem;
    const data: Dataset = { ...seedDataset, work: [item] };
    const one = sprintPlan(buildContext(data));
    const { cells } = one.squads.find((s) => s.name === item.squad) as SprintPlanSquad;
    expect(cells.map((c) => c.committed)).toEqual([0, 0, 4 / 3, 4 / 3, 4 / 3, 0, 0]);
    expect(cells.reduce((t, c) => t + c.committed, 0)).toBeCloseTo(workMW(ctx, item), 6);
  });

  it("holds one cell by hand", () => {
    // Squad 2 in S22: Statement matching rules v2 is 2 MW over S18 to S22, so 0.4 lands here, and
    // Identity and document checks is 4 MW over S20 to S23, so 1. The sprint holds ten of the
    // quarter's sixty-six working days, and takes that share of what the squad still has reserved.
    const cell = row("Squad 2").cells[2];
    const quarterDays = networkdays(ctx.qstart, ctx.qend);
    expect(quarterDays).toBe(66);
    expect(cell.committed).toBeCloseTo(0.4 + 1, 6);
    expect(cell.reserved).toBeCloseTo(squadReservedMW(ctx, "Squad 2") * (10 / 66), 6);
    expect(cell.remaining).toBeCloseTo(cell.available - cell.committed - cell.reserved, 6);
    expect(cell.utilisation).toBeCloseTo(cell.committed / cell.available, 6);
  });

  it("totals the squads into the row and the sprints into the column", () => {
    plan.sprints.forEach((_, k) => {
      const summed = plan.squads.reduce((t, s) => t + s.cells[k].committed, 0);
      expect(plan.totals[k].committed).toBeCloseTo(summed, 6);
    });
    expect(plan.grand.available).toBeCloseTo(
      plan.totals.reduce((t, c) => t + c.available, 0), 6,
    );
  });
});
