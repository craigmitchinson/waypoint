import { useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  lede: string;
  /** A mono kicker above the heading. */
  eyebrow?: string;
  /** Controls set to the right of the heading. */
  actions?: ReactNode;
  children?: ReactNode;
}

/** Every view sets its own title and carries exactly one h1. */
export default function Section({ title, lede, eyebrow, actions, children }: Props) {
  useEffect(() => {
    document.title = title + " · Waypoint";
  }, [title]);
  return (
    <div className="wp-page">
      <div className="wp-section-head">
        <div className="wp-section-head__row">
          {eyebrow ? <p className="wp-eyebrow wp-section-eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
        </div>
        {actions ? <div className="wp-section-head__actions">{actions}</div> : null}
      </div>
      <p className="wp-lede">{lede}</p>
      {children}
    </div>
  );
}
