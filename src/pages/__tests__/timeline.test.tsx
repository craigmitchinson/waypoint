// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Timeline from "../Timeline";
import { useDataset } from "../../store/useDataset";
import { buildContext, sprintEnd, sprintStart } from "../../engine/context";
import { absenceMW, netMW, personWeek, weekDays } from "../../engine/capacity";
import { sprintPlan } from "../../engine/sprintPlan";
import { addDays, MONTHS, overlapWeek, parseDate, toISO, weekday } from "../../engine/dates";

const show = () => render(<MemoryRouter><Timeline /></MemoryRouter>);

const dayLabel = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;

/** How the week grid heads its columns and names its cells. */
const weekLabel = (mon: Date) => `w/c ${dayLabel(mon)}`;

const dayText = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

const ctxNow = () => buildContext(useDataset.getState().data);

/** The sprint the grid opens on: the current one, held inside the quarter. */
const firstShown = () => {
  const ctx = ctxNow();
  return Math.min(ctx.lastSprint, Math.max(ctx.firstSprint, ctx.currentSprint));
};

const workingDaysOf = (num: number) => {
  const ctx = ctxNow();
  const out: Date[] = [];
  const last = sprintEnd(ctx, num);
  for (let d = sprintStart(ctx, num); d <= last; d = addDays(d, 1)) if (weekday(d) < 5) out.push(d);
  return out;
};

/**
 * The Productive MW the engine gives for a sprint: each person's week capacity, pro-rated by the
 * share of that week's working days falling inside both the sprint and the quarter.
 */
const productiveMW = (num: number) => {
  const ctx = ctxNow();
  const weeks = new Map<number, { mon: Date; days: number }>();
  for (const day of workingDaysOf(num)) {
    if (day < ctx.qstart || day > ctx.qend) continue;
    const mon = addDays(day, -weekday(day));
    const found = weeks.get(mon.getTime());
    if (found) found.days += 1;
    else weeks.set(mon.getTime(), { mon, days: 1 });
  }
  return ctx.data.people
    .filter((p) => p.name && p.employment !== "Open vacancy")
    .reduce((total, p) => total + [...weeks.values()].reduce((t, wk) => {
      const { avail, mod } = personWeek(ctx, p.name, wk.mon);
      return t + ((avail * (1 - mod)) / ctx.mwDays) * (wk.days / ctx.mwDays);
    }, 0), 0);
};

/** The command row's own figures: people, productive MW and open days, in one line. */
const shownMW = () => screen.getByText(/MW productive/).textContent as string;

/** The squads the grid groups people under, in the order it builds them. */
const squadGroups = () => {
  const ctx = ctxNow();
  const people = ctx.data.people.filter((p) => p.name && p.employment !== "Open vacancy");
  const named = ctx.data.squads.map((s) => s.name).filter((n) => people.some((p) => p.squad === n));
  const loose = people.filter((p) => !ctx.data.squads.some((s) => s.name === p.squad));
  return loose.length > 0 ? [...named, "Unassigned"] : named;
};

const chips = () =>
  within(screen.getByRole("group", { name: "Jump to a squad" })).getAllByRole("button");

/** The Quarter reading, behind the pivot. */
const showQuarter = () => {
  show();
  fireEvent.click(screen.getByRole("button", { name: "Quarter" }));
};

/** The Sprints reading, behind the pivot. */
const showSprints = () => {
  show();
  fireEvent.click(screen.getByRole("button", { name: "Sprints" }));
};

/** The Gaps reading, behind the pivot. */
const showGaps = () => {
  show();
  fireEvent.click(screen.getByRole("button", { name: "Gaps" }));
};

describe("Timeline, sprint grid", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  it("draws a column for every working day of the sprint", () => {
    const days = workingDaysOf(firstShown());
    show();
    const grid = screen.getByRole("table", { name: /each person against\s+every working day/ });
    const heads = within(grid).getAllByRole("row")[0];
    expect(within(heads).getAllByRole("columnheader")).toHaveLength(days.length + 1);
    expect(days.length).toBe(10);
  });

  it("steps to the next sprint and stops at the last one", () => {
    const ctx = ctxNow();
    show();
    const next = screen.getByRole("button", { name: "Next sprint" });
    expect(screen.getByText(new RegExp(`^S${firstShown()} · `))).toBeTruthy();
    fireEvent.click(next);
    expect(screen.getByText(new RegExp(`^S${firstShown() + 1} · `))).toBeTruthy();
    for (let n = firstShown() + 1; n < ctx.lastSprint; n += 1) fireEvent.click(next);
    expect(screen.getByRole("button", { name: "Next sprint" }).hasAttribute("disabled")).toBe(true);
  });

  it("opens on the first sprint of the quarter with the previous step disabled", () => {
    show();
    expect(screen.getByRole("button", { name: "Previous sprint" }).hasAttribute("disabled")).toBe(true);
  });

  it("names the work a booked cell carries, and leaves the rest open", () => {
    const { data } = useDataset.getState();
    const days = workingDaysOf(firstShown());
    const booking = data.assignments.find((a) =>
      a.type === "Work" && a.from <= toISO(days[0]) && a.to >= toISO(days[0]));
    show();
    expect(booking).toBeTruthy();
    const cell = screen.getByRole("button", {
      name: `${booking?.person}, ${dayLabel(days[0])}: ${booking?.item}`,
    });
    expect(cell.className).toContain("wp-cell-");
    expect(screen.getAllByRole("button", { name: /: Open$/ }).length).toBeGreaterThan(0);
  });

  it("marks a bank holiday and an absence over the day they fall on", () => {
    const ctx = ctxNow();
    const days = workingDaysOf(firstShown());
    const first = toISO(days[0]);
    const last = toISO(days[days.length - 1]);
    const off = ctx.data.absences.find((a) => a.to >= first && a.from <= last);
    show();
    if (off) {
      const day = days.find((d) => toISO(d) >= off.from && toISO(d) <= off.to) as Date;
      expect(screen.getAllByRole("button", {
        name: `${off.person}, ${dayLabel(day)}: ${off.type}`,
      }).length).toBeGreaterThan(0);
    }
    const holiday = ctx.data.bankHolidays.find((b) => b.date >= first && b.date <= last);
    if (holiday) {
      expect(screen.getAllByRole("button", { name: /: Bank holiday$/ }).length).toBeGreaterThan(0);
    }
  });

  it("writes the absence over a booking on the same day", () => {
    const days = workingDaysOf(firstShown());
    const day = days[0];
    const booking = useDataset.getState().data.assignments.find((a) =>
      a.type === "Work" && a.from <= toISO(day) && a.to >= toISO(day));
    expect(booking).toBeTruthy();
    const person = booking?.person as string;
    useDataset.getState().addAbsence({
      person, type: "Sickness", from: toISO(day), to: toISO(day), note: "",
    });
    show();
    const cell = screen.getByRole("button", {
      name: `${person}, ${dayLabel(day)}: Sickness`,
    });
    expect(cell.className).toContain("wp-cell-leave");
    expect(cell.textContent).toContain("Sick");
    expect(cell.textContent).not.toContain(booking?.item as string);
  });

  it("costs the sprint's sickness with the engine", () => {
    const days = workingDaysOf(firstShown());
    const person = ctxNow().data.people.find((p) => p.employment !== "Open vacancy")?.name as string;
    useDataset.getState().addAbsence({
      person, type: "Sickness", from: toISO(days[0]), to: toISO(days[1]), note: "",
    });
    const ctx = ctxNow();
    const expected = absenceMW(ctx, {
      type: "Sick", from: sprintStart(ctx, firstShown()), to: sprintEnd(ctx, firstShown()),
    }).mw;
    expect(expected).toBeGreaterThan(0);
    show();
    expect(screen.getByText(/MW lost to sickness/).textContent)
      .toContain(`${expected.toFixed(1)} MW lost to sickness`);
  });

  it("takes the sprint's productive MW from the engine, not from the cells", () => {
    const expected = productiveMW(firstShown());
    show();
    expect(expected).toBeGreaterThan(0);
    expect(shownMW()).toContain(expected.toFixed(1));
  });

  it("raises the productive MW when absences stop being deducted", () => {
    show();
    const before = productiveMW(firstShown());
    expect(shownMW()).toContain(before.toFixed(1));
    cleanup();
    expect(useDataset.getState().updateSettings({ logAbsences: "No" })).toBe("");
    const after = productiveMW(firstShown());
    expect(after).toBeGreaterThan(before);
    show();
    expect(shownMW()).toContain(after.toFixed(1));
  });

  it("sums the quarter's own weeks to netMW, allowing for rounding at the boundary weeks", () => {
    const ctx = ctxNow();
    const weeks = ctx.weeks.slice(ctx.quarterWeekOffset, ctx.quarterWeekOffset + 13);
    const people = ctx.data.people.filter((p) => p.name && p.employment !== "Open vacancy");
    const perWeekTotal = people.reduce((total, p) => total + weeks.reduce((t, mon) => {
      const { avail, mod } = personWeek(ctx, p.name, mon);
      return t + (avail * (1 - mod)) / ctx.mwDays;
    }, 0), 0);
    const netTotal = people.reduce((t, p) => t + netMW(ctx, p.name), 0);
    // The quarter's first and last weeks can straddle a sprint boundary by less than a day's worth of
    // MW; 0.5 MW covers that rounding without masking a real regression.
    expect(Math.abs(perWeekTotal - netTotal)).toBeLessThan(0.5);
  });

  it("shows S20's Productive MW from only the days inside the quarter, matching its own caption", () => {
    const ctx = ctxNow();
    const num = ctx.firstSprint; // S20 in the seed: it opens before the quarter does
    const expected = productiveMW(num);
    show();
    for (let n = firstShown(); n > num; n -= 1) {
      fireEvent.click(screen.getByRole("button", { name: "Previous sprint" }));
    }
    expect(shownMW()).toContain(expected.toFixed(1));
    const grid = screen.getByRole("table", { name: /each person against\s+every working day/ });
    expect((grid.querySelector("caption") as HTMLElement).textContent)
      .toContain(`${ctx.sprintWorkingDays.get(num)} working days in the sprint`);
  });

  it("carries the quarter's capacity in the eyebrow, matching the numbers Command shows", () => {
    const { view } = useDataset.getState();
    show();
    const eyebrow = screen.getByText(/available/).textContent as string;
    expect(eyebrow).toContain(`${view.net_total.toFixed(1)} available`);
    expect(eyebrow).toContain(`${view.committed_total.value.toFixed(1)} committed`);
  });

  it("carries a snap chip for every squad, and one for all of them", () => {
    show();
    const names = squadGroups();
    expect(names.length).toBeGreaterThan(1);
    expect(chips()).toHaveLength(names.length + 1);
    expect(chips()[1].textContent).toContain(names[0]);
  });

  it("presses the chip of the squad it has snapped to", () => {
    show();
    const chip = chips()[1];
    expect(chip.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(chip);
    expect(chips()[1].getAttribute("aria-pressed")).toBe("true");
    expect(chips()[0].getAttribute("aria-pressed")).toBe("false");
  });

  it("moves the focused cell with the arrow keys", () => {
    const days = workingDaysOf(firstShown());
    show();
    const cells = screen.getAllByRole("button", { name: new RegExp(`, ${dayLabel(days[0])}: `) });
    cells[0].focus();
    fireEvent.keyDown(cells[0], { key: "ArrowRight" });
    const label = (document.activeElement as HTMLElement).getAttribute("aria-label");
    expect(label).toContain(dayLabel(days[1]));
  });

  it("books a day of work through the store", () => {
    const before = useDataset.getState().data.assignments.length;
    show();
    fireEvent.click(screen.getAllByRole("button", { name: /: Open$/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    const after = useDataset.getState().data.assignments;
    expect(after.length).toBe(before + 1);
    expect(after[after.length - 1].type).toBe("Booked");
  });

  it("refuses a booking that ends before it starts, in the validator's words", () => {
    show();
    fireEvent.click(screen.getAllByRole("button", { name: /: Open$/ })[0]);
    fireEvent.change(screen.getByLabelText("To"), { target: { value: "2026-01-01" } });
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(screen.getByRole("alert").textContent).toContain("To is before From.");
  });

  it("asks before it removes an absence that runs longer than the day", () => {
    const ctx = ctxNow();
    const days = workingDaysOf(firstShown());
    const off = ctx.data.absences.find((a) =>
      a.from !== a.to && a.to >= toISO(days[0]) && a.from <= toISO(days[days.length - 1]));
    expect(off).toBeTruthy();
    const day = days.find((d) => toISO(d) >= (off?.from as string)
      && toISO(d) <= (off?.to as string)) as Date;
    const before = ctx.data.absences.length;

    show();
    fireEvent.click(screen.getByRole("button", {
      name: `${off?.person}, ${dayLabel(day)}: ${off?.type}`,
    }));
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(screen.getByRole("dialog", { name: "Remove the whole booking?" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(useDataset.getState().data.absences.length).toBe(before - 1);
  });
});

describe("Timeline, quarter grid", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  /** The thirteen weeks of the quarter the grid draws a column each for. */
  const quarterWeeks = () => {
    const ctx = ctxNow();
    return ctx.weeks.slice(ctx.quarterWeekOffset, ctx.quarterWeekOffset + 13);
  };

  const planned = () =>
    ctxNow().data.people.filter((p) => p.name && p.employment !== "Open vacancy");

  /** A person-week the grid draws as work: one booking, so the cell names that item. */
  const bookedWeek = () => {
    const ctx = ctxNow();
    for (const mon of quarterWeeks()) {
      for (const a of ctx.data.assignments) {
        if (!planned().some((p) => p.name === a.person)) continue;
        const spans = ctx.personBookings[a.person] ?? [];
        if (spans.filter(([x, y]) => overlapWeek(x, y, mon) > 0).length !== 1) continue;
        if (overlapWeek(parseDate(a.from), parseDate(a.to), mon) === 0) continue;
        const days = weekDays(ctx, a.person, mon);
        if (days.assigned <= 0) continue;
        return { person: a.person, label: a.label || a.item.slice(0, 18), mon, days };
      }
    }
    return null;
  };

  /** A person-week with nothing booked on it: the cell the editor opens empty. */
  const openWeek = () => {
    const ctx = ctxNow();
    for (const mon of quarterWeeks()) {
      for (const p of planned()) {
        const days = weekDays(ctx, p.name, mon);
        if (days.assigned === 0 && days.free > 0) return { person: p.name, mon };
      }
    }
    return null;
  };

  it("draws a column for every week of the quarter and a row for every person", () => {
    const people = planned();
    showQuarter();
    const grid = screen.getByRole("table", { name: /The quarter week by week/ });
    const rows = within(grid).getAllByRole("row");
    // the person column, then the thirteen weeks of the quarter
    expect(within(rows[0]).getAllByRole("columnheader")).toHaveLength(14);
    expect(rows).toHaveLength(people.length + 1);
  });

  it("names the work a booked week carries, with the days it takes", () => {
    const week = bookedWeek();
    expect(week).toBeTruthy();
    const { person, label, mon, days } = week as NonNullable<ReturnType<typeof bookedWeek>>;
    showQuarter();
    const cell = screen.getByRole("button", {
      name: new RegExp(`^${person}, ${weekLabel(mon)}: `),
    });
    expect(cell.textContent).toContain(label);
    expect(cell.textContent).toContain(`${dayText(days.assigned)}d`);
  });

  it("opens the editor on the week's Monday, out to its Friday", () => {
    const week = openWeek();
    expect(week).toBeTruthy();
    const { person, mon } = week as NonNullable<ReturnType<typeof openWeek>>;
    showQuarter();
    fireEvent.click(screen.getByRole("button", {
      name: new RegExp(`^${person}, ${weekLabel(mon)}: `),
    }));
    const drawer = screen.getByRole("dialog");
    expect(drawer.textContent).toContain(person);
    expect((within(drawer).getByLabelText("To") as HTMLInputElement).value)
      .toBe(toISO(addDays(mon, 4)));
  });

  it("moves the focused cell to the next week with the right arrow", () => {
    const weeks = quarterWeeks();
    showQuarter();
    const cells = screen.getAllByRole("button", {
      name: new RegExp(`, ${weekLabel(weeks[0])}: `),
    });
    cells[0].focus();
    fireEvent.keyDown(cells[0], { key: "ArrowRight" });
    const label = (document.activeElement as HTMLElement).getAttribute("aria-label");
    expect(label).toContain(weekLabel(weeks[1]));
  });
});

describe("Timeline, gaps", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  const skillsOf = () => {
    const ctx = ctxNow();
    const names = new Set<string>();
    for (const p of ctx.data.people) {
      if (!p.name || p.employment === "Open vacancy") continue;
      for (const s of p.skills) if (s) names.add(s);
    }
    return names;
  };

  it("draws a cell for every skill in every week of the quarter", () => {
    const skills = skillsOf();
    showGaps();
    const matrix = screen.getByRole("table", { name: /Free days across the team/ });
    expect(skills.size).toBeGreaterThan(0);
    expect(within(matrix).getAllByRole("row")).toHaveLength(skills.size + 1);
    expect(within(matrix).getAllByRole("button")).toHaveLength(skills.size * 13);
  });

  it("opens a cell onto the people its free days belong to", () => {
    showGaps();
    const matrix = screen.getByRole("table", { name: /Free days across the team/ });
    const cell = within(matrix).getAllByRole("button")[0];
    fireEvent.click(cell);
    expect(cell.getAttribute("aria-pressed")).toBe("true");
    const panel = screen.getByRole("region", { name: "Free days by skill" });
    expect(within(panel).getByRole("list")).toBeTruthy();
  });

  it("names the next free window for every person, with a way to book it", () => {
    const ctx = ctxNow();
    const people = ctx.data.people.filter((p) => p.name && p.employment !== "Open vacancy");
    showGaps();
    const windows = screen.getByRole("table", { name: /The next week each person has/ });
    expect(within(windows).getAllByRole("row")).toHaveLength(people.length + 1);
    expect(within(windows).getAllByRole("button", { name: /^Book/ }).length).toBeGreaterThan(0);
  });

  it("books a window into the sprint grid's own editor", () => {
    showGaps();
    const windows = screen.getByRole("table", { name: /The next week each person has/ });
    const book = within(windows).getAllByRole("button", { name: /^Book/ })[0];
    const person = (book.closest("tr")?.querySelector("th") as HTMLElement).textContent as string;
    fireEvent.click(book);
    expect(screen.getByRole("button", { name: "Sprint" }).getAttribute("aria-pressed")).toBe("true");
    expect((screen.getByRole("dialog").textContent as string)).toContain(person);
  });
});

describe("Timeline, sprint plan", () => {
  beforeEach(() => {
    cleanup();
    useDataset.getState().resetToSeed();
  });

  const planNow = () => sprintPlan(ctxNow());

  it("draws a row per squad and a column per sprint, with both totals", () => {
    const plan = planNow();
    showSprints();
    const table = screen.getByRole("table", { name: /The sprint plan for/ });
    const rows = within(table).getAllByRole("row");
    // the header, a row per squad, and the totals row
    expect(rows).toHaveLength(plan.squads.length + 2);
    // the squad column, a column per sprint, and the quarter
    expect(within(rows[0]).getAllByRole("columnheader")).toHaveLength(plan.sprints.length + 2);
    expect(within(table).getByRole("rowheader", { name: "All squads" })).toBeTruthy();
  });

  it("reads a cell as committed over available, and as a percentage on the toggle", () => {
    const plan = planNow();
    const squad = plan.squads[0];
    const cell = squad.cells[0];
    const pair = `${cell.committed.toFixed(1)} / ${cell.available.toFixed(1)}`;
    const pct = `${Math.round(cell.utilisation * 100)}%`;

    showSprints();
    const button = screen.getByRole("button", {
      name: new RegExp(`^${squad.name}, ${plan.sprints[0].label}:`),
    });
    expect((button.textContent as string).startsWith(pair)).toBe(true);
    expect(button.textContent).toContain(pct);

    fireEvent.click(screen.getByRole("button", { name: "%" }));
    expect((button.textContent as string).startsWith(pct)).toBe(true);
    expect(button.textContent).toContain(pair);
  });

  it("marks the sprint today falls in", () => {
    const ctx = ctxNow();
    showSprints();
    const table = screen.getByRole("table", { name: /The sprint plan for/ });
    const head = within(table).getAllByRole("row")[0];
    const marked = within(head).getAllByRole("columnheader").filter(
      (th) => (th.textContent as string).endsWith(", now"),
    );
    expect(marked).toHaveLength(1);
    expect(marked[0].textContent).toContain(`S${firstShown()}`);
    expect(ctx.currentSprint).toBeGreaterThan(0);
  });

  it("opens a cell into the sprint grid, stepped to that sprint", () => {
    const plan = planNow();
    const squad = plan.squads[0];
    const sprint = plan.sprints[1];
    showSprints();
    fireEvent.click(screen.getByRole("button", {
      name: new RegExp(`^${squad.name}, ${sprint.label}:`),
    }));
    expect(screen.getByRole("button", { name: "Sprint" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(new RegExp(`^S${sprint.num} · `))).toBeTruthy();
    const chip = within(screen.getByRole("group", { name: "Jump to a squad" }))
      .getByRole("button", { name: new RegExp(`^${squad.name}`) });
    expect(chip.getAttribute("aria-pressed")).toBe("true");
  });
});
