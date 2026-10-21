import { Link } from "@tanstack/react-router";
import { FANS_REPO_URL } from "@/lib/fan-works";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-bg">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 sm:px-6">
        <a
          href="/emoji-old-masters-plates.csv"
          download="emoji-old-masters-plates.csv"
          className="inline-flex h-11 items-center text-sm font-medium text-muted transition-[color] duration-150 ease-out hover:text-fg"
        >
          download data
        </a>
        <a
          href={FANS_REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center text-sm font-medium text-muted transition-[color] duration-150 ease-out hover:text-fg"
        >
          github
        </a>
        <Link
          to="/terms"
          className="inline-flex h-11 items-center text-sm font-medium text-muted transition-[color] duration-150 ease-out hover:text-fg"
        >
          terms of sale
        </Link>
      </div>
    </footer>
  );
}
