# Audit 03c: Timeline screen

Sampled: all 2541 lines in three ranges, plus power/canvas/tables.json (both timeline entries), power/canvas/build/Src/scrTimeline.pa.yaml (compiled widths), App.pa.yaml OnStart and the Tl* region of Formulas.pa.yaml. Not sampled: bodies of the engine formulas (SprintGridRows, QuarterGridRows, SprintsMatrixRows, TlAvail*), the PCF component, typography tokens.

The screen is structurally sound and carries no Visible false constants, no booking-editor residue and no duplicate-suffix names. Its real cost is elsewhere: the legend row is one control copied seven times with three six-branch Switches each (about 294 lines, 21 repeats), the four readings repeat a head/empty/rows scaffold three times, and the layout arithmetic is hand-maintained in two places: tables.json owns Sprint and Availability, while Quarter and Sprints keep stale hand-written widths that omit the card's padding. That omission, plus the compiler's fixed 10-day repeat, is the likeliest cause of the chopped last day.

| Severity | Line | Control | Issue | Fix |
|---|---|---|---|---|
| High | Formulas.pa.yaml:3142 | TlPeekTop | Sums tlBody chrome but omits tlLegendRow (32) and its Gap (16); card opens 48px high, over the snap row | Add TypeLabelLine + 8 + Gap |
| High | 1119, 1229, 1386, 1485, 1587 | tlQuarter*, tlSprints* | Max(Parent.Width, Tl*TableMinW) omits the card's Pad * 2 and the 16px vertical-scrollbar reserve; compiled Sprint form is Max(Parent.Width - Pad * 2, 1014) | Declare both grids in tables.json, or subtract Pad * 2 + 16 |
| High | tables.json timeline-sprint-grid | days | repeat 10 fixed while TlSprintDayCount derives from 'Sprint length (days)'; compiled Width pitch*10+72 chops or pads | Make repeat follow the sprint's working-day count |
| High | 342-356 | tlLegendRow | LayoutWrap true with fixed Height TypeLabelLine + 8 and OverflowY Hide; children floor at 686 plus half width, wraps and clips below about 1400px body (664 at IsCompact 900) | Height doubles when Parent.Width is under the floor |
| High | 386-679 | tlLegend* | Seven labels x three identical LookUp and Switch blocks | One horizontal gallery over a TlLegend table |
| Medium | 1032, 1068, 1325, 1371 | tlSpCellFill/Text, tlQtCellFill/Text | Two LookUp(TlKindTone, ...) per cell, N people x M days per render | Precompute Fill and Color tone on the row in Formulas |
| Medium | 1112 | tlSpCellHit | Reads tlSprintRows.Selected.Name from a nested gallery, relying on click order | Alias the outer gallery (As tlSpRow) |
| Medium | 2498 | tlPeekOpenItem | LookUp(colWork, Title = ...); Title is not a key | Carry the item id in varPeekCell |
| Medium | Formulas.pa.yaml:3560-3565 | TlGapsColW, TlGapsGridW, TlWiCol*, TlWindowColsW | Seven named formulas, zero readers (removed Gaps grid) | Delete |
| Medium | App.pa.yaml:94 | varTlGapNeed | Set once, no control writes it; TlGapNeed is a constant 3 behind live copy | Add the control or inline the 3 |
| Medium | 940-942 | tlSprintRows | FillPortions 1 plus a Height that contradicts it and ignores padding and gap; siblings declare neither | Drop the Height |
| Medium | 787-822 | tlGridHost, tlSprintGrid | Two full Sprint implementations; varUseGridControl is false by default, so the PCF path is dead weight today. Child repeats the parent's Visible | Decide one path |
| Low | 878, 1171 | tlSprintHeadMetaBox, tlQuarterHeadMetaBox | Empty containers used as spacers | Keep only if the compiler needs the header handle |
| Low | 707-724 | tlSnapAll, tlSnapChips | Width math uses Gap (16) while tlSnap's LayoutGap is 8, and chips have no gutter | Use 8 |
| Low | 1049 vs 1340 | tlSpCellEdge, tlQtCellEdge | Same status edge, two different formulas | One shared tone formula |
| Low | 258 | tlStateLine | Reads tlTabs.Selected.Value; everything else reads TlReading | Read TlReading |
| Low | 1721, 1730 | tlAvailChips, tlAvailChip | Literal 200 and 194 where every other pitch is share plus min | Name the pitch |
| Low | 963-1005 vs 1145 | naming | tlSpRow* and tlQtRow* abbreviations against tlSprintHead* and tlQuarterHead*; *RowsGallery suffix only here | Pick one prefix form |
| Low | 2243 | tlPeekHit | Full-screen transparent hit button with a Tooltip that fires on any hover while open | Drop the Tooltip |

## Rules and checks to add

1. Any container inside a padded card whose Width is Max(Parent.Width, ...) must subtract that card's padding; grep screens for Max(Parent.Width, and fail.
2. Every Tl*, *Col* and *Min* named formula must have at least one reader in power/app; fail on zero.
3. A container with LayoutWrap true must not carry a constant Height.
4. A hand-summed anchor formula (*Top) must be regenerated from the body's child list, or the check fails when a body child is added.
5. A gallery template may contain at most one LookUp( per property.
6. tables.json repeat must be a constant only when the matching *Count formula is also constant.
7. Every Set(var...) in OnStart needs a writer other than OnStart, or a comment saying it is fixed.
8. A control inside a nested gallery may not reference the outer gallery's .Selected; require an As alias.
