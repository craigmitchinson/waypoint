// Import: a Workday absence report or a Jira issue export, in five steps.
import { useMemo, useState } from "react";
import Section from "./Section";
import { useDataset } from "../store/useDataset";
import { readTable } from "../import/tabular";
import type { Table } from "../import/tabular";
import {
  detectMapping, loadProfiles, missingRequired, saveProfile,
} from "../import/mapping";
import type { FieldSpec, ImportSource, MappingProfile } from "../import/mapping";
import { WORKDAY_FIELDS, readWorkday } from "../import/workday";
import { JIRA_FIELDS, readJira } from "../import/jira";
import type { Person } from "../model/types";
import { Pill, Stat } from "../ui";
import "./import.css";

type Step = "source" | "file" | "map" | "people" | "preview";

/** What both readers return for every row, and all this page needs of them. */
interface ImportRow {
  index: number;
  person: Person | null;
  candidates: Person[];
  skipped: string;
}

const STEPS: [Step, string][] = [
  ["source", "Choose source"],
  ["file", "Choose file"],
  ["map", "Map columns"],
  ["people", "Match people"],
  ["preview", "Preview"],
];

const SOURCES: [ImportSource, string][] = [
  ["workday", "Workday absence report"],
  ["jira", "Jira issue export"],
];

function specsFor(source: ImportSource): FieldSpec[] {
  return source === "workday" ? WORKDAY_FIELDS : JIRA_FIELDS;
}

export default function Import() {
  const { data, applyImport } = useDataset();
  const [step, setStep] = useState<Step>("source");
  const [source, setSource] = useState<ImportSource>("workday");
  const [table, setTable] = useState<Table | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [columns, setColumns] = useState<Record<string, string | null>>({});
  const [overrides, setOverrides] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState("");
  const [applied, setApplied] = useState("");

  const specs = specsFor(source);
  const profile: MappingProfile = useMemo(
    () => ({ source, columns, valueMaps: loadProfiles()[source]?.valueMaps ?? {}, savedAt: "" }),
    [source, columns],
  );

  const workday = useMemo(
    () => (table && source === "workday" ? readWorkday(table, profile, data, { overrides }) : null),
    [table, source, profile, data, overrides],
  );
  const jira = useMemo(
    () => (table && source === "jira" ? readJira(table, profile, data, { overrides }) : null),
    [table, source, profile, data, overrides],
  );

  const rows: ImportRow[] = workday ? workday.rows : jira ? jira.rows : [];
  const needsPerson = rows.filter((r) => !r.person);
  const missing = missingRequired(columns, specs);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    try {
      const parsed = await readTable(file);
      setTable(parsed);
      setFileName(file.name);
      const remembered = loadProfiles()[source];
      const detected = detectMapping(parsed.headers, specs);
      setColumns(remembered
        ? Object.fromEntries(specs.map((s) => [s.key,
          remembered.columns[s.key] && parsed.headers.includes(remembered.columns[s.key] as string)
            ? remembered.columns[s.key] : detected[s.key]]))
        : detected);
      setOverrides({});
      setStep("map");
    } catch {
      setError("That file could not be read. Export it again as CSV or XLSX.");
    }
  }

  function onApply() {
    if (workday) {
      applyImport({ absences: workday.toAdd }, "Workday · " + fileName);
      setApplied(workday.toAdd.length + " absences applied.");
    } else if (jira) {
      applyImport({ work: jira.toAdd, updates: jira.toUpdate }, "Jira · " + fileName);
      setApplied(jira.toAdd.length + " work items added, " + jira.toUpdate.length + " updated.");
    }
  }

  const skipped = rows.filter((r) => r.skipped).length;
  const toAdd = workday ? workday.toAdd.length : jira ? jira.toAdd.length : 0;
  const toUpdate = jira ? jira.toUpdate.length : 0;
  const allowedStep = !table ? 1 : missing.length > 0 ? 2 : 4;

  return (
    <Section
      eyebrow="Workday · Jira"
      title="Import"
      lede="A Workday absence report or a Jira issue export, mapped onto the model and applied to the quarter."
    >
      <ol className="wp-import-steps" aria-label="Import steps">
        {STEPS.map(([id, label], i) => {
          const disabled = i > allowedStep;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => setStep(id)}
                aria-current={step === id ? "step" : undefined}
                aria-pressed={step === id}
                aria-disabled={disabled}
                disabled={disabled}
              >
                <Pill tone={step === id ? "brand" : "neutral"}>
                  <span className="sr-only">Step </span>
                  {i + 1}
                </Pill>
                {label}
              </button>
            </li>
          );
        })}
      </ol>

      {step === "source" && (
        <section className="wp-card wp-import-fields" aria-label="Choose source">
          <label htmlFor="import-source">Source system</label>
          <select
            id="import-source"
            value={source}
            onChange={(e) => { setSource(e.target.value as ImportSource); setTable(null); }}
          >
            {SOURCES.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
          </select>
          <p><button type="button" onClick={() => setStep("file")}>Continue</button></p>
        </section>
      )}

      {step === "file" && (
        <section className="wp-card wp-import-fields" aria-label="Choose file">
          <label htmlFor="import-file">Export file (CSV or XLSX)</label>
          <input
            id="import-file"
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
          {fileName && <p>{fileName} read: {table?.rows.length ?? 0} rows.</p>}
          {error && <p role="alert">{error}</p>}
        </section>
      )}

      {step === "map" && table && (
        <section aria-label="Map columns">
          <h2 className="wp-h2">Map columns</h2>
          <table className="wp-table">
            <caption className="wp-count">
              Each field, and the column it reads. Required fields must be mapped.
            </caption>
            <thead>
              <tr><th scope="col">Field</th><th scope="col">Required</th><th scope="col">Column</th></tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.key}>
                  <th scope="row"><label htmlFor={"map-" + spec.key}>{spec.label}</label></th>
                  <td>{spec.required ? "Required" : "Optional"}</td>
                  <td>
                    <select
                      id={"map-" + spec.key}
                      value={columns[spec.key] ?? ""}
                      onChange={(e) => setColumns({ ...columns, [spec.key]: e.target.value || null })}
                    >
                      <option value="">Not mapped</option>
                      {table.headers.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {missing.length > 0 && <p role="alert">Still to map: {missing.join(", ")}.</p>}
          <p>
            <button
              type="button"
              onClick={() => { saveProfile(profile); setSaved("Profile saved for " + source + "."); }}
            >
              Save profile
            </button>
            {" "}
            <button type="button" disabled={missing.length > 0} onClick={() => setStep("people")}>
              Continue
            </button>
          </p>
          {saved && <p>{saved}</p>}
        </section>
      )}

      {step === "people" && table && (
        <section aria-label="Match people">
          <h2 className="wp-h2">Match people</h2>
          {needsPerson.length === 0 ? (
            <p>Every row matched a person.</p>
          ) : (
            <table className="wp-table">
              <caption className="wp-count">Rows that matched nobody, or more than one person.</caption>
              <thead>
                <tr><th scope="col">Row</th><th scope="col">Candidates</th><th scope="col">Person</th></tr>
              </thead>
              <tbody>
                {needsPerson.map((row) => (
                  <tr key={row.index}>
                    <th scope="row">Row {row.index + 2}</th>
                    <td>{row.candidates.length ? row.candidates.map((c: Person) => c.name).join(", ") : "None"}</td>
                    <td>
                      <label htmlFor={"person-" + row.index}>Person for row {row.index + 2}</label>
                      <select
                        id={"person-" + row.index}
                        value={overrides[row.index] ?? ""}
                        onChange={(e) => setOverrides({ ...overrides, [row.index]: e.target.value })}
                      >
                        <option value="">Skip this row</option>
                        {(row.candidates.length ? row.candidates : data.people).map((p: Person) => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p><button type="button" onClick={() => setStep("preview")}>Continue</button></p>
        </section>
      )}

      {step === "preview" && table && (
        <section aria-label="Preview">
          <h2 className="wp-h2">Preview</h2>
          <div className="wp-stat-row">
            <Stat label="To add" value={String(toAdd)} sub="New records" />
            <Stat label="To update" value={String(toUpdate)} sub="Matched by issue key" />
            <Stat label="Skipped" value={String(skipped)} sub="Reasons listed below" />
          </div>
          <table className="wp-table">
            <caption className="wp-count">Every skipped row and why.</caption>
            <thead><tr><th scope="col">Row</th><th scope="col">Reason</th></tr></thead>
            <tbody>
              {rows.filter((r) => r.skipped).map((r) => (
                <tr key={r.index}><th scope="row">Row {r.index + 2}</th><td>{r.skipped}</td></tr>
              ))}
            </tbody>
          </table>
          {missing.length > 0 && <p role="alert">Still to map: {missing.join(", ")}.</p>}
          <p>
            <button type="button" onClick={onApply} aria-disabled={missing.length > 0} disabled={missing.length > 0}>
              Apply to the dataset
            </button>
          </p>
          {applied && <p role="status">{applied}</p>}
        </section>
      )}
    </Section>
  );
}
