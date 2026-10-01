# Audit 11b: Craig's screenshots, set 3, played app (files 201951 to 202145)

All 17 are the played app in light theme unless stated, not Studio.

| File | Screen | Finding |
|---|---|---|
| 201951 | Quarter close, Archive (dark theme, rail expanded) | KPI values 1.5 MW, 8.5 MW, 50% render white and legible here; the light-theme copy (202145) does not. Baseline for the contrast bug. |
| 201951 | same | Delivery status pills fixed about 180px wide, right edge abuts Size values; pills sit about 9px below the row text baseline. |
| 201951 | same | Duplicate row: "Payment retry scheduler / WK-A01 / Q3 2026 / 1.0 / 1.0 / 1.5" listed twice (rows 4 and 5). |
| 201951 | same | "7 archived rows" stranded at y1295, about 530px of empty card below the last row. |
| 201956 | Settings, Quarter | All 12 inputs are white with near-invisible pale value text. Nothing readable. Save button stretched full content width. Bottom 45% of tab empty. |
| 202000 | Settings, States | Right column wraps ("Ready for release, Deployed, Live") and de-syncs from the fixed-height left name column; rows drift 2 to 4px. About 1250px dead gap between state name and its Jira Align value; no row rule or striping. |
| 202007 | Settings, Lists | Copy says "The four lists the model reads" but the List column shows five: Region, Reservation category, Absence type, Skill, Role. Gallery sorted by Order so the five lists interleave; "AI engineering" (Skill) vs "AI Engineer" (Role). Content clipped at card bottom. |
| 202015 | Settings, Grades and blends | About 280px of empty space between the last rate row (Offshore) and the "Ops mix" heading; "Ops mix" has no content beneath it. "Contractor day rate £40,000" sits in the GBP per FTE column between grades C and D: wrong unit, wrong sort position. |
| 202015 | all Settings tabs | The left header dropdown beside the search box shows placeholder text in near-black on teal, unreadable in dark theme; reads "All teams" in light theme. |
| 202020 | Settings, Financials | White on white again: "Team / organisation" and "Prepared by" values unreadable; "Estate baseline" shows the stock placeholder "Enter text"; "Running total on Work follows" dropdown value invisible. |
| 202025 | Settings, Outcomes | All six outcomes show "—" for Jira Align key. Lower 55% of tab empty. |
| 202030 | Settings, Links | Both URL inputs unreadable (white on white); full-width Save; lower 60% empty. |
| 202035 | Settings, Data | "Import data" renders as bare bold text with no button chrome, centred instead of on the content margin; no export control though the copy promises one. About 90% of the tab empty. |
| 202040 | Settings, Activity | Column headers Action, Table, When cluster at the right with the left 60% of the header row empty; empty-state "No activity recorded yet." stranded about 850px below the headers. "0 of 0 entries". |
| 202054 | Command (light theme, rail collapsed) | Three of five KPI values (233.9 MW, 81.4 MW, 50%) render dark maroon on the dark teal band and are unreadable; 106.2 MW and 35% are white. Same band, mixed treatment. |
| 202054 | same | Commit calls row 2 has an empty Squad cell. Commit and Defer are plain text with no button chrome. "Late" and "At risk" badges both fixed about 177px wide. Benefits 2026 chart has no axis or tick labels and an unlabelled red vertical rule. About 420px of blank white below the Spikes card. |
| 202115 | Work | Last row "Supplier portal integration" clipped mid-subtitle at the gallery edge; gallery scrollbar sits over the Jira key column. Size column inconsistent: "XL · 0.0", "S · 0.9" but two rows show a bare "5.4" and "27.0" with no size letter; Size values butt against the Sprints header. One Jira key is "—", one is "PRB0124" (no hyphen). Stage strip reads Shaping 3 · 0.0 MW and Release 2 · 0.0 MW. |
| 202122 | Timeline, Sprint | Every squad header capacity label truncated ("6 people · 4.8 MW spri…"). Cell text truncated without ellipsis. Legend item "Open" has no colour swatch while the other six do. View switcher offers both "Sprint" and "Sprints" with no selected state. "Previous" disabled with very low-contrast grey; the centre pill is bright blue, off-brand. Headcounts disagree with Command: Timeline 28 people, Service 6, Squad 1 5, Squad 2 2; Command 36, Service 10, Squad 1 6, Squad 2 5. A person named "test user" appears in Squad 1. |
| 202131 | Team, Absences | All four KPI values (36, 6, 233.9 MW, 54.0) dark maroon on dark teal, none readable. "Sickness" renders as a 255px yellow bar spilling left of the Type column while "Leave" and "Training" get no badge. Type values sit about 7px below the person-name baseline. KPI caption says "Booked leave inside the quarter" (Q4 2026) but rows include 16 Feb, 06 Apr, 25 May and 03 Aug 2026. Sorted by person, not date. |
| 202137 | Benefits | Calendar rows out of sync: item titles drift progressively against their numeric rows (7px at top, 6px at bottom); each title's meta line collides with the next title. Jan to Sep columns are empty pale blocks (60% of the chart width); month labels do not sit over their blocks; "Sep ·" carries a stray trailing dot and is the only red label. Header strip clipped mid-sentence at the card's right edge. "In development" badges pale grey on white next to solid blue "Ready" and green "Released". About 330px empty band before the "At year end" row. |
| 202141 | Financials | All three KPI values dark maroon on dark teal, none readable. "Cost of capacity by grade" lists C, D, E, F; Settings lists A, B, C, D, Offshore, Contractor day rate. Page-level scrollbar with the grade table cut at the viewport bottom; about 85px dead space inside the squad card. "Payback on a year of cost (months) 181.3". |
| 202145 | Quarter close, Archive (light theme) | Identical content to 201951 but all three KPI values now dark on dark and unreadable: a light-theme colour regression, not data. Duplicate WK-A01 row, overlapping status pills and the stranded "7 archived rows" persist. |

## Summary

1. KPI bands: values render dark maroon on dark teal and are unreadable on Command, Team, Benefits, Financials and Quarter close, in light theme only.
2. Settings text inputs are white with near-white value text on Quarter, Financials and Links: about 18 fields where the stored value cannot be read.
3. Fixed-width badges are wrong everywhere: Sickness bars overhang their column, status pills overlap Size, At risk, Late and state badges are sized to a constant, and all sit a few px below their row baseline.
4. Galleries clip and strand: last rows cut mid-text (Work, Lists, Timeline, Financials), truncated labels with and without ellipsis, footer counts marooned hundreds of pixels below the last row (Quarter close, Activity).
5. Cross-screen data disagrees: headcounts 36 vs 28 and per-squad counts differ between Command and Timeline, grade lists differ between Settings and Financials, absences outside Q4 sit under an "inside the quarter" caption, a duplicate WK-A01 archive row, a "test user" in Squad 1.
