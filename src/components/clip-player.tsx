import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ClipPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const goFull = () => {
    const box = boxRef.current;
    const video = videoRef.current as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    if (box && typeof box.requestFullscreen === "function") {
      void box.requestFullscreen().catch(() => {
        video?.webkitEnterFullscreen?.();
      });
      return;
    }
    video?.webkitEnterFullscreen?.();
  };

  return (
    <div ref={boxRef} className="relative bg-bg">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        aria-label={title}
        className="block w-full"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className={cn(
          "absolute top-1/2 left-1/2 z-10 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fg bg-bg/80 text-3xl text-fg shadow-lg transition-opacity duration-150",
          playing ? "opacity-0 hover:opacity-100 focus-visible:opacity-100" : "opacity-100",
        )}
      >
        <span aria-hidden="true">{playing ? "⏸️" : "▶️"}</span>
      </button>
      <button
        type="button"
        onClick={goFull}
        aria-label="Full screen"
        className="absolute right-2.5 bottom-2.5 z-10 rounded-full bg-bg/80 px-2.5 py-1 text-sm font-bold text-fg"
      >
        ⛶
      </button>
    </div>
  );
}
