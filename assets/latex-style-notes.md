# LaTeX 讲义格式速记（复现本次版式）

可作为提示词/备忘录，粘贴到新文档或发给模型，快速套用同样的风格。

## 模板核心
- 文档类：`ctexart`，`11pt,a4paper`。
- 版面：`geometry[margin=1.7cm]`，两栏 `multicol`，`\columnsep=0.8cm`，`\parindent=2em`，`\parskip=0.3em`。
- 包：`amsmath, amssymb, amsthm, mathtools, bm, enumitem, hyperref, multicol, tcolorbox[most], tikz, microtype, titlesec, cleveref`。
- 颜色定义：
  ```tex
  \definecolor{accent}{RGB}{39,113,172}
  \definecolor{softback}{RGB}{246,249,253}
  \definecolor{softgray}{RGB}{110,120,135}
  ```
- 超链接：`colorlinks=true`，链接色 `accent!80!black`。
- 列表：`itemize` 左缩进 1.2em，`enumerate` 左缩进 1.4em，`itemsep=0.2em`。

## 标题样式
```tex
\titleformat{\section}{\large\bfseries\color{accent}}{\thesection}{0.6em}{}[\titlerule]
\titleformat{\subsection}{\normalsize\bfseries\color{accent!90}}{\thesubsection}{0.5em}{}
\titleformat{\subsubsection}{\normalsize\bfseries\color{accent!80}}{\thesubsubsection}{0.5em}{}
\titlespacing*{\section}{0pt}{0.8em}{0.45em}
\titlespacing*{\subsection}{0pt}{0.6em}{0.3em}
\titlespacing*{\subsubsection}{0pt}{0.5em}{0.2em}
```
标题示例：
```tex
\title{\bfseries\color{accent}{主标题} \\[3pt]
\large\color{softgray}{副标题}}
```

## 盒子体系（tcolorbox）
全局设置：
```tex
\tcbset{
  boxrule=0.55pt,
  arc=2pt,
  left=6pt,right=6pt,top=5pt,bottom=5pt,
  colframe=accent!25,
  colback=softback,
}
```
示例盒子：
```tex
\newtcolorbox{examplebox}[1]{
  enhanced,
  colback=accent!3,
  colframe=accent!28,
  colbacktitle=accent!10,
  coltitle=accent!90!black,
  fonttitle=\bfseries,
  borderline west={0.9pt}{0pt}{accent!45},
  title={#1},
  before skip=6pt,
  after skip=8pt,
}
```
引导思考盒子：
```tex
\newtcolorbox{ideabox}[1]{
  enhanced,
  colback=green!3,
  colframe=accent!20,
  colbacktitle=softgray!15,
  coltitle=accent!90!black,
  fonttitle=\bfseries,
  title={#1},
  boxed title style={
    sharp corners,
    boxrule=0pt,
    frame empty,
    interior style={fill=softgray!15},
    top=2pt,bottom=2pt,left=6pt,right=6pt,
  },
  borderline west={0.9pt}{0pt}{accent!35},
  before skip=6pt,
  after skip=8pt,
}
```
警告盒子：
```tex
\newtcolorbox{warningbox}[1]{
  enhanced,
  colback=red!3,
  colframe=red!25,
  colbacktitle=red!10,
  coltitle=red!70!black,
  fonttitle=\bfseries,
  borderline west={0.9pt}{0pt}{red!35},
  title={#1},
  before skip=6pt,
  after skip=8pt,
}
```
摘要盒子：
```tex
\newtcolorbox{abstractbox}{
  enhanced,
  colback=softback,
  colframe=accent!28,
  coltitle=accent!90!black,
  fonttitle=\bfseries,
  title=摘要,
  boxrule=0.55pt,
  arc=2pt,
  left=8pt,right=8pt,top=6pt,bottom=6pt,
  before skip=4pt,
  after skip=10pt,
}
```

## 宏与记号
```tex
\newcommand{\N}{\mathbb{N}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\Q}{\mathbb{Q}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\C}{\mathbb{C}}
\newcommand{\eps}{\varepsilon}
\newcommand{\id}{\mathrm{id}}
```

## 交叉引用与超链接
- 使用 `cleveref`，示例：`\Cref{thm:prime-powers}`。
- 含数学的标题用 `\texorpdfstring{...}{...}`，例如 `\subsection{应用 1：快速求和 \texorpdfstring{$\sum_{n\le N}\varphi(n)$}{Σ φ(n)}}`。

## 编译
- 推荐命令：`xelatex -interaction=nonstopmode -halt-on-error yourfile.tex`（需要 XeLaTeX 与 ctex 宏包环境）。

## 复用方式
1) 直接将以上“模板核心”、“标题样式”、“盒子体系”片段复制到新 TeX；  
2) 或把此文件作为提示词发给模型，让模型在新文档中套用同样设置；  
3) 需要单栏时删掉 `multicol` 环境即可，颜色/盒子配置仍可复用。 
