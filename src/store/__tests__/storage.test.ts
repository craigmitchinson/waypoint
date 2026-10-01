// @vitest-environment jsdom
// What the store starts from: the stored dataset when it is sound, the seed whenever it is not.
import { beforeEach, describe, expect, it, vi } from "vitest";
import seedDataset from "../../seed";
import { SCHEMA_VERSION, STORAGE_KEY } from "../useDataset";
import type { Dataset } from "../../model/types";

/** A fresh store, built after the given raw string is put in localStorage. */
async function startWith(raw: string | null) {
  localStorage.clear();
  if (raw !== null) localStorage.setItem(STORAGE_KEY, raw);
  vi.resetModules();
  const { useDataset } = await import("../useDataset");
  return useDataset.getState();
}

const stored = (data: Dataset, version = SCHEMA_VERSION, source = "Workbook.xlsm") =>
  JSON.stringify({ version, source, data });

describe("the dataset the store starts from", () => {
  beforeEach(() => localStorage.clear());

  it("loads a sound stored dataset", async () => {
    const data: Dataset = { ...seedDataset, work: seedDataset.work.slice(0, 2) };
    const state = await startWith(stored(data));
    expect(state.source).toBe("Workbook.xlsm");
    expect(state.data.work).toHaveLength(2);
  });

  it("falls back to the seed on a version mismatch", async () => {
    const state = await startWith(stored(seedDataset, SCHEMA_VERSION + 1));
    expect(state.source).toBe("Seed");
    expect(state.data.work).toHaveLength(seedDataset.work.length);
  });

  it("falls back to the seed on corrupt storage", async () => {
    const state = await startWith("{not json");
    expect(state.source).toBe("Seed");
    expect(state.data.work).toHaveLength(seedDataset.work.length);
  });

  it("falls back to the seed on a malformed shape", async () => {
    const malformed = { ...seedDataset, work: "all of it" } as unknown as Dataset;
    const state = await startWith(stored(malformed));
    expect(state.source).toBe("Seed");
    expect(Array.isArray(state.data.work)).toBe(true);
  });

  it("undoes an import back to the dataset it merged into", async () => {
    const state = await startWith(null);
    const before = state.data.work.length;
    state.applyImport({ work: [{ ...seedDataset.work[0], title: "Imported item" }] }, "jira.csv");
    const { useDataset } = await import("../useDataset");
    expect(useDataset.getState().data.work).toHaveLength(before + 1);
    expect(useDataset.getState().source).toBe("jira.csv");
    useDataset.getState().undo();
    expect(useDataset.getState().data.work).toHaveLength(before);
    expect(useDataset.getState().data.work.some((w) => w.title === "Imported item")).toBe(false);
    expect(useDataset.getState().source).toBe("Seed");
  });
});
