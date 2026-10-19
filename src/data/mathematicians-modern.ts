import type { Mathematician, ScholarRelation } from "./mathematicians";

// Evidence and image-license records: docs/mathematicians-modern-sources.md
// and public/images/mathematicians/modern/sources.json.
export const modernMathematicians: Mathematician[] = [
  {
    "id": "russell",
    "name": {
      "zh": "罗素",
      "en": "Russell"
    },
    "fullName": "Bertrand Arthur William Russell",
    "born": 1872,
    "died": 1970,
    "place": {
      "zh": "威尔士 → 剑桥 → 威尔士",
      "en": "Wales → Cambridge → Wales"
    },
    "field": {
      "zh": "逻辑 · 数学基础",
      "en": "Logic · Foundations"
    },
    "hook": {
      "zh": "一句看似合理的定义，能否让整个体系矛盾？",
      "en": "Can a plausible definition make a whole system inconsistent?"
    },
    "summary": {
      "zh": "罗素追问数学证明究竟依赖什么。他发现不加限制地组成集合会产生悖论，又与怀特海建立庞大的形式推演体系；这些尝试也成为哥德尔研究的对象。",
      "en": "Russell examined what mathematical proofs depend on. His paradox exposed unrestricted set formation, while his collaboration with Whitehead built an extensive formal system that later became a subject of Gödel’s work."
    },
    "portrait": {
      "src": "/images/mathematicians/modern/russell.jpg",
      "alt": {
        "zh": "白发、身穿西装的罗素照片",
        "en": "Photograph of Russell with white hair, wearing a suit"
      },
      "credit": {
        "zh": "Bassano Ltd，1936 · 公共领域",
        "en": "Bassano Ltd, 1936 · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Bertrand_Russell_in_1936.jpg",
      "kind": "portrait"
    },
    "achievements": [
      {
        "year": "1901",
        "title": {
          "zh": "罗素悖论",
          "en": "Russell’s paradox"
        },
        "description": {
          "zh": "若把所有「不属于自身的集合」收成一个集合 R，就会得到 R 属于自身当且仅当它不属于自身。问题出在不受限制的集合定义，不能因此断言所有集合论都矛盾。",
          "en": "Collect all sets that are not members of themselves into R: membership of R then contradicts itself. This refutes unrestricted set comprehension, not every possible axiomatic set theory."
        },
        "formula": "R=\\{x:x\\notin x\\}"
      },
      {
        "year": "1908",
        "title": {
          "zh": "用类型限制自指",
          "en": "A theory of types"
        },
        "description": {
          "zh": "把对象与谈论对象的表达式分成层次，限制会产生恶性循环的自我应用。类型理论提供了一条处理逻辑悖论的路线，后来又有多种不同发展。",
          "en": "Organizing objects and expressions into levels restricts problematic self-application. Type theory offered one response to logical paradoxes and later developed in several distinct directions."
        }
      },
      {
        "year": "1910–1913",
        "title": {
          "zh": "《数学原理》",
          "en": "Principia Mathematica"
        },
        "description": {
          "zh": "与怀特海合著，从明确的逻辑规则和公理推导数学命题。它展示形式化证明的力量，也留下关于公理选择、可证明性与体系能力的问题。",
          "en": "With Whitehead, he derived mathematical propositions from explicit rules and axioms. The project demonstrated formal proof while raising questions about which axioms to adopt and what such systems can establish."
        }
      }
    ],
    "timeline": [
      {
        "year": "1872",
        "text": {
          "zh": "生于威尔士特雷勒克附近。",
          "en": "Born near Trellech, Wales."
        }
      },
      {
        "year": "1890",
        "text": {
          "zh": "进入剑桥三一学院学习数学。",
          "en": "Entered Trinity College, Cambridge, to study mathematics."
        }
      },
      {
        "year": "1910–1913",
        "text": {
          "zh": "与怀特海出版三卷《数学原理》。",
          "en": "Published three volumes of Principia Mathematica with Whitehead."
        }
      },
      {
        "year": "1970",
        "text": {
          "zh": "卒于威尔士，享年97岁。",
          "en": "Died in Wales, aged 97."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Bertrand Russell",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Russell/"
      },
      {
        "title": "Stanford Encyclopedia · Russell’s Paradox",
        "href": "https://plato.stanford.edu/entries/russell-paradox/"
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
      "src": "/images/mathematicians/modern/godel.jpg",
      "alt": {
        "zh": "戴圆框眼镜的哥德尔青年照片",
        "en": "Photograph of a young Gödel wearing round glasses"
      },
      "credit": {
        "zh": "摄影者不详，约1926 · 公共领域",
        "en": "Unknown photographer, c. 1926 · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Kurt_g%C3%B6del.jpg",
      "kind": "portrait"
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
      "src": "/images/mathematicians/modern/turing.jpg",
      "alt": {
        "zh": "身穿外衣和领带的图灵照片",
        "en": "Photograph of Turing in a jacket and tie"
      },
      "credit": {
        "zh": "Elliott & Fry，1951 · 公共领域",
        "en": "Elliott & Fry, 1951 · Public domain"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Alan_turing_header.jpg",
      "kind": "portrait"
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
      "src": "/images/mathematicians/modern/church.svg",
      "kind": "monogram",
      "alt": {
        "zh": "丘奇的姓名首字母与λ符号标记，非人物肖像",
        "en": "Church’s initials and a lambda symbol; not a portrait"
      },
      "credit": {
        "zh": "原创字母标记；未找到可核实开放授权的本人照片",
        "en": "Original lettermark; no verified openly licensed portrait located"
      },
      "href": "https://www.princeton.edu/news/2003/05/06/library-acquires-papers-eminent-mathematician"
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
      "src": "/images/mathematicians/modern/von-neumann.jpg",
      "alt": {
        "zh": "冯·诺伊曼的黑白肖像照片",
        "en": "Black-and-white portrait photograph of von Neumann"
      },
      "credit": {
        "zh": "Los Alamos National Laboratory · 须署名，详见许可声明",
        "en": "Los Alamos National Laboratory · Attribution required; see notice"
      },
      "href": "https://commons.wikimedia.org/wiki/File:JohnvonNeumann-LosAlamos.jpg",
      "kind": "portrait",
      "license": {
        "label": "LANL attribution notice",
        "href": "/images/mathematicians/modern/von-neumann-NOTICE.txt"
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
    "id": "kolmogorov",
    "name": {
      "zh": "柯尔莫哥洛夫",
      "en": "Kolmogorov"
    },
    "fullName": "Andrey Nikolaevich Kolmogorov",
    "born": 1903,
    "died": 1987,
    "place": {
      "zh": "坦波夫 → 莫斯科",
      "en": "Tambov → Moscow"
    },
    "field": {
      "zh": "概率 · 动力系统 · 信息",
      "en": "Probability · Dynamics · Information"
    },
    "hook": {
      "zh": "随机现象与无法压缩的信息，有何共同结构？",
      "en": "What connects chance with information that cannot be compressed?"
    },
    "summary": {
      "zh": "柯尔莫哥洛夫为概率建立统一公理，也研究动力系统在扰动下能保持多少秩序。后来，他用最短程序的长度考察单个对象的信息，把概率与计算的语言接在一起。",
      "en": "Kolmogorov axiomatized probability and studied how dynamical order survives perturbation. He later measured information in individual objects through shortest programs, connecting probability with computation."
    },
    "portrait": {
      "src": "/images/mathematicians/modern/kolmogorov.jpg",
      "alt": {
        "zh": "手拿书本的柯尔莫哥洛夫照片",
        "en": "Photograph of Kolmogorov holding a book"
      },
      "credit": {
        "zh": "Konrad Jacobs / MFO · 拍摄年份未记载 · CC BY-SA 2.0 DE",
        "en": "Konrad Jacobs / MFO · Photo date unrecorded · CC BY-SA 2.0 DE"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Andrej_Nikolajewitsch_Kolmogorov.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0 de",
        "href": "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1933",
        "title": {
          "zh": "概率的公理化",
          "en": "Axioms for probability"
        },
        "description": {
          "zh": "把事件放在σ代数中，把概率定义为总质量为1的非负、可列可加测度。可列可加性让无限次试验与极限过程进入同一数学框架。",
          "en": "Events form a sigma-algebra, and probability is a nonnegative, countably additive measure with total mass one. Countable additivity supports reasoning about infinite experiments and limiting processes."
        },
        "formula": "P(\\Omega)=1"
      },
      {
        "year": "1954",
        "title": {
          "zh": "扰动之后仍存留的规则运动",
          "en": "Order surviving perturbation"
        },
        "description": {
          "zh": "提出近可积哈密顿系统中不变环面的保持结果。需要非退化、足够小的扰动与适当的非共振频率条件；后来阿诺尔德、莫泽继续发展为KAM理论。",
          "en": "Invariant tori can persist in nearly integrable Hamiltonian systems under nondegeneracy, sufficiently small perturbations and suitable nonresonant frequencies. Arnold and Moser developed this into KAM theory."
        }
      },
      {
        "year": "1965",
        "title": {
          "zh": "用最短程序衡量复杂度",
          "en": "Complexity as shortest description"
        },
        "description": {
          "zh": "固定一种通用计算模型，用输出有限字符串所需的最短程序长度衡量其复杂度。它研究单个对象；精确值通常不可计算，也不等同于某个压缩软件的文件大小。",
          "en": "For a fixed universal machine, complexity is the length of a shortest program producing a finite string. It concerns individual objects and is not generally computable, unlike the output size of a particular compressor."
        },
        "formula": "K_U(x)=\\min_{U(p)=x}|p|"
      }
    ],
    "timeline": [
      {
        "year": "1903",
        "text": {
          "zh": "生于俄国坦波夫。",
          "en": "Born in Tambov, Russia."
        }
      },
      {
        "year": "1920",
        "text": {
          "zh": "进入莫斯科大学。",
          "en": "Entered Moscow University."
        }
      },
      {
        "year": "1931–1933",
        "text": {
          "zh": "任莫斯科大学教授，并出版概率论基础著作。",
          "en": "Became a Moscow professor and published his foundations of probability."
        }
      },
      {
        "year": "1987",
        "text": {
          "zh": "卒于莫斯科，享年84岁。",
          "en": "Died in Moscow, aged 84."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Andrey Kolmogorov",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Kolmogorov/"
      },
      {
        "title": "Royal Holloway · Foundations of the Theory of Probability",
        "href": "https://cml.rhul.ac.uk/resources/fop/index.htm"
      },
      {
        "title": "Kolmogorov · Three approaches (1965)",
        "href": "https://www.mathnet.ru/eng/ppi68"
      }
    ]
  },
  {
    "id": "chern",
    "name": {
      "zh": "陈省身",
      "en": "Chern"
    },
    "fullName": "Shiing-Shen Chern",
    "born": 1911,
    "died": 2004,
    "place": {
      "zh": "嘉兴 → 汉堡 → 南京 → 伯克利 → 天津",
      "en": "Jiaxing → Hamburg → Nanjing → Berkeley → Tianjin"
    },
    "field": {
      "zh": "微分几何 · 拓扑",
      "en": "Differential geometry · Topology"
    },
    "hook": {
      "zh": "局部的弯曲，怎样记录整体的形状？",
      "en": "How does local curvature record global shape?"
    },
    "summary": {
      "zh": "陈省身以曲率和联络连接微分几何与拓扑。他寻找不依赖把空间嵌入外部环境的内在方法，也在中国和美国建设研究机构，推动几何学者之间的交流。",
      "en": "Chern connected curvature and connections with global topology. He sought intrinsic methods that do not depend on embedding a space elsewhere, and built institutions connecting geometers in China and the United States."
    },
    "portrait": {
      "src": "/images/mathematicians/modern/chern.jpg",
      "alt": {
        "zh": "陈省身的彩色肖像照片",
        "en": "Color portrait photograph of Shiing-Shen Chern"
      },
      "credit": {
        "zh": "George Bergman，1988 · Commons 裁切版 · CC BY-SA 4.0",
        "en": "George Bergman, 1988 · Commons crop · CC BY-SA 4.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Shiing-shen_Chern_1988_(re-scanned)_(cropped-1).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 4.0",
        "href": "https://creativecommons.org/licenses/by-sa/4.0"
      }
    },
    "achievements": [
      {
        "year": "1944",
        "title": {
          "zh": "高维高斯—博内定理的内在证明",
          "en": "An intrinsic Gauss–Bonnet proof"
        },
        "description": {
          "zh": "对闭、定向的偶数维黎曼流形，将由曲率构造的欧拉形式积分，得到欧拉示性数。几何测量由此给出拓扑不变量，且证明不依赖外部嵌入。",
          "en": "For a closed oriented even-dimensional Riemannian manifold, integrating its curvature-derived Euler form gives the Euler characteristic. The intrinsic proof connects geometric measurements to a topological invariant."
        },
        "formula": "\\int_M e(TM)=\\chi(M)"
      },
      {
        "year": "1946",
        "title": {
          "zh": "陈类",
          "en": "Chern classes"
        },
        "description": {
          "zh": "为复向量丛赋予一组上同调类，记录它在全局如何扭转。它们把局部可平凡化的数据转成可比较的不变量，但并不单独给出所有向量丛的完整分类。",
          "en": "Chern classes assign cohomology classes to complex vector bundles, recording global twisting. They provide comparable invariants of locally trivial data, though they do not completely classify every bundle."
        }
      },
      {
        "year": "1974",
        "title": {
          "zh": "陈—西蒙斯形式",
          "en": "Chern–Simons forms"
        },
        "description": {
          "zh": "与詹姆斯·西蒙斯研究联络的次级特征不变量。局部形式的外微分产生相应特征形式；这些结构后来进入三维拓扑和规范理论。",
          "en": "With James Simons, he developed secondary invariants of connections. Exterior derivatives of the relevant local forms recover characteristic forms, structures later central to three-dimensional topology and gauge theory."
        }
      }
    ],
    "timeline": [
      {
        "year": "1911",
        "text": {
          "zh": "生于浙江嘉兴。",
          "en": "Born in Jiaxing, Zhejiang."
        }
      },
      {
        "year": "1936",
        "text": {
          "zh": "在汉堡获博士学位，导师为布拉施克。",
          "en": "Earned his Hamburg doctorate under Wilhelm Blaschke."
        }
      },
      {
        "year": "1960–1985",
        "text": {
          "zh": "任教伯克利，参与创建MSRI及南开数学研究所。",
          "en": "Taught at Berkeley and helped establish MSRI and Nankai’s mathematics institute."
        }
      },
      {
        "year": "2004",
        "text": {
          "zh": "卒于天津，享年93岁。",
          "en": "Died in Tianjin, aged 93."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Shiing-Shen Chern",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Chern/"
      },
      {
        "title": "UC Berkeley · Chern obituary",
        "href": "https://newsarchive.berkeley.edu/news/media/releases/2004/12/06_chern.shtml"
      },
      {
        "title": "Chern · Some new viewpoints in differential geometry (1946)",
        "href": "https://www.ams.org/bull/1946-52-01/S0002-9904-1946-08487-6/"
      },
      {
        "title": "Chern–Simons · Characteristic forms (1974)",
        "href": "https://annals.math.princeton.edu/1974/99-1/p03"
      }
    ]
  },
  {
    "id": "weil",
    "name": {
      "zh": "韦伊",
      "en": "Weil"
    },
    "fullName": "André Weil",
    "born": 1906,
    "died": 1998,
    "place": {
      "zh": "巴黎 → 阿里格尔 → 芝加哥 → 普林斯顿",
      "en": "Paris → Aligarh → Chicago → Princeton"
    },
    "field": {
      "zh": "数论 · 代数几何",
      "en": "Number theory · Algebraic geometry"
    },
    "hook": {
      "zh": "在有限个数构成的世界里，几何还能告诉我们什么？",
      "en": "What can geometry reveal over a finite field?"
    },
    "summary": {
      "zh": "韦伊把数论问题与几何对象反复对照，从有理点到有限域上的曲线。他提出的猜想要求新的上同调工具，成为格罗滕迪克等人重建代数几何的重要动力。",
      "en": "Weil compared arithmetic questions with geometric objects, from rational points to curves over finite fields. His conjectures called for new cohomological tools and helped motivate Grothendieck’s reconstruction of algebraic geometry."
    },
    "portrait": {
      "src": "/images/mathematicians/modern/weil.jpg",
      "alt": {
        "zh": "戴眼镜、在户外的安德烈·韦伊照片",
        "en": "Photograph of André Weil outdoors wearing glasses"
      },
      "credit": {
        "zh": "Konrad Jacobs / MFO，1968 · Commons 裁切版 · CC BY-SA 2.0 DE",
        "en": "Konrad Jacobs / MFO, 1968 · Commons crop · CC BY-SA 2.0 DE"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Andr%C3%A9_Weil,_1968_(cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0 de",
        "href": "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1928",
        "title": {
          "zh": "Mordell–Weil 定理",
          "en": "The Mordell–Weil theorem"
        },
        "description": {
          "zh": "数域 K 上阿贝尔簇的 K-有理点构成有限生成阿贝尔群。有限生成不表示点数有限：允许有限个独立的无限阶生成元。",
          "en": "For an abelian variety over a number field K, its K-rational points form a finitely generated abelian group. This permits infinitely many points generated from finitely many infinite-order elements."
        },
        "formula": "A(K)\\cong A(K)_{\\rm tors}\\oplus\\mathbb Z^r"
      },
      {
        "year": "1940–1948",
        "title": {
          "zh": "有限域曲线的黎曼假设",
          "en": "The Riemann hypothesis for finite-field curves"
        },
        "description": {
          "zh": "对有限域 F_q 上光滑、射影、几何连通的亏格 g 曲线，有理点数偏离 q+1 的幅度至多为 2g√q。这是有限域曲线的结论，不是原来的黎曼猜想已获证明。",
          "en": "For a smooth projective geometrically connected genus-g curve over F_q, the point count differs from q+1 by at most 2g√q. This concerns finite-field curves, not a proof of the classical Riemann hypothesis."
        },
        "formula": "|\\#C(\\mathbb F_q)-(q+1)|\\leq2g\\sqrt q"
      },
      {
        "year": "1949",
        "title": {
          "zh": "韦伊猜想",
          "en": "The Weil conjectures"
        },
        "description": {
          "zh": "把有限域上的点数打包成ζ函数，猜想其有理性、函数方程及零点性质，并与复几何的拓扑数据联系。这份研究纲领由多位数学家共同推进，最后一部分由德利涅证明。",
          "en": "Point counts over finite extensions form a zeta function. Weil predicted rationality, a functional equation and restrictions on zeros, linked to topology. Many mathematicians advanced the program; Deligne proved its remaining part."
        }
      }
    ],
    "timeline": [
      {
        "year": "1906",
        "text": {
          "zh": "生于巴黎。",
          "en": "Born in Paris."
        }
      },
      {
        "year": "1928",
        "text": {
          "zh": "在巴黎完成博士研究，导师为阿达马。",
          "en": "Completed his Paris doctorate under Jacques Hadamard."
        }
      },
      {
        "year": "1958",
        "text": {
          "zh": "到普林斯顿高等研究院任教。",
          "en": "Joined the Institute for Advanced Study faculty."
        }
      },
      {
        "year": "1998",
        "text": {
          "zh": "卒于普林斯顿，享年92岁。",
          "en": "Died in Princeton, aged 92."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · André Weil",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Weil/"
      },
      {
        "title": "IAS · André Weil",
        "href": "https://www.ias.edu/scholars/andr%C3%A9-weil"
      },
      {
        "title": "Weil · Numbers of solutions of equations in finite fields (1949)",
        "href": "https://www.ams.org/bull/1949-55-05/S0002-9904-1949-09219-4/S0002-9904-1949-09219-4.pdf"
      }
    ]
  },
  {
    "id": "grothendieck",
    "name": {
      "zh": "格罗滕迪克",
      "en": "Grothendieck"
    },
    "fullName": "Alexander Grothendieck",
    "born": 1928,
    "died": 2014,
    "place": {
      "zh": "柏林 → 蒙彼利埃 → 南锡 → 布尔叙尔伊韦特",
      "en": "Berlin → Montpellier → Nancy → Bures-sur-Yvette"
    },
    "field": {
      "zh": "代数几何 · 上同调",
      "en": "Algebraic geometry · Cohomology"
    },
    "hook": {
      "zh": "若旧空间装不下问题，能否重新定义空间？",
      "en": "When a problem outgrows the space, can the space be redefined?"
    },
    "summary": {
      "zh": "格罗滕迪克常通过扩大定义、研究对象之间的映射来解决问题。他与合作者发展概形和上同调工具，使不同数系上的几何能在共同语言中交流。",
      "en": "Grothendieck often advanced a problem by enlarging definitions and examining maps between objects. With collaborators, he developed schemes and cohomological tools that connected geometry across different number systems."
    },
    "portrait": {
      "src": "/images/mathematicians/modern/grothendieck.jpg",
      "alt": {
        "zh": "戴眼镜、侧身而坐的格罗滕迪克照片",
        "en": "Photograph of Grothendieck seated in profile with glasses"
      },
      "credit": {
        "zh": "Konrad Jacobs / MFO，1970 · CC BY-SA 2.0 DE",
        "en": "Konrad Jacobs / MFO, 1970 · CC BY-SA 2.0 DE"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Alexander_Grothendieck.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0 de",
        "href": "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en"
      }
    },
    "achievements": [
      {
        "year": "1957",
        "title": {
          "zh": "同调代数的统一语言",
          "en": "A common language for homological algebra"
        },
        "description": {
          "zh": "在通常称为「东北论文」的工作中，用阿贝尔范畴和导出函子组织同调代数。相似的计算可以共享结构，而不必在每类对象中重新建立整套机器。",
          "en": "The Tôhoku paper organized homological algebra through abelian categories and derived functors. Similar constructions could share a framework instead of being rebuilt separately for each kind of object."
        }
      },
      {
        "year": "1960起",
        "title": {
          "zh": "概形：把环看作空间",
          "en": "Schemes: rings as spaces"
        },
        "description": {
          "zh": "与迪厄多内撰写EGA，以环的素谱等局部模型拼成概形。它把整数、有限域与复数上的几何放进统一框架，还能保留普通点集看不见的代数信息。",
          "en": "EGA, written with Dieudonné, built schemes from local models such as spectra of rings. The language unites geometry over integers, finite fields and complex numbers, retaining algebraic information invisible in an ordinary point set."
        },
        "formula": "\\operatorname{Spec}R=\\{\\mathfrak p\\subset R:\\mathfrak p\\text{ prime}\\}"
      },
      {
        "year": "1960年代",
        "title": {
          "zh": "étale 上同调",
          "en": "Étale cohomology"
        },
        "description": {
          "zh": "与阿廷等人发展适用于代数簇的上同调，使有限域几何也有类似拓扑的不变量。它是证明韦伊猜想的关键工具之一，相关理论和证明由多个合作者完成。",
          "en": "With Artin and others, he developed cohomology suited to algebraic varieties, providing topological-type invariants over finite fields. This collaborative theory became a key tool in proving the Weil conjectures."
        }
      }
    ],
    "timeline": [
      {
        "year": "1928",
        "text": {
          "zh": "生于柏林。",
          "en": "Born in Berlin."
        }
      },
      {
        "year": "1953",
        "text": {
          "zh": "在南锡完成博士研究，受施瓦茨与迪厄多内指导。",
          "en": "Completed doctoral work in Nancy with Schwartz and Dieudonné."
        }
      },
      {
        "year": "1958–1970",
        "text": {
          "zh": "在IHÉS开展代数几何研究与讨论班。",
          "en": "Led algebraic-geometry research and seminars at IHÉS."
        }
      },
      {
        "year": "2014",
        "text": {
          "zh": "卒于法国圣吉龙，享年86岁。",
          "en": "Died in Saint-Girons, France, aged 86."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Alexander Grothendieck",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Grothendieck/"
      },
      {
        "title": "Grothendieck · EGA I (1960)",
        "href": "https://numdam.org/item/PMIHES_1960__4__5_0/"
      },
      {
        "title": "Artin · The étale topology of schemes (ICM 1966)",
        "href": "https://www.mathunion.org/fileadmin/ICM/Proceedings/ICM1966.1/ICM1966.1.ocr.pdf"
      },
      {
        "title": "IHÉS · Jean Dieudonné and Grothendieck",
        "href": "https://www.ihes.fr/en/professeur/jean-dieudonne-2/"
      }
    ]
  },
  {
    "id": "erdos",
    "name": {
      "zh": "埃尔德什",
      "en": "Erdős"
    },
    "fullName": "Paul Erdős",
    "born": 1913,
    "died": 1996,
    "place": {
      "zh": "布达佩斯 → 曼彻斯特 → 各地访问",
      "en": "Budapest → Manchester → Worldwide visits"
    },
    "field": {
      "zh": "组合 · 图论 · 数论",
      "en": "Combinatorics · Graph theory · Number theory"
    },
    "hook": {
      "zh": "不把对象造出来，也能证明它必定存在吗？",
      "en": "Can existence be proved without constructing an example?"
    },
    "summary": {
      "zh": "埃尔德什用易于提出、难于解决的问题连接数论与组合数学。他尤其擅长初等论证和概率方法，长期通过共同研究把不同地方的数学家连在一起。",
      "en": "Erdős connected number theory and combinatorics through simply stated, difficult problems. He developed elementary arguments and probabilistic methods, sustaining a wide network of mathematical collaborations."
    },
    "portrait": {
      "src": "/images/mathematicians/modern/erdos.jpg",
      "alt": {
        "zh": "戴大框眼镜的埃尔德什照片",
        "en": "Photograph of Erdős wearing large glasses"
      },
      "credit": {
        "zh": "Kmhkmh，1992 · Commons 裁切版 · CC BY 3.0",
        "en": "Kmhkmh, 1992 · Commons crop · CC BY 3.0"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Erdos_budapest_fall_1992_(cropped).jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY 3.0",
        "href": "https://creativecommons.org/licenses/by/3.0"
      }
    },
    "achievements": [
      {
        "year": "1932",
        "title": {
          "zh": "伯特兰定理的初等证明",
          "en": "An elementary proof of Bertrand’s theorem"
        },
        "description": {
          "zh": "每个整数 n≥2，都存在素数 p 满足 n<p<2n。他用二项式系数与素因子的估计给出简洁证明；这是对已有定理的新证明，并非首次发现素数区间规律。",
          "en": "For every integer n≥2 there is a prime p with n<p<2n. Estimates of binomial coefficients and prime factors give an elegant proof of an already known theorem."
        },
        "formula": "n<p<2n\\quad(n\\geq2)"
      },
      {
        "year": "1947",
        "title": {
          "zh": "概率方法证明存在",
          "en": "The probabilistic method"
        },
        "description": {
          "zh": "给有限图的边随机染色，估计出现某些单色子图的概率。只要坏情形的总概率小于1，就证明至少有一个避开它们的染色存在，未必需要直接构造出来。",
          "en": "Randomly color a finite graph’s edges and estimate the probability of forbidden monochromatic subgraphs. If the probability of all bad outcomes is less than one, a coloring avoiding them must exist."
        }
      },
      {
        "year": "1959",
        "title": {
          "zh": "随机图",
          "en": "Random graphs"
        },
        "description": {
          "zh": "与雷尼研究从 n 个带标号顶点中均匀选取固定数量边的随机图。当边数增长，连通性等整体性质会出现阈值。这是随机网络的数学模型，不是声称现实网络都如此生成。",
          "en": "With Rényi, he studied graphs selected uniformly with a fixed number of edges on n labeled vertices. Connectivity and other global properties exhibit thresholds as edges increase; this is a model, not a universal description of real networks."
        }
      }
    ],
    "timeline": [
      {
        "year": "1913",
        "text": {
          "zh": "生于布达佩斯。",
          "en": "Born in Budapest."
        }
      },
      {
        "year": "1934",
        "text": {
          "zh": "获博士学位后赴曼彻斯特工作。",
          "en": "Moved to Manchester after earning his doctorate."
        }
      },
      {
        "year": "1938起",
        "text": {
          "zh": "赴美国访问，随后长期旅行合作研究。",
          "en": "Visited the United States, then pursued a life of traveling collaboration."
        }
      },
      {
        "year": "1996",
        "text": {
          "zh": "在华沙参加会议期间去世，享年83岁。",
          "en": "Died while attending a conference in Warsaw, aged 83."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Paul Erdős",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Erdos/"
      },
      {
        "title": "Erdős–Rényi · On random graphs (1959)",
        "href": "https://www.cse.cuhk.edu.hk/~cslui/CMSC5734/erdos-1959-11.pdf"
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
      "src": "/images/mathematicians/modern/shannon.jpg",
      "alt": {
        "zh": "身穿西装的香农黑白肖像",
        "en": "Black-and-white portrait of Shannon wearing a suit"
      },
      "credit": {
        "zh": "摄影者不详 / 瑞典技术博物馆 · Commons 裁切版 · CC BY 2.0",
        "en": "Unknown photographer / Tekniska museet · Commons crop · CC BY 2.0"
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
    "id": "mirzakhani",
    "name": {
      "zh": "米尔扎哈尼",
      "en": "Mirzakhani"
    },
    "fullName": "Maryam Mirzakhani",
    "born": 1977,
    "died": 2017,
    "place": {
      "zh": "德黑兰 → 哈佛 → 普林斯顿 → 斯坦福",
      "en": "Tehran → Harvard → Princeton → Stanford"
    },
    "field": {
      "zh": "黎曼曲面 · 模空间 · 动力系统",
      "en": "Riemann surfaces · Moduli · Dynamics"
    },
    "hook": {
      "zh": "一张曲面上的闭合路径，能揭示所有曲面的空间吗？",
      "en": "Can loops on one surface reveal the space of all surfaces?"
    },
    "summary": {
      "zh": "米尔扎哈尼把曲面上的路径计数、模空间体积与动力系统连接起来。她常通过画图寻找整体结构，再以精细的分析和几何证明，理解复杂曲面怎样变化。",
      "en": "Mirzakhani connected counting curves, volumes of moduli spaces and dynamics. She used geometric pictures to seek global structure, then rigorous analysis and geometry to understand how families of surfaces vary."
    },
    "portrait": {
      "src": "/images/mathematicians/modern/mirzakhani.jpg",
      "alt": {
        "zh": "米尔扎哈尼在2014年首尔国际数学家大会的照片",
        "en": "Photograph of Mirzakhani at the 2014 ICM in Seoul"
      },
      "credit": {
        "zh": "Gert-Martin Greuel，2014 · CC BY-SA 2.0 DE",
        "en": "Gert-Martin Greuel, 2014 · CC BY-SA 2.0 DE"
      },
      "href": "https://commons.wikimedia.org/wiki/File:Maryam_Mirzakhani_in_Seoul_2014.jpg",
      "kind": "portrait",
      "license": {
        "label": "CC BY-SA 2.0 de",
        "href": "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en"
      }
    },
    "achievements": [
      {
        "year": "2007",
        "title": {
          "zh": "计算模空间体积",
          "en": "Volumes of moduli spaces"
        },
        "description": {
          "zh": "对满足 2g−2+n>0 的亏格 g、n 条测地边界双曲曲面，建立模空间Weil–Petersson体积递推。体积是边界长度平方的多项式，使「所有曲面的空间」变得可计算。",
          "en": "For genus-g hyperbolic surfaces with n geodesic boundaries and 2g−2+n>0, she recursively computed Weil–Petersson moduli-space volumes. The volumes are polynomials in squared boundary lengths."
        }
      },
      {
        "year": "2008",
        "title": {
          "zh": "数清简单闭测地线的增长",
          "en": "Counting simple closed geodesics"
        },
        "description": {
          "zh": "在固定的闭双曲曲面上，亏格 g≥2、长度不超过 L 的简单闭测地线数量，渐近为 c_X L^(6g−6)。常数依赖曲面；「简单」指路径不自交。",
          "en": "On a fixed closed hyperbolic surface of genus g≥2, the number of simple closed geodesics of length at most L is asymptotic to c_X L^(6g−6). The constant depends on the surface; simple means no self-intersection."
        },
        "formula": "N_X(L)\\sim c_X L^{6g-6}\\quad(g\\geq2)"
      },
      {
        "year": "2013–2015",
        "title": {
          "zh": "轨道闭包的刚性",
          "en": "Rigidity of orbit closures"
        },
        "description": {
          "zh": "与埃斯金、莫哈马迪等人研究阿贝尔微分模空间上的群作用。相关轨道闭包在周期坐标中具有受约束的线性结构；这是一系列合作定理，而非所有动力系统都规则的断言。",
          "en": "With Eskin, Mohammadi and others, she studied group actions on moduli of Abelian differentials. Relevant orbit closures have constrained linear structures in period coordinates; these are collaborative theorems, not a claim about every dynamical system."
        }
      }
    ],
    "timeline": [
      {
        "year": "1977",
        "text": {
          "zh": "生于德黑兰。",
          "en": "Born in Tehran."
        }
      },
      {
        "year": "2004",
        "text": {
          "zh": "在哈佛获博士学位，导师为柯蒂斯·麦克马伦。",
          "en": "Earned her Harvard doctorate under Curtis McMullen."
        }
      },
      {
        "year": "2014",
        "text": {
          "zh": "获菲尔兹奖，成为首位获奖女性。",
          "en": "Became the first woman awarded a Fields Medal."
        }
      },
      {
        "year": "2017",
        "text": {
          "zh": "在斯坦福去世，终年40岁。",
          "en": "Died at Stanford, aged 40."
        }
      }
    ],
    "sources": [
      {
        "title": "MacTutor · Maryam Mirzakhani",
        "href": "https://mathshistory.st-andrews.ac.uk/Biographies/Mirzakhani/"
      },
      {
        "title": "IMU · The work of Maryam Mirzakhani (2014)",
        "href": "https://mathunion.org/fileadmin/IMU/Prizes/Fields/2014/news_release_mirzakhani.pdf"
      },
      {
        "title": "Mirzakhani · Growth of simple closed geodesics (2008)",
        "href": "https://annals.math.princeton.edu/2008/168-1/p03"
      },
      {
        "title": "Stanford · Maryam Mirzakhani obituary",
        "href": "https://news.stanford.edu/stories/2017/07/maryam-mirzakhani-stanford-mathematician-and-fields-medal-winner-dies"
      }
    ]
  }
];

export const modernRelations: ScholarRelation[] = [
  {
    "id": "cantor-russell",
    "source": "cantor",
    "target": "russell",
    "kind": "influence",
    "label": {
      "zh": "集合定义的边界",
      "en": "Limits of set formation"
    },
    "description": {
      "zh": "罗素研究康托尔以来的集合论与数学基础时发现悖论，迫使人们检验不受限制的集合构造。这里记录问题的发展，不把悖论归为康托尔已经证明的结论。",
      "en": "Russell’s work on Cantorian set theory and foundations exposed the danger of unrestricted comprehension. The edge traces a problem’s development, not a result already proved by Cantor."
    },
    "sourceUrl": "https://plato.stanford.edu/entries/russell-paradox/"
  },
  {
    "id": "russell-godel",
    "source": "russell",
    "target": "godel",
    "kind": "influence",
    "label": {
      "zh": "形式系统成为研究对象",
      "en": "Formal systems as objects of study"
    },
    "description": {
      "zh": "哥德尔1931年论文直接研究《数学原理》及相关系统的不可判定命题。这是对形式化工程的深入分析，并不是两人的博士师承。",
      "en": "Gödel’s 1931 paper explicitly investigated undecidable statements in Principia Mathematica and related systems. It analyzes the formalization project; it does not record doctoral supervision."
    },
    "sourceUrl": "https://plato.stanford.edu/entries/goedel-incompleteness/"
  },
  {
    "id": "hilbert-godel",
    "source": "hilbert",
    "target": "godel",
    "kind": "influence",
    "label": {
      "zh": "一致性纲领与它的限制",
      "en": "Consistency and its limits"
    },
    "description": {
      "zh": "希尔伯特希望以有限方法保障数学的一致性；哥德尔的第二不完备性定理为这类计划施加严格限制。限制依赖理论的有效性和算术能力等条件。",
      "en": "Hilbert sought finitistic assurances of consistency. Gödel’s second incompleteness theorem constrained this program under specific conditions on effectiveness and arithmetic strength."
    },
    "sourceUrl": "https://plato.stanford.edu/entries/goedel-incompleteness/"
  },
  {
    "id": "hilbert-church",
    "source": "hilbert",
    "target": "church",
    "kind": "influence",
    "label": {
      "zh": "判定问题",
      "en": "The decision problem"
    },
    "description": {
      "zh": "希尔伯特的判定问题要求通用判定程序。丘奇在1936年证明一阶逻辑有效性不存在这样的算法，回应的是明确的研究问题。",
      "en": "Hilbert’s decision problem asked for a general procedure. Church’s 1936 undecidability result for first-order validity answered that research question."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Church/"
  },
  {
    "id": "church-turing",
    "source": "church",
    "target": "turing",
    "kind": "mentorship",
    "label": {
      "zh": "普林斯顿博士指导",
      "en": "Doctoral supervision at Princeton"
    },
    "description": {
      "zh": "图灵在丘奇指导下完成普林斯顿博士研究，1938年获学位。两人此前分别提出不同的可计算性模型；指导关系不意味着图灵机由丘奇提出。",
      "en": "Turing completed his Princeton doctorate under Church in 1938. They had previously developed distinct models of computation; the supervision does not make Church the inventor of Turing machines."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Turing/"
  },
  {
    "id": "godel-turing",
    "source": "godel",
    "target": "turing",
    "kind": "influence",
    "label": {
      "zh": "从证明边界到计算边界",
      "en": "From limits of proof to limits of computation"
    },
    "description": {
      "zh": "图灵1936年论文讨论与哥德尔不完备性结果相关的不可判定性，并以机器模型分析机械过程。这里是基础问题和方法的延展。",
      "en": "Turing’s 1936 paper relates undecidability to Gödel’s work and analyzes mechanical procedures through a machine model. The edge records a development of foundational questions."
    },
    "sourceUrl": "https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf"
  },
  {
    "id": "hilbert-von-neumann",
    "source": "hilbert",
    "target": "von-neumann",
    "kind": "mentorship",
    "label": {
      "zh": "哥廷根博士后研究",
      "en": "Postdoctoral study at Göttingen"
    },
    "description": {
      "zh": "冯·诺伊曼在1926–1927年于哥廷根随希尔伯特研究。他此前已在布达佩斯取得博士学位，因此这是博士后指导关系。",
      "en": "Von Neumann studied under Hilbert at Göttingen in 1926–1927 after earning his doctorate in Budapest. This is a postdoctoral, not doctoral, relationship."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Von_Neumann/"
  },
  {
    "id": "godel-von-neumann",
    "source": "godel",
    "target": "von-neumann",
    "kind": "influence",
    "label": {
      "zh": "迅速理解不完备性",
      "en": "Recognizing incompleteness"
    },
    "description": {
      "zh": "冯·诺伊曼很早理解哥德尔工作的意义，并在授课中转向讲解其结果。两人后来同在高等研究院工作；这条线记录理论影响。",
      "en": "Von Neumann quickly recognized the significance of Gödel’s results and taught them. Both later worked at the IAS; the edge records intellectual influence."
    },
    "sourceUrl": "https://www.ias.edu/kurt-g%C3%B6del-and-institute"
  },
  {
    "id": "laplace-kolmogorov",
    "source": "laplace",
    "target": "kolmogorov",
    "kind": "parallel",
    "label": {
      "zh": "概率基础的两种时代",
      "en": "Two eras of probability"
    },
    "description": {
      "zh": "编辑对照：拉普拉斯组织古典概率计算；柯尔莫哥洛夫用测度论公理处理无限过程。这是研究主题的历史比较，不声称两人有直接联系。",
      "en": "Editorial comparison: Laplace organized classical probability calculations; Kolmogorov’s measure-theoretic axioms accommodated infinite processes. This compares a research theme across eras, without implying personal contact."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Kolmogorov/"
  },
  {
    "id": "shannon-kolmogorov",
    "source": "shannon",
    "target": "kolmogorov",
    "kind": "parallel",
    "label": {
      "zh": "平均信息与个体复杂度",
      "en": "Average information and individual complexity"
    },
    "description": {
      "zh": "编辑对照：香农熵依赖一个概率分布；柯尔莫哥洛夫复杂度依赖固定通用机器上的最短描述。两者都研究信息，但对象与可计算性不同。",
      "en": "Editorial comparison: Shannon entropy concerns a probability distribution; Kolmogorov complexity concerns shortest descriptions on a fixed universal machine. The objects and computability properties differ."
    },
    "sourceUrl": "https://www.mathnet.ru/eng/ppi68"
  },
  {
    "id": "gauss-chern",
    "source": "gauss",
    "target": "chern",
    "kind": "influence",
    "label": {
      "zh": "曲率通向整体拓扑",
      "en": "Curvature and global topology"
    },
    "description": {
      "zh": "陈省身的高维高斯—博内定理内在证明，延展了把曲率与整体拓扑联系起来的几何传统。这是跨代的理论承接，不是直接师承。",
      "en": "Chern’s intrinsic higher-dimensional Gauss–Bonnet proof continued the connection between curvature and global topology. This is a mathematical inheritance across generations."
    },
    "sourceUrl": "https://www.ams.org/bull/1946-52-01/S0002-9904-1946-08487-6/"
  },
  {
    "id": "riemann-chern",
    "source": "riemann",
    "target": "chern",
    "kind": "influence",
    "label": {
      "zh": "内在黎曼几何",
      "en": "Intrinsic Riemannian geometry"
    },
    "description": {
      "zh": "陈省身在黎曼流形上研究曲率、联络与整体不变量，把内在几何推进到高维。这里记录理论语言的承接，不是两人的人际关系。",
      "en": "Chern studied curvature, connections and global invariants on Riemannian manifolds, developing intrinsic geometry in higher dimensions. The link is conceptual, not personal."
    },
    "sourceUrl": "https://www.ams.org/bull/1946-52-01/S0002-9904-1946-08487-6/"
  },
  {
    "id": "weil-chern",
    "source": "weil",
    "target": "chern",
    "kind": "influence",
    "label": {
      "zh": "同一定理的新证明",
      "en": "A new proof of a shared theorem"
    },
    "description": {
      "zh": "阿伦德费尔与韦伊1943年证明高维高斯—博内公式；陈省身1944年给出内在证明。此线强调具体结果之间的推进，不把韦伊写成他的博士导师。",
      "en": "Allendoerfer and Weil proved a higher-dimensional Gauss–Bonnet theorem in 1943; Chern supplied an intrinsic proof in 1944. This is a precise mathematical succession, not doctoral supervision."
    },
    "sourceUrl": "https://www.ams.org/bull/1946-52-01/S0002-9904-1946-08487-6/"
  },
  {
    "id": "riemann-weil",
    "source": "riemann",
    "target": "weil",
    "kind": "parallel",
    "label": {
      "zh": "不同世界的ζ函数",
      "en": "Zeta functions in different settings"
    },
    "description": {
      "zh": "编辑对照：黎曼研究复变量ζ函数；韦伊研究有限域曲线的ζ函数。后者的「黎曼假设」对应零点规律，并不等同于原猜想。",
      "en": "Editorial comparison: Riemann studied the classical zeta function, while Weil studied zeta functions of finite-field curves. Their zero patterns are analogous, but the hypotheses are different statements."
    },
    "sourceUrl": "https://www.ams.org/bull/1949-55-05/S0002-9904-1949-09219-4/S0002-9904-1949-09219-4.pdf"
  },
  {
    "id": "weil-grothendieck",
    "source": "weil",
    "target": "grothendieck",
    "kind": "influence",
    "label": {
      "zh": "猜想推动新工具",
      "en": "Conjectures demanding new tools"
    },
    "description": {
      "zh": "韦伊猜想要求有限域代数簇具有类似拓扑的上同调。格罗滕迪克与合作者建立étale上同调，为这份纲领提供关键工具；韦伊不是他的博士导师。",
      "en": "The Weil conjectures called for cohomology resembling topological invariants over finite fields. Grothendieck and collaborators developed étale cohomology to address this need; Weil was not his doctoral advisor."
    },
    "sourceUrl": "https://www.mathunion.org/fileadmin/ICM/Proceedings/ICM1966.1/ICM1966.1.ocr.pdf"
  },
  {
    "id": "dedekind-grothendieck",
    "source": "dedekind",
    "target": "grothendieck",
    "kind": "parallel",
    "label": {
      "zh": "理想与空间",
      "en": "Ideals and spaces"
    },
    "description": {
      "zh": "编辑对照：戴德金用理想整理代数数的整除结构；概形理论以环的素理想构造空间。这里并列两种结构语言，不把跨世纪对照伪装成人际师承。",
      "en": "Editorial comparison: Dedekind used ideals to organize divisibility; scheme theory constructs spaces from prime ideals. This compares structural languages rather than asserting personal mentorship."
    },
    "sourceUrl": "https://numdam.org/item/PMIHES_1960__4__5_0/"
  },
  {
    "id": "euler-erdos",
    "source": "euler",
    "target": "erdos",
    "kind": "parallel",
    "label": {
      "zh": "从桥梁到随机图",
      "en": "From bridges to random graphs"
    },
    "description": {
      "zh": "编辑对照：欧拉把桥梁问题化为顶点和连接；埃尔德什与雷尼研究随机选边后的整体结构。两者可放在图论长线中阅读，但没有直接人际关系。",
      "en": "Editorial comparison: Euler reduced bridges to vertices and connections; Erdős and Rényi studied global structures formed by randomly chosen edges. These are episodes in graph theory, not personal contact."
    },
    "sourceUrl": "https://www.cse.cuhk.edu.hk/~cslui/CMSC5734/erdos-1959-11.pdf"
  },
  {
    "id": "riemann-erdos",
    "source": "riemann",
    "target": "erdos",
    "kind": "parallel",
    "label": {
      "zh": "素数计数的不同路径",
      "en": "Different routes to prime counting"
    },
    "description": {
      "zh": "编辑对照：黎曼用复分析探索素数分布；埃尔德什参与了素数定理的初等证明。共同问题连接两者，「初等」不代表证明简单。",
      "en": "Editorial comparison: Riemann explored prime distribution through complex analysis; Erdős contributed to an elementary proof of the prime number theorem. The shared problem connects them; elementary does not mean easy."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Erdos/"
  },
  {
    "id": "turing-shannon",
    "source": "turing",
    "target": "shannon",
    "kind": "influence",
    "label": {
      "zh": "研究通用机器的简化",
      "en": "Simplifying universal machines"
    },
    "description": {
      "zh": "香农1956年研究用两个状态构造通用图灵机，直接沿用图灵的计算模型。状态少不意味着整个机器描述或计算过程都简单。",
      "en": "In 1956 Shannon studied universal Turing machines with two states, directly using Turing’s model. Few states do not imply that the entire description or computation is simple."
    },
    "sourceUrl": "https://mathshistory.st-andrews.ac.uk/Biographies/Shannon/"
  },
  {
    "id": "riemann-mirzakhani",
    "source": "riemann",
    "target": "mirzakhani",
    "kind": "influence",
    "label": {
      "zh": "曲面与模空间",
      "en": "Surfaces and their moduli"
    },
    "description": {
      "zh": "米尔扎哈尼研究黎曼曲面及其模空间的体积、曲线和动力系统，推进了关于曲面连续变化的问题。两者相隔一百多年，这是理论对象的承接。",
      "en": "Mirzakhani studied volumes, curves and dynamics on Riemann surfaces and their moduli spaces, extending questions about continuously varying surfaces. This is a connection between mathematical objects across generations."
    },
    "sourceUrl": "https://mathunion.org/fileadmin/IMU/Prizes/Fields/2014/news_release_mirzakhani.pdf"
  }
];
