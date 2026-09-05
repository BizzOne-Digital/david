import mongoose, { Schema, Document, Model } from "mongoose";
import type { OrderStatus, PaymentStatus } from "@/types";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  productName: string;
  productSlug: string;
  sku?: string;
  quantity: number;
  unitPriceCents: number;
  totalPriceCents: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  dealership: string;
  email: string;
  phone: string;
  billingAddress?: string;
  items: IOrderItem[];
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  couponCode?: string;
  orderNotes?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: string;
  internalNotes?: string;
  consentGiven: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  productSlug: { type: String, required: true },
  sku: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  unitPriceCents: { type: Number, required: true, min: 0 },
  totalPriceCents: { type: Number, required: true, min: 0 },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    dealership: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    billingAddress: { type: String },
    items: [OrderItemSchema],
    subtotalCents: { type: Number, required: true, min: 0 },
    discountCents: { type: Number, default: 0, min: 0 },
    taxCents: { type: Number, default: 0, min: 0 },
    totalCents: { type: Number, required: true, min: 0 },
    couponCode: { type: String },
    orderNotes: { type: String },
    status: {
      type: String,
      enum: ["new", "pending", "awaiting_payment", "paid", "processing", "completed", "cancelled", "refunded"],
      default: "new",
    },
    paymentStatus: {
      type: String,
      enum: ["not_required", "unpaid", "pending", "paid", "failed", "refunded"],
      default: "not_required",
    },
    stripePaymentIntentId: { type: String },
    internalNotes: { type: String },
    consentGiven: { type: Boolean, required: true },
  },
  { timestamps: true }
);

OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ email: 1 });

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
