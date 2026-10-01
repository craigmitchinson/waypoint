// A labelled control with its error text tied to it, so a screen reader hears the rule that failed.
import { useId } from "react";
import type { ReactNode } from "react";

interface Props {
  label: string;
  error?: string;
  hint?: string;
  children: (props: { id: string; "aria-describedby": string | undefined }) => ReactNode;
}

export default function Field({ label, error, hint, children }: Props) {
  const id = useId();
  const noteId = `${id}-note`;
  const described = error || hint ? noteId : undefined;
  return (
    <div className="wp-field">
      <label htmlFor={id}>{label}</label>
      {children({ id, "aria-describedby": described })}
      {error ? <p className="wp-field__error" id={noteId}>{error}</p> : null}
      {!error && hint ? <p className="wp-field__hint" id={noteId}>{hint}</p> : null}
    </div>
  );
}
