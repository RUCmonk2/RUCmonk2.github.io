## Consistent weights for uncertainty

Probability assigns consistent weights to events. Distinguish an outcome, an event, a random variable, and its distribution. For a die, an outcome is one face; “even” is an event; the square of the face value is a random variable.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $\Omega,\omega$ | Outcome space and one outcome | Standard omega notation |
| $A,B$ | Events | Measurable sets of outcomes |
| $P(A)$ | Probability | $P$ recalls probability |
| $X$ | Random variable | A mapping, not a fixed unknown constant |
| $p(x)$ | Discrete mass | Probability of one value |
| $f(x)$ | Continuous density | Integrate to obtain probability |
| $A\cap B$ | Intersection | Both events occur |

Probabilities are nonnegative, total probability is one, and disjoint events add. Counting favourable outcomes works only when individual outcomes have equal weights.

## Condition on a die result

For a fair die, let $A$ be even and $B$ be greater than three. Each has probability $1/2$, but their intersection $\{4,6\}$ has probability $1/3$.

Given $B$, the candidates are four, five, and six; two are even, so $P(A\mid B)=2/3$. Generally,
$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(B)>0.
$$
The events are not independent because $1/3\ne1/4$.

## A density can exceed one

A uniform variable on $[0,1/2]$ has density two: height times width is one. Its probability of falling in $[0.1,0.2]$ is $2(0.1)=0.2$.

Density is not point probability. Every single point has probability zero in this example. Density also has reciprocal units of the variable, unlike dimensionless probability.

Marginal distributions do not determine dependence. Two binary variables can each look like a fair coin while being independent, or they can be two records of the same coin outcome. Their marginals agree but their joint distributions differ.

## Exercises

1. For two independent fair coins, find the distribution of the number of heads.
2. For the uniform variable above, find the probability of $[0.2,0.5]$ and of the single point $0.2$.

<!-- solutions -->

### Exercise 1

The probabilities for zero, one, and two heads are $1/4,1/2,1/4$.

### Exercise 2

The interval has probability $2(0.3)=0.6$. The point has probability zero because its length is zero.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Measures and conditional structure

A probability space is $(\Omega,\mathcal F,P)$ with a sigma algebra of events and a normalized countably additive measure. A random variable is a measurable map; its distribution is the pushforward measure.

Mass functions, densities, and cumulative distribution functions are distinct representations. Not every distribution admits a Lebesgue density. Densities are defined only up to almost-everywhere equality.

Conditioning on a positive-probability event uses a ratio. Conditioning on an exact continuous value instead requires an appropriate conditional density or regular conditional distribution. Pairwise independence does not imply mutual independence, and zero correlation generally does not imply independence.

Probability axioms ensure internal consistency, not empirical model adequacy. A likelihood as a function of parameters is not automatically a parameter probability distribution; a posterior additionally requires a prior and normalization.
