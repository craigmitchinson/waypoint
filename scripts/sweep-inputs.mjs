// Put every text input, dropdown and combo box on the one input palette, in place.
//
//   node scripts/sweep-inputs.mjs [--dry] [ScreenName ...]
//
// With one or more bare ScreenName arguments, only those screens (by file name, no extension) are
// processed; Components.pa.yaml and every other screen are left untouched.
//
// The contrast audit read the modern inputs as three palettes at once: a filled-darker default
// against the card behind it, a filled-lighter one beside it, and a handful outlined. One palette
// is written here (power/RUNBOOK.md, "Inputs"), on every ModernTextInput, ModernDropdown and
// ModernCombobox in the screens and in Components.pa.yaml:
//
//   Appearance        Appearance.Outline   the enum Combo box/Dropdown/TextInput share
//   BasePaletteColor  BrandBg              the border and the focus stroke
//   Fill              NeutralBg1           the card it sits on, not a tone of its own
//   Size              TypeBodyPx           the body size in pixels, which is what a modern control
//                                          reads; the same size scripts/sweep-typography.mjs writes
//
// One thing is exempt: a control that already carries an explicit Fill that is not NeutralBg1. That
// is a decision the screen has made about a shaded field, so the whole palette is left as written
// and the control is reported instead.
//
// A tab strip is swept here too, on a palette of its own (power/RUNBOOK.md, "Tabs"). A
// ModernTabList drawn plain reads as a row of words under a hairline and nobody knows to click it,
// so every strip in the app carries the one segmented look:
//
//   BasePaletteColor  BrandBg                   the indicator and the selected label go brand
//   FontWeight        FontWeight.Semibold       the selected label reads as the chosen one
//   Size              TypeBodyPx                the pixel body size every modern control reads
//   Height            ControlHeight + 8         one strip height across the app
//
// Two things the strip does not carry: a Fill, which ModernTabList has not got, and an
// `Appearance` of `TabListAppearance.Subtle`, which would fill the selected tab rather than
// underline it but is a property Studio has never written on this control, so preflight check 37
// rejects it. Add it to `confirmed` for ModernTabList@1.0.1 in power/canvas/control-properties.json
// and to the palette here, in that order (power/canvas/CONTROLS.md, ModernTabList).

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseControls, readProperty } from "./compile-tables.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "power", "app");
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args.filter((arg) => !arg.startsWith("--"));

const INPUTS = ["ModernTextInput@1.1.1", "ModernDropdown@1.0.2", "ModernCombobox@1.1.1"];
const TABS = "ModernTabList@1.0.1";

/** The one palette, property by property, in the order it is written. */
const PALETTE = {
  Appearance: "=Appearance.Outline",
  BasePaletteColor: "=BrandBg",
  Fill: "=NeutralBg1",
  Size: "=TypeBodyPx",
};

/** The tab strip's palette: the one segmented look every ModernTabList carries. */
export const TAB_PALETTE = {
  BasePaletteColor: "=BrandBg",
  FontWeight: "=FontWeight.Semibold",
  Size: "=TypeBodyPx",
  Height: "=ControlHeight + 8",
};

// ---- reading and writing one property ----------------------------------------------------------
// The same rewrite as scripts/sweep-typography.mjs: a single-line property, replacing a block
// scalar where there is one, in front of OnSelect where the control has one.

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

/** Write `<property>: <formula>`, replacing whatever was there. Returns true when it changed. */
function setProperty(lines, node, property, formula) {
  const indent = " ".repeat(node.indent + 6);
  const range = propertyRange(lines, node, property);
  if (range) {
    if (range.end === range.start + 1 && lines[range.start] === `${indent}${property}: ${formula}`) return false;
    lines.splice(range.start, range.end - range.start, `${indent}${property}: ${formula}`);
    return true;
  }
  const at = insertionPoint(lines, node);
  if (at === null) return false;
  lines.splice(at, 0, `${indent}${property}: ${formula}`);
  return true;
}

// ---- the sweep -------------------------------------------------------------------------------------

/** True where the control has a Fill of its own that is not the palette's. */
function hasOwnFill(lines, node) {
  const fill = readProperty(lines, node, "Fill");
  return fill !== null && fill.replace(/\s+/g, " ").trim() !== PALETTE.Fill;
}

/** The palette this control is held to: the tab strip's, or the input one. */
export const paletteFor = (node) => (node.control === TABS ? TAB_PALETTE : PALETTE);

/** Every palette property this control is missing, as `{ property, from, to }`. */
export function changes(lines, node) {
  const found = [];
  for (const [property, to] of Object.entries(paletteFor(node))) {
    const from = readProperty(lines, node, property);
    if (from !== null && from.replace(/\s+/g, " ").trim() === to) continue;
    found.push({ property, from, to });
  }
  return found;
}

function main() {
  const files = only.length > 0
    ? only.map((name) => join(appDir, "Screens", `${name}.pa.yaml`))
    : [
        ...readdirSync(join(appDir, "Screens")).filter((name) => name.endsWith(".pa.yaml"))
          .map((name) => join(appDir, "Screens", name)),
        join(appDir, "Screens.flagged", "FrontDoor.pa.yaml"),
        join(appDir, "Components.pa.yaml"),
      ];

  const notes = [];
  let total = 0;
  let written = 0;

  for (const path of files) {
    const file = path.slice(join(root, "power", "app").length + 1);
    const text = readFileSync(path, "utf8");
    const newline = text.includes("\r\n") ? "\r\n" : "\n";
    const lines = text.replace(/\r\n/g, "\n").split("\n");
    const controls = [...parseControls(lines).values()]
      .filter((node) => INPUTS.includes(node.control) || node.control === TABS)
      .sort((a, b) => b.line - a.line);

    let count = 0;
    for (const node of controls) {
      if (node.control !== TABS && hasOwnFill(lines, node)) {
        notes.push(`${file}: ${node.name} keeps Fill ${readProperty(lines, node, "Fill")}; left as written`);
        continue;
      }
      const found = changes(lines, node);
      for (const change of found) {
        console.log(`  ${file} ${node.name.padEnd(24)} ${change.property.padEnd(17)} ${(change.from ?? "unset").padEnd(24)} -> ${change.to}`);
        setProperty(lines, node, change.property, change.to);
        count += 1;
      }
    }

    console.log(`${file}: ${count} change(s)`);
    total += count;
    if (count > 0 && !dry) {
      writeFileSync(path, lines.join(newline), "utf8");
      written += 1;
    }
  }

  console.log(`\n${total} change(s) on the input and tab palettes.`);
  console.log(dry ? "(dry run, nothing written)" : `${written} file(s) written.`);
  if (notes.length > 0) {
    console.log(`\n${notes.length} input(s) with a Fill of their own:`);
    for (const note of notes) console.log(`  ${note}`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
