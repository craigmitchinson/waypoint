// Put every control's type back on its role: size, weight, line height and colour, in place.
//
//   node scripts/sweep-typography.mjs [--dry] [ScreenName ...]
//
// With one or more bare ScreenName arguments, only those screens (by file name, no extension) are
// processed. Components.pa.yaml is never processed here: its role aliases are retired in a unit of
// their own (power/decisions.md, Audit decisions 1).
//
// The census in power/audit/01a-typography-sizes-weights-colours.md found no literals and no
// off-scale values; what it found was role drift — a field label at TypeBody beside a field label
// at TypeCaption, a card title two sizes smaller than its sibling. This script reads each control's
// role off its name and its place, and writes the one type that role carries
// (power/RUNBOOK.md, "Typography"):
//
//   h1       the page heading, named exactly <screenPrefix>Title
//   section  any other Label whose name ends Title, outside a gallery template
//   field    a Label whose name ends Label or contains Lbl
//   header   a Label named *Head*/*Hd* inside a ManualLayout container named *Head*
//   caption  a Kicker, Caption, Count, Sub, Meta, Note or Hint Label
//   value    a Value, Total or Number Label outside a gallery template
//   control  a ModernButton, ModernTextInput, ModernDropdown, ModernCombobox or ModernTabList,
//            all of which carry TypeBodyPx: a modern control's Size is in pixels, never the
//            ramp's points (power/RUNBOOK.md, "Typography"). A ModernButton named *Small* carries
//            TypeCaptionPx, and one inside cmpRail carries TypeNavPx.
//
// Four things are exempt: every Label in Components.pa.yaml, whose modern controls are swept for
// Size alone; every control inside a gallery
// template, which the gallery owns whole; a Color that computes a tone (`If(`, `LookUp(` or a Tone
// name), which is the screen's decision and not the role's; and any control with `# type: keep` on
// the line above it. A control that sits on brand — its own Color reads a Brand token, or a
// container above it is filled BrandBg — keeps its Color and follows the role for size and weight
// only.
//
// Height is read but never written this round: a mismatch is a warning to look at by hand.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseControls, readProperty } from "./compile-tables.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "power", "app");

const LABEL = "Label@2.5.1";
const GALLERY = "Gallery@2.15.0";
const BUTTON = "ModernButton@1.0.0";
const INPUTS = ["ModernTextInput@1.1.1", "ModernDropdown@1.0.2", "ModernCombobox@1.1.1", "ModernTabList@1.0.1"];
/** The component whose buttons carry the rail's own size rather than the body one. */
const NAV_COMPONENT = "cmpRail";

/** The type each role carries. A role that leaves a property to the compiler does not name it. */
export const ROLES = {
  h1: { Size: "TypeTitle", FontWeight: "FontWeight.Semibold", Height: "TypeDisplayLine", Color: "NeutralFg1" },
  section: { Size: "TypeSubtitle", FontWeight: "FontWeight.Semibold", Height: "TypeHeadingLine", Color: "NeutralFg1" },
  field: { Size: "TypeCaption", FontWeight: "FontWeight.Semibold", Height: "TypeLabelLine", Color: "NeutralFg2" },
  header: { Size: "TypeCaption", FontWeight: "FontWeight.Semibold", Color: "NeutralFg2" },
  caption: { Size: "TypeCaption", FontWeight: "FontWeight.Normal", Color: "NeutralFg2" },
  value: { Size: "TypeBody", FontWeight: "FontWeight.Semibold", Color: "NeutralFg1" },
  label: { Color: "NeutralFg1" },
  control: { Size: "TypeBodyPx" },
  controlSmall: { Size: "TypeCaptionPx" },
  controlNav: { Size: "TypeNavPx" },
};

/** The retired role aliases and the ramp token each one becomes (power/decisions.md, Audit 1). */
export const RETIRED_SIZES = {
  TypeDisplaySize: "TypeTitle",
  TypeNumberSize: "TypeTitle",
  TypeHeadingSize: "TypeSubtitle",
  TypeBodySize: "TypeBody",
  TypeLabelSize: "TypeCaption",
  TypeKickerSize: "TypeCaption",
};
export const RETIRED_WEIGHTS = {
  TypeDisplayWeight: "FontWeight.Semibold",
  TypeNumberWeight: "FontWeight.Semibold",
  TypeHeadingWeight: "FontWeight.Semibold",
  TypeKickerWeight: "FontWeight.Semibold",
  TypeLabelWeight: "FontWeight.Normal",
};

// ---- reading the role ---------------------------------------------------------------------------

/** True where the control, or a container above it, is a gallery template. */
function inGallery(node) {
  for (let up = node.parent; up; up = up.parent) if (up.control === GALLERY) return true;
  return false;
}

/** True where a container above the control is a manual-layout header row. */
function inHeaderRow(node) {
  for (let up = node.parent; up; up = up.parent) {
    if (up.variant === "ManualLayout" && /Head/.test(up.name)) return true;
  }
  return false;
}

/** A name token read as a word: Sub matches subCount, not Submit or Subtitle. */
const has = (name, words) => new RegExp(`(${words})(?=[A-Z0-9]|$)`).test(name);

/**
 * The screen's own control prefix: the leading lower-case run most of its controls share, so the
 * page h1 can be told from a card title that happens to be named the same way (wkTitle against
 * ccTitle).
 */
export function screenPrefix(controls) {
  const counts = new Map();
  for (const name of controls.keys()) {
    const match = name.match(/^[a-z]{2,4}(?=[A-Z])/);
    if (match) counts.set(match[0], (counts.get(match[0]) ?? 0) + 1);
  }
  let best = null;
  for (const [prefix, count] of counts) {
    if (best === null || count > counts.get(best)) best = prefix;
  }
  return best;
}

/**
 * The component this control is drawn in, or null on a screen: the last `  <name>:` above it, which
 * is how a component is named both in Components.pa.yaml and in an assembled Components/ file.
 */
export function componentOf(lines, node) {
  for (let i = node.line; i >= 0; i -= 1) {
    const match = lines[i].match(/^ {2}([A-Za-z_]\w*):\s*$/);
    if (match) return match[1];
  }
  return null;
}

/** The role this control carries, or null where it has none the sweep owns. */
export function roleOf(node, prefix, component = null) {
  // A gallery owns its template's Labels whole, but not the unit a modern control reads its Size
  // in: a point token there draws a quarter too small wherever it sits.
  if (inGallery(node) && node.control === LABEL) return null;
  if (node.control === BUTTON) {
    if (component === NAV_COMPONENT) return "controlNav";
    return /Small/.test(node.name) ? "controlSmall" : "control";
  }
  if (INPUTS.includes(node.control)) return "control";
  if (node.control !== LABEL) return null;
  // Components' Label role aliases are retired in a unit of their own; only their modern controls
  // are swept here.
  if (component !== null) return null;
  if (prefix && node.name === `${prefix}Title`) return "h1";
  if (/(Head|Hd)/.test(node.name) && inHeaderRow(node)) return "header";
  if (/Label$/.test(node.name) || /Lbl/.test(node.name)) return "field";
  if (/Title$/.test(node.name)) return "section";
  if (has(node.name, "Kicker|Caption|Count|Sub|Meta|Note|Hint")) return "caption";
  if (has(node.name, "Value|Total|Number")) return "value";
  return "label";
}

/** True where a colour formula reads a brand token: the on-brand palette, not the neutral ramp. */
export const isBrandColour = (value) => value !== null && /\bBrand\w*|\bOnBrand/.test(value);

/** True where the control sits on brand: its own Color, or a container above it filled BrandBg. */
export function onBrand(lines, node) {
  if (isBrandColour(readProperty(lines, node, "Color"))) return true;
  for (let up = node.parent; up; up = up.parent) {
    if (/\bBrandBg/.test(readProperty(lines, up, "Fill") ?? "")) return true;
  }
  return false;
}

/** True where a Color is the screen's own decision — a tone or a conditional — not the role's. */
export const isToneColour = (value) => value !== null && /\bIf\(|\bLookUp\(|Tone/.test(value);

/** True where `# type: keep` stands above the control. */
export const isKept = (lines, node) => (lines[node.line - 1] ?? "").trim() === "# type: keep";

/**
 * What this control's type should read, property by property: `{ property: formula }` for every
 * property the role owns, with the retired aliases mapped whatever the role says.
 */
export function expected(lines, node, prefix, component = null) {
  const role = roleOf(node, prefix, component);
  if (role === null || isKept(lines, node)) return null;
  const want = { ...ROLES[role] };
  for (const property of ["Size", "FontWeight"]) {
    const current = readProperty(lines, node, property);
    if (current === null) continue;
    const retired = (property === "Size" ? RETIRED_SIZES : RETIRED_WEIGHTS)[current.replace(/^=\s*/, "")];
    if (retired && want[property] === undefined) want[property] = retired;
  }
  // Components is swept for Size alone: its Font and its role aliases are a unit of their own.
  if (component === null && readProperty(lines, node, "Font") !== null) want.Font = "FontUI";
  const brand = want.Color !== undefined && onBrand(lines, node);
  if (brand) delete want.Color;
  return { role, want, brand };
}

// ---- writing one property -------------------------------------------------------------------------
// The same rewrite as scripts/sweep-a11y.mjs: a single-line property, replacing a block scalar
// where there is one, in front of OnSelect where the control has one.

/** The line range of `<property>:` inside a control, single line or block scalar. */
function propertyRange(lines, node, property) {
  const bodyIndent = node.indent + 4;
  for (let i = node.line + 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "") continue;
    if (lines[i].search(/\S/) <= node.indent) break;
    const match = lines[i].match(new RegExp(`^ {${bodyIndent + 2}}${property}:\\s*(.*)$`));
    if (!match) continue;
    let end = i + 1;
    if (/^\|[-+\d]*$/.test(match[1].trim())) {
      while (end < lines.length && (lines[end].trim() === "" || lines[end].search(/\S/) > bodyIndent + 2)) end += 1;
      while (end > i + 1 && lines[end - 1].trim() === "") end -= 1;
    }
    return { start: i, end };
  }
  return null;
}

/** Where a property the control has not got yet belongs: in front of OnSelect, else last. */
function insertionPoint(lines, node) {
  const bodyIndent = node.indent + 4;
  const onSelect = propertyRange(lines, node, "OnSelect");
  if (onSelect) return onSelect.start;
  let last = null;
  for (let i = node.line + 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "") continue;
    if (lines[i].search(/\S/) <= node.indent) break;
    if (lines[i].search(/\S/) >= bodyIndent + 2) last = i + 1;
  }
  return last;
}

/** Write `<property>: =<formula>`, replacing whatever was there. Returns true when it changed. */
function setProperty(lines, node, property, formula) {
  const indent = " ".repeat(node.indent + 6);
  const range = propertyRange(lines, node, property);
  if (range) {
    if (range.end === range.start + 1 && lines[range.start] === `${indent}${property}: =${formula}`) return false;
    lines.splice(range.start, range.end - range.start, `${indent}${property}: =${formula}`);
    return true;
  }
  const at = insertionPoint(lines, node);
  if (at === null) return false;
  lines.splice(at, 0, `${indent}${property}: =${formula}`);
  return true;
}

// ---- the sweep -------------------------------------------------------------------------------------

/** The type properties in the order they are reported and written. */
const PROPERTIES = ["Size", "FontWeight", "Height", "Font", "Color"];

/**
 * Every change the role rules ask of one file, as
 * `{ name, role, property, from, to, note, warn }`, oldest control last so a caller can splice from
 * the bottom of the file up. A `warn` change is reported and never written.
 */
export function changes(lines) {
  const controls = parseControls(lines);
  const prefix = screenPrefix(controls);
  const found = [];
  let brandKept = 0;
  for (const node of [...controls.values()].sort((a, b) => b.line - a.line)) {
    const wanted = expected(lines, node, prefix, componentOf(lines, node));
    if (wanted === null) continue;
    const { role, want, brand } = wanted;
    if (brand) brandKept += 1;
    for (const property of PROPERTIES) {
      if (want[property] === undefined) continue;
      const from = readProperty(lines, node, property);
      const to = want[property];
      if (from !== null && from.replace(/^=\s*/, "") === to) continue;
      if (property === "Color") {
        // A Label the rules do not name is only given a Color where it has none; every named role
        // yields to a tone and nothing else.
        if (isToneColour(from)) continue;
        if (from !== null && role === "label") continue;
      }
      let note = null;
      if (property === "Color" && from !== null && !/^=Neutral(Fg1|Fg2)$/.test(from)) note = "replaces a non-neutral colour";
      // Height is read but not written this round: a mismatch is a warning, not a change.
      const warn = property === "Height";
      found.push({ name: node.name, node, role, property, from, to, note, warn });
    }
  }
  found.brandKept = brandKept;
  return found;
}

function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const only = args.filter((arg) => !arg.startsWith("--"));
  const files = only.length > 0
    ? only.map((name) => join(appDir, "Screens", `${name}.pa.yaml`))
    : [
        ...readdirSync(join(appDir, "Screens")).filter((name) => name.endsWith(".pa.yaml"))
          .map((name) => join(appDir, "Screens", name)),
        join(appDir, "Screens.flagged", "FrontDoor.pa.yaml"),
        join(appDir, "Components.pa.yaml"),
      ];

  const totals = new Map();
  const notes = [];
  const warnings = [];
  let written = 0;
  let brandKept = 0;

  for (const path of files) {
    const file = path.slice(join(root, "power", "app").length + 1);
    const text = readFileSync(path, "utf8");
    const newline = text.includes("\r\n") ? "\r\n" : "\n";
    const lines = text.replace(/\r\n/g, "\n").split("\n");
    const all = changes(lines);
    brandKept += all.brandKept;
    const found = all.filter((change) => !change.warn);
    for (const change of all) {
      if (change.warn) warnings.push(`${file}: ${change.name}.${change.property} is ${change.from ?? "unset"}, not =${change.to}`);
    }

    console.log(`\n${file}: ${found.length} change(s)`);
    for (const change of [...found].reverse()) {
      console.log(`  ${change.name.padEnd(28)} ${change.role.padEnd(11)} ${change.property.padEnd(11)} ${(change.from ?? "unset").padEnd(24)} -> =${change.to}`);
      if (change.note) notes.push(`${file}: ${change.name}.${change.property} ${change.note} (${change.from})`);
      totals.set(change.role, (totals.get(change.role) ?? 0) + 1);
    }

    for (const change of found) setProperty(lines, change.node, change.property, change.to);
    if (found.length > 0 && !dry) {
      writeFileSync(path, lines.join(newline), "utf8");
      written += 1;
    }
  }

  const total = [...totals.values()].reduce((sum, count) => sum + count, 0);
  console.log(`\n${total} change(s) by role: ${[...totals].sort((a, b) => b[1] - a[1]).map(([role, count]) => `${role} ${count}`).join(", ")}`);
  console.log(`${brandKept} control(s) kept their colour: they sit on brand.`);
  console.log(dry ? "(dry run, nothing written)" : `${written} file(s) written.`);
  if (warnings.length > 0) {
    console.log(`\n${warnings.length} Height warning(s), not written:`);
    for (const warning of warnings) console.log(`  ${warning}`);
  }
  if (notes.length > 0) {
    console.log(`\n${notes.length} change(s) to look at by hand:`);
    for (const note of notes) console.log(`  ${note}`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
