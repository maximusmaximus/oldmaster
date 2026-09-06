import { Link } from "@tanstack/react-router";
import type { FanWorkMeta } from "@/lib/fan-works";
import { fanImageSrc } from "@/lib/fan-works";

export function FanCard({ work }: { work: FanWorkMeta }) {
  return (
    <Link
      to="/fan/$id"
      params={{ id: work.id }}
      className="group block rounded-xl bg-surface p-1.5 transition-[background-color] duration-150 ease-out hover:bg-surface-2"
    >
      <div className="overflow-hidden rounded-lg bg-surface-2">
        <img
          src={fanImageSrc(work.id)}
          alt={work.title}
          className="block w-full"
        />
      </div>
      <div className="px-2 pb-2 pt-3">
        <h2 className="line-clamp-1 font-sans text-base font-semibold tracking-tight text-fg">
          {work.title}
        </h2>
        <p className="mt-0.5 text-sm text-muted tabular-nums">
          {work.cols && work.rows ? `${work.cols} × ${work.rows}` : "Fan work"}
        </p>
      </div>
    </Link>
  );
}
