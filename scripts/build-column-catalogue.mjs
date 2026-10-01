// Build the column catalogue the formula checker reads.
//
// There is no offline validator for a canvas app (power/canvas/README.md says so), so the only way
// to know whether a name in a formula is a real Dataverse column is to read the solution. This
// script parses power/solution/src/customizations.xml and writes power/canvas/columns.json: one
// entry per wp_ table, with the name Studio shows it under (the localized collection name, which is
// what Power Fx uses), its logical name, and every attribute's display name, logical name and type.
//
//   node scripts/build-column-catalogue.mjs
//
// Types are the Power Fx shapes, not the SQL ones: text, memo, int, decimal, money, datetime, bool,
// picklist (with its options and values), lookup (with the table it points at) and guid. A lookup's
// target is not on the attribute in customizations.xml (LookupTypes is empty), it is on the
// EntityRelationship whose ReferencingAttributeName is the attribute, so both are read.
//
// The standard columns Dataverse adds to every table are appended, because a formula may read them
// and they are never in the customisations: statecode, statuscode, createdon, modifiedon, ownerid.
// For a wp_ column the catalogue is the truth; for a system column the environment is: its display
// name is read off References/DataSources.json in the latest .msapp under power/canvas/downloads
// (the first wp_ table's NativeCDSDataSourceInfo), which carries the Dataverse casing ("Status
// Reason", "Created On") rather than a hand-typed guess. With no download to read, the literals
// below are the fallback, and this script says so.
//
// Tables the app reads that are not wp_ tables and so never appear in customizations.xml (system
// tables such as Users, or platform tables such as Environment Variable Definitions/Values) live in
// power/canvas/columns.extra.json, in the same entry shape, and are merged straight into the output.

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { readEntry } from "./msapp-zip.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const xmlPath = join(root, "power", "solution", "src", "customizations.xml");
const outPath = join(root, "power", "canvas", "columns.json");
const extraPath = join(root, "power", "canvas", "columns.extra.json");
const downloadsDir = join(root, "power", "canvas", "downloads");

/** statecode/statuscode/createdon/modifiedon/ownerid display names off the environment. */
function systemColumnNames() {
  const fallback = {
    statecode: "Status",
    statuscode: "Status Reason",
    createdon: "Created On",
    modifiedon: "Modified On",
    ownerid: "Owner",
  };
  if (!existsSync(downloadsDir)) {
    console.log("build-column-catalogue: no power/canvas/downloads; system column display names are the fallback literals.");
    return fallback;
  }
  const files = readdirSync(downloadsDir).filter((f) => f.endsWith(".msapp")).sort();
  if (files.length === 0) {
    console.log("build-column-catalogue: no download in power/canvas/downloads; system column display names are the fallback literals.");
    return fallback;
  }
  const latest = join(downloadsDir, files[files.length - 1]);
  const text = readEntry(latest, "References/DataSources.json");
  if (text === null) {
    console.log(`build-column-catalogue: ${files[files.length - 1]} has no References/DataSources.json; system column display names are the fallback literals.`);
    return fallback;
  }
  const data = JSON.parse(text);
  const source = (data.DataSources ?? []).find(
    (s) => s.Type === "NativeCDSDataSourceInfo" && typeof s.LogicalName === "string" && s.LogicalName.startsWith("wp_"),
  );
  if (!source) {
    console.log(`build-column-catalogue: ${files[files.length - 1]} carries no wp_ table; system column display names are the fallback literals.`);
    return fallback;
  }
  const entity = JSON.parse(JSON.parse(source.TableDefinition).EntityMetadata);
  const attributes = new Map((entity.Attributes ?? []).map((a) => [a.LogicalName, a]));
  const names = {};
  for (const logical of Object.keys(fallback)) {
    const attribute = attributes.get(logical);
    const label = attribute?.DisplayName?.UserLocalizedLabel?.Label ?? attribute?.DisplayName?.LocalizedLabels?.[0]?.Label;
    names[logical] = label ?? fallback[logical];
  }
  console.log(`build-column-catalogue: system column display names read from ${files[files.length - 1]} (${source.LogicalName}).`);
  return names;
}

const systemNames = systemColumnNames();

const typeMap = {
  nvarchar: "text",
  ntext: "memo",
  int: "int",
  decimal: "decimal",
  money: "money",
  datetime: "datetime",
  bit: "bool",
  picklist: "picklist",
  lookup: "lookup",
  primarykey: "guid",
  uniqueidentifier: "guid",
  owner: "lookup",
  state: "picklist",
  status: "picklist",
};

const xml = readFileSync(xmlPath, "utf8");

// The lookup targets: ReferencingEntityName + ReferencingAttributeName -> ReferencedEntityName.
const lookupTargets = new Map();
for (const rel of xml.matchAll(/<EntityRelationship\b[\s\S]*?<\/EntityRelationship>/g)) {
  const block = rel[0];
  const from = /<ReferencingEntityName>([^<]*)<\/ReferencingEntityName>/.exec(block);
  const attr = /<ReferencingAttributeName>([^<]*)<\/ReferencingAttributeName>/.exec(block);
  const to = /<ReferencedEntityName>([^<]*)<\/ReferencedEntityName>/.exec(block);
  if (from && attr && to) lookupTargets.set(`${from[1]}.${attr[1]}`, to[1]);
}

function options(block) {
  const set = /<optionset\b([^>]*)>([\s\S]*?)<\/optionset>/.exec(block);
  if (!set) return null;
  const out = [];
  for (const o of set[2].matchAll(/<option value="(-?\d+)">[\s\S]*?<label description="([^"]*)"/g)) {
    out.push({ value: Number(o[1]), label: o[2] });
  }
  return { name: /Name="([^"]*)"/.exec(set[1])?.[1] ?? "", boolean: /OptionSetType="boolean"/.test(set[1]), options: out };
}

const standard = (logical) => [
  {
    display: systemNames.statecode,
    logical: "statecode",
    type: "picklist",
    options: [{ value: 0, label: "Active" }, { value: 1, label: "Inactive" }],
    optionSet: `${logical}_statecode`,
  },
  {
    display: systemNames.statuscode,
    logical: "statuscode",
    type: "picklist",
    options: [{ value: 1, label: "Active" }, { value: 2, label: "Inactive" }],
    optionSet: `${logical}_statuscode`,
  },
  { display: systemNames.createdon, logical: "createdon", type: "datetime" },
  { display: systemNames.modifiedon, logical: "modifiedon", type: "datetime" },
  { display: systemNames.ownerid, logical: "ownerid", type: "lookup", target: "systemuser" },
];

const tables = [];
for (const ent of xml.matchAll(/<Entity>[\s\S]*?<\/Entity>/g)) {
  const block = ent[0];
  const logical = /<Name LocalizedName="[^"]*" OriginalName="[^"]*">([^<]*)<\/Name>/.exec(block)?.[1];
  if (!logical || !logical.startsWith("wp_")) continue;
  const singular = /<LocalizedName description="([^"]*)"/.exec(block)?.[1] ?? logical;
  const display = /<LocalizedCollectionName description="([^"]*)"/.exec(block)?.[1] ?? singular;
  const columns = [];
  for (const at of block.matchAll(/<attribute PhysicalName="[^"]*">[\s\S]*?<\/attribute>/g)) {
    const a = at[0];
    const name = /<LogicalName>([^<]*)<\/LogicalName>/.exec(a)?.[1];
    const raw = /<Type>([^<]*)<\/Type>/.exec(a)?.[1];
    if (!name || !raw) continue;
    const opt = options(a);
    const type = raw === "bit" || opt?.boolean ? "bool" : (typeMap[raw] ?? raw);
    const col = {
      display: /<displayname description="([^"]*)"/.exec(a)?.[1] ?? name,
      logical: name,
      type,
    };
    if (/<IsPrimaryName>1<\/IsPrimaryName>/.test(a)) col.primaryName = true;
    if (type === "picklist" && opt) {
      col.optionSet = opt.name;
      col.options = opt.options;
    }
    if (type === "lookup") col.target = lookupTargets.get(`${logical}.${name}`) ?? null;
    columns.push(col);
  }
  columns.push(...standard(logical));
  tables.push({ display, singular, logical, primaryName: columns.find((c) => c.primaryName)?.display ?? null, columns });
}

const extra = JSON.parse(readFileSync(extraPath, "utf8"));
tables.push(...extra.tables);

tables.sort((a, b) => a.logical.localeCompare(b.logical));

/**
 * Per wp_ table, the NativeCDSDataSourceInfoNameMapping display names in the latest download whose
 * logical-name key is not one of the table's own catalogue columns: relationships and cross-
 * reference entries Studio's mapping carries (wp_person_DuplicateBaseRecord -> "Duplicate Records
 * (wp_person_DuplicateBaseRecord)") that the catalogue does not model. A catalogue column whose
 * display name collides with one of these is just as ambiguous to Power Fx as a collision between
 * two catalogue columns, and the mapping is the same one patch-msapp.mjs rewrites, so it is read the
 * same way. Empty when there is no download to read.
 */
function mappingCollisionNames() {
  const byTable = new Map();
  if (!existsSync(downloadsDir)) return byTable;
  const files = readdirSync(downloadsDir).filter((f) => f.endsWith(".msapp")).sort();
  if (files.length === 0) return byTable;
  const text = readEntry(join(downloadsDir, files[files.length - 1]), "References/DataSources.json");
  if (text === null) return byTable;
  const data = JSON.parse(text);
  // A lookup column's own logical name plus the OData-style "_<logical>_value" key Dataverse gives
  // it in NativeCDSDataSourceInfoNameMapping (ownerid's own mapping entry is keyed "_ownerid_value",
  // not "ownerid"), so a lookup is not mistaken for a mapping entry the catalogue does not carry.
  // Matched case-insensitively: a platform table such as EnvironmentVariableValue keys its mapping
  // by SchemaName casing (EnvironmentVariableDefinitionId) rather than the lowercase LogicalName the
  // catalogue and customizations.xml use.
  const catalogueLogicals = new Map(
    tables.map((t) => [
      t.logical,
      new Set(
        t.columns
          .flatMap((c) => (c.type === "lookup" ? [c.logical, `_${c.logical}_value`] : [c.logical]))
          .map((name) => name.toLowerCase()),
      ),
    ]),
  );
  for (const source of data.DataSources ?? []) {
    if (source.Type !== "NativeCDSDataSourceInfo") continue;
    const table = source.LogicalName;
    if (typeof table !== "string" || !catalogueLogicals.has(table)) continue;
    const known = catalogueLogicals.get(table);
    const names = new Set();
    for (const [logical, display] of Object.entries(source.NativeCDSDataSourceInfoNameMapping ?? {})) {
      if (!known.has(logical.toLowerCase())) names.add(display);
    }
    byTable.set(table, names);
  }
  return byTable;
}

// A display name Power Fx cannot tell apart from another on the same table — a custom column
// clashing with a system one (statecode's "Status" is the case that bit us) or with another custom
// column — makes every formula that names it ambiguous. Fail loud rather than write a catalogue a
// formula cannot bind against.
const mappingNames = mappingCollisionNames();
let collisions = false;
for (const table of tables) {
  const byDisplay = new Map();
  for (const column of table.columns) {
    const list = byDisplay.get(column.display) ?? [];
    list.push(column.logical);
    byDisplay.set(column.display, list);
  }
  for (const [display, logicals] of byDisplay) {
    if (logicals.length > 1) {
      collisions = true;
      console.error(`build-column-catalogue: ${table.logical} has two columns named "${display}": ${logicals.join(", ")}`);
    }
  }
  const extraNames = mappingNames.get(table.logical);
  if (extraNames) {
    for (const column of table.columns) {
      if (extraNames.has(column.display)) {
        collisions = true;
        console.error(
          `build-column-catalogue: ${table.logical} column "${column.display}" (${column.logical}) collides with a ` +
          "name mapping entry not in the catalogue.",
        );
      }
    }
  }
}
if (collisions) {
  console.error("build-column-catalogue: display-name collision(s) above; not writing columns.json.");
  process.exit(1);
}

const catalogue = {
  source: "power/solution/src/customizations.xml",
  generated: new Date().toISOString(),
  note: "Display names are the names Power Fx uses. A name with a space takes single quotes.",
  tables,
};

writeFileSync(outPath, JSON.stringify(catalogue, null, 2) + "\n");
console.log(`${tables.length} tables, ${tables.reduce((n, t) => n + t.columns.length, 0)} columns -> power/canvas/columns.json`);
for (const t of tables) console.log(`  ${t.display.padEnd(20)} ${t.logical.padEnd(22)} ${t.columns.length} columns`);
