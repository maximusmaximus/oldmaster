#!/usr/bin/env python3
"""Render an emoji-mosaic JPEG for Open Graph cards."""

from __future__ import annotations

import argparse
import json
import math
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PALETTE_TS = ROOT / "src/lib/mosaic/palette.ts"
FONT_PATH = Path("/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf")
CACHE_DIR = ROOT / ".data/og-plates"
GLYPH_RGB_PATH = CACHE_DIR / "glyph-rgb.json"
Q = 16
NOTO_PX = 109


def rgb_to_lab(r: float, g: float, b: float) -> tuple[float, float, float]:
    sr, sg, sb = r / 255.0, g / 255.0, b / 255.0

    def lin(c: float) -> float:
        return ((c + 0.055) / 1.055) ** 2.4 if c > 0.04045 else c / 12.92

    sr, sg, sb = lin(sr), lin(sg), lin(sb)
    x = (sr * 0.4124564 + sg * 0.3575761 + sb * 0.1804375) / 0.95047
    y = sr * 0.2126729 + sg * 0.7151522 + sb * 0.072175
    z = (sr * 0.0193339 + sg * 0.119192 + sb * 0.9503041) / 1.08883

    def f(t: float) -> float:
        return t ** (1.0 / 3.0) if t > 0.008856 else 7.787 * t + 16 / 116

    fx, fy, fz = f(x), f(y), f(z)
    return (116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz))


def load_glyphs() -> list[str]:
    raw = PALETTE_TS.read_text(encoding="utf-8")
    block = raw.split("EMOJI_GLYPHS", 1)[1].split("];", 1)[0]
    glyphs = re.findall(r'"([^"]+)"', block)
    seen: set[str] = set()
    out: list[str] = []
    for g in glyphs:
        if g not in seen:
            seen.add(g)
            out.append(g)
    return out


def sample_glyph(glyph: str, font: ImageFont.FreeTypeFont) -> tuple[int, int, int] | None:
    img = Image.new("RGBA", (NOTO_PX + 16, NOTO_PX + 16), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.text((8, 8), glyph, font=font, embedded_color=True)
    px = list(img.getdata())
    rs = gs = bs = n = 0
    for r, g, b, a in px:
        if a < 140:
            continue
        rs += r
        gs += g
        bs += b
        n += 1
    if n < 8:
        return None
    return (rs // n, gs // n, bs // n)


def glyph_rgb_map(glyphs: list[str]) -> dict[str, list[int]]:
    if GLYPH_RGB_PATH.exists():
        try:
            cached = json.loads(GLYPH_RGB_PATH.read_text(encoding="utf-8"))
            if isinstance(cached, dict) and len(cached) >= 20:
                return {str(k): [int(v[0]), int(v[1]), int(v[2])] for k, v in cached.items()}
        except Exception:
            pass
    font = ImageFont.truetype(str(FONT_PATH), NOTO_PX)
    mapped: dict[str, list[int]] = {}
    for glyph in glyphs:
        rgb = sample_glyph(glyph, font)
        if rgb:
            mapped[glyph] = [rgb[0], rgb[1], rgb[2]]
    if len(mapped) < 8:
        for glyph, rgb in {
            "🟥": [224, 50, 50],
            "🟧": [230, 126, 34],
            "🟨": [241, 196, 15],
            "🟩": [39, 174, 96],
            "🟦": [41, 128, 185],
            "🟪": [142, 68, 173],
            "🟫": [121, 85, 72],
            "⬛": [20, 20, 20],
            "⬜": [240, 240, 240],
        }.items():
            mapped[glyph] = rgb
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    GLYPH_RGB_PATH.write_text(json.dumps(mapped, ensure_ascii=False), encoding="utf-8")
    return mapped


def build_lut(mapped: dict[str, list[int]]) -> tuple[list[str], list[int]]:
    glyphs = list(mapped.keys())
    labs = [rgb_to_lab(*mapped[g]) for g in glyphs]
    lut = [0] * (Q * Q * Q)
    step = 256 / Q
    for ri in range(Q):
        r = (ri + 0.5) * step
        for gi in range(Q):
            g = (gi + 0.5) * step
            for bi in range(Q):
                b = (bi + 0.5) * step
                lab = rgb_to_lab(r, g, b)
                best = 0
                best_d = 1e18
                for i, other in enumerate(labs):
                    dl = lab[0] - other[0]
                    da = lab[1] - other[1]
                    db = lab[2] - other[2]
                    d = dl * dl + da * da + db * db
                    if d < best_d:
                        best_d = d
                        best = i
                lut[(ri << 8) | (gi << 4) | bi] = best
    return glyphs, lut


def lut_index(r: int, g: int, b: int) -> int:
    return (min(Q - 1, r >> 4) << 8) | (min(Q - 1, g >> 4) << 4) | min(Q - 1, b >> 4)


def grid_for_image(width: int, height: int, long_side: int) -> tuple[int, int]:
    long = max(2, int(round(long_side)))
    if width >= height:
        cols = long
        rows = max(2, int(round(long * height / width)))
        return cols, rows
    rows = long
    cols = max(2, int(round(long * width / height)))
    return cols, rows


def render_mosaic(src: Path, dest: Path, long_side: int) -> None:
    glyphs = load_glyphs()
    mapped = glyph_rgb_map(glyphs)
    palette, lut = build_lut(mapped)
    font = ImageFont.truetype(str(FONT_PATH), NOTO_PX)

    painting = Image.open(src).convert("RGB")
    cols, rows = grid_for_image(painting.width, painting.height, long_side)
    sampled = painting.resize((cols, rows), Image.Resampling.BILINEAR)

    # Fit mosaic inside a 1200x630 OG card, then letterbox on #0c0b0a.
    card_w, card_h = 1200, 630
    cell = max(12, min(card_w // cols, card_h // rows))
    mosaic_w, mosaic_h = cols * cell, rows * cell
    mosaic = Image.new("RGB", (mosaic_w, mosaic_h), (12, 11, 10))
    draw = ImageDraw.Draw(mosaic)

    glyph_cache: dict[str, Image.Image] = {}

    def glyph_tile(glyph: str) -> Image.Image:
        cached = glyph_cache.get(glyph)
        if cached is not None:
            return cached
        sheet = Image.new("RGBA", (NOTO_PX + 8, NOTO_PX + 8), (0, 0, 0, 0))
        ImageDraw.Draw(sheet).text((4, 4), glyph, font=font, embedded_color=True)
        bbox = sheet.getbbox()
        cropped = sheet.crop(bbox) if bbox else sheet
        tile = cropped.resize((cell, cell), Image.Resampling.LANCZOS)
        glyph_cache[glyph] = tile
        return tile

    pixels = sampled.load()
    for y in range(rows):
        for x in range(cols):
            r, g, b = pixels[x, y]
            glyph = palette[lut[lut_index(r, g, b)]]
            x0, y0 = x * cell, y * cell
            draw.rectangle((x0, y0, x0 + cell, y0 + cell), fill=(r, g, b))
            mosaic.paste(glyph_tile(glyph), (x0, y0), glyph_tile(glyph))

    card = Image.new("RGB", (card_w, card_h), (12, 11, 10))
    ox = (card_w - mosaic_w) // 2
    oy = (card_h - mosaic_h) // 2
    card.paste(mosaic, (ox, oy))
    dest.parent.mkdir(parents=True, exist_ok=True)
    card.save(dest, "JPEG", quality=84, optimize=True)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--in", dest="src", required=True)
    parser.add_argument("--out", dest="dest", required=True)
    parser.add_argument("--long", dest="long_side", type=int, default=36)
    args = parser.parse_args()
    try:
        render_mosaic(Path(args.src), Path(args.dest), args.long_side)
    except Exception as exc:
        print(f"og-mosaic failed: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
