# Audit 04b: Work item screen

| Severity | Line | Control | Issue | Proposed fix |
|----------|------|---------|-------|--------------|
| High | 42 | OnVisible | Set(varItemTab,"Shape") in OnVisible defeats ItemTab = If(IsBlank(varItemTab), ItemDefaultTab, varItemTab) (Formulas.pa.yaml:1197). ItemDefaultTab is dead; a Delivery item opens with the strip on Components and the pane on Shape. | drop the Set |
| High | 1696 | wiAssess | children sum at least 938px (30+86+164+348+30+30+24+30+36, gaps 8x16, pad 32) against 782 available at 1080; overflow Hide clips wiAssignList and the Save button | LayoutOverflowY Scroll or reflow |
| High | 651 | wiShape | 684px against 658 when wiStageInputs shows (cancel and conclude are reachable in Shaping); wiSendSection clips | hide wiSendSection while cancelling or concluding, or reflow |
| High | 1544 | wiSendAssignee | Width Parent.Width - 752 (also 2470 -148, 2629 -396, 2850 -184): negative at IsCompact 900 | Max(..., 160) |
| High | Whole file | wiSideRail | the only screen of ten with no IsCompact reference; the 320px wiSideRail keeps full width at 900 | Visible !IsCompact as Work.pa.yaml:183 |
| High | 2455-2508 vs 2614-2792 | person mechanisms | two live person mechanisms (Assignees slots, Add with no Remove; Assignments with dates), each invisible to the other's readout; decisions.md:242 names assignment rows as the model | one write path |
| High | 65, 441, 542, 586, 1388, 1484-5, 1677-8, 2507, 2593, 2711, 2787, 2891, 3685, 3775, 4434 | ClearCollect | 16 unscoped ClearCollect drop the team scope App.scope.yaml applies | one scope-aware reload block |
| High | Multiple | LookUp | LookUp('Work items', Title = ...) in 8 places, and 1388 re-reads by the just-typed title. Title is not a key. | re-read by 'Work item id' |
| Medium | 1378, 2557, 2500, 2883 | Patch | no IfError, so a failed Patch still Notifies success; four siblings do wrap | Add IfError with Notify inside the success arm |
| Medium | Various | Error variables | Three error channels (varProblem, varAssessMsg, varActualMsg); wiCompAdd writes varProblem into the band above the tabs while neighbours show inline; OnVisible clears two of three, so a Value-tab error survives a revisit | One error variable per screen, cleared in OnVisible |
| Medium | 1412 | wiHypSave | 77 lines, six near-identical Patch('Benefit claims') differing in four values | ForAll over a spec table |
| Medium | 387 | wiActionBtn | 56-line Switch duplicated verbatim at 50-67 (the comment admits it) | Remove duplication |
| Medium | 1074-1340 vs 3223-3480 | Controls | 18 controls duplicated (same labels, same Defaults); the Value copies are ModernTextInput at DisplayMode.View, read-only data in disabled inputs | Use Label instead of ModernTextInput at DisplayMode.View |
| Medium | 3883 | wiGlanceCard | declared 396 vs 438 needed when Jira key shows; design-work-item-stages.md requires auto-height from a rows table, not 6 hard-coded pairs | Implement auto-height from rows table |
| Medium | 596-616 | wiTabs | Items restates the stage order five times and Default duplicates ItemDefaultTab by hand | Consolidate stage order and ItemDefaultTab |
| Medium | Various | Stage assignments | Stage conflicts with design and decisions: priority and squad are editable only in Assessment (decisions.md:266 and the design put priority with the PO in Shaping); assignments lock at Delivery though the design opens them there; actual-effort rows are gated to Realised though the design records them in Delivery | Align stage assignment rules with design and decisions |
| Low | 621 | wiProblem | Wrap false truncates FirstError.Message | Set Wrap true |
| Low | 2670 | wiAssignAdd | DisplayMode runs Value(Mid(...)) unguarded | Add guard condition |
| Low | 2500 | wiAssigneeAdd | has no blank-selection guard | Add blank-selection guard |
| Low | Various | Naming convention | WiCompCol* is the only Wi-prefixed formula family | Apply standard naming convention |
| Low | 66 sites | Geometry | 66 literal geometry sites (lowest density of the big screens; norm, not a defect) | None |

## Summary

Clean: no dead controls and no dead variables (all 12 have readers). Naming consistent; *Rail suffixes are the documented convention.
