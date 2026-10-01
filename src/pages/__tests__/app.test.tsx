// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import { useDataset } from "../../store/useDataset";

const ROUTES: [string, string][] = [
  ["/", "Command"],
  ["/work", "Work"],
  ["/timeline", "Timeline"],
  ["/team", "Team"],
  ["/benefits", "Benefits"],
  ["/financials", "Financials"],
  ["/quarter-close", "Quarter close"],
  ["/import", "Import"],
  ["/settings", "Settings"],
];

describe("App routing", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  afterEach(() => {
    window.history.pushState({}, "", "/");
  });

  it.each(ROUTES)("routes %s to the %s view with exactly one h1", (path, title) => {
    window.history.pushState({}, "", path);
    render(<App />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toBe(title);
  });

  it("groups the rail's links under the four group labels", () => {
    render(<App />);
    const rail = screen.getByRole("navigation", { name: "Sections" });
    const labels = Array.from(rail.querySelectorAll(".wp-nav__group-label")).map(
      (node) => node.textContent,
    );
    expect(labels).toEqual(["Overview", "Plan", "People", "Measure"]);
  });

  it.each(ROUTES)("marks the %s link as the current page", (path, label) => {
    window.history.pushState({}, "", path);
    render(<App />);
    const current = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("aria-current") === "page",
    );
    expect(current).toHaveLength(1);
    expect(current[0].textContent).toBe(label);
  });
});

describe("Shell modes", () => {
  beforeEach(() => {
    cleanup();
    window.localStorage.clear();
    useDataset.getState().resetToSeed();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("opens in the Power Apps preview, on its canvas", () => {
    const { container } = render(<App />);
    expect(document.documentElement.getAttribute("data-mode")).toBe("power");
    expect(container.querySelector(".pa-canvas")).not.toBeNull();
  });

  it("toggles the nav collapse button and remembers it", () => {
    render(<App />);
    const collapse = screen.getByRole("button", { name: "Collapse navigation" });
    expect(collapse.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(collapse);
    const expand = screen.getByRole("button", { name: "Expand navigation" });
    expect(expand.getAttribute("aria-expanded")).toBe("false");
    expect(window.localStorage.getItem("waypoint-nav")).toBe("collapsed");
    fireEvent.click(expand);
    expect(window.localStorage.getItem("waypoint-nav")).toBe("expanded");
  });

  it("drops the canvas when Studio is chosen", () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Studio" }));
    expect(document.documentElement.getAttribute("data-mode")).toBe("studio");
    expect(container.querySelector(".pa-canvas")).toBeNull();
    expect(window.localStorage.getItem("waypoint-mode")).toBe("studio");
  });
});
