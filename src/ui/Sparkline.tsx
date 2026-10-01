import SvgImage, { useTheme } from "./SvgImage";
import { paletteFor, sparklineSvg } from "../charts";
import type { SparkPoint } from "../charts";

export type { SparkPoint };

interface Props {
  /** Names the series for the sr-only table. */
  label: string;
  points: SparkPoint[];
  format: (n: number) => string;
  /** The point the dot sits on; the last one by default. */
  mark?: number;
  /** The heading of the first column of the sr-only table. */
  keyLabel?: string;
}

/**
 * A sparkline is a picture of a series, built as an SVG string and shown through an image: the
 * sr-only table beside it carries the same figures.
 */
export default function Sparkline({ label, points, format, mark, keyLabel = "Point" }: Props) {
  const theme = useTheme();
  if (points.length === 0) return null;
  const svg = sparklineSvg(points, paletteFor(theme), undefined, mark);

  return (
    <span className="wp-sparkline">
      <SvgImage className="wp-sparkline__img" svg={svg} />
      <table className="sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">{keyLabel}</th>
            <th scope="col">{label}</th>
          </tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.label}>
              <th scope="row">{p.label}</th>
              <td>{format(p.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </span>
  );
}
