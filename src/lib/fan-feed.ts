export type FanSort = "shuffle" | "newest" | "oldest" | "title" | "emoji" | "clips";

export const FAN_SORTS: { value: FanSort; label: string }[] = [
  { value: "shuffle", label: "Shuffle" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title A–Z" },
  { value: "emoji", label: "Most emoji" },
  { value: "clips", label: "Clips first" },
];

export type FanFeedRecord = {
  id: string;
  title?: unknown;
  cols?: unknown;
  rows?: unknown;
  createdAt?: unknown;
  kind?: unknown;
  hidden?: boolean;
};

export type FanFeedItem =
  | { type: "fan"; data: FanFeedRecord }
  | { type: "svg"; data: FanFeedRecord };

export function asText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  }
  return String(value);
}

export function asStamp(value: unknown): string {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    const ms = value > 0 && value < 1e12 ? value * 1000 : value;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return "";
    const date = new Date(trimmed);
    return Number.isNaN(date.getTime()) ? trimmed : date.toISOString();
  }
  return "";
}

export function asCount(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function feedCreated(item: FanFeedItem): string {
  return asStamp(item.data.createdAt);
}

function feedTitle(item: FanFeedItem): string {
  return asText(item.data.title);
}

function feedEmoji(item: FanFeedItem): number {
  return asCount(item.data.cols) * asCount(item.data.rows);
}

export function feedIsClip(item: FanFeedItem): boolean {
  return item.type === "svg" || item.data.kind === "clip";
}

function cmpText(a: string, b: string): number {
  return a.localeCompare(b);
}

export function sortFanFeed(rows: FanFeedItem[], sort: FanSort): FanFeedItem[] {
  const copy = [...rows];
  if (sort === "newest") {
    return copy.sort((a, b) => cmpText(feedCreated(b), feedCreated(a)));
  }
  if (sort === "oldest") {
    return copy.sort((a, b) => cmpText(feedCreated(a), feedCreated(b)));
  }
  if (sort === "title") {
    return copy.sort(
      (a, b) => cmpText(feedTitle(a), feedTitle(b)) || cmpText(feedCreated(b), feedCreated(a)),
    );
  }
  if (sort === "emoji") {
    return copy.sort((a, b) => feedEmoji(b) - feedEmoji(a));
  }
  if (sort === "clips") {
    return copy.sort(
      (a, b) =>
        Number(feedIsClip(b)) - Number(feedIsClip(a)) ||
        cmpText(feedCreated(b), feedCreated(a)),
    );
  }
  return copy;
}
