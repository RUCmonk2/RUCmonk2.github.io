# Codex 交互入口

最后更新：2026-07-05

这个文件是 `/Users/zlh/Desktop/科研` 的 Codex 上下文入口。每次新开 Codex 窗口时，先让 Codex 读这个文件，再按下面的指引恢复语境。

## 新窗口开场白

### 只恢复上下文，不修改文件

```text
请先阅读 Desktop/科研/codex交互reademe.md 恢复上下文。先不要修改文件，先告诉我你理解到的当前状态、重要文件夹、遗留问题和下一步建议。
```

### 恢复上下文后继续推进

```text
请先阅读 Desktop/科研/codex交互reademe.md，并按里面的指引恢复当前科研上下文。然后继续处理 codex语境交接/OPEN_QUESTIONS.md 里优先级最高的问题。每次完成阶段性工作后，更新 codex 语境交接文件。
```

### 结束前更新交接文件

```text
请更新 Desktop/科研/codex交互reademe.md 和 Desktop/科研/codex语境交接/，记录本次完成内容、当前遗留问题、重要文件变化和下一步建议。
```

## 新 Codex 请先读

1. `Desktop/科研/codex语境交接/CURRENT.md`
2. `Desktop/科研/codex语境交接/OPEN_QUESTIONS.md`
3. `Desktop/科研/codex语境交接/FILE_MAP.md`
4. `Desktop/科研/codex语境交接/DECISIONS.md`
5. `Desktop/科研/codex语境交接/JOURNAL.md`

## 当前主线

当前科研整理主线围绕 mHClite 复现、HC/AttnRes 组会故事、图流与 Sketch 前置知识、高瓴导师/博士生方向整理展开。

## 最近完成

- 已整理 mHClite 前置知识与参数。
- 已生成组会小故事 `tex/pdf`：从残差稀释到 HC 与 AttnRes。
- 已整理组会小故事可参考成熟论文。
- 已建立 GitHub 友好的 mHClite research notes 仓库。
- 已整理图流与 Sketch 核心概念。
- 已整理高瓴导师与公开博士生研究方向。
- 已创建本 Codex 语境交接机制。

## 当前遗留问题

详细列表见 `codex语境交接/OPEN_QUESTIONS.md`。当前最重要的是：

- 是否把“成熟论文支撑”补进组会小故事 LaTeX。
- 是否系统阅读 mHClite 开源代码。
- 是否把新的 Markdown 笔记同步到 GitHub 仓库。

## 维护规则

- 每次 Codex 完成阶段性任务后，应更新本文件和 `codex语境交接/`。
- 本文件只保留短摘要和可复制开场白，不写过长细节。
- 详细状态写入 `CURRENT.md`，日志追加到 `JOURNAL.md`，遗留问题维护在 `OPEN_QUESTIONS.md`。
- 重要文件夹变化更新 `FILE_MAP.md`。
- 已经形成的判断或约定记录到 `DECISIONS.md`。
