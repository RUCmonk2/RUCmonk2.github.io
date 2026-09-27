## Tabulate local input-output effects

With several inputs and outputs, the derivative is not a single number. The Jacobian has one row per output and one column per input. Multiplying it by a small input perturbation predicts all first-order output changes.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f:\mathbb R^n\to\mathbb R^m$ | Multi-output function | Dimensions determine matrix shape |
| $f_i,x_j$ | Output component and input coordinate | Output index comes first |
| $J_f(x)$ | Jacobian at the base point | $J$ abbreviates Jacobian |
| $(J_f)_{ij}$ | Partial $\partial f_i/\partial x_j$ | Row $i$, column $j$ |
| $h,J_fh$ | Input perturbation and predicted output change | Inputs are columns here |
| $T$ | Transpose | Scalar-output gradient is the transpose of its Jacobian |
| $\det J_f,I$ | Determinant when square, identity matrix | Rectangular Jacobians have no ordinary determinant |

Other sources may use transposed conventions. Check their input layout and multiplication dimensions before borrowing formulas.

## Fill the matrix step by step

For $f(x,y)=(x^2+xy,\sin y)^T$, the first row is $(2x+y,x)$ and the second $(0,\cos y)$. Therefore

$$
J_f(1,0)=\begin{pmatrix}2&1\\0&1\end{pmatrix}.
$$

Differentiate before substituting the base point. Evaluating first produces a constant output vector and loses the dependence you need to differentiate.

For $h=(0.01,0.02)^T$, multiplication gives $J_fh=(0.04,0.02)^T$. The predicted output is $(1.04,0.02)^T$. Actual values are $1.0403$ and about $0.019998667$. The differences are higher-order effects.

Each column separately describes the effect of changing one input. The full matrix combines these effects for simultaneous changes.

A Jacobian need not be square or invertible. Even a nonsingular square Jacobian, under the hypotheses of the inverse function theorem, guarantees only local inversion. It does not establish global one-to-one behavior.

## Exercises

1. Find the Jacobian of $g(x,y,z)=(x+y,yz)^T$ at $(1,2,3)$.
2. Apply it to $h=(0.1,0,-0.2)^T$ and check dimensions.

<!-- solutions -->

### Problem 1

$$
J_g(x,y,z)=\begin{pmatrix}1&1&0\\0&z&y\end{pmatrix},\qquad
J_g(1,2,3)=\begin{pmatrix}1&1&0\\0&3&2\end{pmatrix}.
$$

Two outputs and three inputs give a two-by-three matrix.

### Problem 2

The predicted change is $(0.1,-0.4)^T$. It is exact for this particular perturbation because the middle input is fixed and the product's second-order cross term vanishes.

Reference: [MIT Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Coordinate derivative

For a differentiable map the Jacobian represents the Fréchet derivative. Merely arranging existing partial derivatives in a matrix does not establish total differentiability.

Composition gives $J_{g\circ f}(x)=J_g(f(x))J_f(x)$. Rank describes the first-order image dimension. A nonsingular Jacobian under continuous differentiability yields a local diffeomorphism; invertible subblocks support the implicit function theorem.

Determinant describes local oriented volume, while singular values describe directional stretching. Unit determinant does not imply length preservation, because stretching and contraction can compensate.

High-dimensional applications often use JVPs and VJPs without storing the full matrix. Coordinate scaling changes entries and conditioning, so comparisons require attention to units and perturbation models.

At nonsmooth points, an automatic differentiation convention need not represent a classical Jacobian.
