# Reference corpus

Microsoft Learn's canvas apps and Power Fx documentation, pulled verbatim as markdown. Nineteen
files, about 520k words over 448 pages, snapshot dated 19 September 2026. Each page keeps its own
heading, a `Source:` link back to the live page, and the page body exactly as published; only the
YAML frontmatter is stripped.

- `canvas-apps-01` to `canvas-apps-15` — the canvas apps tree: getting started, data, interface
  design, modern controls (`04`), classic controls (`05`), common properties (`06`), screens and app
  functionality, solutions and accessibility, publishing, how-to guides, the wrap wizard, developer
  topics, performance, Teams, deprecations.
- `power-fx-16` to `power-fx-19` — language concepts, the formula reference overviews, and the
  function reference in two parts.

## The index

`INDEX.md` is generated. It carries every heading of level 1 to 3 in the corpus with its file and
line, grouped by file, page headings on their own lines and the headings inside a page run together
beneath them. Its second section, Functions, lists every Power Fx page in `power-fx-16` to `19` with
its "Applies to" block condensed to one string, so a function's availability can be checked without
opening the page.

Rebuild it with `node scripts/build-reference-index.mjs` after adding, replacing or removing a
corpus file. Never edit it by hand. The script splits the Functions section out to
`INDEX-functions.md` and links it if `INDEX.md` would run past about 3,000 lines.

## The lookup rule

Read `INDEX.md`, find the heading, grep this folder for that heading, read only that section. Never
read a corpus file whole and never paste corpus text into a brief: cite the file and the heading.
Anything that holds beyond one change is distilled into `power/RUNBOOK.md` or
`power/canvas/CONTROLS.md` in the same unit that learned it. The full rule is in `power/RUNBOOK.md`,
section 4, "Looking things up".
