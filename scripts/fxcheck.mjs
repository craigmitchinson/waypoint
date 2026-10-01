// The canvas app's Power Fx, type-checked against the real Dataverse columns, offline.
//
//   node scripts/fxcheck.mjs [--app power/app] [--modern tools/fxcheck/modern-controls.json]
//                            [--datasources power/canvas/source/datasources.json] [--all-tables] [--json]
//
// This is the binding half of the job scripts/check-formulas.mjs used to do by hand: every formula
// in power/app is bound by Microsoft's own Power Fx compiler (tools/fxcheck, Microsoft.PowerFx.Core)
// against a symbol table built from power/canvas/columns.json. A column that is not on the table, a
// column read as the wrong type, a name nothing defines and a call with the wrong arguments are all
// reported here, with the file, the formula and the line. A table is only available to a formula if
// Studio has connected it with Add data, which is what power/canvas/source/datasources.json records;
// --all-tables lifts that check for an experiment.
//
// This script reads the sources and hands the tool one formula per unit; the tool does the types.
// Nothing is imported until it reports zero errors (power/canvas/README.md).

import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const appDir = argOf("--app") ?? flaggedAppDir(join(root, "power", "app"));
const columns = argOf("--columns") ?? join(root, "power", "canvas", "columns.json");
const modern = argOf("--modern") ?? join(root, "tools", "fxcheck", "modern-controls.json");
const dataSources = argOf("--datasources") ?? join(root, "power", "canvas", "source", "datasources.json");
const allTables = args.includes("--all-tables");
const asJson = args.includes("--json");

function argOf(name) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

/**
 * The app the flags say to check. power/canvas/flags.json is the one place includeFrontDoor is set,
 * and both gates follow it: while it is false power/app is checked as it stands (the flagged screen
 * sits in power/app/Screens.flagged, outside the Screens folder this script reads); while it is true
 * a throwaway copy of power/app is built with Screens.flagged/FrontDoor.pa.yaml in Screens/,
 * Formulas.frontdoor.yaml's definitions appended to Formulas.pa.yaml and IncludeFrontDoor true, so
 * the flip is one edit and this checks exactly what scripts/assemble-canvas.mjs assembles.
 */
function flaggedAppDir(dir) {
  const flagsPath = join(root, "power", "canvas", "flags.json");
  if (!existsSync(flagsPath)) return dir;
  if (!JSON.parse(readFileSync(flagsPath, "utf8")).includeFrontDoor) return dir;

  const temp = join(mkdtempSync(join(tmpdir(), "fxcheck-app-")), "app");
  cpSync(dir, temp, { recursive: true });
  cpSync(join(dir, "Screens.flagged"), join(temp, "Screens"), { recursive: true });

  const frontDoor = readFileSync(join(dir, "Formulas.frontdoor.yaml"), "utf8").split(/\r?\n/);
  const at = frontDoor.findIndex((line) => /^\s*Formulas: \|\s*$/.test(line));
  const body = frontDoor.slice(at + 1).filter((line, i) => !(i === 0 && line.trim() === "="));
  const formulas = readFileSync(join(temp, "Formulas.pa.yaml"), "utf8")
    .replace(/IncludeFrontDoor\s*=\s*false;/, "IncludeFrontDoor = true;")
    .replace(/\s*$/, "\n");
  writeFileSync(join(temp, "Formulas.pa.yaml"), `${formulas}\n${body.join("\n")}\n`, "utf8");
  return temp;
}

// ---------------------------------------------------------------------------
// The sources. Every `Prop: =formula` and `Prop: |` block, with the line it starts on and its
// original indentation, so a position the tool reports is a position in the file.
// ---------------------------------------------------------------------------
const RESERVED = new Set([
  "Screens", "Properties", "Children", "Control", "Variant", "App", "ComponentDefinitions",
  "Components", "CustomProperties", "PropertyKind", "DataType", "Default", "Parameters",
  "ReturnType", "Direction", "RoundTripDefault", "Description", "DisplayName",
]);

function blank(text) {
  return text.replace(/[^\n]/g, " ");
}

function readFile(path, label, units, controls) {
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  const stack = []; // { indent, key, isControl, control, gallery, items }
  const pending = []; // properties waiting for their gallery's Items

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "" || /^\s*#/.test(line)) continue;
    const indent = line.match(/^\s*/)[0].length;
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();

    const key = /^\s*-?\s*([A-Za-z_][\w]*)\s*:/.exec(line);
    if (!key) continue;
    const name = key[1];
    const value = line.slice(key[0].length);
    const parent = stack[stack.length - 1];

    // `Control: Gallery@2.15.0` names the control the frame below it stands for.
    if (name === "Control" && parent) {
      const owner = stack.slice().reverse().find((f) => f.isControl);
      if (owner) owner.control = value.trim();
      if (owner && /Gallery/.test(value)) owner.gallery = owner;
      continue;
    }

    // A block scalar: the property's formula is the indented lines under it.
    let text = null;
    let startLine = i + 1;
    if (/^\s*\|-?\s*$/.test(value)) {
      const body = [];
      let j = i + 1;
      for (; j < lines.length; j++) {
        if (lines[j].trim() === "") { body.push(""); continue; }
        if (lines[j].match(/^\s*/)[0].length <= indent) break;
        body.push(lines[j]);
      }
      text = body.join("\n").replace("=", " ");
      startLine = i + 2;
      i = j - 1;
    } else if (/^\s*=/.test(value)) {
      text = blank(line.slice(0, key[0].length)) + value.replace("=", " ");
    }

    if (text !== null) {
      const gallery = stack.slice().reverse().find((f) => f.key === "Children")
        ? stack.slice().reverse().find((f) => f.gallery)
        : null;
      const owner = stack.slice().reverse().find((f) => f.isControl);
      const unit = {
        kind: name === "Formulas" ? "formulas" : "property",
        file: label,
        path: (owner?.key ?? "App") + "." + name,
        text,
        line: startLine,
        thisItem: null,
        control: owner?.control ?? null,
      };
      units.push(unit);
      if (name === "Items" && parent && owner) owner.items = text;
      if (gallery) pending.push({ unit, gallery });
      continue;
    }

    const isControl = !RESERVED.has(name) && !!stack.find((f) => f.key === "Screens" || f.key === "Children" || f.key === "ComponentDefinitions");
    if (isControl || /^\s*-/.test(line)) controls.add(name);
    stack.push({ indent, key: name, isControl: isControl || /^\s*-/.test(line), gallery: null, items: null, control: null });
  }

  for (const { unit, gallery } of pending) {
    if (gallery.items) unit.thisItem = gallery.items;
  }
}

const files = [
  ["App.pa.yaml", join(appDir, "App.pa.yaml")],
  ["Formulas.pa.yaml", join(appDir, "Formulas.pa.yaml")],
  ["Formulas.parked.yaml", join(appDir, "Formulas.parked.yaml")],
  ["Components.pa.yaml", join(appDir, "Components.pa.yaml")],
  ...readdirSync(join(appDir, "Screens"))
    .filter((f) => f.endsWith(".pa.yaml"))
    .map((f) => ["Screens/" + f, join(appDir, "Screens", f)]),
].filter(([, path]) => existsSync(path));

// A canvas component's custom properties, from the ComponentDefinitions block: the property's
// declared kind and data type, and the Default formula that types it. The checker turns these into
// a record, so `cmpStepper.Steps` is a table with columns rather than a name it cannot know.
function readComponents(path, components) {
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  const stack = [];

  for (const line of lines) {
    if (line.trim() === "" || /^\s*#/.test(line)) continue;
    const indent = line.match(/^\s*/)[0].length;
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();

    const key = /^\s*-?\s*([A-Za-z_][\w]*)\s*:/.exec(line);
    if (!key) continue;
    const name = key[1];
    const keys = stack.map((f) => f.key);
    const at = keys.lastIndexOf("ComponentDefinitions");

    if (at >= 0 && keys[at + 2] === "CustomProperties" && keys.length === at + 4) {
      const property = (components[keys[at + 1]] ??= {})[keys[at + 3]] ??= { kind: "", dataType: "" };
      let value = line.slice(key[0].length).trim();
      if (/^'.*'$/.test(value)) value = value.slice(1, -1).replace(/''/g, "'");
      else if (/^".*"$/.test(value)) value = value.slice(1, -1);
      if (name === "PropertyKind") property.kind = value;
      if (name === "DataType") property.dataType = value;
      if (name === "Default" && value.startsWith("=")) property.default = value.slice(1);
    }

    stack.push({ indent, key: name });
  }
}

const units = [];
const controls = new Set();
const components = {};
for (const [label, path] of files) readFile(path, label, units, controls);
readComponents(join(appDir, "Components.pa.yaml"), components);

// ---------------------------------------------------------------------------
// The tool. Built once, then run over the job.
// ---------------------------------------------------------------------------
const project = join(root, "tools", "fxcheck");
const exe = join(project, "bin", "Release", "net8.0", process.platform === "win32" ? "FxCheck.exe" : "FxCheck");
const dotnet = existsSync("C:/Program Files/dotnet/dotnet.exe") ? "C:/Program Files/dotnet/dotnet.exe" : "dotnet";

function newest(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".cs") || f.endsWith(".csproj"))
    .reduce((t, f) => Math.max(t, statSync(join(dir, f)).mtimeMs), 0);
}

if (!existsSync(exe) || statSync(exe).mtimeMs < newest(project)) {
  const build = spawnSync(dotnet, ["build", "-c", "Release", "--nologo", "-v", "quiet", project], { encoding: "utf8" });
  if (build.status !== 0) {
    process.stderr.write((build.stdout ?? "") + (build.stderr ?? ""));
    console.error("fxcheck: the checker did not build.");
    process.exit(2);
  }
}

const jobPath = join(mkdtempSync(join(tmpdir(), "fxcheck-")), "job.json");
writeFileSync(jobPath, JSON.stringify({ units, controls: [...controls], components }));

const toolArgs = ["--job", jobPath, "--columns", columns, "--modern", modern, "--datasources", dataSources];
if (allTables) toolArgs.push("--all-tables");

const run = spawnSync(exe, toolArgs, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "inherit"] });
if (run.status === null || run.stdout.trim() === "") {
  process.stderr.write((run.stdout ?? "") + (run.stderr ?? ""));
  console.error("fxcheck: the checker did not run.");
  process.exit(2);
}

const report = JSON.parse(run.stdout);
if (asJson) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`${report.findings.length} errors`);
  for (const f of report.findings) {
    console.log(`${f.file}:${f.formula}:${f.line}:${f.column}: ${f.message}`);
  }
  console.log(
    `\n${report.definitions} named formulas, ${report.properties} properties, ` +
      `${report.galleries} gallery scopes typed, ${report.skipped.length} formulas skipped.`,
  );
  for (const s of report.skipped) console.log(`  skipped ${s}`);
}

process.exit(report.findings.length > 0 ? 1 : 0);
