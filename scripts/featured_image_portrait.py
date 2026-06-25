"""Generate 2:3 portrait crops from landscape editorial masters."""

from __future__ import annotations

from pathlib import Path

from PIL import Image


def portrait_crop(
    src: Path,
    dest: Path,
    *,
    top_bias: float = 0.0,
    quality: int = 88,
) -> None:
    """Crop a landscape master to portrait (2:3 width:height), biased toward the top."""
    img = Image.open(src).convert("RGB")
    w, h = img.size
    target_w_over_h = 2 / 3

    crop_h = h
    crop_w = round(h * target_w_over_h)
    if crop_w > w:
        crop_w = w
        crop_h = round(w / target_w_over_h)

    left = max(0, (w - crop_w) // 2)
    top = max(0, round((h - crop_h) * top_bias))
    if top + crop_h > h:
        top = max(0, h - crop_h)

    cropped = img.crop((left, top, left + crop_w, top + crop_h))
    dest.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(dest, "JPEG", quality=quality, optimize=True)


def copy_featured_pair(
    src: Path,
    landscape: Path,
    portrait: Path,
    *,
    top_bias: float = 0.0,
) -> None:
    import shutil

    shutil.copy2(src, landscape)
    portrait_crop(src, portrait, top_bias=top_bias)
