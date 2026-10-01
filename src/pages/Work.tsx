// Work: the quarter's work as a register. The lifecycle strip says what sits in each phase, the
// filters narrow the list, and every title leads to the item's own page, where it is shaped,
// assessed and moved on.
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Section from "./Section";
import "./work.css";
import { useDataset } from "../store/useDataset";
import { phaseOf, stateNames } from "../store/validate";
import { buildContext, itemSpan } from "../engine/context";
import { deliveryStatuses } from "../engine/delivery";
import { commitment, counts, workMW } from "../engine/work";
import type { WorkItem } from "../model/types";
import { NewItemDialog, workPath } from "./WorkItem";
import type { NewKind } from "./WorkItem";
import { DataTable, Pill, SplitButton, Toolbar } from "../ui";
import type { Column, PillTone } from "../ui";

/** The four phases of the lifecycle, in the order work moves through them. */
const PHASES = ["Shaping", "Assessment", "Delivery", "Release"];

/** The kind pivot over the register: the label, and the kind it filters to. */
const KIND_TABS: [string, string][] = [
  ["", "All"],
  ["Feature", "Features"],
  ["Spike", "Spikes"],
  ["Component", "Components"],
];

const statusTone = (status: string): PillTone => {
  if (status === "Late") return "bad";
  if (status.startsWith("At risk")) return "warn";
  if (status === "On track" || status.startsWith("Done")) return "good";
  return "neutral";
};

export default function Work() {
  const { data } = useDataset();
  const navigate = useNavigate();
  const ctx = useMemo(() => buildContext(data), [data]);
  const statuses = useMemo(() => deliveryStatuses(ctx), [ctx]);

  const [kind, setKind] = useState("");
  const [phase, setPhase] = useState("");
  const [state, setState] = useState("");
  const [squad, setSquad] = useState("");
  const [commit, setCommit] = useState("");
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState<NewKind | "">("");

  /** The strip over the register: what sits in each phase, and the MW it charges this quarter. */
  const lifecycle = PHASES.map((name) => {
    const items = data.work.filter((w) => phaseOf(w) === name);
    return {
      name,
      count: items.length,
      mw: items.filter((w) => counts(ctx, w)).reduce((t, w) => t + workMW(ctx, w), 0),
    };
  });

  const rows = data.work.filter((w) => {
    if (kind && w.kind !== kind) return false;
    if (phase && phaseOf(w) !== phase) return false;
    if (state && w.state !== state) return false;
    if (squad && w.squad !== squad) return false;
    if (commit && commitment(w) !== commit) return false;
    const q = search.trim().toLowerCase();
    return !q || w.title.toLowerCase().includes(q) || w.epic.toLowerCase().includes(q);
  });

  const columns: Column<WorkItem>[] = [
    {
      key: "title",
      label: "Title",
      sort: (w) => w.title,
      cell: (w) => {
        const kids = ctx.kids[w.title] ?? 0;
        const caption = w.kind === "Component"
          ? w.parent
          : kids > 0 ? `${kids} ${kids === 1 ? "component" : "components"}` : "";
        return (
          <span className="wp-work-title">
            <Link to={workPath(w.title)} title={w.title}>{w.title}</Link>
            {caption ? <span className="wp-work-title__caption">{caption}</span> : null}
          </span>
        );
      },
    },
    { key: "kind", label: "Kind", sort: (w) => w.kind, cell: (w) => <Pill>{w.kind}</Pill> },
    {
      key: "state",
      label: "State",
      sort: (w) => w.state,
      cell: (w) => <Pill tone="accent">{w.state}</Pill>,
    },
    {
      key: "squad",
      label: "Squad",
      sort: (w) => w.squad,
      cell: (w) => <span className="wp-nowrap">{w.squad || "—"}</span>,
    },
    {
      key: "size",
      label: "Size · MW",
      sort: (w) => workMW(ctx, w),
      cell: (w) => (
        <span className="wp-nowrap">
          {w.size || "No size yet"}
          <span className="wp-work-mw">{" · " + workMW(ctx, w).toFixed(2)}</span>
        </span>
      ),
    },
    {
      key: "sprints",
      label: "Sprints",
      sort: (w) => itemSpan(w)[0],
      cell: (w) => {
        const [ks, ke] = itemSpan(w);
        return <span className="wp-nowrap">{ke < ks ? "—" : `S${ks} to S${ke}`}</span>;
      },
    },
    {
      key: "delivery",
      label: "Status",
      sort: (w) => statuses.get(w.title) ?? "",
      cell: (w) => {
        const status = statuses.get(w.title) ?? "";
        return status
          ? <Pill tone={statusTone(status)}>{status}</Pill>
          : <span className="wp-muted">Not started</span>;
      },
    },
    {
      key: "owner",
      label: "Owner",
      sort: (w) => w.productOwner,
      cell: (w) => <span className="wp-nowrap">{w.productOwner || "Nobody yet"}</span>,
    },
    {
      key: "jira",
      label: "Jira key",
      sort: (w) => w.jira,
      cell: (w) => {
        if (!w.jira) return <span className="wp-muted">—</span>;
        if (!data.settings.jiraBase) return <span className="wp-nowrap">{w.jira}</span>;
        return (
          <a className="wp-nowrap" href={data.settings.jiraBase.replace(/\/$/, "") + "/" + w.jira}>
            {w.jira}
          </a>
        );
      },
    },
  ];

  const strip = lifecycle
    .map((p) => `${p.name} holds ${p.count} ${p.count === 1 ? "item" : "items"} `
      + `and ${p.mw.toFixed(1)} MW`)
    .join(", ");

  return (
    <Section
      eyebrow={data.settings.quarter}
      title="Work"
      lede="Every item in the quarter, from the idea to the release."
      actions={(
        <SplitButton
          label="New feature"
          menuLabel="New work item"
          onPrimary={() => setCreating("Feature")}
          menuItems={[
            { label: "New spike", onSelect: () => setCreating("Spike") },
            { label: "New component", onSelect: () => setCreating("Component") },
          ]}
        />
      )}
    >
      <div className="wp-lifecycle" role="group" aria-label="Filter by lifecycle phase">
        {lifecycle.map((p) => (
          <button
            key={p.name}
            type="button"
            className="wp-lifecycle__cell"
            aria-pressed={phase === p.name}
            onClick={() => setPhase(phase === p.name ? "" : p.name)}
          >
            <span className="wp-lifecycle__name">{p.name}</span>
            <span className="wp-lifecycle__figures">
              {`${p.count} · ${p.mw.toFixed(1)} MW`}
            </span>
          </button>
        ))}
        <button
          type="button"
          className="wp-lifecycle__cell"
          aria-pressed={phase === ""}
          onClick={() => setPhase("")}
        >
          <span className="wp-lifecycle__name">All</span>
          <span className="wp-lifecycle__figures">{data.work.length}</span>
        </button>
      </div>
      <p className="sr-only">{"The lifecycle this quarter: " + strip + "."}</p>

      <Toolbar label="Filter the work register">
        <div className="wp-tabs wp-work-kinds" role="group" aria-label="Filter by kind">
          {KIND_TABS.map(([value, label]) => (
            <button
              key={label}
              type="button"
              aria-pressed={kind === value}
              onClick={() => setKind(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <select
          className="wp-work-filter"
          aria-label="Squad"
          value={squad}
          onChange={(e) => setSquad(e.target.value)}
        >
          <option value="">All squads</option>
          {data.squads.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
        <select
          className="wp-work-filter"
          aria-label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">All states</option>
          {stateNames(data).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          className="wp-work-filter"
          aria-label="Commitment"
          value={commit}
          onChange={(e) => setCommit(e.target.value)}
        >
          <option value="">Proposed and committed</option>
          <option value="Proposed">Proposed</option>
          <option value="Committed">Committed</option>
        </select>
        <input
          className="wp-work-filter wp-work-search"
          type="search"
          aria-label="Search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Toolbar>

      <p className="wp-count">{rows.length} of {data.work.length} items</p>

      <div className="wp-work-register wp-fill">
        <DataTable
          caption="Work register: every item in the quarter, with its kind, size, schedule and status."
          columns={columns}
          rows={rows}
          rowKey={(w) => w.title}
          empty="No work matches those filters."
        />
      </div>

      <NewItemDialog
        open={creating !== ""}
        kind={creating === "" ? "Feature" : creating}
        onClose={() => setCreating("")}
        onCreated={(title) => navigate(workPath(title))}
      />
    </Section>
  );
}
