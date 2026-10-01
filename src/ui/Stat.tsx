import type { ReactNode } from "react";

interface Props {
  label: string;
  value: ReactNode;
  /** A short unit set after the value, such as MW or days. */
  unit?: string;
  /** One line of context under the value. */
  sub?: ReactNode;
  /** "accent" colours the value with the accent token. */
  tone?: "accent";
  /** Set on a brand band, where the text is white rather than ink. */
  onBrand?: boolean;
}

/** One figure with its label: the unit a Band or a card is built from. */
export default function Stat({ label, value, unit, sub, tone, onBrand }: Props) {
  const classes = ["wp-stat"];
  if (onBrand) classes.push("wp-stat--on-brand");
  return (
    <div className={classes.join(" ")}>
      <div className="wp-stat__label">{label}</div>
      <div className={tone === "accent" ? "wp-stat__value wp-stat__value--accent" : "wp-stat__value"}>
        {value}
        {unit ? <span className="wp-stat__unit">{unit}</span> : null}
      </div>
      {sub ? <div className="wp-stat__sub">{sub}</div> : null}
    </div>
  );
}
