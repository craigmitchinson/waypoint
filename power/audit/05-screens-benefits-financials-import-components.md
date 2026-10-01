# Audit 05: Benefits, Financials, Import, Components

Read-only audit of `power/app/Screens/Benefits.pa.yaml`, `power/app/Screens/Financials.pa.yaml`,
`power/app/Screens/Import.pa.yaml` and `power/app/Components.pa.yaml`, against `power/RUNBOOK.md`
section 4 and the tokens in `power/app/App.pa.yaml`. Concern: quality, dead code, duplication,
performance. Typography and colour tokens are audited elsewhere and are not repeated here.

Sampled in full: `Components.pa.yaml` (498 lines), `Import.pa.yaml` (726 lines), the Benefits band,
card head, calendar foot and hidden tables, the Financials page head, band, figures card, squad card
and funding card, plus `power/canvas/tables.json` for every table these screens declare. Sampled by
structure only (control outline, widths, Visible, gaps): the Benefits calendar rows, the Financials
grade and work cards, and every cell whose X and Width the table compiler owns.

Neither Benefits nor Financials draws a chart: there is no `Image@`, no SVG and no series-building
formula in either file, so the chart and sr-only-table questions in the brief do not arise.
Financials sets no variables at all; Benefits sets one; Import sets one. No reader without a setter
and no setter without a reader was found in the three screens.

## Benefits.pa.yaml

Roughly 43 per cent of the file (867 of 2002 lines) is permanently invisible. `BenefitsTab` is a
constant named formula (`Formulas.pa.yaml:1764`, `= "Benefits calendar"`), so the roll-up table, the
actuals table and the benefit-types table can never show; the actuals block additionally carries
`Visible: =false`. The live calendar is sound, but its footer is twelve hand-written copies of one
label, and its band clips a wrapped row at common window widths.

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | Benefits.pa.yaml:416-752, 1473-1729, 1730-2002 | bnRollupHead/bnRollup, bnActualHead/bnActuals, bnTypeHead/bnTypes | 867 unreachable lines: `BenefitsTab` is fixed to "Benefits calendar" (Formulas.pa.yaml:1764) and the actuals block is `Visible: =false`. The named formulas only they read (BenefitsRollupRows, BenefitsTypeRows, BenefitsActualRows, BenefitsTypeItems/Money/Recorded) still recalculate, each summing over colClaims and colActuals. | Delete the three blocks and their formulas (decision 9 is recorded, so history is the restore path), or put them behind a real tab variable. |
| High | Benefits.pa.yaml:229-230 | bnBand | The wrap threshold reads `App.Width`, not the band's own width: the band gets `App.Width - rail - Pad*4`. Between about 1280 and 1414 wide, and at any width where the user has expanded the rail, the five stats wrap to a second row while `Height` stays `BandH` and `LayoutOverflowY: Hide` clips it. | Compare `Parent.Width - Pad * 2` against `BandKickerW + 5 * <stat min> + Gap * 5`, or drop the fixed height and let the band size to its wrapped content. |
| Medium | Benefits.pa.yaml:375, 399 | bnCardHead, bnSummary | `Width: =Max(Parent.Width, BnCalMinW)` inside a card padded `Pad` each side makes the row 32px wider than the content box, and `bnSummary` then takes `Parent.Width - 168` of it, so the right-aligned summary runs under the card's padding. The calendar's own head, rows and foot correctly use `Max(Parent.Width - Pad * 2, BnCalMinW)` (758, 912, 1104). | Use `Parent.Width - Pad * 2` here too, and derive 168 from the tab-list width plus `Gap` instead of typing it. |
| Medium | Benefits.pa.yaml:1128-1449 | bnCalFootM1..bnCalFootM12 | Twelve near-identical labels, about 320 lines, differing only in the index. The header of the same repeat column is one horizontal gallery (bnCalHeadMonths, 780-817) and `BenefitsCalendarFooter` is already a table. | One horizontal gallery over `BenefitsCalendarFooter`, and the months column's `foot` list in tables.json (canvas/tables.json:285-299) becomes one name. |
| Medium | Benefits.pa.yaml:1144, 1441 and the ten between | bnCalFootM* | `Fill: =If(Mod(1, 2) = 1, NeutralBg2, NeutralBg1)` is constant arithmetic on a literal index: it reads as row striping but can never vary. | Falls out with the gallery above; until then write the resolved colour. |
| Medium | Benefits.pa.yaml:266, 277, 289, 301, 324 | bnStatInYear, bnStatRecorded, bnStatGap, bnStatFte, bnStatReliability | `Max((Parent.Width - Pad * 2 - BandKickerW - Gap * 5) / 5, 180)` repeated verbatim five times, with its terms repeated a sixth time in the band height at 230. | One named formula (`BnBandStatW`) read by the five stats and by the height. |
| Medium | Benefits.pa.yaml:311-319 | bnStatFte | Re-derives the NumberTones "benefitGap" tone inline in the screen, duplicating `BenefitGapTone` (Formulas.pa.yaml:3960) with a different input. | Add a named formula beside BenefitGapTone for the FTE ratio and read it here. |
| Low | Benefits.pa.yaml:330-334 | bnStatReliability | Thresholds 0.60 and 0.80 typed into the screen, outside the one threshold table the Number tones rule requires. | Add a `reliability` row to NumberTones and read it. |
| Low | Benefits.pa.yaml:1108-1127, 1450-1470 | bnCalFootLabel, bnCalFootYearEnd | Two labels occupy one cell (both `X: =0`, same Width and Height), one left-aligned and one right-aligned. | One label with the two texts joined, or two declared halves of the title column. |
| Low | canvas/tables.json:1052-1056 | benefits-register | The compiler still owns and check 20 still verifies widths for `bnActualHead`/`bnActuals`, which can never render. | Remove the entry with the block. |

## Financials.pa.yaml

No dead variables, no charts; the screen is read-only. The visible defect Craig reported has one
cause: every table here declares `"padding": "0"` while its host card pads `Pad` on each side, so
every grid is 32px wider than the card holding it and the card scrolls sideways at every size. Two
rows in the funding card are hand-built outside the compiler and cannot line up with the rows above
them. The rest is volume: four near-identical card blocks and six near-identical figure rows.

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | canvas/tables.json:338, 428, 488, 548; Financials.pa.yaml:695, 901, 1201, 1332, 1556, 1687, 2110, 2264 | fnSquadHead/fnSquad, fnGradeHead/fnGrade, fnFlHead/fnFunding, fnWiHead/fnWork | All four tables declare `"padding": "0"` although each host card sets `PaddingLeft/Right: =Pad`, so the compiler sizes head and rows to the whole card width: 32px too wide. With `LayoutOverflowX: Scroll` on the card, every card scrolls sideways at every window size and the last column sits under the right padding. Every other padded card in the repo declares `"padding": "Pad * 2"` (benefits-calendar, timeline-*, quarter-close-*). | Set `"padding": "Pad * 2"` on the four entries, reassemble, and let check 20 rewrite the container widths. |
| High | Financials.pa.yaml:1811-1923, 1924-2039 | fnFlPeopleRow, fnFundingFoot | Two five-column grid rows hand-built as AutoLayout with `Max(Parent.Width * share, min)` and `LayoutGap: =0`, inside a card whose head and rows are compiler-written with gap 8 and a scrollbar reserve. They cannot line up: this is the failure RUNBOOK's "table header row" rule describes. Neither is declared in tables.json nor listed under `pending`. | Declare the funding table's foot (`"foot": "fnFundingFoot"`) and the people row as foot cells, rebuild both as ManualLayout containers, and let the compiler write their X and Width. |
| Medium | Financials.pa.yaml:359-642 | fnFigInYear, fnFigRecorded, fnFigTco, fnFigQuarter, fnFigReturn, fnFigPayback | Six copies of one label-and-value ManualLayout pair, about 284 lines, differing only in text and formula; the halves split on a literal `Parent.Width * 0.5`. | One vertical gallery over a `FinFigureRows` named table (Label, Value, Tone), or a small component. |
| Medium | Financials.pa.yaml:644-1148, 1150-1503, 1505-2057, 2059-2475 | fnSquadCard, fnGradeCard, fnFundingCard, fnWorkCard | Four card blocks repeat the same shell verbatim: identical radii, border, padding, overflow, `LayoutGap: =8`, a title label, a ManualLayout head, an empty label, a gallery and a foot. About 1830 lines carrying four tables' worth of difference. | A `cmpTableCard` component (title, minimum width, empty text) holding the declared head and rows, or at minimum named formulas for the card shell. |
| Medium | Financials.pa.yaml:219-239 | fnExport | `Visible: =false` control whose OnSelect is a placeholder `Notify`. Unreachable, and it promises a later unit. | Delete; the CSV export unit adds it back with its handler. |
| Medium | Financials.pa.yaml:249-250 | fnBand | The same `App.Width` wrap threshold as Benefits. Correct today with three stats; wrong as soon as a fourth is added or the rail is expanded at a narrow width. | Compare the band's own available width. |
| Low | Financials.pa.yaml:1822-1849, 1936-1963 | fnFlPeopleNameBox, fnFundingFootNameBox | A container whose only job is to hold one label and absorb the remaining width: a spacer wrapper. | Falls out when those rows become compiler-owned ManualLayout rows. |
| Low | Financials.pa.yaml:372, 390 and the five pairs below | fnFig*Label, fnFig*Value | Literal `Parent.Width * 0.5` column split typed twelve times, where the rule is a named split formula. | `FinFigShareLabel` and `FinFigShareValue`. |
| Low | Financials.pa.yaml:895-903, 1326-1334, 1681-1689 | fnSquad, fnGrade, fnFunding | Galleries are `Height: =CountRows(...) * RowHeight` with the empty-state label as a sibling and no `Visible` of their own, so at zero rows a zero-height gallery still takes a slot and a `LayoutGap` the card's height arithmetic does not count. | Give each gallery `Visible: =CountRows(...) > 0`, as Benefits does at 585 and 915. |

Card height arithmetic was recomputed and is otherwise right: `fnFigures` is 32 + 30 + 6*36 + 6*4 =
302 (line 327) and `fnSquadCard` is 32 + 30 + 36*(2 + rows) + 3*8 (650-652), both matching their
visible children and gaps at 1080.

## Import.pa.yaml

One concern dominates: the five-step strip is five hand-written buttons, 100 lines, whose fixed
widths total 982px inside a Hide-overflow row, while `cmpStepper` — a component built for exactly
this — has no instance here. The flow state is already one variable, so the brief's worry about
several step variables does not apply. The runs table is hand-positioned and undeclared.

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | Import.pa.yaml:209-308 | imStepSource, imStepFile, imStepMap, imStepPeople, imStepPreview | Five identical 20-line buttons differing only in a step name, each `Width: =190`. 5*190 + 4*8 = 982px in a row with `LayoutOverflowX: Hide`; the body is about 828px at `IsCompact` (900) and about 1010px at 1280 with the rail expanded, so step 5 is unreachable at the narrow end. | One horizontal gallery over a five-row step table with `TemplateSize: =Parent.Width / 5`, appearance read off `ThisItem`; or an instance of `cmpStepper` once it has an OnSelect. |
| Medium | Import.pa.yaml:475-595 against 596-726 | imHeadRuns, imRunsList | The header is an AutoLayout row with a `FillPortions: =1` spacer box, while the gallery's cells are positioned manually off `Parent.TemplateWidth` and the `ImpCol*` widths. RUNBOOK's table rule says an AutoLayout header does not line up with its rows. | Rebuild the header as a ManualLayout container using the row's X expressions with `Parent.Width`, and declare the table. |
| Medium | canvas/tables.json:1413-1418 | imHeadRuns, imRunsList | The runs table is neither declared nor listed under `pending`, so no compiler and no check covers it; its five column widths are literals at Formulas.pa.yaml:3656-3661. | Add an `import-runs` entry, or a `pending` line saying why not. |
| Medium | Import.pa.yaml:81-106; Components.pa.yaml:342-353 | imHeader, railItem | The only screen without a `cmpSearch` instance (the other nine carry one), and the rail's Navigate switch has no "Import" branch, so the screen is reachable only from Settings.pa.yaml:2345. | Add the search instance for shell parity; if Import is meant to stay off the rail, record that in this screen's header comment as well as the rail's. |
| Low | Import.pa.yaml:483, 604 | imHeadRuns, imRunsList | `Visible: =true` constants. | Delete the property. |
| Low | Import.pa.yaml:615 | imCellRnName | `Width: =Parent.TemplateWidth - ImpRunColsW - 16` with no floor; `ImpRunColsW` is 660, so the cell goes negative under a 676px template. The convention elsewhere wraps such a subtraction in `Max(..., min)`. | `Max(Parent.TemplateWidth - ImpRunColsW - 16, 200)`. |
| Low | Import.pa.yaml:228-308 and App.pa.yaml OnStart | varImportStep | The only screen-state variable in the app not initialised in `App.OnStart`. `ImportStep`'s `If(IsBlank(...))` covers the blank, but the screen has no `OnVisible`, so the strip also keeps its step between visits. | Initialise beside varWorkPhase, and reset on OnVisible if the step should not persist. |
| Low | Import.pa.yaml:416-435 | imRunFlow | The only action on the screen is a placeholder `Notify`, correctly labelled as such. Recorded so the count of real actions on this screen reads zero. | None until the flow unit. |

## Components.pa.yaml

Six components, 498 lines. Inventory, with instances counted across `Screens/` and `Screens.flagged/`:

| Component | Inputs | Outputs | Consumers | Instances |
| --- | --- | --- | --- | --- |
| cmpStat | Label, Value, Unit, Sub, Tone, Color, OnBrand | none | Benefits 5, Command 5, Financials 3, QuarterClose 7, Team 4 | 24 |
| cmpPill | Label, Tone | none | WorkItem only | 4 |
| cmpStepper | Steps, Current, Label | CurrentIndex | WorkItem only | 1 |
| cmpRail | Active | none | every screen | 11 |
| cmpSearch | none | none | every screen but Import | 9 |
| cmpScope | none | none | every screen | 10 |

`cmpScope`'s ten instances are all `Visible: =IncludeScope`, which is false until the scope flag
flips: inert by design, not dead.

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| Medium | Components.pa.yaml:54-59, 99-103 | cmpStat.Color, statValue | The `Color` input defaults to `NeutralFg1` and the child tests `If(cmpStat.Color <> NeutralFg1, ...)` as a sentinel for "not set". A caller that legitimately passes NeutralFg1 silently gets the Tone/OnBrand branch, and the sentinel breaks if that token ever equals another. | Add a `UseColor` boolean input, or default `Color` to `Color.Transparent` and test that. |
| Medium | Components.pa.yaml:238-241 | stepMark | Three-branch `If` whose second condition, `Index(Steps, CurrentIndex).Name = ThisItem.Name`, is true exactly when the first is, and returns the same `BrandBg`. A dead branch, and the only reader of the `CurrentIndex` output. | Reduce to `If(ThisItem.Name = cmpStepper.Current, BrandBg, NeutralStroke1)`, then either delete `CurrentIndex` or keep it as a documented output for consumers. |
| Medium | Components.pa.yaml:249-251 | stepName | `Text: =ThisItem.Name & If(ThisItem.Name = cmpStepper.Current, "", "")` concatenates the empty string either way: a marker removed and left behind. | `Text: =ThisItem.Name`. |
| Low | Components.pa.yaml:179-263 against Import.pa.yaml:209-308 | cmpStepper | One consumer, while Import hand-builds the same "steps with a current one" strip from five buttons. | Give cmpStepper a Selected output and an OnSelect and use it on Import, or accept it as WorkItem-only and say so in its Description. |
| Low | Components.pa.yaml:282 | cmpRail | `Height: =1080`, a screen-height literal in the one file whose rule is that nothing knows the window size. Every instance overrides it with `Parent.Height`, so it is inert. | `Height: =App.Height`. |
| Low | Components.pa.yaml:68, 151, 208, 430, 476 | cmpStat, cmpPill, cmpStepper, cmpSearch, cmpScope | Default `Width` literals (190, 110, 520, 280, 180). Harmless as defaults, but the screens then repeat the same numbers by hand (`Max(Parent.Width * 0.24, 280)` and friends). | Name them (`StatMinW`, `SearchMinW`, `ScopeMinW`) in App.pa.yaml and read the same name in both places. |
| Low | Components.pa.yaml:488-489 | scopeBox | Raw `FontUI` and `TypeBody` where the sibling components use the role aliases `TypeFace` and `TypeBodySize`. Same values, inconsistent naming. | Use the aliases. |

## Rules and checks to add

Each is mechanically checkable from the sources named.

1. **No permanently invisible control.** Fail when a control's `Visible` is `=false`, or is a
   comparison against a named formula whose definition in `Formulas.pa.yaml` is a string literal (as
   `BenefitsTab` is). Report the control and the lines it spans.
2. **Table padding matches its card.** For each entry in `tables.json`, find the `head` control in
   `power/app`, walk to its parent container, and fail when the parent sets `PaddingLeft`/`PaddingRight`
   but the entry declares `"padding": "0"`, or the reverse.
3. **Every grid row is compiler-owned.** Fail on a container that is a sibling of a declared `head` or
   `row`, holds three or more Labels, and is not the entry's `foot`. Catches fnFlPeopleRow and
   fnFundingFoot.
4. **Every table is declared or pending.** Fail when a screen holds a Gallery whose siblings include a
   header container of Labels and whose name appears in neither `tables.json` `head`/`row` nor `pending`.
5. **No sibling clones.** Fail when three or more sibling controls of the same type differ only in a
   digit or a quoted string across their normalised property block. Catches imStep*, bnCalFootM*, fnFig*.
6. **Wrap thresholds do not read App.Width.** Fail on a `Height` formula containing both `App.Width` and
   a comparison against a sum of child widths: the available width is the parent's, not the window's.
7. **No constant-index arithmetic.** Fail on `Mod(<number literal>, ...)`, `If(<literal> = <literal>, ...)`
   and `& If(<cond>, "", "")` in any screen or component property.
8. **Every subtraction from a parent width has a floor.** Fail on `Parent.Width - <expr>` or
   `Parent.TemplateWidth - <expr>` not wrapped in `Max(...)`, outside compiler-owned cells.
9. **No `Visible: =true`**, and no property whose formula only restates the control's default.
10. **Shell parity.** Every screen in `power/app/Screens` carries exactly one `cmpRail`, one `cmpScope`
    and one `cmpSearch` instance, and every screen is reachable from the rail's Navigate switch or from a
    `Navigate(` elsewhere in `power/app`; report any screen no branch reaches.
11. **Component consumer count.** Print each component's instances per screen; fail a component with
    zero consumers and warn at one, so a dead or single-use component is a decision rather than drift.
12. **Tones stay out of screens.** Fail on `HigherIsWorse` appearing in any file under `Screens/`: a tone
    is a named formula in `Formulas.pa.yaml`.
