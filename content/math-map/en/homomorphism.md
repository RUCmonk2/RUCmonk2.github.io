## Translate while preserving composition

A group homomorphism preserves the rule for combining elements. Combining first and translating afterward gives the same result as translating each element and then combining.

It may discard information. Recording an integer only by its parity loses magnitude but preserves addition modulo two.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $G,H$ | Source and target groups | Their operations may differ |
| $\varphi$ | Structure-preserving map | A conventional Greek letter for a map |
| $e_G,e_H$ | Identities | Subscripts distinguish groups |
| $\ker\varphi$ | Kernel | Elements mapped to the target identity |
| $\operatorname{im}\varphi$ | Image | Elements actually reached |
| $\cong$ | Isomorphism | Equivalent group structure |

The condition is $\varphi(ab)=\varphi(a)\varphi(b)$, or the corresponding additive version.

## Integer parity

Let $\varphi(n)=n\bmod2$. Three plus four is seven, which maps to one. Mapping separately gives one and zero, whose sum modulo two is one.

All even integers map to zero, so they form the kernel. Both target values occur, so the map is surjective. It is not injective: three and five have the same image. Adding an even integer is an invisible change after translation.

Identity and inverse preservation follow automatically. The equation $\varphi(e_G)=\varphi(e_G)^2$ implies $\varphi(e_G)=e_H$ by cancellation. Applying the map to $aa^{-1}=e_G$ gives $\varphi(a^{-1})=\varphi(a)^{-1}$.

## A matrix example

The determinant maps invertible real matrices to nonzero real numbers under multiplication because $\det(AB)=\det A\det B$.

Its kernel consists of determinant-one matrices, not determinant-zero matrices: the target identity is one. For example, $\operatorname{diag}(2,1/2)$ lies in the kernel despite changing shapes.

A bijective homomorphism is an isomorphism. The parity map is not one, but the quotient of integers by even differences is isomorphic to the two-element additive group.

## Exercises

1. For $\varphi:\mathbb Z\to\mathbb Z$ defined by $\varphi(n)=2n$, find the kernel and image.
2. Is trace a homomorphism from invertible matrix multiplication to real addition?

<!-- solutions -->

### Exercise 1

It preserves addition, has kernel $\{0\}$, and image equal to the even integers. It is injective but not surjective onto all integers.

### Exercise 2

No. For two-by-two identity matrices, $\operatorname{tr}(II)=2$, whereas $\operatorname{tr}(I)+\operatorname{tr}(I)=4$.

Reference: [MIT Modern Algebra](https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/).

<!-- formal -->

## Kernels and quotient structure

The kernel of a homomorphism is a normal subgroup, and the image is a subgroup. Injectivity is equivalent to a trivial kernel. The first isomorphism theorem states $G/\ker\varphi\cong\operatorname{im}\varphi$.

Normality follows by applying the map to $gkg^{-1}$ for a kernel element $k$. Fibres are cosets of the kernel, making the quotient-to-image correspondence well-defined and bijective.

Operations must be stated explicitly. The real exponential is an isomorphism from additive real numbers to positive real multiplication. Matrix exponential does not preserve arbitrary matrix addition as multiplication unless suitable commutation conditions hold.

A representation is a homomorphism into an invertible linear group. It is faithful exactly when its kernel is trivial; otherwise distinct abstract operations become indistinguishable in that representation.
