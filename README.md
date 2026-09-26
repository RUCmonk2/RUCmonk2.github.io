# 叶耀之的个人主页

当前站点由 Next.js 静态导出，GitHub Pages **只发布 `out/` 构建产物**。维护时先确认文件属于当前源代码，避免改到旧站副本。

## 当前维护入口

| 内容                           | 唯一维护位置                                     |
| ------------------------------ | ------------------------------------------------ |
| 页面与布局                     | `src/app/`、`src/components/`                    |
| 全站名称与导航翻译             | `src/i18n/messages/{zh,en}/common.json`          |
| 学习目录、标题、精选、更新时间 | `src/data/learning/catalog.ts`                   |
| 课程正文与交互内容             | `src/data/learning/`、`src/components/learning/` |
| 程序设计讲次与代码清单         | `src/data/teaching/programming-2026.ts`          |
| 写作文章                       | `content/blog/{zh,en}/*.mdx`                     |
| 当前静态指南、附件与下载文件   | `public/`，其中指南为 `public/assets/`           |
| 发布流程                       | `.github/workflows/deploy-pages.yml`             |

栏目固定为“关于 / 学习 / 写作 / 友链”。“课程学习、实践指南”是学习下的分类；“教程、伴读、速查”只是内容形式，不再建立平行总入口。旧网址保持兼容，不为改显示名称而迁移地址。

详细规则见 [学习目录维护](docs/learning-catalog.md) 和 [内容与发布维护](docs/site-maintenance.md)。

## 本地检查

使用与 CI 一致的 Node.js 22，安装依赖后运行：

```sh
npm ci
npm run lint
npm run test:content
npm run build
npm run check:export
npm run preview
```

`preview` 读取构建产物；修改源码后须重新构建。开发期间可用 `npm run dev`。推送 `main` 会触发部署，只有检查和构建全部成功后才上传 `out/`。

## 历史文件边界

根目录的 `index.html`、`blog.html`、`styles.css`、`assets/`、`sitemap.xml`、`robots.txt`、`CNAME` 是旧静态站留档，不是当前发布源。保留它们用于查阅，**不要在两套目录同步维护**。对外静态资源只改 `public/`；站点地图、robots 与页面由当前 Next.js 源代码生成。

不要手改生成目录 `out/` 或 `.next/`，也不要把整个仓库复制到 `public/`。`public/` 中所有文件都会公开；草稿状态只能控制网站输出，不能隐藏公开 Git 仓库或历史提交里的内容。私密草稿、未授权课件、密钥与内部交接资料不得放进公开仓库。
