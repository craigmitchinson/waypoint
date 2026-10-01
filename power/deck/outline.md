# Waypoint playback: deck outline

`scripts/build-deck.mjs` reads this file and writes `power/deck/Waypoint-playback.pptx`, so a copy
edit here regenerates the deck. Keep the headings in the form `## <n>. <title>`.

Fields under each heading:

- **Part**: starts a new section. Put it on the first slide of the section only; the script inserts
  a divider before that slide and carries the name into the eyebrow of every slide after it.
- **Idea**: the one line that goes under the headline. This is what the slide says.
- **Body**: the prose. This goes into the speaker notes, not onto the slide. Write as much as you
  want here; it never crowds the layout.
- **Visual**: the key in backticks tells the script what to draw. Anything after it is a note that
  appears above the visual.
- **Callout**: one line in a band above the visual, for the fact the slide would be poorer without.
- **Points**, **Hero**, **Stats**, **Left**, **Right**, **Decision**, **Shots**: content for the
  visual, as each key below requires.

Visual keys: `cover`, `metrics`, `statement`, `bullets`, `split`, `close`, `diagram-a`, `diagram-b`,
`diagram-c`, `build-strip`, `screenshots`.

`build-strip` reads `power/tests/evaluation-log.md` directly, so the slide cannot drift from the log.
`screenshots` takes `before | after | caption` lines under **Shots**, and draws an empty frame when
the after file is not there yet.

---

## 1. Waypoint on Power Platform

**Idea:** A capacity planner, generated from source files in 48 hours.

**Body:** This is a playback of a weekend build. The question was not whether we could build a
capacity planner, it was whether the whole thing could be generated, checked and imported from files
under version control, with the browser used for judgement rather than for assembly.

**Visual:** `cover` Craig Mitchinson · Intelligent Process Automation · 21 September 2026

---

## 2. The result

**Part:** What we built

**Idea:** A working capacity planner on Dataverse, generated end to end.

**Body:** Waypoint plans people against work across a quarter, and it now runs on Dataverse as a
canvas app assembled from YAML. It writes real records. Numbers match the workbook. Everything on
this slide was generated and imported by script, not laid out by hand in the browser. The figures
are as at 21 September.

**Visual:** `metrics` Generated and imported by script. Nothing on this slide was laid out by hand.

**Hero:** 48 hours | from a model file to an app that writes real records

**Stats:**
- 10 | screens | all generated from source
- 27 | tables | 319 seed rows, loaded in 57 seconds
- 925 | named formulas | bound offline before every import
- 21 | preflight checks | standing between a change and an import
- 26 | logged builds | each with its claim and its actual

---

## 3. The ambition

**Idea:** Build a Power Platform app from source files rather than by clicking it together.

**Body:** Waypoint plans a team's capacity. It exists as a workbook and as a React prototype, and it
needed to run on the Power Platform. The question was whether the whole thing could be generated,
checked and imported from files under version control, with the browser used for judgement rather
than for assembly.

**Visual:** `bullets` The three artefacts the build starts from.

**Points:**
- Workbook: the original, and still the numbers we answer to
- React prototype: the design and the engine, written down
- Model file: 27 tables, 209 columns, 43 relationships

---

## 4. The setup

**Part:** How it works

**Idea:** Work moves through named roles, and each role runs on the cheapest model that can do it.

**Body:** An orchestrator plans and briefs, but never edits. Four roles run on the cheapest model:
scribe keeps the written record, runner executes commands and reports them verbatim, explore finds
where things live, test runs the suite and returns only failures. None of them designs or judges.
Building and reviewing run on the middle model by default and escalate to the top one only for typed
Power Fx, the C# tools, a write path, security, or a retry after a failure. The orchestrator picks
the row from a table rather than by feel, and Studio decides what is true.

**Visual:** `diagram-a` Roles by the model they run on, from the runbook's own table.

---

## 5. How a unit moves

**Idea:** Every change follows the same path, and the gates are the same every time.

**Body:** A unit starts as a brief with an exact file scope and a turn budget. The worker refuses it
if it is wider than one concern. The build runs, preflight runs its checks, a reviewer reads the
result, the import goes in as its own unit, and the log takes the row. No step is skipped for a
small change.

**Visual:** `diagram-b` The pipeline, with the 21 preflight checks grouped by what they protect.

---

## 6. Rules, not patches

**Idea:** A defect that can return has not been fixed.

**Body:** When something breaks, the fix is not enough on its own. The cause becomes a written rule,
and the rule becomes a check that fails before the next import. That is why the preflight list grew
from nothing to 21 checks in two days, and why none of the classes below has come back.

**Visual:** `bullets` Defect, then the rule and the check it became.

**Points:**
- Connections lost on push: refresh the skeleton first, and refuse to pack without data sources
- Unknown property PA2108: a per-control deny list, read before packing
- Code component dropped: compare the whole package, not the part we author
- Numbers drifting from the workbook: parity runs as a gate

---

## 7. Proof by computation

**Part:** What it proves

**Idea:** The only proof a number is right is running the formula that produces it.

**Body:** The checker gained an offline evaluator that runs the app's own formulas against the seed
data and compares the result with the workbook fixture. Net 221.02 member weeks matched, and so did
every squad figure. It also found a real defect nobody had seen: team-held capacity was not being
attributed to anyone. Parity now runs before every import.

**Visual:** `bullets` What parity covers, and what it does not.

**Callout:** Net 221.02 member weeks matched the workbook, and so did every squad figure. Parity also found a real defect nobody had seen: team-held capacity attributed to no one.

**Points:**
- 17 fixture cases, tolerance 0.005, pinned to the workbook's own day
- Covers the Command band, the squad figures, delivery and benefit
- Does not cover live rows, delegation, security roles or the clock
- A gate before import, not a substitute for opening the app

---

## 8. The evaluation log

**Idea:** A big number now means one known class, not many unknown problems.

**Body:** One row per import, written the same way each time: what the build was meant to fix, what
the offline gates said, what the round trip did, what Studio reported, what Craig saw in the app.
The verdict compares only two numbers against the row above, so a build reads better only if those
two say so. On the first afternoon the errors were not countable, and nobody could say what they
had in common. Every count since is one class repeated across many controls, which is one fix and
then one check. The strip is read from the log at build time, so it cannot drift from the record.

**Visual:** `build-strip` Every import, coloured by what Studio reported.

**Callout:** The first afternoon's errors were too many to count and had nothing in common. Every count since is a single class: the 27 is one property on 27 controls, fixed once, and a check now fails before an import can repeat it.

---

## 9. What holds, and what is open

**Idea:** The generated path is proven offline and partly proven in the browser.

**Body:** The parts we were least sure of are the parts we would now trust with another app. Each of
those ran more than once and gave the same result, which is what makes them worth keeping rather
than worth remembering. Against that, some items are ours to close and some belong to the platform.
None of them is a surprise, and each has a next action written against it.

**Visual:** `split` Run more than once, against open items with an owner.

**Left:** Holds
- The solution generated from one model file, imported as a single unit
- Seed data from the app's own export, repeatable and byte-identical
- The YAML round trip: download, write, pack, import, open, with no rewritten formula
- The offline checker reproducing Studio's own messages in seconds

**Right:** Open
- A closed-source platform: some property names are only knowable by trying them
- Checker gaps: a gate cannot see what it cannot compile
- Live saves: two of the forms have written to Dataverse, the rest are untried
- Security roles: portal work, and the pipeline cannot do it
- The requester app: designed, parked behind a flag, not yet decided

---

## 10. What the next app costs

**Part:** What it means

**Idea:** The next app inherits the pipeline, not just the lessons.

**Body:** The scripts, the offline checker, the runbook and the 21 checks are the template. A second
app on this platform skips the two days we spent finding out what the platform rejects, because
every rejection is now a check that fails before an import rather than a round trip that costs
twenty minutes.

**Visual:** `bullets` The estimate, with its assumptions on the slide.

**Points:**
- Honest estimate for a comparable app: days rather than weeks
- The first day goes on the model file; that part does not compress
- The expensive part was Studio round trips, and the checker removes most of them
- Assumes the same environment, the same control set, and a model file already written
- Assumes the reference corpus and the checkers carried over unchanged

---

## 11. The platform model

**Idea:** One journey, from the request arriving to the benefit landing.

**Body:** Today a request arrives on a form, somebody decides, and the thread ends in a mailbox. The
planner never sees the request that became the work. The hierarchy puts both on one Dataverse: a
platform holds labs, a lab holds teams, a team holds squads. A promoted request keeps its link back
to the work item.

**Visual:** `diagram-c` The hierarchy, and the journey from front door to benefit.

---

## 12. The decision, and next steps

**Idea:** The near work is finishing what is proven offline but not yet proven in the browser.

**Body:** The near work is finishing what is proven offline but not yet proven in the browser. The
decision to take away is whether the front door and the requester app become the next unit of work,
because that is what turns a planner into a system that starts at the request.

**Visual:** `close` What happens next, and what is needed from the room.

**Decision:** Does the front door become the next unit of work? That is what turns a planner into a system that starts at the request rather than at the work item.

**Points:**
- Add the four hierarchy tables in Studio and turn the front door on
- Exercise the remaining live saves in the player
- Two security roles, mapped to Entra groups
- Decide on the requester app as a separate surface
- Take the pipeline to the next app on the platform

---

## 13. Context discipline

**Part:** Appendix: the method

**Idea:** Knowledge lives in files, not in anyone's memory of a conversation.

**Body:** A brief carries everything the unit needs, because nothing else reaches it. Reports come
back short, so the next brief stays small. The Microsoft reference corpus is indexed and grepped
rather than recalled. What the app is made of, screens and tables and formulas and the rules they
obey, sits in the runbook where every unit reads the same copy.

**Visual:** `bullets` Where each kind of truth is kept.

**Points:**
- `power/RUNBOOK.md`: the contract every unit gets verbatim
- `power/canvas/columns.json`: columns, read from the imported solution
- `CONTROLS.md`: control names, captured out of Studio
- The skeleton: downloaded fresh before every build

---

## 14. Studio is the last word

**Idea:** Property names are settled by the platform, never by a brief.

**Body:** The YAML behind a canvas app uses tokens Studio writes, which the documentation does not
carry. We asserted two on a container and Studio rejected both with PA2108, twice over. The lesson
is now a rule: no brief may name a property Studio has not already written. What Studio has written
is captured where any unit can read it.

**Visual:** `bullets` What PA2108 taught, and where that knowledge sits now.

**Points:**
- The sample screen: one of every control, placed in Studio and read back
- `CONTROLS.md`: identifiers and versions as Studio emits them
- `control-properties.json`: what each control type refuses
- Display labels in the docs are not the property names in the file

---

## 15. The scroll-bar hunt

**Idea:** Diagnose from the pixels, not from the assumption.

**Body:** Scroll arrows appeared on text that plainly fitted. Two rounds of height fixes changed
nothing, because the text was never the cause. Nor were the containers alone. The real cause was the
modern Text control's own line-box tolerance. All 641 text controls were swapped to the classic
label by script, and the modern control is now denied outright. The player confirmed it the same
night: scroll bars gone on every screen.

**Visual:** `screenshots` The same screen, before the swap and after it.

**Shots:**
- screenshots/1/Screenshot 2026-09-20 091217.png | screenshots/2/command-after.png | Command, 20 September 09:12. Scroll arrows on text that fits, and the capacity band clipped mid-word. All 641 text controls were swapped in one unit; the modern Text control is now on the deny list, so the class cannot return.

---

## 16. Workers that say no

**Idea:** A refusal is the system working, not the system failing.

**Body:** Every worker and reviewer carries a scope guard: one screen file, or one concern, and a
turn budget it must report against. Overnight, five briefs came back refused with the split they
would accept instead. Each refusal was correct. A wide brief exhausts the turn limit on every model
we have tried, and leaves half-finished work nobody has recorded.

**Visual:** `bullets` What the guard refuses, and what it asks for instead.

**Points:**
- More than one screen file in scope: split by screen
- More than one concern bundled: split by concern
- No turn budget given: the brief comes back unstarted
- A partial result reported beats a silent overrun

---

## 17. Drift and hallucination

**Idea:** Meaning drifts at the hand-offs, and each place needs its own guard.

**Body:** A model's output is confident by construction, which is not the same as checked. Drift
happens where one unit hands to another, where a report stands in for the thing it describes, and
where a description of the platform gets treated as the platform. The guard is never a sharper
reviewer. It is removing the conditions that produce it.

**Visual:** `bullets` Each drift, and what stops it.

**Points:**
- Display labels read as property names: capture the token from Studio
- A claim standing in for an actual: gates compile, and the log records both
- A brief scoped by implication: explicit file scope and a do-not-touch list
- A later unit undoing an earlier decision: conventions live in the runbook

---

## 18. Decisions made with the user, not for them

**Idea:** Decide the product in words before building the screen twice.

**Body:** An evening of decisions, each recorded with Craig's own reasoning. The spine of the app was
settled first: which screen answers which question. Then the rule that no action has two front doors.
Then what to cut, and what to hide rather than delete so that nothing is lost and nothing is in the
way.

**Visual:** `bullets` Four of the ten, with the reasoning kept.

**Points:**
- The spine: stage on Work, assess on the item, decide on Command, close on Quarter close
- No booking concept: people are assigned from the work item
- Non-work time is one typed absence form, for one person or many
- Timeline is read-only, so assignment stays in one place
