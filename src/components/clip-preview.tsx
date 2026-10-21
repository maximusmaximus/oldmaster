import { useEffect, useState } from "react";
import { grabClipMiddleFrame } from "@/lib/clip-poster";
import { fanImageSrc } from "@/lib/fan-works";
import { cn } from "@/lib/utils";

export function ClipPreview({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const fallback = fanImageSrc(id);
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    let live = true;
    setSrc(fallback);
    void grabClipMiddleFrame(id).then((url) => {
      if (live && url) setSrc(url);
    });
    return () => {
      live = false;
    };
  }, [id, fallback]);

  return (
    <img
      src={src}
      alt={title}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
