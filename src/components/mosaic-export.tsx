import { Check, Copy, Download, FileType2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  canvasToJpegBase64,
  copyText,
  downloadJpeg,
  downloadText,
  fileStem,
  glyphsToText,
  mosaicToSvg,
  parseEmojiGrid,
  type MosaicResult,
} from "@/lib/mosaic/engine";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  grid?: MosaicResult | null;
  canvas?: HTMLCanvasElement | null;
  emojiText?: string | null;
  jpegUrl?: string | null;
  compact?: boolean;
  cover?: boolean;
};

export function MosaicExport({
  name,
  grid,
  canvas,
  emojiText,
  jpegUrl,
  compact = false,
  cover = false,
}: Props) {
  const [busy, setBusy] = useState<"copy" | "jpg" | "svg" | null>(null);
  const [copied, setCopied] = useState(false);
  const stem = fileStem(name);

  const resolved = (() => {
    if (grid?.glyphs.length) {
      return {
        glyphs: grid.glyphs,
        cols: grid.cols,
        rows: grid.rows,
        colors: grid.colors,
        text: glyphsToText(grid.glyphs, grid.cols),
      };
    }
    if (emojiText?.trim()) {
      const parsed = parseEmojiGrid(emojiText);
      return {
        glyphs: parsed.glyphs,
        cols: parsed.cols,
        rows: parsed.rows,
        colors: undefined,
        text: emojiText,
      };
    }
    return null;
  })();

  const ready = Boolean(resolved);

  const onCopy = async () => {
    if (!resolved) return;
    setBusy("copy");
    const ok = await copyText(resolved.text);
    setBusy(null);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  const onJpeg = async () => {
    setBusy("jpg");
    try {
      if (canvas) {
        const jpeg = await canvasToJpegBase64(canvas, 1200);
        downloadJpeg(jpeg, `${stem}.jpg`);
        return;
      }
      if (jpegUrl) {
        const res = await fetch(jpegUrl);
        if (!res.ok) return;
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${stem}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setBusy(null);
    }
  };

  const onSvg = () => {
    if (!resolved) return;
    setBusy("svg");
    const svg = mosaicToSvg(
      resolved.glyphs,
      resolved.cols,
      resolved.rows,
      resolved.colors,
    );
    downloadText(svg, `${stem}.svg`, "image/svg+xml;charset=utf-8");
    setBusy(null);
  };

  const btn = compact ? "sm" as const : "default" as const;

  return (
    <div className={cn("flex flex-wrap gap-2", compact && "gap-1")}>
      <Button
        type="button"
        variant="outline"
        size={btn}
        className={compact ? "h-11 flex-1 px-2 text-xs" : undefined}
        disabled={!ready || busy === "copy"}
        onClick={() => void onCopy()}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied" : compact ? "Copy" : "Copy emoji"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size={btn}
        className={compact ? "h-11 flex-1 px-2 text-xs" : undefined}
        disabled={(!canvas && !jpegUrl) || busy === "jpg"}
        onClick={() => void onJpeg()}
      >
        <Download className="size-4" />
        {busy === "jpg" ? "…" : compact ? "JPG" : "Download JPG"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size={btn}
        className={compact ? "h-11 flex-1 px-2 text-xs" : undefined}
        disabled={!ready || busy === "svg"}
        onClick={onSvg}
      >
        <FileType2 className="size-4" />
        {compact
          ? cover
            ? "SVG cover"
            : "SVG"
          : cover
            ? "Download SVG cover"
            : "Download SVG"}
      </Button>
    </div>
  );
}
