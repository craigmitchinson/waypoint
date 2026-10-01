# Audit 06a: Settings screen

Settings.pa.yaml survey (2,661 lines, read in full; Formulas.pa.yaml 3,588-3,640, App.pa.yaml tokens, RUNBOOK section 4, columns.json and tables.json read as supporting evidence; typography not audited here). The screen is structurally sound and its column bindings are clean: every field name in the three saves and six galleries resolves against columns.json, 'Running total follows' really is text so the dropdown write is right, and the ClearCollect after each Patch is necessary, not cargo: Waypoint = First(colSettings) and CurrentQuarter = LookUp(colQuarters, ...) feed the whole engine. The faults are concentrated in three places: the three save buttons have no error handling at all while every other save in the app is wrapped in IfError; roughly 300 lines of Add/Edit scaffolding is hidden but still reserving space; and the same list editor is hand-built five times. Not sampled in depth: AccessibleLabel wording, and whether each tab's copy matches src/pages/Settings.tsx.

| Severity | Line | Control | Issue | Proposed fix |
|---|---|---|---|---|
| High | 806, 1921, 2272 | stQuarterSave, stMoneySave, stLinksSave | No IfError; Notify Success fires whatever the Patch did. Team 2327/2726/2807, Work 1585, WorkItem 1414 all wrap saves and set varProblem. | Wrap each save in IfError, set varSetProblem from FirstError.Message, show it above the button. |
| High | 806-820 | stQuarterSave | No validation: Value("") writes 0 to member-week and modifiers, DateValue(stInQEpoch.Text) errors on a typo, Save is never disabled. | Inline error line plus DisplayMode.Disabled while invalid, per RUNBOOK Forms. |
| High | 814 | stQuarterSave | Patches Quarters via LookUp(Quarters, Label = CurrentQuarter.Label), identifying the row by the very field being rewritten; duplicate labels patch the first. | LookUp(Quarters, 'Current quarter' = true). |
| High | 2536-2586 | stActivityList | TemplateSize RowHeight (36) holds a two-line stack: 26 + 24 = 50px. Rows clip. | TemplateSize WorkRowH (TypeBodyLine + TypeLabelLine + 8). |
| Medium | 853, 1070, 1139, 1321, 1390, 1537, 1666, 1958, 2103, 2307, 2346, 2368 | Add/Edit/Data buttons | 12 Visible false, 9 of them Notify-only stubs. About 300 dead lines. | Delete; reinstate with the form unit. |
| Medium | 962, 1232, 1467, 1616, 2034 | stHd*Edit | Five Text "" spacer Labels reserving SetColEdit (80px) per row for buttons that never show. | Delete, and drop SetColEdit from the four Set*ColsW sums. |
| Medium | 825-2142 | stStates, stLists, stGrades, stBlends, stOutcomes | Five hand-built copies (about 1,190 lines) of one editor: note, add, head, gallery, empty. No component exists. | One cmpListEditor (title, Items, up to 3 column defs), or hoist head and empty. |
| Medium | 978, 1248, 1483, 1632, 2050, 2536 | six galleries | None declared in canvas/tables.json nor under its pending list; cells hand-write running sums. | Declare the six tables, or list them under pending. |
| Medium | 256, 1707, 2144, 2279 | stQuarter, stMoney, stLinks, stData | About 336/600/666/758px empty inside an 822px card at 1080; Data shows one button. RUNBOOK: empty vertical space in a card is a defect. | Two-column the short forms, or content-size the card. |
| Medium | 1483, 1632 | stGradesList, stBlendsList | Two FillPortions 1 galleries split the remainder equally regardless of row counts. | Content-size grades; leave blends flexible. |
| Medium | 999-1069, 1269-1320, 1504-1536, 1653, 2071-2102, 2594-2644 | gallery cells | Single-line cells carry Wrap true and AutoHeight true, which overrides Height RowHeight; Command's cells are Wrap false, centred by Y arithmetic. | Wrap false, drop AutoHeight. |
| Low | 997, 1267, 1502, 1651, 2069, 2555 | first-column cells | Parent.TemplateWidth - Set*ColsW - 16 has no Max(..., min) guard (Benefits 266/758 convention). | Wrap in Max(..., 120). |
| Low | 1099, 1350, 1566, 1695, 2651 | st*Empty | CountRows(gallery.AllItems) = 0 reads loaded rows; label also renders below a full-height gallery. | IsEmpty(SettingsStateRows); place above the gallery. |
| Low | 1707-1928 | stMoney*, stFldM*, stInM* | Prefix break: the tab is "Financials" and scrFinancials is a separate screen; stMoney names the retired scrMoney. Header cells also invert order. | Rename to stFin*. |
| Low | 249, 266, 289 and 25 others | stCard and others | LayoutGap 8 (x10) and 4 (x18) as literals; they do not halve at IsCompact while Gap and Pad beside them do. | Name them, or use Gap and Gap/2. |
| Low | 874, 978, 1160, 1248, 1411, 1483 and others | heads, galleries | 12 Visible true and 6 Width Parent.Width on stretch children restate defaults. | Delete. |
| Low | 230, 2428 | stTabs, stActivitySearch | varSetTab and varSetSearch never initialised in OnStart. | Add blank initialisers. |
| Low | 1558 | stEditGr | "arrives in a later " & "unit." split for no reason. | One string. |
| Low | model | Settings table | 'Low confidence at' and 'Medium confidence at' have no reader anywhere in power/app and no editor on any tab. | Surface on Quarter or drop from the model (model unit, opus). |

## Rules and checks to add

1. Every Patch( in a screen file sits inside an IfError( whose error branch sets a problem variable.
2. No Notify Success in an OnSelect containing a Patch unless inside the IfError success arm.
3. A gallery whose template contains two controls with different Y values must not use TemplateSize RowHeight.
4. A Label inside a gallery template must not set both AutoHeight true and an explicit Height.
5. A control with Visible false and an OnSelect that only calls Notify fails preflight.
6. A Label with Text "" and a non-zero Width fails preflight.
7. Every Gallery in power/app/Screens must appear in canvas/tables.json under a declared table or under pending.
8. No more than one FillPortions 1 gallery per auto-layout container.
9. LayoutGap numeric literals other than 0 must be a named formula.
10. A Patch must not identify its target with a LookUp on a column the same Patch writes.
