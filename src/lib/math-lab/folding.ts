/**
 * Deterministic mirror-paint puzzles. A move keeps its source side and copies its
 * reflection onto the other side; this is deliberately not a paper simulation.
 * Geometry and generation are DOM-free and may be run inside a Web Worker.
 */
export type Shape = "square" | "rectangle" | "triangle";
export type PuzzleVersion = 1 | 2;
export const CURRENT_PUZZLE_VERSION: PuzzleVersion = 2;
export type Point = { x: number; y: number };
export type Cell = { id: number; vertices: Point[]; center: Point };
export type FoldAction = {
  id: string;
  label: string;
  line: [Point, Point];
  source: number[];
  mapping: [number, number][];
  /** Unit vector from the selected source side towards its reflected image. */
  direction: Point;
};
export type Geometry = {
  shape: Shape;
  size: number;
  cells: Cell[];
  width: number;
  height: number;
  actions: FoldAction[];
};
export type PuzzleConfig = {
  seed: string;
  shape: Shape;
  size: number;
  level: number;
};
export type Puzzle = {
  version: PuzzleVersion;
  config: PuzzleConfig;
  initial: number[];
  target: number[];
  solution: string[];
  /** Includes the initial board at index 0 and the target at the final index. */
  states: number[][];
  /** True only when absence of a shorter solution was exhaustively checked. */
  shortest: boolean;
};

export const SHAPE_LABELS: Record<Shape, string> = {
  square: "正方形",
  rectangle: "长方形",
  triangle: "正三角形",
};
export const LEVEL_LABELS = ["入门", "初阶", "进阶", "挑战", "大师"] as const;

const EPSILON = 1e-7;
const geometryCache = new Map<string, Geometry>();

function assertShapeSize(shape: Shape, size: number) {
  if (!Object.hasOwn(SHAPE_LABELS, shape))
    throw new RangeError("Unknown folding board shape.");
  if (!Number.isInteger(size) || size < 3 || size > 7)
    throw new RangeError("Folding board size must be an integer from 3 to 7.");
}

function assertVersion(version: PuzzleVersion) {
  if (version !== 1 && version !== 2)
    throw new RangeError("Unknown folding puzzle version.");
}

function pointKey(point: Point) {
  return `${Math.round(point.x * 1e7)},${Math.round(point.y * 1e7)}`;
}

function polygonKey(vertices: Point[]) {
  return vertices.map(pointKey).sort().join(";");
}

type Crease = {
  id: string;
  label: string;
  normal: Point;
  offset: number;
  negativeLabel: string;
  positiveLabel: string;
};

function addCell(cells: Cell[], vertices: Point[]) {
  cells.push({
    id: cells.length,
    vertices,
    center: {
      x: vertices.reduce((sum, p) => sum + p.x, 0) / vertices.length,
      y: vertices.reduce((sum, p) => sum + p.y, 0) / vertices.length,
    },
  });
}

function buildActions(cells: Cell[], creases: Crease[]): FoldAction[] {
  const polygons = new Map(
    cells.map((cell) => [polygonKey(cell.vertices), cell.id]),
  );
  const actions: FoldAction[] = [];
  for (const crease of creases) {
    const length = Math.hypot(crease.normal.x, crease.normal.y);
    const normal = { x: crease.normal.x / length, y: crease.normal.y / length };
    const offset = crease.offset / length;
    const distance = (point: Point) =>
      point.x * normal.x + point.y * normal.y - offset;
    const reflect = (point: Point): Point => {
      const d = distance(point);
      return { x: point.x - 2 * d * normal.x, y: point.y - 2 * d * normal.y };
    };

    // A supported crease follows complete atomic edges. No cell may be cut.
    if (
      cells.some((cell) => {
        const values = cell.vertices.map(distance);
        return Math.min(...values) < -EPSILON && Math.max(...values) > EPSILON;
      })
    )
      continue;

    const onLine = cells
      .flatMap((cell) => cell.vertices)
      .filter((point) => Math.abs(distance(point)) < EPSILON)
      .sort(
        (a, b) =>
          -normal.y * a.x + normal.x * a.y - (-normal.y * b.x + normal.x * b.y),
      );
    if (onLine.length < 2) continue;
    const line: [Point, Point] = [onLine[0], onLine[onLine.length - 1]];
    if (pointKey(line[0]) === pointKey(line[1])) continue;

    for (const side of [-1, 1]) {
      const source = cells.filter(
        (cell) => side * distance(cell.center) > EPSILON,
      );
      if (!source.length || source.length === cells.length) continue;
      const mapping: [number, number][] = [];
      let valid = true;
      for (const cell of source) {
        const destination = polygons.get(
          polygonKey(cell.vertices.map(reflect)),
        );
        if (destination === undefined || destination === cell.id) {
          valid = false;
          break;
        }
        mapping.push([cell.id, destination]);
      }
      if (!valid) continue;
      actions.push({
        id: `${crease.id}:${side < 0 ? "n" : "p"}`,
        label: `${crease.label} · ${side < 0 ? crease.negativeLabel : crease.positiveLabel}`,
        line,
        source: source.map((cell) => cell.id),
        mapping,
        direction: { x: -side * normal.x, y: -side * normal.y },
      });
    }
  }
  return actions;
}

/** Cached geometry is shared; consumers should treat it as immutable. */
export function getGeometry(
  shape: Shape,
  size: number,
  version: PuzzleVersion = CURRENT_PUZZLE_VERSION,
): Geometry {
  assertShapeSize(shape, size);
  assertVersion(version);
  const key = `${version}:${shape}:${size}`;
  const cached = geometryCache.get(key);
  if (cached) return cached;
  const cells: Cell[] = [];
  const creases: Crease[] = [];
  let width: number;
  let height: number;

  if (shape === "triangle") {
    const side = size * 2;
    const rise = Math.sqrt(3) / 2;
    width = side;
    height = side * rise;
    for (let row = 0; row < side; row++) {
      const left = (side - row) / 2;
      const y = row * rise;
      for (let column = 0; column <= row; column++) {
        const x = left + column;
        addCell(cells, [
          { x, y },
          { x: x + 0.5, y: y + rise },
          { x: x - 0.5, y: y + rise },
        ]);
        if (column < row)
          addCell(cells, [
            { x, y },
            { x: x + 1, y },
            { x: x + 0.5, y: y + rise },
          ]);
      }
    }
    for (let k = 1; k < side; k++) {
      creases.push({
        id: `h${k}`,
        label: `横线 ${k}`,
        normal: { x: 0, y: 1 },
        offset: k * rise,
        negativeLabel: "上 → 下",
        positiveLabel: "下 → 上",
      });
      creases.push({
        id: `r${k}`,
        label: `右斜线 ${k}`,
        normal: { x: -Math.sqrt(3), y: 1 },
        offset: Math.sqrt(3) * (-side / 2 + k),
        negativeLabel: "右上 → 左下",
        positiveLabel: "左下 → 右上",
      });
      creases.push({
        id: `l${k}`,
        label: `左斜线 ${k}`,
        normal: { x: Math.sqrt(3), y: 1 },
        offset: Math.sqrt(3) * (side / 2 + k),
        negativeLabel: "左上 → 右下",
        positiveLabel: "右下 → 左上",
      });
    }
  } else {
    width = shape === "rectangle" ? size + 2 : size;
    height = size;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const center = { x: x + 0.5, y: y + 0.5 };
        const corners = [
          { x, y },
          { x: x + 1, y },
          { x: x + 1, y: y + 1 },
          { x, y: y + 1 },
        ];
        for (let side = 0; side < 4; side++)
          addCell(cells, [corners[side], corners[(side + 1) % 4], center]);
      }
    }
    for (let x = 1; x < width; x++)
      creases.push({
        id: `v${x}`,
        label: `竖线 ${x}`,
        normal: { x: 1, y: 0 },
        offset: x,
        negativeLabel: "左 → 右",
        positiveLabel: "右 → 左",
      });
    for (let y = 1; y < height; y++)
      creases.push({
        id: `h${y}`,
        label: `横线 ${y}`,
        normal: { x: 0, y: 1 },
        offset: y,
        negativeLabel: "上 → 下",
        positiveLabel: "下 → 上",
      });
    if (shape === "square") {
      creases.push({
        id: "d1",
        label: "主对角线 ↘",
        normal: { x: -1, y: 1 },
        offset: 0,
        negativeLabel: "右上 → 左下",
        positiveLabel: "左下 → 右上",
      });
      creases.push({
        id: "d2",
        label: "主对角线 ↗",
        normal: { x: 1, y: 1 },
        offset: size,
        negativeLabel: "左上 → 右下",
        positiveLabel: "右下 → 左上",
      });
    } else {
      // Short corner diagonals preserve the atomic mesh and give rectangles
      // genuine two-dimensional choices. Axial moves alone commute across axes
      // and make the smallest rectangle's entire state space only four moves deep.
      creases.push({
        id: "corner-tl",
        label: "左上角斜线",
        normal: { x: 1, y: 1 },
        offset: 2,
        negativeLabel: "左上 → 右下",
        positiveLabel: "右下 → 左上",
      });
      creases.push({
        id: "corner-br",
        label: "右下角斜线",
        normal: { x: 1, y: 1 },
        offset: width + height - 2,
        negativeLabel: "左上 → 右下",
        positiveLabel: "右下 → 左上",
      });
      creases.push({
        id: "corner-tr",
        label: "右上角斜线",
        normal: { x: -1, y: 1 },
        offset: 2 - width,
        negativeLabel: "右上 → 左下",
        positiveLabel: "左下 → 右上",
      });
      creases.push({
        id: "corner-bl",
        label: "左下角斜线",
        normal: { x: -1, y: 1 },
        offset: height - 2,
        negativeLabel: "右上 → 左下",
        positiveLabel: "左下 → 右上",
      });
    }
    if (version === 2) {
      // Append every grid-aligned diagonal without changing existing IDs or
      // their order. buildActions retains only complete in-board reflections.
      const append = (crease: Crease) => {
        if (
          creases.some(
            (existing) =>
              existing.normal.x === crease.normal.x &&
              existing.normal.y === crease.normal.y &&
              existing.offset === crease.offset,
          )
        )
          return;
        creases.push(crease);
      };
      for (let k = 1 - width; k < height; k++)
        append({
          id: `diag-down-${k}`,
          label: `斜线 ↘ ${k}`,
          normal: { x: -1, y: 1 },
          offset: k,
          negativeLabel: "右上 → 左下",
          positiveLabel: "左下 → 右上",
        });
      for (let k = 1; k < width + height; k++)
        append({
          id: `diag-up-${k}`,
          label: `斜线 ↗ ${k}`,
          normal: { x: 1, y: 1 },
          offset: k,
          negativeLabel: "左上 → 右下",
          positiveLabel: "右下 → 左上",
        });
    }
  }
  const geometry: Geometry = {
    shape,
    size,
    cells,
    width,
    height,
    actions: buildActions(cells, creases),
  };
  if (!geometry.actions.length)
    throw new Error("Folding geometry has no legal actions.");
  geometryCache.set(key, geometry);
  return geometry;
}

export function boardsEqual(
  a: readonly number[],
  b: readonly number[],
): boolean {
  return a.length === b.length && a.every((color, index) => color === b[index]);
}

/** Simultaneous copy: reads always use the old board; the source is retained. */
export function applyFold(board: number[], action: FoldAction): number[] {
  const result = board.slice();
  for (const [source, destination] of action.mapping) {
    if (
      source < 0 ||
      destination < 0 ||
      source >= board.length ||
      destination >= board.length
    )
      throw new RangeError("Fold mapping lies outside this board.");
    result[destination] = board[source];
  }
  return result;
}

type SearchResult = { path: string[] | null; exhausted: boolean };

function search(
  geometry: Geometry,
  board: number[],
  target: number[],
  maxDepth: number,
  maxNodes: number,
): SearchResult {
  if (board.length !== geometry.cells.length || target.length !== board.length)
    throw new RangeError("Board length does not match folding geometry.");
  if (boardsEqual(board, target)) return { path: [], exhausted: true };
  if (maxDepth <= 0) return { path: null, exhausted: true };
  // Full output-source maps make final-depth comparisons allocation-free.
  const actions = geometry.actions.map((action) => {
    const read = Array.from({ length: board.length }, (_, i) => i);
    for (const [source, destination] of action.mapping)
      read[destination] = source;
    return { action, read };
  });
  const queue: { board: number[]; path: string[] }[] = [{ board, path: [] }];
  const visited = new Set([board.join(",")]);
  let nodes = 0;
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head];
    for (const { action, read } of actions) {
      // Applying the same mirror overwrite twice is idempotent.
      if (current.path[current.path.length - 1] === action.id) continue;
      if (nodes++ >= maxNodes) return { path: null, exhausted: false };
      let isTarget = true;
      for (let i = 0; i < target.length; i++) {
        if (current.board[read[i]] !== target[i]) {
          isTarget = false;
          break;
        }
      }
      if (isTarget)
        return { path: [...current.path, action.id], exhausted: true };
      if (current.path.length + 1 >= maxDepth) continue;
      const next = applyFold(current.board, action);
      const key = next.join(",");
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ board: next, path: [...current.path, action.id] });
    }
  }
  return { path: null, exhausted: true };
}

/**
 * Returns a shortest route within the completed breadth-first search, or null
 * when no route was found within either budget. Null is NOT an unsolvability proof.
 */
export function findHint(
  geometry: Geometry,
  board: number[],
  target: number[],
  maxDepth = 3,
  maxNodes = 12000,
): string[] | null {
  if (
    !Number.isInteger(maxDepth) ||
    maxDepth < 0 ||
    !Number.isInteger(maxNodes) ||
    maxNodes < 0
  )
    throw new RangeError(
      "Hint depth and node budget must be nonnegative integers.",
    );
  return search(geometry, board, target, maxDepth, maxNodes).path;
}

function seededRandom(seed: string) {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    state ^= seed.charCodeAt(i);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function makeInitial(
  geometry: Geometry,
  palette: number,
  random: () => number,
) {
  const board = new Array<number>(geometry.cells.length);
  if (geometry.shape !== "triangle") {
    for (let i = 0; i < board.length; i += 4) {
      const first = Math.floor(random() * palette);
      const second =
        (first + 1 + Math.floor(random() * (palette - 1))) % palette;
      const rotation = Math.floor(random() * 4);
      for (let side = 0; side < 4; side++)
        board[i + ((side + rotation) % 4)] = side < 2 ? first : second;
    }
  } else {
    for (let i = 0; i < board.length; i++)
      board[i] =
        i > 0 && random() < 0.28
          ? board[i - 1]
          : Math.floor(random() * palette);
  }
  return board;
}

function replay(
  initial: number[],
  solution: string[],
  actions: Map<string, FoldAction>,
) {
  const states = [initial.slice()];
  for (const id of solution) {
    const action = actions.get(id);
    if (!action) throw new Error("Unknown action in generated solution.");
    states.push(applyFold(states[states.length - 1], action));
  }
  return states;
}

function simplifyPath(
  initial: number[],
  target: number[],
  path: string[],
  actions: Map<string, FoldAction>,
) {
  let result = path.slice();
  for (let i = 0; i < result.length;) {
    const candidate = result.filter((_, index) => index !== i);
    const states = replay(initial, candidate, actions);
    if (boardsEqual(states[states.length - 1], target)) {
      result = candidate;
      i = 0;
    } else i++;
  }
  return result;
}

/**
 * The version, complete config, and fixed work budgets determine the puzzle.
 * No clock, Math.random(), network, or wall-clock search deadline is consulted.
 * Difficulty is a generation tier, not a claim that all targets have that depth.
 */
export function generatePuzzle(
  config: PuzzleConfig,
  version: PuzzleVersion = CURRENT_PUZZLE_VERSION,
): Puzzle {
  assertShapeSize(config.shape, config.size);
  assertVersion(version);
  if (
    typeof config.seed !== "string" ||
    !config.seed.length ||
    config.seed.length > 512
  )
    throw new RangeError(
      "Puzzle seed must contain between 1 and 512 characters.",
    );
  if (!Number.isInteger(config.level) || config.level < 1 || config.level > 5)
    throw new RangeError("Folding level must be an integer from 1 to 5.");
  const geometry = getGeometry(config.shape, config.size, version);
  const actions = new Map(
    geometry.actions.map((action) => [action.id, action]),
  );
  const random = seededRandom(
    JSON.stringify([
      version,
      config.seed,
      config.shape,
      config.size,
      config.level,
    ]),
  );
  const steps =
    config.level === 5 ? 5 + Math.floor(random() * 2) : config.level;
  const palette = Math.min(5, config.level + 2);
  let fallback: Puzzle | null = null;
  let fallbackScore = -Infinity;

  for (let attempt = 0; attempt < 128; attempt++) {
    const initial = makeInitial(geometry, palette, random);
    let board = initial;
    const visited = new Set([initial.join(",")]);
    const path: string[] = [];
    for (let step = 0; step < steps; step++) {
      const start = Math.floor(random() * geometry.actions.length);
      let chosen: { action: FoldAction; board: number[] } | null = null;
      for (let offset = 0; offset < geometry.actions.length; offset++) {
        const action =
          geometry.actions[(start + offset) % geometry.actions.length];
        const next = applyFold(board, action);
        const key = next.join(",");
        const changes = next.reduce(
          (count, color, i) => count + Number(color !== board[i]),
          0,
        );
        if (
          changes < Math.max(1, Math.floor(board.length * 0.015)) ||
          visited.has(key)
        )
          continue;
        chosen = { action, board: next };
        visited.add(key);
        break;
      }
      if (!chosen) break;
      path.push(chosen.action.id);
      board = chosen.board;
    }
    if (!path.length || boardsEqual(initial, board)) continue;
    const counts = new Map<number, number>();
    board.forEach((color) => counts.set(color, (counts.get(color) ?? 0) + 1));
    if (counts.size < 3 || Math.max(...counts.values()) > board.length * 0.75)
      continue;
    const distance = board.reduce(
      (count, color, i) => count + Number(color !== initial[i]),
      0,
    );
    if (distance < Math.max(2, Math.floor(board.length * 0.06))) continue;

    let solution = simplifyPath(initial, board, path, actions);
    const proofDepth = Math.min(solution.length - 1, 3);
    const proof = search(geometry, initial, board, proofDepth, 12000);
    let shortest =
      solution.length === 1 ||
      (proof.exhausted && proofDepth === solution.length - 1);
    if (proof.path) {
      solution = proof.path;
      shortest = true;
    }
    const states = replay(initial, solution, actions);
    const candidate: Puzzle = {
      version,
      config: { ...config },
      initial: initial.slice(),
      target: board.slice(),
      solution,
      states,
      // Legacy targets and paths are preserved, but the UI now allows the
      // additional v2 moves even on old puzzles, so an old proof is insufficient.
      shortest: version === 1 ? solution.length === 1 : shortest,
    };
    // A deterministic best candidate remains available if a very small board
    // cannot satisfy the requested tier within the fixed retry budget.
    const score = solution.length * 1000 + distance;
    if (score > fallbackScore) {
      fallback = candidate;
      fallbackScore = score;
    }
    const meetsTier =
      solution.length === steps || (config.level === 5 && solution.length >= 5);
    // A larger v2 action set can exceed the fixed search budget. Keep its known
    // valid reference route instead of retrying 128 times just to prove depth.
    // v1 keeps the original acceptance rule for byte-for-byte seeded replay.
    if (meetsTier && !proof.path && (version === 2 || proof.exhausted))
      return candidate;
  }
  if (fallback) return fallback;
  throw new Error(
    "Could not generate a nontrivial folding puzzle within the fixed budget.",
  );
}
