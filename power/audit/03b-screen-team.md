# Audit 03b: Team screen

Team.pa.yaml survey (2871 lines). Sampled in full: shell, band and pivot (1-500), the people gallery and row (740-1140), squad and absence galleries plus both hit targets (1290-1900), both panels (1895-2871), and the compiled canvas/build/Src/scrTeam.pa.yaml head and row widths. Skimmed: repeated head cells at 500-740 and the middle squad and absence cells (compiler-owned). Hygiene is good: no Visible false constants, no empty containers, no orphan booking names, no duplicate-by-suffix names, every control carries the tm prefix, every gallery reads precomputed ThisItem columns. The screen's real problem is one line of tables.json, which explains the wrong column distribution on the people table; everything else is duplication and two over-long handlers. A fix to either save handler is an opus unit (write path).

| Severity | Line | Control | Issue | Fix |
|---|---|---|---|---|
| High | 479, 764, canvas/tables.json team-people | tmPeopleHead, tmPeople | "padding": "0" while host tmCard pads Pad each side. Compiler writes Max(Parent.Width, 1264) and cells off (Parent.Width - 96); squads and absences in the same card get Max(Parent.Width - Pad * 2, ...) and -64/-48. People grid is 32px wider than the card, so every column is oversized and Free sits under the permanent scrollbar. | Set "padding": "Pad * 2" and re-run assemble. |
| High | 283-289 | tmBand | Doubles height below App.Width 950, but needs 150 + 4*180 + 4*Gap = 934 inner and gets App.Width - 220 - 32 - 32; wraps below 1218, so row two is clipped between 950 and 1218 (LayoutOverflowY Hide). | Threshold off Parent.Width, one shared named formula. |
| Medium | 2326-2358, 2806-2852 | tmPersonSave, tmAbsSave | 33- and 47-line OnSelect. | Lift the With block and per-person record into named formulas. |
| Medium | 2326, 2726, 2806 | both saves, tmAbsRemove | IfError wraps the whole chain, so a refused Patch still runs Set(var...SaveError, ""), closes the panel and Notifies success; the message set in the fallback is then unreachable. | House-wide pattern change: Patch first, branch on IsError. |
| Medium | 2333, 2339 | tmPersonSave | Switch default writes 'Team grade'.F and Employment.'Open vacancy' when the source is blank. | If(IsBlank(x), Blank(), Switch(..., Blank())). |
| Medium | 2592-2853 (16 sites) | tmAbsTo, tmAbsDays, tmAbsError, tmAbsSave | LookUp(FormAbsenceWeekOptions, ...).Mon repeated 16 times. | Two named formulas, From and To Monday. |
| Medium | 2257-2296, 2736-2775 | tmPersonError, tmAbsError | Predicate in three copies; Visible carries 5 and 6 conditions. | Visible: !IsBlank(Self.Text). |
| Medium | 764-1830 (20 cells) | tm*Row* | Wrap true plus AutoHeight true on fixed-height grid cells, numbers included; AutoHeight overrides Height and breaks the row. | Wrap false, Command's Y = (RowH - line)/2. |
| Medium | 488-1798 | tm*Head*, tm*Row* | 36 dead TeamShare*, TeamMin*, *ColsW names (shares already drifted from tables.json). | Delete; placeholder X and Width. |
| Low | 1479-1514 | tmSqRowUtil | Text tones off UtilisationBad/Warn, Colour off NumberTones: two threshold sources in one cell. | Read both from NumberTones. |
| Low | Formulas.pa.yaml:3685 | FormGradeOptions | Dead since tmFieldGrade became a derived Label. | Delete. |
| Low | 228, 264, 469 | tmAdd, tmAddAbsence, tmChipClear | Width 160/160/80 literals where the screen is otherwise parent-relative. | Named PageHeadBtnW, ChipClearW. |
| Low | 746, 1295, 1647 | tm*Empty | When shown, adds TypeBodyLine + 8 the gallery height formula never subtracts; tmCount is clipped. | Subtract it, or hide the gallery when empty. |
| Low | 1087, 1465, 1503 | tmRowFree, tmSqRowCommitted, tmSqRowUtil | LookUp(NumberTones, ...) per row (twice per squad row). | Hoist to a named tone formula per metric. |
| Low | 1121 | tmPeopleRowHit | LookUp(People, 'Full name' = ThisItem.Name): name is not a key (app-wide idiom). | Carry the id in the row table. |
| Low | 1914-2255 | tmLbl*, tmField* | 10 near-identical label and input pairs, twice over; not fixable by component (canvas components take no child slot). | Leave; geometry is already named. |
| Low | 49-117, 159-282 | tmHeader, tmPageHead | Header and page head copied across ten screens. | cmpAppHeader, cmpPageHead. |
| Low | 1932-2255 vs 2297 | tmPersonPanel | Last field bottom about 794 vs foot top Height - 110; collides below about 820px viewport height. | Scroll the field stack. |

## Rules and checks to add

1. Every tables.json entry's padding must equal the sum of the host container's horizontal paddings; fail when a screen's entries disagree with each other.
2. Fail any Visible or Height threshold that compares App.Width inside a control nested below the rail; require Parent.Width.
3. Fail AutoHeight true on any Label inside a gallery template or a ManualLayout row.
4. Fail any OnSelect body over 30 lines.
5. Fail a Switch whose last arm is a real choice member when the scrutinee is a .Selected.Value.
6. Fail a named formula referenced nowhere else.
7. Fail a literal in X, Y, Width or Height outside a gallery template unless the control is named in tables.json.
8. Warn when one identical LookUp(...) expression appears more than three times in a file.
9. Fail a Wrap true cell in a column whose tables.json type is number or date.
10. Warn when a Visible or DisplayMode formula carries more than three operands.
