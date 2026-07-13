#!/usr/bin/env python3
"""Import ultra-wide featured showcase masters from per-region Drive folders.

Same pipeline as Oakville ultra-wide (copy landscape master + portrait crop).
Each region has a dedicated Drive folder with editorial stills named by property.

  python3 scripts/import-region-wide-featured-images.py
  python3 scripts/import-region-wide-featured-images.py --region yountville
  python3 scripts/import-region-wide-featured-images.py --skip-download
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MDX_DIR = ROOT / "src" / "content" / "regions"
sys.path.insert(0, str(ROOT / "scripts"))

from featured_image_portrait import copy_featured_pair  # noqa: E402


@dataclass(frozen=True)
class WideRegionConfig:
    region: str
    drive_folder_id: str
    tmp_dir: Path
    # Drive filename -> (images subfolder, deliverable slug without region prefix)
    files: dict[str, tuple[str, str]]
    mdx_title_keys: dict[str, str] | None = None


def full_slug(region: str, section: str, prop_slug: str) -> str:
    if section == "breakfast":
        return f"{region}-breakfast-{prop_slug}"
    if section == "sidebar":
        return f"{region}-sidebar-{prop_slug}"
    kind = {
        "wineries": "winery",
        "restaurants": "restaurant",
        "hotels": "hotel",
    }[section]
    return f"{region}-{kind}-{prop_slug}"


REGIONS: list[WideRegionConfig] = [
    WideRegionConfig(
        region="yountville",
        drive_folder_id="1sZu9tw13oiPMioo3WY38pxsvEbG7WPEv",
        tmp_dir=ROOT / ".tmp-yountville-wide",
        files={
            "Stewart.jpg": ("wineries", "stewart-cellars"),
            "ClosduVal.jpg": ("wineries", "clos-du-val"),
            "Lewis.jpg": ("wineries", "lewis-cellars"),
            "hendry.jpg": ("wineries", "hendry"),
            "Trefethen.jpg": ("wineries", "trefethen"),
            "AdHoc.jpg": ("restaurants", "ad-hoc"),
            "Clementine.jpg": ("restaurants", "clementine"),
            "HonorMarket.jpg": ("restaurants", "honor-market"),
            "bardessono.jpg": ("hotels", "bardessono"),
            "StuppaEstate.jpg": ("hotels", "sttupa-estate"),
        },
    ),
    WideRegionConfig(
        region="rutherford",
        drive_folder_id="1MUoLiFQhx5_WyJyUdWpsmJRHY9ZzXIsU",
        tmp_dir=ROOT / ".tmp-rutherford-wide",
        files={
            "cathiard.jpg": ("wineries", "cathiard-family-estate"),
            "Inglenook.jpg": ("wineries", "inglenook"),
            "quintessa.jpg": ("wineries", "quintessa"),
            "Staglin.jpg": ("wineries", "staglin-family-vineyard"),
            "RutherfordGrill.jpg": ("restaurants", "rutherford-grill"),
            "Ranchocaymus.jpg": ("hotels", "rancho-caymus-inn"),
        },
    ),
    WideRegionConfig(
        region="st-helena",
        drive_folder_id="14rFgGr2mq_vqqRD3tPn9F8tqlMm3PVfn",
        tmp_dir=ROOT / ".tmp-st-helena-wide",
        files={
            "AdVivum.jpg": ("wineries", "ad-vivum"),
            "ClifFamily.jpg": ("wineries", "clif-family"),
            "Ehlers.jpg": ("wineries", "ehlers-estate"),
            "FaustHaus.jpg": ("wineries", "faust-haus"),
            "Lewelling.jpg": ("wineries", "lewelling-vineyards"),
            "Snowden.jpg": ("wineries", "snowden"),
            "Spootswood.jpg": ("wineries", "spottswoode"),
            "Studio1299A.jpg": ("wineries", "studio-1299a"),
            "WhitehallLane.jpg": ("wineries", "whitehall-lane"),
            "Charlies.jpg": ("restaurants", "charlies-napa-valley"),
            "Cook.jpg": ("restaurants", "cook"),
            "ModelBakery.jpg": ("breakfast", "model-bakery"),
            "erosion.jpg": ("breakfast", "erosion-creamery-cafe"),
            "RomanHolidaygelato.jpg": ("breakfast", "roman-holiday-gelato"),
            "HarvestInn.jpg": ("hotels", "harvest-inn"),
            "Wydown.jpg": ("hotels", "wydown-hotel"),
            "Alila.jpg": ("hotels", "alila-napa-valley"),
            "InnSalvestrin.jpg": ("hotels", "inn-at-salvestrin"),
        },
    ),
    WideRegionConfig(
        region="calistoga",
        drive_folder_id="1EGzopIzNsrhm-FYV5pRR85tGHQya87iz",
        tmp_dir=ROOT / ".tmp-calistoga-wide",
        files={
            "Hourglass.jpg": ("wineries", "hourglass"),
            "Larkmead.jpg": ("wineries", "larkmead"),
            "schramsberg.jpg": ("wineries", "schramsberg"),
            "Calistogabrewery.jpg": ("restaurants", "calistoga-inn-brewery"),
            "Lovina.jpg": ("restaurants", "lovina"),
            "picobar.jpg": ("restaurants", "picobar"),
            "samssocialclub.jpg": ("restaurants", "sams-social-club"),
            "FrancisHouse.jpg": ("hotels", "francis-house-inn"),
            "Solage.jpg": ("hotels", "solage"),
            "DrWilkinsons.jpg": ("hotels", "dr-wilkinsons"),
        },
    ),
    WideRegionConfig(
        region="downtown-napa",
        drive_folder_id="1o_7HQ-OzK4AdGRn8oCpmWLqietrSZP0-",
        tmp_dir=ROOT / ".tmp-downtown-napa-wide",
        files={
            "MayacamasDowntown.jpg": ("wineries", "mayacamas-downtown"),
            "Cadet.jpg": ("wineries", "cadet-wine-beer-bar"),
            "GentlemanFarmer.jpg": ("wineries", "gentleman-farmer-bungalow"),
            "Angele.jpg": ("restaurants", "angele"),
            "ConAmour.jpg": ("restaurants", "con-amor"),
            "dutchdoor.jpg": ("restaurants", "dutch-door"),
            "LaToque.jpg": ("restaurants", "la-toque"),
            "Scala.jpg": ("restaurants", "scala"),
            "Torc.jpg": ("restaurants", "torc"),
            "NapaRiverInn.jpg": ("hotels", "napa-river-inn"),
            "Westin.jpg": ("hotels", "westin-verasa"),
            "Naysayer_Coffee.jpg": ("breakfast", "naysayer-coffee"),
            "Ohmcoffee.jpg": ("breakfast", "ohm-coffee"),
        },
    ),
    WideRegionConfig(
        region="pritchard-hill",
        drive_folder_id="1gQjwLTcNr0x2NiEWx63kebpSf1hD7cFk",
        tmp_dir=ROOT / ".tmp-pritchard-hill-wide",
        files={
            "David-Arthur.jpg": ("wineries", "david-arthur-vineyards"),
            "Chappellet.jpg": ("wineries", "chappellet"),
            "Continuumwide.jpg": ("wineries", "continuum-estate"),
            "howardbacken.jpg": ("wineries", "howard-backen-estate"),
        },
        mdx_title_keys={
            "David Arthur": "david-arthur-vineyards",
            "Chappellet": "chappellet",
            "Continuum": "continuum-estate",
            "Howard Backen": "howard-backen-estate",
        },
    ),
]


def download_folder(folder_id: str, dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    url = f"https://drive.google.com/drive/folders/{folder_id}"
    print(f"  Downloading {url} -> {dest.name}/")
    subprocess.run(
        [sys.executable, "-m", "gdown", "--folder", url, "-O", str(dest)],
        check=True,
    )


def import_region(cfg: WideRegionConfig) -> tuple[int, list[str], dict[str, tuple[str, str]]]:
    images_root = ROOT / "public" / "images" / cfg.region
    updated = 0
    missing: list[str] = []
    urls_by_slug: dict[str, tuple[str, str]] = {}

    for filename, (section, prop_slug) in cfg.files.items():
        src = cfg.tmp_dir / filename
        if not src.is_file():
            missing.append(filename)
            continue

        slug = full_slug(cfg.region, section, prop_slug)
        landscape = images_root / section / f"{slug}-landscape.jpg"
        portrait = images_root / section / f"{slug}-portrait.jpg"
        copy_featured_pair(src, landscape, portrait, top_bias=0.0)

        landscape_url = f"/images/{cfg.region}/{section}/{slug}-landscape.jpg"
        portrait_url = f"/images/{cfg.region}/{section}/{slug}-portrait.jpg"
        urls_by_slug[prop_slug] = (landscape_url, portrait_url)

        print(f"  {cfg.region}/{section}/{slug} ({filename})")
        updated += 1

    return updated, missing, urls_by_slug


def inject_mdx(region: str, title_map: dict[str, str], urls_by_slug: dict[str, tuple[str, str]]) -> None:
    mdx_path = MDX_DIR / f"{region}.mdx"
    if not mdx_path.exists():
        return
    text = mdx_path.read_text()

    for title_key, prop_slug in title_map.items():
        pair = urls_by_slug.get(prop_slug)
        if not pair:
            continue
        landscape, portrait = pair
        pattern = rf"(### [^\n]*{re.escape(title_key)}[^\n]*\n(?:.*?\n)*?)(?=\n### |\n## |\n# |\Z)"

        def repl(m: re.Match[str], landscape=landscape, portrait=portrait) -> str:
            block = m.group(1)
            if "**Image:**" in block:
                block = re.sub(r"- \*\*Image:\*\*.*\n", f"- **Image:** {landscape}\n", block)
                if "**ImagePortrait:**" in block:
                    block = re.sub(
                        r"- \*\*ImagePortrait:\*\*.*\n",
                        f"- **ImagePortrait:** {portrait}\n",
                        block,
                    )
                else:
                    block = re.sub(
                        r"(- \*\*Image:\*\*[^\n]+\n)",
                        rf"\1- **ImagePortrait:** {portrait}\n",
                        block,
                    )
            else:
                insert_after = re.search(r"(- \*\*Website:\*\*[^\n]+\n)", block)
                if insert_after:
                    pos = insert_after.end()
                    block = (
                        block[:pos]
                        + f"- **Image:** {landscape}\n- **ImagePortrait:** {portrait}\n"
                        + block[pos:]
                    )
                else:
                    block += f"- **Image:** {landscape}\n- **ImagePortrait:** {portrait}\n"
            return block

        text, n = re.subn(pattern, repl, text, count=1)
        if n:
            print(f"  mdx {region}: {title_key}")

    mdx_path.write_text(text)


def main() -> None:
    parser = argparse.ArgumentParser(description="Import region ultra-wide featured showcase images")
    parser.add_argument("--region", action="append", dest="regions", help="Limit to region slug(s)")
    parser.add_argument(
        "--skip-download",
        action="store_true",
        help="Use files already in .tmp-*-wide folders",
    )
    args = parser.parse_args()

    selected = REGIONS
    if args.regions:
        allowed = set(args.regions)
        selected = [cfg for cfg in REGIONS if cfg.region in allowed]
        unknown = allowed - {cfg.region for cfg in selected}
        if unknown:
            raise SystemExit(f"Unknown region(s): {', '.join(sorted(unknown))}")

    total = 0
    for cfg in selected:
        print(f"\n{cfg.region} ultra-wide featured")
        if not args.skip_download:
            download_folder(cfg.drive_folder_id, cfg.tmp_dir)

        count, missing, urls_by_slug = import_region(cfg)
        total += count

        if cfg.mdx_title_keys:
            inject_mdx(cfg.region, cfg.mdx_title_keys, urls_by_slug)

        if missing:
            print(f"  Missing in {cfg.tmp_dir.name}: {', '.join(missing)}")

    print(f"\nUpdated {total} featured landscape+portrait pairs across {len(selected)} region(s).")


if __name__ == "__main__":
    main()
