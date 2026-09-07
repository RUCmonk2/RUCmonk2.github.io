"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeCopyButton({
  targetId,
  label,
  copiedLabel,
  filename,
}: {
  targetId: string;
  label: string;
  copiedLabel: string;
  filename: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    const source = document.getElementById(targetId)?.textContent;
    if (!source) return;

    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className="teaching-copy-button"
      onClick={copyCode}
      aria-label={`${copied ? copiedLabel : label}: ${filename}`}
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
