import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/book/preview.jpg", alt: "Cover of the Emoji Old Masters book", label: "Cover", preview: false },
  { src: "/book/pages/01.jpg", alt: "Book preview, Girl with a Pearl Earring", label: "Girl with a Pearl Earring", preview: true },
  { src: "/book/pages/02.jpg", alt: "Book preview, The Starry Night", label: "The Starry Night", preview: true },
  { src: "/book/pages/03.jpg", alt: "Book preview, The Birth of Venus", label: "The Birth of Venus", preview: true },
  { src: "/book/pages/04.jpg", alt: "Book preview, The Scream", label: "The Scream", preview: true },
  { src: "/book/pages/05.jpg", alt: "Book preview, The Great Wave", label: "The Great Wave", preview: true },
] as const;

function Strip({
  index,
  drag,
  dragging,
  large,
  stage,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onClick,
}: {
  index: number;
  drag: number;
  dragging: boolean;
  large?: boolean;
  stage?: boolean;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onClick?: () => void;
}) {
  const slide = SLIDES[index] ?? SLIDES[0];
  return (
    <div
      className={cn("relative cursor-grab overflow-hidden bg-black active:cursor-grabbing", large && "rounded-lg")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={onClick}
    >
      <div
        className="flex touch-pan-y"
        style={{
          transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)`,
          transition: dragging ? "none" : "transform 280ms ease",
        }}
      >
        {SLIDES.map((item) => (
          <div
            key={item.src}
            className={cn(
              "flex w-full shrink-0 items-center justify-center",
              stage && "h-[min(68vh,720px)]",
              large && "h-[min(88vh,900px)]",
            )}
          >
            <img
              src={item.src}
              alt={item.alt}
              draggable={false}
              width={864}
              height={864}
              className={cn("select-none object-contain", stage || large ? "max-h-full max-w-full" : "w-full")}
            />
          </div>
        ))}
      </div>
      {slide.preview && (
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          Preview
        </span>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {SLIDES.map((item, i) => (
          <span
            key={item.src}
            className={cn("size-1.5 rounded-full", i === index ? "bg-white" : "bg-white/40")}
          />
        ))}
      </div>
    </div>
  );
}

type Props = { className?: string; featured?: boolean };

export function BookPreview({ className, featured = false }: Props) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(false);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setIndex((i) => Math.min(SLIDES.length - 1, i + 1));
      if (event.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const bind = (enlargeOnTap: boolean) => ({
    onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
      moved.current = false;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!start.current || start.current.id !== event.pointerId) return;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (Math.abs(dx) > 8) moved.current = true;
      setDragging(true);
      setDrag(dx);
    },
    onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!start.current || start.current.id !== event.pointerId) return;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      start.current = null;
      setDragging(false);
      setDrag(0);
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) return;
      if (dx > 48) setIndex((i) => Math.max(0, i - 1));
      else if (dx < -48) setIndex((i) => Math.min(SLIDES.length - 1, i + 1));
    },
    onClick: () => {
      if (!moved.current && enlargeOnTap) setOpen(true);
    },
  });

  const banner = bind(true);
  const viewer = bind(false);
  const slide = SLIDES[index] ?? SLIDES[0];

  const step = (dir: -1 | 1) => setIndex((i) => Math.min(SLIDES.length - 1, Math.max(0, i + dir)));

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label="Book preview">
      <div className="relative overflow-hidden rounded-lg">
        <Strip index={index} drag={open ? 0 : drag} dragging={open ? false : dragging} stage={featured} {...banner} />
        {featured && (
          <>
            <button
              type="button"
              aria-label="Previous page"
              disabled={index === 0}
              onClick={() => step(-1)}
              className="absolute top-1/2 left-2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-2xl text-white disabled:opacity-30"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next page"
              disabled={index === SLIDES.length - 1}
              onClick={() => step(1)}
              className="absolute top-1/2 right-2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-2xl text-white disabled:opacity-30"
            >
              ›
            </button>
          </>
        )}
      </div>
      {featured && (
        <>
          <div className="mt-3 flex items-baseline justify-between gap-3 px-1">
            <p className="min-w-0 truncate text-sm text-fg">
              {slide.preview ? <span className="font-semibold tracking-wide uppercase">Preview</span> : <span className="font-semibold tracking-wide uppercase">Cover</span>}
              {slide.preview ? <span className="text-muted"> · {slide.label}</span> : null}
            </p>
            <p className="shrink-0 text-xs text-muted">
              {index + 1} / {SLIDES.length}
            </p>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {SLIDES.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-label={item.alt}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "w-16 shrink-0 overflow-hidden rounded-md sm:w-20",
                  i === index ? "outline outline-2 outline-white" : "opacity-60 hover:opacity-100",
                )}
              >
                <img src={item.src} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </>
      )}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-3 sm:p-8"
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <Strip
                index={index}
                drag={drag}
                dragging={dragging}
                large
                {...viewer}
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
