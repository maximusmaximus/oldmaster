type Callback = (visible: boolean) => void;

const callbacks = new Map<Element, Callback>();
let io: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = callbacks.get(entry.target);
          if (!cb) continue;
          const tallEnough = entry.boundingClientRect.height > 32;
          cb(entry.isIntersecting && tallEnough);
        }
      },
      { root: null, rootMargin: "480px 0px", threshold: 0.01 },
    );
  }
  return io;
}

export function observeVisibility(el: Element, cb: Callback): () => void {
  callbacks.set(el, cb);
  getObserver().observe(el);
  return () => {
    callbacks.delete(el);
    io?.unobserve(el);
  };
}