import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ShareWork } from "@/components/share-work";
import { SvgIpfsLinks } from "@/components/svg-ipfs-links";
import { SvgReelPlayer } from "@/components/svg-reel-player";
import { EncodeSpin, VideoEncodeWait } from "@/components/video-encode-wait";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  isDesktopLive,
  liveFpsFor,
  requestFullscreenEl,
  exitFullscreenSafe,
} from "@/lib/camera";
import type { IpfsPins } from "@/lib/ipfs";
import {
  canvasToJpegBase64,
  createLiveRenderer,
  ensurePalette,
  fileStem,
  glyphsToText,
  type MosaicResult,
  type Palette,
} from "@/lib/mosaic/engine";
import { downloadReelVideo, type ReelVideoSize } from "@/lib/svg-4k";
import {
  DEFAULT_SVG_DENSITY,
  downloadSvg,
  framesToAnimatedSvg,
  letterboxReelFrame,
  packReelFrames,
  SVG_CLIP_MS,
  SVG_DENSITY_STEPS,
  SVG_FPS,
  type SvgReelFrame,
} from "@/lib/svg-reel";
import { publishSvgReel } from "@/lib/svg-reels";
import { notifyAddedSvgReel } from "@/lib/notify-saved";

type Saved = { id: string; title: string; ipfs?: IpfsPins | null };

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: (saved: Saved) => void;
};

export function SvgCameraStudio({ open, onClose, onSaved }: Props) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef(createLiveRenderer());
  const paletteRef = useRef<Palette | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const framesRef = useRef<SvgReelFrame[]>([]);
  const gridRef = useRef<MosaicResult | null>(null);
  const facingRef = useRef<"user" | "environment">("environment");
  const densityRef = useRef(DEFAULT_SVG_DENSITY);
  const recordingRef = useRef(false);
  const lastCaptureRef = useRef(0);

  const [error, setError] = useState<string | null>(null);
  const [density, setDensity] = useState(DEFAULT_SVG_DENSITY);
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const [grid, setGrid] = useState<MosaicResult | null>(null);
  const [recording, setRecording] = useState(false);
  const [remainMs, setRemainMs] = useState(SVG_CLIP_MS);
  const [wake, setWake] = useState(0);
  const [title, setTitle] = useState("");
  const [reel, setReel] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [encoding, setEncoding] = useState<ReelVideoSize | null>(null);
  const [saved, setSaved] = useState<Saved | null>(null);

  densityRef.current = density;
  facingRef.current = facing;
  recordingRef.current = recording;

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startStream = useCallback(
    async (mode: "user" | "environment") => {
      stopStream();
      const desktop = isDesktopLive();
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: desktop
          ? {
              facingMode: { ideal: mode },
              width: { ideal: 640, max: 960 },
              height: { ideal: 360, max: 540 },
              frameRate: { ideal: 24, max: 30 },
            }
          : { facingMode: { ideal: mode }, frameRate: { ideal: 24, max: 30 } },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        await video.play();
      }
    },
    [stopStream],
  );

  useEffect(() => {
    if (!open) return;
    let alive = true;
    setError(null);
    setReel(null);
    setTitle("");
    setRecording(false);
    setSaved(null);
    setRemainMs(SVG_CLIP_MS);
    void (async () => {
      try {
        await startStream(facingRef.current);
      } catch {
        if (alive) setError("Camera permission is needed for an SVG reel.");
      }
    })();
    return () => {
      alive = false;
      stopStream();
    };
  }, [open, startStream, stopStream]);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    void ensurePalette().then((palette) => {
      if (alive) paletteRef.current = palette;
    });
    return () => {
      alive = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const shell = shellRef.current;
    const goFull = () => requestFullscreenEl(shell ?? document.documentElement);
    goFull();
    const onInteract = () => {
      if (!document.fullscreenElement) goFull();
    };
    shell?.addEventListener("pointerdown", onInteract);
    const applyView = () => {
      if (!shell) return;
      shell.style.top = "0";
      shell.style.left = "0";
      shell.style.width = "100%";
      shell.style.height = "100dvh";
      setWake((n) => n + 1);
    };
    applyView();
    window.addEventListener("orientationchange", applyView);
    window.addEventListener("resize", applyView);
    return () => {
      document.body.style.overflow = prev;
      shell?.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("orientationchange", applyView);
      window.removeEventListener("resize", applyView);
      exitFullscreenSafe();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const zoom = { scale: 1, x: 0, y: 0 };
    type Gesture = {
      dist: number;
      scale: number;
      x: number;
      y: number;
      cx: number;
      cy: number;
      px: number;
      py: number;
      fingers: number;
    };
    let gesture: Gesture | null = null;

    const paint = () => {
      canvas.style.transformOrigin = "center center";
      canvas.style.transform = `translate3d(${zoom.x}px, ${zoom.y}px, 0) scale(${zoom.scale})`;
    };
    paint();

    const clamp = () => {
      zoom.scale = Math.min(6, Math.max(1, zoom.scale));
      if (zoom.scale <= 1.02) {
        zoom.scale = 1;
        zoom.x = 0;
        zoom.y = 0;
      }
    };

    const pair = (touches: TouchList) => {
      const a = touches.item(0);
      const b = touches.item(1);
      if (!a || !b) return null;
      const dx = a.clientX - b.clientX;
      const dy = a.clientY - b.clientY;
      return {
        dist: Math.hypot(dx, dy) || 1,
        cx: (a.clientX + b.clientX) / 2,
        cy: (a.clientY + b.clientY) / 2,
      };
    };

    const onStart = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        const p = pair(event.touches);
        if (!p) return;
        event.preventDefault();
        gesture = {
          dist: p.dist,
          scale: zoom.scale,
          x: zoom.x,
          y: zoom.y,
          cx: p.cx,
          cy: p.cy,
          px: 0,
          py: 0,
          fingers: 2,
        };
        return;
      }
      if (event.touches.length === 1 && zoom.scale > 1.02) {
        const t = event.touches.item(0);
        if (!t) return;
        gesture = {
          dist: 1,
          scale: zoom.scale,
          x: zoom.x,
          y: zoom.y,
          cx: t.clientX,
          cy: t.clientY,
          px: t.clientX,
          py: t.clientY,
          fingers: 1,
        };
      }
    };

    const onMove = (event: TouchEvent) => {
      if (!gesture) return;
      if (event.touches.length >= 2 && gesture.fingers >= 2) {
        const p = pair(event.touches);
        if (!p) return;
        event.preventDefault();
        const next = Math.min(6, Math.max(1, gesture.scale * (p.dist / gesture.dist)));
        const ratio = next / gesture.scale;
        const box = wrap.getBoundingClientRect();
        const ox = box.left + box.width / 2;
        const oy = box.top + box.height / 2;
        zoom.scale = next;
        zoom.x = gesture.x * ratio + (p.cx - ox) * (1 - ratio) + (p.cx - gesture.cx);
        zoom.y = gesture.y * ratio + (p.cy - oy) * (1 - ratio) + (p.cy - gesture.cy);
        clamp();
        paint();
        return;
      }
      if (event.touches.length === 1 && gesture.fingers === 1) {
        const t = event.touches.item(0);
        if (!t) return;
        event.preventDefault();
        zoom.x = gesture.x + (t.clientX - gesture.px);
        zoom.y = gesture.y + (t.clientY - gesture.py);
        paint();
      }
    };

    const onEnd = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        const p = pair(event.touches);
        if (p) {
          gesture = {
            dist: p.dist,
            scale: zoom.scale,
            x: zoom.x,
            y: zoom.y,
            cx: p.cx,
            cy: p.cy,
            px: 0,
            py: 0,
            fingers: 2,
          };
          return;
        }
      }
      if (event.touches.length === 1 && zoom.scale > 1.02) {
        const t = event.touches.item(0);
        if (t) {
          gesture = {
            dist: 1,
            scale: zoom.scale,
            x: zoom.x,
            y: zoom.y,
            cx: t.clientX,
            cy: t.clientY,
            px: t.clientX,
            py: t.clientY,
            fingers: 1,
          };
          return;
        }
      }
      gesture = null;
      clamp();
      paint();
    };

    wrap.addEventListener("touchstart", onStart, { passive: false });
    wrap.addEventListener("touchmove", onMove, { passive: false });
    wrap.addEventListener("touchend", onEnd);
    wrap.addEventListener("touchcancel", onEnd);
    return () => {
      wrap.removeEventListener("touchstart", onStart);
      wrap.removeEventListener("touchmove", onMove);
      wrap.removeEventListener("touchend", onEnd);
      wrap.removeEventListener("touchcancel", onEnd);
      canvas.style.transform = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    let raf = 0;
    let last = 0;
    const loop = (stamp: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      if (stamp - last < 1000 / liveFpsFor(densityRef.current)) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      const palette = paletteRef.current;
      if (!video || !canvas || !wrap || !palette || video.readyState < 2) return;
      if (!video.videoWidth) return;
      last = stamp;
      const capture =
        recordingRef.current && stamp - lastCaptureRef.current >= 1000 / SVG_FPS;
      const info = liveRef.current.draw({
        canvas,
        video,
        wrapW: wrap.clientWidth || 360,
        wrapH: wrap.clientHeight || 640,
        density: densityRef.current,
        palette,
        capture,
      });
      gridRef.current = info;
      setGrid((prev) =>
        prev && prev.cols === info.cols && prev.rows === info.rows ? prev : info,
      );
      if (capture && info.glyphs.length) {
        lastCaptureRef.current = stamp;
        framesRef.current.push({
          cols: info.cols,
          rows: info.rows,
          glyphs: info.glyphs.slice(),
          colors: new Uint8ClampedArray(info.colors),
        });
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [open, wake]);

  const finishReel = useCallback(() => {
    recordingRef.current = false;
    setRecording(false);
    setRemainMs(SVG_CLIP_MS);
    const frames = framesRef.current;
    if (frames.length < 2) {
      setError("Need a little more motion. Hold record a beat longer.");
      return;
    }
    try {
      const svg = framesToAnimatedSvg(frames, SVG_FPS, 44);
      setReel(svg);
    } catch {
      setError("Could not pack that SVG. Try fewer emoji.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (!recordingRef.current) return;
    finishReel();
  }, [finishReel]);

  const startRecording = () => {
    if (recordingRef.current || reel) return;
    framesRef.current = [];
    lastCaptureRef.current = 0;
    recordingRef.current = true;
    setRecording(true);
    setSaved(null);
    setRemainMs(SVG_CLIP_MS);
    setError(null);
  };

  useEffect(() => {
    if (!recording) return;
    const started = performance.now();
    const id = window.setInterval(() => {
      const left = Math.max(0, SVG_CLIP_MS - (performance.now() - started));
      setRemainMs(left);
      if (left <= 0) stopRecording();
    }, 100);
    return () => window.clearInterval(id);
  }, [recording, stopRecording]);

  const flipCamera = async () => {
    if (recording) return;
    const next = facing === "user" ? "environment" : "user";
    setFacing(next);
    try {
      await startStream(next);
    } catch {
      setError("Could not switch cameras.");
    }
  };

  const discard = () => {
    if (saving || encoding) return;
    setReel(null);
    setTitle("");
    setSaved(null);
    framesRef.current = [];
  };

  const closeAll = () => {
    if (recording) stopRecording();
    discard();
    onClose();
  };

  const saveReel = async () => {
    if (!reel || saving || saved) return;
    const frames = framesRef.current;
    const first = frames[0];
    if (!first) return;
    setSaving(true);
    setError(null);
    try {
      const mid = frames[Math.floor(frames.length / 2)] ?? first;
      const poster = document.createElement("canvas");
      letterboxReelFrame(poster, mid, 960, 960);
      const imageJpeg = await canvasToJpegBase64(poster, 960, 0.86);
      const framesJson = packReelFrames(frames, SVG_FPS);
      const base = {
        title: title.trim() || undefined,
        cols: first.cols,
        rows: first.rows,
        fps: SVG_FPS,
        frameCount: frames.length,
        emojiText: glyphsToText(mid.glyphs, mid.cols) || "🎞️",
        imageJpeg,
        svg: reel,
      };
      let result: { id: string; title: string; ipfs?: IpfsPins | null };
      try {
        result = await publishSvgReel({
          data: { ...base, framesJson },
        });
      } catch {
        result = await publishSvgReel({ data: base });
      }
      const next = {
        id: result.id,
        title: result.title,
        ipfs: result.ipfs,
      };
      setSaved(next);
      onSaved?.(next);
      notifyAddedSvgReel(next.title);
      onClose();
      void navigate({ to: "/svg/$id", params: { id: next.id } });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg && msg.length < 160
          ? `Could not save that SVG reel. ${msg}`
          : "Could not save that SVG reel. You can still download it.",
      );
    } finally {
      setSaving(false);
    }
  };

  const onVideo = async (size: ReelVideoSize) => {
    if (encoding) return;
    const frames = framesRef.current;
    if (frames.length < 2) return;
    setEncoding(size);
    setError(null);
    try {
      await downloadReelVideo(
        frames,
        title.trim() || saved?.title || "emoji-svg-reel",
        SVG_FPS,
        size,
      );
    } catch {
      setError(`Could not encode ${size.toUpperCase()} in this browser.`);
    } finally {
      setEncoding(null);
    }
  };

  const at = Math.max(0, SVG_DENSITY_STEPS.findIndex((step) => step === density));
  const canCoarser = at > 0 && !recording && !reel;
  const canFiner = at < SVG_DENSITY_STEPS.length - 1 && !recording && !reel;
  const secs = Math.ceil(remainMs / 1000);

  if (!open) return null;

  return (
    <div ref={shellRef} className="fixed inset-0 z-50 h-[100dvh] w-full bg-bg">
      <video ref={videoRef} className="hidden" playsInline muted autoPlay />
      <div
        ref={wrapRef}
        className="absolute inset-0 overflow-hidden bg-bg touch-none"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 size-full object-cover will-change-transform"
          aria-label="Live emoji mosaic for SVG reel"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="pointer-events-auto absolute top-[max(0.5rem,env(safe-area-inset-top))] left-[max(0.5rem,env(safe-area-inset-left))]">
          <CamBtn emoji="❌" label="Close" onClick={closeAll} />
        </div>
        <div className="pointer-events-auto absolute top-[max(0.5rem,env(safe-area-inset-top))] right-[max(0.5rem,env(safe-area-inset-right))]">
          <CamBtn emoji="🔄" label="Switch camera" onClick={() => void flipCamera()} disabled={recording} />
        </div>
        <div className="absolute top-[max(0.5rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2">
          <p className="rounded-full bg-bg/80 px-3 py-1 text-xs font-bold text-fg tabular-nums">
            {recording
              ? `✏️ 0:${String(secs).padStart(2, "0")} SVG`
              : grid?.cols && grid.rows
                ? `${grid.cols} × ${grid.rows} · pinch to zoom`
                : "24s SVG reel · pinch to zoom"}
          </p>
        </div>

        <div className="pointer-events-auto absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 items-center gap-4">
          <CamBtn
            emoji="➖"
            label="Fewer emoji"
            disabled={!canCoarser}
            onClick={() => setDensity(SVG_DENSITY_STEPS[Math.max(0, at - 1)]!)}
          />
          <CamBtn
            emoji={recording ? "⏹️" : "🟠"}
            label={recording ? "Stop SVG reel" : "Record SVG reel"}
            hot
            onClick={() => (recording ? stopRecording() : startRecording())}
            disabled={Boolean(reel)}
          />
          <CamBtn
            emoji="➕"
            label="More emoji"
            disabled={!canFiner}
            onClick={() =>
              setDensity(SVG_DENSITY_STEPS[Math.min(SVG_DENSITY_STEPS.length - 1, at + 1)]!)
            }
          />
        </div>
        {error && !reel ? (
          <p className="absolute bottom-[max(6rem,env(safe-area-inset-bottom))] left-1/2 w-[min(24rem,90%)] -translate-x-1/2 text-center text-sm font-medium text-headline">
            {error}
          </p>
        ) : null}
      </div>

      {reel ? (
        <div
          className="absolute inset-0 z-20 flex items-end justify-center bg-bg/85 p-4 sm:items-center"
          onClick={() => {
            if (saved) closeAll();
            else discard();
          }}
        >
          <div
            role="dialog"
            className="max-h-[90dvh] w-full max-w-md overflow-auto rounded-xl border border-border bg-surface p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-sans text-xl font-bold text-headline">
              {saved ? "Saved SVG reel" : "SVG reel"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {saved
                ? "Share the link, grab the SVG, or export 4K."
                : "Title it, save it here (not Fans), or download. Tap outside to throw it away."}
            </p>
            <div className="relative mt-4 overflow-hidden rounded-lg bg-surface-2">
              <SvgReelPlayer
                title={title.trim() || "SVG reel"}
                frames={framesRef.current}
                fps={SVG_FPS}
                autoPlay
              />
              {encoding ? <VideoEncodeWait size={encoding} compact /> : null}
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              placeholder="Untitled SVG reel"
              className="mt-4"
              autoFocus={!saved}
              disabled={Boolean(saved)}
            />
            {!saved ? (
              <Button
                type="button"
                variant="buy"
                className="mt-4 w-full"
                disabled={saving}
                onClick={() => void saveReel()}
              >
                {saving ? "Saving…" : "Save and Share"}
              </Button>
            ) : (
              <div className="mt-4">
                <ShareWork path={`/svg/${saved.id}`} title={saved.title} />
                <div className="mt-3">
                  <SvgIpfsLinks pins={saved.ipfs} />
                </div>
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full"
              onClick={() =>
                downloadSvg(
                  reel,
                  `${fileStem(title.trim() || saved?.title || "emoji-svg-reel")}.svg`,
                  framesRef.current,
                  SVG_FPS,
                )
              }
            >
              Download SVG
            </Button>
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full"
              disabled={Boolean(encoding)}
              onClick={() => void onVideo("4k")}
            >
              {encoding === "4k" ? (
                <span className="inline-flex items-center gap-2">
                  <EncodeSpin /> Building 4K…
                </span>
              ) : (
                "Download 4K video"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full"
              disabled={Boolean(encoding)}
              onClick={() => void onVideo("8k")}
            >
              {encoding === "8k" ? (
                <span className="inline-flex items-center gap-2">
                  <EncodeSpin /> Building 8K…
                </span>
              ) : (
                "Download 8K video"
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="mt-2 w-full"
              onClick={() => void navigator.clipboard.writeText(reel).catch(() => undefined)}
            >
              Copy SVG markup
            </Button>
            {error ? (
              <p className="mt-3 text-center text-sm font-medium text-headline">{error}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CamBtn({
  emoji,
  label,
  onClick,
  disabled = false,
  hot = false,
}: {
  emoji: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  hot?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={
        hot
          ? "flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-fg bg-headline text-4xl shadow-lg disabled:opacity-40"
          : "flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-fg bg-bg text-2xl shadow-lg disabled:opacity-40"
      }
    >
      <span aria-hidden="true">{emoji}</span>
    </button>
  );
}