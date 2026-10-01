// The workbook's forms are the validator: AddWork, AddProduct, PlanEngineering, AddPerson, AddSquad
// and AddAbsence in add_vba.ps1. Each function returns the messages that routine would have returned,
// in its own words, and an empty array when the row is good.
import type {
  Absence, Assignment, BenefitActual, Dataset, Financials, GradeBlend, GradeRate, Person,
  Reservation, Settings, Squad, WorkItem, WorkPhase,
} from "../model/types";
import { quarterRange } from "../engine/dates";

export const EMPLOYMENTS = ["Permanent", "NPW", "Open vacancy"];
export const REGIONS = ["England", "Scotland", "Wales", "India"];
export const TEAM_GRADES = ["C", "D", "E", "F"];
export const COMMITMENTS = ["Proposed", "Committed"];
export const KINDS = ["Feature", "Spike", "Component"];
/** SpikeOutcomeList: what a timeboxed spike concluded. */
export const SPIKE_OUTCOMES = ["Feasible", "Not feasible", "More discovery"];
/** IdeaStateList: the states the Product form owns; the Engineering form sets the rest. */
export const IDEA_STATES = ["Identified", "In discovery", "Ready", "Deferred", "Cancelled"];
/** The Work sheet books asg1 to asg3 and no more. */
export const MAX_ASSIGNEES = 3;
/** The benefit claims a work item can carry, keyed by the Benefits column they sit in. */
export const CLAIM_TYPES: [string, string][] = [
  ["T", "Cost avoidance (£M/yr)"],
  ["U", "Cycle-time cut %"],
  ["V", "Error reduction %"],
  ["W", "Throughput (x)"],
  ["X", "Compliance / risk"],
  ["Y", "CX / EX uplift"],
];
/** BenefitTypeNames on Settings: FTE released first, then the claim columns in sheet order. */
export const BENEFIT_TYPES = [
  "FTE released", "Cost avoidance", "Cycle-time cut", "Error reduction", "Throughput",
  "Compliance / risk", "CX / EX uplift",
];
/** The Benefits column a benefit type is claimed in; FTE released is the claimedFTE field. */
export const CLAIM_COLUMN: Record<string, string> = {
  "Cost avoidance": "T", "Cycle-time cut": "U", "Error reduction": "V", "Throughput": "W",
  "Compliance / risk": "X", "CX / EX uplift": "Y",
};
/** The Settings lists a value can be added to, renamed in or removed from. */
export const LISTS = ["skills", "regions", "absenceTypes", "quarters", "reservationCategories"] as const;
export type ListName = (typeof LISTS)[number];
/** What each list is called in a message, and the columns a rename has to follow. */
export const LIST_LABELS: Record<ListName, string> = {
  skills: "skill",
  regions: "region",
  absenceTypes: "absence type",
  quarters: "quarter",
  reservationCategories: "reservation category",
};
/** The Funding column on the Financials cost tables. */
export const FUNDING_LINES = ["Investment", "Non-investment"];
/** The two cost tables on Financials, in sheet order. */
export const COST_LINE_TABLES = ["Licences and subscriptions", "Infrastructure and other"];
/** The squad a reservation held across every squad is filed under. */
export const TEAM_RESERVATION = "Team";
export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const same = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase();

/** The impact the state model gives a state name; "" when the state is not in the model. */
export function impactOf(data: Dataset, state: string): string {
  return data.settings.states.find((s) => s.name === state)?.impact ?? "";
}

export function stateNames(data: Dataset): string[] {
  return data.settings.states.map((s) => s.name);
}

/** The Skill list on Settings. A dataset saved before the list existed falls back to what is in use. */
export function skillList(data: Dataset): string[] {
  const list = data.settings.skills;
  if (Array.isArray(list) && list.length > 0) return [...list];
  const set = new Set<string>();
  for (const p of data.people) for (const s of p.skills) if (s) set.add(s);
  for (const w of data.work) if (w.skill) set.add(w.skill);
  return [...set].sort();
}

/** A Settings list, by name; skills keep their fallback. */
export function listValues(data: Dataset, list: ListName): string[] {
  if (list === "skills") return skillList(data);
  return [...(data.settings[list] ?? [])];
}

/** UsedBy: the first three names using a value, then "and N more", in the workbook's words. */
export function usedBy(names: string[]): string {
  if (names.length === 0) return "";
  const head = names.slice(0, 3).join(", ");
  return names.length > 3 ? `${head} and ${names.length - 3} more` : head;
}

/** StillUsed: the refusal a list value in use is removed with. */
export function stillUsed(what: string, refs: string): string {
  return refs ? `That ${what} is still used by ${refs}. Change those first, then remove it.` : "";
}

/** The rows a list value is used by, in the order the workbook's UsedBy calls read them. */
export function listUsage(data: Dataset, list: ListName, value: string): string[] {
  const hit = (a: string): boolean => same(a, value);
  switch (list) {
    case "skills": {
      const people = data.people.filter((p) => p.skills.some(hit)).map((p) => p.name);
      return people.length > 0 ? people : data.work.filter((w) => hit(w.skill)).map((w) => w.title);
    }
    case "regions": {
      const people = data.people.filter((p) => hit(p.region)).map((p) => p.name);
      return people.length > 0
        ? people
        : data.bankHolidays.filter((b) => hit(b.region)).map((b) => b.name);
    }
    case "absenceTypes":
      return data.absences.filter((a) => hit(a.type)).map((a) => a.person);
    case "quarters": {
      const res = data.reservations.filter((r) => hit(r.quarter)).map((r) => r.squad);
      if (res.length > 0) return res;
      const archived = [
        ...data.archive.filter((a) => hit(a.quarter)).map((a) => a.title),
        ...data.work.filter((w) => hit(w.archivedInQuarter ?? "")).map((w) => w.title),
      ];
      if (archived.length > 0) return archived;
      if (hit(data.settings.quarter)) return ["Settings"];
      return data.history.filter((h) => hit(h.quarter)).map((h) => h.quarter);
    }
    case "reservationCategories":
      return data.reservations.filter((r) => hit(r.category)).map((r) => r.squad);
    default:
      return [];
  }
}

/** AddWork, with the Product and Engineering forms' own extra rules on top. */
export function validateWork(data: Dataset, item: WorkItem, originalTitle?: string): string[] {
  const msg: string[] = [];
  const title = item.title.trim();
  if (!title) msg.push("Title is required.");
  if (data.work.some((w) => same(w.title, title) && (!originalTitle || !same(w.title, originalTitle)))) {
    msg.push("A work item with that title already exists.");
  }
  if (!stateNames(data).includes(item.state)) msg.push("Pick a state.");
  if (!COMMITMENTS.includes(item.proposed ? "Proposed" : "Committed")) {
    msg.push("Commitment must be Proposed or Committed.");
  }
  if (item.kind && !KINDS.includes(item.kind)) msg.push("Kind is Feature, Spike or Component.");
  if (item.squad && !data.squads.some((s) => s.name === item.squad)) msg.push("Unknown squad.");
  if (item.skill && !skillList(data).includes(item.skill)) msg.push("Unknown skill.");
  if (item.size && !Object.keys(data.settings.sizes).includes(item.size)) msg.push("Unknown size.");
  if (typeof item.startSprint === "number" && item.startSprint < 1) {
    msg.push("Start sprint must be a sprint number (see Sprint plan).");
  }
  if (typeof item.endSprint === "number" && item.endSprint < 1) {
    msg.push("End sprint must be a sprint number (see Sprint plan).");
  }
  if (typeof item.startSprint === "number" && typeof item.endSprint === "number"
    && item.endSprint < item.startSprint) {
    msg.push("End sprint is before start sprint.");
  }
  if (item.assignees.length > MAX_ASSIGNEES) {
    msg.push("Up to three assignees: the Work sheet books asg1 to asg3.");
  }
  for (const name of item.assignees) {
    if (name && !data.people.some((p) => p.name === name)) {
      msg.push(`${name} is not on the People sheet.`);
    }
  }
  if (item.productOwner && !data.people.some((p) => p.name === item.productOwner)) {
    msg.push("Product owner is not on the People sheet.");
  }
  if (item.assessedBy && !data.people.some((p) => p.name === item.assessedBy)) {
    msg.push("Assessed by is not on the People sheet.");
  }
  const landed = Boolean(item.landingMonth) && item.landingYear !== null;
  if (item.claimedFTE !== null && item.claimedFTE > 0) {
    if (!landed) msg.push("FTE released needs a landing month and year (e.g. Nov 2026).");
    if (!item.grade || !data.settings.grades.some((g) => g.grade === item.grade)) {
      msg.push("FTE released needs a business grade.");
    }
  }
  if (!landed && Object.values(item.claims).some((v) => v)) msg.push("A benefit needs a landing month.");
  if (item.dependsOn) {
    if (!data.work.some((w) => w.title === item.dependsOn)) {
      msg.push("Depends on must be another item on the Work sheet.");
    }
    if (same(item.dependsOn, title)) msg.push("An item cannot depend on itself.");
  }
  if (item.parent) {
    const parent = data.work.find((w) => w.title === item.parent);
    if (!parent) msg.push("Part of: that feature is not on the Work sheet.");
    else if (parent.kind === "Component") msg.push("The parent must be a feature, not a component.");
    else if (parent.parent) msg.push("That feature is itself under a parent: components nest one level only.");
    if (same(item.parent, title)) msg.push("A component cannot be its own parent.");
  }
  return msg;
}

/** The Engineering form's extra rules: it is the form that sizes and schedules the work. */
export function validateEngineering(data: Dataset, item: WorkItem, originalTitle?: string): string[] {
  const msg = validateWork(data, item, originalTitle);
  if (!item.size && item.sizeOverride === undefined) msg.push("Give a size or an MW override.");
  if (item.sizeOverride !== undefined && item.sizeOverride < 0) {
    msg.push("MW override must be 0 or more member weeks.");
  }
  if (impactOf(data, item.state) === "Removed" && !(item.cancelReason ?? "").trim()) {
    msg.push("A cancelled item needs a cancellation reason.");
  }
  return msg;
}

/** The Product form's extra rules: kind, and the cancellation reason. */
export function validateProduct(data: Dataset, item: WorkItem, originalTitle?: string): string[] {
  const msg = validateWork(data, item, originalTitle);
  if (item.kind !== "Feature" && item.kind !== "Spike") {
    msg.push("Kind is Feature or Spike; a component is added from the Engineering form.");
  }
  if (!IDEA_STATES.includes(item.state)) {
    msg.push("A feature or spike here is Identified, In discovery, Ready, Deferred or Cancelled. "
      + "The Engineering form sets the rest.");
  }
  if (item.parent && item.kind !== "Spike") msg.push("Only a spike is part of a feature.");
  if (impactOf(data, item.state) === "Removed" && !(item.cancelReason ?? "").trim()) {
    msg.push("A cancelled item needs a cancellation reason.");
  }
  return msg;
}

/** A stage action the lifecycle offers on an item: its id, the words on the button, the state it moves to. */
export interface StageAction {
  id: string;
  label: string;
  to?: string;
}

/**
 * The phase a state puts an item in. This is the single rule: the stored phase field follows it.
 *   Identified, In discovery            Shaping
 *   Ready                               Assessment
 *   In development                      Delivery
 *   Released, In validation, Done       Release
 *   Deferred, Cancelled                 the phase the item was last in, else Shaping
 * Anything else keeps its stored phase, and an item with none is still being shaped.
 */
export function phaseOf(item: WorkItem): WorkPhase {
  switch (item.state) {
    case "Identified":
    case "In discovery":
      return "Shaping";
    case "Ready":
      return "Assessment";
    case "In development":
      return "Delivery";
    case "Released":
    case "In validation":
    case "Done":
      return "Release";
    default:
      return item.phase || "Shaping";
  }
}

/**
 * The stage actions available on an item, in the order a page offers them. The transitions:
 *   conclude           Spike                          records the outcome and findings; state unchanged
 *   convert            Spike, Feasible, not converted writes a Feature beside it; the spike goes Done
 *   assess             Feature in Shaping with a size to Ready
 *   sendToAssessment   Feature in Shaping with no size to Ready, once the Product form passes; the
 *                                                     size is set during assessment
 *   commit             Ready                          commitment Committed; state unchanged
 *   defer              Ready                          to Deferred
 *   release            In development                 to Released
 *   validate           Released                       to In validation
 *   done               In validation                  to Done
 *   cancel             any                            to Cancelled, with a reason
 */
export function nextActions(data: Dataset, item: WorkItem): StageAction[] {
  const actions: StageAction[] = [];
  if (item.kind === "Spike") {
    actions.push({ id: "conclude", label: "Conclude" });
    if (item.spikeOutcome === "Feasible" && !item.convertedTo) {
      actions.push({ id: "convert", label: "Convert to a feature" });
    }
  }
  if (item.kind === "Feature" && phaseOf(item) === "Shaping") {
    const sized = Boolean(item.size) || item.sizeOverride !== undefined;
    actions.push(sized
      ? { id: "assess", label: "Send for assessment", to: "Ready" }
      : { id: "sendToAssessment", label: "Send for assessment", to: "Ready" });
  }
  switch (item.state) {
    case "Ready":
      actions.push({ id: "commit", label: "Commit" });
      actions.push({ id: "defer", label: "Defer", to: "Deferred" });
      break;
    case "In development":
      actions.push({ id: "release", label: "Release", to: "Released" });
      break;
    case "Released":
      actions.push({ id: "validate", label: "Validate", to: "In validation" });
      break;
    case "In validation":
      actions.push({ id: "done", label: "Mark done", to: "Done" });
      break;
    default:
      break;
  }
  if (impactOf(data, item.state) !== "Removed") {
    actions.push({ id: "cancel", label: "Cancel", to: "Cancelled" });
  }
  return actions;
}

export function validatePerson(data: Dataset, person: Person, originalName?: string): string[] {
  const msg: string[] = [];
  const name = person.name.trim();
  if (!name) msg.push("Name is required (leave it blank only for an open vacancy with a squad: it names itself).");
  if (data.people.some((p) => same(p.name, name) && (!originalName || !same(p.name, originalName)))) {
    msg.push("That name is already on the People sheet.");
  }
  if (!data.squads.some((s) => s.name === person.squad)) {
    msg.push("Pick a squad (add it on Squads first if it is new).");
  }
  if (!listValues(data, "regions").includes(person.region)) msg.push("Pick a region.");
  if (person.employment && !EMPLOYMENTS.includes(person.employment)) {
    msg.push("Employment must be Permanent, NPW or Open vacancy.");
  }
  if (!person.skills[0] || !skillList(data).includes(person.skills[0])) {
    msg.push("Pick a primary skill.");
  }
  for (const skill of person.skills.slice(1)) {
    if (skill && !skillList(data).includes(skill)) msg.push(`${skill} is not in the skill list.`);
  }
  if (person.grade && !TEAM_GRADES.includes(person.grade)) msg.push("Grade must be C, D, E or F.");
  if (person.daysPerWeek !== undefined && (person.daysPerWeek <= 0 || person.daysPerWeek > 5)) {
    msg.push("Days per week must be a number between 0 and 5.");
  }
  if (person.startDate && person.endDate && person.endDate < person.startDate) {
    msg.push("End date is before start date.");
  }
  return msg;
}

export function validateSquad(data: Dataset, squad: Squad, originalName?: string): string[] {
  const msg: string[] = [];
  const name = squad.name.trim();
  if (!name) msg.push("Squad name is required.");
  if (data.squads.some((s) => same(s.name, name) && (!originalName || !same(s.name, originalName)))) {
    msg.push("That squad already exists.");
  }
  if (!squad.colour.trim()) msg.push("Pick a palette colour.");
  return msg;
}

export function validateAbsence(data: Dataset, absence: Absence): string[] {
  const msg: string[] = [];
  if (!data.people.some((p) => p.name === absence.person)) msg.push("Pick a person from the People sheet.");
  if (!listValues(data, "absenceTypes").includes(absence.type.trim())) msg.push("Pick an absence type.");
  if (!absence.from || !absence.to) msg.push("From and To dates are required.");
  else if (absence.to < absence.from) msg.push("To is before From.");
  return msg;
}

/** A typed booking on Assignments: the person, the item, the type of booking and the span it runs. */
export function validateAssignment(data: Dataset, assignment: Assignment): string[] {
  const msg: string[] = [];
  if (!data.people.some((p) => p.name === assignment.person)) msg.push("Pick a person from the People sheet.");
  if (!data.work.some((w) => w.title === assignment.item)) msg.push("Pick a work item from the Work sheet.");
  if (!assignment.type.trim()) msg.push("Booking type is required.");
  if (!assignment.from || !assignment.to) {
    msg.push("From and To dates are required.");
  } else if (assignment.to < assignment.from) {
    msg.push("To is before From.");
  } else {
    // The booking has to start in a year Waypoint knows; where it ends is its own business.
    const start = assignment.from.slice(0, 4);
    if (!knownYears(data).includes(Number(start))) {
      msg.push(`${start} is not a year Waypoint knows: pick a date inside the Quarter list.`);
    }
  }
  return msg;
}

/** AddReservation: the squad, the quarter, the category and the MW held. */
export function validateReservation(data: Dataset, res: Reservation, index = -1): string[] {
  const msg: string[] = [];
  const squads = [TEAM_RESERVATION, ...data.squads.map((s) => s.name)];
  if (!squads.includes(res.squad.trim())) {
    msg.push("Pick a squad from the Squads sheet, or Team for a reservation held across all of them.");
  }
  if (!listValues(data, "quarters").includes(res.quarter.trim())) {
    msg.push("Pick a quarter from the Quarter list on Settings.");
  }
  if (!listValues(data, "reservationCategories").includes(res.category.trim())) {
    msg.push("Pick a category from the Reservation category list on Settings.");
  }
  if (typeof res.mw !== "number" || Number.isNaN(res.mw)) msg.push("MW reserved is required.");
  else if (res.mw < 0) msg.push("MW reserved is zero or more.");
  const pair = (c: string): boolean => same(c, "Discovery") || same(c, "Spikes");
  data.reservations.forEach((r, i) => {
    if (i === index) return;
    if (same(r.squad, res.squad) && same(r.quarter, res.quarter) && same(r.category, res.category)) {
      msg.push(`${res.squad} already reserves ${res.category} for ${res.quarter}: `
        + "edit that row instead of adding a second one.");
    } else if (pair(res.category) && pair(r.category)
      && same(r.squad, res.squad) && same(r.quarter, res.quarter)) {
      msg.push("Discovery and Spikes draw on the same spike MW: "
        + `${res.squad} already holds one of the pair for ${res.quarter}, so edit that row instead.`);
    }
  });
  return msg;
}

/** The years a benefit can land in: the Quarter list, with the benefit and timeline years. */
export function knownYears(data: Dataset): number[] {
  const years = new Set<number>([data.settings.benefitYear, data.settings.timelineYear]);
  for (const q of listValues(data, "quarters")) {
    const year = Number(q.slice(-4));
    if (year) years.add(year);
  }
  return [...years].sort();
}

/** RecordActual: the claim it is an actual of, and the month it landed in. */
export function validateBenefitActual(data: Dataset, actual: BenefitActual, index = -1): string[] {
  const msg: string[] = [];
  const item = data.work.find((w) => w.title === actual.title);
  if (!item) msg.push("Pick a work item from the Work sheet.");
  if (!BENEFIT_TYPES.includes(actual.type)) msg.push("Pick a benefit type.");
  if (item && BENEFIT_TYPES.includes(actual.type)) {
    const claimed = actual.type === "FTE released"
      ? Boolean(item.claimedFTE)
      : Boolean(item.claims[CLAIM_COLUMN[actual.type]]);
    if (!claimed) {
      msg.push(`That work item does not claim ${actual.type}. `
        + "Add the benefit on the Work sheet first (edit the work item).");
    }
  }
  const clash = data.benefitActuals.some((a, i) => i !== index
    && a.title === actual.title && a.type === actual.type);
  if (clash) msg.push("An actual is already recorded for that claim: edit it instead.");
  if (actual.value === "" || actual.value === null) msg.push("Actual is required.");
  const when = monthDate(actual.when);
  if (!when) msg.push("When is required: a month, as a date (e.g. 2026-11-01).");
  else if (!knownYears(data).includes(when.getUTCFullYear())) {
    msg.push(`${when.getUTCFullYear()} is not a year Waypoint knows: pick a month inside the Quarter list.`);
  }
  return msg;
}

/** The month a benefit landed in, or null when the text is not a date. */
function monthDate(when: string): Date | null {
  if (!when) return null;
  const d = new Date(`${when.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** EditSettings: every value on the left of Settings, in the order the form asks for them. */
export function validateSettings(data: Dataset, patch: Partial<Settings>): string[] {
  const msg: string[] = [];
  const next = { ...data.settings, ...patch };
  if (!next.epoch) msg.push("Sprint 1 started is required.");
  if (!Number.isFinite(next.sprintDays) || next.sprintDays < 1) {
    msg.push("Sprint length must be a day or more.");
  }
  if (patch.quarter !== undefined && !listValues(data, "quarters").includes(patch.quarter)) {
    msg.push("Pick a quarter from the Quarter list on Settings.");
  }
  const [qstart, qend] = quarterRange(next.quarter);
  if (Number.isNaN(qstart.getTime()) || Number.isNaN(qend.getTime()) || qend < qstart) {
    msg.push("The quarter does not read as a quarter (e.g. Q4 2026).");
  }
  const pct = (value: number, label: string, lo: number, hi: number): void => {
    if (!Number.isFinite(value) || value < lo || value > hi) {
      msg.push(`${label} must be between ${Math.round(lo * 100)}% and ${Math.round(hi * 100)}%.`);
    }
  };
  pct(next.defaultModifier, "Default modifier", 0, 0.95);
  pct(next.leadModifier, "Lead modifier", 0, 0.95);
  pct(next.utilisationWarn, "Amber utilisation", 0, 1);
  pct(next.utilisationBad, "Red utilisation", 0, 1);
  if (next.utilisationBad <= next.utilisationWarn) msg.push("Red utilisation must be above amber.");
  pct(next.reliabilityWarn, "Low confidence", 0, 0.95);
  pct(next.reliabilityBad, "Medium confidence", 0, 0.95);
  if (next.reliabilityBad <= next.reliabilityWarn) {
    msg.push("Medium confidence must be above low confidence.");
  }
  if (next.logAbsences !== "Yes" && next.logAbsences !== "No") {
    msg.push("Deduct absences must be Yes or No.");
  }
  const years: [number, string][] = [
    [next.benefitYear, "Benefit year"], [next.timelineYear, "Timeline year"],
  ];
  for (const [year, label] of years) {
    if (!Number.isFinite(year) || year < 2020 || year > 2040) {
      msg.push(`${label} must be between 2020 and 2040.`);
    }
  }
  if (!Number.isFinite(next.fteTarget) || next.fteTarget < 0) {
    msg.push("Target FTE released must be a number.");
  }
  if (!Number.isFinite(next.gbpTarget) || next.gbpTarget < 0) {
    msg.push("Target GBP benefit must be a number.");
  }
  if (!next.organisation.trim()) msg.push("Team / organisation is required.");
  if (!next.owner.trim()) msg.push("Prepared by is required.");
  const urls: [string, string][] = [
    [next.jiraAlignBase, "Jira Align base URL"], [next.jiraBase, "Jira base URL"],
  ];
  for (const [url, label] of urls) {
    if (url.trim() && !url.trim().toLowerCase().startsWith("http")) {
      msg.push(`${label} must start with http.`);
    }
  }
  if (patch.quarters && patch.quarters.length === 0) msg.push("The Quarter list cannot be empty.");
  return msg;
}

/** The outcome an epic serves; "" when no outcome on Settings names it. */
export function outcomeOfEpic(data: Dataset, epic: string): string {
  return data.settings.outcomes.find((o) => o.epics.some((e) => same(e, epic)))?.name ?? "";
}

/** Every epic the Outcome table names, with the epics the work is already filed under. */
export function epicNames(data: Dataset): string[] {
  const set = new Set<string>();
  for (const o of data.settings.outcomes) for (const e of o.epics) if (e) set.add(e);
  for (const w of data.work) if (w.epic) set.add(w.epic);
  return [...set].sort((a, b) => a.localeCompare(b, "en-GB"));
}

/** The work an outcome is claimed by: the items on the epics that serve it. */
export function outcomeUsage(data: Dataset, name: string): string[] {
  const outcome = data.settings.outcomes.find((o) => same(o.name, name));
  if (!outcome) return [];
  return data.work.filter((w) => outcome.epics.some((e) => same(e, w.epic))).map((w) => w.title);
}

/** EditTeamGradeCosts and the Financials cost tables: names, funding and the money on each line. */
export function validateFinancials(data: Dataset, patch: Partial<Financials>): string[] {
  const msg: string[] = [];
  const next = { ...data.settings.financials, ...patch };
  const grades: string[] = [];
  for (const row of next.teamGradeCosts) {
    const grade = row.grade.trim();
    if (!grade) msg.push("Team grade is required.");
    else if (grades.some((g) => same(g, grade))) {
      msg.push(`${grade} is on the team grade table twice.`);
    } else grades.push(grade);
    if (!Number.isFinite(row.annualCost) || row.annualCost < 0) {
      msg.push(`Annual cost for ${grade || "a team grade"} must be 0 or more.`);
    }
  }
  const names: string[] = [];
  for (const row of next.costLines) {
    const name = row.name.trim();
    if (!name) msg.push("A cost line needs an item name.");
    else if (names.some((n) => same(n, name))) msg.push(`${name} is on Financials twice.`);
    else names.push(name);
    if (!FUNDING_LINES.includes(row.fundingLine)) msg.push("Funding is Investment or Non-investment.");
    if (!Number.isFinite(row.annual) || row.annual < 0) {
      msg.push(`Annual £ for ${name || "a cost line"} must be 0 or more.`);
    }
  }
  if (next.estateBaseline !== undefined
    && (!Number.isFinite(next.estateBaseline) || next.estateBaseline < 0)) {
    msg.push("Baseline value in-year must be 0 or more.");
  }
  return msg;
}

/** AddBusinessGrade: the name, and the money behind it. */
export function validateGrade(data: Dataset, grade: GradeRate, originalName?: string): string[] {
  const msg: string[] = [];
  const name = grade.grade.trim();
  if (!name) msg.push("Business grade is required.");
  const clash = data.settings.grades
    .some((g) => same(g.grade, name) && (!originalName || !same(g.grade, originalName)));
  if (clash) msg.push("That business grade is already on Settings.");
  if (data.settings.blends.some((b) => same(b.name, name))) {
    msg.push("That name is already a grade blend.");
  }
  if (!Number.isFinite(grade.rate) || grade.rate < 0 || grade.rate > 10000000) {
    msg.push("GBP per FTE must be between 0 and 10,000,000.");
  }
  return msg;
}

/** AddGradeBlend: the name, and one count per business grade. */
export function validateBlend(data: Dataset, blend: GradeBlend, originalName?: string): string[] {
  const msg: string[] = [];
  const name = blend.name.trim();
  if (!name) msg.push("Blend name is required.");
  const clash = data.settings.blends
    .some((b) => same(b.name, name) && (!originalName || !same(b.name, originalName)));
  if (clash) msg.push("That blend is already on Settings.");
  if (data.settings.grades.some((g) => same(g.grade, name))) {
    msg.push("That name is already a business grade.");
  }
  let total = 0;
  for (const [grade, count] of Object.entries(blend.counts)) {
    if (!data.settings.grades.some((g) => g.grade === grade)) {
      msg.push(`${grade} is not a business grade on Settings.`);
    } else if (!Number.isFinite(count) || count < 0) {
      msg.push(`Count for ${grade} cannot be negative.`);
    } else total += count;
  }
  if (total <= 0) msg.push("A blend needs at least one count above zero.");
  return msg;
}

/** BlendRate: the weighted average of the business grades in the mix. */
export function blendRate(data: Dataset, blend: GradeBlend): number {
  let heads = 0;
  let money = 0;
  for (const [grade, count] of Object.entries(blend.counts)) {
    const rate = data.settings.grades.find((g) => g.grade === grade)?.rate ?? 0;
    heads += count;
    money += count * rate;
  }
  return heads === 0 ? 0 : money / heads;
}
