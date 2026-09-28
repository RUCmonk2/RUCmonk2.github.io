export type BackpropScenario = "linear" | "relu";

export const backpropInput = [1, 0.5] as const;
export const backpropTarget = 4;

export function initialBackpropWeights(scenario: BackpropScenario): number[] {
  return scenario === "linear"
    ? [0.5, 1.5, 2.3, 3, 1, 1]
    : [-0.5, -1.5, 2.3, 3, 1, 1];
}

export function evaluateBackprop(
  weights: readonly number[],
  scenario: BackpropScenario,
) {
  if (weights.length !== 6 || !weights.every(Number.isFinite))
    throw new Error("Expected six finite weights.");
  const [w1, w2, w3, w4, w5, w6] = weights;
  const [x1, x2] = backpropInput;
  const z = [w1 * x1 + w2 * x2, w3 * x1 + w4 * x2];
  const h = z.map((value) =>
    scenario === "relu" ? Math.max(0, value) : value,
  );
  // At the ReLU kink we use derivative zero, as stated in the lesson.
  const gates = z.map((value) => (scenario === "linear" || value > 0 ? 1 : 0));
  const prediction = w5 * h[0] + w6 * h[1];
  const residual = prediction - backpropTarget;
  const hiddenGradients = [residual * w5 * gates[0], residual * w6 * gates[1]];
  const gradients = [
    hiddenGradients[0] * x1,
    hiddenGradients[0] * x2,
    hiddenGradients[1] * x1,
    hiddenGradients[1] * x2,
    residual * h[0],
    residual * h[1],
  ];
  return {
    z,
    h,
    gates,
    prediction,
    residual,
    loss: residual ** 2 / 2,
    gradients,
  };
}

export function stepBackprop(
  weights: readonly number[],
  scenario: BackpropScenario,
  rate: number,
): number[] {
  if (!Number.isFinite(rate) || rate < 0)
    throw new Error("Expected a finite nonnegative learning rate.");
  const { gradients } = evaluateBackprop(weights, scenario);
  return weights.map((weight, i) => weight - rate * gradients[i]);
}

export function canDisplayBackprop(
  weights: readonly number[],
  scenario: BackpropScenario,
) {
  if (!weights.every(Number.isFinite)) return false;
  const result = evaluateBackprop(weights, scenario);
  return [...weights, ...result.gradients, result.loss].every(
    (value) => Number.isFinite(value) && Math.abs(value) <= 1e6,
  );
}
