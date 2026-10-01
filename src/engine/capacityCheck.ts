// The capacity check and the finish walk: has each assignee the days their share of an item needs,
// and which week would they finish it in. Ported from wp_model.py (_capacity).
import type { WorkItem } from "../model/types";
import type { EngineContext } from "./context";
import { itemSpan } from "./context";
import { freeFor } from "./capacity";
import { addDays, MONTHS } from "./dates";
import { workMW } from "./work";

export interface AssigneeCheck {
  name: string;
  slot: number;
  available: number;
  shortfall: number;
  finishWeek: number | "";
}

export interface CapacityCheck {
  title: string;
  endSprint: number;
  sprintFrom: number;
  sprintTo: number;
  total: number;
  outside: boolean;
  firstWeek: number;
  lastWeek: number;
  required: number;
  assignees: AssigneeCheck[];
  finishWeek: number | "";
  says: string;
  slip: number | "";
}

/**
 * Each assignee owes an even share of the item's MW this quarter. Against it goes the MW they really
 * have free across the item's weeks, and the finish week is the first week their running free capacity
 * covers their share; the item finishes on the latest of them.
 */
export function capacityCheck(ctx: EngineContext, item: WorkItem): CapacityCheck | null {
  const names: { name: string; slot: number }[] = [];
  item.assignees.forEach((n, slot) => {
    if (n && !names.some((x) => x.name === n)) names.push({ name: n, slot });
  });
  const total = workMW(ctx, item);
  const [ks, ke] = itemSpan(item);
  const effFrom = Math.max(ks, ctx.firstSprint);
  const effTo = Math.min(ke, ctx.lastSprint);
  if (!names.length || total <= 0 || effTo < effFrom) return null;

  const base = {
    title: item.title, endSprint: ke, sprintFrom: effFrom, sprintTo: effTo, total,
  };
  const start = addDays(ctx.epoch, (effFrom - 1) * ctx.sprintDays);
  const end = addDays(ctx.epoch, effTo * ctx.sprintDays - 1);
  const lastWeekMon = ctx.weeks[ctx.weeks.length - 1];
  if (end < ctx.weeks[0] || start > addDays(lastWeekMon, 4)) {
    return {
      ...base, outside: true, firstWeek: 0, lastWeek: 0, required: 0, assignees: [],
      finishWeek: "", says: "", slip: "",
    };
  }
  const first = Math.max(1, ctx.weeks.filter((m) => m <= start).length);
  const last = Math.min(ctx.weeks.length, Math.max(first, ctx.weeks.filter((m) => m <= end).length));
  const required = total / names.length;

  const assignees: AssigneeCheck[] = names.map(({ name, slot }) => {
    let available = 0;
    for (let k = first; k <= last; k += 1) available += freeFor(ctx, name, item, k);
    let cum = 0;
    let finishWeek: number | "" = "";
    for (let k = first; k <= ctx.weeks.length; k += 1) {
      cum += freeFor(ctx, name, item, k);
      if (cum >= required) {
        finishWeek = k;
        break;
      }
    }
    return { name, slot, available, shortfall: Math.max(0, required - available), finishWeek };
  });

  const finishWeek: number | "" = assignees.some((a) => a.finishWeek === "")
    ? ""
    : Math.max(...assignees.map((a) => a.finishWeek as number));
  let says = "not within the year";
  let slip: number | "" = "";
  if (finishWeek !== "") {
    const friday = addDays(ctx.weeks[finishWeek - 1], 4);
    const sprint = Math.floor((friday.getTime() - ctx.epoch.getTime()) / 86400000 / ctx.sprintDays) + 1;
    says = `S${sprint} (${friday.getUTCDate()} ${MONTHS[friday.getUTCMonth()]})`;
    slip = sprint - ke;
  }
  return {
    ...base, outside: false, firstWeek: first, lastWeek: last, required, assignees,
    finishWeek, says, slip,
  };
}
