// The actions the Value, Money, Close, Settings and Reservations surfaces call: what each one does,
// and what it refuses, in the workbook's words.
import { beforeEach, describe, expect, it } from "vitest";
import { STORAGE_KEY, useDataset } from "../useDataset";
import {
  blendRate, listValues, outcomeOfEpic, validateAssignment, validatePerson,
} from "../validate";
import { compute } from "../../engine/compute";
import { sprintPlan } from "../../engine/sprintPlan";
import type { SprintPlan, SprintPlanSquad } from "../../engine/sprintPlan";
import { buildContext, itemSpan } from "../../engine/context";
import { counts } from "../../engine/work";
import type { Assignment, Dataset, LogEntry, WorkItem } from "../../model/types";

const store = () => useDataset.getState();

describe("settings lists", () => {
  beforeEach(() => store().resetToSeed());

  it("adds, renames and removes a skill", () => {
    expect(store().addSkill("Process mining")).toBe("");
    expect(listValues(store().data, "skills")).toContain("Process mining");
    expect(store().renameSkill("Process mining", "Task mining")).toBe("");
    expect(listValues(store().data, "skills")).toContain("Task mining");
    expect(store().removeSkill("Task mining")).toBe("");
    expect(listValues(store().data, "skills")).not.toContain("Task mining");
  });

  it("carries a skill rename into people and work", () => {
    const skill = store().data.people.find((p) => p.skills.length > 0)?.skills[0] as string;
    const people = store().data.people.filter((p) => p.skills.includes(skill)).length;
    expect(store().renameSkill(skill, "Renamed skill")).toBe("");
    expect(store().data.people.filter((p) => p.skills.includes("Renamed skill")).length).toBe(people);
    expect(store().data.work.some((w) => w.skill === skill)).toBe(false);
  });

  it("refuses a blank or duplicate skill", () => {
    expect(store().addSkill("  ")).toContain("required");
    const skill = listValues(store().data, "skills")[0];
    expect(store().addSkill(skill)).toContain("already on Settings");
  });

  it("refuses to remove a skill that is still used", () => {
    const skill = store().data.people.find((p) => p.skills.length > 0)?.skills[0] as string;
    const message = store().removeSkill(skill);
    expect(message).toContain("still used by");
    expect(listValues(store().data, "skills")).toContain(skill);
  });

  it("refuses to remove a skill that is not on the list", () => {
    expect(store().removeSkill("Nothing at all")).toContain("Pick a skill");
  });

  it("renames a region across people and bank holidays", () => {
    const holidays = store().data.bankHolidays.filter((b) => b.region === "England").length;
    expect(store().renameListValue("regions", "England", "England and Wales")).toBe("");
    expect(store().data.people.some((p) => p.region === "England")).toBe(false);
    expect(store().data.bankHolidays.filter((b) => b.region === "England and Wales").length)
      .toBe(holidays);
  });

  it("refuses to remove a reservation category that is held", () => {
    const category = store().data.reservations[0].category;
    expect(store().removeListValue("reservationCategories", category)).toContain("still used by");
  });

  it("refuses to rename a list value onto one already there", () => {
    const [first, second] = listValues(store().data, "reservationCategories");
    expect(store().renameListValue("reservationCategories", first, second))
      .toContain("already on Settings");
  });

  it("accepts a region once added to the list and refuses one that is not", () => {
    expect(store().addListValue("regions", "Ireland")).toBe("");
    const person = { ...store().data.people[0], name: "Test person", region: "Ireland" };
    expect(validatePerson(store().data, person)).not.toContain("Pick a region.");
    const other = { ...person, region: "Nowhere" };
    expect(validatePerson(store().data, other)).toContain("Pick a region.");
  });

  it("refuses to remove a quarter that is archived against, even once its reservations are gone", () => {
    store().closeQuarter(true);
    const quarter = store().data.work.find((w) => w.archivedInQuarter)?.archivedInQuarter as string;
    store().transact("Clear reservations", (d) => ({
      ...d, reservations: d.reservations.filter((r) => r.quarter !== quarter),
    }));
    expect(store().removeListValue("quarters", quarter)).toContain("still used by");
  });
});

describe("benefit actuals", () => {
  beforeEach(() => store().resetToSeed());

  const claimedItem = (): string => {
    const d = store().data;
    const item = d.work.find((w) => (w.claimedFTE ?? 0) > 0
      && !d.benefitActuals.some((a) => a.title === w.title && a.type === "FTE released"));
    return item?.title as string;
  };

  it("records, edits and removes an actual", () => {
    const title = claimedItem();
    expect(store().addBenefitActual({
      title, type: "FTE released", value: 1, when: "2026-11-01", note: "",
    })).toBe("");
    const index = store().data.benefitActuals.length - 1;
    expect(store().updateBenefitActual(index, { value: 2 })).toBe("");
    expect(store().data.benefitActuals[index].value).toBe(2);
    store().removeBenefitActual(index);
    expect(store().data.benefitActuals.length).toBe(index);
  });

  it("refuses an actual for an item, a type or a year it does not know", () => {
    const title = claimedItem();
    expect(store().addBenefitActual({
      title: "No such item", type: "FTE released", value: 1, when: "2026-11-01", note: "",
    })).toContain("Pick a work item");
    expect(store().addBenefitActual({
      title, type: "Magic beans", value: 1, when: "2026-11-01", note: "",
    })).toContain("Pick a benefit type");
    expect(store().addBenefitActual({
      title, type: "FTE released", value: 1, when: "1999-11-01", note: "",
    })).toContain("not a year Waypoint knows");
    expect(store().addBenefitActual({
      title, type: "FTE released", value: 1, when: "", note: "",
    })).toContain("When is required");
  });

  it("refuses an actual for a claim the item does not make, and a second one for the same claim", () => {
    const title = claimedItem();
    const unclaimed = store().data.work
      .find((w) => !w.claims.W && w.title !== title)?.title as string;
    expect(store().addBenefitActual({
      title: unclaimed, type: "Throughput", value: 2, when: "2026-11-01", note: "",
    })).toContain("does not claim Throughput");
    expect(store().addBenefitActual({
      title, type: "FTE released", value: 1, when: "2026-11-01", note: "",
    })).toBe("");
    expect(store().addBenefitActual({
      title, type: "FTE released", value: 1, when: "2026-11-01", note: "",
    })).toContain("already recorded");
  });

  it("refuses an edit of an actual that is not there", () => {
    expect(store().updateBenefitActual(999, { value: 1 })).toContain("Pick an actual");
  });
});

describe("reservations", () => {
  beforeEach(() => store().resetToSeed());

  const fresh = () => ({
    squad: "Team", quarter: "Q2 2027", category: "Planning", mw: 6, note: "Planning the half",
  });

  it("adds, edits and removes a reservation", () => {
    expect(store().addReservation(fresh())).toBe("");
    const index = store().data.reservations.length - 1;
    expect(store().updateReservation(index, { mw: 9 })).toBe("");
    expect(store().data.reservations[index].mw).toBe(9);
    store().removeReservation(index);
    expect(store().data.reservations.length).toBe(index);
  });

  it("refuses an unknown squad, quarter or category and a negative MW", () => {
    expect(store().addReservation({ ...fresh(), squad: "Squad 99" })).toContain("Pick a squad");
    expect(store().addReservation({ ...fresh(), quarter: "Q9 2099" })).toContain("Pick a quarter");
    expect(store().addReservation({ ...fresh(), category: "Guesswork" })).toContain("Pick a category");
    expect(store().addReservation({ ...fresh(), mw: -1 })).toContain("zero or more");
  });

  it("refuses a second reservation for the same squad, quarter and category", () => {
    const first = store().data.reservations[0];
    expect(store().addReservation({ ...first, note: "again" })).toContain("already reserves");
  });

  it("refuses the other half of the Discovery and Spikes pair", () => {
    const held = store().data.reservations.filter((r) => r.category === "Discovery")[0];
    expect(store().addReservation({ ...held, category: "Spikes" })).toContain("same spike MW");
  });

  it("refuses an edit of a reservation that is not there", () => {
    expect(store().updateReservation(999, { mw: 1 })).toContain("Pick a reservation");
  });
});

describe("settings, grades and blends", () => {
  beforeEach(() => store().resetToSeed());

  it("updates settings", () => {
    expect(store().updateSettings({ owner: "Someone else", fteTarget: 3 })).toBe("");
    expect(store().data.settings.owner).toBe("Someone else");
    expect(store().data.settings.fteTarget).toBe(3);
  });

  it("refuses settings that break the workbook's rules", () => {
    expect(store().updateSettings({ utilisationBad: 0.5, utilisationWarn: 0.9 }))
      .toContain("Red utilisation must be above amber");
    expect(store().updateSettings({ sprintDays: 0 })).toContain("Sprint length");
    expect(store().updateSettings({ jiraBase: "jira.example.com" })).toContain("must start with http");
    expect(store().updateSettings({ benefitYear: 1999 })).toContain("Benefit year");
    expect(store().updateSettings({ owner: " " })).toContain("Prepared by is required");
    expect(store().updateSettings({ quarter: "Q9 2099" })).toContain("Pick a quarter");
    expect(store().updateSettings({ jiraBase: "" })).toBe("");
  });

  it("moves a state's impact", () => {
    const state = store().data.settings.states[0].name;
    expect(store().updateStateImpact(state, "Hold")).toBe("");
    expect(store().data.settings.states[0].impact).toBe("Hold");
    expect(store().updateStateImpact("No such state", "Hold")).toContain("Pick a state");
  });

  it("adds, edits and removes a business grade", () => {
    expect(store().addGrade({ grade: "Z", rate: 12000 })).toBe("");
    expect(store().updateGrade("Z", { rate: 15000 })).toBe("");
    expect(store().data.settings.grades.find((g) => g.grade === "Z")?.rate).toBe(15000);
    expect(store().removeGrade("Z")).toBe("");
    expect(store().data.settings.grades.some((g) => g.grade === "Z")).toBe(false);
  });

  it("removes a business grade that shares its letter with a team grade in use, when no work or blend uses it", () => {
    // The seed's business grades that overlap a team grade letter (C, D) are both in use by work or
    // blends, so add a fresh one sharing an unused team letter (E) and confirm it can be removed
    // without touching the people who hold that team grade.
    expect(store().data.settings.grades.some((g) => g.grade === "E")).toBe(false);
    expect(store().data.people.some((p) => p.grade === "E")).toBe(true);
    expect(store().addGrade({ grade: "E", rate: 10000 })).toBe("");
    expect(store().data.work.some((w) => w.grade === "E")).toBe(false);
    expect(store().data.settings.blends.some((b) => (b.counts.E ?? 0) !== 0)).toBe(false);
    expect(store().removeGrade("E")).toBe("");
    expect(store().data.settings.grades.some((g) => g.grade === "E")).toBe(false);
    expect(store().data.people.some((p) => p.grade === "E")).toBe(true);
  });

  it("refuses a duplicate grade, a silly rate and a grade still in use", () => {
    const grade = store().data.settings.grades[0].grade;
    const used = store().data.work.find((w) => w.grade)?.grade as string;
    expect(store().addGrade({ grade, rate: 1000 })).toContain("already on Settings");
    expect(store().addGrade({ grade: "Z", rate: -1 })).toContain("GBP per FTE");
    expect(store().removeGrade(used)).toContain("still used by");
    expect(store().removeGrade("Nothing")).toContain("Pick a business grade");
  });

  it("adds, edits and removes a grade blend, and derives its rate", () => {
    const [a, b] = store().data.settings.grades;
    const blend = { name: "Test mix", counts: { [a.grade]: 1, [b.grade]: 3 } };
    expect(store().addBlend(blend)).toBe("");
    expect(blendRate(store().data, blend)).toBeCloseTo((a.rate + b.rate * 3) / 4, 6);
    expect(store().updateBlend("Test mix", { name: "Test mix 2" })).toBe("");
    expect(store().removeBlend("Test mix 2")).toBe("");
    expect(store().data.settings.blends.some((x) => x.name === "Test mix 2")).toBe(false);
  });

  it("refuses a blend with no counts, an unknown grade or a grade's own name", () => {
    const grade = store().data.settings.grades[0].grade;
    expect(store().addBlend({ name: "Empty mix", counts: {} })).toContain("at least one count");
    expect(store().addBlend({ name: "Odd mix", counts: { Nonesuch: 2 } }))
      .toContain("not a business grade");
    expect(store().addBlend({ name: grade, counts: { [grade]: 1 } }))
      .toContain("already a business grade");
    expect(store().removeBlend("Nothing")).toContain("Pick a grade blend");
  });

  it("refuses to remove a blend a work item is valued at", () => {
    const blend = store().data.settings.blends[0];
    store().updateWork(store().data.work[0].title, { grade: blend.name });
    expect(store().removeBlend(blend.name)).toContain("still used by");
  });
});

describe("quarter close", () => {
  beforeEach(() => store().resetToSeed());

  it("refuses to close a quarter that has not ended", () => {
    const before = store().data.settings.quarter;
    const summary = store().closeQuarter();
    expect(summary.message).toContain("does not end until");
    expect(summary.done).toBe(0);
    expect(store().data.settings.quarter).toBe(before);
  });

  it("marks, snapshots, archives and moves on to the next quarter", () => {
    const before: Dataset = store().data;
    const view = compute(before);
    const ctx = buildContext(before);
    const willClose = new Set(before.work
      .filter((w) => w.title && (ctx.impact[w.state] === "Historical"
        || ctx.impact[w.state] === "Removed"
        || (counts(ctx, w) && itemSpan(w)[1] <= ctx.lastSprint)))
      .map((w) => w.title));
    const resCount = before.reservations.filter((r) => r.quarter === before.settings.quarter).length;

    const summary = store().closeQuarter(true);
    expect(summary.done).toBe(view.ended_items.count);
    expect(summary.archived).toBe(willClose.size + resCount);
    expect(store().data.archive.length).toBe(before.archive.length + willClose.size + resCount);
    expect(summary.snapshot?.quarter).toBe("Q4 2026");
    expect(summary.snapshot?.netMW).toBeCloseTo(view.compare.rows.net_capacity.b, 4);
    expect(summary.snapshot?.inPlanMW).toBeCloseTo(view.in_plan.value, 4);
    expect(summary.snapshot?.deliveredMW).toBeGreaterThanOrEqual(view.delivered.value);
    expect(store().data.history.at(-1)?.quarter).toBe("Q4 2026");
    expect(store().data.settings.quarter).toBe("Q1 2027");
    expect(store().data.settings.benefitYear).toBe(2027);
    expect(store().data.work.filter((w) => w.archivedInQuarter === "Q4 2026").length)
      .toBe(willClose.size);
  });

  it("archives a row once per quarter", () => {
    store().closeQuarter(true);
    const archived = store().data.archive.length;
    store().updateSettings({ quarter: "Q4 2026" });
    const again = store().closeQuarter(true);
    expect(again.archived).toBe(0);
    expect(store().data.archive.length).toBe(archived);
    expect(again.message).toContain("already in History");
  });

  it("undoes a close", () => {
    const before = store().data.settings.quarter;
    store().closeQuarter(true);
    store().undo();
    expect(store().data.settings.quarter).toBe(before);
  });

  it("archives a reservation row per seed reservation, holding the reservation's MW", () => {
    const before = store().data;
    const quarter = before.settings.quarter;
    const seedRes = before.reservations.filter((r) => r.quarter === quarter);
    store().closeQuarter(true);
    const resRows = store().data.archive.filter((a) => a.kind === "Reservation" && a.quarter === quarter);
    expect(resRows.length).toBe(seedRes.length);
    for (const r of seedRes) {
      const row = resRows.find((a) => a.squad === r.squad && a.title === r.category);
      expect(row?.heldMW).toBe(r.mw);
    }
  });

  it("rolls the benefit and timeline years on to the new quarter's year, even when they were already behind", () => {
    store().updateSettings({ benefitYear: 2020, timelineYear: 2020 });
    store().closeQuarter(true);
    expect(store().data.settings.quarter).toBe("Q1 2027");
    expect(store().data.settings.benefitYear).toBe(2027);
    expect(store().data.settings.timelineYear).toBe(2027);
  });
});

describe("transact", () => {
  beforeEach(() => store().resetToSeed());

  it("commits any change and undoes it", () => {
    const before = store().data.work.length;
    store().transact("Clear the plan", (d) => ({ ...d, work: [] }));
    expect(store().data.work.length).toBe(0);
    expect(store().undoLabel).toBe("Clear the plan");
    store().undo();
    expect(store().data.work.length).toBe(before);
  });
});

describe("financials", () => {
  beforeEach(() => store().resetToSeed());

  it("edits a team grade cost and the estate baseline", () => {
    const teamGradeCosts = store().data.settings.financials.teamGradeCosts
      .map((g) => (g.grade === "C" ? { ...g, annualCost: 50000 } : g));
    expect(store().updateFinancials({ teamGradeCosts, estateBaseline: 250000 })).toBe("");
    const saved = store().data.settings.financials;
    expect(saved.teamGradeCosts.find((g) => g.grade === "C")?.annualCost).toBe(50000);
    expect(saved.estateBaseline).toBe(250000);
    expect(store().undoLabel).toBe("Edit financials");
  });

  it("refuses a negative cost and a funding line it does not know", () => {
    const lines = store().data.settings.financials.costLines;
    expect(store().updateFinancials({ costLines: lines.map((c, i) => (i === 0 ? { ...c, annual: -1 } : c)) }))
      .toContain("must be 0 or more");
    expect(store().updateFinancials({ costLines: lines.map((c, i) => (i === 0 ? { ...c, fundingLine: "Capital" } : c)) }))
      .toContain("Investment or Non-investment");
    expect(store().updateFinancials({ costLines: [...lines, { ...lines[0] }] }))
      .toContain("on Financials twice");
    expect(store().data.settings.financials.costLines).toEqual(lines);
  });
});

describe("outcomes", () => {
  beforeEach(() => store().resetToSeed());

  it("adds, renames and removes an outcome", () => {
    expect(store().addOutcome("Lower cost to acquire")).toBe("");
    expect(store().data.settings.outcomes.map((o) => o.name)).toContain("Lower cost to acquire");
    expect(store().renameOutcome("Lower cost to acquire", "Cheaper to acquire")).toBe("");
    expect(store().data.settings.outcomes.map((o) => o.name)).toContain("Cheaper to acquire");
    expect(store().removeOutcome("Cheaper to acquire")).toBe("");
    expect(store().data.settings.outcomes.map((o) => o.name)).not.toContain("Cheaper to acquire");
  });

  it("refuses a blank or duplicate outcome", () => {
    expect(store().addOutcome("  ")).toContain("required");
    expect(store().addOutcome("Cut cost to serve")).toContain("already on Settings");
  });

  it("refuses to remove an outcome the work is still filed under", () => {
    const outcome = store().data.settings.outcomes
      .find((o) => store().data.work.some((w) => o.epics.includes(w.epic)));
    expect(outcome).toBeTruthy();
    expect(store().removeOutcome(outcome?.name as string)).toContain("still used by");
  });

  it("moves an epic from one outcome to another, and off them all", () => {
    expect(store().assignEpic("Reconciliation", "Cut cost to serve")).toBe("");
    expect(outcomeOfEpic(store().data, "Reconciliation")).toBe("Cut cost to serve");
    expect(store().data.settings.outcomes
      .find((o) => o.name === "Fewer errors and rework")?.epics).not.toContain("Reconciliation");
    expect(store().assignEpic("Reconciliation", "")).toBe("");
    expect(outcomeOfEpic(store().data, "Reconciliation")).toBe("");
  });

  it("refuses an epic with no name, and an outcome that is not on Settings", () => {
    expect(store().assignEpic("  ", "Cut cost to serve")).toContain("Pick an epic");
    expect(store().assignEpic("Reconciliation", "Something else")).toContain("not on Settings");
  });
});

describe("assignments", () => {
  beforeEach(() => store().resetToSeed());

  const booking = (): Assignment => ({
    person: store().data.people[0].name,
    item: store().data.work[0].title,
    type: "Booked",
    from: "2026-10-05",
    to: "2026-10-09",
    label: "Sprint booking",
  });

  it("adds a booking and undoes it", () => {
    const before = store().data.assignments.length;
    store().addAssignment(booking());
    expect(store().data.assignments).toHaveLength(before + 1);
    expect(store().undoLabel).toBe("Add booking");
    store().undo();
    expect(store().data.assignments).toHaveLength(before);
  });

  it("books capacity the engine then reads against that person", () => {
    const row = booking();
    const before = buildContext(store().data).personBookings[row.person]?.length ?? 0;
    store().addAssignment(row);
    expect(buildContext(store().data).personBookings[row.person]).toHaveLength(before + 1);
  });

  it("edits a booking in place and leaves the rest alone", () => {
    store().addAssignment(booking());
    const index = store().data.assignments.length - 1;
    store().updateAssignment(index, { to: "2026-10-16", label: "Longer booking" });
    const row = store().data.assignments[index];
    expect(row.to).toBe("2026-10-16");
    expect(row.label).toBe("Longer booking");
    expect(row.from).toBe("2026-10-05");
    expect(store().undoLabel).toBe("Edit booking");
  });

  it("removes a booking by its row and undoes that too", () => {
    store().addAssignment(booking());
    const before = store().data.assignments.length;
    store().removeAssignment(before - 1);
    expect(store().data.assignments).toHaveLength(before - 1);
    expect(store().undoLabel).toBe("Remove booking");
    store().undo();
    expect(store().data.assignments).toHaveLength(before);
  });

  it("refuses a booking with no person, no item, no type or a reversed span", () => {
    const data = store().data;
    expect(validateAssignment(data, booking())).toEqual([]);
    expect(validateAssignment(data, { ...booking(), person: "Nobody at all" }))
      .toContain("Pick a person from the People sheet.");
    expect(validateAssignment(data, { ...booking(), item: "No such work" }))
      .toContain("Pick a work item from the Work sheet.");
    expect(validateAssignment(data, { ...booking(), type: "  " }))
      .toContain("Booking type is required.");
    expect(validateAssignment(data, { ...booking(), to: "2026-10-01" }))
      .toContain("To is before From.");
    expect(validateAssignment(data, { ...booking(), from: "", to: "" }))
      .toContain("From and To dates are required.");
    expect(validateAssignment(data, { ...booking(), from: "1999-01-04", to: "1999-01-08" })[0])
      .toContain("not a year Waypoint knows");
  });
});

const SPIKE = "Payments orchestration: discovery spike";
const PARENT = "3-way match and posting engine";

const component = (patch: Partial<WorkItem> = {}): WorkItem => ({
  title: "3-way match: posting rules", kind: "Feature", phase: "", parent: "", epic: "",
  squad: "", skill: "Software engineering", size: "S", priority: "Should", state: "Ready",
  confidence: "Medium", startSprint: "", endSprint: "", assignees: [], assessedBy: "",
  productOwner: "", jira: "", jiraAlign: "", claimedFTE: null, claims: {}, landingMonth: null,
  landingYear: null, grade: null, proposed: true, ...patch,
});

describe("components, spikes and the stage actions", () => {
  beforeEach(() => store().resetToSeed());

  it("adds a component under a feature, taking the parent's squad and commitment", () => {
    expect(store().addComponent(PARENT, component())).toBe("");
    const added = store().data.work.find((w) => w.title === "3-way match: posting rules") as WorkItem;
    const parent = store().data.work.find((w) => w.title === PARENT) as WorkItem;
    expect(added.kind).toBe("Component");
    expect(added.parent).toBe(PARENT);
    expect(added.squad).toBe(parent.squad);
    expect(added.proposed).toBe(parent.proposed);
    expect(store().undoLabel).toBe("Add 3-way match: posting rules");
    store().undo();
    expect(store().data.work.some((w) => w.title === "3-way match: posting rules")).toBe(false);
  });

  it("gives a component written with sprint numbers a span the sprint plan schedules", () => {
    const parent = store().data.work.find((w) => w.title === PARENT) as WorkItem;
    const before = sprintPlan(buildContext(store().data));
    expect(store().addComponent(PARENT, component({ startSprint: 21, endSprint: 22 }))).toBe("");
    const added = store().data.work.find((w) => w.title === "3-way match: posting rules") as WorkItem;
    expect(added.span).toEqual([21, 22]);
    expect(itemSpan(added)).toEqual([21, 22]);
    const after = sprintPlan(buildContext(store().data));
    const demand = (plan: SprintPlan, num: number): number => {
      const squad = plan.squads.find((r) => r.name === parent.squad) as SprintPlanSquad;
      const at = plan.sprints.findIndex((sp) => sp.num === num);
      return squad.cells[at].committed + squad.cells[at].proposed;
    };
    expect(demand(after, 21)).toBeGreaterThan(demand(before, 21));
    expect(demand(after, 22)).toBeGreaterThan(demand(before, 22));
  });

  it("refuses a component with no parent, no size or a component for a parent", () => {
    expect(store().addComponent("No such feature", component()))
      .toContain("that feature is not on the Work sheet");
    expect(store().addComponent(PARENT, component({ size: "" })))
      .toContain("Give a size or an MW override.");
    expect(store().addComponent("3-way match: release", component()))
      .toContain("The parent must be a feature, not a component.");
  });

  it("concludes a spike with an outcome and its findings", () => {
    expect(store().concludeSpike(SPIKE, "More discovery", "Two providers left to test")).toBe("");
    const spike = store().data.work.find((w) => w.title === SPIKE) as WorkItem;
    expect(spike.spikeOutcome).toBe("More discovery");
    expect(spike.findings).toBe("Two providers left to test");
    expect(store().undoLabel).toBe("Conclude " + SPIKE);
    store().undo();
    expect((store().data.work.find((w) => w.title === SPIKE) as WorkItem).spikeOutcome)
      .toBeUndefined();
  });

  it("refuses to conclude a feature, or a spike with no outcome", () => {
    expect(store().concludeSpike(PARENT, "Feasible", "")).toContain("is not a spike");
    expect(store().concludeSpike(SPIKE, "", "")).toContain("Feasible, Not feasible or More discovery");
    expect(store().concludeSpike("No such spike", "Feasible", "")).toContain("Pick a work item");
  });

  it("converts a feasible spike into a feature that carries the findings over", () => {
    store().concludeSpike(SPIKE, "Feasible", "Orchestration is worth building");
    expect(store().convertSpike(SPIKE)).toBe("");
    const spike = store().data.work.find((w) => w.title === SPIKE) as WorkItem;
    const feature = store().data.work.find((w) => w.convertedFrom === SPIKE) as WorkItem;
    expect(spike.state).toBe("Done");
    expect(spike.convertedTo).toBe(feature.title);
    expect(feature.kind).toBe("Feature");
    expect(feature.squad).toBe(spike.squad);
    expect(feature.epic).toBe(spike.epic);
    expect(feature.notes).toBe("Orchestration is worth building");
    expect(store().undoLabel).toBe("Convert " + SPIKE);
    store().undo();
    expect(store().data.work.some((w) => w.convertedFrom === SPIKE)).toBe(false);
  });

  it("takes the title the conversion is given", () => {
    store().concludeSpike(SPIKE, "Feasible", "Worth building");
    expect(store().convertSpike(SPIKE, { title: "Payments orchestration" })).toBe("");
    expect(store().data.work.some((w) => w.title === "Payments orchestration")).toBe(true);
    expect((store().data.work.find((w) => w.title === SPIKE) as WorkItem).convertedTo)
      .toBe("Payments orchestration");
  });

  it("refuses to convert a spike that is not feasible, or one already converted", () => {
    expect(store().convertSpike(SPIKE)).toContain("Conclude the spike Feasible first");
    store().concludeSpike(SPIKE, "Feasible", "");
    expect(store().convertSpike(SPIKE, { title: "Payments orchestration" })).toBe("");
    expect(store().convertSpike(SPIKE, { title: "Payments orchestration v2" }))
      .toContain("already converted to Payments orchestration");
    expect(store().convertSpike(PARENT)).toContain("is not a spike");
  });

  it("commits a ready item and defers another", () => {
    expect(store().applyAction("Nudge engine: action-needed alerts", "commit")).toBe("");
    const committed = store().data.work
      .find((w) => w.title === "Nudge engine: action-needed alerts") as WorkItem;
    expect(committed.proposed).toBe(false);
    expect(store().undoLabel).toBe("Commit Nudge engine: action-needed alerts");
    store().undo();
    expect((store().data.work
      .find((w) => w.title === "Nudge engine: action-needed alerts") as WorkItem).proposed).toBe(true);
    expect(store().applyAction("Exception queue UI", "defer")).toBe("");
    expect((store().data.work.find((w) => w.title === "Exception queue UI") as WorkItem).state)
      .toBe("Deferred");
  });

  it("walks an item from development to done, carrying the phase with it", () => {
    const title = "Invoice capture and OCR: handwritten route to exception queue";
    expect(store().applyAction(title, "release")).toBe("");
    expect((store().data.work.find((w) => w.title === title) as WorkItem).state).toBe("Released");
    expect((store().data.work.find((w) => w.title === title) as WorkItem).phase).toBe("Release");
    expect(store().applyAction(title, "validate")).toBe("");
    expect((store().data.work.find((w) => w.title === title) as WorkItem).state)
      .toBe("In validation");
    expect(store().applyAction(title, "done")).toBe("");
    expect((store().data.work.find((w) => w.title === title) as WorkItem).state).toBe("Done");
  });

  it("sends a shaped feature to assessment, sized or not", () => {
    const title = "Payments SDK v3 migration";
    expect(store().applyAction(title, "assess")).toBe("");
    const item = store().data.work.find((w) => w.title === title) as WorkItem;
    expect(item.state).toBe("Ready");
    expect(item.phase).toBe("Assessment");
    store().undo();
    // the size is set during assessment, so an unsized feature is held to the Product rules only
    store().updateWork(title, { size: "" });
    expect(store().applyAction(title, "sendToAssessment")).toBe("");
    const unsized = store().data.work.find((w) => w.title === title) as WorkItem;
    expect(unsized.state).toBe("Ready");
    expect(unsized.phase).toBe("Assessment");
    expect(unsized.size).toBe("");
  });

  it("cancels an item only with a reason", () => {
    const title = "Onboarding analytics dashboard";
    expect(store().applyAction(title, "cancel")).toContain("needs a cancellation reason");
    expect(store().applyAction(title, "cancel", { reason: "Superseded by the new dashboard" }))
      .toBe("");
    const item = store().data.work.find((w) => w.title === title) as WorkItem;
    expect(item.state).toBe("Cancelled");
    expect(item.cancelReason).toBe("Superseded by the new dashboard");
    store().undo();
    expect((store().data.work.find((w) => w.title === title) as WorkItem).state).toBe("Ready");
  });

  it("refuses a step the item cannot take, and an item it does not have", () => {
    expect(store().applyAction("Exception queue UI", "done")).toContain("not a step");
    expect(store().applyAction("No such work", "commit")).toContain("Pick a work item");
  });

  it("concludes and converts a spike through applyAction too", () => {
    expect(store().applyAction(SPIKE, "conclude", { outcome: "Feasible", findings: "Proven" }))
      .toBe("");
    expect(store().applyAction(SPIKE, "convert", { feature: { title: "Payments orchestration" } }))
      .toBe("");
    expect(store().data.work.some((w) => w.title === "Payments orchestration")).toBe(true);
  });
});
describe("the activity log", () => {
  beforeEach(() => store().resetToSeed());

  const log = (): LogEntry[] => store().data.log ?? [];
  const last = (): LogEntry => log()[log().length - 1];

  it("records an action with the record it changed in the summary", () => {
    expect(store().addOutcome("Fewer handoffs")).toBe("");
    expect(last().label).toBe("Add outcome");
    expect(last().summary).toBe("Add outcome: Fewer handoffs");
    expect(last().user).toBe("CM");
    expect(Number.isNaN(Date.parse(last().at))).toBe(false);
  });

  it("records an undo rather than removing the entry it undid", () => {
    expect(store().addOutcome("Fewer handoffs")).toBe("");
    const entries = log().length;
    store().undo();
    expect(log()).toHaveLength(entries + 1);
    expect(last().label).toBe("Undo: Add outcome");
    expect(store().data.settings.outcomes.some((o) => o.name === "Fewer handoffs")).toBe(false);
  });

  it("holds the log at 500 entries, dropping the oldest", () => {
    const filler: LogEntry[] = Array.from({ length: 600 }, (_, i) => ({
      at: "2025-01-01T09:00:00.000Z", label: "Tick " + i, summary: "Tick " + i, user: "CM",
    }));
    store().transact("Fill the log", (d) => ({ ...d, log: filler }));
    expect(log()).toHaveLength(500);
    expect(log()[0].label).toBe("Tick 101");
    expect(last().label).toBe("Fill the log");
    expect(store().addOutcome("One more")).toBe("");
    expect(log()).toHaveLength(500);
    expect(log()[0].label).toBe("Tick 102");
  });

  it("keeps the log in the dataset it persists", () => {
    let saved = "";
    const store2 = {
      getItem: () => null,
      setItem: (key: string, value: string) => { if (key === STORAGE_KEY) saved = value; },
    } as unknown as Storage;
    const globals = globalThis as { localStorage?: Storage };
    globals.localStorage = store2;
    try {
      expect(store().addOutcome("Persisted outcome")).toBe("");
    } finally {
      delete globals.localStorage;
    }
    const data = (JSON.parse(saved) as { data: Dataset }).data;
    const entries = data.log ?? [];
    expect(entries[entries.length - 1].summary).toBe("Add outcome: Persisted outcome");
  });
});
