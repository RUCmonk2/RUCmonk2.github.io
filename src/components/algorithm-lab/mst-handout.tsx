import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ArrowUp, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { MstHandoutFigure } from "./mst-handout-figures";

const sectionHeading = /^## ([a-z]+) \| ([^\n]+)$/m;
const figureSlot = /^\{\{figure:([a-z]+)\}\}$/m;
const pdf = "/assets/mst-handout/mst-handout.pdf";

function MstProse({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[[rehypeKatex, { strict: "ignore" }]]}
      components={{
        h3: ({ children }) => <h4>{children}</h4>,
        pre: ({ children }) => (
          <figure className="mst-handout-code">
            <figcaption>伪代码</figcaption>
            <pre tabIndex={0} aria-label="算法伪代码">
              {children}
            </pre>
          </figure>
        ),
        table: ({ children }) => (
          <div
            className="mst-handout-table"
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

export async function MstHandout({ english }: { english: boolean }) {
  const markdown = await readFile(
    join(process.cwd(), "content/handouts/mst/mst.zh.md"),
    "utf8",
  );
  const parts = markdown.split(sectionHeading);
  const chapters = [];
  for (let index = 1; index < parts.length; index += 3) {
    const [id, title, body] = parts.slice(index, index + 3);
    chapters.push({ id, title, body });
  }
  if (
    !chapters.length ||
    parts[0].trim() ||
    chapters.some(({ body }) => !body?.trim())
  ) {
    throw new Error("Invalid MST handout chapters");
  }

  return (
    <article
      className="mst-handout"
      id="mst-handout"
      aria-labelledby="mst-handout-title"
      lang="zh-CN"
    >
      <header className="mst-handout-heading">
        <div>
          <h2 id="mst-handout-title">最小生成树：从选边到随机采样</h2>
          <p>同一张图手算三种经典算法，再用 12 点例题走完 KKT。</p>
          <p className="mst-swipe-hint">
            较宽的图、表格、公式和代码可以左右滑动。
          </p>
        </div>
        <a className="mst-pdf" href={pdf}>
          <Download size={16} aria-hidden="true" />
          {english ? <span lang="en">PDF in Chinese</span> : "PDF 讲义"}
        </a>
      </header>
      <div className="mst-handout-layout">
        <nav
          className="mst-handout-contents"
          id="pseudocode"
          aria-label="MST 讲义目录"
        >
          <h3>讲义目录</h3>
          <ul>
            {chapters.map(({ id, title }) => (
              <li key={id}>
                <a href={`#mst-${id}`}>{title}</a>
              </li>
            ))}
          </ul>
          <a className="mst-handout-back" href="#mst-demo">
            <ArrowUp size={14} aria-hidden="true" />
            回到实验
          </a>
        </nav>
        <div className="mst-handout-chapters">
          {chapters.map(({ id, title, body }) => (
            <section
              key={id}
              id={`mst-${id}`}
              className="mst-handout-chapter"
              aria-labelledby={`mst-${id}-title`}
            >
              <header>
                <h3 id={`mst-${id}-title`}>{title}</h3>
                <a href="#pseudocode" className="mst-toc-link">
                  目录
                </a>
              </header>
              {body
                .split(figureSlot)
                .map((part, index) =>
                  index % 2 === 1 ? (
                    <MstHandoutFigure key={part} name={part} />
                  ) : (
                    part.trim() && (
                      <MstProse key={index}>{part.trim()}</MstProse>
                    )
                  ),
                )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
