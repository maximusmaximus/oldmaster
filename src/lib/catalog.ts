import catalog from "@/data/plate-index.json";

export type Plate = {
  slug: string;
  id: string;
  title: string;
  artist: string;
  year: number | string;
  orientation: "landscape" | "portrait" | string;
  source_image_url: string;
  commons_page: string;
  license: string;
};

type CatalogFile = {
  count: number;
  plates: Plate[];
};

const data = catalog as CatalogFile;

export const plates: Plate[] = data.plates;
export const plateCount = data.count;

const bySlug = new Map(plates.map((p) => [p.slug, p]));

export function getPlate(slug: string): Plate | undefined {
  return bySlug.get(slug);
}

export const artists: string[] = Array.from(
  new Set(plates.map((p) => p.artist)),
).sort((a, b) => a.localeCompare(b));

export function formatYear(year: number | string): string {
  return String(year);
}

export function filterPlates(list: Plate[], q: string, artist: string): Plate[] {
  const query = q.trim().toLowerCase();
  return list.filter((p) => {
    if (artist && p.artist !== artist) return false;
    if (!query) return true;
    return (
      p.title.toLowerCase().includes(query) ||
      p.artist.toLowerCase().includes(query) ||
      formatYear(p.year).toLowerCase().includes(query)
    );
  });
}