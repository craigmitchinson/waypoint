# Waypoint

The Waypoint Capacity Planner, as a web app. Same rules as the workbook, held to the same numbers.

## Architecture

- `src/model/types.ts` — the domain: people, squads, work, absences, assignments, benefit
  actuals, reservations, history, archive and settings. Everything else speaks this model.
- `src/seed/` — `seed.json` is the workbook's own seed, dumped from the generator's parts, and
  `index.ts` maps it onto the model. It is what the app shows before anything is imported.
- `src/engine/` — pure functions over a `Dataset`, no React and no I/O:
  - `dates.ts` working days, quarters and week overlaps;
  - `context.ts` the quarter, the sprint grid, the timeline weeks and every person's bookings;
  - `capacity.ts` net MW, the person-week and the free days in it;
  - `work.ts` MW this quarter, commitment and the counts rule;
  - `value.ts` in-year and recorded value with the pro-rating rules;
  - `capacityCheck.ts` the capacity check and the finish walk;
  - `delivery.ts` the status ladder, on-time delivery, cycle time and carry-over;
  - `reservations.ts` the drawdown and the team pro-rata;
  - `calibration.ts` estimates, accuracy and the size bands;
  - `compute.ts` the whole quarter in one object, shaped like the generator's expected values.
- `src/import/workbook.ts` — reads a .xlsm with SheetJS into the same model, finding columns by
  their header rather than their position.
- `src/import/tabular.ts`, `mapping.ts`, `people.ts`, `workday.ts`, `jira.ts` — the export
  importer. A CSV or XLSX export is read into headers and rows, the headers are detected onto
  field specs and remembered as a mapping profile in `localStorage`, and rows are matched to
  people by Core or File ID, then email, then name. Workday rows become absences, approved ones
  only, deduped against what the dataset already holds; Jira rows update a work item with the same
  issue key or propose a new one, with Jira statuses mapped onto the nine planner states. Sample
  exports and the columns each one carries are in `samples/`.
- `src/store/useDataset.ts` — the dataset and every action that edits it: work, people, squads and
  absences, plus `resetToSeed`, `clearSampleData` (which keeps people, squads and settings),
  `loadWorkbook` and a single level of undo. It persists under `waypoint-dataset-v1` in
  `localStorage` with a schema version, and `quarterView()` memoises the engine's `compute()` result.
- `src/store/validate.ts` — the workbook's own form rules: AddWork, AddProduct, PlanEngineering,
  AddPerson, AddSquad and AddAbsence, message for message.
- `src/ui/` — the shared primitives: Drawer, Field, DataTable, Chip and StatusChip, Tile, Toolbar
  and ConfirmDialog. Tokens only, and the accessibility contract is built into them.
- `src/pages/` — the surfaces. Each sits at the path its name reads as, and the paths they used to
  sit at (`/plan`, `/plan/:title`, `/value`, `/money`, `/close`) redirect to the new ones:
  - Command: the quarter's tiles, and a Needs attention list of Red squads, at-risk and late items
    and committed work with nobody on it, each linking into Work or Team;
  - Work (`/work`): the work register, filtered by kind, state, squad, commitment and search,
    with a drawer carrying the workbook's Product and Engineering forms;
  - Team: people, squads and absences over three tabs, each with its own table and drawer form.
    A removal that is refused says why in text;
  - Timeline: people grouped by squad, one column per week of the quarter, and the gaps tables
    underneath it;
  - Benefits (`/benefits`): claims and recorded actuals, pro-rated from the month each benefit
    lands;
  - Financials (`/financials`): cost of ownership against the value the quarter returns;
  - Quarter close (`/quarter-close`): what the quarter delivered, and what it carries over;
  - Import: the five-step export flow;
  - Settings: the quarter, the sprint grid, the rates and the state model, all in one place.

### Type scale

One scale, declared as custom properties at the top of `src/index.css` so page CSS never writes a
raw size. Weights are 400, 500 and 600 only.

| Role | Property | Size | Font and weight | Used by |
| --- | --- | --- | --- | --- |
| Display | `--wp-fs-display` | 24px | display 600, line-height 1.1 | the h1, one per view |
| Number | `--wp-fs-number` | 26px | display 600, tabular-nums | Stat and Tile values |
| Heading | `--wp-fs-heading` | 15px | body 600 | `.wp-h2`, `.wp-card-title`, drawer and dialog titles |
| Body | `--wp-fs-body` | 13px | body 400 | tables, forms, lists, nav links (500, active 600) |
| Label | `--wp-fs-label` | 11.5px | body 500 | column headers, form labels, ledes, muted text, Pill, Legend |
| Kicker | `--wp-fs-kicker` | 10px | mono 600, uppercase, `--wp-track` | Eyebrow, band kicker, nav group labels |

`--wp-track` (0.08em) is the only letter-spacing in the app and `--wp-row` (34px) is the table row
height. `.wp-stat-row` sets a single row of figures divided by hairlines, in place of a grid of
bordered tiles.

## Modes

Two looks over one build, on `html[data-mode]` and remembered under `waypoint-mode`. The app opens
in the preview.

- Power Apps preview (`power`, the default): the app as a canvas app built with Fluent 2 modern
  controls. It renders inside a fixed 1600 x 900 logical canvas, centred on a neutral backdrop and
  scaled to fit the viewport, with a 48px app header over a Creator Kit left navigation and a
  scrolling content region. The skin is `src/skins/power.css`, imported after `index.css`. It
  defines Fluent 2's neutral, brand and status roles as `--pa-*` custom properties for light and
  dark, each one mapped onto a suite token rather than a literal: the mock reads as Fluent in
  layout and type, but its colours still come from `@ccs/ui`. In this mode the `--wp-fs-*` scale
  is remapped onto the Fluent 2 ramp, each size with
  its own line height: Caption 1 12/16, the list body 13/18, Body 1 14/20, Subtitle 2 16/22,
  Subtitle 1 20/26 and 28/36 for a figure on the brand band. Labels, kickers, eyebrows and helper
  text are Caption 1 regular in sentence case, no mono and no letter-spacing; only headings, table
  headers, form labels, the selected pivot tab and primary buttons carry a 600. Table rows are
  `--pa-row` (36px) under a 40px header.

  The canvas content region never scrolls as a whole. `.wp-main` is a column that hides its
  overflow, and `Section` wraps every view in `.wp-page`, a full-height column. A page hands the
  remaining height to one scrolling region by putting `.wp-fill` on it (`flex: 1; min-height: 0;
  overflow: auto`), which pins the 64px head and the lede above it. A page that has not named a
  region yet scrolls itself instead of losing what falls off the canvas.
- Studio (`studio`): the app's own look, unchanged.

The left rail collapses in both modes, from the hamburger at the top of it: icons only, labels left
for screen readers, remembered under `waypoint-nav`. Studio folds it by itself below a 1020px
viewport. Both toggles, mode and theme, sit in the rail foot.

## Verification

`npm run build` runs `tsc` then Vite. `npm test` runs five suites: parity against the generator's
`wp_expected.json` (every value within 0.005), the pro-rating and saturated-week unit tests, the
importer against the shipped workbook, the store actions, and the Work and Team surfaces.
The page tests ask for jsdom with a `// @vitest-environment jsdom` line of their own, so the engine
tests stay on node.

## Provenance

The engine is a port of `wp_model.py` in `../flightdeck/waypoint-generator`: an independent model of
the workbook's rules. Function names stay close to it so the two can be read side by side.
