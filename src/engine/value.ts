// Value: what a claim is worth this year and what has really been recorded against it.
// Ported from wp_model.py (_rate, _benefit_value and the Compare in-year walk).
import type { Settings, WorkItem } from "../model/types";
import type { EngineContext } from "./context";
import { MONTHS, parseDate } from "./dates";
import { counts, inPlan } from "./work";

/** The value of one released FTE: a business grade rate, or a blend's weighted average of them. */
export function gradeRate(settings: Settings, grade: string | null): number {
  if (!grade) return 0;
  const blend = settings.blends.find((b) => b.name === grade);
  if (blend) {
    const total = Object.values(blend.counts).reduce((t, c) => t + c, 0);
    if (total === 0) return 0;
    const weighted = settings.grades.reduce(
      (t, g) => t + (blend.counts[g.grade] ?? 0) * g.rate,
      0,
    );
    return weighted / total;
  }
  return settings.grades.find((g) => g.grade === grade)?.rate ?? 0;
}

/**
 * The month of the benefit year a claim starts paying in: 1 before it, 13 after it or with no
 * landing month, which is what the Calendar reads a claim with no landing month as.
 */
export function claimMonth(ctx: EngineContext, item: WorkItem): number {
  const benefitYear = ctx.data.settings.benefitYear;
  const year = item.landingYear ?? benefitYear;
  if (!item.landingMonth) return 13;
  const month = MONTHS.indexOf(item.landingMonth) + 1;
  if (year < benefitYear) return 1;
  if (year > benefitYear) return 13;
  return month;
}

export function claimShare(ctx: EngineContext, item: WorkItem): number {
  return (13 - claimMonth(ctx, item)) / 12;
}

export interface BenefitValue {
  rate: number;
  inYear: number;
  recorded: number;
}

/**
 * In-year is the claimed FTE at its grade rate plus cost avoidance, both pro-rated by the landing
 * month. Recorded is the same rate against the actuals, pro-rated from the later of the landing month
 * and the month the actual was recorded in; a claim that landed before the benefit year keeps the
 * full year whenever it was recorded, and one recorded after the benefit year is worth nothing.
 */
export function benefitValue(ctx: EngineContext, item: WorkItem): BenefitValue {
  const settings = ctx.data.settings;
  const benefitYear = settings.benefitYear;
  const year = item.landingYear ?? benefitYear;
  const month = claimMonth(ctx, item);
  const share = (13 - month) / 12;
  const rate = gradeRate(settings, item.grade);
  const costAvoidance = item.claims.T ?? 0;
  const inYear = (item.claimedFTE ?? 0) * share * rate + costAvoidance * 1000000 * share;

  const actual = (type: string): [number, number] => {
    const a = ctx.data.benefitActuals.find((x) => x.title === item.title && x.type === type);
    if (!a) return [0, share];
    const val = typeof a.value === "number" ? a.value : 0;
    if (!a.when) return [val, share];
    const when = parseDate(a.when);
    if (year < benefitYear) return [val, 1];
    if (when.getUTCFullYear() < benefitYear) return [val, share];
    if (when.getUTCFullYear() > benefitYear) return [val, 0];
    return [val, (13 - Math.max(month, when.getUTCMonth() + 1)) / 12];
  };

  const [recFTE, fteShare] = actual("FTE released");
  const [recCA, caShare] = actual("Cost avoidance");
  const recorded = recFTE * rate * fteShare + recCA * 1000000 * caShare;
  return { rate, inYear, recorded };
}

/** One line of the Calendar: a work item, month by month across the benefit year. */
export interface CalendarRow {
  title: string;
  squad: string;
  epic: string;
  fteClaimed: number;
  /** The month the benefit lands in, as the Calendar prints it (e.g. "Nov 2026"); null when none. */
  lands: string | null;
  gradeRate: number;
  fteByMonth: number[];
  fteInYear: number;
  gbpInYear: number;
  state: string;
  inPlan: boolean;
}

/** The total block under the Calendar: the plan, the target line and the hypothesis. */
export interface CalendarTotals {
  fteLive: number[];
  fteNew: number[];
  gbpByMonth: number[];
  gbpCumulative: number[];
  gbpTarget: number[];
  fteTarget: number;
  /** FTE live in December against the target: the year-end gap. */
  gap: number;
  /** FTE live in December if every listed item lands, counted or not. */
  fteIfAllLands: number;
  gbpIfAllLands: number[];
}

export interface BenefitCalendar {
  year: number;
  months: string[];
  rows: CalendarRow[];
  totals: CalendarTotals;
}

/** The month of the year a claim starts paying in: 1 before it, 13 after it or with no landing month. */
function landingIndex(item: WorkItem, year: number): number {
  if (!item.landingMonth) return 13;
  const landed = item.landingYear ?? year;
  if (landed < year) return 1;
  if (landed > year) return 13;
  return MONTHS.indexOf(item.landingMonth) + 1;
}

/**
 * The Calendar sheet: one row per work item in Work order, month by month across the benefit year.
 * A row carries its claimed FTE from the month it lands in to December, so FTE in-year is that walk
 * over twelve, and pounds in-year are it at the grade rate plus a twelfth of the cost avoidance from
 * the same month. The totals count the plan only, except the two hypothesis lines, which count every
 * listed item; the target line spreads the GBP target evenly over the year.
 */
export function benefitCalendar(ctx: EngineContext, year?: number): BenefitCalendar {
  const settings = ctx.data.settings;
  const benefitYear = year ?? settings.benefitYear;
  const rows: CalendarRow[] = [];
  const caByMonth: number[][] = [];
  for (const item of ctx.data.work) {
    const index = landingIndex(item, benefitYear);
    const fte = item.claimedFTE ?? 0;
    const rate = gradeRate(settings, item.grade);
    const fteByMonth = MONTHS.map((_, m) => (fte !== 0 && m + 1 >= index ? fte : 0));
    const fteInYear = fteByMonth.reduce((t, v) => t + v, 0) / 12;
    const costAvoidance = (item.claims.T ?? 0) * 1000000;
    const ca = MONTHS.map((_, m) => (costAvoidance !== 0 && m + 1 >= index ? costAvoidance / 12 : 0));
    caByMonth.push(ca);
    rows.push({
      title: item.title,
      squad: item.squad,
      epic: item.epic,
      fteClaimed: fte,
      lands: item.landingMonth ? `${item.landingMonth} ${item.landingYear ?? benefitYear}` : null,
      gradeRate: rate,
      fteByMonth,
      fteInYear,
      gbpInYear: fteInYear * rate + ca.reduce((t, v) => t + v, 0),
      state: item.state,
      inPlan: inPlan(ctx, item),
    });
  }

  const zero = (): number[] => MONTHS.map(() => 0);
  const fteLive = zero();
  const fteNew = zero();
  const gbpByMonth = zero();
  const fteAll = zero();
  const gbpAll = zero();
  rows.forEach((row, i) => {
    const item = ctx.data.work[i];
    const lands = item.landingMonth && (item.landingYear ?? benefitYear) === benefitYear
      ? MONTHS.indexOf(item.landingMonth) + 1
      : 0;
    for (let m = 0; m < 12; m += 1) {
      fteAll[m] += row.fteByMonth[m];
      gbpAll[m] += (row.fteByMonth[m] * row.gradeRate) / 12 + caByMonth[i][m];
      if (!row.inPlan) continue;
      fteLive[m] += row.fteByMonth[m];
      gbpByMonth[m] += (row.fteByMonth[m] * row.gradeRate) / 12 + caByMonth[i][m];
      if (lands === m + 1) fteNew[m] += row.fteClaimed;
    }
  });
  const running = (values: number[]): number[] => {
    let total = 0;
    return values.map((v) => {
      total += v;
      return total;
    });
  };
  const gbpCumulative = running(gbpByMonth);
  return {
    year: benefitYear,
    months: [...MONTHS],
    rows,
    totals: {
      fteLive,
      fteNew,
      gbpByMonth,
      gbpCumulative,
      gbpTarget: MONTHS.map((_, m) => (settings.gbpTarget * (m + 1)) / 12),
      fteTarget: settings.fteTarget,
      gap: fteLive[11] - settings.fteTarget,
      fteIfAllLands: fteAll[11],
      gbpIfAllLands: running(gbpAll),
    },
  };
}

/** Every claim in the plan, pro-rated: the whole quarter's in-year pound figure. */
export function gbpInYear(ctx: EngineContext): number {
  let total = 0;
  for (const w of ctx.data.work) {
    if (!inPlan(ctx, w)) continue;
    const costAvoidance = w.claims.T ?? 0;
    if (!w.claimedFTE && !costAvoidance) continue;
    const share = claimShare(ctx, w);
    total += (w.claimedFTE ?? 0) * share * gradeRate(ctx.data.settings, w.grade)
      + costAvoidance * 1000000 * share;
  }
  return total;
}

/** FTE released in the plan this quarter: the primary benefit, before any pro-rating. */
export function fteClaimed(ctx: EngineContext): number {
  return ctx.data.work
    .filter((w) => counts(ctx, w) || ctx.impact[w.state] === "Historical")
    .reduce((t, w) => t + (w.claimedFTE ?? 0), 0);
}
