"use client";

import "./galois-workshop.css";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState } from "react";

import { compose, extendPermutation, identity } from "@/lib/math-lab/galois";

import { RadicalBridge,RootFoundations } from "./galois-foundations";
import { QuinticExperiment } from "./galois-obstruction";
import { MathFormula, StageHeading } from "./galois-shared";
import { SolvabilityExperiment } from "./galois-solvability";

const STAGES = [
  ["三张卡片", "什么叫群"],
  ["一个根号", "怎样区分根"],
  ["读懂四次", "一步一步拆"],
  ["五次障碍", "为什么拆不动"],
  ["更高次数", "补全推广证明"],
  ["检验理解", "先懂意思再记号"],
];

function HigherDegreeExperiment() {
  const [degree, setDegree] = useState(6);
  const [p, setP] = useState(identity(5));
  const id = useId();
  const extended = extendPermutation(p, degree);
  const product =
    degree === 5
      ? ""
      : degree <= 8
        ? Array.from({ length: degree - 5 }, (_, i) => `(x-${i + 2})`).join("")
        : `\\prod_{k=2}^{${degree - 4}}(x-k)`;
  return (
    <>
      <StageHeading index={4} title="五次不行，为什么六次、七次也不行？">
        不能只说“次数更高，所以更难”。要证明的是：每一个 n ≥ 5
        的一般方程，都保留了一块已经不可解的结构。
      </StageHeading>
      <div className="galois-workbench">
        <div className="galois-controls">
          <label className="galois-degree-slider" htmlFor={id}>
            <span>
              选择次数 n <output>{degree}</output>
            </span>
            <input
              id={id}
              type="range"
              min="5"
              max="12"
              step="1"
              value={degree}
              onChange={(e) => setDegree(Number(e.target.value))}
            />
          </label>
          <span>界面展示到 12 次，论证适用于任意 n ≥ 5。</span>
        </div>
        <div className="galois-root-grid" aria-live="polite">
          {extended.map((target, i) => (
            <div
              className={
                i < 5 ? "galois-root-token" : "galois-root-token is-fixed"
              }
              key={i}
            >
              <small>标签 {i + 1}</small>
              <strong>
                {i < 5 ? "↦ " : "= "}
                {target + 1}
              </strong>
              <span>{i < 5 ? "允许置换" : "固定不动"}</span>
            </div>
          ))}
        </div>
        <div className="galois-action-row">
          <button
            className="galois-primary"
            onClick={() => setP(compose([1, 0, 2, 3, 4], p))}
          >
            交换 1、2
          </button>
          <button
            className="galois-quiet"
            onClick={() => setP(compose([1, 2, 3, 4, 0], p))}
          >
            轮转前五个标签
          </button>
          <button className="galois-quiet" onClick={() => setP(identity(5))}>
            <RotateCcw size={14} />
            重置
          </button>
        </div>
        <div className="galois-observation">
          <strong>
            多出来的 {degree - 5} 个标签固定，前五个依然能作全部 120 种置换。
          </strong>
          <p>
            这些操作可以接着做，也可以撤销，而且始终只动前五张卡。因此它们自身就是一个群，在
            S{String(degree).replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)])}{" "}
            中形成一套完整的 S₅ 操作。这就是“含有 S₅ 子群”的意思。
          </p>
        </div>
      </div>
      <div className="galois-two-up galois-higher-proofs">
        <article>
          <span className="notes-overline">主证明 / 覆盖一般 n 次</span>
          <h3>如果整套操作拆得完，其中的一小套也一定能。</h3>
          <p>
            一小套操作内部的每个顺序差异，也在整套操作的差异之中。每轮都这样包含着；如果大集合最后只剩“不动”，小集合也必然只剩“不动”。这就是“可解群的子群也可解”的理由。
          </p>
          <MathFormula value={"S_5\\le S_n\\quad(n\\ge5)"} />
          <ol>
            <li>让新添的标签不动，前五张卡的整套操作 S₅ 就藏在 Sₙ 里面。</li>
            <li>假设 Sₙ 拆得完，根据上面的包含关系，S₅ 也必须拆得完。</li>
            <li>上一站已证明 S₅ 拆不完。假设矛盾，所以 Sₙ 也拆不完。</li>
          </ol>
          <p>
            一般 n 次多项式的伽罗瓦群是 Sₙ。于是对每一个 n ≥ 5，一般 n
            次方程都没有根式通解。
          </p>
          <details>
            <summary>“子群也可解”怎么证明？</summary>
            <p>
              若 H ≤ G，H 内元素的交换子也是 G 内的交换子，故 H′ ≤
              G′。逐次重复，H⁽ᵏ⁾ ≤ G⁽ᵏ⁾。若 G 的导出列到达 {"{e}"}，H 也必到达{" "}
              {"{e}"}。
            </p>
          </details>
        </article>
        <article>
          <span className="notes-overline">具体见证 / 每个次数都有反例</span>
          <h3>给一个不可解五次，添上已知根</h3>
          <MathFormula value={`F_{${degree}}(x)=(x^5-x-1)${product}`} />
          <p>
            {degree === 5
              ? "五次本身就是起点，空乘积按 1 处理。"
              : `新增的根是 ${Array.from({ length: degree - 5 }, (_, i) => i + 2).join("、")}，全是有理数。`}
          </p>
          <p>
            新增的数本来就已知，所以把它们加入并不能帮我们解开原来的五次。F
            {String(degree).replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)])}{" "}
            与原五次需要加入的未知数相同（术语叫“分裂域相同”），对称群仍是
            S₅。若它的全部根能用根式写出，原五次的根就也能，产生矛盾。
          </p>
          <p className="galois-fineprint">
            当 n &gt; 5
            时，这个反例族可约。它证明每个次数都有不可根式求解的方程；关于一般 n
            次（以及一般不可约情形）的结论，由左侧的 Sₙ 论证承担。
          </p>
        </article>
      </div>
      <details className="galois-details">
        <summary>“一般 n 次的群是 Sₙ”究竟是什么意思？</summary>
        <p>
          把 n 个根 t₁,…,tₙ 当作代数独立的变量，以它们的基本对称多项式 e₁,…,eₙ
          作为系数。每一种根的置换都固定这些系数，且对称有理函数恰好属于
          ℚ(e₁,…,eₙ)。因此扩张 ℚ(t₁,…,tₙ) / ℚ(e₁,…,eₙ) 的伽罗瓦群是 Sₙ。
        </p>
        <p>
          这描述的是系数独立变化的一般多项式，不是声称每一个有理系数 n
          次多项式都有群
          Sₙ。特殊系数会带来额外关系，使群缩小；有些高次方程因此可解。
        </p>
      </details>
      <details className="galois-details">
        <summary>核查起点：为什么 x⁵ − x − 1 的群确实是 S₅？</summary>
        <p>模 3 时它不可约；模 2 时它分解成两个不同的不可约因子：</p>
        <MathFormula value={"x^5-x-1\\equiv(x^2+x+1)(x^3+x^2+1)\\pmod 2"} />
        <p>
          德德金定理把平方自由的模素数分解次数，转成伽罗瓦群中的循环型。模 3
          给出一个五轮换；模 2 给出 (a b)(c d e)，立方后得到换位 (a b)。
        </p>
        <p>
          一个五轮换与任意换位生成
          S₅：用五轮换反复共轭该换位，得到一个连通五顶点图的边换位；连通图的边换位生成所有置换。因此这里的群恰是
          S₅。模 3 的不可约性也保证原多项式在 ℚ 上不可约。
        </p>
        <details>
          <summary>亲自检查模 2、模 3 的不可约性</summary>
          <p>
            模 2 的两个因子都在 0、1 处非零；二次或三次多项式没有根就不可约。
          </p>
          <p>
            模 3 时，f(0) = f(1) = f(2) =
            2，没有一次因子。三个首一不可约二次式只有 x² + 1、x² + x + 2、x² +
            2x + 2，f 除以它们的余数依次为 2、x + 2、x +
            2，也都非零。可约五次必含次数不超过 2 的不可约因子，因此 f 模 3
            不可约。
          </p>
        </details>
        <p>相关有限域分解与定理见页末 Milne 教材 Example 4.30。</p>
      </details>
    </>
  );
}

const QUESTIONS = [
  {
    title: "四次那张图里的 24，数的是什么？",
    options: ["方程有 24 个根", "四个标签的 24 种重排操作", "求根要开 24 次方"],
    correct: 1,
    explanation:
      "四个标签有 4 × 3 × 2 × 1 = 24 种重排，合起来叫 S₄。群的元素是操作；原方程只有四个复根（计重数）。",
  },
  {
    title: "24 → 12 → 4 → 1，最后的 1 表示什么？",
    options: [
      "只留下了一个根",
      "其他三个根被近似掉了",
      "只剩下保持原位这一种操作",
    ],
    correct: 2,
    explanation:
      "每一步在处理操作之间的顺序差异，原方程的根没有减少。最后只剩不动，说明群可以拆成可交换的层，再由伽罗瓦定理连接到根式解。",
  },
  {
    title: "x⁵ − 2 = 0 推翻了五次不可解的结论吗？",
    options: [
      "推翻了，因为它有五次根式",
      "没有，定理排除的是一般根式通解",
      "它其实没有复数根",
    ],
    correct: 1,
    explanation:
      "它的根可写为 ⁵√2 · ζ₅ᵏ（k = 0,…,4），单位根 ζ₅ 也可用根式表示。某个特殊五次可解，与一般五次没有根式通解完全相容。",
  },
  {
    title: "证明一般六次无根式通解，哪一步是必需的？",
    options: [
      "六比五大，所以一定更难",
      "只把某个五次乘上 x − 2 就证明了一般情形",
      "说明 S₆ 含不可解子群 S₅，而可解性传给子群",
    ],
    correct: 2,
    explanation:
      "子群论证结合一般六次的群 S₆，才覆盖一般情形。乘上线性因子会给出一个六次反例，但这个可约子族不能独自承担关于一般系数的证明。",
  },
  {
    title: "三张卡有些操作不能交换顺序，为什么三次仍能用根式解？",
    options: [
      "可以逐层处理顺序差异，6 → 3 → 1 最后能拆完",
      "只要有循环操作，就一定可以解方程",
      "因为三次只需要求一个实根",
    ],
    correct: 0,
    explanation:
      "可解要求的是逐层商群阿贝尔，不要求整个群一开始就阿贝尔。S₃ 的导出列能到达 {e}；A₅ 则永远停在自身。",
  },
];

function CheckUnderstanding() {
  const [answers, setAnswers] = useState(() => QUESTIONS.map(() => -1));
  return (
    <>
      <StageHeading index={5} title="次数划定一般边界，具体方程还要看它的群。">
        先用两道题确认“根”和“操作”没有混淆，再检查五次与高次的推理。也记住：“不能用根式解”并不妨碍数值求根。
      </StageHeading>
      <div className="galois-example-grid">
        <article>
          <span>特殊五次 · 可解</span>
          <h3>x⁵ − 2 = 0</h3>
          <MathFormula
            value={"x_k=\\sqrt[5]{2}\\,\\zeta_5^k,\\quad k=0,\\ldots,4"}
          />
          <p>
            例如 ζ₅ = (√5 − 1)/4 + i√(10 +
            2√5)/4。所有根都可用根式写出，它的伽罗瓦群是可解群。
          </p>
        </article>
        <article>
          <span>具体五次 · 不可解</span>
          <h3>x⁵ − x − 1 = 0</h3>
          <MathFormula value={"\\operatorname{Gal}(f/\\mathbb Q)=S_5"} />
          <p>
            上一站给出了 S₅
            的判定证书。它不可根式求解，但依旧有五个复根（计重数），也可做数值逼近。
          </p>
        </article>
      </div>
      <div className="galois-quiz">
        {QUESTIONS.map((q, i) => (
          <fieldset key={q.title}>
            <legend>
              <span>0{i + 1}</span>
              {q.title}
            </legend>
            <div className="galois-quiz-options">
              {q.options.map((option, j) => (
                <button
                  key={option}
                  aria-pressed={answers[i] === j}
                  onClick={() =>
                    setAnswers(answers.map((a, k) => (k === i ? j : a)))
                  }
                >
                  <span>{"ABC"[j]}</span>
                  {option}
                </button>
              ))}
            </div>
            {answers[i] !== -1 && (
              <p className="galois-quiz-feedback" role="status">
                <strong>
                  {answers[i] === q.correct ? "判断正确。" : "再想一步。"}
                </strong>
                {q.explanation}
              </p>
            )}
          </fieldset>
        ))}
      </div>
      <div className="galois-takeaway">
        <strong>现在，把整条论证连起来。</strong>
        <p>
          根式可解 ⇔ 伽罗瓦群可解。一般 n 次的群是 Sₙ；n ≤ 4 时它可以拆到{" "}
          {"{e}"}，n = 5 时卡在非阿贝尔单群 A₅，n &gt; 5 时又含有不可解的 S₅
          子群。因此边界始终是四次与五次之间。
        </p>
      </div>
    </>
  );
}

export function GaloisWorkshop({ locale }: { locale: "zh" | "en" }) {
  const [stage, setStage] = useState(0);
  const nav = useRef<HTMLElement>(null);
  const prefix = locale === "en" ? "/en" : "";
  function goTo(index: number, scroll = false) {
    setStage(index);
    if (scroll) {
      nav.current?.scrollIntoView({ block: "start" });
      requestAnimationFrame(() => {
        document
          .getElementById(`galois-stage-${index}`)
          ?.focus({ preventScroll: true });
      });
    }
  }
  return (
    <div className="galois-workshop">
      <aside className="galois-scope">
        <span>先约定“解”的含义</span>
        <p>
          这里研究<strong>根式通解</strong>
          ：从系数出发，用有限次四则运算与开方表达所有根。一次到四次总能做到；五次及以上的一般方程做不到。
          <strong>
            这不表示每个高次方程都不可解，也不排除数值解或特殊函数表达。
          </strong>
          “闭式”范围更宽，不能一概说不存在。
        </p>
      </aside>
      <nav className="galois-stage-nav" aria-label="群论实验步骤" ref={nav}>
        {STAGES.map(([title, sub], i) => (
          <button
            key={title}
            aria-pressed={stage === i}
            aria-controls={`galois-panel-${i}`}
            onClick={() => goTo(i)}
          >
            <span>0{i + 1}</span>
            <strong>
              {title}
              <small>{sub}</small>
            </strong>
          </button>
        ))}
      </nav>
      {[
        RootFoundations,
        RadicalBridge,
        SolvabilityExperiment,
        QuinticExperiment,
        HigherDegreeExperiment,
        CheckUnderstanding,
      ].map((Panel, i) => (
        <section
          id={`galois-panel-${i}`}
          key={i}
          hidden={stage !== i}
          aria-labelledby={`galois-stage-${i}`}
        >
          <Panel />
        </section>
      ))}
      <div className="galois-pagination">
        <button
          className="galois-quiet"
          disabled={stage === 0}
          onClick={() => goTo(stage - 1, true)}
        >
          <ArrowLeft size={15} />
          上一站
        </button>
        <span>
          {stage + 1} / {STAGES.length}
        </span>
        <button
          className="galois-primary"
          disabled={stage === STAGES.length - 1}
          onClick={() => goTo(stage + 1, true)}
        >
          {stage === STAGES.length - 1
            ? "已到最后一站"
            : `下一站 · ${STAGES[stage + 1][0]}`}
          <ArrowRight size={15} />
        </button>
      </div>
      <footer className="galois-resources">
        <div>
          <h2>沿着证据继续读</h2>
          <p>
            本实验区分了三个层次：交互观察、有限群的证明、作为桥梁引用的伽罗瓦定理。
          </p>
          <a href="https://www.jmilne.org/math/Books/FT0.pdf">
            J. S. Milne · Fields and Galois Theory
          </a>
          <small>
            参阅 Theorem 5.34（根式与可解群）、Theorem 5.40（一般多项式）及
            Example 4.30（五次实例）。
          </small>
        </div>
        <div>
          <Link href={prefix + "/learning/math-lab"}>
            返回数学实验室 <ArrowRight size={14} />
          </Link>
          <a href={prefix + "/learning/math-map/#group"}>
            回到「群与对称性」节点 <ArrowRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}
