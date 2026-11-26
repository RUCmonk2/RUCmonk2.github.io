"use client";

import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FftDisk } from "@/components/fft/fft-disk";
import { FftGuided } from "@/components/fft/fft-guided";
import {
  buildLayers,
  butterfly,
  type Complex,
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

function StateTable({
  english,
  rows,
  stage,
  stations,
  columns,
}: {
  english: boolean;
  rows: Complex[][];
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
        tabIndex={0}
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
                    {formatComplex(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {terms > 4 && (
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
  const modes = useRef<HTMLDivElement>(null);
  const moveAfterModeChange = useRef(false);
  const guided = preset === "example";

  useEffect(() => {
    if (!moveAfterModeChange.current || !modes.current) return;
    moveAfterModeChange.current = false;
    const bar = modes.current;
    const bounds = bar.getBoundingClientRect();
    if (bounds.top < 89 || bounds.bottom > window.innerHeight)
      bar.scrollIntoView({ block: "start" });
    bar
      .querySelector<HTMLButtonElement>(".fft-choice button[aria-pressed=true]")
      ?.focus({ preventScroll: true });
  }, [guided]);

  const changeMode = (to: Preset) => {
    if ((to === "example") === guided) return;
    moveAfterModeChange.current = true;
    setPreset(to);
  };

  return (
    <section
      className="fft-workbench"
      aria-label={english ? "Interactive FFT notebook" : "FFT 交互算例"}
    >
      <div className="fft-modes" ref={modes}>
        <div
          className="fft-choice"
          role="group"
          aria-label={english ? "Choose a transform size" : "选择点数"}
        >
          <button
            type="button"
            aria-pressed={preset === "example"}
            onClick={() => changeMode("example")}
          >
            {english ? "4-point walkthrough" : "4 点跟算"}
          </button>
          <button
            type="button"
            aria-pressed={preset !== "example"}
            onClick={() => changeMode("mix")}
          >
            {english ? "32-point disk" : "32 点圆盘"}
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
      {preset === "example" ? (
        <FftGuided english={english} onDisk={() => changeMode("mix")} />
      ) : (
        <FftRun key={preset} preset={preset} english={english} />
      )}
    </section>
  );
}

function FftRun({ preset, english }: { preset: Signal; english: boolean }) {
  const [step, setStep] = useState(0);
  const [pair, setPair] = useState(0);
  const [slot, setSlot] = useState(0);
  const [frequency, setFrequency] = useState(1);
  const [replay, setReplay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const samples = useMemo(() => getSamples(preset), [preset]);
  const layers = useMemo(() => buildLayers(samples), [samples]);
  const folds = layers.length - 1,
    finish = folds + 1;
  const atInput = step === 0,
    atOutput = step === finish;
  const level = Math.max(0, Math.min(step - 1, folds - 1));
  const before = layers[level],
    terms = before[0].length,
    half = before.length / 2;
  const j = Math.min(pair, half - 1),
    q = Math.min(slot, terms - 1),
    other = j + half;
  const a = before[j][q],
    b = before[other][q];
  const result = butterfly(a, b, q, terms);
  const output = layers[folds][0];
  const current = Math.min(step, folds);

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
  return (
    <>
      <div className="fft-journey">
        <div>
          <span>{english ? "Input samples" : "输入向量"}</span>
          <Vector
            symbol="x"
            values={samples.map((n) => formatNumber(n))}
            english={english}
          />
        </div>
        <ArrowRight className="fft-vector-arrow" size={19} aria-hidden="true" />
        <div>
          <span>{english ? "FFT output" : "FFT 输出"}</span>
          <Vector
            symbol="X"
            values={output.map((x) => formatComplex(x))}
            english={english}
          />
        </div>
      </div>
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
          <button
            type="button"
            className="fft-icon"
            aria-label={
              playing ? (english ? "Pause" : "暂停") : english ? "Play" : "播放"
            }
            aria-pressed={playing}
            onClick={() => {
              if (atOutput) setStep(0);
              setPlaying(!playing);
            }}
          >
            {playing ? (
              <Pause size={15} aria-hidden="true" />
            ) : (
              <Play size={15} aria-hidden="true" />
            )}
          </button>
          {!atInput && (
            <button
              type="button"
              className="fft-icon"
              aria-label={english ? "Previous step" : "上一步"}
              onClick={() => goTo(step - 1)}
            >
              <ArrowLeft size={15} aria-hidden="true" />
            </button>
          )}
          {atOutput ? (
            <button type="button" className="fft-next" onClick={() => goTo(0)}>
              <RotateCcw size={15} aria-hidden="true" />
              {english ? "Start again" : "再走一遍"}
            </button>
          ) : (
            <button
              type="button"
              className="fft-next"
              onClick={() => goTo(step + 1)}
            >
              {nextLabel}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          )}
        </div>
      </nav>
      <div className="fft-workspace">
        <section
          className="fft-operation"
          aria-live={playing ? "off" : "polite"}
        >
          {atInput ? (
            <>
              <h2>
                {english
                  ? "Place one sample at each station"
                  : "每个站点放一个采样"}
              </h2>
              <p>
                {english
                  ? "The first fold pairs j with j + 16. Each subsequent fold halves the number of stations and doubles the number of entries per station."
                  : "第一折把 j 和 j + 16 配在一起。以后每一折，站点数减半，每站存放的项数翻倍。"}
              </p>
            </>
          ) : atOutput ? (
            <>
              <h2>
                {english
                  ? "Read the last row as a vector"
                  : "把最后一行读成频谱向量"}
              </h2>
              <p>
                {english
                  ? "Row 0 contains X[0] through X[31] in natural order. Its transpose is the column vector X."
                  : "第 0 行按自然顺序排着 X[0] 到 X[31]。把这一行转置，就得到列向量 X。"}
              </p>
              <div className="fft-selectors fft-frequency">
                <label>
                  {english ? "Frequency index k" : "查看频点 k"}
                  <select
                    value={frequency}
                    onChange={(e) =>
                      setFrequency(Number(e.currentTarget.value))
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
                  <dd>{formatComplex(output[frequency])}</dd>
                </div>
                <div>
                  <dt>|X[{frequency}]|</dt>
                  <dd>{formatNumber(Math.hypot(...output[frequency]))}</dd>
                </div>
              </dl>
              <p className="fft-math-note">
                {english
                  ? "The disk shows |X[k]|. The one-sided chart divides by 32 and doubles the interior positive-frequency bins."
                  : "圆盘显示 |X[k]|。下方单边幅度谱先除以 32，再把 0 和 16 之间的频点乘 2。"}
              </p>
            </>
          ) : (
            <>
              <h2>
                {english
                  ? `Fold ${step}: merge stacks of ${terms} entries`
                  : `第 ${step} 折 · 合并两叠各 ${terms} 项`}
              </h2>
              <p>
                {english
                  ? "j chooses the row pair. q is the column in those rows."
                  : "j 选两行，q 选这两行中的同一列。"}
              </p>
              <p className="fft-current">
                {english ? "Old rows" : "旧行"} {j}, {other} →{" "}
                {english ? "new row" : "新行"} {j} · q = {q}
              </p>
              <div className="fft-selectors">
                <label>
                  {english ? "Station pair" : "站点配对"}
                  <select
                    value={j}
                    onChange={(e) => setPair(Number(e.currentTarget.value))}
                  >
                    {Array.from({ length: half }, (_, i) => (
                      <option key={i} value={i}>
                        {i} ↔ {i + half}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {english ? "Column q" : "列下标 q"}
                  <select
                    value={q}
                    onChange={(e) => setSlot(Number(e.currentTarget.value))}
                  >
                    {Array.from({ length: terms }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <dl className="fft-equations">
                <div className="fft-eq-plus">
                  <dt>
                    a = B<sub>{level}</sub>[{j},{q}]
                  </dt>
                  <dd>{formatComplex(a)}</dd>
                </div>
                <div className="fft-eq-minus">
                  <dt>
                    b = B<sub>{level}</sub>[{other},{q}]
                  </dt>
                  <dd>{formatComplex(b)}</dd>
                </div>
                <div>
                  <dt>
                    W = e
                    <sup>
                      −iπ·{q}/{terms}
                    </sup>
                  </dt>
                  <dd>{formatComplex(result.twiddle)}</dd>
                </div>
                <div>
                  <dt>Wb</dt>
                  <dd>
                    ({formatComplex(result.twiddle)}) · ({formatComplex(b)}) ={" "}
                    {formatComplex(result.rotated)}
                  </dd>
                </div>
                <div className="fft-eq-plus">
                  <dt>
                    B<sub>{step}</sub>[{j},{q}] = a + Wb
                  </dt>
                  <dd>{formatComplex(result.plus)}</dd>
                </div>
                <div className="fft-eq-minus">
                  <dt>
                    B<sub>{step}</sub>[{j},{q + terms}] = a − Wb
                  </dt>
                  <dd>{formatComplex(result.minus)}</dd>
                </div>
              </dl>
            </>
          )}
        </section>
        <figure className="fft-map">
          <header>
            <span>{english ? "Folding disk" : "折叠圆盘"}</span>
            {!atInput && !atOutput && (
              <button
                type="button"
                className="fft-replay"
                onClick={() => setReplay((n) => n + 1)}
              >
                <RotateCcw size={13} aria-hidden="true" />
                {english ? "Replay this fold" : "重看这一折"}
              </button>
            )}
          </header>
          {!atInput && !atOutput && (
            <div className="fft-origin">
              <div data-side={0}>
                <span>
                  {english ? "Before: station" : "折前站点"} j = {j}
                </span>
                <strong>a = {formatComplex(a)}</strong>
              </div>
              <div data-side={1}>
                <span>
                  {english ? "Before: station" : "折前站点"} j = {other}
                </span>
                <strong>b = {formatComplex(b)}</strong>
              </div>
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
                  ? `Pair stations ${j} and ${other}`
                  : `配对站点 ${j} 和 ${other}`
            }
          />
          {!atInput && !atOutput && terms > 1 && (
            <PhasePlane
              input={b}
              rotated={result.rotated}
              angle={result.angle}
              digits={3}
              english={english}
            />
          )}
          <figcaption>
            {atOutput
              ? english
                ? "Line length is |X[k]|."
                : "径向线长度是 |X[k]|。"
              : english
                ? "The center reads stations × entries per station."
                : "圆心读作「站点数 × 每站项数」。"}
          </figcaption>
        </figure>
      </div>
      <StateTable
        english={english}
        rows={layers[current]}
        stage={current}
        stations={atInput ? [j, other] : atOutput ? [0] : [j]}
        columns={atOutput ? [frequency] : atInput ? [0] : [q, q + terms]}
      />
      {!atInput && !atOutput && (
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
        values={atOutput ? getOneSidedSpectrum(output) : samples}
        frequency={atOutput}
      />
      <p className="fft-precision">
        {english
          ? "Decimal entries are rounded to three places."
          : "数值最多显示三位小数。"}
      </p>
    </>
  );
}
