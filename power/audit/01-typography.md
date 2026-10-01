# Audit 01: typography and the visual standard

Read-only. Scope: `power/app/App.pa.yaml`, `power/app/Components.pa.yaml`,
`power/app/Screens/*.pa.yaml` (10 files), `power/app/Screens.flagged/FrontDoor.pa.yaml`.
1491 controls, 807 `Label@2.5.1`, 238 non-Label text-bearing controls. Ground truth:
`power/RUNBOOK.md` section 4 (Layout calibration, Typography, Number tones),
`power/canvas/CONTROLS.md`, `scripts/preflight.mjs` check 22.

`node scripts/preflight.mjs` passes 26 checks, including `typography` (807 Labels, every Size on
the scale). The inconsistency Craig is seeing is therefore all in what check 22 does not look at.

## Standard observed

The majority pattern per role, taken from the counts. This is the proposed standard.

| Role | Control | Size | Weight | Height | Colour | Count |
| --- | --- | --- | --- | --- | --- | --- |
| Page eyebrow | Label | `TypeCaption` | Semibold | `TypeKickerLine` | `NeutralFg2` | 11 of 11 screens |
| Page title | Label | `TypeTitle` | Semibold | `TypeDisplayLine` | `NeutralFg1` | 16 of 16 |
| Panel title | Label | `TypeTitle` | Semibold | `TypeDisplayLine` | `NeutralFg1` | 5 of 5 |
| App header title | Label | `TypeSubtitle` | Semibold | `AppHeaderH` | `BrandFg` | 11 of 11 |
| App header sub | Label | `TypeCaption` | — | `AppHeaderH` | `ColorFade(BrandFg, -0.2)` | 11 of 11 |
| Band kicker | Label | `TypeCaption` | Semibold | `TypeKickerLine * 2` | `ColorFade(BrandFg, -0.2)` | 5 of 5 |
| Card / section title | Label | `TypeSubtitle` | Semibold | `TypeHeadingLine` | `NeutralFg1` | 24, + 12 on `GroupHeadH` (same 30px) |
| Field label | Label | `TypeCaption` | — | `TypeLabelLine` | `NeutralFg2` | 40 |
| Table header cell | Label | `TypeCaption` | Semibold | `TypeLabelLine` | `NeutralFg2` | 156 (compiler-owned type) |
| Row name / number cell | Label | `TypeBody` | Semibold | `RowHeight` | `NeutralFg1` | 115 (compiler-owned type) |
| Body line | Label | `TypeBody` | — | `TypeBodyLine` | `NeutralFg1` | 79 |
| Stat | `cmpStat` | label `TypeLabelSize` / value `TypeNumberSize` | `TypeLabelWeight` / `TypeNumberWeight` | `TypeLabelLine` / `TypeNumberLine` | `NeutralFg2` / `NeutralFg1` | 24 instances, 5 screens |
| Badge | `Badge@0.0.24` | `FontSize: =TypeCaption` | Semibold | `TypeLabelLine` | `ThemeColor` only | 17 of 18 |
| Form control | Modern input / dropdown | `Size: =TypeBody` | — | `ControlHeight` | `NeutralFg1` | input 74 of 74, dropdown 30 of 51 |
| Button | `ModernButton` | `TypeBody` (64) or `TypeCaption` (14) | — | — | `BrandFg` / `NeutralFg1` | 81 of 82 |
| Tab strip | `ModernTabList` | `TypeBody` | — | `ControlHeight + 8` | `NeutralFg1` | 5 of 7 |
| Font | all | `Font: =FontUI` | | | | 1038 of 1047 |

Heights are disciplined: every one of the 807 Labels takes its `Height` from a named formula, not a
number, and 277 of the 306 wrapping Labels carry `AutoHeight: =true` with a multi-line height. The
line table (10→24, 12→26, 14→30, 18→38, 24→50) is honoured everywhere except the two rows below.

Hand-built stat blocks (item 4): only one family, `fnFig*` in `Financials.pa.yaml:359-630` — six
label/value rows at `TypeBody` in `RowHeight`. They read as table rows, not as stats, so they are a
different role rather than a broken `cmpStat`; no other screen hand-builds a stat.

Badges and pills (item 5): 18 `Badge@0.0.24`, all `Appearance: ='BadgeCanvas.Appearance'.Filled`,
all tone by `ThemeColor` alone, none writing the denied `Color`/`Size`/`BasePaletteColor`/
`FontColor`. Two variants only: `Font` (`FontUI` x17, `TypeFace` x1) and `Height`
(`TypeLabelLine` x15, `TypeLabelLine + 8`, `ControlHeight`, `Parent.Height`).

## Findings

| Severity | File:line | Control | Property | Value | Expected |
| --- | --- | --- | --- | --- | --- |
| High | `Screens/WorkItem.pa.yaml:488, 767, 797, 901, 1299, 1590, 2111, 2139, 2167, 2225, 2253, 2292, 2320, 2350, 2380, 2467, 2640, 2655, 3347, 3557, 3609` | `ModernDropdown@1.0.2` (21) | `Size` | not written | `=TypeBody`. Every one of the other 30 dropdowns in the app writes it; these 21 render at the platform default beside `ModernTextInput`s pinned to `TypeBody` on the same form. This is the largest single source of "random fonts being bigger than others", and it is all on one screen. |
| High | `Screens/WorkItem.pa.yaml:4347` | `ModernCombobox@1.1.1` `wiLinkCombo` | `Size` | not written | `=TypeBody` (the other 5 comboboxes write it) |
| High | `Screens/WorkItem.pa.yaml:1036` `wiHypTitle`, `:1507` `wiSendTitle` | `Label@2.5.1` | `Size` / `Height` | `=TypeBody` / `=TypeBodyLine` | `=TypeSubtitle` / `=TypeHeadingLine`. Their sibling section title in the same card, `wiShapeTitle:683`, is `TypeSubtitle` — two section-heading sizes stacked in one card. |
| High | `Screens.flagged/FrontDoor.pa.yaml:1686` `fdMyTitle`, `:1938` `fdScreenTitle` | `Label@2.5.1` | `Height` | `=TypeBodyLine` (26) | `=TypeHeadingLine` (30). `Size` is `TypeSubtitle`, whose line is 30, so the box is 4px short of its own text and clips descenders. The only two line-table violations in 807 Labels. |
| High | `Components.pa.yaml:102` | `Label@2.5.1` `statValue` | `Color` | `ColorValue("#FFCCD9")` | A theme name. It is not a `@ccs/ui` token, it does not switch on `IsDark`, and it is the only literal colour in any screen or component. Check 22 misses it because its `/Tone/` escape hatch matches the `cmpStat.Tone` earlier in the same formula. |
| High | `scripts/preflight.mjs:749` | check 22 | scope | `Label@2.5.1` only | 238 text-bearing controls (82 `ModernButton`, 74 `ModernTextInput`, 51 `ModernDropdown`, 18 `Badge`, 7 `ModernTabList`, 6 `ModernCombobox`) carry `Size`/`FontSize`/`FontWeight`/`Font`/`Color` and nothing checks any of them. This gap is why the four findings above survive a passing preflight. |
| Medium | `RUNBOOK.md:319-322` | doc | band sizes | "`PageHeadH` (76) … `AppHeaderH` (50), `BandH` (128), `GroupHeadH` (34) and `ControlHeight` (34)" | 70, 46, 118, 30, 30 as `App.pa.yaml` now computes them. The same bullet says "body text is 28 a line"; `TypeBodyLine` is 26. Workers size cards off these numbers, so every band budget taken from the RUNBOOK is 4-10px out. |
| Medium | `Screens/WorkItem.pa.yaml:592` | `ModernTabList@1.0.1` `wiTabs` | `Height` / `FontWeight` | `=40` / `=FontWeight.Semibold` | `=ControlHeight + 8` (38) and no `FontWeight`. The only literal height on a text control in the app, and the only tab strip with a weight. |
| Medium | `Screens/Work.pa.yaml:448` | `ModernTabList@1.0.1` `wkKinds` | `Height` | `=ControlHeight` (30) | `=ControlHeight + 8` (38), as the other five. Three tab-strip heights (30 / 38 / 40) across seven instances. |
| Medium | `App.pa.yaml` (`RowHeight = 36`), `Formulas.pa.yaml:2006` (`BenefitsCalRowH = 40`), `Formulas.pa.yaml:3532` (`TlRowH = 32`) | named formula | value | bare numbers | Derived from the line table, as `WorkRowH`, `TeamPeopleRowH`, `ItemWalkRowH` and `SetFieldLabelH` are. `RowHeight`'s own comment justifies 36 with "body text is 28 a line", which the scale has not said since `TypeBodyLine` became 26; a body row now carries 10px of slack while a `GroupHeadH` row carries 4. |
| Medium | 83 sites: `Settings` 28, `WorkItem` 26, `Timeline` 7, `Command` 5, `Financials` 5, `QuarterClose` 4, `Import` 3, `Components` 2, `Benefits`/`Team`/`Work` 1 each | auto-layout `GroupContainer` | `LayoutGap` | `=8` (48), `=4` (35) | `=Gap` (used 76 times) or a named formula. `Gap` is `If(IsCompact, 8, 16)`; a literal gap does not halve below 900px, so compact layouts keep wide gutters in some cards and not others. |
| Medium | `Command.pa.yaml`, `Timeline.pa.yaml` (`Text(x, "0")` x4, `Text(x, "[$-en-US]0")`, `Text(x, "0.0")`) | `Label` | `Text` | unseparated formats | `"[$-en-US]#,##0"` (92 uses) and `"[$-en-US]#,##0.0"` (88 uses). Five numbers in the app lose their thousands separator against 180 that keep it. |
| Medium | `Command.pa.yaml` (`"[$-en-GB]d mmm"` x2), `Team.pa.yaml`/`WorkItem.pa.yaml` (`"d mmm"` x6, `"ddd d mmm"` x2, `"mmm yyyy"`) | `Label` | `Text` | three date conventions | One locale tag. 5 dates are pinned `[$-en-US]`, 2 `[$-en-GB]`, 9 carry no tag and follow the viewer's locale. The app's copy is UK English. |
| Low | `Components.pa.yaml:70, 76, 96, 155, 173, 242` | `Label`, `Badge` | `Size`/`FontSize`/`Font`/`FontWeight` | `TypeLabelSize`, `TypeBodySize`, `TypeFace`, `TypeLabelWeight` | The screens use the base names (`TypeCaption` x476, `TypeBody` x257, `FontUI` x220, `FontWeight.Semibold`). Same values, but `Components.pa.yaml` is the only file on the alias spelling, so a grep for the standard misses it. |
| Low | `Screens/Timeline.pa.yaml:2279` | `Label` `tlPeekTitle` | `FontWeight` | `=TypeHeadingWeight` | `=FontWeight.Semibold`, as the other 24 section titles. |
| Low | `Benefits.pa.yaml:242-243`, `Command.pa.yaml:258-259`, `Financials.pa.yaml:262-263`, `QuarterClose.pa.yaml:236-237`, `Team.pa.yaml:303-304` | band kicker container | `PaddingTop`/`PaddingBottom` | `=10` | A named formula. These 10 sites plus `Components.pa.yaml:299-302` (`=8`) are the only non-zero literal paddings in the app; the other 806 controls carry the four paddings at 0. |
| Low | `Screens/Financials.pa.yaml:367-620` | `fnFig*` Labels (12) | `Size` | `=TypeBody` | A definition-list role the standard does not name. They are the app's only hand-built figure blocks; every other headline number is `cmpStat` at `TypeNumberSize`. Decide whether this is a second stat variant or a table, and name it. |
| Low | `Screens/Benefits.pa.yaml:1065` and 17 more | `Badge@0.0.24` | `Height` | `TypeLabelLine` x15, `TypeLabelLine + 8`, `ControlHeight`, `Parent.Height` | One badge height. Three one-off heights against fifteen on the standard. |

## Rules and checks to add

Each is mechanically checkable from `build/Src` by `scripts/preflight.mjs`.

1. Extend check 22 to `ModernButton@1.0.0`, `ModernTextInput@1.1.1`, `ModernDropdown@1.0.2`, `ModernCombobox@1.1.1` and `ModernTabList@1.0.1`: `Size` must be written and must be a `Type*` name off the scale.
2. Require every `Badge@0.0.24` to write `FontSize` as a `Type*` name, since `Size` is denied on that control and an unwritten `FontSize` silently takes the platform default.
3. Fail when a `Label`'s `Height` token resolves shorter than the line its `Size` token requires, using the line table 10→24, 12→26, 14→30, 18→38, 24→50.
4. Fail on `ColorValue(` or `RGBA(` in any `Color`, `FontColor` or `Fill` formula outside `App.pa.yaml`, exempting only fully transparent `RGBA(0, 0, 0, 0)`, and drop check 22's `/Tone/` escape hatch so a formula that merely mentions a tone is no longer exempt.
5. Fail on a `LayoutGap` or `Padding*` written as a non-zero literal; require `Gap`, `Pad` or a named formula.
6. Fail on a named `*RowH`/`*Height` formula in `App.pa.yaml` or `Formulas*.yaml` whose right-hand side is a bare number rather than an expression over the `Type*Line` names.
7. Fail on a numeric `Text()` format string that is not `"[$-en-US]#,##0"`, `"[$-en-US]#,##0.0"` or `"[$-en-US]#,##0.00"`, and on any date format string with no `[$-en-GB]` locale tag.
8. Fail on a `ModernTabList` whose `Height` is not `=ControlHeight + 8`, or that writes a `FontWeight` at all.
9. Fail on a `Label` whose `Text` is a string literal and whose parent container is the first child of a card, unless it is `Size: =TypeSubtitle`, `FontWeight: =FontWeight.Semibold`, `Height: =TypeHeadingLine`.
10. Fail on the alias spellings `TypeFace`, `TypeBodySize`, `TypeLabelSize`, `TypeHeadingWeight`, `TypeLabelWeight` anywhere in `power/app`, so one spelling per value survives a grep.
11. Recompute the band numbers in `RUNBOOK.md` section 4 from `App.pa.yaml` and fail when a parenthesised number in the doc disagrees with the formula it names.
