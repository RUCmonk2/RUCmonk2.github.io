"use client";

import "./galois-obstruction.css";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

import {
  commutator,
  compose,
  conjugacyClassesA5,
  cycleNotation,
  inverse,
} from "@/lib/math-lab/galois";

import { MathFormula, StageHeading } from "./galois-shared";

const THREE_CYCLE = [1, 2, 0, 3, 4];
const OTHER_CYCLE = [0, 1, 3, 4, 2];
// 1 ↦ 3, 2 ↦ 4, 3 ↦ 5, 4 ↦ 1, 5 ↦ 2 is an even five-cycle.
const RELABEL = [2, 3, 4, 0, 1];
const CLASS_NAMES = [
  "保持原位",
  "同时交换两对",
  "三个标签轮转",
  "五个标签轮转 · 甲",
  "五个标签轮转 · 乙",
];
const CLASS_TERMS = [
  "单位元",
  "双换位",
  "三轮换",
  "五轮换的一族",
  "五轮换的另一族",
];
const CLASS_DESCRIPTIONS = [
  "五个标签全不动。每个群都要包含这一个操作。",
  "选两对标签，各交换一次；第五个标签不动。",
  "选三个标签，沿一个方向轮转；另外两个不动。",
  "五个标签轮流占据下一个位置。允许的重命名把其中12个连成一族。",
  "也是五个标签轮转，但仅用偶置换重命名，无法从甲族变到这一族。",
];

export function QuinticExperiment() {
  const classes = useMemo(() => conjugacyClassesA5(), []);
  const [renamed, setRenamed] = useState(false);
  const [selected, setSelected] = useState([false, false, false, false]);
  const [inspected, setInspected] = useState(false);
  const [trackedLabel, setTrackedLabel] = useState(3);
  const renamedCycle = compose(RELABEL, compose(THREE_CYCLE, inverse(RELABEL)));
  const order =
    1 +
    classes.slice(1).reduce((sum, c, i) => sum + (selected[i] ? c.size : 0), 0);
  const divides = 60 % order === 0;
  const allChoices = Array.from({ length: 16 }, (_, mask) => {
    const included = classes.slice(1).filter((_, i) => (mask & (1 << i)) !== 0);
    const size = 1 + included.reduce((sum, c) => sum + c.size, 0);
    return {
      mask,
      size,
      expression: [1, ...included.map((c) => c.size)].join(" + "),
    };
  });
  const firstA = THREE_CYCLE[trackedLabel - 1] + 1;
  const thenB = OTHER_CYCLE[firstA - 1] + 1;
  const firstB = OTHER_CYCLE[trackedLabel - 1] + 1;
  const thenA = THREE_CYCLE[firstB - 1] + 1;

  return (
    <>
      <StageHeading index={3} title="五次究竟卡在哪里？先看懂这60个操作。">
        上一站，四次方程的操作群能一步步缩到只剩“不动”。五次却留下60个操作。本站不要求记住新名词：先亲手换标签，再检查为什么这一层无法继续缩小。
      </StageHeading>

      <div className="go-comparison">
        <div>
          <span>四次 · 上一站已经做到</span>
          <strong>24 → 12 → 4 → 1</strong>
          <small>最后只剩“不动”这个操作。</small>
        </div>
        <div>
          <span>五次 · 现在要解释</span>
          <strong>120 → 60 → ?</strong>
          <small>60是操作的个数，方程仍然只有5个根。</small>
        </div>
      </div>
      <p className="go-bridge">
        五个标签共有120种排列，组成 S₅。其中恰好一半能用偶数次“两两交换”完成，叫
        <strong>偶置换</strong>；这60个操作组成的群，简记为 <strong>A₅</strong>
        。 我们要检查：按上一站保留“顺序差异”的规则继续做，能不能让60变得更少？
      </p>

      <section className="go-lesson" aria-labelledby="go-relabel-title">
        <div className="go-step-heading">
          <span>第一步</span>
          <h3 id="go-relabel-title">换了标签，同一种操作长什么样？</h3>
        </div>
        <p>
          <code>(1 2 3)</code>{" "}
          的意思是1去2的位置、2去3的位置、3回到1的位置，4和5不动。这叫
          <strong>三轮换</strong>，可以用两次两两交换完成，所以属于 A₅。
        </p>
        <div className="galois-workbench go-rename-workbench">
          <div className="go-relabel-map">
            <strong>这次重新编号的规则</strong>
            <div>
              {RELABEL.map((target, i) => (
                <span key={i}>
                  {i + 1}
                  <ArrowRight size={12} aria-hidden="true" />
                  {target + 1}
                </span>
              ))}
            </div>
            <small>
              它本身是一次五轮换，能分成4次两两交换，属于
              A₅，因而是这里允许的重命名。
            </small>
          </div>
          <div className="go-cycle-display" aria-live="polite">
            <span>{renamed ? "换成新标签之后" : "沿用原来的标签"}</span>
            <div
              className="go-cycle-route"
              aria-label={renamed ? "3到4到5再回到3" : "1到2到3再回到1"}
            >
              {(renamed ? [3, 4, 5, 3] : [1, 2, 3, 1]).map((label, i) => (
                <span className="go-route-pair" key={i}>
                  {i > 0 && <ArrowRight size={18} aria-hidden="true" />}
                  <b>{label}</b>
                </span>
              ))}
            </div>
            <code>{cycleNotation(renamed ? renamedCycle : THREE_CYCLE)}</code>
            <p>
              {renamed
                ? "现在叫(3 4 5)，但仍然是三个标签轮转。操作的形式没变，只是名字变了。"
                : "点击下面的按钮，把操作中的每个数字都按上面的规则改名。"}
            </p>
          </div>
          <div className="galois-action-row">
            <button
              className="galois-primary"
              onClick={() => setRenamed(!renamed)}
            >
              {renamed ? <RotateCcw size={15} /> : <ArrowRight size={15} />}
              {renamed ? "换回原来的编号" : "按规则重新编号"}
            </button>
          </div>
        </div>
        <p>
          把所有允许的重命名都试过，一种操作能变成的一整族操作，叫
          <strong>共轭类</strong>
          。这个名字只表示“通过重命名能互相变成的一族”。例如，上面的两个三轮换属于同一族。
        </p>
        <details className="galois-details">
          <summary>“重新编号”为什么写成 g a g⁻¹？</summary>
          <p>
            设 a 是原操作，g 是把旧名字换成新名字的规则。收到一个新名字时，先用
            g⁻¹ 找回旧名字，再做 a，最后用 g
            换回新名字。按从右往左执行的约定，就写成 g a
            g⁻¹。这叫共轭，不是在原操作之后额外多做一次轮转。
          </p>
          <MathFormula
            value={String.raw`g(1\;2\;3)g^{-1}=(g(1)\;g(2)\;g(3))=(3\;4\;5)`}
          />
          <p>重命名前后，轮转的标签个数不变，两两交换组成的对数也不变。</p>
        </details>
      </section>

      <section className="go-lesson" aria-labelledby="go-normal-title">
        <div className="go-step-heading">
          <span>第二步</span>
          <h3 id="go-normal-title">
            要成为“可用来分层的一包操作”，得满足什么？
          </h3>
        </div>
        <div className="go-requirements">
          <article>
            <span>要求一 · 自己仍然是一个群</span>
            <h4>连续做、撤销做，都不出这一包</h4>
            <p>
              还要含有“不动”的操作 e。满足这些要求，叫<strong>子群</strong>
              。例如，反复做同一个三轮换，会得到 e、(1 2 3)、(1 3 2) 这3个操作。
            </p>
          </article>
          <article>
            <span>要求二 · 不依赖怎样给标签编号</span>
            <h4>用 A₅ 内任意操作重命名后，仍是这一包</h4>
            <p>
              这样的子群叫<strong>正规子群</strong>
              。前面的3个操作就不满足：重命名能把 (1 2 3) 变成包外的 (3 4 5)。
            </p>
            <p>
              这与上一站“组内换一个代表，不改变组别合成”是同一个要求的另一种检验方法。把这一包当作“不动”那一组时，先做某个操作、再做包内操作、最后撤销前者，组别应当仍是不动；这正要求重命名后不跑到包外。
            </p>
          </article>
        </div>
        <p className="go-key-sentence">
          所以，正规子群只要收下一种操作，就必须收下它通过重命名得到的
          <strong>整族</strong>
          。下一步不能单挑一个三轮换，必须一口气选它所在的一族。
        </p>
        <div className="go-size-rule">
          <h4>还有一条能快速排除候选的规则：个数必须整除60</h4>
          <p>
            原因是：一个子群能把整个群切成同样大的、不重不漏的组，每组和这个子群一样大。这样的组叫
            <strong>陪集</strong>。因此“整个群的个数 ÷ 子群的个数”必须是整数。
          </p>
          <div
            className="go-cosets"
            aria-label="三标签的6个操作，分成每组3个的两组"
          >
            <div>
              <span>一个3操作的子群</span>
              <code>e</code>
              <code>(1 2 3)</code>
              <code>(1 3 2)</code>
            </div>
            <strong>+</strong>
            <div>
              <span>对它统一先做一次 (1 2)</span>
              <code>(1 2)</code>
              <code>(1 3)</code>
              <code>(2 3)</code>
            </div>
            <strong>= 6</strong>
          </div>
          <p>
            先在三标签的例子里看：6 = 3 +
            3。换成60个操作，同样必须能分成整组；比如16个一组就分不完。
          </p>
          <details>
            <summary>为什么这些组等大，而且不会部分重叠？</summary>
            <p>
              设小群为 H。对 H 中每个操作统一先做 g，得到
              Hg。这种对应可以通过撤销 g 还原，所以每组恰有 |H|
              个操作。两组若有一个共同操作，利用 H
              对合成、取逆封闭，可推出两组完全相同。每个操作又都在某一组中，所以它们确实把整个群分完。这就是拉格朗日定理的计数理由。
            </p>
          </details>
        </div>
      </section>

      <section className="go-lesson" aria-labelledby="go-select-title">
        <div className="go-step-heading">
          <span>第三步</span>
          <h3 id="go-select-title">
            现在试着选：能拼出1与60之间的正规子群吗？
          </h3>
        </div>
        <p>
          A₅ 的60个操作恰好分成下面5族，个数是 1 + 15 + 20 + 12 + 12 =
          60。你已经知道两条必要条件：
          <strong>必须整族选，选出的总数必须整除60</strong>。现在逐项试一试。
        </p>
        <div className="galois-workbench">
          <div className="galois-class-grid go-class-grid">
            {classes.map((c, i) => (
              <label
                key={i}
                className={`galois-class ${i === 0 || selected[i - 1] ? "is-selected" : ""}`}
              >
                <span className="galois-class-title">
                  <input
                    type="checkbox"
                    checked={i === 0 || selected[i - 1]}
                    disabled={i === 0}
                    onChange={() =>
                      setSelected(
                        selected.map((v, j) => (j === i - 1 ? !v : v)),
                      )
                    }
                  />
                  {CLASS_NAMES[i]}
                </span>
                <span className="go-class-description">
                  {CLASS_DESCRIPTIONS[i]}
                </span>
                <strong>
                  {c.size}
                  <small> 个操作</small>
                </strong>
                <code>例如 {cycleNotation(c.representative)}</code>
                <span className="go-term">数学名称：{CLASS_TERMS[i]}</span>
                <span className="galois-class-dots" aria-hidden="true">
                  {c.elements.map((_, j) => (
                    <i key={j} />
                  ))}
                </span>
                <small>
                  {i === 0 ? "必须包含，不可取消" : "点击整族加入 / 移除"}
                </small>
              </label>
            ))}
          </div>
          <div className="galois-class-result" aria-live="polite">
            <div>
              <span>选出的操作总数</span>
              <strong>
                {order}
                <small> / 60</small>
              </strong>
            </div>
            <div>
              <b>
                {divides
                  ? order === 1
                    ? "只剩“不动”：没有更小的中间层。"
                    : "全选了60个：没有缩小。"
                  : `${order}不能整除60，这一包不可能是子群。`}
              </b>
              <p>
                {divides
                  ? "这两个端点确实是正规子群。但要把这一层继续分开，我们寻找的是比1大、比60小的候选。"
                  : `60 ÷ ${order}不是整数，无法分成同样大的整组。因此它也不可能是正规子群。`}
              </p>
            </div>
          </div>
          <div className="galois-action-row">
            <button
              className="galois-quiet"
              onClick={() => setSelected([false, false, false, false])}
            >
              只留“不动”
            </button>
            <button
              className="galois-quiet"
              onClick={() => setSelected([true, true, true, true])}
            >
              选择全部
            </button>
            <button
              className="galois-quiet"
              aria-expanded={inspected}
              onClick={() => setInspected(!inspected)}
            >
              {inspected ? "收起全部检查" : "检查全部16种选择"}
            </button>
          </div>
          {inspected && (
            <div className="go-all-choices">
              <p>
                “不动”必须选，其余4族各有选/不选两种情况，共 2⁴ = 16
                种；甲、乙两族大小相同，但仍是不同选择。
              </p>
              <div className="go-choice-grid">
                {allChoices.map(({ mask, size, expression }) => (
                  <div
                    key={mask}
                    className={60 % size === 0 ? "is-endpoint" : ""}
                  >
                    <span>
                      {expression} = <b>{size}</b>
                    </span>
                    <small>
                      {60 % size === 0 ? "端点 · 通过" : "不能整除60"}
                    </small>
                  </div>
                ))}
              </div>
              <p>
                <strong>只有1和60通过。</strong>
                我们只用必要条件排除了所有中间候选；并没有声称“整除就一定是子群”。
              </p>
            </div>
          )}
        </div>
        <p>
          五轮换为什么有两族？因为这里只允许<strong>偶置换</strong>
          来重命名，并非任意换名都可以。同样是五个标签轮转，也可能无法用允许的换名规则互相变成。下面保留了这5族的完整计数依据。
        </p>
        <details className="galois-details">
          <summary>
            严格核对：为什么恰是1、15、20、12、12，而且没有遗漏？
          </summary>
          <p>
            偶置换只能有这些循环形式：不动、两个互不相交的换位、一个三轮换、一个五轮换。两个标签交换是奇置换；四轮换、三轮换加一个换位也都是奇置换，因此不在
            A₅ 中。
          </p>
          <p>
            三轮换：从5个标签选3个，有10种选法，每种有两个方向，共20个。双换位：先选那个不动的标签，有5种；其余4个配成两对有3种，共15个。五轮换：固定从标签1开始写，其余4个的顺序有
            4! = 24 种。加上“不动”，总共60个，没有遗漏。
          </p>
          <p>
            还要核对“同一种形式是一族还是多族”。给定操作 a，所有与 a
            能交换先后次序的 A₅ 操作组成它的<strong>中心化子</strong>
            。两个重命名给出同一个新操作，恰好相差这样一个可交换操作。因此每族的大小
            = 60 ÷ 中心化子的大小。
          </p>
          <ul>
            <li>
              三轮换：可交换的偶置换只有它的三种幂，所以一族有 60 ÷ 3 = 20
              个，恰好覆盖全部三轮换。
            </li>
            <li>
              双换位：以 (1 2)(3 4) 为例，可交换的偶置换只有 e、(1 2)(3 4)、(1
              3)(2 4)、(1 4)(2 3)，共4个，所以一族有 60 ÷ 4 = 15 个。
            </li>
            <li>
              五轮换：可交换的置换只有它的5种幂，而且全为偶置换。因此一族有 60 ÷
              5 = 12 个；24个五轮换正好分成两族。
            </li>
          </ul>
          <p>
            为什么三轮换、五轮换的可交换操作只有这些？可交换操作必须把轮转轨道送到相同长度的轨道；在一个轮转轨道上，它送出第一个标签的位置后，其余位置就都确定了。三轮换剩余两个固定点虽然可以互换，但那会是奇置换，要排除。双换位则可以交换两条二点轨道、翻转各轨道，列举后保留上面的4个偶置换。
          </p>
          <p>
            页面用真实置换逐个计算每一族；这里的分类、计数和整除论证说明实验为什么能穷尽所有候选。
          </p>
        </details>
      </section>

      <section className="go-lesson" aria-labelledby="go-finish-title">
        <div className="go-step-heading">
          <span>最后一步</span>
          <h3 id="go-finish-title">“没有中间层”还不够：这一层也不能交换顺序</h3>
        </div>
        <p>
          假如这60个操作本来就都能交换顺序，也可以直接过关。所以还要找出一对确实不能交换的操作。取
          A = (1 2 3)、B = (3 4 5)，跟踪一个标签，看看先后次序有什么影响。
        </p>
        <div className="galois-workbench go-order-workbench">
          <div className="galois-controls">
            <label>
              跟踪标签
              <select
                value={trackedLabel}
                onChange={(e) => setTrackedLabel(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <span>默认跟踪3，就能看见不同结果。</span>
          </div>
          <div className="go-order-routes" aria-live="polite">
            <div>
              <span>先 A，再 B</span>
              <strong>
                {trackedLabel} → {firstA} → {thenB}
              </strong>
            </div>
            <div>
              <span>先 B，再 A</span>
              <strong>
                {trackedLabel} → {firstB} → {thenA}
              </strong>
            </div>
          </div>
          <p className="go-order-result" aria-live="polite">
            {thenA !== thenB
              ? `同一个标签最后分别去了${thenB}与${thenA}：这两个操作不能交换顺序。`
              : "这个标签的终点恰好相同。再跟踪标签3：只需一个标签不同，就能证明整体操作不同。"}
          </p>
        </div>

        <div className="galois-proof-steps">
          <article>
            <span>01</span>
            <div>
              <h3>整族选择的检查：没有可用的中间层</h3>
              <p>
                任何正规子群都必须含“不动”、整族选取，而且个数整除60。我们已经排除了1和60之间的全部候选。所以
                A₅ 只有 {"{e}"} 和 A₅ 本身这两个正规子群。这种性质的名字是
                <strong>单群</strong>；它仍可以有不正规的子群。
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>先后次序的检查：不能直接过关</h3>
              <p>
                A、B 不能交换，所以 A₅
                不是阿贝尔群。上一站的“保留顺序差异”规则，至少会留下一种不为 e
                的操作；按定义，这种差异就是交换子。
              </p>
              <p>
                真实计算得到{" "}
                <code>
                  [A, B] = {cycleNotation(commutator(THREE_CYCLE, OTHER_CYCLE))}
                </code>
                ，确实不是“不动”。
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>两条合起来：下一轮必然还是原来的60个</h3>
              <p>
                把所有交换子以及它们能合成的操作收在一起，得到
                <strong>交换子子群</strong>，记作
                A₅′。它总是正规子群；第02条说明它不只含
                e，而第01条说明只剩另一个可能：它就是整个
                A₅。因此继续做多少轮都不会缩小。
              </p>
              <MathFormula
                value={
                  "S_5\\longrightarrow A_5\\longrightarrow A_5\\longrightarrow\\cdots"
                }
              />
              <p className="go-number-line">
                操作个数：120 → 60 → 60 → …，到不了1。
              </p>
            </div>
          </article>
        </div>
        <details className="galois-details">
          <summary>为什么“所有顺序差异组成的群”一定正规？</summary>
          <p>
            一个交换子写作 [a,b] = aba⁻¹b⁻¹。先后顺序能交换时它是
            e；不能交换时它不是 e。用 g
            重命名一个交换子，会得到另一对操作的交换子：
          </p>
          <MathFormula value={"g[a,b]g^{-1}=[gag^{-1},gbg^{-1}]"} />
          <p>
            所以重命名不会把“所有交换子以及它们的合成”变到外面。这正是前面定义的正规性。由
            A₅ 的简单性和这个交换子子群非平凡，严格推出 A₅′ = A₅。
          </p>
        </details>
      </section>

      <div className="galois-takeaway">
        <strong>回到方程：这才是一般五次没有根式通解的原因</strong>
        <p>
          前面引入的伽罗瓦定理把两边连起来：方程能用根式求解，当且仅当它的伽罗瓦群可解。一般五次的群是
          S₅；我们现在证明它的顺序差异无法逐层消除，所以它不可解，一般五次就没有根式通解。
        </p>
        <p>
          这里说的是不存在覆盖一般五次方程的根式公式；特殊五次，例如 x⁵ − 2 =
          0，仍然能用根式求解。至于六次以及更高次，下一站还需要另补一条论证。
        </p>
      </div>
    </>
  );
}
