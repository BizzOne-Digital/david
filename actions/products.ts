"use server";

import { revalidatePath, updateTag } from "next/cache";
import connectDB from "@/lib/db/connect";
import Product from "@/models/Product";
import { requireRole } from "@/lib/auth/session";
import { productSchema } from "@/lib/validation/schemas";
import { slugify } from "@/lib/utils";
import { deleteImage } from "@/lib/cloudinary/upload";
import type { ActionResult } from "@/actions/auth";

export async function createProductAction(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    const parsed = productSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const slug = parsed.data.slug || slugify(parsed.data.name);

    const existing = await Product.findOne({ slug });
    if (existing) {
      return { success: false, error: "A product with this slug already exists" };
    }

    const product = await Product.create({ ...parsed.data, slug });
    revalidatePath("/products");
    updateTag("products");

    return { success: true, data: { id: product._id.toString() } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

export async function updateProductAction(
  id: string,
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    const parsed = productSchema.partial().safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const product = await Product.findByIdAndUpdate(id, parsed.data, { new: true });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    updateTag("products");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();

    const product = await Product.findById(id);
    if (!product) {
      return { success: false, error: "Product not found" };
    }

    if (product.coverImage?.publicId) {
      await deleteImage(product.coverImage.publicId);
    }
    for (const img of product.gallery) {
      if (img.publicId) await deleteImage(img.publicId);
    }

    await product.deleteOne();
    revalidatePath("/products");
    updateTag("products");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

export async function getProductByIdAction(id: string): Promise<ActionResult<unknown>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const product = await Product.findById(id).populate("category").lean();
    if (!product) return { success: false, error: "Product not found" };
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch product",
    };
  }
}

export async function getProductsAdminAction(): Promise<ActionResult<unknown[]>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const products = await Product.find()
      .populate("category", "name slug")
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    return { success: true, data: JSON.parse(JSON.stringify(products)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch products",
    };
  }
}
