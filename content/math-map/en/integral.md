## Add up local contributions

To obtain displacement from changing velocity, divide time into short intervals, multiply a representative velocity by each interval's duration, and add the results. If increasingly fine sums approach a sampling-independent number, that number is the definite integral.

An integral is directed accumulation, not always unsigned area. Negative velocity contributes negative displacement. Distance travelled requires the integral of speed, the absolute value of velocity.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f(t)$ | Integrand and dummy variable | The dummy variable may be renamed consistently |
| $a,b$ | Integration endpoints | Reversing them reverses the sign |
| $\int,dt$ | Integration and the variable/scale of accumulation | The differential is essential in substitutions |
| $\Delta t_i,\xi_i$ | Subinterval width and sample point | Delta marks an increment; xi names a sample |
| $F,F'$ | Accumulation function and its derivative | Capitalization distinguishes related functions |
| $C$ | Arbitrary constant | Antiderivatives differ by constants on an interval |

Velocity times duration has units of length. This also explains why widths cannot be omitted from a Riemann sum.

## From finite sums to integrals

$$
\int_a^b f(t)\,dt=
\lim_{\max_i\Delta t_i\to0}\sum_i f(\xi_i)\Delta t_i.
$$

Every summand is a rectangular approximation. The maximum interval width must tend to zero; simply adding a few points somewhere is insufficient. Continuity on a compact interval guarantees integrability, though it is not necessary.

For $f(t)=t$ on $[0,2]$, two left-endpoint rectangles give $1$ and two right-endpoint rectangles give $3$. Four rectangles give $1.5$ and $2.5$. The exact answer is the triangular area $2$, also obtained from $[t^2/2]_0^2=2$.

## Why differentiation reverses accumulation

Set $F(x)=\int_a^x f(t)\,dt$. Then

$$
F(x+h)-F(x)=\int_x^{x+h}f(t)\,dt.
$$

When $f$ is continuous at $x$, this short accumulation is approximately $f(x)h$. Divide by $h$ and take the limit to obtain $F'(x)=f(x)$. Conversely, a suitable antiderivative $G$ gives $\int_a^b f=G(b)-G(a)$.

The integral $\int_{-1}^1t\,dt$ is zero by cancellation, while $\int_{-1}^1|t|\,dt=1$. Indefinite integration gives a family such as $t^2+C$; a definite integral gives a number, without an additional arbitrary constant.

At a jump in the integrand, the accumulation can remain continuous without being differentiable there. The pointwise derivative conclusion needs continuity at the point, or a suitably qualified more general theorem.

## Exercises

1. With velocity $v(t)=2t+1$ for three seconds, find displacement and a position function satisfying $s(0)=0$.
2. Evaluate $\int_{-2}^2x\,dx$ and $\int_{-2}^2|x|\,dx$. Explain the difference geometrically.

<!-- solutions -->

### Problem 1

An antiderivative is $t^2+t$. The displacement is $12$ and $s(t)=t^2+t$. Differentiating checks the velocity and substitution checks the initial condition.

### Problem 2

The directed integral is zero. The absolute-value integral is the sum of two triangles, each of area $2$, hence $4$. Cancellation of displacement does not cancel distance travelled.

Reference: [MIT Real Analysis](https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/).

<!-- formal -->

## Fundamental theorem

If $f$ is Riemann integrable on a compact interval and continuous at $x$, its accumulation function satisfies

$$
\left|\frac{F(x+h)-F(x)}h-f(x)\right|
\le\sup_{t\text{ between }x,x+h}|f(t)-f(x)|\to0.
$$

For continuous $f$ and $G'=f$, the difference between $G$ and the accumulation function has zero derivative, so the mean value theorem yields the endpoint formula.

## Estimates and limits

Linearity, interval additivity and

$$
\left|\int_a^b f\right|\le\int_a^b|f|
\le(b-a)\sup_{[a,b]}|f|
$$

give uniform-error control. In particular, uniform convergence on a finite interval permits exchanging limit and integral by bounding the integral error by $(b-a)\|f_n-f\|_\infty$. Pointwise convergence alone does not justify this argument.

For Lebesgue integrable functions, indefinite integrals are absolutely continuous and differentiate to the integrand almost everywhere. The reverse direction requires absolute continuity; almost-everywhere differentiability alone is insufficient.

Improper integrals require additional limits at singular endpoints or infinity. Check convergence before applying endpoint formulas or exchanging limits.
