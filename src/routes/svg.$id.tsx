import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ShareWork } from "@/components/share-work";
import { SvgIpfsLinks } from "@/components/svg-ipfs-links";
import { SvgReelPlayer } from "@/components/svg-reel-player";
import { EncodeSpin, VideoEncodeWait } from "@/components/video-encode-wait";
import { Button } from "@/components/ui/button";
import { fileStem } from "@/lib/mosaic/engine";
import { artworkHead, pageOrigin } from "@/lib/share-meta";
import { downloadReelVideo, type ReelVideoSize } from "@/lib/svg-4k";
import { downloadSvg, unpackReelFrames } from "@/lib/svg-reel";
import {
  getSvgReel,
  SVG_ID_RE,
  svgFileSrc,
} from "@/lib/svg-reels";

export const Route = createFileRoute("/svg/$id")({
  loader: async ({ params }) => {
    if (!SVG_ID_RE.test(params.id)) throw notFound();
    const work = await getSvgReel({ data: { id: params.id } });
    if (!work) throw notFound();
    return work;
  },
  head: async ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "SVG reel — EMOJI OLD MASTERS" }] };
    }
    const origin = await pageOrigin();
    return artworkHead(
      {
        title: loaderData.title,
        description: `${loaderData.title} — experimental emoji SVG reel, ${loaderData.cols} × ${loaderData.rows}, ${loaderData.frameCount} frames.`,
        path: `/svg/${loaderData.id}`,
        imagePath: `/api/og-preview?p=${encodeURIComponent(`/svg/${loaderData.id}`)}`,
      },
      origin,
    );
  },
  component: SvgReelView,
});

function SvgReelView() {
  const work = Route.useLoaderData();
  const [busy, setBusy] = useState<"svg" | ReelVideoSize | null>(null);
  const [error, setError] = useState<string | null>(null);
  const seedFrames = work.framesJson ? unpackReelFrames(work.framesJson).frames : undefined;

  const onSvg = async () => {
    setBusy("svg");
    setError(null);
    try {
      const svg = work.svg ?? (await (await fetch(svgFileSrc(work.id))).text());
      let frames = work.framesJson ? unpackReelFrames(work.framesJson).frames : undefined;
      if (!frames) {
        try {
          const json = await (await fetch(`/api/svg-reel?id=${encodeURIComponent(work.id)}&k=frames`)).text();
          frames = unpackReelFrames(json).frames;
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
      const json =
        work.framesJson ??
        (await (await fetch(`/api/svg-reel?id=${encodeURIComponent(work.id)}&k=frames`)).text());
      const { frames, fps } = unpackReelFrames(json);
      await downloadReelVideo(frames, work.title, fps, size);
    } catch {
      setError(`Could not build ${size.toUpperCase()} video.`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6">
      <Link
        to="/"
        search={{ view: "fans" }}
        className="inline-flex h-11 items-center gap-2 text-sm text-muted transition-[color] duration-150 hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Gallery (Fans)
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:items-start">
        <div className="overflow-hidden rounded-xl bg-surface p-1.5">
          <div className="relative overflow-hidden rounded-lg bg-surface-2">
            <SvgReelPlayer
              id={work.id}
              title={work.title}
              frames={seedFrames}
              fps={work.fps}
              autoPlay
              className="aspect-square w-full"
            />
            {busy === "4k" || busy === "8k" ? <VideoEncodeWait size={busy} /> : null}
          </div>
        </div>

        <aside className="lg:sticky lg:top-20">
          <p className="text-sm font-semibold tracking-wide text-muted uppercase">
            Experimental · SVG reel
          </p>
          <h1 className="mt-2 font-sans text-3xl font-bold tracking-tight text-headline">
            {work.title}
          </h1>
          <p className="mt-2 text-sm text-subtle tabular-nums">
            {work.cols} × {work.rows} · {work.frameCount} frames
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <ShareWork path={`/svg/${work.id}`} title={work.title} />
            <Button type="button" variant="outline" disabled={busy === "svg"} onClick={() => void onSvg()}>
              {busy === "svg" ? "Downloading…" : "Download SVG"}
            </Button>
            <Button type="button" variant="outline" disabled={busy === "4k" || busy === "8k"} onClick={() => void onVideo("4k")}>
              {busy === "4k" ? (
                <span className="inline-flex items-center gap-2">
                  <EncodeSpin /> Building 4K…
                </span>
              ) : (
                "Download 4K video"
              )}
            </Button>
            <Button type="button" variant="outline" disabled={busy === "4k" || busy === "8k"} onClick={() => void onVideo("8k")}>
              {busy === "8k" ? (
                <span className="inline-flex items-center gap-2">
                  <EncodeSpin /> Building 8K…
                </span>
              ) : (
                "Download 8K video"
              )}
            </Button>
            {work.ipfs ? <SvgIpfsLinks pins={work.ipfs} /> : null}
            {error ? <p className="text-sm text-headline">{error}</p> : null}
          </div>
        </aside>
      </div>
    </main>
  );
}