/** The gridJson contract. The component is a pure renderer: everything it draws arrives here. */

export type CellKind = "open" | "leave" | "training" | "bankhol" | "work";

export interface GridDay {
  /** ISO date, YYYY-MM-DD. Raised back on selectedCellJson. */
  date: string;
  /** The weekday, three letters: MON. */
  name: string;
  /** The date as the app writes it: 5 Jan. */
  label: string;
  /** True when the day falls outside the quarter. */
  outside?: boolean;
}

export interface GridCell {
  kind: CellKind;
  /** The one line of text in the cell. */
  label: string;
  /** Delivery status on a work cell: Late, or At risk...; anything else reads as on track. */
  status?: string;
  /** The title tooltip. */
  tooltip?: string;
}

export interface GridPerson {
  name: string;
  role?: string;
  /** The figures after the role: SP 4.5, 100%. */
  meta?: string;
  cells: GridCell[];
}

export interface GridGroup {
  name: string;
  /** The squad figures, right-aligned on the group row. */
  meta?: string;
  people: GridPerson[];
}

export interface GridModel {
  days: GridDay[];
  groups: GridGroup[];
}

const EMPTY: GridModel = { days: [], groups: [] };

/** Reads gridJson. Anything malformed draws the empty grid rather than throwing at the host. */
export function parseGrid(raw: string | null): GridModel {
  if (!raw) return EMPTY;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return EMPTY;
  }
  const model = parsed as Partial<GridModel>;
  if (!model || !Array.isArray(model.days) || !Array.isArray(model.groups)) return EMPTY;
  return {
    days: model.days,
    groups: model.groups.map((g) => ({
      name: g.name,
      meta: g.meta,
      people: Array.isArray(g.people)
        ? g.people.map((p) => ({
          name: p.name,
          role: p.role,
          meta: p.meta,
          cells: Array.isArray(p.cells) ? p.cells : [],
        }))
        : [],
    })),
  };
}
