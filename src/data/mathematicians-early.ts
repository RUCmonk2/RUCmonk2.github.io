import type { Mathematician, ScholarRelation } from "./mathematicians";

const l = (zh: string, en: string) => ({ zh, en });
const macTutor = (name: string) =>
  `https://mathshistory.st-andrews.ac.uk/Biographies/${name}/`;

// Dates distinguish research from publication where the original archives do.
// Portrait metadata was checked against the actual Commons files in use.
export const earlyMathematicians: Mathematician[] = [
  {
    id: "euler",
    name: l("欧拉", "Euler"),
    fullName: "Leonhard Euler",
    born: 1707,
    died: 1783,
    place: l("巴塞尔 → 圣彼得堡与柏林", "Basel → St Petersburg & Berlin"),
    field: l("分析 · 数论 · 图论", "Analysis · Number theory · Graphs"),
    hook: l(
      "桥、素数与旋转，怎样成为可以计算的结构？",
      "How do bridges, primes and rotations become mathematical structures?",
    ),
    summary: l(
      "欧拉把函数、级数和方程用于数论、力学与日常问题。他的工作往返于圣彼得堡和柏林的学术网络；晚年视力丧失后，仍与家人和助手讨论、计算并整理成果。通信也让年轻的拉格朗日进入这场交流。",
      "Euler used functions, series and equations across number theory, mechanics and everyday problems. His work grew within the academies of St Petersburg and Berlin. After losing his sight, he continued through discussion and collaboration with family and assistants; correspondence connected him with the young Lagrange.",
    ),
    portrait: {
      src: "/images/mathematicians/euler.jpg",
      alt: l(
        "戴灰色头巾、穿蓝色外衣的欧拉粉彩肖像",
        "Pastel portrait of Euler in a gray headwrap and blue coat",
      ),
      credit: l(
        "Jakob Emanuel Handmann，1753 年粉彩肖像 · 巴塞尔美术馆 · 公共领域",
        "Jakob Emanuel Handmann, 1753 pastel · Kunstmuseum Basel · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:Leonhard_Euler_-_Jakob_Emanuel_Handmann_(Kunstmuseum_Basel).jpg",
    },
    achievements: [
      {
        year: "1735–1741",
        title: l(
          "把七座桥化成连接问题",
          "Turning seven bridges into a connectivity problem",
        ),
        description: l(
          "桥的长度和河岸的形状都可以忽略，只需数每片陆地连接几座桥。柯尼斯堡有四处连接奇数座桥，因此无法每桥恰走一次；论文写于 1735 年，1741 年刊出。",
          "Bridge lengths and riverbank shapes can be ignored: only connections matter. Königsberg had four land areas with odd numbers of incident bridges, ruling out a walk using every bridge once. Written in 1735; published in 1741.",
        ),
      },
      {
        year: "1737–1744",
        title: l(
          "在无穷级数中看见素数",
          "Finding primes inside an infinite series",
        ),
        description: l(
          "欧拉乘积把对所有正整数的求和，改写成对素数的乘积；背后是整数的唯一分解。下式在实数 s>1 时收敛，为用分析研究素数打开了入口。",
          "Euler’s product turns a sum over positive integers into a product over primes, using unique factorization. The displayed identity converges for real s>1 and opens an analytic route to prime numbers.",
        ),
        formula:
          "\\sum_{n=1}^{\\infty}\\frac1{n^s}=\\prod_{p\\,\\mathrm{prime}}\\frac1{1-p^{-s}}\\quad(s>1)",
      },
      {
        year: "1748",
        title: l(
          "把指数函数与旋转连起来",
          "Connecting exponentials with rotation",
        ),
        description: l(
          "《无穷分析引论》把函数放到分析的中心。欧拉公式说明：当 θ 为实数时，复指数沿单位圆旋转，指数、三角函数和复数由此连成一体。",
          "The Introductio placed functions at the center of analysis. For real θ, Euler’s formula makes the complex exponential a rotation on the unit circle, joining exponentials, trigonometry and complex numbers.",
        ),
        formula: "e^{i\\theta}=\\cos\\theta+i\\sin\\theta",
        link: {
          href: "/learning/math-map/#lie-group",
          label: l(
            "接着读：旋转与李群",
            "Continue with rotations and Lie groups",
          ),
        },
      },
    ],
    timeline: [
      {
        year: "1707",
        text: l(
          "生于巴塞尔，在附近的里恩长大。",
          "Born in Basel and raised in nearby Riehen.",
        ),
      },
      {
        year: "1727",
        text: l(
          "进入圣彼得堡科学院，从事数学与力学研究。",
          "Joined the St Petersburg Academy, working in mathematics and mechanics.",
        ),
      },
      {
        year: "1741–1766",
        text: l(
          "在柏林工作，与欧洲学者持续通信，随后返回圣彼得堡。",
          "Worked in Berlin, corresponding across Europe, before returning to St Petersburg.",
        ),
      },
      {
        year: "1783",
        text: l(
          "卒于圣彼得堡，享年 76 岁。",
          "Died in St Petersburg, aged 76.",
        ),
      },
    ],
    sources: [
      { title: "MacTutor · Leonhard Euler", href: macTutor("Euler") },
      {
        title: "Euler Archive · The Königsberg bridge paper (E53)",
        href: "https://scholarlycommons.pacific.edu/euler-works/53/",
      },
      {
        title: "Euler Archive · Infinite series and Euler products (E72)",
        href: "https://scholarlycommons.pacific.edu/euler-works/72/",
      },
      {
        title: "Euler Archive · Introductio in analysin infinitorum (1748)",
        href: "https://scholarlycommons.pacific.edu/euler-works/101/",
      },
    ],
  },
  {
    id: "lagrange",
    name: l("拉格朗日", "Lagrange"),
    fullName: "Joseph-Louis Lagrange",
    born: 1736,
    died: 1813,
    place: l("都灵 → 柏林 → 巴黎", "Turin → Berlin → Paris"),
    field: l("变分法 · 力学 · 方程", "Variations · Mechanics · Equations"),
    hook: l(
      "一条最优曲线，与一个求根公式，能否找到共同方法？",
      "Can different problems share a systematic method?",
    ),
    summary: l(
      "拉格朗日常从已有算法出发，追问它们为什么有效。年轻时，他通过书信向欧拉交流变分方法；后来将力学整理成统一的分析体系，并通过根的置换研究求根公式，为后来的群论留下线索。",
      "Lagrange asked why successful procedures work. As a young mathematician, he exchanged variational methods with Euler by letter. He later organized mechanics analytically and studied permutations of roots, providing ideas that helped lead toward group theory.",
    ),
    portrait: {
      src: "/images/mathematicians/lagrange.jpg",
      alt: l(
        "穿深色礼服、佩戴勋章的拉格朗日版画肖像",
        "Engraved portrait of Lagrange wearing a dark coat and decorations",
      ),
      credit: l(
        "佚名版画，原作年代未记载 · Wikimedia Commons · 公共领域",
        "Anonymous engraving, original date unrecorded · Wikimedia Commons · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:Joseph_Louis_Lagrange.jpg",
    },
    achievements: [
      {
        year: "1755",
        title: l("让整条曲线参与优化", "Optimizing an entire curve"),
        description: l(
          "把未知量从一个数换成一条曲线，研究微小变动怎样改变积分。对足够光滑、端点固定的极值曲线，可导出欧拉—拉格朗日方程；它是必要条件，不保证取得最小值。",
          "The unknown becomes a curve rather than a number. For a sufficiently smooth extremizing curve with fixed endpoints, small variations yield the Euler–Lagrange equation: a necessary condition, not a guarantee of a minimum.",
        ),
        formula:
          "\\frac{d}{dx}\\frac{\\partial F}{\\partial y'}-\\frac{\\partial F}{\\partial y}=0",
      },
      {
        year: "1770–1771",
        title: l(
          "从根的交换理解求根方法",
          "Understanding formulas by permuting roots",
        ),
        description: l(
          "比较三次、四次方程的求根法，研究交换根以后某些表达式会有多少不同取值。这打开了结构化研究方程的道路，但还不是完整的抽象群论。",
          "He compared cubic and quartic formulas by counting how expressions change when roots are permuted. This advanced a structural study of equations, though it was not yet abstract group theory.",
        ),
        link: {
          href: "/learning/math-map/#group-action",
          label: l("接着读：群作用", "Continue with group actions"),
        },
      },
      {
        year: "1788",
        title: l(
          "用统一方程组织力学",
          "Organizing mechanics with common equations",
        ),
        description: l(
          "《分析力学》用广义坐标处理机械系统，让不同装置能采用共同的推导方法。对常见的保守机械系统，拉格朗日量取动能减势能，再由它写出运动方程。",
          "Analytical Mechanics used generalized coordinates to give different mechanical systems a shared method. For familiar conservative systems, the Lagrangian is kinetic minus potential energy and generates the equations of motion.",
        ),
        formula: "L=T-V",
      },
    ],
    timeline: [
      {
        year: "1736",
        text: l(
          "生于都灵，主要靠自学进入数学研究。",
          "Born in Turin; entered mathematical research largely through self-study.",
        ),
      },
      {
        year: "1755",
        text: l(
          "与欧拉通信讨论变分法，获任都灵炮兵学校数学教师。",
          "Corresponded with Euler about variations and began teaching at Turin’s artillery school.",
        ),
      },
      {
        year: "1766–1787",
        text: l(
          "接替欧拉主持柏林科学院数学工作，后迁居巴黎。",
          "Succeeded Euler at the Berlin Academy, later moving to Paris.",
        ),
      },
      {
        year: "1813",
        text: l("卒于巴黎，享年 77 岁。", "Died in Paris, aged 77."),
      },
    ],
    sources: [
      { title: "MacTutor · Joseph-Louis Lagrange", href: macTutor("Lagrange") },
      {
        title: "ETH-Bibliothek · Méchanique analitique (1788)",
        href: "https://www.e-rara.ch/zut/content/titleinfo/2488394",
      },
      {
        title:
          "MacTutor / Dictionary of Scientific Biography · Lagrange and the 1755 correspondence",
        href: "https://mathshistory.st-andrews.ac.uk/DSB/Lagrange.pdf",
      },
    ],
  },
  {
    id: "cauchy",
    name: l("柯西", "Cauchy"),
    fullName: "Augustin-Louis Cauchy",
    born: 1789,
    died: 1857,
    place: l("巴黎 → 瑟堡 → 巴黎", "Paris → Cherbourg → Paris"),
    field: l("实分析 · 复分析", "Real analysis · Complex analysis"),
    hook: l(
      "公式算得通，还要问它在什么条件下成立。",
      "A formula needs conditions, not just successful calculations.",
    ),
    summary: l(
      "柯西从工程工作走向数学研究，把极限、连续与收敛推到分析教学的前台。他又将积分带入复平面，为黎曼等人的工作准备了工具。这场严格化是持续的集体工作，后来仍需修正和补足。",
      "Cauchy moved from engineering into mathematics and put limits, continuity and convergence at the center of analysis teaching. His complex integration supplied tools for Riemann and others. Making analysis rigorous remained a collective process, with further corrections and refinements still to come.",
    ),
    portrait: {
      src: "/images/mathematicians/cauchy.jpg",
      alt: l(
        "穿黑色外衣、系白色领巾的柯西油画肖像",
        "Painted portrait of Cauchy in a black coat and white cravat",
      ),
      credit: l(
        "Jean Roller，约 1840 年油画 · 公共领域",
        "Jean Roller, c. 1840 painting · Public domain",
      ),
      href: "https://commons.wikimedia.org/wiki/File:French_School_-_Portrait_of_Augustin-Louis_Cauchy_(1789-1857).jpg",
    },
    achievements: [
      {
        year: "1813",
        title: l("凸多面体的刚性", "The rigidity of convex polyhedra"),
        description: l(
          "若两个凸多面体的面按相同方式相连，且对应面全等，那么整体也全等。这说明刚性面板拼成的凸壳，其形状受到强约束；「凸」不能随意删去。",
          "Two convex polyhedra with the same face connections and congruent corresponding faces are congruent as a whole. Rigid faces strongly constrain a convex shell; convexity is an essential hypothesis.",
        ),
      },
      {
        year: "1821",
        title: l("让无穷过程接受检验", "Making infinite processes accountable"),
        description: l(
          "《分析教程》强调极限、连续和级数收敛的条件。以今天的实数序列语言说，柯西准则不必先猜极限，只需检验足够靠后的项能否彼此任意接近。",
          "The Cours d’analyse emphasized limits, continuity and convergence. In modern real-sequence language, the Cauchy criterion checks whether sufficiently late terms become arbitrarily close without first guessing a limit.",
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
        year: "1825",
        title: l(
          "把积分路径放进复平面",
          "Integration along paths in the complex plane",
        ),
        description: l(
          "复积分把路径与函数性质联系起来。现代柯西积分定理的一种表述是：函数在分段光滑的简单闭曲线及其内部的邻域全纯时，沿这条闭曲线的积分为零。",
          "Complex integration links paths to properties of functions. A modern form of Cauchy’s theorem gives zero integral around a piecewise smooth simple closed curve when the function is holomorphic on a neighborhood of the curve and its interior.",
        ),
        formula: "\\oint_{\\gamma} f(z)\\,dz=0",
      },
    ],
    timeline: [
      {
        year: "1789",
        text: l(
          "生于巴黎，在法国革命时期长大。",
          "Born in Paris and grew up during the French Revolution.",
        ),
      },
      {
        year: "1807–1810",
        text: l(
          "接受桥路工程训练，后到瑟堡参与港口建设。",
          "Trained as a civil engineer and then worked on the port at Cherbourg.",
        ),
      },
      {
        year: "1815–1821",
        text: l(
          "开始在巴黎综合理工学院任教，后出版《分析教程》。",
          "Began teaching at the École Polytechnique and later published his Cours d’analyse.",
        ),
      },
      {
        year: "1857",
        text: l(
          "卒于巴黎附近的索镇，享年 67 岁。",
          "Died in Sceaux near Paris, aged 67.",
        ),
      },
    ],
    sources: [
      { title: "MacTutor · Augustin-Louis Cauchy", href: macTutor("Cauchy") },
      {
        title: "ETH-Bibliothek · Cours d’analyse, Analyse algébrique (1821)",
        href: "https://www.e-rara.ch/zut/content/titleinfo/8442794",
      },
      {
        title: "MAA · Cauchy’s 1825 memoir on definite integrals",
        href: "https://old.maa.org/press/periodicals/convergence/mathematical-treasure-cauchy-on-definite-integrals",
      },
    ],
  },
];

export const earlyRelations: ScholarRelation[] = [
  {
    id: "euler-lagrange",
    source: "euler",
    target: "lagrange",
    kind: "support",
    label: l("通信与鼓励", "Correspondence and encouragement"),
    description: l(
      "1755 年，拉格朗日把新的变分方法写信寄给欧拉，欧拉回信肯定并继续交流。两人相互发展相关方法；这条线表示通信支持，不是博士师承。",
      "Lagrange sent Euler his new variational method in 1755. Euler replied enthusiastically and continued the exchange. They developed related methods through correspondence, not doctoral supervision.",
    ),
    sourceUrl: macTutor("Lagrange"),
  },
  {
    id: "euler-gauss",
    source: "euler",
    target: "gauss",
    kind: "influence",
    label: l("数论成果的接续", "Continuing number theory"),
    description: l(
      "高斯在《算术研究》序言中明确承认欧拉等前人的贡献，并说明自己后来研读其著作、继续推进数论。这是经由文本的学术接续，不表示两人见过面。",
      "In the Disquisitiones preface, Gauss acknowledged Euler and other predecessors, describing how he studied their writings and advanced number theory. This is transmission through texts, not a claim that they met.",
    ),
    sourceUrl:
      "https://la.wikisource.org/wiki/Disquisitiones_arithmeticae/Praefatio",
  },
  {
    id: "euler-dirichlet",
    source: "euler",
    target: "dirichlet",
    kind: "influence",
    label: l("从欧拉乘积到 L 级数", "From Euler products to L-series"),
    description: l(
      "狄利克雷的 1837 年等差数列素数定理，沿用并拓展了欧拉以级数和乘积研究素数的思路，引入带特征的 L 级数。这是方法的跨代发展。",
      "Dirichlet’s 1837 theorem on primes in arithmetic progressions extended Euler’s analytic approach, introducing L-series with characters. This is an extension of a mathematical method across generations.",
    ),
    sourceUrl: "https://arxiv.org/abs/0808.1408",
  },
  {
    id: "lagrange-galois",
    source: "lagrange",
    target: "galois",
    kind: "influence",
    label: l(
      "从根的置换到方程的群",
      "From root permutations to equation groups",
    ),
    description: l(
      "拉格朗日用根的置换研究求根公式；伽罗瓦阅读过他的著作，进一步把方程的可解性与群的结构联系起来。这不是直接授课或师承。",
      "Lagrange studied root permutations to understand formulas. Galois read his work and went on to connect solvability with group structure. The link is intellectual, not a record of direct teaching.",
    ),
    sourceUrl: macTutor("Galois"),
  },
  {
    id: "lagrange-cauchy",
    source: "lagrange",
    target: "cauchy",
    kind: "support",
    label: l("早期教育建议", "Early educational guidance"),
    description: l(
      "拉格朗日是柯西家的访客，关注年轻柯西的学习，并建议其父先让他打好语言基础。柯西后来也研读《解析函数论》；这里不将家庭朋友的建议写成正式师承。",
      "A visitor to Cauchy’s family, Lagrange advised his father on the boy’s education. Cauchy later studied his Théorie des fonctions. This records personal guidance rather than formal supervision.",
    ),
    sourceUrl: macTutor("Cauchy"),
  },
  {
    id: "cauchy-riemann",
    source: "cauchy",
    target: "riemann",
    kind: "influence",
    label: l(
      "复分析基础的延展",
      "Extending the foundations of complex analysis",
    ),
    description: l(
      "黎曼的 1851 年论文建立在柯西等人发展的复函数基础上，并引入曲面、连通性等几何方法。此线强调理论接续，不把柯西称作黎曼的博士导师。",
      "Riemann’s 1851 dissertation built on complex-function theory developed by Cauchy and others, adding surfaces and connectivity. Cauchy was a mathematical predecessor, not Riemann’s doctoral advisor.",
    ),
    sourceUrl: macTutor("Riemann"),
  },
];
