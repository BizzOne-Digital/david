import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: { url: string; publicId: string; alt?: string };
  displayOrder: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    image: {
      url: String,
      publicId: String,
      alt: String,
    },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

ProductCategorySchema.index({ slug: 1 });
ProductCategorySchema.index({ isActive: 1, displayOrder: 1 });

const ProductCategory: Model<IProductCategory> =
  mongoose.models.ProductCategory ||
  mongoose.model<IProductCategory>("ProductCategory", ProductCategorySchema);

export default ProductCategory;
