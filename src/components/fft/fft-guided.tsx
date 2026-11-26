"use client";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  buildLayers,
  butterfly,
  type Complex,
  FFT_EXAMPLE,
  formatComplex,
} from "@/lib/math-lab/fft";

type Scene = 0 | 1 | 2 | 3 | 4;

const z = (value: Complex) => formatComplex(value, 6).replace(/^-/, "−");
const real = (value: number) => z([value, 0]);
const signed = (value: Complex) =>
  value[0] < 0 || value[1] !== 0 ? `(${z(value)})` : z(value);

function Pairing({
  samples,
  english,
}: {
  samples: readonly number[];
  english: boolean;
}) {
  const label = english
    ? `Opposite pairs: x[0] = ${real(samples[0])} with x[2] = ${real(samples[2])}; x[1] = ${real(samples[1])} with x[3] = ${real(samples[3])}.`
    : `相对配对。x[0] = ${real(samples[0])} 配 x[2] = ${real(samples[2])}，x[1] = ${real(samples[1])} 配 x[3] = ${real(samples[3])}。`;
  return (
    <figure className="fft-pairing">
      <div className="fft-pairing-disk" role="img" aria-label={label}>
        <div className="fft-pairing-ring" aria-hidden="true" />
        <div className="fft-pairing-chord" aria-hidden="true" />
        <div
          className="fft-pairing-chord fft-pairing-chord-odd"
          aria-hidden="true"
        />
        {samples.map((value, index) => (
          <div
            key={index}
            className="fft-pairing-node"
            data-position={index}
            data-odd={index % 2 === 1}
            aria-hidden="true"
          >
            <span>x[{index}]</span>
            <b>{real(value)}</b>
          </div>
        ))}
      </div>
      <figcaption className="fft-pairing-key">
        <span>{english ? "Even · x[0] with x[2]" : "偶组 · x[0] 与 x[2]"}</span>
        <span>{english ? "Odd · x[1] with x[3]" : "奇组 · x[1] 与 x[3]"}</span>
      </figcaption>
    </figure>
  );
}

function PairArithmetic({
  samples,
  rows,
  english,
}: {
  samples: readonly number[];
  rows: Complex[][];
  english: boolean;
}) {
  return (
    <div className="fft-guide-halves">
      {rows.map((row, group) => {
        const symbol = group === 0 ? "E" : "O";
        const left: Complex = [samples[group], 0];
        const right: Complex = [samples[group + 2], 0];
        return (
          <section
            className="fft-guide-card"
            data-odd={group === 1}
            key={symbol}
          >
            <h3>
              {group === 0
                ? english
                  ? "Even pair"
                  : "偶组"
                : english
                  ? "Odd pair"
                  : "奇组"}{" "}
              <var>{symbol}</var>
            </h3>
            <p className="fft-guide-operand">
              x[{group}] = {z(left)} <span>·</span> x[{group + 2}] = {z(right)}
            </p>
            <dl className="fft-guide-formulas">
              <div>
                <dt>{symbol}[0]</dt>
                <dd>
                  = {z(left)} + {signed(right)} = <strong>{z(row[0])}</strong>
                </dd>
              </div>
              <div>
                <dt>{symbol}[1]</dt>
                <dd>
                  = {z(left)} − {signed(right)} = <strong>{z(row[1])}</strong>
                </dd>
              </div>
            </dl>
          </section>
        );
      })}
    </div>
  );
}

function Intermediate({
  rows,
  english,
}: {
  rows: Complex[][];
  english: boolean;
}) {
  return (
    <div className="fft-guide-intermediate">
      <div>
        <strong>
          {english ? "After the first fold" : "第一折的 2×2 矩阵"}
        </strong>
        <p>
          {english
            ? "The rows are even E and odd O. The next fold takes two entries from the same column."
            : "每行一组，偶组 E 在上，奇组 O 在下。第二折每次取同一列的两个数。"}
        </p>
      </div>
      <table aria-label={english ? "First-fold matrix B1" : "第一折矩阵 B1"}>
        <thead>
          <tr>
            <th scope="col">B₁</th>
            <th scope="col">q = 0</th>
            <th scope="col">q = 1</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th scope="row">{index === 0 ? "E" : "O"}</th>
              {row.map((value, q) => (
                <td key={q}>{z(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RowsSummary({
  rows,
  english,
}: {
  rows: Complex[][];
  english: boolean;
}) {
  return (
    <details className="fft-guide-rows">
      <summary>
        <span>E = [{rows[0].map(z).join(", ")}]</span>
        <span>O = [{rows[1].map(z).join(", ")}]</span>
        <small>{english ? "Show B₁" : "展开 B₁"}</small>
      </summary>
      <Intermediate rows={rows} english={english} />
    </details>
  );
}

function QuarterTurn({
  b,
  result,
  turned,
  english,
}: {
  b: Complex;
  result: Complex;
  turned: boolean;
  english: boolean;
}) {
  const origin = b[0] < 0 ? -180 : 0;
  return (
    <div className="fft-guide-turn" tabIndex={-1}>
      <div
        className="fft-guide-plane"
        data-zero={b[0] === 0}
        data-turned={turned}
        aria-hidden="true"
      >
        <span className="fft-phase-real">Re</span>
        <span className="fft-phase-imaginary">Im</span>
        {b[0] !== 0 && z(b).length <= 4 && (
          <span className="fft-guide-origin-mark" data-negative={b[0] < 0}>
            {z(b)}
          </span>
        )}
        {turned && b[0] !== 0 && z(result).length <= 4 && (
          <span className="fft-guide-result-mark" data-upper={result[1] > 0}>
            {z(result)}
          </span>
        )}
        {turned && b[0] !== 0 && (
          <span
            className="fft-guide-arc"
            style={{ rotate: b[0] < 0 ? "270deg" : "90deg" }}
          />
        )}
        {b[0] !== 0 && (
          <i className="fft-guide-ghost" style={{ rotate: `${origin}deg` }} />
        )}
        {b[0] !== 0 && (
          <i
            className="fft-guide-pointer"
            style={{ rotate: `${origin + (turned ? 90 : 0)}deg` }}
          />
        )}
        <b />
      </div>
      <div>
        <strong>
          {english
            ? "Multiplying by −i turns 90° clockwise"
            : "乘 −i，顺时针转 90°"}
        </strong>
        <code>
          {turned ? `(−i) × ${signed(b)} = ${z(result)}` : `O[1] = ${z(b)}`}
        </code>
        {b[0] === 0 && (
          <small>
            {english ? "Zero stays at the origin." : "零留在原点。"}
          </small>
        )}
      </div>
    </div>
  );
}

function Combine({
  rows,
  turned,
  english,
}: {
  rows: Complex[][];
  turned: boolean;
  english: boolean;
}) {
  const zero = butterfly(rows[0][0], rows[1][0], 0, 2);
  const one = butterfly(rows[0][1], rows[1][1], 1, 2);
  return (
    <div className="fft-guide-halves">
      <section className="fft-guide-card">
        <h3>
          {english ? "Take column q = 0" : "取第 0 列"} <var>W = 1</var>
        </h3>
        <p className="fft-guide-operand">
          E[0] = {z(rows[0][0])} <span>·</span> O[0] = {z(rows[1][0])}
        </p>
        <dl className="fft-guide-formulas">
          <div>
            <dt>X[0]</dt>
            <dd>
              = {z(rows[0][0])} + {signed(zero.rotated)}
            </dd>
          </div>
          <div>
            <dt>X[2]</dt>
            <dd>
              = {z(rows[0][0])} − {signed(zero.rotated)}
            </dd>
          </div>
        </dl>
      </section>
      <section className="fft-guide-card" data-odd="true">
        <h3>
          {english ? "Take column q = 1" : "取第 1 列"} <var>W = −i</var>
        </h3>
        <p className="fft-guide-operand">
          E[1] = {z(rows[0][1])} <span>·</span> O[1] = {z(rows[1][1])}
        </p>
        <p className="fft-guide-factor">
          W(1) = e<sup>−iπ/2</sup> = −i
        </p>
        <QuarterTurn
          b={rows[1][1]}
          result={one.rotated}
          turned={turned}
          english={english}
        />
        <dl className="fft-guide-formulas">
          <div>
            <dt>X[1]</dt>
            <dd>
              = {z(rows[0][1])} +{" "}
              {turned ? signed(one.rotated) : `(−i) · ${signed(rows[1][1])}`}
            </dd>
          </div>
          <div>
            <dt>X[3]</dt>
            <dd>
              = {z(rows[0][1])} −{" "}
              {turned ? signed(one.rotated) : `(−i) · ${signed(rows[1][1])}`}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function Output({
  output,
  rows,
  english,
}: {
  output: Complex[];
  rows: Complex[][];
  english: boolean;
}) {
  const max = Math.max(...output.map((value) => Math.hypot(...value))) || 1;
  return (
    <div className="fft-guide-out">
      <p className="fft-guide-rule">
        {english
          ? "Put the four results in order k = 0, 1, 2, 3 to get the output column X."
          : "把四项按频点编号 k = 0、1、2、3 排成一列，就得到 X。"}
      </p>
      <p className="fft-guide-vector">
        <var>X</var> = [{output.map(z).join(", ")}]<sup>T</sup>
      </p>
      <div className="fft-guide-bins">
        {output.map((value, index) => {
          const q = index % 2;
          const result = butterfly(rows[0][q], rows[1][q], q, 2);
          const magnitude = Math.hypot(...value);
          const rounded = Number(magnitude.toFixed(2));
          const displayMagnitude =
            magnitude === rounded
              ? real(magnitude)
              : `≈ ${rounded === 0 ? magnitude.toExponential(2) : rounded}`;
          return (
            <div key={index} data-odd={q === 1}>
              <span>X[{index}]</span>
              <strong>{z(value)}</strong>
              <small>
                {z(rows[0][q])} {index < 2 ? "+" : "−"} {signed(result.rotated)}
              </small>
              <div className="fft-guide-magnitude" aria-hidden="true">
                <i style={{ width: `${(100 * magnitude) / max}%` }} />
              </div>
              <small>
                {english ? "Magnitude" : "幅值"} · {displayMagnitude}
              </small>
            </div>
          );
        })}
      </div>
      <p className="fft-guide-note">
        {english
          ? "The bars show |X[k]|. The output itself retains signs and phases, including the imaginary parts above."
          : "细条表示 |X[k]|。FFT 输出是上面的完整复数，保留正负号与相位。"}
      </p>
    </div>
  );
}

export function FftGuided({
  english,
  onDisk,
}: {
  english: boolean;
  onDisk: () => void;
}) {
  const [samples, setSamples] = useState<readonly number[]>(FFT_EXAMPLE);
  const [scene, setScene] = useState<Scene>(0);
  const [error, setError] = useState(false);
  const focusAfterChange = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const layers = useMemo(() => buildLayers(samples), [samples]);
  const second = layers[1],
    output = layers[2][0];
  const section = scene >= 3 ? scene - 1 : scene;
  const route = english
    ? ["Pair", "First fold", "Second fold", "Output"]
    : ["配对", "第一折", "第二折", "输出"];
  const titles = english
    ? [
        "Pair the opposite entries on the disk",
        "First fold · Work out the two pairs",
        "Second fold · Combine the same column",
        "Second fold · Put the rotated term back",
        "Read X in frequency order",
      ]
    : [
        "把圆盘上相对的两项配起来",
        "第一折 · 两组各算和与差",
        "第二折 · 取两行的同一列",
        "第二折 · 用旋转后的数合并",
        "按频点顺序读出 X",
      ];
  const next = english
    ? [
        "Compute the first fold",
        "Use the first-fold matrix",
        "Turn O[1] clockwise",
        "Write the four frequency bins",
      ]
    : [
        "算出第一折",
        "用这张矩阵做第二折",
        "把 O[1] 顺时针转 90°",
        "算出并写入四个频点",
      ];

  useEffect(() => {
    if (!focusAfterChange.current || !heading.current) return;
    focusAfterChange.current = false;
    const target =
      scene === 3
        ? (heading.current.parentElement?.querySelector<HTMLDivElement>(
            ".fft-guide-turn",
          ) ?? heading.current)
        : heading.current;
    target.focus({ preventScroll: true });
    const box = target.getBoundingClientRect();
    if (box.top < 89 || box.bottom > window.innerHeight - 120) {
      target.scrollIntoView({ block: scene === 3 ? "center" : "start" });
    }
  }, [scene]);

  const go = (phase: Scene) => {
    focusAfterChange.current = true;
    setScene(phase);
  };

  function updateInput(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = samples.map((_, index) => Number(form.get(`x-${index}`)));
    if (
      !buildLayers(values)
        .at(-1)![0]
        .every((pair) => pair.every(Number.isFinite))
    ) {
      setError(true);
      return;
    }
    setError(false);
    setSamples(values);
  }

  return (
    <div className="fft-guided">
      <ol
        className="fft-guide-route"
        aria-label={english ? "Calculation progress" : "计算进度"}
      >
        {route.map((label, index) => (
          <li
            key={label}
            aria-current={section === index ? "step" : undefined}
            data-done={index < section}
          >
            {label}
          </li>
        ))}
      </ol>
      <div className="fft-guide-page">
        <h2 ref={heading} tabIndex={-1} className="fft-guide-heading">
          {titles[scene]}
        </h2>
        {scene === 0 && (
          <>
            <div className="fft-guide-start">
              <div className="fft-guide-start-copy">
                <p className="fft-guide-vector">
                  <var>x</var> = [{samples.map(real).join(", ")}]<sup>T</sup>
                </p>
                <p>
                  {english
                    ? "Opposite entries form a pair. The first fold finds their sum and difference."
                    : "圆上相对的两项进同一组，第一折分别算两组的和与差。"}
                </p>
                <details className="fft-guide-edit">
                  <summary>
                    {english ? "Use another sequence" : "换一组数"}
                  </summary>
                  <form key={samples.join(",")} onSubmit={updateInput}>
                    {samples.map((value, index) => (
                      <label key={index}>
                        x[{index}]
                        <input
                          type="number"
                          name={`x-${index}`}
                          defaultValue={value}
                          step="any"
                          required
                        />
                      </label>
                    ))}
                    <button type="submit">
                      {english ? "Apply" : "用这组数"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSamples([...FFT_EXAMPLE]);
                        setError(false);
                      }}
                    >
                      {english ? "Restore example" : "恢复例题"}
                    </button>
                  </form>
                  {error && (
                    <p role="alert">
                      {english
                        ? "The calculation overflows. Try smaller numbers."
                        : "这些数让计算溢出了，换小一些的数再试。"}
                    </p>
                  )}
                </details>
              </div>
              <Pairing samples={samples} english={english} />
            </div>
          </>
        )}
        {scene === 1 && (
          <>
            <p className="fft-guide-rule">
              {english
                ? "Each pair is a two-point DFT. Its first entry is the sum and its second entry is the difference."
                : "两组各做一次 2 点 DFT。每组第 0 项是和，第 1 项是差。"}
            </p>
            <PairArithmetic samples={samples} rows={second} english={english} />
            <Intermediate rows={second} english={english} />
          </>
        )}
        {(scene === 2 || scene === 3) && (
          <>
            <RowsSummary rows={second} english={english} />
            <p className="fft-guide-rule">
              {english
                ? "The two-point results now combine into a four-point DFT. The column determines the factor "
                : "现在合成 4 点 DFT。列下标决定旋转因子 "}
              <code>
                W(q) = e<sup>−2πiq/4</sup>
              </code>
              {english ? "." : "。"}
            </p>
            <Combine rows={second} turned={scene === 3} english={english} />
            <div className="fft-guide-combine-rule">
              <code>X[q] = E[q] + W(q)·O[q]</code>
              <code>X[q+2] = E[q] − W(q)·O[q]</code>
              <p>
                {english
                  ? "Going two bins farther changes the sign of W. The indices in the final list are the output bins k."
                  : "频点下标加 2 时，旋转因子变号，所以第二项用减法。最后按频点编号 k 排序。"}
              </p>
            </div>
            <p className="fft-guide-note">
              {english
                ? "Column 0 gives X[0] and X[2]. Column 1 gives X[1] and X[3]."
                : "第 0 列算出 X[0]、X[2]，第 1 列算出 X[1]、X[3]。最后把两列给出的结果按 k 排回去。"}
            </p>
          </>
        )}
        {scene === 4 && (
          <Output output={output} rows={second} english={english} />
        )}
      </div>
      <div className="fft-guide-actions">
        {scene > 0 && scene < 4 && (
          <button
            type="button"
            className="fft-guide-back"
            onClick={() => go((scene - 1) as Scene)}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {english ? "Back" : "上一步"}
          </button>
        )}
        {scene < 4 ? (
          <button
            type="button"
            className="fft-next"
            onClick={() => go((scene + 1) as Scene)}
          >
            {next[scene]}
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        ) : (
          <>
            <a href="#derivation">
              {english ? "Derivation and matrices" : "看完整推导与矩阵"}
            </a>
            <button
              type="button"
              className="fft-guide-back"
              onClick={() => go(0)}
            >
              <RotateCcw size={15} aria-hidden="true" />
              {english ? "Back to pairing" : "回到配对"}
            </button>
            <button type="button" className="fft-next" onClick={onDisk}>
              {english ? "Explore 32 points" : "看 32 点圆盘"}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
