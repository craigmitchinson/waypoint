import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as XLSX from "xlsx";
import { parseCsv, parseXlsx } from "../tabular";
import { detectMapping } from "../mapping";
import type { MappingProfile } from "../mapping";
import { matchPerson } from "../people";
import { WORKDAY_FIELDS, detectDateFormat, readWorkday } from "../workday";
import { JIRA_FIELDS, jiraState, readJira } from "../jira";
import { useDataset } from "../../store/useDataset";
import seedDataset from "../../seed";
import type { Dataset, Person, WorkItem } from "../../model/types";

const WORKDAY_HEADERS = ["Worker", "Employee ID", "Time Off Type", "Start Date", "End Date", "Total Days", "Status"];
const JIRA_HEADERS = ["Issue key", "Summary", "Issue Type", "Status", "Assignee", "Sprint",
  "Custom field (Story Points)", "Parent", "Resolved"];

function person(name: string, extra: Partial<Person> = {}): Person {
  return {
    name, role: "Engineer", grade: "G6", squad: "Atlas", region: "England",
    employment: "Permanent", lead: false, skills: [], ...extra,
  };
}

const PEOPLE: Person[] = [
  person("Lena Brooks", { coreId: "10024", email: "lena.brooks@example.com" }),
  person("Daniel Okafor", { fileId: "10031", email: "daniel.okafor@example.com" }),
  person("Marcus Brooks", { coreId: "10099", email: "marcus.brooks@example.com" }),
  person("Priya Shah", { coreId: "10047", email: "priya.shah@example.com" }),
];

function dataset(over: Partial<Dataset> = {}): Dataset {
  return { ...seedDataset, people: PEOPLE, work: [], absences: [], ...over };
}

function profile(source: "workday" | "jira", headers: string[]): MappingProfile {
  return {
    source,
    columns: detectMapping(headers, source === "workday" ? WORKDAY_FIELDS : JIRA_FIELDS),
    valueMaps: {},
    savedAt: "",
  };
}

const sample = (name: string) => readFileSync(new URL("../../../samples/" + name, import.meta.url), "utf8");

describe("tabular", () => {
  it("parses a CSV string with quoted commas", () => {
    const table = parseCsv('Key,Summary\nWAY-1,"Payments retry, with backoff"\n');
    expect(table.headers).toEqual(["Key", "Summary"]);
    expect(table.rows).toEqual([{ Key: "WAY-1", Summary: "Payments retry, with backoff" }]);
  });

  it("reads an XLSX date cell as its local calendar day, not the UTC day", () => {
    const sheet = XLSX.utils.aoa_to_sheet([["Date"], [new Date(2025, 6, 14)]]);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Sheet1");
    const buffer = XLSX.write(book, { type: "array", bookType: "xlsx", cellDates: true }) as ArrayBuffer;
    const table = parseXlsx(buffer);
    expect(table.rows[0].Date).toBe("2025-07-14");
  });
});

describe("detectMapping", () => {
  it("maps a Workday header row", () => {
    const columns = detectMapping(WORKDAY_HEADERS, WORKDAY_FIELDS);
    expect(columns.worker).toBe("Worker");
    expect(columns.workerId).toBe("Employee ID");
    expect(columns.timeOffType).toBe("Time Off Type");
    expect(columns.start).toBe("Start Date");
    expect(columns.end).toBe("End Date");
    expect(columns.amount).toBe("Total Days");
    expect(columns.status).toBe("Status");
    expect(columns.email).toBeNull();
  });

  it("maps a Jira Cloud header row", () => {
    const columns = detectMapping(JIRA_HEADERS, JIRA_FIELDS);
    expect(columns.key).toBe("Issue key");
    expect(columns.summary).toBe("Summary");
    expect(columns.issueType).toBe("Issue Type");
    expect(columns.status).toBe("Status");
    expect(columns.assignee).toBe("Assignee");
    expect(columns.sprint).toBe("Sprint");
    expect(columns.storyPoints).toBe("Custom field (Story Points)");
    expect(columns.parent).toBe("Parent");
    expect(columns.resolved).toBe("Resolved");
  });
});

describe("matchPerson", () => {
  it("matches on a Core or File ID", () => {
    expect(matchPerson({ id: "10031" }, PEOPLE)).toMatchObject({ confidence: "id" });
    expect(matchPerson({ id: "10024", name: "Someone Else" }, PEOPLE).person?.name).toBe("Lena Brooks");
  });

  it("matches on email", () => {
    const hit = matchPerson({ email: "Daniel.Okafor@example.com" }, PEOPLE);
    expect(hit.confidence).toBe("email");
    expect(hit.person?.name).toBe("Daniel Okafor");
  });

  it("matches a surname-first name", () => {
    const hit = matchPerson({ name: "Brooks, Lena" }, PEOPLE);
    expect(hit.confidence).toBe("name");
    expect(hit.person?.name).toBe("Lena Brooks");
  });

  it("returns candidates and no match for an ambiguous surname", () => {
    const hit = matchPerson({ name: "Brooks" }, PEOPLE);
    expect(hit.person).toBeNull();
    expect(hit.confidence).toBe("none");
    expect(hit.candidates.map((p) => p.name)).toEqual(["Lena Brooks", "Marcus Brooks"]);
  });

  it("surfaces an initials-only hit as a candidate, not an auto-applied match", () => {
    const solo: Person[] = [person("Lena Brooks", { coreId: "10024" })];
    const hit = matchPerson({ name: "L. Brooks" }, solo);
    expect(hit.person).toBeNull();
    expect(hit.confidence).toBe("initials");
    expect(hit.candidates.map((p) => p.name)).toEqual(["Lena Brooks"]);
  });

  it("matches an ID exactly, so a differently-cased account id does not match", () => {
    const withAccount: Person[] = [person("Daniel Okafor", { jiraAccountId: "ABC123" })];
    expect(matchPerson({ id: "ABC123" }, withAccount).confidence).toBe("id");
    expect(matchPerson({ id: "abc123" }, withAccount).person).toBeNull();
  });

  it("matches an email case-insensitively", () => {
    expect(matchPerson({ email: "LENA.BROOKS@EXAMPLE.COM" }, PEOPLE).person?.name).toBe("Lena Brooks");
  });
});

describe("workday", () => {
  it("detects the date format, preferring dd/mm", () => {
    expect(detectDateFormat(["14/07/2025", "18/07/2025"])).toBe("dmy");
    expect(detectDateFormat(["07/14/2025", "07/18/2025"])).toBe("mdy");
    expect(detectDateFormat(["2025-07-14"])).toBe("iso");
  });

  it("applies approved rows only and converts them to absences", () => {
    const table = parseCsv(sample("workday-absence-sample.csv"));
    const result = readWorkday(table, profile("workday", table.headers), dataset());
    expect(result.format).toBe("dmy");
    expect(result.toAdd).toEqual([
      { person: "Lena Brooks", type: "Holiday", from: "2025-07-14", to: "2025-07-18", note: "Booked in May" },
      { person: "Daniel Okafor", type: "Sick", from: "2025-07-21", to: "2025-07-21", note: "" },
    ]);
    expect(result.rows[2].skipped).toBe("Not approved");
  });

  it("dedupes against absences already recorded", () => {
    const table = parseCsv(sample("workday-absence-sample.csv"));
    const existing = dataset({
      absences: [{ person: "Lena Brooks", type: "Holiday", from: "2025-07-14", to: "2025-07-18", note: "" }],
    });
    const result = readWorkday(table, profile("workday", table.headers), existing);
    expect(result.toAdd).toHaveLength(1);
    expect(result.rows[0].skipped).toBe("Already recorded");
  });
});

describe("jira", () => {
  it("defaults Jira statuses onto the planner states", () => {
    const empty: MappingProfile = { source: "jira", columns: {}, valueMaps: {}, savedAt: "" };
    expect(jiraState(empty, "In Progress")).toBe("In development");
    expect(jiraState(empty, "Ready for Development")).toBe("Ready");
    expect(jiraState(empty, "Deployed")).toBe("Released");
    expect(jiraState(empty, "In Validation")).toBe("In validation");
    expect(jiraState(empty, "Something new")).toBe("Identified");
  });

  it("updates by issue key and proposes anything new", () => {
    const table = parseCsv(sample("jira-issues-sample.csv"));
    const existing: WorkItem = {
      ...({} as WorkItem), title: "Payments retry", kind: "Feature", phase: "", parent: "", epic: "",
      squad: "Atlas", skill: "", size: "M", priority: "", state: "Identified", confidence: "",
      startSprint: "", endSprint: "", assignees: [], assessedBy: "", productOwner: "",
      jira: "WAY-101", jiraAlign: "", claimedFTE: null, claims: {}, landingMonth: null,
      landingYear: null, grade: null, proposed: false,
    };
    const result = readJira(table, profile("jira", table.headers), dataset({ work: [existing] }));
    expect(result.toUpdate).toEqual([
      { title: "Payments retry", key: "way-101",
        patch: expect.objectContaining({ state: "In development", jira: "WAY-101" }) },
    ]);
    expect(result.toAdd.map((w) => w.jira)).toEqual(["WAY-102", "WAY-103"]);
    expect(result.toAdd[0].kind).toBe("Spike");
    expect(result.toAdd[0].state).toBe("Done");
    expect(result.toAdd[1].kind).toBe("Component");
    expect(result.rows[0].person?.name).toBe("Lena Brooks");
  });
});

describe("applyImport", () => {
  it("patches two items with the same title by their own jira key", () => {
    const a: WorkItem = {
      ...({} as WorkItem), title: "Payments retry", kind: "Feature", phase: "", parent: "", epic: "",
      squad: "Atlas", skill: "", size: "M", priority: "", state: "Identified", confidence: "",
      startSprint: "", endSprint: "", assignees: [], assessedBy: "", productOwner: "",
      jira: "WAY-101", jiraAlign: "", claimedFTE: null, claims: {}, landingMonth: null,
      landingYear: null, grade: null, proposed: false,
    };
    const b: WorkItem = { ...a, jira: "WAY-201" };
    useDataset.getState().load({ ...seedDataset, work: [...seedDataset.work, a, b] }, "Test");
    useDataset.getState().applyImport({
      updates: [
        { title: "Payments retry", key: "way-101", patch: { state: "In development" } },
        { title: "Payments retry", key: "way-201", patch: { state: "Done" } },
      ],
    }, "Test import");
    const work = useDataset.getState().data.work;
    expect(work.find((w) => w.jira === "WAY-101")?.state).toBe("In development");
    expect(work.find((w) => w.jira === "WAY-201")?.state).toBe("Done");
  });
});
