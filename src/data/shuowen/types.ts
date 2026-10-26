export type ShuowenTheme =
  | "dao"
  | "nature"
  | "stillness"
  | "return"
  | "mind"
  | "action"
  | "living"
  | "zhuangzi"
  | "name";

export interface CharacterEntry {
  id: string;
  char: string;
  traditional: string;
  pinyin: string;
  theme: ShuowenTheme;
  subtitle: string;
  radical: string;
  aliases: string[];
  shuowen: {
    headword: string;
    status: "recorded" | "related";
    original: string;
    explanation: string;
    sourceUrl: string;
  };
  formation: string;
  components: {
    char: string;
    role: "形旁" | "声旁" | "构件";
    explanation: string;
  }[];
  passages: {
    work: string;
    chapter: string;
    quote: string;
    explanation: string;
    sourceUrl: string;
  }[];
  reflection: string;
  caution: string;
  sources: { label: string; url: string }[];
}

export interface CharacterEdge {
  id: string;
  source: string;
  target: string;
  type: "text" | "contrast" | "reading";
  label: string;
  explanation: string;
  sourceUrl?: string;
}

export interface CharacterRoute {
  id: string;
  title: string;
  description: string;
  nodes: string[];
  image: string;
}

export interface GlyphEvidence {
  char: string;
  src: string;
  period: string;
  caption: string;
  sourceUrl: string;
  license: string;
  credit: string;
}
