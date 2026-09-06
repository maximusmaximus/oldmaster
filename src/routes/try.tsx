import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Copy, Download, Share2, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DensityControl } from "@/components/density-control";
import { MosaicCanvas } from "@/components/mosaic-canvas";
import { MosaicExport } from "@/components/mosaic-export";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { publishFanWork } from "@/lib/fan-works";
import {
  canvasToJpegBase64,
  DEFAULT_PLATE_DENSITY,
  downloadJpeg,
  glyphsToText,
  type MosaicResult,
} from "@/lib/mosaic/engine";
import { loadFromFile } from "@/lib/mosaic/load-image";

export const Route = createFileRoute("/try")({
  component: TryOwn,
  head: () => ({
    meta: [{ title: "Try your own — EMOJI OLD MASTERS" }],
  }),
});

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function TryOwn() {
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [density, setDensity] = useState(DEFAULT_PLATE_DENSITY);
  const [grid, setGrid] = useState<MosaicResult | null>(null);
  const [drag, setDrag] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState<{
    id: string;
    url: string;
    jpeg: string;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onRendered = useCallback((info: MosaicResult, canvas: HTMLCanvasElement) => {
    setGrid(info);
    canvasRef.current = canvas;
  }, []);

  useEffect(() => {
    setShare(null);
    setCopied(false);
  }, [image, density]);

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
      setName(file.name);
      setGrid(null);
    } catch {
      setError("Could not read that image.");
    }
  };

  const onShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !grid?.glyphs.length) return;
    setError(null);
    setSharing(true);
    try {
      let jpeg = await canvasToJpegBase64(canvas, 1200);
      if (jpeg.length > 1_200_000) {
        jpeg = await canvasToJpegBase64(canvas, 800);
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
      const url = `${window.location.origin}/fan/${result.id}`;
      setShare({ id: result.id, url, jpeg });
    } catch {
      setError("Could not share that mosaic. Try again.");
    } finally {
      setSharing(false);
    }
  };

  const onCopy = async () => {
    if (!share) return;
    try {
      await navigator.clipboard.writeText(share.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Couldn’t copy the link — select it instead.");
    }
  };

  const onNativeShare = async () => {
    if (!share || typeof navigator.share !== "function") return;
    try {
      await navigator.share({
        title: title.trim() || "Emoji New Master",
        text: "Look at this Emoji New Master",
        url: share.url,
      });
    } catch {
      /* user cancelled */
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
      <div className="max-w-xl">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-headline sm:text-4xl">
          Try your own
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Drop a JPEG, PNG, or WebP (5 MB max). The mosaic is built on this
          device. Share publishes a medium JPEG and the emoji text so a friend
          can see it — and so it can live in Gallery (Fans).
        </p>
      </div>

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
        className={`mt-8 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition-[background-color,border-color] duration-150 ease-out ${
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

      {error && <p className="mt-3 text-sm text-muted">{error}</p>}

      {image && (
        <section className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-sans text-xl font-semibold tracking-tight text-fg">
                {name ?? "Your mosaic"}
              </h2>
              {grid && (
                <p className="mt-1 text-sm text-subtle tabular-nums">
                  {grid.cells.toLocaleString()} glyphs
                </p>
              )}
            </div>
            <DensityControl
              value={density}
              onChange={setDensity}
              cols={grid?.cols}
              rows={grid?.rows}
            />
          </div>
          <div className="mt-5 overflow-hidden rounded-xl bg-surface p-1.5">
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

          <div className="mt-6 max-w-md">
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
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="buy"
              onClick={() => void onShare()}
              disabled={sharing || !grid?.glyphs.length}
            >
              <Share2 className="size-4" />
              {sharing ? "Sharing…" : "Share"}
            </Button>
          </div>
          <div className="mt-4">
            <MosaicExport
              name={title.trim() || name || "emoji-new-master"}
              grid={grid}
              canvas={canvasRef.current}
            />
          </div>

          {share && (
            <div className="mt-6 rounded-xl border border-border bg-surface p-4 sm:p-5">
              <p className="text-sm font-semibold text-fg">Send this to a friend</p>
              <p className="mt-1 text-sm text-muted">
                A public link is ready. The JPEG and emoji text are in the
                archive.
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Input readOnly value={share.url} className="font-mono text-xs" />
                <Button type="button" variant="outline" onClick={() => void onCopy()}>
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    downloadJpeg(
                      share.jpeg,
                      `${(title.trim() || "emoji-new-master").replace(/\s+/g, "-").toLowerCase()}.jpg`,
                    )
                  }
                >
                  <Download className="size-4" />
                  Download JPEG
                </Button>
                {typeof navigator !== "undefined" &&
                  typeof navigator.share === "function" && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => void onNativeShare()}
                    >
                      Share to apps
                    </Button>
                  )}
                <Button asChild variant="ghost">
                  <Link to="/fan/$id" params={{ id: share.id }}>
                    Open artwork
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
