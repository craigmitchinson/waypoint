# Waypoint on Power Platform

Everything needed to rebuild the Waypoint Capacity Planner as a canvas app on Dataverse. Nothing in
this folder changes the React app in `../src`; it is the specification for the next version of it.

## What is here

| File | What it is |
| --- | --- |
| `waypoint.model.yaml` | The data model, neutral and complete. 27 tables, 221 columns, 17 choice sets, the keys, the relationships and the privilege matrix. The authority. |
| `data-model.md` | The same model explained: a Mermaid diagram, the naming conventions, the keys, and where each of the engine's rules lives. |
| `build-guide.md` | Step by step from an empty environment to a working app, with the day estimates and the proving slice to build first. |
| `decisions.md` | Canvas against model-driven, Dataverse against SharePoint, where the engine runs, the Jira boundary, what is out of scope, and the open questions. |
| `app/App.pa.yaml` | The canvas app's App entity: the start screen, `OnStart`, and the theme tokens as named formulas. |
| `app/Formulas.pa.yaml` | The whole engine as Power Fx: 153 named formulas and user-defined functions, in the order the engine files run, each carrying the source function it came from. |
| `compatibility.md` | Every surface in the app, how it is built in Power, how sure we are, what it costs in licences, and the fallback. Ends with the build order and the three risks to prove first. |
| `tests/expected.json` | The parity fixture's headline values, keyed by the Power Fx formula that has to produce them, at a tolerance of 0.005. |
| `tests/README.md` | How to turn those into Test Studio cases, and the manual check for the SVG charts. |
| `app/DataSources.pa.yaml` | One Dataverse table data source per table in the model. |
| `app/Components.pa.yaml` | Five canvas components with typed custom properties: Band, Stat, Pill, Stepper and SquadSnap. |
| `app/Screens/Command.pa.yaml` | The Command screen's control tree, in full, as the pattern the other nine screens follow. |

The four `.pa.yaml` files are written against `../pa.schema.yaml`, the Power Apps YAML v3.0 schema. Be
careful with them: the `Screens` and `ComponentDefinitions` entries are maps, a `Children` list is a
sequence of single-key maps, and every property value is a string beginning with `=`.

## Reading order

1. `decisions.md`, to know what was decided and why.
2. `data-model.md`, for the shape.
3. `waypoint.model.yaml`, for the detail, and only where the detail matters.
4. `compatibility.md`, to know what each surface costs before anything is committed to.
5. `build-guide.md`, when you are ready to build.
6. `app/*.pa.yaml`, as you build the app itself, and `app/Formulas.pa.yaml` for the arithmetic.
7. `tests/README.md`, as soon as the first number comes out of the app.

Before any of it, read `../README.md` for what Waypoint does and `../src/model/types.ts` for the
domain in 260 lines. The engine in `../src/engine` is the arithmetic, and it is the specification for
the numbers.

## The three phases

**Phase one, the mock, is done.** The React app in `../src` is a working Waypoint: the typed model,
the pure engine held to the workbook's numbers by the vitest parity suite, the importer, and ten
surfaces over the top of them. Its Power Apps preview mode already shows the intended canvas layout,
Fluent 2 type ramp and 1600 x 900 frame.

**Phase two, the model, is this folder.** The domain in `types.ts` becomes 27 Dataverse tables. Each
engine rule is placed: in the app as Power Fx, in Dataverse as a calculated or rollup column, or on
the server as a flow. The decisions are recorded, and so are the questions nobody has answered yet.

**Phase three, the build, is `build-guide.md`.** Environment and solution, tables and roles, the
canvas app screen by screen, the import and close flows, the audit log, Test Studio against the
parity fixture, and ALM through the `pac` CLI and pipelines. Start with the proving slice: six tables,
the shell, Command and one work item page, thirteen days, and a check that the numbers match
`../src/engine/__fixtures__/wp_expected.json`.

If the slice's numbers match, the rest is volume. If they do not, the fault is almost always in the
date arithmetic.

## Known issues

- `scripts/import-app.mjs`'s final datasource-verification step can crash with `ENOBUFS` reading a
  large `References/DataSources.json` (the `SpatialServices` connector's WADL metadata is huge);
  the import itself has already landed by that point, so verify manually by extracting
  `References/DataSources.json` from the polled `.msapp` and checking for `wp_` names.
