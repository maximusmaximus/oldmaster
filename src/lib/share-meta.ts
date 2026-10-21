const APP = "EMOJI OLD MASTERS";

export async function pageOrigin(): Promise<string> {
  if (!import.meta.env.SSR) return window.location.origin;
  const { siteOrigin } = await import("./site-origin.server");
  return siteOrigin();
}

function abs(origin: string, path: string): string {
  if (!origin) return path;
  return new URL(path, origin).toString();
}

export function artworkHead(
  opts: {
    title: string;
    description: string;
    path: string;
    imagePath: string;
    artist?: string;
    year?: string;
  },
  origin: string,
) {
  const pageTitle = `${opts.title} — ${APP}`;
  const url = abs(origin, opts.path);
  const image = abs(origin, opts.imagePath);
  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: opts.description },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: APP },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: opts.title },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: opts.title },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "VisualArtwork",
          name: opts.title,
          description: opts.description,
          url,
          image,
          artform: "Emoji mosaic",
          ...(opts.artist
            ? { creator: { "@type": "Person", name: opts.artist } }
            : {}),
          ...(opts.year ? { dateCreated: opts.year } : {}),
          isPartOf: {
            "@type": "CreativeWork",
            name: APP,
            url: abs(origin, "/"),
          },
        },
      },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
