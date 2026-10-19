# AI knowledge map label font

`kai-labels.woff` is a 354-character subset of **LXGW WenKai Regular 1.522**.
It covers all 194 Chinese graph labels from
`aiKnowledgeAtlas.nodes[].shortLabel.zh` in
`src/data/ai-atlas/knowledge-atlas.ts`: 340 distinct Han characters and
14 other characters. The font is used only for Chinese labels in the AI graph.

- Upstream release: https://github.com/lxgw/LxgwWenKai/releases/tag/v1.522
- Official TTF: https://github.com/lxgw/LxgwWenKai/releases/download/v1.522/LXGWWenKai-Regular.ttf
- Original filename: `LXGWWenKai-Regular.ttf`
- Original SHA-256: `39ad71264b588165b469e35e6afb162a378dacd1f95348160240ba9038ac3009`
- License: SIL Open Font License 1.1; the complete upstream notice is retained
  in `OFL.txt`, including LXGW and Klee Project copyright notices.
- License source: https://raw.githubusercontent.com/lxgw/LxgwWenKai/v1.522/OFL.txt
- License SHA-256: `c38b1994a5e48ac30ac7d1da7d0409fd8fd8127dfe28a13d6e787d5b1ef34a5e`
- Derivative family: **AI Atlas Kai**; PostScript name: `AIAtlasKai-Regular`.
  It does not use the upstream family name. The changes are subsetting,
  family naming and WOFF packaging; the retained glyph outlines are unchanged.
- Generated size: **97,004 bytes** (about 94.7 KiB).
- Generated SHA-256: `a181b2289889382c14f4b55710dc8f6efd3b1751ce11a7fb6488d5ff56189ad4`
- Generated with Python 3 and fontTools 4.62.1; checked on 2026-10-20.

## Rebuild after changing labels

Download the official version above to a working directory. Do not install
it as a system font. From the repository root, with Python 3 and `fonttools`
available, run:

```sh
node scripts/subset-ai-map-font.mjs /path/to/LXGWWenKai-Regular.ttf
```

The script rejects a source with a different SHA-256, collects every character
from the current Chinese short labels, checks source coverage, creates the
independently named subset and checks the generated WOFF again. It also verifies
that every renamed family record has the intended name. Copyright and license
metadata remain intact. The original font timestamp is retained for reproducible
output with the same fontTools version.

After regeneration, update the coverage count, generated size and SHA-256 above.
Keep `OFL.txt` with the distributed WOFF. The page loads this asset locally through
`@font-face` in `ai-map.css`; visitors do not contact a font CDN.
