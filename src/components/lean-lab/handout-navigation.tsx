"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { handoutGroups, unitId } from "@/data/lean-lab/handout";

import s from "./handout-reader.module.css";

export function HandoutNavigation({
  titles,
  english,
  standalone,
}: {
  titles: string[];
  english: boolean;
  standalone: boolean;
}) {
  const [current, setCurrent] = useState(1);
  const [expanded, setExpanded] = useState<number | null>(1);
  const activeGroup = useRef(1);

  useEffect(() => {
    const sections = titles.map((_, index) =>
      document.getElementById(unitId(index + 1)),
    );
    if (standalone) {
      const url = new URL(location.href);
      const old = Number(url.searchParams.get("page"));
      if (
        !url.hash &&
        Number.isInteger(old) &&
        old >= 1 &&
        old <= sections.length
      ) {
        url.searchParams.delete("page");
        url.hash = unitId(old);
        history.replaceState(history.state, "", url);
      }
    }
    let frame = 0;
    function track() {
      frame = 0;
      const line = Math.min(200, window.innerHeight * 0.28);
      let selected = 1;
      for (const [index, section] of sections.entries()) {
        if (!section || section.getBoundingClientRect().top > line) break;
        selected = index + 1;
      }
      setCurrent(selected);
      const group = handoutGroups.find(({ end }) => selected <= end)!.start;
      if (activeGroup.current !== group) {
        activeGroup.current = group;
        setExpanded(group);
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(track);
    }
    let target: HTMLElement | null = null;
    function align() {
      target?.scrollIntoView({ behavior: "instant", block: "start" });
      schedule();
    }
    function followHash() {
      target =
        sections.find(
          (section) => section && "#" + section.id === location.hash,
        ) ?? null;
      align();
    }
    function releaseTarget() {
      target = null;
    }
    const manualEvents = [
      "wheel",
      "touchmove",
      "pointerdown",
      "keydown",
    ] as const;
    for (const event of manualEvents)
      window.addEventListener(event, releaseTarget, { passive: true });
    const article = sections[0]?.closest("article");
    const observer = new ResizeObserver(align);
    if (article) observer.observe(article);
    followHash();
    window.addEventListener("hashchange", followHash);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      for (const event of manualEvents)
        window.removeEventListener(event, releaseTarget);
      window.removeEventListener("hashchange", followHash);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [standalone, titles]);

  return (
    <nav className={s.toc} aria-label={english ? "Contents" : "讲义目录"}>
      <div className={s.tocLabel}>{english ? "Contents" : "讲义目录"}</div>
      <select
        className={s.mobileSelect}
        aria-label={english ? "Go to section" : "跳到小节"}
        value={current}
        onChange={(e) => {
          const id = unitId(Number(e.target.value));
          if (location.hash === "#" + id)
            document
              .getElementById(id)
              ?.scrollIntoView({ behavior: "instant" });
          else location.hash = id;
        }}
      >
        {handoutGroups.map((group) => (
          <optgroup key={group.start} label={group.title}>
            {titles.slice(group.start - 1, group.end).map((title, i) => (
              <option key={title} value={group.start + i}>
                {group.start + i} · {title}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <div className={s.desktopIndex}>
        {handoutGroups.map((group) => (
          <div key={group.start} className={s.group}>
            <button
              type="button"
              aria-expanded={expanded === group.start}
              aria-controls={"toc-group-" + group.start}
              onClick={() =>
                setExpanded(expanded === group.start ? null : group.start)
              }
            >
              {group.title}
              <span aria-hidden="true">
                {expanded === group.start ? "−" : "+"}
              </span>
            </button>
            <ul
              id={"toc-group-" + group.start}
              hidden={expanded !== group.start}
            >
              {titles.slice(group.start - 1, group.end).map((title, i) => {
                const n = group.start + i;
                return (
                  <li key={n}>
                    <a
                      href={"#" + unitId(n)}
                      aria-current={current === n ? "location" : undefined}
                    >
                      <span className={s.indexNum}>
                        {String(n).padStart(2, "0")}
                      </span>
                      {title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function CopyCode({ english }: { english: boolean }) {
  const [feedback, setFeedback] = useState<"copied" | "selected" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <button
      className={s.copy}
      type="button"
      onClick={async (event) => {
        const code = event.currentTarget
          .closest("figure")
          ?.querySelector("pre code");
        if (!code) return;
        try {
          await navigator.clipboard.writeText(code.textContent || "");
          setFeedback("copied");
        } catch {
          const range = document.createRange();
          range.selectNodeContents(code);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          setFeedback("selected");
        }
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setFeedback(null), 2200);
      }}
    >
      {feedback === "copied" ? (
        <Check size={14} aria-hidden />
      ) : (
        <Copy size={14} aria-hidden />
      )}
      <span aria-live="polite">
        {feedback === "copied"
          ? english
            ? "Copied"
            : "已复制"
          : feedback === "selected"
            ? english
              ? "Selected · copy"
              : "已选中，可复制"
            : english
              ? "Copy"
              : "复制"}
      </span>
    </button>
  );
}
