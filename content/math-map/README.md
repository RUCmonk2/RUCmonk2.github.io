# Mathematics atlas lessons

Every ID in `src/data/math-map.ts` has a Chinese and English Markdown file here.
Each file contains two independently written reading modes:

- Before `<!-- formal -->`: **从零理解 / Guided learning**. Include intuition, a three-column notation table, worked numerical examples, assumptions, and two exercises.
- After `<!-- solutions -->` within the guided section: worked answers, shown in a native disclosure.
- After `<!-- formal -->`: **严谨表述 / Formal treatment**. State definitions, derivations, regularity/domain conditions, and connections.

Use `$…$` and `$$…$$` for every mathematical expression. In tables, use `\lvert`, `\rvert`, or `\Vert` rather than literal pipe characters, which Markdown treats as cell separators. Explain notation conventions without inventing historical origins. References are further reading; the explanations and examples are independently authored.

`npm run build` validates all 54 concepts in both languages with strict KaTeX parsing, checks the mode structure and notation tables, then generates ignored `public/assets/math-lessons/{locale}/{id}.json` files. The page fetches only the selected concept and caches it for the current visit. Both modes have their own preview introduction.

`npm run test:math-map` includes independent arithmetic and directional finite-difference checks for worked examples. `npm run check:export` checks that every generated lesson reaches the static export unchanged. These checks catch rendering, coverage, export, and selected arithmetic regressions; they are not proofs of all mathematical statements.

The graph retains click/dwell selection without scrolling. Explicit reading controls open the wide lesson below the graph. Mode preference is stored locally, and changing a concept or mode resets expanded solutions.
