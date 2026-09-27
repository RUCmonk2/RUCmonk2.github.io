## Preserve combinations of inputs

A linear map preserves addition and arbitrary scalar scaling. This is a structural property, not merely a straight-looking graph. The map $T(x,y)=(2x+y,x-y)$ is linear; $T(x)=2x+1$ is affine but not linear because it does not send zero to zero.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $T:V\to W$ | Map between vector spaces | Transformation is a mnemonic for $T$ |
| $u,v$ | Input vectors | Both must lie in the same space |
| $\alpha,\beta$ | Arbitrary scalars | Negative and zero values are included |
| $A\in\mathbb R^{m\times n}$ | Coordinate matrix | Rows count outputs; columns count inputs |
| $A_{ij}$ | Row $i$, column $j$ entry | Index order matters |
| $x,y$ | Input and output coordinate columns | $y=Ax$ refers to chosen bases |
| $\ker T,\operatorname{im}T$ | Inputs sent to zero, attainable outputs | Kernel and image are subspaces |
| $\operatorname{rank}A$ | Dimension of the image | Not the number of nonzero entries |

$$
T(\alpha u+\beta v)=\alpha T(u)+\beta T(v).
$$

This implies $T(0)=0$, a useful rejection test. Sending zero to zero alone does not prove linearity: squaring also does that.

## Why columns have a meaning

Every input is a linear combination of basis vectors. Linearity sends it to the same combination of their images. Therefore column $j$ records the image of input basis vector $j$.

For our map, the standard basis images are $(2,1)^T$ and $(1,-1)^T$, giving

$$
A=\begin{pmatrix}2&1\\1&-1\end{pmatrix}.
$$

At $x=(3,2)^T$, column combination gives $3(2,1)^T+2(1,-1)^T=(8,1)^T$. Row calculation gives the same two components. Doubling the input doubles the output.

If another transformation $B$ follows $A$, the composite is $BA$: the first operation appears on the right. For $A$ of size $m\times n$ and $B$ of size $k\times m$, the result has size $k\times n$.

## Understand lost information

The projection $(x,y)\mapsto(x,0)$ loses every vertical input component. Its kernel is the vertical axis, and its image is the horizontal axis. Distinct inputs can have identical outputs, so inversion is impossible.

In finite dimensions, input dimension equals kernel dimension plus image dimension. Matrix shape alone does not reveal how many independent directions survive.

## Exercises

1. Given $T(1,0)=(1,2)$ and $T(0,1)=(3,-1)$, construct the matrix and calculate $T(2,-1)$.
2. Find the kernel and rank of $T(x,y)=(x+y,2x+2y)$.

<!-- solutions -->

### Problem 1

$$
A=\begin{pmatrix}1&3\\2&-1\end{pmatrix},\qquad
T(2,-1)=2(1,2)^T-(3,-1)^T=(-1,5)^T.
$$

### Problem 2

The kernel is $\{(t,-t):t\in\mathbb R\}$ and outputs have form $(s,2s)$, so the rank is one. Adding any kernel vector leaves the output unchanged.

Reference: [MIT Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/).

<!-- formal -->

## Coordinate representation

A linear map is uniquely determined by its values on an input basis. With input and output changes of basis $P,Q$, where old coordinates equal the respective change matrix times new coordinates, the new representation is $Q^{-1}AP$. A single-space common basis change yields similarity $P^{-1}AP$.

## Kernel and image

Both are subspaces. Rank-nullity follows by extending a basis of the kernel to a basis of the domain; images of the added basis vectors form a basis of the image:

$$
\dim V=\dim\ker T+\dim\operatorname{im}T.
$$

Injectivity is equivalent to zero kernel; surjectivity means the image equals the codomain. Their equivalence with invertibility is specific to square finite-dimensional representations.

Derivatives are linear maps even when the original function is nonlinear. Jacobians represent these maps in coordinates. Matrix multiplication encodes composition, including its order.

Adjoints depend on inner products. Ordinary transpose represents the adjoint in real Euclidean orthonormal coordinates; a different metric introduces additional metric matrices.
