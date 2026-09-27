## Let outputs transform predictably

Equivariance says that transforming an input before applying a model equals transforming the output afterward. It encodes a known symmetry rather than requiring data to teach the relation from scratch.

An object-location prediction should move with a shifted image. A class label may remain unchanged. Invariance is the special case with a trivial output action.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $G,g$ | Transformation group and element | Specify the required operations |
| $X,Y$ | Input and output spaces | May have different actions |
| $f$ | Model | Maps inputs to outputs |
| $\rho_X(g),\rho_Y(g)$ | Input and output actions | Matrices for linear representations |
| $W,P$ | Layer and permutation matrices | Used in the example |
| $I,J$ | Identity and all-ones matrices | Describe shared-weight structure |

$$
f(\rho_X(g)x)=\rho_Y(g)f(x).
$$

## Swap two coordinates

Let $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ and $W=\begin{pmatrix}2&1\\1&2\end{pmatrix}$. For $x=(1,3)^T$, the output is $(5,7)^T$.

Swapping the input gives $(3,1)^T$, whose output is $(7,5)^T$. Swapping the original output gives the same answer. Algebraically, $WP=PW$.

Replacing $W$ with $\operatorname{diag}(2,1)$ produces $(6,1)^T$ by the first path and $(3,2)^T$ by the second, so equivariance fails.

## Shared weights and practical limits

A linear layer commuting with every coordinate permutation has form $aI+bJ$: each output combines its own input with a shared sum of all inputs. This reduces parameters because of a specified symmetry, not arbitrary compression.

Imposing all permutations on a task where order matters can erase useful information. Ideal convolution commutes with translation, but padding, cropping, stride, and subsampling can limit exact equivariance in finite implementations.

Equivariant elementwise features followed by sum or mean pooling can yield a permutation-invariant output. Pooling too early may remove information needed for localization.

## Exercises

1. Is $s(x)=x_1+x_2$ invariant to the swap? Check $(1,3)$.
2. For $f(x)=Wx+b$, what additional condition must the bias satisfy?

<!-- solutions -->

### Exercise 1

Yes. The sum is four before and after swapping.

### Exercise 2

Besides $WP=PW$, require $Pb=b$. The two bias entries must therefore be equal.

Reference: [Geometric Deep Learning](https://geometricdeeplearning.com/).

<!-- formal -->

## Intertwiners and compatible operations

Linear equivariance is the intertwining condition $W\rho_X(g)=\rho_Y(g)W$. Affine maps additionally require output-invariant biases. Pointwise nonlinearities commute with permutations, but coordinatewise ReLU generally fails to commute with vector rotations.

Compositions of compatible equivariant maps remain equivariant. Invariant pooling yields invariant outputs but changes retained information. Positional encodings, direction labels, and node types must be included in the declared action if symmetry claims are to remain accurate.

Ideal convolutional guarantees depend on domains and boundary rules. Interpolation introduces approximation for many discrete rotations. Data augmentation encourages consistency but does not establish an architectural identity.

Numerical checks compare the two transformation paths with suitable tolerances. They must distinguish floating-point error, sampling approximation, and structural violations; finitely many tests are evidence rather than proof for every group element.
