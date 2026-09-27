## Move one input knob at a time

A multivariable function can depend on several independently adjustable inputs. A partial derivative changes one input while holding the others fixed. It gives a local rate along a coordinate direction.

Coordinate directions alone can miss problems along diagonal approaches. Existence of all partial derivatives does not imply continuity or a common linear approximation.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f(x_1,\ldots,x_n)$ | Function with $n$ real inputs | Subscripts distinguish coordinates |
| $x,i$ | Input vector and selected coordinate index | $i$ lies between one and $n$ |
| $e_i$ | Standard basis vector | One in position $i$, zero elsewhere |
| $h$ | Signed increment in that coordinate | Other inputs remain fixed |
| $\partial_i f,\partial f/\partial x_i$ | Partial derivative | The partial symbol emphasizes the selected input |
| $f_x,f_y$ | Two-variable abbreviations | These subscripts mean differentiation, not sequence indices |
| $\nabla f$ | Column of first partials | Gradient interpretation also involves differentiability and a metric |

$$
\partial_i f(x)=\lim_{h\to0}\frac{f(x+he_i)-f(x)}h.
$$

## Work through both derivatives

For $f(x,y)=x^2y+3y$ at $(2,1)$, hold $y$ fixed to obtain $f_x=2xy=4$. Hold $x$ fixed to obtain $f_y=x^2+3=7$.

The original value is seven. Increasing only $x$ by $0.01$ predicts change $0.04$; the exact change is $0.0401$. Increasing only $y$ by $0.02$ predicts $0.14$, which is exact because the function is linear in $y$ with $x$ fixed.

Partial derivatives can have different units when the inputs do. Comparing their raw magnitudes is not automatically a scale-independent importance ranking.

Mixed derivatives here agree: differentiating in either order gives $2x$. Continuous second partials provide a standard sufficient condition for this equality. Existence at one point alone does not.

## A counterexample to a tempting shortcut

Define $g(0,0)=0$ and $g(x,y)=xy/(x^2+y^2)$ elsewhere. On either coordinate axis it is zero, so both partials at the origin are zero. Along $x=y=t\ne0$, however, it equals $1/2$ and fails to approach its value at the origin.

Thus coordinate derivatives can exist even when the function is discontinuous. Total differentiability must control all sufficiently small perturbations together.

## Exercises

1. Differentiate $xy^2+\sin x$ with respect to both inputs and evaluate at $(0,2)$.
2. For $f(x,y)=x^2+y^2$ at the origin, write the exact perturbation and justify its first-order behavior rather than relying on one partial.

<!-- solutions -->

### Problem 1

The partials are $y^2+\cos x$ and $2xy$, giving five and zero. The sine term is constant when differentiating with respect to $y$.

### Problem 2

The change is $h_x^2+h_y^2$. Dividing by $\sqrt{h_x^2+h_y^2}$ gives a quantity tending to zero. The full perturbation calculation establishes a zero first-order model.

Reference: [MIT Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Coordinate derivatives and differentiability

Partials are derivatives of coordinate slices. Fréchet differentiability implies their existence and identifies them with derivative-matrix entries. The converse fails, even if continuity is the desired weaker conclusion.

Existence of first partials in a neighborhood, together with continuity of those partials at the point, is sufficient for differentiability. Decompose a perturbation coordinate by coordinate and use the one-dimensional mean value theorem to control the remainder.

Continuous second partials imply mixed-partial symmetry; pointwise existence alone does not. Coordinate changes require chain rules, and constrained physical derivatives must specify what is held fixed.

Central differences have second-order truncation error under suitable smoothness, but excessively small steps amplify rounding or noise. Input units may require different step sizes.

Automatic differentiation follows the executed computation. It does not remove discontinuities or nonsmoothness from the original function.
