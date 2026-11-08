import type { StudySet } from "./exam-types";

const generalizationFigure = {
  src: "/images/deep-learning/exam/generalization.svg",
  alt: "示意训练误差下降、验证误差先降后升，并标出验证误差最低的提前停止位置",
  caption: "自绘示意，依据 W2 第17–22、49页；曲线不是实验数据。",
};
const activationFigure = {
  src: "/images/deep-learning/exam/activations.svg",
  alt: "Sigmoid、tanh、ReLU 和 Softplus 四种激活函数的准确曲线",
  caption: "按函数定义自绘，依据 W3 第20–25页；观察饱和区、负半轴与光滑性。",
};
const backpropFigure = {
  src: "/images/deep-learning/exam/six-weight-bp.svg",
  alt: "两个输入经过四个权重到两个隐藏值，再经过两个权重到一个线性输出，共六个权重",
  caption:
    "自绘六权重网络，依据 W3 第57–62页、W4 第19–25页；此例隐藏层没有非线性。",
};
const autodiffFigure = {
  src: "/images/deep-learning/exam/autodiff.svg",
  alt: "x和w相乘，加偏置b，取负，取指数，加1，再取倒数的有向计算图",
  caption:
    "自绘计算图，依据 W3 第71–73页、W4 第33–36页；反向传播须经过取负与倒数两个负导数。",
};

/** Exam review stays inside weeks 1–4; examples are newly worked exercises. */
export const coreStudy: Record<string, StudySet> = {
  generalization: {
    formulas: [
      {
        id: "core-risk",
        title: "期望风险、经验风险与正则化",
        formula: String.raw`$$
R(\theta)=\mathbb E_{(x,y)\sim P}\ell(y,f_\theta(x)),\qquad
\widehat R(\theta)=\frac1N\sum_{i=1}^N\ell_i(\theta)
$$
$$
J(\theta)=\widehat R(\theta)+\frac\lambda2\|w\|_2^2,
\qquad \nabla_wJ=\nabla_w\widehat R+\lambda w.
$$`,
        context:
          "期望风险描述新样本上的平均误差；经验风险是手里这批训练数据上的平均误差。这里仅正则化权重 w，λ≥0。",
        task: "推导固定模型下经验风险的期望，以及 L₂ 正则项的梯度；解释这为什么不能证明训练后必不出现过拟合。",
        hint: "先把期望交换到有限求和内部；求导时把范数平方展开成每个坐标的平方和。注意固定参数与依数据选择的参数不同。",
        derivation: String.raw`假定样本独立同分布于 $P$，损失期望存在，且 $\theta$ 在抽样前固定：

$$
\begin{aligned}
\mathbb E_{\mathcal D}\widehat R(\theta)
&=\frac1N\sum_i\mathbb E_{(x_i,y_i)\sim P}\ell(y_i,f_\theta(x_i))\\
&=\frac1N\sum_iR(\theta)=R(\theta).
\end{aligned}
$$

将正则项按坐标展开：

$$
\frac{\partial}{\partial w_j}\frac\lambda2\sum_k w_k^2
=\lambda w_j.
$$

因此对整个目标求导得到数据梯度加 $\lambda w$。若参数 $\hat\theta(\mathcal D)$ 是在同一训练集上选出的，上面的固定参数论证不能直接套用；评估泛化需要独立验证数据等依据。`,
        pitfall:
          "目标里有 1/2 才得到 λw；若写 λ‖w‖²，应是 2λw。训练误差小不自动等于期望风险小，测试集不用于逐轮选模型。",
        source: "W1 第69–80页；W2 第14–24页。",
        figure: generalizationFigure,
      },
    ],
    exercises: [
      {
        id: "core-ex-generalization",
        title: "三要素与提前停止",
        prompt:
          "模型 A、B 在同一训练集与验证集上得到：A 的训练/验证误差为 0.20/0.25；B 为 0.10/0.32，均为越低越好。若用验证误差选模型，应选哪个？说明为什么，并用“模型、学习准则、优化算法”描述一次线性回归训练。",
        hint: "先区分参数拟合与模型选择；再分别回答“用什么函数”“好坏如何衡量”“参数怎样更新”。",
        answer: "选 A。三要素示例：线性模型、平方损失（可加正则）、梯度下降。",
        solution: String.raw`在评价数据和指标相同的前提下，A 的验证误差 $0.25<0.32$，应保留 A。B 的训练误差更低，但没有带来更好的验证表现；这是过拟合的线索，不能只凭两个数断言全部原因。

- 模型：$f_{w,b}(x)=w^\top x+b$。
- 学习准则：$J=\frac1{2N}\sum_i(f_{w,b}(x_i)-y_i)^2$。
- 优化算法：$(w,b)\leftarrow(w,b)-\eta\nabla J$。

提前停止依据验证集选择时刻；测试集留作最后的独立评价。`,
        source:
          "往年题 Q2；W1 第61页、W2 第4–5、17–22、49页。此数值题为配套自编。",
        minutes: 4,
      },
    ],
  },
  losses: {
    formulas: [
      {
        id: "core-mse",
        title: "线性回归的 MSE 与偏置梯度",
        formula: String.raw`$$
e=Xw+b\mathbf1_N-y,\qquad
J=\frac1{2N}e^\top e+\frac\lambda2w^\top w
$$
$$
\nabla_wJ=\frac1N X^\top e+\lambda w,\qquad
\partial_bJ=\frac1N\mathbf1_N^\top e.
$$`,
        context: String.raw`$X\in\mathbb R^{N\times d}$ 每行一个样本，$w\in\mathbb R^d$，$b$ 是标量；这里的数据项是半均方误差。`,
        task: "从逐样本求和推导 w 和 b 的梯度，再说明普通 MSE 不带 1/2 时哪个系数改变。",
        hint: String.raw`记 $e_i=\sum_jX_{ij}w_j+b-y_i$；局部导数为 $\partial e_i/\partial w_j=X_{ij}$、$\partial e_i/\partial b=1$。`,
        derivation: String.raw`按一个权重坐标计算：

$$
\begin{aligned}
\frac{\partial J}{\partial w_j}
&=\frac1{2N}\sum_i2e_i\frac{\partial e_i}{\partial w_j}+\lambda w_j\\
&=\frac1N\sum_i e_iX_{ij}+\lambda w_j.
\end{aligned}
$$

把全部坐标排成列向量就是 $X^\top e/N+\lambda w$，形状为 $d\times1$。偏置在每个样本中出现一次：

$$
\frac{\partial J}{\partial b}=\frac1N\sum_i e_i=\frac1N\mathbf1_N^\top e.
$$

若数据项改为 $e^\top e/N$，两个**数据梯度**均乘 2，正则梯度仍为 $\lambda w$。`,
        pitfall:
          "先看损失定义中的平均与 1/2；偏置梯度不能漏掉对样本求和。RMSE 与 MSE 的梯度也不相同。",
        source: "W1 第106–108页；W2 第50–52页；矩阵形式为课内标量公式的整理。",
      },
      {
        id: "core-hinge",
        title: "SVM Hinge 损失的分段梯度",
        formula: String.raw`$$
s=y(w^\top x+b),\quad y\in\{-1,1\},\qquad
\ell=\max(0,1-s)+\frac\lambda2\|w\|^2
$$
$$
\nabla_w\ell=\begin{cases}\lambda w-yx,&s<1,\\\lambda w,&s>1,\end{cases}
\quad
\partial_b\ell=\begin{cases}-y,&s<1,\\0,&s>1.\end{cases}
$$`,
        context:
          "s 是有符号间隔。分类正确但间隔不足 1 时，仍会受到 Hinge 惩罚。边界 s=1 需要次梯度。",
        task: "分别展开 s<1、s>1 的损失，求梯度；补充 s=1 时允许的次梯度。",
        hint: "先判断 max 选中哪一支。正则项在两支中都存在，不能一并删掉。",
        derivation: String.raw`若 $s<1$：

$$
\ell=1-y(w^\top x+b)+\frac\lambda2\|w\|^2
\Rightarrow(\nabla_w\ell,\partial_b\ell)=(\lambda w-yx,-y).
$$

若 $s>1$：Hinge 数据项恒为 0，但正则项还在，所以梯度为 $(\lambda w,0)$。

在 $s=1$，两支斜率不同，不存在通常导数。次梯度是两支梯度的凸组合：

$$
\partial_{(w,b)}\ell
=\{(\lambda w-\alpha yx,-\alpha y):0\le\alpha\le1\}.
$$

这也解释了为什么不同程序在边界处可以选用不同的合法次梯度。`,
        pitfall:
          "课件 W1 109/W2 53 的分段式漏写一支的正则项；这里已纠正。Hinge 的标签是 ±1，不能直接代入 0/1 标签。",
        source: "W1 第109页；W2 第26、53页；依据项目勘误纠正正则项。",
      },
      {
        id: "core-kl",
        title: "熵、交叉熵与 KL 的等价优化",
        formula: String.raw`$$
H(p)=-\sum_i p_i\log p_i,\qquad H(p,q)=-\sum_i p_i\log q_i
$$
$$
D_{\mathrm{KL}}(p\|q)=\sum_i p_i\log\frac{p_i}{q_i}
=H(p,q)-H(p).
$$`,
        context: String.raw`$p$ 是固定的真实分布，$q$ 是模型分布，二者归一化。用自然对数；若 $p_i>0$，要求 $q_i>0$ 才有有限值。`,
        task: "展开 KL 并得到与交叉熵的关系；解释 one-hot 标签时交叉熵为什么只有一项。",
        hint: "把 log(pᵢ/qᵢ) 拆成两个对数。优化 q 时，哪些量保持不变？",
        derivation: String.raw`$$
\begin{aligned}
D_{\mathrm{KL}}(p\|q)
&=\sum_i p_i\log p_i-\sum_i p_i\log q_i\\
&=-H(p)+H(p,q).
\end{aligned}
$$

固定 $p$ 后 $H(p)$ 与模型参数无关，因此最小化 KL 与最小化交叉熵等价。对真实类别 $k$，one-hot 分布满足 $p_k=1$、其余为 0：

$$
H(p)=0,\qquad H(p,q)=-\log q_k=D_{\mathrm{KL}}(p\|q).
$$

因此优化时鼓励模型提高正确类别概率。若标签是软分布，需保留全部加权项，不能只选最大类别。`,
        pitfall:
          "KL 不对称；固定真实分布时才可丢掉 H(p)。交叉熵不是所有类别负对数的无权平均。",
        source: "W1 第84–92页；W2 第28–36页。",
      },
    ],
    exercises: [
      {
        id: "core-ex-hinge",
        title: "两种间隔下的 SVM 梯度",
        prompt: String.raw`设 $w=(0.2,-0.1)^\top$、$b=0$、$\lambda=0.2$，单样本损失为 $\ell=\max(0,1-y(w^\top x+b))+\lambda\|w\|^2/2$。分别计算样本 A：$x=(1,2)^\top,y=1$，样本 B：$x=(10,0)^\top,y=1$ 的间隔、损失与 w、b 梯度。`,
        hint: "两题先算间隔再选分支；共同的正则项和正则梯度可先算好。",
        answer: String.raw`A：$s=0,\ell=1.005,\nabla_w\ell=(-0.96,-2.02)^\top,\partial_b\ell=-1$。B：$s=2,\ell=0.005,\nabla_w\ell=(0.04,-0.02)^\top,\partial_b\ell=0$。`,
        solution: String.raw`共同的正则项为 $0.2(0.2^2+(-0.1)^2)/2=0.005$，正则梯度为 $(0.04,-0.02)^\top$。

1. A 的 $s=0.2-0.2=0<1$，Hinge 为 1，所以损失为 1.005。数据梯度为 $-yx=(-1,-2)^\top$，加上正则梯度得 $(-0.96,-2.02)^\top$；偏置梯度为 $-1$。
2. B 的 $s=2>1$，Hinge 为 0。损失只剩 0.005，梯度只剩正则梯度；偏置未正则化，因此其梯度为 0。`,
        source: "W1 第109页、W2 第53页的配套自编题。",
        minutes: 5,
      },
    ],
  },
  optimization: {
    formulas: [
      {
        id: "core-descent",
        title: "为什么负梯度能降低目标",
        formula: String.raw`$$
\theta^+=\theta-\eta\nabla J(\theta),\qquad
J(\theta^+)=J(\theta)-\eta\|\nabla J(\theta)\|^2+O(\eta^2).
$$`,
        context: String.raw`在固定点 $\theta$ 附近假定 $J$ 二阶连续可微，$\eta>0$ 足够小，且 $\nabla J(\theta)\ne0$。这是局部结论。`,
        task: "从 Taylor 展开推导负梯度方向的变化量；再用一维二次函数找出确切的下降步长范围。",
        hint: String.raw`把一般方向 $d$ 代入 $J(\theta+\eta d)$，最后选 $d=-\nabla J$；一维例子可直接展开新旧损失差。`,
        derivation: String.raw`一阶 Taylor 展开给出

$$
J(\theta+\eta d)=J(\theta)+\eta\nabla J(\theta)^\top d+O(\eta^2).
$$

选 $d=-\nabla J(\theta)$：

$$
J(\theta^+)-J(\theta)=-\eta\|\nabla J(\theta)\|^2+O(\eta^2).
$$

梯度非零且步长足够小时，一阶负项占主导。对 $J(w)=w^2/2$，$w^+=(1-\eta)w$，当 $w\ne0$：

$$
\frac{J(w^+)}{J(w)}=(1-\eta)^2<1
\iff0<\eta<2.
$$

这说明步长过大可以让损失上升。梯度为零时，一阶项不能判断是极小值、极大值还是鞍点。`,
        pitfall:
          "不要把 Taylor 近似写成对任意步长成立的精确等式。BP 负责求梯度，梯度下降负责更新。",
        source: "往年题 Q3；W1 第94–97页、W2 第38–41页。",
      },
      {
        id: "core-minibatch",
        title: "GD、SGD 与小批量梯度",
        formula: String.raw`$$
g_{\mathrm{GD}}=\frac1N\sum_{i=1}^N\nabla\ell_i,\qquad
g_{\mathrm{SGD}}=\nabla\ell_I,\qquad
g_B=\frac1B\sum_{j=1}^B\nabla\ell_{I_j}
$$
$$
\mathbb E[g_B\mid\theta]=\nabla\widehat R(\theta),\qquad
\theta^+=\theta-\eta g_B.
$$`,
        context: String.raw`对当前固定参数，$I_j$ 从训练集索引独立均匀抽样。公式给出随机梯度的条件期望；实际无放回遍历的抽样条件应另行说明。`,
        task: "证明小批量均值梯度的无偏性；比较三种方法每次更新看多少样本，并计算保留末批时每个 epoch 的更新次数。",
        hint: "一个均匀抽到的样本梯度，其期望就是全数据平均；对 B 次抽样再取平均。",
        derivation: String.raw`$$
\mathbb E[\nabla\ell_{I_j}(\theta)\mid\theta]
=\sum_{i=1}^N\frac1N\nabla\ell_i(\theta)=\nabla\widehat R(\theta).
$$

由期望线性性：

$$
\mathbb E[g_B\mid\theta]
=\frac1B\sum_{j=1}^B\nabla\widehat R(\theta)
=\nabla\widehat R(\theta).
$$

GD 每次看 $N$ 个样本，单样本 SGD 看 1 个，小批量看 $B$ 个。一个 epoch 遍历训练集一次，若保留末批，更新次数为 $\lceil N/B\rceil$；当 $N\bmod B>0$ 时末批大小为该余数，否则仍为 $B$。`,
        pitfall:
          "无偏不表示每一步都下降。均值损失的梯度只平均一次；末批样本数少时，整轮平均损失需要按样本数加权。",
        source: "往年题 Q4；W1 第98–104页、W2 第42–48页。",
      },
    ],
    exercises: [
      {
        id: "core-ex-descent",
        title: "一轮更新与学习率",
        prompt: String.raw`对 $x=2,y=3$，模型 $\hat y=wx+b$，损失 $J=(\hat y-y)^2/2$，从 $w=b=0$ 开始。分别用 $\eta=0.1$ 和 $\eta=1$ 做一次同步更新，并重算损失。另有 1000 个样本、batch size 128、保留末批，一轮更新几次，末批多大？`,
        hint: "所有梯度先在 w=b=0 处算齐；比较新旧损失时重新前向。",
        answer: String.raw`初始 $J=4.5$，梯度 $(-6,-3)$。$\eta=0.1$ 得 $(w^+,b^+)=(0.6,0.3)$、$J^+=1.125$；$\eta=1$ 得 $(6,3)$、$J^+=72$。一轮 8 次，末批 104 个。`,
        solution: String.raw`初始残差 $e=0-3=-3$，所以 $\partial_wJ=ex=-6$、$\partial_bJ=e=-3$。

- $\eta=0.1$：$w^+=0.6,b^+=0.3$，新预测为 $1.5$，损失为 $(1.5-3)^2/2=1.125$。
- $\eta=1$：$w^+=6,b^+=3$，新预测为 $15$，损失为 $(15-3)^2/2=72$。

负梯度方向正确仍可能因步长过大而上升。$1000=7\times128+104$，故保留末批时有 8 次更新。`,
        source: "往年题 Q3–4 对应方法；W2 第38–48页的配套自编题。",
        minutes: 5,
      },
    ],
  },
  softmax: {
    formulas: [
      {
        id: "core-softmax-jacobian",
        title: "Softmax 的完整 Jacobian",
        formula: String.raw`$$
p_i=\frac{e^{z_i}}{\sum_k e^{z_k}},\qquad
\frac{\partial p_i}{\partial z_j}=p_i(\mathbf1_{i=j}-p_j),\qquad
J_{p,z}=\operatorname{diag}(p)-pp^\top.
$$`,
        context:
          "单样本 logits z 与概率 p 都是 C 维列向量；Jacobian 的行对应输出概率，列对应输入分数。",
        task: "用商法则分别推 i=j 与 i≠j 两种情形，组合成矩阵；证明全部分数加同一常数不改变概率。",
        hint: String.raw`先令 $S=\sum_ke^{z_k}$；不论 i、j 是否相等，分母对 $z_j$ 的导数都是 $e^{z_j}$。`,
        derivation: String.raw`$$
\frac{\partial p_i}{\partial z_j}
=\frac{\mathbf1_{i=j}e^{z_i}S-e^{z_i}e^{z_j}}{S^2}
=\mathbf1_{i=j}p_i-p_ip_j.
$$

因此对角元为 $p_i(1-p_i)$，非对角元为 $-p_ip_j$。平移不变性来自共同因子约去：

$$
\frac{e^{z_i+a}}{\sum_j e^{z_j+a}}
=\frac{e^a e^{z_i}}{e^a\sum_je^{z_j}}=p_i.
$$

选择 $a=-\max_jz_j$ 可防止指数上溢。另可用 $J\mathbf1=0$ 检验 Jacobian：共同平移方向上的概率变化应为零。`,
        pitfall:
          "Softmax 不是逐元素独立函数：改一个 logit 会影响所有概率。加常数不变，乘常数通常改变分布。",
        source:
          "W1 第111–118页、W2 第54–61页、W3 第3–9页；Jacobian 为课内 Softmax 的逐项推导。",
      },
      {
        id: "core-softmax-ce",
        title: "Softmax 与交叉熵的合成梯度",
        formula: String.raw`$$
\ell=-\sum_i y_i\log p_i,\qquad\sum_i y_i=1
\quad\Longrightarrow\quad \nabla_z\ell=p-y.
$$
$$
z=Wx+b\quad\Longrightarrow\quad
\nabla_W\ell=(p-y)x^\top,\qquad\nabla_b\ell=p-y.
$$`,
        context: String.raw`$W\in\mathbb R^{C\times d}$ 是输出×输入布局。若代码将权重存为 $d\times C$，梯度也要整体转置。`,
        task: "将 log Softmax 展开，直接求 logits 梯度，再推到权重与偏置。",
        hint: "利用标签和为 1，把 log(∑exp z) 前面的系数约成 1；不要重复乘 Softmax 的导数。",
        derivation: String.raw`$$
\begin{aligned}
\ell&=-\sum_i y_i\left(z_i-\log\sum_je^{z_j}\right)\\
&=-\sum_i y_iz_i+\log\sum_je^{z_j},\\
\frac{\partial\ell}{\partial z_k}&=-y_k+\frac{e^{z_k}}{\sum_je^{z_j}}=p_k-y_k.
\end{aligned}
$$

因 $z_k=\sum_jW_{kj}x_j+b_k$，有 $\partial z_k/\partial W_{kj}=x_j$，故

$$
\frac{\partial\ell}{\partial W_{kj}}=(p_k-y_k)x_j,
\quad \nabla_W\ell=(p-y)x^\top,\quad \nabla_b\ell=p-y.
$$

对真实类别 $k$，稳定损失可写成 $m+\log\sum_je^{z_j-m}-z_k$，其中 $m=\max_jz_j$。`,
        pitfall:
          "p−y 是对 logits 的合成梯度；再乘一次 Softmax 导数会算错。若标签不归一化，这个简式不直接成立。",
        source: "W1 第111–118页；W2 第32–36、54–61页；W3 第3–9页。",
      },
    ],
    exercises: [
      {
        id: "core-ex-softmax",
        title: "三分类的一次完整更新",
        prompt: String.raw`设 $x=(1,2)^\top$，真实类别为第 2 类，$W\in\mathbb R^{3\times2}$ 与 $b\in\mathbb R^3$ 初始全为 0。用单样本交叉熵、学习率 0.1、无正则，求初始概率、损失、W 与 b 梯度，并计算同步更新后的 logits 与正确类别概率。`,
        hint: "初始三个分数相同。先求 p−y，再作与 x 的外积。更新后偏置也参与 logits。",
        answer: String.raw`初始概率均为 $1/3$，损失 $\log3$。

$$
\nabla_W\ell=\begin{pmatrix}1/3&2/3\\-2/3&-4/3\\1/3&2/3\end{pmatrix},\qquad
\nabla_b\ell=\begin{pmatrix}1/3\\-2/3\\1/3\end{pmatrix}.
$$

更新后 $z^+=(-0.2,0.4,-0.2)^\top$，正确类概率约 $0.476730$，新损失约 $0.740805$。`,
        solution: String.raw`$$
p-y=\begin{pmatrix}1/3\\-2/3\\1/3\end{pmatrix},\quad
\nabla_W\ell=\begin{pmatrix}1/3&2/3\\-2/3&-4/3\\1/3&2/3\end{pmatrix},\quad
\nabla_b\ell=p-y.
$$

同步更新 $W^+=-0.1\nabla_W\ell$、$b^+=-0.1(p-y)$。因 $x^\top x+1=6$：

$$
z^+=-0.1(p-y)(x^\top x+1)=(-0.2,0.4,-0.2)^\top.
$$

$$
p_2^+=\frac{e^{0.4}}{2e^{-0.2}+e^{0.4}}
=\frac{e^{0.6}}{2+e^{0.6}}\approx0.476730,
\quad\ell^+=-\log p_2^+\approx0.740805.
$$

与初始 $\log3\approx1.098612$ 比较，损失下降。`,
        source:
          "W2 第54–61页的配套自编题；沿用网站 Softmax 示例的输出×输入布局。",
        minutes: 7,
      },
    ],
  },
  networks: {
    formulas: [
      {
        id: "core-activations",
        title: "四种激活函数的导数",
        formula: String.raw`$$
\begin{aligned}
\sigma(z)&=(1+e^{-z})^{-1},&\sigma'(z)&=\sigma(z)(1-\sigma(z)),\\
\tanh z&=\frac{e^z-e^{-z}}{e^z+e^{-z}},&\tanh'(z)&=1-\tanh^2z,\\
\operatorname{ReLU}(z)&=\max(0,z),&\operatorname{ReLU}'(z)&=\mathbf1_{z>0}\ (z\ne0),\\
\operatorname{Softplus}(z)&=\log(1+e^z),&\operatorname{Softplus}'(z)&=\sigma(z).
\end{aligned}
$$`,
        context:
          "激活逐元素作用。ReLU 在 0 处不可微，程序常约定该点反向值为 0；该约定不是通常导数。",
        task: "手推 sigmoid、tanh、Softplus 导数，并解释饱和区与 ReLU 负半轴分别怎样影响梯度。",
        hint: "sigmoid 用复合函数求导；tanh 用商法则后合并平方；Softplus 用 log 的导数。",
        derivation: String.raw`$$
\sigma'(z)=\frac{e^{-z}}{(1+e^{-z})^2}
=\frac1{1+e^{-z}}\left(1-\frac1{1+e^{-z}}\right).
$$

对 tanh，用商法则：

$$
\tanh'(z)=\frac{(e^z+e^{-z})^2-(e^z-e^{-z})^2}{(e^z+e^{-z})^2}
=1-\tanh^2z.
$$

$$
\operatorname{Softplus}'(z)=\frac{e^z}{1+e^z}=\sigma(z).
$$

ReLU 在正半轴是恒等函数，导数 1；负半轴恒为 0，导数 0。sigmoid/tanh 在大绝对值区域导数接近 0；多层导数相乘可衰减。sigmoid 导数最大为 $1/4$，在 $z=0$ 取到。`,
        pitfall:
          "ReLU 的负半轴可能切断学习路径；不是“所有输入都无梯度”。课件 W3 第27页标作 SwiGLU 的 sigmoid 门式实际是 GLU，勿混背。",
        source: "往年题 Q6；W3 第20–29页；GLU 命名按项目勘误。",
        figure: activationFigure,
      },
      {
        id: "core-forward",
        title: "前向传播、参数量与无激活的退化",
        formula: String.raw`$$
z^{(l)}=W^{(l)}a^{(l-1)}+b^{(l)},\quad
a^{(l)}=\phi_l(z^{(l)}),\quad
P=\sum_{l=1}^L n_l(n_{l-1}+1).
$$`,
        context: String.raw`$W^{(l)}\in\mathbb R^{n_l\times n_{l-1}}$，每个输出神经元有 $n_{l-1}$ 个输入权重和 1 个偏置。此式假定每层都含偏置。`,
        task: "推导全连接参数量；展开没有非线性的两层网络，说明增加线性层是否能得到非线性映射。",
        hint: "按每层矩阵元素数加偏置数计数；代入后一层并展开括号。",
        derivation: String.raw`第 $l$ 层权重有 $n_ln_{l-1}$ 个，偏置有 $n_l$ 个，所以全网相加为 $P$。

两层若均不使用非线性：

$$
\begin{aligned}
f(x)&=W_2(W_1x+b_1)+b_2\\
&=(W_2W_1)x+(W_2b_1+b_2).
\end{aligned}
$$

令 $\widetilde W=W_2W_1$、$\widetilde b=W_2b_1+b_2$，仍只是一个仿射映射。因此深度本身不代替非线性。举例，$2\to3\to1$ 全连接网络含偏置时，参数量为 $3(2+1)+1(3+1)=13$。`,
        pitfall:
          "输出个数不等于参数个数；偏置每个输出一个，不是每条连接一个。有偏置时严格说是仿射映射。",
        source: "W3 第30–41页；W4 第3–5页。参数计数为结构公式的配套整理。",
      },
    ],
    exercises: [
      {
        id: "core-ex-activation",
        title: "推导 Softplus 与 tanh，并判断梯度",
        prompt: String.raw`不查结论，推导 $f(z)=\log(1+e^z)$ 和 $g(z)=\tanh z$ 的导数，计算二者在 $z=0$ 的导数。再求 $h(w)=\operatorname{ReLU}(2w-3)$ 在 $w=1$、$w=2$ 的导数。`,
        hint: "先求激活对其输入的导数，再乘内部仿射式的导数；两处 ReLU 输入均不在 0。",
        answer: String.raw`$f'(z)=\sigma(z)$、$f'(0)=1/2$；$g'(z)=1-\tanh^2z$、$g'(0)=1$；$h'(1)=0$、$h'(2)=2$。`,
        solution: String.raw`Softplus 由链式法则得 $f'(z)=e^z/(1+e^z)$，所以 $f'(0)=1/2$。

tanh 由商法则得

$$
g'(z)=\frac{4}{(e^z+e^{-z})^2}=1-\tanh^2z,
\quad g'(0)=1.
$$

当 $w=1$，ReLU 输入 $2w-3=-1$，局部导数为 0，故 $h'(1)=0\times2=0$。当 $w=2$，输入为 1，故 $h'(2)=1\times2=2$。`,
        source: "往年题 Q6（前两项）；W3 第20–25页。ReLU 小问为自编。",
        minutes: 5,
      },
    ],
  },
  "matrix-chain-rule": {
    formulas: [
      {
        id: "core-matrix-chain",
        title: "向量反传为何要转置",
        formula: String.raw`$$
y=f(x),\quad J_{ij}=\frac{\partial y_i}{\partial x_j},\quad
J\in\mathbb R^{m\times n}
\quad\Longrightarrow\quad\nabla_xL=J^\top\nabla_yL.
$$`,
        context:
          "单样本使用列向量；输出×输入布局的 Jacobian 与课件分母布局互为转置。两种定义都可用，但不能混用。",
        task: "先逐坐标推链式法则，再用微分形式复核形状。若 x 通过两个分支影响损失，该怎样合并？",
        hint: "一个输入坐标会影响所有输出坐标，其贡献要对输出编号求和。",
        derivation: String.raw`$$
\frac{\partial L}{\partial x_j}
=\sum_{i=1}^m\frac{\partial L}{\partial y_i}\frac{\partial y_i}{\partial x_j}
=\sum_iJ_{ij}(\nabla_yL)_i.
$$

这正是 $J^\top\nabla_yL$ 的第 $j$ 项。微分也给出

$$
dy=J\,dx,\quad dL=(\nabla_yL)^\top dy
=(J^\top\nabla_yL)^\top dx.
$$

形状为 $(n\times m)(m\times1)=n\times1$。若 $x$ 同时经 $u(x)$、$v(x)$ 影响 $L$，则相加：

$$
\nabla_xL=J_{u,x}^\top\nabla_uL+J_{v,x}^\top\nabla_vL.
$$`,
        pitfall:
          "不要只记“反传总要转置”，先定义 Jacobian 元素。分支贡献相加，不能只沿一条路回传。",
        source: "W3 第53–56页；W4 第7–17页。",
      },
    ],
    exercises: [],
  },
  backprop: {
    formulas: [
      {
        id: "core-bp-delta",
        title: "隐藏层误差项的递推",
        formula: String.raw`$$
\delta^{(l)}=\nabla_{z^{(l)}}L
=\left((W^{(l+1)})^\top\delta^{(l+1)}\right)\odot\phi_l'(z^{(l)}).
$$`,
        context:
          "隐藏层激活逐元素作用；前向为 z⁽ˡ⁾=W⁽ˡ⁾a⁽ˡ⁻¹⁾+b⁽ˡ⁾。误差项是对净输入 z 的梯度，不总等于预测误差。",
        task: "按“后一层线性映射→本层激活”的反向顺序推递推；说明平方损失和 Softmax 交叉熵的输出层入口。",
        hint: "先求 L 对 a⁽ˡ⁾ 的梯度，再求 a⁽ˡ⁾ 对 z⁽ˡ⁾ 的导数。",
        derivation: String.raw`因 $z^{(l+1)}=W^{(l+1)}a^{(l)}+b^{(l+1)}$：

$$
\nabla_{a^{(l)}}L=(W^{(l+1)})^\top\delta^{(l+1)}.
$$

逐元素激活的 Jacobian 是 $\operatorname{diag}(\phi_l'(z^{(l)}))$，故

$$
\delta^{(l)}=\operatorname{diag}(\phi_l'(z^{(l)}))\nabla_{a^{(l)}}L
=\nabla_{a^{(l)}}L\odot\phi_l'(z^{(l)}).
$$

若输出为线性映射且 $L=\|a^{(L)}-y\|^2/2$，入口为 $\delta^{(L)}=a^{(L)}-y$。若输出为 Softmax、损失为交叉熵，入口为 $p-y$，已包含输出激活的导数。`,
        pitfall:
          "必须用后一层 W⁽ˡ⁺¹⁾ 的转置；⊙ 是逐元素乘积，不是内积。课件的层下标按此纠正。",
        source: "W3 第63–67页；W4 第26–30页；依据项目勘误统一层号。",
      },
      {
        id: "core-bp-parameters",
        title: "线性层的参数与输入梯度",
        formula: String.raw`$$
z=Wa+b,\quad\delta=\nabla_zL
\quad\Longrightarrow\quad
\nabla_WL=\delta a^\top,\quad\nabla_bL=\delta,\quad\nabla_aL=W^\top\delta.
$$`,
        context: String.raw`$W\in\mathbb R^{m\times n}$、$a\in\mathbb R^n$、$\delta\in\mathbb R^m$。所有参数梯度在同一组旧参数处计算，之后统一更新。`,
        task: "逐元素推导三条式子，核对每个梯度的形状，并解释为何不能反传到一半就更新权重。",
        hint: "Wᵢⱼ 只直接影响 zᵢ，局部导数为 aⱼ；但一个输入 aⱼ 影响全部输出 zᵢ。",
        derivation: String.raw`由 $z_i=\sum_jW_{ij}a_j+b_i$：

$$
\frac{\partial L}{\partial W_{ij}}=\delta_i a_j,
\quad\frac{\partial L}{\partial b_i}=\delta_i,
\quad\frac{\partial L}{\partial a_j}=\sum_iW_{ij}\delta_i.
$$

将元素排回矩阵/向量，就得到 $\delta a^\top$、$\delta$、$W^\top\delta$。外积形状是 $(m\times1)(1\times n)=m\times n$，与权重相同。

回传 $\nabla_aL$ 时使用前向对应的旧 $W$；提前修改 $W$ 会把不同参数点的局部导数混在一起，不能再称为当前损失的梯度。`,
        pitfall:
          "aδᵀ 的形状与这里的 W 相反；不能把外积写成标量内积。同步更新包括偏置。",
        source: "W3 第57–67页；W4 第19–30页。",
        figure: backpropFigure,
      },
    ],
    exercises: [
      {
        id: "core-ex-six-weight",
        title: "课件六权重例子：从前向到更新",
        prompt: String.raw`图中 $h_1=w_1x_1+w_2x_2$、$h_2=w_3x_1+w_4x_2$、$\hat y=w_5h_1+w_6h_2$。取 $x=(1,0.5)^\top$、标签 $s=4$、$w=(0.5,1.5,2.3,3,1,1)^\top$、$E=(\hat y-s)^2/2$。求前向值、六个梯度，并以学习率 0.1 同步更新后重算损失。`,
        hint: "先求输出误差 e，再算输出层两个梯度；传到 h₁、h₂ 后，各乘对应输入。",
        answer: String.raw`$h_1=1.25,h_2=3.8,\hat y=5.05,E=0.55125$。梯度为 $(1.05,0.525,1.05,0.525,1.3125,3.99)^\top$。新预测 $3.1768328125$，新损失约 $0.3388021093$。`,
        solution: String.raw`输出误差 $e=5.05-4=1.05$。

$$
\partial_{w_5}E=eh_1=1.3125,\qquad
\partial_{w_6}E=eh_2=3.99.
$$

向两个隐藏值传回的梯度为 $ew_5=ew_6=1.05$。再乘输入得到 $\partial_{w_1}E=1.05$、$\partial_{w_2}E=0.525$、$\partial_{w_3}E=1.05$、$\partial_{w_4}E=0.525$。

$$
w^+=(0.395,1.4475,2.195,2.9475,0.86875,0.601)^\top.
$$

用新权重重算：$h_1^+=1.11875$、$h_2^+=3.66875$，于是

$$
\hat y^+=0.86875\times1.11875+0.601\times3.66875=3.1768328125,
$$

$$
E^+=\tfrac12(3.1768328125-4)^2\approx0.3388021093.
$$

此例没有非线性，适合练计算路径；一般 MLP 的隐藏层还要乘激活导数。`,
        source: "W3 第57–62页；W4 第19–25页原课件数值例。",
        minutes: 9,
        figure: backpropFigure,
      },
    ],
  },
  autodiff: {
    formulas: [
      {
        id: "core-autodiff",
        title: "计算图中的局部相乘与分支累加",
        formula: String.raw`$$
\bar v=\frac{\partial L}{\partial v},\qquad
\bar v=\sum_{u:\,v\to u}\left(\frac{\partial u}{\partial v}\right)^\top\bar u.
$$`,
        context:
          "从输出标量 L 的伴随值 1 开始，按计算图的逆拓扑序传播。前向保存的中间值用于算局部导数。",
        task: "解释逆序计算、缓存与累加的原因；推导共享节点 L=u²+3u、u=wx 的全部参数梯度。",
        hint: "u 经平方与乘 3 两条支路影响 L；先把两条支路贡献加到 u，再继续传给 w 和 x。",
        derivation: String.raw`令 $r=u^2$、$s=3u$、$L=r+s$。从 $\bar L=1$ 开始：

$$
\bar r=1,\quad\bar s=1,\quad
\bar u=(2u)\bar r+3\bar s=2u+3.
$$

接着使用 $u=wx$：

$$
\partial_wL=\bar u\,x=(2wx+3)x,\qquad
\partial_xL=\bar u\,w=(2wx+3)w.
$$

逆序使所有下游贡献先到齐，再处理上游节点；缓存避免重新计算中间值。前向模式传播输入方向的变化，反向模式传播输出对节点的敏感度；多参数、标量损失的训练适合反向模式。`,
        pitfall:
          "分支贡献必须 +=，不能覆盖；自动微分并非有限差分。原往年 Q7 只有“自动微分”主题，没有给具体函数。",
        source: "往年题 Q7；W3 第68–77页、W4 第31–39页；共享节点例为配套自编。",
        figure: autodiffFigure,
      },
    ],
    exercises: [
      {
        id: "core-ex-autodiff",
        title: "按计算图复算 sigmoid 的反向过程",
        prompt: String.raw`设 $u=wx$、$v=u+b$、$r=-v$、$s=e^r$、$t=1+s$、$f=1/t$。在 $x=1,w=0,b=0$ 处列出全部前向值，再用反向模式求 $\partial f/\partial w$、$\partial f/\partial b$、$\partial f/\partial x$；至少写出 r、s、t 三个节点的反向值。`,
        hint: "从 f 的反向值 1 开始。倒数节点导数为 −1/t²，取负节点导数也为负。",
        answer: String.raw`前向 $(u,v,r,s,t,f)=(0,0,0,1,2,1/2)$；$(\bar t,\bar s,\bar r)=(-1/4,-1/4,-1/4)$；$\partial_wf=1/4,\partial_bf=1/4,\partial_xf=0$。`,
        solution: String.raw`从 $\bar f=1$ 开始：

$$
\begin{aligned}
\bar t&=(-1/t^2)\bar f=-1/4,\\
\bar s&=1\cdot\bar t=-1/4,\\
\bar r&=e^r\bar s=-1/4,\\
\bar v&=(-1)\bar r=1/4,\\
\bar u&=\bar v=1/4,\qquad \bar b=\bar v=1/4,\\
\bar w&=x\bar u=1/4,\qquad\bar x=w\bar u=0.
\end{aligned}
$$

用合成公式复核：$f=\sigma(wx+b)$，所以 $\partial_wf=f(1-f)x=1/4$。这只是结果核对；答计算图题时应写清局部传递过程。`,
        source:
          "W3 第71–73页、W4 第33–36页数值例；对应往年 Q7 的课内复习示例，非原卷完整题干。",
        minutes: 6,
        figure: autodiffFigure,
      },
    ],
  },
  "batch-backprop": {
    formulas: [
      {
        id: "core-batch-bp",
        title: "批量 BP：平均只出现一次",
        formula: String.raw`$$
Z=AW^\top+\mathbf1_Bb^\top,\quad
G=\nabla_ZJ,\quad J=\frac1B\sum_i\ell_i+\frac\lambda2\|W\|_F^2
$$
$$
\nabla_WJ=G^\top A+\lambda W,\qquad
\nabla_bJ=G^\top\mathbf1_B,\qquad
\nabla_AJ=GW.
$$`,
        context: String.raw`$A\in\mathbb R^{B\times n}$，$W\in\mathbb R^{m\times n}$，$Z,G\in\mathbb R^{B\times m}$。这里 G 已含平均目标中的 1/B。`,
        task: "把逐样本外积相加得到矩阵式；证明偏置要沿样本轴求和，并说明 G 已平均时为什么不能再除 B。",
        hint: "看一个权重 Wₖⱼ：它在每行样本中都出现，对应贡献为 GᵢₖAᵢⱼ。",
        derivation: String.raw`因 $Z_{ik}=\sum_jA_{ij}W_{kj}+b_k$，

$$
\frac{\partial J}{\partial W_{kj}}
=\sum_iG_{ik}A_{ij}+\lambda W_{kj},\qquad
\frac{\partial J}{\partial b_k}=\sum_iG_{ik}.
$$

因此得到 $G^\top A+\lambda W$ 与 $G^\top\mathbf1_B$。对输入同理：

$$
\frac{\partial J}{\partial A_{ij}}=\sum_kG_{ik}W_{kj}\quad\Rightarrow\quad\nabla_AJ=GW.
$$

若单样本为半平方误差、输出线性，则 $G=(Z-Y)/B$；若是 Softmax 交叉熵，则 $G=(P-Y)/B$。后续矩阵乘法直接求和即可，重复平均会把数据梯度额外缩小 B 倍。`,
        pitfall:
          "另一合法约定是 Δ 不平均、参数梯度最后除 B；两种约定不能混用。偏置形状是输出维，不是批量大小。",
        source: "W4 第26–30页单样本 BP 的批量推广；平均约定为网站补充说明。",
      },
    ],
    exercises: [
      {
        id: "core-ex-batch",
        title: "两个样本：损失、正则与同步更新",
        prompt: String.raw`设 $X=\begin{pmatrix}1&2\\3&4\end{pmatrix}$、$W=(1,-1)$、$b=0.5$、$Y=(0,1)^\top$。预测 $Z=XW^\top+b\mathbf1$，目标 $J=\|Z-Y\|^2/(2B)+0.2\|W\|^2/2$，$B=2$。求目标、W 与 b 梯度，学习率 0.1 更新后的参数与新目标。`,
        hint: "先算残差，除 B 得到 G。正则只加到 W 梯度，且只加一次。",
        answer: String.raw`$J=0.825$，$\nabla_WJ=(-2.3,-3.7)$、$\partial_bJ=-1$；更新后 $W^+=(1.23,-0.63)$、$b^+=0.6$，$J^+=0.42043$。`,
        solution: String.raw`预测为 $Z=(-0.5,-0.5)^\top$，残差为 $(-0.5,-1.5)^\top$。

$$
J=\frac{0.25+2.25}{4}+\frac{0.2}{2}(1^2+(-1)^2)=0.825.
$$

$$
G=(-0.25,-0.75)^\top,\quad G^\top X=(-2.5,-3.5).
$$

加上 $0.2W=(0.2,-0.2)$ 得 $\nabla_WJ=(-2.3,-3.7)$；$\partial_bJ=-0.25-0.75=-1$。同步更新得到 $W^+=(1.23,-0.63),b^+=0.6$。

新预测为 $(0.57,1.77)^\top$，新残差为 $(0.57,0.77)^\top$，因此

$$
J^+=\frac{0.57^2+0.77^2}{4}+0.1(1.23^2+(-0.63)^2)
=0.22945+0.19098=0.42043.
$$`,
        source: "W4 第26–30页的配套自编批量题，与网站批量反传正文一致。",
        minutes: 7,
      },
    ],
  },
};
