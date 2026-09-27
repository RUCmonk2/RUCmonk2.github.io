## Replace a function by a controlled local model

To estimate $e^{0.1}$, start from $e^0=1$. The tangent approximation gives $1.1$; adding curvature gives $1+0.1+0.1^2/2=1.105$. The exact value is about $1.105170$. Taylor approximation organizes local behavior by degree.

The remainder is essential. A polynomial without an error statement may be unreliable away from its expansion point.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f,a,h$ | Function, expansion point, increment | The actual input is $a+h$ |
| $f^{(k)}(a)$ | Derivative of order $k$ | The parenthesized superscript is not a power |
| $k!$ | Factorial, with $0!=1$ | Compensates for repeated differentiation |
| $P_m,R_m$ | Degree-$m$ polynomial and remainder | Polynomial/remainder are mnemonic names |
| $\xi$ | An intermediate point | Existence does not require explicitly finding it |
| $o(h^2),O(h^3)$ | Negligible quadratic-scale error, bounded cubic-scale error | These assert different asymptotic information |
| $e$ | Base of the natural exponential | All derivatives of $e^x$ at zero equal one |

Matching the value and first two derivatives of $c_0+c_1h+c_2h^2$ gives $c_0=f(a)$, $c_1=f'(a)$ and $2c_2=f''(a)$. This explains the factorial rather than merely memorizing it.

$$
f(a+h)=\sum_{k=0}^{m}\frac{f^{(k)}(a)}{k!}h^k+R_m(h).
$$

Under the appropriate smoothness assumptions, $R_m(h)=f^{(m+1)}(\xi)h^{m+1}/(m+1)!$.

## Numerical substitution and a guaranteed bound

For the exponential at zero, the quadratic model gives $1.105$ at $h=0.1$. Its remainder is $e^\xi(0.1)^3/6$, with $0<\xi<0.1$. The geometric comparison $e^{0.1}\le\sum_{k=0}^{\infty}0.1^k=1/0.9<1.112$ bounds the error below $0.000186$ without using the unknown exact answer.

The positive remainder also shows the approximation is low. The actual error is about $0.000170$.

Smoothness does not imply equality with an infinite Taylor series. The function equal to $e^{-1/x^2}$ away from zero and zero at zero has all derivatives zero there, yet is positive elsewhere. Finite-order approximation and analytic representation are different claims.

## Exercises

1. Estimate $\sqrt{1.04}$ with a quadratic Taylor model. Identify the function, point and increment.
2. Estimate $\sin(0.2)$ with a cubic polynomial and justify a fifth-order error bound.

<!-- solutions -->

### Problem 1

Use $f(x)=\sqrt x$, $a=1$, $h=0.04$, with derivatives $1/2$ and $-1/4$. The result is $1+0.02-0.0002=1.0198$, compared with about $1.019804$.

### Problem 2

The value $0.2-0.2^3/6$ is $0.198666667$. Since the fourth-degree coefficient is zero, view this as the fourth-order Taylor polynomial. The remainder is bounded by $0.2^5/120\approx0.000002667$.

Reference: [MIT Real Analysis](https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/).

<!-- formal -->

## Finite-order expansion

Appropriate differentiability gives a Peano remainder $o(|h|^m)$. Under $C^{m+1}$ regularity, the integral remainder is

$$
R_m(h)=\frac1{m!}\int_0^h(h-t)^m f^{(m+1)}(a+t)\,dt.
$$

A derivative bound $M$ yields $|R_m(h)|\le M|h|^{m+1}/(m+1)!$. Peano information alone does not supply such an explicit constant.

The multivariable version uses multilinear derivatives, with quadratic term $\frac12h^TH_f(a)h$. Matrix variables fit the same finite-dimensional Fréchet framework, but noncommuting products require preserving order.

Analyticity requires controlling remainders as order tends to infinity, not merely taking small increments at a fixed order. Smooth flat functions show the distinction.

Numerical use should choose expansion point and degree for a specified error. Singularities affect convergence radius. Small absolute error need not imply small relative error when the function itself is near zero.
