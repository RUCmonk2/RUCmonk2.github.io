"use client";

import "./study-companion.css";

import { useEffect, useRef, useState } from "react";

export function StudyCompanion({ english }: { english: boolean }) {
  const [pet, setPet] = useState<"yinyue" | "fusheng-charlotte">("yinyue");
  const [closed, setClosed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [action, setAction] = useState<
    "idle" | "wave" | "jump" | "tilt" | "walk-left" | "walk-right"
  >("idle");
  const [look, setLook] = useState<number | null>(null);
  const characterRef = useRef<HTMLButtonElement>(null);
  const lastReaction = useRef("");
  const nearby = useRef(false);
  const reacting = action === "wave" || action === "jump" || action === "tilt";
  const [paused, setPaused] = useState(false);
  const name =
    pet === "yinyue"
      ? english
        ? "Yinyue"
        : "银月"
      : english
        ? "Charlotte"
        : "浮生小夏";

  useEffect(() => {
    const sync = () => {
      setPaused(document.hidden);
      if (document.hidden) {
        setAction("idle");
        setLook(null);
        nearby.current = false;
      }
    };
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (action === "idle" || paused || closed) return;
    const walking = action === "walk-left" || action === "walk-right";
    const timer = window.setTimeout(
      () => {
        setAction(action === "walk-left" ? "walk-right" : "idle");
      },
      walking ? 1200 : 2100,
    );
    return () => window.clearTimeout(timer);
  }, [action, paused, closed]);

  useEffect(() => {
    if (closed || paused) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 761px) and (pointer: fine)");
    let lastMove = 0;
    let release: ReturnType<typeof setTimeout> | undefined;
    const reset = () => {
      setLook(null);
      nearby.current = false;
    };
    const move = (event: PointerEvent) => {
      if (motion.matches || !desktop.matches || event.pointerType !== "mouse")
        return;
      const now = performance.now();
      if (now - lastMove < 90) return;
      lastMove = now;
      const box = characterRef.current?.getBoundingClientRect();
      if (!box) return;
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height * 0.35);
      const distance = Math.hypot(dx, dy);
      nearby.current = distance < 320;
      clearTimeout(release);
      if (action === "idle" && distance > 28 && distance < 320) {
        // Atlas directions start at twelve o'clock and proceed clockwise.
        const angle = (Math.atan2(dx, -dy) + Math.PI * 2) % (Math.PI * 2);
        setLook(Math.round(angle / (Math.PI / 8)) % 16);
      } else setLook(null);
      release = setTimeout(() => setLook(null), 1600);
    };
    const changed = () => {
      reset();
      setAction("idle");
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    motion.addEventListener("change", changed);
    desktop.addEventListener("change", changed);
    return () => {
      clearTimeout(release);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", changed);
      desktop.removeEventListener("change", changed);
    };
  }, [action, closed, paused]);

  useEffect(() => {
    if (closed || paused || action !== "idle") return;
    const timer = window.setInterval(() => {
      if (
        document.hidden ||
        nearby.current ||
        characterRef.current?.parentElement?.contains(document.activeElement)
      )
        return;
      if (
        !window.matchMedia(
          "(min-width: 761px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        ).matches
      )
        return;
      setLook(null);
      setAction("walk-left");
    }, 45000);
    return () => window.clearInterval(timer);
  }, [action, closed, paused]);

  const greet = () => {
    const options = (["wave", "jump", "tilt"] as const).filter(
      (item) => item !== lastReaction.current,
    );
    const next = options[Math.floor(Math.random() * options.length)];
    lastReaction.current = next;
    setLook(null);
    setAction(next);
  };
  const resetAction = () => {
    setAction("idle");
    setLook(null);
    nearby.current = false;
  };
  const direction = action === "tilt" ? 3 : action === "idle" ? look : null;
  const spritePosition =
    direction === null
      ? undefined
      : `${((direction % 8) / 7) * 100}% ${direction < 8 ? 90 : 100}%`;

  return (
    <aside
      className={`study-companion ${closed ? "is-closed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}
      aria-label={english ? "Page companion" : "山间小伴"}
    >
      <button
        className="companion-reopen"
        type="button"
        onClick={() => {
          setClosed(false);
          setMobileOpen(true);
        }}
        aria-label={english ? "Show companion" : "展开山间小伴"}
      >
        {english ? "Companion" : "小伴"}
        <span aria-hidden="true">✧</span>
      </button>
      <div className="companion-body">
        <button
          className="companion-close"
          type="button"
          onClick={() => {
            setClosed(true);
            setMobileOpen(false);
            resetAction();
          }}
          aria-label={english ? "Minimize companion" : "收起小伴"}
        >
          ×
        </button>
        <div className="companion-bubble" role="status">
          {reacting
            ? pet === "yinyue"
              ? english
                ? "Take your time. I’m here."
                : "慢慢读，银月陪你。"
              : english
                ? "A little rest, then onward."
                : "歇一歇，再赴山海。"
            : ""}
        </div>
        <button
          ref={characterRef}
          className={`companion-character action-${action}`}
          type="button"
          onClick={greet}
          aria-label={english ? `Greet ${name}` : `和${name}打招呼`}
        >
          <span
            key={`${pet}-${action}`}
            className={`companion-sprite sprite-${action} ${direction !== null ? "is-looking" : ""}`}
            style={{
              backgroundImage: `url(/images/companions/${pet}.webp)`,
              animationPlayState: paused ? "paused" : "running",
              backgroundPosition: spritePosition,
            }}
            aria-hidden="true"
          />
        </button>
        <div
          className="companion-options"
          role="group"
          aria-label={english ? "Choose companion" : "选择小伴"}
        >
          <button
            type="button"
            aria-pressed={pet === "yinyue"}
            onClick={() => {
              setPet("yinyue");
              resetAction();
            }}
          >
            {english ? "Yinyue" : "银月"}
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            aria-pressed={pet === "fusheng-charlotte"}
            onClick={() => {
              setPet("fusheng-charlotte");
              resetAction();
            }}
          >
            {english ? "Charlotte" : "小夏"}
          </button>
        </div>
      </div>
    </aside>
  );
}
