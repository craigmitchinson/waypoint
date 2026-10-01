# Audit 08: generator and sweep scripts

Summary: the eight scripts are individually sound. Each does one documented job, RUNBOOK section 2 names seven of the eight (build-deck is the exception, undocumented there), and none writes outside power/canvas/{source,downloads,build} or power/deck. But two scripts (assemble-canvas.mjs, refresh-skeleton.mjs) reimplement zip-reading PowerShell that scripts/msapp-zip.mjs already exports and four other scripts already import, and three scripts disagree on whether a rewrite preserves the file's original line ending, which is a real inconsistency across sweeps that touch the same power/app/Screens files.

| Severity | File:line | Symbol | Issue | Proposed fix |
|---|---|---|---|---|
| High | refresh-skeleton.mjs:74-85 | catch block reading the download's zip | A PowerShell/zip failure is caught, logged with console.log (not stderr), and the script still writes datasources.json with an empty names array and exits 0; assemble-canvas.mjs then reads that empty list as "no Dataverse table connected" | On read failure, console.error and process.exit(1) instead of writing a false-negative empty result |
| High | assemble-canvas.mjs:126-127 | dataSourceNamesFromMsapp catch | Same zip-read failure is swallowed with no log at all, returning [] silently | Log the caught error before returning [] |
| High | assemble-canvas.mjs:104-135; refresh-skeleton.mjs:55-90 | dataSourceNamesFromMsapp / inline PS block | Both hand-roll a near-identical PowerShell script to read References/DataSources.json from a zip; scripts/msapp-zip.mjs already exports readEntry/listEntries for exactly this and is imported by import-app.mjs, msappcheck.mjs, patch-msapp.mjs, preflight.mjs | Replace both with readEntry(msapp, "References/DataSources.json") from msapp-zip.mjs |
| Medium | swap-text-controls.mjs:225; compile-tables.mjs:431 | writeFileSync(..., lines.join("\n")) | Both read with \r\n stripped and write with bare \n, silently converting CRLF power/app files to LF; sweep-a11y.mjs:175-176,271 detects and preserves the original newline for the same file set | Reuse sweep-a11y's newline-detection in the other two writers, or extract one shared helper |
| Medium | assemble-canvas.mjs, compile-tables.mjs, build-deck.mjs, preflight.mjs | readFileSync(...).replace(/\r\n/g, "\n") | The identical one-liner is reimplemented at least 8 times across these files with no shared module | One readText(path) helper in a lib file |
| Medium | build-deck.mjs:597-689 (drawDiagramA), 828-917 (drawBuildStrip) | drawDiagramA, drawBuildStrip | Two functions over 80-90 lines mixing layout arithmetic with slide.addText/addShape calls | Split geometry computation from the draw calls |
| Low | assemble-canvas.mjs:190-201 vs 477-489 | staleComponents / removedFiles | Stale-component set is computed twice (once from source dir to print a WARN, again from build dir to actually delete), and only components get the early WARN; a dropped screen is pruned with no equivalent warning, only the final "removed" line | Compute the stale set once; warn screens and components the same way |
| Low | compile-tables.mjs | typeDefaults, roleType, resolveColumns, tableFormulas exports | Exported but only ever used inside the same file; no other script imports them | Drop export from the four, or note them as public API deliberately |

Scratch-file candidates in scripts/ (not deleted): _audit_typo.mjs, _audit2.mjs, _audit3.mjs, _audit4.mjs, _audit5.mjs, _audit6.mjs, _rev_q1.mjs, _rev_q2.mjs, _rev_wi.json (84 KB), _rev_wi.mjs, _tmp_audit.mjs, _tmp_audit2.mjs. All twelve were written within one three-minute window on 2026-09-21 around 14:22 to 14:25 by reviewer agents during the audit; several import from compile-tables.mjs the way the real scripts do. Throwaway exploration copies, not production code. Delete them and add the rule below.

## Rules and checks to add

1. Grep scripts/*.mjs for Add-Type -AssemblyName System.IO.Compression outside msapp-zip.mjs; fail if found.
2. Grep scripts/*.mjs for readFileSync( immediately followed by .replace(/\r\n/g on more than one file without an import from a shared lib module.
3. Grep scripts/*.mjs write calls for .join("\n") where the same file's read path stripped \r\n, without a newline/eol variable computed first.
4. Fail any script whose catch block around a subprocess call does not call console.error or process.exit(1) on the failing path.
5. Glob scripts/ for filenames matching ^_ or containing tmp or rev (case-insensitive); fail preflight if any exist. Agents write scratch to the session scratchpad, never to the repo.
6. Grep RUNBOOK.md for every scripts/*.mjs filename; fail if a script in scripts/ is not named there.
