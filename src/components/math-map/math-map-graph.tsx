"use client";

import katex from "katex";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Focus,
  List,
  Minus,
  Network,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import {
  type PointerEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import type { KnowledgeAtlas } from "@/data/knowledge-atlas";
import { mathAtlas } from "@/data/math-atlas";
import { mathMapLabel } from "@/data/math-map";

import { DWELL_MS } from "./dwell";
import { bindGraphGestures, MAX_ZOOM, MIN_ZOOM, zoomAt } from "./gestures";
import { inkMark } from "./ink-mark";
import {
  type Camera,
  configureForces,
  createGraphSimulation,
  DEFAULT_FORCES,
  fitCamera,
  type ForceSettings,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  type GraphSimulation,
  layoutGraph,
  nodeLabelSize,
  nodeTier,
  type Point,
  snapshotSimulation,
  visibleLabels,
} from "./layout";
import {
  LessonBody,
  MathProse,
  type ReadingMode,
  ReadingModes,
  useMathLesson,
} from "./lesson-reader";
import { useDwellFocus } from "./use-dwell-focus";

function Formula({ value }: { value: string }) {
  const html = useMemo(
    () =>
      katex.renderToString(value, {
        displayMode: true,
        throwOnError: true,
        strict: "error",
        trust: false,
      }),
    [value],
  );
  return (
    <div
      className="mathmap-formula"
      tabIndex={0}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

type Filter = {
  domain: string;
  path: string;
  query: string;
  neighborhood: boolean;
};
const allFilter: Filter = {
  domain: "all",
  path: "",
  query: "",
  neighborhood: false,
};
export function MathMapGraph({
  locale,
  atlas = mathAtlas,
}: {
  locale: "zh" | "en";
  atlas?: KnowledgeAtlas;
}) {
  const {
    nodes: mathMapNodes,
    edges: mathMapEdges,
    domains: mathMapDomains,
    paths: mathMapPaths,
    sources: mathMapSources,
    centers,
  } = atlas;
  const mathMapNode = useCallback(
    (id: string) => mathMapNodes.find((node) => node.id === id),
    [mathMapNodes],
  );
  const mathMapNeighbors = useCallback(
    (id: string) =>
      mathMapEdges
        .filter((edge) => edge.source === id || edge.target === id)
        .map((edge) => ({
          node: mathMapNode(edge.source === id ? edge.target : edge.source)!,
          edge,
        })),
    [mathMapEdges, mathMapNode],
  );
  const inkMarks = useMemo(
    () => new Map(mathMapNodes.map((node) => [node.id, inkMark(node.id)])),
    [mathMapNodes],
  );
  const colorOf = (id: string) =>
    mathMapDomains.find((d) => d.id === id)?.tone ?? id;
  const en = locale === "en";
  const uid = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navigationUntil = useRef(0);
  const simulationRef = useRef<GraphSimulation | null>(null);
  const fitAfterSettle = useRef(false);
  const reducedMotion = useRef(false);
  const drag = useRef<{
    pointer: number;
    id?: string;
    start: Point;
    camera: Camera;
    moved: boolean;
    origin?: Point;
  } | null>(null);
  const [positions, setPositions] = useState(() =>
    layoutGraph(mathMapNodes, mathMapEdges, locale, centers),
  );
  const [camera, setCamera] = useState<Camera>(() => fitCamera(positions));
  const [selected, setSelected] = useState(atlas.defaultNode);
  const [readingMode, setReadingMode] = useState<ReadingMode>("beginner");
  const lessonRef = mathMapNode(selected)?.lesson;
  const lessonLocale = lessonRef?.locale ?? locale;
  const lessonState = useMathLesson(
    lessonRef?.id ?? selected,
    lessonLocale,
    lessonRef?.namespace,
  );
  const [focused, setFocused] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(allFilter);
  const [view, setView] = useState<"graph" | "list">("graph");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [forces, setForces] = useState(DEFAULT_FORCES);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("mathmap-reading-mode");
      if (stored === "formal" || stored === "beginner") setReadingMode(stored);
    } catch {
      /* Reading remains available when storage is disabled. */
    }
  }, []);
  function changeReadingMode(mode: ReadingMode) {
    setReadingMode(mode);
    try {
      window.localStorage.setItem("mathmap-reading-mode", mode);
    } catch {
      /* Optional preference. */
    }
  }
  const {
    pending,
    queue: queueDwell,
    cancel: cancelDwell,
  } = useDwellFocus(recordSelection);
  const interruptDwell = useCallback(() => {
    cancelDwell();
    navigationUntil.current = performance.now() + 300;
  }, [cancelDwell]);
  const current = mathMapNode(selected)!;
  const domain = mathMapDomains.find((d) => d.id === current.domain)!;
  const path = mathMapPaths.find((p) => p.id === filter.path);
  const neighbors = mathMapNeighbors(selected);
  const visible = useMemo(() => {
    const query = filter.query.trim().toLowerCase();
    const neighborhood = new Set([
      selected,
      ...mathMapNeighbors(selected).map(({ node }) => node.id),
    ]);
    return mathMapNodes.filter(
      (node) =>
        (filter.domain === "all" || node.domain === filter.domain) &&
        (!path || path.nodes.includes(node.id)) &&
        (!filter.neighborhood || neighborhood.has(node.id)) &&
        (!query ||
          [
            node.id,
            node.label.zh,
            node.label.en,
            node.blurb.zh,
            node.blurb.en,
          ].some((text) => text.toLowerCase().includes(query))),
    );
  }, [filter, path, selected, mathMapNodes, mathMapNeighbors]);
  const visibleIds = new Set(visible.map((n) => n.id));
  const visibleEdges = mathMapEdges.filter(
    (e) => visibleIds.has(e.source) && visibleIds.has(e.target),
  );
  const byId = new Map(positions.map((p) => [p.id, p]));
  const active = focused;
  const focusIds = new Set([
    active,
    ...(active ? mathMapNeighbors(active).map(({ node }) => node.id) : []),
  ]);
  const activeVisible = active !== null && visibleIds.has(active);
  const relativeZoom = camera.zoom / fitCamera(positions).zoom;
  const labelCandidates = new Set(
    visible
      .filter((node) => {
        const p = byId.get(node.id)!;
        if (pending === node.id) return true;
        if (activeVisible) return focusIds.has(node.id);
        if (filter.query || visible.length < 16 || relativeZoom >= 1.9)
          return true;
        return (
          nodeTier(p) === "hub" ||
          p.importance >= (relativeZoom >= 1.3 ? 0.3 : 0.55)
        );
      })
      .map((node) => node.id),
  );
  const shownLabels = visibleLabels(
    positions.filter(
      (p) =>
        visibleIds.has(p.id) &&
        (!activeVisible || focusIds.has(p.id) || p.id === pending),
    ),
    labelCandidates,
    active,
  );
  const drawnEdges = activeVisible
    ? visibleEdges.filter((e) => e.source === active || e.target === active)
    : [];
  const sourceIds = current.sources ?? domain.sources;

  useEffect(() => {
    const simulation = createGraphSimulation(
      layoutGraph(mathMapNodes, mathMapEdges, locale, centers),
      mathMapEdges,
      DEFAULT_FORCES,
      centers,
    ).alpha(0);
    simulationRef.current = simulation;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      reducedMotion.current = preference.matches;
      if (preference.matches) simulation.stop();
    };
    syncMotion();
    preference.addEventListener("change", syncMotion);
    simulation.on("tick", () => setPositions(snapshotSimulation(simulation)));
    simulation.on("end", () => {
      if (fitAfterSettle.current) {
        setCamera(fitCamera(snapshotSimulation(simulation)));
        fitAfterSettle.current = false;
      }
    });
    return () => {
      simulation.stop();
      simulationRef.current = null;
      preference.removeEventListener("change", syncMotion);
    };
  }, [locale, mathMapNodes, mathMapEdges, centers]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 600px)").matches) setView("list");
    function restoreHash() {
      cancelDwell();
      const id = window.location.hash.slice(1);
      if (mathMapNode(id)) {
        setSelected(id);
        setFocused(id);
        setFilter(allFilter);
      } else {
        setFocused(null);
      }
    }
    restoreHash();
    window.addEventListener("hashchange", restoreHash);
    return () => window.removeEventListener("hashchange", restoreHash);
  }, [cancelDwell, mathMapNode]);
  const hasVisibleNodes = visible.length > 0;
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    return bindGraphGestures(svg, setCamera, interruptDwell);
  }, [view, hasVisibleNodes, interruptDwell]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function recordSelection(id: string) {
    setSelected(id);
    setFocused(id);
    cancelDwell();
    setCopied(false);
    setCopyError(false);
    window.history.replaceState(null, "", "#" + id);
  }
  function settleSimulation() {
    const simulation = simulationRef.current;
    if (!simulation) return;
    simulation.alphaTarget(0).alpha(Math.max(0.25, simulation.alpha()));
    if (reducedMotion.current) {
      simulation.stop().tick(300);
      const next = snapshotSimulation(simulation);
      setPositions(next);
      if (fitAfterSettle.current) setCamera(fitCamera(next));
      fitAfterSettle.current = false;
    } else simulation.restart();
  }
  function changeForces(next: ForceSettings) {
    interruptDwell();
    setForces(next);
    const simulation = simulationRef.current;
    if (!simulation) return;
    configureForces(simulation, mathMapEdges, next, centers);
    fitAfterSettle.current = true;
    settleSimulation();
  }
  function releaseNode(id?: string) {
    const node = simulationRef.current?.nodes().find((n) => n.id === id);
    if (!node || node.fx == null) return;
    node.fx = null;
    node.fy = null;
    settleSimulation();
  }
  function choose(id: string) {
    recordSelection(id);
    if (!visibleIds.has(id)) {
      setFilter(allFilter);
      setCamera(fitCamera(positions));
    }
  }
  function beginDwell(id: string, keyboard = false) {
    if (
      drag.current ||
      (!keyboard && performance.now() < navigationUntil.current)
    )
      return;
    if (id === focused) {
      cancelDwell();
      return;
    }
    queueDwell(id);
  }
  function readDetails() {
    interruptDwell();
    detailRef.current?.scrollIntoView({
      block: "start",
      behavior: reducedMotion.current ? "auto" : "smooth",
    });
    detailRef.current?.focus({ preventScroll: true });
  }
  function returnToMap() {
    interruptDwell();
    stageRef.current?.scrollIntoView({
      block: "start",
      behavior: reducedMotion.current ? "auto" : "smooth",
    });
    stageRef.current?.focus({ preventScroll: true });
  }
  function overview() {
    setFocused(null);
    cancelDwell();
    setFilter((previous) => ({ ...previous, neighborhood: false }));
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
  function changeFilter(next: Filter) {
    setFilter(next);
    cancelDwell();
    setCamera(fitCamera(positions));
  }
  function point(event: { clientX: number; clientY: number }): Point {
    const svg = svgRef.current!;
    const matrix = svg.getScreenCTM();
    if (!matrix) return { x: 0, y: 0 };
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse(),
    );
    return { x: p.x, y: p.y };
  }
  function pointerDown(event: PointerEvent<SVGSVGElement>) {
    interruptDwell();
    if (event.button !== 0 || drag.current) return;
    const target = event.target as Element;
    const id =
      target.closest("[data-node]")?.getAttribute("data-node") ?? undefined;
    drag.current = {
      pointer: event.pointerId,
      id,
      start: point(event),
      camera,
      moved: false,
      origin: id ? byId.get(id) : undefined,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function pointerMove(event: PointerEvent<SVGSVGElement>) {
    const d = drag.current;
    if (!d || d.pointer !== event.pointerId) return;
    const p = point(event);
    const dx = p.x - d.start.x,
      dy = p.y - d.start.y;
    if (Math.hypot(dx, dy) > 4) d.moved = true;
    if (!d.moved) return;
    if (d.id && d.origin) {
      const simulation = simulationRef.current;
      const node = simulation?.nodes().find((n) => n.id === d.id);
      if (!simulation || !node) return;
      node.fx = node.x = d.origin.x + dx / d.camera.zoom;
      node.fy = node.y = d.origin.y + dy / d.camera.zoom;
      simulation.alphaTarget(0.12).alpha(Math.max(0.2, simulation.alpha()));
      if (reducedMotion.current) simulation.stop().tick(3);
      else simulation.restart();
      setPositions(snapshotSimulation(simulation));
    } else setCamera({ ...d.camera, x: d.camera.x + dx, y: d.camera.y + dy });
  }
  function pointerEnd(event: PointerEvent<SVGSVGElement>) {
    const d = drag.current;
    if (!d || d.pointer !== event.pointerId) return;
    drag.current = null;
    if (d.moved) releaseNode(d.id);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (event.type === "pointerup" && !d.moved) {
      if (d.id) choose(d.id);
      else overview();
    }
  }
  function zoom(factor: number) {
    interruptDwell();
    setCamera((previous) =>
      zoomAt(previous, factor, { x: GRAPH_WIDTH / 2, y: GRAPH_HEIGHT / 2 }),
    );
  }

  function reset() {
    const next = layoutGraph(mathMapNodes, mathMapEdges, locale, centers);
    const simulation = simulationRef.current;
    if (simulation) {
      simulation.stop().alpha(0).alphaTarget(0);
      simulation.nodes().forEach((node, i) => {
        Object.assign(node, next[i], { vx: 0, vy: 0, fx: null, fy: null });
      });
      configureForces(simulation, mathMapEdges, DEFAULT_FORCES, centers);
    }
    setForces(DEFAULT_FORCES);
    fitAfterSettle.current = false;
    setPositions(next);
    setCamera(fitCamera(next));
    setFilter(allFilter);
    overview();
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + window.location.pathname + "#" + selected,
      );
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <>
      <section
        id="mathmap-explorer"
        className="mathmap-explorer"
        aria-label={atlas.title[locale]}
      >
        <div className="mathmap-panel-title">
          <div>
            <span className="mathmap-section-label">
              01 / INTERACTIVE ATLAS
            </span>
            <h2>
              {en
                ? "Every idea has a neighborhood."
                : "每个概念，都有它的来路。"}
            </h2>
          </div>
          <p>
            {en
              ? "Select a concept to follow its connections."
              : "选择一个概念，沿着关联继续探索。"}
          </p>
        </div>
        <div className="mathmap-controls">
          <label className="mathmap-search">
            <Search size={17} aria-hidden="true" />
            <input
              value={filter.query}
              onChange={(e) =>
                changeFilter({ ...filter, query: e.target.value })
              }
              placeholder={
                en
                  ? "Search a concept or keyword…"
                  : atlas.id === "math-map"
                    ? "搜索概念：梯度、Jacobian、群…"
                    : "搜索本课程的概念或关键词…"
              }
              aria-label={en ? "Search concepts" : "搜索概念"}
              type="search"
            />
          </label>
          <div
            className="mathmap-view-switch"
            aria-label={en ? "Display" : "显示方式"}
            role="group"
          >
            <button
              type="button"
              aria-pressed={view === "graph"}
              onClick={() => {
                interruptDwell();
                setView("graph");
              }}
            >
              <Network size={15} />
              {en ? "Map" : "图谱"}
            </button>
            <button
              type="button"
              aria-pressed={view === "list"}
              onClick={() => {
                interruptDwell();
                setView("list");
              }}
            >
              <List size={15} />
              {en ? "List" : "列表"}
            </button>
          </div>
          <button className="mathmap-reset" type="button" onClick={reset}>
            {en ? "Reset all" : "重置全部"}
          </button>
        </div>
        <div
          className="mathmap-domains"
          role="group"
          aria-label={en ? "Filter by subject" : "按领域筛选"}
        >
          <button
            type="button"
            aria-pressed={filter.domain === "all" && !path}
            onClick={() => changeFilter({ ...allFilter, query: filter.query })}
          >
            {en ? "All subjects" : "全部领域"}
          </button>
          {mathMapDomains.map((d) => (
            <button
              type="button"
              data-domain={colorOf(d.id)}
              aria-pressed={filter.domain === d.id}
              key={d.id}
              onClick={() => {
                changeFilter({ ...allFilter, domain: d.id });
                recordSelection(
                  mathMapNodes.find((node) => node.domain === d.id)!.id,
                );
                setFocused(null);
                setCamera(
                  fitCamera(
                    positions.filter((p) => mathMapNode(p.id)!.domain === d.id),
                  ),
                );
              }}
            >
              <i aria-hidden="true" />
              {d.label[locale]}
            </button>
          ))}
        </div>
        {path && (
          <div className="mathmap-path">
            <p>
              <b>{path.label[locale]}</b> · {path.description[locale]}
            </p>
            <ol>
              {path.nodes.map((id, i) => (
                <li key={id}>
                  <button
                    type="button"
                    aria-current={selected === id ? "step" : undefined}
                    onClick={() => choose(id)}
                  >
                    <span>{i + 1}</span>
                    {mathMapNode(id)!.label[locale]}
                  </button>
                </li>
              ))}
            </ol>
            <small>
              {en
                ? "Reading order; each step may also need prerequisites shown in its detail card."
                : "这是阅读顺序；每一步所需的其他基础可在详情中查看。"}
            </small>
          </div>
        )}
        <div className="mathmap-workspace">
          <div ref={stageRef} className="mathmap-stage" tabIndex={-1}>
            <div className="mathmap-stage-heading">
              <span role="status">
                {visible.length} / {mathMapNodes.length}{" "}
                {en ? "concepts" : "个概念"} · {visibleEdges.length}{" "}
                {en ? "connections" : "条关系"}
                <span className="mathmap-focus-status">
                  {activeVisible
                    ? en
                      ? "Exploring a neighborhood"
                      : "正在探索局部关系"
                    : en
                      ? "Overview"
                      : "全图概览"}
                </span>
              </span>
              <label>
                <input
                  type="checkbox"
                  checked={filter.neighborhood}
                  onChange={(e) =>
                    changeFilter({ ...filter, neighborhood: e.target.checked })
                  }
                />
                {en ? "Selected neighborhood" : "只看当前概念及邻居"}
              </label>
            </div>
            <div
              className="mathmap-selection"
              data-domain={colorOf(current.domain)}
            >
              <div>
                <span>{en ? "Current concept" : "当前概念"}</span>
                <b title={current.label[locale]}>{current.label[locale]}</b>
              </div>
              <button
                type="button"
                onClick={readDetails}
                aria-controls={uid + "-detail"}
              >
                <BookOpen size={14} aria-hidden="true" />
                {en ? "Read details" : "阅读详情"}
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>
            {visible.length === 0 ? (
              <div className="mathmap-empty">
                <Search size={30} />
                <h3>{en ? "No concepts found" : "没有找到匹配概念"}</h3>
                <p>
                  {en
                    ? "Try a shorter keyword or clear the filters."
                    : "试试更短的关键词，或清除筛选条件。"}
                </p>
                <button type="button" onClick={reset}>
                  {en ? "Show all concepts" : "显示全部概念"}
                </button>
              </div>
            ) : view === "list" ? (
              <div className="mathmap-list">
                {visible.map((node) => (
                  <button
                    type="button"
                    key={node.id}
                    data-domain={colorOf(node.domain)}
                    aria-pressed={selected === node.id}
                    onClick={() => choose(node.id)}
                  >
                    <span>
                      <i />
                      {
                        mathMapDomains.find((d) => d.id === node.domain)!.label[
                          locale
                        ]
                      }
                    </span>
                    <b>{node.label[locale]}</b>
                    <p>{node.blurb[locale]}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mathmap-canvas">
                <div
                  className="mathmap-zoom"
                  role="group"
                  aria-label={en ? "Map controls" : "图谱控制"}
                >
                  <button
                    type="button"
                    aria-label={en ? "Zoom in" : "放大"}
                    onClick={() => zoom(1.25)}
                    disabled={camera.zoom >= MAX_ZOOM}
                  >
                    <Plus size={17} />
                  </button>
                  <button
                    type="button"
                    aria-label={en ? "Zoom out" : "缩小"}
                    onClick={() => zoom(0.8)}
                    disabled={camera.zoom <= MIN_ZOOM}
                  >
                    <Minus size={17} />
                  </button>
                  <button
                    type="button"
                    aria-label={en ? "Fit visible concepts" : "适应可见概念"}
                    onClick={() => {
                      interruptDwell();
                      setCamera(
                        fitCamera(
                          positions.filter((p) => visibleIds.has(p.id)),
                        ),
                      );
                    }}
                  >
                    <Focus size={17} />
                  </button>
                  <span>{Math.round(camera.zoom * 100)}%</span>
                  <button
                    className="mathmap-overview"
                    type="button"
                    onClick={overview}
                    aria-pressed={!activeVisible}
                  >
                    {en ? "Overview" : "全图"}
                  </button>
                </div>
                <details className="mathmap-physics">
                  <summary>
                    <SlidersHorizontal size={14} />
                    {en ? "Forces" : "力学"}
                  </summary>
                  <div>
                    {(
                      [
                        {
                          key: "center",
                          label: en ? "Center force" : "中心引力",
                          min: 0.004,
                          max: 0.12,
                          step: 0.004,
                        },
                        {
                          key: "repel",
                          label: en ? "Repel force" : "节点斥力",
                          min: 50,
                          max: 650,
                          step: 25,
                        },
                        {
                          key: "link",
                          label: en ? "Link force" : "连线弹力",
                          min: 0.04,
                          max: 0.5,
                          step: 0.02,
                        },
                        {
                          key: "distance",
                          label: en ? "Link distance" : "连线长度",
                          min: 70,
                          max: 240,
                          step: 5,
                        },
                      ] as const
                    ).map(({ key, label, min, max, step }) => (
                      <label key={key}>
                        <span>
                          {label}
                          <output>{forces[key]}</output>
                        </span>
                        <input
                          type="range"
                          aria-label={label}
                          min={min}
                          max={max}
                          step={step}
                          value={forces[key]}
                          onChange={(event) =>
                            changeForces({
                              ...forces,
                              [key]: Number(event.target.value),
                            })
                          }
                        />
                      </label>
                    ))}
                    <button
                      type="button"
                      onClick={() => changeForces(DEFAULT_FORCES)}
                    >
                      {en ? "Restore forces" : "恢复默认力学"}
                    </button>
                  </div>
                </details>
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
                  aria-label={
                    en
                      ? "Interactive concept map. Dwell briefly or press Enter to select a concept without scrolling. Use Read details to open the explanation. Drag to move nodes or pan; pinch to zoom."
                      : "可交互概念图。悬停片刻或回车切换聚焦，页面保持原位。使用阅读详情按钮查看解释；拖动移动，双指缩放。"
                  }
                  role="group"
                  data-focus={activeVisible ? active : "overview"}
                  onPointerLeave={cancelDwell}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault();
                      overview();
                    }
                  }}
                  onPointerDown={pointerDown}
                  onPointerMove={pointerMove}
                  onPointerUp={pointerEnd}
                  onPointerCancel={pointerEnd}
                  onLostPointerCapture={() => {
                    releaseNode(drag.current?.id);
                    drag.current = null;
                  }}
                >
                  <defs>
                    <filter
                      id={uid + "-ink-bleed"}
                      x="-30%"
                      y="-30%"
                      width="160%"
                      height="160%"
                    >
                      <feGaussianBlur stdDeviation="0.045" />
                    </filter>
                    <marker
                      id={uid + "-arrow"}
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                    </marker>
                  </defs>
                  <g
                    transform={`translate(${camera.x} ${camera.y}) scale(${camera.zoom})`}
                  >
                    <g aria-hidden="true">
                      {drawnEdges.map((edge) => {
                        const a = byId.get(edge.source)!,
                          b = byId.get(edge.target)!;
                        const dx = b.x - a.x,
                          dy = b.y - a.y;
                        const distance = Math.max(1, Math.hypot(dx, dy));
                        const sourceT = Math.min(
                          (a.radius + 3) / distance,
                          0.45,
                        );
                        const targetT = Math.min(
                          (b.radius + 5) / distance,
                          0.45,
                        );
                        const x1 = a.x + dx * sourceT,
                          y1 = a.y + dy * sourceT;
                        const x2 = b.x - dx * targetT,
                          y2 = b.y - dy * targetT;
                        const bend = edge.kind === "prereq" ? 0.055 : -0.07;
                        return (
                          <path
                            key={edge.source + edge.target}
                            d={`M${x1},${y1} Q${(x1 + x2) / 2 - dy * bend},${(y1 + y2) / 2 + dx * bend} ${x2},${y2}`}
                            fill="none"
                            className={[
                              "mathmap-edge",
                              edge.kind,
                              "is-active",
                            ].join(" ")}
                            markerEnd={
                              edge.kind === "prereq"
                                ? `url(#${uid}-arrow)`
                                : undefined
                            }
                          />
                        );
                      })}
                    </g>
                    {visible.map((node) => {
                      const p = byId.get(node.id)!;
                      return (
                        <g
                          key={node.id}
                          data-node={node.id}
                          data-importance={nodeTier(p)}
                          data-domain={colorOf(node.domain)}
                          transform={`translate(${p.x} ${p.y})`}
                          className={[
                            "mathmap-node",
                            active === node.id ? "is-selected" : "",
                            pending === node.id ? "is-pending" : "",
                            activeVisible && !focusIds.has(node.id)
                              ? "is-muted"
                              : "",
                          ].join(" ")}
                          role="button"
                          tabIndex={0}
                          aria-label={node.label[locale]}
                          aria-pressed={selected === node.id}
                          onPointerEnter={(event) => {
                            if (event.pointerType !== "touch" && !event.buttons)
                              beginDwell(node.id);
                          }}
                          onPointerMove={(event) => {
                            if (event.pointerType !== "touch" && !event.buttons)
                              beginDwell(node.id);
                          }}
                          onPointerLeave={cancelDwell}
                          onFocus={(event) => {
                            if (event.currentTarget.matches(":focus-visible"))
                              beginDwell(node.id, true);
                          }}
                          onBlur={cancelDwell}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              choose(node.id);
                            }
                          }}
                        >
                          <rect
                            x={
                              -(shownLabels.has(node.id)
                                ? (p.width * nodeLabelSize(p)) / 16
                                : Math.max(36, p.radius * 2 + 12)) / 2
                            }
                            y={-Math.max(18, p.radius + 7)}
                            width={
                              shownLabels.has(node.id)
                                ? (p.width * nodeLabelSize(p)) / 16
                                : Math.max(36, p.radius * 2 + 12)
                            }
                            height={
                              shownLabels.has(node.id)
                                ? p.radius * 2 + 60
                                : Math.max(36, p.radius * 2 + 14)
                            }
                          />
                          <circle
                            className="mathmap-node-halo"
                            r={p.radius + 7}
                          />
                          {pending === node.id && (
                            <circle
                              className="mathmap-dwell"
                              r={p.radius + 8}
                              pathLength={1}
                              style={{ animationDuration: DWELL_MS + "ms" }}
                            />
                          )}
                          <g
                            className="mathmap-ink"
                            transform={`scale(${p.radius})`}
                            aria-hidden="true"
                          >
                            <path
                              className="mathmap-ink-bleed"
                              d={inkMarks.get(node.id)}
                              transform="scale(1.12)"
                              filter={`url(#${uid}-ink-bleed)`}
                            />
                            <path
                              className="mathmap-node-dot"
                              d={inkMarks.get(node.id)}
                            />
                            <path
                              className="mathmap-ink-pool"
                              d={inkMarks.get(node.id)}
                              transform="translate(-0.06 0.025) scale(0.75)"
                              filter={`url(#${uid}-ink-bleed)`}
                            />
                          </g>
                          {shownLabels.has(node.id) && (
                            <text
                              style={{ fontSize: nodeLabelSize(p) }}
                              x={0}
                              y={p.radius + 19}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              {mathMapLabel(node, locale)}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                </svg>
                <p className="mathmap-canvas-hint">
                  {en
                    ? "Dwell to focus · click to select immediately · pinch to zoom · click the paper for the overview"
                    : "悬停片刻聚焦 · 点击立即切换 · 双指缩放 · 点击空白回到全图"}
                </p>
              </div>
            )}
            <div
              className="mathmap-color-key"
              aria-label={en ? "Color key" : "颜色图例"}
            >
              {atlas.legend.map((item) => (
                <span key={item.tone} data-domain={item.tone}>
                  <i />
                  {item.label[locale]}
                </span>
              ))}
              <small>
                {en
                  ? "Larger nodes have more connections"
                  : "节点越大，关联越多"}
              </small>
            </div>
            <div className="mathmap-legend">
              <span>
                <i className="mathmap-line-sample" />
                {en ? "Suggested prerequisite →" : "建议先修 →"}
              </span>
              <span>
                <i className="mathmap-line-sample related" />
                {en ? "Connection" : "相关概念"}
              </span>
              <p>
                {en
                  ? "Edges suggest a study order, not a complete list of logical dependencies."
                  : "连线是建议学习顺序与关联，不是完整的逻辑依赖。"}
              </p>
            </div>
          </div>
          <aside
            className="mathmap-detail"
            data-domain={colorOf(current.domain)}
            tabIndex={-1}
            aria-label={en ? "Concept preview" : "概念预览"}
          >
            <button
              type="button"
              className="mathmap-return"
              onClick={returnToMap}
            >
              <ArrowLeft size={13} aria-hidden="true" />
              {en ? "Back to map" : "返回图谱"}
            </button>
            <div className="mathmap-detail-kicker">
              <span>
                <i />
                {domain.label[locale]}
              </span>
              <button
                type="button"
                onClick={copyLink}
                aria-label={en ? "Copy concept link" : "复制概念链接"}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className="mathmap-copy-status" role="status">
              {copied
                ? en
                  ? "Link copied"
                  : "链接已复制"
                : copyError
                  ? en
                    ? "Copy the address in your browser to share this concept."
                    : "可复制浏览器地址栏中的概念链接。"
                  : ""}
            </div>
            <div className="mathmap-concept-index">
              CONCEPT{" "}
              {String(
                mathMapNodes.findIndex((n) => n.id === current.id) + 1,
              ).padStart(2, "0")}{" "}
              / {mathMapNodes.length}
            </div>
            <h2>{current.label[locale]}</h2>
            <ReadingModes
              mode={readingMode}
              onChange={changeReadingMode}
              en={en}
              label={en ? "Preview reading mode" : "预览阅读模式"}
            />
            <div className="mathmap-blurb">
              <MathProse>
                {lessonState.lesson?.intro[readingMode] ??
                  current.blurb[locale]}
              </MathProse>
            </div>
            {current.code ? (
              <pre className="mathmap-code-preview" tabIndex={0}>
                <code>{current.code}</code>
              </pre>
            ) : (
              <Formula value={current.formula} />
            )}
            <button
              type="button"
              className="mathmap-open-lesson"
              onClick={readDetails}
            >
              <BookOpen size={15} />
              {en ? "Read the full lesson" : "阅读完整讲解"}
              <ArrowRight size={14} />
            </button>
            <div className="mathmap-neighbors">
              {(["before", "after", "related"] as const).map((kind) => {
                const matches = neighbors.filter(({ edge }) =>
                  kind === "related"
                    ? edge.kind === "related"
                    : edge.kind === "prereq" &&
                      (kind === "before"
                        ? edge.target === selected
                        : edge.source === selected),
                );
                if (!matches.length) return null;
                return (
                  <section key={kind}>
                    <h3>
                      {kind === "before"
                        ? en
                          ? "Build on"
                          : "建议先学"
                        : kind === "after"
                          ? en
                            ? "Continue to"
                            : "接着探索"
                          : en
                            ? "Also connected"
                            : "关联概念"}
                    </h3>
                    <div>
                      {matches.map(({ node }) => (
                        <button
                          type="button"
                          key={node.id}
                          onClick={() => choose(node.id)}
                        >
                          {node.label[locale]}
                          <ArrowRight size={12} />
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
            {current.href && (
              <Link
                className="mathmap-course-link"
                href={(en ? "/en" : "") + current.href}
              >
                <BookOpen size={15} />
                {current.hrefLabel?.[locale] ??
                  (en ? "Open related course notes" : "阅读相关课程笔记")}
                <ArrowRight size={14} />
              </Link>
            )}
            {sourceIds.length > 0 && (
              <div className="mathmap-reading">
                <h3>{en ? "Further reading" : "继续阅读"}</h3>
                {mathMapSources
                  .filter((s) => sourceIds.includes(s.id))
                  .map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.title}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
              </div>
            )}
          </aside>
        </div>
        <article
          ref={detailRef}
          id={uid + "-detail"}
          className="mathmap-lesson"
          data-domain={colorOf(current.domain)}
          tabIndex={-1}
          lang={lessonLocale}
          aria-label={en ? "Concept details" : "概念详情"}
        >
          <header className="mathmap-lesson-header">
            <button
              type="button"
              className="mathmap-return"
              onClick={returnToMap}
            >
              <ArrowLeft size={14} />
              {en ? "Back to map" : "返回图谱"}
            </button>
            <span className="mathmap-section-label">
              {domain.label[locale]} /{" "}
              {en ? "READ & WORK THROUGH" : "理解 · 演算 · 练习"}
            </span>
            <h2>{current.label[locale]}</h2>
            <ReadingModes
              mode={readingMode}
              onChange={changeReadingMode}
              en={en}
              label={en ? "Lesson reading mode" : "讲解阅读模式"}
            />
            <p>
              {readingMode === "beginner"
                ? en
                  ? "Start with intuition, decode the notation, then calculate and practise."
                  : "先建立直觉，再读懂每个符号，跟着算例动手，最后用题目检查理解。"
                : en
                  ? "Definitions, assumptions, derivations and connections."
                  : "定义、适用条件、推导与知识联系。"}
            </p>
          </header>
          <LessonBody
            key={selected + readingMode + locale}
            {...lessonState}
            mode={readingMode}
            en={en}
          />
          <footer className="mathmap-lesson-footer">
            <button
              type="button"
              className="mathmap-return"
              onClick={returnToMap}
            >
              <ArrowLeft size={14} />
              {en ? "Explore another concept" : "回到图谱，探索下一个概念"}
            </button>
          </footer>
        </article>
      </section>
      <section
        id="mathmap-routes"
        className="mathmap-routes"
        aria-label={en ? "Suggested learning routes" : "建议学习路线"}
      >
        <div className="mathmap-section-label">
          {en ? "02 / READING ROUTES" : "02 / 阅读路线"}
        </div>
        <h2>
          {en
            ? "Follow a route through the ideas."
            : "沿着问题，把知识连起来。"}
        </h2>
        <div className="mathmap-route-grid">
          {mathMapPaths.map((route, i) => (
            <button
              key={route.id}
              type="button"
              aria-pressed={filter.path === route.id}
              onClick={() => {
                changeFilter({ ...allFilter, path: route.id });
                recordSelection(route.nodes[0]);
                document
                  .getElementById("mathmap-explorer")
                  ?.scrollIntoView({ block: "start" });
                setCamera(
                  fitCamera(
                    positions.filter((p) => route.nodes.includes(p.id)),
                  ),
                );
              }}
            >
              <span>0{i + 1}</span>
              <b>
                {route.label[locale]}
                <small>{route.description[locale]}</small>
              </b>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
