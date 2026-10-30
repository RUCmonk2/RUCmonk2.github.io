import type { ReactNode } from "react";

import styles from "./mock-exam.module.css";

function Frame({
  description,
  children,
  caption,
  height = 260,
}: {
  description: string;
  children: ReactNode;
  caption?: string;
  height?: number;
}) {
  return (
    <figure className={styles.diagram}>
      <svg viewBox={`0 0 590 ${height}`} role="img" aria-label={description}>
        {children}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
const stroke = "currentColor";
const accent = "var(--note-accent)";

export function MockExamDiagram({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const descriptions: Record<string, string> = {
    sym3: "A、B在x轴两侧距O均为a，均带+Q；C在O上方距O为a，带−Q。",
    equipotential:
      "四条竖直等势线在x为0、1、3、6厘米处，电势依次30、20、10、0伏；P在0.5厘米，R在2厘米。",
    phix: "电势位置图由折线连接(0米,0伏)、(1米,30伏)、(3米,10伏)。",
    trajectory:
      "匀强电场向右，粒子从M向N运动；M处切线竖直向下，N处切线向右下。",
    beam: "左侧加速区左正右负；右侧偏转区上负下正，正粒子从中线向右射入。仅画题设m粒子的轨迹，出口偏移d/4。",
    capacitor_experiment:
      "平行竖直极板左正右负，间距d，正对面积S。静电计两端分别接到两极板，已标定为电压；电源已完全断开。",
    potential_rectangle:
      "矩形A左下、B右下、C右上、D左上，宽高比3比4。AB为0.30米，AD为0.40米；A、B、D电势分别60、30、20伏。x向右，y向上。",
    charged_pendulum:
      "悬点O在上方，A在正下方，P在右下方；OP与竖直向下夹角37度，OA和OP长度均0.80米。电场向右。",
    deflection_screen:
      "正粒子从O向右射入上负下正的平行板，板长0.10米、间距0.040米。屏在极板右端再向右0.20米处，屏与中线交于C。",
  };
  description = descriptions[name] ?? description;
  switch (name) {
    case "sym3":
      return (
        <Frame description={description} height={260}>
          <path
            d="M 80 195 H 515 M 295 228 V 25"
            fill="none"
            stroke={stroke}
            opacity=".4"
          />
          <path d="M 145 189 V 201 M 445 189 V 201" stroke={stroke} />
          <circle cx="145" cy="195" r="8" fill={accent} />
          <circle cx="445" cy="195" r="8" fill={accent} />
          <circle cx="295" cy="45" r="8" fill={accent} />
          <circle cx="295" cy="195" r="4" fill={stroke} />
          <text x="145" y="171" textAnchor="middle">
            A（+Q）
          </text>
          <text x="445" y="171" textAnchor="middle">
            B（+Q）
          </text>
          <text x="316" y="49">
            C（−Q）
          </text>
          <text x="278" y="219">
            O
          </text>
          <text x="145" y="226" textAnchor="middle">
            −a
          </text>
          <text x="445" y="226" textAnchor="middle">
            a
          </text>
          <text x="276" y="50">
            a
          </text>
          <text x="520" y="201">
            x
          </text>
          <text x="302" y="22">
            y
          </text>
        </Frame>
      );
    case "equipotential":
      return (
        <Frame description={description} height={240}>
          {[
            { x: 80, v: "30 V", n: "0" },
            { x: 145, v: "20 V", n: "1" },
            { x: 275, v: "10 V", n: "3" },
            { x: 470, v: "0 V", n: "6" },
          ].map((line) => (
            <g key={line.x}>
              <line
                x1={line.x}
                x2={line.x}
                y1="45"
                y2="183"
                stroke={accent}
                strokeWidth="2"
                strokeDasharray="6 5"
              />
              <text x={line.x} y="28" textAnchor="middle">
                {line.v}
              </text>
              <text x={line.x} y="219" textAnchor="middle">
                {line.n}
              </text>
            </g>
          ))}
          <path
            d="M 55 198 H 520 M 513 194 L 520 198 L 513 202"
            stroke={stroke}
            fill="none"
          />
          <circle cx="112.5" cy="115" r="4" fill={stroke} />
          <circle cx="210" cy="115" r="4" fill={stroke} />
          <text x="112.5" y="98" textAnchor="middle">
            P
          </text>
          <text x="210" y="98" textAnchor="middle">
            R
          </text>
          <text x="524" y="219">
            x/cm
          </text>
        </Frame>
      );
    case "phix":
      return (
        <Frame description={description} height={265}>
          <path
            d="M 75 225 V 22 M 70 30 L 75 22 L 80 30 M 75 225 H 525 M 517 220 L 525 225 L 517 230"
            fill="none"
            stroke={stroke}
          />
          <path
            d="M 75 225 L 215 45 L 495 165"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
          />
          <path
            d="M 75 45 H 215 V 225 M 75 165 H 495 V 225"
            fill="none"
            stroke={stroke}
            opacity=".35"
            strokeDasharray="5 5"
          />
          <text x="37" y="25">
            φ/V
          </text>
          <text x="45" y="50">
            30
          </text>
          <text x="45" y="170">
            10
          </text>
          <text x="58" y="245">
            O
          </text>
          <text x="215" y="247" textAnchor="middle">
            1
          </text>
          <text x="495" y="247" textAnchor="middle">
            3
          </text>
          <text x="532" y="232">
            x/m
          </text>
        </Frame>
      );
    case "trajectory":
      return (
        <Frame description={description} height={270}>
          <defs>
            <marker
              id="mock-trajectory-arrow"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3.5"
              orient="auto"
            >
              <path d="M 0 0 L 6 3.5 L 0 7" fill={accent} />
            </marker>
          </defs>

          <path
            d="M 145 35 V 117 M 355 209 L 450 240"
            fill="none"
            stroke={stroke}
            strokeDasharray="4 5"
            opacity=".45"
          />
          {[85, 145, 195].map((y) => (
            <path
              key={y}
              d={`M 390 ${y} H 520`}
              fill="none"
              stroke={accent}
              opacity=".2"
              markerEnd="url(#mock-trajectory-arrow)"
            />
          ))}
          <path
            d="M 145 55 Q 145 140 405 225"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
          />
          <circle cx="145" cy="55" r="4" fill={stroke} />
          <circle cx="405" cy="225" r="4" fill={stroke} />
          <text x="120" y="52">
            M
          </text>
          <text x="416" y="233">
            N
          </text>
          <path
            d="M 145 64 V 106 M 360 210 L 400 224"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            markerEnd="url(#mock-trajectory-arrow)"
          />
          <path
            d="M 365 55 H 490"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            markerEnd="url(#mock-trajectory-arrow)"
          />
          <text x="425" y="39">
            E
          </text>
        </Frame>
      );
    case "beam":
      return (
        <Frame
          description={description}
          height={285}
          caption="图只示意加速区与偏转区的连接；偏移量按题设标注。"
        >
          <path
            d="M 80 95 V 190 M 165 95 V 125 M 165 155 V 190 M 235 60 H 455 M 235 220 H 455"
            stroke={stroke}
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 105 140 H 515 M 507 136 L 515 140 L 507 144"
            stroke={stroke}
            strokeDasharray="5 5"
            fill="none"
            opacity=".4"
          />
          <text x="75" y="81">
            +
          </text>
          <text x="160" y="81">
            −
          </text>
          <text x="112" y="220">
            U₁
          </text>
          <text x="288" y="43">
            − − − −
          </text>
          <text x="288" y="241">
            + + + +
          </text>
          <text x="330" y="270">
            L
          </text>
          <text x="553" y="180">
            d
          </text>
          <text x="480" y="120">
            d/4
          </text>
          <text x="299" y="119">
            m 粒子
          </text>
          <path
            d="M 235 140 Q 345 140 455 100"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
          <path
            d="M 470 100 V 140 M 466 100 H 474 M 466 140 H 474"
            fill="none"
            stroke={stroke}
          />
          <text x="94" y="118">
            +q
          </text>
          <text x="191" y="122">
            v₀
          </text>
          <circle cx="105" cy="140" r="3" fill={accent} />
          <path
            d="M 105 140 H 155 M 149 136 L 155 140 L 149 144"
            stroke={accent}
            fill="none"
            strokeWidth="2"
          />
          <path
            d="M 545 60 V 220 M 539 60 H 551 M 539 220 H 551"
            stroke={stroke}
            fill="none"
          />
        </Frame>
      );
    case "capacitor_experiment":
      return (
        <>
          <Frame
            description={description}
            height={250}
            caption="静电计两端分别连接两块极板，电容器已与电源完全断开。"
          >
            <path
              d="M 165 65 V 185 M 285 65 V 185"
              stroke={stroke}
              strokeWidth="5"
            />
            <path
              d="M 165 65 V 30 H 445 V 88 M 285 185 V 220 H 445 V 162"
              stroke={stroke}
              fill="none"
            />
            <circle cx="445" cy="125" r="37" fill="none" stroke={stroke} />
            <path d="M 431 140 L 455 108" stroke={accent} strokeWidth="2" />
            <text x="115" y="126">
              +
            </text>
            <text x="306" y="126">
              −
            </text>
            <text x="222" y="118">
              d
            </text>
            <path
              d="M 177 132 H 273 M 182 128 L 177 132 L 182 136 M 268 128 L 273 132 L 268 136"
              fill="none"
              stroke={stroke}
            />
            <text x="112" y="207">
              正对面积 S
            </text>
            <text x="445" y="180" textAnchor="middle">
              静电计（U）
            </text>
            <text x="445" y="202" textAnchor="middle">
              已标定为电压
            </text>
          </Frame>
        </>
      );
    case "potential_rectangle":
      return (
        <Frame description={description} height={345}>
          <path
            d="M 190 280 H 370 V 40 H 190 Z"
            stroke={accent}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 190 280 H 480 M 472 275 L 480 280 L 472 285 M 190 280 V 13 M 185 21 L 190 13 L 195 21"
            stroke={stroke}
            fill="none"
          />
          <text x="165" y="300">
            A
          </text>
          <text x="378" y="300">
            B
          </text>
          <text x="378" y="42">
            C
          </text>
          <text x="167" y="42">
            D
          </text>
          <text x="105" y="277">
            60 V
          </text>
          <text x="395" y="277">
            30 V
          </text>
          <text x="109" y="47">
            20 V
          </text>
          <text x="280" y="323" textAnchor="middle">
            0.30 m
          </text>
          <text x="105" y="168">
            0.40 m
          </text>
          <text x="487" y="284">
            x
          </text>
          <text x="202" y="20">
            y
          </text>
        </Frame>
      );
    case "charged_pendulum":
      return (
        <Frame description={description} height={300}>
          <path
            d="M 225 35 H 315 M 250 35 V 245"
            stroke={stroke}
            strokeDasharray="5 5"
            fill="none"
          />
          <path d="M 250 35 L 376 203" stroke={stroke} strokeWidth="2" />
          <path
            d="M 250 245 A 210 210 0 0 0 376 203"
            stroke={stroke}
            strokeDasharray="4 5"
            opacity=".5"
            fill="none"
          />
          <path d="M 250 90 A 55 55 0 0 0 283 79" stroke={accent} fill="none" />
          <circle
            cx="250"
            cy="245"
            r="10"
            fill="none"
            stroke={stroke}
            strokeDasharray="3 3"
          />
          <circle cx="376" cy="203" r="10" fill={accent} />
          <text x="237" y="24">
            O
          </text>
          <text x="230" y="272">
            A
          </text>
          <text x="392" y="205">
            P（+q）
          </text>
          <text x="270" y="106">
            37°
          </text>
          <text x="335" y="119">
            l = 0.80 m
          </text>
          <path
            d="M 420 65 H 525 M 518 60 L 525 65 L 518 70"
            stroke={accent}
            strokeWidth="2"
            fill="none"
          />
          <text x="469" y="48">
            E
          </text>
        </Frame>
      );
    case "deflection_screen":
      return (
        <Frame
          description={description}
          height={300}
          caption="D 从极板右端量至荧光屏；纵横尺度分别示意。"
        >
          <path
            d="M 110 70 H 240 M 110 210 H 240"
            stroke={stroke}
            strokeWidth="4"
          />
          <path d="M 500 35 V 245" stroke={stroke} strokeWidth="3" />
          <path
            d="M 110 140 H 545 M 537 135 L 545 140 L 537 145 M 110 140 V 83 M 105 91 L 110 83 L 115 91"
            stroke={stroke}
            fill="none"
            opacity=".6"
          />
          <path
            d="M 24 140 H 98 M 90 135 L 98 140 L 90 145"
            stroke={accent}
            strokeWidth="2"
            fill="none"
          />
          <text x="19" y="121">
            +q，v₀
          </text>
          <text x="94" y="160">
            O
          </text>
          <text x="512" y="160">
            C
          </text>
          <text x="550" y="145">
            x
          </text>
          <text x="119" y="96">
            y
          </text>
          <text x="158" y="57">
            − − −
          </text>
          <text x="158" y="233">
            + + +
          </text>
          <text x="500" y="26" textAnchor="middle">
            荧光屏
          </text>
          <path
            d="M 110 260 H 240 M 110 254 V 266 M 240 254 V 266 M 240 260 H 500 M 500 254 V 266"
            stroke={stroke}
          />
          <text x="175" y="284" textAnchor="middle">
            L = 0.10 m
          </text>
          <text x="370" y="284" textAnchor="middle">
            D = 0.20 m
          </text>
          <path
            d="M 266 70 V 210 M 261 70 H 271 M 261 210 H 271"
            stroke={stroke}
          />
          <text x="277" y="166">
            d = 0.040 m
          </text>
        </Frame>
      );
    default:
      return null;
  }
}
