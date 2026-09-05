"use server";

import connectDB from "@/lib/db/connect";
import MediaAsset from "@/models/MediaAsset";
import { revalidatePath } from "next/cache";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
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
    await connectDB();
    await MediaAsset.findByIdAndDelete(id);
    revalidatePath("/admin/media");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete media asset." };
  }
}

export async function uploadMediaAsset(formData: FormData): Promise<ActionResult> {
  try {
    await connectDB();

    const url = String(formData.get("url") ?? "").trim();
    const publicId = String(formData.get("publicId") ?? "").trim();
    const filename = String(formData.get("filename") ?? "").trim();
    const mimeType = String(formData.get("mimeType") ?? "image/jpeg").trim();
    const size = parseInt(String(formData.get("size") ?? "0"), 10) || 0;

    if (!url || !publicId || !filename) {
      return { success: false, error: "Missing required upload fields." };
    }

    const asset = await MediaAsset.create({
      url,
      publicId,
      filename,
      mimeType,
      size,
      alt: String(formData.get("alt") ?? "") || undefined,
    });

    revalidatePath("/admin/media");
    return { success: true, id: asset._id.toString() };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload media.";
    return { success: false, error: message };
  }
}
