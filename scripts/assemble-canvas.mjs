// Assemble the canvas app sources for the proving slice.
//
// The Power Platform CLI unpacks the app into power/canvas/source in the SourceCode layout: a Src
// folder of *.pa.yaml files (screens named scr<Name>.pa.yaml, components one file per component
// under Src/Components/) and a Waypoint.msapr. This script copies that skeleton to
// power/canvas/build and writes our own YAML into its Src, so the build is one command and the
// authored sources in power/app stay the only place anything is edited. It writes exactly the
// file names and folder structure the skeleton uses, replacing what is already there rather than
// adding files beside it, so Studio's own layout and this script's output never disagree.
//
//   node scripts/assemble-canvas.mjs
//
// What it writes into build/Src:
//   App.pa.yaml               the blank app's App properties, then ours: StartScreen, OnStart, Formulas
//   scrCommand.pa.yaml        power/app/Screens/Command.pa.yaml, unchanged
//   scrWork.pa.yaml           power/app/Screens/Work.pa.yaml, unchanged
//   scrWorkItem.pa.yaml       power/app/Screens/WorkItem.pa.yaml, unchanged
//   Screen1.pa.yaml           the skeleton's own screen, copied through untouched
//   Components/cmp*.pa.yaml   one file per sliced component definition
//   _EditorState.pa.yaml      the screen and component order
//
// Screen1 was Craig's configured sample of every modern control; the facts it demonstrated are now
// captured in power/canvas/CONTROLS.md, so it is no longer copied into the build (see keepScreen1
// below to bring it back). power/canvas/source/Src/Screen1.pa.yaml stays on disk as reference.
// Screen2, the older sample power/canvas/sample3 keeps, is removed. _EditorState's ScreensOrder is
// written from the slice's own list plus Screen1 only when it is present in build/Src, so the two
// never disagree.
//
// App.pa.yaml and Formulas.pa.yaml are two halves of one App entity and a named formula may be
// defined once only, so the Formulas blocks are merged by name with Formulas.pa.yaml as the
// authority, which is the rule both files' headers state. Formulas.frontdoor.yaml is a third half,
// merged only when includeFrontDoor in power/canvas/flags.json is true, with scrFrontDoor.pa.yaml
// beside it.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { compileTables } from "./compile-tables.mjs";
import { pacCmd } from "./lib/pac.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "power", "app");
const canvasDir = join(root, "power", "canvas");
const sourceDir = join(canvasDir, "source");
const downloadsDir = join(canvasDir, "downloads");
const buildDir = join(canvasDir, "build");
const srcDir = join(buildDir, "Src");

const pac = pacCmd();

// ---- refuse to run under an import -------------------------------------------------------------
// scripts/import-app.mjs holds power/canvas/.import.lock for the length of a round trip and passes
// WAYPOINT_IMPORT=1 to the steps it runs itself. Another assemble while that lock is there rewrites
// build/Src underneath the import that is being polled for, and the poll never converges.
const lockFile = join(canvasDir, ".import.lock");
if (existsSync(lockFile) && process.env.WAYPOINT_IMPORT !== "1") {
  console.error(`assemble-canvas: an import is in progress (${lockFile}); not assembling.`);
  process.exit(1);
}

// ---- refuse a stale skeleton ----------------------------------------------------------------
// A skeleton downloaded before Craig's Dataverse tables were added has no Dataverse entries in
// its DataSources; packing from it overwrites the connections Studio holds. The SourceCode layout
// never carries a DataSources.pa.yaml (Studio rejects one), so the names are read from whichever
// of these is on hand: the datasources.json refresh-skeleton.mjs writes next to the skeleton, or,
// failing that, the newest .msapp under power/canvas/downloads/. `--allow-empty-datasources`
// overrides this, for the proving slice before any table is connected.
const allowEmptyDataSources = process.argv.includes("--allow-empty-datasources");

// ---- refuse a base that did not come from the golden -------------------------------------------
// build/ starts as a copy of source/, and the .msapr in it carries every non-Src entry the pack
// will write: Properties.json, References/*, Controls/*, Components/*, Resources/*. Those entries
// must come from power/canvas/golden/skeleton.msapp, the last package Studio opened, never from an
// environment download (power/canvas/golden/README.md). refresh-skeleton.mjs records which base it
// unpacked in source/base.json; without that record, or with a golden that has changed size since,
// the skeleton is not known-good and the build stops here.
const goldenMsapp = join(canvasDir, "golden", "skeleton.msapp");
const basePath = join(sourceDir, "base.json");
if (!existsSync(basePath)) {
  console.error(
    `assemble-canvas: no ${basePath}; the skeleton was not unpacked from the golden base. ` +
    "Run scripts/refresh-skeleton.mjs.",
  );
  process.exit(1);
}
const base = JSON.parse(readFileSync(basePath, "utf8"));
if (!existsSync(goldenMsapp) || base.golden !== goldenMsapp || base.bytes !== statSync(goldenMsapp).size) {
  console.error(
    `assemble-canvas: the skeleton in ${sourceDir} was unpacked from ${base.golden} (${base.bytes} bytes), ` +
    `which is not the golden base now at ${goldenMsapp}. Run scripts/refresh-skeleton.mjs.`,
  );
  process.exit(1);
}

// ---- the build flags --------------------------------------------------------------------------
// power/canvas/flags.json is the one place either flag is set, so a flip is one edit and both gates
// (this script and scripts/fxcheck.mjs) follow it.
//
// includeGridControl. Studio only accepts a CodeComponent control once the app package already has
// it registered, and that registration only happens when a maker inserts wp_Waypoint.SprintGrid via
// Get more components > Code in Studio itself; refresh-skeleton.mjs then captures the registration
// into power/canvas/source. Until that first-time step has happened, packing scrTimeline.pa.yaml
// with the CodeComponent entry in it fails with PA2401 ("Unknown Code Component"). The registration
// landed on 2026-09-20 and the skeleton carries it, so it is true.
//
// includeFrontDoor. scrFrontDoor reads the Requests, Labs and Teams tables, and none of the three is
// connected in Studio yet (Add data), so a build carrying that screen fails to bind the moment
// Studio opens it. While this flag is false the screen (power/app/Screens.flagged/FrontDoor.pa.yaml,
// outside the Screens folder every other gate globs) is left out of the slice and
// power/app/Formulas.frontdoor.yaml is not merged into the App entity, so neither reaches build/Src,
// and the IncludeFrontDoor named formula stays false so the rail does not list a section that is not
// there. Flip it to true once Craig has added the three tables in Studio and refresh-skeleton.mjs
// has captured them (power/RUNBOOK.md, section 4, "The front door flag").
//
// includeScope. The team-scoped reads narrow through the Team lookup, and wp_team is not connected
// in Studio yet, so the read errors and its IfError handler clears the collection it was meant to
// fill. While this flag is false the two scoped blocks in power/app/App.scope.yaml are left out:
// App.OnStart keeps its plain reads, cmpScope only sets varScopeTeam, and the IncludeScope named
// formula stays false so no screen shows a selector that cannot narrow anything. Flip it to true
// alongside includeFrontDoor once Craig has added the four tables in Studio (power/RUNBOOK.md,
// section 4, "The scope flag").
const flags = JSON.parse(readFileSync(join(canvasDir, "flags.json"), "utf8"));
const includeGridControl = flags.includeGridControl;
const includeFrontDoor = flags.includeFrontDoor;
const includeScope = flags.includeScope;

/** The data source names out of References/DataSources.json inside a downloaded .msapp (a zip). */
function dataSourceNamesFromMsapp(msapp) {
  const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('${msapp.replace(/\\/g, "\\\\")}')
$entry = $zip.Entries | Where-Object { ($_.FullName -replace '\\\\', '/') -eq 'References/DataSources.json' } | Select-Object -First 1
if ($null -ne $entry) {
  $reader = New-Object System.IO.StreamReader($entry.Open())
  $reader.ReadToEnd()
  $reader.Close()
}
$zip.Dispose()
`;
  const psFile = join(downloadsDir, ".read-datasources-guard.ps1");
  writeFileSync(psFile, psScript, "utf8");
  try {
    const out = execFileSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", psFile], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    }).trim();
    if (!out) return [];
    const json = JSON.parse(out);
    return (json.DataSources ?? []).map((entry) => entry.Name);
  } catch (error) {
    return [];
  } finally {
    try {
      rmSync(psFile, { force: true });
    } catch (error) {
      // The .NET zip handle can still be closing; the file is harmless if it lingers.
    }
  }
}

function dataSourceNames() {
  const dsFile = join(sourceDir, "datasources.json");
  if (existsSync(dsFile)) {
    const { names } = JSON.parse(readFileSync(dsFile, "utf8"));
    return names ?? [];
  }
  if (existsSync(downloadsDir)) {
    const msapps = readdirSync(downloadsDir)
      .filter((file) => file.endsWith(".msapp"))
      .map((file) => join(downloadsDir, file))
      .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
    if (msapps.length > 0) return dataSourceNamesFromMsapp(msapps[0]);
  }
  return [];
}

const hasDataverseTable = dataSourceNames().some((name) => name.startsWith("wp_"));
if (!hasDataverseTable && !allowEmptyDataSources) {
  console.error(
    "No wp_ table found among the data source names for power/canvas/source. Run " +
    "scripts/refresh-skeleton.mjs after adding data in Studio, or pass " +
    "--allow-empty-datasources to assemble anyway.",
  );
  process.exit(1);
}

/** The top-level component names in power/app/Components.pa.yaml, in file order. */
function componentNames(text) {
  const names = [];
  for (const line of text.split("\n")) {
    const match = line.match(/^ {2}([A-Za-z][A-Za-z0-9]*):\s*$/);
    if (match) names.push(match[1]);
  }
  return names;
}

/** Screens a flag brings in, authored under power/app/Screens.flagged rather than Screens. */
const flaggedScreens = ["FrontDoor"];

/** The proving slice: Command, the work register, one work item screen, and the components. */
const slice = {
  startScreen: "scrCommand",
  screens: ["Command", "Work", "WorkItem", "Timeline", "Team", "Benefits", "Financials",
            "QuarterClose", "Settings", "Import",
            ...(includeFrontDoor ? ["FrontDoor"] : [])],
  components: componentNames(readFileSync(join(appDir, "Components.pa.yaml"), "utf8")),
};

// ---- warn on a skeleton that carries a component we no longer write ---------------------------
// build/Src starts as a copy of source/Src, so a component file the skeleton still carries but the
// slice no longer defines would otherwise be copied straight back in by the next refresh-skeleton.
// It is pruned from the build below (the same prune the removed-files loop already runs for a
// dropped screen or component), so name it here and carry on rather than stop the assembly.
const sourceComponentsDir = join(sourceDir, "Src", "Components");
const staleComponents = existsSync(sourceComponentsDir)
  ? readdirSync(sourceComponentsDir)
      .filter((file) => file.endsWith(".pa.yaml"))
      .filter((file) => !slice.components.includes(file.replace(/\.pa\.yaml$/, "")))
  : [];
for (const file of staleComponents) {
  console.warn(
    `assemble-canvas: WARN pruning stale component ${file.replace(/\.pa\.yaml$/, "")} from skeleton; ` +
    "it will disappear from the environment on this import.",
  );
}

/** The header every unpacked file carries. Studio writes it; keep it so a round trip is quiet. */
const header = readFileSync(join(sourceDir, "Src", "App.pa.yaml"), "utf8")
  .split("\n")
  .filter((line) => line.startsWith("#"))
  .join("\n") + "\n";

const read = (file) => readFileSync(file, "utf8").replace(/\r\n/g, "\n");

/** The lines of a `Name: |` block scalar, dedented to column 0. */
function block(text, property) {
  const lines = text.split("\n");
  const at = lines.findIndex((line) => new RegExp(`^(\\s*)${property}: \\|\\s*$`).test(line));
  if (at < 0) return [];
  const indent = lines[at].length - lines[at].trimStart().length + 2;
  const out = [];
  for (const line of lines.slice(at + 1)) {
    if (line.trim() === "") { out.push(""); continue; }
    if (line.length - line.trimStart().length < indent) break;
    out.push(line.slice(indent));
  }
  while (out.length > 0 && out[out.length - 1] === "") out.pop();
  return out;
}

/** The one-line properties of an entity, as `Name: =formula` pairs at the given indent. */
function inlineProperties(text, indent) {
  const pairs = new Map();
  for (const line of text.split("\n")) {
    if (line.startsWith("#") || line.trim() === "") continue;
    const match = line.match(new RegExp(`^ {${indent}}([A-Za-z][A-Za-z0-9]*): (=.*)$`));
    if (match) pairs.set(match[1], match[2]);
  }
  return pairs;
}

/**
 * A Formulas block split into its definitions, keyed by name. A definition is a line starting at
 * column 0 that names something, plus every indented line under it; the comments above it come
 * with it.
 */
function definitions(lines) {
  const found = new Map();
  let comments = [];
  let name = null;
  let body = [];
  const flush = () => {
    if (name) found.set(name, [...comments, ...body]);
    comments = [];
    body = [];
    name = null;
  };
  for (const line of lines) {
    if (line.trim() === "=") continue;
    const starts = /^[A-Za-z_][A-Za-z0-9_]*\s*(\(|:|=)/.test(line);
    if (line.startsWith("//") || line.trim() === "") {
      if (name && /^\s/.test(line) === false && line.startsWith("//")) {
        // A comment at column 0 belongs to whatever comes next, not to what came before.
        flush();
        comments.push(line);
      } else if (name) {
        body.push(line);
      } else {
        comments.push(line);
      }
      continue;
    }
    if (starts) {
      flush();
      name = line.match(/^([A-Za-z_][A-Za-z0-9_]*)/)[1];
      body.push(line);
      continue;
    }
    if (name) body.push(line);
    else comments.push(line);
  }
  flush();
  return found;
}

/**
 * The team-scoped variants, from power/app/App.scope.yaml: its OnStart block is the whole
 * Concurrent statement App.OnStart otherwise reads plain, and its OnChange block is the whole
 * OnChange body cmpScope otherwise carries as the Set alone. Both are substituted only when
 * includeScope is true, the same shape as the includeFrontDoor merge below.
 */
const scopeVariants = () => read(join(appDir, "App.scope.yaml"));

/** App.OnStart's Concurrent statement replaced by the scoped one. */
function withScopedReads(lines, scoped) {
  const start = lines.indexOf("Concurrent(");
  const end = lines.findIndex((line, at) => at > start && line === ");");
  if (start < 0 || end < 0) throw new Error("App.pa.yaml OnStart has no Concurrent block to scope");
  return [...lines.slice(0, start), ...scoped, ...lines.slice(end + 1)];
}

/** A `Name: |` block scalar's body replaced, re-indented to the block's own body indent. */
function replaceBlock(text, property, lines) {
  const out = text.split("\n");
  const at = out.findIndex((line) => new RegExp(`^(\\s*)${property}: \\|\\s*$`).test(line));
  if (at < 0) throw new Error(`no ${property} block to replace`);
  const indent = out[at].length - out[at].trimStart().length + 2;
  let end = at + 1;
  while (end < out.length) {
    const line = out[end];
    if (line.trim() !== "" && line.length - line.trimStart().length < indent) break;
    end += 1;
  }
  const body = lines.map((line) => (line.trim() === "" ? "" : " ".repeat(indent) + line));
  out.splice(at + 1, end - (at + 1), ...body);
  return out.join("\n");
}

/** Trailing blank lines make the merged block untidy; a definition ends where its text ends. */
const tidy = (lines) => {
  const out = [...lines];
  while (out.length > 0 && out[out.length - 1].trim() === "") out.pop();
  return out;
};

/**
 * scrTimeline's tlSprintGrid entry, the Control: CodeComponent that binds wp_Waypoint.SprintGrid.
 * Removed whole (its Control line and every property under it) when includeGridControl is false;
 * the fallback galleries (tlSprintHead, tlSprintRows) sit beside it and are left untouched.
 */
function stripCodeComponent(text) {
  const lines = text.split("\n");
  const start = lines.findIndex((line) => /^\s*- tlSprintGrid:\s*$/.test(line));
  if (start < 0) return text;
  const indent = lines[start].length - lines[start].trimStart().length;
  let end = start + 1;
  while (end < lines.length) {
    const line = lines[end];
    if (line.trim() === "") { end += 1; continue; }
    if (line.length - line.trimStart().length <= indent) break;
    end += 1;
  }
  while (end > start && lines[end - 1].trim() === "") end -= 1;
  lines.splice(start, end - start);
  return lines.join("\n");
}

/** The named component definitions kept, in the slice's order. */
function sliceComponents(text, names) {
  const lines = text.split("\n");
  const blocks = new Map();
  let current = null;
  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^ {2}([A-Za-z][A-Za-z0-9]*):\s*$/);
    if (match) {
      current = { name: match[1], lines: [lines[i]] };
      blocks.set(match[1], current);
      continue;
    }
    if (current) current.lines.push(lines[i]);
  }
  return names.map((name) => {
    const found = blocks.get(name);
    if (!found) throw new Error(`Components.pa.yaml has no ${name}`);
    return tidy(found.lines).join("\n");
  });
}

// ---- the skeleton --------------------------------------------------------------------------
rmSync(buildDir, { recursive: true, force: true });
mkdirSync(buildDir, { recursive: true });
cpSync(sourceDir, buildDir, { recursive: true });
rmSync(join(srcDir, "datasources.json"), { force: true });
rmSync(join(buildDir, "base.json"), { force: true });
rmSync(join(srcDir, "Screen2.pa.yaml"), { force: true });
// Craig's control sample has served its purpose; the facts it captured live in
// power/canvas/CONTROLS.md and power/canvas/source/Src/Screen1.pa.yaml stays on disk as reference.
// Flip this to true to put Screen1 back in the build.
const keepScreen1 = false;
if (!keepScreen1) rmSync(join(srcDir, "Screen1.pa.yaml"), { force: true });
// Older layouts (or a stale skeleton) may still carry the unprefixed screen names, a single
// Components.pa.yaml, or a DataSources.pa.yaml; the skeleton's own names are the ones kept, so
// these are removed rather than left beside their replacements.
for (const screen of slice.screens) {
  rmSync(join(srcDir, `${screen}.pa.yaml`), { force: true });
}
rmSync(join(srcDir, "Components.pa.yaml"), { force: true });

// ---- App.pa.yaml ---------------------------------------------------------------------------
const blankApp = read(join(sourceDir, "Src", "App.pa.yaml"));
const ourApp = read(join(appDir, "App.pa.yaml"));
const ourFormulas = read(join(appDir, "Formulas.pa.yaml"));

// OnStart reads the tables plain; the scope flag swaps its Concurrent statement for the scoped one.
const onStart = includeScope
  ? withScopedReads(block(ourApp, "OnStart"), block(scopeVariants(), "OnStart"))
  : block(ourApp, "OnStart");

const appOnly = definitions(block(ourApp, "Formulas"));
const engine = definitions(block(ourFormulas, "Formulas"));
// The front door's own region is a third file, merged only when the flag above is true; the flag
// also flips IncludeFrontDoor, which is what the rail reads to decide whether to list the section.
const frontDoor = includeFrontDoor
  ? definitions(block(read(join(appDir, "Formulas.frontdoor.yaml")), "Formulas"))
  : new Map();
const merged = [];
for (const [name, lines] of appOnly) {
  if (!engine.has(name) && !frontDoor.has(name)) merged.push(tidy(lines).join("\n"));
}
for (const [name, lines] of engine) {
  const definition = tidy(lines).join("\n");
  if (name === "IncludeFrontDoor" && includeFrontDoor) {
    merged.push(definition.replace(/IncludeFrontDoor\s*=\s*false;/, "IncludeFrontDoor = true;"));
  } else if (name === "IncludeScope" && includeScope) {
    merged.push(definition.replace(/IncludeScope\s*=\s*false;/, "IncludeScope = true;"));
  } else {
    merged.push(definition);
  }
}
for (const lines of frontDoor.values()) merged.push(tidy(lines).join("\n"));

const indent = (text, spaces) => text
  .split("\n")
  .map((line) => (line.trim() === "" ? "" : " ".repeat(spaces) + line))
  .join("\n");

// App.pa.yaml is one App entity's Properties, so every key is merged by name with ours winning:
// StartScreen, OnStart and Formulas are always ours (the skeleton's copies are whatever Studio last
// saved for the previous import), and anything else the skeleton carries as an inline property
// (Theme, say) is kept because our own App.pa.yaml does not set it.
const written = new Set(["StartScreen", "OnStart", "Formulas"]);
const kept = [...inlineProperties(blankApp, 4)]
  .filter(([name]) => !written.has(name))
  .map(([name, formula]) => `    ${name}: ${formula}`)
  .join("\n");

const appYaml = [
  header,
  "App:",
  "  Properties:",
  kept,
  `    StartScreen: =${slice.startScreen}`,
  "",
  "    OnStart: |",
  indent(onStart.join("\n"), 6),
  "",
  "    Formulas: |",
  indent(["=", ...merged.flatMap((definition) => [definition, ""])].join("\n"), 6).replace(/\n+$/, ""),
  "",
].join("\n");
writeFileSync(join(srcDir, "App.pa.yaml"), appYaml, "utf8");

// ---- one file per screen, named as Studio names them: scr<Name>.pa.yaml ---------------------
for (const screen of slice.screens) {
  let text = read(join(appDir, flaggedScreens.includes(screen) ? "Screens.flagged" : "Screens", `${screen}.pa.yaml`));
  if (screen === "Timeline" && !includeGridControl) text = stripCodeComponent(text);
  writeFileSync(join(srcDir, `scr${screen}.pa.yaml`), `${header}${text}`, "utf8");
}

// ---- the component definitions, one file per component under Src/Components/, as Studio saves
// them -------------------------------------------------------------------------------------------
const componentsDir = join(srcDir, "Components");
mkdirSync(componentsDir, { recursive: true });
const componentsText = read(join(appDir, "Components.pa.yaml"));
const componentBlocks = sliceComponents(componentsText, slice.components);
for (const [index, name] of slice.components.entries()) {
  // cmpScope only sets varScopeTeam; the scope flag puts the reload back under the Set.
  const definition = name === "cmpScope" && includeScope
    ? replaceBlock(componentBlocks[index], "OnChange", block(scopeVariants(), "OnChange"))
    : componentBlocks[index];
  writeFileSync(
    join(componentsDir, `${name}.pa.yaml`),
    `${header}ComponentDefinitions:\n${definition}\n`,
    "utf8",
  );
}

// ---- remove what the slice no longer generates ------------------------------------------------
// Everything above overwrites; nothing above deletes. A screen or component dropped from power/app
// would otherwise survive in build/Src as whatever the skeleton last carried, and Studio would keep
// validating it. The build holds the slice's files and nothing else.
const removedFiles = [];
for (const file of readdirSync(componentsDir)) {
  if (!file.endsWith(".pa.yaml")) continue;
  if (slice.components.includes(file.replace(/\.pa\.yaml$/, ""))) continue;
  rmSync(join(componentsDir, file), { force: true });
  removedFiles.push(`Components/${file}`);
}
const sliceScreenFiles = new Set(slice.screens.map((screen) => `scr${screen}.pa.yaml`));
for (const file of readdirSync(srcDir)) {
  if (!/^scr.*\.pa\.yaml$/.test(file) || sliceScreenFiles.has(file)) continue;
  rmSync(join(srcDir, file), { force: true });
  removedFiles.push(file);
}

// ---- record what was pruned -------------------------------------------------------------------
// scripts/msappcheck.mjs reads this to tell a deliberate prune apart from a real regression when it
// compares the build's .msapp against the reference; written every run, empty when nothing was
// pruned, so a prune that stops happening stops being excused.
writeFileSync(
  join(buildDir, "pruned.json"),
  JSON.stringify(removedFiles.map((file) => `Src/${file}`), null, 2) + "\n",
  "utf8",
);

// ---- the data sources ------------------------------------------------------------------------
// Nothing is written. Studio rejects a DataSources file in the SourceCode layout ("PA1022: The
// top-level object kind 'DataSource' is not supported for the current action"), so the tables are
// connected once in Studio with Add data. power/app/DataSources.reference.yaml records which
// tables and under which names, and power/canvas/README.md says when to do it.
rmSync(join(srcDir, "DataSources.pa.yaml"), { force: true });

// ---- the editor state ------------------------------------------------------------------------
const screensOrder = [
  ...slice.screens.map((screen) => `    - scr${screen}`),
  ...(existsSync(join(srcDir, "Screen1.pa.yaml")) ? ["    - Screen1"] : []),
].join("\n");
const componentsOrder = slice.components.map((name) => `    - ${name}`).join("\n");
writeFileSync(
  join(srcDir, "_EditorState.pa.yaml"),
  `${header}EditorState:\n  ScreensOrder:\n${screensOrder}\n  ComponentDefinitionsOrder:\n${componentsOrder}\n`,
  "utf8",
);

// ---- the table geometry ------------------------------------------------------------------------
// Column widths are declared once, in power/canvas/tables.json, and written into the assembled
// screens here: a head cell and its row cell only read as one grid while they carry the same share,
// minimum and running sum, and eleven hand-written sums per table is eleven chances to drift.
// power/app keeps the cells and everything else about them (power/RUNBOOK.md, "Table columns").
const tableReport = compileTables(srcDir, join(canvasDir, "tables.json"), { apply: true });
for (const table of tableReport) {
  for (const name of table.missing) {
    console.warn(`assemble-canvas: WARN table ${table.id} names ${name}, which is not in ${table.screen}.`);
  }
}

console.log(`Assembled ${srcDir}`);
console.log(`  base       ${goldenMsapp} (every non-Src entry)`);
console.log(`  screens    ${slice.screens.map((s) => `scr${s}`).join(", ")}`);
console.log(`  components ${slice.components.join(", ")}`);
console.log(`  formulas   ${merged.length} named formulas and functions`);
console.log(`  front door ${includeFrontDoor ? "in" : "out"} (includeFrontDoor)`);
console.log(`  scope      ${includeScope ? "in" : "out"} (includeScope)`);
if (removedFiles.length > 0) console.log(`  removed    ${removedFiles.join(", ")}`);
console.log(`  tables     ${tableReport.map((table) => `${table.id} (${table.cells})`).join(", ")}`);

// ---- the strict YAML gate --------------------------------------------------------------------
// pac canvas pack does not parse the YAML it packs; a file that is not even well formed packs
// cleanly and only fails when Studio opens the app. scripts/yamlcheck.mjs parses every file this
// script just wrote with a real YAML parser, so a syntax fault (a `//` comment inside a mapping,
// say) fails the build here instead.
const yamlcheck = spawnSync(
  process.execPath,
  [join(root, "scripts", "yamlcheck.mjs"), "--yaml", srcDir],
  { encoding: "utf8", stdio: "inherit" },
);
if (yamlcheck.status !== 0) {
  console.error("assemble-canvas: yamlcheck failed; the build is not valid YAML.");
  process.exit(1);
}
