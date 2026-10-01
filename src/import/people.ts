// Rows in an export, matched to people in the dataset. Anything ambiguous is returned, never applied.
import type { Person } from "../model/types";

export type MatchConfidence = "id" | "email" | "name" | "initials" | "none";

export interface PersonFields {
  /** Workday's Core ID or File ID, or a Jira account id. */
  id?: string;
  email?: string;
  name?: string;
}

export interface PersonMatch {
  person: Person | null;
  confidence: MatchConfidence;
  /** Everyone the row could mean, whenever the name alone cannot decide it. */
  candidates: Person[];
}

function key(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

/** IDs are exact after trim; only email and name comparisons lowercase. */
function idKey(value: string | undefined): string {
  return (value ?? "").trim();
}

/** "Brooks, Lena" and "Lena  Brooks" alike become "lena brooks". */
export function normaliseName(name: string): string {
  let text = String(name ?? "").replace(/\s+/g, " ").trim();
  const comma = text.indexOf(",");
  if (comma > 0) {
    const surname = text.slice(0, comma).trim();
    const rest = text.slice(comma + 1).trim();
    if (rest) text = rest + " " + surname;
  }
  return text.toLowerCase().replace(/[^a-z0-9 ]+/g, "").replace(/\s+/g, " ").trim();
}

/** "lena brooks" collapsed to "l brooks", so an export writing initials still matches. */
function collapsed(name: string): string {
  const parts = normaliseName(name).split(" ").filter(Boolean);
  if (parts.length < 2) return normaliseName(name);
  return parts.map((p, i) => (i === parts.length - 1 ? p : p[0])).join(" ");
}

function surname(name: string): string {
  const parts = normaliseName(name).split(" ").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
}

function none(candidates: Person[] = []): PersonMatch {
  return { person: null, confidence: "none", candidates };
}

/** Core ID or File ID first, then email, then the name. A name is never applied when it is ambiguous. */
export function matchPerson(fields: PersonFields, people: Person[]): PersonMatch {
  const id = idKey(fields.id);
  if (id) {
    const hit = people.filter((p) => idKey(p.coreId) === id || idKey(p.fileId) === id || idKey(p.jiraAccountId) === id);
    if (hit.length === 1) return { person: hit[0], confidence: "id", candidates: hit };
    if (hit.length > 1) return none(hit);
  }

  const email = key(fields.email);
  if (email) {
    const hit = people.filter((p) => key(p.email) === email);
    if (hit.length === 1) return { person: hit[0], confidence: "email", candidates: hit };
    if (hit.length > 1) return none(hit);
  }

  const name = fields.name ? normaliseName(fields.name) : "";
  if (!name) return none();

  const exact = people.filter((p) => normaliseName(p.name) === name);
  if (exact.length === 1) return { person: exact[0], confidence: "name", candidates: exact };
  if (exact.length > 1) return none(exact);

  const initials = collapsed(name);
  const byInitials = people.filter((p) => collapsed(p.name) === initials);
  if (byInitials.length === 1) return { person: null, confidence: "initials", candidates: byInitials };
  if (byInitials.length > 1) return none(byInitials);

  const last = surname(name);
  const bySurname = last ? people.filter((p) => surname(p.name) === last) : [];
  return none(bySurname);
}
