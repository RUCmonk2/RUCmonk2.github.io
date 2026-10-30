import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { createJiti } from "jiti";
import katex from "katex";

const { capacitorState, particleState } = await createJiti(
  import.meta.url,
).import("../src/data/physics-midterm/models.ts");

const approx = (actual, expected, label) =>
  assert.ok(
    Math.abs(actual - expected) <= Math.max(1e-12, Math.abs(expected) * 1e-10),
    `${label}: ${actual} != ${expected}`,
  );
const voltageHeld = capacitorState("voltage", 2);
const chargeHeld = capacitorState("charge", 2);
approx(voltageHeld.capacitance, 0.5, "double distance halves capacitance");
approx(voltageHeld.charge, 0.5, "connected: charge halves");
approx(voltageHeld.field, 0.5, "connected: field halves");
approx(chargeHeld.voltage, 2, "disconnected: voltage doubles");
approx(chargeHeld.field, 1, "disconnected: field unchanged");

const base = particleState(1, -10, 1e5);
const reversedCharge = particleState(-1, -10, 1e5);
const reversedVoltage = particleState(1, 10, 1e5);
const faster = particleState(1, -10, 2e5);
approx(base.y, 0.01, "positive charge bends upward in L4");
approx(base.time, 2e-6, "transit time");
approx(reversedCharge.y, -base.y, "charge reversal symmetry");
approx(reversedVoltage.y, -base.y, "voltage reversal symmetry");
approx(faster.y, base.y / 4, "double initial speed quarters deflection");
assert.equal(base.hitsPlate, false);
assert.equal(particleState(1, 0, 5e4).hitsPlate, false);
approx(particleState(1, 0, 5e4).y, 0, "no field means no deflection");
const collision = particleState(1, 50, 5e4);
assert.equal(collision.hitsPlate, true);
approx(collision.y, -0.05, "collision ends on lower plate");
assert.ok(
  collision.x < 0.2 && collision.time < collision.exitTime,
  "collision must end before nominal exit",
);
const threshold = particleState(1, 50, 1e5);
assert.equal(
  threshold.hitsPlate,
  true,
  "touching the edge is not a clear exit",
);

const data = JSON.parse(
  readFileSync(
    new URL("../src/data/physics-midterm/questions.json", import.meta.url),
    "utf8",
  ),
);
const expected = [
  "D1",
  "D2",
  "D3",
  "D4",
  "D5",
  "L1",
  "V1",
  "L2",
  "V2",
  "L3",
  "V3",
  "L4",
  "V4",
  "E1",
  "E2",
  "E3",
];
assert.deepEqual(
  data.items.map((item) => item.id),
  expected,
);
let mathCount = 0;
for (const item of data.items) {
  assert.ok(
    item.title &&
      item.prompt &&
      item.answer &&
      item.steps.length &&
      item.pitfalls.length,
    item.id,
  );
  for (const text of [
    item.prompt,
    item.answer,
    ...item.steps,
    ...item.pitfalls,
  ]) {
    for (const match of text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g)) {
      katex.renderToString(match[1] ?? match[2], {
        throwOnError: true,
        strict: "error",
        trust: false,
      });
      mathCount++;
    }
  }
}
console.log(
  `Physics midterm: 16 consistent question IDs; ${mathCount} formulas rendered; capacitor invariants, particle signs/scaling and collision limits passed.`,
);
