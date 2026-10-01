# Audit 01b: typography census, heights, spacing and number formats

Method: all 12 files parsed mechanically (every Control block plus top-level properties, 1491 controls, 807 Label@2.5.1). Reference line table: Size 10 to 24, 12 to 26, 14 to 30, 18 to 38, 24 to 50. Tokens confirmed from App.pa.yaml; RUNBOOK section 4's 50/76/128 numbers are stale.

Label Height (807 labels, 24 distinct values, zero bare pixel literals): TypeLabelLine 352, RowHeight 166, TypeBodyLine 88, TypeBodyLine*2 37, TypeHeadingLine 26, AppHeaderH 22, SetFieldLabelH 18, TypeDisplayLine 16, GroupHeadH 12, TypeKickerLine 11, TeamPeopleRowH 9, TypeLabelLine*2 8, ControlHeight 7, WorkRowH 7, TypeKickerLine*2 5, ItemWalkRowH 5, BenefitsCalRowH 3, TypeBodyLine*3 3, TypeLabelLine+8 3, TlRowH 3, TypeNumberLine 2, a Switch 2, FrontDoorPromptH 1, Parent.TemplateHeight 1.
Wrap and AutoHeight: 501 Wrap false with no AutoHeight; 277 Wrap true with AutoHeight true; 29 Wrap true with no AutoHeight.

Spacing and radius (3800 properties): 0 x3308, CtrlR 324, Pad 224, CardR 188, Gap 76, then literals: 1 x58 (BorderThickness), 8 x52 (LayoutGap), 4 x35 (LayoutGap), 180 x24 (LayoutMinWidth), 10 x10 (PaddingTop/Bottom), 480 x5, 96, 140.

Bare X/Y/Width/Height over 8: 111 total. 34 (all Command) are tables.json cells, compiler-managed, excluded. 77 authored: WorkItem 32, Timeline 11, Components 9, Settings 7, Import 6, Work 5, Team 3, Benefits 2, QuarterClose 2, Financials 0, FrontDoor 0. Ten largest authored: 1080 Components:282 (cmpRail Height), 520 Components:208 (cmpStepper Width), 280 Components:430 (cmpSearch Width), 220 WorkItem:1611, 200 Import:428, 200 WorkItem:491, 194 Timeline:1730, 190 Import:223/243/263/283/303 (five stepper chips).

Text() formats: [$-en-US]#,##0.0 88, #,##0 86, #,##0.00 20, d mmm 6, [$-en-US]dd mmm yyyy 5, 0 4, ddd d mmm 2, yyyy-mm-dd hh:mm 2, [$-en-US]0000 2, [$-en-GB]d mmm 2, mmm yyyy 1, 0.0 1, yyyy-mm-dd 1, [$-en-US]0 1.

Flagged, by severity
1. High: Screens.flagged/FrontDoor.pa.yaml:1689 and :1941, Size TypeSubtitle (14pt, needs a 30px line) with Height TypeBodyLine (26). Clips 4px; the only two size and height mismatches in the app. Fix: Height TypeHeadingLine.
2. Medium: the same FTE measure rendered at two precisions: Team.pa.yaml:354 NetTotal at #,##0.0 but :1021 and :1434 Net, :1081 Free and :1459 Committed at #,##0.00; also QuarterClose.pa.yaml:1246 Fte and Benefits.pa.yaml:1028 FteInYear at 2dp against 88 app-wide 1dp uses. Fix: one FmtFte named formula.
3. Medium: 14 format strings carry no locale tag while 118 do: Command.pa.yaml:1292-1293 (also the only [$-en-GB] pair), :1333 (0.0), :1334-1335 (0), Team.pa.yaml:2691, 2821-2822, 2832-2833, Timeline.pa.yaml:1365-1366, WorkItem.pa.yaml:2747-2748, 3734. Untagged formats render in the viewer's language. Fix: one app-wide locale, everywhere.
4. Medium: Timeline.pa.yaml:1365-1366 and Command.pa.yaml:1334-1335 use "0", no thousands separator, against 86 #,##0 uses.
5. Medium: untokenised gap scale: LayoutGap 8 x52 and 4 x35 (Settings 18, WorkItem 15). Neither halves at IsCompact the way Gap does. Fix: add GapTight and GapHair tokens beside Gap in App.pa.yaml:188.
6. Medium: LayoutMinWidth 180 x24 (every band stat across Benefits, Command, Financials, QuarterClose, Team, Work, Timeline) duplicates the 180 hard-coded inside the band wrap-threshold named formulas. Two copies of one number. Fix: StatMinW = 180 token used in both.
7. Low: band PaddingTop and PaddingBottom 10 at Benefits:242-243, Command:258-259, Financials:262-263, QuarterClose:236-237, Team:303-304. 10 is on no scale.
8. Low: LayoutMinWidth 480 x5 (WorkItem 659, 1704, 2801, 3154, 3789) and 96, 140 (WorkItem 234, 292): panel minimums as bare pixels.
9. Low: component design-time sizes as literals: Components.pa.yaml:282 cmpRail Height 1080, :208 cmpStepper Width 520, :430 cmpSearch Width 280.
10. Low: TlRowH = 32 (Formulas.pa.yaml:3532) and BenefitsCalRowH = 40 (:2006) are raw pixels, the only two row heights not built from Type*Line; RowHeight = 36 (App.pa.yaml:200) likewise.
11. Low (pattern): 277 labels carry AutoHeight true with an explicit Height. CONTROLS.md:31 sanctions it for wrapped labels inside overflow-hiding containers, but AutoHeight overrides the declared Height, which makes every container height sum in the runbook approximate. Worth one line in RUNBOOK section 4.

Rules and checks to add
- Fail any Label whose Height resolves below the line height of its Size.
- Fail any Label Height that is a bare number rather than a Type*Line or named row-height expression.
- Fail any Text(x, "...") format string that omits a locale tag, and fail any tag that is not the single app-wide locale.
- Fail any integer format string without #,##0, and require every FTE-typed field to use one shared format named formula.
- Fail any LayoutGap, Padding* or LayoutMinWidth whose value is a non-zero bare number not in {Gap, Pad, GapTight, GapHair, a declared min-width token}.
- Fail any authored (non-tables.json-cell) X/Y/Width/Height that is a bare number greater than 8, with Financials and FrontDoor as the passing baseline.
- Warn where a numeric literal appears both as a control property and inside a named formula.
