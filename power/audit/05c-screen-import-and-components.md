# Audit 05c: Import screen and Components

Sampled in full: Import.pa.yaml and Components.pa.yaml, Formulas.pa.yaml:3640-3665, App.pa.yaml tokens, canvas/tables.json pending list, canvas/columns.json Import runs, and grep censuses across all 10 screens plus FrontDoor. Import is a well-behaved placeholder screen: no dead controls, no Visible false, one state variable (varImportStep; ImportStep and ImportStepIndex derive the rest), no OnSelect over 3 lines, no Visible or DisplayMode with more than one condition. Its faults are layout and method: a 982px fixed step strip inside a LayoutOverflow Hide row, a card with no Height, and a hand-written table the compiler does not own. Components are clean but thin: two of six have a single consumer, one output is read by nobody, and no component has an Event property at all, so preflight check 15 passes on 0 of 0.

| Severity | File:line | Control | Issue | Fix |
|---|---|---|---|---|
| High | Import.pa.yaml:197-308 | imSteps | 5 buttons at Width 190 plus 4x8 gap = 982px in a LayoutOverflowX Hide row; body is 827px at IsCompact 900 and 1028px at 1280; steps 4 and 5 are unreachable below about 1034px | Replace with one ModernTabList over an ImportSteps table |
| High | Import.pa.yaml:310-331 | imFlow | FillPortions 0 with no Height and LayoutOverflowY Hide; content sums to 374px. Command declares Height on 15 of 15 such cards | Add the summed Height formula |
| High | Import.pa.yaml:475-595 | imHeadRuns | Header row is AutoLayout; RUNBOOK requires ManualLayout FillPortions 0 mirroring the row X expressions | Rebuild as ManualLayout, or declare the table |
| High | Formulas.pa.yaml:3656-3661, tables.json | ImpCol* | Six hand-written pixel widths; Import runs is in neither tables.json nor its pending list | Declare scrImport's runs table |
| Medium | Components:209-241 | cmpStepper.CurrentIndex | Output read by no consumer; its only use (stepMark.Fill) is a tautology of branch 1, so completed steps are never marked | Make branch 2 Pos < CurrentIndex, or drop the output |
| Medium | Components:100 | cmpStat.Color | Sentinel <> NeutralFg1: a consumer legitimately passing NeutralFg1 silently gets Tone or OnBrand instead (6 consumers set Color) | Add a HasColor boolean input |
| Medium | Import:610-726 | imCellRn* | AutoHeight true overrides Height RowHeight on cells in a TemplateSize RowHeight gallery | Wrap false, AutoHeight off |
| Medium | Import:596-608 | imRunsList | No empty-state label; 16 exist across other screens | Add one on IsEmpty(ImportRunRows) |
| Medium | Import header | imHeader | Only screen of 9 with no cmpSearch instance | Add one |
| Medium | Components:131-177 | cmpPill | 4 instances, one screen, while screens hand-build 15 raw Badge controls and 36 'BadgeCanvas.ThemeColor' Switches | Route badges through cmpPill or one tone formula |
| Low | Components:282 | cmpRail | Height 1080 literal default | App.Height |
| Low | Components:488-489 | scopeBox | FontUI and TypeBody where every sibling uses TypeFace and TypeBodySize | Align |
| Low | Components:249-251 | stepName | & If(cond, "", ""): both branches empty | Delete |
| Low | App.pa.yaml OnStart | varImportStep | Not initialised | Initialise |
| Low | Import:483, 604 | imHeadRuns, imRunsList | Redundant Visible true | Remove |
| Low | Import screen | scrImport | No OnVisible: step persists between visits and colImportRuns never refreshes after OnStart | Add OnVisible reset and reload |
| Low | Import:499, 610-715 | imHdFirstRuns, imCellRn* | Two naming schemes for one table (Runs, Rn) | One prefix |

## Components

| Component | Inputs | Outputs | Consumers | Instances |
|---|---|---|---|---|
| cmpStat | Label, Value, Unit, Sub, Tone (Text), Color (Color), OnBrand (Bool) | none | Benefits, Command, Financials, QuarterClose, Team | 24 (Label 23, Value 23, Sub 22, OnBrand 20, Unit 9, Color 6, Tone 3) |
| cmpPill | Label, Tone (Text) | none | WorkItem only | 4 |
| cmpStepper | Steps (Table), Current, Label (Text) | CurrentIndex (Number), no consumer reads it | WorkItem only | 1 |
| cmpRail | Active (Text) | none | all 10 screens plus FrontDoor | 11 |
| cmpSearch | none | none | 9 screens (not Import) | 9 |
| cmpScope | none | none | 10 screens, all Visible IncludeScope (false today) | 10 |

No component declares an Event property; every input has a sensible default; cmpStepper.CurrentIndex is the only property duplicating logic a named formula could supply.

Hand-built patterns that should be components (grep counts): app header row 11; page head (eyebrow plus h1) 10; card shell (NeutralBg1 plus NeutralStroke1 plus CardR) 45; section title (TypeSubtitle Semibold) 36; empty-state label 16; list editor Add/Remove block 7 (Settings 4, WorkItem 2, Team 1); tab strip: 6 screens use ModernTabList, Import alone hand-builds 5 buttons (about 100 lines).

## Rules and checks to add

1. Fail any auto-layout container with FillPortions 0 and no Height.
2. Fail a LayoutOverflow Hide row whose children's fixed widths plus gaps exceed the body width at App.Width 900.
3. Fail any gallery not listed in tables.json or its pending array.
4. Fail AutoHeight true on a Label inside a gallery template whose TemplateSize is a fixed token.
5. Fail a screen-level Set(var...) whose variable is absent from App.OnStart.
6. Warn on a declared Output custom property that no screen reads.
7. Warn on a component input compared against its own default as a sentinel.
8. Fail any literal pixel Height or Width of 900 or more in Components.pa.yaml.
9. Fail a raw Badge in a screen carrying a ThemeColor Switch, now that cmpPill owns that map.
10. Warn on a gallery with no sibling control whose Visible tests IsEmpty or CountRows of its Items.
