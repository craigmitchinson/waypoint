// Writes a row of power/tests/evaluation-log.md. One row per import, so a build can be compared
// with the one before it on the same numbers rather than on how the last screenshot felt.
//
//   node scripts/log-eval.mjs --build "2026-09-20 20:51" --claim "..." --offline "..." --roundtrip "..."
//   node scripts/log-eval.mjs --studio "82 errors: PA2108 x82"
//   node scripts/log-eval.mjs --player "Timeline All still empty" --verdict "worse"
//   node scripts/log-eval.mjs --build "2026-09-20 20:51" --verdict "worse"
//
// With `--build`, the row for that stamp is updated if it is there and appended if it is not.
// Without `--build`, the fields given update the last row in the table, which is how Craig's
// Studio and player results are logged after the import unit has written the row.
//
// Nothing here validates the content: it is a markdown table rewrite, and the table is the record.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logFile = join(root, "power", "tests", "evaluation-log.md");

/** The table's columns, in order, keyed by the flag that writes each one. */
const columns = [
  ["build", "Build"],
  ["claim", "Claim"],
  ["offline", "Offline"],
  ["roundtrip", "Round trip"],
  ["studio", "Studio"],
  ["player", "Player"],
  ["verdict", "Verdict"],
];

const blank = "not checked";

/** `--name value` pairs. A flag with no value, or an unknown flag, is a usage error. */
function parseArgs(argv) {
  const known = new Set(columns.map(([flag]) => flag));
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) fail(`unexpected argument "${arg}"`);
    const flag = arg.slice(2);
    if (!known.has(flag)) fail(`unknown flag "--${flag}"`);
    const value = argv[i + 1];
    if (value === undefined || value.startsWith("--")) fail(`--${flag} needs a value`);
    args[flag] = value.trim();
    i += 1;
  }
  return args;
}

function fail(message) {
  console.error(`log-eval: ${message}`);
  process.exit(1);
}

/** A cell's text, with the characters that would break the table taken out. */
const cell = (text) => text.replace(/\|/g, "/").replace(/\s+/g, " ").trim() || blank;

const splitRow = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((part) => part.trim());

const joinRow = (cells) => `| ${cells.join(" | ")} |`;

const args = parseArgs(process.argv.slice(2));
if (Object.keys(args).length === 0) fail("nothing to write; pass at least one of --build, --claim, --offline, --roundtrip, --studio, --player, --verdict");

const lines = readFileSync(logFile, "utf8").split(/\r?\n/);
const header = lines.findIndex((line) => line.startsWith("| Build |"));
if (header === -1) fail(`no table header in ${logFile}`);

let end = header + 2;
while (end < lines.length && lines[end].startsWith("|")) end += 1;
const first = header + 2;

let target = -1;
if (args.build) {
  for (let i = first; i < end; i += 1) {
    if (splitRow(lines[i])[0] === args.build) target = i;
  }
} else {
  if (end === first) fail("the table has no rows yet; pass --build to write the first one");
  target = end - 1;
}

if (target === -1) {
  const row = columns.map(([flag]) => cell(args[flag] ?? blank));
  lines.splice(end, 0, joinRow(row));
  console.log(`log-eval: row added for ${args.build}.`);
} else {
  const row = splitRow(lines[target]);
  const written = [];
  columns.forEach(([flag, name], index) => {
    if (flag === "build" || args[flag] === undefined) return;
    row[index] = cell(args[flag]);
    written.push(name);
  });
  lines[target] = joinRow(row);
  console.log(`log-eval: ${row[0]} updated: ${written.join(", ")}.`);
}

writeFileSync(logFile, lines.join("\n"), "utf8");
