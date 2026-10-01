# Runbook

The single authoritative set of commands and rules for changing the Waypoint canvas app or
Dataverse solution. Follow it in order. Do not skip the offline checks; a Studio round trip is the
expensive part of this build.

## 1. Paths and identifiers

- CLI: `pac`. If pac is not on PATH, set PAC_CMD to its full path; the scripts read it.
- .NET: `C:/Program Files/dotnet/dotnet.exe`, used by `tools/fxcheck` and `tools/yamlcheck`.
- Auth profile: `lumen`. Select it and confirm before anything writes: `pac auth select --name
  lumen`, then `pac org who`.
- Environment: `https://<your-org>.crm.dynamics.com/`.
- Publisher prefix: `wp`. Solution unique name: `Waypoint`. Run every command from `waypoint`.

## 2. The pipeline

Each step, in order, with what a pass looks like.

**The base rule.** Every non-`Src` entry a build carries — `Properties.json`, `References/*`,
`Controls/*`, `Components/*`, `Resources/*` — comes from `power/canvas/golden/skeleton.msapp`, the
last package Studio opened. `pac canvas pack` copies those entries verbatim out of the `.msapr` the
unpack wrote beside `Src`, so the package the skeleton came from is the package Studio is asked to
open. A download from the environment is never a base: the environment held a corrupted
`References/DataSources.json` from 19:54 on 2026-09-21, and every build that inherited it answered
`ErrOpeningDocument`. The golden advances only by `node scripts/promote-golden.mjs
power/canvas/downloads/<file>.msapp --reason "<why>"`, run after Craig confirms Studio opened that
build (section 4, "The golden base").

1. **`node scripts/refresh-skeleton.mjs`** — always first. Unpacks `power/canvas/golden/skeleton.msapp`
   into `power/canvas/source`, records the base in `power/canvas/source/base.json`, and downloads the
   current app to `power/canvas/downloads/` for the poll comparison and for the data source names it
   prints from the download's `References/DataSources.json`. Pass: at least one name starts with
   `wp_`. If none does, use `--allow-empty-datasources` only before any table exists.
   First run, or no environment: `node scripts/refresh-skeleton.mjs --offline`.
2. **`node scripts/assemble-canvas.mjs`** — copies `source/` to `build/`, so the build's non-`Src`
   base is the golden's `.msapr` and nothing else; it refuses to run when `source/base.json` says the
   skeleton came from anywhere but the golden now on disk. It then writes `power/app` into
   `build/Src`, compiles the table geometry declared in `power/canvas/tables.json` into the screens
   it just wrote, then runs yamlcheck itself. A component the skeleton still carries but `power/app`
   no longer defines is pruned from `build/Src` with a WARN line, not a hard fail. Pass: exits
   clean, printing one `id (cells)` pair per compiled table.
3. **`node scripts/yamlcheck.mjs --yaml power/canvas/build/Src`** — already run by step 2; run
   standalone only to re-check without reassembling. Pass: no `file:line:col` output.
4. **`node scripts/fxcheck.mjs`** — binds every formula in `power/app` against
   `power/canvas/columns.json`, and against `power/canvas/source/datasources.json` for which of
   those tables Studio has actually connected (`--all-tables` lifts that, for experiments only).
   Pass: `0 errors`, `0 formulas skipped`, and the printed count not
   lower than the last import's — the baseline grows with each screen. Named-formula count
   The named formula baseline lives in `power/canvas/invariants.json` and moves only by `--update-baseline`; the audit log records why. A lower count without a deliberate
   `power/app` change is a regression. `User()` is rewritten to a typed record symbol
   (`FullName`, `Email`, `Image`) and the regular expression functions (`IsMatch`, `Match`,
   `MatchAll`) are enabled, so both bind offline; `User().Nope` is still an error. A Dropdown, Combo
   box or Tab list is typed as a record of its own properties, with `Selected` and `SelectedItems`
   carrying its own Items' row and table, so `ForAll(ctl.SelectedItems As P, P.Nope)` is still an
   error too.
5. **`pac canvas pack --sources power/canvas/build --msapp power/canvas/Waypoint.build.msapp
   --layout SourceCode --overwrite`** — pass: exits clean. Pack is not validation; it copies YAML
   in verbatim even if malformed, so steps 3, 4 and 7 are the only gates that count.
6. **`node scripts/patch-msapp.mjs power/canvas/Waypoint.build.msapp`** — rewrites the display
   settings pack cannot write, and carries the code component registrations it cannot write either:
   for every `ComponentName` a `Control: CodeComponent` names in the packed Src, the entries that
   register it are taken from the download the skeleton came from: for a custom control, the
   `CustomControl` record out of `Properties.json` merged into the build's own `components` array
   and the control's `Resources/Controls` bundle and css copied whole; for a core control, the
   `PcfTemplates` record, whole where the build has not got the file and merged record by record
   where both have it. Package JSON is never round-tripped through a plain `JSON.parse`/
   `JSON.stringify` here: every edit goes through `readJsonEntry`/`writeJsonEntry`, which protect a
   big integer (an Int64 `MaxValue`/`MinValue` cached on a `BigIntType` attribute) so it survives byte
   for byte instead of losing precision and leaving Studio to answer
   `ErrOpeningDocument_UnknownError`. Pass: it prints the four keys it changed and one line per code
   component. Never import an unpatched `.msapp`.

   The package metadata rewrite — reconciling the cached Dataverse metadata in
   `References/DataSources.json` against `power/canvas/columns.json`, setting every `wp_` column's
   `DisplayName`, and its entry in the entry's name mapping, from the catalogue by logical name — is
   **off by default**. Studio owns package metadata (`power/decisions.md`): the real fix for a column
   whose display name has drifted is to refresh the data source in Studio on the golden app, save,
   download, and `promote-golden`, not to have this script overwrite the cache. `--reconcile` turns
   the rewrite (and the SpatialServices drop, which shares the same entry) on explicitly, as a
   diagnostic for isolating a suspected reconcile bug; it is never used for a real import.
7. **`node scripts/msappcheck.mjs`** — the carriage gate, run before anything is swapped into the
   solution. Every comparison it makes — entries, numeric literals, cached table metadata — is against
   `power/canvas/golden/skeleton.msapp`, never the latest download, which is how a corrupted download
   excused itself once already. Fails if an entry in the golden is not in the build (bar `Src/Screen1`,
   `Src/Screen2` and `Src/_EditorState`, which we do not carry), or if a code component Src
   references is not registered. Registration takes one of two forms. A core control is registered
   by a `PcfTemplates` record in `References/Templates.json`. A custom control placed in Studio is
   never in that list: it is registered by a `CustomControl` record under `Properties.json`'s
   `LocalDatabaseReferences` whose `Identifier` is the component, together with its compiled bundle
   under `Resources/Controls`. A `Controls/` or `Components/` entry naming the component proves
   nothing, because `pac canvas pack` writes a `Template.Name` for every control it finds in Src,
   so judging registration off those entries passes a component that is not registered at all.
   Under `--after` the control's `Resources` entries must have landed in the download too.
   Under `--after` the `Controls/` entries are compared by count and by the set of
   `Template.Name` values rather than by file name: Studio renumbers `Controls/<n>.json` on every
   republish. An entry step 2 recorded as pruned in `power/canvas/build/pruned.json` is reported as
   `intentionally removed` rather than failing the check, in both modes. It also prints, without
   failing, how many `wp_` column display names differ between the two packages, table by table:
   what `patch-msapp.mjs` rewrote from the catalogue on its last run. Pass: `msappcheck: pass.`
   An unregistered component is what makes Studio answer
   `PA2401 : Unknown Code Component` after an import that otherwise looks clean.
8. **Import.** `pac solution import ... --async true --max-async-wait-time 30
   --activate-plugins false --force-overwrite --publish-changes`, then poll: every 30 seconds,
   download the app and compare its `Src` against the `Src` inside
   `power/canvas/Waypoint.build.msapp`, until identical or 15 minutes pass. The comparison is
   against the packed `.msapp`, never against `power/canvas/build/Src`: `build/Src` is a working
   directory another unit can reassemble mid-poll, and a poll against a moving target never
   converges. Do not retry the import call while a previous one is still running; "The underlying
   connection was closed" and "Cannot start another [Import]" are noise from an import that lands
   anyway.
9. **Verify.** Download again, unpack, `diff -r` its `Src` against `build/Src` — pass is empty
   output. Read `References/DataSources.json` out of the downloaded `.msapp` and confirm it lists
   the `wp_` tables. Then `node scripts/msappcheck.mjs --after <downloaded.msapp>`, which runs the
   same two checks against what came back out of the environment. Pass: `msappcheck: pass.`

`import-app.mjs` runs `msappcheck` itself at both points, and aborts rather than importing, or
rather than calling an import landed, when it fails. `patch-msapp.mjs` exits 1, rather than
reporting and carrying on, when a code component it was asked to carry is still unregistered when
it finishes.

**The import lock.** `import-app.mjs` writes `power/canvas/.import.lock`, with a timestamp, before
step 1 and removes it on any exit. While that file is there, `assemble-canvas.mjs`,
`patch-msapp.mjs` and `preflight.mjs --update-baseline` refuse to run and say why, so nothing
rewrites the build underneath a running import; the steps `import-app.mjs` runs itself are let
through by `WAYPOINT_IMPORT=1` in their environment. A second `import-app.mjs` refuses while the
lock is held, and removes it with a warning once it is more than forty minutes old, which is longer
than any complete round trip. A runner that finds a live `.import.lock` treats the import as in progress and waits. It never deletes the lock or starts a second import. Timestamps in the lock and evaluation log are UTC; Studio and file times are local.

**`node scripts/import-app.mjs` runs steps 1–9 as one command**, including the solution
export/unpack/replace/repack around the `.msapp`. Use it for every normal change. Fall back to
manual steps only to isolate a failure (e.g. `fxcheck` alone after an edit) or when a step needs a
flag `import-app.mjs` does not expose (`--only`, `--allow-empty-datasources`, `--with-keys`,
`--global-choices`).

**The evaluation log.** Every import gets a row in `power/tests/evaluation-log.md`, written by
`node scripts/log-eval.mjs`. `import-app.mjs` requires `--claim "what this build was meant to fix"`
and refuses to run without it; it writes the first four columns itself, computing `--offline` from
preflight's own PASS/FAIL lines once preflight passes (`"preflight 18/18, fxcheck 0 errors, parity
17 cases"`) and `--roundtrip` from what the round trip actually did (`"msappcheck before pass/after
pass, import <id>, poll <n>"` on success, or `"failed at <stage>"` on failure, so that no import —
landed or not — is missing a row). Craig's results go on afterwards, logged by the orchestrator:
`--studio "82 errors: PA2108 x82"` or `--studio "opened clean"`, `--player` with one line of what he
saw, and `--verdict` comparing this row with the one above it on Studio errors and player defects
alone. With no `--build`, the flags update the last row; with `--build`, they update or create that
one. The point of the log is the trend, not the row: a build that reads better than the last one is
only better if those two numbers say so.

### Preflight

**`node scripts/preflight.mjs` must pass before any import.** It is the single command that runs
every known-regression check this build has accumulated, each one reading the artefact the platform
consumes — `power/canvas/build/Src` for the source checks, `power/canvas/Waypoint.build.msapp` for
the package checks — and printing one line per check, `PASS` or `FAIL` with the reason. It exits 1
if any check fails. `import-app.mjs` will call it before the pack, wired in a following unit; until
then, run it by hand after step 6 and before step 8.

The thirty-seven checks: `yamlcheck` and `fxcheck` at zero; the named-formula count against its baseline;
the connected table data source count and every table name (not option-set names of the shape
`wp_<table>_wp_<column>`, `_statecode`, `_statuscode`) in `power/canvas/source/datasources.json`
present in the packed `References/DataSources.json`; no `SpatialServices` entry left in the package; the four
display settings `patch-msapp.mjs` writes read back off `Properties.json`; no `#` comment inside a
formula block and no `//` at YAML level; `FillPortions` only on a container, gallery, image or
component instance, no component instance inside a gallery template, no `Navigate` in `App.OnStart`,
no user-defined function in `App.pa.yaml`; every `CodeComponent` in Src registered in the packed `.msapp`,
by `PcfTemplates` or by a `CustomControl` record with its bundle; `StartScreen` defined exactly once; the expected screens all present with no
extra `scr*.pa.yaml`; and every `CanvasComponent` instance has a matching definition file under
`Src/Components/`, with an unused definition only a `WARN`; no property a control type denies, read
off `power/canvas/control-properties.json` (PA2108); no control name repeated inside one screen
file, with a component definition sharing a screen control's name only a `WARN` (PA2110); every
`PropertyKind: Event` custom property under `Src/Components/` carrying a non-empty `Default`
(PA2231); `parity`, which runs `node scripts/parity.mjs` and FAILs on a non-zero exit, printing
only the fixture lines that came back `FAIL` (`power/PLAYBACK.md`, "What offline parity proves");
every auto-layout `GroupContainer` in Src declaring both `LayoutOverflowX` and `LayoutOverflowY`
and every manual-layout one declaring neither, listing any that do not; every `Badge` in Src carrying `Appearance: ='BadgeCanvas.Appearance'.Filled`,
listing any that do not; no `ModernText@1.0.0` left anywhere in Src; and `tables`, which recomputes
every cell formula in `power/canvas/tables.json` and FAILs on any cell in Src the compiler would
write differently, or any control the spec names and the screen has not got; every property set
on a `CanvasComponent` instance being either a standard instance property or a `CustomProperty` the
definition declares, naming the instance and the property (PA2108); and `typography`, which reads
every `Label@2.5.1` in Src and FAILs on a `Size` that is not a name off the type scale, a `Color`
that resolves to a typed colour rather than a token or a tone, or a `FontWeight` outside Normal,
Semibold and Bold, naming the file, the control, the property and the value; and `galleries`, which
reads every `Gallery@2.15.0` in Src and FAILs on one missing either `TemplatePadding` or
`ShowScrollbar`, naming the file and the control; and `a11y`, which FAILs on a transparent
`Classic/Button` hit target without a focus ring, a tab stop and a `Tooltip`, a `Label@2.5.1` with
an `OnSelect` without a tab stop and a `Tooltip`, a modern input or `Gallery` without an
`AccessibleLabel`, or an icon-only `ModernButton` or an `Image` without an `AccessibleLabel` — four
classes of control (section 4, "Accessibility"); and `structure`, which parses every file in Src
with a strict parser and FAILs on a control instance carrying a key `pa.schema.yaml` does not
allow, a `Properties` value that is not a scalar, a `Children` that is not a sequence of
single-key maps, or an empty block scalar under `Properties`, naming the file, the line and the
control; and `columnnames`, which reads `power/canvas/columns.json` and FAILs if any table has two
columns sharing one display name, naming the table and both logical names; and `repohygiene`, which
FAILs on a scratch file left in `scripts/` (a name starting `_` or containing `tmp` or `audit`) or
under `power/canvas/` (`check*`, `verify*`, `.import-poll`, or a `*.tmp-*` file anywhere below it);
and `typerole`, which works out the role of every Label and modern control in each `scr*.pa.yaml`
from its name and its place and FAILs on a `Size`, `FontWeight` or `Height` that disagrees with it,
naming the file, the control, the role, the value and the one the role carries — the rules
`scripts/sweep-typography.mjs` writes (section 4, "Typography"). A cell inside a declared table
takes its role from its column in `power/canvas/tables.json` instead of from its name, and the same
check FAILs on a cell whose `Size`, `FontWeight`, `Color` or `Align` has drifted off that role. An
`Src` with no screen in it fails: there is nothing for a role to agree with. And `deadformulas`, which counts the whole-word
readers of every named formula across the authored files in `power/app`, outside comments and
outside the name's own definition, closes them transitively so a name read only by dead names is
dead too, and FAILs listing them, allowing the parked file, whatever a flag has left out of the
build, and reporting App.pa.yaml's unread theme names as `WARN` only. And `dsmetadata`, which reads
every `wp_` table's cached definition out of the packed `References/DataSources.json` and FAILs on
any column whose `DisplayName` differs from `power/canvas/columns.json`, naming the table, the
logical name, the package's name and the catalogue's, and FAILs the same way on a catalogue column
absent from the package's attribute list outright — a table added to the flow before the data
source was next refreshed in Studio — naming the table and the column, the fault this check missed
until it was made to walk the catalogue's own side of the map, not just the package's. And `tablepadding`, which reads each
`power/canvas/tables.json` entry's host card `PaddingLeft`/`PaddingRight` in Src and FAILs when the
entry's own `padding` does not match, or when a row cell on `Parent.TemplateWidth` carries more
than its own gutter — the head or foot cell's `Parent.Width` reserve counted twice — or when a
column's pitch is not one expression: the head cell's, the row cell's and the foot cell's `Width`
are compared with the shared width normalised away, and two readings of a pitch is the drift the
compiler exists to stop. And
`heightbudget`, which sums the visible children's heights, the `LayoutGap` between them and the top
and bottom padding of every vertical auto-layout `GroupContainer` set to `LayoutOverflowY` `Hide`,
evaluating each `Height` from App.pa.yaml's named constants at 1920x1080, and FAILs when the total
overruns the container by a pixel, naming the screen, the container, the two numbers and every
child's height — a height it cannot work out is a `WARN`, never a `FAIL`. And `goldenbase`, which compares every
non-`Src` entry in the packed `.msapp` against `power/canvas/golden/skeleton.msapp` by the SHA256 of
its bytes and FAILs on any that differs, is missing, or is there and not in the golden — bar the
entries the pipeline patches on purpose: `Properties.json`, where only the four display settings and
`LocalDatabaseReferences` may differ, `References/DataSources.json`, where the source names must match
the golden's bar the `SpatialServices` entries `patch-msapp.mjs` drops and every numeric literal must
appear exactly as often as it does in the golden, the `Resources/Controls` entries carrying a code
component, and `packed.json`, where only the pack's own `LastPackedDateTimeUtc` stamp may differ, and
which may be present in the package and absent from the golden — it is `pac canvas pack`'s own
artefact and a Studio-saved golden never carries one. And `contrast`, which resolves every theme
token to its literal RGB in light and in dark, reads each Label, each `ModernButton` and
`Classic/Button` with text, each `ModernTextInput`, `ModernDropdown` and `ModernCombobox` on its own
`Fill` and each `cmpStat` instance's value against the nearest ancestor `Fill`
that is not transparent, and FAILs below 4.5:1 for `TypeBody` and `TypeCaption` or 3:1 for
`TypeSubtitle`, `TypeTitle` and anything larger, reporting one line per `Color` token, `Fill` token
and theme with its count, its worst ratio and one example control, so the fix is made at the token
level — a tone or a state formula is read as every branch at once and the worst pair
is the one reported, text and fill are held to one answer where the same test decides both, a
control whose `Text` is empty is passed over, a component definition is read only through its
instances on a screen, and a formula that does not reduce to a literal, including one the evaluator
throws on, is a counted warning named in the summary rather than a failure
(section 4, "Typography").
And `cardfills`, which FAILs on a `GroupContainer` or `Rectangle` standing in for a card whose
`Fill` reads a tone rather than a neutral surface, a tint or transparent (section 4, "Cards"). And
`confirmed`, the other half of `properties`: it reads every Studio-opened source in the repo — the
golden base, the 10:54 and 23:02 downloads of 21 Sep 2026 (the two builds Studio opened), the
unpacked skeleton in `source/Src`, the blank-app samples and the round-trip copy — collects the
properties Studio itself wrote on each control type, and FAILs on any property in Src that type has
never been seen to take, naming the file, the line, the property and the control. A control type
the corpus has never seen is held to the union of the names across every type in it, so a new type
still gets `X`, `Y`, `Width`, `Height`, `Visible`, `Fill` and the rest; a type it has seen is held
to that type's own names, so a `Radius` on a `Rectangle` fails even though an `Image` takes one.
Where Studio confirmed a property in a download no longer held, `confirmed` in
`power/canvas/control-properties.json` records it and the check reads it alongside `allow`.

The baselines are in `power/canvas/invariants.json`. `node scripts/preflight.mjs
--update-baseline` rewrites the two counts that grow with the build, `namedFormulas` and
`dataSources`, and is run only after a deliberate change that raised them. The fixed values
(`rowLimit`, the three display flags, `expectedScreens`) are edited by hand, in the same change that
moves them.

A new regression class gets a check added here the same day it is found. A defect fixed once and
not gated is a defect that returns.

**Diagnostics.** `node scripts/make-hybrid-msapp.mjs --base <good.msapp> --from <build.msapp>
--entries <names or prefixes> --out <path>` builds a hybrid package, a known-good `.msapp` with only
the named entries swapped in from a suspect build, for bisecting a Studio open failure by narrowing
which entries a failure follows; `node scripts/import-app.mjs --msapp <path>` then imports that
hybrid (or any other packed `.msapp`) as-is, skipping assemble, pack and patch, still gated by
msappcheck and the poll. Adding `--diagnostic` softens preflight check 30 (`dsmetadata`) to a `WARN`
for that hybrid's stale table metadata, tags the evaluation-log row's claim `[diagnostic]`, and
changes no other check.

Solution and data have their own build/import pairs, never mixed with an app import in one unit:
`node scripts/build-solution.mjs` then `pac solution import --path power/solution/Waypoint.zip
--force-overwrite --async true --max-async-wait-time 30 --activate-plugins false
--publish-changes`; `node node_modules/vite-node/vite-node.mjs scripts/build-data.mjs` then
`pac data import --data power/data/Waypoint-data.zip`. A schema change requires a solution import, a catalogue rebuild with `scripts/build-column-catalogue.mjs`, a Studio data source refresh by Craig on the golden app, and a golden promotion, in that order. `build-data.mjs` fills in every work item's Phase from its state, its Source from whether it carries a Jira key, and its Assessed on date for an item at Delivery or later, wherever the seed leaves them blank, before the data package is built. It then scrubs every work item's ownership back to what its phase can hold, so a Shaping item carries no squad, assessor or assessment stamp, and nothing before Validated carries a validated stamp; commitment, size, size override, assignments and benefit actuals are untouched. `pac data import` will not overwrite a value that is already set in the environment with a blank, so a row seeded earlier at a later stage keeps what it was given until it is edited or deleted by hand.

## 3. Source-of-truth map

- **`power/app/*.pa.yaml`** — edited. The only place anything is authored.
- **`power/canvas/source`** — downloaded from the environment by `refresh-skeleton.mjs`. Never
  edited; it carries Studio's own connections and screens.
- **`power/canvas/build`** — generated by `assemble-canvas.mjs`. Delete freely, never edited.
- **`power/app/Formulas.parked.yaml`** — formulas no screen reads yet, not packed. Move a formula
  out only when a screen is written to read it.
- Screens: all ten built — `scrCommand`, `scrWorkItem`, `scrWork`, `scrTeam`, `scrBenefits`,
  `scrFinancials`, `scrQuarterClose`, `scrTimeline`, `scrSettings`, `scrImport`.

## 4. Rules learned

**The golden base**

- The package a build's non-`Src` entries come from is `power/canvas/golden/skeleton.msapp`, and
  nothing else. A download from the environment is never a base; it is only the poll's comparison and
  the source of the connected data source names.
- Studio opening a build is what promotes the golden. Only after Craig confirms an imported build
  opened does that build's download become the base: `node scripts/promote-golden.mjs
  power/canvas/downloads/<file>.msapp --reason "<why>"`, which copies it over `skeleton.msapp` and
  appends a line to `power/canvas/golden/HISTORY.md`.
- Nothing else writes that folder, and `preflight`'s `goldenbase` check is the gate: it fails any
  build whose non-`Src` entries have drifted from the golden beyond the entries the pipeline patches.
- Why: `patch-msapp.mjs` rounded the 64-bit integers in `References/DataSources.json` on 2026-09-21,
  the environment then held that package, and every later build inherited the rounded numbers from a
  fresh download while `msappcheck` compared them against the same poisoned download and called them
  unchanged. Studio answered `ErrOpeningDocument` on every build from 19:54 until the base was pinned.

**YAML level**

- `#` comments between properties; `//` is never valid at YAML level.
- No tabs.
- A plain scalar containing `: ` (colon space) must be a block scalar (`|`) or quoted.
- One `App` block, unique keys only — the assemble script drops the skeleton's own `StartScreen`,
  `OnStart`, `Formulas` before writing ours, so a rerun never duplicates one.
- Screens named `scrX.pa.yaml`; components one file each under `Src/Components`.
- No `DataSources` file — Studio rejects the top-level `DataSource` kind in SourceCode layout. List
  the tables to connect in `power/app/DataSources.reference.yaml` instead.

**Power Fx level**

- `//` comments inside formula blocks; never `#` there.
- No user-defined functions — a preview feature not on in the target environment. Use named formulas
  producing tables, or inline the expression.
- A named formula cannot reference a control — Studio rejects it — so a value it needs from a
  control's state is written to a variable by that control's `OnChange`, and every variable a named
  formula reads is initialised blank in `App.OnStart` so the formula binds before anything is picked.
- `AddColumns`, `GroupBy`, `ShowColumns` take column names as bare identifiers, never quoted text;
  `SortByColumns` and `Search` take quoted strings.
- Choices: read with `Text(...)` for display, compare/patch via `'Column (Table)'.Value`, never
  `.Value` alone. Lookups are the opposite: read through their own primary column.
- Booleans read directly; never `Coalesce()` a two-option column.
- Numbers `Coalesce`d to 0 before dividing; divisors floored to at least 1 (an `Or1` twin).
- `Text()` formats en-US, no `#` after the decimal: `"[$-en-US]#,##0.0"`, `"[$-en-US]#,##0"`;
  currency symbols as literal text outside the format string.
- No reserved words as column names: `Children`, `Parent`, `Self`, `As`, `In` and the like. `Not X`
  is invalid; use `!X`.
- `LookUp` takes exactly `(table, condition, result)`, never a `Filter`'s multi-condition form.
- Keep numbers numeric inside table columns; format with `Text()` only at the cell. A column
  computed with `Text(x, "[$-en-US]...")` cannot be typed by the validator's binder, and every
  downstream `Filter`, `SortByColumns` or `LookUp` on that table then fails.
- `ThisItem` never appears on a gallery-level property; only inside the template.
- Canvas components need `AccessAppScope: true` and reference their own custom properties as
  `cmpName.Prop`.
- A component instance takes only `X`, `Y`, `Width`, `Height`, `Visible`, `FillPortions`,
  `LayoutMinWidth`, `LayoutMinHeight`, `AlignInContainer`, `ZIndex`, `Name` and the component's own
  custom properties; anything else is dropped on import and the default stands.
- Canvas component instances cannot sit inside a gallery template, directly or through a nested
  gallery.
- `SaveData`/`LoadData` are canvas only and do nothing in a browser while the app is open in Studio.
  The theme preference (`colPreferences`, key `waypoint-prefs`) therefore only survives a session in
  the player and on mobile; the Studio preview always opens light, which is not a fault.
- A table with a table in a column (a `Cells` column) cannot be filtered, and `Filter`, `ForAll` and
  `ShowColumns` all refuse it at the binder. Filter the source before flattening, as the Timeline
  grids do through `TlSnapPeople`.
- Dataverse filters use delegable predicates only; `IsBlank` on the filter variable goes outside the
  `Filter` as an `If`, and any predicate that must test a lookup for blank runs on the collection
  after an unfiltered `ClearCollect`.
- `IfError(value, replacement)` types the replacement against the value, so a behaviour replacement
  (`Set`, `Notify`, a `;` chain) against a `Patch` reads as Boolean and Studio answers "Invalid argument
  type (Boolean)". Write the three-argument form, `IfError(value, Set(varError, FirstError.Message),
  <follow-on or true>)`. `fxcheck` does not type-check `IfError` replacements; `preflight`'s `iferrorform`
  check is the only gate that sees it.
- A gallery cell may only reference columns its `Items` formula provably carries; a shaped `Items`
  formula (`AddColumns`, `ShowColumns`, `ForAll`, `DropColumns`, `Table`) lists the columns it
  carries in a comment beside the named formula.

**Layout**

- The app fills the browser window: scale to fit, lock aspect ratio and lock orientation are all
  off, set by `scripts/patch-msapp.mjs` on every pack (`power/canvas/README.md`). So every screen
  sizes from `Parent.Width` and `Parent.Height`, which at the top level of a screen are `App.Width`
  and `App.Height`. A fixed 1366 or 768 in a `Width`, `Height`, `X` or `Y` formula is a fault:
  write fractions and offsets of the parent instead.
- Studio's authoring canvas still shows a fixed 1366x768 frame; the published app is what fills the
  window. A layout that looks right in Studio is not evidence either way.
- Layout-container properties (`LayoutDirection`, `LayoutAlignItems`, `FillPortions`,
  `AlignInContainer` and the rest) are documented in `power/canvas/CONTROLS.md`, "Layout containers".
  Only `GroupContainer`s, galleries, images and component instances carry `FillPortions`/
  `AlignInContainer`; a modern control is wrapped in a container when it must grow.

**Layout calibration**

Measured in the player at 2053x1392 on 2026-09-20, from Craig's read of Command, Work and Team.
Every rule below holds on every screen.

- Text is `Label@2.5.1`, never `ModernText@1.0.0`. The modern control drew scroll arrows inside
  cells whose text fitted ("0.13", "BAU rota") at every height we gave it, and its internal minimum
  height is undocumented, so two rounds of height fixes and the overflow sweep below did not remove
  them (player, 20 Sep 2026). A classic `Label` clips and never scrolls. Every `Label` carries
  `Overflow: =Overflow.Hidden`, the four paddings at 0, and `Wrap: =false` where it is one body line
  high or shorter. `scripts/swap-text-controls.mjs` does the rewrite, preflight check 19 refuses any
  `ModernText` in `build/Src`, and `power/canvas/control-properties.json` allows it no property at
  all. The bullet below is kept for the height arithmetic, which still sets every `Label`'s `Height`;
  its scrolling advice is superseded.
- A `ModernText` scrolls rather than clips: content taller than the box shows scroll arrows. Its
  `Height` is therefore lines x the line height for its `Size`, never less. `Size` is in points,
  not pixels (`canvas-apps-04`), and 1pt = 4/3 px, so a line is
  `round(Size x 4/3 x 1.4) + 4`: the Fluent line height of 1.4 over the pixel size, plus 4px for
  the modern `Text`'s own padding. A text box showing scroll arrows is always a height fault, never
  a content fault. The line heights are Size 10 -> 24, 12 -> 26, 14 -> 30, 18 -> 38, 24 -> 50, and
  they are the `Type*Line` named formulas in `App.pa.yaml`. Single-line text gets one line;
  wrapping text gets an explicit line count
  (`TypeKickerLine * 2`). `ModernText` has no `AutoHeight`: Studio never wrote one on `Text3`, and it
  is not in the reference, so a multi-line caption is counted by hand. Classic `Label` has it; the
  modern control does not.
- Every auto-layout container states both overflow axes: `LayoutOverflowX` and `LayoutOverflowY`
  are `LayoutOverflow.Hide` unless the container is the page body (Y `Scroll`) or a table host whose
  column minimums exceed the card (X `Scroll`). Left undeclared, an auto-layout container scrolls as
  soon as a child overruns it by a pixel, which is what put scroll arrows beside single-word labels
  on every screen. A manual-layout container takes neither axis: Studio rejects both with PA2108
  (20 Sep 2026) and the container clips by nature. A scrollbar on a card is a height fault, not an
  overflow setting to add. `LayoutOverflow` accepts `Hide` and `Scroll` only.
- A hidden child in an auto-layout container still takes its slot and gap. A child that hides by state must also set `Width` and `Height` to 0 in that state, or the container clips its siblings. The rail footer found this the hard way: the expand button was present in source across sixteen builds but never rendered because its parent container hid it.
- A `Badge` is always `Appearance: ='BadgeCanvas.Appearance'.Filled` with a `ThemeColor` (Danger,
  Warning, Success, Brand, Subtle) and no `BasePaletteColor` and no `FontColor`: the theme supplies
  the fill and the contrasting text in light and in dark. A `Tint` badge over a light palette colour
  rendered as a white box with unreadable text in dark mode. Preflight check 18 enforces it and
  `power/canvas/control-properties.json` denies the two colour properties.
- A `ModernText`'s `Width` comes from the parent (`Parent.Width`, `Parent.TemplateWidth`, a fraction
  of one) or from a named column width. A small literal is a fault: it is what wrapped
  "Capacity this quarter" into a 70px column.
- A table header row is a `ManualLayout` container, `FillPortions: =0`, `Height: =RowHeight` (36),
  and its cells carry the same named widths (`WorkCol*`, `TeamCol*`) and the same X expressions as
  the gallery's row cells, with `Parent.Width` where the row says `Parent.TemplateWidth`. A header
  built as an `AutoLayout` row does not line up with its rows and grows to hundreds of pixels: a
  modern control's `Width` is not honoured as a flex basis, and a container with no `FillPortions`
  takes a share of its parent's height.
- A canvas component instance needs an explicit `Width` and `Height`. `FillPortions` alone leaves it
  rendering nothing: the band showed its kicker and none of its `cmpStat` instances. A band stat is
  `(Parent.Width - Pad * 2 - BandKickerW - Gap * n) / n` wide and `BandH - 20` tall, and the
  component's own children size from `Parent.Width`/`Parent.Height`.
- An instance does not inherit the definition's own `Width` or `Height` formulas at all: without
  them it takes the definition's design-time size, which is how a `cmpPill` instance on the
  Timeline peek card rendered as a large green block instead of a pill.
- A `Badge`'s tone is its `ThemeColor` alone (see the Badge rule above):
  `'BadgeCanvas.ThemeColor'.Danger` (late, bad, accent), `.Warning` (at risk), `.Success` (good),
  `.Brand` (brand) and `.Subtle` (neutral). `CONTROLS.md` records Filled/Outline/Ghost/Inverted
  from the doc and `Ghost` from Screen1; `Filled` is the documented member this build uses.
- Rail buttons are `ButtonAppearance.Subtle` (a documented member, `canvas-apps-04`), `Align.Left`
  and `RowHeight` tall, with the section for the current screen `ButtonAppearance.Primary` over
  `BrandBg`. Collapse and the theme toggle take the same style. Outline or Secondary gives every
  rail item a full border and centres its label. A `ModernButton` with `Appearance: =ButtonAppearance.Secondary` ignores `BasePaletteColor` as a fill; a selected state reads as `Primary` or is wrapped in a ring container.
- A page head is `PageHeadH`: a 26px eyebrow over a 42px title, plus 8. Every band that holds
  text is derived the same way, from the lines and not from a literal: `AppHeaderH`,
  `BandH`, `GroupHeadH` (34) and `ControlHeight` (34). `RowHeight` stays 36: body text is 28
  a line with 4px each side.
- A grouped list is a `Variant: VariableHeight` gallery (Studio-written, `canvas/sample3`), whose
  row height comes from its own template: a `GroupHeadH` (32) header plus `RowHeight` per row when
  the group is open, and nothing when it is closed. One `TemplateSize` over every group leaves a
  gap under the short ones. The group header is a 32px `Align.Left` subtle button with the count
  beside it as a `Badge`.
- A filter variable is initialised in `OnStart`, blank, so a register opens on everything:
  `varWorkPhase` is set to `""` there and the lifecycle buttons toggle it.
- A card's `Fill` is always a neutral surface (`NeutralBg1`, `NeutralBg2`, `NeutralBg3`), `BrandBg`,
  transparent or a tint `*Fill` token (`Status*Fill`, `TlKindFill*`, including a `LookUp` or a
  `Switch` choosing only between tints), never a saturated tone (`Status*`, `Tone*`,
  `TlKindText*`, or a `LookUp`/`Switch` choosing between those): the Timeline peek card once
  painted its whole body in the kind's colour, unreadable in both themes, and a kind now reads as
  a 4px edge, a badge or a dot instead (preflight check `cardfills`).

**Number tones**

- A number that carries a judgement is coloured by it everywhere from one threshold table; a number
  that is only a fact stays neutral. Tones are the three status tokens badges use (good, warn, bad)
  applied to Label Color. Thresholds are held in the app's `NumberTones` named table:
  utilisation over 100 per cent bad, 85 to 100 warn, under 85 neutral; free member weeks negative
  bad, under one sprint of one person warn; remaining capacity in the band negative bad, under 10
  per cent of net warn; finish slip any sprint late bad, finishing in the window's last sprint warn;
  benefit gap shortfall against target bad, within 10 per cent warn, met good; days left in sprint
  two or fewer warn; modifiers, rates and counts neutral. A change to one threshold is one edit to
  the table.

**Space allocation**

- A card whose row count is known sizes to its content: Height = card header + rows x RowHeight +
  padding; never FillPortions.
- Exactly one card per column is flexible (FillPortions 1 on the container) and takes the
  remainder; it is the card holding a chart or an unbounded list. If a column has no such card, the
  last card is flexible and its content top-aligned.
- Galleries inside content-sized cards have Height = rows x TemplateSize exactly; galleries inside
  the flexible card have Height = Parent.Height - header.
- Columns split the page width by content need (e.g. 62/38), stated as named formulas, not equal
  halves by default.
- Empty vertical space inside a card is a defect; so is a card whose content overflows. Both are
  checked against the screenshot before a screen unit is declared done.
- Worked example: Command right column = Squads (content-sized, 6 rows) + This sprint
  (content-sized) + Benefits bars image (flexible).

**Table columns**

- **Declare the table in `power/canvas/tables.json`; never hand-write a cell width.** The entry
  names the screen, the head container, the gallery, the row container, an optional foot, the host
  card's padding, the gutter, and one record per column: a key, a type, the role its cells read as
  (declared, never inferred, and one of the eight in section 4, "Typography"),
  a share, a pixel minimum and the control named for each role. `scripts/compile-tables.mjs` writes every X and Width into
  `power/canvas/build/Src` when `assemble-canvas.mjs` runs, and preflight check 20 fails if what is
  in the build is not what the compiler would write. `power/app` keeps the cells, their names,
  their text and everything else about them, and carries whatever X and Width it likes: the
  compiler replaces them.
- The width math: a table has one inner width, `W`, and head, rows and foot all take their pitches
  off it. `W = Max(Parent.Width - <padding> - 16 when the rows live in a vertical gallery, <the
  minimums> + the gutters)`, and it is written once, on the head container (the foot, else the row
  container, when there is no head); every other container carries it by reference, as
  `=bnCalHead.Width`. The available width is `W` less the gutters (`gap x (slots - 1)`); the shares
  are taken off that, so a column's pitch is `Max(<available> * share, min)`, its X is the running
  sum of the pitches before it plus the gutters before it, and its Width is its own pitch. Cells
  inside the head, the foot or a row container read `W` as `Parent.Width`; cells that sit straight
  in a gallery template name the shared control, because `Parent` there is the gallery, which keeps
  the card's whole interior (`Max(Parent.Width - <padding>, <the minimums> + the gutters + the
  reserve)`) so that its scrollbar draws in the strip `W` has already given up. `Parent.TemplateWidth`
  is no longer a basis for a cell: the reserve it carries is the gallery's own and differed from the
  head's by 16px, which a repeated column multiplies slot by slot (build fifteen, the benefits
  months and the timeline days). A table with nothing but a gallery has no container to name, so its
  cells subtract the reserve from `Parent.Width` themselves, which is still one basis for the table.
  A column that stacks two labels names both, and both get the same cell. A
- **The last column's right edge is the scrollbar's.** A right-aligned last column ends where the
  scrollbar starts, and its text then reads under it. So that column, and only that column, carries
  an inner right padding the compiler writes: `PaddingRight = reserve + gap`, which is 24 on a table
  whose rows live in a vertical gallery and the gutter alone on one whose do not. The head cell, the
  row cell and the foot cell of that column take the same padding, so header and rows keep one right
  edge. A
  column with `repeat` (the twelve months of the benefits calendar) takes that many pitches, spanned
  by one control or filled by that many.
- No column is a remainder: the shares are normalised to sum 1, so a share given as a share is what
  the column gets. A type given without a share takes its default (text 0.20/200, stack 0.24/240,
  number 0.07/76, date 0.10/100, badge 0.08/96, pill 0.06/64, month 0.045/52) and the defaults are
  scaled into whatever the explicit shares leave.
- Text-heavy columns (name and role, skills, notes, title) take the largest shares; numeric columns
  take 70 to 90px minimums and right-align; short enums (grade, region) 80 to 110px; badges and
  pills 90 to 120px.
- A cell that wraps to two lines at the design width is a width fault, not a content fault; fix the
  share in `tables.json`.
- A table not yet declared is listed under `pending` in `tables.json`, so what the compiler does
  not own is written down rather than assumed.
- Squad, person and state names in tables are labels (ModernText), never buttons; navigation goes
  on the row container OnSelect.
- Badges on tinted card backgrounds use Appearance Filled or a ThemeColor with sufficient contrast;
  a badge whose text cannot be read is a defect.

**Typography**

- **A size is a name off the scale, never a number.** `TypeTitle`, `TypeSubtitle`, `TypeBody`,
  `TypeCaption` are the only sizes a Label takes, and `FontWeight.Normal`, `.Semibold` and `.Bold` the only weights. Preflight check 22
  fails on any other, naming the file, the control, the property and the value.
- **A control's type comes off its role, and the role comes off its name and its place.** The
  census found no literals and no off-scale values; what it found was drift, a field label at
  `TypeBody` beside one at `TypeCaption` (`power/audit/01a-typography-sizes-weights-colours.md`).
  Eight roles, in the order they are read, each with one type:

  | Role | What carries it | Size | FontWeight | Height | Color |
  | --- | --- | --- | --- | --- | --- |
  | h1 | the Label named exactly `<screenPrefix>Title` | `TypeTitle` | Semibold | `TypeDisplayLine` | `NeutralFg1` |
  | header | `*Head*`/`*Hd*` inside a ManualLayout container named `*Head*` | `TypeCaption` | Semibold | the row's | `NeutralFg2` |
  | section | any other Label whose name ends `Title` | `TypeSubtitle` | Semibold | `TypeHeadingLine` | `NeutralFg1` |
  | field | a name ending `Label` or containing `Lbl` | `TypeCaption` | Semibold | `TypeLabelLine` | `NeutralFg2` |
  | caption | `Kicker`, `Caption`, `Count`, `Sub`, `Meta`, `Note`, `Hint` | `TypeCaption` | Normal | its own | `NeutralFg2` |
  | value | `Value`, `Total`, `Number` outside a gallery | `TypeBody` | Semibold | its own | `NeutralFg1` |
  | cell | any Label inside a gallery template | the compiler's | the compiler's | the compiler's | `NeutralFg1`/`NeutralFg2` if missing |
  | control | `ModernButton`, `ModernTextInput`, `ModernDropdown`, `ModernCombobox`, `ModernTabList` | `TypeBodyPx` | — | — | — |

  A `ModernButton` named `*Small*` takes `TypeCaptionPx`, and one inside `cmpRail` takes
  `TypeNavPx`.

  `node scripts/sweep-typography.mjs [--dry] [ScreenName ...]` writes them and preflight check 29
  fails on any that disagree. Three things are exempt: every Label in `Components.pa.yaml`, swept
  in a unit of its own, though its modern controls are held to the pixel sizes here; a `Color` that
  computes a tone (`If(`, `LookUp(` or a `Tone` name), which
  is the screen's decision and not the role's; and any control with `# type: keep` on the line
  above it.
- **`TypeBody` and `TypeCaption` are both 10.** One text size, not two: hierarchy between body and
  caption comes from `FontWeight` (Semibold vs Normal) and colour (`NeutralFg1` vs `NeutralFg2`),
  not from size (`power/decisions.md`, "One text size"). `TypeBodyLine` is 24, the line height for
  10, same as `TypeLabelLine`.
- **The role aliases are retired.** `TypeTitle`, `TypeSubtitle`, `TypeBody` and `TypeCaption` are
  the only sizes; `Font` is `FontUI` everywhere. A `TypeBodySize`, `TypeLabelSize` or
  `TypeNumberSize` left on a control becomes its ramp token, a `TypeFace` becomes `FontUI` and a
  `Type*Weight` becomes `FontWeight.Semibold` or `.Normal` as the role says
  (`power/decisions.md`, Audit decisions 1).
- **A Label's size is in points; a modern control's is in pixels.** `Size` on `Label@2.5.1` is
  points, `Size` on `ModernButton`, `ModernTextInput`, `ModernDropdown`, `ModernCombobox`,
  `ModernTabList`, `ModernToggle` and the rest is pixels
  (`power/reference/canvas-apps-04-modern-controls-reference.md`, "Font size changes from points to
  pixels"). 1pt = 4/3 px, so a modern control at `TypeBody` draws a quarter smaller than the Label
  beside it. The ramp therefore has a pixel half, declared next to it in `App.pa.yaml` as
  `Round(pt * 4/3)`: `TypeBodyPx` 13, `TypeCaptionPx` 13, `TypeNavPx` 16, `TypeSubtitlePx` 19,
  `TypeTitlePx` 24. A Px token belongs on a modern control and nowhere else; a point token on a
  modern control fails preflight check `typerole`.
- **The ramp gains one role for navigation.** `TypeNav` is 12, `TypeNavLine` 26, declared next to
  the ramp in `App.pa.yaml`. It is `cmpRail`'s own size, never a screen's: every item and the theme
  toggle read it as `TypeNavPx`, `FontWeight` Semibold for the active item and Normal otherwise,
  `Color` `If(active, BrandFg, NeutralFg1)` because the active item sits on the brand fill.
  Preflight check `typerole` holds it.
- **A colour is a token or a tone.** A Label's `Color` is a theme name (`NeutralFg1`, `NeutralFg2`,
  `BrandFg`, a `Status*`), a tone formula, or a conditional built from those. A `ColorValue` or an
  `RGBA` typed into a screen is a fault: it does not follow the theme into dark mode.
- **On-brand text always uses `BrandFg`.** A tone never recolours text on a brand fill: the tone
  tokens are colours for a light surface, so on a brand band the tone goes on the sub line or a
  dot and the figure itself stays white.
- **A colour has to read on the fill under it, in both themes.** Preflight check 35 resolves every
  token to its literal RGB in light and in dark, pairs each piece of text with the nearest ancestor
  fill that is not transparent, and fails below 4.5:1 for `TypeBody` and `TypeCaption` or 3:1 for
  `TypeSubtitle`, `TypeTitle` and anything larger.
- **A fill is never a text colour.** Every text token passes 4.5:1 on `NeutralBg1`, `NeutralBg2`
  and `NeutralBg3` in both themes, and the tinted `*Fill` tokens are named apart from the text ones
  so darkening the ink never drags a surface with it; check 35 holds both halves.
- **The compiler owns the type on every table cell.** Every column in `tables.json` declares a
  `role`, one of eight and no others, and the role says the cell's `Size`, `FontWeight`, `Color` and
  `Align`, with `Wrap` false and no `AutoHeight` on every one of them:

  | Role | Size | FontWeight | Color | Align |
  | --- | --- | --- | --- | --- |
  | name | `TypeBody` | Semibold | `NeutralFg1` | left |
  | text | `TypeBody` | Normal | `NeutralFg1` | left |
  | number | `TypeBody` | Normal | `NeutralFg1` | right |
  | money | `TypeBody` | Normal | `NeutralFg1` | right |
  | percent | `TypeBody` | Normal | `NeutralFg1` | right |
  | date | `TypeBody` | Normal | `NeutralFg1` | left |
  | meta | `TypeCaption` | Normal | `NeutralFg2` | the column's |
  | tone | `TypeCaption` | untouched | untouched | the column's |
  | badge | untouched | | | |

  A head cell is `TypeCaption` Semibold `NeutralFg2` aligned as its column is, and the second line
  of a stacked `name` column is `meta`. The alignment is the column's `align` where it names one.
  `Align.Left` and `AutoHeight` false are a Label's own defaults: both are corrected where a cell
  carries them and never added where it does not. Badge cells are left alone; the theme gives those
  their contrast, and a `tone` column is one whose whole appearance is computed — the
  timeline grids, where `TlKindTone` gives the ink and the tint, and the benefits calendar's month
  bands: the compiler writes the `Size`, the `Align` and the layout on those and never the `Color`,
  the `Fill` or the `FontWeight`. Where a cell computes its
  `Color` — a tone, a state colour — that colour is the screen's and ownership stops at `Size`,
  `FontWeight` and `Align`. Nothing about a cell's type is hand-set in `power/app`: change the role.

**Accessibility**

Studio's accessibility checker read the build of 21 September 2026 as "Focus isn't showing" x660,
"Missing tab stop" x727 and "Missing accessible label" x35, counted per rendered gallery row.
Four classes of control are behind all three, and `node scripts/sweep-a11y.mjs` is the rewrite for
each; preflight check 24 fails on any of them left incomplete.

- **A transparent hit target carries a focus ring, inset.** The `Classic/Button` with `Text: =""`
  over a row takes `FocusedBorderThickness: =2` and `FocusedBorderColor: =FocusStroke`, and is inset
  two pixels on each side within its parent — `X: =2`, `Y: =2`, `Width: =Parent.Width - 4` (or
  `Parent.TemplateWidth - 4`), `Height: =Parent.Height - 4` — so the ring is drawn inside the row
  instead of growing it and lifting everything below. Its spoken text is `Tooltip`, taken from the
  row's title Label: Studio rejects `AccessibleLabel` on `Classic/Button` with PA2108. `TabIndex: =0`
  puts it in the tab order. `PressedBorderThickness` is not written: Studio rejected it with PA2108
  on the 08:53 build of 21 Sep 2026, 16 occurrences, and it is denied in
  `power/canvas/control-properties.json`. `FocusedBorderColor` and `TabIndex` on `Classic/Button` and
  `Tooltip` on `Label@2.5.1` are Studio-confirmed by the same build (no rejection).
- **A Label with an OnSelect is a link.** It takes `TabIndex: =0` and a `Tooltip` of its own `Text`.
  `Label@2.5.1` carries no focus-border property in `power/canvas/CONTROLS.md`, so its focus ring
  is the player's own and none is written.
- **Every input and gallery announces itself.** A `ModernDropdown`, `ModernTextInput`,
  `ModernCombobox` or `Gallery` carries an `AccessibleLabel`: for an input, the field Label in
  front of it; for a gallery, its heading and the word "table".
- **An icon-only button or an image announces itself.** A `ModernButton` whose `Text` is absent or
  `=""` carries an `AccessibleLabel`: its `Tooltip` where one is set, else its `Icon` name split
  into words ("ChevronLeft" -> "Chevron left"), else "Button". Every `Image` carries an
  `AccessibleLabel`: a sibling title Label's `Text` in the same container, else "Image". An
  existing `AccessibleLabel` is never overwritten.
- **`TabIndex: =-1` is a decision, not a gap.** A control taken out of the tab order by hand — the
  scrim behind a card that the card's own close must be reached before — is left exactly as it is,
  by the sweep and by the check.

**Responsive breakpoints**

The documented mechanism is `App.Width` against named thresholds (`canvas-apps-07-customizations-
screens-app-functionality.md`, "Screen sizes and breakpoints").

- Scale to fit is off; the app fills the window at native size. Every width is a share of
  Parent.Width; no literal widths above 200px anywhere in a screen.
- Named formulas in App.pa.yaml: IsNarrow = App.Width < 1280, IsStacked = App.Width < 1100,
  IsCompact = App.Width < 900 (to be added by the responsive unit; until then do not hard-code
  column splits, use the named split formulas).
- Rail: collapsed when IsNarrow unless the user expanded it; icons only when collapsed, and
  `railFoot` is the last child of `railBox`, a fixed 96px vertical stack, the same in both states,
  of the 40x40 toggle whose icon flips above the 40x40 theme button, below `railList` at
  FillPortions 1.
- Two-column pages stack to one column when IsStacked (LayoutDirection switches, both columns
  Width = Parent.Width).
- Band stats: AutoLayout with Wrap on and a minimum stat width (LayoutMinWidth 180) so they wrap to
  two rows instead of shrinking.
- Tables: column shares carry pixel minimums; when the minimum sum exceeds the card width the table
  container scrolls horizontally (Overflow scroll on the primary axis with Justify Start) rather
  than wrapping cells.
- Compact: Pad and Gap halve, the page head drops the lede.
- Every screen unit is checked at 1920, 1366 and 1024 wide before it is declared done (Studio
  preview or player with the window resized).

Source rules (corpus, not yet Studio-verified):

- Auto-layout containers (Horizontal/Vertical) are the default structural primitive, not X/Y/
  Width/Height positioning (`guidance-01`, "Responsive design guidelines in Power Apps" >
  "Use auto-layout containers"; `canvas-apps-07`, "Auto-layout containers").
- Scale to fit off is the documented prerequisite for responsiveness — already our
  `patch-msapp` setting (`guidance-01`, "Disable Scale to Fit and manage aspect ratio and
  orientation").
- Flexible-height galleries are sized by setting `Height` to `Parent.Height` rather than fixed
  (`guidance-01`, "Gallery design and guidelines" > "Use flexible height galleries").
- If `Wrap` is off and the primary-axis `Overflow` is `Scroll`, set `Justify` to `Start` or
  `Space Between` — `Center`/`End` can make controls inaccessible even with `Overflow: Scroll`
  (`canvas-apps-07`, "Building responsive canvas apps" > "Known issues").
- No mention of minimum widths or `LayoutMinWidth` in any of the three sections checked.

**Controls**

Verified classic set: `Label@2.5.1` (no corner radius), `Classic/Button@2.2.0`,
`Classic/TextInput@2.3.2` (text is `.Text`, not `.Value`), `Rectangle`, `Image@2.2.3`,
`GroupContainer@1.5.0` — all radius-capable except Label. Verified modern set (identifier and
version confirmed off Craig's `power/canvas/source/Src/Screen1.pa.yaml`, one of every control):
`ModernText@1.0.0`, `ModernButton@1.0.0`, `ModernCard@1.3.0`, `ModernTextInput@1.1.1`,
`ModernCombobox@1.1.1`, `ModernDataGrid@1.5.1`, `ModernNumberInput@1.1.1`, `ModernDropdown@1.0.2`,
`ModernDatePicker@1.0.1`, `ModernCheckbox@1.0.1`, `ModernRadio@1.0.1`, `ModernToggle@1.0.0`,
`ModernTabList@1.0.1`, `ModernSlider@1.0.1`, `ModernRating@1.0.1`, `ModernInformationButton@1.0.1`,
`ModernIcon@1.1.1`, `ModernAvatar@1.1.0`, `ModernProgressBar@1.0.0`, `ModernSpinner@1.1.0`,
`ModernLink@1.0.1`, `Badge@0.0.24`, `Header@0.0.44`, `Table@1.0.278`. The identifier and version are
confirmed for each of these, but most instances in Screen1 were never configured beyond position, so
their non-position property names (fills, text, items, radius) are still unconfirmed — see
`power/canvas/CONTROLS.md` for exactly which properties Studio has and has not written for each
control, and the full classic-to-modern mapping table. The corpus in `power/reference` is the
reference for property names, defaults and enum members: `canvas-apps-04` for modern controls,
`canvas-apps-05` for classic, `canvas-apps-06` for common properties. Where the corpus and Screen1
disagree, Screen1 wins on what Studio writes; where Screen1 is silent, the corpus is what we have —
`CONTROLS.md` marks which is which, so record a property there rather than trusting memory. Formulas in `power/app` for a modern control
still carry a `# check:` comment until a property beyond `X`/`Y` is confirmed for it. Screen1 in the
skeleton is Craig's sample and must be kept in the build by `assemble-canvas.mjs` — not deleted —
until the classic-to-modern swap in `power/app` is complete.

- `Items` on a Dropdown, Combo box or Tab list is a one-column table; the column of a literal
  `["a", "b"]` is `Value`, so `ItemDisplayText` reads `ThisItem.Value`, never `ThisItem.Value1`.
- `Default` on a Dropdown and a Tab list is a record from `Items` — `={ Value: "All" }` or a
  `LookUp` into `Items` — never the bare text, which Studio answers "Expected a value compatible
  with 'Items'".
- `DefaultSelectedItems` on a Combo box is a table of records from `Items`; a Tab list has no
  `ItemDisplayText` at all.
- A table a formula reads must be connected in Studio (Add data) as well as in `columns.json`;
  `fxcheck` reports the rest against `power/canvas/source/datasources.json`.

**Tabs**

Every tab strip in the app is one `ModernTabList@1.0.1` on one palette, so a strip reads as a
control and the selected tab is the obvious one. `node scripts/sweep-inputs.mjs [--dry]
[ScreenName ...]` writes it and preflight check `typerole` fails on any strip that disagrees:

| Property | Value | Why |
| --- | --- | --- |
| `BasePaletteColor` | `BrandBg` | the indicator and the selected label go brand, not neutral |
| `FontWeight` | `FontWeight.Semibold` | the selected label reads as the chosen one |
| `Size` | `TypeBodyPx` | the pixel body size every modern control reads |
| `Height` | `ControlHeight + 8` | one strip height, on nine strips across eight screens |

Two things a strip does not carry. `ModernTabList` has no `Fill`, so the band behind the strip
cannot be tinted on the control. And `Appearance` — `TabListAppearance.Subtle` or `.Filled`, which
fill the selected tab instead of underlining its label — is a property Studio has never written on
this control, so preflight check `confirmed` rejects it: the strip is brand-coloured, not filled.
Confirming it is one entry, `"confirmed": ["Appearance"]` under `ModernTabList@1.0.1` in
`power/canvas/control-properties.json`, and one line in `TAB_PALETTE`, in that order. Where a
selected state has to be unmistakable before that, the pattern is the Timeline chips: a row of
`ModernButton`s, `Primary` when selected and `Secondary` otherwise, on the same variable.

**Forms**

Every form in this app is the person panel on Team (`scrTeam`, `tmScrim` and `tmPersonPanel`) with
different fields. Copy it; do not invent a second shape.

- Geometry. Two controls at screen level, after the root container so they draw over it: a full
  screen `ManualLayout` `GroupContainer` scrim, `Fill: =RGBA(0, 0, 0, 0.4)`, and the panel itself,
  `Width: =Max(Parent.Width * 0.32, 420)`, `Height: =Parent.Height`, `X: =Parent.Width - Width`,
  `Fill: =NeutralBg1` with a `NeutralStroke1` border. Both are `Visible` on the same open variable.
  A container takes no `OnSelect`, so the scrim's dismiss is a transparent `Classic/Button` over the
  whole of it, the same pattern as a table row's hit target.
- Field stacking. A field is its label line over its control: `FormFieldH = TypeLabelLine +
  ControlHeight + 4`, and the next field starts a `Gap` below, `FormFieldStep = FormFieldH + Gap`.
  The first field sits at `FormFieldTop = Pad + TypeDisplayLine + Gap`, under the panel title, so a
  field's `Y` is only ever `FormFieldTop + FormFieldStep * i` and its control's is that plus
  `TypeLabelLine + 4`. The foot is measured up from the bottom: the error line at
  `Parent.Height - FormFootH`, the buttons at `Parent.Height - ControlHeight - Pad`. Ten fields is
  what a 900px window holds; a longer form needs a second column or a scrolling body.
- Controls. Text and numbers are `ModernTextInput@1.1.1` (there is no numeric format property on it:
  keep the value as text and convert with `Value()` at the Patch). A choice, a lookup and a
  two-option column are all `ModernDropdown@1.0.2` over a one-column `Value` list, with
  `Default: ={Value:<the current value as text>}` — never a bare string. A multi-value column is
  `ModernCombobox@1.1.1`, `SelectMultiple: =true`, read back through `.SelectedItems`.
- Defaults. One named formula per editable column in the `Form*` region of `Formulas.pa.yaml`,
  reading the record the panel was opened on (`varPersonEdit`, blank for a new row): a choice
  through `Text()`, a lookup through its own primary column, a stored fraction shown as a
  percentage. A named formula cannot read a control, so only the defaults live there.
- Validation. Inline on the panel, because it reads the controls: one `ModernText` under the fields
  whose `Text` is an `If` chain naming the first rule broken and whose `Visible` is the same
  condition, and the same condition again on the Save button's `DisplayMode`
  (`DisplayMode.Disabled` while invalid). Required, then range, in that order.
- Save. `Patch(<Table>, If(IsBlank(varEdit), Defaults(<Table>), varEdit), { ... })`, one column per
  line: a lookup is `LookUp(<Target>, <primary column> = <control>.Selected.Value)` (and
  `LookUp(Filter(...), ...)` where the target list is filtered, since `LookUp` takes one condition);
  a choice is `'Column (Table)'.Member` through a `Switch` over the dropdown's text; a number is
  `Value(<control>.Text)`, blank where the box is empty; a two-option column is a plain comparison.
- Refresh after save. The screens read the collections `App.OnStart` built, so a save rebuilds the
  one it touched from the table (`ClearCollect(colPeople, People)`) before the panel closes, exactly
  as the work item stage actions do. Then clear the error, close the panel and `Notify` the success.
- Errors. Wrap the whole save in `IfError` and put `FirstError.Message` into the panel's error
  variable, leaving the form open. `Errors()` is a canvas function the offline binder in
  `scripts/fxcheck.mjs` rejects ("recognized but not supported"), so it cannot be used here.
- Cancel closes and changes nothing; the scrim does the same.
- Every form is proved by one real save in the player, on a real row, before its pattern is repeated
  on another table. A form that has only passed the gates is unproven and is reported as such.

**The front door flag**

`scrFrontDoor` is built and is deliberately not in the app. It reads Requests, Labs and Teams, and
none of the three is connected in Studio, so a build carrying it would not bind.

- The gate is `"includeFrontDoor": false` in `power/canvas/flags.json`, which reads
  `includeGridControl`, `includeFrontDoor` and `includeScope`. That file is the one place any of
  the three is set, so the morning flip is one edit and every gate follows it. While it is false the assembler leaves the screen out of the
  slice and does not merge `power/app/Formulas.frontdoor.yaml` into the App entity, so neither
  reaches `build/Src`. Every assemble prints `front door in` or `front door out`.
- The screen itself is authored at `power/app/Screens.flagged/FrontDoor.pa.yaml`, not in
  `power/app/Screens`, which is what keeps it out of the globs both gates run over. The assembler
  reads it from there when the flag is true. `Formulas.frontdoor.yaml` stays beside the other two
  halves in `power/app`.
- The front door's named formulas live in `power/app/Formulas.frontdoor.yaml`, a third half of the
  App entity beside `App.pa.yaml` and `Formulas.pa.yaml`, merged after both when the flag is true.
- `IncludeFrontDoor` is a named formula in `Formulas.pa.yaml`, false there, and `NavItems` filters
  the "Front door" row on it. The assembler rewrites it to true when the flag is true, so the rail
  can never offer a section the build has not got.
- `fxcheck` reads the flag too. While it is false it checks `power/app` as it stands and reports
  zero errors, the flagged screen being outside the folder it globs. While it is true it builds a
  throwaway copy of `power/app` in the system temp folder with the flagged screen in `Screens/`,
  `Formulas.frontdoor.yaml` appended to `Formulas.pa.yaml` and `IncludeFrontDoor` true, and checks
  that, so the flag flip moves both gates at once. Until the three tables are connected that run
  reports the screen's unconnected-table findings for Requests, Labs and Teams, plus the
  `User` and `IsMatch` findings the offline binder raises for functions it does not support (the
  same class as `Errors()`). Read those findings as the flag, not as a regression.
- The My requests list is not declared in `power/canvas/tables.json`: the compiler reads a screen in
  the build, and this screen is not in the build, so a declared entry would fail preflight check 20
  every run. Its four column shares are named formulas in `Formulas.frontdoor.yaml`
  (`FrontDoorMyShare*`, `FrontDoorMyMin*`) and the cells carry the running sums by hand. Declare the
  table the same morning the flag flips.

The morning it goes in, in this order:

1. Craig, in Studio: Add data for Requests, Labs and Teams, then close Studio.
2. `node scripts/refresh-skeleton.mjs`, and check the three names are in the printed list.
3. Set `"includeFrontDoor": true` in `power/canvas/flags.json`. That is the whole flip: the
   assembler, `fxcheck` and preflight's screens check all read it, and `scrFrontDoor` is added to
   the expected screens from the flag rather than by hand.
4. Add `"FrontDoor"` to the rail's `Navigate` switch in `power/app/Components.pa.yaml`
   (`cmpRail`, `railItem.OnSelect`) — the section cannot navigate until `scrFrontDoor` exists.
5. Declare the My requests table in `power/canvas/tables.json`, and run
   `node scripts/preflight.mjs --update-baseline` once for the named-formula count.
6. `node scripts/assemble-canvas.mjs`, `node scripts/fxcheck.mjs`, `node scripts/preflight.mjs`,
   then the normal round trip. The form is unproven until one real submit lands in the player.

**The scope flag**

The header's team selector is built and is deliberately not in the app. Every scoped read narrows
through the Team lookup (`Team.Team`), and Teams is not connected in Studio, so the read errors at
runtime and its `IfError` handler clears the collection it was meant to fill: every collection
comes back empty.

- The gate is `"includeScope": false` in `power/canvas/flags.json`, the third flag. While it is
  false `App.OnStart` reads every table plain, `cmpScope`'s `OnChange` only sets `varScopeTeam`,
  and neither touches the Team lookup. Every assemble prints `scope in` or `scope out`.
- The two scoped blocks are authored at `power/app/App.scope.yaml`, kept verbatim: its `OnStart`
  block is the whole `Concurrent` statement `App.OnStart` otherwise reads plain, and its `OnChange`
  block is the whole `OnChange` body `cmpScope` otherwise carries as the `Set` alone. The assembler
  substitutes both when the flag is true, the same mechanism as `includeFrontDoor`. They are one
  block in two places: a table added or a filter changed in one is changed in the other.
- `IncludeScope` is a named formula in `Formulas.pa.yaml`, false there, and every `cmpScope`
  instance's `Visible` reads it, so no screen offers a selector that cannot narrow anything. The
  assembler rewrites it to true when the flag is true.
- Flipping it moves the named-formula count, so run `node scripts/preflight.mjs --update-baseline`
  once after the flip.

The morning it goes in: Teams is the fourth table, so `includeFrontDoor` and `includeScope` are
both set true in the same edit, after Requests, Labs, Teams and the scope's own reads are connected
in Studio and `refresh-skeleton.mjs` has captured them. Then assemble, `fxcheck`, `preflight` and
the normal round trip.

**Dataverse**

- Columns that exist are listed in `power/canvas/columns.json`, built from the solution, not the
  model — the authority for what a formula may read.
- Custom display names never equal system column display names (Status, Status reason, Name, Owner,
  Created on, Modified on, Created by, Modified by) on the same table: Power Fx cannot tell the two
  apart. `scripts/build-column-catalogue.mjs` refuses to write `columns.json` on a collision, and
  preflight check 26 fails on the same condition. The system Status column is never read on `wp_`
  tables; a custom state column always has its own display name and is referenced by it.
- Tables the app reads that never appear in `customizations.xml` — system tables such as Users, or
  platform tables such as Environment Variable Definitions/Values — are not in the solution, so
  `scripts/build-column-catalogue.mjs` cannot read them from the xml. They are held instead in
  `power/canvas/columns.extra.json`, in the same table/column shape the script produces, and the
  script merges that file straight into `columns.json` on every run. Add a table there, not by
  hand-editing `columns.json`, and re-run the script.
- After any schema change, the catalogue is rebuilt with `scripts/build-column-catalogue.mjs`. The
  table definitions in `References/DataSources.json` come from the skeleton download and go stale
  the moment a column is renamed, which fails every formula reading the new display name while
  `Patch`, which goes by logical name, still passes. **The pipeline never edits Studio-owned package
  metadata** (`power/decisions.md`): `patch-msapp.mjs` leaves `References/DataSources.json`
  untouched by default, and the fix for a stale column is Studio's own "refresh data source" on the
  golden app, saved, downloaded, and promoted with `promote-golden.mjs` — not a script overwriting
  the cache. Preflight's `dsmetadata` check is the detector, not the fix: it WARNs when the metadata
  is stale and the package is otherwise untouched, and FAILs with "package metadata is stale for
  `<table.column>`: refresh the data source in Studio on the golden app, save, download, and
  promote-golden" when it is not.
- Computed columns (`computedIn: app` or `computedIn: dataverse` in the model) are never created in
  Dataverse; compute them as an `AddColumns` step instead.
- Choice sets are local per column, not global.
- Alternate keys are not in the solution zip; add them by hand in the maker portal after import.

**Data**

- The package part must be named `data_schema.xml`, never `schema.xml`.
- Booleans are written `True`/`False`, never `1`/`0`.
- A re-import matches on the package's own record ids and updates existing rows in place
  ("Switching Insert to Update").

**Looking things up**

- The corpus in `power/reference` is 19 files and about 520k words. Never read one whole and never
  grep it blind: read `power/reference/INDEX.md` first, find the heading, grep the corpus for that
  heading, read only that section. `power/reference/README.md` says how the index is built.
- `node scripts/build-reference-index.mjs` rebuilds `INDEX.md`. Run it after adding or replacing a
  corpus file, never edit the index by hand.
- Never paste corpus text into a brief. Cite the file and the heading and let the agent look it up.
- A fact that holds beyond one change is distilled into this file or `power/canvas/CONTROLS.md` in
  the same unit that learned it. The corpus is the source; these two are the standing rules.

**Studio etiquette**

- A maker says when they have edited in Studio, before anyone else assembles or packs.
- Run `refresh-skeleton.mjs` before every assemble, no exception.
- Keep Studio closed during an import.
- The skeleton carries the connected Dataverse tables and the theme setting.

## 5. Unit discipline

- One action per unit: a solution build, a data load, an app assemble-and-import are separate units.
- An import is its own unit, run alone.
- No content or tool unit runs `assemble-canvas.mjs` while an import is in progress;
  `power/canvas/.import.lock` enforces it, and the scripts that write say so when they refuse.
- Never mix a tool or script change with a content change (formula, screen, model edit) in one unit.
- Report progress by turn 50 of any long-running session.
- Never "fix" a convention in section 4 without updating this file in the same change.
- A screen build is two units, never one: "structure and formulas" first, "gates to zero" second —
  a single-unit screen build has run out of turns twice.
- Prove a new control pattern or a newly used table in Studio on the first screen before repeating
  it on others; never scale a pattern across screens without one Studio round trip.
- Agents write scratch to the session scratchpad, never into the repo.

### Unit routing

The orchestrator picks the agent and the model from this table, not by feel. A unit that does not
fit a row is split until it does.

| Unit type | Agent | Model | Typical budget | Brief must contain |
| --- | --- | --- | --- | --- |
| Docs, decision records, memory notes, playback chapters, evaluation-log entries | `scribe` | haiku | 15 turns | The file, the insertion point, the facts to write |
| Pipeline runs, gates, data loads, index rebuilds, `pac` commands | `runner` | haiku | 15 turns | The exact commands in order, and the one line to update on pass |
| Find where something lives or how it works | `Explore` | haiku | 20 turns | The question and a thoroughness level |
| `npm run build`, `npm test`, a named subset | `test` | haiku | 10 turns | The exact command |
| Mechanical sweep: add or remove a property everywhere, apply a named share pattern, rename | `worker` | sonnet | 30 turns | The pattern spelled out in full, one concern, the file list |
| Screen structure and formulas, then gates to zero, as two units | `worker` | sonnet | 40 turns | One screen file, the turn budget, acceptance criteria |
| Power Fx with record or table typing, `Patch`/`ForAll`/`With` chains, `Tl*`/`Walk*`/parity engines, C# in `tools/`, a retry after a sonnet failure | `worker` | opus | 40 turns | One concern, the failing output if this is a retry |
| Review of a finished unit | `reviewer` | sonnet | 30 turns | The brief it was built to, and the files to read |
| Review of a write path, security, the data model, or a failed previous review | `reviewer` | opus | 30 turns | The brief, the files, and the earlier finding |

Every brief carries a turn budget. The worker and the reviewer refuse a brief that names more than
one screen file, bundles more than one concern, or omits the budget: a wide brief has exhausted the
turn limit on every model tried.

## 6. Code components

Code components live in `power/pcf`, one folder per control, and are their own unit: never built or
pushed in the same unit as an app import. The environment feature that lets a canvas app load one is
already on (`iscustomcontrolsincanvasappsenabled`, set with `pac env update-settings`). The two
commands, run from the control's own folder:

    npm run build
    pac pcf push --publisher-prefix wp

`pcf push` leaves the control in the environment's Default solution, so it does not show in
`pac solution list`. It is carried in the Waypoint solution by adding it there once, by GUID:

    pac solution add-solution-component --solutionUniqueName Waypoint --component <customcontrolid> --componentType 66

The GUID comes from a `pac env fetch` against the `customcontrol` table; the command rejects the
control's name. Done, the control exports and imports with the rest of the solution: the Waypoint
export now carries `Controls/wp_Waypoint.SprintGrid/` and a type 66 root component. A control
update is `npm run build` then `pac pcf push` for development, then export and import Waypoint for
transport: the solution reference picks up the new bundle and nothing is re-added. The standalone
solution project, `power/pcf/solution`, builds a `WaypointControls` zip and is the fallback for an
environment the control was never pushed to. All of it is in `power/pcf/README.md`.

`Waypoint.SprintGrid` is the sprint planning grid, referenced from canvas YAML as
`Control: CodeComponent` with `ComponentName: wp_Waypoint.SprintGrid`. It is a pure renderer: the
whole grid arrives on one `gridJson` string and the picked cell comes back on `selectedCellJson`.
The JSON contract is in `power/pcf/README.md`, "The gridJson contract" — not repeated here.

Studio will not accept `Control: CodeComponent` in imported YAML until the app package already has
the component registered, and that registration is a Studio step. As found 2026-09-20: the control
is not under Tree view > Components, and there is no "Get more components" button in current
Studio. Once the environment feature is on and the control has been pushed, it appears in the
Insert panel under a "Code components" heading. A maker registers it by inserting it onto any
screen once, deleting that instance, then saving and publishing. There is no CLI for it. Until that
first-time registration has landed, `power/canvas/flags.json` keeps `includeGridControl` false,
which strips the whole `tlSprintGrid` control entry out of the assembled `scrTimeline.pa.yaml`
(the fallback galleries, `tlSprintHead` and `tlSprintRows`, are untouched) and `App.pa.yaml`'s
`OnStart` sets `varUseGridControl` to `false` to match, so the fallback is what draws. After the
registration has been done once in Studio, `scripts/refresh-skeleton.mjs` captures it into
`power/canvas/source`; from then on `includeGridControl` can be flipped to `true` and
`varUseGridControl` back to `true`, and the CodeComponent entry packs and imports cleanly.

As found 2026-09-20, and corrected later the same day: a custom control is not registered in
`References/Templates.json` at all. That list holds core controls only, such as
`PowerApps_CoreControls_BadgeCanvas`. Studio registers a control placed on a screen in two places,
both of which the download `Waypoint-2026-09-20T18-41-02.msapp` carries:

- `Properties.json` > `LocalDatabaseReferences` (itself a JSON string) > `default.cds` >
  `components`, as
  `{"ComponentName":"CustomControl","Identifier":"wp_Waypoint.SprintGrid","IdentifierType":0,"Capabilities":{"PCFExternalServiceUsageAllowed":false}}`
- `Resources/Controls/Waypoint.SprintGrid.bundle.js`, the compiled control, named from the
  identifier with the publisher prefix stripped, with its css beside it at
  `Resources/Controls/css/Waypoint.SprintGrid.SprintGrid.css`

`Properties.json` also reads `"ContainsThirdPartyPcfControls": true`. Both parts reach the build
through the `.msapr` the skeleton was unpacked with, and `patch-msapp.mjs` carries them from the
newest download when they do not. The same downloads show what a pack does drop: Studio's own `PcfTemplates` list went from eight
entries to one over our first import, because `pac canvas pack` writes only what Src uses.

A table read by a screen must also be connected in Studio, via Add data, before that screen's YAML
will import; `fxcheck` now reports an unconnected table by name.

## 7. Environment variables

Two, both in the Waypoint solution, both created by importing a small unmanaged solution holding the
definitions and then `pac solution add-solution-component --solutionUniqueName Waypoint --component
<definition id> --componentType 380`. There is no `pac` command for an environment variable itself.

| Schema name | Type | Default | What it does |
| --- | --- | --- | --- |
| `wp_SourceOfTruth` | Text | `Manual` | `Manual`: the app edits work items. `Jira`: a sync agent owns title, kind, state, epic, Jira key and owner, and the app locks them. |
| `wp_UseGridControl` | Two options | `false` | Shows the SprintGrid code component on Timeline, once the component is registered in the environment (section 6). |

A default is what every environment gets until that environment is given a value of its own. Change a
value in the maker portal (Solutions > Waypoint > the variable > Edit > Current Value), or with
`pac env fetch` to read and a solution import to set one; the definition's default is never edited per
environment.

List them at any time:

    pac env fetch --xml "<fetch><entity name='environmentvariabledefinition'><attribute name='environmentvariabledefinitionid'/><attribute name='schemaname'/><attribute name='defaultvalue'/><attribute name='type'/><filter><condition attribute='schemaname' operator='like' value='wp_%'/></filter></entity></fetch>"

The app cannot read either one until **Craig adds `Environment Variable Definitions` and
`Environment Variable Values` as data sources in Studio**, with Add data, like any other table. Until
then every read falls back to whatever the formula's `Coalesce` supplies.

## 8. Where each thing is documented

- `power/canvas/README.md` — the canvas round trip, exact commands, full log of what Studio has
  rejected.
- `power/solution/README.md` — building and importing the solution, the model deviations (local
  choice sets, lookup targets, relationship descriptions, alternate keys).
- `power/data/README.md` — building and loading the seed, the GUID rule, verification queries, what
  is not loaded.
- `power/pcf/README.md` — the code components: building, pushing, the `gridJson` contract, and how
  the app references them.
- `power/PLAYBACK.md` — the symptom-cause-fix table, the checklist for the next app, CLI gotchas.
