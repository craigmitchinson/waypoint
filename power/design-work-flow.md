# The work flow, end to end

The live design, adopted 22 September 2026. This supersedes the previous version and `power/design-work-item-stages.md`, which has been deleted.

Nothing here is built.

The previous draft was internally inconsistent in five places and silent in four more. Section 1
lists what changed and why, so a reviewer can disagree with a decision rather than hunt for it.

## 1. What changed from the previous draft, and why

1. **Assign moves to the Intake tab and is called "Send for assessment".** The previous draft put
   the assign control on the Assess tab (section 3) and also named Assign as the Intake tab's
   forward action (section 6). Both cannot be true. The transition out of Intake now lives on the
   Intake tab, under one name used everywhere, including in the code. The interaction is unchanged:
   a person picker defaulted to the signed-in person, and choosing nobody assigns me.

2. **Five stages, not six.** Committed and In delivery were separate steps with no transition
   between them, no gate and no owner, so the stepper showed a step nobody could move an item to.
   Commitment is the transition into Delivery, not a stage of its own. `wp_commitment` still records
   Proposed against Committed and still drives the commit calls; it is a property of the item, shown
   as a badge, not a step on the stepper.

3. **An item can be stopped.** There was no exit except success. Decline existed on the request but
   not on the work item, so anything promoted had to be delivered or left to rot in the queues. Stop
   is now available from Intake, Assessment and Delivery, with a reason, and removes the item from
   every queue and every attention count.

4. **A spike ends at Concluded and is never asked to validate benefits.** The previous draft ran
   spikes through the same five stages, which meant asking for actuals against benefit claims a
   spike does not have. Spikes now run a shorter track that ends when the question is answered.

5. **A feature cannot be committed without at least one benefit claim.** The awaiting-validation
   queue was defined as items with a claim lacking an actual, so an item with no claims was never
   chased and could be validated vacuously. Requiring the claim at commit closes it at the right
   moment: capacity is not committed to something with no stated value.

6. **The commit form shows capacity and warns when it goes negative.** This is a capacity planner,
   and the previous gate checked only size and assessment. Over-commitment stays possible, because
   it is sometimes right, but it becomes a recorded decision with a note rather than an accident.

7. **Components inherit the feature's assessment and commitment.** Open question 5 in the previous
   draft was not optional, because release depends on components being finished. They are now
   defined as carrying a state and assignments only.

8. **The stepper is built third, not last.** It was unit 9, while unit 6's acceptance criterion
   already required it. It is also the thing that makes every other unit checkable by eye.

## 2. The actors, and what each is asked for

This is the section to read if you only read one. Each actor has one place to look, one thing they
owe, and one action that moves work on.

| Actor | Where they look | What they owe | Their one action |
| --- | --- | --- | --- |
| Requester | The requester app or the SharePoint list, never Waypoint | A title, the problem, the outcome they want, and a benefit estimate | Submit |
| Product owner, screening | Front door queue on the Front door screen | A decision on each new request | Promote to feature, Promote to spike, or Decline |
| Product owner, shaping | My items in Shaping, on Work | Priority, outcome, and at least one benefit claim for a feature | Send for assessment |
| Engineering, assessing | Unassessed items, on Work | Size, skills, components, risks and notes | Commit |
| Engineering, delivering | Commit calls on Command | Assignments with dates, and state as work moves | Mark released |
| Squad member | My assignments, on Timeline and Team | Their state changes on the work they hold | None; they do not move the item's stage |
| Product owner, validating | Awaiting validation, on Benefits and in Command's attention list | An actual against each benefit claim | Validate |

Two rules hold everywhere. An actor is never asked for something the previous actor should have
given, which is what the gates enforce. And an actor is never shown a queue that is empty: every
block above hides itself at zero.

## 3. The stages

| Stage | Who acts | Backed by | Leaves by |
| --- | --- | --- | --- |
| Intake | Product owner | `wp_phase` = Shaping | Send for assessment |
| Assessment | Engineering | `wp_phase` = Assessment | Commit |
| Delivery | Engineering and the squad | `wp_phase` = Delivery | Mark released |
| Released | Product owner | `wp_phase` = Release | Validate |
| Validated | Nobody; terminal | `wp_phase` = Validated | Nothing |
| Stopped | Nobody; terminal until reopened | `wp_phase` = Stopped | Reopen, with a note |

Four forward transitions for five stages, which is the count it should be. Every transition has one
owner, one button, one gate and one Activity row.

Backward moves are Return to shaping, from Assessment, and Reopen, from Released, Validated or
Stopped. Both require a note. Nothing else moves an item backwards.

The item screen carries that one forward move in a Next step card at the top of the right rail,
above At a glance, so the stage's next action is in the same place whichever tab is open. The card
holds a kicker, the stage's single primary button, and the gate's own words beneath it when
something is missing; the tabs themselves hold no forward button and no gap line. A terminal stage
has no forward move, so the card offers Reopen instead: a reason field and a secondary button. At
any stage there is exactly one primary button on the screen, and it is in this card.

## 4. The two tracks

A feature and a spike are different work and stop pretending otherwise.

**Feature.** Intake, Assessment, Delivery, Released, Validated. It carries benefit claims,
components and actuals.

**Spike.** Intake, Assessment, Delivery, Concluded. It carries a question and an answer. It has no
components, no benefit claims and no validation step. Concluded is the Release phase with a
kind-dependent label, so no extra option is needed and nothing that reads Release breaks.

The stepper renders the track for the item's kind: five steps for a feature, four for a spike. The
gates that mention benefit claims apply to features only.

## 5. Intake

**Who acts.** The product owner.

**How work arrives.** Two ways, and an item records which in `wp_source`, a choice of Front door,
Direct and Jira, editable after creation.

Through the front door, a requester app or SharePoint list writes `wp_request`. The Front door
screen in Waypoint is the screening queue and nothing else: `wp_request` rows with status New or
Screened, oldest first, carrying Screen, Promote to feature, Promote to spike and Decline. The
request form itself is not in Waypoint.

Promote creates a work item in Shaping with the kind from the button, `wp_source` = Front door, and
the team, product owner and title carried across. The problem statement goes to `wp_question` for a
spike or `wp_notes` for a feature. The requester's benefit estimate becomes a `wp_benefitclaim` row.
It then writes `wp_status` = Promoted, `wp_screenedbyid`, `wp_screenedon` and `wp_promotedtoid` back
on the request.

The queue is no longer a section of its own. The rail does not list the front door; its queue is a
card at the top of Command's decisions column, hidden when nothing is waiting, six rows tall at most
with an "and n more" line under it. A row carries the request, the requester, the date it was
received and the benefit the requester claimed, and it opens the Front door screen on that request.
Promote on the card opens the same screen's screening panel, where the two promotion writes stay in
one place. Reject on the card opens a reason field in the card's foot: a reason is required, and the
confirm writes `wp_status` = Declined, `wp_declinereason` and an Activity row, which is what the
screen's own Decline now writes too. The Front door screen stays as the detail view behind the card,
reached from a row and left through the rail.

Direct, a product owner adds the item on Work with the new-work form, which offers Feature and Spike
only. Component is not a choice here; a component is created from its parent.

**What the product owner owes.** Title, kind, problem and outcome, priority, product owner, and for
a feature at least one benefit claim. The squad is not asked for here; it is chosen at assessment. Components can be added at creation and at any
point afterwards.

**Forward action: Send for assessment.** One button, and no picker: the submission names nobody and
no squad. It moves the phase to Assessment, sets the state to Ready, and writes an Activity row.

**Gate.** Disabled until there is a product owner and a priority. For a feature, also until there is
at least one benefit claim. The disabled button carries the reason beside it, naming what is
missing.

## 6. Assessment

**Who acts.** Engineering, in the person named by Send for assessment. Reassignment is the same
control, used again.

**What they owe.** Size (`wp_sizeid`, with `wp_sizeoverride` where the band does not fit), skills
(`wp_skillid`), components confirmed or added, risks and notes. Saving stamps `wp_assessedon`.

**Forward action: Commit.** It writes `wp_commitment` = Committed, `wp_phase` = Delivery, the sprint
span from the commit form, and an Activity row.

**Gate.** Disabled until `wp_sizeid` or `wp_sizeoverride` is set and `wp_assessedon` is not blank.
The reason sits beside the button.

**Capacity on the commit form.** The form shows the squad's committed and free capacity across the
chosen span, from the same figures Command uses. When the commitment takes free capacity below zero
the form warns and requires a note, which goes on the Activity row. It does not block. Over-
commitment is sometimes the right call and should be visible rather than prevented.

**Where Commit lives.** Two places, one formula, one write: the item's Assess tab, and Command's
commit calls over the ready-not-committed list. No third copy.

**Other exit.** Return to shaping, with a note. Stop, with a reason.

## 7. Delivery

**Who acts.** Engineering holds the item. The squad holds the work.

**Assignments.** `wp_assignment` is the single write path for people: `wp_personid`,
`wp_workitemid`, `wp_from`, `wp_to`, `wp_typeid`. The Assignees slots and the `wp_assignee` table's
use on the work item screen are retired. Timeline stays read-only and shows a bar per assignment
row, per the decision already recorded in `decisions.md`.

**Components.** A component is a work item with `wp_kind` Component and `wp_parentid` set to the
feature. It inherits the feature's assessment and commitment and has no Assess or Value tab of its
own. It carries a state and assignments. Adding a component to a feature that has been released is
blocked; reopen the feature first.

**Forward action: Mark released.** The engineering lead sets the Released state, which moves
`wp_phase` to Release and writes an Activity row. Jira does not drive this yet; a Jira status trigger
is a later unit.

**Gate.** None, but the button warns when components are still open and names how many. Releasing
with open components is allowed and recorded.

**Other exit.** Stop, with a reason.

## 8. Released, and validation

**Who acts.** The product owner.

**For a spike** the stage is labelled Concluded and the track ends here. The answer goes in the
notes. There is nothing further to do and the item appears in no queue.

**For a feature**, Awaiting validation is a queue of Release-phase items with at least one benefit
claim lacking an actual. Because a claim is required at commit, every released feature reaches this
queue. It appears in two places reading one formula: a block on Benefits, and a line in Command's
attention list with a count, hidden at zero, ordered oldest release first so the longest wait is at
the top, naming the product owner on each item.

**What the product owner owes.** An actual against each claim: `wp_benefitactual.wp_value`,
`wp_when`, an optional `wp_note`, and `wp_claimid` pointing at the claim.

**Forward action: Validate.** Enabled only when every claim has an actual. It writes `wp_phase` =
Validated, `wp_validatedon`, and an Activity row.

**After Validated.** The item is terminal. A later correction is made by Reopen, with a note, which
returns it to Release and back into the queue. Actuals are never edited silently.

## 9. Stopped

Available from Intake, Assessment and Delivery, to the actor who holds the item at that stage. It
requires a reason, which goes on the Activity row and is shown on the item.

A stopped item leaves every queue, every attention count and every capacity figure. It keeps its
assignments as history but they no longer consume capacity from the day it stopped.

Reopen returns it to Shaping with a note. Stop is not deletion and nothing is removed.

**What the Work list shows.** Eleven columns at 1920, left to right: Priority, Title with its
second line, Type, Squad, Assessor, Delivery, State, Commitment, Size and MW, Sprints, Jira key.
Type is a badge reading Feature, Spike or Component, so the kind is words and not a colour. The
second line under a title names the parent first: a component reads "part of" its feature, as does a
spike linked to one, and the epic follows after a middot. The product owner is not a column; at 1920
the eleven above take the width without squeezing a cell, and the owner is on the item screen. Three
columns answer who holds the item: Squad, Assessor, and Delivery, which names the first person
assigned and counts the rest as " +n". Each of the three reads TBC where the answer has not been
given yet, never a dash and never a blank, because an unanswered question should read as one. The
filters match: the squad list carries a TBC row for the items no squad has been chosen for, and a
Person list, every person as "Squad · Name", matches the assessor or anyone the item is assigned to.

**Both terminal stages on the Work page.** The stage strip carries a fifth tab, Closed, holding
every Validated and Stopped item. An item is filed by its Phase first: the two terminal phases go to
Closed whatever the work state says, and everything else keeps the state-derived stage the four live
tabs already used, so their membership does not move. The Closed tab shows a count and no member
weeks, because closed work charges no capacity. Its rows read as the other tabs' do, except that the
State column names the end the item reached, Validated or Stopped, and the default order is most
recently modified first. The squad, state, commitment and search filters apply unchanged.

## 10. The item screen

Four tabs: Intake, Assess, Delivery, Value. Activity is always visible. Earlier stages are read-only
once passed. A spike has no Value tab.

`cmpStepper` shows the track for the item's kind. The current step is unmistakable: filled marker,
semibold label, and the step name repeated in the header. Completed steps are ticked, future steps
are dimmed, and colour is never the only signal. A stopped item shows the stepper greyed with a
Stopped marker in place of the current step.

Each tab has exactly one forward action and it is the only primary button on that tab: Intake has
Send for assessment, Assess has Commit, Delivery has Mark released, Value has Validate. Stop, Return
to shaping and Reopen are secondary actions and never primary.

Every transition writes an Activity row with who, when, from, to and note. A note is required on
every backward move and on Stop, and optional elsewhere.

Sending an item for assessment is a submission, not an assignment: Intake asks for neither a squad
nor an assessor. Both are chosen on the Assess tab, in an Assessor row with a people picker, an
Assign to me and a squad picker beside them, saved by Save draft and read by the commit gate, which
refuses until the item has a squad. Until then the squad reads TBC wherever it is shown. Every tab saves
a draft at any time, with one Save draft button that never gates; a gap is said once, beside the
forward action it blocks, and nowhere else. People pickers name the squad before the person. The
capacity card on Assess answers one question in three figures: the MW the item's size charges, the
MW its assignments carry between them, and the MW still unassigned. Each tab's card scrolls itself
rather than cropping its last section.

## 11. Model changes

Two new options on `wp_workitem_wp_phase`, keeping the four that exist: Validated (100000004) and
Stopped (100000005). Nothing is renamed, so no formula reading Shaping, Assessment, Delivery or
Release breaks.

Three new columns: `wp_assessedon`, `wp_validatedon` and `wp_stoppedreason`.

`wp_source` is already present in `power/canvas/columns.json`, so unit 1 verifies it rather than
creating it, and adds only what is missing.

## 12. Build plan

Each unit is one screen or one concern, and each ends in a build to try.

| # | Unit | Acceptance |
| --- | --- | --- |
| 1 | Model: two phase options, three columns, `wp_source` verified | The options import; the columns exist; no formula reading the existing four phases changes |
| 2 | Retire the Assignees slots on the work item screen | Only `wp_assignment` rows are written or read for people; the readout agrees with Timeline |
| 3 | `cmpStepper`, kind-aware | Five steps for a feature, four for a spike, stopped state rendered; current stage clear without colour alone |
| 4 | Intake: source, kind, components, and Send for assessment with its gate | Both channels set source; the gate names what is missing; the transition writes assessor, squad, phase and Activity |
| 5 | Assess tab: fields, `wp_assessedon`, and the Commit gate | Commit disabled with a reason until size and assessment are set |
| 6 | Commit form capacity readout and the over-commitment note | Free capacity for the span is shown; going negative warns and requires a note |
| 7 | Command commit calls on the same gate | The Command button and the Assess button share one gate formula and one write |
| 8 | Front door screen reduced to the screening queue | No request form in Waypoint; Screen, Promote and Decline write the request columns named above |
| 9 | Mark released, with the open-component warning | State and phase move; the warning names the count; a spike shows Concluded |
| 10 | Value tab actuals and Validate | An actual per claim; Validate enabled only when all are covered; `wp_validatedon` written |
| 11 | Awaiting validation queue, Benefits block then Command line | Both read one formula, hide at zero, oldest first |
| 12 | Stop and Reopen, from every stage that allows them | Reason required; the item leaves every queue and every capacity figure; Reopen returns it to Shaping |

Units 1 to 3 are the spine. Nothing after them is worth building until the stepper shows the truth,
because every later unit is checked by looking at it.

## 13. Still open

1. Who may mark an item released: the engineering lead alone, or any assignee?
2. May an item skip Assessment when a spike has already sized the work, and if so what writes the
   size?
3. Does a stopped item keep its place in priority order if reopened, or return to the bottom?
4. Does changing `wp_source` after creation need a note, or is a silent edit fine?
5. When a feature is reopened from Validated, do its existing actuals stand, or are they superseded?
