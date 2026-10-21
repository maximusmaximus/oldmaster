const MAX_CONCURRENT = 8;
let active = 0;
const waiters: Array<() => void> = [];

function acquire(): Promise<void> {
  if (active < MAX_CONCURRENT) {
    active++;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    waiters.push(() => {
      active++;
      resolve();
    });
  });
}

function release() {
  active--;
  const next = waiters.shift();
  if (next) next();
}

const inflight = new Map<string, Promise<HTMLImageElement | ImageBitmap>>();

export function loadImage(src: string): Promise<HTMLImageElement | ImageBitmap> {
  const cached = inflight.get(src);
  if (cached) return cached;
  const promise = (async () => {
    await acquire();
    try {
      const res = await fetch(src, { cache: "force-cache" });
      if (!res.ok) throw new Error("Image failed to load");
      const blob = await res.blob();
      if (typeof createImageBitmap === "function") {
        return await createImageBitmap(blob);
      }
      const img = new Image();
      img.decoding = "async";
      const url = URL.createObjectURL(blob);
      try {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Image failed to load"));
          img.src = url;
        });
      } finally {
        URL.revokeObjectURL(url);
      }
      return img;
    } finally {
      release();
    }
  })();
  inflight.set(src, promise);
  promise.catch(() => {
    inflight.delete(src);
  });
  return promise;
}

export function loadFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image"));
    };
    img.src = url;
  });
}