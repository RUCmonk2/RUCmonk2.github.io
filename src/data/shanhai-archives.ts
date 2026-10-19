export interface ShanhaiArchive {
  id: string;
  title: string;
  src: string;
  sourceUrl: string;
  credit: string;
  note: string;
}

// 古图的单体、篇章场景与跨篇对照在 note 中分别说明。
// 所有 src 保留完整扫描构图；每页来源、PDM 与核对记录见 archive/sources.json。
export const shanhaiArchives: Record<string, ShanhaiArchive[]> = {
  zhaoyao: [
    {
      id: "south-first",
      title: "招摇山篇章场景",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "右页可见狌狌与草木，配合开篇招摇山条目阅读。这里展示篇章场景，非单体识别；山线不是招摇山的实测轮廓。",
    },
  ],
  tangting: [
    {
      id: "south-first",
      title: "堂庭山篇章场景",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "左页树间的猿形与堂庭“多白猿”相参。山石、树木仅作篇章场景对照，不能据此给每座山峰或每株树定名。",
    },
  ],
  yuanyi: [
    {
      id: "south-first",
      title: "猨翼山篇章场景",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "第一图覆盖招摇、堂庭至猨翼段落；左页下方汇入怪兽、怪木等形象。作为篇章场景对照，未把任一山线认定为猨翼山。",
    },
  ],
  xihai: [
    {
      id: "south-first",
      title: "招摇临海的篇章场景",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "第一图与“招摇之山，临于西海”所在段落相配。仅作篇章场景对照，图中没有可独立辨认、标名的西海，不将水纹当作其岸线。",
    },
  ],
  liji: [
    {
      id: "south-first",
      title: "丽麂水所在篇章场景",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "第一图覆盖招摇山及其水流段落；水景与狌狌、树木合置。仅作篇章场景对照，无法从无题名的水纹中单独确认丽麂水。",
    },
  ],
  zhuyu: [
    {
      id: "south-first",
      title: "祝余所在篇章场景",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "右页狌狌近旁画有草木，第一图对应的正文含祝余。仅作篇章场景对照；未能逐株确认祝余，不把画中任一叶丛当作其标准形态。",
    },
  ],
  migu: [
    {
      id: "south-first",
      title: "迷榖所在篇章场景",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "右页的树与草木置于招摇山开篇环境，正文含迷榖。仅作篇章场景对照；图中没有逐树题名，不据此鉴定现实植物。",
    },
  ],
  yanmu: [
    {
      id: "south-first",
      title: "棪木所在篇章场景",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "左页树间有猿，与堂庭山物产段落相邻。仅作篇章场景对照，未把任一枝叶确认为棪木，也不借图补写现代物种。",
    },
  ],
  xingxing: [
    {
      id: "south-first",
      title: "狌狌古图",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "右页中下部、作直立行走状的猿形，与相邻正文狌狌“伏行人走”对照。此为明代绘者的图像诠释；馆方未为单个生物另作鉴定。",
    },
  ],
  baiyuan: [
    {
      id: "south-first",
      title: "白猿古图",
      src: "/images/shanhai/archive/south-first.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 15（第一图）。",
      note: "左页上方树间可见猿形，与同图对应正文堂庭山“多白猿”对照。单色木刻不能据颜色识别品种；图像是明代绘者的诠释。",
    },
  ],
  niuyang: [
    {
      id: "south-second",
      title: "杻阳山篇章场景",
      src: "/images/shanhai/archive/south-second.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/17",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 17（第二图）。",
      note: "右页的鹿蜀与下方旋龟同属杻阳山段落。作为篇章场景对照；没有把背景任一山峰认定为杻阳山的精确形状。",
    },
  ],
  guaishui: [
    {
      id: "south-second",
      title: "怪水所在篇章场景",
      src: "/images/shanhai/archive/south-second.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/17",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 17（第二图）。",
      note: "右页下方水中见鸟首龟形，与杻阳山的怪水、旋龟条目相参。仅作篇章场景对照，水纹没有标名，不能单独划定怪水河道。",
    },
  ],
  xianyi: [
    {
      id: "south-second",
      title: "宪翼水所在篇章场景",
      src: "/images/shanhai/archive/south-second.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/17",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 17（第二图）。",
      note: "第二图涵盖“怪水……东流注于宪翼之水”的正文。仅作篇章场景对照；右页下方水纹不提供两条水流可分别辨认的边界。",
    },
  ],
  lushu: [
    {
      id: "south-second",
      title: "鹿蜀古图",
      src: "/images/shanhai/archive/south-second.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/17",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 17（第二图）。",
      note: "右页中部的马形虎纹兽对应鹿蜀。木刻保留复合体形，白首、赤尾等色彩仍须回看文字；不把单色刻线当成真实毛色。",
    },
  ],
  xuangui: [
    {
      id: "south-second",
      title: "旋龟古图",
      src: "/images/shanhai/archive/south-second.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/17",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 17（第二图）。",
      note: "右页下方水中的鸟首龟形与旋龟条目相参，可观察龟身、鸟首及尾部的组合。展示整幅原页，保留它与鹿蜀、山水同处的画面关系。",
    },
  ],
  qingqiu: [
    {
      id: "south-third",
      title: "青丘山篇章场景",
      src: "/images/shanhai/archive/south-third.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/19",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 19（第三图）。",
      note: "右页上部有九尾狐，左页上部鸟形与下方人面鱼构成同一青丘段落的图像群。作为篇章场景对照，不能将背景山线当作现代地理定位。",
    },
  ],
  yingshui: [
    {
      id: "south-third",
      title: "英水所在篇章场景",
      src: "/images/shanhai/archive/south-third.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/19",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 19（第三图）。",
      note: "左页下方人面鱼与水景对应青丘段落的赤鱬描写。仅作篇章场景对照；图中未逐条标水名，不能把某一条水纹直接指定为英水。",
    },
  ],
  jiyi: [
    {
      id: "south-third",
      title: "即翼泽所在篇章场景",
      src: "/images/shanhai/archive/south-third.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/19",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 19（第三图）。",
      note: "第三图对应正文含“英水……注于即翼之泽”。左页下方为人面鱼所在的水景，作篇章场景对照；无法从画中单独划出即翼泽。",
    },
  ],
  jiuweihu: [
    {
      id: "south-third",
      title: "九尾狐古图",
      src: "/images/shanhai/archive/south-third.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/19",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 19（第三图）。",
      note: "右页上部、近书脊处的狐形有成束展开的多尾，与青丘九尾狐条目相参。左页另有鸟与人面鱼，不将整页都称作九尾狐单像。",
    },
  ],
  guanguan: [
    {
      id: "south-third",
      title: "灌灌古图",
      src: "/images/shanhai/archive/south-third.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/19",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 19（第三图）。",
      note: "左页最上方、立在高石上的小鸟与青丘灌灌条目相参。左页中部的多首大鸟属于同图其他段落，不能误认成灌灌。",
    },
  ],
  chiru: [
    {
      id: "south-third",
      title: "赤鱬古图",
      src: "/images/shanhai/archive/south-third.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/19",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 19（第三图）。",
      note: "左页下方水中的鱼具人面，对应青丘条目“其状如鱼而人面”。这是明代绘者的诠释；古图与现代原创分别呈现，不视作唯一造型标准。",
    },
  ],
  feiyi: [
    {
      id: "west-seventh",
      title: "肥遗古图",
      src: "/images/shanhai/archive/west-seventh.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/30",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 30（第七图）。",
      note: "左页下方为长蛇身、有足有翼的肥遗，与相邻太华山“六足四翼”条目相参。对应蛇形肥遗，不能与书中同名的鸟类混用。",
    },
  ],
  taihua: [
    {
      id: "west-seventh",
      title: "太华山篇章场景",
      src: "/images/shanhai/archive/west-seventh.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555513/1/30",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 1 册，扫描 30（第七图）。",
      note: "左页下方的有翼蛇对应太华肥遗段落，整页另合绘西山诸物。作为篇章场景对照，未把某一背景山石认定为太华山测绘图。",
    },
  ],
  jingwei: [
    {
      id: "north-twenty-fourth",
      title: "精卫古图",
      src: "/images/shanhai/archive/north-twenty-fourth.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555514/1/18",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 2 册，扫描 18（第二十四图）。",
      note: "左页上部、近书脊处的飞鸟口衔枝木，与发鸠山精卫条目相参。白喙、赤足等颜色须回看正文；木刻本身不提供着色依据。",
    },
  ],
  fajiu: [
    {
      id: "north-twenty-fourth",
      title: "发鸠山篇章场景",
      src: "/images/shanhai/archive/north-twenty-fourth.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555514/1/18",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 2 册，扫描 18（第二十四图）。",
      note: "左页上部衔木的精卫嵌在山水间，与发鸠山段落相参。作为篇章场景对照；没有把图中的某一座山峰确认为发鸠山地形。",
    },
  ],
  donghai: [
    {
      id: "north-twenty-fourth",
      title: "精卫与东海篇章场景",
      src: "/images/shanhai/archive/north-twenty-fourth.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555514/1/18",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 2 册，扫描 18（第二十四图）。",
      note: "左页上部的衔木飞鸟可与精卫填海叙事对照。仅作篇章场景对照，不把整幅水纹统一命名为东海，也不合并其他篇章中的同名海域。",
    },
  ],
  kuafu: [
    {
      id: "overseas-north-forty-ninth",
      title: "夸父国图像对读",
      src: "/images/shanhai/archive/overseas-north-forty-ninth.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555515/1/20",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 3 册，扫描 20（第四十九图）。",
      note: "右页上方操蛇的大人对应本篇“夸父国”段落，可与夸父逐日对读。它不是逐日过程的连环画，也不据同名认定图中人物就是逐日叙事的唯一形象。",
    },
  ],
  denglin: [
    {
      id: "overseas-north-forty-ninth",
      title: "邓林所在篇章场景",
      src: "/images/shanhai/archive/overseas-north-forty-ninth.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555515/1/20",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 3 册，扫描 20（第四十九图）。",
      note: "右页操蛇大人旁有树木，相邻正文含“邓林在其东”。仅作夸父国篇章场景对照；树木无题名，不能据图确认遗杖化林的发生过程或树种。",
    },
  ],
  yinglong: [
    {
      id: "wilds-east-sixty-fifth",
      title: "应龙古图",
      src: "/images/shanhai/archive/wilds-east-sixty-fifth.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555516/1/15",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 4 册，扫描 15（第六十五图）。",
      note: "整幅为有翼龙形；相邻扫描第 16 图的正文明确记应龙及旱雨叙事。翼、鳞、爪呈现明代图像传统，不把绘者增饰倒写为本段经文的完整外形规定。",
    },
  ],
  zhuyin: [
    {
      id: "wilds-north-seventy-second",
      title: "烛龙跨篇对照",
      src: "/images/shanhai/archive/wilds-north-seventy-second.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555516/1/36",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 4 册，扫描 36（第七十二图）。",
      note: "左上人面蛇身形象依《大荒北经》烛龙条目辨识。当前节点采用《海外北经》烛阴；这里是跨篇对照，不是烛阴段落的原配图，也不是馆方逐兽鉴定。",
    },
  ],
  zhongshan: [
    {
      id: "wilds-north-seventy-second",
      title: "钟山之神的跨篇对照",
      src: "/images/shanhai/archive/wilds-north-seventy-second.webp",
      sourceUrl: "https://dl.ndl.go.jp/pid/2555516/1/36",
      credit:
        "蒋应镐绘《山海经》，明刊本，国立国会图书馆藏，第 4 册，扫描 36（第七十二图）。",
      note: "左上为《大荒北经》烛龙的人面蛇身形象。仅与《海外北经》钟山之神作跨篇对读；背景山线不能认作钟山，更不能据此把两篇山名或位置合并。",
    },
  ],
};
