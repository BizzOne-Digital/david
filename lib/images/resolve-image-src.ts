import { DEFAULT_LOGO } from "@/components/layout/BrandLockup";

/** Fallback when legacy disk `/uploads/...` paths or missing URLs are used. */
export const IMAGE_PLACEHOLDER = DEFAULT_LOGO;

export function resolveImageSrc(url?: string | null): string {
  if (!url || !url.trim()) return IMAGE_PLACEHOLDER;
  const trimmed = url.trim();
  if (trimmed.startsWith("/uploads/")) return IMAGE_PLACEHOLDER;
  return trimmed;
}

export function isStoredUploadUrl(url?: string | null): boolean {
  return !!url?.startsWith("/api/uploads/");
}
