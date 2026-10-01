# Audit 06b: Quarter close screen

Sampled: lines 1-131, 131-430, 430-560, 652-960, 1096-1130, 2940-2972 in full, plus whole-file greps for Visible, OnSelect/OnChange/OnVisible, literal X/Y/W/H, varQc*, ComponentName, Classic/Button, IfError/Notify. Cross-read Formulas.pa.yaml 2250-2640, columns.json, tables.json, src/store/useDataset.ts:683-710. Not read line by line: the cell bodies of Compare, Calibration, Outlook and Archive (1348-2940), which are compiler-owned per tables.json.

Summary. The shell, band, tiles and the five declared tables are clean and token-driven: no literal geometry beyond 0/8 offsets, every colour and size a token, columns bind against columns.json, no hand-built copy of a component. Two things dominate. First, roughly 707 lines (seven panels, Compare and Calibration) are unreachable: qcTabs.Items dropped both tabs on 20 Sep and the panels were left behind with Visible on a value that can no longer be selected, along with 24 named formulas and two QcCountLine branches. Second, the close at 857-905 is a bare sequence of writes with no error handling, no re-entrancy guard, an order that disagrees with the store it mirrors, and an unconditional clearing of 'Current quarter'.

| Severity | Line | Control | Issue | Proposed fix |
|---|---|---|---|---|
| High | 857-905 | qcConfirmBtn | No IfError. A failure after the snapshot leaves archive rows, work items and quarter flags half-written, and line 904 still Notifies success. RUNBOOK section 4 Errors requires IfError and FirstError.Message. | Wrap the whole body in IfError, set varQcError, show it on the card, Notify success only in the non-error branch. |
| High | 895-899 | qcConfirmBtn | 'Current quarter': false is unconditional; the advance is If(!IsBlank(varQcNext), ...). With no next quarter the app has no current quarter, CurrentQuarter (Formulas:57) goes blank and every screen's formulas break. qcSnapNext (722-731) tells the user the opposite. | Put both Patches inside one If(!IsBlank(varQcNext), ...), or stamp only 'Closed on' when there is no successor. |
| High | 861-893 | qcConfirmBtn | Order is snapshot, archive, mark Done; useDataset.ts:697-702 runs markEndedDone first. Archived rows take pre-marking StateName and CloseStatus "Done" instead of "Done on time" or "Done late", and the snapshot's Delivered and In-plan MW are pre-marking figures. The comment at 838 asserts the store's order and is wrong. | Move the ToMarkDoneRows pass first, re-ClearCollect(colWork, 'Work items') before the snapshot, then archive. |
| High | 1348-2054 | qcCompareHead, qcCompare, qcCompareEmpty, qcCalHead, qcCalibration, qcCalibrationEmpty, qcCalTotal | Dead: QcTab can never be "Compare" or "Calibration" (Items at 316-318). About 707 lines, plus 24 QcCm*/QcCa*/CompareRows/CalibrationRows/QcHasPrior/QcPrior* formulas and two dead QcCountLine branches. | Delete the panels, their formulas and the two Switch branches; the comment at 311-315 records how to restore them. |
| Medium | 857 | qcConfirmBtn | No re-entrancy guard: the button stays Edit for the whole run and ToArchiveRows reads colWork, unchanged until line 903, so a second press archives every row again. | Set(varQcConfirm, false) and disable as the first statement. |
| Medium | 873, 881, 885 | qcConfirmBtn | Three ForAll passes each doing LookUp('Work items', Title = A.Title): matches on a non-key text column (duplicate titles patch the wrong row) and costs one round trip per row; two passes iterate the same source. | Carry the work-item record in ToArchiveRows/ToMarkDoneRows, merge the two archive passes, use the bulk Patch(DS, baseTable, changeTable) form, one Patch per table. |
| Medium | 25-27 | scrQuarterClose | No OnVisible. varQcConfirm and varQcTab persist across navigation: return to the screen and the destructive confirm is still armed one click away, and qcTabs disagrees with whichever panel QcTab shows. | OnVisible: Set(varQcConfirm, false); Set(varQcTab, ""); Reset(qcTabs). |
| Medium | 221, 363 | qcBand, qcTiles | Wrap thresholds test App.Width but the containers are inset by the rail and two paddings. With the rail expanded near 950-1000px the stats wrap to a second row while Height stays BandH and LayoutOverflowY is Hide, so the second row is clipped. | Compare Parent.Width against the same minimums, or derive from NavW and Pad. |
| Medium | 745, 801-819 | qcGuard, qcCloseBtn | QcEarly is advisory only; QcGuardLine offers "or force the close" and no force affordance exists. | Gate qcCloseBtn.DisplayMode on !QcEarly with an explicit force toggle, or drop the wording. |
| Medium | 863, 874 | qcConfirmBtn | Neither the snapshot nor the archive rows write Team, though both tables carry the lookup. When includeScope flips, every closed-quarter record becomes invisible to scoped reads. | Patch Team on both. |
| Low | 652-735 | qcSnapCard | Content sums to about 242px in a card stretched to about 482 at 1080; RUNBOOK calls empty vertical space in a card a defect. | Give it the remaining space with a list, or drop the card to content height and let a sibling flex. |
| Low | 813, 832 | qcCloseBtn, qcCancelBtn | Width 180 and 100 literals beside a sibling using Max(Parent.Width * 0.13, 220). | Same Max(Parent.Width * f, min) form. |
| Low | 857-858 | qcConfirmBtn | varQcQuarter and varQcNext are OnSelect scratch kept as globals holding stale records; varQcNext duplicates QcNextQuarter (Formulas:2574). | Use With({ q: ..., n: QcNextQuarter }, ...). |
| Low | 581, 2647 | qcArchiveEmpty, qcArchiveEmptyTab | Two near-identical names on different tabs distinguished by an arbitrary suffix; likewise qcArchiveList vs qcArchive. | Rename the close-tab pair qcToArchive*. |
| Low | 501, 614 | qcDoneRowState, qcArchiveRowState | Break the qcXxRow* two-letter convention every other table follows. | qcDnRow*, qcToArRow*. |
| Low | 428-651 | qcDoneCard, qcArchiveCard | The same card built twice: title, empty label, two-column badge and title gallery, identical 14-property Labels. | One component taking title, empty text and Items. |
| Low | 468, 581, 1096, 1602, 1751, 2192, 2647 | Empty labels | Seven empty-state Labels repeating the same 14 properties. | One cmpEmpty component. |
| Low | 1348-2054 | qcCompare, qcCalibration | The only two tables on the screen not declared in tables.json (listed under pending, tables.json:1414). | Moot once the dead panels go. |

## Rules and checks to add

- Every Visible of the form QcTab = "X" (any screen's tab variable) must have "X" present in the owning tab list's Items; fail otherwise.
- Any OnSelect containing Patch, Remove, Collect or ClearCollect must be wrapped in IfError.
- No Notify(..., Success) outside the success branch of an IfError in a write-path OnSelect.
- A write-path OnSelect clears or disables its own arming variable before its first write.
- A Patch setting a singleton flag false and the Patch setting it true elsewhere sit under one If.
- No LookUp(datasource, textcolumn = ...) inside a ForAll in a write path.
- A wrap threshold or right-edge test compares Parent.Width, never App.Width.
- Every screen that sets a behaviour variable in a control resets it in OnVisible.
- A named formula with zero readers across power/app fails preflight.
- Every Patch into a table carrying a Team lookup sets Team.
