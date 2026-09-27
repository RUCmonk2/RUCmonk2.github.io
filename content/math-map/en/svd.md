## Change directions, stretch, then change directions again

Eigenvectors compare input and output directions in the same space. Rectangular matrices need a different idea: choose special input directions and separate output directions, paired by nonnegative scale factors.

Every real matrix has an SVD, including rectangular and singular matrices. This makes it central to compression, least squares, rank estimation and PCA.

| Symbol | Meaning and size | Convention |
| --- | --- | --- |
| $A\in\mathbb R^{m\times n}$ | Original matrix | $n$ inputs, $m$ outputs |
| $U,V$ | Orthogonal matrices of sizes $m\times m$, $n\times n$ | Columns are left and right singular vectors |
| $\Sigma$ | Rectangular diagonal matrix of size $m\times n$ | Capital Sigma collects scales |
| $\sigma_i$ | Nonnegative singular values, usually descending | Lowercase sigma denotes individual scales |
| $u_i,v_i$ | Paired unit directions | Their indices match |
| $r,k$ | Rank and number of retained modes | Truncation chooses how much to keep |
| $\Vert A\Vert_F$ | Square root of the sum of squared entries | Measures overall matrix error |

$$
A=U\Sigma V^T,\qquad Av_i=\sigma_i u_i.
$$

Orthogonal factors can include reflections; they are not necessarily pure rotations.

## A rectangular example

Take $A=\begin{pmatrix}3&0\\0&1\\0&0\end{pmatrix}$. The first input coordinate maps to $(3,0,0)^T$, and the second to $(0,1,0)^T$. Thus the singular values are three and one; choose $U=I_3$, $V=I_2$ and $\Sigma=A$.

Input $(2,-1)^T$ maps to $(6,-1,0)^T$. The third output direction is unattainable; it does not create another nonzero singular value.

Since $A^TA=V\Sigma^T\Sigma V^T$, singular values are square roots of the eigenvalues of $A^TA$. Here those eigenvalues are nine and one. This explains the theory, but explicitly forming $A^TA$ can square the condition number and damage small-scale numerical information.

## Truncation and information loss

Discarding the second mode gives a rank-one matrix retaining only the entry three. The Frobenius error is one. Keeping the largest $k$ modes gives a best rank-constrained approximation in standard spectral and Frobenius norms.

A small discarded singular value need not be irrelevant to a particular application. Small global reconstruction error and small task-specific loss are different objectives.

## Exercises

1. For $\operatorname{diag}(5,2,0)$, find rank, maximum stretching and the best rank-one Frobenius error.
2. Solve $\operatorname{diag}(4,1)x=(8,3)^T$. What happens to second-direction observation errors if the second singular value becomes $0.001$?

<!-- solutions -->

### Problem 1

Rank is two, maximum stretching is five, and the discarded singular values give error $\sqrt{2^2+0^2}=2$.

### Problem 2

The original solution is $(2,3)^T$. Inversion divides by singular values, so a second-direction observation error is magnified by one thousand when that singular value is $0.001$.

Reference: [MIT Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/).

<!-- formal -->

## Full and compact decompositions

For rank $r$, the compact SVD is $A=U_r\Sigma_rV_r^T$. Construct positive-singular-value left vectors using $u_i=Av_i/\sigma_i$ after diagonalizing $A^TA$, then complete orthonormal bases if full factors are needed.

The spectral norm is $\sigma_1$, and the squared Frobenius norm is $\sum_i\sigma_i^2$. Truncation satisfies

$$
\min_{\operatorname{rank}B\le k}\|A-B\|_2=\sigma_{k+1},
\qquad
\min_{\operatorname{rank}B\le k}\|A-B\|_F^2=\sum_{i>k}\sigma_i^2.
$$

Tied singular values at the cutoff can make best approximations nonunique.

The pseudoinverse $A^+=V_r\Sigma_r^{-1}U_r^T$ produces the minimum-norm least-squares solution. Numerical rank requires a scale-aware tolerance rather than exact comparisons to zero.

Repeated singular values permit rotations within singular subspaces; paired sign changes also leave the matrix unchanged. Compare reconstructed matrices or subspaces rather than demanding identical individual vectors from different numerical routines.
