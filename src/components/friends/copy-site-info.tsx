"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const siteInfo = {
  zh: [
    ["名称", "叶耀之"],
    ["描述", "人工智能本科生，关注 AI4Math、AI4TCS 与跨学科 AI"],
    ["链接", "https://yeyaozhi.eu.cc/"],
    ["头像", "https://yeyaozhi.eu.cc/images/luxun-avatar.webp"],
  ],
  en: [
    ["Name", "Yaozhi Ye"],
    ["Description", "AI undergraduate exploring AI4Math, AI4TCS, and interdisciplinary AI"],
    ["Link", "https://yeyaozhi.eu.cc/"],
    ["Avatar", "https://yeyaozhi.eu.cc/images/luxun-avatar.webp"],
  ],
} as const;

export function CopySiteInfo({ isEnglish }: { isEnglish: boolean }) {
  const [copied, setCopied] = useState(false);
  const rows = siteInfo[isEnglish ? "en" : "zh"];
  const copyText = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  async function copyAll() {
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="links-site-info">
      <div>
        {rows.map(([label, value]) => (
          <p key={label}>
            <span>{label}</span>
            <code>{value}</code>
          </p>
        ))}
      </div>
      <button type="button" onClick={copyAll} aria-live="polite">
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {copied
          ? isEnglish
            ? "Copied"
            : "已复制"
          : isEnglish
            ? "Copy site info"
            : "复制本站信息"}
      </button>
    </div>
  );
}
