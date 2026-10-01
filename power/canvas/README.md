# The canvas app build

The authored sources live in `../app`. This folder is where they become an `.msapp`.

- `source/` is a blank app, downloaded from the environment and unpacked in the SourceCode layout.
  It is the skeleton: `Src/*.pa.yaml` and `Waypoint.msapr`. Do not edit it by hand.
- `build/` is the working copy the assemble script writes. It is a build output; delete it freely.
- `Waypoint.build.msapp` is what `pac canvas pack` produces from `build/`.
- `downloads/` holds every dated `.msapp` `scripts/refresh-skeleton.mjs` pulls from the environment.
- `source.prev/` is the skeleton `refresh-skeleton.mjs` replaced last time, kept for comparison.

## Download and refresh the skeleton before every assemble

The Dataverse table connections Craig adds in Studio with **Add data** live inside the app's
`.msapp`, in `References/DataSources.json`, not in `../app`. `source/` is only a copy of that
`.msapp` from whenever it was last downloaded, so **assembling and packing from a stale skeleton
overwrites those connections** with the blank app's none. Run `scripts/refresh-skeleton.mjs`
immediately after any Studio edit, and always before assembling:

```bash
node scripts/refresh-skeleton.mjs
node scripts/assemble-canvas.mjs
```

`refresh-skeleton.mjs` downloads the current app to a dated file under `downloads/`, unpacks it
into `source/` (keeping the skeleton it replaces as `source.prev/`), and prints every entry name in
the download alongside the data source names it finds at `References\DataSources.json` (the zip
entry's own separator; the lookup matches it on either slash), so the Dataverse tables can be
checked by eye before packing. It also writes those names to `source/datasources.json`, next to the
skeleton, for `assemble-canvas.mjs` to read without re-opening the zip. `assemble-canvas.mjs`
refuses to run if no name there starts with `wp_` (falling back to reading the newest `.msapp`
under `downloads/` if `source/datasources.json` is missing), so a pack from a skeleton that
predates Craig's tables cannot go through unnoticed; `--allow-empty-datasources` overrides this,
which is needed before any table exists.

## The round trip

1. **Download a blank app.** Create an empty canvas app in the environment, then
   `pac canvas download --name Waypoint --file power/canvas/Waypoint.msapp`.
2. **Unpack it.** `pac canvas unpack --msapp power/canvas/Waypoint.msapp --sources
   power/canvas/source --layout SourceCode`. That is what `source/` already holds.
3. **Assemble.** `node scripts/assemble-canvas.mjs`. It copies `source/` to `build/`, then writes
   our App, screens, components and editor state into `build/Src`, then runs
   `scripts/yamlcheck.mjs --yaml build/Src` and fails the build if any file there is not well
   formed YAML.
4. **Pack.** `pac canvas pack --sources power/canvas/build --msapp
   power/canvas/Waypoint.build.msapp --layout SourceCode --overwrite`.
5. **Patch the display settings.** `node scripts/patch-msapp.mjs
   power/canvas/Waypoint.build.msapp`. Pack writes the blank app's `Properties.json` every time, so
   without this the app is a fixed 1366x768 canvas scaled to fit and letterboxed. See below.
6. **Export the solution** that holds the app, unpack it with `pac solution unpack`, replace the
   `.msapp` under `CanvasApps/` with `Waypoint.build.msapp`, `pac solution pack` it again and
   `pac solution import --async true` the result, then poll for it landing rather than retrying the
   import (`power/solution/README.md`). `scripts/import-app.mjs` runs steps 3-6 in one command.
   The solution now also holds `Controls/wp_Waypoint.SprintGrid/`: unpack and pack carry it
   through, so leave it alone and only replace the `.msapp`.
7. **Open the app for edit in Studio.** This is the step that validates the YAML. Fix what it
   reports in `power/app`, then run from step 3 again.

## The exact commands

```bash
node scripts/build-column-catalogue.mjs
node scripts/fxcheck.mjs
node scripts/check-formulas.mjs
node scripts/refresh-skeleton.mjs
node scripts/assemble-canvas.mjs
pac canvas pack --sources power/canvas/build --msapp power/canvas/Waypoint.build.msapp --layout SourceCode --overwrite
node scripts/patch-msapp.mjs power/canvas/Waypoint.build.msapp
```

`node scripts/fxcheck.mjs` must print `0 errors` and `0 formulas skipped` before anything is
packed. It is the gate, not an opinion: a formula it reports is a formula Studio reports.

`scripts/yamlcheck.mjs` is the other gate, run automatically at the end of `assemble-canvas.mjs`:
it parses every file under `build/Src` with YamlDotNet's own strict parser (`tools/yamlcheck`, the
.NET side, the same pattern as `tools/fxcheck`) and reports `file:line:col` for anything that is
not well-formed YAML, such as a `//` comment written where YAML wants `#`. `pac canvas pack` does
not parse the YAML it packs (see below), so this is what catches a syntax fault before Studio does.

## The display settings pack cannot write

Settings > Display in Studio is not in the YAML. It is in `Properties.json` at the root of the
`.msapp`, and `pac canvas pack` writes the blank app's own values there on every pack, so a packed
build is always a fixed 1366x768 canvas, scaled to fit and letterboxed inside the browser window.
`scripts/patch-msapp.mjs` rewrites four keys in the packed `.msapp`, in place:

| Key | Packed | Patched | Studio's name |
| --- | --- | --- | --- |
| `DocumentLayoutScaleToFit` | `true` | `false` | Scale to fit |
| `DocumentLayoutMaintainAspectRatio` | `true` | `false` | Lock aspect ratio |
| `DocumentLayoutLockOrientation` | `false` | `false` | Lock orientation |
| `DefaultConnectedDataSourceMaxGetRowsCount` | `500` | `2000` | Data row limit |

With those three off the published app fills the window, the way a React app does. Every screen
must then size from `Parent.Width` and `Parent.Height` (`App.Width` and `App.Height` at the top
level) rather than from 1366 and 768 (`../RUNBOOK.md`).

`DocumentLayoutWidth` and `DocumentLayoutHeight` stay at 1366x768 and `DocumentAppType` stays
`DesktopOrTablet`: with scale to fit off, the width and height are only the size of Studio's
authoring canvas.

Node has no zip library here, so the script opens the zip with .NET's `System.IO.Compression`
through PowerShell, the same way `refresh-skeleton.mjs` reads a download, and edits the four values
as text. Nothing else in `Properties.json` moves and no other entry in the `.msapp` is rewritten:
hashing every entry of the packed and the patched file, `Properties.json` is the only one that
differs, and `pac canvas unpack --layout SourceCode` on the patched file still succeeds with a `Src`
identical to `build/Src`. Running the script twice is safe; the second run writes nothing.

The same script also drops two entries from `References/DataSources.json` in the packed `.msapp`:
`SpatialServices` and `SpatialServices_1`, the sample screen's leftovers, which no formula reads and
which a pack carries through every round trip. The entry is rewritten from its own parsed JSON at
the indentation and line ending it came with, so every other data source keeps its place: on the
current `Waypoint.build.msapp` it went from 103 names to 101, the two `SpatialServices` entries
gone and the `wp_` tables, option sets and views untouched. A second run reports nothing to drop.

## Validating formulas offline

`scripts/fxcheck.mjs` binds every formula in `../app` with Microsoft's own Power Fx compiler
(`tools/fxcheck`, Microsoft.PowerFx.Core) against a symbol table built from `columns.json`. It is
the binding half of Studio's validation, done offline, and it is the first step of the pipeline
above. Zero errors and zero skipped formulas is the only acceptable result.

A table in `columns.json` is not a table a formula may read. Only the tables Studio has connected
with Add data are, and those are the ones `refresh-skeleton.mjs` records in
`source/datasources.json`: a table arrives there as its logical name, as `default.cds_<logical>_views`
and as its display name, while `wp_person_wp_lead` and its like are option sets and name no table.
The checker reads that file (`--datasources`, the skeleton's copy by default) and reports a formula
that reads anything else as `Table 'Quarter snapshots' is not connected in the app (Add data in
Studio)`, which is Studio's own `'Quarter snapshots' isn't recognized` caught offline. The table is
still typed, so the rest of the formula is still checked. `--all-tables` lifts the check for an
experiment; nothing in the pipeline passes it.

What the last run of it found, and what each class cost:

- **A computed column that collides with a Dataverse one.** `A column named 'Status' already
  exists`: `colWork` carries Dataverse's own `Status` (statecode), so `WorkStatusTable` could not
  add one. The column is `DeliveryStatus`, and `DeliveredRows`, `OnTimeCount` and the Command
  screen's decisions list read the new name. This one fault made 282 of the 312 findings: a named
  formula that errors has no columns, so every reader of it reports `Name isn't valid` too.
- **The single-column shorthand.** `PersonName in colPeople.'Full name'` is canvas dialect that
  Power Fx Core does not carry, so `QuarterAbsenceMW` and `SprintAbsences` had no type and
  `Sick`, `PersonName` and `MW` looked unknown on every screen that read them. Both are now
  `!IsBlank(LookUp(colPeople, 'Full name' = PersonName))`, which says the same thing in plain
  Power Fx.
- **GroupBy.** `SprintNowWeeks` was `AddColumns(GroupBy(...), DayCount, CountRows(Days))`, and
  Power Fx Core has no `GroupBy`, so the formula was skipped and `SprintNowAvailable` could not
  see `WK.Mon` or `WK.DayCount`. The day rows are now their own named formula, `SprintNowDays`,
  and `SprintNowWeeks` is `ForAll(Distinct(SprintNowDays, Mon) As W, ...)` with a `CountRows` per
  Monday. Nothing is skipped now.
- **`As` names the scope it is on.** `Filter(WorkStatusTable As X, Counted, ...)` on
  `scrCommand.OnVisible`: once a scope is named, its columns are read through the name, so the
  predicates are `X.Counted` and `X.CommitmentText`.
- **A collection with no shape.** `LoadData(colPreferences, ...)` was the only thing in
  `App.OnStart` that touched `colPreferences`, so `First(colPreferences).Theme` read a column
  nothing declared and the theme toggle's `ClearCollect(colPreferences, { Theme: varTheme })` on
  both screens could not type its record. OnStart now shapes the collection, and clears it, before
  loading it.

One finding needed the checker extended rather than the formula changed. A canvas component's
custom properties are declared in `../app/Components.pa.yaml` and nowhere else, so
`cmpStepper.Steps` was a name the tool could not know and `cmpStepper.CurrentIndex` failed on it.
`scripts/fxcheck.mjs` now reads each component's `CustomProperties` block and `tools/fxcheck`
types the component as a record of them, each property from its own `Default` formula, falling
back to its declared `DataType`. A component with a behaviour property is left untyped, because
`cmpX.OnSomething(arg)` is a call and not a record field read.

`scripts/check-formulas.mjs`, the heuristic checker, was wrong about `Distinct`: its second
argument is an expression in the table's own scope, not in the enclosing one. It reads it that way
now and is back to zero findings.

## The column catalogue and the formula checker

The first three steps are the offline half of Studio's validation, and nothing is packed until the
checker is clean.

`scripts/build-column-catalogue.mjs` reads `../solution/src/customizations.xml` and writes
`columns.json`: every `wp_` table under the name Studio shows it (the localized collection name,
which is the name Power Fx uses), its logical name, and every attribute's display name, logical
name and type, with a choice's options and values and a lookup's target table. The standard columns
Dataverse adds are appended (`statecode`, `statuscode`, `createdon`, `modifiedon`, `ownerid`). The
solution is the authority, not `../waypoint.model.yaml`: anything the model marks `computedIn: app`
or `computedIn: dataverse` was never created, so a formula that reads one is reading a column that
does not exist.

`scripts/check-formulas.mjs` reads `../app/App.pa.yaml`, `Formulas.pa.yaml`, `Components.pa.yaml`
and `Screens/*.pa.yaml` against that catalogue and prints the file, the formula and the fragment for
each finding. It resolves a table expression to its columns the way Power Fx does — a collection
through the `ClearCollect` in `OnStart`, a named formula through its own `AddColumns`, `ForAll` or
`GroupBy`, a lookup through the table it points at — so it can tell a column that exists from a
column an earlier step in the same chain added. Its classes are `unknown-name`, `bool-misuse`,
`arith-misuse`, `dot-on-scalar`, `choice-vs-text`, `lookup-bare`, `text-format` and `arity`.
`--usage` adds which named formulas the two screens and the four components reach, which is how
`../app/Formulas.parked.yaml` was separated from `Formulas.pa.yaml`.

It is a heuristic and it under-reports: an expression it cannot resolve to a table is left alone
rather than guessed at. It does not replace opening the app in Studio; it makes that open cheap.

### The modern controls' own table

`tools/fxcheck/modern-controls.json` is the modern controls' property and enum table, built from
`../reference/canvas-apps-04-modern-controls-reference.md` (one section per control) and from the
instances Studio itself configured in `source/Src/Screen1.pa.yaml`, which is authoritative wherever
the two differ. It carries 22 controls, each under the identifier and version the YAML writes
(`ModernButton@1.0.0`, `Badge@0.0.24`, `Header@0.0.44` and the rest), every property that control
takes with its type, and the enum type each enum-valued property reads from. `scripts/fxcheck.mjs`
passes it to the checker with `--modern`, and records the `Control:` identifier on every property
it sends, so the checker knows which control a property sits on.

Two things follow.

**The modern enums bind.** All 42 enum types are declared with their members, under the names
Studio writes: `ButtonAppearance.Primary`, `Appearance.FilledLighter`, `IconStyle.Filled`,
`ButtonLayout.IconAfter`, `'BadgeCanvas.Appearance'.Ghost`, `'BadgeCanvas.Shape'.Square`,
`'BadgeCanvas.ThemeColor'.Danger`, `'Header.Style'.Light`, `AvatarColor.Beige`,
`AvatarShape.Square`, `PresenceBadge.Busy`, `OptionLayout.HorizontalStacked`,
`ToggleLabelPosition.Above`, `SpinnerAppearance.Inverted`, `SpinnerLabelPosition.Below`,
`ProgressShape.Square`, `ProgressThickness.Large`, `ProgressColor.Success`,
`DatePickerFormat.Short`, `DateTimeZone.UTC`, `LinkAppearance.Subtle`, `TextInputType.Multiline`,
`SliderSize.Medium`, `DecimalPrecision.Auto` and the shared `Font`, `FontWeight`, `Align`,
`VerticalAlign`, `DisplayMode` and `BorderStyle`. A dotted name is quoted, the way Studio wrote it.
The swap in `../app` no longer has to leave `Appearance`, `Shape`, `ThemeColor` and `Style` unset.

**A property name on a modern control is checked.** A name the control does not carry is reported
as `Unknown property Sparkliness for ModernButton@1.0.0`, with the file and the line. Only the 22
controls in the table are checked this way: a classic control, a canvas component and a modern
control the reference does not describe (`ModernIcon`, `ModernRating`) are left exactly as they
were, so nothing about the classic set's behaviour changed.

**A binding property is typed from its own control's Items.** Three property types in the table are
not plain Power Fx types but references to the control's `Items`: `ItemsRow` on a Dropdown's and a
Tab list's `Default`, `ItemsRowTable` on a Combo box's `DefaultSelectedItems`, and `ItemsText` on
the `ItemDisplayText` of a Dropdown and a Combo box. The checker binds the control's own `Items`,
takes its row, and then binds `ItemDisplayText` with that row as `ThisItem` — so `ThisItem.Value1`
against `Items: =["All", "Features"]` is reported as `'Value1' isn't recognized`, the column of a
table literal being `Value` — and rejects a `Default` that is not a record from `Items` with
`Default on ModernDropdown@1.0.2 takes a value compatible with Items`, which is Studio's `Invalid
formula. Expected a value compatible with 'Items'`. A Tab list has no `ItemDisplayText`; the
reference's Tab List section does not carry one, so the table does not either.

Two deliberate softenings keep the table from reporting things that are not faults. A member the
table does not list but a source uses is still accepted, because the reference's prose does not
enumerate every member of every enum; only the enum type name has to be one the table knows. And
`X`, `Y`, `Width`, `Height`, `Visible`, `ZIndex` and `DisplayMode` are accepted on every modern
control, whichever section of the reference describes it.

Regenerate the table from the reference and Screen1 whenever either changes; it is data, and
nothing else in `tools/fxcheck` needs editing to add a control or an enum.

## `pac canvas validate` is gone

`pac canvas validate` was withdrawn: CLI 2.12.2 answers `'pac canvas validate' is no longer
supported`. `pac canvas pack` does not validate either. It copies the `.pa.yaml` files into the
`.msapp` verbatim, and it succeeds on YAML that is not even well formed, let alone schema-correct.
Its own warning says so: "Canvas apps packed using yaml SourceCode must be validated first by
opening the app for edit within the Power Apps studio."

So two things are true of this build. The YAML is checked against `../../pa.schema.yaml` by hand
and against `columns.json` by `check-formulas.mjs`
before packing, and every control type identifier is a guess until Studio opens the app. The ones
that are not certain carry a `# check:` comment in `../app`: `GroupContainer`, `Text`, `Button`,
`Gallery`, `Image`, `TextInput`, `DropDown`, and the `Variant` names beside them. Studio names the
ones it does not recognise; correct them in `../app` and reassemble.

## What this unit produced

- `scripts/assemble-canvas.mjs`, which makes the build repeatable from `../app` alone.
- `build/Src/App.pa.yaml`: the blank app's `Theme`, our `StartScreen`, `OnStart` and one `Formulas`
  block, merged from `../app/App.pa.yaml` and `../app/Formulas.pa.yaml` by name, with
  `Formulas.pa.yaml` as the authority. 241 named formulas and functions.
- `build/Src/scrCommand.pa.yaml` and `build/Src/scrWorkItem.pa.yaml`: the shell, the Command screen
  and one work item screen, named as Studio names a screen file.
- `build/Src/Components/cmpBand.pa.yaml`, `cmpStat.pa.yaml`, `cmpPill.pa.yaml` and
  `cmpStepper.pa.yaml`: one file per sliced component, as Studio saves them. `cmpSquadSnap` stays in
  `../app` for later; the Squads card is a plain Gallery in this slice.
- `build/Src/_EditorState.pa.yaml`.
- `Waypoint.build.msapp`.

`Screen1` and `Screen2`, the blank app's own screens, are removed, and `ScreensOrder` is written
from the same list the screens come from, so the two cannot disagree. The assemble script also
removes any stale `Command.pa.yaml`, `WorkItem.pa.yaml`, `Components.pa.yaml` or
`DataSources.pa.yaml` a previous layout or a stale skeleton left behind, so a rerun replaces the
build's files rather than adding to them.

## Data sources

The app declares no data sources. The tables are connected once, in Studio, with **Add data**, and
`../app/DataSources.reference.yaml` lists which ones and under which names. The name Studio gives a
table is its display collection name from `../waypoint.model.yaml`, and that is the name Power Fx
uses: `People`, `Squads`, `'Work items'`, `'Work states'`, `'Size bands'`, `'List values'`,
`'Bank holidays'`, `'Benefit claims'`, `'Benefit actuals'`, `'Grade blend lines'` and the rest. A
name with a space goes in single quotes. The settings singleton's display collection name is
`Settings`, which the Power Apps host object already owns, so `App.OnStart` reads it as `[@Settings]`.

Every `ClearCollect` in `OnStart` sits inside `IfError`, with `Clear` of the same collection as the
fallback, so a table that is not connected yet leaves an empty collection and the screens still open.

Two system tables are connected the same way and are not `wp_` tables: `Environment Variable
Definitions` and `Environment Variable Values`. The app reads `wp_SourceOfTruth` and
`wp_UseGridControl` through them (`../RUNBOOK.md`, section 7), so both must appear in
`References/DataSources.json` alongside the `wp_` tables before those formulas bind.

After the first successful open, Craig adds data for each `wp_` table, then we run
`node scripts/refresh-skeleton.mjs` to refresh `source/`. After that the skeleton carries the
connections and the assemble script keeps working unchanged.

## Comparing the skeleton's screens and components against ours

After a round trip, `source/Src` carries Studio's own copy of every screen and component
alongside the blank app's `App.pa.yaml`. Diffing that copy against what `assemble-canvas.mjs`
writes from `../app` (property by property, ignoring order) turns up no rewritten formula, no
renamed identifier and no changed quoting in the Command screen, the Work item screen or any of
the four sliced components. What Studio does add, harmlessly, on every open:

- An explicit `X: =0` / `Y: =0` on a control that leaves position at its default, which `../app`
  never states because 0 is already the default.
- A blank `="` placeholder for a component's custom property on an instance that never sets it
  (`Tone`, `Unit`, `OnBrand` on the `cmpStat`/`cmpPill` instances that do not override them).
- The property order within a control, which Studio always writes coordinates first (`X`, `Y`,
  `Width`, `Height`) then the rest, where `../app` groups them by what a reader would ask first.

None of this is worth adopting into `../app`: it is Studio's own formatting, reproduced identically
on every open, and matching it by hand would only make the authored files harder to read for no
behavioural gain.

## What Studio has rejected

Studio is the only validator, so each open produces the next round of corrections. What it has
reported, and what was done about it:

- `Command.pa.yaml(533,33) PA2305: Canvas Component instances are not allowed as a descendant of
  control type 'Gallery'`, with `PA2141` beside it about exceeding replication level 1. A component
  instance may not sit in a gallery template, directly or through a second gallery. The one instance
  that did, `rowPill` in the decisions gallery, is now a `Label@2.5.1` carrying `cmpPill`'s own Fill,
  Color and border formulas against `ThisItem.Tone`. Instances outside galleries are fine and
  are unchanged. `WorkItem.pa.yaml` has five, all under `GroupContainer`, so none of them moved.
- `DataSources.pa.yaml(35,3) PA1022: The top-level object kind 'DataSource' is not supported for the
  current action`. `pa.schema.yaml` has `DataSources` as a top-level key but Studio will not read one
  in the SourceCode layout. The file is no longer packed, `scripts/assemble-canvas.mjs` deletes it
  from the build, and `../app/DataSources.pa.yaml` is now `../app/DataSources.reference.yaml`, kept
  only as the record of which tables to connect.
- `Command.pa.yaml(551..554,37) PA2108: Unknown property 'RadiusTopLeft' / 'RadiusTopRight' /
  'RadiusBottomLeft' / 'RadiusBottomRight' for control type 'Label@2.5.1'`. A classic Label has no
  corner radius. The four properties are removed from `rowPill`, the decisions pill, which keeps its
  square 1px `NeutralStroke1` border and its tinted Fill. A `Classic/Button@2.2.0` would round but a
  button inside a gallery row takes the click off the row, so the Label stays. Radius on
  `Classic/Button@2.2.0`, `Classic/TextInput@2.3.2`, `Rectangle`, `Image@2.2.3` and
  `GroupContainer@1.5.0` is valid and is unchanged. Every other property in `../app` was checked
  against the set Studio wrote for the same control type in `sample3/Src/Screen2.pa.yaml`, and this
  was the only one outside it.
- 568 formula errors, 5 runtime errors and 3 data source warnings on the first open after the tables
  were connected. Five classes, and what each one cost:
  - **User-defined functions are not available.** `'ItemSized' is an unknown or unsupported
    function`, and the same for `ItemCancellable`, `PhaseOf`, `DeliveryStatusOf`, `AbsenceRowMW` and
    `Counts`. They are a preview feature and the work environment will not have it on. Every one of
    the 98 functions is gone from `../app`. Each is replaced either by a named formula that is a
    table with the computed column already on it, so a screen reads a column, or by the same
    expression written inline at its single use; the comment above each replacement names the
    function it stands for. The new tables are `DayGrid` (WorkingDays), `BankHolidayDayRows`
    (BankHolidayDays), `SprintGrid` (SprintStart, SprintEnd, sprintWorkingDays), `PeopleTable`
    (DaysPerWeek, ModifierOf, AbsenceDaysOf, NetMW, NetFactor), `AbsenceQuarterTable`
    (AbsenceRowMW, IsSickness), `WorkBase` and `WorkStatusTable` (OwnMW, PhaseOf, CommitmentOf,
    Counts, InPlan, WorkMW, DeliveryStatusOf, GradeRateOf, ClaimMonth, ClaimShare, BenefitInYear,
    ItemSized, ItemCancellable), `ReservationRows` (ReservationDrawn) and `SquadTable` (SquadNetMW,
    SquadCommittedMW, SquadReservedMW, SquadUtilisation). The rules no screen binds to yet, all of
    which needed a per-candidate walk that only a function can express, are parked: the capacity
    check finish walk, calibration, the archive, the sprint plan matrix and the quarter compare.
    They come back, as tables, with the screens that need them.
  - **A choice column is an enum, not a record.** `Name isn't valid. 'Value' isn't recognized` on
    `wiKind.Label`, `wiKindValue.Text` and `wiSave.OnSelect`, with `The function 'Trim' has some
    invalid arguments` beside the last. A Dataverse choice is read for display with `Text(...)` and
    compared and patched with the enum named for its column and its table's plural display name,
    `'Kind (Work items)'.Feature`. Lookups are the opposite and do carry columns: Region, Absence
    type, Booking type and Category all read `.Value`, the primary column of List values. The Trim
    errors were a second fault in the same formula: a `Classic/TextInput@2.3.2` carries its text in
    `.Text`, and `.Value` is the modern control's name for it.
  - **The named-formula tables `scrCommand.OnVisible` filters failed upstream.** `Name isn't valid.
    'Utilisation' / 'Name' / 'Status' / 'Title' isn't recognized`, `The function 'Filter' has some
    invalid arguments`, `Invalid argument type` and `Incompatible types for comparison` were all one
    fault: `SquadTable` and `WorkStatusTable` called functions, so both were errors and neither had
    columns. `AddColumns` also wants its column names as text, which the first cut of
    `WorkStatusTable` did not give it. Both now produce explicit columns under the exact names
    OnVisible reads.
  - **Dotting something that is not a record.** `The '.' operator cannot be used on ...` for
    `wiStepper.Current` and `wiAssess.Visible`: both read `ItemStatusRow.ItemPhase`, and
    `ItemStatusRow` was a LookUp over the broken `WorkStatusTable`. `cmpStepper.Current` stays a
    Text input property. `Expected Table value` on `wiStateInput.Items` was `Sort(colStates,
    Sequence)`: Work states calls that column Order. `Name isn't valid. 'Name' isn't recognized` on
    `wiEpicInput.Default` was the same kind of thing: Epics carries its name in the Epic column, and
    the dropdown now takes the flat `EpicOptions`.
  - **Division by zero, and an invalid data source at run time.** `cmdEyebrow.Text` and
    `cmdSprintDates.Text` divide by the sprint length and the member week, and Settings and Quarters
    can still be loading when the screen first paints. `SprintDays`, `MWDays` and the quarter's
    working days are now `Coalesce`d to zero and each has a floored twin, `SprintDaysOr1`,
    `MWDaysOr1`, `QuarterWorkingDaysOr1`, which is what every division uses. `The data source
    supplied to the function is invalid` on `wiConclude.Visible`, `wiReasonLabel.Visible` and
    `wiReasonInput.Visible` followed from the broken dropdown: `LookUp(colStates, State =
    wiStateInput.Selected.Value)` cannot resolve while `Items` is an error.
  - `Unused data sources: SpatialServices, Business grades, Grade blends` is left alone. It is a
    warning, not an error, and the last two are read by rules that are parked.
- `App.pa.yaml(12,5) PA1001: duplicate property 'StartScreen'`. Studio writes its own `StartScreen`
  as the first property of the App entity, so a skeleton downloaded after an open carries one, and
  the assemble script adds ours below it. `inlineProperties` keys the skeleton's properties by name
  and `assemble-canvas.mjs` drops `StartScreen`, `OnStart` and `Formulas` from that set before
  writing ours, so the build has one of each however many the download had.
- 489 formula errors on the open after the tables were connected. Three classes, all in
  `App.Formulas` with the screens cascading off it:
  - **A reserved word cannot be a column name.** `Use of a reserved word that is currently not
    supported`, three times, on the `Children` column of `WorkBase` where `WorkStatusTable`,
    `SprintNowCommitted` and the sprint rules read it back as an identifier. `Child`, `Children`
    and `Siblings` are reserved in Power Fx even though nothing in the language uses them yet. The
    column is now `ComponentCount`, which is what it counts, and the Dataverse column it reads
    stays `'Component count'` in single quotes. `Not Sick` and `Not IsBlank(Lands)` went the same
    way, to `!Sick` and `!IsBlank(Lands)`: `Not` is a function, not a prefix operator.
  - **Column names are identifiers, not text.** `Expected identifier name`, four times, one per
    call, then `The function 'AddColumns' has some invalid arguments` and `Name isn't valid.
    'PersonName' / 'MW' / 'Component count' / 'WorkStatusTable' isn't recognized` behind it, and
    the same cascade through every `Filter`, `Sum` and `Coalesce` that reads one of those tables.
    This app has the modern behaviour, where `AddColumns(t, Col, expr)` names the column as a bare
    identifier and a quoted `"Col"` is a text value in an argument that wants a name. Every column
    name in `AddColumns` and `GroupBy` in `Formulas.pa.yaml`, and the `SortByColumns(SquadTable,
    Utilisation, ...)` in `scrCommand.OnVisible`, is now an identifier. A name with a space would
    take single quotes; none of ours has one.
  - **Number formats.** `Incorrect format specifier for 'Text'` on `wiStatMW.Sub`, `wiStatMW.Value`
    and `wiStatValue.Value`. Every numeric format is now en-US and has no `#` after the decimal
    point: `"[$-en-US]#,##0.0"` for MW, `"[$-en-US]#,##0"` for counts and money, with the `£` as
    literal text in front of the `Text()` rather than inside its format. The SVG coordinates in
    `MonthBarsSvg` lost their `"[$-en-US]#,##0.##"` for the same reason. Date formats are
    unchanged.
  - The decisions collection's `Text` column is now `Message`. `Text` is a function name, and a
    column that shadows one is worth neither the risk nor the argument.
- 467 formula errors, 378 of them under `App.Formulas`, on the open after that. Almost all of them
  were one broken column cascading: a named formula that errors has no columns, so every `Filter`,
  `Sum` and `LookUp` over it reports `Name isn't valid` for each column it reads, and the screens
  report it again. Five roots, all of them now found offline by `scripts/check-formulas.mjs`:
  - **A column the model computes does not exist in Dataverse.** `Name isn't valid. 'Component
    count' isn't recognized`, and behind it `'Done in sprint' / 'FTE released' / 'Counted' /
    'Impact' / 'CommitmentText' / 'InPlanFlag' / 'WorkMWValue' / 'Status' / 'StateName' / 'Title' /
    'Squad' / 'Kind' / 'Phase' / 'Category'` through `WorkBase`, `WorkStatusTable`, `SquadTable`,
    `ReservationRows` and both screens, with `The function 'AddColumns' / 'Filter' / 'Sum' /
    'LookUp' / 'IsBlank' has some invalid arguments` and `Incompatible types for comparison` beside
    them. `'Component count'` is `computedIn: dataverse` in `../waypoint.model.yaml` and
    `build-solution.mjs` does not create a computed column, so the table has no such column.
    `WorkBase` now counts its own: `ComponentCount, With({t: Title}, CountRows(Filter(colWork,
    'Part of'.Title = t)))`, over the parent lookup the solution does have. The fix for the class:
    compute it as an `AddColumns` step, or drop it.
  - **`Coalesce()` on a two-option column.** `The function 'Coalesce' has some invalid arguments`
    and `Invalid argument type. Expecting one of the following: Number, Date, ...` on
    `LogAbsences = Coalesce(Waypoint.'Deduct absences', false)`. A Dataverse two-option column is
    never blank, so `Coalesce` has nothing to do and refuses the type. It reads
    `Waypoint.'Deduct absences' = true`, which is also false when Settings has not loaded.
  - **`LookUp()` takes one condition.** `Invalid number of arguments: received 4, expected 2-3` in
    `ReservationRows`, which passed a `Filter`'s three conditions to a `LookUp`. They are now one
    condition joined with `&&`. Every flagged call's arity is checked against the same table the
    checker carries.
  - **`ThisRecord` is the innermost scope.** `The '.' operator cannot be used on Boolean values` and
    `Expected number` on `scrCommand.OnVisible`, where `Filter(colAssignees, 'Work item'.Title =
    ThisRecord.Title)` sat inside `Filter(WorkStatusTable, ...)`: `ThisRecord` there is the
    assignee, which has no `Title`. The outer table is named, `Filter(WorkStatusTable As X, ...)`,
    and the inner condition reads `X.Title`.
  - **A screen that does not exist.** `App.StartScreen` was `scrLoading`, which no file defines. It
    is `scrCommand`, the screen the slice opens on.
  The other error classes the checker covers, from the same reading of the sources: arithmetic on a
  text, choice or lookup column; `.Something` on a scalar; a choice compared with a text literal
  rather than its enum or `Text()`; a lookup read without one of its columns; and `Text()` with a
  `#` after the decimal point.
- The named formulas no surface in the slice reads are in `../app/Formulas.parked.yaml`, which
  nothing packs: `TimelineWeeks`, `WeekCount`, `InPlanMW`, `DeliveredMW`, `FteTarget`, the work item
  screen's `ItemStatusRow`, `ItemSteps`, `OwnerOptions`, `StateOptions` and `EpicOptions`, and the
  four theme names nothing reads: `BrandBgSoft`, `NeutralStroke2`, `HeaderHeight`, `TypeBodyWeight`.
  scrCommand is the only surface with engine formulas behind it; scrWorkItem keeps its layout, its
  header, its stepper and its Shape fields, and every property that read a parked formula is a
  placeholder under a `# parked:` comment naming it. Studio
  validates the App entity as a whole, so every formula that is in it and unread is another error
  message between Craig and the one that matters. `node scripts/check-formulas.mjs --usage` lists
  what the two screens and the four components actually reach; everything else belongs in the
  parked file until the screen that needs it arrives.

`pac solution import` answered `The underlying connection was closed` on every attempt of this
round trip and `Cannot start another [Import] because there is a previous [Import] running` in
between, and the import landed all the same. Neither message is a result. The only check that
counts is a download: `pac canvas download` then `pac canvas unpack`, `diff` the `Src` against
`build/Src`, and read `References/DataSources.json` out of the downloaded `.msapp` to confirm the
nineteen Dataverse tables are still on it.
