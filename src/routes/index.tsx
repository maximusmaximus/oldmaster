import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FanCard } from "@/components/fan-card";
import { GalleryCard } from "@/components/gallery-card";
import { SvgReelCard } from "@/components/svg-reel-card";
import { Input } from "@/components/ui/input";
import { VirtualGrid } from "@/components/virtual-grid";
import { artists, filterPlates, plateCount, plates } from "@/lib/catalog";
import { adminStatus } from "@/lib/admin";
import { listFanWorks, setFanHidden, type FanWorkMeta } from "@/lib/fan-works";
import { asStamp, FAN_SORTS, sortFanFeed, type FanSort } from "@/lib/fan-feed";
import { listSvgReels, type SvgReelMeta } from "@/lib/svg-reels";
import { cn, shuffle } from "@/lib/utils";

type FanFeedItem =
  | { type: "fan"; data: FanWorkMeta }
  | { type: "svg"; data: SvgReelMeta };

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
  const [deck, setDeck] = useState(() => shuffle(plates));
  const shown = useMemo(() => filterPlates(deck, q, artist), [deck, q, artist]);
  const [fans, setFans] = useState<FanFeedItem[] | null>(null);
  const [fansError, setFansError] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [fanSort, setFanSort] = useState<FanSort>("shuffle");

  useEffect(() => {
    if (isFans) return;
    setDeck(shuffle(plates));
  }, [isFans]);

  useEffect(() => {
    if (!isFans) return;
    let live = true;
    setFansError(false);
    void adminStatus().then((status) => {
      if (live) setAdmin(status.admin);
    });
    Promise.all([listFanWorks(), listSvgReels()])
      .then(([works, reels]) => {
        if (!live) return;
        const mixed: FanFeedItem[] = [
          ...works.map((data) => ({
            type: "fan" as const,
            data: { ...data, createdAt: asStamp(data.createdAt) },
          })),
          ...reels.map((data) => ({
            type: "svg" as const,
            data: { ...data, createdAt: asStamp(data.createdAt) },
          })),
        ];
        setFans(shuffle(mixed));
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

  const hideFan = async (id: string, hidden: boolean) => {
    setFans((rows) =>
      rows
        ? rows.map((row) =>
            row.type === "fan" && row.data.id === id
              ? { ...row, data: { ...row.data, hidden } }
              : row,
          )
        : rows,
    );
    try {
      await setFanHidden({ data: { id, hidden } });
    } catch {
      setFans((rows) =>
        rows
          ? rows.map((row) =>
              row.type === "fan" && row.data.id === id
                ? { ...row, data: { ...row.data, hidden: !hidden } }
                : row,
            )
          : rows,
      );
    }
  };

  const shownFans = useMemo(() => {
    if (!fans) return null;
    try {
      return sortFanFeed(fans, fanSort) as FanFeedItem[];
    } catch {
      return fans;
    }
  }, [fans, fanSort]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
      <div className="max-w-2xl">
        {isFans ? (
          <p className="text-sm font-semibold tracking-wide text-muted uppercase">
            Gallery · Fans
          </p>
        ) : null}
        <h1 className={cn("font-sans text-3xl font-bold tracking-tight text-headline sm:text-4xl", isFans && "mt-2")}>
          {isFans
            ? "Emoji New Masters, from the crowd"
            : "Public-domain paintings, remade as live emoji mosaics"}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          {isFans
            ? "Stills, camera clips, and experimental SVG reels live here — mosaics, video, and emoji text, pinned to IPFS."
            : "Each plate is sampled in the browser and rebuilt as color-emoji glyphs — not a pre-baked image. Open a work to change density."}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex w-fit rounded-lg border border-border bg-surface p-1">
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
        {isFans ? (
          <label className="block">
            <span className="sr-only">Sort fan works</span>
            <select
              value={fanSort}
              onChange={(e) => {
                const next = e.target.value as FanSort;
                setFanSort(next);
                if (next === "shuffle") {
                  setFans((rows) => (rows ? shuffle(rows) : rows));
                }
              }}
              className="h-12 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-fg transition-[box-shadow] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none"
            >
              {FAN_SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
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
              ? `${shown.length} works`
              : `${shown.length} of ${plateCount}`}
          </p>

          {shown.length === 0 ? (
            <p className="mt-16 text-center text-muted">
              No plates match that search. Try a different artist or title.
            </p>
          ) : (
            <div className="mt-5">
              <VirtualGrid
                items={shown}
                render={(plate, i) => (
                  <GalleryCard key={plate.slug} plate={plate} eager={i < 8} />
                )}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {shownFans === null ? (
            <p className="mt-10 text-sm text-muted">Loading fan works…</p>
          ) : fansError ? (
            <p className="mt-10 text-sm text-muted">
              Couldn’t load fan works. Try again in a moment.
            </p>
          ) : shownFans.length === 0 ? (
            <div className="mt-16 max-w-md">
              <p className="text-muted">
                No fan stills, clips, or experimental SVG reels yet. Upload a
                picture or record a reel, share it, and it lands here.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {shownFans.map((item) =>
                item.type === "svg" ? (
                  <SvgReelCard key={item.data.id} work={item.data} />
                ) : (
                  <FanCard
                    key={item.data.id}
                    work={item.data}
                    admin={admin}
                    onHide={(id, hidden) => void hideFan(id, hidden)}
                  />
                ),
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}
