import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { BuyNow } from "@/components/buy-now";
import { plateCount } from "@/lib/catalog";
import { FANS_REPO_URL } from "@/lib/fan-works";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [{ title: "About — EMOJI OLD MASTERS" }],
  }),
});

function About() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold tracking-wide text-muted uppercase">
        The book
      </p>
      <h1 className="mt-2 font-sans text-4xl font-bold tracking-tight text-headline">
        About EMOJI OLD MASTERS
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
        <p>
          Emoji Old Masters is a 12 × 12 inch art book: public-domain paintings
          rebuilt as mosaics whose ink is color emoji. Each plate starts from a
          Wikimedia Commons reproduction of a work in the public domain — van
          Gogh, Vermeer, Hokusai, Gentileschi, and hundreds more — then maps
          the picture onto a grid of glyphs.
        </p>
        <p>
          The idea is simple. A painting is a field of color. Emoji, treated as
          a palette rather than a punchline, can carry that field. The book
          sets the type large enough to read as both image and inventory: from
          across the room it is the picture; up close it is a tessellation of
          symbols.
        </p>
        <p>
          A denser 3× edition pushes the same method further — smaller cells,
          more glyphs, a closer equivalent of the source. Print assets for
          those editions are separate. This site does not serve those PDFs or
          SVGs. Every mosaic here is computed live, in the browser, from the
          painting itself and a fixed emoji palette (system color emoji /
          Twemoji-style glyphs).
        </p>
        <p>
          There are {plateCount} plates in the catalog. Search the gallery,
          open a work to change density, or{" "}
          <Link
            to="/try"
            className="text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
          >
            try your own image
          </Link>
          . Share publishes a medium JPEG and the emoji text to the public
          archive at{" "}
          <a
            href={FANS_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
          >
            github.com/maximusmaximus/oldmaster
          </a>
          .
        </p>
      </div>

      <div className="mt-10">
        <BuyNow />
      </div>

      <section className="mt-16 border-t border-border pt-12">
        <p className="text-sm font-semibold tracking-wide text-muted uppercase">
          The author
        </p>
        <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-headline">
          Max Infeld
        </h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Max Infeld is a generative artist who prefers the pipes to the
            plaza. He works where art and tech leak into each other —
            fluorescent, damp, and a little dishonest about which way is up.
            For years he has been building machines that eat archives and spit
            pictures: public-domain paintings forced through palettes, noise
            folded into ornament, systems that pretend to be taste.
          </p>
          <p>
            He will tell you he is slimy in the sewers. That is not a metaphor
            he is trying to escape. The sewer is the correct studio for this
            work. Old Masters painted toward heaven with ground minerals and
            patience. Infeld paints with other people’s masterpieces and a grid
            of emoji, crouched in the municipal dark with a laptop that should
            not still turn on.
          </p>
          <p>
            The result is not a joke about the canon. It is a way of admitting
            that every picture is already a mosaic — of labor, of pigment, of
            whatever symbols a century happens to have on its phone. Emoji Old
            Masters is one of those descents. If you find something beautiful
            in it, that is the sludge catching the light.
          </p>
        </div>

        <a
          href="https://maxi.grok.me"
          target="_blank"
          rel="noreferrer"
          className="group mt-10 block rounded-xl bg-surface p-1.5 transition-[background-color] duration-150 ease-out hover:bg-surface-2"
        >
          <div className="overflow-hidden rounded-lg">
            <img
              src="/author/maxi-preview.jpg"
              alt="Preview of Max Infeld’s studio site"
              width={1200}
              height={630}
              className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-3 py-3">
            <div className="min-w-0">
              <p className="font-semibold tracking-wide text-fg">maxi.grok.me</p>
              <p className="mt-0.5 text-sm text-muted">
                Studio, type, and public practice
              </p>
            </div>
            <ExternalLink className="size-4 shrink-0 text-subtle transition-[color] duration-150 group-hover:text-fg" />
          </div>
        </a>
      </section>
    </main>
  );
}
