"use server";

import connectDB from "@/lib/db/connect";
import MediaAsset from "@/models/MediaAsset";
import { requireRole } from "@/lib/auth/session";
import {
  ALLOWED_UPLOAD_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  saveStoredUpload,
  deleteStoredUploadByUrl,
} from "@/lib/uploads/stored-uploads";
import { revalidatePath } from "next/cache";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
  url?: string;
}

export async function getMediaAssets() {
  try {
    await connectDB();
    const assets = await MediaAsset.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(assets));
  } catch {
    return [];
  }
}

export async function deleteMediaAsset(id: string): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const asset = await MediaAsset.findById(id);
    if (asset) {
      await deleteStoredUploadByUrl(asset.url);
    }
    await MediaAsset.findByIdAndDelete(id);
    revalidatePath("/admin/media");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete media asset." };
  }
}

export async function uploadMediaAsset(formData: FormData): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    const file = formData.get("file");
    const alt = String(formData.get("alt") ?? "").trim() || undefined;

    if (!(file instanceof File)) {
      return { success: false, error: "Choose an image file to upload." };
    }

    if (!ALLOWED_UPLOAD_MIME_TYPES.includes(file.type as (typeof ALLOWED_UPLOAD_MIME_TYPES)[number])) {
      return { success: false, error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" };
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return { success: false, error: "File too large. Maximum size is 8MB" };
    }

    await connectDB();
    const buffer = Buffer.from(await file.arrayBuffer());
    const saved = await saveStoredUpload({
      folder: "gallery",
      buffer,
      mimeType: file.type,
      size: file.size,
    });

    const asset = await MediaAsset.create({
      url: saved.url,
      publicId: `${saved.folder}/${saved.filename}`,
      filename: saved.filename,
      mimeType: file.type,
      size: file.size,
      alt,
    });

    revalidatePath("/admin/media");
    return { success: true, id: asset._id.toString(), url: saved.url };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload media.";
    return { success: false, error: message };
  }
}
