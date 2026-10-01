# Audit 02b: formulas layer, performance and correctness

Sampled in full: App.pa.yaml, App.scope.yaml, Formulas.parked.yaml, DataSources.reference.yaml, Formulas.pa.yaml (all 4057 lines). Not sampled: Screens and Components beyond grep.

## OnStart (App.pa.yaml 36-63)
26 ClearCollects, all inside one Concurrent, every one unfiltered, each IfError(..., Clear(col)). Readers given as Formulas.pa.yaml / Screens and Components: colSettings 1/3, colQuarters 3/2, colPeople 14/3, colSquads 11/1, colWork 11/27, colAssignees 5/1, colAssignments 5/2, colAbsences 2/2, colReservations 2/0, colStates 4/0, colEpics 1/0, colSizes 2/1, colListValues 5/2, colBankHolidays 1/0, colClaims 3/1, colBlendLines 1/0, colActuals 6/2, colTeamGradeCosts 2/1, colCostLines 2/1, colSnapshots 1/1, colArchive 3/1, colGrades 2/0, colBlends 1/0, colOutcomes 1/0, colActivity 3/2, colImportRuns 1/0. Plus colPreferences (73-75, LoadData). No collection is unread.

## Direct Dataverse reads in named formulas: 13
ItemRow 1107, ItemMePerson 1186, ItemSendPerson 1189, ItemClaimRowT to Y 1537-1547, FormWorkInitialState 3827, SourceOfTruth 1206 and 1209. ItemRow, ItemClaimRow* and FormWorkInitialState are Patch targets, justified. ItemMePerson and ItemSendPerson are read-only and should read colPeople; they re-query the server on every recalc, ItemSendPerson on every keystroke into varItemSendTo.

## Today() and Now(): 10 Today(), 0 Now(), no AsOf
Lines 77 CurrentSprint, 81 TimelineJan1, 487 SprintDaysLeft, 927, 1886, 2576 QcEarly, 2757, 3779, 3788, 3899. CurrentSprint is read by about 15 formulas including WorkStatusTable.DeliveryStatus, so every Today() tick invalidates the whole engine. One AsOf = Today() would collapse all ten.

## N x M nesting, top offenders
1. SprintsMatrixRows 3281: squads x sprints x people x sprint-days, each leaf scanning BankHolidayDayRows and AbsenceQuarterTable; recomputes the same week 5 times per person per sprint.
2. ItemWalkFree 1402: assignees x 52 weeks x 6 table scans; ItemWalkWeeks 1469 then squares it.
3. TlSprintCells 2852: people x days x 4 LookUps, including LookUp(WorkStatusTable, Title = item) per cell.
4. TlQuarterCells 3152: people x 13 weeks x 4 scans.
5. PeopleTable 135: people x absences x CountRows(DayGrid 364) x2.
6. GapsSkillRows 3409: skills x weeks x people x nested LookUp(LookUp(TlQuarterCells)).
7. BenefitCalendarTotals 827: 12 x rows x 5 LookUps; live Filter recomputed per month.
8. SprintsColumnTotals 3368 and SprintsMatrixTotals 3356 re-walk SprintsMatrixRows.
9. BenefitsTypeRows 1950: 7 x claims x 2 LookUp(WorkStatusTable).
10. WorkBase.ComponentCount 232: CountRows(Filter(colWork)) per work row, O(n squared); DecisionUnassigned 648 same shape over colAssignees; OutlookRows 2527 squads x quarters x Filter(WorkStatusTable).

## Findings
| Severity | Line | Name | Issue | Fix |
|---|---|---|---|---|
| High | App.pa 36-63 | OnStart | 26 unfiltered ClearCollects; the Dataverse row limit truncates silently. Activity log, Archive, Absences, Assignments grow without bound | Filter by current quarter or recency; raise the row limit; load Activity and Archive lazily |
| High | App.pa 75-76 | LoadData, varTheme | LoadData is async; the very next Set reads colPreferences before it lands, so the theme is always light | Move the Set to a Timer or OnVisible, or gate on colPreferences filling |
| High | 3281 | SprintsMatrixRows | 5-level nesting, about 24k leaf iterations each scanning two tables; drives the Sprints tab | Precompute a per-person-per-week availability table once, index into it |
| Medium | 3202-3231 | TlProbe A/B/W1/W2/P1/M1/ATest/BTest/QTest/STest | 10 debug probes on Name = "x", zero readers | Delete |
| Medium | App.pa 79, 123 | varNavOpen, varUseGridControl | varNavOpen Set and never read. varUseGridControl is a constant env read done as a Set, while SourceOfTruth (1206) does the same read as a named formula | Delete varNavOpen; make UseGridControl a named formula |
| Medium | 1050-1056, 1631, 3594, 2255, 1765, 3647 | varWorkState/Squad/Commit/Search, varTeamTab, varTeamSquad, varSetTab, varSetSearch, varQcTab, varItemTab, varBenefitsMeasure, varImportStep, varItemSendTo, varNavUserChoice | 14 variables read in Formulas but never initialised in OnStart; they work only because every reader wraps IsBlank | Initialise blank in OnStart |
| Medium | 891, 1866, 1921 | BenefitYear | Date(BenefitYear, ...) and Text(BenefitYear, "0000") with no floored twin | Add BenefitYearOr defaulting to Year(AsOf) |
| Medium | 728, 1057, 1140 | PriorityRank | The Must/Should/Could/Won't Switch is written twice and listed a third time | One 4-row table with Rank |
| Medium | 1656-1669 | TeamAddLabel, TeamNewKind, TeamCountLine | Three Switches on the same TeamTab | One table keyed on tab |
| Medium | 3060, 3066 | TlPeekTitle, TlPeekKindLabel | Re-map kind to label that TlKindTone (2937) already keys | Add a Label column to TlKindTone |
| Medium | 1764, 1988, 4032, 4036 | BenefitsTab, IncludeScope | Both are constants, so 3 of 4 BenefitsCountLine branches, BenefitsActualRows/TypeRows/RollupRows and the whole ScopeTeamRows/ScopeTeams/ScopeOptions chain are unreachable | Park them, as Formulas.parked.yaml does for dead theme names |
| Low | 3648 | ImportStepIndex | 5-branch Switch duplicating an implicit step list | Step table with Index |
| Low | 2771, 3291 | TlPeople, SprintsMatrixRows | Vacancy <> true where line 514 uses !Vacancy | Use !Vacancy |
| Low | 3055-3058 | TlPeekDay | Value() on three substrings guarded only by Len < 10 | IfError or IsMatch guard |
| Low | 908 | HexBrandSoft | Hard-codes the two hexes that Formulas.parked.yaml:20 defines as BrandBgSoft | Comment the pairing, or move BrandBgSoft back |

Formulas over 40 lines: SprintsMatrixRows 3281 (73), ItemWalkFree 1402 (65), WorkBase 226 (58), PeopleTable 135 (57), TlQuarterCells 3152 (49), CompareBase 2381 (49), ReservationRows 341 (45), WorkStatusTable 288 (44), BenefitsCalendarRows 1843 (41), TlSprintCells 2852 (41). All except CompareBase nest deeper than 4.

Divisions: every one traced is guarded. No Coalesce over mixed types or booleans. The choice-vs-text comparisons at 2360 and 2447 are safe; Archive.'Close status' is a text column.

Formulas.parked.yaml: 4 names, zero readers, not packed; accurate but it now holds only theme leftovers while the far larger dead sets (BenefitsTab's three tables, the scope chain, the Qc Compare and Calibration tables, the TlProbes) sit live in Formulas.pa.yaml. DataSources.reference.yaml is stale in two directions: it lists Import profiles (wp_importprofile), which nothing loads, and omits Environment Variable Values, Environment Variable Definitions and Teams (wp_team), which App.pa.yaml:124-128, Formulas.pa.yaml:1206-1210 and App.scope.yaml depend on. Anyone following it in Studio leaves SourceOfTruth and varUseGridControl silently on their fallbacks.

App.scope.yaml: its Concurrent body and cmpScope.OnChange are byte-identical apart from indentation and in step with App.pa.yaml's plain block (same 26 tables, same order). The whole file is inert while IncludeScope = false.

## Rules and checks to add
1. No named formula may name a Dataverse table directly unless it is a Patch or Remove target.
2. Today() may appear exactly once, in a formula named AsOf; every other use reads AsOf.
3. Every variable read in Formulas*.yaml must appear in a Set(var... in App.OnStart.
4. Every Set(var... in App.OnStart must be read somewhere in power/app.
5. A named formula whose definition is a bare string, number or boolean literal must live in Formulas.parked.yaml.
6. No named formula may contain the string "x" as a LookUp key.
7. Nesting depth of ForAll or AddColumns with a Sum, LookUp or CountRows inside must not exceed 4.
8. No named formula may exceed 60 lines.
9. Every table named in DataSources.reference.yaml must be referenced in power/app, and every table referenced in power/app must be listed there.
10. Each ClearCollect in OnStart must either carry a Filter or be on a table declared bounded in the reference file.
11. Every X / Y must have Y ending Or1, be a literal, or be wrapped in Max(1, ...) or If(Y = 0, ...).
12. A Switch on the same variable may appear at most once per variable across Formulas*.yaml.
