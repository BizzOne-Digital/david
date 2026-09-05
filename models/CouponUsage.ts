import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICouponUsage extends Document {
  coupon: mongoose.Types.ObjectId;
  order?: mongoose.Types.ObjectId;
  customerEmail: string;
  discountCents: number;
  createdAt: Date;
}

const CouponUsageSchema = new Schema<ICouponUsage>(
  {
    coupon: { type: Schema.Types.ObjectId, ref: "Coupon", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    customerEmail: { type: String, required: true, lowercase: true },
    discountCents: { type: Number, required: true, min: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

CouponUsageSchema.index({ coupon: 1, customerEmail: 1 });

const CouponUsage: Model<ICouponUsage> =
  mongoose.models.CouponUsage ||
  mongoose.model<ICouponUsage>("CouponUsage", CouponUsageSchema);

export default CouponUsage;
