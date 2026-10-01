# Overnight plan, 20 to 21 September 2026

## Principle

Each screen answers one question. Every number carries its judgement. Nothing exists that nobody will use.

## Unit 1: Command becomes Today

Commit calls (ready not committed, priority, finish walk verdict, Commit and Defer). Attention showing late, at risk, over capacity with the number and Open. Spikes to conclude with timebox remaining and Conclude button. Sickness moves to the This sprint card as a line. Unassigned becomes a count on the Work filter row. Empty blocks hide. Band becomes capacity only (Available, Committed, Remaining, Utilisation, Free next sprint, On time).

## Unit 2: Timeline readings

Renamed: Sprint, Quarter, Sprints, Availability. Peek card and chip alignment applied.

## Unit 3: Number tones

Applied to Command, Team, Work, WorkItem, Financials, Benefits, Quarter close from the NumberTones table. Benefit gap sign corrected. Met shows good.

## Unit 4: Header search box

Person, squad or item search navigates accordingly.

## Unit 5: Cuts

Unused cmpBand component removed. Dead formulas removed (NavSections, TlLegend). Work register Kind column dropped (tabs filter it). Work item At a glance rail trimmed to what the form does not show. Settings grade blends tab hidden if the model does not use blends (checked, not assumed).

## Out of scope overnight

RBAC. Modern Table trial. Live saves. Data model or seed changes.

## Morning check

Two imports logged with their claim. Open edit mode once. Screen by screen against power/tests/evaluation-log.md.

## Status

Awaiting Craig's yes. Amendments recorded below.

## Morning, 21 September: what to do first

1. Open the Waypoint app in edit mode; report clean or paste the error text.
2. Read power/tests/evaluation-log.md: the last rows are the overnight builds with their claims; judge each screen against its claim and note actuals.
3. In Studio, Data > Add data: add Platforms, Labs, Teams and Requests (four tables added by model 2.0 overnight). Save and publish.
4. Say "tables added": the orchestrator flips includeFrontDoor in scripts/assemble-canvas.mjs, runs the gates and imports; the Front door screen and the request queue then appear.
5. In the maker portal, Solutions > Waypoint: create two security roles per power/design-front-door.md section 5 (Waypoint Requester: create and read own Requests only; Waypoint Team: full access) and map them to Entra groups; this is portal work the pipeline cannot do.
6. Live saves to try: an absence for two people, an assignment from a work item, an actual on a done item, a request from the Front door once it is live.
7. Decisions waiting for you are listed in power/design-front-door.md "Open decisions" and in the amendments below.

## Amendments recorded overnight

- Free next sprint dropped from the Command band (no per-sprint free formula exists).
- Grade blends tab kept (engine uses blends).
- Settings Data tab placeholders hidden.
- Reservations concept removed.
- Front door is inside the planner behind a flag; the separate requester app is a morning decision.
