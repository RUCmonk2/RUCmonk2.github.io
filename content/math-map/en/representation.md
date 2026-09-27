## Turn abstract operations into matrices

A representation assigns an invertible linear transformation to each group element while preserving composition. Unlike a label or index, the assigned matrix must obey the group's multiplication rule.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $G,V$ | Group and vector space | The group acts linearly on $V$ |
| $\rho(g)$ | Transformation for $g$ | Rho is a conventional map symbol |
| $GL(V)$ | Invertible linear transformations | General linear group |
| $I$ | Identity transformation | Image of the group identity |
| $W$ | Candidate invariant subspace | Preserved by every group element |
| $\chi(g)$ | Character | Trace of $\rho(g)$ |
| $P$ | Change-of-basis matrix | Invertible |

The defining relation is $\rho(gh)=\rho(g)\rho(h)$.

## Represent four rotations

For $r^4=e$, assign
$$
R=\rho(r)=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$
It sends $(2,1)^T$ to $(-1,2)^T$, and a second application gives $(-2,-1)^T$. Thus $R^2=-I$ and $R^4=I$. Assigning $R^k$ to $r^k$ preserves composition. The four matrices are distinct, so this representation is faithful.

The trivial representation sends every element to the one-dimensional matrix one. It preserves composition but distinguishes nothing. Sending $r$ to negative one also gives a representation, but $r^2$ then maps to one, so it is not faithful.

## Invariant subspaces

A subspace is invariant if every represented operation maps it into itself. A nonzero proper invariant subspace makes a representation reducible.

A ninety-degree rotation has no invariant real line, so the two-dimensional real representation is irreducible. Over complex numbers it splits into one-dimensional eigenspaces with eigenvalues $i$ and $-i$. The scalar field must therefore be specified.

Different neural features transform as scalars, vectors, or other representations. A linear layer preserves equivariance only if it intertwines the chosen input and output representations.

## Exercises

1. Compute $R^3(1,0)^T$ and $\operatorname{tr}R$.
2. Can every element be represented by a zero matrix?

<!-- solutions -->

### Exercise 1

The vector becomes $(0,-1)^T$. The trace is zero.

### Exercise 2

No. Zero is not invertible and cannot represent the identity transformation. The trivial one-dimensional representation uses one.

Reference: [Geometric Deep Learning](https://geometricdeeplearning.com/).

<!-- formal -->

## Equivalence, intertwiners, and decomposition

A representation is a homomorphism into $GL(V)$. Changing basis gives $\rho'(g)=P^{-1}\rho(g)P$; equivalent representations describe the same abstract linear action. Faithfulness concerns the kernel, while irreducibility concerns invariant subspaces. These properties are distinct.

A linear map $T:V\to W$ intertwines representations when $T\rho_V(g)=\rho_W(g)T$ for every element. This is precisely linear equivariance. Characters are trace functions, invariant under conjugation and representation equivalence.

Finite groups over the real or complex numbers admit an invariant inner product by averaging, giving invariant orthogonal complements and complete reducibility. Other fields need characteristic restrictions; infinite groups need additional assumptions. Compact groups allow Haar averaging for analogous finite-dimensional results, while noncompact groups do not automatically share the conclusion.
