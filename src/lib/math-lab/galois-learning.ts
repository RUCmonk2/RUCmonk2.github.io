import { compose, identity, inverse, type Permutation } from "./galois";

/** The three unordered partitions of four labels into two unordered pairs. */
export const FOUR_PAIRINGS = [
  [
    [0, 1],
    [2, 3],
  ],
  [
    [0, 2],
    [1, 3],
  ],
  [
    [0, 3],
    [1, 2],
  ],
] as const;

function pairingKey(pairing: readonly (readonly number[])[]) {
  return pairing
    .map((pair) => [...pair].sort((a, b) => a - b).join(","))
    .sort()
    .join("|");
}

const pairingKeys = FOUR_PAIRINGS.map(pairingKey);

/** Return the induced permutation of the three pairings, in their listed order. */
export function fourPairingAction(p: Permutation): Permutation {
  // compose validates both the permutation and the required degree of four.
  const validated = compose(p, identity(4));
  return FOUR_PAIRINGS.map((pairing) => {
    const image = pairing.map((pair) => pair.map((label) => validated[label]));
    return pairingKeys.indexOf(pairingKey(image));
  });
}

/**
 * Five frames for AB(BA)^−1: start, undo B, undo A, do B, do A.
 * Every frame maps original labels to their current positions.
 */
export function orderDifferenceTrace(
  a: Permutation,
  b: Permutation,
): Permutation[] {
  const validatedProduct = compose(a, b);
  const frames = [identity(validatedProduct.length)];
  for (const action of [inverse(b), inverse(a), b, a]) {
    frames.push(compose(action, frames[frames.length - 1]));
  }
  return frames;
}
