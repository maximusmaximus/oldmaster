import type { MouseEvent } from "react";
import { BLURB_URL } from "@/lib/shop";
import { cn } from "@/lib/utils";

function openBlurb(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.open(BLURB_URL, "_blank", "noopener,noreferrer");
}

export function BuyNow({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "sm";
}) {
  return (
    <a
      href={BLURB_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={openBlurb}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-headline font-bold tracking-wide text-headline-fg transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-96",
        size === "sm" ? "h-9 px-3 text-xs" : "h-11 px-4 text-sm",
        className,
      )}
    >
      BUY NOW {">"}
    </a>
  );
}
