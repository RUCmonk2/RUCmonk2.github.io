import { ArrowRight } from "lucide-react";

const center = 96;
const radius = 64;
const stationNumbers = [0, 1, 2, 3, 4, 5, 6, 7];

function point(degrees: number, r: number) {
  const radians = (degrees * Math.PI) / 180;
  return [
    center + r * Math.cos(radians),
    center - r * Math.sin(radians),
  ] as const;
}

function station(index: number) {
  return point(90 - 45 * index, radius - 9);
}

function arc(from: number, to: number, r: number) {
  return `M ${point(from, r).join(" ")} A ${r} ${r} 0 ${Math.abs(to - from) > 180 ? 1 : 0} ${to < from ? 1 : 0} ${point(to, r).join(" ")}`;
}

function sector(from: number, to: number) {
  return `${arc(from, to, radius)} L ${center} ${center} Z`;
}

function ArrowHead({ id }: { id: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 Z" fill="context-stroke" />
    </marker>
  );
}

function Disk({
  type,
  count = 8,
}: {
  type: "original" | "paired" | "fold";
  count?: number;
}) {
  const active = count / 2;
  const split = 112.5 - active * 45;
  const arrowId = `fft-fan-arrow-${count}`;
  const paired = type === "paired";
  const original = type === "original";
  return (
    <svg viewBox="0 0 192 192" aria-hidden="true">
      {original ? (
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="fft-figure-ink-fill"
        />
      ) : (
        <path d={sector(112.5, split)} className="fft-figure-ink-fill" />
      )}
      {type === "fold" && (
        <path
          d={sector(split, split - active * 45)}
          className="fft-figure-red-fill"
        />
      )}
      <circle
        cx={center}
        cy={center}
        r={radius}
        className="fft-figure-outline"
        strokeDasharray={original ? undefined : "3 4"}
      />
      {(original || paired) &&
        stationNumbers.slice(0, active).map((index) => {
          const [x1, y1] = station(index);
          const [x2, y2] = paired ? [center, center] : station(index + active);
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="fft-figure-axis"
            />
          );
        })}
      {stationNumbers.slice(0, paired ? active : count).map((index) => {
        const [x, y] = station(index);
        const moving = index >= active;
        return (
          <g
            key={index}
            transform={`translate(${x} ${y})`}
            className={moving ? "fft-figure-moving" : undefined}
          >
            {paired ? (
              <rect x="-16" y="-10" width="32" height="20" rx="4" />
            ) : (
              <circle r="10" />
            )}
            <text textAnchor="middle" dominantBaseline="central">
              {paired ? (
                <>
                  {index}
                  <tspan className="fft-figure-red-text">
                    ,{index + active}
                  </tspan>
                </>
              ) : (
                index
              )}
            </text>
          </g>
        );
      })}
      {type === "fold" && (
        <>
          <defs>
            <ArrowHead id={arrowId} />
          </defs>
          <path
            d={arc(90 - 45 * active, 88, radius + 12)}
            className="fft-figure-red-stroke"
            markerEnd={`url(#${arrowId})`}
          />
        </>
      )}
    </svg>
  );
}

function Butterfly() {
  return (
    <svg
      viewBox="0 0 460 134"
      role="img"
      aria-label="偶组 E[q] 给出 a。奇组 O[q] 先乘 W 得 t。两个输出分别是 a 加 t 和 a 减 t。"
    >
      <defs>
        <ArrowHead id="fft-butterfly-arrow" />
      </defs>
      <g fill="none" markerEnd="url(#fft-butterfly-arrow)">
        <path className="fft-figure-ink-stroke" d="M104 36 H343" />
        <path className="fft-figure-ink-stroke" d="M104 37 L343 99" />
        <path className="fft-figure-ink-stroke" d="M237 100 L343 38" />
        <path className="fft-figure-red-stroke" d="M104 102 H148" />
        <path className="fft-figure-red-stroke" d="M237 102 H343" />
      </g>
      <g
        className="fft-figure-box"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <rect x="8" y="18" width="96" height="36" rx="6" />
        <text x="56" y="36">
          a = E[q]
        </text>
        <rect
          className="fft-figure-warm-box"
          x="8"
          y="84"
          width="96"
          height="36"
          rx="6"
        />
        <text x="56" y="102">
          b = O[q]
        </text>
        <rect x="151" y="84" width="86" height="36" rx="6" />
        <text x="194" y="102">
          t = Wb
        </text>
        <rect x="346" y="18" width="106" height="36" rx="6" />
        <text x="399" y="36">
          X[q] = a + t
        </text>
        <rect
          className="fft-figure-warm-box"
          x="346"
          y="84"
          width="106"
          height="36"
          rx="6"
        />
        <text x="399" y="102">
          X[q+m] = a − t
        </text>
      </g>
    </svg>
  );
}

function Rotation() {
  return (
    <svg
      viewBox="0 0 330 168"
      role="img"
      aria-label="在复平面上，−2 在负实轴上，顺时针旋转 90 度到正虚轴的 2i。"
    >
      <defs>
        <ArrowHead id="fft-rotation-arrow" />
      </defs>
      <g markerEnd="url(#fft-rotation-arrow)">
        <path d="M18 119 H296" className="fft-figure-axis" />
        <path d="M149 144 V12" className="fft-figure-axis" />
        <path d="M149 119 H63" className="fft-figure-red-stroke" />
        <path d="M149 119 V33" className="fft-figure-ink-stroke" />
        <path
          d="M112 119 A37 37 0 0 1 147 82"
          className="fft-figure-red-stroke"
          strokeDasharray="3 4"
        />
      </g>
      <text x="300" y="123">
        Re
      </text>
      <text x="157" y="20">
        Im
      </text>
      <text x="59" y="141" className="fft-figure-red-text">
        b = −2
      </text>
      <text x="158" y="46">
        t = 2i
      </text>
      <text x="178" y="85">
        × (−i) · 顺时针 90°
      </text>
    </svg>
  );
}

export function FftHandoutDiagram({ name }: { name: string }) {
  switch (name) {
    case "butterfly":
      return (
        <figure className="fft-web-figure fft-figure-butterfly">
          <Butterfly />
          <figcaption>
            图 1 · 一只蝶形。相加与相减使用同一个旋转结果 <var>t</var>。
          </figcaption>
        </figure>
      );
    case "disk":
      return (
        <figure className="fft-web-figure">
          <div className="fft-figure-disks fft-figure-disks-pair">
            <div>
              <Disk type="original" />
              <p>折前 · 圆周相对的两点配一组</p>
            </div>
            <div>
              <Disk type="paired" />
              <p>折后 · 4 个站点，每站两项</p>
            </div>
          </div>
          <figcaption>
            图 2 · 8 点圆盘的第一次折叠。折后各站的原采样下标为
            (0,4)、(1,5)、(2,6)、(3,7)。
          </figcaption>
        </figure>
      );
    case "shape":
      return (
        <figure className="fft-web-figure">
          <ol className="fft-figure-shape" aria-label="8 点 FFT 的四层矩阵形状">
            {["8 × 1", "4 × 2", "2 × 4", "1 × 8"].map((shape, index) => (
              <li key={shape}>
                {index > 0 && <ArrowRight aria-hidden="true" size={15} />}
                <div>
                  <var>
                    B<sub>{index}</sub>
                  </var>
                  <span>{shape}</span>
                </div>
              </li>
            ))}
          </ol>
          <figcaption>
            图 3 · 第一折、第二折和第三折每次让行数减半、列数加倍。每层恰好有 8
            个复数。
          </figcaption>
        </figure>
      );
    case "folds":
      return (
        <figure className="fft-web-figure">
          <div className="fft-figure-disks fft-figure-disks-folds">
            {[
              { count: 8, angle: 180, pairs: "4 → 0" },
              { count: 4, angle: 90, pairs: "2 → 0" },
              { count: 2, angle: 45, pairs: "1 → 0" },
            ].map(({ count, angle, pairs }, index) => (
              <div key={count}>
                <Disk type="fold" count={count} />
                <p>
                  <strong>
                    第 {index + 1} 折 · {angle}°
                  </strong>
                  <br />
                  <span>示例 {pairs}</span>
                </p>
              </div>
            ))}
          </div>
          <figcaption>
            图 4 · 每图画折前站点。朱砂区移向绿区，箭头追踪叠到站点 0
            的一对。下表列出每折的全部配对。
          </figcaption>
        </figure>
      );
    case "rotation":
      return (
        <figure className="fft-web-figure fft-figure-rotation">
          <Rotation />
          <figcaption>
            图 5 · 第 2 折的第 1 列。−2 的方向从 π 变成 π/2，长度仍是 2。
          </figcaption>
        </figure>
      );
    default:
      throw new Error(`Unknown FFT diagram: ${name}`);
  }
}
