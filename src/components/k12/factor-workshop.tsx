"use client";
import "./factor-workshop.css";

import katex from "katex";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { k12LessonHref } from "@/data/k12";
import {
  checkFactorization,
  checkFactorizationBlanks,
  type CheckResult,
  type FactorizationBlanks,
  type FactorKind,
  factorKinds,
  makeFactorQuestion,
  parseQuestionLink,
  polynomialText,
  questionHash,
} from "@/lib/math-lab/factorization";
import { factorLatex, factorStepSegments } from "@/lib/math-lab/math-text";

function MathDisplay({
  value,
  inline = false,
}: {
  value: string;
  inline?: boolean;
}) {
  const html = useMemo(
    () =>
      katex.renderToString(value, {
        displayMode: !inline,
        throwOnError: true,
        strict: "error",
        trust: false,
      }),
    [value, inline],
  );
  return (
    <span
      className={inline ? "factor-math-inline" : "factor-math"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
function StepText({ text }: { text: string }) {
  return (
    <>
      {factorStepSegments(text).map((part, index) =>
        part.math ? (
          <MathDisplay key={index} inline value={part.value} />
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </>
  );
}
function AreaExplorer() {
  const [a, setA] = useState(2),
    [b, setB] = useState(3),
    [x, setX] = useState(4),
    [joined, setJoined] = useState(true);
  const scale = 18,
    xWidth = x * scale,
    aWidth = a * scale,
    bHeight = b * scale,
    totalWidth = xWidth + aWidth,
    totalHeight = xWidth + bHeight;
  const first = x * x + (a + b) * x + a * b,
    second = (x + a) * (x + b);
  return (
    <section className="factor-area" aria-labelledby="area-title">
      <div className="note-section-heading">
        <h2 id="area-title">先看见：同一块面积，两种表达</h2>
        <span>改变边长，关系仍然成立</span>
      </div>
      <div className="factor-area-layout">
        <div className="factor-area-visual">
          <svg
            viewBox="0 0 430 390"
            role="img"
            aria-label={
              "四块面积为 x 的平方、" +
              a +
              "x、" +
              b +
              "x 和 " +
              a * b +
              "；合成边长 x+" +
              a +
              " 与 x+" +
              b +
              " 的长方形。"
            }
          >
            <g transform={"translate(" + (430 - totalWidth) / 2 + ",48)"}>
              <g className="factor-tile factor-tile-square">
                <rect width={xWidth} height={xWidth} rx="2" />
                <text x={xWidth / 2} y={xWidth / 2}>
                  x²
                </text>
              </g>
              <g
                transform={"translate(" + (xWidth + (joined ? 0 : 15)) + ",0)"}
                className="factor-tile factor-tile-a"
              >
                <rect width={aWidth} height={xWidth} rx="2" />
                <text x={aWidth / 2} y={xWidth / 2}>
                  {a}x
                </text>
              </g>
              <g
                transform={"translate(0," + (xWidth + (joined ? 0 : 15)) + ")"}
                className="factor-tile factor-tile-b"
              >
                <rect width={xWidth} height={bHeight} rx="2" />
                <text x={xWidth / 2} y={bHeight / 2}>
                  {b}x
                </text>
              </g>
              <g
                transform={
                  "translate(" +
                  (xWidth + (joined ? 0 : 15)) +
                  "," +
                  (xWidth + (joined ? 0 : 15)) +
                  ")"
                }
                className="factor-tile factor-tile-unit"
              >
                <rect width={aWidth} height={bHeight} rx="2" />
                <text x={aWidth / 2} y={bHeight / 2}>
                  {a * b}
                </text>
              </g>
              <text className="factor-dimension" x={xWidth / 2} y="-14">
                x = {x}
              </text>
              <text
                className="factor-dimension"
                x={xWidth + aWidth / 2 + (joined ? 0 : 15)}
                y="-14"
              >
                {a}
              </text>
              <text className="factor-dimension" x="-18" y={xWidth / 2}>
                x
              </text>
              <text
                className="factor-dimension"
                x="-18"
                y={xWidth + bHeight / 2 + (joined ? 0 : 15)}
              >
                {b}
              </text>
              <text
                className="factor-total"
                x={totalWidth / 2}
                y={totalHeight + 50}
              >
                总面积始终为 {first}
              </text>
            </g>
          </svg>
          <button
            type="button"
            className="k12-button"
            onClick={() => setJoined((value) => !value)}
          >
            {joined ? "把四块分开看" : "把四块拼成一个整体"}
          </button>
        </div>
        <div className="factor-area-controls">
          <label>
            右边多出的长度 a：<b>{a}</b>
            <input
              aria-label="长度 a"
              type="range"
              min="1"
              max="5"
              step="1"
              value={a}
              onChange={(event) => setA(Number(event.target.value))}
            />
          </label>
          <label>
            下边多出的长度 b：<b>{b}</b>
            <input
              aria-label="长度 b"
              type="range"
              min="1"
              max="5"
              step="1"
              value={b}
              onChange={(event) => setB(Number(event.target.value))}
            />
          </label>
          <label>
            试一个具体 x：<b>{x}</b>
            <input
              aria-label="代入 x"
              type="range"
              min="1"
              max="7"
              step="1"
              value={x}
              onChange={(event) => setX(Number(event.target.value))}
            />
          </label>
          <MathDisplay
            value={
              "x^2+" + (a + b) + "x+" + a * b + "=(x+" + a + ")(x+" + b + ")"
            }
          />
          <p>
            分开算：一块正方形、两个长条和右下角的小长方形。合起来算：长乘宽。
          </p>
          <MathDisplay
            value={
              x + "^2+" + (a + b) + "\\times" + x + "+" + a * b + "=" + first
            }
          />
          <MathDisplay
            value={"(" + x + "+" + a + ")(" + x + "+" + b + ")=" + second}
          />
          <p className="factor-note">
            a、b 表示两段额外长度，x
            是可改变的边长。这个面积图使用正数长度；代数恒等式通过分配律对所有实数
            x 成立。代几个数相等可以检查例子，不能代替一般证明。
          </p>
        </div>
      </div>
      <details className="factor-explanation">
        <summary>把拼图对应到每一步代数</summary>
        <MathDisplay
          value={
            "(x+" +
            a +
            ")(x+" +
            b +
            ")=x^2+" +
            b +
            "x+" +
            a +
            "x+" +
            a * b +
            "=x^2+" +
            (a + b) +
            "x+" +
            a * b
          }
        />
        <p>
          从左到右是整式乘法，从右到左是因式分解。中间项系数来自 a+b，常数项来自
          ab，因此只满足“乘积正确”还不够。
        </p>
      </details>
    </section>
  );
}
function emptyFactorBlanks(): FactorizationBlanks {
  return {
    multiplier: "",
    factors: [
      { coefficient: "", constant: "" },
      { coefficient: "", constant: "" },
    ],
  };
}
export function FactorWorkshop({ locale }: { locale: "zh" | "en" }) {
  const [kind, setKind] = useState<FactorKind>("quadratic"),
    [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);
  const [question, setQuestion] = useState(() =>
    makeFactorQuestion(20260927, "quadratic", 1),
  );
  const [answer, setAnswer] = useState(""),
    [factorBlanks, setFactorBlanks] = useState(emptyFactorBlanks),
    [result, setResult] = useState<CheckResult | null>(null),
    [hints, setHints] = useState(0),
    [showSteps, setShowSteps] = useState(false),
    [share, setShare] = useState(""),
    [solved, setSolved] = useState(false),
    [count, setCount] = useState(0),
    [linkNotice, setLinkNotice] = useState("");
  const prefix = locale === "en" ? "/en" : "";
  const usesFactorBlanks =
    question.kind === "quadratic" || question.kind === "mixed";
  const usesCoefficientBlanks =
    question.kind === "mixed" || question.coefficients[2] !== 1;
  function load(
    seed: number,
    type: FactorKind,
    level: 1 | 2 | 3,
    updateUrl = true,
  ) {
    const q = makeFactorQuestion(seed, type, level);
    setQuestion(q);
    setKind(type);
    setDifficulty(level);
    setAnswer("");
    setFactorBlanks(emptyFactorBlanks());
    setResult(null);
    setHints(0);
    setShowSteps(false);
    setSolved(false);
    setShare("");
    if (updateUrl) history.replaceState(null, "", "#" + questionHash(q));
  }
  useEffect(() => {
    function read() {
      const parsed = parseQuestionLink(location.hash);
      if (parsed) {
        load(parsed.seed, parsed.kind, parsed.difficulty, false);
        setLinkNotice("");
      } else if (location.hash) {
        setLinkNotice("题号链接不完整，当前显示示例题。可以重新生成并分享。");
      }
    }
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  function next(type = kind, level = difficulty) {
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    load(random[0], type, level);
    setLinkNotice("");
  }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const checked = usesFactorBlanks
      ? checkFactorizationBlanks(
          usesCoefficientBlanks
            ? factorBlanks
            : {
                multiplier: "1",
                factors: [
                  {
                    coefficient: "1",
                    constant: factorBlanks.factors[0].constant,
                  },
                  {
                    coefficient: "1",
                    constant: factorBlanks.factors[1].constant,
                  },
                ],
              },
          question.coefficients,
        )
      : checkFactorization(answer, question.coefficients);
    setResult(checked);
    if (checked.status === "correct" && !solved) {
      setCount((value) => value + 1);
      setSolved(true);
    }
  }
  function updateFactorBlank(
    index: number,
    field: "coefficient" | "constant",
    value: string,
  ) {
    setFactorBlanks((current) => {
      const factors: FactorizationBlanks["factors"] = [...current.factors];
      factors[index] = { ...factors[index], [field]: value };
      return { ...current, factors };
    });
    setResult(null);
  }
  async function copyLink() {
    const url = new URL(location.href);
    url.hash = questionHash(question);
    try {
      if (!navigator.clipboard) throw new Error("clipboard");
      await navigator.clipboard.writeText(url.toString());
      setShare("已复制这道题的链接。");
    } catch {
      setShare(url.toString());
    }
  }
  const title = factorKinds.find((item) => item.id === question.kind)!;
  return (
    <div className="factor-workshop">
      <AreaExplorer />
      <section
        className="factor-practice note-article"
        id="practice"
        aria-labelledby="practice-title"
      >
        <div className="note-section-heading">
          <h2 id="practice-title">再自己做一题</h2>
          <span>本次完成 {count} 题</span>
        </div>
        <div className="factor-settings">
          <label>
            题型
            <select
              value={kind}
              onChange={(event) =>
                next(event.target.value as FactorKind, difficulty)
              }
            >
              {factorKinds.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            难度
            <select
              value={difficulty}
              onChange={(event) =>
                next(kind, Number(event.target.value) as 1 | 2 | 3)
              }
            >
              <option value="1">入门 · 小整数</option>
              <option value="2">进阶 · 正负号</option>
              <option value="3">巩固 · 更大系数</option>
            </select>
          </label>
          <button type="button" className="k12-button" onClick={() => next()}>
            换一道同类题
          </button>
        </div>
        <div className="factor-question">
          <span className="notes-overline">
            {title.title} / 在有理系数范围内分解
          </span>
          <MathDisplay value={polynomialText(question.coefficients)} />
          <p>{title.description}</p>
        </div>
        {linkNotice && <p role="status">{linkNotice}</p>}
        <form onSubmit={submit} className="factor-answer">
          {usesFactorBlanks ? (
            <fieldset className="factor-fill-answer">
              <legend>在空格里填数</legend>
              <div className="factor-fill-expression">
                {usesCoefficientBlanks && (
                  <input
                    className="factor-fill-number"
                    aria-label="括号外的公因数"
                    value={factorBlanks.multiplier}
                    onChange={(event) => {
                      setFactorBlanks((current) => ({
                        ...current,
                        multiplier: event.target.value,
                      }));
                      setResult(null);
                    }}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    maxLength={24}
                    aria-describedby="factor-input-help"
                  />
                )}
                {factorBlanks.factors.map((factor, index) => (
                  <span className="factor-fill-term" key={index}>
                    <span aria-hidden="true">(</span>
                    {usesCoefficientBlanks && (
                      <input
                        className="factor-fill-number"
                        aria-label={"第" + (index + 1) + "个因式中 x 的系数"}
                        value={factor.coefficient}
                        onChange={(event) =>
                          updateFactorBlank(
                            index,
                            "coefficient",
                            event.target.value,
                          )
                        }
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        maxLength={24}
                        aria-describedby="factor-input-help"
                      />
                    )}
                    <span aria-hidden="true">x+</span>
                    <input
                      className="factor-fill-number"
                      aria-label={"第" + (index + 1) + "个因式中加上的数"}
                      value={factor.constant}
                      onChange={(event) =>
                        updateFactorBlank(index, "constant", event.target.value)
                      }
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      maxLength={24}
                      aria-describedby="factor-input-help"
                    />
                    <span aria-hidden="true">)</span>
                  </span>
                ))}
              </div>
            </fieldset>
          ) : (
            <label htmlFor="factor-answer">
              写出分解后的式子
              <input
                id="factor-answer"
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setResult(null);
                }}
                placeholder="例如 (x+2)(x+3)"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                maxLength={240}
                aria-describedby="factor-input-help"
              />
            </label>
          )}
          <button type="submit" className="k12-button">
            检查这一步
          </button>
        </form>
        <p id="factor-input-help" className="factor-note">
          {usesFactorBlanks ? (
            <>
              {usesCoefficientBlanks
                ? "括号外填公因数（没有则填 1），x 前填系数；两个因式顺序不限。"
                : "只需填写两个数，顺序不限；"}
              负数可直接填 -2，分数可写 1/2。按 Tab 切换空格，按回车检查。
            </>
          ) : (
            <>
              可省略相邻因式间的乘号；平方可写 ^2 或
              ²。接受因式换序和等价写法。只写结果，不用输入等号；含 x
              的分母不属于本练习的多项式答案。
            </>
          )}
        </p>
        {result && (
          <div
            className={"factor-feedback factor-" + result.status}
            role="status"
          >
            <strong>
              {
                {
                  correct: "这题完成了",
                  incomplete: "关系正确，还能继续",
                  incorrect: "找到一个需要检查的地方",
                  invalid: "先检查书写",
                }[result.status]
              }
            </strong>
            <p>
              <StepText text={result.message} />
            </p>
            {result.expanded && (
              <>
                <span>你的式子展开后：</span>
                <MathDisplay value={factorLatex(result.expanded)} />
              </>
            )}
          </div>
        )}
        <div className="factor-help-actions">
          <button
            type="button"
            className="k12-button"
            disabled={hints >= question.hints.length}
            onClick={() => setHints((value) => value + 1)}
          >
            {hints >= question.hints.length
              ? "提示已全部展开"
              : "给我下一层提示"}
          </button>
          <button
            type="button"
            className="k12-button"
            onClick={() => setShowSteps((value) => !value)}
          >
            {showSteps ? "收起完整解答" : "展开完整解答"}
          </button>
          <button type="button" className="k12-button" onClick={copyLink}>
            分享这道题
          </button>
        </div>
        {hints > 0 && (
          <ol className="factor-hints">
            {question.hints.slice(0, hints).map((hint, index) => (
              <li key={hint}>
                <b>提示 {index + 1}</b>
                <p>
                  <StepText text={hint} />
                </p>
              </li>
            ))}
          </ol>
        )}
        {showSteps && (
          <section className="factor-solution" aria-label="完整解答">
            <MathDisplay value={factorLatex(question.answer)} />
            <ol>
              {question.steps.map((step) => (
                <li key={step}>
                  <StepText text={step} />
                </li>
              ))}
            </ol>
            <p>
              检查：展开后，逐项比较次数与系数。不要把因式分解的结果直接写成方程的解；只有原题另给“式子等于零”时，才继续求
              x。
            </p>
          </section>
        )}
        {share && (
          <p className="factor-share" role="status">
            {share.startsWith("http") ? (
              <>
                <label>
                  浏览器暂不支持自动复制，可手动复制这个链接
                  <input
                    readOnly
                    value={share}
                    onFocus={(event) => event.target.select()}
                  />
                </label>
              </>
            ) : (
              share
            )}
          </p>
        )}
        <div className="factor-question-footer">
          <span>
            题号 {question.seed} · {title.title} · 难度 {question.difficulty}
          </span>
          <Link href={prefix + k12LessonHref(question.lessonId)}>
            回到相关讲义 →
          </Link>
        </div>
      </section>
      <section className="note-article factor-teaching">
        <div className="note-prose">
          <h2>把练习带进课堂，也带回家</h2>
          <p>
            先让学生解释面积与各项的对应，再选择一道同类型练习。答错时先看系数反馈，只在需要时展开下一层提示；答对后换一题，检查是否真正理解。题号链接会保留题型、难度和题目，方便课后回看。
          </p>
          <p>
            本次题数仅记录当前页面中的完成次数，刷新后重新开始。它不是成绩或掌握度评分。出题与判题都在本机浏览器进行。
          </p>
          <h3>常见的三种误解</h3>
          <ul>
            <li>把中间项忘掉：完全平方必须有两倍乘积项。</li>
            <li>只找到两个乘起来合适的数：还要检查它们的和。</li>
            <li>
              把分解与解方程混在一起：改写成乘积不意味着令每个因式等于零。
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
