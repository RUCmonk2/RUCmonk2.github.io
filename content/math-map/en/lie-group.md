## Smooth families of reversible transformations

A Lie group combines a group with a smooth manifold: multiplication and inversion are smooth. The name refers to Sophus Lie. Infinitely many elements alone do not establish this structure.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $G$ | Lie group | A smooth space of group elements |
| $SO(2)$ | Planar orientation-preserving rotations | Special orthogonal group |
| $R(\theta)$ | Rotation matrix | Angle in radians |
| $I$ | Identity | Zero-angle rotation |
| $A$ | Infinitesimal generator | Tangent at identity |
| $\exp$ | Matrix exponential | A matrix power series |
| $t$ | Path parameter | Not necessarily physical time |

$$
R(\theta)=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}.
$$
There are four matrix entries but only one free angle. Matrix size is not manifold dimension.

## Compose and undo rotations

$R(\alpha)R(\beta)=R(\alpha+\beta)$ and $R(\theta)^{-1}=R(-\theta)$. Thirty degrees followed by sixty degrees gives ninety degrees, mapping $(1,0)^T$ to $(0,1)^T$. Rotating back by ninety degrees restores the input.

Angles differing by $2\pi$ describe the same matrix, so the global group resembles a circle rather than an unbounded line.

## Linearize near identity

Differentiation gives
$$
A=R'(0)=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad R(t)\approx I+tA.
$$
At $t=0.01$, acting on $(1,0)^T$ predicts $(1,0.01)^T$, while the exact output is approximately $(0.9999500004,0.0099998333)^T$.

The linear approximation does not preserve length exactly. The exponential $\exp(tA)=R(t)$ does. This connects a linear tangent space to the curved group.

All invertible real matrices form $GL(n,\mathbb R)$, of dimension $n^2$. Rotations satisfy orthogonality and determinant-one constraints. Finite groups can also be zero-dimensional Lie groups with discrete structure, so continuous infinite families are examples rather than the entire definition.

## Exercises

1. Find $R(\pi)$ and its inverse.
2. Explain why four matrix entries in $SO(2)$ give only one degree of freedom.

<!-- solutions -->

### Exercise 1

Both matrices equal $-I$: two half turns make a full turn.

### Exercise 2

One angle fixes all four sine and cosine entries. Orthogonality, unit column lengths, and orientation prevent independent choices.

Reference: [Geometric Deep Learning](https://geometricdeeplearning.com/).

<!-- formal -->

## Smooth group structure and local coordinates

A Lie group is a finite-dimensional smooth manifold with smooth multiplication and inversion, under the usual Hausdorff and second-countability assumptions. Matrix Lie groups provide concrete realizations. $GL(n,\mathbb R)$ has dimension $n^2$, whereas $SO(n)$ has dimension $n(n-1)/2$.

The tangent space at identity becomes a Lie algebra. Its elements generate one-parameter subgroups, written $\exp(tA)$ for matrix groups. Exponential is locally a coordinate map near zero, but need not be globally injective or surjective in every group.

For $SO(2)$ it covers all rotations periodically. Higher-dimensional rotations generally do not commute, so local composition cannot be replaced by simple addition without correction terms.

Geometry-preserving updates maintain structural constraints but do not automatically resolve nonconvex optimization, floating-point errors, or global coordinate limitations. Discrete sampling may only approximately preserve a continuous group action.
