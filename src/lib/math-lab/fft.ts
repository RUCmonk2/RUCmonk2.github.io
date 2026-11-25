export const FFT_SIZE = 32;
export const FFT_EXAMPLE = [1, 2, 3, 4] as const;

export type Complex = readonly [real: number, imaginary: number];
export type FftLayers = Complex[][][];
export type Signal = "mix" | "tone" | "impulse";

export function getSamples(signal: Signal) {
  return Array.from({ length: FFT_SIZE }, (_, n) => {
    if (signal === "impulse") return n === 3 ? 1 : 0;
    const angle = (2 * Math.PI * n) / FFT_SIZE;
    if (signal === "tone") return Math.cos(5 * angle);
    // The 32 samples used in Claude's Mathematics Spectacle 06.
    return (
      0.25 +
      0.9 * Math.cos(5 * angle) +
      0.7 * Math.sin(7 * angle) +
      0.45 * Math.cos(12 * angle + 0.5)
    );
  });
}

export function butterfly(
  even: Complex,
  odd: Complex,
  q: number,
  terms: number,
) {
  const angle = (-Math.PI * q) / terms;
  const twiddle: Complex =
    q === 0
      ? [1, 0]
      : q * 2 === terms
        ? [0, -1]
        : [Math.cos(angle), Math.sin(angle)];
  const rotated: Complex = [
    twiddle[0] * odd[0] - twiddle[1] * odd[1],
    twiddle[0] * odd[1] + twiddle[1] * odd[0],
  ];
  const plus: Complex = [even[0] + rotated[0], even[1] + rotated[1]];
  const minus: Complex = [even[0] - rotated[0], even[1] - rotated[1]];
  return { angle, twiddle, rotated, plus, minus };
}

export function buildLayers(samples: readonly number[]): FftLayers {
  const folds = Math.log2(samples.length);
  if (!Number.isInteger(folds) || folds < 0) {
    throw new RangeError("FFT input length must be a positive power of two.");
  }
  const layers: FftLayers = [samples.map((value) => [[value, 0]])];

  for (let level = 0; level < folds; level += 1) {
    const previous = layers[level];
    const pairs = previous.length / 2;
    const terms = previous[0].length;

    layers.push(
      Array.from({ length: pairs }, (_, j) => {
        const plus: Complex[] = [];
        const minus: Complex[] = [];

        for (let q = 0; q < terms; q += 1) {
          const result = butterfly(
            previous[j][q],
            previous[j + pairs][q],
            q,
            terms,
          );
          plus.push(result.plus);
          minus.push(result.minus);
        }

        return plus.concat(minus);
      }),
    );
  }

  return layers;
}

export function getOneSidedSpectrum(output: Complex[]) {
  const size = output.length;
  return output.slice(0, size / 2 + 1).map(([re, im], k) => {
    const scale = k === 0 || k === size / 2 ? 1 : 2;
    return (scale * Math.hypot(re, im)) / size;
  });
}

export function formatNumber(value: number, digits = 3) {
  const rounded = Number(value.toFixed(digits));
  if (digits === 6 && value !== 0 && rounded === 0) {
    return value.toExponential(3).replace(/\.?0+e/, "e");
  }
  return rounded.toString();
}

export function formatComplex([real, imaginary]: Complex, digits = 3) {
  const realPart = formatNumber(real, digits);
  const imaginaryPart = formatNumber(Math.abs(imaginary), digits);
  if (imaginaryPart === "0") return realPart;
  const coefficient = imaginaryPart === "1" ? "i" : `${imaginaryPart}i`;
  if (realPart === "0") return imaginary < 0 ? `−${coefficient}` : coefficient;
  return `${realPart} ${imaginary < 0 ? "−" : "+"} ${coefficient}`;
}
