import { useEffect, useState } from "react";
import { jpegToDataUrl, letterboxOgDataUrl } from "@/lib/clip-poster";
import { cn } from "@/lib/utils";

export function OgSharePreview({
  jpeg,
  readySrc,
  className,
}: {
  jpeg?: string | null;
  readySrc?: string | null;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(readySrc ?? null);

  useEffect(() => {
    if (readySrc) {
      setSrc(readySrc);
      return;
    }
    if (!jpeg) {
      setSrc(null);
      return;
    }
    let live = true;
    setSrc(null);
    void letterboxOgDataUrl(jpeg)
      .then((url) => {
        if (live) setSrc(url);
      })
      .catch(() => {
        if (live) setSrc(jpegToDataUrl(jpeg));
      });
    return () => {
      live = false;
    };
  }, [jpeg, readySrc]);

  if (!src) {
    return (
      <div
        className={cn(
          "flex aspect-[1200/630] items-center justify-center rounded-lg bg-surface-2 text-sm text-muted",
          className,
        )}
      >
        Building share preview…
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-lg bg-surface-2", className)}>
      <p className="px-3 pt-2.5 text-xs font-semibold tracking-wide text-muted uppercase">
        Share preview
      </p>
      <img
        src={src}
        alt="How this looks when the link is shared"
        className="mt-2 block aspect-[1200/630] w-full object-cover"
      />
    </div>
  );
}