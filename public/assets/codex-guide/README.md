# Codex 交互指南

最后更新：2026-07-09

这个文件夹是给未来项目复用的 Codex 协作模板。以后新建项目文件夹时，只要让 Codex 参考 `Desktop/codex交互指南`，Codex 就应该知道需要为目标项目建立：

- `temps/` 临时资料工作区；
- 项目级 `codex交互reademe.md`；
- `codex语境交接/` 上下文交接目录；
- 一套跨窗口恢复上下文、处理临时资料、记录遗留问题和更新日志的维护规则。

## 给 Codex 的执行原则

当用户说“参考 Desktop/codex交互指南”时，先做这些事：

1. 读取本文件夹的 `README.md`、`初始化清单.md`、`常用提示词.md` 和 `templates/`。
2. 明确目标项目路径。如果用户没有给路径，先询问，不要猜。
3. 先检查目标项目已有结构和是否已有同名文件，避免覆盖用户已有内容。
4. 在目标项目中创建或补齐 `temps/`、`codex交互reademe.md` 和 `codex语境交接/`。
5. 按目标项目实际情况改写模板里的路径、项目主线、重要文件夹、遗留问题和维护规则。
6. 创建完成后，检查文件清单和 Git 状态；如果目标项目是 Git 仓库，确认 `temps/` 临时资料默认不会被误提交。

## 标准目录结构

目标项目里建议形成下面的结构：

```text
目标项目/
├── codex交互reademe.md
├── codex语境交接/
│   ├── CURRENT.md
│   ├── OPEN_QUESTIONS.md
│   ├── FILE_MAP.md
│   ├── DECISIONS.md
│   ├── JOURNAL.md
│   └── PROMPTS.md
└── temps/
    ├── .gitignore
    ├── .gitkeep
    └── README.md
```

## temps 规则

- `temps/` 是临时资料工作区，不是正式内容目录。
- `temps/README.md` 是临时资料的管理台账，记录使用规则、当前清单、建议清理节奏和清理记录。
- 用户可以偶尔把资料放进 `temps/`，让 Codex 读取、分类、提取信息或辅助整理。
- Codex 处理前应先列出 `temps/` 里的文件，并对照 `temps/README.md` 说明每个文件的处理建议。
- 有长期价值的资料应移动到合适正式目录，或把信息写入正式文件。
- 只用于一次性参考的资料，利用完后可以删除；如果内容重要，要先在 `JOURNAL.md` 记录处理方式和去向。
- 不能确认是否可删时，先问用户。
- 每次阶段性任务结束时快速检查一次 `temps/`；每周至少清理一次。
- 当 `temps/` 文件超过 10 个或总大小超过 200MB 时，优先建议用户整理。
- 处理 `temps/` 后，应同步更新 `temps/README.md` 的当前清单和清理记录；有长期影响的处理也写入 `codex语境交接/JOURNAL.md`。

## 文件分工

- `codex交互reademe.md`：新 Codex 必读入口，只放短摘要、开场白、当前主线和维护规则。
- `codex语境交接/CURRENT.md`：当前状态、项目主线、用户偏好和下一步建议。
- `codex语境交接/OPEN_QUESTIONS.md`：未解决问题和优先级。
- `codex语境交接/FILE_MAP.md`：重要文件、文件夹和用途。
- `codex语境交接/DECISIONS.md`：已经形成的约定、判断和长期规则。
- `codex语境交接/JOURNAL.md`：阶段性工作日志，追加记录。
- `codex语境交接/PROMPTS.md`：可复制给新 Codex 的常用提示词。

## 模板位置

可复制和改写的模板在 `templates/`：

- `templates/codex交互reademe.md`
- `templates/codex语境交接/*.md`
- `templates/temps/.gitignore`
- `templates/temps/.gitkeep`
- `templates/temps/README.md`

不要把模板里的占位符原样留在目标项目里。应替换为目标项目的真实路径、真实主线和真实文件说明。
