import mongoose, { Schema, Document, Model } from "mongoose";
import type { CouponDisplayLocation } from "@/types";

export interface ICoupon extends Document {
  code: string;
  title?: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderCents?: number;
  applicableProducts: mongoose.Types.ObjectId[];
  applicableCategories: mongoose.Types.ObjectId[];
  totalUsageLimit?: number;
  usageCount: number;
  usageLimitPerCustomer?: number;
  startDate?: Date;
  expiryDate?: Date;
  isActive: boolean;
  isPublic: boolean;
  displayLocations: CouponDisplayLocation[];
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    title: { type: String },
    description: { type: String },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    discountValue: { type: Number, required: true, min: 0 },
    minimumOrderCents: { type: Number, min: 0 },
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    applicableCategories: [{ type: Schema.Types.ObjectId, ref: "ProductCategory" }],
    totalUsageLimit: { type: Number, min: 1 },
    usageCount: { type: Number, default: 0 },
    usageLimitPerCustomer: { type: Number, min: 1 },
    startDate: { type: Date },
    expiryDate: { type: Date },
    isActive: { type: Boolean, default: true },
    isPublic: { type: Boolean, default: false },
    displayLocations: [{
      type: String,
      enum: ["announcement_bar", "homepage_banner", "product_cards", "product_details", "cart", "checkout"],
    }],
  },
  { timestamps: true }
);

CouponSchema.index({ code: 1 });
CouponSchema.index({ isActive: 1, isPublic: 1 });

const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);

export default Coupon;
