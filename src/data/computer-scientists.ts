import type { Mathematician, ScholarRelation } from "./mathematicians";

// Evidence and reuse permissions: docs/computer-scientists-sources.md
// and public/images/computer-scientists/sources.json.
export const computerScientists: Mathematician[] = [
  {
    "id": "babbage",
    "name": {
      "zh": "巴贝奇",
      "en": "Babbage"
    },
    "fullName": "Charles Babbage",
    "born": 1791,
    "died": 1871,
    "place": {
      "zh": "伦敦 → 剑桥 → 伦敦",
      "en": "London → Cambridge → London"
    },
    "field": {
      "zh": "机械计算 · 程序控制",
      "en": "Mechanical computing · Program control"
    },
    "hook": {
      "zh": "把计算步骤交给机器，需要先设计什么？",
      "en": "What must be designed before a machine can follow a calculation?"
    },
    "summary": {
      "zh": "巴贝奇从减少数学表中的错误出发，走向通用计算机器的设计。他区分计算部件、存储与控制；不少设计未在生前完成，应把方案、实物和后来的重建分清。",
      "en": "Babbage moved from correcting mathematical tables to designs for general computation. His projects separated calculation, storage and control, but many designs were not completed during his lifetime."
    },
    "portrait": {
      "src": "/images/computer-scientists/babbage.jpg",
      "alt": {
        "zh": "巴贝奇的资料肖像",
        "en": "Portrait of Charles Babbage"
      },
      "credit": {
        "zh": "Unknown photographer · 1860 · Public domain",
        "en": "Unknown photographer · 1860 · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Charles_Babbage_-_1860.jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1822",
        "title": {
          "zh": "差分机方案",
          "en": "The Difference Engine"
        },
        "description": {
          "zh": "用有限差分反复做加法，机械生成适当多项式的数值表，并计划直接排印结果，减少抄写出错。",
          "en": "Finite differences replace repeated polynomial evaluation with additions. Mechanical calculation and planned printing aimed to reduce transcription errors."
        }
      },
      {
        "year": "1830年代",
        "title": {
          "zh": "分析机",
          "en": "The Analytical Engine"
        },
        "description": {
          "zh": "以「存储器」与「运算器」分工，按穿孔卡片规定的操作序列计算。它是通用机器设计的重要先驱，但不是已运行的电子计算机。",
          "en": "A store and mill separate memory from calculation, with punched cards directing operations. It was a pioneering general-purpose design, not a completed electronic computer."
        }
      },
      {
        "year": "1847–1849",
        "title": {
          "zh": "差分机二号的简化设计",
          "en": "Difference Engine No. 2"
        },
        "description": {
          "zh": "利用分析机研究所得经验减少机构复杂度。1991年的历史重建检验了设计可行性，不能写成他本人当时完成了整机。",
          "en": "The second design simplified mechanisms using lessons from the Analytical Engine. Its 1991 reconstruction tested feasibility; Babbage did not complete that machine himself."
        }
      }
    ],
    "timeline": [
      {
        "year": "1791",
        "text": {
          "zh": "生于伦敦。",
          "en": "Born in London."
        }
      },
      {
        "year": "1810",
        "text": {
          "zh": "进入剑桥三一学院。",
          "en": "Entered Trinity College, Cambridge."
        }
      },
      {
        "year": "1822–1849",
        "text": {
          "zh": "持续提出并修改两类计算机设计。",
          "en": "Developed and revised his engine designs."
        }
      },
      {
        "year": "1871",
        "text": {
          "zh": "在伦敦去世。",
          "en": "Died in London."
        }
      }
    ],
    "sources": [
      {
        "title": "Science Museum · Charles Babbage",
        "href": "https://collection.sciencemuseumgroup.org.uk/people/cp36993"
      },
      {
        "title": "Oxford History of Science Museum · Babbage & Lovelace",
        "href": "https://www.hsm.ox.ac.uk/imagining-ai"
      },
      {
        "title": "MacTutor · Babbage",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Babbage/"
      }
    ]
  },
  {
    "id": "boole",
    "name": {
      "zh": "布尔",
      "en": "Boole"
    },
    "fullName": "George Boole",
    "born": 1815,
    "died": 1864,
    "place": {
      "zh": "林肯 → 科克",
      "en": "Lincoln → Cork"
    },
    "field": {
      "zh": "代数逻辑 · 概率",
      "en": "Algebraic logic · Probability"
    },
    "hook": {
      "zh": "推理能否像代数一样运算？",
      "en": "Can reasoning be calculated like algebra?"
    },
    "summary": {
      "zh": "布尔将逻辑关系写成可操作的符号体系。他的目标是研究推理法则；后来香农等人才把相关代数连接到开关电路。",
      "en": "Boole expressed logical relations in an algebraic language. He studied the laws of reasoning; later researchers, including Shannon, connected this algebra to switching circuits."
    },
    "portrait": {
      "src": "/images/computer-scientists/boole.png",
      "alt": {
        "zh": "George Boole的资料肖像",
        "en": "Archival portrait of George Boole"
      },
      "credit": {
        "zh": "Unknown artist · 1865 publication · Public domain",
        "en": "Unknown artist · 1865 publication · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Portrait_of_George_Boole.png",
      "kind": "later-depiction",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1847",
        "title": {
          "zh": "逻辑的数学分析",
          "en": "The Mathematical Analysis of Logic"
        },
        "description": {
          "zh": "把类及其逻辑组合转成符号运算，为代数逻辑提供系统形式；不能把现代布尔代数的全部公理倒写成原书已有。",
          "en": "Classes and their combinations became symbolic operations. This was a systematic foundation for algebraic logic, not the complete modern axiom system."
        }
      },
      {
        "year": "1854",
        "title": {
          "zh": "《思维规律》",
          "en": "The Laws of Thought"
        },
        "description": {
          "zh": "将逻辑与代数进一步整合，并研究从前提出发消去中间项的推理方法。选择运算满足x²=x，体现同一类重复选择不改变结果。",
          "en": "He developed algebraic reasoning and elimination of intermediate terms. The selection operation x²=x expresses that selecting the same class twice changes nothing."
        },
        "formula": "x^2=x"
      },
      {
        "year": "1854",
        "title": {
          "zh": "逻辑约束下的概率推断",
          "en": "Probability under logical constraints"
        },
        "description": {
          "zh": "研究事件逻辑关系怎样限制概率，并辨认不能由给定信息唯一确定的量。该框架属于概率推理史，不能直接等同于今天的概率公理体系。",
          "en": "He examined how logical relations constrain event probabilities and which quantities remain underdetermined. This is historical probabilistic reasoning, not modern probability axioms."
        }
      }
    ],
    "timeline": [
      {
        "year": "1815",
        "text": {
          "zh": "生于英国林肯。",
          "en": "Born in Lincoln, England."
        }
      },
      {
        "year": "1847",
        "text": {
          "zh": "出版首部代数逻辑专著。",
          "en": "Published his first treatise on algebraic logic."
        }
      },
      {
        "year": "1849",
        "text": {
          "zh": "赴科克任数学教授。",
          "en": "Became professor of mathematics in Cork."
        }
      },
      {
        "year": "1864",
        "text": {
          "zh": "在爱尔兰去世。",
          "en": "Died in Ireland."
        }
      }
    ],
    "sources": [
      {
        "title": "University College Cork · George Boole",
        "href": "https://www.ucc.ie/en/heritage/history/people/ucc-staff/professor-george-boole/"
      },
      {
        "title": "MacTutor · George Boole",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Boole/"
      }
    ]
  },
  {
    "id": "lovelace",
    "name": {
      "zh": "洛夫莱斯",
      "en": "Lovelace"
    },
    "fullName": "Ada Lovelace",
    "born": 1815,
    "died": 1852,
    "place": {
      "zh": "伦敦",
      "en": "London"
    },
    "field": {
      "zh": "程序表达 · 符号计算",
      "en": "Programming · Symbolic computation"
    },
    "hook": {
      "zh": "机器操作的可以不只是数字吗？",
      "en": "Could a machine manipulate more than numbers?"
    },
    "summary": {
      "zh": "洛夫莱斯在与巴贝奇讨论的基础上，为分析机写下详细注释。她把操作顺序、数据与一般符号处理联系起来；这些文字面向一台尚未完成的机器。",
      "en": "Working in dialogue with Babbage, Lovelace produced detailed notes on the Analytical Engine, connecting operations, data and symbolic processing for a machine that had not been completed."
    },
    "portrait": {
      "src": "/images/computer-scientists/lovelace.png",
      "alt": {
        "zh": "洛夫莱斯的资料肖像",
        "en": "Portrait of Ada Lovelace"
      },
      "credit": {
        "zh": "Antoine Claudet · c. 1843 · Commons crop · Public domain",
        "en": "Antoine Claudet · c. 1843 · Commons crop · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Ada_Lovelace_daguerreotype_by_Antoine_Claudet_1843_-_cropped.png",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1843",
        "title": {
          "zh": "扩充分析机的技术说明",
          "en": "Explaining the Analytical Engine"
        },
        "description": {
          "zh": "翻译梅纳布雷亚的文章，并加入篇幅更长的A–G注释，说明机器部件与操作怎样配合。",
          "en": "She translated Menabrea’s account and added extensive Notes A–G explaining how the machine’s operations and components fit together."
        }
      },
      {
        "year": "1843",
        "title": {
          "zh": "伯努利数计算表",
          "en": "A table for computing Bernoulli numbers"
        },
        "description": {
          "zh": "注G把伯努利数算法展开为机器操作和中间量的表格，包含重复步骤。它是早期公开程序描述的重要例子，工作有巴贝奇参与。",
          "en": "Note G organizes a Bernoulli-number calculation into operations and intermediate quantities, including repeated steps. It is an important early published program description developed with Babbage’s participation."
        }
      },
      {
        "year": "1843",
        "title": {
          "zh": "超越算术的符号操作",
          "en": "Symbolic operations beyond arithmetic"
        },
        "description": {
          "zh": "指出只要对象之间的关系能被形式表示，机器也可能处理音乐等内容。这里是对通用符号计算的洞见，不是声称机器当时已经作曲。",
          "en": "She argued that formally representable relationships could let a machine work with material such as music. This was an insight about general symbolic processing, not a working music generator."
        }
      }
    ],
    "timeline": [
      {
        "year": "1815",
        "text": {
          "zh": "生于伦敦。",
          "en": "Born in London."
        }
      },
      {
        "year": "1833",
        "text": {
          "zh": "结识巴贝奇并观看差分机演示。",
          "en": "Met Babbage and saw a demonstration of his engine."
        }
      },
      {
        "year": "1843",
        "text": {
          "zh": "发表分析机译文与注释。",
          "en": "Published the translation and Notes."
        }
      },
      {
        "year": "1852",
        "text": {
          "zh": "在伦敦去世。",
          "en": "Died in London."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Ada Lovelace",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Lovelace/"
      },
      {
        "title": "Oxford History of Science Museum · Babbage & Lovelace",
        "href": "https://www.hsm.ox.ac.uk/imagining-ai"
      }
    ]
  },
  {
    "id": "hollerith",
    "name": {
      "zh": "霍勒里斯",
      "en": "Hollerith"
    },
    "fullName": "Herman Hollerith",
    "born": 1860,
    "died": 1929,
    "place": {
      "zh": "布法罗 → 纽约 → 华盛顿",
      "en": "Buffalo → New York → Washington"
    },
    "field": {
      "zh": "数据处理 · 穿孔卡片",
      "en": "Data processing · Punched cards"
    },
    "hook": {
      "zh": "成百万份记录，怎样转成机器可读的数据？",
      "en": "How can millions of records become machine-readable data?"
    },
    "summary": {
      "zh": "霍勒里斯把穿孔卡、读卡电路与分类计数组织成数据处理系统。人口普查展示了信息编码和自动汇总的力量，但制表机并不是通用程序计算机。",
      "en": "Hollerith combined punched cards, electrical readers and counting into a data-processing system. Census applications showed the power of encoded records, without making the tabulator a general-purpose computer."
    },
    "portrait": {
      "src": "/images/computer-scientists/hollerith.jpg",
      "alt": {
        "zh": "霍勒里斯的资料肖像",
        "en": "Portrait of Herman Hollerith"
      },
      "credit": {
        "zh": "Charles Milton Bell · c. 1888 · Public domain",
        "en": "Charles Milton Bell · c. 1888 · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Hollerith.jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1889",
        "title": {
          "zh": "电气制表系统",
          "en": "Electrical tabulation"
        },
        "description": {
          "zh": "以卡片孔位表示记录属性，电接点读出并驱动计数器，将手工统计的一部分交给机器。",
          "en": "Card positions encoded attributes; electrical contacts read them and drove counters, mechanizing part of statistical tabulation."
        }
      },
      {
        "year": "1890",
        "title": {
          "zh": "大规模人口普查处理",
          "en": "Large-scale census processing"
        },
        "description": {
          "zh": "将编码、读卡、分类和汇总组合用于美国人口普查。成就来自完整工作流程，而不只是一台计数装置。",
          "en": "His system linked encoding, reading, sorting and aggregation for the U.S. census. Its value lay in the workflow as well as the counter."
        }
      },
      {
        "year": "1890年代",
        "title": {
          "zh": "可重复分类的数据记录",
          "en": "Reusable records for different tabulations"
        },
        "description": {
          "zh": "同一批卡片可依不同属性重新分类、再次统计，支持多种交叉汇总。纸卡成为能在不同步骤之间流动的数据载体。",
          "en": "The same cards could be sorted and counted repeatedly under different categories, supporting multiple cross-tabulations and reusable machine-readable records."
        }
      }
    ],
    "timeline": [
      {
        "year": "1860",
        "text": {
          "zh": "生于纽约州布法罗。",
          "en": "Born in Buffalo, New York."
        }
      },
      {
        "year": "1879",
        "text": {
          "zh": "从哥伦比亚矿业学院毕业。",
          "en": "Graduated from Columbia’s School of Mines."
        }
      },
      {
        "year": "1890",
        "text": {
          "zh": "制表系统用于美国人口普查。",
          "en": "His system was used for the U.S. census."
        }
      },
      {
        "year": "1929",
        "text": {
          "zh": "在华盛顿去世。",
          "en": "Died in Washington, D.C."
        }
      }
    ],
    "sources": [
      {
        "title": "U.S. Census Bureau · Hollerith machine",
        "href": "https://www.census.gov/about/history/bureau-history/census-innovations/technology/hollerith-machine.html"
      },
      {
        "title": "Smithsonian · From Hollerith to IBM",
        "href": "https://www.si.edu/spotlight/tabulating-equipment/from-herman-hollerith-to-ibm"
      },
      {
        "title": "IBM · Punched card tabulator",
        "href": "https://www.ibm.com/history/punched-card-tabulator"
      }
    ]
  },
  {
    "id": "church",
    "name": {
      "zh": "丘奇",
      "en": "Church"
    },
    "fullName": "Alonzo Church",
    "born": 1903,
    "died": 1995,
    "place": {
      "zh": "华盛顿 → 普林斯顿 → 洛杉矶",
      "en": "Washington, D.C. → Princeton → Los Angeles"
    },
    "field": {
      "zh": "逻辑 · λ演算",
      "en": "Logic · Lambda calculus"
    },
    "hook": {
      "zh": "只用函数的抽象和应用，能表达多少计算？",
      "en": "How much computation fits into abstraction and application?"
    },
    "summary": {
      "zh": "丘奇研究函数如何被形式化，以及哪些问题根本不存在统一算法。λ演算把这些问题写得极为紧凑；他的学生与合作者又把它连接到递归论和计算机科学。",
      "en": "Church formalized functions and examined problems with no general algorithm. Lambda calculus expressed these questions compactly, while his students and collaborators connected them with recursion theory and computer science."
    },
    "portrait": {
      "src": "/images/computer-scientists/church.svg",
      "alt": {
        "zh": "Alonzo Church的姓名字标，非肖像",
        "en": "Lettermark for Alonzo Church, not a portrait"
      },
      "credit": {
        "zh": "原创姓名字标；未使用缺乏可靠开放授权的肖像",
        "en": "Original lettermark; no verified openly licensed portrait used"
      },
      "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Church/",
      "kind": "monogram"
    },
    "achievements": [
      {
        "year": "1932–1936",
        "title": {
          "zh": "λ演算",
          "en": "Lambda calculus"
        },
        "description": {
          "zh": "以变量、函数抽象和函数应用描述计算。代入时必须避免把自由变量意外绑定；这套符号体系后来成为函数式编程的重要理论基础。",
          "en": "Variables, function abstraction and application describe computation. Substitution must avoid capturing free variables. The calculus became a major foundation for functional programming."
        },
        "formula": "(\\lambda x.x)\\,a\\;\\longrightarrow\\;a"
      },
      {
        "year": "1936",
        "title": {
          "zh": "一阶逻辑判定问题无通解",
          "en": "No general decision algorithm for first-order logic"
        },
        "description": {
          "zh": "不存在对任意一阶逻辑公式都能终止、并正确判断它是否普遍有效的算法。丘奇论题进一步将有效可计算性与形式计算模型联系起来；论题本身不是普通形式定理。",
          "en": "No algorithm always terminates and correctly decides validity for every first-order formula. Church’s thesis connects effective calculation with formal models; the thesis itself is not an ordinary formal theorem."
        }
      },
      {
        "year": "1936",
        "title": {
          "zh": "Church–Rosser 定理",
          "en": "The Church–Rosser theorem"
        },
        "description": {
          "zh": "与罗瑟证明无类型λ演算的合流性质：同一表达式走不同的β归约路线，结果仍能进一步归约到共同表达式。若正规形存在，它在变量改名意义下唯一；并非每次计算都会终止。",
          "en": "With Rosser, he proved confluence of beta reduction: divergent reductions can be joined. A normal form, if one exists, is unique up to renaming bound variables; termination is not guaranteed."
        }
      }
    ],
    "timeline": [
      {
        "year": "1903",
        "text": {
          "zh": "生于华盛顿特区。",
          "en": "Born in Washington, D.C."
        }
      },
      {
        "year": "1927",
        "text": {
          "zh": "在普林斯顿获博士学位，导师为维布伦。",
          "en": "Earned his Princeton doctorate under Oswald Veblen."
        }
      },
      {
        "year": "1929–1967",
        "text": {
          "zh": "在普林斯顿任教，随后转赴加州大学洛杉矶分校。",
          "en": "Taught at Princeton, then moved to UCLA."
        }
      },
      {
        "year": "1995",
        "text": {
          "zh": "卒于俄亥俄州哈德逊，享年92岁。",
          "en": "Died in Hudson, Ohio, aged 92."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Alonzo Church",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Church/"
      },
      {
        "title": "Princeton · Alonzo Church papers",
        "href": "https://www.princeton.edu/news/2003/05/06/library-acquires-papers-eminent-mathematician"
      },
      {
        "title": "Princeton Alumni Weekly · Alonzo Church",
        "href": "https://paw.princeton.edu/memorial/alonzo-church-24-27"
      }
    ]
  },
  {
    "id": "von-neumann",
    "name": {
      "zh": "冯·诺伊曼",
      "en": "von Neumann"
    },
    "fullName": "John von Neumann",
    "born": 1903,
    "died": 1957,
    "place": {
      "zh": "布达佩斯 → 哥廷根 → 普林斯顿",
      "en": "Budapest → Göttingen → Princeton"
    },
    "field": {
      "zh": "算子 · 博弈 · 计算",
      "en": "Operators · Games · Computing"
    },
    "hook": {
      "zh": "量子、博弈与计算，能否共用精确的数学语言？",
      "en": "Can precise mathematical structures connect quantum theory, games and computers?"
    },
    "summary": {
      "zh": "冯·诺伊曼在集合论、量子理论、博弈与计算之间往返。他把抽象结构用于新的科学问题，也参与组织实际计算机工程；这些成果来自多个研究共同体的交汇。",
      "en": "Von Neumann worked across set theory, quantum mechanics, games and computation. He applied abstract structures to scientific problems and helped organize computer engineering, drawing on several research communities."
    },
    "portrait": {
      "src": "/images/computer-scientists/von-neumann.jpg",
      "alt": {
        "zh": "冯·诺伊曼的资料肖像",
        "en": "Portrait of John von Neumann"
      },
      "credit": {
        "zh": "Los Alamos National Laboratory · 须署名，详见许可声明",
        "en": "Los Alamos National Laboratory · Attribution required; see notice"
      },
      "href": "https://commons.wikimedia.org/wiki/File:JohnvonNeumann-LosAlamos.jpg",
      "kind": "portrait",
      "license": {
        "label": "LANL attribution notice",
        "href": "/images/computer-scientists/von-neumann-NOTICE.txt"
      }
    },
    "achievements": [
      {
        "year": "1928",
        "title": {
          "zh": "有限零和博弈的极小极大定理",
          "en": "The minimax theorem"
        },
        "description": {
          "zh": "对有限的二人零和博弈，允许混合策略后，双方的最优保证收益相等。随机化因此具有可证明的战略意义；这一结论不能直接套给任意非零和博弈。",
          "en": "In a finite two-player zero-sum game, allowing mixed strategies makes the maximin and minimax values equal. Randomization has a precise strategic role; the statement does not directly apply to arbitrary non-zero-sum games."
        },
        "formula": "\\max_x\\min_y x^TAy=\\min_y\\max_x x^TAy"
      },
      {
        "year": "1932",
        "title": {
          "zh": "量子理论的希尔伯特空间框架",
          "en": "A Hilbert-space framework for quantum theory"
        },
        "description": {
          "zh": "把态、可观测量与测量概率放进希尔伯特空间和算子语言中，系统整理量子力学的数学基础。涉及无界算子时，定义域等分析条件十分关键。",
          "en": "States, observables and measurement probabilities were organized through Hilbert spaces and operators. For unbounded operators, domains and other analytic conditions are essential parts of the framework."
        }
      },
      {
        "year": "1945",
        "title": {
          "zh": "EDVAC 报告与存储程序思想",
          "en": "The EDVAC report and stored programs"
        },
        "description": {
          "zh": "报告系统描述把指令与数据存入电子计算机内存的设计。它推动了计算机结构的发展，但来自与工程师共同进行的工作，不能把整项发明归于一个人。",
          "en": "The report described storing instructions and data in an electronic computer’s memory. It influenced computer architecture, while reflecting collaborative work with engineers rather than a solitary invention."
        }
      }
    ],
    "timeline": [
      {
        "year": "1903",
        "text": {
          "zh": "生于布达佩斯。",
          "en": "Born in Budapest."
        }
      },
      {
        "year": "1926",
        "text": {
          "zh": "获布达佩斯数学博士及苏黎世化学工程学位。",
          "en": "Earned a mathematics doctorate in Budapest and an engineering diploma in Zurich."
        }
      },
      {
        "year": "1933",
        "text": {
          "zh": "成为普林斯顿高等研究院首批教授之一。",
          "en": "Joined the initial faculty of the Institute for Advanced Study."
        }
      },
      {
        "year": "1957",
        "text": {
          "zh": "卒于华盛顿特区，享年53岁。",
          "en": "Died in Washington, D.C., aged 53."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · John von Neumann",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Von_Neumann/"
      },
      {
        "title": "IAS · John von Neumann: Life, Work, and Legacy",
        "href": "https://www.ias.edu/von-neumann"
      },
      {
        "title": "IAS · Electronic Computer Project records",
        "href": "https://www.ias.edu/sites/default/files/library/page/ECP.html"
      }
    ]
  },
  {
    "id": "godel",
    "name": {
      "zh": "哥德尔",
      "en": "Gödel"
    },
    "fullName": "Kurt Gödel",
    "born": 1906,
    "died": 1978,
    "place": {
      "zh": "布尔诺 → 维也纳 → 普林斯顿",
      "en": "Brno → Vienna → Princeton"
    },
    "field": {
      "zh": "数理逻辑 · 集合论",
      "en": "Mathematical logic · Set theory"
    },
    "hook": {
      "zh": "所有正确命题，都能在同一套规则里证明吗？",
      "en": "Can one fixed set of rules prove every truth?"
    },
    "summary": {
      "zh": "哥德尔把「证明本身」变成数学对象。他区分逻辑规则的完备性与特定公理体系的不完备性，并用可构造集合研究选择公理和连续统假设。",
      "en": "Gödel made proofs themselves mathematical objects. He separated the completeness of first-order logic from incompleteness of particular arithmetic theories, and studied set-theoretic consistency through constructible sets."
    },
    "portrait": {
      "src": "/images/computer-scientists/godel.jpg",
      "alt": {
        "zh": "哥德尔的资料肖像",
        "en": "Portrait of Kurt Gödel"
      },
      "credit": {
        "zh": "Unknown photographer · c. 1926 · Public domain",
        "en": "Unknown photographer · c. 1926 · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Kurt_g%C3%B6del.jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1929–1930",
        "title": {
          "zh": "一阶逻辑的完备性",
          "en": "Completeness of first-order logic"
        },
        "description": {
          "zh": "若一个一阶句子在某理论的所有模型中都成立，它就能由该理论形式证明。这是语义与推演之间的桥梁，不是说每个理论都能决定每个句子。",
          "en": "A first-order sentence true in every model of a theory is formally derivable from it. This links semantics and proof; it does not say that every theory decides every sentence."
        },
        "formula": "T\\models\\varphi\\;\\Longrightarrow\\;T\\vdash\\varphi"
      },
      {
        "year": "1931",
        "title": {
          "zh": "不完备性定理",
          "en": "Incompleteness theorems"
        },
        "description": {
          "zh": "用现代常见表述：任何一致、可有效公理化且足以表达基本算术的理论，都有不可判定命题；满足通常条件时，它也不能证明自身的一致性。这里的条件不能省略。",
          "en": "In a standard modern formulation, a consistent, effectively axiomatized theory sufficiently strong for arithmetic is incomplete. Under the usual derivability conditions, it cannot prove its own consistency."
        }
      },
      {
        "year": "1938–1940",
        "title": {
          "zh": "可构造宇宙与相对一致性",
          "en": "Constructibility and relative consistency"
        },
        "description": {
          "zh": "构造集合论中的 L，并证明：若 ZF 一致，则加入选择公理和广义连续统假设仍一致。这没有证明它们能从 ZF 推出，也没有证明 ZF 本身一致。",
          "en": "The constructible universe L shows that if ZF is consistent, adding choice and the generalized continuum hypothesis preserves consistency. This neither derives those statements from ZF nor establishes ZF’s consistency."
        }
      }
    ],
    "timeline": [
      {
        "year": "1906",
        "text": {
          "zh": "生于布尔诺，当时属奥匈帝国。",
          "en": "Born in Brno, then in Austria-Hungary."
        }
      },
      {
        "year": "1930",
        "text": {
          "zh": "在维也纳获博士学位，导师为汉斯·哈恩。",
          "en": "Earned his Vienna doctorate under Hans Hahn."
        }
      },
      {
        "year": "1940",
        "text": {
          "zh": "定居普林斯顿，在高等研究院继续研究。",
          "en": "Settled in Princeton and continued work at the IAS."
        }
      },
      {
        "year": "1978",
        "text": {
          "zh": "卒于普林斯顿，享年71岁。",
          "en": "Died in Princeton, aged 71."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Kurt Gödel",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Godel/"
      },
      {
        "title": "Stanford Encyclopedia · Incompleteness Theorems",
        "href": "https://plato.stanford.edu/entries/goedel-incompleteness/"
      },
      {
        "title": "IAS · Kurt Gödel",
        "href": "https://www.ias.edu/scholars/godel"
      }
    ]
  },
  {
    "id": "hopper",
    "name": {
      "zh": "霍珀",
      "en": "Hopper"
    },
    "fullName": "Grace Hopper",
    "born": 1906,
    "died": 1992,
    "place": {
      "zh": "纽约 → 耶鲁 → 哈佛 → 美国海军",
      "en": "New York → Yale → Harvard → U.S. Navy"
    },
    "field": {
      "zh": "编译器 · 程序语言",
      "en": "Compilers · Programming languages"
    },
    "hook": {
      "zh": "人能否少写机器指令，多表达自己要完成的工作？",
      "en": "Can programmers describe tasks instead of spelling out machine instructions?"
    },
    "summary": {
      "zh": "霍珀将机器编程经验带入自动编程和商业语言。她通过工具、教学和标准化推动软件可用性；COBOL由委员会共同完成，不能归于单一作者。",
      "en": "Hopper brought machine-programming experience to automatic programming and business languages. Tools, teaching and standardization mattered; COBOL was a committee effort rather than one person’s invention."
    },
    "portrait": {
      "src": "/images/computer-scientists/hopper.jpg",
      "alt": {
        "zh": "霍珀的资料肖像",
        "en": "Portrait of Grace Hopper"
      },
      "credit": {
        "zh": "James S. Davis · 1984 · Commons crop · Public domain",
        "en": "James S. Davis · 1984 · Commons crop · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Commodore_Grace_M._Hopper,_USN_(covered)_head_and_shoulders_crop.jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1940年代",
        "title": {
          "zh": "Mark I程序与技术文档",
          "en": "Mark I programming and documentation"
        },
        "description": {
          "zh": "参与哈佛Mark I的程序设计，整理机器使用经验，使操作步骤能被他人理解和复用。",
          "en": "She programmed the Harvard Mark I and helped document its operation, making procedures understandable and reusable."
        }
      },
      {
        "year": "1952",
        "title": {
          "zh": "A-0自动编程系统",
          "en": "The A-0 system"
        },
        "description": {
          "zh": "把例程目录与组合程序的工作自动化，是早期编译与链接技术的重要探索；它与今天完整的高级语言编译器仍有区别。",
          "en": "A-0 automated the selection and assembly of routines, an important early step toward compilers and linkers rather than a modern compiler in every sense."
        }
      },
      {
        "year": "1957–1959",
        "title": {
          "zh": "FLOW-MATIC与商业语言",
          "en": "FLOW-MATIC and business languages"
        },
        "description": {
          "zh": "领导发展接近英语表达的商业数据处理语言，其经验影响COBOL。让不同机器上的业务逻辑更容易描述和移植。",
          "en": "She led development of an English-like business language whose experience influenced COBOL, helping separate business descriptions from individual machines."
        }
      }
    ],
    "timeline": [
      {
        "year": "1906",
        "text": {
          "zh": "生于纽约。",
          "en": "Born in New York."
        }
      },
      {
        "year": "1934",
        "text": {
          "zh": "在耶鲁获数学博士学位。",
          "en": "Earned a mathematics doctorate at Yale."
        }
      },
      {
        "year": "1944",
        "text": {
          "zh": "加入哈佛Mark I计算项目。",
          "en": "Joined the Harvard Mark I project."
        }
      },
      {
        "year": "1992",
        "text": {
          "zh": "在弗吉尼亚州去世。",
          "en": "Died in Virginia."
        }
      }
    ],
    "sources": [
      {
        "title": "IEEE Computer Society · Grace Hopper",
        "href": "https://history.computer.org/pioneers/hopper.html"
      },
      {
        "title": "MacTutor · Grace Hopper",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Hopper/"
      }
    ]
  },
  {
    "id": "zuse",
    "name": {
      "zh": "楚泽",
      "en": "Zuse"
    },
    "fullName": "Konrad Zuse",
    "born": 1910,
    "died": 1995,
    "place": {
      "zh": "柏林 → 黑森",
      "en": "Berlin → Hesse"
    },
    "field": {
      "zh": "计算机设计 · 程序语言",
      "en": "Computer design · Programming languages"
    },
    "hook": {
      "zh": "二进制运算，怎样成为能工作的机器？",
      "en": "How can binary operations become a working machine?"
    },
    "summary": {
      "zh": "楚泽用机械和继电器探索可编程计算，并提出超前的程序记法。他的机器在战争环境中发展，必须区分原机、后来重建和当时未实现的语言设计。",
      "en": "Zuse explored programmable computation with mechanical devices and relays, and proposed an early programming notation. His wartime work includes machines, later reconstructions and language designs not implemented at the time."
    },
    "portrait": {
      "src": "/images/computer-scientists/zuse.jpg",
      "alt": {
        "zh": "楚泽的资料肖像",
        "en": "Portrait of Konrad Zuse"
      },
      "credit": {
        "zh": "Wolfgang Hunscher, Dortmund · 1992 · CC BY-SA 3.0",
        "en": "Wolfgang Hunscher, Dortmund · 1992 · CC BY-SA 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Konrad_Zuse_(1992).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 3.0",
        "href": "http://creativecommons.org/licenses/by-sa/3.0/"
      }
    },
    "achievements": [
      {
        "year": "1938",
        "title": {
          "zh": "Z1的二进制机械设计",
          "en": "The binary mechanical Z1"
        },
        "description": {
          "zh": "以二进制和浮点表示组织运算与存储。机械实现并不可靠，但为后来的继电器设计提供了经验。",
          "en": "Binary floating-point representation organized calculation and memory. The mechanical implementation was unreliable, but informed later relay machines."
        }
      },
      {
        "year": "1941",
        "title": {
          "zh": "继电器计算机Z3",
          "en": "The relay-based Z3"
        },
        "description": {
          "zh": "用继电器实现自动、程序控制的浮点计算，程序从外部介质读入。其实际结构不应与后来的存储程序计算机混为一谈。",
          "en": "Relays implemented automatic program-controlled floating-point computation, with instructions read externally. Its architecture differs from later stored-program computers."
        }
      },
      {
        "year": "1940年代",
        "title": {
          "zh": "Plankalkül",
          "en": "Plankalkül"
        },
        "description": {
          "zh": "为数据结构、条件和程序步骤设计高层记法，尝试把算法与具体机器分离。当时主要是设计手稿，实作发生在更晚时期。",
          "en": "He devised a higher-level notation for data, conditions and procedures, separating algorithms from particular machines. At the time it remained chiefly a design rather than an implemented system."
        }
      }
    ],
    "timeline": [
      {
        "year": "1910",
        "text": {
          "zh": "生于柏林。",
          "en": "Born in Berlin."
        }
      },
      {
        "year": "1935",
        "text": {
          "zh": "完成土木工程学习。",
          "en": "Completed civil-engineering studies."
        }
      },
      {
        "year": "1941",
        "text": {
          "zh": "演示Z3计算机。",
          "en": "Demonstrated the Z3."
        }
      },
      {
        "year": "1995",
        "text": {
          "zh": "在德国去世。",
          "en": "Died in Germany."
        }
      }
    ],
    "sources": [
      {
        "title": "IEEE Computer Society · Konrad Zuse",
        "href": "https://history.computer.org/pioneers/zuse.html"
      },
      {
        "title": "MacTutor · Konrad Zuse",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Zuse/"
      }
    ]
  },
  {
    "id": "turing",
    "name": {
      "zh": "图灵",
      "en": "Turing"
    },
    "fullName": "Alan Mathison Turing",
    "born": 1912,
    "died": 1954,
    "place": {
      "zh": "伦敦 → 剑桥 → 普林斯顿 → 曼彻斯特",
      "en": "London → Cambridge → Princeton → Manchester"
    },
    "field": {
      "zh": "可计算性 · 数学生物学",
      "en": "Computability · Mathematical biology"
    },
    "hook": {
      "zh": "一套机械步骤能做到什么，又永远做不到什么？",
      "en": "What can mechanical rules compute—and where do they stop?"
    },
    "summary": {
      "zh": "图灵把计算拆成读取、写入和改变状态的有限规则。他研究算法的边界，也参与密码分析与计算机设计，晚年又用微分方程探索生物图案如何形成。",
      "en": "Turing described computation through finite rules for reading, writing and changing state. He studied the limits of algorithms, worked on cryptanalysis and computers, and later used differential equations to investigate biological patterns."
    },
    "portrait": {
      "src": "/images/computer-scientists/turing.jpg",
      "alt": {
        "zh": "图灵的资料肖像",
        "en": "Portrait of Alan Mathison Turing"
      },
      "credit": {
        "zh": "Elliott & Fry · 1951 · Public domain",
        "en": "Elliott & Fry · 1951 · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Alan_turing_header.jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1936–1937",
        "title": {
          "zh": "通用机器与不可判定性",
          "en": "Universal machines and undecidability"
        },
        "description": {
          "zh": "图灵机将算法写成有限规则；通用机器可模拟其他机器。论文也证明一般机械判定程序存在根本限制，现代停机问题是这类限制的典型表述。",
          "en": "A Turing machine expresses an algorithm through finite rules, and a universal machine simulates other machines. The paper also establishes fundamental limits on general decision procedures, exemplified today by the halting problem."
        }
      },
      {
        "year": "1950",
        "title": {
          "zh": "把机器智能变成可讨论的实验",
          "en": "An operational question about machine intelligence"
        },
        "description": {
          "zh": "用模仿游戏重新组织「机器能否思考」的问题，讨论学习机器和可能的反对意见。这是一种研究提议，不是智能的数学充要定义。",
          "en": "The imitation game reframed questions about machine intelligence through an experimental setup, alongside proposals for learning machines. It is a research proposal, not a mathematical characterization of intelligence."
        }
      },
      {
        "year": "1952",
        "title": {
          "zh": "反应与扩散产生图案",
          "en": "Patterns from reaction and diffusion"
        },
        "description": {
          "zh": "在适当的反应速率与扩散条件下，原本均匀的化学系统可因扩散而失稳，形成空间图案。模型解释一种成形机制，并不声称所有生物花纹都来自同一机制。",
          "en": "With suitable reaction kinetics and diffusion rates, diffusion can destabilize a uniform chemical state and create spatial patterns. This models one mechanism of morphogenesis, not a universal explanation of biological patterns."
        },
        "formula": "\\partial_t u=D_u\\Delta u+f(u,v)"
      }
    ],
    "timeline": [
      {
        "year": "1912",
        "text": {
          "zh": "生于伦敦。",
          "en": "Born in London."
        }
      },
      {
        "year": "1938",
        "text": {
          "zh": "在普林斯顿获博士学位，导师为丘奇。",
          "en": "Earned his Princeton doctorate under Alonzo Church."
        }
      },
      {
        "year": "1939–1945",
        "text": {
          "zh": "在布莱切利园参与战时密码分析。",
          "en": "Worked on wartime cryptanalysis at Bletchley Park."
        }
      },
      {
        "year": "1954",
        "text": {
          "zh": "卒于英国威尔姆斯洛，终年41岁。",
          "en": "Died in Wilmslow, England, aged 41."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Alan Turing",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Turing/"
      },
      {
        "title": "Turing · On Computable Numbers (1936–1937)",
        "href": "https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf"
      },
      {
        "title": "Oxford Mathematics · Turing’s morphogenesis",
        "href": "https://www.maths.ox.ac.uk/outreach/oxford-mathematics-alphabet/m-morphogenesis"
      }
    ]
  },
  {
    "id": "wilkes",
    "name": {
      "zh": "威尔克斯",
      "en": "Wilkes"
    },
    "fullName": "Maurice Wilkes",
    "born": 1913,
    "died": 2010,
    "place": {
      "zh": "达德利 → 剑桥",
      "en": "Dudley → Cambridge"
    },
    "field": {
      "zh": "存储程序 · 微程序",
      "en": "Stored programs · Microprogramming"
    },
    "hook": {
      "zh": "机器能算之外，怎样让人们真正用起来？",
      "en": "Beyond making a computer run, how can people use it?"
    },
    "summary": {
      "zh": "威尔克斯领导EDSAC项目，并把程序库、微程序等想法引入实际系统。他将计算服务和可维护的设计视为同样重要的研究。",
      "en": "Wilkes led EDSAC and developed ideas including program libraries and microprogramming, connecting practical computing services with maintainable system design."
    },
    "portrait": {
      "src": "/images/computer-scientists/wilkes.jpg",
      "alt": {
        "zh": "威尔克斯的资料肖像",
        "en": "Portrait of Maurice Wilkes"
      },
      "credit": {
        "zh": "Computer Laboratory, University of Cambridge; photographer unrecorded · 1980 · Commons crop · CC BY 2.0 uk",
        "en": "Computer Laboratory, University of Cambridge; photographer unrecorded · 1980 · Commons crop · CC BY 2.0 uk"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Maurice_Vincent_Wilkes_1980_(3,_cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY 2.0 uk",
        "href": "https://creativecommons.org/licenses/by/2.0/uk/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1949",
        "title": {
          "zh": "EDSAC",
          "en": "EDSAC"
        },
        "description": {
          "zh": "领导建成早期可实用的电子存储程序计算机，为剑桥研究人员提供计算服务。它不是全部现代计算机的唯一原型。",
          "en": "He led construction of an early practical electronic stored-program computer that served Cambridge researchers, one of several important early designs."
        }
      },
      {
        "year": "1951",
        "title": {
          "zh": "程序库与子程序方法",
          "en": "Libraries and subroutines"
        },
        "description": {
          "zh": "与惠勒、吉尔合著程序设计手册，组织可复用例程、输入和调试方法，让编程经验成为公共工具。",
          "en": "With Wheeler and Gill, he organized reusable routines, input conventions and debugging in a programming handbook."
        }
      },
      {
        "year": "1951",
        "title": {
          "zh": "微程序控制",
          "en": "Microprogrammed control"
        },
        "description": {
          "zh": "将处理器控制步骤表示为较低层次的控制存储内容，区分机器指令与执行它的微操作。",
          "en": "Control-store sequences describe how machine instructions are carried out, separating the instruction set from lower-level control operations."
        }
      }
    ],
    "timeline": [
      {
        "year": "1913",
        "text": {
          "zh": "生于英国达德利。",
          "en": "Born in Dudley, England."
        }
      },
      {
        "year": "1936",
        "text": {
          "zh": "在剑桥获博士学位。",
          "en": "Earned his Cambridge doctorate."
        }
      },
      {
        "year": "1949",
        "text": {
          "zh": "EDSAC运行首批程序。",
          "en": "EDSAC ran its first programs."
        }
      },
      {
        "year": "2010",
        "text": {
          "zh": "在剑桥去世。",
          "en": "Died in Cambridge."
        }
      }
    ],
    "sources": [
      {
        "title": "Cambridge · Maurice Wilkes biography",
        "href": "https://www.cl.cam.ac.uk/archive/mvw1/short-biography.html"
      },
      {
        "title": "IEEE Computer Society · Maurice Wilkes",
        "href": "https://history.computer.org/pioneers/wilkes.html"
      }
    ]
  },
  {
    "id": "shannon",
    "name": {
      "zh": "香农",
      "en": "Shannon"
    },
    "fullName": "Claude Elwood Shannon",
    "born": 1916,
    "died": 2001,
    "place": {
      "zh": "密歇根 → 麻省理工 → 贝尔实验室",
      "en": "Michigan → MIT → Bell Labs"
    },
    "field": {
      "zh": "信息论 · 逻辑电路",
      "en": "Information theory · Switching circuits"
    },
    "hook": {
      "zh": "消息能压缩多少，又能在噪声中传多快？",
      "en": "How far can messages be compressed or sent through noise?"
    },
    "summary": {
      "zh": "香农把通信问题分解成符号、概率、编码与噪声。他先用布尔代数分析开关电路，再给信息的压缩与可靠传输建立可计算的极限。",
      "en": "Shannon expressed communication through symbols, probabilities, coding and noise. Starting with Boolean analysis of switching circuits, he established limits on compression and reliable transmission."
    },
    "portrait": {
      "src": "/images/computer-scientists/shannon.jpg",
      "alt": {
        "zh": "香农的资料肖像",
        "en": "Portrait of Claude Elwood Shannon"
      },
      "credit": {
        "zh": "Unknown photographer / Tekniska museet · date unrecorded · Commons crop · CC BY 2.0",
        "en": "Unknown photographer / Tekniska museet · date unrecorded · Commons crop · CC BY 2.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:C.E._Shannon._Tekniska_museet_43069_(2x3_crop).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY 2.0",
        "href": "https://creativecommons.org/licenses/by/2.0"
      }
    },
    "achievements": [
      {
        "year": "1937–1938",
        "title": {
          "zh": "用布尔代数设计电路",
          "en": "Boolean algebra for switching circuits"
        },
        "description": {
          "zh": "把继电器的开与关表示为逻辑状态，用代数运算分析和简化电路。1937年的硕士论文、1938年的发表版本，连接了抽象逻辑与工程设计。",
          "en": "Switching states of relays can be represented logically and circuits analyzed algebraically. His 1937 master’s thesis, published in 1938, connected abstract Boolean logic with circuit design."
        }
      },
      {
        "year": "1948",
        "title": {
          "zh": "熵与无损压缩的极限",
          "en": "Entropy and lossless compression"
        },
        "description": {
          "zh": "对有限离散分布，熵衡量平均不确定性，约定0 log 0=0。对独立同分布信源，足够长的分组编码可让平均码长逼近熵；熵不衡量一句话的意义或价值。",
          "en": "For a finite discrete distribution, entropy measures average uncertainty, with 0 log 0=0. Long block codes for an independent identically distributed source approach this lossless rate; entropy does not measure semantic value."
        },
        "formula": "H(X)=-\\sum_xp(x)\\log_2p(x)"
      },
      {
        "year": "1948",
        "title": {
          "zh": "有噪声信道的容量",
          "en": "Capacity of a noisy channel"
        },
        "description": {
          "zh": "对离散无记忆信道，若码率低于容量，可用足够长的编码把错误概率压到任意小。结论讲的是渐近可靠性，不是任何有限码长都能做到零错误。",
          "en": "For a discrete memoryless channel, rates below capacity permit arbitrarily small error probability with sufficiently long codes. This is an asymptotic guarantee, not zero error at every finite block length."
        },
        "formula": "C=\\max_{p(x)} I(X;Y)"
      }
    ],
    "timeline": [
      {
        "year": "1916",
        "text": {
          "zh": "生于美国密歇根州。",
          "en": "Born in Michigan, USA."
        }
      },
      {
        "year": "1940",
        "text": {
          "zh": "在麻省理工完成数学博士与电气工程硕士学位。",
          "en": "Completed a mathematics doctorate and electrical-engineering master’s degree at MIT."
        }
      },
      {
        "year": "1941–1956",
        "text": {
          "zh": "在贝尔实验室工作，随后回到MIT任教。",
          "en": "Worked at Bell Labs, then returned to teach at MIT."
        }
      },
      {
        "year": "2001",
        "text": {
          "zh": "卒于马萨诸塞州，享年84岁。",
          "en": "Died in Massachusetts, aged 84."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Claude Shannon",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Shannon/"
      },
      {
        "title": "Shannon · A Mathematical Theory of Communication (1948)",
        "href": "https://web.mit.edu/6.976/www/handout/shannon.pdf"
      }
    ]
  },
  {
    "id": "simon",
    "name": {
      "zh": "西蒙",
      "en": "Simon"
    },
    "fullName": "Herbert A. Simon",
    "born": 1916,
    "died": 2001,
    "place": {
      "zh": "密尔沃基 → 芝加哥 → 匹兹堡",
      "en": "Milwaukee → Chicago → Pittsburgh"
    },
    "field": {
      "zh": "认知 · 决策 · 人工智能",
      "en": "Cognition · Decision-making · AI"
    },
    "hook": {
      "zh": "现实中的决策者，真的能搜索所有可能性吗？",
      "en": "Can real decision-makers search every possibility?"
    },
    "summary": {
      "zh": "西蒙把有限资源下的决策与计算机模型联系起来。他与纽厄尔等人研究符号求解和人类思维，让经济学、心理学与人工智能相互对话。",
      "en": "Simon connected resource-limited decision-making with computational models, collaborating on symbolic problem solving and human cognition across economics, psychology and AI."
    },
    "portrait": {
      "src": "/images/computer-scientists/simon.jpg",
      "alt": {
        "zh": "西蒙的资料肖像",
        "en": "Portrait of Herbert A. Simon"
      },
      "credit": {
        "zh": "Rochester Institute of Technology · 1981 publication · Public domain",
        "en": "Rochester Institute of Technology · 1981 publication · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Herbert_Simon,_RIT_NandE_Vol13Num11_1981_Mar19_Complete.jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1955",
        "title": {
          "zh": "有限理性",
          "en": "Bounded rationality"
        },
        "description": {
          "zh": "强调信息、时间和计算能力会限制决策，研究满意解如何替代无法执行的全局最优搜索。",
          "en": "Limited information, time and computation constrain decisions; satisficing offers an alternative to impractical exhaustive optimization."
        }
      },
      {
        "year": "1956–1959",
        "title": {
          "zh": "早期符号问题求解程序",
          "en": "Early symbolic problem-solving programs"
        },
        "description": {
          "zh": "与纽厄尔、肖合作开发逻辑理论机和GPS，将启发式搜索写成程序并与人类任务表现比较。",
          "en": "With Newell and Shaw, he developed Logic Theorist and GPS, making heuristic search executable and comparable to human performance."
        }
      },
      {
        "year": "1972",
        "title": {
          "zh": "人类问题求解的计算研究",
          "en": "Computational studies of human problem solving"
        },
        "description": {
          "zh": "与纽厄尔用口述过程、任务实验和程序模型研究问题空间，不把单个成功演示当作所有认知活动的解释。",
          "en": "With Newell, he combined verbal protocols, task experiments and computational models to study problem spaces without equating one demonstration with all cognition."
        }
      }
    ],
    "timeline": [
      {
        "year": "1916",
        "text": {
          "zh": "生于密尔沃基。",
          "en": "Born in Milwaukee."
        }
      },
      {
        "year": "1943",
        "text": {
          "zh": "在芝加哥大学获博士学位。",
          "en": "Earned his doctorate at Chicago."
        }
      },
      {
        "year": "1949",
        "text": {
          "zh": "到卡内基理工任教。",
          "en": "Joined Carnegie Tech."
        }
      },
      {
        "year": "2001",
        "text": {
          "zh": "在匹兹堡去世。",
          "en": "Died in Pittsburgh."
        }
      }
    ],
    "sources": [
      {
        "title": "Carnegie Mellon · Herbert Simon",
        "href": "https://www.cs.cmu.edu/simon/"
      },
      {
        "title": "Nobel · Herbert Simon autobiographical account",
        "href": "https://www.nobelprize.org/prizes/economic-sciences/1978/simon/biographical/"
      },
      {
        "title": "CMU Libraries · Newell and Simon collaboration",
        "href": "https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell"
      }
    ]
  },
  {
    "id": "codd",
    "name": {
      "zh": "科德",
      "en": "Codd"
    },
    "fullName": "Edgar F. Codd",
    "born": 1923,
    "died": 2003,
    "place": {
      "zh": "英格兰 → 牛津 → IBM",
      "en": "England → Oxford → IBM"
    },
    "field": {
      "zh": "数据库 · 关系模型",
      "en": "Databases · Relational model"
    },
    "hook": {
      "zh": "查询数据，为什么必须知道它存在哪条链上？",
      "en": "Why should a query depend on how records are physically linked?"
    },
    "summary": {
      "zh": "科德把数据库用户与底层存储结构分开，用数学关系和明确操作组织数据。这种数据独立性成为关系数据库的核心。",
      "en": "Codd separated database users from physical storage through mathematical relations and explicit operations, making data independence central to relational databases."
    },
    "portrait": {
      "src": "/images/computer-scientists/codd.svg",
      "alt": {
        "zh": "Edgar F. Codd的姓名字标，非肖像",
        "en": "Lettermark for Edgar F. Codd, not a portrait"
      },
      "credit": {
        "zh": "原创姓名字标；未使用缺乏可靠开放授权的肖像",
        "en": "Original lettermark; no verified openly licensed portrait used"
      },
      "href": "https://www.ibm.com/history/relational-database",
      "kind": "monogram"
    },
    "achievements": [
      {
        "year": "1970",
        "title": {
          "zh": "关系数据模型",
          "en": "The relational data model"
        },
        "description": {
          "zh": "以关系表示数据及其联系，让用户声明需要的结果，而不是沿具体存储指针导航。实际SQL系统并不与纯关系模型完全相同。",
          "en": "Relations represent data and associations so users describe results rather than navigate storage pointers. Practical SQL systems are not identical to the pure relational model."
        }
      },
      {
        "year": "1970–1972",
        "title": {
          "zh": "规范化与依赖关系",
          "en": "Normalization and dependencies"
        },
        "description": {
          "zh": "研究属性间的依赖怎样导致重复和更新异常，再通过分解改善结构。正确分解需考虑信息保持与依赖约束。",
          "en": "Dependencies can cause redundancy and update anomalies. Decomposition improves design when information preservation and constraints are properly considered."
        }
      },
      {
        "year": "1972",
        "title": {
          "zh": "关系查询的表达能力",
          "en": "Expressiveness of relational query languages"
        },
        "description": {
          "zh": "比较关系代数与关系演算，给查询语言提供明确的表达能力标尺。「关系完备」并不等同于通用计算的图灵完备。",
          "en": "Relational algebra and calculus provide a benchmark for query expressiveness. Relational completeness is distinct from Turing completeness."
        }
      }
    ],
    "timeline": [
      {
        "year": "1923",
        "text": {
          "zh": "生于英国波特兰岛。",
          "en": "Born on the Isle of Portland, England."
        }
      },
      {
        "year": "1949",
        "text": {
          "zh": "加入IBM。",
          "en": "Joined IBM."
        }
      },
      {
        "year": "1970",
        "text": {
          "zh": "发表关系数据模型论文。",
          "en": "Published the relational-model paper."
        }
      },
      {
        "year": "2003",
        "text": {
          "zh": "在加州去世。",
          "en": "Died in California."
        }
      }
    ],
    "sources": [
      {
        "title": "IBM Research · Relational model paper",
        "href": "https://research.ibm.com/publications/a-relational-model-of-data-for-large-shared-data-banks"
      },
      {
        "title": "IBM · Relational database history",
        "href": "https://www.ibm.com/history/relational-database"
      }
    ]
  },
  {
    "id": "xia-peisu",
    "name": {
      "zh": "夏培肃",
      "en": "Xia Peisu"
    },
    "fullName": "Xia Peisu",
    "born": 1923,
    "died": 2014,
    "place": {
      "zh": "重庆 → 爱丁堡 → 北京",
      "en": "Chongqing → Edinburgh → Beijing"
    },
    "field": {
      "zh": "计算机设计 · 可靠性 · 教育",
      "en": "Computer design · Reliability · Education"
    },
    "hook": {
      "zh": "把计算原理变成可靠整机，需要跨过哪些细节？",
      "en": "What turns a computing design into a reliable working machine?"
    },
    "summary": {
      "zh": "夏培肃在中国早期计算机研究中贯通功能、逻辑、电路与工程实现。她主持107机设计，也以教材、训练班和研究生培养建设研究能力。",
      "en": "Xia connected functional, logical, circuit and engineering design in early Chinese computing. She led the Model 107 project and developed research capacity through teaching and training."
    },
    "portrait": {
      "src": "/images/computer-scientists/xia-peisu.jpg",
      "alt": {
        "zh": "夏培肃的资料肖像",
        "en": "Portrait of Xia Peisu"
      },
      "credit": {
        "zh": "Unknown photographer · 1946 · Public domain",
        "en": "Unknown photographer · 1946 · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Xia_Peisu.jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1958–1960",
        "title": {
          "zh": "107计算机的整体设计",
          "en": "The Model 107 computer"
        },
        "description": {
          "zh": "主持中国早期自主设计通用电子数字计算机的功能、逻辑和工程设计，并参与调试。采用存储程序架构，不能与更早的仿制机混为一台。",
          "en": "She led functional, logical and engineering design of an early domestically designed general-purpose electronic computer in China, distinct from earlier reproduced machines."
        }
      },
      {
        "year": "1960",
        "title": {
          "zh": "可靠存储与电路设计",
          "en": "Reliable storage and circuit design"
        },
        "description": {
          "zh": "改用磁心存储并设计稳定电路，处理电子管系统运行不稳定的问题，使107机能够长时间连续运行。",
          "en": "Core memory and stabilized circuitry addressed unreliable operation in a vacuum-tube system, allowing extended continuous operation."
        }
      },
      {
        "year": "1950年代起",
        "title": {
          "zh": "计算机原理教学体系",
          "en": "Teaching computer principles"
        },
        "description": {
          "zh": "组织训练班、编写原理与程序设计讲义，并将107机用于教学。她把设计经验转成可以被下一代继续使用的知识。",
          "en": "Training courses, notes on principles and programming, and practical use of the 107 turned engineering experience into transferable knowledge."
        }
      }
    ],
    "timeline": [
      {
        "year": "1923",
        "text": {
          "zh": "生于重庆。",
          "en": "Born in Chongqing."
        }
      },
      {
        "year": "1950",
        "text": {
          "zh": "在爱丁堡完成博士学位。",
          "en": "Completed her doctorate at Edinburgh."
        }
      },
      {
        "year": "1960",
        "text": {
          "zh": "107机通过调试并投入教学科研。",
          "en": "The Model 107 entered teaching and research service."
        }
      },
      {
        "year": "2014",
        "text": {
          "zh": "在北京去世。",
          "en": "Died in Beijing."
        }
      }
    ],
    "sources": [
      {
        "title": "Chinese Academy of Sciences · Xia Peisu",
        "href": "https://www.cas.cn/xzfc/202302/t20230210_4874534.shtml"
      },
      {
        "title": "USTC · Xia Peisu oral history",
        "href": "https://arch.ustc.edu.cn/2023/0905/c30534a611227/page.htm"
      },
      {
        "title": "China Scientists Museum · Xia and Model 107",
        "href": "https://mmcs.cast.org.cn/kxjfc/kxjfc/xps/bd4300/art/2023/art_a0dd1a9a70584ab098127d1019640568.html"
      }
    ]
  },
  {
    "id": "backus",
    "name": {
      "zh": "巴科斯",
      "en": "Backus"
    },
    "fullName": "John Backus",
    "born": 1924,
    "died": 2007,
    "place": {
      "zh": "费城 → 哥伦比亚 → IBM",
      "en": "Philadelphia → Columbia → IBM"
    },
    "field": {
      "zh": "编译器 · 语言描述",
      "en": "Compilers · Language specification"
    },
    "hook": {
      "zh": "高级语言能否生成足够高效的机器代码？",
      "en": "Can a high-level language produce efficient machine code?"
    },
    "summary": {
      "zh": "巴科斯领导FORTRAN团队，把科学公式写法与高质量编译连接起来。后来他又研究语法记法和函数式程序构造，反思编程语言的基本形式。",
      "en": "Backus led the FORTRAN team, connecting scientific notation with efficient compilation. He later explored grammar notation and functional programming as alternatives for organizing programs."
    },
    "portrait": {
      "src": "/images/computer-scientists/backus.jpg",
      "alt": {
        "zh": "巴科斯的资料肖像",
        "en": "Portrait of John Backus"
      },
      "credit": {
        "zh": "PIerre.Lescanne · 1989 · CC BY-SA 4.0",
        "en": "PIerre.Lescanne · 1989 · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:John_Backus_2.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1957",
        "title": {
          "zh": "FORTRAN编译器",
          "en": "The FORTRAN compiler"
        },
        "description": {
          "zh": "团队使公式式科学程序能够自动转成高效机器码，证明高级语言可以成为实际工作工具。",
          "en": "His team translated formula-oriented scientific programs into efficient machine code, demonstrating the practical value of higher-level languages."
        }
      },
      {
        "year": "1959–1960",
        "title": {
          "zh": "BNF语法记法",
          "en": "Backus–Naur Form"
        },
        "description": {
          "zh": "为ALGOL的语法描述发展形式记法，经彼得·瑙尔等人改进。递归产生式能够精确说明哪些符号串符合语言结构。",
          "en": "A formal notation for ALGOL syntax, developed further by Peter Naur and others, describes valid structures through recursive productions."
        }
      },
      {
        "year": "1977–1978",
        "title": {
          "zh": "函数级程序构造",
          "en": "Function-level programming"
        },
        "description": {
          "zh": "研究用组合函数来组织程序和推理，批评过度围绕逐步修改内存的编程方式。这是一种设计方向，不意味着状态式程序没有价值。",
          "en": "He explored programs built from function combinations and criticized overreliance on changing memory state, proposing an alternative rather than eliminating stateful computation."
        }
      }
    ],
    "timeline": [
      {
        "year": "1924",
        "text": {
          "zh": "生于费城。",
          "en": "Born in Philadelphia."
        }
      },
      {
        "year": "1950",
        "text": {
          "zh": "获哥伦比亚数学硕士并加入IBM。",
          "en": "Earned a Columbia mathematics master’s degree and joined IBM."
        }
      },
      {
        "year": "1953–1957",
        "text": {
          "zh": "领导FORTRAN开发。",
          "en": "Led FORTRAN development."
        }
      },
      {
        "year": "2007",
        "text": {
          "zh": "在俄勒冈州去世。",
          "en": "Died in Oregon."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · John Backus",
        "href": "https://computerhistory.org/profile/john-backus/"
      },
      {
        "title": "Alex Aiken · John Backus",
        "href": "https://theory.stanford.edu/~aiken/other/backus.pdf"
      },
      {
        "title": "Backus · The history of FORTRAN",
        "href": "https://softwarepreservation.computerhistory.org/FORTRAN/paper/p45-backus.pdf"
      }
    ]
  },
  {
    "id": "mccarthy",
    "name": {
      "zh": "麦卡锡",
      "en": "McCarthy"
    },
    "fullName": "John McCarthy",
    "born": 1927,
    "died": 2011,
    "place": {
      "zh": "波士顿 → 普林斯顿 → MIT → 斯坦福",
      "en": "Boston → Princeton → MIT → Stanford"
    },
    "field": {
      "zh": "人工智能 · Lisp · 逻辑",
      "en": "Artificial intelligence · Lisp · Logic"
    },
    "hook": {
      "zh": "程序怎样表示知识，而不只执行算术？",
      "en": "How can programs represent knowledge rather than merely calculate?"
    },
    "summary": {
      "zh": "麦卡锡把符号处理、逻辑与通用计算连接起来。他参与组织人工智能研究共同体，发展Lisp，并追问常识如何进入形式系统。",
      "en": "McCarthy connected symbolic processing, logic and general computation, helping organize AI research, developing Lisp and studying formal accounts of commonsense knowledge."
    },
    "portrait": {
      "src": "/images/computer-scientists/mccarthy.jpg",
      "alt": {
        "zh": "麦卡锡的资料肖像",
        "en": "Portrait of John McCarthy"
      },
      "credit": {
        "zh": "\"null0\" · 2006 · CC BY-SA 2.0",
        "en": "\"null0\" · 2006 · CC BY-SA 2.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:John_McCarthy_Stanford.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0",
        "href": "https://creativecommons.org/licenses/by-sa/2.0"
      }
    },
    "achievements": [
      {
        "year": "1958–1960",
        "title": {
          "zh": "Lisp",
          "en": "Lisp"
        },
        "description": {
          "zh": "用列表、递归函数和符号表达式组织计算，程序和数据可以具有相近的表示形式。",
          "en": "Lists, recursive functions and symbolic expressions organize computation, allowing related representations of programs and data."
        }
      },
      {
        "year": "1959–1961",
        "title": {
          "zh": "通用分时计算的倡议",
          "en": "Advancing general-purpose time sharing"
        },
        "description": {
          "zh": "推动让多个用户交互使用计算机的想法，与实际系统团队一起改变批处理为主的工作方式。分时系统并非一人独创。",
          "en": "He advocated interactive access for multiple users, alongside teams building actual systems that went beyond batch processing."
        }
      },
      {
        "year": "1963–1969",
        "title": {
          "zh": "情境演算与常识推理",
          "en": "Situation calculus and commonsense reasoning"
        },
        "description": {
          "zh": "与合作者用逻辑表达行动、情境和变化，研究推理系统怎样说明行动前后什么改变、什么保持。",
          "en": "Logical accounts of actions and situations study what changes and what remains true after actions, an important problem in commonsense reasoning."
        }
      }
    ],
    "timeline": [
      {
        "year": "1927",
        "text": {
          "zh": "生于波士顿。",
          "en": "Born in Boston."
        }
      },
      {
        "year": "1951",
        "text": {
          "zh": "在普林斯顿获数学博士学位。",
          "en": "Earned a mathematics doctorate at Princeton."
        }
      },
      {
        "year": "1956",
        "text": {
          "zh": "参与组织达特茅斯人工智能研究讨论班。",
          "en": "Helped organize the Dartmouth AI workshop."
        }
      },
      {
        "year": "2011",
        "text": {
          "zh": "在加州去世。",
          "en": "Died in California."
        }
      }
    ],
    "sources": [
      {
        "title": "Stanford · John McCarthy",
        "href": "https://www-formal.stanford.edu/jmc/personal.html"
      },
      {
        "title": "McCarthy · Recursive Functions of Symbolic Expressions",
        "href": "https://www-formal.stanford.edu/jmc/recursive.html"
      },
      {
        "title": "McCarthy et al. · Dartmouth proposal",
        "href": "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html"
      }
    ]
  },
  {
    "id": "minsky",
    "name": {
      "zh": "明斯基",
      "en": "Minsky"
    },
    "fullName": "Marvin Minsky",
    "born": 1927,
    "died": 2016,
    "place": {
      "zh": "纽约 → 哈佛 → 普林斯顿 → MIT",
      "en": "New York → Harvard → Princeton → MIT"
    },
    "field": {
      "zh": "人工智能 · 知识表示",
      "en": "Artificial intelligence · Knowledge representation"
    },
    "hook": {
      "zh": "复杂智能能否由许多较简单的能力组合而成？",
      "en": "Could intelligence emerge from many simpler capabilities?"
    },
    "summary": {
      "zh": "明斯基研究学习机器、符号表示与认知结构。他既分析早期神经网络的能力限制，也提出由多种机制共同组成智能的模型。",
      "en": "Minsky studied learning machines, representations and cognitive organization, analyzing early neural-network limits and proposing intelligence built from cooperating mechanisms."
    },
    "portrait": {
      "src": "/images/computer-scientists/minsky.jpg",
      "alt": {
        "zh": "明斯基的资料肖像",
        "en": "Portrait of Marvin Minsky"
      },
      "credit": {
        "zh": "Seth Woodworth · date unrecorded · Commons crop · CC BY 3.0",
        "en": "Seth Woodworth · date unrecorded · Commons crop · CC BY 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Marvin_Minsky_at_OLPCb_(3x4_cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY 3.0",
        "href": "https://creativecommons.org/licenses/by/3.0"
      }
    },
    "achievements": [
      {
        "year": "1969",
        "title": {
          "zh": "感知机能力的数学分析",
          "en": "Analyzing perceptrons"
        },
        "description": {
          "zh": "与西摩·派珀特分析特定感知机模型的表达限制。这些结论有模型条件，不能推广成所有多层神经网络都无法学习。",
          "en": "With Seymour Papert, he analyzed representational limits of specified perceptron models, not an impossibility theorem for all multilayer neural networks."
        }
      },
      {
        "year": "1974",
        "title": {
          "zh": "框架式知识表示",
          "en": "Frames for knowledge representation"
        },
        "description": {
          "zh": "用包含槽位、默认值和关系的结构描述常见情境，研究知识如何组织以及异常情况如何处理。",
          "en": "Structured slots, defaults and relations represent familiar situations and support reasoning about exceptions."
        }
      },
      {
        "year": "1986",
        "title": {
          "zh": "《心智社会》",
          "en": "The Society of Mind"
        },
        "description": {
          "zh": "提出由许多局部机制相互作用产生智能的研究模型。它是一组解释与研究假说，不是已经证明的人脑完整理论。",
          "en": "A collection of interacting local mechanisms provides a research model of intelligence, not a proven complete theory of the brain."
        }
      }
    ],
    "timeline": [
      {
        "year": "1927",
        "text": {
          "zh": "生于纽约。",
          "en": "Born in New York."
        }
      },
      {
        "year": "1954",
        "text": {
          "zh": "在普林斯顿获数学博士学位。",
          "en": "Earned a mathematics doctorate at Princeton."
        }
      },
      {
        "year": "1958",
        "text": {
          "zh": "加入MIT。",
          "en": "Joined MIT."
        }
      },
      {
        "year": "2016",
        "text": {
          "zh": "在波士顿去世。",
          "en": "Died in Boston."
        }
      }
    ],
    "sources": [
      {
        "title": "MIT · Minsky biography",
        "href": "https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/minskybiog.html"
      },
      {
        "title": "MIT · Society of Mind course",
        "href": "https://ocw.mit.edu/courses/6-868j-the-society-of-mind-fall-2011/"
      },
      {
        "title": "Dartmouth AI research proposal",
        "href": "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html"
      }
    ]
  },
  {
    "id": "newell",
    "name": {
      "zh": "纽厄尔",
      "en": "Newell"
    },
    "fullName": "Allen Newell",
    "born": 1927,
    "died": 1992,
    "place": {
      "zh": "旧金山 → RAND → 卡内基梅隆",
      "en": "San Francisco → RAND → Carnegie Mellon"
    },
    "field": {
      "zh": "符号求解 · 认知架构",
      "en": "Symbolic problem solving · Cognitive architectures"
    },
    "hook": {
      "zh": "人的问题求解过程，能否变成可运行的模型？",
      "en": "Can human problem solving become an executable model?"
    },
    "summary": {
      "zh": "纽厄尔与西蒙、肖等人把计算机作为符号处理系统来研究。他通过程序和心理实验相互检验，探索问题求解与认知架构。",
      "en": "Newell and collaborators treated computers as symbol-processing systems, using programs and psychological experiments to study problem solving and cognitive architectures."
    },
    "portrait": {
      "src": "/images/computer-scientists/newell.svg",
      "alt": {
        "zh": "Allen Newell的姓名字标，非肖像",
        "en": "Lettermark for Allen Newell, not a portrait"
      },
      "credit": {
        "zh": "原创姓名字标；未使用缺乏可靠开放授权的肖像",
        "en": "Original lettermark; no verified openly licensed portrait used"
      },
      "href": "https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell",
      "kind": "monogram"
    },
    "achievements": [
      {
        "year": "1956",
        "title": {
          "zh": "逻辑理论机",
          "en": "Logic Theorist"
        },
        "description": {
          "zh": "与西蒙、克利夫·肖合作，用启发式搜索寻找逻辑定理的证明，展示计算机不仅可以做数值运算。",
          "en": "With Simon and Cliff Shaw, heuristic search found proofs of logical theorems, demonstrating computation beyond numerical calculation."
        }
      },
      {
        "year": "1957–1959",
        "title": {
          "zh": "通用问题求解器GPS",
          "en": "General Problem Solver"
        },
        "description": {
          "zh": "用手段—目的分析组织搜索，寻找缩小当前状态与目标差异的操作。其通用性受问题表示和启发式限制。",
          "en": "Means–ends analysis searches for operations reducing differences between current and target states, with generality limited by representation and heuristics."
        }
      },
      {
        "year": "1980年代",
        "title": {
          "zh": "Soar认知架构",
          "en": "The Soar cognitive architecture"
        },
        "description": {
          "zh": "与约翰·莱尔德、保罗·罗森布卢姆等人建立统一的任务执行与学习框架，研究知识、选择和经验积累如何配合。",
          "en": "With John Laird, Paul Rosenbloom and others, he built an architecture integrating task execution, knowledge, decisions and learning."
        }
      }
    ],
    "timeline": [
      {
        "year": "1927",
        "text": {
          "zh": "生于旧金山。",
          "en": "Born in San Francisco."
        }
      },
      {
        "year": "1950",
        "text": {
          "zh": "加入RAND，从事跨学科研究。",
          "en": "Joined RAND for interdisciplinary research."
        }
      },
      {
        "year": "1957",
        "text": {
          "zh": "在卡内基理工完成博士研究。",
          "en": "Completed his doctorate at Carnegie Tech."
        }
      },
      {
        "year": "1992",
        "text": {
          "zh": "在匹兹堡去世。",
          "en": "Died in Pittsburgh."
        }
      }
    ],
    "sources": [
      {
        "title": "Carnegie Mellon Libraries · Allen Newell",
        "href": "https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell"
      },
      {
        "title": "IEEE Computer Society · Allen Newell",
        "href": "https://www.computer.org/profiles/allen-newell"
      }
    ]
  },
  {
    "id": "dijkstra",
    "name": {
      "zh": "戴克斯特拉",
      "en": "Dijkstra"
    },
    "fullName": "Edsger W. Dijkstra",
    "born": 1930,
    "died": 2002,
    "place": {
      "zh": "鹿特丹 → 阿姆斯特丹 → 奥斯汀",
      "en": "Rotterdam → Amsterdam → Austin"
    },
    "field": {
      "zh": "算法 · 并发 · 程序推理",
      "en": "Algorithms · Concurrency · Program reasoning"
    },
    "hook": {
      "zh": "正确性可以从设计之初就进入程序吗？",
      "en": "Can correctness guide a program from the start?"
    },
    "summary": {
      "zh": "戴克斯特拉把简洁算法与严密推理放在一起。他研究路径、并发和程序结构，反复追问计算过程为什么可靠，而不是只看一次运行是否成功。",
      "en": "Dijkstra connected concise algorithms with rigorous reasoning about paths, concurrency and program structure, asking why a computation is reliable rather than merely whether one run succeeds."
    },
    "portrait": {
      "src": "/images/computer-scientists/dijkstra.jpg",
      "alt": {
        "zh": "戴克斯特拉的资料肖像",
        "en": "Portrait of Edsger W. Dijkstra"
      },
      "credit": {
        "zh": "Hamilton Richards · 2002 · CC BY-SA 3.0",
        "en": "Hamilton Richards · 2002 · CC BY-SA 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Edsger_Wybe_Dijkstra.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 3.0",
        "href": "http://creativecommons.org/licenses/by-sa/3.0/"
      }
    },
    "achievements": [
      {
        "year": "1959",
        "title": {
          "zh": "最短路径算法",
          "en": "Shortest paths"
        },
        "description": {
          "zh": "对边权非负的图，逐步确定距离最近的未定顶点；非负条件保证已经确定的距离无需再改。",
          "en": "In a graph with nonnegative edge weights, the nearest unsettled vertex can be finalized. Nonnegativity is essential to this argument."
        }
      },
      {
        "year": "1965",
        "title": {
          "zh": "并发互斥与信号量",
          "en": "Mutual exclusion and semaphores"
        },
        "description": {
          "zh": "为共享资源的并发程序提供同步抽象，研究多个进程如何避免同时进入临界区。",
          "en": "Synchronization abstractions coordinate concurrent access to shared resources and prevent simultaneous entry into critical sections."
        }
      },
      {
        "year": "1968–1976",
        "title": {
          "zh": "结构化程序与谓词变换",
          "en": "Structured programs and predicate transformers"
        },
        "description": {
          "zh": "用明确控制结构和最弱前置条件组织程序推导，把期望结果反推成输入需要满足的条件。",
          "en": "Structured control and weakest preconditions support deriving programs by reasoning backward from required results to sufficient starting conditions."
        }
      }
    ],
    "timeline": [
      {
        "year": "1930",
        "text": {
          "zh": "生于鹿特丹。",
          "en": "Born in Rotterdam."
        }
      },
      {
        "year": "1952",
        "text": {
          "zh": "在阿姆斯特丹数学中心从事编程。",
          "en": "Began programming at the Mathematical Centre in Amsterdam."
        }
      },
      {
        "year": "1984",
        "text": {
          "zh": "到得克萨斯大学奥斯汀分校任教。",
          "en": "Joined the University of Texas at Austin."
        }
      },
      {
        "year": "2002",
        "text": {
          "zh": "在荷兰去世。",
          "en": "Died in the Netherlands."
        }
      }
    ],
    "sources": [
      {
        "title": "University of Texas · Dijkstra archive",
        "href": "https://www.cs.utexas.edu/~EWD/"
      },
      {
        "title": "MacTutor · Dijkstra",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Dijkstra/"
      }
    ]
  },
  {
    "id": "rabin",
    "name": {
      "zh": "拉宾",
      "en": "Rabin"
    },
    "fullName": "Michael Oser Rabin",
    "born": 1931,
    "died": 2026,
    "place": {
      "zh": "布雷斯劳 → 耶路撒冷 → 普林斯顿 → 哈佛",
      "en": "Breslau → Jerusalem → Princeton → Harvard"
    },
    "field": {
      "zh": "自动机 · 随机算法 · 密码",
      "en": "Automata · Randomized algorithms · Cryptography"
    },
    "hook": {
      "zh": "允许少量随机选择，计算会改变多少？",
      "en": "How much can carefully controlled randomness change computation?"
    },
    "summary": {
      "zh": "拉宾研究从可计算性到计算成本的转变。他把非确定性与随机化变成可分析工具，并将这些思想带入自动机、素性检验和密码。",
      "en": "Rabin studied the move from computability to computational cost, making nondeterminism and randomness analyzable tools for automata, primality testing and cryptography."
    },
    "portrait": {
      "src": "/images/computer-scientists/rabin.jpg",
      "alt": {
        "zh": "拉宾的资料肖像",
        "en": "Portrait of Michael Oser Rabin"
      },
      "credit": {
        "zh": "Konrad Jacobs / MFO · date unrecorded · CC BY-SA 2.0 de",
        "en": "Konrad Jacobs / MFO · date unrecorded · CC BY-SA 2.0 de"
      },
      "href": "https://commons.wikimedia.org/wiki/File:M_O_Rabin.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0 de",
        "href": "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1959",
        "title": {
          "zh": "有限自动机与非确定性",
          "en": "Finite automata and nondeterminism"
        },
        "description": {
          "zh": "与达纳·斯科特证明非确定性有限自动机和确定性有限自动机识别同一类语言，但状态数量可能相差巨大。",
          "en": "With Dana Scott, he showed that nondeterministic and deterministic finite automata recognize the same language class, although their state counts can differ greatly."
        }
      },
      {
        "year": "1976–1980",
        "title": {
          "zh": "随机素性检验",
          "en": "Randomized primality testing"
        },
        "description": {
          "zh": "在米勒工作的基础上发展随机检验。对奇合数，每轮独立均匀选基可把误判概率界定为至多1/4，重复检验继续降低风险。",
          "en": "Building on Miller’s work, randomized tests give at most a one-quarter error probability per independent uniformly chosen base for an odd composite; repetition reduces this bound."
        }
      },
      {
        "year": "1979",
        "title": {
          "zh": "基于平方求根的公钥方案",
          "en": "Public-key encryption from modular squaring"
        },
        "description": {
          "zh": "把模合数的平方求根与因数分解联系起来。基本映射的数学等价性不意味着未经编码处理的原始方案即可安全部署。",
          "en": "He connected square-root extraction modulo a composite with factoring. This mathematical reduction does not make the raw, unencoded construction secure for direct deployment."
        }
      }
    ],
    "timeline": [
      {
        "year": "1931",
        "text": {
          "zh": "生于布雷斯劳，今波兰弗罗茨瓦夫。",
          "en": "Born in Breslau, now Wrocław."
        }
      },
      {
        "year": "1950年代",
        "text": {
          "zh": "在普林斯顿随丘奇研究，随后与斯科特合作。",
          "en": "Studied under Church at Princeton and collaborated with Scott."
        }
      },
      {
        "year": "1981起",
        "text": {
          "zh": "在哈佛继续算法与密码研究。",
          "en": "Continued algorithmic and cryptographic research at Harvard."
        }
      },
      {
        "year": "2026",
        "text": {
          "zh": "4月14日在耶路撒冷去世。",
          "en": "Died in Jerusalem on April 14."
        }
      }
    ],
    "sources": [
      {
        "title": "IAS · Michael Rabin memorial, 2026",
        "href": "https://www.ias.edu/news/memoriam-michael-o-rabin"
      },
      {
        "title": "AMS · Church and his doctoral students",
        "href": "https://mathvoices.ams.org/featurecolumn/2024/10/01/people-and-computers-compared/"
      },
      {
        "title": "IEEE · Dana Scott and joint automata work",
        "href": "https://history.computer.org/scott.html"
      }
    ]
  },
  {
    "id": "frances-allen",
    "name": {
      "zh": "弗朗西丝·艾伦",
      "en": "Frances Allen"
    },
    "fullName": "Frances Allen",
    "born": 1932,
    "died": 2020,
    "place": {
      "zh": "纽约州 → 密歇根 → IBM",
      "en": "New York State → Michigan → IBM"
    },
    "field": {
      "zh": "编译优化 · 并行化",
      "en": "Compiler optimization · Parallelization"
    },
    "hook": {
      "zh": "编译器能否看懂整个程序，再决定怎样执行？",
      "en": "Can a compiler analyze a whole program before deciding how to execute it?"
    },
    "summary": {
      "zh": "艾伦把程序分析、优化和并行执行发展为系统方法。她既研究哪些变换保持结果，也领导把这些分析落实到实际编译器。",
      "en": "Allen developed systematic program analysis, optimization and parallelization, connecting behavior-preserving transformations with practical compilers."
    },
    "portrait": {
      "src": "/images/computer-scientists/frances-allen.jpg",
      "alt": {
        "zh": "弗朗西丝·艾伦的资料肖像",
        "en": "Portrait of Frances Allen"
      },
      "credit": {
        "zh": "Rama · 2008 · CC BY-SA 2.0 fr",
        "en": "Rama · 2008 · CC BY-SA 2.0 fr"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Allen_mg_2528-3750K-b.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0 fr",
        "href": "https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1966",
        "title": {
          "zh": "系统化程序优化",
          "en": "Systematic program optimization"
        },
        "description": {
          "zh": "以程序结构和执行信息分析优化机会，将局部技巧组织为可复用的编译方法。变换必须保持程序规定的行为。",
          "en": "Program structure and execution information guide reusable optimizations, whose transformations must preserve specified behavior."
        }
      },
      {
        "year": "1970年代",
        "title": {
          "zh": "控制流与数据流分析",
          "en": "Control-flow and data-flow analysis"
        },
        "description": {
          "zh": "研究赋值如何沿控制流传播、哪些计算可能重复或无效，为安全代码移动、消除和变换建立依据。",
          "en": "Analysis tracks how definitions flow through control paths, supporting justified code motion, elimination and transformation."
        }
      },
      {
        "year": "1980年代",
        "title": {
          "zh": "自动并行化PTRAN",
          "en": "Automatic parallelization with PTRAN"
        },
        "description": {
          "zh": "领导PTRAN项目分析程序依赖关系，寻找可以并行执行的工作。存在依赖的步骤不能仅因有多颗处理器就随意重排。",
          "en": "She led PTRAN in analyzing dependencies to identify parallel work. Dependent operations cannot be reordered merely because more processors are available."
        }
      }
    ],
    "timeline": [
      {
        "year": "1932",
        "text": {
          "zh": "生于纽约州。",
          "en": "Born in New York State."
        }
      },
      {
        "year": "1957",
        "text": {
          "zh": "取得数学硕士后加入IBM。",
          "en": "Joined IBM after a mathematics master’s degree."
        }
      },
      {
        "year": "1980年代",
        "text": {
          "zh": "领导PTRAN并行编译研究。",
          "en": "Led research on PTRAN parallel compilation."
        }
      },
      {
        "year": "2020",
        "text": {
          "zh": "8月4日去世。",
          "en": "Died on August 4."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Frances Allen",
        "href": "https://computerhistory.org/profile/frances-allen/"
      },
      {
        "title": "ACM · Fran Allen oral history",
        "href": "https://ceohp.heritage.acm.org/allenf-overview/"
      },
      {
        "title": "ACM · Compiler research citation",
        "href": "https://www.acm.org/binaries/content/assets/press-releases/2006/2006-turing-award-laureate.pdf"
      }
    ]
  },
  {
    "id": "scott",
    "name": {
      "zh": "达纳·斯科特",
      "en": "Dana Scott"
    },
    "fullName": "Dana Scott",
    "born": 1932,
    "died": null,
    "place": {
      "zh": "伯克利 → 普林斯顿 → 牛津 → 卡内基梅隆",
      "en": "Berkeley → Princeton → Oxford → Carnegie Mellon"
    },
    "field": {
      "zh": "语义 · 自动机 · 逻辑",
      "en": "Semantics · Automata · Logic"
    },
    "hook": {
      "zh": "一个程序的意义，能否独立于它的执行细节？",
      "en": "Can a program’s meaning be defined independently of its execution details?"
    },
    "summary": {
      "zh": "斯科特连接逻辑、自动机和程序语言语义。他用数学结构处理递归与部分信息，让程序的意义可以被精确比较。",
      "en": "Scott connected logic, automata and programming-language semantics, using mathematical structures for recursion and partial information to compare program meanings precisely."
    },
    "portrait": {
      "src": "/images/computer-scientists/scott.jpg",
      "alt": {
        "zh": "达纳·斯科特的资料肖像",
        "en": "Portrait of Dana Scott"
      },
      "credit": {
        "zh": "Logos Semantikos · 2026 · CC0",
        "en": "Logos Semantikos · 2026 · CC0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Dana_Scott_in_2026.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC0",
        "href": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1959",
        "title": {
          "zh": "自动机的确定性与非确定性",
          "en": "Deterministic and nondeterministic automata"
        },
        "description": {
          "zh": "与拉宾研究有限自动机及其判定问题，奠定正规语言的计算模型基础。非确定性是一种数学模型，不是机器在物理上猜中答案。",
          "en": "With Rabin, he developed finite-automaton models and decision results for regular languages. Nondeterminism is a mathematical model, not a physical machine guessing answers."
        }
      },
      {
        "year": "1969起",
        "title": {
          "zh": "域理论",
          "en": "Domain theory"
        },
        "description": {
          "zh": "用偏序结构表达信息的逐步完善，并为递归方程建立不动点解释。需要连续性等结构条件，不是任意函数都具有所需最小不动点。",
          "en": "Ordered structures model increasing information and fixed points interpret recursion. Appropriate continuity and order conditions are essential."
        }
      },
      {
        "year": "1970年代",
        "title": {
          "zh": "指称语义",
          "en": "Denotational semantics"
        },
        "description": {
          "zh": "与克里斯托弗·斯特雷奇合作，将程序构造映射为数学对象；组合后的意义由组成部分的意义决定。",
          "en": "With Christopher Strachey, he mapped program constructs to mathematical objects, giving compositional accounts of meaning."
        }
      }
    ],
    "timeline": [
      {
        "year": "1932",
        "text": {
          "zh": "生于伯克利。",
          "en": "Born in Berkeley."
        }
      },
      {
        "year": "1958",
        "text": {
          "zh": "在普林斯顿获博士学位，导师为丘奇。",
          "en": "Earned his Princeton doctorate under Church."
        }
      },
      {
        "year": "1969–1970年代",
        "text": {
          "zh": "发展域理论并与斯特雷奇研究语义。",
          "en": "Developed domain theory and worked with Strachey on semantics."
        }
      },
      {
        "year": "1982",
        "text": {
          "zh": "加入卡内基梅隆大学。",
          "en": "Joined Carnegie Mellon University."
        }
      }
    ],
    "sources": [
      {
        "title": "Carnegie Mellon · Dana Scott",
        "href": "https://www.csd.cs.cmu.edu/people/faculty/dana-scott"
      },
      {
        "title": "IEEE Computer Society · Dana Scott",
        "href": "https://history.computer.org/scott.html"
      }
    ],
    "lifeDates": {
      "zh": "1932年生",
      "en": "Born 1932"
    }
  },
  {
    "id": "hoare",
    "name": {
      "zh": "霍尔",
      "en": "Hoare"
    },
    "fullName": "Tony Hoare",
    "born": 1934,
    "died": 2026,
    "place": {
      "zh": "科伦坡 → 牛津 → 莫斯科 → 贝尔法斯特",
      "en": "Colombo → Oxford → Moscow → Belfast"
    },
    "field": {
      "zh": "程序正确性 · 算法 · 并发",
      "en": "Correctness · Algorithms · Concurrency"
    },
    "hook": {
      "zh": "怎样把“这段程序应该做什么”写成可证明的陈述？",
      "en": "How can a program’s intended behavior become a provable claim?"
    },
    "summary": {
      "zh": "霍尔把排序算法、逻辑规范和并发过程联系起来。他的工作让正确性条件成为程序的一部分，而不只是测试之后的愿望。",
      "en": "Hoare connected sorting, logical specifications and concurrent processes, making correctness conditions part of program design rather than an aspiration after testing."
    },
    "portrait": {
      "src": "/images/computer-scientists/hoare.jpg",
      "alt": {
        "zh": "霍尔的资料肖像",
        "en": "Portrait of Tony Hoare"
      },
      "credit": {
        "zh": "Rama · 2011 · CC BY-SA 2.0 fr",
        "en": "Rama · 2011 · CC BY-SA 2.0 fr"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Sir_Tony_Hoare_IMG_5125.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0 fr",
        "href": "https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1959–1962",
        "title": {
          "zh": "快速排序",
          "en": "Quicksort"
        },
        "description": {
          "zh": "用枢轴把数据分区后递归排序。随机化或合适输入假设下期望时间为O(n log n)，朴素选枢轴的最坏情形仍可达O(n²)。",
          "en": "Partition around a pivot and recurse. With randomization or suitable input assumptions the expected time is O(n log n), while naive pivot choices can still yield O(n²)."
        }
      },
      {
        "year": "1969",
        "title": {
          "zh": "霍尔逻辑",
          "en": "Hoare logic"
        },
        "description": {
          "zh": "以前置条件、程序、后置条件描述正确性。部分正确性只保证程序若终止则结果满足要求，不自动证明终止。",
          "en": "Preconditions, programs and postconditions express correctness. Partial correctness guarantees the result if execution terminates; termination needs a separate argument."
        },
        "formula": "\\{P\\}\\ C\\ \\{Q\\}"
      },
      {
        "year": "1978起",
        "title": {
          "zh": "通信顺序进程CSP",
          "en": "Communicating Sequential Processes"
        },
        "description": {
          "zh": "通过过程和通信事件描述并发行为，使同步、选择与组合能够接受形式分析。",
          "en": "Processes and communication events provide a formal language for analyzing synchronization, choice and composition."
        }
      }
    ],
    "timeline": [
      {
        "year": "1934",
        "text": {
          "zh": "生于当时的锡兰科伦坡。",
          "en": "Born in Colombo, then Ceylon."
        }
      },
      {
        "year": "1960",
        "text": {
          "zh": "加入Elliott Brothers从事编译器工作。",
          "en": "Joined Elliott Brothers to work on compilers."
        }
      },
      {
        "year": "1977",
        "text": {
          "zh": "到牛津领导计算机科学研究。",
          "en": "Moved to Oxford to lead computing research."
        }
      },
      {
        "year": "2026",
        "text": {
          "zh": "3月5日去世；牛津发布官方讣告。",
          "en": "Died on March 5; Oxford published an official memorial."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Sir Antony Hoare",
        "href": "https://computerhistory.org/profile/sir-antony-hoare/"
      },
      {
        "title": "Oxford Wolfson · Hoare memorial",
        "href": "https://www.wolfson.ox.ac.uk/news/wolfson-emeritus-fellow-professor-sir-tony-hoare-dies/"
      },
      {
        "title": "Oxford Computer Science · Tony Hoare",
        "href": "https://www.cs.ox.ac.uk/people/tony.hoare/index1.html"
      }
    ]
  },
  {
    "id": "wirth",
    "name": {
      "zh": "沃思",
      "en": "Wirth"
    },
    "fullName": "Niklaus Wirth",
    "born": 1934,
    "died": 2024,
    "place": {
      "zh": "温特图尔 → 伯克利 → 苏黎世",
      "en": "Winterthur → Berkeley → Zurich"
    },
    "field": {
      "zh": "语言设计 · 编译器 · 系统",
      "en": "Language design · Compilers · Systems"
    },
    "hook": {
      "zh": "语言与实现一起变简单，软件会获得什么？",
      "en": "What becomes possible when a language and its implementation stay simple?"
    },
    "summary": {
      "zh": "沃思把清楚的数据类型、模块和紧凑实现放在语言设计中心。他同时设计软件与工作站，强调可以理解的完整系统。",
      "en": "Wirth emphasized clear types, modules and compact implementation, designing both software and workstations as understandable complete systems."
    },
    "portrait": {
      "src": "/images/computer-scientists/wirth.jpg",
      "alt": {
        "zh": "沃思的资料肖像",
        "en": "Portrait of Niklaus Wirth"
      },
      "credit": {
        "zh": "Tyomitch · 2005 · Copyrighted free use",
        "en": "Tyomitch · 2005 · Copyrighted free use"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Niklaus_Wirth,_UrGU.jpg",
      "kind": "portrait",
      "license": {
        "label": "Copyrighted free use",
        "href": "https://commons.wikimedia.org/wiki/File:Niklaus_Wirth,_UrGU.jpg#Licensing"
      }
    },
    "achievements": [
      {
        "year": "1970",
        "title": {
          "zh": "Pascal",
          "en": "Pascal"
        },
        "description": {
          "zh": "用结构化控制和清楚的数据类型支持程序设计教学，也让编译器能够进行更多静态检查。",
          "en": "Structured control and explicit data types support teaching and additional static checking by compilers."
        }
      },
      {
        "year": "1978–1979",
        "title": {
          "zh": "Modula-2",
          "en": "Modula-2"
        },
        "description": {
          "zh": "通过模块接口隔离实现细节，并提供适合系统编程的机制，强调大型程序的组织。",
          "en": "Module interfaces separate implementation details while mechanisms for systems programming help organize larger software."
        }
      },
      {
        "year": "1986–1988",
        "title": {
          "zh": "Oberon系统",
          "en": "The Oberon system"
        },
        "description": {
          "zh": "与于尔格·古特克内希特协作，联合设计语言、编译器和操作系统，以小而完整的实现检验设计选择。",
          "en": "With Jürg Gutknecht, he co-designed a language, compiler and operating system, testing design choices through a compact complete implementation."
        }
      }
    ],
    "timeline": [
      {
        "year": "1934",
        "text": {
          "zh": "生于瑞士温特图尔。",
          "en": "Born in Winterthur, Switzerland."
        }
      },
      {
        "year": "1963",
        "text": {
          "zh": "在伯克利获博士学位。",
          "en": "Earned his Berkeley doctorate."
        }
      },
      {
        "year": "1968",
        "text": {
          "zh": "到苏黎世联邦理工任教。",
          "en": "Joined ETH Zurich."
        }
      },
      {
        "year": "2024",
        "text": {
          "zh": "1月1日去世。",
          "en": "Died on January 1."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Niklaus Wirth",
        "href": "https://computerhistory.org/profile/niklaus-wirth/"
      },
      {
        "title": "ETH · Wirth publications",
        "href": "https://people.inf.ethz.ch/wirth/"
      }
    ]
  },
  {
    "id": "karp",
    "name": {
      "zh": "卡普",
      "en": "Karp"
    },
    "fullName": "Richard M. Karp",
    "born": 1935,
    "died": null,
    "place": {
      "zh": "波士顿 → 哈佛 → 伯克利",
      "en": "Boston → Harvard → Berkeley"
    },
    "field": {
      "zh": "算法 · NP完备性 · 随机化",
      "en": "Algorithms · NP-completeness · Randomization"
    },
    "hook": {
      "zh": "看似不同的难题，怎样证明它们同样困难？",
      "en": "How can different-looking problems be shown to share a difficulty?"
    },
    "summary": {
      "zh": "卡普用规约把组合问题连接成网络，也设计精确算法和随机算法。他既解释困难来自哪里，也寻找可利用的结构。",
      "en": "Karp used reductions to connect combinatorial problems and developed exact and randomized algorithms, studying both sources of difficulty and exploitable structure."
    },
    "portrait": {
      "src": "/images/computer-scientists/karp.jpg",
      "alt": {
        "zh": "卡普的资料肖像",
        "en": "Portrait of Richard M. Karp"
      },
      "credit": {
        "zh": "Rama · 2009 · CC BY-SA 2.0 fr",
        "en": "Rama · 2009 · CC BY-SA 2.0 fr"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Karp_mg_7725-b.cr2.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0 fr",
        "href": "https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1962",
        "title": {
          "zh": "Held–Karp动态规划",
          "en": "Held–Karp dynamic programming"
        },
        "description": {
          "zh": "与迈克尔·赫尔德把旅行商问题按已访问顶点集合分解，得到精确的指数时间算法。它改善穷举，但没有变成多项式时间算法。",
          "en": "With Michael Held, he decomposed traveling-salesperson instances by visited subsets, giving an exact exponential-time algorithm that improves brute force without becoming polynomial."
        }
      },
      {
        "year": "1972",
        "title": {
          "zh": "21类NP完备问题",
          "en": "Twenty-one NP-complete problems"
        },
        "description": {
          "zh": "以多项式规约串联团、顶点覆盖等问题，说明它们的困难具有共同结构。NP完备不意味着任何实例都难。",
          "en": "Polynomial reductions link problems such as clique and vertex cover. NP-completeness concerns general worst-case difficulty, not every individual instance."
        }
      },
      {
        "year": "1987",
        "title": {
          "zh": "Rabin–Karp字符串搜索",
          "en": "Rabin–Karp string search"
        },
        "description": {
          "zh": "与拉宾用哈希快速筛选可能匹配的位置；验证候选可以保持精确性，哈希碰撞仍会影响耗时。",
          "en": "With Rabin, hashing filters likely string matches. Verifying candidates preserves exactness, while collisions can still affect running time."
        }
      }
    ],
    "timeline": [
      {
        "year": "1935",
        "text": {
          "zh": "生于波士顿。",
          "en": "Born in Boston."
        }
      },
      {
        "year": "1959",
        "text": {
          "zh": "在哈佛获博士学位。",
          "en": "Earned his Harvard doctorate."
        }
      },
      {
        "year": "1968",
        "text": {
          "zh": "加入伯克利。",
          "en": "Joined Berkeley."
        }
      },
      {
        "year": "1972",
        "text": {
          "zh": "发表组合问题规约论文。",
          "en": "Published his landmark paper on reducibility."
        }
      }
    ],
    "sources": [
      {
        "title": "UC Berkeley · Richard Karp",
        "href": "https://www2.eecs.berkeley.edu/Faculty/Homepages/karp.html"
      },
      {
        "title": "Karp · Reducibility Among Combinatorial Problems",
        "href": "https://doi.org/10.1007/978-1-4684-2001-2_9"
      }
    ],
    "lifeDates": {
      "zh": "1935年生",
      "en": "Born 1935"
    }
  },
  {
    "id": "sparck-jones",
    "name": {
      "zh": "斯帕克·琼斯",
      "en": "Spärck Jones"
    },
    "fullName": "Karen Spärck Jones",
    "born": 1935,
    "died": 2007,
    "place": {
      "zh": "哈德斯菲尔德 → 剑桥",
      "en": "Huddersfield → Cambridge"
    },
    "field": {
      "zh": "信息检索 · 自然语言",
      "en": "Information retrieval · Natural language"
    },
    "hook": {
      "zh": "所有文档里都出现的词，真的最能帮助搜索吗？",
      "en": "Are the most common words necessarily the most useful for search?"
    },
    "summary": {
      "zh": "斯帕克·琼斯把语言分析与文档检索连接起来。她研究词的区分能力、相关性概率和系统评估，使信息检索建立在可测量的依据上。",
      "en": "Spärck Jones connected language analysis with retrieval through term discrimination, probabilistic relevance and evaluation grounded in measurable evidence."
    },
    "portrait": {
      "src": "/images/computer-scientists/sparck-jones.jpg",
      "alt": {
        "zh": "斯帕克·琼斯的资料肖像",
        "en": "Portrait of Karen Spärck Jones"
      },
      "credit": {
        "zh": "en:user:Markus Kuhn · 2007 · CC BY 2.5",
        "en": "en:user:Markus Kuhn · 2007 · CC BY 2.5"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Karen_Sp%C3%A4rck.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY 2.5",
        "href": "https://creativecommons.org/licenses/by/2.5"
      }
    },
    "achievements": [
      {
        "year": "1960年代",
        "title": {
          "zh": "语义分类与自动语言处理",
          "en": "Semantic classification"
        },
        "description": {
          "zh": "研究词义、同义关系和可供计算机使用的分类，探索语言处理中的表示与统计方法。",
          "en": "She studied meaning, synonymy and computational classifications, exploring representations and statistics for language processing."
        }
      },
      {
        "year": "1972",
        "title": {
          "zh": "逆文档频率IDF",
          "en": "Inverse document frequency"
        },
        "description": {
          "zh": "少数文档中出现的词通常比到处出现的词更有区分力。IDF按文档频率调节词权重；它不是对词语意义或价值的直接评分。",
          "en": "Terms occurring in fewer documents often discriminate better. IDF adjusts weights by document frequency rather than directly measuring meaning or value."
        },
        "formula": "\\operatorname{idf}(t)=\\log\\frac{N}{\\operatorname{df}(t)}"
      },
      {
        "year": "1976起",
        "title": {
          "zh": "概率信息检索",
          "en": "Probabilistic retrieval"
        },
        "description": {
          "zh": "与斯蒂芬·罗伯逊发展基于相关性概率的检索模型，并重视实验评估。排序公式的有效性需要数据和任务检验。",
          "en": "With Stephen Robertson, she developed relevance-based probabilistic retrieval and emphasized experimental evaluation against data and tasks."
        }
      }
    ],
    "timeline": [
      {
        "year": "1935",
        "text": {
          "zh": "生于哈德斯菲尔德。",
          "en": "Born in Huddersfield."
        }
      },
      {
        "year": "1956起",
        "text": {
          "zh": "在剑桥开始语言与信息处理研究。",
          "en": "Began language and information-processing research at Cambridge."
        }
      },
      {
        "year": "1972",
        "text": {
          "zh": "发表IDF词权重论文。",
          "en": "Published the IDF term-weighting paper."
        }
      },
      {
        "year": "2007",
        "text": {
          "zh": "在剑桥去世。",
          "en": "Died in Cambridge."
        }
      }
    ],
    "sources": [
      {
        "title": "Cambridge · Karen Spärck Jones archive",
        "href": "https://www.cl.cam.ac.uk/archive/ksj21/"
      },
      {
        "title": "Cambridge · Spärck Jones obituary",
        "href": "https://www.cl.cam.ac.uk/misc/obituaries/sparck-jones/"
      },
      {
        "title": "Cambridge · Publications",
        "href": "https://www.cl.cam.ac.uk/archive/ksj21/ksjdigipapers/ksjbib3.html"
      }
    ]
  },
  {
    "id": "margaret-hamilton",
    "name": {
      "zh": "玛格丽特·汉密尔顿",
      "en": "Margaret Hamilton"
    },
    "fullName": "Margaret Elaine Hamilton",
    "born": 1936,
    "died": 2026,
    "place": {
      "zh": "印第安纳 → MIT → 剑桥",
      "en": "Indiana → MIT → Cambridge"
    },
    "field": {
      "zh": "软件工程 · 容错 · 建模",
      "en": "Software engineering · Fault tolerance · Modeling"
    },
    "hook": {
      "zh": "系统遇到未预料的输入时，怎样仍完成关键任务？",
      "en": "How can a system keep its critical tasks running under unexpected conditions?"
    },
    "summary": {
      "zh": "汉密尔顿把软件看作需要工程化设计、测试和防错的系统。她领导阿波罗飞行软件团队，后来继续研究在系统建模阶段预防错误。",
      "en": "Hamilton treated software as a system requiring engineered design, testing and error prevention. She led Apollo flight-software teams and later pursued preventive systems modeling."
    },
    "portrait": {
      "src": "/images/computer-scientists/margaret-hamilton.jpg",
      "alt": {
        "zh": "玛格丽特·汉密尔顿的资料肖像",
        "en": "Portrait of Margaret Elaine Hamilton"
      },
      "credit": {
        "zh": "Daphne Weld Nichols · 1995 · CC BY-SA 3.0",
        "en": "Daphne Weld Nichols · 1995 · CC BY-SA 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Margaret_Hamilton_1995.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 3.0",
        "href": "https://creativecommons.org/licenses/by-sa/3.0"
      }
    },
    "achievements": [
      {
        "year": "1960年代",
        "title": {
          "zh": "阿波罗飞行软件工程",
          "en": "Apollo flight-software engineering"
        },
        "description": {
          "zh": "领导团队开发指令舱与登月舱的软件，协调导航、任务运行与验证。成果来自大型协作，不是她独自写出全部代码。",
          "en": "She led teams building command-module and lunar-module software, coordinating navigation, execution and verification as a large collaborative effort."
        }
      },
      {
        "year": "1968–1969",
        "title": {
          "zh": "防御式软件与任务优先级",
          "en": "Defensive software and task priorities"
        },
        "description": {
          "zh": "团队把错误处理、恢复和优先级纳入设计，使系统在过载时保留关键任务。运行时调度机制有其他工程师的重要贡献。",
          "en": "Her teams integrated error handling, recovery and priorities so critical tasks could survive overload. Other engineers made essential contributions to the execution and scheduling mechanisms."
        }
      },
      {
        "year": "1976–1986起",
        "title": {
          "zh": "系统建模与错误预防",
          "en": "Systems modeling and error prevention"
        },
        "description": {
          "zh": "在后续企业与USL方法中研究系统之间的接口、依赖和一致性，尝试在生成实现之前发现结构错误。",
          "en": "Her later work, including USL, modeled interfaces, dependencies and consistency to detect structural errors before implementation."
        }
      }
    ],
    "timeline": [
      {
        "year": "1936",
        "text": {
          "zh": "生于印第安纳州。",
          "en": "Born in Indiana."
        }
      },
      {
        "year": "1958–1959",
        "text": {
          "zh": "数学专业毕业后到MIT工作。",
          "en": "Joined MIT after completing a mathematics degree."
        }
      },
      {
        "year": "1960年代",
        "text": {
          "zh": "领导阿波罗飞行软件团队。",
          "en": "Led Apollo flight-software teams."
        }
      },
      {
        "year": "2026",
        "text": {
          "zh": "9月30日去世，MIT于10月发布纪念文章。",
          "en": "Died on September 30; MIT published a memorial in October."
        }
      }
    ],
    "sources": [
      {
        "title": "MIT · Hamilton memorial, 2026",
        "href": "https://news.mit.edu/2026/margaret-hamilton-computing-pioneer-dies-1007"
      },
      {
        "title": "MIT · Apollo software recollections",
        "href": "https://news.mit.edu/2009/apollo-vign-0717"
      }
    ]
  },
  {
    "id": "kahn",
    "name": {
      "zh": "卡恩",
      "en": "Kahn"
    },
    "fullName": "Robert Elliot Kahn",
    "born": 1938,
    "died": null,
    "place": {
      "zh": "纽约 → 普林斯顿 → BBN → DARPA",
      "en": "New York → Princeton → BBN → DARPA"
    },
    "field": {
      "zh": "分组网络 · 互联网体系",
      "en": "Packet networks · Internet architecture"
    },
    "hook": {
      "zh": "网络之间没有共同内部设计，还能互联吗？",
      "en": "Can networks interoperate without sharing an internal design?"
    },
    "summary": {
      "zh": "卡恩从分组交换系统走向开放网络体系，与瑟夫发展跨网络协议。他后来又研究可长期标识和管理数字对象的基础设施。",
      "en": "Kahn moved from packet-switching systems to open networking with Cerf, and later studied infrastructure for persistently identifying and managing digital objects."
    },
    "portrait": {
      "src": "/images/computer-scientists/kahn.jpg",
      "alt": {
        "zh": "卡恩的资料肖像",
        "en": "Portrait of Robert Elliot Kahn"
      },
      "credit": {
        "zh": "Veni Markovski · 2013 · CC BY-SA 3.0",
        "en": "Veni Markovski · 2013 · CC BY-SA 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Bob_Kahn.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 3.0",
        "href": "https://creativecommons.org/licenses/by-sa/3.0"
      }
    },
    "achievements": [
      {
        "year": "1960年代末",
        "title": {
          "zh": "ARPANET系统设计",
          "en": "ARPANET system design"
        },
        "description": {
          "zh": "在BBN参与接口消息处理机及网络整体设计，把分组交换落实为可运行的网络。",
          "en": "At BBN he helped design Interface Message Processors and network-level operation, turning packet switching into a working system."
        }
      },
      {
        "year": "1973–1974",
        "title": {
          "zh": "开放网络互联",
          "en": "Open-architecture internetworking"
        },
        "description": {
          "zh": "与瑟夫提出使独立网络通过统一协议互联的方法，允许底层网络保留自身技术。",
          "en": "With Cerf, he developed protocols that let independent networks interconnect while retaining their own underlying technologies."
        }
      },
      {
        "year": "1990年代",
        "title": {
          "zh": "数字对象架构",
          "en": "Digital Object Architecture"
        },
        "description": {
          "zh": "研究用持久标识符和解析服务管理数字对象，使对象身份与某台服务器的位置分离。",
          "en": "Persistent identifiers and resolution services separate a digital object’s identity from its location on a particular server."
        }
      }
    ],
    "timeline": [
      {
        "year": "1938",
        "text": {
          "zh": "生于纽约。",
          "en": "Born in New York."
        }
      },
      {
        "year": "1964",
        "text": {
          "zh": "在普林斯顿获博士学位。",
          "en": "Earned his Princeton doctorate."
        }
      },
      {
        "year": "1972",
        "text": {
          "zh": "加入DARPA，推动网络互联研究。",
          "en": "Joined DARPA and advanced internetworking research."
        }
      },
      {
        "year": "1986",
        "text": {
          "zh": "创建CNRI，继续网络基础设施研究。",
          "en": "Founded CNRI to pursue networking infrastructure."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Robert Kahn",
        "href": "https://computerhistory.org/profile/robert-kahn/"
      },
      {
        "title": "Cerf–Kahn · Packet Network Intercommunication",
        "href": "https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf"
      },
      {
        "title": "CNRI · Digital Object Architecture",
        "href": "https://www.cnri.reston.va.us/k-w.html"
      }
    ],
    "lifeDates": {
      "zh": "1938年生",
      "en": "Born 1938"
    }
  },
  {
    "id": "knuth",
    "name": {
      "zh": "高德纳",
      "en": "Knuth"
    },
    "fullName": "Donald Knuth",
    "born": 1938,
    "died": null,
    "place": {
      "zh": "密尔沃基 → 加州理工 → 斯坦福",
      "en": "Milwaukee → Caltech → Stanford"
    },
    "field": {
      "zh": "算法分析 · 排版 · 程序表达",
      "en": "Algorithm analysis · Typesetting · Programming"
    },
    "hook": {
      "zh": "算法除了能运行，还能被分析、解释和优美地呈现吗？",
      "en": "Can algorithms be analyzed, explained and carefully presented?"
    },
    "summary": {
      "zh": "高德纳系统研究算法的成本，也把排版和程序写作当作值得精细设计的计算问题。其著作和软件强调可检验的细节与清楚的表达。",
      "en": "Knuth systematized the analysis of algorithms and treated typography and program exposition as serious computing problems, emphasizing checkable detail and clear explanation."
    },
    "portrait": {
      "src": "/images/computer-scientists/knuth.jpg",
      "alt": {
        "zh": "高德纳的资料肖像",
        "en": "Portrait of Donald Knuth"
      },
      "credit": {
        "zh": "Alex Handy · 2011 · Commons crop · CC BY-SA 2.0",
        "en": "Alex Handy · 2011 · Commons crop · CC BY-SA 2.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Donald_Ervin_Knuth_(cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0",
        "href": "https://creativecommons.org/licenses/by-sa/2.0"
      }
    },
    "achievements": [
      {
        "year": "1968起",
        "title": {
          "zh": "《计算机程序设计艺术》",
          "en": "The Art of Computer Programming"
        },
        "description": {
          "zh": "通过具体算法、数学分析和习题，系统比较运行时间、存储需求与结构性质，避免只凭经验判断效率。",
          "en": "Algorithms, mathematical analysis and exercises systematically compare time, storage and structure rather than relying only on informal performance impressions."
        }
      },
      {
        "year": "1977起",
        "title": {
          "zh": "TeX与METAFONT",
          "en": "TeX and METAFONT"
        },
        "description": {
          "zh": "为技术文字、数学公式和字形建立可编程排版工具，把版面质量转化为精确计算与优化。",
          "en": "Programmable tools for mathematical typesetting and font design connect visual quality with precise computation and optimization."
        }
      },
      {
        "year": "1984",
        "title": {
          "zh": "文学化编程",
          "en": "Literate programming"
        },
        "description": {
          "zh": "把程序和解释组织为面向读者的共同文本，再由工具生成可执行代码与文档。代码的阅读顺序不必与编译器要求的顺序相同。",
          "en": "Programs and explanations form a reader-oriented document from which tools produce code and documentation. Human exposition need not follow compiler order."
        }
      }
    ],
    "timeline": [
      {
        "year": "1938",
        "text": {
          "zh": "生于密尔沃基。",
          "en": "Born in Milwaukee."
        }
      },
      {
        "year": "1963",
        "text": {
          "zh": "在加州理工获数学博士学位。",
          "en": "Earned a mathematics doctorate at Caltech."
        }
      },
      {
        "year": "1968",
        "text": {
          "zh": "加入斯坦福并出版《程序设计艺术》首卷。",
          "en": "Joined Stanford and published the first TAOCP volume."
        }
      },
      {
        "year": "1977起",
        "text": {
          "zh": "开发TeX，持续修订著作与软件。",
          "en": "Developed TeX and continued refining books and software."
        }
      }
    ],
    "sources": [
      {
        "title": "Stanford · Donald Knuth",
        "href": "https://profiles.stanford.edu/donald-knuth"
      },
      {
        "title": "Stanford · Knuth publications and CV",
        "href": "https://cs.stanford.edu/~knuth/vita.html"
      },
      {
        "title": "CHM · Donald Knuth",
        "href": "https://computerhistory.org/profile/donald-knuth/"
      }
    ],
    "lifeDates": {
      "zh": "1938年生",
      "en": "Born 1938"
    }
  },
  {
    "id": "cook",
    "name": {
      "zh": "库克",
      "en": "Cook"
    },
    "fullName": "Stephen Cook",
    "born": 1939,
    "died": null,
    "place": {
      "zh": "布法罗 → 哈佛 → 多伦多",
      "en": "Buffalo → Harvard → Toronto"
    },
    "field": {
      "zh": "复杂性 · 证明复杂性",
      "en": "Complexity · Proof complexity"
    },
    "hook": {
      "zh": "容易检查的答案，也一定容易找到吗？",
      "en": "If an answer is easy to check, must it be easy to find?"
    },
    "summary": {
      "zh": "库克把可有效验证的问题与命题逻辑联系起来，并研究证明本身需要多少资源。他的工作使计算难度能通过规约和形式系统加以比较。",
      "en": "Cook connected efficiently verifiable problems with propositional logic and studied the resources needed for proofs, comparing computational difficulty through reductions and formal systems."
    },
    "portrait": {
      "src": "/images/computer-scientists/cook.jpg",
      "alt": {
        "zh": "库克的资料肖像",
        "en": "Portrait of Stephen Cook"
      },
      "credit": {
        "zh": "Jiří Janíček · 2008 · CC BY-SA 3.0",
        "en": "Jiří Janíček · 2008 · CC BY-SA 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Prof.Cook.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 3.0",
        "href": "https://creativecommons.org/licenses/by-sa/3.0"
      }
    },
    "achievements": [
      {
        "year": "1971",
        "title": {
          "zh": "SAT的NP完备性",
          "en": "NP-completeness of SAT"
        },
        "description": {
          "zh": "任意NP问题都可在多项式时间内转成布尔可满足性问题。因此SAT若能多项式时间求解，则P=NP；定理并没有证明P≠NP。",
          "en": "Every NP problem reduces to Boolean satisfiability in polynomial time. A polynomial-time SAT algorithm would imply P=NP; the theorem does not establish P≠NP."
        }
      },
      {
        "year": "1975",
        "title": {
          "zh": "多项式时间计算的形式理论",
          "en": "Formal theories of feasible computation"
        },
        "description": {
          "zh": "在PV等框架中描述多项式时间函数及其推理，研究可行计算与数学证明之间的联系。",
          "en": "Frameworks such as PV formalize polynomial-time functions and reasoning about them, connecting feasible computation with proof."
        }
      },
      {
        "year": "1979",
        "title": {
          "zh": "命题证明系统的复杂度",
          "en": "Complexity of propositional proof systems"
        },
        "description": {
          "zh": "与罗伯特·雷克豪建立比较命题证明系统的复杂性框架，区分「证明存在」与「存在短证明且可有效检查」。",
          "en": "With Robert Reckhow, he framed the complexity of propositional proof systems, separating provability from short, efficiently checkable proofs."
        }
      }
    ],
    "timeline": [
      {
        "year": "1939",
        "text": {
          "zh": "生于布法罗。",
          "en": "Born in Buffalo."
        }
      },
      {
        "year": "1966",
        "text": {
          "zh": "在哈佛获博士学位。",
          "en": "Earned his Harvard doctorate."
        }
      },
      {
        "year": "1970",
        "text": {
          "zh": "加入多伦多大学。",
          "en": "Joined the University of Toronto."
        }
      },
      {
        "year": "1971",
        "text": {
          "zh": "发表开创NP完备性理论的论文。",
          "en": "Published his foundational NP-completeness paper."
        }
      }
    ],
    "sources": [
      {
        "title": "Toronto · Theory faculty",
        "href": "https://www.cs.toronto.edu/theory/faculty.html"
      },
      {
        "title": "ACM · Stephen Cook oral history",
        "href": "https://amturing.acm.org/pdf/CookTuringTranscript.pdf"
      },
      {
        "title": "Stephen Cook · Research homepage",
        "href": "https://www.cs.toronto.edu/~sacook/"
      }
    ],
    "lifeDates": {
      "zh": "1939年生",
      "en": "Born 1939"
    }
  },
  {
    "id": "hopcroft",
    "name": {
      "zh": "霍普克罗夫特",
      "en": "Hopcroft"
    },
    "fullName": "John Hopcroft",
    "born": 1939,
    "died": null,
    "place": {
      "zh": "西雅图 → 斯坦福 → 康奈尔",
      "en": "Seattle → Stanford → Cornell"
    },
    "field": {
      "zh": "图算法 · 自动机",
      "en": "Graph algorithms · Automata"
    },
    "hook": {
      "zh": "怎样让算法的每一步都有清楚的成本？",
      "en": "How can the cost of each algorithmic step be understood?"
    },
    "summary": {
      "zh": "霍普克罗夫特把形式语言与图算法组织为严格的算法学。他与多位合作者用数据结构和分阶段分析改进经典问题的效率。",
      "en": "Hopcroft helped organize formal languages and graph algorithms into rigorous algorithmics, using data structures and staged analysis with collaborators to improve classic problems."
    },
    "portrait": {
      "src": "/images/computer-scientists/hopcroft.jpg",
      "alt": {
        "zh": "霍普克罗夫特的资料肖像",
        "en": "Portrait of John Hopcroft"
      },
      "credit": {
        "zh": "Pavel.mavrin · 2009 · Commons crop · Public domain",
        "en": "Pavel.mavrin · 2009 · Commons crop · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Hopcrofg_(cropped2).jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1971",
        "title": {
          "zh": "确定有限自动机最小化",
          "en": "Minimizing deterministic automata"
        },
        "description": {
          "zh": "通过反复细分不可区分状态的分组，构造等价的最小自动机；固定字母表时可达到O(n log n)量级。",
          "en": "Refining partitions of indistinguishable states yields a minimal equivalent deterministic automaton, with O(n log n) complexity for a fixed alphabet."
        }
      },
      {
        "year": "1973",
        "title": {
          "zh": "二分图最大匹配",
          "en": "Maximum bipartite matching"
        },
        "description": {
          "zh": "与卡普分阶段寻找互不干扰的最短增广路，使二分图匹配达到O(E√V)时间量级。",
          "en": "With Karp, phases of shortest augmenting paths yield a maximum matching in O(E√V) time for bipartite graphs."
        }
      },
      {
        "year": "1974",
        "title": {
          "zh": "线性时间平面性检验",
          "en": "Linear-time planarity testing"
        },
        "description": {
          "zh": "与罗伯特·塔扬利用深度优先搜索等结构判断图能否无交叉地画在平面上，线性时间依赖恰当的数据组织。",
          "en": "With Robert Tarjan, structural use of depth-first search tests whether a graph admits a crossing-free planar embedding in linear time."
        }
      }
    ],
    "timeline": [
      {
        "year": "1939",
        "text": {
          "zh": "生于西雅图。",
          "en": "Born in Seattle."
        }
      },
      {
        "year": "1964",
        "text": {
          "zh": "在斯坦福获电气工程博士学位。",
          "en": "Earned his electrical-engineering doctorate at Stanford."
        }
      },
      {
        "year": "1967",
        "text": {
          "zh": "加入康奈尔大学。",
          "en": "Joined Cornell University."
        }
      },
      {
        "year": "1971–1974",
        "text": {
          "zh": "发表自动机与图算法的重要工作。",
          "en": "Published major work on automata and graph algorithms."
        }
      }
    ],
    "sources": [
      {
        "title": "Cornell · John Hopcroft and bibliography",
        "href": "https://www.cs.cornell.edu/jeh/"
      },
      {
        "title": "Hopcroft–Karp · Bipartite matching",
        "href": "https://doi.org/10.1137/0202019"
      }
    ],
    "lifeDates": {
      "zh": "1939年生",
      "en": "Born 1939"
    }
  },
  {
    "id": "liskov",
    "name": {
      "zh": "利斯科夫",
      "en": "Liskov"
    },
    "fullName": "Barbara Liskov",
    "born": 1939,
    "died": null,
    "place": {
      "zh": "洛杉矶 → 斯坦福 → MIT",
      "en": "Los Angeles → Stanford → MIT"
    },
    "field": {
      "zh": "数据抽象 · 类型 · 分布式系统",
      "en": "Data abstraction · Types · Distributed systems"
    },
    "hook": {
      "zh": "实现可以改变，使用者依赖的承诺怎样保持？",
      "en": "How can an implementation change without breaking its promises?"
    },
    "summary": {
      "zh": "利斯科夫以抽象边界组织软件，把类型、模块和分布式可靠性联系起来。她的研究让程序之间的约定能够被明确表达与检验。",
      "en": "Liskov organized software around abstraction boundaries, connecting types, modules and distributed reliability through explicit, checkable contracts."
    },
    "portrait": {
      "src": "/images/computer-scientists/liskov.jpg",
      "alt": {
        "zh": "利斯科夫的资料肖像",
        "en": "Portrait of Barbara Liskov"
      },
      "credit": {
        "zh": "Kenneth C. Zirkel · 2010 · CC BY-SA 3.0",
        "en": "Kenneth C. Zirkel · 2010 · CC BY-SA 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Barbara_Liskov_MIT_computer_scientist_2010.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 3.0",
        "href": "https://creativecommons.org/licenses/by-sa/3.0"
      }
    },
    "achievements": [
      {
        "year": "1974–1977",
        "title": {
          "zh": "CLU与数据抽象",
          "en": "CLU and data abstraction"
        },
        "description": {
          "zh": "用操作接口隐藏数据的内部表示。程序依赖抽象行为而不是存储细节，使实现更容易替换和维护。",
          "en": "Operation interfaces hide internal representations so that clients depend on abstract behavior rather than storage details."
        }
      },
      {
        "year": "1987–1994",
        "title": {
          "zh": "行为子类型",
          "en": "Behavioral subtyping"
        },
        "description": {
          "zh": "与周以真（Jeannette Wing）讨论何时子类型能够安全替代父类型。关键是保持客户端依赖的行为约定，不只是方法名称相同。",
          "en": "With Jeannette Wing, she studied when subtypes can safely substitute for supertypes: behavioral promises matter, not merely matching method names."
        }
      },
      {
        "year": "1999",
        "title": {
          "zh": "实用拜占庭容错",
          "en": "Practical Byzantine Fault Tolerance"
        },
        "description": {
          "zh": "与米格尔·卡斯特罗提出PBFT，使复制服务能够容忍恶意或任意错误副本。经典模型以3f+1个副本容忍至多f个故障，活性还需适当网络条件。",
          "en": "With Miguel Castro, she developed practical replicated services tolerating arbitrary faulty replicas. The classic model uses 3f+1 replicas for f faults; progress also needs suitable network conditions."
        }
      }
    ],
    "timeline": [
      {
        "year": "1939",
        "text": {
          "zh": "生于洛杉矶。",
          "en": "Born in Los Angeles."
        }
      },
      {
        "year": "1968",
        "text": {
          "zh": "在斯坦福完成博士研究，导师为麦卡锡。",
          "en": "Completed her Stanford doctorate under McCarthy."
        }
      },
      {
        "year": "1972",
        "text": {
          "zh": "加入MIT。",
          "en": "Joined MIT."
        }
      },
      {
        "year": "1999",
        "text": {
          "zh": "与卡斯特罗发表PBFT。",
          "en": "Published PBFT with Castro."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Barbara Liskov",
        "href": "https://computerhistory.org/profile/barbara-liskov/"
      },
      {
        "title": "MIT · Liskov and the Turing Award",
        "href": "https://news.mit.edu/2009/turing-liskov-0310"
      },
      {
        "title": "Castro–Liskov · PBFT",
        "href": "https://pmg.csail.mit.edu/papers/osdi99.pdf"
      }
    ],
    "lifeDates": {
      "zh": "1939年生",
      "en": "Born 1939"
    }
  },
  {
    "id": "lamport",
    "name": {
      "zh": "兰波特",
      "en": "Lamport"
    },
    "fullName": "Leslie Lamport",
    "born": 1941,
    "died": null,
    "place": {
      "zh": "纽约 → 布兰代斯 → 工业研究实验室",
      "en": "New York → Brandeis → Industrial research laboratories"
    },
    "field": {
      "zh": "分布式系统 · 形式规范",
      "en": "Distributed systems · Formal specification"
    },
    "hook": {
      "zh": "没有共同的钟，机器怎样同意事情发生的顺序？",
      "en": "How can machines agree on events without sharing a clock?"
    },
    "summary": {
      "zh": "兰波特用清楚的模型分析分布式系统中的时间、故障与一致性。他区分协议保证的安全性与让系统持续前进所需的条件。",
      "en": "Lamport used precise models for time, failure and agreement, separating protocol safety from the conditions required for progress."
    },
    "portrait": {
      "src": "/images/computer-scientists/lamport.jpg",
      "alt": {
        "zh": "兰波特的资料肖像",
        "en": "Portrait of Leslie Lamport"
      },
      "credit": {
        "zh": "Leslie Lamport · date unrecorded · Copyrighted free use",
        "en": "Leslie Lamport · date unrecorded · Copyrighted free use"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Leslie_Lamport.jpg",
      "kind": "portrait",
      "license": {
        "label": "Copyrighted free use",
        "href": "https://commons.wikimedia.org/wiki/File:Leslie_Lamport.jpg#Licensing"
      }
    },
    "achievements": [
      {
        "year": "1978",
        "title": {
          "zh": "逻辑时钟与先发生关系",
          "en": "Logical clocks and happened-before"
        },
        "description": {
          "zh": "用消息因果关系定义事件偏序，并构造与它相容的时间戳。时间戳大小本身不能反推出两个事件存在因果关系。",
          "en": "Message causality defines a partial order, and logical timestamps respect it. Timestamp order alone does not imply causality."
        }
      },
      {
        "year": "1982",
        "title": {
          "zh": "拜占庭将军问题",
          "en": "The Byzantine Generals Problem"
        },
        "description": {
          "zh": "与肖斯塔克、皮斯分析任意错误下的一致性。经典无签名、同步消息模型需要至少3f+1个参与者容忍f个故障；换模型会改变界限。",
          "en": "With Shostak and Pease, he analyzed agreement under arbitrary faults. The classic synchronous unsigned-message model needs at least 3f+1 participants for f faults; other models differ."
        }
      },
      {
        "year": "1989 / 1998",
        "title": {
          "zh": "Paxos一致性协议",
          "en": "Paxos consensus"
        },
        "description": {
          "zh": "在非拜占庭的崩溃／恢复故障模型中，利用相交法定集合保持一致决定。安全性不依赖固定消息延迟上界，但持续达成新决定还需进展条件。",
          "en": "In a non-Byzantine crash/recovery model, intersecting quorums preserve agreement. Safety does not require a fixed delay bound, but continued progress requires additional conditions."
        }
      }
    ],
    "timeline": [
      {
        "year": "1941",
        "text": {
          "zh": "生于纽约。",
          "en": "Born in New York."
        }
      },
      {
        "year": "1967",
        "text": {
          "zh": "在布兰代斯获数学博士学位。",
          "en": "Earned a mathematics doctorate at Brandeis."
        }
      },
      {
        "year": "1978",
        "text": {
          "zh": "发表逻辑时钟论文。",
          "en": "Published the logical-clock paper."
        }
      },
      {
        "year": "1990年代",
        "text": {
          "zh": "发展TLA等系统规范方法。",
          "en": "Developed specification methods including TLA."
        }
      }
    ],
    "sources": [
      {
        "title": "Leslie Lamport · Publications with commentary",
        "href": "https://lamport.azurewebsites.net/pubs/pubs.html"
      },
      {
        "title": "ACM · Leslie Lamport biography",
        "href": "https://amturing.acm.org/award_winners/lamport_1205376.cfm"
      }
    ],
    "lifeDates": {
      "zh": "1941年生",
      "en": "Born 1941"
    }
  },
  {
    "id": "ritchie",
    "name": {
      "zh": "里奇",
      "en": "Ritchie"
    },
    "fullName": "Dennis Ritchie",
    "born": 1941,
    "died": 2011,
    "place": {
      "zh": "纽约州 → 哈佛 → 贝尔实验室",
      "en": "New York → Harvard → Bell Labs"
    },
    "field": {
      "zh": "C语言 · Unix",
      "en": "C language · Unix"
    },
    "hook": {
      "zh": "贴近机器的程序，如何仍然可以跨机器迁移？",
      "en": "How can low-level software still travel between machines?"
    },
    "summary": {
      "zh": "里奇把系统编程语言与操作系统一起演进。C与Unix的结合让软件能够保留对硬件的控制，同时减少对某一种机器的依赖。",
      "en": "Ritchie developed a systems language alongside an operating system. C and Unix combined low-level control with reduced dependence on any particular machine."
    },
    "portrait": {
      "src": "/images/computer-scientists/ritchie.jpg",
      "alt": {
        "zh": "里奇的资料肖像",
        "en": "Portrait of Dennis Ritchie"
      },
      "credit": {
        "zh": "Denise Panyik-Dale · 2011 · CC BY 2.0",
        "en": "Denise Panyik-Dale · 2011 · CC BY 2.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Dennis_Ritchie_2011.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY 2.0",
        "href": "https://creativecommons.org/licenses/by/2.0"
      }
    },
    "achievements": [
      {
        "year": "1972起",
        "title": {
          "zh": "C语言",
          "en": "The C language"
        },
        "description": {
          "zh": "从B等语言发展出带类型和指针的系统编程语言，支持紧凑而可移植的实现；手动内存操作也要求程序员承担明确责任。",
          "en": "Building on B and earlier languages, typed data and pointers supported compact portable systems code, while manual memory operations retained important responsibilities."
        }
      },
      {
        "year": "1969–1973",
        "title": {
          "zh": "共同发展Unix",
          "en": "Co-developing Unix"
        },
        "description": {
          "zh": "与肯·汤普森等人发展Unix，并推动用C重写系统的大部分，实现与硬件更松的耦合。",
          "en": "With Ken Thompson and colleagues, he developed Unix and helped rewrite much of it in C, loosening its dependence on particular hardware."
        }
      },
      {
        "year": "1978",
        "title": {
          "zh": "清楚描述C的语言与用法",
          "en": "Documenting C"
        },
        "description": {
          "zh": "与布赖恩·柯尼汉合著《C程序设计语言》，通过规范说明与实例传播系统编程方法；后来的正式标准继续发展了语言。",
          "en": "With Brian Kernighan, he explained C through a concise reference and examples. Later formal standards further developed the language."
        }
      }
    ],
    "timeline": [
      {
        "year": "1941",
        "text": {
          "zh": "生于纽约州布朗克斯维尔。",
          "en": "Born in Bronxville, New York."
        }
      },
      {
        "year": "1967",
        "text": {
          "zh": "加入贝尔实验室。",
          "en": "Joined Bell Labs."
        }
      },
      {
        "year": "1972–1978",
        "text": {
          "zh": "发展C并与同事推进Unix及其文献。",
          "en": "Developed C, Unix and their documentation with colleagues."
        }
      },
      {
        "year": "2011",
        "text": {
          "zh": "在新泽西州去世。",
          "en": "Died in New Jersey."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Dennis Ritchie",
        "href": "https://computerhistory.org/profile/dennis-ritchie/"
      },
      {
        "title": "Ritchie · The development of the C language",
        "href": "https://www.bell-labs.com/usr/dmr/www/chist.html"
      }
    ]
  },
  {
    "id": "cerf",
    "name": {
      "zh": "瑟夫",
      "en": "Cerf"
    },
    "fullName": "Vint Cerf",
    "born": 1943,
    "died": null,
    "place": {
      "zh": "纽黑文 → UCLA → 斯坦福 → 网络研究",
      "en": "New Haven → UCLA → Stanford → Networking research"
    },
    "field": {
      "zh": "互联网 · 通信协议",
      "en": "Internet · Communication protocols"
    },
    "hook": {
      "zh": "不同的网络，怎样组成彼此能理解的网络？",
      "en": "How can different networks communicate as one larger network?"
    },
    "summary": {
      "zh": "瑟夫与卡恩合作设计互联网协议，把互联、可靠传输与具体网络技术分离。他也推动电子邮件和延迟容忍网络的发展。",
      "en": "Cerf co-designed Internet protocols with Kahn, separating interconnection and reliable delivery from particular network technologies, and worked on email and delay-tolerant networking."
    },
    "portrait": {
      "src": "/images/computer-scientists/cerf.jpg",
      "alt": {
        "zh": "瑟夫的资料肖像",
        "en": "Portrait of Vint Cerf"
      },
      "credit": {
        "zh": "Duncan.Hull · 2016 · Commons crop · CC BY-SA 4.0",
        "en": "Duncan.Hull · 2016 · Commons crop · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Dr_Vint_Cerf_ForMemRS_(cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1973–1974",
        "title": {
          "zh": "互联网络传输协议",
          "en": "Internetwork transmission protocols"
        },
        "description": {
          "zh": "与卡恩设计跨异构分组网络的通信方法，成为TCP/IP发展的起点。互联网是长期协作成果，不是两人一次完成的产品。",
          "en": "With Kahn, he designed communication across heterogeneous packet networks, a starting point for TCP/IP’s collaborative development."
        }
      },
      {
        "year": "1983–1989",
        "title": {
          "zh": "MCI Mail与网络邮件互联",
          "en": "MCI Mail and email interconnection"
        },
        "description": {
          "zh": "领导商业电子邮件系统的发展，并推动其与互联网互通，检验协议如何服务真实用户和组织。",
          "en": "He led development of a commercial email service and its interconnection with the Internet, bringing protocols into practical organizational use."
        }
      },
      {
        "year": "1990年代起",
        "title": {
          "zh": "延迟容忍网络",
          "en": "Delay-tolerant networking"
        },
        "description": {
          "zh": "参与研究连接间断、传输延迟很大的网络，以存储转发等机制支持深空等环境；不能直接假定端到端连接总是存在。",
          "en": "He worked on networks with intermittent links and long delays, using mechanisms such as store-and-forward for environments including deep space."
        }
      }
    ],
    "timeline": [
      {
        "year": "1943",
        "text": {
          "zh": "生于纽黑文。",
          "en": "Born in New Haven."
        }
      },
      {
        "year": "1972",
        "text": {
          "zh": "在UCLA获博士学位。",
          "en": "Earned his UCLA doctorate."
        }
      },
      {
        "year": "1973–1974",
        "text": {
          "zh": "与卡恩发展互联网协议。",
          "en": "Developed internetworking protocols with Kahn."
        }
      },
      {
        "year": "1992",
        "text": {
          "zh": "参与创建Internet Society。",
          "en": "Helped found the Internet Society."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Vinton Cerf",
        "href": "https://computerhistory.org/profile/vint-cerf/"
      },
      {
        "title": "Cerf–Kahn · A Protocol for Packet Network Intercommunication",
        "href": "https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf"
      },
      {
        "title": "RFC 4838 · Delay-Tolerant Networking Architecture",
        "href": "https://www.rfc-editor.org/rfc/rfc4838.html"
      }
    ],
    "lifeDates": {
      "zh": "1943年生",
      "en": "Born 1943"
    }
  },
  {
    "id": "stonebraker",
    "name": {
      "zh": "斯通布雷克",
      "en": "Stonebraker"
    },
    "fullName": "Michael Stonebraker",
    "born": 1943,
    "died": null,
    "place": {
      "zh": "马萨诸塞 → 密歇根 → 伯克利 → MIT",
      "en": "Massachusetts → Michigan → Berkeley → MIT"
    },
    "field": {
      "zh": "数据库系统 · 查询执行",
      "en": "Database systems · Query execution"
    },
    "hook": {
      "zh": "一种数据库架构，能够适合所有工作负载吗？",
      "en": "Can one database architecture fit every workload?"
    },
    "summary": {
      "zh": "斯通布雷克通过可运行系统检验数据库思想，从关系查询到可扩展类型，再到面向特定工作负载的存储组织。",
      "en": "Stonebraker tested database ideas through working systems, from relational queries and extensible types to storage designed for particular workloads."
    },
    "portrait": {
      "src": "/images/computer-scientists/stonebraker.jpg",
      "alt": {
        "zh": "斯通布雷克的资料肖像",
        "en": "Portrait of Michael Stonebraker"
      },
      "credit": {
        "zh": "David.Monniaux · 2015 · CC BY-SA 4.0",
        "en": "David.Monniaux · 2015 · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Michael_Stonebraker_P1120062.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1974–1976",
        "title": {
          "zh": "INGRES",
          "en": "INGRES"
        },
        "description": {
          "zh": "与尤金·王等人实现关系数据库研究系统，检验查询语言、存储与优化如何共同工作。",
          "en": "With Eugene Wong and colleagues, he built a relational research system combining query languages, storage and optimization."
        }
      },
      {
        "year": "1986起",
        "title": {
          "zh": "POSTGRES",
          "en": "POSTGRES"
        },
        "description": {
          "zh": "研究可扩展数据类型、规则和复杂对象，把数据库能力扩展到传统记录之外；后来的PostgreSQL由更广泛社区继续发展。",
          "en": "Extensible types, rules and complex objects broadened database capabilities. The later PostgreSQL system was developed further by a wider community."
        }
      },
      {
        "year": "2005",
        "title": {
          "zh": "C-Store与列式系统",
          "en": "C-Store and column stores"
        },
        "description": {
          "zh": "与合作者针对分析型查询研究按列组织、压缩与执行。列式结构的优势依赖工作负载，不意味着任何事务处理都更合适。",
          "en": "With collaborators, he studied column organization, compression and execution for analytical workloads. The benefits depend on workload and do not universally favor transactional applications."
        }
      }
    ],
    "timeline": [
      {
        "year": "1943",
        "text": {
          "zh": "生于马萨诸塞州纽伯里波特。",
          "en": "Born in Newburyport, Massachusetts."
        }
      },
      {
        "year": "1967",
        "text": {
          "zh": "在密歇根大学获博士学位。",
          "en": "Earned his doctorate at Michigan."
        }
      },
      {
        "year": "1971",
        "text": {
          "zh": "加入伯克利并发展数据库研究。",
          "en": "Joined Berkeley and developed database research."
        }
      },
      {
        "year": "2001",
        "text": {
          "zh": "到MIT继续系统研究。",
          "en": "Moved to MIT to continue systems research."
        }
      }
    ],
    "sources": [
      {
        "title": "MIT CSAIL · Michael Stonebraker",
        "href": "https://www.csail.mit.edu/person/michael-stonebraker"
      },
      {
        "title": "CHM · Michael Stonebraker",
        "href": "https://computerhistory.org/profile/michael-stonebraker/"
      }
    ],
    "lifeDates": {
      "zh": "1943年生",
      "en": "Born 1943"
    }
  },
  {
    "id": "thompson",
    "name": {
      "zh": "汤普森",
      "en": "Thompson"
    },
    "fullName": "Ken Thompson",
    "born": 1943,
    "died": null,
    "place": {
      "zh": "新奥尔良 → 伯克利 → 贝尔实验室",
      "en": "New Orleans → Berkeley → Bell Labs"
    },
    "field": {
      "zh": "操作系统 · 文本编码 · 工具",
      "en": "Operating systems · Encoding · Tools"
    },
    "hook": {
      "zh": "少量可以组合的工具，能否构成强大的系统？",
      "en": "Can a small set of composable tools make a powerful system?"
    },
    "summary": {
      "zh": "汤普森参与创建Unix，并研究语言、文本工具和编码。他的系统工作强调直接、紧凑的实现，以及工具之间的可组合性。",
      "en": "Thompson helped create Unix and worked on languages, text tools and encoding, emphasizing direct implementations and composable components."
    },
    "portrait": {
      "src": "/images/computer-scientists/thompson.jpg",
      "alt": {
        "zh": "汤普森的资料肖像",
        "en": "Portrait of Ken Thompson"
      },
      "credit": {
        "zh": "A.C.Diller · 2019 · CC BY-SA 4.0",
        "en": "A.C.Diller · 2019 · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Ken_Thompson,_2019.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1969",
        "title": {
          "zh": "Unix的初始实现",
          "en": "The original Unix"
        },
        "description": {
          "zh": "在PDP-7上实现早期Unix，随后与里奇等人扩展，形成进程、文件与工具协同工作的系统。",
          "en": "He implemented early Unix on a PDP-7, then expanded it with Ritchie and colleagues into a system of cooperating processes, files and tools."
        }
      },
      {
        "year": "1968",
        "title": {
          "zh": "正则表达式搜索实现",
          "en": "Implementing regular-expression search"
        },
        "description": {
          "zh": "将正则表达式转换为可执行的匹配过程，推动文本编辑与搜索工具的发展。这里处理的是形式语言模式，而不是理解文本语义。",
          "en": "He translated regular expressions into executable matching procedures for editing and search, recognizing formal patterns rather than interpreting meaning."
        }
      },
      {
        "year": "1992",
        "title": {
          "zh": "UTF-8编码",
          "en": "UTF-8 encoding"
        },
        "description": {
          "zh": "与罗布·派克设计可变长Unicode编码，兼容ASCII且便于识别字节边界。Unicode字符集与UTF-8编码方式应加以区分。",
          "en": "With Rob Pike, he designed an ASCII-compatible variable-length Unicode encoding. Unicode’s character repertoire and UTF-8’s encoding are distinct."
        }
      }
    ],
    "timeline": [
      {
        "year": "1943",
        "text": {
          "zh": "生于新奥尔良。",
          "en": "Born in New Orleans."
        }
      },
      {
        "year": "1966",
        "text": {
          "zh": "完成伯克利硕士后加入贝尔实验室。",
          "en": "Joined Bell Labs after his Berkeley master’s degree."
        }
      },
      {
        "year": "1969",
        "text": {
          "zh": "实现第一版Unix。",
          "en": "Implemented the first Unix."
        }
      },
      {
        "year": "1992",
        "text": {
          "zh": "与派克设计UTF-8。",
          "en": "Designed UTF-8 with Pike."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Ken Thompson",
        "href": "https://computerhistory.org/profile/ken-thompson/"
      },
      {
        "title": "Rob Pike · UTF-8 history",
        "href": "https://www.cl.cam.ac.uk/~mgk25/ucs/utf-8-history.txt"
      }
    ],
    "lifeDates": {
      "zh": "1943年生",
      "en": "Born 1943"
    }
  },
  {
    "id": "diffie",
    "name": {
      "zh": "迪菲",
      "en": "Diffie"
    },
    "fullName": "Whitfield Diffie",
    "born": 1944,
    "died": null,
    "place": {
      "zh": "华盛顿 → MIT → 斯坦福",
      "en": "Washington → MIT → Stanford"
    },
    "field": {
      "zh": "公钥密码 · 认证",
      "en": "Public-key cryptography · Authentication"
    },
    "hook": {
      "zh": "没有先共享秘密，两个人怎样开始安全通信？",
      "en": "How can two parties communicate securely without first sharing a secret?"
    },
    "summary": {
      "zh": "迪菲与赫尔曼等人改变了密钥管理问题的提法。他把公开信息、私人秘密和身份认证分开，使大规模网络中的密码协议能够被重新设计。",
      "en": "Diffie helped rethink key management, separating public information, private secrets and authentication to make cryptographic protocols viable on large networks."
    },
    "portrait": {
      "src": "/images/computer-scientists/diffie.jpg",
      "alt": {
        "zh": "迪菲的资料肖像",
        "en": "Portrait of Whitfield Diffie"
      },
      "credit": {
        "zh": "Duncan.Hull · 2017 · CC BY-SA 4.0",
        "en": "Duncan.Hull · 2017 · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Whitfield_Diffie_Royal_Society.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1976",
        "title": {
          "zh": "公开密钥的构想",
          "en": "The public-key concept"
        },
        "description": {
          "zh": "与赫尔曼提出将加密和解密所需的信息分离，公开一部分仍能保留秘密。安全性依赖计算假设与正确协议设计。",
          "en": "With Hellman, he proposed separating public and private key information. Security depends on computational assumptions and sound protocol design."
        }
      },
      {
        "year": "1976",
        "title": {
          "zh": "Diffie–Hellman密钥交换",
          "en": "Diffie–Hellman key exchange"
        },
        "description": {
          "zh": "双方公开交换群元素，在离散对数等适当困难假设下建立共享秘密。未经认证的基本交换不能抵抗中间人攻击。",
          "en": "Exchanging group elements establishes a shared secret under suitable hardness assumptions. The unauthenticated basic exchange does not prevent man-in-the-middle attacks."
        }
      },
      {
        "year": "1992",
        "title": {
          "zh": "认证密钥交换",
          "en": "Authenticated key exchange"
        },
        "description": {
          "zh": "与范奥斯霍特、维纳分析认证与密钥协商，并提出Station-to-Station协议，将身份绑定到交换过程。",
          "en": "With van Oorschot and Wiener, he analyzed authenticated key exchange and the Station-to-Station protocol, binding identities to the exchange."
        }
      }
    ],
    "timeline": [
      {
        "year": "1944",
        "text": {
          "zh": "生于华盛顿特区。",
          "en": "Born in Washington, D.C."
        }
      },
      {
        "year": "1965",
        "text": {
          "zh": "从MIT数学专业毕业。",
          "en": "Graduated in mathematics from MIT."
        }
      },
      {
        "year": "1974",
        "text": {
          "zh": "开始与赫尔曼合作研究密码。",
          "en": "Began cryptographic collaboration with Hellman."
        }
      },
      {
        "year": "1976",
        "text": {
          "zh": "共同发表《密码学的新方向》。",
          "en": "Coauthored New Directions in Cryptography."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Whitfield Diffie",
        "href": "https://computerhistory.org/profile/whitfield-diffie/"
      },
      {
        "title": "Diffie–Hellman · New Directions in Cryptography",
        "href": "https://ee.stanford.edu/~hellman/publications/24.pdf"
      },
      {
        "title": "Diffie, van Oorschot & Wiener · Authentication and authenticated key exchanges",
        "href": "https://people.scs.carleton.ca/~paulv/papers/sts-final.pdf"
      }
    ],
    "lifeDates": {
      "zh": "1944年生",
      "en": "Born 1944"
    }
  },
  {
    "id": "hellman",
    "name": {
      "zh": "赫尔曼",
      "en": "Hellman"
    },
    "fullName": "Martin Hellman",
    "born": 1945,
    "died": null,
    "place": {
      "zh": "纽约 → 斯坦福",
      "en": "New York → Stanford"
    },
    "field": {
      "zh": "公钥密码 · 密码分析",
      "en": "Public-key cryptography · Cryptanalysis"
    },
    "hook": {
      "zh": "密钥可以公开一部分，代价和风险怎样计算？",
      "en": "What can be public about a key, and at what computational cost?"
    },
    "summary": {
      "zh": "赫尔曼把密码研究从秘密通信设备扩展到开放网络中的密钥问题。他也研究攻击所需的时间、存储和预计算资源。",
      "en": "Hellman extended cryptography toward key management on open networks and studied the time, memory and precomputation resources required for attacks."
    },
    "portrait": {
      "src": "/images/computer-scientists/hellman.jpg",
      "alt": {
        "zh": "赫尔曼的资料肖像",
        "en": "Portrait of Martin Hellman"
      },
      "credit": {
        "zh": "User .:Ajvol:. on en.wikipedia · date unrecorded · CC BY-SA 3.0",
        "en": "User .:Ajvol:. on en.wikipedia · date unrecorded · CC BY-SA 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Martin-Hellman.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 3.0",
        "href": "http://creativecommons.org/licenses/by-sa/3.0/"
      }
    },
    "achievements": [
      {
        "year": "1976",
        "title": {
          "zh": "公钥密码框架",
          "en": "A framework for public-key cryptography"
        },
        "description": {
          "zh": "与迪菲讨论公开密钥和数字签名的新可能，回应网络规模扩大后密钥分发难题。拉尔夫·默克尔的相关独立工作同样重要。",
          "en": "With Diffie, he developed public-key and signature ideas for large networks. Ralph Merkle’s related independent work also remains essential to the history."
        }
      },
      {
        "year": "1976",
        "title": {
          "zh": "共享秘密的公开协商",
          "en": "Public negotiation of a shared secret"
        },
        "description": {
          "zh": "Diffie–Hellman交换利用群运算建立共享秘密；群的选择、参数验证和身份认证都是完整协议的一部分。",
          "en": "Diffie–Hellman exchange uses group operations to establish a secret; group selection, parameter validation and authentication matter to the complete protocol."
        }
      },
      {
        "year": "1980",
        "title": {
          "zh": "时间—存储折衷",
          "en": "Time–memory trade-offs"
        },
        "description": {
          "zh": "分析用预计算与存储表减少后续密码搜索时间的方法。它重新分配计算成本，并不等于免费消除所有密钥搜索。",
          "en": "Precomputed tables can reduce subsequent key-search time by spending memory and prior work. The cost is redistributed rather than eliminated."
        }
      }
    ],
    "timeline": [
      {
        "year": "1945",
        "text": {
          "zh": "生于纽约。",
          "en": "Born in New York."
        }
      },
      {
        "year": "1969",
        "text": {
          "zh": "在斯坦福获博士学位。",
          "en": "Earned his Stanford doctorate."
        }
      },
      {
        "year": "1971",
        "text": {
          "zh": "加入斯坦福教师队伍。",
          "en": "Joined Stanford’s faculty."
        }
      },
      {
        "year": "1976",
        "text": {
          "zh": "与迪菲发表公钥密码论文。",
          "en": "Published the public-key paper with Diffie."
        }
      }
    ],
    "sources": [
      {
        "title": "CHM · Martin Hellman",
        "href": "https://computerhistory.org/profile/martin-hellman/"
      },
      {
        "title": "Stanford · Hellman publications",
        "href": "https://ee.stanford.edu/~hellman/publications.html"
      }
    ],
    "lifeDates": {
      "zh": "1945年生",
      "en": "Born 1945"
    }
  },
  {
    "id": "yao",
    "name": {
      "zh": "姚期智",
      "en": "Yao"
    },
    "fullName": "Andrew Chi-Chih Yao",
    "born": 1946,
    "died": null,
    "place": {
      "zh": "上海 → 台湾 → 哈佛 → 普林斯顿 → 清华",
      "en": "Shanghai → Taiwan → Harvard → Princeton → Tsinghua"
    },
    "field": {
      "zh": "复杂性 · 通信 · 密码",
      "en": "Complexity · Communication · Cryptography"
    },
    "hook": {
      "zh": "计算不仅花时间，也要交换信息；这些代价怎样衡量？",
      "en": "Computation costs time and communication: how can both be measured?"
    },
    "summary": {
      "zh": "姚期智把随机算法、通信代价和安全计算放进精确模型。他的理论说明，限制参与者知道什么、交换什么，会改变计算问题的结构。",
      "en": "Yao developed precise models of randomized algorithms, communication and secure computation, showing how limits on knowledge and information exchange reshape computational problems."
    },
    "portrait": {
      "src": "/images/computer-scientists/yao.jpg",
      "alt": {
        "zh": "姚期智的资料肖像",
        "en": "Portrait of Andrew Chi-Chih Yao"
      },
      "credit": {
        "zh": "David.Monniaux · 2015 · Commons crop · CC BY-SA 4.0",
        "en": "David.Monniaux · 2015 · Commons crop · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Andrew_Yao_P1130016_(cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1977",
        "title": {
          "zh": "随机算法的极小极大方法",
          "en": "A minimax method for randomized algorithms"
        },
        "description": {
          "zh": "用输入分布下确定性算法的平均成本，为随机算法的最坏情形期望成本建立下界。必须说明成本模型和允许的算法。",
          "en": "Average costs of deterministic algorithms under input distributions yield lower bounds for worst-case expected costs of randomized algorithms, relative to a specified model."
        }
      },
      {
        "year": "1979",
        "title": {
          "zh": "通信复杂性",
          "en": "Communication complexity"
        },
        "description": {
          "zh": "把输入分散在不同参与者手中，研究为计算共同函数至少需要交换多少比特。计算能力很强，也可能受到通信瓶颈限制。",
          "en": "With inputs split across participants, the model asks how many bits must be exchanged to compute a shared function. Communication can remain a bottleneck even with powerful local computation."
        }
      },
      {
        "year": "1982–1986",
        "title": {
          "zh": "安全两方计算",
          "en": "Secure two-party computation"
        },
        "description": {
          "zh": "提出隐私计算问题并发展混淆电路思想，使双方在适当密码假设和威胁模型下共同计算，而不额外泄露各自输入。",
          "en": "Secure computation and garbled circuits let two parties compute jointly without revealing additional input information, under appropriate cryptographic assumptions and adversary models."
        }
      }
    ],
    "timeline": [
      {
        "year": "1946",
        "text": {
          "zh": "生于上海。",
          "en": "Born in Shanghai."
        }
      },
      {
        "year": "1972–1975",
        "text": {
          "zh": "先后取得物理与计算机科学博士学位。",
          "en": "Earned doctorates in physics and computer science."
        }
      },
      {
        "year": "1986",
        "text": {
          "zh": "到普林斯顿任教。",
          "en": "Joined Princeton University."
        }
      },
      {
        "year": "2004",
        "text": {
          "zh": "到清华开展计算机科学研究与教育。",
          "en": "Moved to Tsinghua to develop computing research and education."
        }
      }
    ],
    "sources": [
      {
        "title": "Tsinghua · Andrew Yao",
        "href": "https://iiis.tsinghua.edu.cn/en/People/Faculty/yaoqizhi.htm"
      },
      {
        "title": "ACM · Andrew Yao biography",
        "href": "https://amturing.acm.org/award_winners/yao_1611524.cfm"
      }
    ],
    "lifeDates": {
      "zh": "1946年生",
      "en": "Born 1946"
    }
  },
  {
    "id": "hinton",
    "name": {
      "zh": "辛顿",
      "en": "Hinton"
    },
    "fullName": "Geoffrey Hinton",
    "born": 1947,
    "died": null,
    "place": {
      "zh": "伦敦 → 爱丁堡 → 多伦多",
      "en": "London → Edinburgh → Toronto"
    },
    "field": {
      "zh": "神经网络 · 表示学习",
      "en": "Neural networks · Representation learning"
    },
    "hook": {
      "zh": "模型能否自己学出有用的内部表示？",
      "en": "Can a model learn useful internal representations?"
    },
    "summary": {
      "zh": "辛顿与多代合作者研究神经网络如何学习表示，从梯度训练到生成模型和视觉网络。成果来自模型、算法、数据和计算资源的共同进展。",
      "en": "Hinton and collaborators developed ways for neural networks to learn representations, combining advances in models, algorithms, data and computing resources."
    },
    "portrait": {
      "src": "/images/computer-scientists/hinton.jpg",
      "alt": {
        "zh": "辛顿的资料肖像",
        "en": "Portrait of Geoffrey Hinton"
      },
      "credit": {
        "zh": "Cmichel67 · 2026 · CC BY-SA 4.0",
        "en": "Cmichel67 · 2026 · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Geoffrey_Hinton_in_2026.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1986",
        "title": {
          "zh": "推广多层网络的反向传播",
          "en": "Popularizing backpropagation for multilayer networks"
        },
        "description": {
          "zh": "与鲁梅尔哈特、威廉斯展示通过误差梯度学习内部表示。相关求导思想有更早来源，不把全部反向传播历史归于这篇论文。",
          "en": "With Rumelhart and Williams, he demonstrated representation learning through error gradients. Earlier differentiation methods remain part of backpropagation’s history."
        }
      },
      {
        "year": "2006",
        "title": {
          "zh": "深度信念网络",
          "en": "Deep belief networks"
        },
        "description": {
          "zh": "与合作者用逐层学习初始化深层生成模型，在当时帮助缓解深层网络训练困难；它不是今天所有深度模型的统一结构。",
          "en": "Layerwise learning initialized deep generative models and eased some training difficulties at the time, without defining every modern deep-learning architecture."
        }
      },
      {
        "year": "2012",
        "title": {
          "zh": "AlexNet合作研究",
          "en": "The AlexNet collaboration"
        },
        "description": {
          "zh": "与克里热夫斯基、苏茨克维共同研究使用GPU训练的深层卷积网络，在ImageNet竞赛取得突破。结果依赖网络、训练、数据和硬件组合。",
          "en": "With Krizhevsky and Sutskever, GPU-trained deep convolutional networks achieved a major ImageNet result through a combination of architecture, training, data and hardware."
        }
      }
    ],
    "timeline": [
      {
        "year": "1947",
        "text": {
          "zh": "生于伦敦。",
          "en": "Born in London."
        }
      },
      {
        "year": "1978",
        "text": {
          "zh": "在爱丁堡完成博士学位。",
          "en": "Completed his doctorate at Edinburgh."
        }
      },
      {
        "year": "1987",
        "text": {
          "zh": "到多伦多大学开展研究。",
          "en": "Joined the University of Toronto."
        }
      },
      {
        "year": "2012",
        "text": {
          "zh": "与学生发表AlexNet工作。",
          "en": "Published the AlexNet work with students."
        }
      }
    ],
    "sources": [
      {
        "title": "University of Toronto · Geoffrey Hinton",
        "href": "https://www.cs.toronto.edu/~hinton/"
      },
      {
        "title": "LeCun, Bengio & Hinton · Deep learning",
        "href": "https://www.nature.com/articles/nature14539"
      },
      {
        "title": "Krizhevsky, Sutskever & Hinton · ImageNet classification",
        "href": "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks"
      }
    ],
    "lifeDates": {
      "zh": "1947年生",
      "en": "Born 1947"
    }
  },
  {
    "id": "rivest",
    "name": {
      "zh": "里维斯特",
      "en": "Rivest"
    },
    "fullName": "Ron Rivest",
    "born": 1947,
    "died": null,
    "place": {
      "zh": "斯克内克塔迪 → 耶鲁 → 斯坦福 → MIT",
      "en": "Schenectady → Yale → Stanford → MIT"
    },
    "field": {
      "zh": "密码 · 算法 · 可验证选举",
      "en": "Cryptography · Algorithms · Verifiable elections"
    },
    "hook": {
      "zh": "安全主张，怎样变成可以检验的数学条件？",
      "en": "How can a security claim become a checkable mathematical condition?"
    },
    "summary": {
      "zh": "里维斯特从算法研究走向公钥密码、哈希与选举验证。他将具体实现与攻击模型放在一起，强调安全机制需要持续接受检验。",
      "en": "Rivest worked across algorithms, public-key cryptography, hashing and election verification, examining implementations together with their adversary models."
    },
    "portrait": {
      "src": "/images/computer-scientists/rivest.jpg",
      "alt": {
        "zh": "里维斯特的资料肖像",
        "en": "Portrait of Ron Rivest"
      },
      "credit": {
        "zh": "Ronald L. Rivest · date unrecorded · CC BY-SA 4.0",
        "en": "Ronald L. Rivest · date unrecorded · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Ronald_L_Rivest_photo.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1977–1978",
        "title": {
          "zh": "RSA",
          "en": "RSA"
        },
        "description": {
          "zh": "与沙米尔、阿德尔曼提出基于模幂运算的公钥方案。实际安全应用需要正确填充、参数和协议；原始RSA不是可直接使用的通用加密接口。",
          "en": "With Shamir and Adleman, he developed a modular-exponentiation public-key system. Practical use requires correct encoding, parameters and protocols; raw RSA is not a safe general-purpose interface."
        }
      },
      {
        "year": "1990–1992",
        "title": {
          "zh": "MD4与MD5",
          "en": "MD4 and MD5"
        },
        "description": {
          "zh": "设计快速消息摘要算法，推动软件哈希研究。后来发现的碰撞攻击意味着这些算法不应再用于需要抗碰撞安全的场景。",
          "en": "He designed fast message-digest algorithms. Later collision attacks mean these designs are unsuitable where collision resistance is required."
        }
      },
      {
        "year": "2000年代起",
        "title": {
          "zh": "选举验证与审计",
          "en": "Election verification and auditing"
        },
        "description": {
          "zh": "与合作者研究可验证投票和统计审计，使结果验证尽量不依赖对某一台机器的完全信任。",
          "en": "With collaborators, he studied verifiable voting and statistical audits to reduce reliance on complete trust in a particular machine."
        }
      }
    ],
    "timeline": [
      {
        "year": "1947",
        "text": {
          "zh": "生于纽约州斯克内克塔迪。",
          "en": "Born in Schenectady, New York."
        }
      },
      {
        "year": "1974",
        "text": {
          "zh": "获斯坦福博士学位，随后加入MIT。",
          "en": "Joined MIT after completing his Stanford doctorate."
        }
      },
      {
        "year": "1977",
        "text": {
          "zh": "与沙米尔、阿德尔曼设计RSA。",
          "en": "Developed RSA with Shamir and Adleman."
        }
      },
      {
        "year": "2000年代",
        "text": {
          "zh": "扩展选举安全与审计研究。",
          "en": "Expanded research on election security and auditing."
        }
      }
    ],
    "sources": [
      {
        "title": "MIT · Ronald Rivest",
        "href": "https://people.csail.mit.edu/rivest/"
      },
      {
        "title": "Rivest, Shamir & Adleman · RSA paper",
        "href": "https://people.csail.mit.edu/rivest/Rsapaper.pdf"
      }
    ],
    "lifeDates": {
      "zh": "1947年生",
      "en": "Born 1947"
    }
  },
  {
    "id": "perlman",
    "name": {
      "zh": "珀尔曼",
      "en": "Perlman"
    },
    "fullName": "Radia Perlman",
    "born": 1951,
    "died": null,
    "place": {
      "zh": "弗吉尼亚 → MIT → DEC",
      "en": "Virginia → MIT → DEC"
    },
    "field": {
      "zh": "网络协议 · 路由",
      "en": "Network protocols · Routing"
    },
    "hook": {
      "zh": "有冗余连接的网络，怎样避免绕圈？",
      "en": "How can a redundant network avoid forwarding loops?"
    },
    "summary": {
      "zh": "珀尔曼把网络可靠性落实为可部署的协议。她研究桥接、路由和故障情况，让互联系统能在变化中维持清楚的行为。",
      "en": "Perlman translated network reliability into deployable protocols for bridging, routing and failures, preserving understandable behavior as interconnected systems change."
    },
    "portrait": {
      "src": "/images/computer-scientists/perlman.jpg",
      "alt": {
        "zh": "珀尔曼的资料肖像",
        "en": "Portrait of Radia Perlman"
      },
      "credit": {
        "zh": "Scientist-100 at English Wikipedia · date unrecorded · Public domain",
        "en": "Scientist-100 at English Wikipedia · date unrecorded · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Radia_Perlman_2009.jpg",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1985",
        "title": {
          "zh": "生成树协议",
          "en": "Spanning Tree Protocol"
        },
        "description": {
          "zh": "在存在环路的以太网桥接拓扑中选择无环转发结构，并在连接变化后重新计算。阻塞部分链路是避免帧无限循环的代价。",
          "en": "A loop-free forwarding tree is selected from a redundant bridged Ethernet topology and recomputed after changes, trading blocked links for loop avoidance."
        }
      },
      {
        "year": "1980年代",
        "title": {
          "zh": "链路状态路由设计",
          "en": "Link-state routing design"
        },
        "description": {
          "zh": "参与发展稳健、可扩展的路由机制，包括IS-IS相关工作，使节点根据拓扑信息计算转发路径。",
          "en": "She helped develop robust, scalable routing mechanisms including work on IS-IS, using topology information to compute forwarding paths."
        }
      },
      {
        "year": "2004–2011",
        "title": {
          "zh": "TRILL与路由桥",
          "en": "TRILL and routing bridges"
        },
        "description": {
          "zh": "将路由思想引入二层桥接，支持更充分使用多条路径，同时避免传统桥接的环路问题。",
          "en": "Routing concepts enter link-layer bridging, enabling better use of multiple paths while addressing forwarding loops."
        }
      }
    ],
    "timeline": [
      {
        "year": "1951",
        "text": {
          "zh": "生于弗吉尼亚州。",
          "en": "Born in Virginia."
        }
      },
      {
        "year": "1973–1976",
        "text": {
          "zh": "在MIT完成数学学士与硕士学位。",
          "en": "Completed mathematics bachelor’s and master’s degrees at MIT."
        }
      },
      {
        "year": "1985",
        "text": {
          "zh": "提出生成树算法。",
          "en": "Developed the spanning-tree algorithm."
        }
      },
      {
        "year": "1988",
        "text": {
          "zh": "在MIT获计算机科学博士学位。",
          "en": "Earned her computer-science doctorate at MIT."
        }
      }
    ],
    "sources": [
      {
        "title": "Internet Hall of Fame · Radia Perlman",
        "href": "https://www.internethalloffame.org/inductee/radia-perlman/"
      },
      {
        "title": "RFC 6325 · Routing Bridges: Base Protocol",
        "href": "https://www.rfc-editor.org/rfc/rfc6325.html"
      }
    ],
    "lifeDates": {
      "zh": "1951年生",
      "en": "Born 1951"
    }
  },
  {
    "id": "shamir",
    "name": {
      "zh": "沙米尔",
      "en": "Shamir"
    },
    "fullName": "Adi Shamir",
    "born": 1952,
    "died": null,
    "place": {
      "zh": "特拉维夫 → 魏茨曼 → MIT",
      "en": "Tel Aviv → Weizmann → MIT"
    },
    "field": {
      "zh": "密码 · 秘密分享 · 交互证明",
      "en": "Cryptography · Secret sharing · Interactive proofs"
    },
    "hook": {
      "zh": "一份秘密，可以安全地分给多人保存吗？",
      "en": "Can a secret be safely divided among several people?"
    },
    "summary": {
      "zh": "沙米尔同时研究构造安全机制和分析计算能力。他的成果连接公钥密码、阈值分享与交互证明，强调模型中的精确保证。",
      "en": "Shamir connected public-key cryptography, threshold sharing and interactive proofs, examining both security constructions and the power of computation."
    },
    "portrait": {
      "src": "/images/computer-scientists/shamir.jpg",
      "alt": {
        "zh": "沙米尔的资料肖像",
        "en": "Portrait of Adi Shamir"
      },
      "credit": {
        "zh": "Duncan.Hull · 2018 · CC BY-SA 4.0",
        "en": "Duncan.Hull · 2018 · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Adi_Shamir_Royal_Society.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1977–1978",
        "title": {
          "zh": "共同提出RSA",
          "en": "Co-developing RSA"
        },
        "description": {
          "zh": "与里维斯特、阿德尔曼把数论运算组织为公钥加密与签名方案。因数分解困难是相关安全背景，但各种RSA攻击模型需分别分析。",
          "en": "With Rivest and Adleman, he organized number-theoretic operations into public-key encryption and signatures. Different RSA security claims require separate analysis."
        }
      },
      {
        "year": "1979",
        "title": {
          "zh": "阈值秘密分享",
          "en": "Threshold secret sharing"
        },
        "description": {
          "zh": "在有限域中用随机多项式分散秘密；足够多份额可以插值恢复，少于阈值的份额不透露秘密信息。随机系数和域参数是保证的一部分。",
          "en": "Random polynomials over a finite field distribute a secret. Enough shares reconstruct it by interpolation; fewer than the threshold reveal no information under the scheme’s conditions."
        }
      },
      {
        "year": "1992",
        "title": {
          "zh": "IP=PSPACE",
          "en": "IP equals PSPACE"
        },
        "description": {
          "zh": "证明随机多项式时间验证器与计算不受限证明者的交互，可验证恰好PSPACE中的语言。验证能力增加，依赖交互与随机性的明确模型。",
          "en": "Interactive proofs with a probabilistic polynomial-time verifier characterize PSPACE, demonstrating the power of interaction and randomness in a precise model."
        }
      }
    ],
    "timeline": [
      {
        "year": "1952",
        "text": {
          "zh": "生于特拉维夫。",
          "en": "Born in Tel Aviv."
        }
      },
      {
        "year": "1977",
        "text": {
          "zh": "在魏茨曼研究所完成博士学位。",
          "en": "Completed his doctorate at Weizmann."
        }
      },
      {
        "year": "1977–1979",
        "text": {
          "zh": "在MIT参与RSA并提出秘密分享。",
          "en": "Worked on RSA at MIT and introduced secret sharing."
        }
      },
      {
        "year": "1980起",
        "text": {
          "zh": "在魏茨曼继续密码与复杂性研究。",
          "en": "Continued cryptography and complexity research at Weizmann."
        }
      }
    ],
    "sources": [
      {
        "title": "Weizmann · Adi Shamir",
        "href": "https://www.wisdom.weizmann.ac.il/~shamir/"
      },
      {
        "title": "Rivest, Shamir & Adleman · RSA",
        "href": "https://people.csail.mit.edu/rivest/Rsapaper.pdf"
      },
      {
        "title": "Shamir · IP = PSPACE",
        "href": "https://doi.org/10.1145/146585.146609"
      }
    ],
    "lifeDates": {
      "zh": "1952年生",
      "en": "Born 1952"
    }
  },
  {
    "id": "berners-lee",
    "name": {
      "zh": "伯纳斯-李",
      "en": "Berners-Lee"
    },
    "fullName": "Tim Berners-Lee",
    "born": 1955,
    "died": null,
    "place": {
      "zh": "伦敦 → 牛津 → CERN → MIT",
      "en": "London → Oxford → CERN → MIT"
    },
    "field": {
      "zh": "万维网 · 开放标准 · 数据",
      "en": "World Wide Web · Open standards · Data"
    },
    "hook": {
      "zh": "分散在不同机器上的文档，能否直接互相链接？",
      "en": "Can documents on different machines link directly to one another?"
    },
    "summary": {
      "zh": "伯纳斯-李把超文本与互联网结合，发展万维网的早期协议和软件。之后，他持续推动互操作标准与更由用户控制的数据架构。",
      "en": "Berners-Lee connected hypertext with the Internet through early Web protocols and software, then worked on interoperability and user-controlled data architectures."
    },
    "portrait": {
      "src": "/images/computer-scientists/berners-lee.jpg",
      "alt": {
        "zh": "伯纳斯-李的资料肖像",
        "en": "Portrait of Tim Berners-Lee"
      },
      "credit": {
        "zh": "Summit · 2025 · Commons crop · CC BY 4.0",
        "en": "Summit · 2025 · Commons crop · CC BY 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Tim_Berners-Lee_at_the_2025_Web_Summit_(Cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY 4.0",
        "href": "https://creativecommons.org/licenses/by/4.0"
      }
    },
    "achievements": [
      {
        "year": "1989–1990",
        "title": {
          "zh": "万维网的模型与实现",
          "en": "The Web model and implementation"
        },
        "description": {
          "zh": "在CERN提出跨系统链接文档的方案，并编写首个Web浏览器与服务器。万维网运行在互联网之上，二者不是同一个概念。",
          "en": "At CERN he proposed linked documents across systems and implemented the first Web browser and server. The Web runs over the Internet; they are not synonymous."
        }
      },
      {
        "year": "1990年代",
        "title": {
          "zh": "URI、HTTP与HTML",
          "en": "URI, HTTP and HTML"
        },
        "description": {
          "zh": "以标识、传输和文档格式的分工建立互操作基础，随后通过开放标准协作继续演进。",
          "en": "Identifiers, transfer protocols and document formats provided an interoperable foundation, later refined through open standards work."
        }
      },
      {
        "year": "2010年代",
        "title": {
          "zh": "Solid与个人数据控制",
          "en": "Solid and personal data control"
        },
        "description": {
          "zh": "参与发展将数据存储与应用分离的架构，通过统一访问接口让用户选择数据存放与授权方式。",
          "en": "He helped develop architectures separating application logic from data storage, with standardized access allowing users more control over location and permissions."
        }
      }
    ],
    "timeline": [
      {
        "year": "1955",
        "text": {
          "zh": "生于伦敦。",
          "en": "Born in London."
        }
      },
      {
        "year": "1976",
        "text": {
          "zh": "完成牛津物理学学位。",
          "en": "Completed a physics degree at Oxford."
        }
      },
      {
        "year": "1989–1990",
        "text": {
          "zh": "在CERN提出并实现Web。",
          "en": "Proposed and implemented the Web at CERN."
        }
      },
      {
        "year": "1994",
        "text": {
          "zh": "创建W3C推动开放Web标准。",
          "en": "Founded W3C to develop open Web standards."
        }
      }
    ],
    "sources": [
      {
        "title": "W3C · Tim Berners-Lee",
        "href": "https://www.w3.org/People/Berners-Lee/"
      },
      {
        "title": "CERN · The birth of the Web",
        "href": "https://home.cern/science/computing/the-birth-of-the-web"
      }
    ],
    "lifeDates": {
      "zh": "1955年生",
      "en": "Born 1955"
    }
  },
  {
    "id": "goldwasser",
    "name": {
      "zh": "戈德瓦塞尔",
      "en": "Goldwasser"
    },
    "fullName": "Shafi Goldwasser",
    "born": 1958,
    "died": null,
    "place": {
      "zh": "纽约与以色列 → 伯克利 → MIT",
      "en": "New York and Israel → Berkeley → MIT"
    },
    "field": {
      "zh": "可证明安全 · 零知识",
      "en": "Provable security · Zero knowledge"
    },
    "hook": {
      "zh": "怎样证明自己知道答案，却不透露答案本身？",
      "en": "How can knowledge be demonstrated without revealing the secret?"
    },
    "summary": {
      "zh": "戈德瓦塞尔把密码安全表述为可分析的定义、规约与概率保证。她与合作者发展概率加密、零知识和可证明安全的签名。",
      "en": "Goldwasser formalized cryptographic security through definitions, reductions and probabilistic guarantees, developing probabilistic encryption, zero knowledge and secure signatures with collaborators."
    },
    "portrait": {
      "src": "/images/computer-scientists/goldwasser.jpg",
      "alt": {
        "zh": "戈德瓦塞尔的资料肖像",
        "en": "Portrait of Shafi Goldwasser"
      },
      "credit": {
        "zh": "Weizmann Institute of Science · date unrecorded · Public domain",
        "en": "Weizmann Institute of Science · date unrecorded · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Shafi_Goldwasser.JPG",
      "kind": "portrait",
      "license": {
        "label": "Public domain",
        "href": "https://creativecommons.org/publicdomain/mark/1.0/"
      }
    },
    "achievements": [
      {
        "year": "1982–1984",
        "title": {
          "zh": "概率加密与语义安全",
          "en": "Probabilistic encryption and semantic security"
        },
        "description": {
          "zh": "与西尔维奥·米卡利通过随机化加密和形式安全定义，研究攻击者能否从密文获得额外有效信息。",
          "en": "With Silvio Micali, randomized encryption and formal definitions characterize whether ciphertext reveals additional efficiently obtainable information."
        }
      },
      {
        "year": "1985–1989",
        "title": {
          "zh": "零知识交互证明",
          "en": "Zero-knowledge interactive proofs"
        },
        "description": {
          "zh": "与米卡利、拉科夫研究证明者如何使验证者相信命题，同时使验证者的所得可由不知秘密的模拟器重现。模型不同，零知识保证也不同。",
          "en": "With Micali and Rackoff, she studied convincing a verifier while making its view simulatable without the secret. Guarantees depend on the precise zero-knowledge model."
        }
      },
      {
        "year": "1988",
        "title": {
          "zh": "抵抗选择消息攻击的签名",
          "en": "Signatures against chosen-message attacks"
        },
        "description": {
          "zh": "与米卡利、里维斯特构造并分析数字签名，明确允许攻击者索取哪些签名、以及怎样定义成功伪造。",
          "en": "With Micali and Rivest, she constructed and analyzed signatures using explicit chosen-message attacks and a precise definition of forgery."
        }
      }
    ],
    "timeline": [
      {
        "year": "1958",
        "text": {
          "zh": "生于纽约。",
          "en": "Born in New York."
        }
      },
      {
        "year": "1979",
        "text": {
          "zh": "从卡内基梅隆数学专业毕业。",
          "en": "Graduated in mathematics from Carnegie Mellon."
        }
      },
      {
        "year": "1983–1984",
        "text": {
          "zh": "完成伯克利博士研究并加入MIT。",
          "en": "Completed doctoral research at Berkeley and joined MIT."
        }
      },
      {
        "year": "1993",
        "text": {
          "zh": "兼任魏茨曼研究所教授。",
          "en": "Also became a professor at Weizmann."
        }
      }
    ],
    "sources": [
      {
        "title": "MIT CSAIL · Shafi Goldwasser",
        "href": "https://www.csail.mit.edu/person/shafi-goldwasser"
      },
      {
        "title": "Weizmann · Institutional biography",
        "href": "https://www.wisdom.weizmann.ac.il/~/oded/COL/bio.pdf"
      },
      {
        "title": "Goldwasser–Micali · Probabilistic encryption",
        "href": "https://doi.org/10.1016/0022-0000(84)90070-9"
      }
    ],
    "lifeDates": {
      "zh": "1958年生",
      "en": "Born 1958"
    }
  },
  {
    "id": "lecun",
    "name": {
      "zh": "勒昆",
      "en": "LeCun"
    },
    "fullName": "Yann LeCun",
    "born": 1960,
    "died": null,
    "place": {
      "zh": "法国 → 多伦多 → 贝尔实验室 → 纽约",
      "en": "France → Toronto → Bell Labs → New York"
    },
    "field": {
      "zh": "卷积网络 · 视觉 · 能量模型",
      "en": "Convolutional networks · Vision · Energy models"
    },
    "hook": {
      "zh": "图像平移一点，识别器为什么要从头学起？",
      "en": "Why should a small shift in an image require learning everything again?"
    },
    "summary": {
      "zh": "勒昆把结构性先验与梯度学习结合，发展实用的卷积网络和表示学习方法。他的工作重视可训练系统的完整设计。",
      "en": "LeCun combined structural priors with gradient-based learning in convolutional networks and representation learning, emphasizing complete trainable systems."
    },
    "portrait": {
      "src": "/images/computer-scientists/lecun.jpg",
      "alt": {
        "zh": "勒昆的资料肖像",
        "en": "Portrait of Yann LeCun"
      },
      "credit": {
        "zh": "Jérémy Barande · 2024 · Commons crop · CC BY-SA 2.0",
        "en": "Jérémy Barande · 2024 · Commons crop · CC BY-SA 2.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Laura_Chaubard_%26_Yann_Le_Cun_-_2024_(53814052697)_(cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0",
        "href": "https://creativecommons.org/licenses/by-sa/2.0"
      }
    },
    "achievements": [
      {
        "year": "1989",
        "title": {
          "zh": "可训练卷积网络",
          "en": "Trainable convolutional networks"
        },
        "description": {
          "zh": "以局部连接和共享权重利用图像的空间结构，减少参数，并通过梯度方法学习识别规则。",
          "en": "Local connections and shared weights exploit spatial structure, reducing parameters while gradient methods learn recognition rules."
        }
      },
      {
        "year": "1998",
        "title": {
          "zh": "LeNet与文档识别",
          "en": "LeNet and document recognition"
        },
        "description": {
          "zh": "与博图、本吉奥、哈夫纳等人整合卷积网络和识别流程，使手写字符识别成为可部署系统。",
          "en": "With Bottou, Bengio, Haffner and others, he integrated convolutional networks into deployable handwriting and document-recognition systems."
        }
      },
      {
        "year": "2006起",
        "title": {
          "zh": "能量模型的学习框架",
          "en": "Energy-based learning"
        },
        "description": {
          "zh": "用相容性或能量函数评价输入与输出组合，再学习降低正确配置的能量。模型是否给出规范化概率，取决于具体构造。",
          "en": "Energy or compatibility functions score input-output configurations; training favors appropriate configurations. A normalized probability model requires additional structure."
        }
      }
    ],
    "timeline": [
      {
        "year": "1960",
        "text": {
          "zh": "生于法国。",
          "en": "Born in France."
        }
      },
      {
        "year": "1987",
        "text": {
          "zh": "在巴黎获博士学位，随后赴多伦多做博士后研究。",
          "en": "Completed his Paris doctorate and began postdoctoral work in Toronto."
        }
      },
      {
        "year": "1988",
        "text": {
          "zh": "加入贝尔实验室。",
          "en": "Joined Bell Labs."
        }
      },
      {
        "year": "2003",
        "text": {
          "zh": "加入纽约大学。",
          "en": "Joined New York University."
        }
      }
    ],
    "sources": [
      {
        "title": "Yann LeCun · Research website",
        "href": "https://yann.lecun.com/"
      },
      {
        "title": "LeCun et al. · Gradient-Based Learning Applied to Document Recognition",
        "href": "http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf"
      },
      {
        "title": "LeCun, Bengio & Hinton · Deep learning",
        "href": "https://www.nature.com/articles/nature14539"
      }
    ],
    "lifeDates": {
      "zh": "1960年生",
      "en": "Born 1960"
    }
  },
  {
    "id": "bengio",
    "name": {
      "zh": "本吉奥",
      "en": "Bengio"
    },
    "fullName": "Yoshua Bengio",
    "born": 1964,
    "died": null,
    "place": {
      "zh": "巴黎 → 麦吉尔 → 蒙特利尔",
      "en": "Paris → McGill → Montreal"
    },
    "field": {
      "zh": "深度学习 · 语言模型",
      "en": "Deep learning · Language models"
    },
    "hook": {
      "zh": "词之间的相似性，能否成为可学习的坐标？",
      "en": "Can similarities between words become learned coordinates?"
    },
    "summary": {
      "zh": "本吉奥研究用分布式表示学习语言和其他复杂数据。他与合作者连接概率模型、深层训练和注意力机制，让表示能够随任务调整。",
      "en": "Bengio connected distributed representations, probabilistic models, deep training and attention so that representations could adapt to complex learning tasks."
    },
    "portrait": {
      "src": "/images/computer-scientists/bengio.jpg",
      "alt": {
        "zh": "本吉奥的资料肖像",
        "en": "Portrait of Yoshua Bengio"
      },
      "credit": {
        "zh": "Xuthoria · 2025 · CC BY-SA 4.0",
        "en": "Xuthoria · 2025 · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:ICLR_2025_-_Yoshua_Bengio_02.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "2003",
        "title": {
          "zh": "神经概率语言模型",
          "en": "Neural probabilistic language models"
        },
        "description": {
          "zh": "学习词向量并估计词序列概率，让统计规律能够在相似词之间共享。模型的预测能力来自训练数据和结构，不等同于理解所有语言。",
          "en": "Learned word vectors share statistical strength when estimating sequence probabilities. Predictive performance depends on data and structure rather than universal language understanding."
        }
      },
      {
        "year": "2006–2007",
        "title": {
          "zh": "深层网络的逐层训练",
          "en": "Layerwise training of deep networks"
        },
        "description": {
          "zh": "与合作者研究贪心逐层学习，为当时难以训练的深层网络提供初始化与表示学习方法。",
          "en": "Greedy layerwise methods helped initialize and learn representations for deep networks that were difficult to train at the time."
        }
      },
      {
        "year": "2014–2015",
        "title": {
          "zh": "神经机器翻译中的注意力",
          "en": "Attention in neural machine translation"
        },
        "description": {
          "zh": "与巴赫达瑙、Kyunghyun Cho研究在生成每个词时软选择相关源位置。它是注意力机制的重要进展，不是后来Transformer全部设计的来源。",
          "en": "With Bahdanau and Cho, he used soft alignment to select relevant source positions during translation, an important attention mechanism rather than the complete later Transformer design."
        }
      }
    ],
    "timeline": [
      {
        "year": "1964",
        "text": {
          "zh": "生于巴黎。",
          "en": "Born in Paris."
        }
      },
      {
        "year": "1991",
        "text": {
          "zh": "在麦吉尔获博士学位。",
          "en": "Earned his McGill doctorate."
        }
      },
      {
        "year": "1993",
        "text": {
          "zh": "加入蒙特利尔大学。",
          "en": "Joined Université de Montréal."
        }
      },
      {
        "year": "2003–2015",
        "text": {
          "zh": "发展神经语言模型与注意力翻译研究。",
          "en": "Developed neural-language and attention-based translation research."
        }
      }
    ],
    "sources": [
      {
        "title": "Yoshua Bengio · Research biography",
        "href": "https://yoshuabengio.org/"
      },
      {
        "title": "Bengio et al. · A Neural Probabilistic Language Model",
        "href": "https://www.jmlr.org/papers/v3/bengio03a.html"
      },
      {
        "title": "Bahdanau, Cho & Bengio · Neural Machine Translation",
        "href": "https://arxiv.org/abs/1409.0473"
      }
    ],
    "lifeDates": {
      "zh": "1964年生",
      "en": "Born 1964"
    }
  },
  {
    "id": "fei-fei-li",
    "name": {
      "zh": "李飞飞",
      "en": "Fei-Fei Li"
    },
    "fullName": "Fei-Fei Li",
    "born": 1976,
    "died": null,
    "place": {
      "zh": "北京 → 普林斯顿 → 加州理工 → 斯坦福",
      "en": "Beijing → Princeton → Caltech → Stanford"
    },
    "field": {
      "zh": "计算机视觉 · 数据集",
      "en": "Computer vision · Datasets"
    },
    "hook": {
      "zh": "视觉模型需要看过多少世界，才能可靠地识别？",
      "en": "How much of the world must a vision model see to recognize it reliably?"
    },
    "summary": {
      "zh": "李飞飞与团队把视觉学习、数据集建设和评估连接起来。她的研究既问模型如何从少量例子学习，也问规模化数据如何改变整个研究领域。",
      "en": "Li and her teams connected visual learning, dataset construction and evaluation, studying both learning from few examples and the effects of large-scale data on research."
    },
    "portrait": {
      "src": "/images/computer-scientists/fei-fei-li.jpg",
      "alt": {
        "zh": "李飞飞的资料肖像",
        "en": "Portrait of Fei-Fei Li"
      },
      "credit": {
        "zh": "ITU Pictures · 2017 · CC BY 2.0",
        "en": "ITU Pictures · 2017 · CC BY 2.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Fei-Fei_Li_at_AI_for_Good_2017.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY 2.0",
        "href": "https://creativecommons.org/licenses/by/2.0"
      }
    },
    "achievements": [
      {
        "year": "2003–2006",
        "title": {
          "zh": "少样本视觉学习",
          "en": "Learning visual categories from few examples"
        },
        "description": {
          "zh": "与合作者用已有类别提供的知识帮助学习新对象，探索先验与贝叶斯方法怎样减少所需样本。",
          "en": "Knowledge from previous categories supports learning new objects through priors and Bayesian methods, reducing sample requirements under the model’s assumptions."
        }
      },
      {
        "year": "2009",
        "title": {
          "zh": "ImageNet",
          "en": "ImageNet"
        },
        "description": {
          "zh": "与邓嘉等合作者构建按语义层级组织的大规模图像数据库，并推动共同评测。数据集的标注与偏差仍需要持续审查。",
          "en": "With Jia Deng and collaborators, she built a large image database organized by semantic categories and supported shared evaluation, with continuing scrutiny of labels and biases."
        }
      },
      {
        "year": "2016",
        "title": {
          "zh": "视觉关系识别",
          "en": "Visual relationship detection"
        },
        "description": {
          "zh": "与陆策吾等人研究对象之间的关系，使视觉描述从「有什么」扩展为「什么与什么如何相连」。",
          "en": "With Cewu Lu and colleagues, she studied relations between objects, extending recognition from what is present to how objects are connected."
        }
      }
    ],
    "timeline": [
      {
        "year": "1976",
        "text": {
          "zh": "生于北京。",
          "en": "Born in Beijing."
        }
      },
      {
        "year": "1999",
        "text": {
          "zh": "从普林斯顿物理学专业毕业。",
          "en": "Graduated in physics from Princeton."
        }
      },
      {
        "year": "2005",
        "text": {
          "zh": "在加州理工完成博士研究。",
          "en": "Completed her doctorate at Caltech."
        }
      },
      {
        "year": "2009",
        "text": {
          "zh": "加入斯坦福并参与发表ImageNet论文。",
          "en": "Joined Stanford and coauthored the ImageNet paper."
        }
      }
    ],
    "sources": [
      {
        "title": "Stanford · Fei-Fei Li",
        "href": "https://profiles.stanford.edu/fei-fei-li"
      },
      {
        "title": "Stanford Vision Lab · Publications",
        "href": "https://vision.stanford.edu/publications.html"
      },
      {
        "title": "ImageNet Large Scale Visual Recognition Challenge",
        "href": "https://arxiv.org/abs/1409.0575"
      }
    ],
    "lifeDates": {
      "zh": "1976年生",
      "en": "Born 1976"
    }
  }
];

export const computerScientistRelations: ScholarRelation[] = [
  {
    "id": "cs-babbage-lovelace",
    "source": "babbage",
    "target": "lovelace",
    "kind": "support",
    "label": {
      "zh": "分析机与注释的合作",
      "en": "Collaboration on the Analytical Engine"
    },
    "description": {
      "zh": "两人讨论分析机实例与注释，洛夫莱斯扩写技术说明并检查计算。",
      "en": "They discussed examples and Notes for the Analytical Engine; Lovelace expanded the exposition and checked calculations."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Lovelace/",
    "direction": "both"
  },
  {
    "id": "cs-lovelace-turing",
    "source": "lovelace",
    "target": "turing",
    "kind": "influence",
    "label": {
      "zh": "机器能力的公开讨论",
      "en": "Debating what machines can do"
    },
    "description": {
      "zh": "图灵1950年论文直接讨论「洛夫莱斯的反对意见」，回应机器能否产生新事物的问题。",
      "en": "Turing’s 1950 paper explicitly discusses Lovelace’s objection concerning machines and originality."
    },
    "sourceUrl": "https://academic.oup.com/mind/article/LIX/236/433/986238"
  },
  {
    "id": "cs-boole-shannon",
    "source": "boole",
    "target": "shannon",
    "kind": "influence",
    "label": {
      "zh": "逻辑代数进入开关电路",
      "en": "Logical algebra in switching circuits"
    },
    "description": {
      "zh": "香农用布尔式逻辑分析继电器电路，把推理运算变成工程设计工具。",
      "en": "Shannon applied Boolean logic to relay circuits, turning logical operations into a design tool."
    },
    "sourceUrl": "https://dspace.mit.edu/handle/1721.1/11173"
  },
  {
    "id": "cs-hollerith-backus",
    "source": "hollerith",
    "target": "backus",
    "kind": "influence",
    "label": {
      "zh": "穿孔记录与早期FORTRAN",
      "en": "Punched records and early FORTRAN"
    },
    "description": {
      "zh": "早期FORTRAN手册明确使用Hollerith文本与卡片输入。此线追踪编码和介质的技术延续，并非两人相识。",
      "en": "Early FORTRAN used Hollerith text and card input. This traces an encoding and medium, not a personal acquaintance."
    },
    "sourceUrl": "https://bitsavers.trailing-edge.com/pdf/ibm/704/704_FortranProgRefMan_Oct56.pdf"
  },
  {
    "id": "cs-godel-church",
    "source": "godel",
    "target": "church",
    "kind": "influence",
    "label": {
      "zh": "形式证明的能力边界",
      "en": "Limits of formal proof"
    },
    "description": {
      "zh": "哥德尔的不完备性结果构成丘奇研究有效可计算性与不可判定性的逻辑背景。",
      "en": "Gödel’s incompleteness results formed part of the logical background to Church’s computability and undecidability research."
    },
    "sourceUrl": "https://plato.stanford.edu/entries/church/"
  },
  {
    "id": "cs-godel-turing",
    "source": "godel",
    "target": "turing",
    "kind": "influence",
    "label": {
      "zh": "从不可判定命题到计算过程",
      "en": "Undecidability and computation"
    },
    "description": {
      "zh": "图灵1936年论文把计算模型与哥德尔结果联系起来，研究机械程序的限制。",
      "en": "Turing’s 1936 paper relates its computational model to Gödel’s results and limits of mechanical procedures."
    },
    "sourceUrl": "https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf"
  },
  {
    "id": "cs-church-turing",
    "source": "church",
    "target": "turing",
    "kind": "mentorship",
    "label": {
      "zh": "普林斯顿博士指导",
      "en": "Doctoral supervision at Princeton"
    },
    "description": {
      "zh": "图灵在丘奇指导下研究逻辑系统，于1938年完成普林斯顿博士学位。",
      "en": "Turing completed his Princeton doctorate on logical systems under Church in 1938."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Turing/"
  },
  {
    "id": "cs-church-scott",
    "source": "church",
    "target": "scott",
    "kind": "mentorship",
    "label": {
      "zh": "逻辑学博士指导",
      "en": "Doctoral supervision in logic"
    },
    "description": {
      "zh": "斯科特在普林斯顿由丘奇指导，1958年获博士学位。",
      "en": "Scott earned his Princeton doctorate under Church in 1958."
    },
    "sourceUrl": "https://history.computer.org/scott.html"
  },
  {
    "id": "cs-church-rabin",
    "source": "church",
    "target": "rabin",
    "kind": "mentorship",
    "label": {
      "zh": "普林斯顿研究训练",
      "en": "Research training at Princeton"
    },
    "description": {
      "zh": "拉宾在丘奇指导下完成博士研究，随后把逻辑训练带入自动机与复杂性。",
      "en": "Rabin completed doctoral research under Church before developing automata and complexity theory."
    },
    "sourceUrl": "https://mathvoices.ams.org/featurecolumn/2024/10/01/people-and-computers-compared/"
  },
  {
    "id": "cs-godel-rabin",
    "source": "godel",
    "target": "rabin",
    "kind": "mentorship",
    "label": {
      "zh": "高等研究院的定期讨论",
      "en": "Regular discussions at IAS"
    },
    "description": {
      "zh": "拉宾1958年在高等研究院与哥德尔每周讨论；这是研究指导，不是其博士师承。",
      "en": "Rabin met Gödel weekly at IAS in 1958. These research discussions were distinct from doctoral supervision."
    },
    "sourceUrl": "https://www.ias.edu/news/memoriam-michael-o-rabin"
  },
  {
    "id": "cs-rabin-scott",
    "source": "rabin",
    "target": "scott",
    "kind": "support",
    "label": {
      "zh": "有限自动机合著",
      "en": "Coauthoring finite-automaton theory"
    },
    "description": {
      "zh": "1959年合著有限自动机与判定问题论文，引入并分析非确定性有限自动机。",
      "en": "Their 1959 joint paper analyzed finite automata, decision problems and nondeterminism."
    },
    "sourceUrl": "https://doi.org/10.1147/rd.32.0114",
    "direction": "both"
  },
  {
    "id": "cs-turing-shannon",
    "source": "turing",
    "target": "shannon",
    "kind": "influence",
    "label": {
      "zh": "简化通用机器",
      "en": "Simplifying universal machines"
    },
    "description": {
      "zh": "香农1956年研究两状态通用图灵机，直接延展图灵的计算模型。",
      "en": "Shannon’s 1956 work on two-state universal machines directly extended Turing’s model."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Shannon/"
  },
  {
    "id": "cs-von-neumann-wilkes",
    "source": "von-neumann",
    "target": "wilkes",
    "kind": "influence",
    "label": {
      "zh": "EDVAC报告与EDSAC",
      "en": "The EDVAC report and EDSAC"
    },
    "description": {
      "zh": "威尔克斯阅读EDVAC报告并考察美国计算机工作后，领导剑桥的EDSAC项目。",
      "en": "Wilkes studied the EDVAC report and American computing work before leading EDSAC."
    },
    "sourceUrl": "https://www.cl.cam.ac.uk/archive/mvw1/short-biography.html"
  },
  {
    "id": "cs-von-neumann-xia-peisu",
    "source": "von-neumann",
    "target": "xia-peisu",
    "kind": "influence",
    "label": {
      "zh": "存储程序的体系传承",
      "en": "The stored-program architecture"
    },
    "description": {
      "zh": "夏培肃主持的107机采用冯·诺伊曼型存储程序结构；这是技术体系传承，不是个人授课。",
      "en": "Xia’s Model 107 used a von Neumann-type stored-program architecture: a technical lineage, not personal instruction."
    },
    "sourceUrl": "https://mmcs.cast.org.cn/kxjfc/kxjfc/xps/bd4300/art/2023/art_a0dd1a9a70584ab098127d1019640568.html"
  },
  {
    "id": "cs-zuse-von-neumann",
    "source": "zuse",
    "target": "von-neumann",
    "kind": "parallel",
    "label": {
      "zh": "本人回顾的自我复制研究对照",
      "en": "A documented comparison of self-reproduction"
    },
    "description": {
      "zh": "楚泽在回顾中明确比较自己的可复制工厂设想与冯·诺伊曼的细胞自动机。此处有文本比较，不主张合作。",
      "en": "Zuse explicitly compared his self-reproducing-factory idea with von Neumann’s cellular models. The documented comparison does not imply collaboration."
    },
    "sourceUrl": "https://history.computer.org/pioneers/zuse.html"
  },
  {
    "id": "cs-wilkes-sparck-jones",
    "source": "wilkes",
    "target": "sparck-jones",
    "kind": "support",
    "label": {
      "zh": "为检索研究提供空间",
      "en": "Making room for retrieval research"
    },
    "description": {
      "zh": "斯帕克·琼斯在IEEE口述史中回忆，威尔克斯认可其研究，并让她在剑桥实验室开展工作。",
      "en": "In her IEEE oral history, Spärck Jones describes Wilkes providing a place for her research at Cambridge."
    },
    "sourceUrl": "https://ethw.org/Oral-History:Karen_Sp%C3%A4rck_Jones"
  },
  {
    "id": "cs-hopper-backus",
    "source": "hopper",
    "target": "backus",
    "kind": "support",
    "label": {
      "zh": "1954年自动编程交流",
      "en": "The 1954 automatic-programming symposium"
    },
    "description": {
      "zh": "巴科斯回忆他在霍珀组织的1954年研讨会报告自动编程工作；这有别于断言FORTRAN直接抄自A-0。",
      "en": "Backus recounts presenting at Hopper’s 1954 symposium. This records exchange, not a claim that FORTRAN copied A-0."
    },
    "sourceUrl": "https://softwarepreservation.computerhistory.org/FORTRAN/paper/p45-backus.pdf"
  },
  {
    "id": "cs-backus-frances-allen",
    "source": "backus",
    "target": "frances-allen",
    "kind": "influence",
    "label": {
      "zh": "从FORTRAN教学到优化编译",
      "en": "From teaching FORTRAN to optimization"
    },
    "description": {
      "zh": "艾伦1957年加入IBM时教授FORTRAN，随后研究如何自动生成更高效的程序。",
      "en": "Allen taught FORTRAN when she joined IBM in 1957, then developed optimizing compiler techniques."
    },
    "sourceUrl": "https://ceohp.heritage.acm.org/allenf-overview/"
  },
  {
    "id": "cs-backus-wirth",
    "source": "backus",
    "target": "wirth",
    "kind": "influence",
    "label": {
      "zh": "ALGOL与语言设计传统",
      "en": "The ALGOL language tradition"
    },
    "description": {
      "zh": "巴科斯参与ALGOL和语法记法工作；沃思的ALGOL W、Pascal等继续发展这一语言传统。",
      "en": "Backus contributed to ALGOL and grammar notation; Wirth developed this language tradition through ALGOL W and Pascal."
    },
    "sourceUrl": "https://computerhistory.org/profile/niklaus-wirth/"
  },
  {
    "id": "cs-backus-hoare",
    "source": "backus",
    "target": "hoare",
    "kind": "influence",
    "label": {
      "zh": "从语言定义到ALGOL编译器",
      "en": "From language definition to an ALGOL compiler"
    },
    "description": {
      "zh": "霍尔在Elliott Brothers开发ALGOL 60编译器，使用巴科斯等人参与定义的语言。",
      "en": "Hoare implemented ALGOL 60 at Elliott Brothers, working from the language definition developed by Backus and colleagues."
    },
    "sourceUrl": "https://www.cs.ox.ac.uk/people/tony.hoare/index1.html"
  },
  {
    "id": "cs-hoare-wirth",
    "source": "hoare",
    "target": "wirth",
    "kind": "support",
    "label": {
      "zh": "Pascal公理语义合著",
      "en": "Coauthoring Pascal’s axiomatic definition"
    },
    "description": {
      "zh": "两人合著Pascal的公理化定义，把语言构造与正确性推理直接对应起来。",
      "en": "They coauthored an axiomatic definition of Pascal, connecting language constructs with correctness reasoning."
    },
    "sourceUrl": "https://ora.ox.ac.uk/objects/uuid:32c368e2-bee1-41fd-ae58-a10f00fc03d3",
    "direction": "both"
  },
  {
    "id": "cs-dijkstra-hoare",
    "source": "dijkstra",
    "target": "hoare",
    "kind": "support",
    "label": {
      "zh": "《结构化程序设计》",
      "en": "Structured Programming"
    },
    "description": {
      "zh": "与奥勒-约翰·达尔共同出版《结构化程序设计》，呈现互相补充的程序设计方法。",
      "en": "With Ole-Johan Dahl, they published complementary approaches in Structured Programming."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Dijkstra/",
    "direction": "both"
  },
  {
    "id": "cs-dijkstra-knuth",
    "source": "dijkstra",
    "target": "knuth",
    "kind": "influence",
    "label": {
      "zh": "关于goto的技术讨论",
      "en": "A technical discussion of goto"
    },
    "description": {
      "zh": "高德纳1974年专文回应结构化编程与goto问题，认真讨论戴克斯特拉等人的观点。",
      "en": "Knuth’s 1974 essay discusses structured programming and goto, engaging with Dijkstra’s arguments."
    },
    "sourceUrl": "https://doi.org/10.1145/356635.356640"
  },
  {
    "id": "cs-hoare-knuth",
    "source": "hoare",
    "target": "knuth",
    "kind": "influence",
    "label": {
      "zh": "快速排序的分析与传播",
      "en": "Analyzing and explaining Quicksort"
    },
    "description": {
      "zh": "高德纳在算法著作中分析霍尔的快速排序，研究其比较次数和实现选择。",
      "en": "Knuth’s algorithmic work analyzes Hoare’s Quicksort, including comparison counts and implementation choices."
    },
    "sourceUrl": "https://cs.stanford.edu/~knuth/taocp.html"
  },
  {
    "id": "cs-knuth-lamport",
    "source": "knuth",
    "target": "lamport",
    "kind": "influence",
    "label": {
      "zh": "TeX上的LaTeX",
      "en": "LaTeX built on TeX"
    },
    "description": {
      "zh": "兰波特在高德纳TeX排版引擎之上开发LaTeX，把文档结构和低层排版操作分开。",
      "en": "Lamport built LaTeX on Knuth’s TeX engine, separating document structure from lower-level typesetting."
    },
    "sourceUrl": "https://lamport.azurewebsites.net/pubs/pubs.html"
  },
  {
    "id": "cs-hoare-thompson",
    "source": "hoare",
    "target": "thompson",
    "kind": "influence",
    "label": {
      "zh": "CSP思想进入Go的并发",
      "en": "CSP ideas in Go concurrency"
    },
    "description": {
      "zh": "汤普森共同设计的Go经Newsqueak、Limbo等语言承接霍尔CSP的通信思想。",
      "en": "Go, co-designed by Thompson, inherits CSP-style communication ideas through languages including Newsqueak and Limbo."
    },
    "sourceUrl": "https://go.dev/doc/faq#ancestors"
  },
  {
    "id": "cs-wirth-thompson",
    "source": "wirth",
    "target": "thompson",
    "kind": "influence",
    "label": {
      "zh": "模块语言进入Go设计",
      "en": "Module languages informing Go"
    },
    "description": {
      "zh": "Go官方设计说明列出Pascal、Modula、Oberon对声明和包的影响；汤普森是共同设计者之一。",
      "en": "Go’s official history identifies Pascal, Modula and Oberon influences on declarations and packages; Thompson co-designed Go."
    },
    "sourceUrl": "https://go.dev/doc/faq#ancestors"
  },
  {
    "id": "cs-ritchie-thompson",
    "source": "ritchie",
    "target": "thompson",
    "kind": "support",
    "label": {
      "zh": "Unix的长期合作",
      "en": "Long-term Unix collaboration"
    },
    "description": {
      "zh": "两人在贝尔实验室共同发展Unix，C语言又帮助系统脱离单一硬件。",
      "en": "They developed Unix together at Bell Labs, with C helping the system move beyond one hardware platform."
    },
    "sourceUrl": "https://computerhistory.org/profile/dennis-ritchie/",
    "direction": "both"
  },
  {
    "id": "cs-mccarthy-liskov",
    "source": "mccarthy",
    "target": "liskov",
    "kind": "mentorship",
    "label": {
      "zh": "斯坦福博士指导",
      "en": "Doctoral supervision at Stanford"
    },
    "description": {
      "zh": "利斯科夫在麦卡锡指导下研究棋类残局程序，于1968年完成博士学位。",
      "en": "Liskov completed her 1968 Stanford doctorate on chess endgames under McCarthy."
    },
    "sourceUrl": "https://computerhistory.org/profile/barbara-liskov/"
  },
  {
    "id": "cs-mccarthy-minsky",
    "source": "mccarthy",
    "target": "minsky",
    "kind": "support",
    "label": {
      "zh": "达特茅斯研究提案",
      "en": "The Dartmouth research proposal"
    },
    "description": {
      "zh": "两人共同署名1955年人工智能夏季研究提案，并参与推动这一研究方向。",
      "en": "They co-signed the 1955 proposal for the Dartmouth summer research project on artificial intelligence."
    },
    "sourceUrl": "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
    "direction": "both"
  },
  {
    "id": "cs-shannon-mccarthy",
    "source": "shannon",
    "target": "mccarthy",
    "kind": "support",
    "label": {
      "zh": "达特茅斯提案共同发起",
      "en": "Jointly proposing the Dartmouth project"
    },
    "description": {
      "zh": "香农与麦卡锡、明斯基、罗切斯特共同署名提案，汇集机器学习与符号处理问题。",
      "en": "Shannon, McCarthy, Minsky and Rochester co-signed the proposal connecting learning and symbolic-processing questions."
    },
    "sourceUrl": "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
    "direction": "both"
  },
  {
    "id": "cs-shannon-minsky",
    "source": "shannon",
    "target": "minsky",
    "kind": "support",
    "label": {
      "zh": "学习机器研究的共同提案",
      "en": "A joint proposal on learning machines"
    },
    "description": {
      "zh": "达特茅斯提案中，两人共同参与关于机器学习、神经网络与计算的研究倡议。",
      "en": "They jointly proposed research on machine learning, neural networks and computation in the Dartmouth document."
    },
    "sourceUrl": "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
    "direction": "both"
  },
  {
    "id": "cs-church-mccarthy",
    "source": "church",
    "target": "mccarthy",
    "kind": "influence",
    "label": {
      "zh": "λ记法与Lisp",
      "en": "Lambda notation and Lisp"
    },
    "description": {
      "zh": "麦卡锡的Lisp论文使用Church的λ记法描述函数；语言实现也有自己不同的求值机制。",
      "en": "McCarthy used Church’s lambda notation to describe functions in Lisp, while developing distinct implementation and evaluation choices."
    },
    "sourceUrl": "https://www-formal.stanford.edu/jmc/recursive.html"
  },
  {
    "id": "cs-newell-simon",
    "source": "newell",
    "target": "simon",
    "kind": "support",
    "label": {
      "zh": "逻辑理论机与问题求解",
      "en": "Logic Theorist and problem solving"
    },
    "description": {
      "zh": "与克利夫·肖合作开发逻辑理论机、GPS，并持续进行认知与符号计算研究。",
      "en": "With Cliff Shaw, they developed Logic Theorist and GPS and continued collaborative research on cognition and symbolic computation."
    },
    "sourceUrl": "https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell",
    "direction": "both"
  },
  {
    "id": "cs-mccarthy-newell",
    "source": "mccarthy",
    "target": "newell",
    "kind": "support",
    "label": {
      "zh": "达特茅斯的研究交流",
      "en": "Research exchange at Dartmouth"
    },
    "description": {
      "zh": "纽厄尔在麦卡锡等人组织的1956年讨论班交流逻辑理论机工作，并非博士师生。",
      "en": "Newell presented Logic Theorist at the 1956 Dartmouth gathering organized by McCarthy and colleagues."
    },
    "sourceUrl": "https://www.computer.org/profiles/allen-newell"
  },
  {
    "id": "cs-mccarthy-simon",
    "source": "mccarthy",
    "target": "simon",
    "kind": "support",
    "label": {
      "zh": "人工智能早期交流",
      "en": "Early exchange in AI"
    },
    "description": {
      "zh": "西蒙与纽厄尔的逻辑程序进入达特茅斯研究交流，与麦卡锡组织的计划相交汇。",
      "en": "Simon and Newell’s logical programs entered the Dartmouth exchange organized by McCarthy and colleagues."
    },
    "sourceUrl": "https://www.computer.org/profiles/allen-newell"
  },
  {
    "id": "cs-dijkstra-lamport",
    "source": "dijkstra",
    "target": "lamport",
    "kind": "influence",
    "label": {
      "zh": "并发互斥问题的延展",
      "en": "Extending mutual-exclusion research"
    },
    "description": {
      "zh": "兰波特的面包店算法等工作继续研究戴克斯特拉提出的并发互斥问题，改进假设与解法。",
      "en": "Lamport’s bakery algorithm and related work extended Dijkstra’s mutual-exclusion problem with new assumptions and solutions."
    },
    "sourceUrl": "https://lamport.azurewebsites.net/pubs/pubs.html"
  },
  {
    "id": "cs-hoare-liskov",
    "source": "hoare",
    "target": "liskov",
    "kind": "influence",
    "label": {
      "zh": "程序契约与行为子类型",
      "en": "Program contracts and behavioral subtyping"
    },
    "description": {
      "zh": "利斯科夫与周以真用前后条件等规范讨论子类型能否替代父类型，承接程序正确性逻辑。",
      "en": "Liskov and Wing use specifications including preconditions and postconditions to reason about behavioral substitution."
    },
    "sourceUrl": "https://doi.org/10.1145/197320.197383"
  },
  {
    "id": "cs-lamport-liskov",
    "source": "lamport",
    "target": "liskov",
    "kind": "influence",
    "label": {
      "zh": "从拜占庭一致性到PBFT",
      "en": "From Byzantine agreement to PBFT"
    },
    "description": {
      "zh": "卡斯特罗与利斯科夫的PBFT延展拜占庭容错问题，讨论适合复制服务的实践协议。",
      "en": "Castro and Liskov’s PBFT develops Byzantine fault tolerance into a practical protocol for replicated services."
    },
    "sourceUrl": "https://pmg.csail.mit.edu/papers/osdi99.pdf"
  },
  {
    "id": "cs-lamport-perlman",
    "source": "lamport",
    "target": "perlman",
    "kind": "influence",
    "label": {
      "zh": "拜占庭故障进入路由模型",
      "en": "Byzantine faults in routing models"
    },
    "description": {
      "zh": "珀尔曼1988年论文研究恶意或任意故障节点下的路由，使用拜占庭故障这一明确问题框架。",
      "en": "Perlman’s 1988 thesis studies routing with malicious or arbitrary faulty nodes within the Byzantine-failure framework."
    },
    "sourceUrl": "https://publications.csail.mit.edu/lcs/pubs/pdf/MIT-LCS-TR-429.pdf"
  },
  {
    "id": "cs-dijkstra-margaret-hamilton",
    "source": "dijkstra",
    "target": "margaret-hamilton",
    "kind": "parallel",
    "label": {
      "zh": "对HOS方法的文献评议",
      "en": "A documented critique of HOS"
    },
    "description": {
      "zh": "戴克斯特拉1983年专文评议汉密尔顿与泽尔丁的HOS。此线记录方法讨论与分歧，不表示合作或师承。",
      "en": "Dijkstra’s 1983 essay critiques Hamilton and Zeldin’s HOS. The link records documented debate, not collaboration or supervision."
    },
    "sourceUrl": "https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD852.html"
  },
  {
    "id": "cs-codd-stonebraker",
    "source": "codd",
    "target": "stonebraker",
    "kind": "influence",
    "label": {
      "zh": "关系模型进入INGRES",
      "en": "The relational model in INGRES"
    },
    "description": {
      "zh": "斯通布雷克与同事通过INGRES实现和检验科德的关系数据库思想。",
      "en": "Stonebraker and colleagues implemented and tested Codd’s relational ideas through INGRES."
    },
    "sourceUrl": "https://computerhistory.org/profile/michael-stonebraker/"
  },
  {
    "id": "cs-cook-karp",
    "source": "cook",
    "target": "karp",
    "kind": "influence",
    "label": {
      "zh": "从SAT到组合问题网络",
      "en": "From SAT to combinatorial reductions"
    },
    "description": {
      "zh": "卡普以库克的可满足性结果为起点，建立多种组合问题之间的多项式规约。",
      "en": "Karp built on Cook’s satisfiability result to establish polynomial reductions among combinatorial problems."
    },
    "sourceUrl": "https://doi.org/10.1007/978-1-4684-2001-2_9"
  },
  {
    "id": "cs-turing-cook",
    "source": "turing",
    "target": "cook",
    "kind": "influence",
    "label": {
      "zh": "机器模型与多项式复杂性",
      "en": "Machine models and polynomial complexity"
    },
    "description": {
      "zh": "库克的复杂性分析以图灵机等形式计算模型为基础，从能否计算进一步问需要多少资源。",
      "en": "Cook’s complexity analysis uses formal computation models, including Turing machines, to study resource requirements."
    },
    "sourceUrl": "https://amturing.acm.org/pdf/CookTuringTranscript.pdf"
  },
  {
    "id": "cs-karp-hopcroft",
    "source": "karp",
    "target": "hopcroft",
    "kind": "support",
    "label": {
      "zh": "二分图匹配合作",
      "en": "Collaboration on bipartite matching"
    },
    "description": {
      "zh": "两人合著快速二分图最大匹配算法，以成批最短增广路改进复杂度。",
      "en": "They coauthored a fast bipartite-matching algorithm using phases of shortest augmenting paths."
    },
    "sourceUrl": "https://doi.org/10.1137/0202019",
    "direction": "both"
  },
  {
    "id": "cs-rabin-karp",
    "source": "rabin",
    "target": "karp",
    "kind": "support",
    "label": {
      "zh": "指纹式字符串搜索",
      "en": "Fingerprint-based string search"
    },
    "description": {
      "zh": "两人共同研究以哈希指纹筛选字符串匹配位置的算法。",
      "en": "They jointly developed string-search methods based on hash fingerprints."
    },
    "sourceUrl": "https://doi.org/10.1147/rd.312.0249",
    "direction": "both"
  },
  {
    "id": "cs-diffie-hellman",
    "source": "diffie",
    "target": "hellman",
    "kind": "support",
    "label": {
      "zh": "《密码学的新方向》",
      "en": "New Directions in Cryptography"
    },
    "description": {
      "zh": "1976年共同发表公钥密码与密钥交换工作，并讨论开放网络中的认证问题。",
      "en": "Their 1976 joint paper develops public-key ideas, key exchange and authentication for open networks."
    },
    "sourceUrl": "https://ee.stanford.edu/~hellman/publications/24.pdf",
    "direction": "both"
  },
  {
    "id": "cs-diffie-rivest",
    "source": "diffie",
    "target": "rivest",
    "kind": "influence",
    "label": {
      "zh": "公开密钥问题推动RSA",
      "en": "Public-key ideas motivating RSA"
    },
    "description": {
      "zh": "RSA原论文明确回应迪菲与赫尔曼提出的公钥密码构想，提供具体数论方案。",
      "en": "The RSA paper explicitly responds to Diffie and Hellman’s public-key proposal with a number-theoretic construction."
    },
    "sourceUrl": "https://people.csail.mit.edu/rivest/Rsapaper.pdf"
  },
  {
    "id": "cs-hellman-rivest",
    "source": "hellman",
    "target": "rivest",
    "kind": "influence",
    "label": {
      "zh": "从密钥管理到具体构造",
      "en": "From key-management ideas to a construction"
    },
    "description": {
      "zh": "赫尔曼与迪菲提出的问题成为RSA设计背景；后续安全定义与实际编码仍需分别研究。",
      "en": "Hellman and Diffie’s problem setting informed RSA, while security definitions and practical encodings required further work."
    },
    "sourceUrl": "https://people.csail.mit.edu/rivest/Rsapaper.pdf"
  },
  {
    "id": "cs-rivest-shamir",
    "source": "rivest",
    "target": "shamir",
    "kind": "support",
    "label": {
      "zh": "RSA共同设计",
      "en": "Co-designing RSA"
    },
    "description": {
      "zh": "与伦纳德·阿德尔曼共同提出RSA，三位作者的贡献共同构成这项工作。",
      "en": "With Leonard Adleman, they jointly developed RSA; the work belongs to all three authors."
    },
    "sourceUrl": "https://people.csail.mit.edu/rivest/Rsapaper.pdf",
    "direction": "both"
  },
  {
    "id": "cs-goldwasser-rivest",
    "source": "goldwasser",
    "target": "rivest",
    "kind": "support",
    "label": {
      "zh": "可证明安全的签名",
      "en": "Provably secure signatures"
    },
    "description": {
      "zh": "与米卡利合著抵抗适应性选择消息攻击的数字签名研究。",
      "en": "With Micali, they coauthored work on signatures secure against adaptive chosen-message attacks."
    },
    "sourceUrl": "https://doi.org/10.1137/0217017",
    "direction": "both"
  },
  {
    "id": "cs-goldwasser-shamir",
    "source": "goldwasser",
    "target": "shamir",
    "kind": "influence",
    "label": {
      "zh": "交互证明的能力",
      "en": "The power of interactive proofs"
    },
    "description": {
      "zh": "沙米尔的IP=PSPACE结果研究由戈德瓦塞尔、米卡利、拉科夫等人发展的交互证明模型。",
      "en": "Shamir’s IP=PSPACE theorem studies the interactive-proof model developed by Goldwasser, Micali, Rackoff and others."
    },
    "sourceUrl": "https://doi.org/10.1145/146585.146609"
  },
  {
    "id": "cs-rabin-goldwasser",
    "source": "rabin",
    "target": "goldwasser",
    "kind": "influence",
    "label": {
      "zh": "模运算密码与概率加密",
      "en": "Modular cryptography and probabilistic encryption"
    },
    "description": {
      "zh": "概率加密论文在RSA、Rabin等公钥工作的背景下引入新的安全定义与随机化构造。",
      "en": "The probabilistic-encryption paper develops new definitions and randomized constructions against the background of RSA and Rabin-style cryptography."
    },
    "sourceUrl": "https://doi.org/10.1016/0022-0000(84)90070-9"
  },
  {
    "id": "cs-cook-goldwasser",
    "source": "cook",
    "target": "goldwasser",
    "kind": "influence",
    "label": {
      "zh": "从静态证书到交互验证",
      "en": "From static certificates to interaction"
    },
    "description": {
      "zh": "交互证明工作以高效验证和NP证书为基础问题，扩展验证者与证明者的交互方式。",
      "en": "Interactive-proof research builds on efficient verification and NP certificates, extending the interaction between verifier and prover."
    },
    "sourceUrl": "https://doi.org/10.1137/0218012"
  },
  {
    "id": "cs-shamir-rabin",
    "source": "shamir",
    "target": "rabin",
    "kind": "influence",
    "label": {
      "zh": "RSA之后的平方映射方案",
      "en": "A squaring construction after RSA"
    },
    "description": {
      "zh": "拉宾1979年的公钥方案明确讨论RSA，并寻求可与因数分解建立更直接联系的构造。",
      "en": "Rabin’s 1979 public-key construction discusses RSA and seeks a more direct reduction to factoring."
    },
    "sourceUrl": "https://publications.csail.mit.edu/lcs/pubs/pdf/MIT-LCS-TR-212.pdf"
  },
  {
    "id": "cs-cerf-kahn",
    "source": "cerf",
    "target": "kahn",
    "kind": "support",
    "label": {
      "zh": "互联网协议共同设计",
      "en": "Co-designing Internet protocols"
    },
    "description": {
      "zh": "1974年合著跨分组网络通信论文，随后持续推动TCP/IP及互联体系。",
      "en": "They coauthored the 1974 internetworking paper and continued developing TCP/IP and Internet architecture."
    },
    "sourceUrl": "https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf",
    "direction": "both"
  },
  {
    "id": "cs-cerf-berners-lee",
    "source": "cerf",
    "target": "berners-lee",
    "kind": "influence",
    "label": {
      "zh": "互联网承载万维网",
      "en": "The Internet supporting the Web"
    },
    "description": {
      "zh": "伯纳斯-李的Web使用已经形成的互联网传输基础；此线表示协议层的承接，不把Web与互联网混为一物。",
      "en": "Berners-Lee’s Web uses established Internet transport. The connection is between protocol layers, not an identification of Web and Internet."
    },
    "sourceUrl": "https://home.cern/science/computing/the-birth-of-the-web"
  },
  {
    "id": "cs-kahn-berners-lee",
    "source": "kahn",
    "target": "berners-lee",
    "kind": "influence",
    "label": {
      "zh": "开放互联到开放文档",
      "en": "From open networks to linked documents"
    },
    "description": {
      "zh": "卡恩参与发展的开放互联基础，使跨网络的Web客户端与服务器能够通信；Web另行定义文档与超链接。",
      "en": "Open internetworking developed by Kahn and collaborators supports Web clients and servers; the Web adds documents and hyperlinks."
    },
    "sourceUrl": "https://www.w3.org/People/Berners-Lee/"
  },
  {
    "id": "cs-minsky-hinton",
    "source": "minsky",
    "target": "hinton",
    "kind": "influence",
    "label": {
      "zh": "感知机限制与多层表示",
      "en": "Perceptron limits and multilayer representations"
    },
    "description": {
      "zh": "多层网络研究回应早期感知机模型的限制；明斯基与派珀特的结论不能误读为所有神经网络都无效。",
      "en": "Multilayer-network research addresses limitations of earlier perceptrons without treating Minsky and Papert’s model-specific results as universal impossibility."
    },
    "sourceUrl": "https://www.nature.com/articles/nature14539"
  },
  {
    "id": "cs-hinton-lecun",
    "source": "hinton",
    "target": "lecun",
    "kind": "mentorship",
    "label": {
      "zh": "多伦多博士后指导",
      "en": "Postdoctoral work in Toronto"
    },
    "description": {
      "zh": "勒昆1987年在多伦多随辛顿进行博士后研究；其博士学位此前已在巴黎完成。",
      "en": "LeCun worked with Hinton as a Toronto postdoctoral researcher in 1987, after completing his doctorate in Paris."
    },
    "sourceUrl": "https://yann.lecun.com/ex/bio.html"
  },
  {
    "id": "cs-lecun-bengio",
    "source": "lecun",
    "target": "bengio",
    "kind": "support",
    "label": {
      "zh": "文档识别网络合著",
      "en": "Coauthoring document-recognition research"
    },
    "description": {
      "zh": "两人与博图、哈夫纳合著1998年梯度学习文档识别论文。",
      "en": "They coauthored the 1998 document-recognition paper with Bottou and Haffner."
    },
    "sourceUrl": "http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf",
    "direction": "both"
  },
  {
    "id": "cs-hinton-bengio",
    "source": "hinton",
    "target": "bengio",
    "kind": "support",
    "label": {
      "zh": "深度学习综述合作",
      "en": "Coauthoring Deep learning"
    },
    "description": {
      "zh": "两人与勒昆合著2015年《Nature》深度学习综述，系统说明这一研究方向。",
      "en": "With LeCun, they coauthored the 2015 Nature review of deep learning."
    },
    "sourceUrl": "https://www.nature.com/articles/nature14539",
    "direction": "both"
  },
  {
    "id": "cs-fei-fei-li-hinton",
    "source": "fei-fei-li",
    "target": "hinton",
    "kind": "influence",
    "label": {
      "zh": "ImageNet成为训练与评测基础",
      "en": "ImageNet as training and evaluation infrastructure"
    },
    "description": {
      "zh": "辛顿与学生的AlexNet使用李飞飞团队参与建设的ImageNet数据与竞赛，不意味着李飞飞参与设计该网络。",
      "en": "AlexNet used the ImageNet data and challenge developed by Li’s team; this does not make her an AlexNet designer."
    },
    "sourceUrl": "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks"
  },
  {
    "id": "cs-shannon-bengio",
    "source": "shannon",
    "target": "bengio",
    "kind": "influence",
    "label": {
      "zh": "语言概率与文本信息量",
      "en": "Language probabilities and textual information"
    },
    "description": {
      "zh": "本吉奥等人的神经语言模型承接文本概率估计问题，论文引用香农关于英语预测与熵的工作。",
      "en": "Bengio’s neural-language-model paper cites Shannon’s work on prediction and entropy of English."
    },
    "sourceUrl": "https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf"
  },
  {
    "id": "cs-von-neumann-backus",
    "source": "von-neumann",
    "target": "backus",
    "kind": "influence",
    "label": {
      "zh": "对存储状态式编程的反思",
      "en": "Rethinking state-centered programming"
    },
    "description": {
      "zh": "巴科斯1978年以「摆脱冯·诺伊曼风格」为题讨论函数级编程；承接也可以包含批判性重构。",
      "en": "Backus’s 1978 lecture critiques the von Neumann programming style and proposes function-level alternatives."
    },
    "sourceUrl": "https://theory.stanford.edu/~aiken/other/backus.pdf"
  },
  {
    "id": "cs-von-neumann-yao",
    "source": "von-neumann",
    "target": "yao",
    "kind": "influence",
    "label": {
      "zh": "极小极大定理进入随机算法",
      "en": "Minimax in randomized algorithms"
    },
    "description": {
      "zh": "姚期智1977年用冯·诺伊曼极小极大原理连接随机算法与输入分布下的确定性算法。",
      "en": "Yao’s 1977 work applies von Neumann’s minimax principle to randomized algorithms and input distributions."
    },
    "sourceUrl": "https://doi.org/10.1109/SFCS.1977.24"
  },
  {
    "id": "cs-shannon-diffie",
    "source": "shannon",
    "target": "diffie",
    "kind": "influence",
    "label": {
      "zh": "信息论密码到公钥问题",
      "en": "From information-theoretic secrecy to public keys"
    },
    "description": {
      "zh": "《密码学的新方向》明确以香农的保密通信研究为背景，再转向计算困难和公开密钥的设定。",
      "en": "New Directions in Cryptography takes Shannon’s secrecy work as background before developing computational and public-key settings."
    },
    "sourceUrl": "https://ee.stanford.edu/~hellman/publications/24.pdf"
  }
];
