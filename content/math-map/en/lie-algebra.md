## Infinitesimal directions near the identity

A Lie algebra is a linear space describing a Lie group's motion near identity. Its elements are directions or velocities, not completed transformations. A bracket additionally records how different directions fail to commute.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $G,\mathfrak g$ | Group and Lie algebra | Fraktur lowercase names the algebra |
| $I$ | Identity matrix | Base point of the tangent space |
| $A,B$ | Infinitesimal directions | Velocities of curves through identity |
| $[A,B]$ | Lie bracket | $AB-BA$ for matrix groups |
| $\exp(tA)$ | One-parameter subgroup | $t$ is a real parameter |
| $\mathfrak{so}(n)$ | Rotation Lie algebra | Real skew-symmetric matrices |

Differentiating $R(t)^TR(t)=I$ at $R(0)=I$ gives $A^T+A=0$. Thus infinitesimal rotation directions are skew-symmetric.

## A planar calculation

Every such two-dimensional matrix has the form
$$
A=\begin{pmatrix}0&-a\\a&0\end{pmatrix}.
$$
For $a=2$, $\exp(tA)$ rotates by $2t$. At $t=0.1$, the linear prediction for $(1,0)^T$ is $(1,0.2)^T$, while the exact result is approximately $(0.9800666,0.1986693)^T$.

All planar generators are multiples of one matrix, so their brackets vanish.

## Three-dimensional noncommutativity

Let
$$
A=\begin{pmatrix}0&0&0\\0&0&-1\\0&1&0\end{pmatrix},\quad
B=\begin{pmatrix}0&0&1\\0&0&0\\-1&0&0\end{pmatrix}.
$$
They generate rotations about the first and second axes. Their bracket is
$$
[A,B]=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix},
$$
the third-axis generator.

The small group commutator $\exp(tA)\exp(tB)\exp(-tA)\exp(-tB)$ first differs from identity by $t^2[A,B]$. The order effect begins at second order.

A Lie algebra is closed under linear combinations and brackets, not necessarily ordinary matrix multiplication. Conversely, adding rotation matrices generally leaves the rotation group.

## Exercises

1. Compute $[A,3A]$.
2. Is $\begin{pmatrix}0&-2\\2&0\end{pmatrix}$ an element of $\mathfrak{so}(2)$? Is it itself a rotation?

<!-- solutions -->

### Exercise 1

The result is zero because both products are $3A^2$.

### Exercise 2

It is skew-symmetric and belongs to the algebra. Its transpose times itself is $4I$, so it is not orthogonal and is not a rotation matrix.

Reference: [Geometric Deep Learning](https://geometricdeeplearning.com/).

<!-- formal -->

## Brackets and local group structure

A Lie algebra is a vector space with a bilinear antisymmetric bracket satisfying
$$
[A,[B,C]]+[B,[C,A]]+[C,[A,B]]=0,
$$
the Jacobi identity. Matrix Lie algebras use commutators. Abstract Lie groups obtain the bracket from left-invariant vector fields, with sign conventions requiring care if right-invariant fields are used instead.

Locally, the Baker–Campbell–Hausdorff expansion begins
$$
\log(\exp A\exp B)=A+B+\tfrac12[A,B]+\cdots.
$$
Convergence and logarithm branches require an appropriate local setting. Commuting elements reduce the product to $\exp(A+B)$.

Lie algebras capture local structure but do not uniquely determine global topology. Different groups may share an isomorphic algebra. Differentials of group homomorphisms preserve brackets; integrating algebra homomorphisms back to groups requires global conditions. Local generator constraints alone do not automatically establish equivariance across disconnected group components.
