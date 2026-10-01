// A Fluent split button: the usual action on the left, the rest of them behind a menu on the right.
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

export interface SplitItem {
  label: string;
  onSelect: () => void;
}

interface Props {
  label: string;
  menuLabel: string;
  /** The other ways to act, the primary excluded: the menu never repeats the left-hand button. */
  menuItems: SplitItem[];
  onPrimary: () => void;
}

export default function SplitButton({ label, menuLabel, menuItems, onPrimary }: Props) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [at, setAt] = useState(0);

  useEffect(() => {
    if (!open) return undefined;
    const node = wrap.current;
    const buttons = () => Array.from(node?.querySelectorAll<HTMLElement>("[role='menuitem']") ?? []);
    buttons()[at]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const count = buttons().length;
        setAt((i) => (e.key === "ArrowDown" ? (i + 1) % count : (i - 1 + count) % count));
        return;
      }
      if (e.key === "Tab") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (node && !node.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, at]);

  const choose = (item: SplitItem) => {
    setOpen(false);
    toggle.current?.focus();
    item.onSelect();
  };

  return (
    <div className="wp-split" ref={wrap}>
      <button type="button" className="wp-btn-primary wp-split__main" onClick={onPrimary}>
        <Plus size={14} aria-hidden="true" />
        {label}
      </button>
      <button
        type="button"
        ref={toggle}
        className="wp-btn-primary wp-split__more"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={menuLabel}
        onClick={() => {
          setAt(0);
          setOpen(!open);
        }}
      >
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open ? (
        <div className="wp-split__menu" role="menu" aria-label={menuLabel}>
          {menuItems.map((item) => (
            <button key={item.label} type="button" role="menuitem" onClick={() => choose(item)}>
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
