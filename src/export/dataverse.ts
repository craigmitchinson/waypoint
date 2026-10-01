// Export for Dataverse: the dataset as one CSV per table in power/waypoint.model.yaml, with the
// logical column names the solution uses. Lookups are written as the target's alternate key value
// (a person's name, a squad's name, a work item's title), which is what the Dataverse import wizard
// maps a lookup on, and choices as their display label. Columns the model computes, in the app or in
// Dataverse, are never written: nothing here is a stored value the loader has to supply.
import type {
  Absence, ArchiveRow, Assignment, BenefitActual, Dataset, HistorySnapshot, LogEntry, Person,
  Reservation, Squad, WorkItem,
} from "../model/types";
import { MONTHS, quarterRange, toISO } from "../engine/dates";
import { CLAIM_COLUMN, listValues, outcomeOfEpic } from "../store/validate";
import { csvFile } from "./csv";

/** model.version in power/waypoint.model.yaml: the model this export was written against. */
export const MODEL_VERSION = "2.0";

/** One file the export produces. `csv` holds JSON for the manifest. */
export interface DataverseFile {
  table: string;
  fileName: string;
  csv: string;
  rows: number;
}

type Cell = string | number | boolean | null | undefined;

const text = (v: Cell): string => (v == null ? "" : String(v));

/** A number as the wizard wants it: plain digits, or empty where there is no figure. */
const num = (v: number | string | null | undefined): string => {
  if (v == null || v === "") return "";
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? String(n) : "";
};

const bool = (v: boolean): string => (v ? "true" : "false");

/** A date as yyyy-mm-dd. The model stores ISO already; anything else is parsed once. */
const date = (v: string | undefined | null): string => {
  const s = text(v).trim();
  if (!s) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? "" : toISO(d);
};

/** The benefit type a Benefits column carries: CLAIM_COLUMN read the other way round. */
const TYPE_OF_COLUMN: Record<string, string> = Object.fromEntries(
  Object.entries(CLAIM_COLUMN).map(([type, column]) => [column, type]),
);

/** What an activity row did, read from the label the commit was made under. */
function actionOf(label: string): string {
  const l = label.toLowerCase();
  if (l.startsWith("close")) return "Quarter close";
  if (l.startsWith("import")) return "Import";
  if (l.startsWith("delete") || l.startsWith("remove")) return "Delete";
  if (l.startsWith("add") || l.startsWith("new") || l.startsWith("create")) return "Create";
  return "Update";
}

/** One table's worth of the export: its columns, and a row builder per record. */
interface TableSpec<T> {
  table: string;
  columns: string[];
  records: (data: Dataset) => T[];
  row: (record: T, data: Dataset) => Cell[];
}

function spec<T>(s: TableSpec<T>): TableSpec<unknown> {
  return s as TableSpec<unknown>;
}

/** The grade or blend a work item's benefit is valued at; at most one of the two is set. */
function gradeLookups(item: WorkItem, data: Dataset): [string, string] {
  const name = text(item.grade);
  if (!name) return ["", ""];
  if (data.settings.grades.some((g) => g.grade === name)) return [name, ""];
  if (data.settings.blends.some((b) => b.name === name)) return ["", name];
  return [name, ""];
}

interface ClaimRow { item: WorkItem; column: string; value: number }
interface AssigneeRow { item: WorkItem; person: string; slot: number }
interface BlendLineRow { blend: string; grade: string; count: number }
interface ListValueRow { value: string; list: string; sequence: number }

/**
 * The tables, in the order they have to be loaded: reference data, then the records that look it up,
 * then the children. Squads come before people, so a person's squad resolves; a squad's lead is the
 * one lookup that points the other way, so the squad file is loaded a second time at the end.
 */
const TABLES: TableSpec<unknown>[] = [
  spec<ListValueRow>({
    table: "wp_listvalue",
    columns: ["wp_name", "wp_list", "wp_grade", "wp_sequence", "wp_teamid"],
    records: (data) => {
      const lists: [string, "skills" | "regions" | "absenceTypes" | "reservationCategories"][] = [
        ["Skill", "skills"], ["Region", "regions"], ["Absence type", "absenceTypes"],
        ["Reservation category", "reservationCategories"],
      ];
      const out: ListValueRow[] = [];
      for (const [label, list] of lists) {
        listValues(data, list).forEach((value, i) => out.push({ value, list: label, sequence: i + 1 }));
      }
      return out;
    },
    row: (r) => [r.value, r.list, "", r.sequence, ""],
  }),

  spec<[string, number]>({
    table: "wp_size",
    columns: ["wp_name", "wp_mw", "wp_sequence"],
    records: (data) => Object.entries(data.settings.sizes),
    row: ([name, mw], data) => [name, num(mw), Object.keys(data.settings.sizes).indexOf(name) + 1],
  }),

  spec<Dataset["settings"]["states"][number]>({
    table: "wp_workstate",
    columns: ["wp_name", "wp_jiraalign", "wp_impact", "wp_note", "wp_sequence", "wp_teamid"],
    records: (data) => data.settings.states,
    row: (s, data) => [
      s.name, s.jiraAlign, s.impact, s.note, data.settings.states.indexOf(s) + 1, "",
    ],
  }),

  spec<Dataset["settings"]["grades"][number]>({
    table: "wp_graderate",
    columns: ["wp_grade", "wp_rate", "wp_teamid"],
    records: (data) => data.settings.grades,
    row: (g) => [g.grade, num(g.rate), ""],
  }),

  spec<Dataset["settings"]["blends"][number]>({
    table: "wp_gradeblend",
    columns: ["wp_name", "wp_teamid"],
    records: (data) => data.settings.blends,
    row: (b) => [b.name, ""],
  }),

  spec<BlendLineRow>({
    table: "wp_gradeblendline",
    columns: ["wp_name", "wp_gradeblendid", "wp_graderateid", "wp_count"],
    records: (data) => data.settings.blends.flatMap((b) => Object.entries(b.counts)
      .filter(([, count]) => count > 0)
      .map(([grade, count]) => ({ blend: b.name, grade, count }))),
    row: (l) => [`${l.blend} (${l.grade})`, l.blend, l.grade, num(l.count)],
  }),

  spec<Dataset["settings"]["outcomes"][number]>({
    table: "wp_outcome",
    columns: ["wp_name", "wp_jiraalignkey", "wp_teamid"],
    records: (data) => data.settings.outcomes,
    row: (o) => [o.name, o.jiraAlignKey, ""],
  }),

  spec<string>({
    table: "wp_epic",
    columns: ["wp_name", "wp_outcomeid", "wp_teamid"],
    records: (data) => {
      const set = new Set<string>();
      for (const o of data.settings.outcomes) for (const e of o.epics) if (e) set.add(e);
      for (const w of data.work) if (w.epic) set.add(w.epic);
      return [...set].sort((a, b) => a.localeCompare(b, "en-GB"));
    },
    row: (epic, data) => [epic, outcomeOfEpic(data, epic), ""],
  }),

  spec<Dataset["bankHolidays"][number]>({
    table: "wp_bankholiday",
    columns: ["wp_name", "wp_regionid", "wp_date"],
    records: (data) => data.bankHolidays,
    row: (h) => [h.name, h.region, date(h.date)],
  }),

  spec<string>({
    table: "wp_quarter",
    columns: [
      "wp_label", "wp_sequence", "wp_startdate", "wp_enddate", "wp_epoch", "wp_sprintdays",
      "wp_benefityear", "wp_timelineyear", "wp_weeks", "wp_ftetarget", "wp_gbptarget",
      "wp_iscurrent", "wp_closedon", "wp_teamid",
    ],
    records: (data) => data.settings.quarters,
    row: (label, data) => {
      const s = data.settings;
      const [start, end] = quarterRange(label);
      return [
        label, s.quarters.indexOf(label) + 1, toISO(start), toISO(end), date(s.epoch),
        num(s.sprintDays), num(s.benefitYear), num(s.timelineYear), num(s.weeks), num(s.fteTarget),
        num(s.gbpTarget), bool(label === s.quarter),
        data.history.some((h) => h.quarter === label) ? snapshotDate(data, label) : "", "",
      ];
    },
  }),

  spec<Dataset["settings"]>({
    table: "wp_setting",
    columns: [
      "wp_name", "wp_defaultmodifier", "wp_leadmodifier", "wp_logabsences", "wp_mwdays",
      "wp_utilisationwarn", "wp_utilisationbad", "wp_reliabilitywarn", "wp_reliabilitybad",
      "wp_rankby", "wp_organisation", "wp_owner", "wp_jiraalignbase", "wp_jirabase",
      "wp_estatebaseline",
    ],
    records: (data) => [data.settings],
    row: (s) => [
      "Waypoint", num(s.defaultModifier), num(s.leadModifier), bool(s.logAbsences === "Yes"),
      num(s.mwDays), num(s.utilisationWarn), num(s.utilisationBad), num(s.reliabilityWarn),
      num(s.reliabilityBad), s.rankBy, s.organisation, s.owner, s.jiraAlignBase, s.jiraBase,
      num(s.financials.estateBaseline),
    ],
  }),

  spec<Squad>({
    table: "wp_squad",
    columns: ["wp_name", "wp_leadid", "wp_remit", "wp_colour", "wp_teamid"],
    records: (data) => data.squads,
    row: (s) => [s.name, s.lead, s.remit, s.colour, ""],
  }),

  spec<Person>({
    table: "wp_person",
    columns: [
      "wp_name", "wp_role", "wp_grade", "wp_squadid", "wp_regionid", "wp_employment", "wp_lead",
      "wp_skills", "wp_coreid", "wp_fileid", "wp_email", "wp_jiraaccountid", "wp_daysperweek",
      "wp_modifieroverride", "wp_startdate", "wp_enddate", "wp_systemuserid", "wp_teamid",
    ],
    records: (data) => data.people,
    row: (p) => [
      p.name, p.role, p.grade, p.squad, p.region, p.employment, bool(p.lead), p.skills.join("; "),
      p.coreId, p.fileId, p.email, p.jiraAccountId, num(p.daysPerWeek), num(p.modifierOverride),
      date(p.startDate), date(p.endDate), "", "",
    ],
  }),

  spec<WorkItem>({
    table: "wp_workitem",
    columns: [
      "wp_title", "wp_kind", "wp_phase", "wp_source", "wp_stateid", "wp_parentid", "wp_epicid",
      "wp_squadid", "wp_skillid", "wp_sizeid", "wp_sizeoverride", "wp_priority", "wp_confidence",
      "wp_commitment", "wp_startsprint", "wp_endsprint", "wp_spanstart", "wp_spanend",
      "wp_assessedbyid", "wp_assessedon", "wp_validatedon", "wp_productownerid", "wp_jira",
      "wp_jiraalign", "wp_claimedfte", "wp_landingmonth", "wp_landingyear", "wp_gradeid",
      "wp_gradeblendid", "wp_cancelreason", "wp_stoppedreason", "wp_originalestimate",
      "wp_actualeffort", "wp_doneinsprint", "wp_dependsonid", "wp_archivedinquarter", "wp_question",
      "wp_timeboxsprints", "wp_spikeoutcome", "wp_findings", "wp_convertedtoid",
      "wp_convertedfromid", "wp_notes", "wp_teamid",
    ],
    records: (data) => data.work,
    row: (w, data) => {
      const [grade, blend] = gradeLookups(w, data);
      const month = text(w.landingMonth);
      return [
        w.title, w.kind, w.phase, "", w.state, w.parent, w.epic, w.squad, w.skill, w.size,
        num(w.sizeOverride), w.priority, w.confidence, w.proposed ? "Proposed" : "Committed",
        num(w.startSprint), num(w.endSprint), num(w.span?.[0]), num(w.span?.[1]), w.assessedBy,
        "", date(w.validatedOn), w.productOwner, w.jira, w.jiraAlign, num(w.claimedFTE),
        MONTHS.includes(month) ? month : "", num(w.landingYear), grade, blend, w.cancelReason,
        w.stoppedReason, num(w.originalEstimate), num(w.actualEffort), num(w.doneInSprint),
        w.dependsOn, w.archivedInQuarter, w.question, num(w.timeboxSprints), w.spikeOutcome,
        w.findings, w.convertedTo, w.convertedFrom, w.notes, "",
      ];
    },
  }),

  spec<AssigneeRow>({
    table: "wp_assignee",
    columns: ["wp_name", "wp_workitemid", "wp_personid", "wp_slot", "wp_teamid"],
    records: (data) => data.work.flatMap((item) => item.assignees
      .filter((person) => Boolean(person))
      .map((person, i) => ({ item, person, slot: i + 1 }))),
    row: (a) => [`${a.item.title} (${a.person})`, a.item.title, a.person, a.slot, ""],
  }),

  spec<Assignment>({
    table: "wp_assignment",
    columns: [
      "wp_label", "wp_personid", "wp_workitemid", "wp_typeid", "wp_from", "wp_to", "wp_teamid",
    ],
    records: (data) => data.assignments,
    row: (a) => [a.label, a.person, a.item, a.type, date(a.from), date(a.to), ""],
  }),

  spec<Absence>({
    table: "wp_absence",
    columns: [
      "wp_name", "wp_personid", "wp_typeid", "wp_from", "wp_to", "wp_note", "wp_sourcekey",
      "wp_importrunid", "wp_teamid",
    ],
    records: (data) => data.absences,
    row: (a) => [
      `${a.person} (${date(a.from)} to ${date(a.to)})`, a.person, a.type, date(a.from), date(a.to),
      a.note, [a.person.toLowerCase(), a.from, a.to].join("|"), "", "",
    ],
  }),

  spec<ClaimRow>({
    table: "wp_benefitclaim",
    columns: [
      "wp_name", "wp_workitemid", "wp_benefittype", "wp_claimcolumn", "wp_value", "wp_note",
      "wp_teamid",
    ],
    records: (data) => data.work.flatMap((item) => Object.entries(item.claims ?? {})
      .filter(([column]) => Boolean(TYPE_OF_COLUMN[column]))
      .map(([column, value]) => ({ item, column, value }))),
    row: (c) => [
      claimName(c.item.title, TYPE_OF_COLUMN[c.column]), c.item.title, TYPE_OF_COLUMN[c.column],
      c.column, num(c.value), "", "",
    ],
  }),

  spec<BenefitActual>({
    table: "wp_benefitactual",
    columns: [
      "wp_name", "wp_workitemid", "wp_benefittype", "wp_claimid", "wp_value", "wp_when", "wp_note",
      "wp_teamid",
    ],
    records: (data) => data.benefitActuals,
    row: (a, data) => {
      const item = data.work.find((w) => w.title === a.title);
      const column = CLAIM_COLUMN[a.type];
      const claimed = Boolean(item && column && item.claims?.[column] !== undefined);
      return [
        claimName(a.title, a.type), a.title, a.type, claimed ? claimName(a.title, a.type) : "",
        num(a.value), date(a.when), a.note, "",
      ];
    },
  }),

  spec<Reservation>({
    table: "wp_reservation",
    columns: [
      "wp_name", "wp_squadid", "wp_isteam", "wp_quarterid", "wp_categoryid", "wp_mw", "wp_note",
      "wp_teamid",
    ],
    records: (data) => data.reservations,
    row: (r) => {
      const team = r.squad === TEAM;
      return [
        `${r.squad} (${r.quarter}, ${r.category})`, team ? "" : r.squad, bool(team), r.quarter,
        r.category, num(r.mw), r.note, "",
      ];
    },
  }),

  spec<HistorySnapshot>({
    table: "wp_quartersnapshot",
    columns: [
      "wp_name", "wp_quarterid", "wp_netmw", "wp_inplanmw", "wp_deliveredmw", "wp_fte", "wp_gbp",
      "wp_note", "wp_takenon", "wp_teamid",
    ],
    records: (data) => data.history,
    row: (h) => [
      h.quarter, h.quarter, num(h.netMW), num(h.inPlanMW), num(h.deliveredMW), num(h.fte),
      num(h.gbp), h.note, dateInNote(h.note), "",
    ],
  }),

  spec<ArchiveRow>({
    table: "wp_archiverow",
    columns: [
      "wp_title", "wp_quarterid", "wp_kind", "wp_itemid", "wp_jira", "wp_epic", "wp_squad",
      "wp_state", "wp_assignee", "wp_status", "wp_size", "wp_original", "wp_latest", "wp_actual",
      "wp_heldmw", "wp_drawnmw", "wp_freemw", "wp_teamid",
    ],
    records: (data) => data.archive,
    row: (r, data) => [
      r.title, r.quarter, r.kind ?? "Work", data.work.some((w) => w.title === r.title) ? r.title : "",
      r.id, r.epic, r.squad, r.state, r.assignee, r.status, r.size, num(r.original), num(r.latest),
      num(r.actual), num(r.heldMW), num(r.drawnMW), num(r.freeMW), "",
    ],
  }),

  spec<Dataset["settings"]["financials"]["teamGradeCosts"][number]>({
    table: "wp_teamgradecost",
    columns: ["wp_name", "wp_annualcost", "wp_teamid"],
    records: (data) => data.settings.financials.teamGradeCosts,
    row: (c) => [c.grade, num(c.annualCost), ""],
  }),

  spec<Dataset["settings"]["financials"]["costLines"][number]>({
    table: "wp_costline",
    columns: ["wp_name", "wp_costtable", "wp_fundingline", "wp_annual", "wp_teamid"],
    records: (data) => data.settings.financials.costLines,
    row: (c) => [c.name, c.costLine, c.fundingLine, num(c.annual), ""],
  }),

  spec<LogEntry>({
    table: "wp_activitylog",
    columns: [
      "wp_name", "wp_summary", "wp_action", "wp_tablename", "wp_recordid", "wp_recordname",
      "wp_byuserid", "wp_at", "wp_before", "wp_after", "wp_quarterid",
    ],
    records: (data) => data.log ?? [],
    row: (e, data) => [
      e.label, e.summary, actionOf(e.label), "", "", "", e.user, e.at, "", "",
      data.settings.quarter,
    ],
  }),
];

/** The squad a reservation held across every squad is filed under, as the mock writes it. */
const TEAM = "Team";

const claimName = (title: string, type: string): string => `${title} (${type})`;

/** The date a snapshot's note was written with: takeSnapshot() writes "Snapshot yyyy-mm-dd". */
function dateInNote(note: string): string {
  return /\d{4}-\d{2}-\d{2}/.exec(note)?.[0] ?? "";
}

/** The date the snapshot for a quarter was taken, where there is one. */
function snapshotDate(data: Dataset, label: string): string {
  const snapshot = data.history.find((h) => h.quarter === label);
  return snapshot ? dateInNote(snapshot.note) : "";
}

/** The columns a table's CSV carries, in model order. */
export function columnsOf(table: string): string[] {
  return TABLES.find((t) => t.table === table)?.columns ?? [];
}

/**
 * The dataset as one CSV per table, plus a manifest naming the tables, their row counts and the
 * order they have to be loaded in. The array is already in that order.
 */
export function exportForDataverse(data: Dataset): DataverseFile[] {
  const files: DataverseFile[] = TABLES.map((t) => {
    const records = t.records(data);
    const rows = records.map((r) => t.row(r, data).map(text));
    return {
      table: t.table,
      fileName: `${t.table}.csv`,
      csv: csvFile(t.columns, rows),
      rows: rows.length,
    };
  });
  const manifest = {
    model: "Waypoint",
    modelVersion: MODEL_VERSION,
    publisherPrefix: "wp",
    exportedAt: new Date().toISOString(),
    quarter: data.settings.quarter,
    importOrder: files.map((f) => f.table),
    tables: files.map((f) => ({ table: f.table, fileName: f.fileName, rows: f.rows })),
    notes: [
      "Load the files in the order given. Parents come before children.",
      "Lookups carry the target's alternate key value, so map each lookup column on that key.",
      "A squad's lead is a person, so load wp_squad again after wp_person to fill wp_leadid.",
      "Columns the model computes in the app or in Dataverse are not exported.",
    ],
  };
  return [
    ...files,
    {
      table: "manifest",
      fileName: "manifest.json",
      csv: JSON.stringify(manifest, null, 2),
      rows: files.length,
    },
  ];
}
