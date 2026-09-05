import connectDB from "@/lib/db/connect";
import Coupon from "@/models/Coupon";
import CouponUsage from "@/models/CouponUsage";
import type { IProduct } from "@/models/Product";
import {
  calculateSalePrice,
  isSaleActive,
} from "@/lib/utils/money";

export interface ProductPricing {
  originalPriceCents: number | null;
  salePriceCents: number | null;
  isOnSale: boolean;
  discountPercentage: number;
}

export function getProductSalePrice(product: Pick<
  IProduct,
  | "priceCents"
  | "onSale"
  | "saleDiscountType"
  | "saleDiscountValue"
  | "saleStartDate"
  | "saleEndDate"
>): ProductPricing {
  const originalPriceCents = product.priceCents ?? null;

  if (originalPriceCents === null) {
    return {
      originalPriceCents: null,
      salePriceCents: null,
      isOnSale: false,
      discountPercentage: 0,
    };
  }

  const saleActive = isSaleActive(
    product.onSale,
    product.saleStartDate,
    product.saleEndDate
  );

  if (!saleActive || !product.saleDiscountType || product.saleDiscountValue == null) {
    return {
      originalPriceCents,
      salePriceCents: originalPriceCents,
      isOnSale: false,
      discountPercentage: 0,
    };
  }

  const salePriceCents = calculateSalePrice(
    originalPriceCents,
    product.saleDiscountType,
    product.saleDiscountValue
  );

  const discountPercentage =
    originalPriceCents > 0
      ? Math.round(((originalPriceCents - salePriceCents) / originalPriceCents) * 100)
      : 0;

  return {
    originalPriceCents,
    salePriceCents,
    isOnSale: true,
    discountPercentage,
  };
}

export interface CouponValidationResult {
  valid: boolean;
  error?: string;
  couponId?: string;
  code?: string;
  discountCents?: number;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
}

export interface ValidateCouponInput {
  code: string;
  subtotalCents: number;
  customerEmail?: string;
  productIds?: string[];
  categoryIds?: string[];
}

export async function validateCoupon(
  input: ValidateCouponInput
): Promise<CouponValidationResult> {
  await connectDB();

  const code = input.code.trim().toUpperCase();
  const coupon = await Coupon.findOne({ code, isActive: true });

  if (!coupon) {
    return { valid: false, error: "Invalid coupon code" };
  }

  const now = new Date();
  if (coupon.startDate && now < coupon.startDate) {
    return { valid: false, error: "This coupon is not yet active" };
  }
  if (coupon.expiryDate && now > coupon.expiryDate) {
    return { valid: false, error: "This coupon has expired" };
  }
  if (coupon.totalUsageLimit && coupon.usageCount >= coupon.totalUsageLimit) {
    return { valid: false, error: "This coupon has reached its usage limit" };
  }
  if (coupon.minimumOrderCents && input.subtotalCents < coupon.minimumOrderCents) {
    return {
      valid: false,
      error: `Minimum order of $${(coupon.minimumOrderCents / 100).toFixed(2)} required`,
    };
  }

  if (coupon.applicableProducts.length > 0 && input.productIds?.length) {
    const applicable = coupon.applicableProducts.map((id) => id.toString());
    const hasMatch = input.productIds.some((id) => applicable.includes(id));
    if (!hasMatch) {
      return { valid: false, error: "Coupon not applicable to selected products" };
    }
  }

  if (coupon.applicableCategories.length > 0 && input.categoryIds?.length) {
    const applicable = coupon.applicableCategories.map((id) => id.toString());
    const hasMatch = input.categoryIds.some((id) => applicable.includes(id));
    if (!hasMatch) {
      return { valid: false, error: "Coupon not applicable to selected categories" };
    }
  }

  if (coupon.usageLimitPerCustomer && input.customerEmail) {
    const usageCount = await CouponUsage.countDocuments({
      coupon: coupon._id,
      customerEmail: input.customerEmail.toLowerCase(),
    });
    if (usageCount >= coupon.usageLimitPerCustomer) {
      return { valid: false, error: "You have already used this coupon" };
    }
  }

  let discountCents = 0;
  if (coupon.discountType === "percentage") {
    discountCents = Math.round(input.subtotalCents * (coupon.discountValue / 100));
  } else {
    discountCents = coupon.discountValue;
  }
  discountCents = Math.min(discountCents, input.subtotalCents);

  return {
    valid: true,
    couponId: coupon._id.toString(),
    code: coupon.code,
    discountCents,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
  };
}

export function calculateCouponDiscount(
  subtotalCents: number,
  discountType: "percentage" | "fixed",
  discountValue: number
): number {
  let discountCents =
    discountType === "percentage"
      ? Math.round(subtotalCents * (discountValue / 100))
      : discountValue;
  return Math.min(discountCents, subtotalCents);
}
