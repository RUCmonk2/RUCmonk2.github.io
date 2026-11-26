"use client";

import { useMemo, useState } from "react";

import {
  arborescence,
  boruvka,
  classicGraph,
  dagDistances,
  dagGraph,
  directedTreeGraph,
  type Graph,
  type GraphStep,
  kargerKleinTarjan,
  kruskal,
  prim,
  samplingGraph,
  sccGraph,
  tarjan,
  topological,
} from "@/lib/math-lab/graph-algorithms";

import { graphNotes } from "./notes";
import { MethodNote, StepControls } from "./shared";

type Method = keyof typeof graphNotes;
const label: Record<Method, { zh: string; en: string }> = {
  kruskal: { zh: "Kruskal", en: "Kruskal" },
  prim: { zh: "Prim", en: "Prim" },
  boruvka: { zh: "Borůvka", en: "Borůvka" },
  kkt: { zh: "KKT 期望线性", en: "KKT expected linear" },
  topo: { zh: "DAG 拓扑排序", en: "DAG topological order" },
  distances: { zh: "DAG 最短路", en: "DAG shortest paths" },
  scc: { zh: "SCC · Tarjan", en: "SCC · Tarjan" },
  dst: { zh: "DST · 最小树形图", en: "DST · Arborescence" },
};

function scenario(method: Method, seed: number) {
  switch (method) {
    case "kruskal":
      return { graph: classicGraph, steps: kruskal(classicGraph).steps };
    case "prim":
      return { graph: classicGraph, steps: prim(classicGraph).steps };
    case "boruvka":
      return { graph: classicGraph, steps: boruvka(classicGraph).steps };
    case "kkt":
      return {
        graph: samplingGraph,
        steps: kargerKleinTarjan(samplingGraph, seed).steps,
      };
    case "topo":
      return { graph: dagGraph, steps: topological(dagGraph).steps };
    case "distances":
      return { graph: dagGraph, steps: dagDistances(dagGraph, "A").steps };
    case "scc":
      return { graph: sccGraph, steps: tarjan(sccGraph).steps };
    case "dst":
      return {
        graph: directedTreeGraph,
        steps: arborescence(directedTreeGraph, "R").steps,
      };
  }
}

function Diagram({
  graph,
  state,
  directed,
  weighted,
  english,
}: {
  graph: Graph;
  state: GraphStep;
  directed: boolean;
  weighted: boolean;
  english: boolean;
}) {
  const nodes = new Map(graph.nodes.map((v) => [v.id, v]));
  const pctX = (num: number) => `${(100 * num) / 480}%`;
  const pctY = (num: number) => `${(100 * num) / 240}%`;
  return (
    <figure className="algo-figure">
      <div
        className="algo-graph"
        role="img"
        aria-label={graph.edges
          .map(
            (e) =>
              `${nodes.get(e.u)?.label ?? e.u}${directed ? " → " : " – "}${nodes.get(e.v)?.label ?? e.v}${weighted ? ` (${e.w})` : ""}`,
          )
          .join(", ")}
      >
        {graph.edges.map((e) => {
          const a = nodes.get(e.u)!,
            b = nodes.get(e.v)!;
          const dx = b.x - a.x,
            dy = b.y - a.y,
            length = Math.hypot(dx, dy);
          const inverse =
            directed &&
            graph.edges.some((other) => other.u === e.v && other.v === e.u);
          const offset = inverse ? 6 : 0;
          const from = (a.label?.length ?? 0) > 1 ? 33 : 17;
          const to = (b.label?.length ?? 0) > 1 ? 33 : 17;
          const x = a.x + (dx / length) * from - (dy / length) * offset;
          const y = a.y + (dy / length) * from + (dx / length) * offset;
          const active = state.active?.includes(e.id);
          const tag = state.rejected?.includes(e.id)
            ? "rejected"
            : state.kept?.includes(e.id)
              ? "kept"
              : state.sampled?.includes(e.id)
                ? "sampled"
                : "plain";
          return (
            <div
              key={e.id}
              className="algo-edge"
              data-kind={tag}
              data-active={active}
              data-directed={directed}
              data-paired={inverse}
              style={{
                left: pctX(x),
                top: pctY(y),
                width: pctX(Math.max(4, length - from - to)),
                rotate: `${Math.atan2(dy, dx)}rad`,
              }}
              aria-hidden="true"
            >
              {weighted && (
                <span style={{ rotate: `${-Math.atan2(dy, dx)}rad` }}>
                  {e.w}
                </span>
              )}
            </div>
          );
        })}
        {graph.nodes.map((v) => (
          <span
            key={v.id}
            className="algo-node"
            data-active={state.vertices?.includes(v.id)}
            data-group={(v.label?.length ?? 0) > 1}
            style={{ left: pctX(v.x), top: pctY(v.y) }}
            aria-hidden="true"
          >
            {v.label ?? v.id}
          </span>
        ))}
      </div>
      <figcaption>
        <span data-legend="kept">{english ? "Selected" : "已选"}</span>
        <span data-legend="active">{english ? "Current edge" : "当前边"}</span>
        {state.sampled !== undefined && (
          <span data-legend="sampled">{english ? "Sample" : "样本"}</span>
        )}
        {state.rejected !== undefined && (
          <span data-legend="rejected">
            {english ? "Removed or processed" : "已删或已处理"}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function GraphWorkshop({
  kind,
  english,
}: {
  kind: "mst" | "directed";
  english: boolean;
}) {
  const methods: Method[] =
    kind === "mst"
      ? ["kruskal", "prim", "boruvka", "kkt"]
      : ["topo", "distances", "scc", "dst"];
  const [method, setMethod] = useState<Method>(methods[0]);
  const [step, setStep] = useState(0);
  const [seed, setSeed] = useState(1);
  const { graph, steps } = useMemo(
    () => scenario(method, seed),
    [method, seed],
  );
  const lang = english ? "en" : "zh",
    note = graphNotes[method],
    state = steps[step];
  return (
    <>
      <section
        className="algo-notebook"
        aria-label={english ? "Interactive graph trace" : "图算法逐步演示"}
      >
        <div className="algo-toolbar">
          <div
            className="algo-choices"
            role="group"
            aria-label={english ? "Choose an algorithm" : "选择算法"}
          >
            {methods.map((id) => (
              <button
                type="button"
                key={id}
                aria-pressed={id === method}
                onClick={() => {
                  setMethod(id);
                  setStep(0);
                }}
              >
                {label[id][lang]}
              </button>
            ))}
          </div>
          {method === "kkt" && (
            <button
              type="button"
              className="algo-sample"
              onClick={() => {
                setSeed((previous) => previous + 1);
                setStep(0);
              }}
            >
              {english
                ? `Change sample · seed ${seed}`
                : `换一组样本 · 种子 ${seed}`}
            </button>
          )}
        </div>
        <div className="algo-definition">
          <p>{note.definition[lang]}</p>
          <code>
            {typeof note.cost === "string" ? note.cost : note.cost[lang]}
          </code>
        </div>
        <StepControls
          english={english}
          step={step}
          count={steps.length}
          setStep={setStep}
        />
        <div className="algo-workspace">
          <Diagram
            graph={state.diagram ?? graph}
            state={state}
            directed={kind === "directed"}
            weighted={method !== "topo" && method !== "scc"}
            english={english}
          />
          <section className="algo-explanation" aria-live="polite">
            <h2>{state.title[lang]}</h2>
            <p>{state.detail[lang]}</p>
            {state.rows && (
              <dl className="algo-facts">
                {state.rows.map((record) => (
                  <div key={record.label.en}>
                    <dt>{record.label[lang]}</dt>
                    <dd>{record.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        </div>
      </section>
      {kind === "mst" ? (
        <>
          <nav
            className="mst-trace-links"
            aria-label={english ? "Related lecture notes" : "本算法的讲义"}
          >
            <a href={`#mst-${method}`}>
              {english
                ? "Theory and pseudocode (Chinese)"
                : `读 ${label[method][lang]} 的证明与伪代码`}
            </a>
            {method === "kkt" && (
              <a href="#mst-trace">{english ? "Trace seed 1" : "跟算种子 1"}</a>
            )}
          </nav>
          {english && (
            <details className="mst-english-notes">
              <summary>English reasoning and pseudocode</summary>
              <MethodNote note={note} english anchorId="mst-english-code" />
            </details>
          )}
        </>
      ) : (
        <MethodNote note={note} english={english} />
      )}
    </>
  );
}
