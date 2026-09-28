export type Vector3 = [number, number, number];
export type Matrix3 = [Vector3, Vector3, Vector3];
export const armLengths: Vector3 = [1, 1, 0.5];
export const armTarget: Vector3 = [1, 1.5, Math.PI / 2];
export const armInitial: Vector3 = [0, Math.PI / 3, Math.PI / 6];

export function wrapAngle(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

export function eulerZYX(roll: number, pitch: number, yaw: number): Matrix3 {
  const cr = Math.cos(roll),
    sr = Math.sin(roll),
    cp = Math.cos(pitch),
    sp = Math.sin(pitch),
    cy = Math.cos(yaw),
    sy = Math.sin(yaw);
  return [
    [cy * cp, cy * sp * sr - sy * cr, cy * sp * cr + sy * sr],
    [sy * cp, sy * sp * sr + cy * cr, sy * sp * cr - cy * sr],
    [-sp, cp * sr, cp * cr],
  ];
}

export function planarForward(joints: Vector3) {
  let angle = 0,
    x = 0,
    y = 0;
  const points: [number, number][] = [[0, 0]];
  joints.forEach((q, index) => {
    angle += q;
    x += armLengths[index] * Math.cos(angle);
    y += armLengths[index] * Math.sin(angle);
    points.push([x, y]);
  });
  return { pose: [x, y, angle] as Vector3, points };
}

export function planarJacobian(joints: Vector3): Matrix3 {
  const { pose, points } = planarForward(joints);
  // Each joint rotates every link downstream: z cross (end - joint).
  return [
    points.slice(0, 3).map((point) => -(pose[1] - point[1])) as Vector3,
    points.slice(0, 3).map((point) => pose[0] - point[0]) as Vector3,
    [1, 1, 1],
  ];
}

export function poseError(actual: Vector3, target: Vector3): Vector3 {
  return [
    target[0] - actual[0],
    target[1] - actual[1],
    wrapAngle(target[2] - actual[2]),
  ];
}

export function solveLinear3(matrix: Matrix3, rhs: Vector3): Vector3 | null {
  const rows = matrix.map((row, i) => [...row, rhs[i]]);
  const scale = Math.max(...matrix.flat().map(Math.abs));
  if (!Number.isFinite(scale) || !scale || !rhs.every(Number.isFinite))
    return null;
  for (let column = 0; column < 3; column++) {
    let pivot = column;
    for (let row = column + 1; row < 3; row++)
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivot][column]))
        pivot = row;
    if (Math.abs(rows[pivot][column]) < 1e-10 * scale) return null;
    [rows[column], rows[pivot]] = [rows[pivot], rows[column]];
    const divisor = rows[column][column];
    for (let j = column; j < 4; j++) rows[column][j] /= divisor;
    for (let row = 0; row < 3; row++) {
      if (row === column) continue;
      const factor = rows[row][column];
      for (let j = column; j < 4; j++) rows[row][j] -= factor * rows[column][j];
    }
  }
  const solution = rows.map((row) => row[3]) as Vector3;
  return solution.every(Number.isFinite) ? solution : null;
}

export function planarInverseStep(
  joints: Vector3,
  target: Vector3,
  damping = 0,
): Vector3 | null {
  const j = planarJacobian(joints),
    error = poseError(planarForward(joints).pose, target);
  if (damping === 0) return solveLinear3(j, error);
  if (!Number.isFinite(damping) || damping < 0) return null;
  const gram = j.map((row, i) =>
    j.map(
      (other, k) =>
        row.reduce((sum, value, n) => sum + value * other[n], 0) +
        (i === k ? damping ** 2 : 0),
    ),
  ) as Matrix3;
  const solved = solveLinear3(gram, error);
  if (!solved) return null;
  return [0, 1, 2].map((column) =>
    j.reduce((sum, row, i) => sum + row[column] * solved[i], 0),
  ) as Vector3;
}
