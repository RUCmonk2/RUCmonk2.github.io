# Codex 交互入口

最后更新：{{DATE}}

这个文件是 `{{PROJECT_PATH}}` 的 Codex 上下文入口。每次新开 Codex 窗口时，先让 Codex 读这个文件，再按下面的指引恢复项目语境。

## 新窗口开场白

### 只恢复上下文，不修改文件

```text
请先阅读 {{PROJECT_PATH_FOR_PROMPT}}/codex交互reademe.md 恢复上下文。先不要修改文件，先告诉我你理解到的当前状态、重要文件夹、temps 临时资料处理规则、遗留问题和下一步建议。
```

### 恢复上下文后继续推进

```text
请先阅读 {{PROJECT_PATH_FOR_PROMPT}}/codex交互reademe.md，并按里面的指引恢复当前项目上下文。然后继续处理 codex语境交接/OPEN_QUESTIONS.md 里优先级最高的问题。每次完成阶段性工作后，更新 codex 语境交接文件。
```

### 处理 temps 临时资料

```text
请先阅读 {{PROJECT_PATH_FOR_PROMPT}}/codex交互reademe.md 恢复上下文，然后检查 temps/ 里的临时资料。请先告诉我你看到哪些资料、判断它们应该归类到哪里、哪些信息需要提取、哪些文件处理完可以删除。确认后再执行移动、整理或删除。
```

### 结束前更新交接文件

```text
请更新 {{PROJECT_PATH_FOR_PROMPT}}/codex交互reademe.md 和 {{PROJECT_PATH_FOR_PROMPT}}/codex语境交接/，记录本次完成内容、当前遗留问题、重要文件变化和下一步建议。
```

## 新 Codex 请先读

1. `{{PROJECT_PATH_FOR_PROMPT}}/codex语境交接/CURRENT.md`
2. `{{PROJECT_PATH_FOR_PROMPT}}/codex语境交接/OPEN_QUESTIONS.md`
3. `{{PROJECT_PATH_FOR_PROMPT}}/codex语境交接/FILE_MAP.md`
4. `{{PROJECT_PATH_FOR_PROMPT}}/codex语境交接/DECISIONS.md`
5. `{{PROJECT_PATH_FOR_PROMPT}}/codex语境交接/JOURNAL.md`
6. `{{PROJECT_PATH_FOR_PROMPT}}/codex语境交接/PROMPTS.md`
7. 如需处理临时资料，再读 `{{PROJECT_PATH_FOR_PROMPT}}/temps/README.md`

## 当前主线

{{PROJECT_MAINLINE}}

## 重要文件夹

- `temps/`：临时资料工作区，只用于待整理输入，不作为正式内容目录。
- `temps/README.md`：临时资料管理台账，记录当前清单、建议清理节奏和清理记录。
- `codex语境交接/`：Codex 上下文交接文件夹。
- {{PROJECT_FILE_MAP_SUMMARY}}

## temps 使用规则

- `temps/` 用来临时放用户稍后交给 Codex 处理的资料。
- Codex 处理 `temps/` 前，应先读取 `temps/README.md`，再列出文件、判断类别和目标去向。
- 有长期价值的内容应整理到合适的正式目录，或写入正式文件。
- 只提供参考价值的信息，应先提取结论或更新正式文件，再删除原始临时资料。
- 临时资料默认不进入 Git：`temps/.gitignore` 会忽略除 `.gitignore`、`.gitkeep` 和 `README.md` 以外的文件。
- 每次阶段性任务结束时快速检查一次 `temps/`；每周至少清理一次。
- 当 `temps/` 文件超过 10 个或总大小超过 200MB 时，优先建议用户整理。
- 处理后应更新 `temps/README.md` 的当前清单和清理记录；如果资料内容重要，也应在 `codex语境交接/JOURNAL.md` 记录处理方式和去向。

## 最近完成

- {{RECENT_DONE_ITEM}}

## 当前遗留问题

详细列表见 `codex语境交接/OPEN_QUESTIONS.md`。当前最重要的是：

- {{OPEN_QUESTION_ITEM}}

## 维护规则

- 每次 Codex 完成阶段性任务后，应更新本文件和 `codex语境交接/`。
- 本文件只保留短摘要和可复制开场白，不写过长细节。
- 详细状态写入 `CURRENT.md`，日志追加到 `JOURNAL.md`，遗留问题维护在 `OPEN_QUESTIONS.md`。
- 重要文件夹变化更新 `FILE_MAP.md`。
- 已经形成的判断或约定记录到 `DECISIONS.md`。
- 涉及 `temps/` 的整理、移动和删除，应尽量在 `JOURNAL.md` 留下处理记录。
- 处理 `temps/` 后，必须同步更新 `temps/README.md`。
