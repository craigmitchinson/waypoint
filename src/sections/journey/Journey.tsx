// Journey: the work item journey end to end, as a reference for the Power Apps build. The list
// files every item by the stage it sits in, and the item view carries the stepper, the stage's own
// tab, and one Next step card holding the single forward action. Everything is local state.
import { useReducer, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Section from "../../pages/Section";
import "./journey.css";
import {
  initialState, nextStep, phaseLabel, reducer, stageOf, stepLabel, tabsFor, trackFor, STAGE_TABS,
} from "./journeyState";
import type { JourneyItem, Phase, Stage, TabId } from "./journeyState";
import { DataTable, Eyebrow, Field, Pill } from "../../ui";
import type { Column, PillTone } from "../../ui";

const PEOPLE = [
  "Ada Okafor", "Dan Whitfield", "Joe Bannerman", "Marta Nowak", "Priya Nair", "Rhian Davies",
  "Tom Whelan",
];
const SQUADS = ["Automation", "Customer Systems", "Finance Systems"];
const SIZES = ["Small", "Medium", "Large", "Extra large"];
const PRIORITIES = ["Must", "Should", "Could"];
const STATES = ["Identified", "Ready", "In progress", "In test", "Released", "Concluded"];
const SKILLS = ["Power Apps", "Power Automate", "Dataverse", "Integration"];
const SOURCES = ["Front door", "Direct", "Jira"] as const;
const CLAIM_TYPES = ["Hours saved", "Cost avoided", "Revenue"];

/** Who the mock acts as, so Assign to me has somebody to name. */
const ME = "Ada Okafor";

const TBC = "TBC";

const stageTone = (stage: Stage): PillTone => {
  if (stage === "Released") return "good";
  if (stage === "Closed") return "neutral";
  return "accent";
};

const statusTone = (item: JourneyItem): PillTone => {
  if (item.phase === "Stopped") return "bad";
  if (item.phase === "Validated") return "good";
  if (item.phase === "Release") return "good";
  return "accent";
};

/** The first tab an item opens on: the stage it is waiting in. */
function openTab(item: JourneyItem): TabId {
  const tabs = tabsFor(item).map((t) => t.id);
  const wanted: TabId = item.phase === "Shaping" ? "intake"
    : item.phase === "Assessment" ? "assess"
      : item.phase === "Delivery" ? "delivery"
        : item.phase === "Release" ? "value" : "activity";
  return tabs.includes(wanted) ? wanted : tabs[tabs.length - 1];
}

export default function Journey() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [stage, setStage] = useState<Stage | "">("");
  const [tab, setTab] = useState<TabId>("intake");
  const [reason, setReason] = useState("");

  const item = state.draft;

  const open = (row: JourneyItem) => {
    dispatch({ type: "select", id: row.id });
    setTab(openTab(row));
    setReason("");
  };

  const back = () => {
    dispatch({ type: "back" });
    setReason("");
  };

  if (!item) {
    return (
      <Section
        eyebrow="Reference flow"
        title="Journey"
        lede="How a work item travels, from the front door to a validated benefit."
      >
        <ItemList
          items={state.items}
          stage={stage}
          onStage={setStage}
          onOpen={open}
        />
      </Section>
    );
  }

  const step = nextStep(item);
  const tabs = tabsFor(item);
  const shown = tabs.some((t) => t.id === tab) ? tab : tabs[0].id;
  const patch = (fields: Partial<JourneyItem>) => dispatch({ type: "edit", patch: fields });

  return (
    <Section
      eyebrow="Reference flow"
      title="Journey"
      lede="How a work item travels, from the front door to a validated benefit."
    >
      <div className="wp-jr-item">
        <div className="wp-jr-head">
          <button type="button" className="wp-jr-back" onClick={back}>
            <ArrowLeft size={14} aria-hidden="true" />
            Back to the list
          </button>
          <Pill>{item.kind}</Pill>
          <div className="wp-jr-head__title">
            <p className="wp-h2">{item.title}</p>
            {item.parent ? <p className="wp-jr-parent">{"part of " + item.parent}</p> : null}
          </div>
          <Pill tone={statusTone(item)}>{phaseLabel(item) + " · " + item.state}</Pill>
          <Pill tone={item.commitment === "Committed" ? "brand" : "neutral"}>{item.commitment}</Pill>
        </div>

        <Track item={item} />

        {state.notice ? (
          <p className="wp-jr-notice" role="status">{state.notice}</p>
        ) : null}

        <div className="wp-jr-body">
          <div className="wp-jr-main">
            <div className="wp-tabs" role="group" aria-label="Work item sections">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={shown === t.id}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="wp-jr-panel wp-fill">
              {shown === "intake" ? <IntakeTab item={item} patch={patch} dispatch={dispatch} /> : null}
              {shown === "assess" ? <AssessTab item={item} patch={patch} /> : null}
              {shown === "delivery" ? <DeliveryTab item={item} patch={patch} /> : null}
              {shown === "value" ? <ValueTab item={item} dispatch={dispatch} /> : null}
              {shown === "activity" ? <ActivityTab item={item} /> : null}

              {shown === "activity" ? null : (
                <div className="wp-jr-save">
                  <button
                    type="button"
                    className="wp-jr-btn"
                    onClick={() => dispatch({ type: "saveDraft" })}
                  >
                    Save draft
                  </button>
                  <span className="wp-muted">A draft saves at any time and moves nothing on.</span>
                </div>
              )}
            </div>
          </div>

          <div className="wp-jr-rail">
            <NextStepCard
              item={item}
              reason={reason}
              onReason={setReason}
              onAdvance={() => dispatch({ type: "advance" })}
              onStop={() => {
                dispatch({ type: "stop", reason });
                setReason("");
              }}
              onReopen={() => {
                dispatch({ type: "reopen", note: reason });
                setReason("");
              }}
            />
            <Glance item={item} step={step} />
          </div>
        </div>
      </div>
    </Section>
  );
}

interface ListProps {
  items: JourneyItem[];
  stage: Stage | "";
  onStage: (stage: Stage | "") => void;
  onOpen: (item: JourneyItem) => void;
}

function ItemList({ items, stage, onStage, onOpen }: ListProps) {
  const rows = items.filter((w) => !stage || stageOf(w) === stage);

  const columns: Column<JourneyItem>[] = [
    {
      key: "title",
      label: "Title",
      sort: (w) => w.title,
      cell: (w) => (
        <span className="wp-jr-cell">
          <button type="button" className="wp-link-btn" onClick={() => onOpen(w)}>{w.title}</button>
          {w.parent ? <span className="wp-jr-parent">{"part of " + w.parent}</span> : null}
        </span>
      ),
    },
    { key: "kind", label: "Type", sort: (w) => w.kind, cell: (w) => <Pill>{w.kind}</Pill> },
    {
      key: "stage",
      label: "Stage",
      sort: (w) => stageOf(w),
      cell: (w) => <Pill tone={stageTone(stageOf(w))}>{phaseLabel(w)}</Pill>,
    },
    { key: "state", label: "State", sort: (w) => w.state, cell: (w) => <span>{w.state}</span> },
    {
      key: "squad",
      label: "Squad",
      sort: (w) => w.squad,
      cell: (w) => <span className="wp-nowrap">{w.squad || TBC}</span>,
    },
    {
      key: "assessor",
      label: "Assessor",
      sort: (w) => w.assessor,
      cell: (w) => <span className="wp-nowrap">{w.assessor || TBC}</span>,
    },
    {
      key: "delivery",
      label: "Delivery",
      sort: (w) => w.deliveryLead,
      cell: (w) => <span className="wp-nowrap">{w.deliveryLead || TBC}</span>,
    },
    {
      key: "source",
      label: "Source",
      sort: (w) => w.source,
      cell: (w) => <span className="wp-nowrap">{w.source}</span>,
    },
  ];

  return (
    <>
      <div className="wp-tabs" role="group" aria-label="Filter by stage">
        <button type="button" aria-pressed={stage === ""} onClick={() => onStage("")}>
          {"All " + items.length}
        </button>
        {STAGE_TABS.map((name) => {
          const count = items.filter((w) => stageOf(w) === name).length;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={stage === name}
              onClick={() => onStage(stage === name ? "" : name)}
            >
              {name + " " + count}
            </button>
          );
        })}
      </div>

      <div className="wp-jr-register wp-fill">
        <DataTable
          caption="The work items in this reference flow, with the stage each one sits in."
          columns={columns}
          rows={rows}
          rowKey={(w) => w.id}
          action={{ label: () => "Open", onClick: onOpen }}
          empty="No items at that stage."
        />
      </div>
    </>
  );
}

/** The stepper: ticks behind, a filled marker here, dimmed ahead, and Stopped where it stopped. */
function Track({ item }: { item: JourneyItem }) {
  const track = trackFor(item);
  const stopped = item.phase === "Stopped";
  const at = stopped
    ? Math.max(0, track.indexOf((item.stoppedAt || "Shaping") as Phase))
    : Math.max(0, track.indexOf(item.phase));

  return (
    <ol className={"wp-jr-track" + (stopped ? " is-stopped" : "")} aria-label="Stage">
      {track.map((phase, i) => {
        const done = i < at;
        const here = i === at;
        const word = stopped && here ? "Stopped here" : done ? "Done" : here ? "Current step" : "To come";
        return (
          <li
            key={phase}
            className={"wp-jr-track__step" + (done ? " is-done" : "") + (here ? " is-current" : "")}
            aria-current={here && !stopped ? "step" : undefined}
          >
            <span className="wp-jr-track__mark" aria-hidden="true">
              {stopped && here ? "×" : done ? "✓" : here ? "●" : "○"}
            </span>
            <span className="wp-jr-track__name">
              {stopped && here ? "Stopped at " + stepLabel(item, phase) : stepLabel(item, phase)}
            </span>
            <span className="sr-only">{", " + word}</span>
          </li>
        );
      })}
    </ol>
  );
}

type Patch = (fields: Partial<JourneyItem>) => void;
type Dispatch = (action: Parameters<typeof reducer>[1]) => void;

function IntakeTab({ item, patch, dispatch }: { item: JourneyItem; patch: Patch; dispatch: Dispatch }) {
  const editable = item.phase === "Shaping";
  return (
    <div className="wp-jr-form">
      <Field label="Source">
        {(p) => (
          <select
            {...p}
            value={item.source}
            onChange={(e) => patch({ source: e.target.value as JourneyItem["source"] })}
          >
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </Field>
      <Field label="Kind" hint="The kind is set when the item is created.">
        {(p) => <input {...p} value={item.kind} readOnly />}
      </Field>
      <Field label="Product owner">
        {(p) => (
          <select {...p} value={item.productOwner} onChange={(e) => patch({ productOwner: e.target.value })}>
            <option value="">Nobody yet</option>
            {PEOPLE.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </Field>
      <Field label="Priority">
        {(p) => (
          <select {...p} value={item.priority} onChange={(e) => patch({ priority: e.target.value })}>
            <option value="">Not set</option>
            {PRIORITIES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </Field>
      <div className="wp-jr-wide">
        <Field label={item.kind === "Spike" ? "Question" : "Outcome"}>
          {(p) => (
            <textarea
              {...p}
              rows={2}
              value={item.kind === "Spike" ? item.question : item.outcome}
              onChange={(e) => patch(item.kind === "Spike"
                ? { question: e.target.value }
                : { outcome: e.target.value })}
            />
          )}
        </Field>
      </div>
      <div className="wp-jr-wide">
        <Field label="Notes">
          {(p) => (
            <textarea {...p} rows={2} value={item.notes} onChange={(e) => patch({ notes: e.target.value })} />
          )}
        </Field>
      </div>
      {item.kind === "Feature" ? (
        <div className="wp-jr-wide wp-card wp-jr-card">
          <div className="wp-card-title">Benefit claims</div>
          <p className="wp-muted">A feature cannot be committed without at least one claim carrying a value.</p>
          {item.claims.map((claim) => (
            <div className="wp-jr-claim" key={claim.id}>
              <Field label="Claim">
                {(p) => (
                  <select
                    {...p}
                    value={claim.type}
                    onChange={(e) => dispatch({ type: "claim", id: claim.id, patch: { type: e.target.value } })}
                  >
                    {CLAIM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                )}
              </Field>
              <Field label="Value">
                {(p) => (
                  <input
                    {...p}
                    type="number"
                    value={claim.value}
                    onChange={(e) => dispatch({
                      type: "claim",
                      id: claim.id,
                      patch: { value: Number(e.target.value) || 0 },
                    })}
                  />
                )}
              </Field>
            </div>
          ))}
        </div>
      ) : null}
      {editable ? null : (
        <p className="wp-jr-wide wp-muted">Intake is behind this item now, so the flow reads it rather than asks for it.</p>
      )}
    </div>
  );
}

function AssessTab({ item, patch }: { item: JourneyItem; patch: Patch }) {
  return (
    <div className="wp-jr-form">
      <Field label="Assessor" hint="Chosen here, not at intake.">
        {(p) => (
          <select {...p} value={item.assessor} onChange={(e) => patch({ assessor: e.target.value })}>
            <option value="">{TBC}</option>
            {PEOPLE.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </Field>
      <div className="wp-jr-assign">
        <button type="button" className="wp-jr-btn" onClick={() => patch({ assessor: ME })}>
          Assign to me
        </button>
      </div>
      <Field label="Squad">
        {(p) => (
          <select {...p} value={item.squad} onChange={(e) => patch({ squad: e.target.value })}>
            <option value="">{TBC}</option>
            {SQUADS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </Field>
      <Field label="Size">
        {(p) => (
          <select {...p} value={item.size} onChange={(e) => patch({ size: e.target.value })}>
            <option value="">No size yet</option>
            {SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </Field>
      <Field label="Skill">
        {(p) => (
          <select {...p} value={item.skill} onChange={(e) => patch({ skill: e.target.value })}>
            <option value="">Not set</option>
            {SKILLS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </Field>
      <Field label="Assessed on" hint="Stamped when a draft with a size is saved.">
        {(p) => <input {...p} value={item.assessedOn || "Not yet"} readOnly />}
      </Field>
      <div className="wp-jr-wide">
        <Field label="Assessment notes">
          {(p) => (
            <textarea {...p} rows={2} value={item.notes} onChange={(e) => patch({ notes: e.target.value })} />
          )}
        </Field>
      </div>
    </div>
  );
}

function DeliveryTab({ item, patch }: { item: JourneyItem; patch: Patch }) {
  return (
    <div className="wp-jr-form">
      <Field label="Delivery lead">
        {(p) => (
          <select {...p} value={item.deliveryLead} onChange={(e) => patch({ deliveryLead: e.target.value })}>
            <option value="">{TBC}</option>
            {PEOPLE.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </Field>
      <Field label="State">
        {(p) => (
          <select {...p} value={item.state} onChange={(e) => patch({ state: e.target.value })}>
            {STATES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </Field>
      <Field label="Open components" hint="A release with components still open is allowed and recorded.">
        {(p) => (
          <input
            {...p}
            type="number"
            min={0}
            value={item.openComponents}
            onChange={(e) => patch({ openComponents: Math.max(0, Number(e.target.value) || 0) })}
          />
        )}
      </Field>
      <Field label="Squad" hint="Set at assessment.">
        {(p) => <input {...p} value={item.squad || TBC} readOnly />}
      </Field>
    </div>
  );
}

function ValueTab({ item, dispatch }: { item: JourneyItem; dispatch: Dispatch }) {
  return (
    <div className="wp-jr-form">
      <div className="wp-jr-wide wp-card wp-jr-card">
        <div className="wp-card-title">Actuals</div>
        <p className="wp-muted">Validation asks for an actual against every claim, and never edits one silently.</p>
        {item.claims.map((claim) => (
          <div className="wp-jr-claim" key={claim.id}>
            <Field label={claim.type + " claimed"}>
              {(p) => <input {...p} value={claim.value.toLocaleString("en-GB")} readOnly />}
            </Field>
            <Field label={claim.type + " actual"}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={claim.actual ?? ""}
                  onChange={(e) => dispatch({
                    type: "claim",
                    id: claim.id,
                    patch: { actual: e.target.value === "" ? null : Number(e.target.value) },
                  })}
                />
              )}
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityTab({ item }: { item: JourneyItem }) {
  return (
    <ol className="wp-jr-activity">
      {item.activity.map((row) => (
        <li key={row.id}>
          <span className="wp-jr-activity__when">{row.when}</span>
          <span className="wp-jr-activity__move">
            {stepLabel(item, row.from) + " to " + (row.to === "Stopped" ? "Stopped" : stepLabel(item, row.to))}
          </span>
          <span>{row.note}</span>
          <span className="wp-muted">{row.who}</span>
        </li>
      ))}
    </ol>
  );
}

interface NextProps {
  item: JourneyItem;
  reason: string;
  onReason: (value: string) => void;
  onAdvance: () => void;
  onStop: () => void;
  onReopen: () => void;
}

function NextStepCard({ item, reason, onReason, onAdvance, onStop, onReopen }: NextProps) {
  const step = nextStep(item);
  const blocked = step.gaps.length > 0;
  const gapsId = "wp-jr-gaps-" + item.id;

  return (
    <div className="wp-card wp-jr-card">
      <Eyebrow>{"Next step · " + step.kicker}</Eyebrow>
      {step.terminal ? (
        <>
          <p className="wp-jr-terminal">
            {item.phase === "Stopped"
              ? "Stopped: " + item.stoppedReason
              : item.kind === "Spike"
                ? "The question is answered and the track ends here."
                : "Validated on " + (item.validatedOn || "an earlier date") + ". Nothing further is owed."}
          </p>
          <Field label="Reason for reopening">
            {(p) => <textarea {...p} rows={2} value={reason} onChange={(e) => onReason(e.target.value)} />}
          </Field>
          <button
            type="button"
            className="wp-jr-btn"
            aria-disabled={reason.trim() === ""}
            onClick={onReopen}
          >
            Reopen
          </button>
          {reason.trim() === "" ? <p className="wp-jr-gap">A reason is required to reopen.</p> : null}
        </>
      ) : (
        <>
          <button
            type="button"
            className="wp-btn-primary wp-jr-primary"
            aria-disabled={blocked}
            aria-describedby={blocked ? gapsId : undefined}
            onClick={blocked ? undefined : onAdvance}
          >
            {step.label}
          </button>
          {blocked ? (
            <ul className="wp-jr-gaps" id={gapsId}>
              {step.gaps.map((gap) => <li key={gap}>{gap}</li>)}
            </ul>
          ) : null}
          {step.warning ? <p className="wp-jr-warn">{step.warning}</p> : null}
          {step.canStop ? (
            <div className="wp-jr-stop">
              <Field label="Reason for stopping">
                {(p) => <textarea {...p} rows={2} value={reason} onChange={(e) => onReason(e.target.value)} />}
              </Field>
              <button
                type="button"
                className="wp-jr-btn"
                aria-disabled={reason.trim() === ""}
                onClick={onStop}
              >
                Stop
              </button>
              {reason.trim() === "" ? <p className="wp-jr-gap">A reason is required to stop.</p> : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function Glance({ item, step }: { item: JourneyItem; step: ReturnType<typeof nextStep> }) {
  const claimed = item.claims.reduce((t, c) => t + c.value, 0);
  const owed = item.claims.filter((c) => c.actual === null).length;
  const rows: [string, string][] = [
    ["Stage", phaseLabel(item)],
    ["Waiting on", step.terminal ? "Nobody" : step.kicker === "Intake" ? "Product owner" : "Engineering"],
    ["Source", item.source],
    ["Squad", item.squad || TBC],
    ["Assessor", item.assessor || TBC],
    ["Delivery", item.deliveryLead || TBC],
    ["Size", item.size || TBC],
    ["Assessed", item.assessedOn || "Not yet"],
    ["Commitment", item.commitment],
  ];
  if (item.kind === "Feature") {
    rows.push(["Claimed", claimed.toLocaleString("en-GB")]);
    rows.push(["Actuals owed", owed === 0 ? "None" : String(owed)]);
  }
  return (
    <div className="wp-card wp-jr-card">
      <div className="wp-card-title">At a glance</div>
      <dl className="wp-jr-glance">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
