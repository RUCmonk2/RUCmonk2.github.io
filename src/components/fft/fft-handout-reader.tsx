"use client";

import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import handout from "@/data/fft-handout-links.json";

const pages = [
  { id: "overview", zh: "导读与符号", en: "Overview and notation" },
  { id: "dft", zh: "DFT 定义与单位根", en: "DFT and roots of unity" },
  {
    id: "butterfly",
    zh: "从拆奇偶到一只蝶形",
    en: "Even–odd split and the butterfly",
  },
  { id: "disk", zh: "圆形折叠怎样配对", en: "Pairing on the folding disk" },
  { id: "layers", zh: "每一折的不变量", en: "The invariant at each fold" },
  {
    id: "trace",
    zh: "8 点圆盘的三折对照",
    en: "Trace all three folds of 8 points",
  },
  { id: "worked", zh: "四个采样，完整算两折", en: "The four-point example" },
  { id: "matrix", zh: "把 FFT 写成矩阵乘积", en: "Matrix factorization" },
  {
    id: "recursive",
    zh: "递归 C 代码与站点",
    en: "Recursive C code and stations",
  },
  {
    id: "bit-reversal",
    zh: "位反转与数组中的站点",
    en: "Bit reversal and array blocks",
  },
  { id: "iterative", zh: "原地迭代的块计算", en: "In-place block computation" },
  {
    id: "verify",
    zh: "复杂度、逆变换与验算",
    en: "Complexity, inverse and verification",
  },
] as const;

type PdfLink = { box: number[]; page?: number; url?: string };
const links: PdfLink[][] = handout.links;

const scales = [1, 1.25, 1.5, 2];
const quickJumps = [
  { index: 5, zh: "看圆盘三折", en: "Three folds" },
  { index: 6, zh: "看 4 点算例", en: "Four-point example" },
  { index: 8, zh: "看 C 代码", en: "C code" },
] as const;
const anchor = (index: number) => "fft-" + pages[index].id;

export function FftHandoutReader({ english }: { english: boolean }) {
  const locale = english ? "en" : "zh";
  const [page, setPage] = useState(0);
  const [scale, setScale] = useState(0);
  const controls = useRef<HTMLDivElement>(null);
  const sheets = useRef<Array<HTMLElement | null>>([]);
  const pageToKeep = useRef<number | null>(null);
  const zoom = scales[scale];

  useEffect(() => {
    let frame = 0;
    const track = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const toolbarBottom =
          controls.current?.getBoundingClientRect().bottom ?? 0;
        const line = Math.max(toolbarBottom + 14, window.innerHeight * 0.34);
        const visible = sheets.current.findIndex(
          (sheet) => sheet && sheet.getBoundingClientRect().bottom > line,
        );
        setPage(visible === -1 ? pages.length - 1 : visible);
      });
    };
    track();
    window.addEventListener("scroll", track, { passive: true });
    window.addEventListener("resize", track);
    return () => {
      window.removeEventListener("scroll", track);
      window.removeEventListener("resize", track);
      window.cancelAnimationFrame(frame);
    };
  }, [zoom]);

  useLayoutEffect(() => {
    const index = pageToKeep.current;
    if (index === null) return;
    pageToKeep.current = null;
    sheets.current[index]?.scrollIntoView({
      block: "start",
      behavior: "instant",
    });
  }, [scale]);

  const changeZoom = (next: number) => {
    pageToKeep.current = page;
    setScale(next);
  };

  const goTo = (index: number) => {
    if (index < 0 || index >= pages.length) return;
    const sheet = sheets.current[index];
    if (!sheet) return;
    setPage(index);
    sheet.scrollIntoView({ block: "start", behavior: "instant" });
    window.history.replaceState(null, "", "#" + anchor(index));
  };

  return (
    <section
      className="fft-handout-reader"
      aria-label={english ? "FFT handout reader" : "FFT 讲义阅读器"}
    >
      <div className="fft-reader-jump-area" id="fft-reader-contents">
        <nav
          className="fft-reader-jumps"
          aria-label={english ? "Quick jumps" : "快速跳转"}
        >
          {quickJumps.map((item) => (
            <a key={item.index} href={"#" + anchor(item.index)}>
              {item[locale]}
            </a>
          ))}
        </nav>
        <details className="fft-reader-contents">
          <summary>{english ? "All sections" : "全部章节"}</summary>
          <ol>
            {pages.map((topic, index) => (
              <li key={topic.id}>
                <a
                  href={"#" + anchor(index)}
                  aria-current={page === index ? "location" : undefined}
                >
                  {topic[locale]}
                </a>
              </li>
            ))}
          </ol>
        </details>
      </div>
      <div className="fft-reader-controls" ref={controls}>
        <div className="fft-reader-toolbar">
          <div className="fft-reader-pages">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label={english ? "Previous page" : "上一页"}
            >
              <ArrowLeft size={17} aria-hidden="true" />
            </button>
            <label className="fft-reader-picker">
              <span>{english ? "Page" : "页码"}</span>
              <select
                aria-label={english ? "Go to page" : "跳到页码"}
                value={page}
                onChange={(event) => goTo(Number(event.currentTarget.value))}
              >
                {pages.map((topic, index) => (
                  <option key={topic.id} value={index}>
                    {index + 1} · {topic[locale]}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === pages.length - 1}
              aria-label={english ? "Next page" : "下一页"}
            >
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
          <div
            className="fft-reader-zoom"
            role="group"
            aria-label={english ? "Page zoom" : "阅读缩放"}
          >
            <button
              type="button"
              disabled={scale === 0}
              onClick={() => changeZoom(scale - 1)}
              aria-label={english ? "Zoom out" : "缩小"}
            >
              <Minus size={16} aria-hidden="true" />
            </button>
            <output aria-live="polite">
              {zoom === 1
                ? english
                  ? "Fit width"
                  : "适合宽度"
                : `${Math.round(zoom * 100)}%`}
            </output>
            <button
              type="button"
              disabled={scale === scales.length - 1}
              onClick={() => changeZoom(scale + 1)}
              aria-label={english ? "Zoom in" : "放大"}
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="fft-reader-count" aria-live="polite">
          {english
            ? `Page ${page + 1} / ${pages.length}`
            : `第 ${page + 1} 页 / 共 ${pages.length} 页`}
          {zoom > 1 && (
            <span>
              {english ? " · Scroll sideways to pan" : " · 可左右滑动"}
            </span>
          )}
        </p>
      </div>
      <div
        className="fft-reader-document"
        tabIndex={0}
        aria-label={
          english
            ? "PDF pages in continuous reading order"
            : "讲义各页，可连续上下滑动阅读"
        }
      >
        <div className="fft-reader-paper" style={{ width: `${zoom * 100}%` }}>
          {pages.map((topic, index) => (
            <figure
              key={topic.id}
              id={anchor(index)}
              className="fft-reader-sheet"
              ref={(node) => {
                sheets.current[index] = node;
              }}
            >
              <figcaption>
                <span>{topic[locale]}</span>
                <small>
                  {index + 1} / {pages.length}
                </small>
              </figcaption>
              <div className="fft-reader-image-links">
                <Image
                  src={`/assets/fft-handout/pages/page-${String(index + 1).padStart(2, "0")}.webp?v=${handout.revision}`}
                  alt={
                    english
                      ? `Page ${index + 1}: ${topic.en}`
                      : `第 ${index + 1} 页，${topic.zh}`
                  }
                  className="fft-reader-page"
                  width={1191}
                  height={1684}
                  unoptimized
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {links[index]?.map(
                  ({ box, page: destination, url }, linkIndex) => {
                    const [left, top, width, height] = box;
                    const label =
                      destination === undefined
                        ? url?.includes("doi.org")
                          ? english
                            ? "Cooley–Tukey paper"
                            : "Cooley–Tukey 论文"
                          : english
                            ? "FFT experiment"
                            : "FFT 折叠实验"
                        : english
                          ? `Go to ${pages[destination].en}`
                          : `跳到${pages[destination].zh}`;
                    return (
                      <a
                        key={linkIndex}
                        className="fft-reader-pdf-link"
                        href={
                          destination === undefined
                            ? url
                            : "#" + anchor(destination)
                        }
                        aria-label={label}
                        title={label}
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          width: `${width}%`,
                          height: `${height}%`,
                        }}
                      />
                    );
                  },
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>
      <div className="fft-reader-end">
        <a href="#fft-reader-contents">
          {english ? "Back to contents" : "回到目录"}
        </a>
      </div>
    </section>
  );
}
