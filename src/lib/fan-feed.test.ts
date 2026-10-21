import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  asStamp,
  asText,
  feedIsClip,
  sortFanFeed,
  type FanFeedItem,
} from "./fan-feed.ts";

function item(
  type: FanFeedItem["type"],
  data: FanFeedItem["data"],
): FanFeedItem {
  return { type, data };
}

describe("asStamp", () => {
  it("turns Date objects into ISO strings", () => {
    const stamp = asStamp(new Date("2026-04-01T12:00:00.000Z"));
    assert.equal(stamp, "2026-04-01T12:00:00.000Z");
    assert.equal(typeof stamp.localeCompare, "function");
  });

  it("accepts unix seconds and ISO strings", () => {
    assert.equal(asStamp(1_704_067_200), "2024-01-01T00:00:00.000Z");
    assert.ok(asStamp("2026-09-13T00:00:00.000Z").startsWith("2026-09-13"));
  });

  it("never returns a non-string", () => {
    assert.equal(asStamp(null), "");
    assert.equal(asStamp(undefined), "");
    assert.equal(asStamp(Number.NaN), "");
  });
});

describe("sortFanFeed", () => {
  const mixed: FanFeedItem[] = [
    item("fan", {
      id: "fan-1",
      title: "Zebra still",
      cols: 8,
      rows: 8,
      createdAt: new Date("2026-01-01T00:00:00Z"),
      kind: "still",
    }),
    item("svg", {
      id: "svg-1",
      title: "Apple reel",
      cols: 24,
      rows: 18,
      createdAt: new Date("2026-06-01T00:00:00Z"),
    }),
    item("fan", {
      id: "fan-2",
      title: "clip",
      cols: 4,
      rows: 4,
      createdAt: "2026-03-01T00:00:00.000Z",
      kind: "clip",
    }),
    item("fan", {
      id: "fan-3",
      title: null,
      cols: "nope",
      rows: undefined,
      createdAt: 1_704_067_200,
      kind: "still",
    }),
  ];

  it("sorts newest without calling localeCompare on Date", () => {
    const ids = sortFanFeed(mixed, "newest").map((row) => row.data.id);
    assert.deepEqual(ids, ["svg-1", "fan-2", "fan-1", "fan-3"]);
  });

  it("sorts oldest", () => {
    const ids = sortFanFeed(mixed, "oldest").map((row) => row.data.id);
    assert.deepEqual(ids, ["fan-3", "fan-1", "fan-2", "svg-1"]);
  });

  it("sorts title A–Z and treats missing titles as empty", () => {
    const titles = sortFanFeed(mixed, "title").map((row) => asText(row.data.title));
    assert.deepEqual(titles, ["", "Apple reel", "clip", "Zebra still"]);
  });

  it("sorts most emoji using numeric cols × rows", () => {
    const ids = sortFanFeed(mixed, "emoji").map((row) => row.data.id);
    assert.equal(ids[0], "svg-1");
    assert.equal(ids.at(-1), "fan-3");
  });

  it("puts clips and experimental SVG reels first", () => {
    const ids = sortFanFeed(mixed, "clips").map((row) => row.data.id);
    assert.ok(feedIsClip(mixed.find((row) => row.data.id === "svg-1")!));
    assert.equal(ids[0] === "svg-1" || ids[1] === "svg-1", true);
    assert.equal(ids.includes("fan-2"), true);
    assert.ok(ids.indexOf("svg-1") < ids.indexOf("fan-1"));
    assert.ok(ids.indexOf("fan-2") < ids.indexOf("fan-1"));
  });

  it("shuffle leaves membership intact", () => {
    const ids = sortFanFeed(mixed, "shuffle")
      .map((row) => row.data.id)
      .sort();
    assert.deepEqual(ids, ["fan-1", "fan-2", "fan-3", "svg-1"]);
  });
});
