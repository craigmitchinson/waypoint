// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Command from "../Command";
import { useDataset } from "../../store/useDataset";
import { quarterRange } from "../../engine/dates";
import { buildContext } from "../../engine/context";
import { absenceMW } from "../../engine/capacity";

const show = () => render(<MemoryRouter><Command /></MemoryRouter>);

describe("Command", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("leads with six measures in the capacity band", () => {
    show();
    const { view } = useDataset.getState();
    const net = view.net_total;
    const remaining = net - view.committed_total.value - view.reservations.reserved_total;
    const band = screen.getByText("Capacity this quarter").parentElement as HTMLElement;
    const labels = ["Available", "Committed", "Remaining", "Value in-year", "Value recorded",
      "On time"];
    for (const label of labels) expect(within(band).getByText(label)).toBeTruthy();
    expect(within(band).getByText(net.toFixed(1))).toBeTruthy();
    expect(within(band).getByText(view.committed_total.value.toFixed(1))).toBeTruthy();
    expect(within(band).getByText(remaining.toFixed(1))).toBeTruthy();
    expect(within(band).getAllByText("MW")).toHaveLength(3);
  });

  it("counts the sprint from the start of the quarter, not the epoch", () => {
    const [qstart, qend] = quarterRange(useDataset.getState().data.settings.quarter);
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date((qstart.getTime() + qend.getTime()) / 2));
    show();
    const eyebrow = screen.getByText(/sprint \d+ of \d+/);
    const match = /sprint (\d+) of (\d+)/.exec(eyebrow.textContent ?? "");
    expect(match).toBeTruthy();
    expect(Number(match![2])).toBe(7);
    expect(Number(match![1])).toBeGreaterThanOrEqual(1);
    expect(Number(match![1])).toBeLessThanOrEqual(7);
    expect(eyebrow.textContent).toMatch(/\d+ days left/);
  });

  it("groups the decisions into sections with counts, the first two open", () => {
    const { container } = show();
    const card = container.querySelector(".wp-command-decisions") as HTMLElement;
    expect(within(card).getByRole("heading", { level: 2, name: "Decisions" })).toBeTruthy();
    const heads = within(card).getAllByRole("button");
    expect(heads.length).toBeGreaterThan(1);
    expect(heads[0].getAttribute("aria-expanded")).toBe("true");
    expect(heads[1].getAttribute("aria-expanded")).toBe("true");
    for (const head of heads) {
      const count = head.querySelector(".wp-command-group__count") as HTMLElement;
      expect(Number(count.textContent)).toBeGreaterThan(0);
    }
    const rows = card.querySelectorAll(".wp-command-rows li");
    expect(rows.length).toBeGreaterThan(0);
    expect(within(rows[0] as HTMLElement).getByRole("link", { name: "Open" })).toBeTruthy();
  });

  it("closes a decision section when its heading is pressed", () => {
    const { container } = show();
    const card = container.querySelector(".wp-command-decisions") as HTMLElement;
    const head = within(card).getAllByRole("button")[0];
    fireEvent.click(head);
    expect(head.getAttribute("aria-expanded")).toBe("false");
  });

  it("gives every squad a row with its utilisation, worst first", () => {
    const { container } = show();
    const { view } = useDataset.getState();
    const card = container.querySelector(".wp-command-squads") as HTMLElement;
    const rows = card.querySelectorAll("li");
    expect(rows).toHaveLength(view.squads.rows.length);
    const worst = [...view.squads.rows].sort((a, b) => b.utilisation - a.utilisation)[0];
    expect(within(rows[0] as HTMLElement).getByRole("link", { name: worst.name })).toBeTruthy();
    expect(
      within(rows[0] as HTMLElement).getByText(Math.round(worst.utilisation * 100) + "%"),
    ).toBeTruthy();
    expect(within(card).getAllByRole("table")).toHaveLength(1);
  });

  it("reports this sprint and links to the timeline", () => {
    const { container } = show();
    const card = container.querySelector(".wp-command-sprint") as HTMLElement;
    for (const label of ["Days left", "Open days", "Sick", "Leave"]) {
      expect(within(card).getByText(label)).toBeTruthy();
    }
    expect(within(card).getByRole("link", { name: "Timeline" })).toBeTruthy();
  });

  it("costs the quarter's absence beside the available capacity", () => {
    show();
    const ctx = buildContext(useDataset.getState().data);
    const band = screen.getByText("Capacity this quarter").parentElement as HTMLElement;
    const lost = absenceMW(ctx).mw;
    expect(lost).toBeGreaterThan(0);
    expect(
      within(band).getByText(new RegExp("people · \\d+ squads · " + lost.toFixed(1)
        + " MW lost to absence")),
    ).toBeTruthy();
  });

  it("names the people off sick this sprint and links them to the team", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-11-03T00:00:00Z"));
    const { container } = show();
    const card = container.querySelector(".wp-command-decisions") as HTMLElement;
    const head = within(card).getByRole("button", { name: /Sickness this sprint/ });
    if (head.getAttribute("aria-expanded") === "false") fireEvent.click(head);
    const group = head.closest(".wp-command-group") as HTMLElement;
    const row = within(group).getByText(/Helena Vos is off sick for 2 days this sprint/);
    expect(row).toBeTruthy();
    expect(within(group).getAllByRole("link", { name: "Open" })[0].getAttribute("href"))
      .toBe("/team");
  });

  it("draws the benefit year as twelve bars beside an sr-only table", () => {
    const { container } = show();
    const card = container.querySelector(".wp-command-benefits") as HTMLElement;
    const img = card.querySelector(".wp-monthbars__img") as HTMLImageElement;
    const svg = decodeURIComponent(img.getAttribute("src")?.split(",")[1] ?? "");
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg.split("<rect").length - 1).toBe(12);
    expect(svg.split("<polyline").length - 1).toBe(2);
    expect(img.getAttribute("alt")).toBe("");
    const table = card.querySelector("table.sr-only") as HTMLElement;
    expect(within(table).getAllByRole("row")).toHaveLength(13);
    expect(within(card).getByRole("link", { name: "Benefits calendar" }).getAttribute("href"))
      .toBe("/benefits");
  });

  it("carries the structural classes the single screen is laid out with", () => {
    const { container } = show();
    for (const cls of [".wp-command", ".wp-command-cols", ".wp-command-right",
      ".wp-command-decisions", ".wp-command-squads", ".wp-command-sprint",
      ".wp-command-benefits"]) {
      expect(container.querySelector(cls)).toBeTruthy();
    }
    expect(screen.getByRole("link", { name: "Close the quarter" })).toBeTruthy();
  });
});
