# Audit 02: the formulas layer

Read-only audit, 21 Sep 2026. Scope: `power/app/Formulas.pa.yaml` (4057 lines, 872 definition
lines), `power/app/App.pa.yaml`, `power/app/App.scope.yaml`, `power/app/Formulas.frontdoor.yaml`,
`power/app/Formulas.parked.yaml`. `power/app/Screens`, `power/app/Screens.flagged` and
`power/app/Components.pa.yaml` were read for reference only.

## What was measured, and how

- **995 named formulas** across the four files: `Formulas.pa.yaml` 872, `App.pa.yaml` 67,
  `Formulas.frontdoor.yaml` 52, `Formulas.parked.yaml` 4, counted as `Name =` at YAML block indent
  with `;`-separated multi-defs included. No name is defined twice.
- Every name was matched as a whole word across all 16 `.yaml` files under `power/app`, with `//`
  and `#` comment lines and string literals stripped and the definition's own left-hand side
  removed. **43 come back with no reference at all.**
- Formula body length and paren depth were measured from each definition line to the next.

## Findings

| Severity | File:line | Name | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | `Formulas.pa.yaml:3281` | `SprintsMatrixRows` | 73 code lines, paren depth 18, and five nested scans: squads x sprints x people x working days x (`BankHolidayDayRows` + `AbsenceQuarterTable`). At 6 squads, 8 sprints, 40 people and ~10 working days a sprint that is ~19,200 innermost iterations, each running two `Filter` passes. It is a named formula, so it is recomputed from scratch whenever any of `TlSnapSquad`, `PeopleTable`, `DayGrid`, `AbsenceQuarterTable` or `colAbsences` changes, and again for every control that reads it. This is the single most expensive expression in the app. | Precompute a person-week table once (`PersonWeekMW` keyed Name/Mon/MW), then make this formula a `Sum` over that table filtered by squad and sprint window. Drops the inner two levels entirely. |
| High | `Formulas.pa.yaml:519`, `2802`, `3307` | `SprintNowAvailable`, `TlPersonSprintMW`, `SprintsMatrixRows` | The person-week capacity rule (bank holidays + clipped absence days -> `Max(0, Dpw - lost*Dpw/MWDaysOr1) * (1-Modifier) / MWDaysOr1`) is written out three times, and **the three copies do not agree**. 519 filters `Filter(PeopleTable, !IsBlank(Squad), !Vacancy)`; 2802 uses `TlPeople` = `Filter(PeopleTable, Vacancy <> true, !IsBlank(Name))`, which *includes* unsquadded people as "Unassigned"; 3307 filters per squad. So the Sprints matrix and the Sprint-now headline can disagree on total available MW whenever a person has no squad. There is also a divisor difference (`* (WK.DayCount / MWDaysOr1)` at 519 vs `/ MWDaysOr1` per day at 2802/3307) that is only equal when every week is whole. | Extract one `PersonWeekMW` named formula (person x week x MW, no squad filter) and have all three consumers sum it with their own filter. Decide once whether unsquadded people count, and write that decision in the comment. |
| High | `App.pa.yaml:123` | `varUseGridControl` | Set once in `OnStart`, never set again, but it sits **outside** the `Concurrent(...)` block and runs two sequential Dataverse lookups (`'Environment Variable Values'`, `'Environment Variable Definitions'`) after all 25 collection loads have completed. That is two extra round trips added to cold start, on the critical path, for a value that never changes. It also has no `IfError`, unlike every read above it, so an unconnected environment-variable table breaks `OnStart` at the point the other reads are guarded against. | Make it the named formula `UseGridControl = ...` in App.pa.yaml's `Formulas` block: lazily evaluated, off the start path, and update the 5 read sites. |
| Medium | `App.pa.yaml:234`, `236`, `239` | `TypeDisplaySize`, `TypeHeadingSize`, `TypeKickerSize`, `TypeDisplayWeight`, `TypeKickerWeight` | The type-role layer is declared but bypassed. `Size:` bindings across `Screens`, `Screens.flagged` and `Components.pa.yaml` resolve to **996 uses of the raw ramp** (`TypeCaption` 491, `TypeBody` 438, `TypeSubtitle` 51, `TypeTitle` 16) against **9 uses of the role names** (`TypeBodySize` 5, `TypeNumberSize` 2, `TypeLabelSize` 2). The comment at App.pa.yaml:214-218 calls these "the six type roles ... the mock's type scale remapped onto Fluent 2", so the file documents a contract the screens do not keep. The line heights (`TypeBodyLine` etc.) *are* used, so sizes and line heights come from two different layers. Preflight check 22 (`typography`) permits both ramps: its `typeSizes` set at `scripts/preflight.mjs:738` lists all ten names, so nothing enforces the roles. | Pick one, then narrow `typeSizes` to it. Either delete the size aliases and drop the "six type roles" comment, or make the raw four private and rewrite the 996 `Size:` bindings to the roles in one mechanical sweep. |
| Medium | `Formulas.pa.yaml:907-911` | `HexBrand`, `HexBrandSoft`, `HexMuted`, `HexAccent`, `HexCard` | The palette has a second source of truth. These five re-type the literal hex of `BrandBg`, `BrandBgSoft`, `NeutralFg2`, `AccentFg` and `NeutralBg1` as strings for the SVG chart. Worse, `BrandBgSoft` is parked (`Formulas.parked.yaml:20`) and unreferenced, so `HexBrandSoft`'s `#357E8A` is now the only live copy and nothing will catch a drift. `NeutralFg2` also already diverges: the Color version applies `ColorFade(..., 0.25)` in dark mode (App.pa.yaml:149) but `HexMuted` does not, so the chart's muted text is darker than every other muted text in dark mode. | Keep the hex strings as the single source (`HexBrand = "#1E5F6B"` ...) and derive the Colors with `ColorValue(HexBrand)`, so there is one literal per token. |
| Medium | `Formulas.pa.yaml:1186`, `1189` | `ItemMePerson`, `ItemSendPerson` | The only two named formulas in the file that read a Dataverse table directly rather than a collection: `LookUp(People, ...)` and `LookUp(People, 'Full name' = ItemSendName)`. Every other read goes through `colPeople`. Each evaluation is a server round trip on a screen that is already loaded, and neither is inside `IfError`. Under `App.scope.yaml`, `colPeople` is narrowed to `varScopeTeam` but the raw `People` table is not, so these two resolve people the scoped app is not meant to see. | Change both to `LookUp(colPeople, ...)`, matching the other 900-odd formulas and the scope contract. |
| Medium | `Formulas.pa.yaml:927` and `1886` | `MonthBarsCurrent`, `BenefitsCalendarNow` | Character-identical formulas under two names: `If(Year(Today()) = BenefitYear, Month(Today()), 0)`. | Delete one, point its readers at the other. |
| Medium | `App.pa.yaml:79` | `varNavOpen` | `Set(varNavOpen, true)` in `OnStart`, with a comment explaining it ("the rail starts open"), and **nothing anywhere in `power/app` reads it**. Dead wiring of the same class as the `varSearchOpen` defect found on 20 Sep; the rail's real state is `varNavCollapsed` / `varNavUserChoice`. | Delete the `Set` and the comment. |
| Medium | `App.pa.yaml:192` vs `201`, `203-204` | `RailW`, `RailWidth`, `NavW` | Two names one character apart mean different things: `RailW = 320` (read only by `scrWorkItem`'s detail rail, WorkItem.pa.yaml:3877-3878) and `RailWidth = 220` -> `NavW` (the shell rail). The comment at 203-204, "The one width the shell is built from ... Nothing in a screen reads the two widths above directly", is false: `RailWidthTight` is read directly at 23 screen sites. | Rename `RailW` to `ItemRailW` and move it beside the other `Item*` metrics; correct the 203-204 comment. |
| Medium | `Screens/*` (23 sites) | `If(RailCollapsed, RailWidthTight, NavW)` | The shell rail's width is written inline 23 times - as `Width:` in 12 places and `LayoutMinWidth:` in 11 - across `Components.pa.yaml` and every screen. A one-line change to the collapse rule is a 23-site edit. It reads no control, so nothing stops it being a named formula. | Add `NavWidth = If(RailCollapsed, RailWidthTight, NavW);` and bind all 23 sites to it. |
| Medium | `Screens/*` (11 sites) | `CurrentQuarter.Label & " · capacity planner"` | The app header subtitle is rebuilt inline on all eleven screens. Same argument: no control reference, so it belongs in the formulas layer. | Add `AppSubtitle = CurrentQuarter.Label & " · capacity planner";`. |
| Medium | `Screens/WorkItem.pa.yaml` (38 sites) | `If(Item*Editable, DisplayMode.Edit, DisplayMode.View)` | The stage-gating wrapper is written out 38 times: `ItemAssessEditable` 17x, `ItemShapeEditable` 16x, `ItemValueEditable` 5x. This is exactly the shape that let the Value-tab read-only carve-out go wrong on 21 Sep: the rule is copied, not named, so an exception has to be spotted in 38 places. | Add `ItemAssessMode`, `ItemShapeMode`, `ItemValueMode`, `ItemComponentsMode` named formulas and bind `DisplayMode:` to them, so a per-field exception is a visible deviation from the named default. |
| Medium | `Screens/*` (227 sites) | `"[$-en-US]#,##0"`, `"[$-en-US]#,##0.0"`, `"[$-en-US]#,##0.00"` | The three number formats are typed as literals 106, 101 and 20 times in the screens (and again throughout `Formulas.pa.yaml`). A named formula cannot take the value to format, but it can hold the format string. | Add `Fmt0 = "[$-en-US]#,##0"; Fmt1 = "[$-en-US]#,##0.0"; Fmt2 = "[$-en-US]#,##0.00";` and use `Text(x, Fmt1)`. |
| Low | 43 sites, listed below | - | 43 of 995 named formulas are referenced nowhere in `power/app`. 4 are `Formulas.parked.yaml`, which is by design. The remaining 39 are live cost: Studio validates the whole App entity at once, which is the stated reason the parked file exists, so these carry the same tax the parked file was created to avoid. | Park or delete. See the list below. |
| Medium | `Formulas.pa.yaml:3202-3231` | `TlProbe*` (12 names) | A block of debug scaffolding left in the shipped formulas block. Ten are unreferenced (`TlProbeARead`, `TlProbeBRead`, `TlProbeW1`, `TlProbeW2`, `TlProbeP1`, `TlProbeM1`, `TlProbeATest`, `TlProbeBTest`, `TlProbeQTest`, `TlProbeSTest`); the other two, `TlProbeA` (3202) and `TlProbeB` (3210), escape the unreferenced list **only because the dead probes read them**, and `TlProbeB` rebuilds a full 40-person x 13-week table running one `Filter(BankHolidayDayRows, ...)` per cell - 520 scans - to produce nothing. Four of the probes also call `Left()` on numeric columns (`Left(First(TlPeople).Net, 2)`), relying on implicit number-to-text coercion. | Delete all twelve. |
| Low | `App.pa.yaml:94` | `varTlGapNeed` | `Set(varTlGapNeed, 3)` in `OnStart`, read once (`Formulas.pa.yaml:2728`), and never set anywhere else - it is a constant wearing a variable's clothes. The comment says it is "the free days Gaps is asked for", implying a control that does not exist. | Make it the named formula `TlGapNeed = 3` until a control sets it. |
| Low | `Formulas.frontdoor.yaml:104-110` | `varFrontDoorScreen` | Set at `FrontDoor.pa.yaml:2310` when the screening panel opens and never cleared; `varFrontDoorScreenOpen` is what closes the panel. The record therefore survives the panel, and `FrontDoorScreenNotes` / `FrontDoorPromotedNotes` keep reading the last-screened request while the panel is shut. Harmless today because nothing draws them when closed, but it is one `Visible` change away from showing a stale request. | `Set(varFrontDoorScreen, Blank())` on the close handlers beside `varFrontDoorScreenOpen`. |
| Low | `Formulas.pa.yaml:3055-3058` | `TlPeekDay` | Guarded on length (`Len(TlPeekDate) < 10`) but not on content: `Value(Mid(TlPeekDate, 6, 2))` errors on any 10-character string that is not `yyyy-mm-dd`. The source is the code component's `selectedCellJson`, parsed by position at 3028-3032, so a contract change surfaces here as an error rather than a blank. | Wrap in `IfError(..., Blank())`. |
| Low | `App.pa.yaml:142`, `158`, `197`, `210-212` | `NeutralBgAlt`, `BrandBgHover`, `RadiusControl`, `AppHeaderHeight`, `CanvasWidth`, `CanvasHeight` | Six unreferenced names in the theme and metrics block. `RadiusControl = CtrlR` and `AppHeaderHeight = AppHeaderH` are pure aliases of names that *are* used; `CanvasWidth = 1600` / `CanvasHeight = 900` are fixed canvas sizes in an app the same file says "fills the window", so they contradict the layout model rather than merely being unused. | Delete the four aliases and the two canvas sizes; park `NeutralBgAlt` and `BrandBgHover` with the other unread theme names. |

### The 43 unreferenced names

`Formulas.pa.yaml` (28): `JiraOwnedFields` (1219), `ItemCommitmentText` (1287), `ItemDeliveryText`
(1292), `TeamNewKind` (1660), `TeamResShareSquad` (1746), `TeamResShareCategory` (1747),
`TeamResShareMW` (1748), `TeamResShareNote` (1749), `TeamReservationColsW` (1754), `FinSquadAnnual`
(2104), `FinSquadPeople` (2105), `FinSquadCommitted` (2106), `FinSquadDelivery` (2107),
`TlProbeARead` (3208), `TlProbeBRead` (3221), `TlProbeW1` (3223), `TlProbeW2` (3224), `TlProbeP1`
(3225), `TlProbeM1` (3226), `TlProbeATest` (3228), `TlProbeBTest` (3229), `TlProbeQTest` (3230),
`TlProbeSTest` (3231), `GapsMostFree` (3430), `TlGapsGridW` (3561), `TlWindowColsW` (3566),
`FormGradeOptions` (3685), `UtilisationTone` (3981).

`App.pa.yaml` (11): `NeutralBgAlt` (142), `BrandBgHover` (158), `RadiusControl` (197),
`AppHeaderHeight` (210), `CanvasWidth` (211), `CanvasHeight` (212), `TypeDisplaySize` (234),
`TypeDisplayWeight` (234), `TypeHeadingSize` (236), `TypeKickerSize` (239), `TypeKickerWeight` (239).

`Formulas.parked.yaml` (4, by design): `BrandBgSoft` (20), `NeutralStroke2` (21), `HeaderHeight`
(22), `TypeBodyWeight` (23).

`Formulas.frontdoor.yaml`: none. Every one of its 43 names is read by `Screens.flagged/FrontDoor.pa.yaml`.

Two clusters in that list look like abandoned column sets rather than stragglers, and are worth a
decision rather than a delete: `TeamResShare*` / `TeamReservationColsW` (5 names, a reservations
table's column widths) and `FinSquad*` (4 names, a Financials squad band). Both read like a surface
that was cut; if it is coming back they belong in `Formulas.parked.yaml`, which exists precisely for
this.

## Over-complication

Eight formulas exceed 40 code lines: `SprintsMatrixRows` (73), `ItemWalkFree` (65), `PeopleTable`
(51), `WorkBase` (49), `CompareBase` (49), `TlQuarterCells` (49), `ReservationRows` (44),
`BenefitsCalendarRows` (41). Sixty-three exceed paren depth 4 and 26 exceed depth 6; the worst are
`SprintsMatrixRows` (18), `SprintNowAvailable` (14), `TlPersonSprintMW` (13), `ItemWalkFree` (11),
`TlQuarterCells` (11). Four of the five deepest are the same person-week rule (finding 2), so fixing
that duplication is also the largest single reduction in depth available.

`CompareBase` (49 lines, depth 3) and `ItemActions` (33 lines, depth 3) are long but flat - long is
not the problem there, and neither is worth touching.

`TlQuarterCells` (3152) is a per-person x per-week rebuild: 40 people x 13 weeks x three `Filter`
passes (`BankHolidayDayRows`, `AbsenceQuarterTable`, `TlTypedBookings`, `TlLiveAutoBookings`) =
~2,080 filtered scans on every evaluation, and it returns a table-in-a-table that cannot be filtered
afterwards (the comment at 2784-2786 says so). It is the second-worst expression in the file and the
same `PersonWeekMW` precompute fixes most of it.

## What is clean

These were checked and found sound, so they do not need re-checking next pass:

- **Division guards.** Every division in `Formulas.pa.yaml` is guarded, either by an `Or1` divisor
  (`MWDaysOr1`, `SprintDaysOr1`, `QuarterWorkingDaysOr1`), by `Max(1, ...)`, or by an explicit
  `If(x = 0, 0, ...)`. `MaxMonthBenefit` and `MaxMonthLine` are both `Max(..., 1)`. No unguarded
  division was found.
- **Direct Dataverse reads.** Only the two at 1186/1189. Everything else reads a `col*` collection.
- **`Today()` usage.** 10 sites, no `Now()`. All ten are date-boundary comparisons where a daily
  recompute is the intent. `Now()` - which would force a re-evaluation every tick - is used nowhere.
- **No duplicate definitions.** No name is defined twice across the four files.
- **`OnStart` shape.** All 25 collection loads are inside one `Concurrent` and each is wrapped in
  `IfError(..., Clear(col))`, so an unconnected table leaves an empty collection rather than a
  broken start. `App.scope.yaml`'s variant keeps the same shape, and uses the documented
  `ClearCollect` + `RemoveIf` pattern where `IsBlank` would not delegate.

Unchecked, and flagged as such: the `OnStart` collections are all **unfiltered by date or quarter**
(`colWork`, `colAssignments`, `colAbsences`, `colActivity`, `colArchive`, `colSnapshots` in
particular). This audit did not size the tables. `colActivity` and `colArchive` are append-only logs
with no filter and no `FirstN`, so they are the two that will pass the 2,000-row delegation ceiling
first and will do it silently. That needs a row-count check against the real environment before it
becomes a finding.

## Parked and reference files

`Formulas.parked.yaml` (23 lines, 4 names) is a holding pen, and its header states the reason
correctly: Studio validates the whole App entity at once, so one broken named formula takes every
reader with it, and a shorter block gives readable errors. `scripts/assemble-canvas.mjs` reads
`Formulas.pa.yaml` alone, so nothing here reaches the build. **Nothing in it is stale** - all four
names are genuinely unread, so the file is doing its job. The gap is the other way round: 39 live
names are unreferenced and have not been parked, so the file's own rule is applied to 4 of 43 cases.

`DataSources.reference.yaml` (47 lines, 27 tables) is documentation only, and correctly named
`.reference.yaml` so nothing packs it (Studio rejects a `DataSource` top-level object with PA1022).
It maps display collection name to logical name. **One entry is stale in effect**: `'Import
profiles': wp_importprofile` is listed, but `App.pa.yaml`'s `OnStart` loads `'Import runs'` and not
`'Import profiles'`, so the table is documented as connected and is read by nothing. The file also
omits the three front-door tables (`Requests`, `Labs`, `Teams`) that `Formulas.frontdoor.yaml` reads
and `wp_team` that `App.scope.yaml` reads, all four flag-gated; the file gives no hint they exist.

`Formulas.frontdoor.yaml` (151 lines, 43 names) is the cleanest file in the scope: every name is
read, the geometry is derived rather than typed, and the header explains the flag gate. Its one
weakness is that `FrontDoorLeftH` / `FrontDoorRightH` encode field counts as literals (`FormFieldStep
* 17`, `* 10`) that nothing checks against the number of fields actually on the screen.

## Rules and checks to add

Each is mechanically checkable from the files alone, so each can be a `scripts/preflight.mjs` check.
Numbering continues from the current 26.

1. **Unreferenced named formula fails preflight.** Extract every `Name =` at YAML block indent from
   `Formulas.pa.yaml`, `App.pa.yaml` and `Formulas.frontdoor.yaml`; match each as a whole word
   across every `.yaml` under `power/app` with comments and string literals stripped and the
   definition's own LHS removed; fail on any with zero references. `Formulas.parked.yaml` is
   excluded - that file is the remedy, not the fault. Seed the allowlist at zero, not at 39: the 39
   should move to the parked file in the same change that adds the check.

2. **No named formula reads a Dataverse table directly.** Fail on `Filter(`, `LookUp(`, `ForAll(`,
   `First(`, `Sort(`, `SortByColumns(` or `CountRows(` whose first argument is a name in
   `DataSources.reference.yaml`'s `Tables` map rather than a `col*` identifier, anywhere inside an
   App `Formulas` block. Current violations: 2.

3. **Formula size ceiling.** Fail any named formula over 60 code lines (comments and blanks
   excluded) or paren depth over 12, measured from its definition line to the next. Current
   violations: `SprintsMatrixRows` on both counts, `SprintNowAvailable` and `TlPersonSprintMW` on
   depth. Warn at 40 lines / depth 8 so the list is visible without blocking.

4. **No `Now()` in a named formula.** `Now()` makes a formula re-evaluate continuously. Current
   violations: 0 - add the check to keep it that way. `Today()` stays allowed.

5. **No literal format string in a screen.** Fail any `"[$-en-US]..."` literal in
   `power/app/Screens`, `power/app/Screens.flagged` or `Components.pa.yaml`; they must come from a
   named `Fmt*` formula. Current violations: 227.

6. **Every `Set(var...)` has at least one read, and every `var` read is set.** Walk all `.yaml`
   under `power/app` for `Set(varX` and for bare `varX`; fail a `var` whose only occurrences are
   `Set` sites. Current violations: 1 (`varNavOpen`).

7. **A `var` set exactly once, in `OnStart`, and never re-set must be a named formula.** Same walk
   as 6: fail when the only `Set` site is in `App.pa.yaml`'s `OnStart` and the value is not a
   control read. Current violations: `varUseGridControl`, `varTlGapNeed`.

8. **`OnStart` contains no un-`IfError`ed table read.** Every `ClearCollect`, `LookUp` or `Filter`
   in `App.pa.yaml`'s and `App.scope.yaml`'s `OnStart` must be inside an `IfError`. Current
   violations: 1 (the `varUseGridControl` environment-variable lookups).

9. **A hex literal appears once.** Fail when the same `#RRGGBB` string appears in more than one
   named formula across `App.pa.yaml`, `Formulas.pa.yaml`, `Formulas.frontdoor.yaml` and
   `Formulas.parked.yaml`. Current violations: 5 (the `Hex*` block against the theme block).

10. **No identical formula bodies.** Normalise whitespace and compare every named formula body;
    fail on an exact match under two names. Current violations: 1 pair (`MonthBarsCurrent` /
    `BenefitsCalendarNow`).

11. **No repeated control expression that reads no control.** Collect every `Property: =expr` in
    `Screens`, `Screens.flagged` and `Components.pa.yaml`; where the same `expr` occurs 3 or more
    times **and** contains no `Parent.`, no `ThisItem.`, no `Self.` and no control identifier, fail
    - it is a named formula being typed out by hand. Current violations include
    `If(RailCollapsed, RailWidthTight, NavW)` (23), `If(ItemAssessEditable, ...)` (17),
    `If(ItemShapeEditable, ...)` (16), `CurrentQuarter.Label & " · capacity planner"` (11),
    `If(ItemValueEditable, ...)` (5). The `Parent.`/`ThisItem.` exclusion matters: the `Max((Parent.Width
    - ...) / 5, 180)` family repeats 10 times and is genuinely not factorable, because a named
    formula cannot read `Parent`.

12. **Name-prefix uniqueness.** Fail when two names differ only by a suffix that is a prefix of the
    other and hold different values (`RailW` 320 vs `RailWidth` 220). One rule, cheap, catches the
    class.

13. **`DataSources.reference.yaml` matches reality.** Every table named in an `OnStart`
    `ClearCollect` or in any named formula must appear in its `Tables` map, and every entry in the
    map must be read somewhere (`Screens.flagged` and `App.scope.yaml` count, so flag-gated tables
    pass). Current violations: `'Import profiles'` listed and unread; `Requests`, `Labs`, `Teams`,
    `wp_team` read and unlisted.
