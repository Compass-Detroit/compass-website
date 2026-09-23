"""
Build web-sized copies of gallery photos for the site.

public/assets/gallery/<event>/<path>.jpg
  -> public/assets/gallery/_web/<event>/<path>-640.webp   (grids, marquees)
  -> public/assets/gallery/_web/<event>/<path>-1600.webp  (heroes, lightbox)

Applies EXIF orientation and drops all metadata (including GPS). Skips files
whose copies are newer than the original, so re-running is cheap.
Usage: python3 scripts/make-gallery-web.py   (needs Pillow)
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent / "public/assets/gallery"
OUT = ROOT / "_web"
WIDTHS = (640, 1600)
# Already published at web sizes
SKIP_DIRS = {"_web", "lhm26"}
EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def main():
    made = 0
    for src in sorted(ROOT.rglob("*")):
        rel = src.relative_to(ROOT)
        if rel.parts[0] in SKIP_DIRS or src.suffix.lower() not in EXTS:
            continue
        targets = [OUT / rel.parent / f"{src.stem}-{w}.webp" for w in WIDTHS]
        if all(t.exists() and t.stat().st_mtime >= src.stat().st_mtime for t in targets):
            continue
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            for width, target in zip(WIDTHS, targets):
                target.parent.mkdir(parents=True, exist_ok=True)
                copy = im.copy()
                copy.thumbnail((width, width * 4), Image.LANCZOS)
                copy.save(target, "WEBP", quality=78, method=6)
        made += 1
    print(f"{made} photos processed")


if __name__ == "__main__":
    main()
