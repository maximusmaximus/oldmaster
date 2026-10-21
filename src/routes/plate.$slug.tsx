import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { DensityControl } from "@/components/density-control";
import { MosaicCanvas } from "@/components/mosaic-canvas";
import { MosaicExport } from "@/components/mosaic-export";
import { ShareWork } from "@/components/share-work";
import { SuggestedPlates } from "@/components/suggested-works";
import { Button } from "@/components/ui/button";
import { formatYear, getPlate, suggestedPlates } from "@/lib/catalog";
import { artworkHead, pageOrigin } from "@/lib/share-meta";
import {
  DEFAULT_PLATE_DENSITY,
  type MosaicResult,
} from "@/lib/mosaic/engine";
import { cn } from "@/lib/utils";
import { paintingSrc } from "@/lib/wikimedia";

export const Route = createFileRoute("/plate/$slug")({
  loader: ({ params }) => {
    const plate = getPlate(params.slug);
    if (!plate) throw notFound();
    return plate;
  },
  head: async ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "EMOJI OLD MASTERS" }] };
    }
    const origin = await pageOrigin();
    return artworkHead(
      {
        title: loaderData.title,
        description: `${loaderData.title} by ${loaderData.artist}, ${formatYear(loaderData.year)}. Live emoji mosaic.`,
        path: `/plate/${loaderData.slug}`,
        imagePath: `/api/og-preview?p=${encodeURIComponent(`/plate/${loaderData.slug}`)}`,
        artist: loaderData.artist,
        year: formatYear(loaderData.year),
      },
      origin,
    );
  },
  component: PlateView,
});

function PlateView() {
  const plate = Route.useLoaderData();
  const [density, setDensity] = useState(DEFAULT_PLATE_DENSITY);
  const [grid, setGrid] = useState<MosaicResult | null>(null);
  const [showSource, setShowSource] = useState(false);
  const [rebuilding, setRebuilding] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onRendered = useCallback((info: MosaicResult, canvas: HTMLCanvasElement) => {
    setGrid(info);
    canvasRef.current = canvas;
    setRebuilding(false);
  }, []);
  const src = paintingSrc(plate.source_image_url, 1200);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
      <Link
        to="/"
        className="inline-flex h-11 items-center gap-2 text-sm text-muted transition-[color] duration-150 hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Gallery
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:items-start">
        <div className="overflow-hidden rounded-xl bg-surface p-1.5">
          <div className="relative overflow-hidden rounded-lg bg-surface-2">
            <MosaicCanvas
              src={src}
              density={density}
              eager
              label={`${plate.title} as an emoji mosaic`}
              fallbackRatio={plate.orientation === "portrait" ? 3 / 4 : 4 / 3}
              onRendered={onRendered}
              className={showSource ? "invisible" : undefined}
            />
            <img
              src={src}
              alt={`Original painting: ${plate.title}`}
              className={cn(
                "absolute inset-0 z-10 h-full w-full object-contain",
                showSource ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-20">
          <p className="text-sm text-muted">{plate.artist}</p>
          <h1 className="mt-1 font-sans text-3xl font-bold tracking-tight text-headline">
            {plate.title}
          </h1>
          <p className="mt-2 text-sm text-subtle">{formatYear(plate.year)}</p>

          <div className="mt-6">
            <DensityControl
              value={density}
              onChange={(next) => {
                setRebuilding(true);
                setDensity(next);
              }}
              cols={grid?.cols}
              rows={grid?.rows}
              busy={rebuilding}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant={showSource ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSource((v) => !v)}
            >
              {showSource ? "Show mosaic" : "Show original"}
            </Button>
          </div>
          <div className="mt-4">
            <ShareWork
              path={`/plate/${plate.slug}`}
              title={`${plate.title} — EMOJI OLD MASTERS`}
              text={`${plate.title} by ${plate.artist}, remade as an emoji mosaic.`}
            />
          </div>
          <div className="mt-4">
            <MosaicExport
              name={plate.title}
              grid={grid}
              canvas={canvasRef.current}
            />
          </div>

          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="text-subtle">License</dt>
              <dd className="mt-0.5 text-muted">{plate.license}</dd>
            </div>
            <div>
              <dt className="text-subtle">Source</dt>
              <dd className="mt-0.5">
                <a
                  href={plate.commons_page}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-fg underline decoration-border underline-offset-4 transition-[decoration-color] duration-150 hover:decoration-fg"
                >
                  Wikimedia Commons
                  <ExternalLink className="size-3.5" />
                </a>
              </dd>
            </div>
            {grid && (
              <div>
                <dt className="text-subtle">Glyphs</dt>
                <dd className="mt-0.5 tabular-nums text-muted">
                  {grid.cells.toLocaleString()} emoji cells
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </div>

      <SuggestedPlates plates={suggestedPlates(plate)} />
    </main>
  );
}
