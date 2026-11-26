# FFT：从圆盘折叠到 C 代码

- fft-handout.tex 是讲义正文和 TikZ 图。
- fft-style.tex 是独立导言，使用 ctexart 的 Fandol 字体。
- fft.c 是讲义中的 C99 实现。递归入口需要互不重叠的输入和输出缓冲区。
- fft-check.c 是直接 DFT 对照和逆变换测试。
- SOURCE-MAP.md 对照网页和讲义的公式、图例及代码。

在源码目录运行 Tectonic 编译两遍。

    tectonic --reruns 1 --keep-logs fft-handout.tex

使用安装了 ctex、TikZ 和 listings 的 XeLaTeX 时，连续运行两次。

    xelatex -halt-on-error fft-handout.tex
    xelatex -halt-on-error fft-handout.tex

编译并运行示例验证。

    cc -std=c99 -Wall -Wextra -Werror fft-check.c -lm -o fft-check
    ./fft-check

在线阅读器的页面图来自同一份 PDF。更新站点资产时，以 144 dpi 渲染各页，转成无损 WebP。PDF、页面图和源码压缩包位于站点的 /assets/fft-handout/。
