## One symbol, several operations

The symbol $\nabla$, read “nabla” or “del,” groups coordinate derivatives. Its meaning depends on the operation and the type of its argument. A gradient takes a scalar field to a vector field; divergence takes a vector field to a scalar field; curl takes a three-dimensional vector field to another vector field.

Its components are instructions to differentiate, not ordinary numbers. Parentheses therefore determine what the derivatives act on. We begin in Cartesian coordinates, where basis directions do not vary with position.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $x,y,z$ | Cartesian coordinates | Names can change consistently |
| $\partial_x$ | Differentiation with respect to $x$ | Short for $\partial/\partial x$ |
| $\nabla$ | A formal vector of derivatives | The name is conventional, not a definition |
| $f$ | A scalar field | One number at every position |
| $F=(P,Q,R)$ | A vector field | Three components at every position |
| $\cdot,\times$ | Dot and cross constructions | Produce divergence and curl here |
| $\Delta$ | The Laplacian | Also denoted $\nabla^2$ |

$$
\nabla f=(f_x,f_y,f_z),\qquad
\nabla\cdot F=P_x+Q_y+R_z.
$$

Subscripts denote partial derivatives in these formulas. They do not index a collection of observations.

## A numerical comparison

Let $f=x^2+yz$ and $F=(x^2,xy,z)$, evaluated at $(1,2,3)$.

1. $\nabla f=(2x,z,y)=(2,3,2)$: first-order changes of the scalar output with position.
2. $\nabla\cdot F=2x+x+1=4$: local net outward flow per volume.
3. $\nabla\times F=(R_y-Q_z,P_z-R_x,Q_x-P_y)=(0,0,y)=(0,0,2)$: local circulation about the third axis.
4. $\Delta f=f_{xx}+f_{yy}+f_{zz}=2$: a second-order quantity.

The different answers are not alternative notations for one object. The phrase “apply nabla” is incomplete until its operation is specified.

## An operator obeys the product rule

For a scalar field times a vector field,
$$
\nabla\cdot(fF)=\nabla f\cdot F+f\,\nabla\cdot F.
$$
The derivatives act on both factors. The one-dimensional reminder is that differentiating $x\cdot x^2$ gives $3x^2$, not $2x^2$.

For continuous second derivatives, mixed derivatives commute. This gives $\nabla\times\nabla f=0$ and $\nabla\cdot(\nabla\times F)=0$. Reversing such implications requires global assumptions on the domain. A hole can prevent a curl-free field from having a single-valued global potential.

Curvilinear coordinates also need care: an angular increment corresponds to a physical distance that depends on radius. Cartesian formulas cannot be converted to polar formulas by merely renaming coordinates.

## Exercises

1. Find the gradient and Laplacian of $x^2+y^2+z^2$ at $(1,-1,2)$.
2. Compute divergence and curl of $F=(-y,x,0)$. Explain how zero divergence can coexist with nonzero curl.

<!-- solutions -->

### Exercise 1

The gradient is $(2x,2y,2z)$, giving $(2,-2,4)$. Each pure second derivative is two, so the Laplacian is six everywhere.

### Exercise 2

Divergence is zero. Curl is $(0,0,2)$ because its third component is $\partial_x x-\partial_y(-y)=2$. Rotating flow need not create or destroy fluid locally.

Reference: [MIT multivariable calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Differential operators and geometry

In Cartesian Euclidean coordinates, $\nabla$ is a formal vector of first-order operators. The composition $\Delta=\nabla\cdot\nabla$ is the scalar Laplacian. Classical curl-gradient and divergence-curl identities follow from commuting mixed derivatives under sufficient regularity.

A gradient uses a metric to represent the differential as a vector. Divergence uses volume; three-dimensional curl additionally uses orientation. These structures explain the extra terms in curvilinear coordinates. For example,
$$
\Delta f=\frac1r\partial_r(r\partial_r f)+\frac1{r^2}\partial_{\theta\theta}f,\qquad r>0,
$$
in planar polar coordinates, where $\theta$ is the angular coordinate.

Local differential identities do not automatically imply global potential representations. Domain topology and boundary conditions matter. Singular points must be excluded from classical calculations or treated using a suitable weak framework. In numerical work, independently chosen discrete derivatives need not preserve the exact continuous identities.
