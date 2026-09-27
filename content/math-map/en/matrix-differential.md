## A matrix can be one input

Matrix differentiation asks how an output changes when every entry of an input matrix moves. Rather than guessing a “matrix denominator,” first write the linear change caused by a perturbation. For scalar outputs, identify the gradient through an inner product.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $X\in\mathbb R^{m\times n}$ | Input matrix | $m$ rows and $n$ columns |
| $H,dX$ | Perturbation | Same shape as $X$ |
| $DF(X)[H]$ | Derivative applied to $H$ | A linear map on perturbations |
| $df$ | Scalar differential | A first-order output change |
| $\operatorname{tr}$ | Trace | Sum of diagonal entries |
| $\nabla_X f$ | Matrix gradient | Same shape as $X$ |
| $T,\|\cdot\|_F$ | Transpose and Frobenius norm | The norm squares and sums entries |

Differentiability means $F(X+H)=F(X)+DF(X)[H]+o(\|H\|_F)$.

## Preserve multiplication order

The product rule is $d(AB)=(dA)B+A(dB)$. Thus
$$
d(X^2)=(dX)X+X(dX),
$$
which is generally not $2X\,dX$.

Take $X=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ and $H=\begin{pmatrix}0&0\\0.1&0\end{pmatrix}$. Then
$$
XH=\begin{pmatrix}0.2&0\\0.1&0\end{pmatrix},\quad
HX=\begin{pmatrix}0&0\\0.1&0.2\end{pmatrix}.
$$
Their sum differs from $2XH$. Here $H^2=0$, so the linear change is also exact; generally the remaining term is $H^2$.

## Read the gradient from the differential

Our convention is
$$
df=\operatorname{tr}((\nabla_Xf)^TdX).
$$
For $f(X)=\frac12\operatorname{tr}(X^TX)$, the product rule gives $df=\operatorname{tr}(X^TdX)$, hence $\nabla_Xf=X$.

At $X=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, increase only the bottom-right entry by $0.01$. The predicted loss increase is $0.04$; the exact increase is $0.04005$.

Trace permits cyclic rotation of factors, not arbitrary rearrangement. Also, constrained matrix inputs do not allow arbitrary independent entry perturbations: symmetry or orthogonality must be accounted for.

## Exercises

1. Differentiate $AXB$ for constant matrices $A,B$ and verify the dimensions.
2. Find the gradient of $\operatorname{tr}(C^TX)$ for constant $C$ with the same shape as $X$.

<!-- solutions -->

### Exercise 1

The differential is $A(dX)B$. If the shapes are $p\times m$, $m\times n$, and $n\times q$, the result has shape $p\times q$.

### Exercise 2

The differential is $\operatorname{tr}(C^TdX)$, so the gradient is $C$.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Derivatives as operators

The Fréchet derivative of a matrix-valued map is a linear operator between matrix spaces. Only a scalar-valued differential is represented by a same-shaped gradient through the chosen inner product.

Under column-major vectorization, $H\mapsto AHB$ has coordinate matrix $B^T\otimes A$, where $\otimes$ is the Kronecker product. Its Frobenius adjoint sends $G$ to $A^TGB^T$. This identity follows from $\langle G,AHB\rangle_F=\langle A^TGB^T,H\rangle_F$ and is the basis for reverse propagation without constructing a full Jacobian.

Derivative composition follows forward order; adjoints compose in reverse order. Symmetric spaces, manifolds, and complex matrices require their corresponding tangent spaces and inner products. Numerator-layout and denominator-layout conventions can transpose displayed Jacobians; comparing their action on perturbations resolves the ambiguity.
