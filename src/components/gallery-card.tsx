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
    <article className="rounded-xl bg-surface p-1.5 transition-[background-color] duration-150 ease-out hover:bg-surface-2">
      <Link
        to="/plate/$slug"
        params={{ slug: plate.slug }}
        className="group block"
      >
        <div className="overflow-hidden rounded-lg">
          <MosaicCanvas
            src={paintingSrc(plate.source_image_url, 800)}
            density={GALLERY_DENSITY}
            eager={eager}
            label={`${plate.title} as an emoji mosaic`}
            fallbackRatio={plate.orientation === "portrait" ? 3 / 4 : 4 / 3}
            onRendered={onRendered}
          />
        </div>
        <div className="px-2 pt-3">
          <h2 className="line-clamp-1 font-sans text-base font-semibold tracking-tight text-fg">
            {plate.title}
          </h2>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted">
            {plate.artist}
            <span className="text-subtle"> · {formatYear(plate.year)}</span>
          </p>
        </div>
      </Link>
      <div className="px-1 pb-1 pt-2">
        <MosaicExport
          name={plate.title}
          grid={grid}
          canvas={canvasRef.current}
          compact
        />
      </div>
    </article>
  );
}
