import type { ReactNode } from "react";

export type PillTone = "neutral" | "brand" | "accent" | "good" | "warn" | "bad";

interface Props {
  children: ReactNode;
  tone?: PillTone;
}

/** A small pill. The tone tints it; the text always says what it means. */
export default function Pill({ children, tone = "neutral" }: Props) {
  return <span className={"wp-pill wp-pill--" + tone}>{children}</span>;
}
