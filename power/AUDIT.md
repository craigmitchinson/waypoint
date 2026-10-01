# Waypoint Power Apps audit

## What the audit found

The app is in better shape than the defect reports suggest. There are no literal font sizes, no hex colours and no out-of-scale weights anywhere in the twelve app files; preflight check 22 is holding. Names are consistent, prefixes are nearly clean, and the formula layer is large but coherent. What Craig keeps seeing as "random fonts" and "broken layout" is not sloppiness at the property level. It is eight systematic causes, each repeated across screens because the same pattern was copied. Fix the eight and most of the visible defects go with them.

a. Role drift in typography, not literals. Components use role aliases and all eleven screens use raw ramp names with hand-carried weights, so the same role renders at different sizes. Worst on Work item, Financials, Settings and Command.

b. Table geometry. `tables.json` declares `"padding": "0"` for grids that sit inside cards padded by `Pad`, and the compiler adds a scrollbar reserve to `TemplateWidth`. The people grid on Team and all four Financials tables come out wider than their card, so columns oversize and the last one hides under the scrollbar.

c. `Wrap: true` with `AutoHeight: true` on fixed-height gallery cells, about 277 labels. AutoHeight overrides the declared height and breaks the row. Team, Benefits, Financials, Import and Settings.

d. Band wrap thresholds test `App.Width` instead of `Parent.Width` on six screens, so bands wrap earlier than the height formula expects and row two is clipped under `LayoutOverflowY: Hide`.

e. Container height budgets that omit a gap, a padding or a reachable visible state, with overflow `Hide` clipping the bottom control. Work, Work item, Import and Timeline.

f. Dead code ships. About 2000 lines of unreachable panels (Benefits 863, Quarter close 707, Settings 300), 53 dead named formulas including ten debug probes, and about 100 hand-written column formulas the compiler overwrites.

g. Write paths with no error handling, or with `IfError` wrapping the whole chain so a refused Patch still reports success and closes the panel. Identity is taken by `Title` rather than id.

h. Duplication where a component or gallery should exist: header row 11 copies, section title 36, card shell 45, empty state 16, list editor 7, legend 21, footer 12.

## The standard

This is the majority pattern already in the app, written down as rules. Nothing here is new taste.

**Typography, by control name class.** A label named `<prefix>Title` is the page h1: TypeTitle, Semibold. Any other name ending Title outside a gallery template is TypeSubtitle. A name ending Label or containing Lbl is TypeCaption, Semibold. A name containing Head in a header row is TypeCaption, Semibold, NeutralFg2. Gallery cells are TypeBody. Every label declares an explicit Color; 23 do not today. Size is one of TypeTitle, TypeSubtitle, TypeBody, TypeCaption or a Type\*Size alias. Every ModernButton is TypeBody unless its name says Small. One font vocabulary, not two: TypeFace everywhere or FontUI everywhere. One decision is needed here.

**Heights and spacing.** Label height is never below the line height of its size, using the line table 10 to 24, 12 to 26, 14 to 30, 18 to 38, 24 to 50. No bare numbers in Height, LayoutGap, Padding or LayoutMinWidth: add GapTight, GapHair and StatMinW beside Gap and Pad. One app-wide locale on every Text format string, and shared Fmt\* named formulas for FTE, money, integers and dates so the same measure is never shown at two precisions.

**Layout.** Wrap and right-edge thresholds compare Parent.Width, never App.Width. Any width or height that subtracts an offset from Parent carries a Max guard. A table's padding in `tables.json` equals its host card's horizontal padding. No Wrap true with AutoHeight true inside a gallery template or a fixed-height row. A container height budget includes every gap, every padding and the worst reachable visible state. A child sets Width or FillPortions, never both.

**Formulas.** Today() appears once, in AsOf. No named formula names a Dataverse table unless it is a Patch or Remove target. Every variable read in a formula is initialised in OnStart, and every OnStart variable has a reader. A formula with zero readers fails. A Switch on one variable appears once.

**Write paths.** Patch first, then branch on IsError. One error variable per screen, named `var<Prefix>SaveError`, cleared in OnVisible and shown in one inline label. Identity is by id, never by Title or full name. Notify only in the success arm, and only for success. A destructive action disarms itself before its first write.

**Components.** One cmpHeader, cmpPageHead, cmpEmpty, cmpCard shell, cmpListEditor and cmpPill. Legends and footers are galleries over a table, not copied controls.

**Tooling.** No scratch files in the repo. Every pac call in a try/catch. Every msapp JSON edit by parse and stringify, never regex. The import lock created with the `wx` flag. Preflight refuses to run against an empty build.

## Findings by severity

| Section | High | Med | Low | Worst item |
| --- | --- | --- | --- | --- |
| 01a typography | 0 | 0 | 0 | Two font vocabularies drive role drift across eleven screens |
| 01b heights | 1 | 5 | 5 | FrontDoor 1689 and 1941: TypeSubtitle in a TypeBodyLine height |
| 02a dead formulas | 0 | 0 | 0 | 53 dead named formulas ship, including ten debug probes |
| 02b formulas | 3 | 8 | 4 | OnStart loads 26 tables unfiltered; rows truncate silently |
| 03a Command | 3 | 8 | 8 | squadMW goes negative below about 1436px, bar clips |
| 03b Team | 2 | 7 | 9 | People table padding "0" under a padded card, 32px wide |
| 03c Timeline | 5 | 7 | 7 | Sprint grid repeat fixed at 10 days, last day chopped |
| 04a Work | 4 | 7 | 4 | Filter row minimums 1180px inside an 828px body |
| 04b Work item | 8 | 8 | 5 | Two live person mechanisms, blind to each other |
| 05a Benefits | 4 | 4 | 6 | 863 lines gated on a constant tab, unreachable |
| 05b Financials | 4 | 7 | 6 | All four tables padding "0", permanent horizontal scroll |
| 05c Import, components | 4 | 6 | 7 | Step strip 982px fixed in a hidden-overflow row |
| 06a Settings | 4 | 7 | 8 | Three saves with no IfError, success notified regardless |
| 06b Quarter close | 4 | 6 | 6 | Close writes with no IfError and can leave no current quarter |
| 07 front door | 5 | 6 | 4 | Screening queue visible to everyone on Visible true |
| 08 scripts | 3 | 3 | 2 | refresh-skeleton writes an empty datasource list and exits 0 |
| 09 checks | 0 | 1 | 3 | An empty build passes every check as zero of zero |
| 10 import, fxcheck | 4 | 12 | 7 | Unguarded pac import throws on documented noise and skips the poll |

The ten highest-value individual fixes:

1. `canvas/tables.json`, four Financials entries and team-people: padding "Pad \* 2".
2. `scripts/compile-tables.mjs` around the width math: drop the scrollbar reserve when the base is TemplateWidth.
3. `canvas/tables.json` timeline-sprint-grid: repeat follows TlSprintDayCount.
4. `Screens/QuarterClose.pa.yaml:895`: put both quarter-flag Patches under one If.
5. `Screens/QuarterClose.pa.yaml:857`: wrap the close in IfError and disarm first.
6. `Screens/Settings.pa.yaml:806`, 1921, 2272: wrap the three saves in IfError.
7. `Screens/Work.pa.yaml:1558`: IfError around the Patch only, not the chain.
8. `Screens.flagged/FrontDoor.pa.yaml:1917`: replace Visible true with a role formula.
9. `Screens.flagged/FrontDoor.pa.yaml:3677` and 3720: use the Patch return value.
10. `Formulas.pa.yaml:2006`: BenefitsCalRowH 40 to 54, the clipped calendar caption.

## Checks to add

Preflight has 26 checks. These continue the numbering. An asterisk marks the five that catch the most existing findings.

Typography. 27. Size, weight and colour match the control's name class. 28. Every Label declares a Color. 29. Every ModernButton is TypeBody unless named Small. 30. One font vocabulary across all files.

Heights and spacing. 31\*. No Wrap true with AutoHeight true on a Label inside a gallery template or beside a single Type\*Line height. 32. Label height is never below its size's line height. 33. A gallery TemplateSize covers the sum of its stacked cells' Y plus Height, and is never a bare number. 34. No bare numeric LayoutGap, Padding, LayoutMinWidth, or authored X, Y, Width, Height over 8. 35. Every Text format carries the one app-wide locale, and integers use #,##0.

Layout. 36\*. No App.Width comparison in a screen file; thresholds use Parent.Width. 37\*. Every tables.json padding equals its host card's horizontal padding. 38. Any Parent-relative subtraction carries a Max guard. 39. Children's minimum widths plus gaps fit the body at 900px, or the container scrolls. 40. A container with LayoutWrap true carries no constant height, and a hand-summed \*Top or card height is regenerated from its child list. 41. No child sets both Width and FillPortions. 42. Every gallery appears in tables.json or its pending list. 43. A tables.json repeat is constant only when its \*Count formula is. 44. Cards carry all five card properties. 45. Every gallery has an empty state on the same count.

Formulas. 46\*. A named formula with zero readers fails. 47. No identical formula bodies, and no expression over 30 characters repeated three times. 48. Today() only in AsOf. 49. No Dataverse table named outside a Patch or Remove target. 50. Every formula variable is initialised in OnStart and every OnStart variable is read. 51. Nesting depth at most 4 and length at most 60 lines. 52. One Switch per variable. 53. No Visible comparing a constant string formula to a literal.

Write paths. 54\*. Every Patch, Remove or Collect sits inside an IfError whose first argument is the write alone, not a chain containing Notify, Navigate or a panel close. 55. Notify Success only in the success arm. 56. One error variable per screen, reset in OnVisible with every behaviour variable. 57. No LookUp on a text column to identify a write target, and no re-finding a record just written. 58. A write path disarms before its first write. 59. Every Switch producing a choice member defaults to Blank(). 60. Every Patch into a table with a Team lookup sets Team.

Components. 61. No hand-copied header or page head once cmpHeader and cmpPageHead exist. 62. No raw Badge with a ThemeColor Switch. 63. No declared output property without a reader, and no input used as its own sentinel.

Tooling. 64. No files matching `_*`, `tmp` or `rev` in scripts/, and no `.import-poll` or temp msapp left behind. 65. Every pac call in a try/catch that logs to stderr. 66. Every msapp JSON edit by parse and stringify. 67. Line endings preserved by every sweep writer. 68. Preflight refuses a build with fewer files than the expected screen set. 69. fxcheck binds the Patch change record and reports unknown enum members.

## Plan

Ordered by defects removed per unit. Each unit is one screen or one concern.

**Phase 0, hygiene. About six units, no Studio round.** Delete the twelve scratch files in scripts/ (check 64). Delete the Benefits roll-up, actuals and types blocks, the Quarter close Compare and Calibration panels, and the Settings Add and Edit stubs. Delete the 53 dead named formulas and the roughly 100 hand-written column formulas the compiler overwrites. Acceptance: build packs, preflight passes, line count drops by about 2000 with no visible change. Kept fixed by checks 46 and a dead-tab check that every `Tab = "X"` value exists in its tab list's Items.

**Phase 1, geometry root causes. About eight units, two Studio rounds.** Set tables.json padding to `Pad * 2` on the five offending entries and re-run compile-tables. Drop the scrollbar reserve when the base is TemplateWidth. Sweep Wrap and AutoHeight off all 277 gallery labels. Replace every App.Width threshold with one shared BandWraps formula on Parent.Width across the six screens. Add Max guards to every Parent-relative subtraction. Re-budget the clipping containers: Work filters and lifecycle, Work item Assess and Shape, Import steps and flow, Timeline legend and peek top. Make the sprint grid repeat follow the day count. Acceptance: at 1024, 1366 and 1920 no card overflows and no row two is clipped. Checks 31, 36, 37, 38, 39, 40, 43.

**Phase 2, typography. About four units, one Studio round.** Sweep sizes and weights onto the name classes. Fix the two FrontDoor height mismatches. Add Fmt\* named formulas and one locale. Add GapTight, GapHair and StatMinW and retire the bare gaps. Checks 27 to 35.

**Phase 3, write paths. Five opus units, one per screen, two Studio rounds.** Settings saves, Quarter close, Work item, Work, Team. Each gets the Patch-first IfError shape, one error variable, identity by id, and OnStart initialisation of its variables. Acceptance: a refused Patch shows an inline message and leaves the panel open. Checks 54 to 58.

**Phase 4, components. About seven units, one Studio round.** cmpHeader, cmpPageHead, cmpEmpty, cmpListEditor, legend and footer galleries, the cmpStepper CurrentIndex fix, badges through cmpPill. Acceptance: control count falls, every screen header is one instance. Checks 61 to 63.

**Phase 5, performance. About five units, one Studio round.** AsOf; ItemMePerson and ItemSendPerson off colPeople; filtered and lazy OnStart loads; a precomputed availability table under SprintsMatrixRows; fix the theme load race. Acceptance: Sprints tab renders without the visible stall. Checks 48, 49, 51.

**Phase 6, tooling. About six units, no Studio round.** import-app guards and the `wx` lock, patch-msapp by JSON parse, the shared zip and line-ending helpers, the empty-build guard, fxcheck Patch binding and allow sets. Checks 64 to 69.

## Decisions needed from Craig

Eight, and Phase 0 cannot finish without four of them.

1. Font vocabulary: the role aliases the components use (TypeFace, TypeBodySize, Type\*Weight), or the raw ramp names the eleven screens use. One or the other, everywhere.
2. Locale: en-GB or en-US. Today 118 format strings say en-US, two say en-GB and 14 say nothing.
3. The modern button trial on Command's row hit targets: conclude it, or go back to Classic/Button so rows are keyboard reachable.
4. Timeline grids: the PCF grid control, or nested galleries. Both are built and only one is live.
5. The scope feature, parked behind IncludeScope false: keep the chain and the ten cmpScope instances, or delete them.
6. Benefits roll-up, actuals and types, and Quarter close Compare and Calibration: delete or restore. Restoring means new tab entries as well as the panels.
7. The Settings 'Low confidence at' and 'Medium confidence at' columns have no reader and no editor. Surface them or drop them from the model.
8. RUNBOOK is stale in four places: the benefits chart sentence, the 925 named-formula count, the three accessibility classes, and the 50, 76 and 128 height numbers. Correct them or stop quoting numbers.
