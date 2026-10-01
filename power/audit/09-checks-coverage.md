# Audit 09: offline checks and rule coverage

Summary: survey of scripts/preflight.mjs, fxcheck.mjs, parity.mjs, yamlcheck.mjs, power/canvas/control-properties.json, invariants.json and RUNBOOK section 4. preflight.mjs and invariants.json read in full; fxcheck.mjs and yamlcheck.mjs for exit codes and robustness only; the gap table samples the highest-risk rules, not all of section 4's roughly 80 bullets.

## The 26 checks, in run order

yamlcheck: strict YAML syntax via YamlDotNet on build/Src. fxcheck: Power Fx binds against columns.json, 0 errors, 0 skipped. namedformulas: count against the invariants.json baseline. datasources: every connected table name present in packed References/DataSources.json. spatialservices: no SpatialServices entry survives packing. displaysettings: the four patch-msapp flags read back. comments: # only in Fx blocks, // only at YAML level. layoutrules: FillPortions only on valid hosts, no component in gallery, no Navigate in OnStart, no UDFs. codecomponents: every CodeComponent registered in the msapp. startscreen: exactly one. screens: expected screen set, flag-aware, no extras. components: every component instance has a definition file and vice versa. properties: PA2108 deny and allow per control type. names: no duplicate control name in a screen. events: every Event custom property has a non-empty Default. parity: Fx-computed values match the workbook fixtures. overflow: every auto-layout container declares both axes, manual-layout declares neither. badges: every Badge is Appearance Filled. text: no ModernText. tables: compiled cell geometry matches tables.json. instances: every property on a component instance is standard or declared. typography: every Label's Size, Color and FontWeight is a scale name, token or tone. galleries: every Gallery declares TemplatePadding and ShowScrollbar. a11y: four control classes carry focus ring, tab stop or spoken name. structure: every file parses under a strict schema-key parser. columnnames: no two columns on one table share a display name.

## Overlap

yamlcheck and structure both validate YAML shape with independently written parsers. Not redundant: structure exists because a mis-nested Children block packed and imported clean past yamlcheck. No other pair tests the same fact twice; properties, badges and structure's scalar check look adjacent but test different axes.

## Gap table (sampled)

| Rule | Checkable | Proposed check |
|---|---|---|
| Booleans never Coalesce()d | Y | grep formulas for Coalesce( where the argument resolves to a boolean or two-option column per columns.json |
| Dataverse IsBlank kept outside Filter | Y | flag Filter(...IsBlank(... on a Dataverse source |
| No literal width, X or Y over 200px outside tables.json cells | Y | regex scan for bare numeric literals in Width, Height, X, Y |
| Table cell Size and Color match the declared role in tables.json | Y | cross-reference the typography check against tables.json roles |
| Text() formats are en-US with no trailing # | Y | regex on format-string literals |
| Save wrapped in IfError with the error surfaced | N (needs AST) | none |
| Every screen checked at 1920, 1366 and 1024 | N (visual) | none |
| No tabs in YAML | Y | grep for tab characters in build/Src |

## Baseline mechanism

namedFormulas and dataSources in invariants.json are script-written via --update-baseline, not hand-edited: sound. The hand-maintained artefact is the RUNBOOK section 2 prose history line, last reading 925 while invariants.json holds 995, a same-day drift of 70. A baseline number is the right mechanism; the prose duplicate is not. Replace it with an auto-appended timestamped baseline log.

## Findings

| Severity | File:line | Issue | Fix |
|---|---|---|---|
| Medium | scripts/preflight.mjs, all per-file checks | No guard that build/Src is non-empty; an empty build passes every check as 0 of 0 | Assert file count at least the expected screen count before running checks |
| Low | scripts/preflight.mjs:317-333 components check | Reads power/app/Components.pa.yaml (source) while every sibling reads build/Src | Deliberate, catches orphaned build definitions; add a comment |
| Low | scripts/preflight.mjs comment numbering | Section 10 jumps to 12 | Renumber |
| Low | scripts/preflight.mjs:100-107 | namedformulas parsed by regex from fxcheck's human text, not --json | Call fxcheck.mjs --json and read report.definitions |

## Rules and checks to add

Non-empty-build guard; Coalesce-on-boolean grep; IsBlank-outside-Filter grep; literal-pixel scan; table-cell role versus typography cross-check; auto-appended timestamped baseline log replacing the RUNBOOK sentence.
