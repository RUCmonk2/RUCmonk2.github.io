"use client";

import "./home-visitors.css";

import Image from "next/image";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { StudyCompanion } from "@/components/study-companion";

type Visitor = "gpt" | "claude";
type Visit = Visitor | "none";
const sessionKey = "study-visitors-v1";
const Visitors = createContext<{
  active: Visit;
  choose: (visitor: Visit) => void;
  setInView: (visible: boolean) => void;
}>({ active: "none", choose: () => {}, setInView: () => {} });

export function HomeVisitors({
  children,
  english,
}: {
  children: ReactNode;
  english: boolean;
}) {
  const [active, setActive] = useState<Visit>("none");
  const [inView, setInView] = useState(false);
  useEffect(() => {
    let previous: string | null = null;
    try {
      previous = sessionStorage.getItem(sessionKey);
    } catch {
      /* Storage may be disabled. */
    }
    const roll = Math.random();
    const visitor =
      previous === "gpt" || previous === "claude" || previous === "none"
        ? previous
        : roll < 1 / 6
          ? "gpt"
          : roll < 1 / 3
            ? "claude"
            : "none";
    setActive(visitor);
    try {
      sessionStorage.setItem(sessionKey, visitor);
    } catch {
      /* Keep this page usable without storage. */
    }
  }, []);
  const choose = (visitor: Visit) => {
    setInView(false);
    setActive(visitor);
    try {
      sessionStorage.setItem(sessionKey, visitor);
    } catch {
      /* Optional persistence. */
    }
    if (visitor !== "none")
      requestAnimationFrame(() => {
        document.getElementById(`visitor-${visitor}`)?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "center",
        });
      });
  };
  return (
    <Visitors.Provider value={{ active, choose, setInView }}>
      <main
        className="pure-home study-home home-visitors"
        data-visitor-in-view={inView || undefined}
      >
        <StudyCompanion english={english} />
        {children}
      </main>
    </Visitors.Provider>
  );
}

export function VisitorScene({
  visitor,
  english,
}: {
  visitor: Visitor;
  english: boolean;
}) {
  const { active, choose, setInView } = useContext(Visitors);
  const figure = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    setRevealed(false);
    if (active !== visitor || !figure.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(figure.current);
    return () => {
      observer.disconnect();
      setInView(false);
    };
  }, [active, visitor, setInView]);
  if (active !== visitor) return null;
  const name =
    visitor === "gpt"
      ? english
        ? "GPT girl"
        : "GPT 娘"
      : english
        ? "Claude girl"
        : "Claude 娘";
  return (
    <figure
      ref={figure}
      id={`visitor-${visitor}`}
      className={`visitor-scene visitor-${visitor} ${revealed ? "is-revealed" : ""}`}
    >
      <Image
        src={`/images/visitors/${visitor === "gpt" ? "gpt-lab" : "claude-bride"}.webp`}
        width={640}
        height={960}
        unoptimized
        alt={
          visitor === "gpt"
            ? english
              ? "GPT girl in a white lab coat, holding a clipboard"
              : "穿白大褂、拿着记录板的 GPT 娘"
            : english
              ? "Claude girl in a wedding dress among flowering branches"
              : "花枝间身着婚纱的 Claude 娘"
        }
        sizes="(max-width: 760px) 160px, 240px"
      />
      <figcaption>
        {name}
        <span aria-hidden="true"> · </span>
        {english ? "visiting" : "来坐坐"}
      </figcaption>
      <button
        type="button"
        className="visitor-dismiss"
        onClick={() => choose("none")}
        aria-label={english ? `Dismiss ${name}` : `收起${name}`}
      >
        ×
      </button>
    </figure>
  );
}

export function VisitorControls({ english }: { english: boolean }) {
  const { active, choose } = useContext(Visitors);
  return (
    <details className="visitor-controls">
      <summary>
        {english ? "Visitors" : "访客"}
        <span aria-hidden="true"> ✧</span>
      </summary>
      <div
        role="group"
        aria-label={english ? "Invite a visitor" : "请一位访客来坐坐"}
      >
        <button
          type="button"
          aria-pressed={active === "gpt"}
          onClick={() => choose("gpt")}
        >
          {english ? "GPT girl" : "GPT 娘"}
        </button>
        <button
          type="button"
          aria-pressed={active === "claude"}
          onClick={() => choose("claude")}
        >
          {english ? "Claude girl" : "Claude 娘"}
        </button>
        <button type="button" onClick={() => choose("none")}>
          {english ? "Put away" : "收起"}
        </button>
      </div>
    </details>
  );
}
