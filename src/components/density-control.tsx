import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DENSITY_STEPS } from "@/lib/mosaic/engine";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange: (next: number) => void;
  cols?: number;
  rows?: number;
  locked?: boolean;
  busy?: boolean;
  steps?: readonly number[];
  lockLabel?: string;
};

export function DensityControl({
  value,
  onChange,
  cols,
  rows,
  locked = false,
  busy = false,
  steps = DENSITY_STEPS,
  lockLabel = "Saved — glyph count is locked",
}: Props) {
  const at = Math.max(
    0,
    steps.findIndex((step) => step === value),
  );
  const coarser = at > 0;
  const finer = at >= 0 && at < steps.length - 1;
  const frozen = locked || busy;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border border-border bg-surface p-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 rounded-md"
          disabled={frozen || !coarser}
          aria-label="Fewer emoji"
          onClick={() => onChange(steps[Math.max(0, at - 1)]!)}
        >
          {busy ? (
            <span className="density-snail text-lg" aria-hidden="true">
              🐌
            </span>
          ) : (
            <Minus className="size-4" />
          )}
        </Button>
        <span className="flex min-w-24 items-center justify-center gap-1.5 px-2 text-center text-sm text-muted tabular-nums">
          {busy ? (
            <span className="density-snail text-xl" aria-hidden="true">
              🐌
            </span>
          ) : null}
          {cols && rows ? `${cols} × ${rows}` : "Glyphs"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 rounded-md"
          disabled={frozen || !finer}
          aria-label="More emoji"
          onClick={() =>
            onChange(steps[Math.min(steps.length - 1, at + 1)]!)
          }
        >
          {busy ? (
            <span className="density-snail text-lg" aria-hidden="true">
              🐌
            </span>
          ) : (
            <Plus className="size-4" />
          )}
        </Button>
      </div>
      <p className={cn("text-xs text-subtle", locked && "text-muted")}>
        {locked
          ? lockLabel
          : busy
            ? "🐌 packing more glyphs…"
            : "Fewer, larger glyphs · denser, smaller"}
      </p>
    </div>
  );
}
