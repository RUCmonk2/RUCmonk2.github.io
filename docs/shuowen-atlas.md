# 说文解字 · 字里观道

入口为 `/learning/shuowen/`，英文导航入口为 `/en/learning/shuowen/`；正文是中文。72 个精选字、118 条经过编辑核对的关系、6 条导读路线，姓名三字固定为 `#ye`、`#yao`、`#zhi`。选字清单在检查脚本中锁定，不将异体或部件重复计为精选字。

## 内容与证据

- `src/data/shuowen/characters-a.ts`、`characters-b.ts`：各36字。分开保存字书释文、字形说明、老庄用例、原创随想与辨义提示。
- `src/data/shuowen/relations.ts`：原典关联、概念对读、主题导读。每条原典关系链接具体章篇；错误端点直接抛错。
- `src/data/shuowen/glyphs.ts`：75张历史字形的现代摹写及2张1873陈昌治本影印整页。每个精选字至少一张字形资料；叶与无另有古籍原页。
- `public/images/shuowen/glyphs/sources.json`：77份素材记录，含出处、许可、字表页码或原始文件版本，以及本地文件SHA256。现代摹写与古籍影印不得混称。
- `public/images/shuowen/art/prompts.json`：12幅以内置image_gen生成的原创水墨意象及创作提示。它们是艺术演绎，不作为古文字证据。

《老子》引文采用维基文库王弼本文本并逐条核对章号；正文与王弼夹注分开。庄子用例核对各篇原文。《说文》与释形主要通过香港中文大学汉语多功能字库核对，特殊条目补教育部异体字字典。现代解释为本专题原创。

需特别保留的区分：叶／葉与古叶、耀／燿、妙／玅、蝶／蜨、宁／寍／寧、气／氣、朴／樸、游／遊、冲／沖、复／復；逍、遥有新附身份。明字的小篆以朙展示。之字分别呈现许慎解释和现代古文字释读。

## 页面与字体

组件在 `src/components/shuowen/`，样式在 `src/app/[locale]/learning/shuowen/shuowen.css`。SVG加d3-force的确定性布局保持主题分组；移动端默认放大并定位当前字，正文回到正常页面滚动。字形图的中心必须与展示的构件匹配，不能用燿的字头配耀的光旁。

`public/fonts/shuowen/characters.woff2` 是改名为 Shuowen Kai 的霞鹜文楷子集，保留完整OFL。来源文件SHA、字形覆盖与处理记录在同目录的metadata.json。更新数据或UI后，如新增字体所需字符，执行：

```sh
node scripts/subset-shuowen-font.mjs /path/to/LXGWWenKai-Regular.ttf
```

脚本只接受核实的上游1.522版。上游确实不含𠂹、𣠮；`scholarly-text.tsx` 保留原始转录，分别用注明身份的释字和已核验的字形图显示。不可把不相干字形映射到它们来骗过覆盖检查。

## 检查与发布

```sh
node scripts/check-shuowen.mjs
npm run lint
npm run build
npm run check:export
```

检查包括准确72字、收录身份、关系、路线、图像文件、来源记录与校验值、所有12幅意象图、布局边界及间距、字体覆盖。Python环境需`fonttools[woff]==4.62.1`。检查已接入GitHub Pages工作流。

浏览器复核包括桌面和390px手机、简繁及拼音搜索、三字直达与刷新、前进后退、路线下一字、拖动与缩放、字形部件跳转、图像放大、稀有字显示和控制台错误。构建产物由现有流程提升中文默认路径，发布后检查真实地址。
