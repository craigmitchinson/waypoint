// Reservations: capacity held before the work is known, and what real work has drawn it down.
// Ported from wp_model.py (res_drawn and the reservation rows).
import type { Reservation } from "../model/types";
import type { EngineContext } from "./context";
import { netFactor, netMW, squadNetMW } from "./capacity";
import { networkdays, parseDate } from "./dates";
import { counts, workMW } from "./work";

const SPIKE_CATEGORIES = ["Discovery", "Spikes"];
const SHAPING = "Shaping and refinement";

/** One category maps onto one kind of real work, and only in the quarter the reservation names. */
export function reservationDrawn(
  ctx: EngineContext, squad: string, quarter: string, category: string,
): number {
  if (quarter !== ctx.data.settings.quarter) return 0;
  const anySquad = squad === "Team";
  let kinds: string[];
  let phases: string[] | null = null;
  if (SPIKE_CATEGORIES.includes(category)) {
    kinds = ["Spike"];
  } else if (category === SHAPING) {
    kinds = ["Component"];
    phases = ["Shaping", "Assessment"];
  } else {
    // an assignment draws down the net member weeks the person really has, not the gross booking
    let total = 0;
    for (const a of ctx.data.assignments) {
      if (a.type !== category) continue;
      // an assignment row can outlive the person it names; it draws nothing down
      if (!(a.person in ctx.personSquad)) continue;
      if (!anySquad && ctx.personSquad[a.person] !== squad) continue;
      const from = parseDate(a.from);
      const to = parseDate(a.to);
      const lo = from > ctx.qstart ? from : ctx.qstart;
      const hi = to < ctx.qend ? to : ctx.qend;
      total += (Math.max(0, networkdays(lo, hi)) / 5) * netFactor(ctx, a.person);
    }
    return total;
  }
  // only counted work draws a reservation down: proposed, deferred, cancelled and delivered work does not
  let total = 0;
  for (const w of ctx.data.work) {
    if (!anySquad && w.squad !== squad) continue;
    if (!kinds.includes(w.kind)) continue;
    if (phases && !phases.includes(w.phase)) continue;
    if (counts(ctx, w)) total += workMW(ctx, w);
  }
  return total;
}

export interface ReservationRow extends Reservation {
  drawn: number;
  remaining: number;
}

export function reservationRows(ctx: EngineContext): ReservationRow[] {
  return ctx.data.reservations.map((r) => {
    const drawn = reservationDrawn(ctx, r.squad, r.quarter, r.category);
    // a Team row for the same quarter and category already holds that capacity, so the squad row holds nothing
    const covered = r.squad !== "Team" && ctx.data.reservations.some(
      (o) => o.squad === "Team" && o.quarter === r.quarter && o.category === r.category,
    );
    return { ...r, drawn, remaining: covered ? 0 : Math.max(0, r.mw - drawn) };
  });
}

/** A squad holds its own reservations plus the share of every team reservation its net MW earns. */
export function squadReservedMW(ctx: EngineContext, squad: string, rows = reservationRows(ctx)): number {
  const quarter = ctx.data.settings.quarter;
  const teamHeld = rows
    .filter((r) => r.squad === "Team" && r.quarter === quarter)
    .reduce((t, r) => t + r.remaining, 0);
  const own = rows
    .filter((r) => r.squad === squad && r.quarter === quarter)
    .reduce((t, r) => t + r.remaining, 0);
  const allNet = ctx.data.people.reduce((t, p) => t + netMW(ctx, p.name), 0);
  return own + (allNet ? (squadNetMW(ctx, squad) / allNet) * teamHeld : 0);
}

/** What every reservation still holds this quarter. */
export function reservedTotal(ctx: EngineContext, rows = reservationRows(ctx)): number {
  return rows
    .filter((r) => r.quarter === ctx.data.settings.quarter)
    .reduce((t, r) => t + r.remaining, 0);
}
