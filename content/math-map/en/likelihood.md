## Hold the observations fixed

Probability fixes parameters and describes possible data. Likelihood fixes observed data and compares parameters. The numerical expression may be the same, but the variable changes.

Likelihood is not automatically a probability distribution over parameters and need not integrate to one over parameter space.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $D=(x_1,\ldots,x_n)$ | Observations | $n$ is sample size |
| $\theta$ | Parameter | A success probability in the example |
| $p(x\mid\theta)$ | Sampling model | Distribution of data at fixed parameters |
| $L(\theta;D)$ | Likelihood | L recalls likelihood |
| $\ell(\theta)$ | Log likelihood | Lowercase ell |
| $\hat\theta$ | Estimate | A hat marks a data-derived estimate |
| $k$ | Observed successes | A fixed count |
| $\arg\max$ | Maximizing parameters | Not the maximum function value |

For independent identically distributed observations, $L=\prod_i p(x_i\mid\theta)$ and $\ell=\sum_i\log p(x_i\mid\theta)$.

## Seven heads in ten tosses

For a particular sequence with seven heads and three tails, $L(\theta)=\theta^7(1-\theta)^3$. Differentiating its logarithm gives $7/\theta-3/(1-\theta)$. Setting it to zero yields $\hat\theta=0.7$.

The sequence probability is approximately $0.0022235661$ at $0.7$, versus $0.0009765625$ at $0.5$. Their ratio is about $2.27693$.

If the observation is only the count of seven heads, multiply by the binomial coefficient one hundred twenty. This changes the event probability but not the maximizing parameter because the factor is parameter-independent.

## Why use logarithms?

Logarithms preserve the maximizer of a positive likelihood, turn products into sums, and avoid multiplying tiny probabilities. Negative log likelihood turns maximization into minimization.

Ten heads out of ten place the Bernoulli maximizer at the boundary one; an interior stationary equation is not the right solution method. This does not prove that a future tail is impossible.

Increasing model flexibility can improve training likelihood without improving future predictions. Regularization, priors, and validation address different aspects of this issue.

## Exercises

1. Find the Bernoulli maximum-likelihood estimate from two successes in eight trials.
2. For a normal model with known fixed variance and observations one, two, six, estimate the mean.

<!-- solutions -->

### Exercise 1

The estimate is $2/8=0.25$.

### Exercise 2

The estimate is three. Up to constants and a positive scale, negative log likelihood is the sum of squared deviations from the mean.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Existence, scores, and information

Likelihood is a sampling density viewed as a parameter function. Parameter-independent positive factors preserve likelihood ratios and maximizers. For continuous observations it is a density value rather than a point-event probability.

A maximum may be absent, nonunique, or on the boundary. An interior differentiable maximum satisfies zero score, $s(\theta)=\nabla_\theta\ell(\theta)$, but stationarity alone does not establish maximality.

Under suitable regularity, Fisher information equals the expected score outer product and the expected negative Hessian. Standard consistency, asymptotic normality, and efficiency results require identifiability, sampling, and regularity assumptions. Boundary and singular models can violate them.

Maximum likelihood transforms consistently under one-to-one reparameterization. MAP additionally uses a prior, while marginal likelihood integrates over parameters. Neither should be confused with maximizing the sampling likelihood.
