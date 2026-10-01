# The golden base

`skeleton.msapp` is the package every build's non-`Src` entries come from: `Properties.json`,
`References/*`, `Controls/*`, `Components/*`, `Resources/*`, `packed.json`. `pac canvas pack`
copies those entries verbatim out of the `.msapr` that `pac canvas unpack` writes beside `Src`, so
whatever package the skeleton was unpacked from is what Studio is asked to open, entry for entry.
Only the `Src` entries are ours.

The current file is a copy of `../downloads/Waypoint-2026-09-21T10-54-33.msapp`, the last package
Studio opened. Every build after it took its non-`Src` entries from a fresh environment download
instead, and the environment has held a corrupted `References/DataSources.json` since 19:54 on
2026-09-21 (rounded 64-bit integers), so every one of those builds failed to open with
`ErrOpeningDocument`. A download from the environment is never a base.

## The rule

The golden advances only by an explicit promotion:

    node scripts/promote-golden.mjs power/canvas/downloads/<file>.msapp --reason "<why>"

Run it only after Craig has confirmed that Studio opened the build that download came from. Nothing
in the pipeline writes this folder; `scripts/refresh-skeleton.mjs` only reads `skeleton.msapp`.

`HISTORY.md` carries one line per promotion: the date, the source file and the reason.
