// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import Team from "../Team";
import { useDataset } from "../../store/useDataset";
import { buildContext } from "../../engine/context";
import { reservationRows } from "../../engine/reservations";

describe("Team", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  it("says why a person who is assigned to work cannot be removed", () => {
    render(<Team />);
    const assigned = useDataset.getState().data.work.find((w) => w.assignees.length > 0);
    const name = assigned?.assignees[0] as string;
    fireEvent.click(screen.getAllByRole("button", { name })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes, remove" }));
    expect(screen.getAllByRole("alert")[0].textContent).toContain(name);
    expect(useDataset.getState().data.people.some((p) => p.name === name)).toBe(true);
  });

  it("lists the reservations with the MW the engine says they have drawn down", () => {
    const { data } = useDataset.getState();
    const rows = reservationRows(buildContext(data));

    render(<Team />);
    fireEvent.click(screen.getByRole("button", { name: "Reservations" }));
    const table = screen.getByRole("table", { name: /^Reservations:/ });
    const body = within(table).getAllByRole("row").slice(1);
    expect(body).toHaveLength(rows.length);

    for (const row of rows) {
      const line = body.find((r) => {
        const cells = within(r).getAllByRole("cell");
        return cells[0].textContent === row.squad && cells[1].textContent === row.category;
      });
      const cells = within(line as HTMLElement).getAllByRole("cell");
      expect(cells[4].textContent).toBe(row.drawn.toFixed(2));
      expect(cells[5].textContent).toBe(row.remaining.toFixed(2));
    }
  });
});
