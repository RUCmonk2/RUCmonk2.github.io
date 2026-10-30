"use client";

import { useState } from "react";

import { MathProse } from "@/components/math-map/lesson-reader";
import {
  type CapacitorMode,
  capacitorState,
  particleModel,
  particleState,
} from "@/data/physics-midterm/models";

import styles from "./midterm.module.css";

export function CapacitorExperiment() {
  const [mode, setMode] = useState<CapacitorMode>("voltage");
  const [distance, setDistance] = useState(1);
  const state = capacitorState(mode, distance);
  const halfGap = 40 * distance;
  const arrows = Math.max(3, Math.round(7 * state.field));
  function changeMode(value: CapacitorMode) {
    setMode(value);
    setDistance(1);
  }
  return (
    <article className={styles.experiment} id="capacitor">
      <header>
        <span className={styles.eyebrow}>实验 01 · 先找不变量</span>
        <h3>拉开极板，哪些量跟着变？</h3>
        <p>先预测 C、Q、U、E，再拖动板距。切换接线时回到同一个初始状态。</p>
      </header>
      <div className={styles.experimentGrid}>
        <div>
          <div
            className={styles.modeSwitch}
            role="group"
            aria-label="电容器接线状态"
          >
            <button
              type="button"
              aria-pressed={mode === "voltage"}
              onClick={() => changeMode("voltage")}
            >
              接理想电源 · U 不变
            </button>
            <button
              type="button"
              aria-pressed={mode === "charge"}
              onClick={() => changeMode("charge")}
            >
              断开电源 · Q 不变
            </button>
          </div>
          <label className={styles.control} htmlFor="capacitor-distance">
            <span>
              板距 d / d₀ <strong>{distance.toFixed(2)}</strong>
            </span>
            <input
              id="capacitor-distance"
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={distance}
              onChange={(event) => setDistance(Number(event.target.value))}
            />
            <small>
              0.50 倍 <span>2.00 倍</span>
            </small>
          </label>
          <div className={styles.readouts} aria-live="polite">
            {[
              ["C / C₀", state.capacitance],
              ["Q / Q₀", state.charge],
              ["U / U₀", state.voltage],
              ["E / E₀", state.field],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{Number(value).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <MathProse>{String.raw`$C=\varepsilon_0\varepsilon_r S/d$，$Q=CU$，$E=U/d$。${mode === "voltage" ? "固定电压时，板距增大，C、Q、E 都减小。" : "固定电荷量时，板距增大，C 减小，U 增大，E 不变。"}`}</MathProse>
        </div>
        <figure>
          <svg
            viewBox="0 0 440 280"
            role="img"
            aria-label={`平行板电容器，板距为初始的${distance.toFixed(2)}倍，场强为初始的${state.field.toFixed(2)}倍`}
          >
            <defs>
              <marker
                id="capacitor-arrow"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
              >
                <path d="M 0 0 L 6 3.5 L 0 7" fill="currentColor" />
              </marker>
            </defs>
            <text x="30" y="24">
              上板带正电，下板带负电
            </text>
            <path
              d={`M 65 ${140 - halfGap} H 370 M 65 ${140 + halfGap} H 370`}
              stroke="currentColor"
              strokeWidth="6"
            />
            {Array.from({ length: arrows }, (_, index) => {
              const x = 85 + index * (265 / Math.max(arrows - 1, 1));
              return (
                <line
                  key={index}
                  x1={x}
                  x2={x}
                  y1={140 - halfGap + 12}
                  y2={140 + halfGap - 14}
                  stroke="var(--note-accent)"
                  strokeWidth="1.5"
                  markerEnd="url(#capacitor-arrow)"
                />
              );
            })}
            <text x="43" y={145 - halfGap}>
              +
            </text>
            <text x="43" y={145 + halfGap}>
              −
            </text>
            <path
              d={`M 396 ${140 - halfGap} V ${140 + halfGap} M 388 ${140 - halfGap} H 404 M 388 ${140 + halfGap} H 404`}
              stroke="currentColor"
              fill="none"
            />
            <text x="408" y="145">
              d
            </text>
            <text x="30" y="259">
              箭头疏密仅示意相对场强
            </text>
          </svg>
          <figcaption>
            比较各板距下的静电平衡状态；极板正对面积、介质不变，忽略边缘效应与漏电。ε₀
            为真空介电常数，εᵣ 为相对介电常数。
          </figcaption>
        </figure>
      </div>
      <details className={styles.answer}>
        <summary>试一试：板距变成 2 倍，为什么断电时 E 不变？</summary>
        <MathProse>{String.raw`断开后 $Q$ 不变，$C$ 减为一半，所以 $U=Q/C$ 增为 2 倍。再用 $E=U/d$，分子、分母同时增为 2 倍，场强不变。也可写 $E=Q/(\varepsilon_0\varepsilon_r S)$。`}</MathProse>
      </details>
    </article>
  );
}

export function DeflectionExperiment() {
  const [sign, setSign] = useState(1);
  const [voltage, setVoltage] = useState(-10);
  const [speed, setSpeed] = useState(100000);
  const state = particleState(sign, voltage, speed);
  const points = Array.from({ length: 61 }, (_, index) => {
    const t = (state.time * index) / 60;
    return `${60 + speed * t * 2100},${150 - ((state.acceleration * t * t) / 2) * 1680}`;
  }).join(" ");
  const direction =
    state.acceleration === 0
      ? "不偏转"
      : state.acceleration > 0
        ? "向上偏转"
        : "向下偏转";
  return (
    <article className={styles.experiment} id="deflection">
      <header>
        <span className={styles.eyebrow}>实验 02 · 受力决定弯向哪里</span>
        <h3>同样的电场，正负电荷怎样偏转？</h3>
        <p>
          默认参数对应例题
          L4：从两板中线沿水平方向射入。先画受力，再改变电性、电压和初速度。
        </p>
      </header>
      <div className={styles.experimentGrid}>
        <div>
          <div className={styles.modeSwitch} role="group" aria-label="粒子电性">
            <button
              type="button"
              aria-pressed={sign === 1}
              onClick={() => setSign(1)}
            >
              正电荷
            </button>
            <button
              type="button"
              aria-pressed={sign === -1}
              onClick={() => setSign(-1)}
            >
              负电荷
            </button>
          </div>
          <label className={styles.control} htmlFor="deflection-voltage">
            <span>
              上板电势 − 下板电势 <strong>{voltage} V</strong>
            </span>
            <input
              id="deflection-voltage"
              type="range"
              min="-50"
              max="50"
              step="5"
              value={voltage}
              onChange={(event) => setVoltage(Number(event.target.value))}
            />
            <small>
              −50 V <span>50 V</span>
            </small>
          </label>
          <label className={styles.control} htmlFor="deflection-speed">
            <span>
              水平初速度 v₀{" "}
              <strong>{(speed / 1e5).toFixed(1)} × 10⁵ m/s</strong>
            </span>
            <input
              id="deflection-speed"
              type="range"
              min="50000"
              max="200000"
              step="10000"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
            />
            <small>
              0.5 × 10⁵ <span>2.0 × 10⁵ m/s</span>
            </small>
          </label>
          <p className={styles.status} aria-live="polite">
            <strong>
              {direction} ·{" "}
              {state.hitsPlate ? "碰板，轨迹到此停止" : "可从右侧射出"}
            </strong>
            <br />
            {state.hitsPlate
              ? `碰板位置 x = ${(state.x * 100).toFixed(2)} cm，经过 ${(state.time * 1e6).toFixed(2)} μs。`
              : `出口竖直位移 y = ${(state.y * 100).toFixed(2)} cm，飞行时间 ${(state.time * 1e6).toFixed(2)} μs。`}
          </p>
        </div>
        <figure>
          <svg
            viewBox="0 0 560 300"
            role="img"
            aria-label={`${sign > 0 ? "正" : "负"}电荷${direction}，${state.hitsPlate ? "碰到极板" : "离开电场"}`}
          >
            <defs>
              <marker
                id="particle-arrow"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
              >
                <path d="M 0 0 L 6 3.5 L 0 7" fill="currentColor" />
              </marker>
            </defs>
            <text x="60" y="35">
              上板 {voltage > 0 ? "＋" : voltage < 0 ? "−" : "等势"}
            </text>
            <path
              d="M 60 66 H 480 M 60 234 H 480"
              stroke="currentColor"
              strokeWidth="6"
            />
            <path
              d="M 25 150 H 520"
              stroke="currentColor"
              strokeDasharray="4 6"
              opacity="0.3"
            />
            {voltage !== 0 &&
              [120, 210, 300, 390, 460].map((x) => (
                <line
                  key={x}
                  x1={x}
                  x2={x}
                  y1={voltage > 0 ? 90 : 210}
                  y2={voltage > 0 ? 210 : 90}
                  stroke="var(--note-accent)"
                  opacity="0.25"
                  markerEnd="url(#particle-arrow)"
                />
              ))}
            <polyline
              points={points}
              fill="none"
              stroke="var(--note-accent)"
              strokeWidth="4"
            />
            <circle
              cx={60 + state.x * 2100}
              cy={150 - state.y * 1680}
              r="6"
              fill="var(--note-accent)"
            />
            <line
              x1="17"
              x2="54"
              y1="150"
              y2="150"
              stroke="currentColor"
              strokeWidth="2"
              markerEnd="url(#particle-arrow)"
            />
            <text x="16" y="133">
              v₀
            </text>
            <text x="60" y="268">
              下板 {voltage > 0 ? "−" : voltage < 0 ? "＋" : "等势"}
            </text>
            <text x="250" y="268">
              L = 20 cm
            </text>
            <text x="490" y="154">
              10 cm
            </text>
          </svg>
          <figcaption>
            纵向坐标向上为正；极板长度 {particleModel.plateLength * 100}{" "}
            cm、间距 {particleModel.plateGap * 100} cm，|q|/m = 5 × 10⁷
            C/kg。图示横纵尺度不同。忽略重力、边缘效应及粒子对电场的影响。
          </figcaption>
        </figure>
      </div>
      <MathProse>{String.raw`$a_y=-\dfrac{qU}{md}$，$x=v_0t$，$y=\dfrac12a_yt^2$。仅当未碰板时，可令 $t=L/v_0$ 得出口位移 $y=-\dfrac{qUL^2}{2mdv_0^2}$。这里 $U=\varphi_{\text{上}}-\varphi_{\text{下}}$，$q$ 带符号。`}</MathProse>
      <details className={styles.answer}>
        <summary>
          试一试：保持电性与电压，初速度加倍，偏移为什么变为 1/4？
        </summary>
        <MathProse>{String.raw`横向不受力，穿过同一板长的时间 $t=L/v_0$ 减半；竖直加速度不变，故 $y=\tfrac12a_yt^2$ 变为原来的 $1/4$。先检查两次都能从板间射出。`}</MathProse>
      </details>
    </article>
  );
}
