## Vectors need not be arrows

Displacements, shopping quantities, polynomial coefficients and whole functions can all behave as vectors. A vector space records rules for addition and scalar multiplication shared by these examples.

A basis supplies enough independent building blocks to express every vector uniquely. Coordinates depend on the chosen basis even when the underlying object stays fixed.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $V,\mathbb F$ | Vector space and scalar field | Here the field is usually $\mathbb R$ |
| $u,v$ | Vectors | Membership determines their type |
| $\alpha,\beta$ | Scalar coefficients | Greek letters distinguish roles; negatives are allowed |
| $e_1,\ldots,e_n$ | Basis vectors | A basis need not be orthogonal |
| $x_i$ | Coordinates relative to that basis | Subscripts label components |
| $\operatorname{span}$ | Set of all linear combinations | Not merely a few example combinations |
| $\dim V$ | Number of vectors in a finite basis | Dimension is basis independent |

## Two requirements for a basis

In $v=\sum_i x_i e_i$, spanning guarantees coefficients exist. Linear independence says the only combination giving zero has every coefficient zero. If two coordinate lists represented the same vector, subtracting them would violate independence. Thus a basis gives existence and uniqueness.

## Work through a change of coordinates

Represent $(3,1)^T$ using $e_1=(1,1)^T$ and $e_2=(1,-1)^T$:

1. Write $x_1e_1+x_2e_2=(3,1)^T$.
2. Components give $x_1+x_2=3$ and $x_1-x_2=1$.
3. Adding gives $x_1=2$, then $x_2=1$.
4. Verify $2(1,1)^T+(1,-1)^T=(3,1)^T$.

The vector is unchanged; its new coordinate list is $(2,1)^T$. The superscript $T$ transposes the displayed row into a column.

The line $x+y=1$ is not a subspace under ordinary operations: it lacks zero. The line $x+y=0$ is closed under both operations and is a subspace. Nonnegative-coordinate vectors also fail the real vector-space test because negative scaling leaves the set.

Polynomials of degree at most two form a three-dimensional space with basis $1,t,t^2$. The polynomial $2-3t+t^2$ has coordinates $(2,-3,1)^T$. Here the entire polynomial is a vector, not its value at one input.

All continuous functions cannot be represented exactly by one fixed finite basis. Finite-dimensional coordinate intuition has limits.

## Exercises

1. Do $(1,0)^T,(2,0)^T$ form a basis for the plane? Check both requirements.
2. Add the coordinate vectors of $1+t$ and $2-t+3t^2$ in the basis $1,t,t^2$.

<!-- solutions -->

### Problem 1

The second vector is twice the first, so independence fails. Every combination has zero second component, so spanning also fails.

### Problem 2

$(1,1,0)^T+(2,-1,3)^T=(3,0,3)^T$, representing $3+3t^2$. Coordinatewise addition is valid because both lists use the same basis.

Reference: [MIT Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/).

<!-- formal -->

## Coordinate isomorphism

A vector space is an additive abelian group equipped with scalar multiplication satisfying the field compatibility and distributive laws. A nonempty subset is a subspace exactly when it is closed under linear combinations.

A finite list is a basis exactly when

$$
\Phi:\mathbb F^n\to V,\qquad x\mapsto\sum_i x_i e_i
$$

is a linear bijection. Surjectivity means spanning; injectivity means independence.

Finite bases have the same cardinality. Independent lists extend to bases, and spanning lists can be reduced to bases. If columns of $P$ are new basis vectors in old coordinates, then $[v]_{\rm old}=P[v]_{\rm new}$, which fixes the direction of the change-of-basis matrix.

A basis supplies no inner product by itself. Lengths, angles and orthogonality require additional structure. In infinite dimensions, distinguish algebraic bases using finite combinations from topological expansions involving convergent series.

Matrix spaces are vector spaces with coordinate basis matrices containing one nonzero entry. Their dimension counts independent entries, not the number of displayed rows; this observation underlies matrix differentiation.
