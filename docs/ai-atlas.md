# Artificial Intelligence Knowledge Atlas

Original Chinese study cards with bilingual concept titles, at `/learning/ai-map/` and `/en/learning/ai-map/`. This is an independently organized curriculum map for undergraduate foundations through early doctoral work. It is not an official degree program or a claim that every specialist topic is compulsory for every student.

## Structure

- 194 concepts in 14 domains; two actionable mastery criteria, a concrete example, a condition/pitfall and primary reading links per concept.
- Three levels describe depth: foundation, core, research. The independent `scope` field distinguishes shared professional foundations from specialist study.
- The map reuses the mathematics atlas: ink dots, organic force-directed clusters, semantic label reveal, dwell focus, touch gestures and the same reading sidebar. The overview reveals a small set of short concept names. Subject filters and routes focus parts of the same 194-concept network. A neighborhood shows direct prerequisites, successors and related ideas.
- Directed concept edges mean suggested preparation; related links are dashed and deduplicated against prerequisite pairs. `related` links are not prerequisites.
- Local self-assessed progress uses `ai-atlas-progress-v1` in localStorage. Invalid or obsolete IDs are ignored. There is no server/account synchronization.
- A concept's URL hash opens its reading panel. Search combines with the current subject, study-level and shared-core filters; Reset all clears them. Previous `domain:` and `route:` hashes remain supported.

## Editorial references

Breadth was cross-checked against [CS2023 AI](https://csed.acm.org/artificial-intelligence/), [CMU ML PhD curriculum](https://ml.cmu.edu/current-students/phd-curriculum) and [Stanford CS MS program sheets](https://www.cs.stanford.edu/masters-specializations/ms-program-sheets). They provide curricular context rather than endorsing this atlas. Detailed sources are attached to individual cards. Content is independently written, not copied from course materials.

Research and responsibility notes draw on original papers and primary guidance: NeurIPS Paper Checklist; Pineau et al. on reproducibility; Agarwal et al. and Bouthillier et al. on uncertainty in benchmarks; Shalev-Shwartz and Ben-David on learning theory; WILDS; Angelopoulos and Bates on conformal prediction; Datasheets for Datasets; Dwork and Roth; Fairness and Machine Learning; Doshi-Velez and Kim; Madry et al.; NIST AI RMF; OWASP; Henderson et al.; ACM Code of Ethics. Each card links its specific reference.

No source PDF or textbook content is redistributed. Notes state material limitations (e.g., bounded-loss IID finite-class bounds, marginal vs conditional conformal coverage, perturbation threat models and limits of statistical significance).

## Maintenance

Run `node scripts/check-ai-atlas.mjs` to verify IDs, all references, prerequisite acyclicity, KaTeX, routes and node spacing. Then lint, type-check and production-build the site. `check:export` validates both locales and catalog links.

Add new concepts to the appropriate data module, give meaningful preparation links and learning tasks, and update the checked catalog count. Do not manufacture dependencies to make the network connected. Do not add trend-driven product lists in place of foundational concepts.

Content edition: 2026-10-19. Ink-map presentation: 2026-10-20.
