import * as React from "react";
import { GridCell, GridModel, GridPerson } from "./model";

export interface IGridProps {
  model: GridModel;
  theme: string;
  width: number;
  height: number;
  onSelect: (person: string, date: string) => void;
}

/** The class the cell is drawn in: the kind, unless a work cell carries a status. */
function cellClass(cell: GridCell): string {
  if (cell.kind === "work") {
    if (cell.status === "Late") return "wp-cell-blocked";
    if (cell.status?.startsWith("At risk")) return "wp-cell-atrisk";
    return "wp-cell-work";
  }
  return "wp-cell-" + cell.kind;
}

/** The title tooltip, empty when the cell carries none. */
function tipOf(cell: GridCell): string {
  return cell.tooltip ?? "";
}

/** The status a work cell says in words as well as in colour. */
function noteOf(cell: GridCell): string {
  if (cell.kind !== "work" || !cell.status) return "";
  if (cell.status === "Late" || cell.status.startsWith("At risk")) return cell.status;
  return "";
}

function initials(name: string): string {
  const parts = name.split(/\s+/).filter((p) => p.length > 0);
  if (parts.length === 0) return "";
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

export const Grid: React.FC<IGridProps> = (props) => {
  const { model, theme, width, height, onSelect } = props;
  const days = model.days;

  // Every person row in order, so the caret can move between squads.
  const rows = React.useMemo<GridPerson[]>(
    () => model.groups.reduce<GridPerson[]>((all, g) => all.concat(g.people), []),
    [model],
  );

  // The first row of each squad, for PageUp and PageDown.
  const starts = React.useMemo<number[]>(() => {
    const out: number[] = [];
    let n = 0;
    for (const g of model.groups) {
      out.push(n);
      n += g.people.length;
    }
    return out;
  }, [model]);

  // ---- the grid's own focus: one cell in the tab order, the arrows move it ----
  const [focus, setFocus] = React.useState<[number, number]>([0, 0]);
  const buttons = React.useRef(new Map<string, HTMLButtonElement>());
  const at = (r: number, c: number) => r + ":" + c;

  const move = (r: number, c: number) => {
    const rr = Math.max(0, Math.min(rows.length - 1, r));
    const cc = Math.max(0, Math.min(days.length - 1, c));
    setFocus([rr, cc]);
    const node = buttons.current.get(at(rr, cc));
    if (node) node.focus();
  };

  /** The first row of the squad before or after the one the caret sits in. */
  const squadStep = (r: number, step: 1 | -1) => {
    const here = Math.max(0, starts.filter((s) => s <= r).length - 1);
    return starts[Math.max(0, Math.min(starts.length - 1, here + step))];
  };

  const onKeyDown = (e: React.KeyboardEvent, r: number, c: number, person: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(person, days[c].date);
      return;
    }
    const moves: Record<string, [number, number]> = {
      ArrowRight: [r, c + 1],
      ArrowLeft: [r, c - 1],
      ArrowDown: [r + 1, c],
      ArrowUp: [r - 1, c],
      Home: [r, 0],
      End: [r, days.length - 1],
      PageDown: [squadStep(r, 1), c],
      PageUp: [squadStep(r, -1), c],
    };
    const next = moves[e.key];
    if (!next) return;
    e.preventDefault();
    move(next[0], next[1]);
  };

  const style: React.CSSProperties = { width: width, height: height };
  const gridStyle = { "--wp-sg-days": days.length } as React.CSSProperties;

  if (days.length === 0 || rows.length === 0) {
    return (
      <div className="wp-sg" data-theme={theme} style={style}>
        <p className="wp-sg__empty">No sprint to show.</p>
      </div>
    );
  }

  let r = -1;

  return (
    <div className="wp-sg" data-theme={theme} style={style}>
      <div className="wp-sg__grid" style={gridStyle}>
        <div className="wp-sg__row wp-sg__row--head">
          <div className="wp-sg__name wp-sg__name--head">Person</div>
          {days.map((day) => (
            <div
              className="wp-sg__day"
              key={day.date}
              title={day.outside ? "Outside the quarter" : undefined}
            >
              <span className="wp-sg__day-date">
                <span className="wp-sg__day-name">{day.name}</span> {day.label}
              </span>
              {day.outside ? (
                <React.Fragment>
                  <span className="wp-sg__day-dot" aria-hidden="true" />
                  <span className="wp-sg__sr">outside quarter</span>
                </React.Fragment>
              ) : null}
            </div>
          ))}
        </div>

        {model.groups.map((group) => (
          <div key={group.name}>
            <div className="wp-sg__row wp-sg__row--group">
              <div className="wp-sg__name">
                <span className="wp-sg__group-name">{group.name}</span>
              </div>
              <div className="wp-sg__group-meta">{group.meta}</div>
            </div>
            {group.people.map((p) => {
              r += 1;
              const row = r;
              return (
                <div className="wp-sg__row" key={p.name}>
                  <div className="wp-sg__name">
                    <span className="wp-sg__avatar" aria-hidden="true">{initials(p.name)}</span>
                    <span className="wp-sg__person">
                      <span className="wp-sg__person-name">{p.name}</span>
                      <span className="wp-sg__person-line">
                        <span className="wp-sg__person-role">{p.role}</span>
                        <span className="wp-sg__person-figs">{p.meta ? " · " + p.meta : ""}</span>
                      </span>
                    </span>
                  </div>
                  {days.map((day, c) => {
                    const cell: GridCell = p.cells[c] ?? { kind: "open", label: "Open" };
                    const note = noteOf(cell);
                    const tip = tipOf(cell);
                    return (
                      <button
                        key={day.date}
                        type="button"
                        ref={(node) => {
                          if (node) buttons.current.set(at(row, c), node);
                          else buttons.current.delete(at(row, c));
                        }}
                        className={"wp-sg__cell " + cellClass(cell)}
                        aria-label={p.name + ", " + day.label + ": " + (tip.length > 0 ? tip : cell.label)}
                        title={tip.length > 0 ? tip : undefined}
                        tabIndex={focus[0] === row && focus[1] === c ? 0 : -1}
                        onKeyDown={(e) => onKeyDown(e, row, c, p.name)}
                        onFocus={() => setFocus([row, c])}
                        onClick={() => onSelect(p.name, day.date)}
                      >
                        {cell.kind === "open"
                          ? <span className="wp-sg__cell-plus" aria-hidden="true">+</span>
                          : null}
                        <span className="wp-sg__cell-text">
                          {cell.label}{note ? " · " + note : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
