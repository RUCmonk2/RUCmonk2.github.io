## 从对角线提取一个整体量

矩阵的迹是主对角元素的和。定义看起来很简单，但它有两个重要用途：把矩阵表达式变成标量，以及在不改变线性变换本质的换基下得到相同数值。矩阵微分中，它还提供了一个方便识别梯度的语言。

迹不记录整个矩阵。很多完全不同的矩阵可以有相同的迹，所以它是一个压缩后的整体指标，不能单独用来判断可逆性、正定性或全部几何行为。

## 每个符号的含义

| 符号 | 含义 | 记号说明 |
| --- | --- | --- |
| $\operatorname{tr}A$ | 方阵 $A$ 的迹，一个标量 | trace 的缩写，运算对象要是方阵 |
| $A_{ii}$ | 第 $i$ 个对角元素 | 两个下标相同表示行号等于列号 |
| $i,j,n$ | 行列索引、维数 | 求和时索引只是局部编号，可以一致改名 |
| $A,B$ | 尺寸兼容的矩阵 | 讨论 $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ 时两乘积都为方阵 |
| $A^T$ | 转置 | 将行与列交换，不表示求逆 |
| $P^{-1}AP$ | 同一个线性变换在另一组基下的矩阵 | $P$ 必须可逆 |
| $\lambda_i$ | 特征值，按代数重数计数 | 迹等于这些特征值的总和，即使矩阵不可对角化 |
| $\langle A,B\rangle_F$ | Frobenius 内积 | 等于逐元素乘积之和，也等于 $\operatorname{tr}(A^TB)$ |

$$
\operatorname{tr}A=\sum_{i=1}^n A_{ii}.
$$

例如 $A=\begin{pmatrix}1&2\\0&3\end{pmatrix}$ 的迹是 $1+3=4$，非对角元素二不直接进入这个求和。

## 为什么可以循环移动乘积

展开矩阵乘法：

$$
\operatorname{tr}(AB)=\sum_i\sum_j A_{ij}B_{ji}
=\sum_j\sum_i B_{ji}A_{ij}
=\operatorname{tr}(BA).
$$

这里交换的是有限标量求和的次序与标量乘法，不是声称矩阵乘法本身可交换。如果 $A$ 是 $m\times n$、$B$ 是 $n\times m$，两边矩阵尺寸甚至可以不同，但迹这个标量相等。

## 用具体数字比较两个乘积

取 $A=\begin{pmatrix}1&2\\0&3\end{pmatrix}$、$B=\begin{pmatrix}4&0\\5&6\end{pmatrix}$：

1. 先算 $AB=\begin{pmatrix}14&12\\15&18\end{pmatrix}$，迹为 $14+18=32$。
2. 再算 $BA=\begin{pmatrix}4&8\\5&28\end{pmatrix}$，迹为 $4+28=32$。
3. 两个乘积矩阵并不相等，只有迹相等。
4. 单独的迹为四和十，它们的乘积是四十，不等于三十二。
5. 因而 $\operatorname{tr}(AB)$ 一般不等于 $\operatorname{tr}(A)\operatorname{tr}(B)$，不能把迹当成普通可拆乘积的括号。

三个因子时可以循环成 $\operatorname{tr}(ABC)=\operatorname{tr}(BCA)=\operatorname{tr}(CAB)$。任意交换两个相邻因子通常不合法，除非另有可交换的理由。

## 迹怎样进入微分

矩阵各元素的变化可以通过一个标量函数汇总。若微分整理成

$$
df=\operatorname{tr}(G^T\,dX),
$$

这表示每个输入元素的变化乘上对应的系数再求和。在 Frobenius 内积下，系数矩阵 $G$ 就是梯度。转置的位置用于匹配元素，漏掉它可能让梯度方向或尺寸出错。

例如 $f(X)=\operatorname{tr}(X)$ 的梯度是单位矩阵：只有对角元素变化会影响迹，非对角变化的系数是零。这种逐元素解释比只背公式更可靠。

## 练习

1. 对 $X=\begin{pmatrix}1&-2\\3&4\end{pmatrix}$，计算 $\operatorname{tr}(X^TX)$，并与元素平方和比较。
2. 设 $P$ 可逆。用循环恒等式证明 $\operatorname{tr}(P^{-1}AP)=\operatorname{tr}(A)$，指出哪一步用了可逆性。

<!-- solutions -->

### 第 1 题

元素平方和为 $1+4+9+16=30$。直接计算 $X^TX$ 的对角元素为十和二十，迹也是三十，所以这正是 Frobenius 范数的平方。

### 第 2 题

循环移动最右侧的 $P$，得到 $\operatorname{tr}(PP^{-1}A)=\operatorname{tr}(IA)=\operatorname{tr}(A)$。可逆性保证逆矩阵存在且 $PP^{-1}=I$。这说明迹是线性算子本身的指标，不依赖特定基。

参考：[MIT 矩阵微分讲义](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/pages/lecture-notes-and-readings/)。

<!-- formal -->

## 线性、循环性与基无关性

迹是方阵空间上的线性泛函。对兼容的矩形因子有 $\operatorname{tr}(AB)=\operatorname{tr}(BA)$，一般乘积可循环轮换，但不能任意重排。由此得到相似不变性。

迹等于特征值按代数重数计数的和，可以由特征多项式系数或 Schur 分解证明，并不要求可对角化。交换子 $[A,B]=AB-BA$ 的迹为零，这也解释某些矩阵方程不可能有解。

## 内积表示与梯度

Frobenius 内积为

$$
\langle A,B\rangle_F=\operatorname{tr}(A^TB)=\sum_{ij}A_{ij}B_{ij}.
$$

于是标量函数的微分与梯度通过 $df=\operatorname{tr}((\nabla_Xf)^T dX)$ 对应。例如 $f(X)=\operatorname{tr}(AXB)$ 在尺寸兼容时有 $df=\operatorname{tr}(BA\,dX)$，所以梯度为 $(BA)^T$。应先检查最终矩阵与输入同形，再用元素方式交叉验证。

## 适用边界

相似变换保持迹，一般左右乘两个不相关的可逆矩阵不保持迹。非方阵本身通常不定义迹，但其与适当矩阵的乘积可以有迹。迹为零不表示矩阵为零，也不表示每个特征值都为零。

在无限维算子理论中，并非所有算子都有良定义的迹；循环性质需要迹类等条件。有限维公式用于无限维情形时，必须先保证相应求和及算子乘积具有所需的收敛性质。

即使两个矩阵的迹都为正，也无法仅凭这两个标量判断乘积的迹的符号；需要结合矩阵结构，而不是只比较迹。
