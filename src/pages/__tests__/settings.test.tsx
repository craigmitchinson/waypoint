// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import Settings from "../Settings";
import { useDataset } from "../../store/useDataset";

describe("Settings", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  it("renders the h1 and the nine planner states", () => {
    render(<Settings />);
    expect(screen.getByRole("heading", { level: 1, name: "Settings" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "States" }));
    const states = useDataset.getState().data.settings.states;
    expect(states).toHaveLength(9);
    for (const s of states) {
      expect(screen.getAllByText(s.name).length).toBeGreaterThan(0);
    }
  });

  it("shows a validation message and disables Save when Red at drops below Amber at", () => {
    render(<Settings />);
    const amber = screen.getByLabelText("Amber at") as HTMLInputElement;
    const red = screen.getByLabelText("Red at") as HTMLInputElement;
    fireEvent.change(red, { target: { value: String(Number(amber.value) - 1) } });
    expect(screen.getAllByText(/Red utilisation must be above amber\./).length).toBeGreaterThan(0);
    expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("shows a newly added skill in the list", () => {
    render(<Settings />);
    fireEvent.click(screen.getByRole("button", { name: "Lists" }));
    fireEvent.change(screen.getByLabelText("New skill"), { target: { value: "Quantum computing" } });
    fireEvent.click(screen.getByRole("button", { name: "Add skill" }));
    expect(screen.getByRole("button", { name: "Quantum computing" })).toBeTruthy();
  });

  it("saves an edited size MW to the store", () => {
    render(<Settings />);
    const sizeName = Object.keys(useDataset.getState().data.settings.sizes)[0];
    const input = screen.getByLabelText(`${sizeName} (member weeks)`) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "9.5" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(useDataset.getState().data.settings.sizes[sizeName]).toBe(9.5);
  });

  it("saves an edited team grade cost from the Money tab", () => {
    render(<Settings />);
    fireEvent.click(screen.getByRole("button", { name: "Money" }));
    fireEvent.change(screen.getByLabelText("C annual cost"), { target: { value: "50000" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    const costs = useDataset.getState().data.settings.financials.teamGradeCosts;
    expect(costs.find((g) => g.grade === "C")?.annualCost).toBe(50000);
  });

  it("assigns an epic to another outcome from the Outcomes tab", () => {
    render(<Settings />);
    fireEvent.click(screen.getByRole("button", { name: "Outcomes" }));
    fireEvent.change(screen.getByLabelText("Epic"), { target: { value: "Reconciliation" } });
    fireEvent.change(screen.getByLabelText("Outcome it serves"), { target: { value: "Trusted data" } });
    fireEvent.click(screen.getByRole("button", { name: "Assign epic" }));
    const outcomes = useDataset.getState().data.settings.outcomes;
    expect(outcomes.find((o) => o.name === "Trusted data")?.epics).toContain("Reconciliation");
  });

  it("lists the activity newest first and filters it by summary", () => {
    useDataset.getState().addOutcome("Fewer handoffs");
    useDataset.getState().addOutcome("Faster answers");
    render(<Settings />);
    fireEvent.click(screen.getByRole("button", { name: "Activity" }));
    const rows = screen.getAllByRole("row").slice(1);
    expect(within(rows[0]).getByText("Add outcome: Faster answers")).toBeTruthy();
    expect(within(rows[1]).getByText("Add outcome: Fewer handoffs")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "handoffs" } });
    const filtered = screen.getAllByRole("row").slice(1);
    expect(filtered).toHaveLength(1);
    expect(within(filtered[0]).getByText("Add outcome: Fewer handoffs")).toBeTruthy();
  });

  it("shows the refusal text when removing a skill that is still in use", () => {
    render(<Settings />);
    fireEvent.click(screen.getByRole("button", { name: "Lists" }));
    const data = useDataset.getState().data;
    const used = data.settings.skills.find((s) => data.people.some((p) => p.skills.includes(s)));
    expect(used).toBeTruthy();
    const row = screen.getByRole("button", { name: used as string }).closest("tr") as HTMLElement;
    fireEvent.click(within(row).getByRole("button", { name: "Remove" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes, remove" }));
    expect(screen.getByRole("alert").textContent).toContain("still used by");
  });
});
