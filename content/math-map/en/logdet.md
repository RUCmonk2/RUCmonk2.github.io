## Record volume scaling additively

A determinant describes signed volume scaling. Taking its logarithm turns products into sums and avoids extreme numerical scales. Symmetric positive-definite matrices have positive determinants, so their log determinants are real.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $X$ | Symmetric positive-definite matrix | Eigenvalues are positive |
| $\det X$ | Determinant | Volume scaling |
| $\log$ | Natural logarithm | Base $e$ |
| $\lambda_i$ | Eigenvalues | Directional scaling factors |
| $H,dX$ | Symmetric perturbation | Locally remains inside the domain |
| $L$ | Cholesky factor | $X=LL^T$, positive diagonal |

$$
\log\det X=\sum_i\log\lambda_i,\qquad
d(\log\det X)=\operatorname{tr}(X^{-1}dX).
$$

## A first-order cancellation

For $X=\operatorname{diag}(2,3)$, the log determinant is $\log6\approx1.791759$. Perturb by $H=\operatorname{diag}(0.02,-0.03)$.

The linear change is $0.02/2-0.03/3=0$. However, the new determinant is $2.02\cdot2.97=5.9994$, and the exact log change is $\log(0.9999)\approx-0.000100005$. A vanishing first-order term does not eliminate second-order effects.

If only the first diagonal entry increases by $0.02$, the prediction is $0.01$, while the exact change is $\log(1.01)\approx0.00995033$.

## Derivation and interpretation

Jacobi's identity gives $d(\det X)=\det X\,\operatorname{tr}(X^{-1}dX)$. Applying the scalar logarithm derivative cancels the determinant factor.

The ambient Frobenius gradient is $X^{-T}$. Symmetry reduces it to $X^{-1}$ on the positive-definite cone; the transpose cannot be dropped for arbitrary matrices.

As a positive eigenvalue approaches zero, negative log determinant tends to positive infinity. It is therefore useful as a convex barrier against singularity. By itself it does not impose a finite optimum: maximizing log determinant without size constraints permits unlimited scaling.

For numerical evaluation, Cholesky gives $2\sum_i\log L_{ii}$ without forming a potentially overflowing determinant.

## Exercises

1. Evaluate log determinant and gradient at $\operatorname{diag}(4,9)$.
2. Differentiate $\log\det\operatorname{diag}(2+t,3)$ twice at zero.

<!-- solutions -->

### Exercise 1

The value is $\log36\approx3.583519$ and the gradient is $\operatorname{diag}(1/4,1/9)$.

### Exercise 2

The first derivative is $1/2$, and the second is $-1/4$, expressing diminishing log-volume gains.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Derivatives, domain, and computation

On the symmetric positive-definite cone,
$$
Df(X)[H]=\operatorname{tr}(X^{-1}H),\quad
D^2f(X)[H,K]=-\operatorname{tr}(X^{-1}KX^{-1}H).
$$
For a nonzero symmetric direction, the second directional derivative is $-\|X^{-1/2}HX^{-1/2}\|_F^2<0$. Thus log determinant is strictly concave there and its negative is strictly convex.

For general nonsingular real matrices, $\log|\det X|$ has the same differential and gradient $X^{-T}$, but the positive-definite concavity statement does not automatically extend to this different domain. Singular matrices remain excluded.

Cholesky evaluation and linear solves avoid unnecessary determinant products and explicit inverses. They do not remove near-singular sensitivity. In Gaussian likelihoods, the log determinant combines with a quadratic term; in density transformations it records local volume change through the Jacobian.
