# FFT：从圆盘折叠到 C 代码

- fft-handout.tex 是讲义正文和 TikZ 图。
- fft-style.tex 是独立导言，使用 Fandol 宋体、TeX Gyre Pagella 正文和数学字体，以及 Latin Modern Mono。
- fft.c 是讲义中的 C99 实现。递归入口需要互不重叠的输入和输出缓冲区。
- fft-check.c 是直接 DFT 对照、8 点地址跟踪、各层独立核对和逆变换测试。
- SOURCE-MAP.md 对照网页和讲义的公式、图例及代码。

在源码目录运行 Tectonic 编译两遍。

    tectonic --reruns 1 --keep-logs fft-handout.tex

使用安装了上述字体、ctex、TikZ、unicode-math 和 listings 的 XeLaTeX 时，连续运行两次。

    xelatex -halt-on-error fft-handout.tex
    xelatex -halt-on-error fft-handout.tex

编译并运行示例验证。

    cc -std=c99 -Wall -Wextra -Werror fft-check.c -lm -o fft-check
    ./fft-check

在线阅读器的页面图和可点击区域来自同一份 PDF。导出需要 Poppler、cwebp 和 Python 的 pypdf。由源码目录运行以下命令，同时更新 PDF、无损页面图、源码压缩包以及网页的链接坐标。

    python3 export-site.py fft-handout.pdf --repo-root /path/to/website

发布资产位于站点的 /assets/fft-handout/。
