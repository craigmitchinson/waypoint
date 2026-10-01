# Testing the Power Apps build

The numbers are the product. `expected.json` here is the parity fixture's headline values, keyed by
the Power Fx formula in `../app/Formulas.pa.yaml` that has to produce them. Ninety-six cases, one
tolerance: 0.005, the same tolerance the vitest parity suite holds the React engine to.

## Before anything runs

Three conditions, and every case fails without them.

1. **The same seed.** Import `../../src/seed/seed.json` into a dedicated test environment through the
   import flow, so the Dataverse rows are the rows the fixture was computed from. Never run these
   cases against a working environment: a single edited work item moves most of them.
2. **The same day.** The fixture was worked out on the second day of sprint 19. `CurrentSprint`,
   every delivery status and the carry-over block all read today. Pin the clock for the run, or
   replace `CurrentSprint` with a test-only constant of 19 while the suite runs and put it back.
3. **The collections loaded.** Everything here is a named formula over the collections `App.OnStart`
   builds, so the app has to have finished starting. Add `colArchive` and `colSnapshots` to
   `OnStart` first: the calibration and compare cases read them.

## One test per key

Each key in `expected.json` is a Power Fx expression that evaluates to the value beside it. A Test
Studio case is that expression, the value as a literal, and one assertion.

```powerfx
// Test: NetTotal
Assert(Abs(NetTotal - 221.02) < 0.005, "Net capacity total")
```

```powerfx
// Test: SquadNetMW("Squad 1")
Assert(Abs(SquadNetMW("Squad 1") - 32.1) < 0.005, "Squad 1 net capacity")
```

```powerfx
// Test: WorkMW, Exception queue UI
Assert(
    Abs(WorkMW(LookUp(colWork, Title = "Exception queue UI")) - 4) < 0.005,
    "Exception queue UI MW this quarter"
)
```

Text and boolean cases compare exactly, with no tolerance.

```powerfx
// Test: DeliveryStatusOf, Data warehouse access for analytics
Assert(
    DeliveryStatusOf(LookUp(colWork, Title = "Data warehouse access for analytics")) = "Late",
    "Data warehouse access is late"
)
```

Three cases need a different tolerance, and each says so in its own `note`: `BenefitRecorded` is
rounded to the penny in the fixture, so use 0.01; `GbpInYear` and the grade rates are pounds, so
0.005 is far tighter than the figure needs and they can be asserted exactly.

## Suites, in the order to build them

One suite per engine area, in the order of `Formulas.pa.yaml`. Run them in this order too: a failure
early makes everything after it fail, and reading the first failure saves reading forty.

| Suite | Cases | What it proves |
| --- | --- | --- |
| Dates and the grid | `CurrentSprint`, `TimelineAvailableTotal`, `TimelineAssignedTotal` | The date arithmetic. Power Fx dates are local, the engine works in UTC; if the two checksums are out, nothing else will be right and the fault is here. |
| Capacity | `NetTotal`, the two `NetMW` people, the six `SquadNetMW` | Bank holidays, absence and part-time scaling. |
| Work | the eight `WorkMW` cases, `TotalMW`, the four `Counts` | The sprint spread and the counting rules. |
| Totals | `CommittedTotal`, `ProposedTotal`, `InPlanMW`, `DeliveredMW`, `Reliability`, `EndedItemsCount` | The headline figures the Command screen shows. |
| Value | `GradeRateOf`, `BenefitInYear`, `BenefitRecorded`, `GbpInYear` | Blends, landing months and recorded actuals. |
| Capacity check | the thirteen `Check*` cases | The finish walk, including the double-booked person. |
| Delivery | the three statuses, the seven `StatusCount`, the summary block | The ladder, the overlay and the roll-up. Run the overlay and roll-up pass before the `StatusCount` cases: they read `colDelivery`. |
| Reservations | `ReservationDrawn`, the five `ReservationRows` remainders, `SquadReservedMW`, `ReservedTotal` | The drawdown and the team pro-rata. |
| Calibration | the six `CalibrationBand("M")` cases | Banker's rounding. `Round()` gives 2.5 here as well, so this suite passes for the wrong reason if `RoundHalfEven` is wrong; add a case for `RoundHalfEven(2.5) = 2` and `RoundHalfEven(3.5) = 4`. |
| Compare | the three `CompareRead` cases | Better, worse and same. |

## The sprint plan

`expected.json` has no sprint plan values, because the generator does not emit that sheet. Hold it to
the three identities in the file's `not_in_the_fixture` block, check one row by hand against the
React app's Timeline page on the same seed, and record what you get as the baseline for later runs.
The one hard assertion available now is the marker: a cell with committed work and no availability
reads 9.99 and shows the words "No capacity".

## What Test Studio cannot check

**The SVG charts, by hand.** Power Fx cannot read back what an Image control drew, so the landing
chart, the month bars and the sparklines are a manual check each release. For each one, with the seed
loaded: read the figure from the accessible table beside the chart, compare it with the same figure
on the React app's page, and confirm three things about the drawing itself. That the last bar of the
landing chart ends at the December total in `BenefitCalendarTotals`. That the month bars are in
January to December order and the tallest is the month with the largest `Gbp`. That every sparkline
has as many points as the quarter has sprints. The accessible table is the test; the picture is only
the illustration, which is the same contract the React app keeps.

**Flows.** Test Studio cannot call one. Test the import and close flows with a manually triggered
harness flow: seed a known state, call the flow, assert the rows it wrote. The close is idempotent,
so run it twice and assert the second run changes nothing.

**Form rules.** Cover `../../src/store/validate.ts` as its own suite of negative cases: a duplicate
title is refused, an FTE claim without a landing month is refused, a cancelled item without a reason
is refused, a component two levels deep is refused, a duplicate reservation triple is refused.

## When a number is wrong

Change the formula, never the expectation. `expected.json` is a copy of
`../../src/engine/__fixtures__/wp_expected.json`, which is itself a read-only copy of the workbook
generator's output. If a value here is genuinely wrong, it is wrong in the generator: fix it in
`../../../flightdeck/waypoint-generator`, regenerate the fixture, copy it into `src/engine`, then
copy the headline values across to this file.
