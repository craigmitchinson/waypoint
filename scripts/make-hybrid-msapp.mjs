// Build a hybrid .msapp for bisecting a Studio open failure: a known-good package with only the
// named entries swapped in from a suspect build, so a failure that follows the swap narrows the
// blame to those entries.
//
//   node scripts/make-hybrid-msapp.mjs --base <good.msapp> --from <build.msapp>
//     --entries <comma-separated entry names or prefixes> --out <path>
//
// --entries takes Src/ (or any) entry names exactly, or a prefix ending "*" (e.g. "Src/scr*" or
// "Src/*"), matched against --from's own entry list. --base is copied whole to --out, then every
// entry the list matches is replaced (or added, if --base does not have it) with --from's version,
// using copyEntry from scripts/msapp-zip.mjs, which copies bytes without going through JSON or
// text. Every other entry in --out is --base's own entry, byte for byte. The entries replaced are
// printed, one per line, at the end.

import { cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { copyEntry, listEntries } from "./msapp-zip.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const base = argValue("--base");
const from = argValue("--from");
const entriesArg = argValue("--entries");
const out = argValue("--out");

if (!base || !from || !entriesArg || !out) {
  console.error(
    "make-hybrid-msapp: --base <good.msapp> --from <build.msapp> --entries <names or prefixes> " +
    "--out <path> are all required.",
  );
  process.exit(1);
}
if (!existsSync(base)) {
  console.error(`make-hybrid-msapp: --base ${base} does not exist.`);
  process.exit(1);
}
if (!existsSync(from)) {
  console.error(`make-hybrid-msapp: --from ${from} does not exist.`);
  process.exit(1);
}

const patterns = entriesArg.split(",").map((p) => p.trim()).filter(Boolean);
const fromEntries = listEntries(from);
const matched = patterns.flatMap((pattern) => {
  if (pattern.endsWith("*")) {
    const prefix = pattern.slice(0, -1);
    return fromEntries.filter((entry) => entry.startsWith(prefix));
  }
  return fromEntries.filter((entry) => entry === pattern);
});
const replaced = [...new Set(matched)].sort();

if (replaced.length === 0) {
  console.error(`make-hybrid-msapp: --entries ${entriesArg} matched nothing in ${from}.`);
  process.exit(1);
}

cpSync(base, out, { force: true });
for (const entry of replaced) {
  copyEntry(from, entry, out);
}

console.log(`make-hybrid-msapp: wrote ${out} from ${base}, with ${replaced.length} entr${replaced.length === 1 ? "y" : "ies"} taken from ${from}:`);
for (const entry of replaced) {
  console.log(`  ${entry}`);
}
