// The work item journey as a self-contained mock: the record, the gates the flow document sets out,
// and the transitions that move an item on. No engine, no store, no persistence; this is the
// reference the Power Apps build reads, so every rule is stated once and in the open.

export type JourneyKind = "Feature" | "Spike" | "Component";

export type Phase =
  | "Shaping" | "Assessment" | "Delivery" | "Release" | "Validated" | "Stopped";

export type Source = "Front door" | "Direct" | "Jira";

export interface Claim {
  id: string;
  /** What the benefit is claimed as: hours saved, cost avoided, and so on. */
  type: string;
  value: number;
  /** The actual recorded against the claim, or null while it is still owed. */
  actual: number | null;
}

export interface ActivityRow {
  id: string;
  when: string;
  who: string;
  from: Phase;
  to: Phase;
  note: string;
}

export interface JourneyItem {
  id: string;
  title: string;
  kind: JourneyKind;
  /** The feature a component belongs to, by title. */
  parent: string;
  source: Source;
  phase: Phase;
  state: string;
  commitment: "Proposed" | "Committed";
  productOwner: string;
  priority: string;
  outcome: string;
  question: string;
  notes: string;
  squad: string;
  assessor: string;
  deliveryLead: string;
  size: string;
  skill: string;
  assessedOn: string;
  validatedOn: string;
  stoppedReason: string;
  /** The stage the item was stopped at, so the stepper can mark the right step. */
  stoppedAt: Phase | "";
  claims: Claim[];
  activity: ActivityRow[];
  openComponents: number;
}

export interface JourneyState {
  items: JourneyItem[];
  /** The item on screen, or null for the list. */
  selected: string | null;
  /** The selected item as the tabs edit it, saved by Save draft and never gated. */
  draft: JourneyItem | null;
  /** What the last action did, read out to a screen reader as well as shown. */
  notice: string;
}

export type JourneyAction =
  | { type: "select"; id: string }
  | { type: "back" }
  | { type: "edit"; patch: Partial<JourneyItem> }
  | { type: "claim"; id: string; patch: Partial<Claim> }
  | { type: "saveDraft" }
  | { type: "advance" }
  | { type: "stop"; reason: string }
  | { type: "reopen"; note: string };

/** Who the mock signs every Activity row as. */
const ME = "Ada Okafor";

/** The stages a live item is filed under, and the tab that holds the two terminal phases. */
export type Stage = "Intake" | "Assessment" | "Delivery" | "Released" | "Closed";

export const STAGE_TABS: Stage[] = ["Intake", "Assessment", "Delivery", "Released", "Closed"];

export function stageOf(item: JourneyItem): Stage {
  if (item.phase === "Validated" || item.phase === "Stopped") return "Closed";
  if (item.phase === "Shaping") return "Intake";
  if (item.phase === "Assessment") return "Assessment";
  if (item.phase === "Delivery") return "Delivery";
  return "Released";
}

/** The stepper's track: five steps for a feature or component, four for a spike. */
export function trackFor(item: JourneyItem): Phase[] {
  const track: Phase[] = ["Shaping", "Assessment", "Delivery", "Release"];
  return item.kind === "Spike" ? track : [...track, "Validated"];
}

/** A spike ends at Concluded; everything else reads the phase's own name. */
export function stepLabel(item: JourneyItem, phase: Phase): string {
  if (phase === "Shaping") return "Intake";
  if (phase === "Release") return item.kind === "Spike" ? "Concluded" : "Released";
  return phase;
}

export function phaseLabel(item: JourneyItem): string {
  if (item.phase === "Stopped") return "Stopped";
  return stepLabel(item, item.phase);
}

/** A component inherits the feature's assessment and value, so it has neither tab. */
export function tabsFor(item: JourneyItem): { id: TabId; label: string }[] {
  const reached = item.stoppedAt || item.phase;
  const order: Phase[] = ["Shaping", "Assessment", "Delivery", "Release", "Validated"];
  const at = Math.max(0, order.indexOf(reached === "Stopped" ? "Shaping" : reached));
  const tabs: { id: TabId; label: string }[] = [{ id: "intake", label: "Intake" }];
  if (at >= 1 && item.kind !== "Component") tabs.push({ id: "assess", label: "Assess" });
  if (at >= 2) tabs.push({ id: "delivery", label: "Delivery" });
  if (at >= 3 && item.kind === "Feature") tabs.push({ id: "value", label: "Value" });
  tabs.push({ id: "activity", label: "Activity" });
  return tabs;
}

export type TabId = "intake" | "assess" | "delivery" | "value" | "activity";

/** The gates, one function each, read by the Next step card and by nothing else. */
export function intakeGaps(item: JourneyItem): string[] {
  const gaps: string[] = [];
  if (!item.productOwner) gaps.push("Name a product owner.");
  if (!item.priority) gaps.push("Set a priority.");
  if (item.kind === "Feature" && !item.claims.some((c) => c.value > 0)) {
    gaps.push("Add at least one benefit claim with a value.");
  }
  return gaps;
}

export function commitGaps(item: JourneyItem): string[] {
  const gaps: string[] = [];
  if (!item.size) gaps.push("Set a size.");
  if (!item.assessor) gaps.push("Choose an assessor.");
  if (!item.squad) gaps.push("Choose a squad.");
  if (!item.assessedOn) gaps.push("Save the assessment.");
  return gaps;
}

export function validateGaps(item: JourneyItem): string[] {
  const owed = item.claims.filter((c) => c.actual === null).length;
  if (owed === 0) return [];
  return [owed === 1 ? "Record an actual against the remaining claim." : `Record an actual against all ${owed} claims.`];
}

export interface NextStep {
  /** The kicker over the card: the stage the item is waiting in. */
  kicker: string;
  label: string;
  gaps: string[];
  /** A warning that does not block, such as open components at release. */
  warning: string;
  /** Terminal stages offer Reopen with a reason instead of a forward move. */
  terminal: boolean;
  /** Whether Stop is offered beneath the forward action. */
  canStop: boolean;
}

export function nextStep(item: JourneyItem): NextStep {
  const base = { warning: "", terminal: false, canStop: true };
  if (item.phase === "Shaping") {
    return { ...base, kicker: "Intake", label: "Send for assessment", gaps: intakeGaps(item) };
  }
  if (item.phase === "Assessment") {
    return { ...base, kicker: "Assessment", label: "Commit", gaps: commitGaps(item) };
  }
  if (item.phase === "Delivery") {
    return {
      ...base,
      kicker: "Delivery",
      label: "Mark released",
      gaps: [],
      warning: item.openComponents > 0
        ? `${item.openComponents} ${item.openComponents === 1 ? "component is" : "components are"} still open. Releasing is allowed and recorded.`
        : "",
    };
  }
  if (item.phase === "Release") {
    if (item.kind === "Spike") {
      return { kicker: "Concluded", label: "", gaps: [], warning: "", terminal: true, canStop: false };
    }
    return { ...base, kicker: "Released", label: "Validate", gaps: validateGaps(item), canStop: false };
  }
  return {
    kicker: item.phase === "Stopped" ? "Stopped" : "Validated",
    label: "",
    gaps: [],
    warning: "",
    terminal: true,
    canStop: false,
  };
}

/** The phase and state each forward move writes, with the words the Activity row carries. */
function forward(item: JourneyItem): { to: Phase; state: string; note: string } | null {
  if (item.phase === "Shaping") return { to: "Assessment", state: "Ready", note: "Sent for assessment." };
  if (item.phase === "Assessment") return { to: "Delivery", state: "In progress", note: "Committed to delivery." };
  if (item.phase === "Delivery") {
    return {
      to: "Release",
      state: item.kind === "Spike" ? "Concluded" : "Released",
      note: item.kind === "Spike" ? "Question answered." : "Marked released.",
    };
  }
  if (item.phase === "Release" && item.kind !== "Spike") {
    return { to: "Validated", state: "Validated", note: "Benefits validated." };
  }
  return null;
}

const today = () => new Date().toISOString().slice(0, 10);

let seq = 0;
const rowId = () => "a" + String(++seq);

function log(item: JourneyItem, to: Phase, note: string): ActivityRow[] {
  return [
    ...item.activity,
    { id: rowId(), when: today(), who: ME, from: item.phase, to, note },
  ];
}

/** The assessment is stamped by any draft save that leaves a size on the record. */
function stamp(item: JourneyItem): JourneyItem {
  if (item.phase !== "Assessment" || !item.size || item.assessedOn) return item;
  return { ...item, assessedOn: today() };
}

function replace(items: JourneyItem[], next: JourneyItem): JourneyItem[] {
  return items.map((w) => (w.id === next.id ? next : w));
}

export function reducer(state: JourneyState, action: JourneyAction): JourneyState {
  const draft = state.draft;
  switch (action.type) {
    case "select": {
      const item = state.items.find((w) => w.id === action.id) ?? null;
      return { ...state, selected: action.id, draft: item ? { ...item } : null, notice: "" };
    }
    case "back":
      return { ...state, selected: null, draft: null, notice: "" };
    case "edit":
      return draft ? { ...state, draft: { ...draft, ...action.patch } } : state;
    case "claim": {
      if (!draft) return state;
      const claims = draft.claims.map((c) => (c.id === action.id ? { ...c, ...action.patch } : c));
      return { ...state, draft: { ...draft, claims } };
    }
    case "saveDraft": {
      if (!draft) return state;
      const saved = stamp(draft);
      return {
        ...state,
        items: replace(state.items, saved),
        draft: saved,
        notice: "Draft saved. Nothing was moved on.",
      };
    }
    case "advance": {
      if (!draft) return state;
      const move = forward(draft);
      if (!move || nextStep(draft).gaps.length > 0) return state;
      const next: JourneyItem = {
        ...draft,
        phase: move.to,
        state: move.state,
        commitment: move.to === "Delivery" ? "Committed" : draft.commitment,
        validatedOn: move.to === "Validated" ? today() : draft.validatedOn,
        activity: log(draft, move.to, move.note),
      };
      return {
        ...state,
        items: replace(state.items, next),
        draft: next,
        notice: move.note + " The item is now in " + stepLabel(next, move.to) + ".",
      };
    }
    case "stop": {
      if (!draft || !action.reason.trim() || !nextStep(draft).canStop) return state;
      const next: JourneyItem = {
        ...draft,
        phase: "Stopped",
        state: "Stopped",
        stoppedAt: draft.phase,
        stoppedReason: action.reason.trim(),
        activity: log(draft, "Stopped", "Stopped: " + action.reason.trim()),
      };
      return {
        ...state,
        items: replace(state.items, next),
        draft: next,
        notice: "The item is stopped and has left every queue.",
      };
    }
    case "reopen": {
      if (!draft || !action.note.trim() || !nextStep(draft).terminal) return state;
      const to: Phase = draft.phase === "Stopped" ? "Shaping"
        : draft.phase === "Validated" ? "Release" : "Delivery";
      const next: JourneyItem = {
        ...draft,
        phase: to,
        state: to === "Shaping" ? "Identified" : to === "Delivery" ? "In progress" : "Released",
        stoppedAt: "",
        stoppedReason: "",
        validatedOn: "",
        activity: log(draft, to, "Reopened: " + action.note.trim()),
      };
      return {
        ...state,
        items: replace(state.items, next),
        draft: next,
        notice: "Reopened into " + stepLabel(next, to) + ".",
      };
    }
    default:
      return state;
  }
}

function row(when: string, from: Phase, to: Phase, note: string): ActivityRow {
  return { id: rowId(), when, who: ME, from, to, note };
}

/** Six items, one per stage of the flow, with a spike, a component and a stopped item among them. */
export function seedItems(): JourneyItem[] {
  const base = {
    parent: "", outcome: "", question: "", notes: "", squad: "", assessor: "", deliveryLead: "",
    size: "", skill: "", assessedOn: "", validatedOn: "", stoppedReason: "", stoppedAt: "" as const,
    claims: [] as Claim[], activity: [] as ActivityRow[], openComponents: 0,
    commitment: "Proposed" as const,
  };
  return [
    {
      ...base,
      id: "w1",
      title: "Supplier invoice matching",
      kind: "Feature",
      source: "Front door",
      phase: "Shaping",
      state: "Identified",
      productOwner: "Priya Nair",
      priority: "",
      outcome: "Invoices match to a purchase order without a person reading them.",
      notes: "Promoted from a front door request raised by Finance Operations.",
      claims: [{ id: "c1", type: "Hours saved", value: 0, actual: null }],
      activity: [row("2026-09-08", "Shaping", "Shaping", "Promoted to a feature from the front door.")],
    },
    {
      ...base,
      id: "w2",
      title: "Can OCR read handwritten dockets?",
      kind: "Spike",
      source: "Direct",
      phase: "Assessment",
      state: "Ready",
      productOwner: "Priya Nair",
      priority: "Should",
      question: "Does the OCR service read a handwritten delivery docket well enough to trust?",
      squad: "Automation",
      assessor: "Tom Whelan",
      size: "Small",
      skill: "Power Automate",
      assessedOn: "2026-09-15",
      activity: [
        row("2026-09-11", "Shaping", "Shaping", "Raised directly by the product owner."),
        row("2026-09-12", "Shaping", "Assessment", "Sent for assessment."),
      ],
    },
    {
      ...base,
      id: "w3",
      title: "Payment run automation",
      kind: "Feature",
      source: "Jira",
      phase: "Delivery",
      state: "In progress",
      commitment: "Committed",
      productOwner: "Dan Whitfield",
      priority: "Must",
      outcome: "The weekly payment run is prepared, checked and filed without manual keying.",
      squad: "Finance Systems",
      assessor: "Tom Whelan",
      deliveryLead: "Marta Nowak",
      size: "Medium",
      skill: "Power Automate",
      assessedOn: "2026-08-24",
      openComponents: 1,
      claims: [{ id: "c2", type: "Hours saved", value: 420, actual: null }],
      activity: [
        row("2026-08-18", "Shaping", "Assessment", "Sent for assessment."),
        row("2026-08-26", "Assessment", "Delivery", "Committed to delivery over sprints 4 to 6."),
      ],
    },
    {
      ...base,
      id: "w4",
      title: "Payment run: remittance emails",
      kind: "Component",
      parent: "Payment run automation",
      source: "Direct",
      phase: "Delivery",
      state: "In progress",
      commitment: "Committed",
      productOwner: "Dan Whitfield",
      priority: "Must",
      squad: "Finance Systems",
      assessor: "Tom Whelan",
      deliveryLead: "Marta Nowak",
      size: "Medium",
      skill: "Power Automate",
      assessedOn: "2026-08-24",
      activity: [row("2026-08-26", "Shaping", "Delivery", "Created under the feature and inherits its commitment.")],
    },
    {
      ...base,
      id: "w5",
      title: "Customer onboarding pack",
      kind: "Feature",
      source: "Front door",
      phase: "Release",
      state: "Released",
      commitment: "Committed",
      productOwner: "Priya Nair",
      priority: "Should",
      outcome: "A new customer receives one pack, assembled from the CRM record.",
      squad: "Customer Systems",
      assessor: "Rhian Davies",
      deliveryLead: "Joe Bannerman",
      size: "Large",
      skill: "Power Apps",
      assessedOn: "2026-07-14",
      claims: [
        { id: "c3", type: "Hours saved", value: 300, actual: 288 },
        { id: "c4", type: "Cost avoided", value: 18000, actual: null },
      ],
      activity: [
        row("2026-07-09", "Shaping", "Assessment", "Sent for assessment."),
        row("2026-07-16", "Assessment", "Delivery", "Committed to delivery over sprints 2 to 5."),
        row("2026-09-02", "Delivery", "Release", "Marked released."),
      ],
    },
    {
      ...base,
      id: "w6",
      title: "Claims triage rules",
      kind: "Feature",
      source: "Front door",
      phase: "Stopped",
      state: "Stopped",
      productOwner: "Dan Whitfield",
      priority: "Could",
      squad: "Automation",
      assessor: "Rhian Davies",
      assessedOn: "2026-08-05",
      size: "Large",
      skill: "Power Automate",
      stoppedAt: "Assessment",
      stoppedReason: "The claims platform is being replaced next year, so the rules would be rebuilt twice.",
      claims: [{ id: "c5", type: "Hours saved", value: 210, actual: null }],
      activity: [
        row("2026-07-30", "Shaping", "Assessment", "Sent for assessment."),
        row("2026-08-07", "Assessment", "Stopped", "Stopped: the claims platform is being replaced next year."),
      ],
    },
  ];
}

export function initialState(): JourneyState {
  return { items: seedItems(), selected: null, draft: null, notice: "" };
}
