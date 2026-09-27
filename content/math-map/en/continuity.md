## Control output error by controlling input error

A temperature controller maps a sensor reading to a power setting. Continuity means that a sufficiently small input error can meet any specified output-error tolerance. It does not mean slow change, and it does not imply differentiability.

For $f(x)=x^2$, changing the input from $2$ to $2.01$ changes the output from $4$ to $4.0401$. The output need not remain fixed; its error must become controllable as the input error decreases.

## Symbols and quantifiers

$$
\forall\varepsilon>0\;\exists\delta>0\;\forall x\in D:
|x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon.
$$

| Symbol | Role | Convention |
| --- | --- | --- |
| $f,D$ | Function and its domain | Function/domain are useful mnemonics, not historical claims |
| $a,x$ | Fixed point and varying nearby input | The fixed point must belong to the domain |
| $\varepsilon$ | Required output accuracy | The tolerance is specified first |
| $\delta$ | Sufficient input tolerance | It may depend on accuracy and location |
| $\lvert \cdot\rvert $ | Real distance | Use a norm or metric in other spaces |
| $\Rightarrow$ | Implication | The reverse implication is not required |
| $\lim_{x\to a}f(x)=f(a)$ | Limit equals actual value | Approaches are taken inside the domain |

One nearby input is insufficient: every input within the chosen neighborhood must satisfy the bound.

## Prove continuity of the square at two

Factor the error:

$$
|x^2-4|=|x-2|\,|x+2|.
$$

1. Impose $|x-2|<1$. Then $1<x<3$, so $|x+2|<5$.
2. The output error is therefore less than $5|x-2|$.
3. Choose $\delta=\min(1,\varepsilon/5)$ to satisfy both restrictions.
4. If the output error must be below $0.05$, input error below $0.01$ is sufficient.

The chosen bound need not be optimal. The proof requires a working bound, not the largest possible one.

## Why the value at the point matters

Let $f(x)=1$ for nonzero $x$, but $f(0)=2$. The limiting value is $1$, different from the actual value, so continuity fails at zero. Changing that value to $1$ removes the discontinuity.

By contrast, $|x|$ is continuous everywhere but not differentiable at zero: its one-sided slopes are $-1$ and $1$. Continuity controls proximity; differentiation asks for a first-order linear model.

On a closed bounded interval, a continuous real function attains extrema. The intermediate value theorem guarantees a target between endpoint values is attained, but does not guarantee uniqueness.

Uniform continuity asks for one tolerance that works at all locations. The square is continuous on the whole real line but not uniformly continuous there. It is uniformly continuous on every fixed compact interval. “Each location has a bound” and “all locations share a bound” have different quantifier orders.

## Exercises

1. Prove $f(x)=3x-1$ is continuous everywhere. Find an input tolerance for output error below $0.006$.
2. For $x\ne1$, let $f(x)=(x^2-1)/(x-1)$. Which value at $1$ makes it continuous? Why is direct substitution invalid?

<!-- solutions -->

### Problem 1

$|f(x)-f(a)|=3|x-a|$, so choose $\delta=\varepsilon/3$. The concrete answer is $0.002$. Independence from $a$ also proves uniform continuity.

### Problem 2

Away from $1$, cancelling the nonzero factor gives $f(x)=x+1$. Its limit at $1$ is $2$, so set $f(1)=2$. The original quotient is undefined there; cancellation establishes equality only where the original denominator is nonzero.

Reference: [MIT Real Analysis](https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/).

<!-- formal -->

## Definition and sequential characterization

For $f:D\subseteq\mathbb R^n\to\mathbb R^m$ and $a\in D$, continuity means

$$
\forall\varepsilon>0\;\exists\delta>0:
x\in D,\ \|x-a\|<\delta\Rightarrow\|f(x)-f(a)\|<\varepsilon.
$$

This relative definition includes isolated domain points. In metric spaces it is equivalent to preservation of every convergent sequence approaching $a$. Failure of the epsilon-delta condition constructs a counterexample sequence with input distance below $1/k$ and a fixed positive output-error lower bound.

## Global consequences

Continuous maps preserve compactness and connectedness. Consequently continuous real functions attain extrema on nonempty compact sets, and continuous images of intervals satisfy the intermediate value property. Sums, products and compositions preserve continuity; quotients require nonzero denominators.

Uniform continuity places the choice of $\delta$ before both points $x,y$. Continuous functions on compact metric spaces are uniformly continuous; the square on the entire real line shows why compactness matters.

Lipschitz control $\|f(x)-f(y)\|\le L\|x-y\|$ implies uniform continuity. A uniformly bounded derivative gives such a bound on convex domains by integration along line segments.

Differentiability implies continuity, but not conversely. A continuous bijection need not have a continuous inverse; a continuous bijection from a compact space to a Hausdorff space does.
