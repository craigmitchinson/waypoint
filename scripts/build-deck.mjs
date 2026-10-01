// Builds power/deck/Waypoint-playback.pptx from power/deck/outline.md.
//
//   node scripts/build-deck.mjs
//
// The outline is the content and this file is only the layout: a copy edit in outline.md
// regenerates the deck with no change here. Each `## <n>. <title>` block becomes one slide, and its
// **Visual** key picks the archetype that draws it. **Body** never reaches the slide; it goes into
// the speaker notes, so prose can be as long as it needs to be without crowding the layout.
//
// Colours and fonts come from ../ccs-ui/tokens.css, read at build time, so the deck follows the
// suite tokens rather than carrying its own palette. The display serif and the body sans are taken
// from the token stacks, using the first family installed in the system font directory. The brand
// faces (Fraunces, Inter, JetBrains Mono) ship as woff2 for the web and are not installed as system
// fonts, so PowerPoint resolves the next tier of each stack: Georgia, Calibri, Consolas. That is
// deliberate — a deck that gets forwarded must render on a machine that has none of our fonts.
//
// pptxgenjs is not a dependency of this app; it is resolved from a sibling suite app that has it,
// or from a local node_modules if one is present.

import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const suite = join(root, "..");
const outlineFile = join(root, "power", "deck", "outline.md");
const outFile = process.env.DECK_OUT || join(root, "power", "deck", "Waypoint-playback.pptx");
const tokensFile = join(root, "ccs-ui", "tokens.css");
const fontsDir = process.env.DECK_FONTS_DIR || "C:/Windows/Fonts";

const FOOTER = "Waypoint playback · 21 September 2026";

/** Sibling apps that carry pptxgenjs, in the order we would rather borrow it from. */
const pptxHosts = ["roadmap-slide", "show-and-tell", "operating-model", "delivery-playbook"];

function loadPptxgen() {
  const require = createRequire(import.meta.url);
  const local = join(root, "node_modules", "pptxgenjs", "dist", "pptxgen.cjs.js");
  if (existsSync(local)) return require(local);
  for (const host of pptxHosts) {
    const entry = join(suite, host, "node_modules", "pptxgenjs", "dist", "pptxgen.cjs.js");
    if (existsSync(entry)) return require(entry);
  }
  throw new Error(`pptxgenjs not found in any of: ${pptxHosts.join(", ")}`);
}

// ---------------------------------------------------------------------------
// Tokens

/** The light-theme `--c-*` values from tokens.css, as `RRGGBB` without the hash. */
function readTokens() {
  const css = readFileSync(tokensFile, "utf8");
  // The first mention of the dark theme is in the file's own comment, so split on the rule itself.
  const dark = css.search(/\[data-theme=["']dark["']\]\s*\{/);
  const light = dark === -1 ? css : css.slice(0, dark);
  const map = {};
  for (const [, name, value] of light.matchAll(/--c-([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g)) {
    map[name] = value.slice(1).toUpperCase();
  }
  return map;
}

/**
 * The first family in each stack that is installed, else the last resort.
 * The brand faces (Fraunces/Inter, or Manrope/IBM Plex) ship for the web and are usually not
 * installed as system fonts, so PowerPoint would substitute silently. Resolving here means the
 * build log says which face the deck will actually render in.
 */
function readFonts(stacks) {
  const stack = (name) => stacks[name];
  const installed = new Set();
  if (existsSync(fontsDir)) {
    for (const file of readdirSync(fontsDir)) {
      installed.add(file.replace(/\.(ttf|otf|ttc)$/i, "").toLowerCase());
    }
  }
  // Windows file names drop the space and often the last letters: "Consolas" is consola.ttf.
  const named = [...installed].map((n) => n.replace(/[^a-z]/g, ""));
  const has = (family) => {
    const f = family.toLowerCase().replace(/[^a-z]/g, "");
    return named.some((n) => n === f || (n.length >= 5 && f.startsWith(n)));
  };
  const generic = /^(serif|sans-serif|monospace|system-ui|cursive)$/i;
  const pick = (name) => {
    const families = stack(name)
      .split(",")
      .map((raw) => raw.trim().replace(/^['"]|['"]$/g, ""))
      .filter((family) => family && !generic.test(family));
    for (const family of families) {
      if (has(family)) return family;
    }
    // Nothing in the stack is installed — which is the normal case when building somewhere other
    // than the machine that will open the deck. Fall to the first family in the stack that ships
    // with Windows and macOS, so the deck renders as intended rather than as Times New Roman.
    const safe = new Set([
      "georgia", "times new roman", "arial", "helvetica", "verdana", "tahoma", "trebuchet ms",
      "calibri", "segoe ui", "consolas", "courier new", "cambria", "candara",
    ]);
    for (const family of families) {
      if (safe.has(family.toLowerCase())) return family;
    }
    return families[families.length - 1];
  };
  return { display: pick("display"), body: pick("body"), mono: pick("mono") };
}

// ---------------------------------------------------------------------------
// Brand
//
// DECK_BRAND picks one of the brands in power/deck/brands.json. `ccs` keeps taking its colours
// live from tokens.css so the suite stays the single source; `agentic` carries the Agentic
// Operations lab identity from the Branding toolkit for four labs and is a dark ground, so every
// archetype reads its colours through the semantic names below rather than assuming a light slide.

const brandsFile = join(root, "power", "deck", "brands.json");
const brands = JSON.parse(readFileSync(brandsFile, "utf8"));
const brandName = process.env.DECK_BRAND || "ccs";
const brand = brands[brandName];
if (!brand) {
  throw new Error(`unknown DECK_BRAND "${brandName}"; brands.json has: ${Object.keys(brands).filter((k) => !k.startsWith("_")).join(", ")}`);
}

const font = readFonts(brand.fonts);

function ccsTheme() {
  const c = readTokens();
  return {
    ink: c.ink, muted: c.muted, line: c.line,
    surface: c.surface, panel: c.panel, panelAlt: c["panel-alt"], bg: c.bg,
    brand: c.brand, brandMid: c["brand-mid"], brandSoft: c["brand-soft"],
    accent: c.red, good: c.green, warn: c.amber, info: c["brand-soft"],
    band: c.brand, bandInk: c.cream, bandSoft: c["brand-soft"],
    cover: c.brand, coverInk: c.cream, coverSoft: c["brand-soft"],
    figure: c.brand, emphasis: c["brand-mid"], bandEdge: c.red,
    cream: c.cream, white: "FFFFFF",
  };
}

const theme = brandName === "ccs" ? ccsTheme() : brand.colors;
const labs = brand.labs || null;

// ---------------------------------------------------------------------------
// Outline
//
// outline.md is edited on Windows and is therefore CRLF. Normalising line endings on read is not
// cosmetic: every field here is delimited by a blank line, and `\n\n` never matches in a CRLF file,
// so without this each field swallows the rest of its block.

/** One slide per `## <n>. <title>` block. */
function readOutline() {
  const md = readFileSync(outlineFile, "utf8").replace(/\r\n/g, "\n");
  // Drop the preamble: the first `---` rule separates the file's own instructions from slide one.
  const body = md.slice(md.indexOf("\n---\n") + 1);
  const blocks = body.split(/^## /m).slice(1);

  return blocks.map((block) => {
    const [heading, ...rest] = block.split("\n");
    const text = rest.join("\n");

    /** A `**Name:**` field, up to the next blank line. */
    const field = (name) => {
      const m = text.match(new RegExp(`\\*\\*${name}:\\*\\*[ \\t]*([\\s\\S]*?)(?=\\n\\s*\\n|$)`));
      return m ? m[1].replace(/\s+/g, " ").trim() : "";
    };

    /** The `- ` lines belonging to a `**Name:**` field, ignoring any inline value on that line. */
    const list = (name) => {
      const m = text.match(new RegExp(`\\*\\*${name}:\\*\\*[^\\n]*\\n([\\s\\S]*?)(?=\\n\\s*\\n|$)`));
      if (!m) return [];
      return m[1]
        .split("\n")
        .map((line) => line.match(/^\s*-\s+(.*)$/))
        .filter(Boolean)
        .map((hit) => hit[1].replace(/`/g, "").trim());
    };

    /** The value sitting on the `**Name:**` line itself, before any list beneath it. */
    const head = (name) => {
      const m = text.match(new RegExp(`\\*\\*${name}:\\*\\*[ \\t]*([^\\n]*)`));
      return m ? m[1].trim() : "";
    };

    const visual = field("Visual");
    const key = visual.match(/`([a-z-]+)`/);

    return {
      number: Number(heading.match(/^(\d+)\./)[1]),
      title: heading.replace(/^\d+\.\s*/, "").trim(),
      part: field("Part"),
      idea: field("Idea"),
      body: field("Body"),
      visualKey: key ? key[1] : "bullets",
      visualNote: visual.replace(/`[a-z-]+`\s*/, "").trim(),
      points: list("Points"),
      hero: field("Hero"),
      stats: list("Stats"),
      leftLabel: head("Left"),
      left: list("Left"),
      rightLabel: head("Right"),
      right: list("Right"),
      decision: field("Decision"),
      callout: field("Callout"),
      shots: list("Shots"),
    };
  });
}

// ---------------------------------------------------------------------------
// Build history, read from the evaluation log itself.
//
// This used to be a hardcoded array of ten points. It disagreed with the log: it invented
// timestamps, dropped every import whose errors were too many to count, and dropped every import
// nobody checked, which turned a real arc into a flat line with one spike. The log is the source,
// so the deck reads the log. `not checked` is never plotted as zero, because the log is explicit
// that nobody looking is not the same as nothing being wrong.

const evalLogFile = join(root, "power", "tests", "evaluation-log.md");

/** How a row's Studio column should be read: a count, too many to count, clean, or unchecked. */
function readStudioState(cell) {
  const text = cell.toLowerCase();
  if (/^not checked/.test(text) || /^not reported/.test(text)) {
    return { kind: "unchecked", label: "–" };
  }
  if (/^many/.test(text)) return { kind: "many", label: "many" };
  if (/opened clean/.test(text)) {
    const formula = text.match(/(\d+)\s+formula errors?/);
    return { kind: "clean", label: "0", note: formula ? `${formula[1]} formula` : "" };
  }
  const errors = text.match(/(\d+)\s+(?:runtime\s+)?errors?/);
  if (errors) return { kind: "counted", count: Number(errors[1]), label: errors[1] };
  return { kind: "unchecked", label: "–" };
}

/** One entry per import row in the evaluation log's table. */
function readBuildHistory() {
  const md = readFileSync(evalLogFile, "utf8").replace(/\r\n/g, "\n");
  const rows = [];
  for (const line of md.split("\n")) {
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 7) continue;
    const when = cells[0].match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}:\d{2})$/);
    if (!when) continue; // the header row and its separator
    rows.push({
      day: `${when[3]}/${when[2]}`,
      time: when[4],
      studio: readStudioState(cells[4]),
    });
  }
  return rows;
}

/**
 * Before/after pairs for the screenshots archetype, declared in the outline as
 * `before | after | caption` so the two halves are always the same screen. A missing after file
 * draws an empty frame rather than a second unrelated "before", which is not a comparison.
 */
function readShots(s) {
  return s.shots.map((line) => {
    const [before, after, caption] = line.split("|").map((part) => part.trim());
    return {
      before: join(root, before),
      after: after ? join(root, after) : null,
      caption: caption || "",
    };
  });
}

// ---------------------------------------------------------------------------
// Layout
//
// The canvas is 13.333 x 7.5. Every coordinate below is in inches on that canvas, so the layout
// must be LAYOUT_WIDE; on the 10 x 5.625 default everything right of 10" falls off the slide.

const W = 13.333;
const H = 7.5;

const L = {
  m: 0.78,                 // left and right margin
  get w() { return W - this.m * 2; },
  eyebrowY: 0.54,
  titleY: 0.82,
  ideaY: 1.66,
  ruleY: 2.16,
  contentY: 2.4,
  contentH: 4.2,
  footY: 6.96,
};

// ---------------------------------------------------------------------------
// Chrome

function addChrome(slide, s, index, total) {
  slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.085, fill: { color: theme.band } });
  slide.addShape("rect", { x: 0, y: 0, w: 1.7, h: 0.085, fill: { color: theme.accent } });

  slide.addText((s.section || "Waypoint").toUpperCase(), {
    x: L.m, y: L.eyebrowY, w: 9, h: 0.26,
    fontFace: font.mono, fontSize: 9.5, color: theme.muted, charSpacing: 1.6,
  });

  slide.addText(s.title, {
    x: L.m, y: L.titleY, w: L.w, h: 0.78,
    fontFace: font.display, fontSize: 30, bold: true, color: theme.ink, valign: "top",
  });

  if (s.idea) {
    slide.addText(s.idea, {
      x: L.m, y: L.ideaY, w: L.w, h: 0.44,
      fontFace: font.display, fontSize: 15.5, italic: true, color: theme.emphasis, valign: "top",
    });
  }

  slide.addShape("rect", { x: L.m, y: L.ruleY, w: L.w, h: 0.01, fill: { color: theme.line } });

  slide.addText(FOOTER, {
    x: L.m, y: L.footY, w: 7, h: 0.26,
    fontFace: font.body, fontSize: 9, color: theme.muted,
  });
  slide.addText(`${index} / ${total}`, {
    x: W - L.m - 1.2, y: L.footY, w: 1.2, h: 0.26, align: "right",
    fontFace: font.mono, fontSize: 9, color: theme.muted,
  });
}

/** The note that sits just under the rule, above whatever the visual draws. */
function addVisualNote(slide, s) {
  if (!s.visualNote) return 0;
  slide.addText(s.visualNote, {
    x: L.m, y: L.contentY - 0.04, w: L.w, h: 0.28,
    fontFace: font.mono, fontSize: 9.5, color: theme.muted, charSpacing: 0.5,
  });
  return 0.42;
}

/**
 * An optional band carrying the one fact the slide would be poorer for burying in the notes.
 * Returns the height it consumed, so the visual beneath it can shrink by that much.
 */
function addCallout(slide, s, top) {
  if (!s.callout) return 0;
  const h = 0.88;
  panel(slide, { x: L.m, y: top, w: L.w, h, fill: theme.panel, line: null });
  slide.addShape("rect", { x: L.m, y: top, w: 0.06, h, fill: { color: theme.accent } });
  slide.addText(s.callout, {
    x: L.m + 0.38, y: top, w: L.w - 0.76, h,
    fontFace: font.display, fontSize: 14, color: theme.ink, valign: "middle",
  });
  return h + 0.3;
}

function panel(slide, { x, y, w, h, fill = theme.surface, line = theme.line, radius = 0.06 }) {
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: radius,
    fill: { color: fill },
    line: line ? { color: line, width: 0.75 } : { type: "none" },
  });
}

function box(slide, { x, y, w, h, text, fill, color, size = 11, bold = false, face = font.body, line = theme.line }) {
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: fill },
    line: line ? { color: line, width: 0.75 } : { type: "none" },
  });
  slide.addText(text, {
    x, y, w, h, align: "center", valign: "middle",
    fontFace: face, fontSize: size, bold, color, margin: 3,
  });
}

function connector(slide, x1, y1, x2, y2, dash = false) {
  slide.addShape("line", {
    x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    line: {
      color: theme.brandSoft, width: 1,
      dashType: dash ? "dash" : "solid",
      beginArrowType: "none", endArrowType: "triangle",
    },
    flipH: x2 < x1, flipV: y2 < y1,
  });
}

// ---------------------------------------------------------------------------
// Archetypes

/** Cover: deep teal, the title large, everything else quiet. */
function drawCover(slide, s) {
  slide.addShape("rect", { x: 0, y: 0, w: W, h: H, fill: { color: theme.cover } });
  slide.addShape("rect", { x: 0, y: 0, w: 2.4, h: 0.1, fill: { color: theme.accent } });

  slide.addText("PLAYBACK", {
    x: L.m, y: 2.16, w: 8, h: 0.3,
    fontFace: font.mono, fontSize: 11, color: theme.coverSoft, charSpacing: 2.4,
  });
  slide.addText(s.title, {
    x: L.m, y: 2.62, w: 10.6, h: 1.3,
    fontFace: font.display, fontSize: 46, bold: true, color: theme.coverInk, valign: "top",
  });
  slide.addShape("rect", { x: L.m, y: 4.06, w: 2.2, h: 0.045, fill: { color: theme.accent } });
  slide.addText(s.idea, {
    x: L.m, y: 4.36, w: 9.6, h: 0.6,
    fontFace: font.display, fontSize: 19, italic: true, color: theme.coverSoft, valign: "top",
  });
  if (s.visualNote) {
    slide.addText(s.visualNote, {
      x: L.m, y: 6.5, w: 10, h: 0.3,
      fontFace: font.body, fontSize: 11.5, color: theme.coverSoft,
    });
  }
}

/** Section divider: the same teal as the cover, so the deck has a rhythm. */
function drawDivider(slide, part, n) {
  slide.addShape("rect", { x: 0, y: 0, w: W, h: H, fill: { color: theme.cover } });
  slide.addShape("rect", { x: 0, y: 0, w: 1.7, h: 0.085, fill: { color: theme.accent } });
  slide.addText(String(n).padStart(2, "0"), {
    x: L.m, y: 2.64, w: 2, h: 1.0,
    fontFace: font.display, fontSize: 40, bold: true, color: theme.coverSoft,
  });
  slide.addShape("rect", { x: L.m, y: 3.62, w: 1.5, h: 0.04, fill: { color: theme.accent } });
  slide.addText(part, {
    x: L.m, y: 3.86, w: 10.6, h: 0.9,
    fontFace: font.display, fontSize: 34, bold: true, color: theme.coverInk, valign: "top",
  });
}

/** Metrics: one hero figure, then a row of supporting tiles. */
function drawMetrics(slide, s) {
  const top = L.contentY + addVisualNote(slide, s);

  const [heroValue, heroNote] = s.hero.split("|").map((p) => p.trim());
  const heroH = 1.42;
  panel(slide, { x: L.m, y: top, w: L.w, h: heroH, fill: theme.band, line: null });
  slide.addShape("rect", { x: L.m, y: top, w: 0.07, h: heroH, fill: { color: theme.bandEdge } });
  slide.addText(heroValue, {
    x: L.m + 0.46, y: top + 0.18, w: 4.0, h: 1.06,
    fontFace: font.display, fontSize: 44, bold: true, color: theme.bandInk, valign: "middle",
  });
  slide.addText(heroNote, {
    x: L.m + 4.3, y: top + 0.18, w: L.w - 4.8, h: 1.06,
    fontFace: font.display, fontSize: 16, italic: true, color: theme.bandSoft, valign: "middle",
  });

  const tiles = s.stats.map((row) => row.split("|").map((p) => p.trim()));
  const gap = 0.18;
  const tw = (L.w - gap * (tiles.length - 1)) / tiles.length;
  const ty = top + heroH + 0.3;
  const th = L.contentY + L.contentH - ty - 0.06;

  tiles.forEach(([value, label, note], i) => {
    const x = L.m + i * (tw + gap);
    panel(slide, { x, y: ty, w: tw, h: th, fill: theme.surface });
    const rule = labs ? labs[i % labs.length].bright : theme.brandSoft;
    slide.addShape("rect", { x, y: ty, w: tw, h: 0.045, fill: { color: rule } });
    slide.addText(value, {
      x: x + 0.2, y: ty + 0.26, w: tw - 0.4, h: 0.72,
      fontFace: font.display, fontSize: 30, bold: true, color: theme.figure, valign: "middle",
    });
    slide.addText(label, {
      x: x + 0.2, y: ty + 0.98, w: tw - 0.4, h: 0.3,
      fontFace: font.body, fontSize: 12.5, bold: true, color: theme.ink,
    });
    slide.addText(note, {
      x: x + 0.2, y: ty + 1.3, w: tw - 0.4, h: 0.8,
      fontFace: font.body, fontSize: 10.5, color: theme.muted, valign: "top",
    });
  });
}

/** Statement: one line, large, with the supporting points quiet beneath it. */
function drawStatement(slide, s) {
  const top = L.contentY + addVisualNote(slide, s);
  panel(slide, { x: L.m, y: top, w: L.w, h: 2.0, fill: theme.panel, line: null });
  slide.addShape("rect", { x: L.m, y: top, w: 0.07, h: 2.0, fill: { color: theme.accent } });
  slide.addText(s.points[0] || s.idea, {
    x: L.m + 0.5, y: top + 0.2, w: L.w - 1.0, h: 1.6,
    fontFace: font.display, fontSize: 24, color: theme.ink, valign: "middle",
  });
  const rest = s.points.slice(1);
  if (!rest.length) return;
  const y = top + 2.3;
  const rowH = Math.min(0.5, (L.contentY + L.contentH - y) / rest.length);
  rest.forEach((point, i) => {
    slide.addText(point, {
      x: L.m + 0.5, y: y + i * rowH, w: L.w - 1.0, h: rowH,
      fontFace: font.body, fontSize: 13, color: theme.muted, valign: "middle",
    });
  });
}

/** Bullets: the workhorse. Full width, one point per row, hairline between rows. */
function drawBullets(slide, s) {
  let top = L.contentY + addVisualNote(slide, s);
  top += addCallout(slide, s, top);
  const rows = s.points.length || 1;
  const avail = L.contentY + L.contentH - top;
  const h = Math.min(0.92, avail / rows);
  const used = h * rows;
  const y0 = top + Math.max(0, (avail - used) / 2);

  s.points.forEach((point, i) => {
    const y = y0 + i * h;
    if (i > 0) {
      slide.addShape("rect", { x: L.m, y, w: L.w, h: 0.008, fill: { color: theme.line } });
    }
    slide.addShape("rect", {
      x: L.m + 0.04, y: y + h / 2 - 0.075, w: 0.12, h: 0.15,
      fill: { color: i % 2 === 0 ? theme.brandSoft : theme.brandMid },
    });
    slide.addText(point, {
      x: L.m + 0.46, y, w: L.w - 0.6, h,
      fontFace: font.body, fontSize: 14.5, color: theme.ink, valign: "middle",
    });
  });
}

/** Split: two labelled columns, for a holds-against-open comparison. */
function drawSplit(slide, s) {
  const top = L.contentY + addVisualNote(slide, s);
  const gap = 0.42;
  const cw = (L.w - gap) / 2;
  const h = L.contentY + L.contentH - top;

  const columns = [
    { label: s.leftLabel || "Holds", items: s.left, accent: theme.good, x: L.m },
    { label: s.rightLabel || "Open", items: s.right, accent: theme.warn, x: L.m + cw + gap },
  ];

  for (const col of columns) {
    panel(slide, { x: col.x, y: top, w: cw, h, fill: theme.surface });
    slide.addShape("rect", { x: col.x, y: top, w: cw, h: 0.5, fill: { color: theme.panel } });
    slide.addShape("rect", { x: col.x, y: top, w: 0.07, h: 0.5, fill: { color: col.accent } });
    slide.addText(col.label.toUpperCase(), {
      x: col.x + 0.28, y: top, w: cw - 0.5, h: 0.5,
      fontFace: font.mono, fontSize: 11, bold: true, color: theme.ink, charSpacing: 1.4, valign: "middle",
    });

    const listTop = top + 0.5;
    const rowH = Math.min(0.82, (h - 0.5 - 0.12) / Math.max(col.items.length, 1));
    col.items.forEach((item, i) => {
      const y = listTop + 0.06 + i * rowH;
      slide.addShape("rect", {
        x: col.x + 0.3, y: y + rowH / 2 - 0.05, w: 0.1, h: 0.1,
        fill: { color: col.accent },
      });
      slide.addText(item, {
        x: col.x + 0.56, y, w: cw - 0.86, h: rowH,
        fontFace: font.body, fontSize: 12.5, color: theme.ink, valign: "middle",
      });
    });
  }
}

/** Close: the decision in a band of its own, then the ordered next steps. */
function drawClose(slide, s) {
  const top = L.contentY + addVisualNote(slide, s);
  const decH = 1.36;
  panel(slide, { x: L.m, y: top, w: L.w, h: decH, fill: theme.band, line: null });
  slide.addShape("rect", { x: L.m, y: top, w: 0.07, h: decH, fill: { color: theme.bandEdge } });
  slide.addText("THE DECISION", {
    x: L.m + 0.46, y: top + 0.16, w: 5, h: 0.26,
    fontFace: font.mono, fontSize: 10, color: theme.bandSoft, charSpacing: 1.8,
  });
  slide.addText(s.decision, {
    x: L.m + 0.46, y: top + 0.46, w: L.w - 0.96, h: 0.78,
    fontFace: font.display, fontSize: 17, color: theme.bandInk, valign: "top",
  });

  const y0 = top + decH + 0.3;
  const rows = s.points.length || 1;
  const rowH = (L.contentY + L.contentH - y0) / rows;
  s.points.forEach((point, i) => {
    const y = y0 + i * rowH;
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: L.m + 0.04, y, w: 0.5, h: rowH,
      fontFace: font.mono, fontSize: 11, color: theme.emphasis, valign: "middle",
    });
    slide.addText(point, {
      x: L.m + 0.62, y, w: L.w - 0.7, h: rowH,
      fontFace: font.body, fontSize: 13.5, color: theme.ink, valign: "middle",
    });
  });
}

// ---------------------------------------------------------------------------
// Diagrams, laid out for the wide content area rather than a tall side panel.

/**
 * Diagram A: the roles, grouped by the model each one runs on.
 * The roster and the tiers are the runbook's own table, not a sketch: four roles on the cheapest
 * model, building and reviewing on the middle one, escalating to the top only where the table says.
 */
function drawDiagramA(slide, s) {
  const top = L.contentY + addVisualNote(slide, s);
  const mid = W / 2;

  box(slide, {
    x: L.m, y: top, w: 3.3, h: 0.5,
    text: "Orchestrator", fill: theme.band, color: theme.bandInk, size: 13.5, bold: true, line: null,
  });
  slide.addText("picks the role and the model from the table, not by feel; edits nothing itself", {
    x: L.m + 3.5, y: top, w: L.w - 3.5, h: 0.5,
    fontFace: font.body, fontSize: 10.5, color: theme.muted, italic: true, valign: "middle",
  });

  const tiers = [
    {
      label: "CHEAPEST MODEL", note: "reports, never judges",
      accent: labs ? labs[0].bright : theme.brandSoft, weight: 4,
      roles: [
        ["scribe", "keeps the written record"],
        ["runner", "runs commands, reports verbatim"],
        ["explore", "finds where something lives"],
        ["test", "runs the suite, returns failures"],
      ],
    },
    {
      label: "THE DEFAULT", note: "builds and reviews",
      accent: labs ? labs[1].bright : theme.brandMid, weight: 2,
      roles: [
        ["worker", "one screen, or one concern"],
        ["reviewer", "reads against the brief"],
      ],
    },
    {
      label: "ESCALATED", note: "only where the table says",
      accent: theme.accent, weight: 2,
      roles: [
        ["worker", "typed Power Fx, the C# tools"],
        ["reviewer", "write paths, security, a retry"],
      ],
    },
  ];

  // Size the groups from the largest tier so a name and its note can never collide, whatever the
  // runbook's table grows to.
  const headerH = 0.62;
  const rowUnit = 0.44;
  const maxRoles = Math.max(...tiers.map((t) => t.roles.length));
  const gy = top + 0.62;
  const gh = headerH + maxRoles * rowUnit + 0.12;
  const gap = 0.3;
  const totalWeight = tiers.reduce((sum, t) => sum + t.weight, 0);
  const unit = (L.w - gap * (tiers.length - 1)) / totalWeight;

  let x = L.m;
  for (const tier of tiers) {
    const gw = unit * tier.weight;
    panel(slide, { x, y: gy, w: gw, h: gh, fill: theme.surface });
    slide.addShape("rect", { x, y: gy, w: gw, h: 0.045, fill: { color: tier.accent } });
    slide.addText(tier.label, {
      x: x + 0.2, y: gy + 0.14, w: gw - 0.4, h: 0.24,
      fontFace: font.mono, fontSize: 9, color: tier.accent, charSpacing: 1.2,
    });
    slide.addText(tier.note, {
      x: x + 0.2, y: gy + 0.36, w: gw - 0.4, h: 0.22,
      fontFace: font.body, fontSize: 9.5, color: theme.muted, italic: true,
    });

    const rowTop = gy + headerH;
    tier.roles.forEach(([name, note], i) => {
      const ry = rowTop + i * rowUnit;
      slide.addShape("rect", {
        x: x + 0.2, y: ry + 0.07, w: 0.07, h: 0.16,
        fill: { color: tier.accent },
      });
      slide.addText(name, {
        x: x + 0.36, y: ry, w: gw - 0.54, h: 0.23,
        fontFace: font.body, fontSize: 11.5, bold: true, color: theme.ink, valign: "middle",
      });
      slide.addText(note, {
        x: x + 0.36, y: ry + 0.22, w: gw - 0.54, h: 0.2,
        fontFace: font.body, fontSize: 9.5, color: theme.muted, valign: "middle",
      });
    });

    x += gw + gap;
  }

  const lastY = gy + gh + 0.26;
  box(slide, {
    x: mid - 2.1, y: lastY, w: 4.2, h: 0.48,
    text: "Studio: the last word", fill: theme.brandMid, color: theme.bandInk, size: 12.5, bold: true, line: null,
  });
}

/** Diagram B: the seven steps of a unit, with the 21 preflight checks grouped under the gate. */
function drawDiagramB(slide, s) {
  const top = L.contentY + addVisualNote(slide, s);
  const steps = ["Brief", "Scope guard", "Build", "Gates: 21 checks", "Review", "Import", "Log"];
  const gap = 0.16;
  const sw = (L.w - gap * (steps.length - 1)) / steps.length;
  const sh = 0.62;

  let gateX = L.m;
  steps.forEach((step, i) => {
    const x = L.m + i * (sw + gap);
    const isGate = step.startsWith("Gates");
    if (isGate) gateX = x + sw / 2;
    box(slide, {
      x, y: top, w: sw, h: sh,
      text: step,
      fill: isGate ? theme.band : theme.panelAlt,
      color: isGate ? theme.bandInk : theme.ink,
      size: 11, bold: isGate,
      line: isGate ? null : theme.line,
    });
    if (i < steps.length - 1) {
      connector(slide, x + sw + 0.015, top + sh / 2, x + sw + gap - 0.015, top + sh / 2);
    }
  });

  const groups = [
    ["Structure", "YAML, names, screens, components"],
    ["Formulas", "fxcheck at zero, the named-formula count"],
    ["Package", "data sources, display flags, code components"],
    ["Numbers", "parity against the workbook fixture"],
  ];
  const gy = top + sh + 0.74;
  const ggap = 0.22;
  const gw = (L.w - ggap * (groups.length - 1)) / groups.length;
  const gh = 1.06;

  slide.addShape("line", {
    x: gateX, y: top + sh, w: 0.001, h: 0.46,
    line: { color: theme.brandSoft, width: 1, dashType: "dash", endArrowType: "none" },
  });
  slide.addShape("line", {
    x: L.m + gw / 2, y: top + sh + 0.46, w: L.w - gw, h: 0.001,
    line: { color: theme.brandSoft, width: 1, dashType: "dash", endArrowType: "none" },
  });

  groups.forEach(([name, note], i) => {
    const x = L.m + i * (gw + ggap);
    slide.addShape("line", {
      x: x + gw / 2, y: top + sh + 0.46, w: 0.001, h: 0.28,
      line: { color: theme.brandSoft, width: 1, dashType: "dash", endArrowType: "triangle" },
    });
    panel(slide, { x, y: gy, w: gw, h: gh, fill: theme.panel });
    slide.addText(name, {
      x: x + 0.2, y: gy + 0.14, w: gw - 0.4, h: 0.3,
      fontFace: font.body, fontSize: 12.5, bold: true, color: theme.brandMid,
    });
    slide.addText(note, {
      x: x + 0.2, y: gy + 0.46, w: gw - 0.4, h: 0.52,
      fontFace: font.body, fontSize: 10.5, color: theme.muted, valign: "top",
    });
  });

  slide.addText("A failed check stops the import. A new class of defect becomes a new check the same day.", {
    x: L.m, y: gy + gh + 0.16, w: L.w, h: 0.3,
    fontFace: font.body, fontSize: 11, color: theme.muted, italic: true,
  });
}

/** Diagram C: the hierarchy on the left, today's broken thread on the right, the journey beneath. */
function drawDiagramC(slide, s) {
  const top = L.contentY + addVisualNote(slide, s);
  const colW = 5.4;

  slide.addText("HIERARCHY", {
    x: L.m, y: top, w: colW, h: 0.24,
    fontFace: font.mono, fontSize: 9, color: theme.muted, charSpacing: 1.4,
  });
  const levels = [
    ["Platform", theme.band, theme.bandInk],
    ["Lab", theme.brandMid, theme.bandInk],
    ["Team: the unit the planner plans", theme.info, theme.bandInk],
    ["Squad (optional)", theme.panelAlt, theme.ink],
  ];
  levels.forEach(([name, fill, color], i) => {
    const inset = i * 0.3;
    box(slide, {
      x: L.m + inset, y: top + 0.32 + i * 0.5, w: colW - inset * 2, h: 0.42,
      text: name, fill, color, size: 11.5, bold: i < 3, line: null,
    });
  });

  const rx = L.m + colW + 0.6;
  const rw = L.w - colW - 0.6;
  panel(slide, { x: rx, y: top + 0.22, w: rw, h: 1.86, fill: theme.panel, line: null });
  slide.addShape("rect", { x: rx, y: top + 0.22, w: 0.06, h: 1.86, fill: { color: theme.accent } });
  slide.addText("TODAY", {
    x: rx + 0.34, y: top + 0.38, w: rw - 0.6, h: 0.24,
    fontFace: font.mono, fontSize: 9, color: theme.muted, charSpacing: 1.4,
  });
  slide.addText("A request arrives on a form, somebody decides, and the thread ends in a mailbox. The planner never sees the request that became the work.", {
    x: rx + 0.34, y: top + 0.68, w: rw - 0.68, h: 1.3,
    fontFace: font.body, fontSize: 12.5, color: theme.ink, valign: "top",
  });

  const jy = top + 2.5;
  slide.addText("FRONT DOOR TO BENEFIT", {
    x: L.m, y: jy, w: L.w, h: 0.24,
    fontFace: font.mono, fontSize: 9, color: theme.muted, charSpacing: 1.4,
  });
  const journey = ["Request", "Sniff test", "Promote", "Assess", "Commit", "Deliver", "Benefit"];
  const jgap = 0.07;
  const jw = (L.w - jgap * (journey.length - 1)) / journey.length;
  journey.forEach((step, i) => {
    const built = i >= 2;
    const x = L.m + i * (jw + jgap);
    slide.addShape("chevron", {
      x, y: jy + 0.32, w: jw, h: 0.64,
      fill: { color: built ? theme.info : theme.panelAlt },
      line: { color: built ? theme.info : theme.line, width: 0.75 },
    });
    slide.addText(step, {
      x, y: jy + 0.32, w: jw, h: 0.64, align: "center", valign: "middle",
      fontFace: font.body, fontSize: 10.5, bold: true, color: built ? theme.bandInk : theme.ink, margin: 1,
    });
  });
  slide.addText("Shaded: already built. The first two steps are the front door, designed and parked behind a flag. A promoted request keeps its link to the work item, so the register answers where the work came from.", {
    x: L.m, y: jy + 1.06, w: L.w, h: 0.5,
    fontFace: font.body, fontSize: 10.5, color: theme.muted, italic: true, valign: "top",
  });
}

/**
 * Build strip: one tile per import, grouped by day, coloured by what Studio reported.
 * Every row in the log appears, including the ones nobody counted and the ones nobody checked,
 * because a chart that drops those is the thing the log exists to prevent.
 */
function drawBuildStrip(slide, s) {
  let top = L.contentY + addVisualNote(slide, s);
  top += addCallout(slide, s, top);

  const rows = readBuildHistory();
  const days = [];
  for (const row of rows) {
    const day = days.find((d) => d.day === row.day);
    if (day) day.items.push(row);
    else days.push({ day: row.day, items: [row] });
  }

  // Countable against uncountable is the whole point, so the size of a count is deliberately not
  // encoded: a build reporting 27 of one class is in better shape than one reporting errors nobody
  // could count. Shading the larger counts would say the opposite of what the slide says.
  const style = {
    many: { fill: theme.accent, color: theme.white },
    counted: { fill: theme.info, color: theme.white },
    clean: { fill: theme.good, color: theme.white },
    unchecked: { fill: theme.panelAlt, color: theme.muted },
  };
  const styleFor = (state) => style[state.kind] || style.unchecked;

  const labelW = 1.05;
  const gap = 0.08;
  const widest = Math.max(...days.map((d) => d.items.length));
  const tw = (L.w - labelW - gap * (widest - 1)) / widest;

  // Fit the rows to the space that is left once the legend and the source line are reserved, so
  // the strip still lays out correctly as the log grows another day.
  const bottom = L.contentY + L.contentH;
  const reserved = 0.3 + 0.3; // legend, then source
  const rowH = Math.min(0.86, (bottom - top - reserved) / days.length);
  const th = Math.max(0.34, rowH - 0.26);

  days.forEach((day, r) => {
    const y = top + r * rowH;
    slide.addText(day.day, {
      x: L.m, y, w: labelW - 0.16, h: th, align: "right", valign: "middle",
      fontFace: font.mono, fontSize: 10, color: theme.muted,
    });
    day.items.forEach((row, i) => {
      const x = L.m + labelW + i * (tw + gap);
      const look = styleFor(row.studio);
      slide.addShape("roundRect", {
        x, y, w: tw, h: th, rectRadius: 0.05,
        fill: { color: look.fill },
        line: row.studio.kind === "unchecked"
          ? { color: theme.line, width: 0.75, dashType: "dash" }
          : { type: "none" },
      });
      slide.addText(row.studio.label, {
        x, y, w: tw, h: th, align: "center", valign: "middle",
        fontFace: font.body, fontSize: row.studio.kind === "many" ? 9.5 : 12.5,
        bold: row.studio.kind !== "unchecked", color: look.color, margin: 1,
      });
      slide.addText(row.time, {
        x: x - 0.08, y: y + th + 0.03, w: tw + 0.16, h: 0.22, align: "center",
        fontFace: font.mono, fontSize: 7.5, color: theme.muted,
      });
    });
  });

  const legendY = bottom - 0.58;
  const legend = [
    ["clean", "opened clean"],
    ["counted", "counted: one known class"],
    ["many", "too many to count"],
    ["unchecked", "not checked"],
  ];
  const legendW = (L.w - labelW) / legend.length;
  legend.forEach(([key, label], i) => {
    const look = style[key];
    const lx = L.m + labelW + i * legendW;
    slide.addShape("roundRect", {
      x: lx, y: legendY + 0.04, w: 0.2, h: 0.2, rectRadius: 0.03,
      fill: { color: look.fill },
      line: key === "unchecked" ? { color: theme.line, width: 0.75, dashType: "dash" } : { type: "none" },
    });
    slide.addText(label, {
      x: lx + 0.28, y: legendY, w: legendW - 0.34, h: 0.28,
      fontFace: font.body, fontSize: 10, color: theme.muted, valign: "middle",
    });
  });

  slide.addText(`Source: power/tests/evaluation-log.md, read at build time. ${rows.length} imports. Nobody looking is recorded as not checked, never as clean.`, {
    x: L.m, y: bottom - 0.26, w: L.w, h: 0.28,
    fontFace: font.body, fontSize: 10, color: theme.muted, italic: true,
  });
}

function drawScreenshots(slide, s) {
  let top = L.contentY + addVisualNote(slide, s);
  top += addCallout(slide, s, top);

  const pairs = readShots(s);
  const pair = pairs[0];
  if (!pair) return;

  const gap = 0.5;
  const capH = 0.44;
  const labelH = 0.3;
  const imgTop = top + labelH;
  const maxH = L.contentY + L.contentH - imgTop - capH - 0.12;
  const ih = Math.min(maxH, ((L.w - gap) / 2) / 1.475);
  const iw = ih * 1.475;
  const x0 = (W - (iw * 2 + gap)) / 2;

  const columns = [
    { x: x0, label: "BEFORE", file: pair.before, tone: theme.accent },
    { x: x0 + iw + gap, label: "AFTER", file: pair.after, tone: theme.good },
  ];

  for (const col of columns) {
    slide.addText(col.label, {
      x: col.x, y: top, w: iw, h: labelH,
      fontFace: font.mono, fontSize: 10, color: col.tone, charSpacing: 1.6,
    });
    if (col.file && existsSync(col.file)) {
      slide.addImage({ path: col.file, x: col.x, y: imgTop, w: iw, h: ih });
      slide.addShape("rect", {
        x: col.x, y: imgTop, w: iw, h: ih,
        fill: { type: "none" }, line: { color: theme.line, width: 1 },
      });
    } else {
      slide.addShape("roundRect", {
        x: col.x, y: imgTop, w: iw, h: ih, rectRadius: 0.05,
        fill: { color: theme.surface },
        line: { color: theme.line, width: 1, dashType: "dash" },
      });
      slide.addText("Same screen, from the current build: to add", {
        x: col.x, y: imgTop, w: iw, h: ih, align: "center", valign: "middle",
        fontFace: font.body, fontSize: 11, color: theme.muted, italic: true,
      });
    }
  }

  slide.addText(pair.caption, {
    x: x0, y: imgTop + ih + 0.1, w: iw * 2 + gap, h: capH,
    fontFace: font.body, fontSize: 10.5, color: theme.muted, valign: "top",
  });
}

const visuals = {
  cover: drawCover,
  metrics: drawMetrics,
  statement: drawStatement,
  bullets: drawBullets,
  split: drawSplit,
  close: drawClose,
  "diagram-a": drawDiagramA,
  "diagram-b": drawDiagramB,
  "diagram-c": drawDiagramC,
  "build-strip": drawBuildStrip,
  screenshots: drawScreenshots,
};

// ---------------------------------------------------------------------------
// Build

function build() {
  const Pptxgen = loadPptxgen();
  const slides = readOutline();

  // Carry each **Part** forward, so every slide knows the section it belongs to.
  let section = "";
  for (const s of slides) {
    if (s.part) section = s.part;
    s.section = section;
  }

  const pptx = new Pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.333 x 7.5, which is what every coordinate above assumes
  pptx.title = "Waypoint on Power Platform: playback";
  pptx.author = "Waypoint";
  pptx.defineSlideMaster({ title: "WAYPOINT", background: { color: theme.bg } });

  // Number the slides the audience sees: the cover and the dividers are not counted.
  const counted = slides.filter((s) => s.visualKey !== "cover").length
    + slides.filter((s) => s.part).length;
  let index = 0;
  let partNo = 0;
  let written = 0;

  for (const s of slides) {
    if (s.part) {
      partNo += 1;
      const divider = pptx.addSlide({ masterName: "WAYPOINT" });
      drawDivider(divider, s.part, partNo);
      index += 1;
      written += 1;
    }

    const slide = pptx.addSlide({ masterName: "WAYPOINT" });
    if (s.visualKey === "cover") {
      drawCover(slide, s);
    } else {
      index += 1;
      addChrome(slide, s, index, counted);
      (visuals[s.visualKey] || drawBullets)(slide, s, pptx);
    }
    if (s.body) slide.addNotes(s.body);
    written += 1;
  }

  mkdirSync(dirname(outFile), { recursive: true });
  return pptx.writeFile({ fileName: outFile }).then(() => {
    const size = statSync(outFile).size;
    console.log(`build-deck: ${written} slides (${slides.length} from the outline, ${partNo} dividers), ${(size / 1024).toFixed(0)} KB`);
    console.log(`build-deck: fonts ${font.display} / ${font.body} / ${font.mono}`);
    console.log(`build-deck: ${outFile}`);
  });
}

build().catch((error) => {
  console.error(`build-deck: ${error.message}`);
  process.exit(1);
});
