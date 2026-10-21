import { Link } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { MosaicCanvas } from "@/components/mosaic-canvas";
import { MosaicExport } from "@/components/mosaic-export";
import type { Plate } from "@/lib/catalog";
import { formatYear } from "@/lib/catalog";
import { GALLERY_DENSITY, type MosaicResult } from "@/lib/mosaic/engine";
import { paintingSrc } from "@/lib/wikimedia";

export function GalleryCard({ plate, eager = false }: { plate: Plate; eager?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [grid, setGrid] = useState<MosaicResult | null>(null);
  const onRendered = useCallback((info: MosaicResult, canvas: HTMLCanvasElement) => {
    setGrid(info);
    canvasRef.current = canvas;
  }, []);

  return (
    <article className="relative aspect-square overflow-hidden rounded-xl bg-surface">
      <Link
        to="/plate/$slug"
        params={{ slug: plate.slug }}
        className="absolute inset-0 block"
      >
        <MosaicCanvas
          src={paintingSrc(plate.source_image_url, 320)}
          density={GALLERY_DENSITY}
          eager={eager}
          label={`${plate.title} as an emoji mosaic`}
          fallbackRatio={plate.orientation === "portrait" ? 3 / 4 : 4 / 3}
          onRendered={onRendered}
          loader="card"
          fill
          className="h-full bg-transparent"
        />
      </Link>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-bg/70 px-2.5 pt-2 pb-2.5">
        <Link to="/plate/$slug" params={{ slug: plate.slug }} className="block min-w-0">
          <h2 className="line-clamp-1 font-sans text-sm font-semibold tracking-tight text-fg">
            {plate.title}
          </h2>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted">
            {plate.artist}
            <span className="text-subtle"> · {formatYear(plate.year)}</span>
          </p>
        </Link>
        <div className="mt-2">
          <MosaicExport
            name={plate.title}
            grid={grid}
            canvas={canvasRef.current}
            compact
          />
        </div>
      </div>
    </article>
  );
}
