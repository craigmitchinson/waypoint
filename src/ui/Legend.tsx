export interface LegendItem {
  label: string;
  /** A cell-type class, such as "wp-cell-leave", painted as the swatch. */
  swatch?: string;
  /** A letter or two shown in a badge instead of a swatch. */
  badge?: string;
}

interface Props {
  items: LegendItem[];
}

/** What the grid's colours mean, each one named in text beside its swatch. */
export default function Legend({ items }: Props) {
  return (
    <dl className="wp-legend" aria-label="Legend">
      {items.map((item) => (
        <div className="wp-legend__item" key={item.label}>
          <dt className="wp-legend__key" aria-hidden="true">
            {item.badge ? (
              <span className="wp-legend__badge">{item.badge}</span>
            ) : (
              <span className={"wp-legend__swatch " + (item.swatch ?? "wp-cell-work")} />
            )}
          </dt>
          <dd className="wp-legend__label">{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}
