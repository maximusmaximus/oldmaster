import { Check, Copy, ExternalLink } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ensureFanPinned } from "@/lib/fan-works";
import {
  hasPins,
  ipfsGatewayUrl,
  ipfsOpenUrl,
  ipfsUri,
  mediaCid,
  primaryCid,
  type IpfsPins,
} from "@/lib/ipfs";
import { copyText } from "@/lib/mosaic/engine";
import { cn } from "@/lib/utils";

export function IpfsOpenButton({
  pins,
  compact = false,
}: {
  pins: IpfsPins;
  compact?: boolean;
}) {
  const cid = primaryCid(pins);
  if (!cid) return null;
  return (
    <Button
      asChild
      variant="outline"
      size={compact ? "sm" : "default"}
      className={compact ? "h-11 flex-1 px-2 text-xs" : undefined}
    >
      <a href={ipfsOpenUrl(cid)} target="_blank" rel="noreferrer">
        <ExternalLink className="size-4" />
        {compact ? "IPFS" : "Open IPFS"}
      </a>
    </Button>
  );
}

export function IpfsBadge({ pins }: { pins: IpfsPins }) {
  const cid = primaryCid(pins);
  if (!cid) return null;
  return (
    <span
      title="Pinned on IPFS"
      className="absolute top-2.5 left-2.5 z-10 rounded-full bg-bg/80 px-2 py-1 text-xs font-medium text-fg"
    >
      📌 IPFS
    </span>
  );
}

const PIN_LINKS: { key: keyof IpfsPins; emoji: string; label: string }[] = [
  { key: "jpegCid", emoji: "🖼️", label: "Cover" },
  { key: "videoCid", emoji: "🎬", label: "Clip" },
  { key: "svgCid", emoji: "📄", label: "SVG" },
  { key: "emojiCid", emoji: "🧬", label: "Emoji" },
  { key: "framesCid", emoji: "🎞️", label: "Frames" },
];

export function PinataLinks({
  pins,
  compact = false,
  showUrl = true,
}: {
  pins?: IpfsPins | null;
  compact?: boolean;
  showUrl?: boolean;
}) {
  const [copied, setCopied] = useState<keyof IpfsPins | null>(null);
  if (!pins) return null;
  const items = PIN_LINKS.filter((item) => pins[item.key]);
  if (!items.length) return null;

  const copyGateway = async (key: keyof IpfsPins, cid: string) => {
    const ok = await copyText(ipfsGatewayUrl(cid));
    if (!ok) return;
    setCopied(key);
    window.setTimeout(() => setCopied((cur) => (cur === key ? null : cur)), 1600);
  };

  return (
    <ul className={cn("space-y-1.5", compact && "space-y-1")}>
      {items.map((item) => {
        const cid = pins[item.key];
        if (!cid) return null;
        const url = ipfsGatewayUrl(cid);
        const done = copied === item.key;
        return (
          <li key={item.key}>
            <button
              type="button"
              title={done ? `Copied ${item.label} gateway` : `Copy ${item.label} Pinata gateway`}
              aria-label={done ? `Copied ${item.label} gateway` : `Copy ${item.label} Pinata gateway`}
              onClick={() => void copyGateway(item.key, cid)}
              className={cn(
                "flex w-full min-w-0 items-center gap-2 rounded-md border border-border bg-surface-2 px-2 text-left",
                compact ? "min-h-9 py-1" : "min-h-11 py-1.5",
              )}
            >
              <span aria-hidden="true" className={compact ? "text-base" : "text-xl"}>
                {done ? "✅" : item.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-fg">
                  {done ? "Copied gateway" : `${item.emoji} ${item.label}`}
                </span>
                {showUrl ? (
                  <>
                    <span className="block break-all font-mono text-[10px] text-fg">
                      {cid}
                    </span>
                    <span className="block break-all font-mono text-[10px] text-subtle">
                      {url}
                    </span>
                  </>
                ) : (
                  <span className="block break-all font-mono text-[10px] text-fg">{cid}</span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function IpfsCopy({ pins }: { pins: IpfsPins }) {
  const cid = primaryCid(pins);
  const [copied, setCopied] = useState<"ipfs" | "gateway" | null>(null);

  const copy = async (kind: "ipfs" | "gateway", value: string) => {
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-fg">Pinata gateway</p>
      <PinataLinks pins={pins} />
      {cid ? (
        <div className={cn("flex flex-wrap gap-2")}>
          <IpfsOpenButton pins={pins} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void copy("ipfs", ipfsUri(cid))}
          >
            {copied === "ipfs" ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied === "ipfs" ? "Copied" : "Copy IPFS"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void copy("gateway", ipfsGatewayUrl(cid))}
          >
            {copied === "gateway" ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied === "gateway" ? "Copied" : "Copy gateway"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function FanIpfsInfo({
  pins,
  kind,
  extra,
  workId,
}: {
  pins?: IpfsPins | null;
  kind?: string;
  extra?: ReactNode;
  workId?: string;
}) {
  const [live, setLive] = useState<IpfsPins | null>(hasPins(pins) ? pins : null);
  const [phase, setPhase] = useState<"ready" | "pinning" | "missing">(
    hasPins(pins) ? "ready" : workId ? "pinning" : "missing",
  );

  useEffect(() => {
    if (hasPins(pins)) {
      setLive(pins);
      setPhase("ready");
      return;
    }
    if (!workId) {
      setPhase("missing");
      return;
    }
    let stop = false;
    setPhase("pinning");
    void ensureFanPinned({ data: { id: workId } })
      .then((next) => {
        if (stop) return;
        if (hasPins(next)) {
          setLive(next);
          setPhase("ready");
        } else {
          setPhase("missing");
        }
      })
      .catch(() => {
        if (!stop) setPhase("missing");
      });
    return () => {
      stop = true;
    };
  }, [workId, pins?.jpegCid, pins?.emojiCid, pins?.videoCid]);

  const cid = live ? mediaCid(live) : "";
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
        IPFS
      </p>
      {phase === "pinning" ? (
        <p className="text-[11px] text-muted">📌 Pinning…</p>
      ) : cid ? (
        <p className="break-all font-mono text-[11px] leading-snug text-fg">
          <span className="mr-1" aria-hidden="true">
            {kind === "clip" ? "🎬" : "🖼️"}
          </span>
          {cid}
        </p>
      ) : (
        <p className="text-[11px] text-subtle">📌 Pinning…</p>
      )}
      {live ? <PinataLinks pins={live} compact /> : null}
      {extra ? (
        <details>
          <summary className="cursor-pointer text-xs font-medium text-muted">More info</summary>
          <div className="mt-2 space-y-2">{extra}</div>
        </details>
      ) : null}
    </div>
  );
}