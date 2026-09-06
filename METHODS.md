# How Emoji Old Masters is generated

This document is the public method sheet for the site, the book plates, and
every fan mosaic archived in `fans/`. Nothing here is a pre-baked mosaic image.
Each picture is sampled, matched, and drawn as color-emoji glyphs in the
browser.

The running engine lives in `src/lib/mosaic/`.

## 1. Catalog

The gallery is 484 public-domain plates. The inventory is
`src/data/plate-index.json` (mirrored at `public/data/plate-index.json`).

Each row has:

| Field | Meaning |
| --- | --- |
| `slug` | URL key (`/plate/{slug}`) |
| `id` | Stable plate id |
| `title`, `artist`, `year` | Caption |
| `orientation` | `landscape` or `portrait` |
| `source_image_url` | Wikimedia file or thumb URL |
| `commons_page` | Human-readable Commons page |
| `license` | Public-domain / CC notice |

Do not invent plates. The live mosaic is always built from that row’s
Wikimedia source, never from a print PDF or SVG.

## 2. Loading the painting

Wikimedia thumb CDN URLs that rewrite `px` in the path often 400. The site
requests a bounded thumbnail through Commons:

```
https://commons.wikimedia.org/w/thumb.php?f={filename}&w={width}
```

Gallery cards use ~800 px on the long side; the plate view uses ~1200 px.
`src/routes/api/image.ts` proxies the bytes (CORS + a polite User-Agent
`EmojiOldMasters/1.0`). The canvas image is loaded with
`crossOrigin = "anonymous"` so the mosaic can be read back and exported.

Uploads on **Try your own** stay on-device until Share. JPEG, PNG, or WebP,
5 MB max.

## 3. Emoji palette

`src/lib/mosaic/palette.ts` is a fixed list of color-bearing glyphs (system /
Twemoji-style: Noto Color Emoji, Apple Color Emoji, Segoe UI Emoji).

On first paint the engine:

1. Waits briefly for those fonts to load.
2. Draws each glyph onto a small canvas.
3. Averages the RGB of opaque pixels.
4. Converts that average to CIE Lab (`src/lib/mosaic/color.ts`).
5. Drops glyphs that did not actually paint (missing from the font).

If fewer than eight glyphs survive, it falls back to a handful of colored
squares.

## 4. Nearest-emoji lookup

Matching every cell against every glyph would hitch. The calibrated Labs are
baked into a 16³ lookup table (`Q = 16`, 4096 bins). Each RGB query is shifted
to a bin (`channel >> 4`) and the table returns the nearest glyph index.
Distance is Euclidean Lab.

`ensurePalette()` runs once per page load and is reused for every plate.

## 5. Grid and density

`gridForImage(width, height, longSideCells)` keeps the painting’s aspect. The
long side is `longSideCells` emoji; the short side is rounded from the ratio,
never below 2.

Density steps: `12, 16, 20, 24, 32, 40, 48, 64`.

- Gallery cards: 20
- Plate / Try default: 32

Changing density rebuilds the mosaic from the already-loaded bitmap. It does
not re-fetch the painting.

## 6. Painting a cell

`renderMosaic` in `src/lib/mosaic/engine.ts`:

1. Downsamples the source onto an offscreen canvas of `cols × rows`.
2. Sizes the visible canvas to the CSS width × device pixel ratio (capped at 2).
3. For each cell: fill the rectangle with the sampled RGB, then `fillText` the
   matched emoji, centered.
4. Returns `{ cols, rows, cells, glyphs }` so Share can freeze the glyph grid
   as text.

The under-fill keeps the mosaic readable at a distance when a glyph is small
or a font is late. Up close you read emoji; across the room you read the
picture.

## 7. Fan works (Share)

Share on **Try your own**:

1. Export a medium JPEG of the live canvas (long side ≤ 1200 px, quality ~0.84).
2. Pack the glyph grid as newline-separated rows (`glyphsToText`).
3. Insert an unowned row in `fan_works` (id, title, cols, rows, emoji text, JPEG).
4. Push the same payload to this GitHub repository:

```
fans/index.json
fans/{id}/meta.json
fans/{id}/emoji.txt
fans/{id}/mosaic.jpg
```

`{id}` looks like `fan-` plus 12 hex characters.

No names, emails, or accounts. The title is the work’s title (default
“Emoji New Master”). Friend links are `/fan/{id}`. Gallery → **Fans** lists
them. The shared page offers **make your own Emoji New Master!**

## 8. What this is not

- Not a server-side mosaic renderer
- Not a precomputed SVG/PDF of the print edition
- Not an LLM rewriting the painting
- Not a substitution of Drive or Synology mosaic files for Wikimedia sources
