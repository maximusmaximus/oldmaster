import { fanVideoSrc } from "@/lib/fan-works";

const OG_W = 1200;
const OG_H = 630;
const OG_BG = "#0c0b0a";

function finishVideo(
  video: HTMLVideoElement,
  resolve: (url: string | null) => void,
  settled: { current: boolean },
) {
  return (url: string | null) => {
    if (settled.current) return;
    settled.current = true;
    video.pause();
    video.removeAttribute("src");
    video.load();
    resolve(url);
  };
}

function frameFromVideo(video: HTMLVideoElement): string | null {
  if (!video.videoWidth) return null;
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0);
  try {
    return canvas.toDataURL("image/jpeg", 0.88);
  } catch {
    return null;
  }
}

export function grabVideoFrameAt(
  src: string,
  ratio = 0.5,
): Promise<string | null> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";
    const settled = { current: false };
    const done = finishVideo(video, resolve, settled);

    const grab = () => done(frameFromVideo(video));

    const seek = () => {
      const span =
        Number.isFinite(video.duration) && video.duration > 0.05
          ? video.duration
          : 1;
      const t = Math.min(span * 0.98, Math.max(0.04, span * ratio));
      const onSeeked = () => grab();
      video.addEventListener("seeked", onSeeked, { once: true });
      try {
        video.currentTime = t;
      } catch {
        grab();
      }
    };

    video.addEventListener("loadeddata", seek, { once: true });
    video.addEventListener("error", () => done(null), { once: true });
    window.setTimeout(() => done(null), 9000);
    video.src = src;
  });
}

export function grabClipMiddleFrame(id: string): Promise<string | null> {
  return grabVideoFrameAt(fanVideoSrc(id), 0.5);
}

export async function grabBlobMiddleFrame(blob: Blob): Promise<string | null> {
  const url = URL.createObjectURL(blob);
  try {
    return await grabVideoFrameAt(url, 0.5);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function jpegToDataUrl(jpeg: string): string {
  return jpeg.startsWith("data:") ? jpeg : `data:image/jpeg;base64,${jpeg}`;
}

export function dataUrlToJpeg(dataUrl: string): string {
  const i = dataUrl.indexOf(",");
  return i >= 0 ? dataUrl.slice(i + 1) : dataUrl;
}

export function letterboxOgDataUrl(jpeg: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = OG_W;
      canvas.height = OG_H;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("no canvas"));
        return;
      }
      ctx.fillStyle = OG_BG;
      ctx.fillRect(0, 0, OG_W, OG_H);
      const scale = Math.min(OG_W / img.width, OG_H / img.height);
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      ctx.drawImage(img, (OG_W - w) / 2, (OG_H - h) / 2, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.88));
    };
    img.onerror = () => reject(new Error("og preview failed"));
    img.src = jpegToDataUrl(jpeg);
  });
}