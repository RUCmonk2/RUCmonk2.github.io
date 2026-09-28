import { k12Topics } from "../k12";
import rawSubjects from "./subjects.json";

export type SchoolStage = "primary" | "middle" | "high";
export type SubjectModule = {
  id: string;
  title: string;
  topics: string[];
  task: string;
  check: string;
  mistake: string;
};
export type SubjectStage = {
  id: SchoolStage;
  goal: string;
  entry: string;
  modules: SubjectModule[];
};
export type SchoolSubject = {
  id: string;
  title: string;
  en: string;
  group: "humanities" | "science" | "practice";
  intro: string;
  method: string;
  note: string;
  connections: string[];
  stages: SubjectStage[];
};

export const schoolStages = [
  { id: "primary", title: "小学", hint: "从经验与观察开始" },
  { id: "middle", title: "初中", hint: "建立概念、方法与证据" },
  { id: "high", title: "高中", hint: "深化理解，走向综合运用" },
] as const;
export const subjectGroups = [
  { id: "humanities", title: "语言与人文" },
  { id: "science", title: "数学与科学" },
  { id: "practice", title: "技术、艺术与生活" },
] as const;
export const schoolSubjects = rawSubjects as SchoolSubject[];
export const subjectUpdated = "2026-09-28";
export function subjectHref(id: string) {
  return id === "mathematics"
    ? "/learning/k12/mathematics"
    : `/learning/k12/subjects/${id}`;
}
export const schoolDirectory = [
  ...schoolSubjects.slice(0, 1),
  {
    id: "mathematics",
    title: "数学",
    en: "Mathematics",
    group: "science" as const,
    intro:
      "连接数与运算、代数、几何、函数和概率统计，用讲义、知识网与实验理解每一步。",
    stages: schoolStages.map((stage) => ({
      id: stage.id,
      goal: "详细讲义、逐步例题、练习与解答。",
      entry: "按先修关系补基础。",
      modules: k12Topics
        .filter((topic) => topic.stage === stage.id)
        .map((topic) => ({
          id: topic.id,
          title: topic.title,
          topics: [topic.goal],
          task: "",
          check: "",
          mistake: "",
        })),
    })),
  },
  ...schoolSubjects.slice(1),
];
export const subjectModuleCount = schoolSubjects.reduce(
  (sum, subject) =>
    sum + subject.stages.reduce((n, stage) => n + stage.modules.length, 0),
  0,
);
export function subjectStageHref(id: string, stage: SchoolStage) {
  return id === "mathematics"
    ? `/learning/k12/${stage}`
    : subjectHref(id) + "#" + stage;
}
export function moduleHref(id: string, stage: SchoolStage, module: string) {
  return id === "mathematics"
    ? `/learning/k12/lesson/${module}`
    : subjectHref(id) + `#${stage}-${module}`;
}

export const curriculumSources = [
  {
    title: "教育部 · 义务教育课程方案和课程标准（2022 年版）",
    href: "https://www.moe.gov.cn/srcsite/A26/s8001/202204/t20220420_619921.html?fromColId=194",
  },
  {
    title: "教育部 · 普通高中课程方案和课程标准（2017 年版 2020 年修订）",
    href: "https://www.moe.gov.cn/srcsite/A26/s8001/202006/t20200603_462199.html?from=groupmessage&isappinstalled=0",
  },
];

export const schoolProjects = [
  {
    id: "plant-survey",
    title: "给校园植物做一份档案",
    stage: "小学高年段—初中",
    subjects: ["science", "biology", "mathematics", "chinese", "computing"],
    question: "校园不同位置的植物是否相同？怎样记录才能让别人复查？",
    steps: [
      "选两个可安全到达的小区域，规定相同观察面积。",
      "记录日期、位置、特征与数量；不能确定的种类保留照片或描述，先不命名。",
      "用表格比较，写一段有证据的说明，列出季节和识别能力带来的局限。",
    ],
    result: "区域简图、观察表、一张比较图和一段结论；不采摘未知植物。",
  },
  {
    id: "reading-corner",
    title: "重新设计班级阅读角",
    stage: "小学—初中",
    subjects: ["chinese", "mathematics", "arts", "labor", "civics"],
    question: "怎样让同学更容易找到想读的书，并愿意归还？",
    steps: [
      "清点图书类别，观察查找困难，询问使用者意见。",
      "设计分类标签、摆放方案和简洁的借还规则。",
      "试用一周，比较查找时间与归位情况，再修改。",
    ],
    result: "分类目录、标签与改进记录；评价使用效果，也评价合作。",
  },
  {
    id: "weather",
    title: "记录一周天气，解释一天变化",
    stage: "小学高年段—初中",
    subjects: ["science", "geography", "mathematics", "foreign-languages"],
    question: "为什么同一天的不同时刻，观察结果可能不同？",
    steps: [
      "固定地点与时刻记录天气，注明数据是实测还是公开来源。",
      "画温度变化图，区分一天变化、一周天气与多年气候。",
      "用中文或简单英语做一次天气播报，并说清预测的不确定性。",
    ],
    result:
      "带单位和来源的记录表、折线图与短播报；一周记录不用于判断长期气候趋势。",
  },
  {
    id: "street-history",
    title: "一条街道的过去与现在",
    stage: "初中—高中",
    subjects: ["history", "geography", "chinese", "arts", "inquiry"],
    question: "街道为什么改变？不同材料能告诉我们什么？",
    steps: [
      "查找有日期的老地图、公开照片和文字资料。",
      "在安全条件下观察现状；访谈需先说明用途并取得同意。",
      "制作前后对照，分开呈现事实、解释和仍需核查的问题。",
    ],
    result: "有来源的时间线、对照图和短报告；不公开受访者敏感个人信息。",
  },
  {
    id: "paper-bridge",
    title: "一张纸能承受多大重量",
    stage: "小学高年段—高中",
    subjects: ["physics", "science", "mathematics", "technology", "labor"],
    question: "固定纸的大小与桥的跨度，改变形状是否影响承重？",
    steps: [
      "提出平面、折叠等两种方案，写清比较指标。",
      "用小质量物体逐步加载，保持位置一致，重复记录。",
      "根据变形位置解释失败，画出改进草图再测试。",
    ],
    result:
      "结构图、测试表、失败原因与改进报告；小学描述现象，高中可加入受力分析。",
  },
  {
    id: "data-claim",
    title: "核查一个流行的数据说法",
    stage: "初中—高中",
    subjects: ["mathematics", "computing", "chinese", "civics", "inquiry"],
    question: "一个看起来精确的百分数，真的足以支持标题的结论吗？",
    steps: [
      "找到原始出处、调查时间、对象与指标定义。",
      "检查样本、分母、缺失值以及图表坐标；写出另一种可能解释。",
      "把核查结果写给同龄读者，标注哪些已证实、哪些仍未知。",
    ],
    result:
      "原始来源、计算过程、图表与核查短文；不把AI生成的引用当作已查证来源。",
  },
];
