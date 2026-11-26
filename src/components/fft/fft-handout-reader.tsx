"use client";

import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { type KeyboardEvent, useRef, useState } from "react";

const pages = [
  { zh: "导读与符号", en: "Overview and notation" },
  { zh: "DFT 定义与单位根", en: "DFT and roots of unity" },
  { zh: "从拆奇偶到一只蝶形", en: "Even–odd split and the butterfly" },
  { zh: "圆形折叠怎样配对", en: "Pairing on the folding disk" },
  { zh: "每一折的不变量", en: "The invariant at each fold" },
  { zh: "四个采样，完整算两折", en: "The four-point example" },
  { zh: "把 FFT 写成矩阵乘积", en: "Matrix factorization" },
  { zh: "递归写法：沿步长取样", en: "Recursive C implementation" },
  {
    zh: "迭代写法：位反转后原地合并",
    en: "In-place iterative C implementation",
  },
  { zh: "复杂度、逆变换与验算", en: "Complexity, inverse and verification" },
] as const;

const scales = [1, 1.25, 1.5, 2];

export function FftHandoutReader({ english }: { english: boolean }) {
  const locale = english ? "en" : "zh";
  const [page, setPage] = useState(0);
  const [scale, setScale] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const zoom = scales[scale];

  const goTo = (index: number) => {
    if (index < 0 || index >= pages.length || index === page) return;
    viewport.current?.scrollTo(0, 0);
    setPage(index);
  };

  const onViewKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "PageUp" || (zoom === 1 && event.key === "ArrowLeft")) {
      event.preventDefault();
      goTo(page - 1);
    } else if (
      event.key === "PageDown" ||
      (zoom === 1 && event.key === "ArrowRight")
    ) {
      event.preventDefault();
      goTo(page + 1);
    }
  };

  return (
    <section
      className="fft-handout-reader"
      aria-label={english ? "FFT handout reader" : "FFT 讲义阅读器"}
    >
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
                <option key={topic.zh} value={index}>
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
            onClick={() => setScale(scale - 1)}
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
            onClick={() => setScale(scale + 1)}
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
            {english ? " · Scroll sideways to pan" : " · 左右滑动查看放大区域"}
          </span>
        )}
      </p>
      <div
        className="fft-reader-viewport"
        ref={viewport}
        tabIndex={0}
        onKeyDown={onViewKey}
        aria-label={
          english
            ? "Rendered PDF page. Use Page Up or Page Down to turn pages."
            : "PDF 页面预览。可用 Page Up 或 Page Down 翻页。"
        }
      >
        <Image
          key={page}
          src={`/assets/fft-handout/pages/page-${String(page + 1).padStart(2, "0")}.webp`}
          alt={
            english
              ? `Page ${page + 1}: ${pages[page].en}`
              : `第 ${page + 1} 页，${pages[page].zh}`
          }
          className="fft-reader-page"
          width={1191}
          height={1684}
          style={{ width: `${zoom * 100}%` }}
          unoptimized
          loading="eager"
        />
      </div>
    </section>
  );
}
