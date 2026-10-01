// The actions the two editable surfaces call, and the rules they refuse on.
import { beforeEach, describe, expect, it } from "vitest";
import { useDataset } from "../useDataset";
import type { WorkItem } from "../../model/types";

const item = (title: string): WorkItem => ({
  title, kind: "Feature", phase: "", parent: "", epic: "", squad: "", skill: "", size: "S",
  priority: "Should", state: "Ready", confidence: "Medium", startSprint: "", endSprint: "",
  assignees: [], assessedBy: "", productOwner: "", jira: "", jiraAlign: "", claimedFTE: null,
  claims: {}, landingMonth: null, landingYear: null, grade: null, proposed: true,
});

describe("dataset actions", () => {
  beforeEach(() => useDataset.getState().resetToSeed());

  it("adds, updates and removes a work item", () => {
    useDataset.getState().addWork(item("Test harness rewrite"));
    expect(useDataset.getState().data.work.some((w) => w.title === "Test harness rewrite")).toBe(true);
    useDataset.getState().updateWork("Test harness rewrite", { squad: "Squad 1" });
    expect(useDataset.getState().data.work.find((w) => w.title === "Test harness rewrite")?.squad)
      .toBe("Squad 1");
    useDataset.getState().removeWork("Test harness rewrite");
    expect(useDataset.getState().data.work.some((w) => w.title === "Test harness rewrite")).toBe(false);
  });

  it("refuses to remove a person who is assigned to work", () => {
    const assigned = useDataset.getState().data.work.find((w) => w.assignees.length > 0);
    const name = assigned?.assignees[0] as string;
    const message = useDataset.getState().removePerson(name);
    expect(message).toContain(name);
    expect(useDataset.getState().data.people.some((p) => p.name === name)).toBe(true);
  });

  it("refuses to remove a squad that is still in use", () => {
    const squad = useDataset.getState().data.squads[0].name;
    const message = useDataset.getState().removeSquad(squad);
    expect(message).toContain(squad);
    expect(useDataset.getState().data.squads.some((s) => s.name === squad)).toBe(true);
  });

  it("adds, updates and removes an absence", () => {
    const person = useDataset.getState().data.people[0].name;
    const before = useDataset.getState().data.absences.length;
    useDataset.getState().addAbsence({
      person, type: "Annual leave", from: "2026-11-02", to: "2026-11-06", note: "",
    });
    expect(useDataset.getState().data.absences.length).toBe(before + 1);
    useDataset.getState().updateAbsence(before, { type: "Training" });
    expect(useDataset.getState().data.absences[before].type).toBe("Training");
    useDataset.getState().removeAbsence(before);
    expect(useDataset.getState().data.absences.length).toBe(before);
  });

  it("clearSampleData keeps people, squads and settings", () => {
    const people = useDataset.getState().data.people.length;
    const squads = useDataset.getState().data.squads.length;
    const quarter = useDataset.getState().data.settings.quarter;
    useDataset.getState().clearSampleData();
    const after = useDataset.getState().data;
    expect(after.people.length).toBe(people);
    expect(after.squads.length).toBe(squads);
    expect(after.settings.quarter).toBe(quarter);
    expect(after.work).toHaveLength(0);
    expect(after.absences).toHaveLength(0);
    expect(after.assignments).toHaveLength(0);
    expect(after.benefitActuals).toHaveLength(0);
    expect(after.reservations).toHaveLength(0);
    expect(after.history).toHaveLength(0);
    expect(after.archive).toHaveLength(0);
  });

  it("refuses to remove a person who owns work, holds a booking or leads a squad", () => {
    const state = () => useDataset.getState();
    const owner = state().data.work.find((w) => w.productOwner)?.productOwner as string;
    expect(state().removePerson(owner)).toContain(owner);
    const booked = state().data.assignments
      .map((a) => a.person)
      .find((n) => !state().data.work.some((w) => w.assignees.includes(n))
        && !state().data.absences.some((a) => a.person === n)
        && !state().data.work.some((w) => w.productOwner === n || w.assessedBy === n)) as string;
    expect(state().removePerson(booked)).toContain("Assignments");
    const lead = state().data.squads[0].lead;
    expect(state().removePerson(lead)).toContain(lead);
    for (const name of [owner, booked, lead]) {
      expect(state().data.people.some((p) => p.name === name)).toBe(true);
    }
  });

  it("carries a work item's new title to everything that named it", () => {
    const title = useDataset.getState().data.work.find((w) => w.parent)?.parent as string;
    useDataset.getState().updateWork(title, { title: "Renamed feature" });
    const d = useDataset.getState().data;
    expect(d.work.some((w) => w.parent === title)).toBe(false);
    expect(d.work.some((w) => w.parent === "Renamed feature")).toBe(true);
    expect(d.work.some((w) => w.dependsOn === title)).toBe(false);
    expect(d.assignments.some((a) => a.item === title)).toBe(false);
    expect(d.benefitActuals.some((b) => b.title === title)).toBe(false);
    expect(d.archive.some((a) => a.title === title)).toBe(false);
  });

  it("undoes the last action", () => {
    const before = useDataset.getState().data.work.length;
    useDataset.getState().addWork(item("Undo me"));
    expect(useDataset.getState().data.work.length).toBe(before + 1);
    useDataset.getState().undo();
    expect(useDataset.getState().data.work.length).toBe(before);
    expect(useDataset.getState().data.work.some((w) => w.title === "Undo me")).toBe(false);
  });
});
