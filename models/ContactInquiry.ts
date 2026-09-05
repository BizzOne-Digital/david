import mongoose, { Schema, Document, Model } from "mongoose";
import type { InquiryStatus } from "@/types";

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  dealership?: string;
  inquiryType: string;
  productInterest?: string;
  message: string;
  consentGiven: boolean;
  status: InquiryStatus;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    dealership: { type: String },
    inquiryType: { type: String, required: true },
    productInterest: { type: String },
    message: { type: String, required: true },
    consentGiven: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "closed"],
      default: "new",
    },
    internalNotes: { type: String },
  },
  { timestamps: true }
);

ContactInquirySchema.index({ status: 1, createdAt: -1 });
ContactInquirySchema.index({ email: 1 });

const ContactInquiry: Model<IContactInquiry> =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);

export default ContactInquiry;
