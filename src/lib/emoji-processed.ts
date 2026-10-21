export function isEmojiProcessed(text: string): boolean {
  const compact = text.replace(/\s+/g, "");
  if (compact.length >= 4) return true;
  return compact.length > 0 && /[^\u0000-\u007F]/.test(compact);
}
