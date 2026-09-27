## Repeated local downhill steps

Gradient descent computes the current gradient and moves in the opposite direction. The gradient chooses a local direction; the learning rate chooses distance. A correct direction does not justify an arbitrarily large step.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f$ | Scalar objective | To be minimized |
| $x_k$ | Parameters at iteration $k$ | The subscript counts iterations |
| $\nabla f(x_k)$ | Current gradient | Same shape as parameters |
| $\eta_k$ | Positive learning rate | May vary with iteration |
| $L$ | Gradient Lipschitz constant | Controls smoothness |
| $\mu$ | Strong-convexity constant | Lower curvature bound |
| $x_*$ | Minimizer | Star marks the target solution |

$$
x_{k+1}=x_k-\eta_k\nabla f(x_k).
$$

## Follow three iterations

For $f(x)=x^2/2$, start at four with $\eta=0.5$. The iterates are two, one, and one-half. Losses decrease from eight to two, one-half, and one-eighth.

Generally $x_k=4(1-\eta)^k$. With $\eta=1.5$, signs alternate while magnitudes halve. With $\eta=2$, the sequence oscillates between four and negative four. With $\eta=2.5$, magnitudes grow. The convergence range is $0<\eta<2$.

For $f(x,y)=\frac12(x^2+100y^2)$, a rate of $0.01$ removes the second coordinate in one step but multiplies the first by $0.99$ each time. Unequal curvature forces a compromise and motivates scaling or preconditioning.

## A conditional guarantee

If the gradient is $L$-Lipschitz along the relevant segment,
$$
f(x-\eta\nabla f(x))
\le f(x)-\eta(1-L\eta/2)\|\nabla f(x)\|^2.
$$
Thus $0<\eta<2/L$ gives descent away from stationary points. Backtracking can shrink trial steps until a descent condition is satisfied.

Mini-batch gradients are noisy, so individual steps need not decrease the full objective. Stopping should consider gradients, parameter changes, objective changes, and validation behaviour. A tiny loss change can simply mean the learning rate is too small.

## Exercises

1. Starting at three, take two steps on $f(x)=2x^2$ with rate $0.1$.
2. Explain why rates zero and two do not generally solve $x^2/2$.

<!-- solutions -->

### Exercise 1

The gradient is $4x$, so each step multiplies by $0.6$. Iterates are $1.8$ and $1.08$, with losses $6.48$ and $2.3328$.

### Exercise 2

Rate zero never moves. Rate two preserves magnitude while flipping sign unless the initial point is already zero.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Smooth, convex, and stochastic regimes

For an $L$-smooth objective bounded below, a fixed rate in $(0,2/L)$ yields summable descent proportional to squared gradient norm, hence gradients tending to zero. Parameter convergence and global optimality require additional assumptions.

Smooth convex objectives admit sublinear objective-error bounds; strong convexity yields linear rates depending on $L/\mu$. Distinguish distance and objective guarantees.

For a positive-definite quadratic with Hessian $A$, errors satisfy $e_{k+1}=(I-\eta A)e_k$. Convergence requires $|1-\eta\lambda_i|<1$ for every eigenvalue, equivalent to $0<\eta<2/\lambda_{\max}$.

Stochastic gradients need assumptions on bias, variance, and rates. Fixed rates commonly leave a noise neighbourhood. Projection, mirror descent, and natural-gradient methods change feasible geometry or metrics and require their own analyses.
