// A chip always says its state in words: the tone is a second signal, never the only one.
import type { ReactNode } from "react";

export type Tone = "neutral" | "good" | "warn" | "bad";

export function Chip({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`wp-chip wp-chip--${tone}`}>{children}</span>;
}

/** The tones the delivery ladder and the squad RAG read as. */
export function toneFor(status: string): Tone {
  if (status === "Red" || status === "Late" || status === "Done late") return "bad";
  if (status.startsWith("At risk") || status === "Amber") return "warn";
  if (status === "On track" || status === "Green" || status.startsWith("Done")) return "good";
  return "neutral";
}

export function StatusChip({ status }: { status: string }) {
  if (!status) return <span className="wp-muted">Not started</span>;
  return <Chip tone={toneFor(status)}>{status}</Chip>;
}
