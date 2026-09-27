## Choose a direction, then measure change per unit distance

Partial derivatives use coordinate axes. A directional derivative permits any chosen direction, like comparing slopes east, north and northeast on a landscape.

Normalize the direction first if you want a change per unit distance. Otherwise the result mixes direction with the speed of your parameterization.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f,x$ | Scalar function and base point | Output may represent height |
| $u$ | Unit direction | Here $\Vert u\Vert_2=1$ |
| $t$ | Signed distance parameter | Unit direction makes this a distance scale |
| $D_uf$ | Directional derivative | Subscript specifies direction |
| $\nabla f,T$ | Euclidean gradient and transpose | Their product with $u$ forms an inner product |
| $\theta$ | Angle with a nonzero gradient | Undefined as a preferred direction when the gradient vanishes |

$$
D_uf(x)=\lim_{t\to0}\frac{f(x+tu)-f(x)}t.
$$

Differentiability gives $D_uf=\nabla f^Tu$. Merely having coordinate partials does not justify using this formula.

## Numerical example

For $f(x,y)=x^2+2y^2$ at $(1,1)$, the gradient is $(2,4)^T$. Direction $(3,4)^T$ has length five, so use $u=(3/5,4/5)^T$.

The directional derivative is $22/5=4.4$. Travelling distance $0.01$ changes coordinates by $(0.006,0.008)^T$. The predicted function change is $0.044$; the exact change is $0.044164$, with quadratic remainder $0.000164$.

Using the unnormalized vector would produce twenty-two. That is the rate per unit of a path parameter moving five distance units at a time, not the same unit-distance slope.

## Fastest ascent and zero first-order change

For a unit direction, $D_uf=\|\nabla f\|_2\cos\theta$. Alignment with the gradient maximizes this at its norm; opposite alignment gives steepest descent. Perpendicular directions have zero first-order change.

At a zero gradient, every directional derivative is zero under differentiability, but quadratic change can still be positive or negative.

Some sources use one-sided limits $t\downarrow0$, especially near constraints or for convex functions. These conventions differ from the two-sided definition. Absolute value at zero has a right directional rate of one but no ordinary two-sided derivative.

## Exercises

1. Find the unit-distance rate of $x+2y$ along $(1,1)^T$ and its fastest-ascent direction.
2. In the quadratic example, find a unit direction with zero first-order change. Is the function constant along it?

<!-- solutions -->

### Problem 1

The rate is $3/\sqrt2$. Fastest ascent follows $(1,2)^T/\sqrt5$, with rate $\sqrt5$.

### Problem 2

Choose $(2,-1)^T/\sqrt5$. The gradient inner product is zero, but the quadratic change is $6t^2/5$. First-order flatness does not mean constancy.

Reference: [MIT Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Derivative evaluation and geometry

For a Fréchet differentiable function, directional differentiation evaluates its derivative operator on a vector. Unit normalization is an additional convention for comparing equal-distance changes. General directional limits need not assemble into a linear map.

The maximum over the Euclidean unit sphere is the gradient norm. With another norm constraint, the corresponding dual norm determines the maximum and the maximizing direction can change. A metric gradient therefore depends on the chosen geometry.

On a smooth constraint manifold, admissible first-order directions lie in the tangent space; Euclidean steepest feasible ascent uses the projected gradient. Inequality boundaries may require tangent cones instead.

Zero first-order change cannot classify higher-order behavior. One-sided convex directional derivatives and subgradients have their own hypotheses and must not be confused with the two-sided differentiable setting.
