## Turn scores into competing probabilities

Softmax exponentiates real scores and divides by their total, producing positive outputs that sum to one. Increasing one score raises its probability while reducing others through the shared denominator.

Normalization does not automatically make a model's confidence calibrated.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $z_i$ | Class score or logit | One score per class |
| $p_i$ | Predicted probability | Positive and normalized |
| $K$ | Number of classes | Summation range |
| $\exp$ | Natural exponential | Produces positive weights |
| $T$ | Temperature | Positive scalar, not transpose here |
| $y_i$ | Target distribution | One-hot for one observed class |
| $\delta_{ij}$ | Kronecker delta | One for equal indices, zero otherwise |
| $L$ | Cross-entropy loss | Compares prediction with target |

$$
p_i=\frac{e^{z_i}}{\sum_{j=1}^K e^{z_j}}.
$$

## Scores, probabilities, and gradients

For $z=(\log2,0,\log3)$, exponential weights are $(2,1,3)$, giving probabilities $(1/3,1/6,1/2)$.

If the third class is correct, $y=(0,0,1)$ and loss is $-\log(1/2)=\log2\approx0.693147$. The logit gradient is $p-y=(1/3,1/6,-1/2)$. A negative-gradient update raises the target score and lowers the others.

The gradient sums to zero because adding a common constant to all scores leaves probabilities unchanged.

## Stable computation

Scores $(1000,1001,1002)$ risk exponential overflow. Subtract the maximum to obtain $(-2,-1,0)$. The probabilities are approximately $(0.0900306,0.2447285,0.6652410)$.

This is algebraically identical, not a heuristic approximation. Log-softmax also avoids taking logarithms of tiny probabilities that may have underflowed.

Every score affects every probability:
$$
\frac{\partial p_i}{\partial z_j}=p_i(\delta_{ij}-p_j).
$$
The diagonal derivative is positive; off-diagonal derivatives are negative.

Temperature replaces scores with $z_i/T$. At $T=1/2$, the earlier weights become $(4,1,9)$ and probabilities $(2/7,1/14,9/14)$. Lower temperature sharpens, while higher temperature flattens the distribution.

## Exercises

1. Find softmax of two zero scores, then add one hundred to both.
2. For probabilities $(0.2,0.3,0.5)$ and target class two, give the standard cross-entropy logit gradient.

<!-- solutions -->

### Exercise 1

Both cases give $(1/2,1/2)$ because the scores remain equal.

### Exercise 2

Subtract $(0,1,0)$ to get $(0.2,-0.7,0.5)$.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Log-sum-exp and curvature

Softmax is the gradient of $\operatorname{LSE}(z)=\log\sum_i e^{z_i}$. Its Jacobian is
$$
J=\operatorname{diag}(p)-pp^T.
$$
The quadratic form $v^TJv$ is the probability-weighted variance of the entries of $v$, so it is nonnegative. With finite logits, its nullspace consists of constant vectors, reflecting shift invariance.

For normalized target distribution $y$, cross-entropy is $\operatorname{LSE}(z)-y^Tz$, with gradient $p-y$ and Hessian $J$. Temperature introduces factors $1/T$ and $1/T^2$, with probabilities themselves also depending on temperature. Class weights and unnormalized targets modify the formula.

Stable log-sum-exp prevents overflow, and direct log-softmax avoids loss computation through underflowed probabilities. Softmax models mutually exclusive categories; multilabel tasks generally need another output structure. A normalized score vector alone is not a calibration guarantee.
