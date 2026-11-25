import assert from "node:assert/strict";

import { createJiti } from "jiti";

const { FFT_EXAMPLE, FFT_SIZE, buildLayers, getOneSidedSpectrum, getSamples } =
  await createJiti(import.meta.url).import("../src/lib/math-lab/fft.ts");

function checkValue(actual, expected) {
  assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} ≠ ${expected}`);
}

function checkLayers(samples) {
  const layers = buildLayers(samples);
  const folds = Math.log2(samples.length);
  assert.equal(layers.length, folds + 1);
  for (let level = 0; level <= folds; level += 1) {
    const stride = samples.length >> level;
    const terms = 1 << level;
    assert.equal(layers[level].length, stride);
    for (let j = 0; j < stride; j += 1) {
      assert.equal(layers[level][j].length, terms);
      for (let k = 0; k < terms; k += 1) {
        // An independent direct DFT of each strided input subsequence.
        let real = 0;
        let imaginary = 0;
        for (let n = 0; n < terms; n += 1) {
          const angle = (-2 * Math.PI * k * n) / terms;
          const input = samples[j + n * stride];
          real += input * Math.cos(angle);
          imaginary += input * Math.sin(angle);
        }
        const [actualReal, actualImaginary] = layers[level][j][k];
        checkValue(actualReal, real);
        checkValue(actualImaginary, imaginary);
      }
    }
  }
  return getOneSidedSpectrum(layers.at(-1)[0]);
}

const worked = buildLayers(FFT_EXAMPLE);
assert.deepEqual(worked[1], [
  [
    [4, 0],
    [-2, 0],
  ],
  [
    [6, 0],
    [-2, 0],
  ],
]);
assert.deepEqual(worked[2][0], [
  [10, 0],
  [-2, 2],
  [-2, 0],
  [-2, -2],
]);
checkLayers(FFT_EXAMPLE);
checkLayers([0.25, -3, 7.5, 0]);
assert.throws(() => buildLayers([1, 2, 3]), RangeError);

const mixture = checkLayers(getSamples("mix"));
for (let k = 0; k <= FFT_SIZE / 2; k += 1) {
  checkValue(mixture[k], { 0: 0.25, 5: 0.9, 7: 0.7, 12: 0.45 }[k] ?? 0);
}

const tone = checkLayers(getSamples("tone"));
checkValue(tone[5], 1);

const impulse = checkLayers(getSamples("impulse"));
checkValue(impulse[0], 1 / FFT_SIZE);
checkValue(impulse[7], 2 / FFT_SIZE);
checkValue(impulse.at(-1), 1 / FFT_SIZE);

const nyquist = Array.from({ length: FFT_SIZE }, (_, n) => (-1) ** n);
checkValue(checkLayers(nyquist).at(-1), 1);

console.log(
  "4- and 32-point FFTs verified against independent DFTs at every layer; worked values and one-sided amplitude scaling checked.",
);
