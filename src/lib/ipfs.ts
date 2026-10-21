export const IPFS_GATEWAY_HOST = "emoji.mypinata.cloud";
export const IPFS_PUBLIC_GATEWAY = "https://gateway.pinata.cloud/ipfs";

export type IpfsPins = {
  emojiCid?: string;
  jpegCid?: string;
  videoCid?: string;
  svgCid?: string;
  framesCid?: string;
};

export function ipfsUri(cid: string): string {
  return `ipfs://${cid}`;
}

export function ipfsGatewayUrl(cid: string): string {
  return `https://${IPFS_GATEWAY_HOST}/ipfs/${cid}`;
}

export function ipfsOpenUrl(cid: string): string {
  return `${IPFS_PUBLIC_GATEWAY}/${cid}`;
}

export function primaryCid(pins: IpfsPins): string {
  return pins.svgCid || pins.videoCid || pins.jpegCid || pins.emojiCid || pins.framesCid || "";
}

export function mediaCid(pins: IpfsPins): string {
  return pins.videoCid || pins.jpegCid || pins.svgCid || pins.emojiCid || pins.framesCid || "";
}

export function hasPins(pins?: IpfsPins | null): pins is IpfsPins {
  return Boolean(pins && primaryCid(pins));
}

export function mergePins(
  a?: IpfsPins | null,
  b?: IpfsPins | null,
): IpfsPins | null {
  const pins: IpfsPins = {
    emojiCid: a?.emojiCid || b?.emojiCid,
    jpegCid: a?.jpegCid || b?.jpegCid,
    videoCid: a?.videoCid || b?.videoCid,
    svgCid: a?.svgCid || b?.svgCid,
    framesCid: a?.framesCid || b?.framesCid,
  };
  return hasPins(pins) ? pins : null;
}