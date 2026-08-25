import type { TutorialRouteContent } from "@/data/vscode-tutorial";

export type LeanAiTutorialRoute = "foundation" | "ai4math" | "ai4tcs";

export function getLeanAiTutorialRoutes(
  isEnglish: boolean,
): Record<LeanAiTutorialRoute, TutorialRouteContent> {
  if (isEnglish) {
    return {
      foundation: {
        badge: "λ",
        label: "Lean foundation",
        time: "Weeks 1–2",
        intro:
          "Learn just enough Lean 4 and mathlib to read proof states, write small theorems, and understand what the kernel does and does not certify.",
        steps: [
          {
            id: "foundation-model",
            title: "Place Lean in the verification loop",
            summary:
              "Start with the object–statement–proof–kernel chain before learning tactics or asking an AI system to produce code.",
            source: [
              "Lean is both a functional language and an interactive theorem prover based on dependent type theory.",
              "Tactics and AI tools may construct candidates; the kernel checks the resulting proof term against the stated proposition.",
            ],
            why: "This prevents the most common category error: treating a compiling proof as evidence that the original natural-language claim was faithfully formalized or is mathematically important.",
            success:
              "You can explain, in your own words, the separate roles of statement design, proof search, kernel checking, and human semantic review.",
            links: [
              {
                label: "Theorem Proving in Lean 4",
                href: "https://lean-lang.org/theorem_proving_in_lean4/",
                note: "Official proof-oriented Lean textbook.",
                kind: "official",
              },
              {
                label: "Lean language reference",
                href: "https://lean-lang.org/doc/reference/latest/",
                note: "Precise current-language reference; use it for lookup rather than as a first tutorial.",
                kind: "official",
              },
            ],
            copyBlocks: [
              {
                label: "Learning model",
                value:
                  "natural-language claim\n  -> formal statement\n  -> proof term / tactic script\n  -> Lean kernel check\n  -> human semantic and research review",
                format: "text",
              },
            ],
          },
          {
            id: "foundation-entry",
            title: "Choose a browser trial or a local project",
            summary:
              "Use the online editor for a ten-minute first contact; install Lean locally when you are ready to keep files, use mathlib, and build reproducibly.",
            source: [
              "Lean's official learning page links to Lean4Web for one-off experiments without a local installation.",
              "The recommended local workflow uses elan for toolchains, VS Code with the official Lean 4 extension, and Lake for projects.",
              "A real mathlib exercise should live in a project that pins its toolchain and dependencies.",
            ],
            why: "Separating the low-friction trial from the reproducible project keeps setup from blocking the first lesson while preventing loose .lean files from becoming the long-term workflow.",
            success:
              "You have either evaluated a tiny expression online or installed the official toolchain and can print the elan, Lean, and Lake versions.",
            caution:
              "The copied commands below only inspect versions. Follow the current official installation page for your operating system; do not paste an installer command from an old screenshot.",
            links: [
              {
                label: "Install Lean",
                href: "https://lean-lang.org/install/",
                note: "Official OS-aware installation and VS Code setup guide.",
                kind: "official",
              },
              {
                label: "Learn Lean",
                href: "https://lean-lang.org/lean4/doc",
                note: "Official resource map, including books, games, Lean4Web, and machine-facing tools.",
                kind: "official",
              },
            ],
            details: [
              {
                title: "Ten-minute browser route",
                items: [
                  "Open Lean4Web from the official Learn page and create a small scratch file.",
                  "Try #eval 1 + 1 and a tiny example theorem; treat this only as orientation.",
                  "Move to a Lake project before starting mathlib exercises or saving coursework.",
                ],
              },
              {
                title: "Local route",
                items: [
                  "Install elan and the official Lean 4 VS Code extension from the current guide.",
                  "Restart the terminal if the new commands are not yet on PATH.",
                  "Record the three versions in your first learning log instead of comparing them to a screenshot.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Read-only version checks",
                value: "elan --version\nlean --version\nlake --version",
                format: "terminal",
              },
              {
                label: "First Lean expressions",
                value:
                  "#check Nat\n#check Nat.add\n#eval 1 + 1\n\nexample (n : Nat) : n = n := by\n  rfl",
                format: "code",
              },
            ],
          },
          {
            id: "foundation-project",
            title: "Create a mathlib project, not a loose file",
            summary:
              "Generate a Lake project with the mathlib template, fetch the official cache, and keep the toolchain and manifest with your work.",
            source: [
              "The current mathlib documentation recommends creating a project with the math template so import Mathlib has a declared dependency.",
              "lean-toolchain pins the Lean version; lakefile.toml declares dependencies; lake-manifest.json records resolved revisions.",
              "lake exe cache get downloads prebuilt mathlib artifacts and avoids rebuilding the whole library locally.",
            ],
            why: "The supplied notes used a generic lake init example. For a public self-study path, the mathlib-specific template is safer because the dependency and compatible toolchain are configured together.",
            success:
              "The project root contains lean-toolchain and lakefile.toml, import Mathlib resolves in VS Code, and a full lake build finishes without errors.",
            caution:
              "The project-creation command makes a new folder and initializes Git; the cache step uses the network and can download substantial data. Run each command yourself only after choosing a suitable location.",
            links: [
              {
                label: "Using mathlib4 as a dependency",
                href: "https://github.com/leanprover-community/mathlib4/wiki/Using-mathlib4-as-a-dependency",
                note: "Current mathlib project template, cache, update, and compatibility guidance.",
                kind: "official",
              },
              {
                label: "Lean projects",
                href: "https://leanprover-community.github.io/install/project.html",
                note: "Project structure and VS Code workflow from the Lean community documentation.",
                kind: "official",
              },
            ],
            details: [
              {
                title: "Files worth understanding",
                items: [
                  "lean-toolchain fixes the Lean release expected by the project.",
                  "lakefile.toml describes the package and mathlib dependency.",
                  "lake-manifest.json records resolved dependency revisions; .lake is local cache, not the learning artifact.",
                ],
              },
              {
                title: "If VS Code shows many confusing errors",
                items: [
                  "Open the project root, not an individual file or a parent folder.",
                  "Confirm that the Lean 4 extension selected the project's toolchain.",
                  "Run lake build from the project root and keep the first complete error before changing caches.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Create a current mathlib project",
                value:
                  "lake +leanprover-community/mathlib4:lean-toolchain new lean-self-study math\ncd lean-self-study\nlake exe cache get\nlake build",
                format: "terminal",
                note: "Review first: this creates a directory, initializes Git, and downloads dependencies/cache.",
              },
              {
                label: "LeanSelfStudy/Basic.lean",
                value:
                  "import Mathlib\n\n#check Nat.add_comm\n\nexample (a b : Nat) : a + b = b + a := by\n  omega\n\nexample (p q : Prop) (hp : p) (hq : q) : p ∧ q := by\n  exact ⟨hp, hq⟩",
                format: "code",
              },
            ],
          },
          {
            id: "foundation-proofs",
            title: "Read propositions as types and tactics as constructors",
            summary:
              "Learn implication, conjunction, existence, equality, and the small tactic vocabulary by tracking how each command changes the proof state.",
            source: [
              "Under Curry–Howard, a proposition is a type and a proof is a term of that type.",
              "intro, exact, apply, constructor, cases, rw, and simp are useful only when you can predict their effect on the local context and target.",
              "Proof-term style and tactic style build objects checked by the same kernel.",
            ],
            why: "AI-generated tactic scripts become much easier to audit when you can translate every line back into a constructor, function, rewrite, or previously proved lemma.",
            success:
              "You can prove conjunction commutativity and one existential statement, narrating every intermediate goal without relying on a broad automation tactic.",
            links: [
              {
                label: "Propositions and proofs",
                href: "https://lean-lang.org/theorem_proving_in_lean4/Propositions-and-Proofs/",
                note: "Official Curry–Howard and proof-term introduction.",
                kind: "official",
              },
              {
                label: "Tactics",
                href: "https://lean-lang.org/theorem_proving_in_lean4/Tactics/",
                note: "Official tactic-mode chapter.",
                kind: "official",
              },
            ],
            details: [
              {
                title: "Minimum tactic vocabulary",
                items: [
                  "intro introduces a function input or logical assumption; exact supplies a term whose type is the target.",
                  "constructor chooses the target type's constructor; cases covers every constructor of an available value.",
                  "rw performs a directed equality rewrite; simp normalizes with a controlled rule set.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Two auditable proofs",
                value:
                  "example (p q : Prop) : p ∧ q → q ∧ p := by\n  intro h\n  exact ⟨h.2, h.1⟩\n\nexample : ∃ n : Nat, n + 1 = 4 := by\n  refine ⟨3, ?_⟩\n  rfl",
                format: "code",
              },
            ],
          },
          {
            id: "foundation-induction",
            title: "Model data, recursion, and invariants",
            summary:
              "Use structures and inductive types to represent algorithm state, then separate initialization, preservation, and final correctness.",
            source: [
              "Inductive constructors determine how values are built; recursion consumes the same structure; induction proves properties over every constructor.",
              "For an algorithm, a useful decomposition is State, step, Inv, initialization, preservation, and a final theorem.",
              "An invariant that constrains representation does not automatically prove the intended probabilistic or semantic behavior.",
            ],
            why: "This is the conceptual bridge from beginner Lean to both branches: mathematical proofs need induction, while AI4TCS needs explicit state and invariants.",
            success:
              "You can define a small state structure and prove that one update preserves a nontrivial invariant, identifying exactly which property remains unproved.",
            caution:
              "If the induction hypothesis is too weak, strengthen the theorem or change the induction object before trying more automation.",
            details: [
              {
                title: "Three invariant levels",
                items: [
                  "Representation: indices, lengths, nonnegativity, and internal consistency.",
                  "Semantic: the state corresponds to the processed input prefix.",
                  "Final guarantee: the query result satisfies correctness or an error bound.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "State and preservation theorem",
                value:
                  "import Mathlib\n\nstructure StreamState where\n  seen : Nat\n  kept : List Nat\n\ndef StreamState.push (s : StreamState) (x : Nat) : StreamState :=\n  { seen := s.seen + 1, kept := x :: s.kept }\n\ndef StreamState.Inv (s : StreamState) : Prop :=\n  s.kept.length ≤ s.seen\n\ntheorem StreamState.push_preserves\n    (s : StreamState) (x : Nat) (h : s.Inv) :\n    (s.push x).Inv := by\n  simpa [StreamState.Inv, StreamState.push] using\n    Nat.succ_le_succ h",
                format: "code",
              },
            ],
          },
          {
            id: "foundation-search",
            title: "Search mathlib and debug from the target",
            summary:
              "Inspect exact types first, use suggestion tactics as explainable hints, and reduce failures to a small example before changing the environment.",
            source: [
              "#check and #print expose theorem interfaces; exact?, apply?, rw?, and simp? suggest locally available moves.",
              "norm_num, ring, linarith, omega, and decide solve different theories and should not be treated as interchangeable magic.",
              "Many failures come from a wrong import, namespace, coercion, typeclass instance, equality direction, or statement—not a missing clever tactic.",
            ],
            why: "A structured failure trace is both a learning artifact and the raw material for later proof-repair or theorem-proving experiments.",
            success:
              "You can reduce a failing theorem to at most twenty lines and classify the cause as parsing, name resolution, elaboration, an open goal, or project build configuration.",
            caution:
              "Do not use sorry, a new axiom, or a weakened statement to make a proof-repair exercise look successful.",
            links: [
              {
                label: "mathlib documentation",
                href: "https://leanprover-community.github.io/mathlib4_docs/",
                note: "Generated API reference for current mathlib declarations.",
                kind: "official",
              },
              {
                label: "Mathematics in Lean",
                href: "https://leanprover-community.github.io/mathematics_in_lean/",
                note: "Interactive mathlib-oriented textbook; especially useful after the logical basics.",
                kind: "official",
              },
            ],
            copyBlocks: [
              {
                label: "Search and diagnosis scratchpad",
                value:
                  "#check Nat.add_comm\n#check List.reverse_reverse\n#print Nat.add_comm\n\nexample (a b : Int) (h : a ≤ b) : a + 3 ≤ b + 3 := by\n  omega",
                format: "code",
              },
              {
                label: "Failure record",
                value:
                  "Toolchain and imports:\nOriginal statement:\nCurrent proof state:\nExact error:\nCandidate lemma and #check output:\nRoot-cause class:\nSmallest repair that preserves meaning:",
                format: "text",
              },
            ],
          },
          {
            id: "foundation-gate",
            title: "Pass the foundation gate and choose one branch",
            summary:
              "Finish with ten compiling theorems and one documented failure; then select AI4Math or AI4TCS instead of attempting both projects at once.",
            source: [
              "The supplied learning plan defines the Lean gate as ten theorems including induction, rewriting or simplification, and one retrieved mathlib lemma.",
              "A weekly artifact should be a theorem, a runnable check, or a concise explanation—not merely a completed reading list.",
              "The two branches share Lean but ask different research questions and use different evidence stacks.",
            ],
            why: "A visible gate prevents premature benchmark replication and makes the branch decision depend on demonstrated proof literacy rather than enthusiasm alone.",
            success:
              "A clean lake build checks ten theorems with no sorry; your log includes one minimized failure and a written reason for choosing exactly one branch.",
            details: [
              {
                title: "Minimum theorem portfolio",
                items: [
                  "Two propositions-as-types proofs, two equality/rewrite proofs, and two simple arithmetic proofs.",
                  "One list or tree induction proof, one structure/invariant theorem, and one theorem using a searched mathlib lemma.",
                  "One theorem of your choice accompanied by a natural-language/Lean statement comparison.",
                ],
              },
              {
                title: "Choose AI4Math when…",
                items: [
                  "You want to study formal statements, proof search, retrieval, autoformalization, or proof repair.",
                  "You are willing to audit quantifiers, definitions, and theorem-library dependencies carefully.",
                ],
              },
              {
                title: "Choose AI4TCS when…",
                items: [
                  "You want to study algorithm state, invariants, randomization, solver feedback, or algorithm discovery.",
                  "You enjoy combining code, counterexamples, experiments, formal properties, and complexity analysis.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Branch decision note",
                value:
                  "Chosen branch:\nObject I will produce:\nVerifier(s):\nWhat will be formally proved:\nWhat will only be tested:\nTwo-week stopping condition:\nAuditable final artifact:",
                format: "text",
              },
            ],
          },
        ],
      },
      ai4math: {
        badge: "∀",
        label: "AI4Math branch",
        time: "Weeks 3–4",
        intro:
          "Use Lean as a verifier for theorem proving, autoformalization, and proof repair, with semantic fidelity treated as a separate evaluation target.",
        steps: [
          {
            id: "math-task-map",
            title: "Separate four AI4Math tasks",
            summary:
              "Theorem proving, autoformalization, proof repair, and conjecture discovery have different inputs, success criteria, and failure modes.",
            source: [
              "Theorem proving fixes a formal statement and searches for a kernel-accepted proof.",
              "Autoformalization first has to preserve the meaning of an informal statement; kernel acceptance checks only the formal result.",
              "Proof repair should freeze the statement and allowed environment; conjecture discovery still needs novelty and relevance review.",
            ],
            why: "A single benchmark score cannot stand in for all four capabilities. Clear task boundaries make reading papers and designing a small project much more rigorous.",
            success:
              "Given a paper or demo, you can name its generated object, verifier, fixed inputs, and the claim that its evidence does not support.",
            links: [
              {
                label: "LeanDojo-v2",
                href: "https://github.com/lean-dojo/LeanDojo-v2",
                note: "Current official framework for data extraction, interaction, training, and proof search in Lean 4.",
                kind: "official",
              },
            ],
          },
          {
            id: "math-fidelity",
            title: "Audit statement fidelity before proving",
            summary:
              "Align every quantifier, domain, assumption, definition, and conclusion across the informal claim, mathematical statement, and Lean declaration.",
            source: [
              "A kernel-checked proof can still establish a mistranslated or vacuous theorem.",
              "Typical silent failures include changing Nat to Int or Real, dropping nonemptiness or independence, weakening a bound, or adding assumptions that make the result trivial.",
              "Statement review is an evaluation target separate from theorem proving.",
            ],
            why: "Autoformalization research is meaningful only when formal validity and semantic fidelity are measured independently.",
            success:
              "For one textbook theorem, you can produce a three-column alignment and name at least two plausible mistranslations that Lean itself would not reject.",
            details: [
              {
                title: "Six fidelity checks",
                items: [
                  "Quantifiers and their scope; input domain and subtype restrictions.",
                  "Implicit assumptions such as finiteness, nonemptiness, connectedness, independence, or measurability.",
                  "Definition choice, strict versus non-strict relations, degenerate cases, and conclusion strength.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Statement alignment sheet",
                value:
                  "Informal fragment | Mathematical meaning | Lean fragment | Possible loss\nQuantifier       |                      |               |\nDomain           |                      |               |\nAssumptions      |                      |               |\nDefinitions      |                      |               |\nConclusion       |                      |               |\nDegenerate cases |                      |               |",
                format: "text",
              },
            ],
          },
          {
            id: "math-baseline",
            title: "Write a human baseline before using an AI prover",
            summary:
              "Formalize a small theorem, write one transparent proof, and record its dependencies before asking search or a model to help.",
            source: [
              "A baseline fixes the intended statement, imports, toolchain, and allowed proof environment.",
              "Suggestion tactics can shorten a proof, but the retained script should still expose why it works.",
              "A model-assisted proof is easiest to evaluate when a human reference and clean build already exist.",
            ],
            why: "Without a baseline, a model may appear to solve the task by changing the statement, exploiting an unexpected imported theorem, or using a near-duplicate proof.",
            success:
              "You have one theorem with a readable hand proof, no sorry or new axiom, a clean build, and a short list of the declarations it depends on.",
            caution:
              "Do not start with miniF2F or a large proof agent. A 10–30 line theorem is enough to establish the evaluation protocol.",
            links: [
              {
                label: "Mathematics in Lean — Basics",
                href: "https://leanprover-community.github.io/mathematics_in_lean/C02_Basics.html",
                note: "Worked examples of calculation, rewriting, and library lemmas.",
                kind: "official",
              },
            ],
            copyBlocks: [
              {
                label: "Small human baseline",
                value:
                  "import Mathlib\n\ntheorem add_same_cancel (a b c : Nat)\n    (h : a + c = b + c) : a = b := by\n  exact Nat.add_right_cancel h",
                format: "code",
              },
            ],
          },
          {
            id: "math-search",
            title: "Treat proof search as an environment interaction",
            summary:
              "Represent the current goals and context as state, tactics or terms as actions, and Lean diagnostics as structured feedback.",
            source: [
              "A proof-search state contains goals, local context, imported environment, and options.",
              "An action may apply a tactic, term, lemma, or subgoal decomposition; Lean returns new goals or a typed error.",
              "Success means no goals, no placeholders, and a kernel-accepted final declaration under a frozen environment.",
            ],
            why: "This state/action/transition model connects manual Lean practice to LeanDojo-style theorem proving without requiring model training in the first project.",
            success:
              "For five attempts on one theorem, you have saved the state before the action, the candidate action, Lean's response, and the next decision.",
            links: [
              {
                label: "LeanDojo-v2 documentation",
                href: "https://leandojo.org/",
                note: "Current project entry for AI-driven formal theorem proving in Lean.",
                kind: "official",
              },
            ],
            copyBlocks: [
              {
                label: "Proof-search trace row",
                value:
                  "step_id:\ngoals_before:\nlocal_context:\ncandidate_action:\nlean_response:\nerror_class:\ngoals_after:\nnext_decision:",
                format: "text",
              },
            ],
          },
          {
            id: "math-repair",
            title: "Design a proof-repair experiment that cannot cheat",
            summary:
              "Freeze the theorem and toolchain, manufacture a small error taxonomy, and allow edits only inside the proof body.",
            source: [
              "Useful repair classes include a wrong lemma name, reversed equality, missing constructor branch, weak induction hypothesis, and missing instance/import.",
              "The evaluator must reject sorry, added axioms, statement changes, forbidden imports, and resource-budget violations.",
              "Renamed or isomorphic hidden variants test whether the repair method learned structure rather than a string patch.",
            ],
            why: "Repair is a compact, reproducible AI4Math project: the verifier is strong, failures are informative, and progress does not require training a foundation model.",
            success:
              "You have five broken proofs, an explicit allowed-edit region, hidden variants, and a result table with success, attempts, time, and failure class.",
            details: [
              {
                title: "Freeze these before evaluation",
                items: [
                  "The exact theorem statement, Lean/mathlib revision, imports, and project options.",
                  "The editable range, allowed tools and retrieval, time or attempt budget, and final clean-build command.",
                  "The semantic constraint: a repair must not weaken the statement or introduce new unreviewed assumptions.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Repair result schema",
                value:
                  "case,error_class,success,attempts,wall_time_s,new_imports,uses_sorry,statement_changed,notes",
                format: "text",
              },
            ],
          },
          {
            id: "math-literature",
            title: "Read benchmarks through six research questions",
            summary:
              "Use miniF2F, LeanDojo, and recent prover papers to study objects, representations, generators, verifiers, guarantees, and generalization—not just headline pass rates.",
            source: [
              "A benchmark result depends on the proof assistant and version, data construction, retrieval corpus, search budget, sampling count, and deduplication protocol.",
              "Kernel-verified rate does not measure autoformalization fidelity or research novelty.",
              "Repository and benchmark versions move; reproduce only after reading the current project instructions.",
            ],
            why: "This reading protocol turns papers into comparable systems rather than a leaderboard and makes version or contamination caveats visible.",
            success:
              "You can complete one comparison sheet for LeanDojo, a subgoal-based prover, and a formal-math benchmark without copying their abstract scores as conclusions.",
            caution:
              "The original miniF2F repository and several tutorials target older Lean environments. Treat them as benchmark history unless a current Lean 4 fork explicitly documents its toolchain.",
            links: [
              {
                label: "miniF2F paper",
                href: "https://arxiv.org/abs/2109.00110",
                note: "Primary benchmark paper; inspect the formal systems and splits before using code.",
                kind: "reference",
              },
              {
                label: "DeepSeek-Prover-V2 paper",
                href: "https://arxiv.org/abs/2504.21801",
                note: "Primary paper for subgoal decomposition and reinforcement-learning-based formal proving.",
                kind: "reference",
              },
            ],
            copyBlocks: [
              {
                label: "Six-question paper card",
                value:
                  "Object generated:\nRepresentation/search space:\nGenerator:\nVerifier and feedback:\nGuarantee actually supported:\nGeneralization / leakage test:\nVersion and search budget:\nOne limitation:",
                format: "text",
              },
            ],
          },
          {
            id: "math-project",
            title: "Finish a two-week semantic proof-repair project",
            summary:
              "Combine ten small statements, controlled formalization errors, baseline proofs, and frozen evaluation into one auditable repository.",
            source: [
              "Week one should establish the statement set, three-column semantic alignment, human baselines, and five error classes.",
              "Week two adds model or suggestion-tool repairs, hidden variants, clean builds, and error analysis.",
              "The final claim should distinguish kernel success from semantic fidelity and from generalization.",
            ],
            why: "This project is small enough for one person but still touches the central AI4Math loop: representation, generation, verification, feedback, and human semantic audit.",
            success:
              "The repository rebuilds from a clean checkout and contains ten aligned statements, baseline proofs, broken variants, repair traces, a result table, and at least one unresolved failure.",
            caution:
              "Stop at ten carefully audited problems. More automatically generated statements do not compensate for weak semantics or a movable evaluation target.",
            details: [
              {
                title: "Week 1 — freeze the task",
                items: [
                  "Select ten elementary discrete-math or algebra statements and write informal/math/Lean alignment sheets.",
                  "Build every human baseline and record imports, dependencies, and toolchain.",
                  "Create five controlled error classes and one hidden isomorphic variant per class.",
                ],
              },
              {
                title: "Week 2 — evaluate and explain",
                items: [
                  "Run a fixed number of repair attempts with a fixed allowed tool set.",
                  "Verify no statement, axiom, or forbidden dependency changed; rebuild cleanly.",
                  "Report success by error class and explain at least one semantic and one proof-search failure.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Final README outline",
                value:
                  "# Question and scope\n# Statement set and semantic audit\n# Frozen Lean environment\n# Human baselines\n# Error taxonomy and repair protocol\n# Hidden variants\n# Results\n# Failure analysis\n# What kernel acceptance does not establish",
                format: "text",
              },
            ],
          },
        ],
      },
      ai4tcs: {
        badge: "{ }",
        label: "AI4TCS branch",
        time: "Weeks 3–4",
        intro:
          "Move from proofs to algorithms: model state, invariants, random tapes, and layered verifiers without confusing tests with general guarantees.",
        steps: [
          {
            id: "tcs-verifier-stack",
            title: "Build a layered verifier",
            summary:
              "Algorithm candidates need more than a single score: type checks, counterexamples, hidden tests, formal invariants, and complexity review answer different questions.",
            source: [
              "Use a parser/type checker for the interface and small exhaustive search to find functional counterexamples.",
              "Use hidden and out-of-distribution tests for empirical robustness, then Lean or SMT for precisely stated properties.",
              "Treat runtime, space, random-bit cost, asymptotic guarantees, and novelty as separate audit layers.",
            ],
            why: "This is the smallest faithful version of generator–verifier–feedback systems used in algorithm discovery and neural algorithmic reasoning.",
            success:
              "You can label every project result as tested, exhaustively checked on a finite domain, formally proved, or analytically argued—without merging the labels.",
            links: [
              {
                label: "CLRS Algorithmic Reasoning Benchmark",
                href: "https://github.com/google-deepmind/clrs",
                note: "Official benchmark and reference implementations for studying algorithmic reasoning and size generalization.",
                kind: "official",
              },
            ],
          },
          {
            id: "tcs-object",
            title: "Define the algorithmic object before the model",
            summary:
              "Specify the candidate interface, legal inputs, objective, reference behavior, and rejection conditions before choosing an LLM, GNN, or search algorithm.",
            source: [
              "AI4TCS may generate a program, heuristic, solver decision, data structure, tensor decomposition, invariant, or conjecture; these are not interchangeable objects.",
              "Representation determines which candidates can be expressed and which constraints can be checked cheaply.",
              "A reference implementation and tiny finite domain often provide a stronger first verifier than a learned score.",
            ],
            why: "A precise object and interface prevent an experiment from collapsing into prompt engineering or benchmark-specific code generation.",
            success:
              "You can write the candidate function signature, legal-input predicate, exact baseline, objective, and three rejection conditions on one page.",
            copyBlocks: [
              {
                label: "Object specification",
                value:
                  "Object generated:\nInput domain:\nOutput/candidate format:\nLegality predicate:\nReference baseline:\nObjective score:\nImmediate rejection conditions:\nOut-of-scope claims:",
                format: "text",
              },
            ],
          },
          {
            id: "tcs-invariant",
            title: "Turn an algorithm into state, step, and invariant",
            summary:
              "Separate executable state transitions from representation invariants, semantic invariants, termination, and final output guarantees.",
            source: [
              "A state machine exposes init, step, query, and Inv as distinct objects.",
              "Initialization and preservation can be proved by induction over the input prefix or execution steps.",
              "A representation invariant such as kept.length ≤ seen does not prove that a sample is uniformly distributed.",
            ],
            why: "This decomposition produces small verifier targets for AI-generated algorithms and identifies exactly which claims still depend on probability or complexity analysis.",
            success:
              "For one streaming or graph routine, you can state one representation invariant, one semantic invariant, and one final guarantee without conflating them.",
            details: [
              {
                title: "Good first formal targets",
                items: [
                  "Array or list indices remain valid and counters stay nonnegative.",
                  "A processed-prefix relation is preserved by one update.",
                  "A final answer follows from the invariant and termination condition.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Invariant dependency skeleton",
                value:
                  "init satisfies Inv\nInv state inputPrefix\n  -> Inv (step state nextInput) (inputPrefix ++ [nextInput])\nInv finalState fullInput + termination\n  -> output property",
                format: "text",
              },
            ],
          },
          {
            id: "tcs-randomness",
            title: "Make randomness an explicit input",
            summary:
              "Model a randomized algorithm as a deterministic function of its ordinary input and a random tape, then prove deterministic and distributional layers separately.",
            source: [
              "For fixed random tape r, run x r is deterministic and can be tested or reasoned about like any other function.",
              "Probability comes from a distribution over tapes; a finite uniform sample space is a manageable first formalization.",
              "State safety, distribution correctness, tail bounds, and random-bit complexity are separate claims.",
            ],
            why: "This removes vague 'random behavior' from the code and creates a clean bridge between exhaustive enumeration, Lean counting arguments, and probabilistic analysis.",
            success:
              "You can enumerate a finite random-tape type for a toy algorithm and state which property holds for every tape and which holds only with some probability.",
            caution:
              "Do not start by formalizing measure-theoretic probability, a full Chernoff bound, or end-to-end Count-Min Sketch. Begin with finite events and explicit nonempty assumptions.",
            copyBlocks: [
              {
                label: "Finite event counting sketch",
                value:
                  "def eventCount [Fintype Ω]\n    (E : Ω → Prop) [DecidablePred E] : Nat :=\n  (Finset.univ.filter E).card\n\n-- Probability additionally needs a distribution;\n-- for a uniform space, explicitly require Fintype.card Ω > 0.",
                format: "code",
              },
            ],
          },
          {
            id: "tcs-loop",
            title: "Build generator–verifier–feedback without leakage",
            summary:
              "Keep search, validation, hidden, and out-of-distribution instances separate, and save the first counterexample rather than only the best score.",
            source: [
              "The generator proposes candidates; the verifier checks legality and correctness before assigning an objective score.",
              "Adaptive search can overfit a fixed evaluator even when no gradient is used.",
              "Hidden tests must stay outside prompts and repair feedback; final candidates should face size or distribution shifts.",
            ],
            why: "This is the core engineering lesson behind verifier-guided algorithm discovery: the evaluator must be accurate, hard to game, and independent of the final audit.",
            success:
              "Your protocol names four non-overlapping instance sets, a fixed search budget, seed policy, counterexample minimizer, and a final OOD check.",
            details: [
              {
                title: "Minimal loop",
                items: [
                  "Parse and sandbox the candidate; reject interface or resource violations.",
                  "Run tiny exhaustive cases and visible validation feedback during search.",
                  "Freeze the candidate, then run hidden and OOD suites once and archive all failures.",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Evaluation split contract",
                value:
                  "search_cases: visible to the generator\nvalidation_cases: used for selection\nhidden_cases: never placed in prompts or feedback\nood_cases: larger size or shifted distribution\nsearch_budget:\nseed_policy:\nfirst_failure_artifact:",
                format: "text",
              },
            ],
          },
          {
            id: "tcs-evidence",
            title: "Register tests, proofs, and complexity separately",
            summary:
              "Attach each conclusion to the verifier that supports it and explicitly list the stronger conclusions that remain open.",
            source: [
              "Compilation checks interface; exhaustive finite search covers only the enumerated domain; random tests cover a stated distribution and budget.",
              "SMT unsatisfiability depends on the fidelity of the encoding; a Lean theorem depends on its statement and imported assumptions.",
              "Empirical speedups do not establish an asymptotic improvement, and asymptotic bounds do not predict every hardware constant.",
            ],
            why: "An evidence register prevents a strong result in one layer from being rhetorically promoted into a stronger but unsupported algorithmic claim.",
            success:
              "Every result row in your project names its claim, scope, verifier, artifact, assumptions, and unsupported extrapolation.",
            copyBlocks: [
              {
                label: "Evidence register schema",
                value:
                  "claim,scope,verifier,artifact,assumptions,unsupported_extrapolation\ninterface valid,all candidates,type checker,build log,,functional correctness\nno small counterexample,n≤8,exhaustive search,counterexample log,,all n\ninvariant preserved,formal statement,Lean kernel,.lean theorem,imports and axioms,semantic fidelity\nfaster median,test distribution,benchmark,timing csv,hardware and seeds,asymptotic improvement",
                format: "text",
              },
            ],
          },
          {
            id: "tcs-project",
            title: "Finish a two-week candidate-verifier project",
            summary:
              "Choose one small discrete object, implement an exact baseline and layered verifier, then evaluate a simple mutation or model-generated candidate under a frozen budget.",
            source: [
              "Suitable objects include a tiny scheduling heuristic, graph traversal rule, data-structure operation sequence, finite sampling invariant, or low-order decomposition checker.",
              "Week one builds the object representation, baseline, exhaustive verifier, and minimized counterexamples.",
              "Week two adds a generator, hidden/OOD tests, one formal invariant or SMT property, and a precise evidence report.",
            ],
            why: "The project reproduces the research shape of AI4TCS without training a large model or pretending a small benchmark improvement is a new asymptotic algorithm.",
            success:
              "A clean repository can reproduce the baseline, fixed search, hidden evaluation, result table, first counterexample, and one formally or exhaustively checked property.",
            caution:
              "Stop if you cannot define legality or an exact small-instance verifier. Increasing model complexity cannot repair an ambiguous target.",
            details: [
              {
                title: "Recommended default: randomized-candidate verifier",
                items: [
                  "Use a toy sampling, hashing, scheduling, or graph problem with a tiny enumerable domain.",
                  "Start with rule-based mutations or a very small model-facing interface; keep generation replaceable.",
                  "Preserve the first failing input and minimize it into a human-readable counterexample.",
                ],
              },
              {
                title: "Alternative: Lean formalization project",
                items: [
                  "Formalize a finite event count, a sampling-state size invariant, or a simple union-bound skeleton.",
                  "Use external enumeration only as a cross-check and label the probability layer not yet formalized.",
                ],
              },
            ],
            links: [
              {
                label: "Algorithms with Predictions",
                href: "https://doi.org/10.1145/3528087",
                note: "Primary survey for consistency, robustness, and learning-augmented algorithm guarantees.",
                kind: "reference",
              },
            ],
            copyBlocks: [
              {
                label: "Final repository outline",
                value:
                  "README.md\nnotes/problem-and-object.md\nnotes/evidence-register.csv\nnotes/failure-analysis.md\nsrc/baseline.*\nsrc/candidate_interface.*\nverifier/exhaustive.*\nverifier/hidden.*\nformal/Invariant.lean\nresults/summary.csv",
                format: "text",
              },
            ],
          },
        ],
      },
    };
  }

  return {
    foundation: {
      badge: "λ",
      label: "Lean 共同基础",
      time: "第 1–2 周",
      intro:
        "先学会读 proof state、写小型 theorem，并准确理解 Lean kernel 能验证什么、不能验证什么，再进入 AI4Math 或 AI4TCS。",
      steps: [
        {
          id: "foundation-model",
          title: "先把 Lean 放进验证闭环",
          summary:
            "在学习 tactic 或让 AI 生成代码之前，先建立“对象—形式陈述—证明—内核—人类审查”的完整模型。",
          source: [
            "Lean 既是函数式语言，也是基于依赖类型论的交互式定理证明器。",
            "tactic 与 AI 工具可以构造候选证明；kernel 检查最终 proof term 是否具有声明的命题类型。",
          ],
          why: "这能避免最常见的误区：Lean 编译通过，只说明当前形式陈述被证明，不自动说明自然语言题意翻译正确，也不说明结论具有研究价值。",
          success:
            "你能用自己的话分别解释 statement 设计、proof search、kernel check 与人类语义审查的职责。",
          links: [
            {
              label: "Theorem Proving in Lean 4",
              href: "https://lean-lang.org/theorem_proving_in_lean4/",
              note: "Lean 官方证明入门书。",
              kind: "official",
            },
            {
              label: "Lean 语言参考手册",
              href: "https://lean-lang.org/doc/reference/latest/",
              note: "用于查精确定义和当前语法；不建议从头当入门教材阅读。",
              kind: "official",
            },
          ],
          copyBlocks: [
              {
                label: "学习模型",
              value:
                "自然语言命题\n  -> 形式 statement\n  -> proof term / tactic script\n  -> Lean kernel check\n  -> 人类语义与研究价值审查",
              format: "text",
              },
            ],
          },
          {
            id: "foundation-entry",
            title: "先选浏览器试学，还是本地项目",
            summary:
              "只想用十分钟感受 Lean，可先使用在线编辑器；准备保留代码、使用 mathlib 与复现构建时，再进入本地项目。",
            source: [
              "Lean 官方学习页提供 Lean4Web，适合不安装环境的一次性试验。",
              "本地推荐工作流由 elan 管理 toolchain、VS Code 官方 Lean 4 扩展提供交互、Lake 管理项目。",
              "正式的 mathlib 练习应放入固定 toolchain 与依赖的项目，而不是散落的 .lean 文件。",
            ],
            why: "把“低门槛初体验”和“可复现项目”分开，可以避免安装阻塞第一课，也避免长期在错误的散文件环境里学习。",
            success:
              "你已经在线运行一个极小例子，或按官方指南完成本地安装并能打印 elan、Lean 与 Lake 的版本。",
            caution:
              "下方只提供只读版本检查。安装请按当前官方页面选择操作系统，不要从旧截图复制安装脚本。",
            links: [
              {
                label: "Lean 官方安装页",
                href: "https://lean-lang.org/install/",
                note: "按操作系统提供 elan 与 VS Code 配置步骤。",
                kind: "official",
              },
              {
                label: "Lean 官方学习入口",
                href: "https://lean-lang.org/lean4/doc",
                note: "汇总教材、游戏、Lean4Web 与面向机器交互的工具。",
                kind: "official",
              },
            ],
            details: [
              {
                title: "十分钟浏览器路线",
                items: [
                  "从官方 Learn 页面进入 Lean4Web，建立一个临时文件。",
                  "尝试 #eval 1 + 1 与一条最小 theorem；这一步只用于建立直觉。",
                  "开始 mathlib 练习或希望长期保存时，迁移到 Lake 项目。",
                ],
              },
              {
                title: "本地路线",
                items: [
                  "按官方页面安装 elan，并在 VS Code 中安装发布者为 leanprover 的 Lean 4 扩展。",
                  "新命令暂时找不到时，先重开终端，不要让系统包管理器替你安装另一个同名工具。",
                  "记录真实版本即可，不要求和资料截图中的版本号一致。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "只读版本检查",
                value: "elan --version\nlean --version\nlake --version",
                format: "terminal",
              },
              {
                label: "第一组 Lean 表达式",
                value:
                  "#check Nat\n#check Nat.add\n#eval 1 + 1\n\nexample (n : Nat) : n = n := by\n  rfl",
                format: "code",
              },
            ],
          },
          {
            id: "foundation-project",
            title: "创建 mathlib 项目，而不是打开单个文件",
            summary:
              "使用 mathlib 模板创建 Lake 项目，获取官方缓存，并把 toolchain、配置与 manifest 和学习代码一起保留。",
            source: [
              "当前 mathlib 文档建议用 math 模板创建新项目，使 import Mathlib 对应到明确声明的依赖。",
              "lean-toolchain 固定 Lean 版本，lakefile.toml 声明依赖，lake-manifest.json 记录已解析的 revision。",
              "lake exe cache get 下载 mathlib 预构建产物，避免在本机从头编译整个库。",
            ],
            why: "原始资料中的通用 lake init 适合解释 Lake；公开教程改用 mathlib 专用模板，依赖与相容 toolchain 能一起生成，更不容易在第一步报错。",
            success:
              "项目根目录存在 lean-toolchain 与 lakefile.toml，VS Code 能解析 import Mathlib，完整 lake build 无错误结束。",
            caution:
              "创建命令会新建目录并初始化 Git；缓存步骤需要联网且可能下载较多数据。请先选择合适位置，再由你自行逐条执行。",
            links: [
              {
                label: "mathlib4 依赖使用说明",
                href: "https://github.com/leanprover-community/mathlib4/wiki/Using-mathlib4-as-a-dependency",
                note: "当前项目模板、缓存、更新与兼容性说明。",
                kind: "official",
              },
              {
                label: "Lean 项目结构说明",
                href: "https://leanprover-community.github.io/install/project.html",
                note: "Lean 社区维护的项目结构与 VS Code 工作流。",
                kind: "official",
              },
            ],
            details: [
              {
                title: "需要真正理解的文件",
                items: [
                  "lean-toolchain 固定项目期望的 Lean 版本。",
                  "lakefile.toml 描述包与 mathlib 依赖；lake-manifest.json 记录解析结果。",
                  ".lake 是本机缓存，不是学习成果，也不应靠复制它复现环境。",
                ],
              },
              {
                title: "VS Code 一次出现大量错误时",
                items: [
                  "确认打开的是项目根目录，而不是某个 .lean 文件或更上层目录。",
                  "确认 Lean 4 扩展正在使用项目 toolchain。",
                  "从项目根目录运行 lake build，先保留第一条完整错误，再考虑缓存问题。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "创建当前 mathlib 项目",
                value:
                  "lake +leanprover-community/mathlib4:lean-toolchain new lean-self-study math\ncd lean-self-study\nlake exe cache get\nlake build",
                format: "terminal",
                note: "先阅读再执行：会创建目录、初始化 Git，并下载依赖与缓存。",
              },
              {
                label: "LeanSelfStudy/Basic.lean",
                value:
                  "import Mathlib\n\n#check Nat.add_comm\n\nexample (a b : Nat) : a + b = b + a := by\n  omega\n\nexample (p q : Prop) (hp : p) (hq : q) : p ∧ q := by\n  exact ⟨hp, hq⟩",
                format: "code",
              },
            ],
          },
          {
            id: "foundation-proofs",
            title: "把命题读成类型，把 tactic 读成构造动作",
            summary:
              "围绕蕴含、合取、存在、等式与小型 tactic 词表，逐步观察每条命令如何改变 proof state。",
            source: [
              "在 Curry–Howard 视角下，命题是类型，证明是这个类型的项。",
              "intro、exact、apply、constructor、cases、rw 与 simp 只有在你能预测上下文和目标变化时才真正有用。",
              "proof term 风格与 tactic 风格最终都构造由同一 kernel 检查的对象。",
            ],
            why: "当你能把 AI 生成的每行 tactic 还原为构造子、函数、重写或已有 lemma，证明脚本才真正可审计。",
            success:
              "你能证明合取交换与一个存在命题，并且不依赖宽泛自动化，逐步讲出每个中间目标。",
            links: [
              {
                label: "Propositions and Proofs",
                href: "https://lean-lang.org/theorem_proving_in_lean4/Propositions-and-Proofs/",
                note: "官方 Curry–Howard 与 proof term 入门。",
                kind: "official",
              },
              {
                label: "Tactics",
                href: "https://lean-lang.org/theorem_proving_in_lean4/Tactics/",
                note: "Lean 官方 tactic 章节。",
                kind: "official",
              },
            ],
            details: [
              {
                title: "最低限度 tactic 词表",
                items: [
                  "intro 引入函数输入或逻辑假设；exact 提供类型与目标完全匹配的项。",
                  "constructor 选择目标类型的构造子；cases 覆盖现有值的每个构造分支。",
                  "rw 按方向重写等式；simp 用受控规则集进行规范化。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "两条可逐行审计的证明",
                value:
                  "example (p q : Prop) : p ∧ q → q ∧ p := by\n  intro h\n  exact ⟨h.2, h.1⟩\n\nexample : ∃ n : Nat, n + 1 = 4 := by\n  refine ⟨3, ?_⟩\n  rfl",
                format: "code",
              },
            ],
          },
          {
            id: "foundation-induction",
            title: "用数据、递归与不变量表达算法",
            summary:
              "用 structure 与 inductive 表示算法状态，再把初始化、保持性和最终正确性分开。",
            source: [
              "归纳类型的构造子决定值如何产生；递归沿同一结构消费值；归纳证明覆盖每一种构造方式。",
              "算法形式化可拆成 State、step、Inv、初始化、保持性与最终 theorem。",
              "约束表示结构的不变量，不自动证明随机分布或业务语义正确。",
            ],
            why: "这是 Lean 入门通向两条支线的关键桥梁：AI4Math 需要归纳结构，AI4TCS 需要显式状态与不变量。",
            success:
              "你能定义一个小型状态结构，证明一次更新保持非平凡不变量，并指出仍未被证明的性质。",
            caution:
              "归纳假设太弱时，先加强 theorem 或调整归纳对象，不要靠重复尝试自动化掩盖数学问题。",
            details: [
              {
                title: "三层不变量",
                items: [
                  "表示层：索引、长度、非负性与内部一致性。",
                  "语义层：状态与已经处理的输入前缀对应。",
                  "最终层：query 结果满足正确性或误差界。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "状态与保持性 theorem",
                value:
                  "import Mathlib\n\nstructure StreamState where\n  seen : Nat\n  kept : List Nat\n\ndef StreamState.push (s : StreamState) (x : Nat) : StreamState :=\n  { seen := s.seen + 1, kept := x :: s.kept }\n\ndef StreamState.Inv (s : StreamState) : Prop :=\n  s.kept.length ≤ s.seen\n\ntheorem StreamState.push_preserves\n    (s : StreamState) (x : Nat) (h : s.Inv) :\n    (s.push x).Inv := by\n  simpa [StreamState.Inv, StreamState.push] using\n    Nat.succ_le_succ h",
                format: "code",
              },
            ],
          },
          {
            id: "foundation-search",
            title: "从目标出发检索 mathlib，并把失败缩小",
            summary:
              "先看精确类型，把建议型 tactic 当作可解释提示，再将失败缩成最小例子，而不是先重装环境。",
            source: [
              "#check 与 #print 展示定理接口；exact?、apply?、rw? 与 simp? 给出当前环境中的候选动作。",
              "norm_num、ring、linarith、omega 与 decide 面向不同理论，不能互相当作万能按钮。",
              "常见根因是 import、命名空间、coercion、typeclass instance、等式方向或 statement 写错。",
            ],
            why: "结构化失败轨迹既是学习成果，也是后续 proof repair 与 theorem proving 实验最有价值的数据。",
            success:
              "你能把一个失败 theorem 缩到 20 行以内，并把根因归类为解析、名称、elaboration、未关闭目标或项目构建。",
            caution:
              "不要用 sorry、新 axiom 或削弱 statement，把 proof repair 伪装成成功。",
            links: [
              {
                label: "mathlib 当前 API 文档",
                href: "https://leanprover-community.github.io/mathlib4_docs/",
                note: "查询当前 mathlib 声明、命名空间和类型。",
                kind: "official",
              },
              {
                label: "Mathematics in Lean",
                href: "https://leanprover-community.github.io/mathematics_in_lean/",
                note: "完成逻辑基础后，进入 mathlib 数学形式化的主教材。",
                kind: "official",
              },
            ],
            copyBlocks: [
              {
                label: "检索与诊断草稿",
                value:
                  "#check Nat.add_comm\n#check List.reverse_reverse\n#print Nat.add_comm\n\nexample (a b : Int) (h : a ≤ b) : a + 3 ≤ b + 3 := by\n  omega",
                format: "code",
              },
              {
                label: "失败记录模板",
                value:
                  "Toolchain 与 imports：\n原 statement：\n当前 proof state：\n完整错误：\n候选 lemma 及 #check 输出：\n根因分类：\n保持语义的最小修复：",
                format: "text",
              },
            ],
          },
          {
            id: "foundation-gate",
            title: "通过共同基础闸门，再只选一条支线",
            summary:
              "用十条可编译 theorem 与一份失败记录结束共同基础，然后只选择 AI4Math 或 AI4TCS，不同时启动两个项目。",
            source: [
              "原始学习计划将 Lean 闸门定义为十条 theorem，其中应包含归纳、重写或简化，以及一次 mathlib 引理检索。",
              "每周成果应是 theorem、可运行检查或简短解释，而不只是“读完了”。",
              "两条支线共享 Lean 基础，但研究对象与证据栈不同。",
            ],
            why: "可见的学习闸门能防止过早复现大型 benchmark，也让支线选择建立在已经证明的能力上。",
            success:
              "干净 lake build 检查十条无 sorry 的 theorem；日志包含一个最小失败例，以及只选择一条支线的书面理由。",
            details: [
              {
                title: "十条 theorem 的最低组合",
                items: [
                  "两条命题即类型、两条等式/重写、两条基础算术。",
                  "一条列表或树归纳、一条结构/不变量、一条使用检索到的 mathlib lemma。",
                  "最后一条自选，但要附自然语言与 Lean statement 对照。",
                ],
              },
              {
                title: "适合选择 AI4Math",
                items: [
                  "你想研究 formal statement、proof search、检索、自动形式化或 proof repair。",
                  "你愿意仔细审计量词、定义与 theorem library 依赖。",
                ],
              },
              {
                title: "适合选择 AI4TCS",
                items: [
                  "你想研究算法状态、不变量、随机化、求解器反馈或算法发现。",
                  "你喜欢把代码、反例、实验、形式性质与复杂度分析结合起来。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "支线选择卡",
                value:
                  "选择支线：\n准备产出的对象：\nVerifier：\n哪些内容形式证明：\n哪些内容只做测试：\n两周停止条件：\n最终可审计产物：",
                format: "text",
              },
            ],
          },
        ],
    },
    ai4math: {
      badge: "∀",
      label: "AI4Math 支线",
      time: "第 3–4 周",
      intro:
        "把 Lean 用作定理证明、自动形式化与 proof repair 的 verifier，并把语义忠实单独作为验收目标。",
      steps: [
        {
          id: "math-task-map",
          title: "先分清四类 AI4Math 任务",
          summary:
            "theorem proving、autoformalization、proof repair 与 conjecture discovery 的输入、成功标准和风险并不相同。",
          source: [
            "定理证明固定 formal statement，搜索 kernel 可接受的 proof。",
            "自动形式化先要保证自然语言含义被忠实表达；kernel 只检查翻译后的形式对象。",
            "proof repair 应冻结 statement 与允许环境；猜想发现还要额外审查新颖性与重要性。",
          ],
          why: "单一 benchmark 分数不能同时代表这四种能力。先划清任务，读论文和设计小项目时才不会把“能编译”夸大成“会研究数学”。",
          success:
            "面对一篇论文或演示，你能指出它生成什么对象、由谁验证、哪些输入被冻结，以及证据不能支持什么结论。",
          links: [
            {
                label: "LeanDojo-v2",
                href: "https://github.com/lean-dojo/LeanDojo-v2",
                note: "当前用于 Lean 4 数据提取、环境交互、训练与证明搜索的官方框架。",
                kind: "official",
              },
            ],
          },
          {
            id: "math-fidelity",
            title: "证明前先审计 statement fidelity",
            summary:
              "把自然语言、数学陈述与 Lean declaration 并排，对齐量词、输入域、假设、定义、结论与退化情况。",
            source: [
              "kernel 接受的证明，仍可能证明了误译、过弱或平凡成立的命题。",
              "常见 silent failure 包括 Nat/Int/Real 混用，遗漏非空或独立性，改变不等式强度，或加入让结论平凡的假设。",
              "statement 审核应是独立于 theorem proving 的验收目标。",
            ],
            why: "自动形式化研究只有把形式正确与语义忠实分开测量，结果才有解释力。",
            success:
              "任选一条教材定理，完成三列表，并指出至少两种 Lean 不会主动拒绝的误译。",
            details: [
              {
                title: "六项语义核对",
                items: [
                  "量词及作用域；输入域与 subtype 限制。",
                  "有限、非空、连通、独立、可测等隐含前提。",
                  "定义选择、严格/非严格关系、退化情形与结论强度。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "Statement 对齐表",
                value:
                  "自然语言片段 | 数学含义 | Lean 片段 | 可能丢失\n量词           |          |           |\n输入域         |          |           |\n前提           |          |           |\n定义           |          |           |\n结论           |          |           |\n退化情形       |          |           |",
                format: "text",
              },
            ],
          },
          {
            id: "math-baseline",
            title: "使用 AI prover 前先写人工 baseline",
            summary:
              "选一条小 theorem，先由自己写出透明证明并记录依赖，再让搜索器或模型介入。",
            source: [
              "baseline 固定预期 statement、imports、toolchain 与允许的证明环境。",
              "建议型 tactic 可以帮助缩短脚本，但保留结果仍应让人读得懂。",
              "已有人工参考与干净构建，才容易判断模型究竟解决了什么。",
            ],
            why: "没有 baseline 时，模型可能通过改 statement、调用意外导入的同义 theorem 或记忆近重复证明制造成功假象。",
            success:
              "你有一条可读的人工证明，无 sorry 与新 axiom，干净构建通过，并列出主要依赖声明。",
            caution:
              "不要从 miniF2F 或大型 proof agent 起步；10–30 行的小 theorem 已足够建立评测协议。",
            links: [
              {
                label: "Mathematics in Lean · Basics",
                href: "https://leanprover-community.github.io/mathematics_in_lean/C02_Basics.html",
                note: "计算、重写与库中 lemma 的完整示例。",
                kind: "official",
              },
            ],
            copyBlocks: [
              {
                label: "小型人工 baseline",
                value:
                  "import Mathlib\n\ntheorem add_same_cancel (a b c : Nat)\n    (h : a + c = b + c) : a = b := by\n  exact Nat.add_right_cancel h",
                format: "code",
              },
            ],
          },
          {
            id: "math-search",
            title: "把 proof search 看成环境交互",
            summary:
              "把 goals 与上下文视为 state，把 tactic、term 或 lemma 视为 action，把 Lean 诊断保存为结构化反馈。",
            source: [
              "state 包含当前 goals、local context、导入环境与选项。",
              "action 可以是 tactic、term、lemma application 或 subgoal decomposition；Lean 返回新 goals 或带类型的错误。",
              "终点是没有 goals、没有占位，并在冻结环境中由 kernel 接受最终 declaration。",
            ],
            why: "state/action/transition 模型把手工 Lean 练习连接到 LeanDojo 式 theorem proving，而第一项目仍不需要训练模型。",
            success:
              "围绕一条 theorem 保存五次尝试：动作前 state、候选 action、Lean 响应和下一步决策。",
            links: [
              {
                label: "LeanDojo-v2 项目入口",
                href: "https://leandojo.org/",
                note: "当前 Lean AI 定理证明框架与文档入口。",
                kind: "official",
              },
            ],
            copyBlocks: [
              {
                label: "Proof-search 轨迹",
                value:
                  "step_id：\ngoals_before：\nlocal_context：\ncandidate_action：\nlean_response：\nerror_class：\ngoals_after：\nnext_decision：",
                format: "text",
              },
            ],
          },
          {
            id: "math-repair",
            title: "设计无法作弊的 proof-repair 实验",
            summary:
              "冻结 theorem 与 toolchain，人工制造小型错误分类，并只允许修改 proof body。",
            source: [
              "可控错误包括错 lemma 名、等式方向反了、缺分支、归纳假设太弱，以及缺 instance/import。",
              "evaluator 必须拒绝 sorry、新 axiom、statement 改动、禁用 import 与超出资源预算。",
              "变量重命名或同构 hidden variant 用于判断方法学会结构，还是只会字符串补丁。",
            ],
            why: "proof repair 是紧凑而可复现的 AI4Math 项目：verifier 强、失败有信息量，也不需要训练基础模型。",
            success:
              "你有五条故障 proof、明确的可编辑范围、hidden variants，以及包含成功率、尝试数、耗时和失败类型的结果表。",
            details: [
              {
                title: "评测前必须冻结",
                items: [
                  "theorem 原文、Lean/mathlib revision、imports 与项目选项。",
                  "可编辑范围、允许工具与检索、时间/尝试预算、最终干净构建命令。",
                  "语义约束：不能削弱 statement，也不能引入未经审核的新假设。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "修复结果字段",
                value:
                  "case,error_class,success,attempts,wall_time_s,new_imports,uses_sorry,statement_changed,notes",
                format: "text",
              },
            ],
          },
          {
            id: "math-literature",
            title: "用六个问题读 benchmark 与 prover 论文",
            summary:
              "阅读 miniF2F、LeanDojo 与近期 prover 时，记录对象、表示、生成器、verifier、保证与泛化，而不只抄 headline pass rate。",
            source: [
              "benchmark 结果依赖 proof assistant 版本、数据构造、检索库、搜索预算、采样数与去重协议。",
              "kernel-verified rate 不衡量自动形式化语义忠实，也不衡量研究新颖性。",
              "仓库与 benchmark 会更新；复现前必须重新阅读当前项目说明。",
            ],
            why: "这种阅读协议能把论文还原成可比较的系统，并显式暴露版本与数据污染边界。",
            success:
              "为 LeanDojo、一个 subgoal prover 和一个形式数学 benchmark 各完成一张对照卡，不把摘要分数直接当作结论。",
            caution:
              "原始 miniF2F 仓库及一些旧教程使用早期 Lean 环境；除非当前 Lean 4 fork 明确记录 toolchain，否则只将其作为 benchmark 历史资料。",
            links: [
              {
                label: "miniF2F 论文",
                href: "https://arxiv.org/abs/2109.00110",
                note: "原始 benchmark 论文；使用代码前先核对形式系统与数据划分。",
                kind: "reference",
              },
              {
                label: "DeepSeek-Prover-V2 论文",
                href: "https://arxiv.org/abs/2504.21801",
                note: "subgoal decomposition 与强化学习形式证明的代表工作。",
                kind: "reference",
              },
            ],
            copyBlocks: [
              {
                label: "六问论文卡",
                value:
                  "生成对象：\n表示与搜索空间：\nGenerator：\nVerifier 与反馈：\n证据真正支持的 guarantee：\n泛化/泄漏检查：\n版本与搜索预算：\n一个局限：",
                format: "text",
              },
            ],
          },
          {
            id: "math-project",
            title: "用两周完成语义审计 + proof repair 小项目",
            summary:
              "围绕十条小型 statement、可控形式化错误、人工 baseline 与冻结评测，建立一个可审计仓库。",
            source: [
              "第 1 周确定题集、三列语义对齐、人工 baseline 与五种错误。",
              "第 2 周加入模型或建议工具修复、hidden variants、干净构建与错误分析。",
              "最终结论必须区分 kernel success、semantic fidelity 与 generalization。",
            ],
            why: "这个规模适合个人完成，同时覆盖 AI4Math 的关键闭环：表示、生成、验证、反馈与人类语义审查。",
            success:
              "干净 checkout 可重建；仓库包含十条对齐 statement、baseline、故障版本、修复轨迹、结果表与至少一个未解决失败。",
            caution:
              "停在十道经过认真审计的问题。自动生成更多 statement 不能弥补语义薄弱或可移动的评测目标。",
            details: [
              {
                title: "第 1 周：冻结任务",
                items: [
                  "选择十条初等离散数学或代数命题，制作自然语言/数学/Lean 对齐表。",
                  "构建全部人工 baseline，记录 imports、依赖与 toolchain。",
                  "设计五类可控错误，并为每类准备一个同构 hidden variant。",
                ],
              },
              {
                title: "第 2 周：评测与解释",
                items: [
                  "固定允许工具与尝试次数，运行修复。",
                  "检查 statement、axiom 与禁用依赖未变化，并干净构建。",
                  "按错误类型报告成功率，解释至少一个语义失败和一个搜索失败。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "最终 README 结构",
                value:
                  "# 问题与范围\n# Statement 集与语义审计\n# 冻结的 Lean 环境\n# 人工 baseline\n# 错误分类与修复协议\n# Hidden variants\n# 结果\n# 失败分析\n# Kernel 接受仍不能说明什么",
                format: "text",
              },
            ],
          },
        ],
    },
    ai4tcs: {
      badge: "{ }",
      label: "AI4TCS 支线",
      time: "第 3–4 周",
      intro:
        "从证明转向算法：形式化状态、不变量、random tape 与分层 verifier，不把测试通过混同为一般性保证。",
      steps: [
        {
          id: "tcs-verifier-stack",
          title: "建立分层 verifier",
          summary:
            "候选算法不能只看一个分数；接口检查、反例、隐藏测试、形式不变量与复杂度审查分别回答不同问题。",
          source: [
            "parser/type checker 检查接口，小规模穷举寻找功能反例。",
            "hidden 与 OOD 测试检查经验鲁棒性，再用 Lean 或 SMT 验证精确定义的性质。",
            "运行时间、空间、随机位、渐近保证与创新性需要单独登记和审查。",
          ],
          why: "这是算法发现和神经算法推理中 generator—verifier—feedback 系统最小而不失真的版本。",
          success:
            "你能把每个结果准确标成“测试过”“有限域穷举通过”“形式证明”或“纸笔分析”，而不混用证据等级。",
          links: [
            {
                label: "CLRS Algorithmic Reasoning Benchmark",
                href: "https://github.com/google-deepmind/clrs",
                note: "研究算法推理与跨规模泛化的官方 benchmark 和参考实现。",
                kind: "official",
              },
            ],
          },
          {
            id: "tcs-object",
            title: "先定义算法对象，再考虑模型",
            summary:
              "在选择 LLM、GNN 或搜索算法前，先写清候选接口、合法输入、objective、reference behavior 与拒绝条件。",
            source: [
              "AI4TCS 可能生成程序、启发式、求解器动作、数据结构、张量分解、不变量或猜想；这些对象不能混为一谈。",
              "representation 决定哪些候选可以表达，以及哪些约束能被便宜验证。",
              "reference implementation 与极小有限域通常比 learned score 更适合作为第一层 verifier。",
            ],
            why: "精确对象与接口能防止实验退化成 prompt engineering 或针对单一 benchmark 写特例。",
            success:
              "用一页纸写出 candidate function signature、合法输入谓词、exact baseline、objective 与三条立即拒绝条件。",
            copyBlocks: [
              {
                label: "算法对象说明",
                value:
                  "生成对象：\n输入域：\n候选格式/输出：\n合法性谓词：\nReference baseline：\nObjective：\n立即拒绝条件：\n明确不声称的结论：",
                format: "text",
              },
            ],
          },
          {
            id: "tcs-invariant",
            title: "把算法拆成 state、step 与 invariant",
            summary:
              "将可执行状态转换、表示不变量、语义不变量、终止性和最终输出保证分开。",
            source: [
              "状态机显式暴露 init、step、query 与 Inv。",
              "初始化和保持性可沿输入前缀或执行步数归纳。",
              "kept.length ≤ seen 这类表示不变量，并不证明样本服从均匀分布。",
            ],
            why: "这种分解为 AI 生成算法提供小而明确的 verifier target，也能指出哪些结论仍依赖概率或复杂度分析。",
            success:
              "为一个流算法或图算法分别写出一条表示不变量、一条语义不变量与最终 guarantee，并明确区分。",
            details: [
              {
                title: "适合先形式化的性质",
                items: [
                  "数组/列表索引合法，计数器非负。",
                  "一次更新保持与已处理输入前缀的对应关系。",
                  "在终止条件下，由不变量推出最终输出性质。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "不变量依赖骨架",
                value:
                  "init 满足 Inv\nInv state inputPrefix\n  -> Inv (step state nextInput) (inputPrefix ++ [nextInput])\nInv finalState fullInput + termination\n  -> output property",
                format: "text",
              },
            ],
          },
          {
            id: "tcs-randomness",
            title: "把随机性变成显式输入",
            summary:
              "将随机算法表示为普通输入与 random tape 上的确定函数，再分别处理确定性与分布性结论。",
            source: [
              "固定 random tape r 后，run x r 是确定函数，可像普通程序一样测试与推理。",
              "概率来自 tape 上的分布；有限均匀样本空间是适合第一项目的形式化入口。",
              "状态安全、分布正确、尾界与随机位复杂度是不同结论。",
            ],
            why: "这能把含糊的“随机行为”从代码里抽离出来，建立穷举、Lean 计数证明与概率分析之间的清晰接口。",
            success:
              "为一个 toy algorithm 枚举有限 random-tape 类型，并分别说明哪个性质对所有 tape 成立、哪个只以一定概率成立。",
            caution:
              "第一题不要挑战测度论概率、完整 Chernoff bound 或 Count-Min 端到端定理；先从有限事件与显式非空假设开始。",
            copyBlocks: [
              {
                label: "有限事件计数骨架",
                value:
                  "def eventCount [Fintype Ω]\n    (E : Ω → Prop) [DecidablePred E] : Nat :=\n  (Finset.univ.filter E).card\n\n-- 概率还需要分布；\n-- 均匀空间必须显式假设 Fintype.card Ω > 0。",
                format: "code",
              },
            ],
          },
          {
            id: "tcs-loop",
            title: "建立不泄漏的 generator—verifier—feedback",
            summary:
              "分开 search、validation、hidden 与 OOD 实例，并保存第一个反例，而不是只展示最高分。",
            source: [
              "generator 提出候选；verifier 先检查合法性与正确性，再计算 objective。",
              "即使没有梯度，自适应搜索也会过拟合固定 evaluator。",
              "hidden tests 不能进入 prompt 或修复反馈；最终候选还要面对规模或分布变化。",
            ],
            why: "这是 verifier-guided algorithm discovery 的核心工程原则：evaluator 要准确、难投机，并与最终审计相互独立。",
            success:
              "协议明确四个不重叠的实例集、固定搜索预算、seed 规则、反例最小化方式与最终 OOD 检查。",
            details: [
              {
                title: "最小闭环",
                items: [
                  "解析并隔离候选；接口或资源违规立即拒绝。",
                  "搜索期间只使用极小穷举与可见 validation 反馈。",
                  "冻结候选后只运行一次 hidden/OOD，并归档全部失败。",
                ],
              },
            ],
            copyBlocks: [
              {
                label: "数据划分契约",
                value:
                  "search_cases：generator 可见\nvalidation_cases：用于选择\nhidden_cases：绝不进入 prompt/feedback\nood_cases：更大规模或分布偏移\nsearch_budget：\nseed_policy：\nfirst_failure_artifact：",
                format: "text",
              },
            ],
          },
          {
            id: "tcs-evidence",
            title: "把测试、证明与复杂度分开登记",
            summary:
              "每条结论都绑定到真正支持它的 verifier，并明确列出仍未得到支持的更强外推。",
            source: [
              "编译只检查接口；有限穷举只覆盖枚举域；随机测试只覆盖声明的分布与预算。",
              "SMT unsat 依赖编码忠实；Lean theorem 依赖其 statement 与导入假设。",
              "经验加速不等于渐近改进，渐近界也不预测每台硬件上的常数。",
            ],
            why: "证据登记表能防止某一层的强结果被措辞放大成更强、但没有证据支持的算法结论。",
            success:
              "项目中每条结果都记录 claim、scope、verifier、artifact、assumptions 与 unsupported extrapolation。",
            copyBlocks: [
              {
                label: "证据登记字段",
                value:
                  "claim,scope,verifier,artifact,assumptions,unsupported_extrapolation\n接口合法,全部候选,type checker,build log,,功能正确\n无小规模反例,n≤8,穷举,counterexample log,,任意 n\n不变量保持,形式 statement,Lean kernel,.lean theorem,imports/axioms,语义忠实\n中位数更快,测试分布,benchmark,timing csv,hardware/seeds,渐近改进",
                format: "text",
              },
            ],
          },
          {
            id: "tcs-project",
            title: "用两周完成候选算法 verifier 小项目",
            summary:
              "选择一个小型离散对象，实现 exact baseline 与分层 verifier，再在冻结预算下评测简单变异器或模型候选。",
            source: [
              "合适对象包括小型调度启发式、图遍历规则、数据结构操作序列、有限抽样不变量或低阶分解 checker。",
              "第 1 周完成表示、baseline、穷举 verifier 与最小反例。",
              "第 2 周加入 generator、hidden/OOD、一个形式不变量或 SMT 性质，以及精确证据报告。",
            ],
            why: "它保留 AI4TCS 的研究形状，却不要求训练大模型，也不把小 benchmark 收益冒充成新渐近算法。",
            success:
              "干净仓库可以复现 baseline、固定搜索、hidden evaluation、结果表、第一个反例，以及至少一条形式或穷举性质。",
            caution:
              "如果合法性或 exact 小规模 verifier 无法定义，就停止；增加模型复杂度不能修复含糊目标。",
            details: [
              {
                title: "推荐默认：随机算法候选 verifier",
                items: [
                  "选 sampling、hashing、scheduling 或小图问题，保证有限域可以枚举。",
                  "先用规则变异或极小的 model-facing interface，让 generator 可替换。",
                  "保存第一个失败输入，并最小化成人能读懂的反例。",
                ],
              },
              {
                title: "替代方向：Lean 形式化项目",
                items: [
                  "形式化有限事件计数、抽样状态大小不变量或 union bound 骨架。",
                  "外部枚举只作为交叉检查，并明确哪些概率层尚未形式化。",
                ],
              },
            ],
            links: [
              {
                label: "Algorithms with Predictions",
                href: "https://doi.org/10.1145/3528087",
                note: "理解 consistency、robustness 与 learning-augmented guarantee 的代表综述。",
                kind: "reference",
              },
            ],
            copyBlocks: [
              {
                label: "最终仓库结构",
                value:
                  "README.md\nnotes/problem-and-object.md\nnotes/evidence-register.csv\nnotes/failure-analysis.md\nsrc/baseline.*\nsrc/candidate_interface.*\nverifier/exhaustive.*\nverifier/hidden.*\nformal/Invariant.lean\nresults/summary.csv",
                format: "text",
              },
            ],
          },
        ],
    },
  };
}
