import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DENSITY_STEPS } from "@/lib/mosaic/engine";

type Props = {
  value: number;
  onChange: (next: number) => void;
  cols?: number;
  rows?: number;
};

export function DensityControl({ value, onChange, cols, rows }: Props) {
  const at = Math.max(
    0,
    DENSITY_STEPS.findIndex((step) => step === value),
  );
  const coarser = at > 0;
  const finer = at >= 0 && at < DENSITY_STEPS.length - 1;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border border-border bg-surface p-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 rounded-md"
          disabled={!coarser}
          aria-label="Fewer emoji"
          onClick={() => onChange(DENSITY_STEPS[Math.max(0, at - 1)])}
        >
          <Minus className="size-4" />
        </Button>
        <span className="min-w-20 px-2 text-center text-sm text-muted tabular-nums">
          {cols && rows ? `${cols} × ${rows}` : "Density"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 rounded-md"
          disabled={!finer}
          aria-label="More emoji"
          onClick={() =>
            onChange(DENSITY_STEPS[Math.min(DENSITY_STEPS.length - 1, at + 1)])
          }
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <p className="text-xs text-subtle">Fewer, larger glyphs · denser, smaller</p>
    </div>
  );
}