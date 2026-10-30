import styles from "./midterm.module.css";

export function MidtermQuestionDiagram({ id }: { id: string }) {
  if (id === "L1")
    return (
      <figure className={styles.questionDiagram}>
        <svg
          viewBox="0 0 540 140"
          role="img"
          aria-label="A点在x等于0，P点在0.20米，B点在0.50米。A带正4纳库，B带负9纳库。"
        >
          <path
            d="M 42 72 H 506 M 498 67 L 506 72 L 498 77"
            fill="none"
            stroke="currentColor"
          />
          <circle cx="70" cy="72" r="9" fill="var(--note-accent)" />
          <circle cx="230" cy="72" r="4" fill="currentColor" />
          <circle cx="470" cy="72" r="9" fill="var(--note-accent)" />
          <text x="70" y="39" textAnchor="middle">
            A · +4 nC
          </text>
          <text x="230" y="39" textAnchor="middle">
            P
          </text>
          <text x="470" y="39" textAnchor="middle">
            B · −9 nC
          </text>
          <text x="70" y="111" textAnchor="middle">
            0
          </text>
          <text x="230" y="111" textAnchor="middle">
            0.20
          </text>
          <text x="470" y="111" textAnchor="middle">
            0.50
          </text>
          <text x="510" y="90">
            x/m
          </text>
        </svg>
        <figcaption>先在 P 点补画两个源电荷产生的场强箭头。</figcaption>
      </figure>
    );
  if (id === "L2")
    return (
      <figure className={styles.questionDiagram}>
        <svg
          viewBox="0 0 540 235"
          role="img"
          aria-label="电势位置图：A点x等于0时40伏，B点x等于1米时20伏，C点x等于2米时0伏，三个点位于同一直线上。"
        >
          <path
            d="M 75 20 V 190 H 498 M 70 28 L 75 20 L 80 28 M 490 185 L 498 190 L 490 195"
            fill="none"
            stroke="currentColor"
          />
          <path
            d="M 75 30 L 455 190"
            fill="none"
            stroke="var(--note-accent)"
            strokeWidth="2"
          />
          <circle cx="75" cy="30" r="4" fill="var(--note-accent)" />
          <circle cx="265" cy="110" r="4" fill="var(--note-accent)" />
          <circle cx="455" cy="190" r="4" fill="var(--note-accent)" />
          <text x="32" y="25">
            φ/V
          </text>
          <text x="47" y="37">
            40
          </text>
          <text x="47" y="116">
            20
          </text>
          <text x="57" y="207">
            O
          </text>
          <text x="94" y="36">
            A
          </text>
          <text x="278" y="110">
            B
          </text>
          <text x="454" y="178">
            C
          </text>
          <text x="265" y="213" textAnchor="middle">
            1.0
          </text>
          <text x="455" y="213" textAnchor="middle">
            2.0
          </text>
          <text x="495" y="212">
            x/m
          </text>
        </svg>
        <figcaption>图像给出电势随位置的变化，不是粒子运动轨迹。</figcaption>
      </figure>
    );
  if (id === "L4")
    return (
      <figure className={styles.questionDiagram}>
        <svg
          viewBox="0 0 540 205"
          role="img"
          aria-label="偏转板上负下正。正粒子从左侧中线向右入射；板长20厘米，板距10厘米。"
        >
          <path
            d="M 112 40 H 435 M 112 154 H 435"
            stroke="currentColor"
            strokeWidth="5"
          />
          <path
            d="M 112 97 H 435"
            stroke="currentColor"
            opacity=".3"
            strokeDasharray="5 5"
          />
          <path
            d="M 28 97 H 98 M 91 92 L 98 97 L 91 102"
            stroke="var(--note-accent)"
            fill="none"
            strokeWidth="2"
          />
          <text x="35" y="78">
            q &gt; 0，v₀ →
          </text>
          <text x="190" y="24">
            − − − − −
          </text>
          <text x="190" y="180">
            + + + + +
          </text>
          <text x="268" y="202" textAnchor="middle">
            L = 0.20 m
          </text>
          <text x="446" y="101">
            d = 0.10 m
          </text>
        </svg>
        <figcaption>
          只画已知条件：请补出电场方向、受力方向和可能的轨迹。
        </figcaption>
      </figure>
    );
  return null;
}
