## Extract one scalar from the diagonal

The trace is the sum of a square matrix's diagonal entries. It turns matrix expressions into scalars and remains unchanged under changes of basis describing the same operator. It is also a convenient language for matrix derivatives.

Trace does not preserve all matrix information. Equal traces do not imply equal matrices, invertibility or positive definiteness.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $\operatorname{tr}A$ | Scalar trace of a square matrix | Abbreviation of trace |
| $A_{ii}$ | Diagonal entry | Equal row and column indices |
| $i,j,n$ | Summation indices and dimension | Indices are local labels |
| $A,B$ | Compatible factors | Their products must be square when taking traces |
| $A^T$ | Transpose | Not an inverse |
| $P^{-1}AP$ | Change-of-basis representation | Requires invertible $P$ |
| $\lambda_i$ | Eigenvalues with algebraic multiplicity | Their sum equals trace |
| $\langle A,B\rangle_F$ | Frobenius inner product | Entrywise products summed |

$$
\operatorname{tr}A=\sum_i A_{ii}.
$$

For $\begin{pmatrix}1&2\\0&3\end{pmatrix}$ the result is four.

## Derive cyclicity

$$
\operatorname{tr}(AB)=\sum_i\sum_j A_{ij}B_{ji}
=\sum_j\sum_i B_{ji}A_{ij}=\operatorname{tr}(BA).
$$

This exchanges finite scalar sums, not the matrix factors themselves. It also works for compatible rectangular factors, where the two square products can have different sizes.

With $A=\begin{pmatrix}1&2\\0&3\end{pmatrix}$ and $B=\begin{pmatrix}4&0\\5&6\end{pmatrix}$, direct multiplication gives

$$
AB=\begin{pmatrix}14&12\\15&18\end{pmatrix},\qquad
BA=\begin{pmatrix}4&8\\5&28\end{pmatrix}.
$$

Both traces are thirty-two, but the matrices differ. Moreover $\operatorname{tr}(A)\operatorname{tr}(B)=4(10)=40$, so trace does not distribute over multiplication that way.

Three factors can cycle as $ABC,BCA,CAB$ inside a trace. Arbitrary pairwise swaps are not justified.

## Read a differential as coefficients

If $df=\operatorname{tr}(G^T\,dX)$, expanding entries shows each perturbation is multiplied by its matching coefficient. Under the Frobenius inner product, $G$ is the gradient. Its shape must match $X$.

For $f(X)=\operatorname{tr}(X)$, the gradient is the identity: diagonal perturbations contribute with coefficient one, off-diagonal perturbations with zero.

## Exercises

1. For $X=\begin{pmatrix}1&-2\\3&4\end{pmatrix}$, evaluate $\operatorname{tr}(X^TX)$.
2. Prove trace is unchanged by $P^{-1}AP$ when $P$ is invertible.

<!-- solutions -->

### Problem 1

The squared entries sum to thirty. The diagonal of $X^TX$ is ten and twenty, giving the same trace. This is the squared Frobenius norm.

### Problem 2

Cycle $P$ to the front: $\operatorname{tr}(PP^{-1}A)=\operatorname{tr}(A)$. Invertibility provides the inverse and cancellation.

Reference: [MIT Matrix Calculus](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/pages/lecture-notes-and-readings/).

<!-- formal -->

## Linearity and cyclicity

Trace is a linear functional on square matrices. Compatible rectangular products obey cyclicity, which implies similarity invariance. The sum-of-eigenvalues identity counts algebraic multiplicities and does not require diagonalizability.

Commutators have zero trace: $\operatorname{tr}(AB-BA)=0$. This can obstruct proposed matrix equations.

The Frobenius pairing is $\operatorname{tr}(A^TB)=\sum_{ij}A_{ij}B_{ij}$. Thus, if $f(X)=\operatorname{tr}(AXB)$ with compatible dimensions, then $df=\operatorname{tr}(BA\,dX)$ and the gradient is $(BA)^T$.

Similarity invariance does not extend to arbitrary unrelated left and right changes. Trace zero does not mean zero matrix or zero eigenvalues. Rectangular matrices have no ordinary trace, although suitable products involving them do.

Infinite-dimensional analogues require trace-class or related hypotheses. Cyclicity cannot be used before establishing the relevant operator and convergence conditions.
