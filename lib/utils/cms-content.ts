/** Ignore stale MongoDB CMS strings that still contain editor placeholders. */

export function isPlaceholderContent(value?: string | null): boolean {
  if (!value?.trim()) return true;
  return /\[PLACEHOLDER\]/i.test(value);
}

export function resolveCmsText(cmsValue: string | undefined, fallback: string): string {
  if (isPlaceholderContent(cmsValue)) return fallback;
  return cmsValue!.trim();
}
