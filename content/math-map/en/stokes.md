## Small loops leave one outer loop

Stokes' theorem connects local rotation across a surface with total circulation around its boundary. Subdivide the surface into small patches: shared edges are traversed in opposite directions and cancel. Only the exterior boundary remains.

One side accumulates tangential flow around a curve. The other accumulates the normal component of curl across a surface. They calculate the same quantity.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $S$ | Oriented surface | It may be curved |
| $\partial S$ | Boundary curve | Here $\partial$ means boundary |
| $F$ | Vector field | Continuously differentiable nearby |
| $n$ | Chosen unit normal | Induces boundary direction |
| $dr$ | Vector line element | Captures tangential displacement |
| $dS$ | Surface area element | Orientation is supplied by $n$ |
| $\oint$ | Integral around a closed curve | Direction still matters |

$$
\oint_{\partial S}F\cdot dr
=\iint_S(\nabla\times F)\cdot n\,dS.
$$
For an upward normal on a horizontal disk, positive boundary traversal is counterclockwise from above. Reversing the normal requires reversing the boundary too.

## Calculate both sides

Let $F=(-y/2,x/2,0)$ and take the upward-oriented disk of radius two. Curl is $(0,0,1)$, so its normal flux is simply the area $4\pi$.

Parameterize the circle by
$$
r(t)=(2\cos t,2\sin t,0),\qquad0\le t\le2\pi.
$$
The parameter $t$ need not represent physical time. We have $r'(t)=(-2\sin t,2\cos t,0)$ and $F(r(t))=(-\sin t,\cos t,0)$. Their inner product is two. The line integral is therefore $\int_0^{2\pi}2\,dt=4\pi$.

## Choosing a simpler surface

Two admissible oriented surfaces with the same directed boundary have the same curl flux because both equal the boundary integral. This often replaces a curved surface with a flat disk.

Admissible matters: a field singular at the origin cannot be treated as smooth on a disk through the origin. A curl-free field around a hole can still have nonzero circulation around that hole.

Green's theorem is the planar version. The divergence theorem instead connects volume divergence to flux through a closed surface. Their dimensions and integrands differ even though both express an interior-to-boundary principle.

## Exercises

1. Change the radius to three. Find counterclockwise and clockwise circulation.
2. For $F=\nabla f$ with $f=x^2+y^2+z^2$, evaluate circulation along a closed smooth curve in two ways.

<!-- solutions -->

### Exercise 1

The normal curl remains one. The answers are $9\pi$ and $-9\pi$.

### Exercise 2

The line integral is the final potential minus the initial potential, hence zero. Alternatively, curl of this gradient vanishes, so Stokes gives zero on an admissible spanning surface.

Reference: [MIT multivariable calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Classical and generalized statements

For a compact oriented piecewise smooth surface $S$, with induced boundary orientation, and a $C^1$ vector field on an open neighbourhood of $S$,
$$
\int_{\partial S}F\cdot dr=\int_S\operatorname{curl}F\cdot n\,dS.
$$
Every boundary component must be included. Inner holes induce the opposite traversal to an outer boundary. Smoothness only along the boundary is insufficient; it is needed near the spanning surface.

The differential-form statement is $\int_M d\omega=\int_{\partial M}\omega$, with an oriented manifold $M$, a form $\omega$ of degree one less than its dimension, and suitable compactness or support assumptions. The exterior derivative $d$ unifies familiar derivative operators. The identity $d^2=0$ underlies curl-gradient and divergence-curl identities.

Surface replacement requires checking regularity on each proposed surface. Singularities may be removed with additional inner boundaries, whose integrals must be retained even when the removed sets have vanishing area or volume.
