# The front door, and the hierarchy under it

A design for a morning decision. Nothing here is built. It proposes four new tables, a scope
selector, a second small app and the order to build them in. `waypoint.model.yaml` stays the
authority; this is what would be added to it.

## 1. Why

Today a request arrives on a SharePoint form. Somebody reads it, decides, and the thread ends in a
mailbox. The planner never sees the request that became the work, and the work never carries the
benefit the requester was promised.

The proposal is that the form becomes step one of the same journey, on the same Dataverse:

**request, sniff test by a product owner, promote to spike or feature, assess, commit, deliver,
land the benefit.**

Every step after the second is already built. A promoted request creates a work item and keeps a
link back, so the register answers "where did this come from" and the Value tab answers "did we
deliver what was asked". One data model, end to end, and nothing re-keyed between a form and a plan.

The second reason is measurement. A front door on Dataverse counts what was asked for, what was
declined and why, and how long a request waited for a decision. A SharePoint list cannot join any
of that to capacity.

## 2. Hierarchy: Platform, Lab, Team, Squad

Waypoint is written for one team. The intent is wider: a platform holds labs, a lab holds teams, a
team holds squads. A small team has no squads and works directly, so squad stays optional.

Three new reference tables, and one new lookup on the existing squad.

| Table | Columns | Notes |
| --- | --- | --- |
| `wp_platform` | name, code, description, ownerid (Person), sequence, active | One row today. |
| `wp_lab` | name, platformid, leadid (Person), description, sequence, active | |
| `wp_team` | name, labid, leadid (Person), description, product lines, sequence, active | The unit the planner plans. |
| `wp_squad` | gains `wp_teamid` | Required. Cascade assign, restrict delete. |

### Which tables gain a Team lookup

Twenty-one in all. Three kinds, and the kind decides the behaviour.

**Required, because the row belongs to one team (8).** `wp_person`, `wp_squad`, `wp_workitem`,
`wp_reservation`, `wp_quartersnapshot`, `wp_archiverow`, `wp_teamgradecost`, `wp_costline`.

**Derived, written by the app from the parent so a filter never needs two hops (6).**
`wp_assignee`, `wp_assignment`, `wp_absence`, `wp_benefitclaim`, `wp_benefitactual`,
`wp_importrun`. Each is a child of a person or a work item that already carries the team. The
column is a copy for filtering, set on create and on reparent, never typed by hand.

**Optional, where blank means shared across the platform (7).** `wp_quarter`, `wp_workstate`,
`wp_epic`, `wp_outcome`, `wp_listvalue`, `wp_graderate`, `wp_gradeblend`. Most organisations run
one quarter calendar and one state model, so those rows stay blank. A team that wants its own
absence types or its own skills writes team-scoped `wp_listvalue` rows, and the app reads
blank-or-mine. Business grades and blends are corporate rates, so blank unless a lab really does
pay differently.

**Platform-wide, no lookup (5).** `wp_bankholiday`, because holidays belong to a region and not to
a team. `wp_size`, because the bands are the parity target and calibration is a platform decision.
`wp_setting`, the singleton. `wp_importprofile`, one per source. `wp_gradeblendline`, a child of
the blend.

Sizes are the one worth arguing about. A team that estimates differently wants its own bands. Held
platform-wide for now because the parity fixture and the calibration rule assume one set, and it is
listed as an open decision below.

### The scope selector

The app header gains a selector reading Platform, Lab or Team. It writes three variables in
`OnStart` and again on change: `varScopeKind`, `varScopeId`, and `varTeamIds`, the set of team GUIDs
the scope resolves to. The selector's own options are filtered by what the signed-in user's Person
row may see.

Every `ClearCollect` in `OnStart` takes the same filter shape:

    ClearCollect(colPeople, Filter(People, wp_teamid.wp_teamid in varTeamIds))

Shared tables load unfiltered, and team-scoped reference tables load as blank-or-mine. Nothing
downstream changes. Every named formula already works over the collections, so narrowing the
collections narrows the whole app at once. That is the reason to filter at load and not per screen.

Roll-ups follow the scope. At Team scope the app behaves exactly as it does today. At Lab scope,
Command, Benefits and Financials sum their teams and show a per-team breakdown line under each
figure. At Platform scope they sum the labs the same way. Timeline above Team scope shows one row
per squad rolled to its team rather than a row per person, because a platform of people will not fit
the grid.

### Migration

One solution step and one data package step, in this order.

1. Solution: add the three hierarchy tables, the twenty-one lookups and the new choice sets,
   unmanaged, and import as usual. Lookups go in optional.
2. Data package: create one platform, one lab and one team, named from
   `wp_setting.wp_organisation`.
3. Data package: set `wp_teamid` on every existing row to that team, loaded in dependency order.
4. Only then tighten the eight required lookups and publish.

`src/export/dataverse.ts` gains the team column on the same twenty-one files, so a fresh load
carries it from the start and its header tests move with it.

## 3. The front door table

`wp_request`, 34 columns, five new choice sets: `wp_productline`, `wp_frequency`,
`wp_datasensitivity`, `wp_urgency`, `wp_requeststatus`.

| Group | Columns |
| --- | --- |
| Who | `wp_name` (short title), `wp_requesterid` (systemuser), `wp_requesteremail`, `wp_requestername`, `wp_businessarea`, `wp_sponsor`, `wp_sponsoremail` |
| Where | `wp_labid`, `wp_teamid`, `wp_productline`, `wp_productlineother` |
| The problem | `wp_problem`, `wp_desiredoutcome`, `wp_whobenefits`, `wp_peopleaffected` |
| Today's process | `wp_currentprocess`, `wp_volume`, `wp_frequency`, `wp_handlingminutes`, `wp_systems`, `wp_datasensitivity` |
| Timing | `wp_urgency`, `wp_deadline`, `wp_deadlinereason` |
| Benefit | `wp_benefittype` (the existing choice set), `wp_benefitsize` |
| Risk | `wp_constraints`, `wp_attachments`, a link rather than files |
| Decision | `wp_status`, `wp_screeningnotes`, `wp_screenedbyid`, `wp_screenedon`, `wp_promotedtoid`, `wp_declinecategory`, `wp_declinereason` |

Product line is Blue Prism, Power Automate, Power Apps, Copilot Studio or Other. No alternate key: a
request is never addressed by name. The table is user-owned, which is what makes the requester role
work.

### Lifecycle

| Status | Set by | Means |
| --- | --- | --- |
| New | The requester, on submit | Nobody has looked yet. |
| Screened | Product owner | Read, notes written, not yet decided. |
| Promoted | Product owner | A work item exists and `wp_promotedtoid` points at it. |
| Declined | Product owner | A category and a reason are both required. |

The product owner owns every move. The engineering lead may promote too, because the sizing question
is often what settles it. Nobody else writes the status.

### In the planner

A **Front door** block on Command, in the Today column, headed "New requests" with a count. It lists
New and Screened requests oldest first, and hides when empty like every other Today block. The full
queue lives on Work as a tab beside the register, with four actions:

- **Screen** writes the notes, the screener and the date, and sets Screened.
- **Promote to spike** creates a work item, kind Spike, state Identified, commitment Proposed, with
  the problem statement in `wp_question` and the rest of the request's text in `wp_notes`.
- **Promote to feature** does the same with kind Feature and everything in `wp_notes`.
- **Decline** asks for a category and a reason and sets Declined.

Promotion carries the team, the lab, the product owner and the benefit estimate across, then writes
`wp_promotedtoid` back on the request. The work item gains no new column: the link is read from the
request side, which keeps the register as it is.

## 4. Question bank

Thirty-four questions for the form. R is required, C is conditional on the product line chosen,
and the rest are optional. Craig will cut and reword.

### About you and your area

1. Your name and email. (R, pre-filled from the signed-in user)
2. Which business area are you in? (R)
3. Who is the sponsor, and do they know you are asking? (R)
4. Which lab or team do you think this belongs to? "Not sure" is an answer. (R)

### The problem

5. In one sentence, what is the problem? (R)
6. What happens today because it is not solved? (R)
7. Who feels it, and roughly how many people? (R)
8. How long has it been a problem?
9. Has anyone tried to fix it before, and what happened?

### The current process

10. Describe the process as it runs today, step by step. (R)
11. How many times does it run, and how often? (R)
12. How long does one run take a person? (R)
13. Which systems or applications does it touch? (R)
14. Are there written rules, or does it need judgement? (R)
15. What sort of data is involved: none personal, personal, special category, financial? (R)
16. Are there peaks, deadlines or seasons?

### The outcome and the benefit

17. What does good look like once this is done? (R)
18. What kind of benefit: time released, cost avoided, errors cut, faster cycle, more throughput? (R)
19. Your best estimate of the size, in people released or in pounds. A guess is fine. (R)
20. How would we prove it landed? (R)
21. Is there a date this has to be live by, and what happens if it slips?

### Blue Prism

22. Is the process rule-based and stable, or does it change often? (C)
23. How many applications does one run touch? (C)
24. Is any of it on a mainframe, in a Citrix session or in a browser? (C)
25. Does it need to run out of hours, with nobody watching? (C)

### Power Automate

26. What starts it: a form, an email, a schedule, a record changing? (C)
27. Which systems does it read and write, and do you have access today? (C)
28. Are there approvals, and who approves? (C)

### Power Apps

29. Roughly how many people would use it, and how often? (C)
30. Desktop, tablet or phone? (C)
31. Where does the data live today, and could it move? (C)

### Copilot Studio

32. What should it know, and where does that knowledge live? (C)
33. Where should people meet it: Teams, a website, somewhere else? (C)
34. What must it never do or say? (C)

### Other, risks and constraints

35. If you chose Other, which tool did you have in mind, and why? (C)
36. What could stop this working: policy, access, a contract, a team that has to agree? (R)
37. Anything else we should read? Paste a link.

## 5. Security

Two roles carry the front door.

| Role | Privileges |
| --- | --- |
| Waypoint Requester | `wp_request`: create, read and write at **user** depth, no delete. Read on `wp_lab` and `wp_team`. Nothing else at all. |
| Waypoint Team | The four existing roles, unchanged, plus full `wp_request` at organisation depth. |

Ownership does the work. `wp_request` is user-owned, so a requester reading at user depth sees their
own requests and nobody else's, with no filter in the app to get wrong. Entra groups map onto
Dataverse group teams, one group per role, so joining the group grants the role and leaving it
removes the role.

**Recommendation: a second canvas app, "Waypoint Front door".** One screen with the form, one with
"my requests" and their status, shared with a wide Entra group. The planner stays shared with the
team group alone. Both sit on the same Dataverse, so a promoted request is the same row the planner
reads.

The alternative, one app with a gated screen, is weaker for three reasons. Sharing is per app and
not per screen, so everyone who may fill the form may open the planner. The licence follows the app,
so every requester pays for whatever the planner needs. And the surface area for a mistake is the
whole app: one `Visible` formula that evaluates the wrong way exposes a screen, where two apps
cannot.

The Financials rule already decided stands and tightens here. Team grade costs and cost lines are
close enough to pay data to be treated as pay data, so the requester role gets no privilege on
either. The moment the audience for those two tables widens past the product owner and the
engineering lead is the moment to split a third, finance-only role out.

## 6. Build plan

| # | Unit | Size | Notes |
| --- | --- | --- | --- |
| 1 | Model: add `wp_platform`, `wp_lab`, `wp_team`, `wp_request` and the five choice sets to `waypoint.model.yaml` | M | Design is done, so this is transcription against the YAML conventions. |
| 2 | Model: the twenty-one `wp_teamid` lookups and their cascade rules | M | One sweep, one concern. |
| 3 | Solution build and import | S | The generator already handles tables, columns, choices and lookups. |
| 4 | Data package: one platform, one lab, one team, then backfill `wp_teamid` | M | Headless. Tighten the required lookups after it passes. |
| 5 | Export: add the team column to the twenty-one files in `src/export/dataverse.ts` | S | Header tests move with it. |
| 6 | Scope selector: the header control, three variables, the `OnStart` filters | M | **Craig in Studio first**: Add data for the four new tables. |
| 7 | Roll-ups by scope, Command first, then Timeline, Benefits and Financials | L | Two units, not one. |
| 8 | Front door queue on Work, with Screen, Promote and Decline | L | Two units: structure and formulas, then gates to zero. |
| 9 | New requests block on Command | S | |
| 10 | Security roles and the group team mapping | M | **Craig in the maker portal**, and the sharing with it. |
| 11 | The "Waypoint Front door" app | L | Its own skeleton and its own round trip. |

The pipeline already carries units 1 to 5: the solution generator, the data package and the
catalogue need no new tooling. Craig is needed twice, at unit 6 and unit 10.

**Defer.** Real file attachments rather than a link, a service level on a request and its reminders,
a requester-facing view of the benefit once it lands, and any notification flow. None of them changes
a planning decision this quarter, and all four are easier to design once the queue has run for a
month.

## Open decisions

1. Do size bands stay platform-wide, or become team-scoped?
2. Does one quarter calendar hold across the platform, or may a lab run its own?
3. Is Team required on a work item, or may a platform-level item exist with no team?
4. Who may decline: the product owner alone, or the engineering lead too?
5. Does a declined request get a reply from the app, or does the product owner write one?
6. Does the front door app go to everyone with a licence, or to named business areas first?
7. Is the scope selector visible to everyone, or only to people above one team?
