import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { ClipPlayer } from "@/components/clip-player";
import { Button } from "@/components/ui/button";
import { FanIpfsInfo, IpfsBadge } from "@/components/ipfs-copy";
import { MosaicExport } from "@/components/mosaic-export";
import { ShareWork } from "@/components/share-work";
import { SuggestedFans } from "@/components/suggested-works";
import { adminStatus } from "@/lib/admin";
import { artworkHead, pageOrigin } from "@/lib/share-meta";
import { grabClipMiddleFrame } from "@/lib/clip-poster";
import {
  FAN_ID_RE,
  fanImageSrc,
  fanVideoSrc,
  getFanWork,
  setFanHidden,
} from "@/lib/fan-works";

export const Route = createFileRoute("/fan/$id")({
  loader: async ({ params }) => {
    if (!FAN_ID_RE.test(params.id)) throw notFound();
    const work = await getFanWork({ data: { id: params.id } });
    if (!work) throw notFound();
    return work;
  },
  head: async ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Emoji New Master" }] };
    }
    const origin = await pageOrigin();
    const kind = loaderData.kind === "clip" ? "emoji video" : "emoji mosaic";
    return artworkHead(
      {
        title: loaderData.title,
        description: `${loaderData.title} — ${loaderData.cols} × ${loaderData.rows} ${kind}. Make your own Emoji New Master.`,
        path: `/fan/${loaderData.id}`,
        imagePath: `/api/og-preview?p=${encodeURIComponent(`/fan/${loaderData.id}`)}`,
      },
      origin,
    );
  },
  component: FanView,
});

function FanView() {
  const work = Route.useLoaderData();
  const router = useRouter();
  const src = fanImageSrc(work.id);
  const clip = work.kind === "clip" ? fanVideoSrc(work.id) : null;
  const [admin, setAdmin] = useState(false);
  const [hidden, setHidden] = useState(Boolean(work.hidden));
  const [hiding, setHiding] = useState(false);

  const [poster, setPoster] = useState(src);

  useEffect(() => {
    void adminStatus().then((status) => setAdmin(status.admin));
  }, []);

  useEffect(() => {
    if (!clip) return;
    let live = true;
    void grabClipMiddleFrame(work.id).then((url) => {
      if (live && url) setPoster(url);
    });
    return () => {
      live = false;
    };
  }, [clip, work.id]);

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
            {clip ? (
              <ClipPlayer src={clip} poster={poster} title={work.title} />
            ) : (
              <img src={src} alt={work.title} className="block w-full" />
            )}
            {work.ipfs ? <IpfsBadge pins={work.ipfs} /> : null}
          </div>
          {work.ipfs ? (
            <p className="mt-2 break-all px-1 font-mono text-[11px] text-subtle">
              {work.kind === "clip" ? "🎬 " : "🖼️ "}
              {work.ipfs.videoCid || work.ipfs.jpegCid || work.ipfs.emojiCid}
            </p>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-20">
          <p className="text-sm font-semibold tracking-wide text-muted uppercase">
            {work.kind === "clip" ? "Fan clip" : "Fan work"}
            {hidden ? " · hidden" : ""}
          </p>
          <h1 className="mt-2 font-sans text-3xl font-bold tracking-tight text-headline">
            {work.title}
          </h1>
          <p className="mt-2 text-sm text-subtle tabular-nums">
            {work.cols} × {work.rows} emoji
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <ShareWork path={`/fan/${work.id}`} title={work.title} />
            <FanIpfsInfo
              pins={work.ipfs}
              kind={work.kind}
              workId={work.id}
              extra={
                <p className="text-xs text-muted">
                  {work.id} · {work.cols} × {work.rows}
                  {work.kind === "clip" ? " · clip" : " · still"}
                </p>
              }
            />
            {admin ? (
              <Button
                type="button"
                variant="outline"
                disabled={hiding}
                onClick={() => {
                  setHiding(true);
                  void setFanHidden({ data: { id: work.id, hidden: !hidden } })
                    .then(() => {
                      setHidden(!hidden);
                      void router.invalidate();
                    })
                    .finally(() => setHiding(false));
                }}
              >
                {hidden ? "Unhide this work" : "Hide this work"}
              </Button>
            ) : null}
            <MosaicExport
              name={work.title}
              emojiText={work.emojiText}
              jpegUrl={src}
              cover={work.kind === "clip"}
            />
          </div>

          {work.emojiText ? (
            <details className="mt-8">
              <summary className="cursor-pointer text-sm font-medium text-fg">
                Emoji text
              </summary>
              <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-surface-2 p-3 text-[8px] leading-none break-all whitespace-pre">
                {work.emojiText}
              </pre>
            </details>
          ) : null}
        </aside>
      </div>

      <SuggestedFans exclude={work.id} />
    </main>
  );
}
