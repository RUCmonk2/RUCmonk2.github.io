"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

import styles from "./lesson-outline.module.css";

type Section = { id: string; title: string };

/** Section navigation keeps the URL hash reserved for the selected concept. */
export function LessonOutline({
  children,
  enabled,
  contentVersion,
  en,
}: {
  children: ReactNode;
  enabled: boolean;
  contentVersion: string;
  en: boolean;
}) {
  const prefix = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDetailsElement>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled || !contentRef.current) return;
    const headings = Array.from(
      contentRef.current.querySelectorAll<HTMLElement>(
        ".mathmap-lesson-header h2, .mathmap-lesson-prose > h2",
      ),
    );
    const next = headings.map((heading, index) => {
      heading.id = `${prefix}-section-${index}`;
      heading.tabIndex = -1;
      return {
        id: heading.id,
        title:
          index === 0
            ? en
              ? "Lesson overview"
              : "本节概览"
            : heading.textContent?.trim() || "",
      };
    });
    setSections(next);
    if (mobileRef.current) mobileRef.current.open = false;

    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = window.innerWidth <= 900 ? 165 : 135;
      let current = headings[0]?.id ?? "";
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > threshold) break;
        current = heading.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(contentRef.current);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [contentVersion, enabled, en, prefix]);

  if (!enabled) return children;

  const jump = (id: string) => {
    const heading = document.getElementById(id);
    if (!heading) return;
    if (mobileRef.current) mobileRef.current.open = false;
    heading.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    heading.focus({ preventScroll: true });
  };
  const links = (
    <ul>
      {sections.map((section) => (
        <li key={section.id}>
          <button
            type="button"
            onClick={() => jump(section.id)}
            aria-current={active === section.id ? "location" : undefined}
          >
            {section.title}
          </button>
        </li>
      ))}
    </ul>
  );
  const label = en ? "On this page" : "本页目录";
  const currentTitle = sections.find((section) => section.id === active)?.title;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.outline} aria-label={label}>
          <p className={styles.label}>{label}</p>
          {links}
        </nav>
      </aside>
      <details className={styles.mobile} ref={mobileRef}>
        <summary>
          <span>{label}</span>
          <span className={styles.current}>{currentTitle}</span>
        </summary>
        <nav className={styles.outline} aria-label={label}>
          {links}
        </nav>
      </details>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
}
