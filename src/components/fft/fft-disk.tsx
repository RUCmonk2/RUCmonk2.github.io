"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import {
  type Complex,
  type FftLayers,
  formatComplex,
} from "@/lib/math-lab/fft";

const tau = Math.PI * 2;
const paper = {
  teal: "#315e53",
  orange: "#9c4635",
  gold: "#855e25",
  dim: "#4d6158",
  ring: "#b9c4b5",
  grid: "#c9d0c3",
  tick: "#829485",
  surface: "#faf7ef",
  needle: "#fff9ef",
};
const ink = {
  teal: "#92cdba",
  orange: "#eda68e",
  gold: "#f0cc8c",
  dim: "#b3c1b4",
  ring: "#485d50",
  grid: "#384b41",
  tick: "#7e9484",
  surface: "#20332b",
  needle: "#1a3027",
};
type Palette = typeof paper;
const width = 500;
const height = 350;
const cx = width / 2;
const cy = height / 2 + 3;
const radius = 117;
const tilt = 0.94;

type DiskState = { layers: FftLayers; step: number; pair: number; bin: number };
type DiskProps = DiskState & { label: string; replay: number };

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
  spacing: number,
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
  colors: Palette,
  value?: Complex,
) {
  const symbol = combined ? (moving ? "a − Wb" : "a + Wb") : moving ? "b" : "a";
  const name = value ? `${symbol} = ${formatComplex(value, 6)}` : symbol;
  ctx.font = "600 16px ui-monospace, monospace";
  const labelWidth = ctx.measureText(name).width + 15;
  const inset = labelWidth / 2 + 6;
  const x = Math.min(
    width - inset,
    Math.max(
      inset,
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
  line(ctx, edge, [x, y], colors.surface, 5);
  line(ctx, edge, [x, y], color, 1.7);
  ctx.beginPath();
  ctx.roundRect(x - labelWidth / 2, y - 13, labelWidth, 26, 4);
  ctx.fillStyle = colors.surface;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(name, x, y + 1);
}

function guides(ctx: CanvasRenderingContext2D, size: number, colors: Palette) {
  ctx.clearRect(0, 0, width, height);
  ring(ctx, radius + 29, colors.ring);
  ring(ctx, radius + 15, colors.grid);
  ring(ctx, radius, colors.ring);
  ring(ctx, radius - 37, colors.grid);
  ring(ctx, radius - 70, colors.grid);
  for (let n = 0; n < size; n += 1) {
    const theta = Math.PI / 2 + (n * tau) / size;
    line(
      ctx,
      point(radius + 23, theta),
      point(radius + (n % 4 ? 26 : 29), theta),
      colors.tick,
    );
  }
  disc(ctx, cx, cy, 2.5, colors.tick);
}

function drawSpectrum(
  ctx: CanvasRenderingContext2D,
  output: FftLayers[number][number],
  bin: number,
  colors: Palette,
) {
  const strengths = output.map(([re, im]) => Math.hypot(re, im));
  const max = Math.max(...strengths) || 1;
  const size = output.length;
  for (let k = 0; k < size; k += 1) {
    const theta = Math.PI / 2 + (k * tau) / size;
    const color =
      k === bin ? colors.gold : k <= size / 2 ? colors.teal : colors.orange;
    const hasAmplitude = strengths[k] > max * 1e-10;
    const tip = radius + (hasAmplitude ? (strengths[k] / max) * 27 : 0);
    ctx.globalAlpha = k === bin ? 1 : hasAmplitude ? 0.86 : 0.45;
    if (hasAmplitude)
      line(
        ctx,
        point(radius, theta),
        point(tip, theta),
        color,
        k === bin ? 3 : 1.6,
      );
    disc(
      ctx,
      ...point(tip, theta),
      k === bin ? 5 : hasAmplitude ? 3 : 1.8,
      color,
    );
    if (size === 4) mark(ctx, String(k), ...point(radius + 49, theta), color);
  }
  ctx.globalAlpha = 1;
  mark(ctx, `k = ${bin}`, cx, cy + 11, colors.gold);
}

function drawFold(
  ctx: CanvasRenderingContext2D,
  { layers, step, pair, bin }: DiskState,
  amount: number,
  colors: Palette,
) {
  const size = layers[0].length;
  const folds = layers.length - 1;
  const spacing = tau / size;
  guides(ctx, size, colors);
  if (step > folds) {
    drawSpectrum(ctx, layers[folds][0], bin, colors);
    return;
  }

  const level = Math.max(0, step - 1);
  const stations = layers[level].length;
  const half = stations / 2;
  const terms = layers[level][0].length;
  const values = layers[level];
  const outputs = layers[level + 1];
  const center =
    size === 4
      ? Math.PI / 2
      : Math.PI / 2 -
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
    value?: Complex;
  }[] = [];

  for (let j = 0; j < stations; j += 1) {
    const moving = j >= half;
    const selected = j % half === pair;
    const color = moving ? colors.orange : colors.teal;
    const initial = center + j * spacing;
    const theta = initial - (moving ? half * spacing * amount : 0);
    const lift = moving ? Math.sin(Math.PI * amount) * (selected ? 40 : 24) : 0;
    const stack = Math.min(44, (terms - 1) * 3);
    const origin = point(radius - 10, theta, lift + (moving ? 14 * amount : 0));
    const base =
      size === 4 && amount >= 1
        ? ([
            origin[0] + (moving ? 9 : -9),
            origin[1] + (moving ? 0 : 5),
          ] as const)
        : origin;

    ctx.globalAlpha = selected ? 0.13 : 0.032;
    signalSector(ctx, theta, color, spacing);
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
          colors.needle,
          1.5,
        );
      }
    }

    if (size === 4 && amount >= 1 && !moving) {
      mark(ctx, `j=${j}`, ...point(radius + 39, theta), colors.dim);
    }
    if (step === 0 && (size === 4 || selected)) {
      ctx.globalAlpha = selected ? 1 : 0.85;
      const label =
        size === 4 ? `x[${j}] = ${formatComplex(values[j][0], 6)}` : String(j);
      mark(ctx, label, ...point(radius + (size === 4 ? 39 : 43), theta), color);
    } else if (selected) {
      const value =
        amount >= 1
          ? outputs[j % half][(moving ? terms : 0) + bin]
          : values[j][bin];
      annotations.push({
        dot: base,
        moving,
        angle: theta,
        color,
        value: size === 4 ? value : undefined,
      });
    }
  }

  ctx.globalAlpha = 1;
  for (const { dot, moving, angle, color, value } of annotations) {
    callout(ctx, dot, moving, amount >= 1, angle, color, colors, value);
  }
  mark(
    ctx,
    `${amount >= 1 ? half : stations} × ${amount >= 1 ? 2 * terms : terms}`,
    cx,
    cy + 24,
    colors.dim,
  );
}

export function FftDisk({ layers, step, pair, bin, label, replay }: DiskProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const lastFrame = useRef({ step: 0, replay: 0 });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isFold = step > 0 && step < layers.length;
    const shouldAnimate =
      isFold &&
      (step !== lastFrame.current.step || replay !== lastFrame.current.replay);
    lastFrame.current = { step: step, replay: replay };
    const colors = resolvedTheme === "dark" ? ink : paper;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    const start = performance.now();

    const paint = (now: number) => {
      const elapsed =
        motion.matches || !shouldAnimate ? 1 : Math.min(1, (now - start) / 950);
      const amount = isFold ? (1 - Math.cos(elapsed * Math.PI)) / 2 : 0;
      drawFold(ctx, { layers, step, pair, bin }, amount, colors);
      if (shouldAnimate && elapsed < 1) frame = requestAnimationFrame(paint);
    };

    paint(start);
    return () => cancelAnimationFrame(frame);
  }, [layers, step, pair, bin, replay, resolvedTheme]);

  return (
    <canvas
      ref={ref}
      className="fft-disk"
      width={width}
      height={height}
      role="img"
      aria-label={label}
    />
  );
}
