"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/connect";
import ContactInquiry from "@/models/ContactInquiry";
import { requireRole } from "@/lib/auth/session";
import { inquirySchema, updateInquirySchema } from "@/lib/validation/schemas";
import { sendToContactReceiver } from "@/lib/email/send";
import { inquiryEmailTemplate } from "@/lib/email/templates";
import { rateLimit } from "@/lib/security";
import type { ActionResult } from "@/actions/auth";

export async function submitInquiryAction(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  const parsed = inquirySchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const limit = rateLimit(`inquiry:${parsed.data.email}`, 5, 3600000);
  if (!limit.success) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  await connectDB();
  const inquiry = await ContactInquiry.create(parsed.data);

  const { subject, html } = inquiryEmailTemplate(parsed.data);
  await sendToContactReceiver({
    subject,
    html,
    replyTo: parsed.data.email,
  });

  revalidatePath("/admin/inquiries");
  return { success: true, data: { id: inquiry._id.toString() } };
}

export async function updateInquiryAction(
  id: string,
  data: unknown
): Promise<ActionResult> {
  try {
    await requireRole("super_admin", "admin");
    const parsed = updateInquirySchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const inquiry = await ContactInquiry.findByIdAndUpdate(id, parsed.data, { new: true });

    if (!inquiry) {
      return { success: false, error: "Inquiry not found" };
    }

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update inquiry",
    };
  }
}

export async function getInquiryByIdAction(id: string): Promise<ActionResult<unknown>> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const inquiry = await ContactInquiry.findById(id).lean();
    if (!inquiry) return { success: false, error: "Inquiry not found" };
    return { success: true, data: JSON.parse(JSON.stringify(inquiry)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch inquiry",
    };
  }
}

export async function getInquiriesAdminAction(): Promise<ActionResult<unknown[]>> {
  try {
    await requireRole("super_admin", "admin");
    await connectDB();
    const inquiries = await ContactInquiry.find()
      .sort({ createdAt: -1 })
      .lean();
    return { success: true, data: JSON.parse(JSON.stringify(inquiries)) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch inquiries",
    };
  }
}
