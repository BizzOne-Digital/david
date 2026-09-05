"use server";

import { revalidatePath, updateTag } from "next/cache";
import connectDB from "@/lib/db/connect";
import PageContent from "@/models/PageContent";
import { requireRole } from "@/lib/auth/session";
import { pageContentSchema } from "@/lib/validation/schemas";
import { PAGE_PATHS } from "@/lib/utils/page-content";
import type { ActionResult } from "@/actions/auth";

export async function updatePageContentAction(
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    const parsed = pageContentSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    await PageContent.findOneAndUpdate(
      { pageSlug: parsed.data.pageSlug },
      { $set: parsed.data },
      { upsert: true, new: true }
    );

    const path =
      PAGE_PATHS[parsed.data.pageSlug] ?? `/${parsed.data.pageSlug}`;
    revalidatePath(path);
    updateTag(`page-content-${parsed.data.pageSlug}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update page content",
    };
  }
}

export async function getAllPageContentsAdminAction(): Promise<ActionResult<unknown[]>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const pages = await PageContent.find().sort({ pageSlug: 1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(pages)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch page contents",
    };
  }
}

export async function getPageContentAction(
  pageSlug: string
): Promise<ActionResult<unknown>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const content = await PageContent.findOne({ pageSlug }).lean();
    return { success: true, data: content ? JSON.parse(JSON.stringify(content)) : null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch page content",
    };
  }
}
