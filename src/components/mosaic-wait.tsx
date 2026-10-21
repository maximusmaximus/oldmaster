import { useEffect, useMemo, useState } from "react";
import { BOOT_STAGES, shuffleStages } from "@/lib/mosaic/boot";
import { cn } from "@/lib/utils";

export function MosaicWait({
  compact = false,
}: {
  compact?: boolean;
}) {
  const stages = useMemo(() => shuffleStages(BOOT_STAGES), []);
  const [index, setIndex] = useState(0);
  const stage = stages[index % stages.length] ?? BOOT_STAGES[0];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((n) => n + 1);
    }, compact ? 1600 : 1300);
    return () => window.clearInterval(id);
  }, [compact]);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-2 px-3 text-center"
      aria-hidden="true"
    >
      <div className="flex items-end gap-1">
        {["🎨", stage.emoji, "🍋"].map((glyph, i) => (
          <span
            key={`${glyph}-${i}`}
            className={cn("boot-bob text-2xl", compact && "text-xl")}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {glyph}
          </span>
        ))}
      </div>
      {!compact && (
        <p key={stage.line} className="boot-line max-w-xs text-sm text-muted">
          {stage.line}
        </p>
      )}
    </div>
  );
}
