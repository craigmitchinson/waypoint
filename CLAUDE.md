# waypoint

Waypoint: the Waypoint Capacity Planner workbook as a Vite + React + TypeScript app. A typed model,
a pure engine that reproduces the workbook's numbers, an importer for the .xlsm, and eight sections
over the top of them.

Read README.md before changing structure.

## How work is delivered

The session runs as the orchestrator agent. It plans and judges; it does not edit code. Every change goes through `worker`, every check through `test`, every finished unit through `reviewer`, and `Explore` establishes ground truth before design. Briefs must carry objective, exact file scope, constraints, acceptance criteria and a return format. Agent delegation rules live in `.claude/agents`.

## Suite conventions

- Tokens come from `./ccs-ui`, imported in the entry file in this order: `./ccs-ui/tokens.css`, `./ccs-ui/fonts.css`, then the app's own CSS. No local palettes, no literal colours; a `theme` file maps names onto `var(--c-*)`.
- Fonts via tokens only: `--font-display` (serif headings), `--font-body`, `--font-mono` (kickers and labels).
- Accessibility contract: real buttons, no colour-only state, labelled controls, one h1 per view, sr-only tables beside SVG charts.
- Copy is UK English, editorial tone, no emoji in app copy. Plain prose in docs and reports.

## Commands

- Dev: `npm run dev` (port 5183, strictPort)
- Build and verify: `npm run build`
- Tests: `npm test` (vitest)
- Types only: `npm run typecheck`

## For the test agent

Run `npm run build` and `npm test`. Report failures only.

## Importing exports

The Import section takes a Workday absence report or a Jira issue export, as CSV or XLSX, in five
steps: choose source, choose file, map columns, match people, preview, then apply. Column mapping
is detected from the headers and saved per source under the `waypoint-import-profiles-v1` key in
`localStorage`. People are matched by Core or File ID, then email, then name; nothing ambiguous is
applied without a choice on the Match people step. `samples/` holds the two anonymised exports the
tests read, and describes the columns each source is expected to carry.

## Scope

`src/engine/__fixtures__/wp_expected.json` is a read-only copy of the workbook generator's expected values and is the parity target. Regenerate it upstream and copy it across.

## Verification

- Vite app: `npm run build` must pass. TypeScript type checking runs inside it.
- Tests: `npm test` (vitest).
- The `test` agent runs the command given in its brief and reports failures only.

## Writing style for anything the user will read

Lead with the outcome. Short sentences, one idea each. No em-dashes. Name a file only when the reader has to go there.

## For the reviewer

Use `git diff` to review changes. Compare the vitest count against the baseline in your memory.
