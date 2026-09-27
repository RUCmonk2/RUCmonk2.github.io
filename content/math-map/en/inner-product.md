## Add geometry to a vector space

Addition and scaling alone do not specify lengths or angles. An inner product adds a rule for comparing directions. The ordinary real dot product multiplies matching components and sums them, producing Euclidean lengths, orthogonality and projections.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $x,y\in\mathbb R^n$ | Real coordinate columns | Dimensions must agree |
| $x_i,y_i$ | Components indexed by $i$ | The index runs from one to $n$ |
| $\langle x,y\rangle$ | Scalar inner product | Angle brackets distinguish it from vectors |
| $x^T$ | Transpose of a column | Real coordinates need no conjugation |
| $\Vert x\Vert_2$ | Euclidean norm | Double bars denote a norm |
| $\theta$ | Angle between nonzero vectors | Its role here is not a model parameter |
| $\operatorname{proj}_y x,r$ | Projection onto a direction and residual | Require $y\ne0$ |

$$
\langle x,y\rangle=x^Ty=\sum_i x_i y_i,\qquad
\|x\|_2=\sqrt{x^Tx}.
$$

An inner product between different vectors may be negative. A squared length cannot. Confusing these statements obscures the geometry.

## Calculate lengths and angles

For $x=(3,4)^T$, $y=(1,0)^T$, the inner product is three and the lengths are five and one. Thus $\cos\theta=3/5$. Angle formulas require nonzero vectors. Normalizing removes scale from dot-product similarity.

## Derive projection rather than memorizing it

Seek the closest point $\alpha y$ on the line through $y$. Its residual must be orthogonal to that line:

$$
\langle x-\alpha y,y\rangle=0,\qquad
\alpha=\frac{\langle x,y\rangle}{\langle y,y\rangle}.
$$

For $x=(2,1)^T$, $y=(1,1)^T$, the numerator is three and the denominator two. The projection is $(1.5,1.5)^T$ and residual $(0.5,-0.5)^T$. Their squared lengths add to $4.5+0.5=5$, the original squared length.

Omitting the denominator works only for a unit direction. Scaling the direction changes the coefficient inversely and leaves the geometric projection unchanged.

A different inner product, such as $x^TMy$ with symmetric positive definite $M$, changes lengths, orthogonality and gradients. Not every norm arises from an inner product; Euclidean projection formulas cannot be applied to arbitrary distance functions.

## Exercises

1. Find the norm of $(1,2,2)^T$ and its inner product with $(2,-1,0)^T$. Are the vectors orthogonal?
2. Project $(4,1)^T$ onto direction $(2,0)^T$. Repeat with direction $(1,0)^T$.

<!-- solutions -->

### Problem 1

The norm is three. The inner product is $2-2+0=0$, so the vectors are orthogonal.

### Problem 2

The first coefficient is $8/4=2$, giving $(4,0)^T$. With the unit direction the coefficient is four, giving the same point. Coefficients depend on scaling; the subspace does not.

Reference: [MIT Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/).

<!-- formal -->

## Orthogonal decomposition

A real inner product is symmetric, bilinear and positive definite. Cauchy–Schwarz gives $|\langle x,y\rangle|\le\|x\|\|y\|$, with equality for linearly dependent vectors.

For a subspace $U$ of a finite-dimensional inner-product space, write uniquely $x=u+r$ with $u\in U$, $r\in U^\perp$. For any $v\in U$,

$$
\|x-v\|^2=\|r\|^2+\|u-v\|^2,
$$

so $u$ is the unique nearest point.

If $Q$ has orthonormal columns spanning $U$, the projector is $QQ^T$. For a full-column-rank basis matrix $A$, it is $A(A^TA)^{-1}A^T$; rank deficiency requires a pseudoinverse or an independent basis.

Gradients represent differentials through a specified inner product. Changing the metric therefore changes the gradient representing the same differential.

Complex inner products require conjugate symmetry and conjugate transpose. In infinite-dimensional Hilbert spaces the projection theorem requires a closed subspace; finite-dimensional subspaces are automatically closed.
