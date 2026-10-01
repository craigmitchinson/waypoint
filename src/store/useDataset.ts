// One dataset for the whole app: the seed until a workbook is imported over it, kept in localStorage
// so edits survive a reload. Every mutation goes through an action; the last one can be undone.
import { create } from "zustand";
import type {
  Absence, ArchiveRow, Assignment, BenefitActual, CapacityImpact, Dataset, Financials, GradeBlend,
  GradeRate, HistorySnapshot, LogEntry, Outcome, Person, Reservation, Settings, SpikeOutcome, Squad,
  WorkItem,
} from "../model/types";
import seedDataset from "../seed";
import { compute } from "../engine/compute";
import type { QuarterView } from "../engine/compute";
import { buildContext, itemSpan } from "../engine/context";
import type { EngineContext } from "../engine/context";
import { quarterRange, toISO } from "../engine/dates";
import { counts, workMW } from "../engine/work";
import { fteClaimed, gbpInYear } from "../engine/value";
import { reservationRows } from "../engine/reservations";
import { importWorkbookFile } from "../import/workbook";
import {
  LIST_LABELS, SPIKE_OUTCOMES, impactOf, listUsage, listValues, nextActions, outcomeUsage, phaseOf,
  stillUsed, usedBy, validateBenefitActual, validateBlend, validateEngineering, validateFinancials,
  validateGrade, validateProduct, validateReservation, validateSettings, validateWork,
} from "./validate";
import type { ListName } from "./validate";

export const STORAGE_KEY = "waypoint-dataset-v1";
export const SCHEMA_VERSION = 1;

/** The most the log holds: the oldest lines drop off the end of it. */
export const LOG_LIMIT = 500;

// Who the entry is stamped with: a placeholder until Power Platform supplies the signed-in user.
const LOG_USER = "CM";

interface Saved {
  version: number;
  source: string;
  data: Dataset;
}

interface Undoable {
  data: Dataset;
  source: string;
  label: string;
}

/** What a close did: the workbook's own summary, with the snapshot it took. */
export interface CloseSummary {
  done: number;
  archived: number;
  snapshot: HistorySnapshot | null;
  message: string;
}

interface DatasetState {
  data: Dataset;
  source: string;
  view: QuarterView;
  undoLabel: string;
  load: (data: Dataset, source: string) => void;
  /** Merges an import: absences appended, work items added or patched by jira key (title when there is none). */
  applyImport: (change: ImportChange, source: string) => void;
  addWork: (item: WorkItem) => void;
  /** A component under a feature: it takes the parent's commitment, and its squad unless the row names one. */
  addComponent: (parentTitle: string, item: WorkItem) => string;
  /** The spike's answer: the outcome it reached, and what it found. */
  concludeSpike: (title: string, outcome: SpikeOutcome, findings: string) => string;
  /** A feasible spike becomes a feature; the spike goes Done, pointing at it. */
  convertSpike: (title: string, featurePatch?: Partial<WorkItem>) => string;
  /** One stage action from nextActions, by its id; "" when it was applied. */
  applyAction: (title: string, actionId: string, payload?: ActionPayload) => string;
  updateWork: (title: string, patch: Partial<WorkItem>) => void;
  removeWork: (title: string) => void;
  addPerson: (person: Person) => void;
  updatePerson: (name: string, patch: Partial<Person>) => void;
  removePerson: (name: string) => string;
  addSquad: (squad: Squad) => void;
  updateSquad: (name: string, patch: Partial<Squad>) => void;
  removeSquad: (name: string) => string;
  addAbsence: (absence: Absence) => void;
  updateAbsence: (index: number, patch: Partial<Absence>) => void;
  removeAbsence: (index: number) => void;
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (index: number, patch: Partial<Assignment>) => void;
  removeAssignment: (index: number) => void;
  /** Any change a page needs that has no action of its own; it undoes and persists like the rest. */
  transact: (label: string, fn: (d: Dataset) => Dataset) => void;
  addListValue: (list: ListName, value: string) => string;
  renameListValue: (list: ListName, oldValue: string, newValue: string) => string;
  removeListValue: (list: ListName, value: string) => string;
  addSkill: (name: string) => string;
  renameSkill: (oldName: string, newName: string) => string;
  removeSkill: (name: string) => string;
  addBenefitActual: (actual: BenefitActual) => string;
  updateBenefitActual: (index: number, patch: Partial<BenefitActual>) => string;
  removeBenefitActual: (index: number) => void;
  addReservation: (reservation: Reservation) => string;
  updateReservation: (index: number, patch: Partial<Reservation>) => string;
  removeReservation: (index: number) => void;
  updateSettings: (patch: Partial<Settings>) => string;
  updateFinancials: (patch: Partial<Financials>) => string;
  addOutcome: (name: string) => string;
  renameOutcome: (oldName: string, newName: string) => string;
  removeOutcome: (name: string) => string;
  /** The epic moves to that outcome, and off the one that held it; "" leaves it with no outcome. */
  assignEpic: (epic: string, outcome: string) => string;
  updateStateImpact: (state: string, impact: CapacityImpact) => string;
  addGrade: (grade: GradeRate) => string;
  updateGrade: (name: string, patch: Partial<GradeRate>) => string;
  removeGrade: (name: string) => string;
  addBlend: (blend: GradeBlend) => string;
  updateBlend: (name: string, patch: Partial<GradeBlend>) => string;
  removeBlend: (name: string) => string;
  /** QuarterClose: mark, snapshot, archive, then move Settings on to the next quarter. */
  closeQuarter: (force?: boolean) => CloseSummary;
  resetToSeed: () => void;
  clearSampleData: () => void;
  loadWorkbook: (file: File) => Promise<void>;
  undo: () => void;
}

/** What a stage action needs to be applied: the spike's answer, a cancellation reason, a new feature. */
export interface ActionPayload {
  outcome?: SpikeOutcome;
  findings?: string;
  reason?: string;
  feature?: Partial<WorkItem>;
}

export interface ImportChange {
  absences?: Absence[];
  work?: WorkItem[];
  updates?: { title: string; key?: string; patch: Partial<WorkItem> }[];
}

/** A stored dataset the pages can build a context from: every block the engine reads is an array. */
function wellShaped(data: Dataset | undefined): boolean {
  if (!data || typeof data !== "object") return false;
  const blocks: (keyof Dataset)[] = [
    "people", "squads", "work", "absences", "assignments", "benefitActuals", "reservations",
    "history", "archive", "bankHolidays",
  ];
  if (blocks.some((k) => !Array.isArray(data[k]))) return false;
  const st = data.settings;
  return Boolean(st) && typeof st.quarter === "string" && typeof st.epoch === "string"
    && Array.isArray(st.states) && Array.isArray(st.grades) && Array.isArray(st.outcomes)
    && Boolean(st.financials) && Array.isArray(st.financials.costLines);
}

function readSaved(): Saved | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Saved;
    if (saved.version !== SCHEMA_VERSION || !wellShaped(saved.data)) return null;
    return saved;
  } catch {
    return null;
  }
}

function writeSaved(data: Dataset, source: string): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: SCHEMA_VERSION, source, data } as Saved));
  } catch {
    // A full or blocked store is not a reason to lose the edit in front of the user.
  }
}

/** The audit trail: one line per commit, naming the record where the action has one. */
function logged(data: Dataset, label: string, subject = ""): Dataset {
  const entry: LogEntry = {
    at: new Date().toISOString(),
    label,
    summary: subject ? `${label}: ${subject}` : label,
    user: LOG_USER,
  };
  const log = [...(data.log ?? []), entry];
  return { ...data, log: log.length > LOG_LIMIT ? log.slice(log.length - LOG_LIMIT) : log };
}

/** compute() is the expensive read: hold the last answer and return it while the dataset is the same. */
let lastData: Dataset | null = null;
let lastView: QuarterView | null = null;

export function quarterView(data: Dataset): QuarterView {
  if (lastData === data && lastView) return lastView;
  lastData = data;
  lastView = compute(data);
  return lastView;
}

let undoStack: Undoable | null = null;

const start = readSaved();
const initialData = start?.data ?? seedDataset;
const initialSource = start?.source ?? "Seed";

export const useDataset = create<DatasetState>((set, get) => {
  /** Every mutation lands here: it remembers the state it replaced, recomputes and persists. */
  const commit = (label: string, next: Dataset, subject = "", source = get().source) => {
    const prev = get();
    undoStack = { data: prev.data, source: prev.source, label };
    const data = logged(next, label, subject);
    writeSaved(data, source);
    set({ data, source, view: quarterView(data), undoLabel: label });
  };

  return {
    data: initialData,
    source: initialSource,
    view: quarterView(initialData),
    undoLabel: "",
    load: (data, source) => commit("Load " + source, data, "", source),
    applyImport: (change, source) => {
      const state = get();
      const patches = new Map(
        (change.updates ?? []).map((u) => [u.key ? "key:" + u.key : "title:" + u.title, u.patch]),
      );
      const work = state.data.work.map((item) => {
        const patchKey = item.jira ? "key:" + item.jira.trim().toLowerCase() : "title:" + item.title;
        const patch = patches.get(patchKey);
        return patch ? { ...item, ...patch } : item;
      });
      const data: Dataset = {
        ...state.data,
        absences: [...state.data.absences, ...(change.absences ?? [])],
        work: [...work, ...(change.work ?? [])],
      };
      commit("Import from " + source, data, "", source);
    },
    addWork: (item) => {
      const row = withSpan(item);
      const data = { ...get().data, work: [...get().data.work, row] };
      commit("Add " + row.title, data);
    },
    addComponent: (parentTitle, item) => {
      const d = get().data;
      const parent = d.work.find((w) => w.title === parentTitle);
      if (!parent) return "Part of: that feature is not on the Work sheet.";
      const component: WorkItem = withSpan({
        ...item,
        kind: "Component",
        parent: parentTitle,
        squad: item.squad || parent.squad,
        proposed: parent.proposed,
      });
      const msg = validateEngineering(d, component);
      if (msg.length > 0) return msg.join(" ");
      commit("Add " + component.title, { ...d, work: [...d.work, component] });
      return "";
    },
    concludeSpike: (title, outcome, findings) => {
      const d = get().data;
      const spike = d.work.find((w) => w.title === title);
      if (!spike) return "Pick a work item from the Work sheet.";
      if (spike.kind !== "Spike") return title + " is not a spike.";
      if (!outcome || !SPIKE_OUTCOMES.includes(outcome)) {
        return "A spike concludes Feasible, Not feasible or More discovery.";
      }
      commit("Conclude " + title, withWork(d, title, { spikeOutcome: outcome, findings }));
      return "";
    },
    convertSpike: (title, featurePatch) => {
      const d = get().data;
      const spike = d.work.find((w) => w.title === title);
      if (!spike) return "Pick a work item from the Work sheet.";
      if (spike.kind !== "Spike") return title + " is not a spike.";
      if (spike.spikeOutcome !== "Feasible") {
        return "Conclude the spike Feasible first: only a feasible spike becomes a feature.";
      }
      if (spike.convertedTo) return title + " is already converted to " + spike.convertedTo + ".";
      const wanted = (featurePatch?.title ?? "").trim() || spike.title;
      const taken = d.work.some((w) => w.title.toLowerCase() === wanted.toLowerCase());
      const name = taken ? wanted + " (feature)" : wanted;
      const feature: WorkItem = {
        ...blankWork(),
        ...featurePatch,
        title: name,
        kind: "Feature",
        phase: "Shaping",
        parent: "",
        epic: featurePatch?.epic ?? spike.epic,
        squad: featurePatch?.squad ?? spike.squad,
        skill: featurePatch?.skill ?? spike.skill,
        productOwner: featurePatch?.productOwner ?? spike.productOwner,
        notes: featurePatch?.notes ?? spike.findings ?? "",
        convertedFrom: spike.title,
      };
      const msg = validateWork(d, feature);
      if (msg.length > 0) return msg.join(" ");
      const data = withWork(d, title, { state: "Done", convertedTo: name });
      commit("Convert " + title, { ...data, work: [...data.work, feature] });
      return "";
    },
    applyAction: (title, actionId, payload) => {
      const d = get().data;
      const item = d.work.find((w) => w.title === title);
      if (!item) return "Pick a work item from the Work sheet.";
      const action = nextActions(d, item).find((a) => a.id === actionId);
      if (!action) {
        return "That is not a step " + title + " can take from " + (item.state || "no state") + ".";
      }
      if (actionId === "conclude") {
        return get().concludeSpike(title, payload?.outcome ?? "", payload?.findings ?? "");
      }
      if (actionId === "convert") return get().convertSpike(title, payload?.feature);
      const patch: Partial<WorkItem> = {};
      if (action.to) patch.state = action.to;
      if (actionId === "commit") patch.proposed = false;
      if (actionId === "cancel") {
        const reason = (payload?.reason ?? "").trim();
        if (!reason) return "A cancelled item needs a cancellation reason.";
        patch.cancelReason = reason;
      }
      if (actionId === "assess" || actionId === "sendToAssessment") {
        // an unsized item is on its way to be sized, so it is held to the Product rules, not the
        // Engineering ones, which would ask for the size assessment has not given it yet
        const check = actionId === "assess" ? validateEngineering : validateProduct;
        const msg = check(d, { ...item, ...patch }, title);
        if (msg.length > 0) return msg.join(" ");
      }
      commit(action.label + " " + title, withWork(d, title, patch));
      return "";
    },
    updateWork: (title, patch) => {
      const next = patch.title && patch.title !== title ? patch.title : title;
      const d = get().data;
      const data: Dataset = {
        ...d,
        work: d.work.map((w) => {
          const item = w.title === title ? applyWorkPatch(d, w, patch) : w;
          return {
            ...item,
            parent: item.parent === title ? next : item.parent,
            dependsOn: item.dependsOn === title ? next : item.dependsOn,
          };
        }),
        assignments: d.assignments.map((a) => (a.item === title ? { ...a, item: next } : a)),
        benefitActuals: d.benefitActuals.map((b) => (b.title === title ? { ...b, title: next } : b)),
        archive: d.archive.map((a) => (a.title === title ? { ...a, title: next } : a)),
      };
      commit("Edit " + title, data);
    },
    removeWork: (title) => {
      const data = {
        ...get().data,
        work: get().data.work.filter((w) => w.title !== title),
        assignments: get().data.assignments.filter((a) => a.item !== title),
      };
      commit("Remove " + title, data);
    },
    addPerson: (person) => commit("Add " + person.name, { ...get().data, people: [...get().data.people, person] }),
    updatePerson: (name, patch) => {
      const next = patch.name && patch.name !== name ? patch.name : name;
      const d = get().data;
      const data: Dataset = {
        ...d,
        people: d.people.map((p) => (p.name === name ? { ...p, ...patch } : p)),
        absences: d.absences.map((a) => (a.person === name ? { ...a, person: next } : a)),
        assignments: d.assignments.map((a) => (a.person === name ? { ...a, person: next } : a)),
        work: d.work.map((w) => ({
          ...w,
          assignees: w.assignees.map((a) => (a === name ? next : a)),
        })),
      };
      commit("Edit " + name, data);
    },
    removePerson: (name) => {
      const d = get().data;
      const onWork = d.work.filter((w) => w.assignees.includes(name)).map((w) => w.title);
      if (onWork.length > 0) {
        return `${name} is assigned to ${onWork.length} work item(s), starting with ${onWork[0]}. Take them off the work first.`;
      }
      if (d.absences.some((a) => a.person === name)) {
        return `${name} has absences booked. Remove those first.`;
      }
      const owns = d.work.filter((w) => w.productOwner === name || w.assessedBy === name).map((w) => w.title);
      if (owns.length > 0) {
        return `${name} owns or assessed ${owns.length} work item(s), starting with ${owns[0]}. Hand those over first.`;
      }
      if (d.assignments.some((a) => a.person === name)) {
        return `${name} still has typed bookings on Assignments. Remove those first.`;
      }
      const leads = d.squads.filter((s) => s.lead === name).map((s) => s.name);
      if (leads.length > 0) {
        return `${name} leads ${leads[0]}. Give the squad another lead first.`;
      }
      commit("Remove " + name, { ...d, people: d.people.filter((p) => p.name !== name) });
      return "";
    },
    addSquad: (squad) => commit("Add " + squad.name, { ...get().data, squads: [...get().data.squads, squad] }),
    updateSquad: (name, patch) => {
      const next = patch.name && patch.name !== name ? patch.name : name;
      const d = get().data;
      const data: Dataset = {
        ...d,
        squads: d.squads.map((s) => (s.name === name ? { ...s, ...patch } : s)),
        people: d.people.map((p) => (p.squad === name ? { ...p, squad: next } : p)),
        work: d.work.map((w) => (w.squad === name ? { ...w, squad: next } : w)),
        reservations: d.reservations.map((r) => (r.squad === name ? { ...r, squad: next } : r)),
      };
      commit("Edit " + name, data);
    },
    removeSquad: (name) => {
      const d = get().data;
      const people = d.people.filter((p) => p.squad === name).length;
      if (people > 0) return `${name} still has ${people} people in it. Move them to another squad first.`;
      const work = d.work.filter((w) => w.squad === name).length;
      if (work > 0) return `${name} still carries ${work} work item(s). Move them to another squad first.`;
      if (d.reservations.some((r) => r.squad === name)) {
        return `${name} still holds reserved capacity. Release the reservation first.`;
      }
      commit("Remove " + name, { ...d, squads: d.squads.filter((s) => s.name !== name) });
      return "";
    },
    addAbsence: (absence) => commit(
      "Add absence",
      { ...get().data, absences: [...get().data.absences, absence] },
      absence.person,
    ),
    updateAbsence: (index, patch) => {
      const absences = get().data.absences.map((a, i) => (i === index ? { ...a, ...patch } : a));
      commit("Edit absence", { ...get().data, absences }, absences[index]?.person ?? "");
    },
    removeAbsence: (index) => {
      const person = get().data.absences[index]?.person ?? "";
      const absences = get().data.absences.filter((_, i) => i !== index);
      commit("Remove absence", { ...get().data, absences }, person);
    },
    addAssignment: (assignment) => commit(
      "Add booking",
      { ...get().data, assignments: [...get().data.assignments, assignment] },
      `${assignment.person} on ${assignment.item}`,
    ),
    updateAssignment: (index, patch) => {
      const assignments = get().data.assignments.map((a, i) => (i === index ? { ...a, ...patch } : a));
      commit("Edit booking", { ...get().data, assignments }, assignments[index]?.person ?? "");
    },
    removeAssignment: (index) => {
      const person = get().data.assignments[index]?.person ?? "";
      const assignments = get().data.assignments.filter((_, i) => i !== index);
      commit("Remove booking", { ...get().data, assignments }, person);
    },
    transact: (label, fn) => commit(label, fn(get().data)),
    addListValue: (list, value) => {
      const d = get().data;
      const name = value.trim();
      const label = LIST_LABELS[list];
      if (!name) return `${label[0].toUpperCase()}${label.slice(1)} is required.`;
      if (listValues(d, list).some((v) => v.toLowerCase() === name.toLowerCase())) {
        return `That ${label} is already on Settings.`;
      }
      commit(`Add ${label}`, withList(d, list, [...listValues(d, list), name]), name);
      return "";
    },
    renameListValue: (list, oldValue, newValue) => {
      const d = get().data;
      const name = newValue.trim();
      const label = LIST_LABELS[list];
      if (!name) return `${label[0].toUpperCase()}${label.slice(1)} is required.`;
      if (!listValues(d, list).includes(oldValue)) return `${oldValue} is not on the ${label} list.`;
      const clash = listValues(d, list)
        .some((v) => v.toLowerCase() === name.toLowerCase() && v !== oldValue);
      if (clash) return `That ${label} is already on Settings.`;
      commit(`Rename ${label}`, renameInList(d, list, oldValue, name), `${oldValue} to ${name}`);
      return "";
    },
    removeListValue: (list, value) => {
      const d = get().data;
      const label = LIST_LABELS[list];
      if (!listValues(d, list).includes(value)) return `Pick a ${label} to remove.`;
      const used = stillUsed(label, usedBy(listUsage(d, list, value)));
      if (used) return used;
      commit(`Remove ${label}`, withList(d, list, listValues(d, list).filter((v) => v !== value)), value);
      return "";
    },
    addSkill: (name) => get().addListValue("skills", name),
    renameSkill: (oldName, newName) => get().renameListValue("skills", oldName, newName),
    removeSkill: (name) => get().removeListValue("skills", name),
    addBenefitActual: (actual) => {
      const d = get().data;
      const msg = validateBenefitActual(d, actual);
      if (msg.length > 0) return msg.join(" ");
      commit("Record actual", { ...d, benefitActuals: [...d.benefitActuals, actual] }, actual.title);
      return "";
    },
    updateBenefitActual: (index, patch) => {
      const d = get().data;
      const current = d.benefitActuals[index];
      if (!current) return "Pick an actual to edit.";
      const next = { ...current, ...patch };
      const msg = validateBenefitActual(d, next, index);
      if (msg.length > 0) return msg.join(" ");
      commit("Edit actual", {
        ...d,
        benefitActuals: d.benefitActuals.map((a, i) => (i === index ? next : a)),
      }, next.title);
      return "";
    },
    removeBenefitActual: (index) => {
      const d = get().data;
      const title = d.benefitActuals[index]?.title ?? "";
      commit("Remove actual", { ...d, benefitActuals: d.benefitActuals.filter((_, i) => i !== index) }, title);
    },
    addReservation: (res) => {
      const d = get().data;
      const msg = validateReservation(d, res);
      if (msg.length > 0) return msg.join(" ");
      commit("Add reservation", { ...d, reservations: [...d.reservations, res] }, reservationName(res));
      return "";
    },
    updateReservation: (index, patch) => {
      const d = get().data;
      const current = d.reservations[index];
      if (!current) return "Pick a reservation to edit.";
      const next = { ...current, ...patch };
      const msg = validateReservation(d, next, index);
      if (msg.length > 0) return msg.join(" ");
      commit("Edit reservation", {
        ...d,
        reservations: d.reservations.map((r, i) => (i === index ? next : r)),
      }, reservationName(next));
      return "";
    },
    removeReservation: (index) => {
      const d = get().data;
      const held = d.reservations[index];
      commit(
        "Remove reservation",
        { ...d, reservations: d.reservations.filter((_, i) => i !== index) },
        held ? reservationName(held) : "",
      );
    },
    updateSettings: (patch) => {
      const d = get().data;
      const msg = validateSettings(d, patch);
      if (msg.length > 0) return msg.join(" ");
      commit("Edit settings", { ...d, settings: { ...d.settings, ...patch } });
      return "";
    },
    updateFinancials: (patch) => {
      const d = get().data;
      const msg = validateFinancials(d, patch);
      if (msg.length > 0) return msg.join(" ");
      const financials = { ...d.settings.financials, ...patch };
      commit("Edit financials", { ...d, settings: { ...d.settings, financials } });
      return "";
    },
    addOutcome: (name) => {
      const d = get().data;
      const outcome = name.trim();
      if (!outcome) return "Outcome is required.";
      if (d.settings.outcomes.some((o) => o.name.toLowerCase() === outcome.toLowerCase())) {
        return "That outcome is already on Settings.";
      }
      const outcomes = [...d.settings.outcomes, { name: outcome, epics: [] }];
      commit("Add outcome", { ...d, settings: { ...d.settings, outcomes } }, outcome);
      return "";
    },
    renameOutcome: (oldName, newName) => {
      const d = get().data;
      const name = newName.trim();
      if (!name) return "Outcome is required.";
      if (!d.settings.outcomes.some((o) => o.name === oldName)) {
        return `${oldName} is not on the Outcome list.`;
      }
      const clash = d.settings.outcomes
        .some((o) => o.name.toLowerCase() === name.toLowerCase() && o.name !== oldName);
      if (clash) return "That outcome is already on Settings.";
      const outcomes = d.settings.outcomes
        .map((o) => (o.name === oldName ? { ...o, name } : o));
      commit("Rename outcome", { ...d, settings: { ...d.settings, outcomes } }, `${oldName} to ${name}`);
      return "";
    },
    removeOutcome: (name) => {
      const d = get().data;
      if (!d.settings.outcomes.some((o) => o.name === name)) return "Pick an outcome to remove.";
      const used = stillUsed("outcome", usedBy(outcomeUsage(d, name)));
      if (used) return used;
      const outcomes = d.settings.outcomes.filter((o) => o.name !== name);
      commit("Remove outcome", { ...d, settings: { ...d.settings, outcomes } }, name);
      return "";
    },
    assignEpic: (epic, outcome) => {
      const d = get().data;
      const name = epic.trim();
      if (!name) return "Pick an epic.";
      if (outcome && !d.settings.outcomes.some((o) => o.name === outcome)) {
        return "That outcome is not on Settings.";
      }
      const outcomes: Outcome[] = d.settings.outcomes.map((o) => {
        const epics = o.epics.filter((e) => e.toLowerCase() !== name.toLowerCase());
        return { ...o, epics: o.name === outcome ? [...epics, name] : epics };
      });
      commit("Assign " + name, { ...d, settings: { ...d.settings, outcomes } });
      return "";
    },
    updateStateImpact: (state, impact) => {
      const d = get().data;
      if (!d.settings.states.some((s) => s.name === state)) return "Pick a state from Settings.";
      const states = d.settings.states.map((s) => (s.name === state ? { ...s, impact } : s));
      commit("Edit state", { ...d, settings: { ...d.settings, states } }, state);
      return "";
    },
    addGrade: (grade) => {
      const d = get().data;
      const msg = validateGrade(d, grade);
      if (msg.length > 0) return msg.join(" ");
      const grades = [...d.settings.grades, { ...grade, grade: grade.grade.trim() }];
      commit("Add business grade", { ...d, settings: { ...d.settings, grades } }, grade.grade.trim());
      return "";
    },
    updateGrade: (name, patch) => {
      const d = get().data;
      const current = d.settings.grades.find((g) => g.grade === name);
      if (!current) return "Pick a business grade to edit.";
      const next = { ...current, ...patch, grade: (patch.grade ?? name).trim() };
      const msg = validateGrade(d, next, name);
      if (msg.length > 0) return msg.join(" ");
      const settings = {
        ...d.settings,
        grades: d.settings.grades.map((g) => (g.grade === name ? next : g)),
        blends: d.settings.blends.map((b) => renameCount(b, name, next.grade)),
      };
      const data: Dataset = {
        ...d,
        settings,
        work: d.work.map((w) => (w.grade === name ? { ...w, grade: next.grade } : w)),
      };
      commit("Edit business grade", data, next.grade);
      return "";
    },
    removeGrade: (name) => {
      const d = get().data;
      if (!d.settings.grades.some((g) => g.grade === name)) return "Pick a business grade to remove.";
      const onWork = d.work.filter((w) => w.grade === name).map((w) => w.title);
      const inBlends = d.settings.blends.filter((b) => (b.counts[name] ?? 0) !== 0).map((b) => b.name);
      const used = stillUsed("business grade", usedBy([...onWork, ...inBlends]));
      if (used) return used;
      const grades = d.settings.grades.filter((g) => g.grade !== name);
      commit("Remove business grade", { ...d, settings: { ...d.settings, grades } }, name);
      return "";
    },
    addBlend: (blend) => {
      const d = get().data;
      const msg = validateBlend(d, blend);
      if (msg.length > 0) return msg.join(" ");
      const blends = [...d.settings.blends, { ...blend, name: blend.name.trim() }];
      commit("Add grade blend", { ...d, settings: { ...d.settings, blends } }, blend.name.trim());
      return "";
    },
    updateBlend: (name, patch) => {
      const d = get().data;
      const current = d.settings.blends.find((b) => b.name === name);
      if (!current) return "Pick a grade blend to edit.";
      const next = { ...current, ...patch, name: (patch.name ?? name).trim() };
      const msg = validateBlend(d, next, name);
      if (msg.length > 0) return msg.join(" ");
      const settings = {
        ...d.settings,
        blends: d.settings.blends.map((b) => (b.name === name ? next : b)),
      };
      const data: Dataset = {
        ...d,
        settings,
        work: d.work.map((w) => (w.grade === name ? { ...w, grade: next.name } : w)),
      };
      commit("Edit grade blend", data, next.name);
      return "";
    },
    removeBlend: (name) => {
      const d = get().data;
      if (!d.settings.blends.some((b) => b.name === name)) return "Pick a grade blend to remove.";
      const used = stillUsed("grade blend", usedBy(d.work.filter((w) => w.grade === name).map((w) => w.title)));
      if (used) return used;
      const blends = d.settings.blends.filter((b) => b.name !== name);
      commit("Remove grade blend", { ...d, settings: { ...d.settings, blends } }, name);
      return "";
    },
    closeQuarter: (force = false) => {
      const d = get().data;
      const today = new Date();
      const quarter = d.settings.quarter;
      const [, qend] = quarterRange(quarter);
      if (!force && today < qend) {
        return {
          done: 0, archived: 0, snapshot: null,
          message: `${quarter} does not end until ${toISO(qend)}. Close it from that date, or force the close.`,
        };
      }
      const marked = markEndedDone(d);
      const snapshot = d.history.some((h) => h.quarter === quarter)
        ? null
        : takeSnapshot(marked.data, today);
      const archived = archiveClosed(
        snapshot ? { ...marked.data, history: [...marked.data.history, snapshot] } : marked.data,
      );
      const data = advanceQuarter(archived.data);
      commit("Close " + quarter, data);
      return {
        done: marked.done,
        archived: archived.archived,
        snapshot,
        message: snapshot
          ? "Snapshot saved to History."
          : `No new snapshot: ${quarter} is already in History.`,
      };
    },
    resetToSeed: () => commit("Reset to seed", { ...seedDataset, log: get().data.log }, "", "Seed"),
    clearSampleData: () => {
      const d = get().data;
      const data: Dataset = {
        ...d,
        work: [],
        absences: [],
        assignments: [],
        benefitActuals: [],
        reservations: [],
        history: [],
        archive: [],
      };
      commit("Clear sample data", data, "", "Empty");
    },
    loadWorkbook: async (file) => {
      const data = await importWorkbookFile(file);
      commit("Load " + file.name, data, "", file.name);
    },
    undo: () => {
      if (!undoStack) return;
      const { data, source, label } = undoStack;
      undoStack = null;
      // the log is the record of what happened, so an undo is another line on it, not a deletion
      const next = logged({ ...data, log: get().data.log }, "Undo: " + label);
      writeSaved(next, source);
      set({ data: next, source, view: quarterView(next), undoLabel: "" });
    },
  };
});

/**
 * A state that leaves the plan keeps the reason it left with it; anything else clears it. A state
 * change carries the phase with it: phaseOf is the rule, and the stored field follows it.
 */
function applyWorkPatch(data: Dataset, item: WorkItem, patch: Partial<WorkItem>): WorkItem {
  const next = { ...item, ...patch };
  if (impactOf(data, next.state) !== "Removed") next.cancelReason = "";
  if (patch.state !== undefined && patch.state !== item.state && patch.phase === undefined) {
    next.phase = phaseOf(next);
  }
  return withSpan(next);
}

/**
 * The sprints are stored twice: span carries them for the engine, startSprint and endSprint for the
 * forms. Every write path goes through here so a row written either way carries both.
 */
function withSpan(item: WorkItem): WorkItem {
  if (typeof item.startSprint === "number") {
    const end = typeof item.endSprint === "number" ? item.endSprint : item.startSprint;
    return { ...item, endSprint: end, span: [item.startSprint, end] };
  }
  if (item.span && item.endSprint === "") {
    return { ...item, startSprint: item.span[0], endSprint: item.span[1] };
  }
  return item;
}

/** One work item, patched in place, with the rules applyWorkPatch keeps. */
function withWork(data: Dataset, title: string, patch: Partial<WorkItem>): Dataset {
  return {
    ...data,
    work: data.work.map((w) => (w.title === title ? applyWorkPatch(data, w, patch) : w)),
  };
}

/** An empty work row: what a converted spike's feature starts from. */
function blankWork(): WorkItem {
  return {
    title: "", kind: "Feature", phase: "", parent: "", epic: "", squad: "", skill: "", size: "",
    priority: "Should", state: "Identified", confidence: "Medium", startSprint: "", endSprint: "",
    assignees: [], assessedBy: "", productOwner: "", jira: "", jiraAlign: "", claimedFTE: null,
    claims: {}, landingMonth: null, landingYear: null, grade: null, proposed: true,
  };
}

/** A Settings list, written back with its cascade left to the caller. */
function withList(data: Dataset, list: ListName, values: string[]): Dataset {
  return { ...data, settings: { ...data.settings, [list]: values } };
}

/** RenameListValue: the new name goes everywhere the workbook's reference ranges point. */
function renameInList(data: Dataset, list: ListName, oldValue: string, newValue: string): Dataset {
  const swap = (v: string): string => (v === oldValue ? newValue : v);
  const next = withList(data, list, listValues(data, list).map(swap));
  switch (list) {
    case "skills":
      return {
        ...next,
        people: next.people.map((p) => ({ ...p, skills: p.skills.map(swap) })),
        work: next.work.map((w) => ({ ...w, skill: swap(w.skill) })),
      };
    case "regions":
      return {
        ...next,
        people: next.people.map((p) => ({ ...p, region: swap(p.region) })),
        bankHolidays: next.bankHolidays.map((b) => ({ ...b, region: swap(b.region) })),
      };
    case "absenceTypes":
      return { ...next, absences: next.absences.map((a) => ({ ...a, type: swap(a.type) })) };
    case "quarters":
      return {
        ...next,
        settings: { ...next.settings, quarter: swap(next.settings.quarter) },
        reservations: next.reservations.map((r) => ({ ...r, quarter: swap(r.quarter) })),
        history: next.history.map((h) => ({ ...h, quarter: swap(h.quarter) })),
        archive: next.archive.map((a) => ({ ...a, quarter: swap(a.quarter) })),
        work: next.work.map((w) => (w.archivedInQuarter === oldValue
          ? { ...w, archivedInQuarter: newValue } : w)),
      };
    case "reservationCategories":
      return {
        ...next,
        reservations: next.reservations.map((r) => ({ ...r, category: swap(r.category) })),
      };
    default:
      return next;
  }
}

/** A reservation names itself by what it holds and who holds it. */
function reservationName(r: Reservation): string {
  return `${r.category} for ${r.squad}`;
}

/** A renamed business grade keeps its count in every blend that holds one. */
function renameCount(blend: GradeBlend, oldName: string, newName: string): GradeBlend {
  if (oldName === newName || !(oldName in blend.counts)) return blend;
  const counts: Record<string, number> = {};
  for (const [grade, count] of Object.entries(blend.counts)) {
    counts[grade === oldName ? newName : grade] = count;
  }
  return { ...blend, counts };
}

/** MarkEndedDone: a counted item whose last sprint is inside the quarter is Done at the close. */
function markEndedDone(data: Dataset, today: Date = new Date()): { data: Dataset; done: number } {
  const ctx = buildContext(data, today);
  const doneState = data.settings.states.find((s) => s.name === "Done")
    ?? data.settings.states.find((s) => s.impact === "Historical");
  if (!doneState) return { data, done: 0 };
  // never the item's own end sprint: that would read every late item as delivered on time, and a
  // quarter closed early cannot stamp a sprint that has not happened yet
  const stamp = Math.min(ctx.lastSprint, ctx.currentSprint);
  let done = 0;
  const work = data.work.map((w) => {
    if (!w.title || !counts(ctx, w) || itemSpan(w)[1] > ctx.lastSprint) return w;
    done += 1;
    return {
      ...w,
      state: doneState.name,
      doneInSprint: w.doneInSprint === undefined ? stamp : w.doneInSprint,
    };
  });
  return { data: { ...data, work }, done };
}

/** SnapshotHistory: the quarter's figures as they stand once the ended items are Done. */
function takeSnapshot(data: Dataset, today: Date = new Date()): HistorySnapshot {
  const ctx = buildContext(data, today);
  const view = compute(data, today);
  return {
    quarter: data.settings.quarter,
    netMW: view.compare.rows.net_capacity.b,
    inPlanMW: view.in_plan.value,
    deliveredMW: view.delivered.value,
    fte: fteClaimed(ctx),
    gbp: gbpInYear(ctx),
    note: "Snapshot " + toISO(today),
  };
}

/** The close's own reading of how an archived item landed. */
function closeStatus(ctx: EngineContext, item: WorkItem): string {
  if (ctx.impact[item.state] === "Removed") return "Cancelled";
  const end = itemSpan(item)[1];
  if (item.doneInSprint === undefined || end < 0) return "Done";
  return item.doneInSprint <= end ? "Done on time" : "Done late";
}

/** The archive pass: delivered and cancelled rows go on the record, each stamped with the quarter. */
function archiveClosed(data: Dataset, today: Date = new Date()): { data: Dataset; archived: number } {
  const ctx = buildContext(data, today);
  const quarter = data.settings.quarter;
  const rows: ArchiveRow[] = [];
  const work = data.work.map((w) => {
    const impact = ctx.impact[w.state];
    const closed = impact === "Historical" || impact === "Removed";
    // the stamp names the quarter a row last went in: a row already on this quarter's record is left alone
    if (!w.title || !closed || w.archivedInQuarter === quarter) return w;
    rows.push({
      quarter,
      id: w.jira,
      title: w.title,
      epic: w.epic,
      squad: w.squad,
      state: w.state,
      assignee: w.assignees[0] ?? "",
      status: closeStatus(ctx, w),
      size: w.size,
      original: w.originalEstimate ?? 0,
      latest: workMW(ctx, w),
      actual: w.actualEffort ?? 0,
    });
    return { ...w, archivedInQuarter: quarter };
  });
  for (const r of reservationRows(ctx)) {
    if (r.quarter !== quarter) continue;
    const already = data.archive.some((a) => a.kind === "Reservation" && a.quarter === quarter
      && a.squad === r.squad && a.title === r.category);
    if (already) continue;
    rows.push({
      quarter,
      id: "",
      title: r.category,
      epic: "",
      squad: r.squad,
      state: "",
      assignee: "",
      status: "Reserved",
      size: "",
      original: 0,
      latest: 0,
      actual: 0,
      kind: "Reservation",
      heldMW: r.mw,
      drawnMW: r.drawn,
      freeMW: r.remaining,
    });
  }
  return {
    data: { ...data, work, archive: [...data.archive, ...rows] },
    archived: rows.length,
  };
}

/** MoveToNextQuarter: the next label on the Quarter list, with the year settings following it. */
function advanceQuarter(data: Dataset): Dataset {
  const quarters = listValues(data, "quarters");
  const at = quarters.indexOf(data.settings.quarter);
  const next = at >= 0 ? quarters[at + 1] : undefined;
  if (!next) return data;
  const year = quarterRange(next)[0].getUTCFullYear();
  const rollover = year !== data.settings.benefitYear || year !== data.settings.timelineYear
    ? { benefitYear: year, timelineYear: year }
    : {};
  return { ...data, settings: { ...data.settings, quarter: next, ...rollover } };
}
