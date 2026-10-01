# Building Waypoint on Power Platform

Step by step, from an empty environment to a canvas app on Dataverse that reproduces the mock in
`src/`. Read `data-model.md` first. The model file `waypoint.model.yaml` is the authority on tables.

Two files sit beside this one and are read with it. `compatibility.md` is the surface-by-surface
matrix: how each one is built, how confident we are, what it costs in licences, and the fallback when
the first approach fails. Check a surface there before you build it. `tests/README.md` and
`tests/expected.json` are the numbers the build has to land on, keyed by the Power Fx formula in
`app/Formulas.pa.yaml` that produces them; write those cases as the formulas go in, not at the end.

Throughout, "the mock" means the React app in this repo. It is the specification for behaviour and
layout; the numbers it produces are held against the workbook generator's expected values by the
vitest suite, and the Power Platform build has to land on the same numbers.

---

## 1. Environment and solution

1. **Environments.** Three: Development, Test, Production. Dataverse database on each. UK region,
   en-GB, British pound as the base currency. Waypoint reports money in pounds only, so a single
   currency keeps the currency columns simple.
2. **Publisher.** Name "CCS Intelligent Process Automation", prefix `wp`, option value prefix
   `10000`. Set this before you create the first table; the prefix cannot be changed later.
3. **Solution.** One unmanaged solution, `WaypointCapacityPlanner`, in Development. Everything goes
   in it: tables, choices, the app, the flows, the roles, the connection references and the
   environment variables.
4. **Environment variables.** `wp_JiraBaseUrl`, `wp_JiraAlignBaseUrl`, `wp_ImportLibraryUrl` (the
   SharePoint library import files land in). Do not hard-code these; they differ per environment.
5. **Connection references.** Dataverse, SharePoint, Office 365 Users, and, later, the Jira
   connector. Named, not inline, so the solution imports cleanly.

## 2. Tables and choices

Create the 17 global choice sets first, because the tables reference them. Use the exact labels in
`waypoint.model.yaml`; the app compares state and kind names as text in several places.

Then the 27 tables, in this order, so lookups always have a target:

1. Reference: `wp_listvalue`, `wp_size`, `wp_workstate`, `wp_graderate`, `wp_gradeblend`,
   `wp_gradeblendline`, `wp_outcome`, `wp_epic`, `wp_quarter`, `wp_setting`, `wp_bankholiday`,
   `wp_teamgradecost`, `wp_costline`.
2. Core: `wp_squad`, `wp_person` (then add the Squad lead lookup back onto Squad), `wp_workitem`,
   `wp_assignee`, `wp_assignment`, `wp_absence`.
3. Benefits: `wp_benefitclaim`, `wp_benefitactual`, `wp_reservation`.
4. History and operations: `wp_quartersnapshot`, `wp_archiverow`, `wp_activitylog`,
   `wp_importprofile`, `wp_importrun`.

For each table set the primary column, the columns, then the alternate keys (keys can only be created
once the columns exist and the table has no conflicting data). Set the cascade behaviour on every
lookup explicitly: the defaults are not what the model asks for, and a default `Cascade` delete on
Person would take their absences *and* let a squad deletion take its people.

Seed the reference tables from `src/seed/seed.json`: the nine states with their impacts, the six size
bands, the grades and the one blend, the regions, skills, absence types and reservation categories,
the bank holidays, and one Quarter row per label on the quarter list with `wp_iscurrent` on the
current one.

**Estimate: 3 to 4 days** for tables, choices, keys and seed data, assuming you script the seed with
the `pac` CLI or a one-off flow rather than typing it.

### Generated solution

None of that is typed any more. `scripts/build-solution.mjs` reads `waypoint.model.yaml` and writes
an unmanaged solution zip, `power/solution/Waypoint.zip`, with all 27 tables, their columns, the 17
choice sets and the 43 lookup relationships with the cascade behaviour the model asks for.
`power/solution/README.md` says how to regenerate it, how to import it, and the four places the
generated solution differs from the model. The alternate keys are still made by hand: the solution
format's `EntityKeys` block is rejected on import.

## 3. Security roles

Four roles, from the privilege matrix in the model file. Create them in the solution so they travel.

- **Waypoint Viewer** first, as the base: organisation-level read on everything except the two
  financial tables and the import tables.
- **Waypoint Squad member**: Viewer, plus create and write on their own Absence and Assignment rows,
  plus write on Work items they are an assignee of.
- **Waypoint Product Owner**: Viewer, plus full control of Work item, Benefit claim, Benefit actual,
  Outcome, Epic and the grade tables.
- **Waypoint Engineering lead**: everything except deleting history, plus the only run privilege on
  the quarter close flow.

"Their own" is not a Dataverse depth. Enforce it two ways: own the Absence and Assignment rows by the
user who created them and give user-level write, and for Work items use a business rule that compares
the signed-in user against the assignee rows. The app also filters its forms, but the app is not the
security boundary.

Delete on `wp_activitylog`, `wp_quartersnapshot` and `wp_archiverow` stays with the system
administrator.

**Estimate: 1 day.**

## 4. The canvas app

### Shell and scale

The mock renders inside a fixed 1600 x 900 logical canvas, scaled to fit (`CANVAS` in `src/App.tsx`).
Match it: app settings, Screen size and orientation, Custom, Width 1600, Height 900, **Scale to fit
on**, Lock aspect ratio on, Lock orientation on. Turn on Modern controls and themes, and Enhanced
component properties.

Layout, on every screen:

- A 48px app header across the top (the mock's `AppHeader`).
- A left navigation rail, 240px expanded and about 56px collapsed, from the Creator Kit if it is
  installed in the environment, otherwise a `Gallery` of nav items inside a `Container`. The rail has
  four groups: Overview (Command), Shape (Plan, Timeline), People (Team, Import), Measure (Value,
  Money, Close), with Settings and the two toggles in the foot.
- A content region that never scrolls as a whole. Use a vertical `Container`: a fixed 64px head with
  the eyebrow, `h1` and lede, then one child with `Fill portions = 1` and its own scroll. That is the
  mock's `.wp-fill` rule, and it is what keeps the page head pinned.

### Screens

One screen per page in the mock. Ten screens, plus a loading screen.

| Screen | Shows | Main controls |
| --- | --- | --- |
| `scrLoading` | Splash while `App.OnStart` builds the collections | Image, ProgressBar (modern), Timer |
| `scrCommand` | The quarter's position, the capacity band, Decisions, Squads, This sprint, Benefits | Band component, Gallery of decision groups, Gallery of squads, stat container, MonthBars component |
| `scrPlan` | The work register, filtered by kind, state, squad, commitment and search | Toolbar container of Dropdowns and a TextInput, Gallery as a table, Drawer container |
| `scrWorkItem` | One work item: the stepper, the forms, the capacity check, the benefits | Stepper component, Edit form, capacity gallery, stage action buttons |
| `scrTimeline` | People grouped by squad, one column per week, gaps tables below, and the sprint plan | The sprint grid and the sprint plan (both below) |
| `scrTeam` | People, squads and absences over three tabs | Modern Pivot or a Gallery of tabs, three Galleries, three Drawer containers |
| `scrValue` | Claims and recorded actuals, pro-rated by landing month | Gallery of calendar rows with twelve month labels, totals container |
| `scrMoney` | Cost of ownership against the value the quarter returns | Two Galleries and a stat row |
| `scrClose` | What the quarter delivered, and what it carries over | Stat row, two Galleries, the Close button and its ConfirmDialog |
| `scrImport` | The five-step export flow | A Stepper, five Containers with Visible flags, a file attachment control |
| `scrSettings` | The quarter, the sprint grid, the rates and the state model | Pivot of sections, Edit forms and editable Galleries |

Every screen has exactly one `h1`-equivalent Text with `Role = TextRole.Heading1`, matching the
accessibility contract in the ccs-ui README. Every icon-only button gets an `AccessibleLabel`. Status
is never carried by colour alone: the pill always has words in it.

### Stage actions on scrWorkItem

The stage buttons across the top of `scrWorkItem` are the item's only route between states. The
table of them, action by action, with its precondition, its target state and who may take it, is in
`data-model.md` under "Stage actions". Build from that table, not from the state model: the states
are a table a team can edit, the moves between them are this fixed list.

One button per action, all in a horizontal container, each with its precondition in `Visible` and its
write in `OnSelect`. Release is the pattern the simple ones follow:

```powerfx
// btnRelease. Precondition: the item is In development.
Visible: =varItem.State.State = "In development"
OnSelect: |
    =Patch(WorkItems, varItem, { State: LookUp(colStates, State = "Released") });
     Set(varItem, LookUp(colWork, Title = varItem.Title));
     Notify("Released " & varItem.Title, NotificationType.Success)
```

Four of them need more than a `Patch`. **Commit** writes the commitment, not the state:
`{ Commitment: 'Commitment (Work item)'.Committed }`. **Cancel** is `Visible` on
`varItem.State.'Capacity impact' <> 'Capacity impact'.Removed` and opens the confirm dialog, because
a cancellation reason is required and a blank one is refused. **Send for assessment** is one button
with two rules: sized it patches Ready directly, unsized it has to pass the engineering fields first,
so its `OnSelect` runs the same checks `validateEngineering` runs and reports them instead of
patching. **Convert to a feature** creates a second row and links it both ways, `wp_convertedtoid`
and `wp_convertedfromid`, then takes the spike to Done, so put it in a flow or a single `Patch` set
and re-read both rows afterwards.

Re-read the item into `varItem` after every patch. The screen's capacity check, stepper and status
pill all read `varItem`, and a stale record shows the old state under the new button.

### Named formulas and theme

Put the theme in `App.Formulas`, not in `OnStart`. Named formulas are recomputed when their inputs
change and cost nothing at start-up. `App.pa.yaml` in `power/app/` has the full set: `IsDark`, the
neutral, brand and status roles mapped from the suite tokens, the six type roles from the mock's type
scale, and the simple engine rules as user-defined functions.

Three rules for the theme. Every colour comes from a named formula, never from a literal in a control
property. Light and dark are the same formula with an `If(IsDark, ..., ...)`, so a control never
knows which theme it is in. And the theme is the user's own preference, never a constant: `IsDark`
reads `varTheme`, `OnStart` reads `varTheme` from the preference saved on the device, and the toggle
in the rail foot writes both:

```powerfx
// tglDark, in the rail foot. AccessibleLabel = "Dark theme".
Default: =IsDark
OnCheck:   =Set(varTheme, "dark");  ClearCollect(colPreferences, { Theme: varTheme }); SaveData(colPreferences, "wp_preferences")
OnUncheck: =Set(varTheme, "light"); ClearCollect(colPreferences, { Theme: varTheme }); SaveData(colPreferences, "wp_preferences")
```

`SaveData` is per device, which is enough for a preference. If the theme has to follow the person
between devices, give it a `wp_userpreference` table keyed on the system user and patch that instead;
the formula does not change, only where it reads from.

### Components

Five canvas components, in a component library if you expect a second app, otherwise in the app. Each
one's custom properties are declared in `power/app/Components.pa.yaml`.

| Component | Custom properties | Notes |
| --- | --- | --- |
| `cmpBand` | `Kicker` (Text), `Height` | A brand-filled panel carrying the headline figures. Its children are Stats. |
| `cmpStat` | `Label`, `Value`, `Unit`, `Sub` (Text), `Tone` (Text: default or accent), `OnBrand` (Boolean) | One figure with its label. |
| `cmpPill` | `Label` (Text), `Tone` (Text: neutral, brand, accent, good, warn, bad) | Small pill. The tone tints it; the text always says what it means. |
| `cmpStepper` | `Steps` (Table), `Current` (Text), `Label` (Text) | The stages a work item moves through. |
| `cmpSquadSnap` | `Squads` (Table), `WarnAt`, `BadAt` (Number), `OnSelectSquad` (Event) | The Squads card on Command: name, headcount, a utilisation bar, the percentage and the MW. |

`cmpSquadSnap` has no single counterpart in `src/ui/`; it is the Squads card built inside
`src/pages/Command.tsx`. It is worth making a component because Command, Team and Close all show the
same list.

Components cannot read the app's collections unless `AccessAppScope` is true. Keep it false and pass
data in as a Table property, which is what the property lists above do. That also makes them testable.

**Estimate: shell, theme and components, 3 days. Screens, 8 to 12 days**, depending on how close to
the mock you hold Timeline and Settings.

### The sprint grid on Timeline

The hardest surface. It is people down the side, grouped by squad, and one column per week of the
year, each cell showing assigned and available MW with a tone.

**Design one, galleries.** An outer vertical `Gallery` bound to the squads, containing a label and an
inner vertical `Gallery` bound to `Filter(colPeople, Squad = ThisItem.Squad)`. Inside the person row,
a horizontal `Gallery` bound to `colWeeks`, whose template is a `Container` with two `Text` controls
and a `Rectangle` for the bar. Bind `TemplateFill` to a named formula taking the cell record, so the
tone is one formula, not one per control.

Three constraints to respect. Galleries nested three deep are supported but slow past a few hundred
template instances, so cap the week gallery to the quarter's 13 weeks by default with a control to
widen to the full year. Pre-compute the whole grid once into `colGrid` (one record per person-week,
with assigned, available and free) in `OnVisible`, and let the galleries bind to it rather than
calling the capacity functions inside a template. And give the grid an `sr-only` equivalent: a
collapsed accessible `DataTable` beside it with the same numbers, because a screen reader cannot read
a wall of rectangles.

**Design two, a PCF code component**, if the grid has to be pixel exact or the gallery version is too
slow. A single dataset PCF, `wp_Waypoint.TimelineGrid`, taking the grid collection as a dataset
property and the theme tokens as input properties, rendering a virtualised table in React. Budget
three to five days including the ALM plumbing, and note that a code component needs the environment
to allow them. Start with galleries; measure; only then reach for PCF.

### The sprint plan on Timeline

The second surface on `scrTimeline`, under the week grid, and much cheaper than it: squads down the
side, sprints across, and the quarter as a last column. `src/engine/sprintPlan.ts` is the rule and
`data-model.md` has the three spreading rules in prose. Read them before building this; the three
quantities do not spread the same way, and a cell that looks right is easy to get wrong.

Build it as `colSprintPlan`, computed once in `OnVisible`, one record per squad and sprint with
available, committed, proposed, reserved, remaining and utilisation. Then an outer vertical `Gallery`
bound to `colSquads`, whose template holds the squad name and an inner **horizontal** `Gallery` bound
to `Filter(colSprintPlan, Squad = ThisItem.'Squad name')` sorted by sprint number. Two galleries
deep, at most eight sprints wide, so it needs none of the grid's caution. Put the sprint labels in a
separate horizontal `Gallery` above the outer one, bound to `colSprintDays`, so the header does not
repeat per squad, and give both the same template width.

Three things to get right.

- **Availability per sprint** is `sprintAvailableMW` and it is the expensive part: a person's week
  capacity pro-rated by the share of that week's working days inside both the sprint and the quarter.
  Compute it from `colGrid`, the person-week grid the timeline already builds, rather than calling
  the capacity functions again per cell.
- **Demand** is the item's own MW over the number of sprints it spans, one whole share per sprint of
  the span, short sprint or not. Do not reuse `WorkMW`: that one is deliberately day-weighted for the
  quarter total, and using it here gives a different, wrong, matrix.
- **The 9.99.** Where a cell has committed work and no availability at all, utilisation is 9.99, the
  workbook's marker for infinitely over-committed. It is not a percentage, so do not format it as
  one. Show the words "No capacity" in the cell with the bad tone behind them and the figure in the
  accessible table beside it, which keeps the accessibility contract: the state is never in the
  colour alone.

### Drawers and dialogs

The mock's `Drawer` is a right-hand panel that covers part of the screen. In canvas: a `Container`
pinned right, `Width = 420`, `Visible = varDrawer = "person"` and so on, with a semi-transparent
`Rectangle` behind it at the same `Visible` to catch outside clicks. Set `TabIndex` on the drawer's
first control and move focus with `SetFocus` when it opens, and return focus to the trigger when it
closes. The Escape key is not interceptable in canvas, so give the drawer a visible Close button.

`ConfirmDialog` is the same pattern at 480 wide and centred, with the confirming button styled as
`Primary` and the message spelled out in words, never "Are you sure?".

## 5. Data import

The mock reads a CSV or XLSX in the browser. In Power Platform the file goes to SharePoint and a flow
does the work, because Power Apps cannot parse a spreadsheet by itself.

**The flow: `Waypoint - Import export file`.** Trigger: called from the app with the file name, the
source, and the profile. Steps:

1. Read the file from the SharePoint library named by `wp_ImportLibraryUrl`. CSV: split on lines and
   commas with `Select`, honouring quoted fields. XLSX: use the Excel Online (Business) "List rows
   present in a table" action, which requires the sheet to have a named table, so tell operators to
   save the export as a table or convert it first.
2. Read the `wp_importprofile` row for the source, `ParseJSON` the column mapping and the value maps.
3. Detect the mapping for any field the profile does not cover, using the alias lists in
   `src/import/workday.ts` and `src/import/jira.ts`: normalise the header to lower case words, match
   a spec's key, label or aliases exactly first, then loosely by substring where the alias is longer
   than three characters, and never take a header twice.
4. Detect the date format from the date columns, as `detectDateFormat` does: prefer dd/mm/yyyy;
   choose mm/dd only when a second part above twelve proves it; treat ISO as ISO.
5. Match each row to a person, in this order, and never guess: Core ID, File ID or Jira account ID
   exactly after trimming; then email, case-insensitively; then the normalised name, where
   "Brooks, Lena" and "Lena  Brooks" both become "lena brooks". If a name is ambiguous, or only
   matches by initials or surname, the row is returned for a human choice on the Match people step,
   with the candidates. One hit is a match; two or more is never a match.
6. Workday rows become Absence rows. Approved only, unless the operator has ticked "include
   unapproved". The time off type maps through the profile, then the defaults (annual leave, holiday
   and paid time off to Holiday; sick leave and sickness to Sick; parental, maternity and paternity to
   Parental; training to Training; jury service and unpaid leave to Other), then the raw text. Dedupe
   on person, from and to against what is already in Dataverse, which is what the alternate key gives
   you for nothing.
7. Jira rows update a Work item with the same issue key, or propose a new one. The state maps through
   the profile then the defaults in `JIRA_STATE_DEFAULTS`, the issue type through
   `JIRA_KIND_DEFAULTS`, story points become the original estimate, the parent becomes the epic, a
   resolved date sets the phase to Release, and a new item is created Proposed with the matched
   person's squad.
8. Write a `wp_importrun` row with the counts and the skipped reasons, and stamp the absences it
   created with it.

The app drives the same five steps as the mock: choose source, choose file, map columns, match people,
preview, apply. The map and match steps call the flow in "dry run" mode, which returns the proposed
rows without writing, and the apply step calls it again with the operator's overrides.

### Loading data

The mock writes the load files itself. Settings, Data, "Export for Dataverse" produces one CSV per
table and a `manifest.json`. Headers are the logical names in `waypoint.model.yaml`, lookups carry
the target's alternate key value, choices their display label, dates are ISO and booleans are true or
false. Columns the app or Dataverse computes are not written.

1. Reset the mock to the seed, or load the live .xlsm into it, then export.
2. Import the files in the order the manifest gives: reference data, then squads and people, then
   work items, then the children. The wizard is enough for a one-off; use a dataflow where the load
   has to be repeatable.
3. Map every lookup column on the alternate key rather than a GUID. `wp_squadid` maps on
   `wp_squad.wp_name`, `wp_personid` on `wp_person.wp_name`, `wp_workitemid` on `wp_workitem.wp_title`.
4. Load `wp_squad.csv` again at the end. A squad's lead is a person, so `wp_leadid` cannot resolve on
   the first pass.
5. Check each table's row count against the manifest, then the figures against `wp_expected.json`.

`wp_activitylog.csv` carries what the mock's log holds, which is the label, the summary, the user and
the time. The table, record and before and after columns are blank; the plugin step in section 8
fills them from the moment the app is live.

**Estimate: 4 to 6 days**, most of it in CSV parsing and the match step's UI.

## 6. Jira pull and the Rovo export

**Copilot Studio for the Jira pull, read only.** A topic, "Pull Jira issues", that takes a project or
a JQL filter, calls the Jira connector's issue search, and passes the rows through the same mapping
flow in dry-run mode. It reports what it would change and asks for a yes before applying. It never
writes back to Jira. That boundary is in `decisions.md` and it is not negotiable for v1: Waypoint's
state model is not Jira's, and a two-way sync would have to decide which system wins.

**The break-down export for Rovo.** A flow that takes a work item and emits a markdown brief: the
title, the question or the problem, the epic and outcome it serves, the size, the sprint span, the
assignees, the benefit claimed and the acceptance the state model implies. Store it as a file or put
it on the clipboard for the user to paste into Rovo. Output only; nothing comes back automatically.

**Estimate: 2 to 3 days.**

## 7. Quarter close

One flow, `Waypoint - Close quarter`, run by the Engineering lead from the Close screen behind a
confirm dialog. It does exactly what `closeQuarter` does in `src/store/useDataset.ts`, in order:

1. **Mark ended done.** Every counted item whose absolute end sprint is at or before the quarter's
   last sprint goes to the Done state, stamped with the smaller of the quarter's last sprint and the
   current sprint. Never the item's own end sprint: that would read every late item as on time.
2. **Snapshot.** Write a `wp_quartersnapshot` row with net capacity, in-plan MW, delivered MW, FTE
   claimed and pounds in-year as they stand after step 1.
3. **Archive.** Every item whose state impact is Historical or Removed, and which is not already
   stamped with this quarter, gets an archive row and the stamp. Then a reservation row per
   reservation in the quarter, carrying held, drawn and free MW.
4. **Advance.** Move `wp_iscurrent` to the next quarter on the list, and roll the benefit and timeline
   years if the new quarter is in a different year.
5. **Log.** One activity log row, action Quarter close, with the counts in the summary.

Run it in a single changeset where the platform allows, and make it idempotent: the archive stamp and
the archive alternate key both guard a re-run.

**Estimate: 3 days.**

## 8. The audit log

A Dataverse plugin step, or a "When a row is added, modified or deleted" flow, on each business table.
It writes a `wp_activitylog` row with the table, record ID, record name, the user, the time, and a
short before and after: the changed columns only, one per line, not a record dump. Label and summary
are two columns, as `LogEntry` keeps them in the mock: the label is what was done, the summary is
what changed. Do not concatenate them; the gallery groups on the label. A flow is quicker
to build and easier to read; a plugin is synchronous and cannot be turned off by a user with the
wrong role. Start with flows, move the sensitive tables (Work item, Reservation, Setting, Quarter) to
a plugin if the log ever has to be evidential.

Surface it in the app as a read-only gallery on the Settings screen, filtered by table and by user,
and as a small "recent activity" list in the work item drawer.

**Estimate: 2 days.**

## 9. Testing

The cases are already written out: `tests/expected.json` holds 96 of them, keyed by the named
formula that has to produce each value, and `tests/README.md` has the suites in the order to build
them and the manual check for the charts Test Studio cannot read.

**Test Studio** takes the vitest parity suite's shape. Write one test suite per engine area, each case
asserting a named formula against a known value.

The fixture is already there: `src/engine/__fixtures__/wp_expected.json` is a read-only copy of the
generator's expected values, and the vitest parity suite holds every number to within 0.005. Reuse it
two ways.

1. **Load the same seed.** Import `src/seed/seed.json` into a dedicated test environment through the
   import flow, so the Dataverse rows are the rows the fixture was computed from.
2. **Load the expectations.** Put `wp_expected.json` into a `wp_testexpectation` table in the test
   environment only (one row per path and value), or paste the values into the test cases as
   literals. Then each Test Studio case reads a named formula and asserts
   `Abs(actual - expected) <= 0.005`, which is the parity suite's tolerance.

The cases that matter most, because they are the ones the mock's own suite checks: net capacity total,
committed and proposed totals, in-plan and delivered MW, the reservation rows' drawn and remaining,
the timeline available and assigned checksums, each squad's net, committed and utilisation, the ended
items count, and the delivery block's on-time percentage, cycle time and carry-over.

Beyond parity, cover the form rules from `src/store/validate.ts` as Test Studio cases: a duplicate
title is refused, an FTE claim without a landing month is refused, a cancelled item without a reason
is refused, a component two levels deep is refused, a reservation duplicate triple is refused.

Test Studio cannot test a flow. Test the import and close flows with a flow-level test harness: a
manually triggered flow that seeds a known state, calls the flow, and asserts the resulting rows.

**Estimate: 3 to 4 days.**

## 10. ALM

- **Source control.** Unpack the solution to source with `pac solution export` then
  `pac solution unpack`, and unpack the app itself with `pac canvas unpack` (the `.pa.yaml` files in
  `power/app/` are the same shape). Commit the unpacked source, not the `.zip` and not the `.msapp`.
- **Round trip.** `pac canvas pack` rebuilds the `.msapp` from the YAML. Treat the YAML as the
  reviewable artefact and the `.msapp` as a build output. Note that canvas source YAML is still
  evolving: pack and unpack with the same `pac` version across the team, and do not hand-edit
  `EditorState`.
- **Pipelines.** Use Power Platform pipelines in the environment, or Azure DevOps with the Power
  Platform Build Tools. Dev exports unmanaged, the pipeline imports managed into Test and Production.
  Never edit in Test or Production.
- **Environment variables and connection references** carry the differences between environments.
  Deployment settings files hold their values per stage.
- **Solution checker** on every export, and treat its high-severity findings as build failures.

**Estimate: 2 days to set up, then it is free.**

## 11. What to build first

A proving slice, one to two weeks, that answers the two risky questions: does the engine reproduce the
workbook's numbers in Power Fx, and does a canvas gallery hold the sprint grid.

| Stage | What | Days |
| --- | --- | --- |
| 1 | Environment, publisher, solution, the six tables the slice needs: Person, Squad, Work item, Work state, Size, Quarter | 2 |
| 2 | Seed those tables from `seed.json` | 1 |
| 3 | App shell: 1600 x 900, header, nav rail, theme named formulas, the light and dark toggle | 2 |
| 4 | The Band, Stat and Pill components | 1 |
| 5 | Command screen: the capacity band and the Squads card, reading real data | 2 |
| 6 | The engine's simple rules as user-defined functions: `WorkingDays`, `NetMW`, `OwnMW`, `WorkMW`, `Counts`, `CommitmentOf` | 2 |
| 7 | One work item screen, read-only, with the capacity check for that item | 2 |
| 8 | Hold the slice's numbers against `wp_expected.json` by hand: net total, committed total, one squad's utilisation | 1 |

**Thirteen days.** If the numbers match at stage 8 and the work item screen is responsive, the rest is
volume rather than risk. If they do not, the problem is almost always the date arithmetic: the engine
works in UTC so a day is always a day, and Power Fx dates are local by default.

After the slice, in order: Plan and the register, Team, the import flow, Timeline, Value, Money,
Close, Settings. Roughly 30 to 40 further days of build for a single maker, plus the estimates above
for flows, testing and ALM.
