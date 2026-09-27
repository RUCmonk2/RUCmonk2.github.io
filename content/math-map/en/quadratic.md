## Curvature encoded by a matrix

A quadratic form places a vector on both sides of a matrix to produce a scalar. Diagonal entries weight coordinate squares; off-diagonal entries create interactions. Only the symmetric part of the matrix contributes.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $x\in\mathbb R^n$ | Column input | $n$ is the dimension |
| $A$ | Square coefficient matrix | It need not initially be symmetric |
| $q$ | Scalar quadratic form | A mnemonic for quadratic |
| $b,c$ | Linear coefficient and constant | Used in a general quadratic |
| $S,K$ | Symmetric and skew-symmetric parts | Defined by splitting $A$ |
| $H,\lambda_i$ | Hessian and eigenvalues | Describe curvature |

$$
q(x)=x^TAx=\sum_{i,j}A_{ij}x_ix_j.
$$
For symmetric off-diagonal entries, each cross term appears twice.

## A nonsymmetric example

Let $A=\begin{pmatrix}1&2\\0&3\end{pmatrix}$. Then $q=x_1^2+2x_1x_2+3x_2^2$. At $(1,2)^T$, its value is seventeen and its gradient is $(6,14)^T$.

The correct matrix formula is $\nabla q=(A+A^T)x$. Using $2Ax$ would incorrectly give $(10,12)^T$. Increasing the first coordinate by $0.01$ predicts a change of $0.06$; the actual change is $0.0601$.

## Derive rather than memorize

The product rule gives
$$
dq=(dx)^TAx+x^TA\,dx=x^T(A^T+A)dx.
$$
Comparing with $(\nabla q)^Tdx$ identifies the gradient.

Write $S=(A+A^T)/2$ and $K=(A-A^T)/2$. Since $K^T=-K$, the scalar $x^TKx$ equals its own negative and is zero. Consequently $x^TAx=x^TSx$.

## Why the factor one-half is common

For symmetric $A$, write $f(x)=\frac12x^TAx-b^Tx+c$. Its gradient is $Ax-b$ and Hessian is $A$. Positive definiteness gives a unique minimizer solving $Ax=b$.

With $A=\operatorname{diag}(2,4)$, $b=(2,8)^T$, and $c=0$, the minimizer is $(1,2)^T$ with value negative nine. A quadratic objective need not be a nonnegative error. In computation, solve the linear system rather than explicitly forming an inverse.

## Exercises

1. Differentiate $x^T\operatorname{diag}(2,5)x$ at $(1,-1)$.
2. Minimize $\frac12x^TAx-b^Tx$ with $A=\operatorname{diag}(1,2)$ and $b=(3,4)^T$.

<!-- solutions -->

### Exercise 1

The gradient is $(4,-10)^T$ and Hessian is $\operatorname{diag}(4,10)$.

### Exercise 2

The minimizer is $(3,2)^T$. The value is $\frac12(9+8)-(9+8)=-8.5$.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Spectral structure and optimization

A real quadratic form depends only on the symmetric part of its matrix. Orthogonal diagonalization of that part expresses the form as a sum of eigenvalue-weighted coordinate squares. Congruence preserves inertia, rather than generally preserving individual eigenvalues.

For symmetric $A$, the objective $\frac12x^TAx-b^Tx+c$ has a finite global minimum exactly when $A$ is positive semidefinite and $b$ lies in its range. A negative-curvature direction gives quadratic unboundedness; a null direction with nonzero linear coefficient gives linear unboundedness.

When a minimum exists, all minimizers are $A^\dagger b+\ker A$, using the Moore–Penrose pseudoinverse. The minimum value is $c-\frac12b^TA^\dagger b$. Positive definiteness gives uniqueness.

A Hessian-based local Taylor model has this form. Indefinite Hessians or overly long steps require damping, trust regions, or other safeguards; minimizing a local model does not automatically minimize the original nonlinear objective.
