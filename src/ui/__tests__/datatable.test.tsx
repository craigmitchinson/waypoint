// @vitest-environment jsdom
// Sorting: the header button toggles the order and says so through aria-sort.
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import DataTable from "../DataTable";
import type { Column } from "../DataTable";

interface Row { name: string; mw: number }

const rows: Row[] = [
  { name: "Beta", mw: 3 },
  { name: "Alpha", mw: 1 },
  { name: "Gamma", mw: 2 },
];

const columns: Column<Row>[] = [
  { key: "name", label: "Name", sort: (r) => r.name, cell: (r) => r.name },
  { key: "mw", label: "MW", numeric: true, sort: (r) => r.mw, cell: (r) => r.mw.toFixed(1) },
];

const order = () => within(screen.getByRole("table")).getAllByRole("row")
  .slice(1)
  .map((tr) => (tr as HTMLTableRowElement).cells[0].textContent);

describe("DataTable", () => {
  afterEach(cleanup);

  it("sorts a numeric column both ways and marks the header", () => {
    render(<DataTable caption="Squads" columns={columns} rows={rows} rowKey={(r) => r.name} />);
    const header = screen.getByRole("columnheader", { name: /MW/ });
    expect(header.getAttribute("aria-sort")).toBeNull();

    fireEvent.click(within(header).getByRole("button"));
    expect(header.getAttribute("aria-sort")).toBe("ascending");
    expect(order()).toEqual(["Alpha", "Gamma", "Beta"]);

    fireEvent.click(within(header).getByRole("button"));
    expect(header.getAttribute("aria-sort")).toBe("descending");
    expect(order()).toEqual(["Beta", "Gamma", "Alpha"]);
  });
});
