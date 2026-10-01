// The M-band calibration suggestion, round half to even.
import { describe, expect, it } from "vitest";
import seedDataset from "../../seed";
import { buildContext } from "../context";
import { calibrationBand } from "../calibration";
import type { ArchiveRow, Dataset } from "../../model/types";

describe("calibration band", () => {
  it("suggests 2.0 for an M band at a 1.125 ratio, rounding half to even", () => {
    const archived: ArchiveRow = {
      quarter: "Q4 2026", id: "T-1", title: "Calibration row", epic: "", squad: "", state: "Done",
      assignee: "", status: "Done on time", size: "M", original: 8, latest: 8, actual: 9,
    };
    const data: Dataset = { ...seedDataset, work: [], archive: [archived] };
    const ctx = buildContext(data);
    const band = calibrationBand(ctx, "M");
    expect(band.ratio).toBeCloseTo(1.125, 6);
    expect(band.suggested).toBe(2.0);
  });
});
