## Coordinate cells change physical size

Polar coordinates simplify circular boundaries, but replacing variable names is not enough. Equal parameter cells can correspond to different physical areas. The Jacobian factor corrects their local size.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $u,x$ | New and original coordinates | Both may be vectors |
| $T,U,T(U)$ | Coordinate map, parameter domain, physical domain | State the direction of the map |
| $f(T(u))$ | Integrand expressed in new coordinates | Function substitution is only one part |
| $J_T$ | Jacobian matrix | Square for the same-dimensional formula |
| $\lvert\det J_T\rvert$ | Unsigned local volume factor | Absolute value removes orientation |
| $dx,du$ | Volume elements | Not merely one-coordinate increments |
| $r,\theta,R$ | Variable radius, angle in radians, fixed outer radius | Distinguish a variable from its bound |

$$
\int_{T(U)}f(x)\,dx=\int_U f(T(u))|\det J_T(u)|\,du.
$$

Appropriate smoothness and one-to-one coverage matter; otherwise the right side may count points repeatedly.

## Derive the polar factor

For $x=r\cos\theta$, $y=r\sin\theta$,

$$
J_T=\begin{pmatrix}\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta\end{pmatrix},\qquad \det J_T=r.
$$

A fixed angular increment sweeps a longer arc at a larger radius, so the area element is $r\,dr\,d\theta$.

A disk of radius two has area $\int_0^{2\pi}\int_0^2r\,dr\,d\theta=4\pi$. Curiously, omitting the factor also gives $4\pi$ in this one case. This accidental agreement is not a valid test.

At radius three the correct area is $9\pi$, while the omitted-factor calculation gives $6\pi$. Testing a structural identity at only one convenient number can hide a bug.

For $f(x,y)=x^2+y^2$ on the radius-two disk, the integrand becomes $r^2$ and the area factor supplies another $r$:

$$
\int_0^{2\pi}\int_0^2r^3\,dr\,d\theta=8\pi.
$$

Dividing by area gives mean squared distance two.

At the origin polar coordinates are singular and angle is not unique. The angular seam also repeats a ray. Rigorous application uses suitable pieces and handles negligible boundaries; polar coordinates are not a global smooth bijection on the entire closed disk.

## Exercises

1. Compare correct and missing-Jacobian calculations for a radius-three disk.
2. Map the unit square by $x=2u,y=3v$. What is its area? What changes for $x=-2u$?

<!-- solutions -->

### Problem 1

The correct answer is $9\pi$. Integrating only $dr\,d\theta$ gives $6\pi$, the area of the parameter rectangle rather than the disk.

### Problem 2

The determinant is six, giving area six. Reversal makes it negative six, but its absolute value and unsigned area remain six.

Reference: [MIT Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Change of variables and coverage

For a suitable $C^1$ diffeomorphism and integrable function, the absolute Jacobian determinant transforms volume. A nonzero determinant guarantees only local invertibility; global coverage must be checked separately. Multiple coverage requires partitioning or multiplicity corrections.

Unsigned volume uses an absolute determinant. Oriented differential-form integration retains orientation information. Density transformations use the volume factor to preserve total probability.

For a lower-dimensional parameterized surface, the Jacobian is rectangular and ordinary determinant is unavailable. The area factor is instead $\sqrt{\det(J_T^TJ_T)}$ under regularity assumptions.

Coordinate singularities and seams are handled with charts or negligible sets. Improper integrals still require convergence analysis. Exchanging integration order needs separate Fubini or Tonelli hypotheses; a successful coordinate change does not establish them.
