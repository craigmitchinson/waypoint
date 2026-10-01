// The importer against the workbook the seed was generated into.
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";
import * as XLSX from "xlsx";
import seedDataset from "../../seed";
import { importWorkbookBuffer } from "../workbook";

const WORKBOOK = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../flightdeck/Waypoint Capacity Planner.xlsm",
);
const hasWorkbook = existsSync(WORKBOOK);
const suite = hasWorkbook ? describe : describe.skip;

suite(hasWorkbook ? "workbook import" : `workbook import (skipped: ${WORKBOOK} not found)`, () => {
  const data = hasWorkbook
    ? importWorkbookBuffer(readFileSync(WORKBOOK))
    : (undefined as unknown as ReturnType<typeof importWorkbookBuffer>);

  it("reads the same blocks as the seed", () => {
    expect(data.people.length).toBe(seedDataset.people.length);
    expect(data.squads.length).toBe(seedDataset.squads.length);
    expect(data.work.length).toBe(seedDataset.work.length);
    expect(data.absences.length).toBe(seedDataset.absences.length);
    // the workbook materialises the automatic Work bookings the seed leaves implicit, so it carries
    // every typed row plus one per assignee of live work
    for (const a of seedDataset.assignments) {
      expect(data.assignments.some((x) => x.person === a.person && x.item === a.item)).toBe(true);
    }
    const extra = data.assignments.filter(
      (x) => !seedDataset.assignments.some((a) => a.person === x.person && a.item === x.item),
    );
    expect(extra.every((x) => x.type === "Work")).toBe(true);
    expect(data.reservations.length).toBe(seedDataset.reservations.length);
    // History carries the live quarter alongside the typed snapshots
    for (const h of seedDataset.history) {
      expect(data.history.some((x) => x.quarter === h.quarter)).toBe(true);
    }
    expect(data.archive.length).toBe(seedDataset.archive.length);
    // Benefits keeps its actuals beside the claims, with no date against them
    for (const a of seedDataset.benefitActuals.filter((x) => typeof x.value === "number")) {
      expect(data.benefitActuals.some((x) => x.title === a.title && x.type === a.type)).toBe(true);
    }
  });

  it("reads the Settings the rules need", () => {
    expect(data.settings.quarter).toBe(seedDataset.settings.quarter);
    expect(data.settings.epoch).toBe(seedDataset.settings.epoch);
    expect(data.settings.sprintDays).toBe(seedDataset.settings.sprintDays);
    expect(data.settings.mwDays).toBe(seedDataset.settings.mwDays);
    expect(data.settings.sizes).toEqual(seedDataset.settings.sizes);
    expect(data.settings.grades).toEqual(seedDataset.settings.grades);
    expect(data.settings.states.map((s) => s.impact)).toEqual(
      seedDataset.settings.states.map((s) => s.impact),
    );
  });

  it("matches the seed on three spot values", () => {
    const person = data.people.find((p) => p.name === "Lena Brooks");
    expect(person?.daysPerWeek).toBe(4);

    const item = data.work.find((w) => w.title === "Statement matching rules v2");
    expect(item?.claimedFTE).toBe(1);
    expect(item?.grade).toBe("Ops mix");

    const reservation = data.reservations.find((r) => r.category === "BAU");
    expect(reservation?.mw).toBe(56);
  });

  it("reads the Financials tables and the Outcome table", () => {
    const grade = data.settings.financials.teamGradeCosts.find((g) => g.grade === "E");
    expect(grade?.annualCost).toBe(80000);
    expect(data.settings.financials.costLines.find((c) => c.name === "AI platform credits"))
      .toEqual({
        name: "AI platform credits",
        costLine: "Licences and subscriptions",
        fundingLine: "Investment",
        annual: 60000,
      });
    const outcome = data.settings.outcomes.find((o) => o.name === "Cut cost to serve");
    expect(outcome?.epics).toEqual(["Finance ops automation", "Service"]);
    expect(data.settings.outcomes.map((o) => o.name))
      .toEqual(seedDataset.settings.outcomes.map((o) => o.name));
  });

  it("gives a row with a start sprint and no end sprint a one-sprint span", () => {
    const wb = XLSX.read(readFileSync(WORKBOOK));
    const sheet = wb.Sheets.Work;
    const rows = XLSX.utils.sheet_to_json<(string | number | null)[]>(sheet, { header: 1, blankrows: true, defval: null });
    const header = (name: string): number => rows[3].findIndex(
      (h) => String(h ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() === name,
    );
    const titleCol = header("title");
    const row = rows.findIndex((r, i) => i > 3 && typeof r[header("end sprint")] === "number");
    const title = String(rows[row][titleCol]);
    const start = rows[row][header("start sprint")] as number;
    delete sheet[XLSX.utils.encode_cell({ r: row, c: header("end sprint") })];
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    const item = importWorkbookBuffer(buffer).work.find((w) => w.title === title);
    expect(item?.span).toEqual([start, start]);
    expect(item?.endSprint).toBe(start);
  });

  it("throws when a required sheet is missing", () => {
    const wb = XLSX.read(readFileSync(WORKBOOK));
    delete wb.Sheets.Work;
    wb.SheetNames = wb.SheetNames.filter((n) => n !== "Work");
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    expect(() => importWorkbookBuffer(buffer)).toThrow(/Work/);
  });

  it("throws when a required header is missing", () => {
    const wb = XLSX.read(readFileSync(WORKBOOK));
    const sheet = wb.Sheets.People;
    const rows = XLSX.utils.sheet_to_json<(string | number | null)[]>(sheet, { header: 1, blankrows: true, defval: null });
    const col = rows[3].findIndex((h) => String(h ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() === "days week");
    const address = XLSX.utils.encode_cell({ r: 3, c: col });
    sheet[address] = { t: "s", v: "Renamed" };
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    expect(() => importWorkbookBuffer(buffer)).toThrow(/Days \/ week/);
  });
});
