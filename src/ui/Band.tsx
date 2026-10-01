import type { ReactNode } from "react";

interface Props {
  /** A mono kicker set above the figures. */
  kicker?: string;
  children: ReactNode;
}

/** A brand-filled panel carrying the quarter's headline Stats. */
export default function Band({ kicker, children }: Props) {
  return (
    <section className="wp-band ccs-on-brand">
      {kicker ? <div className="wp-band__kicker">{kicker}</div> : null}
      <div className="wp-band__grid">{children}</div>
    </section>
  );
}
