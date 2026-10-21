import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/mosaic/engine";
import { cn } from "@/lib/utils";

type Props = {
  path: string;
  title: string;
  text?: string;
  compact?: boolean;
};

function absoluteUrl(path: string): string {
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.origin).toString();
}

export function ShareWork({ path, title, text, compact = false }: Props) {
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);

  useEffect(() => {
    setCanNative(typeof navigator.share === "function");
  }, []);

  const url = () => absoluteUrl(path);

  const onCopy = async () => {
    const ok = await copyText(url());
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const onNative = async () => {
    if (typeof navigator.share !== "function") return;
    try {
      await navigator.share({
        title,
        text: text ?? "Look at this Emoji New Master",
        url: url(),
      });
    } catch {
      /* cancelled */
    }
  };

  const size = compact ? "sm" : "default";
  const compactClass = compact ? "h-11 flex-1 px-2 text-xs" : undefined;

  return (
    <div className={cn("flex flex-wrap gap-2", compact && "gap-1")}>
      <Button
        type="button"
        variant="outline"
        size={size}
        className={compactClass}
        onClick={() => void onCopy()}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied" : compact ? "Copy link" : "Copy link"}
      </Button>
      {canNative ? (
        <Button
          type="button"
          variant={compact ? "outline" : "default"}
          size={size}
          className={compactClass}
          onClick={() => void onNative()}
        >
          <Share2 className="size-4" />
          {compact ? "Share" : "Share"}
        </Button>
      ) : (
        <Button
          type="button"
          variant={compact ? "outline" : "default"}
          size={size}
          className={compactClass}
          onClick={() => void onCopy()}
        >
          <Share2 className="size-4" />
          Share
        </Button>
      )}
    </div>
  );
}
