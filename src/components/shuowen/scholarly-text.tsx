import Image from "next/image";
import { Fragment } from "react";

import { shuowenGlyphs } from "@/data/shuowen/glyphs";

/** Keep the source transcription intact while making two unsupported rare forms readable. */
export function ScholarlyText({ text }: { text: string }) {
  return (
    <>
      {text.split(/([𠂹𣠮])/u).map((part, index) => {
        if (part === "𣠮")
          return (
            <Image
              key={index}
              className="sw-inline-glyph"
              src={shuowenGlyphs["无"][0].src}
              alt="无的《说文》正篆字头（U+2382E）"
              title="原文作𣠮，U+2382E。用已核验的小篆摹写显示，来源见字形资料。"
              width={23}
              height={23}
              unoptimized
            />
          );
        if (part === "𠂹")
          return (
            <span
              key={index}
              className="sw-rare-note"
              title="原文作𠂹（U+200B9），垂的古字。所引原始文本保留此字；显示注记用于避免缺字框。"
            >
              〔垂的古字〕
            </span>
          );
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
