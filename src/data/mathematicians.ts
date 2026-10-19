import {
  analysisMathematicians,
  analysisRelations,
} from "./mathematicians-analysis";
import { earlyMathematicians, earlyRelations } from "./mathematicians-early";
import {
  goettingenMathematicians,
  goettingenRelations,
} from "./mathematicians-goettingen";
import { modernMathematicians, modernRelations } from "./mathematicians-modern";
import {
  originsMathematicians,
  originsRelations,
} from "./mathematicians-origins";

export type LocalizedText = { zh: string; en: string };

export type Mathematician = {
  id: string;
  name: LocalizedText;
  fullName: string;
  born: number;
  died: number | null;
  lifeDates?: LocalizedText;
  place: LocalizedText;
  field: LocalizedText;
  hook: LocalizedText;
  summary: LocalizedText;
  portrait: {
    src: string;
    alt: LocalizedText;
    credit: LocalizedText;
    href: string;
    kind?: "portrait" | "later-depiction" | "monogram";
    license?: { label: string; href: string };
  };
  achievements: {
    year: string;
    title: LocalizedText;
    description: LocalizedText;
    formula?: string;
    link?: { href: string; label: LocalizedText };
  }[];
  timeline: { year: string; text: LocalizedText }[];
  sources: { title: string; href: string }[];
};

export type ScholarRelation = {
  id: string;
  source: string;
  target: string;
  kind: "mentorship" | "influence" | "parallel" | "support";
  direction?: "forward" | "both";
  label: LocalizedText;
  description: LocalizedText;
  sourceUrl: string;
};

const l = (zh: string, en: string): LocalizedText => ({ zh, en });
const macTutor = (name: string) =>
  `https://mathshistory.st-andrews.ac.uk/Biographies/${name}/`;

// The portraits are historical public-domain works, not generated likenesses.
// Bibliographic details and image metadata live in docs/mathematicians-sources.md
// and public/images/mathematicians/sources.json.
const foundingMathematicians: Mathematician[] = [
  {
    id: "gauss",
    name: l("高斯", "Gauss"),
    fullName: "Carl Friedrich Gauss",
    born: 1777,
    died: 1855,
    place: l("不伦瑞克 → 哥廷根", "Brunswick → Göttingen"),
    field: l("数论 · 几何", "Number theory · Geometry"),
    hook: l(
      "整数的规律，怎样连接到空间的弯曲？",
      "From patterns in integers to the curvature of space.",
    ),
    summary: l(
      "高斯把数论、几何与实际测量放在同一张工作台上。研究整数时，他寻找严格的结构；测量土地时，他追问曲面自身的性质。黎曼和戴德金在他晚年的哥廷根完成博士研究，又把这些问题带向不同方向。",
      "Gauss moved between number theory, geometry and measurement. He sought structure in integers and intrinsic properties of curved surfaces. In his later Göttingen years, Riemann and Dedekind completed their doctorates under him, then pursued very different directions.",
    ),
    portrait: {
      src: "/images/mathematicians/gauss.jpg",
      alt: l(
        "戴着深色软帽的高斯油画肖像",
        "Painted portrait of Gauss wearing a dark cap",
      ),
      credit: l(
        "Gottlieb Biermann，1887，临摹 C. A. Jensen 1840 年肖像 · 公共领域",
        "Gottlieb Biermann, 1887, after C. A. Jensen’s 1840 portrait · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:Carl_Friedrich_Gauss.jpg",
    },
    achievements: [
      {
        year: "1796",
        title: l("尺规作出正十七边形", "Constructing the regular 17-gon"),
        description: l(
          "他证明正十七边形可以只用直尺和圆规作出。一个古老的几何作图问题，由此与方程和整数的结构接上了线。",
          "He proved that a regular 17-gon can be constructed with straightedge and compass, connecting an ancient geometric problem to equations and arithmetic.",
        ),
        formula: "17 = 2^{2^2}+1",
      },
      {
        year: "1801",
        title: l("《算术研究》", "Disquisitiones Arithmeticae"),
        description: l(
          "系统组织同余、二次互反律与二次型。把「余数相同」变成一套可以推理的语言，是现代数论的重要起点。",
          "Congruences, quadratic reciprocity and quadratic forms became a systematic theory. Sharing a remainder could now be expressed and manipulated precisely.",
        ),
        formula: "a \\equiv b \\pmod m",
      },
      {
        year: "1827–1828",
        title: l("曲率属于曲面自身", "Curvature from within"),
        description: l(
          "绝妙定理说明：高斯曲率可由曲面上的距离测量决定。纸可以卷成圆筒，却无法不拉伸地铺满球面；差别就在内在曲率。",
          "Theorema Egregium makes Gaussian curvature an intrinsic quantity. A flat sheet can roll into a cylinder, but cannot cover a sphere without stretching.",
        ),
        formula: "K = \\kappa_1\\kappa_2",
      },
    ],
    timeline: [
      { year: "1777", text: l("生于不伦瑞克。", "Born in Brunswick.") },
      {
        year: "1799",
        text: l(
          "在黑尔姆施泰特获博士学位，研究代数基本定理。",
          "Earned his doctorate at Helmstedt, studying the fundamental theorem of algebra.",
        ),
      },
      {
        year: "1807",
        text: l(
          "任哥廷根天文台台长，长期从事天文与测量工作。",
          "Became director of Göttingen Observatory, working in astronomy and surveying.",
        ),
      },
      {
        year: "1855",
        text: l("卒于哥廷根，享年 77 岁。", "Died in Göttingen, aged 77."),
      },
    ],
    sources: [
      { title: "MacTutor · Carl Friedrich Gauss", href: macTutor("Gauss") },
      {
        title:
          "ETH-Bibliothek · Disquisitiones generales circa superficies curvas (1828)",
        href: "https://www.e-rara.ch/zut/doi/10.3931/e-rara-59755",
      },
    ],
  },
  {
    id: "abel",
    name: l("阿贝尔", "Abel"),
    fullName: "Niels Henrik Abel",
    born: 1802,
    died: 1829,
    place: l("挪威 → 柏林与巴黎", "Norway → Berlin & Paris"),
    field: l("方程 · 椭圆函数", "Equations · Elliptic functions"),
    hook: l(
      "证明一条路走不通，也能打开新的数学。",
      "Proving a limit can open a new field.",
    ),
    summary: l(
      "阿贝尔追问求根公式的边界，也研究超出初等函数的新函数。他依靠老师、朋友和期刊编辑的支持，在经济拮据中完成研究。他与伽罗瓦面对相近的方程问题，但并无师生关系。",
      "Abel investigated the limits of root formulas and functions beyond elementary calculus. Teachers, friends and an editor supported his work amid financial difficulty. He and Galois studied related equation problems; they were not teacher and pupil.",
    ),
    portrait: {
      src: "/images/mathematicians/abel.jpg",
      alt: l(
        "阿贝尔侧身凝视的历史绘画肖像",
        "Historical painted portrait of Abel looking to the side",
      ),
      credit: l(
        "Johan Gørbitz，1820 年代肖像，1885 年书中复制 · 公共领域",
        "Johan Gørbitz, 1820s portrait, reproduced in an 1885 book · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:G%C3%B8rbitz_-_Niels_Henrik_Abel.jpg",
    },
    achievements: [
      {
        year: "1824",
        title: l(
          "一般五次方程没有根式公式",
          "No general radical formula for quintics",
        ),
        description: l(
          "证明一般五次方程无法像二次方程那样，只靠有限次四则运算与开根号求解。这限制的是通用公式；个别五次方程仍可根式求解。",
          "A general quintic cannot be solved by a finite formula of arithmetic operations and radicals. This rules out a universal formula; some particular quintics remain solvable.",
        ),
        link: {
          href: "/learning/math-lab/galois",
          label: l("探索方程与对称性", "Explore equations and symmetry"),
        },
      },
      {
        year: "1826",
        title: l(
          "把加法定理推广到代数积分",
          "An addition theorem for algebraic integrals",
        ),
        description: l(
          "在巴黎提交的论文把特殊积分之间的关系推广到更一般的代数曲线。这条线索后来进入阿贝尔积分与代数几何。",
          "His Paris memoir extended addition relations to integrals on general algebraic curves, opening a path toward Abelian integrals and algebraic geometry.",
        ),
      },
      {
        year: "1827",
        title: l("反过来看椭圆积分", "Inverting elliptic integrals"),
        description: l(
          "与雅可比独立发展椭圆函数理论：不只问积分怎么计算，也把积分的反函数当作研究对象，显露出双周期等新结构。",
          "Independently of Jacobi, he developed elliptic functions by studying inverses of elliptic integrals, revealing structures such as double periodicity.",
        ),
      },
    ],
    timeline: [
      {
        year: "1802",
        text: l(
          "生于挪威芬岛，后在耶尔斯塔长大。",
          "Born on Finnøy, Norway; grew up in Gjerstad.",
        ),
      },
      {
        year: "1821",
        text: l(
          "进入克里斯蒂安尼亚大学，继续研究方程。",
          "Entered the University of Christiania and continued studying equations.",
        ),
      },
      {
        year: "1825–1827",
        text: l(
          "游学柏林、巴黎，与克雷尔建立长期出版合作。",
          "Travelled to Berlin and Paris, forming a lasting publishing partnership with Crelle.",
        ),
      },
      {
        year: "1829",
        text: l("因结核病去世，年仅 26 岁。", "Died of tuberculosis, aged 26."),
      },
    ],
    sources: [
      {
        title: "The Abel Prize · About Niels Henrik Abel",
        href: "https://abelprize.no/page/about-niels-henrik-abel",
      },
      {
        title: "The Abel Prize · The great journey abroad",
        href: "https://abelprize.no/page/biography-niels-henrik-abel-great-journey-abroad",
      },
      { title: "MacTutor · Niels Henrik Abel", href: macTutor("Abel") },
    ],
  },
  {
    id: "galois",
    name: l("伽罗瓦", "Galois"),
    fullName: "Évariste Galois",
    born: 1811,
    died: 1832,
    place: l("布尔拉雷讷 → 巴黎", "Bourg-la-Reine → Paris"),
    field: l("群 · 方程", "Groups · Equations"),
    hook: l(
      "先研究根之间的关系，再问根怎么算。",
      "Understand the relations between roots before solving for them.",
    ),
    summary: l(
      "伽罗瓦把求根问题转成根的对称性问题。他在求学受挫、政治活动与监禁之间持续修改论文，核心思想经后人整理才广泛传播。决斗前的信是长期研究的总结，不能把整套理论归于最后一夜。",
      "Galois turned questions about roots into questions about their symmetries. He revised his work through academic setbacks, political activity and imprisonment. His final letter summarized years of research; later editors helped his ideas circulate.",
    ),
    portrait: {
      src: "/images/mathematicians/galois.jpg",
      alt: l(
        "约十五岁的伽罗瓦素描肖像",
        "Drawn portrait of Galois at about fifteen",
      ),
      credit: l(
        "佚名，约 1826 年素描；1897 年《数学著作集》收录 · 公共领域",
        "Unknown artist, c. 1826 drawing; reproduced in Œuvres mathématiques (1897) · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:Evariste_Galois.jpg",
    },
    achievements: [
      {
        year: "1830",
        title: l("有限域的早期构造", "Early constructions of finite fields"),
        description: l(
          "把模素数的计算扩展到新的有限数系。用现代语言说，有限域的元素个数是素数的幂；它们后来成为编码与密码学的工具。",
          "He extended arithmetic modulo a prime to new finite number systems. In modern terms, finite fields have prime-power size and are fundamental to coding and cryptography.",
        ),
        formula: "\\lvert\\mathbb F_{p^n}\\rvert=p^n",
      },
      {
        year: "1830–1831",
        title: l("用置换捕捉根的对称性", "Symmetries of an equation’s roots"),
        description: l(
          "交换根的名字时，哪些代数关系依然成立？把这些允许的交换组织起来，就得到方程的群：从计算答案，转向研究结构。",
          "Which permutations of the roots preserve their algebraic relations? Organizing these permutations produces an equation’s group and shifts attention from calculation to structure.",
        ),
        link: {
          href: "/learning/math-map/#group",
          label: l("接着读：群", "Continue with groups"),
        },
      },
      {
        year: "1831",
        title: l(
          "根式可解性的结构判据",
          "A structural criterion for radical solutions",
        ),
        description: l(
          "将「能否用根式求解」与群的结构联系起来。现代伽罗瓦理论把它表述为：在特征零时，方程根式可解，当且仅当其伽罗瓦群可解。",
          "He linked solvability by radicals to group structure. Modern Galois theory states that, in characteristic zero, radical solvability is equivalent to solvability of the Galois group.",
        ),
        link: {
          href: "/learning/math-lab/galois",
          label: l("进入伽罗瓦交互实验", "Open the Galois interactive lab"),
        },
      },
    ],
    timeline: [
      {
        year: "1811",
        text: l(
          "生于巴黎附近的布尔拉雷讷。",
          "Born in Bourg-la-Reine near Paris.",
        ),
      },
      {
        year: "1829",
        text: l(
          "发表第一篇数学论文，并提交方程研究。",
          "Published his first mathematical paper and submitted work on equations.",
        ),
      },
      {
        year: "1832",
        text: l(
          "5 月 29 日写信总结研究；31 日因决斗伤势去世，年仅 20 岁。",
          "Summarized his work in a letter on 29 May; died from duel wounds on 31 May, aged 20.",
        ),
      },
      {
        year: "1846",
        text: l(
          "刘维尔整理发表其数学著作，推动理论传播。",
          "Liouville published his mathematical works, helping the theory reach a wider audience.",
        ),
      },
    ],
    sources: [
      { title: "MacTutor · Évariste Galois", href: macTutor("Galois") },
      {
        title: "Numdam · Galois, Œuvres mathématiques (1846)",
        href: "https://www.numdam.org/item/JMPA_1846_1_11__381_0/",
      },
    ],
  },
  {
    id: "riemann",
    name: l("黎曼", "Riemann"),
    fullName: "Georg Friedrich Bernhard Riemann",
    born: 1826,
    died: 1866,
    place: l("布雷瑟伦茨 → 哥廷根", "Breselenz → Göttingen"),
    field: l("几何 · 复分析", "Geometry · Complex analysis"),
    hook: l(
      "先改变空间，再理解函数。",
      "Change the space, and a function becomes clearer.",
    ),
    summary: l(
      "黎曼善于更换问题所在的空间：多值函数可以放到新的曲面上，几何可以从局部测量重新定义，素数可以借复函数研究。高斯、狄利克雷与物理学共同塑造了他的思路。",
      "Riemann changed the spaces in which problems lived: multivalued functions gained new surfaces, geometry began with local measurement, and primes were studied through complex functions. Gauss, Dirichlet and physics all shaped his thinking.",
    ),
    portrait: {
      src: "/images/mathematicians/riemann.jpg",
      alt: l(
        "黎曼的十九世纪雕版肖像",
        "Nineteenth-century engraved portrait of Riemann",
      ),
      credit: l(
        "August Weger，1863 年版画 · 奥地利国家图书馆图像档案 · 公共领域",
        "August Weger, 1863 engraving · Bildarchiv Austria · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:BernhardRiemannAWeger.jpg",
    },
    achievements: [
      {
        year: "1851",
        title: l("给多值函数一个新家", "A new home for multivalued functions"),
        description: l(
          "黎曼曲面把函数的不同分支安置到彼此相连的面上。例如复平方根绕一圈会换支；换一个定义域，这种行为就能用几何看清。",
          "Riemann surfaces organize a function’s branches on connected sheets. A complex square root changes branch around the origin; a new domain makes this behavior geometric.",
        ),
        formula: "w^2=z",
      },
      {
        year: "1854",
        title: l("从局部距离定义几何", "Geometry from local distances"),
        description: l(
          "就职资格演讲把曲面思想推广到任意维空间。先规定微小距离怎样测量，再研究曲率；这成为黎曼几何的出发点。",
          "His habilitation lecture extended geometry to arbitrary dimensions: specify how infinitesimal distances are measured, then investigate curvature.",
        ),
        formula: "ds^2=\\sum_{i,j}g_{ij}\\,dx^i\\,dx^j",
      },
      {
        year: "1859",
        title: l("从 ζ 函数看素数", "Seeing primes through the zeta function"),
        description: l(
          "把素数分布与 ζ 函数的复数零点联系起来，并提出关于非平凡零点位置的猜想。这里的成果是开启研究框架，猜想本身并非已证明定理。",
          "He connected prime distribution to complex zeros of the zeta function and proposed a hypothesis about their location. The contribution is the framework; the hypothesis is not a proved theorem.",
        ),
        formula: "\\zeta(s)=\\sum_{n=1}^{\\infty}n^{-s}\\quad(\\Re s>1)",
      },
    ],
    timeline: [
      { year: "1826", text: l("生于布雷瑟伦茨。", "Born in Breselenz.") },
      {
        year: "1851",
        text: l(
          "在高斯指导下完成哥廷根博士论文。",
          "Completed his Göttingen doctorate under Gauss.",
        ),
      },
      {
        year: "1859",
        text: l(
          "接任哥廷根教授，发表关于素数分布的论文。",
          "Became a professor at Göttingen and published his paper on primes.",
        ),
      },
      {
        year: "1866",
        text: l(
          "在意大利因结核病去世，享年 39 岁。",
          "Died of tuberculosis in Italy, aged 39.",
        ),
      },
    ],
    sources: [
      { title: "MacTutor · Bernhard Riemann", href: macTutor("Riemann") },
      {
        title: "Trinity College Dublin · Riemann’s mathematical papers",
        href: "https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Papers.html",
      },
    ],
  },
  {
    id: "dedekind",
    name: l("戴德金", "Dedekind"),
    fullName: "Julius Wilhelm Richard Dedekind",
    born: 1831,
    died: 1916,
    place: l("哥廷根 → 苏黎世 → 不伦瑞克", "Göttingen → Zürich → Brunswick"),
    field: l("数的基础 · 理想", "Foundations · Ideals"),
    hook: l(
      "从「怎么算」追问到「数究竟是什么」。",
      "From how to calculate to what a number is.",
    ),
    summary: l(
      "戴德金把熟悉的计算对象重新写成清晰的定义。他是高斯的博士生，听过黎曼的课，也讲授过伽罗瓦理论；整理前辈著作的工作，与他重建数和代数结构的研究相互交织。",
      "Dedekind rebuilt familiar mathematical objects through precise definitions. A doctoral student of Gauss, he attended Riemann’s lectures and taught Galois theory. Editing earlier mathematicians’ work intertwined with his own studies of numbers and algebraic structures.",
    ),
    portrait: {
      src: "/images/mathematicians/dedekind.jpg",
      alt: l(
        "戴德金的历史照相肖像",
        "Historical photographic portrait of Dedekind",
      ),
      credit: l(
        "Johannes Ganz，1886 年前 · ETH 图书馆，Portr 11953（裁切版）· 公共领域",
        "Johannes Ganz, before 1886 · ETH Library, Portr 11953 (cropped version) · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:ETH-BIB-Dedekind,_Julius_Wilhelm_Richard_(1831-1916)-Portrait-Portr_11953.tif_(cropped).jpg",
    },
    achievements: [
      {
        year: "1871",
        title: l("让理想承担唯一分解", "Recovering factorization with ideals"),
        description: l(
          "某些代数整数不能唯一分解成不可约元素。他转而研究由数构成的「理想」：在数域的整数环中，非零理想可以唯一分解成素理想。",
          "Algebraic integers may lack unique factorization into irreducible elements. In a number field’s ring of integers, nonzero ideals instead factor uniquely into prime ideals.",
        ),
        formula: "\\mathfrak a=\\mathfrak p_1^{e_1}\\cdots\\mathfrak p_r^{e_r}",
      },
      {
        year: "1872",
        title: l("用分割构造实数", "Constructing real numbers with cuts"),
        description: l(
          "用有理数的有序分割刻画实数。即使没有一个有理数等于 √2，也能用小于它和大于它的有理数确定它的位置。",
          "An ordered cut of the rationals defines a real number. Even without a rational equal to √2, the rationals on either side determine its place.",
        ),
        link: {
          href: "/learning/math-map/#limit",
          label: l(
            "接着读：极限与完备性",
            "Continue with limits and completeness",
          ),
        },
      },
      {
        year: "1888",
        title: l(
          "给自然数以结构定义",
          "A structural account of natural numbers",
        ),
        description: l(
          "从集合与后继映射出发，解释自然数、归纳法和递归定义。数的意义不再依赖某一种具体的记号或计数材料。",
          "Sets and a successor map provide an account of natural numbers, induction and recursion, independent of particular symbols or counting objects.",
        ),
      },
    ],
    timeline: [
      { year: "1831", text: l("生于不伦瑞克。", "Born in Brunswick.") },
      {
        year: "1852",
        text: l(
          "在高斯指导下取得博士学位。",
          "Earned his doctorate under Gauss.",
        ),
      },
      {
        year: "1858–1862",
        text: l(
          "在苏黎世任教，随后回到不伦瑞克。",
          "Taught in Zürich, then returned to Brunswick.",
        ),
      },
      {
        year: "1916",
        text: l("卒于不伦瑞克，享年 84 岁。", "Died in Brunswick, aged 84."),
      },
    ],
    sources: [
      { title: "MacTutor · Richard Dedekind", href: macTutor("Dedekind") },
      {
        title:
          "Dedekind · Essays on the Theory of Numbers (English translation)",
        href: "https://www.gutenberg.org/ebooks/21016",
      },
      {
        title:
          "Dedekind · Higher Congruences and Index Divisors (annotated translations)",
        href: "https://arxiv.org/abs/2107.08905",
      },
    ],
  },
  {
    id: "noether",
    name: l("埃米·诺特", "Emmy Noether"),
    fullName: "Amalie Emmy Noether",
    born: 1882,
    died: 1935,
    place: l(
      "埃尔朗根 → 哥廷根 → 布林莫尔",
      "Erlangen → Göttingen → Bryn Mawr",
    ),
    field: l("抽象代数 · 对称性", "Abstract algebra · Symmetry"),
    hook: l(
      "抓住共同结构，让许多问题一起变简单。",
      "Find the shared structure behind different problems.",
    ),
    summary: l(
      "诺特把环、理想和映射变成组织代数的核心语言，也揭示了连续对称性与守恒量的联系。她长期受到女性任教限制，1933 年又因纳粹反犹政策失去职位，赴美国继续教学与研究。",
      "Noether made rings, ideals and maps central to algebra and connected continuous symmetries with conservation laws. Barriers to women delayed her academic career; Nazi antisemitic policies forced her from Göttingen in 1933, after which she taught in the United States.",
    ),
    portrait: {
      src: "/images/mathematicians/noether.jpg",
      alt: l(
        "约 1900 年的埃米·诺特黑白照片",
        "Black-and-white photograph of Emmy Noether, around 1900",
      ),
      credit: l(
        "佚名摄影，约 1900 年 · 美国数学协会收藏传播版本 · 公共领域",
        "Unknown photographer, c. 1900 · Version shared by the Mathematical Association of America · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:Noether.jpg",
    },
    achievements: [
      {
        year: "1918",
        title: l("连续对称性与守恒量", "Continuous symmetry and conservation"),
        description: l(
          "对由作用量描述的系统，连续对称性导出相应守恒量。例如时间平移对称性对应能量守恒，让许多物理定律有了共同解释。",
          "For systems described by an action, continuous symmetries yield conserved quantities. Time-translation symmetry, for example, corresponds to energy conservation.",
        ),
        link: {
          href: "/learning/math-map/#lie-group",
          label: l("接着读：李群与连续对称性", "Continue with Lie groups"),
        },
      },
      {
        year: "1921",
        title: l(
          "用有限性条件组织理想理论",
          "Finiteness as a principle of ideal theory",
        ),
        description: l(
          "以理想升链条件为关键，将准素分解推广到更一般的交换环。把「不能无限增加」变成可用的结构条件，是现代交换代数的基础。",
          "Using the ascending chain condition, she extended primary decomposition to more general commutative rings. A precise finiteness condition became a foundation of commutative algebra.",
        ),
        formula: "I_1\\subseteq I_2\\subseteq\\cdots=I_N=I_{N+1}=\\cdots",
      },
      {
        year: "1927",
        title: l(
          "提炼唯一分解背后的公理",
          "Axioms behind unique factorization",
        ),
        description: l(
          "抽取理想能够唯一分解的结构条件，把代数数域与函数域放进共同框架。这延展了戴德金的工作，也体现了她从具体计算走向抽象结构的方法。",
          "She isolated structural conditions for unique factorization of ideals, unifying number fields and function fields and extending Dedekind’s approach.",
        ),
      },
    ],
    timeline: [
      {
        year: "1907",
        text: l(
          "在埃尔朗根获博士学位，导师为保罗·戈尔丹。",
          "Earned her doctorate at Erlangen under Paul Gordan.",
        ),
      },
      {
        year: "1915–1919",
        text: l(
          "受邀到哥廷根，1919 年才获大学授课资格。",
          "Moved to Göttingen in 1915; received her habilitation only in 1919.",
        ),
      },
      {
        year: "1933",
        text: l(
          "遭纳粹政权解职，赴美国布林莫尔学院任教。",
          "Dismissed under the Nazi regime; moved to Bryn Mawr College in the United States.",
        ),
      },
      {
        year: "1935",
        text: l("卒于布林莫尔，享年 53 岁。", "Died in Bryn Mawr, aged 53."),
      },
    ],
    sources: [
      { title: "MacTutor · Emmy Noether", href: macTutor("Noether_Emmy") },
      {
        title:
          "Noether · Invariant Variation Problems (1918, English translation)",
        href: "https://arxiv.org/abs/physics/0503066",
      },
      {
        title: "Noether · Ideal Theory in Rings (1921, English translation)",
        href: "https://arxiv.org/abs/1401.2577",
      },
      {
        title: "Noether · Abstrakter Aufbau der Idealtheorie (1927)",
        href: "https://doi.org/10.1007/BF01209152",
      },
    ],
  },
];

const foundingRelations: ScholarRelation[] = [
  {
    id: "gauss-riemann",
    source: "gauss",
    target: "riemann",
    kind: "mentorship",
    label: l("博士师承", "Doctoral supervision"),
    description: l(
      "黎曼的 1851 年博士论文由高斯指导并评审，研究复函数与曲面。师承是这条线的依据；黎曼也深受狄利克雷等人的影响。",
      "Gauss supervised and assessed Riemann’s 1851 dissertation on complex functions and surfaces. Riemann was also deeply influenced by Dirichlet and others.",
    ),
    sourceUrl: macTutor("Riemann"),
  },
  {
    id: "gauss-dedekind",
    source: "gauss",
    target: "dedekind",
    kind: "mentorship",
    label: l("博士师承", "Doctoral supervision"),
    description: l(
      "戴德金在高斯指导下研究欧拉积分，1852 年获哥廷根博士学位。这是正式师承关系，不意味着他的全部思想都来自高斯。",
      "Dedekind completed a dissertation on Eulerian integrals under Gauss in 1852. This records doctoral supervision, not the sole origin of his later ideas.",
    ),
    sourceUrl: macTutor("Dedekind"),
  },
  {
    id: "riemann-dedekind",
    source: "riemann",
    target: "dedekind",
    kind: "influence",
    label: l("讲授与著作整理", "Lectures and editorial work"),
    description: l(
      "戴德金听过黎曼的椭圆函数和阿贝尔函数课程，后来协助海因里希·韦伯整理黎曼著作。这里记录学习、友谊与文献传承，并非博士师承。",
      "Dedekind attended Riemann’s lectures on elliptic and Abelian functions, then helped Heinrich Weber edit his works. This records learning, friendship and transmission, not doctoral supervision.",
    ),
    sourceUrl: "https://euromathsoc.org/magazine/articles/18",
  },
  {
    id: "galois-dedekind",
    source: "galois",
    target: "dedekind",
    kind: "influence",
    label: l("理论研读与传播", "Study and transmission"),
    description: l(
      "戴德金研读伽罗瓦的著作，并在 1850 年代于哥廷根讲授伽罗瓦理论。这是通过文献发生的学术接续，两人没有师生关系。",
      "Dedekind studied Galois’s writings and taught Galois theory at Göttingen in the 1850s. The connection runs through texts, not personal supervision.",
    ),
    sourceUrl: macTutor("Dedekind"),
  },
  {
    id: "dedekind-noether",
    source: "dedekind",
    target: "noether",
    kind: "influence",
    label: l("理想理论的延展", "Extending ideal theory"),
    description: l(
      "诺特把戴德金等人研究的理想提升到更一般的环与结构条件。此线表示跨代的理论延展；她的博士导师是保罗·戈尔丹。",
      "Noether developed the ideal theory of Dedekind and others through general rings and structural conditions. Her doctoral advisor was Paul Gordan; this is an intellectual connection.",
    ),
    sourceUrl: macTutor("Dedekind"),
  },
  {
    id: "abel-galois",
    source: "abel",
    target: "galois",
    kind: "parallel",
    label: l("同题研究：根式可解性", "Shared question: radical solvability"),
    description: l(
      "阿贝尔证明一般五次方程没有根式公式，伽罗瓦进一步研究可解性的结构条件。伽罗瓦读过阿贝尔的工作；此线不表示会面、合作或师承。",
      "Abel ruled out a general quintic radical formula; Galois pursued structural conditions for solvability and read Abel’s work. This edge does not claim a meeting, collaboration or mentorship.",
    ),
    sourceUrl: macTutor("Galois"),
  },
];

export const mathematicians: Mathematician[] = [
  ...foundingMathematicians,
  ...earlyMathematicians,
  ...goettingenMathematicians,
  ...originsMathematicians,
  ...analysisMathematicians,
  ...modernMathematicians,
].sort((a, b) => a.born - b.born || a.id.localeCompare(b.id));

export const scholarRelations: ScholarRelation[] = [
  ...foundingRelations,
  ...earlyRelations,
  ...goettingenRelations,
  ...originsRelations,
  ...analysisRelations,
  ...modernRelations,
];
