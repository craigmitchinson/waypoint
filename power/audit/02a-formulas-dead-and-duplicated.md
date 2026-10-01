# Audit 02a: dead and duplicated named formulas

Counts. Definitions parsed from the three Formulas files plus App.pa.yaml (its 56 theme names are named formulas too and share the namespace): Formulas.pa.yaml 872, Formulas.frontdoor.yaml 41, Formulas.parked.yaml 4, App.pa.yaml 56 = 973 distinct names, none defined twice. invariants.json's 995 counts differently. Zero-reference: 41. Exactly one reference: 211 (80 of those single readers are other named formulas). A further 12 are transitively dead (their only readers are zero-reference formulas), so 53 dead names. Confirmed they ship: each appears exactly once (its own definition) in canvas/build/Src/App.pa.yaml.

## Zero-reference list

File:line, grouped.

**Formulas.pa.yaml.** Item and Jira: JiraOwnedFields 1219, ItemCommitmentText 1287, ItemDeliveryText 1292. Team: TeamNewKind 1660, TeamResShareSquad/Category/MW/Note 1746-1749, TeamReservationColsW 1754. Fin: FinSquadAnnual 2104, FinSquadPeople 2105, FinSquadCommitted 2106, FinSquadDelivery 2107. Tl debug probes: TlProbeARead 3208, TlProbeBRead 3221, TlProbeW1 3223, TlProbeW2 3224, TlProbeP1 3225, TlProbeM1 3226, TlProbeATest 3228, TlProbeBTest 3229, TlProbeQTest 3230, TlProbeSTest 3231. Gaps and geometry: GapsMostFree 3430, TlGapsGridW 3561, TlWindowColsW 3566. Other: FormGradeOptions 3685, UtilisationTone 3981.

**Transitively dead:** TeamResMinSquad/Category/MW/Note 1750-1753; TlProbeA 3202, TlProbeB 3210; GapsSkillRows 3409; TlGapsColW 3560; TlWiColSkill/Week/Run/Book 3562-3565.

**Formulas.parked.yaml:** all 4 (BrandBgSoft 20, NeutralStroke2 21, HeaderHeight 22, TypeBodyWeight 23); dead by design, nothing packs this file.

**App.pa.yaml:** NeutralBgAlt 142, BrandBgHover 158, RadiusControl 197, AppHeaderHeight 210, CanvasWidth 211, CanvasHeight 212, TypeDisplaySize 234, TypeHeadingSize 236, TypeKickerSize 239.

Weight, not just count: TlProbeA, TlProbeB and GapsSkillRows are full nested ForAll tables (per person x per week; GapsSkillRows adds a per-person LookUp inside a Sum). TlProbe* are debugging scaffolds left in the shipped file. The TeamRes*, TlGapsCol* and TlWiCol* families are hand-written column maths of the class compile-tables.mjs overwrites.

## Duplicate groups

**Identical bodies:** ItemAssigneeOptions 1335 / FormAssignPeopleOptions 3844; TeamSquadRows 1641 / OutlookSquads 2523; MonthBarsCurrent 927 / BenefitsCalendarNow 1886; OnSickThisSprint 568 / CmdSickPeople 775; SetFieldRowH 3638 / FormFieldH 3677; WorkRowH 1098 / TeamPeopleRowH 1678; WorkShareSquad 1074 / TeamShareSquad 1686; WorkMinSquad 1084 / TeamMinSquad 1697; TeamSqMinNet 1725 / FinSqMinNet 2196. In App.pa.yaml: NeutralFg1 144 / FocusStroke 167, and Gap 188 / Pad 189 (both intentional aliases).

**Prefix families differing in one token:** TeamSquadRows/FinSquadRows, TeamPeopleCount/TlPeopleCount, and the Team*/Fin* squad-column pairs SqShareName .20/.30, SqSharePeople .07/.08, SqShareNet .09/.10, SqShareCommitted .09/.10, SqMinName 200/220, SqMinPeople 80/90, SqMinCommitted 100/90: near-identical geometry sets maintained twice. Also CmdAttentionLate 753 / CmdAttentionRisk 754 and SettingsStateRows 3597 / SettingsListRows 3598 differ only by one literal or collection.

**Repeated inline expressions across screens** (count, files): (RowHeight - TypeLabelLine)/2 143x in 9; If(RailCollapsed, RailWidthTight, NavW) 23x in 12; 'BadgeCanvas.Appearance'.Filled 18x in 9; If(ItemAssessEditable, DisplayMode.Edit, DisplayMode.View) 17x in 1; If(ItemShapeEditable, ...) 16x in 1; (Parent.Width - Pad*2 - Gap)/2 13x in 4; CurrentQuarter.Label & " · capacity planner" 11x in 11; (RowHeight - TypeBodyLine)/2 11x in 2; Parent.Height - ControlHeight - Pad 11x in 4; Max((Parent.Width - Pad*2 - BandKickerW - Gap*5)/5, 180) 10x in 2. Format literals: "[$-en-US]#,##0" 106x in 9 files, "[$-en-US]#,##0.0" 101x in 9, "[$-en-US]#,##0.00" 20x in 4, "[$-en-US]dd mmm yyyy" 5x in 3; no FmtInt, Fmt1dp or FmtDate names exist. 235 Text(...) calls carry an inline format string.

## Rules and checks to add

Preflight, as checks 27-29.

27. **deadformulas:** parse every named formula definition, count whole-word occurrences outside comments across power/app, iterate to a transitive closure, fail on any name with zero readers; allow-list Formulas.parked.yaml.
28. **dupformulas:** fail on two definitions whose bodies are identical after comment strip and whitespace normalisation; warn on prefix-family pairs whose token diff is 1.
29. **inlinerepeat:** fail on any property expression of 30 or more characters repeated 3 or more times across screen files, and on any format literal used 3 or more times that is not behind a named formula.

One-reader warning (211 today) advisory only.

## Caveat

Screens.flagged/FrontDoor.pa.yaml is out of the build while includeFrontDoor is false; 31 frontdoor names are live only under that flag, and 16 more names have FrontDoor as their single reader. Semantically equivalent duplicates written differently are not covered.
