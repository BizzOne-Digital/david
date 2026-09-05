import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageContent extends Document {
  pageSlug: string;
  pageTitle: string;
  seoTitle?: string;
  seoDescription?: string;
  sections: {
    id: string;
    type: string;
    title?: string;
    subtitle?: string;
    content?: string;
    eyebrow?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    items?: Record<string, unknown>[];
    isVisible: boolean;
    order: number;
  }[];
  faqs?: { question: string; answer: string; order: number }[];
  updatedAt: Date;
}

const SectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    title: String,
    subtitle: String,
    content: String,
    eyebrow: String,
    ctaLabel: String,
    ctaUrl: String,
    items: { type: [Schema.Types.Mixed], default: undefined },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const PageContentSchema = new Schema<IPageContent>(
  {
    pageSlug: { type: String, required: true, unique: true },
    pageTitle: { type: String, required: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    sections: { type: [SectionSchema], default: [] },
    faqs: [{
      question: String,
      answer: String,
      order: Number,
    }],
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

PageContentSchema.index({ pageSlug: 1 });

const PageContent: Model<IPageContent> =
  mongoose.models.PageContent ||
  mongoose.model<IPageContent>("PageContent", PageContentSchema);

export default PageContent;
