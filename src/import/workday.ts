// A Workday absence report, read into Absence records. Approved rows only, unless overridden.
import type { Absence, Dataset, Person } from "../model/types";
import type { FieldSpec, MappingProfile } from "./mapping";
import { fieldValue } from "./mapping";
import { matchPerson } from "./people";
import type { MatchConfidence } from "./people";
import type { Table } from "./tabular";

export type DateFormat = "iso" | "dmy" | "mdy";

export const WORKDAY_FIELDS: FieldSpec[] = [
  { key: "worker", label: "Worker", required: true, kind: "text",
    aliases: ["worker name", "employee", "employee name", "full name", "name"] },
  { key: "workerId", label: "Worker ID", required: false, kind: "text",
    aliases: ["employee id", "core id", "file id", "worker id", "employee number"] },
  { key: "email", label: "Email", required: false, kind: "text",
    aliases: ["work email", "email address", "primary work email"] },
  { key: "timeOffType", label: "Time off type", required: true, kind: "enum",
    aliases: ["time off type", "absence type", "leave type", "type"] },
  { key: "start", label: "Start date", required: true, kind: "date",
    aliases: ["start date", "first day of absence", "from"] },
  { key: "end", label: "End date", required: true, kind: "date",
    aliases: ["end date", "last day of absence", "to"] },
  { key: "amount", label: "Days or hours", required: false, kind: "number",
    aliases: ["total days", "days", "units", "total hours", "hours", "quantity"] },
  { key: "status", label: "Status", required: false, kind: "enum",
    aliases: ["request status", "approval status", "absence status"] },
  { key: "comment", label: "Comment", required: false, kind: "text",
    aliases: ["comments", "note", "notes", "reason"] },
];

/** The absence types the workbook knows, keyed by the Workday wording. */
export const WORKDAY_TYPE_DEFAULTS: Record<string, string> = {
  "annual leave": "Holiday",
  "holiday": "Holiday",
  "paid time off": "Holiday",
  "sick leave": "Sick",
  "sickness": "Sick",
  "parental leave": "Parental",
  "maternity leave": "Parental",
  "paternity leave": "Parental",
  "training": "Training",
  "jury service": "Other",
  "unpaid leave": "Other",
};

const DMY = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/;
const ISO = /^(\d{4})-(\d{2})-(\d{2})/;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Reads the date columns and picks a format. dd/mm is preferred: mm/dd is only chosen when a
 * first part above twelve proves it, and either way an unambiguous day settles it.
 */
export function detectDateFormat(values: string[]): DateFormat {
  let iso = 0;
  let firstOver12 = 0;
  let secondOver12 = 0;
  let slashed = 0;
  for (const raw of values) {
    const value = (raw ?? "").trim();
    if (!value) continue;
    if (ISO.test(value)) { iso += 1; continue; }
    const m = DMY.exec(value);
    if (!m) continue;
    slashed += 1;
    if (Number(m[1]) > 12) firstOver12 += 1;
    if (Number(m[2]) > 12) secondOver12 += 1;
  }
  if (iso > slashed) return "iso";
  if (slashed === 0) return "iso";
  if (secondOver12 > 0 && firstOver12 === 0) return "mdy";
  return "dmy";
}

/** An ISO day, or "" where the value is not a date in the chosen format. */
export function parseDate(value: string, format: DateFormat): string {
  const text = (value ?? "").trim();
  if (!text) return "";
  const isoHit = ISO.exec(text);
  if (isoHit) return `${isoHit[1]}-${isoHit[2]}-${isoHit[3]}`;
  const m = DMY.exec(text);
  if (!m) return "";
  const a = Number(m[1]);
  const b = Number(m[2]);
  const year = Number(m[3]);
  const day = format === "mdy" ? b : a;
  const month = format === "mdy" ? a : b;
  if (month < 1 || month > 12 || day < 1 || day > 31) return "";
  return `${year}-${pad(month)}-${pad(day)}`;
}

export interface AbsenceRowResult {
  index: number;
  absence: Absence | null;
  person: Person | null;
  confidence: MatchConfidence;
  candidates: Person[];
  /** Why the row is not being applied, empty where it is. */
  skipped: string;
}

export interface WorkdayResult {
  format: DateFormat;
  rows: AbsenceRowResult[];
  toAdd: Absence[];
}

export interface WorkdayOptions {
  /** Take every row, not only the approved ones. */
  includeUnapproved?: boolean;
  /** Person name chosen by hand for a row, keyed by row index. */
  overrides?: Record<number, string>;
}

function absenceKey(a: Absence): string {
  return [a.person.toLowerCase(), a.from, a.to].join("|");
}

function typeOf(profile: MappingProfile, raw: string): string {
  const key = raw.trim().toLowerCase();
  const mapped = profile.valueMaps.timeOffType?.[raw] ?? profile.valueMaps.timeOffType?.[key];
  return mapped ?? WORKDAY_TYPE_DEFAULTS[key] ?? (raw.trim() || "Other");
}

export function readWorkday(
  table: Table,
  profile: MappingProfile,
  data: Dataset,
  options: WorkdayOptions = {},
): WorkdayResult {
  const startHeader = profile.columns.start;
  const endHeader = profile.columns.end;
  const samples: string[] = [];
  for (const row of table.rows) {
    if (startHeader) samples.push(row[startHeader] ?? "");
    if (endHeader) samples.push(row[endHeader] ?? "");
  }
  const format = detectDateFormat(samples);

  const seen = new Set(data.absences.map(absenceKey));
  const rows: AbsenceRowResult[] = [];
  const toAdd: Absence[] = [];

  table.rows.forEach((row, index) => {
    const name = fieldValue(row, profile.columns, "worker");
    const override = options.overrides?.[index];
    const match = override
      ? { person: data.people.find((p) => p.name === override) ?? null, confidence: "name" as MatchConfidence, candidates: [] }
      : matchPerson({
        id: fieldValue(row, profile.columns, "workerId"),
        email: fieldValue(row, profile.columns, "email"),
        name,
      }, data.people);

    const from = parseDate(fieldValue(row, profile.columns, "start"), format);
    const to = parseDate(fieldValue(row, profile.columns, "end"), format) || from;
    const status = fieldValue(row, profile.columns, "status");
    const approved = !status || status.trim().toLowerCase() === "approved";

    let skipped = "";
    if (!match.person) skipped = name ? "No person matched" : "No worker name";
    else if (!from) skipped = "No start date";
    else if (!approved && !options.includeUnapproved) skipped = "Not approved";

    let absence: Absence | null = null;
    if (!skipped && match.person) {
      absence = {
        person: match.person.name,
        type: typeOf(profile, fieldValue(row, profile.columns, "timeOffType")),
        from,
        to,
        note: fieldValue(row, profile.columns, "comment"),
      };
      if (seen.has(absenceKey(absence))) {
        skipped = "Already recorded";
        absence = null;
      } else {
        seen.add(absenceKey(absence));
        toAdd.push(absence);
      }
    }

    rows.push({ index, absence, person: match.person, confidence: match.confidence, candidates: match.candidates, skipped });
  });

  return { format, rows, toAdd };
}
