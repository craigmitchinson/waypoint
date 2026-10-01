// Team: the people, the squads they sit in, the leave that comes off their capacity, and the
// capacity held back before the detailed work is known.
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Section from "./Section";
import { useDataset } from "../store/useDataset";
import {
  EMPLOYMENTS, REGIONS, TEAM_GRADES, TEAM_RESERVATION, skillList, validateAbsence, validatePerson,
  validateSquad,
} from "../store/validate";
import { buildContext } from "../engine/context";
import { bookedDays, modifier, netMW, squadNetMW } from "../engine/capacity";
import { squadCommittedMW } from "../engine/work";
import { reservationRows, squadReservedMW } from "../engine/reservations";
import type { ReservationRow } from "../engine/reservations";
import { networkdays, parseDate } from "../engine/dates";
import type { Absence, Person, Reservation, Squad } from "../model/types";
import { Avatar, Band, Chip, ConfirmDialog, DataTable, Drawer, Field, Pill, Stat, Toolbar, toneFor } from "../ui";
import type { Column } from "../ui";
import "./team.css";

type Tab = "people" | "squads" | "absences" | "reservations";

const TABS: [Tab, string][] = [
  ["people", "People"],
  ["squads", "Squads"],
  ["absences", "Absences"],
  ["reservations", "Reservations"],
];

/** Discovery and Spikes draw on one pool of spike MW; shaping draws on the work being shaped. */
const SPIKE_CATEGORIES = ["Discovery", "Spikes"];
const SHAPING_CATEGORY = "Shaping and refinement";

/** The real work a category is drawn down by: a kind of work item, or a type of assignment. */
const drawdownSource = (category: string): string => {
  if (SPIKE_CATEGORIES.includes(category)) return "Work of kind Spike";
  if (category === SHAPING_CATEGORY) return "Work in Shaping or Assessment";
  return category ? `Assignments of type ${category}` : "—";
};

const ABSENCE_TYPES = ["Annual leave", "Sick", "Public holiday", "Training", "Parental", "Other"];

const mw = (n: number) => n.toFixed(2);
const pct = (n: number) => Math.round(n * 100) + "%";

const blankPerson = (): Person => ({
  name: "", role: "", grade: "", squad: "", region: "England", employment: "Permanent",
  lead: false, skills: [""],
});

const blankSquad = (): Squad => ({ name: "", lead: "", remit: "", colour: "" });

const blankAbsence = (): Absence => ({ person: "", type: "Annual leave", from: "", to: "", note: "" });

const blankReservation = (quarter: string): Reservation => ({
  squad: TEAM_RESERVATION, quarter, category: "", mw: 0, note: "",
});

export default function Team() {
  const store = useDataset();
  const { data, view } = store;
  const ctx = useMemo(() => buildContext(data), [data]);

  const [tab, setTab] = useState<Tab>("people");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [refusal, setRefusal] = useState("");
  const [person, setPerson] = useState<Person>(blankPerson);
  const [squad, setSquad] = useState<Squad>(blankSquad);
  const [absence, setAbsence] = useState<Absence>(blankAbsence);
  const [reservation, setReservation] = useState<Reservation>(() => blankReservation(data.settings.quarter));
  const [original, setOriginal] = useState("");
  const [index, setIndex] = useState(-1);
  const [removing, setRemoving] = useState(false);

  const errorFor = (fragment: string) => errors.find((e) => e.toLowerCase().includes(fragment));

  const bookedMW = (name: string) =>
    ctx.weeks.reduce((t, mon) => t + bookedDays(ctx, name, mon), 0) / ctx.mwDays;

  const rag = (utilisation: number): string => {
    if (utilisation > data.settings.utilisationBad) return "Red";
    if (utilisation > data.settings.utilisationWarn) return "Amber";
    return "Green";
  };

  const openPerson = (row: Person | null) => {
    setPerson(row ? { ...row, skills: [...row.skills] } : blankPerson());
    setOriginal(row?.name ?? "");
    setErrors([]);
    setRefusal("");
    setOpen(true);
  };
  const openSquad = (row: Squad | null) => {
    setSquad(row ? { ...row } : blankSquad());
    setOriginal(row?.name ?? "");
    setErrors([]);
    setRefusal("");
    setOpen(true);
  };
  const openAbsence = (row: Absence | null, at: number) => {
    setAbsence(row ? { ...row } : blankAbsence());
    setIndex(at);
    setErrors([]);
    setRefusal("");
    setOpen(true);
  };

  const openReservation = (row: Reservation | null, at: number) => {
    setReservation(row ? { ...row } : blankReservation(data.settings.quarter));
    setIndex(at);
    setErrors([]);
    setRefusal("");
    setOpen(true);
  };

  const save = () => {
    if (tab === "people") {
      const found = validatePerson(data, person, original || undefined);
      setErrors(found);
      if (found.length > 0) return;
      if (original) store.updatePerson(original, person);
      else store.addPerson(person);
    } else if (tab === "squads") {
      const found = validateSquad(data, squad, original || undefined);
      setErrors(found);
      if (found.length > 0) return;
      if (original) store.updateSquad(original, squad);
      else store.addSquad(squad);
    } else if (tab === "reservations") {
      // the store speaks for the workbook here: it refuses the row and says why
      const message = index >= 0
        ? store.updateReservation(index, reservation)
        : store.addReservation(reservation);
      setErrors(message ? [message] : []);
      if (message) return;
    } else {
      const found = validateAbsence(data, absence);
      setErrors(found);
      if (found.length > 0) return;
      if (index >= 0) store.updateAbsence(index, absence);
      else store.addAbsence(absence);
    }
    setOpen(false);
  };

  const remove = () => {
    setRemoving(false);
    if (tab === "people") {
      const message = store.removePerson(original);
      setRefusal(message);
      if (!message) setOpen(false);
    } else if (tab === "squads") {
      const message = store.removeSquad(original);
      setRefusal(message);
      if (!message) setOpen(false);
    } else if (tab === "reservations") {
      store.removeReservation(index);
      setOpen(false);
    } else {
      store.removeAbsence(index);
      setOpen(false);
    }
  };

  const peopleColumns: Column<Person>[] = [
    {
      key: "name",
      label: "Name",
      sort: (p) => p.name,
      cell: (p) => (
        <span className="wp-team-person">
          <Avatar name={p.name} />
          <button
            type="button"
            className="wp-link-btn wp-team-person__name"
            onClick={() => openPerson(p)}
          >
            {p.name}
          </button>
          <span className="wp-team-person__role">{"· " + (p.role || "No role set")}</span>
          {p.lead ? <Pill>Lead</Pill> : null}
        </span>
      ),
    },
    {
      key: "squad",
      label: "Squad",
      sort: (p) => p.squad,
      cell: (p) => (p.squad ? <Pill tone="brand">{p.squad}</Pill> : "—"),
    },
    { key: "grade", label: "Grade", sort: (p) => p.grade, cell: (p) => p.grade || "—" },
    {
      key: "skills",
      label: "Skills",
      sort: (p) => p.skills.join(", "),
      cell: (p) => p.skills.filter(Boolean).join(", ") || "—",
    },
    {
      key: "dpw",
      label: "Days per week",
      numeric: true,
      sort: (p) => p.daysPerWeek ?? 5,
      cell: (p) => String(p.daysPerWeek ?? 5),
    },
    { key: "region", label: "Region", sort: (p) => p.region, cell: (p) => p.region },
    {
      key: "modifier",
      label: "Modifier",
      numeric: true,
      sort: (p) => modifier(ctx, p.name),
      cell: (p) => pct(modifier(ctx, p.name)),
    },
    {
      key: "net",
      label: "Net MW",
      numeric: true,
      sort: (p) => netMW(ctx, p.name),
      cell: (p) => mw(netMW(ctx, p.name)),
    },
    {
      key: "booked",
      label: "Booked",
      numeric: true,
      sort: (p) => bookedMW(p.name),
      cell: (p) => mw(bookedMW(p.name)),
    },
    {
      key: "free",
      label: "Free",
      numeric: true,
      sort: (p) => netMW(ctx, p.name) - bookedMW(p.name),
      cell: (p) => mw(Math.max(0, netMW(ctx, p.name) - bookedMW(p.name))),
    },
  ];

  const squadColumns: Column<Squad>[] = [
    {
      key: "name",
      label: "Name",
      sort: (s) => s.name,
      cell: (s) => (
        <button type="button" className="wp-link-btn" onClick={() => openSquad(s)}>{s.name}</button>
      ),
    },
    {
      key: "net",
      label: "Net MW",
      numeric: true,
      sort: (s) => squadNetMW(ctx, s.name),
      cell: (s) => mw(squadNetMW(ctx, s.name)),
    },
    {
      key: "committed",
      label: "Committed",
      numeric: true,
      sort: (s) => squadCommittedMW(ctx, s.name),
      cell: (s) => mw(squadCommittedMW(ctx, s.name)),
    },
    {
      key: "reserved",
      label: "Reserved",
      numeric: true,
      sort: (s) => squadReservedMW(ctx, s.name),
      cell: (s) => mw(squadReservedMW(ctx, s.name)),
    },
    {
      key: "remaining",
      label: "Remaining",
      numeric: true,
      sort: (s) => squadNetMW(ctx, s.name) - squadCommittedMW(ctx, s.name) - squadReservedMW(ctx, s.name),
      cell: (s) => mw(squadNetMW(ctx, s.name) - squadCommittedMW(ctx, s.name) - squadReservedMW(ctx, s.name)),
    },
    {
      key: "rag",
      label: "RAG",
      sort: (s) => rag(utilisation(s.name)),
      cell: (s) => <Chip tone={toneFor(rag(utilisation(s.name)))}>{rag(utilisation(s.name))}</Chip>,
    },
    {
      key: "utilisation",
      label: "Utilisation",
      numeric: true,
      sort: (s) => utilisation(s.name),
      cell: (s) => pct(utilisation(s.name)),
    },
  ];

  function utilisation(name: string): number {
    const net = squadNetMW(ctx, name);
    return net === 0 ? 0 : squadCommittedMW(ctx, name) / net;
  }

  const absenceRows = data.absences.map((a, i) => ({ ...a, index: i }));
  const absenceColumns: Column<Absence & { index: number }>[] = [
    {
      key: "person",
      label: "Person",
      sort: (a) => a.person,
      cell: (a) => (
        <button type="button" className="wp-link-btn" onClick={() => openAbsence(a, a.index)}>
          {a.person}
        </button>
      ),
    },
    { key: "type", label: "Type", sort: (a) => a.type, cell: (a) => a.type },
    { key: "from", label: "Start", sort: (a) => a.from, cell: (a) => a.from },
    { key: "to", label: "End", sort: (a) => a.to, cell: (a) => a.to },
    {
      key: "days",
      label: "Days",
      numeric: true,
      sort: (a) => networkdays(parseDate(a.from), parseDate(a.to)),
      cell: (a) => String(networkdays(parseDate(a.from), parseDate(a.to))),
    },
  ];

  const reservationRowsWithIndex = reservationRows(ctx).map((r, i) => ({ ...r, index: i }));
  const reservationColumns: Column<ReservationRow & { index: number }>[] = [
    {
      key: "level",
      label: "Level",
      sort: (r) => r.squad,
      cell: (r) => (
        <button type="button" className="wp-link-btn" onClick={() => openReservation(r, r.index)}>
          {r.squad}
        </button>
      ),
    },
    { key: "category", label: "Category", sort: (r) => r.category, cell: (r) => r.category },
    {
      key: "source",
      label: "Drawn down by",
      sort: (r) => drawdownSource(r.category),
      cell: (r) => drawdownSource(r.category),
    },
    { key: "mw", label: "MW reserved", numeric: true, sort: (r) => r.mw, cell: (r) => mw(r.mw) },
    {
      key: "drawn",
      label: "Drawn down MW",
      numeric: true,
      sort: (r) => r.drawn,
      cell: (r) => mw(r.drawn),
    },
    {
      key: "remaining",
      label: "Remaining",
      numeric: true,
      sort: (r) => r.remaining,
      cell: (r) => mw(r.remaining),
    },
  ];

  const addLabel = tab === "people" ? "Add person"
    : tab === "squads" ? "Add squad"
      : tab === "reservations" ? "Add reservation" : "Add absence";
  const onAdd = () => {
    if (tab === "people") openPerson(null);
    else if (tab === "squads") openSquad(null);
    else if (tab === "reservations") openReservation(null, -1);
    else openAbsence(null, -1);
  };
  const editing = tab === "absences" || tab === "reservations" ? index >= 0 : Boolean(original);

  const netTotal = view.net_total;
  const absenceDays = Object.values(ctx.absenceDays).reduce((t, d) => t + d, 0);

  return (
    <Section
      eyebrow={data.settings.quarter}
      title="Team"
      lede="People, squads and the net member weeks each of them really brings."
      actions={(
        <button type="button" className="wp-btn-primary" onClick={onAdd}>
          <Plus size={14} aria-hidden="true" />
          {addLabel}
        </button>
      )}
    >
      <Band kicker="The team this quarter">
        <Stat onBrand label="People" value={String(data.people.length)} sub={`${data.people.filter((p) => p.squad).length} in a squad`} />
        <Stat onBrand label="Squads" value={String(data.squads.length)} sub={`${data.squads.filter((s) => s.lead).length} with a lead`} />
        <Stat onBrand label="Net capacity" value={netTotal.toFixed(1)} unit="MW" sub="Net member weeks across every squad" />
        <Stat onBrand tone="accent" label="Absence days" value={absenceDays.toFixed(1)} sub="Booked leave inside the quarter" />
      </Band>

      <div className="wp-tabs wp-team-tabs" role="group" aria-label="Team views">
        {TABS.map(([key, label]) => (
          <button key={key} type="button" aria-pressed={tab === key} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      <Toolbar label="Team actions">
        <p className="wp-count">
          {tab === "people" ? `${data.people.length} people`
            : tab === "squads" ? `${data.squads.length} squads`
              : tab === "reservations" ? `${data.reservations.length} reservations`
                : `${data.absences.length} absences`}
        </p>
      </Toolbar>

      {refusal ? <p className="wp-refusal" role="alert">{refusal}</p> : null}

      {tab === "people" ? (
        <>
          <h2 className="wp-h2">People</h2>
          <DataTable
            caption="People: the capacity each person brings to the quarter, and what is booked against it."
            columns={peopleColumns}
            rows={data.people}
            rowKey={(p) => p.name}
          />
        </>
      ) : null}
      {tab === "squads" ? (
        <>
          <h2 className="wp-h2">Squads</h2>
          <DataTable
            caption="Squads: net capacity against what is committed and reserved."
            columns={squadColumns}
            rows={data.squads}
            rowKey={(s) => s.name}
          />
        </>
      ) : null}
      {tab === "absences" ? (
        <>
          <h2 className="wp-h2">Absences</h2>
          <DataTable
            caption="Absences: the leave that comes off the quarter's capacity."
            columns={absenceColumns}
            rows={absenceRows}
            rowKey={(a) => `${a.person}-${a.from}-${a.index}`}
            empty="No absences recorded."
          />
        </>
      ) : null}
      {tab === "reservations" ? (
        <>
          <h2 className="wp-h2">Reservations</h2>
          <DataTable
            caption="Reservations: capacity held before the detailed work is known, and what has drawn it down."
            columns={reservationColumns}
            rows={reservationRowsWithIndex}
            rowKey={(r) => `${r.squad}-${r.quarter}-${r.category}-${r.index}`}
            empty="No capacity is reserved."
          />
        </>
      ) : null}

      <Drawer
        open={open}
        title={tab === "people" ? (original || "New person")
          : tab === "squads" ? (original || "New squad")
            : tab === "reservations" ? (index >= 0 ? "Edit reservation" : "New reservation")
              : (index >= 0 ? "Edit absence" : "New absence")}
        onClose={() => setOpen(false)}
        footer={(
          <>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            {editing ? (
              <button type="button" onClick={() => setRemoving(true)}>Remove</button>
            ) : null}
            <button type="button" className="wp-btn-primary" onClick={save}>Save</button>
          </>
        )}
      >
        {errors.length > 0 ? (
          <div className="wp-errors" role="alert">
            <p>That did not save:</p>
            <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        ) : null}
        {refusal ? <p className="wp-refusal" role="alert">{refusal}</p> : null}

        {tab === "people" ? (
          <>
            <Field label="Name" error={errorFor("name is")}>
              {(p) => (
                <input
                  {...p}
                  value={person.name}
                  onChange={(e) => setPerson({ ...person, name: e.target.value })}
                />
              )}
            </Field>
            <Field label="Role">
              {(p) => (
                <input
                  {...p}
                  value={person.role}
                  onChange={(e) => setPerson({ ...person, role: e.target.value })}
                />
              )}
            </Field>
            <Field label="Squad" error={errorFor("squad")}>
              {(p) => (
                <select
                  {...p}
                  value={person.squad}
                  onChange={(e) => setPerson({ ...person, squad: e.target.value })}
                >
                  <option value="">Pick a squad</option>
                  {data.squads.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              )}
            </Field>
            <Field label="Grade" error={errorFor("grade")}>
              {(p) => (
                <select
                  {...p}
                  value={person.grade}
                  onChange={(e) => setPerson({ ...person, grade: e.target.value })}
                >
                  <option value="">No grade</option>
                  {TEAM_GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              )}
            </Field>
            <Field label="Primary skill" error={errorFor("primary skill")}>
              {(p) => (
                <select
                  {...p}
                  value={person.skills[0] ?? ""}
                  onChange={(e) => setPerson({
                    ...person,
                    skills: [e.target.value, ...person.skills.slice(1)],
                  })}
                >
                  <option value="">Pick a skill</option>
                  {skillList(data).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              )}
            </Field>
            <Field label="Region" error={errorFor("region")}>
              {(p) => (
                <select
                  {...p}
                  value={person.region}
                  onChange={(e) => setPerson({ ...person, region: e.target.value })}
                >
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              )}
            </Field>
            <Field label="Employment" error={errorFor("employment")}>
              {(p) => (
                <select
                  {...p}
                  value={person.employment}
                  onChange={(e) => setPerson({ ...person, employment: e.target.value })}
                >
                  {EMPLOYMENTS.map((x) => <option key={x} value={x}>{x}</option>)}
                </select>
              )}
            </Field>
            <Field label="Days per week" error={errorFor("days per week")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  step="0.5"
                  value={person.daysPerWeek ?? ""}
                  onChange={(e) => setPerson({
                    ...person,
                    daysPerWeek: e.target.value === "" ? undefined : Number(e.target.value),
                  })}
                />
              )}
            </Field>
            <Field label="Modifier override" hint="A share of a week, or a percentage.">
              {(p) => (
                <input
                  {...p}
                  type="number"
                  step="0.05"
                  value={person.modifierOverride ?? ""}
                  onChange={(e) => setPerson({
                    ...person,
                    modifierOverride: e.target.value === "" ? undefined : Number(e.target.value),
                  })}
                />
              )}
            </Field>
            <Field label="Start date" error={errorFor("start date")}>
              {(p) => (
                <input
                  {...p}
                  type="date"
                  value={person.startDate ?? ""}
                  onChange={(e) => setPerson({ ...person, startDate: e.target.value || undefined })}
                />
              )}
            </Field>
            <Field label="End date" error={errorFor("end date")}>
              {(p) => (
                <input
                  {...p}
                  type="date"
                  value={person.endDate ?? ""}
                  onChange={(e) => setPerson({ ...person, endDate: e.target.value || undefined })}
                />
              )}
            </Field>
          </>
        ) : null}

        {tab === "squads" ? (
          <>
            <Field label="Squad name" error={errorFor("squad")}>
              {(p) => (
                <input
                  {...p}
                  value={squad.name}
                  onChange={(e) => setSquad({ ...squad, name: e.target.value })}
                />
              )}
            </Field>
            <Field label="Lead">
              {(p) => (
                <select
                  {...p}
                  value={squad.lead}
                  onChange={(e) => setSquad({ ...squad, lead: e.target.value })}
                >
                  <option value="">Nobody yet</option>
                  {data.people.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
                </select>
              )}
            </Field>
            <Field label="Remit">
              {(p) => (
                <textarea
                  {...p}
                  value={squad.remit}
                  onChange={(e) => setSquad({ ...squad, remit: e.target.value })}
                />
              )}
            </Field>
            <Field label="Palette colour" error={errorFor("palette")}>
              {(p) => (
                <select
                  {...p}
                  value={squad.colour}
                  onChange={(e) => setSquad({ ...squad, colour: e.target.value })}
                >
                  <option value="">Pick a palette colour</option>
                  {[...new Set(data.squads.map((s) => s.colour).filter(Boolean))].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </Field>
          </>
        ) : null}

        {tab === "absences" ? (
          <>
            <Field label="Person" error={errorFor("person")}>
              {(p) => (
                <select
                  {...p}
                  value={absence.person}
                  onChange={(e) => setAbsence({ ...absence, person: e.target.value })}
                >
                  <option value="">Pick a person</option>
                  {data.people.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
                </select>
              )}
            </Field>
            <Field label="Type" error={errorFor("absence type")}>
              {(p) => (
                <select
                  {...p}
                  value={absence.type}
                  onChange={(e) => setAbsence({ ...absence, type: e.target.value })}
                >
                  {ABSENCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              )}
            </Field>
            <Field label="From" error={errorFor("from and to")}>
              {(p) => (
                <input
                  {...p}
                  type="date"
                  value={absence.from}
                  onChange={(e) => setAbsence({ ...absence, from: e.target.value })}
                />
              )}
            </Field>
            <Field label="To" error={errorFor("to is before")}>
              {(p) => (
                <input
                  {...p}
                  type="date"
                  value={absence.to}
                  onChange={(e) => setAbsence({ ...absence, to: e.target.value })}
                />
              )}
            </Field>
            <Field label="Note">
              {(p) => (
                <input
                  {...p}
                  value={absence.note}
                  onChange={(e) => setAbsence({ ...absence, note: e.target.value })}
                />
              )}
            </Field>
          </>
        ) : null}

        {tab === "reservations" ? (
          <>
            <fieldset className="wp-field">
              <legend>Level</legend>
              <label>
                <input
                  type="radio"
                  name="reservation-level"
                  checked={reservation.squad === TEAM_RESERVATION}
                  onChange={() => setReservation({ ...reservation, squad: TEAM_RESERVATION })}
                />
                Team: held across every squad
              </label>
              <label>
                <input
                  type="radio"
                  name="reservation-level"
                  checked={reservation.squad !== TEAM_RESERVATION}
                  onChange={() => setReservation({ ...reservation, squad: "" })}
                />
                One squad
              </label>
            </fieldset>
            {reservation.squad !== TEAM_RESERVATION ? (
              <Field label="Squad" error={errorFor("squad")}>
                {(p) => (
                  <select
                    {...p}
                    value={reservation.squad}
                    onChange={(e) => setReservation({ ...reservation, squad: e.target.value })}
                  >
                    <option value="">Pick a squad</option>
                    {data.squads.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                )}
              </Field>
            ) : null}
            <Field label="Quarter" error={errorFor("quarter")}>
              {(p) => (
                <select
                  {...p}
                  value={reservation.quarter}
                  onChange={(e) => setReservation({ ...reservation, quarter: e.target.value })}
                >
                  <option value="">Pick a quarter</option>
                  {data.settings.quarters.map((q) => <option key={q} value={q}>{q}</option>)}
                </select>
              )}
            </Field>
            <Field label="Category" error={errorFor("category")}>
              {(p) => (
                <select
                  {...p}
                  value={reservation.category}
                  onChange={(e) => setReservation({ ...reservation, category: e.target.value })}
                >
                  <option value="">Pick a category</option>
                  {data.settings.reservationCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </Field>
            <Field
              label="Kind or assignment type"
              hint="The real work that draws this reservation down; the category sets it."
            >
              {(p) => <input {...p} readOnly value={drawdownSource(reservation.category)} />}
            </Field>
            <Field label="MW reserved" error={errorFor("mw reserved")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  step="0.5"
                  value={reservation.mw}
                  onChange={(e) => setReservation({ ...reservation, mw: Number(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Note">
              {(p) => (
                <input
                  {...p}
                  value={reservation.note}
                  onChange={(e) => setReservation({ ...reservation, note: e.target.value })}
                />
              )}
            </Field>
          </>
        ) : null}
      </Drawer>

      <ConfirmDialog
        open={removing}
        title="Remove this row"
        body="The workbook refuses to remove anything that is still in use; it will say so if it is."
        confirmLabel="Yes, remove"
        onCancel={() => setRemoving(false)}
        onConfirm={remove}
      />
    </Section>
  );
}
