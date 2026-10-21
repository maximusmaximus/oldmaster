import { useEffect, useMemo, useState } from "react";
import {
  BOOT_RING,
  BOOT_STAGES,
  shuffleStages,
  waitForBoot,
} from "@/lib/mosaic/boot";
import { cn } from "@/lib/utils";

const STAGE_MS = 1200;

export function BootScreen() {
  const stages = useMemo(() => shuffleStages(BOOT_STAGES), []);
  const [index, setIndex] = useState(0);
  const [gone, setGone] = useState(false);
  const [hiding, setHiding] = useState(false);
  const stage = stages[index % stages.length] ?? BOOT_STAGES[0];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((n) => n + 1);
    }, STAGE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let live = true;
    void waitForBoot().then(() => {
      if (!live) return;
      setHiding(true);
      window.setTimeout(() => {
        if (live) setGone(true);
      }, 280);
    });
    return () => {
      live = false;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg px-6 text-center",
        "transition-[opacity,filter] duration-300 ease-smooth-out",
        hiding ? "pointer-events-none opacity-0 blur-sm" : "opacity-100",
      )}
      role="status"
      aria-live="polite"
      aria-busy={!hiding}
    >
      <div className="relative flex size-56 items-center justify-center sm:size-64">
        <div className="boot-orbit absolute inset-0" aria-hidden="true">
          {BOOT_RING.map((glyph, i) => {
            const angle = (360 / BOOT_RING.length) * i;
            return (
              <span
                key={glyph}
                className="boot-sat"
                style={{ ["--sat-angle" as string]: `${angle}deg` }}
              >
                {glyph}
              </span>
            );
          })}
        </div>
        <span
          key={stage.emoji}
          className="boot-hero relative text-6xl sm:text-7xl"
          aria-hidden="true"
        >
          {stage.emoji}
        </span>
      </div>
      <p className="boot-title mt-8 font-sans text-3xl font-extrabold tracking-wide text-headline uppercase sm:text-5xl">
        EMOJI OLD MASTERS
      </p>
      <p
        key={stage.line}
        className="boot-line mt-4 max-w-sm text-base leading-relaxed text-fg"
      >
        {stage.line}
      </p>
      <p className="mt-3 text-sm text-subtle">
        Glyphs are heavy. Stay. Laugh. It’s working.
      </p>
    </div>
  );
}
