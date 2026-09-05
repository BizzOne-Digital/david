import mongoose, { Schema, Document, Model } from "mongoose";
import type { PurchaseMode } from "@/types";

export interface IProductImage {
  url: string;
  publicId: string;
  alt?: string;
  order: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  coverImage?: IProductImage;
  gallery: IProductImage[];
  features: string[];
  benefits: string[];
  priceCents?: number;
  compareAtPriceCents?: number;
  showPricing: boolean;
  contactForPricing: boolean;
  purchaseMode: PurchaseMode;
  externalCheckoutUrl?: string;
  category?: mongoose.Types.ObjectId;
  sku?: string;
  inventory?: number;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  onSale: boolean;
  saleDiscountType?: "percentage" | "fixed" | "custom_price";
  saleDiscountValue?: number;
  saleStartDate?: Date;
  saleEndDate?: Date;
  saleBadge?: string;
  saleMessage?: string;
  ctaLabel: string;
  ctaUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPlaceholder: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  alt: { type: String },
  order: { type: Number, default: 0 },
});

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    coverImage: ProductImageSchema,
    gallery: [ProductImageSchema],
    features: [{ type: String }],
    benefits: [{ type: String }],
    priceCents: { type: Number, min: 0 },
    compareAtPriceCents: { type: Number, min: 0 },
    showPricing: { type: Boolean, default: false },
    contactForPricing: { type: Boolean, default: true },
    purchaseMode: {
      type: String,
      enum: ["online_purchase", "request_quote", "contact_for_pricing", "book_consultation", "external_checkout"],
      default: "contact_for_pricing",
    },
    externalCheckoutUrl: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
    sku: { type: String },
    inventory: { type: Number, min: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    onSale: { type: Boolean, default: false },
    saleDiscountType: { type: String, enum: ["percentage", "fixed", "custom_price"] },
    saleDiscountValue: { type: Number, min: 0 },
    saleStartDate: { type: Date },
    saleEndDate: { type: Date },
    saleBadge: { type: String },
    saleMessage: { type: String },
    ctaLabel: { type: String, default: "Learn More" },
    ctaUrl: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    isPlaceholder: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.index({ slug: 1 });
ProductSchema.index({ isActive: 1, displayOrder: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isFeatured: 1 });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
