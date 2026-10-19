"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  Link2,
  List,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  constrainShanhaiPosition,
  createShanhaiPhysics,
} from "@/components/shanhai/layout";
import { ShanhaiArtworkPane } from "@/components/shanhai/shanhai-artwork";
import {
  type ShanhaiCategory,
  shanhaiEdges,
  type ShanhaiNode,
  shanhaiNodes,
  shanhaiRoutes,
} from "@/data/shanhai";

const categories: { id: ShanhaiCategory; label: string; color: string }[] = [
  { id: "mountain", label: "山岳", color: "#777e61" },
  { id: "water", label: "水域", color: "#587e84" },
  { id: "creature", label: "异兽", color: "#a8684e" },
  { id: "plant", label: "草木", color: "#6d876c" },
  { id: "deity", label: "神话人物", color: "#8c7184" },
];
const byId = new Map(shanhaiNodes.map((node) => [node.id, node]));
const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f\s]/g, "")
    .toLowerCase();
const color = (node: ShanhaiNode) =>
  categories.find((item) => item.id === node.category)!.color;
const defaultNode =
  shanhaiNodes.find((node) => node.name === "九尾狐") || shanhaiNodes[0];
const tabs = [
  { id: "map", label: "山海图谱", icon: Compass },
  { id: "index", label: "万物索引", icon: List },
  { id: "routes", label: "循迹读经", icon: BookOpen },
] as const;
type View = (typeof tabs)[number]["id"];
type MapGesture = {
  pointerId: number;
  nodeId: string | null;
  x: number;
  y: number;
  px: number;
  py: number;
  gx: number;
  gy: number;
  nx: number;
  ny: number;
  moved: boolean;
};

export function ShanhaiAtlas({ en = false }: { en?: boolean }) {
  const physics = useMemo(
    () => createShanhaiPhysics(shanhaiNodes, shanhaiEdges),
    [],
  );
  const [positions, setPositions] = useState(physics.initial);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [previewedNode, setPreviewedNode] = useState<string | null>(null);
  const [previewCard, setPreviewCard] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selected, setSelected] = useState(defaultNode.id);
  const [view, setView] = useState<View>("map");
  const [category, setCategory] = useState<ShanhaiCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [routeId, setRouteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareFallback, setShareFallback] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);
  const readerRef = useRef<HTMLElement>(null);
  const drag = useRef<MapGesture | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const hoverLock = useRef<{ x: number; y: number } | null>(null);
  const node = byId.get(previewedNode || selected) || defaultNode;
  const activeRoute = shanhaiRoutes.find((route) => route.id === routeId);
  const routeIndex = activeRoute?.nodes.indexOf(node.id) ?? -1;
  const related = shanhaiEdges.filter(
    (edge) => edge.source === node.id || edge.target === node.id,
  );
  const relatedIds = new Set(
    related.flatMap((edge) => [edge.source, edge.target]),
  );
  const results = useMemo(
    () =>
      shanhaiNodes
        .filter(
          (item) =>
            (category === "all" || item.category === category) &&
            normalizeSearch(
              `${item.name} ${item.pinyin} ${item.chapter} ${item.translation}`,
            ).includes(normalizeSearch(query)),
        )
        .sort(
          (a, b) =>
            Number(b.name.includes(query.trim())) -
            Number(a.name.includes(query.trim())),
        ),
    [category, query],
  );
  const visibleIds = new Set(results.map((item) => item.id));

  useEffect(() => {
    physics.simulation.on("tick", () => setPositions(physics.snapshot()));
    return () => {
      physics.simulation.on("tick", null).stop();
      if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    };
  }, [physics]);

  useEffect(() => {
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    setHoveredNode(null);
    setPreviewedNode(null);
    setPreviewCard(null);
  }, [view, category, query, zoom]);

  useEffect(() => {
    const readHash = () => {
      let id = "";
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (byId.has(id) || !id) {
        if (hoverTimer.current !== null)
          window.clearTimeout(hoverTimer.current);
        hoverTimer.current = null;
        setHoveredNode(null);
        setPreviewedNode(null);
        setPreviewCard(null);
        const entry = byId.get(id) || defaultNode;
        const position = physics.byId.get(entry.id)!;
        const mobile = window.matchMedia("(max-width: 650px)").matches;
        setSelected(entry.id);
        setView("map");
        setCategory("all");
        setQuery("");
        setPan(
          mobile
            ? { x: position.x - 550, y: position.y - 370 }
            : { x: 0, y: 0 },
        );
        setZoom(mobile ? 1.6 : 1);
      }
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
    };
  }, [physics]);
  useEffect(() => {
    readerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [node.id]);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function cancelPreview() {
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    setHoveredNode(null);
    setPreviewedNode(null);
    setPreviewCard(null);
  }
  function preview(id: string, event: PointerEvent<SVGGElement>) {
    cancelPreview();
    if (
      event.pointerType !== "mouse" ||
      event.buttons !== 0 ||
      drag.current ||
      id === selected
    )
      return;
    if (hoverLock.current) {
      if (
        Math.hypot(
          event.clientX - hoverLock.current.x,
          event.clientY - hoverLock.current.y,
        ) < 6
      )
        return;
      hoverLock.current = null;
    }
    const pointer = { x: event.clientX, y: event.clientY };
    setHoveredNode(id);
    hoverTimer.current = window.setTimeout(() => {
      hoverTimer.current = null;
      setHoveredNode(null);
      setPreviewedNode(id);
      const reader = readerRef.current?.getBoundingClientRect();
      if (
        !reader ||
        reader.top > window.innerHeight - 180 ||
        reader.bottom < 180
      ) {
        setPreviewCard({
          x: Math.max(12, Math.min(window.innerWidth - 252, pointer.x + 18)),
          y: Math.max(12, Math.min(window.innerHeight - 208, pointer.y - 70)),
        });
      }
      setShareFallback("");
      setCopied(false);
    }, 650);
  }
  function select(id: string, reveal = false) {
    if (!byId.has(id)) return;
    cancelPreview();
    setSelected(id);
    setShareFallback("");
    if (window.location.hash !== `#${encodeURIComponent(id)}`) {
      window.history.pushState(null, "", `#${encodeURIComponent(id)}`);
    }
    if (reveal) {
      setView("map");
      setQuery("");
      setCategory("all");
      setPan({ x: 0, y: 0 });
      setZoom(1);
    }
    if (window.matchMedia("(max-width: 650px)").matches) {
      const entry = physics.byId.get(id)!;
      setZoom(1.6);
      setPan({ x: entry.x - 550, y: entry.y - 370 });
      window.requestAnimationFrame(() =>
        readerRef.current?.scrollIntoView({
          block: "start",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        }),
      );
    }
  }
  function startRoute(id: string) {
    const route = shanhaiRoutes.find((item) => item.id === id)!;
    setRouteId(id);
    select(route.nodes[0], true);
  }
  function reset() {
    cancelPreview();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }
  function graphPoint(event: PointerEvent<SVGSVGElement>) {
    const svg = event.currentTarget;
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(matrix.inverse());
  }
  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function pointerDown(event: PointerEvent<SVGSVGElement>) {
    cancelPreview();
    if (event.button !== 0 || !event.isPrimary || drag.current) return;
    const point = graphPoint(event);
    if (!point) return;
    const nodeId =
      (event.target as Element)
        .closest("[data-node-id]")
        ?.getAttribute("data-node-id") || null;
    const position = nodeId ? physics.byId.get(nodeId) : null;
    drag.current = {
      pointerId: event.pointerId,
      nodeId,
      x: event.clientX,
      y: event.clientY,
      px: pan.x,
      py: pan.y,
      gx: point.x,
      gy: point.y,
      nx: position?.x || 0,
      ny: position?.y || 0,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function pointerMove(event: PointerEvent<SVGSVGElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.pointerId !== event.pointerId || !svgRef.current)
      return;
    if (!gesture.moved) {
      const distance = Math.hypot(
        event.clientX - gesture.x,
        event.clientY - gesture.y,
      );
      if (distance < (event.pointerType === "touch" ? 8 : 5)) return;
      gesture.moved = true;
      if (gesture.nodeId) {
        setDraggedNode(gesture.nodeId);
        if (!reducedMotion())
          physics.simulation.alpha(0.5).alphaTarget(0.15).restart();
      }
    }
    if (gesture.nodeId) {
      const point = graphPoint(event);
      if (!point) return;
      const position = constrainShanhaiPosition({
        x: gesture.nx + point.x - gesture.gx,
        y: gesture.ny + point.y - gesture.gy,
      });
      const entry = physics.byId.get(gesture.nodeId)!;
      entry.x = entry.fx = position.x;
      entry.y = entry.fy = position.y;
      entry.vx = entry.vy = 0;
      setPositions(physics.snapshot());
      return;
    }
    const bounds = svgRef.current.getBoundingClientRect();
    const scale = Math.max(
      1100 / zoom / bounds.width,
      740 / zoom / bounds.height,
    );
    setPan({
      x: Math.max(
        -900,
        Math.min(900, gesture.px - (event.clientX - gesture.x) * scale),
      ),
      y: Math.max(
        -600,
        Math.min(600, gesture.py - (event.clientY - gesture.y) * scale),
      ),
    });
  }
  function pointerEnd(event: PointerEvent<SVGSVGElement>, cancelled = false) {
    const gesture = drag.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    drag.current = null;
    setDraggedNode(null);
    if (gesture.moved)
      hoverLock.current = { x: event.clientX, y: event.clientY };
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (!gesture.nodeId) return;
    if (gesture.moved) {
      const entry = physics.byId.get(gesture.nodeId)!;
      entry.fx = entry.fy = null;
      if (reducedMotion()) setPositions(physics.settle());
      else physics.simulation.alpha(0.4).alphaTarget(0).restart();
    } else if (!cancelled) {
      select(gesture.nodeId);
    }
  }
  async function share() {
    const url = `${window.location.origin}${window.location.pathname}#${node.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setShareFallback(url);
    }
  }

  return (
    <main className="shanhai-page" lang="zh-CN">
      <div className="shanhai-shell">
        <div className="shanhai-topline">
          <Link href={en ? "/en/learning/" : "/learning/"}>
            <ArrowLeft size={13} />
            {en ? "Back to learning" : "返回学习"}
          </Link>
          <span>
            一部古书的数字漫游 <i /> A JOURNEY THROUGH SHANHAIJING
          </span>
        </div>
        <header className="shanhai-intro">
          <div className="shanhai-title-group">
            <span className="shanhai-seal" aria-hidden="true">
              山海
              <br />
              拾遗
            </span>
            <div>
              <p className="shanhai-eyebrow">山川有迹 · 万物有灵</p>
              <h1>
                {en ? "Shanhaijing" : "山海经"}
                <span>万物相连，山海可游。</span>
              </h1>
              <p className="shanhai-lede">
                从一座山，遇见一只异兽。沿着古人的文字，走进山海之间。
              </p>
            </div>
          </div>
          <div className="shanhai-intro-aside">
            <span>读其文 · 观其物 · 循其迹</span>
            <p>
              <b>{String(shanhaiNodes.length).padStart(2, "0")}</b> 则条目 <i />{" "}
              <b>03</b> 条阅读路径
            </p>
            <small>
              {en
                ? "Original texts and reading notes in Chinese"
                : "据传世文本选编 · 非全书图谱"}
            </small>
          </div>
        </header>
        <div className="shanhai-viewbar">
          <nav aria-label="阅读视图">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                aria-pressed={view === id}
                className={view === id ? "is-active" : ""}
              >
                <Icon size={16} />
                {label}
                {id === "index" && <small>{shanhaiNodes.length}</small>}
              </button>
            ))}
          </nav>
          <span>
            展开一卷，游于物外 <ArrowDown size={13} />
          </span>
        </div>
        <div className="shanhai-workspace">
          <section className="shanhai-explorer" aria-label="探索山海经">
            {view !== "routes" && (
              <div className="shanhai-toolbar">
                <div className="shanhai-filters" aria-label="条目分类">
                  <button
                    aria-pressed={category === "all"}
                    onClick={() => setCategory("all")}
                  >
                    万物
                  </button>
                  {categories.map((item) => (
                    <button
                      key={item.id}
                      style={{ "--node-color": item.color } as CSSProperties}
                      aria-pressed={category === item.id}
                      onClick={() => setCategory(item.id)}
                    >
                      <i />
                      {item.label}
                    </button>
                  ))}
                </div>
                <label className="shanhai-search">
                  <Search size={15} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="寻山 · 访兽 · 搜索"
                    aria-label="搜索条目"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} aria-label="清除搜索">
                      <X size={13} />
                    </button>
                  )}
                </label>
              </div>
            )}
            {view === "map" && (
              <div className="shanhai-map">
                <div className="shanhai-map-caption" aria-hidden="true">
                  <span>山 海 之 间</span>
                  <small>万物相生，循线而行</small>
                </div>
                {query.trim() && (
                  <div className="shanhai-search-results" aria-live="polite">
                    <span>找到 {results.length} 则条目</span>
                    {results.slice(0, 6).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => select(item.id, true)}
                      >
                        {item.name}
                        <small>{item.chapter}</small>
                        <ArrowUpRight size={13} />
                      </button>
                    ))}
                    {results.length === 0 && (
                      <p>试试“青丘”“九尾狐”或篇目名称。</p>
                    )}
                  </div>
                )}
                <svg
                  ref={svgRef}
                  className="shanhai-graph"
                  role="group"
                  viewBox={`${550 - 550 / zoom + pan.x} ${370 - 370 / zoom + pan.y} ${1100 / zoom} ${740 / zoom}`}
                  aria-label="山海经关系图，鼠标停留预览，点击节点定位；可拖动节点整理关系，拖动画布游览，或用按钮缩放"
                  onPointerDown={pointerDown}
                  onPointerMove={pointerMove}
                  onPointerUp={(event) => pointerEnd(event)}
                  onPointerCancel={(event) => pointerEnd(event, true)}
                  onLostPointerCapture={(event) => pointerEnd(event, true)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") cancelPreview();
                  }}
                >
                  <defs>
                    <filter id="shanhai-ink">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.08"
                        numOctaves="3"
                        result="noise"
                      />
                      <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="2.3"
                      />
                    </filter>
                  </defs>
                  <g className="shanhai-links">
                    {shanhaiEdges.map((edge, i) => {
                      const from = positions[edge.source];
                      const to = positions[edge.target];
                      const active =
                        edge.source === node.id || edge.target === node.id;
                      const visible =
                        visibleIds.has(edge.source) &&
                        visibleIds.has(edge.target);
                      const routeEdge =
                        activeRoute?.nodes.includes(edge.source) &&
                        activeRoute?.nodes.includes(edge.target);
                      return (
                        <g
                          key={`${edge.source}-${edge.target}-${i}`}
                          opacity={visible ? 1 : 0.07}
                          className={`${active ? "is-active" : routeEdge ? "is-route" : ""} ${edge.label.includes("对读") || edge.label.includes("同名") ? "is-comparison" : ""}`}
                        >
                          <path
                            d={`M${from.x},${from.y} Q${(from.x + to.x) / 2 + 12},${(from.y + to.y) / 2 - 18} ${to.x},${to.y}`}
                          />
                          {active && visible && (
                            <text
                              x={(from.x + to.x) / 2 + 6}
                              y={(from.y + to.y) / 2 - 13}
                            >
                              {edge.label}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                  {shanhaiNodes.map((item) => {
                    const active = item.id === node.id;
                    const connected = relatedIds.has(item.id);
                    const visible = visibleIds.has(item.id);
                    const position = positions[item.id];
                    return (
                      <g
                        key={item.id}
                        data-node-id={item.id}
                        role="button"
                        tabIndex={visible ? 0 : -1}
                        aria-hidden={!visible}
                        aria-label={`${item.name}，${categories.find((c) => c.id === item.category)!.label}，阅读条目`}
                        aria-pressed={item.id === selected}
                        className={`shanhai-node ${active ? "is-selected" : ""} ${connected ? "is-connected" : ""} ${draggedNode === item.id ? "is-dragging" : ""} ${hoveredNode === item.id ? "is-preview-pending" : ""}`}
                        style={
                          {
                            "--node-color": color(item),
                            opacity: visible ? 1 : 0.1,
                            pointerEvents: visible ? "auto" : "none",
                          } as CSSProperties
                        }
                        transform={`translate(${position.x} ${position.y})`}
                        onPointerEnter={(event) => preview(item.id, event)}
                        onPointerLeave={cancelPreview}
                        onClick={(event) => {
                          // Pointer gestures select on release, only if they did not drag.
                          // Keep synthetic activation available for assistive technology.
                          if (event.detail === 0) select(item.id);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            select(item.id);
                          }
                        }}
                      >
                        <title>{`${item.name} · ${item.chapter}`}</title>
                        <rect
                          className="shanhai-node-hit"
                          x={-Math.max(29, item.name.length * 12)}
                          y="-29"
                          width={Math.max(58, item.name.length * 24)}
                          height="92"
                          rx="16"
                        />
                        <circle
                          className="shanhai-node-halo"
                          r={active ? 27 : 18}
                        />
                        <circle
                          className="shanhai-node-dot"
                          r={active ? 9 : item.category === "mountain" ? 7 : 5}
                          filter="url(#shanhai-ink)"
                        />
                        {hoveredNode === item.id && (
                          <circle
                            className="shanhai-node-preview"
                            r="22"
                            pathLength="100"
                            aria-hidden="true"
                          />
                        )}
                        <text
                          y={active ? 38 : 28}
                          className="shanhai-node-label"
                        >
                          {item.name}
                        </text>
                        {active && (
                          <text y="55" className="shanhai-node-sub">
                            {previewedNode === item.id
                              ? "悬浮预览 · 点击固定"
                              : "正在阅读"}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                {previewedNode && previewCard && (
                  <aside
                    className="shanhai-hover-card"
                    role="status"
                    aria-label="节点悬浮预览"
                    style={{ left: previewCard.x, top: previewCard.y }}
                  >
                    <Image
                      src={`/images/shanhai/atlas/thumbs/${node.id}.webp`}
                      alt=""
                      width={72}
                      height={72}
                      unoptimized
                    />
                    <div>
                      <small>悬浮预览</small>
                      <strong>{node.name}</strong>
                      <span>{node.chapter}</span>
                    </div>
                    <p>{node.translation}</p>
                    <footer>移开取消 · 点击节点固定阅读</footer>
                  </aside>
                )}
                <div className="shanhai-map-foot">
                  <span>
                    {category === "all" && !query
                      ? "关系示意 · 非地理定位"
                      : `显示 ${results.length} / ${shanhaiNodes.length} 则条目`}
                    <small>停留预览 · 移开取消 · 点击固定</small>
                  </span>
                  <div className="shanhai-map-controls">
                    <button
                      onClick={() => setZoom((z) => Math.max(0.7, z - 0.25))}
                      aria-label="缩小图谱"
                      disabled={zoom <= 0.7}
                    >
                      <Minus size={15} />
                    </button>
                    <output aria-label="缩放比例">
                      {Math.round(zoom * 100)}%
                    </output>
                    <button
                      onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
                      aria-label="放大图谱"
                      disabled={zoom >= 2.5}
                    >
                      <Plus size={15} />
                    </button>
                    <button onClick={reset} aria-label="重置图谱视野">
                      <Maximize2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        cancelPreview();
                        setPositions(physics.reset());
                      }}
                      aria-label="整理节点布局"
                      title="整理节点布局"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {view === "index" && (
              <div className="shanhai-index">
                <div className="shanhai-index-heading">
                  <span>万物各有其形</span>
                  <small>{results.length} 幅原创意象 · 点击读文</small>
                </div>
                {results.length ? (
                  <div className="shanhai-index-grid">
                    {results.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => select(item.id)}
                        className={selected === item.id ? "is-selected" : ""}
                        style={{ "--node-color": color(item) } as CSSProperties}
                      >
                        <span className="shanhai-index-artwork">
                          <Image
                            src={`/images/shanhai/atlas/thumbs/${item.id}.webp`}
                            alt=""
                            width={320}
                            height={320}
                            loading="lazy"
                            decoding="async"
                            unoptimized
                          />
                        </span>
                        <small>
                          {String(i + 1).padStart(2, "0")} / {item.chapter}
                        </small>
                        <h3>
                          <i />
                          {item.name}
                          <ArrowUpRight size={16} />
                        </h3>
                        <p>{item.translation}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="shanhai-empty">
                    没有找到条目。换一个词，或选择“万物”。
                  </p>
                )}
              </div>
            )}
            {view === "routes" && (
              <div className="shanhai-route-view">
                <p className="shanhai-eyebrow">FOLLOW THE WORDS</p>
                <h2>循一条线索，读一段山海。</h2>
                <p>从地理、异兽与神话三个入口，回到具体的文字。</p>
                {shanhaiRoutes.map((route, index) => (
                  <button key={route.id} onClick={() => startRoute(route.id)}>
                    <span className="shanhai-route-number">0{index + 1}</span>
                    <div>
                      <h3>{route.title}</h3>
                      <p>{route.description}</p>
                      <small>
                        {route.nodes
                          .map((id) => byId.get(id)!.name)
                          .join(" → ")}
                      </small>
                    </div>
                    <ArrowRight size={20} />
                  </button>
                ))}
              </div>
            )}
          </section>
          <aside
            className="shanhai-reader"
            ref={readerRef}
            aria-label="条目阅读"
          >
            {activeRoute && (
              <div className="shanhai-reading-route">
                <span>
                  <BookOpen size={13} />
                  {activeRoute.title}
                </span>
                <button
                  onClick={() => setRouteId(null)}
                  aria-label="退出阅读路线"
                >
                  <X size={14} />
                </button>
                <div>
                  <button
                    disabled={routeIndex <= 0}
                    onClick={() =>
                      select(activeRoute.nodes[routeIndex - 1], true)
                    }
                    aria-label="路线上一篇"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <small>
                    {routeIndex >= 0
                      ? `${routeIndex + 1} / ${activeRoute.nodes.length}`
                      : "已离开路线"}
                  </small>
                  <button
                    disabled={routeIndex === activeRoute.nodes.length - 1}
                    onClick={() =>
                      select(
                        activeRoute.nodes[routeIndex < 0 ? 0 : routeIndex + 1],
                        true,
                      )
                    }
                    aria-label="路线下一篇"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
            <article key={node.id} className="shanhai-entry" aria-live="polite">
              <div className="shanhai-entry-meta">
                <span style={{ "--node-color": color(node) } as CSSProperties}>
                  <i />
                  {categories.find((item) => item.id === node.category)!.label}
                </span>
                <button
                  onClick={share}
                  aria-label="复制此条目的链接"
                  title="复制此条目的链接"
                >
                  {copied ? <Check size={16} /> : <Link2 size={16} />}
                </button>
              </div>
              {copied && (
                <p className="shanhai-share-status" role="status">
                  条目链接已复制
                </p>
              )}
              {shareFallback && (
                <label className="shanhai-share-fallback">
                  复制条目链接
                  <input
                    readOnly
                    value={shareFallback}
                    onFocus={(event) => event.target.select()}
                  />
                </label>
              )}
              <h2>{node.name}</h2>
              <p className="shanhai-pinyin">{node.pinyin}</p>
              <ShanhaiArtworkPane node={node} onOpen={cancelPreview} />
              <div className="shanhai-entry-section">
                <h3>
                  <span>原典</span>
                  <small>《山海经·{node.chapter}》</small>
                </h3>
                <blockquote>{node.quote}</blockquote>
                <a
                  className="shanhai-source-link"
                  href={node.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  对照原文 <ArrowUpRight size={12} />
                </a>
              </div>
              <div className="shanhai-entry-section">
                <h3>今译</h3>
                <p>{node.translation}</p>
              </div>
              <div className="shanhai-entry-section">
                <h3>细读一层</h3>
                <p>{node.reading}</p>
              </div>
              <div className="shanhai-entry-section shanhai-related">
                <h3>
                  循线再读 <small>{related.length} 个关联</small>
                </h3>
                {related.map((edge, i) => {
                  const target = byId.get(
                    edge.source === node.id ? edge.target : edge.source,
                  )!;
                  return (
                    <button
                      key={`${target.id}-${i}`}
                      onClick={() => select(target.id, true)}
                    >
                      <span>{target.name}</span>
                      <small>
                        {edge.source === node.id ? "→" : "←"} {edge.label}
                      </small>
                      <ChevronRight size={13} />
                    </button>
                  );
                })}
                {!related.length && <p>从其他条目继续探索。</p>}
              </div>
            </article>
          </aside>
        </div>
        <section className="shanhai-below">
          <div className="shanhai-below-intro">
            <span className="shanhai-eyebrow">THREE WAYS INTO THE CLASSIC</span>
            <h2>不知从何读起？</h2>
            <p>让一条线索，带你进入古书。</p>
          </div>
          {shanhaiRoutes.map((route, i) => (
            <button
              key={route.id}
              onClick={() => {
                startRoute(route.id);
                document.querySelector(".shanhai-viewbar")?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                  block: "start",
                });
              }}
            >
              <small>
                0{i + 1} / {route.nodes.length} 则条目
              </small>
              <h3>
                {route.title}
                <ArrowUpRight size={16} />
              </h3>
              <p>{route.description}</p>
            </button>
          ))}
        </section>
        <details className="shanhai-colophon">
          <summary>
            <span>关于这张图谱</span>
            <Plus size={14} />
          </summary>
          <div>
            <p>
              本页从《山海经》的传世文本选取条目，以“山—水—物—神话”的关系组织阅读。图中位置用于呈现关系，不对应现代地图；连线区分书中记载的方位、栖居、流向及叙事联系。
            </p>
            <p>
              原典保留所引版本用字，名称与释义采用便于阅读的简体。引文以各条目所链原文为据；“今译”和“细读一层”为本页整理。古籍中的食用功效与灾异征兆属于文本记载。原创意象由
              AI
              生成，各图列明文字依据与艺术演绎；“古图对照”单独标明馆藏出处与版本，便于比较古今图像。
            </p>
            <p>
              页面依据所提供的《山海经》课程汇报主题重新组织，正文回到原典核对。当前为选编第一辑，阅读路径不代表全书篇章顺序。
            </p>
          </div>
        </details>
        <footer className="shanhai-bottom">
          <span>
            山海拾遗 <i /> 第一辑 · 山川、异兽与神话
          </span>
          <span>字里有山海，万物待相逢。</span>
        </footer>
      </div>
    </main>
  );
}
