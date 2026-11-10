export type Board = readonly number[];
export type Move = { piece: number; to: number };
export const WIDTH = 4;
export const HEIGHT = 5;
export const shapes = [
  [2, 2],
  [1, 2],
  [1, 2],
  [1, 2],
  [1, 2],
  [2, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
] as const;
export const names = [
  "曹操",
  "张飞",
  "赵云",
  "马超",
  "黄忠",
  "关羽",
  "兵",
  "兵",
  "兵",
  "兵",
];
export const classic: Board = [1, 0, 3, 8, 11, 9, 13, 14, 16, 19];
export const locked: Board = [4, 2, 3, 10, 12, 17, 0, 1, 11, 15];
export const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

export function cellMask(x: number, y: number, w: number, h: number) {
  if (x < 0 || y < 0 || x + w > WIDTH || y + h > HEIGHT) return 0;
  let mask = 0;
  for (let row = 0; row < h; row++)
    mask |= ((1 << w) - 1) << ((y + row) * WIDTH + x);
  return mask;
}

const masks = shapes.map(([w, h]) =>
  Array.from({ length: 20 }, (_, p) =>
    cellMask(p % WIDTH, Math.floor(p / WIDTH), w, h),
  ),
);

export function legalMoves(board: Board): Move[] {
  const occupied = board.reduce((mask, p, i) => mask | masks[i][p], 0);
  const result: Move[] = [];
  board.forEach((p, piece) => {
    const rest = occupied ^ masks[piece][p];
    const [w, h] = shapes[piece];
    for (const [dx, dy] of directions) {
      let x = (p % WIDTH) + dx;
      let y = Math.floor(p / WIDTH) + dy;
      for (
        let mask = cellMask(x, y, w, h);
        mask && !(mask & rest);
        mask = cellMask(x, y, w, h)
      ) {
        result.push({ piece, to: y * WIDTH + x });
        x += dx;
        y += dy;
      }
    }
  });
  return result;
}

export function slide(board: Board, move: Move): Board {
  return board.map((p, i) => (i === move.piece ? move.to : p));
}

export function boardKey(board: Board) {
  return [
    board[0],
    ...board.slice(1, 5).sort((a, b) => a - b),
    board[5],
    ...board.slice(6).sort((a, b) => a - b),
  ]
    .map((p) => p.toString(20))
    .join("");
}

export function atExit(board: Board) {
  return board[0] === 13;
}

export function moveLabel(board: Board, move: Move) {
  const from = board[move.piece];
  const dx = (move.to % WIDTH) - (from % WIDTH);
  const dy = Math.floor(move.to / WIDTH) - Math.floor(from / WIDTH);
  return `${names[move.piece]}${dx ? (dx > 0 ? "向右" : "向左") : dy > 0 ? "向下" : "向上"}${Math.abs(dx || dy)}格`;
}

export function stateGraph(board: Board, depth: number) {
  const nodes = [{ board, depth: 0 }];
  const edges: { from: number; to: number; label: string }[] = [];
  const ids = new Map([[boardKey(board), 0]]);
  for (const [from, node] of nodes.entries()) {
    if (node.depth >= depth || atExit(node.board)) continue;
    for (const move of legalMoves(node.board)) {
      const board = slide(node.board, move);
      const key = boardKey(board);
      let to = ids.get(key);
      if (to === undefined) {
        to = nodes.length;
        ids.set(key, to);
        nodes.push({ board, depth: node.depth + 1 });
      }
      edges.push({ from, to, label: moveLabel(node.board, move) });
    }
  }
  return { nodes, edges };
}
