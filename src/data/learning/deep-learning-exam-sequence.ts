import type { StudyFigure, StudySet } from "./exam-types";
import type { CourseChapter } from "./types";

const figure = (name: string, alt: string, caption: string): StudyFigure => ({
  src: `/images/deep-learning/exam/${name}.svg`,
  alt,
  caption,
});
const sliding = figure(
  "conv-window",
  "二维互相关示意：同一个2乘2卷积核在3乘3输入上向右和向下滑动；每个窗口逐元素乘积求和，输出2乘2。",
  "据 W5 第19–28、34页重绘：局部窗口和同一组共享权重；采用不翻核的互相关。点击放大。 ",
);
const channels = figure(
  "conv-channels",
  "多通道卷积：一个输出通道分别在全部输入通道上卷积后求和；多组卷积核得到多个输出通道。",
  "据 W5 第41–45页及 W6 第28页重绘；1×1卷积也沿全部输入通道混合。 ",
);
const pooling = figure(
  "pooling",
  "最大池化与平均池化示意：同一个窗口分别取最大值或算术平均；输出通道不变。",
  "据 W5 第50–51页重绘。图中输出保留为运算符，先自己计算。 ",
);
const inception = figure(
  "inception",
  "Inception四分支：1乘1卷积、1乘1降维后3乘3卷积、1乘1降维后5乘5卷积、池化后1乘1卷积；在相同高宽下沿通道拼接。",
  "据 W6 第26–29页重绘；分支保持相同空间尺寸，拼接增加通道。 ",
);
const residual = figure(
  "residual",
  "残差块：输入x同时经过F分支和恒等捷径，在加号处按元素相加得到x加F(x)；形状不同时捷径需投影。",
  "据 W6 第36–41页重绘。此图表示加法后尚未施加激活的残差映射。 ",
);
const unroll = figure(
  "rnn-unroll",
  "RNN沿三个时间步展开，输入x1、x2、x3分别进入状态h1、h2、h3，状态从左向右传递，每个状态连接自己的输出和损失；各步共享W、U、V。",
  "据 W7 第16–18、28–30页重绘。损失既可逐步计算，也可只在末端计算。 ",
);
const lstm = figure(
  "lstm-cell",
  "LSTM记忆路径：旧记忆乘遗忘门，与候选记忆乘输入门相加，得到新记忆；新记忆经过tanh再乘输出门得到隐藏状态。三个门及候选由当前输入和旧隐藏状态计算。",
  "据 W7 第44–53页重绘；标准无peephole单元，记忆c与隐藏h分开。 ",
);
const gru = figure(
  "gru-cell",
  "GRU两条混合路径：旧状态乘1减z，候选状态乘z后相加。候选由当前输入和经过重置门r筛选的旧状态计算。",
  "据 W7 第68–69页重绘；本页z越大写入新候选越多，重置门在循环矩阵乘法之前。 ",
);

export const sequenceChapters: CourseChapter[] = [
  {
    id: "convolution",
    title: "卷积与池化：从窗口算到整层",
    group: "五 · 第五、六周：CNN",
    lead: "先算一个窗口，再检查输出形状、通道和参数量。把数学卷积与实际互相关的约定分清楚。",
    body: String.raw`## 先约定怎样读张量

本节省略批次轴，图像写作 $C\times H\times W$。卷积默认指**不翻转卷积核的互相关**，步长与填充由题目指定，普通非分组卷积、无膨胀。数学卷积翻转核的定义仍需认识，但手算不能混用两套下标。

卷积结合局部连接与权值共享：一个输出只读局部窗口，同一核跨位置重复使用。它在适当边界条件下具有平移等变性；输出随输入移动，不等于输出完全不变，也不天然保证旋转或尺度不变。

| 符号 | 意义 |
| --- | --- |
| $C_{\rm in},C_{\rm out}$ | 输入、输出通道 |
| $k_h,k_w$ | 核的高、宽 |
| $s_h,s_w$ | 步长 |
| $p_h,p_w$ | 两侧对称零填充 |

先看下面的公式和图，再独立做尺寸题与窗口手算。`,
    checks: [],
    source:
      "W5 第7–56页；W6 第3–8页。依课程勘误区分互相关、等变/不变与池化约定；新增手算题明确标为复习例题。",
  },
  {
    id: "cnn-architectures",
    title: "典型 CNN：降维、分支与残差",
    group: "五 · 第五、六周：CNN",
    lead: "比较结构如何改变特征、参数量和梯度通路，不靠死记一个网络的参数总数。",
    body: String.raw`## 按结构记住网络

| 网络 | 识别结构与应会解释的事 |
| --- | --- |
| LeNet | 卷积与下采样交替，后接分类；按题目给定连接方式算尺寸与参数 |
| AlexNet | ReLU、Dropout、数据增强；Dropout在训练时随机丢弃部分单元，常规评估时停用 |
| VGG | 堆叠小卷积核；比较感受野、参数量与中间非线性 |
| GoogLeNet | Inception并行分支；$1\times1$先混合、压缩通道 |
| ResNet | 捷径与残差分支按元素相加；有额外梯度路径 |
| DenseNet | 前层特征按通道拼接，复用特征；拼接不等于相加 |

BN在课件残差单元中出现，可以理解为对特征进行归一化再学习缩放和平移；本次不扩展为完整BN/LN比较推导。

## 任务看输出

分类给整幅图一个类别；检测给目标框和类别；语义分割给每个像素一个类别；实例分割还区分同类的不同目标。识别这些输出差别即可，不把检测系统的完整实现加入今天必做路线。`,
    checks: [],
    source:
      "W5 第57–91页；W6 第10–53页，W7 第3–8页回顾；往年题第8、10、16题。1×1压缩/扩展方向沿用课程勘误。",
  },
  {
    id: "rnn",
    title: "RNN：时间展开与共享参数",
    group: "六 · 第七周：循环网络",
    lead: "看清每个时刻读入什么、保留什么、在哪里输出。展开的是计算次数，参数依然共享。",
    body: String.raw`## 一个单元重复使用

本节使用列向量：$x_t\in\mathbb R^d$，$h_t\in\mathbb R^h$，$o_t\in\mathbb R^C$。$W$读当前输入，$U$读上一隐藏状态，$V$把新隐藏状态变成输出。标准模型的输出头读取 $h_t$；若题目另给计算图，必须依题目重新追踪。

序列分类可以只在末端输出；逐位置标注可以每步输出；编码器与解码器可处理输入输出长度不同的任务。双向RNN将正向、反向读取的表示组合，适合能获得完整输入序列的情形；实时因果预测不能无条件使用未来输入。堆叠RNN还有层方向的传递。

| 符号 | 形状 |
| --- | --- |
| $W$ | $h\times d$ |
| $U$ | $h\times h$ |
| $V$ | $C\times h$ |
| $b,c$ | $h\times1,\ C\times1$ |

画图时给每个时刻的状态加下标，给共享权重保留同一个符号。`,
    checks: [],
    source:
      "W7 第10–24、73–87页；课程第14节讲义。下方小数例题是辅助练习，不是原卷题目。",
  },
  {
    id: "bptt",
    title: "BPTT：沿时间反传，再累加",
    group: "六 · 第七周：循环网络",
    lead: "每个状态同时收到当前输出和未来状态的梯度。共享参数的梯度要把各次使用的贡献相加。",
    body: String.raw`## 先写清损失在哪里

设 $L=\sum_{t=1}^{T}\alpha_t\ell_t$。逐时刻求和取 $\alpha_t=1$；时间平均取 $\alpha_t=1/T$；只用末端损失时，只有 $\alpha_T=1$。先明确这一点，再写反向递推。

数值梯度裁剪限制已经算出的梯度范数；截断BPTT切断较远的时间路径。两者改变的对象不同。W7第31页按阈值描述的“梯度截断”对应数值裁剪。裁剪不能恢复已消失的早期梯度，也不能保证把NaN变回正常数。

| 量 | 含义 |
| --- | --- |
| $a_t$ | 隐藏单元的激活前输入 |
| $q_t=\nabla_{o_t}L$ | 输出侧已包含损失权重的梯度 |
| $\delta_t=\nabla_{a_t}L$ | 隐藏净输入的梯度 |
| $D_t$ | 激活导数构成的对角矩阵 |

下面的完整递推是课件时间展开与链式法则的手推补全。`,
    checks: [],
    source:
      "W7 第25–34页，重点第28–31页；完整递推及小数例题为课件原理的推导补全。",
  },
  {
    id: "gated-rnn",
    title: "LSTM 与 GRU：把保留和写入分开",
    group: "六 · 第七周：循环网络",
    lead: "先解释门的含义，再算一个时间步。不要只背门名，更要检查每个门乘在哪条路径上。",
    body: String.raw`## 两种门控状态

LSTM分开记忆状态 $c_t$ 与隐藏状态 $h_t$；三个门控制遗忘、写入与读出，候选记忆提供新内容。GRU合并状态，用重置门参与候选计算，再用更新门混合旧状态与候选。

本页与W7第68–69页一致：**GRU的 $z_t$ 越大，写入新候选越多**。另一些教材把 $z_t$ 定义为保留比例；那是互补约定，不可把其门名和本页公式拼在一起。候选式采用先做 $r_t\odot h_{t-1}$，再乘 $U_h$。

| 激活 | 用途 |
| --- | --- |
| $\sigma(a)=1/(1+e^{-a})$ | 产生0到1之间的门系数 |
| $\tanh(a)$ | 产生有正有负的候选内容 |
| $\odot$ | 逐元素乘积，不是点积 |

无遗忘门、耦合输入/遗忘门、peephole都是课件提到的变体。比较时读具体连线；无遗忘门的状态可能累积，但有符号候选不保证状态单调增大。`,
    checks: [],
    source:
      "W7 第36–71页，尤其第44–57、65、68–69页；按勘误统一Logistic符号及GRU门约定。",
  },
];

export const sequenceStudy: Record<string, StudySet> = {
  convolution: {
    formulas: [
      {
        id: "conv-correlation",
        title: "一个卷积输出怎样算出来",
        figure: sliding,
        formula: String.raw`
$$
Z_{oij}=b_o+\sum_{c=1}^{C_{\rm in}}\sum_{u=0}^{k_h-1}\sum_{v=0}^{k_w-1}K_{ocuv}X^{\rm pad}_{c,is_h+u,js_w+v}.
$$
`,
        context:
          "普通非分组卷积，无膨胀；空间下标从0开始，通道编号从1开始。一个输出通道使用全部输入通道，一组核在不同位置重复使用。",
        task: "从单通道2×2窗口出发，解释为什么多通道必须求和，以及同一个核为何只有一组参数。",
        hint: "先固定输出的位置和通道，再列出这个输出依赖的每一个输入元素。",
        derivation: String.raw`单通道窗口展开为

$$
Z_{ij}=K_{00}X_{is_h,js_w}+K_{01}X_{is_h,js_w+1}+K_{10}X_{is_h+1,js_w}+K_{11}X_{is_h+1,js_w+1}+b.
$$

多通道时，每个输入通道有自己的二维核片，先分别计算，再相加：

$$
Z_{oij}=b_o+\sum_c Z^{(c)}_{oij}.
$$

这里各通道的 $Z^{(c)}$ 不另加偏置。位置从 $(i,j)$ 移到 $(i,j+1)$，输入窗口移动 $s_w$ 格，核的下标和值都不变，这就是权值共享。数学卷积会翻核；本式是互相关。`,
        pitfall:
          "输入通道求和，不是拼接；一个输出通道的偏置只加一次。数学卷积与互相关不能混算。",
        source: "W5 第19–28、34、41–45页。",
      },
      {
        id: "conv-shape",
        title: "卷积输出尺寸与参数量",
        figure: channels,
        formula: String.raw`
$$
H_{\rm out}=\left\lfloor\frac{H+2p_h-k_h}{s_h}\right\rfloor+1,\quad W_{\rm out}=\left\lfloor\frac{W+2p_w-k_w}{s_w}\right\rfloor+1.
$$


$$
P=C_{\rm out}(C_{\rm in}k_hk_w+1).
$$
`,
        context:
          "普通卷积、无膨胀、对称填充、每输出通道一个偏置。输入至少能容纳一个有效窗口；无偏置时删掉括号里的1。",
        task: "从窗口最后一次能放在哪里推输出长度，并解释窄卷积、宽卷积、等宽卷积。",
        hint: "长度为n的输入填充后长度为n+2p；最后一个窗口左端不能超过n+2p−k。",
        derivation: String.raw`一维窗口左端为 $0,s,2s,\ldots,ms$，要求 $ms+k\le n+2p$。所以 $m\le(n+2p-k)/s$。位置数是最大整数 $m$ 再加1。

步长1时：

$$
p=0\Rightarrow n_{\rm out}=n-k+1\quad\text{（窄）},
$$


$$
p=k-1\Rightarrow n_{\rm out}=n+k-1\quad\text{（宽）}.
$$

若核长为奇数，等宽可取 $p=(k-1)/2$，输出长为 $n$。偶数核常需左右不对称填充，总填充量为 $k-1$。

每个输出通道有 $C_{\rm in}k_hk_w$ 个权重和1个偏置；乘输出通道数得到 $P$。输入高宽改变窗口次数，不改变这些独立参数的数量。`,
        pitfall:
          "输出激活数与参数量不同；别漏掉向下取整。步长不是1时，不直接套用等宽n。",
        source: "W5 第23–24、34、41–45页；往年题第9题。",
      },
      {
        id: "conv-pooling",
        title: "最大池化与平均池化",
        figure: pooling,
        formula: String.raw`
$$
y_{\max}=\max_{i\in\mathcal W}x_i,\qquad y_{\rm avg}=\frac1{|\mathcal W|}\sum_{i\in\mathcal W}x_i.
$$
`,
        context:
          "每个通道独立做空间池化。这里讨论无填充窗口、普通无可训练参数的max/average pooling。",
        task: "解释为什么普通池化不改变通道数；用链式法则说明一份上游梯度怎样传回窗口。",
        hint: "平均是线性和；唯一最大元素附近，最大值只跟那个元素一起变化。",
        derivation: String.raw`一个输入通道产生一个池化后的通道，没有跨通道相加或新增卷积核，因此通道数不变。

补充链式法则自检：若 $g=\partial L/\partial y$，平均池化每个位置得到 $g/|\mathcal W|$。最大值唯一且位于 $i^*$ 时，

$$
\frac{\partial L}{\partial x_i}=g\,\mathbf1[i=i^*].
$$

若窗口重叠，同一个输入收到多份梯度，需要相加。最大值并列处不可微，需按题目给出的分配/选索引约定处理。`,
        pitfall:
          "普通池化参数为0；下采样并不保证任意平移、旋转、缩放下输出严格不变。反向公式为链式法则补充。",
        source: "W5 第49–56页；梯度解释为配套推导补充。",
      },
      {
        id: "conv-receptive-field",
        title: "叠小卷积核的感受野",
        formula: String.raw`
$$
r_l=r_{l-1}+(k_l-1)j_{l-1},\qquad j_l=s_lj_{l-1},\quad r_0=j_0=1.
$$
`,
        context:
          "一维推导可分别用于图像高宽；无膨胀。r表示理论感受野宽度，j表示相邻输出在原输入上的间隔。",
        task: "推导两层3×3、步长1的感受野，并比较它与一层5×5的权重数。",
        hint: "第二层增加两个相邻的第一层中心间隔。参数比较先假设各层通道都是C且忽略偏置。",
        derivation: String.raw`新窗口含 $k_l$ 个旧输出，它们中心间隔为 $j_{l-1}$；最远中心相距 $(k_l-1)j_{l-1}$，再加一个旧感受野的宽度，得到递推。

两个步长1的3×3层：$r_1=3$，$r_2=3+2=5$；三个则为7。各层通道都为 $C$、忽略偏置时：

$$
P_{3+3}=2\cdot9C^2=18C^2<25C^2=P_5.
$$

中间激活还增加非线性，因此一般不能说两个小核与一个大核表示完全相同的函数。`,
        pitfall:
          "跨越步长大于1的层后，必须更新j。不同通道数时重新计算，不机械背18C²。",
        source: "W5 第67–70页；W6 第19–23页的VGG部分；感受野递推为计算补充。",
      },
    ],
    exercises: [
      {
        id: "conv-window-practice",
        title: "四个窗口，逐个手算",
        minutes: 6,
        prompt: String.raw`单通道输入和卷积核为

$$
X=\begin{pmatrix}1&2&0\\0&1&3\\2&1&0\end{pmatrix},\qquad K=\begin{pmatrix}1&-1\\0&2\end{pmatrix}.
$$

采用互相关，步长1、无填充、偏置0、无激活。求输出矩阵；若步长改成2，输出形状与数值如何变化？`,
        hint: "每次只圈一个2×2窗口，四个对应位置相乘后相加；改成步长2后重新枚举能放下的窗口。",
        answer: String.raw`步长1：$Z=\begin{pmatrix}1&8\\1&-2\end{pmatrix}$；步长2：$1\times1$，唯一值为1。`,
        solution: String.raw`按从左到右、从上到下计算：

$$
Z_{00}=1\cdot1+2\cdot(-1)+0\cdot0+1\cdot2=1,
$$


$$
Z_{01}=2\cdot1+0\cdot(-1)+1\cdot0+3\cdot2=8,
$$


$$
Z_{10}=0\cdot1+1\cdot(-1)+2\cdot0+1\cdot2=1,
$$


$$
Z_{11}=1\cdot1+3\cdot(-1)+1\cdot0+0\cdot2=-2.
$$

步长2时尺寸为 $\lfloor(3-2)/2\rfloor+1=1$，只使用左上窗口。`,
        source: "依W5第19–28页编写的复习例题；非往年原题。",
      },
      {
        id: "conv-size-practice",
        title: "尺寸、参数和池化一起算",
        minutes: 7,
        prompt: String.raw`输入为 $3\times32\times32$，卷积输出通道8、核3×3、步长2、填充1，每个输出通道含一个偏置；随后做2×2、步长2、无填充的最大池化。求卷积输出、参数量、池化输出与池化参数量。另算窗口 $\begin{pmatrix}1&3\\2&0\end{pmatrix}$ 的最大值和平均值。`,
        hint: "分别处理高宽与通道；参数量由核和偏置决定，池化不新增核。",
        answer: String.raw`卷积输出 $8\times16\times16$，参数224；池化输出 $8\times8\times8$，参数0；窗口最大值3、均值1.5。`,
        solution: String.raw`卷积高宽均为 $\lfloor(32+2-3)/2\rfloor+1=16$。

$$
P=8(3\cdot3\cdot3+1)=224.
$$

池化高宽均为 $\lfloor(16-2)/2\rfloor+1=8$，通道仍为8。普通最大池化无可训练参数。给定窗口的平均值为 $(1+3+2+0)/4=1.5$，最大值为3。`,
        source: "依W5第23–24、41–51页编写；覆盖往年题第9题所需方法。",
      },
    ],
  },
  "cnn-architectures": {
    figures: [inception],
    formulas: [
      {
        id: "cnn-pointwise",
        title: "1×1卷积与降维节省的参数",
        figure: channels,
        formula: String.raw`
$$
Y_{oij}=\sum_cK_{oc}X_{cij}+b_o.
$$


$$
P_{\rm direct}=k^2C_{\rm in}C_{\rm out},\qquad P_{\rm reduced}=C_{\rm in}C_m+k^2C_mC_{\rm out}.
$$
`,
        context:
          "第一式步长1、无填充。第二行只数权重：先用1×1降到中间通道Cm，再做k×k到Cout。",
        task: "从每个空间位置上的通道向量解释1×1卷积，再推导两种结构的参数量。",
        hint: "一个位置上就是从Cin维到Cout维的仿射映射；参数在所有位置共享。",
        derivation: String.raw`固定 $(i,j)$，输入是 $C_{\rm in}$ 维向量，输出是 $C_{\rm out}$ 维向量。核矩阵有 $C_{\rm out}C_{\rm in}$ 个权重，所以1×1改变通道而不扩展空间感受野。

直接卷积有 $C_{\rm out}$ 组核，每组含 $k^2C_{\rm in}$ 个权重。降维结构的第一层有 $C_{\rm in}C_m$ 个，第二层有 $k^2C_mC_{\rm out}$ 个，将两层相加。若计偏置，直接结构加 $C_{\rm out}$，两层结构加 $C_m+C_{\rm out}$。

Inception把相同高宽的各分支按通道拼接，通道数相加；不是把分支数值相加。`,
        pitfall:
          "Cout小于Cin才是通道压缩。普通1×1是共享的仿射通道混合，不应称为一般的数据依赖注意力。",
        source: "W6 第26–29页，按勘误纠正第28页通道压缩/扩展方向。",
      },
      {
        id: "cnn-residual",
        title: "残差连接的梯度直通项",
        figure: residual,
        formula: String.raw`
$$
y=x+F(x),\qquad \nabla_xL=(I+J_F(x))^\top\nabla_yL.
$$
`,
        context:
          "x和F(x)形状一致，列向量约定；$J_F$为输出×输入的Jacobian。公式针对加法之后尚未施加激活的映射。",
        task: "由微分推导反传，并解释残差学习与恒等捷径的作用。",
        hint: "先写输出的微分，再代入损失的全微分；不要漏掉输入直接到输出的路径。",
        derivation: String.raw`由 $y=x+F(x)$ 得

$$
\mathrm dy=(I+J_F)\mathrm dx.
$$

因此

$$
\mathrm dL=g_y^\top\mathrm dy=g_y^\top(I+J_F)\mathrm dx,
$$


$$
g_x=g_y+J_F^\top g_y.
$$

直连项 $g_y$ 不必经过残差分支所有层。若希望学习接近恒等的映射，残差分支只需让 $F(x)$ 接近0。

形状不同时可用投影 $y=Px+F(x)$，得到 $g_x=P^\top g_y+J_F^\top g_y$。若加法后有ReLU，先对加法输出乘ReLU导数，再应用本式。`,
        pitfall:
          "有捷径不保证永不梯度消失或爆炸：两项可能抵消或放大。ResNet相加保持形状，DenseNet拼接增加通道。",
        source: "W6 第36–41页；往年题第10题。梯度式为链式法则补全。",
      },
    ],
    exercises: [
      {
        id: "cnn-bottleneck-practice",
        title: "1×1降维究竟省在哪里",
        minutes: 6,
        prompt:
          "比较两种从192通道到32通道的结构：A直接用5×5卷积；B先用1×1降到16通道，再用5×5卷积到32通道。先忽略偏置，再分别加入每输出通道一个偏置。求参数量。",
        hint: "B有两层，分别计算后相加；空间高宽不参与普通卷积的参数计数。",
        answer: "忽略偏置：A 153,600，B 15,872。含偏置：A 153,632，B 15,920。",
        solution: String.raw`A的权重数为 $25\cdot192\cdot32=153600$；B为

$$
192\cdot16+25\cdot16\cdot32=3072+12800=15872.
$$

A增加32个偏置；B增加16+32=48个偏置。不同结构的参数减少不代表两个网络表达完全相同的函数。`,
        source: "依W6第26–29页编写的复习例题。",
      },
      {
        id: "cnn-residual-practice",
        title: "残差、拼接与Dropout辨析",
        minutes: 6,
        prompt: String.raw`（1）标量残差块 $y=x+2x$，上游梯度 $\partial L/\partial y=3$，求 $\partial L/\partial x$。

（2）四个同高宽分支的通道数为16、24、32、8，沿通道拼接后多少通道？能否原样按元素相加？

（3）AlexNet训练时随机丢弃部分神经元的操作叫什么？常规评估时是否继续随机丢弃？`,
        hint: "第一问有两条路径；第二问区分相加与拼接对形状的要求。",
        answer: String.raw`（1）9。（2）80通道，不能直接相加。（3）Dropout，常规评估时停用随机丢弃。`,
        solution: String.raw`（1）$\mathrm dy/\mathrm dx=1+2=3$，因此梯度为 $3\cdot3=9$；若只算残差分支会误得6。

（2）拼接通道数为 $16+24+32+8=80$；相加要求各维一致，通道不同需先投影/变换。

（3）Dropout通过训练时的随机丢弃形成正则化效果；评估模式不继续随机丢弃。不能把Dropout与输入数据增强混为同一个操作。`,
        source: "依W6第26–41页及往年题第10、16题组合；数值小题为补充练习。",
      },
    ],
  },
  rnn: {
    formulas: [
      {
        id: "rnn-forward",
        title: "RNN前向与参数计数",
        figure: unroll,
        formula: String.raw`
$$
a_t=Wx_t+Uh_{t-1}+b,\qquad h_t=\phi(a_t),\qquad o_t=Vh_t+c.
$$


$$
P=hd+h^2+h+Ch+C.
$$
`,
        context:
          "单层单方向、状态维h、输入维d、输出维C，状态和输出各一个偏置。各时刻共享同一组W、U、V、b、c。",
        task: "逐项检查矩阵形状，推参数量，并说明序列变长为何不增加模型参数。",
        hint: "逐项数矩阵元素，注意U是h×h。时间下标属于状态，不属于独立权重。",
        derivation: String.raw`$Wx_t$ 和 $Uh_{t-1}$ 都应为 $h\times1$，所以 $W\in\mathbb R^{h\times d}$，$U\in\mathbb R^{h\times h}$。输出要求 $V\in\mathbb R^{C\times h}$。

依次计数：$W$有 $hd$，$U$有 $h^2$，$b$有 $h$，$V$有 $Ch$，$c$有 $C$。相加得到总数。

从1步展开到T步，只是把同一权重使用T次；参数存储量不乘T，但前向计算及保存中间状态的开销会随序列长度增长。`,
        pitfall:
          "状态共享的是更新规则与权重，不是各时刻数值完全相同。若题目输出读取旧状态或拼接输入，应按新计算图计数。",
        source: "W7 第16–24页；参数计数按本页明确的标准单偏置结构。",
      },
    ],
    exercises: [
      {
        id: "rnn-forward-practice",
        title: "两步前向与参数共享",
        minutes: 6,
        prompt: String.raw`先用标量线性RNN练习：$h_t=0.5h_{t-1}+x_t$，$h_0=0$，$x_1=1,x_2=2$。求两个状态。

另有标准RNN，输入维3、状态维4、输出维2，含状态偏置和输出偏置，求参数量。序列长度从5增至20时参数量如何变化？`,
        hint: "前向必须先得到h1；参数计数按W、U、b、V、c五项展开。",
        answer: String.raw`$h_1=1,h_2=2.5$；参数42，序列变长后仍为42。`,
        solution: String.raw`$h_1=0.5\cdot0+1=1$，$h_2=0.5\cdot1+2=2.5$。

$$
P=4\cdot3+4^2+4+2\cdot4+2=12+16+4+8+2=42.
$$

长度只改变这42个参数的使用次数。线性激活在此用于简化手算，一般RNN还要通过给定的非线性激活。`,
        source: "依W7第16–24页编写的复习例题。",
      },
    ],
  },
  bptt: {
    formulas: [
      {
        id: "rnn-bptt",
        title: "BPTT的两路梯度与参数累加",
        figure: unroll,
        formula: String.raw`
$$
\delta_t=(V^\top q_t+U^\top\delta_{t+1})\odot\phi'(a_t),\qquad\delta_{T+1}=0.
$$


$$
\nabla_WL=\sum_t\delta_tx_t^\top,\quad\nabla_UL=\sum_t\delta_th_{t-1}^\top,\quad\nabla_bL=\sum_t\delta_t.
$$


$$
\nabla_VL=\sum_tq_th_t^\top,\quad\nabla_cL=\sum_tq_t.
$$
`,
        context: String.raw`沿用 $o_t=Vh_t+c$ 的标准模型。$q_t$ 已包含损失的时间权重；Softmax交叉熵给 $q_t=\alpha_t(p_t-y_t)$。反向按T到1计算。`,
        task: "从ht到当前输出、下一状态两条边推误差递推，再解释共享权重为什么求和。",
        hint: "损失对ht的梯度先累加两条路径，再经过激活函数。每次使用同一个W，都贡献一个外积。",
        derivation: String.raw`当前输出贡献 $V^\top q_t$，下一状态净输入贡献 $U^\top\delta_{t+1}$，两路相加得到 $\nabla_{h_t}L$。经过 $h_t=\phi(a_t)$，逐元素乘激活导数，得到 $\delta_t$。

对某个权重 $W_{ij}$，单次使用的局部导数为 $\partial a_{t,i}/\partial W_{ij}=x_{t,j}$，所以该时刻贡献 $\delta_{t,i}x_{t,j}$。同一个参数参与所有时刻，累加得到矩阵外积的和。$U$同理，只把输入换成旧状态。

仅末端有损失时，$t<T$ 的 $q_t=0$，但未来路径通常仍使 $\delta_t\ne0$。若损失已经取时间平均，不能在所有参数梯度上再除一次T。`,
        pitfall:
          "只取最后一步参数梯度会漏项；误差递推中的U需转置。输出头结构变化时不直接套这组公式。",
        source: "W7 第25–30页；完整递推为课件链式法则的手推补全。",
      },
      {
        id: "rnn-long-gradient",
        title: "长程梯度是有序Jacobian乘积",
        formula: String.raw`
$$
D_t=\operatorname{diag}(\phi'(a_t)),\qquad \frac{\partial h_T}{\partial h_k}=D_TU\,D_{T-1}U\cdots D_{k+1}U.
$$


$$
\left\|\frac{\partial h_T}{\partial h_k}\right\|\le\prod_{t=k+1}^{T}\|D_tU\|.
$$
`,
        context:
          "这是沿状态时间路径的前向Jacobian；反向梯度按它的转置作用。矩阵顺序一般不能交换。",
        task: "从两步链式法则推到多步，说明什么条件支持消失判断，为什么上界大于1不够证明爆炸。",
        hint: "先写 ∂ht/∂h(t−1)，然后按时间逆序相乘。最后用矩阵范数的次乘性。",
        derivation: String.raw`一步的状态Jacobian为 $D_tU$。连续两步为 $(D_tU)(D_{t-1}U)$，继续链式相乘得到公式。

若每项范数都不超过固定的 $\rho<1$，则整体范数不超过 $\rho^{T-k}$，随距离指数衰减。上界大于1只说明这个上界无法保证衰减；矩阵方向可能互相抵消或旋转，不能据此断言真实梯度爆炸。

标量线性例子则可精确计算：$h_t=uh_{t-1}+wx_t$，故 $\partial h_T/\partial h_k=u^{T-k}$。间隔10步，$u=0.5$时为 $1/1024$，$u=2$时为1024。`,
        pitfall:
          "参数梯度还包含靠近末端的贡献。参数梯度范数不小，不代表早期状态梯度没消失；裁剪也不能恢复消失的梯度。",
        source: "W7 第29–34页；按勘误保留有序乘积和上界条件。",
      },
    ],
    exercises: [
      {
        id: "bptt-practice",
        title: "两步RNN：反传与直接展开互相核对",
        minutes: 10,
        prompt: String.raw`$h_t=uh_{t-1}+wx_t$，$h_0=0,x_1=1,x_2=2,u=0.5,w=1$，损失 $L=\frac12(h_2-1)^2$。

计算 $L$、两个状态的反向梯度及 $\partial L/\partial w,\partial L/\partial u$。然后把 $h_2$ 用 $u,w$ 直接展开，核验结果。`,
        hint: "先从末端误差出发；w在两步都出现，u的第一步贡献包含h0。",
        answer: String.raw`$L=1.125$；$\nabla_{h_2}L=1.5,\nabla_{h_1}L=0.75$；$\partial L/\partial w=3.75,\partial L/\partial u=1.5$。`,
        solution: String.raw`前向 $h_1=1,h_2=2.5$，故 $L=(2.5-1)^2/2=1.125$。线性激活的导数为1，因此 $\delta_2=1.5$，$\delta_1=u\delta_2=0.75$。

$$
\frac{\partial L}{\partial w}=\delta_1x_1+\delta_2x_2=0.75+3=3.75,
$$


$$
\frac{\partial L}{\partial u}=\delta_1h_0+\delta_2h_1=0+1.5=1.5.
$$

直接展开 $h_2=uwx_1+wx_2$，得到

$$
\frac{\partial L}{\partial w}=(h_2-1)(ux_1+x_2),\qquad\frac{\partial L}{\partial u}=(h_2-1)wx_1.
$$

代入后分别为3.75和1.5，独立核对一致。`,
        source: "依W7第28–30页编写的手推例题，采用线性激活简化运算。",
      },
    ],
  },
  "gated-rnn": {
    formulas: [
      {
        id: "lstm-forward",
        title: "LSTM三个门与候选记忆",
        figure: lstm,
        formula: String.raw`
$$
\begin{aligned}
f_t&=\sigma(W_fx_t+U_fh_{t-1}+b_f),\\
i_t&=\sigma(W_ix_t+U_ih_{t-1}+b_i),\\
o_t&=\sigma(W_ox_t+U_oh_{t-1}+b_o),\\
\widetilde c_t&=\tanh(W_cx_t+U_ch_{t-1}+b_c),\\
c_t&=f_t\odot c_{t-1}+i_t\odot\widetilde c_t,\\
h_t&=o_t\odot\tanh(c_t).
\end{aligned}
$$
`,
        context:
          "标准无peephole单元。四组输入/循环权重彼此独立；f、i、o是门，候选c不是门。所有状态和门的维度都是h。",
        task: "遮住更新式，沿记忆通路依次写出保留、写入和读出；说明每个门趋近0或1的效果。",
        hint: "旧记忆先乘遗忘门，新候选先乘输入门，二者相加；读出时再通过tanh和输出门。",
        derivation: String.raw`遗忘项 $f_t\odot c_{t-1}$ 决定旧记忆保留多少；写入项 $i_t\odot\widetilde c_t$ 决定新内容加入多少。二者直接相加，所以记忆更新不必每次都先完整经过一个循环权重矩阵再tanh。

$f_t\to1,i_t\to0$ 时近似保留旧记忆；$f_t\to0$ 时抹去旧记忆直接通路；$o_t\to0$ 时隐藏输出受抑制，但记忆 $c_t$ 仍可保留。候选能为负，因此写入也可减小某个记忆分量。

每组输入矩阵有 $hd$ 个元素，循环矩阵有 $h^2$ 个，偏置有 $h$ 个；四组共 $4h(d+h+1)$ 个参数，不含输出头。`,
        pitfall:
          "候选记忆与新记忆不同；输出门控制读出，不等于直接删除记忆。LSTM四倍参数的说法限定为同维度、单偏置、无输出头。",
        source: "W7 第44–57页；按勘误统一第46页Logistic符号和第53页矩阵记号。",
      },
      {
        id: "lstm-memory-path",
        title: "LSTM直接记忆路径怎样传梯度",
        formula: String.raw`
$$
\left.\frac{\partial c_t}{\partial c_{t-1}}\right|_{\text{固定门与候选}}=\operatorname{diag}(f_t),\qquad
\left.\frac{\partial c_T}{\partial c_k}\right|_{\text{直接路径}}=\operatorname{diag}\left(\bigodot_{t=k+1}^Tf_t\right).
$$
`,
        context:
          "只讨论c到c的直接记忆边，固定门和候选的值。不是把整个递归网络中的所有依赖都切成常数。",
        task: "由记忆加法式推一条边的导数，再解释为何遗忘门接近1有利于长程保留。",
        hint: "将c更新式写成逐分量形式；固定另一项后就是一次线性缩放。",
        derivation: String.raw`第j个分量满足 $c_{t,j}=f_{t,j}c_{t-1,j}+i_{t,j}\widetilde c_{t,j}$。固定门和候选时，对旧记忆的直接偏导就是 $f_{t,j}$；不同分量的直接偏导为0，所以得到对角矩阵。

沿直接记忆路径连乘，对角元素是各时刻遗忘门的乘积。若门值接近1，这条路径衰减较慢。

但完整网络还存在 $c_{t-1}\to h_{t-1}\to$ 各门与候选 $\to c_t$ 等路径。完整总导数须把这些贡献加回，不能只写一个 $f_t$。`,
        pitfall:
          "这是一条路径的导数，不是整个LSTM的总Jacobian。门长期小于1仍可能衰减，门控不保证任意长度都稳定。",
        source: "W7 第48–58页的记忆机制；直接路径公式为带条件的手推补充。",
      },
      {
        id: "gru-forward",
        title: "GRU：重置候选，再混合新旧",
        figure: gru,
        formula: String.raw`
$$
\begin{aligned}
r_t&=\sigma(W_rx_t+U_rh_{t-1}+b_r),\\
z_t&=\sigma(W_zx_t+U_zh_{t-1}+b_z),\\
\widetilde h_t&=\tanh\!\left(W_hx_t+U_h(r_t\odot h_{t-1})+b_h\right),\\
h_t&=(1-z_t)\odot h_{t-1}+z_t\odot\widetilde h_t.
\end{aligned}
$$
`,
        context:
          "使用W7第68–69页约定：z增大表示多写新候选。重置门先乘旧状态再经过 $U_h$；没有独立记忆状态c。",
        task: "用z=0、z=1检查门语义；固定候选时推对z的局部导数，再数参数组。",
        hint: "把最后一行当作逐分量的线性插值。候选式、重置门、更新门各有一组参数。",
        derivation: String.raw`$z_t=0$ 时保留旧状态，$z_t=1$ 时完全采用候选。$r_t$接近0时，旧状态在候选计算中的作用被抑制，但它仍可能通过最终混合的旧状态通路保留下来。

固定候选和旧状态，逐分量求导：

$$
\left.\frac{\partial h_{t,j}}{\partial z_{t,j}}\right|_{\text{固定新旧状态}}=\widetilde h_{t,j}-h_{t-1,j}.
$$

固定门和候选时，旧状态的直接路径导数为 $\operatorname{diag}(1-z_t)$；完整导数还含门与候选对旧状态的依赖。

三组仿射变换共 $3h(d+h+1)$ 个参数，不含输出头；普通RNN对应一组，标准LSTM对应四组。`,
        pitfall:
          "不要把另一教材的保留门z带入本页。U(r⊙h)一般不等于r⊙(Uh)；重置门的位置也必须按题目。",
        source: "W7 第65、68–69页；与第67页不一致之处按现有勘误说明。",
      },
    ],
    exercises: [
      {
        id: "lstm-practice",
        title: "LSTM：记忆与输出分别算",
        minutes: 6,
        prompt: String.raw`一维LSTM给定 $c_{t-1}=2,f_t=0.5,i_t=0.25,\widetilde c_t=-0.4,o_t=0.8$。求 $c_t,h_t$；固定门与候选时，求直接路径 $\partial c_t/\partial c_{t-1}$。解释为何它不一定是完整总导数。`,
        hint: "先混合旧记忆和候选，随后对新记忆做tanh，再乘输出门。",
        answer: String.raw`$c_t=0.9$，$h_t\approx0.573038$；固定门与候选时的直接偏导为0.5。`,
        solution: String.raw`
$$
c_t=0.5\cdot2+0.25\cdot(-0.4)=0.9,
$$


$$
h_t=0.8\tanh(0.9)\approx0.573038.
$$

直接记忆边的偏导为 $f_t=0.5$。完整网络中各门与候选可通过旧隐藏状态间接依赖旧记忆，因此总导数还有这些间接路径，不能仅用0.5代表。`,
        source: "依W7第48–57页编写的复习例题；直接路径辨析沿用讲义勘误。",
      },
      {
        id: "gru-practice",
        title: "GRU门语义与参数比较",
        minutes: 6,
        prompt: String.raw`采用本课约定，给定 $h_{t-1}=0.6,\widetilde h_t=-0.2,z_t=0.25$，求新状态；再令z分别为0、1核对语义。

输入维3、隐藏维4，单偏置、无输出头时，分别计算普通RNN、LSTM、GRU参数量。`,
        hint: "先写新旧状态的混合权重；参数计数先求一组仿射变换的元素数。",
        answer: String.raw`新状态0.4；z=0时0.6，z=1时−0.2。三种参数量依次32、128、96。`,
        solution: String.raw`
$$
h_t=(1-0.25)\cdot0.6+0.25\cdot(-0.2)=0.45-0.05=0.4.
$$

$z=0$保留0.6，$z=1$采用候选−0.2，符合“z越大写入越多”。

一组参数为 $h(d+h+1)=4(3+4+1)=32$。普通RNN一组，LSTM四组，GRU三组，分别为32、128、96。若增加输出头或使用两套偏置，必须重新计数。`,
        source: "依W7第57、65、68–69页编写的复习例题。",
      },
    ],
  },
};
