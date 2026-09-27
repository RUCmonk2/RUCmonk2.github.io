## One linear rule for simultaneous input changes

Partial derivatives move one coordinate at a time. The total differential predicts first-order output change when all coordinates move together.

The same linear rule must work for every sufficiently small perturbation, with error negligible relative to perturbation length. Separate directional observations are not enough.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f:\mathbb R^n\to\mathbb R^m$ | Function with possibly multiple outputs | Input and output dimensions may differ |
| $x,h$ | Base point and whole perturbation vector | Several coordinates can change simultaneously |
| $Df(x)$ | Linear derivative operator | Capital $D$ emphasizes the map |
| $Df(x)[h]$ | Operator applied to a perturbation | Brackets denote evaluation |
| $df,dx$ | Output differential and input perturbation | Distinguish changes from current values |
| $o(\Vert h\Vert)$ | Error negligible relative to input size | Required for every approach |
| $\nabla f,T$ | Euclidean scalar-output gradient and transpose | Gradient column must be transposed to act on a column |

$$
f(x+h)=f(x)+Df(x)[h]+o(\|h\|).
$$

## Numerical calculation

Take $f(x,y)=x^2+xy$ at $(1,2)$ with perturbation $(0.01,-0.02)^T$. The current value is three. Partials there are four and one, giving $df=4\,dx+dy=0.02$. The predicted new value is $3.02$.

The exact value is $1.01^2+1.01(1.98)=3.0199$, leaving error $-0.0001$. Increments, not the original coordinates, belong in the differential.

Expanding a general perturbation gives

$$
f(1+u,2+v)=3+4u+v+u^2+uv.
$$

The remainder is quadratic. Since $|uv|\le(u^2+v^2)/2$, its magnitude is bounded by a constant times the squared perturbation norm. Dividing by the norm makes the ratio vanish, establishing validity in all directions.

The actual change $\Delta f$ and linear differential $df$ generally differ. For linear functions they agree exactly. Vector-valued outputs still have a derivative map, but usually not a single input-shaped gradient; use a Jacobian or operator.

## Exercises

1. Estimate the change in $xy$ from $(2,3)$ to $(2.02,2.99)$ and find the exact error.
2. Compare the differential and exact change for $3x-2y$.

<!-- solutions -->

### Problem 1

$df=3(0.02)+2(-0.01)=0.04$. The exact new value is $6.0398$, so the change is $0.0398$ and remainder $dx\,dy=-0.0002$.

### Problem 2

Both equal $3\,dx-2\,dy$. A linear function has no higher-order remainder, so the prediction is exact even for large perturbations.

Reference: [MIT Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Fréchet derivative

Differentiability means existence of a linear map $L$ such that

$$
\frac{\|f(x+h)-f(x)-Lh\|}{\|h\|}\to0.
$$

Uniqueness follows by comparing two candidates along each fixed direction and scaling toward zero. Finite-dimensional equivalent norms give the same differentiability notion, though gradient representations depend on inner products.

Fréchet differentiability yields directional derivatives linear in the direction. Pointwise directional limits, even when they form a linear map, do not automatically provide uniform control over changing directions.

For scalar output the derivative is a linear functional. A specified inner product supplies its representing gradient. Changing the metric changes that vector, not the differential itself.

Linear error propagation requires a derivative norm bound and remainder control. Composition yields the chain rule through composition of linear maps. Constrained domains require a stated extension or tangent-space interpretation.

Smoothness alone does not guarantee useful first-order accuracy for a large perturbation; curvature and scale must also be considered.
