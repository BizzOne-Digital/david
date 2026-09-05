import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMediaAsset extends Document {
  url: string;
  publicId: string;
  filename: string;
  alt?: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true, unique: true },
    filename: { type: String, required: true },
    alt: { type: String },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    width: { type: Number },
    height: { type: Number },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

MediaAssetSchema.index({ publicId: 1 });
MediaAssetSchema.index({ filename: "text" });

const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset ||
  mongoose.model<IMediaAsset>("MediaAsset", MediaAssetSchema);

export default MediaAsset;
