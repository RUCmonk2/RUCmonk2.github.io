## Reversible operations with a composition rule

A group abstracts operations that can be combined and undone. Rotating a square twice by a quarter turn equals a half turn; reversing a rotation undoes it. The composition law matters more than where the square is drawn.

A group need not be geometric. Integers under addition and invertible matrices under multiplication are examples. Always specify both the set and the operation.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $G$ | The group | Commonly chosen from “group” |
| $a,b,c$ | Arbitrary elements | They may be transformations |
| $ab$ | Group operation | Not necessarily numerical multiplication |
| $e$ | Identity | No net change |
| $a^{-1}$ | Inverse | Undoes $a$ |
| $a^k$ | Repeated composition | Integer exponent |
| $\lvert G\rvert$ | Group order | Number of elements when finite |

The requirements are closure, associativity $(ab)c=a(bc)$, an identity, and inverses. Commutativity $ab=ba$ is optional; groups satisfying it are abelian.

## Four rotations

Let $r$ rotate a square counterclockwise by ninety degrees. The rotation group is $\{e,r,r^2,r^3\}$, with $r^4=e$.

Then $r^3r^2=r^5=r$, the inverse of $r$ is $r^3$, and $r^2$ is its own inverse. Encoding the rotations as $0,1,2,3$ turns composition into addition modulo four: three plus two becomes one after removing a full revolution.

## Order can matter

Let $s$ reflect across the horizontal axis. Starting at $(1,0)$, reflect then rotate to obtain $(0,1)$. Rotate then reflect to obtain $(0,-1)$. Under right-to-left function composition, $rs\ne sr$.

Integers under addition have identity zero and additive inverses. Nonzero real numbers under multiplication have identity one and reciprocals. Including zero destroys the latter group because zero has no multiplicative inverse.

Group axioms imply unique identity and inverses. They also justify cancellation: from $ab=ac$, multiply on the left by $a^{-1}$ to obtain $b=c$. Cancellation must respect order.

## Exercises

1. Find the inverse of three and the sum of two with itself in addition modulo four.
2. Do invertible real two-by-two matrices form a group under addition?

<!-- solutions -->

### Exercise 1

Three has inverse one; two plus two equals zero. The identity for this additive notation is zero.

### Exercise 2

No. Both $I$ and $-I$ are invertible, but their sum is the singular zero matrix. Closure fails. Invertible matrices instead form a group under multiplication.

Reference: [MIT Modern Algebra](https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/).

<!-- formal -->

## Structure and representations

A group is a set with an associative operation, an identity, and inverses. Closure is implicit in declaring a map $G\times G\to G$. The axioms imply cancellation and $(ab)^{-1}=b^{-1}a^{-1}$.

The order of an element is the least positive $k$ with $g^k=e$, if one exists; it differs from the cardinality of the group. In a finite group, element order divides group order by Lagrange's theorem. Cyclic groups are abelian, but not all abelian groups are cyclic.

Actions connect abstract elements to transformations of objects; representations connect them to invertible linear maps. Equivariant models must specify both input and output actions. Noninvertible transformations such as cropping do not automatically form a group and may require semigroup or more general language.
