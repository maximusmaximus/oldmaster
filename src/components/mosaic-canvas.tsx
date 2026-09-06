import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_PLATE_DENSITY,
  ensurePalette,
  renderMosaic,
  type MosaicResult,
} from "@/lib/mosaic/engine";
import { loadImage } from "@/lib/mosaic/load-image";
import { observeVisibility } from "@/lib/mosaic/observe";
import { cn } from "@/lib/utils";

type Source = HTMLImageElement | ImageBitmap;

type Props = {
  source?: Source | null;
  src?: string;
  density?: number;
  className?: string;
  label?: string;
  onRendered?: (info: MosaicResult, canvas: HTMLCanvasElement) => void;
  eager?: boolean;
  fallbackRatio?: number;
};

export function MosaicCanvas({
  source,
  src,
  density = DEFAULT_PLATE_DENSITY,
  className,
  label,
  onRendered,
  eager = false,
  fallbackRatio = 4 / 3,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seenRef = useRef(eager);
  const [visible, setVisible] = useState(eager);
  const [loaded, setLoaded] = useState<Source | null>(source ?? null);
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");

  useEffect(() => {
    if (source) setLoaded(source);
  }, [source]);

  useEffect(() => {
    if (eager) return;
    const el = wrapRef.current;
    if (!el) return;
    return observeVisibility(el, (inView) => {
      if (inView && !seenRef.current) {
        seenRef.current = true;
        setVisible(true);
      }
    });
  }, [eager]);

  useEffect(() => {
    if (!visible || !src || source) return;
    let live = true;
    loadImage(src)
      .then((img) => {
        if (live) setLoaded(img);
      })
      .catch(() => {
        if (live) setStatus("error");
      });
    return () => {
      live = false;
    };
  }, [visible, src, source]);

  useEffect(() => {
    if (!visible || !loaded) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !wrap) return;
    let cancelled = false;

    const paint = async () => {
      try {
        const palette = await ensurePalette();
        if (cancelled) return;
        const cssWidth = wrap.clientWidth || 320;
        const info = renderMosaic(canvas, loaded, density, palette, cssWidth);
        if (cancelled) return;
        setStatus("ready");
        onRendered?.(info, canvas);
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    void paint();
    return () => {
      cancelled = true;
    };
  }, [visible, loaded, density, onRendered]);

  const ratio =
    loaded && loaded.width && loaded.height
      ? loaded.width / loaded.height
      : fallbackRatio;

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full overflow-hidden bg-surface-2", className)}
      style={{ aspectRatio: String(ratio) }}
    >
      {status !== "ready" && status !== "error" && (
        <div
          className={cn(
            "absolute inset-0 bg-surface-2",
            visible && "animate-pulse",
          )}
          aria-hidden="true"
        />
      )}
      {status === "error" && (
        <p className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-muted">
          Couldn’t build this mosaic
        </p>
      )}
      {visible && (
        <canvas
          ref={canvasRef}
          aria-label={label ?? "Emoji mosaic"}
          className={cn(
            "block h-full w-full transition-opacity duration-300 ease-smooth-out",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
