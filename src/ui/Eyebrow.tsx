import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** An override colour, as a token reference. Muted otherwise. */
  color?: string;
}

/** A mono micro label above a heading or a figure. */
export default function Eyebrow({ children, color }: Props) {
  return (
    <div className="wp-eyebrow" style={color ? { color } : undefined}>
      {children}
    </div>
  );
}
