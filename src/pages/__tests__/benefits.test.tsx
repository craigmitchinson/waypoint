// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Benefits, { gbp } from "../Benefits";
import { useDataset } from "../../store/useDataset";
import { compute } from "../../engine/compute";
import { buildContext } from "../../engine/context";
import { benefitCalendar } from "../../engine/value";
import { inPlan } from "../../engine/work";

const show = () => render(<MemoryRouter><Benefits /></MemoryRouter>);

/** The pounds a cell prints, as a number: "£12,345" reads back as 12345. */
const money = (text: string) => Number(text.replace(/[^0-9.-]/g, ""));

/** The Benefits calendar tab: the month-by-month table, with the seed's calendar beside it. */
const openCalendar = () => {
  show();
  fireEvent.click(screen.getByRole("button", { name: "Benefits calendar" }));
  return {
    table: screen.getByRole("table", { name: /Benefits calendar/ }),
    cal: benefitCalendar(buildContext(useDataset.getState().data)),
  };
};

/** The row one work item reads on, by the link in its first cell. */
const lineFor = (table: HTMLElement, title: string) =>
  within(table).getByRole("link", { name: title }).closest("tr") as HTMLElement;

describe("Benefits", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  it("heads the view once and shows the quarter's in-year value", () => {
    show();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Benefits");
    const expected = gbp(compute(useDataset.getState().data).compare.rows.gbp_in_year.b);
    const stat = screen.getAllByText("Value in-year")
      .map((node) => node.closest(".wp-stat"))
      .find(Boolean) as HTMLElement;
    expect(within(stat).getByText(expected)).toBeTruthy();
  });

  it("opens an outcome to show the epics under it", () => {
    show();
    const outcome = screen.getByRole("button", { name: "Cut cost to serve" });
    expect(outcome.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("button", { name: "Finance ops automation" })).toBeNull();
    fireEvent.click(outcome);
    expect(outcome.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("button", { name: "Finance ops automation" })).toBeTruthy();
  });

  it("records an actual from the drawer and says why one is refused", () => {
    show();
    fireEvent.click(screen.getByRole("button", { name: "Benefits actuals" }));
    fireEvent.click(screen.getByRole("button", { name: "Record actual" }));
    const drawer = screen.getByRole("dialog");
    fireEvent.click(within(drawer).getByRole("button", { name: "Save" }));
    expect(within(drawer).getByRole("alert").textContent).toContain("Pick a work item");
  });

  it("lists the twelve months and the work that lands in the year", () => {
    const { table, cal } = openCalendar();
    const head = within(table).getAllByRole("rowgroup")[0];
    for (const month of cal.months) {
      expect(within(head).getByRole("columnheader", { name: month })).toBeTruthy();
    }
    const landing = cal.rows.find((r) => r.inPlan
      && r.fteClaimed > 0
      && r.lands?.endsWith(String(cal.year))) as (typeof cal.rows)[number];
    expect(within(table).getByRole("link", { name: landing.title })).toBeTruthy();
  });

  it("carries the FTE across from the month the item lands in", () => {
    const { table, cal } = openCalendar();
    const row = cal.rows.find((r) => r.inPlan && r.lands?.startsWith("Oct")
      && r.fteClaimed > 0) as (typeof cal.rows)[number];
    const line = lineFor(table, row.title);
    for (let m = 0; m < 9; m += 1) expect(line.children[m + 1].textContent).toBe("");
    for (const m of [9, 10, 11]) {
      expect(line.children[m + 1].textContent).toBe(row.fteByMonth[m].toFixed(1));
    }
    expect(line.children[10].className).toContain("wp-cal-cell--lands");
  });

  it("switches the month cells between FTE and pounds", () => {
    const { table, cal } = openCalendar();
    const row = cal.rows.find((r) => r.inPlan && r.lands?.startsWith("Oct")
      && r.fteClaimed > 0) as (typeof cal.rows)[number];
    const line = lineFor(table, row.title);
    expect(line.children[12].textContent).toBe(row.fteByMonth[11].toFixed(1));
    fireEvent.click(screen.getByRole("button", { name: "£" }));
    expect(lineFor(table, row.title).children[12].textContent).toContain("£");
  });

  it("foots the cumulative pounds at the sum of the rows in-year", () => {
    const { table } = openCalendar();
    const [body, foot] = within(table).getAllByRole("rowgroup").slice(1);
    const rows = within(body).getAllByRole("row").filter((r) => r.children.length === 16);
    const summed = rows.reduce((t, row) => t + money(row.children[14].textContent ?? ""), 0);
    const cumulative = within(foot).getAllByRole("row")
      .find((r) => r.textContent?.startsWith("Cumulative £")) as HTMLElement;
    const printed = money(cumulative.children[12].textContent ?? "");
    expect(Math.abs(printed - summed)).toBeLessThan(0.5);
  });

  it("groups a claim with no landing month under Not yet dated", () => {
    useDataset.getState().resetToSeed();
    const cal = benefitCalendar(buildContext(useDataset.getState().data));
    const dated = cal.rows.find((r) => r.inPlan && r.fteClaimed > 0
      && r.lands) as (typeof cal.rows)[number];
    useDataset.getState().updateWork(dated.title, { landingMonth: null, landingYear: null });
    const { table } = openCalendar();
    expect(within(table).getByRole("columnheader", { name: "Not yet dated" })).toBeTruthy();
    expect(lineFor(table, dated.title).className).toContain("wp-cal-row--undated");
  });

  it("gives the table all the height, with no landing strip above it", () => {
    const { container } = render(<MemoryRouter><Benefits /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Benefits calendar" }));
    expect(container.querySelector(".wp-cal-strip")).toBeNull();
  });

  it("titles a live month cell with both readings", () => {
    const { table, cal } = openCalendar();
    const row = cal.rows.find((r) => r.inPlan && r.lands?.startsWith("Oct")
      && r.fteClaimed > 0) as (typeof cal.rows)[number];
    const line = lineFor(table, row.title);
    const title = (line.children[10] as HTMLElement).getAttribute("title") ?? "";
    expect(title).toContain("Oct " + cal.year);
    expect(title).toContain("FTE");
    expect(title).toContain("accrued this month");
    expect(title).toContain("in-year");
  });

  it("bands the odd month columns in the header", () => {
    const { table } = openCalendar();
    const head = within(table).getAllByRole("rowgroup")[0];
    const jan = within(head).getByRole("columnheader", { name: "Jan" });
    const feb = within(head).getByRole("columnheader", { name: "Feb" });
    expect(jan.className).toContain("wp-cal-cell--band");
    expect(feb.className).not.toContain("wp-cal-cell--band");
  });

  it("lists a row per benefit type, with the work claiming each one", () => {
    const { data } = useDataset.getState();
    const ctx = buildContext(data);
    const claiming = data.work.filter((w) => inPlan(ctx, w) && Boolean(w.claims.V));
    expect(claiming.length).toBeGreaterThan(0);
    show();
    fireEvent.click(screen.getByRole("button", { name: "By benefit type" }));
    const row = screen.getByRole("row", { name: /Error reduction/ });
    expect(row.children[0].textContent).toBe("V");
    expect(row.children[2].textContent).toBe(String(claiming.length));
  });
});
