## One vector describing every local slope

For a differentiable scalar function, the gradient packages first-order sensitivity to all input coordinates. Its inner product with a small displacement predicts the output change. In ordinary Euclidean geometry it points uphill as steeply as possible per unit distance.

That geometric statement depends on how distance is measured. Rescaling coordinates or assigning different movement costs changes what “steepest” means.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f$ | A scalar-valued function | A vector-valued derivative is generally a Jacobian |
| $x\in\mathbb R^n$ | Current input | A column vector with $n$ coordinates |
| $\nabla f(x)$ | Gradient | Coordinate partial derivatives, as a column |
| $h$ | Small displacement | Used in the linear approximation |
| $df$ | Differential | A linear functional rather than a vector |
| $u$ | Unit direction | Separates direction from speed |
| $\eta$ | Positive step size | A common optimization convention |
| $T$ | Transpose | Turns the product into an inner product |

$$
f(x+h)=f(x)+\nabla f(x)^Th+o(\|h\|).
$$
The remainder divided by displacement length tends to zero. Existence of separate partial derivatives alone does not ensure this approximation.

## Work through a quadratic

Let $f(x,y)=x^2+2y^2$ at $(1,2)$. Its gradient is $(2,8)^T$ and its value is nine.

A horizontal step of $0.01$ predicts an increase of $0.02$; the actual increase is $0.0201$. A vertical step of $0.01$ predicts $0.08$; the actual increase is $0.0802$.

For $h=(0.01,-0.02)^T$, the inner product predicts $-0.14$. Direct substitution gives $8.8609$, a change of $-0.1391$. The difference $0.0009$ consists of second-order terms.

## A direction is not a step-size guarantee

The minimum directional derivative over unit directions is $-\|\nabla f\|$. Gradient descent therefore uses
$$
x_{\mathrm{new}}=x-\eta\nabla f(x).
$$
The physical step length is $\eta\|\nabla f\|$, not simply $\eta$.

With $\eta=0.1$, our point moves to $(0.8,1.2)$ and the value becomes $3.52$. With $\eta=1$, it moves to $(-1,-6)$ and the value becomes seventy-three. A locally descending direction can overshoot.

At a regular point of a level curve, its tangent has zero inner product with the gradient. The gradient is therefore normal to that curve. At a zero gradient there is no unique normal supplied by this argument.

## Exercises

1. For $f=3x^2+y^2$ at $(1,-2)$, compute one gradient step with $\eta=0.1$.
2. Classify the origin of $f=x^2-y^2$ by examining coordinate directions, despite its zero gradient.

<!-- solutions -->

### Exercise 1

The gradient is $(6,-4)^T$. The new point is $(0.4,-1.6)$, and the value decreases from seven to $3.04$.

### Exercise 2

The gradient vanishes at the origin, but $f(t,0)=t^2$ and $f(0,t)=-t^2$. Nearby values occur on both sides of zero, so this is a saddle.

Reference: [MIT multivariable calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Representation of the differential

For differentiable $f:U\subset\mathbb R^n\to\mathbb R$, the Euclidean gradient uniquely satisfies $Df(x)[h]=\langle\nabla f(x),h\rangle$. Under the positive-definite metric $\langle a,b\rangle_G=a^TGb$, the same functional is represented by $G^{-1}\nabla f$.

A zero gradient is necessary at an unconstrained interior local extremum. For a differentiable convex function it is sufficient for global optimality; strict convexity provides uniqueness when a minimizer exists.

If the gradient is $L$-Lipschitz on the relevant segment, the descent lemma gives
$$
f(x-\eta\nabla f(x))
\le f(x)-\eta(1-L\eta/2)\|\nabla f(x)\|^2.
$$
Thus $0<\eta<2/L$ decreases the objective away from stationary points. Constraints replace the unrestricted first-order condition with conditions on feasible directions. Nonsmooth objectives require notions such as subgradients rather than an assumed classical gradient.
