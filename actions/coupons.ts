"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/connect";
import Coupon from "@/models/Coupon";
import { requireRole } from "@/lib/auth/session";
import { couponSchema, validateCouponSchema } from "@/lib/validation/schemas";
import { validateCoupon } from "@/lib/discounts/calculate";
import type { ActionResult } from "@/actions/auth";

export async function createCouponAction(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireRole("super_admin", "admin");
    const parsed = couponSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const code = parsed.data.code.toUpperCase();
    const existing = await Coupon.findOne({ code });
    if (existing) {
      return { success: false, error: "Coupon code already exists" };
    }

    const coupon = await Coupon.create({ ...parsed.data, code });
    revalidatePath("/admin/coupons");
    return { success: true, data: { id: coupon._id.toString() } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create coupon",
    };
  }
}

export async function updateCouponAction(
  id: string,
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    const parsed = couponSchema.partial().safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const updateData = { ...parsed.data };
    if (updateData.code) {
      updateData.code = updateData.code.toUpperCase();
    }

    const coupon = await Coupon.findByIdAndUpdate(id, updateData, { new: true });
    if (!coupon) {
      return { success: false, error: "Coupon not found" };
    }

    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update coupon",
    };
  }
}

export async function deleteCouponAction(id: string): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return { success: false, error: "Coupon not found" };
    }
    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete coupon",
    };
  }
}

export async function validateCouponAction(
  data: unknown
): Promise<ActionResult<{ discountCents: number; code: string }>> {
  const parsed = validateCouponSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid coupon data",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const result = await validateCoupon(parsed.data);

  if (!result.valid) {
    return { success: false, error: result.error ?? "Invalid coupon" };
  }

  return {
    success: true,
    data: {
      discountCents: result.discountCents ?? 0,
      code: result.code ?? parsed.data.code,
    },
  };
}

export async function getCouponByIdAction(id: string): Promise<ActionResult<unknown>> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const coupon = await Coupon.findById(id).lean();
    if (!coupon) return { success: false, error: "Coupon not found" };
    return { success: true, data: JSON.parse(JSON.stringify(coupon)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch coupon",
    };
  }
}

export async function getCouponsAdminAction(): Promise<ActionResult<unknown[]>> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(coupons)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch coupons",
    };
  }
}
