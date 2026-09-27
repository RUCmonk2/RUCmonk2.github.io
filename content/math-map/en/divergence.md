## Net outflow from a tiny box

Divergence measures local net outward flow per unit volume. Imagine a small box in a velocity field: add the outward flow through all its faces, subtract inward flow, divide by volume, and shrink the box.

Speed alone is not divergence. A fast uniform stream enters one side as quickly as it leaves the other.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $F=(P,Q,R)$ | A vector field | Three velocity components in this example |
| $\nabla\cdot F$ | Divergence | A scalar |
| $V,\partial V$ | A volume region and its boundary | Here $\partial$ means boundary |
| $n$ | Outward unit normal | Fixes the sign of flux |
| $dS,dV$ | Area and volume elements | Geometric integration weights |
| $F\cdot n$ | Normal component | Tangential motion does not cross the face |
| $\rho$ | Density | Used when converting velocity to mass flux |

In Cartesian coordinates,
$$
\nabla\cdot F=P_x+Q_y+R_z.
$$
If velocity has units of length per time, divergence has units of inverse time.

## Deriving the sum

The two faces perpendicular to the first axis contribute the difference between $P(x+\delta x,y,z)$ and $P(x,y,z)$, multiplied by face area. To first order this is $P_x$ times box volume. The other face pairs contribute $Q_y$ and $R_z$ times volume. Division by volume explains why these particular derivatives are added.

## A box you can calculate exactly

Take $F=(x,2y,3z)$ on the cube $[0,a]^3$, where $a>0$.

The first pair of faces contributes $a^3$: the component is $a$ on the outer face of area $a^2$ and zero on the opposite face. The other pairs contribute $2a^3$ and $3a^3$. Total outward flux is $6a^3$, while volume is $a^3$. Their ratio is six, exactly the divergence $1+2+3$.

At $a=0.1$ metres, the volume is $0.001$ cubic metres and net volume flux is $0.006$ cubic metres per second, with the field coefficients interpreted in inverse seconds.

The rotating field $(-y,x,0)$ has zero divergence, as does uniform translation $(100,0,0)$. Neither is motionless. Variable-density mass conservation uses $\nabla\cdot(\rho F)$, not automatically $\nabla\cdot F$.

## From local to global

The divergence theorem states
$$
\iiint_V\nabla\cdot F\,dV=\iint_{\partial V}F\cdot n\,dS.
$$
Shared internal faces cancel when many tiny boxes are added. Only the exterior boundary remains. Smoothness and boundary assumptions are necessary; singularities cannot simply be ignored.

## Exercises

1. Find divergence of $(x^2,y,z)$ at $(2,0,1)$.
2. Find outward flux of $(x,y,z)$ through the unit sphere, whose enclosed volume is $4\pi/3$.

<!-- solutions -->

### Exercise 1

Divergence is $2x+1+1$, giving six.

### Exercise 2

Divergence is three everywhere, so the flux is $3(4\pi/3)=4\pi$. On the unit sphere the field also equals the outward normal, giving unit normal flux over area $4\pi$.

Reference: [MIT multivariable calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Trace, conservation, and regularity

For a $C^1$ vector field on a Euclidean open set,
$$
\operatorname{div}F=\operatorname{tr}(DF)=\sum_{i=1}^n\partial_iF_i,
$$
where $n$ is the dimension and $i$ is the summation index. Divergence describes the infinitesimal relative volume change under the generated flow.

For sufficiently regular bounded regions and fields, the divergence theorem identifies its volume integral with outward boundary flux. Singularities require punctured domains with additional boundary terms or a distributional treatment.

With density $\rho$, velocity $v$, and no sources, local mass conservation is
$$
\partial_t\rho+\nabla\cdot(\rho v)=0.
$$
The product rule gives $D_t\rho+\rho\,\nabla\cdot v=0$, where $D_t$ is the derivative along trajectories. Constant positive density along trajectories implies a divergence-free velocity field.

Weak divergence is defined by integration by parts. The same cancellation of shared-face fluxes motivates conservative finite-volume discretizations.
