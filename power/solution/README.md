# Waypoint solution

The unmanaged Dataverse solution the app's tables live in. `scripts/build-solution.mjs` generates it
from `power/waypoint.model.yaml`; nothing here is edited by hand.

## Regenerate and import

```
node scripts/build-solution.mjs
pac solution import --path power/solution/Waypoint.zip --force-overwrite --async --max-async-wait-time 30 --activate-plugins false
```

The zip is built against model version 2.0 (`model.version` in `power/waypoint.model.yaml`): 31
tables, 285 stored columns, 74 lookup relationships and 22 choice sets. The solution is `Waypoint`,
version 1.0.0.0, publisher `waypoint`, prefix `wp`, option value prefix `10000`.

Model version 2.0 added the hierarchy and the front door, from `power/design-front-door.md`.
`wp_platform`, `wp_lab` and `wp_team` are the three hierarchy tables, and twenty-one existing tables
gained a `wp_teamid` lookup: required on `wp_person`, `wp_squad`, `wp_workitem`, `wp_epic`,
`wp_outcome`, `wp_assignment`, `wp_absence`, `wp_benefitclaim` and `wp_benefitactual`, optional on
the other twelve, where blank means shared across the platform. `wp_request` is the front door
table, 35 columns, with five new choice sets: `wp_productline`, `wp_frequency`,
`wp_datasensitivity`, `wp_urgency` and `wp_requeststatus`. Dataverse accepted the nine required
lookups on tables that already held rows, so nothing had to be loaded optional and tightened
afterwards.

Model version 1.2 added `wp_listvalue.wp_grade` (Grade, text, 4) and a fifth member, Role, on the
`wp_listname` choice, so a role can be a list value carrying the team grade it maps to.

Model version 1.1 made `wp_assignment.wp_typeid` optional (`required: false`), so a work booking can
be saved without a reservation category: it carries a work item instead. Blank for a work booking,
set for a non-work one.

Run both from the waypoint folder. Call the CLI as `pac`; if it is not on PATH,
set PAC_CMD to its full path. Check the target
first with `pac org who`; the current target is https://<your-org>.crm.dynamics.com/.

`--async` matters, now the other way round from before: a synchronous import holds the CLI's
own connection open for as long as the server takes, and that connection is what closes underneath
a large import ("The underlying connection was closed"), which is indistinguishable from a failure
at the CLI. An async import hands the job to the server and returns; the way to know it has landed
is not the CLI's exit code but a download: every 30 seconds, `pac canvas download` the app, `pac
canvas unpack` it, and compare its `Src` against the build's, until the two are identical or 15
minutes pass. Retrying the import call itself into a job that is still running is what once landed
a solution with no tables in it ("Cannot start another [Import] because there is a previous
[Import] running" is not a failure either, and answering it with another import is the mistake).
`scripts/import-app.mjs` does the whole round trip -- refresh, assemble, fxcheck, pack, export,
unpack, replace the `.msapp`, pack, import async, then poll -- in one command.

Build a subset for a probe import with `--only`:

```
node scripts/build-solution.mjs --only wp_size,wp_listvalue
```

An unmanaged import never removes what it does not mention, so a subset is safe to import into the
full solution.

Verify a table exists by fetching its primary column. `top` is rejected by `pac org fetch`, so use
`count`:

```
pac org fetch --xml "<fetch count='1'><entity name='wp_person'><attribute name='wp_name'/></entity></fetch>"
```

"No results returned" is the pass: the table exists and is empty. A metadata error names a table
that did not land. All 31 tables answer this way today.

## Model deviations

- **The global choice sets are there, but the columns hold local copies.** The global `<optionsets>`
  block works only in one shape: `OptionSetType` is an element, not an attribute, and `IsGlobal="1"`
  and `localizedName` are attributes. Any other shape fails with "OptionSets import: FAILURE: Object
  reference not set to an instance of an object". All 17 sets from the model are in the solution.
  The choice columns still carry their own copy, named `<table>_<column>`, with the same labels and
  the same numeric values, because the columns were created with local sets first and Dataverse
  refuses to convert one: "IsGlobal information provided True doesn't match the value stored in DB
  False". Point the columns at the global sets by dropping and recreating them, or by building the
  solution into a fresh environment, where `<OptionSetName>` is all a choice column needs.
- **Lookup targets are named by the relationship only.** `LookupTypes/@id` is a GUID in this schema;
  a logical name in it fails the import with "Input string was not in a correct format". The
  attribute carries `<LookupTypes />` and the `EntityRelationship` names the referenced table.
- **Every relationship carries a description.** Import rejects a relationship without one
  ("RelationshipDescription cannot be null for entity relationship"), so the column description, or
  a single space, is written into it.
- **Alternate keys are not in the zip.** The `EntityKeys` block is rejected here ("The attributes
  must be defined for creating an EntityKey"), so the keys in the model are made by hand in the
  maker portal. `--with-keys` emits the block for another attempt.
- **Computed columns are not created.** Anything marked `computedIn: app` or `computedIn: dataverse`
  in the model is left out, as the model intends.
