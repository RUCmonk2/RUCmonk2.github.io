import { charactersA } from "./characters-a";
import { charactersB } from "./characters-b";
import type { CharacterRoute, ShuowenTheme } from "./types";

export const shuowenCharacters = [...charactersA, ...charactersB];
export const characterById = new Map(
  shuowenCharacters.map((entry) => [entry.id, entry]),
);
export const themes: {
  id: ShuowenTheme;
  label: string;
  short: string;
  color: string;
  description: string;
}[] = [
  {
    id: "dao",
    label: "道体与命名",
    short: "道与名",
    color: "#95624d",
    description: "名字能否穷尽事物？从有无之间，读道与德。",
  },
  {
    id: "nature",
    label: "天地与自然",
    short: "天地间",
    color: "#587f7c",
    description: "水流、山谷与天地，怎样进入古人的思想。",
  },
  {
    id: "stillness",
    label: "虚静与修养",
    short: "虚与静",
    color: "#76816a",
    description: "从虚静、柔弱与素朴，体会另一种力量。",
  },
  {
    id: "return",
    label: "生成与复归",
    short: "往与复",
    color: "#9b7952",
    description: "生长、变化与返回，构成万物的不同节律。",
  },
  {
    id: "mind",
    label: "心知与观照",
    short: "心与知",
    color: "#787491",
    description: "知识之外，如何理解观照、言说与遗忘。",
  },
  {
    id: "action",
    label: "行动与尺度",
    short: "为与用",
    color: "#5b7b8c",
    description: "从无为到知足，寻找行动与限度的分寸。",
  },
  {
    id: "living",
    label: "欲望与处世",
    short: "处世间",
    color: "#9b6a61",
    description: "慈、俭与不争，放回人与世界的关系中读。",
  },
  {
    id: "zhuangzi",
    label: "庄子意象",
    short: "梦与游",
    color: "#7b877c",
    description: "梦蝶、齐物与逍遥，让熟悉的边界松动。",
  },
  {
    id: "name",
    label: "姓名专线",
    short: "叶耀之",
    color: "#ab4f3c",
    description: "从叶的生长、耀的光明，读到之的前往。",
  },
];

export const shuowenRoutes: CharacterRoute[] = [
  {
    id: "water",
    title: "从水读柔弱",
    description:
      "水随物赋形，也能穿过坚硬。从柔弱读到善与不争，看看力量还有哪些形态。",
    nodes: ["shui", "rou", "ruo", "shan", "zheng"],
    image: "water",
  },
  {
    id: "stillness",
    title: "虚静与观心",
    description:
      "先给心留出空间，再问如何观看。虚、静、观、忘，是不同的阅读入口。",
    nodes: ["xu", "jing", "xin", "guan", "wang"],
    image: "stillness",
  },
  {
    id: "return",
    title: "万物如何复归",
    description:
      "变化不总是一条向前的直线。沿着反、复、归、根，读生命的生成与转化。",
    nodes: ["fan", "fu", "gui", "gen", "sheng", "hua"],
    image: "return",
  },
  {
    id: "action",
    title: "无为与有用",
    description:
      "有所不为，怎样成为另一种行动？把无为、有用、持守与知足放在一起读。",
    nodes: ["wu", "wei", "yong", "shou", "zu"],
    image: "vessel",
  },
  {
    id: "butterfly",
    title: "从梦蝶到齐物",
    description:
      "一次梦境动摇了谁与谁的界限。沿着梦、蝶、物、齐，进入庄子的游观。",
    nodes: ["meng", "die", "wu-things", "qi-equal", "you-wander"],
    image: "butterfly",
  },
  {
    id: "name",
    title: "叶耀之 · 三字并读",
    description:
      "先辨字，再取义。从一片叶的生长，到光明与前往，写一段属于今天的读字随想。",
    nodes: ["ye", "yao", "zhi"],
    image: "leaf",
  },
];

export const artworkByTheme: Record<ShuowenTheme, string> = {
  dao: "dao",
  nature: "valley",
  stillness: "stillness",
  return: "return",
  mind: "mirror",
  action: "vessel",
  living: "bamboo",
  zhuangzi: "butterfly",
  name: "leaf",
};
export const artworkNames: Record<string, string> = {
  dao: "山径入微",
  water: "水行不争",
  valley: "空谷有声",
  stillness: "静水观心",
  return: "归根复生",
  mirror: "澄心如镜",
  vessel: "虚室有用",
  bamboo: "柔而有节",
  butterfly: "梦蝶之间",
  leaf: "一叶生长",
  light: "含光不露",
  journey: "有所之",
};
export const imageForCharacter = (id: string, theme: ShuowenTheme) =>
  id === "shui"
    ? "water"
    : id === "yao"
      ? "light"
      : id === "zhi"
        ? "journey"
        : artworkByTheme[theme];
