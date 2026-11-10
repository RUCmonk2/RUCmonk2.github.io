import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const {
  atExit,
  boardKey,
  cellMask,
  classic,
  legalMoves,
  locked,
  shapes,
  slide,
  stateGraph,
} = await jiti.import("../src/lib/math-lab/klotski.ts");
const board = [];
const queue = [];
const distances = Object.create(null);
const equivalent = new Set([2, 3, 4, 7, 8, 9]);
function enumerate(i, used) {
  if (i === shapes.length) {
    if (atExit(board)) {
      const goal = board.slice();
      distances[boardKey(goal)] = 0;
      queue.push(goal);
    }
    return;
  }
  const [w, h] = shapes[i];
  for (let p = equivalent.has(i) ? board[i - 1] + 1 : 0; p < 20; p++) {
    const cells = cellMask(p % 4, Math.floor(p / 4), w, h);
    if (!cells || cells & used) continue;
    board.push(p);
    enumerate(i + 1, used | cells);
    board.pop();
  }
}
// Board-contained slides are reversible, so a multi-source BFS from the exit
// gives exact remaining distances using the same straight-slide step as play.
enumerate(0, 0);
for (const state of queue) {
  const distance = distances[boardKey(state)];
  for (const move of legalMoves(state)) {
    const next = slide(state, move);
    const key = boardKey(next);
    if (distances[key] !== undefined) continue;
    distances[key] = distance + 1;
    queue.push(next);
  }
}
assert.equal(queue.length, 53954);
assert.equal(distances[boardKey(locked)], undefined);
assert.equal(stateGraph(locked, Infinity).nodes.length, 6);
assert.deepEqual(legalMoves(locked), [
  { piece: 5, to: 18 },
  { piece: 9, to: 19 },
]);
assert(distances[boardKey(classic)] > 0);
// A bottom-row soldier with two empty squares ahead may stop in either.
const twoStops = [1, 0, 3, 8, 11, 9, 13, 14, 16, 17];
assert.deepEqual(
  legalMoves(twoStops)
    .filter((m) => m.piece === 9 && m.to >= 16)
    .map((m) => m.to),
  [18, 19],
);
assert(!legalMoves(classic).some((m) => m.piece === 8 && m.to === 19));
assert(!legalMoves(twoStops).some((m) => m.piece === 8 && m.to === 18));
// Verify the mini experiment's complete parity class by legal blank moves.
const mini = [[1, 2, 3, 4, 5, 0]];
const seen = new Set([mini[0].join("")]);
for (const state of mini) {
  const blank = state.indexOf(0);
  for (let p = 0; p < 6; p++) {
    if (
      Math.abs((p % 3) - (blank % 3)) +
        Math.abs(Math.floor(p / 3) - Math.floor(blank / 3)) !==
      1
    )
      continue;
    const next = state.slice();
    [next[blank], next[p]] = [next[p], next[blank]];
    const key = next.join("");
    if (!seen.has(key)) {
      seen.add(key);
      mini.push(next);
    }
  }
}
assert.equal(seen.size, 360);
assert(!seen.has("123540"));
await writeFile(
  new URL("../public/assets/klotski-distances-v1.json", import.meta.url),
  JSON.stringify(distances) + "\n",
);
console.log(
  `Klotski: ${queue.length} reachable positions; classic ${distances[boardKey(classic)]} slides; locked fixture 6 positions.`,
);
