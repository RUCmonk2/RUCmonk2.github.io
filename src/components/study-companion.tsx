"use client";

import "./study-companion.css";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Companion = {
  id: string;
  name: { zh: string; en: string };
  fullChineseName?: string;
  greeting: { zh: string; en: string };
  image: { kind: "sprite" | "portrait"; src: string };
};

const companions: Companion[] = [
  {
    id: "yinyue",
    name: { zh: "银月", en: "Yinyue" },
    greeting: { zh: "慢慢读，银月陪你。", en: "Take your time. I’m here." },
    image: { kind: "sprite", src: "/images/companions/yinyue.webp" },
  },
  {
    id: "fusheng-charlotte",
    name: { zh: "小夏", en: "Charlotte" },
    fullChineseName: "浮生小夏",
    greeting: { zh: "歇一歇，再赴山海。", en: "A little rest, then onward." },
    image: { kind: "sprite", src: "/images/companions/fusheng-charlotte.webp" },
  },
  {
    id: "gpt",
    name: { zh: "GPT 娘", en: "GPT Girl" },
    greeting: { zh: "我在这儿，陪你慢慢看。", en: "I’m here. Take your time." },
    image: { kind: "portrait", src: "/images/visitors/gpt-bride.webp" },
  },
  {
    id: "claude",
    name: { zh: "Claude 娘", en: "Claude Girl" },
    greeting: { zh: "读累了，就歇一会儿。", en: "Take a break if you need one." },
    image: { kind: "portrait", src: "/images/visitors/claude-bride.webp" },
  },
];

export function StudyCompanion({ english }: { english: boolean }) {
  const [pet, setPet] = useState(companions[0]);
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
  const locale = english ? "en" : "zh";
  const name = english ? pet.name.en : (pet.fullChineseName ?? pet.name.zh);
  const isPortrait = pet.image.kind === "portrait";

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
    if (isPortrait || closed || paused) return;
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
  }, [action, closed, isPortrait, paused]);

  useEffect(() => {
    if (isPortrait || closed || paused || action !== "idle") return;
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
  }, [action, closed, isPortrait, paused]);

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
          {reacting ? pet.greeting[locale] : ""}
        </div>
        <button
          ref={characterRef}
          className={`companion-character action-${action}`}
          type="button"
          onClick={greet}
          aria-label={english ? `Greet ${name}` : `和${name}打招呼`}
        >
          {isPortrait ? (
            <Image
              key={`${pet.id}-${action}`}
              className="companion-portrait"
              data-reacting={reacting || undefined}
              src={pet.image.src}
              alt=""
              width={640}
              height={960}
              unoptimized
              style={{ animationPlayState: paused ? "paused" : "running" }}
            />
          ) : (
            <span
              key={`${pet.id}-${action}`}
              className={`companion-sprite sprite-${action} ${direction !== null ? "is-looking" : ""}`}
              style={{
                backgroundImage: `url(${pet.image.src})`,
                animationPlayState: paused ? "paused" : "running",
                backgroundPosition: spritePosition,
              }}
              aria-hidden="true"
            />
          )}
        </button>
        <div
          className="companion-options"
          role="group"
          aria-label={english ? "Choose companion" : "选择小伴"}
        >
          {companions.map((companion) => (
            <button
              key={companion.id}
              type="button"
              aria-pressed={pet.id === companion.id}
              onClick={() => {
                setPet(companion);
                resetAction();
              }}
            >
              {companion.name[locale]}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
