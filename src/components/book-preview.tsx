import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/book/preview.jpg", alt: "Cover of the Emoji Old Masters book", preview: false },
  { src: "/book/pages/01.jpg", alt: "Book preview, opening spread", preview: true },
  { src: "/book/pages/02.jpg", alt: "Book preview, The Starry Night", preview: true },
  { src: "/book/pages/03.jpg", alt: "Book preview, interior spread", preview: true },
  { src: "/book/pages/04.jpg", alt: "Book preview, interior spread", preview: true },
  { src: "/book/pages/05.jpg", alt: "Book preview, The Great Wave", preview: true },
] as const;

function Strip({
  index,
  drag,
  dragging,
  large,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  index: number;
  drag: number;
  dragging: boolean;
  large?: boolean;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  const slide = SLIDES[index] ?? SLIDES[0];
  return (
    <div
      className={cn("relative cursor-grab overflow-hidden bg-black active:cursor-grabbing", large && "rounded-lg")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="flex touch-pan-y"
        style={{
          transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)`,
          transition: dragging ? "none" : "transform 280ms ease",
        }}
      >
        {SLIDES.map((item) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            draggable={false}
            width={864}
            height={864}
            className={cn(
              "w-full shrink-0 select-none object-contain",
              large && "max-h-[88vh]",
            )}
          />
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

type Props = { className?: string };

export function BookPreview({ className }: Props) {
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
      else if (!moved.current && enlargeOnTap) setOpen(true);
    },
  });

  const banner = bind(true);
  const viewer = bind(false);

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label="Book preview">
      <Strip index={index} drag={open ? 0 : drag} dragging={open ? false : dragging} {...banner} />
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
