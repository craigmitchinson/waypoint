// The canvas app's named formulas run against the seed data, offline, and compared with the
// workbook's expected values.
//
//   node scripts/parity.mjs ["<expression>" ...]
//
// With no expressions it runs the headline set: NetTotal, CommittedTotal, ReservedTotal, InPlanMW,
// DeliveredMW, GbpInYear and the per-squad Net, Committed, Utilisation and Reserved columns of
// SquadTable, each beside its case in power/tests/expected.json. The work is done by fxcheck's
// --eval mode (tools/fxcheck/Eval.cs), which loads power/data/src/data.xml as in-memory tables
// typed from power/canvas/columns.json, replays OnStart's collections and then evaluates every
// named formula in power/app/Formulas.pa.yaml.
//
// Exit code 1 means a headline figure is off its fixture value at the tolerance expected.json names.
// The clock is pinned to expected.json's own "asOf" date, the day the fixture was worked out on, so
// every delivery and sprint case sees the same Today() the workbook generator saw.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const project = join(root, "tools", "fxcheck");
const exe = join(project, "bin", "Release", "net8.0", process.platform === "win32" ? "FxCheck.exe" : "FxCheck");
const dotnet = existsSync("C:/Program Files/dotnet/dotnet.exe") ? "C:/Program Files/dotnet/dotnet.exe" : "dotnet";

function newest(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".cs") || f.endsWith(".csproj"))
    .reduce((t, f) => Math.max(t, statSync(join(dir, f)).mtimeMs), 0);
}

if (!existsSync(exe) || statSync(exe).mtimeMs < newest(project)) {
  const build = spawnSync(dotnet, ["build", "-c", "Release", "--nologo", "-v", "quiet", project], { encoding: "utf8" });
  if (build.status !== 0) {
    process.stderr.write((build.stdout ?? "") + (build.stderr ?? ""));
    console.error("parity: the checker did not build.");
    process.exit(2);
  }
}

const expectedPath = join(root, "power", "tests", "expected.json");
const expected = JSON.parse(readFileSync(expectedPath, "utf8"));

const toolArgs = [
  "--eval", ...process.argv.slice(2),
  "--columns", join(root, "power", "canvas", "columns.json"),
  "--data", join(root, "power", "data", "src", "data.xml"),
  "--formulas", join(root, "power", "app", "Formulas.pa.yaml"),
  "--onstart", join(root, "power", "app", "App.pa.yaml"),
  "--expected", expectedPath,
  ...(expected.asOf ? ["--asof", expected.asOf] : []),
];

const run = spawnSync(exe, toolArgs, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: "inherit" });
process.exit(run.status ?? 2);
