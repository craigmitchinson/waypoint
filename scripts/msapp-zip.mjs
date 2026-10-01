// Reading and writing entries inside a packed .msapp, and finding the download the skeleton came
// from. Shared by scripts/patch-msapp.mjs and scripts/msappcheck.mjs.
//
// Node has no zip library here and none is in node_modules, so the zip is opened with .NET's
// System.IO.Compression through PowerShell, the same way scripts/refresh-skeleton.mjs reads a
// download. An entry's path inside a .msapp uses a backslash (References\DataSources.json); every
// name in and out of this module is normalised to forward slashes, and a copy keeps the source
// entry's own name byte for byte.

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

let work = null;

function workDir() {
  if (!work) {
    work = mkdtempSync(join(tmpdir(), "msapp-zip-"));
    process.on("exit", () => rmSync(work, { recursive: true, force: true }));
  }
  return work;
}

const psLiteral = (p) => p.replace(/'/g, "''");

function powershell(script) {
  const file = join(workDir(), `msapp-zip-${process.hrtime.bigint()}.ps1`);
  writeFileSync(file, script, "utf8");
  try {
    return execFileSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", file], {
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
    });
  } finally {
    rmSync(file, { force: true });
  }
}

/** Every entry name in the .msapp, normalised to forward slashes. */
export function listEntries(msapp) {
  const out = powershell(`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('${psLiteral(msapp)}')
try { $zip.Entries | ForEach-Object { Write-Output ($_.FullName -replace '\\\\', '/') } } finally { $zip.Dispose() }
`);
  return out.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

/** An entry's text, or null when the .msapp has no such entry. */
export function readEntry(msapp, name) {
  const to = join(workDir(), `entry-${process.hrtime.bigint()}`);
  const out = powershell(`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('${psLiteral(msapp)}')
try {
  $entry = $zip.Entries | Where-Object { ($_.FullName -replace '\\\\', '/') -eq '${psLiteral(name)}' } | Select-Object -First 1
  if ($null -eq $entry) { Write-Output 'MISSING' } else {
    $in = $entry.Open()
    $out = [System.IO.File]::Create('${psLiteral(to)}')
    $in.CopyTo($out)
    $out.Close()
    $in.Close()
    Write-Output 'OK'
  }
} finally { $zip.Dispose() }
`);
  if (out.includes("MISSING")) return null;
  const text = readFileSync(to, "utf8");
  rmSync(to, { force: true });
  return text;
}

/** `text` written back over an entry already in the .msapp. */
export function writeEntry(msapp, name, text) {
  const from = join(workDir(), `write-${process.hrtime.bigint()}`);
  writeFileSync(from, text, "utf8");
  const temp = `${msapp}.tmp-${process.hrtime.bigint()}`;
  powershell(`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
Copy-Item -LiteralPath '${psLiteral(msapp)}' -Destination '${psLiteral(temp)}' -Force
$zip = [System.IO.Compression.ZipFile]::Open('${psLiteral(temp)}', [System.IO.Compression.ZipArchiveMode]::Update)
try {
  $entry = $zip.Entries | Where-Object { ($_.FullName -replace '\\\\', '/') -eq '${psLiteral(name)}' } | Select-Object -First 1
  if ($null -eq $entry) { throw 'no ${psLiteral(name)} in the msapp' }
  $stream = $entry.Open()
  $stream.SetLength(0)
  $bytes = [System.IO.File]::ReadAllBytes('${psLiteral(from)}')
  $stream.Write($bytes, 0, $bytes.Length)
  $stream.Close()
} finally { $zip.Dispose() }
Move-Item -LiteralPath '${psLiteral(temp)}' -Destination '${psLiteral(msapp)}' -Force
`);
  rmSync(from, { force: true });
}

/** A whole entry copied from one .msapp into another, keeping the source entry's own name. */
export function copyEntry(fromMsapp, name, toMsapp) {
  const temp = `${toMsapp}.tmp-${process.hrtime.bigint()}`;
  powershell(`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$source = [System.IO.Compression.ZipFile]::OpenRead('${psLiteral(fromMsapp)}')
try {
  $entry = $source.Entries | Where-Object { ($_.FullName -replace '\\\\', '/') -eq '${psLiteral(name)}' } | Select-Object -First 1
  if ($null -eq $entry) { throw 'no ${psLiteral(name)} in ${psLiteral(fromMsapp)}' }
  Copy-Item -LiteralPath '${psLiteral(toMsapp)}' -Destination '${psLiteral(temp)}' -Force
  $target = [System.IO.Compression.ZipFile]::Open('${psLiteral(temp)}', [System.IO.Compression.ZipArchiveMode]::Update)
  try {
    $existing = $target.Entries | Where-Object { ($_.FullName -replace '\\\\', '/') -eq '${psLiteral(name)}' } | Select-Object -First 1
    if ($null -ne $existing) { $existing.Delete() }
    $added = $target.CreateEntry($entry.FullName)
    $in = $entry.Open()
    $out = $added.Open()
    $in.CopyTo($out)
    $out.Close()
    $in.Close()
  } finally { $target.Dispose() }
} finally { $source.Dispose() }
Move-Item -LiteralPath '${psLiteral(temp)}' -Destination '${psLiteral(toMsapp)}' -Force
`);
}

/**
 * The .msapp scripts/refresh-skeleton.mjs last unpacked into power/canvas/source, so the patch and
 * the gate read the same download the skeleton was taken from. `pac canvas unpack` leaves a
 * `<download>.msapr` beside the Src it wrote, which names it; the newest file under downloads/ is
 * the fallback when that marker is gone.
 */
export function skeletonDownload(root) {
  const downloads = join(root, "power", "canvas", "downloads");
  const sourceDir = join(root, "power", "canvas", "source");
  if (existsSync(sourceDir)) {
    const marker = readdirSync(sourceDir).find((f) => f.endsWith(".msapr"));
    if (marker) {
      const named = join(downloads, `${basename(marker, ".msapr")}.msapp`);
      if (existsSync(named)) return named;
    }
  }
  if (!existsSync(downloads)) return null;
  const files = readdirSync(downloads).filter((f) => f.endsWith(".msapp")).sort();
  return files.length ? join(downloads, files[files.length - 1]) : null;
}

/** The text of every entry under `prefix`, run together, in one pass over the zip. */
export function readTextUnder(msapp, prefix) {
  return powershell(`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('${psLiteral(msapp)}')
try {
  foreach ($entry in $zip.Entries) {
    if (($entry.FullName -replace '\\\\', '/').StartsWith('${psLiteral(prefix)}')) {
      $reader = New-Object System.IO.StreamReader($entry.Open())
      Write-Output $reader.ReadToEnd()
      $reader.Close()
    }
  }
} finally { $zip.Dispose() }
`);
}

/** The names of the entries whose text contains `needle`, scanned inside the zip. */
export function entriesContaining(msapp, needle) {
  const out = powershell(`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('${psLiteral(msapp)}')
try {
  foreach ($entry in $zip.Entries) {
    $reader = New-Object System.IO.StreamReader($entry.Open())
    $text = $reader.ReadToEnd()
    $reader.Close()
    if ($text.Contains('${psLiteral(needle)}')) { Write-Output ($entry.FullName -replace '\\\\', '/') }
  }
} finally { $zip.Dispose() }
`);
  return out.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

/** The keys a package declares a template or component under, as opposed to merely mentioning it. */
const declaringKeys = /^(Name|ComponentName|TemplateName|OriginalName|ControlName)$/i;

/** True when `value` names `component` as the value of a naming key, rather than merely mentioning it. */
export function declaresName(value, component) {
  if (Array.isArray(value)) return value.some((inner) => declaresName(inner, component));
  if (value && typeof value === "object") {
    return Object.entries(value).some(([key, inner]) =>
      (declaringKeys.test(key) && inner === component) || declaresName(inner, component),
    );
  }
  return false;
}

/**
 * The bundle a custom control's identifier names. Studio writes the compiled control under the
 * identifier with the publisher prefix stripped, so wp_Waypoint.SprintGrid is carried by
 * Resources/Controls/Waypoint.SprintGrid.bundle.js, and its other resources (the control's css)
 * are named from the same base.
 */
export function controlBaseName(component) {
  return component.replace(/^[^_]+_/, "");
}

/** The Resources/Controls bundle entry `component` is compiled into. */
export function controlBundleEntry(component) {
  return `Resources/Controls/${controlBaseName(component)}.bundle.js`;
}

/**
 * The CustomControl records Properties.json carries, each with the LocalDatabaseReferences key it
 * sits under. Studio holds them at Properties.json > LocalDatabaseReferences (itself a JSON string)
 * > <reference key, "default.cds"> > components, as
 * {"ComponentName":"CustomControl","Identifier":"wp_Waypoint.SprintGrid","IdentifierType":0,...}.
 */
export function customControlRecords(msapp) {
  const text = readEntry(msapp, "Properties.json");
  if (text === null) return [];
  let references;
  try {
    references = JSON.parse(JSON.parse(text).LocalDatabaseReferences ?? "{}");
  } catch {
    return [];
  }
  return Object.entries(references).flatMap(([key, value]) =>
    (value?.components ?? [])
      .filter((record) => record?.ComponentName === "CustomControl")
      .map((record) => ({ key, record })),
  );
}

/** The Resources entries named from `component`'s base name: its bundle and anything beside it. */
export function componentResourceEntries(msapp, component) {
  const base = controlBaseName(component);
  return listEntries(msapp).filter((entry) => entry.startsWith("Resources/") && entry.includes(base));
}

/**
 * True when the package registers `component`. A core control is registered by a PcfTemplates
 * record in References/Templates.json. A custom control placed in Studio never reaches that list:
 * it is registered by a CustomControl record under Properties.json's LocalDatabaseReferences whose
 * Identifier is the component, together with the compiled bundle under Resources/Controls. A
 * Controls or Components entry naming the component still proves nothing: `pac canvas pack` writes
 * a Template.Name into a Controls entry for every control it finds in Src.
 */
export function isRegistered(msapp, component) {
  const text = readEntry(msapp, "References/Templates.json");
  if (text !== null) {
    try {
      if ((JSON.parse(text).PcfTemplates ?? []).some((record) => record.Name === component)) return true;
    } catch {
      // not readable as JSON; fall through to the custom control path
    }
  }
  if (!customControlRecords(msapp).some(({ record }) => record.Identifier === component)) return false;
  return listEntries(msapp).includes(controlBundleEntry(component));
}

/**
 * The entries that carry `component`'s registration and can be copied or merged into another
 * package: a JSON entry has to declare it as the value of a naming key, so a formula comment
 * compiled into a Controls entry does not count, while a non-JSON entry counts on naming it at all.
 * Src/, Controls/ and Components/ are all excluded: a pack writes those from Src itself.
 */
export function registrationEntries(msapp, component) {
  return entriesContaining(msapp, component)
    .filter((entry) => !/^(Src|Controls|Components)\//.test(entry))
    .filter((entry) => {
      if (!entry.endsWith(".json")) return true;
      try {
        return declaresName(JSON.parse(readEntry(msapp, entry)), component);
      } catch {
        return false;
      }
    });
}

/**
 * Every `ComponentName` a `Control: CodeComponent` names, read out of Src YAML text. Nothing is
 * hard-coded: whatever the assembled YAML references is what the package must register.
 */
export function codeComponentNames(yamlText) {
  const names = new Set();
  const lines = yamlText.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    if (!/^\s*Control:\s*CodeComponent\s*$/.test(lines[i])) continue;
    for (let j = i + 1; j < Math.min(i + 6, lines.length); j += 1) {
      const match = lines[j].match(/^\s*ComponentName:\s*(\S+)\s*$/);
      if (match) {
        names.add(match[1].replace(/^["']|["']$/g, ""));
        break;
      }
    }
  }
  return [...names].sort();
}
