"use client";

import { useMemo, useState } from "react";

import {
  luExample,
  matrixEntry,
  type MatrixPanel,
  multiplySteps,
  pivotedLU,
  svdSteps,
} from "@/lib/math-lab/matrix-algorithms";

import { matrixNotes } from "./notes";
import { MethodNote, StepControls } from "./shared";

type Method = keyof typeof matrixNotes;
const labels: Record<Method, { zh: string; en: string }> = {
  multiply: { zh: "矩阵乘法", en: "Multiplication" },
  lu: { zh: "LU 分解", en: "LU factorization" },
  svd: { zh: "SVD 分解", en: "Singular value decomposition" },
};

function Grid({ panel }: { panel: MatrixPanel }) {
  return (
    <figure className="algo-matrix">
      <figcaption>
        <strong>{panel.name}</strong>
        <small>
          {panel.values.length} × {panel.values[0].length}
        </small>
      </figcaption>
      <div className="algo-matrix-brackets">
        <table aria-label={panel.name}>
          <tbody>
            {panel.values.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => {
                  const selected =
                    (panel.row === undefined || i === panel.row) &&
                    (panel.column === undefined || j === panel.column) &&
                    (panel.row !== undefined || panel.column !== undefined);
                  return (
                    <td key={j} data-selected={selected}>
                      {matrixEntry(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function MatrixWorkshop({ english }: { english: boolean }) {
  const [method, setMethod] = useState<Method>("multiply");
  const [cell, setCell] = useState(0);
  const [rank, setRank] = useState<1 | 2>(1);
  const [step, setStep] = useState(0);
  const steps = useMemo(
    () =>
      method === "multiply"
        ? multiplySteps(Math.floor(cell / 2), cell % 2)
        : method === "lu"
          ? pivotedLU(luExample).steps
          : svdSteps(rank).steps,
    [method, cell, rank],
  );
  const state = steps[step],
    note = matrixNotes[method],
    lang = english ? "en" : "zh";
  return (
    <>
      <section
        className="algo-notebook"
        aria-label={
          english ? "Interactive matrix calculations" : "矩阵运算实验"
        }
      >
        <div className="algo-toolbar">
          <div
            className="algo-choices"
            role="group"
            aria-label={english ? "Choose a calculation" : "选择运算"}
          >
            {(Object.keys(labels) as Method[]).map((id) => (
              <button
                type="button"
                key={id}
                aria-pressed={id === method}
                onClick={() => {
                  setMethod(id);
                  setStep(0);
                }}
              >
                {labels[id][lang]}
              </button>
            ))}
          </div>
          {method === "multiply" && (
            <div
              className="algo-choices"
              role="group"
              aria-label={
                english ? "Choose a result cell" : "选择输出矩阵单元格"
              }
            >
              {[0, 1, 2, 3].map((i) => (
                <button
                  type="button"
                  key={i}
                  aria-pressed={cell === i}
                  onClick={() => {
                    setCell(i);
                    setStep(0);
                  }}
                >
                  C[{Math.floor(i / 2) + 1},{(i % 2) + 1}]
                </button>
              ))}
            </div>
          )}
          {method === "svd" && (
            <div
              className="algo-choices"
              role="group"
              aria-label={english ? "Reconstruction rank" : "重构的秩"}
            >
              {([1, 2] as const).map((i) => (
                <button
                  type="button"
                  key={i}
                  aria-pressed={rank === i}
                  onClick={() => {
                    setRank(i);
                    setStep(steps.length - 1);
                  }}
                >
                  {english ? `Rank ${i}` : `秩 ${i}`}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="algo-definition">
          <p>{note.definition[lang]}</p>
          <code>
            {typeof note.cost === "string" ? note.cost : note.cost[lang]}
          </code>
        </div>
        <StepControls
          english={english}
          step={step}
          count={steps.length}
          setStep={setStep}
        />
        <section className="algo-matrix-stage" aria-live="polite">
          <h2>{state.title[lang]}</h2>
          <p>{state.detail[lang]}</p>
          {state.equation && (
            <div className="algo-equation">{state.equation}</div>
          )}
          <div className="algo-matrix-grid">
            {state.panels.map((panel) => (
              <Grid key={panel.name} panel={panel} />
            ))}
          </div>
        </section>
      </section>
      <MethodNote note={note} english={english} />
    </>
  );
}
