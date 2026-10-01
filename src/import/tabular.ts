// One shape for every tabular export: a header row and rows of strings, from CSV or XLSX.
import Papa from "papaparse";
import * as XLSX from "xlsx";

export interface Table {
  headers: string[];
  rows: Record<string, string>[];
}

export type TabularInput = File | string | ArrayBuffer;

function cell(v: unknown): string {
  if (v == null) return "";
  if (v instanceof Date) {
    const y = v.getFullYear();
    const m = String(v.getMonth() + 1).padStart(2, "0");
    const d = String(v.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }
  return String(v).trim();
}

/** Rows keyed by header; later duplicates of a header are suffixed so nothing is lost. */
function fromMatrix(matrix: unknown[][]): Table {
  const raw = (matrix[0] ?? []).map(cell);
  const seen = new Map<string, number>();
  const headers = raw.map((h, i) => {
    const name = h || "Column " + (i + 1);
    const n = seen.get(name) ?? 0;
    seen.set(name, n + 1);
    return n === 0 ? name : name + " (" + (n + 1) + ")";
  });
  const rows: Record<string, string>[] = [];
  for (const line of matrix.slice(1)) {
    const row: Record<string, string> = {};
    let any = false;
    headers.forEach((h, i) => {
      const value = cell(line[i]);
      if (value !== "") any = true;
      row[h] = value;
    });
    if (any) rows.push(row);
  }
  return { headers, rows };
}

export function parseCsv(text: string): Table {
  const parsed = Papa.parse<string[]>(text.replace(/^\uFEFF/, ""), { skipEmptyLines: "greedy" });
  return fromMatrix(parsed.data as unknown[][]);
}

export function parseXlsx(buffer: ArrayBuffer): Table {
  const book = XLSX.read(buffer, { type: "array", cellDates: true });
  const sheet = book.Sheets[book.SheetNames[0]];
  if (!sheet) return { headers: [], rows: [] };
  const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, raw: true, defval: "" });
  return fromMatrix(matrix);
}

function isCsvName(name: string): boolean {
  return /\.(csv|txt|tsv)$/i.test(name);
}

/** A File, a CSV string or an XLSX buffer, read the same way. */
export async function readTable(input: TabularInput): Promise<Table> {
  if (typeof input === "string") return parseCsv(input);
  if (input instanceof ArrayBuffer) return parseXlsx(input);
  if (isCsvName(input.name)) return parseCsv(await input.text());
  return parseXlsx(await input.arrayBuffer());
}
