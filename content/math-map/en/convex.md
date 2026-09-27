## Below every connecting chord

A convex function lies below the line segment joining any two points of its graph. For differentiable convex functions, tangent planes are global lower bounds. A zero gradient therefore identifies a global minimum.

Convexity does not require symmetry, smoothness, or even an attained minimum.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $C$ | Convex domain | Contains segments between its points |
| $x,y$ | Two inputs | Scalars or vectors |
| $\lambda$ | Mixing coefficient | Between zero and one |
| $f$ | Objective | Compare input and output mixtures |
| $\nabla f,H_f$ | Gradient and Hessian | Used when differentiability permits |
| $\mu$ | Strong-convexity constant | Positive uniform curvature bound |

$$
f((1-\lambda)x+\lambda y)\le(1-\lambda)f(x)+\lambda f(y).
$$

## Check a square function

Take endpoints zero and two with $\lambda=1/4$. The mixed input is $0.5$, giving squared value $0.25$. The mixed endpoint height is one.

A single example is not a proof. For arbitrary endpoints, the difference between the right and left sides is $\lambda(1-\lambda)(x-y)^2\ge0$, proving convexity.

For a differentiable convex function,
$$
f(y)\ge f(x)+\nabla f(x)^T(y-x).
$$
The tangent to $x^2$ at one is $2y-1$, and the gap is $(y-1)^2$. If the gradient vanishes, this lower bound directly proves global optimality.

## Several strengths of curvature

Convex functions may have flat regions and multiple minimizers. Strict convexity gives at most one minimizer if one exists. Strong convexity supplies a uniform positive quadratic lower bound.

The function $x^4$ is strictly convex but not globally strongly convex because curvature vanishes at zero. The strictly convex function $e^x$ has no attained minimum on the real line.

For a twice continuously differentiable function on an open convex domain, convexity is equivalent to a positive-semidefinite Hessian everywhere, not merely at one point. A convex objective with nonconvex constraints is not automatically a convex optimization problem.

## Exercises

1. Find a Euclidean strong-convexity constant for $x^2+2y^2$.
2. Is absolute value convex despite its kink at zero?

<!-- solutions -->

### Exercise 1

Its Hessian is $\operatorname{diag}(2,4)$, so two is a valid constant. The unique minimizer is the origin.

### Exercise 2

Yes, by the triangle inequality. Its minimum is zero at the origin; nonsmoothness requires subgradient language rather than an ordinary gradient there.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Characterizations and qualifications

On a convex domain, the differentiable first-order support inequality characterizes convexity. On an open convex domain with continuous second derivatives, it is equivalent to a positive-semidefinite Hessian.

Strong convexity adds $\mu\|y-x\|^2/2$ to the support inequality. It ensures at most one minimizer, while existence still needs appropriate domain and closedness conditions.

For a nonsmooth convex function, zero in the subdifferential characterizes unconstrained global optimality. Constraints add normal-cone or KKT conditions. Local minima are global for convex objectives on convex feasible sets.

Nonnegative sums, pointwise suprema, and affine precomposition preserve convexity with proper domain handling. Arbitrary products and compositions do not. Numerical difficulty still depends on dimension, conditioning, and representation; strong duality additionally requires relevant regularity assumptions.
