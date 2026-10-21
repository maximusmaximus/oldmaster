import { useState } from "react";
import { ipfsGatewayUrl, type IpfsPins } from "@/lib/ipfs";
import { copyText } from "@/lib/mosaic/engine";
import { cn } from "@/lib/utils";

const LINKS: { key: keyof IpfsPins; emoji: string; label: string }[] = [
  { key: "svgCid", emoji: "📄", label: "SVG" },
  { key: "emojiCid", emoji: "🧬", label: "Emoji text" },
  { key: "jpegCid", emoji: "🖼️", label: "Poster" },
  { key: "framesCid", emoji: "🎞️", label: "Frames" },
];

export function SvgIpfsLinks({
  pins,
  compact = false,
}: {
  pins?: IpfsPins | null;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState<keyof IpfsPins | null>(null);
  if (!pins) return null;
  const items = LINKS.filter((item) => pins[item.key]);
  if (!items.length) return null;

  const copyGateway = async (key: keyof IpfsPins, cid: string) => {
    const ok = await copyText(ipfsGatewayUrl(cid));
    if (!ok) return;
    setCopied(key);
    window.setTimeout(() => setCopied((cur) => (cur === key ? null : cur)), 1600);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", compact && "gap-1")}>
      {items.map((item) => {
        const cid = pins[item.key];
        if (!cid) return null;
        const done = copied === item.key;
        return (
          <button
            key={item.key}
            type="button"
            title={done ? `Copied ${item.label} gateway` : `Copy ${item.label} IPFS gateway`}
            aria-label={done ? `Copied ${item.label} gateway` : `Copy ${item.label} IPFS gateway`}
            onClick={() => void copyGateway(item.key, cid)}
            className={cn(
              "inline-flex items-center justify-center rounded-full border border-border bg-surface-2",
              compact ? "size-9 text-lg" : "h-11 gap-1.5 px-3 text-xl",
            )}
          >
            <span aria-hidden="true">{done ? "✅" : item.emoji}</span>
            {compact ? null : (
              <span className="text-xs font-medium text-fg">{done ? "Copied" : item.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
