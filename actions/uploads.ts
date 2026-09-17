"use server";

import { requireRole } from "@/lib/auth/session";
import { deleteStoredUploadByUrl } from "@/lib/uploads/stored-uploads";
import type { ActionResult } from "@/actions/auth";

export async function deleteStoredUploadByUrlAction(url: string): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await deleteStoredUploadByUrl(url);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete upload",
    };
  }
}
