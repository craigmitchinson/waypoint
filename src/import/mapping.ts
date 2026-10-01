// Columns in an export, named onto fields in the model, and the profile that remembers the naming.
export type FieldKind = "text" | "date" | "number" | "enum";
export type ImportSource = "workday" | "jira";

export interface FieldSpec {
  key: string;
  label: string;
  required: boolean;
  kind: FieldKind;
  /** Header spellings seen in the wild, matched case- and punctuation-insensitively. */
  aliases: string[];
}

export interface MappingProfile {
  source: ImportSource;
  /** Field key to the header it reads, or null where the export has no such column. */
  columns: Record<string, string | null>;
  /** Field key to a map of the export's values onto the model's, e.g. Jira status to state. */
  valueMaps: Record<string, Record<string, string>>;
  savedAt: string;
}

export const PROFILES_KEY = "waypoint-import-profiles-v1";

/** Headers carry glyphs and punctuation; match on the words alone. */
export function normaliseHeader(header: string): string {
  return String(header ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Each spec takes the first unused header matching one of its aliases, exactly then loosely. */
export function detectMapping(headers: string[], specs: FieldSpec[]): Record<string, string | null> {
  const taken = new Set<string>();
  const norm = headers.map((h) => ({ header: h, key: normaliseHeader(h) }));
  const columns: Record<string, string | null> = {};
  for (const spec of specs) {
    const aliases = [spec.key, spec.label, ...spec.aliases].map(normaliseHeader).filter(Boolean);
    let hit = norm.find((h) => !taken.has(h.header) && aliases.includes(h.key));
    if (!hit) {
      hit = norm.find((h) => !taken.has(h.header)
        && aliases.some((a) => a.length > 3 && (h.key.includes(a) || a.includes(h.key))));
    }
    columns[spec.key] = hit ? hit.header : null;
    if (hit) taken.add(hit.header);
  }
  return columns;
}

export function missingRequired(columns: Record<string, string | null>, specs: FieldSpec[]): string[] {
  return specs.filter((s) => s.required && !columns[s.key]).map((s) => s.label);
}

/** The value a mapped field holds in a row, or "" where the field is not mapped. */
export function fieldValue(row: Record<string, string>, columns: Record<string, string | null>, key: string): string {
  const header = columns[key];
  if (!header) return "";
  return (row[header] ?? "").trim();
}

function storage(): Storage | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null;
  }
}

export function loadProfiles(): Partial<Record<ImportSource, MappingProfile>> {
  const store = storage();
  if (!store) return {};
  try {
    const raw = store.getItem(PROFILES_KEY);
    return raw ? (JSON.parse(raw) as Partial<Record<ImportSource, MappingProfile>>) : {};
  } catch {
    return {};
  }
}

export function saveProfile(profile: MappingProfile): void {
  const store = storage();
  if (!store) return;
  const all = loadProfiles();
  all[profile.source] = { ...profile, savedAt: new Date().toISOString() };
  store.setItem(PROFILES_KEY, JSON.stringify(all));
}
