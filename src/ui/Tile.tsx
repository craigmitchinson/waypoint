// One measure: a kicker, the number, and the sentence that says how it was worked.
interface Props {
  kicker: string;
  value: string;
  note: string;
}

export default function Tile({ kicker, value, note }: Props) {
  return (
    <div className="wp-tile">
      <dt>{kicker}</dt>
      <dd>{value}</dd>
      <p>{note}</p>
    </div>
  );
}
