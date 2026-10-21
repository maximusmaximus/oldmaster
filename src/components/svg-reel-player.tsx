import { useCallback, useEffect, useRef, useState } from "react";
import { EMOJI_FONT } from "@/lib/mosaic/palette";
import { cn } from "@/lib/utils";
import {
  letterboxReelFrame,
  loadReelFrames,
  SVG_FPS,
  type SvgReelFrame,
} from "@/lib/svg-reel";
import { svgPosterSrc } from "@/lib/svg-reels";

type Props = {
  title: string;
  id?: string;
  frames?: SvgReelFrame[];
  fps?: number;
  autoPlay?: boolean;
  className?: string;
};

export function SvgReelPlayer({
  title,
  id,
  frames: given,
  fps: givenFps,
  autoPlay = false,
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<SvgReelFrame[]>(given ?? []);
  const fpsRef = useRef(givenFps || SVG_FPS);
  const indexRef = useRef(0);
  const [ready, setReady] = useState(Boolean(given && given.length));
  const [playing, setPlaying] = useState(autoPlay);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const paint = useCallback((frame: SvgReelFrame) => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const css = Math.max(160, wrap.clientWidth || 320);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const px = Math.max(160, Math.round(css * dpr));
    letterboxReelFrame(canvas, frame, px, px);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
  }, []);

  useEffect(() => {
    framesRef.current = given ?? framesRef.current;
    if (givenFps) fpsRef.current = givenFps;
    if (given && given.length) {
      setReady(true);
      setError(false);
      void document.fonts.load(`24px ${EMOJI_FONT}`).finally(() => {
        paint(given[0]!);
      });
    }
  }, [given, givenFps, paint]);

  useEffect(() => {
    if (given?.length || !id) return;
    let live = true;
    void loadReelFrames(id)
      .then(async (pack) => {
        if (!live) return;
        try {
          await document.fonts.load(`24px ${EMOJI_FONT}`);
        } catch {
          /* system emoji still paints */
        }
        framesRef.current = pack.frames;
        fpsRef.current = pack.fps || SVG_FPS;
        const start = autoPlay ? 0 : Math.floor(pack.frames.length / 2);
        indexRef.current = start;
        setReady(true);
        const frame = pack.frames[start] ?? pack.frames[0];
        if (frame) paint(frame);
      })
      .catch(() => {
        if (live) setError(true);
      });
    return () => {
      live = false;
    };
  }, [given, id, paint, autoPlay, attempt]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => {
      const list = framesRef.current;
      const frame = list[indexRef.current] ?? list[0];
      if (frame) paint(frame);
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [paint]);

  useEffect(() => {
    if (!playing || !ready) return;
    const frames = framesRef.current;
    if (frames.length < 2) return;
    const step = 1000 / Math.max(1, fpsRef.current);
    const idTimer = window.setInterval(() => {
      indexRef.current = (indexRef.current + 1) % frames.length;
      const frame = frames[indexRef.current];
      if (frame) paint(frame);
    }, step);
    return () => window.clearInterval(idTimer);
  }, [playing, ready, paint]);

  const toggle = () => {
    if (error && id) {
      setError(false);
      setAttempt((n) => n + 1);
    }
    setPlaying((on) => !on);
  };

  return (
    <div ref={wrapRef} className={cn("relative aspect-square overflow-hidden bg-bg", className)}>
      {id && !ready ? (
        <img src={svgPosterSrc(id)} alt={title} className="absolute inset-0 size-full object-cover" />
      ) : null}
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 size-full", ready ? "opacity-100" : "opacity-0")}
        aria-label={title}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause emoji reel" : "Play emoji reel"}
        className={cn(
          "absolute top-1/2 left-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fg bg-bg/80 text-2xl text-fg shadow-lg transition-opacity duration-150 sm:size-[4.5rem] sm:text-3xl",
          playing ? "opacity-0 hover:opacity-100 focus-visible:opacity-100" : "opacity-100",
        )}
      >
        <span aria-hidden="true">{playing ? "⏸️" : "▶️"}</span>
      </button>
      {error ? (
        <p className="absolute inset-x-2 bottom-2 z-10 text-center text-xs text-headline">
          Still catching up — tap play again.
        </p>
      ) : null}
    </div>
  );
}
