import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Save, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { CameraStudio } from "@/components/camera-studio";
import { DensityControl } from "@/components/density-control";
import { IpfsCopy } from "@/components/ipfs-copy";
import { MosaicCanvas } from "@/components/mosaic-canvas";
import { MosaicExport } from "@/components/mosaic-export";
import { OgSharePreview } from "@/components/og-share-preview";
import { ShareWork } from "@/components/share-work";
import { SvgCameraStudio } from "@/components/svg-camera-studio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { publishFanWork } from "@/lib/fan-works";
import type { IpfsPins } from "@/lib/ipfs";
import { notifyAddedToFans } from "@/lib/notify-saved";
import {
  canvasToJpegBase64,
  DEFAULT_PLATE_DENSITY,
  ensurePalette,
  glyphsToText,
  renderMosaic,
  type MosaicResult,
} from "@/lib/mosaic/engine";
import { loadFromFile } from "@/lib/mosaic/load-image";
import { requestFullscreenEl } from "@/lib/camera";

export const Route = createFileRoute("/try")({
  component: TryOwn,
  head: () => ({
    meta: [{ title: "Camera — EMOJI OLD MASTERS" }],
  }),
});

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function TryOwn() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [title, setTitle] = useState("");
  const [density, setDensity] = useState(DEFAULT_PLATE_DENSITY);
  const [grid, setGrid] = useState<MosaicResult | null>(null);
  const [drag, setDrag] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [rebuilding, setRebuilding] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [svgOpen, setSvgOpen] = useState(false);
  const [share, setShare] = useState<{
    id: string;
    url: string;
    ipfs?: IpfsPins | null;
    ogJpeg?: string;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const locked = Boolean(share);

  const onRendered = useCallback((info: MosaicResult, canvas: HTMLCanvasElement) => {
    setGrid(info);
    canvasRef.current = canvas;
    setRebuilding(false);
  }, []);

  const takeFile = async (file: File | undefined) => {
    setError(null);
    setShare(null);
    if (!file) return;
    if (!ALLOWED.has(file.type)) {
      setError("Use a JPEG, PNG, or WebP.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Keep the file under 5 MB.");
      return;
    }
    try {
      const img = await loadFromFile(file);
      setImage(img);
      setGrid(null);
      setRebuilding(true);
      setDensity(DEFAULT_PLATE_DENSITY);
    } catch {
      setError("Could not read that image.");
    }
  };

  const changeDensity = (next: number) => {
    if (locked) return;
    setRebuilding(true);
    setGrid(null);
    setDensity(next);
  };

  const onSaveShare = async () => {
    if (!image || !grid?.glyphs.length || locked) return;
    setError(null);
    setSharing(true);
    try {
      const palette = await ensurePalette();
      const hi = document.createElement("canvas");
      renderMosaic(hi, image, density, palette, 2400);
      let jpeg = await canvasToJpegBase64(hi, 2400, 0.92);
      if (jpeg.length > 4_000_000) {
        jpeg = await canvasToJpegBase64(hi, 1800, 0.88);
      }
      if (jpeg.length > 4_000_000) {
        jpeg = await canvasToJpegBase64(hi, 1400, 0.84);
      }
      const result = await publishFanWork({
        data: {
          title: title.trim() || undefined,
          cols: grid.cols,
          rows: grid.rows,
          emojiText: glyphsToText(grid.glyphs, grid.cols),
          imageJpeg: jpeg,
        },
      });
      notifyAddedToFans(title.trim() || undefined);
      await navigate({ to: "/fan/$id", params: { id: result.id } });
    } catch {
      setError("Could not save that mosaic. Try again.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
      <div className="max-w-xl">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-headline sm:text-4xl">
          Camera
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Open a live emoji mosaic of your camera, or drop a still. Record a
          12-second reel, title it, and it lands in Gallery (Fans). SVG reels
          live there too, tagged experimental.
        </p>
        <Link
          to="/"
          search={{ view: "fans" }}
          className="mt-5 inline-flex h-11 items-center rounded-md border border-border bg-surface px-4 text-sm font-semibold text-fg transition-[background-color,border-color] duration-150 hover:border-headline hover:bg-surface-2"
        >
          Gallery (Fans)
        </Link>
      </div>

      {!image ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setError(null);
              setCameraOpen(true);
              requestFullscreenEl(document.documentElement);
            }}
            className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-10 text-center transition-[background-color,border-color] duration-150 ease-out hover:border-headline hover:bg-surface-2"
          >
            <span className="text-3xl" aria-hidden="true">
              📷
            </span>
            <span className="mt-3 text-sm font-medium text-fg">Open camera</span>
            <span className="mt-1 text-sm text-subtle">
              Live mosaic · front or rear · 12s reel
            </span>
          </button>
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              void takeFile(e.dataTransfer.files[0]);
            }}
            className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition-[background-color,border-color] duration-150 ease-out ${
              drag ? "border-headline bg-surface-2" : "border-border bg-surface"
            }`}
          >
            <Upload className="size-6 text-muted" />
            <span className="mt-3 text-sm font-medium text-fg">
              Drop an image or browse
            </span>
            <span className="mt-1 text-sm text-subtle">JPEG, PNG, WebP · 5 MB</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => {
                void takeFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setSvgOpen(true);
              requestFullscreenEl(document.documentElement);
            }}
            className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-8 text-center transition-[background-color,border-color] duration-150 ease-out hover:border-headline hover:bg-surface-2 sm:col-span-2"
          >
            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted uppercase">
              Experimental
            </span>
            <span className="mt-2 text-2xl" aria-hidden="true">
              📄
            </span>
            <span className="mt-2 text-sm font-medium text-fg">SVG reel camera</span>
            <span className="mt-1 text-sm text-subtle">
              Looping SVG movie · denser mosaic · lands in Fans
            </span>
          </button>
        </div>
      ) : (
        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-xl bg-surface p-1.5">
              <div className="overflow-hidden rounded-lg">
                <MosaicCanvas
                  source={image}
                  density={density}
                  eager
                  label="Your image as an emoji mosaic"
                  onRendered={onRendered}
                />
              </div>
            </div>
            <label className="mt-3 inline-flex h-11 cursor-pointer items-center text-sm text-muted transition-[color] duration-150 hover:text-fg">
              Replace image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => {
                  void takeFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          <aside className="rounded-xl border border-border bg-surface p-4 sm:p-5">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-fg" htmlFor="fan-title">
                  Title
                </label>
                <Input
                  id="fan-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={80}
                  placeholder="Emoji New Master"
                  className="mt-2"
                  disabled={locked}
                />
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-fg">Glyphs</p>
                <DensityControl
                  value={density}
                  onChange={changeDensity}
                  cols={grid?.cols}
                  rows={grid?.rows}
                  locked={locked}
                  busy={rebuilding}
                />
              </div>

              <Button
                type="button"
                variant="buy"
                className="w-full"
                onClick={() => void onSaveShare()}
                disabled={sharing || locked || rebuilding || !grid?.glyphs.length}
              >
                <Save className="size-4" />
                {locked
                  ? "Saved"
                  : sharing
                    ? "Saving…"
                    : "Save and Share"}
              </Button>

              <div>
                <p className="mb-2 text-sm font-medium text-fg">Download</p>
                <MosaicExport
                  name={title.trim() || "emoji-new-master"}
                  grid={grid}
                  canvas={canvasRef.current}
                />
              </div>
            </div>

            {share && (
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-sm font-semibold text-fg">Saved — send to a friend</p>
                <p className="mt-1 text-sm text-muted">
                  Glyph count is locked. The JPEG and emoji text are in the
                  archive.
                </p>
                {share.ogJpeg ? (
                  <div className="mt-3">
                    <OgSharePreview readySrc={share.ogJpeg} />
                  </div>
                ) : null}
                <Input
                  readOnly
                  value={share.url}
                  className="mt-3 font-mono text-xs"
                />
                <div className="mt-3">
                  <ShareWork
                    path={`/fan/${share.id}`}
                    title={title.trim() || "Emoji New Master"}
                  />
                </div>
                {share.ipfs ? (
                  <div className="mt-4">
                    <IpfsCopy pins={share.ipfs} />
                  </div>
                ) : null}
                <Button asChild variant="ghost" className="mt-3 w-full">
                  <Link to="/fan/$id" params={{ id: share.id }}>
                    Open artwork
                  </Link>
                </Button>
                <Button asChild variant="outline" className="mt-2 w-full">
                  <Link to="/" search={{ view: "fans" }}>
                    Gallery (Fans)
                  </Link>
                </Button>
              </div>
            )}
          </aside>
        </section>
      )}

      {share && !image && (
        <div className="mt-8 rounded-xl border border-border bg-surface p-4 sm:p-5">
          <p className="text-sm font-semibold text-fg">Saved — send to a friend</p>
          {share.ogJpeg ? (
            <div className="mt-3">
              <OgSharePreview readySrc={share.ogJpeg} />
            </div>
          ) : null}
          <Input readOnly value={share.url} className="mt-3 font-mono text-xs" />
          <div className="mt-3">
            <ShareWork path={`/fan/${share.id}`} title="Emoji New Master" />
          </div>
          {share.ipfs ? (
            <div className="mt-4">
              <IpfsCopy pins={share.ipfs} />
            </div>
          ) : null}
          <Button asChild variant="ghost" className="mt-3 w-full">
            <Link to="/fan/$id" params={{ id: share.id }}>
              Open artwork
            </Link>
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link to="/" search={{ view: "fans" }}>
              Gallery (Fans)
            </Link>
          </Button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-muted">{error}</p>}

      <CameraStudio
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onSaved={(saved) => {
          notifyAddedToFans(saved.title);
          setShare({ id: saved.id, url: saved.url, ipfs: saved.ipfs, ogJpeg: saved.ogJpeg });
          setTitle(saved.title);
          void navigate({ to: "/fan/$id", params: { id: saved.id } });
        }}
      />
      <SvgCameraStudio open={svgOpen} onClose={() => setSvgOpen(false)} />
    </main>
  );
}
