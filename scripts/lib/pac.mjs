// Resolves the Power Platform CLI: PAC_CMD if set, else the default Windows install, else pac on PATH.
import { existsSync } from "node:fs";
import path from "node:path";

export function pacCmd() {
  if (process.env.PAC_CMD) return process.env.PAC_CMD;
  if (process.platform === "win32" && process.env.LOCALAPPDATA) {
    const local = path.join(process.env.LOCALAPPDATA, "Microsoft", "PowerAppsCLI", "pac.cmd");
    if (existsSync(local)) return local;
  }
  return "pac";
}
