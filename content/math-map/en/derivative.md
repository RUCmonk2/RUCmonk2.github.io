## From average speed to local change

For position $f(t)=t^2$, the average speed from $2$ to $2.1$ is $4.1$. From $2$ to $2.01$ it is $4.01$. A derivative is the limit of such ratios as the interval shrinks; it never requires dividing by zero.

Geometrically these are secant slopes approaching a tangent slope. More generally, differentiation finds a linear model of a small change.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f,x,t$ | Function and input; $t$ often denotes time | Letters do not determine physical units |
| $a$ | Fixed evaluation point | Any consistently defined name works |
| $h$ | Positive or negative input increment | A customary step-size symbol |
| $f'(a)$ | Derivative at the point | A prime denotes one derivative |
| $df,dx$ | First-order output differential and input perturbation | $d$ marks differentiation |
| $o(h)$ | Error negligible compared with $\lvert h\rvert $ | Little-o is an asymptotic statement |
| $[a,b],c$ | Interval and an interior point | The theorem does not prescribe the midpoint |

If output is measured in metres and input in seconds, the derivative has units metres per second.

## Derive the formula

$$
f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}h,\qquad
f(a+h)=f(a)+f'(a)h+o(h).
$$

For the square, expanding and cancelling nonzero $h$ gives

$$
\frac{(a+h)^2-a^2}{h}=2a+h\longrightarrow2a.
$$

Cancellation occurs before the limit. The exact omitted term in the linear approximation is $h^2$.

At $a=2$, $h=0.01$, the prediction is $4+4(0.01)=4.04$, while the exact result is $4.0401$. The error is $0.0001$. Halving the step divides this quadratic error by four. A derivative is local: using an increment of ten would leave a very large omitted term.

## The mean value theorem

Continuity on $[a,b]$ and differentiability on $(a,b)$ imply some interior point satisfies

$$
f'(c)=\frac{f(b)-f(a)}{b-a}.
$$

For the square on $[1,3]$, the average slope is $4$, reached by the derivative at $c=2$. Other functions need not realize their average slope at the midpoint; there may be several suitable points.

The absolute-value function is continuous at zero but has one-sided slopes $-1$ and $1$, so it is not differentiable there. Meanwhile $x^3$ has zero derivative at zero without having an extremum. These examples distinguish continuity, differentiability and stationarity.

## Exercises

1. Use the definition for $f(x)=3x^2+1$ at $a=1$. Predict $f(1.02)$ and calculate the error.
2. Find all mean-value-theorem points for $x^3$ on $[0,2]$.

<!-- solutions -->

### Problem 1

The difference quotient is $6+3h$, giving derivative $6$. Prediction: $4.12$. Exact value: $4.1212$. Error: $3(0.02)^2=0.0012$.

### Problem 2

The average slope is $4$. Solve $3c^2=4$ to obtain $\pm2/\sqrt3$, then keep only $2/\sqrt3$, which belongs to $(0,2)$.

Reference: [MIT Real Analysis](https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/).

<!-- formal -->

## Differentiability

At an interior point, differentiability is equivalent to existence of a unique scalar $L$ with $f(a+h)-f(a)-Lh=o(|h|)$. The scalar is $f'(a)$. This is the one-dimensional Fréchet derivative and immediately implies continuity.

## Mean value theorem

Rolle's theorem follows from attainment of extrema on a compact interval and the necessary zero-derivative condition at interior differentiable extrema. Apply it to

$$
g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a),
$$

whose endpoint values coincide. The result is the usual mean value theorem.

Consequences on intervals include: zero derivative implies constancy; nonnegative derivative implies monotonicity; a bound $|f'|\le M$ yields Lipschitz control with constant $M$. Connected interval structure matters.

For vector-valued functions, one point generally cannot match all componentwise average derivatives. Integral formulas and norm estimates are safer replacements. A derivative need not be continuous, although it has the intermediate value property. Stationarity is necessary only for interior differentiable extrema; boundaries and nonsmooth extrema require separate analysis.
