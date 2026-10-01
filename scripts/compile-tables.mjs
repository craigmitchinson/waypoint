// Compile the table column geometry declared in power/canvas/tables.json into the assembled YAML.
//
//   node scripts/compile-tables.mjs --list <screen file> <control>   (survey a table's cells)
//
// Every table in the app is a head row of labels over a gallery of row cells, and the two only
// read as one grid while each column's X and Width agree between them. Hand-writing those
// formulas is how a column drifts: eleven cells, each carrying the running sum of the ten before
// it, is eleven chances to miss a term. So the table is declared once — a share and a pixel
// minimum per column — and this script writes every X and Width into power/canvas/build/Src after
// scripts/assemble-canvas.mjs has put the screens there. power/app is never rewritten; it carries
// the cells, their names and everything else about them (power/RUNBOOK.md, "Table columns").
//
// The formulas written, for a table of n column slots with gap g:
//   W         = Max(Parent.Width - <padding> - 16 when the rows live in a vertical gallery,
//                   <sum of the minimums> + the gutters)         the table's inner width, declared
//                   once, on the head container (else the foot, else the row container)
//   available = W - (g x (n - 1))
//   pitch_i   = Max(available * share_i, min_i)                   the column's own width
//   X_i       = pitch_0 + ... + pitch_(i-1) + (g x i) ( + indent_i )
//   Width_i   = pitch_i ( - indent_i )
// The gutters and the scrollbar reserve come off the available width before the shares are taken,
// not off each column afterwards, so the shares add up to the width the columns actually occupy
// and the last column ends inside the frame rather than under the gallery's scrollbar.
// W is one number and every container is it: the head declares it, and the foot and the row
// container carry it by reference (`=bnCalHead.Width`), so head, rows and foot cannot compute a
// different available width and drift apart column by column. Cells inside one of those containers
// measure it with Parent.Width; cells that sit straight in a gallery template name the shared
// control instead, because Parent.Width there is the gallery's, which keeps the card's whole
// interior so that its scrollbar draws in the strip W has already given up. The padding is the host
// card's and comes off once, inside W. A table that is nothing but a gallery has no control to
// name, so its cells take the reserve off Parent.Width themselves — still one basis for the table.
//
// The compiler also owns the type on every table cell that is a Label: a column's `role` — one of
// name, text, number, money, percent, date, badge, meta, tone — says what the cell is, and the
// role says its Size, FontWeight, Color and Align, with Wrap false and no AutoHeight on every one
// of them (power/RUNBOOK.md, "Typography"). A Color that is a tone formula is a screen's own
// decision and is left alone; ownership stops at Size, FontWeight, Align and the layout properties
// for those. A `tone` column says the whole of its appearance is the screen's: the compiler writes
// the Size, the Align and the layout, and never the Color, the Fill or the FontWeight.
//
// The last column's right edge. A right-aligned last column ends at the right edge of the width
// the columns share, which on a table in a vertical gallery is where the scrollbar starts, and its
// text then reads under the scrollbar (player, build ten). So the last column, when it is right
// aligned, carries an inner right padding of its own:
//   PaddingRight = reserve + gap
// which is 16 + the gutter on a table whose rows live in a gallery and the gutter alone on one
// whose do not. Head, row and foot cells of that column take the same padding, so the header keeps
// the one right edge the rows have. That is the rule for every column: the head, the row and the
// foot cell of one column carry the same X, Width, PaddingLeft and PaddingRight, and only their
// Size, FontWeight and Color are allowed to differ by role.
//
// Two shapes a column can take beyond one cell in one column. A column whose `header`, `cell` or
// `foot` names a list of controls gives all of them the same X and Width — the two-line stack of
// a name over a role. A column with `repeat` (the twelve months of the benefits calendar) takes
// `repeat` pitches: one control named for the role spans them all, or a list of `repeat` controls
// takes one pitch each.
//
// A repeated column whose slot count is not fixed — the sprint's working days, the quarter's
// sprints — names it in `count`, a formula. `repeat` is then the most slots the settings allow,
// which is what the table's pixel minimum is held against, while the column's whole share is
// spread over `count` slots and the control spanning them is `count` pitches wide. Without it the
// span is a constant number of slots, and a sprint a day longer than the declaration loses its
// last day off the edge of the card (player, 21 Sep 2026).

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** Share and minimum a column type takes when it names neither (power/RUNBOOK.md). */
export const typeDefaults = {
  text: { share: 0.20, min: 200 },
  stack: { share: 0.24, min: 240 },
  number: { share: 0.07, min: 76 },
  date: { share: 0.10, min: 100 },
  badge: { share: 0.08, min: 96 },
  pill: { share: 0.06, min: 64 },
  month: { share: 0.045, min: 52 },
};

/**
 * The type a cell carries for its role: what the compiler writes on a Label in that column. Nine
 * roles and no others, so the same kind of cell reads the same on every screen. A role that is
 * `null` is the theme's, not the compiler's: a badge carries its own appearance, and a `tone` cell
 * names only the Size: its ink and its tint are the screen's.
 */
export const roleType = {
  header: { Size: "TypeCaption", FontWeight: "FontWeight.Semibold", Color: "NeutralFg2" },
  name: { Size: "TypeBody", FontWeight: "FontWeight.Semibold", Color: "NeutralFg1" },
  text: { Size: "TypeBody", FontWeight: "FontWeight.Normal", Color: "NeutralFg1" },
  number: { Size: "TypeBody", FontWeight: "FontWeight.Normal", Color: "NeutralFg1" },
  money: { Size: "TypeBody", FontWeight: "FontWeight.Normal", Color: "NeutralFg1" },
  percent: { Size: "TypeBody", FontWeight: "FontWeight.Normal", Color: "NeutralFg1" },
  date: { Size: "TypeBody", FontWeight: "FontWeight.Normal", Color: "NeutralFg1" },
  meta: { Size: "TypeCaption", FontWeight: "FontWeight.Normal", Color: "NeutralFg2" },
  tone: { Size: "TypeCaption" },
  badge: null,
};

/** The layout every cell the compiler owns carries: one line, clipped, never grown by its text. */
const cellLayout = { Wrap: "false", AutoHeight: "false" };

/** The second line of a stacked name column: the meta line under the name. */
const stackSecondary = roleType.meta;

/** Where a role's text sits when the column does not say: name/text/date/badge left, number/money/
 * percent right, tone/meta centre (power/RUNBOOK.md, "Table columns"). */
const roleAlign = { number: "right", money: "right", percent: "right", tone: "center", meta: "center" };

const alignName = { left: "Align.Left", center: "Align.Center", right: "Align.Right" };

/** The vertical scrollbar a gallery keeps for itself, taken off the width the columns share. */
const scrollbarReserve = 16;

// ---- the YAML the CLI writes, read as a tree of controls ---------------------------------------
// Every control is `- <name>:` at some indent, with `Control:`, `Variant:` and `Properties:` two
// spaces in and `Children:` beside them. Indentation alone says what is inside what, which is all
// this needs: the lines of one property, so they can be replaced, and each control's parent.

/** The control tree of one *.pa.yaml file's lines, flattened by name. */
export function parseControls(lines) {
  const roots = [];
  const stack = [];
  let blockIndent = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === "" || line.trimStart().startsWith("#")) continue;
    const indent = line.search(/\S/);
    if (blockIndent !== null && indent > blockIndent) continue;
    blockIndent = /:\s*\|[-+\d]*\s*$/.test(line) ? indent : null;
    const named = line.match(/^\s*-\s+([A-Za-z_]\w*):\s*$/);
    if (named) {
      while (stack.length > 0 && stack[stack.length - 1].indent >= indent) stack.pop();
      const node = {
        name: named[1],
        indent,
        line: i,
        control: null,
        variant: null,
        parent: stack.length > 0 ? stack[stack.length - 1] : null,
        children: [],
      };
      if (node.parent) node.parent.children.push(node);
      else roots.push(node);
      stack.push(node);
      continue;
    }
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) stack.pop();
    const host = stack[stack.length - 1];
    if (!host) continue;
    const control = line.match(/^\s*Control:\s*(\S+)\s*$/);
    if (control && indent === host.indent + 4) host.control = control[1];
    const variant = line.match(/^\s*Variant:\s*(\S+)\s*$/);
    if (variant && indent === host.indent + 4) host.variant = variant[1];
  }
  const flat = new Map();
  const walk = (nodes) => {
    for (const node of nodes) {
      flat.set(node.name, node);
      walk(node.children);
    }
  };
  walk(roots);
  return flat;
}

/** The line range of `<property>:` inside a control, single line or block scalar. */
function propertyRange(lines, node, property) {
  if (!node) return null;
  const bodyIndent = node.indent + 4;
  for (let i = node.line + 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "") continue;
    const indent = lines[i].search(/\S/);
    if (indent <= node.indent) break;
    const match = lines[i].match(new RegExp(`^ {${bodyIndent + 2}}${property}:\\s*(.*)$`));
    if (!match) continue;
    let end = i + 1;
    if (/^\|[-+\d]*$/.test(match[1].trim())) {
      while (end < lines.length && (lines[end].trim() === "" || lines[end].search(/\S/) > bodyIndent + 2)) end += 1;
      while (end > i + 1 && lines[end - 1].trim() === "") end -= 1;
    }
    return { start: i, end, indent: bodyIndent + 2 };
  }
  return null;
}

/** The property's current value: its formula text, leading `=` kept, on one line. */
function propertyValue(lines, range) {
  if (!range) return null;
  const first = lines[range.start].slice(range.indent).replace(/^[A-Za-z_]\w*:\s*/, "");
  if (!/^\|[-+\d]*$/.test(first.trim())) return first.trim();
  return lines
    .slice(range.start + 1, range.end)
    .map((line) => line.trim())
    .join(" ")
    .trim();
}

/** One control's property as written, on one line, or null when it carries none. */
export function readProperty(lines, node, property) {
  return propertyValue(lines, propertyRange(lines, node, property));
}

/** Replace a property's lines with a single-line `<property>: =<formula>`. */
function writeProperty(lines, range, property, formula) {
  lines.splice(range.start, range.end - range.start, `${" ".repeat(range.indent)}${property}: ${formula}`);
}

/** Add `<property>: =<formula>` to a control that has not got one yet. */
function insertProperty(lines, node, property, formula) {
  if (!node) return false;
  const bodyIndent = node.indent + 4;
  for (let i = node.line + 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "") continue;
    const indent = lines[i].search(/\S/);
    if (indent <= node.indent) break;
    if (!new RegExp(`^ {${bodyIndent}}Properties:\\s*$`).test(lines[i])) continue;
    lines.splice(i + 1, 0, `${" ".repeat(bodyIndent + 2)}${property}: ${formula}`);
    return true;
  }
  return false;
}

// ---- the arithmetic ----------------------------------------------------------------------------

const round = (value) => Number(value.toFixed(4));
const number = (value) => String(round(value));

/** The declared columns with every default filled in and the shares normalised to 1. */
export function resolveColumns(table) {
  const columns = table.columns.map((column) => {
    const defaults = typeDefaults[column.type];
    if (!defaults) throw new Error(`${table.id}: column ${column.key} has unknown type ${column.type}`);
    // The role is declared, never inferred from the type: the type is the column's geometry and
    // the role is what its cells read as, and the one does not say the other.
    if (!column.role) throw new Error(`${table.id}: column ${column.key} names no role`);
    if (!(column.role in roleType) || column.role === "header") {
      throw new Error(`${table.id}: column ${column.key} has unknown role ${column.role}`);
    }
    return {
      ...column,
      repeat: column.repeat ?? 1,
      share: column.share ?? defaults.share,
      min: column.min ?? defaults.min,
      explicit: column.share !== undefined,
    };
  });
  const weight = (list) => list.reduce((sum, column) => sum + column.share * column.repeat, 0);
  const explicit = weight(columns.filter((column) => column.explicit));
  const defaulted = weight(columns.filter((column) => !column.explicit));
  if (defaulted > 0 && 1 - explicit > 0) {
    const scale = (1 - explicit) / defaulted;
    for (const column of columns) if (!column.explicit) column.share = round(column.share * scale);
  } else {
    const total = explicit + defaulted;
    if (Math.abs(total - 1) > 0.0001) {
      for (const column of columns) column.share = round(column.share / total);
    }
  }
  return columns;
}

const pitch = (basis, column) =>
  column.count
    ? `Max(${basis} * ${number(column.share * column.repeat)} / ${column.count}, ${number(column.min)})`
    : `Max(${basis} * ${number(column.share)}, ${number(column.min)})`;
const inGallery = (node) => Boolean(node?.control?.startsWith("Gallery@"));
const isAutoLayout = (node) => Boolean(node?.control?.startsWith("GroupContainer@") && node.variant === "AutoLayout");

/** Every cell of one column, in order: the X and Width the control(s) named for a role carry. */
function columnCells(column, names, before, basis, tableGap) {
  const own = pitch(basis, column);
  const gap = column.gap ?? tableGap;
  const list = Array.isArray(names) ? names : [names];
  const slots = column.repeat > 1 && list.length === column.repeat;
  const span = slots || column.repeat === 1
    ? own
    : column.count
      ? `${own} * ${column.count}${gap ? ` + ${number(gap)} * (${column.count} - 1)` : ""}`
      : `${own} * ${column.repeat} + ${number(gap * (column.repeat - 1))}`;
  return list.map((name, index) => {
    const steps = before.pitches.length === 0 ? [] : [before.pitches.join(" + ")];
    if (slots && index > 0) steps.push(`${own} * ${index}`);
    const gutters = before.gap + (slots ? gap * index : 0);
    if (gutters > 0) steps.push(number(gutters));
    if (column.indent) steps.push(column.indent);
    return {
      control: name,
      x: `=${steps.length === 0 ? "0" : steps.join(" + ")}`,
      width: `=${slots ? own : span}${column.indent ? ` - ${column.indent}` : ""}`,
      pitch: `=${span}`,
      slot: `=${own}`,
    };
  });
}

/** Every Size, FontWeight, Color, Align, Wrap and AutoHeight one cell carries for its role. */
function columnType(column, names, role) {
  const list = Array.isArray(names) ? names : [names];
  const align = column.align ?? roleAlign[column.role] ?? "left";
  const written = [];
  for (const [index, control] of list.entries()) {
    // A stacked name column names two controls: the name, then the meta line under it. Every other
    // column's list is one slot each of a repeat, and every slot reads the same. A badge column's
    // header is still a Label, always typed and aligned as roleType.header regardless of the
    // column's own role: its Align follows the column's declared align, the same one the badge's
    // own X sits on, so the head label reads over wherever the badge is (never roleType.badge,
    // which is null — the badge's own appearance is the theme's, not this).
    const spec = role === "header"
      ? roleType.header
      : index > 0 && column.role === "name"
        ? stackSecondary
        : roleType[column.role];
    if (!spec) continue;
    const wanted = { ...spec, Align: alignName[align], ...cellLayout };
    for (const [property, formula] of Object.entries(wanted)) {
      // Align.Left is a Label's own default, and so is AutoHeight false: both are corrected where
      // a cell carries them and never added where it does not, so the build is not 400 lines of
      // redundant default.
      const soft = (property === "Align" && formula === alignName.left) || property === "AutoHeight";
      written.push({
        control,
        role: role === "header" ? "header" : column.role,
        property,
        formula: `=${formula}`,
        insert: !soft,
        soft,
        plainOnly: property === "Color",
        owner: "type",
      });
    }
  }
  return written;
}

/** Every X, Width and container Width one table's controls should carry. */
export function tableFormulas(table, controls) {
  const columns = resolveColumns(table);
  const gap = table.gap ?? 8;
  const padding = table.padding ?? "0";
  const sumMins = columns.reduce((sum, column) => sum + column.min * column.repeat, 0);
  // The gutters are the space between slots, so the last slot of the table carries none: a column
  // with a gap of its own (the calendar's months) gives the gutter that follows each of its slots.
  const gutters = columns.flatMap((column) => Array(column.repeat).fill(column.gap ?? gap));
  const sumGaps = gutters.reduce((sum, own) => sum + own, 0) - (gutters[gutters.length - 1] ?? 0);
  // A vertical gallery keeps a strip of its own width for the scrollbar, and a column that shares
  // that strip is the column the user cannot read (player, 21 Sep 2026).
  const rowNode = table.row ? controls.get(table.row) : null;
  const reserve = table.gallery || inGallery(rowNode) || inGallery(rowNode?.parent) ? scrollbarReserve : 0;
  const deduction = sumGaps + reserve;
  const wanted = [];
  const missing = [];

  // The one inner width the whole table shares. It is declared on the first container the card
  // holds directly that is not the gallery — the head, else the foot, else the row container — and
  // every other container is that control's Width by reference, so head, rows and foot take their
  // pitches off one number rather than off Parent.Width and Parent.TemplateWidth separately. The
  // reserve comes off inside it, once. Only the gallery keeps the card's whole interior: its
  // scrollbar lives in the strip the shared width has already given up.
  const cardWidth = padding === "0" ? "Parent.Width" : `Parent.Width - ${padding}`;
  const shared = `Max(${cardWidth}${reserve ? ` - ${number(reserve)}` : ""}, ${number(sumMins + sumGaps)})`;
  const baseName = [table.head, table.foot, table.row].find((name) => {
    const node = name ? controls.get(name) : null;
    return node && !inGallery(node) && !inGallery(node.parent);
  });

  const roles = [["header", table.head], ["gallery", table.gallery], ["cell", table.row], ["foot", table.foot]];
  for (const [role, containerName] of roles) {
    if (!containerName) continue;
    const container = controls.get(containerName);
    if (!container) {
      missing.push(containerName);
      continue;
    }
    if (containerName === baseName) {
      wanted.push({ control: containerName, property: "Width", formula: `=${shared}` });
    } else if (!baseName || role === "gallery" || inGallery(container)) {
      // A container inside a gallery measures the template, which the gallery has already taken the
      // card's padding off; only a container the card holds directly subtracts it.
      const outside = inGallery(container.parent) ? "Parent.TemplateWidth" : cardWidth;
      wanted.push({ control: containerName, property: "Width", formula: `=Max(${outside}, ${number(sumMins + deduction)})` });
    } else {
      wanted.push({ control: containerName, property: "Width", formula: `=${baseName}.Width` });
    }
    if (role === "gallery") continue;

    // A gallery holds its cells in the template, and those cells read the shared width by name; a
    // cell inside a head, foot or row container measures that container, which is the shared width
    // itself. A table with nothing but a gallery has no control to name, so its cells take the
    // reserve off the gallery's own width — one basis, and the only one in that table.
    const galleryCells = inGallery(container);
    const outer = galleryCells && baseName ? `${baseName}.Width` : "Parent.Width";
    const cellDeduction = sumGaps + (galleryCells && !baseName ? reserve : 0);
    const cellBasis = cellDeduction > 0 ? `(${outer} - ${number(cellDeduction)})` : outer;
    const before = { pitches: [], gap: 0 };
    for (const column of columns) {
      const names = column[role];
      for (const cell of names ? columnCells(column, names, before, cellBasis, gap) : []) {
        const node = controls.get(cell.control);
        if (!node) {
          missing.push(cell.control);
          continue;
        }
        // A repeated column drawn by a horizontal gallery takes its pitch twice: the gallery spans
        // the whole column and its template is one slot of it. A TemplateSize off a different
        // available width from the gallery's own Width is what chops the last day off the grid.
        if (column.repeat > 1 && node.control?.startsWith("Gallery@") && node.variant === "Horizontal") {
          wanted.push({ control: cell.control, property: "TemplateSize", formula: cell.slot });
        }
        // An auto-layout container lays its own children out: they carry no X, and each takes the
        // whole pitch, because the container's gap, not a gutter inside the cell, is the space
        // between them. The container itself still measures the card it sits in.
        if (isAutoLayout(node.parent)) {
          wanted.push({ control: cell.control, property: "Width", formula: cell.pitch });
          continue;
        }
        wanted.push({ control: cell.control, property: "X", formula: cell.x });
        wanted.push({ control: cell.control, property: "Width", formula: cell.width });
      }
      // A column's inner padding is the column's, not the cell's: head, rows and foot take the same
      // PaddingLeft and PaddingRight, or the one that carries its own draws its text off the column
      // by that many pixels while its X and Width agree (player, build seventeen). The only padding
      // the compiler knows is the last column's, right aligned, keeping its text off the gallery's
      // scrollbar: the reserve plus the gutter. Every other cell is corrected to zero where it
      // carries a padding and left alone where it does not.
      if (names) {
        const lastRight = column === columns[columns.length - 1]
          && (column.align ?? roleAlign[column.role] ?? "left") === "right";
        const padRight = lastRight ? number(reserve + (column.gap ?? gap)) : "0";
        for (const control of Array.isArray(names) ? names : [names]) {
          if (controls.get(control)?.control !== "Label@2.5.1") continue;
          wanted.push({ control, property: "PaddingLeft", formula: "=0", soft: true });
          wanted.push({ control, property: "PaddingRight", formula: `=${padRight}`, insert: lastRight, soft: !lastRight });
        }
      }
      // The type on the cells themselves, on the Labels among them only: a Badge or a Button
      // carries its own appearance, and the theme, not this, gives it its contrast. A foot cell
      // keeps whatever Size, FontWeight and Color the screen gave its totals row — only Align is
      // the compiler's there, so a foot value reads under its head and its cell rather than
      // drifting to its own default (power/RUNBOOK.md, "Table columns").
      if (names) {
        for (const entry of columnType(column, names, role)) {
          if (role === "foot" && entry.property !== "Align") continue;
          if (controls.get(entry.control)?.control === "Label@2.5.1") wanted.push(entry);
        }
      }
      const own = pitch(cellBasis, column);
      const slots = column.repeat > 1;
      before.pitches.push(slots ? `${own} * ${column.count ?? column.repeat}` : own);
      // One gutter per visible column: the ones inside a repeat, and the one before the next
      // column. A count column's visible columns are a formula, so its gutters go with the pitches.
      const columnGap = column.gap ?? gap;
      if (column.count && columnGap) before.pitches.push(`${number(columnGap)} * ${column.count}`);
      else before.gap += columnGap * column.repeat;
    }
  }
  return { wanted, missing };
}

// ---- applying it to build/Src -------------------------------------------------------------------

/**
 * Every table in tables.json, checked against the assembled YAML and, with `apply`, written into
 * it. Returns one record per table: how many cell formulas it owns, which of them differ from
 * what is there, and any control or property it could not find.
 */
export function compileTables(srcDir, specPath, { apply = false } = {}) {
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  const byScreen = new Map();
  for (const table of spec.tables) {
    if (!byScreen.has(table.screen)) byScreen.set(table.screen, []);
    byScreen.get(table.screen).push(table);
  }
  const report = [];
  for (const [screen, tables] of byScreen) {
    const path = join(srcDir, screen);
    let lines;
    try {
      lines = readFileSync(path, "utf8").replace(/\r\n/g, "\n").split("\n");
    } catch (error) {
      for (const table of tables) report.push({ id: table.id, screen, cells: 0, missing: [screen], differing: [] });
      continue;
    }
    let dirty = false;
    for (const table of tables) {
      const { wanted, missing } = tableFormulas(table, parseControls(lines));
      const differing = [];
      let typed = 0;
      // A write moves the lines under it, so every property is looked up again as it is written.
      for (const { control, property, formula, owner, insert, soft, plainOnly } of wanted) {
        const node = parseControls(lines).get(control);
        const range = propertyRange(lines, node, property);
        const current = range ? propertyValue(lines, range) : null;
        // A tone formula — and any other colour the screen computes, a state colour among them — is
        // the screen's own judgement about what the value means; type ownership stops at Size,
        // FontWeight and Align on a cell that carries one. Only a flat token is the compiler's.
        if (plainOnly && current !== null && !/^=\s*[A-Za-z_]\w*\s*$/.test(current)) continue;
        if (!range) {
          if (soft) continue;
          if (!insert) {
            missing.push(`${control}.${property}`);
            continue;
          }
          differing.push(`${control}.${property}`);
          if (owner === "type") typed += 1;
          if (apply) {
            if (!insertProperty(lines, node, property, formula)) missing.push(`${control}.${property}`);
            else dirty = true;
          }
          continue;
        }
        if (current === formula) continue;
        differing.push(`${control}.${property}`);
        if (owner === "type") typed += 1;
        if (apply) {
          writeProperty(lines, range, property, formula);
          dirty = true;
        }
      }
      const type = wanted.filter((entry) => entry.owner === "type").length;
      report.push({ id: table.id, screen, cells: wanted.length - type, type, typed, missing, differing });
      if (apply) {
        console.log(
          `compile-tables: ${table.id} — ${wanted.length - type} geometry, ${type} type formula(s) on ${screen}, ${typed} written`,
        );
      }
    }
    if (apply && dirty) writeFileSync(path, lines.join("\n"), "utf8");
  }
  return report;
}

// ---- --list, for writing a table's entry in tables.json ----------------------------------------
if (process.argv.includes("--list")) {
  const [, screen, control] = process.argv.slice(process.argv.indexOf("--list"));
  const lines = readFileSync(screen, "utf8").replace(/\r\n/g, "\n").split("\n");
  const controls = parseControls(lines);
  const host = controls.get(control);
  if (!host) {
    console.error(`compile-tables: no control named ${control} in ${screen}`);
    process.exit(1);
  }
  console.log(`${host.name}  ${host.control} ${host.variant ?? ""}  in ${host.parent?.name ?? "(screen)"} ${host.parent?.control ?? ""}`);
  console.log(`  Width ${propertyValue(lines, propertyRange(lines, host, "Width"))}`);
  for (const child of host.children) {
    console.log(`  - ${child.name}  ${child.control}`);
    console.log(`      X     ${propertyValue(lines, propertyRange(lines, child, "X"))}`);
    console.log(`      Width ${propertyValue(lines, propertyRange(lines, child, "Width"))}`);
  }
}
