"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/connect";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Coupon from "@/models/Coupon";
import CouponUsage from "@/models/CouponUsage";
import { requireRole } from "@/lib/auth/session";
import { createOrderSchema, updateOrderSchema } from "@/lib/validation/schemas";
import { getProductSalePrice, validateCoupon } from "@/lib/discounts/calculate";
import { calculateOrderTotals } from "@/lib/utils/money";
import { getSiteSettings } from "@/lib/data/settings";
import { generateOrderNumber } from "@/lib/utils";
import { sendToContactReceiver, sendEmail } from "@/lib/email/send";
import { orderEmailTemplate } from "@/lib/email/templates";
import { rateLimit } from "@/lib/security";
import type { ActionResult } from "@/actions/auth";

export async function createOrderAction(
  data: unknown
): Promise<ActionResult<{ orderNumber: string }>> {
  const parsed = createOrderSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const limit = rateLimit(`order:${parsed.data.email}`, 5, 3600000);
  if (!limit.success) {
    return { success: false, error: "Too many orders. Please try again later." };
  }

  await connectDB();
  const settings = await getSiteSettings();

  if (!settings.purchasingEnabled) {
    return { success: false, error: "Online purchasing is not currently available" };
  }

  const orderItems = [];
  let subtotalCents = 0;
  const productIds: string[] = [];
  const categoryIds: string[] = [];

  for (const item of parsed.data.items) {
    const product = await Product.findById(item.productId);
    if (!product || !product.isActive) {
      return { success: false, error: `Product not found: ${item.productId}` };
    }

    const pricing = getProductSalePrice(product);
    const unitPriceCents = pricing.salePriceCents ?? pricing.originalPriceCents ?? 0;

    if (unitPriceCents <= 0) {
      return { success: false, error: `Product "${product.name}" is not available for purchase` };
    }

    const totalPriceCents = unitPriceCents * item.quantity;
    subtotalCents += totalPriceCents;
    productIds.push(product._id.toString());
    if (product.category) categoryIds.push(product.category.toString());

    orderItems.push({
      productId: product._id,
      productName: product.name,
      productSlug: product.slug,
      sku: product.sku,
      quantity: item.quantity,
      unitPriceCents,
      totalPriceCents,
    });
  }

  let discountCents = 0;
  let couponCode: string | undefined;

  if (parsed.data.couponCode) {
    const couponResult = await validateCoupon({
      code: parsed.data.couponCode,
      subtotalCents,
      customerEmail: parsed.data.email,
      productIds,
      categoryIds,
    });

    if (!couponResult.valid) {
      return { success: false, error: couponResult.error ?? "Invalid coupon" };
    }

    discountCents = couponResult.discountCents ?? 0;
    couponCode = couponResult.code;
  }

  const totals = calculateOrderTotals(
    orderItems.map((i) => ({ unitPriceCents: i.unitPriceCents, quantity: i.quantity })),
    settings.taxRate ?? 0,
    discountCents
  );

  const orderNumber = generateOrderNumber();
  const order = await Order.create({
    orderNumber,
    customerName: parsed.data.customerName,
    dealership: parsed.data.dealership,
    email: parsed.data.email,
    phone: parsed.data.phone,
    billingAddress: parsed.data.billingAddress,
    items: orderItems,
    subtotalCents: totals.subtotalCents,
    discountCents: totals.discountCents,
    taxCents: totals.taxCents,
    totalCents: totals.totalCents,
    couponCode,
    orderNotes: parsed.data.orderNotes,
    consentGiven: parsed.data.consentGiven,
    status: "new",
    paymentStatus: settings.purchasingEnabled ? "unpaid" : "not_required",
  });

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode });
    if (coupon) {
      coupon.usageCount += 1;
      await coupon.save();
      await CouponUsage.create({
        coupon: coupon._id,
        order: order._id,
        customerEmail: parsed.data.email.toLowerCase(),
        discountCents: totals.discountCents,
      });
    }
  }

  const { subject, html } = orderEmailTemplate({
    orderNumber,
    customerName: parsed.data.customerName,
    email: parsed.data.email,
    items: orderItems.map((i) => ({
      productName: i.productName,
      quantity: i.quantity,
      totalPriceCents: i.totalPriceCents,
    })),
    subtotalCents: totals.subtotalCents,
    discountCents: totals.discountCents,
    taxCents: totals.taxCents,
    totalCents: totals.totalCents,
    currency: settings.currency,
  });

  await sendToContactReceiver({ subject, html, replyTo: parsed.data.email });
  await sendEmail({ to: parsed.data.email, subject, html });

  revalidatePath("/admin/orders");
  return { success: true, data: { orderNumber } };
}

export async function updateOrderAction(
  id: string,
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    const parsed = updateOrderSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const order = await Order.findByIdAndUpdate(id, parsed.data, { new: true });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update order",
    };
  }
}

export async function getOrdersAdminAction(): Promise<ActionResult<unknown[]>> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(orders)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch orders",
    };
  }
}

export async function getOrderByIdAction(id: string): Promise<ActionResult<unknown>> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const order = await Order.findById(id).lean();
    if (!order) return { success: false, error: "Order not found" };
    return { success: true, data: JSON.parse(JSON.stringify(order)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch order",
    };
  }
}
