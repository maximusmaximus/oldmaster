const MAX_CONCURRENT = 6;
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

const inflight = new Map<string, Promise<HTMLImageElement>>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = inflight.get(src);
  if (cached) return cached;
  const promise = (async () => {
    await acquire();
    try {
      const img = new Image();
      img.decoding = "async";
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image failed to load"));
        img.src = src;
      });
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