## Send a change through several stages

First apply one function, then another. The chain rule propagates the first stage's linearized output change through the second stage's derivative.

In several dimensions this means composing linear maps. Order, evaluation point and matrix shape follow the actual data flow.

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f:\mathbb R^n\to\mathbb R^m$ | First stage | Produces an intermediate value |
| $g:\mathbb R^m\to\mathbb R^k$ | Second stage | Receives the first stage's output |
| $g\circ f$ | Composition | The right-hand function acts first |
| $x,z=f(x)$ | Original input and intermediate value | Different spaces need different evaluation points |
| $J_f,J_g$ | Jacobians of sizes $m\times n$, $k\times m$ | Multiplication removes the intermediate dimension |
| $h,\nabla L,T$ | Perturbation, scalar-loss gradient, transpose | Forward perturbations and reverse gradients propagate differently |

$$
J_{g\circ f}(x)=J_g(f(x))J_f(x).
$$

## A branching example

Let $f(x,y)=(xy,x+y)^T=(u,v)^T$ and $g(u,v)=u^2+3v$. At $(1,2)$, intermediate values are $(2,3)$ and the final result is thirteen.

The inner Jacobian is $\begin{pmatrix}2&1\\1&1\end{pmatrix}$. The outer Jacobian, evaluated at the intermediate value, is $(4,3)$. Their product is $(11,7)$.

The first component eleven adds two routes: eight through the product branch and three through the sum branch. Shared variables require contributions from every path.

For perturbation $(0.01,-0.02)^T$, the linear prediction changes the result by $-0.03$, giving $12.97$. Direct evaluation gives intermediate values $1.9998,2.99$ and final value $12.96920004$. The higher-order discrepancy is consistent with a first-order approximation.

As an independent check, expand the composite as $x^2y^2+3x+3y$. Its partials are $2xy^2+3$ and $2x^2y+3$, again eleven and seven.

Using $(2x,3)$ for the outer derivative would evaluate it in the wrong space. Reversing matrix order is generally dimensionally invalid, and remains wrong even when square shapes happen to match.

## Exercises

1. With $u=x+2y$ and $L=u^2$, find the input gradient at $(1,1)$.
2. With $y=Ax$ and $L=\frac12y^Ty$, derive the input gradient and check dimensions.

<!-- solutions -->

### Problem 1

The intermediate value is three, outer derivative six and inner derivative $(1,2)$. The gradient is $(6,12)^T$.

### Problem 2

For $A$ of size $m\times n$, the output gradient is $y\in\mathbb R^m$. Pull it back with $A^T$, giving $A^Ty=A^TAx\in\mathbb R^n$.

Reference: [MIT Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/).

<!-- formal -->

## Composition and remainders

Differentiability of $f$ at $x$ and $g$ at $f(x)$ gives $D(g\circ f)(x)=Dg(f(x))\circ Df(x)$. The inner increment is $O(\|h\|)$, ensuring the outer remainder remains $o(\|h\|)$ after substitution.

For scalar losses, substitute $dy=J_fdx$ into $dL=\nabla_yL^Tdy$ to obtain $\nabla_xL=J_f^T\nabla_yL$. The transpose represents the adjoint. Branching computation graphs require summing contributions to shared variables.

A composite Hessian generally includes both a Jacobian sandwich and weighted second derivatives of inner components. The latter vanish for affine inner maps, not in general.

Classical rules require differentiability at the relevant points. Generalized derivatives have separate hypotheses. For stochastic or discrete programs, distinguish differentiation of an executed path, an expected objective and a surrogate model.
