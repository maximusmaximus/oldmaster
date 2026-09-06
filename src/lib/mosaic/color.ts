/** sRGB 0–255 → CIE Lab (D65). */
export function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  let sr = r / 255;
  let sg = g / 255;
  let sb = b / 255;
  sr = sr > 0.04045 ? ((sr + 0.055) / 1.055) ** 2.4 : sr / 12.92;
  sg = sg > 0.04045 ? ((sg + 0.055) / 1.055) ** 2.4 : sg / 12.92;
  sb = sb > 0.04045 ? ((sb + 0.055) / 1.055) ** 2.4 : sb / 12.92;
  const x = (sr * 0.4124564 + sg * 0.3575761 + sb * 0.1804375) / 0.95047;
  const y = sr * 0.2126729 + sg * 0.7151522 + sb * 0.072175;
  const z = (sr * 0.0193339 + sg * 0.119192 + sb * 0.9503041) / 1.08883;
  const fx = x > 0.008856 ? Math.cbrt(x) : 7.787 * x + 16 / 116;
  const fy = y > 0.008856 ? Math.cbrt(y) : 7.787 * y + 16 / 116;
  const fz = z > 0.008856 ? Math.cbrt(z) : 7.787 * z + 16 / 116;
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

export function labDist(
  a: [number, number, number],
  b: [number, number, number],
): number {
  const dl = a[0] - b[0];
  const da = a[1] - b[1];
  const db = a[2] - b[2];
  return dl * dl + da * da + db * db;
}