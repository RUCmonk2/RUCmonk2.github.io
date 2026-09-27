# 数学知识网维护

页面：`/learning/math-map/` 与 `/en/learning/math-map/`，入口由学习目录统一维护。

- `src/data/math-map.ts`：双语概念、公式、条件、例子、关系、学习路线与参考资料。
- `src/components/math-map/layout.ts`：D3 力模拟、学科柔和聚拢、确定性布局及分层标签避让。
- `src/components/math-map/dwell.ts` / `use-dwell-focus.ts`：停留聚焦、计时取消、卸载清理及 React 状态接入。
- `src/components/math-map/ink-mark.ts`：由概念 id 生成稳定的轻微不规则墨点轮廓。
- `src/components/math-map/gestures.ts`：限定图谱范围的 trackpad / Safari 缩放与缩放中心保持。
- `src/components/math-map/math-map-graph.tsx`：搜索、筛选、图谱/列表、拖动、缩放、概念详情与分享链接。
- `src/app/[locale]/learning/math-map/`：页面、metadata 与局部样式。
- `scripts/check-math-map.mjs`：内容完整性、公式、先修环路与布局验证；CI 已接入。

## 新增或修订内容

概念 id 要稳定，分享地址使用 `#概念id`。每个概念提供中英文名称、解释、适用条件和 KaTeX 公式；可加例子、站内延伸链接和专属参考资料。未指定参考资料时沿用所属领域的资料。

`prereq` 从建议先学的概念指向后续概念，`related` 表示无向关联。学习路线是阅读顺序，不要求相邻项都构成直接先修关系。请避免循环依赖、重复关系和孤立节点。

数学约定：实变量、列向量、输出 × 输入布局的 Jacobian、Frobenius 矩阵内积。公式需要说明关键前提，尤其是可微/连续、矩阵对称/可逆/正定等条件。参考资料是延伸阅读，图谱的学习顺序属于编者组织。

初始布局在首次渲染前确定性求解；D3 模拟使用独立的节点、关系副本，避免修改内容数据和 React 状态。拖动时临时固定节点并重新激活力模拟，邻居跟随松弛；松手后释放，模拟冷却至停止。遵循减少动态效果偏好，不保存学习进度或布局位置。手机默认列表，也可切换图谱。

## 发布前检查

使用 Node.js 22，运行：

```sh
npm run lint
npm run test:content
npm run test:math-map
npm run build
npm run check:export
```

修改源文件后重建静态预览。浏览器检查中英文、深浅主题、手机宽度、搜索空状态、路线筛选、节点与邻居导航、拖动、缩放、键盘选择和概念深链接。只公开 `out/` 构建产物。

## 图谱视觉与力学

2026-09-27，用户选定 Royal Constellations 的疏密和层次、Nicky Case 的聚焦交互，以及宣纸、黛青、赭石的配色方向。此前“所有节点和边同时展示、七色等权”的方案已被替换。

- 图谱和页面同底色，不画矩形底板，不将节点 clamp 到画布四边。
- 使用三组主题色：分析 / 多元微积分 / ∇ 为黛青；线代 / 群论为松烟；矩阵微分 / AI 基础为赭石。底部图例明确对应这三组主题，上方七个领域按钮仍可分别筛选。
- 节点半径按全图关联数量计算；高连接节点与各领域核心节点优先显示较大、较重的标签。其余名称按缩放、悬停或选择逐步出现，并做文字避让。
- 默认全图不画关系边。悬停 / 键盘停留约 800ms 后切换并保持焦点、同步详情；点击或 Enter / Space 立即选择，页面和相机保持原位。快速经过只出现候选名称与细线进度，不切换邻域；非邻域节点为 12% 透明。点击空白、“全图”或 Escape 退出聚焦，有效 hash 恢复聚焦。
- “阅读详情”按钮负责滚动及焦点转移，详情顶部可“返回图谱”。移除原有 <=900px 点击节点自动滚动到详情的逻辑；触屏不触发悬停计时，点击即可选择。
- 指针离开、按下拖动、滚动 / 缩放、筛选、切换视图、hash 变化和卸载均取消未完成计时；缩放事件之间短暂阻止误触，明确的键盘导航不受指针防误触间隔影响。减少动态效果模式保留停留逻辑并省略进度动画与平滑滚动。
- 墨点以同一概念 id 生成确定性轮廓，使用淡墨外沿与稍浓内层；只有墨点路径轻微晕染，标签保持清楚。半径仍编码关联数，三组颜色编码知识主题，不添加无意义的飞溅点。
- 图内中文节点名使用霞鹜文楷 Regular 的专用子集，保留笔画粗细、关闭伪粗体，以字号和墨色区分层次。字体自托管于 `public/fonts/math-map/`，只用于 SVG 节点；页面正文、公式和英文标签沿用各自字体。改动中文节点短名后，用 `scripts/subset-math-map-font.mjs` 重新生成字形子集；来源、许可与命令见字体目录 README。
- 布局加入学科软引力，跨领域的弹力较弱，保留簇间空隙；没有固定节点、圆形围墙或矩形边界。布局的相对位置属于编辑安排，不编码定量数学距离。
- 力学面板保留聚拢、斥力、连线弹力、连线长度。拖动仍会影响邻居，松手后冷却；减少动态效果模式同步求解。
- 图内 ctrl-wheel / Safari gesture 使用非 passive 监听并取消页面缩放，保持手势位置下的图坐标不变；普通滚动继续传递，组件卸载时移除监听。真实 Mac 触控板动作需人工体验，事件层自动检查不能替代硬件验证。

参考：[Royal Constellations](https://www.datasketch.es/project/royal-constellations)、[The Wisdom and/or Madness of Crowds](https://ncase.me/crowds/)、[Obsidian Graph view](https://obsidian.md/help/plugins/graph)。运行时采用 [D3 force](https://d3js.org/d3-force)，并非 Obsidian 的私有引擎。
