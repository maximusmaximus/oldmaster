import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BuyNow } from "@/components/buy-now";
import { MosaicCanvas } from "@/components/mosaic-canvas";
import { getPlate, plates, type Plate } from "@/lib/catalog";
import { paintingSrc } from "@/lib/wikimedia";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Gallery" },
  { to: "/try", label: "📷" },
  { to: "/about", label: "About" },
] as const;

const WIDE = plates.filter((p) => p.orientation !== "portrait");
const POOL = WIDE.length ? WIDE : plates;

function plateFromPath(pathname: string): Plate | undefined {
  const match = pathname.match(/^\/plate\/([^/]+)/);
  if (!match?.[1]) return undefined;
  return getPlate(decodeURIComponent(match[1]));
}

function hashPick(key: string, avoid?: string): Plate {
  const list = avoid ? POOL.filter((p) => p.slug !== avoid) : POOL;
  const src = list.length ? list : POOL;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return src[Math.abs(h) % src.length]!;
}

function randomPick(avoid?: string): Plate {
  const list = avoid ? POOL.filter((p) => p.slug !== avoid) : POOL;
  const src = list.length ? list : POOL;
  return src[Math.floor(Math.random() * src.length)]!;
}

const CAM_SEEN_KEY = "eom-seen-camera";

function cameraSeen(): boolean {
  try {
    return localStorage.getItem(CAM_SEEN_KEY) === "1";
  } catch {
    return true;
  }
}

function markCameraSeen() {
  try {
    localStorage.setItem(CAM_SEEN_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function SiteHeader() {
  const viewKey = useRouterState({
    select: (s) => `${s.location.pathname}${s.location.searchStr}`,
  });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [banner, setBanner] = useState<Plate>(
    () => plateFromPath(pathname) ?? hashPick(viewKey),
  );
  const lastView = useRef(viewKey);
  const [pulseCam, setPulseCam] = useState(false);

  useEffect(() => {
    if (lastView.current === viewKey) return;
    lastView.current = viewKey;
    const fromPlate = plateFromPath(pathname);
    setBanner(fromPlate ?? randomPick(banner.slug));
  }, [viewKey, pathname, banner.slug]);

  useEffect(() => {
    if (pathname === "/try" || pathname.startsWith("/try/")) {
      markCameraSeen();
      setPulseCam(false);
      return;
    }
    setPulseCam(!cameraSeen());
  }, [pathname]);

  const src = paintingSrc(banner.source_image_url, 480);

  return (
    <header className="relative sticky top-0 z-30 overflow-hidden border-b border-border bg-transparent">
      {src && (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
            <MosaicCanvas
              key={banner.slug}
              src={src}
              density={32}
              eager
              fallbackRatio={banner.orientation === "portrait" ? 3 / 4 : 4 / 3}
              className="bg-transparent"
              loader="none"
            />
          </div>
          <div className="absolute inset-0 bg-bg/60" />
        </div>
      )}
      <div className="relative z-10 mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <Link to="/" className="min-w-0 shrink">
          <span className="block truncate font-sans text-base font-extrabold tracking-wide text-headline uppercase sm:text-2xl">
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
                aria-label={item.to === "/try" ? "Camera" : item.label}
                title={item.to === "/try" ? "Camera" : undefined}
                onClick={
                  item.to === "/try"
                    ? () => {
                        markCameraSeen();
                        setPulseCam(false);
                      }
                    : undefined
                }
                className={cn(
                  "rounded-md px-2 py-2 text-sm font-medium transition-[color,background-color] duration-150 ease-out sm:px-3",
                  item.to === "/try" && "text-lg",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.to === "/try" && pulseCam ? (
                  <span className="nav-cam-pulse" aria-hidden="true">
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            );
          })}
        </nav>
        <BuyNow size="sm" className="shrink-0 sm:h-11 sm:px-4 sm:text-sm" />
      </div>
    </header>
  );
}
