// Delivered and on-time counts read the ladder before the capacity overlay.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { buildContext } from "../context";
import { deliverySummary } from "../delivery";
import { toISO } from "../dates";
import type { Dataset, WorkItem } from "../../model/types";

const base = seedDataset.work.find((w) => w.title === "Statement matching rules v2") as WorkItem;
const probe = buildContext(seedDataset);
const FS = probe.firstSprint;
const person = seedDataset.people[0];

describe("delivery summary", () => {
  it("keeps delivered and on-time counts unchanged when an item is overlaid to At risk (capacity)", () => {
    const doneItem: WorkItem = {
      ...base, title: "Done item", state: "Done", span: [FS, FS], doneInSprint: FS, assignees: [],
    };
    const overlayItem: WorkItem = {
      ...base, title: "Overlay item", state: "In development", span: [FS, FS], doneInSprint: undefined,
      assignees: [person.name],
    };
    const data: Dataset = {
      ...seedDataset,
      work: [doneItem, overlayItem],
      absences: [
        { person: person.name, type: "Leave", from: toISO(probe.qstart), to: toISO(probe.qend), note: "" },
      ],
    };
    const ctx = buildContext(data, probe.qstart);
    const summary = deliverySummary(ctx);

    expect(summary.statuses.get(overlayItem.title)).toBe("At risk (capacity)");
    expect(summary.delivered).toBe(1);
    expect(summary.onTime).toBe(1);
  });
});
