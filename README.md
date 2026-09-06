# Emoji Old Masters

Public-domain paintings remade as **live emoji mosaics**. The gallery samples
each Wikimedia original in the browser and rebuilds it as a grid of color
emoji — not a pre-baked picture.

This repository is:

1. The **site source** and the **generation methods** ([METHODS.md](METHODS.md))
2. The public archive of **fan mosaics** — every shared work lands in [`fans/`](fans/) as a JPEG plus the emoji text

Site: Emoji Old Masters (gallery, plate view, Try your own, About).
Book: 12 × 12 inch edition on [Blurb](https://www.blurb.com) — BUY NOW on the site.

## Generation (short)

1. Load the painting (Commons `thumb.php`, ~800–1200 px)
2. Calibrate a Lab palette from system / Twemoji-style glyphs
3. Downsample to `cols × rows` (density 12–64)
4. Nearest-emoji via a 16³ lookup table
5. Fill each cell with sampled RGB, then draw the glyph

Full write-up: [METHODS.md](METHODS.md). Engine: `src/lib/mosaic/`.

## Fan archive

When someone shares a mosaic from **Try your own**:

```
fans/index.json
fans/{id}/meta.json     # title, grid, timestamp
fans/{id}/emoji.txt     # the mosaic as emoji characters
fans/{id}/mosaic.jpg    # medium JPEG
```

Browse them on the site under **Gallery → Fans**. A shared link opens the
artwork with a prompt to **make your own Emoji New Master!**

## Author

Max Infeld. Generative work from the sewers — art and tech in the same pipe.

## License

Plate sources are public-domain / Commons reproductions (see each row’s
`license` and `commons_page`). Site code in this repo is for the Emoji Old
Masters project.
