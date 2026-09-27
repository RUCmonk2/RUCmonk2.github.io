从起点走到终点的位移，既有长度又有方向，这就是向量的一个直观模型。同样的位移箭头平移到别处，不改变它作为自由向量的含义。向量加法描述连续走两段的总位移，与只把路程长度相加不同。

## 记号与对象

| 记号 | 含义 |
|---|---|
| $\overrightarrow{AB}$ | 从点 $A$ 指向点 $B$ 的向量 |
| $\mathbf a$ | 一个向量的简记 |
| $\lVert\mathbf a\rVert$ | 向量的模，即非负长度 |
| $\mathbf0$ | 零向量，长度零，无确定方向 |
| $\lambda\mathbf a$ | 实数 $\lambda$ 与向量的数乘 |
| $-\mathbf a$ | 与原向量等长反向的向量 |

点是位置，向量是位移；标量是普通数。它们可以联系但不是同一种对象，运算需要看类型。

## 向量相等与相反

两非零向量长度相等、方向相同，则向量相等，即使画在不同位置。长度相等但方向相反时，是互为相反向量，不是相等。

例如从 $(0,0)$ 到 $(2,1)$，与从 $(5,3)$ 到 $(7,4)$ 的位移相同。起点不同不影响自由向量，坐标差都为 $(2,1)$。

## 三角形法则与减法

连续从 $A$ 到 $B$ 再到 $C$，总位移为

$$
\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}.
$$

两箭头首尾相接是加法。若两向量都从同一起点出发，减法 $\overrightarrow{AB}-\overrightarrow{AC}=\overrightarrow{CB}$，方向从减向量终点指向被减向量终点。可写成加相反向量验证，不必靠口诀猜。

## 数乘怎样改变箭头

$\lambda>0$ 时方向不变、长度乘 $\lambda$；$\lambda<0$ 时反向、长度乘 $\lvert\lambda\rvert$；$\lambda=0$ 得零向量。

若 $\mathbf a=(2,-1)$，则 $3\mathbf a=(6,-3)$、$-2\mathbf a=(-4,2)$。数乘不是向量之间的乘法，与稍后数量积需要区分。

## 坐标运算例题

$\mathbf a=(2,3),\mathbf b=(-1,4)$，则 $\mathbf a+\mathbf b=(1,7)$，$\mathbf a-\mathbf b=(3,-1)$。每个分量分别运算，反映水平和竖直位移各自相加。

模长不按同样规则直接相加。取 $\mathbf b=-\mathbf a$，总向量零，模长零，但两段各自走过的路程总和为 $2\lVert\mathbf a\rVert$。这说明总位移和总路程不同。

## 自己试试

1. $A(1,2),B(4,-2)$，求 $\overrightarrow{AB}$ 及其模。
2. $\mathbf a=(1,-3),\mathbf b=(2,1)$，求 $2\mathbf a-\mathbf b$。
3. 已知 $\overrightarrow{AB}=\mathbf a,\overrightarrow{BC}=\mathbf b$，写 $\overrightarrow{CA}$。

<!-- solutions -->

### 第 1 题
终点减起点，得到 $(3,-4)$，模长 $\sqrt{9+16}=5$。

### 第 2 题
$2\mathbf a=(2,-6)$，再减 $(2,1)$ 得 $(0,-7)$。

### 第 3 题
$\overrightarrow{AC}=\mathbf a+\mathbf b$，反向得到 $\overrightarrow{CA}=-(\mathbf a+\mathbf b)$。方向不能省略。

<!-- formal -->

## 自由向量与线性运算

平面自由向量由相同长度和方向的有向线段等价类表示。加法满足交换与结合律，零向量为加法单位元，相反向量提供加法逆元；数乘满足分配律及标量乘法结合规律。

在直角坐标系下，向量以两个坐标分量表示，线性运算逐分量进行。位置向量需要选择原点，而两点差向量不依赖统一平移坐标原点，体现位移与绝对位置的区别。

非零向量共线等价于一向量是另一向量的实数倍。零向量在代数上是任意向量的零倍，常按约定视为与任意向量共线，但它没有几何方向，涉及夹角时应排除。

模是非负标量，不是向量本身。三角不等式 $\lVert\mathbf a+\mathbf b\rVert\le\lVert\mathbf a\rVert+\lVert\mathbf b\rVert$ 比较总位移与分段路程，等号对应同向等条件；不能无条件把向量加法转换为模长加法。
