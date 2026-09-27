## Approaching is not the same as arriving

The sequence $a_n=1/n$ starts $1,1/2,1/3,1/4$. No term is zero, yet its limit is zero. The claim is that any positive error tolerance eventually contains every remaining term. It does not require a final term or monotone improvement at every step.

Completeness asks a different question: when late terms become arbitrarily close to one another, does their destination exist inside the number system? Real numbers have this property; rational numbers can leave gaps.

## Read the definition

$$
a_n\to a\iff\forall\varepsilon>0\;\exists N\in\mathbb N\;
\forall n>N:\ |a_n-a|<\varepsilon.
$$

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $a_n,a$ | Term number $n$, candidate limit | Subscripts label members of a sequence |
| $n,N$ | Varying index, chosen threshold | Capitalization distinguishes roles, not mathematical types |
| $\mathbb N,\mathbb R,\mathbb Q$ | Natural, real and rational numbers | Blackboard-bold letters denote number systems |
| $\varepsilon$ | Any positive error tolerance | Epsilon is customary; it is not one permanently tiny constant |
| $\forall,\exists,\iff$ | For every, there exists, if and only if | Their order is part of the assertion |
| $\lvert a_n-a\rvert $ | Distance on the real line | Absolute value removes the sign |
| $\to$ | Tends to | Convergence does not mean eventual equality |

First someone chooses the tolerance. Then you choose a threshold. Every later index must work. The threshold may depend on the tolerance; finitely many early exceptions are harmless.

## Calculate, then prove

1. For tolerance $0.1$, the inequality $1/n<0.1$ requires $n>10$.
2. For tolerance $0.001$, it requires $n>1000$.
3. For arbitrary $\varepsilon>0$, choose a natural number $N>1/\varepsilon$.
4. Whenever $n>N$, $|a_n-0|=1/n<1/N<\varepsilon$.

The numerical cases suggest the result. The final two steps prove it for every tolerance. Checking a million terms cannot replace that quantifier.

The alternating sequence $(-1)^n$ does not converge: arbitrarily late terms still equal both $1$ and $-1$. No single target can lie within $1/2$ of both. Also, adjacent differences tending to zero do not imply convergence: harmonic partial sums have increments $1/n$, but grow without bound.

## Why completeness enters

A Cauchy sequence satisfies

$$
\forall\varepsilon>0\;\exists N\;\forall m,n>N:
|a_m-a_n|<\varepsilon.
$$

The indices $m,n$ independently select late terms. No destination is specified. In the real numbers every Cauchy sequence converges. Rational decimal approximations to $\sqrt2$ form a Cauchy sequence, but their limit is not rational. Greater computational precision does not fill the missing point in that number system.

## Exercises

1. Find the limit of $a_n=3+2/n$, a threshold for error below $0.01$, and a proof for arbitrary tolerance.
2. Does $(-1)^n/n$ converge? Is monotonicity necessary? Give the controlling inequality.

<!-- solutions -->

### Problem 1

The target is $3$ and the error is $2/n$. Taking $N=200$ ensures strict error below $0.01$ for every $n>N$. Generally choose $N>2/\varepsilon$.

### Problem 2

The absolute error from zero is $1/n$, so the previous proof applies. The signs alternate and the sequence is not monotone. Monotonicity is a useful sufficient condition when combined with boundedness, not a necessary condition for convergence.

Reference: [MIT Real Analysis](https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/).

<!-- formal -->

## Completeness and limits

The least-upper-bound property of the real numbers yields monotone convergence, nested-interval results, Bolzano–Weierstrass and Cauchy completeness. Equivalence statements require their ordered-field setting.

Limits are unique. If $a_n\to a$ and $a_n\to b$, then

$$
|a-b|\le|a-a_n|+|a_n-b|.
$$

When $a\ne b$, choosing both errors below $|a-b|/3$ gives a contradiction.

## Cauchy characterization

Convergence implies the Cauchy property by bounding each distance to the limit by $\varepsilon/2$. Conversely, a real Cauchy sequence is bounded, has a convergent subsequence, and converges to that subsequence's limit because

$$
|a_n-a|\le|a_n-a_{n_k}|+|a_{n_k}-a|.
$$

Choose compatible thresholds for the two terms. The converse depends on completeness, and fails in the rationals.

Sums, products and differences preserve limits. Quotients require a nonzero denominator limit, which keeps denominators eventually away from zero. Product proofs use boundedness of convergent sequences.

In infinite-dimensional spaces, boundedness generally does not guarantee a convergent subsequence. Real finite-dimensional compactness conclusions must not be transferred without checking the topology and hypotheses.
