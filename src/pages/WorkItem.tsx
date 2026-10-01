// One work item, end to end: the Product Owner shapes it, Engineering assesses it, and the stage
// actions move it along. Every rule it shows comes from the engine or the validator; nothing here
// re-derives one.
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Download, MoreHorizontal, Plus, Sparkles } from "lucide-react";
import "./workitem.css";
import { useDataset } from "../store/useDataset";
import {
  CLAIM_TYPES, IDEA_STATES, MAX_ASSIGNEES, MONTH_NAMES, SPIKE_OUTCOMES, impactOf, nextActions,
  phaseOf, skillList, stateNames, validateEngineering, validateProduct,
} from "../store/validate";
import { buildContext, itemSpan, sprintStart } from "../engine/context";
import { toISO } from "../engine/dates";
import { deliveryStatuses } from "../engine/delivery";
import { capacityCheck } from "../engine/capacityCheck";
import { benefitValue } from "../engine/value";
import { commitment, ownMW, totalMW, workMW } from "../engine/work";
import type { SpikeOutcome, WorkItem as Item } from "../model/types";
import { Avatar, ConfirmDialog, Field, Pill, Stepper } from "../ui";
import type { PillTone } from "../ui";

type Tab = "shape" | "assess" | "components" | "value" | "activity";

/** The kinds a new item can be created as, and the dialog each one asks for. */
export type NewKind = "Feature" | "Spike" | "Component";

const STEPS = ["Shaping", "Assessment", "Delivery", "Release"];

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

const statusTone = (status: string): PillTone => {
  if (status === "Late") return "bad";
  if (status.startsWith("At risk")) return "warn";
  if (status === "On track" || status.startsWith("Done")) return "good";
  return "neutral";
};

const outcomeTone = (outcome: string): PillTone => {
  if (outcome === "Feasible") return "good";
  if (outcome === "Not feasible") return "bad";
  return "warn";
};

export const workPath = (title: string) => "/work/" + encodeURIComponent(title);

/** The sprints an item really runs over, whichever field the row stored them on. */
function scheduled(row: Item): [number, number] | null {
  const [ks, ke] = itemSpan(row);
  if (ke >= ks) return [ks, ke];
  if (typeof row.startSprint !== "number") return null;
  return [row.startSprint, typeof row.endSprint === "number" ? row.endSprint : row.startSprint];
}

/** The item as the form edits it: the effective span on startSprint and endSprint. */
function toDraft(row: Item): Item {
  const s = scheduled(row);
  return s ? { ...row, startSprint: s[0], endSprint: s[1] } : row;
}

/** The item as it is saved: the form's sprints, with span kept in step so the engine agrees. */
function fromDraft(row: Item): Item {
  if (typeof row.startSprint !== "number") return { ...row, span: undefined };
  const ke = typeof row.endSprint === "number" ? row.endSprint : row.startSprint;
  return { ...row, endSprint: ke, span: [row.startSprint, ke] };
}

function blank(): Item {
  return {
    title: "", kind: "Feature", phase: "", parent: "", epic: "", squad: "", skill: "", size: "",
    priority: "Should", state: "Identified", confidence: "Medium", startSprint: "", endSprint: "",
    assignees: [], assessedBy: "", productOwner: "", jira: "", jiraAlign: "", claimedFTE: null,
    claims: {}, landingMonth: null, landingYear: null, grade: null, proposed: true, cancelReason: "",
  };
}

interface FormDialogProps {
  open: boolean;
  title: string;
  saveLabel?: string;
  errors?: string[];
  onSave: () => void;
  onCancel: () => void;
  children: ReactNode;
}

const FORM_FOCUSABLE = "input, select, textarea, button";

/** ConfirmDialog asks a question; this one hosts a short form and answers with Save. */
export function FormDialog({
  open, title, saveLabel = "Save", errors = [], onSave, onCancel, children,
}: FormDialogProps) {
  const card = useRef<HTMLDivElement>(null);
  const lastActive = useRef<Element | null>(null);
  const cancel = useRef(onCancel);
  cancel.current = onCancel;
  const headingId = useId();

  useEffect(() => {
    if (!open) return undefined;
    lastActive.current = document.activeElement;
    const node = card.current;
    node?.querySelector<HTMLElement>(FORM_FOCUSABLE)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        cancel.current();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FORM_FOCUSABLE));
      if (items.length === 0) return;
      const top = items[0];
      const end = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === top || !node.contains(document.activeElement))) {
        e.preventDefault();
        end.focus();
      } else if (!e.shiftKey && (document.activeElement === end || !node.contains(document.activeElement))) {
        e.preventDefault();
        top.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    const scroll = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = scroll;
      (lastActive.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="wp-dialog-wrap">
      <div className="ccs-scrim" onClick={onCancel} aria-hidden="true" />
      <div
        ref={card}
        className="wp-dialog wp-form-dialog ccs-glass-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
      >
        <h2 id={headingId}>{title}</h2>
        {errors.length > 0 ? (
          <div className="wp-errors" role="alert">
            <p>That did not save:</p>
            <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        ) : null}
        <div className="wp-form-dialog__body">{children}</div>
        <div className="wp-dialog__actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" className="wp-btn-primary" onClick={onSave}>{saveLabel}</button>
        </div>
      </div>
    </div>
  );
}

interface NewItemProps {
  open: boolean;
  kind: NewKind;
  /** The feature a component is added under, preset when it is added from the feature itself. */
  parent?: string;
  onClose: () => void;
  onCreated: (title: string) => void;
}

/** The minimum a new item needs, by kind. Everything else is filled in on the item's own page. */
export function NewItemDialog({ open, kind, parent = "", onClose, onCreated }: NewItemProps) {
  const { data, addWork, addComponent } = useDataset();
  const [draft, setDraft] = useState<Item>(() => ({ ...blank(), kind, parent }));
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    setDraft({ ...blank(), kind, parent });
    setErrors([]);
  }, [open, kind, parent]);

  const patch = (change: Partial<Item>) => setDraft((d) => ({ ...d, ...change }));
  const features = data.work.filter((w) => w.kind === "Feature" && !w.parent);

  const save = () => {
    const item: Item = { ...draft, title: draft.title.trim() };
    if (kind === "Component") {
      const msg = addComponent(item.parent, item);
      if (msg) {
        setErrors([msg]);
        return;
      }
    } else {
      const found = validateProduct(data, item);
      if (found.length > 0) {
        setErrors(found);
        return;
      }
      addWork(item);
    }
    onClose();
    onCreated(item.title);
  };

  return (
    <FormDialog
      open={open}
      title={"New " + kind.toLowerCase()}
      saveLabel="Create"
      errors={errors}
      onSave={save}
      onCancel={onClose}
    >
      {kind === "Component" ? (
        <Field label="Part of">
          {(p) => (
            <select {...p} value={draft.parent} onChange={(e) => patch({ parent: e.target.value })}>
              <option value="">Pick a feature</option>
              {features.map((w) => <option key={w.title} value={w.title}>{w.title}</option>)}
            </select>
          )}
        </Field>
      ) : null}
      <Field label="Title">
        {(p) => <input {...p} value={draft.title} onChange={(e) => patch({ title: e.target.value })} />}
      </Field>
      {kind === "Feature" ? (
        <Field label="Outcome or epic">
          {(p) => <input {...p} value={draft.epic} onChange={(e) => patch({ epic: e.target.value })} />}
        </Field>
      ) : null}
      {kind === "Spike" ? (
        <>
          <Field label="Question" hint="What the timebox is there to answer.">
            {(p) => (
              <input
                {...p}
                value={draft.question ?? ""}
                onChange={(e) => patch({ question: e.target.value })}
              />
            )}
          </Field>
          <Field label="Part of" hint="A spike can sit under a feature, or stand on its own.">
            {(p) => (
              <select {...p} value={draft.parent} onChange={(e) => patch({ parent: e.target.value })}>
                <option value="">Nothing</option>
                {features.map((w) => <option key={w.title} value={w.title}>{w.title}</option>)}
              </select>
            )}
          </Field>
        </>
      ) : null}
      {kind === "Component" ? (
        <>
          <Field label="Skill">
            {(p) => (
              <select {...p} value={draft.skill} onChange={(e) => patch({ skill: e.target.value })}>
                <option value="">No skill yet</option>
                {skillList(data).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            )}
          </Field>
          <Field label="Size">
            {(p) => (
              <select {...p} value={draft.size} onChange={(e) => patch({ size: e.target.value })}>
                <option value="">No size yet</option>
                {Object.keys(data.settings.sizes).map((s) => (
                  <option key={s} value={s}>{s} ({data.settings.sizes[s]} MW)</option>
                ))}
              </select>
            )}
          </Field>
        </>
      ) : (
        <Field label="Squad">
          {(p) => (
            <select {...p} value={draft.squad} onChange={(e) => patch({ squad: e.target.value })}>
              <option value="">No squad yet</option>
              {data.squads.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          )}
        </Field>
      )}
      {kind === "Feature" ? (
        <Field label="Product owner">
          {(p) => (
            <select
              {...p}
              value={draft.productOwner}
              onChange={(e) => patch({ productOwner: e.target.value })}
            >
              <option value="">Nobody yet</option>
              {data.people.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
            </select>
          )}
        </Field>
      ) : null}
      {kind === "Spike" ? (
        <Field label="Timebox sprints">
          {(p) => (
            <input
              {...p}
              type="number"
              min="1"
              value={draft.timeboxSprints ?? ""}
              onChange={(e) => patch({
                timeboxSprints: e.target.value === "" ? undefined : Number(e.target.value),
              })}
            />
          )}
        </Field>
      ) : null}
    </FormDialog>
  );
}

/** The header's overflow: the one destructive action, kept off the stage action row. */
function OverflowMenu({ onRemove }: { onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setOpen(false);
      toggle.current?.focus();
    };
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div className="wp-overflow" ref={wrap}>
      <button
        type="button"
        ref={toggle}
        className="wp-stage__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More actions"
        onClick={() => setOpen(!open)}
      >
        <MoreHorizontal size={14} aria-hidden="true" />
      </button>
      {open ? (
        <div className="wp-menu" role="menu" aria-label="More actions">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onRemove();
            }}
          >
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** One proposed component, before anyone accepts it. */
interface Proposal {
  title: string;
  skill: string;
  size: string;
}

export default function WorkItem() {
  const params = useParams();
  const title = params.title ?? "";
  const { data } = useDataset();
  const item = data.work.find((w) => w.title === title);

  useEffect(() => {
    document.title = (item ? item.title : "Work item") + " · Waypoint";
  }, [item]);

  if (!item) {
    return (
      <>
        <p className="wp-eyebrow wp-section-eyebrow">Work</p>
        <div className="wp-section-head">
          <h1>Work item not found</h1>
        </div>
        <p className="wp-lede">Nothing on the Work sheet is called {title}.</p>
        <p><Link to="/work">Back to Work</Link></p>
      </>
    );
  }

  return <ItemPage key={item.title} item={item} />;
}

function ItemPage({ item }: { item: Item }) {
  const navigate = useNavigate();
  const { data, updateWork, removeWork, applyAction, addComponent } = useDataset();
  const ctx = useMemo(() => buildContext(data), [data]);
  const statuses = useMemo(() => deliveryStatuses(ctx), [ctx]);

  const [tab, setTab] = useState<Tab>(item.kind === "Component" ? "assess" : "shape");
  const [draft, setDraft] = useState<Item>(() => toDraft(item));
  const [errors, setErrors] = useState<string[]>([]);
  const [problem, setProblem] = useState("");
  const [removing, setRemoving] = useState(false);
  const [concluding, setConcluding] = useState(false);
  const [converting, setConverting] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [adding, setAdding] = useState(false);
  const [outcome, setOutcome] = useState<SpikeOutcome>(item.spikeOutcome ?? (SPIKE_OUTCOMES[0] as SpikeOutcome));
  const [findings, setFindings] = useState(item.findings ?? "");
  const [feature, setFeature] = useState({
    title: item.title, squad: item.squad, productOwner: item.productOwner,
  });
  const [reason, setReason] = useState("");
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    setDraft(toDraft(item));
  }, [item]);

  const sprints = useMemo(() => {
    const list: { num: number; label: string }[] = [];
    for (let n = ctx.firstSprint; n <= ctx.lastSprint; n += 1) {
      list.push({ num: n, label: `S${n} (from ${toISO(sprintStart(ctx, n))})` });
    }
    return list;
  }, [ctx]);

  /** Everyone still addable, the item's own squad first. */
  const addable = data.people
    .filter((x) => !draft.assignees.includes(x.name))
    .sort((a, b) => Number(b.squad === draft.squad) - Number(a.squad === draft.squad));

  const kids = data.work.filter((w) => w.parent === item.title && w.kind === "Component");
  const actions = nextActions(data, item);
  const status = statuses.get(item.title) ?? "";
  const patch = (change: Partial<Item>) => setDraft((d) => ({ ...d, ...change }));
  const errorFor = (fragment: string) => errors.find((e) => e.toLowerCase().includes(fragment));

  /** The Product form owns an idea; once the item has left the idea states, Engineering owns it. */
  const checkFor = (row: Item) =>
    (row.kind !== "Component" && IDEA_STATES.includes(row.state) ? validateProduct : validateEngineering);

  const save = () => {
    const row: Item = fromDraft({ ...draft, title: draft.title.trim() });
    const found = checkFor(row)(data, row, item.title);
    setErrors(found);
    if (found.length > 0) return;
    updateWork(item.title, row);
    if (row.title !== item.title) navigate(workPath(row.title));
  };

  const run = (id: string, payload?: Parameters<typeof applyAction>[2]) => {
    const msg = applyAction(item.title, id, payload);
    setProblem(msg);
    return msg === "";
  };

  const act = (id: string) => {
    if (id === "conclude") {
      setOutcome(item.spikeOutcome ?? (SPIKE_OUTCOMES[0] as SpikeOutcome));
      setFindings(item.findings ?? "");
      setConcluding(true);
      return;
    }
    if (id === "convert") {
      setFeature({ title: item.title, squad: item.squad, productOwner: item.productOwner });
      setConverting(true);
      return;
    }
    if (id === "cancel") {
      setReason(item.cancelReason ?? "");
      setCancelling(true);
      return;
    }
    run(id);
  };

  const convert = () => {
    if (!run("convert", { feature })) return;
    setConverting(false);
    const made = useDataset.getState().data.work.find((w) => w.convertedFrom === item.title);
    if (made) navigate(workPath(made.title));
  };

  const checkRow = fromDraft(draft);
  const check = capacityCheck(ctx, checkRow);
  /** Why there is nothing to check, in the item's own terms. */
  const noCheck = !scheduled(checkRow) ? "No sprint span yet"
    : checkRow.assignees.length === 0 ? "Nobody assigned yet"
      : kids.length > 0 ? "Its components carry the work."
        : "No MW on this item yet";
  const fits = check ? check.assignees.every((a) => a.shortfall <= 0) : false;
  const available = check ? check.assignees.reduce((t, a) => t + a.available, 0) : 0;
  const worst = check && check.assignees.length > 0
    ? check.assignees.reduce((m, a) => (a.shortfall > m.shortfall
      || (a.shortfall === m.shortfall && a.available < m.available) ? a : m))
    : null;
  const load = check && worst && worst.available > 0 ? Math.min(1, check.required / worst.available) : 0;
  const value = benefitValue(ctx, item);

  /** The prototype's own guess at a breakdown: three components off the feature's title and skill. */
  const propose = () => {
    const sizes = Object.keys(data.settings.sizes);
    const size = item.size && sizes.includes(item.size) ? item.size : sizes[0] ?? "";
    setProposals(["Discovery and design", "Build", "Test and release"].map((step) => ({
      title: item.title + ": " + step.toLowerCase(),
      skill: item.skill,
      size,
    })));
  };

  const accept = (row: Proposal) => {
    const msg = addComponent(item.title, {
      ...blank(),
      title: row.title,
      kind: "Component",
      parent: item.title,
      skill: row.skill,
      size: row.size,
      squad: item.squad,
      startSprint: item.startSprint,
      endSprint: item.endSprint,
      state: item.state,
    });
    setProblem(msg);
    if (msg === "") setProposals(proposals.filter((p) => p.title !== row.title));
  };

  const span = (row: Item) => {
    const s = scheduled(row);
    return s ? `S${s[0]} to S${s[1]}` : "Not scheduled";
  };

  const exportBreakdown = () => {
    const rows = proposals.length > 0
      ? proposals.map((p) => ({ title: p.title, skill: p.skill, size: p.size, sprints: span(item) }))
      : kids.map((k) => ({ title: k.title, skill: k.skill, size: k.size, sprints: span(k) }));
    const blob = new Blob([JSON.stringify({ feature: item.title, components: rows }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = item.title.replace(/[^\w]+/g, "-").toLowerCase() + "-breakdown.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const jiraHref = (key: string) => (data.settings.jiraBase
    ? data.settings.jiraBase.replace(/\/$/, "") + "/" + key
    : "");

  const tabs: [Tab, string][] = [
    ["shape", "Shape"],
    ["assess", "Assess"],
    ...(item.kind === "Feature" ? [["components", "Components"] as [Tab, string]] : []),
    ...(item.kind === "Feature" ? [["value", "Value"] as [Tab, string]] : []),
    ["activity", "Activity"],
  ];

  const activity: string[] = [];
  if (item.convertedFrom) activity.push("Converted from the spike " + item.convertedFrom + ".");
  if (item.spikeOutcome) {
    activity.push("Concluded " + item.spikeOutcome + (item.findings ? ": " + item.findings : "."));
  }
  if (item.convertedTo) activity.push("Converted to the feature " + item.convertedTo + ".");
  if (item.doneInSprint) activity.push("Delivered in sprint S" + item.doneInSprint + ".");
  if (item.cancelReason) activity.push("Cancelled: " + item.cancelReason);
  if (item.archivedInQuarter) activity.push("Archived in " + item.archivedInQuarter + ".");

  return (
    <div className="wp-page wp-item">
      <p className="wp-crumb">
        <Link to="/work">Work</Link>
        <span aria-hidden="true"> / </span>
        <span>{item.title}</span>
      </p>

      <div className="wp-item__head">
        <Pill>{item.kind}</Pill>
        <h1>{item.title}</h1>
        <Pill tone="accent">{item.state}</Pill>
        <span className="wp-muted">{item.squad || "No squad yet"}</span>
        <span className="wp-muted">{item.productOwner || "No owner yet"}</span>
      </div>

      <div className="wp-item__stage">
        <Stepper label="Lifecycle stage" steps={STEPS} current={phaseOf(item)} />
        <div className="wp-stage__actions">
          {actions.map((action, i) => (
            <button
              key={action.id}
              type="button"
              className={action.id === "cancel"
                ? "wp-stage__btn wp-stage__btn--quiet"
                : i === 0 ? "wp-btn-primary" : "wp-stage__btn"}
              onClick={() => act(action.id)}
            >
              {action.label}
            </button>
          ))}
          <OverflowMenu onRemove={() => setRemoving(true)} />
        </div>
      </div>

      {problem ? <p className="wp-refusal" role="alert">{problem}</p> : null}

      <div className="wp-item__body">
        <div className="wp-item__main">
          <div className="wp-tabs" role="group" aria-label="Work item sections">
            {tabs.map(([id, label]) => (
              <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>

          <div className="wp-item__panel wp-fill">
            {errors.length > 0 ? (
              <div className="wp-errors" role="alert">
                <p>That did not save:</p>
                <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
              </div>
            ) : null}

            {tab === "shape" ? (
              <div className="wp-item__form">
                {item.spikeOutcome ? (
                  <div className="wp-card wp-item__card">
                    <div className="wp-card-title">Outcome</div>
                    <Pill tone={outcomeTone(item.spikeOutcome)}>{item.spikeOutcome}</Pill>
                    <p className="wp-item__note">{item.findings || "No findings written up."}</p>
                  </div>
                ) : null}
                <div className="wp-item__wide">
                  <Field label="Title" error={errorFor("title")}>
                    {(p) => (
                      <input {...p} value={draft.title} onChange={(e) => patch({ title: e.target.value })} />
                    )}
                  </Field>
                </div>
                <Field label="Kind" hint="The kind is set when the item is created.">
                  {(p) => <input {...p} value={draft.kind} readOnly />}
                </Field>
                {item.kind === "Spike" ? (
                  <>
                    <div className="wp-item__wide">
                      <Field label="Question">
                        {(p) => (
                          <input
                            {...p}
                            value={draft.question ?? ""}
                            onChange={(e) => patch({ question: e.target.value })}
                          />
                        )}
                      </Field>
                    </div>
                    <Field label="Part of" error={errorFor("part of")}>
                      {(p) => (
                        <select {...p} value={draft.parent} onChange={(e) => patch({ parent: e.target.value })}>
                          <option value="">Nothing</option>
                          {data.work
                            .filter((w) => w.kind === "Feature" && w.title !== item.title)
                            .map((w) => <option key={w.title} value={w.title}>{w.title}</option>)}
                        </select>
                      )}
                    </Field>
                    <Field label="Timebox sprints">
                      {(p) => (
                        <input
                          {...p}
                          type="number"
                          min="1"
                          value={draft.timeboxSprints ?? ""}
                          onChange={(e) => patch({
                            timeboxSprints: e.target.value === "" ? undefined : Number(e.target.value),
                          })}
                        />
                      )}
                    </Field>
                  </>
                ) : null}
                <Field label="Outcome or epic" hint="The Jira Align reference this sits under.">
                  {(p) => <input {...p} value={draft.epic} onChange={(e) => patch({ epic: e.target.value })} />}
                </Field>
                <Field label="Jira Align key">
                  {(p) => (
                    <input
                      {...p}
                      value={draft.jiraAlign}
                      onChange={(e) => patch({ jiraAlign: e.target.value })}
                    />
                  )}
                </Field>
                <Field label="Product owner" error={errorFor("product owner")}>
                  {(p) => (
                    <select
                      {...p}
                      value={draft.productOwner}
                      onChange={(e) => patch({ productOwner: e.target.value })}
                    >
                      <option value="">Nobody yet</option>
                      {data.people.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="State" error={errorFor("state")}>
                  {(p) => (
                    <select {...p} value={draft.state} onChange={(e) => patch({ state: e.target.value })}>
                      {(item.kind !== "Component" && IDEA_STATES.includes(item.state)
                        ? IDEA_STATES
                        : stateNames(data)).map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  )}
                </Field>
                {impactOf(data, draft.state) === "Removed" ? (
                  <div className="wp-item__wide">
                    <Field label="Cancellation reason" error={errorFor("cancelled item")}>
                      {(p) => (
                        <textarea
                          {...p}
                          value={draft.cancelReason ?? ""}
                          onChange={(e) => patch({ cancelReason: e.target.value })}
                        />
                      )}
                    </Field>
                  </div>
                ) : null}
                <div className="wp-item__wide">
                  <Field label="Notes">
                    {(p) => (
                      <textarea
                        {...p}
                        value={draft.notes ?? ""}
                        onChange={(e) => patch({ notes: e.target.value })}
                      />
                    )}
                  </Field>
                </div>
              </div>
            ) : null}

            {tab === "assess" ? (
              <div className="wp-item__form">
                <div className="wp-card wp-item__card">
                  <div className="wp-card-title">Capacity check</div>
                  {!check ? <p className="wp-muted">{noCheck}</p> : check.outside ? (
                    <p className="wp-muted">Those sprints fall outside this quarter.</p>
                  ) : (
                    <>
                      <p>
                        {`Finishes ${check.says} · `}
                        {fits || !worst
                          ? "fits"
                          : `${worst.shortfall.toFixed(2)} MW short for ${worst.name}`}
                      </p>
                      {worst && worst.available > 0 ? (
                        <div className="wp-util-bar">
                          <span
                            className={"wp-util-bar__fill wp-util-bar__fill--" + (fits ? "good" : "bad")}
                            style={{ width: load * 100 + "%" }}
                          />
                        </div>
                      ) : <p className="wp-muted">No capacity</p>}
                      <p className="wp-item__note">
                        {`${check.total.toFixed(2)} MW of work against ${available.toFixed(2)} MW free.`}
                      </p>
                    </>
                  )}
                </div>
                <Field label="Squad" error={errorFor("squad")}>
                  {(p) => (
                    <select {...p} value={draft.squad} onChange={(e) => patch({ squad: e.target.value })}>
                      <option value="">No squad yet</option>
                      {data.squads.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="Skill" error={errorFor("skill")}>
                  {(p) => (
                    <select {...p} value={draft.skill} onChange={(e) => patch({ skill: e.target.value })}>
                      <option value="">No skill yet</option>
                      {skillList(data).map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="Size" error={errorFor("size")}>
                  {(p) => (
                    <select {...p} value={draft.size} onChange={(e) => patch({ size: e.target.value })}>
                      <option value="">No size yet</option>
                      {Object.keys(data.settings.sizes).map((s) => (
                        <option key={s} value={s}>{s} ({data.settings.sizes[s]} MW)</option>
                      ))}
                    </select>
                  )}
                </Field>
                <Field label="MW override" error={errorFor("mw override")}>
                  {(p) => (
                    <input
                      {...p}
                      type="number"
                      step="0.5"
                      value={draft.sizeOverride ?? ""}
                      onChange={(e) => patch({
                        sizeOverride: e.target.value === "" ? undefined : Number(e.target.value),
                      })}
                    />
                  )}
                </Field>
                <Field label="Business grade" hint="The grade or blend the released FTE is valued at.">
                  {(p) => (
                    <select
                      {...p}
                      value={draft.grade ?? ""}
                      onChange={(e) => patch({ grade: e.target.value || null })}
                    >
                      <option value="">No grade yet</option>
                      {data.settings.grades.map((g) => <option key={g.grade} value={g.grade}>{g.grade}</option>)}
                      {data.settings.blends.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="Priority">
                  {(p) => (
                    <select {...p} value={draft.priority} onChange={(e) => patch({ priority: e.target.value })}>
                      {["Must", "Should", "Could", "Won't"].map((x) => (
                        <option key={x} value={x}>{x}</option>
                      ))}
                    </select>
                  )}
                </Field>
                <Field label="Confidence">
                  {(p) => (
                    <select
                      {...p}
                      value={draft.confidence}
                      onChange={(e) => patch({ confidence: e.target.value })}
                    >
                      {["Low", "Medium", "High"].map((x) => <option key={x} value={x}>{x}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="Start sprint" error={errorFor("start sprint")}>
                  {(p) => (
                    <select
                      {...p}
                      value={draft.startSprint === "" ? "" : String(draft.startSprint)}
                      onChange={(e) => patch({
                        startSprint: e.target.value === "" ? "" : Number(e.target.value),
                      })}
                    >
                      <option value="">Not scheduled</option>
                      {sprints.map((s) => <option key={s.num} value={s.num}>{s.label}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="End sprint" error={errorFor("end sprint")}>
                  {(p) => (
                    <select
                      {...p}
                      value={draft.endSprint === "" ? "" : String(draft.endSprint)}
                      onChange={(e) => patch({
                        endSprint: e.target.value === "" ? "" : Number(e.target.value),
                      })}
                    >
                      <option value="">Not scheduled</option>
                      {sprints.map((s) => <option key={s.num} value={s.num}>{s.label}</option>)}
                    </select>
                  )}
                </Field>
                <div className="wp-item__wide wp-assignees">
                  <span className="wp-assignees__label">Assignees</span>
                  <ul className="wp-assignees__chips">
                    {draft.assignees.length === 0 ? (
                      <li className="wp-muted">Nobody assigned</li>
                    ) : draft.assignees.map((name) => (
                      <li key={name}>
                        <Pill>
                          {name}
                          <button
                            type="button"
                            className="wp-assignees__drop"
                            aria-label={"Remove " + name}
                            onClick={() => patch({
                              assignees: draft.assignees.filter((n) => n !== name),
                            })}
                          >
                            ×
                          </button>
                        </Pill>
                      </li>
                    ))}
                  </ul>
                  <Field label="Add person" hint="Up to three people" error={errorFor("assignees")}>
                    {(p) => (
                      <select
                        {...p}
                        value=""
                        disabled={draft.assignees.length >= MAX_ASSIGNEES}
                        onChange={(e) => {
                          if (e.target.value === "") return;
                          patch({ assignees: [...draft.assignees, e.target.value] });
                        }}
                      >
                        <option value="">Pick a person</option>
                        {addable.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
                      </select>
                    )}
                  </Field>
                </div>
                <Field label="Assessed by" error={errorFor("assessed by")}>
                  {(p) => (
                    <select
                      {...p}
                      value={draft.assessedBy}
                      onChange={(e) => patch({ assessedBy: e.target.value })}
                    >
                      <option value="">Nobody yet</option>
                      {data.people.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="Jira key">
                  {(p) => <input {...p} value={draft.jira} onChange={(e) => patch({ jira: e.target.value })} />}
                </Field>
              </div>
            ) : null}

            {tab === "components" ? (
              <>
                <div className="wp-item__panel-head">
                  <h2 className="wp-h2">Components</h2>
                  <button type="button" className="wp-stage__btn" onClick={() => setAdding(true)}>
                    <Plus size={14} aria-hidden="true" />
                    Add component
                  </button>
                </div>
                <table className="wp-table">
                  <caption className="sr-only">
                    The components this feature is broken into, with the MW each one charges.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Skill</th>
                      <th scope="col">Size · MW</th>
                      <th scope="col">Sprints</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kids.length === 0 ? (
                      <tr><td colSpan={5}>No components yet.</td></tr>
                    ) : kids.map((k) => {
                      const kidStatus = statuses.get(k.title) ?? "";
                      return (
                        <tr key={k.title}>
                          <td><Link to={workPath(k.title)}>{k.title}</Link></td>
                          <td>{k.skill || "—"}</td>
                          <td>{(k.size || "No size yet") + " · " + workMW(ctx, k).toFixed(2) + " MW"}</td>
                          <td>{span(k)}</td>
                          <td>
                            {kidStatus
                              ? <Pill tone={statusTone(kidStatus)}>{kidStatus}</Pill>
                              : <span className="wp-muted">Not started</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={5}>
                        {`Roll-up ${totalMW(ctx, item).toFixed(2)} MW against the feature's own `
                          + `${ownMW(ctx, item).toFixed(2)} MW.`}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </>
            ) : null}

            {tab === "value" ? (
              <>
                <div className="wp-card wp-item__card">
                  <div className="wp-card-title">What the claim is worth</div>
                  <dl className="wp-item__claims">
                    <div><dt>In-year</dt><dd>{gbp(value.inYear)}</dd></div>
                    <div><dt>Recorded</dt><dd>{gbp(value.recorded)}</dd></div>
                    <div><dt>Rate</dt><dd>{gbp(value.rate)}</dd></div>
                  </dl>
                </div>
                <Field label="FTE released" error={errorFor("fte released")}>
                  {(p) => (
                    <input
                      {...p}
                      type="number"
                      step="0.1"
                      value={draft.claimedFTE ?? ""}
                      onChange={(e) => patch({
                        claimedFTE: e.target.value === "" ? null : Number(e.target.value),
                      })}
                    />
                  )}
                </Field>
                {CLAIM_TYPES.map(([key, label]) => (
                  <Field key={key} label={label} error={errorFor("benefit")}>
                    {(p) => (
                      <input
                        {...p}
                        type="number"
                        step="0.1"
                        value={draft.claims[key] ?? ""}
                        onChange={(e) => {
                          const claims = { ...draft.claims };
                          if (e.target.value === "") delete claims[key];
                          else claims[key] = Number(e.target.value);
                          patch({ claims });
                        }}
                      />
                    )}
                  </Field>
                ))}
                <Field label="Landing month" error={errorFor("landing month")}>
                  {(p) => (
                    <select
                      {...p}
                      value={draft.landingMonth ?? ""}
                      onChange={(e) => patch({ landingMonth: e.target.value || null })}
                    >
                      <option value="">No month yet</option>
                      {MONTH_NAMES.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="Landing year">
                  {(p) => (
                    <input
                      {...p}
                      type="number"
                      value={draft.landingYear ?? ""}
                      onChange={(e) => patch({
                        landingYear: e.target.value === "" ? null : Number(e.target.value),
                      })}
                    />
                  )}
                </Field>
                <button type="button" className="wp-btn-primary" onClick={save}>Save</button>
              </>
            ) : null}

            {tab === "activity" ? (
              activity.length === 0
                ? <p className="wp-muted">Nothing has happened to this item yet.</p>
                : <ul className="wp-item__activity">{activity.map((a) => <li key={a}>{a}</li>)}</ul>
            ) : null}
          </div>

          {tab === "shape" || tab === "assess" ? (
            <div className="wp-item__footer">
              <button
                type="button"
                className="wp-stage__btn"
                onClick={() => {
                  setDraft(toDraft(item));
                  setErrors([]);
                }}
              >
                Discard
              </button>
              <button type="button" className="wp-btn-primary" onClick={save}>Save</button>
            </div>
          ) : null}
        </div>

        <div className="wp-item__rail">
          <div className="wp-card wp-item__card">
            <div className="wp-card-title">At a glance</div>
            <dl className="wp-item__claims">
              <div><dt>MW this quarter</dt><dd>{workMW(ctx, item).toFixed(2)}</dd></div>
              <div>
                <dt>Own · roll-up</dt>
                <dd>{ownMW(ctx, item).toFixed(2) + " · " + totalMW(ctx, item).toFixed(2)}</dd>
              </div>
              <div><dt>Commitment</dt><dd>{commitment(item)}</dd></div>
              <div><dt>Sprints</dt><dd>{span(item)}</dd></div>
              <div>
                <dt>Delivery</dt>
                <dd>
                  {status
                    ? <Pill tone={statusTone(status)}>{status}</Pill>
                    : <span className="wp-muted">Not started</span>}
                </dd>
              </div>
            </dl>
            <ul className="wp-item__people">
              {item.assignees.length === 0 ? (
                <li className="wp-muted">Nobody assigned</li>
              ) : item.assignees.map((name) => (
                <li key={name}>
                  <Avatar name={name} />
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="wp-card wp-item__card">
            <div className="wp-card-title">Source</div>
            {item.jira ? (
              <>
                <p>
                  {jiraHref(item.jira)
                    ? <a href={jiraHref(item.jira)}>{item.jira}</a>
                    : item.jira}
                </p>
                <p className="wp-item__note">Pulled from Jira.</p>
                <p className="wp-item__note">Read only here.</p>
              </>
            ) : <p className="wp-muted">Not in Jira yet</p>}
            {item.convertedFrom ? (
              <p>
                Converted from <Link to={workPath(item.convertedFrom)}>{item.convertedFrom}</Link>
              </p>
            ) : null}
            {item.convertedTo ? (
              <p>Converted to <Link to={workPath(item.convertedTo)}>{item.convertedTo}</Link></p>
            ) : null}
          </div>

          <div className="wp-card wp-item__card">
            <div className="wp-card-title">
              Break down with Copilot
              <Pill tone="accent">Prototype</Pill>
            </div>
            <p className="wp-item__note">
              Proposes components for this feature; export the breakdown for Rovo to create the tickets.
            </p>
            <p className="wp-item__note">A prototype of the agent surface, not a live agent.</p>
            <div className="wp-item__breakdown-actions">
              <button type="button" className="wp-stage__btn" onClick={propose}>
                <Sparkles size={14} aria-hidden="true" />
                Propose components
              </button>
              <button type="button" className="wp-stage__btn" onClick={exportBreakdown}>
                <Download size={14} aria-hidden="true" />
                Export breakdown
              </button>
            </div>
            {kids.length > 0 && proposals.length === 0 ? (
              <p className="wp-item__note">This feature is already broken down.</p>
            ) : null}
            {proposals.map((row, i) => (
              <div className="wp-proposal" key={row.title}>
                <Field label={"Proposed component " + (i + 1)}>
                  {(p) => (
                    <input
                      {...p}
                      value={row.title}
                      onChange={(e) => setProposals(proposals.map((x, j) => (
                        j === i ? { ...x, title: e.target.value } : x
                      )))}
                    />
                  )}
                </Field>
                <button type="button" className="wp-stage__btn" onClick={() => accept(row)}>
                  {"Accept " + row.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewItemDialog
        open={adding}
        kind="Component"
        parent={item.title}
        onClose={() => setAdding(false)}
        onCreated={() => setAdding(false)}
      />

      <FormDialog
        open={concluding}
        title="Conclude this spike"
        saveLabel="Record the outcome"
        onCancel={() => setConcluding(false)}
        onSave={() => {
          if (run("conclude", { outcome, findings })) setConcluding(false);
        }}
      >
        <Field label="Outcome">
          {(p) => (
            <select {...p} value={outcome} onChange={(e) => setOutcome(e.target.value as SpikeOutcome)}>
              {SPIKE_OUTCOMES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          )}
        </Field>
        <Field label="Findings">
          {(p) => <textarea {...p} value={findings} onChange={(e) => setFindings(e.target.value)} />}
        </Field>
      </FormDialog>

      <FormDialog
        open={converting}
        title="Convert to a feature"
        saveLabel="Create the feature"
        onCancel={() => setConverting(false)}
        onSave={convert}
      >
        <Field label="Feature title">
          {(p) => (
            <input
              {...p}
              value={feature.title}
              onChange={(e) => setFeature({ ...feature, title: e.target.value })}
            />
          )}
        </Field>
        <Field label="Squad">
          {(p) => (
            <select
              {...p}
              value={feature.squad}
              onChange={(e) => setFeature({ ...feature, squad: e.target.value })}
            >
              <option value="">No squad yet</option>
              {data.squads.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          )}
        </Field>
        <Field label="Product owner">
          {(p) => (
            <select
              {...p}
              value={feature.productOwner}
              onChange={(e) => setFeature({ ...feature, productOwner: e.target.value })}
            >
              <option value="">Nobody yet</option>
              {data.people.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
            </select>
          )}
        </Field>
      </FormDialog>

      <FormDialog
        open={cancelling}
        title="Cancel this item"
        saveLabel="Move to Cancelled"
        onCancel={() => setCancelling(false)}
        onSave={() => {
          if (run("cancel", { reason })) setCancelling(false);
        }}
      >
        <Field label="Cancellation reason" hint="The workbook will not cancel an item without one.">
          {(p) => <textarea {...p} value={reason} onChange={(e) => setReason(e.target.value)} />}
        </Field>
      </FormDialog>

      <ConfirmDialog
        open={removing}
        title="Remove this item"
        body={`${item.title} comes off the Work sheet, with any bookings against it. Undo puts it back.`}
        onCancel={() => setRemoving(false)}
        onConfirm={() => {
          setRemoving(false);
          removeWork(item.title);
          navigate("/work");
        }}
      />
    </div>
  );
}
