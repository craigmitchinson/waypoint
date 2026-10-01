// Timeline: four readings of the same bookings. Sprint is the planning grid, a column per working day
// of one sprint, typed cells and an editor that writes real bookings and absences. Quarter is the
// same grid a column per week, thirteen weeks of the quarter against the same people. Sprints is the
// workbook's Sprint plan, a squad per row and a sprint per column. Gaps reads the same weeks the
// other way round: where the free days are, by skill and by person.
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Section from "./Section";
import { useDataset } from "../store/useDataset";
import {
  bankHolidayCount, bookingKey, buildContext, itemSpan, sprintEnd, sprintStart,
} from "../engine/context";
import type { EngineContext } from "../engine/context";
import {
  absenceMW, bookedDays, daysPerWeek, isSickness, modifier, netMW, squadNetMW, weekDays,
} from "../engine/capacity";
import { deliveryStatuses } from "../engine/delivery";
import { sprintAvailableMW, sprintPlan } from "../engine/sprintPlan";
import type { SprintPlanCell } from "../engine/sprintPlan";
import { squadCommittedMW } from "../engine/work";
import { addDays, MONTHS, MS_DAY, overlapWeek, parseDate, toISO, weekday } from "../engine/dates";
import type { Absence, Assignment, Person } from "../model/types";
import { validateAbsence, validateAssignment } from "../store/validate";
import {
  Avatar, ConfirmDialog, Drawer, Field, Legend, Pill,
} from "../ui";
import "./timeline.css";

type Reading = "Sprint" | "Quarter" | "Sprints" | "Gaps";
/** The Sprints matrix reads its cells in member weeks or as utilisation. */
type Unit = "MW" | "%";

const READINGS: Reading[] = ["Sprint", "Quarter", "Sprints", "Gaps"];
const UNITS: Unit[] = ["MW", "%"];

/** The quarter is thirteen weeks of the timeline year, from the week the quarter opens in. */
const QUARTER_WEEKS = 13;

/** A free day or more in three of them: the window Gaps opens on. */
const GAP_DAYS = 3;

/** How many free days a window can be asked for. */
const GAP_CHOICES = [1, 2, 3, 4, 5];

/** Anyone in no squad falls to a group of their own, last. */
const UNASSIGNED = "Unassigned";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/** A scroll the reader asked for, animated unless they have asked for less motion. */
const scrollBehaviour = (): ScrollBehavior =>
  (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

interface Booking {
  person: string;
  item: string;
  label: string;
  type: string;
  from: Date;
  to: Date;
  /** The row on Assignments this came from, or -1 when Work wrote it from the assignee list. */
  index: number;
}

/** Gaps asking Sprint to open one person's week; the stamp makes a repeat ask a new one. */
interface Jump {
  person: string;
  mon: Date;
  at: number;
}

/** Sprints asking Sprint to step to one sprint and snap to one squad. */
interface Step {
  sprint: number;
  squad: string;
  at: number;
}

const dayLabel = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;

const mwText = (n: number) => n.toFixed(1);

/** Days read whole where they are whole: a part-time week is the only place a half day shows. */
const dayText = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

/** The Monday of a week, as the grids head their columns. */
const weekLabel = (mon: Date) => `w/c ${dayLabel(mon)}`;

const sprintOf = (ctx: EngineContext, mon: Date) =>
  Math.floor((addDays(mon, 4).getTime() - ctx.epoch.getTime()) / MS_DAY / ctx.sprintDays) + 1;

/** The thirteen weeks of the quarter, as both the week grid and Gaps read them. */
const quarterWeeks = (ctx: EngineContext) =>
  ctx.weeks.slice(ctx.quarterWeekOffset, ctx.quarterWeekOffset + QUARTER_WEEKS);

/**
 * Every booking the sheet draws: the typed rows on Assignments, and the automatic row Work writes for
 * each assignee of live work with no components. The same rule buildContext books capacity by.
 */
function bookingsOf(ctx: EngineContext): Booking[] {
  const out: Booking[] = ctx.data.assignments.map((a, index) => ({
    person: a.person,
    item: a.item,
    label: a.label || a.item.slice(0, 18),
    type: a.type,
    from: parseDate(a.from),
    to: parseDate(a.to),
    index,
  }));
  for (const w of ctx.data.work) {
    if (ctx.impact[w.state] === "Removed" || (ctx.kids[w.title] ?? 0) > 0) continue;
    const [ks, ke] = itemSpan(w);
    const seen: string[] = [];
    for (const nm of w.assignees) {
      if (!nm || seen.includes(nm) || ctx.typedPairs.has(bookingKey(nm, w.title))) continue;
      seen.push(nm);
      out.push({
        person: nm,
        item: w.title,
        label: w.title.slice(0, 18),
        type: "Work",
        from: addDays(ctx.epoch, (ks - 1) * ctx.sprintDays),
        to: addDays(ctx.epoch, ke * ctx.sprintDays - 1),
        index: -1,
      });
    }
  }
  return out;
}

/** The people the grids draw: an open vacancy carries no capacity, so it carries no row. */
function plannedPeople(ctx: EngineContext): Person[] {
  return ctx.data.people.filter((p) => p.name && p.employment !== "Open vacancy");
}

interface SquadGroup {
  name: string;
  members: Person[];
}

/** Squads in the order the Squads sheet holds them, then anyone in no squad. */
function squadGroups(ctx: EngineContext, people: Person[]): SquadGroup[] {
  const squads = ctx.data.squads;
  const out = squads
    .map((s) => s.name)
    .filter((name) => people.some((p) => p.squad === name))
    .map((name) => ({ name, members: people.filter((p) => p.squad === name) }));
  const loose = people.filter((p) => !squads.some((s) => s.name === p.squad));
  if (loose.length > 0) out.push({ name: UNASSIGNED, members: loose });
  return out;
}

export default function Timeline() {
  const { data, view } = useDataset();
  const ctx = useMemo(() => buildContext(data), [data]);
  const [reading, setReading] = useState<Reading>("Sprint");
  const [jump, setJump] = useState<Jump | null>(null);
  const [step, setStep] = useState<Step | null>(null);

  /** Gaps hands a person and a week to Sprint, which steps to it and opens the editor. */
  const book = (person: string, mon: Date) => {
    setJump({ person, mon, at: Date.now() });
    setReading("Sprint");
  };

  /** Sprints hands a sprint and a squad to Sprint, which steps to it and snaps to the squad. */
  const open = (sprint: number, squad: string) => {
    setStep({ sprint, squad, at: Date.now() });
    setReading("Sprint");
  };

  return (
    <Section
      eyebrow={`${data.settings.quarter} · ${mwText(view.net_total)} available`
        + ` · ${mwText(view.committed_total.value)} committed`
        + ` · ${mwText(view.net_total - view.committed_total.value - view.reservations.reserved_total)} remaining`}
      title="Timeline"
      lede="Who is booked on what, day by day in a sprint, week by week across the quarter, sprint by sprint by squad, and where the free days are."
      actions={(
        <div className="wp-tabs wp-tl-readings" role="group" aria-label="Reading">
          {READINGS.map((r) => (
            <button key={r} type="button" aria-pressed={reading === r} onClick={() => setReading(r)}>
              {r}
            </button>
          ))}
        </div>
      )}
    >
      {reading === "Sprint" ? <SprintGrid ctx={ctx} jump={jump} step={step} /> : null}
      {reading === "Quarter" ? <QuarterGrid ctx={ctx} /> : null}
      {reading === "Sprints" ? <SprintPlanGrid ctx={ctx} onOpen={open} /> : null}
      {reading === "Gaps" ? <GapsView ctx={ctx} onBook={book} /> : null}
    </Section>
  );
}

// ---------------------------------------------------------------------------
// The squad snap row, shared by Sprint and Quarter
// ---------------------------------------------------------------------------

interface SnapGroup {
  name: string;
  pct: number;
}

/** One cell per squad, the row split evenly: it scrolls that squad's group row to the top. */
function SquadSnap(
  { groups, active, onSnap }: { groups: SnapGroup[]; active: string; onSnap: (name: string) => void },
) {
  const style = { "--wp-tl-snap-cells": groups.length + 1 } as CSSProperties;
  return (
    <div className="wp-tl-snap" role="group" aria-label="Jump to a squad" style={style}>
      <button
        type="button"
        className="wp-tl-snap__cell"
        aria-pressed={active === ""}
        onClick={() => onSnap("")}
      >
        <span className="wp-tl-snap__name">All</span>
      </button>
      {groups.map((g) => (
        <button
          key={g.name}
          type="button"
          className="wp-tl-snap__cell"
          aria-pressed={active === g.name}
          onClick={() => onSnap(g.name)}
        >
          <span className="wp-tl-snap__name">{g.name}</span>
          <span className="wp-tl-snap__pct">{g.pct}% used</span>
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sprint: the planning grid
// ---------------------------------------------------------------------------

type CellKind = "bankhol" | "leave" | "training" | "work" | "open";

const CELL_CLASS: Record<CellKind, string> = {
  bankhol: "wp-cell-bankhol",
  leave: "wp-cell-leave",
  training: "wp-cell-training",
  work: "wp-cell-work",
  open: "wp-cell-open",
};

/** The row a cell could be cleared through, and the span that row covers. */
interface ClearRef {
  kind: "absence" | "assignment";
  index: number;
  from: string;
  to: string;
  what: string;
}

interface DayCell {
  kind: CellKind;
  /** The cell class, which delivery status can move off wp-cell-work. */
  className: string;
  /** What the cell shows, in text. */
  text: string;
  /** What a reader hears after the person and the date. */
  state: string;
  /** The delivery status of the work, when it is anything but on track. */
  note: string;
  item: string;
  squad: string;
  status: string;
  jira: string;
  clear: ClearRef | null;
  /** A booking Work wrote from the assignee list: there is no row on Assignments to remove. */
  auto: boolean;
}

/** What the editor writes against: one person, one day or one week, and what stands there now. */
interface EditSubject {
  person: string;
  /** The first day of the booking: the cell's own day, or the week's Monday. */
  from: Date;
  /** What To opens on: the same day, or the week's Friday. */
  until: Date;
  /** How the day or the week is named in the title. */
  when: string;
  /** What the cell says now. */
  state: string;
  clear: ClearRef | null;
  auto: boolean;
}

/**
 * The kinds a cell's colour carries alone, then the two the left border carries; status and Jira
 * are written into the cell itself.
 */
const LEGEND = [
  { label: "Open", swatch: "wp-cell-open" },
  { label: "Leave", swatch: "wp-cell-leave" },
  { label: "Training", swatch: "wp-cell-training" },
  { label: "Bank holiday", swatch: "wp-cell-bankhol" },
  { label: "Work", swatch: "wp-cell-work" },
  { label: "At risk", swatch: "wp-sp-edge wp-sp-edge--atrisk" },
  { label: "Late", swatch: "wp-sp-edge wp-sp-edge--late" },
];

type EditKind = "Work" | "Leave" | "Training" | "Clear";

const EDIT_KINDS: EditKind[] = ["Work", "Leave", "Training", "Clear"];

/** The working days one sprint covers: Monday to Friday, across the sprint length from Settings. */
function sprintColumns(ctx: EngineContext, num: number): Date[] {
  const out: Date[] = [];
  const last = sprintEnd(ctx, num);
  for (let d = sprintStart(ctx, num); d <= last; d = addDays(d, 1)) {
    if (weekday(d) < 5) out.push(d);
  }
  return out;
}

function SprintGrid(
  { ctx, jump, step }: { ctx: EngineContext; jump: Jump | null; step: Step | null },
) {
  const { data } = useDataset();
  const statuses = useMemo(() => deliveryStatuses(ctx), [ctx]);
  const people = useMemo(() => plannedPeople(ctx), [ctx]);

  const [sprint, setSprint] = useState(
    () => Math.min(ctx.lastSprint, Math.max(ctx.firstSprint, ctx.currentSprint)),
  );
  const num = Math.min(ctx.lastSprint, Math.max(ctx.firstSprint, sprint));
  const days = useMemo(() => sprintColumns(ctx, num), [ctx, num]);

  /** One typed cell per person per working day, in the workbook's own order of precedence. */
  const cells = useMemo(() => {
    const bookings = bookingsOf(ctx);
    const byPerson = new Map<string, Booking[]>();
    for (const b of bookings) {
      const list = byPerson.get(b.person);
      if (list) list.push(b);
      else byPerson.set(b.person, [b]);
    }
    const absences = data.absences.map((a, index) => ({ ...a, index }));
    const out = new Map<string, DayCell[]>();
    for (const p of people) {
      const mine = byPerson.get(p.name) ?? [];
      const theirs = absences.filter((a) => a.person === p.name);
      const region = ctx.personRegion[p.name] ?? "England";
      out.set(p.name, days.map((day) => {
        if (bankHolidayCount(ctx, region, day, day) > 0) {
          return blank("bankhol", "Bank hol", "Bank holiday");
        }
        const off = theirs.find((a) => parseDate(a.from) <= day && parseDate(a.to) >= day);
        if (off) {
          const kind: CellKind = off.type === "Training" ? "training" : "leave";
          return {
            ...blank(kind, isSickness(off.type) ? "Sick" : off.type, off.type),
            clear: {
              kind: "absence" as const, index: off.index, from: off.from, to: off.to, what: off.type,
            },
          };
        }
        const booking = mine.find((b) => b.from <= day && b.to >= day);
        if (booking) {
          const status = statuses.get(booking.item) ?? "";
          const note = status === "Late" || status.startsWith("At risk") ? status : "";
          const item = ctx.byTitle.get(booking.item);
          let className = CELL_CLASS.work;
          if (status === "Late") className = "wp-cell-blocked";
          else if (status.startsWith("At risk")) className = "wp-cell-atrisk";
          return {
            kind: "work" as CellKind,
            className,
            text: booking.label,
            state: note ? `${booking.item}, ${status}` : booking.item,
            note,
            item: booking.item,
            squad: item?.squad ?? "",
            status: status || "On track",
            jira: item?.jira ?? "",
            clear: booking.index < 0 ? null : {
              kind: "assignment" as const,
              index: booking.index,
              from: toISO(booking.from),
              to: toISO(booking.to),
              what: booking.item,
            },
            auto: booking.index < 0,
          };
        }
        return blank("open", "Open", "Open");
      }));
    }
    return out;
  }, [ctx, data.absences, days, people, statuses]);

  /** Productive MW for one person this sprint, on the engine's own rule: the Sprints matrix reads it too. */
  const personMW = (name: string) => sprintAvailableMW(ctx, name, num);

  const groups = useMemo(() => squadGroups(ctx, people), [ctx, people]);

  const rows = useMemo(() => groups.flatMap((g) => g.members), [groups]);

  const openDays = rows.reduce(
    (t, p) => t + (cells.get(p.name) ?? []).filter(
      (c, i) => c.kind === "open" && days[i] >= ctx.qstart && days[i] <= ctx.qend,
    ).length,
    0,
  );
  const sprintMW = rows.reduce((t, p) => t + personMW(p.name), 0);
  const sickMW = absenceMW(ctx, {
    type: "Sick", from: sprintStart(ctx, num), to: sprintEnd(ctx, num),
  }).mw;

  const squadRow = (name: string) => ({
    net: squadNetMW(ctx, name),
    committed: squadCommittedMW(ctx, name),
  });
  const util = (row: { net: number; committed: number }) =>
    (row.net === 0 ? 0 : row.committed / row.net);

  // ---- the snap row: a chip scrolls one squad's group row to the top of the grid ----
  const scroller = useRef<HTMLDivElement>(null);
  const groupNodes = useRef(new Map<string, HTMLDivElement>());
  const personNodes = useRef(new Map<string, HTMLDivElement>());
  const [snapped, setSnapped] = useState("");
  const snapAt = useRef(0);

  const snapTo = (name: string) => {
    setSnapped(name);
    snapAt.current = Date.now();
    const behavior = scrollBehaviour();
    if (!name) scroller.current?.scrollTo?.({ top: 0, behavior });
    else groupNodes.current.get(name)?.scrollIntoView?.({ block: "start", behavior });
  };

  /** A scroll the reader drove themselves drops the chip; the snap's own scroll does not. */
  const onScroll = () => {
    if (Date.now() - snapAt.current > 600) setSnapped("");
  };

  // ---- Sprints asking for a sprint and a squad: step to it, then snap the squad to the top ----
  const stepped = useRef(0);
  useEffect(() => {
    if (!step || step.at === stepped.current) return;
    stepped.current = step.at;
    setSprint(Math.min(ctx.lastSprint, Math.max(ctx.firstSprint, step.sprint)));
    snapTo(step.squad);
    // the ask itself is the dependency; the rest is read as it stands when one arrives
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ---- the grid's own focus: one cell in the tab order, the arrows move it ----
  const [focus, setFocus] = useState<[number, number]>([0, 0]);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const at = (r: number, c: number) => `${r}:${c}`;
  const move = (r: number, c: number) => {
    const rr = Math.max(0, Math.min(rows.length - 1, r));
    const cc = Math.max(0, Math.min(days.length - 1, c));
    setFocus([rr, cc]);
    buttons.current.get(at(rr, cc))?.focus();
  };

  /** The first row of the squad before or after the one the caret sits in. */
  const squadStep = (r: number, step: 1 | -1) => {
    const starts = groups.map((g) => rows.indexOf(g.members[0]));
    const here = Math.max(0, starts.filter((s) => s <= r).length - 1);
    return starts[Math.max(0, Math.min(starts.length - 1, here + step))];
  };

  const onKeyDown = (e: KeyboardEvent, r: number, c: number) => {
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

  // ---- the cell editor ----
  const [edit, setEdit] = useState<{ person: string; row: number; col: number } | null>(null);

  const editCell = edit ? cells.get(edit.person)?.[edit.col] ?? null : null;

  const subject: EditSubject | null = edit && editCell ? {
    person: edit.person,
    from: days[edit.col],
    until: days[edit.col],
    when: dayLabel(days[edit.col]),
    state: editCell.state,
    clear: editCell.clear,
    auto: editCell.auto,
  } : null;

  const openEditor = (person: string, row: number, col: number) => setEdit({ person, row, col });

  const closeEditor = () => setEdit(null);

  // ---- Gaps asking for a person and a week: step to that sprint, then open the cell ----
  const took = useRef(0);
  useEffect(() => {
    if (!jump || jump.at === took.current) return;
    const want = Math.min(ctx.lastSprint, Math.max(ctx.firstSprint, sprintOf(ctx, jump.mon)));
    if (want !== num) {
      setSprint(want);
      return;
    }
    took.current = jump.at;
    const row = rows.findIndex((p) => p.name === jump.person);
    if (row < 0) return;
    const found = days.findIndex((d) => d >= jump.mon && d <= addDays(jump.mon, 4));
    const col = found < 0 ? 0 : found;
    setFocus([row, col]);
    personNodes.current.get(jump.person)?.scrollIntoView?.({
      block: "center", behavior: scrollBehaviour(),
    });
    openEditor(jump.person, row, col);
    // the ask itself is the dependency; the rest is read as it stands when one arrives
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jump, num, days, rows]);

  const style = { "--wp-sp-days": days.length } as CSSProperties;

  return (
    <>
      <div className="wp-sp-cmd">
        <div className="wp-sp-step">
          <button
            type="button"
            className="wp-icon-btn"
            aria-label="Previous sprint"
            disabled={num <= ctx.firstSprint}
            onClick={() => setSprint(num - 1)}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <Pill tone="brand">
            S{num} · {dayLabel(days[0])} to {dayLabel(days[days.length - 1])}
          </Pill>
          <button
            type="button"
            className="wp-icon-btn"
            aria-label="Next sprint"
            disabled={num >= ctx.lastSprint}
            onClick={() => setSprint(num + 1)}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
        <p className="wp-sp-figs">
          {rows.length} people · {mwText(sprintMW)} MW productive
          {" · "}{mwText(sickMW)} MW lost to sickness · {openDays} open days
        </p>
        <Legend items={LEGEND} />
      </div>

      <SquadSnap
        groups={groups.map((g) => ({ name: g.name, pct: Math.round(util(squadRow(g.name)) * 100) }))}
        active={snapped}
        onSnap={snapTo}
      />

      <div className="wp-sp-wrap wp-fill" ref={scroller} onScroll={onScroll}>
        <div className="wp-sp-grid" style={style}>
          <div className="wp-sp-row wp-sp-row--head">
            <div className="wp-sp-name wp-sp-name--head">Person</div>
            {days.map((day) => {
              const outside = day < ctx.qstart || day > ctx.qend;
              return (
                <div
                  className="wp-sp-day"
                  key={day.toISOString()}
                  title={outside ? "Outside the quarter" : undefined}
                >
                  <span className="wp-sp-day__date">
                    <span className="wp-sp-day__name">{DAY_NAMES[weekday(day)]}</span>
                    {" "}{dayLabel(day)}
                  </span>
                  {outside ? (
                    <>
                      <span className="wp-sp-day__dot" aria-hidden="true" />
                      <span className="sr-only">outside quarter</span>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>

          {groups.map((group) => {
            const row = squadRow(group.name);
            const mw = group.members.reduce((t, p) => t + personMW(p.name), 0);
            return (
              <div key={group.name}>
                <div
                  className="wp-sp-row wp-sp-row--group"
                  ref={(node) => {
                    if (node) groupNodes.current.set(group.name, node);
                    else groupNodes.current.delete(group.name);
                  }}
                >
                  <div className="wp-sp-name">
                    <span className="wp-sp-group__name">{group.name}</span>
                  </div>
                  <div className="wp-sp-group__meta">
                    <span className="wp-sp-group__figs">
                      {group.members.length} people · {mwText(mw)} MW sprint
                      {" · "}{mwText(row.committed)} / {mwText(row.net)} MW quarter
                    </span>
                  </div>
                </div>
                {group.members.map((p) => {
                  const r = rows.indexOf(p);
                  const mine = cells.get(p.name) ?? [];
                  const part = daysPerWeek(ctx, p.name) < ctx.mwDays
                    ? ` · ${daysPerWeek(ctx, p.name)} days a week`
                    : "";
                  return (
                    <div
                      className="wp-sp-row"
                      key={p.name}
                      ref={(node) => {
                        if (node) personNodes.current.set(p.name, node);
                        else personNodes.current.delete(p.name);
                      }}
                    >
                      <div className="wp-sp-name">
                        <Avatar name={p.name} />
                        <span className="wp-sp-person">
                          <span className="wp-sp-person__name">{p.name}</span>
                          <span className="wp-sp-person__line">
                            <span className="wp-sp-person__role">{p.role}{part}</span>
                            <span className="wp-sp-person__figs">
                              {" · "}SP {mwText(personMW(p.name))}
                              {" · "}{Math.round(modifier(ctx, p.name) * 100)}%
                            </span>
                          </span>
                        </span>
                      </div>
                      {mine.map((cell, c) => (
                        <button
                          key={days[c].toISOString()}
                          type="button"
                          ref={(node) => {
                            if (node) buttons.current.set(at(r, c), node);
                            else buttons.current.delete(at(r, c));
                          }}
                          className={`wp-sp-cell ${cell.className}`}
                          aria-label={`${p.name}, ${dayLabel(days[c])}: ${cell.state}`}
                          title={cell.kind === "work" ? tipText(cell) : undefined}
                          tabIndex={focus[0] === r && focus[1] === c ? 0 : -1}
                          onKeyDown={(e) => onKeyDown(e, r, c)}
                          onFocus={() => setFocus([r, c])}
                          onClick={() => openEditor(p.name, r, c)}
                        >
                          {cell.kind === "open" ? <Plus size={12} aria-hidden="true" /> : null}
                          <span className="wp-sp-cell__text">
                            {cell.text}{cell.note ? ` · ${cell.note}` : ""}
                          </span>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

      </div>

      <table className="sr-only">
        <caption>
          Sprint {num}, {dayLabel(days[0])} to {dayLabel(days[days.length - 1])}: each person against
          every working day, and what is booked on it.
          {" "}{ctx.sprintWorkingDays.get(num) ?? days.length} working days in the sprint.
        </caption>
        <thead>
          <tr>
            <th scope="col">Person</th>
            {days.map((day) => (
              <th scope="col" key={day.toISOString()}>{DAY_NAMES[weekday(day)]} {dayLabel(day)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.name}>
              <th scope="row">{p.name}, {ctx.personSquad[p.name] || UNASSIGNED}</th>
              {(cells.get(p.name) ?? []).map((cell, c) => (
                <td key={days[c].toISOString()}>{cell.state}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <CellEditor ctx={ctx} subject={subject} onClose={closeEditor} />
    </>
  );
}

/** A cell with nothing behind it: the kinds that carry no row and no work. */
function blank(kind: CellKind, text: string, state: string): DayCell {
  return {
    kind,
    className: CELL_CLASS[kind],
    text,
    state,
    note: "",
    item: "",
    squad: "",
    status: "",
    jira: "",
    clear: null,
    auto: false,
  };
}

const tipText = (cell: DayCell) =>
  [cell.item, cell.squad, cell.status, cell.jira].filter(Boolean).join(" · ");

// ---------------------------------------------------------------------------
// The cell editor, shared by the day grid and the week grid
// ---------------------------------------------------------------------------

/** One Drawer over both grids: it books work, writes an absence, or clears the row behind a cell. */
function CellEditor(
  { ctx, subject, onClose }:
  { ctx: EngineContext; subject: EditSubject | null; onClose: () => void },
) {
  const store = useDataset();
  const { data } = store;
  const [kind, setKind] = useState<EditKind>("Work");
  const [item, setItem] = useState("");
  const [until, setUntil] = useState("");
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);

  /** The person's own squad first: the work they are most likely being booked onto. */
  const itemsFor = (name: string) => {
    const squad = ctx.personSquad[name] ?? "";
    const mine = data.work.filter((w) => w.squad === squad).map((w) => w.title);
    const rest = data.work.filter((w) => w.squad !== squad).map((w) => w.title);
    return [...mine, ...rest];
  };

  /** Every open starts the fields again from what stands on the cell. */
  const opened = subject ? `${subject.person}|${toISO(subject.from)}` : "";
  useEffect(() => {
    if (!subject) return;
    setKind(subject.clear ? "Clear" : "Work");
    setItem(itemsFor(subject.person)[0] ?? "");
    setUntil(toISO(subject.until));
    setLabel("");
    setNote("");
    setErrors([]);
    setConfirming(false);
    // the cell the editor opened on is the dependency; the rest is read as it stands
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const close = () => {
    setConfirming(false);
    setErrors([]);
    onClose();
  };

  const clearCell = (whole: boolean) => {
    if (!subject || !subject.clear) {
      setErrors([subject?.auto
        ? "That booking comes from the work item's assignee list. Change it on Plan."
        : "There is nothing booked on that day."]);
      return;
    }
    const { from, to, index } = subject.clear;
    if (from !== to && !whole) {
      setConfirming(true);
      return;
    }
    if (subject.clear.kind === "absence") store.removeAbsence(index);
    else store.removeAssignment(index);
    close();
  };

  const apply = () => {
    if (!subject) return;
    const from = toISO(subject.from);
    if (kind === "Clear") {
      clearCell(false);
      return;
    }
    if (kind === "Work") {
      const assignment: Assignment = {
        person: subject.person, item, type: "Booked", from, to: until, label,
      };
      const found = validateAssignment(data, assignment);
      setErrors(found);
      if (found.length > 0) return;
      store.addAssignment(assignment);
    } else {
      const absence: Absence = {
        person: subject.person,
        type: kind === "Training" ? "Training" : "Leave",
        from,
        to: until,
        note,
      };
      const found = validateAbsence(data, absence);
      setErrors(found);
      if (found.length > 0) return;
      store.addAbsence(absence);
    }
    close();
  };

  return (
    <>
      <Drawer
        open={subject !== null}
        title={subject ? `${subject.person} · ${subject.when}` : ""}
        onClose={close}
        footer={(
          <>
            <button type="button" onClick={close}>Cancel</button>
            <button type="button" className="wp-btn-primary" onClick={apply}>Apply</button>
          </>
        )}
      >
        {errors.length > 0 ? (
          <div className="wp-errors" role="alert">
            <p>That did not save:</p>
            <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        ) : null}

        <p className="wp-muted">{subject ? subject.state : ""}</p>

        <Field label="Kind">
          {(p) => (
            <select {...p} value={kind} onChange={(e) => setKind(e.target.value as EditKind)}>
              {EDIT_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          )}
        </Field>

        {kind === "Work" ? (
          <>
            <Field label="Work item">
              {(p) => (
                <select {...p} value={item} onChange={(e) => setItem(e.target.value)}>
                  {subject
                    ? itemsFor(subject.person).map((t) => <option key={t} value={t}>{t}</option>)
                    : null}
                </select>
              )}
            </Field>
            <Field label="To" hint="The last day of the booking. The same day books one day.">
              {(p) => (
                <input {...p} type="date" value={until} onChange={(e) => setUntil(e.target.value)} />
              )}
            </Field>
            <Field label="Label">
              {(p) => <input {...p} value={label} onChange={(e) => setLabel(e.target.value)} />}
            </Field>
          </>
        ) : null}

        {kind === "Leave" || kind === "Training" ? (
          <>
            <Field label="To" hint="The last day of the absence. The same day books one day.">
              {(p) => (
                <input {...p} type="date" value={until} onChange={(e) => setUntil(e.target.value)} />
              )}
            </Field>
            <Field label="Note">
              {(p) => <input {...p} value={note} onChange={(e) => setNote(e.target.value)} />}
            </Field>
          </>
        ) : null}

        {kind === "Clear" ? (
          <p>
            {subject && subject.clear
              ? `Apply removes ${subject.clear.what}, booked ${subject.clear.from} to ${subject.clear.to}.`
              : "There is nothing on that day Waypoint can remove."}
          </p>
        ) : null}
      </Drawer>

      <ConfirmDialog
        open={confirming}
        title="Remove the whole booking?"
        body={subject && subject.clear
          ? `${subject.clear.what} runs from ${subject.clear.from} to ${subject.clear.to}. `
            + "Waypoint removes the whole of it, not the one day."
          : ""}
        onConfirm={() => clearCell(true)}
        onCancel={() => setConfirming(false)}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Quarter: the same grid, a column per week of the quarter
// ---------------------------------------------------------------------------

interface WeekCell {
  kind: CellKind;
  /** The cell class, which delivery status can move off wp-cell-work. */
  className: string;
  /** What the cell shows on the left. */
  text: string;
  /** The days the week books, at the right. */
  days: string;
  /** What a reader hears after the person and the week. */
  state: string;
  /** Every figure behind the cell, for the pointer. */
  tip: string;
  assigned: number;
  leave: number;
  free: number;
  clear: ClearRef | null;
  /** A booking Work wrote from the assignee list: there is no row on Assignments to remove. */
  auto: boolean;
}

function QuarterGrid({ ctx }: { ctx: EngineContext }) {
  const { data } = useDataset();
  const statuses = useMemo(() => deliveryStatuses(ctx), [ctx]);
  const people = useMemo(() => plannedPeople(ctx), [ctx]);
  const weeks = useMemo(() => quarterWeeks(ctx), [ctx]);
  const groups = useMemo(() => squadGroups(ctx, people), [ctx, people]);
  const rows = useMemo(() => groups.flatMap((g) => g.members), [groups]);

  /** One typed cell per person per week, off the engine's own days for that week. */
  const cells = useMemo(() => {
    const byPerson = new Map<string, Booking[]>();
    for (const b of bookingsOf(ctx)) {
      const list = byPerson.get(b.person);
      if (list) list.push(b);
      else byPerson.set(b.person, [b]);
    }
    const absences = data.absences.map((a, index) => ({ ...a, index }));
    const out = new Map<string, WeekCell[]>();
    for (const p of people) {
      const mine = byPerson.get(p.name) ?? [];
      const theirs = absences.filter((a) => a.person === p.name);
      const region = ctx.personRegion[p.name] ?? "England";
      out.set(p.name, weeks.map((mon): WeekCell => {
        const fri = addDays(mon, 4);
        const wd = weekDays(ctx, p.name, mon);
        const bh = bankHolidayCount(ctx, region, mon, fri);
        const off = theirs.filter((a) => parseDate(a.from) <= fri && parseDate(a.to) >= mon);
        const head = `${p.name} · ${weekLabel(mon)}`;
        const tail = [
          wd.leave > 0 ? `Leave · ${dayText(wd.leave)}d` : "",
          bh > 0 ? `Bank holiday · ${bh}d` : "",
          `Free · ${dayText(wd.free)}d`,
        ].filter(Boolean);
        const first = off[0];
        const clearOff: ClearRef | null = first
          ? {
            kind: "absence", index: first.index, from: first.from, to: first.to, what: first.type,
          }
          : null;

        // a week given over wholly to bank holidays or to leave
        if (bh + wd.leave >= ctx.mwDays) {
          const kind: CellKind = !first
            ? "bankhol"
            : (first.type === "Training" ? "training" : "leave");
          const what = first ? (isSickness(first.type) ? "Sick" : first.type) : "Bank holiday";
          return {
            kind,
            className: CELL_CLASS[kind],
            text: what,
            days: `${dayText(bh + wd.leave)}d`,
            state: `${what} all week`,
            tip: [head, ...tail].join("\n"),
            assigned: 0,
            leave: wd.leave,
            free: wd.free,
            clear: clearOff,
            auto: false,
          };
        }

        const booked = mine
          .map((b) => ({ booking: b, days: overlapWeek(b.from, b.to, mon) }))
          .filter((x) => x.days > 0)
          .sort((a, b) => b.days - a.days);
        const leaveSuffix = wd.leave > 0 ? ` · ${dayText(wd.leave)}d leave` : "";

        if (wd.assigned > 0 && booked.length > 0) {
          const primary = booked[0].booking;
          const status = statuses.get(primary.item) ?? "";
          const note = status === "Late" || status.startsWith("At risk") ? status : "";
          const more = booked.length - 1;
          let className = CELL_CLASS.work;
          if (status === "Late") className = "wp-cell-blocked";
          else if (status.startsWith("At risk")) className = "wp-cell-atrisk";
          return {
            kind: "work",
            className,
            text: `${primary.label}${more > 0 ? ` +${more}` : ""}${leaveSuffix}`,
            days: `${dayText(wd.assigned)}d`,
            state: [
              note ? `${primary.item}, ${status}` : primary.item,
              `${dayText(wd.assigned)} days booked`,
              more > 0 ? `${more} more booked that week` : "",
              wd.leave > 0 ? `${dayText(wd.leave)} days leave` : "",
              `${dayText(wd.free)} days free`,
            ].filter(Boolean).join(", "),
            tip: [
              head,
              ...booked.map((x) => `${x.booking.item} · ${dayText(x.days)}d`),
              more > 0 ? `Booked · ${dayText(bookedDays(ctx, p.name, mon))}d in all` : "",
              ...tail,
            ].filter(Boolean).join("\n"),
            assigned: wd.assigned,
            leave: wd.leave,
            free: wd.free,
            clear: primary.index < 0 ? null : {
              kind: "assignment",
              index: primary.index,
              from: toISO(primary.from),
              to: toISO(primary.to),
              what: primary.item,
            },
            auto: primary.index < 0,
          };
        }

        return {
          kind: "open",
          className: CELL_CLASS.open,
          text: `${dayText(wd.free)}d open${leaveSuffix}`,
          days: "",
          state: `${dayText(wd.free)} days open`
            + (wd.leave > 0 ? `, ${dayText(wd.leave)} days leave` : ""),
          tip: [head, ...tail].join("\n"),
          assigned: 0,
          leave: wd.leave,
          free: wd.free,
          clear: clearOff,
          auto: false,
        };
      }));
    }
    return out;
  }, [ctx, data.absences, people, statuses, weeks]);

  const nowWeek = weeks.findIndex((mon) => ctx.today >= mon && ctx.today <= addDays(mon, 6));

  const squadRow = (name: string) => ({
    net: squadNetMW(ctx, name),
    committed: squadCommittedMW(ctx, name),
  });
  const util = (row: { net: number; committed: number }) =>
    (row.net === 0 ? 0 : row.committed / row.net);

  /** The share of the days a person has this quarter that something is already booked on. */
  const bookedPct = (name: string) => {
    const mine = cells.get(name) ?? [];
    const assigned = mine.reduce((t, c) => t + c.assigned, 0);
    const avail = assigned + mine.reduce((t, c) => t + c.free, 0);
    return avail === 0 ? 0 : Math.round((assigned / avail) * 100);
  };

  const netTotal = rows.reduce((t, p) => t + netMW(ctx, p.name), 0);
  const committedTotal = groups.reduce((t, g) => t + squadCommittedMW(ctx, g.name), 0);
  const freeDays = rows.reduce(
    (t, p) => t + (cells.get(p.name) ?? []).reduce((n, c) => n + c.free, 0),
    0,
  );

  // ---- the snap row: a chip scrolls one squad's group row to the top of the grid ----
  const scroller = useRef<HTMLDivElement>(null);
  const groupNodes = useRef(new Map<string, HTMLDivElement>());
  const [snapped, setSnapped] = useState("");
  const snapAt = useRef(0);

  const snapTo = (name: string) => {
    setSnapped(name);
    snapAt.current = Date.now();
    const behavior = scrollBehaviour();
    if (!name) scroller.current?.scrollTo?.({ top: 0, behavior });
    else groupNodes.current.get(name)?.scrollIntoView?.({ block: "start", behavior });
  };

  /** A scroll the reader drove themselves drops the chip; the snap's own scroll does not. */
  const onScroll = () => {
    if (Date.now() - snapAt.current > 600) setSnapped("");
  };

  // ---- the grid's own focus: one cell in the tab order, the arrows move it ----
  const [focus, setFocus] = useState<[number, number]>([0, 0]);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const at = (r: number, c: number) => `${r}:${c}`;
  const move = (r: number, c: number) => {
    const rr = Math.max(0, Math.min(rows.length - 1, r));
    const cc = Math.max(0, Math.min(weeks.length - 1, c));
    setFocus([rr, cc]);
    buttons.current.get(at(rr, cc))?.focus();
  };

  /** The first row of the squad before or after the one the caret sits in. */
  const squadStep = (r: number, step: 1 | -1) => {
    const starts = groups.map((g) => rows.indexOf(g.members[0]));
    const here = Math.max(0, starts.filter((s) => s <= r).length - 1);
    return starts[Math.max(0, Math.min(starts.length - 1, here + step))];
  };

  const onKeyDown = (e: KeyboardEvent, r: number, c: number) => {
    const moves: Record<string, [number, number]> = {
      ArrowRight: [r, c + 1],
      ArrowLeft: [r, c - 1],
      ArrowDown: [r + 1, c],
      ArrowUp: [r - 1, c],
      Home: [r, 0],
      End: [r, weeks.length - 1],
      PageDown: [squadStep(r, 1), c],
      PageUp: [squadStep(r, -1), c],
    };
    const next = moves[e.key];
    if (!next) return;
    e.preventDefault();
    move(next[0], next[1]);
  };

  // ---- the cell editor, opened on the week's Monday and out to its Friday ----
  const [edit, setEdit] = useState<{ person: string; col: number } | null>(null);
  const editCell = edit ? cells.get(edit.person)?.[edit.col] ?? null : null;

  const subject: EditSubject | null = edit && editCell ? {
    person: edit.person,
    from: weeks[edit.col],
    until: addDays(weeks[edit.col], 4),
    when: weekLabel(weeks[edit.col]),
    state: editCell.state,
    clear: editCell.clear,
    auto: editCell.auto,
  } : null;

  const style = { "--wp-sp-days": weeks.length } as CSSProperties;

  return (
    <>
      <div className="wp-sp-cmd">
        <Pill tone="brand">
          {data.settings.quarter} · {weekLabel(weeks[0])} to {weekLabel(weeks[weeks.length - 1])}
        </Pill>
        <p className="wp-sp-figs">
          {rows.length} people · {mwText(netTotal)} MW available
          {" · "}{mwText(committedTotal)} MW committed · {Math.round(freeDays)} days open
        </p>
        <Legend items={LEGEND} />
      </div>

      <SquadSnap
        groups={groups.map((g) => ({ name: g.name, pct: Math.round(util(squadRow(g.name)) * 100) }))}
        active={snapped}
        onSnap={snapTo}
      />

      <div className="wp-sp-wrap wp-fill" ref={scroller} onScroll={onScroll}>
        <div className="wp-sp-grid" style={style}>
          <div className="wp-sp-row wp-sp-row--head">
            <div className="wp-sp-name wp-sp-name--head">Person</div>
            {weeks.map((mon, k) => (
              <div
                className={`wp-sp-day wp-sp-day--week${k === nowWeek ? " wp-sp-day--now" : ""}`}
                key={mon.toISOString()}
              >
                <span className="wp-sp-day__name">S{sprintOf(ctx, mon)}</span>
                {k === nowWeek ? <span className="wp-sp-day__now">now</span> : null}
                <span className="wp-sp-day__date">{weekLabel(mon)}</span>
              </div>
            ))}
          </div>

          {groups.map((group) => {
            const row = squadRow(group.name);
            return (
              <div key={group.name}>
                <div
                  className="wp-sp-row wp-sp-row--group"
                  ref={(node) => {
                    if (node) groupNodes.current.set(group.name, node);
                    else groupNodes.current.delete(group.name);
                  }}
                >
                  <div className="wp-sp-name">
                    <span className="wp-sp-group__name">{group.name}</span>
                  </div>
                  <div className="wp-sp-group__meta">
                    <span className="wp-sp-group__figs">
                      {group.members.length} people
                      {" · "}{mwText(row.committed)} / {mwText(row.net)} MW quarter
                    </span>
                  </div>
                </div>
                {group.members.map((p) => {
                  const r = rows.indexOf(p);
                  const mine = cells.get(p.name) ?? [];
                  const part = daysPerWeek(ctx, p.name) < ctx.mwDays
                    ? ` · ${daysPerWeek(ctx, p.name)} days a week`
                    : "";
                  return (
                    <div className="wp-sp-row" key={p.name}>
                      <div className="wp-sp-name" title={p.role}>
                        <Avatar name={p.name} />
                        <span className="wp-sp-person">
                          <span className="wp-sp-person__name">{p.name}</span>
                          <span className="wp-sp-person__line">
                            <span className="wp-sp-person__figs">
                              Q {mwText(netMW(ctx, p.name))} MW
                              {" · "}{bookedPct(p.name)}% booked{part}
                            </span>
                          </span>
                        </span>
                      </div>
                      {mine.map((cell, c) => (
                        <button
                          key={weeks[c].toISOString()}
                          type="button"
                          ref={(node) => {
                            if (node) buttons.current.set(at(r, c), node);
                            else buttons.current.delete(at(r, c));
                          }}
                          className={`wp-sp-cell wp-sp-cell--week ${cell.className}`}
                          aria-label={`${p.name}, ${weekLabel(weeks[c])}: ${cell.state}`}
                          title={cell.tip}
                          tabIndex={focus[0] === r && focus[1] === c ? 0 : -1}
                          onKeyDown={(e) => onKeyDown(e, r, c)}
                          onFocus={() => setFocus([r, c])}
                          onClick={() => setEdit({ person: p.name, col: c })}
                        >
                          <span className="wp-sp-cell__text">{cell.text}</span>
                          {cell.days ? (
                            <span className="wp-sp-cell__days">{cell.days}</span>
                          ) : null}
                          {cell.kind === "work" ? (
                            <span className="wp-sp-cell__bar" aria-hidden="true">
                              <span
                                className="wp-sp-cell__fill"
                                style={{
                                  width: `${Math.round(
                                    (cell.assigned / (cell.assigned + cell.free)) * 100,
                                  )}%`,
                                }}
                              />
                            </span>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <table className="sr-only">
        <caption>
          The quarter week by week: each person against the {weeks.length} weeks of
          {" "}{data.settings.quarter}, what is booked in each and how many days it leaves free.
        </caption>
        <thead>
          <tr>
            <th scope="col">Person</th>
            {weeks.map((mon, k) => (
              <th scope="col" key={mon.toISOString()}>
                S{sprintOf(ctx, mon)}, {weekLabel(mon)}{k === nowWeek ? ", now" : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.name}>
              <th scope="row">{p.name}, {ctx.personSquad[p.name] || UNASSIGNED}</th>
              {(cells.get(p.name) ?? []).map((cell, c) => (
                <td key={weeks[c].toISOString()}>{cell.state}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <CellEditor ctx={ctx} subject={subject} onClose={() => setEdit(null)} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sprints: the workbook's Sprint plan, a squad per row and a sprint per column
// ---------------------------------------------------------------------------

/** Where a cell stands against its own capacity, in a word as well as a bar. */
function loadWord(util: number): string {
  if (util > 1) return "over";
  return util >= 0.85 ? "hot" : "within";
}

function SprintPlanGrid(
  { ctx, onOpen }: { ctx: EngineContext; onOpen: (sprint: number, squad: string) => void },
) {
  const plan = useMemo(() => sprintPlan(ctx), [ctx]);
  const [unit, setUnit] = useState<Unit>("MW");

  const now = Math.min(ctx.lastSprint, Math.max(ctx.firstSprint, ctx.currentSprint));

  // ---- the snap row, the same chips the other grids carry ----
  const scroller = useRef<HTMLDivElement>(null);
  const rowNodes = useRef(new Map<string, HTMLDivElement>());
  const [snapped, setSnapped] = useState("");
  const snapAt = useRef(0);

  const snapTo = (name: string) => {
    setSnapped(name);
    snapAt.current = Date.now();
    const behavior = scrollBehaviour();
    if (!name) scroller.current?.scrollTo?.({ top: 0, behavior });
    else rowNodes.current.get(name)?.scrollIntoView?.({ block: "start", behavior });
  };

  const onScroll = () => {
    if (Date.now() - snapAt.current > 600) setSnapped("");
  };

  const pct = (cell: SprintPlanCell) => `${Math.round(cell.utilisation * 100)}%`;
  const mwPair = (cell: SprintPlanCell) => `${mwText(cell.committed)} / ${mwText(cell.available)}`;
  const lead = (cell: SprintPlanCell) => (unit === "MW" ? mwPair(cell) : pct(cell));
  const trail = (cell: SprintPlanCell) => (unit === "MW" ? pct(cell) : `${mwPair(cell)}`);

  /** What a reader hears, and what the title says: every figure behind the cell. */
  const cellText = (cell: SprintPlanCell) =>
    `${mwText(cell.committed)} committed of ${mwText(cell.available)} MW available, `
    + `${mwText(cell.reserved)} reserved, ${mwText(cell.remaining)} remaining, `
    + `${pct(cell)} used, ${loadWord(cell.utilisation)} capacity`;

  const body = (cell: SprintPlanCell) => (
    <>
      <span className="wp-spp-cell__lead">{lead(cell)}</span>
      <span className="wp-spp-cell__bar" aria-hidden="true">
        <span
          className={`wp-spp-cell__fill wp-spp-cell__fill--${loadWord(cell.utilisation)}`}
          style={{ width: `${Math.min(100, Math.round(cell.utilisation * 100))}%` }}
        />
      </span>
      <span className="wp-spp-cell__trail">{trail(cell)}</span>
    </>
  );

  const style = { "--wp-spp-cols": plan.sprints.length } as CSSProperties;

  return (
    <>
      <div className="wp-sp-cmd">
        <Pill tone="brand">
          {ctx.data.settings.quarter} · {plan.sprints[0].label} to
          {" "}{plan.sprints[plan.sprints.length - 1].label}
        </Pill>
        <p className="wp-sp-figs">
          {mwText(plan.grand.committed)} committed of {mwText(plan.grand.available)} MW
          {" · "}{mwText(plan.grand.reserved)} reserved · {mwText(plan.grand.remaining)} remaining
        </p>
        <div className="wp-tabs wp-spp-unit" role="group" aria-label="Show">
          {UNITS.map((u) => (
            <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)}>
              {u}
            </button>
          ))}
        </div>
      </div>

      <SquadSnap
        groups={plan.squads.map((s) => ({
          name: s.name,
          pct: Math.round(s.totals.utilisation * 100),
        }))}
        active={snapped}
        onSnap={snapTo}
      />

      <div className="wp-spp-wrap wp-fill" ref={scroller} onScroll={onScroll}>
        <div className="wp-spp-grid" style={style}>
          <div className="wp-spp-row wp-spp-row--head">
            <div className="wp-spp-name wp-spp-name--head">Squad</div>
            {plan.sprints.map((s) => (
              <div className={`wp-spp-head${s.num === now ? " wp-spp-head--now" : ""}`} key={s.num}>
                <span className="wp-spp-head__label">{s.label}</span>
                <span className="wp-spp-head__date">{dayLabel(s.from)} · {s.workingDays}d</span>
                {s.num === now ? <span className="wp-spp-head__now">now</span> : null}
              </div>
            ))}
            <div className="wp-spp-head wp-spp-head--total">
              <span className="wp-spp-head__label">Quarter</span>
              <span className="wp-spp-head__date">{plan.sprints.length} sprints</span>
            </div>
          </div>

          {plan.squads.map((squad) => (
            <div
              className="wp-spp-row"
              key={squad.name}
              ref={(node) => {
                if (node) rowNodes.current.set(squad.name, node);
                else rowNodes.current.delete(squad.name);
              }}
            >
              <div className="wp-spp-name">{squad.name}</div>
              {squad.cells.map((cell, k) => (
                <button
                  key={plan.sprints[k].num}
                  type="button"
                  className={`wp-spp-cell${plan.sprints[k].num === now ? " wp-spp-cell--now" : ""}`}
                  title={cellText(cell)}
                  aria-label={`${squad.name}, ${plan.sprints[k].label}: ${cellText(cell)}`}
                  onClick={() => onOpen(plan.sprints[k].num, squad.name)}
                >
                  {body(cell)}
                </button>
              ))}
              <div className="wp-spp-cell wp-spp-cell--total">{body(squad.totals)}</div>
            </div>
          ))}

          <div className="wp-spp-row wp-spp-row--total">
            <div className="wp-spp-name">All squads</div>
            {plan.totals.map((cell, k) => (
              <button
                key={plan.sprints[k].num}
                type="button"
                className={`wp-spp-cell${plan.sprints[k].num === now ? " wp-spp-cell--now" : ""}`}
                title={cellText(cell)}
                aria-label={`All squads, ${plan.sprints[k].label}: ${cellText(cell)}`}
                onClick={() => onOpen(plan.sprints[k].num, "")}
              >
                {body(cell)}
              </button>
            ))}
            <div className="wp-spp-cell wp-spp-cell--total">{body(plan.grand)}</div>
          </div>
        </div>
      </div>

      <table className="sr-only">
        <caption>
          The sprint plan for {ctx.data.settings.quarter}: each squad against every sprint, with what
          it has available, what is committed, what is still reserved and what remains. Capacity takes
          the share of the quarter's working days the sprint holds; an item's member weeks are spread
          evenly across the sprints it spans.
        </caption>
        <thead>
          <tr>
            <th scope="col">Squad</th>
            {plan.sprints.map((s) => (
              <th scope="col" key={s.num}>
                {s.label}, {dayLabel(s.from)} to {dayLabel(s.to)}{s.num === now ? ", now" : ""}
              </th>
            ))}
            <th scope="col">Quarter</th>
          </tr>
        </thead>
        <tbody>
          {plan.squads.map((squad) => (
            <tr key={squad.name}>
              <th scope="row">{squad.name}</th>
              {squad.cells.map((cell, k) => (
                <td key={plan.sprints[k].num}>{cellText(cell)}</td>
              ))}
              <td>{cellText(squad.totals)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">All squads</th>
            {plan.totals.map((cell, k) => (
              <td key={plan.sprints[k].num}>{cellText(cell)}</td>
            ))}
            <td>{cellText(plan.grand)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

// ---------------------------------------------------------------------------
// Gaps: the free days, by skill and by person
// ---------------------------------------------------------------------------

/** Three steps of tint, so a week with nothing free never reads like a week with plenty. */
function tintStep(free: number, most: number): number {
  if (free < 0.5) return 0;
  if (most <= 0) return 1;
  if (free >= (most * 2) / 3) return 3;
  return free >= most / 3 ? 2 : 1;
}

function GapsView({ ctx, onBook }: { ctx: EngineContext; onBook: (person: string, mon: Date) => void }) {
  const people = useMemo(() => plannedPeople(ctx), [ctx]);
  const weeks = useMemo(() => quarterWeeks(ctx), [ctx]);

  /** The engine's own free days: one row per person, one column per week of the quarter. */
  const free = useMemo(() => {
    const out = new Map<string, number[]>();
    for (const p of people) out.set(p.name, weeks.map((mon) => weekDays(ctx, p.name, mon).free));
    return out;
  }, [ctx, people, weeks]);

  const skills = useMemo(() => {
    const names: string[] = [];
    for (const p of people) for (const s of p.skills) if (s && !names.includes(s)) names.push(s);
    names.sort((a, b) => a.localeCompare(b, "en-GB"));
    return names;
  }, [people]);

  const [skill, setSkill] = useState("");
  const [need, setNeed] = useState(GAP_DAYS);
  const [pick, setPick] = useState<{ skill: string; week: number } | null>(null);

  const matrix = useMemo(() => skills
    .filter((s) => !skill || s === skill)
    .map((s) => {
      const held = people.filter((p) => p.skills.includes(s));
      return {
        skill: s,
        held,
        perWeek: weeks.map((_, k) => held.reduce((t, p) => t + (free.get(p.name)?.[k] ?? 0), 0)),
      };
    }), [skills, skill, people, weeks, free]);

  const most = matrix.reduce((m, row) => Math.max(m, ...row.perWeek), 0);

  /** The next week that person has the days asked for, and how long the run holds. */
  const windows = useMemo(() => people.map((p) => {
    const mine = free.get(p.name) ?? [];
    const week = mine.findIndex((f) => Math.round(f) >= need);
    let run = 0;
    if (week >= 0) {
      while (week + run < mine.length && Math.round(mine[week + run]) >= need) run += 1;
    }
    return { person: p.name, skill: p.skills[0] ?? "", week, run };
  }), [people, free, need]);

  const picked = pick
    ? (matrix.find((row) => row.skill === pick.skill)?.held ?? [])
      .map((p) => ({ name: p.name, days: free.get(p.name)?.[pick.week] ?? 0 }))
      .filter((p) => p.days >= 0.5)
      .sort((a, b) => b.days - a.days)
    : [];

  return (
    <div className="wp-gap-panels wp-fill">
      <section className="wp-gap-panel" aria-labelledby="wp-gap-skills">
        <div className="wp-gap-panel__head">
          <h2 className="wp-h2" id="wp-gap-skills">Free days by skill</h2>
          <Field label="Skill">
            {(p) => (
              <select
                {...p}
                value={skill}
                onChange={(e) => { setSkill(e.target.value); setPick(null); }}
              >
                <option value="">All skills</option>
                {skills.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            )}
          </Field>
        </div>
        <div className="wp-gap-panel__body">
          <div className="wp-gap-scroll wp-fill">
            <table className="wp-table wp-gap-matrix">
              <caption>
                Free days across the team in each week of {ctx.data.settings.quarter}, by skill. Each
                cell says the days it counts and is tinted by them. Open one for the people behind it.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Skill</th>
                  {weeks.map((mon) => <th key={mon.toISOString()} scope="col">{dayLabel(mon)}</th>)}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.skill}>
                    <th scope="row">{row.skill}</th>
                    {row.perWeek.map((days, k) => {
                      const on = pick?.skill === row.skill && pick.week === k;
                      return (
                        <td key={weeks[k].toISOString()} className="wp-gap-cell">
                          <button
                            type="button"
                            className={`wp-gap-cell__btn wp-gap-cell__btn--${tintStep(days, most)}`}
                            aria-pressed={on}
                            onClick={() => setPick(on ? null : { skill: row.skill, week: k })}
                          >
                            {Math.round(days)}
                            <span className="sr-only">
                              {" "}days free, {row.skill}, week of {dayLabel(weeks[k])}
                            </span>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pick ? (
            <div className="wp-gap-who">
              <div className="wp-gap-who__head">
                <p className="wp-gap-who__title">
                  Who is free: {pick.skill}, week of {dayLabel(weeks[pick.week])}
                </p>
                <button type="button" className="wp-row-btn" onClick={() => setPick(null)}>
                  Close
                  <span className="sr-only"> who is free</span>
                </button>
              </div>
              <ul className="wp-gap-who__list">
                {picked.length === 0 ? (
                  <li className="wp-muted">Nobody in that skill is free that week.</li>
                ) : null}
                {picked.map((p) => (
                  <li key={p.name}>
                    {p.name} · {p.days.toFixed(1)} days
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="wp-gap-panel" aria-labelledby="wp-gap-windows">
        <div className="wp-gap-panel__head">
          <h2 className="wp-h2" id="wp-gap-windows">Next free window</h2>
          <Field label="Free days wanted">
            {(p) => (
              <select {...p} value={need} onChange={(e) => setNeed(Number(e.target.value))}>
                {GAP_CHOICES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            )}
          </Field>
        </div>
        <div className="wp-gap-panel__body">
          <div className="wp-gap-scroll wp-fill">
            <table className="wp-table wp-gap-windows">
              <caption>
                The next week each person has {need} free {need === 1 ? "day" : "days"} or more, and how
                long that run holds. Book opens that week in the sprint grid.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Person</th>
                  <th scope="col">Skill</th>
                  <th scope="col">Week of</th>
                  <th scope="col">Run (weeks)</th>
                  <th scope="col"><span className="sr-only">Book the week</span></th>
                </tr>
              </thead>
              <tbody>
                {windows.map((row) => (
                  <tr key={row.person}>
                    <th scope="row">{row.person}</th>
                    <td>{row.skill || "—"}</td>
                    <td>{row.week < 0 ? "none this quarter" : dayLabel(weeks[row.week])}</td>
                    <td className="wp-num">{row.week < 0 ? "—" : row.run}</td>
                    <td>
                      {row.week < 0 ? null : (
                        <button
                          type="button"
                          className="wp-row-btn"
                          onClick={() => onBook(row.person, weeks[row.week])}
                        >
                          Book
                          <span className="sr-only">
                            {" "}{row.person}, week of {dayLabel(weeks[row.week])}
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
