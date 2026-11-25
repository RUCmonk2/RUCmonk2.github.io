"use client";

import { useEffect, useRef } from "react";

import { FFT_FOLDS, FFT_SIZE, type FftLayers } from "@/lib/math-lab/fft";

const tau = Math.PI * 2;
const spacing = tau / FFT_SIZE;
const colors = {
  teal: "#6ce5d4",
  orange: "#ff9e77",
  gold: "#f4d18a",
  dim: "#778b9c",
  ring: "#293948",
};
const width = 500;
const height = 408;
const cx = width / 2;
const cy = height / 2 + 3;
const radius = 155;
const tilt = 0.94;

type DiskProps = {
  layers: FftLayers;
  step: number;
  pair: number;
  bin: number;
  label: string;
};

function point(r: number, theta: number, lift = 0) {
  return [
    cx + r * Math.cos(theta),
    cy - r * Math.sin(theta) * tilt - lift,
  ] as const;
}

function line(
  ctx: CanvasRenderingContext2D,
  a: readonly [number, number],
  b: readonly [number, number],
  color: string,
  size = 1,
) {
  ctx.beginPath();
  ctx.moveTo(...a);
  ctx.lineTo(...b);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
}

function ring(ctx: CanvasRenderingContext2D, r: number, color: string) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, r, r * tilt, 0, 0, tau);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function disc(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, tau);
  ctx.fillStyle = color;
  ctx.fill();
}

function mark(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
) {
  ctx.font = "16px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function signalSector(
  ctx: CanvasRenderingContext2D,
  theta: number,
  color: string,
) {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.ellipse(
    cx,
    cy,
    radius,
    radius * tilt,
    0,
    -theta - spacing / 2,
    -theta + spacing / 2,
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function callout(
  ctx: CanvasRenderingContext2D,
  dot: readonly [number, number],
  moving: boolean,
  combined: boolean,
  angle: number,
  color: string,
) {
  const name = combined ? (moving ? "A − WB" : "A + WB") : moving ? "B" : "A";
  const x = Math.min(
    width - 47,
    Math.max(
      47,
      dot[0] + (combined ? (moving ? 58 : -58) : 33 * Math.cos(angle)),
    ),
  );
  const y = Math.min(
    height - 17,
    Math.max(
      17,
      dot[1] + (combined ? (moving ? -27 : 34) : -35 * Math.sin(angle)),
    ),
  );
  const direction = Math.atan2(y - dot[1], x - dot[0]);
  const edge = [
    dot[0] + 7 * Math.cos(direction),
    dot[1] + 7 * Math.sin(direction),
  ] as const;
  line(ctx, edge, [x, y], "#101d28", 4);
  line(ctx, edge, [x, y], color, 1.7);
  ctx.font = "600 16px ui-monospace, monospace";
  const labelWidth = ctx.measureText(name).width + 15;
  ctx.beginPath();
  ctx.roundRect(x - labelWidth / 2, y - 13, labelWidth, 26, 4);
  ctx.fillStyle = "#101d28";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(name, x, y + 1);
}

function guides(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, width, height);
  ring(ctx, radius + 32, "#344759");
  ring(ctx, radius + 20, "#243442");
  ring(ctx, radius, colors.ring);
  ring(ctx, radius - 36, "#243442");
  ring(ctx, radius - 72, "#243442");
  for (let n = 0; n < FFT_SIZE; n += 1) {
    const theta = Math.PI / 2 + n * spacing;
    line(
      ctx,
      point(radius + 24, theta),
      point(radius + (n % 4 ? 27 : 32), theta),
      "#516476",
    );
    if (n % 4 === 0)
      line(ctx, point(13, theta), point(radius - 36, theta), "#1f2f3d");
  }
  disc(ctx, cx, cy, 2.5, "#536577");
}

function drawSpectrum(
  ctx: CanvasRenderingContext2D,
  output: FftLayers[number][number],
  bin: number,
) {
  const strengths = output.map(([re, im]) => Math.hypot(re, im));
  const max = Math.max(...strengths, 1);
  for (let k = 0; k < FFT_SIZE; k += 1) {
    const theta = Math.PI / 2 + k * spacing;
    const color =
      k === bin ? colors.gold : k <= FFT_SIZE / 2 ? colors.teal : colors.orange;
    const hasAmplitude = strengths[k] > 1e-10;
    const tip = radius + (hasAmplitude ? (strengths[k] / max) * 49 : 0);
    ctx.globalAlpha = k === bin ? 1 : hasAmplitude ? 0.86 : 0.45;
    if (hasAmplitude) {
      line(
        ctx,
        point(radius, theta),
        point(tip, theta),
        color,
        k === bin ? 3 : 1.6,
      );
    }
    disc(
      ctx,
      ...point(tip, theta),
      k === bin ? 4 : hasAmplitude ? 2.5 : 1.6,
      color,
    );
  }
  ctx.globalAlpha = 1;
  mark(ctx, `k = ${bin}`, cx, cy + 25, colors.gold);
}

function drawFold(
  ctx: CanvasRenderingContext2D,
  { layers, step, pair, bin }: DiskProps,
  amount: number,
) {
  guides(ctx);
  if (step > FFT_FOLDS) {
    drawSpectrum(ctx, layers[FFT_FOLDS][0], bin);
    return;
  }

  const level = Math.max(0, step - 1);
  const stations = layers[level].length;
  const half = stations / 2;
  const terms = layers[level][0].length;
  const values = layers[level];
  const outputs = layers[level + 1];
  const center =
    Math.PI / 2 -
    ((stations - 1) * spacing) / 2 +
    (half * spacing * amount) / 2;
  const maxValue = Math.max(
    1,
    ...values.flat().map(([re, im]) => Math.hypot(re, im)),
  );

  const annotations: {
    dot: readonly [number, number];
    moving: boolean;
    angle: number;
    color: string;
  }[] = [];

  for (let j = 0; j < stations; j += 1) {
    const moving = j >= half;
    const selected = j % half === pair;
    const color = moving ? colors.orange : colors.teal;
    const initial = center + j * spacing;
    const theta = initial - (moving ? half * spacing * amount : 0);
    const lift = moving ? Math.sin(Math.PI * amount) * (selected ? 40 : 24) : 0;
    const stack = Math.min(44, (terms - 1) * 3);
    const base = point(radius - 10, theta, lift + (moving ? 13 * amount : 0));

    ctx.globalAlpha = selected ? 0.13 : 0.032;
    signalSector(ctx, theta, color);
    ctx.globalAlpha = selected ? 0.65 : 0.14;
    line(ctx, [cx, cy], base, color);
    if (moving && amount > 0 && amount < 1) {
      ctx.beginPath();
      for (let t = 0; t <= 16; t += 1) {
        const progress = (t / 16) * amount;
        const p = point(
          radius - 10,
          initial - half * spacing * progress,
          Math.sin(Math.PI * progress) * 24 + 13 * progress,
        );
        if (t === 0) ctx.moveTo(...p);
        else ctx.lineTo(...p);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = selected ? 2 : 1;
      ctx.stroke();
    }

    ctx.globalAlpha = selected ? 1 : 0.66;
    const marks = Math.min(terms, selected ? 8 : 4);
    for (let markIndex = 0; markIndex < marks; markIndex += 1) {
      const q = selected ? (bin + markIndex) % terms : markIndex;
      const resultIndex = moving ? terms + q : q;
      const [re, im] =
        amount >= 1 ? outputs[j % half][resultIndex] : values[j][q];
      const y = base[1] - (markIndex * stack) / marks;
      const r =
        selected && markIndex === 0
          ? 6
          : 2.8 + Math.min(2, Math.hypot(re, im) / maxValue);
      disc(ctx, base[0], y, r, color);
      if (selected && markIndex === 0 && Math.hypot(re, im) > 0.000001) {
        const rotating = moving && amount < 1;
        const phase =
          Math.atan2(im, re) - (rotating ? (Math.PI * q * amount) / terms : 0);
        line(
          ctx,
          [base[0], y],
          [base[0] + 10 * Math.cos(phase), y - 10 * Math.sin(phase)],
          "#fff5df",
          1.5,
        );
      }
    }

    if (selected) {
      if (step === 0) mark(ctx, String(j), ...point(radius + 43, theta), color);
      else annotations.push({ dot: base, moving, angle: theta, color });
    }
  }

  ctx.globalAlpha = 1;
  for (const { dot, moving, angle, color } of annotations) {
    callout(ctx, dot, moving, amount >= 1, angle, color);
  }
  mark(
    ctx,
    `${amount >= 1 ? half : stations} × ${amount >= 1 ? 2 * terms : terms}`,
    cx,
    cy + 24,
    colors.dim,
  );
}

export function FftDisk(props: DiskProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const lastStep = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isFold = props.step > 0 && props.step <= FFT_FOLDS;
    const shouldAnimate = isFold && props.step !== lastStep.current;
    lastStep.current = props.step;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    const start = performance.now();

    const paint = (now: number) => {
      const elapsed =
        motion.matches || !shouldAnimate ? 1 : Math.min(1, (now - start) / 950);
      const amount = isFold ? (1 - Math.cos(elapsed * Math.PI)) / 2 : 0;
      drawFold(ctx, props, amount);
      if (shouldAnimate && elapsed < 1) frame = requestAnimationFrame(paint);
    };

    paint(start);
    return () => cancelAnimationFrame(frame);
  }, [props]);

  return (
    <canvas
      ref={ref}
      className="fft-disk"
      width={width}
      height={height}
      role="img"
      aria-label={props.label}
    />
  );
}
