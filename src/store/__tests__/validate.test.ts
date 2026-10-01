// The rules the workbook's forms refuse a row on, in the words AddWork, AddProduct and AddPerson use.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import {
  SPIKE_OUTCOMES, knownYears, nextActions, phaseOf, skillList, validateAbsence, validateAssignment,
  validatePerson, validateProduct, validateWork,
} from "../validate";
import type { Person, WorkItem } from "../../model/types";

const data = seedDataset;

const work = (patch: Partial<WorkItem>): WorkItem => ({
  title: "A new thing", kind: "Feature", phase: "", parent: "", epic: "", squad: "", skill: "",
  size: "S", priority: "Should", state: "Identified", confidence: "Medium", startSprint: "",
  endSprint: "", assignees: [], assessedBy: "", productOwner: "", jira: "", jiraAlign: "",
  claimedFTE: null, claims: {}, landingMonth: null, landingYear: null, grade: null, proposed: true,
  ...patch,
});

const person = (patch: Partial<Person>): Person => ({
  name: "New Starter", role: "Engineer", grade: "D", squad: data.squads[0].name, region: "England",
  employment: "Permanent", lead: false, skills: [skillList(data)[0]], ...patch,
});

describe("the form rules", () => {
  it("refuses a duplicate title", () => {
    const messages = validateWork(data, work({ title: data.work[0].title }));
    expect(messages).toContain("A work item with that title already exists.");
  });

  it("caps a work item at three assignees", () => {
    const names = data.people.slice(0, 4).map((p) => p.name);
    const messages = validateWork(data, work({ assignees: names }));
    expect(messages).toContain("Up to three assignees: the Work sheet books asg1 to asg3.");
  });

  it("keeps the Product form to the idea states", () => {
    const messages = validateProduct(data, work({ state: "In development" }));
    expect(messages.some((m) => m.startsWith("A feature or spike here is Identified"))).toBe(true);
    expect(validateProduct(data, work({ state: "Ready" }))).toEqual([]);
  });

  it("wants a primary skill from the skill list", () => {
    expect(validatePerson(data, person({ skills: ["Interpretive dance"] })))
      .toContain("Pick a primary skill.");
    expect(validatePerson(data, person({}))).toEqual([]);
  });

  it("takes a booking that runs past the last year on the Quarter list", () => {
    const years = knownYears(data);
    const last = years[years.length - 1];
    const messages = validateAssignment(data, {
      person: data.people[0].name, item: data.work[0].title, type: "Booked",
      from: `${last}-12-28`, to: `${last + 1}-01-08`, label: "",
    });
    expect(messages).toEqual([]);
  });

  it("refuses a booking that starts in a year it does not know, once", () => {
    const years = knownYears(data);
    const unknown = years[years.length - 1] + 2;
    const messages = validateAssignment(data, {
      person: data.people[0].name, item: data.work[0].title, type: "Booked",
      from: `${unknown}-03-02`, to: `${unknown}-03-06`, label: "",
    });
    expect(messages).toEqual([
      `${unknown} is not a year Waypoint knows: pick a date inside the Quarter list.`,
    ]);
  });

  it("refuses an absence for someone who is not on the People sheet", () => {
    const messages = validateAbsence(data, {
      person: "Nobody At All", type: "Annual leave", from: "2026-11-02", to: "2026-11-06", note: "",
    });
    expect(messages).toContain("Pick a person from the People sheet.");
  });
});

describe("the lifecycle stages", () => {
  const stages: [string, string][] = [
    ["Identified", "Shaping"],
    ["In discovery", "Shaping"],
    ["Ready", "Assessment"],
    ["In development", "Delivery"],
    ["Released", "Release"],
    ["In validation", "Release"],
    ["Done", "Release"],
  ];

  it("reads the phase off the state", () => {
    for (const [state, phase] of stages) expect(phaseOf(work({ state }))).toBe(phase);
  });

  it("leaves a deferred or cancelled item in the phase it was last in", () => {
    expect(phaseOf(work({ state: "Deferred", phase: "Delivery" }))).toBe("Delivery");
    expect(phaseOf(work({ state: "Cancelled", phase: "" }))).toBe("Shaping");
  });

  it("offers the spike its outcome, then the conversion", () => {
    const spike = work({ kind: "Spike", state: "In discovery" });
    const ids = (item: WorkItem): string[] => nextActions(data, item).map((a) => a.id);
    expect(ids(spike)).toEqual(["conclude", "cancel"]);
    expect(ids({ ...spike, spikeOutcome: "More discovery" })).toEqual(["conclude", "cancel"]);
    expect(ids({ ...spike, spikeOutcome: "Feasible" })).toEqual(["conclude", "convert", "cancel"]);
    expect(ids({ ...spike, spikeOutcome: "Feasible", convertedTo: "A feature" }))
      .toEqual(["conclude", "cancel"]);
    expect(SPIKE_OUTCOMES).toContain("Feasible");
  });

  it("offers a feature the step its state is up to", () => {
    const ids = (item: Partial<WorkItem>): string[] => nextActions(data, work(item)).map((a) => a.id);
    expect(ids({ state: "Identified" })).toEqual(["assess", "cancel"]);
    expect(ids({ state: "Identified", size: "" })).toEqual(["sendToAssessment", "cancel"]);
    expect(ids({ state: "Ready" })).toEqual(["commit", "defer", "cancel"]);
    expect(ids({ state: "In development" })).toEqual(["release", "cancel"]);
    expect(ids({ state: "Released" })).toEqual(["validate", "cancel"]);
    expect(ids({ state: "In validation" })).toEqual(["done", "cancel"]);
    expect(ids({ state: "Cancelled" })).toEqual(["assess"]);
  });

  it("names the state each step moves to", () => {
    const to = (item: Partial<WorkItem>, id: string): string | undefined => nextActions(data, work(item))
      .find((a) => a.id === id)?.to;
    expect(to({ state: "Identified" }, "assess")).toBe("Ready");
    expect(to({ state: "Ready" }, "defer")).toBe("Deferred");
    expect(to({ state: "Ready" }, "commit")).toBeUndefined();
    expect(to({ state: "In development" }, "release")).toBe("Released");
    expect(to({ state: "Released" }, "validate")).toBe("In validation");
    expect(to({ state: "In validation" }, "done")).toBe("Done");
    expect(to({ state: "Ready" }, "cancel")).toBe("Cancelled");
  });
});
