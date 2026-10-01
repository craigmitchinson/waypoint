// Advance the golden base: the package every build's non-Src entries come from.
//
//   node scripts/promote-golden.mjs <path/to/downloaded.msapp> --reason "<why>"
//
// It copies the given .msapp over power/canvas/golden/skeleton.msapp and appends a line to
// power/canvas/golden/HISTORY.md with the date, the source file and the reason. Nothing else in the
// pipeline writes that folder: scripts/refresh-skeleton.mjs only reads it.
//
// Run it only after Craig has confirmed that Studio opened the build the given download came from.
// Studio opening a build is what promotes the golden; a download from the environment is never a
// base on its own (power/RUNBOOK.md, section 2).

import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const goldenDir = join(root, "power", "canvas", "golden");
const goldenMsapp = join(goldenDir, "skeleton.msapp");
const historyFile = join(goldenDir, "HISTORY.md");

const args = process.argv.slice(2);
const reasonAt = args.indexOf("--reason");
const reason = reasonAt !== -1 ? args[reasonAt + 1] : undefined;
const given = args.filter((arg, at) => !arg.startsWith("--") && at !== reasonAt + 1)[0];

if (!given || !reason) {
  console.error('promote-golden: <path/to/downloaded.msapp> --reason "<why>" are both required.');
  process.exit(1);
}

const source = resolve(root, given);
if (!existsSync(source)) {
  console.error(`promote-golden: no .msapp at ${source}.`);
  process.exit(1);
}

copyFileSync(source, goldenMsapp);

const date = new Date().toISOString().slice(0, 10);
const relSource = relative(root, source).replace(/\\/g, "/");
const history = existsSync(historyFile) ? readFileSync(historyFile, "utf8") : "# Golden base history\n";
writeFileSync(historyFile, `${history.replace(/\n+$/, "")}\n- ${date} — ${relSource} — ${reason}\n`, "utf8");

console.log(`promote-golden: ${relSource} is now the golden base at ${relative(root, goldenMsapp).replace(/\\/g, "/")}.`);
console.log(`promote-golden: recorded in ${relative(root, historyFile).replace(/\\/g, "/")}.`);
console.log("promote-golden: run scripts/refresh-skeleton.mjs to unpack the new base before the next build.");
