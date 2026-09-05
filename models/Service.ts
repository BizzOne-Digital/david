import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  image?: { url: string; publicId: string; alt?: string };
  features: string[];
  displayOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  ctaLabel: string;
  ctaUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPlaceholder: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    icon: { type: String, default: "Zap" },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    image: { url: String, publicId: String, alt: String },
    features: [{ type: String }],
    displayOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ctaLabel: { type: String, default: "Learn More" },
    ctaUrl: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    isPlaceholder: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ isActive: 1, displayOrder: 1 });

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
