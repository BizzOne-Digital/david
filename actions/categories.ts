"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/connect";
import ProductCategory from "@/models/ProductCategory";
import { requireRole } from "@/lib/auth/session";
import { categorySchema } from "@/lib/validation/schemas";
import { slugify } from "@/lib/utils";
import { deleteImage } from "@/lib/cloudinary/upload";
import type { ActionResult } from "@/actions/auth";

export async function createCategoryAction(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    const parsed = categorySchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const slug = parsed.data.slug || slugify(parsed.data.name);
    const existing = await ProductCategory.findOne({ slug });
    if (existing) {
      return { success: false, error: "A category with this slug already exists" };
    }

    const category = await ProductCategory.create({ ...parsed.data, slug });
    revalidatePath("/products");
    return { success: true, data: { id: category._id.toString() } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create category",
    };
  }
}

export async function updateCategoryAction(
  id: string,
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    const parsed = categorySchema.partial().safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const category = await ProductCategory.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!category) {
      return { success: false, error: "Category not found" };
    }

    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update category",
    };
  }
}

export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const category = await ProductCategory.findById(id);
    if (!category) {
      return { success: false, error: "Category not found" };
    }

    if (category.image?.publicId) {
      await deleteImage(category.image.publicId);
    }

    await category.deleteOne();
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete category",
    };
  }
}

export async function getCategoriesAdminAction(): Promise<ActionResult<unknown[]>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const categories = await ProductCategory.find()
      .sort({ displayOrder: 1, name: 1 })
      .lean();
    return { success: true, data: JSON.parse(JSON.stringify(categories)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch categories",
    };
  }
}
