import { toast } from "sonner";

export function notifyAddedToFans(title?: string) {
  toast.success("Added to Fans", {
    description: title?.trim()
      ? `${title.trim()} is on the wall.`
      : "Your emoji mosaic is on the wall.",
    duration: 2800,
  });
}

export function notifyAddedSvgReel(title?: string) {
  toast.success("Added to Fans", {
    description: title?.trim()
      ? `${title.trim()} is on the wall — experimental SVG reel.`
      : "Your experimental SVG reel is on the Fans wall.",
    duration: 2800,
  });
}
