# Waypoint on Power Platform: decisions

The choices behind `data-model.md` and `build-guide.md`, the reasons for them, and the questions still
open. Written for a maker and a solution architect who have not seen the React mock.

## Canvas app, not model-driven

**Decision: a canvas app on Dataverse.**

Waypoint is a planning surface, not a record-management surface. Six of its ten screens are dense
compositions that a model-driven form cannot produce: a brand band of six figures, a decisions list
grouped and collapsible, a timeline grid of people by week, a twelve-month benefit calendar, a close
summary, and a five-step import wizard. The mock already fixes the layout to a 1600 x 900 canvas and
scales it to fit, which is exactly what a canvas app does.

Two further reasons. The engine is arithmetic over the whole dataset, so the screens need collections
in memory and named formulas over them; canvas gives that directly, where a model-driven app would
need a PCF control per surface. And the mock's own Power Apps preview mode is already drawn as a
canvas app with Fluent 2 modern controls, so the design work is done.

What is given up: the model-driven advanced find, the built-in audit and command bar, and free
responsiveness. The advanced find is replaced by the Plan register's filters, the audit by the
Activity log table, and responsiveness is not wanted here because the grid needs a fixed width.

A model-driven app is still worth building **alongside** it, cheaply, as the administrative back door:
reference data maintenance, the activity log, and anything that goes wrong at three in the afternoon.
That costs a day and no design.

## Dataverse, not SharePoint lists

**Decision: Dataverse.**

Five reasons, in order of weight.

1. **Relationships.** The model has 31 lookups, four of them self-referencing on the work item.
   SharePoint lookups do not cascade, cannot restrict, and break under list view thresholds.
2. **Alternate keys.** The import is made idempotent by a three-column key on Absence. SharePoint has
   no equivalent; the flow would have to query for every row.
3. **Choices with stable values.** The engine compares state impacts and kinds literally. Dataverse
   global choices keep label and value together across environments; SharePoint choice columns do not
   travel.
4. **Security.** Four roles with per-table privileges. SharePoint gives item-level permissions, which
   do not scale past a few hundred rows and cannot express "read every squad, write your own
   absence".
5. **ALM.** Dataverse tables are solution components. SharePoint lists are not, and a list schema has
   to be recreated by script in every environment.

The cost is licensing: Dataverse needs a Power Apps premium licence per user, where SharePoint would
ride on Microsoft 365. For a team of this size, the licence is cheaper than the workarounds.

## Where the engine runs

**Decision: the engine runs in the app, except for the writes.**

The mock's engine is 60 exported pure functions over one dataset, the parity harness aside. Almost
all of them depend on something a Dataverse calculated column cannot see: the sprint grid, the quarter window, another
person's bookings, a region's bank holidays. A calculated column sees one record and one hop.

So the rules become Power Fx named formulas and user-defined functions, working over collections the
app loads at start. That keeps the numbers live, which matters because a planner changes a sprint
span and expects the capacity check to move. Four things stay in Dataverse as calculated or rollup
columns: the item's own MW, the total MW of a feature's components, the component count and the squad
counts. They are for reporting, and no screen depends on them, because rollups refresh hourly.

Six jobs go to the server: quarter close, the Workday import, the Jira import and pull, the activity
log, the quarter's start and end dates, and applying a calibration to the size bands. Each of them
writes many rows, talks to another system, or has to be recorded whether or not the app did it.

The risk this carries is delegation. Power Fx cannot delegate `Sum` over a filter with a function call
in it, so the app loads the working set into collections and computes locally. That is fine at the
expected scale (a few hundred people, a couple of thousand work items) and it is not fine at ten times
that. If the data grows, the arithmetic moves to a low-code plugin returning a computed record, and
the screens bind to that. The model is unchanged either way, which is the point.

## Jira: pull only

**Decision: Waypoint reads Jira. It never writes to it.**

Waypoint's state model is nine states with a capacity impact each, edited on the Settings screen.
Jira's is whatever the team's workflow says today. The mock already maps twenty-odd Jira and Jira
Align status names onto the nine, and that mapping is lossy in one direction only: several Jira
statuses land on Identified, and writing back would have to pick one.

So the boundary is: issue keys, summaries, types, statuses, assignees, story points, parents and
resolution dates come in. Sizes, sprint spans, commitments, benefit claims and capacity never go out.
An issue key on a work item is the join. A Jira row updates the item with that key, or proposes a new
item marked Proposed for a human to accept.

The Copilot Studio agent is the same boundary with a conversation on top: ask it to pull a project or
a filter, it reports what would change, and it applies only after a yes. The Rovo export is output
only: a markdown break-down of one work item, for a person to paste.

If two-way sync is ever wanted, it needs its own decision, its own conflict rules and a field-level
record of which system last wrote what. It is not a v1 feature.

## Source of truth flag (20 September 2026)

**Decision: two environment variables carry the deployment's posture, and the app reads them rather
than hard-coding either.**

`wp_SourceOfTruth` (text, default `Manual`) says who owns a work item. `Manual` means the app edits
work items as it does today. `Jira` means a sync agent owns the item's title, kind, state, epic,
Jira key and owner, and the app locks those six fields: they are read-only on the work item form and
in the register. Everything else on the item stays local and stays editable in both states - size,
sprint span, commitment, assignees, benefit claims, skills, notes and the capacity figures derived
from them. Jira never sees them, which is the pull-only boundary above.

In `Jira` mode the app also hides the two actions that only make sense when it owns the record: the
Jira source on the Import screen, and the Convert and Link actions on a work item. Hidden, not
disabled, for the reason the Financials surface is hidden.

The data model does not change between the two states. The same tables, the same columns and the
same keys serve both; the flag decides which fields the app writes, not what is stored. That is what
keeps a `Manual` environment and a `Jira` environment on one solution.

`wp_UseGridControl` (two options, default `false`) shows the SprintGrid code component on Timeline.
It stays `false` until the component is registered in the environment, which is a Studio step with no
CLI (`RUNBOOK.md`, section 6); flipping it to `true` in an environment where the registration has
landed is what turns the fallback galleries into the grid.

The app reads a variable in `OnStart`: `LookUp('Environment Variable Values', 'Environment Variable
Definition'.'Schema Name' = "wp_SourceOfTruth", 'Value')`, falling back to the definition's own
default when no value row exists in this environment, which is the normal case for a development
environment. Both tables, `Environment Variable Definitions` and `Environment Variable Values`, have
to be connected in Studio with Add data before any of that binds.

## Getting the data in: one import, not re-keying

**Decision: a one-off migration flow reads the live workbook, and the seed comes in the same way.
Nobody re-keys a quarter by hand.**

There are two sets of data to land. The **seed** is `src/seed/seed.json`: the states, the size bands,
the grades, the lists, the bank holidays and the quarter labels, which the build guide already loads
with the `pac` CLI or a one-off flow. The **live workbook** is the .xlsm the team plans in today:
people, squads, work items, absences, reservations and benefit claims, a few thousand rows in all.

Re-keying the live workbook was considered and rejected. It is a week of somebody's time, it makes
exactly the transcription errors the parity fixture then cannot explain, and it has to be done again
every time the cut-over slips.

So: a migration flow, run once per environment, reading the workbook's sheets through the same rules
the importer already has in `src/import/`. Header detection, date-format detection and person matching
are the same three problems the Workday and Jira imports solve, and the matching rules (Core or File
ID, then email, then normalised name, never a guess) are the ones to reuse. Load in dependency order:
reference data, squads, people, work items, then the children. Absences come in on the alternate key
that makes the Workday import idempotent, so the flow can be re-run as the cut-over date moves.

**The mock writes the load files.** Settings, Data, "Export for Dataverse" writes the dataset as one
CSV per table, with the logical column names from `waypoint.model.yaml`, lookups as the target's
alternate key value, choices as their labels and dates as ISO, plus a `manifest.json` giving the row
counts and the order to load them in. `src/export/dataverse.ts` is that mapping, and its tests hold
the header of every file to the model's own column list. So the seed goes in through the standard
import wizard or a dataflow with nothing to re-key, and so does the live workbook: load the .xlsm
into the app, which is the sheet-to-field mapping the importer already has, then export it. Check the
figures against `wp_expected.json` on the same data before anyone trusts the load.

One thing is still open. The cut-over needs a date on which the workbook stops being the record,
which is open question 8 below.

## The Sprint plan is a v1 surface

**Decision: yes, build it in v1.**

It was not in the first cut of this folder because it was not in the mock. It is now:
`src/engine/sprintPlan.ts` produces the squad-by-sprint matrix, held to the workbook's Sprint plan
sheet by the parity suite, and the app shows it. Leaving it out of the Power Platform build would
mean the app reproduced every workbook number except the one the planning meeting actually reads off
the wall.

It is also cheap. Two galleries, at most eight sprints wide, over a collection computed once, and the
expensive half of it (availability per person per sprint) comes from the person-week grid the
timeline already builds. Budget a day on top of Timeline, not a surface of its own. The rule is in
`data-model.md`, and the thing to get right is that its three quantities spread three different ways.

## Who may see the cost of the team

**Decision: Financials is read by the Product Owner and the Engineering lead only, and the app hides
the surface rather than emptying it.**

Two tables carry it: `wp_teamgradecost`, which is what a person of each team grade costs a year, and
`wp_costline`, the licences, subscriptions and infrastructure. Together they are close enough to pay
data to be treated as pay data. A squad member reading them can work out roughly what a colleague of
the same grade earns.

So the privilege matrix gives Squad member and Viewer no privilege at all on those two tables, and
the Money screen's navigation item is hidden when the signed-in user has no read on them. Hidden,
not disabled and not shown empty: a Dataverse read failure in a gallery is an error banner, which
teaches people to ignore error banners.

The gate is the existing roles, not a fifth one. Adding a "Waypoint Financials" role was considered
and left alone: the two people who need the numbers are the two who already hold Product Owner and
Engineering lead. If the audience ever widens past those roles, that is the moment to split it out,
because a role is easier to add than to take away.

The value side of the Money screen (benefit claimed, pounds in year) is not financial in this sense
and stays readable by everyone. It is the cost side only.

## Out of scope for v1

| Not building | Why |
| --- | --- |
| The OKR tree | The model has Outcomes and Epics, which is the reporting line the plan needs. A full objective and key-result hierarchy is a different product, with its own cadence and its own owners. |
| Risks and issues register | Waypoint's job is capacity and benefit. A risk register wants workflow, escalation and review meetings, none of which the planner has. Use the existing one. |
| Releases and release trains | The state model already carries Released, In validation and Done. A release object would duplicate the Jira fix version without adding a planning decision. |
| Roadmaps and timeline views beyond the quarter | The timeline is 53 weeks because capacity is planned a year out, but the app plans one quarter at a time. A roadmap surface is a presentation problem, and the QBR pack already solves it. |
| Half-day cells on the timeline | The whole engine is in days and member weeks, five days to a week. Half days would change `netMW`, `weekDays`, `freeFor` and the parity fixture. Model part-time with days per week, which already works. |
| A training catalogue | Skills are a flat list on Settings, used to match people to work. Course records, bookings and expiry are an HR system's job. |
| ServiceNow integration | The BAU and Service reservations already hold the capacity that support work takes. Pulling individual tickets would turn a planning tool into a queue. |

Each of these is a table or two away, and the model does not block any of them. The reason to leave
them out is that none changes a planning decision this quarter.

## Open questions

1. **Who owns the quarter close?** The build guide gives it to the Engineering lead alone. Is that
   right, or should it need two people?
2. **Does an absence need approval in Waypoint?** The Workday import takes approved rows only. A
   typed absence has no approval step at all. Should it?
3. **Squad membership over time.** A person has one squad, now. The archive keeps the squad name as
   it was at close. Is a history of squad membership needed, or is the archive enough?
4. **Business grade against grade blend.** The mock keeps one text field for both and polices name
   collisions. The model splits them into two lookups. Confirm that no existing data uses a blend name
   that is also a grade name, or the migration has to choose.
5. **Benefit claim units.** Cost avoidance is £M a year, cycle-time cut and error reduction are
   percentages, throughput is a multiple. Only cost avoidance has a money value in the engine. Should
   the others carry one, or stay as claims that are reported but not valued?
6. **How many people, how many work items, in three years?** The answer decides whether the engine
   stays in Power Fx or moves to a plugin.
7. **Is a model-driven administrative app wanted**, or should reference data be edited only through
   the canvas Settings screen?
8. **The workbook.** Does it stay in use alongside the app, or is the app the record from a given
   quarter? If both run, something has to reconcile them, and nothing here does.
9. **Time zone.** The engine works in UTC so that a day is always a day. Everyone is in the UK today.
   If an offshore squad is added, do dates stay UTC or become local?

## Product decisions, 20 September 2026 evening

**Decision: the app's spine is stage on Work, assess on the work item, decide on Command, log people
and time on Team, see it on the Timeline, close on Quarter close.** Craig's reasoning: each screen
should answer one question, and putting an action in two places invites the two copies to disagree.

**Decision: there is no booking concept; people are assigned to work from the work item's Assess tab,
as assignment rows per person and sprint range, and all work, including service and sustain, is a
work item on Work.** Craig's reasoning: a booking that is not a work item is capacity spent on
nothing the register can show, and service and sustain are exactly the sort of work that used to hide
that way.

**Decision: non-work time is an absence with a type (leave, sickness, training, planning, event,
change freeze), entered for one or many people with everyone/onshore/offshore/squad shortcuts, and
absences reduce capacity in the engine as today.** Craig's reasoning: one form for all non-work time
is easier to audit than a scatter of leave, training and freeze records with different rules.

**Decision: squad-level capacity holds (the workbook's reservations) remain engine data, hidden from
the UI, so parity holds, and the decision is revisited if they prove unnecessary.** Craig's reasoning:
removing them now risks breaking the parity fixture for a saving that has not been shown to matter.

**Decision: role is reference data with a fixed grade, and the person form derives grade from role
with no override.** Craig's reasoning: a grade typed free-hand on the person form drifts from the
role table the moment someone overrides it once.

**Decision: Timeline is read-only; the Gaps reading becomes Availability with skill chips; Quarter
close Compare and Calibration, Benefits Roll-up and Types, and the Import rail entry are hidden, not
deleted.** Craig's reasoning: hiding keeps the surfaces ready to bring back without rebuilding them,
and Timeline as read-only keeps assignment in the one place, the Assess tab.

**Decision: priority (Must, Should, Could) is set by the product owner while shaping, and sorts the
register and the ready-not-committed decisions.** Craig's reasoning: a priority set once at shaping
and then left alone is more trustworthy than one anybody can nudge later.

**Decision: source of truth flag and grid flag are environment variables.** Craig's reasoning:
a flag that lives in configuration, not code, is what lets one solution serve a Manual environment
and a Jira environment, and lets the grid turn on only where it has been registered.

**Decision (9): benefits are captured on the work item, not on a separate screen: an actual is
recorded when the item reaches validation or done (the Value tab gains a "Record actual" action
writing to the benefit actuals table); the Benefits screen becomes the calendar alone with no tab
bar; the actuals table view is hidden not deleted.** Craig's reasoning: the person who knows the
benefit landed is the one closing the work, so that is where it should be captured.

**Decision (10): a number carrying a judgement is coloured by it everywhere from one threshold
table, and a number that is only a fact stays neutral.** Craig's reasoning: one change to one
threshold writes everywhere it is read, the thresholds are agreed once and held stable, and the
colour tells a planner what the number means without reading the workings.

**Hit-target control trial: `ccHit` on the Command screen's Today card was swapped from
`Classic/Button@2.2.0` to `ModernButton@1.0.0`, `Appearance: =ButtonAppearance.Transparent`, filling
the cell (no 2px inset), to see whether Modern can replace the transparent Classic/Button hit
targets used everywhere else. Two outcomes:**
- **Modern works** (no visible fill, border or focus ring outside the row's own bounds, in Studio):
  `scripts/sweep-a11y.mjs` and preflight check 24 swap every remaining `Classic/Button` hit target to
  `ModernButton@1.0.0` the same way, and the classic-only focus properties
  (`FocusedBorderThickness`/`FocusedBorderColor`) and colour set drop out of the corpus.
- **Modern draws a fill, a border, or a focus ring outside the row's bounds**: `Classic/Button`
  stays the hit target everywhere, `ccHit` is reverted, and this entry records that the trial was
  run and why Modern was rejected.

## Where the code and the workbook differ

Two places worth knowing before anyone reconciles a number.

- **`markEndedDone` stamps the smaller of the quarter's last sprint and the current sprint**, never
  the item's own end sprint. The workbook's routine would stamp the end sprint, which reads every late
  item as delivered on time. The app is deliberately stricter, and the Power Platform close flow
  follows the app.
- **The seed ships no state with the Allocated impact**, but `counts()` tests for it. Keep the value
  in the choice set; a team that adds a state may want it.
- **Bank holidays: the seed keeps the workbook's own list, Dataverse carries the organisation's
  policy.** `src/seed/seed.json` is never edited, so the parity tests still see the workbook's
  England, Scotland and India rows. `power/data/overrides.json` and `scripts/build-data.mjs` layer
  Craig's organisation's rule on top at build time: Scotland is the eight England holidays plus 2
  January (with a substitute day where 2 January falls on a weekend), and never St Andrew's Day. The
  two lists happen to agree for the current seed years, so the loaded table and the workbook read the
  same today, but they are produced by different rules and can diverge if either one changes.

## Audit decisions, 21 September evening

**Decision (1): Typography vocabulary.** The raw ramp names TypeTitle, TypeSubtitle, TypeBody, TypeCaption are the only Size tokens; the role aliases in Components.pa.yaml (TypeFace, TypeBodySize, TypeLabelSize, TypeNumberSize, Type*Weight) are retired; Font is FontUI everywhere.

**Decision (2): Locale.** Every Text() format carries [$-en-GB]; named format formulas FmtInt, FmtFte (one decimal), FmtMoney, FmtDate replace inline strings.

**Decision (3): Hit targets.** The transparent Classic/Button with inset focus ring stays the standard; the ModernButton trial on ccHit is reverted; reason: keyboard reachability and one class for the checker.

**Decision (4): Timeline grid.** The nested-gallery path is the product; the SprintGrid code component, its registration and the wp_UseGridControl flag are removed, which also removes Studio's "code may be dangerous" banner.

**Decision (5): Scope by team.** Scope by team stays a flagged feature; its formulas and controls move entirely behind the flag so nothing dead ships when it is off.

**Decision (6): Benefits roll-up and close panels.** Benefits roll-up and by-type tabs and Quarter close Compare and Calibration panels are deleted with their formulas; the decision notes record how to restore them.

**Decision (7): Settings confidence thresholds.** Settings 'Low confidence at' and 'Medium confidence at' are dropped from the model at the next schema change.

**Decision (8): Build order.** Phase 0 hygiene and Phase 1 geometry root causes run first, then typography, write paths, components, performance, tooling, as set out in power/AUDIT.md.

**Decision (9): Audit rule preflight checks.** Every audit rule marked in AUDIT.md becomes a preflight check before the unit that depends on it is closed.

**Decision (10): Booked is measured like Net.** Booked member weeks on Team and elsewhere are net of modifier and absence over the quarter, never exceeding net. The gross figure is not shown.

**Decision (11): Package edits compare numbers.** Edits to msapp JSON preserve 64-bit integers; after-check compares every numeric literal with download.

**One text size (22 September 2026).** `TypeBody` is 10, the same size as `TypeCaption`; hierarchy
between body and caption comes from weight (Semibold vs Normal) and colour (`NeutralFg1` vs
`NeutralFg2`), not size. Reason: density and consistency. `TypeBodyLine` moves to 24, the line
table's value for 10 (the same as `TypeLabelLine`). `GroupHeadH` (`TypeBodyLine + 4`) resolves to 28,
down from 30. `ControlHeight` is held explicit at 30, its old resolved value, so it does not shrink;
`RowHeight` was already an explicit 36 and is untouched. `TypeSubtitle` and `TypeTitle` are
unchanged, and no `TypeNumber*` or `TypeHeading*` token derives from `TypeBody`.

**Decision (12): Studio owns package metadata (21 September 2026).** `patch-msapp.mjs`'s metadata reconcile, which rewrote `References/DataSources.json`'s cached column display names from the catalogue, is off by default and only runs given `--reconcile`, as a diagnostic. Reason: `restoreBigInts` capturing `(\d+)` instead of `(-?\d+)` let a negative Int64 `MinValue` come back as a string still holding its NUL escape sequence rather than a bare number, and Studio answered `ErrOpeningDocument`; the reconcile is a script overwriting a cache Studio itself manages, and the fix for a stale display name is Studio's own "refresh data source" on the golden app, saved, downloaded, and promoted with `promote-golden.mjs`, not a pipeline rewrite. Preflight's `dsmetadata` check (30) stays the detector: it WARNs when the package is untouched and the metadata is stale, and FAILs with "package metadata is stale for `<table.column>`: refresh the data source in Studio on the golden app, save, download, and promote-golden" otherwise.

## Workflow design answers, 22 September 2026

**Decision (13): Mark released is done by the engineering lead or the named assessor, not any assignee.** When an item reaches Delivery, only the person named by Send for assessment may move it to Released. Reason: a release decision is a commitment confirmation, not a state-machine notification of what the assignees happen to be doing that day.

**Decision (14): No skipping Assessment after a spike.** An item cannot move directly from Intake to Delivery when a spike has sized the work. The Assessment stage remains mandatory for all items. Where a spike has provided a size estimate, that size pre-fills `wp_sizeoverride` in the Assessment tab and the assessor confirms it. Reason: Assessment is where skills are matched, components are identified and risks are recorded; skipping it trades speed for blindness about dependencies.

**Decision (15): A reopened stopped item keeps its priority and returns to Shaping.** When Reopen is pressed on a Stopped item, it moves back to Shaping with `wp_phase` set accordingly, keeping its original `wp_priority` and all other properties unchanged. Reason: priority is a shaping decision made once and held stable; reopening a stopped item does not replay the shaping, it resets its clock.

**Decision (16): A source change is a silent edit for the user but always writes an Activity row.** Editing `wp_source` after the item's creation does not require a note on the form and is not shown as a separate action, but the edit always produces an Activity row recording who changed it, when and from what to what. Reason: the source is metadata about the item's origin, not a work stage; it is worth auditing but not worth interrupting the maker.

**Decision (17): Reopening from Validated leaves existing actuals standing.** When an item is reopened from Validated back to Release, all existing `wp_benefitactual` rows remain in place. A new actual recorded against the same claim supersedes by date: the app compares `wp_when` on each actual and uses the latest one. History is kept; no actual is deleted. Reason: a benefit reality check is always reversible, and an old decision is worth keeping for audit.
