## Update beliefs with evidence

Bayes' rule converts how likely evidence is under a hypothesis into how much weight that hypothesis should receive after the evidence. It combines evidence quality with prior prevalence.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $A$ | Hypothesis or event | Such as a product being defective |
| $B$ | Observed evidence | Such as a positive test |
| $P(A)$ | Prior | Weight before this evidence |
| $P(B\mid A)$ | Likelihood term | Evidence probability under the hypothesis |
| $P(B)$ | Evidence probability | Normalizes the result |
| $P(A\mid B)$ | Posterior | Updated weight |
| $A^c$ | Complement | Hypothesis is false |
| $\theta$ | Model parameter | Used in parameter inference |

$$
P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}.
$$
The denominator must be positive. The rule follows by writing the same joint probability in two ways.

## Count ten thousand products

Suppose one percent are defective. A test is positive for ninety percent of defective products and five percent of nondefective products.

In an expected batch of ten thousand, there are one hundred defective and nine thousand nine hundred nondefective products. Expected positive counts are ninety and four hundred ninety-five. Among five hundred eighty-five positives, only ninety are defective:
$$
P(A\mid B)=\frac{0.9(0.01)}{0.9(0.01)+0.05(0.99)}
=\frac2{13}\approx0.1538.
$$
These are expected counts, not guaranteed exact batch counts. High detection sensitivity does not erase a low base rate.

## Another piece of evidence

If two tests are conditionally independent given the true state, two positives give
$$
\frac{0.01(0.9)^2}{0.01(0.9)^2+0.99(0.05)^2}\approx0.76596.
$$
Shared systematic errors can invalidate conditional independence, so squaring the probabilities is not automatic.

For continuous parameters, posterior density is proportional to likelihood times prior density, with an integral normalizer. A density at a precise parameter value is not its point probability.

## Exercises

1. Keep test performance fixed but raise prevalence to ten percent. Find the posterior after one positive.
2. Does evidence equally likely under two hypotheses change their odds?

<!-- solutions -->

### Exercise 1

The result is $0.09/(0.09+0.045)=2/3$.

### Exercise 2

No, provided the common likelihood is positive. Posterior odds equal prior odds times the likelihood ratio, which is one.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Posterior normalization and sequential inference

For parameter $\theta$ and data $D$,
$$
p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}
{\int p(D\mid u)p(u)\,du},
$$
where $u$ is a dummy integration variable. The normalizer must be finite and positive. Improper priors require a separate posterior-propriety check.

Posterior odds equal prior odds times a Bayes factor. Composite hypotheses integrate over within-model parameters rather than merely comparing maximized likelihoods. Sequential updates require correct conditional likelihoods; dependence and duplicated data can otherwise exaggerate certainty.

Density coordinates change under reparameterization with Jacobian factors, while probabilities of corresponding events do not. MAP points can depend on parameterization. Predictions integrate over posterior uncertainty, and decisions additionally need a loss function. Model misspecification remains possible despite internally consistent Bayesian updating.
