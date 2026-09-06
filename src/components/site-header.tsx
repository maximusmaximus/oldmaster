import { Link, useRouterState } from "@tanstack/react-router";
import { BuyNow } from "@/components/buy-now";
import { MosaicCanvas } from "@/components/mosaic-canvas";
import { getPlate } from "@/lib/catalog";
import { paintingSrc } from "@/lib/wikimedia";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Gallery" },
  { to: "/try", label: "Try" },
  { to: "/about", label: "About" },
] as const;

const STRIP_PLATE = getPlate("starry-night");
const STRIP_SRC = STRIP_PLATE
  ? paintingSrc(STRIP_PLATE.source_image_url, 800)
  : null;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="relative sticky top-0 z-30 overflow-hidden border-b border-border bg-bg">
      {STRIP_SRC && (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
            <MosaicCanvas
              src={STRIP_SRC}
              density={40}
              eager
              fallbackRatio={4 / 3}
              className="bg-transparent"
            />
          </div>
          <div className="absolute inset-0 bg-bg/70" />
        </div>
      )}
      <div className="relative z-10 mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <Link to="/" className="min-w-0 shrink">
          <span className="block truncate font-sans text-base font-bold tracking-wide text-headline uppercase sm:text-2xl">
            EMOJI OLD MASTERS
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-0.5 sm:gap-1">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/" ||
                  pathname.startsWith("/plate/") ||
                  pathname.startsWith("/fan/")
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-2 py-2 text-sm font-medium transition-[color,background-color] duration-150 ease-out sm:px-3",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <BuyNow size="sm" className="shrink-0 sm:h-11 sm:px-4 sm:text-sm" />
      </div>
    </header>
  );
}
