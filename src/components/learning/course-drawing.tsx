export function CourseDrawing({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 460 160" fill="none" aria-hidden="true">
      <path d="M30 135H430M60 25V140" className="cover-guide" />
      {kind === "programming-2026" ? (
        <>
          <rect
            x="92"
            y="21"
            width="280"
            height="112"
            rx="5"
            className="cover-structure"
          />
          <path
            d="M92 43H372M116 33H121M130 33H135M144 33H149"
            className="cover-structure"
          />
          <path
            d="M150 64L132 82L150 100M195 64L213 82L195 100M181 58L165 106"
            className="cover-structure"
          />
          <path
            d="M249 69H337M249 83H315M249 97H328"
            className="cover-connection"
          />
          <text x="291" y="151">
            C++
          </text>
        </>
      ) : kind === "robotics" ? (
        <>
          <path
            d="M103 132H171M120 132V112H152V132"
            className="cover-structure"
          />
          <path d="M136 112L223 49L316 87" className="cover-arm-shadow" />
          <path d="M136 112L223 49L316 87" className="cover-structure" />
          <path
            d="M316 87L336 68M316 87L329 110M336 68L350 73M329 110L343 115"
            className="cover-structure"
          />
          <circle cx="136" cy="112" r="9" className="cover-joint" />
          <circle cx="223" cy="49" r="9" className="cover-joint" />
          <circle cx="316" cy="87" r="7" className="cover-joint" />
          <path
            d="M136 87A25 25 0 0 1 160 104M199 67A30 30 0 0 1 250 60"
            className="cover-guide"
          />
          <path d="M370 104V79M357 91H382" className="cover-target" />
          <circle cx="370" cy="91" r="20" className="cover-guide" />
          <text x="357" y="138">
            p = f(q)
          </text>
        </>
      ) : (
        <>
          {[43, 80, 117].flatMap((y) =>
            [25, 62, 99, 136].map((nextY) => (
              <path
                key={y + "-" + nextY}
                d={"M115 " + y + "L232 " + nextY}
                className="cover-connection"
              />
            )),
          )}
          {[25, 62, 99, 136].flatMap((y) =>
            [53, 108].map((nextY) => (
              <path
                key={y + "-" + nextY}
                d={"M232 " + y + "L351 " + nextY}
                className="cover-connection"
              />
            )),
          )}
          {[43, 80, 117].map((y) => (
            <circle key={y} cx="115" cy={y} r="9" className="cover-node" />
          ))}
          {[25, 62, 99, 136].map((y) => (
            <circle
              key={y}
              cx="232"
              cy={y}
              r="9"
              className="cover-node cover-hidden"
            />
          ))}
          {[53, 108].map((y) => (
            <circle key={y} cx="351" cy={y} r="9" className="cover-node" />
          ))}
          <text x="65" y="85">
            x
          </text>
          <text x="386" y="85">
            ŷ
          </text>
        </>
      )}
    </svg>
  );
}
