# Waypoint seed data

The seed dataset as a Configuration Migration package, which is what `pac data import` takes.
`scripts/build-data.mjs` generates it; nothing here is edited by hand.

`Waypoint-data.zip` is the package. `src/` holds the same three files loose, for reading:
`data_schema.xml` (the tables and their columns), `data.xml` (the rows) and `[Content_Types].xml`.
The file name `data_schema.xml` matters: the tool looks for that name, and a package with
`schema.xml` in it fails before it reaches the server with "Unable to open data file".

## Regenerate and load

```
node node_modules/vite-node/vite-node.mjs scripts/build-data.mjs
pac data import --data power/data/Waypoint-data.zip
```

Run both from the waypoint folder. Call the CLI as `pac`; if it is not on PATH,
set PAC_CMD to its full path. Check the target
first with `pac org who`; the current target is https://<your-org>.crm.dynamics.com/. The
solution has to be imported first: the tables and their columns are what the package is validated
against.

vite-node runs the build because the rows come from the app's own export, `exportForDataverse()` in
`src/export/dataverse.ts`, which is TypeScript. The script only turns those CSVs into XML, so the
mapping from the model onto the tables stays in one place. The table shapes, the choice values and
the lookup targets are read from `power/waypoint.model.yaml` with `scripts/build-solution.mjs`'s
reader, so the package and the solution cannot drift apart.

The load is repeatable. The tool records the package's ids against the rows it creates, so a
second run reports "Switching Insert to Update ( Matched on Source ID )" and updates them in place
rather than adding a second copy.

A boolean is written as `True` or `False`, not as `1` or `0`. The tool parses the value as a .NET
boolean, and a numeric one fails the whole record with "Create update field spec FAILED".

`entity-type-codes.json` carries each table's entity type code, which the schema requires and the
environment assigns. Refresh it for a new environment with:

```
pac org fetch --xml "<fetch><entity name='entity'><attribute name='objecttypecode'/><attribute name='logicalname'/><filter><condition attribute='logicalname' operator='like' value='wp_%'/></filter><order attribute='logicalname'/></entity></fetch>"
```

## The bank holiday overlay

The seed's `bankHolidays` rows are the workbook's own list, unedited: the parity tests read
`src/seed/seed.json` directly, so it has to keep the workbook's numbers. Craig's organisation's
policy differs for Scotland, so `build-data.mjs` layers it on at build time, after the seed is read
and before the rows are exported, following `power/data/overrides.json`:

- England and Wales keep the standard eight bank holidays a year. Wales carries no rows of its own;
  the app derives Wales from England.
- Scotland is generated from England's rows for each year present, plus 2 January, minus St
  Andrew's Day (the seed has no Wales or St Andrew's Day rows to remove, so this is a no-op against
  the current seed).
- 2 January follows the same substitute convention the seed uses for England's own holidays: a
  Saturday date moves two days to the Monday, a Sunday date moves one day to the Monday, and if that
  day is already a holiday in the region it moves on again until it lands on a free day.
- Exact `name`+`date`+`region` duplicates are then dropped once.

`applyBankHolidayOverrides` in `scripts/build-data.mjs` does this; `OVERRIDES` in the same file
reads `overrides.json`. The loaded table is the organisation's policy, not the workbook's; see
`power/decisions.md` for why the two are allowed to diverge.

## The GUID rule

Every row carries a record id derived from its key, so a lookup can name its target before the
target is written and the same package rebuilt twice is byte-for-byte the same. The id is a UUID v5
over `<table>|<key>`, under the namespace named at the top of `scripts/build-data.mjs`. Changing
that namespace moves every id.

The key is the value the export writes into a lookup, which is the table's alternate key: a person's
name, a squad's name, a work item's title, a grade letter, a quarter label. A list value is keyed by
its list and its value together, because Other is on three of the lists; `LIST_OF_LOOKUP` in the
script says which list each lookup column is filtered to. A table nothing looks up is keyed by its
primary column and its position in the file, so two rows that read alike stay apart.

Dataverse does not keep these ids. The tool assigns its own on create and maps the package's ids
onto them, so the ids are how the package ties itself together, not a handle on the rows afterwards.

## Verification

Counts, one table at a time:

```
pac org fetch --xml "<fetch aggregate='true'><entity name='wp_person'><attribute name='wp_personid' alias='n' aggregate='count'/></entity></fetch>"
```

The load of 2026-09-19 answered with the seed's own counts: 21 list values, 6 sizes, 9 work states,
6 grade rates, 1 grade blend, 2 blend lines, 6 outcomes, 8 epics, 66 bank holidays, 12 quarters, 1
setting, 6 squads, 35 people, 28 work items, 22 assignees, 24 assignments, 21 absences, 10 benefit
claims, 8 benefit actuals, 5 reservations, 3 snapshots, 7 archive rows, 4 team grade costs, 8 cost
lines.

Lookups resolve in both directions. A person's squad:

```
pac org fetch --xml "<fetch count='5'><entity name='wp_person'><attribute name='wp_name'/><link-entity name='wp_squad' from='wp_squadid' to='wp_squadid' alias='sq'><attribute name='wp_name'/></link-entity></entity></fetch>"
```

A squad's lead is the lookup that points back at a table loaded after it, so it is the one worth
checking as well:

```
pac org fetch --xml "<fetch count='6'><entity name='wp_squad'><attribute name='wp_name'/><link-entity name='wp_person' from='wp_personid' to='wp_leadid' alias='lead'><attribute name='wp_name'/></link-entity></entity></fetch>"
```

## What is not loaded

- **The activity log.** `SKIP_TABLES` in the script. The mock's entries are the UI's own history, not
  data the app reads back.
- **Import profiles and import runs.** The seed has none.
- **Columns the model computes**, in the app or in Dataverse. The export never writes them.
- **Lookups onto tables the package does not carry.** A person's user and an absence's import run are
  empty in the export, so they are left out of the schema as well as the data.
- **Ten lookup values that name no row**, left blank and listed by the build. Seven assignments are
  booked against standing commitments rather than work items ("Blue Prism developer", "Product
  leadership"), which is what the model means by a booking against no item, and three assignment
  types ("Work", "Training", "Support") are not on the Reservation category list the column is
  filtered to. The mock keeps free text where Dataverse keeps a row.

Dates are written at noon UTC, so a date-only column lands on the day the seed names whichever way
the environment's time zone leans.
