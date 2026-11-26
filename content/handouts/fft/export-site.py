"""Render an audited handout for the site's continuous PDF reader."""

import argparse
import hashlib
import json
from pathlib import Path
from shutil import copyfile
from subprocess import run
from tempfile import TemporaryDirectory
from urllib.parse import urlsplit
from zipfile import ZIP_DEFLATED, ZipFile

from pypdf import PdfReader
from pypdf.generic import ArrayObject, IndirectObject


def page_links(pdf: PdfReader) -> list[list[dict]]:
    names = pdf.named_destinations
    refs = {
        page.indirect_reference.idnum: i
        for i, page in enumerate(pdf.pages)
        if page.indirect_reference is not None
    }

    def resolve(destination):
        if isinstance(destination, ArrayObject) and isinstance(
            destination[0], IndirectObject
        ):
            return refs[destination[0].idnum]
        return pdf.get_destination_page_number(names[str(destination)])

    exported = []
    for page in pdf.pages:
        bounds = page.cropbox
        if page.rotation:
            raise ValueError("Reader previews require unrotated PDF pages.")
        x0, y1 = float(bounds.left), float(bounds.top)
        w, h = float(bounds.width), float(bounds.height)
        entries = []
        for annotation in page.annotations or []:
            link = annotation.get_object()
            if link.get("/Subtype") != "/Link":
                continue
            left, bottom, right, top = map(float, link["/Rect"])
            position = [(left - x0) / w, (y1 - top) / h, (right - left) / w,
                        (top - bottom) / h]
            if min(position) < 0 or position[0] + position[2] > 1 or position[1] + position[3] > 1:
                raise ValueError(f"Link rectangle outside the page: {position}")
            entry = {"box": [round(p * 100, 4) for p in position]}
            action = link.get("/A", {})
            if action.get("/S") == "/URI":
                url = str(action["/URI"])
                if urlsplit(url).scheme not in ("http", "https"):
                    raise ValueError(f"Unsupported link scheme: {url}")
                entry["url"] = url
            else:
                entry["page"] = resolve(link.get("/Dest") or action["/D"])
                if not 0 <= entry["page"] < len(pdf.pages):
                    raise ValueError("Link destination is not a document page.")
            entries.append(entry)
        exported.append(entries)
    return exported


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--repo-root", required=True, type=Path)
    args = parser.parse_args()
    pdf = PdfReader(args.pdf)
    links = page_links(pdf)
    asset = args.repo_root / "public/assets/fft-handout"
    (asset / "pages").mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(prefix="fft-pages-") as directory:
        prefix = Path(directory) / "page"
        run(["pdftoppm", "-cropbox", "-r", "144", "-png", str(args.pdf), str(prefix)], check=True)
        images = sorted(Path(directory).glob("page-*.png"))
        if len(images) != len(links):
            raise ValueError("Preview count differs from the PDF page count.")
        for i, image in enumerate(images, 1):
            run(["cwebp", "-quiet", "-lossless", str(image), "-o",
                 str(asset / "pages" / f"page-{i:02}.webp")], check=True)
    copyfile(args.pdf, asset / "fft-handout.pdf")
    data = {"revision": hashlib.sha256(args.pdf.read_bytes()).hexdigest()[:12], "links": links}
    (args.repo_root / "src/data/fft-handout-links.json").write_text(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n"
    )
    source = Path(__file__).parent
    names = ["fft-handout.tex", "fft-style.tex", "fft.c", "fft-check.c",
             "README.md", "SOURCE-MAP.md", "export-site.py"]
    with ZipFile(asset / "fft-handout-source.zip", "w", ZIP_DEFLATED, compresslevel=9) as bundle:
        for name in names:
            bundle.write(source / name, "fft-handout/" + name)
    print(f"{len(links)} previews and {sum(map(len, links))} links, revision {data['revision']}.")


if __name__ == "__main__":
    main()
