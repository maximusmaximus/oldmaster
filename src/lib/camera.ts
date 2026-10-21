export const CLIP_MS = 12_000;
export const LIVE_FPS = 20;
export const DEFAULT_LIVE_DENSITY = 48;
export const DEFAULT_LIVE_DENSITY_DESKTOP = 64;
export const LIVE_DENSITY_STEPS = [24, 32, 40, 48, 64] as const;
export const LIVE_DENSITY_STEPS_DESKTOP = [32, 40, 48, 64, 80, 96, 128, 160, 192, 224, 256] as const;
export const LIVE_DENSITY_KEY = "eom-live-density";

export function isDesktopLive(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine) and (min-width: 900px)").matches;
}

export function liveDensitySteps(): readonly number[] {
  return isDesktopLive() ? LIVE_DENSITY_STEPS_DESKTOP : LIVE_DENSITY_STEPS;
}

export function liveFpsFor(density: number): number {
  if (density >= 224) return 8;
  if (density >= 160) return 10;
  if (density >= 128) return 12;
  if (density >= 96) return 16;
  return LIVE_FPS;
}

export function defaultLiveDensity(): number {
  return isDesktopLive() ? DEFAULT_LIVE_DENSITY_DESKTOP : DEFAULT_LIVE_DENSITY;
}

export function isLiveDensity(value: number, steps = liveDensitySteps()): boolean {
  return steps.includes(value);
}

export function readLiveDensity(): number {
  const steps = liveDensitySteps();
  const fallback = defaultLiveDensity();
  try {
    const raw = Number(localStorage.getItem(LIVE_DENSITY_KEY));
    if (isLiveDensity(raw, steps)) return raw;
  } catch {
    /* private mode */
  }
  return fallback;
}

export function writeLiveDensity(value: number) {
  if (!Number.isFinite(value)) return;
  try {
    localStorage.setItem(LIVE_DENSITY_KEY, String(value));
  } catch {
    /* private mode */
  }
}

export function pickRecorderMime(): string {
  if (typeof MediaRecorder === "undefined") return "";
  const ios =
    typeof navigator !== "undefined" &&
    (/iP(hone|ad|od)/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
  const types = ios
    ? ["video/mp4", "video/mp4;codecs=avc1.42E01E", "video/webm"]
    : [
        "video/webm;codecs=vp8",
        "video/webm",
        "video/mp4;codecs=avc1.42E01E",
        "video/mp4",
        "video/webm;codecs=vp9",
      ];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

export function isIosLive(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function requestFullscreenEl(el?: HTMLElement | null) {
  if (!el || typeof document === "undefined") return;
  if (document.fullscreenElement === el) return;
  const node = el as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
  const req = node.requestFullscreen?.bind(node) ?? node.webkitRequestFullscreen?.bind(node);
  if (req) void Promise.resolve(req()).catch(() => undefined);
}

export function exitFullscreenSafe() {
  if (typeof document === "undefined") return;
  const doc = document as Document & { webkitExitFullscreen?: () => void };
  try {
    if (document.fullscreenElement) void document.exitFullscreen();
    else doc.webkitExitFullscreen?.();
  } catch {
    /* ignore */
  }
}

export const MAX_CLIP_BYTES = 2_400_000;

export function videoExt(mime: string): string {
  return mime.includes("mp4") ? "mp4" : "webm";
}

export async function blobToBase64(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
