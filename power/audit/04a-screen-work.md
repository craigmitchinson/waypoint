# Audit 04a: Work screen

Summary. The screen is structurally sound: auto-layout shell, no dead controls, no Visible false constants, no empty containers, and the gallery does no per-row LookUp or Sum (every cell reads a precomputed ThisItem column from WorkRegisterRows, which is right). The faults are elsewhere: the filter row and the lifecycle strip carry pixel minimums that exceed the body width well before the 900 breakpoint and clip with overflow hidden; seven panel dropdowns default to a record their Items does not contain; the save chain treats a failed Patch as a success; and roughly 200 lines of hand-written column arithmetic is both overwritten by the table compiler and stale, still paying for a Kind column that no longer has a header, a cell or a tables.json entry.

| Severity | Line | Control | Issue | Proposed fix |
|---|---|---|---|---|
| High | 436-524 | wkFilters | Child minimums 320+180+180+220+240 plus 5 gaps = 1180 with LayoutOverflowX Hide; body is about 828 at App.Width 900 and 936 at 1024, so Search and the unassigned count are unreachable | Wrap on with LayoutMinWidth per child, or drop the minimums so shares shrink |
| High | 316-434 | wkLifecycle | 4 x Max(Parent.Width*0.12, 240) plus 3 gaps = 984 > 828 compact body; Release clips with overflow hidden | Wrap to two rows, or lower the 240 floor |
| High | 1200,1233,1266,1299,1435,1470,1505 | wkField* | Default {Value:FormWorkNone} is {Value:""}, and EpicOptions, ItemSquadOptions, ItemPriorityOptions, OwnerOptions, FormWorkFeatureOptions, ItemSkillOptions, ItemSizeOptions carry no empty row, contra RUNBOOK "a record from Items" and the app's own row-zero pattern (WorkSquadOptions, ItemSprintOptions); Reset() restores an invalid default | Add a row-zero blank to each options formula |
| High | 1558-1625 | wkNewSave | IfError wraps the whole ; chain, so a refused Patch still runs ClearCollect, clears varWorkSaveError, closes the panel, Notifies "created" and Navigates before the handler sets the message | Put only the Patch in IfError and do the rest in the success branch (house pattern, copied from Team.pa.yaml:2327); opus, write path |
| Medium | 605-779, 883-1064 | wkHead*, wkRow* | Every X chain adds Max(Parent.Width * WorkShareKind, WorkMinKind) for a column with no header, no cell and no tables.json entry; the whole block is rewritten by compile-tables.mjs anyway (build shows 0.05/0.34, head width 1144 vs the app's 1154) | Delete WorkShare*, WorkMin*, WorkColsW, WorkTableMinW (22 named formulas) and let tables.json be the only width truth |
| Medium | 460,475,492,509,524 | wkKinds, wkSquad, wkState, wkCommitment, wkSearch | varWorkKind, Squad, State, Commit, Search are set here and read in Formulas.pa.yaml but never initialised in App.OnStart (only varWorkPhase is) and never cleared on leaving, so a stale filter can outlive the control's visible Default | Initialise all five blank in OnStart beside varWorkPhase |
| Medium | 799-1064 | wkRegister | No row hit target: only wkRowTitle is selectable; Command, Team and Timeline all put a transparent Classic/Button over the row | Add the inset focus-ring hit button per RUNBOOK section 4 accessibility |
| Medium | 214-314 | wkNewFeature, wkNewSpike, wkNewComponent | Three identical 14-line OnSelects (11 Reset calls each) differing only in one string | One button plus a menu, or hoist the resets into a shared handler |
| Medium | 328-433 | wkPhase* | Four 26-line blocks differing only by phase name, each re-running LookUp(WorkLifecycle, ...) twice | A horizontal gallery over WorkLifecycle, or a component |
| Medium | 1607 | wkNewSave | Set(varItem, LookUp('Work items', Title = ...)) re-reads the server and matches by title, picking the wrong row when two titles collide; Patch already returns the record | With({new: Patch(...)}, Set(varItem, new)); opus, write path |
| Medium | 1541-1557, 1592-1599 | wkNewError, wkNewSave | The same three-rule validation is written three times (Visible, Text, DisplayMode); DisplayMode carries four conditions | One wkNewError.Text and drive Visible and DisplayMode off wkNewError.Text <> "" |
| Low | 464, 481 | wkSquad, wkState | Width 180 bare literal where every sibling is Max(Parent.Width * share, min) | Match the sibling form |
| Low | 525-538 | wkUnassignedCount | No Width in an auto-layout row where every sibling states one; reads CmdUnassignedCount, a Command-prefixed formula on scrWork | State a Width; rename to WorkUnassignedCount |
| Low | 1066-1086 | wkCount | If(WorkRegisterCount = 0, "0", WorkRegisterCount) mixes text and number branches; CountRows already returns 0 | WorkRegisterCount & " of " & WorkTotalCount |
| Low | 1347-1520 | wkLblNewQuestion, wkLblNewParent etc. | Field slot indices collide (Question and Parent both at step 6, Timebox and Skill at step 7), safe only because Visible is exclusive; a Feature leaves slots 6-8 blank | Compute the slot from the kind, or comment the shared indices |

## Rules and checks to add
1. Fail a screen where an auto-layout row's children's minimum widths plus LayoutGap x (n-1) exceed the body width at App.Width 900 while its primary-axis overflow is Hide.
2. Fail any Width or X formula that names a *Share* or *Min* formula for a control the table compiler owns in tables.json.
3. Fail any *Share* or *Min* named formula whose column key has no matching entry in tables.json.
4. Fail any ModernDropdown whose Default record's value is not produced by the named formula in its Items.
5. Fail any Set(var...) in a screen file that has no matching Set(var...) in App.OnStart.
6. Fail any IfError whose first argument is a ; chain containing Notify, Navigate or a Set(var*Open, false).
7. Fail any gallery whose template contains an OnSelect that Navigates but no transparent hit button.
8. Fail any two sibling controls whose OnSelect bodies are identical after string-literal substitution.
9. Fail any control inside an auto-layout container that omits Width while a sibling states one.
10. Fail any screen referencing a named formula whose prefix belongs to a different screen.
