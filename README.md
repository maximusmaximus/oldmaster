# Emoji Old Masters

Public-domain paintings remade as **live emoji mosaics**. The gallery samples
each Wikimedia original in the browser and rebuilds it as a grid of color
emoji — not a pre-baked picture.

This repository is:

1. The **site source** and the **generation methods** ([METHODS.md](METHODS.md))
2. The public archive of **fan mosaics** — every shared work lands in [`fans/`](fans/) as a JPEG plus the emoji text

Site: Emoji Old Masters (gallery, plate view, Try your own, About).
Book: 11.75 × 11.75 inch, 440-page hardcover, sold on the site at `/book` (Stripe Checkout, printed to order by RPI Print).

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

## Book store (`/book`)

Stripe Checkout + RPI Print drop-ship. **Sales are on** (`store_settings.ORDERS_ENABLED='true'`). An admin can turn them off at `/admin/store`, and the safety stops can still turn them off automatically.

Flow: `/book` address form → `POST /api/store/quote` (live RPI shipping estimate, valid 30 min) → `POST /api/store/checkout` (Stripe Checkout Session, $145 + that tier's RPI rate, Stripe Tax) → `POST /api/store/stripe-webhook` (signature-verified, deduped, paid-only) → RPI `POST /orders/create` with customerOrderId `emoji-old-masters-440pp-gls-NNN` (from 004; 001–003 reserved) and GET-before-retry → `POST /api/store/rpi-webhook` + signed cron keep status current → `/order/<token>`.

Server-only env (names only; never commit values): `PUBLIC_BASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RPI_API_AUTH`, `RPI_WEBHOOK_SECRET`, `CRON_SECRET`, optional `RPI_BASE_URL` (default `https://open.api.rpiprint.com`). Existing: `ADMIN_USER`, `ADMIN_PASS`, `DATABASE_URL`.

Cron: `docs/store-cron-worker.js` (Cloudflare Worker) calls `/api/store/cron/{reconcile,release,daily}` with an HMAC of `CRON_SECRET`.

Tests: `npm test` (Stripe and RPI are mocked; no network calls).
