# 首页访客

GPT 娘出现在学习精选的侧边留白；Claude 娘出现在写作之后（没有公开文章时仍在学习栏目之后）。手机上两者都放在正文之后。

- 每个浏览会话有 1/3 的概率出现访客，GPT 与 Claude 各为 1/6，其余为不出现。
- `sessionStorage` 的 `study-visitors-v1` 保存 `gpt`、`claude` 或 `none`；刷新及中英文导航共用这次结果。浏览器禁用存储时，仅保留当前页面状态。
- 页尾“访客”入口可以主动选择一位、切换或收起；主动操作也保存到当前会话。
- 人物进入视野后淡入，随正文滚动；减少动态效果偏好会关闭过渡，并用即时定位。
- 人物在视野内时，右下角山间小伴暂时隐藏；离开视野或收起访客后恢复其原有状态。

## 素材

用户提供《GPT娘白大褂.png》和《花枝间的claude新娘.png》。原图保持不变，网页使用压缩后的 640 × 960 WebP：

- [GPT 娘](../public/images/visitors/gpt-lab.webp)：内置 imagegen 去背景，保留真实透明通道。
- [Claude 娘](../public/images/visitors/claude-bride.webp)：原图缩放压缩；网页用 multiply 混合与椭圆遮罩柔化边缘，保留花枝。

GPT 去背景的最终提示词（内置工具模式）：

> Use case: background-extraction. Edit target: the provided GPT girl illustration. Remove only the white background and floor shadow, produce a clean full-body cutout with real alpha transparency. Preserve the original character identity, face, mask, lavender eyes, white hair, horns, hair ornament, white lab coat, clipboard, name badge, legs, shoes and dragon tail exactly, retaining all original colors, proportions, pose and fine linework. Keep the full character within the frame, no cropping, no new text or objects, no redraw or restyling. This will be a small website illustration on a warm ivory background.
