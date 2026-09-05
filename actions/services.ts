"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/connect";
import Service from "@/models/Service";
import { requireRole } from "@/lib/auth/session";
import { serviceSchema } from "@/lib/validation/schemas";
import { slugify } from "@/lib/utils";
import { deleteImage } from "@/lib/cloudinary/upload";
import type { ActionResult } from "@/actions/auth";

export async function createServiceAction(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    const parsed = serviceSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const slug = parsed.data.slug || slugify(parsed.data.title);
    const existing = await Service.findOne({ slug });
    if (existing) {
      return { success: false, error: "A service with this slug already exists" };
    }

    const service = await Service.create({ ...parsed.data, slug });
    revalidatePath("/services");
    return { success: true, data: { id: service._id.toString() } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create service",
    };
  }
}

export async function updateServiceAction(
  id: string,
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    const parsed = serviceSchema.partial().safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const service = await Service.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!service) {
      return { success: false, error: "Service not found" };
    }

    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update service",
    };
  }
}

export async function deleteServiceAction(id: string): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const service = await Service.findById(id);
    if (!service) {
      return { success: false, error: "Service not found" };
    }

    if (service.image?.publicId) {
      await deleteImage(service.image.publicId);
    }

    await service.deleteOne();
    revalidatePath("/services");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete service",
    };
  }
}

export async function getServiceByIdAction(id: string): Promise<ActionResult<unknown>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const service = await Service.findById(id).lean();
    if (!service) return { success: false, error: "Service not found" };
    return { success: true, data: JSON.parse(JSON.stringify(service)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch service",
    };
  }
}

export async function getServicesAdminAction(): Promise<ActionResult<unknown[]>> {
  try {
    await requireRole("super_admin", "admin", "content_manager");
    await connectDB();
    const services = await Service.find()
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    return { success: true, data: JSON.parse(JSON.stringify(services)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch services",
    };
  }
}
