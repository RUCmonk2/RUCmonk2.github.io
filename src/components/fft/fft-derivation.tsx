import katex from "katex";

function Equation({ children }: { children: string }) {
  return (
    <div
      className="fft-proof-equation"
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(children, {
          displayMode: true,
          throwOnError: true,
        }),
      }}
    />
  );
}

export function FftDerivation({ english }: { english: boolean }) {
  return (
    <article
      className="fft-proof"
      id="derivation-en"
      aria-labelledby="fft-derivation-title"
    >
      <header>
        <h2 id="fft-derivation-title">
          {english ? "Complete derivation" : "完整推导"}
        </h2>
        <p>
          {english
            ? "The DFT matrix, the two outputs of a butterfly, and the numbers in the four-point example."
            : "从 DFT 定义出发，推到蝶形公式，再把默认的 4 点例题写成矩阵乘法。"}
        </p>
      </header>
      <section>
        <h3>
          {english
            ? "From the input vector to the DFT matrix"
            : "1. 输入向量乘哪一个矩阵？"}
        </h3>
        <p>
          {english
            ? "Let x be a column vector of N samples. Use the forward sign convention and leave the forward transform unnormalized. Row k of the matrix computes frequency bin k."
            : "把 N 个采样排成列向量 x。这里用负号指数做正向 DFT，正变换不除以 N。矩阵 F 的第 k 行计算频点 k，第 n 列对应输入 x[n]。"}
        </p>
        <Equation>{String.raw`\begin{aligned}
        \omega_N&=e^{-2\pi i/N},\\
        X[k]&=\sum_{n=0}^{N-1} x[n]\,\omega_N^{kn}.
        \end{aligned}`}</Equation>
        <Equation>{String.raw`F_N=(\omega_N^{kn})_{0\le k,n<N},\qquad X=F_Nx.`}</Equation>
      </section>
      <dl
        className="fft-symbols"
        aria-label={english ? "Notation" : "符号对照"}
      >
        <div>
          <dt>n</dt>
          <dd>{english ? "Original sample index" : "原采样的下标"}</dd>
        </div>
        <div>
          <dt>k</dt>
          <dd>{english ? "Final frequency bin" : "最终频点的下标"}</dd>
        </div>
        <div>
          <dt>j</dt>
          <dd>
            {english
              ? "Station number, the row of a matrix"
              : "站点编号，即矩阵的行"}
          </dd>
        </div>
        <div>
          <dt>q</dt>
          <dd>
            {english
              ? "Bin of a subtransform, the column within a row"
              : "子变换的频点，即每行内的列"}
          </dd>
        </div>
        <div>
          <dt>r</dt>
          <dd>{english ? "Index used in a sum" : "求和时遍历的下标"}</dd>
        </div>
        <div>
          <dt>d, m</dt>
          <dd>
            {english
              ? "Number of stations and entries per station"
              : "站点数、每站的项数"}
          </dd>
        </div>
        <div>
          <dt>i</dt>
          <dd>
            {english ? "Imaginary unit, with i² = −1" : "虚数单位，i² = −1"}
          </dd>
        </div>
      </dl>
      <section>
        <h3>
          {english ? "Split even and odd indices" : "2. 拆开偶下标与奇下标"}
        </h3>
        <p>
          {english
            ? "For the radix-2 FFT, N is a power of two. Take N = 2m. Let E and O be the m-point DFTs of the even and odd samples, respectively."
            : "这里推导基 2 FFT，N 取 2 的幂。设 N = 2m，将原序列按偶下标和奇下标拆开，分别做 m 点 DFT，得到 E 和 O。"}
        </p>
        <Equation>{String.raw`\begin{aligned}
          E[q]&=\sum_{r=0}^{m-1} x[2r]\omega_m^{qr},\\
          O[q]&=\sum_{r=0}^{m-1} x[2r+1]\omega_m^{qr}.
        \end{aligned}`}</Equation>
        <p>
          {english
            ? "Split the sum for X[k]. Take one factor ωₙᵏ out of the odd part. The square of the N-th root is the m-th root. The inner exponent depends only on q = k mod m."
            : "把求和拆成偶项与奇项，奇项可提出一个旋转因子。N 阶单位根平方后得到 m 阶单位根，两个子变换只需要知道 q = k mod m。"}
        </p>
        <Equation>{String.raw`\begin{aligned}
          \omega_N^2&=\omega_m,\quad\omega_m^m=1,\\
          X[k]&=\sum_{r=0}^{m-1} x[2r]\omega_N^{2kr}\\
          &\quad+\sum_{r=0}^{m-1} x[2r+1]\omega_N^{k(2r+1)}\\
          &=E[q]+\omega_N^k O[q],\\
          q&=k\bmod m.
        \end{aligned}`}</Equation>
        <p>
          {english
            ? "The indices q and q + m use the same E[q] and O[q]. The factor for q + m changes sign."
            : "当 k 分别等于 q 和 q + m，使用的是同一对 E[q]、O[q]。旋转因子在 q + m 处变号，第二项写成减法。这就是一组蝶形运算。"}
        </p>
        <Equation>{String.raw`\begin{gathered}
        \begin{bmatrix}X[q]\\X[q+m]\end{bmatrix}
        =\begin{bmatrix}1&W\\1&-W\end{bmatrix}
        \begin{bmatrix}E[q]\\O[q]\end{bmatrix},\\
        W=\omega_{2m}^{q}=e^{-\pi i q/m},\\
        \omega_{2m}^{q+m}=-W,\quad 0\le q<m.
        \end{gathered}`}</Equation>
      </section>
      <section>
        <h3>
          {english
            ? "What a fold changes on the disk"
            : "3. 圆盘每折一次，矩阵怎么变？"}
        </h3>
        <p>
          {english
            ? "After s folds let d = N / 2ˢ and m = 2ˢ. There are d stations, one per row of the state matrix Bₛ. Row j contains the m-point DFT of the inputs x[j], x[j + d], … ."
            : "折完 s 次后，设 d = N / 2ˢ、m = 2ˢ。圆盘还有 d 个站点，每站一叠 m 项，对应矩阵 Bₛ 的一行。站点 j 装着 x[j]、x[j + d]、… 这串采样的 m 点 DFT。"}
        </p>
        <Equation>{String.raw`\begin{gathered}
          B_s[j,q]=\sum_{r=0}^{m-1} x[j+rd]\,\omega_m^{qr},\\
          0\le j<d,\quad 0\le q<m.
          \end{gathered}`}</Equation>
        <p>
          {english
            ? "The next row uses stride d/2. Its even-position samples come from row j and its odd-position samples from row j + d/2. The two original rows supply a and b at the same q. The disk brings the rows together. Multiplication by W is a separate rotation of the complex number b."
            : "下一折让采样步长变成 d/2。在间隔 d/2 的序列中，偶数位置来自旧行 j，奇数位置来自旧行 j + d/2。分别取两行的第 q 项当作 a、b。扇面移到一起表示配对，乘 W 则是在复平面上旋转 b。"}
        </p>
        <Equation>{String.raw`\begin{aligned}
          a&=B_s[j,q],\\
          b&=B_s[j+d/2,q],\\
          W&=\omega_{2m}^q,\\
          B_{s+1}[j,q]& =a+Wb,\\
          B_{s+1}[j,q+m]& =a-Wb.
        \end{aligned}`}</Equation>
        <p>
          {english
            ? "Initially B₀ is the N × 1 sample column. The dimensions change from d × m to (d/2) × (2m). After log₂N folds the only remaining row is the DFT in natural order, so X is its transpose."
            : "起点 B₀ 是 N×1 的采样列。每次折叠让矩阵从 d×m 变为 (d/2)×(2m)。折 log₂N 次后，只剩按频点正常顺序排列的一行。其转置就是输出列向量 X。"}
        </p>
      </section>
      <section>
        <h3>
          {english
            ? "All values in the four-point example"
            : "4. 把 [1, 2, 3, 4] 完整算一遍"}
        </h3>
        <p>
          {english
            ? "First transform the pairs (1, 3) and (2, 4). A two-point DFT gives a sum and a difference. Put the transpose of E in the first row and the transpose of O in the second row."
            : "第一折配 (1, 3) 和 (2, 4)。2 点 DFT 给出和与差，把列向量 E、O 分别转置，填成矩阵的第一行、第二行。"}
        </p>
        <Equation>{String.raw`\begin{aligned}
        E&=\begin{bmatrix}1+3\\1-3\end{bmatrix}=\begin{bmatrix}4\\-2\end{bmatrix},\\
        O&=\begin{bmatrix}2+4\\2-4\end{bmatrix}=\begin{bmatrix}6\\-2\end{bmatrix},\\
        B_1&=\begin{bmatrix}4&-2\\6&-2\end{bmatrix}.
        \end{aligned}`}</Equation>
        <p>
          {english
            ? "In the second fold q = 0 uses W = 1 and gives X[0], X[2]. For q = 1 use W = −i. Multiplying −2 by −i gives 2i, which yields X[1] and X[3]."
            : "第二折，q = 0 对应 W = 1，给出 X[0] 和 X[2]。q = 1 对应 W = −i，先算 (−i)(−2) = 2i，再得到 X[1] 和 X[3]。"}
        </p>
        <Equation>{String.raw`\begin{aligned}
        X[0]&=4+6=10,\\
        X[1]&=-2+2i,\\
        X[2]&=4-6=-2,\\
        X[3]&=-2-2i.
        \end{aligned}`}</Equation>
        <Equation>{String.raw`\begin{aligned}
        B_2&=\begin{bmatrix}10&-2+2i&-2&-2-2i\end{bmatrix},\\
        X&=B_2^{\mathsf T}.
        \end{aligned}`}</Equation>
      </section>
      <section>
        <h3>
          {english
            ? "The same calculation in matrices"
            : "5. 把配对和两次折叠写成矩阵乘法"}
        </h3>
        <p>
          {english
            ? "The permutation P puts even samples first. The block diagonal matrix applies a DFT to each half. Dₘ holds the twiddle factors, and the last block matrix performs the sum and difference."
            : "P 把偶项排到前面、奇项排到后面。分块对角矩阵对两组分别做 DFT。Dₘ 收集旋转因子，最左边的分块矩阵完成逐项旋转、相加和相减。"}
        </p>
        <Equation>{String.raw`\begin{aligned}
        D_m&=\operatorname{diag}(\omega_{2m}^0,\ldots,\omega_{2m}^{m-1}),\\
        F_{2m}&=\underbrace{\begin{bmatrix} I_m & D_m \\ I_m & -D_m \end{bmatrix}}_{M_{2m}}
        \begin{bmatrix}F_m&0\\0&F_m\end{bmatrix}P.
        \end{aligned}`}</Equation>
        <p>
          {english
            ? "In the experiment the permutation and the two subtransforms together form Fold 1. M₄ is Fold 2. The vector v₁ concatenates the rows of B₁ in order."
            : "实验中的第一折包含配对 P₄ 和两次 2 点 DFT。第二折对应 M₄。中间向量 v₁ 是把 B₁ 的两行按顺序首尾接起来得到的。"}
        </p>
        <div className="fft-proof-grid">
          <Equation>{String.raw`P_4=\begin{bmatrix}1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1\end{bmatrix}`}</Equation>
          <Equation>{String.raw`F_2=\begin{bmatrix}1&1\\1&-1\end{bmatrix}`}</Equation>
          <Equation>{String.raw`M_4=\begin{bmatrix}1&0&1&0\\0&1&0&-i\\1&0&-1&0\\0&1&0&i\end{bmatrix}`}</Equation>
        </div>
        <Equation>{String.raw`\begin{aligned}
        v_0&=P_4 x=\bigl[1,3,2,4\bigr]^{\mathsf T},\\
        v_1&=\operatorname{diag}(F_2,F_2)\,v_0\\
           &=\bigl[4,-2,6,-2\bigr]^{\mathsf T},\\
        X&=M_4 v_1\\
         &=\bigl[10,-2+2i,-2,-2-2i\bigr]^{\mathsf T}.
        \end{aligned}`}</Equation>
        <p>
          {english
            ? "Multiplying the factors gives F₄ itself. You can multiply F₄ by x to check the same result directly."
            : "把三个因子乘起来，就得到完整的 DFT 矩阵 F₄。也可以用 F₄ 直接乘 x，核对同一个输出向量。"}
        </p>
        <div className="fft-proof-grid fft-proof-grid-pair">
          <Equation>{String.raw`F_4=\begin{bmatrix}1&1&1&1\\1&-i&-1&i\\1&-1&1&-1\\1&i&-1&-i\end{bmatrix}`}</Equation>
          <Equation>{String.raw`F_4x=\begin{bmatrix}10\\-2+2i\\-2\\-2-2i\end{bmatrix}`}</Equation>
        </div>
      </section>
      <section>
        <h3>{english ? "Why the calculation is faster" : "6. 少算了多少？"}</h3>
        <p>
          {english
            ? "One layer uses d/2 pairs of stations, each with m butterflies, so there are N/2 butterflies per layer. Over log₂N layers this is (N/2) log₂N. Each butterfly takes constant work. Computing N separate DFT sums directly takes Θ(N²)."
            : "每层有 d/2 对站点，每对做 m 组蝶形，一共 N/2 组。每组只用常数次运算，因此 (N/2) log₂N 组蝶形就能做完 FFT。4 点共 4 组，32 点共 80 组。直接做 DFT 时，N 个频点各要累加 N 项。"}
        </p>
        <Equation>{String.raw`\begin{aligned}
        T(1)&=\Theta(1),\\
        T(N)&=2T(N/2)+\Theta(N),\\
        T(N)&=\Theta(N\log N).
        \end{aligned}`}</Equation>
      </section>
      <footer>
        {english
          ? "The 32-point disk choreography and mixed signal are adapted from Claude’s Mathematics Spectacle 06."
          : "32 点圆盘的折叠动作和混合波取自 Claude《数学奇观 06 · FFT 折叠》。"}
      </footer>
    </article>
  );
}
