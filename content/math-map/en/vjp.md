## Propagate only the sensitivity you need

A full Jacobian may be enormous. If the final objective is scalar, we can start with the sensitivity of that objective to each output and propagate those weights back to the inputs. This is a vector–Jacobian product, or VJP.

The traditional name suggests a row vector times a Jacobian. We use column gradients and therefore write the transposed equivalent.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $f:\mathbb R^n\to\mathbb R^m$ | Differentiable map | $n$ inputs, $m$ outputs |
| $x,y$ | Input and output | Column vectors |
| $J$ | Jacobian | Shape $m\times n$ |
| $v\in\mathbb R^m$ | Upstream output weights | Often an output gradient |
| $h\in\mathbb R^n$ | Input direction | Used in a JVP |
| $L$ | Scalar objective | Depends on the outputs |

$$
\operatorname{VJP}_f(x;v)=J(x)^Tv,\qquad
\operatorname{JVP}_f(x;h)=J(x)h.
$$
A JVP pushes directions forward; a VJP pulls sensitivities backward. They are not inverses.

## A complete small example

Let $f(x_1,x_2)=(x_1x_2,x_1+x_2)$ at $(2,3)^T$. The output is $(6,5)^T$ and
$$
J=\begin{pmatrix}3&2\\1&1\end{pmatrix}.
$$
For $L(y)=2y_1-y_2$, the upstream gradient is $v=(2,-1)^T$. Weight the first Jacobian row by two and the second by negative one: $(6,4)+(-1,-1)=(5,3)$.

Direct differentiation of $2x_1x_2-x_1-x_2$ gives the same result. For perturbation $(0.01,-0.02)^T$, predicted loss change is $-0.01$; the exact change is $-0.0104$.

## Why the transpose appears

For any input direction,
$$
v^T(Jh)=(J^Tv)^Th.
$$
Computing a loss change after pushing a direction forward is equivalent to pairing that direction with the pulled-back sensitivity. This is the defining adjoint identity.

Reverse mode is often appropriate for one scalar loss and many parameters. Forward mode can be preferable for a few input directions. Reverse computation must save or recompute intermediate values. When multiple paths share an input, their gradient contributions must be added.

## Exercises

1. Compute the VJP for $v=(1,1)^T$.
2. Compute the JVP for $h=(1,-1)^T$ and check the adjoint identity with $v=(2,-1)^T$.

<!-- solutions -->

### Exercise 1

The result is $(4,3)^T$.

### Exercise 2

$Jh=(1,0)^T$, whose inner product with $v$ is two. The inner product of $(5,3)^T$ with $h$ is also two.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Adjoint chain rules

The VJP is $Df(x)^*v$, represented by $J_f(x)^Tv$ under standard Euclidean inner products. Other metrics modify the adjoint representation.

For composition, $D(g\circ f)^*=Df^*\circ Dg^*$, reversing propagation order. Shared inputs receive summed contributions by linearity. A single VJP differentiates one specified output linear combination; it does not recover an arbitrary full Jacobian in one operation. A scalar output with seed one is the important special case.

Checkpointing trades recomputation for memory. Combining forward and reverse differentiation can obtain Hessian–vector products without forming a Hessian. Nonsmooth primitives may return convention-dependent values at kinks; automatic differentiation does not itself establish classical differentiability. Control flow, stopped gradients, and implicit solves require care about which mathematical function the executed program represents.
