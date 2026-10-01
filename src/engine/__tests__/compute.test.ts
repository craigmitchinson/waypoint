// compute() against datasets the seed probes know nothing about: an empty plan, and a plan of one.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { compute } from "../compute";
import { parseDate } from "../dates";
import type { Dataset, WorkItem } from "../../model/types";

const today = parseDate(seedDataset.settings.epoch);

const empty = (): Dataset => ({
  ...seedDataset,
  work: [],
  absences: [],
  assignments: [],
  benefitActuals: [],
  reservations: [],
  history: [],
  archive: [],
});

const one = (): WorkItem => ({
  ...seedDataset.work[0],
  title: "Only item",
  parent: "",
  assignees: [],
});

describe("compute on a dataset with no seed rows", () => {
  it("returns zeros for an empty plan without throwing", () => {
    const view = compute(empty(), today);
    expect(view.committed_total.value).toBe(0);
    expect(view.in_plan.value).toBe(0);
    expect(view.delivered.value).toBe(0);
    expect(view.reliability.value).toBe(0);
    expect(view.reservations.reserved_total).toBe(0);
    expect(view.delivery.delivered).toBe(0);
    expect(view.ended_items.count).toBe(0);
    expect(view.compare.quarter_a).toBe("");
  });

  it("reports the one item a one-item plan carries", () => {
    const item = one();
    const data: Dataset = { ...empty(), work: [item] };
    const view = compute(data, today);
    const squad = view.squads.rows.find((s) => s.name === item.squad);
    expect(view.in_plan.value).toBeGreaterThan(0);
    expect(view.committed_total.value).toBe(squad?.committed);
    expect(view.ended_items.titles).toEqual([item.title]);
  });
});
