"use server";

import { revalidatePath, updateTag } from "next/cache";
import connectDB from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";
import { requireRole } from "@/lib/auth/session";
import { siteSettingsSchema } from "@/lib/validation/schemas";
import type { ActionResult } from "@/actions/auth";

export async function updateSiteSettingsAction(
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    const parsed = siteSettingsSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    await SiteSettings.findOneAndUpdate(
      {},
      { $set: parsed.data },
      { upsert: true, new: true }
    );

    updateTag("site-settings");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update settings",
    };
  }
}

export async function getSiteSettingsAdminAction(): Promise<ActionResult<unknown>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    return { success: true, data: JSON.parse(JSON.stringify(settings)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch settings",
    };
  }
}
