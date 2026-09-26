import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Code2,
  Download,
  FileArchive,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import { CodeCopyButton } from "@/components/teaching/code-copy-button";
import { getLearningItem } from "@/data/learning/catalog";
import {
  programming2026Copy,
  programming2026Lectures,
  type TeachingLocale,
} from "@/data/teaching/programming-2026";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeKey: TeachingLocale = locale === "en" ? "en" : "zh";
  const item = getLearningItem("programming-2026");

  return constructMetadata({
    title: item.title[localeKey],
    description: item.description[localeKey],
    path: item.href,
    locale: locale as Locale,
  });
}

export default async function Programming2026Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey: TeachingLocale = locale === "en" ? "en" : "zh";
  const copy = programming2026Copy[localeKey];
  const title = getLearningItem("programming-2026").title[localeKey];
  const learningHref = (localeKey === "en" ? "/en" : "") + "/learning#courses";
  const exampleCount = programming2026Lectures.reduce(
    (total, lecture) => total + lecture.examples.length,
    0,
  );
  const lectures = await Promise.all(
    programming2026Lectures.map(async (lecture) => ({
      ...lecture,
      examples: await Promise.all(
        lecture.examples.map(async (example) => ({
          ...example,
          code: await readFile(
            path.join(
              process.cwd(),
              "public",
              "teaching",
              "programming-2026",
              lecture.sourceDirectory,
              example.filename,
            ),
            "utf8",
          ),
        })),
      ),
    })),
  );

  return (
    <main className="teaching-page">
      <section className="teaching-hero">
        <Link className="teaching-back-link" href={learningHref}>
          <ArrowLeft aria-hidden="true" />
          {localeKey === "en" ? "Learning · Courses" : "学习 · 课程学习"}
        </Link>

        <p className="teaching-eyebrow">{copy.eyebrow}</p>
        <h1>{title}</h1>
        <p className="teaching-intro">{copy.description}</p>

        <div className="teaching-stats" aria-label={title}>
          <span>
            <b>{String(programming2026Lectures.length).padStart(2, "0")}</b>
            <small>{copy.publishedCount}</small>
          </span>
          <span>
            <b>{String(exampleCount).padStart(2, "0")}</b>
            <small>{copy.exampleCount}</small>
          </span>
        </div>
      </section>

      <div className="teaching-content">
        <section className="teaching-section">
          <header>
            <span>01</span>
            <div>
              <h2>{copy.materialsTitle}</h2>
              <p>{copy.materialsDescription}</p>
            </div>
          </header>

          <div className="teaching-lecture-list">
            {lectures.map((lecture) => (
              <article className="teaching-lecture-card" key={lecture.number}>
                <div className="teaching-lecture-topline">
                  <span>{lecture.number}</span>
                  <span>
                    <CheckCircle2 aria-hidden="true" />
                    {copy.published}
                  </span>
                </div>
                <h3>{lecture.title[localeKey]}</h3>
                <p>{lecture.description[localeKey]}</p>

                <section className="teaching-code-browser">
                  <header>
                    <Code2 aria-hidden="true" />
                    <div>
                      <h4>
                        {copy.browseTitle} · {lecture.examples.length}
                      </h4>
                      <p>{copy.browseDescription}</p>
                    </div>
                  </header>

                  <div className="teaching-example-list">
                    {lecture.examples.map((example, index) => {
                      const codeId = `${lecture.number.toLowerCase()}-code-${index + 1}`;

                      return (
                        <details
                          className="teaching-example"
                          key={example.filename}
                        >
                          <summary>
                            <span>{example.slide}</span>
                            <span>
                              <b>{example.title[localeKey]}</b>
                              <small>{example.filename}</small>
                            </span>
                            <ChevronDown aria-hidden="true" />
                          </summary>
                          <div className="teaching-code-panel">
                            <div className="teaching-code-toolbar">
                              <span>C++17</span>
                              <CodeCopyButton
                                targetId={codeId}
                                label={copy.copyCode}
                                copiedLabel={copy.copiedCode}
                                filename={example.filename}
                              />
                            </div>
                            <pre>
                              <code id={codeId}>{example.code}</code>
                            </pre>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </section>

                <div className="teaching-archive-actions">
                  <div className="teaching-archive-meta">
                    <FileArchive aria-hidden="true" />
                    <span>{lecture.archiveLabel[localeKey]}</span>
                  </div>
                  <a className="teaching-download" href={lecture.href} download>
                    <Download aria-hidden="true" />
                    {copy.download}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="teaching-section">
          <header>
            <span>02</span>
            <div>
              <h2>{copy.notesTitle}</h2>
            </div>
          </header>

          <ol className="teaching-notes">
            {copy.notes.map((note, index) => (
              <li key={note}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="teaching-scope">
          <ShieldCheck aria-hidden="true" />
          <div>
            <h2>{copy.boundaryTitle}</h2>
            <p>{copy.boundaryText}</p>
          </div>
        </section>

        <section className="teaching-future">
          <span>NEXT</span>
          <div>
            <h2>{copy.futureTitle}</h2>
            <p>{copy.futureText}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
