import { useEffect, useRef, useState, type ReactNode } from "react";

function columnCount(width: number): number {
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 640) return 2;
  return 1;
}

export function VirtualGrid<T>({
  items,
  render,
  overscan = 3,
}: {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  overscan?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(1);
  const [range, setRange] = useState({ start: 0, end: 12 });
  const [rowH, setRowH] = useState(320);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth || window.innerWidth;
      const nextCols = columnCount(width);
      setCols(nextCols);
      const gap = width >= 640 ? 16 : 12;
      const cell = Math.max(160, (width - gap * (nextCols - 1)) / nextCols);
      setRowH(cell + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const viewTop = window.scrollY;
      const viewBottom = viewTop + window.innerHeight;
      const startRow = Math.max(0, Math.floor((viewTop - top) / rowH) - overscan);
      const endRow = Math.ceil((viewBottom - top) / rowH) + overscan;
      const start = startRow * cols;
      const end = Math.min(items.length, Math.max(start + cols, endRow * cols));
      setRange((prev) =>
        prev.start === start && prev.end === end ? prev : { start, end },
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [cols, rowH, items.length, overscan]);

  const start = Math.min(range.start, items.length);
  const end = Math.min(range.end, items.length);
  const padTop = Math.floor(start / cols) * rowH;
  const rowsAfter = Math.ceil((items.length - end) / cols);
  const padBottom = Math.max(0, rowsAfter * rowH);
  const slice = items.slice(start, end);

  return (
    <div ref={ref} style={{ paddingTop: padTop, paddingBottom: padBottom }}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {slice.map((item, i) => render(item, start + i))}
      </div>
    </div>
  );
}