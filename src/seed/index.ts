// The seed the workbook ships with, mapped onto the model. seed.json is dumped from the generator's
// own seed rows (flightdeck/waypoint-generator, parts 1-5); see _origin inside the file.
import type {
  Absence, ArchiveRow, Assignment, BankHoliday, BenefitActual, CostLine, Dataset, Financials,
  GradeBlend, GradeRate, HistorySnapshot, Outcome, Person, Reservation, Settings, Squad, StateRow,
  TeamGradeCost, WorkItem, WorkKind, WorkPhase,
} from "../model/types";
import raw from "./seed.json";

type Row = (string | number | boolean | null)[];
const s = (v: unknown): string => (v == null ? "" : String(v));
const n = (v: unknown): number => (typeof v === "number" ? v : 0);

const seed = raw as unknown as {
  roster: Row[]; tweaks: Record<string, { N?: number; Q?: number }>; seed_squads: Row[];
  seed_abs: Row[]; seed_asg: Row[]; seed_work: Row[]; seed_res: Row[]; seed_hist: Row[];
  seed_arc: Row[]; seed_act: Row[]; BH: Row[]; overrides: Record<string, number>;
  STATE_ROWS: Row[]; SIZE_MW: Record<string, number>; SEED_PROPOSED: string[];
  SEED_PARENT: Record<string, string>; SEED_KIND: Record<string, string>;
  SEED_PHASE: Record<string, string>; SEED_SPAN: Record<string, [number, number]>;
  SEED_DONE: Record<string, number>; SEED_ACTUAL: Record<string, number>;
  SEED_ASG2: Record<string, string>; SEED_LAND_YEAR: Record<string, number>;
  SEED_BEN: Record<string, Record<string, number>>; SEED_PO: Record<string, string>;
  SEED_DEP: Record<string, string>;
  SKILLS: string[];
  settings: {
    values: Record<string, string | number>; grades: [string | null, number | null][];
    blends: (string | number | null)[][]; sizes: [string | null, number | null][];
  };
  constants: Record<string, number | string>;
  _origin: { source: string; generated: string };
};

/** The quarter offset the seed's relative sprint numbers are written against. */
const SPAN_OFFSET = 19;

const gradeRates: GradeRate[] = seed.settings.grades
  .filter((g) => g[0] != null)
  .map((g) => ({ grade: s(g[0]), rate: n(g[1]) }));

const gradeNames = seed.settings.grades.map((g) => s(g[0]));

const blends: GradeBlend[] = seed.settings.blends
  .filter((b) => b[0] != null)
  .map((b) => {
    const counts: Record<string, number> = {};
    gradeNames.forEach((g, i) => {
      if (g) counts[g] = n(b[i + 1]);
    });
    return { name: s(b[0]), counts };
  });

const sizes: Record<string, number> = {};
for (const [name, mw] of seed.settings.sizes) if (name != null) sizes[s(name)] = n(mw);

const states: StateRow[] = seed.STATE_ROWS.map((r) => ({
  name: s(r[0]), jiraAlign: s(r[1]), impact: s(r[2]) as StateRow["impact"], note: s(r[3]),
}));

/** The Settings list blocks the generator writes beside the values (part1_base.py, list_block). */
const REGION_LIST = ["England", "Scotland", "India", "Wales", "Other"];
const ABSENCE_TYPE_LIST = ["Leave", "Training", "Sickness", "Other"];
const RESERVATION_CATEGORY_LIST = [
  "Discovery", "Shaping and refinement", "Spikes", "BAU", "Service", "Sustain and optimise",
  "Planning", "Other",
];
const QUARTER_LIST = Array.from({ length: 12 }, (_, i) => `Q${(i % 4) + 1} ${2026 + Math.floor(i / 4)}`);

/** The Outcome and Epic tables on Settings (part1_base.py, OUTCOMES and EPICS). */
const OUTCOME_LIST: Outcome[] = [
  { name: "Cut cost to serve", epics: ["Finance ops automation", "Service"] },
  { name: "Fewer errors and rework", epics: ["Reconciliation", "Payments"] },
  { name: "Faster customer onboarding", epics: ["Customer onboarding"] },
  { name: "Better customer experience", epics: ["Proactive comms"] },
  { name: "Resilient platform", epics: ["Platform"] },
  { name: "Trusted data", epics: ["Data"] },
];

/** Team grades: blended annual cost, the typed table on Financials (part5_dash.py). */
const TEAM_GRADE_COSTS: TeamGradeCost[] = [
  { grade: "C", annualCost: 48000 },
  { grade: "D", annualCost: 62000 },
  { grade: "E", annualCost: 80000 },
  { grade: "F", annualCost: 105000 },
];

/** The Licences and Infrastructure tables on Financials, with the funding each line sits on. */
const COST_LINE_ROWS: CostLine[] = [
  { name: "Blue Prism enterprise licences", costLine: "Licences and subscriptions", fundingLine: "Non-investment", annual: 180000 },
  { name: "Power Platform premium (per user)", costLine: "Licences and subscriptions", fundingLine: "Non-investment", annual: 42000 },
  { name: "AI platform credits", costLine: "Licences and subscriptions", fundingLine: "Investment", annual: 60000 },
  { name: "Document AI (OCR)", costLine: "Licences and subscriptions", fundingLine: "Investment", annual: 35000 },
  { name: "Virtual machines and storage", costLine: "Infrastructure and other", fundingLine: "Non-investment", annual: 48000 },
  { name: "Monitoring and support tooling", costLine: "Infrastructure and other", fundingLine: "Non-investment", annual: 12000 },
  { name: "Training and certification", costLine: "Infrastructure and other", fundingLine: "Investment", annual: 15000 },
  { name: "Contractor uplift (NPW premium)", costLine: "Infrastructure and other", fundingLine: "Non-investment", annual: 30000 },
];

const financials: Financials = {
  teamGradeCosts: TEAM_GRADE_COSTS,
  costLines: COST_LINE_ROWS,
};

const v = seed.settings.values;
export const settings: Settings = {
  quarter: s(v["5"]),
  epoch: s(v["9"]),
  sprintDays: n(v["10"]),
  defaultModifier: n(v["13"]),
  leadModifier: n(v["14"]),
  logAbsences: s(v["15"]),
  utilisationWarn: n(v["16"]),
  utilisationBad: n(v["17"]),
  mwDays: n(v["18"]),
  benefitYear: n(v["19"]),
  fteTarget: n(v["20"]),
  gbpTarget: n(v["21"]),
  rankBy: s(v["22"]),
  organisation: s(v["23"]),
  owner: s(v["24"]),
  timelineYear: n(v["25"]),
  reliabilityWarn: n(v["26"]),
  reliabilityBad: n(v["27"]),
  jiraAlignBase: s(v["29"]),
  jiraBase: s(v["30"]),
  weeks: n(seed.constants.NWK),
  skills: [...seed.SKILLS],
  regions: REGION_LIST,
  absenceTypes: ABSENCE_TYPE_LIST,
  quarters: QUARTER_LIST,
  reservationCategories: RESERVATION_CATEGORY_LIST,
  sizes,
  grades: gradeRates,
  blends,
  states,
  outcomes: OUTCOME_LIST,
  financials,
};

export const people: Person[] = seed.roster.map((r) => {
  const tw = seed.tweaks[s(r[0])] ?? {};
  return {
    name: s(r[0]), role: s(r[1]), grade: s(r[2]), squad: s(r[3]), region: s(r[4]),
    employment: s(r[5]), lead: Boolean(r[6]), skills: [s(r[7]), s(r[8])].filter(Boolean),
    daysPerWeek: tw.N, modifierOverride: tw.Q,
  };
});

export const squads: Squad[] = seed.seed_squads.map((r) => ({
  name: s(r[0]), lead: s(r[1]), remit: s(r[2]), colour: s(r[3]),
}));

export const work: WorkItem[] = seed.seed_work.map((r) => {
  const title = s(r[0]);
  const ks = typeof r[8] === "number" ? r[8] : "";
  const ke = typeof r[9] === "number" ? r[9] : "";
  const span = seed.SEED_SPAN[title]
    ?? (typeof ks === "number" && typeof ke === "number" ? [ks + SPAN_OFFSET, ke + SPAN_OFFSET] : undefined);
  const assignees = [s(r[10]), s(seed.SEED_ASG2[title] ?? "")].filter(Boolean);
  return {
    title,
    kind: (seed.SEED_KIND[title] ?? "Feature") as WorkKind,
    phase: (seed.SEED_PHASE[title] ?? "") as WorkPhase,
    parent: seed.SEED_PARENT[title] ?? "",
    epic: s(r[1]), squad: s(r[2]), skill: s(r[3]), size: s(r[4]),
    sizeOverride: seed.overrides[title],
    priority: s(r[5]), state: s(r[6]), confidence: s(r[7]),
    startSprint: span ? span[0] : ks, endSprint: span ? span[1] : ke,
    span: span as [number, number] | undefined,
    assignees, assessedBy: "", productOwner: seed.SEED_PO[s(r[1])] ?? "",
    jira: s(r[11]), jiraAlign: "",
    claimedFTE: typeof r[12] === "number" ? r[12] : null,
    claims: seed.SEED_BEN[title] ?? {},
    landingMonth: r[13] == null ? null : s(r[13]),
    landingYear: seed.SEED_LAND_YEAR[title] ?? (r[13] == null ? null : settings.benefitYear),
    grade: r[14] == null ? null : s(r[14]),
    proposed: seed.SEED_PROPOSED.includes(title),
    actualEffort: seed.SEED_ACTUAL[title],
    doneInSprint: seed.SEED_DONE[title],
    dependsOn: seed.SEED_DEP[title],
  };
});

export const absences: Absence[] = seed.seed_abs.map((r) => ({
  person: s(r[0]), type: s(r[1]), from: s(r[2]), to: s(r[3]), note: s(r[4]),
}));

export const assignments: Assignment[] = seed.seed_asg.map((r) => ({
  person: s(r[0]), item: s(r[1]), type: s(r[2]), from: s(r[3]), to: s(r[4]), label: s(r[5]),
}));

export const benefitActuals: BenefitActual[] = seed.seed_act.map((r) => ({
  title: s(r[0]), type: s(r[1]), value: typeof r[2] === "number" ? r[2] : s(r[2]),
  when: s(r[3]), note: s(r[4]),
}));

export const reservations: Reservation[] = seed.seed_res.map((r) => ({
  squad: s(r[0]), quarter: s(r[1]), category: s(r[2]), mw: n(r[3]), note: s(r[4]),
}));

export const history: HistorySnapshot[] = seed.seed_hist.map((r) => ({
  quarter: s(r[0]), netMW: n(r[1]), inPlanMW: n(r[2]), deliveredMW: n(r[3]),
  fte: n(r[4]), gbp: n(r[5]), note: s(r[6]),
}));

export const archive: ArchiveRow[] = seed.seed_arc.map((r) => ({
  quarter: s(r[0]), id: s(r[1]), title: s(r[2]), epic: s(r[3]), squad: s(r[4]), state: s(r[5]),
  assignee: s(r[6]), status: s(r[7]), size: s(r[8]), original: n(r[9]), latest: n(r[10]), actual: n(r[11]),
}));

export const bankHolidays: BankHoliday[] = seed.BH.map((r) => ({
  region: s(r[0]), date: s(r[1]), name: s(r[2]),
}));

export const origin = seed._origin;

export const seedDataset: Dataset = {
  settings, people, squads, work, absences, assignments, benefitActuals,
  reservations, history, archive, bankHolidays,
};

export default seedDataset;
