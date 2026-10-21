import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MosaicCanvas } from "@/components/mosaic-canvas";
import { ClipPreview } from "@/components/clip-preview";
import { formatYear, type Plate } from "@/lib/catalog";
import {
  fanImageSrc,
  listFanWorks,
  type FanWorkMeta,
} from "@/lib/fan-works";
import { GALLERY_DENSITY } from "@/lib/mosaic/engine";
import { paintingSrc } from "@/lib/wikimedia";

function PlateSuggestCard({ plate }: { plate: Plate }) {
  return (
    <Link
      to="/plate/$slug"
      params={{ slug: plate.slug }}
      className="group relative aspect-square overflow-hidden rounded-xl bg-surface"
    >
      <MosaicCanvas
        src={paintingSrc(plate.source_image_url, 320)}
        density={GALLERY_DENSITY}
        label={`${plate.title} as an emoji mosaic`}
        fallbackRatio={plate.orientation === "portrait" ? 3 / 4 : 4 / 3}
        loader="card"
        fill
        className="h-full bg-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 bg-bg/70 px-2.5 py-2">
        <h3 className="line-clamp-1 font-sans text-sm font-semibold tracking-tight text-fg">
          {plate.title}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted">
          {plate.artist}
          <span className="text-subtle"> · {formatYear(plate.year)}</span>
        </p>
      </div>
    </Link>
  );
}

function FanSuggestCard({ work }: { work: FanWorkMeta }) {
  return (
    <Link
      to="/fan/$id"
      params={{ id: work.id }}
      className="group relative aspect-square overflow-hidden rounded-xl bg-surface"
    >
      {work.kind === "clip" ? (
        <ClipPreview id={work.id} title={work.title} />
      ) : (
        <img
          src={fanImageSrc(work.id)}
          alt={work.title}
          className="h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-bg/70 px-2.5 py-2">
        <h3 className="line-clamp-1 font-sans text-sm font-semibold tracking-tight text-fg">
          {work.title}
        </h3>
        <p className="mt-0.5 text-xs text-muted tabular-nums">
          {work.cols && work.rows ? `${work.cols} × ${work.rows}` : "Fan work"}
        </p>
      </div>
    </Link>
  );
}

export function SuggestedPlates({ plates }: { plates: Plate[] }) {
  if (!plates.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-sans text-lg font-bold tracking-tight text-headline">
        More to explore
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {plates.map((plate) => (
          <PlateSuggestCard key={plate.slug} plate={plate} />
        ))}
      </div>
    </section>
  );
}

export function SuggestedFans({ exclude }: { exclude: string }) {
  const [works, setWorks] = useState<FanWorkMeta[]>([]);

  useEffect(() => {
    let live = true;
    void listFanWorks().then((list) => {
      if (!live) return;
      setWorks(list.filter((w) => w.id !== exclude).slice(0, 6));
    });
    return () => {
      live = false;
    };
  }, [exclude]);

  if (!works.length) return null;

  return (
    <section className="mt-12">
      <h2 className="font-sans text-lg font-bold tracking-tight text-headline">
        More to explore
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {works.map((work) => (
          <FanSuggestCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}
