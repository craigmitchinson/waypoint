# Audit 10: import mechanics and the fxcheck checker

The pipeline is well gated on what it packs but weak on what it does: the one call that mutates the environment is unguarded, the one that mutates the package edits JSON by regex, and the zip layer shells a PowerShell process per entry read while leaving full-size temp copies beside the build on failure. The C# checker loads the catalogue once per process (good), enables regex functions generally, and special-cases User(), Parent and Self by name; its blind spots are structural: no Patch change record is ever bound, and enum members define themselves from the app's own text.

| Severity | File:line | Symbol | Issue | Fix |
|---|---|---|---|---|
| High | import-app.mjs:267 | import call | Unguarded execFileSync; the "connection closed" noise the header documents throws, so the run exits at "failed at solution import" and never polls an import that landed | try/catch, keep error.stdout, fall through to the poll |
| High | patch-msapp.mjs:166-173 | settings regex | Non-global first-match text substitution over Properties.json, including inside the embedded LocalDatabaseReferences string | Parse and set the four keys, as carryCustomControl already does |
| High | build-data.mjs:429 | fieldValue | value === "true" ? "True" : "False": "True", "1" or a typo loads silently as False | Throw on a value outside a known true/false set |
| High | import-app.mjs:108-122 | lock | existsSync then write is TOCTOU (two runs both proceed); stale threshold 90 min vs RUNBOOK section 2's 40 | writeFileSync(..., {flag:"wx"}); align the constant |
| Medium | import-app.mjs:319 | poll unpack | canvas unpack unguarded (only download is); one transient failure kills the poll post-import, and it runs every iteration for a file used once | Same try/catch; unpack only after srcMatchesBuild |
| Medium | msapp-zip.mjs:80,103 | writeEntry, copyEntry | Whole-msapp temp copy written beside the original, no cleanup on throw | Temp under workDir(), removed in a finally |
| Medium | import-app.mjs:285 | pollDir | .import-poll never removed (present now); power/canvas/check*, verify*, Waypoint.check*.msapp, scripts/_audit*, _tmp_audit*, _rev_* also left behind | Poll under the temp dir; remove on success |
| Medium | Rewriter.cs:51 | FirstArgOnly | Patch, Remove, RemoveIf bind only argument 1, so a wrong column in a Patch record is invisible | Bind the change record against argument 1's row type |
| Medium | Program.cs:82-104 | enum harvest | Members are read out of the sources, so Align.Lft defines itself | Do not extend enums modern-controls.json knows |
| Medium | Program.cs:412 | Problems | One dialect error drops every "has some invalid arguments" in that formula | Drop only the umbrella at the dialect error's span |
| Medium | Program.cs:422-432 | Declare | catch (Exception) silently degrades a symbol to Deferred; readers go unchecked, unreported | Count and print as skipped |
| Medium | Program.cs:236 | round-robin | Fixed 4 rounds; a deeper named-formula chain falsely reports unresolved | Loop on progress alone |
| Medium | build-solution.mjs:203,446 | CHOICES | Module-level mutable map set inside customizationsXml; order-dependent | Pass the map |
| Medium | patch-msapp.mjs:186, msappcheck.mjs:55 | JSON.parse | Missing entry or file dies as a TypeError, not a named error | Null-check and name the entry |
| Medium | build-data.mjs:35,455 | top-level reads | OVERRIDES and ENTITY_TYPE_CODES do IO at import | Read inside main |
| Medium | msapp-zip.mjs:41-74 | powershell per call | One process per entry; srcMatchesBuild spawns one per Src entry per poll | Cache by path, or single pass like readTextUnder |
| Medium | msappcheck.mjs:86 | --after default | With no path, subject falls back to the skeleton download and can print pass | Require a path with --after |
| Low | build-solution.mjs:277,246 | dead ternaries | ? "" : "" and ? 1 : 1 | Delete |
| Low | build-solution.mjs:158/499 vs build-data.mjs:446/507 | esc, CONTENT_TYPES | Byte-identical duplicates; two root-path idioms; Locate duplicated Program.cs:487/Rules.cs:145 | Import one copy |
| Low | Catalogue.cs:27, ModernControls.cs:39 | Singular, Doc | Loaded, never read | Delete |
| Low | build-solution.mjs:563, RUNBOOK:109 | flags | --only with no value throws; --global-choices documented, parsed nowhere | Validate; drop the doc line |
| Low | build-data.mjs:505 | dataXml | new Date() stamp makes every build's bytes differ | Stamp from the seed or omit |
| Low | msapp-zip.mjs:71 | readEntry | No BOM strip though every caller JSON.parses | Strip the BOM |
| Low | Program.cs top level (~380 lines), Eval.cs:58 Run (126) | length | Over 80 lines | Extract catalogue, symbol and property phases |

## Studio error classes

Property rejected on a control type: fxcheck catches it only for the 22 modern controls in modern-controls.json; preflight's properties check catches the rest, but 16 of 17 control-properties.json entries are deny-only, so a new rejection, or any classic-control property, stays blind until paid for in Studio. Children under Properties: blind to fxcheck, caught by preflight structure. Display-name collision: blind to fxcheck, caught by build-column-catalogue and preflight columnnames. Still blind everywhere: enum member spelling, Patch and Collect record columns, variant-dependent property rules.

## Rules and checks to add

1. No execFileSync or spawnSync calling pac may sit outside a try/catch in import-app.mjs.
2. power/canvas/**/*.tmp-*, .import-poll/ and scripts/_*.mjs must not exist after a clean run; fail preflight if they do.
3. No JSON.parse in scripts/*.mjs may take an expression that can be null without a preceding null check.
4. Every msapp JSON entry edit goes through JSON.parse and stringify, never String.replace on raw text.
5. control-properties.json carries an allow set for every control identifier that appears in build/Src.
6. fxcheck reports an enum member it did not read from modern-controls.json.
7. fxcheck binds the second argument of every Patch against the first argument's row type.
8. catch blocks in tools/fxcheck/*.cs add to skipped or findings, never swallow.
9. The .import.lock staleness constant equals the minutes stated in RUNBOOK section 2.
10. Every flag named in RUNBOOK section 2 appears in an argv read in the script it names.
