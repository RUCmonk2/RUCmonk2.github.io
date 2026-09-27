## Compare a point with its neighbours

The Laplacian adds second-order changes across coordinate directions. A value below its local neighbourhood average tends to have positive Laplacian; a value above that average tends to have negative Laplacian. This connects calculus with diffusion, image smoothing, and graph propagation.

We use the continuous convention with positive second derivatives. The common positive-semidefinite graph Laplacian corresponds to its negative, so signs must be checked.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f$ | Scalar field | Temperature or height |
| $\Delta f$ | Laplacian | A conventional operator symbol |
| $\nabla^2 f$ | An alternative notation | Context may instead mean a Hessian |
| $f_{xx}$ | Second derivative in one coordinate | Not the square of the first derivative |
| $h$ | Sampling distance | Positive in the difference formula |
| $t,\kappa$ | Time and diffusion coefficient | $\kappa>0$ |
| $L$ | Graph Laplacian | Degree matrix minus adjacency |

In two-dimensional Cartesian coordinates, $\Delta f=f_{xx}+f_{yy}$. This is different from $\|\nabla f\|^2=f_x^2+f_y^2$.

## Compute from four neighbours

For $f=x^2+y^2$ at the origin and $h=0.1$, all four axis-aligned neighbours have value $0.01$. Their sum is $0.04$. Subtract four times the central value, zero, then divide by $h^2=0.01$. The result is four, agreeing with $2+2$ from differentiation.

For a general smooth function,
$$
\Delta f(x,y)\approx\frac{f(x+h,y)+f(x-h,y)+f(x,y+h)+f(x,y-h)-4f(x,y)}{h^2}.
$$
It is exact for this quadratic because higher-order terms vanish.

The bowl $x^2+y^2$ has positive Laplacian; its negative has negative Laplacian. The saddle $x^2-y^2$ has zero Laplacian but is not flat. Functions satisfying $\Delta f=0$ are called harmonic.

## Why heat smooths out

The heat equation is $\partial_t f=\kappa\Delta f$. A cold point relative to its neighbours warms up, and a hot point cools. If length is measured in metres and time in seconds, $\kappa$ has units of square metres per second.

For a three-node chain with values $(0,2,0)^T$, the graph matrix $L=D-A$ gives $Lf=(-2,4,-2)^T$. The update $f_{\mathrm{new}}=f-\tau Lf$ with $\tau=0.1$ yields $(0.2,1.6,0.2)^T$. Values spread while the sum remains two.

## Exercises

1. Find the Laplacian of $3x^2-y^2+5x$.
2. Apply the same graph update to $(1,0,1)^T$.

<!-- solutions -->

### Exercise 1

Second derivatives are six and negative two, giving four. The linear term contributes zero.

### Exercise 2

$Lf=(1,-2,1)^T$, so the new vector is $(0.9,0.2,0.9)^T$, again preserving the sum.

Reference: [MIT multivariable calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Continuous and discrete operators

The Euclidean Laplacian is the trace of the Hessian. Under boundary conditions eliminating boundary terms, integration by parts yields $\int f(-\Delta f)=\int\|\nabla f\|^2$, explaining the nonnegative energy of the negative Laplacian.

Harmonic functions satisfy local mean-value properties. Zero Laplacian constrains the sum of curvatures, not every Hessian entry. Diffusion additionally depends on boundary conditions, which determine conservation and steady states.

For an undirected graph with nonnegative symmetric adjacency weights $A$ and degree matrix $D$, $L=D-A$ satisfies
$$
u^TLu=\frac12\sum_{i,j}A_{ij}(u_i-u_j)^2\ge0.
$$
Here $u$ is a vector of node values. The kernel contains constants and has dimension equal to the number of connected components. Normalized graph Laplacians use different degree factors and have different stationary representations. Central spatial differences can be second-order accurate under sufficient smoothness; explicit time stepping also requires a stability restriction.
