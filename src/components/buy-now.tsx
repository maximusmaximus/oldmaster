import { Link } from "@tanstack/react-router";
import { BOOK_PATH } from "@/lib/shop";
import { cn } from "@/lib/utils";

export function BuyNow({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "sm";
}) {
  return (
    <Link
      to={BOOK_PATH}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-headline font-bold tracking-wide text-headline-fg transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-96",
        size === "sm" ? "h-9 px-3 text-xs" : "h-11 px-4 text-sm",
        className,
      )}
    >
      BUY NOW {">"}
    </Link>
  );
}
