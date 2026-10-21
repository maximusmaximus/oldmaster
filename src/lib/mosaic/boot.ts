import { ensurePalette } from "@/lib/mosaic/engine";

const MIN_MS = 1800;
const MAX_MS = 5200;

let painted = 0;
const listeners = new Set<() => void>();

export function noteMosaicPainted() {
  painted += 1;
  listeners.forEach((fn) => fn());
}

export async function waitForBoot(): Promise<void> {
  const started = Date.now();
  await Promise.race([
    ensurePalette().then(() => undefined).catch(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, MAX_MS)),
  ]);
  const left = Math.max(0, MIN_MS - (Date.now() - started));
  if (left) await new Promise((r) => setTimeout(r, left));
  if (painted < 2) {
    const extra = Math.max(0, MAX_MS - (Date.now() - started));
    await Promise.race([
      new Promise<void>((resolve) => {
        const tick = () => {
          if (painted < 2) return;
          listeners.delete(tick);
          resolve();
        };
        listeners.add(tick);
        tick();
      }),
      new Promise<void>((r) => setTimeout(r, Math.min(2200, extra))),
    ]);
  }
}

export const BOOT_STAGES = [
  { emoji: "🐌", line: "Waking the Old Masters. They’ve been asleep since 1653." },
  { emoji: "🦆", line: "Asking Wikimedia for the big files. Nicely. With a hat." },
  { emoji: "🍋", line: "Squeezing van Gogh’s yellows into a lemon. Watch your eyes." },
  { emoji: "🧀", line: "Briefing a cheese on chiaroscuro. It’s taking notes." },
  { emoji: "🧮", line: "Filling 4,096 color bins. One of them is ‘almost ochre’." },
  { emoji: "🗿", line: "Negotiating with a still life. The pear wants more lines." },
  { emoji: "🐸", line: "Calibrating frog-green to a Flemish meadow." },
  { emoji: "🍌", line: "Casting a banana as John the Baptist. Method acting." },
  { emoji: "🧵", line: "Sewing Vermeer’s pearls onto sparkle emoji. Tiny work." },
  { emoji: "🚽", line: "Max is in the sewers, wrangling glyphs with a stick." },
  { emoji: "🦞", line: "A lobster has entered the palette. This is fine." },
  { emoji: "🫧", line: "Blowing Dutch soap-bubble highlights. Very expensive air." },
  { emoji: "🪿", line: "Herding geese out of the lookup table. Honk, then match." },
  { emoji: "🪨", line: "Teaching ⬛ to brood like a Caravaggio." },
  { emoji: "🕰️", line: "This painting took years. The mosaic is close. Ish." },
  { emoji: "🧫", line: "Culturing a little mold of burnt umber. Science." },
  { emoji: "🪞", line: "Holding a mirror up to nature. Nature asked for a minute." },
  { emoji: "🐝", line: "Bees are polling the nectar of each glyph. Busy, busy." },
] as const;

export const BOOT_RING = ["🎨", "🍋", "🐸", "🗿", "🦞", "🧀", "🍌", "🫧"] as const;

export function shuffleStages<T>(items: readonly T[]): T[] {
  const next = items.slice();
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = next[i]!;
    next[i] = next[j]!;
    next[j] = a;
  }
  return next;
}
