import type { Localized } from "@/data/learning/types";

const L = (zh: string, en: string): Localized => ({ zh, en });
const step = (zh: string, en: string, paperZh: string, paperEn: string) => ({
  title: L(zh, en),
  paper: L(paperZh, paperEn),
});

export type LessonNotes = {
  title: Localized;
  intro: Localized;
  reference?: string;
  steps: Record<string, ReturnType<typeof step>>;
  markers?: Localized;
  question?: {
    at: string;
    prompt: Localized;
    options: Localized[];
    answer: number;
    reason: Localized;
  };
};

export const lessonNotes = {
  propositions: {
    title: L("交换合取的顺序", "Swap a conjunction"),
    intro: L(
      "从“P 且 Q”推出“Q 且 P”。先弄清楚 Lean 把哪些内容当作已知，哪些内容需要证明。",
      "Derive “Q and P” from “P and Q”. Follow what Lean knows and what it still needs to prove.",
    ),
    markers: L(
      "可以在在线编辑器里把第一条 exact 的 h.right 改成 h.left。Lean 会指出，你交来的是 P 的证明，这里需要 Q。",
      "In the online editor, try replacing h.right with h.left in the first exact. Lean reports that you supplied a proof of P where a proof of Q is required.",
    ),
    steps: {
      start: step(
        "读定理",
        "Read the theorem",
        "P 和 Q 是任意命题。要证明一个蕴含式，可以先假设前件成立，再推出后件。",
        "P and Q are arbitrary propositions. To prove the implication, assume its premise and derive its conclusion.",
      ),
      intro: step(
        "假设 P 且 Q",
        "Assume P and Q",
        "把前件记作 h。有了 h，可以分别拿到 P 的证明 h.left 和 Q 的证明 h.right。",
        "Call the premise h. Its left component proves P and its right component proves Q.",
      ),
      constructor: step(
        "把结论拆成两题",
        "Split the conclusion",
        "要证明 Q 且 P，先给出 Q 的证明，再给出 P 的证明。Lean 按这个顺序列出两个目标。",
        "Proving Q ∧ P requires a proof of Q followed by a proof of P. Lean lists the goals in that order.",
      ),
      right: step(
        "取出 Q 的证明",
        "Supply the proof of Q",
        "当前分支要求 Q。h.right 的类型恰好是 Q，交给 exact 后这个分支就完成了。",
        "This branch asks for Q. The type of h.right is exactly Q, so exact closes this branch.",
      ),
      left: step(
        "取出 P 的证明",
        "Supply the proof of P",
        "另一个分支要求 P。用 h.left 完成后，两个分支都已证明，整个蕴含式成立。",
        "The other branch asks for P. With h.left it also closes, completing the implication.",
      ),
    },
    question: {
      at: "intro",
      prompt: L(
        "下一行执行 constructor，Lean 会先要求证明什么？",
        "After constructor, which goal does Lean ask for first?",
      ),
      options: [L("P", "P"), L("Q", "Q"), L("P ∧ Q", "P ∧ Q")],
      answer: 1,
      reason: L(
        "当前目标是 Q ∧ P。构造合取时，左边 Q 排在前面。",
        "The target is Q ∧ P. The left component, Q, comes first.",
      ),
    },
  },
  rewrite: {
    title: L("用等式替换", "Rewrite with an equality"),
    intro: L(
      "已知 a = b，为什么两边加 1 后还相等？跟着 rw 看一次代入。",
      "Given a = b, why do both sides stay equal after adding 1? Follow the substitution made by rw.",
    ),
    steps: {
      start: step(
        "分清等式的用途",
        "Read the equality",
        "等号左边的 a 可以按已知等式 h 替换成 b。待证目标列在 ⊢ 的右边。",
        "The equality h lets us replace a with b. The expression after ⊢ is the target.",
      ),
      rewrite: step(
        "代入，再用自反性",
        "Substitute, then use reflexivity",
        "rw [h] 把目标中的 a 改成 b，得到 b + 1 = b + 1。rw 随后用等号的自反性关闭目标。",
        "rw [h] replaces a with b, yielding b + 1 = b + 1. The tactic then closes it by reflexivity.",
      ),
    },
  },
  induction: {
    title: L("列表归纳", "Induction on a list"),
    intro: L(
      "证明任意列表 xs 拼上空列表以后仍是 xs。重点看归纳假设用在哪个列表上。",
      "Prove that appending an empty list leaves any list xs unchanged. Watch which list the induction hypothesis refers to.",
    ),
    steps: {
      start: step(
        "观察列表的生成方式",
        "Look at how lists are built",
        "列表要么为空，要么是表头 x 接到较短的列表 rest 前面。归纳沿着这两种构造展开。",
        "A list is empty or a head x followed by a smaller list rest. Induction follows those two constructors.",
      ),
      nil: step(
        "处理空列表",
        "Handle the empty list",
        "把 xs 取成 [] 后，目标是 [] ++ [] = []。",
        "For xs = [], the goal becomes [] ++ [] = [].",
      ),
      base: step(
        "按定义算出左边",
        "Reduce the left side",
        "空列表与空列表拼接，按定义得到 []。rfl 让 Lean 检查两边计算后相同。",
        "By the definition of append, the left side reduces to []. rfl checks that both sides compute to the same expression.",
      ),
      cons: step(
        "给尾部一个归纳假设",
        "Use the hypothesis on the tail",
        "现在 xs 是 x :: rest。归纳假设 ih 只说 rest ++ [] = rest。",
        "Now xs is x :: rest. The induction hypothesis ih only states that rest ++ [] = rest.",
      ),
      unfold: step(
        "展开一层拼接",
        "Unfold one append step",
        "左边先保留表头 x，再把 [] 拼到 rest 后面。change 把目标写成与原目标按定义相同的式子。",
        "The left side keeps x and appends [] to rest. change restates the target in a definitionally equal form.",
      ),
      rewrite: step(
        "把尾部换回 rest",
        "Replace the tail by rest",
        "按 ih 替换括号里的 rest ++ []，两边都变成 x :: rest。",
        "Rewrite rest ++ [] using ih. Both sides become x :: rest.",
      ),
    },
    question: {
      at: "cons",
      prompt: L(
        "这一步能直接使用的归纳假设是什么？",
        "Which statement is available as the induction hypothesis?",
      ),
      options: [
        L("rest ++ [] = rest", "rest ++ [] = rest"),
        L("(x :: rest) ++ [] = x :: rest", "(x :: rest) ++ [] = x :: rest"),
      ],
      answer: 0,
      reason: L(
        "rest 是更小的列表。带有表头 x 的结论仍是当前目标。",
        "rest is smaller. The claim for the whole list with head x is still the goal.",
      ),
    },
  },
  "insertion-order": {
    title: L("插入排序 · 保持有序", "Insertion sort · preserve order"),
    reference: "§2.1 · 2.1-1",
    intro: L(
      "用两个列表表示循环：acc 是排好的前缀，rest 是还没处理的输入。每次取出一个值，插入 acc。",
      "Use two lists to model the loop: acc is the sorted prefix, and rest is the unprocessed input. Move one value at a time into acc.",
    ),
    markers: L(
      "Pairwise r 表示任何靠前的元素都与靠后的元素满足关系 r。升序取 r 为 ≤。insert_ordered 证明单次插入保持有序，完整源码包含它的证明。",
      "Pairwise r means every earlier element is related by r to every later one. For ascending order, r is ≤. The full source proves insert_ordered, the lemma that one insertion preserves order.",
    ),
    steps: {
      start: step(
        "确定循环不变式",
        "State the loop invariant",
        "若当前累积列表 acc 有序，处理完剩余的 rest 后，结果仍然有序。把 acc 留作任意值，归纳时才能换成更新后的列表。",
        "If the accumulator acc is ordered, finishing rest yields an ordered result. Keep acc arbitrary so the induction hypothesis accepts an updated accumulator.",
      ),
      nil: step(
        "已处理完",
        "Reach the end",
        "rest 为空时，sortFrom 直接返回 acc，有序性由 hAcc 给出。",
        "When rest is empty, sortFrom returns acc, which is ordered by hAcc.",
      ),
      base: step(
        "交出已有证明",
        "Supply the existing proof",
        "exact hAcc 使用当前累积列表的有序性，把空列表分支关掉。",
        "exact hAcc supplies the accumulator’s orderedness, closing the empty branch.",
      ),
      cons: step(
        "还有一个元素要插入",
        "Take the next element",
        "设剩余输入的第一项为 x、尾部为 xs。归纳假设说，从任一有序累积列表处理 xs，都得到有序结果。",
        "Let x be the first remaining item and xs the tail. The induction hypothesis says processing xs from any ordered accumulator yields an ordered result.",
      ),
      preserve: step(
        "证明更新后的前缀有序",
        "Prove that the new prefix is ordered",
        "先用引理 insert_ordered，从 hAcc 得到插入 x 后的有序性 hStep。原目标还在，假设区多了 hStep。",
        "Apply insert_ordered to hAcc to obtain hStep, the orderedness of acc after inserting x. The target stays the same and hStep joins the context.",
      ),
      finish: step(
        "处理余下的输入",
        "Process the remaining input",
        "把更新后的累积列表和 hStep 交给 ih。sortFrom 处理 x :: xs，按定义就是完成这次更新后继续处理 xs。",
        "Apply ih to the new accumulator and hStep. By definition, sortFrom on x :: xs performs that update and then processes xs.",
      ),
    },
    question: {
      at: "cons",
      prompt: L(
        "调用 ih 处理 xs 以前，还需要证明什么？",
        "What must be proved before applying ih to xs?",
      ),
      options: [
        L("xs 本来就是有序的", "xs was already ordered"),
        L("插入 x 后的 acc 仍有序", "acc remains ordered after inserting x"),
        L("x 比输入中每个元素都小", "x is smaller than every input element"),
      ],
      answer: 1,
      reason: L(
        "ih 对剩余的 xs 已经成立，参数是一个有序的累积列表。",
        "The hypothesis already concerns xs and takes an ordered accumulator as input.",
      ),
    },
  },
  "insertion-spec": {
    title: L("插入排序 · 完整规格", "Insertion sort · full specification"),
    reference: "§2.1",
    intro: L(
      "输出要同时满足两个条件：按指定关系排好，且原来的元素及重复次数都保留。",
      "The output must satisfy two conditions: it is ordered by the chosen relation, and it keeps every element with its multiplicity.",
    ),
    markers: L(
      "本课验证自然数列表上的函数式实现。原书使用数组原地移动元素，该实现的下标与复杂度需要另行建模。",
      "This lesson verifies a functional model over natural-number lists. The textbook's in-place array indices and cost model require separate proofs.",
    ),
    steps: {
      start: step(
        "读排序规格",
        "Read the sorting specification",
        "Pairwise r 约束结果的顺序，Perm xs 约束元素和次数。光有有序性的话，始终输出空列表也能满足它。",
        "Pairwise r constrains order; Perm xs constrains elements and multiplicities. A function that always returns an empty list would satisfy orderedness alone.",
      ),
      split: step(
        "分别证明有序和排列",
        "Split orderedness and permutation",
        "constructor 把合取拆成两个目标。两个目标讲的是同一份输出。",
        "constructor splits the conjunction into two targets about the same output.",
      ),
      sorted: step(
        "从空的有序前缀开始",
        "Start with an empty ordered prefix",
        "空列表满足 Pairwise r，证据是 .nil。把它送进 sortFrom_ordered，就得到整个输出有序。",
        "The empty list satisfies Pairwise r by .nil. Pass that proof to sortFrom_ordered to establish orderedness of the output.",
      ),
      perm: step(
        "核对重复元素也保留",
        "Check multiplicities as well",
        "sortFrom_perm 保证结果是 acc ++ xs 的一个排列。初始 acc 为空，所以这里得到的是 xs 的排列。",
        "sortFrom_perm establishes a permutation of acc ++ xs. Since the initial acc is empty, the output is a permutation of xs.",
      ),
    },
  },
  sum: {
    title: L("数组求和 · 累加器", "Sum · the accumulator"),
    reference: "2.1-2",
    intro: L(
      "顺着整数列表往下加。循环中始终可以把总和拆成两部分：手里已经加过的值，加上剩余元素之和。",
      "Walk an integer list and keep a running sum. The total remains the current accumulator plus the sum of the elements still to visit.",
    ),
    markers: L(
      "完整源码再取初值 acc = 0，得到 sumList xs = xs.sum。这里的整数没有固定字长溢出。",
      "The full source sets acc = 0 to derive sumList xs = xs.sum. This model uses integers without fixed-width overflow.",
    ),
    steps: {
      start: step(
        "先证明任意初值",
        "Use an arbitrary starting value",
        "允许 acc 取任意整数，才能在归纳步用到 acc + x。xs.sum 是独立的列表求和规格。",
        "Allow any starting value acc so the induction step can use acc + x. The independent specification is xs.sum.",
      ),
      nil: step(
        "处理空列表",
        "Handle the empty list",
        "没有元素可加时，累加器原样返回；规格一侧只需把空列表的和写成 0。",
        "With nothing left to add, the accumulator is returned. On the specification side the empty sum is 0.",
      ),
      base: step(
        "化简 acc + 0",
        "Simplify acc + 0",
        "用空列表的定义和右加零，等式两边都化成 acc。",
        "Unfold the empty case and use the right identity of addition to get acc on both sides.",
      ),
      cons: step(
        "取出下一个整数",
        "Take the next integer",
        "列表是 x :: xs。归纳假设 ih 适用于任意初值和更短的列表 xs。",
        "The list is x :: xs. The induction hypothesis ih applies to the smaller list xs, with any initial accumulator.",
      ),
      unfold: step(
        "更新累加器",
        "Update the accumulator",
        "实际计算先把 x 加到 acc；规格先求 x 加 xs.sum。change 展开两边各自的定义。",
        "The implementation adds x to acc first. The specification adds x to xs.sum. change unfolds both definitions.",
      ),
      "use-ih": step(
        "把剩余循环替换成和",
        "Replace the remaining loop by its sum",
        "用初值 acc + x 应用 ih，左边变成 (acc + x) + xs.sum。",
        "Apply ih with initial value acc + x to turn the left side into (acc + x) + xs.sum.",
      ),
      assoc: step(
        "用加法结合律收尾",
        "Finish with associativity",
        "两边的加数顺序相同，括号位置不同。Int.add_assoc 正好证明这条等式。",
        "Both sides add the same terms in the same order. Int.add_assoc proves the equality across the two groupings.",
      ),
    },
  },
  descending: {
    title: L("降序插入排序", "Descending insertion sort"),
    reference: "2.1-3",
    intro: L(
      "同一个插入算法，把关系换成“左边大于等于右边”。顺序变了，元素保持的要求相同。",
      "Use the same insertion algorithm with the relation “the left item is at least the right item”. The ordering changes and the permutation requirement stays the same.",
    ),
    steps: {
      start: step(
        "声明降序的关系",
        "State the reversed relation",
        "当 x 位于 y 前面时，要求 y ≤ x。允许相等，重复的值都要保留。",
        "If x stands before y, require y ≤ x. Equal values are allowed and duplicates are preserved.",
      ),
      apply: step(
        "复用一般的正确性定理",
        "Reuse the general correctness theorem",
        "apply 把结论匹配到 insertionSort_correct。剩下要证明反向关系的传递性和任意两数的可比性。",
        "apply matches the conclusion of insertionSort_correct. The remaining obligations are transitivity and totality of the reversed relation.",
      ),
      "trans-assume": step(
        "写出传递性的前提",
        "Introduce the transitivity premises",
        "设 y ≤ x 且 z ≤ y，那么需要推出 z ≤ x。",
        "Assume y ≤ x and z ≤ y. The target is z ≤ x.",
      ),
      trans: step(
        "连接两条不等式",
        "Compose the inequalities",
        "Nat.le_trans 先接 z ≤ y，再接 y ≤ x。",
        "Nat.le_trans first takes z ≤ y, then y ≤ x.",
      ),
      "total-assume": step(
        "取任意两个数",
        "Take two arbitrary numbers",
        "给定 x 和 y，要证明 y ≤ x 或 x ≤ y。",
        "For arbitrary x and y, prove y ≤ x or x ≤ y.",
      ),
      total: step(
        "使用自然数的全序",
        "Use the total order on naturals",
        "Nat.le_total y x 给出所需的析取，降序排序的两项规格随之成立。",
        "Nat.le_total y x provides the required disjunction, completing the descending sort specification.",
      ),
    },
  },
  search: {
    title: L("线性查找 · 何时找不到", "Linear search · when a key is absent"),
    reference: "2.1-4",
    intro: L(
      "比较表头，失配才继续找尾部。这个定理证明返回 none 恰好等价于目标值不在列表中。",
      "Compare the head and continue into the tail after a mismatch. This theorem proves that the result is none exactly when the key is absent.",
    ),
    markers: L(
      "完整源码还证明：返回 some i 时，下标 i（从 0 开始）处确实是目标值。",
      "The full source also proves that when the function returns some i, the zero-based index i really holds the key.",
    ),
    steps: {
      start: step(
        "读 Option 与等价关系",
        "Read Option and the biconditional",
        "some i 表示找到下标 i，none 表示找不到。↔ 要求左右两个方向都成立。",
        "some i represents a found index and none means absent. The ↔ requires both implications.",
      ),
      nil: step(
        "空列表没有目标值",
        "The empty list has no key",
        "空列表分支需要证明：在空列表上返回 none，当且仅当目标值不在空列表中。",
        "The empty branch asks whether searching [] returns none exactly when the key is absent from [].",
      ),
      base: step(
        "按定义核对两边",
        "Check both sides by definition",
        "linearSearch 在 [] 上返回 none，且任意值都不属于 []。simp 展开这些规则。",
        "linearSearch returns none on [], and no value belongs to []. simp applies those rules.",
      ),
      cons: step(
        "把表头与尾部展开",
        "Expose the head and tail",
        "归纳假设已经说明如何在尾部判定缺失。还要考虑表头 x。",
        "The induction hypothesis already characterizes absence in the tail. The head x still needs consideration.",
      ),
      cases: step(
        "分情况比较表头",
        "Split on whether the head matches",
        "by_cases hx : x = key 给出相等和不相等两个分支。",
        "by_cases hx : x = key creates a match branch and a mismatch branch.",
      ),
      match: step(
        "表头就是目标值",
        "The head is a match",
        "返回 some 0，且 key 属于列表。等价式两边都为假，simp 可以关掉这条分支。",
        "The result is some 0 and the key belongs to the list. Both sides of the biconditional are false, so simp closes this branch.",
      ),
      next: step(
        "失配时只看尾部",
        "On a mismatch, look in the tail",
        "失配时，只有尾部的查找可能成功。把找到的下标加 1 不会改变有没有找到；表头的失配也让成员关系只取决于尾部。化简后恰好就是 ih。",
        "After a mismatch only the tail can supply a match. Increasing a found index by one preserves whether it exists, and membership also reduces to the tail. Simplifying gives ih.",
      ),
    },
  },
} satisfies Record<string, LessonNotes>;

export type LessonId = keyof typeof lessonNotes;
export const basics: LessonId[] = ["propositions", "rewrite", "induction"];
export const algorithms: LessonId[] = [
  "insertion-order",
  "insertion-spec",
  "sum",
  "descending",
  "search",
];
