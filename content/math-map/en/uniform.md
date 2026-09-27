## Can one threshold work for every input?

Pointwise convergence says that after fixing an input, increasingly accurate functions eventually meet any error tolerance there. Uniform convergence demands one accuracy threshold that works simultaneously across the whole domain.

The distinction controls preservation of continuity and exchange of limits with integration. “Every point eventually works” does not mean “eventually all points work.”

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f_n,f$ | Approximating functions and their limit | Subscripts index functions |
| $D,x$ | Common domain and an input | Domain matters to the claim |
| $n,N$ | Approximation index and threshold | A uniform threshold cannot depend on $x$ |
| $\varepsilon$ | Any positive error tolerance | Not one fixed machine precision |
| $\sup$ | Least upper bound of errors | The bound need not be attained |
| $\Vert\cdot\Vert_\infty$ | Supremum norm | The subscript denotes worst-case control |

$$
\sup_{x\in D}|f_n(x)-f(x)|\to0.
$$

Uniform convergence chooses $N$ before the input point. Pointwise convergence permits $N$ to depend on that point.

## A uniform example

On $[0,1]$, let $f_n(x)=x/n$ and $f(x)=0$. Every error is at most $1/n$, attained at one. To make all errors smaller than $0.01$, choose $n>100$. Generally $N>1/\varepsilon$ works independently of the input.

On the whole real line, the same sequence converges pointwise but not uniformly: for any fixed index, inputs can be arbitrarily large. Always state the domain.

## A shrinking bad region

For $f_n(x)=x^n$ on $[0,1]$, the pointwise limit is zero below one and one at the endpoint. At every finite index, select $x=2^{-1/n}<1$. Its current value is $1/2$, while its limit value is zero. Thus the worst error cannot vanish.

The troublesome input moves with the approximation index. Pointwise tests hold the input fixed and miss this phenomenon.

Uniform convergence preserves continuity through a three-term error estimate. On a finite interval, integral error is bounded by interval length times maximum function error, allowing limit and integral to commute. Differentiation is more sensitive and needs additional hypotheses.

## Exercises

1. On $[0,2]$, does $x^2/n$ converge uniformly to zero? Find an index bound for error below $0.02$.
2. The functions $\sin(nx)/n$ converge uniformly to zero on the real line. What are their derivatives at zero, and what does this show?

<!-- solutions -->

### Problem 1

The maximum error is $4/n$. Uniform convergence follows, and strict error below $0.02$ requires $n>200$.

### Problem 2

The bound $|\sin(nx)/n|\le1/n$ proves uniform convergence. The derivative is $\cos(nx)$ and equals one at zero, whereas the zero limit function has derivative zero. Uniform convergence alone does not permit interchanging limit and derivative.

Reference: [MIT Real Analysis](https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/).

<!-- formal -->

## Uniform norm and completeness

Uniform convergence means the supremum of differences tends to zero. The functions themselves need not all be bounded; the differences must obey the stated eventual bounds. In the space of bounded functions it is convergence in the supremum norm.

Uniform Cauchy control, together with completeness of the real numbers at every point, gives a uniform limit and proves completeness of the bounded-function space.

## Exchanging operations

Uniform limits of continuous functions are continuous. On finite intervals, uniform limits of integrable functions are integrable and integrals converge. Infinite intervals require additional control.

If continuously differentiable functions have uniformly convergent derivatives and converge at one fixed point, use

$$
f_n(x)=f_n(a)+\int_a^x f_n'(t)\,dt
$$

to obtain uniform function convergence and identify the derivative of the limit. Uniform convergence of the functions alone is insufficient.

For function series, bounds $|g_n(x)|\le M_n$ with $\sum M_n<\infty$ imply uniform absolute convergence by the Weierstrass test. This sufficient condition is not necessary. Local uniform convergence on compact subsets need not become global uniform convergence on a noncompact domain.
