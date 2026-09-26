"use client";

import { RotateCcw } from "lucide-react";
import { useId, useState } from "react";

function number(value: number) {
  if (Math.abs(value) < 0.00005) return "0";
  return Math.abs(value) >= 10000
    ? value.toExponential(2)
    : String(Number(value.toFixed(4)));
}

function GradientLab() {
  const id = useId();
  const [rate, setRate] = useState(0.1);
  const [history, setHistory] = useState([{ w: 0, b: 0 }]);
  const current = history[history.length - 1];
  const prediction = 2 * current.w + current.b;
  const loss = (prediction - 3) ** 2 / 2;
  const losses = history.map(({ w, b }) => (2 * w + b - 3) ** 2 / 2);
  const ceiling = Math.max(4.5, ...losses);
  const points = losses.map((value, index) => [
    32 + index * 29,
    128 - (value / ceiling) * 100,
  ]);
  const path = points
    .map(([x, y], index) => (index ? "L" : "M") + x + "," + y)
    .join(" ");

  function step() {
    const error = 2 * current.w + current.b - 3;
    setHistory([
      ...history,
      {
        w: current.w - rate * error * 2,
        b: current.b - rate * error,
      },
    ]);
  }

  return (
    <section className="course-lab" aria-labelledby={id + "-title"}>
      <div className="lab-heading">
        <span>动手算</span>
        <h2 id={id + "-title"}>改变学习率，再更新一步</h2>
      </div>
      <p>沿用本节的 x = 2、y = 3。每次都先算梯度，再同步更新 w 和 b。</p>
      <label className="lab-slider" htmlFor={id + "-rate"}>
        <span>
          学习率 α <output>{rate.toFixed(2)}</output>
        </span>
        <input
          id={id + "-rate"}
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={rate}
          onChange={(event) => {
            setRate(Number(event.target.value));
            setHistory([{ w: 0, b: 0 }]);
          }}
        />
      </label>
      <div className="lab-values" aria-live="polite">
        <div>
          <span>w</span>
          <strong>{number(current.w)}</strong>
        </div>
        <div>
          <span>b</span>
          <strong>{number(current.b)}</strong>
        </div>
        <div>
          <span>预测值</span>
          <strong>{number(prediction)}</strong>
        </div>
        <div>
          <span>损失 J</span>
          <strong>{number(loss)}</strong>
        </div>
      </div>
      <svg
        className="lab-loss-plot"
        viewBox="0 0 420 156"
        role="img"
        aria-label={
          "更新 " +
          (history.length - 1) +
          " 次后的损失变化，当前损失 " +
          number(loss)
        }
      >
        <path d="M32 22V128H391" className="lab-grid-line" />
        <path d={path} className="lab-result-line" />
        {points.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="3.5"
            className="lab-result-point"
          />
        ))}
        <text x="32" y="16">
          {number(ceiling)}
        </text>
        <text x="19" y="132">
          0
        </text>
        <text x="30" y="148">
          0 次
        </text>
        <text x="354" y="148">
          12 次更新
        </text>
      </svg>
      <div className="lab-actions">
        <button onClick={step} disabled={history.length >= 13}>
          更新一步 <span>{history.length - 1} / 12</span>
        </button>
        <button
          className="lab-reset"
          onClick={() => setHistory([{ w: 0, b: 0 }])}
        >
          <RotateCcw size={14} aria-hidden="true" /> 重置
        </button>
      </div>
      <small>
        试着比较 α = 0.10 与 α =
        1.00。调整学习率会重置计算；图中纵轴按当前最大损失缩放。
      </small>
    </section>
  );
}

function RotationLab() {
  const id = useId();
  const [angle, setAngle] = useState(0);
  const theta = (angle * Math.PI) / 180;
  const c = Math.cos(theta),
    s = Math.sin(theta);
  const bx = 1.5 * c + 0.5 * s;
  const by = -1.5 * s + 0.5 * c;
  const px = (x: number) => 140 + 55 * x;
  const py = (y: number) => 208 - 55 * y;
  const origin = [px(0.5), py(0.5)];
  const xAxis = [px(0.5 + 1.7 * c), py(0.5 + 1.7 * s)];
  const yAxis = [px(0.5 - 1.7 * s), py(0.5 + 1.7 * c)];

  return (
    <section className="course-lab" aria-labelledby={id + "-title"}>
      <div className="lab-heading">
        <span>转动坐标系</span>
        <h2 id={id + "-title"}>杯子没动，坐标为什么变了？</h2>
      </div>
      <p>
        固定杯子的 A 系坐标为 (2, 1)，B 系原点为 (0.5, 0.5)。只旋转 B
        系，观察杯子的 B 系坐标。
      </p>
      <div className="lab-rotation-layout">
        <svg
          viewBox="0 0 380 320"
          role="img"
          aria-label={
            "B 系逆时针旋转 " +
            angle +
            " 度，杯子在 B 系坐标为 " +
            number(bx) +
            "，" +
            number(by)
          }
        >
          <path d="M30 208H345M140 288V25" className="lab-grid-line" />
          <text x="345" y="227">
            xA
          </text>
          <text x="118" y="28">
            yA
          </text>
          <text x="121" y="226">
            A
          </text>
          <path
            d={"M" + origin + "L" + xAxis + "M" + origin + "L" + yAxis}
            className="lab-result-line"
          />
          <text x={xAxis[0] + 7} y={xAxis[1] - 5}>
            xB
          </text>
          <text x={yAxis[0] + 7} y={yAxis[1] - 5}>
            yB
          </text>
          <circle
            cx={origin[0]}
            cy={origin[1]}
            r="4"
            className="lab-result-point"
          />
          <text x={origin[0] - 15} y={origin[1] + 20}>
            B
          </text>
          <path
            d={"M" + origin + "L" + px(2) + "," + py(1)}
            className="lab-dashed-line"
          />
          <circle cx={px(2)} cy={py(1)} r="7" className="lab-fixed-point" />
          <text x={px(2) + 12} y={py(1) + 4}>
            P (2, 1)
          </text>
          <text x="30" y="308">
            A、B：参考坐标系 · P：固定的点
          </text>
        </svg>
        <div className="lab-coordinate-result" aria-live="polite">
          <span>杯子在 B 系中的坐标</span>
          <strong>
            ({number(bx)}, {number(by)})
          </strong>
          <p>pB = Rᵀ (pA − t)</p>
          <small>先减去原点偏移，再按相反方向旋转。</small>
        </div>
      </div>
      <label className="lab-slider" htmlFor={id + "-angle"}>
        <span>
          B 系逆时针旋转 <output>{angle}°</output>
        </span>
        <input
          id={id + "-angle"}
          type="range"
          min="0"
          max="360"
          step="1"
          value={angle}
          onChange={(event) => setAngle(Number(event.target.value))}
        />
      </label>
      <button className="lab-reset" onClick={() => setAngle(0)}>
        <RotateCcw size={14} aria-hidden="true" /> 回到 0°
      </button>
    </section>
  );
}

export function CourseLab({ kind }: { kind: "gradient" | "rotation" }) {
  return kind === "gradient" ? <GradientLab /> : <RotationLab />;
}
