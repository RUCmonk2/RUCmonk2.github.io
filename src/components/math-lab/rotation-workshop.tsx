"use client";

import "./rotation-workshop.css";

import katex from "katex";
import {
  ArrowDown,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  SkipForward,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import {
  axisQuaternion,
  eulerQuaternion,
  multiplyQuaternions,
  quaternionMatrix,
  rotateVector,
  rotationDistance,
  type RotationQuaternion,
  type RotationVector,
  slerpQuaternion,
} from "@/lib/math-lab/rotations";

const RotationScene = dynamic(() => import("./rotation-scene"), {
  ssr: false,
  loading: () => <div className="rotation-loading">正在准备三维实验台…</div>,
});

const AXES: Record<string, RotationVector> = {
  x: [1, 0, 0],
  y: [0, 1, 0],
  z: [0, 0, 1],
  diagonal: [1, 1, 1],
};
const EX: RotationVector = [1, 0, 0];
const MODES = [
  {
    id: "axis",
    title: "一根轴，一个角",
    tag: "轴角与四元数",
    lead: "选一根轴，让方块转起来。观察朱砂色箭头，以及记录这次旋转的四个数。",
  },
  {
    id: "order",
    title: "先转谁，后转谁",
    tag: "旋转的合成",
    lead: "两边使用相同的轴和角度，只交换执行顺序。先预测终点，再播放验证。",
  },
  {
    id: "gimbal",
    title: "三个角，两个方向？",
    tag: "欧拉角与万向锁",
    lead: "跟着三层转环观察随体 Z–Y–X 旋转：外层先转，中层跟着转，内层再转。",
  },
  {
    id: "slerp",
    title: "两个朝向之间",
    tag: "平滑插值",
    lead: "起点和终点相同，中间可以走不同的路。拖动时间，看两种插值怎样到达目标。",
  },
] as const;
type Mode = (typeof MODES)[number]["id"];
const fmt = (n: number, digits = 3) => {
  const rounded = n.toFixed(digits);
  return Number(rounded) === 0 ? (0).toFixed(digits) : rounded;
};
const vec = (v: readonly number[]) => `(${v.map((n) => fmt(n)).join(", ")})`;
const negate = (q: RotationQuaternion) =>
  q.map((n) => -n) as RotationQuaternion;
const mixAngles = (a: RotationVector, b: RotationVector, t: number) =>
  a.map((n, i) => n + (b[i] - n) * t) as RotationVector;

function Formula({ value }: { value: string }) {
  const html = useMemo(
    () =>
      katex.renderToString(value, {
        displayMode: true,
        throwOnError: true,
        trust: false,
      }),
    [value],
  );
  return (
    <div
      className="rotation-formula"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "°",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <label className="rotation-slider" htmlFor={id}>
      <span>
        {label}
        <output>
          {fmt(value, 2)}
          {unit}
        </output>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="rotation-range-ends">
        <small>
          {min}
          {unit}
        </small>
        <small>
          {max}
          {unit}
        </small>
      </span>
    </label>
  );
}

function useTimeline(initial: number, max = 1, duration = 6000) {
  const [value, setValue] = useState(initial);
  const [playing, setPlaying] = useState(false);
  const current = useRef(initial);
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const start = performance.now();
    const from = current.current;
    const tick = (now: number) => {
      const next = Math.min(max, from + ((now - start) / duration) * max);
      current.current = next;
      setValue(next);
      if (next >= max) setPlaying(false);
      else frame = requestAnimationFrame(tick);
    };
    const stopOnHide = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", stopOnHide);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", stopOnHide);
    };
  }, [playing, max, duration]);
  return {
    value,
    playing,
    seek(next: number) {
      current.current = Math.max(0, Math.min(max, next));
      setValue(current.current);
      setPlaying(false);
    },
    pause() {
      setPlaying(false);
    },
    toggle() {
      if (!playing && current.current >= max) {
        current.current = 0;
        setValue(0);
      }
      setPlaying((p) => !p);
    },
  };
}

function Transport({
  timeline,
  reset,
  step,
  disabled = false,
}: {
  timeline: ReturnType<typeof useTimeline>;
  reset: () => void;
  step?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="rotation-transport">
      <button
        type="button"
        className="rotation-primary"
        onClick={timeline.toggle}
        disabled={disabled}
      >
        {timeline.playing ? <Pause size={15} /> : <Play size={15} />}
        {timeline.playing ? "暂停" : "播放旋转"}
      </button>
      {step && (
        <button type="button" onClick={step} disabled={disabled}>
          <SkipForward size={15} />
          单步
        </button>
      )}
      <button type="button" onClick={reset}>
        <RotateCcw size={14} />
        重置实验
      </button>
    </div>
  );
}

function QuaternionValues({
  q,
  label = "单位四元数 q",
}: {
  q: RotationQuaternion;
  label?: string;
}) {
  return (
    <div className="rotation-quaternion">
      <div className="rotation-mini-heading">
        <span>{label}</span>
        <span>实部在前</span>
      </div>
      <div className="rotation-components">
        {q.map((n, i) => (
          <div key={i}>
            <span>{["w", "x", "y", "z"][i]}</span>
            <strong>{fmt(n, 4)}</strong>
          </div>
        ))}
      </div>
      <div className="rotation-unit">
        w² + x² + y² + z² ={" "}
        <b>
          {fmt(
            q.reduce((s, n) => s + n * n, 0),
            4,
          )}
        </b>
      </div>
    </div>
  );
}

function SceneCard({
  title,
  detail,
  q,
  children,
}: {
  title: string;
  detail?: string;
  q: RotationQuaternion;
  children: React.ReactNode;
}) {
  return (
    <div className="rotation-scene-card">
      <div className="rotation-scene-heading">
        <span>{title}</span>
        {detail && <small>{detail}</small>}
      </div>
      <div className="rotation-viewport">{children}</div>
      <div className="rotation-vector">
        <span>示踪向量 p′</span>
        <output>{vec(rotateVector(q, EX))}</output>
      </div>
    </div>
  );
}

function Stage({
  children,
  resetView,
  paired = false,
}: {
  children: React.ReactNode;
  resetView: () => void;
  paired?: boolean;
}) {
  return (
    <div className="rotation-stage">
      <div className="rotation-stage-toolbar">
        <span>
          <i />
          三维观察窗
        </span>
        <button type="button" onClick={resetView}>
          <RotateCcw size={13} />
          重置视角
        </button>
      </div>
      <div
        className={
          paired ? "rotation-scenes rotation-scenes-paired" : "rotation-scenes"
        }
      >
        {children}
      </div>
      <div className="rotation-scene-legend">
        <span>
          <i className="rotation-dot-x" />X
        </span>
        <span>
          <i className="rotation-dot-y" />Y
        </span>
        <span>
          <i className="rotation-dot-z" />Z
        </span>
        <span>
          <i className="rotation-dot-p" />
          示踪向量
        </span>
        <small>拖动观察 · 滚轮缩放</small>
      </div>
      <p className="rotation-camera-note">
        拖动只改变观察视角；旋转由右侧参数控制。朱砂色箭头的初始方向为 (1, 0,
        0)。
      </p>
    </div>
  );
}

function MatrixDetails({ q }: { q: RotationQuaternion }) {
  const matrix = quaternionMatrix(q);
  return (
    <div className="rotation-matrix-readout">
      <span>对应旋转矩阵 R(q)</span>
      <table aria-label="当前旋转矩阵">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((n, j) => (
                <td key={j}>{fmt(n, 4)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AxisExperiment() {
  const [axisName, setAxisName] = useState("z");
  const [draft, setDraft] = useState(["1", "1", "1"]);
  const [custom, setCustom] = useState<RotationVector>([1, 1, 1]);
  const [flipped, setFlipped] = useState(false);
  const [viewKey, setViewKey] = useState(0);
  const timeline = useTimeline(90, 720, 16000);
  const axis = axisName === "custom" ? custom : AXES[axisName];
  const axisScale = Math.max(...axis.map(Math.abs));
  const scaledAxis = axis.map((n) => n / axisScale);
  const norm = Math.hypot(...scaledAxis);
  const unitAxis = scaledAxis.map((n) => n / norm) as RotationVector;
  const raw = axisQuaternion(axis, timeline.value);
  const q = flipped ? negate(raw) : raw;
  const valid =
    axisName !== "custom" ||
    (draft.every((s) => s.trim() !== "" && Number.isFinite(Number(s))) &&
      draft.some((s) => Number(s) !== 0));
  const reset = () => {
    timeline.seek(90);
    setAxisName("z");
    setFlipped(false);
    setDraft(["1", "1", "1"]);
    setCustom([1, 1, 1]);
  };
  const randomizeAxis = () => {
    timeline.pause();
    const z = 2 * Math.random() - 1;
    const azimuth = 2 * Math.PI * Math.random();
    const radius = Math.sqrt(1 - z * z);
    // Sample the sphere, then use the displayed values for the actual rotation.
    let numbers = [
      radius * Math.cos(azimuth),
      radius * Math.sin(azimuth),
      z,
    ].map((n) => Number(n.toFixed(3))) as RotationVector;
    if (numbers.every((n) => n === 0)) numbers = [1, 0, 0];
    const length = Math.hypot(...numbers);
    if (numbers.every((n, i) => Math.abs(n / length - unitAxis[i]) < 1e-6))
      numbers = numbers.map((n) => -n) as RotationVector;
    setDraft(numbers.map((n) => fmt(n, 3)));
    setCustom(numbers);
  };
  return (
    <>
      <div className="rotation-workbench">
        <Stage resetView={() => setViewKey((v) => v + 1)}>
          <SceneCard
            title="绕一根固定的轴旋转"
            detail={`θ = ${fmt(timeline.value, 2)}°`}
            q={q}
          >
            <RotationScene
              quaternion={q}
              axis={unitAxis}
              angle={timeline.value}
              resetKey={viewKey}
              label="轴角旋转三维场景"
            />
          </SceneCard>
        </Stage>
        <div className="rotation-controls">
          <div className="rotation-control-heading">
            <span>01 / 设置旋转</span>
            <h3>从轴与角度开始</h3>
          </div>
          <div className="rotation-field-label">旋转轴</div>
          <div className="rotation-segments" aria-label="选择旋转轴">
            {[
              ["x", "X 轴"],
              ["y", "Y 轴"],
              ["z", "Z 轴"],
              ["diagonal", "斜轴"],
              ["custom", "自定义"],
            ].map(([id, label]) => (
              <button
                type="button"
                key={id}
                aria-pressed={axisName === id}
                onClick={() => {
                  setAxisName(id);
                  timeline.pause();
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {axisName === "custom" && (
            <div className="rotation-custom-axis">
              <div className="rotation-custom-axis-heading">
                <span className="rotation-field-label">自定义轴方向</span>
                <button
                  type="button"
                  className="rotation-random-button"
                  aria-label="一键随机旋转轴"
                  onClick={randomizeAxis}
                >
                  <Shuffle size={14} aria-hidden="true" />
                  一键随机
                </button>
              </div>
              <div className="rotation-axis-inputs">
                {draft.map((value, i) => (
                  <label key={i}>
                    <span className="rotation-axis-symbol">
                      u<sub>{["x", "y", "z"][i]}</sub>
                    </span>
                    <input
                      type="number"
                      step="0.001"
                      value={value}
                      aria-label={`自定义旋转轴 ${["x", "y", "z"][i]}`}
                      onChange={(e) => {
                        timeline.pause();
                        const next = draft.map((s, j) =>
                          j === i ? e.target.value : s,
                        );
                        setDraft(next);
                        const numbers = next.map(Number) as RotationVector;
                        if (
                          next.every(
                            (s) =>
                              s.trim() !== "" && Number.isFinite(Number(s)),
                          ) &&
                          numbers.some((n) => n !== 0)
                        )
                          setCustom(numbers);
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
          {!valid && (
            <p className="rotation-input-error" role="alert">
              请输入非零、有限的轴向量。画面保留最近一次有效方向。
            </p>
          )}
          <p className="rotation-small">单位轴 u = {vec(unitAxis)}</p>
          <Slider
            label="旋转角 θ"
            value={timeline.value}
            min={0}
            max={720}
            onChange={timeline.seek}
          />
          <div className="rotation-presets">
            {[0, 90, 180, 360, 720].map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => timeline.seek(a)}
                aria-pressed={Math.abs(timeline.value - a) < 0.01}
              >
                {a}°
              </button>
            ))}
          </div>
          <Transport
            timeline={timeline}
            reset={reset}
            step={() =>
              timeline.seek(
                timeline.value >= 720
                  ? 0
                  : Math.min(720, Math.floor(timeline.value / 90 + 1) * 90),
              )
            }
            disabled={!valid}
          />
          <QuaternionValues q={q} />
          <button
            type="button"
            className="rotation-sign-button"
            aria-pressed={flipped}
            onClick={() => setFlipped((v) => !v)}
          >
            q ↔ −q{" "}
            <span>{flipped ? "已翻转四个分量" : "试试四个数一起变号"}</span>
          </button>
          <p className="rotation-small">
            整体变号，姿态不变。四个分量受单位长度约束，仍只有三个旋转自由度。
          </p>
        </div>
      </div>
      <div className="rotation-observation">
        <span>观察这一刻</span>
        <p>
          {Math.abs(timeline.value - 360) < 0.1
            ? "转过 360°，物体已经回到原姿态。沿连续旋转得到的四元数是初始值的相反数。"
            : Math.abs(timeline.value - 720) < 0.1
              ? "转过 720°，物体又转了一圈，连续记录的四元数也回到初始值。普通刚体在 360° 时就已回到原姿态。"
              : `物体转过 ${fmt(timeline.value, 2)}°，构造四元数使用的半角是 ${fmt(timeline.value / 2, 2)}°。半角不表示物体只转了一半。`}
          {flipped && " 当前显示的四元数已手动整体变号。"}
        </p>
      </div>
      <details className="rotation-explanation">
        <summary>展开公式：四元数怎样旋转一个向量？</summary>
        <div>
          <Formula
            value={String.raw`q=\left(\cos\frac{\theta}{2},\;u_x\sin\frac{\theta}{2},\;u_y\sin\frac{\theta}{2},\;u_z\sin\frac{\theta}{2}\right)`}
          />
          <p>
            轴向量 u 先归一化。将待旋转向量写成纯四元数 P = (0, p)，从两侧夹乘：
          </p>
          <Formula
            value={String.raw`(0,\mathbf p')=q\otimes(0,\mathbf p)\otimes q^{-1},\qquad q^{-1}=q^*\quad(\|q\|=1)`}
          />
          <p>
            把 q 换成 −q，两侧负号抵消。这就是它们表示同一姿态的原因。单独计算
            qP 并不能完成这里的三维旋转。
          </p>
          <MatrixDetails q={q} />
        </div>
      </details>
    </>
  );
}

function AxisSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <label className="rotation-select">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {["x", "y", "z"].map((a) => (
          <option key={a} value={a}>
            世界 {a.toUpperCase()} 轴
          </option>
        ))}
      </select>
    </label>
  );
}

function OrderExperiment() {
  const [axisA, setAxisA] = useState("x"),
    [axisB, setAxisB] = useState("y");
  const [angleA, setAngleA] = useState(90),
    [angleB, setAngleB] = useState(90);
  const [viewKey, setViewKey] = useState(0);
  const timeline = useTimeline(1);
  const first = Math.min(1, timeline.value * 2),
    second = Math.max(0, timeline.value * 2 - 1);
  const left = multiplyQuaternions(
    axisQuaternion(AXES[axisB], angleB * second),
    axisQuaternion(AXES[axisA], angleA * first),
  );
  const right = multiplyQuaternions(
    axisQuaternion(AXES[axisA], angleA * second),
    axisQuaternion(AXES[axisB], angleB * first),
  );
  const a = axisA.toUpperCase(),
    b = axisB.toUpperCase();
  const change = (fn: () => void) => {
    timeline.seek(1);
    fn();
  };
  return (
    <>
      <div className="rotation-workbench">
        <Stage paired resetView={() => setViewKey((v) => v + 1)}>
          <SceneCard title={`先 ${a} → 再 ${b}`} detail="qB ⊗ qA" q={left}>
            <RotationScene
              quaternion={left}
              resetKey={viewKey}
              label="先做A再做B的姿态"
            />
          </SceneCard>
          <SceneCard title={`先 ${b} → 再 ${a}`} detail="qA ⊗ qB" q={right}>
            <RotationScene
              quaternion={right}
              resetKey={viewKey}
              label="先做B再做A的姿态"
            />
          </SceneCard>
        </Stage>
        <div className="rotation-controls">
          <div className="rotation-control-heading">
            <span>02 / 交换顺序</span>
            <h3>同样两步，不同终点</h3>
          </div>
          <AxisSelect
            label="旋转 A"
            value={axisA}
            onChange={(s) => change(() => setAxisA(s))}
          />
          <Slider
            label="A 的角度"
            value={angleA}
            min={-180}
            max={180}
            onChange={(n) => change(() => setAngleA(n))}
          />
          <AxisSelect
            label="旋转 B"
            value={axisB}
            onChange={(s) => change(() => setAxisB(s))}
          />
          <Slider
            label="B 的角度"
            value={angleB}
            min={-180}
            max={180}
            onChange={(n) => change(() => setAngleB(n))}
          />
          <Slider
            label="执行进度"
            value={timeline.value * 100}
            min={0}
            max={100}
            unit="%"
            onChange={(n) => timeline.seek(n / 100)}
          />
          <div className="rotation-phase">
            {timeline.value === 1
              ? "两步完成 · 对比最终姿态"
              : timeline.value < 0.5
                ? "第 1 步 · 各自执行第一个旋转"
                : "第 2 步 · 绕另一根世界轴旋转"}
          </div>
          <Transport
            timeline={timeline}
            step={() =>
              timeline.seek(
                timeline.value < 0.5 ? 0.5 : timeline.value < 1 ? 1 : 0,
              )
            }
            reset={() => {
              setAxisA("x");
              setAxisB("y");
              setAngleA(90);
              setAngleB(90);
              timeline.seek(0);
            }}
          />
          <div className="rotation-stat">
            <span>当前两种姿态相差</span>
            <strong>
              {fmt(rotationDistance(left, right), 2)}
              <small>°</small>
            </strong>
          </div>
          <p className="rotation-small">
            这里始终绕固定的世界轴。试试把 A、B 设成同一根轴，再观察结果。
          </p>
        </div>
      </div>
      <div className="rotation-observation">
        <span>先后写在哪里？</span>
        <p>
          先执行 A，再执行 B，合成写作 qB ⊗
          qA，先发生的旋转放在右边。一般情况下，交换顺序会改变结果；绕同一根轴的两次旋转则可以交换。
        </p>
      </div>
      <details className="rotation-explanation">
        <summary>展开公式：合成为什么从右向左读？</summary>
        <div>
          <Formula
            value={String.raw`\mathbf p'=R_B(R_A\mathbf p)=(R_BR_A)\mathbf p,\qquad q_{\mathrm{total}}=q_B\otimes q_A`}
          />
          <p>
            第二次旋转作用在第一次的结果上。这与列向量的矩阵乘法顺序一致。若改为绕物体自身坐标轴旋转，乘法侧与解释也要随之改变。
          </p>
          <QuaternionValues q={left} label="左侧当前 q" />
          <QuaternionValues q={right} label="右侧当前 q" />
        </div>
      </details>
    </>
  );
}

function GimbalExperiment() {
  const [angles, setAngles] = useState<RotationVector>([30, 60, 10]);
  const [viewKey, setViewKey] = useState(0);
  const [roll, pitch, yaw] = angles;
  const q = eulerQuaternion(angles);
  const sign = pitch < 0 ? -1 : 1;
  const shifted: RotationVector = [roll + 20, pitch, yaw + sign * 20];
  const error = rotationDistance(q, eulerQuaternion(shifted));
  const locked = Math.abs(Math.abs(pitch) - 90) < 0.01;
  return (
    <>
      <div className="rotation-workbench">
        <Stage resetView={() => setViewKey((v) => v + 1)}>
          <SceneCard
            title="随体 Z–Y–X · 三层万向环"
            detail={locked ? "首尾轴已重合" : "外 Z → 中 Y → 内 X"}
            q={q}
          >
            <RotationScene
              quaternion={q}
              gimbal={angles}
              resetKey={viewKey}
              label="三层万向环和欧拉角三维场景"
            />
          </SceneCard>
        </Stage>
        <div className="rotation-controls">
          <div className="rotation-control-heading">
            <span>03 / 观察万向锁</span>
            <h3>让两根操作轴重合</h3>
          </div>
          {["内环 roll φ", "中环 pitch θ", "外环 yaw ψ"].map((label, i) => (
            <Slider
              key={i}
              label={label}
              value={angles[i]}
              min={i === 1 ? -90 : -180}
              max={i === 1 ? 90 : 180}
              onChange={(v) =>
                setAngles(
                  angles.map((n, j) => (i === j ? v : n)) as RotationVector,
                )
              }
            />
          ))}
          <div className="rotation-presets rotation-presets-wide">
            <button type="button" onClick={() => setAngles([30, 90, 10])}>
              观察 +90° 万向锁
            </button>
            <button type="button" onClick={() => setAngles([30, 60, 10])}>
              回到 60° 对照
            </button>
          </div>
          <div className="rotation-stat">
            <span>首尾轴的锐夹角</span>
            <strong>
              {fmt(90 - Math.abs(pitch), 2)}
              <small>°</small>
            </strong>
          </div>
          <div className="rotation-gimbal-check">
            <span>如果 roll +20°，yaw {sign > 0 ? "+" : "−"}20°</span>
            <p>
              姿态变化 <b>{fmt(error, 2)}°</b>
            </p>
            <button
              type="button"
              onClick={() =>
                setAngles(
                  shifted.map((n, i) =>
                    i === 1 ? n : ((((n + 180) % 360) + 360) % 360) - 180,
                  ) as RotationVector,
                )
              }
            >
              应用这组角度，观察物体
            </button>
          </div>
        </div>
      </div>
      <div className="rotation-observation">
        <span>
          {locked ? "现在，两个操作不再独立" : "先观察，再走向奇异位置"}
        </span>
        <p>
          {locked
            ? `pitch = ${fmt(pitch, 2)}° 时，姿态只依赖 roll ${sign > 0 ? "−" : "+"} yaw 的组合。按上面的联动按钮，两项角度改变，物体的最终姿态却不变。`
            : "把 pitch 调到 90°，再同时给 roll 和 yaw 加 20°。你会看到三层环的设置改变，但方块最终姿态保持一致。"}
          失去局部独立性的是欧拉角表示，物体仍然可以旋转。
        </p>
      </div>
      <details className="rotation-explanation">
        <summary>展开解释：四元数解决了什么？</summary>
        <div>
          <Formula
            value={String.raw`R=R_z(\psi)R_y(\theta)R_x(\phi),\qquad \theta=90^\circ\Rightarrow R\text{ depends on }\phi-\psi`}
          />
          <p>
            这里采用随体 Z–Y–X 顺序。pitch 为 +90° 时保持 φ − ψ
            不变可保持姿态；为 −90° 时则要保持 φ + ψ 不变。
          </p>
          <p>
            单位四元数避免了这类欧拉角坐标的万向锁，但仍有 q 与 −q
            的双重表示。它不会消除机械臂自身的关节奇异性。
          </p>
          <QuaternionValues q={q} />
          <MatrixDetails q={q} />
        </div>
      </details>
    </>
  );
}

function InterpolationExperiment() {
  const [start, setStart] = useState<RotationVector>([0, 0, 170]);
  const [end, setEnd] = useState<RotationVector>([0, 0, -170]);
  const [editing, setEditing] = useState<"start" | "end">("end");
  const [viewKey, setViewKey] = useState(0);
  const timeline = useTimeline(0.5);
  const qa = eulerQuaternion(start),
    qb = eulerQuaternion(end);
  const euler = eulerQuaternion(mixAngles(start, end, timeline.value));
  const slerp = slerpQuaternion(qa, qb, timeline.value);
  const trails = useMemo(() => {
    const a = eulerQuaternion(start),
      b = eulerQuaternion(end);
    return {
      euler: Array.from({ length: 9 }, (_, i) =>
        eulerQuaternion(mixAngles(start, end, i / 8)),
      ),
      slerp: Array.from({ length: 9 }, (_, i) => slerpQuaternion(a, b, i / 8)),
    };
  }, [start, end]);
  const pathLength = useMemo(() => {
    let total = 0,
      last = eulerQuaternion(start);
    for (let i = 1; i <= 100; i++) {
      const next = eulerQuaternion(mixAngles(start, end, i / 100));
      total += rotationDistance(last, next);
      last = next;
    }
    return total;
  }, [start, end]);
  const preset = (a: RotationVector, b: RotationVector) => {
    timeline.seek(0.5);
    setStart(a);
    setEnd(b);
  };
  const edited = editing === "start" ? start : end;
  const crossing =
    start[0] === 0 &&
    start[1] === 0 &&
    start[2] === 170 &&
    end[0] === 0 &&
    end[1] === 0 &&
    end[2] === -170;
  return (
    <>
      <div className="rotation-workbench">
        <Stage paired resetView={() => setViewKey((v) => v + 1)}>
          <SceneCard
            title="欧拉角逐分量插值"
            detail="直接对角度做线性插值"
            q={euler}
          >
            <RotationScene
              quaternion={euler}
              ghostQuaternions={trails.euler}
              resetKey={viewKey}
              label="欧拉角逐分量插值场景"
            />
          </SceneCard>
          <SceneCard
            title="四元数 SLERP"
            detail="最短路径 · 恒角速度"
            q={slerp}
          >
            <RotationScene
              quaternion={slerp}
              ghostQuaternions={trails.slerp}
              resetKey={viewKey}
              label="四元数球面插值场景"
            />
          </SceneCard>
        </Stage>
        <div className="rotation-controls">
          <div className="rotation-control-heading">
            <span>04 / 插值实验</span>
            <h3>让姿态走到另一端</h3>
          </div>
          <div className="rotation-presets rotation-presets-wide">
            <button
              type="button"
              onClick={() => preset([0, 0, 170], [0, 0, -170])}
            >
              跨越 ±180°
            </button>
            <button
              type="button"
              onClick={() => preset([10, 25, 20], [120, -35, 150])}
            >
              复合姿态
            </button>
            <button type="button" onClick={() => preset([0, 0, 0], [0, 0, 0])}>
              同一姿态
            </button>
          </div>
          <div className="rotation-segments rotation-endpoints">
            <button
              type="button"
              aria-pressed={editing === "start"}
              onClick={() => setEditing("start")}
            >
              编辑起点 A
            </button>
            <button
              type="button"
              aria-pressed={editing === "end"}
              onClick={() => setEditing("end")}
            >
              编辑终点 B
            </button>
          </div>
          {["roll", "pitch", "yaw"].map((name, i) => (
            <Slider
              key={i}
              label={`${editing === "start" ? "A" : "B"} · ${name}`}
              value={edited[i]}
              min={-180}
              max={180}
              onChange={(n) => {
                timeline.pause();
                (editing === "start" ? setStart : setEnd)(
                  edited.map((v, j) => (i === j ? n : v)) as RotationVector,
                );
              }}
            />
          ))}
          <Slider
            label="时间 t"
            value={timeline.value}
            min={0}
            max={1}
            step={0.01}
            unit=""
            onChange={timeline.seek}
          />
          <Transport
            timeline={timeline}
            reset={() => preset([0, 0, 170], [0, 0, -170])}
            step={() =>
              timeline.seek(
                timeline.value >= 1
                  ? 0
                  : Math.min(1, (Math.floor(timeline.value * 4) + 1) / 4),
              )
            }
          />
          <div className="rotation-path-lengths">
            <span>整段路径的累计转角</span>
            <div>
              <span>逐分量插值</span>
              <b>≈ {fmt(pathLength, 2)}°</b>
            </div>
            <div>
              <span>SLERP</span>
              <b>{fmt(rotationDistance(qa, qb), 2)}°</b>
            </div>
          </div>
        </div>
      </div>
      <div className="rotation-observation">
        <span>同样的终点，不同的路</span>
        <p>
          {crossing
            ? "从 yaw = 170° 到 −170°，直接插值会经过 0°，走过 340°；最短旋转只需跨过 180°，走 20°。这展示了角度分支的影响，并不意味着欧拉角插值总会绕远。"
            : "淡色残影按相等时间间隔采样。SLERP 沿固定轴以恒角速度连接两个姿态；欧拉角逐分量线性变化，空间中的旋转速度和路径仍可能变化。"}
        </p>
      </div>
      <details className="rotation-explanation">
        <summary>展开公式：球面插值与最短路径</summary>
        <div>
          <p>
            先将两个四元数归一化。如果内积为负，把终点四元数整体变号，选取同一半球的代表。设
            Ω 是这两个代表在四维单位球面上的夹角：
          </p>
          <Formula
            value={String.raw`\operatorname{slerp}(q_0,q_1;t)=\frac{\sin((1-t)\Omega)}{\sin\Omega}q_0+\frac{\sin(t\Omega)}{\sin\Omega}q_1`}
          />
          <p>
            实际姿态差为 2Ω。两端非常接近时使用稳定的等价式计算，避免小量相除；q
            与 −q 作为端点时，最短路径保持同一姿态。相差恰好 180°
            时，最短路径方向并不唯一。
          </p>
          <QuaternionValues q={slerp} label="当前 SLERP 四元数" />
        </div>
      </details>
    </>
  );
}

const QUESTIONS: Record<
  Mode,
  { question: string; choices: string[]; correct: number; explanation: string }
> = {
  axis: {
    question: "按右手定则，绕 +Z 轴转 90°，向量 (1, 0, 0) 会到哪里？",
    choices: ["(0, 1, 0)", "(0, −1, 0)", "(1, 0, 0)"],
    correct: 0,
    explanation:
      "正 X 方向转到正 Y 方向。把轴设为 Z、角度设为 90°，观察朱砂色箭头与 p′ 的坐标。",
  },
  order: {
    question: "交换两个三维旋转的执行顺序，结果会怎样？",
    choices: ["一定相同", "一定不同", "通常不同，但存在相同的情况"],
    correct: 2,
    explanation:
      "旋转一般不交换；绕同一根轴旋转、某一步转 0° 等情况，交换顺序不会改变姿态。",
  },
  gimbal: {
    question: "pitch = 90° 出现万向锁时，失去局部独立性的是什么？",
    choices: [
      "物体在空间中旋转的能力",
      "欧拉角的参数表示",
      "四元数的单位长度约束",
    ],
    correct: 1,
    explanation:
      "首尾操作轴重合，roll 与 yaw 不再局部独立。物体仍可以有任意三维姿态，旋转矩阵和单位四元数仍然有效。",
  },
  slerp: {
    question: "用 q 与 −q 作为两个端点，最短路径插值会让物体怎样运动？",
    choices: ["转半圈", "转一整圈", "保持同一姿态"],
    correct: 2,
    explanation:
      "q 与 −q 表示同一姿态。先做符号对齐后，两个端点相同，因此最短路径不需要旋转。",
  },
};

function Prediction({ mode }: { mode: Mode }) {
  const [choice, setChoice] = useState<number | null>(null);
  const question = QUESTIONS[mode];
  return (
    <section
      className="rotation-prediction"
      aria-labelledby="rotation-question"
    >
      <div>
        <span className="notes-overline">CHECK YOUR INTUITION</span>
        <h3 id="rotation-question">先想一下，再验证</h3>
        <p>{question.question}</p>
      </div>
      <div className="rotation-answers">
        {question.choices.map((s, i) => (
          <button
            type="button"
            key={i}
            aria-pressed={choice === i}
            onClick={() => setChoice(i)}
          >
            <span>{["A", "B", "C"][i]}</span>
            {s}
          </button>
        ))}
        {choice !== null && (
          <p
            role="status"
            className={
              choice === question.correct
                ? "rotation-feedback rotation-correct"
                : "rotation-feedback"
            }
          >
            <b>{choice === question.correct ? "判断正确。" : "再观察一下。"}</b>
            {question.explanation}
          </p>
        )}
      </div>
    </section>
  );
}

export function RotationWorkshop({ locale }: { locale: "zh" | "en" }) {
  const [mode, setMode] = useState<Mode>("axis");
  const current = MODES.find((m) => m.id === mode)!;
  const prefix = locale === "en" ? "/en" : "";
  return (
    <div className="rotation-workshop">
      <nav className="rotation-mode-nav" aria-label="选择旋转实验">
        {MODES.map((m, i) => (
          <button
            type="button"
            key={m.id}
            aria-pressed={mode === m.id}
            aria-controls="rotation-active-experiment"
            onClick={() => setMode(m.id)}
          >
            <span className="rotation-mode-number">0{i + 1}</span>
            <span>
              <strong>{m.tag}</strong>
              <small>{m.title}</small>
            </span>
            <ArrowRight size={15} />
          </button>
        ))}
      </nav>
      <section
        id="rotation-active-experiment"
        aria-labelledby="rotation-experiment-title"
      >
        <div className="rotation-experiment-intro">
          <div>
            <h2 id="rotation-experiment-title">{current.title}</h2>
            <p>{current.lead}</p>
          </div>
          <a href="#rotation-conventions">
            查看坐标约定 <ArrowDown size={13} />
          </a>
        </div>
        {mode === "axis" && <AxisExperiment />}
        {mode === "order" && <OrderExperiment />}
        {mode === "gimbal" && <GimbalExperiment />}
        {mode === "slerp" && <InterpolationExperiment />}
      </section>
      <Prediction key={mode} mode={mode} />
      <section className="rotation-conventions" id="rotation-conventions">
        <div>
          <span className="notes-overline">A SHARED LANGUAGE</span>
          <h3>让图像与公式说同一种语言</h3>
          <p>
            右手坐标系 · 主动旋转物体 · 列向量 · Hamilton 乘法 · 四元数按 (w, x,
            y, z) 排列。欧拉角采用随体 Z–Y–X，角度输入统一为度。
          </p>
        </div>
        <div className="rotation-reading">
          <Link href={prefix + "/learning/robotics/quaternions"}>
            四元数：从半角到一次完整旋转 <ArrowRight size={14} />
          </Link>
          <Link href={prefix + "/learning/robotics/euler-angles"}>
            欧拉角与万向锁 <ArrowRight size={14} />
          </Link>
          <Link href={prefix + "/learning/math-lab"}>
            返回数学实验室 <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
