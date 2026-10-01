// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import Financials, { gbp, moneyCsv } from "../Financials";
import { useDataset } from "../../store/useDataset";
import { buildContext } from "../../engine/context";
import { squadNetMW } from "../../engine/capacity";

describe("Financials", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  it("heads the view once and totals the cost of capacity this quarter", () => {
    render(<Financials />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Financials");

    const { data } = useDataset.getState();
    const ctx = buildContext(data);
    const cost = (grade: string) => data.settings.financials.teamGradeCosts
      .find((g) => g.grade === grade)?.annualCost ?? 0;
    const quarter = data.squads.reduce((total, squad) => total + data.people
      .filter((p) => p.squad === squad.name && p.employment !== "Open vacancy")
      .reduce((t, p) => t + cost(p.grade), 0) / 4, 0);
    const net = data.squads.reduce((t, s) => t + squadNetMW(ctx, s.name), 0);

    const table = screen.getByRole("table", { name: /Cost of capacity by squad/ });
    const totals = within(table).getByRole("row", { name: /All squads/ });
    expect(within(totals).getByText(gbp(quarter))).toBeTruthy();
    expect(within(totals).getByText(net.toFixed(1))).toBeTruthy();
  });

  it("totals the cost of ownership from the Financials tables on Settings", () => {
    render(<Financials />);
    const { data } = useDataset.getState();
    const people = data.people
      .filter((p) => p.employment !== "Open vacancy")
      .reduce((t, p) => t + (data.settings.financials.teamGradeCosts
        .find((g) => g.grade === p.grade)?.annualCost ?? 0), 0);
    const running = data.settings.financials.costLines.reduce((t, c) => t + c.annual, 0);
    expect(running).toBe(422000);
    const table = screen.getByRole("table", { name: /Cost of ownership by funding line/ });
    const totals = within(table).getByRole("row", { name: /Total cost of ownership per year/ });
    expect(within(totals).getByText(gbp(people + running))).toBeTruthy();
  });

  it("draws a table with rows under every section heading", () => {
    render(<Financials />);
    const names = [
      "Cost of capacity by squad",
      "Cost of capacity by grade",
      "Cost by funding line",
      "Cost per work item",
      "Calibration: estimate accuracy by size",
    ];
    for (const name of names) {
      const block = screen.getByRole("heading", { level: 2, name }).closest("section");
      expect(block).toBeTruthy();
      const table = within(block as HTMLElement).getByRole("table");
      expect(table.querySelectorAll("tbody tr").length).toBeGreaterThan(0);
    }
  });

  it("writes a header line for every block it exports", () => {
    const csv = moneyCsv([{
      name: "Cost of capacity by squad",
      caption: "Cost of capacity by squad.",
      headers: ["Squad", "People", "Annual cost"],
      rows: [["Squad 1", "6", "£360,000"]],
      total: ["All squads", "6", "£360,000"],
    }]);
    const lines = csv.split("\n");
    expect(lines[0]).toBe("Cost of capacity by squad");
    expect(lines[1]).toBe("Squad,People,Annual cost");
    expect(lines[2]).toBe("Squad 1,6,\"£360,000\"");
  });
});
