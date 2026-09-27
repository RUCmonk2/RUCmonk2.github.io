## Keep directions with the most variation

Principal component analysis projects data onto fewer orthogonal directions, preserving as much variance as possible. In the standard setting this also minimizes squared linear reconstruction error.

Large variance does not automatically mean useful predictive information. PCA does not use labels, and units, outliers, and preprocessing affect its result.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $X\in\mathbb R^{n\times d}$ | Data matrix | Rows are samples |
| $\mu,X_c$ | Feature means and centred data | Centre each column |
| $C$ | Sample covariance | Denominator $n-1$ |
| $u$ | Unit projection direction | Prevents arbitrary scaling |
| $\lambda_i$ | Covariance eigenvalues | Variance along principal axes |
| $k,Z$ | Retained dimension and scores | Lower-dimensional coordinates |

$$
C=\frac1{n-1}X_c^TX_c,\qquad \max_{\|u\|_2=1}u^TCu.
$$

## Three points, one component

For $(1,1),(2,2),(3,3)$, the mean is $(2,2)$ and centred points are $(-1,-1),(0,0),(1,1)$.

Covariance is $\begin{pmatrix}1&1\\1&1\end{pmatrix}$, with eigenvalues two and zero. The first direction is $(1,1)^T/\sqrt2$. Scores are $-\sqrt2,0,\sqrt2$.

Multiplying each score by the direction and adding the mean exactly reconstructs the data. Explained variance is one hundred percent because all points lie on one line.

For covariance $\operatorname{diag}(9,1)$, retaining the horizontal axis explains ninety percent of variance. Yet if labels depend only on the vertical coordinate, this choice can remove the useful predictive feature.

## Centre, scale, and compute

Centring subtracts means; standardization additionally divides by feature scales and changes the geometry. It may address unit differences or amplify low-variance noise. Fit preprocessing on training data and reuse it for validation and testing.

SVD of centred data avoids explicitly constructing covariance. A principal axis can be multiplied by negative one without changing reconstruction. Repeated eigenvalues also permit rotations within their eigenspace.

## Exercises

1. Eigenvalues are five, three, and two. What fraction is retained by the first two components?
2. Does reversing the first principal direction change reconstruction?

<!-- solutions -->

### Exercise 1

The fraction is $(5+3)/10=0.8$.

### Exercise 2

No. Scores reverse sign too, so the two signs cancel during reconstruction. Variance also remains unchanged.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Variance, SVD, and identifiability

The optimal rank-$k$ orthogonal projection of centred data maximizes retained variance and minimizes Frobenius reconstruction error. For $X_c=U\Sigma V^T$, directions are right singular vectors, scores are $U_k\Sigma_k$, and covariance eigenvalues are $\sigma_i^2/(n-1)$.

A strict eigenvalue gap at the truncation boundary makes the optimal subspace unique, while individual vector signs remain arbitrary. Repeated eigenvalues permit basis rotations. Centred data rank is at most $\min(n-1,d)$.

PCA is linear, unsupervised, and based on second-order structure. Outliers and scaling can alter its solution. Probabilistic PCA adds an isotropic Gaussian-noise model; it is an interpretation with assumptions, not a universal description of data.

Component selection should consider reconstruction and downstream validation, not only a fixed explained-variance threshold. All learned preprocessing belongs to the training split.
