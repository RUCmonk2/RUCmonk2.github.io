"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

import { MathFormula } from "@/components/math-lab/galois-shared";
import { DWELL_MS } from "@/components/math-map/dwell";
import { inkMark } from "@/components/math-map/ink-mark";
import { useDwellFocus } from "@/components/math-map/use-dwell-focus";
import type { LearningLocale } from "@/data/learning/types";
import { tcsEdges, type TcsNode,tcsNodes } from "@/data/tcs-map";

const byId = new Map(tcsNodes.map((node) => [node.id, node]));
const ink = new Map(tcsNodes.map((node) => [node.id, inkMark(node.id)]));
const radius = { core: 10.5, branch: 8, case: 10 };
const smallScreen = "(max-width: 720px)";
const first = tcsNodes[0];

function makeMap(cases: boolean) {
  const nodes = tcsNodes.filter((node) => (node.kind === "case") === cases);
  const rows = Math.ceil(nodes.length / 3);
  const points = nodes.map((node, i) => {
    const row = Math.floor(i / 3);
    return {
      node,
      x: [17, 50, 83][i % 3] + (row % 2 === 0 ? -1 : 1),
      y: ((row + 0.32 + [0.02, 0, 0.04][i % 3]) / rows) * 100,
    };
  });
  const positions = new Map(points.map((p) => [p.node.id, p]));
  const lines = tcsEdges.flatMap(([a, b]) => {
    const from = positions.get(a),
      to = positions.get(b);
    return from && to ? [{ from, to }] : [];
  });
  return { points, lines };
}
const classicMap = makeMap(true);
const fieldMap = makeMap(false);

export function TcsInkMap({ locale }: { locale: LearningLocale }) {
  const [selected, setSelected] = useState(first);
  const sheet = useRef<HTMLDialogElement>(null);
  const en = locale === "en";
  const classic = selected.kind === "case";
  const map = classic ? classicMap : fieldMap;
  const related = tcsNodes.filter((other) =>
    tcsEdges.some(
      ([a, b]) =>
        (a === selected.id && b === other.id) ||
        (b === selected.id && a === other.id),
    ),
  );

  function choose(
    node: TcsNode,
    historyMode: "push" | "replace",
    showSheet: boolean,
  ) {
    setSelected(node);
    const hash = "#" + node.id;
    if (location.hash !== hash) {
      if (historyMode === "push") history.pushState(history.state, "", hash);
      else history.replaceState(history.state, "", hash);
    }
    if (showSheet && matchMedia(smallScreen).matches && !sheet.current?.open)
      sheet.current?.showModal();
  }

  const { pending, queue, cancel } = useDwellFocus((id) => {
    const node = byId.get(id);
    if (node && !matchMedia(smallScreen).matches)
      choose(node, "replace", false);
  });

  useEffect(() => {
    function restore() {
      cancel();
      const node = byId.get(location.hash.slice(1));
      setSelected(node ?? first);
      if (node && matchMedia(smallScreen).matches) {
        if (!sheet.current?.open) sheet.current?.showModal();
      } else sheet.current?.close();
    }
    function resize(event: MediaQueryListEvent) {
      cancel();
      if (!event.matches) sheet.current?.close();
    }
    const media = matchMedia(smallScreen);
    restore();
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", cancel);
    media.addEventListener("change", resize);
    return () => {
      window.removeEventListener("popstate", restore);
      window.removeEventListener("hashchange", restore);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", cancel);
      media.removeEventListener("change", resize);
    };
  }, [cancel]);

  const reader = (
    <article className="tcs-topic" key={selected.id}>
      <h3>{selected.title[locale]}</h3>
      <p className="tcs-question">{selected.question[locale]}</p>
      <p>{selected.description[locale]}</p>
      {selected.formula && <MathFormula value={selected.formula} />}
      {selected.example && <p>{selected.example[locale]}</p>}
      {selected.sources && (
        <ul className="tcs-sources">
          {selected.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href}>{source.label} ↗</a>
            </li>
          ))}
        </ul>
      )}
      <h4>{en ? "Connected topics" : "接着读"}</h4>
      <div className="tcs-related">
        {related.map((node) => (
          <button
            key={node.id}
            onClick={() => {
              cancel();
              choose(node, "push", true);
            }}
          >
            {node.title[locale]}
          </button>
        ))}
      </div>
    </article>
  );

  return (
    <section
      id="tcs-map"
      className="tcs-map"
      aria-label={en ? "Subject map" : "学科地图"}
    >
      <div className="tcs-map-heading">
        <div className="tcs-switch" aria-label={en ? "Map view" : "地图视图"}>
          <button
            aria-pressed={classic}
            onClick={() => {
              cancel();
              if (!classic) choose(first, "push", false);
            }}
          >
            {en ? "Problems & results" : "经典问题与结果"}
          </button>
          <button
            aria-pressed={!classic}
            onClick={() => {
              cancel();
              if (classic) choose(fieldMap.points[0].node, "push", false);
            }}
          >
            {en ? "Fields" : "学科分支"}
          </button>
        </div>
        <p>
          {en
            ? "Select a mark to read its explanation."
            : "点选墨点，查看讲解。"}
        </p>
      </div>
      <div className="tcs-workspace">
        <nav
          className="tcs-map-stage"
          aria-label={en ? "Topics" : "主题"}
          onWheel={cancel}
          style={{ "--tcs-dwell": DWELL_MS + "ms" } as CSSProperties}
        >
          <svg
            className="tcs-map-connections"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {map.lines.map(({ from, to }) => (
              <line
                key={from.node.id + "-" + to.node.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                vectorEffect="non-scaling-stroke"
                data-related={
                  from.node.id === selected.id || to.node.id === selected.id
                }
              />
            ))}
          </svg>
          {map.points.map(({ node, x, y }) => (
            <button
              key={node.id}
              className="tcs-map-node"
              data-topic={node.id}
              aria-pressed={selected.id === node.id}
              aria-label={node.title[locale]}
              data-kind={node.kind}
              data-pending={pending === node.id}
              style={{ left: x + "%", top: "calc(" + y + "% - 22px)" }}
              onPointerMove={(e) => {
                if (
                  e.pointerType === "mouse" &&
                  !e.buttons &&
                  node.id !== selected.id &&
                  !matchMedia(smallScreen).matches
                )
                  queue(node.id);
              }}
              onPointerLeave={cancel}
              onPointerDown={cancel}
              onPointerCancel={cancel}
              onClick={() => {
                cancel();
                choose(node, "push", true);
              }}
            >
              <svg
                className="tcs-node-mark"
                viewBox="-22 -22 44 44"
                aria-hidden="true"
              >
                <g transform={"scale(" + radius[node.kind] + ")"}>
                  <path
                    className="tcs-ink-edge"
                    d={ink.get(node.id)}
                    transform="scale(1.28)"
                  />
                  <path className="tcs-ink-body" d={ink.get(node.id)} />
                  <path
                    className="tcs-ink-pool"
                    d={ink.get(node.id)}
                    transform="translate(-.17 .1) scale(.64)"
                  />
                </g>
                <circle
                  className="tcs-node-progress"
                  r="17.3"
                  pathLength="1"
                  transform="rotate(-90)"
                />
              </svg>
              <span className="tcs-node-label">
                {node.mapLabel?.[locale] ?? node.title[locale]}
              </span>
            </button>
          ))}
        </nav>
        <aside
          className="tcs-side"
          aria-label={en ? "Topic details" : "节点讲解"}
        >
          {reader}
        </aside>
      </div>
      <dialog
        ref={sheet}
        className="tcs-sheet"
        aria-label={selected.title[locale]}
      >
        <div className="tcs-sheet-bar">
          <button autoFocus onClick={() => sheet.current?.close()}>
            {en ? "Back to map" : "返回地图"} ×
          </button>
        </div>
        {reader}
      </dialog>
    </section>
  );
}
