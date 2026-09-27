# Knowledge map label font

`kai-labels.woff` is a 226-character subset of **LXGW WenKai Regular 1.522**,
used only for Chinese labels inside the mathematics graph and four course graphs.

- Source: https://github.com/lxgw/LxgwWenKai/releases/tag/v1.522
- Original file: `LXGWWenKai-Regular.ttf`
- Original SHA-256: `39ad71264b588165b469e35e6afb162a378dacd1f95348160240ba9038ac3009`
- License: SIL Open Font License 1.1; the complete notice is in `OFL.txt`.
- This subset is renamed **Atlas Kai** to respect the reserved font name.
  Outlines are unchanged; only character coverage, naming and container differ.

After adding or changing Chinese graph labels, download the original release
font and regenerate from the repository root with Python 3 + `fonttools`:

```sh
node scripts/subset-math-map-font.mjs /path/to/LXGWWenKai-Regular.ttf
```

The website serves the font locally; visitors do not contact a font CDN.
