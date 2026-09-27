## A probability-weighted average

Expectation averages values using their probabilities. It is not necessarily the most likely result or even an attainable result: a fair die has mean $3.5$ without having a face labelled $3.5$.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $X$ | Random variable | Has a distribution |
| $x_i,p_i$ | Values and probabilities | Index possible outcomes |
| $\mathbb E[X]$ | Expectation | E recalls expectation |
| $\mu$ | Mean | A common symbol |
| $\operatorname{Var}(X)$ | Variance | Mean squared deviation |
| $\sigma$ | Standard deviation | Nonnegative square root of variance |
| $\operatorname{Cov}(X,Y)$ | Covariance | Mean product of centred variables |

$$
\mathbb E[X]=\sum_i p_ix_i,\qquad
\operatorname{Var}(X)=\mathbb E[X^2]-\mu^2.
$$
Mean has the variable's units; variance has squared units.

## A complete numerical example

A payoff is zero, one hundred, or two hundred with probabilities $0.2,0.5,0.3$.

Its mean is $110$. Its second moment is $17000$. Variance is $17000-12100=4900$, and standard deviation is seventy. Directly weighting squared deviations gives $12100(0.2)+100(0.5)+8100(0.3)=4900$.

The most likely payoff is one hundred, different from the mean. A fee of $120$ makes expected net payoff negative ten, though expectation alone does not summarize all risk.

## Linearity does not need independence

For fixed constants,
$$
\mathbb E[aX+bY+c]=a\mathbb E[X]+b\mathbb E[Y]+c.
$$
This holds whenever the relevant expectations are well-defined, without independence. Variance instead satisfies
$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y).
$$
Independent variables with finite second moments have zero covariance, allowing variances to add.

Nonlinear functions cannot usually be moved outside expectation. In the payoff example, $\mathbb E[X^2]=17000$ but $(\mathbb E X)^2=12100$.

For a uniform variable on $[0,1]$, integration gives mean $1/2$, second moment $1/3$, and variance $1/12$.

## Exercises

1. Find mean and variance of a Bernoulli variable, then substitute $p=0.3$.
2. If $Y=2X+5$ and $X$ has mean three and variance four, find the mean and variance of $Y$.

<!-- solutions -->

### Exercise 1

Since $X^2=X$, mean is $p$ and variance is $p(1-p)$. Numerically they are $0.3$ and $0.21$.

### Exercise 2

The mean is eleven and variance is sixteen. Translation does not affect variance; scaling squares the factor.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Integration, conditioning, and limits

Expectation is integration against a probability measure. Absolute integrability ensures a finite expectation and ordinary linearity. Nonnegative variables may have infinite expectation, but subtracting two infinite positive and negative parts is undefined.

Finite second moments yield covariance matrices that are symmetric positive semidefinite: their quadratic forms are variances of scalar projections.

Conditional expectation preserves integrals over events in the conditioning information. It satisfies the tower property and, in square-integrable spaces, is an orthogonal projection. The law of total variance separates conditional variability from variability of conditional means.

The law of large numbers connects integrable independent identically distributed samples to their mean but does not guarantee finite-sample accuracy. Exchanging limits and expectations needs convergence conditions. Jensen's inequality gives $\phi(\mathbb EX)\le\mathbb E\phi(X)$ for convex $\phi$ when the expressions are meaningful.
