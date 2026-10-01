// The one place the app asks before it removes something.
import { useEffect, useId, useRef } from "react";

interface Props {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open, title, body, confirmLabel = "Remove", onConfirm, onCancel,
}: Props) {
  const card = useRef<HTMLDivElement>(null);
  const lastActive = useRef<Element | null>(null);
  const cancel = useRef(onCancel);
  cancel.current = onCancel;
  const headingId = useId();

  useEffect(() => {
    if (!open) return undefined;
    lastActive.current = document.activeElement;
    const node = card.current;
    node?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        cancel.current();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>("button"));
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
    <div className="wp-dialog-wrap">
      <div className="ccs-scrim" onClick={onCancel} aria-hidden="true" />
      <div
        ref={card}
        className="wp-dialog ccs-glass-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
      >
        <h2 id={headingId}>{title}</h2>
        <p>{body}</p>
        <div className="wp-dialog__actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" className="wp-btn-primary" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
