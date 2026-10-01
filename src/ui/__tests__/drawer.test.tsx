// @vitest-environment jsdom
// The drawer as a dialog: focus goes in, Escape closes it, focus comes back, and a re-render while
// the panel is open leaves the caret where the person put it.
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Drawer from "../Drawer";

function Harness() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open</button>
      <Drawer open={open} title="Edit" onClose={() => setOpen(false)}>
        <label htmlFor="note">Note</label>
        <input id="note" value={text} onChange={(e) => setText(e.target.value)} />
      </Drawer>
    </>
  );
}

describe("Drawer", () => {
  afterEach(cleanup);

  it("opens with focus inside the panel", () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("closes on Escape and gives focus back to the opener", () => {
    render(<Harness />);
    const opener = screen.getByRole("button", { name: "Open" });
    opener.focus();
    fireEvent.click(opener);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it("locks the body scroll while it is open", () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("keeps focus in the field being typed in across a re-render", () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const field = screen.getByLabelText("Note") as HTMLInputElement;
    field.focus();
    fireEvent.change(field, { target: { value: "a" } });
    expect(document.activeElement).toBe(screen.getByLabelText("Note"));
    fireEvent.change(screen.getByLabelText("Note"), { target: { value: "ab" } });
    expect(document.activeElement).toBe(screen.getByLabelText("Note"));
    expect((screen.getByLabelText("Note") as HTMLInputElement).value).toBe("ab");
  });

  it("puts the scrim before the panel so the panel takes the clicks", () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    const wrap = dialog.parentElement as HTMLElement;
    expect(wrap.children[0].className).toContain("ccs-scrim");
    expect(wrap.children[1]).toBe(dialog);
  });

  it("fires a click on a button inside the panel", () => {
    const apply = vi.fn();
    render(
      <Drawer open title="Edit" onClose={() => {}} footer={<button type="button" onClick={apply}>Apply</button>}>
        <p>Body</p>
      </Drawer>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(apply).toHaveBeenCalled();
  });

  it("calls the handler it was last given when it closes", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<Drawer open title="Edit" onClose={first}><p>Body</p></Drawer>);
    rerender(<Drawer open title="Edit" onClose={second}><p>Body</p></Drawer>);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalled();
  });
});
