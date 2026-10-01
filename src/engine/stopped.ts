// Stop: a stopped item leaves every capacity figure from the day it stopped, keeping its assignments
// as history. Section 9 of power/design-work-flow.md.
import type { Dataset, WorkItem } from "../model/types";
import type { Span } from "./context";
import { addDays, parseDate } from "./dates";

/** Stopped is a phase, not a state: the state the item was stopped in is left as it stood. */
export function isStopped(item: WorkItem | undefined): boolean {
  return item?.phase === "Stopped";
}

/**
 * The day the item stopped: the stamped date where a row carries one, else the date of the last
 * activity written against it, because the model has no stopped-on column. Null where the item is not
 * stopped, and null where it is stopped with nothing to date it by, which stops it from the start.
 */
export function stoppedOn(data: Dataset, item: WorkItem): Date | null {
  if (!isStopped(item)) return null;
  if (item.stoppedOn) return parseDate(item.stoppedOn);
  const named = (data.log ?? []).filter((e) => e.summary.endsWith(`: ${item.title}`));
  const last = named[named.length - 1];
  return last ? parseDate(last.at) : null;
}

/**
 * The part of a booking that still consumes capacity: the whole span for a live item, the days before
 * the stop date for a stopped one, and nothing at all where none are left. The booking itself is never
 * removed; it just stops being charged.
 */
export function consumingSpan(data: Dataset, item: WorkItem | undefined, span: Span): Span | null {
  if (!item || !isStopped(item)) return span;
  const stop = stoppedOn(data, item);
  if (!stop) return null;
  const last = addDays(stop, -1);
  if (last < span[0]) return null;
  return last < span[1] ? [span[0], last] : span;
}
