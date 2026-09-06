import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MosaicExport } from "@/components/mosaic-export";
import {
  FAN_ID_RE,
  fanImageSrc,
  getFanWork,
} from "@/lib/fan-works";

export const Route = createFileRoute("/fan/$id")({
  loader: async ({ params }) => {
    if (!FAN_ID_RE.test(params.id)) throw notFound();
    const work = await getFanWork({ data: { id: params.id } });
    if (!work) throw notFound();
    return work;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} — Emoji New Master`
          : "Emoji New Master",
      },
      loaderData
        ? {
            name: "description",
            content: `${loaderData.title} — ${loaderData.cols} × ${loaderData.rows} emoji mosaic. Make your own Emoji New Master.`,
          }
        : {
            name: "description",
            content: "A fan-made emoji mosaic. Make your own Emoji New Master.",
          },
    ],
  }),
  component: FanView,
});

function FanView() {
  const work = Route.useLoaderData();
  const src = fanImageSrc(work.id);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6">
      <Link
        to="/"
        search={{ view: "fans" }}
        className="inline-flex h-11 items-center gap-2 text-sm text-muted transition-[color] duration-150 hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Gallery (Fans)
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:items-start">
        <div className="overflow-hidden rounded-xl bg-surface p-1.5">
          <div className="overflow-hidden rounded-lg bg-surface-2">
            <img src={src} alt={work.title} className="block w-full" />
          </div>
        </div>

        <aside className="lg:sticky lg:top-20">
          <p className="text-sm font-semibold tracking-wide text-muted uppercase">
            Fan work
          </p>
          <h1 className="mt-2 font-sans text-3xl font-bold tracking-tight text-headline">
            {work.title}
          </h1>
          <p className="mt-2 text-sm text-subtle tabular-nums">
            {work.cols} × {work.rows} emoji
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Button asChild variant="buy">
              <Link to="/try">make your own Emoji New Master!</Link>
            </Button>
            <MosaicExport
              name={work.title}
              emojiText={work.emojiText}
              jpegUrl={src}
            />
          </div>

          {work.emojiText ? (
            <details className="mt-8">
              <summary className="cursor-pointer text-sm font-medium text-fg">
                Emoji text
              </summary>
              <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-surface-2 p-3 text-[8px] leading-none break-all whitespace-pre">
                {work.emojiText}
              </pre>
            </details>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
