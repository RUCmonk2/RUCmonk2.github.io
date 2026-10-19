import type { Mathematician, ScholarRelation } from "./mathematicians";

// Evidence: docs/chemists-sources.md. Portrait licenses: public/images/chemists/sources.json.
export const chemists: Mathematician[] = [
  {
    id: "boyle",
    name: {
      zh: "玻意耳",
      en: "Boyle",
    },
    fullName: "Robert Boyle",
    born: 1627,
    died: 1691,
    place: {
      zh: "利斯莫尔 → 牛津 → 伦敦",
      en: "Lismore → Oxford → London",
    },
    field: {
      zh: "气体 · 实验化学",
      en: "Gases · Experimental chemistry",
    },
    hook: {
      zh: "空气也能称量、压缩和检验。",
      en: "Air can be measured, compressed and tested.",
    },
    summary: {
      zh: "玻意耳用可重复实验挑战传统物质学说。他与胡克等人改进空气泵；他的微粒观仍处在炼金术与现代化学之间，不能直接等同于今天的原子论。",
      en: "Boyle challenged inherited explanations through repeatable experiments. Work with Hooke on air pumps supported a corpuscular view, still distinct from modern atomic theory.",
    },
    achievements: [
      {
        year: "1660",
        title: {
          zh: "用空气泵检验自然现象",
          en: "Testing phenomena with an air pump",
        },
        description: {
          zh: "与胡克合作研究低压环境中的燃烧、呼吸和声传播，使空气成为可操控的实验对象。",
          en: "With Hooke, he studied combustion, respiration and sound under reduced pressure, making air an experimentally controlled variable.",
        },
      },
      {
        year: "1661",
        title: {
          zh: "《怀疑派化学家》",
          en: "The Sceptical Chymist",
        },
        description: {
          zh: "质疑四元素和三原质能否解释实验事实，强调分解与组合证据；其元素概念还不是现代定义。",
          en: "He questioned traditional elemental schemes and emphasized evidence from decomposition and combination, without yet defining modern chemical elements.",
        },
      },
      {
        year: "1662",
        title: {
          zh: "压强与体积的关系",
          en: "Pressure and volume",
        },
        description: {
          zh: "对一定量、温度固定的气体，压强与体积近似成反比；真实气体偏离说明关系有适用范围。",
          en: "For a fixed amount of gas at constant temperature, pressure varies approximately inversely with volume; real-gas deviations limit the approximation.",
        },
        formula: "pV=\\mathrm{constant}",
      },
    ],
    timeline: [
      {
        year: "1627",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1654",
        text: {
          zh: "移居牛津，建立实验网络。",
          en: "Moved to Oxford and developed experimental collaborations.",
        },
      },
      {
        year: "1660",
        text: {
          zh: "参与创建英国皇家学会。",
          en: "Helped establish the Royal Society.",
        },
      },
      {
        year: "1691",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/boyle.jpg",
      alt: {
        zh: "玻意耳的肖像",
        en: "Portrait of Boyle",
      },
      credit: {
        zh: "Johann Kerseboom，1689 · Public domain；等比缩放与 JPEG 重编码",
        en: "Johann Kerseboom, 1689 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:The_Shannon_Portrait_of_the_Hon_Robert_Boyle.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Robert Boyle",
        href: "https://www.sciencehistory.org/education/scientific-biographies/robert-boyle/",
      },
      {
        title: "Boyle · The Sceptical Chymist (1661)",
        href: "https://www.gutenberg.org/ebooks/22914",
      },
    ],
  },
  {
    id: "lavoisier",
    name: {
      zh: "拉瓦锡",
      en: "Lavoisier",
    },
    fullName: "Antoine-Laurent Lavoisier",
    born: 1743,
    died: 1794,
    place: {
      zh: "巴黎",
      en: "Paris",
    },
    field: {
      zh: "定量化学 · 燃烧",
      en: "Quantitative chemistry · Combustion",
    },
    hook: {
      zh: "把看不见的气体，也算进物质账本。",
      en: "Include invisible gases in the material balance.",
    },
    summary: {
      zh: "拉瓦锡与玛丽–安娜及多位合作者把精密称量、气体实验和新命名连成体系。这场化学变革依赖共同工作，并非一人发现了所有新物质。",
      en: "Lavoisier, Marie-Anne and other collaborators combined accurate weighing, gas experiments and nomenclature. This transformation was collective, not a single-person discovery of all its substances.",
    },
    achievements: [
      {
        year: "1770s",
        title: {
          zh: "封闭实验中的质量核算",
          en: "Mass accounting in closed experiments",
        },
        description: {
          zh: "将反应物、产物和气体一起称量，建立化学反应的质量守恒核算；密闭边界不能漏掉。",
          en: "Weighing reactants, products and gases supported mass conservation in ordinary chemical reactions; the system boundary must include escaping gases.",
        },
      },
      {
        year: "1770s–1780s",
        title: {
          zh: "重新解释燃烧与水",
          en: "Reinterpreting combustion and water",
        },
        description: {
          zh: "以氧参与反应解释许多燃烧现象，并与合作者研究水的组成；没有把氧当成所有酸的正确通则。",
          en: "He interpreted many combustions through oxygen and studied water’s composition with collaborators. His separate claim that all acids contain oxygen was incorrect.",
        },
      },
      {
        year: "1787–1789",
        title: {
          zh: "让名称承载组成信息",
          en: "A systematic chemical language",
        },
        description: {
          zh: "与居通、贝托莱、富尔克鲁瓦等建立新命名，并在教材中系统呈现实验化学。",
          en: "With Guyton, Berthollet and Fourcroy, he developed systematic nomenclature and presented the new experimental chemistry in a textbook.",
        },
      },
    ],
    timeline: [
      {
        year: "1743",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1768",
        text: {
          zh: "进入法国科学院。",
          en: "Joined the French Academy of Sciences.",
        },
      },
      {
        year: "1775",
        text: {
          zh: "在巴黎兵工厂建立研究条件。",
          en: "Developed a research laboratory at the Paris Arsenal.",
        },
      },
      {
        year: "1794",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/lavoisier.jpg",
      alt: {
        zh: "拉瓦锡的肖像",
        en: "Portrait of Lavoisier",
      },
      credit: {
        zh: "Jacques-Louis David，1788 · Public domain；等比缩放与 JPEG 重编码",
        en: "Jacques-Louis David, 1788 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:David_-_Portrait_of_Monsieur_Lavoisier_(cropped)2.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Lavoisier",
        href: "https://www.sciencehistory.org/education/scientific-biographies/antoine-laurent-lavoisier/",
      },
      {
        title: "ACS · The Chemical Revolution",
        href: "https://www.acs.org/education/whatischemistry/landmarks/lavoisier.html",
      },
    ],
  },
  {
    id: "priestley",
    name: {
      zh: "普利斯特里",
      en: "Priestley",
    },
    fullName: "Joseph Priestley",
    born: 1733,
    died: 1804,
    place: {
      zh: "约克郡 → 伯明翰 → 宾夕法尼亚",
      en: "Yorkshire → Birmingham → Pennsylvania",
    },
    field: {
      zh: "气体化学 · 实验方法",
      en: "Pneumatic chemistry · Experiments",
    },
    hook: {
      zh: "同样透明的气体，性质可能完全不同。",
      en: "Transparent gases can behave very differently.",
    },
    summary: {
      zh: "普利斯特里分离并比较多种气体，把实验结果带给拉瓦锡。他仍用燃素解释结果，说明发现一种物质与正确解释它并不是同一件事。",
      en: "Priestley isolated and compared gases and communicated findings to Lavoisier. His continued phlogiston interpretation shows that discovery and explanation are different achievements.",
    },
    achievements: [
      {
        year: "1771",
        title: {
          zh: "植物改变封闭空气",
          en: "Plants alter enclosed air",
        },
        description: {
          zh: "观察植物可以恢复被燃烧或呼吸改变的空气，为光合作用研究提供线索；尚非完整机理。",
          en: "He observed plants restoring air altered by combustion or respiration, contributing an important clue rather than a complete photosynthesis mechanism.",
        },
      },
      {
        year: "1772",
        title: {
          zh: "人工制备碳酸水",
          en: "Carbonated water",
        },
        description: {
          zh: "研究把固定空气即二氧化碳溶入水，形成可重复的碳酸水制备方法。",
          en: "He investigated dissolving fixed air, now called carbon dioxide, in water and developed a reproducible carbonation method.",
        },
      },
      {
        year: "1774",
        title: {
          zh: "分离支持燃烧的气体",
          en: "Isolating oxygen",
        },
        description: {
          zh: "分离后来称为氧的气体并发表其性质；舍勒也独立取得这一气体，发现史需要两者并列。",
          en: "He isolated and published properties of the gas later named oxygen. Scheele independently obtained it, so the discovery history includes both.",
        },
      },
    ],
    timeline: [
      {
        year: "1733",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1767",
        text: {
          zh: "在利兹研究气体和碳酸水。",
          en: "Studied gases and carbonated water in Leeds.",
        },
      },
      {
        year: "1794",
        text: {
          zh: "移居美国，继续研究。",
          en: "Moved to the United States and continued research.",
        },
      },
      {
        year: "1804",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/priestley.jpg",
      alt: {
        zh: "普利斯特里的肖像",
        en: "Portrait of Priestley",
      },
      credit: {
        zh: "James Sharples，1797 · Public domain；等比缩放与 JPEG 重编码",
        en: "James Sharples, 1797 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Joseph_Priestley_(NPG).jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "ACS · Joseph Priestley and oxygen",
        href: "https://www.acs.org/education/whatischemistry/landmarks/josephpriestleyoxygen.html",
      },
      {
        title: "ACS/RSC · Discovery of Oxygen",
        href: "https://www.acs.org/content/dam/acsorg/education/whatischemistry/landmarks/lesson-plans/joseph-priestley-discoverer-of-oxygen.pdf",
      },
    ],
  },
  {
    id: "scheele",
    name: {
      zh: "舍勒",
      en: "Scheele",
    },
    fullName: "Carl Wilhelm Scheele",
    born: 1742,
    died: 1786,
    place: {
      zh: "施特拉尔松德 → 乌普萨拉 → 雪平",
      en: "Stralsund → Uppsala → Köping",
    },
    field: {
      zh: "元素 · 天然产物",
      en: "Elements · Natural substances",
    },
    hook: {
      zh: "药房中的分离，也能改变元素地图。",
      en: "Careful separation can redraw the map of elements.",
    },
    summary: {
      zh: "舍勒在药房工作中系统分离气体、酸和矿物成分。他的解释仍带燃素理论色彩；有些发现较早完成，却较晚发表。",
      en: "Working as an apothecary, Scheele isolated gases, acids and mineral components. His interpretations retained phlogiston ideas, and some early discoveries appeared in print only later.",
    },
    achievements: [
      {
        year: "1770s",
        title: {
          zh: "独立分离氧",
          en: "Independently isolating oxygen",
        },
        description: {
          zh: "得到支持燃烧的火空气；研究在普利斯特里发表前已开展，相关著作于1777年出版。",
          en: "He obtained fire air, which supports combustion, before Priestley’s publication; his account appeared in 1777.",
        },
      },
      {
        year: "1774",
        title: {
          zh: "取得氯气",
          en: "Obtaining chlorine",
        },
        description: {
          zh: "分离黄绿色气体，但未识别为元素。戴维后来纠正其含氧化合物解释。",
          en: "He isolated a yellow-green gas but misclassified it as an oxygen-containing substance; Davy later established its elemental nature.",
        },
      },
      {
        year: "1770s–1780s",
        title: {
          zh: "分离有机酸",
          en: "Isolating organic acids",
        },
        description: {
          zh: "研究酒石酸、乳酸和柠檬酸等物质，把植物和动物来源的复杂混合物分成可比较的组分。",
          en: "His work on tartaric, lactic and citric acids separated complex natural mixtures into substances whose properties could be compared.",
        },
      },
    ],
    timeline: [
      {
        year: "1742",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1770",
        text: {
          zh: "在乌普萨拉的药房工作。",
          en: "Worked in an Uppsala pharmacy.",
        },
      },
      {
        year: "1775",
        text: {
          zh: "在雪平经营药房并研究。",
          en: "Established himself as an apothecary in Köping.",
        },
      },
      {
        year: "1786",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/scheele.jpg",
      alt: {
        zh: "舍勒的后世画像",
        en: "Later depiction of Scheele",
      },
      credit: {
        zh: "Johann Gottfried Scheffner，1780/1800 · Public domain；等比缩放与 JPEG 重编码",
        en: "Johann Gottfried Scheffner, 1780/1800 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Carl_Wilhelm_Scheele_by_Johann_Gottfried_Scheffner_(cropped).png",
      kind: "later-depiction",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Linda Hall Library · Carl Wilhelm Scheele",
        href: "https://www.lindahall.org/about/news/scientist-of-the-day/carl-wilhelm-scheele/",
      },
      {
        title: "Royal Society of Chemistry · Chlorine",
        href: "https://periodic-table.rsc.org/element/17/",
      },
    ],
  },
  {
    id: "dalton",
    name: {
      zh: "道尔顿",
      en: "Dalton",
    },
    fullName: "John Dalton",
    born: 1766,
    died: 1844,
    place: {
      zh: "伊格尔斯菲尔德 → 曼彻斯特",
      en: "Eaglesfield → Manchester",
    },
    field: {
      zh: "原子论 · 气体",
      en: "Atomic theory · Gases",
    },
    hook: {
      zh: "用粒子的数目解释称量的比例。",
      en: "Explain measured ratios through numbers of particles.",
    },
    summary: {
      zh: "道尔顿将原子观与气体及组成数据结合，提出定量原子论。某些原子量和化学式后来被修正，但可检验的数量关系成为关键遗产。",
      en: "Dalton connected atomism with gas and composition measurements. Later corrections changed some weights and formulas, while his quantitative approach endured.",
    },
    achievements: [
      {
        year: "1801",
        title: {
          zh: "分压定律",
          en: "Partial pressures",
        },
        description: {
          zh: "理想、互不反应的气体混合物，其总压等于各组分分压之和；强相互作用会造成偏离。",
          en: "For an ideal nonreacting gas mixture, total pressure is the sum of partial pressures; strong intermolecular interactions cause deviations.",
        },
        formula: "p=\\sum_i p_i",
      },
      {
        year: "1803–1808",
        title: {
          zh: "定量原子论",
          en: "Quantitative atomic theory",
        },
        description: {
          zh: "用不同元素原子的相对质量和简单组合解释化合物组成，使原子成为可通过化学数据推断的对象。",
          en: "Relative atomic masses and simple combinations explained compound composition, making atoms inferable from chemical measurements.",
        },
      },
      {
        year: "1800s",
        title: {
          zh: "倍比关系",
          en: "Multiple proportions",
        },
        description: {
          zh: "两元素形成不同定比化合物时，对同量一种元素，另一种元素的质量可呈简单整数比。",
          en: "For different stoichiometric compounds of two elements, masses of one combining with a fixed mass of the other can form small whole-number ratios.",
        },
      },
    ],
    timeline: [
      {
        year: "1766",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1793",
        text: {
          zh: "在曼彻斯特任教。",
          en: "Began teaching in Manchester.",
        },
      },
      {
        year: "1808",
        text: {
          zh: "出版《化学哲学新体系》第一卷。",
          en: "Published the first volume of A New System of Chemical Philosophy.",
        },
      },
      {
        year: "1844",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/dalton.jpg",
      alt: {
        zh: "道尔顿的肖像",
        en: "Portrait of Dalton",
      },
      credit: {
        zh: "Thomas Phillips，1835 · Public domain；等比缩放与 JPEG 重编码",
        en: "Thomas Phillips, 1835 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:John_Dalton_by_Thomas_Phillips,_1835.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · John Dalton",
        href: "https://www.sciencehistory.org/education/scientific-biographies/john-dalton/",
      },
      {
        title: "ACS · Dalton and chemical atomism",
        href: "https://pubsapp.acs.org/subscribe/archive/tcaw/12/i11/pdf/1103chemchron.pdf",
      },
    ],
  },
  {
    id: "avogadro",
    name: {
      zh: "阿伏伽德罗",
      en: "Avogadro",
    },
    fullName: "Amedeo Avogadro",
    born: 1776,
    died: 1856,
    place: {
      zh: "都灵",
      en: "Turin",
    },
    field: {
      zh: "气体 · 分子观",
      en: "Gases · Molecular theory",
    },
    hook: {
      zh: "原子和分子，需要两个不同的名字。",
      en: "Atoms and molecules need to be distinguished.",
    },
    summary: {
      zh: "阿伏伽德罗用气体体积关系区分原子与分子层次。他的1811年假说长期未获普遍接受，后来经康尼查罗等人重新组织，帮助稳定原子量体系。",
      en: "Avogadro distinguished molecular from atomic levels through gas volumes. His 1811 proposal gained wider use only later, notably through Cannizzaro’s reconstruction of atomic weights.",
    },
    achievements: [
      {
        year: "1811",
        title: {
          zh: "等体积气体的分子数",
          en: "Equal gas volumes and molecular numbers",
        },
        description: {
          zh: "相同温度、压强下，理想气体的相等体积包含相同分子数；现代形式把适用条件写得更明确。",
          en: "Equal volumes of ideal gases at the same temperature and pressure contain equal numbers of molecules, a modern statement with explicit conditions.",
        },
      },
      {
        year: "1811",
        title: {
          zh: "元素气体也可由多原子分子组成",
          en: "Elemental gases can contain multi-atom molecules",
        },
        description: {
          zh: "允许氧、氢等元素气体的分子由多个原子组成，从而协调水生成时的体积比例。",
          en: "Allowing elemental gas molecules to contain multiple atoms reconciled the combining volumes observed when water forms.",
        },
      },
      {
        year: "1811–1814",
        title: {
          zh: "由气体密度比较分子质量",
          en: "Molecular masses from gas density",
        },
        description: {
          zh: "在同温同压和理想近似下，气体密度比对应摩尔质量比，提供从宏观测量推断分子质量的路线。",
          en: "At equal temperature and pressure in the ideal approximation, gas-density ratios equal molar-mass ratios, connecting bulk measurements to molecular masses.",
        },
        formula: "\\rho_1/\\rho_2=M_1/M_2",
      },
    ],
    timeline: [
      {
        year: "1776",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1809",
        text: {
          zh: "在韦尔切利任物理教师。",
          en: "Became a physics teacher in Vercelli.",
        },
      },
      {
        year: "1820",
        text: {
          zh: "任都灵大学数理物理教授。",
          en: "Became professor of mathematical physics at Turin.",
        },
      },
      {
        year: "1856",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/avogadro.jpg",
      alt: {
        zh: "阿伏伽德罗的肖像",
        en: "Portrait of Avogadro",
      },
      credit: {
        zh: "原画作者不详，1856 年以前 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown original artist, before 1856 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Amadeo_Avogadro.png",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Amedeo Avogadro",
        href: "https://www.sciencehistory.org/education/scientific-biographies/amedeo-avogadro/",
      },
      {
        title: "Avogadro · 1811 memoir, translated primary text",
        href: "https://web.lemoyne.edu/~giunta/avogadro.html",
      },
    ],
  },
  {
    id: "proust",
    name: {
      zh: "普鲁斯特",
      en: "Proust",
    },
    fullName: "Joseph Proust",
    born: 1754,
    died: 1826,
    place: {
      zh: "昂热 → 塞哥维亚 → 马德里",
      en: "Angers → Segovia → Madrid",
    },
    field: {
      zh: "组成定律 · 分析化学",
      en: "Composition laws · Chemical analysis",
    },
    hook: {
      zh: "化合物的比例，是偶然混合还是固定组成？",
      en: "Is a composition an arbitrary mixture or a fixed compound?",
    },
    summary: {
      zh: "普鲁斯特以反复分析区分混合物和化合物，推动定比定律。他的结论针对定比化合物；后来认识到的非整比固体需要另作处理。",
      en: "Proust distinguished mixtures from compounds by repeated analysis. His law applies to stoichiometric compounds; nonstoichiometric solids require a broader account.",
    },
    achievements: [
      {
        year: "1794–1799",
        title: {
          zh: "定比定律",
          en: "Definite proportions",
        },
        description: {
          zh: "比较天然与人工制备样品，提出同一种定比化合物的元素质量比例固定，不随原料配比任意改变。",
          en: "Comparing natural and prepared samples, he argued that a given stoichiometric compound has fixed elemental mass ratios.",
        },
      },
      {
        year: "1790s",
        title: {
          zh: "区分不同氧化物与混合物",
          en: "Distinguishing oxides from mixtures",
        },
        description: {
          zh: "通过金属与氧、硫的定量分析，区分多种固定组成与它们的混合，给定比主张提供实验证据。",
          en: "Quantitative studies of metal oxides and sulfides distinguished separate fixed compositions from mixtures, providing evidence for his compositional argument.",
        },
      },
      {
        year: "1800s",
        title: {
          zh: "食品成分的分离研究",
          en: "Analysis of food components",
        },
        description: {
          zh: "研究葡萄糖和食物中的化学成分，把称量、分离与成分比较用于天然混合物。",
          en: "He investigated grape sugar and other food components, extending separation, weighing and compositional comparison to natural mixtures.",
        },
      },
    ],
    timeline: [
      {
        year: "1754",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1786",
        text: {
          zh: "赴西班牙任教和研究。",
          en: "Moved to Spain to teach and research.",
        },
      },
      {
        year: "1799",
        text: {
          zh: "在马德里主持化学实验室。",
          en: "Directed a chemical laboratory in Madrid.",
        },
      },
      {
        year: "1826",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/proust.jpg",
      alt: {
        zh: "普鲁斯特的肖像",
        en: "Portrait of Proust",
      },
      credit: {
        zh: "作者不详；Wellcome Collection，原作年代未详 · CC BY 4.0；等比缩放与 JPEG 重编码",
        en: "Unknown artist; Wellcome Collection, original date unrecorded · CC BY 4.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Portrait_of_Louis_Proust._Wellcome_L0006972.jpg",
      kind: "portrait",
      license: {
        label: "CC BY 4.0",
        href: "https://creativecommons.org/licenses/by/4.0",
      },
    },
    sources: [
      {
        title: "Linda Hall Library · Joseph Proust",
        href: "https://www.lindahall.org/about/news/scientist-of-the-day/joseph-proust/",
      },
      {
        title: "Proust · Fixed proportions, translated primary text",
        href: "https://web.lemoyne.edu/~giunta/proust.html",
      },
      {
        title: "Wellcome Collection · Proust’s grape-sugar memoir",
        href: "https://wellcomecollection.org/works/j4tju2x2",
      },
    ],
  },
  {
    id: "gay-lussac",
    name: {
      zh: "盖–吕萨克",
      en: "Gay-Lussac",
    },
    fullName: "Joseph Louis Gay-Lussac",
    born: 1778,
    died: 1850,
    place: {
      zh: "圣莱昂纳尔 → 巴黎",
      en: "Saint-Léonard → Paris",
    },
    field: {
      zh: "气体 · 容量分析",
      en: "Gases · Volumetric analysis",
    },
    hook: {
      zh: "用体积计数，也能发现化学比例。",
      en: "Volumes can reveal chemical ratios.",
    },
    summary: {
      zh: "盖–吕萨克研究气体热膨胀、反应体积和定量分析。他的气体结合体积规律为阿伏伽德罗的分子假说提供了关键问题。",
      en: "Gay-Lussac studied thermal expansion, combining volumes and quantitative analysis. His gas-volume results posed the question that Avogadro’s molecular hypothesis addressed.",
    },
    achievements: [
      {
        year: "1802",
        title: {
          zh: "比较气体的热膨胀",
          en: "Comparing gas expansion",
        },
        description: {
          zh: "在压强一定的条件下研究气体体积随温度的变化，完善后来称为查理定律的经验关系。",
          en: "He studied gas-volume changes at constant pressure, refining the empirical relationship associated with Charles’s law.",
        },
      },
      {
        year: "1808",
        title: {
          zh: "气体结合体积规律",
          en: "Combining volumes",
        },
        description: {
          zh: "同温同压下，反应气体与气态产物的体积常呈简单整数比，前提是按相同状态比较。",
          en: "Reacting gases and gaseous products have simple volume ratios when compared at the same temperature and pressure.",
        },
      },
      {
        year: "1820s",
        title: {
          zh: "标准化容量分析",
          en: "Standardizing volumetric analysis",
        },
        description: {
          zh: "改进滴定与标准溶液操作，并使用滴定管、移液管等仪器，使未知含量能由可控体积关系推算。",
          en: "He developed titration and standard-solution methods with volumetric instruments, making composition measurable through controlled volumes.",
        },
      },
    ],
    timeline: [
      {
        year: "1778",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1797",
        text: {
          zh: "进入巴黎综合理工学校。",
          en: "Entered the École Polytechnique.",
        },
      },
      {
        year: "1804",
        text: {
          zh: "乘气球采集高空测量与空气样品。",
          en: "Made balloon ascents for atmospheric measurements and samples.",
        },
      },
      {
        year: "1850",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/gay-lussac.jpg",
      alt: {
        zh: "盖–吕萨克的肖像",
        en: "Portrait of Gay-Lussac",
      },
      credit: {
        zh: "François-Séraphin Delpech，原作年代未详 · Public domain；等比缩放与 JPEG 重编码",
        en: "François-Séraphin Delpech, Original date unrecorded · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Gaylussac.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Gay-Lussac",
        href: "https://www.sciencehistory.org/education/scientific-biographies/joseph-louis-gay-lussac/",
      },
      {
        title: "Science History Institute · Laboratory notebook, 1820–1825",
        href: "https://archives.sciencehistory.org/repositories/3/resources/385",
      },
    ],
  },
  {
    id: "davy",
    name: {
      zh: "戴维",
      en: "Davy",
    },
    fullName: "Humphry Davy",
    born: 1778,
    died: 1829,
    place: {
      zh: "彭赞斯 → 伦敦",
      en: "Penzance → London",
    },
    field: {
      zh: "电化学 · 元素",
      en: "Electrochemistry · Elements",
    },
    hook: {
      zh: "让电流拆开那些似乎不可再分的物质。",
      en: "Use electricity to separate apparently indivisible substances.",
    },
    summary: {
      zh: "戴维把伏打电池带入化学，分离活泼金属，并重新解释氯。他在皇家研究院指导法拉第；实验成果同时推动了元素观和电化学。",
      en: "Davy used voltaic electricity to isolate reactive metals and reinterpreted chlorine. His Royal Institution laboratory also provided Faraday’s early training.",
    },
    achievements: [
      {
        year: "1807–1808",
        title: {
          zh: "电解分离活泼金属",
          en: "Electrolytic isolation of reactive metals",
        },
        description: {
          zh: "利用电化学方法分离钾、钠及若干碱土金属，表明所谓碱土并不是不可分的元素。",
          en: "Electrochemical isolation of potassium, sodium and several alkaline-earth metals showed that their parent earths were not indivisible elements.",
        },
      },
      {
        year: "1810",
        title: {
          zh: "确认氯的元素性质",
          en: "Recognizing elemental chlorine",
        },
        description: {
          zh: "证明氯不必含氧，挑战把氧视为所有酸必需成分的理论，修正舍勒对该气体的解释。",
          en: "He established that chlorine was not an oxygen compound, challenging oxygen-based theories of acidity and revising Scheele’s interpretation.",
        },
      },
      {
        year: "1815",
        title: {
          zh: "研究矿灯火焰传播",
          en: "Investigating flame propagation in mine lamps",
        },
        description: {
          zh: "用火焰在狭窄通道中受冷却的现象发展安全灯；这是有明确使用限制的历史工程方案。",
          en: "He used flame cooling in narrow passages to develop a safety lamp, a historical engineering solution with important operating limitations.",
        },
      },
    ],
    timeline: [
      {
        year: "1778",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1801",
        text: {
          zh: "进入皇家研究院工作。",
          en: "Joined the Royal Institution.",
        },
      },
      {
        year: "1813",
        text: {
          zh: "聘用法拉第为化学助理。",
          en: "Hired Faraday as a chemical assistant.",
        },
      },
      {
        year: "1829",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/davy.jpg",
      alt: {
        zh: "戴维的肖像",
        en: "Portrait of Davy",
      },
      credit: {
        zh: "Thomas Phillips，1821 · Public domain；等比缩放与 JPEG 重编码",
        en: "Thomas Phillips, 1821 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Sir_Humphry_Davy,_Bt_by_Thomas_Phillips.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Royal Institution · Humphry Davy",
        href: "https://www.rigb.org/explore-science/humphry-davy",
      },
      {
        title: "Royal Institution · History of research",
        href: "https://www.rigb.org/explore-science/explore/collection/history-research-ri",
      },
    ],
  },
  {
    id: "berzelius",
    name: {
      zh: "贝采里乌斯",
      en: "Berzelius",
    },
    fullName: "Jöns Jacob Berzelius",
    born: 1779,
    died: 1848,
    place: {
      zh: "林雪平 → 斯德哥尔摩",
      en: "Linköping → Stockholm",
    },
    field: {
      zh: "原子量 · 化学符号",
      en: "Atomic weights · Chemical notation",
    },
    hook: {
      zh: "把分析结果，写成可交流的符号。",
      en: "Make analytical results readable through symbols.",
    },
    summary: {
      zh: "贝采里乌斯把精密分析、原子量和字母符号结合，并研究新元素。他的电化学二元论后来受到修正，实验与符号体系却深刻影响了后继者。",
      en: "Berzelius combined precise analysis, atomic weights and letter symbols while investigating new elements. His electrochemical dualism was revised, but his measurements and notation endured.",
    },
    achievements: [
      {
        year: "1813–1814",
        title: {
          zh: "用字母表示元素",
          en: "Letter symbols for elements",
        },
        description: {
          zh: "用元素名称的字母缩写配合数量关系表达组成，成为现代化学式写法的重要来源。",
          en: "Element-name abbreviations combined with numerical proportions became an important source of modern chemical notation.",
        },
      },
      {
        year: "1810s–1820s",
        title: {
          zh: "系统测量原子量",
          en: "Systematic atomic-weight measurements",
        },
        description: {
          zh: "以多种化合物的定量分析交叉检验相对原子量；可靠的数值随后支持周期分类。",
          en: "Cross-checking quantitative analyses of compounds improved relative atomic weights and supplied data for later periodic classification.",
        },
      },
      {
        year: "1817–1820s",
        title: {
          zh: "分离和识别新元素",
          en: "Identifying and isolating elements",
        },
        description: {
          zh: "与合作者研究硒、硅等元素，使矿物分析与新物质的化学性质相互验证。",
          en: "Work with collaborators on selenium, silicon and other elements connected mineral analysis with the properties of newly identified substances.",
        },
      },
    ],
    timeline: [
      {
        year: "1779",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1802",
        text: {
          zh: "在乌普萨拉获医学学位。",
          en: "Earned a medical degree at Uppsala.",
        },
      },
      {
        year: "1807",
        text: {
          zh: "在斯德哥尔摩任教授。",
          en: "Became a professor in Stockholm.",
        },
      },
      {
        year: "1848",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/berzelius.jpg",
      alt: {
        zh: "贝采里乌斯的肖像",
        en: "Portrait of Berzelius",
      },
      credit: {
        zh: "John Way，1826 · Public domain；等比缩放与 JPEG 重编码",
        en: "John Way, 1826 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:J%C3%B6ns_Jacob_Berzelius_1826.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Berzelius",
        href: "https://www.sciencehistory.org/education/scientific-biographies/jons-jakob-berzelius/",
      },
      {
        title: "Royal Society of Chemistry · Silicon",
        href: "https://periodic-table.rsc.org/element/14/",
      },
    ],
  },
  {
    id: "faraday",
    name: {
      zh: "法拉第",
      en: "Faraday",
    },
    fullName: "Michael Faraday",
    born: 1791,
    died: 1867,
    place: {
      zh: "伦敦",
      en: "London",
    },
    field: {
      zh: "电解 · 分离化学",
      en: "Electrolysis · Chemical separation",
    },
    hook: {
      zh: "电流的多少，怎样变成物质的多少？",
      en: "How does electrical charge become an amount of substance?",
    },
    summary: {
      zh: "法拉第从戴维的实验室走出，在气体、芳香化合物和电解之间建立可测量的联系。本馆侧重他的化学工作，而非仅以电磁学代表整个人生。",
      en: "Faraday developed measurable relationships across gases, aromatic compounds and electrolysis after training with Davy. This profile emphasizes his chemical work.",
    },
    achievements: [
      {
        year: "1823",
        title: {
          zh: "把气体变为液体",
          en: "Liquefying gases",
        },
        description: {
          zh: "研究加压与冷却下的气体液化，显示气体和液体可以是同一种物质的不同状态。",
          en: "Experiments with pressure and cooling showed that gas and liquid could be different states of the same substance.",
        },
      },
      {
        year: "1825",
        title: {
          zh: "分离苯",
          en: "Isolating benzene",
        },
        description: {
          zh: "从照明气副产物中分离一种碳氢化合物；后来对它的结构研究进入芳香化学。",
          en: "He isolated a hydrocarbon from illuminating-gas residues; later investigation of its structure helped establish aromatic chemistry.",
        },
      },
      {
        year: "1833–1834",
        title: {
          zh: "电解定律",
          en: "Laws of electrolysis",
        },
        description: {
          zh: "在规定电极反应下，转移电荷与反应物质的量成比例；需要明确每个离子对应的电子数。",
          en: "For a specified electrode reaction, transferred charge is proportional to reacted amount, accounting for the number of electrons involved.",
        },
        formula: "Q=zFn",
      },
    ],
    timeline: [
      {
        year: "1791",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1813",
        text: {
          zh: "任皇家研究院化学助理。",
          en: "Became a chemical assistant at the Royal Institution.",
        },
      },
      {
        year: "1833",
        text: {
          zh: "任富勒化学教授。",
          en: "Became Fullerian Professor of Chemistry.",
        },
      },
      {
        year: "1867",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/faraday.jpg",
      alt: {
        zh: "法拉第的肖像",
        en: "Portrait of Faraday",
      },
      credit: {
        zh: "摄影者不详，c. 1850s · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, c. 1850s · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Michael_Faraday_sitting_crop.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Royal Institution · Michael Faraday",
        href: "https://www.rigb.org/explore-science/explore/person/michael-faraday-1791-1867",
      },
      {
        title: "Royal Institution · Faraday’s benzene sample",
        href: "https://www.rigb.org/explore-science/explore/collection/michael-faradays-sample-benzene",
      },
    ],
  },
  {
    id: "wohler",
    name: {
      zh: "维勒",
      en: "Wöhler",
    },
    fullName: "Friedrich Wöhler",
    born: 1800,
    died: 1882,
    place: {
      zh: "埃舍尔斯海姆 → 哥廷根",
      en: "Eschersheim → Göttingen",
    },
    field: {
      zh: "有机合成 · 元素分离",
      en: "Organic synthesis · Element isolation",
    },
    hook: {
      zh: "来自生命的物质，能否在实验室得到？",
      en: "Can a substance associated with life be made in a laboratory?",
    },
    summary: {
      zh: "维勒研究元素、有机转化，并与李比希建立长期合作。尿素实验成为化学史标志，但并未在一天之内终结所有生命力学说。",
      en: "Wöhler investigated elements and organic transformations and collaborated closely with Liebig. His urea experiment became iconic without instantly ending every form of vitalism.",
    },
    achievements: [
      {
        year: "1827–1828",
        title: {
          zh: "改进金属分离",
          en: "Improving metal isolation",
        },
        description: {
          zh: "改进铝的制取并研究铍、钇的分离，把难还原的矿物组分变为可研究的材料。",
          en: "He improved aluminium preparation and investigated the isolation of beryllium and yttrium from difficult mineral compounds.",
        },
      },
      {
        year: "1828",
        title: {
          zh: "由氰酸铵得到尿素",
          en: "Urea from ammonium cyanate",
        },
        description: {
          zh: "观察相同元素组成的物质能转为尿素，连接无机试剂与有机产物；历史意义比一则反生命力神话更复杂。",
          en: "He obtained urea from ammonium cyanate, connecting inorganic reagents with an organic product and illustrating transformations between substances of the same composition.",
        },
      },
      {
        year: "1832",
        title: {
          zh: "苯甲酰基研究",
          en: "Investigating the benzoyl group",
        },
        description: {
          zh: "与李比希追踪一组反应中保持的原子团，发展有机结构思想；这里的历史基不等于现代自由基。",
          en: "With Liebig, he tracked a group retained across reactions. This historical radical concept should not be confused with a modern free radical.",
        },
      },
    ],
    timeline: [
      {
        year: "1800",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1823",
        text: {
          zh: "赴斯德哥尔摩向贝采里乌斯学习。",
          en: "Studied with Berzelius in Stockholm.",
        },
      },
      {
        year: "1836",
        text: {
          zh: "任哥廷根大学教授。",
          en: "Became a professor at Göttingen.",
        },
      },
      {
        year: "1882",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/wohler.jpg",
      alt: {
        zh: "维勒的肖像",
        en: "Portrait of Wöhler",
      },
      credit: {
        zh: "Rudolph Hoffmann，1856 · Public domain；等比缩放与 JPEG 重编码",
        en: "Rudolph Hoffmann, 1856 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Friedrich_W%C3%B6hler_Litho.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Liebig and Wöhler",
        href: "https://www.sciencehistory.org/education/scientific-biographies/justus-von-liebig-and-friedrich-wohler/",
      },
      {
        title: "Royal Society of Chemistry · Aluminium",
        href: "https://periodic-table.rsc.org/element/13/",
      },
    ],
  },
  {
    id: "liebig",
    name: {
      zh: "李比希",
      en: "Liebig",
    },
    fullName: "Justus von Liebig",
    born: 1803,
    died: 1873,
    place: {
      zh: "达姆施塔特 → 吉森 → 慕尼黑",
      en: "Darmstadt → Giessen → Munich",
    },
    field: {
      zh: "有机分析 · 农业化学",
      en: "Organic analysis · Agricultural chemistry",
    },
    hook: {
      zh: "先把组成量准，再问物质怎样变化。",
      en: "Measure composition before explaining transformation.",
    },
    summary: {
      zh: "李比希把有机分析变得更高效，也研究植物营养。他与维勒共同提出结构线索，培养了大批实验化学研究者；农业理论中的部分推断后来被修正。",
      en: "Liebig improved organic analysis, studied plant nutrition and worked with Wöhler on structural questions. His influential agricultural theories also contained claims later corrected.",
    },
    achievements: [
      {
        year: "1831",
        title: {
          zh: "有机元素分析装置",
          en: "Organic elemental analysis",
        },
        description: {
          zh: "改进吸收和称量燃烧产物的装置，使碳、氢含量测定更高效，为化学式提供数据。",
          en: "Improved absorption and weighing of combustion products made carbon and hydrogen analysis more efficient and supported formula determination.",
        },
      },
      {
        year: "1832",
        title: {
          zh: "追踪反应中的原子团",
          en: "Tracking groups through reactions",
        },
        description: {
          zh: "与维勒研究苯甲酰系列，以相互转化而非仅外观分类有机物，推动结构化学。",
          en: "Benzoyl studies with Wöhler classified organic substances through interconversion, helping develop structural chemistry.",
        },
      },
      {
        year: "1840",
        title: {
          zh: "植物营养进入化学分析",
          en: "Chemical analysis of plant nutrition",
        },
        description: {
          zh: "强调植物生长需要矿物营养并研究土壤补充。具体肥效仍需实验，不能把所有生长问题归为单一元素不足。",
          en: "He emphasized mineral nutrients and soil replenishment; fertilizer performance still required experiments rather than one universal explanation of growth.",
        },
      },
    ],
    timeline: [
      {
        year: "1803",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1824",
        text: {
          zh: "到吉森任教并发展教学实验室。",
          en: "Joined Giessen and developed laboratory teaching.",
        },
      },
      {
        year: "1852",
        text: {
          zh: "转任慕尼黑大学教授。",
          en: "Moved to a professorship in Munich.",
        },
      },
      {
        year: "1873",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/liebig.jpg",
      alt: {
        zh: "李比希的肖像",
        en: "Portrait of Liebig",
      },
      credit: {
        zh: "摄影者不详，约1866 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, circa 1866 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Justus_von_Liebig_NIH.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Liebig and Wöhler",
        href: "https://www.sciencehistory.org/education/scientific-biographies/justus-von-liebig-and-friedrich-wohler/",
      },
      {
        title: "Liebig · Familiar Letters on Chemistry",
        href: "https://www.gutenberg.org/ebooks/4524",
      },
    ],
  },
  {
    id: "bunsen",
    name: {
      zh: "本生",
      en: "Bunsen",
    },
    fullName: "Robert Bunsen",
    born: 1811,
    died: 1899,
    place: {
      zh: "哥廷根 → 马尔堡 → 海德堡",
      en: "Göttingen → Marburg → Heidelberg",
    },
    field: {
      zh: "光谱 · 分析仪器",
      en: "Spectroscopy · Analytical instruments",
    },
    hook: {
      zh: "一束光，也能成为元素的指纹。",
      en: "Light can serve as an elemental fingerprint.",
    },
    summary: {
      zh: "本生把仪器改进与定量化学结合。他与基尔霍夫建立光谱分析，并通过气体分析和电池研究拓展实验室能力。",
      en: "Bunsen linked instrument development with quantitative chemistry. Collaboration with Kirchhoff established spectral analysis, alongside work on gases and electrochemical apparatus.",
    },
    achievements: [
      {
        year: "1841",
        title: {
          zh: "碳电极电池",
          en: "A carbon-electrode cell",
        },
        description: {
          zh: "以碳替代昂贵电极材料发展电池，为实验提供较经济的电源；它并非所有用途的理想电池。",
          en: "Replacing an expensive electrode with carbon provided a more economical laboratory power source, with its own chemical limitations.",
        },
      },
      {
        year: "1857",
        title: {
          zh: "定量气体分析",
          en: "Quantitative gas analysis",
        },
        description: {
          zh: "系统改进气体采集、体积校正与吸收测定，使混合气组成能被定量比较。",
          en: "He systematized gas collection, volume corrections and absorption measurements to compare gas-mixture compositions quantitatively.",
        },
      },
      {
        year: "1859–1861",
        title: {
          zh: "光谱分析与新元素",
          en: "Spectral analysis and new elements",
        },
        description: {
          zh: "与基尔霍夫用特征谱线识别元素，并发现铯和铷；仪器和解释来自合作。",
          en: "With Kirchhoff, he identified elements through characteristic lines and discovered caesium and rubidium through combined instrumental and theoretical work.",
        },
      },
    ],
    timeline: [
      {
        year: "1811",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1830",
        text: {
          zh: "在哥廷根获博士学位。",
          en: "Earned his doctorate at Göttingen.",
        },
      },
      {
        year: "1852",
        text: {
          zh: "在海德堡任教。",
          en: "Became a professor at Heidelberg.",
        },
      },
      {
        year: "1899",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/bunsen.jpg",
      alt: {
        zh: "本生的肖像",
        en: "Portrait of Bunsen",
      },
      credit: {
        zh: "摄影者不详；海德堡大学 HeidICON 53016，1852–1899 · CC BY-SA 4.0；等比缩放与 JPEG 重编码",
        en: "Unknown photographer; Heidelberg University, HeidICON 53016, 1852–1899 · CC BY-SA 4.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Robert_Wilhelm_Bunsen_(HeidICON_53016)_(cropped).jpg",
      kind: "portrait",
      license: {
        label: "CC BY-SA 4.0",
        href: "https://creativecommons.org/licenses/by-sa/4.0",
      },
    },
    sources: [
      {
        title: "Science History Institute · Bunsen and Kirchhoff",
        href: "https://www.sciencehistory.org/education/scientific-biographies/robert-bunsen-and-gustav-kirchhoff/",
      },
      {
        title: "Royal Society of Chemistry · Caesium",
        href: "https://periodic-table.rsc.org/element/55/",
      },
    ],
  },
  {
    id: "kekule",
    name: {
      zh: "凯库勒",
      en: "Kekulé",
    },
    fullName: "August Kekulé",
    born: 1829,
    died: 1896,
    place: {
      zh: "达姆施塔特 → 吉森 → 波恩",
      en: "Darmstadt → Giessen → Bonn",
    },
    field: {
      zh: "碳结构 · 芳香化学",
      en: "Carbon structure · Aromatic chemistry",
    },
    hook: {
      zh: "同一套原子，怎样连成不同分子？",
      en: "How can the same atoms connect into different molecules?",
    },
    summary: {
      zh: "凯库勒研究碳的成键能力、链和环，推动结构化学。库珀等人也独立发展相关观点；熟悉的梦境故事不能代替论文和实验依据。",
      en: "Kekulé studied carbon bonding, chains and rings. Couper and others independently developed related ideas; anecdotes about dreams do not replace the scientific record.",
    },
    achievements: [
      {
        year: "1857–1858",
        title: {
          zh: "碳的四价性",
          en: "Carbon’s tetravalence",
        },
        description: {
          zh: "将碳通常形成四个价键作为解释有机组成的规则。这是经典结构模型，不能无条件套给所有碳物种。",
          en: "Treating carbon as normally tetravalent organized organic composition, within a classical structural model rather than a rule for every carbon species.",
        },
      },
      {
        year: "1858",
        title: {
          zh: "碳原子相互连接成链",
          en: "Carbon-to-carbon chains",
        },
        description: {
          zh: "与库珀近乎同时独立提出碳可相互连接，用连接关系解释复杂有机物。",
          en: "Independently and nearly simultaneously with Couper, he used carbon-to-carbon links to explain complex organic compounds.",
        },
      },
      {
        year: "1865–1866",
        title: {
          zh: "苯的环状结构",
          en: "A ring structure for benzene",
        },
        description: {
          zh: "提出六碳环来解释苯的组成和取代关系；现代芳香性及电子离域理论是后来的发展。",
          en: "A six-carbon ring explained benzene’s composition and substitution patterns; modern aromaticity and electron delocalization came later.",
        },
      },
    ],
    timeline: [
      {
        year: "1829",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1852",
        text: {
          zh: "在吉森完成博士研究。",
          en: "Completed doctoral studies at Giessen.",
        },
      },
      {
        year: "1867",
        text: {
          zh: "到波恩大学任教。",
          en: "Became a professor at Bonn.",
        },
      },
      {
        year: "1896",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/kekule.jpg",
      alt: {
        zh: "凯库勒的肖像",
        en: "Portrait of Kekulé",
      },
      credit: {
        zh: "摄影者不详 Verlag / publisher: J.F. Lehmann, München，by 1890 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer Verlag / publisher: J.F. Lehmann, München, by 1890 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Friedrich_August_Kekul%C3%A9_von_Stradonitz_(1890er).jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Kekulé’s benzene treatise",
        href: "https://digital.sciencehistory.org/works/xk81jm643",
      },
      {
        title: "Chemical Society Reviews · 150 years after Kekulé’s benzene",
        href: "https://doi.org/10.1039/C5CS90085A",
      },
    ],
  },
  {
    id: "pasteur",
    name: {
      zh: "巴斯德",
      en: "Pasteur",
    },
    fullName: "Louis Pasteur",
    born: 1822,
    died: 1895,
    place: {
      zh: "多勒 → 斯特拉斯堡 → 巴黎",
      en: "Dole → Strasbourg → Paris",
    },
    field: {
      zh: "立体化学 · 生物化学",
      en: "Stereochemistry · Biochemistry",
    },
    hook: {
      zh: "镜像分子，会有相同的生命作用吗？",
      en: "Do mirror-image molecules behave the same in living systems?",
    },
    summary: {
      zh: "巴斯德从晶体的手性走向发酵与微生物。他把化学变化与生物活动连接起来，研究始终依赖可比较的样品和严格对照。",
      en: "Pasteur moved from crystal handedness to fermentation and microorganisms, linking chemical change with biological activity through comparisons and controlled experiments.",
    },
    achievements: [
      {
        year: "1848",
        title: {
          zh: "手工分离镜像晶体",
          en: "Separating mirror-image crystals",
        },
        description: {
          zh: "分离酒石酸盐的两类镜像晶体，观察相反旋光效应，连接宏观晶形与分子不对称性。",
          en: "Separating mirror-image tartrate crystals revealed opposite optical rotations and connected crystal form with molecular asymmetry.",
        },
      },
      {
        year: "1857–1860s",
        title: {
          zh: "发酵与微生物",
          en: "Fermentation and microorganisms",
        },
        description: {
          zh: "把不同发酵过程与特定微生物活动联系，反对把所有发酵仅看成无生命的自发分解。",
          en: "He linked different fermentations to microbial activity rather than treating them all as spontaneous lifeless decomposition.",
        },
      },
      {
        year: "1860s",
        title: {
          zh: "受控加热保存饮品",
          en: "Controlled heating for preservation",
        },
        description: {
          zh: "研究温和加热抑制导致饮品败坏的微生物。巴氏处理是条件受控的降菌过程，不等同于完全灭菌。",
          en: "Controlled heating suppressed organisms that spoil drinks. Pasteurization reduces microbial load under specified conditions rather than guaranteeing complete sterilization.",
        },
      },
    ],
    timeline: [
      {
        year: "1822",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1847",
        text: {
          zh: "完成巴黎高等师范学校博士研究。",
          en: "Completed doctoral work at the École Normale Supérieure.",
        },
      },
      {
        year: "1888",
        text: {
          zh: "巴斯德研究所成立。",
          en: "The Institut Pasteur opened.",
        },
      },
      {
        year: "1895",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/pasteur.jpg",
      alt: {
        zh: "巴斯德的肖像",
        en: "Portrait of Pasteur",
      },
      credit: {
        zh: "Paul Nadar，早于1895 · Public domain；等比缩放与 JPEG 重编码",
        en: "Paul Nadar, before 1895 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Louis_Pasteur,_foto_av_Paul_Nadar,_Crisco_edit.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Louis Pasteur",
        href: "https://www.sciencehistory.org/education/scientific-biographies/louis-pasteur/",
      },
      {
        title: "Institut Pasteur · Louis Pasteur",
        href: "https://www.pasteur.fr/en/institut-pasteur/history/louis-pasteur",
      },
    ],
  },
  {
    id: "cannizzaro",
    name: {
      zh: "康尼查罗",
      en: "Cannizzaro",
    },
    fullName: "Stanislao Cannizzaro",
    born: 1826,
    died: 1910,
    place: {
      zh: "巴勒莫 → 亚历山德里亚 → 罗马",
      en: "Palermo → Alessandria → Rome",
    },
    field: {
      zh: "原子量 · 有机反应",
      en: "Atomic weights · Organic reactions",
    },
    hook: {
      zh: "先分清原子与分子，再整理化学式。",
      en: "Separate atoms from molecules before organizing formulas.",
    },
    summary: {
      zh: "康尼查罗重新阐明阿伏伽德罗的思想，协调分子量与原子量，并发现醛的歧化反应。其教材与卡尔斯鲁厄会议影响了周期分类的建立。",
      en: "Cannizzaro clarified Avogadro’s ideas, reconciled molecular and atomic weights and discovered aldehyde disproportionation. His teaching strongly influenced periodic classification.",
    },
    achievements: [
      {
        year: "1853",
        title: {
          zh: "醛的歧化反应",
          en: "Aldehyde disproportionation",
        },
        description: {
          zh: "某些没有α氢的醛在强碱条件下同时发生氧化与还原，生成羧酸盐与醇；底物条件很重要。",
          en: "Certain aldehydes lacking alpha hydrogens disproportionate under strongly basic conditions into carboxylate and alcohol; substrate requirements matter.",
        },
      },
      {
        year: "1858",
        title: {
          zh: "协调原子量与分子量",
          en: "Reconciling atomic and molecular weights",
        },
        description: {
          zh: "用阿伏伽德罗假说解释气体密度数据，明确原子与分子的不同层次，减少互相矛盾的化学式。",
          en: "Avogadro’s hypothesis linked gas densities to molecular weights while distinguishing atomic weights, reducing contradictory formulas.",
        },
      },
      {
        year: "1858–1860",
        title: {
          zh: "交叉检验化学计量",
          en: "Cross-checking chemical stoichiometry",
        },
        description: {
          zh: "结合气体数据、组成分析和比热等证据组织原子量体系，而非凭一条经验规则决定所有元素。",
          en: "He combined gas data, composition and heat-capacity evidence to organize atomic weights, rather than applying a single rule to every element.",
        },
      },
    ],
    timeline: [
      {
        year: "1826",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1851",
        text: {
          zh: "在亚历山德里亚任化学教授。",
          en: "Became a chemistry professor in Alessandria.",
        },
      },
      {
        year: "1860",
        text: {
          zh: "在卡尔斯鲁厄会议传播原子量方法。",
          en: "Presented his atomic-weight approach at the Karlsruhe congress.",
        },
      },
      {
        year: "1910",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/cannizzaro.jpg",
      alt: {
        zh: "康尼查罗的肖像",
        en: "Portrait of Cannizzaro",
      },
      credit: {
        zh: "摄影者不详；Armin Kübelbeck 数字版本，1907 年以前 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer; digital version by Armin Kübelbeck, before 1907 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Stanislao_Cannizzaro_01_(cropped).jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Cannizzaro",
        href: "https://www.sciencehistory.org/education/scientific-biographies/stanislao-cannizzaro/",
      },
      {
        title: "ACS · Assembling the modern periodic table",
        href: "https://inchemistry.acs.org/atomic-news/assembling-the-periodic-table.html",
      },
    ],
  },
  {
    id: "mendeleev",
    name: {
      zh: "门捷列夫",
      en: "Mendeleev",
    },
    fullName: "Dmitri Mendeleev",
    born: 1834,
    died: 1907,
    place: {
      zh: "托博尔斯克 → 圣彼得堡",
      en: "Tobolsk → St Petersburg",
    },
    field: {
      zh: "周期律 · 物性",
      en: "Periodicity · Physical properties",
    },
    hook: {
      zh: "表格留下空位，也能作出可检验的预言。",
      en: "An empty place in a table can make a testable prediction.",
    },
    summary: {
      zh: "门捷列夫把元素性质与原子量组织成周期体系，主动保留尚未发现元素的位置。他也研究液体物性；周期表的形成有迈耶等多位贡献者。",
      en: "Mendeleev organized elemental properties into a periodic system, leaving places for undiscovered elements. His work on liquids accompanied a classification developed alongside other pioneers.",
    },
    achievements: [
      {
        year: "1869",
        title: {
          zh: "元素性质的周期分类",
          en: "Periodic classification",
        },
        description: {
          zh: "把相似性质放进重复出现的组，建立原子量顺序与化学行为之间的关系。现代周期律以原子序数为基础。",
          en: "He grouped recurring chemical properties within an atomic-weight ordering; the modern periodic law instead uses atomic number.",
        },
      },
      {
        year: "1871",
        title: {
          zh: "预测尚未发现的元素",
          en: "Predicting undiscovered elements",
        },
        description: {
          zh: "对后来对应镓、钪、锗的位置预测性质和化合物，给分类提供可由新发现检验的内容。",
          en: "Predictions for gaps later associated with gallium, scandium and germanium made the classification testable.",
        },
      },
      {
        year: "1860s",
        title: {
          zh: "研究液体混合的物性",
          en: "Physical properties of liquid mixtures",
        },
        description: {
          zh: "研究酒精与水等溶液的密度和组成关系，认识混合体积不能简单相加；这不是发明某个伏特加酒精度。",
          en: "Studies of alcohol–water density and composition examined nonadditive mixing volumes, not the invention of a prescribed vodka strength.",
        },
      },
    ],
    timeline: [
      {
        year: "1834",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1856",
        text: {
          zh: "获圣彼得堡大学硕士学位。",
          en: "Earned a master’s degree at St Petersburg.",
        },
      },
      {
        year: "1865",
        text: {
          zh: "完成有关酒精与水的博士研究。",
          en: "Completed doctoral research on alcohol and water.",
        },
      },
      {
        year: "1907",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/mendeleev.jpg",
      alt: {
        zh: "门捷列夫的肖像",
        en: "Portrait of Mendeleev",
      },
      credit: {
        zh: "摄影者不详，原作年代未详 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, original date unrecorded · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Dmitri_Mendeleev.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Royal Society of Chemistry · Development of the periodic table",
        href: "https://periodic-table.rsc.org/history/about",
      },
      {
        title: "ACS · Assembling the modern periodic table",
        href: "https://inchemistry.acs.org/atomic-news/assembling-the-periodic-table.html",
      },
    ],
  },
  {
    id: "lothar-meyer",
    name: {
      zh: "洛塔尔·迈耶",
      en: "Lothar Meyer",
    },
    fullName: "Julius Lothar Meyer",
    born: 1830,
    died: 1895,
    place: {
      zh: "法雷尔 → 海德堡 → 图宾根",
      en: "Varel → Heidelberg → Tübingen",
    },
    field: {
      zh: "周期律 · 生理化学",
      en: "Periodicity · Physiological chemistry",
    },
    hook: {
      zh: "把元素画成曲线，周期就出现了。",
      en: "Plot elemental properties and periodicity becomes visible.",
    },
    summary: {
      zh: "迈耶以物性曲线和价态比较独立推进周期分类。他早年研究呼吸中的气体，使医学训练与定量化学在其工作中相遇。",
      en: "Meyer independently advanced periodic classification through valence comparisons and physical-property curves. Earlier studies of respiratory gases connected his medical and chemical training.",
    },
    achievements: [
      {
        year: "1857",
        title: {
          zh: "血液中的氧结合",
          en: "Oxygen binding in blood",
        },
        description: {
          zh: "研究血液中的气体，认识氧与血红蛋白的结合不同于单纯物理溶解。",
          en: "His respiratory-gas research recognized oxygen’s association with haemoglobin as more than simple physical dissolution.",
        },
      },
      {
        year: "1864",
        title: {
          zh: "按价态组织元素",
          en: "Grouping elements by valence",
        },
        description: {
          zh: "在教材中以原子量和价态排列一批元素，展示性质成组重复，为后来的完整周期表铺路。",
          en: "His textbook grouped elements by atomic weight and valence, revealing recurring families before a fuller periodic table.",
        },
      },
      {
        year: "1870",
        title: {
          zh: "原子体积的周期曲线",
          en: "A periodic atomic-volume curve",
        },
        description: {
          zh: "将原子体积对原子量作图，得到性质重复的形象证据；与门捷列夫的分类形成互补。",
          en: "Plotting atomic volume against atomic weight made recurring properties visible, complementing Mendeleev’s classification.",
        },
      },
    ],
    timeline: [
      {
        year: "1830",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1854",
        text: {
          zh: "获苏黎世医学学位。",
          en: "Qualified in medicine at Zürich.",
        },
      },
      {
        year: "1876–1877",
        text: {
          zh: "到图宾根任教授。",
          en: "Became a professor at Tübingen.",
        },
      },
      {
        year: "1895",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/lothar-meyer.jpg",
      alt: {
        zh: "洛塔尔·迈耶的肖像",
        en: "Portrait of Lothar Meyer",
      },
      credit: {
        zh: "Wilhelm Hornung，1883-01-11 · Public domain；等比缩放与 JPEG 重编码",
        en: "Wilhelm Hornung, 1883-01-11 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Lothar_Meyer_1883.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "University of Tübingen · Lothar Meyer",
        href: "https://www.oc2.chemie.uni-tuebingen.de/history/lothar_meyer/lothar_meyer.htm",
      },
      {
        title: "ACS · Assembling the modern periodic table",
        href: "https://inchemistry.acs.org/atomic-news/assembling-the-periodic-table.html",
      },
    ],
  },
  {
    id: "van-t-hoff",
    name: {
      zh: "范特霍夫",
      en: "van ’t Hoff",
    },
    fullName: "Jacobus Henricus van 't Hoff",
    born: 1852,
    died: 1911,
    place: {
      zh: "鹿特丹 → 阿姆斯特丹 → 柏林",
      en: "Rotterdam → Amsterdam → Berlin",
    },
    field: {
      zh: "立体化学 · 物理化学",
      en: "Stereochemistry · Physical chemistry",
    },
    hook: {
      zh: "分子有空间形状，溶液也有数量规律。",
      en: "Molecules have shapes; solutions have quantitative laws.",
    },
    summary: {
      zh: "范特霍夫从四面体碳走向动力学和平衡，用空间模型和热力学统一现象。他与勒贝尔独立提出早期立体观，并与奥斯特瓦尔德推动物理化学。",
      en: "Van ’t Hoff linked tetrahedral carbon with studies of kinetics and equilibrium. His stereochemical proposal was independent of Le Bel’s, and he worked with Ostwald to develop physical chemistry.",
    },
    achievements: [
      {
        year: "1874",
        title: {
          zh: "四面体碳与镜像异构",
          en: "Tetrahedral carbon and mirror isomers",
        },
        description: {
          zh: "用碳周围四个方向的空间排列解释旋光异构；四个不同取代基是常见手性中心的一种条件。",
          en: "A tetrahedral arrangement explained optical isomerism; four different substituents describe one common type of chiral carbon center.",
        },
      },
      {
        year: "1884",
        title: {
          zh: "化学动力学与平衡",
          en: "Chemical kinetics and equilibrium",
        },
        description: {
          zh: "系统研究反应速率及温度对平衡的影响，区分达到平衡的快慢与平衡最终位置。",
          en: "He systematized reaction rates and temperature-dependent equilibrium, distinguishing how fast equilibrium is reached from where it lies.",
        },
      },
      {
        year: "1886–1887",
        title: {
          zh: "稀溶液的渗透压",
          en: "Osmotic pressure of dilute solutions",
        },
        description: {
          zh: "理想稀溶液的渗透压与溶质粒子浓度、温度相联系；电解质解离和非理想性需要修正。",
          en: "For an ideal dilute solution, osmotic pressure depends on solute-particle concentration and temperature; dissociation and nonideality require corrections.",
        },
        formula: "\\Pi=cRT",
      },
    ],
    timeline: [
      {
        year: "1852",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1874",
        text: {
          zh: "在乌得勒支获博士学位。",
          en: "Earned his doctorate at Utrecht.",
        },
      },
      {
        year: "1896",
        text: {
          zh: "转赴柏林科学院工作。",
          en: "Moved to the Prussian Academy in Berlin.",
        },
      },
      {
        year: "1911",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/van-t-hoff.jpg",
      alt: {
        zh: "范特霍夫的肖像",
        en: "Portrait of van ’t Hoff",
      },
      credit: {
        zh: "Nicola Perscheid，1904 · Public domain；等比缩放与 JPEG 重编码",
        en: "Nicola Perscheid, 1904 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Jacobus_van_%27t_Hoff_by_Perscheid_1904.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1901/hoff/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1901/hoff/lecture/",
      },
    ],
  },
  {
    id: "le-bel",
    name: {
      zh: "勒贝尔",
      en: "Le Bel",
    },
    fullName: "Joseph Achille Le Bel",
    born: 1847,
    died: 1930,
    place: {
      zh: "佩谢尔布龙 → 巴黎",
      en: "Pechelbronn → Paris",
    },
    field: {
      zh: "立体化学 · 石油分析",
      en: "Stereochemistry · Petroleum analysis",
    },
    hook: {
      zh: "相同的连接，也可能有不同的空间方向。",
      en: "The same connectivity can have different spatial arrangements.",
    },
    summary: {
      zh: "勒贝尔以分子不对称解释旋光，并研究石油组分与含氮化合物。他与范特霍夫独立推进立体化学，不应写成一方指导另一方。",
      en: "Le Bel linked molecular asymmetry with optical activity and investigated petroleum fractions and nitrogen compounds. His stereochemical work was independent of van ’t Hoff’s.",
    },
    achievements: [
      {
        year: "1872",
        title: {
          zh: "分离石油轻质组分",
          en: "Separating light petroleum fractions",
        },
        description: {
          zh: "研究挥发组分及其衍生物，比较相同组成却性质不同的物质，为立体研究积累经验。",
          en: "He studied volatile fractions and derivatives, comparing substances with similar composition but different properties.",
        },
      },
      {
        year: "1874",
        title: {
          zh: "不对称碳与旋光",
          en: "Asymmetric carbon and optical activity",
        },
        description: {
          zh: "将四个不同基团围绕碳的排列与不可重合镜像联系，为旋光异构提供空间解释。",
          en: "He connected four different groups around carbon with nonsuperimposable mirror arrangements, explaining optical isomerism spatially.",
        },
      },
      {
        year: "1891",
        title: {
          zh: "把不对称问题推广到氮",
          en: "Extending asymmetry beyond carbon",
        },
        description: {
          zh: "把不对称问题推广到季铵盐等含氮体系；其1891年样品的解释后来受到质疑，不能当作确证的首次拆分。",
          en: "He extended asymmetry questions to nitrogen compounds; later work challenged his 1891 sample interpretation, so it is not a secure first resolution.",
        },
      },
    ],
    timeline: [
      {
        year: "1847",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1865",
        text: {
          zh: "进入巴黎综合理工学校。",
          en: "Entered the École Polytechnique.",
        },
      },
      {
        year: "1874",
        text: {
          zh: "发表分子不对称与旋光的研究。",
          en: "Published work linking molecular asymmetry and optical rotation.",
        },
      },
      {
        year: "1930",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/le-bel.jpg",
      alt: {
        zh: "勒贝尔的肖像",
        en: "Portrait of Le Bel",
      },
      credit: {
        zh: "摄影者不详，1930 年以前 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, before 1930 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Joseph_Achille_Le_Bel.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "French Academy of Sciences · Joseph Achille Le Bel",
        href: "https://comptes-rendus.academie-sciences.fr/chimie/articles/10.1016/j.crci.2016.01.003/",
      },
      {
        title: "RSC · Early history of asymmetric synthesis",
        href: "https://doi.org/10.1039/C1NJ20216B",
      },
      {
        title:
          "Jaime Wisniak · Le Bel’s life and works, including disputed nitrogen results",
        href: "https://www.redalyc.org/pdf/1816/181625999008.pdf",
      },
    ],
  },
  {
    id: "arrhenius",
    name: {
      zh: "阿伦尼乌斯",
      en: "Arrhenius",
    },
    fullName: "Svante Arrhenius",
    born: 1859,
    died: 1927,
    place: {
      zh: "乌普萨拉 → 斯德哥尔摩",
      en: "Uppsala → Stockholm",
    },
    field: {
      zh: "电解质 · 反应速率",
      en: "Electrolytes · Reaction rates",
    },
    hook: {
      zh: "盐溶进水，为什么能让电流通过？",
      en: "Why does dissolved salt let a current flow?",
    },
    summary: {
      zh: "阿伦尼乌斯以离子解离连接导电与溶液性质，也研究反应温度依赖和大气辐射。早期争论与奥斯特瓦尔德、范特霍夫的支持共同影响了理论传播。",
      en: "Arrhenius connected conductivity and solution properties through ionic dissociation, then studied temperature-dependent rates and atmospheric radiation. Ostwald and van ’t Hoff supported the emerging theory.",
    },
    achievements: [
      {
        year: "1884–1887",
        title: {
          zh: "溶液中的离子解离",
          en: "Ionic dissociation in solution",
        },
        description: {
          zh: "提出电解质在水中形成带电粒子，协调导电与依数性现象；现代电解质理论进一步修正其适用范围。",
          en: "Dissolved electrolytes form charged particles, connecting conductivity and colligative properties; later theories refined the model.",
        },
      },
      {
        year: "1889",
        title: {
          zh: "速率的温度关系",
          en: "Temperature dependence of rate",
        },
        description: {
          zh: "用活化能形式描述许多反应的速率常数随温度变化；参数和适用温区需由具体体系确定。",
          en: "An activation-energy relation describes rate constants for many reactions; its parameters and valid temperature range are system-dependent.",
        },
        formula: "k=Ae^{-E_a/(RT)}",
      },
      {
        year: "1896",
        title: {
          zh: "二氧化碳与热辐射",
          en: "Carbon dioxide and heat radiation",
        },
        description: {
          zh: "定量研究二氧化碳变化对地表温度的可能影响；这是早期气候模型，不能当作现代预测的全部。",
          en: "He quantified possible temperature effects of atmospheric carbon dioxide, an early climate model rather than a complete modern prediction system.",
        },
      },
    ],
    timeline: [
      {
        year: "1859",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1884",
        text: {
          zh: "在乌普萨拉完成博士研究。",
          en: "Completed his doctorate at Uppsala.",
        },
      },
      {
        year: "1895",
        text: {
          zh: "任斯德哥尔摩高等学校教授。",
          en: "Became a professor in Stockholm.",
        },
      },
      {
        year: "1927",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/arrhenius.jpg",
      alt: {
        zh: "阿伦尼乌斯的肖像",
        en: "Portrait of Arrhenius",
      },
      credit: {
        zh: "Photogravure Meisenbach Riffarth & Co. Leipzig.，1909 · Public domain；等比缩放与 JPEG 重编码",
        en: "Photogravure Meisenbach Riffarth & Co. Leipzig., 1909 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Arrhenius2.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Uppsala University · Svante Arrhenius",
        href: "https://www.uu.se/en/about-uu/history/prominent-people/svante-arrhenius",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1903/arrhenius/lecture/",
      },
    ],
  },
  {
    id: "ostwald",
    name: {
      zh: "奥斯特瓦尔德",
      en: "Ostwald",
    },
    fullName: "Wilhelm Ostwald",
    born: 1853,
    died: 1932,
    place: {
      zh: "里加 → 莱比锡",
      en: "Riga → Leipzig",
    },
    field: {
      zh: "催化 · 化学平衡",
      en: "Catalysis · Chemical equilibrium",
    },
    hook: {
      zh: "催化剂改变的是速度，还是最终平衡？",
      en: "Does a catalyst change the rate or the final equilibrium?",
    },
    summary: {
      zh: "奥斯特瓦尔德把反应速率、溶液电导和催化连接起来，并推动物理化学成为共同研究领域。他对原子实在性的早期怀疑后来也发生改变。",
      en: "Ostwald connected reaction rates, solution conductivity and catalysis while helping establish physical chemistry. His own views about atomic reality changed over time.",
    },
    achievements: [
      {
        year: "1888",
        title: {
          zh: "稀释与弱电解质平衡",
          en: "Dilution and weak-electrolyte equilibrium",
        },
        description: {
          zh: "把解离程度与浓度联系，建立弱电解质稀溶液的近似关系；强电解质不能直接照搬。",
          en: "He related dissociation to concentration for dilute weak electrolytes; the simple relation does not apply directly to strong electrolytes.",
        },
      },
      {
        year: "1890s",
        title: {
          zh: "催化的速率解释",
          en: "Catalysis as a rate effect",
        },
        description: {
          zh: "把催化剂理解为改变反应速度的物质，区分动力学效应与热力学平衡位置。",
          en: "He characterized catalysts through their effects on rate, distinguishing kinetics from the thermodynamic equilibrium position.",
        },
      },
      {
        year: "1900s",
        title: {
          zh: "氨氧化通向硝酸工业",
          en: "Ammonia oxidation for nitric acid",
        },
        description: {
          zh: "与合作者发展氨催化氧化的工业路线；催化、传热和后续吸收共同决定工艺性能。",
          en: "With collaborators he developed industrial catalytic oxidation of ammonia, integrating reaction, heat management and subsequent absorption.",
        },
      },
    ],
    timeline: [
      {
        year: "1853",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1878",
        text: {
          zh: "在多尔帕特获博士学位。",
          en: "Earned his doctorate at Dorpat.",
        },
      },
      {
        year: "1887",
        text: {
          zh: "到莱比锡任教并参与创办物化期刊。",
          en: "Moved to Leipzig and co-founded a physical-chemistry journal.",
        },
      },
      {
        year: "1932",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/ostwald.jpg",
      alt: {
        zh: "奥斯特瓦尔德的肖像",
        en: "Portrait of Ostwald",
      },
      credit: {
        zh: "Nicola Perscheid，约1913 · Public domain；等比缩放与 JPEG 重编码",
        en: "Nicola Perscheid, circa 1913 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Wilhelm_Ostwald_by_Nicola_Perscheid.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1909/ostwald/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1909/ostwald/lecture/",
      },
    ],
  },
  {
    id: "nernst",
    name: {
      zh: "能斯特",
      en: "Nernst",
    },
    fullName: "Walther Nernst",
    born: 1864,
    died: 1941,
    place: {
      zh: "布里森 → 哥廷根 → 柏林",
      en: "Briesen → Göttingen → Berlin",
    },
    field: {
      zh: "电化学 · 热力学",
      en: "Electrochemistry · Thermodynamics",
    },
    hook: {
      zh: "电极电势能告诉我们怎样的平衡？",
      en: "What does electrode potential reveal about equilibrium?",
    },
    summary: {
      zh: "能斯特把电极、溶液与低温热力学联系起来。他在奥斯特瓦尔德的研究环境中成长，后来指导朗缪尔并影响路易斯等人的研究。",
      en: "Nernst connected electrodes, solutions and low-temperature thermodynamics. Work around Ostwald preceded his own teaching and influence on Langmuir, Lewis and others.",
    },
    achievements: [
      {
        year: "1889",
        title: {
          zh: "电势与反应活度",
          en: "Potential and chemical activity",
        },
        description: {
          zh: "把可逆电极电势与反应商联系；现代形式使用活度，简单浓度代替仅是近似。",
          en: "He connected reversible electrode potential with the reaction quotient; modern formulations use activities, with concentration substitution only approximate.",
        },
        formula: "E=E^\\circ-\\frac{RT}{nF}\\ln Q",
      },
      {
        year: "1891",
        title: {
          zh: "分配定律",
          en: "Distribution between phases",
        },
        description: {
          zh: "同温下，同一分子形式在两种不互溶溶剂间的分配可呈固定比；解离或缔合会改变简单关系。",
          en: "At fixed temperature, a solute in the same molecular form can have a constant distribution ratio between immiscible solvents; association or dissociation complicates it.",
        },
      },
      {
        year: "1905–1906",
        title: {
          zh: "热定理与低温极限",
          en: "The heat theorem",
        },
        description: {
          zh: "研究接近绝对零度时的熵变化，为热力学第三定律奠基；完美晶体与平衡等条件不可忽略。",
          en: "His low-temperature entropy work helped establish the third law; conditions involving equilibrium and perfect crystals remain important.",
        },
      },
    ],
    timeline: [
      {
        year: "1864",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1887",
        text: {
          zh: "在维尔茨堡获博士学位。",
          en: "Earned his doctorate at Würzburg.",
        },
      },
      {
        year: "1905",
        text: {
          zh: "到柏林主持物理化学研究。",
          en: "Moved to Berlin to lead physical-chemistry research.",
        },
      },
      {
        year: "1941",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/nernst.jpg",
      alt: {
        zh: "能斯特的肖像",
        en: "Portrait of Nernst",
      },
      credit: {
        zh: "Unknown (Mondadori Publishers)，1900s · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown (Mondadori Publishers), 1900s · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Walther_Nernst_1900s.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "University of Göttingen · Walther Nernst",
        href: "https://www.uni-goettingen.de/en/62609.html",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1920/nernst/lecture/",
      },
    ],
  },
  {
    id: "gibbs",
    name: {
      zh: "吉布斯",
      en: "Gibbs",
    },
    fullName: "Josiah Willard Gibbs",
    born: 1839,
    died: 1903,
    place: {
      zh: "纽黑文",
      en: "New Haven",
    },
    field: {
      zh: "化学热力学 · 系综",
      en: "Chemical thermodynamics · Ensembles",
    },
    hook: {
      zh: "不逐个追踪分子，也能判断平衡。",
      en: "Equilibrium can be studied without tracking every molecule.",
    },
    summary: {
      zh: "吉布斯用热力学势、组分与统计系综组织物质行为。他的工作为相图、反应平衡和现代物理化学提供了通用语言。",
      en: "Gibbs organized matter through thermodynamic potentials, components and statistical ensembles, providing a common language for phase diagrams and chemical equilibrium.",
    },
    achievements: [
      {
        year: "1876–1878",
        title: {
          zh: "化学势与多相平衡",
          en: "Chemical potential and multiphase equilibrium",
        },
        description: {
          zh: "用各组分的化学势刻画物质交换与反应趋势；平衡条件还依赖系统允许的交换和约束。",
          en: "Chemical potentials describe component exchange and reaction tendencies, with equilibrium determined by permitted exchanges and constraints.",
        },
      },
      {
        year: "1876–1878",
        title: {
          zh: "相律",
          en: "The phase rule",
        },
        description: {
          zh: "对达到平衡且无额外约束的体系，自由度由独立组分数和相数决定；反应与外场需正确计入。",
          en: "For equilibrium systems without additional constraints, independent components and phases determine degrees of freedom; reactions and fields require proper accounting.",
        },
        formula: "F=C-P+2",
      },
      {
        year: "1902",
        title: {
          zh: "统计系综",
          en: "Statistical ensembles",
        },
        description: {
          zh: "区分能量、粒子等交换条件不同的概率集合，让微观统计与宏观热力学连接。",
          en: "He distinguished probability ensembles by their exchange conditions, connecting microscopic statistics with macroscopic thermodynamics.",
        },
      },
    ],
    timeline: [
      {
        year: "1839",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1863",
        text: {
          zh: "在耶鲁获博士学位。",
          en: "Earned his doctorate at Yale.",
        },
      },
      {
        year: "1871",
        text: {
          zh: "成为耶鲁数学物理教授。",
          en: "Became professor of mathematical physics at Yale.",
        },
      },
      {
        year: "1903",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/gibbs.jpg",
      alt: {
        zh: "吉布斯的肖像",
        en: "Portrait of Gibbs",
      },
      credit: {
        zh: "摄影者不详，1903 年以前 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, before 1903 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Josiah_Willard_Gibbs_-from_MMS-.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "MacTutor · Josiah Willard Gibbs",
        href: "https://mathshistory.st-andrews.ac.uk/Biographies/Gibbs/",
      },
      {
        title: "Gibbs · Elementary Principles in Statistical Mechanics (1902)",
        href: "https://en.wikisource.org/wiki/Elementary_Principles_in_Statistical_Mechanics",
      },
    ],
  },
  {
    id: "marie-curie",
    name: {
      zh: "玛丽·居里",
      en: "Marie Curie",
    },
    fullName: "Marie Curie",
    born: 1867,
    died: 1934,
    place: {
      zh: "华沙 → 巴黎",
      en: "Warsaw → Paris",
    },
    field: {
      zh: "放射化学 · 元素分离",
      en: "Radiochemistry · Element separation",
    },
    hook: {
      zh: "看不见的辐射，也能指导化学分离。",
      en: "Invisible radiation can guide chemical separation.",
    },
    summary: {
      zh: "玛丽·居里把辐射强度作为分析线索，与皮埃尔、贝蒙和德比埃尔纳等人共同研究新元素。大量分离和测量工作使放射性成为定量研究对象。",
      en: "Marie Curie used radiation intensity as an analytical guide, working with Pierre Curie, Bémont, Debierne and others on new elements and quantitative radiochemistry.",
    },
    achievements: [
      {
        year: "1898",
        title: {
          zh: "定量研究放射性",
          en: "Quantifying radioactivity",
        },
        description: {
          zh: "以电离测量比较样品，发现某些矿物的辐射强于其已知铀含量所能解释，为寻找新成分提供依据。",
          en: "Ionization measurements revealed minerals more active than their known uranium content explained, guiding the search for additional substances.",
        },
      },
      {
        year: "1898",
        title: {
          zh: "共同发现钋和镭",
          en: "Co-discovering polonium and radium",
        },
        description: {
          zh: "与皮埃尔·居里及其他合作者通过化学分级和活度追踪提出新元素；不是单人一次分离即完成。",
          en: "Chemical fractionation and activity measurements with Pierre Curie and other collaborators established evidence for new elements.",
        },
      },
      {
        year: "1902–1910",
        title: {
          zh: "镭盐测量与金属镭分离",
          en: "Radium measurements and metal isolation",
        },
        description: {
          zh: "制备高纯镭盐、测量原子量，并与德比埃尔纳取得金属镭，连接辐射证据和化学元素证据。",
          en: "Purified salts and atomic-weight measurements, followed by metal isolation with Debierne, linked radiological evidence with chemical identity.",
        },
      },
    ],
    timeline: [
      {
        year: "1867",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1891",
        text: {
          zh: "到巴黎学习。",
          en: "Moved to Paris to study.",
        },
      },
      {
        year: "1903",
        text: {
          zh: "完成有关放射性物质的博士论文。",
          en: "Completed her doctorate on radioactive substances.",
        },
      },
      {
        year: "1934",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/marie-curie.jpg",
      alt: {
        zh: "玛丽·居里的肖像",
        en: "Portrait of Marie Curie",
      },
      credit: {
        zh: "Henri Manuel，约1920 · Public domain；等比缩放与 JPEG 重编码",
        en: "Henri Manuel, circa 1920 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Marie_Curie_c._1920s.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/lecture/",
      },
    ],
  },
  {
    id: "soddy",
    name: {
      zh: "索迪",
      en: "Soddy",
    },
    fullName: "Frederick Soddy",
    born: 1877,
    died: 1956,
    place: {
      zh: "伊斯特本 → 蒙特利尔 → 牛津",
      en: "Eastbourne → Montreal → Oxford",
    },
    field: {
      zh: "同位素 · 放射化学",
      en: "Isotopes · Radiochemistry",
    },
    hook: {
      zh: "化学上相同，质量可以不同。",
      en: "Chemical identity can persist despite different masses.",
    },
    summary: {
      zh: "索迪与卢瑟福研究放射性转变，随后提出同位素概念。元素不再能只靠原子量辨认，化学位置与核内部变化需要分开描述。",
      en: "Soddy studied radioactive transformations with Rutherford and developed the isotope concept, separating chemical identity from differences in nuclear mass.",
    },
    achievements: [
      {
        year: "1902–1903",
        title: {
          zh: "放射性转变理论",
          en: "Radioactive transformation theory",
        },
        description: {
          zh: "与卢瑟福提出放射性伴随元素转变，解释活度随时间变化和新的放射性产物。",
          en: "With Rutherford he explained radioactivity through elemental transformation and the production of new radioactive substances.",
        },
      },
      {
        year: "1913",
        title: {
          zh: "同位素概念",
          en: "The isotope concept",
        },
        description: {
          zh: "指出不同质量的原子可以占据周期表同一位置并具有极相似化学性质；现代定义依赖相同质子数。",
          en: "Atoms of different masses can occupy the same periodic position with closely similar chemistry; the modern definition uses equal proton number.",
        },
      },
      {
        year: "1913",
        title: {
          zh: "放射性位移规律",
          en: "Radioactive displacement laws",
        },
        description: {
          zh: "与法扬斯等人的独立工作一起，整理衰变类型和周期表位置变化的关系，形成核转变的分类工具。",
          en: "Alongside independent work by Fajans and others, he related decay types to changes in periodic position.",
        },
      },
    ],
    timeline: [
      {
        year: "1877",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1898",
        text: {
          zh: "毕业于牛津大学。",
          en: "Graduated from Oxford.",
        },
      },
      {
        year: "1919",
        text: {
          zh: "出任牛津大学化学教授。",
          en: "Became a chemistry professor at Oxford.",
        },
      },
      {
        year: "1956",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/soddy.jpg",
      alt: {
        zh: "索迪的肖像",
        en: "Portrait of Soddy",
      },
      credit: {
        zh: "摄影者不详，1921 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, 1921 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Frederick_Soddy.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1921/soddy/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1921/soddy/lecture/",
      },
    ],
  },
  {
    id: "haber",
    name: {
      zh: "哈伯",
      en: "Haber",
    },
    fullName: "Fritz Haber",
    born: 1868,
    died: 1934,
    place: {
      zh: "布雷斯劳 → 卡尔斯鲁厄 → 柏林",
      en: "Breslau → Karlsruhe → Berlin",
    },
    field: {
      zh: "催化 · 电化学",
      en: "Catalysis · Electrochemistry",
    },
    hook: {
      zh: "怎样把稳定的氮气变成可利用的氮？",
      en: "How can stable nitrogen become chemically usable?",
    },
    summary: {
      zh: "哈伯把热力学、实验和催化结合用于合成氨，也参与电化学研究。他在第一次世界大战中组织化学战争，科学影响同时包含严重的破坏性后果。",
      en: "Haber combined thermodynamics and catalysis in ammonia synthesis and studied electrochemistry. He also organized chemical warfare during World War I, a destructive part of his legacy.",
    },
    achievements: [
      {
        year: "1890s–1900s",
        title: {
          zh: "电极反应的控制",
          en: "Controlling electrode reactions",
        },
        description: {
          zh: "研究有机电还原中电极条件与产物的联系，说明电化学反应不仅由起始物名称决定。",
          en: "He studied how electrode conditions influence organic reduction products, linking electrochemical control with reaction pathways.",
        },
      },
      {
        year: "1909",
        title: {
          zh: "实验室合成氨",
          en: "Laboratory ammonia synthesis",
        },
        description: {
          zh: "与勒罗西尼奥尔建立氮氢催化合成氨实验；工业实现后来依靠博施及大型团队。",
          en: "With Le Rossignol he demonstrated catalytic ammonia synthesis; industrial realization required Bosch and a large engineering team.",
        },
      },
      {
        year: "1909",
        title: {
          zh: "玻璃电极与酸度测量",
          en: "Glass electrodes for acidity",
        },
        description: {
          zh: "与克莱门西维奇研究玻璃膜电势与溶液酸度的关系，为玻璃电极的发展提供基础。",
          en: "With Klemensiewicz he investigated glass-membrane potentials and acidity, contributing to the development of glass electrodes.",
        },
      },
    ],
    timeline: [
      {
        year: "1868",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1891",
        text: {
          zh: "在柏林完成博士研究。",
          en: "Completed doctoral research in Berlin.",
        },
      },
      {
        year: "1911",
        text: {
          zh: "主持柏林的物理化学与电化学研究所。",
          en: "Became director of a Berlin physical-chemistry and electrochemistry institute.",
        },
      },
      {
        year: "1934",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/haber.jpg",
      alt: {
        zh: "哈伯的肖像",
        en: "Portrait of Haber",
      },
      credit: {
        zh: "摄影者不详，between 1918 and 1934 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, between 1918 and 1934 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Portret_van_Professor_Fritz_Haber,_een_chemicus_uit_Duitsland_(foto_1918-_1934),_SFA002023057.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1918/haber/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1918/haber/lecture/",
      },
      {
        title: "University of Łódź · Haber and Klemensiewicz’s glass electrode",
        href: "https://dspace.uni.lodz.pl/handle/11089/15564",
      },
    ],
  },
  {
    id: "bosch",
    name: {
      zh: "博施",
      en: "Bosch",
    },
    fullName: "Carl Bosch",
    born: 1874,
    died: 1940,
    place: {
      zh: "科隆 → 路德维希港 → 海德堡",
      en: "Cologne → Ludwigshafen → Heidelberg",
    },
    field: {
      zh: "高压化工 · 催化工程",
      en: "High-pressure chemistry · Catalytic engineering",
    },
    hook: {
      zh: "实验成功之后，怎样连续生产？",
      en: "After a laboratory success, how can production run continuously?",
    },
    summary: {
      zh: "博施把合成氨推进到工业规模，依靠材料、反应器、净化和催化团队共同解决问题。他的贡献是系统工程，不是把实验配方简单放大。",
      en: "Bosch industrialized ammonia synthesis through teams addressing materials, reactors, purification and catalysts. His contribution was system engineering, not merely enlarging an experiment.",
    },
    achievements: [
      {
        year: "1913",
        title: {
          zh: "合成氨的工业化",
          en: "Industrial ammonia production",
        },
        description: {
          zh: "领导团队将哈伯实验发展为连续生产系统，协调循环气体、催化剂和设备可靠性。",
          en: "He led the team turning Haber’s demonstration into continuous production, coordinating gas recycling, catalysts and reliable equipment.",
        },
      },
      {
        year: "1910s",
        title: {
          zh: "高压设备与材料",
          en: "Materials for high-pressure chemistry",
        },
        description: {
          zh: "解决高温高压气体对材料的损伤，使持续反应成为可能；成果依赖冶金、设备与检测的结合。",
          en: "Addressing gas-induced damage to materials made sustained high-pressure operation possible through metallurgical and engineering collaboration.",
        },
      },
      {
        year: "1920s",
        title: {
          zh: "拓展高压合成平台",
          en: "Extending high-pressure synthesis",
        },
        description: {
          zh: "推动团队把高压催化经验用于甲醇等工业过程，形成可迁移的化工平台，而非单一反应。",
          en: "He helped extend high-pressure catalytic expertise to industrial processes including methanol, building a transferable engineering platform.",
        },
      },
    ],
    timeline: [
      {
        year: "1874",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1898",
        text: {
          zh: "在莱比锡取得博士学位。",
          en: "Earned his doctorate at Leipzig.",
        },
      },
      {
        year: "1899",
        text: {
          zh: "加入巴斯夫。",
          en: "Joined BASF.",
        },
      },
      {
        year: "1940",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/bosch.jpg",
      alt: {
        zh: "博施的肖像",
        en: "Portrait of Bosch",
      },
      credit: {
        zh: "摄影者不详；诺贝尔基金会版本，约1929 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer; Nobel Foundation reproduction, c. 1929 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Carl_Bosch.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1931/bosch/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1931/bosch/lecture/",
      },
    ],
  },
  {
    id: "lewis",
    name: {
      zh: "吉尔伯特·路易斯",
      en: "G. N. Lewis",
    },
    fullName: "Gilbert Newton Lewis",
    born: 1875,
    died: 1946,
    place: {
      zh: "韦茅斯 → 剑桥 → 伯克利",
      en: "Weymouth → Cambridge → Berkeley",
    },
    field: {
      zh: "化学键 · 热力学",
      en: "Chemical bonding · Thermodynamics",
    },
    hook: {
      zh: "一对共享电子，能连接多少化学现象？",
      en: "How much chemistry can a shared electron pair explain?",
    },
    summary: {
      zh: "路易斯把价电子、化学键、酸碱和热力学联系起来。他与兰德尔等人把抽象平衡关系变成化学家可使用的量与数据。",
      en: "Lewis connected valence electrons, bonding, acids and bases with thermodynamics. Work with Randall and others made equilibrium relations operational for chemists.",
    },
    achievements: [
      {
        year: "1916",
        title: {
          zh: "共价键的电子对",
          en: "Electron-pair bonding",
        },
        description: {
          zh: "把共价键解释为原子共享电子对，建立电子式语言；八隅体是有用模型而非无例外定律。",
          en: "He described covalent bonds as shared electron pairs; octet structures are useful models with important exceptions.",
        },
      },
      {
        year: "1923",
        title: {
          zh: "电子对酸碱观",
          en: "Electron-pair acids and bases",
        },
        description: {
          zh: "把酸碱作用扩展为电子对受体与给体之间的相互作用，超越只描述水溶液中氢离子的范围。",
          en: "Acids as electron-pair acceptors and bases as donors extended acid–base chemistry beyond aqueous hydrogen-ion descriptions.",
        },
      },
      {
        year: "1907–1923",
        title: {
          zh: "化学自由能与活度",
          en: "Chemical free energy and activity",
        },
        description: {
          zh: "发展逸度、活度和自由能的实用表达，并与兰德尔整理热力学，处理真实溶液偏离理想状态的问题。",
          en: "He developed practical free-energy, fugacity and activity treatments, including a thermodynamics synthesis with Randall for real chemical systems.",
        },
      },
    ],
    timeline: [
      {
        year: "1875",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1899",
        text: {
          zh: "在哈佛获博士学位。",
          en: "Earned his doctorate at Harvard.",
        },
      },
      {
        year: "1912",
        text: {
          zh: "到加州大学伯克利分校主持化学工作。",
          en: "Began leading chemistry at UC Berkeley.",
        },
      },
      {
        year: "1946",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/lewis.svg",
      alt: {
        zh: "吉尔伯特·路易斯的姓名字标",
        en: "G. N. Lewis name mark",
      },
      credit: {
        zh: "原创姓名字标 · 未使用人物照片 · CC0 1.0",
        en: "Original name mark; no likeness claimed · CC0 1.0",
      },
      href: "/images/chemists/lewis.svg",
      kind: "monogram",
      license: {
        label: "CC0 1.0",
        href: "https://creativecommons.org/publicdomain/zero/1.0/",
      },
    },
    sources: [
      {
        title: "Science History Institute · Gilbert Newton Lewis",
        href: "https://www.sciencehistory.org/education/scientific-biographies/gilbert-newton-lewis/",
      },
      {
        title: "UC Berkeley · Gilbert Newton Lewis, memorial",
        href: "https://chemistry.berkeley.edu/news/gilbert-newton-lewis",
      },
    ],
  },
  {
    id: "langmuir",
    name: {
      zh: "朗缪尔",
      en: "Langmuir",
    },
    fullName: "Irving Langmuir",
    born: 1881,
    died: 1957,
    place: {
      zh: "布鲁克林 → 哥廷根 → 斯克内克塔迪",
      en: "Brooklyn → Göttingen → Schenectady",
    },
    field: {
      zh: "表面化学 · 化学键",
      en: "Surface chemistry · Bonding",
    },
    hook: {
      zh: "反应发生在表面时，分子怎样排队？",
      en: "How do molecules organize at a reacting surface?",
    },
    summary: {
      zh: "朗缪尔把表面看成可定量研究的分子层，也发展电子成键观。他的工业实验室研究说明，基础模型与实际材料可以互相推动。",
      en: "Langmuir treated surfaces as quantitatively describable molecular layers and developed electronic bonding ideas. His industrial research connected fundamental models with practical materials.",
    },
    achievements: [
      {
        year: "1913",
        title: {
          zh: "气体填充灯泡研究",
          en: "Gas-filled incandescent lamps",
        },
        description: {
          zh: "研究气氛对灯丝蒸发和寿命的影响，使材料表面的物理化学知识进入电光源设计。",
          en: "He studied how surrounding gases affect filament evaporation and lifetime, applying surface physical chemistry to electric lighting.",
        },
      },
      {
        year: "1916–1918",
        title: {
          zh: "单分子层与吸附模型",
          en: "Monolayers and adsorption",
        },
        description: {
          zh: "在定温、单组分不解离吸附且吸附—脱附平衡时，均一有限位点的单层模型给出下式；还假定无显著侧向作用。",
          en: "The equation describes single-component, nondissociative adsorption at fixed temperature and adsorption–desorption equilibrium, assuming a monolayer on equivalent finite sites with negligible lateral interactions.",
        },
        formula: "\\theta=\\frac{KP}{1+KP}",
      },
      {
        year: "1919",
        title: {
          zh: "扩展电子价键观",
          en: "Developing electronic valence",
        },
        description: {
          zh: "承接路易斯的电子对思想，讨论价电子层与共价结合，推动化学键语言传播。",
          en: "Building on Lewis’s electron-pair ideas, he developed valence-shell and covalent-bond descriptions.",
        },
      },
    ],
    timeline: [
      {
        year: "1881",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1906",
        text: {
          zh: "在能斯特指导下获博士学位。",
          en: "Earned his doctorate under Nernst.",
        },
      },
      {
        year: "1909",
        text: {
          zh: "加入通用电气研究实验室。",
          en: "Joined the General Electric research laboratory.",
        },
      },
      {
        year: "1957",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/langmuir.jpg",
      alt: {
        zh: "朗缪尔的肖像",
        en: "Portrait of Langmuir",
      },
      credit: {
        zh: "摄影者不详，约1909–1920，来源记年不同 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, c. 1909–1920; sources differ · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Irving_Langmuir.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1932/langmuir/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1932/langmuir/lecture/",
      },
      {
        title: "Smithsonian · Irving Langmuir and gas-filled lamps",
        href: "https://americanhistory.si.edu/lighting/bios/langmuir.htm",
      },
    ],
  },
  {
    id: "pauling",
    name: {
      zh: "鲍林",
      en: "Pauling",
    },
    fullName: "Linus Pauling",
    born: 1901,
    died: 1994,
    place: {
      zh: "波特兰 → 帕萨迪纳",
      en: "Portland → Pasadena",
    },
    field: {
      zh: "化学键 · 分子结构",
      en: "Bonding · Molecular structure",
    },
    hook: {
      zh: "结构不仅解释物质，也能解释疾病。",
      en: "Molecular structure can explain substances and disease.",
    },
    summary: {
      zh: "鲍林将量子力学带入化学键研究，并与合作者提出蛋白质结构及分子疾病证据。他的不同阶段研究需分别评价，不能由一个声誉推及所有主张。",
      en: "Pauling applied quantum mechanics to bonds and collaborated on protein structures and molecular disease. Each claim in his varied career requires its own evidence.",
    },
    achievements: [
      {
        year: "1931–1939",
        title: {
          zh: "化学键的量子解释",
          en: "Quantum accounts of bonding",
        },
        description: {
          zh: "发展价键、杂化和共振等模型来解释结构与键强；这些是有条件的近似描述。",
          en: "Valence-bond, hybridization and resonance models explained structures and bonding, as approximations with defined limitations.",
        },
      },
      {
        year: "1949",
        title: {
          zh: "镰状细胞病的分子证据",
          en: "Evidence for a molecular disease",
        },
        description: {
          zh: "与伊塔诺、辛格、韦尔斯比较血红蛋白，表明疾病可与特定蛋白的分子差异相关。",
          en: "With Itano, Singer and Wells, he linked sickle-cell disease to molecular differences in haemoglobin.",
        },
      },
      {
        year: "1951",
        title: {
          zh: "蛋白质的α螺旋",
          en: "The protein alpha helix",
        },
        description: {
          zh: "与科里、布兰森用键几何和氢键约束提出α螺旋，说明规则的局部结构如何来自化学条件。",
          en: "With Corey and Branson, he proposed the alpha helix from bond geometry and hydrogen-bond constraints.",
        },
      },
    ],
    timeline: [
      {
        year: "1901",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1925",
        text: {
          zh: "在加州理工学院获博士学位。",
          en: "Earned his doctorate at Caltech.",
        },
      },
      {
        year: "1927",
        text: {
          zh: "加入加州理工学院教员队伍。",
          en: "Joined the Caltech faculty.",
        },
      },
      {
        year: "1994",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/pauling.jpg",
      alt: {
        zh: "鲍林的肖像",
        en: "Portrait of Pauling",
      },
      credit: {
        zh: "摄影者不详；俄勒冈州立大学档案，1940 年代 · CC BY-SA 2.0；等比缩放与 JPEG 重编码",
        en: "Unknown photographer; Oregon State University archives, 1940s · CC BY-SA 2.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Linus_Pauling_in_the_1940s.jpg",
      kind: "portrait",
      license: {
        label: "CC BY-SA 2.0",
        href: "https://creativecommons.org/licenses/by-sa/2.0",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1954/pauling/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1954/pauling/lecture/",
      },
    ],
  },
  {
    id: "irene-joliot-curie",
    name: {
      zh: "伊雷娜·约里奥–居里",
      en: "Irène Joliot-Curie",
    },
    fullName: "Irène Joliot-Curie",
    born: 1897,
    died: 1956,
    place: {
      zh: "巴黎",
      en: "Paris",
    },
    field: {
      zh: "人工放射性 · 放射化学",
      en: "Artificial radioactivity · Radiochemistry",
    },
    hook: {
      zh: "能否让稳定物质产生新的放射性？",
      en: "Can stable matter be transformed into new radioactive substances?",
    },
    summary: {
      zh: "伊雷娜在居里实验传统中成长，与弗雷德里克共同研究人工放射性。她还参与铀辐照产物研究，为核转变问题留下重要但需要谨慎解释的证据。",
      en: "Irène developed within the Curie laboratory tradition and worked with Frédéric on artificial radioactivity, later investigating uranium-irradiation products.",
    },
    achievements: [
      {
        year: "1934",
        title: {
          zh: "共同发现人工放射性",
          en: "Co-discovery of artificial radioactivity",
        },
        description: {
          zh: "与弗雷德里克发现辐照停止后仍持续的放射性，说明实验能产生会自行衰变的新核素。",
          en: "With Frédéric, she observed radioactivity persisting after irradiation stopped, showing production of new spontaneously decaying nuclides.",
        },
      },
      {
        year: "1934",
        title: {
          zh: "化学鉴定放射性产物",
          en: "Chemical identification of radioactive products",
        },
        description: {
          zh: "用化学分离追踪新放射性，区分辐射信号与产物所属元素，建立人工核素的化学证据。",
          en: "Chemical separations linked new radiation to specific products, distinguishing a signal from the chemical identity of its source.",
        },
      },
      {
        year: "1938",
        title: {
          zh: "研究铀辐照的复杂产物",
          en: "Investigating uranium-irradiation products",
        },
        description: {
          zh: "与萨维奇研究铀辐照后的化学行为，观察到接近镧的产物；后来裂变解释需要其他团队的关键工作。",
          en: "With Savitch she investigated uranium products with lanthanum-like behavior; explaining fission subsequently required crucial work by other teams.",
        },
      },
    ],
    timeline: [
      {
        year: "1897",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1925",
        text: {
          zh: "在巴黎取得博士学位。",
          en: "Earned her doctorate in Paris.",
        },
      },
      {
        year: "1937",
        text: {
          zh: "成为巴黎大学教授。",
          en: "Became a professor at the University of Paris.",
        },
      },
      {
        year: "1956",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/irene-joliot-curie.jpg",
      alt: {
        zh: "伊雷娜·约里奥–居里的肖像",
        en: "Portrait of Irène Joliot-Curie",
      },
      credit: {
        zh: "Harcourt，1935 · Public domain；等比缩放与 JPEG 重编码",
        en: "Harcourt, 1935 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Ir%C3%A8ne_Joliot-Curie_Harcourt.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1935/joliot-curie/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1935/joliot-curie/lecture/",
      },
      {
        title: "Curie and Joliot-Curie Association · Family timeline",
        href: "https://curie-joliotcurie.fr/en/about-us/joliot-curie-family-timeline/",
      },
    ],
  },
  {
    id: "hodgkin",
    name: {
      zh: "多萝西·霍奇金",
      en: "Dorothy Hodgkin",
    },
    fullName: "Dorothy Hodgkin",
    born: 1910,
    died: 1994,
    place: {
      zh: "开罗 → 剑桥 → 牛津",
      en: "Cairo → Cambridge → Oxford",
    },
    field: {
      zh: "晶体结构 · 生物化学",
      en: "Crystallography · Biochemistry",
    },
    hook: {
      zh: "用衍射图，读出药物的三维结构。",
      en: "Read a medicine’s three-dimensional structure from diffraction.",
    },
    summary: {
      zh: "霍奇金与团队用X射线和大量计算解析复杂生物分子。青霉素、维生素B12和胰岛素的工作展示了结构测定如何支持化学理解。",
      en: "Hodgkin and her teams combined X-ray diffraction with extensive calculation to determine complex biomolecular structures, including penicillin, vitamin B12 and insulin.",
    },
    achievements: [
      {
        year: "1945",
        title: {
          zh: "确定青霉素结构",
          en: "Determining penicillin’s structure",
        },
        description: {
          zh: "与团队从衍射数据确认青霉素包含β-内酰胺环，解决化学降解与结构假说之间的争论。",
          en: "Her team’s diffraction work established penicillin’s beta-lactam structure, resolving competing chemical models.",
        },
      },
      {
        year: "1954–1955",
        title: {
          zh: "解析维生素B12",
          en: "Solving vitamin B12",
        },
        description: {
          zh: "团队确定含钴的复杂环状结构，借助计算处理大量衍射信息，为后来的合成研究提供目标。",
          en: "Her team determined the complex cobalt-containing structure using extensive diffraction calculations, defining a target for later synthesis.",
        },
      },
      {
        year: "1969",
        title: {
          zh: "胰岛素的三维结构",
          en: "Insulin’s three-dimensional structure",
        },
        description: {
          zh: "经过长期合作研究确定胰岛素晶体结构，揭示多肽链在空间中的排列，而不只是氨基酸次序。",
          en: "Long-running collaborative work established insulin’s crystal structure, revealing spatial arrangement beyond its amino-acid sequence.",
        },
      },
    ],
    timeline: [
      {
        year: "1910",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1934",
        text: {
          zh: "回到牛津开展晶体学研究。",
          en: "Returned to Oxford to develop crystallographic research.",
        },
      },
      {
        year: "1937",
        text: {
          zh: "在剑桥完成博士学位。",
          en: "Completed her doctorate at Cambridge.",
        },
      },
      {
        year: "1994",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/hodgkin.jpg",
      alt: {
        zh: "多萝西·霍奇金的肖像",
        en: "Portrait of Dorothy Hodgkin",
      },
      credit: {
        zh: "布里斯托大学，原作年代未详 · CC BY-SA 2.0；等比缩放与 JPEG 重编码",
        en: "University of Bristol, original date unrecorded · CC BY-SA 2.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Professor_Dorothy_Hodgkin.jpg",
      kind: "portrait",
      license: {
        label: "CC BY-SA 2.0",
        href: "https://creativecommons.org/licenses/by-sa/2.0",
      },
    },
    sources: [
      {
        title: "Oxford Museum · Dorothy Crowfoot Hodgkin",
        href: "https://oumnh.ox.ac.uk/learn-dorothy-crowfoot-hodgkin",
      },
      {
        title: "Somerville College · Hodgkin’s structures",
        href: "https://www.some.ox.ac.uk/news/blue-plaque-unveiled-honouring-dorothy-hodgkin-1910-1994/",
      },
    ],
  },
  {
    id: "woodward",
    name: {
      zh: "伍德沃德",
      en: "Woodward",
    },
    fullName: "Robert Burns Woodward",
    born: 1917,
    died: 1979,
    place: {
      zh: "波士顿 → 剑桥",
      en: "Boston → Cambridge, Massachusetts",
    },
    field: {
      zh: "全合成 · 轨道对称性",
      en: "Total synthesis · Orbital symmetry",
    },
    hook: {
      zh: "复杂分子能否被拆成有计划的步骤？",
      en: "Can a complex molecule be built through a planned sequence?",
    },
    summary: {
      zh: "伍德沃德把结构判断、反应设计和实验控制结合在复杂分子合成中。他的代表成果由团队完成，轨道对称性研究也与霍夫曼共同发展。",
      en: "Woodward connected structural reasoning, reaction planning and experimental control in complex synthesis. His achievements depended on teams and, for orbital symmetry, collaboration with Hoffmann.",
    },
    achievements: [
      {
        year: "1954",
        title: {
          zh: "士的宁全合成",
          en: "Total synthesis of strychnine",
        },
        description: {
          zh: "领导团队实现复杂天然产物的全合成，检验对环系与立体关系的设计；不是仅混合原料即可得到目标。",
          en: "His team’s total synthesis tested detailed planning of ring systems and stereochemistry in a complex natural product.",
        },
      },
      {
        year: "1965",
        title: {
          zh: "轨道对称性规则",
          en: "Orbital-symmetry rules",
        },
        description: {
          zh: "与罗尔德·霍夫曼解释某些协同反应的允许性及立体结果；热反应与光反应的条件需区分。",
          en: "With Roald Hoffmann, he explained allowed concerted pathways and stereochemical outcomes, distinguishing thermal from photochemical conditions.",
        },
      },
      {
        year: "1972–1973",
        title: {
          zh: "维生素B12合成合作",
          en: "Collaborative vitamin B12 synthesis",
        },
        description: {
          zh: "哈佛与埃申莫瑟的苏黎世团队合作完成复杂路线，显示结构测定、方法发展和跨团队协作的结合。",
          en: "Harvard and Eschenmoser’s Zürich team completed a complex collaborative route, combining structural knowledge, new methods and coordinated experimentation.",
        },
      },
    ],
    timeline: [
      {
        year: "1917",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1937",
        text: {
          zh: "在麻省理工学院获博士学位。",
          en: "Earned his doctorate at MIT.",
        },
      },
      {
        year: "1937",
        text: {
          zh: "到哈佛开展研究。",
          en: "Began research at Harvard.",
        },
      },
      {
        year: "1979",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/woodward.jpg",
      alt: {
        zh: "伍德沃德的肖像",
        en: "Portrait of Woodward",
      },
      credit: {
        zh: "原摄影者不详；Commons 所载版本，1965 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown original photographer; Commons reproduction, 1965 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Robert_Burns_Woodward_portrait.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1965/woodward/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1965/woodward/lecture/",
      },
    ],
  },
  {
    id: "robinson",
    name: {
      zh: "罗伯特·罗宾逊",
      en: "Robinson",
    },
    fullName: "Robert Robinson",
    born: 1886,
    died: 1975,
    place: {
      zh: "拉夫森 → 曼彻斯特 → 牛津",
      en: "Rufford → Manchester → Oxford",
    },
    field: {
      zh: "天然产物 · 有机反应",
      en: "Natural products · Organic reactions",
    },
    hook: {
      zh: "自然界的合成思路，能否启发实验室？",
      en: "Can nature’s assembly strategies guide laboratory synthesis?",
    },
    summary: {
      zh: "罗宾逊研究植物色素、生物碱和成环反应，并用可能的生物合成路线指导结构判断。格特鲁德·罗宾逊及其他合作者对这些研究有重要贡献。",
      en: "Robinson investigated pigments, alkaloids and ring formation, using biogenetic reasoning to guide structures. Gertrude Robinson and other collaborators made important contributions.",
    },
    achievements: [
      {
        year: "1917",
        title: {
          zh: "托品酮合成",
          en: "Tropinone synthesis",
        },
        description: {
          zh: "以简洁的组合路线构建双环骨架，展示仿生思路如何指导合成；后人继续改进条件和收率。",
          en: "A concise assembly of a bicyclic framework illustrated biogenetic planning; later researchers improved conditions and yields.",
        },
      },
      {
        year: "1920s",
        title: {
          zh: "植物色素结构研究",
          en: "Plant-pigment structures",
        },
        description: {
          zh: "与格特鲁德等人研究花色素及相关天然产物，连接颜色、化学变化与分子结构。",
          en: "With Gertrude and others, he studied anthocyanins and related substances, linking color and chemical behavior to structure.",
        },
      },
      {
        year: "1930s",
        title: {
          zh: "罗宾逊成环反应",
          en: "Robinson annulation",
        },
        description: {
          zh: "与合作者发展通过连续成键构筑六元环的方法，成为甾体等复杂分子合成的工具。",
          en: "Collaborative work developed a sequence for constructing six-membered rings, useful in steroid and other complex-molecule syntheses.",
        },
      },
    ],
    timeline: [
      {
        year: "1886",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1910",
        text: {
          zh: "在曼彻斯特获博士学位。",
          en: "Earned his doctorate at Manchester.",
        },
      },
      {
        year: "1930",
        text: {
          zh: "到牛津任教授。",
          en: "Became a professor at Oxford.",
        },
      },
      {
        year: "1975",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/robinson.jpg",
      alt: {
        zh: "罗伯特·罗宾逊的肖像",
        en: "Portrait of Robinson",
      },
      credit: {
        zh: "摄影者不详；诺贝尔基金会版本，1947年发布 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer; Nobel Foundation reproduction, published 1947 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Robert_Robinson_organic_chemist.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1947/robinson/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1947/robinson/lecture/",
      },
    ],
  },
  {
    id: "mulliken",
    name: {
      zh: "穆利肯",
      en: "Mulliken",
    },
    fullName: "Robert Sanderson Mulliken",
    born: 1896,
    died: 1986,
    place: {
      zh: "纽伯里波特 → 芝加哥",
      en: "Newburyport → Chicago",
    },
    field: {
      zh: "分子轨道 · 量子化学",
      en: "Molecular orbitals · Quantum chemistry",
    },
    hook: {
      zh: "电子属于一条键，还是整个分子？",
      en: "Do electrons belong to a bond or to the whole molecule?",
    },
    summary: {
      zh: "穆利肯以分子轨道解释光谱和成键，与洪德等人的工作共同塑造量子化学。他也提出可操作的电负性和电子分布分析方法。",
      en: "Mulliken used molecular orbitals to connect spectra and bonding, alongside Hund and others. He also developed electronegativity and population-analysis tools.",
    },
    achievements: [
      {
        year: "1920s–1930s",
        title: {
          zh: "分子轨道理论",
          en: "Molecular-orbital theory",
        },
        description: {
          zh: "用跨越整个分子的电子轨道描述成键与光谱，为局域价键模型提供互补视角。",
          en: "Orbitals extending over a molecule described bonding and spectra, complementing localized valence-bond models.",
        },
      },
      {
        year: "1934",
        title: {
          zh: "以原子能量定义电负性",
          en: "An energy-based electronegativity",
        },
        description: {
          zh: "用电离能与电子亲和能的组合表征吸引电子的倾向；不同电负性标度并非同一个量。",
          en: "Ionization energy and electron affinity provided an energy-based measure of electron attraction; different electronegativity scales are not identical.",
        },
        formula: "\\chi\\approx(I+A)/2",
      },
      {
        year: "1955",
        title: {
          zh: "布居分析",
          en: "Population analysis",
        },
        description: {
          zh: "把计算波函数分配到原子和键上，提供解释电子分布的工具；结果依赖基组与划分方式。",
          en: "He partitioned calculated electronic populations among atoms and bonds; numerical results depend on basis sets and the partitioning convention.",
        },
      },
    ],
    timeline: [
      {
        year: "1896",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1921",
        text: {
          zh: "在芝加哥获博士学位。",
          en: "Earned his doctorate at Chicago.",
        },
      },
      {
        year: "1928",
        text: {
          zh: "加入芝加哥大学教员队伍。",
          en: "Joined the University of Chicago faculty.",
        },
      },
      {
        year: "1986",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/mulliken.jpg",
      alt: {
        zh: "穆利肯的肖像",
        en: "Portrait of Mulliken",
      },
      credit: {
        zh: "GFHund，1929 · CC BY 3.0；等比缩放与 JPEG 重编码",
        en: "GFHund, 1929 · CC BY 3.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Mulliken,Robert_1929_Chicago.jpg",
      kind: "portrait",
      license: {
        label: "CC BY 3.0",
        href: "https://creativecommons.org/licenses/by/3.0",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1966/mulliken/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1966/mulliken/lecture/",
      },
    ],
  },
  {
    id: "eyring",
    name: {
      zh: "亨利·艾林",
      en: "Henry Eyring",
    },
    fullName: "Henry Eyring",
    born: 1901,
    died: 1981,
    place: {
      zh: "科洛尼亚华雷斯 → 伯克利 → 盐湖城",
      en: "Colonia Juárez → Berkeley → Salt Lake City",
    },
    field: {
      zh: "反应速率 · 势能面",
      en: "Reaction rates · Potential-energy surfaces",
    },
    hook: {
      zh: "从反应物到产物，中间要跨过什么？",
      en: "What lies between reactants and products?",
    },
    summary: {
      zh: "艾林把量子化学与统计力学用于反应路径和速率。他与波兰尼等人研究势能面，随后发展过渡态理论；模型仍需要对动力学作近似。",
      en: "Eyring applied quantum chemistry and statistics to pathways and rates. Work with Polanyi on potential-energy surfaces preceded transition-state theory and its dynamical approximations.",
    },
    achievements: [
      {
        year: "1931",
        title: {
          zh: "反应的势能面",
          en: "Potential-energy surfaces for reactions",
        },
        description: {
          zh: "与波兰尼用原子排列与能量关系描绘反应路径，把碰撞和断成键联系到同一几何图景。",
          en: "With Polanyi, he related atomic arrangements to energy surfaces, placing collisions and bond changes in a common geometric picture.",
        },
      },
      {
        year: "1935",
        title: {
          zh: "过渡态理论",
          en: "Transition-state theory",
        },
        description: {
          zh: "把速率与活化自由能联系。下式为单分子反应的一级速率形式，ΔG‡为摩尔活化自由能；双分子速率常数另需标准浓度因子。还需考虑准平衡假设与动力学修正。",
          en: "The displayed equation is the unimolecular, first-order rate form, with molar activation free energy ΔG‡. Bimolecular rate constants require a standard-concentration factor; quasi-equilibrium assumptions and dynamical corrections also matter.",
        },
        formula: "k\\approx\\frac{k_BT}{h}e^{-\\Delta G^\\ddagger/(RT)}",
      },
      {
        year: "1950s",
        title: {
          zh: "液体的显著结构模型",
          en: "Significant-structure models of liquids",
        },
        description: {
          zh: "用类固体与类气体成分近似液体性质，是有用的历史模型而非所有液体的精确理论。",
          en: "He modeled liquid properties through solid-like and gas-like contributions, an approximate framework rather than an exact universal theory.",
        },
      },
    ],
    timeline: [
      {
        year: "1901",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1927",
        text: {
          zh: "在伯克利获博士学位。",
          en: "Earned his doctorate at Berkeley.",
        },
      },
      {
        year: "1946",
        text: {
          zh: "到犹他大学任教并主持研究生教育。",
          en: "Moved to the University of Utah.",
        },
      },
      {
        year: "1981",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/eyring.svg",
      alt: {
        zh: "亨利·艾林的姓名字标",
        en: "Henry Eyring name mark",
      },
      credit: {
        zh: "原创姓名字标 · 未使用人物照片 · CC0 1.0",
        en: "Original name mark; no likeness claimed · CC0 1.0",
      },
      href: "/images/chemists/eyring.svg",
      kind: "monogram",
      license: {
        label: "CC0 1.0",
        href: "https://creativecommons.org/publicdomain/zero/1.0/",
      },
    },
    sources: [
      {
        title: "National Academy of Sciences · Henry Eyring",
        href: "https://www.nasonline.org/wp-content/uploads/2024/06/eyring-henry.pdf",
      },
      {
        title: "Henderson · Eyring and statistical mechanics",
        href: "https://arxiv.org/abs/1001.4522",
      },
    ],
  },
  {
    id: "staudinger",
    name: {
      zh: "施陶丁格",
      en: "Staudinger",
    },
    fullName: "Hermann Staudinger",
    born: 1881,
    died: 1965,
    place: {
      zh: "沃尔姆斯 → 苏黎世 → 弗赖堡",
      en: "Worms → Zürich → Freiburg",
    },
    field: {
      zh: "高分子 · 聚合物结构",
      en: "Macromolecules · Polymer structure",
    },
    hook: {
      zh: "橡胶是小分子的团，还是一条长链？",
      en: "Is rubber an aggregate or a long covalent chain?",
    },
    summary: {
      zh: "施陶丁格坚持许多聚合物是真正的共价长链，而非小分子简单聚集。他用化学转化与溶液性质支持大分子观，为后来的材料科学奠基。",
      en: "Staudinger argued that many polymers are covalent long-chain molecules, not merely aggregates, supporting the idea through chemical transformations and solution properties.",
    },
    achievements: [
      {
        year: "1920",
        title: {
          zh: "大分子假说",
          en: "The macromolecular hypothesis",
        },
        description: {
          zh: "提出橡胶和其他聚合物可由共价键连接的大量重复单元组成，改变对高分子量物质的认识。",
          en: "He proposed covalent chains with many repeating units for rubber and other polymers, changing the interpretation of high molecular weights.",
        },
      },
      {
        year: "1920s",
        title: {
          zh: "用化学转化检验长链",
          en: "Testing long chains chemically",
        },
        description: {
          zh: "通过聚合物氢化等反应观察大分子性质仍保持，为长链结构而非单纯聚集提供证据。",
          en: "Chemical transformations such as hydrogenation preserved macromolecular behavior, providing evidence against simple aggregation models.",
        },
      },
      {
        year: "1930s",
        title: {
          zh: "黏度与分子大小",
          en: "Viscosity and molecular size",
        },
        description: {
          zh: "发展溶液黏度与分子大小的关系，后经其他研究者推广；常数依赖聚合物、溶剂和温度。",
          en: "He developed viscosity–size relationships later generalized by others; constants depend on polymer, solvent and temperature.",
        },
      },
    ],
    timeline: [
      {
        year: "1881",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1903",
        text: {
          zh: "在哈雷获博士学位。",
          en: "Earned his doctorate at Halle.",
        },
      },
      {
        year: "1926",
        text: {
          zh: "到弗赖堡任教授。",
          en: "Became a professor at Freiburg.",
        },
      },
      {
        year: "1965",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/staudinger.jpg",
      alt: {
        zh: "施陶丁格的肖像",
        en: "Portrait of Staudinger",
      },
      credit: {
        zh: "Nobel Foundation，1954 · Public domain；等比缩放与 JPEG 重编码",
        en: "Nobel Foundation, 1954 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Hermann_Staudinger.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "ACS · Foundation of Polymer Science",
        href: "https://www.acs.org/education/whatischemistry/landmarks/staudingerpolymerscience.html",
      },
      {
        title: "Science History Institute · Hermann Staudinger",
        href: "https://www.sciencehistory.org/education/scientific-biographies/hermann-staudinger/",
      },
    ],
  },
  {
    id: "ziegler",
    name: {
      zh: "齐格勒",
      en: "Ziegler",
    },
    fullName: "Karl Ziegler",
    born: 1898,
    died: 1973,
    place: {
      zh: "黑尔萨 → 海德堡 → 鲁尔河畔米尔海姆",
      en: "Helsa → Heidelberg → Mülheim",
    },
    field: {
      zh: "有机金属 · 聚合催化",
      en: "Organometallics · Polymerization",
    },
    hook: {
      zh: "温和条件下，怎样让小分子接成长链？",
      en: "How can small molecules form long chains under milder conditions?",
    },
    summary: {
      zh: "齐格勒从有机金属反应走向聚合催化，与研究团队建立新的聚乙烯路线。纳塔随后把相关催化体系推向立体规整聚合。",
      en: "Ziegler’s team moved from organometallic chemistry to new polyethylene catalysts. Natta subsequently extended related catalyst systems toward stereoregular polymers.",
    },
    achievements: [
      {
        year: "1920s–1930s",
        title: {
          zh: "有机金属反应研究",
          en: "Organometallic reactivity",
        },
        description: {
          zh: "研究有机锂等化合物的制备与反应，探索碳–金属键如何参与新的碳–碳键形成。",
          en: "He investigated organolithium and related reagents, exploring how carbon–metal bonds participate in carbon–carbon bond formation.",
        },
      },
      {
        year: "1930s",
        title: {
          zh: "大环合成方法",
          en: "Methods for large-ring synthesis",
        },
        description: {
          zh: "发展促进分子内成环、抑制分子间副反应的思路，扩大可合成环的尺寸范围。",
          en: "Strategies favoring intramolecular cyclization over intermolecular reactions expanded access to large rings.",
        },
      },
      {
        year: "1953",
        title: {
          zh: "低压乙烯聚合",
          en: "Lower-pressure ethylene polymerization",
        },
        description: {
          zh: "团队发现有机铝与过渡金属组成的催化体系，可制得较线性的聚乙烯；性能取决于具体催化剂。",
          en: "His team discovered organoaluminium–transition-metal catalyst systems yielding relatively linear polyethylene, with performance depending on catalyst composition.",
        },
      },
    ],
    timeline: [
      {
        year: "1898",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1920",
        text: {
          zh: "在马尔堡获博士学位。",
          en: "Earned his doctorate at Marburg.",
        },
      },
      {
        year: "1943",
        text: {
          zh: "主持米尔海姆煤炭研究所。",
          en: "Became director of the coal-research institute in Mülheim.",
        },
      },
      {
        year: "1973",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/ziegler.jpg",
      alt: {
        zh: "齐格勒的肖像",
        en: "Portrait of Ziegler",
      },
      credit: {
        zh: "摄影者不详；诺贝尔基金会版本，1963 年发布 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer; Nobel Foundation reproduction, published 1963 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Karl_Ziegler_Nobel.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1963/ziegler/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1963/ziegler/lecture/",
      },
    ],
  },
  {
    id: "natta",
    name: {
      zh: "纳塔",
      en: "Natta",
    },
    fullName: "Giulio Natta",
    born: 1903,
    died: 1979,
    place: {
      zh: "因佩里亚 → 米兰",
      en: "Imperia → Milan",
    },
    field: {
      zh: "立体规整聚合 · 材料",
      en: "Stereoregular polymers · Materials",
    },
    hook: {
      zh: "长链不仅要接起来，还要排得有次序。",
      en: "A polymer chain can have an organized stereochemical sequence.",
    },
    summary: {
      zh: "纳塔把晶体学与工业催化结合，研究聚合物链的空间排列。他利用并发展齐格勒的催化成果，与团队建立立体规整聚合方法。",
      en: "Natta combined crystallography and industrial catalysis to study polymer-chain arrangements, building on and extending Ziegler’s catalysts with his own team.",
    },
    achievements: [
      {
        year: "1954",
        title: {
          zh: "等规聚丙烯",
          en: "Isotactic polypropylene",
        },
        description: {
          zh: "以催化剂控制丙烯聚合中的相对构型，使侧基沿长链有规则排列，并获得新的材料性质。",
          en: "Catalyst control produced regular relative configurations along polypropylene chains, yielding new material properties.",
        },
      },
      {
        year: "1950s",
        title: {
          zh: "解析聚合物的立体结构",
          en: "Determining polymer stereostructures",
        },
        description: {
          zh: "用X射线和结构模型区分链的规整方式，联系结晶能力、链构象与宏观性能。",
          en: "X-ray analysis and structural models linked chain regularity and conformation with crystallinity and bulk properties.",
        },
      },
      {
        year: "1950s–1960s",
        title: {
          zh: "立体选择性二烯聚合",
          en: "Stereoselective diene polymerization",
        },
        description: {
          zh: "将催化控制推广到二烯体系，研究不同链结构如何影响合成橡胶；并非所有催化剂给出同一构型。",
          en: "He extended catalytic control to dienes and synthetic rubbers, where different catalysts produce different chain configurations.",
        },
      },
    ],
    timeline: [
      {
        year: "1903",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1924",
        text: {
          zh: "毕业于米兰理工大学化学工程专业。",
          en: "Graduated in chemical engineering from Milan Polytechnic.",
        },
      },
      {
        year: "1938",
        text: {
          zh: "主持米兰的工业化学研究与教学。",
          en: "Began leading industrial chemistry in Milan.",
        },
      },
      {
        year: "1979",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/natta.jpg",
      alt: {
        zh: "纳塔的肖像",
        en: "Portrait of Natta",
      },
      credit: {
        zh: "Unknown (Mondadori Publishers)，1960s · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown (Mondadori Publishers), 1960s · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Giulio_Natta_1960s.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1963/natta/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1963/natta/lecture/",
      },
    ],
  },
  {
    id: "franklin",
    name: {
      zh: "罗莎琳德·富兰克林",
      en: "Rosalind Franklin",
    },
    fullName: "Rosalind Franklin",
    born: 1920,
    died: 1958,
    place: {
      zh: "伦敦 → 巴黎 → 伦敦",
      en: "London → Paris → London",
    },
    field: {
      zh: "碳材料 · 结构生物学",
      en: "Carbon materials · Structural biology",
    },
    hook: {
      zh: "衍射证据，比一个漂亮模型更重要。",
      en: "Diffraction evidence matters more than an attractive model.",
    },
    summary: {
      zh: "富兰克林研究煤与碳的微结构、DNA和病毒。她与学生及同事共同取得的衍射数据约束了分子模型，不能把她的贡献缩成单独一张照片。",
      en: "Franklin studied carbon microstructure, DNA and viruses. Diffraction data produced with students and colleagues constrained molecular models; her work extends far beyond one photograph.",
    },
    achievements: [
      {
        year: "1940s",
        title: {
          zh: "煤与碳的微结构",
          en: "Coal and carbon microstructure",
        },
        description: {
          zh: "结合孔隙、密度和衍射研究区分不同碳材料，为理解石墨化行为提供结构依据。",
          en: "Porosity, density and diffraction studies distinguished carbon materials and explained differences in graphitization.",
        },
      },
      {
        year: "1951–1953",
        title: {
          zh: "DNA的定量衍射证据",
          en: "Quantitative diffraction evidence for DNA",
        },
        description: {
          zh: "与戈斯林研究不同水合状态的DNA，测量尺寸和对称性，为双螺旋结构提供关键约束。",
          en: "With Gosling, she studied DNA at different hydration states, measuring dimensions and symmetry that constrained the double-helix model.",
        },
      },
      {
        year: "1953–1958",
        title: {
          zh: "病毒结构研究",
          en: "Virus-structure research",
        },
        description: {
          zh: "与团队研究烟草花叶病毒等体系，连接蛋白壳、RNA和螺旋排列，推进结构病毒学。",
          en: "Her team studied tobacco mosaic virus and related systems, connecting protein shells, RNA and helical organization.",
        },
      },
    ],
    timeline: [
      {
        year: "1920",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1945",
        text: {
          zh: "以煤的研究取得剑桥博士学位。",
          en: "Earned her Cambridge doctorate through research on coal.",
        },
      },
      {
        year: "1953",
        text: {
          zh: "转入伯克贝克学院研究病毒。",
          en: "Moved to Birkbeck to study viruses.",
        },
      },
      {
        year: "1958",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/franklin.jpg",
      alt: {
        zh: "罗莎琳德·富兰克林的肖像",
        en: "Portrait of Rosalind Franklin",
      },
      credit: {
        zh: "MRC Laboratory of Molecular Biology，1955 · CC BY-SA 4.0；等比缩放与 JPEG 重编码",
        en: "MRC Laboratory of Molecular Biology, 1955 · CC BY-SA 4.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Rosalind_Franklin_(retouched).jpg",
      kind: "portrait",
      license: {
        label: "CC BY-SA 4.0",
        href: "https://creativecommons.org/licenses/by-sa/4.0",
      },
    },
    sources: [
      {
        title: "King’s College London · Rosalind Franklin",
        href: "https://www.kcl.ac.uk/people/rosalind-franklin",
      },
      {
        title: "King’s College London · Telling Franklin’s story",
        href: "https://www.kcl.ac.uk/telling-franklins-story",
      },
    ],
  },
  {
    id: "yonath",
    name: {
      zh: "阿达·约纳特",
      en: "Ada Yonath",
    },
    fullName: "Ada Yonath",
    born: 1939,
    died: 2026,
    place: {
      zh: "耶路撒冷 → 雷霍沃特 → 汉堡",
      en: "Jerusalem → Rehovot → Hamburg",
    },
    field: {
      zh: "核糖体 · 晶体学",
      en: "Ribosomes · Crystallography",
    },
    hook: {
      zh: "生命的大型机器，也能被原子级地研究。",
      en: "A large molecular machine can be studied at atomic resolution.",
    },
    summary: {
      zh: "约纳特长期推进核糖体结晶和结构测定，与许多实验室共享技术与数据问题。她及其团队的成果与施泰茨、拉马克里希南等人的工作共同改变了结构生物学。",
      en: "Yonath pursued ribosome crystallization and structure with many collaborators. Her team’s findings, alongside Steitz, Ramakrishnan and others, transformed structural biology.",
    },
    achievements: [
      {
        year: "1980s",
        title: {
          zh: "核糖体结晶",
          en: "Crystallizing ribosomes",
        },
        description: {
          zh: "寻找能形成可测晶体的稳定核糖体样品，为巨大核糖核蛋白复合物的结构分析开辟路线。",
          en: "Stable ribosome preparations and crystals opened a route to structural analysis of a large ribonucleoprotein complex.",
        },
      },
      {
        year: "1980s",
        title: {
          zh: "低温晶体测量",
          en: "Cryogenic crystallographic measurements",
        },
        description: {
          zh: "与合作者发展冷却保护等方法，减少脆弱晶体在X射线照射中的损伤。",
          en: "With collaborators, she developed low-temperature approaches to reduce radiation damage to fragile crystals.",
        },
      },
      {
        year: "2000s",
        title: {
          zh: "核糖体与抗生素结合",
          en: "Ribosomes and antibiotic binding",
        },
        description: {
          zh: "团队解析亚基及药物结合结构，解释某些抗生素如何阻碍蛋白合成；其他团队也作出关键贡献。",
          en: "Her team resolved subunit and drug-bound structures explaining how certain antibiotics inhibit protein synthesis, alongside major contributions from other groups.",
        },
      },
    ],
    timeline: [
      {
        year: "1939",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1968",
        text: {
          zh: "在魏茨曼研究所获博士学位。",
          en: "Earned her doctorate at the Weizmann Institute.",
        },
      },
      {
        year: "1970",
        text: {
          zh: "建立蛋白质晶体学实验室。",
          en: "Established a protein-crystallography laboratory.",
        },
      },
      {
        year: "2026",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/yonath.jpg",
      alt: {
        zh: "阿达·约纳特的肖像",
        en: "Portrait of Ada Yonath",
      },
      credit: {
        zh: "Science History Institute 工作人员摄影，2013-01-16 · CC BY-SA 3.0；等比缩放与 JPEG 重编码",
        en: "Science History Institute staff photographer, 2013-01-16 · CC BY-SA 3.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Ada_Yonath_2013_January_CHF.jpg",
      kind: "portrait",
      license: {
        label: "CC BY-SA 3.0",
        href: "https://creativecommons.org/licenses/by-sa/3.0",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/2009/yonath/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/2009/yonath/lecture/",
      },
      {
        title: "Weizmann Institute · In memoriam, 1939–2026",
        href: "https://www.weizmann.ac.il/president/spotlight-stories/memoriam-institute-professor-ada-yonath-1939-2026",
      },
    ],
  },
  {
    id: "arnold",
    name: {
      zh: "弗朗西丝·阿诺德",
      en: "Frances Arnold",
    },
    fullName: "Frances Arnold",
    born: 1956,
    died: null,
    place: {
      zh: "匹兹堡 → 伯克利 → 帕萨迪纳",
      en: "Pittsburgh → Berkeley → Pasadena",
    },
    field: {
      zh: "定向进化 · 生物催化",
      en: "Directed evolution · Biocatalysis",
    },
    hook: {
      zh: "不必预知所有答案，也能让酶逐轮改善。",
      en: "Enzymes can improve without predicting every structural detail.",
    },
    summary: {
      zh: "阿诺德用变异和筛选发展酶的定向进化，与团队扩展酶能催化的反应。研究目标与筛选条件决定被选择的性能，不是让进化自动找到普遍最优。",
      en: "Arnold and her team use variation and selection to evolve enzymes and expand their chemistry. Outcomes reflect the chosen screening conditions, not an automatic universal optimum.",
    },
    achievements: [
      {
        year: "1993",
        title: {
          zh: "酶的定向进化",
          en: "Directed evolution of enzymes",
        },
        description: {
          zh: "将多轮变异与性能筛选结合，获得在特定环境中更适用的酶，减少对完整机制预测的依赖。",
          en: "Iterative mutation and screening produced enzymes better suited to chosen conditions without requiring complete mechanistic prediction.",
        },
      },
      {
        year: "2013",
        title: {
          zh: "拓展酶的非天然反应",
          en: "Expanding nonnatural enzyme chemistry",
        },
        description: {
          zh: "团队改造血红素蛋白以催化卡宾（碳烯）转移等非天然反应，显示天然蛋白骨架可以被重新赋予功能。",
          en: "Her team repurposed heme proteins for nonnatural transformations including carbene transfer, expanding protein catalytic functions.",
        },
      },
      {
        year: "2016",
        title: {
          zh: "生物催化碳–硅成键",
          en: "Biocatalytic carbon–silicon bonding",
        },
        description: {
          zh: "与合作者通过进化改造酶，促进自然界罕见的碳–硅键形成；结论来自特定酶和底物体系。",
          en: "Collaborators evolved enzymes to form carbon–silicon bonds, demonstrated within specific enzyme and substrate systems.",
        },
      },
    ],
    lifeDates: {
      zh: "1956 年生",
      en: "Born 1956",
    },
    timeline: [
      {
        year: "1956",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1985",
        text: {
          zh: "在伯克利获博士学位。",
          en: "Earned her doctorate at Berkeley.",
        },
      },
      {
        year: "1986",
        text: {
          zh: "到加州理工学院工作。",
          en: "Joined Caltech.",
        },
      },
      {
        year: "1993",
        text: {
          zh: "发表酶定向进化的重要工作。",
          en: "Published landmark enzyme-directed-evolution work.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/arnold.jpg",
      alt: {
        zh: "弗朗西丝·阿诺德的肖像",
        en: "Portrait of Frances Arnold",
      },
      credit: {
        zh: "Christopher Michel，2021-11-05 · CC BY-SA 4.0；等比缩放与 JPEG 重编码",
        en: "Christopher Michel, 2021-11-05 · CC BY-SA 4.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Frances_Arnold_in_2021_at_Caltech_01_(cropped).jpg",
      kind: "portrait",
      license: {
        label: "CC BY-SA 4.0",
        href: "https://creativecommons.org/licenses/by-sa/4.0",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/2018/arnold/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/2018/arnold/lecture/",
      },
      {
        title: "Caltech · Frances Arnold, current faculty profile",
        href: "https://cce.caltech.edu/faculty/frances-h-arnold",
      },
      {
        title:
          "Coelho, Brustad, Kannan & Arnold · Engineered P450 catalysis (2013)",
        href: "https://pubmed.ncbi.nlm.nih.gov/23258409/",
      },
      {
        title: "Kan, Lewis, Chen & Arnold · Carbon–silicon bonds (2016)",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5243118/",
      },
    ],
  },
  {
    id: "tu-youyou",
    name: {
      zh: "屠呦呦",
      en: "Tu Youyou",
    },
    fullName: "Tu Youyou",
    born: 1930,
    died: null,
    place: {
      zh: "宁波 → 北京",
      en: "Ningbo → Beijing",
    },
    field: {
      zh: "天然药物 · 抗疟化学",
      en: "Natural products · Antimalarial chemistry",
    },
    hook: {
      zh: "传统线索，需要实验把有效成分找出来。",
      en: "A historical clue still needs chemical and biological testing.",
    },
    summary: {
      zh: "屠呦呦在协作研究计划中领导团队筛选抗疟物质，改进提取并研究青蒿素与衍生物。结构测定、药理和临床应用涉及多个单位，不能全部归于个人。",
      en: "Tu led a team within a collaborative antimalarial program, improving extraction and studying artemisinin derivatives. Structural, pharmacological and clinical advances involved multiple institutions.",
    },
    achievements: [
      {
        year: "1971",
        title: {
          zh: "低温提取的突破",
          en: "A breakthrough in low-temperature extraction",
        },
        description: {
          zh: "从文献线索出发改进青蒿提取，获得稳定抗疟活性的组分，再用实验验证，未直接把古方等同于现代药物。",
          en: "Historical clues prompted revised extraction and experimental validation of active fractions, rather than equating an old preparation with a modern drug.",
        },
      },
      {
        year: "1972",
        title: {
          zh: "分离青蒿素",
          en: "Isolating artemisinin",
        },
        description: {
          zh: "团队得到活性结晶物，推进化学鉴定与抗疟评价；过氧桥结构的确认由跨单位合作完成。",
          en: "Her team isolated active crystals and advanced characterization and antimalarial evaluation; elucidating the peroxide-containing structure required wider collaboration.",
        },
      },
      {
        year: "1970s",
        title: {
          zh: "研究双氢青蒿素",
          en: "Studying dihydroartemisinin",
        },
        description: {
          zh: "研究青蒿素的化学转化及衍生物活性，建立后续药物发展的重要基础。",
          en: "Chemical transformation and derivative testing, including dihydroartemisinin, supplied an important basis for subsequent drug development.",
        },
      },
    ],
    lifeDates: {
      zh: "1930 年生",
      en: "Born 1930",
    },
    timeline: [
      {
        year: "1930",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1955",
        text: {
          zh: "毕业于北京医学院药学专业。",
          en: "Graduated in pharmacy from Beijing Medical College.",
        },
      },
      {
        year: "1969",
        text: {
          zh: "承担抗疟研究任务并组织团队。",
          en: "Began leading an antimalarial research team.",
        },
      },
      {
        year: "1972",
        text: {
          zh: "团队得到青蒿素结晶样品。",
          en: "Her team obtained crystalline artemisinin.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/tu-youyou.jpg",
      alt: {
        zh: "屠呦呦的肖像",
        en: "Portrait of Tu Youyou",
      },
      credit: {
        zh: "Bengt Nyman，2015-12-06 · CC BY-SA 4.0；等比缩放与 JPEG 重编码",
        en: "Bengt Nyman, 2015-12-06 · CC BY-SA 4.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Tu_Youyou_5056-2015.jpg",
      kind: "portrait",
      license: {
        label: "CC BY-SA 4.0",
        href: "https://creativecommons.org/licenses/by-sa/4.0",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/medicine/2015/tu/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/medicine/2015/tu/lecture/",
      },
    ],
  },
  {
    id: "hou-debang",
    name: {
      zh: "侯德榜",
      en: "Hou Debang",
    },
    fullName: "Hou Debang",
    born: 1890,
    died: 1974,
    place: {
      zh: "福州 → 纽约 → 天津",
      en: "Fuzhou → New York → Tianjin",
    },
    field: {
      zh: "制碱 · 化学工程",
      en: "Soda manufacture · Chemical engineering",
    },
    hook: {
      zh: "把一种产品的余料，变成另一种产品的原料。",
      en: "Turn one production stream into another useful product.",
    },
    summary: {
      zh: "侯德榜把化学原理、设备和生产组织结合，推进中国制碱与化肥工业。其方法是团队工程成果，价值在于流程协同和原料利用。",
      en: "Hou integrated chemistry, equipment and plant organization in soda and fertilizer production. His team-based engineering emphasized linked processes and efficient raw-material use.",
    },
    achievements: [
      {
        year: "1920s–1932",
        title: {
          zh: "改进并公开制碱技术",
          en: "Developing and publishing soda technology",
        },
        description: {
          zh: "推进氨碱法的生产实践，并把原理和工艺整理出版，使长期受商业保密限制的知识可供学习。",
          en: "He developed practical ammonia-soda production and published its principles and processes, widening access to industrial knowledge.",
        },
      },
      {
        year: "1943",
        title: {
          zh: "联合制碱",
          en: "Combined soda production",
        },
        description: {
          zh: "把纯碱与氯化铵生产联结，提高原料利用；工业实现还要处理结晶、分离和装置运行。",
          en: "Linking soda ash and ammonium chloride production improved material use, with crystallization, separation and plant operations central to implementation.",
        },
      },
      {
        year: "1950s–1960s",
        title: {
          zh: "适配小型化肥流程",
          en: "Adapting fertilizer processes",
        },
        description: {
          zh: "推动碳酸氢铵等化肥工艺发展，使合成氨与后续利用协同，适应当时的资源和生产条件。",
          en: "He helped develop ammonium-bicarbonate fertilizer processes integrating ammonia production with downstream use under local resource constraints.",
        },
      },
    ],
    timeline: [
      {
        year: "1890",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1921",
        text: {
          zh: "在哥伦比亚大学获博士学位。",
          en: "Earned his doctorate at Columbia University.",
        },
      },
      {
        year: "1921",
        text: {
          zh: "回国参与永利碱业建设。",
          en: "Returned to China to develop the Yongli alkali industry.",
        },
      },
      {
        year: "1974",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/hou-debang.jpg",
      alt: {
        zh: "侯德榜的肖像",
        en: "Portrait of Hou Debang",
      },
      credit: {
        zh: "摄影者不详，1930年代 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, 1930s · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:%E4%BE%AF%E5%BE%B7%E6%A6%9C%E9%99%A2%E5%A3%AB.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "Chinese Academy of Sciences · Hou Debang",
        href: "https://casad.cas.cn/ysxx2022/ygys/200906/t20090624_1810088.html",
      },
      {
        title:
          "Chinese Academy of Sciences · Hou family and chemical engineering",
        href: "https://kxrsbn.casad.cas.cn/2022/ysgh/202205/t20220526_4952274.html",
      },
    ],
  },
  {
    id: "huang-minglong",
    name: {
      zh: "黄鸣龙",
      en: "Huang Minlon",
    },
    fullName: "Huang Minlon",
    born: 1898,
    died: 1979,
    place: {
      zh: "扬州 → 柏林 → 上海",
      en: "Yangzhou → Berlin → Shanghai",
    },
    field: {
      zh: "有机还原 · 甾体化学",
      en: "Organic reduction · Steroid chemistry",
    },
    hook: {
      zh: "调整反应细节，可能打开整条合成路线。",
      en: "A change in reaction design can unlock a synthetic route.",
    },
    summary: {
      zh: "黄鸣龙研究天然产物立体化学、羰基还原与甾体药物。黄鸣龙还原法因实用改进而广泛采用，他在中国的甾体研究同样依赖团队合作。",
      en: "Huang investigated natural-product stereochemistry, carbonyl reduction and steroid synthesis. His practical reduction modification and collaborative steroid research had lasting influence.",
    },
    achievements: [
      {
        year: "1940s",
        title: {
          zh: "山道年类物质的立体化学",
          en: "Stereochemistry of santonin-related compounds",
        },
        description: {
          zh: "研究不同构型及其相互转化，用化学证据解释天然产物的空间结构。",
          en: "He studied configurations and interconversions of santonin-related compounds, using chemical evidence to investigate spatial structure.",
        },
      },
      {
        year: "1946",
        title: {
          zh: "改良Wolff–Kishner还原",
          en: "A practical Wolff–Kishner modification",
        },
        description: {
          zh: "改进把羰基转为亚甲基的反应方法，使某些底物更易处理；并非所有官能团都耐受相应条件。",
          en: "He improved carbonyl-to-methylene reduction for practical synthesis, subject to substrate and functional-group compatibility.",
        },
      },
      {
        year: "1960s",
        title: {
          zh: "甾体药物合成",
          en: "Steroid-drug synthesis",
        },
        description: {
          zh: "领导合作者研究可的松、地塞米松等路线，包括醋酸可的松的七步合成，推动甾体化学工业。",
          en: "He led collaborative routes to steroids including cortisone acetate and dexamethasone, helping develop steroid manufacturing.",
        },
      },
    ],
    timeline: [
      {
        year: "1898",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1924",
        text: {
          zh: "在柏林获博士学位。",
          en: "Earned his doctorate in Berlin.",
        },
      },
      {
        year: "1952",
        text: {
          zh: "进入上海有机化学研究所工作。",
          en: "Joined the Shanghai Institute of Organic Chemistry.",
        },
      },
      {
        year: "1979",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/huang-minglong.jpg",
      alt: {
        zh: "黄鸣龙的肖像",
        en: "Portrait of Huang Minlon",
      },
      credit: {
        zh: "摄影者不详，1945年以前 · Public domain；等比缩放与 JPEG 重编码",
        en: "Unknown photographer, before 1945 · Public domain; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:%E9%9D%92%E5%B9%B4%E9%BB%84%E9%B8%A3%E9%BE%99.jpg",
      kind: "portrait",
      license: {
        label: "Public domain",
        href: "https://creativecommons.org/publicdomain/mark/1.0/",
      },
    },
    sources: [
      {
        title: "SIOC, CAS · Huang Minlon",
        href: "https://sioc.cas.cn/kxj/ml/hml/",
      },
      {
        title: "SIOC, CAS · Research and contributions",
        href: "https://www.sioc.cas.cn/kxj/ml/hml/202308/t20230804_6854913.html",
      },
    ],
  },
  {
    id: "zewail",
    name: {
      zh: "艾哈迈德·泽维尔",
      en: "Ahmed Zewail",
    },
    fullName: "Ahmed Zewail",
    born: 1946,
    died: 2016,
    place: {
      zh: "达曼胡尔 → 费城 → 帕萨迪纳",
      en: "Damanhur → Philadelphia → Pasadena",
    },
    field: {
      zh: "飞秒化学 · 超快成像",
      en: "Femtochemistry · Ultrafast imaging",
    },
    hook: {
      zh: "反应不只看起点终点，还能追踪时间。",
      en: "A reaction has a timeline, not only starting and ending structures.",
    },
    summary: {
      zh: "泽维尔与团队用超短光脉冲研究分子运动，后来发展超快电子成像。时间分辨测量揭示反应动力学，但观察信号仍需模型和多种证据解释。",
      en: "Zewail’s teams used ultrashort pulses to study molecular motion and developed ultrafast electron imaging. Time-resolved signals still require models and complementary evidence.",
    },
    achievements: [
      {
        year: "1980s",
        title: {
          zh: "飞秒泵浦–探测方法",
          en: "Femtosecond pump–probe methods",
        },
        description: {
          zh: "用一束脉冲启动过程、另一束读取变化，研究化学键重排的时间尺度；信号不是直接拍到单个原子的普通照片。",
          en: "Pump–probe measurements tracked bond-rearrangement timescales; the resulting signals are not ordinary photographs of individual atoms.",
        },
      },
      {
        year: "1980s–1990s",
        title: {
          zh: "追踪过渡区域的动力学",
          en: "Following transition-region dynamics",
        },
        description: {
          zh: "研究碘化钠解离等体系中的波包运动，测量停留、返回与能量转移，检验反应路径模型。",
          en: "Studies such as sodium-iodide dissociation followed wavepacket motion, returns and energy transfer to test reaction-path models.",
        },
      },
      {
        year: "2000s",
        title: {
          zh: "四维电子显微方法",
          en: "Four-dimensional electron imaging",
        },
        description: {
          zh: "团队结合电子成像的空间分辨和超快时间分辨，研究材料及生物体系的结构变化。",
          en: "His teams combined spatial electron imaging with ultrafast timing to investigate structural changes in materials and biological systems.",
        },
      },
    ],
    timeline: [
      {
        year: "1946",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1974",
        text: {
          zh: "在宾夕法尼亚大学获博士学位。",
          en: "Earned his doctorate at the University of Pennsylvania.",
        },
      },
      {
        year: "1976",
        text: {
          zh: "加入加州理工学院。",
          en: "Joined Caltech.",
        },
      },
      {
        year: "2016",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/zewail.jpg",
      alt: {
        zh: "艾哈迈德·泽维尔的肖像",
        en: "Portrait of Ahmed Zewail",
      },
      credit: {
        zh: "Douglas A. Lockard，14 May 2009 · CC BY-SA 3.0；等比缩放与 JPEG 重编码",
        en: "Douglas A. Lockard, 14 May 2009 · CC BY-SA 3.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Ahmed_Zewail_HD2009_Othmer_Gold_Medal_portrait.JPG",
      kind: "portrait",
      license: {
        label: "CC BY-SA 3.0",
        href: "https://creativecommons.org/licenses/by-sa/3.0",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1999/zewail/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1999/zewail/lecture/",
      },
      {
        title: "Caltech · Ahmed Zewail, 1946–2016",
        href: "https://www.caltech.edu/about/news/ahmed-zewail-1946-2016-51594",
      },
    ],
  },
  {
    id: "kohn",
    name: {
      zh: "沃尔特·科恩",
      en: "Walter Kohn",
    },
    fullName: "Walter Kohn",
    born: 1923,
    died: 2016,
    place: {
      zh: "维也纳 → 多伦多 → 圣巴巴拉",
      en: "Vienna → Toronto → Santa Barbara",
    },
    field: {
      zh: "密度泛函 · 电子结构",
      en: "Density functionals · Electronic structure",
    },
    hook: {
      zh: "能否用电子密度，替代庞大的波函数？",
      en: "Can electron density replace a vast many-electron wavefunction?",
    },
    summary: {
      zh: "科恩与霍恩伯格、沈吕九等人建立密度泛函的重要基础，使分子与材料计算获得可行路径。实际计算仍依赖交换关联近似，而不是自动精确。",
      en: "Kohn, Hohenberg, Sham and others established foundations of density-functional methods. Practical calculations depend on exchange-correlation approximations rather than being automatically exact.",
    },
    achievements: [
      {
        year: "1964",
        title: {
          zh: "霍恩伯格–科恩理论",
          en: "Hohenberg–Kohn theory",
        },
        description: {
          zh: "在相应基态条件下把电子密度与外势、能量联系，给密度作为基本变量提供理论基础。",
          en: "Ground-state results related density, external potential and energy, establishing density as a fundamental variable under the theorem’s conditions.",
        },
      },
      {
        year: "1965",
        title: {
          zh: "科恩–沈方程",
          en: "Kohn–Sham equations",
        },
        description: {
          zh: "与沈吕九以辅助非相互作用体系计算密度，把未知多体效应集中到交换关联项。",
          en: "With Sham, he introduced an auxiliary noninteracting system, concentrating unknown many-body effects in exchange-correlation terms.",
        },
      },
      {
        year: "1990s–2000s",
        title: {
          zh: "电子物质的近视性",
          en: "Nearsightedness of electronic matter",
        },
        description: {
          zh: "研究局部电子性质对远处扰动的有限敏感性，为大体系近似计算提供思路；衰减方式依体系而异。",
          en: "He studied limited sensitivity of local electronic properties to distant changes, supporting large-system approximations with system-dependent decay behavior.",
        },
      },
    ],
    timeline: [
      {
        year: "1923",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1948",
        text: {
          zh: "在哈佛获博士学位。",
          en: "Earned his doctorate at Harvard.",
        },
      },
      {
        year: "1979",
        text: {
          zh: "到圣巴巴拉建立理论物理研究机构。",
          en: "Moved to Santa Barbara to establish a theoretical-physics institute.",
        },
      },
      {
        year: "2016",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/kohn.jpg",
      alt: {
        zh: "沃尔特·科恩的肖像",
        en: "Portrait of Walter Kohn",
      },
      credit: {
        zh: "Markus Pössel (User name: Mapos)，2012-07-03 · CC BY-SA 3.0；等比缩放与 JPEG 重编码",
        en: "Markus Pössel (User name: Mapos), 2012-07-03 · CC BY-SA 3.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Walter_Kohn.jpg",
      kind: "portrait",
      license: {
        label: "CC BY-SA 3.0",
        href: "https://creativecommons.org/licenses/by-sa/3.0",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/1998/kohn/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/1998/kohn/lecture/",
      },
      {
        title: "UCSB · In memoriam Walter Kohn",
        href: "https://news.ucsb.edu/2016/016736/memoriam-walter-kohn",
      },
    ],
  },
  {
    id: "karplus",
    name: {
      zh: "马丁·卡普拉斯",
      en: "Martin Karplus",
    },
    fullName: "Martin Karplus",
    born: 1930,
    died: 2024,
    place: {
      zh: "维也纳 → 帕萨迪纳 → 剑桥",
      en: "Vienna → Pasadena → Cambridge, Massachusetts",
    },
    field: {
      zh: "分子模拟 · 量子化学",
      en: "Molecular simulation · Quantum chemistry",
    },
    hook: {
      zh: "分子结构不是静止的，还要理解它怎样动。",
      en: "Molecular structure matters together with molecular motion.",
    },
    summary: {
      zh: "卡普拉斯把光谱、量子计算和分子动力学相连，与合作者研究生物分子的运动。模拟的预测力依赖力场、边界和采样，必须与实验互相检验。",
      en: "Karplus connected spectroscopy, quantum calculations and molecular dynamics in collaborative biomolecular research. Force fields, boundaries and sampling require testing against experiment.",
    },
    achievements: [
      {
        year: "1959",
        title: {
          zh: "卡普拉斯关系",
          en: "The Karplus relationship",
        },
        description: {
          zh: "把核磁共振耦合与键的二面角联系，帮助推断构象；参数随化学环境和所用关系式变化。",
          en: "He related NMR coupling to dihedral angles, aiding conformational inference with environment-dependent parameters.",
        },
      },
      {
        year: "1970s",
        title: {
          zh: "结合量子与经典模型",
          en: "Combining quantum and classical models",
        },
        description: {
          zh: "与瓦谢尔等人研究把不同层次模型结合的方法，使复杂分子的电子变化与环境效应能同时近似处理。",
          en: "Work with Warshel and others combined modeling levels to approximate electronic changes together with a complex molecular environment.",
        },
      },
      {
        year: "1977",
        title: {
          zh: "蛋白质分子动力学",
          en: "Protein molecular dynamics",
        },
        description: {
          zh: "与麦卡蒙、盖林等模拟蛋白质的时间演化，展示结构波动与功能研究之间的联系。",
          en: "With McCammon, Gelin and others, he simulated protein dynamics, connecting structural fluctuations with questions of function.",
        },
      },
    ],
    timeline: [
      {
        year: "1930",
        text: {
          zh: "出生。",
          en: "Born.",
        },
      },
      {
        year: "1953",
        text: {
          zh: "在鲍林指导下获加州理工博士学位。",
          en: "Earned his Caltech doctorate under Pauling.",
        },
      },
      {
        year: "1965",
        text: {
          zh: "加入哈佛大学。",
          en: "Joined Harvard University.",
        },
      },
      {
        year: "2024",
        text: {
          zh: "逝世。",
          en: "Died.",
        },
      },
    ],
    portrait: {
      src: "/images/chemists/karplus.jpg",
      alt: {
        zh: "马丁·卡普拉斯的肖像",
        en: "Portrait of Martin Karplus",
      },
      credit: {
        zh: "Bengt Nyman，2013-12-07 · CC BY 2.0；等比缩放与 JPEG 重编码",
        en: "Bengt Nyman, 2013-12-07 · CC BY 2.0; resized and JPEG re-encoded",
      },
      href: "https://commons.wikimedia.org/wiki/File:Martin_Karplus_Nobel_Prize_22_2013.jpg",
      kind: "portrait",
      license: {
        label: "CC BY 2.0",
        href: "https://creativecommons.org/licenses/by/2.0",
      },
    },
    sources: [
      {
        title: "Nobel Prize · Biographical",
        href: "https://www.nobelprize.org/prizes/chemistry/2013/karplus/biographical/",
      },
      {
        title: "Nobel Prize · Research lecture",
        href: "https://www.nobelprize.org/prizes/chemistry/2013/karplus/lecture/",
      },
      {
        title: "Harvard · Martin Karplus memorial",
        href: "https://news.harvard.edu/gazette/story/2025/01/martin-karplus-pioneering-figure-in-theoretical-chemistry-dies-at-94/",
      },
    ],
  },
];

export const chemistRelations: ScholarRelation[] = [
  {
    id: "boyle-lavoisier",
    source: "boyle",
    target: "lavoisier",
    kind: "influence",
    label: {
      zh: "重审元素概念",
      en: "Reconsidering elements",
    },
    description: {
      zh: "拉瓦锡的新化学接续对传统元素学说的批评，再以分析和称量重写元素概念；不是私人师承。",
      en: "Lavoisier developed earlier criticism of elemental doctrines into an analytical chemical program, not through personal mentorship.",
    },
    sourceUrl:
      "https://www.acs.org/education/whatischemistry/landmarks/lavoisier.html",
  },
  {
    id: "priestley-lavoisier",
    source: "priestley",
    target: "lavoisier",
    kind: "influence",
    label: {
      zh: "1774年的实验交流",
      en: "Experimental exchange in 1774",
    },
    description: {
      zh: "普利斯特里在巴黎介绍气体实验，拉瓦锡重复并重新解释结果。发现、交流和理论解释分别归功。",
      en: "Priestley described his gas experiments in Paris; Lavoisier repeated and reinterpreted them. Discovery and interpretation receive distinct credit.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/antoine-laurent-lavoisier/",
  },
  {
    id: "scheele-priestley",
    source: "scheele",
    target: "priestley",
    kind: "parallel",
    label: {
      zh: "独立取得氧",
      en: "Independent oxygen investigations",
    },
    description: {
      zh: "两人独立取得后来称为氧的气体，实验与发表时间不同；这不是合作或导师关系。",
      en: "They independently obtained oxygen, with different experimental and publication dates; this edge does not assert collaboration.",
    },
    sourceUrl:
      "https://www.lindahall.org/about/news/scientist-of-the-day/carl-wilhelm-scheele/",
  },
  {
    id: "scheele-davy",
    source: "scheele",
    target: "davy",
    kind: "influence",
    label: {
      zh: "从气体到元素氯",
      en: "Recognizing chlorine as an element",
    },
    description: {
      zh: "舍勒分离氯却误判其组成；戴维后来证明它不含所假定的氧并确认元素性质。",
      en: "Scheele isolated chlorine but misinterpreted it; Davy later established its elemental nature.",
    },
    sourceUrl: "https://periodic-table.rsc.org/element/17/",
  },
  {
    id: "lavoisier-dalton",
    source: "lavoisier",
    target: "dalton",
    kind: "influence",
    label: {
      zh: "定量元素观进入原子论",
      en: "Quantitative elements and atomism",
    },
    description: {
      zh: "道尔顿以拉瓦锡之后的元素和组成分析为出发点，将比例关系解释为原子组合。",
      en: "Dalton used chemical elements and compositional measurements as a basis for quantitative atomic combinations.",
    },
    sourceUrl:
      "https://pubsapp.acs.org/subscribe/archive/tcaw/12/i11/pdf/1103chemchron.pdf",
  },
  {
    id: "proust-dalton",
    source: "proust",
    target: "dalton",
    kind: "influence",
    label: {
      zh: "定比关系与原子解释",
      en: "Definite proportions and atoms",
    },
    description: {
      zh: "定比实验提供需要解释的事实，道尔顿的原子组合给出数量框架；不是普鲁斯特的博士指导。",
      en: "Definite proportions supplied empirical constraints that Dalton’s atomic theory could explain; this was not doctoral mentorship.",
    },
    sourceUrl:
      "https://www.lindahall.org/about/news/scientist-of-the-day/joseph-proust/",
  },
  {
    id: "gay-lussac-avogadro",
    source: "gay-lussac",
    target: "avogadro",
    kind: "influence",
    label: {
      zh: "体积规律提出新问题",
      en: "Combining volumes pose a problem",
    },
    description: {
      zh: "阿伏伽德罗1811年论文直接从盖–吕萨克的结合体积规律出发，提出分子数假说。",
      en: "Avogadro’s 1811 memoir explicitly began with Gay-Lussac’s combining volumes and proposed a molecular-number hypothesis.",
    },
    sourceUrl: "https://web.lemoyne.edu/~giunta/avogadro.html",
  },
  {
    id: "dalton-avogadro",
    source: "dalton",
    target: "avogadro",
    kind: "influence",
    label: {
      zh: "区分原子与分子",
      en: "Distinguishing atoms and molecules",
    },
    description: {
      zh: "阿伏伽德罗讨论道尔顿假说的困难，允许元素分子包含多个原子，修正对气体组合的理解。",
      en: "Avogadro addressed difficulties in Dalton’s treatment by allowing elemental molecules to contain multiple atoms.",
    },
    sourceUrl: "https://web.lemoyne.edu/~giunta/avogadro.html",
  },
  {
    id: "avogadro-cannizzaro",
    source: "avogadro",
    target: "cannizzaro",
    kind: "influence",
    label: {
      zh: "重新阐明分子假说",
      en: "Reviving the molecular hypothesis",
    },
    description: {
      zh: "康尼查罗利用阿伏伽德罗假说协调气体分子量与原子量，影响化学式的统一。",
      en: "Cannizzaro used Avogadro’s hypothesis to reconcile molecular and atomic weights.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/stanislao-cannizzaro/",
  },
  {
    id: "cannizzaro-mendeleev",
    source: "cannizzaro",
    target: "mendeleev",
    kind: "influence",
    label: {
      zh: "卡尔斯鲁厄会议的影响",
      en: "Influence of the Karlsruhe congress",
    },
    description: {
      zh: "门捷列夫参加会议后吸收原子量体系的新理解，为周期分类提供较一致的数据。",
      en: "The Karlsruhe discussions helped Mendeleev work with a more consistent atomic-weight system.",
    },
    sourceUrl:
      "https://inchemistry.acs.org/atomic-news/assembling-the-periodic-table.html",
  },
  {
    id: "cannizzaro-lothar-meyer",
    source: "cannizzaro",
    target: "lothar-meyer",
    kind: "influence",
    label: {
      zh: "原子量体系的澄清",
      en: "Clarifying atomic weights",
    },
    description: {
      zh: "迈耶研读康尼查罗的论述后重新理解原子量，随后组织价态与周期关系。",
      en: "Meyer’s reading of Cannizzaro clarified atomic weights before his work on valence and periodicity.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/stanislao-cannizzaro/",
  },
  {
    id: "mendeleev-lothar-meyer",
    source: "mendeleev",
    target: "lothar-meyer",
    kind: "parallel",
    label: {
      zh: "分别发展周期分类",
      en: "Independent periodic classifications",
    },
    description: {
      zh: "两人以不同表现形式建立周期关系，门捷列夫强调空位预测，迈耶突出物性曲线。",
      en: "Their periodic classifications took different forms, emphasizing predictions of gaps and physical-property curves respectively.",
    },
    sourceUrl:
      "https://www.oc2.chemie.uni-tuebingen.de/history/lothar_meyer/lothar_meyer.htm",
  },
  {
    id: "berzelius-wohler",
    source: "berzelius",
    target: "wohler",
    kind: "mentorship",
    label: {
      zh: "斯德哥尔摩实验指导",
      en: "Laboratory teaching in Stockholm",
    },
    description: {
      zh: "维勒在1820年代赴贝采里乌斯实验室学习，此后保持通信；这里记录实际训练。",
      en: "Wöhler trained in Berzelius’s laboratory in the 1820s and continued corresponding with him.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/justus-von-liebig-and-friedrich-wohler/",
  },
  {
    id: "wohler-liebig",
    source: "wohler",
    target: "liebig",
    kind: "influence",
    label: {
      zh: "苯甲酰系列合作",
      en: "Collaboration on benzoyl chemistry",
    },
    description: {
      zh: "两人从早期分析分歧发展为合作，在苯甲酰研究中共同追踪反应保留的原子团。",
      en: "An early analytical disagreement developed into collaboration tracking a retained group through benzoyl reactions.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/justus-von-liebig-and-friedrich-wohler/",
    direction: "both",
  },
  {
    id: "liebig-kekule",
    source: "liebig",
    target: "kekule",
    kind: "mentorship",
    label: {
      zh: "吉森博士阶段",
      en: "Doctoral study at Giessen",
    },
    description: {
      zh: "凯库勒在李比希的吉森研究环境中完成博士训练；结构理论后来还受多位化学家影响。",
      en: "Kekulé completed doctoral training in Liebig’s Giessen environment, before further influences on his structural ideas.",
    },
    sourceUrl: "https://pubs.rsc.org/en/content/articlehtml/2015/cs/c5cs90085a",
  },
  {
    id: "bunsen-lothar-meyer",
    source: "bunsen",
    target: "lothar-meyer",
    kind: "mentorship",
    label: {
      zh: "海德堡化学训练",
      en: "Chemical training at Heidelberg",
    },
    description: {
      zh: "迈耶在海德堡向本生学习化学，连接医学训练与后来的物理化学研究。",
      en: "Meyer studied chemistry with Bunsen at Heidelberg, extending his earlier medical training.",
    },
    sourceUrl:
      "https://www.oc2.chemie.uni-tuebingen.de/history/lothar_meyer/lothar_meyer.htm",
  },
  {
    id: "kekule-van-t-hoff",
    source: "kekule",
    target: "van-t-hoff",
    kind: "mentorship",
    label: {
      zh: "波恩学习经历",
      en: "Study in Bonn",
    },
    description: {
      zh: "范特霍夫曾在波恩跟随凯库勒学习有机化学；四面体碳观点是随后独立提出的。",
      en: "Van ’t Hoff studied organic chemistry with Kekulé in Bonn before proposing his own stereochemical ideas.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1901/hoff/biographical/",
  },
  {
    id: "pasteur-van-t-hoff",
    source: "pasteur",
    target: "van-t-hoff",
    kind: "influence",
    label: {
      zh: "旋光问题推动空间模型",
      en: "Optical activity motivates spatial models",
    },
    description: {
      zh: "巴斯德的分子不对称研究提出待解释的问题，范特霍夫用四面体排列给出结构框架。",
      en: "Pasteur’s molecular asymmetry posed a problem that van ’t Hoff addressed through tetrahedral arrangements.",
    },
    sourceUrl: "https://doi.org/10.1039/C1NJ20216B",
  },
  {
    id: "pasteur-le-bel",
    source: "pasteur",
    target: "le-bel",
    kind: "influence",
    label: {
      zh: "从分子不对称到不对称碳",
      en: "From molecular asymmetry to carbon",
    },
    description: {
      zh: "勒贝尔将巴斯德之后的旋光问题联系到碳周围不同基团的空间分布；并非博士师承。",
      en: "Le Bel connected optical activity with spatial arrangements around carbon, developing the problem beyond Pasteur’s work.",
    },
    sourceUrl:
      "https://comptes-rendus.academie-sciences.fr/chimie/articles/10.1016/j.crci.2016.01.003/",
  },
  {
    id: "van-t-hoff-le-bel",
    source: "van-t-hoff",
    target: "le-bel",
    kind: "parallel",
    label: {
      zh: "1874年独立的立体观",
      en: "Independent stereochemical proposals",
    },
    description: {
      zh: "两人在1874年分别提出分子空间不对称的解释。彼此独立不等于完全相同的论证。",
      en: "Both proposed spatial explanations of molecular asymmetry in 1874, independently and with differing arguments.",
    },
    sourceUrl:
      "https://comptes-rendus.academie-sciences.fr/chimie/articles/10.1016/j.crci.2016.01.003/",
  },
  {
    id: "van-t-hoff-arrhenius",
    source: "van-t-hoff",
    target: "arrhenius",
    kind: "influence",
    label: {
      zh: "渗透压与离子解离",
      en: "Osmotic pressure and ionic dissociation",
    },
    description: {
      zh: "电解质的异常渗透压可由解离产生更多粒子解释，连接两人的理论问题。",
      en: "Electrolyte osmotic-pressure anomalies could be explained through additional particles from dissociation.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/themes/the-nobel-prize-in-chemistry-the-development-of-modern-chemistry/",
  },
  {
    id: "ostwald-arrhenius",
    source: "ostwald",
    target: "arrhenius",
    kind: "support",
    label: {
      zh: "支持早期解离理论",
      en: "Supporting dissociation theory",
    },
    description: {
      zh: "奥斯特瓦尔德肯定阿伦尼乌斯的早期研究并促成交流，支持并不等于论文导师身份。",
      en: "Ostwald supported Arrhenius’s early work and helped establish exchanges, without being his doctoral advisor.",
    },
    sourceUrl:
      "https://www.uu.se/en/about-uu/history/prominent-people/svante-arrhenius",
  },
  {
    id: "ostwald-van-t-hoff",
    source: "ostwald",
    target: "van-t-hoff",
    kind: "influence",
    label: {
      zh: "共同建设物理化学",
      en: "Developing physical chemistry together",
    },
    description: {
      zh: "两人合作创办物理化学期刊并交流平衡与溶液研究，关系具有双向性。",
      en: "They co-founded a physical-chemistry journal and exchanged work on equilibrium and solutions.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1909/ostwald/biographical/",
    direction: "both",
  },
  {
    id: "ostwald-nernst",
    source: "ostwald",
    target: "nernst",
    kind: "mentorship",
    label: {
      zh: "莱比锡助手时期",
      en: "Assistantship in Leipzig",
    },
    description: {
      zh: "能斯特在奥斯特瓦尔德的莱比锡实验室工作；他的博士学位此前已在维尔茨堡取得。",
      en: "Nernst worked in Ostwald’s Leipzig laboratory after completing his doctorate at Würzburg.",
    },
    sourceUrl: "https://www.uni-goettingen.de/en/62609.html",
  },
  {
    id: "nernst-lewis",
    source: "nernst",
    target: "lewis",
    kind: "mentorship",
    label: {
      zh: "博士后的研究学习",
      en: "Postdoctoral research study",
    },
    description: {
      zh: "路易斯完成哈佛博士学位后，到哥廷根跟随能斯特研究；不把这段经历写成博士指导。",
      en: "After his Harvard doctorate, Lewis studied with Nernst in Göttingen, a postdoctoral rather than doctoral connection.",
    },
    sourceUrl: "https://chemistry.berkeley.edu/news/gilbert-newton-lewis",
  },
  {
    id: "ostwald-lewis",
    source: "ostwald",
    target: "lewis",
    kind: "mentorship",
    label: {
      zh: "莱比锡的研究访问",
      en: "Research study in Leipzig",
    },
    description: {
      zh: "路易斯在德国访问期间随奥斯特瓦尔德研究一学期，后来继续发展化学热力学。",
      en: "Lewis spent a semester studying with Ostwald during his German research visit.",
    },
    sourceUrl: "https://chemistry.berkeley.edu/news/gilbert-newton-lewis",
  },
  {
    id: "gibbs-lewis",
    source: "gibbs",
    target: "lewis",
    kind: "influence",
    label: {
      zh: "热力学进入化学实践",
      en: "Thermodynamics for practical chemistry",
    },
    description: {
      zh: "路易斯继承吉布斯的热力学框架，以活度、逸度和数据整理使其更适于化学应用。",
      en: "Lewis developed Gibbs’s framework through activity, fugacity and data useful to practicing chemists.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/gilbert-newton-lewis/",
  },
  {
    id: "gibbs-ostwald",
    source: "gibbs",
    target: "ostwald",
    kind: "influence",
    label: {
      zh: "著作翻译与理论传播",
      en: "Translation and dissemination",
    },
    description: {
      zh: "奥斯特瓦尔德翻译并传播吉布斯的热力学著作；这条线是文献接续，不是课堂师承。",
      en: "Ostwald translated and disseminated Gibbs’s thermodynamic writings, a textual rather than classroom connection.",
    },
    sourceUrl: "https://mathshistory.st-andrews.ac.uk/Biographies/Gibbs/",
  },
  {
    id: "davy-faraday",
    source: "davy",
    target: "faraday",
    kind: "mentorship",
    label: {
      zh: "皇家研究院实验室",
      en: "The Royal Institution laboratory",
    },
    description: {
      zh: "戴维聘用法拉第为化学助理，实验与旅行提供早期训练；法拉第随后形成自己的研究方向。",
      en: "Davy hired Faraday as a chemical assistant, providing early training before Faraday developed independent research.",
    },
    sourceUrl:
      "https://www.rigb.org/explore-science/explore/collection/michael-faradays-research-and-work",
  },
  {
    id: "davy-gay-lussac",
    source: "davy",
    target: "gay-lussac",
    kind: "parallel",
    label: {
      zh: "硼与碘的同期研究",
      en: "Contemporary work on boron and iodine",
    },
    description: {
      zh: "两人及各自合作者在元素分析中竞争和互相回应；此线不表示共同署名的统一实验。",
      en: "They and their collaborators competed and responded to each other in elemental analysis, without a single jointly authored experiment.",
    },
    sourceUrl: "https://www.sciencehistory.org/stories/magazine/left-behind/",
  },
  {
    id: "faraday-kekule",
    source: "faraday",
    target: "kekule",
    kind: "influence",
    label: {
      zh: "从苯的分离到结构",
      en: "From benzene isolation to structure",
    },
    description: {
      zh: "法拉第分离苯，凯库勒后来研究其环状连接。样品的发现与结构理论相隔数十年。",
      en: "Faraday isolated benzene; decades later Kekulé proposed its ring connectivity.",
    },
    sourceUrl:
      "https://www.rigb.org/explore-science/explore/blog/tiny-vial-changed-world-benzene-200",
  },
  {
    id: "faraday-arrhenius",
    source: "faraday",
    target: "arrhenius",
    kind: "influence",
    label: {
      zh: "电解定量与离子解释",
      en: "Electrolysis and an ionic interpretation",
    },
    description: {
      zh: "法拉第的电解定量关系成为离子理论必须解释的现象之一；两人没有实际师生关系。",
      en: "Faraday’s quantitative electrolysis provided phenomena that later ionic theories needed to explain.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1903/arrhenius/lecture/",
  },
  {
    id: "marie-curie-irene-joliot-curie",
    source: "marie-curie",
    target: "irene-joliot-curie",
    kind: "mentorship",
    label: {
      zh: "居里实验室训练",
      en: "Training in the Curie laboratory",
    },
    description: {
      zh: "伊雷娜在玛丽·居里的实验室接受放射性研究训练；母女关系之外还有实际学术指导。",
      en: "Irène trained in radioactivity research in Marie Curie’s laboratory; the edge records teaching as well as family context.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1935/joliot-curie/biographical/",
  },
  {
    id: "marie-curie-soddy",
    source: "marie-curie",
    target: "soddy",
    kind: "parallel",
    label: {
      zh: "放射性元素与同位素",
      en: "Radioelements and isotopes",
    },
    description: {
      zh: "问题对照：放射性化学分离揭示新元素，同位素概念解释同一化学位置的不同原子质量；不虚构师承。",
      en: "A comparison of problems: radiochemical separation identified elements, while isotopes explained differing masses at one chemical position.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1921/soddy/lecture/",
  },
  {
    id: "soddy-irene-joliot-curie",
    source: "soddy",
    target: "irene-joliot-curie",
    kind: "influence",
    label: {
      zh: "核素的化学身份",
      en: "Chemical identity of nuclides",
    },
    description: {
      zh: "同位素框架使人工放射性产物能够按元素位置分类；这里记录理论背景，不主张私人指导。",
      en: "The isotope framework helped classify artificial radioactive products by chemical identity, without implying personal mentorship.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1935/joliot-curie/lecture/",
  },
  {
    id: "haber-bosch",
    source: "haber",
    target: "bosch",
    kind: "influence",
    label: {
      zh: "从实验到工业",
      en: "From laboratory to industry",
    },
    description: {
      zh: "博施团队以哈伯和勒罗西尼奥尔的实验为基础，解决连续生产、材料和催化等工业问题。",
      en: "Bosch’s team industrialized the demonstration by Haber and Le Rossignol through advances in materials, catalysis and plant operation.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1931/bosch/biographical/",
  },
  {
    id: "nernst-haber",
    source: "nernst",
    target: "haber",
    kind: "parallel",
    label: {
      zh: "合成氨平衡的争论",
      en: "Debating ammonia equilibrium",
    },
    description: {
      zh: "两人研究氨合成的热力学数据与平衡，曾存在分歧；竞争与检验推动了实验，非导师关系。",
      en: "Their work on ammonia equilibrium involved disagreement and experimental scrutiny rather than supervision.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1918/haber/lecture/",
  },
  {
    id: "bosch-hou-debang",
    source: "bosch",
    target: "hou-debang",
    kind: "parallel",
    label: {
      zh: "高压工业与流程耦合",
      en: "Industrial synthesis and linked processes",
    },
    description: {
      zh: "编辑对照：合成氨工业与侯氏制碱都需要催化、分离和循环协同；不声称两人共同建厂。",
      en: "Editorial comparison: ammonia manufacture and Hou’s process integrate reaction, separation and recycling; no joint plant project is asserted.",
    },
    sourceUrl:
      "https://casad.cas.cn/ysxx2022/ygys/200906/t20090624_1810088.html",
  },
  {
    id: "lewis-langmuir",
    source: "lewis",
    target: "langmuir",
    kind: "influence",
    label: {
      zh: "电子对成键的扩展",
      en: "Extending electron-pair bonding",
    },
    description: {
      zh: "朗缪尔承接并扩展路易斯的价电子观点，推动共价键术语与理论传播。",
      en: "Langmuir expanded Lewis’s valence-electron ideas and helped disseminate the covalent-bond description.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/gilbert-newton-lewis/",
  },
  {
    id: "lewis-pauling",
    source: "lewis",
    target: "pauling",
    kind: "influence",
    label: {
      zh: "从电子对到量子价键",
      en: "From electron pairs to quantum bonding",
    },
    description: {
      zh: "鲍林把经典电子对成键问题带入量子解释。理论上的接续不是博士师承。",
      en: "Pauling developed quantum accounts of bonding questions expressed by classical electron-pair models, not through doctoral supervision by Lewis.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1954/pauling/lecture/",
  },
  {
    id: "pauling-mulliken",
    source: "pauling",
    target: "mulliken",
    kind: "parallel",
    label: {
      zh: "价键与分子轨道",
      en: "Valence bonds and molecular orbitals",
    },
    description: {
      zh: "两种量子化学表示分别强调局域成键与分子整体轨道，彼此互补，并非只有一方正确。",
      en: "Localized valence-bond and molecular-orbital descriptions offer complementary quantum representations.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1966/mulliken/lecture/",
  },
  {
    id: "pauling-karplus",
    source: "pauling",
    target: "karplus",
    kind: "mentorship",
    label: {
      zh: "加州理工博士指导",
      en: "Doctoral supervision at Caltech",
    },
    description: {
      zh: "卡普拉斯在鲍林指导下完成博士研究，1953年获学位；其后形成分子模拟方向。",
      en: "Karplus earned his 1953 doctorate under Pauling before developing his later simulation research.",
    },
    sourceUrl:
      "https://news.harvard.edu/gazette/story/2025/01/martin-karplus-pioneering-figure-in-theoretical-chemistry-dies-at-94/",
  },
  {
    id: "pauling-eyring",
    source: "pauling",
    target: "eyring",
    kind: "mentorship",
    label: {
      zh: "加州理工的博士后研究",
      en: "Postdoctoral research at Caltech",
    },
    description: {
      zh: "艾林在加州理工与鲍林工作时深化量子化学研究；博士学位是在伯克利取得。",
      en: "Eyring worked with Pauling at Caltech after earning his doctorate at Berkeley.",
    },
    sourceUrl:
      "https://www.nasonline.org/wp-content/uploads/2024/06/eyring-henry.pdf",
  },
  {
    id: "mulliken-kohn",
    source: "mulliken",
    target: "kohn",
    kind: "parallel",
    label: {
      zh: "电子结构的两种计算语言",
      en: "Two languages for electronic structure",
    },
    description: {
      zh: "编辑对照：分子轨道与密度泛函都处理多电子体系，但基本变量和近似不同；不声称直接师承。",
      en: "Editorial comparison: molecular orbitals and density functionals treat many-electron systems with different variables and approximations.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1998/kohn/biographical/",
  },
  {
    id: "eyring-zewail",
    source: "eyring",
    target: "zewail",
    kind: "influence",
    label: {
      zh: "从过渡态理论到时间测量",
      en: "From transition-state theory to timing",
    },
    description: {
      zh: "飞秒实验让研究者检验反应跨越势垒时的动态过程，接续过渡态理论提出的问题，而非师生关系。",
      en: "Femtosecond experiments tested dynamics near reaction barriers, developing questions posed by transition-state theory rather than a teaching lineage.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1999/zewail/lecture/",
  },
  {
    id: "nernst-langmuir",
    source: "nernst",
    target: "langmuir",
    kind: "mentorship",
    label: {
      zh: "哥廷根博士指导",
      en: "Doctoral supervision in Göttingen",
    },
    description: {
      zh: "朗缪尔在能斯特指导下完成博士研究，随后把物化方法用于工业实验室。",
      en: "Langmuir completed his doctorate under Nernst before applying physical chemistry in an industrial laboratory.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1932/langmuir/biographical/",
  },
  {
    id: "robinson-woodward",
    source: "robinson",
    target: "woodward",
    kind: "parallel",
    label: {
      zh: "天然产物结构与合成",
      en: "Natural-product structures and synthesis",
    },
    description: {
      zh: "两人研究士的宁等复杂天然产物，结构鉴定与全合成提供相互检验的路线。",
      en: "Their research on complex natural products such as strychnine linked structural proposals with synthetic tests.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1965/woodward/biographical/",
  },
  {
    id: "robinson-hodgkin",
    source: "robinson",
    target: "hodgkin",
    kind: "parallel",
    label: {
      zh: "青霉素结构的检验",
      en: "Testing penicillin structures",
    },
    description: {
      zh: "有机化学提出不同结构假说，霍奇金团队的衍射结果解决争论；科学判断依赖证据而非资历。",
      en: "Diffraction evidence from Hodgkin’s team resolved competing organic-chemical proposals for penicillin’s structure.",
    },
    sourceUrl: "https://oumnh.ox.ac.uk/learn-dorothy-crowfoot-hodgkin",
  },
  {
    id: "hodgkin-woodward",
    source: "hodgkin",
    target: "woodward",
    kind: "influence",
    label: {
      zh: "B12结构引导合成",
      en: "B12 structure guides synthesis",
    },
    description: {
      zh: "霍奇金团队确定维生素B12结构，给伍德沃德及其他合成团队提供明确目标。",
      en: "Hodgkin’s structural work defined vitamin B12 as a target for Woodward and other synthesis teams.",
    },
    sourceUrl:
      "https://www.nobelprize.org/uploads/2018/06/hodgkin-lecture-1.pdf",
  },
  {
    id: "woodward-huang-minglong",
    source: "woodward",
    target: "huang-minglong",
    kind: "parallel",
    label: {
      zh: "甾体合成路线",
      en: "Routes to steroid synthesis",
    },
    description: {
      zh: "编辑对照：两人的团队分别发展复杂甾体合成方法；此线比较路线问题，不主张共同署名合作。",
      en: "Editorial comparison: their teams developed steroid-synthesis strategies separately; no joint authorship is asserted.",
    },
    sourceUrl:
      "https://www.sioc.cas.cn/kxj/ml/hml/202308/t20230804_6854913.html",
  },
  {
    id: "franklin-hodgkin",
    source: "franklin",
    target: "hodgkin",
    kind: "parallel",
    label: {
      zh: "衍射对结构的约束",
      en: "Diffraction constrains structures",
    },
    description: {
      zh: "编辑对照：从DNA到药物晶体，两人的工作都说明结构模型必须符合定量衍射证据。",
      en: "Editorial comparison: their work on DNA and drug crystals shows how quantitative diffraction constrains models.",
    },
    sourceUrl: "https://www.kcl.ac.uk/people/rosalind-franklin",
  },
  {
    id: "hodgkin-yonath",
    source: "hodgkin",
    target: "yonath",
    kind: "parallel",
    label: {
      zh: "从药物晶体到核糖体",
      en: "From drug crystals to ribosomes",
    },
    description: {
      zh: "编辑对照：分子增大使结晶、辐射损伤和计算更困难；此线不把霍奇金写成约纳特的导师。",
      en: "Editorial comparison: increasing molecular size intensifies crystallization, damage and calculation challenges; Hodgkin is not presented as Yonath’s advisor.",
    },
    sourceUrl:
      "https://www.embl.org/news/people-perspectives/professor-ada-yonath-1939-2026/",
  },
  {
    id: "franklin-yonath",
    source: "franklin",
    target: "yonath",
    kind: "parallel",
    label: {
      zh: "RNA与蛋白复合体的结构",
      en: "Structures of RNA–protein assemblies",
    },
    description: {
      zh: "编辑对照：病毒和核糖体都是复杂的RNA–蛋白体系，衍射研究回答不同的生物结构问题。",
      en: "Editorial comparison: viruses and ribosomes are complex RNA–protein assemblies studied for different structural questions.",
    },
    sourceUrl: "https://www.kcl.ac.uk/telling-franklins-story",
  },
  {
    id: "pauling-franklin",
    source: "pauling",
    target: "franklin",
    kind: "parallel",
    label: {
      zh: "DNA模型与实验约束",
      en: "DNA models and experimental constraints",
    },
    description: {
      zh: "鲍林提出过不正确的DNA模型；富兰克林等人的定量证据约束了正确结构，不能用名望代替数据。",
      en: "Pauling proposed an incorrect DNA model; evidence from Franklin and others constrained the correct structure.",
    },
    sourceUrl: "https://www.kcl.ac.uk/people/rosalind-franklin",
  },
  {
    id: "staudinger-natta",
    source: "staudinger",
    target: "natta",
    kind: "influence",
    label: {
      zh: "1932年交流与长链研究",
      en: "A 1932 meeting and polymer research",
    },
    description: {
      zh: "纳塔在诺贝尔演讲中明确提到与施陶丁格会面后转向线性高聚物研究。",
      en: "Natta’s Nobel lecture explicitly credits a 1932 meeting with Staudinger in turning his attention to linear polymers.",
    },
    sourceUrl: "https://www.nobelprize.org/uploads/2018/06/natta-lecture.pdf",
  },
  {
    id: "staudinger-ziegler",
    source: "staudinger",
    target: "ziegler",
    kind: "influence",
    label: {
      zh: "长链观与聚合催化",
      en: "Long-chain models and polymer catalysis",
    },
    description: {
      zh: "共价长链观为理解催化聚合产物提供结构背景；此线不声称施陶丁格是齐格勒博士导师。",
      en: "The macromolecular framework supplied structural context for catalytic polymerization products, without asserting doctoral supervision.",
    },
    sourceUrl:
      "https://www.acs.org/education/whatischemistry/landmarks/staudingerpolymerscience.html",
  },
  {
    id: "ziegler-natta",
    source: "ziegler",
    target: "natta",
    kind: "influence",
    label: {
      zh: "催化成果的延展",
      en: "Extending catalyst discoveries",
    },
    description: {
      zh: "纳塔研读并发展齐格勒的有机金属催化成果，获得立体规整聚合物；双方合作史也包含专利争议。",
      en: "Natta extended Ziegler’s organometallic-catalyst findings to stereoregular polymers; their relationship also involved patent disputes.",
    },
    sourceUrl: "https://www.nobelprize.org/uploads/2018/06/natta-lecture.pdf",
  },
  {
    id: "lewis-robinson",
    source: "lewis",
    target: "robinson",
    kind: "influence",
    label: {
      zh: "电子观点解释有机反应",
      en: "Electronic accounts of organic reactions",
    },
    description: {
      zh: "罗宾逊把电子成键观点用于有机反应机制；此线记录理论语言的发展，不主张师生关系。",
      en: "Robinson applied electronic bonding ideas to organic mechanisms, an intellectual rather than teaching connection.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1947/robinson/biographical/",
  },
  {
    id: "kekule-robinson",
    source: "kekule",
    target: "robinson",
    kind: "influence",
    label: {
      zh: "从连接结构到反应设计",
      en: "From connectivity to reaction planning",
    },
    description: {
      zh: "结构化学让复杂天然产物可以按原子连接规划；罗宾逊的合成在这一语言上继续发展。",
      en: "Structural chemistry made atom-connectivity-based planning possible, providing a language developed further in Robinson’s synthesis work.",
    },
    sourceUrl: "https://digital.sciencehistory.org/works/r7qoyok",
  },
  {
    id: "le-bel-arnold",
    source: "le-bel",
    target: "arnold",
    kind: "parallel",
    label: {
      zh: "手性与催化选择性",
      en: "Chirality and catalytic selectivity",
    },
    description: {
      zh: "编辑对照：立体化学定义镜像差别，定向进化选择能区分底物和产物的酶；两人没有交往。",
      en: "Editorial comparison: stereochemistry defines mirror distinctions, while directed evolution selects enzyme discrimination; no personal contact is implied.",
    },
    sourceUrl: "https://cce.caltech.edu/faculty/frances-h-arnold",
  },
  {
    id: "pasteur-arnold",
    source: "pasteur",
    target: "arnold",
    kind: "parallel",
    label: {
      zh: "生物选择性与酶进化",
      en: "Biological selectivity and enzyme evolution",
    },
    description: {
      zh: "编辑对照：从微生物选择性到可控酶筛选，研究者以不同方式利用生物催化，不能视作直接合作。",
      en: "Editorial comparison: microbial selectivity and controlled enzyme screening exploit biological catalysis in different ways.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/2018/arnold/biographical/",
  },
  {
    id: "hodgkin-tu-youyou",
    source: "hodgkin",
    target: "tu-youyou",
    kind: "parallel",
    label: {
      zh: "天然抗感染药物的结构",
      en: "Structures of natural anti-infective drugs",
    },
    description: {
      zh: "编辑对照：青霉素和青蒿素研究都须把活性、纯化与结构证据结合；不声称两人共同研究。",
      en: "Editorial comparison: penicillin and artemisinin research connect activity, purification and structure; no joint research is asserted.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/medicine/2015/tu/biographical/",
  },
  {
    id: "huang-minglong-tu-youyou",
    source: "huang-minglong",
    target: "tu-youyou",
    kind: "parallel",
    label: {
      zh: "天然产物的化学转化",
      en: "Chemical transformations of natural products",
    },
    description: {
      zh: "编辑对照：甾体与青蒿素衍生物都显示化学转化可改变药物性质；不虚构指导或合作。",
      en: "Editorial comparison: steroid and artemisinin derivatives show how transformation can change pharmaceutical properties, without an invented mentorship.",
    },
    sourceUrl:
      "https://www.sioc.cas.cn/kxj/ml/hml/202308/t20230804_6854913.html",
  },
  {
    id: "haber-hou-debang",
    source: "haber",
    target: "hou-debang",
    kind: "influence",
    label: {
      zh: "合成氨进入联合流程",
      en: "Synthetic ammonia in linked production",
    },
    description: {
      zh: "侯氏制碱利用合成氨等工业条件实现流程耦合。这是技术体系的承接，不是哈伯本人指导。",
      en: "Hou’s linked process used industrial ammonia supply, an inheritance of chemical technology rather than personal guidance by Haber.",
    },
    sourceUrl:
      "https://casad.cas.cn/ysxx2022/ygys/200906/t20090624_1810088.html",
  },
  {
    id: "berzelius-cannizzaro",
    source: "berzelius",
    target: "cannizzaro",
    kind: "parallel",
    label: {
      zh: "原子量与不同化学式",
      en: "Atomic weights and competing formulas",
    },
    description: {
      zh: "两代研究者都处理原子量与组成问题，但康尼查罗区分原子和分子的方法修正了早期混淆。",
      en: "Both addressed atomic weights and composition; Cannizzaro’s distinction between atoms and molecules resolved earlier ambiguities.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/stanislao-cannizzaro/",
  },
  {
    id: "mendeleev-soddy",
    source: "mendeleev",
    target: "soddy",
    kind: "influence",
    label: {
      zh: "周期位置与不同原子质量",
      en: "Periodic position and different masses",
    },
    description: {
      zh: "同位素迫使人们重新理解周期位置与原子量的关系，扩展而非简单废弃周期分类。",
      en: "Isotopes required reinterpretation of the relation between periodic position and atomic mass, extending periodic classification.",
    },
    sourceUrl:
      "https://www.nobelprize.org/prizes/chemistry/1921/soddy/lecture/",
  },
  {
    id: "dalton-berzelius",
    source: "dalton",
    target: "berzelius",
    kind: "influence",
    label: {
      zh: "原子量的精细测量",
      en: "Refining atomic weights",
    },
    description: {
      zh: "贝采里乌斯以大量分析改进原子量体系，使定量原子观获得更可靠的化学数据。",
      en: "Berzelius refined the atomic-weight system through extensive analysis, providing stronger data for quantitative atomism.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/jons-jakob-berzelius/",
  },
  {
    id: "gibbs-van-t-hoff",
    source: "gibbs",
    target: "van-t-hoff",
    kind: "parallel",
    label: {
      zh: "两条通向化学平衡的路",
      en: "Two approaches to chemical equilibrium",
    },
    description: {
      zh: "编辑对照：热力学势与溶液平衡研究共同组织可逆变化，但不据此捏造私人教学关系。",
      en: "Editorial comparison: thermodynamic potentials and solution equilibria organize reversible change without implying a personal teaching relationship.",
    },
    sourceUrl: "https://mathshistory.st-andrews.ac.uk/Biographies/Gibbs/",
  },
  {
    id: "kekule-cannizzaro",
    source: "kekule",
    target: "cannizzaro",
    kind: "support",
    label: {
      zh: "卡尔斯鲁厄会议的平台",
      en: "The Karlsruhe congress platform",
    },
    description: {
      zh: "凯库勒参与组织1860年会议，康尼查罗借此传播原子量观点；支持指学术交流平台。",
      en: "Kekulé helped organize the 1860 congress where Cannizzaro disseminated his atomic-weight arguments.",
    },
    sourceUrl:
      "https://www.sciencehistory.org/education/scientific-biographies/stanislao-cannizzaro/",
  },
  {
    id: "berzelius-mendeleev",
    source: "berzelius",
    target: "mendeleev",
    kind: "influence",
    label: {
      zh: "分析数据支撑周期表",
      en: "Analytical data for periodic classification",
    },
    description: {
      zh: "贝采里乌斯及后继者的原子量分析，为门捷列夫整理元素提供基础；周期规律不是由单套数据自动得出。",
      en: "Atomic-weight analysis by Berzelius and successors supported Mendeleev’s classification, which still required interpretive work.",
    },
    sourceUrl:
      "https://inchemistry.acs.org/atomic-news/assembling-the-periodic-table.html",
  },
];
