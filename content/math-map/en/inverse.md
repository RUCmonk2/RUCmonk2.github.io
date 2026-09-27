## How an inverse responds to a perturbation

An inverse matrix undoes a reversible linear transformation. Its derivative tells us how that undoing operation changes when the original coefficients move. The scalar derivative of a reciprocal suggests a negative sign and two inverse factors, but matrix order must be preserved.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $X$ | Invertible square matrix | The formula excludes singular inputs |
| $X^{-1}$ | Inverse | Both products with $X$ equal $I$ |
| $I$ | Identity matrix | The unchanged identity transformation |
| $H,dX$ | Perturbation | Same shape as $X$ |
| $Y$ | Temporary name for $X^{-1}$ | Used in the derivation |
| $\kappa$ | Condition number | Describes relative sensitivity |

Differentiate $XY=I$: $(dX)Y+X(dY)=0$. Multiplying on the left by $X^{-1}$ yields
$$
d(X^{-1})=-X^{-1}(dX)X^{-1}.
$$

## A numerical approximation

Let $X=\operatorname{diag}(2,4)$ and $H=\operatorname{diag}(0.1,-0.2)$. The original inverse is $\operatorname{diag}(0.5,0.25)$. The predicted change is $\operatorname{diag}(-0.025,0.0125)$, giving $\operatorname{diag}(0.475,0.2625)$.

The exact new inverse is $\operatorname{diag}(1/2.1,1/3.8)\approx\operatorname{diag}(0.4761905,0.2631579)$. Higher-order terms explain the difference.

If only the top-right perturbation is $0.1$, left and right inverse factors separately scale its row and column, giving $-0.1/(2\cdot4)=-0.0125$. In fact, the inverse of $\begin{pmatrix}2&0.1\\0&4\end{pmatrix}$ has this exact top-right entry.

## Near singularity

For $X=\operatorname{diag}(1,\varepsilon)$ with small positive $\varepsilon$, one inverse entry is $1/\varepsilon$ and its derivative magnitude is $1/\varepsilon^2$. Sensitivity becomes large. A stable algorithm cannot remove sensitivity already present in the mathematical problem.

To calculate $X^{-1}b$, generally solve $Xy=b$ rather than explicitly forming an inverse. Singular matrices require different objects and additional assumptions.

## Exercises

1. Predict the inverse change for $X=\operatorname{diag}(3,5)$ and $H=\operatorname{diag}(0.03,0)$.
2. Differentiate $y=X^{-1}b$ for fixed $b$ and describe a linear solve implementing the result.

<!-- solutions -->

### Exercise 1

The change is $\operatorname{diag}(-1/300,0)$. The first inverse entry is predicted as $0.33$, while its exact new value is approximately $0.330033$.

### Exercise 2

$dy=-X^{-1}(dX)y$. Compute the right-hand side $-(dX)y$ and solve $X(dy)=-(dX)y$, reusing a factorization if available.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Smooth inversion and adjoints

Inversion is smooth on the open set of nonsingular matrices, with derivative $H\mapsto-X^{-1}HX^{-1}$. For a compatible norm satisfying $\|X^{-1}H\|<1$, the Neumann expansion gives a linear approximation with quadratic remainder. Its bound depends on distance from singularity.

Differentiating $Xy=b$ gives $X\,dy=db-(dX)y$. For an upstream gradient $g$ on $y$, solve $X^Tz=g$. Then the gradients on $b$ and $X$ are $z$ and $-zy^T$ respectively.

For a direct inverse output with upstream matrix gradient $G$, the input gradient is $-X^{-T}GX^{-T}$ under the Frobenius inner product. The pseudoinverse has different differentiability requirements, especially fixed rank; replacing every inverse symbol with a pseudoinverse does not preserve this derivation.
