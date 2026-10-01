// The Waypoint domain, typed once. The workbook is one source of this model; the seed is another.

export type Region = "England" | "Scotland" | "Wales" | "India" | string;
export type Employment = "Permanent" | "NPW" | "Open vacancy" | string;
export type Skill = string;
export type Grade = string;

export interface GradeRate {
  grade: Grade;
  rate: number;
}

/** A named mix of grades: the rate is the weighted average of the grades in it. */
export interface GradeBlend {
  name: string;
  counts: Record<Grade, number>;
}

export interface Person {
  name: string;
  role: string;
  grade: Grade;
  squad: string;
  region: Region;
  employment: Employment;
  lead: boolean;
  skills: Skill[];
  /** Workday's Core ID and File ID, and the addresses an export identifies the person by. */
  coreId?: string;
  fileId?: string;
  email?: string;
  jiraAccountId?: string;
  daysPerWeek?: number;
  modifierOverride?: number;
  startDate?: string;
  endDate?: string;
}

export interface Squad {
  name: string;
  lead: string;
  remit: string;
  colour: string;
}

export type WorkKind = "Feature" | "Spike" | "Component";
export type WorkPhase = "Shaping" | "Assessment" | "Delivery" | "Release" | "Validated" | "Stopped" | "";
export type Commitment = "Proposed" | "Committed";
/** What a spike concluded: the Spike outcome list, with "" for a spike still running. */
export type SpikeOutcome = "Feasible" | "Not feasible" | "More discovery" | "";
export type CapacityImpact = "None" | "Reserved" | "Allocated" | "Consumed" | "Historical" | "Hold" | "Removed";

export interface StateRow {
  name: string;
  jiraAlign: string;
  impact: CapacityImpact;
  note: string;
}

export interface WorkItem {
  title: string;
  kind: WorkKind;
  phase: WorkPhase;
  parent: string;
  epic: string;
  squad: string;
  skill: Skill;
  size: string;
  /** A typed total MW that replaces the size band. */
  sizeOverride?: number;
  priority: string;
  state: string;
  confidence: string;
  startSprint: number | "";
  endSprint: number | "";
  /** Absolute sprint numbers, once the seed's quarter offset is applied. */
  span?: [number, number];
  assignees: string[];
  assessedBy: string;
  productOwner: string;
  jira: string;
  jiraAlign: string;
  /** FTE released: the primary benefit. */
  claimedFTE: number | null;
  /** Other claims, keyed by the Benefits column they sit in. */
  claims: Record<string, number>;
  landingMonth: string | null;
  landingYear: number | null;
  grade: Grade | null;
  proposed: boolean;
  /** Why a cancelled item was stopped: the workbook will not remove an item without one. */
  cancelReason?: string;
  /** Why a stopped item was stopped: Stop will not take an item without one. Cleared on Reopen. */
  stoppedReason?: string;
  /** The day it stopped, where one was stamped; the engine falls back to its last activity. */
  stoppedOn?: string;
  /** When every benefit claim had an actual and the item was validated. */
  validatedOn?: string;
  originalEstimate?: number;
  actualEffort?: number;
  doneInSprint?: number;
  dependsOn?: string;
  /** The quarter this row last went on the Archive: the close stamps it, and reads it as its own guard. */
  archivedInQuarter?: string;
  /** The question a spike is timeboxed to answer, and the sprints it is given to answer it in. */
  question?: string;
  timeboxSprints?: number;
  /** What the spike concluded, and what it found. */
  spikeOutcome?: SpikeOutcome;
  findings?: string;
  /** The feature a feasible spike became, and the spike a feature came out of. */
  convertedTo?: string;
  convertedFrom?: string;
  notes?: string;
}

export interface Absence {
  person: string;
  type: string;
  from: string;
  to: string;
  note: string;
}

/** A typed booking: work, or the non-work a person is really doing. */
export interface Assignment {
  person: string;
  item: string;
  type: string;
  from: string;
  to: string;
  label: string;
}

export interface BenefitActual {
  title: string;
  type: string;
  value: number | string;
  when: string;
  note: string;
}

export interface Reservation {
  /** A squad name, or "Team" for capacity held across every squad. */
  squad: string;
  quarter: string;
  category: string;
  mw: number;
  note: string;
}

export interface HistorySnapshot {
  quarter: string;
  netMW: number;
  inPlanMW: number;
  deliveredMW: number;
  fte: number;
  gbp: number;
  note: string;
}

export interface ArchiveRow {
  quarter: string;
  id: string;
  title: string;
  epic: string;
  squad: string;
  state: string;
  assignee: string;
  status: string;
  size: string;
  original: number;
  latest: number;
  actual: number;
  /** "Work" when the row records a work item's close, "Reservation" when it records a held reservation. */
  kind?: "Work" | "Reservation";
  heldMW?: number;
  drawnMW?: number;
  freeMW?: number;
}

export interface BankHoliday {
  region: Region;
  date: string;
  name: string;
}

/** A team grade's blended annual cost: the Team grades table on Financials. */
export interface TeamGradeCost {
  grade: Grade;
  annualCost: number;
}

/** A line on the Licences or Infrastructure table on Financials. */
export interface CostLine {
  name: string;
  /** The table it sits on: "Licences and subscriptions" or "Infrastructure and other". */
  costLine: string;
  /** The workbook's Funding column: Investment or Non-investment. */
  fundingLine: string;
  annual: number;
}

/** The Financials sheet's typed tables: what people, licences and infrastructure cost. */
export interface Financials {
  teamGradeCosts: TeamGradeCost[];
  costLines: CostLine[];
  /** Baseline value in-year: what the Estate table says the live automations are worth. */
  estateBaseline?: number;
}

/** An outcome on Settings, with the epics that serve it. One epic serves one outcome. */
export interface Outcome {
  name: string;
  epics: string[];
  jiraAlignKey?: string;
}

export interface Settings {
  quarter: string;
  epoch: string;
  sprintDays: number;
  defaultModifier: number;
  leadModifier: number;
  logAbsences: "Yes" | "No" | string;
  mwDays: number;
  benefitYear: number;
  timelineYear: number;
  fteTarget: number;
  gbpTarget: number;
  utilisationWarn: number;
  utilisationBad: number;
  reliabilityWarn: number;
  reliabilityBad: number;
  rankBy: string;
  organisation: string;
  owner: string;
  jiraAlignBase: string;
  jiraBase: string;
  weeks: number;
  /** The Settings lists, each a column block on the Settings sheet. */
  skills: Skill[];
  regions: Region[];
  absenceTypes: string[];
  quarters: string[];
  reservationCategories: string[];
  sizes: Record<string, number>;
  grades: GradeRate[];
  blends: GradeBlend[];
  states: StateRow[];
  /** The Outcome table on Settings, each outcome holding the epics that serve it. */
  outcomes: Outcome[];
  /** The typed tables on Financials. */
  financials: Financials;
}

/** One line on the workbook's Log sheet: what was done, to what, by whom and when. */
export interface LogEntry {
  at: string;
  label: string;
  summary: string;
  user: string;
}

export interface Dataset {
  settings: Settings;
  people: Person[];
  squads: Squad[];
  work: WorkItem[];
  absences: Absence[];
  assignments: Assignment[];
  benefitActuals: BenefitActual[];
  reservations: Reservation[];
  history: HistorySnapshot[];
  archive: ArchiveRow[];
  bankHolidays: BankHoliday[];
  /** The audit trail, oldest first; absent on a dataset saved before it existed. */
  log?: LogEntry[];
}
