import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FanCard } from "@/components/fan-card";
import { GalleryCard } from "@/components/gallery-card";
import { Input } from "@/components/ui/input";
import { artists, filterPlates, plateCount, plates } from "@/lib/catalog";
import { listFanWorks, type FanWorkMeta } from "@/lib/fan-works";
import { cn } from "@/lib/utils";

type GallerySearch = {
  view?: "fans";
};

export const Route = createFileRoute("/")({
  validateSearch: (raw: Record<string, unknown>): GallerySearch =>
    raw.view === "fans" ? { view: "fans" } : {},
  component: Gallery,
  head: () => ({
    meta: [{ title: "EMOJI OLD MASTERS" }],
  }),
});

function Gallery() {
  const { view } = Route.useSearch();
  const isFans = view === "fans";
  const [q, setQ] = useState("");
  const [artist, setArtist] = useState("");
  const shown = useMemo(() => filterPlates(plates, q, artist), [q, artist]);
  const [fans, setFans] = useState<FanWorkMeta[] | null>(null);
  const [fansError, setFansError] = useState(false);

  useEffect(() => {
    if (!isFans) return;
    let live = true;
    setFansError(false);
    listFanWorks()
      .then((rows) => {
        if (live) setFans(rows);
      })
      .catch(() => {
        if (live) {
          setFans([]);
          setFansError(true);
        }
      });
    return () => {
      live = false;
    };
  }, [isFans]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-wide text-muted uppercase">
          {isFans ? "Gallery · Fans" : `${plateCount} plates`}
        </p>
        <h1 className="mt-2 font-sans text-3xl font-bold tracking-tight text-headline sm:text-4xl">
          {isFans
            ? "Emoji New Masters, from the crowd"
            : "Public-domain paintings, remade as live emoji mosaics"}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          {isFans
            ? "Shared mosaics live here — a JPEG and the emoji text, archived in public. Make your own, then send a friend the link."
            : "Each plate is sampled in the browser and rebuilt as color-emoji glyphs — not a pre-baked image. Open a work to change density."}
        </p>
      </div>

      <div className="mt-8 flex w-fit rounded-lg border border-border bg-surface p-1">
        <Link
          to="/"
          search={{}}
          className={cn(
            "inline-flex h-10 items-center rounded-md px-4 text-sm font-semibold transition-[background-color,color] duration-150",
            !isFans ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
          )}
        >
          Masters
        </Link>
        <Link
          to="/"
          search={{ view: "fans" }}
          className={cn(
            "inline-flex h-10 items-center rounded-md px-4 text-sm font-semibold transition-[background-color,color] duration-150",
            isFans ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
          )}
        >
          Fans
        </Link>
      </div>

      {!isFans ? (
        <>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">Search plates</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, artist, or year"
                className="pl-10"
              />
            </label>
            <label className="block sm:w-72">
              <span className="sr-only">Filter by artist</span>
              <select
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg transition-[box-shadow] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none"
              >
                <option value="">All artists</option>
                {artists.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm text-subtle tabular-nums">
            {shown.length === plateCount
              ? `${plateCount} works`
              : `${shown.length} of ${plateCount}`}
          </p>

          {shown.length === 0 ? (
            <p className="mt-16 text-center text-muted">
              No plates match that search. Try a different artist or title.
            </p>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {shown.map((plate, i) => (
                <GalleryCard key={plate.slug} plate={plate} eager={i < 10} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {fans === null ? (
            <p className="mt-10 text-sm text-muted">Loading fan works…</p>
          ) : fansError ? (
            <p className="mt-10 text-sm text-muted">
              Couldn’t load fan works. Try again in a moment.
            </p>
          ) : fans.length === 0 ? (
            <div className="mt-16 max-w-md">
              <p className="text-muted">
                No fan mosaics yet. Drop your own picture, share it, and it
                lands here.
              </p>
              <Link
                to="/try"
                className="mt-6 inline-flex h-11 items-center rounded-md bg-headline px-4 text-sm font-bold text-headline-fg"
              >
                make your own Emoji New Master!
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {fans.map((work) => (
                <FanCard key={work.id} work={work} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
