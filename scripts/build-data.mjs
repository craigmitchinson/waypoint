// Builds the Waypoint seed as a Configuration Migration package: the data zip `pac data import`
// takes (data_schema.xml, data.xml, [Content_Types].xml). The rows come from the app's own Dataverse
// export, so the mapping from the model onto the tables lives in one place; this script only turns
// those CSVs into the XML the tool reads, resolving every lookup to a record id.
//
//   node node_modules/vite-node/vite-node.mjs scripts/build-data.mjs
//   pac data import --data power/data/Waypoint-data.zip
//
// vite-node runs it because the export and the seed are TypeScript. The table shapes are read from
// power/waypoint.model.yaml with build-solution.mjs's reader, so the logical names, the choice
// values and the lookup targets are the ones the solution was built with.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { isStored, readModel, zip } from "./build-solution.mjs";
import { csvFile } from "../src/export/csv";
import { exportForDataverse } from "../src/export/dataverse";
import seedDataset from "../src/seed";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}power/data`;
const PACKAGE = "Waypoint-data.zip";

/** The namespace every record id is derived under. Never change it: the ids would all move. */
export const NAMESPACE = "7d1f2c48-3b9a-4f2e-9f62-0b9d3a51c7e4";

/** The activity log is not loaded: the mock's entries are UI history, not data the app reads. */
export const SKIP_TABLES = ["wp_activitylog"];

/**
 * Craig's organisation's bank holiday policy, declared alongside the seed's own workbook list.
 * The seed is never edited (the parity tests read it), so this is applied to the exported rows at
 * build time instead. See power/data/README.md.
 */
export const OVERRIDES = JSON.parse(readFileSync(`${OUT}/overrides.json`, "utf8"));

/**
 * The Settings list a lookup on ListValue is filtered to, per column. The export writes the value
 * alone ("Other"), and three lists carry an "Other", so the list is part of the key.
 */
export const LIST_OF_LOOKUP = {
  "wp_person.wp_regionid": "Region",
  "wp_bankholiday.wp_regionid": "Region",
  "wp_workitem.wp_skillid": "Skill",
  "wp_absence.wp_typeid": "Absence type",
  "wp_assignment.wp_typeid": "Reservation category",
  "wp_reservation.wp_categoryid": "Reservation category",
};

/** A model column type as the Configuration Migration schema names it. */
export const FIELD_TYPE = {
  text: "string", memo: "string", whole: "number", decimal: "decimal", currency: "money",
  date: "datetime", boolean: "bool", choice: "optionsetvalue", lookup: "entityreference",
};

// ---------------------------------------------------------------------------
// Pure mapping
// ---------------------------------------------------------------------------

/** A CSV file as rows of cells, RFC 4180 as src/export/csv.ts writes it. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') { cell += c; continue; }
      if (text[i + 1] === '"') { cell += '"'; i += 1; continue; }
      quoted = false;
      continue;
    }
    if (c === '"') { quoted = true; continue; }
    if (c === ",") { row.push(cell); cell = ""; continue; }
    if (c === "\r") continue;
    if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; continue; }
    cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

/** The weekday of a yyyy-mm-dd date, UTC, 0 (Sunday) to 6 (Saturday). */
function weekday(dateStr) {
  return new Date(`${dateStr}T00:00:00Z`).getUTCDay();
}

/** A yyyy-mm-dd date, n days on. */
function addDays(dateStr, n) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * A weekend date pushed onto the next free weekday, the same substitute convention the seed uses
 * for England: Saturday moves two days to Monday, Sunday moves one day to Monday, and if that day
 * is already a holiday in the same region, it moves on again a day at a time until free.
 */
export function substituteDate(dateStr, taken) {
  const day = weekday(dateStr);
  let out = dateStr;
  if (day === 6) out = addDays(dateStr, 2);
  else if (day === 0) out = addDays(dateStr, 1);
  else return dateStr;
  while (taken.has(out)) out = addDays(out, 1);
  return out;
}

/**
 * Craig's organisation's bank holiday policy, applied to the seed's own rows (`{ region, date,
 * name }`) after they are read. Each `derive` rule copies a region's rows onto a new region, drops
 * any named holiday, and adds one more holiday a fixed month/day per year, moved off a weekend by
 * `substituteDate`. Exact `name`+`date`+`region` duplicates are then dropped once.
 */
export function applyBankHolidayOverrides(rows, config) {
  const out = [...rows];
  for (const rule of config.derive) {
    const remove = new Set(rule.remove ?? []);
    const derived = rows
      .filter((r) => r.region === rule.from && !remove.has(r.name))
      .map((r) => ({ ...r, region: rule.region }));
    const years = new Set(derived.map((r) => r.date.slice(0, 4)));
    for (const year of years) {
      const taken = new Set(derived.filter((r) => r.date.slice(0, 4) === year).map((r) => r.date));
      const naive = `${year}-${String(rule.add.month).padStart(2, "0")}-${String(rule.add.day).padStart(2, "0")}`;
      const observed = substituteDate(naive, taken);
      const name = observed === naive ? rule.add.name : `${rule.add.name}${rule.add.substituteSuffix}`;
      derived.push({ region: rule.region, date: observed, name });
    }
    out.push(...derived);
  }
  const seen = new Set();
  return out.filter((r) => {
    const key = config.dedupe.map((f) => r[f]).join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * The Role list, derived from the people rather than seeded by hand: one list value per job title
 * the roster writes, carrying the team grade that role is held at. Where a role is held at more
 * than one grade the most common wins, and `held` keeps the split so the build can report it.
 */
export function roleListValues(personCsv) {
  const [headers, ...rows] = parseCsv(personCsv);
  const role = headers.indexOf("wp_role");
  const grade = headers.indexOf("wp_grade");
  const counts = new Map();
  for (const cells of rows) {
    const name = (cells[role] ?? "").trim();
    if (!name) continue;
    const by = counts.get(name) ?? new Map();
    const g = (cells[grade] ?? "").trim();
    if (g) by.set(g, (by.get(g) ?? 0) + 1);
    counts.set(name, by);
  }
  return [...counts.keys()].sort((a, b) => a.localeCompare(b)).map((name, i) => {
    const held = [...counts.get(name)].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return { value: name, grade: held[0]?.[0] ?? "", sequence: i + 1, held };
  });
}

/**
 * The exported files with the Role list values added to wp_listvalue, and the wp_grade column that
 * carries their grade. The four lists the mock edits are written by the export itself; Role is the
 * one list no mock setting holds.
 */
export function addRoleListValues(files) {
  const people = files.find((f) => f.table === "wp_person");
  if (!people) throw new Error("no wp_person file to derive the Role list from");
  const roles = roleListValues(people.csv);
  const out = files.map((file) => {
    if (file.table !== "wp_listvalue") return file;
    const [headers, ...rows] = parseCsv(file.csv);
    const hasGrade = headers.includes("wp_grade");
    const columns = hasGrade ? headers : [...headers, "wp_grade"];
    const existing = rows.map((cells) => hasGrade
      ? headers.map((h, i) => cells[i] ?? "")
      : [...headers.map((h, i) => cells[i] ?? ""), ""]);
    const added = roles.map((r) => columns.map((c) => ({
      wp_name: r.value, wp_list: "Role", wp_grade: r.grade, wp_sequence: String(r.sequence),
    }[c] ?? "")));
    const all = [...existing, ...added];
    return { ...file, csv: csvFile(columns, all), rows: all.length };
  });
  return { files: out, roles };
}

/**
 * Absence type values with no row in the seed to derive them from, added to wp_listvalue alongside
 * whatever the seed already carries. Named literally, unlike Role: sequence continues on from the
 * highest the list already has, and a name already present (case-sensitive, matching the seed's own)
 * is left alone rather than duplicated.
 */
export const ADDED_ABSENCE_TYPES = ["Training", "Planning day", "Event", "Change freeze"];

/**
 * The exported files with `ADDED_ABSENCE_TYPES` added to wp_listvalue under the Absence type list,
 * skipping any name the list already carries.
 */
export function addAbsenceTypeListValues(files) {
  return files.map((file) => {
    if (file.table !== "wp_listvalue") return file;
    const [headers, ...rows] = parseCsv(file.csv);
    const listCol = headers.indexOf("wp_list");
    const nameCol = headers.indexOf("wp_name");
    const seqCol = headers.indexOf("wp_sequence");
    const inList = rows.filter((cells) => cells[listCol] === "Absence type");
    const existing = new Set(inList.map((cells) => cells[nameCol]));
    let sequence = inList.reduce((max, cells) => Math.max(max, Number(cells[seqCol]) || 0), 0);
    const added = ADDED_ABSENCE_TYPES.filter((name) => !existing.has(name)).map((name) => {
      sequence += 1;
      return headers.map((h) => ({
        wp_name: name, wp_list: "Absence type", wp_sequence: String(sequence),
      }[h] ?? ""));
    });
    const all = [...rows, ...added];
    return { ...file, csv: csvFile(headers, all), rows: all.length };
  });
}

/**
 * The hierarchy the seed loads under, from power/design-front-door.md section 2: one platform, one
 * lab and one team. Every row of the seed belongs to that team, so a scope selector narrows the
 * whole app to it and a second team can be added beside it without touching the seed.
 */
export const HIERARCHY = {
  platform: {
    wp_name: "Intelligent Process Automation",
    wp_code: "IPA",
    wp_description: "The CCS platform the labs sit in.",
    wp_sequence: "1",
    wp_active: "true",
  },
  lab: {
    wp_name: "Lumen Lab",
    wp_platformid: "Intelligent Process Automation",
    wp_description: "The lab the Waypoint team works in.",
    wp_sequence: "1",
    wp_active: "true",
  },
  team: {
    wp_name: "Waypoint team",
    wp_labid: "Lumen Lab",
    wp_description: "The team the Waypoint workbook plans. Every seeded row belongs to it.",
    wp_productlines: "Blue Prism;Power Automate;Power Apps;Copilot Studio",
    wp_sequence: "1",
    wp_active: "true",
  },
};

/**
 * The tables that carry `wp_teamid`, from power/design-front-door.md section 2. The export writes
 * no team column (that is its own unit), so the migration adds one here and fills it with the one
 * team, which is what every seeded row belongs to.
 */
export const TEAM_SCOPED = [
  "wp_person", "wp_squad", "wp_workitem", "wp_reservation", "wp_quartersnapshot", "wp_archiverow",
  "wp_teamgradecost", "wp_costline", "wp_assignee", "wp_assignment", "wp_absence",
  "wp_benefitclaim", "wp_benefitactual", "wp_importrun", "wp_quarter", "wp_workstate", "wp_epic",
  "wp_outcome", "wp_listvalue", "wp_graderate", "wp_gradeblend",
];

/** One file of the export, as a table of records keyed by column name. */
function fileOf(table, columns, records) {
  const rows = records.map((r) => columns.map((c) => r[c] ?? ""));
  return { table, fileName: `${table}.csv`, csv: csvFile(columns, rows), rows: rows.length };
}

/**
 * The three hierarchy rows, ahead of the export's own files so the lookups onto them resolve, and
 * `wp_teamid` added to every team-scoped file the export produced, set to the one team.
 */
export function addHierarchy(files) {
  const team = HIERARCHY.team.wp_name;
  const scoped = new Set(TEAM_SCOPED);
  const withTeam = files.map((file) => {
    if (!scoped.has(file.table)) return file;
    const [headers, ...rows] = parseCsv(file.csv);
    if (headers.includes("wp_teamid")) return file;
    const columns = [...headers, "wp_teamid"];
    const all = rows.map((cells) => [...headers.map((h, i) => cells[i] ?? ""), team]);
    return { ...file, csv: csvFile(columns, all), rows: all.length };
  });
  const head = [
    fileOf("wp_platform", Object.keys(HIERARCHY.platform), [HIERARCHY.platform]),
    fileOf("wp_lab", Object.keys(HIERARCHY.lab), [HIERARCHY.lab]),
    fileOf("wp_team", Object.keys(HIERARCHY.team), [HIERARCHY.team]),
  ];
  return [...head, ...withTeam];
}

/**
 * Three sample requests, one New, one Screened and one Declined, written from the question bank in
 * power/design-front-door.md section 4. Mock content, so the front door queue has something to draw
 * before the form exists. A promoted request needs a work item to point at, so that status is not
 * sampled here.
 */
export const SAMPLE_REQUESTS = [
  {
    wp_name: "Supplier invoice checks run by hand",
    wp_requestername: "Priya Raman",
    wp_requesteremail: "priya.raman@example.gov.uk",
    wp_businessarea: "Commercial Finance",
    wp_sponsor: "Dan Whitfield",
    wp_sponsoremail: "dan.whitfield@example.gov.uk",
    wp_labid: "Lumen Lab",
    wp_teamid: "Waypoint team",
    wp_productline: "Blue Prism",
    wp_problem: "Every supplier invoice over ten thousand pounds is checked line by line in a spreadsheet before it is paid.",
    wp_desiredoutcome: "The check runs overnight and only the exceptions reach a person the next morning.",
    wp_whobenefits: "The six people on the invoice desk, and every supplier waiting to be paid.",
    wp_peopleaffected: "6",
    wp_currentprocess: "Download the day's invoices from the finance system. Open the supplier contract. Compare the line items, the rates and the dates. Flag anything that differs. Email the buyer. Re-check once the buyer answers.",
    wp_volume: "180",
    wp_frequency: "Weekly",
    wp_handlingminutes: "12",
    wp_systems: "Oracle Fusion;SharePoint;Outlook",
    wp_datasensitivity: "Financial",
    wp_urgency: "This quarter",
    wp_deadline: "2026-12-31",
    wp_deadlinereason: "The payment terms penalty clause starts in January.",
    wp_benefittype: "FTE released",
    wp_benefitsize: "About 1.5 people released",
    wp_constraints: "The finance system is locked down, so access would have to be agreed with the Oracle team.",
    wp_attachments: "https://example.sharepoint.com/sites/finance/invoice-check-notes",
    wp_status: "New",
  },
  {
    wp_name: "Chasing training records before an audit",
    wp_requestername: "Tom Okafor",
    wp_requesteremail: "tom.okafor@example.gov.uk",
    wp_businessarea: "People and Capability",
    wp_sponsor: "Helen Marsh",
    wp_sponsoremail: "helen.marsh@example.gov.uk",
    wp_labid: "Lumen Lab",
    wp_teamid: "Waypoint team",
    wp_productline: "Power Automate",
    wp_problem: "Nobody knows who is overdue on mandatory training until the week before an audit.",
    wp_desiredoutcome: "A weekly reminder goes to the person and their manager, and the audit pack builds itself.",
    wp_whobenefits: "Every manager with a team, and the two people who assemble the audit pack.",
    wp_peopleaffected: "400",
    wp_currentprocess: "Export the training report. Sort by due date. Cross-reference the org chart. Write one email per manager. Chase the ones who do not reply.",
    wp_volume: "1",
    wp_frequency: "Weekly",
    wp_handlingminutes: "240",
    wp_systems: "Workday;Outlook;Excel",
    wp_datasensitivity: "Personal",
    wp_urgency: "Next quarter",
    wp_benefittype: "Compliance / risk",
    wp_benefitsize: "Half a person released, and a clean audit",
    wp_constraints: "Workday exports are owned by HR, so a service account would have to be agreed.",
    wp_status: "Screened",
    wp_screeningnotes: "Good fit for a flow over the Workday export. Sized as a spike first, because the export schedule is not confirmed.",
    wp_screenedon: "2026-09-15",
  },
  {
    wp_name: "A chatbot to answer expenses questions",
    wp_requestername: "Laura Bennett",
    wp_requesteremail: "laura.bennett@example.gov.uk",
    wp_businessarea: "Corporate Services",
    wp_sponsor: "Nicholas Reed",
    wp_sponsoremail: "nicholas.reed@example.gov.uk",
    wp_labid: "Lumen Lab",
    wp_teamid: "Waypoint team",
    wp_productline: "Copilot Studio",
    wp_problem: "The expenses inbox takes about sixty questions a week, and most of them are already answered in the policy.",
    wp_desiredoutcome: "People ask in Teams and get the policy answer without waiting for the inbox.",
    wp_whobenefits: "Anyone who claims expenses, and the two people on the inbox.",
    wp_peopleaffected: "900",
    wp_currentprocess: "Read the question. Find the paragraph in the policy. Paste it into a reply. Escalate the unusual ones to the policy owner.",
    wp_volume: "60",
    wp_frequency: "Weekly",
    wp_handlingminutes: "8",
    wp_systems: "Outlook;SharePoint",
    wp_datasensitivity: "None personal",
    wp_urgency: "No fixed date",
    wp_benefittype: "Cycle-time cut",
    wp_benefitsize: "Around 8 hours a week",
    wp_constraints: "The expenses policy is being rewritten, so the knowledge source would move under the bot.",
    wp_status: "Declined",
    wp_declinecategory: "Too early",
    wp_declinereason: "The policy is mid-rewrite and a bot trained on it would be wrong by Christmas. Resubmit once the new policy is published.",
  },
];

/** The sample requests as a file, appended last: they look up a lab, a team and a person. */
export function addRequests(files) {
  const columns = [...new Set(SAMPLE_REQUESTS.flatMap((r) => Object.keys(r)))];
  return [...files, fileOf("wp_request", columns, SAMPLE_REQUESTS)];
}

/**
 * The phase a state derives, for an item the seed carries no phase for. Mirrors phaseOf() in
 * src/store/validate.ts: Identified and In discovery are Shaping, Ready is Assessment, In
 * development is Delivery, Released, In validation and Done are Release. A state outside those
 * (Deferred, Cancelled) carries no phase of its own, so it falls back to Shaping, the same default
 * phaseOf() uses for an item with none stored.
 */
export const STATE_PHASE = {
  Identified: "Shaping",
  "In discovery": "Shaping",
  Ready: "Assessment",
  "In development": "Delivery",
  Released: "Release",
  "In validation": "Release",
  Done: "Release",
};

/** The phases at Delivery or later, where wp_assessedon is stamped so the commit gate reads the item as assessed. */
export const ASSESSED_PHASES = new Set(["Delivery", "Release"]);

/**
 * Every work item's Phase and Source, filled in from the state and the Jira key where the seed
 * leaves them blank, and Assessed on stamped for an item now at Delivery or Release. The seed carries
 * no created or last-changed date for a work item, so the run date (`today`) stands in for it.
 */
export function deriveWorkItemFields(files, today) {
  return files.map((file) => {
    if (file.table !== "wp_workitem") return file;
    const [headers, ...rows] = parseCsv(file.csv);
    const phaseCol = headers.indexOf("wp_phase");
    const sourceCol = headers.indexOf("wp_source");
    const stateCol = headers.indexOf("wp_stateid");
    const jiraCol = headers.indexOf("wp_jira");
    const assessedCol = headers.indexOf("wp_assessedon");
    const all = rows.map((cells) => {
      const out = [...cells];
      if (!out[phaseCol]) out[phaseCol] = STATE_PHASE[out[stateCol]] ?? "Shaping";
      out[sourceCol] = out[jiraCol] ? "Jira" : "Direct";
      if (!out[assessedCol] && ASSESSED_PHASES.has(out[phaseCol])) out[assessedCol] = today;
      return out;
    });
    return { ...file, csv: csvFile(headers, all), rows: all.length };
  });
}

/**
 * The ownership columns a work item at a phase is too early to carry, from power/design-work-flow.md
 * section 3: an item in Shaping has not been assessed, so it names no squad and no assessor, and
 * nothing before Validated carries a validated stamp. There is no released stamp column: the release
 * is the phase itself, so Release blanks nothing beyond wp_validatedon.
 */
export const STAGE_BLANKS = {
  Shaping: ["wp_squadid", "wp_assessedbyid", "wp_assessedon", "wp_validatedon"],
  Assessment: ["wp_validatedon"],
  Delivery: ["wp_validatedon"],
  Release: ["wp_validatedon"],
  Validated: [],
  Stopped: [],
};

/** The reason a stopped item is given where the seed carries none. */
export const STOPPED_REASON = "Stopped in seed data";

/**
 * Every work item cut back to the ownership it can truthfully hold, so the environment never shows
 * an assessor, squad or validation stamp ahead of its stage: the columns `STAGE_BLANKS` names are
 * cleared, and a stopped item always carries a reason. Commitment, size, size override, assignments
 * and benefit actuals are untouched. Returns the files with the count to report.
 */
export function scrubStageFields(files) {
  const workItems = files.find((f) => f.table === "wp_workitem");
  if (!workItems) throw new Error("no wp_workitem file to scrub");
  const [headers, ...rows] = parseCsv(workItems.csv);
  const col = (name) => headers.indexOf(name);
  const phaseCol = col("wp_phase");
  const stoppedCol = col("wp_stoppedreason");
  let blanked = 0;
  const scrubbed = rows.map((cells) => {
    const out = [...cells];
    const phase = out[phaseCol];
    for (const name of STAGE_BLANKS[phase] ?? []) {
      const i = col(name);
      if (i < 0 || !out[i]) continue;
      out[i] = "";
      blanked += 1;
    }
    if (phase === "Stopped" && !out[stoppedCol]) {
      out[stoppedCol] = STOPPED_REASON;
      blanked += 1;
    }
    return out;
  });

  const out = files.map((file) => {
    if (file.table === "wp_workitem") {
      return { ...workItems, csv: csvFile(headers, scrubbed), rows: scrubbed.length };
    }
    return file;
  });
  return { files: out, blanked };
}

/** A UUID v5: the record id a key gets, the same one every time the package is built. */
export function uuidv5(name, namespace = NAMESPACE) {
  const ns = Buffer.from(namespace.replace(/-/g, ""), "hex");
  const hash = createHash("sha1").update(Buffer.concat([ns, Buffer.from(name, "utf8")])).digest();
  hash[6] = (hash[6] & 0x0f) | 0x50;
  hash[8] = (hash[8] & 0x3f) | 0x80;
  const h = hash.subarray(0, 16).toString("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

/** The id a row of a table takes: the table and the key, hashed. */
export function recordId(table, key) {
  return uuidv5(`${table}|${key}`);
}

/**
 * The key a row is known by. A table something looks up is keyed by the value the export writes in
 * the lookup, which is its alternate key: a name, a title, a grade letter, a quarter label. A list
 * value carries its list as well, because Other is in three of the lists. Every other table is
 * keyed by its primary column and its position in the file, so two rows that read alike stay apart.
 */
export function keyOf(table, primaryColumn, cells, index, isTarget) {
  if (table === "wp_listvalue") return `${cells.wp_list}|${cells.wp_name}`;
  return isTarget ? cells[primaryColumn] : `${index}|${cells[primaryColumn]}`;
}

/** The key a lookup value points at, in the target table's terms. */
export function lookupKey(table, column, value) {
  const list = LIST_OF_LOOKUP[`${table}.${column}`];
  return list ? `${list}|${value}` : value;
}

/** A value as the tool reads it, by column type. An empty value is never written at all. */
export function fieldValue(column, value, options) {
  switch (column.type) {
    case "boolean":
      return value === "true" ? "True" : "False";
    case "date":
      return `${value.slice(0, 10)}T12:00:00Z`;
    case "choice": {
      const option = options?.get(value);
      if (option === undefined) throw new Error(`no option "${value}" in ${column.choiceSet}`);
      return String(option);
    }
    default:
      return value;
  }
}

// ---------------------------------------------------------------------------
// The package
// ---------------------------------------------------------------------------

const esc = (s) => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/**
 * The entity type codes, which the schema requires and the environment assigns. README.md has the
 * fetch that refreshes them.
 */
export const ENTITY_TYPE_CODES = JSON.parse(readFileSync(`${OUT}/entity-type-codes.json`, "utf8"));

export function schemaXml(tables) {
  const order = tables.map((t) => `<entityName>${t.logicalName}</entityName>`).join("");
  const entities = tables.map((t) => {
    const etc = ENTITY_TYPE_CODES[t.logicalName];
    if (!etc) throw new Error(`no entity type code for ${t.logicalName}; refresh entity-type-codes.json`);
    const fields = [
      `<field displayname="${esc(t.displayName)}" name="${t.logicalName}id" type="guid" customfield="false" primaryKey="true" />`,
      ...t.exported.map((c) => [
        "<field",
        `displayname="${esc(c.displayName)}"`,
        `name="${c.schemaName}"`,
        `type="${FIELD_TYPE[c.type]}"`,
        c.type === "lookup" ? `lookupType="${c.target}"` : "",
        'customfield="true"',
        "/>",
      ].filter(Boolean).join(" ")),
    ].join("");
    return [
      `<entity name="${t.logicalName}" displayname="${esc(t.displayName)}" etc="${etc}"`,
      ` primaryidfield="${t.logicalName}id" primarynamefield="${t.primaryColumn}" disableplugins="false">`,
      `<fields>${fields}</fields>`,
      "<relationships />",
      "</entity>",
    ].join("");
  });
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<entities><entityImportOrder>${order}</entityImportOrder>${entities.join("")}</entities>`,
  ].join("");
}

export function dataXml(tables) {
  const entities = tables.map((t) => {
    const records = t.records.map((r) => {
      const fields = r.fields.map((f) => [
        `<field name="${f.name}" value="${esc(f.value)}"`,
        f.lookupEntity ? ` lookupentity="${f.lookupEntity}"` : "",
        " />",
      ].join(""));
      return `<record id="${r.id}">${fields.join("")}</record>`;
    });
    return [
      `<entity name="${t.logicalName}" displayname="${esc(t.displayName)}">`,
      `<records>${records.join("")}</records>`,
      "</entity>",
    ].join("");
  });
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<entities timestamp="${new Date().toISOString()}">${entities.join("")}</entities>`,
  ].join("");
}

export const CONTENT_TYPES = [
  '<?xml version="1.0" encoding="utf-8"?>',
  '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
  '<Default Extension="xml" ContentType="text/xml" />',
  "</Types>",
].join("");

/** The package's tables: the export's, in its load order, with every lookup resolved to an id. */
export function buildPackage(data) {
  const { tables: model, choices } = readModel();
  const options = new Map(choices.map((c) => [
    c.logicalName, new Map(c.values.map((v) => [v.label, v.value])),
  ]));
  const files = data.filter((f) => f.table !== "manifest" && !SKIP_TABLES.includes(f.table) && f.rows);
  const byName = new Map(model.map((t) => [t.logicalName, t]));
  const loaded = new Set(files.map((f) => f.table));
  // A lookup onto a table the package does not carry (a user, an import run) is left out of both
  // the schema and the data: the export writes nothing in it.
  const targets = new Set(files.flatMap((f) => (byName.get(f.table)?.columns ?? [])
    .filter((c) => c.type === "lookup" && isStored(c) && loaded.has(c.target))
    .map((c) => c.target)));

  const ids = new Set();
  const tables = files.map((file) => {
    const table = byName.get(file.table);
    if (!table) throw new Error(`no table ${file.table} in the model`);
    const [headers, ...rows] = parseCsv(file.csv);
    const columns = headers.map((h) => {
      const column = table.columns.find((c) => c.schemaName === h && isStored(c));
      if (!column) throw new Error(`no column ${file.table}.${h} in the model`);
      return column;
    });
    const exported = columns.filter((c) => c.type !== "lookup" || loaded.has(c.target));
    const records = rows.map((cells, i) => {
      const named = Object.fromEntries(headers.map((h, j) => [h, cells[j] ?? ""]));
      const key = keyOf(file.table, table.primaryColumn, named, i, targets.has(file.table));
      if (ids.has(`${file.table}|${key}`)) throw new Error(`two rows keyed ${key} in ${file.table}`);
      ids.add(`${file.table}|${key}`);
      const fields = exported.map((column) => {
        const raw = named[column.schemaName] ?? "";
        if (!raw) return null;
        if (column.type === "lookup") {
          const target = `${column.target}|${lookupKey(file.table, column.schemaName, raw)}`;
          return {
            name: column.schemaName,
            value: recordId(column.target, lookupKey(file.table, column.schemaName, raw)),
            lookupEntity: column.target,
            resolves: target,
          };
        }
        return {
          name: column.schemaName,
          value: fieldValue(column, raw, options.get(column.choiceSet)),
        };
      }).filter(Boolean);
      return { id: recordId(file.table, key), fields };
    });
    return { ...table, exported, records };
  });

  // A lookup whose value names no row is left blank, which is what the model says a booking against
  // no work item is. The mock keeps free text where Dataverse keeps a row, so an assignment can
  // name a standing commitment or a type that is on no Settings list. Every drop is reported.
  const dropped = [];
  for (const t of tables) {
    for (const r of t.records) {
      r.fields = r.fields.filter((f) => {
        if (!f.resolves || ids.has(f.resolves)) return true;
        dropped.push(`${t.logicalName}.${f.name} -> ${f.resolves}`);
        return false;
      });
    }
  }
  return { tables, dropped };
}

function main() {
  const dataset = {
    ...seedDataset,
    bankHolidays: applyBankHolidayOverrides(seedDataset.bankHolidays, OVERRIDES),
  };
  const { files: exported, roles } = addRoleListValues(exportForDataverse(dataset));
  const withAbsenceTypes = addAbsenceTypeListValues(exported);
  const withHierarchy = addRequests(addHierarchy(withAbsenceTypes));
  const withWorkItemFields = deriveWorkItemFields(withHierarchy, new Date().toISOString().slice(0, 10));
  const scrub = scrubStageFields(withWorkItemFields);
  const { tables, dropped } = buildPackage(scrub.files);
  const files = [
    ["data_schema.xml", schemaXml(tables)],
    ["data.xml", dataXml(tables)],
    ["[Content_Types].xml", CONTENT_TYPES],
  ];
  mkdirSync(`${OUT}/src`, { recursive: true });
  for (const [name, text] of files) writeFileSync(`${OUT}/src/${name}`, text);
  writeFileSync(`${OUT}/${PACKAGE}`, zip(files));
  const rows = tables.reduce((n, t) => n + t.records.length, 0);
  console.log(`${tables.length} tables, ${rows} rows -> ${OUT}/${PACKAGE}`);
  for (const t of tables) console.log(`  ${t.logicalName} ${t.records.length}`);
  for (const d of [...new Set(dropped)]) console.log(`  left blank: ${d}`);
  console.log(`  stage scrub: ${scrub.blanked} fields blanked`);
  for (const r of roles) {
    const split = r.held.map(([g, n]) => `${g} x ${n}`).join(", ");
    console.log(`  Role ${r.value} -> ${r.grade}${r.held.length > 1 ? ` (mixed: ${split})` : ""}`);
  }
}

// vite-node runs the entry with its own path in argv, so there is no main-module test to make here:
// the script builds the package whenever it is run. WAYPOINT_NO_MAIN lets it be imported instead.
if (!process.env.WAYPOINT_NO_MAIN) main();
