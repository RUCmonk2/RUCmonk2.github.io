"use client";

import "./galois-solvability.css";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";

import {
  compose,
  cycleNotation,
  derivedSeries,
  derivedSubgroup,
  identity,
  parity,
  type Permutation,
  symmetricGroup,
} from "@/lib/math-lab/galois";
import {
  FOUR_PAIRINGS,
  fourPairingAction,
  orderDifferenceTrace,
} from "@/lib/math-lab/galois-learning";

import { MathFormula, StageHeading } from "./galois-shared";

const OPERATIONS = [
  { p: [0, 1, 2], name: "保持原位", swaps: "0 次对调" },
  { p: [1, 2, 0], name: "向右循环一格", swaps: "2 次对调" },
  { p: [2, 0, 1], name: "向左循环一格", swaps: "2 次对调" },
  { p: [1, 0, 2], name: "交换 1、2", swaps: "1 次对调" },
  { p: [0, 2, 1], name: "交换 2、3", swaps: "1 次对调" },
  { p: [2, 1, 0], name: "交换 1、3", swaps: "1 次对调" },
];
const BUCKET = (p: Permutation) => (parity(p) === 1 ? "偶数组" : "奇数组");

function Buckets() {
  const [first, setFirst] = useState(3);
  const [second, setSecond] = useState(4);
  const id = useId();
  const result = compose(OPERATIONS[second].p, OPERATIONS[first].p);
  const reverse = compose(OPERATIONS[first].p, OPERATIONS[second].p);
  return (
    <div className="galois-workbench gs-lesson">
      <span className="notes-overline">小步骤 1 / 先学会“分组看”</span>
      <h3>不必分清每个操作，先只记录它在哪一组。</h3>
      <p>
        回到三张卡片。每个重排都能用若干次“两两交换”完成。把六种操作按交换次数的奇偶分成两组：
      </p>
      <div className="gs-buckets">
        {[0, 1].map((bucket) => (
          <div key={bucket} className="gs-bucket">
            <h4>{bucket === 0 ? "偶数组 · 3 种操作" : "奇数组 · 3 种操作"}</h4>
            {OPERATIONS.slice(bucket * 3, bucket * 3 + 3).map((op) => (
              <div className="gs-operation" key={op.name}>
                <span>
                  {op.name}
                  <small>{op.swaps}</small>
                </span>
                <code>{cycleNotation(op.p)}</code>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="galois-fineprint">
        一种重排可能有很多种交换做法，但次数的奇偶始终相同。例如连续对调同一对两次，结果没变，次数增加
        2。这一性质叫置换的“奇偶性”。
      </p>
      <div className="galois-controls">
        <label htmlFor={id + "a"}>
          先做 A
          <select
            id={id + "a"}
            value={first}
            onChange={(e) => setFirst(Number(e.target.value))}
          >
            {OPERATIONS.map((op, i) => (
              <option value={i} key={op.name}>
                {op.name} · {BUCKET(op.p)}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={id + "b"}>
          再做 B
          <select
            id={id + "b"}
            value={second}
            onChange={(e) => setSecond(Number(e.target.value))}
          >
            {OPERATIONS.map((op, i) => (
              <option value={i} key={op.name}>
                {op.name} · {BUCKET(op.p)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="galois-observation" aria-live="polite">
        <strong>
          {BUCKET(OPERATIONS[first].p)} + {BUCKET(OPERATIONS[second].p)} →{" "}
          {BUCKET(result)}
        </strong>
        <p>
          先 A 后 B 得到 {cycleNotation(result)}；先 B 后 A 得到{" "}
          {cycleNotation(reverse)}。
          {cycleNotation(result) === cycleNotation(reverse)
            ? "这次具体操作也相同。"
            : "具体操作不同，但都属于同一组。"}
        </p>
      </div>
      <div className="gs-table-wrap">
        <table className="gs-table">
          <caption>只看组别的合成表（“+”表示接着做）</caption>
          <thead>
            <tr>
              <th>先做 ↓ / 再做 →</th>
              <th>偶数组</th>
              <th>奇数组</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>偶数组</th>
              <td>偶数组</td>
              <td>奇数组</td>
            </tr>
            <tr>
              <th>奇数组</th>
              <td>奇数组</td>
              <td>偶数组</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>看表格的两个交叉格：</strong>
        偶数接奇数、奇数接偶数，都得到奇数组。因此，尽管原来的六种操作有些不能交换顺序，分组后的两种操作可以交换顺序。
      </p>
      <div className="galois-takeaway">
        <strong>现在才给它一个名字：商群。</strong>
        <p>
          偶数组本身包含“不动”，任意组合或撤销也留在组内，所以它是一个
          <strong>子群</strong>
          。这里把它和另一整组分别当作一个新操作，得到的两元素群叫
          <strong>商群</strong>。6 ÷ 3 = 2 数的是有几组。
        </p>
        <p>
          这种分组必须保证：组内换一个代表，组与组的合成结果仍然确定。满足这个要求的子群叫
          <strong>正规子群</strong>。上面的表格就给出了这个例子。
        </p>
      </div>
    </div>
  );
}

function Difference() {
  const [second, setSecond] = useState(4);
  const [step, setStep] = useState(0);
  const [collected, setCollected] = useState(false);
  const a = OPERATIONS[3].p;
  const b = OPERATIONS[second].p;
  const frames = orderDifferenceTrace(a, b);
  const group = useMemo(() => derivedSubgroup(symmetricGroup(3)), []);
  const names = ["起点", "撤销 B", "接着撤销 A", "再做 B", "最后做 A"];
  const id = useId();
  return (
    <div className="galois-workbench gs-lesson">
      <span className="notes-overline">小步骤 2 / 找出两种顺序的差异</span>
      <h3>如果两个总操作相同，撤销一个、再做另一个，就会回到原点。</h3>
      <p>
        把“先 A 后 B”与“先 B 后 A”比较。先撤销第一条路线（先撤销 B，再撤销
        A），再执行第二条路线（先 B，再 A）。看看最后有没有留下变化。
      </p>
      <div className="galois-controls">
        <span>A：交换 1、2</span>
        <label htmlFor={id}>
          B
          <select
            id={id}
            value={second}
            onChange={(e) => {
              setSecond(Number(e.target.value));
              setStep(0);
            }}
          >
            {OPERATIONS.map((op, i) => (
              <option key={op.name} value={i}>
                {op.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="gs-trace" aria-live="polite">
        {frames.slice(0, step + 1).map((p, i) => (
          <div className="gs-trace-frame" key={i}>
            <strong>
              {i}. {names[i]}
            </strong>
            <div className="gs-tokens">
              {[0, 1, 2].map((position) => (
                <span key={position} data-card={p.indexOf(position) + 1}>
                  {p.indexOf(position) + 1}
                </span>
              ))}
            </div>
            <small>从左到右的卡片</small>
          </div>
        ))}
      </div>
      <div className="galois-action-row">
        <button
          className="galois-primary"
          disabled={step === 4}
          onClick={() => setStep(step + 1)}
        >
          {step < 4 ? names[step + 1] : "四步已完成"}
          <ArrowRight size={14} />
        </button>
        <button className="galois-quiet" onClick={() => setStep(0)}>
          <RotateCcw size={14} />
          从原位重做
        </button>
      </div>
      {step === 4 && (
        <div className="galois-observation" role="status">
          <strong>
            留下的差异：
            {cycleNotation(frames[4]) === "e"
              ? "什么也没动。"
              : cycleNotation(frames[4])}
          </strong>
          <p>
            {cycleNotation(frames[4]) === "e"
              ? "这两个操作能交换顺序，所以两条路线互相抵消。"
              : "没有回到 1、2、3，说明这两个操作不能交换顺序。这个留下的操作叫“交换子”。"}
          </p>
        </div>
      )}
      <p>
        一个例子还不够。让 A、B 分别取遍六种操作，把所有顺序差异收集起来，
        <strong>再补上它们的组合与逆操作</strong>，才得到我们要保留的下一层。
      </p>
      <p>
        为什么必须收这些差异？要让“先 A 后 B”和“先 B 后
        A”在组别上相同，两者之间的差异就必须落在包含“不动”的那一组。所有这样的差异都得收进去，所以这一步并不是随便挑一包操作；换一种分组，也绕不开它们。
      </p>
      <button
        className="galois-primary"
        onClick={() => setCollected(true)}
        disabled={collected}
      >
        计算全部 6 × 6 对操作的差异
      </button>
      {collected && (
        <div className="galois-observation" role="status">
          <strong>
            下一层只有 3 种操作：{group.map((p) => cycleNotation(p)).join("、")}
          </strong>
          <p>
            它们就是上一小步的偶数组：不动、向右循环一格、向左循环一格。如果暂时只记录偶、奇组别，组别的合成已经可以交换顺序。接下来只检查偶数组内部的三种操作，看它们能否继续处理。
          </p>
          <p>
            这三个循环操作本身也能交换顺序，因此再收集一次差异，只会剩下不动。三张卡的路线是：
            <strong>6 → 3 → 1</strong>。
          </p>
        </div>
      )}
      <details className="galois-details">
        <summary>把刚才的操作翻译成数学符号</summary>
        <MathFormula
          value={
            "[a,b]=aba^{-1}b^{-1},\\qquad G'=\\langle[a,b]\\mid a,b\\in G\\rangle"
          }
        />
        <p>
          公式中最右边的操作先做，所以依次是
          b⁻¹、a⁻¹、b、a。尖括号表示把所有组合、逆操作也补齐。得到的 G′
          叫交换子子群；它一定正规，而且商群 G/G′ 可以交换顺序。
        </p>
        <p>
          更关键的是：任何能让商群交换顺序的正规子群，都必须包含
          G′。所以这一步保留的是必须处理的差异；如果它一直等于整个群，换另一种拆法也绕不过去。
        </p>
      </details>
    </div>
  );
}

function PairingDemo() {
  const choices = [
    identity(4),
    [1, 0, 3, 2],
    [2, 3, 0, 1],
    [3, 2, 1, 0],
    [1, 2, 0, 3],
  ];
  const names = [
    "保持原位",
    "同时交换 1、2 和 3、4",
    "同时交换 1、3 和 2、4",
    "同时交换 1、4 和 2、3",
    "轮转 1→2→3→1",
  ];
  const [choice, setChoice] = useState(4);
  const action = fourPairingAction(choices[choice]);
  const label = (pairs: readonly (readonly number[])[]) =>
    pairs.map((pair) => pair.map((n) => n + 1).join("、")).join(" ｜ ");
  const id = useId();
  return (
    <div className="gs-pairings">
      <h4>中间那一步：为什么 12 种操作能分成 3 组？</h4>
      <p>
        把四个标签分成两对，只有下面三种方式。偶数次对调标签后，这三种配对也会跟着移动：
      </p>
      <label htmlFor={id}>
        试一个偶置换
        <select
          id={id}
          value={choice}
          onChange={(e) => setChoice(Number(e.target.value))}
        >
          {choices.map((p, i) => (
            <option value={i} key={i}>
              {names[i]} · {cycleNotation(p)}
            </option>
          ))}
        </select>
      </label>
      <div className="gs-pairing-grid" aria-live="polite">
        {FOUR_PAIRINGS.map((pairs, i) => (
          <div key={i}>
            <strong>配对 {"甲乙丙"[i]}</strong>
            <span>{label(pairs)}</span>
            <ArrowRight size={15} />
            <strong>配对 {"甲乙丙"[action[i]]}</strong>
            <span>{label(FOUR_PAIRINGS[action[i]])}</span>
          </div>
        ))}
      </div>
      <p>
        <strong>
          {choice === 4
            ? "这个操作让三种配对循环移动。"
            : "这个操作虽然可能移动标签，却把每一种配对留在原来的配对类型。"}
        </strong>
        不动和三种“双对调”都不改变配对类型，这四个操作合起来叫 V₄。
      </p>
      <p>
        A₄ 的 12
        种操作对配对类型只有三种效果：不动、循环一格、循环两格；每种效果都对应 4
        个操作。三种循环效果能交换顺序。这就是 12 ÷ 4 = 3 的那一层。
      </p>
    </div>
  );
}

function GroupChain() {
  const [degree, setDegree] = useState(4);
  const [step, setStep] = useState(0);
  const series = useMemo(() => derivedSeries(degree), [degree]);
  const current = series[Math.min(step, series.length - 1)];
  const finished = current.order === 1;
  const stuck = step > 0 && current.order === series[step - 1].order;
  const title = (name: string) =>
    name === "{e}"
      ? "只剩不动"
      : name === "V4"
        ? "不动或同时对调两对"
        : name.startsWith("A")
          ? "偶数次对调得到的重排"
          : `全部 ${degree} 张卡的重排`;
  const symbol = (name: string) =>
    name.replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]);
  const explanations: Record<number, string[]> = {
    1: ["一个标签只有“不动”。一次方程直接用四则运算求解。"],
    2: [
      "两个标签只有不动和互换，它们能交换顺序。",
      "两种操作的所有顺序差异都是不动，所以一步就拆完。",
    ],
    3: [
      "这就是前面用过的六种操作。先试着保留全部顺序差异。",
      "剩下不动和两个三轮换，正是偶数组。外面的偶、奇两组能交换顺序。",
      "三个循环操作之间能交换顺序，所以再收集差异只剩不动。",
    ],
    4: [
      "这里数的是四个标签的 24 种重排。点击按钮，看看哪些顺序差异必须保留。",
      "留下 12 种偶置换。跟三张卡的例子相同，24 种操作被分成偶、奇两组，组别的合成可以交换顺序。",
      "留下 4 种操作：不动和三种同时对调两对的操作。下方用三种配对解释外面的 3 组为什么可以交换顺序。",
      "最后 4 种操作两两交换顺序都一样，因此所有顺序差异只剩不动。四次终于拆完了。",
    ],
    5: [
      "五个标签的 120 种重排同样先按奇偶分组。",
      "留下 60 种偶置换。再按同样规则试一次。",
      "全部顺序差异又生成这 60 种操作。不是数字太大，而是已经无法变小。下一站证明为什么。",
    ],
  };
  return (
    <div className="galois-workbench gs-lesson">
      <span className="notes-overline">小步骤 3 / 现在来读懂四次那张图</span>
      <h3>每一步都问：所有顺序差异，还剩多少种操作？</h3>
      <p>
        一般 n 次方程的根具有全部重排的对称性，记为
        Sₙ。先在下方亲自走完四次，再切换其他次数比较。
      </p>
      <p>
        这里“一般”指系数保留为自由参数，没有额外指定根之间的特殊关系。具体方程可能只允许部分重排；我们先检查最大的
        Sₙ。第五站的补充说明会解释一般情形为什么是这个群。
      </p>
      <div className="galois-degree-buttons" aria-label="选择方程次数">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            aria-pressed={degree === n}
            onClick={() => {
              setDegree(n);
              setStep(0);
            }}
          >
            {n} 次
          </button>
        ))}
      </div>
      <ol className="gs-chain" aria-live="polite">
        {series.slice(0, step + 1).map((s, i) => (
          <li key={i}>
            {i > 0 && (
              <p className="gs-chain-connector">
                ↓{" "}
                {s.order === series[i - 1].order
                  ? "没有变小"
                  : `分成 ${series[i - 1].order / s.order} 组，每组 ${s.order} 种操作`}
              </p>
            )}
            <div className={i === step ? "is-current" : ""}>
              <strong>{title(s.name)}</strong>
              <span>
                <b>{s.order}</b> 种操作 <code>{symbol(s.name)}</code>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <div className="galois-action-row">
        <button
          className="galois-primary"
          disabled={finished || stuck}
          onClick={() => setStep(step + 1)}
        >
          只保留所有顺序差异
          <ArrowRight size={14} />
        </button>
        <button className="galois-quiet" onClick={() => setStep(0)}>
          <RotateCcw size={14} />
          从头观察
        </button>
        <span>
          {finished
            ? "已拆完 · 只剩不动"
            : stuck
              ? "卡住 · 下一站解释原因"
              : `已经做了 ${step} 次`}
        </span>
      </div>
      <div className="galois-observation" role="status">
        <strong>{explanations[degree][step]}</strong>
        <p>
          变化的是操作的集合，
          <strong>原方程仍有 {degree} 个复根（计重数）</strong>。
        </p>
      </div>
      <details className="galois-details">
        <summary>看看当前这 {current.order} 种操作究竟是什么</summary>
        <p className="gs-element-list">
          {current.elements.map((p) => cycleNotation(p)).join("，")}
        </p>
        <p>
          括号中的标签依次移动，最后一个回到第一个；多个括号表示分别完成。e
          表示不动。
        </p>
      </details>
      {degree === 4 && step >= 2 && <PairingDemo />}
      <div className="galois-takeaway">
        <strong>能一直拆到“不动”，这样的群就叫可解群。</strong>
        <p>
          刚才每次把所有顺序差异及其组合留下，按这个子群分组后，组别之间的合成就能交换顺序。接着检查留下的子群内部。一路做到只剩不动，说明全部层次都能这样处理。根据上一站的伽罗瓦定理，这正是能用根式解方程的条件。
        </p>
        <p>
          一次到四次的 Sₙ 都能拆完。具体方程的群可能更小，但它是 Sₙ
          的子群，而可解群的子群也可解（第五站会解释）。所以一次到四次的具体方程都能用根式解。
        </p>
        <p className="galois-fineprint">
          这里演示的是检验群的可解性。每个箭头并不等于实际求根时开一次方；例如最后的四元素层还能细分成两个二元素层。
        </p>
      </div>
      <details className="galois-details">
        <summary>已经看懂主线？再看三次、四次怎样实际得到根式公式</summary>
        <h4>三次：先解二次，再开立方</h4>
        <p>
          平移消去二次项，得到 y³ + py + q = 0。写 y = u + v，要求 uv = −p/3，则
          u³、v³ 满足一个二次方程：
        </p>
        <MathFormula
          value={"u^3,v^3=-\\frac q2\\pm\\sqrt{\\frac{q^2}{4}+\\frac{p^3}{27}}"}
        />
        <p>
          选择非零 u 后令 v = −p/(3u)，保证分支配对。若 ω 是原始三次单位根（ω ≠
          1），三根为 u + v、ωu + ω²v、ω²u + ωv。p = q = 0 时根全是 0；p = 0、q
          ≠ 0 时选非零的那个立方根。
        </p>
        <h4>四次：借一个三次，拆成两个二次</h4>
        <p>
          平移得到 y⁴ + py² + qy + r = 0。q = 0 时直接解关于 y²
          的二次；否则先解辅助三次方程：
        </p>
        <MathFormula value={"m^3+2pm^2+(p^2-4r)m-q^2=0"} />
        <p>它的根 m 非零。取 s = √m，原式变成两个平方的差：</p>
        <MathFormula
          value={
            "\\left(y^2+\\frac{p+m}{2}\\right)^2-\\left(sy-\\frac{q}{2s}\\right)^2=0"
          }
        />
        <p>
          令两个因式分别为零，就得到两个二次。最后撤销平移，所以全过程只需四则运算与开方。
        </p>
      </details>
    </div>
  );
}

export function SolvabilityExperiment() {
  const [lesson, setLesson] = useState(0);
  const nav = useRef<HTMLElement>(null);
  function goToLesson(index: number, scroll = false) {
    setLesson(index);
    if (scroll) {
      nav.current?.scrollIntoView({ block: "start" });
      requestAnimationFrame(() => {
        nav.current
          ?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')
          ?.focus({ preventScroll: true });
      });
    }
  }
  const labels = ["① 六种操作分两组", "② 算一次顺序差异", "③ 一步步读懂四次"];
  return (
    <>
      <StageHeading index={2} title="那张四次图，先拆成三个小问题。">
        上一站说，根式求解对应把对称性拆成能交换顺序的层。这一站先用六种操作把“分层”做出来，再看四次。每个小步骤都可以返回重试。
      </StageHeading>
      <nav className="gs-subnav" aria-label="读懂四次的小步骤" ref={nav}>
        {labels.map((label, i) => (
          <button
            key={label}
            aria-pressed={lesson === i}
            aria-controls={`gs-lesson-${i}`}
            onClick={() => goToLesson(i)}
          >
            {label}
          </button>
        ))}
      </nav>
      {[Buckets, Difference, GroupChain].map((Panel, i) => (
        <section key={i} id={`gs-lesson-${i}`} hidden={lesson !== i}>
          <Panel />
        </section>
      ))}
      <div className="gs-lesson-nav">
        <button
          className="galois-quiet"
          disabled={lesson === 0}
          onClick={() => goToLesson(lesson - 1, true)}
        >
          上一个小步骤
        </button>
        <span>{lesson + 1} / 3</span>
        <button
          className="galois-primary"
          disabled={lesson === 2}
          onClick={() => goToLesson(lesson + 1, true)}
        >
          {lesson === 2 ? "三个小步骤已展开" : labels[lesson + 1]}
          <ArrowRight size={14} />
        </button>
      </div>
    </>
  );
}
