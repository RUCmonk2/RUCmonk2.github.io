"use client";

import "./folding.css";

import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Lightbulb,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Settings2,
  Shuffle,
  Undo2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  applyFold,
  boardsEqual,
  CURRENT_PUZZLE_VERSION,
  type FoldAction,
  getGeometry,
  LEVEL_LABELS,
  type Puzzle,
  type PuzzleConfig,
  type PuzzleVersion,
  type Shape,
  SHAPE_LABELS,
} from "@/lib/math-lab/folding";

import {
  COLOR_NAMES,
  COLORS,
  type FoldAnimation,
  type FoldHistoryStep,
  FoldingBoard,
  sameLine,
} from "./folding-board";

const STORAGE = "folding-workshop:v2";
const LEGACY_STORAGE = "folding-workshop:v1";
const DEFAULT_CONFIG: PuzzleConfig = {
  seed: "first-fold",
  shape: "square",
  size: 4,
  level: 2,
};
type Session = {
  puzzle: Puzzle;
  moves: string[];
  boards: number[][];
  assisted: boolean;
  elapsed: number;
};
type Saved = {
  version: PuzzleVersion;
  config: PuzzleConfig;
  moves: string[];
  assisted: boolean;
  elapsed: number;
};
type Hint = { path: string[] | null; stage: number; pending: boolean };
const configKey = (config: PuzzleConfig) =>
  JSON.stringify([config.seed, config.shape, config.size, config.level]);

function validPuzzleVersion(value: unknown): value is PuzzleVersion {
  return value === 1 || value === 2;
}
function validConfig(value: unknown): value is PuzzleConfig {
  if (!value || typeof value !== "object") return false;
  const c = value as PuzzleConfig;
  return (
    typeof c.seed === "string" &&
    c.seed.length > 0 &&
    c.seed.length <= 80 &&
    ["square", "rectangle", "triangle"].includes(c.shape) &&
    Number.isInteger(c.size) &&
    c.size >= 3 &&
    c.size <= 7 &&
    Number.isInteger(c.level) &&
    c.level >= 1 &&
    c.level <= 5
  );
}
function readSaved(
  config?: PuzzleConfig,
  version?: PuzzleVersion,
): Saved | null {
  for (const key of [STORAGE, LEGACY_STORAGE]) {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "null");
      if (
        validPuzzleVersion(saved?.version) &&
        validConfig(saved.config) &&
        (!config || configKey(saved.config) === configKey(config)) &&
        (version === undefined || saved.version === version) &&
        Array.isArray(saved.moves) &&
        saved.moves.length <= 500 &&
        saved.moves.every((move: unknown) => typeof move === "string") &&
        Number.isFinite(saved.elapsed) &&
        saved.elapsed >= 0
      )
        return {
          ...saved,
          assisted: Boolean(saved.assisted),
          elapsed: Math.min(saved.elapsed, 86400 * 30),
        };
    } catch {
      /* A damaged newer save can still fall back to the untouched legacy save. */
    }
  }
  return null;
}
function restoreSession(puzzle: Puzzle, saved: Saved | null): Session {
  const result: Session = {
    puzzle,
    moves: [],
    boards: [puzzle.initial],
    assisted: false,
    elapsed: 0,
  };
  if (
    !saved ||
    saved.version !== puzzle.version ||
    configKey(saved.config) !== configKey(puzzle.config)
  )
    return result;
  const geometry = getGeometry(puzzle.config.shape, puzzle.config.size);
  if (
    saved.moves.some(
      (id) => !geometry.actions.some((action) => action.id === id),
    )
  )
    return result;
  for (const id of saved.moves) {
    const action = geometry.actions.find((a) => a.id === id);
    if (!action) return result;
    result.boards.push(
      applyFold(result.boards[result.boards.length - 1], action),
    );
    result.moves.push(id);
  }
  return { ...result, assisted: saved.assisted, elapsed: saved.elapsed };
}
function newSeed() {
  return Array.from(crypto.getRandomValues(new Uint32Array(2)), (n) =>
    n.toString(36),
  ).join("-");
}
function dailySeed() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)!.value;
  return `daily-${part("year")}-${part("month")}-${part("day")}`;
}
function updateUrl(config: PuzzleConfig, version: PuzzleVersion) {
  const url = new URL(window.location.href);
  url.search = new URLSearchParams({
    v: String(version),
    seed: config.seed,
    shape: config.shape,
    size: String(config.size),
    level: String(config.level),
  }).toString();
  window.history.replaceState(null, "", url);
}
function clock(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}

export function FoldingWorkshop({ locale }: { locale: "zh" | "en" }) {
  const [session, setSession] = useState<Session | null>(null);
  const [draft, setDraft] = useState(DEFAULT_CONFIG);
  const [generating, setGenerating] = useState(true);
  const [notice, setNotice] = useState("正在准备你的第一张折叠图…");
  const [showHistory, setShowHistory] = useState(true);
  const [viewedStep, setViewedStep] = useState<number>();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [symbols, setSymbols] = useState(false);
  const [differences, setDifferences] = useState(false);
  const [animation, setAnimation] = useState<FoldAnimation | null>(null);
  const [hint, setHint] = useState<Hint | null>(null);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [demo, setDemo] = useState<{ index: number; playing: boolean } | null>(
    null,
  );
  const [best, setBest] = useState<number | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [focusSettings, setFocusSettings] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    serial: number;
  } | null>(null);
  const toastSerial = useRef(0);
  const completionDialog = useRef<HTMLDialogElement>(null);
  const completionClose = useRef<HTMLButtonElement>(null);
  const completionPending = useRef(false);
  const completionShown = useRef(false);
  const worker = useRef<Worker | null>(null);
  const targetDialog = useRef<HTMLDialogElement>(null);
  const request = useRef(0);
  const restoring = useRef<Saved | null>(null);
  const busy = useRef(false);
  const animationSerial = useRef(0);
  const latest = useRef(session);
  const hintBoard = useRef("");
  useEffect(() => {
    latest.current = session;
  }, [session]);

  useEffect(() => {
    let engine: Worker;
    try {
      engine = new Worker(new URL("./folding.worker.ts", import.meta.url));
    } catch {
      setGenerating(false);
      setNotice("出题器未能启动，请刷新页面后再试。");
      return;
    }
    worker.current = engine;
    engine.onmessage = ({
      data,
    }: MessageEvent<{
      id: number;
      kind: string;
      error?: string;
      result: Puzzle | string[] | null;
    }>) => {
      if (data.id !== request.current) return;
      if (data.error) {
        setGenerating(false);
        busy.current = false;
        setHint(null);
        setNotice("这道题暂时没准备好，请点击「换一题」重试。");
        return;
      }
      if (data.kind === "generate") {
        const puzzle = data.result as Puzzle;
        const next = restoreSession(puzzle, restoring.current);
        setSession(next);
        latest.current = next;
        setDraft(puzzle.config);
        setGenerating(false);
        busy.current = false;
        setNotice(
          next.moves.length
            ? "已接上你上次的进度。"
            : "按住想翻过去的色块，拖到折线另一侧后松手。",
        );
        updateUrl(puzzle.config, puzzle.version);
      } else {
        const current = latest.current;
        if (
          !current ||
          current.boards[current.boards.length - 1].join(",") !==
            hintBoard.current
        )
          return;
        setHint({
          path: data.result as string[] | null,
          stage: 1,
          pending: false,
        });
      }
    };
    engine.onerror = () => {
      setGenerating(false);
      busy.current = false;
      setHint(null);
      setNotice("出题器连接中断，请刷新页面重新开始。");
    };
    const params = new URLSearchParams(window.location.search);
    const linkedVersion = Number(params.get("v"));
    const linked = {
      seed: params.get("seed"),
      shape: params.get("shape"),
      size: Number(params.get("size")),
      level: Number(params.get("level")),
    };
    if (
      params.has("seed") &&
      (!validPuzzleVersion(linkedVersion) || !validConfig(linked))
    ) {
      setGenerating(false);
      setNotice(
        !validPuzzleVersion(linkedVersion)
          ? "这个题目链接使用了暂不支持的版本。可以点击「换一题」开始新练习。"
          : "题目链接的参数不完整。请检查链接，或点击「换一题」。",
      );
      return () => {
        engine.terminate();
        worker.current = null;
      };
    }
    const linkedPuzzle =
      validPuzzleVersion(linkedVersion) && validConfig(linked)
        ? { config: linked, version: linkedVersion }
        : null;
    const saved = linkedPuzzle
      ? readSaved(linkedPuzzle.config, linkedPuzzle.version)
      : readSaved();
    const config = linkedPuzzle?.config ??
      saved?.config ?? {
        ...DEFAULT_CONFIG,
        seed: newSeed(),
      };
    const version =
      linkedPuzzle?.version ?? saved?.version ?? CURRENT_PUZZLE_VERSION;
    restoring.current =
      saved &&
      saved.version === version &&
      configKey(saved.config) === configKey(config)
        ? saved
        : null;
    engine.postMessage({
      id: ++request.current,
      kind: "generate",
      config,
      version,
    });
    return () => {
      engine.terminate();
      worker.current = null;
    };
  }, []);

  const puzzle = session?.puzzle;
  const geometry = useMemo(
    () =>
      puzzle ? getGeometry(puzzle.config.shape, puzzle.config.size) : null,
    [puzzle],
  );
  const board = session?.boards[session.boards.length - 1] ?? [];
  const displayed = demo && puzzle ? puzzle.states[demo.index] : board;
  const selected = geometry?.actions.find((a) => a.id === selectedId);
  const solved = Boolean(puzzle && boardsEqual(board, puzzle.target));
  const matched = puzzle
    ? displayed.reduce(
        (sum, color, id) => sum + Number(color === puzzle.target[id]),
        0,
      )
    : 0;

  const moves = session?.moves;
  const history = useMemo(() => {
    if (!geometry || !moves) return [];
    const actions = new Map(
      geometry.actions.map((action) => [action.id, action]),
    );
    return moves.flatMap((id, index): FoldHistoryStep[] => {
      const action = actions.get(id);
      return action ? [{ number: index + 1, action }] : [];
    });
  }, [geometry, moves]);
  const reviewed = history.find((step) => step.number === viewedStep);
  const reviewedCells =
    showHistory && reviewed && session
      ? reviewed.action.mapping.flatMap(([, id]) =>
          session.boards[reviewed.number - 1][id] !==
          session.boards[reviewed.number][id]
            ? [id]
            : [],
        )
      : undefined;
  const settingsChanged = Boolean(
    puzzle &&
    (draft.shape !== puzzle.config.shape ||
      draft.size !== puzzle.config.size ||
      draft.level !== puzzle.config.level),
  );
  useEffect(() => {
    document.body.classList.toggle("fold-focus-active", focusMode);
    const escape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !document.querySelector("dialog[open]") &&
        !document.querySelector(".fold-grabbing")
      )
        setFocusMode(false);
    };
    if (focusMode) document.addEventListener("keydown", escape);
    return () => {
      document.body.classList.remove("fold-focus-active");
      document.removeEventListener("keydown", escape);
    };
  }, [focusMode]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (
      completionPending.current &&
      solved &&
      !animation &&
      !demo &&
      !generating &&
      completionDialog.current
    ) {
      completionPending.current = false;
      completionDialog.current.showModal();
      completionClose.current?.focus();
    }
  }, [solved, animation, demo, generating]);
  function notify(message: string) {
    setNotice("");
    setToast({ message, serial: ++toastSerial.current });
  }
  function clearCompletion() {
    completionPending.current = false;
    completionShown.current = false;
    completionDialog.current?.close();
    setToast(null);
  }

  useEffect(() => {
    if (!session || generating) return;
    const saved: Saved = {
      version: session.puzzle.version,
      config: session.puzzle.config,
      moves: session.moves,
      assisted: session.assisted,
      elapsed: session.elapsed,
    };
    try {
      localStorage.setItem(STORAGE, JSON.stringify(saved));
    } catch {
      /* Optional persistence. */
    }
  }, [session, generating]);
  useEffect(() => {
    if (!puzzle || solved || generating || demo) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible")
        setSession((s) => (s ? { ...s, elapsed: s.elapsed + 1 } : s));
    }, 1000);
    return () => clearInterval(timer);
  }, [puzzle, solved, generating, demo]);
  useEffect(() => {
    if (!puzzle) return;
    try {
      const key = `folding-best:rules2:puzzle${puzzle.version}:${configKey(puzzle.config)}`;
      const raw = localStorage.getItem(key),
        previous = raw === null ? null : Number(raw);
      const valid =
        previous !== null && Number.isInteger(previous) && previous > 0
          ? previous
          : null;
      if (solved && session && !session.assisted) {
        const next =
          valid === null
            ? session.moves.length
            : Math.min(valid, session.moves.length);
        localStorage.setItem(key, String(next));
        setBest(next);
      } else setBest(valid);
    } catch {
      setBest(null);
    }
  }, [puzzle, solved, session?.assisted, session?.moves.length]);
  useEffect(() => {
    if (!demo?.playing || !puzzle || !geometry || animation) return;
    if (demo.index >= puzzle.solution.length) {
      setDemo({ ...demo, playing: false });
      return;
    }
    const timer = window.setTimeout(() => {
      const action = geometry.actions.find(
        (a) => a.id === puzzle.solution[demo.index],
      );
      if (!action) return;
      busy.current = true;
      setSelectedId(action.id);
      setAnimation({
        action,
        before: puzzle.states[demo.index],
        serial: ++animationSerial.current,
      });
      setDemo({ index: demo.index + 1, playing: true });
    }, 500);
    return () => clearTimeout(timer);
  }, [demo, puzzle, geometry, animation]);

  function cancelAnimation() {
    busy.current = false;
    setAnimation(null);
  }
  function generate(config: PuzzleConfig) {
    if (!worker.current) {
      setNotice("请刷新页面，重新连接出题器。");
      return;
    }
    cancelAnimation();
    clearCompletion();
    setFocusSettings(false);
    busy.current = true;
    restoring.current = null;
    setViewedStep(undefined);
    setGenerating(true);
    setDemo(null);
    setAnswerOpen(false);
    setHint(null);
    setSelectedId(null);
    setNotice("正在铺开一张新图…");
    worker.current.postMessage({
      id: ++request.current,
      kind: "generate",
      config,
      version: CURRENT_PUZZLE_VERSION,
    });
  }
  function reviewStep(number: number) {
    setSelectedId(null);
    setViewedStep((current) => (current === number ? undefined : number));
  }
  function execute(action: FoldAction, assisted = false, fromProgress = 0) {
    if (!session || busy.current || generating || demo || solved) return;
    if (session.moves.length >= 500) {
      setNotice("已经走了很多步，可以撤销或重新开始这道题。");
      return;
    }
    const next = applyFold(board, action);
    if (boardsEqual(next, board)) {
      notify("图案没有变化，未计步。换一条折线试试。");
      return;
    }
    if (boardsEqual(next, session.puzzle.target) && !completionShown.current) {
      completionPending.current = true;
      completionShown.current = true;
    }
    setToast(null);
    setViewedStep(undefined);
    busy.current = true;
    setAnimation({
      action,
      before: board,
      serial: ++animationSerial.current,
      fromProgress,
    });
    setSession({
      ...session,
      boards: [...session.boards, next],
      moves: [...session.moves, action.id],
      assisted: session.assisted || assisted,
    });
    setSelectedId(null);
    setHint(null);
    ++request.current;
    setNotice(
      boardsEqual(next, session.puzzle.target)
        ? "拼好了，每一块色彩都找到了位置。"
        : `第 ${session.moves.length + 1} 折 · ${action.label}`,
    );
  }
  function undo() {
    if (!session || !session.moves.length || generating) return;
    cancelAnimation();
    completionPending.current = false;
    completionDialog.current?.close();
    setDemo(null);
    setHint(null);
    setSelectedId(null);
    ++request.current;
    setSession({
      ...session,
      moves: session.moves.slice(0, -1),
      boards: session.boards.slice(0, -1),
    });
    setViewedStep(undefined);
    notify("已撤销上一折。");
  }
  function reset() {
    if (!session) return;
    cancelAnimation();
    clearCompletion();
    setDemo(null);
    setHint(null);
    setSelectedId(null);
    ++request.current;
    setSession({
      ...session,
      moves: [],
      boards: [session.puzzle.initial],
      elapsed: 0,
    });
    setViewedStep(undefined);
    notify("已回到起点，提示使用记录保留。");
  }
  function askHint() {
    if (!session || !geometry || generating || demo || solved) return;
    setSession({ ...session, assisted: true });
    if (hint?.path) {
      const stage = Math.min(3, hint.stage + 1);
      setHint({ ...hint, stage });
      if (stage >= 2) setSelectedId(hint.path[0]);
      return;
    }
    const index = puzzle!.states.findIndex((state) =>
      boardsEqual(state, board),
    );
    if (index >= 0) {
      setHint({
        path: puzzle!.solution.slice(index),
        stage: 1,
        pending: false,
      });
      return;
    }
    hintBoard.current = board.join(",");
    setHint({ path: null, stage: 0, pending: true });
    worker.current?.postMessage({
      id: ++request.current,
      kind: "hint",
      config: puzzle!.config,
      board,
      target: puzzle!.target,
    });
  }
  function returnToRoute() {
    if (!session || !puzzle || demo || generating) return;
    for (let i = session.boards.length - 1; i >= 0; i--) {
      if (
        puzzle.states.some((state) => boardsEqual(state, session.boards[i]))
      ) {
        cancelAnimation();
        setSession({
          ...session,
          moves: session.moves.slice(0, i),
          boards: session.boards.slice(0, i + 1),
          assisted: true,
        });
        setHint(null);
        setSelectedId(null);
        setViewedStep(undefined);
        setNotice(`已回到第 ${i} 步，可以继续查看提示。`);
        return;
      }
    }
  }
  function revealAnswer() {
    if (!session) return;
    setSession({ ...session, assisted: true });
    setAnswerOpen(!answerOpen);
  }
  function demoStep(index: number, playing = false) {
    if (!puzzle || !geometry || generating) return;
    cancelAnimation();
    ++request.current;
    setHint(null);
    setSelectedId(null);
    setDemo({ index, playing });
  }
  async function share() {
    if (!puzzle) return;
    updateUrl(puzzle.config, puzzle.version);
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify("题目链接已复制。");
    } catch {
      notify("复制未成功，可以复制地址栏里的链接。");
    }
  }
  const hintAction =
    hint?.path && geometry?.actions.find((a) => a.id === hint.path![0]);
  const lineActions =
    selected && geometry
      ? geometry.actions.filter((a) => sameLine(a, selected))
      : [];
  const creaseChoices =
    geometry?.actions.filter(
      (a, i, all) => all.findIndex((b) => sameLine(a, b)) === i,
    ) ?? [];
  const chosenLine = selected
    ? creaseChoices.find((a) => sameLine(a, selected))?.id
    : "";
  const disabled = generating || Boolean(demo) || solved;

  return (
    <section className="fold-workshop" lang="zh" aria-label="折叠益智游戏">
      <div className="fold-mode-bar">
        <div className="fold-mode-label">
          <span>折叠工坊</span>
          {settingsChanged && (
            <span className="fold-pending-label" role="status">
              设置待应用
            </span>
          )}
        </div>
        <div className="fold-mode-actions">
          {focusMode && (
            <button
              className="fold-button"
              aria-expanded={focusSettings}
              aria-controls="fold-settings"
              onClick={() => setFocusSettings(!focusSettings)}
            >
              <Settings2 size={14} />
              {focusSettings ? "收起设置" : "设置"}
            </button>
          )}
          <button
            className="fold-button"
            aria-pressed={focusMode}
            onClick={() => {
              setFocusMode(!focusMode);
              setFocusSettings(false);
            }}
          >
            {focusMode ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {focusMode ? "退出专注" : "专注模式"}
          </button>
        </div>
      </div>
      <div
        id="fold-settings"
        className="fold-settings"
        hidden={focusMode && !focusSettings}
      >
        <div className="fold-setting-fields">
          <label>
            棋盘
            <select
              aria-label="棋盘形状"
              value={draft.shape}
              disabled={generating}
              onChange={(e) =>
                setDraft({ ...draft, shape: e.target.value as Shape })
              }
            >
              {Object.entries(SHAPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            难度
            <select
              aria-label="题目难度"
              value={draft.level}
              disabled={generating}
              onChange={(e) => {
                const level = Number(e.target.value);
                setDraft({ ...draft, level, size: [3, 4, 4, 5, 6][level - 1] });
              }}
            >
              {LEVEL_LABELS.map((label, i) => (
                <option key={label} value={i + 1}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            规模
            <select
              aria-label="棋盘规模"
              value={draft.size}
              disabled={generating}
              onChange={(e) =>
                setDraft({ ...draft, size: Number(e.target.value) })
              }
            >
              {[3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>
                  {draft.shape === "triangle"
                    ? `边长 ${n * 2} 格`
                    : `${draft.shape === "rectangle" ? n + 2 : n} × ${n}`}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="fold-new-actions">
          <button
            className="fold-button fold-primary"
            onClick={() => generate({ ...draft, seed: newSeed() })}
            disabled={generating}
          >
            <Shuffle size={15} />
            {settingsChanged ? "按新设置开始" : "换一题"}
          </button>
          <button
            className="fold-button"
            disabled={generating}
            onClick={() =>
              generate({
                seed: dailySeed(),
                shape: "square",
                size: 4,
                level: 3,
              })
            }
          >
            每日一折
          </button>
        </div>
      </div>
      {settingsChanged && (!focusMode || focusSettings) && (
        <p className="fold-settings-pending" role="status">
          新设置尚未应用，当前盘面仍是{SHAPE_LABELS[puzzle!.config.shape]} ·{" "}
          {LEVEL_LABELS[puzzle!.config.level - 1]}。点击「按新设置开始」换题。
        </p>
      )}

      {!puzzle || !geometry ? (
        <div className="fold-loading" role="status">
          <span className="fold-loading-mark">◇</span>
          {notice}
        </div>
      ) : (
        <>
          <div className="fold-game" aria-busy={generating}>
            <div className="fold-current">
              <div className="fold-board-heading">
                <div>
                  <span className="fold-eyebrow">
                    {demo ? "SOLUTION / 解答演示" : "YOUR FOLDS / 当前盘面"}
                  </span>
                  <h2>
                    {demo
                      ? "看一次，再自己试。"
                      : solved
                        ? "这一幅，完成了。"
                        : "从这一折开始。"}
                  </h2>
                </div>
                <span className="fold-moves">
                  {solved && !demo && (
                    <span className="fold-completed-badge">
                      <Check size={13} />
                      已完成
                    </span>
                  )}
                  <b>{demo ? demo.index : session.moves.length}</b> 折
                </span>
              </div>
              <div
                className={
                  generating
                    ? "fold-board-stage fold-is-loading"
                    : "fold-board-stage"
                }
              >
                <FoldingBoard
                  geometry={geometry}
                  board={displayed}
                  target={puzzle.target}
                  symbols={symbols}
                  differences={differences}
                  selected={selected}
                  animation={animation}
                  history={
                    showHistory && !demo && !generating ? history : undefined
                  }
                  viewedStep={viewedStep}
                  onReview={reviewStep}
                  reviewedCells={
                    !demo && !generating ? reviewedCells : undefined
                  }
                  disabled={disabled || Boolean(animation)}
                  onSelect={(action) => {
                    setSelectedId(action?.id ?? null);
                    setViewedStep(undefined);
                    setNotice(
                      "蓝色虚线是起点与落点的中垂线，白色亮线是匹配到的折线。",
                    );
                  }}
                  onFold={(action, progress) =>
                    execute(action, false, progress)
                  }
                  onAnimationEnd={() => {
                    busy.current = false;
                    setAnimation(null);
                  }}
                />
                {toast && !generating && !demo && (
                  <div className="fold-toast" key={toast.serial} role="status">
                    {toast.message}
                  </div>
                )}
                {demo &&
                  demo.index === puzzle.solution.length &&
                  !animation && (
                    <div className="fold-demo-finished" role="status">
                      <Check size={16} />
                      演示结束，可回到自己的盘面继续。
                    </div>
                  )}
                {generating && (
                  <div className="fold-board-loading" role="status">
                    正在生成新题…
                  </div>
                )}
              </div>
              {demo ? (
                <div className="fold-demo-controls">
                  <button
                    className="fold-button"
                    onClick={() => setDemo({ ...demo, playing: !demo.playing })}
                    disabled={demo.index === puzzle.solution.length}
                  >
                    {demo.playing ? <Pause size={15} /> : <Play size={15} />}
                    {demo.playing ? "暂停" : "自动播放"}
                  </button>
                  <button
                    className="fold-button"
                    disabled={
                      demo.index >= puzzle.solution.length || Boolean(animation)
                    }
                    onClick={() => demoStep(demo.index + 1)}
                  >
                    下一步
                    <ChevronRight size={14} />
                  </button>
                  <button
                    className="fold-button fold-primary"
                    onClick={() => {
                      cancelAnimation();
                      setDemo(null);
                      setSelectedId(null);
                      setNotice("已回到你的盘面，刚才的进度还在。");
                    }}
                  >
                    回到我的盘面
                  </button>
                </div>
              ) : (
                <div className="fold-direct-controls">
                  <p className="fold-direct-instruction">
                    拖动色块，用起点与落点的垂直平分线匹配折线；跨过亮线后松手。
                  </p>
                  <details className="fold-manual-controls">
                    <summary>
                      用按钮选择折线 <ChevronRight size={13} />
                    </summary>
                    <div className="fold-move-controls">
                      <label className="fold-crease-picker">
                        <span>选择折线</span>
                        <select
                          aria-label="选择折线"
                          disabled={disabled || Boolean(animation)}
                          value={chosenLine ?? ""}
                          onChange={(e) =>
                            setSelectedId(e.target.value || null)
                          }
                        >
                          <option value="">选择一条折线</option>
                          {creaseChoices.map((action, i) => (
                            <option key={action.id} value={action.id}>
                              折线 {i + 1} · {action.label.split("，")[0]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div className="fold-direction-row">
                        {selected ? (
                          <>
                            <div className="fold-directions">
                              {lineActions.map((action) => (
                                <button
                                  key={action.id}
                                  className="fold-direction"
                                  aria-pressed={action.id === selected.id}
                                  disabled={disabled || Boolean(animation)}
                                  onClick={() => setSelectedId(action.id)}
                                >
                                  {action.label}
                                </button>
                              ))}
                            </div>
                            <button
                              className="fold-button fold-primary"
                              disabled={disabled || Boolean(animation)}
                              onClick={() => execute(selected)}
                            >
                              <ArrowRight size={15} />
                              翻折
                            </button>
                            <button
                              className="fold-cancel"
                              onClick={() => setSelectedId(null)}
                            >
                              取消
                            </button>
                          </>
                        ) : (
                          <p>
                            选择折线和方向，再点「翻折」。也可以直接拖动棋盘。
                          </p>
                        )}
                      </div>
                    </div>
                  </details>
                </div>
              )}
              <div className="fold-toolbar">
                <button
                  className="fold-button"
                  onClick={undo}
                  disabled={
                    !session.moves.length || generating || Boolean(demo)
                  }
                >
                  <Undo2 size={15} />
                  撤销
                </button>
                <button
                  className="fold-button"
                  onClick={reset}
                  disabled={generating || Boolean(demo)}
                >
                  <RotateCcw size={14} />
                  重来
                </button>
                <button
                  className="fold-button"
                  onClick={askHint}
                  disabled={disabled || Boolean(animation) || hint?.pending}
                >
                  <Lightbulb size={15} />
                  {hint?.pending ? "正在想…" : "给点提示"}
                </button>
                <button
                  className="fold-text-button"
                  onClick={revealAnswer}
                  disabled={generating}
                >
                  参考解答
                </button>
              </div>
              {!demo && (
                <section className="fold-history" aria-label="折叠历史">
                  <label className="fold-history-toggle">
                    <input
                      type="checkbox"
                      checked={showHistory}
                      onChange={(event) => setShowHistory(event.target.checked)}
                    />
                    显示折叠历史
                  </label>
                  {showHistory && history.length > 0 && (
                    <>
                      <ol className="fold-history-steps">
                        {history.map((step) => (
                          <li key={step.number}>
                            <button
                              type="button"
                              className="fold-button"
                              aria-pressed={viewedStep === step.number}
                              disabled={Boolean(animation) || generating}
                              onClick={() => reviewStep(step.number)}
                            >
                              第 {step.number} 折 · {step.action.label}
                            </button>
                          </li>
                        ))}
                      </ol>
                      {reviewed && (
                        <p className="fold-history-detail">
                          第 {reviewed.number} 折改变了{" "}
                          {reviewedCells?.length ?? 0} 个色块，已在棋盘标出。
                        </p>
                      )}
                    </>
                  )}
                </section>
              )}
              {solved && !animation && !demo && !generating && (
                <div className="fold-complete-strip" role="status">
                  <span>
                    <Check size={16} />
                    已完成 · {session.moves.length} 折 ·{" "}
                    {clock(session.elapsed)}
                  </span>
                  <button
                    className="fold-text-button"
                    onClick={() => completionDialog.current?.showModal()}
                  >
                    查看成绩
                  </button>
                </div>
              )}
            </div>
            <aside className="fold-target">
              <div className="fold-target-heading">
                <span className="fold-eyebrow">THE PATTERN / 目标图案</span>
                <h2>让色彩相遇。</h2>
              </div>
              <button
                className="fold-target-art"
                aria-label="放大目标图案"
                onClick={() => targetDialog.current?.showModal()}
              >
                <FoldingBoard
                  geometry={geometry}
                  board={puzzle.target}
                  symbols={symbols}
                  miniature
                />
                <span className="fold-zoom-label">放大</span>
              </button>
              <div className="fold-target-stats">
                <span>
                  已匹配 <b>{matched}</b> / {puzzle.target.length}
                </span>
                <span>{clock(session.elapsed)}</span>
              </div>
              <div className="fold-palette">
                {COLORS.map((color, i) => (
                  <span
                    key={color}
                    aria-label={COLOR_NAMES[i]}
                    title={COLOR_NAMES[i]}
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="fold-options">
                <label>
                  <input
                    type="checkbox"
                    checked={symbols}
                    onChange={(e) => setSymbols(e.target.checked)}
                  />
                  辅助标记
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={differences}
                    onChange={(e) => setDifferences(e.target.checked)}
                  />
                  标出不同
                </label>
              </div>
              <div className="fold-puzzle-meta">
                <span>
                  {SHAPE_LABELS[puzzle.config.shape]} ·{" "}
                  {LEVEL_LABELS[puzzle.config.level - 1]}
                </span>
                <span>
                  {puzzle.config.seed.startsWith("daily-")
                    ? `每日一折 · ${puzzle.config.seed.slice(6)}`
                    : "随机练习 · 随时接着玩"}
                </span>
                <button className="fold-text-button" onClick={share}>
                  <Copy size={13} />
                  分享这道题
                </button>
              </div>
            </aside>
          </div>
          <p className="fold-notice" role="status">
            {notice}
          </p>
          {hint && (
            <div className="fold-hint" role="status">
              <Lightbulb size={18} />
              <div>
                {hint.pending ? (
                  <p>从你现在的盘面，找一条可走的路…</p>
                ) : hintAction ? (
                  <>
                    <p>
                      {hint.stage === 1
                        ? `下一步可以先观察${Math.abs(hintAction.direction.x) < 0.1 ? "横向" : Math.abs(hintAction.direction.y) < 0.1 ? "竖向" : "斜向"}折线，想想哪一侧的颜色值得保留。`
                        : hint.stage === 2
                          ? "折线已高亮。先比较两侧的图案，再决定覆盖方向。"
                          : `下一折：${hintAction.label}。`}
                    </p>
                    {hint.stage < 3 ? (
                      <button className="fold-text-button" onClick={askHint}>
                        再具体一点
                        <ChevronRight size={13} />
                      </button>
                    ) : (
                      <button
                        className="fold-text-button"
                        disabled={Boolean(animation)}
                        onClick={() => execute(hintAction, true)}
                      >
                        帮我走这一步
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <p>
                      暂时没有找到这一路的后续解法。可以撤销到最近的参考路线，再接着尝试。
                    </p>
                    <button
                      className="fold-text-button"
                      onClick={returnToRoute}
                    >
                      回到最近的参考路线
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          {answerOpen && (
            <div className="fold-answer">
              <div className="fold-answer-heading">
                <h3>把思路慢慢展开。</h3>
                <button
                  className="fold-button"
                  onClick={() => demoStep(0, true)}
                >
                  <Play size={14} />
                  从头演示
                </button>
              </div>
              <p>
                这是一条{puzzle.shortest ? "经过验证的最短" : "可行的参考"}
                路线。其他路线也可以到达目标。演示会保留你的盘面。
              </p>
              <ol>
                {puzzle.solution.map((id, i) => (
                  <li key={`${id}-${i}`}>
                    <button
                      className="fold-solution-step"
                      aria-current={demo?.index === i + 1 ? "step" : undefined}
                      onClick={() => demoStep(i + 1)}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {geometry.actions.find((a) => a.id === id)?.label}
                      <ChevronRight size={14} />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </>
      )}
      {puzzle && session && (
        <dialog
          ref={completionDialog}
          className="fold-completion-dialog"
          aria-labelledby="fold-completion-title"
          onClick={(event) => {
            if (event.target === event.currentTarget)
              completionDialog.current?.close();
          }}
        >
          <div className="fold-completion-body">
            <div className="fold-completion-mark">
              <Check size={28} />
            </div>
            <p className="fold-eyebrow">PATTERN COMPLETE</p>
            <h2 id="fold-completion-title">完成了。</h2>
            <p className="fold-completion-kind">
              {session.assisted ? "借助提示完成" : "独立完成"}
            </p>
            <div className="fold-completion-stats">
              <div>
                <span>你的步数</span>
                <strong>
                  {session.moves.length}
                  <small> 折</small>
                </strong>
              </div>
              <div>
                <span>本次用时</span>
                <strong>{clock(session.elapsed)}</strong>
              </div>
              <div>
                <span>{puzzle.shortest ? "最短解" : "参考解"}</span>
                <strong>
                  {puzzle.solution.length}
                  <small> 折</small>
                </strong>
              </div>
            </div>
            {best !== null && (
              <p className="fold-completion-best">你的独立最佳：{best} 折</p>
            )}
            <div className="fold-completion-actions">
              <button
                className="fold-button fold-primary"
                onClick={() => generate({ ...puzzle.config, seed: newSeed() })}
              >
                下一题
                <ArrowRight size={15} />
              </button>
              <button
                ref={completionClose}
                className="fold-button"
                onClick={() => completionDialog.current?.close()}
              >
                留在这里看看
              </button>
            </div>
          </div>
        </dialog>
      )}
      {puzzle && geometry && (
        <dialog
          ref={targetDialog}
          className="fold-target-dialog"
          aria-label="放大的目标图案"
          onClick={(event) => {
            if (event.target === event.currentTarget)
              targetDialog.current?.close();
          }}
        >
          <div className="fold-dialog-content">
            <div className="fold-answer-heading">
              <h3>目标图案</h3>
              <button
                className="fold-button"
                onClick={() => targetDialog.current?.close()}
              >
                关闭
              </button>
            </div>
            <div className="fold-dialog-board">
              <FoldingBoard
                geometry={geometry}
                board={puzzle.target}
                symbols={symbols}
                miniature
              />
            </div>
          </div>
        </dialog>
      )}
      <details className="fold-rules">
        <summary>
          第一次玩？从这里开始。
          <ChevronRight size={15} />
        </summary>
        <div className="fold-rule-grid">
          <div>
            <span>01 / 观察</span>
            <h3>先看目标。</h3>
            <p>找出目标里重复、对称的颜色，它们可能来自同一次翻折。</p>
          </div>
          <div>
            <span>02 / 翻折</span>
            <h3>镜像，再覆盖。</h3>
            <p>
              按住一侧的色块往另一侧拖，亮线就是当前折线。跨过亮线后松手完成，拖回来或按
              Escape 取消。来源保留，落点被覆盖。
            </p>
          </div>
          <div>
            <span>03 / 尝试</span>
            <h3>随时可以反悔。</h3>
            <p>
              撤销会还原上一折。匹配数可能先降低再升高，不用每一步都追着数字走。
            </p>
          </div>
        </div>
        <div className="fold-lessons">
          <span>循序试一试</span>
          {["镜像一折", "两折组合", "顺序挑战"].map((title, i) => (
            <button
              className="fold-button"
              disabled={generating}
              key={title}
              onClick={() =>
                generate({
                  seed: `lesson-${i + 1}`,
                  shape: "square",
                  size: 3,
                  level: i + 1,
                })
              }
            >
              {title}
              <ArrowRight size={12} />
            </button>
          ))}
        </div>
        <p className="fold-smallprint">
          题目自动保存于本浏览器。每日一折按台北时间更新。大盘的难度是估计分档，参考步数不一定是最短步数。
          {locale === "en" && " This activity is presented in Chinese."}
        </p>
      </details>
    </section>
  );
}
