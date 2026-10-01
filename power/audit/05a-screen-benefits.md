# Audit 05a: Benefits screen

Benefits.pa.yaml (2002 lines). Sampled in full: lines 1-1320 and 1983-2002, the whole control tree via structural grep, the Benefits block of Formulas.pa.yaml (1755-2060), the benefits-calendar entry in canvas/tables.json, and the compiled canvas/build/Src/scrBenefits.pa.yaml. Spot-read only: the twelve footer labels 1320-1473 and the actuals and types blocks 1473-1983 (dead).

Summary: the screen is one live table (the calendar) carrying three dead ones. BenefitsTab is a string constant, so about 863 of 2002 lines can never render. The live calendar is well sourced: every number is a named formula, cells read precomputed ThisItem columns, no per-row LookUp, no dead variables, no prefix breaks, one Set and no write path. Its faults are geometric: a two-line row in a 40px template, a band that wraps 284px before its height says it does, a header row 32px wider than the grid under it, and a header and rows base mismatch that the table compiler bakes in. There is no chart control on this screen or anywhere in power/app; the calendar is a real table with AccessibleLabel on both galleries. Craig's "points looked wrong" is most likely the clipped captions and the headers 16px off their columns. RUNBOOK line 357 still claims Command's right column holds a "Benefits chart": stale.

| Severity | Line | Control | Issue | Fix |
|---|---|---|---|---|
| High | Formulas 2006, 917 | bnCalendar | BenefitsCalRowH = 40; the row stacks title (Y 2, 26) over caption (Y 28, 24) = 52 needed. Caption is half-clipped. compile-tables.mjs writes X and Width only. | Set to 54, or reuse the app's WorkRowH idiom. |
| High | 1017 vs 1116 (build) | bnCalRowFte, bnCalFootM1 | Row cells base on Parent.TemplateWidth, head and foot on Parent.Width, and the compiler takes its 16px scrollbarReserve off both. TemplateWidth is already scrollbar-narrowed, so rows drift up to 16px left of their own headers and totals. | In compile-tables.mjs, drop the reserve when the base is TemplateWidth. |
| High | 229-230 | bnBand | Wrap threshold App.Width < 5*(180+Gap)+BandKickerW = 1130, but the band needs 1162 and its width is App.Width - rail - 32, so it wraps from 1414. Between 1130 and 1414 row two is clipped. | Compare Parent.Width against 150+900+80+32. |
| High | 416-751, 1473-1729, 1730-2002 | bnRollup*, bnActual*, bnType* | About 863 lines gated on BenefitsTab = "Roll-up" or "By benefit type" (constant "Benefits calendar") or Visible false. Their formulas are dead too. | Delete the three blocks and their Formulas block; keep the decision note. |
| Medium | 375 (build 383) | bnCardHead | Max(Parent.Width, BnCalMinW) where the grid uses Max(Parent.Width - Pad*2, ...); 32px wider than everything below it. | Subtract Pad * 2. |
| Medium | 384, 399 | bnMeasure, bnSummary | 160 + LayoutGap 16 + (W-168) = W+8: the right-aligned summary loses 8px to overflow Hide. Only literal width over 100 in the file, repeated as 168. | Name the tab width once and subtract width plus Gap. |
| Medium | 1012, 1034, 1058, 1146 (x12), 811 | bnCalCellText, bnCalRowFte/Gbp, bnCalFootM*, bnCalHeadMonth | Wrap true with AutoHeight true on one-line numeric cells; AutoHeight overrides the declared Height. | Wrap false, drop AutoHeight. |
| Medium | 1128-1473 | bnCalFootM1..M12 | Twelve 26-line copies doing LookUp(BenefitsCalendarFooter, Num = N), where the head row does the same job as one horizontal gallery (780-817). | One horizontal gallery over BenefitsCalendarFooter. |
| Low | 1144, 1171, 1198 (x12) | bnCalFootM* | Fill If(Mod(1, 2) = 1, ...): Mod of a literal. | ThisItem.Band once the footer is a gallery. |
| Low | 760, 894, 915, 1106 | bnCalHead, bnCalendar(Empty), bnCalFoot | Visible BenefitsTab = "Benefits calendar" is constant-true. | Drop the conjunct. |
| Low | 561, 891 | bnRollupEmpty, bnCalendarEmpty | Width Parent.Width inside a card padded Pad, 32px past the content box. | Parent.Width - Pad * 2. |
| Low | 393 | bnMeasure | varBenefitsMeasure never initialised in App.OnStart. | Add Set(varBenefitsMeasure, "") to OnStart. |
| Low | 55-121 | bnHeader | App header hand-copied as in all 11 screens; no cmpHeader. | One cmpHeader component. |
| Low | 17-28 | file comment | Header prose still describes ModernText month cells with an AccessibleLabel second reading; the cells are Label and carry none. | Rewrite the comment, or add the second reading back. |

## Rules and checks to add

1. For every tables.json entry, assert the row gallery's TemplateSize is at least the sum of its stacked cells' Y + Height.
2. Fail when a head or foot cell's width base is Parent.Width while the matching row cell's is Parent.TemplateWidth and the compiler has applied scrollbarReserve.
3. Fail any Label with both Wrap true and AutoHeight true whose declared Height is one Type*Line.
4. Fail any wrap threshold written against App.Width.
5. Fail any Visible whose expression compares a named formula defined as a string literal to a string literal.
6. Fail any child of a padded auto-layout container whose Width uses Parent.Width without subtracting that container's padding.
7. Fail any auto-layout row whose children's declared widths plus LayoutGap x (n-1) exceed the container width.
8. Fail Mod(literal, literal) or any other formula over two literals.
