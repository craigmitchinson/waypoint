// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import QuarterClose from "../QuarterClose";
import { useDataset } from "../../store/useDataset";
import { buildContext, itemSpan } from "../../engine/context";
import { counts } from "../../engine/work";
import { calibrationBand } from "../../engine/calibration";

describe("Quarter close", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  it("counts the items the close will mark Done by the workbook's own rule", () => {
    const { data } = useDataset.getState();
    const ctx = buildContext(data);
    // MarkEndedDone: a counted item whose last sprint is inside the quarter
    const ended = data.work.filter(
      (w) => w.title && counts(ctx, w) && itemSpan(w)[1] <= ctx.lastSprint,
    ).length;

    render(<QuarterClose />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Quarter close");
    expect(screen.getByRole("heading", { name: `${ended} item(s) to be marked Done` })).toBeTruthy();
  });

  it("reads every Compare row as more, fewer or the same, never better or worse", () => {
    render(<QuarterClose />);
    fireEvent.click(screen.getByRole("button", { name: "Compare" }));
    const table = screen.getByRole("table", { name: /^Compare:/ });
    const rows = within(table).getAllByRole("row").slice(1);
    const reads = rows.map((row) => within(row).getAllByRole("cell").slice(-1)[0].textContent);

    expect(reads.length).toBeGreaterThan(0);
    for (const read of reads) expect(["more", "fewer", "same"]).toContain(read);
    expect(reads.some((read) => read === "more" || read === "fewer")).toBe(true);
    expect(table.textContent).not.toContain("better");
    expect(table.textContent).not.toContain("worse");
  });

  it("shows a Calibration row per size band with data, a total row, and the engine's ratio tone", () => {
    const { data } = useDataset.getState();
    const ctx = buildContext(data);
    const sizes = Object.keys(data.settings.sizes);
    const withData = sizes.filter((size) => calibrationBand(ctx, size).items > 0);

    render(<QuarterClose />);
    fireEvent.click(screen.getByRole("button", { name: "Calibration" }));
    const table = screen.getByRole("table", { name: /^Calibration:/ });
    const rows = within(table).getAllByRole("row").slice(1);
    const labels = rows.map((row) => within(row).getAllByRole("cell")[0].textContent);

    expect(withData.length).toBeGreaterThan(0);
    for (const size of withData) expect(labels).toContain(size);
    expect(labels[labels.length - 1]).toBe("Total");

    const size = withData[0];
    const { ratio } = calibrationBand(ctx, size);
    const tone = ratio >= 0.9 && ratio <= 1.1
      ? "good"
      : ratio >= 0.75 && ratio <= 1.25 ? "warn" : "bad";
    const cells = within(rows[labels.indexOf(size)]).getAllByRole("cell");
    const pill = cells[4].querySelector(".wp-pill");
    expect(pill?.className).toContain("wp-pill--" + tone);
    expect(pill?.textContent).toContain(ratio.toFixed(2) + "x");
  });
});
