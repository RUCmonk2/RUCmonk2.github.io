## Start with the cost of a prediction

A fair coin has true distribution $p=(0.5,0.5)$, but suppose your prediction is $q=(0.75,0.25)$. Confidence alone is not accuracy: when tails occurs, you assigned it only probability $0.25$. Cross-entropy measures average logarithmic cost under the true distribution. Entropy measures uncertainty in that distribution itself. KL divergence measures the extra cost of using the other distribution.

We begin with a finite set of outcomes. Probabilities are nonnegative and sum to $1$. The prerequisites are weighted averages and logarithms. Recall $\log(ab)=\log a+\log b$: independent probabilities multiply, so their logarithmic costs add.

## Decode every symbol

| Symbol | Meaning and type | Notation convention |
| --- | --- | --- |
| $i=1,\ldots,k$ | Outcome index; $k$ is the number of outcomes | An index labels an entry; it is not multiplication |
| $p_i$ | True probability of outcome $i$ | $p$ is commonly associated with probability; its true-distribution role is defined here |
| $q_i$ | Predicted/reference probability of the same outcome | A second letter distinguishes the second distribution |
| $\log,\ln$ | Logarithm; natural logarithms are used here | Natural units are nats; base $2$ gives bits |
| $\sum_i$ | Add one term for every outcome | Capital Sigma denotes summation |
| $H(p)$ | Entropy: a nonnegative scalar | $H$ is conventional entropy notation, not a Hessian here |
| $H(p,q)$ | Cross-entropy with averaging distribution first | The argument order records different roles |
| $D_{\mathrm{KL}}(p\Vert q)$ | Directed relative entropy | $D$ recalls divergence; KL names Kullback and Leibler; the separator is not a norm |

These are definitions and common mnemonic conventions, not claims about who first chose each letter. Renaming a variable consistently changes no mathematics.

## Read the formulas as instructions

The cost of one observed outcome is $-\log q_i$. Probability $1$ gives zero cost. A tiny assigned probability gives a large cost. Average these costs with the frequencies of the real data, namely $p_i$:

$$
H(p)=-\sum_{i=1}^k p_i\log p_i,\qquad
H(p,q)=-\sum_{i=1}^k p_i\log q_i.
$$

Entropy uses the true distribution both as weights and inside the logarithm. Cross-entropy changes only the distribution inside the logarithm. The extra cost is

$$
D_{\mathrm{KL}}(p\|q)=\sum_{i:p_i>0}p_i\log\frac{p_i}{q_i},
\qquad H(p,q)=H(p)+D_{\mathrm{KL}}(p\|q).
$$

Expand the logarithm of a ratio to derive the last identity. Individual KL summands can be negative; their complete weighted sum is nonnegative.

## A fully numerical example

1. For the fair coin, $\log0.5\approx-0.693147$, so $H(p)\approx0.693147$ nats.
2. For the biased prediction, $\log0.75\approx-0.287682$ and $\log0.25\approx-1.386294$. Thus $H(p,q)\approx0.5(0.287682)+0.5(1.386294)=0.836988$ nats.
3. Subtraction gives $D_{\mathrm{KL}}(p\|q)\approx0.143841$ nats. This is excess logarithmic cost, not classification error rate.
4. Reverse the roles: $D_{\mathrm{KL}}(q\|p)=0.75\log1.5+0.25\log0.5\approx0.130812$. Different answers demonstrate asymmetry.
5. Divide a natural-log result by $\log2$ to express it in bits. The fair coin's entropy becomes exactly $1$ bit.

## Zero probabilities: the missing detail

The expression $\log0$ has no finite real value. The convention $0\log0=0$ extends the entire product continuously, because $\lim_{t\downarrow0}t\log t=0$. It does not mean that we first evaluate $\log0$ and then multiply.

A zero true weight contributes zero, including when both probabilities vanish. If $p_i>0$ but $q_i=0$, the model declares a genuinely possible outcome impossible: cross-entropy and KL are $+\infty$. For example, use $p=(1,0)$ and $q=(0,1)$.

Adding a small constant in code changes the quantity being computed. Stable log-softmax calculations are usually preferable when probabilities originate from logits. An implementation convenience is not the mathematical definition.

## Try two problems

1. Let $p=(1,0)$ and $q=(0.8,0.2)$. Calculate entropy, cross-entropy and KL. What changes when $q=p$?
2. Calculate the entropy of three equally likely outcomes in nats and bits. Explain why “three outcomes” does not imply entropy equals three.

<!-- solutions -->

### Problem 1

$H(p)=0$. Only the first outcome has nonzero weight:

$$
H(p,q)=-\log0.8\approx0.223144,\qquad
D_{\mathrm{KL}}(p\|q)=0.223144.
$$

With $q=p$, both become zero. The second outcome contributes zero by the zero-weight convention.

### Problem 2

$$
H=-3\left(\frac13\log\frac13\right)=\log3
\approx1.098612\ {\rm nats}
=\log_2 3\ {\rm bits}\approx1.584963\ {\rm bits}.
$$

For a uniform distribution it is the logarithm of the number of outcomes that gives entropy.

## Continue studying

With a one-hot target, cross-entropy reduces to the correct class's negative log probability. The Softmax lesson differentiates this with respect to logits. For continuous distributions, use densities and integrals; discrete entropy's nonnegativity does not extend to differential entropy.

Reference: [MIT 6.441, Lecture 1](https://ocw.mit.edu/courses/6-441-information-theory-spring-2010/aa7737b3645178c0b746a57f1bdff2cd_MIT6_441S10_lec01.pdf).

<!-- formal -->

## Definition and domain

For distributions $p,q$ on the same finite alphabet, with $\operatorname{supp}p\subseteq\operatorname{supp}q$, define

$$
H(p)=-\sum_i p_i\log p_i,\quad
H(p,q)=-\sum_i p_i\log q_i,\quad
D_{\mathrm{KL}}(p\|q)=\sum_{i:p_i>0}p_i\log\frac{p_i}{q_i}.
$$

Logarithms are natural. Zero-weight terms contribute zero; failure of support inclusion gives infinite cross-entropy and divergence. Since finite-alphabet entropy is finite, the identity $H(p,q)=H(p)+D_{\mathrm{KL}}(p\|q)$ also holds in the extended-real sense.

## Nonnegativity and equality

Applying $-\log t\ge1-t$ with $t=q_i/p_i$ on the support of $p$ gives

$$
D_{\mathrm{KL}}(p\|q)\ge
\sum_{i:p_i>0}(p_i-q_i)
=1-\sum_{i:p_i>0}q_i\ge0.
$$

Equality throughout requires $p_i=q_i$ on the support and no remaining mass under $q$, hence $p=q$.

## Estimation and local structure

For empirical distribution $\hat p$, the average independent-sample negative log-likelihood is $H(\hat p,q_\theta)$. Its entropy term is parameter independent, so minimizing it minimizes forward KL. Reverse KL generally yields a different objective.

For strictly positive $p$, let $q=p+\delta$ with $\sum_i\delta_i=0$. Taylor expansion gives

$$
D_{\mathrm{KL}}(p\|p+\delta)
=\frac12\sum_i\frac{\delta_i^2}{p_i}+O(\|\delta\|^3).
$$

Normalization cancels the linear term. This expansion is local and requires staying away from the boundary. It does not make KL a metric: symmetry and the triangle inequality generally fail.

For infinite alphabets, convergence and undefined differences must be handled. Continuous relative entropy requires absolute continuity. Differential entropy can be negative and changes under coordinate transformations. Use log-softmax/log-sum-exp in numerical implementations.

Reference: [MIT information theory notes](https://ocw.mit.edu/courses/6-441-information-theory-spring-2010/aa7737b3645178c0b746a57f1bdff2cd_MIT6_441S10_lec01.pdf).
