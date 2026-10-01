// A Jira issue export, read into work items. Existing items are matched by their key.
import type { Dataset, Person, WorkItem, WorkKind } from "../model/types";
import type { FieldSpec, MappingProfile } from "./mapping";
import { fieldValue } from "./mapping";
import { matchPerson } from "./people";
import type { MatchConfidence } from "./people";
import type { Table } from "./tabular";
import { parseDate } from "./workday";
import type { DateFormat } from "./workday";

export const JIRA_FIELDS: FieldSpec[] = [
  { key: "key", label: "Issue key", required: true, kind: "text", aliases: ["key", "issue id"] },
  { key: "summary", label: "Summary", required: true, kind: "text", aliases: ["title", "issue summary"] },
  { key: "issueType", label: "Issue type", required: false, kind: "enum", aliases: ["type"] },
  { key: "status", label: "Status", required: false, kind: "enum", aliases: ["issue status", "workflow status"] },
  { key: "assignee", label: "Assignee", required: false, kind: "text", aliases: ["assigned to", "assignee name"] },
  { key: "assigneeId", label: "Assignee email or account id", required: false, kind: "text",
    aliases: ["assignee email", "assignee id", "assignee account id", "account id"] },
  { key: "sprint", label: "Sprint", required: false, kind: "text", aliases: ["sprints", "iteration"] },
  { key: "storyPoints", label: "Story points", required: false, kind: "number",
    aliases: ["custom field story points", "story point estimate", "points"] },
  { key: "parent", label: "Parent or epic link", required: false, kind: "text",
    aliases: ["parent", "epic link", "parent key", "parent summary", "custom field epic link"] },
  { key: "fixVersion", label: "Fix version", required: false, kind: "text", aliases: ["fix versions", "release"] },
  { key: "created", label: "Created", required: false, kind: "date", aliases: ["created date"] },
  { key: "resolved", label: "Resolved", required: false, kind: "date", aliases: ["resolution date", "resolved date"] },
  { key: "labels", label: "Labels", required: false, kind: "text", aliases: ["label", "tags"] },
];

/** Jira issue types onto the three kinds the planner holds. */
export const JIRA_KIND_DEFAULTS: Record<string, WorkKind> = {
  "story": "Feature",
  "epic": "Feature",
  "feature": "Feature",
  "task": "Feature",
  "improvement": "Feature",
  "new feature": "Feature",
  "spike": "Spike",
  "research": "Spike",
  "sub task": "Component",
  "component": "Component",
  "bug": "Component",
};

/** Jira Align's state names, and the Jira Cloud wording around them, onto the nine planner states. */
export const JIRA_STATE_DEFAULTS: Record<string, string> = {
  "identified": "Identified",
  "backlog": "Identified",
  "to do": "Identified",
  "open": "Identified",
  "in discovery": "In discovery",
  "discovery": "In discovery",
  "ready for development": "Ready",
  "ready": "Ready",
  "selected for development": "Ready",
  "in development": "In development",
  "in progress": "In development",
  "ready for release": "Released",
  "deployed": "Released",
  "live": "Released",
  "in validation": "In validation",
  "in review": "In validation",
  "done": "Done",
  "closed": "Done",
  "resolved": "Done",
  "on hold": "Deferred",
  "blocked": "Deferred",
  "cancelled": "Cancelled",
};

function lower(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function jiraKind(profile: MappingProfile, raw: string): WorkKind {
  const mapped = profile.valueMaps.issueType?.[raw] ?? profile.valueMaps.issueType?.[lower(raw)];
  if (mapped) return mapped as WorkKind;
  return JIRA_KIND_DEFAULTS[lower(raw)] ?? "Feature";
}

export function jiraState(profile: MappingProfile, raw: string): string {
  const mapped = profile.valueMaps.status?.[raw] ?? profile.valueMaps.status?.[lower(raw)];
  if (mapped) return mapped;
  return JIRA_STATE_DEFAULTS[lower(raw)] ?? "Identified";
}

export interface JiraRowResult {
  index: number;
  key: string;
  action: "add" | "update" | "skip";
  /** A whole item for an add; the changed fields alone for an update. */
  item: WorkItem | null;
  patch: Partial<WorkItem> | null;
  /** The title of the item an update lands on. */
  target: string;
  person: Person | null;
  confidence: MatchConfidence;
  candidates: Person[];
  skipped: string;
}

export interface JiraResult {
  rows: JiraRowResult[];
  toAdd: WorkItem[];
  toUpdate: { title: string; key: string; patch: Partial<WorkItem> }[];
}

export interface JiraOptions {
  dateFormat?: DateFormat;
  /** Person name chosen by hand for a row, keyed by row index. */
  overrides?: Record<number, string>;
}

function blankItem(): WorkItem {
  return {
    title: "", kind: "Feature", phase: "", parent: "", epic: "", squad: "", skill: "", size: "",
    priority: "", state: "Identified", confidence: "", startSprint: "", endSprint: "",
    assignees: [], assessedBy: "", productOwner: "", jira: "", jiraAlign: "",
    claimedFTE: null, claims: {}, landingMonth: null, landingYear: null, grade: null, proposed: false,
  };
}

export function readJira(
  table: Table,
  profile: MappingProfile,
  data: Dataset,
  options: JiraOptions = {},
): JiraResult {
  const format = options.dateFormat ?? "iso";
  const byKey = new Map<string, WorkItem>();
  for (const item of data.work) {
    if (item.jira) byKey.set(item.jira.trim().toLowerCase(), item);
  }

  const rows: JiraRowResult[] = [];
  const toAdd: WorkItem[] = [];
  const toUpdate: { title: string; key: string; patch: Partial<WorkItem> }[] = [];

  table.rows.forEach((row, index) => {
    const key = fieldValue(row, profile.columns, "key");
    const summary = fieldValue(row, profile.columns, "summary");
    const override = options.overrides?.[index];
    const match = override
      ? { person: data.people.find((p) => p.name === override) ?? null,
        confidence: "name" as MatchConfidence, candidates: [] as Person[] }
      : matchPerson({
        id: fieldValue(row, profile.columns, "assigneeId"),
        email: fieldValue(row, profile.columns, "assigneeId"),
        name: fieldValue(row, profile.columns, "assignee"),
      }, data.people);

    const base = {
      index, person: match.person, confidence: match.confidence, candidates: match.candidates,
    };

    if (!key) {
      rows.push({ ...base, key, action: "skip", item: null, patch: null, target: "", skipped: "No issue key" });
      return;
    }

    const rawPoints = fieldValue(row, profile.columns, "storyPoints");
    const points = Number(rawPoints);
    const patch: Partial<WorkItem> = {
      state: jiraState(profile, fieldValue(row, profile.columns, "status")),
      kind: jiraKind(profile, fieldValue(row, profile.columns, "issueType")),
      jira: key,
    };
    const parent = fieldValue(row, profile.columns, "parent");
    if (parent) patch.parent = parent;
    if (rawPoints && Number.isFinite(points)) patch.originalEstimate = points;
    if (match.person) patch.assignees = [match.person.name];
    const resolved = parseDate(fieldValue(row, profile.columns, "resolved"), format);
    if (resolved) patch.phase = "Release";

    const existing = byKey.get(key.toLowerCase());
    if (existing) {
      toUpdate.push({ title: existing.title, key: key.toLowerCase(), patch });
      rows.push({ ...base, key, action: "update", item: null, patch, target: existing.title, skipped: "" });
      return;
    }

    if (!summary) {
      rows.push({ ...base, key, action: "skip", item: null, patch: null, target: "", skipped: "No summary" });
      return;
    }

    const item: WorkItem = {
      ...blankItem(),
      ...patch,
      title: summary,
      epic: parent,
      squad: match.person?.squad ?? "",
      assignees: match.person ? [match.person.name] : [],
      proposed: true,
    };
    byKey.set(key.toLowerCase(), item);
    toAdd.push(item);
    rows.push({ ...base, key, action: "add", item, patch: null, target: "", skipped: "" });
  });

  return { rows, toAdd, toUpdate };
}
