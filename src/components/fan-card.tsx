import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ClipPreview } from "@/components/clip-preview";
import { FanIpfsInfo, IpfsBadge } from "@/components/ipfs-copy";
import { ShareWork } from "@/components/share-work";
import { Button } from "@/components/ui/button";
import type { FanWorkMeta } from "@/lib/fan-works";
import { fanImageSrc, getFanWork } from "@/lib/fan-works";
import {
  downloadJpeg,
  downloadText,
  fileStem,
  mosaicToSvg,
  parseEmojiGrid,
} from "@/lib/mosaic/engine";
import { cn } from "@/lib/utils";

export function FanCard({
  work,
  admin = false,
  onHide,
}: {
  work: FanWorkMeta;
  admin?: boolean;
  onHide?: (id: string, hidden: boolean) => void;
}) {
  const [busy, setBusy] = useState<"jpg" | "svg" | null>(null);
  const stem = fileStem(work.title);
  const pins = work.ipfs || work.pins;
  const when = work.createdAt
    ? new Date(work.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const onJpg = async () => {
    setBusy("jpg");
    try {
      const res = await fetch(fanImageSrc(work.id));
      if (!res.ok) return;
      const blob = await res.blob();
      const buf = new Uint8Array(await blob.arrayBuffer());
      let bin = "";
      for (let i = 0; i < buf.length; i += 0x8000) {
        bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      }
      downloadJpeg(btoa(bin), `${stem}.jpg`);
    } finally {
      setBusy(null);
    }
  };

  const onSvgCover = async () => {
    setBusy("svg");
    try {
      const full = await getFanWork({ data: { id: work.id } });
      if (!full?.emojiText) return;
      const parsed = parseEmojiGrid(full.emojiText);
      downloadText(
        mosaicToSvg(parsed.glyphs, parsed.cols, parsed.rows),
        `${stem}-cover.svg`,
        "image/svg+xml;charset=utf-8",
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <article
      className={cn("overflow-hidden rounded-xl bg-surface", work.hidden && "opacity-50")}
    >
      <Link
        to="/fan/$id"
        params={{ id: work.id }}
        className="relative block aspect-square overflow-hidden bg-surface-2"
      >
        {work.kind === "clip" ? (
          <ClipPreview id={work.id} title={work.title} />
        ) : (
          <img
            src={fanImageSrc(work.id)}
            alt={work.title}
            className="h-full w-full object-cover"
          />
        )}
        {work.kind === "clip" ? (
          <span className="pointer-events-none absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fg bg-bg/80 text-2xl text-fg">
            ▶️
          </span>
        ) : null}
        {work.kind === "clip" ? (
          <span className="absolute top-2.5 right-2.5 rounded-full bg-bg/80 px-2 py-1 text-xs font-medium text-fg">
            ▶ clip
          </span>
        ) : null}
        {pins ? <IpfsBadge pins={pins} /> : null}
      </Link>

      <div className="space-y-3 p-3">
        <Link to="/fan/$id" params={{ id: work.id }} className="block min-w-0">
          <h2 className="line-clamp-2 font-sans text-sm font-semibold tracking-tight text-fg">
            {work.title}
            {work.hidden ? " · hidden" : ""}
          </h2>
          <p className="mt-1 text-xs text-muted">
            <span className="tabular-nums">
              {work.cols && work.rows ? `${work.cols} × ${work.rows}` : "Fan work"}
            </span>
            <span className="text-subtle">
              {" "}
              · {work.kind === "clip" ? "clip" : "still"}
              {when ? ` · ${when}` : ""}
            </span>
          </p>
        </Link>

        <ShareWork path={`/fan/${work.id}`} title={work.title} compact />

        <div className="flex flex-wrap gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-11 flex-1 px-2 text-xs"
            disabled={busy === "jpg"}
            onClick={() => void onJpg()}
          >
            {busy === "jpg" ? "…" : work.kind === "clip" ? "JPG cover" : "JPG"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-11 flex-1 px-2 text-xs"
            disabled={busy === "svg"}
            onClick={() => void onSvgCover()}
          >
            {busy === "svg" ? "…" : work.kind === "clip" ? "SVG cover" : "SVG"}
          </Button>
        </div>

        <FanIpfsInfo
          pins={pins}
          kind={work.kind}
          workId={work.id}
          extra={
            <p className="break-all text-[11px] text-muted">
              {work.id}
              {when ? ` · ${when}` : ""}
            </p>
          }
        />

        {admin && onHide ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-full"
            onClick={() => onHide(work.id, !work.hidden)}
          >
            {work.hidden ? "Unhide" : "Hide"}
          </Button>
        ) : null}
      </div>
    </article>
  );
}