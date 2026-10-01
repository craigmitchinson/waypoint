import type { ReactNode } from "react";
import SvgImage, { useTheme } from "./SvgImage";
import { monthBarsSvg, paletteFor } from "../charts";

interface Props {
  /** Names the series for the sr-only table. */
  label: string;
  months: string[];
  /** One value per month: the bars. */
  values: number[];
  /** The running total drawn over the bars. */
  cumulative: number[];
  /** The target line drawn over the bars. */
  target: number[];
  /** The month to mark, 1 to 12; nothing is marked outside that. */
  currentMonth: number;
  format: (n: number) => string;
  /** One line under the legend. */
  caption?: ReactNode;
}

/**
 * Twelve months of benefit: a bar a month on its own scale, with the cumulative and target lines
 * over them on theirs. The picture is a built SVG shown through an image; the sr-only table beside
 * it carries all three series.
 */
export default function MonthBars({
  label, months, values, cumulative, target, currentMonth, format, caption,
}: Props) {
  const theme = useTheme();
  const svg = monthBarsSvg(
    { months, values, cumulative, target, currentMonth },
    paletteFor(theme),
  );
  const marked = currentMonth >= 1 && currentMonth <= months.length;

  return (
    <figure className="wp-monthbars">
      {caption ? <figcaption>{caption}</figcaption> : null}
      <p className="wp-monthbars__legend">
        Bars: benefit landing that month. Solid line: cumulative. Dashed line: target.
        {marked ? " The upright marks " + months[currentMonth - 1] + "." : ""}
      </p>
      <SvgImage className="wp-monthbars__img" svg={svg} />
      <table className="sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">In month</th>
            <th scope="col">Cumulative</th>
            <th scope="col">Target</th>
          </tr>
        </thead>
        <tbody>
          {months.map((m, i) => (
            <tr key={m}>
              <th scope="row">{m}</th>
              <td>{format(values[i])}</td>
              <td>{format(cumulative[i])}</td>
              <td>{format(target[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
