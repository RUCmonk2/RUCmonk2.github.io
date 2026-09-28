"use client";

import "./robotics-lab.css";

import { useId, useState } from "react";

import {
  armInitial,
  armTarget,
  eulerZYX,
  type Matrix3,
  planarForward,
  planarInverseStep,
  planarJacobian,
  poseError,
  type Vector3,
} from "@/lib/math-lab/robotics";

const rad = (angle: number) => (angle * Math.PI) / 180;
const deg = (angle: number) => (angle * 180) / Math.PI;
function fmt(value: number, digits = 4) {
  return Math.abs(value) < 0.5 * 10 ** -digits
    ? "0"
    : Number(value.toFixed(digits)).toString();
}
function Matrix({ value, label }: { value: Matrix3; label: string }) {
  return (
    <div className="robot-matrix-wrap">
      <table className="robot-matrix">
        <caption>{label}</caption>
        <tbody>
          {value.map((row, i) => (
            <tr key={i}>
              {row.map((entry, j) => (
                <td key={j}>{fmt(entry)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function AngleSlider({
  label,
  value,
  onChange,
  limit = 180,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  limit?: number;
}) {
  const id = useId();
  return (
    <label className="lab-slider" htmlFor={id}>
      <span>
        {label}
        <output>{fmt(value, 1)}°</output>
      </span>
      <input
        id={id}
        type="range"
        min={-limit}
        max={limit}
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
function EulerLab() {
  const id = useId();
  const [angles, setAngles] = useState<Vector3>([30, 60, 10]);
  const [roll, pitch, yaw] = angles;
  const r = eulerZYX(rad(roll), rad(pitch), rad(yaw));
  const shifted = eulerZYX(rad(roll + 20), rad(pitch), rad(yaw + 20));
  const difference = Math.max(
    ...r.flat().map((entry, i) => Math.abs(entry - shifted.flat()[i])),
  );
  return (
    <section className="course-lab robotics-lab" aria-labelledby={id}>
      <div className="lab-heading">
        <span>动手算</span>
        <h2 id={id}>两组角度，能否表示同一个姿态？</h2>
      </div>
      <p>
        采用随体 Z–Y–X 顺序。右侧同时给 roll 和 yaw 加 20°，pitch
        保持不变。先观察 60°，再试 pitch = 90°。
      </p>
      <div className="robot-sliders">
        {["roll φ", "pitch θ", "yaw ψ"].map((label, index) => (
          <AngleSlider
            key={label}
            label={label}
            value={angles[index]}
            limit={index === 1 ? 90 : 180}
            onChange={(value) =>
              setAngles(
                angles.map((angle, i) =>
                  i === index ? value : angle,
                ) as Vector3,
              )
            }
          />
        ))}
      </div>
      <div className="robot-matrices">
        <Matrix value={r} label={`原姿态 (${roll}°, ${pitch}°, ${yaw}°)`} />
        <Matrix
          value={shifted}
          label={`对照 (${roll + 20}°, ${pitch}°, ${yaw + 20}°)`}
        />
      </div>
      <p className="robot-status" aria-live="polite">
        矩阵元素的最大差：
        {difference < 1e-12 ? "0（浮点误差范围内）" : fmt(difference, 6)}。
        {difference < 1e-12
          ? "此时只剩 φ − ψ 起作用，两组角度描述同一姿态。"
          : "目前两组角度表示不同姿态。"}
      </p>
      <div className="lab-actions">
        <button className="lab-reset" onClick={() => setAngles([30, 90, 10])}>
          观察 +90° 万向锁
        </button>
        <button className="lab-reset" onClick={() => setAngles([30, 60, 10])}>
          回到 60° 对照
        </button>
      </div>
      <p className="robot-note">
        这里失去的是欧拉角的局部独立性，旋转矩阵仍然有效。−90° 时保持 φ + ψ
        不变才会得到同一姿态。
      </p>
    </section>
  );
}
function ArmPlot({ joints }: { joints: Vector3 }) {
  const { points, pose } = planarForward(joints);
  const px = (x: number) => 190 + 62 * x;
  const py = (y: number) => 188 - 62 * y;
  return (
    <svg
      viewBox="0 0 380 380"
      className="robot-arm"
      role="img"
      aria-label={`三关节机械臂，末端 (${fmt(pose[0])}, ${fmt(pose[1])}) 米，朝向 ${fmt(deg(pose[2]), 1)} 度。空心十字是目标 (1, 1.5)。`}
    >
      {[-2, -1, 0, 1, 2].map((n) => (
        <g key={n} className="robot-grid">
          <path d={`M${px(n)} 26V350M28 ${py(n)}H352`} />
          {n !== 0 && (
            <>
              <text x={px(n)} y={py(0) + 17}>
                {n}
              </text>
              <text x={px(0) + 7} y={py(n) - 5}>
                {n}
              </text>
            </>
          )}
        </g>
      ))}
      <path d={`M28 ${py(0)}H352M${px(0)} 350V26`} className="robot-axis" />
      <text x="350" y={py(0) - 8}>
        x
      </text>
      <text x={px(0) + 8} y="25">
        y
      </text>
      <g className="robot-target">
        <circle cx={px(1)} cy={py(1.5)} r="9" />
        <path d={`M${px(1) - 14} ${py(1.5)}h28M${px(1)} ${py(1.5) - 14}v28`} />
      </g>
      <polyline
        points={points.map(([x, y]) => `${px(x)},${py(y)}`).join(" ")}
        className="robot-links"
      />
      {points.map(([x, y], i) => (
        <circle
          key={i}
          cx={px(x)}
          cy={py(y)}
          r={i === 3 ? 5 : 7}
          className="robot-joint"
        />
      ))}
      <path
        d={`M${px(pose[0])} ${py(pose[1])}l${26 * Math.cos(pose[2])} ${-26 * Math.sin(pose[2])}`}
        className="robot-heading"
      />
      <text x="16" y="370">
        单位：m · 空心十字：目标 · 橙线：末端朝向
      </text>
    </svg>
  );
}
function PoseValues({ joints }: { joints: Vector3 }) {
  const { pose } = planarForward(joints);
  return (
    <div className="lab-values robot-values" aria-live="polite">
      <div>
        <span>末端 x</span>
        <strong>{fmt(pose[0])} m</strong>
      </div>
      <div>
        <span>末端 y</span>
        <strong>{fmt(pose[1])} m</strong>
      </div>
      <div>
        <span>朝向 φ</span>
        <strong>{fmt(deg(pose[2]), 2)}°</strong>
      </div>
    </div>
  );
}
function ForwardLab() {
  const id = useId();
  const [angles, setAngles] = useState<Vector3>([0, -90, 90]);
  const joints = angles.map(rad) as Vector3;
  return (
    <section className="course-lab robotics-lab" aria-labelledby={id}>
      <div className="lab-heading">
        <span>动手算</span>
        <h2 id={id}>转动三个关节，观察末端位姿</h2>
      </div>
      <p>
        杆长固定为 1、1、0.5
        m。每个滑块都是相对前一杆的关节角，逆时针为正；末端朝向是三个角的和。
      </p>
      <div className="robot-arm-layout">
        <ArmPlot joints={joints} />
        <div>
          {angles.map((angle, index) => (
            <AngleSlider
              key={index}
              label={`关节 q${index + 1}`}
              value={angle}
              onChange={(value) =>
                setAngles(
                  angles.map((q, i) => (i === index ? value : q)) as Vector3,
                )
              }
            />
          ))}
          <p className="robot-note">
            先比较解 A 与解 B：末端的位置和朝向相同，中间关节的位置不同。
          </p>
        </div>
      </div>
      <PoseValues joints={joints} />
      <div className="lab-actions">
        <button className="lab-reset" onClick={() => setAngles([0, -90, 90])}>
          课件构型
        </button>
        <button className="lab-reset" onClick={() => setAngles([0, 90, 0])}>
          逆解 A
        </button>
        <button className="lab-reset" onClick={() => setAngles([90, -90, 90])}>
          逆解 B
        </button>
        <button className="lab-reset" onClick={() => setAngles([0, 0, 0])}>
          完全伸直
        </button>
      </div>
    </section>
  );
}
function InverseLab() {
  const id = useId();
  const [history, setHistory] = useState<Vector3[]>([armInitial]);
  const [method, setMethod] = useState("newton");
  const [failure, setFailure] = useState("");
  const joints = history[history.length - 1];
  const error = poseError(planarForward(joints).pose, armTarget);
  const distance = Math.hypot(error[0], error[1]);
  const converged = distance < 1e-6 && Math.abs(error[2]) < 1e-6;
  const exhausted = history.length > 12;
  const delta =
    history.length > 1
      ? joints.map((q, i) => q - history[history.length - 2][i])
      : null;
  function reset(initial: Vector3 = armInitial) {
    setHistory([initial]);
    setFailure("");
  }
  function step() {
    const update = planarInverseStep(
      joints,
      armTarget,
      method === "damped" ? 0.1 : 0,
    );
    if (!update) {
      setFailure(
        "当前雅可比奇异或数值不稳定，无法求这一步普通逆解。可切换阻尼法，或重置到课件初值。",
      );
      return;
    }
    if (Math.hypot(...update) < 1e-10) {
      setFailure(
        "关节更新已停滞，但误差仍未达标。局部迭代没有找到解，请更换初值。",
      );
      return;
    }
    setHistory([...history, joints.map((q, i) => q + update[i]) as Vector3]);
  }
  return (
    <section className="course-lab robotics-lab" aria-labelledby={id}>
      <div className="lab-heading">
        <span>动手算</span>
        <h2 id={id}>每次重算雅可比，再走一步</h2>
      </div>
      <p>
        目标固定为 (1 m, 1.5 m, 90°)。课件初值为 (0°, 60°, 30°)。选择 Newton
        法复现正文；也可以从完全伸直的奇异构型试起。
      </p>
      <label className="robot-method" htmlFor={id + "-method"}>
        迭代方法
        <select
          id={id + "-method"}
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            reset(joints);
          }}
        >
          <option value="newton">Newton：解 J Δq = e</option>
          <option value="damped">阻尼最小二乘：λ = 0.1</option>
        </select>
      </label>
      <div className="robot-arm-layout">
        <ArmPlot joints={joints} />
        <div>
          <dl className="robot-errors">
            <dt>位置误差</dt>
            <dd>{distance.toExponential(3)} m</dd>
            <dt>角度误差</dt>
            <dd>{Math.abs(error[2]).toExponential(3)} rad</dd>
            <dt>当前关节角（rad）</dt>
            <dd>({joints.map((q) => fmt(q, 6)).join(", ")})</dd>
            <dt>已更新</dt>
            <dd>{history.length - 1} 次</dd>
          </dl>
        </div>
      </div>
      <PoseValues joints={joints} />
      <p className="robot-status" role="status">
        {converged
          ? "已收敛：位置误差 < 10⁻⁶ m，角度误差 < 10⁻⁶ rad。"
          : failure ||
            (exhausted
              ? "已达到 12 次上限，误差仍未达标；此次尝试未收敛。"
              : "尚未收敛。点击下一步，对照正文中的 Δq 与新位姿。")}
      </p>
      <div className="lab-actions">
        <button
          className="lab-reset"
          disabled={converged || exhausted || !!failure}
          onClick={step}
        >
          计算下一步
        </button>
        <button className="lab-reset" onClick={() => reset()}>
          重置课件初值
        </button>
        <button className="lab-reset" onClick={() => reset([0, 0, 0])}>
          从完全伸直开始
        </button>
      </div>
      <details className="robot-details">
        <summary>查看当前雅可比与迭代记录</summary>
        <Matrix
          value={planarJacobian(joints)}
          label="当前 J(q)：下一步将使用这个矩阵"
        />
        {delta && (
          <p>上一步 Δq（rad）：({delta.map((q) => fmt(q, 6)).join(", ")})</p>
        )}
        <div className="robot-history">
          <table>
            <thead>
              <tr>
                <th>次数</th>
                <th>q₁ / rad</th>
                <th>q₂ / rad</th>
                <th>q₃ / rad</th>
                <th>位置误差 / m</th>
                <th>角度误差 / rad</th>
              </tr>
            </thead>
            <tbody>
              {history.map((q, i) => {
                const e = poseError(planarForward(q).pose, armTarget);
                return (
                  <tr key={i}>
                    <th>{i}</th>
                    {q.map((v, j) => (
                      <td key={j}>{fmt(v, 6)}</td>
                    ))}
                    <td>{Math.hypot(e[0], e[1]).toExponential(3)}</td>
                    <td>{Math.abs(e[2]).toExponential(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
      <p className="robot-note">
        切换方法会从当前构型重新计数。位置用 m、角度用 rad，数值权重均为
        1；阻尼法每步取全步长。此模型没有关节限位、碰撞和力矩约束，收敛只表示位姿误差达标。
      </p>
    </section>
  );
}
export function RoboticsLab({
  kind,
}: {
  kind: "euler" | "planar-forward" | "planar-inverse";
}) {
  if (kind === "euler") return <EulerLab />;
  if (kind === "planar-forward") return <ForwardLab />;
  return <InverseLab />;
}
