import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ArrowUp, ArrowUpRight, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { fftExperimentPath, fftHandoutChapters } from "./fft-handout-chapters";
import { FftHandoutDiagram } from "./fft-handout-diagrams";

const sourceDir = join(process.cwd(), "content/handouts/fft");
const headingPattern = /^## ([a-z-]+)$/m;
const sectionParts = /^(\{\{(?:figure|code|equation):[^\n]+\}\})$/m;

function HandoutProse({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[[rehypeKatex, { strict: "ignore" }]]}
      components={{
        h3: ({ children }) => <h4>{children}</h4>,
        table: ({ children }) => (
          <div
            className="fft-web-table"
            tabIndex={0}
            role="region"
            aria-label="讲义表格"
          >
            <table>{children}</table>
          </div>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

function SourceListing({ range, lines }: { range: string; lines: string[] }) {
  const [first, last] = range.split("-").map(Number);
  if (!(first >= 1 && last >= first && last <= lines.length)) {
    throw new Error(`Invalid FFT source range: ${range}`);
  }
  return (
    <figure className="fft-web-source">
      <figcaption>
        <code>fft.c</code>
        <span>
          第 {first}–{last} 行
        </span>
      </figcaption>
      <pre tabIndex={0} aria-label={`fft.c 第 ${first} 到 ${last} 行`}>
        <code>
          {lines.slice(first - 1, last).map((line, index) => {
            const number = first + index;
            const id = `fft-code-l${number}`;
            return (
              <span className="fft-web-source-line" id={id} key={id}>
                <a href={`#${id}`} aria-label={`第 ${number} 行的链接`}>
                  {number}
                </a>
                <span>{line || " "}</span>
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}

function ChapterBody({
  markdown,
  lines,
}: {
  markdown: string;
  lines: string[];
}) {
  const parts = markdown.split(sectionParts);
  return parts.map((part, index) => {
    if (index % 2 === 0) {
      return part.trim() ? (
        <HandoutProse key={index}>{part.trim()}</HandoutProse>
      ) : null;
    }
    const [kind, value, numbers] = part.slice(2, -2).split(":");
    if (kind === "figure") {
      return <FftHandoutDiagram key={part} name={value} />;
    }
    if (kind === "code") {
      return <SourceListing key={part} range={value} lines={lines} />;
    }
    return (
      <div
        className="fft-web-equation-marker"
        key={part}
        aria-label={`式 ${numbers}`}
      >
        {value.split(",").map((id) => (
          <span key={id} id={`fft-eq-${id}`} />
        ))}
        <span>({numbers})</span>
      </div>
    );
  });
}

export async function FftWebHandout({ english }: { english: boolean }) {
  const [markdown, source] = await Promise.all([
    readFile(join(sourceDir, "fft-web.zh.md"), "utf8"),
    readFile(join(sourceDir, "fft.c"), "utf8"),
  ]);
  const lines = source.trimEnd().split(/\r?\n/);
  const parts = markdown.split(headingPattern);
  const pdfPath = `${english ? "/en" : ""}${fftExperimentPath}handout/`;
  if (parts.length !== fftHandoutChapters.length * 2 + 1 || parts[0].trim()) {
    throw new Error("The FFT web handout must match the PDF chapter list");
  }

  return (
    <article
      className="fft-web-handout"
      id="derivation"
      aria-labelledby="fft-web-title"
    >
      <header className="fft-web-header">
        <div>
          <h2 id="fft-web-title" lang="zh-CN">
            FFT 从圆盘折叠到 C 代码
          </h2>
          <p>
            {english
              ? "The complete handout in Chinese"
              : "完整推导、4 点手算、8 点圆盘与 C99 实现"}
          </p>
          <p className="fft-web-swipe-hint">
            {english
              ? "Swipe sideways in wide equations, tables and code."
              : "较宽的公式、表格和代码可以左右滑动。"}
          </p>
        </div>
        <a className="fft-web-pdf" href={pdfPath}>
          <FileText size={17} aria-hidden="true" />
          {english ? "PDF reader" : "PDF 讲义"}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </header>
      <div className="fft-web-layout">
        <nav
          className="fft-web-contents"
          id="fft-web-contents"
          aria-labelledby="fft-web-contents-title"
        >
          <h3 id="fft-web-contents-title">
            {english ? "Contents" : "讲义目录"}
          </h3>
          <ol>
            {fftHandoutChapters.map((chapter) => (
              <li key={chapter.id}>
                <a href={`#fft-${chapter.id}`}>
                  {english ? chapter.en : chapter.zh}
                </a>
              </li>
            ))}
          </ol>
          <a href="#fft-experiment" className="fft-web-back-link">
            <ArrowUp size={14} aria-hidden="true" />
            {english ? "Back to the experiment" : "回到折叠实验"}
          </a>
        </nav>
        <div className="fft-web-chapters" lang="zh-CN">
          {fftHandoutChapters.map((chapter, index) => {
            const key = `fft-${chapter.id}`;
            const [sectionId, body] = parts.slice(index * 2 + 1, index * 2 + 3);
            if (sectionId !== chapter.id || !body?.trim()) {
              throw new Error(`Missing FFT web handout chapter: ${chapter.id}`);
            }
            return (
              <section
                className="fft-web-chapter"
                id={key}
                aria-labelledby={`${key}-title`}
                key={key}
              >
                <header>
                  <h3 id={`${key}-title`}>{chapter.zh}</h3>
                  <div className="fft-web-chapter-links">
                    <a className="fft-web-toc-link" href="#fft-web-contents">
                      目录
                    </a>
                    <a
                      href={`${pdfPath}#${key}`}
                      aria-label={`去 PDF 阅读第 ${index + 1} 页，${chapter.zh}`}
                    >
                      PDF 第 {index + 1} 页
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                </header>
                <ChapterBody markdown={body} lines={lines} />
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
