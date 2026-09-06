const ALLOWED_HOSTS = new Set([
  "upload.wikimedia.org",
  "thumb.wikimedia.org",
  "commons.wikimedia.org",
]);

export function commonsFilename(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!ALLOWED_HOSTS.has(parsed.hostname)) return null;
    const path = decodeURIComponent(parsed.pathname);
    const thumb = path.match(
      /\/thumb\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)\/\d+px-[^/]+$/i,
    );
    if (thumb?.[1]) return thumb[1];
    const original = path.match(/\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)$/i);
    if (original?.[1]) return original[1];
    const last = path.split("/").filter(Boolean).pop();
    return last ?? null;
  } catch {
    return null;
  }
}

export function isAllowedWikimediaUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      ALLOWED_HOSTS.has(parsed.hostname)
    );
  } catch {
    return false;
  }
}

export function paintingSrc(url: string, width: number): string {
  const file = commonsFilename(url);
  if (file) {
    return `/api/image?f=${encodeURIComponent(file)}&w=${width}`;
  }
  return `/api/image?u=${encodeURIComponent(url)}&w=${width}`;
}