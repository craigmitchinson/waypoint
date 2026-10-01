// The bar over a table: filters on the left, actions on the right.
import type { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function Toolbar({ label, children, actions }: Props) {
  return (
    <div className="wp-toolbar" role="group" aria-label={label}>
      <div className="wp-toolbar__filters">{children}</div>
      {actions ? <div className="wp-toolbar__actions">{actions}</div> : null}
    </div>
  );
}
