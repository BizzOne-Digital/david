import { randomBytes } from "crypto";
import connectDB from "@/lib/db/connect";
import StoredUpload from "@/models/StoredUpload";
import {
  buildStoredUploadUrl,
  isUploadFolder,
  type UploadFolder,
} from "@/lib/uploads/upload-url";

export {
  UPLOAD_FOLDERS,
  buildStoredUploadUrl,
  isUploadFolder,
  parseStoredUploadUrl,
  sanitizeUploadFilename,
  type UploadFolder,
} from "@/lib/uploads/upload-url";

export const ALLOWED_UPLOAD_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export function extensionForMime(mimeType: string): string {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

export function generateStoredFilename(mimeType: string): string {
  const ext = extensionForMime(mimeType);
  return `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
}

export async function saveStoredUpload(params: {
  folder: UploadFolder;
  buffer: Buffer;
  mimeType: string;
  size: number;
}): Promise<{ url: string; filename: string; folder: UploadFolder; size: number }> {
  await connectDB();
  const filename = generateStoredFilename(params.mimeType);
  await StoredUpload.create({
    folder: params.folder,
    filename,
    mimeType: params.mimeType,
    size: params.size,
    data: params.buffer,
  });
  return {
    url: buildStoredUploadUrl(params.folder, filename),
    filename,
    folder: params.folder,
    size: params.size,
  };
}

export async function deleteStoredUploadByUrl(url: string | null | undefined): Promise<void> {
  const { parseStoredUploadUrl } = await import("@/lib/uploads/upload-url");
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return;
  await connectDB();
  await StoredUpload.deleteOne({ folder: parsed.folder, filename: parsed.filename });
}

export async function getStoredUpload(
  folder: UploadFolder,
  filename: string
): Promise<{ mimeType: string; size: number; data: Buffer } | null> {
  await connectDB();
  const doc = await StoredUpload.findOne({ folder, filename }).select("mimeType size data").lean();
  if (!doc || !doc.data) return null;
  return {
    mimeType: doc.mimeType,
    size: doc.size,
    data: doc.data as Buffer,
  };
}
