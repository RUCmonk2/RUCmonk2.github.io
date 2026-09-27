## The closest consistent prediction

Least squares minimizes the sum of squared residuals. Squaring prevents positive and negative errors from cancelling and penalizes large errors strongly. Geometrically, it projects an observation vector onto the space of possible linear predictions.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $A\in\mathbb R^{m\times n}$ | Design matrix | Rows are observations, columns are features |
| $x\in\mathbb R^n$ | Parameters | Often called $\beta$ in statistics |
| $b\in\mathbb R^m$ | Observed targets | Same shape as predictions |
| $r=Ax-b$ | Residual | Prediction minus observation |
| $f$ | Scalar loss | Includes a convenient factor one-half |
| $\lambda$ | Regularization strength | Nonnegative |

$$
f(x)=\frac12\|Ax-b\|_2^2,\qquad \nabla f=A^T(Ax-b).
$$
Setting the gradient to zero gives the normal equations $A^TAx=A^Tb$.

## Fit three points

Fit $y=c+st$ through observations $(0,1),(1,2),(2,2)$. The intercept is $c$, slope is $s$, and input coordinate is $t$:
$$
A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},\quad
x=(c,s)^T,\quad b=(1,2,2)^T.
$$
We obtain $A^TA=\begin{pmatrix}3&3\\3&5\end{pmatrix}$ and $A^Tb=(5,6)^T$. Subtracting the equations gives $2s=1$, so $s=1/2$ and $c=7/6$.

Predictions are $(7/6,5/3,13/6)^T$. Residuals are $(1/6,-1/3,1/6)^T$, whose squared sum is $1/6$; the loss is $1/12$. Their inner product with each feature column is zero, expressing orthogonal projection.

## Uniqueness and computation

Independent columns give a unique parameter solution. Duplicate columns allow different parameters to produce identical predictions. The projected prediction is still unique.

Adding $\lambda\|x\|^2/2$ gives $(A^TA+\lambda I)x=A^Tb$. Positive $\lambda$ guarantees uniqueness but changes the objective by preferring smaller parameters.

Forming $A^TA$ squares the spectral condition number for full-column-rank matrices. Practical solvers often use QR or SVD. Independent equal-variance Gaussian noise connects least squares to maximum likelihood; the algebraic minimizer itself does not require Gaussian noise.

## Exercises

1. Fit one constant to $1,2,6$ and calculate squared residual error.
2. For $A=(1,1)$ and target two, describe all zero-error parameters and the shortest one.

<!-- solutions -->

### Exercise 1

The mean is three. Residuals $(2,1,-3)$ have squared sum fourteen and loss seven.

### Exercise 2

All $x_1+x_2=2$ are solutions. The minimum-norm solution is $(1,1)$.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Projection, weighting, and regularization

Convexity makes the normal equations necessary and sufficient. The full solution set is $A^\dagger b+\ker A$; the pseudoinverse selects the minimum-norm solution. The fitted vector $AA^\dagger b$ is the unique orthogonal projection onto the column space.

A positive-definite weight matrix $W$ gives gradient $A^TW(Ax-b)$ for weighted squared loss. Inverse noise covariance motivates generalized least squares. Ridge regularization adds $\lambda I$ to the Hessian and shrinks weakly determined directions; excluding the intercept requires a different penalty matrix.

The formula involving $(A^TA)^{-1}$ is an algebraic expression, not a recommendation to form an inverse numerically. QR and SVD avoid unnecessary conditioning loss. Gaussian assumptions justify a likelihood interpretation and particular inference formulas; they are not required for the projection identity.
