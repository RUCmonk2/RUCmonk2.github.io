## Send sensitivity backward through a computation

Backpropagation efficiently applies the chain rule. First compute predictions and a scalar loss. Then propagate the loss sensitivity backward through intermediate operations. It computes gradients; an optimizer uses those gradients to update parameters.

This is not function inversion. A noninvertible operation can still have a useful derivative.

## Notation

| Symbol | Meaning | Convention |
| --- | --- | --- |
| $x$ | Fixed input | One number in this example |
| $w,b$ | Weight and bias | Trainable parameters |
| $z=wx+b$ | Preactivation | Input to the activation |
| $a$ | Activation output | A recalls activation |
| $y,L$ | Target and loss | $L$ is scalar |
| $\bar z$ | Loss derivative with respect to $z$ | An adjoint notation |
| $\eta$ | Step size | Used after differentiation |

## One complete neuron

Set $a=\max(0,z)$ and $L=(a-y)^2/2$. Use $x=2,w=1,b=-1,y=3$.

Forward computation gives $z=1$, $a=1$, and loss two. Backward, $\partial L/\partial a=-2$. Since $z>0$, the ReLU derivative is one, so $\partial L/\partial z=-2$.

The weight derivative is $-2(2)=-4$ and bias derivative is $-2$. A simultaneous update with $\eta=0.1$ gives $w=1.4,b=-0.8$. The new prediction is two and loss is $0.5$.

Both gradients belong to the old parameter point. Updating one parameter halfway through and mixing it into another gradient changes the intended step.

## Add contributions from branches

For $L(u)=u^2+u$ at three, the square branch contributes six and the direct branch contributes one. The total derivative is seven. Shared parameters and residual connections require accumulation rather than overwriting.

Backward rules often need saved forward values. Checkpointing saves fewer values and recomputes them later, trading computation for memory.

ReLU is not classically differentiable at zero; software chooses a convention there. Products of many local derivatives can shrink or grow dramatically, causing vanishing or exploding gradients without an arithmetic bug.

## Exercises

1. Change the target in the neuron example to zero and compute parameter gradients.
2. Differentiate $u^2+u^2$ at $u=2$ by tracking both branches.

<!-- solutions -->

### Exercise 1

The prediction remains one. The weight gradient is two and the bias gradient is one.

### Exercise 2

Each branch contributes four, giving eight in total.

Reference: [Mathematics for Machine Learning](https://mml-book.github.io/).

<!-- formal -->

## Reverse-mode differentiation

Reverse mode traverses a directed acyclic computation graph in reverse topological order, applying local adjoints and summing contributions at shared inputs. The seed for a scalar loss is typically one.

For differentiable primitives with correct rules, it evaluates the chain derivative of the executed program up to floating-point error, without finite-difference truncation. It does not establish model correctness or classical differentiability at kinks.

A scalar backward pass typically costs a constant multiple of the forward computation for standard primitives. Saved activations and graph structure determine memory; checkpointing trades recomputation for storage.

Higher-order differentiation requires compatible local rules. Implicit differentiation of solves or fixed points can differ from differentiating a finite unrolled algorithm. Stopped gradients, mutation, and control flow must match intended mathematical dependencies. Directional finite-difference checks are useful evidence at tested points, not a global proof.
