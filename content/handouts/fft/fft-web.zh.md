## overview

有限序列的离散傅里叶变换（DFT）可以写成一次矩阵乘法。基 2 FFT 利用矩阵里重复出现的单位根，把一次长变换拆成两次短变换，再用和、差重组结果。这里固定正变换的指数取负号，归一化系数 $1/N$ 放在逆变换。

用 4 点例子手算完整的频谱，用 8 点圆盘核对每次折叠和 C 数组地址。4 点输入与输出为
$$
 \begin{aligned}
 \boldsymbol{x}&=\begin{bmatrix}1&2&3&4\end{bmatrix}^{\mathsf{T}}\\
 \longmapsto\quad \boldsymbol{X}&=\begin{bmatrix}10&-2+2\mathrm{i}&-2&-2-2\mathrm{i}\end{bmatrix}^{\mathsf{T}}.
 \end{aligned}
$$
逆变换再把这四项频谱还原为 $[1,2,3,4]^{\mathsf{T}}$。圆盘上的折叠说明哪些数配在一起，复平面上的箭头说明乘单位根时数值怎样旋转。

### 符号和下标

| 符号 | 含义、形状与范围 |
| --- | --- |
| $N=2^L$ | 输入长度。基 2 递归要求 $L$ 为非负整数，单点变换包含在内。 |
| $\boldsymbol{x},\boldsymbol{X}\in\mathbb{C}^{N\times1}$ | 输入和输出均写成列向量。$x[n]$ 是采样，$X[k]$ 是复数频谱。 |
| $n,k$ | 原采样下标和最终频点下标。都从 $0$ 到 $N-1$。 |
| $W_M=\mathrm{e}^{-2\pi\mathrm{i}/M}$ | 长度为 $M$ 时使用的单位根，$\mathrm{i}^2=-1$。 |
| $s,d,m$ | 折完 $s$ 次后的站点数 $d=N/2^s$ 与每站项数 $m=2^s$。 |
| $B_s\in\mathbb{C}^{d\times m}$ | 第 $s$ 层的状态矩阵。行 $j$ 对应站点，列 $q$ 对应该站的局部频点。 |
| $F_M\in\mathbb{C}^{M\times M}$ | DFT 矩阵。行是频点，列是输入下标，不含归一化。 |

## dft

长度为 $N$ 的序列 $x[0],\ldots,x[N-1]$ 的正向 DFT 定义为

{{equation:dft:1}}
$$
\begin{aligned}
 W_N&=\mathrm{e}^{-2\pi\mathrm{i}/N},\\
 X[k]&=\sum_{n=0}^{N-1}x[n]\,W_N^{kn},\quad 0\le k<N.
\end{aligned}
$$

对固定的 $k$，指数 $kn$ 随原采样下标 $n$ 变化。先把每个样本乘上该位置的复指数，再对 $n$ 求和，得到一个复数。$k=0$ 时所有因子均为 $1$，所以 $X[0]$ 是采样总和。

把第 $k$ 个求和写为矩阵的第 $k$ 行，即

{{equation:dft-matrix:2}}
$$
\begin{aligned}
 (F_N)_{k,n}&=W_N^{kn},\quad \boldsymbol{X}=F_N\boldsymbol{x},\\
 F_N&:\mathbb{C}^{N\times1}\longrightarrow\mathbb{C}^{N\times1}.
\end{aligned}
$$

### 为什么能反过来求出输入

取整数 $r$。当 $r$ 为 $N$ 的倍数时，$W_N^r=1$，下面的和等于 $N$。其余情形令 $a=W_N^r\neq1$，把几何级数乘以 $(1-a)$，得到
$$
 (1-a)\sum_{k=0}^{N-1}a^k=1-a^N
   =1-\mathrm{e}^{-2\pi\mathrm{i} r}=0.
$$
于是

{{equation:rootsum:3}}
$$
\sum_{k=0}^{N-1}W_N^{kr}
 =
 \begin{cases}
  N, & r\equiv0\pmod N,\\
  0, & r\not\equiv0\pmod N.
 \end{cases}
$$

把式 [(1)](#fft-eq-dft) 代入逆变换。交换有限和的次序得到

{{equation:idft:4}}
$$
\begin{aligned}
 \frac{1}{N}\sum_{k=0}^{N-1} X[k]\,W_N^{-kn}
 &=\frac{1}{N}\sum_{r=0}^{N-1}x[r]
      \sum_{k=0}^{N-1}W_N^{k(r-n)} \\
 &=\frac{1}{N}x[n]\cdot N
 =x[n].
\end{aligned}
$$

第二行只留下 $r=n$，因为 $r,n$ 都处在 $0,\ldots,N-1$，其中 $r-n$ 只有为零才可能整除 $N$。矩阵形式是 $F_N^{\mathrm H}F_N=NI$，其中上标 $\mathrm H$ 是共轭转置。由此还可以检查程序的符号与归一化位置。

> 正向程序使用负指数并直接返回 $\boldsymbol{X}$。逆变换使用正指数，在所有频点都累加完后除以 $N$。若把正向代码的指数改成正号，算出的频点顺序及虚部会随之改变。

## butterfly

设这一轮的长度是 $N=2m$。把偶下标样本 $x[2r]$ 和奇下标样本 $x[2r+1]$ 分开，各做一次 $m$ 点 DFT。对 $0\le q<m$，记

{{equation:even-odd:5}}
$$
\begin{aligned}
 E[q]&=\sum_{r=0}^{m-1}x[2r]\,W_m^{qr},\\
 O[q]&=\sum_{r=0}^{m-1}x[2r+1]\,W_m^{qr}.
\end{aligned}
$$

由 $W_{2m}^2=W_m$，可以把原和式改写为

{{equation:split:6}}
$$
\begin{aligned}
 X[k]
 &=\sum_{r=0}^{m-1}x[2r]W_{2m}^{2kr}
   +\sum_{r=0}^{m-1}x[2r+1]W_{2m}^{k(2r+1)} \\
 &=\sum_{r=0}^{m-1}x[2r]W_m^{kr}
   +\underbrace{W_{2m}^{k}}_{\text{奇项提出}}
          \sum_{r=0}^{m-1}x[2r+1]W_m^{kr} \\
 &=E[q]+W_{2m}^{k}O[q],\qquad q=k\bmod m .
\end{aligned}
$$

最后一步用到 $W_m^m=1$。对于 $k=q$ 和 $k=q+m$，两个短变换都查第 $q$ 项。外面的因子相差 $W_{2m}^m=\mathrm{e}^{-\pi\mathrm{i}}=-1$。

### 两个输出共用一次乘法

令 $a=E[q]$、$b=O[q]$、$W=W_{2m}^q$。先算一次 $t=Wb$，随后作一次加法和一次减法。

{{equation:butterfly:7}}
$$
\begin{bmatrix}X[q]\\X[q+m]\end{bmatrix}
 =\begin{bmatrix}1&W\\1&-W\end{bmatrix}
  \begin{bmatrix}a\\b\end{bmatrix}
 =\begin{bmatrix}a+t\\a-t\end{bmatrix}.
$$

{{figure:butterfly}}

单位根的模为 $1$，乘 $W$ 只改变 $b$ 在复平面上的方向，转角是 $-2\pi q/(2m)$。程序需保留旧的 $a$ 和 $t$，才能把两个结果写回同一对位置。

## disk

把 8 个采样按 $0,1,\ldots,7$ 顺时针排到圆周。第 1 折把相隔半圈的 $j$ 和 $j+4$ 配起来，形成四个站点。每个站点对应一组长度为 2 的序列，先交给一个 2 点蝶形。

{{figure:disk}}

### 每个站点存什么

长度为 2 时 $m=1$、$q=0$，因子 $W_2^0=1$。因此第一折直接把两项的和、差写进站点。以 $j=1$ 为例，该站先接收 $x[1]$ 与 $x[5]$，再输出 $x[1]+x[5]$ 与 $x[1]-x[5]$。

| 新站点 $j$ | 旧站点配对 | $B_1[j,0]$ | $B_1[j,1]$ |
| --- | --- | --- | --- |
| 0 | $(0,4)$ | $x[0]+x[4]$ | $x[0]-x[4]$ |
| 1 | $(1,5)$ | $x[1]+x[5]$ | $x[1]-x[5]$ |
| 2 | $(2,6)$ | $x[2]+x[6]$ | $x[2]-x[6]$ |
| 3 | $(3,7)$ | $x[3]+x[7]$ | $x[3]-x[7]$ |

第 2 折时站点只剩 $0,1,2,3$，配对改为 $(0,2)$ 与 $(1,3)$。每对包含两个局部频点 $q=0,1$，分别做蝶形，把两份 2 点结果合成一份 4 点结果。第 3 折把最后两站合并，得到完整 8 点频谱。

> 第一折在整圆上移动半圈。接下来的每折只移动当前扇面的后一半，移动的角度分别减半。复平面上乘 $W_{2m}^{q}$ 负责旋转系数，其角度由 $q$ 决定。单位根乘的是朱砂标出的一侧，即 $b$。第 1 折的唯一局部频点是 $q=0$，它的数值旋转为零度。[下一张对照表](#fft-trace)列出三次配对及其数组地址。

## layers

设总长度 $N=2^L$。折完 $s$ 次后，令 $m=2^s$、$d=N/m$。站点 $j$ 跟踪从 $x[j]$ 开始、每隔 $d$ 取一次的 $m$ 项子序列。状态矩阵的定义是

{{equation:layer:8}}
$$
\begin{gathered}
 B_s[j,q]=\sum_{r=0}^{m-1}x[j+rd]\,W_m^{qr},\\
 0\le j<d,\quad 0\le q<m.
\end{gathered}
$$

每一行是一份独立的 $m$ 点 DFT，行与列的含义不同。行号 $j$ 决定从哪里取原采样，列号 $q$ 决定读哪个局部频点。

### 从第 $s$ 层推出第 $s+1$ 层

在 $s<L$ 时令 $d'=d/2$，新序列 $y_j[t]=x[j+td']$ 有 $2m$ 项。在任取的新站点 $0\le j<d'$，
$$
 \begin{aligned}
 y_j[2r]   &= x[j+rd],     &&\text{来自旧站 }j;\\
 y_j[2r+1] &= x[j+d'+rd],  &&\text{来自旧站 }j+d'.
 \end{aligned}
$$
这两个序列各有 $m$ 项。按式 [(8)](#fft-eq-layer)，它们的局部频点恰为 $a=B_s[j,q]$ 与 $b=B_s[j+d',q]$。把这两个数代入式 [(7)](#fft-eq-butterfly)。

{{equation:layer-first,layer-second:9–10}}
$$
\begin{aligned}
 t&=W_{2m}^{q} B_s[j+d',q],\\
 B_{s+1}[j,q]&=B_s[j,q]+t, \\
 B_{s+1}[j,q+m]&=B_s[j,q]-t.
\end{aligned}
$$

每组结果的前半段按 $q$ 存放，后半段按 $q+m$ 存放。每次折叠后行数减半，列数翻倍，数据总量仍为 $N$。

{{figure:shape}}

当 $s=0$ 时 $m=1,d=N$，式 [(8)](#fft-eq-layer) 直接给出 $B_0[j,0]=x[j]$。当 $s=L$ 时 $d=1,m=N$，代入 $j=0$ 得 $B_L[0,k]=X[k]$，其转置就是输出列向量 $\boldsymbol{X}$。因此只要每一折满足式 [(9)](#fft-eq-layer-first) 与 [(10)](#fft-eq-layer-second)，最终结果就与定义式 [(1)](#fft-eq-dft) 相同。

## trace

固定原盘上的角位置 $\theta_j=90^\circ-45^\circ j$。折完 $s$ 次后，仍使用原盘上的前 $d$ 个位置。将旧站 $j+d/2$ 移到 $j$，角位置增加 $45^\circ d/2$。这三个角只描述扇面怎样合上，数值里的转角由 $W_{2m}^q$ 决定。

{{figure:folds}}

表按 C 迭代代码[第 63 行](#fft-code-l63)的 `start` 顺序列出。同一格的第一个配对对应第一个起点，以此类推。递归中的父调用在两份子变换完成后合并，它读的也是同一对站点的同一列。

| 折数 | 旧站点配对，按 `start` 排 | `len` | `start` |
| --- | --- | --- | --- |
| 1 | $(0,4),(2,6),(1,5),(3,7)$，各取 $q=0$ | 2 | $0,2,4,6$ |
| 2 | $(0,2),(1,3)$，各取 $q=0,1$ | 4 | $0,4$ |
| 3 | $(0,1)$，取 $q=0,1,2,3$ | 8 | $0$ |

### 沿着同一个频点检查三次写回

取 $x[n]=n+1$。先看第 1 折中站点 $0$ 和 $2$ 的差项，再沿 $q=1$ 跟到终点。

1. 第 1 折，$(0,4)$ 从 $1,5$ 得 $(6,-4)$，写 `a[0..1]`。$(2,6)$ 从 $3,7$ 得 $(10,-4)$，写 `a[2..3]`。
2. 第 2 折，`len=4, start=0, q=1`。[第 65 行](#fft-code-l65)算出 $(u,v)=(1,3)$，读到两个 $-4$。[第 67 行](#fft-code-l67)给 $t=(-\mathrm{i})(-4)=4\mathrm{i}$，[第 68](#fft-code-l68)–[69 行](#fft-code-l69)把 $-4+4\mathrm{i},-4-4\mathrm{i}$ 写回。对奇组做同一列的运算，也得到 $B_2[1,1]=-4+4\mathrm{i}$。
3. 第 3 折，`len=8, start=0, q=1`。$(u,v)=(1,5)$，此时两个旧值都是 $-4+4\mathrm{i}$。转后 $t=\frac{1-\mathrm{i}}{\sqrt2}(-4+4\mathrm{i})=4\sqrt2\,\mathrm{i}$。写回的频点是

   $$
   \begin{aligned}
   X[1]&=-4+4(1+\sqrt2)\mathrm{i},\\
   X[5]&=-4+4(1-\sqrt2)\mathrm{i}.
   \end{aligned}
   $$

递归版的对应行是[第 25](#fft-code-l25)–[31 行](#fft-code-l31)。访存顺序的理由见 [位反转与数组中的站点](#fft-bit-reversal)。

## worked

输入是 $(x[0],x[1],x[2],x[3])=(1,2,3,4)$。第 1 折对偶、奇两组分别取和与差。
$$
\begin{aligned}
 E&=\begin{bmatrix}1+3\\1-3\end{bmatrix}
   =\begin{bmatrix}4\\-2\end{bmatrix},\\[4pt]
 O&=\begin{bmatrix}2+4\\2-4\end{bmatrix}
   =\begin{bmatrix}6\\-2\end{bmatrix},\\[4pt]
 B_1&=\begin{bmatrix}4&-2\\6&-2\end{bmatrix}.
\end{aligned}
$$
$E,O$ 上面写为两个列向量，放进中间矩阵时分别转置为一行。第 2 折每次沿竖直方向取同一列的两个数。

| 列 $q$ | 所取的一对 $(E[q],O[q])$ | $W=W_4^q$ | 写入输出 |
| --- | --- | --- | --- |
| $0$ | $(4,6)$ | $1$ | $X[0]=4+6=10$，$X[2]=4-6=-2$。 |
| $1$ | $(-2,-2)$ | $\mathrm{e}^{-\pi\mathrm{i}/2}=-\mathrm{i}$ | 先得 $t=(-\mathrm{i})(-2)=2\mathrm{i}$，再把 $-2+2\mathrm{i}$ 写入 $X[1]$，把 $-2-2\mathrm{i}$ 写入 $X[3]$。 |

{{figure:rotation}}

两列的计算分别写入下标 $(0,2)$ 和 $(1,3)$，最终输出按 $k=0,1,2,3$ 排列。
$$
 B_2=\begin{bmatrix}10&-2+2\mathrm{i}&-2&-2-2\mathrm{i}\end{bmatrix},
 \qquad
 \boldsymbol{X}=B_2^{\mathsf{T}}.
$$

> 先核对 $X[0]=1+2+3+4=10$。实输入的 $X[1]$ 与 $X[3]$ 互为共轭。若它们的虚部互换，先查正向指数的符号。

## matrix

对长度 $2m$，令置换矩阵 $P$ 把自然顺序的输入重排为前半偶项、后半奇项。设
$$
 D_m=\operatorname{diag}(W_{2m}^{0},W_{2m}^{1},\ldots,W_{2m}^{m-1})
       \in \mathbb{C}^{m\times m}.
$$
用分块对角矩阵分别计算两份 $m$ 点 DFT，再以式 [(7)](#fft-eq-butterfly) 做两份向量的加减。于是

{{equation:matrix-factor:11}}
$$
F_{2m}=
 \underbrace{\begin{bmatrix}I_m&D_m\\I_m&-D_m\end{bmatrix}}_{M_{2m}}
 \begin{bmatrix}F_m&0\\0&F_m\end{bmatrix} P.
$$

按从右到左的顺序，$P$ 配对，分块对角矩阵产生 $E,O$，$M_{2m}$ 将它们合并成自然频点顺序的 $X$。对角矩阵 $D_m$ 逐项乘奇组，对每个 $q$ 只访问同一个局部下标。

### 把 4 点例子中的矩阵写开

此时 $W_4=-\mathrm{i}$，$m=2$，$D_2=\operatorname{diag}(1,-\mathrm{i})$，所以
$$
\begin{aligned}
 P_4 &=\begin{bmatrix}
 1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1
 \end{bmatrix},\quad
 F_2=\begin{bmatrix}1&1\\1&-1\end{bmatrix},\\[5pt]
 M_4 &=\begin{bmatrix}
 1&0&1&0\\0&1&0&-\mathrm{i}\\1&0&-1&0\\0&1&0&\mathrm{i}
 \end{bmatrix}.
\end{aligned}
$$
实际的乘法顺序和两折对应如下。4 点例子中 $v_1$ 依次连接 $B_1$ 的两行。更长输入的数组块顺序见 [位反转](#fft-bit-reversal)。
$$
\begin{aligned}
 v_0&=P_4\boldsymbol{x}=[1,3,2,4]^{\mathsf{T}},\\
 v_1&=\operatorname{diag}(F_2,F_2)v_0=[4,-2,6,-2]^{\mathsf{T}},\\
 \boldsymbol{X}&=M_4v_1=[10,-2+2\mathrm{i},-2,-2-2\mathrm{i}]^{\mathsf{T}}.
\end{aligned}
$$
也可以直接乘完整的 DFT 矩阵验算。
$$
 F_4=
 \begin{bmatrix}
 1&1&1&1\\
 1&-\mathrm{i}&-1&\mathrm{i}\\
 1&-1&1&-1\\
 1&\mathrm{i}&-1&-\mathrm{i}
 \end{bmatrix},
 \qquad
 F_4\boldsymbol{x}=
 \begin{bmatrix}10\\-2+2\mathrm{i}\\-2\\-2-2\mathrm{i}\end{bmatrix}.
$$
例如取下标为 $k=1$ 的行，得到 $1-2\mathrm{i}-3+4\mathrm{i}=-2+2\mathrm{i}$，正是第 2 折中 $q=1$ 的加法结果。

## recursive

下面的 C99 写法可以直接编译。输入指针 `x` 指向当前子序列首项，`stride` 表示相邻两项的间隔。调用者提供长度为 $N$、互不重叠的输入和输出缓冲区。入口从自然顺序读取，最外层取 `stride = 1`。输出也是自然顺序。代码共用 `<complex.h>` 和 `<stddef.h>`，`I` 在代码中是虚数单位。

{{code:16-42}}

### 一份返回值就是一行

深度到达 $L-s$ 时，一个调用的输入地址相对根指针为 `x + j`，步长为 $d=N/2^s$，长度为 $m=2^s$。它读 $x[j+rd]$，返回的第 $q$ 项就是式 [(8)](#fft-eq-layer) 的 $B_s[j,q]$。若要向上合并，从父调用看，两个子调用的首地址相差父步长 $d/2$，正是圆盘配对 $j$ 与 $j+d/2$。

| 第 25–31 行 | 对上公式的动作 |
| --- | --- |
| 两次递归调用 | 前 $m$ 格接收偶子序列的结果，后 $m$ 格接收奇子序列的结果。 |
| 算 `t` | 当前长度为 `n`，转角由 $W_{\mathtt{n}}^q$ 决定。 |
| 写 `out[q]` 与 `out[q + m]` | 对应式 [(7)](#fft-eq-butterfly) 的和与差。 |

> 以 8 点为例，根调用先处理偶支路。它的叶子按 $x[0],x[4],x[2],x[6]$ 的顺序读取。第 1 折对应最深的非叶调用，长度为 2。根调用重组偶、奇两半，对应最后一折。这条偶支路先得到站 $0$ 的 $(x[0],x[4])$，再得到站 $2$ 的 $(x[2],x[6])$，两站随即合并。之后才进入奇支路。$B_s$ 是按子问题长度整理的逻辑快照。递归按深度优先执行。父调用在同一块 `out` 缓冲区里写回，因此一些子结果会在其他支路返回之前被覆盖。

## bit-reversal

递归从最低有效位开始决定奇、偶，依次检查更高位。把叶子按递归访问顺序连起来，相当于反转每个下标的 $L$ 个二进制位。8 点的原采样进入数组的顺序是
$$
   0,\ 4,\ 2,\ 6,\ 1,\ 5,\ 3,\ 7.
$$
设第 $s$ 层每站有 $m=2^s$ 项，剩 $d=N/m$ 站。记 $R_h$ 为反转 $h=\log_2d$ 位。迭代数组中第 $b$ 个连续块对应圆盘站点 $j=R_h(b)$，所以

{{equation:block-address:12}}
$$
a[bm+q]=B_s[R_h(b),q].
$$

当 $s=0$，这就是位反转之后的输入。当 $s=L$，只有第 $0$ 个块，输出回到自然频点顺序。对于待合成的第 $b'$ 个新块，旧块编号是 $2b'$ 和 $2b'+1$。反转后，两个站点分别为
$$
 R_h(2b')=R_{h-1}(b'),\qquad
 R_h(2b'+1)=R_{h-1}(b')+d/2.
$$
因为末位的 $0$ 或 $1$ 被翻到最高位，写回顺序正好符合圆盘配对。$h=1$ 时约定 $R_0(0)=0$。这也解释了为什么 [8 点对照表](#fft-trace)的第一折按 $0,2,1,3$ 访问新站点。

{{code:1-14}}

{{code:44-58}}

## iterative

[第 78 行](#fft-code-l78)只做一次位反转。之后，`len` 取 $2,4,\ldots,N$，每轮把上一层的相邻两块合成一块。`start` 每次跨一个完整的输出块。

{{code:60-86}}

### 用地址确认同一只蝶形

用 $j=R_{\log_2(N/\mathtt{len})}(b')$、$\mathtt{start}=b'\mathtt{len}$ 标记本轮的块。在[第 65 行](#fft-code-l65)确定地址，[第 66](#fft-code-l66)–[67 行](#fft-code-l67)读取这两项
$$
 \begin{aligned}
  a[\mathtt{start}+q]&=B_s[j,q],\\
  a[\mathtt{start}+q+m]&=B_s[j+d/2,q].
 \end{aligned}
$$
对[第 67 行](#fft-code-l67)，`root_power(len, q)` 等于 $W_{2m}^q$。[第 68](#fft-code-l68)–[69 行](#fft-code-l69)写同一对位置，相当于更新 $B_{s+1}$ 的 $q,q+m$ 两列。这样，源数组里的块、图上的两站、式 [(9)](#fft-eq-layer-first) 和 [(10)](#fft-eq-layer-second) 都指向同一对数。4 点时，第一轮把 $[1,3,2,4]$ 改为 $[4,-2,6,-2]$，第二轮原地写出四个 $X[k]$。

## verify

### 运算量与空间

同一层的 $d$ 个站点分成 $d/2$ 对。每对有 $m$ 个局部频点，每个频点一次蝶形，因此每层有 $(d/2)m=N/2$ 只蝶形。每只蝶形至多一次复乘、两次复加减，共 $\log_2N$ 层。
$$
\begin{aligned}
 \#\text{蝶形} &=\frac{N}{2}\log_2 N,\\
 T(N)&=2T(N/2)+\Theta(N)\\
     &=\Theta(N\log N).
\end{aligned}
$$
4 点用 4 只蝶形，32 点用 80 只蝶形。直接 DFT 对每个频点逐项累加，总代价是 $\Theta(N^2)$。递归版除了输入输出缓冲区，还用 $\Theta(\log N)$ 层调用栈。迭代版的数组原地更新，只另用常数个临时量。迭代位反转里的进位会翻转若干位，所有下标合计只翻转 $O(N)$ 次，因为从最高位向下以 $0$ 编号，第 $j$ 位每 $2^j$ 步翻转一次。

### 复用正向程序来做逆变换

对式 [(4)](#fft-eq-idft) 取共轭，可以把正指数换回负指数。数组先共轭，做正向 FFT，结果再共轭并除以 $N$。
$$
 \operatorname{IFFT}(\boldsymbol{X})=
 \frac{1}{N}\,\overline{\operatorname{FFT}(\overline{\boldsymbol{X}})}.
$$
源码中的 `ifft_inplace` 执行这个过程。

{{code:88-98}}

源码包内的测试独立地按 DFT 定义求和，并核对 4 点例题、8 点逐折表，以及长度 $1$ 到 $256$ 的 108 组复数输入。测试还按式 [(12)](#fft-eq-block-address) 比对两种程序的每一层，并核对正反变换往返。

### 自己再检查三处

1. 从 $W_{2m}^{q+m}=-W_{2m}^{q}$ 推出蝶形的减号，指出代码里哪两行使用同一个 $t$。
2. 把 8 点的第一次折叠写成 4 行 2 列。然后只追踪新站 $j=0$，写出第 2 折选取的四个原采样下标。核对点是 $0,2,4,6$。
3. 输入常量序列 $[1,1,1,1]$，先手算再试代码。预期只在 $k=0$ 读到 $4$，其他项为零。

### 符号约定与延伸阅读

实序列有共轭对称性。网页上的单边幅度谱会对 $|X[k]|/N$ 做归一化，对 $0<k<N/2$ 的项再乘 $2$。它与讲义和代码返回的复数频谱 $X[k]$ 使用不同标度。

[数学实验室 · FFT 折叠实验](#fft-experiment) 提供相同的 4 点跟算和 32 点圆盘。

J. W. Cooley and J. W. Tukey,
[An Algorithm for the Machine Calculation of Complex Fourier Series](https://doi.org/10.1090/S0025-5718-1965-0178586-1),
*Mathematics of Computation* 19 (1965), 297–301。本讲义采用负指数的正向 DFT 约定。
