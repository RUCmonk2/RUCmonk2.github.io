export function numberGoal(width: number, height: number) {
  return Array.from(
    { length: width * height },
    (_, i) => (i + 1) % (width * height),
  );
}

export function numberNeighbors(blank: number, width: number, length: number) {
  return [
    blank % width > 0 ? blank - 1 : -1,
    blank % width < width - 1 ? blank + 1 : -1,
    blank - width,
    blank + width,
  ].filter((index) => index >= 0 && index < length);
}

export function numberSlide(
  board: readonly number[],
  from: number,
  width: number,
) {
  const blank = board.indexOf(0);
  if (!numberNeighbors(blank, width, board.length).includes(from)) return null;
  const next = board.slice();
  [next[blank], next[from]] = [next[from], next[blank]];
  return next;
}

export function numberParity(board: readonly number[], width: number) {
  const labels = board.map((tile) => tile || board.length);
  let odd = 0;
  for (let i = 0; i < labels.length; i++) {
    for (let j = i + 1; j < labels.length; j++) {
      if (labels[i] > labels[j]) odd ^= 1;
    }
  }
  const blank = board.indexOf(0);
  const color = ((blank % width) + Math.floor(blank / width)) % 2;
  return { odd, color, invariant: odd ^ color };
}

export function numberShuffle(seed: string) {
  let state = Number.parseInt(seed, 16) >>> 0;
  const random = (length: number) => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return Math.floor((state / 4294967296) * length);
  };
  let board = numberGoal(4, 4);
  let previous = -1;
  // Every shuffled board has a legal reverse route to the goal.
  for (
    let i = 0;
    i < 32 || board.every((tile, index) => tile === (index + 1) % 16);
    i++
  ) {
    const blank = board.indexOf(0);
    const neighbors = numberNeighbors(blank, 4, 16).filter(
      (index) => index !== previous,
    );
    board = numberSlide(board, neighbors[random(neighbors.length)], 4)!;
    previous = blank;
  }
  return board;
}
