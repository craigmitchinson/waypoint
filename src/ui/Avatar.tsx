interface Props {
  name: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
  return (first + last).toUpperCase();
}

/** Initials in a brand disc. Decorative: the caller shows the name in text. */
export default function Avatar({ name }: Props) {
  return (
    <span className="wp-avatar" aria-hidden="true">
      {initials(name)}
    </span>
  );
}
