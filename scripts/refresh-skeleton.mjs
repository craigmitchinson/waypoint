// Refresh the canvas app skeleton, and read the environment's data source names.
//
//   node scripts/refresh-skeleton.mjs
//   node scripts/refresh-skeleton.mjs --offline
//
// The skeleton is the base every build's non-Src entries come from: `pac canvas unpack` writes them
// into the .msapr beside Src, and `pac canvas pack` copies them back out verbatim. That base is
// power/canvas/golden/skeleton.msapp, never the environment download: the environment has held a
// corrupted References/DataSources.json since 19:54 on 2026-09-21, and every build that inherited
// it failed to open in Studio with ErrOpeningDocument. The golden advances only by an explicit
// `node scripts/promote-golden.mjs`, after Craig confirms Studio opened that build
// (power/canvas/golden/README.md, power/RUNBOOK.md section 2).
//
// What it does:
//   1. pac canvas download --name Waypoint to a dated file under power/canvas/downloads/, which is
//      the environment's own copy: used for the import poll's comparison and for the data source
//      names below, and for nothing else
//   2. pac canvas unpack --layout SourceCode of the golden into power/canvas/source, keeping the
//      previous skeleton as power/canvas/source.prev
//   3. prints the data source names found in the downloaded msapp's References/DataSources.json,
//      so the Dataverse tables Craig added with Add data can be checked by eye
//
// --offline needs no environment: it skips the download in step 1, and step 3 reads the names
// from the golden's own References/DataSources.json instead.

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pacCmd } from "./lib/pac.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const canvasDir = join(root, "power", "canvas");
const downloadsDir = join(canvasDir, "downloads");
const sourceDir = join(canvasDir, "source");
const sourcePrevDir = join(canvasDir, "source.prev");
const goldenMsapp = join(canvasDir, "golden", "skeleton.msapp");

const pac = pacCmd();
const offline = process.argv.includes("--offline");

if (!existsSync(goldenMsapp)) {
  console.error(`refresh-skeleton: no golden base at ${goldenMsapp}; see power/canvas/golden/README.md.`);
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
mkdirSync(downloadsDir, { recursive: true });
const downloaded = offline ? goldenMsapp : join(downloadsDir, `Waypoint-${stamp}.msapp`);

if (offline) {
  console.log("Offline: no environment download; data source names come from the golden");
} else {
  console.log(`Downloading Waypoint to ${downloaded}`);
  execFileSync(pac, ["canvas", "download", "--name", "Waypoint", "--file-name", downloaded, "--overwrite"], {
    stdio: "inherit",
    shell: true,
  });
}

if (existsSync(sourcePrevDir)) rmSync(sourcePrevDir, { recursive: true, force: true });
if (existsSync(sourceDir)) {
  cpSync(sourceDir, sourcePrevDir, { recursive: true });
  rmSync(sourceDir, { recursive: true, force: true });
}

// The base is the golden, not the download: the .msapr this unpack writes beside Src is every
// non-Src entry the next pack will carry.
console.log(`Unpacking the golden base ${goldenMsapp} into ${sourceDir}`);
execFileSync(
  pac,
  ["canvas", "unpack", "--msapp", goldenMsapp, "--sources", sourceDir, "--layout", "SourceCode", "--overwrite"],
  { stdio: "inherit", shell: true },
);

// scripts/msapp-zip.mjs's skeletonDownload resolves the skeleton's .msapr name against
// power/canvas/downloads/, and that is what scripts/patch-msapp.mjs takes the code component
// registrations from. The golden is copied there under the name the unpack just used, so that
// lookup lands on the golden's own bytes rather than falling back to the newest download.
cpSync(goldenMsapp, join(downloadsDir, `${basename(goldenMsapp, ".msapp")}.msapp`), { force: true });

// ---- read References/DataSources.json out of the downloaded msapp (a zip) -------------------
// The entry's path inside the zip uses a backslash: References\DataSources.json. .NET's zip
// entry names are not normalised, so the lookup matches on either separator rather than the
// literal backslash, and every entry name is printed so a rename in a future CLI is visible.
const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('${downloaded.replace(/\\/g, "\\\\")}')
Write-Output "----ENTRIES----"
$zip.Entries | ForEach-Object { Write-Output $_.FullName }
Write-Output "----DATASOURCES----"
$entry = $zip.Entries | Where-Object { ($_.FullName -replace '\\\\', '/') -eq 'References/DataSources.json' } | Select-Object -First 1
if ($null -ne $entry) {
  $reader = New-Object System.IO.StreamReader($entry.Open())
  $reader.ReadToEnd()
  $reader.Close()
}
$zip.Dispose()
`;
const psFile = join(downloadsDir, `.read-datasources-${stamp}.ps1`);
writeFileSync(psFile, psScript, "utf8");

let entryNames = [];
let json = null;
try {
  const out = execFileSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", psFile], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const [, entriesBlock = "", dataSourcesBlock = ""] = out.split(/----ENTRIES----\r?\n|----DATASOURCES----\r?\n/);
  entryNames = entriesBlock.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const jsonText = dataSourcesBlock.trim();
  if (jsonText) json = JSON.parse(jsonText);
} catch (error) {
  console.log(`Could not read the downloaded msapp's entries: ${error.message}`);
}
try {
  rmSync(psFile, { force: true });
} catch (error) {
  // The .NET zip handle can still be closing; the file is harmless if it lingers.
}

console.log(`Entries in ${downloaded}:`);
for (const name of entryNames) console.log(`  ${name}`);

if (!json) {
  console.log("No References/DataSources.json entry found in the downloaded msapp.");
}

let names = [];
if (json) {
  names = (json.DataSources ?? []).map((entry) => entry.Name);
  console.log(`Data sources in References\\DataSources.json (${downloaded}):`);
  for (const name of names) console.log(`  ${name}`);
}

// ---- record the data source names next to the skeleton, so assemble-canvas.mjs can check them
// without re-reading a zip itself.
writeFileSync(
  join(sourceDir, "datasources.json"),
  JSON.stringify({ source: downloaded, names }, null, 2) + "\n",
  "utf8",
);

// ---- record which base the skeleton was unpacked from ------------------------------------------
// scripts/assemble-canvas.mjs reads this and refuses to build from a skeleton that did not come
// from the golden, so a base can never arrive from a download by accident.
writeFileSync(
  join(sourceDir, "base.json"),
  JSON.stringify({ golden: goldenMsapp, bytes: statSync(goldenMsapp).size, unpacked: new Date().toISOString() }, null, 2) + "\n",
  "utf8",
);

console.log(`Previous skeleton kept at ${sourcePrevDir}`);
console.log(`Skeleton refreshed at ${sourceDir}, from the golden base ${goldenMsapp}`);
if (!offline) console.log(`Environment download kept at ${downloaded}, for the poll comparison and the names above only`);
