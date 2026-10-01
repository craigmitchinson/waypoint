// Parity: the engine against wp_model.py's expected values for the same seed.
import { describe, expect, it } from "vitest";
import expected from "../__fixtures__/wp_expected.json";
import seedDataset from "../../seed";
import { computeParity } from "../parity";
import { addDays, parseDate } from "../dates";

const TOLERANCE = 0.005;

/** The day the fixture was worked out on, recovered from the sprint it recorded. */
const epoch = parseDate(seedDataset.settings.epoch);
const fixtureToday = addDays(
  epoch,
  (expected.delivery.cur_sprint - 1) * seedDataset.settings.sprintDays + 1,
);

type Leaf = [string, unknown];

function leaves(value: unknown, path = ""): Leaf[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}/${i}`));
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .flatMap(([k, v]) => leaves(v, `${path}/${k}`));
  }
  return [[path, value]];
}

function at(root: unknown, path: string): unknown {
  return path.split("/").filter(Boolean).reduce<unknown>(
    (o, key) => (o == null ? undefined : (o as Record<string, unknown>)[key]),
    root,
  );
}

describe("engine parity with the workbook model", () => {
  const actual = computeParity(seedDataset, fixtureToday);
  // the rule strings are the generator's prose, not values the engine works out
  const targets = leaves(expected).filter(([p]) => !p.endsWith("/rule"));

  it("reads the same quarter the fixture was built for", () => {
    expect(actual.quarter).toBe(expected.quarter);
    expect(actual.delivery.cur_sprint).toBe(expected.delivery.cur_sprint);
  });

  it("covers every value in the fixture", () => {
    expect(targets.length).toBeGreaterThan(370);
  });

  it("reproduces every value within 0.005", () => {
    const failures: string[] = [];
    for (const [path, want] of targets) {
      const got = at(actual, path);
      if (typeof want === "number" && typeof got === "number") {
        if (Math.abs(want - got) > TOLERANCE) failures.push(`${path}: expected ${want}, got ${got}`);
      } else if (want !== got) {
        failures.push(`${path}: expected ${JSON.stringify(want)}, got ${JSON.stringify(got)}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
