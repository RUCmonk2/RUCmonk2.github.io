/** Right-handed active rotations of column vectors; Hamilton product, scalar first. */
export type RotationVector = [number, number, number];
export type RotationQuaternion = [number, number, number, number];
export type RotationMatrix = [RotationVector, RotationVector, RotationVector];

function requireFiniteTuple(
  value: readonly number[],
  length: number,
  label: string,
) {
  if (
    !Array.isArray(value) ||
    value.length !== length ||
    !value.every(Number.isFinite)
  )
    throw new RangeError(`${label} must contain ${length} finite numbers.`);
}

function requireQuaternion(q: RotationQuaternion) {
  requireFiniteTuple(q, 4, "Quaternion");
  if (q.every((component) => component === 0))
    throw new RangeError("The zero quaternion cannot represent a rotation.");
}

/** Scale before taking the norm so finite very large/small inputs remain usable. */
function unitComponents(value: readonly number[], label: string) {
  const scale = Math.max(...value.map(Math.abs));
  if (scale === 0) throw new RangeError(`${label} must be nonzero.`);
  const scaled = value.map((component) => component / scale);
  const norm = Math.hypot(...scaled);
  return scaled.map((component) => component / norm);
}

/** Normalize without choosing a hemisphere: q and -q keep their own signs. */
export function normalizeQuaternion(q: RotationQuaternion): RotationQuaternion {
  requireQuaternion(q);
  return unitComponents(q, "Quaternion") as RotationQuaternion;
}

export function axisQuaternion(
  axis: RotationVector,
  angleDegrees: number,
): RotationQuaternion {
  requireFiniteTuple(axis, 3, "Rotation axis");
  if (!Number.isFinite(angleDegrees))
    throw new RangeError("Rotation angle must be finite.");
  const [x, y, z] = unitComponents(axis, "Rotation axis");
  // The quaternion representative has a 720-degree period, not 360 degrees.
  const halfAngle = (angleDegrees % 720) * (Math.PI / 360);
  const sine = Math.sin(halfAngle);
  return normalizeQuaternion([
    Math.cos(halfAngle),
    x * sine,
    y * sine,
    z * sine,
  ]);
}

/** Raw Hamilton product; left acts after right for fixed-world-axis rotations. */
export function multiplyQuaternions(
  left: RotationQuaternion,
  right: RotationQuaternion,
): RotationQuaternion {
  requireQuaternion(left);
  requireQuaternion(right);
  const [a, b, c, d] = left;
  const [w, x, y, z] = right;
  const result: RotationQuaternion = [
    a * w - b * x - c * y - d * z,
    a * x + b * w + c * z - d * y,
    a * y - b * z + c * w + d * x,
    a * z + b * y - c * x + d * w,
  ];
  // Report floating-point overflow/underflow instead of returning an invalid rotation.
  requireQuaternion(result);
  return result;
}

export function quaternionMatrix(q: RotationQuaternion): RotationMatrix {
  const [w, x, y, z] = normalizeQuaternion(q);
  return [
    [1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)],
    [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)],
    [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)],
  ];
}

export function rotateVector(
  q: RotationQuaternion,
  vector: RotationVector,
): RotationVector {
  requireFiniteTuple(vector, 3, "Vector");
  const result = quaternionMatrix(q).map((row) =>
    row.reduce((sum, entry, index) => sum + entry * vector[index], 0),
  ) as RotationVector;
  requireFiniteTuple(result, 3, "Rotated vector");
  return result;
}

/** Angles are [roll, pitch, yaw] in degrees; R = Rz(yaw) Ry(pitch) Rx(roll). */
export function eulerQuaternion(angles: RotationVector): RotationQuaternion {
  requireFiniteTuple(angles, 3, "Euler angles");
  const [roll, pitch, yaw] = angles;
  return normalizeQuaternion(
    multiplyQuaternions(
      axisQuaternion([0, 0, 1], yaw),
      multiplyQuaternions(
        axisQuaternion([0, 1, 0], pitch),
        axisQuaternion([1, 0, 0], roll),
      ),
    ),
  );
}

function sameHemisphere(
  a: RotationQuaternion,
  b: RotationQuaternion,
): RotationQuaternion {
  const dot = a.reduce(
    (sum, component, index) => sum + component * b[index],
    0,
  );
  return dot < 0 ? (b.map((component) => -component) as RotationQuaternion) : b;
}

/** Stable angular separation on the unit sphere, including nearly equal inputs. */
function sphereAngle(a: RotationQuaternion, b: RotationQuaternion) {
  const difference = Math.hypot(...a.map((component, i) => component - b[i]));
  const sum = Math.hypot(...a.map((component, i) => component + b[i]));
  return 2 * Math.atan2(difference, sum);
}

function sinc(angle: number) {
  if (Math.abs(angle) < 1e-4) {
    const square = angle * angle;
    return 1 - square / 6 + (square * square) / 120;
  }
  return Math.sin(angle) / angle;
}

/** Shortest-path SLERP for 0 <= t <= 1, preserving the first endpoint's sign. */
export function slerpQuaternion(
  a: RotationQuaternion,
  b: RotationQuaternion,
  t: number,
): RotationQuaternion {
  if (!Number.isFinite(t) || t < 0 || t > 1)
    throw new RangeError(
      "Interpolation time must be finite and between 0 and 1.",
    );
  const start = normalizeQuaternion(a);
  const end = sameHemisphere(start, normalizeQuaternion(b));
  if (t === 0) return start;
  if (t === 1) return end;
  const angle = sphereAngle(start, end);
  // sinc removes the 0/0 singularity for identical and sign-opposite endpoints.
  const denominator = sinc(angle);
  const startWeight = ((1 - t) * sinc((1 - t) * angle)) / denominator;
  const endWeight = (t * sinc(t * angle)) / denominator;
  return normalizeQuaternion(
    start.map(
      (component, i) => startWeight * component + endWeight * end[i],
    ) as RotationQuaternion,
  );
}

/** Smallest physical orientation difference, in degrees from 0 to 180. */
export function rotationDistance(a: RotationQuaternion, b: RotationQuaternion) {
  const start = normalizeQuaternion(a);
  const end = sameHemisphere(start, normalizeQuaternion(b));
  return Math.min(180, sphereAngle(start, end) * (360 / Math.PI));
}
