// The sprint span a row is read by: span when it carries one, the sprint fields when it does not.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { itemSpan } from "../context";
import type { WorkItem } from "../../model/types";

const row = (patch: Partial<WorkItem>): WorkItem => ({
  ...(seedDataset.work[0] as WorkItem), span: undefined, startSprint: "", endSprint: "", ...patch,
});

describe("itemSpan", () => {
  it("reads span when the row carries one", () => {
    expect(itemSpan(row({ span: [20, 22], startSprint: 20, endSprint: 22 }))).toEqual([20, 22]);
  });

  it("falls back to the sprint fields when there is no span", () => {
    expect(itemSpan(row({ startSprint: 21, endSprint: 23 }))).toEqual([21, 23]);
    expect(itemSpan(row({ startSprint: 21 }))).toEqual([21, 21]);
  });

  it("is empty when the row carries no sprints at all", () => {
    expect(itemSpan(row({}))).toEqual([0, -1]);
  });
});
