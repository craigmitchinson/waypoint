// Names onto tokens. Every colour in the app comes from @ccs/ui; nothing is a literal here.
export const T = {
  brand: "var(--c-brand)",
  brandMid: "var(--c-brand-mid)",
  brandSoft: "var(--c-brand-soft)",
  accent: "var(--c-accent)",
  bg: "var(--c-bg)",
  surface: "var(--c-surface)",
  cream: "var(--c-cream)",
  panel: "var(--c-panel)",
  panelAlt: "var(--c-panel-alt)",
  grey: "var(--c-grey)",
  line: "var(--c-line)",
  gridline: "var(--c-gridline)",
  ink: "var(--c-ink)",
  muted: "var(--c-muted)",
  good: "var(--c-good)",
  warn: "var(--c-warn)",
  bad: "var(--c-bad)",
  focus: "var(--c-focus)",
} as const;

export type ThemeName = "light" | "dark";

/** Where the chosen theme is remembered between visits. */
export const THEME_KEY = "waypoint-theme";

/** Puts the theme on <html data-theme> and remembers it. */
export function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // A blocked localStorage only costs us the memory, not the theme.
  }
}

/** The remembered theme, light unless dark was chosen last time. */
export function storedTheme(): ThemeName {
  try {
    return window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

/** Studio is the app's own look; power dresses it as a Power Apps canvas app. */
export type ModeName = "studio" | "power";

/** Where the chosen mode is remembered between visits. */
export const MODE_KEY = "waypoint-mode";

/** Puts the mode on <html data-mode> and remembers it. */
export function applyMode(mode: ModeName): void {
  document.documentElement.setAttribute("data-mode", mode);
  try {
    window.localStorage.setItem(MODE_KEY, mode);
  } catch {
    // A blocked localStorage only costs us the memory, not the mode.
  }
}

/** The remembered mode, the Power Apps preview unless Studio was chosen last time. */
export function storedMode(): ModeName {
  try {
    return window.localStorage.getItem(MODE_KEY) === "studio" ? "studio" : "power";
  } catch {
    return "power";
  }
}
