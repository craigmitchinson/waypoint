// A static checker for the canvas app's Power Fx, offline.
//
// Studio is the only real validator (power/canvas/README.md), and a round trip to it costs an
// export, an import and an open. This script does the cheap half of that job against
// power/canvas/columns.json, the catalogue scripts/build-column-catalogue.mjs writes from the
// solution, so a name that is not a column of any table, or a column read as the wrong kind of
// thing, is found before the app is packed.
//
//   node scripts/build-column-catalogue.mjs
//   node scripts/check-formulas.mjs [--usage]
//
// It reads power/app/App.pa.yaml, Formulas.pa.yaml, Components.pa.yaml and Screens/*.pa.yaml, and
// reports, with the file, the formula and the fragment:
//
//   unknown-name       a bare or quoted name that is no column of the table in scope, no column an
//                      earlier AddColumns added, and no named formula, control, variable,
//                      collection, component or data source defined in the sources
//   bool-misuse        Coalesce(), IsBlank() or arithmetic on a two-option (bool) column
//   arith-misuse       arithmetic on a text or lookup column, or Sum() over one
//   dot-on-scalar      `.Something` on a bool, number or text column
//   choice-vs-text     a choice column compared with a text literal instead of its enum or Text()
//   lookup-bare        a lookup column used without one of its columns after it
//   text-format        Text() with more than three arguments, or a '#' after the decimal point
//   arity              a call with the wrong number of arguments
//
// It is a heuristic. An expression it cannot resolve to a table is not checked rather than guessed
// at, so it under-reports and never argues with Studio about a name it cannot see.

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "power", "app");
const catalogue = JSON.parse(readFileSync(join(root, "power", "canvas", "columns.json"), "utf8"));

// ---------------------------------------------------------------------------
// The catalogue, by the name Power Fx uses.
// ---------------------------------------------------------------------------
const tablesByDisplay = new Map();
for (const t of catalogue.tables) {
  const cols = new Map();
  for (const c of t.columns) cols.set(c.display, c);
  tablesByDisplay.set(t.display, { ...t, cols });
}
const everyColumn = new Map(); // display name -> a column, for a plausible-table check
for (const t of tablesByDisplay.values()) {
  for (const c of t.cols.values()) if (!everyColumn.has(c.display)) everyColumn.set(c.display, c);
}

// ---------------------------------------------------------------------------
// Power Fx's own names.
// ---------------------------------------------------------------------------
const functions = new Set(["Abs","Acos","AddColumns","And","Average","Blank","Boolean","Char","Clear","ClearCollect","Coalesce","Collect","Color","ColorFade","ColorValue","Concat","Concatenate","Concurrent","Count","CountA","CountIf","CountRows","Date","DateAdd","DateDiff","DateTimeValue","DateValue","Day","Distinct","DropColumns","EncodeUrl","EndsWith","Error","Exp","Filter","Find","First","FirstN","ForAll","GroupBy","GUID","Hour","If","IfError","Index","Int","IsBlank","IsBlankOrError","IsEmpty","IsError","IsMatch","IsNumeric","Language","Last","LastN","Launch","Left","Len","Ln","LoadData","Log","LookUp","Lower","Max","Mid","Min","Minute","Mod","Month","Navigate","Not","Notify","Now","Or","Patch","Power","Proper","Refresh","Remove","RemoveIf","RenameColumns","Replace","Reset","RGBA","Round","RoundDown","RoundUp","SaveData","Search","Select","Sequence","Set","ShowColumns","Shuffle","Sort","SortByColumns","Split","Sqrt","StartsWith","StdevP","Substitute","Sum","Switch","Table","Text","TimeValue","Today","Trim","TrimEnds","UpdateContext","Upper","Ungroup","Value","VarP","Weekday","With","Year"]);

const globals = new Set(["true","false","Blank","ThisRecord","ThisItem","Parent","Self","App","true","false","TimeUnit","StartOfWeek","SortOrder","Align","Color","Font","FontWeight","DateTimeFormat","VerticalAlign","Layout","DisplayMode","ScreenTransition","Overflow","LayoutDirection","LayoutMode","LayoutAlignItems","LayoutJustifyContent","Notify","NotificationType","JSONFormat","TextMode","MatchOptions","Match","ErrorKind","FormMode","Compass","Acceleration","Location","Connection","Host","Param","User","Errors","Value","Result","Notification"]);
const enumPrefixes = new Set(["TimeUnit","StartOfWeek","SortOrder","Align","Color","Font","FontWeight","DateTimeFormat","VerticalAlign","DisplayMode","ScreenTransition","Overflow","Layout","LayoutDirection","LayoutMode","LayoutAlignItems","LayoutJustifyContent","NotificationType","JSONFormat","MatchOptions","ErrorKind","FormMode","SortOrder","ImagePosition","BorderStyle","TextPosition","TextFormat","Transition","RemoveFlags","MailMergeMode","TextMode","TextPosition"]);

const arity = { Text: [1, 3], IsBlank: [1, 1], CountRows: [1, 1], Coalesce: [1, 99], LookUp: [2, 3], Filter: [2, 99], AddColumns: [3, 99], Sum: [1, 99], Round: [2, 2], RoundDown: [2, 2], RoundUp: [2, 2], DateAdd: [2, 3], DateDiff: [2, 3], Date: [3, 3], Weekday: [1, 2], Sequence: [1, 3], Concat: [2, 3], Substitute: [3, 4], Mid: [2, 3], Left: [2, 2], Right: [2, 2], Year: [1, 1], Month: [1, 1], Day: [1, 1], Value: [1, 2], Switch: [3, 99], SortByColumns: [2, 99], ShowColumns: [2, 99], GroupBy: [3, 99], ForAll: [2, 2], With: [2, 2], StartsWith: [2, 2], EndsWith: [2, 2], Lower: [1, 1], Upper: [1, 1], Max: [1, 99], Min: [1, 99], First: [1, 1], FirstN: [1, 2], Sort: [2, 3], EncodeUrl: [1, 1], ColorFade: [2, 2], ColorValue: [1, 1], Set: [2, 2], Navigate: [1, 3], SaveData: [2, 2], LoadData: [2, 3] };

// ---------------------------------------------------------------------------
// Tokens.
// ---------------------------------------------------------------------------
function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "/" && src[i + 1] === "/") { while (i < src.length && src[i] !== "\n") i++; continue; }
    if (ch === "/" && src[i + 1] === "*") { i = src.indexOf("*/", i) + 2 || src.length; continue; }
    if (/\s/.test(ch)) { i++; continue; }
    if (ch === '"') {
      let j = i + 1, v = "";
      while (j < src.length) { if (src[j] === '"' && src[j + 1] === '"') { v += '"'; j += 2; continue; } if (src[j] === '"') break; v += src[j++]; }
      out.push({ t: "str", v, i }); i = j + 1; continue;
    }
    if (ch === "'") {
      let j = i + 1, v = "";
      while (j < src.length) { if (src[j] === "'" && src[j + 1] === "'") { v += "'"; j += 2; continue; } if (src[j] === "'") break; v += src[j++]; }
      out.push({ t: "name", v, i }); i = j + 1; continue;
    }
    if (/[0-9]/.test(ch)) { let j = i; while (j < src.length && /[0-9.]/.test(src[j])) j++; out.push({ t: "num", v: src.slice(i, j), i }); i = j; continue; }
    if (/[A-Za-z_]/.test(ch)) { let j = i; while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++; out.push({ t: "id", v: src.slice(i, j), i }); i = j; continue; }
    if (ch === "<" && (src[i + 1] === "=" || src[i + 1] === ">")) { out.push({ t: "op", v: src.slice(i, i + 2), i }); i += 2; continue; }
    if (ch === ">" && src[i + 1] === "=") { out.push({ t: "op", v: ">=", i }); i += 2; continue; }
    if (ch === "&" && src[i + 1] === "&") { out.push({ t: "op", v: "&&", i }); i += 2; continue; }
    if (ch === "|" && src[i + 1] === "|") { out.push({ t: "op", v: "||", i }); i += 2; continue; }
    out.push({ t: "op", v: ch, i }); i++;
  }
  return out;
}

const OPEN = { "(": ")", "[": "]", "{": "}" };
function matchClose(toks, open) {
  const stack = [];
  for (let i = open; i < toks.length; i++) {
    const v = toks[i].v;
    if (toks[i].t === "op" && OPEN[v]) stack.push(OPEN[v]);
    else if (toks[i].t === "op" && (v === ")" || v === "]" || v === "}")) { stack.pop(); if (!stack.length) return i; }
  }
  return toks.length - 1;
}
function splitArgs(toks, open, close) {
  const args = [];
  let depth = 0, start = open + 1;
  for (let i = open + 1; i < close; i++) {
    const v = toks[i].v;
    if (toks[i].t === "op" && OPEN[v]) depth++;
    else if (toks[i].t === "op" && (v === ")" || v === "]" || v === "}")) depth--;
    else if (toks[i].t === "op" && v === "," && depth === 0) { args.push([start, i - 1]); start = i + 1; }
  }
  if (start <= close - 1) args.push([start, close - 1]);
  return args;
}

// ---------------------------------------------------------------------------
// The sources: named formulas, collections, variables, controls.
// ---------------------------------------------------------------------------
function readBlocks(file) {
  // Every `Prop: =formula` and `Prop: |` block in a .pa.yaml, plus the control and screen names.
  const text = readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const out = [];
  const names = new Set();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m = /^(\s*)-?\s*([A-Za-z_][\w]*):\s*$/.exec(line);
    if (m) { names.add(m[2]); continue; }
    m = /^(\s*)([A-Za-z_][\w]*):\s*\|-?\s*$/.exec(line);
    if (m) {
      const indent = m[1].length;
      const body = [];
      let j = i + 1;
      for (; j < lines.length; j++) {
        if (lines[j].trim() === "") { body.push(""); continue; }
        const ind = lines[j].match(/^\s*/)[0].length;
        if (ind <= indent) break;
        body.push(lines[j]);
      }
      out.push({ prop: m[2], line: i + 1, text: body.join("\n").replace(/^\s*=/, "") });
      i = j - 1;
      continue;
    }
    m = /^(\s*)([A-Za-z_][\w]*):\s*=(.*)$/.exec(line);
    if (m) { out.push({ prop: m[2], line: i + 1, text: m[3] }); continue; }
  }
  return { blocks: out, names };
}

function splitNamedFormulas(text) {
  // `Name = expr;` statements inside a Formulas block, split on the top-level semicolons.
  const toks = tokenize(text);
  const out = [];
  let depth = 0, start = 0;
  const parts = [];
  for (let i = 0; i < toks.length; i++) {
    const v = toks[i].v;
    if (toks[i].t === "op" && OPEN[v]) depth++;
    else if (toks[i].t === "op" && (v === ")" || v === "]" || v === "}")) depth--;
    else if (toks[i].t === "op" && v === ";" && depth === 0) { parts.push([start, i - 1]); start = i + 1; }
  }
  if (start < toks.length) parts.push([start, toks.length - 1]);
  for (const [lo, hi] of parts) {
    if (hi < lo) continue;
    if (toks[lo].t === "id" && toks[lo + 1] && toks[lo + 1].v === "=") {
      out.push({ name: toks[lo].v, toks, lo: lo + 2, hi });
    }
  }
  return out;
}

const files = [
  { path: join(appDir, "App.pa.yaml"), label: "App.pa.yaml" },
  { path: join(appDir, "Formulas.pa.yaml"), label: "Formulas.pa.yaml" },
  { path: join(appDir, "Components.pa.yaml"), label: "Components.pa.yaml" },
  ...readdirSync(join(appDir, "Screens")).filter((f) => f.endsWith(".pa.yaml")).map((f) => ({ path: join(appDir, "Screens", f), label: "Screens/" + f })),
];

const named = new Map(); // name -> {file, toks, lo, hi}
const definedNames = new Set();
const collections = new Map(); // colX -> table display name
const variables = new Set();
const properties = []; // {file, prop, toks, lo, hi}

for (const f of files) {
  const { blocks, names } = readBlocks(f.path);
  for (const n of names) definedNames.add(n);
  for (const b of blocks) {
    if (b.prop === "Formulas") {
      for (const nf of splitNamedFormulas(b.text)) {
        named.set(nf.name, { ...nf, file: f.label });
        definedNames.add(nf.name);
      }
      continue;
    }
    const toks = tokenize(b.text);
    properties.push({ file: f.label, prop: b.prop, toks, lo: 0, hi: toks.length - 1, text: b.text });
    // Collections and variables, wherever they are set.
    for (let i = 0; i < toks.length - 3; i++) {
      if (toks[i].t === "id" && ["ClearCollect", "Collect", "Clear", "LoadData", "SaveData"].includes(toks[i].v) && toks[i + 1].v === "(" && toks[i + 2].t === "id") {
        const col = toks[i + 2].v;
        let source = null;
        if (toks[i + 3] && toks[i + 3].v === "," ) {
          const t4 = toks[i + 4];
          if (t4 && t4.t === "name") source = t4.v;
          else if (t4 && t4.t === "id" && !functions.has(t4.v)) source = t4.v;
          else if (t4 && t4.v === "[" && toks[i + 5] && toks[i + 5].v === "@" && toks[i + 6]) source = toks[i + 6].v;
        }
        if (!collections.has(col) || (source && !collections.get(col))) collections.set(col, source);
        definedNames.add(col);
      }
      if (toks[i].t === "id" && ["Set", "UpdateContext"].includes(toks[i].v) && toks[i + 1].v === "(" && toks[i + 2].t === "id") {
        variables.add(toks[i + 2].v); definedNames.add(toks[i + 2].v);
      }
    }
  }
}
for (const t of tablesByDisplay.keys()) definedNames.add(t);
definedNames.add("Settings");

// ---------------------------------------------------------------------------
// Resolving a table expression to its columns.
// ---------------------------------------------------------------------------
const resolving = new Set();
const namedTableCache = new Map();

function colsOfTableDisplay(display) {
  const t = tablesByDisplay.get(display);
  if (!t) return null;
  const m = new Map();
  for (const c of t.cols.values()) m.set(c.display, c);
  return m;
}

function recordLiteralFields(toks, lo, hi) {
  // The fields of the record a range evaluates to: `{ ... }`, or the body of the With() around it.
  // Only the outermost expression counts, so a With() binding of its own does not pass for a row.
  if (hi < lo || !toks[lo]) return null;
  if (toks[lo].v === "{" && matchClose(toks, lo) === hi) {
    const m = new Map();
    for (const [a] of splitArgs(toks, lo, hi)) {
      const k = toks[a];
      if (!k) continue;
      if ((k.t === "id" || k.t === "name") && toks[a + 1] && toks[a + 1].v === ":") m.set(k.v, { display: k.v, type: "unknown" });
    }
    return m.size ? m : null;
  }
  if (toks[lo].t === "id" && toks[lo + 1] && toks[lo + 1].v === "(" && matchClose(toks, lo + 1) === hi) {
    const fn = toks[lo].v;
    const args = splitArgs(toks, lo + 1, hi);
    if ((fn === "With" || fn === "If" || fn === "IfError") && args.length) {
      const last = args[args.length - 1];
      return recordLiteralFields(toks, last[0], last[1]);
    }
  }
  return null;
}

function stripAs(toks, lo, hi) {
  if (hi - 1 >= lo && toks[hi - 1] && toks[hi - 1].t === "id" && toks[hi - 1].v === "As") return [lo, hi - 2, toks[hi].v];
  return [lo, hi, null];
}

function resolveTable(toks, lo0, hi0, env, depth = 0) {
  if (depth > 12 || hi0 < lo0) return null;
  const [lo, hi] = stripAs(toks, lo0, hi0);
  const first = toks[lo];
  if (!first) return null;
  if (lo === hi) {
    if (first.t === "name") return colsOfTableDisplay(first.v);
    if (first.t === "id") {
      if (env && env.scopes.has(first.v)) return env.scopes.get(first.v);
      if (collections.has(first.v)) {
        const src = collections.get(first.v);
        return src ? colsOfTableDisplay(src) : null;
      }
      if (named.has(first.v)) return namedTableColumns(first.v);
      if (tablesByDisplay.has(first.v)) return colsOfTableDisplay(first.v);
    }
    return null;
  }
  if (first.t === "id" && toks[lo + 1] && toks[lo + 1].v === "(") {
    const close = matchClose(toks, lo + 1);
    if (close !== hi) return null;
    const fn = first.v;
    const args = splitArgs(toks, lo + 1, close);
    if (!args.length) return null;
    const base = () => resolveTable(toks, args[0][0], args[0][1], env, depth + 1);
    switch (fn) {
      case "Filter": case "Sort": case "SortByColumns": case "FirstN": case "LastN": case "Shuffle": case "Search":
        return base();
      case "AddColumns": {
        const b = base();
        const m = new Map(b || []);
        for (let k = 1; k < args.length; k += 2) {
          const t = toks[args[k][0]];
          if (t && (t.t === "id" || t.t === "name")) m.set(t.v, { display: t.v, type: "unknown", added: true });
        }
        return m.size ? m : null;
      }
      case "ShowColumns": {
        const m = new Map();
        const b = base();
        for (let k = 1; k < args.length; k++) {
          const t = toks[args[k][0]];
          if (t) m.set(t.v, (b && b.get(t.v)) || { display: t.v, type: "unknown" });
        }
        return m.size ? m : null;
      }
      case "GroupBy": {
        const m = new Map();
        const b = base();
        for (let k = 1; k < args.length; k++) {
          const t = toks[args[k][0]];
          if (t) m.set(t.v, (b && b.get(t.v)) || { display: t.v, type: "unknown" });
        }
        return m.size ? m : null;
      }
      case "ForAll": {
        const f = recordLiteralFields(toks, args[args.length - 1][0], args[args.length - 1][1]);
        return f;
      }
      case "Table": {
        const f = recordLiteralFields(toks, args[0][0], args[0][1]);
        return f;
      }
      case "Sequence":
        return new Map([["Value", { display: "Value", type: "int" }]]);
      case "Distinct":
        return new Map([["Value", { display: "Value", type: "unknown" }], ["Result", { display: "Result", type: "unknown" }]]);
      case "With": {
        return resolveTable(toks, args[args.length - 1][0], args[args.length - 1][1], env, depth + 1);
      }
      default:
        return null;
    }
  }
  if (first.t === "op" && first.v === "[") return null;
  return null;
}

const recordCache = new Map();
function resolveRecord(toks, lo, hi, depth = 0) {
  // A named formula that is one row: LookUp(t, ...), First(t) or a record literal.
  if (depth > 8 || hi < lo || !toks[lo]) return null;
  const fields = recordLiteralFields(toks, lo, hi);
  if (fields) return fields;
  if (toks[lo].t === "id" && toks[lo + 1] && toks[lo + 1].v === "(" && matchClose(toks, lo + 1) === hi) {
    const fn = toks[lo].v;
    const args = splitArgs(toks, lo + 1, hi);
    if (["LookUp", "First", "Last", "Index"].includes(fn) && args.length)
      return resolveTable(toks, args[0][0], args[0][1], null);
  }
  return null;
}

function namedRecordColumns(name) {
  if (recordCache.has(name)) return recordCache.get(name);
  if (resolving.has(name)) return null;
  resolving.add(name);
  const nf = named.get(name);
  const cols = nf ? resolveRecord(nf.toks, nf.lo, nf.hi) : null;
  resolving.delete(name);
  recordCache.set(name, cols);
  return cols;
}

function namedTableColumns(name) {
  if (namedTableCache.has(name)) return namedTableCache.get(name);
  if (resolving.has(name)) return null;
  resolving.add(name);
  const nf = named.get(name);
  const cols = nf ? resolveTable(nf.toks, nf.lo, nf.hi, null) : null;
  resolving.delete(name);
  namedTableCache.set(name, cols);
  return cols;
}

// ---------------------------------------------------------------------------
// The walk.
// ---------------------------------------------------------------------------
const findings = [];
let where = { file: "", formula: "" };
function report(cls, frag, note) {
  findings.push({ cls, file: where.file, formula: where.formula, frag, note: note || "" });
}
function fragmentAt(toks, i, span = 6) {
  const lo = Math.max(0, i - 2), hi = Math.min(toks.length - 1, i + span);
  return toks.slice(lo, hi + 1).map((t) => (t.t === "name" ? `'${t.v}'` : t.t === "str" ? `"${t.v}"` : t.v)).join(" ");
}

const numeric = new Set(["int", "decimal", "money", "unknown", "guid"]);
const scalarDot = new Set(["bool", "int", "decimal", "money", "text", "memo"]);

function typeOfName(v, env) {
  for (let k = env.implicit.length - 1; k >= 0; k--) {
    const cols = env.implicit[k];
    if (cols && cols.has(v)) return cols.get(v);
  }
  return null;
}

function walk(toks, lo, hi, env, fn) {
  for (let i = lo; i <= hi; i++) {
    const tk = toks[i];
    if (!tk) break;
    // A record literal's field names are not columns.
    if ((tk.t === "id" || tk.t === "name") && toks[i + 1] && toks[i + 1].v === ":" && toks[i - 1] && (toks[i - 1].v === "{" || toks[i - 1].v === ",")) continue;
    if (tk.t === "id" && toks[i + 1] && toks[i + 1].v === "(") {
      const close = matchClose(toks, i + 1);
      const args = splitArgs(toks, i + 1, close);
      walkCall(toks, i, close, args, env);
      i = close;
      continue;
    }
    if (tk.t === "id" && (tk.v === "As" || tk.v === "in" || tk.v === "exactin")) { if (tk.v === "As") i++; continue; }
    if (toks[i - 1] && toks[i - 1].v === "." ) continue; // handled by the base below
    if (tk.t === "id" || tk.t === "name") checkName(toks, i, env, fn);
  }
}

function checkEnumName(toks, i) {
  // 'Kind (Work items)'.Feature — the choice enum, named for the column and the table.
  const m = /^(.+) \((.+)\)$/.exec(toks[i].v);
  if (!m) return false;
  const table = tablesByDisplay.get(m[2]);
  if (!table) { report("unknown-name", fragmentAt(toks, i), `no table '${m[2]}' for the choice enum`); return true; }
  const col = table.cols.get(m[1]);
  if (!col || (col.type !== "picklist" && col.type !== "bool")) { report("unknown-name", fragmentAt(toks, i), `'${m[1]}' is not a choice column of ${m[2]}`); return true; }
  if (toks[i + 1] && toks[i + 1].v === "." && toks[i + 2]) {
    const member = toks[i + 2].v;
    if (col.options && !col.options.some((o) => o.label === member)) {
      report("unknown-name", fragmentAt(toks, i), `'${member}' is not an option of ${col.display}`);
    }
  }
  return true;
}

function checkName(toks, i, env, fn) {
  const tk = toks[i];
  const v = tk.v;
  const next = toks[i + 1];
  const prev = toks[i - 1];
  if (tk.t === "name" && /^(.+) \((.+)\)$/.test(v) && checkEnumName(toks, i)) return;
  if (tk.t === "id") {
    if (functions.has(v) || globals.has(v) || enumPrefixes.has(v)) {
      if (enumPrefixes.has(v) && next && next.v === ".") return;
      // ThisItem is the gallery's row, which this checker cannot resolve; ThisRecord is the scope.
      if (v === "ThisRecord") { if (next && next.v === "." && toks[i + 2]) checkColumnRef(toks, i + 2, env, fn, true); return; }
      if (v === "ThisItem") return;
      return;
    }
    if (env.locals.has(v)) {
      if (next && next.v === "." ) return; // a With() local can be a record
      return;
    }
  }
  // A scope name bound with `As`.
  if (tk.t === "id" && env.scopes.has(v)) {
    if (next && next.v === "." && toks[i + 2]) checkColumnRef(toks, i + 2, env, fn, false, env.scopes.get(v), v);
    return;
  }
  // A column of the table in scope.
  const col = typeOfName(v, env);
  if (col) { checkColumnUse(toks, i, col, env, fn); return; }
  if (named.has(v)) {
    if (next && next.v === "." && toks[i + 2]) {
      const rec = namedRecordColumns(v);
      const m = toks[i + 2];
      if (rec && !rec.has(m.v)) report("unknown-name", fragmentAt(toks, i), `'${m.v}' is not a column of ${v}`);
      else if (rec) checkColumnUse(toks, i + 2, rec.get(m.v), env, fn);
    }
    return;
  }
  if (definedNames.has(v)) return;
  if (tablesByDisplay.has(v)) return;
  if (tk.t === "name" && prev && prev.v === "." ) return; // a column of something we cannot resolve
  // Inside an unresolved scope we keep quiet; otherwise this name is not anything we know.
  if (env.implicit.length && env.implicit[env.implicit.length - 1] === null) return;
  if (everyColumn.has(v) && env.implicit.length) {
    report("unknown-name", fragmentAt(toks, i), `'${v}' is a column of another table, not of the one in scope`);
    return;
  }
  report("unknown-name", fragmentAt(toks, i), `'${v}' is not a column in scope nor a name defined in the sources`);
}

function checkColumnRef(toks, i, env, fn, implicit, cols, scopeName) {
  const v = toks[i].v;
  const set = implicit ? (env.implicit.length ? env.implicit[env.implicit.length - 1] : null) : cols;
  if (!set) return;
  if (!set.has(v)) {
    report("unknown-name", fragmentAt(toks, i - 2), `'${v}' is not a column of ${scopeName ? scopeName : "the record in scope"}`);
    return;
  }
  checkColumnUse(toks, i, set.get(v), env, fn);
}

function checkColumnUse(toks, i, col, env, fn) {
  const next = toks[i + 1];
  const prev = toks[i - 1];
  const arith = new Set(["+", "-", "*", "/"]);
  const nextIsDot = next && next.v === ".";
  if (col.type === "bool") {
    if (fn === "Coalesce" || fn === "IsBlank") report("bool-misuse", fragmentAt(toks, i), `${fn}() on the two-option column '${col.display}'`);
    if ((next && arith.has(next.v)) || (prev && arith.has(prev.v) && !(prev.v === "-" && toks[i - 2] && toks[i - 2].v === "(")))
      report("bool-misuse", fragmentAt(toks, i), `arithmetic on the two-option column '${col.display}'`);
  }
  if (col.type === "text" || col.type === "memo" || col.type === "lookup" || col.type === "picklist") {
    if ((next && arith.has(next.v)) || (prev && arith.has(prev.v)))
      report("arith-misuse", fragmentAt(toks, i), `arithmetic on the ${col.type} column '${col.display}'`);
    if (fn === "Sum" || fn === "Average") report("arith-misuse", fragmentAt(toks, i), `${fn}() over the ${col.type} column '${col.display}'`);
  }
  if (col.type === "lookup" && nextIsDot && toks[i + 2]) {
    const target = catalogue.tables.find((t) => t.logical === col.target);
    if (target && !target.columns.some((c) => c.display === toks[i + 2].v))
      report("unknown-name", fragmentAt(toks, i), `'${toks[i + 2].v}' is not a column of ${target.display}, the table '${col.display}' points at`);
  }
  if (nextIsDot && scalarDot.has(col.type))
    report("dot-on-scalar", fragmentAt(toks, i), `'.' on the ${col.type} column '${col.display}'`);
  if (col.type === "picklist") {
    if ((next && (next.v === "=" || next.v === "<>") && toks[i + 2] && toks[i + 2].t === "str") ||
        (prev && (prev.v === "=" || prev.v === "<>") && toks[i - 2] && toks[i - 2].t === "str"))
      report("choice-vs-text", fragmentAt(toks, i), `the choice column '${col.display}' compared with a text literal`);
    if (next && next.t === "id" && next.v === "in" && toks[i + 2] && toks[i + 2].v === "[" && toks[i + 3] && toks[i + 3].t === "str")
      report("choice-vs-text", fragmentAt(toks, i), `the choice column '${col.display}' compared with text literals`);
  }
  if (col.type === "lookup" && !nextIsDot) {
    if (fn !== "IsBlank" && fn !== "IsBlankOrError" && !(next && (next.v === "=" || next.v === "<>") && toks[i + 2] && toks[i + 2].t === "id" && toks[i + 2].v === "Blank"))
      report("lookup-bare", fragmentAt(toks, i), `the lookup column '${col.display}' read without one of its columns`);
  }
}

function walkCall(toks, nameIdx, close, args, env) {
  const fn = toks[nameIdx].v;
  const open = nameIdx + 1;
  if (!functions.has(fn) && !definedNames.has(fn)) {
    report("unknown-name", fragmentAt(toks, nameIdx), `'${fn}' is not a function Power Fx knows`);
  }
  const a = arity[fn];
  if (a && (args.length < a[0] || args.length > a[1]))
    report("arity", fragmentAt(toks, nameIdx), `${fn}() got ${args.length} arguments, expected ${a[0] === a[1] ? a[0] : a[0] + "-" + a[1]}`);
  if (fn === "Text") {
    const f = args[1] && toks[args[1][0]];
    if (f && f.t === "str" && /\.[^"]*#/.test(f.v)) report("text-format", fragmentAt(toks, nameIdx), `'#' after the decimal point in "${f.v}"`);
  }
  const tableFns = new Set(["Filter", "LookUp", "Sum", "Average", "Max", "Min", "CountRows", "CountIf", "AddColumns", "ForAll", "SortByColumns", "GroupBy", "ShowColumns", "Concat", "Sort", "FirstN", "First", "Distinct", "Patch", "Collect", "ClearCollect", "RemoveIf", "With"]);

  if (fn === "With" && args.length === 2) {
    // With({a: x, b: y}, expr): the values are outer, the names are locals of the body.
    const [lo0, hi0] = args[0];
    walk(toks, lo0, hi0, env, fn);
    const fields = recordLiteralFields(toks, lo0, hi0);
    const inner = { ...env, locals: new Set([...env.locals, ...(fields ? fields.keys() : [])]) };
    walk(toks, args[1][0], args[1][1], inner, fn);
    return;
  }

  if (!tableFns.has(fn) || !args.length) {
    for (const [lo0, hi0] of args) walk(toks, lo0, hi0, env, fn);
    return;
  }

  // The first argument is a table; everything after it is read in its scope.
  const [tlo, thi] = args[0];
  const [slo, shi, asName] = stripAs(toks, tlo, thi);
  walk(toks, slo, shi, env, fn);
  let cols = resolveTable(toks, tlo, thi, env);
  // Distinct is not here: its second argument is an expression in the table's own scope.
  if (fn === "CountRows" || fn === "First" || fn === "Clear") {
    for (let k = 1; k < args.length; k++) walk(toks, args[k][0], args[k][1], env, fn);
    return;
  }
  const scopes = new Map(env.scopes);
  if (asName) scopes.set(asName, cols);
  const inner = { scopes, locals: env.locals, implicit: [...env.implicit, cols === undefined ? null : cols] };
  if (fn === "AddColumns") {
    for (let k = 1; k < args.length; k += 2) {
      if (args[k + 1]) walk(toks, args[k + 1][0], args[k + 1][1], inner, fn);
    }
    return;
  }
  if (fn === "ShowColumns" || fn === "GroupBy" || fn === "SortByColumns") {
    for (let k = 1; k < args.length; k++) {
      const t = toks[args[k][0]];
      if (args[k][0] === args[k][1] && t && (t.t === "id" || t.t === "name")) {
        if (cols && !cols.has(t.v) && !(fn === "GroupBy" && k === args.length - 1)) report("unknown-name", fragmentAt(toks, args[k][0]), `'${t.v}' is not a column of the table ${fn}() was given`);
        continue;
      }
      walk(toks, args[k][0], args[k][1], inner, fn);
    }
    return;
  }
  for (let k = 1; k < args.length; k++) walk(toks, args[k][0], args[k][1], inner, fn);
}

// ---------------------------------------------------------------------------
// Run it.
// ---------------------------------------------------------------------------
const emptyEnv = () => ({ scopes: new Map(), locals: new Set(), implicit: [] });

for (const [name, nf] of named) {
  where = { file: nf.file, formula: name };
  walk(nf.toks, nf.lo, nf.hi, emptyEnv(), null);
}
for (const p of properties) {
  where = { file: p.file, formula: p.prop };
  walk(p.toks, p.lo, p.hi, emptyEnv(), null);
}

// Which named formulas the screens and the components actually reach.
if (process.argv.includes("--usage")) {
  const roots = new Set();
  for (const p of properties) {
    if (p.file === "App.pa.yaml") continue;
    for (const t of p.toks) if (t.t === "id" && named.has(t.v)) roots.add(t.v);
  }
  const seen = new Set();
  const stack = [...roots];
  while (stack.length) {
    const n = stack.pop();
    if (seen.has(n)) continue;
    seen.add(n);
    const nf = named.get(n);
    if (!nf) continue;
    for (let i = nf.lo; i <= nf.hi; i++) if (nf.toks[i].t === "id" && named.has(nf.toks[i].v) && !seen.has(nf.toks[i].v)) stack.push(nf.toks[i].v);
  }
  console.log(`\nreached by the screens and components (${seen.size}):`);
  console.log("  " + [...seen].sort().join(" "));
  const unused = [...named.keys()].filter((n) => !seen.has(n));
  console.log(`\nnot reached (${unused.length}):`);
  console.log("  " + unused.sort().join(" "));
}

const byClass = new Map();
for (const f of findings) byClass.set(f.cls, (byClass.get(f.cls) || 0) + 1);
for (const f of findings) console.log(`${f.cls}  ${f.file}  ${f.formula}\n    ${f.note}\n    ${f.frag}`);
console.log(`\n${findings.length} findings`);
for (const [c, n] of [...byClass].sort((x, y) => y[1] - x[1])) console.log(`  ${c}: ${n}`);
process.exit(findings.length ? 1 : 0);
