import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CLIP_MS,
  DEFAULT_LIVE_DENSITY,
  DEFAULT_LIVE_DENSITY_DESKTOP,
  LIVE_DENSITY_STEPS,
  LIVE_DENSITY_STEPS_DESKTOP,
  liveFpsFor,
} from "./camera.ts";
import { isEmojiProcessed } from "./emoji-processed.ts";
import {
  hasPins,
  ipfsGatewayUrl,
  ipfsUri,
  mediaCid,
  mergePins,
  primaryCid,
} from "./ipfs.ts";
import { BOOK_PATH } from "./shop.ts";
import { artworkHead } from "./share-meta.ts";

describe("camera clip settings", () => {
  it("caps the live camera reel at 12 seconds", () => {
    assert.equal(CLIP_MS, 12_000);
  });

  it("starts denser on desktop and allows up to 256", () => {
    assert.equal(DEFAULT_LIVE_DENSITY, 48);
    assert.equal(DEFAULT_LIVE_DENSITY_DESKTOP, 64);
    assert.equal(LIVE_DENSITY_STEPS.at(-1), 64);
    assert.equal(LIVE_DENSITY_STEPS_DESKTOP.at(-1), 256);
    assert.ok(LIVE_DENSITY_STEPS_DESKTOP.includes(128));
  });

  it("drops fps as density climbs", () => {
    assert.equal(liveFpsFor(32), 20);
    assert.ok(liveFpsFor(256) <= liveFpsFor(128));
    assert.ok(liveFpsFor(128) <= liveFpsFor(64));
  });
});

describe("emoji processing guard", () => {
  it("accepts mosaics and the clip fallback glyph", () => {
    assert.equal(isEmojiProcessed("😀"), true);
    assert.equal(isEmojiProcessed("🎞️"), true);
    assert.equal(isEmojiProcessed("🟥🟧🟨🟩"), true);
  });

  it("rejects empty or tiny ascii", () => {
    assert.equal(isEmojiProcessed(""), false);
    assert.equal(isEmojiProcessed("   "), false);
    assert.equal(isEmojiProcessed("ab"), false);
  });
});

describe("IPFS helpers", () => {
  it("builds gateway and ipfs URLs", () => {
    assert.equal(ipfsUri("abc"), "ipfs://abc");
    assert.equal(
      ipfsGatewayUrl("abc"),
      "https://emoji.mypinata.cloud/ipfs/abc",
    );
    assert.equal(primaryCid({ jpegCid: "j", emojiCid: "e" }), "j");
    assert.equal(mediaCid({ videoCid: "v", jpegCid: "j" }), "v");
    assert.equal(hasPins({ jpegCid: "j" }), true);
    assert.equal(hasPins({}), false);
    assert.deepEqual(mergePins({ jpegCid: "j" }, { emojiCid: "e" }), {
      emojiCid: "e",
      jpegCid: "j",
      videoCid: undefined,
      svgCid: undefined,
      framesCid: undefined,
    });
  });
});

describe("shop link", () => {
  it("points at the on-site book page", () => {
    assert.equal(BOOK_PATH, "/book");
  });
});

describe("artwork share metadata", () => {
  it("points crawlers at the artwork page and its emoji preview", () => {
    const head = artworkHead(
      {
        title: "Starry Night",
        description: "Starry Night by Vincent van Gogh, 1889. Live emoji mosaic.",
        path: "/plate/starry-night",
        imagePath: "/api/og-preview?p=%2Fplate%2Fstarry-night",
        artist: "Vincent van Gogh",
        year: "1889",
      },
      "https://emoji.example",
    );
    const og = Object.fromEntries(
      head.meta
        .filter((tag): tag is { property: string; content: string } => "property" in tag)
        .map((tag) => [tag.property, tag.content]),
    );
    assert.equal(og["og:url"], "https://emoji.example/plate/starry-night");
    assert.equal(
      og["og:image"],
      "https://emoji.example/api/og-preview?p=%2Fplate%2Fstarry-night",
    );
    assert.equal(og["og:type"], "article");
    assert.equal(head.links[0]?.href, "https://emoji.example/plate/starry-night");
    const ld = head.meta.find((tag) => "script:ld+json" in tag);
    assert.ok(ld && "script:ld+json" in ld);
    const payload = ld["script:ld+json"] as { "@type": string };
    assert.equal(payload["@type"], "VisualArtwork");
  });
});
