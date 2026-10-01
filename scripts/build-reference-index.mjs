// Builds the lookup index over the Microsoft Learn corpus in power/reference.
//
//   node scripts/build-reference-index.mjs
//
// The corpus is about 520k words over 19 files, far too large to read. This script walks
// power/reference/*.md, takes every heading of level 1 to 3 with its file and line, and writes
// power/reference/INDEX.md: one block per file, page headings as their own lines, the headings
// under a page run together so the index stays short enough to read. A second section lists every
// Power Fx page in power-fx-16 to 19 with its "Applies to" block condensed to one string, so
// availability can be checked without opening the page. When INDEX.md would run past ~3000 lines
// the Power Fx section is written to power/reference/INDEX-functions.md instead and linked.
//
// Lookup rule (power/RUNBOOK.md, "Looking things up"): read the index, grep the corpus for the
// heading, read only that section.

import { readdirSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const refDir = join(root, "power", "reference");
const indexPath = join(refDir, "INDEX.md");
const functionsPath = join(refDir, "INDEX-functions.md");
const maxIndexLines = 3000;
const generated = ["INDEX.md", "INDEX-functions.md", "README.md"];

// The platforms an "Applies to" block can name, in the order the compact string prints them.
const platforms = [
  ["Canvas apps", "Canvas"],
  ["Model-driven apps", "Model-driven"],
  ["Power Pages", "Power Pages"],
  ["Desktop flows", "Desktop flows"],
  ["Copilot Studio", "Copilot Studio"],
  ["Dataverse formula columns", "Formula columns"],
  ["Dataverse functions", "Dataverse functions"],
  ["Power Platform CLI", "CLI"],
];

function parse(file) {
  const lines = readFileSync(join(refDir, file), "utf8").split(/\r?\n/);
  const headings = [];
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Fences close only on the same marker, at least as long as the one that opened them, so a
    // ``` sample nested inside a ```` block does not end it and the count stays balanced.
    const open = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      if (open && open[1][0] === fence[0] && open[1].length >= fence.length && !open[2].trim()) fence = null;
      continue;
    }
    if (open && !(open[1][0] === "`" && open[2].includes("`"))) {
      fence = open[1];
      continue;
    }
    const m = /^(#{1,3}) +(.+?)\s*$/.exec(line);
    if (!m) continue;
    // A page starts with a level-2 heading followed by its Source: link, then repeats its own
    // title as a level-1 heading. Mark the page and drop the repeat.
    const isPage = m[1].length === 2 && lines.slice(i + 1, i + 4).some((l) => l.startsWith("Source: ["));
    headings.push({ level: m[1].length, text: m[2], line: i + 1, isPage });
  }
  const kept = [];
  for (const h of headings) {
    const prev = kept[kept.length - 1];
    if (h.level === 1 && prev && prev.isPage && h.line - prev.line <= 10) continue;
    kept.push(h);
  }
  const title = headings.find((h) => h.level === 1)?.text ?? file;
  const pages = kept.filter((h) => h.isPage).length;
  return { file, lines, headings: kept, title, pages, lineCount: lines.length };
}

function summarise(doc) {
  const bits = [doc.title];
  if (doc.pages) bits.push(`${doc.pages} page${doc.pages === 1 ? "" : "s"}`);
  bits.push(`${doc.lineCount} lines`);
  return bits.join(" · ");
}

// Wraps a run of "L123 Heading" entries into ` · ` separated lines of readable length.
function wrap(entries, indent) {
  const out = [];
  let current = "";
  for (const entry of entries) {
    const next = current ? `${current} · ${entry}` : entry;
    if (current && next.length > 110) {
      out.push(indent + current);
      current = entry;
    } else {
      current = next;
    }
  }
  if (current) out.push(indent + current);
  return out;
}

function headingBlock(doc) {
  const out = [];
  let pending = [];
  const flush = () => {
    if (pending.length) out.push(...wrap(pending, "  "));
    pending = [];
  };
  for (const h of doc.headings) {
    if (h.isPage || h.level === 1) {
      flush();
      out.push(`- ${h.isPage ? `**L${h.line} ${h.text}**` : `L${h.line} ${h.text}`}`);
    } else {
      pending.push(h.level === 3 ? `L${h.line} › ${h.text}` : `L${h.line} ${h.text}`);
    }
  }
  flush();
  return out;
}

// Reads the "Applies to" block that follows a page heading: either a plain list, or a table with
// one row per function group. Returns a list of { functions, applies } entries.
function appliesTo(doc, start, end) {
  const entries = [];
  let row = null;
  for (let i = start; i < end; i++) {
    const line = doc.lines[i];
    const tableRow = /^\| +\*\*(.+?)\*\* +\| *$/.exec(line);
    if (tableRow) {
      if (row) entries.push(row);
      row = { functions: tableRow[1].split(/<\/?br\s*\/?>/i).map((s) => s.replace(/\*/g, "").trim()).filter(Boolean), applies: new Set() };
      continue;
    }
    if (/^\*\*Applies to[:*]*/.test(line)) {
      if (row) entries.push(row);
      row = { functions: [], applies: new Set() };
      continue;
    }
    const item = /^- ✓ +(.+?)\s*\|?\s*$/.exec(line);
    if (item && row) {
      row.applies.add(item[1]);
      continue;
    }
    if (row && /^#{1,3} /.test(line)) break;
  }
  if (row) entries.push(row);
  return entries.filter((e) => e.applies.size);
}

function compact(applies) {
  return platforms.map(([name, label]) => `${label}: ${applies.has(name) ? "yes" : "no"}`).join(" · ");
}

const files = readdirSync(refDir)
  .filter((f) => f.endsWith(".md") && !generated.includes(f))
  .sort();
const docs = files.map(parse);

const headingLines = [];
for (const doc of docs) {
  headingLines.push(`### ${doc.file}`, "", summarise(doc), "", ...headingBlock(doc), "");
}

const functionLines = [];
let functionCount = 0;
for (const doc of docs.filter((d) => /^power-fx-1[6-9]/.test(d.file))) {
  functionLines.push(`### ${doc.file}`, "");
  for (const [n, page] of doc.headings.filter((h) => h.isPage).entries()) {
    const next = doc.headings.filter((h) => h.isPage)[n + 1];
    const entries = appliesTo(doc, page.line, next ? next.line - 1 : doc.lines.length);
    functionLines.push(`- **L${page.line} ${page.text}**`);
    for (const entry of entries) {
      const label = entry.functions.length ? `${entry.functions.join(", ")} — ` : "";
      functionLines.push(`  - ${label}${compact(entry.applies)}`);
    }
    if (!entries.length) functionLines.push("  - Applies to: not stated on the page");
    functionCount++;
  }
  functionLines.push("");
}

const totalHeadings = docs.reduce((n, d) => n + d.headings.length, 0);
const stamp = new Date().toISOString().slice(0, 10);
const preamble = [
  "# Reference index",
  "",
  `Generated by \`node scripts/build-reference-index.mjs\` on ${stamp}. Do not edit by hand.`,
  "",
  `${docs.length} files, ${totalHeadings} headings (levels 1 to 3), ${functionCount} Power Fx pages.`,
  "",
  "Look a fact up by finding its heading here, then grepping the corpus for that heading and",
  "reading only that section. Never read a corpus file whole. `L123` is the line the heading sits",
  "on. **Bold** entries are page headings; the headings inside a page run together on the lines",
  "beneath it, level-3 headings marked ›.",
  "",
  "## Headings by file",
  "",
];

const functionsHeader = [
  "## Functions",
  "",
  "Every Power Fx page in `power-fx-16` to `power-fx-19` with its \"Applies to\" block condensed, so",
  "availability can be checked without opening the page. Where a page states availability per",
  "function, each group is listed separately.",
  "",
];

const oneFile = [...preamble, ...headingLines, ...functionsHeader, ...functionLines];
if (oneFile.length <= maxIndexLines) {
  if (existsSync(functionsPath)) rmSync(functionsPath);
  writeFileSync(indexPath, oneFile.join("\n").replace(/\n+$/, "\n"), "utf8");
  console.log(`INDEX.md: ${oneFile.length} lines, ${totalHeadings} headings, ${functionCount} Power Fx pages`);
} else {
  const index = [
    ...preamble,
    ...headingLines,
    "## Functions",
    "",
    "Split out to keep this file readable: [INDEX-functions.md](INDEX-functions.md) lists all",
    `${functionCount} Power Fx pages with their "Applies to" block condensed to one string.`,
    "",
  ];
  const functions = [
    "# Reference index — functions",
    "",
    `Generated by \`node scripts/build-reference-index.mjs\` on ${stamp}. Do not edit by hand.`,
    "",
    `Split out of [INDEX.md](INDEX.md). ${functionCount} Power Fx pages.`,
    "",
    ...functionsHeader.slice(2),
    ...functionLines,
  ];
  writeFileSync(indexPath, index.join("\n").replace(/\n+$/, "\n"), "utf8");
  writeFileSync(functionsPath, functions.join("\n").replace(/\n+$/, "\n"), "utf8");
  console.log(`INDEX.md: ${index.length} lines, ${totalHeadings} headings`);
  console.log(`INDEX-functions.md: ${functions.length} lines, ${functionCount} Power Fx pages`);
}
