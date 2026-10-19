# 功与能、静电场公式推导图

## 范围与入口

这是独立的高中物理公式专题，包含16个节点、24条带类型的关系，分为运动与受力、功与能量、静电场三个领域。它补充现有课程，不替换全科的671个主干主题、37张学段图谱，也不改变高中物理原有21个主干节点及其ID。全科统计仍按原有口径计算，16个专项节点单独统计。

- 专题：`/learning/k12/subjects/physics/formula-map`；具体节点使用 `#work-energy` 等稳定ID。
- 入口位于物理学科目录和高中物理主干知识网页面，使用 `PhysicsFormulaEntry`。
- 默认选中 `work-energy`。三条学习路线分别连接机械能、静电场能量关系、带电粒子应用；路线用于组织阅读，不能代替完整的推导前提。
- 中文默认路径和 `/en/` 路径共用中文教学内容；正文资产的语言为 `zh`，不是两套独立译文。
- 首轮不包含电容器及后续电磁学推导。相关主干主题仍留在原高中物理知识网中，不删除，也不作为本专题已经展开的内容。

力学部分7个节点来自 `mechanics.json`：`motion`、`newton`、`work`、`kinetic-energy`、`work-energy`、`gravitational-energy`、`mechanical-energy`。

静电场部分9个节点来自 `electrostatics.json`：`coulomb`、`electric-field`、`point-charge-field`、`electric-potential`、`electric-work`、`uniform-field`、`combined-energy`、`acceleration`、`deflection`。

## 内容源与生成链

| 文件或目录                                                              | 职责                                                                       |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `content/physics-formulas/mechanics.json`                               | 7个力学节点的作者内容，JSON数组                                            |
| `content/physics-formulas/electrostatics.json`                          | 9个静电场节点的作者内容，JSON数组                                          |
| `src/data/physics-formulas.ts`                                          | 类型、节点顺序、公式性质、关系、旧节点映射、学习路线、双模式正文和图谱适配 |
| `scripts/build-school-lessons.mjs`                                      | 共用全科生成器，同时生成专项正文和旧物理节点补充推导                       |
| `public/assets/physics-formulas/zh/{id}.json`                           | 生成的专项正文，含 `beginner`、`formal`、`intro`；Git忽略                  |
| `public/assets/school-lessons/physics/zh/{id}.json`                     | 原物理正文，指定主题会插入共用推导和专项深链接；Git忽略                    |
| `src/app/[locale]/learning/k12/subjects/[subject]/formula-map/page.tsx` | 专题页面，仅静态生成 `physics` 学科                                        |
| `src/components/physics/physics-formula-entry.tsx`                      | 目录与高中主干图中的入口卡片                                               |
| `src/components/math-map/`                                              | 共用图布局、关系展示、预览、按需正文读取及答案折叠                         |

编辑作者JSON及图谱数据，不直接改生成资产。正文由 `physicsLessonMarkdown()` 生成：两种模式使用同一套事实、条件、推导、例题和自检；“从零理解”先讲直觉，“严谨表述”先讲公式性质与适用边界。阅读器只在需要时读取对应资产。

自检答案由生成器放在唯一的 `<!-- solutions -->` 分界后，阅读器默认折叠该部分。完整例题的步骤属于正文，正常展示；不要把自检答案写进摘要、直觉、引言或分界前的正文。

### 作者节点结构

准确类型以 `PhysicsFormula` 和 `FormulaStep` 为准：

| 字段                   | 要求                                                                            |
| ---------------------- | ------------------------------------------------------------------------------- |
| `id`、`title`          | 稳定ID与中文标题；修改ID会影响哈希链接、关系及生成资产                          |
| `domain`               | `motion`、`energy` 或 `field`                                                   |
| `kind`                 | 下表中的四种公式性质之一                                                        |
| `summary`、`intuition` | 简明结论与面向高中读者的直观解释                                                |
| `formula`              | 预览使用的裸LaTeX，不加数学分隔符                                               |
| `symbols`              | 非空数组，元素为 `{ symbol, meaning, unit }`；`symbol`、`unit` 为裸LaTeX        |
| `conditions`           | 非空Markdown字符串数组，写清模型和适用条件                                      |
| `steps`                | 4–6个实质教学步骤，元素为 `{ title?, equation, explanation }`；建议每步都有标题 |
| `example`              | `{ problem, steps, result }`；独立题目、非空计算步骤与结果检查                  |
| `pitfalls`             | 非空Markdown字符串数组，指出具体误用及区别                                      |
| `check`                | `{ question, answer }`；自检及带理由的答案                                      |
| `formalNote`           | 严谨边界或选读说明；可解释积分来源，但不要求高中主线先掌握微积分                |

`equation` 可以是空字符串，适合明确采用实验规律、定义或已知性质的步骤。其他推导步骤应同时有公式和逐步理由，不能只重复最终公式。

正文中的公式使用 `$...$`，独立公式使用 `$$...$$`。`formula`、`equation`、`symbol`、`unit` 由生成器包装，必须保留裸LaTeX；JSON中的反斜杠需要写成 `\\`。中文下标使用 `\text{中文}`。符号表会生成Markdown表格，绝对值宜写 `\lvert ... \rvert`，避免裸 `|` 把一行错误拆成多列。

### 与旧21个高中节点共用推导

`legacyFormulaTopics` 明确映射6个旧主题：`high-mechanics-1`、`high-mechanics-3`、`high-mechanics-4`、`high-conservation-1`、`high-conservation-2`、`high-fields-1`。

生成器对这些旧主题调用 `legacyPhysicsDerivation()`：展开映射列表中第一个专项节点的推导步骤与条件，再链接列表中的全部专项节点。两种阅读模式都获得这一补充；旧节点原有问题、答案边界及正文引用不变。映射顺序有意义，调整第一个ID会改变旧主题直接展示的推导。

专项与旧节点不各抄一份公式正文。修改JSON后重新生成，即可同时更新专项讲解与旧主题的共用推导。映射需覆盖全部16个专项节点；不扩充原21个主干ID来容纳这些细分公式。

## 公式性质与关系类型

节点的 `kind` 说明关系本身是什么，不能与连线的 `relation` 混为一谈。

| `kind`       | 显示名称 | 编辑含义                                                     |
| ------------ | -------- | ------------------------------------------------------------ |
| `definition` | 定义     | 说明物理量如何规定，以及为什么这样比较；不冒充已经证明的规律 |
| `law`        | 实验规律 | 明确实验起点，例如牛顿第二定律、库仑定律                     |
| `derived`    | 推导结果 | 逐步列出所用定义、规律与条件                                 |
| `model`      | 模型应用 | 将前面结果用于具体模型，例如加速、偏转；额外条件必须明确     |

`physicsFormulaEdges` 的每条边为 `{ source, target, relation, reason }`。以下四类都有独立标签和说明：

| `relation`   | 显示名称 | 图与阅读器中的作用                                 |
| ------------ | -------- | -------------------------------------------------- |
| `definition` | 使用定义 | 从来源节点调用定义，作为目标推导的一个输入         |
| `deduction`  | 推导依据 | 将已有关系作为目标推导的依据                       |
| `condition`  | 条件特例 | 在明确额外条件下应用或化简已有关系                 |
| `analogy`    | 方法类比 | 双向相关联系，只帮助理解，不进入推导前提或推导后续 |

前三类适配为共享图引擎的 `prereq`，最后一类为 `related`。非类比边必须无环、没有自环或重复关系，并指向已有节点。不要按列表相邻顺序自动连线，也不要把重力势能与电势能的类比画成证明关系。

一个结论通常需要多个前提共同成立。例如动能定理同时使用运动学、牛顿第二定律、功的定义、动能的定义；每一条入边都不是单独足以推出结论的声明。预览和正文必须展示相同的前提、后续与类比关系。

## 物理内容编辑约定

采用高中常用的经典质点、近地面重力与固定静电场模型。逐节点补充恒力、匀强场、初始条件、非相对论速度、忽略边缘效应等条件，不把特殊模型的简式推广到任意过程。

- 场强写 `E` 或 `\vec E`；能量保留下标，如 `E_k`、`E_{\mathrm{pG}}`、`E_{\text{p电}}`，并在符号表说明单位。
- 区分带符号电荷量 `q`、电荷量大小和元电荷正大小 `e`。矢量受力关系与力的大小关系分别处理。
- 电势差固定为起点电势减终点电势；能量变化量固定为末值减初值。负电荷、电势与电势能必须逐步检查符号。
- 动能定理的一维恒力推导须说明怎样推广到一般运动；不能反过来以机械能守恒作为动能定理的前提。
- 写出所统计的能量和，再讨论守恒。初末能量相等不自动说明全过程不变；同一力的功与对应势能变化不能重复计入。
- 静电场保守性要明确为采用的性质，不能仅由重力类比当作证明。教师选读可从点电荷场的积分说明来源。
- 偏转模型必须检查初始竖直速度、极板极性、所选正方向与不撞板条件；出口动能使用完整速率。
- 例题与自检独立编写，不放入个人学生身份、分数或未经处理的试卷信息。数值、符号、单位和可达条件需人工复核；自动测试不替代物理审稿。

## 验证与字体维护

在仓库根目录执行。普通内容修改先生成，再跑专项检查，不需要每次都运行完整站点构建：

```sh
node scripts/build-school-lessons.mjs
node scripts/check-physics-formulas.mjs
```

生成器共用全科流程，会同时更新原课程资产与 `atlas-manifest.json`。正式验证不能使用 `--partial`。专项检查固定核对16个ID、24条关系、四种关系分类、共同前提、类比的对称展示、无环关系、4–6步推导、两种阅读模式、自检答案边界、符号表列数、生成资产与内容源一致，以及原21个高中节点的兼容性。新增节点或关系须同步审查这些明确的范围断言，不能只为绕过失败而删断言。

公式通过 `remark-math` 解析，使用KaTeX的 `strict: "error"`、`throwOnError: true` 校验；生成检查还设置 `trust: false`。页面正文复用共享 `MathProse` 和KaTeX渲染。不得把LaTeX命令留在普通文本中，或将公式转成图片绕过校验。

完整课程回归使用：

```sh
npm run test:k12
```

该命令会运行全科生成与 `check-school-atlases.mjs`，后者导入关系适配检查和 `check-physics-formulas.mjs`，因此CI已有K12步骤会覆盖本专题。发布前再执行项目既有的lint、构建与导出检查：

```sh
npm run lint
npm run build
npm run check:export
```

`npm run build` 自动调用共用生成器；`check-site-export.mjs` 核对专题的两个本地化页面、专项正文导出资产和哈希链接。浏览器验收还需检查直接打开节点链接、全部推导前提、双阅读模式、折叠答案、窄屏长公式与符号表的可读性。

新增或修改中文图标签后，使用官方LXGW WenKai Regular源字体重新生成本地子集：

```sh
python3 -m pip install fonttools==4.62.1
node scripts/subset-math-map-font.mjs /path/to/LXGWWenKai-Regular.ttf
```

子集脚本已收集专项节点及其他图谱的标签，输出 `public/fonts/math-map/kai-labels.woff`。保留OFL许可与衍生字体Atlas Kai命名规则；源版本、校验值和许可说明见 [字体说明](../public/fonts/math-map/README.md)。不要把字体构建放进浏览器运行时。修改标签后同时核对字体字符覆盖与浏览器实际显示。

全科目录和主干图谱维护说明见 [中小学全科文档](k12-subjects.md)。
