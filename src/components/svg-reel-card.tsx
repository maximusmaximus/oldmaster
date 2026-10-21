import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShareWork } from "@/components/share-work";
import { SvgIpfsLinks } from "@/components/svg-ipfs-links";
import { SvgReelPlayer } from "@/components/svg-reel-player";
import { EncodeSpin, VideoEncodeWait } from "@/components/video-encode-wait";
import { Button } from "@/components/ui/button";
import { downloadReelVideo, type ReelVideoSize } from "@/lib/svg-4k";
import { downloadSvg, unpackReelFrames } from "@/lib/svg-reel";
import { svgFileSrc, type SvgReelMeta } from "@/lib/svg-reels";
import { fileStem } from "@/lib/mosaic/engine";

export function SvgReelCard({ work }: { work: SvgReelMeta }) {
  const [busy, setBusy] = useState<"svg" | ReelVideoSize | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSvg = async () => {
    setBusy("svg");
    setError(null);
    try {
      const [svgRes, frameRes] = await Promise.all([
        fetch(svgFileSrc(work.id)),
        fetch(`/api/svg-reel?id=${encodeURIComponent(work.id)}&k=frames`).catch(() => null),
      ]);
      if (!svgRes.ok) throw new Error("missing");
      const svg = await svgRes.text();
      let frames;
      if (frameRes && frameRes.ok) {
        try {
          frames = unpackReelFrames(await frameRes.text()).frames;
        } catch {
          frames = undefined;
        }
      }
      downloadSvg(svg, `${fileStem(work.title)}.svg`, frames);
    } catch {
      setError("Could not download that SVG.");
    } finally {
      setBusy(null);
    }
  };

  const onVideo = async (size: ReelVideoSize) => {
    setBusy(size);
    setError(null);
    try {
      const res = await fetch(`/api/svg-reel?id=${encodeURIComponent(work.id)}&k=frames`);
      if (!res.ok) throw new Error("missing");
      const json = await res.text();
      const { frames, fps } = unpackReelFrames(json);
      if (frames.length < 2) throw new Error("short");
      await downloadReelVideo(frames, work.title, fps, size);
    } catch {
      setError(`Could not build ${size.toUpperCase()}. Try again.`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <article className="overflow-hidden rounded-xl bg-surface">
      <div className="relative">
        <SvgReelPlayer id={work.id} title={work.title} />
        {busy === "4k" || busy === "8k" ? <VideoEncodeWait size={busy} compact /> : null}
        <span className="pointer-events-none absolute top-2.5 left-2.5 z-10 rounded-full bg-bg/80 px-2 py-1 text-[10px] font-semibold tracking-wide text-fg uppercase">
          Experimental
        </span>
        <span className="pointer-events-none absolute top-2.5 right-2.5 z-10 rounded-full bg-bg/80 px-2 py-1 text-xs font-medium text-fg">
          📄 SVG
        </span>
      </div>
      <div className="space-y-3 p-3">
        <Link to="/svg/$id" params={{ id: work.id }} className="block min-w-0">
          <h2 className="line-clamp-1 font-sans text-sm font-semibold tracking-tight text-fg">
            {work.title}
          </h2>
          <p className="mt-0.5 text-xs text-muted tabular-nums">
            Experimental · {work.cols} × {work.rows} · {work.frameCount} frames
          </p>
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <ShareWork path={`/svg/${work.id}`} title={work.title} compact />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-11 px-2 text-xs"
            disabled={busy === "svg"}
            onClick={() => void onSvg()}
          >
            {busy === "svg" ? "…" : "SVG"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-11 px-2 text-xs"
            disabled={busy === "4k" || busy === "8k"}
            onClick={() => void onVideo("4k")}
          >
            {busy === "4k" ? (
              <>
                <EncodeSpin className="mr-1" />
                4K
              </>
            ) : (
              "4K"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-11 px-2 text-xs"
            disabled={busy === "4k" || busy === "8k"}
            onClick={() => void onVideo("8k")}
          >
            {busy === "8k" ? (
              <>
                <EncodeSpin className="mr-1" />
                8K
              </>
            ) : (
              "8K"
            )}
          </Button>
          <SvgIpfsLinks pins={work.ipfs} compact />
        </div>
        {error ? <p className="mt-1 text-xs text-headline">{error}</p> : null}
      </div>
    </article>
  );
}
