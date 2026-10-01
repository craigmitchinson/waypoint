// A side panel that behaves like a dialog: focus goes in, Escape closes it, and focus comes back.
import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), '
  + 'input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Drawer({ open, title, onClose, footer, children }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const lastActive = useRef<Element | null>(null);
  const close = useRef(onClose);
  close.current = onClose;
  const headingId = useId();

  // only open and close moves focus: a re-render from typing in the panel must leave the caret alone
  useEffect(() => {
    if (!open) return undefined;
    lastActive.current = document.activeElement;
    const node = panel.current;
    const first = node?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? node)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close.current();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const top = items[0];
      const end = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === top || !node.contains(document.activeElement))) {
        e.preventDefault();
        end.focus();
      } else if (!e.shiftKey && (document.activeElement === end || !node.contains(document.activeElement))) {
        e.preventDefault();
        top.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    const scroll = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = scroll;
      (lastActive.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="wp-drawer-wrap">
      <div className="ccs-scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        className="wp-drawer ccs-glass-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
      >
        <div className="wp-drawer__head">
          <h2 id={headingId}>{title}</h2>
          <button type="button" className="wp-icon-btn" onClick={onClose}>
            <X size={16} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="wp-drawer__body">{children}</div>
        {footer ? <div className="wp-drawer__foot">{footer}</div> : null}
      </div>
    </div>
  );
}
