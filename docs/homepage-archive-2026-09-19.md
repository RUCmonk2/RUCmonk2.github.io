# 2026-09-19 首页改版存档与恢复

## 版本身份

- 旧版：`3b854369d7c83366924247c91c50ceafbc066edf`，提交标题 `Remove friend list from homepage`。
- 旧版永久标签：`archive/pre-cloud-study-2026-09-19`，已推送到 GitHub。
- 已核对旧版对应 GitHub Pages 成功发布任务：`35430639128`。
- 云山新版改动提交：`be6b28aa04bea7af42797f5a12564f8505d866ef`。
- 托管仍为原来的 GitHub Pages；推送 main 会触发 `.github/workflows/deploy-pages.yml`。

新版包括云山背景、轻雾动效、竖排题句、正文样式、收起空栏目和导航调整，不包含 Imagination 画像展示。友链入口与独立友链页面保留，旧版原已移除的首页友链列表不恢复。

## 存档保存在哪里

本地独立目录（不放在网站公开目录中）：

`/Users/zlh/Desktop/site-archives/2026-09-19-before-cloud-study/`

- `source.zip`：通过 `git archive` 从旧版标签导出的完整受 Git 管理的源码，包括当时的配置、锁文件及图片，不含 node_modules、工作区未提交修改和未跟踪文件。
- `history.bundle`：通过 `git bundle create` 保存旧 main 与存档标签可达的 Git 历史。无需 GitHub 也可以克隆；并非整个电脑或所有分支的备份。
- `deployed/artifact.tar`：从旧版成功发布任务下载的 GitHub Pages 静态构建产物，包含当时发布的 HTML、CSS、JS 和资源。构建任务产物会过期，这份下载到本地的副本不依赖任务保留期。
- `README.md`：本说明的本地副本。
- `SHA256SUMS.txt`：三个备份文件的 SHA-256 校验值。

标签同时存在于 GitHub：它固定指向旧提交，之后 main 更新不影响它。不要移动或删除这个标签。本地目录还可以另复制到外置硬盘作为第二份备份。

## 只想看旧版，不影响当前网站

直接查看存下来的静态产物，无需安装 Node 依赖或重新构建：

```sh
mkdir -p "$HOME/Desktop/site-archives/2026-09-19-before-cloud-study/preview"
tar -xf "$HOME/Desktop/site-archives/2026-09-19-before-cloud-study/deployed/artifact.tar" -C "$HOME/Desktop/site-archives/2026-09-19-before-cloud-study/preview"
python3 -m http.server 3020 --bind 127.0.0.1 --directory "$HOME/Desktop/site-archives/2026-09-19-before-cloud-study/preview"
```

打开 `http://127.0.0.1:3020/`。终端按 Ctrl+C 关闭预览。这不会修改线上网站。

## 推荐：撤销这一次设计改版，重新发布旧样式

先确保工作区干净；如果 `git status` 显示你正在修改的文件，先保存、提交或转移自己的修改。以下操作创建一条新的“撤销”提交，保留历史，也尽量保留此后增加的文章和数据。

```sh
cd "$HOME/Desktop/RUCmonk2.github.io"
git switch main
git pull --ff-only origin main
git status
git revert be6b28aa04bea7af42797f5a12564f8505d866ef
npm ci
npm run build
git push origin main
```

构建通过后再执行 push。GitHub Actions 成功完成后，线上恢复旧设计。若 revert 出现冲突，停止并逐项处理；不想继续可用 `git revert --abort`，不要强推。

如果未来还想恢复云山设计，找到刚才“撤销”操作生成的提交，执行 `git revert <撤销提交的SHA>`，构建通过后推送 main 即可。

## 需要把全站内容精确恢复到存档时刻

这会同时回退后来增加的文章、友链和配置，不只是首页。用一个新工作目录执行，可避免覆盖正在编辑的文件：

```sh
cd "$HOME/Desktop"
git clone https://github.com/RUCmonk2/RUCmonk2.github.io.git RUCmonk2-full-restore
cd RUCmonk2-full-restore
git switch -c codex/restore-2026-09-19 origin/main
git fetch origin --tags
git restore --source=archive/pre-cloud-study-2026-09-19 --staged --worktree .
git diff --cached --stat
git commit -m "Restore site to archived version from 2026-09-19"
npm ci
npm run build
git push origin HEAD:main
```

确认差异与构建无误后再 push。该方式正常新增恢复提交，不改写历史，也不需要 `--force`。如果远端 main 此时有更新，普通 push 会拒绝覆盖，需重新检查最新改动。

## GitHub 不可用时，从本地历史备份取出源码

```sh
git clone "$HOME/Desktop/site-archives/2026-09-19-before-cloud-study/history.bundle" "$HOME/Desktop/RUCmonk2-offline-restore"
cd "$HOME/Desktop/RUCmonk2-offline-restore"
git switch -c codex/old-homepage archive/pre-cloud-study-2026-09-19
```

这一步不需要联网；`npm ci` 仍需要依赖缓存或网络。离线查看页面请使用上面的静态产物预览方式。source.zip 也能直接解压取得源码，但不带 Git 历史。

## 校验备份文件

```sh
cd "$HOME/Desktop/site-archives/2026-09-19-before-cloud-study"
shasum -a 256 -c SHA256SUMS.txt
```

三个文件都显示 OK 表示与本次保存时的字节内容一致。

## 网络说明

本次环境的 macOS 系统代理是 `127.0.0.1:3213`，终端直连 GitHub 失败后，使用该现有代理成功完成远端操作。未修改系统或 Git 的永久代理配置。如果以后同样直连失败，且该代理仍在运行，可仅为当前命令加：

```sh
HTTPS_PROXY=http://127.0.0.1:3213 HTTP_PROXY=http://127.0.0.1:3213 git push origin main
```

代理端口以你当时的实际配置为准。
