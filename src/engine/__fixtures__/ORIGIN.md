# wp_expected.json

Read-only fixture. Copied on 17 September 2026 from
`flightdeck/waypoint-generator/build/wp_expected.json`, which `run_build.py` writes from
`wp_model.py`: an independent model of the workbook's rules, worked in Python from the same seed.

It is the parity target for `src/engine`. Do not edit it here; regenerate it in the generator and
copy it across. `delivery.cur_sprint` fixes the day the fixture was worked out on, so the parity test
feeds the engine a date inside that sprint rather than today.
