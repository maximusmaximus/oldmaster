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

export function suggestedPlates(plate: Plate, count = 6): Plate[] {
  const picked: Plate[] = [];
  const seen = new Set([plate.slug]);
  const take = (list: Plate[]) => {
    for (const p of list) {
      if (picked.length >= count) return;
      if (seen.has(p.slug)) continue;
      seen.add(p.slug);
      picked.push(p);
    }
  };
  take(plates.filter((p) => p.artist === plate.artist));
  const idx = plates.findIndex((p) => p.slug === plate.slug);
  const neighbors: Plate[] = [];
  for (let d = 1; d < plates.length && neighbors.length < count * 2; d++) {
    const a = plates[idx + d];
    const b = plates[idx - d];
    if (a) neighbors.push(a);
    if (b) neighbors.push(b);
  }
  take(neighbors.filter((p) => p.orientation === plate.orientation));
  take(neighbors);
  take(plates);
  return picked;
}
