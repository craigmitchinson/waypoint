// Give every reachable control a focus ring, a tab stop and a spoken name, in place.
//
//   node scripts/sweep-a11y.mjs [--dry] [ScreenName ...]
//
// With one or more bare ScreenName arguments, only those screens (by file name, no extension) are
// processed; Components.pa.yaml and every other screen are left untouched.
//
// Studio's accessibility checker read the build of 21 Sep 2026 as "Focus isn't showing" x660,
// "Missing tab stop" x727 and "Missing accessible label" x35, counted per rendered gallery row.
// Three classes of control are behind all three, and this script is the rewrite for each
// (power/RUNBOOK.md, "Accessibility"):
//
//   1. The transparent Classic/Button that carries a row's hit area (`Text: =""`). It takes a
//      focus ring — FocusedBorderThickness 2 in FocusStroke — and is
//      inset by two pixels on each side inside its parent so the ring is drawn within the row
//      rather than growing it and lifting everything below. Its spoken text is Tooltip, taken
//      from the row's title Label where there is one, because Studio rejects AccessibleLabel on
//      Classic/Button with PA2108. TabIndex 0 puts it in the tab order.
//   2. A Label@2.5.1 with an OnSelect: a link in all but name, so TabIndex 0 and a Tooltip of its
//      own Text. Label takes no focus-border property in power/canvas/CONTROLS.md, so none is
//      written and every such Label is reported instead.
//   3. A ModernDropdown, ModernTextInput, ModernCombobox or Gallery with no AccessibleLabel: it
//      gets one, from the field Label in front of it, or the gallery's own heading. Anything the
//      script cannot derive gets a label naming the screen and is reported.
//   4. An icon-only ModernButton (`Text` absent or `=""`) or an Image with no AccessibleLabel: the
//      button's label is its Tooltip where one is set, else its Icon name split into words
//      ("ChevronLeft" -> "Chevron left"), else "Button"; the image's label is a sibling title
//      Label's Text, else "Image". Existing AccessibleLabel is never overwritten.
//
// A control that has opted out of the tab order by hand (`TabIndex: =-1`) is left exactly as it
// is, in every class: that is a decision about focus order, not a missing property.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseControls, readProperty } from "./compile-tables.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "power", "app");
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args.filter((arg) => !arg.startsWith("--"));

const HIT = "Classic/Button@2.2.0";
const LABEL = "Label@2.5.1";
const GALLERY = "Gallery@2.15.0";
const INPUTS = ["ModernDropdown@1.0.2", "ModernTextInput@1.1.1", "ModernCombobox@1.1.1"];
const BUTTON = "ModernButton@1.0.0";
const IMAGE = "Image@2.2.3";

/** The theme's focus colour, from power/app/App.pa.yaml. */
const FOCUS = "=FocusStroke";
const INSET = 2;

// ---- reading and writing one property ----------------------------------------------------------

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

/**
 * Where a property this control has not got yet belongs: in front of OnSelect where there is one,
 * so the handler stays last as it is written everywhere else, otherwise after the last property.
 */
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

/** Write a property only where the control has not got one already. */
function fillProperty(lines, node, property, formula) {
  if (propertyRange(lines, node, property)) return false;
  return setProperty(lines, node, property, formula);
}

// ---- the two-pixel inset -------------------------------------------------------------------------

/** A position formula moved in by the inset, or null where it is not the flush `=0` this handles. */
function insetPosition(value) {
  if (value === "=0") return `=${INSET}`;
  if (value === `=${INSET}`) return value;
  return null;
}

/** A size formula shrunk by twice the inset, or null where it is not a single-line formula. */
function insetSize(value) {
  if (value === null || !value.startsWith("=")) return null;
  if (new RegExp(`-\\s*${INSET * 2}\\s*$`).test(value)) return value;
  return `${value} - ${INSET * 2}`;
}

// ---- deriving a name -----------------------------------------------------------------------------

/** The Text of the first Label among a control's siblings, as a formula, or null. */
function siblingLabelText(lines, node, before = false) {
  const siblings = node.parent ? node.parent.children : [];
  const candidates = siblings.filter((sibling) =>
    sibling !== node && sibling.control === LABEL && (!before || sibling.line < node.line));
  const label = before ? candidates[candidates.length - 1] : candidates[0];
  if (!label) return null;
  const text = readProperty(lines, label, "Text");
  return text && text.startsWith("=") && !text.includes("|") ? text : null;
}

/** A screen name as it reads in a sentence: Screens/QuarterClose.pa.yaml -> "Quarter close". */
function screenTitle(file) {
  const bare = file.replace(/\.pa\.yaml$/, "").split(/[\\/]/).pop();
  const words = bare.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** An Icon's plain string name as words: `="ChevronLeft"` -> `="Chevron left"`, or null. */
function iconLabel(value) {
  const match = value?.match(/^="([A-Za-z][A-Za-z0-9]*)"$/);
  if (!match) return null;
  const words = match[1].replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  return `="${words.charAt(0).toUpperCase()}${words.slice(1)}"`;
}

// ---- the sweep -------------------------------------------------------------------------------------

const files = only.length > 0
  ? only.map((name) => join(appDir, "Screens", `${name}.pa.yaml`))
  : [
      ...readdirSync(join(appDir, "Screens")).filter((name) => name.endsWith(".pa.yaml"))
        .map((name) => join(appDir, "Screens", name)),
      join(appDir, "Screens.flagged", "FrontDoor.pa.yaml"),
      join(appDir, "Components.pa.yaml"),
    ];

const notes = [];
const totals = { hit: 0, label: 0, named: 0, icon: 0, optedOut: 0 };

for (const path of files) {
  const file = path.slice(join(root, "power", "app").length + 1);
  const text = readFileSync(path, "utf8");
  const newline = text.includes("\r\n") ? "\r\n" : "\n";
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const controls = [...parseControls(lines).values()].sort((a, b) => b.line - a.line);
  const counts = { hit: 0, label: 0, named: 0, icon: 0 };

  for (const node of controls) {
    const optedOut = readProperty(lines, node, "TabIndex") === "=-1";

    // 1. the transparent hit target over a row
    if (node.control === HIT && /^=\s*""$/.test(readProperty(lines, node, "Text") ?? "")) {
      if (optedOut) {
        totals.optedOut += 1;
        notes.push(`${file}: ${node.name} keeps TabIndex -1; left as written`);
        continue;
      }
      let touched = false;
      touched = setProperty(lines, node, "FocusedBorderThickness", "=2") || touched;
      touched = fillProperty(lines, node, "FocusedBorderColor", FOCUS) || touched;
      touched = fillProperty(lines, node, "TabIndex", "=0") || touched;
      if (!propertyRange(lines, node, "Tooltip")) {
        const derived = siblingLabelText(lines, node) ?? `="Open"`;
        if (derived === `="Open"`) notes.push(`${file}: ${node.name} has no title Label; Tooltip is "Open"`);
        touched = setProperty(lines, node, "Tooltip", derived) || touched;
      }
      for (const [property, inset] of [["X", insetPosition], ["Y", insetPosition]]) {
        const value = readProperty(lines, node, property);
        const moved = value === null ? null : inset(value);
        if (moved === null) notes.push(`${file}: ${node.name} has ${property} ${value ?? "unset"}; not inset`);
        else touched = setProperty(lines, node, property, moved) || touched;
      }
      for (const property of ["Width", "Height"]) {
        const value = readProperty(lines, node, property);
        const shrunk = insetSize(value);
        if (shrunk === null) notes.push(`${file}: ${node.name} has ${property} ${value ?? "unset"}; not inset`);
        else touched = setProperty(lines, node, property, shrunk) || touched;
      }
      if (touched) counts.hit += 1;
      continue;
    }

    // 2. a Label standing in for a link
    if (node.control === LABEL && propertyRange(lines, node, "OnSelect")) {
      if (optedOut) { totals.optedOut += 1; continue; }
      let touched = fillProperty(lines, node, "TabIndex", "=0");
      if (!propertyRange(lines, node, "Tooltip")) {
        const text = readProperty(lines, node, "Text");
        const derived = text && text.startsWith("=") ? text : `="${screenTitle(file)}"`;
        touched = setProperty(lines, node, "Tooltip", derived) || touched;
      }
      // Label@2.5.1 takes no focus-border property in power/canvas/CONTROLS.md, so its focus ring
      // is the player's own and this is reported rather than written.
      notes.push(`${file}: ${node.name} is a Label with OnSelect; no focus border written`);
      if (touched) counts.label += 1;
      continue;
    }

    // 3. an input or a gallery with nothing to announce
    if ((INPUTS.includes(node.control) || node.control === GALLERY) && !propertyRange(lines, node, "AccessibleLabel")) {
      const gallery = node.control === GALLERY;
      const derived = gallery
        ? (siblingLabelText(lines, node, true) ? `${siblingLabelText(lines, node, true)} & " table"` : null)
        : siblingLabelText(lines, node, true);
      if (derived === null) notes.push(`${file}: ${node.name} (${node.control}) has no Label to name it; labelled from the screen`);
      if (setProperty(lines, node, "AccessibleLabel", derived ?? `="${screenTitle(file)} ${gallery ? "table" : "field"}"`)) counts.named += 1;
      continue;
    }

    // 1b. a ModernButton standing in for a row's hit target (the Studio trial, see
    // power/decisions.md). It carries AccessibleLabel and Tooltip by hand (ModernButton@1.0.0 has
    // no TabIndex property); nothing to derive, so it is only counted here, not rewritten.
    if (node.control === BUTTON && /^=\s*""$/.test(readProperty(lines, node, "Text") ?? "") && propertyRange(lines, node, "OnSelect")) {
      if (!optedOut) counts.hit += 1;
      continue;
    }

    // 4. an icon-only ModernButton or an Image with nothing to announce
    if ((node.control === BUTTON || node.control === IMAGE) && !propertyRange(lines, node, "AccessibleLabel")) {
      if (node.control === BUTTON) {
        const text = readProperty(lines, node, "Text");
        if (!(text === null || /^=\s*""$/.test(text))) continue;
        const tooltip = readProperty(lines, node, "Tooltip");
        const derived = tooltip ?? iconLabel(readProperty(lines, node, "Icon"));
        if (derived === null) notes.push(`${file}: ${node.name} (ModernButton) has no Tooltip or plain Icon name; AccessibleLabel is "Button"`);
        if (setProperty(lines, node, "AccessibleLabel", derived ?? `="Button"`)) counts.icon += 1;
      } else {
        const derived = siblingLabelText(lines, node);
        if (derived === null) notes.push(`${file}: ${node.name} (Image) has no title Label; AccessibleLabel is "Image"`);
        if (setProperty(lines, node, "AccessibleLabel", derived ?? `="Image"`)) counts.icon += 1;
      }
    }
  }

  totals.hit += counts.hit;
  totals.label += counts.label;
  totals.named += counts.named;
  totals.icon += counts.icon;
  if ((counts.hit > 0 || counts.label > 0 || counts.named > 0 || counts.icon > 0) && !dry) writeFileSync(path, lines.join(newline), "utf8");
  console.log(`${counts.hit.toString().padStart(4)} hit target, ${counts.label.toString().padStart(4)} link Label, ${counts.named.toString().padStart(4)} labelled, ${counts.icon.toString().padStart(4)} icon-only  ${file}`);
}

console.log(`\n${totals.hit} hit target(s) given a focus ring and an inset, ${totals.label} Label(s) given a tab stop, ${totals.named} control(s) given an AccessibleLabel, ${totals.icon} icon-only Button(s)/Image(s) given an AccessibleLabel, ${totals.optedOut} left at TabIndex -1${dry ? " (dry run, nothing written)" : ""}.`);
if (notes.length > 0) {
  console.log(`\n${notes.length} control(s) to check by hand:`);
  for (const note of notes) console.log(`  ${note}`);
}
