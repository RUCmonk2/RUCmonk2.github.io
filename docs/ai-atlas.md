# Artificial Intelligence Knowledge Atlas

Original Chinese study cards with bilingual concept titles, at `/learning/ai-map/` and `/en/learning/ai-map/`. This is an independently organized curriculum map for undergraduate foundations through early doctoral work. It is not an official degree program or a claim that every specialist topic is compulsory for every student.

## Structure

- 194 concepts in 14 domains; two actionable mastery criteria, a concrete example, a condition/pitfall and primary reading links per concept.
- Three levels describe depth: foundation, core, research. The independent `scope` field distinguishes shared professional foundations from specialist study.
- The overview intentionally shows only 14 subject nodes. Selecting a subject opens its detailed network; routes cross subjects. Prerequisite neighborhoods include recursive prerequisites and direct successors. Large views use an index instead of squeezing all nodes into one canvas.
- Directed concept edges mean suggested preparation; overview connections are broad orientation only. `related` links are not prerequisites.
- Local self-assessed progress uses `ai-atlas-progress-v1` in localStorage. Invalid or obsolete IDs are ignored. There is no server/account synchronization.
- A concept's URL hash opens its card. Search spans the full collection and explicitly overrides current filters.

## Editorial references

Breadth was cross-checked against [CS2023 AI](https://csed.acm.org/artificial-intelligence/), [CMU ML PhD curriculum](https://ml.cmu.edu/current-students/phd-curriculum) and [Stanford CS MS program sheets](https://www.cs.stanford.edu/masters-specializations/ms-program-sheets). They provide curricular context rather than endorsing this atlas. Detailed sources are attached to individual cards. Content is independently written, not copied from course materials.

Research and responsibility notes draw on original papers and primary guidance: NeurIPS Paper Checklist; Pineau et al. on reproducibility; Agarwal et al. and Bouthillier et al. on uncertainty in benchmarks; Shalev-Shwartz and Ben-David on learning theory; WILDS; Angelopoulos and Bates on conformal prediction; Datasheets for Datasets; Dwork and Roth; Fairness and Machine Learning; Doshi-Velez and Kim; Madry et al.; NIST AI RMF; OWASP; Henderson et al.; ACM Code of Ethics. Each card links its specific reference.

No source PDF or textbook content is redistributed. Notes state material limitations (e.g., bounded-loss IID finite-class bounds, marginal vs conditional conformal coverage, perturbation threat models and limits of statistical significance).

## Maintenance

Run `node scripts/check-ai-atlas.mjs` to verify IDs, all references, prerequisite acyclicity, KaTeX, routes and node spacing. Then lint, type-check and production-build the site. `check:export` validates both locales and catalog links.

Add new concepts to the appropriate data module, give meaningful preparation links and learning tasks, and update the checked catalog count. Do not manufacture dependencies to make the network connected. Do not add trend-driven product lists in place of foundational concepts.

Edition: 2026-10-19.
