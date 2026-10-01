import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { Dataset, LogEntry } from "../../model/types";
import seedDataset from "../../seed";
import { columnsOf, exportForDataverse } from "../dataverse";

const MODEL = fileURLToPath(new URL("../../../power/waypoint.model.yaml", import.meta.url));

/**
 * The model's stored columns, per table. A tolerant reader for this file's shape rather than a YAML
 * parser, because the app has none and the export is the only thing that needs one. Columns the app
 * or Dataverse computes are skipped: the export never writes a value that is not stored. A column a
 * flow computes is stored, so it stays.
 */
function modelColumns(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  let table = "";
  let inColumns = false;
  for (const line of readFileSync(MODEL, "utf8").split(/\r?\n/)) {
    const named = /^ {2}- logicalName: (\S+)/.exec(line);
    if (named) {
      table = named[1];
      out[table] = [];
      inColumns = false;
      continue;
    }
    if (!table) continue;
    if (/^ {4}\w+:/.test(line)) {
      inColumns = /^ {4}columns:/.test(line);
      continue;
    }
    const column = /^ {6}- \{ schemaName: (\w+),/.exec(line);
    if (inColumns && column && !/computedIn: (app|dataverse)/.test(line)) out[table].push(column[1]);
  }
  return out;
}

const files = exportForDataverse(seedDataset);
const fileFor = (table: string) => files.find((f) => f.table === table);
const lines = (csv: string) => csv.trim().split("\n");
const cells = (line: string) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
  .map((c) => (c.startsWith('"') ? c.slice(1, -1).replace(/""/g, '"') : c));

describe("exportForDataverse", () => {
  it("writes every table's columns in the model's order", () => {
    const model = modelColumns();
    for (const file of files) {
      if (file.table === "manifest") continue;
      expect(model[file.table], `${file.table} is in the model`).toBeTruthy();
      expect(lines(file.csv)[0].split(","), file.table).toEqual(model[file.table]);
      expect(columnsOf(file.table)).toEqual(model[file.table]);
    }
  });

  it("counts the seed's rows", () => {
    const counts = Object.fromEntries(files.map((f) => [f.table, f.rows]));
    expect(counts.wp_person).toBe(35);
    expect(counts.wp_squad).toBe(6);
    expect(counts.wp_workitem).toBe(28);
    expect(counts.wp_absence).toBe(seedDataset.absences.length);
    expect(counts.wp_assignment).toBe(seedDataset.assignments.length);
    expect(counts.wp_reservation).toBe(seedDataset.reservations.length);
    expect(counts.wp_bankholiday).toBe(seedDataset.bankHolidays.length);
    expect(counts.wp_assignee).toBe(seedDataset.work.reduce((n, w) => n + w.assignees.length, 0));
    expect(counts.wp_benefitclaim).toBe(
      seedDataset.work.reduce((n, w) => n + Object.keys(w.claims ?? {}).length, 0),
    );
    expect(counts.wp_setting).toBe(1);
    expect(counts.wp_quarter).toBe(seedDataset.settings.quarters.length);
    expect(counts.wp_workstate).toBe(9);
  });

  it("names the tables, the row counts and the import order in the manifest", () => {
    const manifest = JSON.parse(fileFor("manifest")!.csv);
    const version = /^ {2}version: "([\d.]+)"/m.exec(readFileSync(MODEL, "utf8"))?.[1];
    expect(manifest.modelVersion).toBe(version);
    expect(manifest.importOrder[0]).toBe("wp_listvalue");
    expect(manifest.importOrder.indexOf("wp_squad")).toBeLessThan(
      manifest.importOrder.indexOf("wp_person"),
    );
    expect(manifest.importOrder.indexOf("wp_workitem")).toBeLessThan(
      manifest.importOrder.indexOf("wp_benefitclaim"),
    );
    expect(manifest.tables.find((t: { table: string }) => t.table === "wp_person").rows).toBe(35);
  });

  it("writes a lookup as the target's alternate key value", () => {
    const person = seedDataset.people.find((p) => p.squad)!;
    const file = fileFor("wp_person")!;
    const header = lines(file.csv)[0].split(",");
    const row = lines(file.csv).map(cells).find((r) => r[0] === person.name)!;
    expect(row[header.indexOf("wp_squadid")]).toBe(person.squad);
    expect(row[header.indexOf("wp_lead")]).toBe(person.lead ? "true" : "false");

    const item = seedDataset.work.find((w) => w.state)!;
    const work = fileFor("wp_workitem")!;
    const workHeader = lines(work.csv)[0].split(",");
    const workRow = lines(work.csv).map(cells).find((r) => r[0] === item.title)!;
    expect(workRow[workHeader.indexOf("wp_stateid")]).toBe(item.state);
  });

  it("escapes a comma and a quote in a title", () => {
    const item = { ...seedDataset.work[0], title: 'Reconcile "cash", daily' };
    const data: Dataset = { ...seedDataset, work: [item] };
    const csv = exportForDataverse(data).find((f) => f.table === "wp_workitem")!.csv;
    expect(lines(csv)[1].startsWith('"Reconcile ""cash"", daily",')).toBe(true);
    expect(cells(lines(csv)[1])[0]).toBe('Reconcile "cash", daily');
  });

  it("round-trips a log entry", () => {
    const entry: LogEntry = {
      at: "2026-02-03T09:15:00.000Z",
      label: "Add work item",
      summary: 'Added "Statement matching", 2 MW',
      user: "CM",
    };
    const data: Dataset = { ...seedDataset, log: [entry] };
    const file = exportForDataverse(data).find((f) => f.table === "wp_activitylog")!;
    expect(file.rows).toBe(1);
    const header = lines(file.csv)[0].split(",");
    const row = cells(lines(file.csv)[1]);
    expect(row[header.indexOf("wp_name")]).toBe(entry.label);
    expect(row[header.indexOf("wp_summary")]).toBe(entry.summary);
    expect(row[header.indexOf("wp_byuserid")]).toBe(entry.user);
    expect(row[header.indexOf("wp_at")]).toBe(entry.at);
    expect(row[header.indexOf("wp_action")]).toBe("Create");
  });
});
