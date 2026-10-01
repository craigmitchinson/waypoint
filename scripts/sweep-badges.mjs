// Route every screen's pill through the component that draws one, and take the brand fill off text.
//
//   node scripts/sweep-badges.mjs [--dry] [ScreenName ...]
//
// With one or more bare ScreenName arguments, only those screens (by file name, no extension) are
// processed. Components.pa.yaml is never processed: cmpPill's own Badge is the one this sweep
// routes everything else towards.
//
// Three rewrites, all from the audit of the components (power/audit/05c-screen-import-and-
// components.md): cmpPill had four instances on one screen while the screens hand-built fifteen
// raw Badge controls and thirty-six 'BadgeCanvas.ThemeColor' Switches between them.
//
//   1. A raw Badge@0.0.24 on a screen becomes a cmpPill instance with the same name, the same X
//      and Y, the same Visible, its Content as Label and its ThemeColor read back into a Tone
//      name. Width becomes Min(Max(Len(<Label>) * 7 + 20, 56), 200), wrapped in With({t: <Label>},
//      ...) where Label is more than a bare reference, and Height becomes TypeLabelLine: an
//      instance does not inherit the definition's own sizing formulas, so a converted instance
//      without them takes the definition's design-time size instead. Where the badge sits in a
//      ManualLayout row its Y is re-centred on the label line alone, (RowH - TypeLabelLine) / 2,
//      because the height that made it taller has gone.
//
//      A Badge inside a gallery template cannot become a cmpPill instance: a canvas component
//      instance may not sit inside one (PA2305, power/RUNBOOK.md, "Components"). Rule 3 below
//      sizes it instead.
//
//   2. A Label's or a ModernButton's Color of BrandBg becomes BrandText. BrandBg is a fill; read
//      as text on NeutralBg1 it is 2.30:1 in dark mode, which preflight's contrast check fails.
//      BrandText is the same brand in light mode and the lifted brand in dark (App.pa.yaml).
//
//   3. A raw Badge@0.0.24 inside a gallery template, left in place by rule 1, is sized to its own
//      label instead of the row: Width becomes Min(Max(Len(<Content>) * 7 + 20, 56), 200), wrapped
//      in With({t: <Content>}, ...) where Content is more than a simple reference so it is only
//      evaluated once; Height becomes TypeLabelLine; Y is re-centred on the label line against the
//      row-height token read from the enclosing gallery's own TemplateSize. Appearance is
//      untouched. A badge whose Content or enclosing gallery this sweep cannot read is reported,
//      not rewritten.
//
// The tone each 'BadgeCanvas.ThemeColor' member becomes, which is what cmpPill's own Switch takes
// (Components.pa.yaml, cmpPill.Tone): Brand and Important -> "brand", Danger -> "bad", Warning ->
// "warn", Success -> "good", Subtle and Informative -> "neutral". cmpPill has no Informative and
// no Important of its own; a badge that used either is reported so the loss is visible.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseControls, readProperty } from "./compile-tables.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "power", "app");
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args.filter((arg) => !arg.startsWith("--"));

const BADGE = "Badge@0.0.24";
const LABEL = "Label@2.5.1";
const BUTTON = "ModernButton@1.0.0";
const GALLERY = "Gallery@2.15.0";
const PILL = "cmpPill";

/** The tone name cmpPill takes for each theme colour a hand-built badge used. */
const TONES = {
  Brand: "brand",
  Important: "brand",
  Danger: "bad",
  Warning: "warn",
  Success: "good",
  Subtle: "neutral",
  Informative: "neutral",
};

/** The members cmpPill cannot say in a tone of its own, so a badge using one changes colour. */
const LOSSY = new Set(["Informative", "Important"]);

// ---- reading one property ----------------------------------------------------------------------

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

/** A property's lines as written, with its name changed and its formula put through `rewrite`. */
function movedProperty(lines, node, property, renamed, rewrite = (value) => value) {
  const range = propertyRange(lines, node, property);
  if (!range) return null;
  return lines.slice(range.start, range.end).map((line, index) =>
    (index === 0 ? rewrite(line).replace(`${property}:`, `${renamed}:`) : rewrite(line)));
}

/** The last line of a control's whole block, its own line included. */
function controlEnd(lines, node) {
  let end = node.line + 1;
  for (let i = node.line + 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "") continue;
    if (lines[i].search(/\S/) <= node.indent) break;
    end = i + 1;
  }
  return end;
}

/** True where the control, or a container above it, is a gallery template (PA2305). */
function inGallery(node) {
  for (let up = node.parent; up; up = up.parent) if (up.control === GALLERY) return true;
  return false;
}

// ---- the gallery badge -------------------------------------------------------------------------

/** The row-height token the nearest enclosing gallery's own TemplateSize names, if it is one. */
function rowToken(lines, node) {
  for (let up = node.parent; up; up = up.parent) {
    if (up.control !== GALLERY) continue;
    const size = readProperty(lines, up, "TemplateSize");
    return size ? size.replace(/^=/, "") : null;
  }
  return null;
}

/** True where a formula is a bare reference or literal, cheap enough to evaluate twice over. */
function simpleReference(value) {
  return /^"([^"\\]|\\.)*"$/.test(value)
    || /^[A-Za-z_]\w*(\.([A-Za-z_]\w*|'[^']*'))*$/.test(value);
}

/** The Width formula a gallery badge's Content sizes to, wrapped in With() where it is not bare. */
function sizeFormula(content) {
  const value = content.replace(/^=/, "");
  if (simpleReference(value)) return `=Min(Max(Len(${value}) * 7 + 20, 56), 200)`;
  return `=With({t: ${value}}, Min(Max(Len(t) * 7 + 20, 56), 200))`;
}

/** Replace one property's lines, whatever their shape, with `<property>: <formula>`, block
 *  scalar where the formula has a ": " YAML would otherwise read as a mapping (a With() body).
 *  Left alone where it already reads exactly that. Reports whether anything changed. */
function setProperty(lines, node, property, formula) {
  const range = propertyRange(lines, node, property);
  if (!range) return false;
  const indent = " ".repeat(node.indent + 6);
  const body = formula.includes(": ")
    ? [`${indent}${property}: |`, `${indent}  ${formula}`]
    : [`${indent}${property}: ${formula}`];
  const current = lines.slice(range.start, range.end);
  if (current.length === body.length && current.every((line, i) => line === body[i])) return false;
  lines.splice(range.start, range.end - range.start, ...body);
  return true;
}

// ---- the pill --------------------------------------------------------------------------------

/** The tone formula a badge's ThemeColor becomes, and the members it lost on the way. */
function toneOf(value) {
  const lost = [];
  const tone = value.replace(/'BadgeCanvas\.ThemeColor'\.(\w+)/g, (whole, member) => {
    if (!(member in TONES)) return whole;
    if (LOSSY.has(member)) lost.push(member);
    return `"${TONES[member]}"`;
  });
  return { tone, lost, known: !tone.includes("'BadgeCanvas.ThemeColor'") };
}

/** A row's Y re-centred on the label line alone, now the badge's own height has gone. */
function centredY(value, manual) {
  if (!manual || value === null) return value;
  const match = value.match(/^=\((.+?) - TypeLabelLine(?: - \d+)?\) \/ 2$/);
  return match ? `=(${match[1]} - TypeLabelLine) / 2` : value;
}

// ---- the sweep ---------------------------------------------------------------------------------

const files = only.length > 0
  ? only.map((name) => (name === "FrontDoor" ? join("Screens.flagged", `${name}.pa.yaml`) : join("Screens", `${name}.pa.yaml`)))
  : [
      ...readdirSync(join(appDir, "Screens")).filter((name) => name.endsWith(".pa.yaml"))
        .map((name) => join("Screens", name)),
      join("Screens.flagged", "FrontDoor.pa.yaml"),
    ];

const totals = { pills: 0, colours: 0, gallery: 0 };
const notes = [];

for (const file of files) {
  const path = join(appDir, file);
  const text = readFileSync(path, "utf8");
  const newline = text.includes("\r\n") ? "\r\n" : "\n";
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const counts = { pills: 0, colours: 0, gallery: 0 };

  // 2. the brand fill read as text. Done first: the badges below are spliced by line number.
  for (const node of parseControls(lines).values()) {
    if (node.control !== LABEL && node.control !== BUTTON) continue;
    const range = propertyRange(lines, node, "Color");
    if (!range || range.end !== range.start + 1) continue;
    if (!/^\s*Color:\s*=BrandBg\s*$/.test(lines[range.start])) continue;
    lines[range.start] = lines[range.start].replace("=BrandBg", "=BrandText");
    counts.colours += 1;
  }

  // 1. the hand-built pills, last one first so the splices do not move the ones still to come.
  const badges = [...parseControls(lines).values()].filter((node) => node.control === BADGE);
  for (const node of badges.reverse()) {
    if (inGallery(node)) {
      const token = rowToken(lines, node);
      const content = readProperty(lines, node, "Content");
      if (!token) {
        notes.push(`${file}: ${node.name} is a Badge in a gallery whose TemplateSize this sweep cannot read; left as it is`);
        continue;
      }
      if (content === null) {
        notes.push(`${file}: ${node.name} is a Badge with no Content; left as it is`);
        continue;
      }
      const width = setProperty(lines, node, "Width", sizeFormula(content));
      const height = setProperty(lines, node, "Height", "=TypeLabelLine");
      const y = setProperty(lines, node, "Y", `=(${token} - TypeLabelLine) / 2`);
      if (width || height || y) counts.gallery += 1;
      continue;
    }
    const themeColor = readProperty(lines, node, "ThemeColor");
    const content = propertyRange(lines, node, "Content");
    if (!content) {
      notes.push(`${file}: ${node.name} is a Badge with no Content; left as it is`);
      continue;
    }
    const { tone, lost, known } = toneOf(themeColor ?? "=neutral");
    if (themeColor !== null && !known) {
      notes.push(`${file}: ${node.name} has a ThemeColor this sweep cannot read as a tone; left as it is`);
      continue;
    }
    for (const member of new Set(lost)) {
      notes.push(`${file}: ${node.name} used 'BadgeCanvas.ThemeColor'.${member}, which cmpPill has no tone for; it is now ${TONES[member]}`);
    }

    const indent = " ".repeat(node.indent + 4);
    const manual = node.parent?.variant === "ManualLayout";
    const body = [
      `${indent}Control: CanvasComponent`,
      `${indent}ComponentName: ${PILL}`,
      `${indent}Properties:`,
    ];
    const x = movedProperty(lines, node, "X", "X");
    if (x) body.push(...x);
    const yRange = propertyRange(lines, node, "Y");
    if (yRange) {
      const y = yRange.end === yRange.start + 1
        ? [lines[yRange.start].replace(/Y:\s*.*$/, `Y: ${centredY(readProperty(lines, node, "Y"), manual)}`)]
        : lines.slice(yRange.start, yRange.end);
      body.push(...y);
    }
    const visible = movedProperty(lines, node, "Visible", "Visible");
    if (visible) body.push(...visible);
    body.push(...movedProperty(lines, node, "Content", "Label"));
    body.push(...(themeColor === null
      ? [`${indent}  Tone: ="neutral"`]
      : movedProperty(lines, node, "ThemeColor", "Tone", (line) =>
          line.replace(/'BadgeCanvas\.ThemeColor'\.(\w+)/g, (whole, member) =>
            (member in TONES ? `"${TONES[member]}"` : whole)))));
    const label = readProperty(lines, node, "Content") ?? '=""';
    const width = sizeFormula(label);
    body.push(...(width.includes(": ")
      ? [`${indent}  Width: |`, `${indent}    ${width}`]
      : [`${indent}  Width: ${width}`]));
    body.push(`${indent}  Height: =TypeLabelLine`);

    lines.splice(node.line + 1, controlEnd(lines, node) - node.line - 1, ...body);
    counts.pills += 1;
  }

  totals.pills += counts.pills;
  totals.colours += counts.colours;
  totals.gallery += counts.gallery;
  if ((counts.pills > 0 || counts.colours > 0 || counts.gallery > 0) && !dry) writeFileSync(path, lines.join(newline), "utf8");
  console.log(`${counts.pills.toString().padStart(4)} pill, ${counts.colours.toString().padStart(4)} brand text, ${counts.gallery.toString().padStart(4)} gallery badge sized  ${file}`);
}

console.log(`\n${totals.pills} raw Badge(s) routed through ${PILL}, ${totals.colours} Color(s) of BrandBg now BrandText, ${totals.gallery} Badge(s) inside gallery templates sized to their label${dry ? " (dry run, nothing written)" : ""}.`);
if (notes.length > 0) {
  console.log(`\n${notes.length} badge(s) to check by hand:`);
  for (const note of notes) console.log(`  ${note}`);
}
