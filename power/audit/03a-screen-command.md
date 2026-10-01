# Audit 03a: Command screen

The screen is in better shape than its siblings: no Visible false constants, no empty containers, no duplicate-suffix names, no Notify, no write path, no OnSelect over 18 lines, no Visible or DisplayMode with more than one condition, and every literal X or Width sits either in a tables.json-declared head or cell (compiler-owned) or in a decorative 6px bar or 8px dot. All card height sums (commit, attention, sprint, squads, benefits plot) are arithmetically exact including LayoutGap and padding. The faults are concentrated in three places: responsive thresholds computed off App.Width and fixed pixel chains with no floor, a utilisation colour taken from two different threshold sources in one row, and a set of hand-built repeats (three near-identical cards, four near-identical pill buttons, one re-inlined tone ladder). The benefits chart is one Image holding MonthBarsImage (an SVG data URI) with a 12-cell transparent horizontal gallery over it for per-month tooltips and a hand-drawn cumulative dot; its sr-only substitute is the Image's AccessibleLabel, a Concat of month name and Gbp only.

| Severity | Line | Control | Issue | Fix |
|---|---|---|---|---|
| High | 246 | cmdBand | Wrap threshold App.Width < 5*(180+Gap)+BandKickerW (1130) ignores rail 220 and two paddings; band actually wraps below App.Width 1414, so 1130-1414 wraps with single BandH under LayoutOverflowY Hide; row two clipped | Compare Parent.Width |
| High | 1206 | squadMW | Parent.Width - CmdSquadMWX (412 fixed chain) with no Max; CmdRightMinW is 360, so width is negative below about App.Width 1436 and the bar and pct clip | Max(Parent.Width - CmdSquadMWX, 80) and raise the min |
| High | 1174 vs 1190 | squadBarFill, squadPct | Same metric, two threshold sources in one row: bar uses UtilisationWarn/Bad (admin-set from Waypoint), pct uses NumberTones hardcoded 0.85/1.0 | Make NumberTones utilisation read the Waypoint columns |
| Medium | 331-338 | cmdStatUtilisation | Re-inlines UtilisationTone (Formulas 3981), which exists for this control and is otherwise unused | Color UtilisationTone |
| Medium | 1376, 1424 | cmdBenefitsCard | Plot height = 462 - 36*CountRows(SquadRows) at 1080; zero at 10 squads, negative above, no LayoutMinHeight | Floor the plot, scroll the squad list |
| Medium | 375, 1037 | cmdToday, cmdRight | Height Parent.Height when IsStacked leaves a full-height gap under short content | Drop Height when stacked |
| Medium | 382, 1044 | cmdToday, cmdRight | Width and FillPortions both set; CmdLeftW used as portion and as percent | Keep FillPortions only |
| Medium | 653 | ccHit | ModernButton hit target takes no TabIndex or focus ring (sweep-a11y:242 skips it by design); rows are not keyboard-reachable as rows, unlike atHit, spHit, squadRowHit | Conclude the trial, use Classic/Button |
| Medium | 850, 876 | atHit, atOpen | Identical 8-line branching OnSelect duplicated | One named action or row-level only |
| Medium | 1095 | cmdSquadList | Table hand-sized by CmdSquad* formulas, not declared in tables.json nor listed under pending | Declare it |
| Medium | 1436 | cmdBenefitBars | Alt text gives month and Gbp only; cumulative and target, both drawn, are announced nowhere | Extend the Concat |
| Low | 84 | cmdHeaderScope | Visible IncludeScope, constant false; dead on all 10 screens | Decide or delete |
| Low | 392, 719, 886 | three Today cards | Card wrapper (11 props), title label and gallery repeated three times; only commit has a head row | One card component |
| Low | 673, 695, 858, 996 | ccCommit, ccDefer, atOpen, spConclude | Four hand-built 14-property row buttons; ccPriority and atPill hand-built Badges duplicating cmpPill | Components |
| Low | 1111-1234, 1338, 1463 | squad*, sprintStat*, benefitHover* | No cmd prefix, unlike every container on the screen | Rename |
| Low | 1480 | benefitHoverDot | 12 decorative images announce "Image" | AccessibleLabel "" |
| Low | 1328, 1455 | cmdSprintStats, cmdBenefitHover | Divides by literal 4; reads sibling cmdBenefitBars.Width | CountRows(...), Parent.Width |
| Low | 68, 101 | cmdHeaderName, cmdHeaderQuarter | Thirds plus 0.14+0.24 minimums exceed the header below about 1100; shell-wide (10 screens) | One shell fix |
| Low | 854 | atHit | varTeamSquad is Set here and read by Team but absent from App.OnStart, against RUNBOOK section 4 | Initialise blank |

## Rules and checks to add

1. Fail any LayoutWrap true container whose height formula tests App.Width rather than Parent.Width.
2. Fail any Width or Height that subtracts a named or literal offset from Parent.Width or Parent.Height without a Max(..., n).
3. Fail any screen formula containing LookUp(NumberTones, that does not mention ThisItem, when a matching *Tone named formula exists.
4. Fail any named formula with no reference outside its own definition.
5. Fail any metric coloured from both NumberTones and a Waypoint threshold within one screen.
6. Fail any gallery whose cells carry literal X or Width and whose name appears in neither tables.json columns nor pending.
7. Fail any auto-layout child that sets both Width and a non-zero FillPortions.
8. Fail any control name inside a screen that does not start with the screen's declared prefix.
9. Fail any AccessibleLabel equal to "Image" or "Button" (sweep placeholders left unfinished).
10. Fail any Set(var...) in a screen whose variable is read by a named formula but never Set in App.OnStart.
