## Every nonzero direction has positive cost

A quadratic energy $x^TAx$ is positive definite when every nonzero displacement costs strictly positive energy. This is a property of all directions, not of individual matrix entries.

It describes a strictly bowl-shaped quadratic objective, a nondegenerate geometry and an invertible covariance structure.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $A=A^T$ | Real symmetric matrix | Symmetry is included in this lesson's convention |
| $x\ne0$ | Any nonzero real column | Checking coordinate axes alone is insufficient |
| $x^TAx$ | Scalar quadratic form | Input appears twice |
| $A\succ0,A\succeq0$ | Positive definite, positive semidefinite | Not entrywise inequalities |
| $\lambda_i$ | Real eigenvalues | Positivity can be checked spectrally |
| $I,L,\mu$ | Identity, Cholesky factor, positive lower bound | Their roles are defined locally |

$$
A\succ0\iff x^TAx>0\quad\text{for every }x\ne0,\qquad A=A^T.
$$

Semidefiniteness permits zero cost in nonzero directions.

## Prove a case by completing squares

For $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ and $x=(u,v)^T$,

$$
x^TAx=2(u+v/2)^2+\frac32v^2.
$$

Both terms are nonnegative. Simultaneous equality forces $v=0$, then $u=0$. This proves positivity in every nonzero direction. Substitution gives cost two at $(1,-1)^T$ and six at $(1,1)^T$: positive costs need not be equal.

Its eigenvalues are one and three. In orthonormal eigen-coordinates, the quadratic form is a weighted sum of coordinate squares, explaining the equivalence between positive eigenvalues and positive definiteness.

$$
\lambda_{\min}\|x\|^2\le x^TAx\le\lambda_{\max}\|x\|^2.
$$

A tiny positive minimum eigenvalue still allows numerical instability in inversion.

## Reject misleading shortcuts

Positive entries are insufficient: $\begin{pmatrix}1&2\\2&1\end{pmatrix}$ has negative energy in direction $(1,-1)^T$. Positive determinant is also insufficient: $\operatorname{diag}(-1,-1)$ has positive determinant but negative energy everywhere away from zero.

For a symmetric two-by-two matrix, positivity of the first leading principal minor together with the determinant is a valid test. Keeping only the determinant drops an essential requirement.

## Exercises

1. Classify $\begin{pmatrix}1&1\\1&1\end{pmatrix}$ and find a nonzero zero-cost direction.
2. Add $0.1I$. Why does the result become positive definite?

<!-- solutions -->

### Problem 1

The form is $(u+v)^2$, so the matrix is semidefinite but not definite. Direction $(1,-1)^T$ has zero cost.

### Problem 2

The new form is $(u+v)^2+0.1(u^2+v^2)$. The second term is strictly positive for every nonzero input. Diagonal regularization raises the cost floor in every direction.

Reference: [MIT Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/).

<!-- formal -->

## Equivalent characterizations

For a real symmetric matrix, positivity of the quadratic form, positivity of every eigenvalue, factorization $A=B^TB$ with invertible $B$, positivity of all leading principal minors, and a Cholesky factorization with positive diagonal are equivalent.

For semidefiniteness, nonnegative leading principal minors alone do not suffice; all principal minors must be nonnegative.

The Loewner order $A\succeq B$ means $A-B$ is semidefinite and is only a partial order. A positive definite matrix defines an inner product and gives a lower bound $A\succeq\mu I$.

For $\frac12x^TAx-b^Tx$, positive definiteness yields the unique minimizer $A^{-1}b$. With semidefiniteness, the linear term must be compatible with the kernel; otherwise the objective may be unbounded below.

Positive definiteness is not good conditioning. Covariances are automatically semidefinite but may be singular because of insufficient samples or dependent features. Diagonal regularization changes the model as well as repairing invertibility.
