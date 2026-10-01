// A strict YAML syntax gate for the canvas app build.
//
//   node scripts/yamlcheck.mjs --yaml <dir>
//
// pac canvas pack copies *.pa.yaml into the .msapp verbatim (power/canvas/README.md, "pac canvas
// validate is gone"): it does not parse the YAML, so a file that is not even well formed -- a
// `// comment` written where YAML wants `# comment`, say -- packs cleanly and only fails when
// Studio opens the app. This script hands every file under <dir> to tools/yamlcheck
// (YamlDotNet's own strict parser, the .NET side already used by scripts/fxcheck.mjs for Power Fx),
// and reports the first syntax fault in each file as file:line:col. scripts/assemble-canvas.mjs
// runs it on build/Src after every assemble; the build fails if it finds anything.

import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function argOf(name) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

const yamlDir = argOf("--yaml");
if (!yamlDir || !existsSync(yamlDir)) {
  console.error("usage: node scripts/yamlcheck.mjs --yaml <dir>");
  process.exit(2);
}

const project = join(root, "tools", "yamlcheck");
const exe = join(project, "bin", "Release", "net8.0", process.platform === "win32" ? "YamlCheck.exe" : "YamlCheck");
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
    console.error("yamlcheck: the checker did not build.");
    process.exit(2);
  }
}

const run = spawnSync(exe, ["--yaml", yamlDir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: "inherit" });
process.exit(run.status ?? 2);
