import mongoose, { Schema, Document, Model } from "mongoose";
import type { AppointmentStatus } from "@/types";

export interface IAppointment extends Document {
  name: string;
  dealershipName: string;
  workEmail: string;
  phone: string;
  website?: string;
  numberOfLocations?: number;
  interestedIn?: string;
  preferredDate: Date;
  preferredTime: string;
  timezone: string;
  message?: string;
  consentGiven: boolean;
  status: AppointmentStatus;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    name: { type: String, required: true },
    dealershipName: { type: String, required: true },
    workEmail: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    website: { type: String },
    numberOfLocations: { type: Number, min: 1 },
    interestedIn: { type: String },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    timezone: { type: String, required: true },
    message: { type: String },
    consentGiven: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rescheduled", "completed", "cancelled"],
      default: "pending",
    },
    internalNotes: { type: String },
  },
  { timestamps: true }
);

AppointmentSchema.index({ status: 1, preferredDate: 1 });
AppointmentSchema.index({ workEmail: 1 });

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
