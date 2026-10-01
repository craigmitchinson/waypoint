// Reads a Waypoint Capacity Planner workbook into the model. Columns are found by their header on
// row 4, so a column moving in the generator does not break the import.
import * as XLSX from "xlsx";
import type {
  Absence, ArchiveRow, Assignment, BankHoliday, BenefitActual, CostLine, Dataset, Financials,
  GradeBlend, GradeRate, HistorySnapshot, Outcome, Person, Reservation, Settings, Squad, StateRow,
  TeamGradeCost, WorkItem, WorkKind, WorkPhase,
} from "../model/types";
import { MONTHS } from "../engine/dates";

type Cell = string | number | boolean | null | undefined;
type Matrix = Cell[][];

const HEADER_ROW = 3; // row 4, zero-based
const FIRST_ROW = 4;

/** Headers carry glyphs and punctuation; match on the words alone. */
function normalise(header: Cell): string {
  return String(header ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function str(v: Cell): string {
  return v == null ? "" : String(v).trim();
}

function num(v: Cell): number | null {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return null;
}

/** Excel serial dates and real dates alike, as an ISO day. */
function isoDate(v: Cell | Date): string {
  if (v == null || v === "") return "";
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "number") {
    const parsed = XLSX.SSF.parse_date_code(v);
    if (!parsed) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${parsed.y}-${pad(parsed.m)}-${pad(parsed.d)}`;
  }
  return String(v).slice(0, 10);
}

class Sheet {
  readonly rows: Matrix;

  private readonly index = new Map<string, number>();

  constructor(rows: Matrix) {
    this.rows = rows;
    (rows[HEADER_ROW] ?? []).forEach((h, i) => {
      const key = normalise(h);
      if (key && !this.index.has(key)) this.index.set(key, i);
    });
  }

  col(header: string): number {
    return this.index.get(normalise(header)) ?? -1;
  }

  get(row: number, header: string): Cell {
    const c = this.col(header);
    return c < 0 ? null : this.rows[row]?.[c];
  }

  /** Every data row with something in the named column. */
  dataRows(keyHeader: string): number[] {
    const c = this.col(keyHeader);
    if (c < 0) return [];
    const out: number[] = [];
    for (let r = FIRST_ROW; r < this.rows.length; r += 1) {
      if (str(this.rows[r]?.[c])) out.push(r);
    }
    return out;
  }

  cell(ref: string): Cell {
    const { r, c } = XLSX.utils.decode_cell(ref);
    return this.rows[r]?.[c];
  }
}

const REQUIRED_SHEETS = [
  "People", "Squads", "Skills", "Settings", "Work", "Absences", "Assignments",
  "Benefits", "Reservations", "History", "Archive", "Financials",
];

const REQUIRED_HEADERS: [string, string[]][] = [
  ["People", ["Name", "Role", "Grade", "Squad", "Days / week"]],
  ["Squads", ["Squad", "Lead (contact)", "Focus"]],
  ["Work", ["Title", "State", "Kind", "Squad", "FTE released"]],
  ["Absences", ["Person", "Type", "From", "To"]],
  ["Assignments", ["Person", "Activity", "Type", "From", "To"]],
  ["Reservations", ["Squad", "Category", "MW reserved"]],
  ["History", ["Quarter", "Net MW"]],
  ["Archive", ["Title", "ID", "Quarter"]],
  ["Settings", ["Outcome", "Epic", "Outcome it serves"]],
];

/** Financials stacks its typed tables down column A, each under its own caption. */
const REQUIRED_BLOCKS: [string, string[]][] = [
  ["Financials", ["Team grades: blended annual cost", "Licences and subscriptions",
    "Infrastructure and other costs", "Estate: automations already live"]],
];

/** Checks the sheets and headers the reader functions rely on, before any of them run. */
function validate(s: Record<string, Sheet>): void {
  for (const name of REQUIRED_SHEETS) {
    if (!s[name]) throw new Error(`Workbook import: missing sheet "${name}"`);
  }
  for (const [sheet, headers] of REQUIRED_HEADERS) {
    for (const header of headers) {
      if (s[sheet].col(header) < 0) {
        throw new Error(`Workbook import: missing header "${header}" on ${sheet}`);
      }
    }
  }
  for (const [sheet, captions] of REQUIRED_BLOCKS) {
    for (const caption of captions) {
      if (blockRow(s[sheet], caption) < 0) {
        throw new Error(`Workbook import: missing block "${caption}" on ${sheet}`);
      }
    }
  }
}

/** The row a Financials block's caption sits on; its data starts two rows below. */
function blockRow(s: Sheet, caption: string): number {
  const key = normalise(caption);
  for (let r = 0; r < s.rows.length; r += 1) {
    if (normalise(s.rows[r]?.[0]) === key) return r;
  }
  return -1;
}

function sheets(wb: XLSX.WorkBook): Record<string, Sheet> {
  const out: Record<string, Sheet> = {};
  for (const name of wb.SheetNames) {
    out[name] = new Sheet(
      XLSX.utils.sheet_to_json<Cell[]>(wb.Sheets[name], { header: 1, blankrows: true, defval: null }),
    );
  }
  return out;
}

function readSettings(s: Sheet): Settings {
  const grades: GradeRate[] = [];
  const blends: GradeBlend[] = [];
  const sizes: Record<string, number> = {};
  const states: StateRow[] = [];
  const gradeNames: string[] = [];
  for (let r = 4; r < 12; r += 1) {
    const grade = str(s.rows[r]?.[16]);
    gradeNames.push(grade);
    if (grade) grades.push({ grade, rate: num(s.rows[r]?.[17]) ?? 0 });
    const size = str(s.rows[r]?.[4]);
    if (size) sizes[size] = num(s.rows[r]?.[5]) ?? 0;
  }
  for (let r = 4; r < 12; r += 1) {
    const name = str(s.rows[r]?.[50]);
    if (!name) continue;
    const counts: Record<string, number> = {};
    gradeNames.forEach((g, i) => {
      if (g) counts[g] = num(s.rows[r]?.[51 + i]) ?? 0;
    });
    blends.push({ name, counts });
  }
  for (let r = 4; r < 13; r += 1) {
    const name = str(s.rows[r]?.[7]);
    if (!name) continue;
    states.push({
      name, jiraAlign: str(s.rows[r]?.[9]),
      impact: str(s.rows[r]?.[10]) as StateRow["impact"], note: str(s.rows[r]?.[11]),
    });
  }
  /** A Settings list block: one column, from row 5 down, as long as the rows keep values. */
  const list = (col: number, rows: number): string[] => {
    const out: string[] = [];
    for (let r = 4; r < 4 + rows; r += 1) {
      const value = str(s.rows[r]?.[col]);
      if (value) out.push(value);
    }
    return out;
  };
  const v = (row: number): Cell => s.rows[row - 1]?.[2];
  return {
    quarter: str(v(5)),
    epoch: isoDate(v(9)),
    sprintDays: num(v(10)) ?? 14,
    defaultModifier: num(v(13)) ?? 0,
    leadModifier: num(v(14)) ?? 0,
    logAbsences: str(v(15)),
    utilisationWarn: num(v(16)) ?? 0,
    utilisationBad: num(v(17)) ?? 0,
    mwDays: num(v(18)) ?? 5,
    benefitYear: num(v(19)) ?? new Date().getUTCFullYear(),
    fteTarget: num(v(20)) ?? 0,
    gbpTarget: num(v(21)) ?? 0,
    rankBy: str(v(22)),
    organisation: str(v(23)),
    owner: str(v(24)),
    timelineYear: num(v(25)) ?? new Date().getUTCFullYear(),
    reliabilityWarn: num(v(26)) ?? 0,
    reliabilityBad: num(v(27)) ?? 0,
    jiraAlignBase: str(v(29)),
    jiraBase: str(v(30)),
    weeks: 53,
    skills: list(39, 16),
    regions: list(12, 8),
    absenceTypes: list(13, 4),
    quarters: list(25, 12),
    reservationCategories: list(47, 12),
    sizes, grades, blends, states,
    // the Outcome table and the Financials tables are read from their own blocks, beside this
    outcomes: [],
    financials: { teamGradeCosts: [], costLines: [] },
  };
}

/** The captions of the two cost tables on Financials, and the cost line each one is reported as. */
const COST_TABLES: [string, string][] = [
  ["Licences and subscriptions", "Licences and subscriptions"],
  ["Infrastructure and other costs", "Infrastructure and other"],
];

/** The typed tables on Financials: team grade costs, the cost lines, and the estate baseline. */
function readFinancials(s: Sheet): Financials {
  const teamGradeCosts: TeamGradeCost[] = [];
  const grades = blockRow(s, "Team grades: blended annual cost") + 2;
  for (let r = grades; r < s.rows.length; r += 1) {
    const grade = str(s.rows[r]?.[0]);
    if (!grade) break;
    teamGradeCosts.push({ grade, annualCost: num(s.rows[r]?.[1]) ?? 0 });
  }
  const costLines: CostLine[] = [];
  for (const [caption, costLine] of COST_TABLES) {
    const top = blockRow(s, caption) + 2;
    for (let r = top; r < s.rows.length; r += 1) {
      const name = str(s.rows[r]?.[0]);
      if (!name) break;
      costLines.push({
        name, costLine, fundingLine: str(s.rows[r]?.[3]), annual: num(s.rows[r]?.[2]) ?? 0,
      });
    }
  }
  const baseline = blockRow(s, "Baseline value in-year");
  return {
    teamGradeCosts,
    costLines,
    estateBaseline: baseline < 0 ? undefined : num(s.rows[baseline]?.[5]) ?? undefined,
  };
}

/** The Outcome table on Settings, with the epics the Epic table files under each one. */
function readOutcomes(s: Sheet): Outcome[] {
  const outcomeCol = s.col("Outcome");
  const epicCol = s.col("Epic");
  const servesCol = s.col("Outcome it serves");
  const outcomes: Outcome[] = [];
  for (let r = FIRST_ROW; r < FIRST_ROW + 12; r += 1) {
    const name = str(s.rows[r]?.[outcomeCol]);
    if (!name) continue;
    outcomes.push({ name, epics: [], jiraAlignKey: str(s.rows[r]?.[outcomeCol + 1]) || undefined });
  }
  for (let r = FIRST_ROW; r < FIRST_ROW + 24; r += 1) {
    const epic = str(s.rows[r]?.[epicCol]);
    if (!epic) continue;
    const serves = str(s.rows[r]?.[servesCol]);
    outcomes.find((o) => o.name === serves)?.epics.push(epic);
  }
  return outcomes;
}

function readBankHolidays(s: Sheet): BankHoliday[] {
  const out: BankHoliday[] = [];
  for (let r = 32; r < s.rows.length; r += 1) {
    const region = str(s.rows[r]?.[7]);
    const date = isoDate(s.rows[r]?.[8]);
    if (!region || !date) continue;
    out.push({ region, date, name: str(s.rows[r]?.[9]) });
  }
  return out;
}

function readPeople(s: Sheet): Person[] {
  // the block ends with the "Everyone" row the Absences list uses; it carries no role, so it is not a person
  return s.dataRows("Name").filter((r) => str(s.get(r, "Role"))).map((r) => ({
    name: str(s.get(r, "Name")),
    role: str(s.get(r, "Role")),
    grade: str(s.get(r, "Grade")),
    squad: str(s.get(r, "Squad")),
    region: str(s.get(r, "Region")),
    employment: str(s.get(r, "Employment")),
    lead: str(s.get(r, "Lead modifier?")).toLowerCase() === "yes",
    skills: ["Skill 1 (primary)", "Skill 2", "Skill 3"].map((h) => str(s.get(r, h))).filter(Boolean),
    daysPerWeek: num(s.get(r, "Days / week")) ?? undefined,
    modifierOverride: num(s.get(r, "Modifier override")) ?? undefined,
    startDate: isoDate(s.get(r, "Start date")) || undefined,
    endDate: isoDate(s.get(r, "End date")) || undefined,
  }));
}

function readSquads(s: Sheet): Squad[] {
  // the block closes with the "All squads" total row, which is a sum and not a squad
  return s.dataRows("Squad").filter((r) => str(s.get(r, "Squad")) !== "All squads").map((r) => ({
    name: str(s.get(r, "Squad")),
    lead: str(s.get(r, "Lead (contact)")),
    remit: str(s.get(r, "Focus")),
    colour: str(s.get(r, "Colour")),
  }));
}

const CLAIM_HEADERS: [string, string][] = [
  ["T", "Cost avoidance (£M/yr)"],
  ["U", "Cycle-time cut %"],
  ["V", "Error reduction %"],
  ["W", "Throughput (x)"],
  ["X", "Compliance / risk"],
  ["Y", "CX / EX uplift"],
];

function readWork(s: Sheet, benefitYear: number): WorkItem[] {
  // the block closes with a summary line in the Title column; a real row always carries a state
  return s.dataRows("Title").filter((r) => str(s.get(r, "State"))).map((r) => {
    const lands = str(s.get(r, "Lands (month, year)"));
    const [month, year] = lands.split(/\s+/);
    const claims: Record<string, number> = {};
    for (const [key, header] of CLAIM_HEADERS) {
      const value = num(s.get(r, header));
      if (value) claims[key] = value;
    }
    const assignees = ["Assignee (optional)", "Assignee 2", "Assignee 3"]
      .map((h) => str(s.get(r, h)))
      .filter(Boolean);
    const start = num(s.get(r, "Start sprint"));
    const end = num(s.get(r, "End sprint"));
    return {
      title: str(s.get(r, "Title")),
      kind: (str(s.get(r, "Kind")) || "Feature") as WorkKind,
      phase: str(s.get(r, "Phase")) as WorkPhase,
      parent: str(s.get(r, "Parent")),
      epic: str(s.get(r, "Epic")),
      squad: str(s.get(r, "Squad")),
      skill: str(s.get(r, "Skill")),
      size: str(s.get(r, "Size")),
      sizeOverride: num(s.get(r, "MW override")) ?? undefined,
      priority: str(s.get(r, "Priority")),
      state: str(s.get(r, "State")),
      confidence: str(s.get(r, "Confidence")),
      startSprint: start ?? "",
      endSprint: end ?? (start ?? ""),
      span: start != null ? [start, end ?? start] : undefined,
      assignees,
      assessedBy: str(s.get(r, "Assessed by")),
      productOwner: str(s.get(r, "Product owner")),
      jira: str(s.get(r, "Jira ref")),
      jiraAlign: "",
      claimedFTE: num(s.get(r, "FTE released")),
      claims,
      landingMonth: MONTHS.includes(month) ? month : null,
      landingYear: year ? Number(year) : lands ? benefitYear : null,
      grade: str(s.get(r, "Grade")) || null,
      proposed: str(s.get(r, "Commitment")) === "Proposed",
      originalEstimate: num(s.get(r, "Original estimate (MW)")) ?? undefined,
      actualEffort: num(s.get(r, "Actual effort (MW)")) ?? undefined,
      doneInSprint: num(s.get(r, "Done in sprint")) ?? undefined,
      dependsOn: str(s.get(r, "Depends on")) || undefined,
    };
  });
}

function readAbsences(s: Sheet): Absence[] {
  // a summary line closes the block in the Person column; a real row always carries a type
  return s.dataRows("Person").filter((r) => str(s.get(r, "Type"))).map((r) => ({
    person: str(s.get(r, "Person")),
    type: str(s.get(r, "Type")),
    from: isoDate(s.get(r, "From")),
    to: isoDate(s.get(r, "To")),
    note: str(s.get(r, "Note")),
  }));
}

function readAssignments(s: Sheet): Assignment[] {
  return s.dataRows("Person").filter((r) => str(s.get(r, "Type"))).map((r) => ({
    person: str(s.get(r, "Person")),
    item: str(s.get(r, "Activity")),
    type: str(s.get(r, "Type")),
    from: isoDate(s.get(r, "From")),
    to: isoDate(s.get(r, "To")),
    label: str(s.get(r, "Short label (timeline)")),
  }));
}

/**
 * The actuals recorded on Benefits: one per claim type, beside the claim itself. The sheet keeps no
 * date against them, so the recorded month has to come from the workbook's own recorded figures.
 */
const ACTUAL_COLUMNS: [string, number, number][] = [
  ["FTE released", 6, 7],
  ["Cost avoidance", 10, 11],
  ["Cycle-time cut", 14, 15],
  ["Error reduction", 16, 17],
  ["Throughput", 18, 19],
  ["Compliance / risk", 20, 21],
  ["CX / EX uplift", 22, 23],
];

function readBenefitActuals(s: Sheet): BenefitActual[] {
  const out: BenefitActual[] = [];
  for (let r = FIRST_ROW; r < s.rows.length; r += 1) {
    const title = str(s.rows[r]?.[0]);
    if (!title) continue;
    for (const [type, , actualCol] of ACTUAL_COLUMNS) {
      const value = num(s.rows[r]?.[actualCol]);
      if (value == null) continue;
      out.push({ title, type, value, when: "", note: "" });
    }
  }
  return out;
}

function readReservations(s: Sheet): Reservation[] {
  // the block closes with a summary line; a real reservation always names a category
  return s.dataRows("Squad").filter((r) => str(s.get(r, "Category"))).map((r) => ({
    squad: str(s.get(r, "Squad")),
    quarter: str(s.get(r, "Quarter")),
    category: str(s.get(r, "Category")),
    mw: num(s.get(r, "MW reserved")) ?? 0,
    note: str(s.get(r, "Note")),
  }));
}

function readHistory(s: Sheet): HistorySnapshot[] {
  return s.dataRows("Quarter").filter((r) => num(s.get(r, "Net MW")) != null).map((r) => ({
    quarter: str(s.get(r, "Quarter")),
    netMW: num(s.get(r, "Net MW")) ?? 0,
    inPlanMW: num(s.get(r, "In plan MW")) ?? 0,
    deliveredMW: num(s.get(r, "Delivered MW")) ?? 0,
    fte: num(s.get(r, "FTE in-year")) ?? 0,
    gbp: num(s.get(r, "£ in-year")) ?? 0,
    note: str(s.get(r, "Note")),
  }));
}

function readArchive(s: Sheet): ArchiveRow[] {
  return s.dataRows("Title").filter((r) => str(s.get(r, "ID"))).map((r) => ({
    quarter: str(s.get(r, "Quarter")),
    id: str(s.get(r, "ID")),
    title: str(s.get(r, "Title")),
    epic: str(s.get(r, "Epic")),
    squad: str(s.get(r, "Squad")),
    state: str(s.get(r, "State at close")),
    assignee: str(s.get(r, "Assignee")),
    status: str(s.get(r, "Delivery status")),
    size: str(s.get(r, "Size")),
    original: num(s.get(r, "Original (MW)")) ?? 0,
    latest: num(s.get(r, "Latest (MW)")) ?? 0,
    actual: num(s.get(r, "Actual (MW)")) ?? 0,
  }));
}

/** A parsed workbook to the model. */
export function datasetFromWorkbook(wb: XLSX.WorkBook): Dataset {
  const s = sheets(wb);
  validate(s);
  const settings = {
    ...readSettings(s.Settings),
    outcomes: readOutcomes(s.Settings),
    financials: readFinancials(s.Financials),
  };
  return {
    settings,
    people: readPeople(s.People),
    squads: readSquads(s.Squads),
    work: readWork(s.Work, settings.benefitYear),
    absences: readAbsences(s.Absences),
    assignments: readAssignments(s.Assignments),
    benefitActuals: readBenefitActuals(s.Benefits),
    reservations: readReservations(s.Reservations),
    history: readHistory(s.History),
    archive: readArchive(s.Archive),
    bankHolidays: readBankHolidays(s.Settings),
  };
}

/** From a picked file in the browser. */
export async function importWorkbookFile(file: File): Promise<Dataset> {
  const buffer = await file.arrayBuffer();
  return datasetFromWorkbook(XLSX.read(buffer, { cellDates: true }));
}

/** From bytes: a path read in Node, or a fetched response. */
export function importWorkbookBuffer(data: ArrayBuffer | Uint8Array): Dataset {
  return datasetFromWorkbook(XLSX.read(data, { type: "array", cellDates: true }));
}
