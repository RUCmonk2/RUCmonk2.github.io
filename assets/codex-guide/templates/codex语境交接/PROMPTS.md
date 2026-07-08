# 常用 Codex 提示词

最后更新：{{DATE}}

## 新窗口只恢复上下文

```text
请先阅读 {{PROJECT_PATH_FOR_PROMPT}}/codex交互reademe.md 恢复上下文。先不要修改文件，先告诉我你理解到的当前状态、重要文件夹、temps 临时资料处理规则、遗留问题和下一步建议。
```

## 新窗口恢复后继续推进

```text
请先阅读 {{PROJECT_PATH_FOR_PROMPT}}/codex交互reademe.md，并按里面的指引恢复当前项目上下文。然后继续处理 codex语境交接/OPEN_QUESTIONS.md 里优先级最高的问题。每次完成阶段性工作后，更新 codex 语境交接文件。
```

## 处理 temps 临时资料

```text
请先阅读 {{PROJECT_PATH_FOR_PROMPT}}/codex交互reademe.md 恢复上下文，然后检查 temps/ 里的临时资料。请先告诉我你看到哪些资料、判断它们应该归类到哪里、哪些信息需要提取、哪些文件处理完可以删除。确认后再执行移动、整理或删除。
```

## 只让 Codex 复述需求和计划

```text
先不要修改文件。请复述我的需求，并给出你打算怎么做、会修改哪些文件、可能有哪些风险。
```

## 结束前更新交接

```text
请更新 {{PROJECT_PATH_FOR_PROMPT}}/codex交互reademe.md 和 {{PROJECT_PATH_FOR_PROMPT}}/codex语境交接/，记录本次完成内容、当前遗留问题、重要文件变化和下一步建议。
```
