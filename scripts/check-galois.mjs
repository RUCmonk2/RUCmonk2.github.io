import assert from "node:assert/strict";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const {
  commutator,
  compose,
  conjugacyClassesA5,
  cycleNotation,
  derivedSeries,
  derivedSubgroup,
  extendPermutation,
  identity,
  inverse,
  normalClosureInA5,
  parity,
  symmetricGroup,
} = await jiti.import("../src/lib/math-lab/galois.ts");
const { FOUR_PAIRINGS, fourPairingAction, orderDifferenceTrace } =
  await jiti.import("../src/lib/math-lab/galois-learning.ts");

const key = (p) => p.join(",");
const sameElements = (actual, expected) =>
  assert.deepEqual(new Set(actual.map(key)), new Set(expected.map(key)));

// Concrete actions establish the convention independently of abstract identities.
const a = [1, 2, 0, 3, 4]; // (1 2 3)
const b = [0, 1, 3, 4, 2]; // (3 4 5)
assert.deepEqual(compose(a, b), [1, 2, 3, 4, 0]);
assert.deepEqual(compose(b, a), [1, 3, 0, 4, 2]);
assert.deepEqual(inverse(a), [2, 0, 1, 3, 4]);
assert.deepEqual(commutator(a, b), [3, 1, 0, 2, 4]);
assert.equal(cycleNotation(commutator(a, b)), "(1 4 3)");
assert.equal(cycleNotation([1, 0, 3, 2, 4]), "(1 2)(3 4)");
assert.equal(cycleNotation(identity(5)), "e");
assert.equal(parity(a), 1);
assert.equal(parity([1, 0, 2, 3, 4]), -1);
assert.notDeepEqual(compose(a, b), compose(b, a), "A5 is not abelian");

const expectedOrders = {
  1: [1],
  2: [2, 1],
  3: [6, 3, 1],
  4: [24, 12, 4, 1],
  5: [120, 60, 60],
};
for (let n = 1; n <= 5; n++) {
  const group = symmetricGroup(n);
  const series = derivedSeries(n);
  assert.deepEqual(
    series.map((step) => step.order),
    expectedOrders[n],
  );
  assert.equal(new Set(group.map(key)).size, expectedOrders[n][0]);
  for (const step of series) {
    const elements = new Set(step.elements.map(key));
    assert.equal(step.order, elements.size);
    assert(elements.has(key(identity(n))));
    for (const left of step.elements) {
      assert(elements.has(key(inverse(left))));
      for (const right of step.elements)
        assert(
          elements.has(key(compose(left, right))),
          `${step.name} is closed`,
        );
    }
  }
  if (n >= 3)
    sameElements(
      series[1].elements,
      group.filter((p) => parity(p) === 1),
    );
}
sameElements(derivedSeries(4)[2].elements, [
  [0, 1, 2, 3],
  [1, 0, 3, 2],
  [2, 3, 0, 1],
  [3, 2, 1, 0],
]);
assert.deepEqual(
  derivedSeries(5).map((step) => step.name),
  ["S5", "A5", "A5"],
);
sameElements(derivedSeries(5)[1].elements, derivedSeries(5)[2].elements);

// Four-root pairings give a concrete quotient: S4 acts as S3, its kernel is
// V4, and restricting to A4 leaves the three cyclic pairing motions.
assert.deepEqual(FOUR_PAIRINGS, [
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
]);
const s4 = symmetricGroup(4);
const a4 = s4.filter((p) => parity(p) === 1);
assert.deepEqual(fourPairingAction([1, 0, 2, 3]), [0, 2, 1]);
assert.deepEqual(fourPairingAction([1, 2, 0, 3]), [2, 0, 1]);
sameElements(s4.map(fourPairingAction), symmetricGroup(3));
sameElements(
  s4.filter((p) => key(fourPairingAction(p)) === key(identity(3))),
  derivedSeries(4)[2].elements,
);
sameElements(a4.map(fourPairingAction), [identity(3), [1, 2, 0], [2, 0, 1]]);
for (const left of s4)
  for (const right of s4)
    assert.deepEqual(
      fourPairingAction(compose(left, right)),
      compose(fourPairingAction(left), fourPairingAction(right)),
      "Pairing actions preserve the rightmost-first composition convention",
    );

// Independently known intermediate frames catch a reversed animation even
// when its final caption happens to display the correct commutator.
const swapFirstTwo = [1, 0, 2];
const swapLastTwo = [0, 2, 1];
assert.deepEqual(orderDifferenceTrace(swapFirstTwo, swapLastTwo), [
  [0, 1, 2],
  [0, 2, 1],
  [1, 2, 0],
  [2, 1, 0],
  [2, 0, 1],
]);
for (const left of symmetricGroup(3))
  for (const right of symmetricGroup(3)) {
    const trace = orderDifferenceTrace(left, right);
    assert.equal(trace.length, 5);
    assert.deepEqual(trace[0], identity(3));
    assert.deepEqual(trace.at(-1), commutator(left, right));
  }

// A cyclic subgroup supplies a non-symmetric input to the derived-group engine.
const fiveCycle = compose(a, b);
const cyclic5 = [identity(5)];
for (let i = 1; i < 5; i++) cyclic5.push(compose(cyclic5[i - 1], fiveCycle));
sameElements(derivedSubgroup(cyclic5), [identity(5)]);

// Verify the concrete polynomial certificate displayed in the experiment.
// Coefficients are stored from constant to leading term; these small helpers
// are confined to the test and use exact arithmetic in F2 or F3.
const mod = (value, p) => ((value % p) + p) % p;
const normalizePolynomial = (coefficients, p) => {
  const result = coefficients.map((value) => mod(value, p));
  while (result.length > 1 && result.at(-1) === 0) result.pop();
  return result;
};
const polynomialProduct = (left, right, p) => {
  const result = Array(left.length + right.length - 1).fill(0);
  left.forEach((coefficient, i) => {
    right.forEach((other, j) => {
      result[i + j] += coefficient * other;
    });
  });
  return normalizePolynomial(result, p);
};
const monicRemainder = (dividend, divisor, p) => {
  assert.equal(divisor.at(-1), 1, "The certificate uses monic divisors");
  let result = normalizePolynomial(dividend, p);
  while (result.length >= divisor.length) {
    const shift = result.length - divisor.length;
    const leading = result.at(-1);
    divisor.forEach((coefficient, i) => {
      result[i + shift] -= leading * coefficient;
    });
    result = normalizePolynomial(result, p);
  }
  return result;
};
const hasRoot = (polynomial, p) =>
  Array.from({ length: p }, (_, x) => x).some(
    (x) =>
      mod(
        polynomial.reduce(
          (sum, coefficient, i) => sum + coefficient * x ** i,
          0,
        ),
        p,
      ) === 0,
  );
const quintic = [-1, -1, 0, 0, 0, 1]; // x^5 - x - 1
const quadraticMod2 = [1, 1, 1];
const cubicMod2 = [1, 0, 1, 1];
assert.deepEqual(
  polynomialProduct(quadraticMod2, cubicMod2, 2),
  normalizePolynomial(quintic, 2),
);
assert(!hasRoot(quadraticMod2, 2));
assert(!hasRoot(cubicMod2, 2));
assert(!hasRoot(quintic, 3));

// Enumerate every monic quadratic, so the claimed list is exhaustive.
const irreducibleQuadraticsMod3 = [];
for (let constant = 0; constant < 3; constant++)
  for (let linear = 0; linear < 3; linear++) {
    const polynomial = [constant, linear, 1];
    if (!hasRoot(polynomial, 3)) irreducibleQuadraticsMod3.push(polynomial);
  }
assert.deepEqual(irreducibleQuadraticsMod3, [
  [1, 0, 1],
  [2, 1, 1],
  [2, 2, 1],
]);
assert.deepEqual(
  irreducibleQuadraticsMod3.map((divisor) =>
    monicRemainder(quintic, divisor, 3),
  ),
  [[2], [2, 1], [2, 1]],
);
// A reducible degree-five polynomial must have a degree-one or degree-two
// irreducible factor; the two checks above therefore certify irreducibility.

// A permutation of cycle type (2,3) yields a transposition upon cubing.
const swap12 = [1, 0, 2, 3, 4];
const cycle23 = compose(swap12, b);
assert.equal(cycleNotation(cycle23), "(1 2)(3 4 5)");
assert.deepEqual(compose(compose(cycle23, cycle23), cycle23), swap12);

// Check every possible transposition, without assuming that the one from the
// factorization is adjacent in the five-cycle obtained at the other prime.
for (let i = 0; i < 5; i++)
  for (let j = i + 1; j < 5; j++) {
    const transposition = identity(5);
    [transposition[i], transposition[j]] = [transposition[j], transposition[i]];
    const generated = [identity(5)];
    const seen = new Set(generated.map(key));
    for (let cursor = 0; cursor < generated.length; cursor++)
      for (const generator of [fiveCycle, transposition]) {
        const next = compose(generated[cursor], generator);
        if (!seen.has(key(next))) {
          seen.add(key(next));
          generated.push(next);
        }
      }
    sameElements(generated, symmetricGroup(5));
  }

const classes = conjugacyClassesA5();
assert.deepEqual(
  classes.map((entry) => entry.size),
  [1, 15, 20, 12, 12],
);
const a5 = symmetricGroup(5).filter((p) => parity(p) === 1);
const flattened = classes.flatMap((entry) => entry.elements);
assert.equal(new Set(flattened.map(key)).size, 60, "Classes are disjoint");
sameElements(flattened, a5);
for (const entry of classes) {
  assert.equal(entry.elements.length, entry.size);
  const memberKeys = new Set(entry.elements.map(key));
  assert(memberKeys.has(key(entry.representative)));
  for (const element of entry.elements)
    for (const g of a5)
      assert(memberKeys.has(key(compose(compose(g, element), inverse(g)))));
  assert.equal(
    normalClosureInA5(entry.representative).length,
    entry.size === 1 ? 1 : 60,
  );
}
const fiveCycleClass = classes.find((entry) =>
  entry.elements.some((p) => key(p) === key(fiveCycle)),
);
assert(fiveCycleClass.elements.some((p) => key(p) === key(inverse(fiveCycle))));
assert(
  !fiveCycleClass.elements.some(
    (p) => key(p) === key(compose(fiveCycle, fiveCycle)),
  ),
);

// A normal subgroup is a class union containing e; Lagrange rules out every
// proper nontrivial union. This is the finite A5 simplicity argument, not a label.
const possibleNormalOrders = [];
for (let mask = 0; mask < 16; mask++) {
  const order =
    1 +
    classes
      .slice(1)
      .reduce(
        (sum, entry, index) => sum + (mask & (1 << index) ? entry.size : 0),
        0,
      );
  if (60 % order === 0) possibleNormalOrders.push(order);
}
assert.deepEqual(possibleNormalOrders, [1, 60]);

// Fixing extra roots embeds S5 in every S_n, preserving multiplication,
// commutators and distinct elements without enumerating n! permutations.
for (const n of [5, 6, 7, 12, 30]) {
  const extendedA = extendPermutation(a, n);
  const extendedB = extendPermutation(b, n);
  assert.deepEqual(
    compose(extendedA, extendedB),
    extendPermutation(compose(a, b), n),
  );
  assert.deepEqual(
    commutator(extendedA, extendedB),
    extendPermutation(commutator(a, b), n),
  );
  assert.equal(parity(extendedA), parity(a));
  assert.deepEqual(extendedA.slice(5), identity(n).slice(5));
  const embedded = a5.map((p) => extendPermutation(p, n));
  assert.equal(new Set(embedded.map(key)).size, 60);
  sameElements(derivedSubgroup(embedded), embedded);
}

// Cached computations remain correct even when a caller edits returned arrays.
const modified = symmetricGroup(5);
modified[0][0] = 99;
modified.pop();
assert.equal(symmetricGroup(5).length, 120);
assert.deepEqual(symmetricGroup(5)[0], identity(5));
const modifiedSeries = derivedSeries(5);
modifiedSeries[1].elements[0][0] = 99;
modifiedSeries[1].order = 99;
assert.equal(derivedSeries(5)[1].order, 60);
assert.deepEqual(derivedSeries(5)[1].elements[0], identity(5));
const modifiedClass = conjugacyClassesA5();
modifiedClass[0].representative[0] = 99;
modifiedClass[0].elements[0][0] = 99;
assert.deepEqual(conjugacyClassesA5()[0].representative, identity(5));
assert.deepEqual(conjugacyClassesA5()[0].elements[0], identity(5));

for (const invalid of [0, -1, 1.5, 6, NaN, Infinity])
  assert.throws(() => symmetricGroup(invalid), RangeError);
for (const invalid of [[], [0, 0], [1, 2], [0, NaN], [0, 1.5]])
  assert.throws(() => inverse(invalid), RangeError);
assert.throws(() => compose(identity(2), identity(3)), RangeError);
assert.throws(() => derivedSubgroup([]), RangeError);
assert.throws(() => derivedSubgroup([identity(5), a]), RangeError);
assert.throws(() => derivedSubgroup([identity(5), identity(5)]), RangeError);
assert.throws(() => normalClosureInA5([1, 0, 2, 3, 4]), RangeError);
assert.throws(() => normalClosureInA5(identity(4)), RangeError);
assert.throws(() => extendPermutation(a, 4), RangeError);
for (const invalid of [
  [],
  [0, 0, 2, 3],
  [0, 1, 2, 4],
  identity(3),
  identity(5),
])
  assert.throws(() => fourPairingAction(invalid), RangeError);
assert.throws(() => orderDifferenceTrace([0, 0], identity(2)), RangeError);
assert.throws(() => orderDifferenceTrace(identity(2), [0, NaN]), RangeError);
assert.throws(() => orderDifferenceTrace(identity(2), identity(3)), RangeError);

console.log(
  "Galois: composition fixtures, derived series S1–S5, group closure, four-root pairing quotients, order-difference animation, x^5-x-1 modular certificates, S5 generation, A5 conjugacy classes and simplicity, normal closures, higher-degree embeddings, cache isolation, and invalid inputs passed.",
);
