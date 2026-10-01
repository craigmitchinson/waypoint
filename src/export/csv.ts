// CSV writing, shared by the exports. One cell, one line, one file: the escaping is RFC 4180, which
// is what both Excel and the Dataverse import wizard read.

/** A cell, quoted only where a comma, a quote or a line break makes it necessary. */
export function csvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** A row of cells, comma separated. */
export function csvLine(cells: string[]): string {
  return cells.map(csvCell).join(",");
}

/** A header row and its rows, as one file. */
export function csvFile(headers: string[], rows: string[][]): string {
  return [csvLine(headers), ...rows.map(csvLine)].join("\n") + "\n";
}
