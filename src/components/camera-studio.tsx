import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { MosaicExport } from "@/components/mosaic-export";
import { OgSharePreview } from "@/components/og-share-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  blobToBase64,
  CLIP_MS,
  DEFAULT_LIVE_DENSITY,
  downloadBlob,
  isDesktopLive,
  isIosLive,
  LIVE_DENSITY_STEPS,
  LIVE_FPS,
  liveDensitySteps,
  liveFpsFor,
  MAX_CLIP_BYTES,
  pickRecorderMime,
  readLiveDensity,
  videoExt,
  writeLiveDensity,
} from "@/lib/camera";
import { publishFanWork } from "@/lib/fan-works";
import type { IpfsPins } from "@/lib/ipfs";
import { notifyAddedToFans } from "@/lib/notify-saved";
import {
  dataUrlToJpeg,
  grabBlobMiddleFrame,
  jpegToDataUrl,
  letterboxOgDataUrl,
} from "@/lib/clip-poster";
import {
  canvasToJpegBase64,
  createLiveRenderer,
  ensurePalette,
  fileStem,
  glyphsToText,
  type MosaicResult,
  type Palette,
} from "@/lib/mosaic/engine";

type Saved = { id: string; url: string; title: string; ipfs?: IpfsPins | null; ogJpeg?: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: (saved: Saved) => void;
};

export function CameraStudio({ open, onClose, onSaved }: Props) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef(createLiveRenderer());
  const paletteRef = useRef<Palette | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const gridRef = useRef<MosaicResult | null>(null);
  const facingRef = useRef<"user" | "environment">("environment");
  const densityRef = useRef(DEFAULT_LIVE_DENSITY);
  const recordingRef = useRef(false);
  const finishingRef = useRef(false);
  const firstJpegRef = useRef<string | null>(null);
  const snapshotsRef = useRef<string[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [density, setDensityState] = useState(DEFAULT_LIVE_DENSITY);
  const [steps, setSteps] = useState<readonly number[]>(LIVE_DENSITY_STEPS);
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const [grid, setGrid] = useState<MosaicResult | null>(null);
  const [recording, setRecording] = useState(false);
  const [remainMs, setRemainMs] = useState(CLIP_MS);
  const [draft, setDraft] = useState<{
    blob: Blob;
    mime: string;
    grid: MosaicResult;
    jpeg: string;
    ogJpeg: string;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [wake, setWake] = useState(0);

  densityRef.current = density;
  facingRef.current = facing;
  recordingRef.current = recording;

  const setDensity = (next: number) => {
    setDensityState(next);
    writeLiveDensity(next);
  };

  useEffect(() => {
    const next = liveDensitySteps();
    setSteps(next);
    setDensityState(readLiveDensity());
  }, []);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startStream = useCallback(async (mode: "user" | "environment") => {
    stopStream();
    const desktop = isDesktopLive();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: desktop
        ? {
            facingMode: { ideal: mode },
            width: { ideal: 640, max: 1280 },
            height: { ideal: 360, max: 720 },
            frameRate: { ideal: 24, max: 30 },
          }
        : {
            facingMode: { ideal: mode },
            frameRate: { ideal: 24, max: 30 },
          },
    });
    streamRef.current = stream;
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();
    }
  }, [stopStream]);

  const resumeLive = useCallback(async () => {
    if (!open) return;
    const stream = streamRef.current;
    const dead =
      !stream || stream.getVideoTracks().every((track) => track.readyState !== "live");
    try {
      if (dead) await startStream(facingRef.current);
      else await videoRef.current?.play();
    } catch {
      try {
        await startStream(facingRef.current);
      } catch {
        setError("Camera paused. Tap 🔄 to wake it.");
      }
    }
    setWake((n) => n + 1);
  }, [open, startStream]);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    setError(null);
    setDraft(null);
    setTitle("");
    setRecording(false);
    setRemainMs(CLIP_MS);
    void (async () => {
      try {
        await startStream(facingRef.current);
      } catch {
        if (alive) setError("Camera permission is needed for a live mosaic.");
      }
    })();
    return () => {
      alive = false;
      stopStream();
    };
  }, [open, startStream, stopStream]);

  useEffect(() => {
    if (!open) return;
    const wakeUp = () => {
      if (document.visibilityState === "hidden") return;
      void resumeLive();
    };
    document.addEventListener("visibilitychange", wakeUp);
    window.addEventListener("focus", wakeUp);
    window.addEventListener("pageshow", wakeUp);
    return () => {
      document.removeEventListener("visibilitychange", wakeUp);
      window.removeEventListener("focus", wakeUp);
      window.removeEventListener("pageshow", wakeUp);
    };
  }, [open, resumeLive]);

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
      const info = liveRef.current.draw({
        canvas,
        video,
        wrapW: wrap.clientWidth || 360,
        wrapH: wrap.clientHeight || 640,
        density: densityRef.current,
        palette,
        capture: false,
      });
      gridRef.current = info;
      setGrid((prev) =>
        prev && prev.cols === info.cols && prev.rows === info.rows ? prev : info,
      );
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [open, wake]);

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

  const finishClip = useCallback(async (blob: Blob, mime: string) => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    recorderRef.current = null;
    recordingRef.current = false;
    const canvas = canvasRef.current;
    let info = gridRef.current;
    const video = videoRef.current;
    const wrap = wrapRef.current;
    const palette = paletteRef.current;
    if (canvas && video && wrap && palette) {
      info = liveRef.current.draw({
        canvas,
        video,
        wrapW: wrap.clientWidth || 360,
        wrapH: wrap.clientHeight || 640,
        density: densityRef.current,
        palette,
        capture: true,
      });
      gridRef.current = info;
    }
    if (!canvas || !info) {
      finishingRef.current = false;
      setRecording(false);
      setError("Nothing to save — try recording again.");
      return;
    }
    try {
      const fromVideo =
        blob.size > 64 ? await grabBlobMiddleFrame(blob) : null;
      const snaps = snapshotsRef.current;
      const midSnap = snaps.length
        ? snaps[Math.floor(snaps.length / 2)]
        : null;
      const raw =
        (fromVideo ? dataUrlToJpeg(fromVideo) : null) ||
        midSnap ||
        firstJpegRef.current ||
        (await canvasToJpegBase64(canvas, isDesktopLive() ? 1200 : 960, 0.8));
      const ogJpeg = await letterboxOgDataUrl(raw).catch(() => jpegToDataUrl(raw));
      setDraft({ blob, mime, grid: info, jpeg: raw, ogJpeg });
    } catch {
      setError("Could not freeze that frame. Try again.");
    }
    setRecording(false);
    setRemainMs(CLIP_MS);
    finishingRef.current = false;
  }, []);

  const stopRecording = useCallback(() => {
    const rec = recorderRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const wrap = wrapRef.current;
    const palette = paletteRef.current;
    if (canvas && video && wrap && palette) {
      gridRef.current = liveRef.current.draw({
        canvas,
        video,
        wrapW: wrap.clientWidth || 360,
        wrapH: wrap.clientHeight || 640,
        density: densityRef.current,
        palette,
        capture: true,
      });
    }
    if (!rec) {
      setRecording(false);
      return;
    }
    try {
      if (rec.state === "recording") rec.requestData();
    } catch {
      /* older browsers */
    }
    try {
      if (rec.state !== "inactive") rec.stop();
    } catch {
      setRecording(false);
    }
    window.setTimeout(() => {
      if (!recordingRef.current) return;
      const mime = rec.mimeType || pickRecorderMime() || "video/webm";
      const blob = new Blob(chunksRef.current, { type: mime });
      if (blob.size > 0) void finishClip(blob, mime);
      else setRecording(false);
    }, 400);
  }, [finishClip]);

  const startRecording = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const wrap = wrapRef.current;
    const palette = paletteRef.current;
    if (!canvas || recordingRef.current || draft) return;
    const mime = pickRecorderMime();
    if (!mime || typeof canvas.captureStream !== "function") {
      setError("This browser can’t record the mosaic. Try a still upload.");
      return;
    }
    if (video && wrap && palette) {
      liveRef.current.draw({
        canvas,
        video,
        wrapW: wrap.clientWidth || 360,
        wrapH: wrap.clientHeight || 640,
        density: densityRef.current,
        palette,
        capture: false,
      });
    }
    let stream: MediaStream;
    try {
      stream = canvas.captureStream(Math.min(LIVE_FPS, liveFpsFor(densityRef.current)));
    } catch {
      setError("This browser can’t record the mosaic. Try a still upload.");
      return;
    }
    let rec: MediaRecorder;
    const bits = isIosLive() || !isDesktopLive() ? 800_000 : 2_000_000;
    try {
      rec = new MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond: bits,
      });
    } catch {
      rec = new MediaRecorder(stream);
    }
    chunksRef.current = [];
    finishingRef.current = false;
    firstJpegRef.current = null;
    snapshotsRef.current = [];
    rec.ondataavailable = (event) => {
      if (event.data.size) chunksRef.current.push(event.data);
    };
    rec.onerror = () => {
      setError("Recording failed. Try a shorter clip or a still.");
      setRecording(false);
      recordingRef.current = false;
    };
    rec.onstop = () => {
      const type = rec.mimeType || mime;
      const blob = new Blob(chunksRef.current, { type });
      if (blob.size > 0) void finishClip(blob, type);
      else {
        const empty = new Blob([new Uint8Array([0])], { type });
        void finishClip(empty, type);
      }
    };
    recorderRef.current = rec;
    recordingRef.current = true;
    try {
      if (isIosLive()) rec.start();
      else rec.start(200);
    } catch {
      try {
        rec.start();
      } catch {
        setError("Could not start recording.");
        recordingRef.current = false;
        return;
      }
    }
    setRecording(true);
    setRemainMs(CLIP_MS);
    window.setTimeout(() => {
      const frame = canvasRef.current;
      if (!frame || !recordingRef.current) return;
      void canvasToJpegBase64(frame, 1200, 0.88).then((jpeg) => {
        if (recordingRef.current) firstJpegRef.current = jpeg;
      });
    }, 180);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const shell = shellRef.current;
    const goFull = () => {
      const el = shell as HTMLElement & { webkitRequestFullscreen?: () => void };
      if (!el) return;
      const req = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
      if (req) void Promise.resolve(req()).catch(() => undefined);
    };
    goFull();
    const applyView = () => {
      const vv = window.visualViewport;
      if (!shell) return;
      if (vv) {
        shell.style.top = `${vv.offsetTop}px`;
        shell.style.left = `${vv.offsetLeft}px`;
        shell.style.width = `${vv.width}px`;
        shell.style.height = `${vv.height}px`;
      } else {
        shell.style.top = "0";
        shell.style.left = "0";
        shell.style.width = "100%";
        shell.style.height = "100dvh";
      }
      setWake((n) => n + 1);
    };
    applyView();
    window.visualViewport?.addEventListener("resize", applyView);
    window.visualViewport?.addEventListener("scroll", applyView);
    window.addEventListener("orientationchange", applyView);
    window.addEventListener("resize", applyView);
    return () => {
      document.body.style.overflow = prev;
      window.visualViewport?.removeEventListener("resize", applyView);
      window.visualViewport?.removeEventListener("scroll", applyView);
      window.removeEventListener("orientationchange", applyView);
      window.removeEventListener("resize", applyView);
      const doc = document as Document & { webkitExitFullscreen?: () => void };
      try {
        if (document.fullscreenElement) void document.exitFullscreen();
        else doc.webkitExitFullscreen?.();
      } catch {
        /* ignore */
      }
    };
  }, [open]);

  useEffect(() => {
    if (!draft) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") discardDraft();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [draft]);

  useEffect(() => {
    if (!recording) return;
    const started = performance.now();
    const id = window.setInterval(() => {
      const left = Math.max(0, CLIP_MS - (performance.now() - started));
      setRemainMs(left);
      if (left <= 0) stopRecording();
    }, 100);
    const snap = window.setInterval(() => {
      const frame = canvasRef.current;
      if (!frame || !recordingRef.current) return;
      void canvasToJpegBase64(frame, 960, 0.8).then((jpeg) => {
        if (recordingRef.current) snapshotsRef.current.push(jpeg);
      });
    }, 450);
    return () => {
      window.clearInterval(id);
      window.clearInterval(snap);
    };
  }, [recording, stopRecording]);

  const discardDraft = () => {
    setDraft(null);
    setTitle("");
    setSaving(false);
  };

  const closeAll = () => {
    if (recording) stopRecording();
    discardDraft();
    onClose();
  };

  const goFans = () => {
    closeAll();
    void navigate({ to: "/", search: { view: "fans" } });
  };

  const saveClip = async () => {
    if (!draft || saving) return;
    setSaving(true);
    setError(null);
    const emojiText =
      draft.grid.glyphs.length > 0
        ? glyphsToText(draft.grid.glyphs, draft.grid.cols)
        : "🎞️";
    const payload = {
      title: title.trim() || undefined,
      cols: Math.min(256, Math.max(2, draft.grid.cols)),
      rows: Math.min(256, Math.max(2, draft.grid.rows)),
      emojiText,
      imageJpeg: dataUrlToJpeg(draft.jpeg),
    };
    const tryPublish = async (withVideo: boolean) => {
      let videoBase64: string | undefined;
      if (withVideo && draft.blob.size > 64 && draft.blob.size <= MAX_CLIP_BYTES) {
        videoBase64 = await blobToBase64(draft.blob);
        if (videoBase64.length > 3_200_000) videoBase64 = undefined;
      }
      return publishFanWork({
        data: {
          ...payload,
          kind: videoBase64 ? "clip" : "still",
          videoBase64,
          videoMime: videoBase64 ? draft.mime : undefined,
        },
      });
    };
    try {
      let result;
      try {
        result = await tryPublish(true);
      } catch {
        result = await tryPublish(false);
      }
      const savedTitle = title.trim() || "Emoji New Master";
      const ogJpeg = draft.ogJpeg;
      discardDraft();
      void fetch(`/api/og-preview?p=/fan/${result.id}&v=3`).catch(() => undefined);
      notifyAddedToFans(savedTitle);
      onSaved({
        id: result.id,
        url: `${window.location.origin}/fan/${result.id}`,
        title: savedTitle,
        ipfs: result.pinata,
        ogJpeg,
      });
      onClose();
      void navigate({ to: "/fan/$id", params: { id: result.id } });
    } catch {
      setError("Could not save that clip. Try again, or download it.");
      setSaving(false);
    }
  };

  if (!open) return null;

  const secs = Math.ceil(remainMs / 1000);
  const at = Math.max(0, steps.findIndex((step) => step === density));
  const canCoarser = at > 0 && !recording && !draft;
  const canFiner = at < steps.length - 1 && !recording && !draft;

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 z-50 h-[100dvh] w-full bg-bg"
    >
      <video ref={videoRef} className="hidden" playsInline muted autoPlay />

      <div ref={wrapRef} className="absolute inset-0 overflow-hidden bg-bg">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 size-full object-cover"
          aria-label="Live emoji mosaic from camera"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="pointer-events-auto absolute top-[max(0.5rem,env(safe-area-inset-top))] left-[max(0.5rem,env(safe-area-inset-left))] landscape:hidden">
          <CamEmojiBtn emoji="❌" label="Close camera" onClick={closeAll} />
        </div>
        <div className="pointer-events-auto absolute top-[max(0.5rem,env(safe-area-inset-top))] right-[max(0.5rem,env(safe-area-inset-right))] landscape:hidden">
          <CamEmojiBtn
            emoji="🔄"
            label="Switch camera"
            onClick={() => void flipCamera()}
            disabled={recording}
          />
        </div>

        <div className="pointer-events-none absolute top-[max(0.5rem,env(safe-area-inset-top))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <p className="rounded-full bg-bg/80 px-3 py-1 text-xs font-bold text-fg tabular-nums">
            {recording
              ? `🔴 0:${String(secs).padStart(2, "0")}`
              : grid?.cols && grid.rows
                ? `${grid.cols} × ${grid.rows}`
                : "12s reel"}
          </p>
          <button
            type="button"
            onClick={goFans}
            className="pointer-events-auto rounded-full bg-bg/80 px-3 py-1 text-xs font-bold text-fg"
          >
            🖼️ Fans
          </button>
        </div>

        <div className="pointer-events-auto absolute top-[max(0.4rem,env(safe-area-inset-top))] bottom-[max(0.4rem,env(safe-area-inset-bottom))] left-[max(0.4rem,env(safe-area-inset-left))] hidden flex-col items-center justify-between landscape:flex">
          <CamEmojiBtn emoji="❌" label="Close camera" onClick={closeAll} />
          <div className="flex flex-col gap-2">
            <CamEmojiBtn
              emoji="➖"
              label="Fewer emoji"
              onClick={() => setDensity(steps[Math.max(0, at - 1)]!)}
              disabled={!canCoarser}
            />
            <CamEmojiBtn
              emoji="➕"
              label="More emoji"
              onClick={() =>
                setDensity(
                  steps[Math.min(steps.length - 1, at + 1)]!,
                )
              }
              disabled={!canFiner}
            />
          </div>
        </div>

        <div className="pointer-events-auto absolute top-[max(0.4rem,env(safe-area-inset-top))] bottom-[max(0.4rem,env(safe-area-inset-bottom))] right-[max(0.4rem,env(safe-area-inset-right))] hidden flex-col items-center justify-between landscape:flex">
          <CamEmojiBtn
            emoji="🔄"
            label="Switch camera"
            onClick={() => void flipCamera()}
            disabled={recording}
          />
          <CamEmojiBtn
            emoji={recording ? "⏹️" : "🔴"}
            label={recording ? "Stop recording" : "Record"}
            onClick={() => (recording ? stopRecording() : startRecording())}
            hot
          />
        </div>

        <div className="pointer-events-auto absolute inset-x-0 bottom-0 bg-bg/80 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] landscape:hidden">
          <div className="mx-auto flex max-w-lg items-end justify-between gap-3">
            <CamEmojiBtn
              emoji="➖"
              label="Fewer emoji"
              onClick={() => setDensity(steps[Math.max(0, at - 1)]!)}
              disabled={!canCoarser}
            />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <CamEmojiBtn
                emoji={recording ? "⏹️" : "🔴"}
                label={recording ? "Stop recording" : "Record"}
                onClick={() => (recording ? stopRecording() : startRecording())}
                hot
              />
              <p className="text-center text-xs font-semibold text-fg">
                {recording ? "tap ⏹️ anytime to stop" : "tap 🔴 · stop whenever · max 12s"}
              </p>
            </div>
            <CamEmojiBtn
              emoji="➕"
              label="More emoji"
              onClick={() =>
                setDensity(
                  steps[Math.min(steps.length - 1, at + 1)]!,
                )
              }
              disabled={!canFiner}
            />
          </div>
          {error && (
            <p className="mt-2 text-center text-sm font-medium text-headline">{error}</p>
          )}
        </div>

        {error && (
          <p className="pointer-events-none absolute bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-1/2 hidden -translate-x-1/2 rounded-full bg-bg/80 px-3 py-1 text-sm font-medium text-headline landscape:block">
            {error}
          </p>
        )}
      </div>

      {draft ? (
        <div
          className="absolute inset-0 z-20 flex items-end justify-center bg-bg/80 p-4 sm:items-center"
          onClick={discardDraft}
        >
          <div
            role="dialog"
            aria-labelledby="clip-title-label"
            className="max-h-[90dvh] w-full max-w-md overflow-auto rounded-xl border border-border bg-surface p-5 landscape:max-h-[86dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="clip-title-label" className="font-sans text-xl font-bold text-headline">
              Title this clip
            </h2>
            <p className="mt-2 text-sm text-muted">
              Save it to Fans, or download. Tap outside to throw it away.
            </p>
            <OgSharePreview
              readySrc={draft.ogJpeg}
              jpeg={draft.jpeg}
              className="mt-4"
            />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              placeholder="Emoji New Master"
              className="mt-4"
              autoFocus
            />
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-fg">Download</p>
              <MosaicExport
                name={title.trim() || "emoji-clip"}
                grid={draft.grid}
                jpegUrl={`data:image/jpeg;base64,${draft.jpeg}`}
                cover
              />
              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full"
                onClick={() =>
                  downloadBlob(
                    draft.blob,
                    `${fileStem(title.trim() || "emoji-clip")}.${videoExt(draft.mime)}`,
                  )
                }
              >
                Download video
              </Button>
            </div>
            <Button
              type="button"
              variant="buy"
              className="mt-4 w-full"
              onClick={() => void saveClip()}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save to Fans"}
            </Button>
            {error && (
              <p className="mt-3 text-center text-sm font-medium text-headline">{error}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CamEmojiBtn({
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
          ? "flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-fg bg-headline text-4xl shadow-lg disabled:opacity-40 sm:size-24 sm:text-5xl landscape:size-16 landscape:border-2 landscape:text-3xl"
          : "flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-fg bg-bg text-2xl shadow-lg disabled:opacity-40 sm:size-16 sm:text-3xl landscape:size-12 landscape:text-xl"
      }
    >
      <span aria-hidden="true">{emoji}</span>
    </button>
  );
}
