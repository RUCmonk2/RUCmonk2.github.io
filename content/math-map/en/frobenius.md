## Pair matching entries

The Frobenius inner product multiplies corresponding entries of two same-shaped matrices and adds the products. Its norm squares every entry, adds the squares, and takes a square root. This is ordinary Euclidean geometry applied to a matrix as one array.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $A,B$ | Same-shaped real matrices | Required for entrywise pairing |
| $A_{ij}$ | Entry in row $i$, column $j$ | Indices enumerate entries |
| $\langle A,B\rangle_F$ | Frobenius inner product | The subscript names the convention |
| $\Vert A\Vert_F$ | Frobenius norm | Always nonnegative |
| $\operatorname{tr},T$ | Trace and transpose | Give a compact inner-product formula |
| $\sigma_i$ | Singular values | Nonnegative |
| $E$ | Error matrix | A mnemonic for error |

$$
\langle A,B\rangle_F=\sum_{i,j}A_{ij}B_{ij}=\operatorname{tr}(A^TB),
\qquad \|A\|_F^2=\sum_{i,j}A_{ij}^2.
$$

## Calculate entry by entry

For $A=\begin{pmatrix}1&2\\0&-1\end{pmatrix}$ and $B=\begin{pmatrix}3&0\\4&2\end{pmatrix}$, the entry products are three, zero, zero, and negative two. Their inner product is one. Squared norms are six and twenty-nine. The cosine of the angle after flattening both matrices consistently is $1/\sqrt{174}\approx0.0758$.

## A matrix prediction loss

For prediction $X$ and target $Y$, set $f(X)=\frac12\|X-Y\|_F^2$. The factor one-half cancels the two from differentiating a square. With $E=X-Y$, $df=\langle E,dX\rangle_F$, so the gradient is $E$.

Let $X=\begin{pmatrix}1&3\\2&0\end{pmatrix}$ and $Y=\begin{pmatrix}1&1\\0&0\end{pmatrix}$. The error is $\begin{pmatrix}0&2\\2&0\end{pmatrix}$ and the loss is four. A gradient step of size $0.25$ scales the error by $0.75$, reducing the loss to $2.25$.

## Different from maximum stretch

The spectral norm measures the largest stretching of a unit vector. The Frobenius norm accumulates squared magnitude across all directions. For the two-dimensional identity, these norms are one and $\sqrt2$ respectively.

In singular-value language, the spectral norm is the largest singular value, while the squared Frobenius norm is the sum of squared singular values.

## Exercises

1. Compute both norms of $\operatorname{diag}(3,4)$.
2. Find the gradient of $\|X\|_F^2$ without the factor one-half.

<!-- solutions -->

### Exercise 1

The Frobenius norm is five; the spectral norm is four.

### Exercise 2

The gradient is $2X$. Equal minimizers do not imply equal gradients.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Geometry, adjoints, and approximation

The Frobenius inner product is the standard inner product after vectorization. For complex matrices, conjugate transpose replaces transpose, with the appropriate real part for real-valued optimization.

Singular-value decomposition gives $\|A\|_F^2=\sum_i\sigma_i^2$ and invariance under left and right orthogonal transformations. For rank $r$, $\|A\|_2\le\|A\|_F\le\sqrt r\,\|A\|_2$.

The adjoint of $L(X)=AXB$ is $L^*(Y)=A^TYB^T$, so the gradient of $\frac12\|L(X)-C\|_F^2$ is $L^*(L(X)-C)$ for fixed target $C$.

Truncated SVD minimizes unweighted Frobenius error at fixed rank; the squared residual is the sum of discarded squared singular values. Missing entries, unequal entry weights, or additional constraints generally invalidate the simple truncation solution. Choosing another inner product also changes the gradient representation.
