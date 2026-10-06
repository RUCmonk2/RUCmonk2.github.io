"use client";

import "./galois-foundations.css";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";

import { MathFormula, StageHeading } from "./galois-shared";

const CARD_OPERATIONS = [
  { name: "保持原位", notation: "e", map: [0, 1, 2], undo: "仍然什么都不做" },
  {
    name: "交换左、中",
    notation: "(1 2)",
    map: [1, 0, 2],
    undo: "再交换一次左、中",
  },
  {
    name: "交换中、右",
    notation: "(2 3)",
    map: [0, 2, 1],
    undo: "再交换一次中、右",
  },
  {
    name: "交换左、右",
    notation: "(1 3)",
    map: [2, 1, 0],
    undo: "再交换一次左、右",
  },
  {
    name: "向右循环一格",
    notation: "(1 2 3)",
    map: [1, 2, 0],
    undo: "向左循环一格",
  },
  {
    name: "向左循环一格",
    notation: "(1 3 2)",
    map: [2, 0, 1],
    undo: "向右循环一格",
  },
];
const ORIGINAL_CARDS = [1, 2, 3];

function moveCards(cards: number[], map: number[]) {
  const result = [...cards];
  cards.forEach((card, position) => {
    result[map[position]] = card;
  });
  return result;
}

function CardRow({ cards, label }: { cards: number[]; label: string }) {
  return (
    <div
      className="gf-card-row"
      role="img"
      aria-label={`${label}：从左到右是 ${cards.join("、")}`}
    >
      <span className="gf-row-label" aria-hidden="true">
        {label}
      </span>
      <div className="gf-cards" aria-hidden="true">
        {cards.map((card, position) => (
          <div className="gf-card-slot" key={position}>
            <span className={`gf-card gf-card-${card}`}>{card}</span>
            <small>{["左", "中", "右"][position]}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RootFoundations() {
  const [operation, setOperation] = useState(1);
  const [undone, setUndone] = useState(false);
  const [orderStep, setOrderStep] = useState(0);
  const selected = CARD_OPERATIONS[operation];
  const afterA = moveCards(ORIGINAL_CARDS, CARD_OPERATIONS[1].map);
  const afterB = moveCards(ORIGINAL_CARDS, CARD_OPERATIONS[2].map);

  return (
    <>
      <StageHeading index={0} title="先不碰方程：试着移动三张卡片">
        这一站只认识两个想法：把“移动的方法”当作研究对象，以及先后顺序可能影响结果。下一站再看它们和解方程的关系。
      </StageHeading>

      <div className="galois-workbench gf-workbench">
        <div className="gf-question">
          <span className="gf-eyebrow">先试一件事</span>
          <h3>三张卡片，有几种重新排列的方法？</h3>
          <p>
            选择一个操作，看卡片去哪里。每次都从 1、2、3
            开始；“左、中、右”指固定的位置。
          </p>
        </div>
        <div className="gf-operation-grid" aria-label="三张卡片的六种操作">
          {CARD_OPERATIONS.map((item, index) => (
            <button
              key={item.notation}
              className="gf-operation"
              aria-pressed={index === operation}
              onClick={() => {
                setOperation(index);
                setUndone(false);
              }}
            >
              <strong>{item.name}</strong>
              <span>简记为 {item.notation}</span>
            </button>
          ))}
        </div>
        <div className="gf-card-comparison" aria-live="polite">
          <CardRow cards={ORIGINAL_CARDS} label="起点" />
          <ArrowRight
            className="gf-between-arrow"
            size={22}
            aria-hidden="true"
          />
          <CardRow
            cards={
              undone ? ORIGINAL_CARDS : moveCards(ORIGINAL_CARDS, selected.map)
            }
            label={undone ? "撤回以后" : "操作以后"}
          />
        </div>
        <div className="galois-controls gf-undo-controls">
          <button
            className="galois-quiet"
            disabled={undone}
            onClick={() => setUndone(true)}
          >
            <RotateCcw size={14} /> 撤回这一步
          </button>
          <span>
            {undone
              ? `撤回的方法：${selected.undo}。卡片回到了起点。`
              : `这个操作也能撤回：${selected.undo}。`}
          </span>
        </div>
        <div className="galois-observation">
          <strong>“群”里数的是操作：这里有 6 个操作，只有 3 张卡片。</strong>
          <p>
            第一张有 3 个去处，第二张有 2 个去处，第三张只剩 1 个：总共 3 × 2 ×
            1 = 6 种。上面的按钮已经列全，包括什么都不做的 e。
          </p>
          <p>
            把三张卡片的全部重排操作放在一起，叫作“三个对象的对称群”，简写 S₃。S
            提醒我们是在研究重排，右下角的 3 是卡片数。
          </p>
        </div>
      </div>

      <details className="galois-details">
        <summary>刚才的括号是什么意思？为什么这些操作能叫作“群”？</summary>
        <p>
          先给位置编号：左为 1，中为 2，右为 3。(1 2) 表示交换位置 1、2；(1 2 3)
          表示位置 1 的卡片去 2，2 的去 3，3 的回到
          1。括号是移动路线的速记，不是乘法。
        </p>
        <p>
          这些操作有四个共同点：连续做两个操作，结果仍是六种之一；可以什么都不做；每个操作都能撤回；连续做三步时，把前两步或后两步先看成一个整体，不会改变结果。这四条就是“群”的规则。
        </p>
        <p>
          最后一条叫结合律，它只改变分组，不改变操作顺序。操作顺序能否改变，要单独检查。
        </p>
      </details>

      <div className="galois-workbench gf-workbench">
        <div className="gf-question">
          <span className="gf-eyebrow">再试一件事</span>
          <h3>先交换左、中，再交换中、右，倒过来做会一样吗？</h3>
          <p>
            约定 A = 交换左、中，B = 交换中、右。点击按钮，让两条路线各走一步。
          </p>
        </div>
        <div className="gf-order-routes" aria-live="polite">
          {[
            {
              title: "路线一：先 A，再 B",
              first: afterA,
              final: moveCards(afterA, CARD_OPERATIONS[2].map),
              firstName: "做完 A",
              finalName: "再做 B",
            },
            {
              title: "路线二：先 B，再 A",
              first: afterB,
              final: moveCards(afterB, CARD_OPERATIONS[1].map),
              firstName: "做完 B",
              finalName: "再做 A",
            },
          ].map((route) => (
            <div className="gf-order-route" key={route.title}>
              <h4>{route.title}</h4>
              <CardRow cards={ORIGINAL_CARDS} label="起点" />
              {orderStep >= 1 && (
                <CardRow cards={route.first} label={route.firstName} />
              )}
              {orderStep >= 2 && (
                <CardRow cards={route.final} label={route.finalName} />
              )}
            </div>
          ))}
        </div>
        <div className="galois-controls">
          <button
            className="galois-primary"
            disabled={orderStep === 2}
            onClick={() => setOrderStep((value) => value + 1)}
          >
            {orderStep === 0
              ? "分别做第一步"
              : orderStep === 1
                ? "接着做第二步"
                : "两条路线都已完成"}
            <ArrowRight size={14} />
          </button>
          <button className="galois-quiet" onClick={() => setOrderStep(0)}>
            <RotateCcw size={14} />
            重新走一遍
          </button>
        </div>
        <div className="galois-observation" aria-live="polite">
          <strong>
            {orderStep === 2
              ? "同样的两个操作，顺序不同，最终排列不同。"
              : "先别急着命名，看完两步再比较最终排列。"}
          </strong>
          <p>
            {orderStep === 2
              ? "这叫这两个操作“不可交换”。如果群里的任意两个操作都能交换顺序，才叫“可交换群”，也叫“阿贝尔群”。我们找到一个反例，所以 S₃ 不是阿贝尔群。"
              : "注意：每一步交换的是固定位置上的卡片，不是永远交换写着某两个数字的卡片。"}
          </p>
        </div>
      </div>
      <div className="galois-takeaway">
        <strong>先记住：群是一些能接着做、能撤回的操作。</strong>
        <p>
          “不可交换”还不能推出方程没有根式解。三次方程就会出现
          S₃，但仍有根式通解。我们还缺两件事：这些操作怎样描述方程，以及怎样“分层处理”它们。
        </p>
      </div>
    </>
  );
}

const BRIDGE_STEPS = [
  "系数告诉了什么",
  "试着互换两根",
  "找一个新的量",
  "把一个根号加入已知",
  "取回两个根",
];

export function RadicalBridge() {
  const [step, setStep] = useState(0);
  const [swapped, setSwapped] = useState(false);
  function goToStep(next: number) {
    setStep(next);
    setSwapped(false);
  }

  return (
    <>
      <StageHeading index={1} title="开一个根号，为什么会改变允许的换根操作？">
        只用一个二次方程走完这座桥。先不背新名词：观察“现在已知什么”，以及交换两根会不会改变它。
      </StageHeading>
      <div className="galois-workbench gf-workbench">
        <div className="gf-bridge-equation">
          <span className="gf-eyebrow">这一站始终研究同一个方程</span>
          <MathFormula value="x^2-5x+5=0" />
          <p>
            把两个根暂时叫 r₁、r₂。开始时，我们知道有理数和系数，还没有把 √5
            加入已知。
          </p>
        </div>
        <div className="gf-step-tabs" aria-label="二次方程的五步观察">
          {BRIDGE_STEPS.map((title, index) => (
            <button
              key={title}
              aria-pressed={step === index}
              onClick={() => goToStep(index)}
            >
              <span>{index + 1}</span>
              {title}
            </button>
          ))}
        </div>
        <div className="gf-bridge-step" aria-live="polite">
          <span className="gf-eyebrow">第 {step + 1} / 5 步</span>
          {step === 0 && (
            <>
              <h3>还没有解出根，但它们的和、积已经确定。</h3>
              <p>
                如果 r₁、r₂ 是两个根，原式就能写成 (x − r₁)(x −
                r₂)。展开，再与原方程对照系数：
              </p>
              <MathFormula value="(x-r_1)(x-r_2)=x^2-(r_1+r_2)x+r_1r_2" />
              <div className="gf-known-facts">
                <span>一次项系数给出</span>
                <strong>r₁ + r₂ = 5</strong>
                <span>常数项给出</span>
                <strong>r₁r₂ = 5</strong>
              </div>
              <p className="gf-local-conclusion">
                我们掌握了两个关系，但还没有分别写出每一个根。
              </p>
            </>
          )}
          {step === 1 && (
            <>
              <h3>如果互换两根，已知的和、积会变吗？</h3>
              <div className="gf-root-pair">
                <span>{swapped ? "r₂" : "r₁"}</span>
                <span>{swapped ? "r₁" : "r₂"}</span>
              </div>
              <button
                className="galois-quiet"
                onClick={() => setSwapped((value) => !value)}
              >
                <RotateCcw size={14} />
                {swapped ? "再交换一次" : "互换两根"}
              </button>
              <MathFormula
                value={
                  swapped
                    ? "r_2+r_1=5,\\qquad r_2r_1=5"
                    : "r_1+r_2=5,\\qquad r_1r_2=5"
                }
              />
              <p className="gf-local-conclusion">
                {swapped
                  ? "和、积都没变。这次交换通过了眼前的检验。"
                  : "先试一次，再观察上面两个关系。"}
              </p>
              <p>
                真正允许的交换还必须保持全部代数关系。这个方程的互换确实满足要求；下方的补充说明给出理由。只检查和、积，对其他方程并不够。
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <h3>和、积已知，能不能算出“两根之差”的平方？</h3>
              <p>设 d = r₁ − r₂。用刚才的两个关系，就能计算：</p>
              <MathFormula value="d^2=(r_1-r_2)^2=(r_1+r_2)^2-4r_1r_2" />
              <MathFormula value="d^2=5^2-4\times5=5" />
              <button
                className="galois-quiet"
                onClick={() => setSwapped((value) => !value)}
              >
                <RotateCcw size={14} />
                {swapped ? "换回两根" : "此时再互换两根"}
              </button>
              <p className="gf-local-conclusion">
                {swapped
                  ? "互换后，差从 d 变成 −d；但是 (−d)² = d² = 5，所以这个平方关系仍然成立。"
                  : "我们知道 d² = 5，尚未选定 d 的具体值。两个候选值是 √5 和 −√5。"}
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <h3>现在，把选定的 d = √5 加入已知。</h3>
              <p>
                约定 r₁ − r₂ = d。此后，允许的操作必须保持这个选定的 d
                不动。试一试：互换两根还能做到吗？
              </p>
              <MathFormula value="d=\sqrt5,\qquad r_1-r_2=d" />
              <button
                className="galois-quiet"
                onClick={() => setSwapped((value) => !value)}
              >
                <RotateCcw size={14} />
                {swapped ? "回到未交换的状态" : "检验互换是否仍允许"}
              </button>
              {swapped ? (
                <div className="gf-swap-verdict">
                  <strong>这次互换不再允许。</strong>
                  <MathFormula value="r_2-r_1=-d\ne d" />
                  <p>
                    它把新的已知量 d 变成了 −d，没有保持 d
                    不动。现在只剩“什么都不做”这一种允许的操作。
                  </p>
                </div>
              ) : (
                <p className="gf-local-conclusion">
                  刚才固定的是有理数；现在还要固定一个新数
                  d。允许的操作因此受到更多约束。
                </p>
              )}
              <p>
                这是“加入一个数，并要求固定它”。选另一支 −√5
                也可以，最后只是对调两个根的写法。
              </p>
            </>
          )}
          {step === 4 && (
            <>
              <h3>和与差都已知，两个根就能分别写出来。</h3>
              <MathFormula value="r_1+r_2=5,\qquad r_1-r_2=d" />
              <p>两式相加求 r₁，两式相减求 r₂：</p>
              <MathFormula value="r_1=\frac{5+d}{2}=\frac{5+\sqrt5}{2},\qquad r_2=\frac{5-d}{2}=\frac{5-\sqrt5}{2}" />
              <p className="gf-local-conclusion">
                方程仍有两个根。改变的是：加入 d
                以后，每个根都能用已知量写出，允许的换根操作只剩 e。
              </p>
            </>
          )}
        </div>
        <div className="galois-controls gf-step-controls">
          <button
            className="galois-quiet"
            disabled={step === 0}
            onClick={() => goToStep(step - 1)}
          >
            上一步
          </button>
          <button
            className="galois-primary"
            disabled={step === 4}
            onClick={() => goToStep(step + 1)}
          >
            {step === 4
              ? "二次方程的桥梁已走通"
              : `下一步：${BRIDGE_STEPS[step + 1]}`}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="gf-naming">
        <span className="gf-eyebrow">做过以后，再给它命名</span>
        <h3>这些“允许的换根操作”，组成伽罗瓦群。</h3>
        <p>
          这里的“允许”是指：保持已知量和全部代数关系不变。本例开始时，群有两个操作：不动、互换；把选定的
          √5 加入已知以后，只剩不动。
        </p>
        <p>
          注意边界：x² − 3x + 2 的根是
          1、2，它们本来就是已知的有理数。允许的操作必须固定 1 和
          2，不能互换它们；尽管互换也不会改变和与积。
        </p>
      </div>

      <details className="galois-details">
        <summary>补充：为什么上面的 √5 与 −√5 确实可以互换？</summary>
        <p>
          这个方程涉及的数都能写成 a + b√5，其中 a、b 是有理数。把每个 a + b√5
          一致地变为 a −
          b√5，会保持有理数不动，也保持加、减、乘、除以及等式成立。这是因为两边都满足
          (√5)² = 5；直接展开运算即可核对。
        </p>
        <p>
          因此，它互换两个根，并保持它们的全部有理系数代数关系。把 √5
          本身加入已知之后，这个变换就不再满足“固定已知量”的要求。
        </p>
      </details>

      <div className="gf-bridge-link">
        <span className="gf-eyebrow">回到我们的目标：四次与五次</span>
        <h3>一个根号只演示了一步。多层根号需要怎样的群？</h3>
        <p>
          开平方有两种候选值。更一般地，开 m
          次方的候选值，彼此可以通过“转一定的角度”联系起来；连续转两次，先后顺序不影响结果。这是根式与可交换操作联系的起点。
        </p>
        <details className="galois-details">
          <summary>看清这个直觉的条件：先加入所需的单位根</summary>
          <p>
            如果 uᵐ = a 且 u ≠ 0，先把一个 m 次本原单位根 ζ
            加入已知，那么所有候选值是：
          </p>
          <MathFormula value="u,\;\zeta u,\;\zeta^2u,\;\ldots,\;\zeta^{m-1}u,\qquad \zeta=e^{2\pi i/m}" />
          <p>
            单位根 ζ 可以理解为复平面上旋转 1/m 圈。保持当前已知量的操作把 u
            送到其中一个候选值；这些操作构成循环群的子群，因此彼此可交换。u = 0
            时没有这种分支。
          </p>
          <p>
            多层根号中还要处理单位根和各层数域之间的关系，不能把任意一个群的箭头直接当成一次开根。下面的定理把这些条件和两个方向的证明统一起来。
          </p>
        </details>
        <div className="gf-theorem">
          <span className="gf-eyebrow">
            需要严密证明的数学桥梁 · 伽罗瓦理论
          </span>
          <p>
            <strong>
              从已知系数出发，所有根能用根式表示，当且仅当方程的伽罗瓦群是可解群。
            </strong>
          </p>
          <p>
            “可解群”大意是：能分成有限层，每一层的操作都可交换。下一站会实际演示“分层”是什么意思，再解释四次为何能走到底。
          </p>
          <p className="gf-proof-boundary">
            本页既把它用于有理系数的具体方程，也用于系数作为独立变量的一般方程；两者都满足定理要求的特征为 0 的条件。这条定理需要域论来证明；刚才的二次实验展示了它如何工作，并不是对一般定理的证明。
          </p>
        </div>
      </div>
    </>
  );
}
