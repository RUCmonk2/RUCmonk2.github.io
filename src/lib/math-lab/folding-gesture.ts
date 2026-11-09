import type { FoldAction, Geometry, Point } from "./folding";

export type FoldGesture = {
  action: FoldAction;
  progress: number;
  ready: boolean;
  landing: Point;
  allowed: boolean;
  midpoint: Point;
  bisector: [Point, Point];
};

/** The actual polygon outline, including triangular boards, owns the hit area. */
export function pointInsideBoard(geometry: Geometry, point: Point): boolean {
  return geometry.cells.some((cell) => {
    const signs = cell.vertices.map((a, i) => {
      const b = cell.vertices[(i + 1) % cell.vertices.length];
      return (b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x);
    });
    return signs.every((v) => v >= -1e-7) || signs.every((v) => v <= 1e-7);
  });
}

type Crease = {
  actions: FoldAction[];
  normal: Point;
  offset: number;
  key: string;
};
type LineSpace = {
  center: Point;
  xx: number;
  xy: number;
  yy: number;
  creases: Crease[];
};
const lineSpaces = new WeakMap<Geometry, LineSpace>();

function getLineSpace(geometry: Geometry): LineSpace {
  const cached = lineSpaces.get(geometry);
  if (cached) return cached;
  const count = geometry.cells.length;
  const center = geometry.cells.reduce(
    (sum, cell) => ({
      x: sum.x + cell.center.x / count,
      y: sum.y + cell.center.y / count,
    }),
    { x: 0, y: 0 },
  );
  let xx = 0,
    xy = 0,
    yy = 0;
  for (const { center: p } of geometry.cells) {
    const x = p.x - center.x,
      y = p.y - center.y;
    xx += (x * x) / count;
    xy += (x * y) / count;
    yy += (y * y) / count;
  }
  const groups = new Map<string, Crease>();
  for (const action of geometry.actions) {
    const key = action.line
      .map((p) => `${p.x.toFixed(7)},${p.y.toFixed(7)}`)
      .sort()
      .join("/");
    const group = groups.get(key);
    if (group) group.actions.push(action);
    else
      groups.set(key, {
        key,
        actions: [action],
        normal: action.direction,
        offset:
          action.direction.x * action.line[0].x +
          action.direction.y * action.line[0].y,
      });
  }
  const space = {
    center,
    xx,
    xy,
    yy,
    creases: [...groups.values()].sort((a, b) =>
      a.key < b.key ? -1 : a.key > b.key ? 1 : 0,
    ),
  };
  lineSpaces.set(geometry, space);
  return space;
}

/**
 * Construct AB's perpendicular bisector FIRST, then find its closest crease.
 * "Closest" is the RMS difference of the two lines' signed-distance fields over
 * the board. Both normal signs are tried, since a line has no orientation.
 * Board covariance evaluates that whole-board metric exactly in O(creases).
 * No angle gate, preferred direction, trajectory, or previous choice is used.
 */
export function inferFold(
  geometry: Geometry,
  start: Point,
  current: Point,
  pixelsPerUnit: number,
  previousId?: string,
): FoldGesture | null {
  // Kept for call compatibility; identical endpoints must always give one result.
  void previousId;
  if (
    !Number.isFinite(pixelsPerUnit) ||
    pixelsPerUnit <= 0 ||
    !Number.isFinite(current.x) ||
    !Number.isFinite(current.y) ||
    !pointInsideBoard(geometry, start)
  )
    return null;
  const dx = current.x - start.x,
    dy = current.y - start.y;
  const length = Math.hypot(dx, dy);
  if (length * pixelsPerUnit < 8) return null;
  const normal = { x: dx / length, y: dy / length };
  const midpoint = {
    x: (start.x + current.x) / 2,
    y: (start.y + current.y) / 2,
  };
  const space = getLineSpace(geometry);
  const idealAtCenter =
    normal.x * (space.center.x - midpoint.x) +
    normal.y * (space.center.y - midpoint.y);
  let winner: Crease | null = null,
    bestError = Infinity;
  for (const crease of space.creases) {
    const candidateAtCenter =
      crease.normal.x * space.center.x +
      crease.normal.y * space.center.y -
      crease.offset;
    let error = Infinity;
    for (const sign of [-1, 1]) {
      const nx = sign * crease.normal.x - normal.x,
        ny = sign * crease.normal.y - normal.y;
      const h = sign * candidateAtCenter - idealAtCenter;
      error = Math.min(
        error,
        h * h +
          nx * nx * space.xx +
          2 * nx * ny * space.xy +
          ny * ny * space.yy,
      );
    }
    if (error < bestError - 1e-10) {
      winner = crease;
      bestError = error;
    }
  }
  if (!winner) return null;
  // Direction is chosen only AFTER the nearest geometric line is known.
  const sourceDistance = (action: FoldAction) =>
    (action.line[0].x - start.x) * action.direction.x +
    (action.line[0].y - start.y) * action.direction.y;
  const travel = (action: FoldAction) =>
    dx * action.direction.x + dy * action.direction.y;
  const allowedAction = winner.actions.find(
    (action) =>
      sourceDistance(action) > 1e-7 ||
      (Math.abs(sourceDistance(action)) <= 1e-7 && travel(action) > 0),
  );
  const action = allowedAction ?? winner.actions[0];
  const a = sourceDistance(action),
    q = travel(action),
    n = action.direction;
  const extent = 2 * Math.hypot(geometry.width, geometry.height);
  return {
    action,
    allowed: Boolean(allowedAction),
    progress: allowedAction
      ? Math.min(1, Math.max(0, q / (2 * Math.max(a, 12 / pixelsPerUnit))))
      : 0,
    ready:
      Boolean(allowedAction) &&
      length * pixelsPerUnit >= 28 &&
      (q - a) * pixelsPerUnit >= 4,
    landing: { x: start.x + 2 * a * n.x, y: start.y + 2 * a * n.y },
    midpoint,
    bisector: [
      { x: midpoint.x - normal.y * extent, y: midpoint.y + normal.x * extent },
      { x: midpoint.x + normal.y * extent, y: midpoint.y - normal.x * extent },
    ],
  };
}

/** Project the moving side onto the board; 0 is flat, 0.5 edge-on, 1 mirrored. */
export function foldMatrix(action: FoldAction, progress: number): string {
  const n = action.direction,
    p = action.line[0];
  const k = -2 * Math.min(1, Math.max(0, progress));
  const a = 1 + k * n.x * n.x,
    b = k * n.x * n.y,
    d = 1 + k * n.y * n.y;
  return `matrix(${a} ${b} ${b} ${d} ${-(a - 1) * p.x - b * p.y} ${-b * p.x - (d - 1) * p.y})`;
}
