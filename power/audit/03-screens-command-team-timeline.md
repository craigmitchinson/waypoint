# Audit 03: Command, Team, Timeline

Read-only audit of `power/app/Screens/Command.pa.yaml`, `Team.pa.yaml` and `Timeline.pa.yaml`
against `power/RUNBOOK.md` section 4 and the tokens in `power/app/App.pa.yaml`.
Concern: quality, dead code, duplication, performance. Typography and colour tokens are audited
elsewhere and are not repeated here.

**What was sampled.** Every control in the three files was parsed with
`scripts/compile-tables.mjs` (`parseControls`/`readProperty`) and its `Visible`, `X`, `Y`, `Width`,
`Height`, `Items`, `TemplateSize`, `TemplatePadding`, `Layout*`, `DisplayMode` and event handlers
read: 83 controls on Command, 139 on Team, 129 on Timeline. Cell ownership was checked against
`power/canvas/tables.json`; variables were traced by grep across the whole of `power/app`.

**What was not.** The bodies of the two save handlers on Team (`tmPersonSave.OnSelect`,
`tmAbsSave.OnSelect`) and `tmAbsRemove.OnSelect` were read for length and shape only. They are
`Patch`/`Remove` write paths against `People` and `Absences`; their correctness is out of this
audit's concern and needs a review of its own. No formula was executed and nothing was rendered.

---

## Command

83 controls. The shell (header, rail, page head, band) is sound and the three Today cards'
height arithmetic is exact (`CmdBlockHeadH` carries the first `LayoutGap` of 8, so
`CmdBlockHeadH + rows + Pad * 2` balances). The faults are in the right column: the Squads card
is a hand-built, fixed-pixel table that goes negative at mid widths, and the Attention row carries
the same navigation twice.

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | Command.pa.yaml:1095-1242, Formulas.pa.yaml:698-705 | `cmdSquadList` / `squadRow` | An undeclared table with fixed pixel columns: `CmdSquadNameW` 140 + `CmdSquadPeopleW` 96 + `CmdSquadBarW` 100 + `CmdSquadPctW` 44 + four 8px gutters = 412px of fixed width. `squadMW.Width = Parent.Width - CmdSquadMWX` therefore goes **negative** while the page is two-column and narrower than about 1460px (at App.Width 1100, `cmdRight` is roughly 322px against a 412px column set). It is not in `tables.json` and not under `pending`. | Declare `command-squads` in `tables.json` (head: none, row `squadRow`, cells name/people/bar/pct/mw) and delete the eight `CmdSquad*` named formulas; until then wrap the width as `Max(Parent.Width - CmdSquadMWX, 76)`, the convention already used in `Benefits.pa.yaml:266`. |
| Medium | Command.pa.yaml:849-885 | `atHit`, `atOpen` | The row hit target and the "Open" button carry the same six-line `If(ThisItem.Target = "WorkItem", ...)` `OnSelect`, character for character. Two copies of one navigation rule drift apart on the next edit, and `atOpen` adds nothing the row does not already do. | Delete `atOpen` (the row is already the hit target, as on `cmdSpikeList`), or keep it and move the branch into the row record as a `Target`/`Key` pair the two share. |
| Medium | Command.pa.yaml:1157-1177 | `squadBarTrack`, `squadBarFill` | Two childless `GroupContainer@1.5.0` used as coloured bars. `Rectangle@2.3.0` is the control for this and is used for exactly this job on Timeline (`tlSpRowBand`, `tlSpCellFill`). A container is heavier and takes layout properties it does not want. | Swap both to `Rectangle@2.3.0`. |
| Medium | Command.pa.yaml:238-244 | `cmdBand` | `Height: =If(App.Width < (5 * (180 + Gap) + BandKickerW), BandH * 2, BandH)` measures the window, but the stats it is sizing for measure `Parent.Width`, which is the body — `App.Width` less the rail (220, or 56 collapsed) and the body padding. The band therefore wraps to a second row before the container doubles its height, and `LayoutOverflowY: Hide` clips the wrapped row. | Test the container's own width: `Parent.Width < 5 * (180 + Gap) + BandKickerW + Pad * 2`. |
| Low | Command.pa.yaml:1481-1506 | `benefitHoverCell` | A `Classic/Button` with `Text: =""`, `TabIndex: =0`, a `Tooltip` and **no `OnSelect`** — twelve focusable controls (one per month) that do nothing when activated. Keyboard users reach twelve dead stops. | Either give it the `OnSelect` the tooltip implies (set the month and open a detail), or set `TabIndex: =-1` and move the figures into an sr-only table beside the chart, per the ccs-ui accessibility contract. |
| Low | Command.pa.yaml:1443-1461 | `cmdBenefitHover` | `TemplateSize: =cmdBenefitBars.Width / CountRows(BenefitMonths)` sizes off a sibling control rather than the parent. The two are the same width today only because both are pinned to `cmdBenefitPlot`. | `Parent.Width / CountRows(BenefitMonths)`. |
| Low | Command.pa.yaml:1319-1336 | `cmdSprintStats` | A hand-built label-over-number strip that is the shape `cmpStat` already provides, and its `Items` is a literal table whose columns are pre-formatted with `Text(...)`, against the RUNBOOK's "keep numbers numeric inside table columns" rule. | Either four `cmpStat` instances in an auto-layout row, or keep the gallery and format at the cell. |
| Low | Command.pa.yaml:443-1506 | `cc*`, `at*`, `sp*`, `squad*`, `sprintStat*`, `benefitHover*` | Six control families inside `scrCommand` do not carry the screen's `cmd` prefix. Team and Timeline are consistent (`tm`, `tl`); Command is the outlier. | Rename to `cmdCc*`, `cmdAt*` and so on, or record the two-letter card prefixes as the convention in the RUNBOOK. |
| Low | Command.pa.yaml:653-672, decisions.md:285-296 | `ccHit` | The only `ModernButton` hit target in the app (`Appearance.Transparent`, no 2px inset, no focus border), against the `Classic/Button` pattern used by `atHit`, `spHit`, `squadRowHit`. This is the documented trial in `decisions.md`, but the entry has no owner and no date, so the inconsistency has no closing condition. | Add the verdict date to the `decisions.md` entry and either revert `ccHit` or run the sweep across every hit target. |

## Team

139 controls. The three tab views are compiler-owned tables and their height arithmetic is exact
(`Parent.Height - Pad * 2 - RowHeight - TypeLabelLine - 8 * 2`, with the chip row's own gap added
only when it shows). The one structural fault is a second, diverging copy of the column model that
the table compiler overwrites at assemble; the rest is the validation predicate written three times
per panel.

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | Team.pa.yaml:488-1798, Formulas.pa.yaml:1684-1734 | `tmHead*`, `tmRow*`, `tmSqHead*`, `tmSqRow*`, `tmAbHead*`, `tmAbRow*` | 36 `TeamShare*`/`TeamMin*`/`TeamSq*`/`TeamAb*` named formulas feed hand-written running-sum `X` and `Width` expressions (up to eleven `Max(...)` terms on one line) on cells that `compile-tables.mjs` **overwrites** at assemble. They are dead, and they have already drifted: `tables.json` `team-people` has name 0.22 / grade 0.05 / skills 0.15 / modifier 0.07 / net 0.07 / booked 0.07 / free 0.06, while `TeamShare*` has 0.20 / 0.06 / 0.22 / 0.06 / 0.05 / 0.05 / 0.05. Anyone tuning a column in `Formulas.pa.yaml` changes nothing and believes they have. | Delete the `TeamShare*`/`TeamMin*`/`TeamSq*`/`TeamAb*`/`Team*ColsW` blocks and replace the cell `X`/`Width` in `power/app` with a placeholder (`=0` / `=100`), the way the Financials cells already read. `tables.json` becomes the only column model. |
| Medium | Team.pa.yaml:2257-2296, 2736-2775 | `tmPersonError`, `tmAbsError` | The validation predicate appears three times per panel: once in the error Label's `Visible` (5 and 6 conditions on one line), once as the `If` chain in its `Text`, and once in the Save button's `DisplayMode`. The RUNBOOK asks for two copies (Text and DisplayMode); the `Visible` copy is redundant. | `Visible: =!IsBlank(Self.Text)` on both error Labels, removing one full copy of each predicate. |
| Medium | Team.pa.yaml:2806-2852 | `tmAbsSave` | A 46-line `OnSelect`, above the 30-line limit: scope branch, `ForAll` over the selected people, two `Patch` shapes, `ClearCollect`, `Notify` and error handling in one formula. Correctness not audited here. | Lift the per-person record into a named formula-backed collection built by the panel's open action, so the handler is the `ForAll` + `Patch` + refresh only. |
| Medium | Team.pa.yaml:283-289 | `tmBand` | Same class as `cmdBand`, with a different magic number: `App.Width < (4 * 200 + BandKickerW)` where the stats' own minimum is 180 and the gap is `Gap`. The two screens' bands disagree on the constant and both measure the wrong width. | One named formula, `BandWrapsAt(n) `-style, expressed once and read by both bands; test it against `Parent.Width`. |
| Low | Team.pa.yaml:429-478 | `tmChipRow`, `tmChipLabel`, `tmChipClear` | `Max(Parent.Width * 0.16, 200)` is typed three times across the row (label width, clear X, and the row's implied split), and `tmChipClear.Width: =80` is a bare literal. A `cmpPill` component already exists. | A named `TeamChipW`, or rebuild the row on `cmpPill`. |
| Low | Team.pa.yaml:216-282 | `tmAdd`, `tmAddAbsence` | Two page-head buttons with `Width: =160`, mutually exclusive on `TeamTab`, differing only in label and handler. The pattern recurs on other screens. | One button whose `Text` and `OnSelect` switch on `TeamTab`, or a named `PageHeadBtnW` for the literal. |

## Timeline

129 controls, four readings in one card. The peek card's geometry is correct in all four of its
states (work 260, absence 212, plain 188, empty 164 against content bottoms of 198/150/126/98) and
the nested cell galleries read `ThisItem.Cells`, so there is no N x M lookup anywhere on the screen.
The faults are a hard-coded 13, two empty containers, and 294 lines of legend that should be a
gallery.

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | Timeline.pa.yaml:1174, 1301 | `tlQuarterHeadWeeks`, `tlQtCells` | The Quarter reading's column count is the literal `13` in both the header gallery's `Width` and the row gallery's `Width`, while the data is `TlQuarterWeeks` / `ThisItem.Cells`. A quarter with 14 weeks (any quarter whose start and end Mondays span 14) draws a column the grid has no width for and the header and the rows stop lining up. | `CountRows(TlQuarterWeeks)`, or a `TlQuarterWeekCount` named formula beside `TlSprintDayCount` (Formulas.pa.yaml:3533), which already does this correctly for the Sprint reading. |
| Medium | Timeline.pa.yaml:1119-1384 | `tlQuarterHead`, `tlQuarterRows` | The Quarter reading is a five-slot table that is neither declared in `tables.json` nor listed under `pending` (the pending note covers the Sprints overview strip only). Its widths are hand-written from `TlQtShare*`/`TlQtMin*`, so the header and the rows are two independent copies of one pitch. | Declare it, or add it to `pending` with the reason, per the RUNBOOK's "a table not yet declared is listed under `pending`". |
| Medium | Timeline.pa.yaml:386-681 | `tlLegendOpen` … `tlLegendLate` | Seven Labels, ~42 lines each, identical apart from `Text` and a swatch colour: 294 lines that are one horizontal gallery over a seven-row legend table, or seven `cmpPill` instances. Each also carries a bare `Width: =90`. | A `TlLegend` named table (label, tone) and one `Gallery@2.15.0/Horizontal` with `TemplateSize` off `Parent.Width`. |
| Medium | Timeline.pa.yaml:867-878, 1160-1171 | `tlSprintHeadMetaBox`, `tlQuarterHeadMetaBox` | Two `AutoLayout` `GroupContainer`s with **no children**, present only to reserve the meta column's width in the header. A container used as a spacer is the layout-container equivalent of a Label used as a spacer. | Fold the meta width into the adjacent name box (`Width: =Max(...) + Max(...)`), or declare the table so the compiler writes the header's pitches. |
| Medium | Timeline.pa.yaml:1810-1884 | `tlAvailStripSkill`, `tlAvailStripFree`, `tlAvailStripPeople` | Three labels in the skills strip borrow `TlAvailShare*`/`TlAvailMin*` — the column model of a *different* gallery (`timeline-availability`, which the compiler owns) — and add pairs of them together to make their own three columns. These are not declared cells, so they are not overwritten: they will silently misalign the moment the availability shares change in `tables.json`. | Give the strip its own three shares, or declare it as a table of its own. |
| Medium | Timeline.pa.yaml:695-757 | `tlSnapAll`, `tlSnapChips`, `tlSnapChip` | `Max((Parent.Width - Gap * CountRows(TlSnapChips)) / (CountRows(TlSnapChips) + 1), 120)` is written four times across three controls, and `CountRows(TlSnapChips)` is evaluated seven times in the block. | One `TlSnapChipW` named formula. |
| Low | Timeline.pa.yaml:250, 913-952, 1211-1246 | `tlStateLine`, `tlSprintEmpty`, `tlSprintRows`, `tlQuarterEmpty`, `tlQuarterRows` | `CountRows(TlSnapPeople)` is recomputed in five separate properties, four of them `Visible` expressions re-evaluated on every dependency change. | A `TlSnapPeopleCount` named formula. |
| Low | Timeline.pa.yaml:1712-1751 | `tlAvailChips`, `tlAvailChip` | `TemplateSize: =200` and `Width: =194` are bare literals in a gallery whose every sibling sizes from `Parent.TemplateWidth`. | `Width: =Parent.TemplateWidth - 6`, `TemplateSize` off a named chip width. |
| Low | Timeline.pa.yaml:933-952, 1229-1246, 1485-1500 | `tlSprintRows`, `tlQuarterRows`, `tlSprintsRows` | Each carries both `FillPortions: =1` and an explicit `Height`. Inside an auto-layout parent `FillPortions` wins, so the `Height` arithmetic (which in `tlSprintRows` also omits `tlCard`'s `LayoutGap` of 8) is dead text that reads as the authority. | Drop the `Height` where `FillPortions` is set. |
| Low | Timeline.pa.yaml:2243-2260 | `tlPeekHit` | The peek's dismiss is a bare full-screen `Classic/Button` with no scrim container behind it, where the documented form pattern (`tmScrim` + `tmScrimHit`) is a `ManualLayout` container at `RGBA(0, 0, 0, 0.4)` holding the button. The peek dims nothing, so it reads as part of the grid. | Wrap it the way `tmScrim` is wrapped, or record in `decisions.md` that a peek is deliberately not modal. |

## Cross-screen

| Severity | File:line | Control | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| High | Command.pa.yaml:49-117, Team.pa.yaml:49-117, Timeline.pa.yaml:54-122 | `cmdHeader`, `tmHeader`, `tlHeader` | The 69-line app header (name, `cmpScope`, `cmpSearch`, quarter caption, every width and padding) is byte-identical across the three files apart from the control names — and all ten screens in `power/app/Screens` carry the same four parts. That is roughly 690 lines of one component copied ten times; the copies have already diverged in property order (Team lists `LayoutOverflowY` before `LayoutOverflowX`). | Add `cmpAppHeader` to `Components.pa.yaml` alongside `cmpRail`, with the screen name as its one input, and replace all ten copies. |
| Medium | Command.pa.yaml:159-237, Team.pa.yaml:159-282, Timeline.pa.yaml:164-249 | `cmdPageHead`, `tmPageHead`, `tlPageHead` | The page head (eyebrow + title in a `FillPortions: =1` text box, `PageHeadH` tall, `Gap` between) is a third copy of the same six controls, differing only in what sits to its right (a lede, two buttons, a tab list). | `cmpPageHead` taking eyebrow and title, with the right-hand slot left to the screen. |
| Low | App.pa.yaml:79 | `varNavOpen` | `Set(varNavOpen, true)` in `OnStart` has no reader anywhere in `power/app`. The rail's real state is `varNavCollapsed`/`varNavUserChoice`. | Delete the line and its comment. |
| Low | App.pa.yaml:94, Formulas.pa.yaml:2728 | `varTlGapNeed` | Read by `TlGapNeed` and shown in `tlAvailSub`'s copy ("the first week each person has N days or more free"), but no control anywhere writes it: the number is permanently 3 and the Gaps reading has no control to change it. | Add the stepper (`cmpStepper` exists) to `tlAvail`, or inline the 3 and drop the variable. |

## Rules and checks to add

Each is mechanically checkable from the YAML alone and could be a preflight check or a sweep.

1. **No hand-written cell geometry outside the compiler.** For every `Gallery@2.15.0` whose row
   container holds three or more sibling Labels at differing `X`, the gallery must appear in
   `tables.json` as a `gallery`/`row`, or by name under `pending`. Fails today on `cmdSquadList`,
   `tlQuarterRows`, `tlSprintsRows` and `tlAvailStripRowsGallery`.
2. **No second column model.** No named formula in `Formulas.pa.yaml` may match
   `^(Team|Tl|Cmd|Wk|Fn|Bn|Qc)\w*(Share|Min)\w*$` when the table it names is declared in
   `tables.json`. Fails today on 36 `Team*` and 11 `TlAvail*` names.
3. **A width that subtracts from `Parent.Width` is floored.** Any `Width`/`Height` formula of the
   form `Parent.Width - <expr>` must be wrapped in `Max(..., <min>)`. Fails on `squadMW`.
4. **No literal column count.** A gallery `Width` of the form `<pitch> * <integer>` must use
   `CountRows(<its Items source>)` or a `*Count` named formula. Fails on the two `13`s.
5. **No childless container.** A `GroupContainer@1.5.0` with no child controls is a fault unless it
   carries a `Fill` (a rule or a scrim). Fails on `tlSprintHeadMetaBox`, `tlQuarterHeadMetaBox`.
6. **No container used as a bar.** A `GroupContainer` with no children and `Height <= 8` must be a
   `Rectangle@2.3.0`. Fails on `squadBarTrack`, `squadBarFill`.
7. **No duplicate handler.** Two controls in one gallery template may not carry identical
   `OnSelect` text. Fails on `atHit`/`atOpen`.
8. **A focusable control does something.** A control with `TabIndex: =0` must carry an `OnSelect`.
   Fails on `benefitHoverCell`.
9. **Handlers stay under 30 lines.** Any `OnSelect`/`OnChange`/`OnVisible` block scalar longer than
   30 lines fails. Fails on `tmAbsSave` (46); `tmPersonSave` (32) is borderline.
10. **A `Visible` carries at most three conditions.** Count top-level `||`/`&&` in a `Visible`
    formula. Fails on `tmPersonError` (5) and `tmAbsError` (6), both fixable with
    `!IsBlank(Self.Text)`.
11. **`FillPortions` and `Height` are exclusive.** A control inside an `AutoLayout` parent with
    `FillPortions > 0` may not also declare `Height`. Fails on three Timeline galleries.
12. **No cross-screen copy of a shared block.** Hash the `cmdHeader` subtree's property text with
    control names stripped; more than one screen matching is a fault. Fails on all ten screens.
13. **A band's wrap threshold measures its own parent.** A `Height` formula containing
    `App.Width <` inside a container whose children size from `Parent.Width` is a fault. Fails on
    `cmdBand` and `tmBand`.
14. **Every `Set(var*)` in `OnStart` has a reader, and every reader has a writer.** Fails on
    `varNavOpen` (no reader) and `varTlGapNeed` (no writer outside `OnStart`).
