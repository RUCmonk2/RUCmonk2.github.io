import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react";

import type { Note } from "./notes";

export function StepControls({
  english,
  step,
  count,
  setStep,
}: {
  english: boolean;
  step: number;
  count: number;
  setStep: (value: number) => void;
}) {
  return (
    <div className="algo-stepper">
      <label className="algo-track">
        <span>
          {english ? "Step" : "步骤"}{" "}
          <strong>
            {step + 1} / {count}
          </strong>
        </span>
        <input
          type="range"
          min={0}
          max={count - 1}
          value={step}
          onChange={(event) => setStep(event.currentTarget.valueAsNumber)}
          aria-label={english ? "Step slider" : "步骤滑块"}
        />
      </label>
      <div className="algo-step-buttons">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {english ? "Previous" : "上一步"}
        </button>
        <button
          type="button"
          className="algo-primary"
          disabled={step === count - 1}
          onClick={() => setStep(step + 1)}
        >
          {english ? "Next step" : "下一步"}
          <ArrowRight size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          disabled={step === count - 1}
          onClick={() => setStep(count - 1)}
        >
          {english ? "Result" : "看结果"}
          <SkipForward size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function MethodNote({
  note,
  english,
}: {
  note: Note;
  english: boolean;
}) {
  const lang = english ? "en" : "zh";
  return (
    <section id="pseudocode" className="algo-note">
      <div>
        <h2>{english ? "Pseudocode and reasoning" : "伪代码与算理"}</h2>
        <p>{note.why[lang]}</p>
        {note.source && (
          <a href={note.source.url}>
            {note.source.label} <ArrowRight size={13} aria-hidden="true" />
          </a>
        )}
      </div>
      <pre
        tabIndex={0}
        aria-label={english ? "Algorithm pseudocode" : "算法伪代码"}
      >
        <code>
          {note.code.split("\n").map((line, index) => (
            <span
              key={index}
              style={{
                paddingInlineStart: `${line.length - line.trimStart().length + 2}ch`,
                textIndent: `-${line.length - line.trimStart().length + 2}ch`,
              }}
            >
              {line || "\u00a0"}
            </span>
          ))}
        </code>
      </pre>
    </section>
  );
}
