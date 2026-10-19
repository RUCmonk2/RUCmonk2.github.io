"use client";
import { Focus, Minus, Plus, Search } from "lucide-react";
import {
  type PointerEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Mathematician, ScholarRelation } from "@/data/mathematicians";
import type { ScholarVisuals } from "@/data/scientist-atlas";

import {
  type Camera,
  eraOf,
  eras,
  fitPeople,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  labelsFor,
  layoutScholars,
  layoutSubgraph,
  lifeLabel,
  MAX_ZOOM,
  MIN_ZOOM,
  nodeAppearance,
  portraitRadius,
  portraitTier,
  relationCurve,
  trimRelation,
} from "./layout";
import { revealPeople } from "./visibility";

const portraitWindows: Record<
  string,
  { x: number; y: number; width: number; height: number }
> = {
  dedekind: { x: -107, y: -69, width: 210, height: 350 },
  noether: { x: -77, y: -45, width: 160, height: 244 },
  cook: { x: -100, y: -54, width: 210, height: 254 },
  "xia-peisu": { x: -127, y: -118, width: 210, height: 280 },
};

export function ScholarMap({
  people,
  allPeople,
  relations,
  visual,
  selected,
  mode,
  kind,
  allLines,
  explicitScope,
  selectionRequest,
  locale,
  onSelect,
  onReset,
}: {
  people: Mathematician[];
  allPeople: Mathematician[];
  relations: ScholarRelation[];
  visual?: ScholarVisuals;
  selected: string;
  mode: "connections" | "time";
  kind: string;
  allLines: boolean;
  explicitScope: boolean;
  selectionRequest: number;
  locale: "zh" | "en";
  onSelect: (id: string) => void;
  onReset: () => void;
}) {
  const en = locale === "en",
    uid = useId().replaceAll(":", "");
  const overviewPositions = useMemo(
    () => layoutScholars(allPeople, relations, visual),
    [allPeople, relations, visual],
  );
  const peopleKey = people.map((p) => p.id).join(",");
  const scopedLayout =
    explicitScope && people.length > 0 && people.length <= 18;
  const positions = useMemo(
    () =>
      scopedLayout ? layoutSubgraph(people, relations) : overviewPositions,
    [peopleKey, scopedLayout, overviewPositions, relations],
  );
  const allCurves = useMemo(() => {
    const ids = new Set(people.map((p) => p.id));
    return Object.fromEntries(
      relations
        .filter((e) => ids.has(e.source) && ids.has(e.target))
        .map((edge) => [
          edge.id,
          relationCurve(
            positions[edge.source],
            positions[edge.target],
            people
              .filter((p) => p.id !== edge.source && p.id !== edge.target)
              .map((p) => ({
                ...positions[p.id],
                radius: portraitRadius(p.id, visual),
              })),
            GRAPH_HEIGHT,
            portraitRadius(edge.source, visual),
            portraitRadius(edge.target, visual),
          ),
        ]),
    );
  }, [peopleKey, positions, relations, visual]);
  const [camera, setCamera] = useState<Camera>(() =>
    fitPeople(people, positions),
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(800);
  const screenScale = (viewportWidth / GRAPH_WIDTH) * camera.zoom;
  const overviewZoom = fitPeople(
    scopedLayout ? people : allPeople,
    positions,
    viewportWidth,
  ).zoom;
  const svgRef = useRef<SVGSVGElement>(null),
    timelineRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    pointer: number;
    x: number;
    y: number;
    start: Camera;
  } | null>(null);
  useEffect(() => {
    setCamera(fitPeople(people, positions, viewportWidth));
  }, [peopleKey, viewportWidth, scopedLayout]);
  useEffect(() => {
    setHovered(null);
    setFocused(null);
  }, [peopleKey]); // Only a changed visible set reframes the map.
  useEffect(() => {
    if (mode !== "time") return;
    const box = timelineRef.current,
      button = box?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!box || !button) return;
    const region = box.getBoundingClientRect(),
      item = button.getBoundingClientRect();
    if (item.top < region.top + 60 || item.bottom > region.bottom)
      box.scrollTop += item.top - region.top - 70;
  }, [mode, selected, peopleKey]);
  useEffect(() => {
    if (mode !== "connections") return;
    const point = positions[selected],
      margin = portraitRadius(selected, visual) + 45;
    if (!point) return;
    setCamera((old) => {
      const cx = GRAPH_WIDTH / 2 + old.x,
        cy = GRAPH_HEIGHT / 2 + old.y,
        hw = GRAPH_WIDTH / 2 / old.zoom,
        hh = GRAPH_HEIGHT / 2 / old.zoom;
      const outside =
        point.x - margin < cx - hw ||
        point.x + margin > cx + hw ||
        point.y - margin < cy - hh ||
        point.y + margin > cy + hh;
      return outside
        ? {
            ...old,
            x: point.x - GRAPH_WIDTH / 2,
            y: point.y - GRAPH_HEIGHT / 2,
          }
        : old;
    });
  }, [selected, mode, selectionRequest]);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const measure = () => setViewportWidth(svg.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    return () => observer.disconnect();
  }, [mode, Boolean(people.length)]);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const wheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      setHovered(null);
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const anchor = new DOMPoint(event.clientX, event.clientY).matrixTransform(
        matrix.inverse(),
      );
      setCamera((old) => {
        const zoom = Math.max(
            MIN_ZOOM,
            Math.min(MAX_ZOOM, old.zoom * Math.exp(-event.deltaY * 0.008)),
          ),
          ratio = old.zoom / zoom;
        return {
          zoom,
          x:
            anchor.x +
            (GRAPH_WIDTH / 2 + old.x - anchor.x) * ratio -
            GRAPH_WIDTH / 2,
          y:
            anchor.y +
            (GRAPH_HEIGHT / 2 + old.y - anchor.y) * ratio -
            GRAPH_HEIGHT / 2,
        };
      });
    };
    svg.addEventListener("wheel", wheel, { passive: false });
    return () => svg.removeEventListener("wheel", wheel);
  }, [mode, Boolean(people.length)]);
  const neighbors = new Set([
    selected,
    ...relations
      .filter((edge) => edge.source === selected || edge.target === selected)
      .flatMap((edge) => [edge.source, edge.target]),
  ]);
  const revealed = revealPeople(
    people,
    positions,
    camera,
    overviewZoom,
    viewportWidth,
    selected,
    focused,
    neighbors,
    explicitScope,
    visual,
  );
  const drawnPeople = revealed.people;
  const ids = new Set(drawnPeople.map((person) => person.id));
  const edges = relations.filter(
    (edge) =>
      ids.has(edge.source) &&
      ids.has(edge.target) &&
      (kind === "all" || edge.kind === kind) &&
      (allLines || edge.source === selected || edge.target === selected),
  );
  const candidates = new Set(
    drawnPeople
      .filter(
        (person) =>
          (revealed.opacity.get(person.id) ?? 0) >= 0.55 ||
          person.id === selected ||
          person.id === focused,
      )
      .map((person) => person.id),
  );
  const labels = labelsFor(
    drawnPeople,
    positions,
    candidates,
    hovered ?? focused ?? selected,
    locale,
    Infinity,
    screenScale,
    visual,
  );
  function focusLocal(id: string) {
    const center = positions[id];
    const nearby = [...people]
      .sort(
        (a, b) =>
          Math.hypot(
            positions[a.id].x - center.x,
            positions[a.id].y - center.y,
          ) -
          Math.hypot(
            positions[b.id].x - center.x,
            positions[b.id].y - center.y,
          ),
      )
      .slice(0, 8);
    const fit = fitPeople(nearby, positions, viewportWidth);
    setCamera({
      ...fit,
      zoom: Math.min(
        MAX_ZOOM,
        Math.max(
          overviewZoom * 2,
          Math.min(fit.zoom, (GRAPH_WIDTH / viewportWidth) * 0.85),
        ),
      ),
    });
  }
  function startDrag(e: PointerEvent<SVGSVGElement>) {
    if (e.button !== 0 || (e.target as Element).closest('[role="button"]'))
      return;
    setHovered(null);
    drag.current = {
      pointer: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      start: camera,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function moveDrag(e: PointerEvent<SVGSVGElement>) {
    if (
      !drag.current ||
      drag.current.pointer !== e.pointerId ||
      !svgRef.current
    )
      return;
    const matrix = svgRef.current.getScreenCTM();
    if (!matrix) return;
    const scale = 1 / matrix.a;
    setCamera({
      ...drag.current.start,
      x: drag.current.start.x - (e.clientX - drag.current.x) * scale,
      y: drag.current.start.y - (e.clientY - drag.current.y) * scale,
    });
  }
  if (!people.length)
    return (
      <div className="lives-empty lives-empty-static" role="status">
        <Search size={24} />
        <p>
          {en
            ? "No matching lives in this selection."
            : "当前筛选中没有匹配的人物。"}
        </p>
        <button onClick={onReset}>
          {en ? "Show all lives" : "查看全部人物"}
        </button>
      </div>
    );
  if (mode === "time")
    return (
      <div
        className="lives-chronology"
        ref={timelineRef}
        role="region"
        aria-label={en ? "Lives ordered by birth year" : "按出生年份排列的人物"}
        tabIndex={0}
      >
        <p className="lives-chronology-note">
          {en
            ? "Read by period and birth year. Approximate dates remain approximate."
            : "分期阅读，按出生年份排列；史料中的约略年代保留标注。"}
        </p>
        {eras.map((era) => {
          const group = people.filter((p) => eraOf(p) === era.id);
          if (!group.length) return null;
          return (
            <section key={era.id}>
              <h3>
                {era[locale]}
                <span>{group.length}</span>
              </h3>
              <ol>
                {group.map((p) => (
                  <li key={p.id}>
                    <button
                      aria-pressed={selected === p.id}
                      onClick={() => onSelect(p.id)}
                    >
                      <time>{lifeLabel(p, locale)}</time>
                      <span
                        className="lives-chronology-photo"
                        style={{
                          width: portraitRadius(p.id, visual) + 5,
                          height: portraitRadius(p.id, visual) + 5,
                        }}
                      >
                        <img
                          src={p.portrait.src}
                          alt=""
                          data-person={p.id}
                          loading="lazy"
                        />
                      </span>
                      <span>
                        <b>{p.name[locale]}</b>
                        <small>{p.field[locale]}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    );
  return (
    <>
      <div className="lives-stage">
        <div className="lives-reveal-status">
          <span>
            {revealed.level === "overview"
              ? en
                ? "OVERVIEW"
                : "总览"
              : revealed.level === "exploring"
                ? en
                  ? "EXPLORING"
                  : "展开中"
                : en
                  ? "LOCAL DETAIL"
                  : "局部细节"}
          </span>
          <span>
            {en
              ? `${drawnPeople.length} of ${people.length} portraits revealed`
              : `已展开 ${drawnPeople.length} / ${people.length} 位`}
          </span>
        </div>
        <svg
          ref={svgRef}
          className="lives-graph"
          viewBox={`${GRAPH_WIDTH / 2 - GRAPH_WIDTH / 2 / camera.zoom + camera.x} ${GRAPH_HEIGHT / 2 - GRAPH_HEIGHT / 2 / camera.zoom + camera.y} ${GRAPH_WIDTH / camera.zoom} ${GRAPH_HEIGHT / camera.zoom}`}
          role="group"
          aria-label={
            en
              ? `Interactive map: ${drawnPeople.length} portraits revealed from ${people.length} people; zoom in for more`
              : `人物关系图：${people.length} 位中展开 ${drawnPeople.length} 位，放大可显示更多`
          }
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onReset();
              setCamera(fitPeople(allPeople, overviewPositions, viewportWidth));
            }
          }}
        >
          <defs>
            {drawnPeople.map((p) => (
              <clipPath key={p.id} id={`${uid}-${p.id}`}>
                <circle r={nodeAppearance(p.id, screenScale, visual).radius} />
              </clipPath>
            ))}
            {["mentorship", "influence", "parallel", "support"].map((type) => (
              <marker
                key={type}
                id={`${uid}-arrow-${type}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path
                  d="M1 1L9 5L1 9"
                  fill="none"
                  stroke="context-stroke"
                  strokeWidth="1.4"
                />
              </marker>
            ))}
          </defs>
          {edges.map((edge) => {
            const curve = allCurves[edge.id],
              active = edge.source === selected || edge.target === selected;
            return (
              <g
                key={edge.id}
                className={`lives-edge ${active ? "is-active" : ""}`}
                data-kind={edge.kind}
                data-source={edge.source}
                data-target={edge.target}
                style={{
                  opacity:
                    Math.min(
                      revealed.opacity.get(edge.source) ?? 0,
                      revealed.opacity.get(edge.target) ?? 0,
                    ) * (active ? 0.9 : 0.32),
                }}
              >
                <path
                  d={trimRelation(
                    positions[edge.source],
                    positions[edge.target],
                    curve.control,
                    nodeAppearance(edge.source, screenScale, visual).radius,
                    nodeAppearance(edge.target, screenScale, visual).radius,
                    8 / screenScale,
                  )}
                  vectorEffect="non-scaling-stroke"
                  markerEnd={
                    edge.kind === "parallel" || edge.direction === "both"
                      ? undefined
                      : `url(#${uid}-arrow-${edge.kind})`
                  }
                />
                {active &&
                  drawnPeople.length <= 10 &&
                  edges.length <= 6 &&
                  explicitScope && (
                    <text
                      x={curve.label.x}
                      y={curve.label.y}
                      textAnchor="middle"
                      style={{ fontSize: 11 / screenScale }}
                    >
                      {edge.label[locale]}
                    </text>
                  )}
              </g>
            );
          })}
          {drawnPeople.map((p) => {
            const q = positions[p.id],
              appearance = nodeAppearance(p.id, screenScale, visual),
              r = appearance.radius,
              active = p.id === selected,
              crop = portraitWindows[p.id],
              factor = r / 35;
            return (
              <g
                key={p.id}
                role="button"
                tabIndex={(revealed.opacity.get(p.id) ?? 0) >= 0.45 ? 0 : -1}
                aria-hidden={
                  (revealed.opacity.get(p.id) ?? 0) < 0.45 || undefined
                }
                aria-pressed={active}
                aria-label={`${p.name[locale]}, ${lifeLabel(p, locale)}, ${p.field[locale]}`}
                data-person={p.id}
                data-tier={portraitTier(p.id, visual)}
                className={`lives-node ${active ? "is-selected" : ""} ${!allLines && !neighbors.has(p.id) ? "is-distant" : ""}`}
                style={{
                  opacity:
                    (revealed.opacity.get(p.id) ?? 0) *
                    (!allLines &&
                    !neighbors.has(p.id) &&
                    p.id !== hovered &&
                    p.id !== focused
                      ? 0.65
                      : 1),
                  pointerEvents:
                    (revealed.opacity.get(p.id) ?? 0) < 0.45
                      ? "none"
                      : undefined,
                }}
                transform={`translate(${q.x} ${q.y})`}
                onClick={() => onSelect(p.id)}
                onDoubleClick={() => focusLocal(p.id)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setFocused(p.id)}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(p.id);
                  }
                }}
              >
                <title>{`${p.name[locale]} · ${p.hook[locale]}`}</title>
                <circle r={r + 12 / screenScale} fill="transparent" />
                <circle
                  className="lives-node-halo"
                  r={r + appearance.halo}
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  className="lives-node-ring"
                  r={r + appearance.ring}
                  vectorEffect="non-scaling-stroke"
                />
                <image
                  href={p.portrait.src}
                  x={crop ? crop.x * factor : -r}
                  y={crop ? crop.y * factor : -r}
                  width={crop ? crop.width * factor : 2 * r}
                  height={crop ? crop.height * factor : 2 * r}
                  preserveAspectRatio="xMidYMin slice"
                  clipPath={`url(#${uid}-${p.id})`}
                />
                {labels.has(p.id) && (
                  <text
                    className="lives-node-name"
                    x={labels.get(p.id)!.dx}
                    y={labels.get(p.id)!.dy}
                    textAnchor={labels.get(p.id)!.anchor}
                    style={{
                      fontSize: appearance.fontSize,
                    }}
                  >
                    {p.name[locale]}
                  </text>
                )}
                {active && (
                  <circle
                    className="lives-selection-dot"
                    cx="0"
                    cy={-r - 12 / screenScale}
                    r={3 / screenScale}
                  />
                )}
              </g>
            );
          })}
        </svg>
        <div
          className="lives-zoom"
          role="group"
          aria-label={en ? "Map controls" : "图谱视图控制"}
        >
          <button
            onClick={() =>
              setCamera((old) => ({
                ...old,
                zoom: Math.max(MIN_ZOOM, old.zoom / 1.25),
              }))
            }
            disabled={camera.zoom <= MIN_ZOOM}
            aria-label={en ? "Zoom out" : "缩小"}
          >
            <Minus size={15} />
          </button>
          <button
            onClick={() =>
              setCamera(fitPeople(people, positions, viewportWidth))
            }
            aria-label={en ? "Back to overview" : "回到总览"}
          >
            <Focus size={15} />
          </button>
          <button
            onClick={() =>
              setCamera((old) => ({
                ...old,
                zoom: Math.min(MAX_ZOOM, old.zoom * 1.25),
                x:
                  old.zoom / overviewZoom < 1.2
                    ? positions[selected].x - GRAPH_WIDTH / 2
                    : old.x,
                y:
                  old.zoom / overviewZoom < 1.2
                    ? positions[selected].y - GRAPH_HEIGHT / 2
                    : old.y,
              }))
            }
            disabled={camera.zoom >= MAX_ZOOM}
            aria-label={en ? "Zoom in" : "放大"}
          >
            <Plus size={15} />
          </button>
        </div>
        <span className="lives-stage-note">
          {en
            ? "Double-click a portrait to explore nearby lives · drag to move"
            : "双击人物展开附近 · 拖动探索"}
        </span>
      </div>
      <p className="lives-size-note">
        <span aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {en
          ? "Familiar names are slightly larger to help you find your bearings."
          : "熟悉的名字稍大一些，便于在图中定位。"}
      </p>
    </>
  );
}
