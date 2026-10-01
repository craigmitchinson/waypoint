// Patch the app settings that make the published app fill the browser window.
//
//   node scripts/patch-msapp.mjs [path/to/app.msapp]
//
// Two jobs, both on a packed .msapp, in place.
//
// Studio keeps Settings > Display in Properties.json inside the .msapp, not in the YAML, so
// `pac canvas pack` writes the blank app's defaults every time: a fixed 1366x768 canvas, scaled to
// fit and letterboxed. This script rewrites those keys in a packed .msapp, in place, and leaves
// every other entry in the zip untouched:
//
//   DocumentLayoutScaleToFit                  -> false   (Scale to fit off)
//   DocumentLayoutMaintainAspectRatio         -> false   (Lock aspect ratio off)
//   DocumentLayoutLockOrientation             -> false   (Lock orientation off)
//   DefaultConnectedDataSourceMaxGetRowsCount -> 2000    (data row limit)
//
// DocumentLayoutWidth and DocumentLayoutHeight stay at 1366x768: with scale to fit off they are
// only the size of Studio's authoring canvas, and every screen sizes from Parent.Width/Height
// (power/RUNBOOK.md).
//
// It also carries the code component registrations `pac canvas pack` cannot write. A pack builds
// the package from Src alone, so a `Control: CodeComponent` reference survives but the registration
// Studio holds outside Src does not, and Studio then answers PA2401 "Unknown Code Component". A
// core control is registered by a References/Templates.json PcfTemplates record; a custom control
// placed in Studio is registered by a CustomControl record under Properties.json's
// LocalDatabaseReferences plus its compiled bundle under Resources/Controls. Every ComponentName a
// CodeComponent in the .msapp's own Src names is looked up in the download
// scripts/refresh-skeleton.mjs last unpacked: the CustomControl record is merged into the build's
// own components array, the bundle and every other Resources entry named from the control are
// copied whole, an other entry the build has not got is copied whole, and a JSON entry both carry
// has the missing records merged into it rather than overwritten. A component still unregistered
// when this script finishes is a failure: it exits 1 rather than let an import answer PA2401.
//
// Given --reconcile, it also reconciles the cached Dataverse metadata in References/DataSources.json
// against power/canvas/columns.json. Each NativeCDSDataSourceInfo entry carries the table definition
// the skeleton download was taken with, and nothing refreshes it afterwards, so a column renamed in
// the environment keeps its old display name in the package and Studio then fails every formula that
// reads the new one. Every wp_ table the catalogue knows has each column's DisplayName, and that
// column's entry in the name mapping beside it, set from the catalogue, matched by logical name.
// This is off by default: Studio owns package metadata (power/decisions.md), and the fix is to
// refresh the data source in Studio on the golden app, not to have this script rewrite the cache.
//
// Given --reconcile, it also drops the SpatialServices and SpatialServices_1 entries from
// References/DataSources.json. They are leftovers from the sample screen the app was built on, no
// formula reads them, and a pack carries them through every round trip. Every other entry is kept,
// in its own order.
//
// Node has no zip library here and none is in node_modules, so the zip is opened with .NET's
// System.IO.Compression through PowerShell, the same way scripts/refresh-skeleton.mjs reads a
// download. The value edit itself is a text substitution, so the rest of Properties.json keeps its
// own bytes, key order and formatting.

import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  codeComponentNames,
  componentResourceEntries,
  copyEntry,
  customControlRecords,
  declaresName,
  isRegistered,
  listEntries,
  readEntry,
  readTextUnder,
  registrationEntries,
  skeletonDownload,
  writeEntry,
} from "./msapp-zip.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const entryName = "Properties.json";
const columnsPath = join(root, "power", "canvas", "columns.json");
const dataSourcesEntry = "References/DataSources.json";

// ---- big-integer safe JSON, for every JSON edit this script makes to the .msapp ----------------
// A NativeCDSDataSourceInfo entry in References/DataSources.json caches a BigIntType attribute's
// Int64 MaxValue (9223372036854775807) and MinValue (-9223372036854775808), both outside
// Number.MAX_SAFE_INTEGER. A bare JSON.parse followed by JSON.stringify turns those into
// 9223372036854776000 and -9223372036854776000, and Studio then refuses to open the app with
// ErrOpeningDocument_UnknownError. protectBigInts replaces every JSON number token of 16 or more
// digits with a quoted sentinel before JSON.parse; restoreBigInts turns the sentinel back into a
// bare number after JSON.stringify. Neither touches a digit sequence inside a string (a GUID, a
// name): both track quote state by hand rather than matching on digits alone, so only a token that
// sits where JSON grammar allows a number - straight after `:`, `,` or `[` - is ever protected.
// Every JSON.parse/JSON.stringify this script performs, at any nesting (Properties.json's own
// text, and TableDefinition/EntityMetadata, JSON text cached as a string inside DataSources.json),
// goes through parseJson/stringifyJson or the entry-level readJsonEntry/writeJsonEntry built on them.
// The sentinel is the literal JSON escape sequence for U+0000 (backslash, u, 0, 0, 0, 0), not a raw
// null byte: a raw control character inside a JSON string is invalid JSON and JSON.parse rejects it
// ("Bad control character in string literal"), while the escape sequence parses to an actual NUL,
// which JSON.stringify then re-escapes the same way on the way back out, so restoreBigInts finds it
// again unchanged.
const bigIntSentinelPrefix = "\\u0000BIG:";
const bigIntSentinelSuffix = "\\u0000";
const escapeForRegex = (literal) => literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function protectBigInts(text) {
  let out = "";
  let inString = false;
  let escaped = false;
  let atValue = true;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inString) {
      out += ch;
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      atValue = false;
      out += ch;
      continue;
    }
    if (ch === ":" || ch === "," || ch === "[") {
      atValue = true;
      out += ch;
      continue;
    }
    if (/\s/.test(ch)) {
      out += ch;
      continue;
    }
    if (atValue) {
      const match = /^-?\d{16,}/.exec(text.slice(i));
      const after = match ? text[i + match[0].length] : "";
      if (match && after !== "." && after !== "e" && after !== "E") {
        out += `"${bigIntSentinelPrefix}${match[0]}${bigIntSentinelSuffix}"`;
        i += match[0].length - 1;
        atValue = false;
        continue;
      }
    }
    atValue = false;
    out += ch;
  }
  return out;
}

function restoreBigInts(text) {
  const pattern = new RegExp(`"${escapeForRegex(bigIntSentinelPrefix)}(-?\\d+)${escapeForRegex(bigIntSentinelSuffix)}"`, "g");
  return text.replace(pattern, "$1");
}

/** `text`, a JSON document (or a JSON string cached inside one), parsed with big integers intact. */
function parseJson(text) {
  return JSON.parse(protectBigInts(text));
}

/** `value` stringified with the big integers protectBigInts/JSON.parse left as sentinels restored. */
function stringifyJson(value) {
  return restoreBigInts(JSON.stringify(value, null, 2));
}

// ---- --selftest: round-trips Int64 MaxValue/MinValue through parseJson/stringifyJson -----------
// restoreBigInts used to capture (\d+), which cannot match the leading "-" a negative sentinel
// (Int64 MinValue) carries, so a negative big integer came back out as a quoted string still
// holding the NUL escape sequence rather than a bare number, and Studio answered
// ErrOpeningDocument_UnknownError on import. Run before anything else touches a .msapp, with no
// path argument required and no lock or file-existence checks passed first.
if (process.argv.includes("--selftest")) {
  const text = `{
  "MaxValue": 9223372036854775807,
  "MinValue": -9223372036854775808
}`;
  const roundTripped = stringifyJson(parseJson(text));
  if (roundTripped !== text) {
    console.error("patch-msapp --selftest: FAIL, Int64 MaxValue/MinValue did not round-trip unchanged.");
    console.error(`  input:  ${JSON.stringify(text)}`);
    console.error(`  output: ${JSON.stringify(roundTripped)}`);
    process.exit(1);
  }
  console.log("patch-msapp --selftest: PASS, Int64 MaxValue/MinValue round-trip through parseJson/stringifyJson unchanged.");
  process.exit(0);
}

// ---- refuse to run under an import -------------------------------------------------------------
// scripts/import-app.mjs holds power/canvas/.import.lock for the length of a round trip and passes
// WAYPOINT_IMPORT=1 to the steps it runs itself. Any other run while the lock is there would repack
// the .msapp underneath the import.
const lockFile = join(root, "power", "canvas", ".import.lock");
if (existsSync(lockFile) && process.env.WAYPOINT_IMPORT !== "1") {
  console.error(`patch-msapp: an import is in progress (${lockFile}); not patching the .msapp.`);
  process.exit(1);
}

/** `entry`'s text out of `msapp`, parsed as JSON with big integers intact, or null when absent. */
function readJsonEntry(msapp, entry) {
  const text = readEntry(msapp, entry);
  return text === null ? null : parseJson(text);
}

/** `value` written back over `entry` in `msapp`, at `eol`, with big integers restored to numbers. */
function writeJsonEntry(msapp, entry, value, eol) {
  writeEntry(msapp, entry, stringifyJson(value).replace(/\n/g, eol ?? "\n"));
}

/** Sample data sources no formula reads, dropped from the pack every time. */
const unusedDataSources = ["SpatialServices", "SpatialServices_1"];

/** The settings this script owns, as they must read after the patch. */
const settings = {
  DocumentLayoutScaleToFit: false,
  DocumentLayoutMaintainAspectRatio: false,
  DocumentLayoutLockOrientation: false,
  DefaultConnectedDataSourceMaxGetRowsCount: 2000,
};

// The metadata rewrite is off by default: Studio owns package metadata (power/decisions.md), and
// reconcileMetadata (and, since the SpatialServices drop shares the same entry, the drop too) only
// runs when --reconcile is passed explicitly. Without it References/DataSources.json comes out of
// the run byte-identical to the input.
const cliArgs = process.argv.slice(2);
const noReconcile = !cliArgs.includes("--reconcile");
const msapp = resolve(root, cliArgs.find((arg) => arg !== "--reconcile") ?? join("power", "canvas", "Waypoint.build.msapp"));
if (!existsSync(msapp)) {
  console.error(`patch-msapp: no .msapp at ${msapp}.`);
  process.exit(1);
}

/**
 * The records in `download`'s copy of a JSON entry that name `component` and are not in the build's
 * copy yet, merged into the build's arrays. The entry is rewritten from its own parsed JSON, at the
 * line ending it came with, so nothing but the added records changes.
 */
function mergeRecords(entry, component, download) {
  const mine = readJsonEntry(msapp, entry);
  const theirs = readJsonEntry(download, entry);
  let added = 0;
  for (const [key, value] of Object.entries(theirs)) {
    if (!Array.isArray(value)) continue;
    if (!Array.isArray(mine[key])) mine[key] = [];
    const have = new Set(mine[key].map((record) => JSON.stringify(record)));
    for (const record of value) {
      const text = JSON.stringify(record);
      if (!declaresName(record, component) || have.has(text)) continue;
      mine[key].push(record);
      have.add(text);
      added += 1;
    }
  }
  if (added > 0) {
    const eol = readEntry(msapp, entry).includes("\r\n") ? "\r\n" : "\n";
    writeJsonEntry(msapp, entry, mine, eol);
  }
  return added;
}

/**
 * `component`'s CustomControl record, taken from `download`'s Properties.json and merged into the
 * build's own LocalDatabaseReferences. The record sits under a reference key ("default.cds") that
 * carries the app's data sources too, so only the components array is touched; a reference key the
 * build has not got at all is carried whole. Returns what was done, or null when nothing was.
 */
function carryCustomControl(component, download) {
  const theirs = customControlRecords(download).filter(({ record }) => record.Identifier === component);
  if (theirs.length === 0) return null;
  const text = readEntry(msapp, entryName);
  const properties = parseJson(text);
  const references = parseJson(properties.LocalDatabaseReferences ?? "{}");
  const downloadReferences = parseJson(parseJson(readEntry(download, entryName)).LocalDatabaseReferences ?? "{}");
  let added = 0;
  const carriedKeys = [];
  for (const { key, record } of theirs) {
    if (!references[key]) {
      references[key] = downloadReferences[key];
      carriedKeys.push(key);
      added += 1;
      continue;
    }
    if (!Array.isArray(references[key].components)) references[key].components = [];
    if (references[key].components.some((mine) => JSON.stringify(mine) === JSON.stringify(record))) continue;
    references[key].components.push(record);
    carriedKeys.push(key);
    added += 1;
  }
  if (added === 0) return null;
  properties.LocalDatabaseReferences = stringifyJson(references);
  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  writeJsonEntry(msapp, entryName, properties, eol);
  return `merged ${added} CustomControl record(s) into ${entryName} LocalDatabaseReferences ${carriedKeys.join(", ")}`;
}

/** The catalogue's display name per logical column name, per table. */
function catalogueColumns() {
  const catalogue = JSON.parse(readFileSync(columnsPath, "utf8"));
  return new Map(
    catalogue.tables.map((table) => [table.logical, new Map(table.columns.map((column) => [column.logical, column.display]))]),
  );
}

/** A Dataverse label record rewritten to `display`. True when it did not already read that way. */
function setLabel(label, display) {
  let changed = false;
  for (const localized of label?.LocalizedLabels ?? []) {
    if (localized.Label !== display) {
      localized.Label = display;
      changed = true;
    }
  }
  if (label?.UserLocalizedLabel && label.UserLocalizedLabel.Label !== display) {
    label.UserLocalizedLabel.Label = display;
    changed = true;
  }
  return changed;
}

/**
 * Every wp_ table in `sources` reconciled against the catalogue: each wp_ column's DisplayName,
 * inside the entry's own TableDefinition > EntityMetadata > Attributes, and that column's entry in
 * the entry's NativeCDSDataSourceInfoNameMapping, set to the catalogue's display name for the same
 * logical name. A system column (its logical name is not a wp_ one) is skipped: the environment is
 * the truth for those, not the catalogue, so rewriting one would make the package disagree with
 * Dataverse. A column the catalogue has and the package has no attribute record for is reported
 * rather than added: an attribute record is a whole Dataverse AttributeMetadata document, down to
 * its MetadataId, and nothing here can write one the platform would accept. Returns what changed.
 */
function reconcileMetadata(sources) {
  const byTable = catalogueColumns();
  const lines = [];
  const absent = [];
  const perTable = new Map();
  for (const source of sources.DataSources ?? []) {
    if (source.Type !== "NativeCDSDataSourceInfo") continue;
    const table = source.LogicalName;
    const wanted = typeof table === "string" && table.startsWith("wp_") ? byTable.get(table) : null;
    if (!wanted) continue;
    const definition = parseJson(source.TableDefinition);
    const entity = parseJson(definition.EntityMetadata);
    const attributes = new Map((entity.Attributes ?? []).map((attribute) => [attribute.LogicalName, attribute]));
    const mapping = source.NativeCDSDataSourceInfoNameMapping ?? {};
    let columns = 0;
    for (const [logical, display] of wanted) {
      if (!logical.startsWith("wp_")) continue;
      const attribute = attributes.get(logical);
      if (!attribute) {
        absent.push(`${table}.${logical}`);
        continue;
      }
      const was = attribute.DisplayName?.UserLocalizedLabel?.Label ?? attribute.DisplayName?.LocalizedLabels?.[0]?.Label;
      let changed = setLabel(attribute.DisplayName, display);
      if (changed) lines.push(`${table}.${logical}: "${was}" -> "${display}"`);
      if (Object.hasOwn(mapping, logical) && mapping[logical] !== display) {
        lines.push(`${table}.${logical} name mapping: "${mapping[logical]}" -> "${display}"`);
        mapping[logical] = display;
        changed = true;
      }
      if (changed) columns += 1;
    }
    if (columns > 0) {
      definition.EntityMetadata = stringifyJson(entity);
      source.TableDefinition = stringifyJson(definition);
      perTable.set(table, columns);
    }
  }
  const rewritten = [...perTable.values()].reduce((total, count) => total + count, 0);
  return { lines, absent, perTable, rewritten };
}

// ---- rewrite the four values, leaving the rest of the text alone -----------------------------
const before = readEntry(msapp, entryName);
if (before === null) {
  console.error(`patch-msapp: the .msapp has no ${entryName}.`);
  process.exit(1);
}
let after = before;
const changed = [];
for (const [key, value] of Object.entries(settings)) {
  const pattern = new RegExp(`("${key}"\\s*:\\s*)(true|false|-?\\d+(?:\\.\\d+)?)`);
  const match = after.match(pattern);
  if (!match) {
    console.error(`patch-msapp: ${entryName} has no ${key} to patch.`);
    process.exit(1);
  }
  changed.push(`${key}: ${match[2]} -> ${value}`);
  after = after.replace(pattern, `$1${value}`);
}

if (after === before) {
  console.log(`patch-msapp: ${entryName} already carries all four settings; nothing written.`);
} else {
  writeEntry(msapp, entryName, after);
}

// ---- drop the two unused sample data sources, and reconcile table metadata ---------------------
// The entry is rewritten from its own parsed JSON, at the indentation and line ending it came
// with, so nothing but the changed entries changes. The drop and the reconcile share this one
// entry, so without --reconcile both are skipped, unread and unwritten, rather than risk leaving
// the drop applied on its own: the entry then comes out byte-identical to the input.
let dropped = 0;
let kept = [];
let metadata = { lines: [], absent: [], perTable: new Map(), rewritten: 0 };
if (noReconcile) {
  console.log(`  ${dataSourcesEntry}: rewrite off (pass --reconcile to turn it on); left byte-identical to the input (no drop, no metadata rewrite)`);
} else {
  const sourcesText = readEntry(msapp, dataSourcesEntry);
  if (sourcesText === null) {
    console.error(`patch-msapp: the .msapp has no ${dataSourcesEntry}.`);
    process.exit(1);
  }
  const sources = parseJson(sourcesText);
  kept = (sources.DataSources ?? []).filter((entry) => !unusedDataSources.includes(entry.Name));
  dropped = (sources.DataSources ?? []).length - kept.length;
  if (dropped > 0) sources.DataSources = kept;

  metadata = reconcileMetadata(sources);

  if (dropped > 0 || metadata.rewritten > 0) {
    const eol = sourcesText.includes("\r\n") ? "\r\n" : "\n";
    writeEntry(msapp, dataSourcesEntry, stringifyJson(sources).replace(/\n/g, eol));
  }
}

// ---- carry the code component registrations pack cannot write --------------------------------
const required = codeComponentNames(readTextUnder(msapp, "Src/"));
const registration = [];
const unregistered = [];
const download = skeletonDownload(root);
for (const component of required) {
  if (isRegistered(msapp, component)) {
    registration.push(`${component}: already registered`);
    continue;
  }
  if (!download) {
    registration.push(`${component}: NOT registered, and there is no download to take it from`);
    unregistered.push(component);
    continue;
  }
  const carriers = registrationEntries(download, component);
  const resources = componentResourceEntries(download, component);
  if (!isRegistered(download, component)) {
    registration.push(`${component}: NOT registered, and ${basename(download)} carries no registration either`);
    unregistered.push(component);
    continue;
  }
  let carried = 0;
  const merged = carryCustomControl(component, download);
  if (merged) {
    registration.push(`${component}: ${merged} from ${basename(download)}`);
    carried += 1;
  }
  const present = new Set(listEntries(msapp));
  for (const entry of [...resources, ...carriers.filter((entry) => !resources.includes(entry))]) {
    if (!present.has(entry)) {
      copyEntry(download, entry, msapp);
      registration.push(`${component}: copied ${entry} from ${basename(download)}`);
      carried += 1;
    } else if (entry.endsWith(".json")) {
      const added = mergeRecords(entry, component, download);
      registration.push(`${component}: merged ${added} record(s) into ${entry} from ${basename(download)}`);
      carried += 1;
    } else {
      registration.push(`${component}: ${entry} is in both and is not JSON; left as packed`);
    }
  }
  if (!isRegistered(msapp, component)) {
    registration.push(`${component}: NOT registered, even after carrying ${carried} entry(ies) across`);
    unregistered.push(component);
  }
}

console.log(`patch-msapp: ${msapp}`);
for (const line of changed) console.log(`  ${line}`);
if (!noReconcile) {
  console.log(
    dropped > 0
      ? `  ${dataSourcesEntry}: dropped ${unusedDataSources.join(", ")}, ${kept.length} data sources left`
      : `  ${dataSourcesEntry}: nothing to drop, ${kept.length} data sources`,
  );
  console.log(
    metadata.rewritten === 0
      ? `  ${dataSourcesEntry}: every wp_ column display name already matches ${basename(columnsPath)}`
      : `  ${dataSourcesEntry}: ${metadata.rewritten} column display name(s) rewritten from ${basename(columnsPath)} on ` +
        [...metadata.perTable].map(([table, count]) => `${table} (${count})`).join(", "),
  );
  for (const line of metadata.lines) console.log(`    ${line}`);
  if (metadata.absent.length > 0) {
    for (const column of metadata.absent) {
      console.error(`patch-msapp: ${column}: column absent from package metadata; refresh the skeleton.`);
    }
    process.exit(1);
  }
}
console.log(
  required.length === 0
    ? "  code components: none referenced in Src"
    : `  code components referenced in Src: ${required.join(", ")}`,
);
for (const line of registration) console.log(`  ${line}`);

if (unregistered.length > 0) {
  console.error(
    `patch-msapp: no registration for ${unregistered.join(", ")}, in either References/Templates.json's ` +
    "PcfTemplates or Properties.json's CustomControl records with a Resources/Controls bundle; " +
    "an import would answer PA2401 Unknown Code Component.",
  );
  process.exit(1);
}
