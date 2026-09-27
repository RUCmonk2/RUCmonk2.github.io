## Describe how slopes themselves change

The gradient describes first-order change. The Hessian describes how those first derivatives vary with position. Near a stationary point it distinguishes bowl, hill and saddle behavior.

A zero gradient alone does not identify a minimum. Second-order information provides additional, but sometimes still inconclusive, evidence.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f:\mathbb R^n\to\mathbb R$ | Scalar-valued function | A vector output has a more complicated second derivative |
| $x,h$ | Base point and perturbation | Both have input dimension |
| $\nabla f$ | Gradient | Supplies the linear coefficients |
| $H_f$ | Hessian matrix | $H$ abbreviates Hessian, not entropy here |
| $\partial_i\partial_j f$ | Mixed second partial | Symmetry needs regularity |
| $h^TH_fh$ | Quadratic directional contribution | A scalar, not an entrywise square |
| $\lambda_i$ | Curvature eigenvalues | Their signs classify principal directions |
| $o(\Vert h\Vert^2)$ | Error negligible at quadratic scale | Uniform over small approaches |

$$
f(x+h)=f(x)+\nabla f(x)^Th+\frac12h^TH_f(x)h+o(\|h\|^2).
$$

The factor one-half is the second-order Taylor factorial.

## Construct and evaluate a Hessian

For $f(x,y)=x^2+xy+2y^2$, the gradient is $(2x+y,x+4y)^T$, and

$$
H_f=\begin{pmatrix}2&1\\1&4\end{pmatrix}.
$$

At the origin, the value and gradient vanish. For $h=(0.1,-0.2)^T$, the quadratic form is $0.14$, so the predicted function change is $0.07$. Direct substitution gives $0.01-0.02+0.08=0.07$. Quadratic functions have exact second-order models.

This Hessian is positive definite: its first leading principal minor is two and determinant seven. The origin is a strict minimum. In contrast, $x^2-y^2$ has Hessian $\operatorname{diag}(2,-2)$ and a saddle at the origin.

First check stationarity before applying this classification. A nonzero linear term dominates sufficiently small perturbations.

A zero eigenvalue can leave the test inconclusive. Both $x^4$ and $-x^4$ have zero second derivative at zero, but opposite extrema. Coordinate units also affect Hessian magnitudes; raw entries are not scale-independent curvature summaries.

## Exercises

1. Find the Hessian of $3x^2+2xy+3y^2$, classify the origin and evaluate the quadratic prediction for $(0.1,0.1)^T$.
2. Find the Hessian of $x^4+y^4$ at zero. Is the point nevertheless a strict minimum?

<!-- solutions -->

### Problem 1

The Hessian is $\begin{pmatrix}6&2\\2&6\end{pmatrix}$ with eigenvalues eight and four. It is positive definite, and the quadratic prediction is $0.08$, agreeing exactly with the function.

### Problem 2

The Hessian is zero, so the second-order test is inconclusive. Directly, every nonzero input makes at least one fourth power positive, proving a strict global minimum.

Reference: [MIT Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Bilinear second derivative

For $C^2$ scalar functions, $D^2f(x)[u,v]=u^TH_f(x)v$ is symmetric bilinear. The Taylor quadratic term evaluates it twice on the same perturbation and divides by two.

At an interior local minimum, zero gradient and semidefinite Hessian are necessary. At a stationary point, definite Hessian is sufficient for a strict extremum; an indefinite Hessian yields a saddle. Degenerate semidefinite cases require more information.

On an open convex domain, a twice differentiable function is convex exactly when its Hessian is semidefinite everywhere. A condition at one point does not imply global convexity.

Newton steps solve $H_fp=-\nabla f$. Indefinite curvature may produce a non-descent direction, motivating damping or trust regions. Hessian-vector products can avoid forming the full matrix.

Numerical symmetry is a useful implementation check, but not proof that all derivatives are correct. Nonsmoothness, noisy evaluations and coordinate scaling affect interpretation.
