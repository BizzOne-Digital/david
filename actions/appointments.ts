"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/connect";
import Appointment from "@/models/Appointment";
import { requireRole } from "@/lib/auth/session";
import { appointmentSchema, updateAppointmentSchema } from "@/lib/validation/schemas";
import { sendToContactReceiver } from "@/lib/email/send";
import { appointmentEmailTemplate } from "@/lib/email/templates";
import { rateLimit } from "@/lib/security";
import type { ActionResult } from "@/actions/auth";

export async function submitAppointmentAction(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  const parsed = appointmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const limit = rateLimit(`appointment:${parsed.data.workEmail}`, 3, 3600000);
  if (!limit.success) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  await connectDB();
  const appointment = await Appointment.create(parsed.data);

  const { subject, html } = appointmentEmailTemplate({
    name: parsed.data.name,
    dealershipName: parsed.data.dealershipName,
    workEmail: parsed.data.workEmail,
    phone: parsed.data.phone,
    preferredDate: parsed.data.preferredDate,
    preferredTime: parsed.data.preferredTime,
    timezone: parsed.data.timezone,
    interestedIn: parsed.data.interestedIn,
    message: parsed.data.message,
  });

  await sendToContactReceiver({
    subject,
    html,
    replyTo: parsed.data.workEmail,
  });

  revalidatePath("/admin/appointments");
  return { success: true, data: { id: appointment._id.toString() } };
}

export async function updateAppointmentAction(
  id: string,
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    const parsed = updateAppointmentSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const appointment = await Appointment.findByIdAndUpdate(id, parsed.data, { new: true });

    if (!appointment) {
      return { success: false, error: "Appointment not found" };
    }

    revalidatePath("/admin/appointments");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update appointment",
    };
  }
}

export async function getAppointmentByIdAction(id: string): Promise<ActionResult<unknown>> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const appointment = await Appointment.findById(id).lean();
    if (!appointment) return { success: false, error: "Appointment not found" };
    return { success: true, data: JSON.parse(JSON.stringify(appointment)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch appointment",
    };
  }
}

export async function getAppointmentsAdminAction(): Promise<ActionResult<unknown[]>> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const appointments = await Appointment.find()
      .sort({ preferredDate: -1, createdAt: -1 })
      .lean();
    return { success: true, data: JSON.parse(JSON.stringify(appointments)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch appointments",
    };
  }
}
