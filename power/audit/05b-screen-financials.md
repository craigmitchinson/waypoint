# Audit 05b: Financials screen

Financials.pa.yaml survey. Sampled in full: lines 30-2476 (every control), canvas/build/Src/scrFinancials.pa.yaml head and row cells, canvas/tables.json financials entries, scripts/compile-tables.mjs width math, RUNBOOK section 4. Not read: Formulas.pa.yaml Fin* bodies (names and use counts only).

Summary. The screen is structurally clean: no OnSelect over two lines, no Visible with more than one condition, no per-row LookUp or Sum, every cell reads a precomputed ThisItem column, every gallery has an AccessibleLabel, and the four card height sums are right in the rows>0 case. What is wrong is the table layer. All four tables declare "padding": "0" in tables.json while their cards pad Pad on each side, so the compiler skips the padding subtraction and every card overflows its content box by 32px with a permanent horizontal scrollbar; that is the likeliest cause of "the cards look wrong". Around 41 named formulas the screen still references are overwritten at assemble and dead in the build, while the two hand-built funding rows keep the old math and so do not line up with the gallery above them. Every gallery cell carries AutoHeight over a fixed-height template.

| Severity | Line | Control | Issue | Fix |
|---|---|---|---|---|
| High | tables.json (4 entries), cards at 644, 1150, 1505, 2059 | fnSquadCard and the other three | "padding": "0" but cards pad Pad; build emits Max(Parent.Width, 962) and (Parent.Width - 72)*share vs Team's (Parent.Width - 96). 32px overflow, permanent horizontal scroll. | Set "padding": "Pad * 2" on all four and re-run compile-tables. |
| High | 1811-1922, 1924-2039 | fnFlPeopleRow, fnFundingFoot | Not declared cells, so they survive as Parent.Width * FinFlShare* with no gutter reserve while the gallery compiles to (Parent.Width - 72)*share; columns misalign, and fnFlPeopleRow has no Max(Parent.Width, ColsW) so it stays put when the card scrolls. | Declare both as slot rows in tables.json, or drive both from the same compiled expression. |
| High | 48 sites, e.g. 929, 1360, 2293 | fnSqRow*, fnGrRow*, fnFlRow*, fnWiRow* | AutoHeight true plus Wrap true over TemplateSize RowHeight; a wrapping title overruns the 36px row. | Wrap false, drop AutoHeight, as Command's cells do. |
| High | 250 | fnBand | If(App.Width < 3*(180+Gap)+BandKickerW, ...) ignores the rail and paddings: wraps between about 740 and 1020 while Height stays BandH, and LayoutOverflowY is Hide. | Compare Parent.Width against kicker + 3*180 + 3*Gap + Pad*2. |
| Medium | Formulas 2184-2245 | FinSq*, FinGr*, FinWi* Share and Min, FinSquadColsW, FinGradeColsW, FinWorkColsW | About 41 formulas referenced only by expressions the compiler replaces; build shows definition-only. | Delete and let the compiler own the geometry (leave the Fl set until the row above is fixed). |
| Medium | Formulas 2104-2107 | FinSquadAnnual, FinSquadPeople, FinSquadCommitted, FinSquadDelivery | Defined, referenced nowhere in app or build. | Delete. |
| Medium | 1488 | fnGradeFootValue | FinPeopleAnnual / 4 computes a quarter cost inline; the screen otherwise takes quarter figures from the engine. | Add a named formula beside FinPeopleAnnual. |
| Medium | 1793 | fnFlRowTotal | ThisItem.Investment + ThisItem.NonInvestment per row instead of a Total column on FinFundingRows. | Add the column in FinFundingRows. |
| Medium | 1099, 1454, 2411 vs 1924 | the four feet | Three feet use SpaceBetween with no Width, one uses a FillPortions spacer box and Max(Parent.Width, ColsW); the three do not scroll with their table. | One form for all four. |
| Medium | 2040, 2460 | fnFundingNote, fnWorkNote | About 150-character sentence with Wrap false at TypeLabelLine; clipped below roughly 1250px. | Wrap and budget two lines in the card height. |
| Medium | 318-641 | fnFigures | Six near-identical 40-line label and value pairs, and three of the six repeat the band's figures (FinInYear, FinTCO, FinReturnOnTco). | A gallery over a small constant table, and drop the repeated three. |
| Low | 1758-1780 | fnFlRowSplit | Gallery column whose Text is the constant "—" for every row. | Drop the column from the gallery. |
| Low | 1822-1832, 1936-1946 | fnFlPeopleNameBox, fnFundingFootNameBox | Container wrapping a single label purely to consume FillPortions. | Give the label FillPortions, or use SpaceBetween. |
| Low | 327, 337 | fnFigures | RowHeight * 6 + 4 * 6 and LayoutGap 4: the row count is hardcoded in the height and the gap is a bare 4. | Derive from CountRows of the source table; use a token. |
| Low | 651, 1157, 1512, 2066 | four cards | When a table is empty the height reserves RowHeight (36) for a 26px empty label plus a zero-height gallery: about 10px of dead space. | Subtract in the empty branch or hide the gallery. |
| Low | 690/895, 1196/1326, 1551/1681, 2105/2258 | heads and galleries | Two prefixes per table (fnSquadHead with fnSqHeadName, fnWork with fnWiRow*); fnWi* also reads as the WorkItem screen's prefix. | One prefix per table. |
| Low | 219 | fnExport | Dead by decision: Visible false with a placeholder Notify. | Keep, but note it is the screen's only OnSelect. |

No literal pixel numbers in X, Y, Width or Height beyond the house -8 gutter and the 0.5 figure split. Visible !IsCompact appears once (line 190); the cards scroll by design.

## Rules and checks to add

1. For every table in tables.json, assert its padding matches the host card's PaddingLeft and PaddingRight ("0" only when the card pads 0).
2. Fail any *Share*, *Min* or *ColsW named formula whose only occurrence in canvas/build/Src is its definition.
3. Fail AutoHeight true on any Label inside a Gallery template whose TemplateSize is a fixed token.
4. Fail any App.Width < comparison inside a screen file; thresholds must use Parent.Width.
5. Fail a non-gallery row inside a table card that references a *Share* formula (a hand-built row the compiler did not rewrite).
6. Fail Wrap false on a Label whose Text literal exceeds the characters its Width can hold at its Size.
7. Warn on a GroupContainer whose only child is a single Label and whose sole distinguishing property is FillPortions.
