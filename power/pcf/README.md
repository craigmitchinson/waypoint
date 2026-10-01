# Code components

One Power Apps component framework control, `SprintGrid`, which draws the sprint planning grid the
React prototype draws: people down, working days across, one typed cell per person per day. It is a
pure renderer. It reads no table and calls no service, so it consumes nothing: no AI Builder, no
premium connector. A code component is a solution component and is inside the standard licence.

The control is the fallback named in `../compatibility.md` for the sprint grid row, brought forward:
three nested galleries over 60 people by 13 weeks is around 800 template instances, and this is what
replaces them if that proves too slow.

## Prerequisite

Canvas apps only load code components when the environment feature is on. It is on:

    pac env update-settings --name iscustomcontrolsincanvasappsenabled --value true
    pac env list-settings          # iscustomcontrolsincanvasappsenabled  Yes

If the CLI ever refuses it, switch it on at Power Platform admin centre > Environments > the developer
environment > Settings > Product > Features > "Power Apps component framework for canvas
apps".

## Build and push

Run both from `power/pcf/SprintGrid`.

    npm install                          # once
    npm run build                        # pass: "[build] Succeeded"
    pac pcf push --publisher-prefix wp

`pcf push` builds a temporary solution wrapper, `PowerAppsToolsTemp_wp`, imports it, publishes all
customizations and then drops the wrapper again. The control itself stays in the environment's
Default solution, so it does not appear in `pac solution list`; `Controls/wp_Waypoint.SprintGrid` in
`obj/PowerAppsToolsTemp_wp/bin/Debug/PowerAppsToolsTemp_wp.zip` is what was sent. Push is the
development route: fast, and unmanaged in Default.

## The transportable route

A control that has only been pushed sits in the environment's Default solution and does not travel
with the Waypoint solution. The route that works, once the control is in the environment, is to add
it to Waypoint in place. It is one command, and it is the route to use:

    pac env fetch --xmlFile cc.xml      # customcontrol row, filter name = wp_Waypoint.SprintGrid
    pac solution add-solution-component --solutionUniqueName Waypoint --component 376ef815-b525-4594-9c9d-6cf0b8bc5b1f --componentType 66

`--component` will not take the control's name: `wp_Waypoint.SprintGrid` fails with "Failed to
resolve entity metadata". Pass the `customcontrolid` GUID from the `customcontrol` table instead.
Component type 66 is a custom control. The fetch is:

    <fetch><entity name="customcontrol"><attribute name="customcontrolid" /><attribute name="name" />
    <filter><condition attribute="name" operator="like" value="%SprintGrid%" /></filter></entity></fetch>

Done once. The control then exports and imports with everything else: `solution.xml` in the export
carries `<RootComponent type="66" schemaName="wp_Waypoint.SprintGrid" />` and the zip carries
`Controls/wp_Waypoint.SprintGrid/` with `bundle.js`, `css/SprintGrid.css` and `ControlManifest.xml`.
Adding a second control later means one more `add-solution-component` call.

**The standalone zip, as a fallback.** `power/pcf/solution` is a solution project wrapping the
control, built for the case where the control has to reach an environment it was never pushed to:

    pac solution init --publisher-name waypoint --publisher-prefix wp --outputDirectory power/pcf/solution
    cd power/pcf/solution
    pac solution add-reference --path ../SprintGrid
    dotnet build --configuration Release        # bin/Release/solution.zip

Its `src/Other/Solution.xml` was edited after `init`: unique name `WaypointControls`, publisher
option value prefix 10000 to match the Waypoint publisher. The build packs managed; set
`<Managed>0</Managed>` for an unmanaged zip. Importing it means work imports two zips, which is why
it is the fallback and not the route.

Do not import an unmanaged code component over the top of a managed one; the environment keeps both
layers and the canvas app binds to whichever resolves last.

## Updating the control

    npm run build                         # from power/pcf/SprintGrid
    pac pcf push --publisher-prefix wp    # development: straight into the environment

Push updates the control in place, so the Waypoint solution's reference to it picks up the new
bundle; nothing has to be added again. For transport, push to the source environment, then export
Waypoint as usual and import that. The solution project only needs rebuilding if the fallback zip
is being used.

## Registering in Studio

`Control: CodeComponent` will not import into an app package until the component is registered
there first, and that is a Studio step, not a CLI one. As found 2026-09-20: the control is not
under Tree view > Components, and current Studio has no "Get more components" button. Once the
environment feature is on and the control has been pushed, it appears in the Insert panel under a
"Code components" heading. A maker registers it by inserting it onto any screen once, deleting that
instance, then saving and publishing. `scripts/refresh-skeleton.mjs` then captures the registration,
and a YAML reference (`Control: CodeComponent`, `ComponentName: wp_Waypoint.SprintGrid`) imports
from then on.

Any table a screen reads must also be connected in Studio, via Add data, before that screen
imports; `fxcheck` reports an unconnected table by name.

## What the app references

The control's full name is **`wp_Waypoint.SprintGrid`**. In canvas YAML:

    - SprintGrid:
        Control: CodeComponent
        ComponentName: wp_Waypoint.SprintGrid
        Properties:
          gridJson: =SprintGridJson
          theme: =If(varDark, "dark", "light")

`selectedCellJson` is read back off the instance, `SprintGrid.selectedCellJson`, as a JSON string.
The control sizes itself to the width and height the app allocates, so give it a container and let
the container do the layout.

## The gridJson contract

One string, the whole grid. The component parses it once per change; anything malformed draws an
empty grid rather than throwing at the host.

    {
      "days": [
        { "date": "2026-01-05", "name": "MON", "label": "5 Jan", "outside": false }
      ],
      "groups": [
        {
          "name": "Platform",
          "meta": "6 people · 24.0 MW sprint · 18.0 / 30.0 MW quarter",
          "people": [
            {
              "name": "Alex Rowe",
              "role": "Engineer",
              "meta": "SP 4.5 · 100%",
              "cells": [
                { "kind": "work", "label": "Statement matching", "status": "At risk, 2 days",
                  "tooltip": "Statement matching rules v2, Platform, At risk" }
              ]
            }
          ]
        }
      ]
    }

- `days` — one entry per working day, in order. `date` is ISO and is what comes back on
  `selectedCellJson`. `name` is the three-letter weekday, `label` the date as the app writes it.
  `outside: true` marks a day outside the quarter: it draws a dot and a title of "Outside the
  quarter".
- `groups` — one per squad, in order. `meta` is the figures line, right-aligned on the group row.
- `people` — in order within the squad. `meta` is the figures after the role.
- `cells` — one per day, in the same order as `days`. A short array is padded with open cells.
  - `kind` is one of `open`, `leave`, `training`, `bankhol`, `work`. It picks the colour down the
    cell's left edge: open red, leave purple, training pink, bank holiday brand mid, work brand soft.
  - `label` is the one line of text.
  - `status` only reads on a `work` cell. `"Late"` draws the bad colour, anything starting `"At
    risk"` the warn colour, and either is printed after the label so the state is never colour
    alone. Any other value reads as on track.
  - `tooltip` is the `title` attribute and the spoken label; the label is spoken when it is absent.

`selectedCellJson` is raised on click and on Enter or Space:

    { "person": "Alex Rowe", "date": "2026-01-05" }

## Keyboard

One cell is in the tab order at a time. Arrow keys move the caret a cell, Home and End go to the
first and last day of the row, PageUp and PageDown jump to the first person of the previous or next
squad. Enter or Space raises the selection. Every cell is a real button with its own label.

## Styling

The component carries its own CSS, `SprintGrid/css/SprintGrid.css`. It does not import `@ccs/ui`: a
code component runs in the host page and cannot read the app's custom properties, so the Power
skin's resolved colours are written into the file literally, light and dark, switched on the root's
`data-theme`. The face is Segoe UI, as the skin has it. If a token in `@ccs/ui` moves, this file has
to move with it.
