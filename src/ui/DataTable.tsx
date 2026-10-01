// A sortable table: every header is a real button, the caption tells a screen reader what the rows
// are, and a row action is a button rather than a click on the row alone.
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  /** What the column sorts on; a column without one does not sort. */
  sort?: (row: T) => string | number;
  cell: (row: T) => ReactNode;
  numeric?: boolean;
}

interface Props<T> {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** The label and handler for the button at the end of every row. */
  action?: { label: (row: T) => string; onClick: (row: T) => void };
  empty?: string;
}

export default function DataTable<T>({ caption, columns, rows, rowKey, action, empty }: Props<T>) {
  const [sortKey, setSortKey] = useState("");
  const [descending, setDescending] = useState(false);

  const sorted = useMemo(() => {
    const column = columns.find((c) => c.key === sortKey);
    if (!column?.sort) return rows;
    const read = column.sort;
    return [...rows].sort((a, b) => {
      const x = read(a);
      const y = read(b);
      const order = typeof x === "number" && typeof y === "number"
        ? x - y
        : String(x).localeCompare(String(y), "en-GB");
      return descending ? -order : order;
    });
  }, [columns, rows, sortKey, descending]);

  const toggle = (key: string) => {
    if (key === sortKey) setDescending(!descending);
    else {
      setSortKey(key);
      setDescending(false);
    }
  };

  return (
    <div className="wp-table-wrap">
      <table className="wp-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={c.numeric ? "wp-num" : undefined}
                aria-sort={sortKey === c.key ? (descending ? "descending" : "ascending") : undefined}
              >
                {c.sort ? (
                  <button type="button" className="wp-sort" onClick={() => toggle(c.key)}>
                    {c.label}
                    {sortKey === c.key
                      ? (descending
                        ? <ArrowDown size={13} aria-hidden="true" />
                        : <ArrowUp size={13} aria-hidden="true" />)
                      : null}
                    <span className="sr-only">
                      {sortKey === c.key && descending ? ", sorted descending" : ", sort ascending"}
                    </span>
                  </button>
                ) : c.label}
              </th>
            ))}
            {action ? <th scope="col"><span className="sr-only">Actions</span></th> : null}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (action ? 1 : 0)}>{empty ?? "Nothing to show."}</td>
            </tr>
          ) : sorted.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((c) => (
                <td key={c.key} className={c.numeric ? "wp-num" : undefined}>{c.cell(row)}</td>
              ))}
              {action ? (
                <td>
                  <button type="button" className="wp-row-btn" onClick={() => action.onClick(row)}>
                    {action.label(row)}
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
