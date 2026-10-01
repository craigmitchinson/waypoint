// Stop: a stopped item leaves every capacity figure from the day it stopped, and keeps the days
// before it. Section 9 of power/design-work-flow.md.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { buildContext } from "../context";
import { bookedDays, weekDays } from "../capacity";
import { parseDate } from "../dates";
import { counts, inPlan, squadCommittedMW, workMW } from "../work";
import { consumingSpan, stoppedOn } from "../stopped";
import type { Dataset, WorkItem } from "../../model/types";

const base = seedDataset.work.find((w) => w.title === "Exception queue UI") as WorkItem;
const PERSON = "Faisal Rahman";
const WEEK_A = parseDate("2026-11-02");
const WEEK_B = parseDate("2026-11-09");

/** One live item, one squad, one typed booking over the two weeks of 2 and 9 November. */
function dataset(item: Partial<WorkItem>, log: Dataset["log"] = []): Dataset {
  const work: WorkItem = { ...base, state: "In development", phase: "Delivery", assignees: [], ...item };
  return {
    ...seedDataset,
    work: [work],
    assignments: [{
      person: PERSON, item: work.title, type: "Work",
      from: "2026-11-02", to: "2026-11-13", label: "Exception UI",
    }],
    log,
  };
}

const booked = (data: Dataset, mon: Date) => bookedDays(buildContext(data), PERSON, mon);

describe("a stopped item and the days it consumes", () => {
  it("charges both weeks while the item is live", () => {
    const data = dataset({});
    expect(booked(data, WEEK_A)).toBe(5);
    expect(booked(data, WEEK_B)).toBe(5);
  });

  it("keeps the days before the stop and frees the days from it", () => {
    const data = dataset({ phase: "Stopped", stoppedOn: "2026-11-09", stoppedReason: "Descoped" });
    expect(booked(data, WEEK_A)).toBe(5);
    expect(booked(data, WEEK_B)).toBe(0);
  });

  it("frees a stop part way through the week from the day it stopped", () => {
    const data = dataset({ phase: "Stopped", stoppedOn: "2026-11-11", stoppedReason: "Descoped" });
    // Monday and Tuesday stand; Wednesday onwards does not
    expect(booked(data, WEEK_B)).toBe(2);
  });

  it("gives the person back the free days the booking held", () => {
    const stopped = dataset({ phase: "Stopped", stoppedOn: "2026-11-09" });
    const unbooked: Dataset = { ...stopped, assignments: [] };
    expect(weekDays(buildContext(stopped), PERSON, WEEK_B).free)
      .toBe(weekDays(buildContext(unbooked), PERSON, WEEK_B).free);
    expect(weekDays(buildContext(dataset({})), PERSON, WEEK_B).free)
      .toBeLessThan(weekDays(buildContext(unbooked), PERSON, WEEK_B).free);
  });

  it("takes the stop date from the last activity where no date was stamped", () => {
    const log = [{
      at: "2026-11-09T09:30:00.000Z", label: "Stop",
      summary: "Stop: Exception queue UI", user: "Test",
    }];
    const data = dataset({ phase: "Stopped", stoppedReason: "Descoped" }, log);
    expect(stoppedOn(data, data.work[0])).toEqual(parseDate("2026-11-09"));
    expect(booked(data, WEEK_A)).toBe(5);
    expect(booked(data, WEEK_B)).toBe(0);
  });

  it("charges nothing at all where the stop cannot be dated", () => {
    const data = dataset({ phase: "Stopped", stoppedReason: "Descoped" });
    expect(stoppedOn(data, data.work[0])).toBeNull();
    expect(consumingSpan(data, data.work[0], [WEEK_A, WEEK_B])).toBeNull();
    expect(booked(data, WEEK_A)).toBe(0);
  });

  it("leaves the automatic booking of an assignee alone once the item stops", () => {
    const live = dataset({ assignees: [PERSON], phase: "Delivery" });
    const stopped: Dataset = {
      ...live,
      assignments: [],
      work: [{ ...live.work[0], phase: "Stopped", stoppedOn: "2026-11-09" }],
    };
    expect(booked({ ...live, assignments: [] }, WEEK_B)).toBe(5);
    expect(booked(stopped, WEEK_B)).toBe(0);
  });
});

describe("a stopped item and the figures it leaves", () => {
  it("is absent from committed MW, from in-plan MW and from what counts", () => {
    const live = dataset({});
    const liveCtx = buildContext(live);
    expect(counts(liveCtx, live.work[0])).toBe(true);
    expect(squadCommittedMW(liveCtx, base.squad)).toBeCloseTo(workMW(liveCtx, live.work[0]), 6);

    const data = dataset({ phase: "Stopped", stoppedOn: "2026-11-09", stoppedReason: "Descoped" });
    const ctx = buildContext(data);
    expect(counts(ctx, data.work[0])).toBe(false);
    expect(inPlan(ctx, data.work[0])).toBe(false);
    expect(squadCommittedMW(ctx, base.squad)).toBe(0);
  });

  it("stays out of the attention count, which reads the same rule", () => {
    // Command counts a committed item with nobody on it; a stopped one is not committed work.
    const data = dataset({ phase: "Stopped", stoppedOn: "2026-11-09", assignees: [] });
    const ctx = buildContext(data);
    const attention = data.work.filter((w) => counts(ctx, w) && w.assignees.length === 0);
    expect(attention).toEqual([]);
  });
});

describe("a reopened item", () => {
  it("consumes nothing until it is committed again", () => {
    const reopened = dataset({ phase: "Shaping", state: "Identified", stoppedReason: undefined });
    const ctx = buildContext(reopened);
    expect(counts(ctx, reopened.work[0])).toBe(false);
    expect(squadCommittedMW(ctx, base.squad)).toBe(0);

    const recommitted = dataset({ phase: "Delivery", state: "In development" });
    const back = buildContext(recommitted);
    expect(counts(back, recommitted.work[0])).toBe(true);
    expect(squadCommittedMW(back, base.squad)).toBeGreaterThan(0);
  });
});
