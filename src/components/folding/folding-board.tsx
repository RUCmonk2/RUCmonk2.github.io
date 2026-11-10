"use client";

import {
  type PointerEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  type FoldAction,
  type Geometry,
  type Point,
} from "@/lib/math-lab/folding";
import {
  type FoldGesture,
  foldMatrix,
  inferFold,
  pointInsideBoard,
} from "@/lib/math-lab/folding-gesture";

export const COLORS = ["#7ca9d8", "#e8a052", "#ce6384", "#63a995", "#9686c4"];
export const COLOR_NAMES = ["晴蓝", "杏橙", "莓红", "青绿", "藤紫"];
const SYMBOLS = ["●", "+", "△", "=", "◇"];
export type FoldAnimation = {
  action: FoldAction;
  before: number[];
  serial: number;
  fromProgress?: number;
};
export type FoldHistoryStep = { number: number; action: FoldAction };
type Drag = {
  start: Point;
  current: Point;
  pointerId: number;
  scale: number;
  result: FoldGesture | null;
  historyStep?: number;
  allowDrag: boolean;
  hasMoved: boolean;
};
type Preview = {
  action: FoldAction | null;
  ready: boolean;
  start: Point;
  moved: boolean;
  allowed: boolean;
};

function lineKey(action: FoldAction) {
  return action.line
    .map((p) => `${p.x.toFixed(5)},${p.y.toFixed(5)}`)
    .sort()
    .join("/");
}
export function sameLine(a: FoldAction, b: FoldAction) {
  return lineKey(a) === lineKey(b);
}

function FoldHistoryOverlay({
  steps,
  viewedStep,
  geometry,
}: {
  steps: FoldHistoryStep[];
  viewedStep?: number;
  geometry: Geometry;
}) {
  const groups = new Map<string, FoldHistoryStep[]>();
  for (const step of steps) {
    const key = lineKey(step.action);
    const group = groups.get(key);
    if (group) group.push(step);
    else groups.set(key, [step]);
  }
  const badges: { x: number; y: number; width: number }[] = [];
  return (
    <g className="fold-history-overlay" pointerEvents="none" aria-hidden="true">
      {[...groups.entries()].map(([key, group]) => {
        const recent = group[group.length - 1];
        const selected = group.find((step) => step.number === viewedStep);
        const displayed = selected ?? recent;
        const emphasized =
          displayed.number === (viewedStep ?? steps.at(-1)?.number);
        const [a, b] = displayed.action.line;
        const { x: nx, y: ny } = displayed.action.direction;
        const text =
          group.length > 3
            ? `${displayed.number} · +${group.length - 1}`
            : group.map((step) => step.number).join(" · ");
        const width = 0.48 + text.length * 0.115;
        const anchors = [0.38, 0.64, 0.22, 0.78, 0.5].map((t) => ({
          x: Math.max(
            width / 2 + 0.02,
            Math.min(geometry.width - width / 2 - 0.02, a.x + (b.x - a.x) * t),
          ),
          y: Math.max(
            0.17,
            Math.min(geometry.height - 0.17, a.y + (b.y - a.y) * t),
          ),
        }));
        const anchor =
          anchors.find(({ x, y }) =>
            badges.every(
              (badge) =>
                Math.abs(x - badge.x) > (width + badge.width) / 2 + 0.08 ||
                Math.abs(y - badge.y) > 0.36,
            ),
          ) ?? anchors[0];
        const { x, y } = anchor;
        badges.push({ x, y, width });
        const arrowX = x + width / 2 - 0.18;
        return (
          <g
            key={key}
            data-steps={group.map((step) => step.number).join(",")}
            className={
              emphasized
                ? "fold-history-mark fold-history-mark-active"
                : "fold-history-mark"
            }
          >
            <line
              className="fold-history-line"
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              vectorEffect="non-scaling-stroke"
            />
            <rect
              className="fold-history-badge"
              data-history-step={displayed.number}
              pointerEvents="all"
              x={x - width / 2}
              y={y - 0.15}
              width={width}
              height={0.3}
              rx={0.1}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={x - 0.14}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={0.21}
            >
              {group.length > 3 ? (
                <tspan data-history-step={displayed.number} pointerEvents="all">
                  {text}
                </tspan>
              ) : (
                group.map((step, index) => (
                  <tspan
                    key={step.number}
                    data-history-step={step.number}
                    pointerEvents="all"
                  >
                    {index > 0 ? " · " : ""}
                    {step.number}
                  </tspan>
                ))
              )}
            </text>
            <g
              transform={`translate(${arrowX} ${y}) rotate(${(Math.atan2(ny, nx) * 180) / Math.PI})`}
            >
              <path
                className="fold-history-arrow"
                d="M-.1 0H.1M.03 -.065L.1 0L.03 .065"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
        );
      })}
    </g>
  );
}

export function FoldingBoard({
  geometry,
  board,
  target,
  symbols = false,
  miniature = false,
  differences = false,
  selected,
  animation,
  history,
  viewedStep,
  reviewedCells,
  disabled = false,
  onSelect,
  onFold,
  onAnimationEnd,
  onReview,
}: {
  geometry: Geometry;
  board: number[];
  target?: number[];
  symbols?: boolean;
  miniature?: boolean;
  differences?: boolean;
  selected?: FoldAction;
  animation?: FoldAnimation | null;
  history?: FoldHistoryStep[];
  viewedStep?: number;
  reviewedCells?: number[];
  disabled?: boolean;
  onSelect?: (action: FoldAction | null) => void;
  onFold?: (action: FoldAction, progress?: number) => void;
  onAnimationEnd?: () => void;
  onReview?: (step: number) => void;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const moving = useRef<SVGGElement>(null);
  const gestureMoving = useRef<SVGGElement>(null);
  const dragTrail = useRef<SVGLineElement>(null);
  const dragDot = useRef<SVGCircleElement>(null);
  const landingDot = useRef<SVGCircleElement>(null);
  const bisectorGuide = useRef<SVGLineElement>(null);
  const midpointGuide = useRef<SVGCircleElement>(null);
  const guideClip = useId();
  const drag = useRef<Drag | null>(null);
  const frame = useRef(0);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [returning, setReturning] = useState<{
    action: FoldAction;
    progress: number;
  } | null>(null);
  const endRef = useRef(onAnimationEnd);
  useEffect(() => {
    endRef.current = onAnimationEnd;
  }, [onAnimationEnd]);

  useEffect(() => {
    const previous = drag.current;
    drag.current = null;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (previous && svg.current?.hasPointerCapture(previous.pointerId))
      svg.current.releasePointerCapture(previous.pointerId);
    setPreview(null);
    setReturning(null);
  }, [board, geometry, disabled]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  useLayoutEffect(() => {
    if (!animation || !moving.current) return;
    const from = animation.fromProgress ?? 0;
    moving.current.setAttribute(
      "transform",
      foldMatrix(animation.action, from),
    );
    let request = 0;
    const start = performance.now();
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 100 + 190 * (1 - from);
    const tick = (now: number) => {
      const progress =
        duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = progress * progress * (3 - 2 * progress);
      moving.current?.setAttribute(
        "transform",
        foldMatrix(animation.action, from + (1 - from) * eased),
      );
      if (progress < 1) request = requestAnimationFrame(tick);
      else endRef.current?.();
    };
    request = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(request);
  }, [animation]);

  useLayoutEffect(() => {
    if (!returning || !gestureMoving.current) return;
    let request = 0;
    const start = performance.now();
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 160;
    gestureMoving.current.setAttribute(
      "transform",
      foldMatrix(returning.action, returning.progress),
    );
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      gestureMoving.current?.setAttribute(
        "transform",
        foldMatrix(returning.action, returning.progress * (1 - t) ** 2),
      );
      if (t < 1) request = requestAnimationFrame(tick);
      else setReturning(null);
    };
    request = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(request);
  }, [returning]);

  function paintGesture() {
    const gesture = drag.current;
    if (!gesture) return;
    const { result, current } = gesture;
    if (result) {
      bisectorGuide.current?.setAttribute("x1", String(result.bisector[0].x));
      bisectorGuide.current?.setAttribute("y1", String(result.bisector[0].y));
      bisectorGuide.current?.setAttribute("x2", String(result.bisector[1].x));
      bisectorGuide.current?.setAttribute("y2", String(result.bisector[1].y));
      midpointGuide.current?.setAttribute("cx", String(result.midpoint.x));
      midpointGuide.current?.setAttribute("cy", String(result.midpoint.y));
    }
    if (
      result &&
      gestureMoving.current?.getAttribute("data-action") === result.action.id
    ) {
      gestureMoving.current?.setAttribute(
        "transform",
        foldMatrix(result.action, result.progress),
      );
      gestureMoving.current?.setAttribute(
        "data-progress",
        result.progress.toFixed(3),
      );
      landingDot.current?.setAttribute("cx", String(result.landing.x));
      landingDot.current?.setAttribute("cy", String(result.landing.y));
    }
    dragTrail.current?.setAttribute("x2", String(current.x));
    dragTrail.current?.setAttribute("y2", String(current.y));
    dragDot.current?.setAttribute("cx", String(current.x));
    dragDot.current?.setAttribute("cy", String(current.y));
  }
  useLayoutEffect(paintGesture, [preview]);

  const lines = geometry.actions.filter(
    (action, index, all) => all.findIndex((a) => sameLine(a, action)) === index,
  );
  const shownBoard = animation?.before ?? board;
  const active = preview?.action ?? returning?.action ?? selected;
  const manualPreview =
    selected && !preview && !returning && !animation && !disabled;
  const symbolBoard = shownBoard.slice();
  if (manualPreview)
    for (const [source, dest] of selected.mapping)
      symbolBoard[dest] = board[source];
  const pad = miniature ? 0.07 : 0.3;
  function coordinates(event: PointerEvent<SVGSVGElement>) {
    const matrix = svg.current?.getScreenCTM();
    if (!matrix) return null;
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse(),
    );
    return { point: { x: p.x, y: p.y }, scale: Math.hypot(matrix.a, matrix.b) };
  }
  function refreshGesture() {
    const state = drag.current;
    if (!state) return;
    state.result = inferFold(geometry, state.start, state.current, state.scale);
    const action = state.result?.action ?? null,
      ready = state.result?.ready ?? false;
    const allowed = state.result?.allowed ?? false;
    const moved =
      Math.hypot(
        state.current.x - state.start.x,
        state.current.y - state.start.y,
      ) *
        state.scale >=
      8;
    setPreview((previous) =>
      previous &&
      previous.action?.id === action?.id &&
      previous.ready === ready &&
      previous.moved === moved &&
      previous.allowed === allowed
        ? previous
        : { action, ready, start: state.start, moved, allowed },
    );
    paintGesture();
  }
  function cancelGesture() {
    const state = drag.current;
    drag.current = null;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (state?.result?.allowed)
      setReturning({
        action: state.result.action,
        progress: state.result.progress,
      });
    setPreview(null);
    if (state && svg.current?.hasPointerCapture(state.pointerId))
      svg.current.releasePointerCapture(state.pointerId);
  }
  function pointerDown(event: PointerEvent<SVGSVGElement>) {
    if (miniature || event.button !== 0 || !event.isPrimary || drag.current)
      return;
    const position = coordinates(event);
    const marker = (event.target as Element).closest("[data-history-step]");
    const historyStep = marker
      ? Number(marker.getAttribute("data-history-step"))
      : undefined;
    if (!position) return;
    const allowDrag = !disabled && pointInsideBoard(geometry, position.point);
    if (!allowDrag && historyStep === undefined) return;
    event.preventDefault();
    setReturning(null);
    if (historyStep === undefined) onSelect?.(null);
    svg.current?.focus({ preventScroll: true });
    svg.current?.setPointerCapture(event.pointerId);
    drag.current = {
      start: position.point,
      current: position.point,
      scale: position.scale,
      pointerId: event.pointerId,
      result: null,
      historyStep,
      allowDrag,
      hasMoved: false,
    };
    if (allowDrag)
      setPreview({
        action: null,
        ready: false,
        start: position.point,
        moved: false,
        allowed: false,
      });
  }
  function pointerMove(event: PointerEvent<SVGSVGElement>) {
    const state = drag.current;
    if (!state || state.pointerId !== event.pointerId) return;
    const position = coordinates(event);
    if (!position) return;
    state.current = position.point;
    state.hasMoved ||=
      Math.hypot(
        state.current.x - state.start.x,
        state.current.y - state.start.y,
      ) *
        state.scale >=
      8;
    if (!state.allowDrag || disabled) return;
    if (!frame.current)
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        refreshGesture();
      });
  }
  function pointerUp(event: PointerEvent<SVGSVGElement>) {
    const state = drag.current;
    if (!state || state.pointerId !== event.pointerId) return;
    const position = coordinates(event);
    if (position) state.current = position.point;
    if (
      state.historyStep !== undefined &&
      !state.hasMoved &&
      Math.hypot(
        state.current.x - state.start.x,
        state.current.y - state.start.y,
      ) *
        state.scale <
        8
    ) {
      cancelGesture();
      onReview?.(state.historyStep);
      return;
    }
    if (!state.allowDrag || disabled) {
      cancelGesture();
      return;
    }
    refreshGesture();
    const result = state.result;
    if (!result?.ready) {
      cancelGesture();
      return;
    }
    drag.current = null;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    setPreview(null);
    setReturning(null);
    if (svg.current?.hasPointerCapture(event.pointerId))
      svg.current.releasePointerCapture(event.pointerId);
    onFold?.(result.action, result.progress);
  }
  const polygon = (id: number, color: number, extra = "fold-cell") => {
    const cell = geometry.cells[id];
    return (
      <polygon
        key={id}
        points={cell.vertices.map((p) => `${p.x},${p.y}`).join(" ")}
        fill={COLORS[color] ?? COLORS[0]}
        className={extra}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    );
  };
  const gestureAction =
    (preview?.allowed ? preview.action : null) ?? returning?.action;
  return (
    <>
      <svg
        ref={svg}
        className={
          miniature
            ? "fold-board-svg fold-miniature"
            : preview
              ? "fold-board-svg fold-grabbing"
              : "fold-board-svg fold-grabbable"
        }
        viewBox={`${-pad} ${-pad} ${geometry.width + pad * 2} ${geometry.height + pad * 2}`}
        aria-label={
          miniature ? "目标图案" : "拖拽折叠棋盘：按住色块，拖过折线后松手"
        }
        role={miniature ? "img" : "group"}
        tabIndex={miniature ? undefined : 0}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={(event) => {
          if (drag.current?.pointerId === event.pointerId) cancelGesture();
        }}
        onLostPointerCapture={(event) => {
          if (drag.current?.pointerId === event.pointerId) cancelGesture();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            cancelGesture();
            onSelect?.(null);
          }
        }}
        onContextMenu={(event) => {
          if (!miniature) event.preventDefault();
        }}
      >
        <title>
          {miniature
            ? "目标图案"
            : "抓住一侧的色块，拖向另一侧。手势决定折线，跨过后松手翻折；按 Escape 取消。"}
        </title>
        <g>{shownBoard.map((color, id) => polygon(id, color))}</g>
        {!preview && !returning && !animation && reviewedCells && (
          <g pointerEvents="none" aria-hidden="true">
            {reviewedCells.map((id) =>
              polygon(id, board[id], "fold-history-cell"),
            )}
          </g>
        )}
        {differences && target && !animation && (
          <g pointerEvents="none">
            {geometry.cells
              .filter((cell) => board[cell.id] !== target[cell.id])
              .map((cell) => (
                <circle
                  key={cell.id}
                  cx={cell.center.x}
                  cy={cell.center.y}
                  r={0.055}
                  className="fold-difference-dot"
                />
              ))}
          </g>
        )}
        {manualPreview && (
          <g pointerEvents="none" className="fold-preview">
            {selected.mapping.map(([source, dest]) =>
              polygon(dest, board[source], "fold-preview-cell"),
            )}
          </g>
        )}
        {symbols && (
          <g className="fold-symbols" pointerEvents="none">
            {geometry.cells.map((cell) => (
              <text
                key={cell.id}
                x={cell.center.x}
                y={cell.center.y}
                fontSize={miniature ? 0.18 : 0.2}
                dominantBaseline="central"
                textAnchor="middle"
              >
                {SYMBOLS[symbolBoard[cell.id]]}
              </text>
            ))}
          </g>
        )}
        {gestureAction && (
          <g
            ref={gestureMoving}
            className="fold-gesture-moving"
            data-action={gestureAction.id}
            pointerEvents="none"
          >
            {gestureAction.source.map((id) => polygon(id, board[id]))}
            {symbols && (
              <g className="fold-symbols">
                {gestureAction.source.map((id) => (
                  <text
                    key={id}
                    x={geometry.cells[id].center.x}
                    y={geometry.cells[id].center.y}
                    fontSize={0.2}
                    dominantBaseline="central"
                    textAnchor="middle"
                  >
                    {SYMBOLS[board[id]]}
                  </text>
                ))}
              </g>
            )}
          </g>
        )}
        {!miniature && (
          <g className="fold-lines" pointerEvents="none">
            {lines.map((action) => (
              <line
                key={action.id}
                data-fold={action.id}
                x1={action.line[0].x}
                y1={action.line[0].y}
                x2={action.line[1].x}
                y2={action.line[1].y}
                className={
                  active && sameLine(active, action)
                    ? "fold-line fold-line-selected"
                    : "fold-line"
                }
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        )}
        {history && history.length > 0 && !animation && (
          <FoldHistoryOverlay
            steps={history}
            viewedStep={viewedStep}
            geometry={geometry}
          />
        )}
        {preview && (
          <g
            className="fold-drag-guide"
            pointerEvents="none"
            clipPath={`url(#${guideClip})`}
          >
            <defs>
              <clipPath id={guideClip}>
                <rect width={geometry.width} height={geometry.height} />
              </clipPath>
            </defs>
            {preview.action && (
              <>
                <line
                  ref={bisectorGuide}
                  className="fold-bisector-guide"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  ref={midpointGuide}
                  r={0.065}
                  className="fold-bisector-midpoint"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}
            <line
              ref={dragTrail}
              x1={preview.start.x}
              y1={preview.start.y}
              x2={preview.start.x}
              y2={preview.start.y}
              className="fold-drag-trail"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={preview.start.x}
              cy={preview.start.y}
              r={0.07}
              className="fold-drag-origin"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              ref={dragDot}
              cx={preview.start.x}
              cy={preview.start.y}
              r={0.1}
              className="fold-drag-finger"
              vectorEffect="non-scaling-stroke"
            />
            {preview.action && preview.allowed && (
              <circle
                ref={landingDot}
                r={0.13}
                className="fold-drag-landing"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        )}
        {animation && (
          <g ref={moving} className="fold-moving" pointerEvents="none">
            {animation.action.source.map((id) =>
              polygon(id, animation.before[id]),
            )}
          </g>
        )}
      </svg>
      {preview && (
        <div
          className={
            preview.ready
              ? "fold-gesture-label fold-gesture-ready"
              : "fold-gesture-label"
          }
          role="status"
        >
          {preview.action ? (
            <>
              <span>{preview.action.label}</span>
              <b>
                {!preview.allowed
                  ? "这条折线不能向这一侧折"
                  : preview.ready
                    ? "松手翻折"
                    : "继续拖过折线"}
              </b>
            </>
          ) : (
            <span>
              {preview.moved
                ? "继续拖动，匹配最近的折线"
                : "拖动落点，用中垂线选择折线"}
            </span>
          )}
        </div>
      )}
    </>
  );
}
