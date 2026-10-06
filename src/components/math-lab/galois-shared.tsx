"use client";

import katex from "katex";
import { type ReactNode, useMemo } from "react";

export function MathFormula({ value }: { value: string }) {
  const html = useMemo(
    () =>
      katex.renderToString(value, {
        displayMode: true,
        throwOnError: true,
        strict: "error",
        trust: false,
      }),
    [value],
  );
  return (
    <div
      className="galois-formula"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function StageHeading({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="galois-stage-heading">
      <span className="notes-overline">
        第 {String(index + 1).padStart(2, "0")} 站 / 06
      </span>
      <h2 id={`galois-stage-${index}`} tabIndex={-1}>
        {title}
      </h2>
      <p>{children}</p>
    </header>
  );
}
