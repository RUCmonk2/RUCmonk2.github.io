"use client";

import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  numberGoal,
  numberNeighbors,
  numberParity,
  numberShuffle,
  numberSlide,
} from "@/lib/math-lab/number-sliding";

type Drag = {
  pointer: number;
  tile: number;
  x: number;
  y: number;
  unit: number;
  dx: number;
  dy: number;
};

export function NumberWorkshop({
  seed,
  active,
  onNew,
  onTheory,
}: {
  seed: string;
  active: boolean;
  onNew: () => void;
  onTheory: () => void;
}) {
  const start = useMemo(() => numberShuffle(seed), [seed]);
  const [history, setHistory] = useState([start]);
  const [seconds, setSeconds] = useState(0);
  const [dye, setDye] = useState(false);
  const [preview, setPreview] = useState<{
    tile: number;
    x: number;
    y: number;
  } | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const announced = useRef(false);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const board = history[history.length - 1];
  const blank = board.indexOf(0);
  const moves = history.length - 1;
  const solved = board.every((tile, i) => tile === (i + 1) % 16);
  const started = moves > 0;
  const parity = numberParity(board, 4);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (!active || !started || solved) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSeconds((n) => n + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [active, started, solved]);
  useEffect(() => {
    if (!solved) announced.current = false;
    if (!solved || !active || announced.current) return;
    const timer = window.setTimeout(() => {
      announced.current = true;
      dialog.current?.showModal();
    }, 180);
    return () => window.clearTimeout(timer);
  }, [active, solved]);

  function play(tile: number) {
    if (solved) return;
    const next = numberSlide(board, board.indexOf(tile), 4);
    if (next) setHistory([...history, next]);
  }

  function begin(
    event: PointerEvent<HTMLButtonElement>,
    tile: number,
    index: number,
  ) {
    if (!grid.current || drag.current || !event.isPrimary || event.button !== 0)
      return;
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      pointer: event.pointerId,
      tile,
      x: event.clientX,
      y: event.clientY,
      unit: grid.current.clientWidth / 4,
      dx: (blank % 4) - (index % 4),
      dy: Math.floor(blank / 4) - Math.floor(index / 4),
    };
  }
  function track(event: PointerEvent<HTMLButtonElement>, commit: boolean) {
    const grip = drag.current;
    if (!grip || grip.pointer !== event.pointerId) return;
    const dx = event.clientX - grip.x;
    const dy = event.clientY - grip.y;
    if (Math.hypot(dx, dy) >= 6) suppressClick.current = true;
    const travel = Math.max(
      0,
      Math.min(1, (dx * grip.dx + dy * grip.dy) / grip.unit),
    );
    if (commit) {
      drag.current = null;
      setPreview(null);
      if (travel >= 0.5) play(grip.tile);
    } else if (suppressClick.current) {
      setPreview({ tile: grip.tile, x: travel * grip.dx, y: travel * grip.dy });
    }
  }
  function cancel(event: PointerEvent<HTMLButtonElement>) {
    if (drag.current?.pointer !== event.pointerId) return;
    drag.current = null;
    suppressClick.current = true;
    setPreview(null);
  }
  const goal = numberGoal(4, 4);
  return (
    <div className="kl-game">
      <aside className="kl-sidebar">
        <span className="notes-overline">15 PUZZLE</span>
        <h2>数字华容道</h2>
        <p>点击或拖动紧挨空格的数字，把 1–15 按行排好，空格留在右下角。</p>
        <div className="kl-side-metrics">
          <div>
            <span className="kl-goal-label">目标排列</span>
            <div className="kl-number-goal" aria-label="目标排列">
              {goal.map((tile) => (
                <span key={tile}>{tile || "·"}</span>
              ))}
            </div>
          </div>
          <dl className="kl-stats">
            <div>
              <dt>步数</dt>
              <dd>{moves}</dd>
            </div>
            <div>
              <dt>用时</dt>
              <dd>{time}</dd>
            </div>
          </dl>
        </div>
        <div className="kl-actions">
          <button
            className="kl-button"
            disabled={!moves}
            onClick={() => setHistory(history.slice(0, -1))}
          >
            撤销
          </button>
          <button
            className="kl-button"
            onClick={() => {
              setHistory([start]);
              setSeconds(0);
            }}
          >
            重来
          </button>
          <button className="kl-button kl-primary" onClick={onNew}>
            换一题
          </button>
          <button className="kl-button" onClick={onTheory}>
            为什么有解？
          </button>
        </div>
        <div className="kl-number-facts">
          <p className="kl-result" role="status">
            {solved ? "已通关" : "本题有解"}
          </p>
          <p className="kl-number-seed">
            题号 {seed} · 不变量 {parity.invariant}
          </p>
          <label>
            <input
              type="checkbox"
              checked={dye}
              onChange={(event) => setDye(event.target.checked)}
            />{" "}
            黑白染色
          </label>
        </div>
      </aside>
      <div className="kl-play" id="kl-number-play">
        <div
          className="kl-number-play"
          aria-label="4×4 数字华容道棋盘"
          ref={grid}
        >
          {Array.from({ length: 16 }, (_, i) => (
            <span
              className={
                dye && ((i % 4) + Math.floor(i / 4)) % 2
                  ? "kl-cell kl-cell-dark"
                  : "kl-cell"
              }
              aria-hidden
              key={i}
            />
          ))}
          {goal.filter(Boolean).map((tile) => {
            const index = board.indexOf(tile);
            const adjacent = numberNeighbors(blank, 4, 16).includes(index);
            const moving = preview?.tile === tile;
            const position = {
              "--x": (index % 4) + (moving ? preview.x : 0),
              "--y": Math.floor(index / 4) + (moving ? preview.y : 0),
            } as CSSProperties;
            return (
              <button
                type="button"
                key={tile}
                style={position}
                className={moving ? "kl-digit kl-moving" : "kl-digit"}
                disabled={solved || !adjacent}
                onPointerDown={(event) => begin(event, tile, index)}
                onPointerMove={(event) => track(event, false)}
                onPointerUp={(event) => track(event, true)}
                onPointerCancel={cancel}
                onLostPointerCapture={cancel}
                onClick={(event) => {
                  if (event.detail === 0 || !suppressClick.current) play(tile);
                }}
              >
                {tile}
              </button>
            );
          })}
        </div>
      </div>
      <dialog
        className="kl-completion"
        ref={dialog}
        aria-labelledby="kl-number-title"
      >
        <h2 id="kl-number-title">数字都归位了</h2>
        <p>
          {moves} 步 · 用时 {time}
        </p>
        <div className="kl-actions">
          <button className="kl-button kl-primary" onClick={onNew}>
            下一题
          </button>
          <button className="kl-button" onClick={() => dialog.current?.close()}>
            查看盘面
          </button>
        </div>
      </dialog>
    </div>
  );
}
