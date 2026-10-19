export type ShanhaiCategory =
  "mountain" | "water" | "creature" | "plant" | "deity";

export interface ShanhaiNode {
  id: string;
  name: string;
  pinyin: string;
  category: ShanhaiCategory;
  chapter: string;
  quote: string;
  translation: string;
  reading: string;
  sourceUrl: string;
  x: number;
  y: number;
}

export interface ShanhaiEdge {
  source: string;
  target: string;
  label: string;
}

export interface ShanhaiRoute {
  id: string;
  title: string;
  description: string;
  nodes: string[];
}

// 原文依据维基文库所收《山海经》核对，标点与简繁字作便读处理。
// 不采录现代译文；translation、reading 为本图谱编写的释义与阅读提示。
// 坐标仅用于关系布局，不表示现代经纬度或古代里程的等比例复原。
const SOUTH = "https://zh.wikisource.org/zh-hans/山海經/南山經#南山经之首";
const WEST = "https://zh.wikisource.org/zh-hans/山海經/西山經#西山经之首";
const NORTH = "https://zh.wikisource.org/zh-hans/山海經/北山經#北次三经";
const OVERSEAS = "https://zh.wikisource.org/zh-hans/山海經/海外北經";
const WILDS = "https://zh.wikisource.org/zh-hans/山海經/大荒東經";

export const shanhaiNodes: ShanhaiNode[] = [
  {
    id: "zhaoyao",
    name: "招摇山",
    pinyin: "Zhāo yáo",
    category: "mountain",
    chapter: "南山经 · 招摇之山",
    quote: "其首曰招摇之山，临于西海之上，多桂，多金玉。",
    translation: "这一列山的起点叫招摇山，靠近西海，生长许多桂树，也多金玉。",
    reading:
      "山名是阅读的入口：草木、兽类、水流都依附于它展开。这里把方位、物产与传说写在同一段中，可以看出《山经》的组织方式。“临于西海”是书中的位置关系，不能据此直接标成今天某座山。",
    sourceUrl: SOUTH,
    x: 240,
    y: 395,
  },
  {
    id: "tangting",
    name: "堂庭山",
    pinyin: "Táng tíng",
    category: "mountain",
    chapter: "南山经 · 堂庭之山",
    quote: "又东三百里，曰堂庭之山，多棪木，多白猿，多水玉，多黄金。",
    translation: "再向东三百里是堂庭山，那里多棪木、白猿、水玉和黄金。",
    reading:
      "连续四个“多”把一座山写成一份物产清单。与招摇山相比，这段没有给每种物产附上传说功效，提醒我们不必把所有山中生物都叫作“神兽”。三百里保留为文本信息，不换算成现代导航距离。",
    sourceUrl: SOUTH,
    x: 410,
    y: 360,
  },
  {
    id: "yuanyi",
    name: "猨翼山",
    pinyin: "Yuán yì",
    category: "mountain",
    chapter: "南山经 · 猨翼之山",
    quote:
      "又东三百八十里，曰猿翼之山，其中多怪兽，水多怪鱼……多怪蛇，多怪木，不可以上。",
    translation:
      "再向东三百八十里是猨翼山，山水间多有奇异的兽、鱼、蛇、树，不能登上去。",
    reading:
      "“猨”与“猿”是此处山名的不同字形。原文只说“怪兽”“怪鱼”，没有逐一命名，因此图谱也不替它们虚构名字。“不可以上”标记叙述者所说的危险边界，并不能当成一处现代山岳的登山说明。",
    sourceUrl: SOUTH,
    x: 515,
    y: 450,
  },
  {
    id: "niuyang",
    name: "杻阳山",
    pinyin: "Niǔ yáng",
    category: "mountain",
    chapter: "南山经 · 杻阳之山",
    quote: "又东三百七十里，曰杻阳之山，其阳多赤金，其阴多白金。",
    translation: "再向东三百七十里是杻阳山，山的阳面多赤金，阴面多白金。",
    reading:
      "“阳”“阴”区分山体的不同面向；同一条目又引出鹿蜀、怪水和旋龟，形成山—水—物的层次。图中通向青丘的线是节选后的阅读顺序，中间另有柢山、亶爰山、基山，不是两山直接相邻。",
    sourceUrl: SOUTH,
    x: 590,
    y: 355,
  },
  {
    id: "qingqiu",
    name: "青丘山",
    pinyin: "Qīng qiū",
    category: "mountain",
    chapter: "南山经 · 青丘之山",
    quote: "又东三百里，曰青丘之山，其阳多玉，其阴多青雘。",
    translation: "从前一条的基山再向东三百里，是青丘山；阳面多玉，阴面多青雘。",
    reading:
      "青丘不仅有九尾狐，也有灌灌、英水与赤鱬。把它们放回同一山川环境，故事便不只围绕一只明星异兽展开。其他篇章也有“青丘国”，本图不因同名便把山与国、或现代某地视为同一个地点。",
    sourceUrl: SOUTH,
    x: 770,
    y: 495,
  },
  {
    id: "jiwei",
    name: "箕尾山",
    pinyin: "Jī wěi",
    category: "mountain",
    chapter: "南山经 · 箕尾之山",
    quote: "又东三百五十里，曰箕尾之山，其尾踆于东海，多沙石。",
    translation: "再向东三百五十里是箕尾山，山尾临着东海，多沙石。",
    reading:
      "“其尾”让山呈现出有头有尾的绵延形态。招摇开篇临西海，箕尾收束于东海，构成这一组山的叙述框架。这样的首尾照应值得观察，但不等于已经得到一条横贯现代中国的精确路线。",
    sourceUrl: SOUTH,
    x: 915,
    y: 570,
  },
  {
    id: "xihai",
    name: "西海",
    pinyin: "Xī hǎi",
    category: "water",
    chapter: "南山经 · 招摇之山",
    quote: "其首曰招摇之山，临于西海之上。",
    translation: "招摇山是这组山的起点，它临近书中所称的西海。",
    reading:
      "海在这里首先是确定山之方位的参照。不同篇章的“海”可能处在不同叙述框架中，不能只凭“西”字就指定为今天某片海或湖。本图仅保留招摇山“临海”这一原文明确写出的关系。",
    sourceUrl: SOUTH,
    x: 110,
    y: 495,
  },
  {
    id: "liji",
    name: "丽麂水",
    pinyin: "Lì jǐ",
    category: "water",
    chapter: "南山经 · 招摇之山",
    quote: "丽𪊨之水出焉，而西流注于海，其中多育沛，佩之无瘕疾。",
    translation:
      "丽麂水从招摇山流出，向西入海。水中多育沛，书中说佩带它可免瘕疾。",
    reading:
      "水名的第二字在所引底本中作“𪊨”，这里显示为便于识读的“麂”。育沛究竟是何物，不能仅凭一句话就归为草药，所以没有强行给它分类。“佩之无瘕疾”属于传说功效，不是医学事实。",
    sourceUrl: SOUTH,
    x: 145,
    y: 410,
  },
  {
    id: "guaishui",
    name: "怪水",
    pinyin: "Guài shuǐ",
    category: "water",
    chapter: "南山经 · 杻阳之山",
    quote: "怪水出焉，而东流注于宪翼之水。其中多玄龟。",
    translation: "怪水发源于杻阳山，向东流入宪翼水，水中有许多玄色的龟。",
    reading:
      "这里的“怪水”是水名，不能简单理解成“一条奇怪的河”。下文接着描述旋龟，水流也就成了异兽的栖息环境。图中的流向来自文字，河道形状与节点位置则是阅读布局，并非实测地理。",
    sourceUrl: SOUTH,
    x: 600,
    y: 505,
  },
  {
    id: "xianyi",
    name: "宪翼水",
    pinyin: "Xiàn yì",
    category: "water",
    chapter: "南山经 · 杻阳之山",
    quote: "怪水出焉，而东流注于宪翼之水。",
    translation: "从杻阳山流出的怪水，向东汇入宪翼水。",
    reading:
      "原文给宪翼水的信息很少，只把它写作怪水的汇入处。保留一个资料有限的节点，比补出未经记载的长度、源头或现代位置更可靠。它也展示了图谱为何需要“流入”这样有方向的关系。",
    sourceUrl: SOUTH,
    x: 500,
    y: 590,
  },
  {
    id: "yingshui",
    name: "英水",
    pinyin: "Yīng shuǐ",
    category: "water",
    chapter: "南山经 · 青丘之山",
    quote: "英水出焉，南流注于即翼之泽。其中多赤鱬。",
    translation: "英水发源于青丘山，向南流入即翼泽；水中多赤鱬。",
    reading:
      "这个节点限定为青丘条目中的英水。《南次二经》柜山条目也有同名水流，但流向与汇入处不同，因此不凭同名合并。赤鱬接在水流之后出现，图谱按这一上下文把它与英水相连。",
    sourceUrl: SOUTH,
    x: 805,
    y: 615,
  },
  {
    id: "jiyi",
    name: "即翼泽",
    pinyin: "Jí yì",
    category: "water",
    chapter: "南山经 · 青丘之山",
    quote: "英水出焉，南流注于即翼之泽。",
    translation: "英水从青丘山流出，向南进入名为即翼的水泽。",
    reading:
      "“泽”与“山”“水”共同组成这段文字的地理层次。原文没有交代它的面积或现代对应地点，本图也保留这份未知。沿着青丘—英水—即翼泽，可以追踪一条有依据的水系关系。",
    sourceUrl: SOUTH,
    x: 910,
    y: 650,
  },
  {
    id: "donghai",
    name: "东海",
    pinyin: "Dōng hǎi",
    category: "water",
    chapter: "北山经 · 发鸠之山",
    quote: "女娃游于东海，溺而不返，故为精卫，常衔西山之木石，以堙于东海。",
    translation:
      "女娃游东海时溺亡，化为精卫，此后不断衔来西山的木石，想要填海。",
    reading:
      "东海既出现在精卫故事中，也见于箕尾山的方位描写。本图将同名意象作为跨篇阅读入口，不声称两段文字已经共享可验证的现代坐标。对精卫而言，海同时是灾难发生之处与持续行动的对象。",
    sourceUrl: NORTH,
    x: 950,
    y: 400,
  },
  {
    id: "zhuyu",
    name: "祝余",
    pinyin: "Zhù yú",
    category: "plant",
    chapter: "南山经 · 招摇之山",
    quote: "有草焉，其状如韭而青华，其名曰祝余，食之不饥。",
    translation:
      "有一种草，形状像韭菜，开青色的花，名叫祝余；书中说吃了便不会饥饿。",
    reading:
      "这句话依次给出类别、外形、名字与传说功效，像一张简短的植物档案。“如韭”只是外形比较，不能据此确定现代物种。“食之不饥”反映古人对饥饿的想象与愿望，不是营养学或食用建议。",
    sourceUrl: SOUTH,
    x: 160,
    y: 285,
  },
  {
    id: "migu",
    name: "迷榖",
    pinyin: "Mí gǔ",
    category: "plant",
    chapter: "南山经 · 招摇之山",
    quote: "有木焉，其状如榖而黑理，其华四照，其名曰迷谷，佩之不迷。",
    translation:
      "有一种树，形似榖树，纹理发黑，花光照四方；书中称迷谷，佩带它就不迷路。",
    reading:
      "名称亦常写作“迷榖”；引句依所链接文本作“迷谷”。“不迷”的效果与名字形成鲜明的记忆联系，可与灌灌的“不惑”并读。发光与防迷路都是文本中的神异属性，不能据此认定某种现实植物有导航功效。",
    sourceUrl: SOUTH,
    x: 275,
    y: 245,
  },
  {
    id: "yanmu",
    name: "棪木",
    pinyin: "Yǎn mù",
    category: "plant",
    chapter: "南山经 · 堂庭之山",
    quote: "又东三百里，曰堂庭之山，多棪木，多白猿，多水玉，多黄金。",
    translation: "堂庭山上多棪木，也有白猿、水玉与黄金。",
    reading:
      "棪木在经文中只以物产之名出现；关于果实的说明见于注文，而非这一句经文。阅读时先区分正文与后世注解，便不会把不同年代的知识混成同一层。这一节点也不强行对应到现代植物分类。",
    sourceUrl: SOUTH,
    x: 395,
    y: 260,
  },
  {
    id: "denglin",
    name: "邓林",
    pinyin: "Dèng lín",
    category: "plant",
    chapter: "海外北经 · 夸父逐日",
    quote: "未至，道渴而死。弃其杖，化为邓林。",
    translation: "夸父还没有到达大泽，就在途中渴死；他遗下的手杖化为邓林。",
    reading:
      "追逐以死亡告终，故事却用“化为林”继续展开：人的器物成为大地上的生长之物。这里归入草木类，是方便探索的界面分类，并不意味着邓林是一个植物物种；经文此句也没有直接写“桃林”。",
    sourceUrl: OVERSEAS,
    x: 675,
    y: 135,
  },
  {
    id: "xingxing",
    name: "狌狌",
    pinyin: "Xīng xīng",
    category: "creature",
    chapter: "南山经 · 招摇之山",
    quote: "有兽焉，其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。",
    translation: "有兽形似禺，耳朵白色，能伏地行走，也能像人一样跑，名叫狌狌。",
    reading:
      "白耳、行走姿态与名称共同构成识别线索。“走”在这里指奔跑，“食之善走”说的是食用后的传说效果。它不是现代运动医学的事实，也不能因名称相近就把整段描写等同于现代动物学里的猩猩。",
    sourceUrl: SOUTH,
    x: 250,
    y: 550,
  },
  {
    id: "baiyuan",
    name: "白猿",
    pinyin: "Bái yuán",
    category: "creature",
    chapter: "南山经 · 堂庭之山",
    quote: "堂庭之山，多棪木，多白猿，多水玉，多黄金。",
    translation: "堂庭山的物产包括棪木、白猿、水玉与黄金。",
    reading:
      "这一句没有赋予白猿额外肢体、神奇能力或灾异征兆。把它与狌狌并读，会看到书中有简略的动物记录，也有详细的异兽刻画；“山海经生物”不应自动等同于一种固定的奇幻造型。",
    sourceUrl: SOUTH,
    x: 405,
    y: 490,
  },
  {
    id: "lushu",
    name: "鹿蜀",
    pinyin: "Lù shǔ",
    category: "creature",
    chapter: "南山经 · 杻阳之山",
    quote: "其状如马而白首，其文如虎而赤尾，其音如谣，其名曰鹿蜀，佩之宜子孙。",
    translation:
      "鹿蜀形似马，白头、虎纹、红尾，声音像歌谣；书中说佩带它有利于子孙。",
    reading:
      "马的体形、虎的花纹与人的歌声被组合在一起，感官线索比一个笼统的“怪”字更丰富。“佩之”指向佩用身体材料的观念，不是把整只兽挂在身上；“宜子孙”是传说中的祝愿，不是生育功效的证据。",
    sourceUrl: SOUTH,
    x: 555,
    y: 245,
  },
  {
    id: "xuangui",
    name: "旋龟",
    pinyin: "Xuán guī",
    category: "creature",
    chapter: "南山经 · 杻阳之山",
    quote: "其状如龟而鸟首虺尾，其名曰旋龟，其音如判木，佩之不聋。",
    translation:
      "旋龟体形像龟，长着鸟头和蛇尾，声音像劈木头；书中说佩用它可以不聋。",
    reading:
      "它不是简单的“长翅膀的乌龟”：经文说的是鸟首与虺尾。“如判木”把陌生动物的声音连接到日常经验。此条的佩用功效属于古代传说，不是预防或治疗听力损失的方法。",
    sourceUrl: SOUTH,
    x: 655,
    y: 600,
  },
  {
    id: "jiuweihu",
    name: "九尾狐",
    pinyin: "Jiǔ wěi hú",
    category: "creature",
    chapter: "南山经 · 青丘之山",
    quote: "有兽焉，其状如狐而九尾，其音如婴儿，能食人；食者不蛊。",
    translation:
      "有一种像狐而长九条尾巴的兽，叫声像婴儿，能吃人；书中又说食其肉可不受蛊害。",
    reading:
      "本段没有写它化作女子或与人相恋。人们熟悉的后世狐妖形象，不能倒填为这段经文的内容。它一面具有危险性，一面又被赋予保护性功效，这种并置值得细读；“不蛊”不是现代医学结论。",
    sourceUrl: SOUTH,
    x: 705,
    y: 410,
  },
  {
    id: "guanguan",
    name: "灌灌",
    pinyin: "Guàn guàn",
    category: "creature",
    chapter: "南山经 · 青丘之山",
    quote: "有鸟焉，其状如鸠，其音若呵，名曰灌灌，佩之不惑。",
    translation:
      "有鸟形似鸠，声音像人呼呵，名叫灌灌；书中说佩用它可以不受迷惑。",
    reading:
      "青丘的另一种生物以声音和“不惑”而被记住。它与迷榖的“不迷”可以作主题比较，但两者并非同一种功效、也没有在原文中直接相遇。图中的对读关系是编辑设置，佩用之说属于传说。",
    sourceUrl: SOUTH,
    x: 865,
    y: 485,
  },
  {
    id: "chiru",
    name: "赤鱬",
    pinyin: "Chì rú",
    category: "creature",
    chapter: "南山经 · 青丘之山",
    quote: "其中多赤鱬，其状如鱼而人面，其音如鸳鸯，食之不疥。",
    translation: "水中多赤鱬，鱼身人面，声音像鸳鸯；书中说食用它可以不生疥病。",
    reading:
      "“鱼身—人面—鸟声”跨越了不同生物的特征，构成一种复合形象。它出现在青丘水系的描述中，说明异兽并不总独立于地理环境。“食之不疥”记录的是古代传说，不能用作治疗皮肤病的依据。",
    sourceUrl: SOUTH,
    x: 735,
    y: 650,
  },
  {
    id: "jingwei",
    name: "精卫",
    pinyin: "Jīng wèi",
    category: "creature",
    chapter: "北山经 · 发鸠之山",
    quote: "有鸟焉，其状如乌，文首、白喙、赤足，名曰精卫，其鸣自詨。",
    translation:
      "有鸟形似乌，头有花纹，白喙红足，名叫精卫；它的叫声像在呼唤自己的名字。",
    reading:
      "下文说它是炎帝少女女娃溺海后所化，不要与“女娲”混同。原文写它常衔木石填海，却没有写最终填平了海。“坚韧”是我们可以讨论的理解；化鸟、填海仍应作为神话叙述来读。",
    sourceUrl: NORTH,
    x: 800,
    y: 275,
  },
  {
    id: "feiyi",
    name: "肥遗",
    pinyin: "Féi yí",
    category: "creature",
    chapter: "西山经 · 太华之山",
    quote: "有蛇焉，名曰肥𧒭，六足四翼，见则天下大旱。",
    translation: "有蛇名为肥遗，长六足四翼；书中说它出现便会发生大旱。",
    reading:
      "底本文字作“肥𧒭”，常写作“肥遗”。这里特指太华山的六足四翼蛇；书中还有同名鸟与另一种蛇，不能把形态混装。“见则”把出现与旱灾相连，是灾异观念，不是经过验证的气象因果。",
    sourceUrl: WEST,
    x: 160,
    y: 150,
  },
  {
    id: "taihua",
    name: "太华山",
    pinyin: "Tài huà",
    category: "mountain",
    chapter: "西山经 · 太华之山",
    quote:
      "又西六十里，曰太华之山，削成而四方，其高五千仞，其广十里，鸟兽莫居。",
    translation:
      "再向西六十里是太华山，山形像削成的四方体，极高且广，鸟兽难以栖居。",
    reading:
      "这段先写山的陡峻，再写六足四翼的肥遗，异蛇由此出现在一种非常的环境中。传统注家把太华与华山联系起来，但古文中的高度、形貌与行程不能直接当作现代测绘数据。",
    sourceUrl: WEST,
    x: 320,
    y: 125,
  },
  {
    id: "fajiu",
    name: "发鸠山",
    pinyin: "Fā jiū",
    category: "mountain",
    chapter: "北山经 · 发鸠之山",
    quote: "又北二百里，曰发鸠之山，其上多柘木。",
    translation: "再向北二百里是发鸠山，山上多柘树。",
    reading:
      "精卫的著名故事就嵌在这样一句平实的山川物产记录之后，末尾又回到漳水流向。观察这段的开头与结尾，会发现神话并没有脱离《山经》的地理编排。这里保留文本地点，不给出未经论证的现代坐标。",
    sourceUrl: NORTH,
    x: 910,
    y: 235,
  },
  {
    id: "zhongshan",
    name: "钟山",
    pinyin: "Zhōng shān",
    category: "mountain",
    chapter: "海外北经 · 钟山之神",
    quote: "锺山之神名曰烛阴……其为物，人面，蛇身，赤色，居锺山下。",
    translation: "钟山之神名叫烛阴，呈人面、蛇身、赤色，住在钟山下面。",
    reading:
      "这里限定为《海外北经》中烛阴所居的钟山。它不能仅凭同名就与别篇的钟山，或今天南京的钟山合并。山与神的关系由文本明确给出，现代定位则留待专门考证。",
    sourceUrl: OVERSEAS,
    x: 525,
    y: 100,
  },
  {
    id: "kuafu",
    name: "夸父",
    pinyin: "Kuā fù",
    category: "deity",
    chapter: "海外北经 · 夸父逐日",
    quote:
      "夸父与日逐走，入日。渴，欲得饮，饮于河、渭，河、渭不足，北饮大泽。未至，道渴而死。",
    translation:
      "夸父追赶太阳，口渴后饮河、渭之水仍不够，又向北寻找大泽，却在途中渴死。",
    reading:
      "这一篇写“渴而死”，《大荒东经》却另写应龙杀夸父。图谱保留两种叙述，不把它们拼成唯一时间线。“神祇”是界面中对神话人物的宽泛分组，不等于此段原文明确授予夸父某一神职。",
    sourceUrl: OVERSEAS,
    x: 670,
    y: 240,
  },
  {
    id: "yinglong",
    name: "应龙",
    pinyin: "Yìng lóng",
    category: "deity",
    chapter: "大荒东经 · 凶犁土丘",
    quote:
      "应龙出南极，杀蚩尤与夸父，不得复上。故下数旱，旱而为应龙之状，乃得大雨。",
    translation:
      "应龙来到南方极地，杀死蚩尤和夸父，不能再上去；天下屡旱，人们仿作应龙形状求来大雨。",
    reading:
      "这段把应龙、战争与求雨联系起来，重点不只是龙的外形。“出”另有版本作“处”。它还提供了夸父的另一种结局，与逐日渴死的说法应分篇阅读；仿龙得雨是神话与仪式观念，不是气象事实。",
    sourceUrl: WILDS,
    x: 750,
    y: 100,
  },
  {
    id: "zhuyin",
    name: "烛阴",
    pinyin: "Zhú yīn",
    category: "deity",
    chapter: "海外北经 · 钟山之神",
    quote: "锺山之神名曰烛阴，视为昼，瞑为夜，吹为冬，呼为夏。",
    translation:
      "钟山神叫烛阴，睁眼便是白昼，闭眼便是黑夜，吹气成冬，呼气成夏。",
    reading:
      "昼夜与季节被写成一个巨大身体的动作，抽象的时间由此变得可感。可以把它与夸父对读，观察“太阳、光与身体”如何参与叙事；这不意味着原文声称二者相遇，也不能把神话解释当作天文学事实。",
    sourceUrl: OVERSEAS,
    x: 545,
    y: 165,
  },
];

export const shanhaiEdges: ShanhaiEdge[] = [
  { source: "zhaoyao", target: "tangting", label: "东行三百里" },
  { source: "tangting", target: "yuanyi", label: "东行三百八十里" },
  { source: "yuanyi", target: "niuyang", label: "东行三百七十里" },
  { source: "niuyang", target: "qingqiu", label: "东行 · 中经三山" },
  { source: "qingqiu", target: "jiwei", label: "东行三百五十里" },
  { source: "zhaoyao", target: "xihai", label: "临于西海" },
  { source: "zhaoyao", target: "liji", label: "水出于此" },
  { source: "zhaoyao", target: "zhuyu", label: "有草焉" },
  { source: "zhaoyao", target: "migu", label: "有木焉" },
  { source: "zhaoyao", target: "xingxing", label: "有兽焉" },
  { source: "tangting", target: "yanmu", label: "多棪木" },
  { source: "tangting", target: "baiyuan", label: "多白猿" },
  { source: "niuyang", target: "lushu", label: "有兽焉" },
  { source: "niuyang", target: "guaishui", label: "水出于此" },
  { source: "guaishui", target: "xianyi", label: "向东流入" },
  { source: "guaishui", target: "xuangui", label: "水中有兽" },
  { source: "qingqiu", target: "jiuweihu", label: "有兽焉" },
  { source: "qingqiu", target: "guanguan", label: "有鸟焉" },
  { source: "qingqiu", target: "yingshui", label: "水出于此" },
  { source: "yingshui", target: "jiyi", label: "向南流入" },
  { source: "yingshui", target: "chiru", label: "水中有兽" },
  { source: "jiwei", target: "donghai", label: "山尾临海 · 同名关联" },
  { source: "taihua", target: "feiyi", label: "有蛇焉" },
  { source: "fajiu", target: "jingwei", label: "有鸟焉" },
  { source: "jingwei", target: "donghai", label: "衔木石以填海" },
  { source: "kuafu", target: "denglin", label: "遗杖化林" },
  { source: "yinglong", target: "kuafu", label: "杀夸父 · 另一叙事" },
  { source: "zhongshan", target: "zhuyin", label: "山之神" },
  // 以下明确标为编辑对读，不当作经文中直接发生的事件或地理关系。
  { source: "feiyi", target: "yinglong", label: "旱雨母题 · 对读" },
  { source: "zhuyin", target: "kuafu", label: "日光母题 · 对读" },
  { source: "jingwei", target: "kuafu", label: "追逐与转化 · 对读" },
  { source: "migu", target: "guanguan", label: "不迷与不惑 · 对读" },
];

export const shanhaiRoutes: ShanhaiRoute[] = [
  {
    id: "south-journey",
    title: "从招摇，向东而行",
    description:
      "沿《南山经》的节选次序读六座山，看物产、异兽与水流如何围绕山展开。杻阳与青丘之间略去柢、亶爰、基三山；图上距离不对应古代里程。",
    nodes: ["zhaoyao", "tangting", "yuanyi", "niuyang", "qingqiu", "jiwei"],
  },
  {
    id: "strange-lives",
    title: "异兽是怎样写成的",
    description:
      "从白耳、虎纹、鸟首与九尾入手，分辨外形、声音、传说功效三层信息。回到原文，看看熟悉的神兽形象有哪些来自后世。",
    nodes: ["xingxing", "lushu", "xuangui", "jiuweihu", "guanguan", "chiru"],
  },
  {
    id: "myth-echoes",
    title: "追日、填海与风雨",
    description:
      "从精卫到夸父，再读应龙与烛阴。比较持久的行动、不同的结局，以及古人如何让自然现象进入神话；这是一条主题对读路线。",
    nodes: ["jingwei", "donghai", "kuafu", "denglin", "yinglong", "zhuyin"],
  },
];
