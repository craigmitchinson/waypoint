# Waypoint release

Waypoint is a capacity planner for squads, work items and benefits. It is a Power Apps canvas app over Dataverse.

This folder holds the unmanaged solution (`Waypoint.zip`) and anonymised sample data (`Waypoint-data.zip`).

## Prerequisites

- The Power Platform CLI (`pac`) installed and on your path.
- A Dataverse environment that you own.
- Maker rights in that environment.

## Steps

Run these from the folder that contains `release/`, in this order.

1. Sign in to your environment:

   `pac auth create --environment <your environment URL>`

2. Import the solution:

   `pac solution import --path release/Waypoint.zip --async false --activate-plugins false --publish-changes`

3. Load the sample data:

   `pac data import --data release/Waypoint-data.zip`

4. Open the Waypoint app at https://make.powerapps.com, in the same environment.

## Notes

- The data is anonymised sample data.
- The app's data-source metadata may still name the environment it was built in. It rebinds to yours on import.
- Dataverse users need a security role with access to the `wp_` tables.
- To rebuild the solution from source, see `power/RUNBOOK.md`.
