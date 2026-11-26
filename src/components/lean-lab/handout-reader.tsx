"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { handoutAssets, lessonForPage } from "@/data/lean-lab/handout";
import links from "@/data/lean-lab/handout-links.json";
import titles from "@/data/lean-lab/handout-titles.json";
import { lessonNotes } from "@/data/lean-lab/lessons";
import type { LearningLocale } from "@/data/learning/types";

import book from "./handout-reader.module.css";
import lab from "./lean-lab.module.css";

export function HandoutReader({ locale }: { locale: LearningLocale }) {
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const labPath = (en ? "/en" : "") + "/learning/lean-lab/";
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const frame = useRef<HTMLDivElement>(null);
  const pdf = handoutAssets + "/lean-handout.pdf";
  const lesson = lessonForPage(page);

  function scrollToPage(number: number) {
    const viewport = frame.current;
    const sheet = viewport?.children[number - 1] as HTMLElement | undefined;
    if (viewport && sheet)
      viewport.scrollTo({ top: sheet.offsetTop, left: 0, behavior: "instant" });
  }

  useLayoutEffect(() => {
    function readPage() {
      const value = Number(new URLSearchParams(location.search).get("page"));
      const selected =
        Number.isInteger(value) && value >= 1 && value <= titles.length
          ? value
          : 1;
      setPage(selected);
      scrollToPage(selected);
    }
    readPage();
    window.addEventListener("popstate", readPage);
    return () => window.removeEventListener("popstate", readPage);
  }, [zoom]);

  function record(value: number) {
    setPage(value);
    const url = new URL(location.href);
    url.searchParams.set("page", String(value));
    history.replaceState(history.state, "", url);
  }

  function turn(value: number) {
    if (value < 1 || value > titles.length) return;
    scrollToPage(value);
    record(value);
  }

  function trackPage() {
    const viewport = frame.current;
    if (!viewport) return;
    if (
      viewport.scrollTop + viewport.clientHeight >=
      viewport.scrollHeight - 1
    ) {
      if (page !== titles.length) record(titles.length);
      return;
    }
    const line = viewport.scrollTop + Math.min(96, viewport.clientHeight / 3);
    const next = Array.from(viewport.children).findIndex((sheet) => {
      const el = sheet as HTMLElement;
      return el.offsetTop + el.offsetHeight > line;
    });
    if (next >= 0 && next + 1 !== page) record(next + 1);
  }

  return (
    <main className={lab.page}>
      <div className={book.shell}>
        <Link href={labPath} className={book.back}>
          ← {t("Lean 实验室", "Lean Lab")}
        </Link>
        <header className={book.heading}>
          <h1>
            {t(
              "从第一行 Lean 到算法正确性",
              "From your first Lean proof to algorithm correctness",
            )}
          </h1>
          <p>
            {t(
              "中文自学讲义 · 22 页 · 含练习和参考解答",
              "Chinese self-study handout · 22 pages · Exercises and worked solutions",
            )}
          </p>
        </header>
        <section
          className={book.reader}
          aria-label={t("讲义阅读器", "Handout reader")}
        >
          <div className={book.controls}>
            <button
              type="button"
              disabled={page === 1}
              onClick={() => turn(page - 1)}
            >
              {t("上一页", "Previous")}
            </button>
            <label>
              {t("页码", "Page")}{" "}
              <select
                aria-label={t("跳到讲义页", "Go to handout page")}
                value={page}
                onChange={(e) => turn(Number(e.target.value))}
              >
                {titles.map((title, i) => (
                  <option key={title} value={i + 1}>
                    {i + 1} · {title}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              disabled={page === titles.length}
              onClick={() => turn(page + 1)}
            >
              {t("下一页", "Next")}
            </button>
            <label className={book.zoom}>
              {t("缩放", "Zoom")}{" "}
              <select
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              >
                <option value={100}>{t("适合宽度", "Fit width")}</option>
                <option value={150}>150%</option>
                <option value={200}>200%</option>
              </select>
            </label>
          </div>
          <div className={book.foot}>
            <span aria-live="polite">
              {page} / {titles.length}
            </span>
            {lesson && (
              <Link href={labPath + "?lesson=" + lesson + "#proof"}>
                {t("动手验证", "Try the proof")} ·{" "}
                {lessonNotes[lesson].title[locale]} →
              </Link>
            )}
          </div>
          <div
            ref={frame}
            onScroll={trackPage}
            className={book.viewport}
            tabIndex={0}
            aria-label={t(
              "讲义页，使用翻页键翻页",
              "Current page, use Page Up or Page Down to turn",
            )}
            onKeyDown={(e) => {
              if (e.key === "PageUp" || e.key === "PageDown") {
                e.preventDefault();
                turn(page + (e.key === "PageUp" ? -1 : 1));
              }
            }}
          >
            {titles.map((title, i) => (
              <div
                key={title}
                className={book.paper}
                style={{ width: zoom + "%" }}
              >
                <Image
                  unoptimized
                  src={
                    handoutAssets +
                    "/pages/page-" +
                    String(i + 1).padStart(2, "0") +
                    ".webp"
                  }
                  width={1254}
                  height={1709}
                  alt={t("讲义第", "Handout page ") + (i + 1) + " · " + title}
                />
                {links[i].map(({ box, url }, j) => (
                  <a
                    key={j}
                    className={book.pdfLink}
                    href={
                      url.startsWith(
                        "https://yeyaozhi.eu.cc/learning/lean-lab/",
                      )
                        ? url.replace(
                            "https://yeyaozhi.eu.cc/learning/lean-lab/",
                            labPath,
                          )
                        : url
                    }
                    aria-label={
                      url.includes("?lesson=")
                        ? t("打开对应实验", "Open corresponding proof")
                        : url
                    }
                    style={{
                      left: box[0] + "%",
                      top: box[1] + "%",
                      width: box[2] + "%",
                      height: box[3] + "%",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
        <div className={book.links}>
          <a href={pdf + "#page=" + page} target="_blank" rel="noreferrer">
            {t("用 PDF 阅读器打开本页", "Open this page in your PDF viewer")} ↗
          </a>
          <a href={pdf} download>
            {t("下载 PDF", "Download PDF")}
          </a>
          <a href={handoutAssets + "/lean-handout.tex"} download>
            {t("LaTeX 源文件", "LaTeX source")}
          </a>
          <a href={handoutAssets + "/Practice.lean"} download>
            {t("可运行的练习解答", "Runnable Lean solutions")}
          </a>
        </div>
      </div>
    </main>
  );
}
