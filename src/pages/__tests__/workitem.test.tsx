// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import WorkItem from "../WorkItem";
import { useDataset } from "../../store/useDataset";
import { commitment } from "../../engine/work";
import { itemSpan } from "../../engine/context";

const SPIKE = "Payments orchestration: discovery spike";
/** A seed item that keeps its sprints on span, not on startSprint and endSprint. */
const SPANNED = "3-way match and posting engine";

const show = (title: string) => render(
  <MemoryRouter initialEntries={["/work/" + encodeURIComponent(title)]}>
    <Routes>
      <Route path="/work" element={<p>The register</p>} />
      <Route path="/work/:title" element={<WorkItem />} />
    </Routes>
  </MemoryRouter>,
);

const work = (title: string) => useDataset.getState().data.work.find((w) => w.title === title);

describe("Work item", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  it("heads the page with the item and marks the stage it is in", () => {
    const title = "Exception queue UI";
    show(title);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(title);
    const stage = screen.getByRole("list", { name: "Lifecycle stage" });
    const current = within(stage).getAllByRole("listitem")
      .find((li) => li.getAttribute("aria-current") === "step");
    expect(current?.textContent).toContain("Assessment");
  });

  it("commits the item from the stage actions", () => {
    const title = "Multi-bank feed normaliser: long tail formats";
    show(title);
    expect(commitment(work(title)!)).toBe("Proposed");
    fireEvent.click(screen.getByRole("button", { name: "Commit" }));
    expect(commitment(work(title)!)).toBe("Committed");
  });

  it("concludes a spike, converts it, and lands on the new feature", () => {
    show(SPIKE);
    fireEvent.click(screen.getByRole("button", { name: "Conclude" }));
    const conclude = screen.getByRole("dialog");
    fireEvent.change(within(conclude).getByRole("combobox", { name: "Outcome" }), {
      target: { value: "Feasible" },
    });
    fireEvent.change(within(conclude).getByRole("textbox", { name: "Findings" }), {
      target: { value: "The orchestration API holds up." },
    });
    fireEvent.click(within(conclude).getByRole("button", { name: "Record the outcome" }));
    expect(work(SPIKE)?.spikeOutcome).toBe("Feasible");

    fireEvent.click(screen.getByRole("button", { name: "Convert to a feature" }));
    const convert = screen.getByRole("dialog");
    fireEvent.click(within(convert).getByRole("button", { name: "Create the feature" }));

    const made = useDataset.getState().data.work.find((w) => w.convertedFrom === SPIKE);
    expect(made?.kind).toBe("Feature");
    expect(work(SPIKE)?.convertedTo).toBe(made?.title);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(made?.title);
  });

  it("assesses against the span the engine works in, and saves it onto the sprint fields", () => {
    const [ks, ke] = itemSpan(work(SPANNED)!);
    show(SPANNED);
    fireEvent.click(screen.getByRole("button", { name: "Assess" }));
    const start = screen.getByRole("combobox", { name: "Start sprint" }) as HTMLSelectElement;
    const end = screen.getByRole("combobox", { name: "End sprint" }) as HTMLSelectElement;
    expect(start.value).toBe(String(ks));
    expect(end.value).toBe(String(ke));
    expect(screen.queryByText("No sprint span yet")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(work(SPANNED)?.startSprint).toBe(ks);
    expect(work(SPANNED)?.endSprint).toBe(ke);
  });

  it("adds and removes an assignee from the chip picker", () => {
    show(SPANNED);
    fireEvent.click(screen.getByRole("button", { name: "Assess" }));
    const first = work(SPANNED)!.assignees[0];
    fireEvent.click(screen.getByRole("button", { name: "Remove " + first }));
    expect(screen.queryByRole("button", { name: "Remove " + first })).toBeNull();

    fireEvent.change(screen.getByRole("combobox", { name: "Add person" }), {
      target: { value: first },
    });
    expect(screen.getByRole("button", { name: "Remove " + first })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(work(SPANNED)?.assignees).toEqual([first]);
  });

  it("keeps Save and Discard in the form's footer", () => {
    show(SPANNED);
    expect(screen.getByRole("button", { name: "Save" }).closest(".wp-item__footer")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Discard" })).toBeTruthy();
  });

  it("traps Tab inside a FormDialog and locks the body scroll", () => {
    show(SPIKE);
    fireEvent.click(screen.getByRole("button", { name: "Conclude" }));
    const dialog = screen.getByRole("dialog");
    expect(document.body.style.overflow).toBe("hidden");

    const items = Array.from(dialog.querySelectorAll<HTMLElement>("input, select, textarea, button"));
    const first = items[0];
    const last = items[items.length - 1];
    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(first);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("adds a component in place and lists it under the feature", () => {
    const title = "Exception queue UI";
    show(title);
    fireEvent.click(screen.getByRole("button", { name: "Components" }));
    fireEvent.click(screen.getByRole("button", { name: "Add component" }));

    const dialog = screen.getByRole("dialog");
    const size = Object.keys(useDataset.getState().data.settings.sizes)[0];
    fireEvent.change(within(dialog).getByRole("textbox", { name: "Title" }), {
      target: { value: "Exception queue UI: build" },
    });
    fireEvent.change(within(dialog).getByRole("combobox", { name: "Skill" }), {
      target: { value: "Power Platform" },
    });
    fireEvent.change(within(dialog).getByRole("combobox", { name: "Size" }), {
      target: { value: size },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));

    expect(work("Exception queue UI: build")?.parent).toBe(title);
    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "Exception queue UI: build" })).toBeTruthy();
  });
});
