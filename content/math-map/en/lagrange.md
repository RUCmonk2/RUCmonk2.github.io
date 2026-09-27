## A constrained optimum need not have zero ordinary gradient

When movement is restricted to a curve, an ambient uphill direction may be infeasible. At a regular constrained optimum, the objective has zero first-order change along every feasible tangent direction. Its gradient must therefore be a combination of constraint normals.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f(x)$ | Scalar objective | Distinguish it from constraints |
| $g(x)=0$ | Equality constraints | Move right-hand constants to the left |
| $x\in\mathbb R^n$ | Decision variables | Feasible changes preserve constraints |
| $J_g$ | Constraint Jacobian, size $m\times n$ | One row per constraint |
| $\lambda\in\mathbb R^m$ | Multipliers | Equality multipliers have no fixed sign |
| $\mathcal L$ | Lagrangian | Here $\mathcal L=f-\lambda^Tg$ |
| $\nabla,T$ | Gradient and transpose | Specify which variables are differentiated |

Our sign convention gives

$$
\nabla f=J_g^T\lambda,\qquad g=0.
$$

These are candidate conditions, not an automatic certificate of optimality.

## Closest point on a line

Minimize $x^2+y^2$ subject to $x+y=1$. Gradients give $2x=\lambda$, $2y=\lambda$, so $x=y=1/2$ and $\lambda=1$. The objective is $1/2$.

To verify global optimality independently, substitute $y=1-x$:

$$
x^2+(1-x)^2=2(x-1/2)^2+1/2.
$$

This proves a unique global minimum. The unconstrained minimizer at the origin is irrelevant because it is infeasible.

If the right side becomes $b$, the optimizer is $(b/2,b/2)$ and optimal value $b^2/2$. Its derivative with respect to $b$ is $b$, equal to our multiplier. This sensitivity interpretation requires regularity and the stated sign convention.

## Why regularity cannot be omitted

Minimize $f(x)=x$ subject to $x^2=0$. Zero is the only feasible point and hence a constrained minimizer. Yet the multiplier equation would require $1=\lambda\cdot0$, impossible. The constraint gradient degenerates.

Check a suitable constraint qualification, such as full row rank of the equality-constraint Jacobian, before invoking the theorem.

## Exercises

1. Minimize $x^2+y^2$ subject to $x+y=4$. Find the optimizer, value and multiplier.
2. Find extrema of $x$ on the unit circle. Why do the same multiplier equations produce both types?

<!-- solutions -->

### Problem 1

The point is $(2,2)$, value eight and multiplier four. Completing the square verifies global minimality.

### Problem 2

The equations $(1,0)^T=\lambda(2x,2y)^T$ force nonzero multiplier and $y=0$. Feasibility gives $x=\pm1$. Comparing objective values separates maximum and minimum; the necessary equations alone do not.

Reference: [MIT Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Regularity and tangent spaces

For $C^1$ equality constraints with full-row-rank Jacobian, the feasible tangent space is $\ker J_g$. At a local extremum, the objective differential vanishes on it, yielding

$$
\nabla f\in(\ker J_g)^\perp=\operatorname{im}J_g^T.
$$

Full row rank also makes the multiplier unique. Degenerate constraints may violate this representation at genuine optima.

Second-order tests use the decision-variable Hessian of the Lagrangian restricted to feasible tangent directions. They must include constraint curvature, not just the objective Hessian.

Convex objectives with affine equality constraints turn feasible first-order solutions into global optima; strict convexity adds uniqueness. Inequality constraints require KKT feasibility, multiplier signs, complementary slackness and appropriate qualifications.

Multiplier sensitivity formulas depend on smoothness and sign conventions. Multiple solutions or changes in active constraints can destroy differentiability of the optimal value.
