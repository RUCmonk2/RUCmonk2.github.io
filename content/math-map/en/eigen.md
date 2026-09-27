## Directions a transformation does not turn aside

A matrix usually changes both length and direction. Special nonzero vectors remain on their original line after transformation, possibly reversed. They are eigenvectors; the scaling factors are eigenvalues.

For $\operatorname{diag}(3,1)$, the horizontal direction is tripled and the vertical direction unchanged. Most diagonal directions are turned.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $A\in\mathbb R^{n\times n}$ | Square matrix | Input and output must be comparable |
| $v\ne0$ | Eigenvector | Excluding zero makes the equation informative |
| $\lambda$ | Eigenvalue | Lambda is conventional, not necessarily positive |
| $I$ | Identity matrix | Makes $\lambda I$ dimensionally compatible |
| $\det(A-\lambda I)$ | Characteristic polynomial up to a sign convention | Its zeros allow nonzero null vectors |
| $Q,\Lambda$ | Orthonormal eigenvector matrix and diagonal eigenvalue matrix | Capital Lambda collects the eigenvalues |
| $T,\operatorname{diag}$ | Transpose and diagonal-matrix construction | Transpose equals inverse only for orthogonal $Q$ |

$$
Av=\lambda v,\qquad v\ne0.
$$

Multiplying an eigenvector by any nonzero scalar gives another one with the same eigenvalue. The important object is a direction or eigenspace.

## Work through a symmetric example

For $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, the characteristic equation is $(2-\lambda)^2-1=0$. Its roots are three and one. Corresponding directions are $(1,1)^T$ and $(1,-1)^T$. Normalize both by $\sqrt2$:

$$
Q=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix},\quad
\Lambda=\operatorname{diag}(3,1),\quad A=Q\Lambda Q^T.
$$

For input $(2,0)^T$, transformed coordinates are $(\sqrt2,\sqrt2)^T$. Scaling gives $(3\sqrt2,\sqrt2)^T$, and changing back gives $(4,2)^T$, matching direct multiplication.

Repeated application becomes $A^k=Q\Lambda^kQ^T$. Nonnegative integer powers simply raise the eigenvalues. Negative powers additionally require invertibility.

## Do not drop symmetry

Real symmetric matrices always have an orthonormal eigenbasis and real eigenvalues. General real matrices need not. A quarter-turn has no real eigendirection. The matrix $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has only eigenvalue one and only a one-dimensional eigenspace, so it is not diagonalizable.

Finding eigenvalues is therefore not the same as producing a diagonalization.

## Exercises

1. Interpret the two eigenvalues of $\operatorname{diag}(4,-2)$ geometrically.
2. For the worked matrix, calculate $A^2(1,1)^T$ without multiplying out $A^2$.

<!-- solutions -->

### Problem 1

The coordinate directions have factors four and negative two. The negative sign reverses direction; the length is multiplied by two, not made negative.

### Problem 2

The vector has eigenvalue three, so two applications multiply it by nine. The result is $(9,9)^T$.

Reference: [MIT Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/).

<!-- formal -->

## Eigenspaces and spectral theorem

The eigenspace at $\lambda$ is $\ker(A-\lambda I)$. Its dimension is geometric multiplicity, bounded above by the root's algebraic multiplicity. Diagonalizability is equivalent to an eigenvector basis.

For a real symmetric matrix,

$$
A=\sum_\lambda\lambda P_\lambda,\quad
P_\lambda P_\mu=0\ (\lambda\ne\mu),\quad
\sum_\lambda P_\lambda=I.
$$

Repeated eigenvalues permit different orthonormal bases, but the spectral projections remain determined.

The Rayleigh quotient lies between the smallest and largest eigenvalues, connecting the spectrum to positive definiteness and optimization curvature. Symmetric spectral perturbation behavior is substantially better than that of general nonnormal matrices.

Complex eigenvalues exist for real matrices viewed over the complex field, but an eigenbasis still need not exist. Jordan form describes this algebraically; stable computation often uses Schur form.

Singular values are distinct from eigenvalues: they are nonnegative and apply to rectangular matrices. PCA uses symmetric covariance spectra, often computed through a data matrix's SVD.
