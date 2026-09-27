## Would a tiny paddle wheel turn?

Curl measures local circulation, not merely whether a trajectory bends. Unequal velocities on opposite sides of a tiny paddle wheel can make it rotate. In three dimensions, curl records an axis and a strength. The right-hand rule sets the positive axis direction.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $F=(P,Q,R)$ | Vector field | Components depend on position |
| $\nabla\times F$ | Curl | Cross-product notation organizes derivatives |
| $P_y$ | Partial derivative of $P$ | The subscript is a coordinate |
| $n$ | Unit surface normal | Fixes positive circulation |
| $C,dr$ | Closed curve and vector line element | Tangential displacement |
| $\omega$ | Angular speed in the example | Positive for counterclockwise rotation from above |

$$
\nabla\times F=(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y).
$$
A planar field can be embedded with zero third component; its scalar curl is then $Q_x-P_y$.

## Rigid rotation

For $F=(-\omega y,\omega x,0)$, the relevant derivatives are $Q_x=\omega$ and $P_y=-\omega$. Curl is $(0,0,2\omega)$.

With $\omega=3$ radians per second, the third component is six per second. On the unit circle, tangential speed is three and circumference is $2\pi$, giving circulation $6\pi$. Divide by enclosed area $\pi$ to recover six. Curl is twice the local rigid angular velocity, not equal to it.

## Straight streamlines can still have curl

For shear $F=(ay,0,0)$ with positive constant $a$, upper particles move faster than lower particles. A tiny wheel turns clockwise, and curl is $(0,0,-a)$ even though streamlines are horizontal.

Conversely, the punctured-plane field
$$
F=\left(-\frac{y}{x^2+y^2},\frac{x}{x^2+y^2}\right)
$$
has zero curl away from the origin but circulation $2\pi$ around the unit circle. The missing point obstructs a globally single-valued angle potential.

If $F=\nabla f$ and second derivatives of $f$ are continuous, mixed derivatives cancel and curl vanishes. The reverse conclusion requires assumptions on the domain.

## Exercises

1. Find curl of $(0,x^2,0)$ at $(2,1,0)$.
2. Find counterclockwise circulation of $(-2y,2x,0)$ around a circle of radius three. Check it by integrating curl over the disk.

<!-- solutions -->

### Exercise 1

The third component is $2x$, so the answer is $(0,0,4)$.

### Exercise 2

Curl has normal component four, and disk area is $9\pi$, giving $36\pi$. Directly, speed is six and circumference is $6\pi$, with the same product.

Reference: [MIT multivariable calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Local circulation and velocity gradients

For a $C^1$ field, the normal component of curl is the limiting positive circulation per area of a regularly shrinking planar region. The antisymmetric part of the velocity gradient describes local rigid rotation; its symmetric part describes strain. A rigid field $F(x)=\Omega\times x$ has curl $2\Omega$, where $\Omega$ is its angular velocity vector.

Continuous second derivatives imply $\nabla\times\nabla f=0$ and $\nabla\cdot(\nabla\times F)=0$. A curl-free field on a suitable simply connected open domain admits a scalar potential. Holes can obstruct the global implication, and singularities invalidate applications of classical Stokes across them.

Representing curl as a vector uses three-dimensional Euclidean geometry and orientation. In other dimensions, the exterior derivative or an antisymmetric derivative tensor is the more general object.
