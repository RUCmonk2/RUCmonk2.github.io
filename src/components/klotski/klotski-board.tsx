"use client";

import { type CSSProperties, type PointerEvent, useRef, useState } from "react";

import {
  type Board,
  legalMoves,
  type Move,
  names,
  shapes,
  WIDTH,
} from "@/lib/math-lab/klotski";

type Drag = {
  id: number;
  piece: number;
  x: number;
  y: number;
  unit: number;
  axis?: "x" | "y";
};

export function KlotskiBoard({
  board,
  onMove,
  hint,
  disabled = false,
  miniature = false,
  colored = false,
  escaped = false,
}: {
  board: Board;
  onMove?: (move: Move) => void;
  hint?: Move;
  disabled?: boolean;
  miniature?: boolean;
  colored?: boolean;
  escaped?: boolean;
}) {
  const field = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const [preview, setPreview] = useState<{
    piece: number;
    x: number;
    y: number;
  } | null>(null);

  function start(event: PointerEvent<HTMLButtonElement>, piece: number) {
    if (
      disabled ||
      drag.current ||
      !event.isPrimary ||
      event.button !== 0 ||
      !field.current
    )
      return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId,
      piece,
      x: event.clientX,
      y: event.clientY,
      unit: field.current.clientWidth / WIDTH,
    };
  }

  function track(event: PointerEvent<HTMLButtonElement>, commit: boolean) {
    const active = drag.current;
    if (!active || active.id !== event.pointerId) return;
    const x = (event.clientX - active.x) / active.unit;
    const y = (event.clientY - active.y) / active.unit;
    if (!active.axis && Math.hypot(x, y) * active.unit >= 6)
      active.axis = Math.abs(x) >= Math.abs(y) ? "x" : "y";
    const anchor = board[active.piece];
    const horizontal = active.axis === "x";
    const delta = horizontal ? x : y;
    const options =
      active.axis && !disabled
        ? legalMoves(board).filter((move) => {
            if (move.piece !== active.piece) return false;
            return horizontal
              ? Math.floor(anchor / WIDTH) === Math.floor(move.to / WIDTH)
              : anchor % WIDTH === move.to % WIDTH;
          })
        : [];
    const offset = (move: Move) =>
      horizontal
        ? (move.to % WIDTH) - (anchor % WIDTH)
        : Math.floor(move.to / WIDTH) - Math.floor(anchor / WIDTH);
    const distances = options.map(offset);
    const progress = Math.max(
      Math.min(0, ...distances),
      Math.min(Math.max(0, ...distances), delta),
    );
    if (commit) {
      drag.current = null;
      setPreview(null);
      const move = options.find(
        (move) => offset(move) === Math.round(progress),
      );
      if (move) onMove?.(move);
    } else if (active.axis) {
      setPreview({
        piece: active.piece,
        x: horizontal ? progress : 0,
        y: horizontal ? 0 : progress,
      });
    }
  }

  function cancel(event: PointerEvent<HTMLButtonElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    setPreview(null);
  }

  return (
    <div className={miniature ? "kl-board-shell kl-mini" : "kl-board-shell"}>
      <div ref={field} className="kl-board" aria-label="华容道棋盘">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            aria-hidden
            className={
              colored && ((i % 4) + Math.floor(i / 4)) % 2
                ? "kl-cell kl-cell-dark"
                : "kl-cell"
            }
          />
        ))}
        {board.map((anchor, piece) => {
          const [w, h] = shapes[piece];
          const moving = preview?.piece === piece;
          const style = {
            "--x": (anchor % WIDTH) + (moving ? preview.x : 0),
            "--y": Math.floor(anchor / WIDTH) + (moving ? preview.y : 0),
            "--w": w,
            "--h": h,
          } as CSSProperties;
          const className = `kl-piece kl-piece-${piece === 0 ? "cao" : piece === 5 ? "guan" : piece < 5 ? "tall" : "pawn"}${moving ? " kl-moving" : ""}${hint?.piece === piece ? " kl-hint-piece" : ""}${escaped && piece === 0 ? " kl-escaped" : ""}`;
          if (!onMove)
            return (
              <span key={piece} style={style} className={className}>
                {miniature ? names[piece][0] : names[piece]}
              </span>
            );
          return (
            <button
              key={piece}
              type="button"
              style={style}
              className={className}
              disabled={disabled}
              aria-label={`${names[piece]}，第 ${Math.floor(anchor / WIDTH) + 1} 行第 ${(anchor % WIDTH) + 1} 列`}
              onPointerDown={(event) => start(event, piece)}
              onPointerMove={(event) => track(event, false)}
              onPointerUp={(event) => track(event, true)}
              onPointerCancel={cancel}
              onLostPointerCapture={cancel}
              onKeyDown={(event) => {
                const shift = {
                  ArrowLeft: -1,
                  ArrowRight: 1,
                  ArrowUp: -WIDTH,
                  ArrowDown: WIDTH,
                }[event.key];
                if (shift === undefined) return;
                event.preventDefault();
                const to = anchor + shift;
                if (
                  Math.abs(shift) === 1 &&
                  Math.floor(to / WIDTH) !== Math.floor(anchor / WIDTH)
                )
                  return;
                const move = legalMoves(board).find(
                  (move) => move.piece === piece && move.to === to,
                );
                if (move) onMove(move);
              }}
            >
              {names[piece]}
            </button>
          );
        })}
      </div>
      <div className="kl-exit" aria-label="底部中央出口">
        {miniature ? "" : "↓ 出口"}
      </div>
    </div>
  );
}
