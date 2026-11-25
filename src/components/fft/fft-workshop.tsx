"use client";

import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";

import { FftDisk } from "@/components/fft/fft-disk";
import {
  buildLayers,
  butterfly,
  FFT_FOLDS,
  FFT_SIZE,
  formatComplex,
  formatNumber,
  getOneSidedSpectrum,
  getSamples,
  type Signal,
} from "@/lib/math-lab/fft";

const lastStep = FFT_FOLDS + 1;
const steps = Array.from({ length: lastStep + 1 }, (_, index) => index);

const presets = [
  { id: "mix", zh: "混合波", en: "Mixed wave" },
  { id: "tone", zh: "单频波", en: "Single tone" },
  { id: "impulse", zh: "延迟脉冲", en: "Delayed impulse" },
] satisfies { id: Signal; zh: string; en: string }[];

function Range({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="fft-range">
      <span>{label}</span>
      <output>{value}</output>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        disabled={max === 0}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function StemChart({
  english,
  values,
  frequency,
  active,
}: {
  english: boolean;
  values: number[];
  frequency: boolean;
  active: number;
}) {
  const max = Math.max(...values.map(Math.abs), 0.001);
  const axis = frequency ? "k" : "n";
  const title = frequency
    ? english
      ? "One-sided amplitude spectrum"
      : "单边幅度谱"
    : english
      ? "Time-domain samples"
      : "时域采样";

  return (
    <figure className="fft-chart" data-frequency={frequency}>
      <figcaption>
        <strong>{title}</strong>
        <span>{frequency ? "A[k]" : "x[n]"}</span>
      </figcaption>
      <div
        className="fft-stems"
        aria-hidden="true"
        style={{ "--columns": values.length } as CSSProperties}
      >
        {values.map((value, index) => (
          <span
            key={index}
            className="fft-stem"
            data-negative={value < 0}
            data-active={index === active}
          >
            <i
              style={{ "--magnitude": Math.abs(value) / max } as CSSProperties}
            />
          </span>
        ))}
      </div>
      <div className="fft-chart-axis" aria-hidden="true">
        <span>0</span>
        <span>
          {axis} = {values.length - 1}
        </span>
      </div>
      <p className="fft-sr-only">
        {english
          ? `Selected ${axis} = ${active}. Value ${formatNumber(values[active])}.`
          : `选中 ${axis} = ${active}，数值为 ${formatNumber(values[active])}。`}
      </p>
    </figure>
  );
}

export function FftWorkshop({ english }: { english: boolean }) {
  const locale = english ? "en" : "zh";
  const [signal, setSignal] = useState<Signal>("mix");
  const [step, setStep] = useState(0);
  const [pair, setPair] = useState(0);
  const [bin, setBin] = useState(1);
  const [sample, setSample] = useState(0);
  const [spectralBin, setSpectralBin] = useState(5);
  const [playing, setPlaying] = useState(false);
  const samples = useMemo(() => getSamples(signal), [signal]);
  const layers = useMemo(() => buildLayers(samples), [samples]);
  const transform = layers[FFT_FOLDS][0];
  const amplitudes = getOneSidedSpectrum(transform);
  const atSpectrum = step === lastStep;
  const atInput = step === 0;
  const level = Math.max(0, Math.min(FFT_FOLDS - 1, step - 1));
  const stations = layers[level].length;
  const terms = layers[level][0].length;
  const j = Math.min(pair, stations / 2 - 1);
  const q = Math.min(bin, terms - 1);
  const partner = j + stations / 2;
  const a = layers[level][j][q];
  const b = layers[level][partner][q];
  const result = butterfly(a, b, q, terms);
  const activePair = atInput ? sample % (FFT_SIZE / 2) : j;
  const diskLabel = atSpectrum
    ? english
      ? `Circular frequency spectrum, selected frequency ${spectralBin}`
      : `圆形频谱，当前选中频点 ${spectralBin}`
    : english
      ? `FFT disk, stations ${activePair} and ${activePair + stations / 2} highlighted`
      : `FFT 圆盘，高亮站点 ${activePair} 和 ${activePair + stations / 2}`;

  const stageName = (index: number) => {
    if (index === 0) return english ? "Samples" : "采样";
    if (index === lastStep) return english ? "Spectrum" : "频谱";
    return english ? `Fold ${index}` : `第 ${index} 折`;
  };

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step === lastStep) setPlaying(false);
      else setStep(step + 1);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  const goTo = (next: number) => {
    if (atInput && next === 1) setPair(activePair);
    setPlaying(false);
    setStep(next);
  };

  return (
    <section
      className="fft-workbench"
      aria-label={english ? "Interactive 32-point FFT" : "32 点 FFT 交互实验"}
    >
      <div className="fft-controls">
        <fieldset className="fft-presets">
          <legend>{english ? "Input signal" : "输入信号"}</legend>
          <div>
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                aria-pressed={signal === preset.id}
                onClick={() => setSignal(preset.id)}
              >
                {preset[locale]}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="fft-play">
          <button
            type="button"
            className="fft-play-button"
            aria-pressed={playing}
            onClick={() => {
              if (!playing && atSpectrum) {
                setStep(0);
                setPair(sample % (FFT_SIZE / 2));
              } else if (!playing && atInput) setPair(activePair);
              setPlaying(!playing);
            }}
          >
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
            {playing ? (english ? "Pause" : "暂停") : english ? "Play" : "播放"}
          </button>
          <button
            type="button"
            className="fft-icon-button"
            onClick={() => goTo(0)}
            aria-label={english ? "Reset to samples" : "回到采样"}
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="fft-workspace">
        <div className="fft-stage">
          <div className="fft-stage-top">
            <div>
              <p aria-live="polite">{stageName(step)}</p>
              <h2>
                {atSpectrum
                  ? english
                    ? "Read the frequencies"
                    : "展开频谱"
                  : atInput
                    ? english
                      ? "Place the samples"
                      : "把采样排上圆周"
                    : english
                      ? "Fold and combine"
                      : "折叠，旋转，再加减"}
              </h2>
            </div>
            <span className="fft-stage-count">
              {atSpectrum
                ? "k = 0–31"
                : atInput
                  ? "n = 0–31"
                  : `${stations} → ${stations / 2}`}
            </span>
          </div>
          <FftDisk
            layers={layers}
            step={step}
            pair={activePair}
            bin={atSpectrum ? spectralBin : q}
            label={diskLabel}
          />
          <div className="fft-legend">
            <span>
              <i />
              {atSpectrum
                ? english
                  ? "Bins 0–16"
                  : "频点 0–16"
                : english
                  ? "Stays in place"
                  : "原位一组"}
            </span>
            <span>
              <i />
              {atSpectrum
                ? english
                  ? "Conjugate partners"
                  : "共轭频点"
                : english
                  ? "Folds over"
                  : "折来一组"}
            </span>
          </div>
          <div
            className="fft-timeline"
            aria-label={english ? "FFT steps" : "FFT 实验步骤"}
          >
            <button
              type="button"
              className="fft-icon-button"
              disabled={atInput}
              aria-label={english ? "Previous step" : "上一步"}
              onClick={() => goTo(step - 1)}
            >
              <ArrowLeft size={17} aria-hidden="true" />
            </button>
            <ol>
              {steps.map((index) => (
                <li key={index}>
                  <button
                    type="button"
                    aria-label={stageName(index)}
                    aria-current={step === index ? "step" : undefined}
                    onClick={() => goTo(index)}
                  >
                    {index > 0 && index < lastStep ? index : stageName(index)}
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              className={atInput ? "fft-first-fold" : "fft-icon-button"}
              disabled={atSpectrum}
              aria-label={
                atInput
                  ? english
                    ? "Make the first fold"
                    : "折一次"
                  : english
                    ? "Next step"
                    : "下一步"
              }
              onClick={() => goTo(step + 1)}
            >
              {atInput && (english ? "Fold" : "折一次")}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="fft-panel">
          {atInput ? (
            <>
              <h2>{english ? "Sampling" : "先看一个采样值"}</h2>
              <p>
                {english
                  ? "Each station starts with one real number. The first fold pairs j with j + 16."
                  : "每个站点起初只有一个实数。第一折把相隔半圈的两点配在一起。"}
              </p>
              <Range
                label={english ? "Sample n" : "采样下标 n"}
                max={FFT_SIZE - 1}
                value={sample}
                onChange={setSample}
              />
              <dl className="fft-readout">
                <div>
                  <dt>x[{sample}]</dt>
                  <dd>{formatNumber(samples[sample])}</dd>
                </div>
                <div>
                  <dt>x[{(sample + 16) % FFT_SIZE}]</dt>
                  <dd>{formatNumber(samples[(sample + 16) % FFT_SIZE])}</dd>
                </div>
              </dl>
            </>
          ) : atSpectrum ? (
            <>
              <h2>{english ? "Read a bin" : "选一个频点"}</h2>
              <p>
                {english
                  ? "The whole transform sits in the last stack. Read its bins in order from 0 through 31."
                  : "最后一叠有 32 个复数。按下标 0 到 31 读出来，就是完整的 DFT。"}
              </p>
              <Range
                label={english ? "Frequency bin k" : "频点 k"}
                max={FFT_SIZE / 2}
                value={spectralBin}
                onChange={setSpectralBin}
              />
              <dl className="fft-readout">
                <div>
                  <dt>X[{spectralBin}]</dt>
                  <dd>{formatComplex(transform[spectralBin])}</dd>
                </div>
                <div>
                  <dt>{english ? "One-sided amplitude" : "单边幅度"}</dt>
                  <dd>{formatNumber(amplitudes[spectralBin])}</dd>
                </div>
              </dl>
              <p className="fft-panel-note">
                {english
                  ? "The ring shows |X[k]|. The chart below divides it by 32 and doubles bins 1–15."
                  : "圆盘画的是 |X[k]|。下图先除以 32，频点 1–15 再乘 2。"}
              </p>
            </>
          ) : (
            <>
              <h2>{english ? "Inspect a butterfly" : "查看一组蝶形运算"}</h2>
              <p>
                {english
                  ? "Pick two stations at j and choose the q-th value from each stack. Rotate B by W, then add and subtract it from A."
                  : "用 j 选一对站点，再从两叠里各取第 q 项。给 B 乘旋转因子 W，再用 A 加一次、减一次。"}
              </p>
              <div className="fft-panel-ranges">
                <Range
                  label={english ? "Station pair j" : "配对站点 j"}
                  value={j}
                  max={stations / 2 - 1}
                  onChange={setPair}
                />
                <Range
                  label={english ? "Value in stack q" : "叠内第 q 项"}
                  value={q}
                  max={terms - 1}
                  onChange={setBin}
                />
              </div>
              <dl className="fft-readout">
                <div className="fft-plus">
                  <dt>
                    A <small>{english ? `station ${j}` : `站点 ${j}`}</small>
                  </dt>
                  <dd>{formatComplex(a)}</dd>
                </div>
                <div className="fft-minus">
                  <dt>
                    B{" "}
                    <small>
                      {english ? `station ${partner}` : `站点 ${partner}`}
                    </small>
                  </dt>
                  <dd>{formatComplex(b)}</dd>
                </div>
                <div>
                  <dt>
                    W{" "}
                    <small>
                      {formatNumber((result.angle * 180) / Math.PI, 2)}°
                    </small>
                  </dt>
                  <dd>{formatComplex(result.twiddle)}</dd>
                </div>
                <div className="fft-plus">
                  <dt>
                    A + WB <small>[{q}]</small>
                  </dt>
                  <dd>{formatComplex(result.plus)}</dd>
                </div>
                <div className="fft-minus">
                  <dt>
                    A − WB <small>[{q + terms}]</small>
                  </dt>
                  <dd>{formatComplex(result.minus)}</dd>
                </div>
              </dl>
            </>
          )}
        </div>
      </div>

      <StemChart
        english={english}
        values={atSpectrum ? amplitudes : samples}
        frequency={atSpectrum}
        active={atSpectrum ? spectralBin : atInput ? sample : j}
      />
    </section>
  );
}
