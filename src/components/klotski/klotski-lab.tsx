"use client";

import { useMemo, useState } from "react";

import {
  type Board,
  boardKey,
  locked,
  slide,
  stateGraph,
} from "@/lib/math-lab/klotski";
import { numberParity } from "@/lib/math-lab/number-sliding";

import { KlotskiBoard } from "./klotski-board";

const ordered = [1, 2, 3, 4, 5, 0];
const swapped = [1, 2, 3, 5, 4, 0];
// The blank starts bottom right and traverses the right-hand 2×2 square.
const loop = [4, 1, 2, 5];

function MiniPuzzle() {
  const [board, setBoard] = useState(ordered);
  const [dye, setDye] = useState(true);
  const [loopStep, setLoopStep] = useState<number | null>(null);
  const hole = board.indexOf(0);
  const { color, odd } = numberParity(board, 3);
  const solvable = (odd ^ color) === 1;
  function swap(from: number, source = board) {
    const next = source.slice();
    const blank = source.indexOf(0);
    [next[from], next[blank]] = [next[blank], next[from]];
    setBoard(next);
  }
  function advanceLoop() {
    const step = loopStep === null || loopStep === 4 ? 0 : loopStep;
    swap(loop[step], step === 0 ? ordered : board);
    setLoopStep(step + 1);
  }
  return (
    <section className="kl-experiment">
      <h3>只交换 4 和 5，为什么回不去？</h3>
      <div className="kl-mini-demo">
        <div className="kl-number-board" aria-label="2×3 数字滑块">
          {board.map((tile, index) => {
            const near =
              Math.abs((index % 3) - (hole % 3)) +
                Math.abs(Math.floor(index / 3) - Math.floor(hole / 3)) ===
              1;
            const dark = dye && ((index % 3) + Math.floor(index / 3)) % 2;
            return (
              <div
                key={index}
                className={
                  dark ? "kl-number-cell kl-cell-dark" : "kl-number-cell"
                }
              >
                {tile ? (
                  <button
                    type="button"
                    disabled={!near}
                    onClick={() => {
                      swap(index);
                      setLoopStep(null);
                    }}
                  >
                    {tile}
                  </button>
                ) : (
                  <span aria-label="空格">空</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="kl-number-info">
          <p role="status">
            空格在{color ? "深色" : "浅色"}格 · 含空格的置换为
            {odd ? "奇" : "偶"} · 不变量 {odd ^ color} ·{" "}
            <strong>{solvable ? "有解" : "无解"}</strong>
          </p>
          <label>
            <input
              type="checkbox"
              checked={dye}
              onChange={(event) => setDye(event.target.checked)}
            />{" "}
            黑白染色
          </label>
          <div className="kl-actions">
            <button className="kl-button" onClick={advanceLoop}>
              {loopStep && loopStep < 4
                ? `回路下一步（${loopStep}/4）`
                : "演示四步回路"}
            </button>
            <button
              className="kl-button"
              onClick={() => {
                setBoard(swapped);
                setLoopStep(null);
              }}
            >
              从完成图交换 4 和 5
            </button>
            <button
              className="kl-button"
              onClick={() => {
                setBoard(ordered);
                setLoopStep(null);
              }}
            >
              复原
            </button>
          </div>
          {loopStep === 4 && (
            <p role="status">空格回到原位，2、3、5 三块完成了一次三循环。</p>
          )}
        </div>
      </div>
      <p>
        每滑一步，空格换一次颜色，也和一个数字交换位置。两项奇偶性同时翻转，它们的异或保持不变。四步回路中的三循环是偶置换。只交换
        4 和 5 时，空格没动，置换奇偶性却变了，所以无法靠合法滑动复原。
      </p>
      <details>
        <summary>群论里的说法</summary>
        <p>
          一次滑动是一个对换。三循环可以拆成两次对换，所以是偶置换。把空格固定在右下角，五个数字的可达排列正好是交错群
          A₅ 的 60 个元素。对整个 2×3 棋盘做穷举，完成图可以到达 360
          个盘面，恰好覆盖与它不变量相同的所有排列。
        </p>
      </details>
    </section>
  );
}

function Graph({ board, full }: { board: Board; full: boolean }) {
  const graph = useMemo(
    () => stateGraph(board, full ? Infinity : 2),
    [board, full],
  );
  const incomingByNode = graph.nodes.map((node, id) =>
    graph.edges.filter(
      (edge) => edge.to === id && graph.nodes[edge.from].depth <= node.depth,
    ),
  );
  const [selected, setSelected] = useState(() =>
    incomingByNode.findIndex((edges) => edges.length > 1),
  );
  const depth = Math.max(...graph.nodes.map((node) => node.depth));
  return (
    <div className="kl-graph">
      <p>
        {graph.nodes.length} 个不同盘面。选中一个节点，可查看哪些走法通向它。
      </p>
      <div className="kl-layers" aria-label="按距离展开的华容道状态图">
        {Array.from({ length: depth + 1 }, (_, layer) => (
          <div className="kl-layer" key={layer}>
            <strong>{layer === 0 ? "起点" : `第 ${layer} 层`}</strong>
            {graph.nodes.map((node, id) => {
              if (node.depth !== layer) return null;
              const incoming = incomingByNode[id];
              const linked =
                selected >= 0 &&
                graph.edges.some(
                  (edge) => edge.from === id && edge.to === selected,
                );
              return (
                <div
                  className={[
                    "kl-graph-node",
                    linked && "kl-linked",
                    incoming.length > 1 && "kl-merged",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={id}
                >
                  <button
                    type="button"
                    aria-pressed={selected === id}
                    onClick={() => setSelected(id)}
                  >
                    #{id + 1}
                    {incoming.length > 1
                      ? ` · ${incoming.length} 条路径合流`
                      : ""}
                  </button>
                  <KlotskiBoard board={node.board} miniature />
                  {incoming.length > 0 && (
                    <span>
                      来自{" "}
                      {incoming.map((edge) => `#${edge.from + 1}`).join("、")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {selected >= 0 && (
        <ul className="kl-edge-list">
          {graph.edges
            .filter((edge) => edge.to === selected)
            .map((edge) => (
              <li key={`${edge.from}-${edge.label}`}>
                #{edge.from + 1} → #{edge.to + 1} · {edge.label}
                {graph.nodes[edge.to].depth < graph.nodes[edge.from].depth
                  ? "（返回已见盘面）"
                  : ""}
              </li>
            ))}
          {!graph.edges.some((edge) => edge.to === selected) && (
            <li>这是搜索起点。</li>
          )}
        </ul>
      )}
    </div>
  );
}

export function KlotskiLab({
  board,
  distances,
  loadError,
}: {
  board: Board;
  distances: Record<string, number> | null;
  loadError: boolean;
}) {
  const [useLocked, setUseLocked] = useState(false);
  const [example, setExample] = useState<Board>(locked);
  const [dye, setDye] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [all, setAll] = useState(false);
  const current = useLocked ? example : board;
  const distance = distances?.[boardKey(current)];
  return (
    <div className="kl-lab">
      <MiniPuzzle />
      <section className="kl-experiment">
        <h3>曹操还有路吗？</h3>
        <div className="kl-actions" role="group" aria-label="选择分析盘面">
          <button
            className="kl-button"
            aria-pressed={!useLocked}
            onClick={() => setUseLocked(false)}
          >
            当前这局
          </button>
          <button
            className="kl-button"
            aria-pressed={useLocked}
            onClick={() => setUseLocked(true)}
          >
            无解残局
          </button>
        </div>
        <div className="kl-analysis">
          <KlotskiBoard
            key={useLocked ? "locked" : "current"}
            board={current}
            colored={dye}
            onMove={
              useLocked
                ? (move) => setExample((previous) => slide(previous, move))
                : undefined
            }
          />
          <div>
            <p className="kl-result" role="status">
              {distances
                ? distance === undefined
                  ? "无解 · 到不了出口"
                  : `有解 · 最短还需 ${distance} 步`
                : loadError
                  ? "距离表未能载入，请刷新重试。"
                  : "正在读取距离表…"}
            </p>
            {useLocked && (
              <p>
                棋子可以移动。把所有走法都展开，只有 6
                个不同盘面，曹操始终到不了出口。
              </p>
            )}
            <label>
              <input
                type="checkbox"
                checked={dye}
                onChange={(event) => setDye(event.target.checked)}
              />{" "}
              显示格子染色
            </label>
            <p>
              交换两个空位的人为编号，置换奇偶性会翻转，但棋局完全一样。曹操华容道的可达性由完整的状态图判定。
            </p>
            <div className="kl-actions">
              <button
                className="kl-button"
                aria-expanded={showGraph}
                onClick={() => setShowGraph(!showGraph)}
              >
                {showGraph ? "收起状态图" : "展开两层状态图"}
              </button>
              {useLocked && (
                <button
                  className="kl-button"
                  onClick={() => setExample(locked)}
                >
                  重置残局
                </button>
              )}
            </div>
          </div>
        </div>
        {showGraph && (
          <>
            {useLocked && (
              <button
                className="kl-button"
                aria-pressed={all}
                onClick={() => setAll(!all)}
              >
                {all ? "只看两层" : "查看全部 6 个盘面"}
              </button>
            )}
            <Graph
              key={`${boardKey(current)}-${useLocked && all}`}
              board={current}
              full={useLocked && all}
            />
          </>
        )}
      </section>
    </div>
  );
}
