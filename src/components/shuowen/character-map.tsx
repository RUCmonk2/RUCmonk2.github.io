"use client";

import {
  ArrowUpRight,
  Maximize,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { characterById, shuowenCharacters, themes } from "@/data/shuowen";
import { shuowenEdges } from "@/data/shuowen/relations";
import type { CharacterEdge, CharacterEntry } from "@/data/shuowen/types";

import {
  boundPosition,
  clusterCenters,
  createCharacterLayout,
  MAP_HEIGHT,
  MAP_WIDTH,
  type Position,
} from "./layout";
import { ScholarlyText } from "./scholarly-text";

type Gesture = {
  id: number;
  x: number;
  y: number;
  px: number;
  py: number;
  nodeId: string | null;
  moved: boolean;
  origin: Position;
};
export function CharacterMap({
  selected,
  visibleIds,
  relationType,
  onSelect,
}: {
  selected: string;
  visibleIds: Set<string>;
  relationType: string;
  onSelect: (id: string) => void;
}) {
  const physics = useMemo(() => createCharacterLayout(shuowenCharacters), []);
  const [positions, setPositions] = useState(physics.initial);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [edge, setEdge] = useState<CharacterEdge | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const activeEdges = shuowenEdges.filter(
    (item) =>
      (relationType === "all" || item.type === relationType) &&
      visibleIds.has(item.source) &&
      visibleIds.has(item.target),
  );
  const connected = new Set(
    activeEdges
      .filter((item) => item.source === selected || item.target === selected)
      .flatMap((item) => [item.source, item.target]),
  );
  const preview = hovered ? characterById.get(hovered) : null;
  useEffect(() => {
    physics.simulation.on("tick", () => setPositions(physics.snapshot()));
    return () => {
      physics.simulation.stop().on("tick", null);
    };
  }, [physics]);
  useEffect(() => {
    setEdge(null);
    setHovered(null);
  }, [selected, relationType, visibleIds]);
  useEffect(() => {
    if (window.matchMedia("(max-width: 600px)").matches) {
      const point = physics.initial[selected];
      setZoom(1.8);
      setPan({ x: MAP_WIDTH / 2 - point.x, y: MAP_HEIGHT / 2 - point.y });
    }
  }, [selected, physics]);

  function start(event: PointerEvent<SVGSVGElement>, nodeId: string | null) {
    if (event.button !== 0) return;
    svgRef.current?.setPointerCapture(event.pointerId);
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      px: pan.x,
      py: pan.y,
      nodeId,
      moved: false,
      origin: nodeId ? positions[nodeId] : pan,
    };
    setHovered(null);
  }
  function move(event: PointerEvent<SVGSVGElement>) {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    const box = svgRef.current!.getBoundingClientRect();
    const scale = MAP_WIDTH / box.width / zoom;
    const dx = (event.clientX - drag.x) * scale;
    const dy = (event.clientY - drag.y) * scale;
    if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 5)
      drag.moved = true;
    if (drag.nodeId && drag.moved) {
      const point = boundPosition({
        x: drag.origin.x + dx,
        y: drag.origin.y + dy,
      });
      const node = physics.byId.get(drag.nodeId)!;
      node.x = point.x;
      node.y = point.y;
      node.fx = point.x;
      node.fy = point.y;
      setPositions(physics.snapshot());
    } else if (!drag.nodeId && drag.moved) {
      setPan({
        x: Math.max(-MAP_WIDTH, Math.min(MAP_WIDTH, drag.px + dx)),
        y: Math.max(-MAP_HEIGHT, Math.min(MAP_HEIGHT, drag.py + dy)),
      });
    }
  }
  function finish(event: PointerEvent<SVGSVGElement>) {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    gesture.current = null;
    if (svgRef.current?.hasPointerCapture(event.pointerId))
      svgRef.current.releasePointerCapture(event.pointerId);
    if (!drag.moved && drag.nodeId) onSelect(drag.nodeId);
  }
  function focusSelected() {
    const point = positions[selected];
    setZoom(1.7);
    setPan({ x: MAP_WIDTH / 2 - point.x, y: MAP_HEIGHT / 2 - point.y });
  }
  return (
    <div className="sw-map-wrap">
      <div className="sw-map-note">
        <span>字字相连 · 循线而读</span>
        <label>
          <input
            type="checkbox"
            checked={showAll}
            onChange={(event) => setShowAll(event.target.checked)}
          />
          全部连线
        </label>
      </div>
      <svg
        ref={svgRef}
        className="sw-map"
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        role="group"
        aria-label="七十二字义理关系图，可选择汉字、拖动节点和画布，或用按钮缩放"
        onPointerDown={(event) => {
          const target = (event.target as Element).closest("[data-node]");
          if ((event.target as Element).closest("[data-edge]")) return;
          start(event, target?.getAttribute("data-node") || null);
        }}
        onPointerMove={move}
        onPointerUp={finish}
        onPointerCancel={() => {
          gesture.current = null;
        }}
      >
        <g
          transform={`translate(${MAP_WIDTH / 2} ${MAP_HEIGHT / 2}) scale(${zoom}) translate(${-MAP_WIDTH / 2 + pan.x} ${-MAP_HEIGHT / 2 + pan.y})`}
        >
          {themes.map((theme, index) => (
            <g
              className="sw-map-cluster"
              key={theme.id}
              opacity={
                shuowenCharacters.some(
                  (entry) =>
                    entry.theme === theme.id && visibleIds.has(entry.id),
                )
                  ? 1
                  : 0.2
              }
            >
              <circle
                cx={clusterCenters[index].x}
                cy={clusterCenters[index].y}
                r={124}
                fill={theme.color}
                opacity=".035"
              />
              <text
                x={clusterCenters[index].x}
                y={clusterCenters[index].y + 6}
                textAnchor="middle"
                fill={theme.color}
              >
                {theme.short}
              </text>
            </g>
          ))}
          {activeEdges.map((item) => {
            const source = positions[item.source];
            const target = positions[item.target];
            const active = item.source === selected || item.target === selected;
            if (!showAll && !active) return null;
            const d = `M ${source.x},${source.y} Q ${(source.x + target.x) / 2 + 15},${(source.y + target.y) / 2 - 12} ${target.x},${target.y}`;
            return (
              <g
                key={item.id}
                data-edge={item.id}
                className={`sw-edge sw-edge-${item.type} ${active ? "is-active" : ""}`}
                role="button"
                tabIndex={active ? 0 : -1}
                aria-label={`${characterById.get(item.source)?.char}与${characterById.get(item.target)?.char}：${item.label}，查看关系依据`}
                onClick={() => setEdge(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setEdge(item);
                  }
                }}
              >
                <path d={d} className="sw-edge-hit" />
                <path d={d} className="sw-edge-line" />
              </g>
            );
          })}
          {shuowenCharacters.map((entry) => {
            const point = positions[entry.id];
            const active = entry.id === selected;
            const visible = visibleIds.has(entry.id);
            const related = connected.has(entry.id);
            const theme = themes.find((item) => item.id === entry.theme)!;
            return (
              <g
                key={entry.id}
                data-node={entry.id}
                className={`sw-node ${active ? "is-selected" : ""} ${related ? "is-related" : ""}`}
                transform={`translate(${point.x},${point.y})`}
                style={
                  {
                    "--node-color": theme.color,
                    opacity: visible ? 1 : 0.13,
                  } as CSSProperties
                }
                role="button"
                tabIndex={visible ? 0 : -1}
                aria-pressed={active}
                onClick={(event) => {
                  if (event.detail === 0) onSelect(entry.id);
                }}
                aria-label={`${entry.char}，${entry.pinyin}，${entry.subtitle}`}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" && !gesture.current)
                    setHovered(entry.id);
                }}
                onPointerLeave={() => setHovered(null)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(entry.id);
                  }
                }}
              >
                <circle className="sw-node-halo" r={active ? 29 : 25} />
                <circle className="sw-node-ring" r={active ? 25 : 21} />
                <text
                  className="sw-node-char"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {entry.char}
                </text>
                {active && (
                  <text className="sw-node-current" y="43" textAnchor="middle">
                    正在读
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      {preview && preview.id !== selected && (
        <div className="sw-hover-card" aria-hidden="true">
          <b>{preview.char}</b>
          <div>
            <span>{preview.pinyin}</span>
            <p>{preview.subtitle}</p>
          </div>
        </div>
      )}
      {edge && (
        <aside className="sw-edge-card" aria-live="polite">
          <button
            className="sw-icon-button sw-close"
            onClick={() => setEdge(null)}
            aria-label="关闭关系说明"
          >
            <X size={16} />
          </button>
          <span className="sw-kicker">
            {edge.type === "text"
              ? "原典关联"
              : edge.type === "contrast"
                ? "概念对读"
                : "主题导读"}
          </span>
          <h3>
            {characterById.get(edge.source)?.char}
            <span> · {edge.label} · </span>
            {characterById.get(edge.target)?.char}
          </h3>
          <p>{edge.explanation}</p>
          {edge.sourceUrl && (
            <a href={edge.sourceUrl} target="_blank" rel="noreferrer">
              查阅原典 <ArrowUpRight size={12} />
            </a>
          )}
        </aside>
      )}
      <div className="sw-map-bottom">
        <p>点击读字 · 拖动游览 · 点线看依据</p>
        <div className="sw-map-controls">
          <button
            onClick={() => setZoom((value) => Math.max(0.65, value - 0.2))}
            aria-label="缩小图谱"
          >
            <Minus size={16} />
          </button>
          <output aria-label="缩放比例">{Math.round(zoom * 100)}%</output>
          <button
            onClick={() => setZoom((value) => Math.min(2.8, value + 0.2))}
            aria-label="放大图谱"
          >
            <Plus size={16} />
          </button>
          <button onClick={focusSelected} aria-label="定位当前字">
            <Maximize size={15} />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
              setPositions(physics.reset());
              setEdge(null);
            }}
            aria-label="重置图谱"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FormationMap({
  entry,
  onSelect,
}: {
  entry: CharacterEntry;
  onSelect: (id: string) => void;
}) {
  const [detail, setDetail] = useState<number | null>(null);
  useEffect(() => setDetail(null), [entry.id]);
  const parts = entry.components;
  const activePart = detail === null ? undefined : parts[detail];
  const structureChar =
    entry.id === "ming-light"
      ? "朙"
      : entry.traditional.includes("／")
        ? entry.char
        : entry.traditional;
  const nextPart = activePart
    ? shuowenCharacters.find(
        (item) =>
          item.id !== entry.id &&
          (item.char === activePart.char ||
            item.traditional === activePart.char),
      )
    : undefined;
  return (
    <div className="sw-formation-map">
      <div className="sw-map-note">
        <span>读其形 · 辨其义</span>
        <span>字形关系</span>
      </div>
      <svg
        viewBox="0 0 760 470"
        role="group"
        aria-label={`${entry.char}字构形关系示意`}
      >
        <circle
          cx="380"
          cy="228"
          r="175"
          fill="none"
          stroke="currentColor"
          opacity=".09"
          strokeDasharray="3 9"
        />
        <circle cx="380" cy="228" r="75" className="sw-formation-center" />
        <text
          x="380"
          y="232"
          dominantBaseline="central"
          textAnchor="middle"
          className="sw-formation-char"
        >
          {structureChar}
        </text>
        {parts.map((part, index) => {
          const angle =
            parts.length === 1 ? 0 : (index / parts.length) * Math.PI * 2;
          const x = 380 + Math.cos(angle) * 212;
          const y = 228 + Math.sin(angle) * 152;
          return (
            <g
              key={`${part.char}-${index}`}
              className={`sw-component-node ${part.role === "声旁" ? "is-sound" : ""}`}
              pointerEvents="bounding-box"
              role="button"
              tabIndex={0}
              aria-label={`${part.char}，${part.role}，查看构形说明`}
              onClick={() => setDetail(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setDetail(index);
                }
              }}
            >
              <line
                x1={380 + Math.cos(angle) * 78}
                y1={228 + Math.sin(angle) * 78}
                x2={x}
                y2={y}
              />
              <circle cx={x} cy={y} r="43" />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {part.char}
              </text>
              <text
                className="sw-component-role"
                x={x}
                y={y + 68}
                textAnchor="middle"
              >
                {part.role}
              </text>
            </g>
          );
        })}
        {!parts.length && (
          <text x="380" y="365" textAnchor="middle" className="sw-no-parts">
            此字不作机械拆分 · 请结合字形资料阅读
          </text>
        )}
      </svg>
      <div className="sw-formation-caption">
        <span className="sw-kicker">{activePart?.role || "构形说明"}</span>
        <p>
          <ScholarlyText text={activePart?.explanation || entry.formation} />
        </p>
        {nextPart && (
          <button onClick={() => onSelect(nextPart.id)}>
            接着读「{nextPart.char}」<ArrowUpRight size={13} />
          </button>
        )}
        <small>
          据条目所列释形绘制的结构示意。形旁、声旁分别标记；位置不表示字形演变先后。
        </small>
      </div>
    </div>
  );
}
