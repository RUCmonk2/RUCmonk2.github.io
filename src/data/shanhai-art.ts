export interface ShanhaiArtwork {
  src: string;
  alt: string;
  basis: string;
  interpretation: string;
}

/** Individually commissioned AI illustrations; visual interpretations are separated from the text. */
export const shanhaiArtwork: Record<string, ShanhaiArtwork> = {
  zhaoyao: {
    src: "/images/shanhai/atlas/zhaoyao.webp",
    alt: "招摇山的原创水墨意象：临西海，多桂、多金玉。",
    basis: "临西海，多桂、多金玉。",
    interpretation: "山势与矿物色泽为当代想象，不对应现代地理位置。",
  },
  tangting: {
    src: "/images/shanhai/atlas/tangting.webp",
    alt: "堂庭山的原创水墨意象：多棪木、白猿、水玉、黄金。",
    basis: "多棪木、白猿、水玉、黄金。",
    interpretation: "林木和山体造型为意象；不把棪木指定为现代物种。",
  },
  yuanyi: {
    src: "/images/shanhai/atlas/yuanyi.webp",
    alt: "猨翼山的原创水墨意象：多怪兽、怪鱼、怪蛇、怪木，不可以上。",
    basis: "多怪兽、怪鱼、怪蛇、怪木，不可以上。",
    interpretation: "未具名生物以模糊形迹表达，不另造兽名。",
  },
  niuyang: {
    src: "/images/shanhai/atlas/niuyang.webp",
    alt: "杻阳山的原创水墨意象：其阳多赤金，其阴多白金，怪水出焉。",
    basis: "其阳多赤金，其阴多白金，怪水出焉。",
    interpretation: "明暗山面与矿纹据文字取意，河道形状为艺术构图。",
  },
  qingqiu: {
    src: "/images/shanhai/atlas/qingqiu.webp",
    alt: "青丘山的原创水墨意象：其阳多玉，其阴多青雘；英水出焉。",
    basis: "其阳多玉，其阴多青雘；英水出焉。",
    interpretation: "用淡青绿表现矿色；山貌与水道不是考据复原。",
  },
  jiwei: {
    src: "/images/shanhai/atlas/jiwei.webp",
    alt: "箕尾山的原创水墨意象：山尾临东海，多沙石。",
    basis: "山尾临东海，多沙石。",
    interpretation: "以延伸入海的山脊取意“其尾”，不对应实测海岸。",
  },
  xihai: {
    src: "/images/shanhai/atlas/xihai.webp",
    alt: "西海的原创水墨意象：招摇山临于西海之上。",
    basis: "招摇山临于西海之上。",
    interpretation: "海面与岸形为意象，不指定现实中的海或湖。",
  },
  liji: {
    src: "/images/shanhai/atlas/liji.webp",
    alt: "丽麂水的原创水墨意象：水出招摇，西流注海，水中多育沛。",
    basis: "水出招摇，西流注海，水中多育沛。",
    interpretation: "育沛所指未定，画面只表现泉流，不替它编造形态。",
  },
  guaishui: {
    src: "/images/shanhai/atlas/guaishui.webp",
    alt: "怪水的原创水墨意象：水出杻阳，东流注宪翼之水，其中多玄龟。",
    basis: "水出杻阳，东流注宪翼之水，其中多玄龟。",
    interpretation: "以河流环境为主；水下形迹为场景解释。",
  },
  xianyi: {
    src: "/images/shanhai/atlas/xianyi.webp",
    alt: "宪翼水的原创水墨意象：怪水向东流入宪翼水。",
    basis: "怪水向东流入宪翼水。",
    interpretation: "仅据汇流关系构图，不补出未知源头与河长。",
  },
  yingshui: {
    src: "/images/shanhai/atlas/yingshui.webp",
    alt: "英水的原创水墨意象：水出青丘，南流注即翼泽，其中多赤鱬。",
    basis: "水出青丘，南流注即翼泽，其中多赤鱬。",
    interpretation: "河形与水下色点为场景意象，非水系复原图。",
  },
  jiyi: {
    src: "/images/shanhai/atlas/jiyi.webp",
    alt: "即翼泽的原创水墨意象：英水向南流入即翼之泽。",
    basis: "英水向南流入即翼之泽。",
    interpretation: "原文仅述汇入关系；水泽形状与植被为当代意象。",
  },
  donghai: {
    src: "/images/shanhai/atlas/donghai.webp",
    alt: "东海的原创水墨意象：女娃溺海，精卫常衔木石以填东海。",
    basis: "女娃溺海，精卫常衔木石以填东海。",
    interpretation: "以木石与海浪的比例表达叙事，非现实海域肖像。",
  },
  zhuyu: {
    src: "/images/shanhai/atlas/zhuyu.webp",
    alt: "祝余的原创水墨意象：其状如韭而青华。",
    basis: "其状如韭而青华。",
    interpretation: "花形、根系为艺术解释，不据此认定可食现代植物。",
  },
  migu: {
    src: "/images/shanhai/atlas/migu.webp",
    alt: "迷榖的原创水墨意象：其状如榖而黑理，其华四照。",
    basis: "其状如榖而黑理，其华四照。",
    interpretation: "树形与发光效果为水墨意象，不作植物学复原。",
  },
  yanmu: {
    src: "/images/shanhai/atlas/yanmu.webp",
    alt: "棪木的原创水墨意象：堂庭之山多棪木；此句未详述形态。",
    basis: "堂庭之山多棪木；此句未详述形态。",
    interpretation: "枝叶造型为泛化草木意象，不把注文或现代物种混入经文。",
  },
  denglin: {
    src: "/images/shanhai/atlas/denglin.webp",
    alt: "邓林的原创水墨意象：夸父弃杖，化为邓林。",
    basis: "夸父弃杖，化为邓林。",
    interpretation: "呈现“杖化林”的神话意象；不擅自将其画成桃林。",
  },
  taihua: {
    src: "/images/shanhai/atlas/taihua.webp",
    alt: "太华山的原创水墨意象：削成而四方，极高且广，鸟兽莫居。",
    basis: "削成而四方，极高且广，鸟兽莫居。",
    interpretation: "突出古文形貌；不是现代华山照片或测绘复原。",
  },
  fajiu: {
    src: "/images/shanhai/atlas/fajiu.webp",
    alt: "发鸠山的原创水墨意象：其上多柘木，精卫故事附于此山。",
    basis: "其上多柘木，精卫故事附于此山。",
    interpretation: "树林与山形为篇章场景意象，不给出未经考证的现代地点。",
  },
  zhongshan: {
    src: "/images/shanhai/atlas/zhongshan.webp",
    alt: "钟山的原创水墨意象：烛阴居钟山之下，人面蛇身而赤。",
    basis: "烛阴居钟山之下，人面蛇身而赤。",
    interpretation: "山形与昼夜明暗取自神话语境，不等同今日同名山岳。",
  },
  xingxing: {
    src: "/images/shanhai/atlas/xingxing.webp",
    alt: "狌狌的原创水墨意象：形似禺、白耳，可伏行，也可如人奔走。",
    basis: "形似禺、白耳，可伏行，也可如人奔走。",
    interpretation: "毛色与姿态为艺术解释，不等同现代动物学中的猩猩。",
  },
  baiyuan: {
    src: "/images/shanhai/atlas/baiyuan.webp",
    alt: "白猿的原创水墨意象：堂庭之山多白猿，未记额外肢体或神异能力。",
    basis: "堂庭之山多白猿，未记额外肢体或神异能力。",
    interpretation: "以普通白色猿类意象表现，具体物种与环境为艺术选择。",
  },
  lushu: {
    src: "/images/shanhai/atlas/lushu.webp",
    alt: "鹿蜀的原创水墨意象：马身、白首、虎纹、赤尾，声音如歌谣。",
    basis: "马身、白首、虎纹、赤尾，声音如歌谣。",
    interpretation: "依据组合形态造像；不因名中有“鹿”便添加鹿角。",
  },
  xuangui: {
    src: "/images/shanhai/atlas/xuangui.webp",
    alt: "旋龟的原创水墨意象：龟形、鸟首、虺尾。",
    basis: "龟形、鸟首、虺尾。",
    interpretation: "鸟首与蛇尾是原文线索；壳纹、姿态和环境为艺术解释。",
  },
  jiuweihu: {
    src: "/images/shanhai/atlas/jiuweihu.webp",
    alt: "九尾狐的原创水墨意象：狐形而九尾，音如婴儿，能食人。",
    basis: "狐形而九尾，音如婴儿，能食人。",
    interpretation: "保留狐兽的陌生感，不将后世狐女故事移入此段。",
  },
  guanguan: {
    src: "/images/shanhai/atlas/guanguan.webp",
    alt: "灌灌的原创水墨意象：鸟形似鸠，音若呵。",
    basis: "鸟形似鸠，音若呵。",
    interpretation: "羽色与停栖姿态为艺术选择，不与精卫的白喙赤足混同。",
  },
  chiru: {
    src: "/images/shanhai/atlas/chiru.webp",
    alt: "赤鱬的原创水墨意象：鱼身人面，声音如鸳鸯。",
    basis: "鱼身人面，声音如鸳鸯。",
    interpretation: "面貌与鳞色为艺术解释；人面不意味着人类躯干或手臂。",
  },
  jingwei: {
    src: "/images/shanhai/atlas/jingwei.webp",
    alt: "精卫的原创水墨意象：乌形、文首、白喙、赤足，常衔木石填海。",
    basis: "乌形、文首、白喙、赤足，常衔木石填海。",
    interpretation: "按原文形态与动作造像；海浪和鸟首纹样为艺术解释。",
  },
  feiyi: {
    src: "/images/shanhai/atlas/feiyi.webp",
    alt: "肥遗的原创水墨意象：太华山之蛇，六足四翼，出现与大旱相连。",
    basis: "太华山之蛇，六足四翼，出现与大旱相连。",
    interpretation: "此图只对应六足四翼蛇；不混入同名鸟或其他肥遗形态。",
  },
  kuafu: {
    src: "/images/shanhai/atlas/kuafu.webp",
    alt: "夸父的原创水墨意象：逐日、渴饮河渭，欲北饮大泽，未至而死。",
    basis: "逐日、渴饮河渭，欲北饮大泽，未至而死。",
    interpretation:
      "身形、服饰与杖的外观为艺术解释，表达神话叙事而非史实复原。",
  },
  yinglong: {
    src: "/images/shanhai/atlas/yinglong.webp",
    alt: "应龙的原创水墨意象：居南方、杀蚩尤与夸父；人们仿其形求雨。",
    basis: "居南方、杀蚩尤与夸父；人们仿其形求雨。",
    interpretation: "本段未详述翼、角、爪等外形；画中龙形细节属于艺术选择。",
  },
  zhuyin: {
    src: "/images/shanhai/atlas/zhuyin.webp",
    alt: "烛阴的原创水墨意象：人面、蛇身、赤色，居钟山下；视为昼，瞑为夜。",
    basis: "人面、蛇身、赤色，居钟山下；视为昼，瞑为夜。",
    interpretation: "面貌、盘曲姿态与山形为当代解释；没有添加腿、翼或龙角。",
  },
};
