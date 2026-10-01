// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Work from "../Work";
import { useDataset } from "../../store/useDataset";
import { phaseOf } from "../../store/validate";

const show = () => within(render(<MemoryRouter><Work /></MemoryRouter>).container);

describe("Work", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  it("heads the view once and lists the work register", () => {
    const page = show();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Work");
    const rows = within(page.getByRole("table")).getAllByRole("row");
    expect(rows.length).toBe(useDataset.getState().data.work.length + 1);
  });

  it("leads from every title into the item's own page", () => {
    const page = show();
    const title = useDataset.getState().data.work[0].title;
    const link = page.getByRole("link", { name: title });
    expect(link.getAttribute("href")).toBe("/work/" + encodeURIComponent(title));
  });

  it("filters the register from the lifecycle strip", () => {
    const page = show();
    const shaping = page.getByRole("button", { name: /^Shaping/ });
    expect(shaping.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(shaping);
    expect(shaping.getAttribute("aria-pressed")).toBe("true");
    const shaped = useDataset.getState().data.work.filter((w) => phaseOf(w) === "Shaping");
    const rows = within(page.getByRole("table")).getAllByRole("row");
    expect(rows.length).toBe(shaped.length + 1);
  });

  it("filters to one kind from the pivot", () => {
    const page = show();
    fireEvent.click(page.getByRole("button", { name: "Spikes" }));
    const spikes = useDataset.getState().data.work.filter((w) => w.kind === "Spike");
    const rows = within(page.getByRole("table")).getAllByRole("row");
    expect(spikes.length).toBeGreaterThan(0);
    expect(rows.length).toBe(spikes.length + 1);
  });

  it("offers the other kinds behind the New menu", () => {
    const page = show();
    const more = page.getByRole("button", { name: "New work item" });
    expect(more.getAttribute("aria-haspopup")).toBe("menu");
    fireEvent.click(more);
    const menu = page.getByRole("menu", { name: "New work item" });
    expect(within(menu).getAllByRole("menuitem").map((b) => b.textContent))
      .toEqual(["New spike", "New component"]);
    fireEvent.click(within(menu).getByRole("menuitem", { name: "New spike" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { level: 2 }).textContent).toBe("New spike");
    expect(within(dialog).getByRole("textbox", { name: "Question" })).toBeTruthy();
  });

  it("creates a feature from the New button", () => {
    const page = show();
    fireEvent.click(page.getByRole("button", { name: "New feature" }));
    const dialog = screen.getByRole("dialog");
    fireEvent.change(within(dialog).getByRole("textbox", { name: "Title" }), {
      target: { value: "Statement export for auditors" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
    const made = useDataset.getState().data.work
      .find((w) => w.title === "Statement export for auditors");
    expect(made?.kind).toBe("Feature");
  });
});
