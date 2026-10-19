"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { aiDomainLinks, aiDomains } from "@/data/ai-atlas";
import type { AINode } from "@/data/ai-atlas/types";

import { conceptLayout, connector, wrapLabel } from "./layout";

export function KnowledgeMap({
  nodes,
  overview,
  selected,
  locale,
  allLinks,
  onDomain,
  onSelect,
}: {
  nodes: readonly AINode[];
  overview: boolean;
  selected: string | null;
  locale: "zh" | "en";
  allLinks: boolean;
  onDomain: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const en = locale === "en",
    marker = useId().replaceAll(":", "");
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    cx: number;
    cy: number;
    moved: boolean;
  } | null>(null);
  const [width, setWidth] = useState(900);
  const positions = useMemo(
    () =>
      overview
        ? aiDomains.map((d) => ({ id: d.id, ...d.center }))
        : conceptLayout(nodes),
    [nodes, overview],
  );
  const positionsById = new Map(positions.map((p) => [p.id, p]));
  const w = overview ? 1660 : Math.max(660, ...positions.map((p) => p.x + 160));
  const h = overview ? 1150 : Math.max(560, ...positions.map((p) => p.y + 150));
  const minHeight = overview ? 650 : 610;
  const height = Math.max(minHeight, Math.min(900, (width * h) / w));
  const minimumZoom = width < 550 ? Math.max(1, 0.52 / (width / w)) : 0.75;
  const maximumZoom = Math.max(2.8, minimumZoom * 2);
  const resetCamera = () => {
    const zoom = Math.max(1, minimumZoom);
    const point =
      width < 550 && selected ? positionsById.get(selected) : undefined;
    setCamera({
      x: point ? (w / 2 - point.x) * zoom : 0,
      y: point ? (h / 2 - point.y) * zoom : 0,
      zoom,
    });
  };
  const baseScale = Math.min(width / w, height / h);
  const effectiveScale = baseScale * camera.zoom;
  const font = Math.max(overview ? 26 : 21, 13 / effectiveScale);
  const signature = overview ? "overview" : nodes.map((n) => n.id).join(",");
  useEffect(() => {
    resetCamera();
  }, [signature, minimumZoom]);
  useEffect(() => {
    if (!svg.current) return;
    const observer = new ResizeObserver((entries) =>
      setWidth(entries[0].contentRect.width),
    );
    observer.observe(svg.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    const wheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setCamera((c) => ({
        ...c,
        zoom: Math.max(
          minimumZoom,
          Math.min(maximumZoom, c.zoom * Math.exp(-e.deltaY * 0.002)),
        ),
      }));
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [minimumZoom, maximumZoom]);
  function zoom(factor: number) {
    setCamera((c) => ({
      ...c,
      zoom: Math.max(minimumZoom, Math.min(maximumZoom, c.zoom * factor)),
    }));
  }
  const edges = overview
    ? aiDomainLinks.map(([source, target]) => ({ source, target }))
    : nodes.flatMap((n) =>
        n.prerequisites
          .filter((id) => positionsById.has(id))
          .map((source) => ({ source, target: n.id })),
      );
  return (
    <div className="ai-map-frame">
      <div className="ai-map-caption">
        <span>
          {overview
            ? en
              ? "14 CONNECTED FIELDS"
              : "14 个领域 · 点击进入子图"
            : en
              ? `${nodes.length} CONCEPTS · SUGGESTED PREREQUISITES`
              : `${nodes.length} 个知识点 · 箭头表示建议先修`}
        </span>
        <span>{en ? "Drag to explore" : "拖动探索"}</span>
      </div>
      <svg
        ref={svg}
        viewBox={`0 0 ${w} ${h}`}
        style={{ height }}
        className="ai-network"
        role="group"
        aria-label={
          overview
            ? en
              ? "AI subject overview"
              : "人工智能领域总图"
            : en
              ? "Concept prerequisite network"
              : "知识先修关系网络"
        }
        onPointerDown={(e) => {
          if (
            e.button !== 0 ||
            (e.target as Element).closest('[role="button"]')
          )
            return;
          drag.current = {
            x: e.clientX,
            y: e.clientY,
            cx: camera.x,
            cy: camera.y,
            moved: false,
          };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x,
            dy = e.clientY - drag.current.y;
          if (Math.hypot(dx, dy) > 4) drag.current.moved = true;
          if (drag.current.moved)
            setCamera((c) => ({
              ...c,
              x: drag.current!.cx + dx / baseScale,
              y: drag.current!.cy + dy / baseScale,
            }));
        }}
        onPointerUp={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <defs>
          <marker
            id={marker}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10Z" fill="currentColor" />
          </marker>
        </defs>
        <g
          transform={`translate(${w / 2 + camera.x},${h / 2 + camera.y}) scale(${camera.zoom}) translate(${-w / 2},${-h / 2})`}
        >
          {edges
            .filter(
              (e) =>
                overview ||
                allLinks ||
                e.source === selected ||
                e.target === selected,
            )
            .map((e) => (
              <path
                key={`${e.source}:${e.target}`}
                d={connector(
                  positionsById.get(e.source)!,
                  positionsById.get(e.target)!,
                  overview ? 70 : 0,
                )}
                className={`ai-network-edge ${!overview && (e.source === selected || e.target === selected) ? "is-near" : ""}`}
                markerEnd={overview ? undefined : `url(#${marker})`}
              />
            ))}
          {positions.map((p, index) => {
            const domain = overview
              ? aiDomains.find((d) => d.id === p.id)!
              : aiDomains.find(
                  (d) => d.id === nodes.find((n) => n.id === p.id)!.domain,
                )!;
            const node = nodes.find((n) => n.id === p.id);
            const title = overview ? domain.title[locale] : node!.title[locale];
            const lines = wrapLabel(title, locale);
            const activate = () => {
              if (drag.current?.moved) {
                drag.current = null;
                return;
              }
              drag.current = null;
              if (overview) onDomain(p.id);
              else onSelect(p.id);
            };
            return (
              <g
                key={p.id}
                className={`ai-network-node ${overview ? "is-domain" : "is-concept"} ${selected === p.id ? "is-selected" : ""}`}
                transform={`translate(${p.x},${p.y})`}
                role="button"
                tabIndex={0}
                aria-label={title}
                aria-pressed={!overview ? selected === p.id : undefined}
                onClick={activate}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    drag.current = null;
                    if (overview) onDomain(p.id);
                    else onSelect(p.id);
                  }
                }}
              >
                <title>{title}</title>
                {overview ? (
                  <>
                    <circle r="52" className="ai-domain-halo" />
                    <circle r="41" />
                    <text
                      className="ai-domain-symbol"
                      textAnchor="middle"
                      y="10"
                      fontSize="30"
                    >
                      {domain.symbol}
                    </text>
                    {lines.map((line, i) => (
                      <text
                        key={i}
                        textAnchor="middle"
                        y={82 + i * 30}
                        fontSize={font}
                      >
                        {line}
                      </text>
                    ))}
                    <text
                      className="ai-node-count"
                      textAnchor="middle"
                      y={lines.length > 1 ? 146 : 120}
                      fontSize="18"
                    >
                      {nodes.filter((n) => n.domain === p.id).length}{" "}
                      {en ? "concepts" : "个知识点"}
                    </text>
                  </>
                ) : (
                  <>
                    <rect x="-130" y="-55" width="260" height="110" rx="5" />
                    <text
                      className="ai-node-order"
                      x="-108"
                      y="-42"
                      fontSize="14"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </text>
                    {lines.map((line, i) => (
                      <text
                        key={i}
                        textAnchor="middle"
                        y={
                          lines.length === 1
                            ? 13
                            : 3 + (i - (lines.length - 1) / 2) * (font + 5)
                        }
                        fontSize={font}
                      >
                        {line}
                      </text>
                    ))}
                  </>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      <div
        className="ai-map-zoom"
        role="group"
        aria-label={en ? "Map controls" : "地图控制"}
      >
        <button
          onClick={() => zoom(1 / 1.25)}
          aria-label={en ? "Zoom out" : "缩小"}
        >
          <Minus size={16} />
        </button>
        <button
          onClick={resetCamera}
          aria-label={en ? "Reset view" : "重置视图"}
        >
          <RotateCcw size={14} />
        </button>
        <button onClick={() => zoom(1.25)} aria-label={en ? "Zoom in" : "放大"}>
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
