// Settings: one place to edit everything the workbook's Settings sheet holds.
import { useMemo, useRef, useState } from "react";
import { Download, Plus } from "lucide-react";
import Section from "./Section";
import "./settings.css";
import { useDataset } from "../store/useDataset";
import {
  FUNDING_LINES, LIST_LABELS, LISTS, blendRate, epicNames, listValues, outcomeOfEpic, validateBlend,
  validateFinancials, validateGrade, validateSettings,
} from "../store/validate";
import type { ListName } from "../store/validate";
import { exportForDataverse } from "../export/dataverse";
import type {
  CapacityImpact, Financials, GradeBlend, GradeRate, LogEntry, Outcome, Settings as SettingsModel,
} from "../model/types";
import { ConfirmDialog, DataTable, Drawer, Field, Pill, Toolbar } from "../ui";
import type { Column } from "../ui";

type Tab = "quarter" | "states" | "lists" | "grades" | "money" | "outcomes" | "links" | "data"
  | "activity";

const TABS: [Tab, string][] = [
  ["quarter", "Quarter"],
  ["states", "States"],
  ["lists", "Lists"],
  ["grades", "Grades and blends"],
  ["money", "Money"],
  ["outcomes", "Outcomes"],
  ["links", "Links"],
  ["data", "Data"],
  ["activity", "Activity"],
];

const IMPACTS: CapacityImpact[] = [
  "None", "Reserved", "Allocated", "Consumed", "Historical", "Hold", "Removed",
];

/** When an entry was written, as a date and a time the column can line up. */
const when = (at: string) => {
  const date = new Date(at);
  return Number.isNaN(date.getTime())
    ? at
    : date.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" });
};

/** The log as CSV: a header line and one line per entry, newest first. */
function logCsv(entries: LogEntry[]): string {
  const cell = (value: string) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
  const line = (cells: string[]) => cells.map(cell).join(",");
  return [
    line(["When", "Action", "Summary", "User"]),
    ...entries.map((e) => line([e.at, e.label, e.summary, e.user])),
  ].join("\n");
}

const pct = (n: number) => Math.round(n * 100);
const fromPct = (n: string) => Number(n) / 100;

const blankGrade = (): GradeRate => ({ grade: "", rate: 0 });
const blankBlend = (grades: GradeRate[]): GradeBlend => ({
  name: "",
  counts: Object.fromEntries(grades.map((g) => [g.grade, 0])),
});

interface Confirm {
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export default function Settings() {
  const store = useDataset();
  const { data } = store;

  const [tab, setTab] = useState<Tab>("quarter");
  const [refusal, setRefusal] = useState("");
  const [confirm, setConfirm] = useState<Confirm | null>(null);

  // Quarter and Links share one draft: every scalar field on Settings the workbook lets a person edit.
  const [draft, setDraft] = useState<SettingsModel>(data.settings);
  const errors = useMemo(() => validateSettings(data, draft), [data, draft]);
  const errorFor = (fragment: string) => errors.find((e) => e.toLowerCase().includes(fragment));
  const dirty = JSON.stringify(draft) !== JSON.stringify(data.settings);

  const saveSettings = () => {
    if (errors.length > 0) return;
    store.updateSettings(draft);
  };
  const revertSettings = () => setDraft(data.settings);

  // Lists.
  const [listTab, setListTab] = useState<ListName>("skills");
  const [listValue, setListValue] = useState("");
  const [listAddError, setListAddError] = useState("");
  const [listRename, setListRename] = useState<{ open: boolean; original: string; value: string; error: string }>(
    { open: false, original: "", value: "", error: "" },
  );

  const openListRename = (value: string) => {
    setListRename({ open: true, original: value, value, error: "" });
  };
  const saveListRename = () => {
    const msg = store.renameListValue(listTab, listRename.original, listRename.value);
    if (msg) setListRename({ ...listRename, error: msg });
    else setListRename({ open: false, original: "", value: "", error: "" });
  };
  const addListEntry = () => {
    const msg = store.addListValue(listTab, listValue);
    if (msg) setListAddError(msg);
    else {
      setListValue("");
      setListAddError("");
    }
  };
  const removeListEntry = (value: string) => {
    setConfirm({
      title: `Remove ${LIST_LABELS[listTab]}`,
      body: `The workbook refuses to remove a ${LIST_LABELS[listTab]} that is still in use; it will say so if it is.`,
      confirmLabel: "Yes, remove",
      onConfirm: () => {
        setConfirm(null);
        const msg = store.removeListValue(listTab, value);
        setRefusal(msg);
      },
    });
  };

  const listColumns: Column<{ value: string }>[] = [
    {
      key: "value",
      label: LIST_LABELS[listTab][0].toUpperCase() + LIST_LABELS[listTab].slice(1),
      sort: (r) => r.value,
      cell: (r) => (
        <button type="button" className="wp-link-btn" onClick={() => openListRename(r.value)}>{r.value}</button>
      ),
    },
  ];

  // Grades and blends.
  const [gradeOpen, setGradeOpen] = useState(false);
  const [gradeDraft, setGradeDraft] = useState<GradeRate>(blankGrade);
  const [gradeOriginal, setGradeOriginal] = useState("");
  const [gradeErrors, setGradeErrors] = useState<string[]>([]);

  const openGrade = (row: GradeRate | null) => {
    setGradeDraft(row ? { ...row } : blankGrade());
    setGradeOriginal(row?.grade ?? "");
    setGradeErrors([]);
    setGradeOpen(true);
  };
  const saveGrade = () => {
    const found = validateGrade(data, gradeDraft, gradeOriginal || undefined);
    setGradeErrors(found);
    if (found.length > 0) return;
    const msg = gradeOriginal
      ? store.updateGrade(gradeOriginal, gradeDraft)
      : store.addGrade(gradeDraft);
    if (msg) setGradeErrors([msg]);
    else setGradeOpen(false);
  };
  const removeGrade = (row: GradeRate) => {
    setConfirm({
      title: "Remove business grade",
      body: `The workbook refuses to remove a business grade that is still in use; it will say so if it is.`,
      confirmLabel: "Yes, remove",
      onConfirm: () => {
        setConfirm(null);
        setRefusal(store.removeGrade(row.grade));
      },
    });
  };

  const [blendOpen, setBlendOpen] = useState(false);
  const [blendDraft, setBlendDraft] = useState<GradeBlend>(() => blankBlend(data.settings.grades));
  const [blendOriginal, setBlendOriginal] = useState("");
  const [blendErrors, setBlendErrors] = useState<string[]>([]);

  const openBlend = (row: GradeBlend | null) => {
    const counts = Object.fromEntries(
      data.settings.grades.map((g) => [g.grade, row?.counts[g.grade] ?? 0]),
    );
    setBlendDraft(row ? { name: row.name, counts } : { name: "", counts });
    setBlendOriginal(row?.name ?? "");
    setBlendErrors([]);
    setBlendOpen(true);
  };
  const saveBlend = () => {
    const found = validateBlend(data, blendDraft, blendOriginal || undefined);
    setBlendErrors(found);
    if (found.length > 0) return;
    const msg = blendOriginal
      ? store.updateBlend(blendOriginal, blendDraft)
      : store.addBlend(blendDraft);
    if (msg) setBlendErrors([msg]);
    else setBlendOpen(false);
  };
  const removeBlend = (row: GradeBlend) => {
    setConfirm({
      title: "Remove grade blend",
      body: "The workbook refuses to remove a grade blend that is still in use; it will say so if it is.",
      confirmLabel: "Yes, remove",
      onConfirm: () => {
        setConfirm(null);
        setRefusal(store.removeBlend(row.name));
      },
    });
  };

  const gradeColumns: Column<GradeRate>[] = [
    {
      key: "grade",
      label: "Grade",
      sort: (g) => g.grade,
      cell: (g) => (
        <button type="button" className="wp-link-btn" onClick={() => openGrade(g)}>{g.grade}</button>
      ),
    },
    { key: "rate", label: "GBP per FTE", numeric: true, sort: (g) => g.rate, cell: (g) => g.rate.toLocaleString("en-GB") },
  ];

  const blendColumns: Column<GradeBlend>[] = [
    {
      key: "name",
      label: "Blend",
      sort: (b) => b.name,
      cell: (b) => (
        <button type="button" className="wp-link-btn" onClick={() => openBlend(b)}>{b.name}</button>
      ),
    },
    {
      key: "components",
      label: "Components",
      cell: (b) => Object.entries(b.counts).filter(([, n]) => n > 0)
        .map(([grade, n]) => `${grade} × ${n}`).join(", ") || "—",
    },
    {
      key: "rate",
      label: "Derived rate",
      numeric: true,
      sort: (b) => blendRate(data, b),
      cell: (b) => Math.round(blendRate(data, b)).toLocaleString("en-GB"),
    },
  ];

  // Money: the typed tables on Financials, edited as one draft like the Quarter tab.
  const [money, setMoney] = useState<Financials>(data.settings.financials);
  const moneyErrors = useMemo(() => validateFinancials(data, money), [data, money]);
  const moneyDirty = JSON.stringify(money) !== JSON.stringify(data.settings.financials);
  const patchGrade = (grade: string, annualCost: number) => setMoney({
    ...money,
    teamGradeCosts: money.teamGradeCosts.map((g) => (g.grade === grade ? { ...g, annualCost } : g)),
  });
  const patchCostLine = (name: string, patch: Partial<Financials["costLines"][number]>) => setMoney({
    ...money,
    costLines: money.costLines.map((c) => (c.name === name ? { ...c, ...patch } : c)),
  });
  const saveMoney = () => {
    if (moneyErrors.length > 0) return;
    setRefusal(store.updateFinancials(money));
  };

  // Outcomes, and the epics that serve them.
  const [outcomeValue, setOutcomeValue] = useState("");
  const [outcomeAddError, setOutcomeAddError] = useState("");
  const [outcomeRename, setOutcomeRename] = useState<{ open: boolean; original: string; value: string; error: string }>(
    { open: false, original: "", value: "", error: "" },
  );
  const [epic, setEpic] = useState("");
  const [epicOutcome, setEpicOutcome] = useState("");

  const addOutcome = () => {
    const msg = store.addOutcome(outcomeValue);
    if (msg) setOutcomeAddError(msg);
    else {
      setOutcomeValue("");
      setOutcomeAddError("");
    }
  };
  const saveOutcomeRename = () => {
    const msg = store.renameOutcome(outcomeRename.original, outcomeRename.value);
    if (msg) setOutcomeRename({ ...outcomeRename, error: msg });
    else setOutcomeRename({ open: false, original: "", value: "", error: "" });
  };
  const removeOutcome = (row: Outcome) => {
    setConfirm({
      title: "Remove outcome",
      body: "The workbook refuses to remove an outcome the work is still filed under; it will say so if it is.",
      confirmLabel: "Yes, remove",
      onConfirm: () => {
        setConfirm(null);
        setRefusal(store.removeOutcome(row.name));
      },
    });
  };
  const assignEpic = () => setRefusal(store.assignEpic(epic, epicOutcome));

  const outcomeColumns: Column<Outcome>[] = [
    {
      key: "name",
      label: "Outcome",
      sort: (o) => o.name,
      cell: (o) => (
        <button
          type="button"
          className="wp-link-btn"
          onClick={() => setOutcomeRename({ open: true, original: o.name, value: o.name, error: "" })}
        >
          {o.name}
        </button>
      ),
    },
    { key: "epics", label: "Epics it is served by", cell: (o) => o.epics.join(", ") || "—" },
  ];

  // Data.
  const fileInput = useRef<HTMLInputElement>(null);
  const [loadError, setLoadError] = useState("");

  const onLoadFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      await store.loadWorkbook(file);
      setLoadError("");
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "That file could not be read.");
    }
    if (fileInput.current) fileInput.current.value = "";
  };

  const exportDataset = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "waypoint-dataset.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Dataverse: one file per table, downloaded one after another because there is no zip to pack
  // them into. The caption says what came out, so the maker can check the load against it.
  const [dataverseSummary, setDataverseSummary] = useState("");

  const exportDataverse = () => {
    const files = exportForDataverse(data);
    for (const file of files) {
      const json = file.fileName.endsWith(".json");
      const blob = new Blob([file.csv], {
        type: json ? "application/json" : "text/csv;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
    const tables = files.filter((f) => f.fileName.endsWith(".csv"));
    setDataverseSummary(
      `${tables.length} tables, in load order: ${tables.map((f) => `${f.table} (${f.rows})`).join(", ")}, with manifest.json.`,
    );
  };

  // Activity: the audit trail, newest first, filtered by what a summary says.
  const [activitySearch, setActivitySearch] = useState("");
  const activityRows = useMemo(() => {
    const needle = activitySearch.trim().toLowerCase();
    const entries = [...(data.log ?? [])].reverse().map((entry, index) => ({ entry, index }));
    return needle
      ? entries.filter((r) => r.entry.summary.toLowerCase().includes(needle))
      : entries;
  }, [data.log, activitySearch]);

  const activityColumns: Column<{ entry: LogEntry; index: number }>[] = [
    { key: "at", label: "When", cell: (r) => <span className="wp-settings-when">{when(r.entry.at)}</span> },
    { key: "label", label: "Action", cell: (r) => <Pill>{r.entry.label}</Pill> },
    { key: "summary", label: "Summary", cell: (r) => r.entry.summary },
    { key: "user", label: "User", cell: (r) => r.entry.user },
  ];

  const downloadActivity = () => {
    const blob = new Blob([logCsv(activityRows.map((r) => r.entry))], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "waypoint-activity.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exampleLink = (base: string, key: string) => (base.trim() ? base.trim().replace(/\/$/, "") + "/" + key : "");

  return (
    <Section
      eyebrow={data.settings.quarter}
      title="Settings"
      lede="The quarter, the sprint grid, the rates and the state model, all in one place."
    >
      <div className="wp-tabs wp-settings-tabs" role="group" aria-label="Settings views">
        {TABS.map(([key, label]) => (
          <button key={key} type="button" aria-pressed={tab === key} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {refusal ? <p className="wp-refusal" role="alert">{refusal}</p> : null}

      {tab === "quarter" ? (
        <>
          {errors.length > 0 ? (
            <div className="wp-errors" role="alert">
              <p>That will not save:</p>
              <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          ) : null}
          <div className="wp-card wp-settings-grid">
            <p className="wp-card-title wp-settings-card__wide">Quarter and sprints</p>
            <Field label="Quarter" error={errorFor("pick a quarter") ?? errorFor("does not read as a quarter")}>
              {(p) => (
                <select {...p} value={draft.quarter} onChange={(e) => setDraft({ ...draft, quarter: e.target.value })}>
                  {listValues(data, "quarters").map((q) => <option key={q} value={q}>{q}</option>)}
                </select>
              )}
            </Field>
            <Field label="Sprint 1 started" error={errorFor("sprint 1 started")}>
              {(p) => (
                <input {...p} type="date" value={draft.epoch} onChange={(e) => setDraft({ ...draft, epoch: e.target.value })} />
              )}
            </Field>
            <Field label="Sprint days" error={errorFor("sprint length")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  min={1}
                  value={draft.sprintDays}
                  onChange={(e) => setDraft({ ...draft, sprintDays: Number(e.target.value) })}
                />
              )}
            </Field>
          </div>
          <div className="wp-card wp-settings-grid">
            <p className="wp-card-title wp-settings-card__wide">Capacity modifiers</p>
            <Field label="Default modifier" hint="A percentage taken off everyone's net capacity." error={errorFor("default modifier")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={pct(draft.defaultModifier)}
                  onChange={(e) => setDraft({ ...draft, defaultModifier: fromPct(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Lead modifier" hint="The extra percentage taken off a squad lead." error={errorFor("lead modifier")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={pct(draft.leadModifier)}
                  onChange={(e) => setDraft({ ...draft, leadModifier: fromPct(e.target.value) })}
                />
              )}
            </Field>
          </div>
          <div className="wp-card wp-settings-grid">
            <p className="wp-card-title wp-settings-card__wide">Benefit year and targets</p>
            <Field label="Benefit year" error={errorFor("benefit year")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={draft.benefitYear}
                  onChange={(e) => setDraft({ ...draft, benefitYear: Number(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Timeline year" error={errorFor("timeline year")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={draft.timelineYear}
                  onChange={(e) => setDraft({ ...draft, timelineYear: Number(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Target FTE released" error={errorFor("target fte")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={draft.fteTarget}
                  onChange={(e) => setDraft({ ...draft, fteTarget: Number(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Target GBP benefit" error={errorFor("target gbp")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={draft.gbpTarget}
                  onChange={(e) => setDraft({ ...draft, gbpTarget: Number(e.target.value) })}
                />
              )}
            </Field>
          </div>
          <div className="wp-card wp-settings-grid">
            <p className="wp-card-title wp-settings-card__wide">Thresholds</p>
            <Field label="Amber at" hint="Utilisation above this reads Amber." error={errorFor("amber utilisation")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={pct(draft.utilisationWarn)}
                  onChange={(e) => setDraft({ ...draft, utilisationWarn: fromPct(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Red at" hint="Utilisation above this reads Red." error={errorFor("red utilisation")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={pct(draft.utilisationBad)}
                  onChange={(e) => setDraft({ ...draft, utilisationBad: fromPct(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Low confidence" error={errorFor("low confidence")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={pct(draft.reliabilityWarn)}
                  onChange={(e) => setDraft({ ...draft, reliabilityWarn: fromPct(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Medium confidence" error={errorFor("medium confidence")}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={pct(draft.reliabilityBad)}
                  onChange={(e) => setDraft({ ...draft, reliabilityBad: fromPct(e.target.value) })}
                />
              )}
            </Field>
          </div>
          <div className="wp-card wp-settings-grid">
            <p className="wp-card-title wp-settings-card__wide">The workbook and its report</p>
            <Field label="Team / organisation" error={errorFor("team / organisation")}>
              {(p) => (
                <input
                  {...p}
                  value={draft.organisation}
                  onChange={(e) => setDraft({ ...draft, organisation: e.target.value })}
                />
              )}
            </Field>
            <Field label="Prepared by" error={errorFor("prepared by")}>
              {(p) => (
                <input {...p} value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} />
              )}
            </Field>
            <Field label="Days in one member week (MW)">
              {(p) => (
                <input
                  {...p}
                  type="number"
                  min={1}
                  value={draft.mwDays}
                  onChange={(e) => setDraft({ ...draft, mwDays: Number(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Weeks in the timeline year">
              {(p) => (
                <input
                  {...p}
                  type="number"
                  min={1}
                  value={draft.weeks}
                  onChange={(e) => setDraft({ ...draft, weeks: Number(e.target.value) })}
                />
              )}
            </Field>
            <Field label="Running total on Work follows">
              {(p) => (
                <select {...p} value={draft.rankBy} onChange={(e) => setDraft({ ...draft, rankBy: e.target.value })}>
                  <option value="Priority">Priority</option>
                  <option value="Sequence">Sequence</option>
                </select>
              )}
            </Field>
            <Field label="Deduct logged absences and bank holidays?" error={errorFor("deduct absences")}>
              {(p) => (
                <input
                  {...p}
                  type="checkbox"
                  checked={draft.logAbsences === "Yes"}
                  onChange={(e) => setDraft({ ...draft, logAbsences: e.target.checked ? "Yes" : "No" })}
                />
              )}
            </Field>
          </div>
          <h2 className="wp-h2">Sizes</h2>
          <p className="wp-count">Member weeks (MW) a work item of each size carries, before any override.</p>
          <table className="wp-table wp-settings-table">
            <caption className="sr-only">The sizes, and the member weeks each one carries.</caption>
            <thead>
              <tr>
                <th scope="col">Size</th>
                <th scope="col" className="wp-num">Member weeks</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(draft.sizes).map((sizeName) => (
                <tr key={sizeName}>
                  <th scope="row">{sizeName}</th>
                  <td className="wp-num">
                    <label className="sr-only" htmlFor={`size-${sizeName}`}>
                      {`${sizeName} (member weeks)`}
                    </label>
                    <input
                      id={`size-${sizeName}`}
                      type="number"
                      step="0.1"
                      min={0}
                      value={draft.sizes[sizeName]}
                      onChange={(e) => setDraft({
                        ...draft,
                        sizes: { ...draft.sizes, [sizeName]: Number(e.target.value) },
                      })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="wp-settings-actions">
            <button type="button" onClick={revertSettings} disabled={!dirty}>Revert</button>
            <button type="button" className="wp-btn-primary" onClick={saveSettings} disabled={!dirty || errors.length > 0}>
              Save
            </button>
          </div>
        </>
      ) : null}

      {tab === "states" ? (
        <>
          <p className="wp-lede">
            Commitment (Proposed or Committed) is a separate flag on a work item; it does not change
            what a state does to capacity here.
          </p>
          <table className="wp-table wp-settings-table">
            <caption className="sr-only">The nine planner states, their Jira Align mapping and capacity impact.</caption>
            <thead>
              <tr>
                <th scope="col">State</th>
                <th scope="col">Jira Align</th>
                <th scope="col">Capacity impact</th>
              </tr>
            </thead>
            <tbody>
              {data.settings.states.map((s) => (
                <tr key={s.name}>
                  <td>{s.name}</td>
                  <td>{s.jiraAlign}</td>
                  <td>
                    <label className="sr-only" htmlFor={`impact-${s.name}`}>Capacity impact for {s.name}</label>
                    <select
                      id={`impact-${s.name}`}
                      value={s.impact}
                      onChange={(e) => setRefusal(store.updateStateImpact(s.name, e.target.value as CapacityImpact))}
                    >
                      {IMPACTS.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      {tab === "lists" ? (
        <>
          <div className="wp-tabs wp-settings-tabs" role="group" aria-label="Settings lists">
            {LISTS.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={listTab === l}
                onClick={() => {
                  setListTab(l);
                  setListValue("");
                  setListAddError("");
                }}
              >
                {LIST_LABELS[l][0].toUpperCase() + LIST_LABELS[l].slice(1)}
              </button>
            ))}
          </div>
          <form
            className="wp-settings-add"
            onSubmit={(e) => {
              e.preventDefault();
              addListEntry();
            }}
          >
            <Field label={`New ${LIST_LABELS[listTab]}`} error={listAddError}>
              {(p) => <input {...p} value={listValue} onChange={(e) => setListValue(e.target.value)} />}
            </Field>
            <button type="submit" className="wp-btn-primary">
              <Plus size={14} aria-hidden="true" />
              Add {LIST_LABELS[listTab]}
            </button>
          </form>
          <DataTable
            caption={`${LIST_LABELS[listTab][0].toUpperCase()}${LIST_LABELS[listTab].slice(1)} list.`}
            columns={listColumns}
            rows={listValues(data, listTab).map((value) => ({ value }))}
            rowKey={(r) => r.value}
            action={{ label: () => "Remove", onClick: (r) => removeListEntry(r.value) }}
          />
        </>
      ) : null}

      {tab === "grades" ? (
        <>
          <Toolbar
            label="Grades"
            actions={(
              <button type="button" className="wp-btn-primary" onClick={() => openGrade(null)}>
                <Plus size={14} aria-hidden="true" />
                Add grade
              </button>
            )}
          >
            <p className="wp-count">{data.settings.grades.length} business grades</p>
          </Toolbar>
          <DataTable
            caption="Business grades and their GBP per FTE rate."
            columns={gradeColumns}
            rows={data.settings.grades}
            rowKey={(g) => g.grade}
            action={{ label: () => "Remove", onClick: removeGrade }}
          />
          <Toolbar
            label="Blends"
            actions={(
              <button
                type="button"
                className="wp-btn-primary"
                onClick={() => openBlend(null)}
                disabled={data.settings.grades.length === 0}
              >
                <Plus size={14} aria-hidden="true" />
                Add blend
              </button>
            )}
          >
            <p className="wp-count">{data.settings.blends.length} grade blends</p>
          </Toolbar>
          <p className="wp-lede">
            A single fixed-rate business grade stays selectable on a work item alongside any blend.
          </p>
          <DataTable
            caption="Grade blends: the business grades that make them up, and the rate that comes out."
            columns={blendColumns}
            rows={data.settings.blends}
            rowKey={(b) => b.name}
            action={{ label: () => "Remove", onClick: removeBlend }}
          />

          <Drawer
            open={gradeOpen}
            title={gradeOriginal || "New business grade"}
            onClose={() => setGradeOpen(false)}
            footer={(
              <>
                <button type="button" onClick={() => setGradeOpen(false)}>Cancel</button>
                <button type="button" className="wp-btn-primary" onClick={saveGrade}>Save</button>
              </>
            )}
          >
            {gradeErrors.length > 0 ? (
              <div className="wp-errors" role="alert">
                <p>That did not save:</p>
                <ul>{gradeErrors.map((e) => <li key={e}>{e}</li>)}</ul>
              </div>
            ) : null}
            <Field label="Business grade" error={gradeErrors.find((e) => e.toLowerCase().includes("business grade"))}>
              {(p) => (
                <input {...p} value={gradeDraft.grade} onChange={(e) => setGradeDraft({ ...gradeDraft, grade: e.target.value })} />
              )}
            </Field>
            <Field label="GBP per FTE" error={gradeErrors.find((e) => e.toLowerCase().includes("gbp per fte"))}>
              {(p) => (
                <input
                  {...p}
                  type="number"
                  value={gradeDraft.rate}
                  onChange={(e) => setGradeDraft({ ...gradeDraft, rate: Number(e.target.value) })}
                />
              )}
            </Field>
          </Drawer>

          <Drawer
            open={blendOpen}
            title={blendOriginal || "New grade blend"}
            onClose={() => setBlendOpen(false)}
            footer={(
              <>
                <button type="button" onClick={() => setBlendOpen(false)}>Cancel</button>
                <button type="button" className="wp-btn-primary" onClick={saveBlend}>Save</button>
              </>
            )}
          >
            {blendErrors.length > 0 ? (
              <div className="wp-errors" role="alert">
                <p>That did not save:</p>
                <ul>{blendErrors.map((e) => <li key={e}>{e}</li>)}</ul>
              </div>
            ) : null}
            <Field label="Blend name" error={blendErrors.find((e) => e.toLowerCase().includes("blend"))}>
              {(p) => (
                <input {...p} value={blendDraft.name} onChange={(e) => setBlendDraft({ ...blendDraft, name: e.target.value })} />
              )}
            </Field>
            {data.settings.grades.map((g) => (
              <Field key={g.grade} label={`${g.grade} count`}>
                {(p) => (
                  <input
                    {...p}
                    type="number"
                    min={0}
                    value={blendDraft.counts[g.grade] ?? 0}
                    onChange={(e) => setBlendDraft({
                      ...blendDraft,
                      counts: { ...blendDraft.counts, [g.grade]: Number(e.target.value) },
                    })}
                  />
                )}
              </Field>
            ))}
            {blendErrors.some((e) => e.toLowerCase().includes("count above zero")) ? (
              <p className="wp-field__error" role="alert">
                {blendErrors.find((e) => e.toLowerCase().includes("count above zero"))}
              </p>
            ) : null}
            <p className="wp-lede">Derived rate: {Math.round(blendRate(data, blendDraft)).toLocaleString("en-GB")}</p>
          </Drawer>
        </>
      ) : null}

      {tab === "money" ? (
        <>
          {moneyErrors.length > 0 ? (
            <div className="wp-errors" role="alert">
              <p>That will not save:</p>
              <ul>{moneyErrors.map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          ) : null}
          <div className="wp-card wp-settings-grid">
            <h2 className="wp-card-title wp-settings-card__wide">Team grades: blended annual cost</h2>
            <p className="wp-says wp-settings-card__wide">
              People are costed at the blended rate for their team grade, never an individual salary.
            </p>
            {money.teamGradeCosts.map((g) => (
              <Field key={g.grade} label={`${g.grade} annual cost`}>
                {(p) => (
                  <input
                    {...p}
                    type="number"
                    min={0}
                    value={g.annualCost}
                    onChange={(e) => patchGrade(g.grade, Number(e.target.value))}
                  />
                )}
              </Field>
            ))}
          </div>
          <h2 className="wp-h2">Licences, infrastructure and other costs</h2>
          <table className="wp-table wp-settings-table">
            <caption className="sr-only">
              The cost lines on Financials: what each one costs a year, and the funding it sits on.
            </caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Cost line</th>
                <th scope="col">Funding</th>
                <th scope="col" className="wp-num">Annual £</th>
              </tr>
            </thead>
            <tbody>
              {money.costLines.map((c) => (
                <tr key={c.name}>
                  <th scope="row">{c.name}</th>
                  <td>{c.costLine}</td>
                  <td>
                    <label className="sr-only" htmlFor={`funding-${c.name}`}>Funding for {c.name}</label>
                    <select
                      id={`funding-${c.name}`}
                      value={c.fundingLine}
                      onChange={(e) => patchCostLine(c.name, { fundingLine: e.target.value })}
                    >
                      {FUNDING_LINES.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </td>
                  <td className="wp-num">
                    <label className="sr-only" htmlFor={`annual-${c.name}`}>Annual £ for {c.name}</label>
                    <input
                      id={`annual-${c.name}`}
                      type="number"
                      min={0}
                      value={c.annual}
                      onChange={(e) => patchCostLine(c.name, { annual: Number(e.target.value) })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="wp-card wp-settings-grid">
            <p className="wp-card-title wp-settings-card__wide">Estate baseline</p>
            <Field
              label="Estate baseline (£ in-year)"
              hint="What the Estate table says the automations already live are worth."
              error={moneyErrors.find((e) => e.toLowerCase().includes("baseline"))}
            >
              {(p) => (
                <input
                  {...p}
                  type="number"
                  min={0}
                  value={money.estateBaseline ?? 0}
                  onChange={(e) => setMoney({ ...money, estateBaseline: Number(e.target.value) })}
                />
              )}
            </Field>
          </div>
          <div className="wp-settings-actions">
            <button
              type="button"
              onClick={() => setMoney(data.settings.financials)}
              disabled={!moneyDirty}
            >
              Revert
            </button>
            <button
              type="button"
              className="wp-btn-primary"
              onClick={saveMoney}
              disabled={!moneyDirty || moneyErrors.length > 0}
            >
              Save
            </button>
          </div>
        </>
      ) : null}

      {tab === "outcomes" ? (
        <>
          <p className="wp-lede">
            Outcomes are the business results; epics are the bodies of work that serve them. One epic
            serves one outcome, and the Value roll-up groups the work by it.
          </p>
          <form
            className="wp-settings-add"
            onSubmit={(e) => {
              e.preventDefault();
              addOutcome();
            }}
          >
            <Field label="New outcome" error={outcomeAddError}>
              {(p) => <input {...p} value={outcomeValue} onChange={(e) => setOutcomeValue(e.target.value)} />}
            </Field>
            <button type="submit" className="wp-btn-primary">
              <Plus size={14} aria-hidden="true" />
              Add outcome
            </button>
          </form>
          <DataTable
            caption="Outcomes, and the epics filed under each one."
            columns={outcomeColumns}
            rows={data.settings.outcomes}
            rowKey={(o) => o.name}
            action={{ label: () => "Remove", onClick: removeOutcome }}
          />
          <form
            className="wp-settings-add"
            onSubmit={(e) => {
              e.preventDefault();
              assignEpic();
            }}
          >
            <Field label="Epic" hint="The epic to file under an outcome.">
              {(p) => (
                <select
                  {...p}
                  value={epic}
                  onChange={(e) => {
                    setEpic(e.target.value);
                    setEpicOutcome(outcomeOfEpic(data, e.target.value));
                  }}
                >
                  <option value="">Pick an epic</option>
                  {epicNames(data).map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              )}
            </Field>
            <Field label="Outcome it serves">
              {(p) => (
                <select {...p} value={epicOutcome} onChange={(e) => setEpicOutcome(e.target.value)}>
                  <option value="">Outcome not set</option>
                  {data.settings.outcomes.map((o) => <option key={o.name} value={o.name}>{o.name}</option>)}
                </select>
              )}
            </Field>
            <button type="submit" className="wp-btn-primary">Assign epic</button>
          </form>

          <Drawer
            open={outcomeRename.open}
            title="Rename outcome"
            onClose={() => setOutcomeRename({ open: false, original: "", value: "", error: "" })}
            footer={(
              <>
                <button
                  type="button"
                  onClick={() => setOutcomeRename({ open: false, original: "", value: "", error: "" })}
                >
                  Cancel
                </button>
                <button type="button" className="wp-btn-primary" onClick={saveOutcomeRename}>Save</button>
              </>
            )}
          >
            <Field label="Outcome" error={outcomeRename.error}>
              {(p) => (
                <input
                  {...p}
                  value={outcomeRename.value}
                  onChange={(e) => setOutcomeRename({ ...outcomeRename, value: e.target.value })}
                />
              )}
            </Field>
          </Drawer>
        </>
      ) : null}

      {tab === "links" ? (
        <>
          {errors.length > 0 ? (
            <div className="wp-errors" role="alert">
              <p>That will not save:</p>
              <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          ) : null}
          <div className="wp-card wp-settings-grid">
            <p className="wp-card-title wp-settings-card__wide">Link bases</p>
            <Field label="Jira Align base URL" hint="Outcomes and epics." error={errorFor("jira align base")}>
              {(p) => (
                <input
                  {...p}
                  value={draft.jiraAlignBase}
                  onChange={(e) => setDraft({ ...draft, jiraAlignBase: e.target.value })}
                />
              )}
            </Field>
            <Field label="Jira base URL" hint="Features." error={errorFor("jira base url")}>
              {(p) => (
                <input {...p} value={draft.jiraBase} onChange={(e) => setDraft({ ...draft, jiraBase: e.target.value })} />
              )}
            </Field>
          </div>
          <div className="wp-settings-preview">
            <p>Example outcome or epic link: {exampleLink(draft.jiraAlignBase, "OUT-123") || "—"}</p>
            <p>Example feature link: {exampleLink(draft.jiraBase, "ABC-123") || "—"}</p>
          </div>
          <div className="wp-settings-actions">
            <button type="button" onClick={revertSettings} disabled={!dirty}>Revert</button>
            <button type="button" className="wp-btn-primary" onClick={saveSettings} disabled={!dirty || errors.length > 0}>
              Save
            </button>
          </div>
        </>
      ) : null}

      {tab === "data" ? (
        <div className="wp-settings-data">
          <section className="wp-card" aria-label="Reset">
            <p>Reset to seed replaces the whole dataset with the sample it shipped with.</p>
            <button
              type="button"
              onClick={() => setConfirm({
                title: "Reset to seed",
                body: "Every person, squad, work item and setting reverts to the sample data. This cannot be undone once you leave the page.",
                confirmLabel: "Yes, reset",
                onConfirm: () => {
                  setConfirm(null);
                  store.resetToSeed();
                },
              })}
            >
              Reset to seed
            </button>
          </section>
          <section className="wp-card" aria-label="Clear sample data">
            <p>Clear sample data removes work, absences, benefit actuals, reservations, history and the archive. It keeps people, squads and settings.</p>
            <button
              type="button"
              onClick={() => setConfirm({
                title: "Clear sample data",
                body: "Work, absences, benefit actuals, reservations, history and the archive are all removed. People, squads and settings are kept.",
                confirmLabel: "Yes, clear",
                onConfirm: () => {
                  setConfirm(null);
                  store.clearSampleData();
                },
              })}
            >
              Clear sample data
            </button>
          </section>
          <section className="wp-card" aria-label="Load workbook">
            <label htmlFor="settings-load-file">Load workbook (.xlsm)</label>
            <input
              id="settings-load-file"
              ref={fileInput}
              type="file"
              accept=".xlsm"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setConfirm({
                  title: "Load workbook",
                  body: `Loading ${file?.name ?? "this file"} replaces the whole dataset with what it holds. This cannot be undone once you leave the page.`,
                  confirmLabel: "Yes, load",
                  onConfirm: () => {
                    setConfirm(null);
                    void onLoadFile(file);
                  },
                });
              }}
            />
            {loadError ? <p role="alert">{loadError}</p> : null}
          </section>
          <section className="wp-card" aria-label="Undo">
            <button type="button" onClick={() => store.undo()} disabled={!store.undoLabel}>
              Undo last action{store.undoLabel ? `: ${store.undoLabel}` : ""}
            </button>
          </section>
          <section className="wp-card wp-settings-export" aria-label="Export">
            <button type="button" onClick={exportDataset}>Export dataset (JSON)</button>
            <button type="button" onClick={exportDataverse}>Export for Dataverse</button>
            <p>
              {dataverseSummary
                || "One CSV per table, with the Dataverse logical column names, plus a manifest naming the order to load them in."}
            </p>
          </section>
        </div>
      ) : null}

      {tab === "activity" ? (
        <>
          <p className="wp-lede">
            Every change to the dataset, newest first. The user is a placeholder until the signed-in
            user is available.
          </p>
          <Toolbar
            label="Activity filters"
            actions={(
              <button type="button" onClick={downloadActivity}>
                <Download size={14} aria-hidden="true" />
                Download CSV
              </button>
            )}
          >
            <Field label="Search">
              {(p) => (
                <input
                  {...p}
                  type="search"
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                />
              )}
            </Field>
          </Toolbar>
          {(data.log ?? []).length === 0 ? null : (
            <p className="wp-count">{activityRows.length} of {(data.log ?? []).length} entries</p>
          )}
          <div className="wp-settings-activity wp-fill">
            <DataTable
              caption="The activity log: what was done, to what, by whom and when."
              columns={activityColumns}
              rows={activityRows}
              rowKey={(r) => `${r.entry.at}-${r.index}`}
              empty={(data.log ?? []).length === 0
                ? "No activity yet. Actions you take are recorded here."
                : "Nothing matches that search."}
            />
          </div>
        </>
      ) : null}

      <Drawer
        open={listRename.open}
        title={`Rename ${LIST_LABELS[listTab]}`}
        onClose={() => setListRename({ open: false, original: "", value: "", error: "" })}
        footer={(
          <>
            <button type="button" onClick={() => setListRename({ open: false, original: "", value: "", error: "" })}>
              Cancel
            </button>
            <button type="button" className="wp-btn-primary" onClick={saveListRename}>Save</button>
          </>
        )}
      >
        <Field label={LIST_LABELS[listTab][0].toUpperCase() + LIST_LABELS[listTab].slice(1)} error={listRename.error}>
          {(p) => (
            <input {...p} value={listRename.value} onChange={(e) => setListRename({ ...listRename, value: e.target.value })} />
          )}
        </Field>
      </Drawer>

      <ConfirmDialog
        open={confirm !== null}
        title={confirm?.title ?? ""}
        body={confirm?.body ?? ""}
        confirmLabel={confirm?.confirmLabel}
        onCancel={() => setConfirm(null)}
        onConfirm={() => confirm?.onConfirm()}
      />
    </Section>
  );
}
