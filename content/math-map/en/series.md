## Infinite sums are limits of finite sums

Adding $1,1/2,1/4,1/8$ gives totals $1,1.5,1.75,1.875$. Calling the infinite sum $2$ means the sequence of finite totals approaches $2$, not that an infinite calculation has a final step.

Always distinguish individual terms from accumulated totals. Terms tending to zero are necessary for convergence, but not sufficient.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $a_n$ | Term with index $n$ | Check whether indexing starts at zero or one |
| $S_N,S$ | Partial sum and its limit | $S$ is a convenient mnemonic for sum |
| $\sum,\infty$ | Summation and the limiting direction | Infinity is not a largest integer |
| $r$ | Geometric ratio | A locally defined role |
| $\lvert a_n\rvert $ | Absolute magnitude of a term | Used to test absolute convergence |
| $R_N$ | Tail error $S-S_N$ | Remainder notation presupposes a convergent sum |

$$
S_N=\sum_{n=0}^N a_n,\qquad
\sum_{n=0}^{\infty}a_n=S\iff S_N\to S.
$$

## Derive and use a geometric sum

Multiplying a finite geometric sum by $r$ and subtracting gives

$$
S_N=\frac{1-r^{N+1}}{1-r}\quad(r\ne1).
$$

Only when $|r|<1$ does the power tend to zero, yielding sum $1/(1-r)$. For $r=1/2$, retaining indices zero through three gives $1.875$; the exact sum is $2$, and the missing tail is $0.125$.

The general tail is $r^{N+1}/(1-r)$. Here error below $0.001$ requires $2^{-N}<0.001$, so $N=10$ works. This retains eleven terms, because indexing starts at zero.

## Why small terms can accumulate forever

For the harmonic series, group terms as

$$
1+\frac12+\left(\frac13+\frac14\right)
+\left(\frac15+\cdots+\frac18\right)+\cdots.
$$

Each later group contributes at least $1/2$. There are arbitrarily many groups, so partial sums are unbounded even though individual terms vanish.

The alternating harmonic series converges, but its absolute-value series does not. It is conditionally convergent. For alternating terms with monotonically decreasing magnitudes tending to zero, the first omitted magnitude bounds truncation error.

Absolute convergence permits arbitrary rearrangement without changing the sum. Conditional convergence does not. The issue is exchanging infinite limits, not a failure of ordinary finite addition.

## Exercises

1. Sum $\sum_{n=0}^{\infty}3(1/4)^n$. What is the exact error after the first three terms?
2. Can $\sum_{n=1}^{\infty}n/(n+1)$ converge? Is a complicated test needed?

<!-- solutions -->

### Problem 1

The sum is $4$. The first three terms total $63/16=3.9375$, leaving $1/16=0.0625$. The last retained index is two.

### Problem 2

The terms tend to one, so convergence is impossible. If partial sums converged, their consecutive difference would tend to zero.

Reference: [MIT Real Analysis](https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/).

<!-- formal -->

## Cauchy criterion and tests

A real series converges exactly when

$$
\forall\varepsilon>0\;\exists N\;\forall m>n>N:
\left|\sum_{k=n+1}^{m}a_k\right|<\varepsilon.
$$

Absolute convergence implies this through the triangle inequality. Controlling whole tails is stronger than controlling individual terms.

Comparison tests handle nonnegative series. A ratio or root limsup strictly below one implies absolute convergence; the corresponding lower bound above one prevents terms from vanishing. Equality to one is inconclusive.

For power series, the root test determines the radius of convergence; boundary points require individual analysis. Termwise differentiation and integration inside the radius rely on local uniform convergence.

Absolute convergence legitimizes rearrangement and, for two absolutely convergent series, Cauchy products. Conditional real series may have their sums changed by rearrangement. The alternating-series error bound requires monotone decrease to zero, not merely alternating signs.

Numerical evaluation must distinguish truncation error from floating-point error. An analytical tail bound controls only the former.
