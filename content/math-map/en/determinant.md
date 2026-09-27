## Measure oriented area or volume scaling

A matrix sends a unit square to a parallelogram. The absolute determinant is its area scale; the sign records orientation. In three dimensions use volume, and in higher dimensions the corresponding volume element.

Scaling horizontal lengths by two and vertical lengths by three multiplies area by six. Reversing one direction makes the determinant negative six without producing negative geometric area.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $A\in\mathbb R^{n\times n}$ | Square transformation matrix | Columns are images of basis directions |
| $\det A$ | Oriented volume multiplier | Abbreviation of determinant |
| $a,b,c,d$ | Four entries of a two-by-two matrix | Position labels, not fixed physical quantities |
| $I,A^{-1}$ | Identity and inverse | Inverse exists when determinant is nonzero |
| $\lvert\det A\rvert$ | Unsigned volume scale | Absolute value removes orientation |
| $J_T$ | Jacobian of a map $T$ | Controls local nonlinear volume changes |
| $\lambda_i,n$ | Eigenvalues and dimension | Eigenvalues are counted with algebraic multiplicity |

$$
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc.
$$

## A sheared rectangle

For $A=\begin{pmatrix}2&1\\0&3\end{pmatrix}$, basis vectors become $(2,0)^T$ and $(1,3)^T$. The parallelogram has base two and height three, so its area is six. The formula gives the same answer.

The horizontal shear changes shape without changing height. Swapping columns reverses orientation and changes the determinant to negative six. Replacing the second column by $(4,0)^T$ makes columns parallel: area collapses to zero, and the matrix becomes noninvertible.

## Composition and scaling

Two successive transformations multiply their volume factors:

$$
\det(AB)=\det A\det B.
$$

Scaling every coordinate by $c$ contributes that factor in each of $n$ directions, so $\det(cA)=c^n\det A$. Scaling only one column contributes the factor once.

Determinant is not linear in whole-matrix addition. In two dimensions $\det(I+I)=4$, but $\det I+\det I=2$. It is multilinear in separate columns while other columns remain fixed.

In nonlinear substitutions, tiny regions are approximately transformed by the Jacobian, giving the unsigned factor $|\det J_T|$. This is why integration uses an absolute value. Real log-determinants additionally require positive determinant, not merely invertibility.

## Exercises

1. Find the determinant, invertibility and area scale of $\begin{pmatrix}1&2\\3&4\end{pmatrix}$.
2. A three-by-three matrix has determinant five. What happens when every entry is doubled? What if only the first column is doubled?

<!-- solutions -->

### Problem 1

The determinant is $4-6=-2$. The matrix is invertible, area scale is two, and orientation reverses.

### Problem 2

Doubling all entries doubles all three columns, giving $2^3(5)=40$. Doubling just one column gives ten.

Reference: [MIT Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/).

<!-- formal -->

## Multilinearity and derivatives

The determinant is the alternating multilinear function of columns normalized by $\det I=1$. Elementary column rules, invertibility criteria and multiplicativity follow from this structure.

As a polynomial in entries it is differentiable even at singular matrices:

$$
D\det(A)[H]=\operatorname{tr}(\operatorname{adj}(A)H).
$$

The adjugate is the transpose of the cofactor matrix. Only when $A$ is invertible may this be rewritten as $\det(A)\operatorname{tr}(A^{-1}H)$.

Similarity preserves determinant, and the eigenvalue product identity counts algebraic multiplicity. Inversion gives reciprocal determinant.

A small determinant is not by itself a scale-independent diagnosis of numerical singularity. Singular values and condition numbers give more informative stability measures.

For nonlinear change of variables, a nonzero Jacobian determinant gives local information; it does not establish global injectivity. Integration formulas also require appropriate domain and regularity assumptions, and possibly multiplicity corrections.
