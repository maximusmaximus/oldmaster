import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ReelVideoSize } from "@/lib/svg-4k";

const LINES: Record<ReelVideoSize, string[]> = {
  "4k": [
    "Spinning the 4K reel. Don’t blink.",
    "Teaching emojis to act at 3840 wide.",
    "Lemon-pressing pixels into a movie.",
    "This takes a minute. The wheel is honest.",
    "Frame by frame, glyph by glyph…",
  ],
  "8k": [
    "8K is a lot of lemon. Hang tight.",
    "Unrolling a cinema-sized emoji carpet.",
    "Your phone is sweating. That’s the art.",
    "Almost a planet of pixels. Still spinning.",
    "High-res patience is a virtue. 📀",
  ],
};

const ORBIT = ["🎬", "🍋", "🎞️", "🎥"];

export function VideoEncodeWait({
  size = "4k",
  compact = false,
}: {
  size?: ReelVideoSize;
  compact?: boolean;
}) {
  const lines = LINES[size];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((n) => n + 1), 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-bg/85 px-4 text-center backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
    >
      <div className={cn("relative", compact ? "size-20" : "size-28")}>
        <div className="encode-orbit absolute inset-0">
          {ORBIT.map((glyph, i) => (
            <span
              key={glyph}
              className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", compact ? "text-lg" : "text-2xl")}
              style={{
                transform: `rotate(${i * 90}deg) translateY(${compact ? -34 : -46}px) rotate(${-i * 90}deg)`,
              }}
            >
              {glyph}
            </span>
          ))}
        </div>
        <span
          className={cn(
            "encode-spin absolute inset-0 grid place-items-center",
            compact ? "text-4xl" : "text-5xl",
          )}
          aria-hidden="true"
        >
          📀
        </span>
      </div>
      <p className={cn("max-w-[16rem] font-medium text-headline", compact ? "text-xs" : "text-sm")}>
        {size === "8k" ? "Cooking 8K" : "Cooking 4K"}
      </p>
      <p key={lines[index % lines.length]} className="boot-line max-w-[18rem] text-xs text-muted">
        {lines[index % lines.length]}
      </p>
    </div>
  );
}

export function EncodeSpin({ className }: { className?: string }) {
  return (
    <span className={cn("encode-spin inline-block", className)} aria-hidden="true">
      📀
    </span>
  );
}
