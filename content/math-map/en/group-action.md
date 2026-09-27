## Let a group act on actual objects

A group describes composition; an action specifies how its elements transform objects. The same square symmetry group can act on vertices, vectors, images, or functions. The object space matters.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $G$ | Group | Supplies composition |
| $X$ | Object set | Vertices, images, or other objects |
| $g\cdot x$ | Action on an object | Not necessarily scalar multiplication |
| $Gx$ | Orbit | Every reachable object |
| $G_x$ | Stabilizer | Group elements fixing the object |
| $\rho(g)$ | Associated transformation | A matrix for a linear action |

A left action satisfies $e\cdot x=x$ and $(gh)\cdot x=g\cdot(h\cdot x)$. The rightmost operation acts first.

## Count square symmetries

The full square symmetry group has eight elements. Choose one corner.

Its orbit contains all four corners. Two operations fix it: identity and reflection in the diagonal through that corner. Thus the stabilizer has size two, and $8=4\cdot2$.

For the centre, every symmetry fixes it: orbit size one and stabilizer size eight. Changing the object changes the stabilizer even when the group stays the same.

The stabilizer is a subgroup because identity fixes the object, compositions of fixing operations fix it, and inverses do too. An orbit contains objects; a stabilizer contains operations. They are usually different kinds of sets.

## Acting on an image function

If an image is a function $f$ on positions, a common induced action is
$$
(g\cdot f)(x)=f(g^{-1}\cdot x).
$$
The inverse asks where the value at a new position came from. After shifting an image one pixel right, the value at position five comes from old position four.

Classification may require unchanged outputs after transformations, while position prediction should transform correspondingly. These are invariance and equivariance, and both require explicit actions on input and output spaces.

## Exercises

1. Restrict to the four rotations of a square. Find a corner's orbit and stabilizer sizes.
2. Let addition modulo three act on itself by $g\cdot x=g+x$. Find the orbit and stabilizer of zero.

<!-- solutions -->

### Exercise 1

The orbit still has four corners, but only identity fixes a corner. The stabilizer size is one.

### Exercise 2

The orbit is the entire three-element set and the stabilizer is $\{0\}$.

Reference: [MIT Modern Algebra](https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/).

<!-- formal -->

## Actions, cosets, and qualifications

An action on $X$ is equivalent to a homomorphism $G\to\operatorname{Sym}(X)$, the group of bijections of $X$. Orbits partition $X$. The orbit of $x$ is naturally bijective with the left coset space $G/G_x$, giving the finite orbit–stabilizer formula. That coset space need not be a quotient group unless the stabilizer is normal.

Faithfulness means no nonidentity element fixes every object. Freeness means each individual stabilizer is trivial. Transitivity means there is only one orbit. These are different properties.

Stabilizers along an orbit are conjugate: $G_{g\cdot x}=gG_xg^{-1}$. Function actions use inverse pullback to preserve composition, possibly combined with a channel representation. Discrete sampling and boundary conventions can limit exact realization of continuous symmetries in software.
