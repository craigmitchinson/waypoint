// The whole round trip from power/app to the environment, in one command.
//
//   node scripts/import-app.mjs
//
// It holds power/canvas/.import.lock for the whole round trip. assemble-canvas.mjs,
// patch-msapp.mjs and preflight.mjs --update-baseline refuse to run while that lock is there, so
// nothing rewrites the build underneath an import; the steps this script runs itself are let
// through by WAYPOINT_IMPORT=1 in their environment.
//
// pac solution import answers "The underlying connection was closed" on every attempt of a large
// import and "Cannot start another [Import] because there is a previous [Import] running" in
// between (power/canvas/README.md), and the import lands all the same. Retrying the import itself
// into a job that is still running is what corrupts it. So this script imports once, asynchronously,
// and then polls by downloading the app and comparing it to the build, rather than retrying the
// import call.
//
// --msapp <path> is a diagnostic escape hatch for bisecting a Studio open failure (see
// scripts/make-hybrid-msapp.mjs): it skips steps 2, 4 and 4a below and imports the given packed
// .msapp as-is in place of the assembled build, still running msappcheck (4b) and the poll (10)
// against it.
//
// Steps:
//   1. scripts/refresh-skeleton.mjs   unpacks the golden base (power/canvas/golden/skeleton.msapp),
//                                    which every non-Src entry comes from, and downloads the current
//                                    app for the poll comparison and the data source names
//   2. scripts/assemble-canvas.mjs    writes power/app into power/canvas/build/Src, then yamlchecks it
//   3. scripts/fxcheck.mjs            must be 0 errors, 0 skipped, before anything is packed
//   4. pac canvas pack                power/canvas/build -> Waypoint.build.msapp
//   4a. scripts/patch-msapp.mjs      scale to fit / aspect ratio / orientation off, row limit 2000,
//                                    and the code component registrations pack cannot write
//   4b. scripts/msappcheck.mjs       the build must carry every entry the golden base has, and a
//                                    registration for every code component Src references
//   5. pac solution export            the Waypoint solution, as it stands in the environment
//   6. pac solution unpack            into power/solution/export/unpacked_new
//   7. replace the .msapp under its CanvasApps/ with Waypoint.build.msapp
//   8. pac solution pack              power/solution/export/unpacked_new -> Waypoint.repacked.zip
//   9. pac solution import --async true --max-async-wait-time 30 --activate-plugins false
//      --force-overwrite --publish-changes
//  10. poll: every 30s, pac canvas download, and compare its Src against the Src inside
//      Waypoint.build.msapp - not against build/Src, which another unit can reassemble while the
//      poll is running - until identical or 15 minutes pass
//  11. verify the downloaded app's References/DataSources.json still lists the wp_ tables
//  12. scripts/msappcheck.mjs --after  the same two checks against the app that came back

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { listEntries, readEntry } from "./msapp-zip.mjs";
import { pacCmd } from "./lib/pac.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const canvasDir = join(root, "power", "canvas");
const solutionDir = join(root, "power", "solution");
const buildMsapp = join(canvasDir, "Waypoint.build.msapp");
const exportDir = join(solutionDir, "export");
const unpackedNew = join(exportDir, "unpacked_new");
const exportedZip = join(exportDir, "Waypoint.exported.zip");
const repackedZip = join(exportDir, "Waypoint.repacked.zip");

const pac = pacCmd();
const node = process.execPath;
const logEvalScript = join(root, "scripts", "log-eval.mjs");

// ---- the claim ----------------------------------------------------------------------------------
// power/tests/evaluation-log.md exists to show whether a build read better than the last one, which
// only works if every row says what the build was for. No claim, no import.
const claimFlag = process.argv.indexOf("--claim");
const claim = claimFlag !== -1 ? process.argv[claimFlag + 1] : undefined;
if (!claim || claim.startsWith("--")) {
  console.error(
    'import-app: --claim "<what this build was meant to fix>" is required; the evaluation log ' +
    "has no way to say what a row was for without it.",
  );
  process.exit(1);
}
const buildStamp = new Date().toISOString().slice(0, 16).replace("T", " ");

// ---- --msapp: import a given packed .msapp as-is, skipping assemble, pack and patch ------------
const msappFlag = process.argv.indexOf("--msapp");
const givenMsapp = msappFlag !== -1 ? process.argv[msappFlag + 1] : undefined;
if (givenMsapp && !existsSync(givenMsapp)) {
  console.error(`import-app: --msapp ${givenMsapp} does not exist.`);
  process.exit(1);
}

// ---- --diagnostic: with --msapp, softens preflight check 30 (dsmetadata) to a WARN, for a hybrid
// bisect package whose table metadata is known to be stale (power/RUNBOOK.md, "Diagnostics"). The
// claim is tagged so the evaluation-log row is never mistaken for a normal build's result.
const diagnostic = process.argv.includes("--diagnostic");
if (diagnostic) process.env.WAYPOINT_DIAGNOSTIC = "1";
const loggedClaim = diagnostic ? `[diagnostic] ${claim}` : claim;

/** Writes (or updates) this build's row in power/tests/evaluation-log.md. Never throws: a logging
 * failure should not hide the import result that led to it. */
function logEval(args) {
  const flatArgs = [];
  for (const [flag, value] of Object.entries(args)) {
    if (value !== undefined) flatArgs.push(`--${flag}`, value);
  }
  try {
    execFileSync(node, [logEvalScript, ...flatArgs], { stdio: "inherit", cwd: root });
  } catch (error) {
    console.error(`import-app: log-eval failed (${error.message}); the row for ${buildStamp} may be incomplete.`);
  }
}

let stage = "start";
let offline;
let logged = false;
/** Writes the row once, whatever stage failed at. */
function logFailure() {
  if (logged) return;
  logged = true;
  logEval({ build: buildStamp, claim: loggedClaim, offline, roundtrip: `failed at ${stage}` });
}
process.on("uncaughtException", (error) => {
  console.error(`import-app: unhandled error at ${stage}: ${error.message}`);
  logFailure();
  process.exit(1);
});

// ---- the import lock ---------------------------------------------------------------------------
// One import at a time, and nothing reassembling or repacking while it runs. The lock is touched
// before every long pac call and at each poll iteration, so its mtime tracks a live run; a lock
// older than forty minutes (power/RUNBOOK.md section 2) is left over from a run that was killed and
// is removed with a warning rather than blocking the day. The lock is created with the "wx" flag so
// that two runs racing to check existsSync then write cannot both proceed: only one create can win.
const lockFile = join(canvasDir, ".import.lock");
const staleAfterMs = 40 * 60 * 1000;
mkdirSync(canvasDir, { recursive: true });
function createLock() {
  try {
    writeFileSync(lockFile, `${new Date().toISOString()}\n`, { flag: "wx" });
    return true;
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    return false;
  }
}
if (!createLock()) {
  const ageMs = Date.now() - statSync(lockFile).mtimeMs;
  if (ageMs > staleAfterMs) {
    console.warn(`import-app: WARNING, removing a stale ${lockFile}, ${Math.round(ageMs / 60000)} minutes old.`);
    rmSync(lockFile, { force: true });
    if (!createLock()) {
      console.error(`import-app: another import claimed ${lockFile} first; not starting a second one.`);
      process.exit(1);
    }
  } else {
    console.error(
      `import-app: an import started ${Math.round(ageMs / 60000)} minute(s) ago holds ${lockFile}; ` +
      "not starting a second one.",
    );
    process.exit(1);
  }
}
const touchLock = () => writeFileSync(lockFile, `${new Date().toISOString()}\n`);
process.env.WAYPOINT_IMPORT = "1";
const releaseLock = () => {
  try {
    rmSync(lockFile, { force: true });
  } catch {
    // The lock is advisory; a failure to remove it is not worth failing the import over.
  }
};
process.on("exit", releaseLock);
for (const signal of ["SIGINT", "SIGTERM", "SIGHUP", "SIGBREAK"]) {
  process.on(signal, () => {
    releaseLock();
    process.exit(1);
  });
}

function run(cmd, args, opts = {}) {
  console.log(`$ ${cmd} ${args.join(" ")}`);
  return execFileSync(cmd, args, { stdio: "inherit", shell: true, cwd: root, ...opts });
}

function runNode(script, args = []) {
  console.log(`$ node ${script} ${args.join(" ")}`);
  return execFileSync(node, [script, ...args], { stdio: "inherit", cwd: root });
}

/** Runs a node script, printing its output as usual but also returning it, so a caller can read
 * the summary lines a check already prints rather than reimplementing the check. */
function runNodeCapture(script, args = []) {
  console.log(`$ node ${script} ${args.join(" ")}`);
  try {
    const stdout = execFileSync(node, [script, ...args], { cwd: root, encoding: "utf8" });
    process.stdout.write(stdout);
    return { status: 0, stdout };
  } catch (error) {
    process.stdout.write(error.stdout ?? "");
    process.stderr.write(error.stderr ?? "");
    return { status: error.status ?? 1, stdout: error.stdout ?? "" };
  }
}

/** "preflight P/T, fxcheck E errors, parity C cases", read off preflight's own PASS/FAIL lines
 * rather than re-run anything it already checked offline. */
function summariseOffline(preflightOutput) {
  const lines = preflightOutput.split(/\r?\n/);
  const total = lines.filter((line) => /^(PASS|FAIL)\s/.test(line)).length;
  const passed = lines.filter((line) => /^PASS\s/.test(line)).length;
  const errors = (preflightOutput.match(/fxcheck\s+(\d+) errors/) ?? [])[1] ?? "?";
  const cases = (preflightOutput.match(/(\d+) fixture case\(s\)/) ?? [])[1] ?? "?";
  return `preflight ${passed}/${total}, fxcheck ${errors} errors, parity ${cases} cases`;
}

// ---- 1. refresh the skeleton -----------------------------------------------------------------
// The base is power/canvas/golden/skeleton.msapp, not the download this step also takes: a
// download from the environment is never a base (power/RUNBOOK.md, section 2, "The base rule").
stage = "refresh-skeleton";
runNode(join(root, "scripts", "refresh-skeleton.mjs"));

// ---- 2. assemble (yamlcheck runs inside it) --------------------------------------------------
stage = "assemble-canvas";
if (givenMsapp) {
  console.log("import-app: --msapp given, skipping assemble-canvas.");
} else {
  runNode(join(root, "scripts", "assemble-canvas.mjs"));
}

// ---- 3. fxcheck must be clean -----------------------------------------------------------------
stage = "fxcheck";
try {
  runNode(join(root, "scripts", "fxcheck.mjs"));
} catch (error) {
  console.error("import-app: fxcheck did not report 0 errors; not packing or importing.");
  logFailure();
  process.exit(1);
}

// ---- 4. pack the canvas app, or take the given .msapp as-is ------------------------------------
stage = "pack";
if (givenMsapp) {
  console.log(`import-app: --msapp given, skipping pack; importing ${givenMsapp} as-is.`);
  cpSync(givenMsapp, buildMsapp, { force: true });
} else {
  touchLock();
  run(pac, [
    "canvas", "pack",
    "--sources", join(canvasDir, "build"),
    "--msapp", buildMsapp,
    "--layout", "SourceCode",
    "--overwrite",
  ]);
}

// ---- 4a. patch the display settings pack cannot write ----------------------------------------
// Scale to fit, lock aspect ratio and lock orientation live in Properties.json inside the .msapp,
// not in the YAML, so pack writes the blank app's fixed 1366x768 letterboxed defaults every time.
// The package metadata rewrite is off unless --reconcile is passed through: Studio owns package
// metadata (power/decisions.md), and patch-msapp.mjs defaults to leaving it untouched.
stage = "patch-msapp";
if (givenMsapp) {
  console.log("import-app: --msapp given, skipping patch-msapp.");
} else {
  runNode(
    join(root, "scripts", "patch-msapp.mjs"),
    process.argv.includes("--reconcile") ? [buildMsapp, "--reconcile"] : [buildMsapp],
  );
}

// ---- 4b. the carriage gate -------------------------------------------------------------------
// A pack builds the package from Src alone, so a code component registration, or anything else
// Studio holds outside Src, can go missing without the pack or the import complaining. Still run
// against a --msapp given as-is: it is the package that is about to be imported either way.
stage = "msappcheck before";
try {
  runNode(join(root, "scripts", "msappcheck.mjs"), [buildMsapp]);
} catch {
  console.error("import-app: msappcheck failed; not exporting, swapping or importing.");
  logFailure();
  process.exit(1);
}

// ---- 4c. preflight must pass before anything is exported ---------------------------------------
stage = "preflight";
const preflight = runNodeCapture(join(root, "scripts", "preflight.mjs"), diagnostic ? ["--diagnostic"] : []);
if (preflight.status !== 0) {
  console.error("import-app: preflight did not pass; not exporting, swapping or importing.");
  logFailure();
  process.exit(1);
}
offline = summariseOffline(preflight.stdout);

// ---- 5. export the solution that holds the app -------------------------------------------------
stage = "solution export";
touchLock();
mkdirSync(exportDir, { recursive: true });
run(pac, ["solution", "export", "--name", "Waypoint", "--path", exportedZip, "--managed", "false", "--overwrite"]);

// ---- 6. unpack it ------------------------------------------------------------------------------
stage = "solution unpack";
touchLock();
rmSync(unpackedNew, { recursive: true, force: true });
run(pac, ["solution", "unpack", "--zipfile", exportedZip, "--folder", unpackedNew, "--packagetype", "Unmanaged"]);

// ---- 7. replace the .msapp with our build -----------------------------------------------------
stage = "msapp swap";
const canvasAppsDir = join(unpackedNew, "CanvasApps");
const msappEntries = readdirSync(canvasAppsDir).filter((f) => f.endsWith(".msapp"));
if (msappEntries.length !== 1) {
  console.error(`import-app: expected one .msapp under ${canvasAppsDir}, found ${msappEntries.length}.`);
  logFailure();
  process.exit(1);
}
cpSync(buildMsapp, join(canvasAppsDir, msappEntries[0]), { force: true });
console.log(`Replaced ${msappEntries[0]} with the build's msapp`);

// ---- 8. pack the solution back up --------------------------------------------------------------
stage = "solution pack";
touchLock();
rmSync(repackedZip, { force: true });
run(pac, ["solution", "pack", "--zipfile", repackedZip, "--folder", unpackedNew, "--packagetype", "Unmanaged"]);

// ---- 9. import, asynchronously -------------------------------------------------------------------
stage = "solution import";
touchLock();
console.log(`$ ${pac} solution import --path ${repackedZip} ...`);
// "The underlying connection was closed" and "Cannot start another [Import]" are noise this call
// throws on even when the import lands anyway (the header above), so a failure here does not exit:
// it falls through to the poll, which is the only reliable way to know whether the import landed.
let importOutput;
try {
  importOutput = execFileSync(
    pac,
    [
      "solution", "import",
      "--path", repackedZip,
      "--force-overwrite",
      "--async", "true",
      "--max-async-wait-time", "30",
      "--activate-plugins", "false",
      "--publish-changes",
    ],
    { shell: true, cwd: root, encoding: "utf8" },
  );
} catch (error) {
  importOutput = error.stdout ?? "";
  console.error(
    `import-app: solution import raised ${error.message}; the import may still have landed, falling through to the poll.`,
  );
}
process.stdout.write(importOutput);
const importId = (importOutput.match(/Import Id[:\s]+([0-9a-fA-F-]{36})/) ?? [])[1] ?? "unknown";

// ---- 10. poll: download and compare, rather than retry the import -----------------------------
stage = "poll";
const pollDir = join(root, ".import-poll");
rmSync(pollDir, { recursive: true, force: true });
mkdirSync(pollDir, { recursive: true });

// The Src the import carried, taken out of the packed .msapp rather than off power/canvas/build:
// build/Src is a working directory another unit can reassemble while this poll runs, and a poll
// against a moving target never converges. The .msapp has not changed since step 4a packed it.
const buildSrcEntries = listEntries(buildMsapp).filter((entry) => entry.startsWith("Src/")).sort();
const buildSrcText = new Map(buildSrcEntries.map((entry) => [entry, readEntry(buildMsapp, entry)]));

/** True if a downloaded .msapp has the same Src entries, with the same text, as the build's. */
function srcMatchesBuild(downloadedMsapp) {
  const theirs = listEntries(downloadedMsapp).filter((entry) => entry.startsWith("Src/")).sort();
  if (theirs.length !== buildSrcEntries.length || theirs.some((name, i) => name !== buildSrcEntries[i])) {
    return false;
  }
  return theirs.every((entry) => readEntry(downloadedMsapp, entry) === buildSrcText.get(entry));
}

const deadline = Date.now() + 15 * 60 * 1000;
let landed = false;
let attempt = 0;
while (Date.now() < deadline) {
  attempt += 1;
  touchLock();
  const downloaded = join(pollDir, `Waypoint-poll-${attempt}.msapp`);
  try {
    run(pac, ["canvas", "download", "--name", "Waypoint", "--file-name", downloaded, "--overwrite"]);
  } catch (error) {
    console.log(`Poll ${attempt}: download failed, retrying in 30s (${error.message})`);
    await sleep(30_000);
    continue;
  }
  const downloadSrc = join(pollDir, `src-${attempt}`);
  try {
    run(pac, ["canvas", "unpack", "--msapp", downloaded, "--sources", downloadSrc, "--layout", "SourceCode", "--overwrite"]);
  } catch (error) {
    console.log(`Poll ${attempt}: unpack failed, retrying in 30s (${error.message})`);
    await sleep(30_000);
    continue;
  }
  if (srcMatchesBuild(downloaded)) {
    console.log(`Poll ${attempt}: the downloaded app's Src matches the Src in Waypoint.build.msapp. The import has landed.`);
    landed = true;
    // ---- 11. verify DataSources.json still lists the wp_ tables ---------------------------------
    stage = "datasources verify";
    const dsFile = join(downloadSrc, "Src", "datasources.json");
    let names = [];
    if (existsSync(dsFile)) {
      names = JSON.parse(readFileSync(dsFile, "utf8")).names ?? [];
    } else {
      const out = readEntry(downloaded, "References/DataSources.json");
      names = out ? (JSON.parse(out).DataSources ?? []).map((e) => e.Name) : [];
    }
    const wp = names.filter((n) => n.startsWith("wp_"));
    console.log(`References/DataSources.json: ${names.length} data sources, ${wp.length} starting wp_.`);
    if (wp.length === 0) {
      console.error("import-app: no wp_ tables in the landed app's DataSources.json.");
      logFailure();
      process.exit(1);
    }

    // ---- 12. the carriage gate again, on what came back ---------------------------------------
    stage = "msappcheck after";
    try {
      runNode(join(root, "scripts", "msappcheck.mjs"), ["--after", downloaded]);
    } catch {
      console.error("import-app: msappcheck --after failed on the landed app.");
      logFailure();
      process.exit(1);
    }
    break;
  }
  console.log(`Poll ${attempt}: not landed yet, waiting 30s.`);
  await sleep(30_000);
}

if (!landed) {
  console.error("import-app: the import had not landed after 15 minutes.");
  logFailure();
  process.exit(1);
}

rmSync(pollDir, { recursive: true, force: true });

logEval({
  build: buildStamp,
  claim: loggedClaim,
  offline,
  roundtrip: `msappcheck before pass/after pass, import ${importId}, poll ${attempt}`,
  studio: "not checked",
  player: "not checked",
});
logged = true;

console.log("import-app: done.");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
