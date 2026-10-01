// The colours a chart builder draws with. An SVG in a data URI is its own document: it cannot read
// the page's CSS variables, so the palette is resolved once here and handed to the builder as plain
// values. In Power Apps the same builders take a palette literal from a named formula.
import type { ThemeName } from "../theme";

export interface Palette {
  ink: string;
  muted: string;
  line: string;
  gridline: string;
  surface: string;
  panel: string;
  brand: string;
  brandMid: string;
  brandSoft: string;
  accent: string;
  good: string;
  bad: string;
}

/** The tokens each palette name maps onto, in the order the fallback table lists them. */
const TOKENS: Record<keyof Palette, string> = {
  ink: "--c-ink",
  muted: "--c-muted",
  line: "--c-line",
  gridline: "--c-gridline",
  surface: "--c-surface",
  panel: "--c-panel",
  brand: "--c-brand",
  brandMid: "--c-brand-mid",
  brandSoft: "--c-brand-soft",
  accent: "--c-accent",
  good: "--c-good",
  bad: "--c-bad",
};

/** The default theme's values, for tests, for a document that has not styled yet, and for Power. */
const FALLBACK: Record<ThemeName, Palette> = {
  light: {
    ink: "#0B3239",
    muted: "#5B6B6E",
    line: "#D9D4CC",
    gridline: "#E4DFD6",
    surface: "#FFFFFF",
    panel: "#EFECE5",
    brand: "#0B3239",
    brandMid: "#1C4A52",
    brandSoft: "#3E6B72",
    accent: "#E0432E",
    good: "#2E7D5B",
    bad: "#E0432E",
  },
  dark: {
    ink: "#EAF1EE",
    muted: "#A2B4B0",
    line: "#2C3835",
    gridline: "#283431",
    surface: "#17201F",
    panel: "#1F2A27",
    brand: "#1E5F6B",
    brandMid: "#2A6E7A",
    brandSoft: "#357E8A",
    accent: "#FF6052",
    good: "#5FBE89",
    bad: "#FF6052",
  },
};

const cache = new Map<string, Palette>();

/**
 * The palette for a theme: the computed token values when the document is showing that theme, the
 * fallback table otherwise. Read once per theme and mode, since the tokens only change with them.
 */
export function paletteFor(theme: ThemeName): Palette {
  const fallback = FALLBACK[theme];
  if (typeof document === "undefined") return fallback;
  const root = document.documentElement;
  if (root.getAttribute("data-theme") !== theme) return fallback;
  const key = theme + "/" + (root.getAttribute("data-mode") ?? "");
  const held = cache.get(key);
  if (held) return held;
  const style = getComputedStyle(root);
  const entries = Object.entries(TOKENS).map(([name, token]) => {
    const value = style.getPropertyValue(token).trim();
    return [name, value || fallback[name as keyof Palette]];
  });
  const palette = Object.fromEntries(entries) as Palette;
  cache.set(key, palette);
  return palette;
}

/** Forgets the read values, so the next read picks the document's up again. */
export function resetPalettes(): void {
  cache.clear();
}

/* ---- the few pieces every builder shares ---- */

/** The box a chart is drawn into, in viewBox units. */
export interface Size {
  width: number;
  height: number;
}

/** The canvas font, named the way Power Apps names it. */
export const FONT = "'Segoe UI', sans-serif";

/** A coordinate, short enough to keep the string small. */
export const num = (n: number): string => String(Math.round(n * 100) / 100);

/** Text is data, so it is escaped before it goes into the markup. */
export const esc = (text: string): string => text
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

/** The opening tag, with the viewBox every builder is read through. */
export const svgOpen = (w: number, h: number, fit: string): string =>
  "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 " + num(w) + " " + num(h)
  + "\" preserveAspectRatio=\"" + fit + "\" role=\"presentation\">";
