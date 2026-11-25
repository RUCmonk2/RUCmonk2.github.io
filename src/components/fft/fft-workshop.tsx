"use client";

import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { FftDisk } from "@/components/fft/fft-disk";
import {
  buildLayers,
  butterfly,
  type Complex,
  FFT_EXAMPLE,
  formatComplex,
  formatNumber,
  getOneSidedSpectrum,
  getSamples,
  type Signal,
} from "@/lib/math-lab/fft";

type Preset = "example" | Signal;

const presets = [
  { id: "mix", zh: "混合波", en: "Mixed wave" },
  { id: "tone", zh: "单频波", en: "Single tone" },
  { id: "impulse", zh: "延迟脉冲", en: "Delayed impulse" },
] satisfies { id: Signal; zh: string; en: string }[];

function Vector({
  symbol,
  values,
  english,
}: {
  symbol: string;
  values: string[];
  english: boolean;
}) {
  if (values.length > 8) {
    return (
      <details className="fft-long-vector">
        <summary>
          <var>{symbol}</var> = [{values.slice(0, 4).join(", ")}, …]<sup>T</sup>
          <span>
            {english
              ? `Show all ${values.length}`
              : `展开全部 ${values.length} 项`}
          </span>
        </summary>
        <p>{values.join(", ")}</p>
      </details>
    );
  }
  return (
    <div className="fft-vector">
      <var>{symbol}</var> <span>=</span>
      <span>[</span>
      <span className="fft-vector-entries">{values.join(", ")}</span>
      <span>
        ]<sup>T</sup>
      </span>
    </div>
  );
}

function StateTable({
  english,
  rows,
  size,
  stage,
  stations,
  columns,
}: {
  english: boolean;
  rows: Complex[][];
  size: number;
  stage: number;
  stations: number[];
  columns: number[];
}) {
  const stride = rows.length;
  const terms = rows[0].length;
  const indices = Array.from({ length: terms }, (_, index) => index);
  return (
    <section className="fft-matrix" aria-labelledby="fft-state-title">
      <header>
        <div>
          <h3 id="fft-state-title">
            {english ? "State matrix after this step" : "这一步后的数值矩阵"}
          </h3>
          <p>
            {english
              ? "A row holds the DFT of the samples listed at its left."
              : "每一行是左侧所列采样的 DFT，列按频点下标从 0 排起。"}
          </p>
        </div>
        <code>
          B<sub>{stage}</sub> ∈ ℂ
          <sup>
            {stride}×{terms}
          </sup>
        </code>
      </header>
      <div
        className="fft-table-scroll"
        tabIndex={size > 4 ? 0 : undefined}
        role="region"
        aria-label={english ? "Numerical state matrix" : "数值矩阵"}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">j</th>
              <th scope="col">
                {english ? "Sample indices n" : "原采样下标 n"}
              </th>
              {indices.map((q) => (
                <th key={q} scope="col">
                  {q}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, j) => (
              <tr key={j} data-selected={stations.includes(j)}>
                <th scope="row">{j}</th>
                <td className="fft-source-indices">
                  {indices.map((t) => j + t * stride).join(", ")}
                </td>
                {row.map((value, q) => (
                  <td
                    key={q}
                    data-mark={
                      stations.includes(j) ? columns.indexOf(q) + 1 : 0
                    }
                  >
                    {formatComplex(value, size === 4 ? 6 : 3)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {size > 4 && terms > 4 && (
        <p className="fft-table-hint">
          {english
            ? "Scroll the table to inspect all columns."
            : "横向滑动表格可查看全部列。"}{" "}
        </p>
      )}
    </section>
  );
}

function StemChart({
  english,
  values,
  frequency,
}: {
  english: boolean;
  values: number[];
  frequency: boolean;
}) {
  const max = Math.max(...values.map(Math.abs)) || 1;
  return (
    <figure className="fft-chart" data-frequency={frequency}>
      <figcaption>
        <strong>
          {frequency
            ? english
              ? "One-sided amplitude spectrum"
              : "单边幅度谱"
            : english
              ? "Input samples"
              : "原序列的采样值"}
        </strong>
        <span>{frequency ? "A[k]" : "x[n]"}</span>
      </figcaption>
      <div
        className="fft-stems"
        aria-hidden="true"
        style={{ "--columns": values.length } as CSSProperties}
      >
        {values.map((value, index) => (
          <span key={index} className="fft-stem" data-negative={value < 0}>
            <i
              style={{ "--magnitude": Math.abs(value) / max } as CSSProperties}
            />
          </span>
        ))}
      </div>
      <div className="fft-chart-axis" aria-hidden="true">
        <span>0</span>
        <span>
          {frequency ? "k" : "n"} = {values.length - 1}
        </span>
      </div>
    </figure>
  );
}

function PhasePlane({
  input,
  rotated,
  angle,
  digits,
  english,
}: {
  input: Complex;
  rotated: Complex;
  angle: number;
  digits: number;
  english: boolean;
}) {
  const degrees = formatNumber((angle * 180) / Math.PI, 2);
  return (
    <div className="fft-phase">
      <div className="fft-phase-plane" aria-hidden="true">
        <span className="fft-phase-real">Re</span>
        <span className="fft-phase-imaginary">Im</span>
        {Math.hypot(...input) > 0 &&
          [input, rotated].map(([re, im], index) => (
            <i
              key={index}
              data-rotated={index === 1}
              style={
                {
                  "--phase-angle": `${Math.atan2(-im, re)}rad`,
                } as CSSProperties
              }
            />
          ))}
        <b />
      </div>
      <div>
        <strong>
          {english ? "Rotate b in the complex plane" : "在复平面上旋转 b"}
        </strong>
        <code>
          b = {formatComplex(input, digits)} <span>→</span> Wb ={" "}
          {formatComplex(rotated, digits)}
        </code>
        <small>
          {english
            ? `Angle ${degrees}°. Dashed red b, solid green Wb.`
            : `转角 ${degrees}°。朱砂虚线是 b，墨绿实线是 Wb。`}
        </small>
      </div>
    </div>
  );
}

export function FftWorkshop({ english }: { english: boolean }) {
  const [preset, setPreset] = useState<Preset>("example");
  const locale = english ? "en" : "zh";

  return (
    <section
      className="fft-workbench"
      aria-label={english ? "Interactive FFT notebook" : "FFT 交互算例"}
    >
      <div className="fft-modes">
        <div
          className="fft-choice"
          role="group"
          aria-label={english ? "Choose a transform size" : "选择点数"}
        >
          <button
            type="button"
            aria-pressed={preset === "example"}
            onClick={() => setPreset("example")}
          >
            {english ? "Work out 4 points" : "4 点手算"}
          </button>
          <button
            type="button"
            aria-pressed={preset !== "example"}
            onClick={() => {
              if (preset === "example") setPreset("mix");
            }}
          >
            {english ? "Explore 32 points" : "32 点演示"}
          </button>
        </div>
        {preset !== "example" && (
          <div
            className="fft-choice fft-signals"
            role="group"
            aria-label={english ? "Choose a signal" : "选择输入信号"}
          >
            {presets.map((signal) => (
              <button
                key={signal.id}
                type="button"
                aria-pressed={preset === signal.id}
                onClick={() => setPreset(signal.id)}
              >
                {signal[locale]}
              </button>
            ))}
          </div>
        )}
      </div>
      <FftRun key={preset} preset={preset} english={english} />
    </section>
  );
}

function FftRun({ preset, english }: { preset: Preset; english: boolean }) {
  const example = preset === "example";
  const [samples, setSamples] = useState<number[]>(() =>
    example ? [...FFT_EXAMPLE] : getSamples(preset),
  );
  const [step, setStep] = useState(0);
  const [pair, setPair] = useState(0);
  const [slot, setSlot] = useState(0);
  const [frequency, setFrequency] = useState(1);
  const [replay, setReplay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [editError, setEditError] = useState(false);
  const layers = useMemo(() => buildLayers(samples), [samples]);
  const size = samples.length;
  const folds = layers.length - 1;
  const finish = folds + 1;
  const atInput = step === 0;
  const atOutput = step === finish;
  const isFold = step > 0 && step <= folds;
  const level = Math.max(0, Math.min(step - 1, folds - 1));
  const before = layers[level];
  const half = before.length / 2;
  const m = before[0].length;
  const j = Math.min(pair, half - 1);
  const q = Math.min(slot, m - 1);
  const other = j + half;
  const a = before[j][q];
  const b = before[other][q];
  const result = butterfly(a, b, q, m);
  const digits = example ? 6 : 3;
  const number = (value: number) => formatNumber(value, digits);
  const z = (value: Complex) => formatComplex(value, digits);
  const output = layers[folds][0];
  const amplitudes = getOneSidedSpectrum(output);
  const currentStage = Math.min(step, folds);
  const stateMatrix = (
    <StateTable
      english={english}
      size={size}
      stage={currentStage}
      rows={layers[currentStage]}
      stations={atInput ? [j, other] : atOutput ? [0] : [j]}
      columns={atOutput ? [frequency] : isFold ? [q, q + m] : [0]}
    />
  );

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step === finish) setPlaying(false);
      else setStep(step + 1);
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [finish, playing, step]);

  const nameStep = (index: number) => {
    if (index === 0) return english ? "Input" : "输入";
    if (index === finish) return english ? "Output" : "输出";
    return english ? `Fold ${index}` : `第 ${index} 折`;
  };
  const goTo = (index: number) => {
    setPlaying(false);
    setStep(index);
  };
  const nextLabel = atInput
    ? english
      ? "Start the first fold"
      : "开始第 1 折"
    : step === folds
      ? english
        ? "Read the output"
        : "读取输出"
      : english
        ? "Next fold"
        : "下一折";

  const submitSamples = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const next = FFT_EXAMPLE.map((_, index) =>
      Number(fields.get(`sample-${index}`)),
    );
    const nextOutput = buildLayers(next).at(-1)?.[0] ?? [];
    if (
      !nextOutput.every(
        ([re, im]) => Number.isFinite(re) && Number.isFinite(im),
      )
    ) {
      setEditError(true);
      return;
    }
    setSamples(next);
    setPair(0);
    setSlot(0);
    setEditError(false);
    goTo(0);
  };

  return (
    <>
      <div className="fft-journey">
        <div>
          <span>{english ? "Input samples" : "输入向量"}</span>
          <Vector symbol="x" values={samples.map(number)} english={english} />
        </div>
        <ArrowRight className="fft-vector-arrow" size={19} aria-hidden="true" />
        <div>
          <span>
            {english
              ? atOutput
                ? "FFT output"
                : "Output preview"
              : atOutput
                ? "FFT 输出"
                : "输出预览"}
          </span>
          <Vector symbol="X" values={output.map(z)} english={english} />
        </div>
      </div>
      {example && (
        <details className="fft-edit">
          <summary>
            {english ? "Try your own four numbers" : "换成自己的四个数"}
          </summary>
          <form key={samples.join(",")} onSubmit={submitSamples}>
            {samples.map((value, index) => (
              <label key={index}>
                x[{index}]
                <input
                  type="number"
                  name={`sample-${index}`}
                  defaultValue={value}
                  step="any"
                  required
                />
              </label>
            ))}
            <button type="submit">
              {english ? "Apply input" : "用这个序列"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSamples([...FFT_EXAMPLE]);
                setPair(0);
                setSlot(0);
                setEditError(false);
                goTo(0);
              }}
            >
              {english ? "Restore the example" : "恢复例题"}
            </button>
          </form>
          {editError && (
            <p role="alert">
              {english
                ? "These magnitudes overflow the calculation. Use smaller numbers."
                : "这些数太大，超出了计算范围。换小一些的数再试。"}
            </p>
          )}
        </details>
      )}
      <nav
        className="fft-route"
        aria-label={english ? "Steps of the FFT" : "FFT 实验步骤"}
      >
        <ol>
          {Array.from({ length: finish + 1 }, (_, index) => (
            <li key={index}>
              <button
                type="button"
                aria-current={step === index ? "step" : undefined}
                onClick={() => goTo(index)}
              >
                {nameStep(index)}
              </button>
            </li>
          ))}
        </ol>
        <div className="fft-actions">
          {!example && (
            <button
              type="button"
              className="fft-icon"
              aria-label={
                playing
                  ? english
                    ? "Pause"
                    : "暂停"
                  : english
                    ? "Play"
                    : "播放"
              }
              aria-pressed={playing}
              onClick={() => {
                if (atOutput) setStep(0);
                setPlaying(!playing);
              }}
            >
              {playing ? <Pause size={15} /> : <Play size={15} />}
            </button>
          )}
          {!atInput && (
            <button
              type="button"
              className="fft-icon"
              aria-label={english ? "Previous step" : "上一步"}
              onClick={() => goTo(step - 1)}
            >
              <ArrowLeft size={15} />
            </button>
          )}
          {atOutput ? (
            <button type="button" className="fft-next" onClick={() => goTo(0)}>
              <RotateCcw size={15} />
              {english ? "Start again" : "再走一遍"}
            </button>
          ) : (
            <button
              type="button"
              className="fft-next"
              onClick={() => goTo(step + 1)}
            >
              {nextLabel}
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </nav>
      <div className="fft-workspace">
        <div className="fft-calculation">
          <section
            className="fft-operation"
            aria-live={playing ? "off" : "polite"}
          >
            {atInput && (
              <>
                <h2>
                  {english ? "Put the input in order" : "原序列按下标排进圆盘"}
                </h2>
                <p>
                  {english
                    ? "At the start each station holds one input sample. Each fold pairs stations separated by half the current number of stations."
                    : "起初每个站点放一个采样。每一折都把相隔当前站点数一半的两站配起来。"}
                </p>
                {example ? (
                  <div className="fft-pair-list">
                    <div>
                      <span>{english ? "Even indices" : "偶下标组"}</span>
                      <code>
                        (x[0], x[2]) = ({number(samples[0])},{" "}
                        {number(samples[2])})
                      </code>
                    </div>
                    <div>
                      <span>{english ? "Odd indices" : "奇下标组"}</span>
                      <code>
                        (x[1], x[3]) = ({number(samples[1])},{" "}
                        {number(samples[3])})
                      </code>
                    </div>
                  </div>
                ) : (
                  <p className="fft-math-note">
                    {english
                      ? "In the first fold, station j pairs with j + 16 for j = 0,…,15."
                      : "第一折把 j 和 j + 16 配在一起，j 依次从 0 到 15。奇偶两组在最后一折合并。"}
                  </p>
                )}
              </>
            )}
            {isFold && (
              <>
                <h2>
                  {example && step === 1
                    ? english
                      ? "Transform the even and odd pairs"
                      : "把偶下标、奇下标各算一遍"
                    : example
                      ? english
                        ? "Combine two 2-point transforms"
                        : "把两个 2 点结果合成 4 点"
                      : english
                        ? `Fold ${step}: merge ${m} entries at a time`
                        : `第 ${step} 折：合并两叠各 ${m} 项`}
                </h2>
                <p>
                  {example && step === 1
                    ? english
                      ? "Both pairs are transformed in this fold. Choose either pair to see its sum and difference in detail."
                      : "这一折把两组都算完。点「偶组」或「奇组」，看那一组的和与差是怎么算出来的。"
                    : example
                      ? english
                        ? "q is the column index in both E and O. Choose q = 0 for W = 1, or q = 1 for W = −i. The two cases produce all four outputs."
                        : "q 是偶组 E 与奇组 O 的共同列下标。q = 0 时 W = 1，q = 1 时 W = −i。两种情况合起来给出四个结果。"
                      : english
                        ? `j is the first station, and q is a column in each stack. Take column q from rows j and j + ${half} to get a and b.`
                        : `j 是配对中第一个站点，q 是叠内的列下标。从行 j 和 j + ${half} 各取第 q 项，得到 a、b。`}
                </p>
                <p className="fft-current">
                  {english ? "Old rows " : "旧行 "}
                  <code>
                    {j}, {other}
                  </code>
                  {" → "}
                  {english ? "new row " : "新行 "}
                  <code>{j}</code>
                  {english ? ", following " : "，本次查看列 "}
                  <code>q = {q}</code>
                  {english ? "." : "。"}{" "}
                  {example &&
                    (english
                      ? step === 1
                        ? "Choose the row pair j below."
                        : "Choose the column q below."
                      : step === 1
                        ? "下方选择配对 j。"
                        : "下方选择列 q。")}
                </p>
                {example ? (
                  <div
                    className="fft-choice fft-pair-choice"
                    role="group"
                    aria-label={
                      step === 1
                        ? english
                          ? "Choose input pair"
                          : "选一组奇偶配对"
                        : english
                          ? "Choose the local index"
                          : "选择合并下标 q"
                    }
                  >
                    {[0, 1].map((index) => (
                      <button
                        key={index}
                        type="button"
                        aria-pressed={(step === 1 ? j : q) === index}
                        onClick={() =>
                          step === 1 ? setPair(index) : setSlot(index)
                        }
                      >
                        {step === 1
                          ? index === 0
                            ? english
                              ? "Even j=0 (0, 2)"
                              : "偶组 j=0 (0, 2)"
                            : english
                              ? "Odd j=1 (1, 3)"
                              : "奇组 j=1 (1, 3)"
                          : `q = ${index}`}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="fft-selectors">
                    <label>
                      {english ? "Station pair" : "站点配对"}
                      <select
                        value={j}
                        onChange={(event) =>
                          setPair(Number(event.currentTarget.value))
                        }
                      >
                        {Array.from({ length: half }, (_, index) => (
                          <option key={index} value={index}>
                            {index} ↔ {index + half}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      {english ? "Slot q" : "叠内下标 q"}
                      <select
                        value={q}
                        onChange={(event) =>
                          setSlot(Number(event.currentTarget.value))
                        }
                      >
                        {Array.from({ length: m }, (_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
                <dl className="fft-equations">
                  <div className="fft-eq-plus">
                    <dt>
                      a ={" "}
                      {example ? (
                        step === 1 ? (
                          `x[${j}]`
                        ) : (
                          `E[${q}]`
                        )
                      ) : (
                        <>
                          B<sub>{level}</sub>[{j},{q}]
                        </>
                      )}
                    </dt>
                    <dd>{z(a)}</dd>
                  </div>
                  <div className="fft-eq-minus">
                    <dt>
                      b ={" "}
                      {example ? (
                        step === 1 ? (
                          `x[${other}]`
                        ) : (
                          `O[${q}]`
                        )
                      ) : (
                        <>
                          B<sub>{level}</sub>[{other},{q}]
                        </>
                      )}
                    </dt>
                    <dd>{z(b)}</dd>
                  </div>
                  <div>
                    <dt>
                      W = e
                      <sup>
                        −iπ·{q}/{m}
                      </sup>
                    </dt>
                    <dd>{z(result.twiddle)}</dd>
                  </div>
                  <div>
                    <dt>
                      Wb = ({z(result.twiddle)}) · ({z(b)})
                    </dt>
                    <dd>{z(result.rotated)}</dd>
                  </div>
                  <div className="fft-eq-plus">
                    <dt>
                      {example && step === 2 ? (
                        `X[${q}]`
                      ) : (
                        <>
                          B<sub>{step}</sub>[{j},{q}]
                        </>
                      )}{" "}
                      = a + Wb
                    </dt>
                    <dd>
                      {z(a)} + ({z(result.rotated)}) = <b>{z(result.plus)}</b>
                    </dd>
                  </div>
                  <div className="fft-eq-minus">
                    <dt>
                      {example && step === 2 ? (
                        `X[${q + m}]`
                      ) : (
                        <>
                          B<sub>{step}</sub>[{j},{q + m}]
                        </>
                      )}{" "}
                      = a − Wb
                    </dt>
                    <dd>
                      {z(a)} − ({z(result.rotated)}) = <b>{z(result.minus)}</b>
                    </dd>
                  </div>
                </dl>
                <p className="fft-math-note">
                  {english
                    ? `The two results occupy slots ${q} and ${q + m} in the new row ${j}.`
                    : `两项结果写入矩阵的第 ${j} 行，列下标分别是 ${q} 和 ${q + m}。`}
                </p>
              </>
            )}
            {atOutput && (
              <>
                <h2>
                  {english
                    ? "Read the last row as a vector"
                    : "把最后一行读成输出向量"}
                </h2>
                <p>
                  {english
                    ? `After ${folds} folds, row 0 holds X[0] through X[${size - 1}] in order. The row matrix B${folds} becomes the column vector X by transposition.`
                    : `折完 ${folds} 次，矩阵只剩第 0 行，按自然下标排着 X[0] 到 X[${size - 1}]。把这一行转置，就得到列向量 X。`}
                </p>
                <div className="fft-selectors fft-frequency">
                  <label>
                    {english ? "Frequency index k" : "查看频点 k"}
                    <select
                      value={frequency}
                      onChange={(event) =>
                        setFrequency(Number(event.currentTarget.value))
                      }
                    >
                      {output.map((_, index) => (
                        <option key={index} value={index}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <dl className="fft-equations">
                  <div>
                    <dt>X[{frequency}]</dt>
                    <dd>
                      <b>{z(output[frequency])}</b>
                    </dd>
                  </div>
                  <div>
                    <dt>|X[{frequency}]|</dt>
                    <dd>{number(Math.hypot(...output[frequency]))}</dd>
                  </div>
                </dl>
                <p className="fft-math-note">
                  {english
                    ? "The ring shows |X[k]| for all bins. The one-sided chart divides by N and doubles interior bins for this real-valued input."
                    : "圆盘画全部频点的 |X[k]|。下方是实数输入的单边幅度谱，先除以 N，再把 0 和 N/2 之间的频点乘 2。"}
                </p>
              </>
            )}
          </section>
          {example && stateMatrix}
        </div>
        <figure className="fft-map">
          <header>
            <span>{english ? "Folding disk" : "折叠圆盘"}</span>
            {isFold && (
              <button
                className="fft-replay"
                type="button"
                onClick={() => setReplay((count) => count + 1)}
              >
                <RotateCcw size={13} />
                {english ? "Replay this fold" : "重看这一折"}
              </button>
            )}
          </header>
          {isFold && (
            <div
              className="fft-origin"
              aria-label={
                english ? "Inputs of this butterfly" : "这组蝶形折前取值"
              }
            >
              {[j, other].map((index, side) => (
                <div key={index} data-side={side}>
                  <span>
                    {english ? "Before: station" : "折前站点"}{" "}
                    <code>j = {index}</code>
                  </span>
                  <strong>
                    {side === 0 ? "a" : "b"} = {z(before[index][q])}
                  </strong>
                  {example && (
                    <small>
                      {english ? "Full row" : "整行"} [
                      {before[index].map(z).join(", ")}]
                    </small>
                  )}
                </div>
              ))}
            </div>
          )}
          <FftDisk
            layers={layers}
            step={step}
            pair={j}
            bin={atOutput ? frequency : q}
            replay={replay}
            label={
              atOutput
                ? english
                  ? `Spectrum at k = ${frequency}`
                  : `频谱，选中频点 ${frequency}`
                : english
                  ? `FFT disk, stations ${j} and ${other}`
                  : `FFT 圆盘，站点 ${j} 和 ${other}`
            }
          />
          {isFold && m > 1 && (
            <PhasePlane
              input={b}
              rotated={result.rotated}
              angle={result.angle}
              digits={digits}
              english={english}
            />
          )}
          <figcaption>
            {atOutput
              ? english
                ? "Radial line length is the DFT magnitude."
                : "径向线长度代表 DFT 幅值。"
              : english
                ? "Green marks a and the sum. Red marks b and the difference. The center reads stations × entries per station."
                : "墨绿标 a 和加法结果，朱砂标 b 和减法结果。圆心读作「站点数 × 每站项数」。"}
          </figcaption>
        </figure>
      </div>
      {!example && stateMatrix}
      {isFold && (
        <div className="fft-step-footer">
          <button
            type="button"
            className="fft-next"
            onClick={() => goTo(step + 1)}
          >
            {nextLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      )}
      <StemChart
        english={english}
        values={atOutput ? amplitudes : samples}
        frequency={atOutput}
      />
      <p className="fft-precision">
        {english
          ? `Decimal entries are rounded to ${digits} places. In the 4-point example, very small nonzero values use scientific notation.`
          : `小数保留至多 ${digits} 位。4 点算例中的非零微小值用科学计数法显示。`}
      </p>
    </>
  );
}
