# 必修三第九、十章期中复习

专题地址 `/learning/k12/subjects/physics/midterm/`，中文与英文界面共用中文教学内容。入口在物理学科目录与公式推导专题；独立页不增加原全科学段统计中的主题数。

- 页面：`src/app/[locale]/learning/k12/subjects/[subject]/midterm/page.tsx`。
- 同编号题目：`src/data/physics-midterm/questions.json`。诊断 D1–D5，例题 L1–L4 与变式 V1–V4，独立检测 E1–E3。题干与解析支持 Markdown / LaTeX；题干必须能在不查看解析和额外图片时独立理解。
- 路线与元数据：`src/data/physics-midterm/index.ts`。
- 交互模型：`src/data/physics-midterm/models.ts`，UI 在 `src/components/physics/midterm-experiments.tsx`。
- 下载附件：`public/assets/physics/midterm-ch9-10-teacher.pdf`、`public/assets/physics/midterm-ch9-10-student.pdf`。PDF 与网页题号保持一致；附件为独立编写内容，不包含学生身份与原试卷扫描。

## 交互条件

电容器比较同一初始状态下不同板距的静电平衡状态。选择接理想电源时固定初始 U；选择断电时固定初始 Q；切换接线会复位板距。介质与面积不变，忽略漏电和边缘效应。图中场线密度只作趋势示意，不表示充放电瞬态。

偏转演示使用固定极板几何和固定电荷量质量比，q 可切换符号，U 为上板电势减下板电势，竖直向上为正。轨迹到首次碰板即停止；出口位移只在可从右侧射出时显示。初始竖直速度为零，忽略重力与边缘效应。默认参数对应 L4（L = 0.20 m，d = 0.10 m，|q|/m = 5 × 10⁷ C/kg，U = −10 V，v₀ = 10⁵ m/s），向上偏移 1 cm；横纵绘图尺度不同。

## 验证

Node.js 22 下运行 `npm run test:physics-midterm`，检查题号、KaTeX、定 U/Q 不变量、符号反转、速度缩放与碰板边界。随后执行站点 lint、构建、导出链接检查。桌面和手机需人工检查：下载入口、答案折叠、范围滑杆和碰板提示。
