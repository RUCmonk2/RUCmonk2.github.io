"use client";

import { type CSSProperties, useEffect, useRef } from "react";

import { DWELL_MS } from "@/components/math-map/dwell";
import { inkMark } from "@/components/math-map/ink-mark";
import { useDwellFocus } from "@/components/math-map/use-dwell-focus";
import type { LearningLocale } from "@/data/learning/types";
import { tcsEdges, tcsNodes } from "@/data/tcs-map";

const nodesById = new Map(tcsNodes.map((node) => [node.id, node]));
const inkPaths = new Map(tcsNodes.map((node) => [node.id, inkMark(node.id)]));
const inkRadius = { core: 10.5, branch: 8, case: 11.5 };

export function TcsInkMap({ locale }: { locale: LearningLocale }) {
  const links = useRef(new Map<string, HTMLAnchorElement>());
  const { pending, queue, cancel } = useDwellFocus((id) => {
    links.current.get(id)?.click();
  });
  const en = locale === "en";

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") cancel();
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("blur", cancel);
    window.addEventListener("hashchange", cancel);
    document.addEventListener("visibilitychange", cancel);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("blur", cancel);
      window.removeEventListener("hashchange", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
  }, [cancel]);

  return (
    <section
      id="tcs-map"
      className="tcs-map"
      tabIndex={-1}
      aria-labelledby="tcs-map-title"
    >
      <div className="tcs-map-heading">
        <h2 id="tcs-map-title">{en ? "The map" : "学科地图"}</h2>
        <p>
          {en
            ? "Pause over an ink mark or select it to read more."
            : "在墨点上稍作停留，或直接点按，即可跳到讲解。"}
        </p>
      </div>
      <nav
        className="tcs-map-stage"
        aria-label={en ? "Fields and examples" : "分支与案例"}
        onWheel={cancel}
        style={{ "--tcs-dwell": `${DWELL_MS}ms` } as CSSProperties}
      >
        {(["wide", "narrow"] as const).map((layout) => (
          <svg
            key={layout}
            className={`tcs-map-connections tcs-map-connections-${layout}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {tcsEdges.map(([from, to]) => {
              const [x1, y1] = nodesById.get(from)![layout];
              const [x2, y2] = nodesById.get(to)![layout];
              return (
                <line
                  key={`${from}-${to}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  vectorEffect="non-scaling-stroke"
                  data-related={pending === from || pending === to}
                />
              );
            })}
          </svg>
        ))}
        {tcsNodes.map((node) => (
          <a
            key={node.id}
            href={`#${node.id}`}
            className="tcs-map-node"
            aria-label={
              node.mapLabel?.[locale] ? node.title[locale] : undefined
            }
            data-kind={node.kind}
            data-pending={pending === node.id}
            style={
              {
                "--x-wide": `${node.wide[0]}%`,
                "--y-wide": `${node.wide[1]}%`,
                "--x-narrow": `${node.narrow[0]}%`,
                "--y-narrow": `${node.narrow[1]}%`,
              } as CSSProperties
            }
            ref={(link) => {
              if (link) links.current.set(node.id, link);
              else links.current.delete(node.id);
            }}
            onPointerMove={(event) => {
              if (event.pointerType === "mouse" && !event.buttons)
                queue(node.id);
            }}
            onPointerLeave={cancel}
            onPointerCancel={cancel}
            onPointerDown={cancel}
            onClick={cancel}
          >
            <svg
              className="tcs-node-mark"
              viewBox="-22 -22 44 44"
              aria-hidden="true"
            >
              <g transform={`scale(${inkRadius[node.kind]})`}>
                <path
                  className="tcs-ink-edge"
                  d={inkPaths.get(node.id)}
                  transform="scale(1.28)"
                />
                <path className="tcs-ink-body" d={inkPaths.get(node.id)} />
                <path
                  className="tcs-ink-pool"
                  d={inkPaths.get(node.id)}
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
          </a>
        ))}
      </nav>
    </section>
  );
}
