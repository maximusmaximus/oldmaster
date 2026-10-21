import { ipfsGatewayUrl } from "./ipfs";

export { IPFS_GATEWAY_HOST as PINATA_GATEWAY_HOST, ipfsGatewayUrl as pinataGatewayUrl } from "./ipfs";

type PinataUpload = {
  cid: string;
  id?: string;
  name: string;
};

async function readSecret(name: string): Promise<string> {
  if (typeof window !== "undefined") return "";
  try {
    const { readFile } = await import("node:fs/promises");
    const raw = await readFile(`/workspace/.grok/secrets/${name}`, "utf8");
    if (raw.trim()) return raw.trim();
  } catch {
    /* env fallback */
  }
  return "";
}

async function pinataJwt(): Promise<string> {
  const file = await readSecret("pinata-jwt");
  if (file) return file;
  return (
    (typeof process !== "undefined" &&
      (process.env.PINATA_JWT || process.env.PINATA_TOKEN || "")) ||
    ""
  );
}

async function pinataKeyPair(): Promise<{ key: string; secret: string }> {
  const key =
    (await readSecret("pinata-api-key")) ||
    (typeof process !== "undefined" ? process.env.PINATA_API_KEY || "" : "");
  const secret =
    (await readSecret("pinata-api-secret")) ||
    (typeof process !== "undefined" ? process.env.PINATA_SECRET_API_KEY || "" : "");
  return { key, secret };
}

function authHeaders(token: string, pair: { key: string; secret: string }): Record<string, string> {
  if (token) return { Authorization: `Bearer ${token}` };
  if (pair.key && pair.secret) {
    return { pinata_api_key: pair.key, pinata_secret_api_key: pair.secret };
  }
  return {};
}

async function gatewayToken(): Promise<string> {
  const file = await readSecret("pinata-gateway-token");
  if (file) return file;
  return (
    (typeof process !== "undefined" && process.env.PINATA_GATEWAY_TOKEN) || ""
  );
}

export async function pinataUploadFile(input: {
  name: string;
  bytes: Uint8Array | Buffer;
  mime: string;
  keyvalues?: Record<string, string>;
}): Promise<PinataUpload | null> {
  const token = await pinataJwt();
  const pair = await pinataKeyPair();
  if (!token && !(pair.key && pair.secret)) return null;

  const copy = Buffer.from(input.bytes);
  const blob = new Blob([copy], { type: input.mime });
  const file = new File([blob], input.name, { type: input.mime });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const form = new FormData();
    form.set("network", "public");
    form.set("file", file);
    form.set("name", input.name);
    if (input.keyvalues) form.set("keyvalues", JSON.stringify(input.keyvalues));

    try {
      const res = await fetch("https://uploads.pinata.cloud/v3/files", {
        method: "POST",
        headers: authHeaders(token, pair),
        body: form,
      });
      if (res.ok) {
        const json = (await res.json()) as {
          data?: { cid?: string; id?: string; name?: string };
          cid?: string;
        };
        const cid = json.data?.cid || json.cid;
        if (cid) return { cid, id: json.data?.id, name: json.data?.name || input.name };
      }
      const legacy = await pinLegacy(token, pair, file, input.name, input.keyvalues);
      if (legacy) return legacy;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  return null;
}

async function pinLegacy(
  token: string,
  pair: { key: string; secret: string },
  file: File,
  name: string,
  keyvalues?: Record<string, string>,
): Promise<PinataUpload | null> {
  const form = new FormData();
  form.set("file", file, name);
  form.set(
    "pinataMetadata",
    JSON.stringify({
      name,
      keyvalues: keyvalues ?? {},
    }),
  );
  form.set("pinataOptions", JSON.stringify({ cidVersion: 1 }));
  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: authHeaders(token, pair),
    body: form,
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { IpfsHash?: string };
  if (!json.IpfsHash) return null;
  return { cid: json.IpfsHash, name };
}

export async function pinFanArtwork(input: {
  id: string;
  title: string;
  emojiText: string;
  jpeg: Uint8Array | Buffer;
  video?: Uint8Array | Buffer;
  videoMime?: string;
}): Promise<{ emojiCid?: string; jpegCid?: string; videoCid?: string } | null> {
  const meta = {
    fanId: input.id,
    title: input.title,
    kind: input.video ? "emoji-clip" : "emoji-new-master",
  };
  const jobs = [
    pinataUploadFile({
      name: `${input.id}-emoji.txt`,
      bytes: Buffer.from(input.emojiText, "utf8"),
      mime: "text/plain; charset=utf-8",
      keyvalues: { ...meta, file: "emoji" },
    }),
    pinataUploadFile({
      name: `${input.id}-mosaic.jpg`,
      bytes: input.jpeg,
      mime: "image/jpeg",
      keyvalues: { ...meta, file: "jpeg" },
    }),
  ];
  const [emoji, jpeg] = await Promise.all(jobs);
  let videoCid: string | undefined;
  if (input.video) {
    try {
      const ext = (input.videoMime ?? "").includes("mp4") ? "mp4" : "webm";
      const video = await pinataUploadFile({
        name: `${input.id}-clip.${ext}`,
        bytes: input.video,
        mime: input.videoMime || "video/webm",
        keyvalues: { ...meta, file: "video" },
      });
      videoCid = video?.cid;
    } catch {
      videoCid = undefined;
    }
  }
  if (!emoji?.cid && !jpeg?.cid && !videoCid) return null;
  return {
    emojiCid: emoji?.cid,
    jpegCid: jpeg?.cid,
    videoCid,
  };
}

export async function pinSvgReel(input: {
  id: string;
  title: string;
  emojiText: string;
  jpeg: Uint8Array | Buffer;
  svg: Uint8Array | Buffer;
  frames?: Uint8Array | Buffer;
}): Promise<{
  emojiCid?: string;
  jpegCid?: string;
  svgCid?: string;
  framesCid?: string;
} | null> {
  const meta = {
    reelId: input.id,
    title: input.title,
    kind: "emoji-svg-reel",
  };
  const [emoji, jpeg, svg] = await Promise.all([
    pinataUploadFile({
      name: `${input.id}-emoji.txt`,
      bytes: Buffer.from(input.emojiText, "utf8"),
      mime: "text/plain; charset=utf-8",
      keyvalues: { ...meta, file: "emoji" },
    }),
    pinataUploadFile({
      name: `${input.id}-poster.jpg`,
      bytes: input.jpeg,
      mime: "image/jpeg",
      keyvalues: { ...meta, file: "jpeg" },
    }),
    pinataUploadFile({
      name: `${input.id}-reel.svg`,
      bytes: input.svg,
      mime: "image/svg+xml",
      keyvalues: { ...meta, file: "svg" },
    }),
  ]);
  let framesCid: string | undefined;
  if (input.frames) {
    try {
      const frames = await pinataUploadFile({
        name: `${input.id}-frames.json`,
        bytes: input.frames,
        mime: "application/json",
        keyvalues: { ...meta, file: "frames" },
      });
      framesCid = frames?.cid;
    } catch {
      framesCid = undefined;
    }
  }
  if (!emoji?.cid && !jpeg?.cid && !svg?.cid && !framesCid) return null;
  return {
    emojiCid: emoji?.cid,
    jpegCid: jpeg?.cid,
    svgCid: svg?.cid,
    framesCid,
  };
}

export async function fetchPinataBytes(cid: string): Promise<Buffer | null> {
  const token = await gatewayToken();
  const url = ipfsGatewayUrl(cid);
  const res = await fetch(url, {
    headers: token ? { "x-pinata-gateway-token": token } : {},
  });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}
