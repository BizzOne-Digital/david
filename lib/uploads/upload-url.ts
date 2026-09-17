export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

export function buildStoredUploadUrl(folder: UploadFolder, filename: string): string {
  return `/api/uploads/${folder}/${filename}`;
}

export function parseStoredUploadUrl(
  url: string | null | undefined
): { folder: UploadFolder; filename: string } | null {
  if (!url || !url.startsWith("/api/uploads/")) return null;
  const rest = url.slice("/api/uploads/".length);
  const slash = rest.indexOf("/");
  if (slash <= 0) return null;
  const folder = rest.slice(0, slash);
  const filename = rest.slice(slash + 1);
  if (!isUploadFolder(folder)) return null;
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }
  return { folder, filename };
}

export function sanitizeUploadFilename(filename: string): string | null {
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }
  return filename;
}
