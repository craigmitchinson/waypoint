// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import SplitButton from "../SplitButton";

describe("SplitButton", () => {
  afterEach(cleanup);

  it("returns focus to the toggle after choosing a menu item", () => {
    const onSelect = vi.fn();
    render(
      <SplitButton
        label="Add"
        menuLabel="More ways to add"
        menuItems={[{ label: "Add spike", onSelect }]}
        onPrimary={() => {}}
      />,
    );
    const toggle = screen.getByRole("button", { name: "More ways to add" });
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole("menuitem", { name: "Add spike" }));
    expect(onSelect).toHaveBeenCalled();
    expect(document.activeElement).toBe(toggle);
  });
});
