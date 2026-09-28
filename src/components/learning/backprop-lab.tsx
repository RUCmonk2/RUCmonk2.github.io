"use client";

import "./backprop-lab.css";

import { RotateCcw } from "lucide-react";
import { useId, useState } from "react";

import {
  type BackpropScenario,
  canDisplayBackprop,
  evaluateBackprop,
  initialBackpropWeights,
  stepBackprop,
} from "@/lib/math-lab/backprop";

const number = (value: number) =>
  Math.abs(value) >= 10000
    ? value.toExponential(4)
    : String(Number(value.toFixed(6)));

export function BackpropLab() {
  const id = useId();
  const [scenario, setScenario] = useState<BackpropScenario>("linear");
  const [rate, setRate] = useState(0.1);
  const [weights, setWeights] = useState(() =>
    initialBackpropWeights("linear"),
  );
  const [showGradients, setShowGradients] = useState(false);
  const [steps, setSteps] = useState(0);
  const result = evaluateBackprop(weights, scenario);
  const next = stepBackprop(weights, scenario, rate);
  const safe = canDisplayBackprop(next, scenario);

  function reset(nextScenario = scenario) {
    setWeights(initialBackpropWeights(nextScenario));
    setShowGradients(false);
    setSteps(0);
  }

  return (
    <section
      id="backprop-lab"
      className="course-lab backprop-lab"
      aria-labelledby={id + "-title"}
    >
      <div className="lab-heading">
        <span>六个权重 · 一次完整训练</span>
        <h2 id={id + "-title"}>先看前向，再算梯度，最后一起更新</h2>
      </div>
      <p>
        输入固定为 (1, 0.5)，目标为
        4，平方损失带二分之一。下表所有梯度都在同一组当前参数处计算。
      </p>
      <label className="backprop-scenario" htmlFor={id + "-scenario"}>
        <span>网络情境</span>
        <select
          id={id + "-scenario"}
          value={scenario}
          onChange={(event) => {
            const value = event.target.value as BackpropScenario;
            setScenario(value);
            reset(value);
          }}
        >
          <option value="linear">课件中的线性网络</option>
          <option value="relu">ReLU：关闭第一条隐藏支路</option>
        </select>
      </label>
      <label className="lab-slider" htmlFor={id + "-rate"}>
        <span>
          学习率 α <output>{rate.toFixed(2)}</output>
        </span>
        <input
          id={id + "-rate"}
          type="range"
          min="0.01"
          max="0.30"
          step="0.01"
          value={rate}
          onChange={(event) => {
            setRate(Number(event.target.value));
            reset();
          }}
        />
      </label>
      <div className="lab-values" aria-live="polite">
        <div>
          <span>隐藏值 h₁ / h₂</span>
          <strong>
            {number(result.h[0])} / {number(result.h[1])}
          </strong>
        </div>
        <div>
          <span>预测值</span>
          <strong>{number(result.prediction)}</strong>
        </div>
        <div>
          <span>损失 E</span>
          <strong>{number(result.loss)}</strong>
        </div>
        <div>
          <span>已更新</span>
          <strong>{steps} / 12 次</strong>
        </div>
      </div>
      <p className="backprop-state" role="status">
        {showGradients
          ? "反向已完成：先逐行检查梯度，再同步更新六个权重。"
          : "前向已完成：可以先猜每个权重应该增大还是减小，再展开梯度。"}
        {scenario === "relu" &&
          ` 第一支路净输入为 ${number(result.z[0])}，ReLU 导数为 ${result.gates[0]}。`}
      </p>
      <div
        className="backprop-table"
        tabIndex={0}
        role="region"
        aria-label="六个权重与梯度，可横向滚动"
      >
        <table>
          <caption>当前参数 → 反向梯度 → 更新预览（显示至六位小数）</caption>
          <thead>
            <tr>
              <th scope="col">参数</th>
              <th scope="col">当前值</th>
              <th scope="col">损失梯度</th>
              <th scope="col">更新后</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((weight, index) => (
              <tr key={index}>
                <th scope="row">
                  w<sub>{index + 1}</sub>
                </th>
                <td>{number(weight)}</td>
                <td>
                  {showGradients ? number(result.gradients[index]) : "待反向"}
                </td>
                <td>{showGradients && safe ? number(next[index]) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lab-actions">
        <button
          disabled={steps >= 12 || (showGradients && !safe)}
          onClick={() => {
            if (!showGradients) setShowGradients(true);
            else {
              setWeights(next);
              setSteps(steps + 1);
              setShowGradients(false);
            }
          }}
        >
          {showGradients ? "同步更新一步" : "计算反向梯度"}
        </button>
        <button className="lab-reset" onClick={() => reset()}>
          <RotateCcw size={14} aria-hidden="true" /> 重置
        </button>
      </div>
      <small>
        {steps >= 12
          ? "已完成 12 次更新，可重置比较另一种情境。"
          : showGradients && !safe
            ? "下一步数值过大，请减小学习率后重试。"
            : "改变情境或学习率会从初始参数重新开始。试试较大的学习率，观察损失是否每一步都下降。"}
      </small>
    </section>
  );
}
