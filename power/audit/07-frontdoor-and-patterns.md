# Audit 07: the front door, and a cross-screen pattern census

Read-only. Nothing in `power/app` was edited.

Scope reviewed. Part 1: `power/app/Screens.flagged/FrontDoor.pa.yaml` (3798 lines) and
`power/app/Formulas.frontdoor.yaml` (151), against `power/RUNBOOK.md` section 4 and the tokens in
`power/app/App.pa.yaml`. Part 2: a grep-driven census over the ten screens in
`power/app/Screens`, the flagged front door, and `power/app/Components.pa.yaml`.

What was read in full: the front door's shell (lines 1-270), its validation and submit
(1379-1700), its two table cards (1663-2320), and the whole screening panel foot (3618-3798).
What was sampled rather than read in full: the 27 field rows of the form (298-1377) and the 27
answer rows of the screening panel (2428-3518), read at four representative groups and then
counted mechanically; and the bodies of the nine other screens, read only through the greps the
census tables record. Typography tokens are excluded: another agent owns them.

Heights below are computed from `App.pa.yaml`, not from the numbers quoted in RUNBOOK section 4,
which are stale (see L14).

---

## Part 1. `Screens.flagged/FrontDoor.pa.yaml`

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | FrontDoor.pa.yaml:3677, 3720 | `fdScrSpike`, `fdScrFeature` | The promote writes `'Promoted to': LookUp('Work items', Title = varFrontDoorScreen.Title)` — it re-finds the work item it has just created by matching on its title. `Title` is a plain text column with no uniqueness (`canvas/columns.json`, Work items). Any pre-existing item with the same title, or a second request raised under the same title, links the request to the wrong record, permanently and silently. | Capture the Patch's return value: `Set(varFdPromoted, Patch('Work items', Defaults('Work items'), {...})); Patch('Requests', varFrontDoorScreen, { 'Request status': ...Promoted, 'Promoted to': varFdPromoted })`. |
| High | FrontDoor.pa.yaml:3643-3686, 3687-3727 | `fdScrSpike`, `fdScrFeature` | Neither promote button carries a `DisplayMode`, while `fdScrError` (3625-3632) states the rule as "Screening notes are required before this request moves on" and only `fdScrSave` enforces it. Worse, the promote's `Patch('Requests', ...)` writes only `'Request status'` and `'Promoted to'` — it never writes `'Screening notes'`, `'Screened by'` or `'Screened on'`. So a screener types their notes, presses Promote, and the notes are discarded while the request closes as Promoted with a blank screening record. | Give both buttons `fdScrSave`'s `DisplayMode`, and add `'Screening notes': Trim(fdScrFieldNotes.Text)`, `'Screened by': ...`, `'Screened on': Now()` to the Requests Patch in both. |
| High | FrontDoor.pa.yaml:1917-1920 | `fdScreenCard` | `Visible: =true`, with a comment recording that the Waypoint Team role gate "will gate this section once the roles are in the environment". As it stands every person who can open the front door sees the whole screening queue — other people's request titles, business areas and urgencies — and `fdScreenRowHit` (2293) opens the panel with Save notes, Promote to spike, Promote to feature and Decline all live. The only thing standing between an ordinary requester and promoting somebody else's request is Dataverse role depth that the comment says is not configured. | Gate on a named formula now (`IsWaypointTeam`, off a People or Settings flag) rather than shipping `true`; a hard-coded `true` on a permission boundary should not pass a gate. |
| High | FrontDoor.pa.yaml:1383-1409, 1411-1462, 1504-1533 | `fdError`, `fdSubmit` | The same 25-term validation predicate is written out three times verbatim: `fdError.Visible`, the condition list inside `fdError.Text`, and `fdSubmit.DisplayMode`. It is also the only thing keeping five `Switch`es in the Patch correct: `'Product line'`, `Frequency`, `'Data sensitivity'`, `Urgency` and `'Benefit type'` (1547-1616) each have a real enum member as the Switch default (`.Other`, `.'Ad hoc'`, `.Financial`, `.Immediate`, `.'CX / EX uplift'`), so a blank dropdown writes a wrong choice rather than erroring. Drop one condition from the `DisplayMode` copy while leaving the other two and the app silently mislabels rows. | One hidden Label `fdValid` holding the first-broken-rule text; then `fdError.Text = Coalesce(varFrontDoorSaveError, fdValid.Text)`, `fdError.Visible = !IsBlank(fdError.Text)`, `fdSubmit.DisplayMode = If(IsBlank(fdValid.Text), DisplayMode.Edit, DisplayMode.Disabled)`. Separately wrap every Switch as `If(IsBlank(x.Selected.Value), Blank(), Switch(...))` so the guard is not load-bearing. |
| High | FrontDoor.pa.yaml:1961-2105, 2141-2292 | `fdScreenHead`, `fdScreenList` | Right-edge overflow. The seven hand-written column minimums (`Formulas.frontdoor.yaml`, FrontDoorScrMin*) sum to 850px: 130+100+110+220+90+100+100. The card's inner width is `App.Width - RailWidthTight(56) - Pad*4`. At IsCompact 900 that is 812, so the Status badge runs from X 750 to 850 and is clipped by 38px; `fdScreenCard` is `LayoutOverflowX: =LayoutOverflow.Hide`, so there is no scroll to reach it. The table overflows at every window narrower than about 970px. (My requests is safe: its minimums sum to 590.) | RUNBOOK section 4, "Table columns": declare the table in `tables.json` the morning the flag flips so the compiler reserves the minimums, and until then set `LayoutOverflowX: =LayoutOverflow.Scroll` with `LayoutJustifyContent.Start` on `fdScreenCard`, or drop Area and Product from the row when `IsCompact`. |
| Medium | FrontDoor.pa.yaml:298-1377 and 2428-3518 | `fdLbl*`/`fdField*` vs `fdAnsLbl*`/`fdAnsVal*` | The 27 questions are authored twice as control pairs — 54 controls in the form, 54 in the screening panel — which is about 2100 of the file's 3798 lines. The same 27 names then appear a third time in `fdSubmit`'s Patch (1536-1621) and a fourth in the validation chain. Adding one question is four edits in four places with nothing checking they agree. | The read-only answer panel is pure display and is the safe first move: one `FrontDoorQuestions` named table (key, group, label, the `Text()` of the answer) in `Formulas.frontdoor.yaml` driving a `Variant: VariableHeight` gallery, replacing 54 controls with one template. The editable form cannot be a gallery (a Patch needs named controls), but its labels can still read their text from the same table. |
| Medium | FrontDoor.pa.yaml:3756 | `fdScrSave` | `'Screened by': LookUp(People, 'Full name' = User().FullName)` matches a person by display name. `columns.json` gives People an `Email` column, and the app's own convention (`waypoint/CLAUDE.md`, importing exports) matches people by ID, then email, then name. A Dataverse full name that differs from the People row by a middle initial writes Blank with no error. | `LookUp(People, Email = User().Email)`. |
| Medium | FrontDoor.pa.yaml:3663-3686 vs 3707-3730 | `fdScrSpike`, `fdScrFeature` | The two handlers are verbatim duplicates of ~24 lines apart from the `Kind` member and one word in the `Notify`. Every fix above has to be made twice, which is exactly how the two got out of step with `fdScrSave` on the screening columns. | One handler: the two buttons `Set(varFdPromoteKind, "Spike")` / `"Feature"` and call the same body, with `Kind: If(varFdPromoteKind = "Spike", 'Kind (Work items)'.Spike, 'Kind (Work items)'.Feature)`. |
| Medium | FrontDoor.pa.yaml:242-1377 | `fdForm`, `fdColRight` | 406px of empty space in the right column at every width. `FrontDoorLeftH` computes to 1476 (654+284+506+Gap*2) and `FrontDoorRightH` to 1070 (506+322+210+Gap*2); `FrontDoorFormH` takes the Max and both columns are `FillPortions: =1`. RUNBOOK section 4, "Space allocation": empty vertical space inside a card is a defect. | Move "The problem" (3 fields, 284 + one Gap) to the right column: 1176 left against 1370 right, a 194px difference rather than 406. |
| Medium | FrontDoor.pa.yaml:3642, 3618-3641 | `fdScrError` | `AutoHeight: =true` alongside an explicit `Height: =TypeLabelLine * 2`, inside a ManualLayout panel. At 1080 the error box already ends at Y 988, which is exactly where `fdScrSpike` starts (`Parent.Height - ControlHeight*2 - Gap - Pad`). Any message longer than two caption lines grows down over the promote buttons. `fdError` in the form (1379) sets no AutoHeight and is the correct shape. | Drop `AutoHeight` and keep the fixed two lines. |
| Medium | FrontDoor.pa.yaml:269-278 and 11 sibling groups | `fdGroup*`, `fdAns*` | The twelve question groups are `Fill: =NeutralBg1` + `BorderColor: =NeutralStroke1` + `BorderThickness: =1` with no `Radius*` and no `Padding*` — the padding is hand-written as `X: =Pad` on every child. Every other card in the app, including `fdMyCard` and `fdScreenCard` on this same screen, is CardR with real padding. Square-cornered boxes sit beside rounded ones on one page. | Add the four `Radius*: =CardR` and the four `Padding*: =Pad` to the group containers, and drop the per-child `X: =Pad`. |
| Low | FrontDoor.pa.yaml:22-31 | `scrFrontDoor.OnVisible` | `varFrontDoorScreen` is the only one of the six front-door variables never initialised: `OnVisible` sets the other five and `App.OnStart` sets none of them. Four named formulas (`FrontDoorScreenPanelTitle`, `FrontDoorScreenNotes`, `FrontDoorPromotedNotes`, `FrontDoorScreenPriority`) dereference `varFrontDoorScreen.<column>` before any `Set`, and a second visit to the screen still holds the previous row. | `Set(varFrontDoorScreen, Blank())` beside the other five. |
| Low | FrontDoor.pa.yaml:85, 103, 189, 2382, 3642 | `fdHeaderName`, `fdHeaderQuarter`, `fdTitle`, `fdScrTitle`, `fdScrError` | `Wrap: =true` with `AutoHeight: =true` on single-line labels that also carry an explicit `Height`. RUNBOOK section 4, "Layout calibration": every Label is `Wrap: =false` where it is one body line high or shorter, and the height is the line count. | `Wrap: =false`, no `AutoHeight`. |
| Low | FrontDoor.pa.yaml:1537, 3676, 3745, 3760, 3789 | `fdSubmit`, the four panel actions | `Patch('Requests', ...)` quotes a table name that carries no space, while `Formulas.frontdoor.yaml` writes the same table bare (`Filter(Requests, ...)`). Cosmetic, but it is the only quoted no-space table name in the app. | Write `Requests` unquoted, as the formulas file does. |
| Low | RUNBOOK.md section 4 (not the diff) | — | "Layout calibration" and "Space allocation" quote `AppHeaderH` 50, `PageHeadH` 76, `BandH` 128, `GroupHeadH` 34, `ControlHeight` 34. `App.pa.yaml` computes 46, 70, 118, 30, 30. Every height review done off the doc rather than the tokens is 4-10px wrong per band. | Correct the five numbers in RUNBOOK, or stop quoting them and name the formula. |

Counts: 5 High, 6 Medium, 4 Low.

Checked and found clean, so recorded rather than flagged:

- Naming. Every one of the 190 controls in the file is prefixed `fd`. No exceptions.
- Dead named formulas. All 41 `FrontDoor*` names in `Formulas.frontdoor.yaml`, plus the 11 `*Min*`
  twins, are read by the screen. None is dead, and none leaks to another screen.
- Dead variables. All six `varFrontDoor*` are both written and read; none is read by another file.
- `fdScreenRowHit.OnSelect` (2309-2316) already `Reset`s the three panel inputs on row open, so
  the panel does not carry the previous row's typed text.
- `Priority` and `'Decline category'` are text columns in `columns.json`, so writing
  `FrontDoorScreenPriority` and `fdScrFieldCategory.Selected.Value` straight in is correct, not a
  missing Switch.
- Both galleries carry `TemplatePadding: =0`, `TemplateSize: =RowHeight` and a real
  `AccessibleLabel`; the two hit targets carry the inset focus ring, `TabIndex: =0` and a Tooltip.
- `fdBody` scrolls Y by design (the page body), and its 2572px of content at 1080 is intended.
- `FrontDoorRightH`'s `Gap * 3` is correct, not an off-by-one: the third Gap is the one the
  conditional product prompt adds inside `fdGroupProduct`.

---

## Part 2. Cross-screen pattern census

Eleven files: the ten in `Screens/`, `Screens.flagged/FrontDoor.pa.yaml`, and
`Components.pa.yaml` where it supplies a pattern.

### (a) Screen header row

| Screen | Construction | Deviates | Note |
| --- | --- | --- | --- |
| Benefits | `bnHeader` AutoLayout, `AppHeaderH`, `BrandBg`, 6 children: name, scope, search, quarter | N | |
| Command | `cmdHeader`, same 6 | N | majority |
| Financials | `fnHeader`, same 6 | N | |
| Import | `imHeader`, 5 children — no `cmpSearch` | **Y** | the only screen with a header and no search |
| QuarterClose | `qcHeader`, same 6 | N | |
| Settings | `stHeader`, same 6 | N | |
| Team | `tmHeader`, same 6 | N | |
| Timeline | `tlHeader`, same 6 | N | |
| Work | `wkHeader`, same 6 | N | |
| WorkItem | `wiHeader`, same 6 | N | |
| FrontDoor | `fdHeader`, 4 children — no `cmpScope`, no `cmpSearch` | **Y** | deliberate for scope (flag-gated), undeliberate for search |

Variants: 3. Majority (9 of 11) is the six-child header. `Components.pa.yaml` declares six
components — `cmpStat`, `cmpPill`, `cmpStepper`, `cmpRail`, `cmpSearch`, `cmpScope` — and no
`cmpHeader`, so the header row is copied by hand into all eleven files. That is why two have
drifted.

### (b) Page head and section titles

| Screen | Page head | Section title | Deviates | Note |
| --- | --- | --- | --- | --- |
| Benefits | `bnPageHead` > `bnHeadText` > eyebrow + title | `TypeSubtitle` @ `TypeBodyLine` | N | |
| Command | `cmdPageHead` > `cmdHeadText`, plus `cmdLede` | `TypeSubtitle` @ `TypeHeadingLine` | **Y** | only screen with a lede; taller title line |
| Financials | `fnPageHead` > `fnHeadText` | `TypeSubtitle` @ `TypeHeadingLine` | **Y** | taller title line |
| Import | `imPageHead` > eyebrow + title, no `HeadText` wrapper | `TypeSubtitle` @ `TypeBodyLine` | **Y** | |
| QuarterClose | `qcPageHead` > `qcHeadText`, plus `qcActions` | `TypeSubtitle` @ `TypeHeadingLine` | **Y** | one of two screens with head actions |
| Settings | `stPageHead` > eyebrow + title, no wrapper | 1 only | **Y** | six sections, one `TypeSubtitle` title |
| Team | `tmPageHead` > `tmHeadText` | `TypeSubtitle` @ `TypeBodyLine` | N | |
| Timeline | `tlPageHead` > `tlHeadText` | `TypeSubtitle` @ `TypeBodyLine` | N | |
| Work | `wkPageHead` > `wkHeadText` | `TypeSubtitle` @ `TypeBodyLine` | N | |
| WorkItem | none — `wiHead` + `wiActions` instead | `TypeSubtitle` @ `TypeBodyLine` | **Y** | the only screen with no page head at all |
| FrontDoor | `fdPageHead` > eyebrow + title, no wrapper | `TypeSubtitle` @ `TypeBodyLine` | **Y** | |

Variants: page head 4 (`HeadText` wrapper / bare / wrapper+lede / none), section title height 2.
Majority: `xxPageHead` > `xxHeadText` > eyebrow + title, and a section title at `TypeSubtitle`
over `TypeBodyLine`. **This is the pattern with the most variants of the seven.**

### (c) Table galleries

| Gallery | Screen | TemplateSize | TemplatePadding | Header row | Column widths | Deviates | Note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tmPeople | Team | `TeamPeopleRowH` | 0 | `tmPeopleHead` ManualLayout | tables.json | N | declared |
| tmSquads | Team | `RowHeight` | 0 | `tmSquadHead` | tables.json | N | declared |
| tmAbsences | Team | `RowHeight` | 0 | `tmAbsenceHead` | tables.json | N | declared |
| wkList | Work | `WorkRowH` | 0 | `wkHeadRow` | tables.json | N | declared |
| fnSquad/Grade/Fl/Wi | Financials | `RowHeight` x4 | 0 | 4 ManualLayout heads | tables.json | N | declared |
| qcHistory/Outlook/Archive | QuarterClose | `RowHeight` x3 | 0 | 3 ManualLayout heads | tables.json | N | declared |
| qcCompare, qcCalibration | QuarterClose | `RowHeight` | 0 | none | named formulas | **Y** | `pending` in tables.json |
| bnCal, bnActual | Benefits | `BenefitsCalRowH`, `RowHeight` | 0 | declared heads | tables.json | N | declared |
| bnRollup, bnTypes | Benefits | `RowHeight` | 0 | literal head | named formulas | **Y** | `pending` |
| cmdCommit | Command | `RowHeight` | 0 | `cmdCommitHead` | tables.json | N | declared |
| cmdBlock x3 | Command | `CmdBlockRowH` | 0 | none | `CmdLeft*`/`CmdRight*` | **Y** | list, not table |
| cmdBenefitBars | Command | `cmdBenefitBars.Width / CountRows(...)` | 0 | none | derived | N | chart |
| tlAvailRows | Timeline | `TlRowH` | 0 | `tlAvailHead` | tables.json | N | declared |
| tlSprint/tlQuarter/tlSpread | Timeline | `TlRowH`, `TlRowH + 12` | 0 | 3 heads | `Tl*Share*`/`Tl*Min*` | **Y** | `pending` |
| Timeline:1721 | Timeline | `=200` | 0 | none | literal | **Y** | the one literal TemplateSize in the app |
| stStates/Lists/Grades/Blends/Outcomes/Activity | Settings | `RowHeight` x6 | 0 | 6 ManualLayout heads | named formulas | **Y** | six tables, **none** declared and none in `pending` |
| imRuns | Import | `RowHeight` | 0 | `imHeadRuns` | named formulas | **Y** | not declared, not in `pending` |
| wiWalk + 5 | WorkItem | `ItemWalkRowH`, `RowHeight` x5 | 0 | mixed | named formulas | **Y** | none declared |
| fdMyList, fdScreenList | FrontDoor | `RowHeight` | 0 | `fdMyHead`, `fdScreenHead` | `FrontDoor*Share*`/`*Min*` | **Y** | documented exception (flag-gated) |

Variants: `TemplatePadding` **1** (every gallery in the app is 0 — full conformance).
`TemplateSize` 3 (`RowHeight`, a named row-height formula, one literal).
Column width source **2**, and this is the real split: 20 tables are declared in `tables.json`, 4
are honestly listed under `pending`, and **at least 13 are neither** — all six on Settings, the
Import runs table, five on WorkItem and the two on the front door. The front door's two have a
written reason; the other eleven do not appear anywhere in `tables.json`, so preflight check 20
cannot see them and nothing stops a hand-written width drifting.

Header row construction is uniform where it exists: ManualLayout container, `FillPortions: =0`,
`Height: =RowHeight`, cells carrying the same named widths with `Parent.Width` against the row's
`Parent.TemplateWidth`. No deviations found.

### (d) Cards

| Screen | Radius | Border | Padding | Shadow | Deviates | Note |
| --- | --- | --- | --- | --- | --- | --- |
| Benefits | `CardR` x2 | `NeutralStroke1` | `Pad` | none | N | |
| Command | `CardR` x7 | `NeutralStroke1` x6 | `Pad` | none | N | majority |
| Financials | `CardR` x6 | `NeutralStroke1` x5 | `Pad` | none | N | |
| Import | `CardR` x2 | x2 | `Pad` | none | N | |
| QuarterClose | `CardR` x5 | x1 | `Pad` | none | **Y** | 5 rounded cards, 1 border |
| Settings | `CardR` x1 | x1 | `Pad` | none | **Y** | six sections in one card |
| Team | `CardR` x2 | x3 | `Pad` | none | **Y** | one bordered box with no radius |
| Timeline | `CardR` x4 | x4 | `Pad` | none | N | |
| Work | `CardR` x5 | x2 | `Pad` | none | **Y** | 3 rounded cards with no border |
| WorkItem | `CardR` x11 | x12 | `Pad` | none | **Y** | 63 `NeutralBg1` fills against 11 cards |
| FrontDoor | `CardR` x2 | x15 | `Pad` on cards, hand-written `X: =Pad` in the 12 groups | none | **Y** | 12 square bordered boxes |

Variants: 3 (rounded + bordered, rounded + no border, bordered + no radius). Majority is
`Radius*: =CardR` + `BorderColor: =NeutralStroke1` + `BorderThickness: =1` + `Fill: =NeutralBg1` +
the four paddings at `Pad`. No screen uses a shadow anywhere — that is unanimous.

### (e) Empty states and error display

| Screen | Empty state | Error display | Deviates | Note |
| --- | --- | --- | --- | --- |
| Benefits | 4 `*Empty` labels | none | N | |
| Command | none | none | **Y** | 6 galleries, no empty state |
| Financials | 4 | `Notify` x1 | N | |
| Import | none | `Notify` x1 | **Y** | 1 gallery, no empty state |
| QuarterClose | 7 | `Notify` x1 | N | |
| Settings | 6 | `Notify` x15 | **Y** | Notify only, no inline error line |
| Team | 3 | `varPersonSaveError` + `varAbsSaveError` labels, `Notify` x3 | N | the form pattern |
| Timeline | 4 | none | N | |
| Work | 1 | `varWorkSaveError`, `Notify` x1 | N | |
| WorkItem | 3 | `varProblem` x13, `varAssessMsg`, `varActualMsg`, `varLinkSaveError`, `Notify` x11 | **Y** | four different error variables on one screen |
| FrontDoor | 2 | `varFrontDoorSaveError`, `varFrontDoorScreenError`, `Notify` x5 | N | |

Variants: empty state 2 (a `*Empty` label gated on a count, or nothing). Error display **3**: an
inline label on a screen-scoped `var*SaveError` (Team, Work, FrontDoor — the RUNBOOK form
pattern), `Notify` alone (Settings, Import, Financials, QuarterClose), and WorkItem's `varProblem`
which no other screen uses. Nine distinct error variable names across five screens.

### (f) Peek and side panels

| Screen | Panels | Scrim | Deviates | Note |
| --- | --- | --- | --- | --- |
| Team | `tmPersonPanel`, `tmAbsencePanel` | `tmScrim` x4 refs | N | the reference pattern |
| Work | `wkNewPanel` | `wkScrim` | N | |
| WorkItem | 1 panel | scrim | N | |
| FrontDoor | `fdScreenPanel` | `fdScreenScrim` | N | copies Team exactly |
| Timeline | 15 `*Peek*` controls, no scrim | none | **Y** | the peek card is a card, not a panel |
| Benefits, Command, Financials, Import, QuarterClose, Settings | none | none | N | |

Variants: 2. Majority of the screens that have one (4 of 5) use the Team pattern:
`Width: =Max(Parent.Width * 0.32, 420)`, `Height: =Parent.Height`, `X: =Parent.Width - Width`,
a full-screen `RGBA(0, 0, 0, 0.4)` scrim, both `Visible` on the same variable, and a transparent
`Classic/Button` for the scrim's dismiss. Timeline's peek is the one deviation, and it is a
reasonable one: a cell peek is not a form.

### (g) Form field rows

| Screen | Construction | Deviates | Note |
| --- | --- | --- | --- |
| Team | `FormFieldTop` + `FormFieldStep * i`, label at `TypeLabelLine`, control at `+ TypeLabelLine + 4` | N | the reference |
| Work | same, 22 uses | N | |
| FrontDoor | same `FormFieldStep`, 67 uses, but `FormFieldTop` only twice — the groups restart at `Pad + GroupHeadH + FormFieldStep * i` | **Y** | a grouped variant of the same step |
| WorkItem | none — its editors are grid cells, not stacked fields | **Y** | |
| the other 7 | no form | N | |

Variants: 2 among the screens that have a form. `FormFieldH`, `FormFieldStep` and `FormFieldTop`
are named once in `Formulas.pa.yaml` (3677-3679) and every form reads them. No screen hand-writes
a field offset.

---

## Rules and checks to add

Each is mechanically checkable against `power/app` without opening Studio. Numbering continues
from preflight's current 26 checks.

1. **Every screen's header row is one component instance, `cmpHeader`, not a copied container.**
   Check: no file in `power/app/Screens*` declares a child named `<prefix>Header`; each declares
   exactly one `ComponentName: cmpHeader`. Until the component exists, the weaker form: every
   `<prefix>Header` has exactly the same child name suffixes (Name, Scope, Search, Quarter).
2. **Every screen has exactly one page head, built as `<prefix>PageHead` > `<prefix>HeadText` >
   eyebrow + title.** Check: one `PageHead:` per screen file, and a `HeadText:` under it.
   Deviations today: Import, Settings, WorkItem, FrontDoor.
3. **Every table gallery has an entry in `power/canvas/tables.json` or a line in its `pending`
   list.** Check: for each `Control: Gallery@2.15.0` whose template holds a `Label` grid and whose
   card holds a ManualLayout header container, the gallery or its head name appears in
   `tables.json`. Fails today on 11 galleries (6 Settings, 1 Import, 4 WorkItem) that are in
   neither list.
4. **Every gallery has `TemplatePadding: =0`.** Passes today on all 57. Cheap to keep.
5. **A `TemplateSize` is `RowHeight`, a named `*RowH` formula, or a `Max(share, min)` expression —
   never a bare number.** Fails today on `Timeline.pa.yaml:1721` (`=200`).
6. **The minimum widths of a declared table sum to no more than the card's inner width at
   `IsCompact`, or the card sets `LayoutOverflowX: =LayoutOverflow.Scroll`.** Computable from
   `tables.json` mins against `900 - RailWidthTight - Pad*4`. Fails today on the front door's
   screening queue (850 against 812).
7. **A card is all five of: four `Radius*: =CardR`, `BorderColor: =NeutralStroke1`,
   `BorderThickness: =1`, `Fill: =NeutralBg1`, four `Padding*: =Pad`.** Check: any container with
   any one of the five has all five. Fails today on FrontDoor's 12 question groups, Team's third
   bordered box, and Work's three unbordered cards.
8. **Every gallery has a sibling empty state gated on the same count its `Visible` reads.** Check:
   for a gallery with `Visible: =<X> > 0`, a Label in the same parent with `Visible: =<X> = 0`.
   Fails today on Command (6 galleries, 0 empty states) and Import (1, 0).
9. **A screen that writes has exactly one error variable, named `var<Prefix>SaveError`, shown in
   one inline Label, and `Notify` is used only for success.** Fails today on WorkItem (four
   variables, one of them `varProblem`) and on Settings (15 `Notify` calls, no inline line).
10. **Every side panel is the Team geometry.** Check: a control whose name ends `Panel` has
    `Width: =Max(Parent.Width * 0.32, 420)`, `Height: =Parent.Height`,
    `X: =Parent.Width - Max(Parent.Width * 0.32, 420)`, and a sibling `*Scrim` with
    `Fill: =RGBA(0, 0, 0, 0.4)` and the same `Visible`. Passes today on all four.
11. **A form field's `Y` is only ever `<top> + FormFieldStep * i` and its control's is that plus
    `TypeLabelLine + 4`.** Check: no `Y:` in a form group contains an integer literal other than
    through `Pad`, `GroupHeadH` or `FormFieldStep`. Passes today.
12. **A `Switch` that produces a choice member for a `Patch` has `Blank()` as its default.**
    Check: any `Switch(` whose arms contain `'<Choice> (<Table>)'.` has an odd arm count ending in
    `Blank()`, or is wrapped in `If(IsBlank(...), Blank(), ...)`. Fails today on the front door's
    five submit Switches.
13. **A lookup column is never populated by re-finding the record that was just written.**
    Check: no `Patch` body contains a `LookUp(<Table>, ...)` naming a table that the same
    `OnSelect` has already `Patch`ed. Fails today on `fdScrSpike` and `fdScrFeature`.
14. **A `Visible` or `DisplayMode` is a named formula, a single variable, or at most three
    conditions.** Check: count `||` and `&&` in the property. Fails today on `fdError.Visible`
    (25) and `fdSubmit.DisplayMode` (25).
15. **No `Visible: =true` and no `Visible: =false`.** A permanently visible control does not
    declare `Visible`; a gate that is not built yet is a named formula returning false. Fails
    today on `fdScreenCard`.
16. **A `Label` carries `Wrap: =false` and no `AutoHeight` where its `Height` is one line of its
    `Size`.** Check: `AutoHeight: =true` never appears beside a `Height` that is a single
    `Type*Line`. Fails today on five front-door labels.
17. **RUNBOOK section 4 quotes no band height as a number.** Check: the "Layout calibration" and
    "Space allocation" text names `AppHeaderH`, `PageHeadH`, `BandH`, `GroupHeadH`,
    `ControlHeight` without a parenthesised value, since all five are wrong there today.
