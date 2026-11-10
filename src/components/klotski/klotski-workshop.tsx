"use client";

import "./klotski.css";

import { useEffect, useRef, useState } from "react";

import {
  atExit,
  type Board,
  boardKey,
  classic,
  legalMoves,
  type Move,
  moveLabel,
  slide,
} from "@/lib/math-lab/klotski";

import { KlotskiBoard } from "./klotski-board";
import { KlotskiLab } from "./klotski-lab";
import { NumberWorkshop } from "./number-workshop";

export function KlotskiWorkshop() {
  const [numbers, setNumbers] = useState(false);
  const [seed, setSeed] = useState("12ab34cd");
  const [history, setHistory] = useState<Board[]>([classic]);
  const [hint, setHint] = useState<Move>();
  const [notice, setNotice] = useState("按住棋子，沿一个方向拖动。");
  const [distances, setDistances] = useState<Record<string, number> | null>(
    null,
  );
  const [loadError, setLoadError] = useState(false);
  const [showLab, setShowLab] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const result = useRef<HTMLDialogElement>(null);
  const announced = useRef(false);
  const theory = useRef<HTMLElement>(null);
  const board = history[history.length - 1];
  const moves = history.length - 1;
  const solved = atExit(board);
  const remaining = distances?.[boardKey(board)];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkedSeed = params.get("seed");
    if (linkedSeed && /^[a-f0-9]{8}$/i.test(linkedSeed))
      setSeed(linkedSeed.toLowerCase());
    setNumbers(params.get("mode") === "numbers");
  }, []);

  function chooseMode(next: boolean, nextSeed = seed) {
    setNumbers(next);
    setSeed(nextSeed);
    const url = new URL(window.location.href);
    if (next) {
      url.searchParams.set("mode", "numbers");
      url.searchParams.set("seed", nextSeed);
    } else {
      url.searchParams.delete("mode");
      url.searchParams.delete("seed");
    }
    url.hash = "";
    window.history.replaceState(null, "", url);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch("/assets/klotski-distances-v1.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Distance table unavailable");
        return response.json();
      })
      .then(setDistances)
      .catch(() => {
        if (!controller.signal.aborted) setLoadError(true);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!moves || solved || numbers) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [Boolean(moves), solved, numbers]);
  useEffect(() => {
    if (showLab) theory.current?.scrollIntoView({ block: "start" });
  }, [showLab]);
  useEffect(() => {
    if (!solved) announced.current = false;
    if (!solved || numbers || announced.current) return;
    const timer = window.setTimeout(() => {
      announced.current = true;
      result.current?.showModal();
    }, 420);
    return () => window.clearTimeout(timer);
  }, [solved, numbers]);

  function play(move: Move) {
    if (
      solved ||
      !legalMoves(board).some(
        (candidate) =>
          candidate.piece === move.piece && candidate.to === move.to,
      )
    )
      return;
    setHistory([...history, slide(board, move)]);
    setHint(undefined);
    setNotice(moveLabel(board, move));
  }
  function reset() {
    result.current?.close();
    setHistory([classic]);
    setSeconds(0);
    setHint(undefined);
    setNotice("已回到横刀立马的开局。");
  }
  function suggest() {
    if (!distances || remaining === undefined || remaining === 0) return;
    const best = legalMoves(board).find(
      (move) => distances[boardKey(slide(board, move))] === remaining - 1,
    );
    if (best) {
      setHint(best);
      setNotice(`建议：${moveLabel(board, best)}。`);
    }
  }
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="kl-workshop" lang="zh">
      <div className="kl-actions kl-mode" role="group" aria-label="选择游戏">
        <button
          className="kl-button"
          aria-pressed={!numbers}
          onClick={() => chooseMode(false)}
        >
          曹操华容道
        </button>
        <button
          className="kl-button"
          aria-pressed={numbers}
          onClick={() => chooseMode(true)}
        >
          数字华容道
        </button>
      </div>
      <div hidden={!numbers}>
        <NumberWorkshop
          key={seed}
          seed={seed}
          active={numbers}
          onNew={() =>
            chooseMode(
              true,
              crypto
                .getRandomValues(new Uint32Array(1))[0]
                .toString(16)
                .padStart(8, "0"),
            )
          }
          onTheory={() => {
            setShowLab(true);
            theory.current?.scrollIntoView({ block: "start" });
          }}
        />
      </div>
      <div hidden={numbers}>
        <div className="kl-game">
          <aside className="kl-sidebar">
            <span className="notes-overline">经典开局</span>
            <h2>横刀立马</h2>
            <p>把曹操移到底部中央的出口。每次沿直线滑动一块棋子算一步。</p>
            <dl className="kl-stats">
              <div>
                <dt>步数</dt>
                <dd>{moves}</dd>
              </div>
              <div>
                <dt>用时</dt>
                <dd>{time}</dd>
              </div>
            </dl>
            <p className="kl-result">
              {solved
                ? "已通关"
                : remaining !== undefined
                  ? `最短还需 ${remaining} 步`
                  : loadError
                    ? "距离表未能载入"
                    : "正在读取距离表…"}
            </p>
            <div className="kl-actions">
              <button
                className="kl-button"
                disabled={!distances || solved}
                onClick={suggest}
              >
                给点提示
              </button>
              <button
                className="kl-button"
                disabled={!moves}
                onClick={() => {
                  setHistory(history.slice(0, -1));
                  setHint(undefined);
                  setNotice("已撤销上一步。");
                }}
              >
                撤销
              </button>
              <button className="kl-button" onClick={reset}>
                重来
              </button>
              <button
                className="kl-button kl-primary"
                aria-expanded={showLab}
                aria-controls="kl-theory"
                onClick={() => setShowLab(!showLab)}
              >
                {showLab ? "收起理论学习" : "理论学习 · 为什么有解？"}
              </button>
            </div>
          </aside>
          <div className="kl-play" id="kl-play">
            <KlotskiBoard
              board={board}
              onMove={play}
              hint={hint}
              disabled={solved}
              escaped={solved}
            />
            <p className="kl-notice" role="status">
              {solved ? "曹操已到达出口，通关！" : notice}
            </p>
          </div>
        </div>
      </div>
      <section
        id="kl-theory"
        ref={theory}
        className="kl-theory"
        hidden={!showLab}
      >
        <a
          href={numbers ? "#kl-number-play" : "#kl-play"}
          className="notes-back"
        >
          ↑ 回到棋盘
        </a>
        <h2>理论学习</h2>
        <KlotskiLab board={board} distances={distances} loadError={loadError} />
      </section>
      <dialog
        className="kl-completion"
        ref={result}
        aria-labelledby="kl-completion-title"
      >
        <h2 id="kl-completion-title">曹操出关了</h2>
        <p>
          {moves} 步 · 用时 {time}
        </p>
        <div className="kl-actions">
          <button className="kl-button kl-primary" onClick={reset}>
            再玩一局
          </button>
          <button className="kl-button" onClick={() => result.current?.close()}>
            查看盘面
          </button>
        </div>
      </dialog>
    </div>
  );
}
