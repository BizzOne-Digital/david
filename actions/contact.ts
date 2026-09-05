"use server";

import connectDB from "@/lib/db/connect";
import ContactInquiry from "@/models/ContactInquiry";
import { contactSchema } from "@/lib/validation/schemas";
import { sendToContactReceiver } from "@/lib/email/send";
import { contactEmailTemplate } from "@/lib/email/templates";
import { rateLimit } from "@/lib/security";
import type { ActionResult } from "@/actions/auth";

export async function submitContactAction(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const limit = rateLimit(`contact:${parsed.data.email}`, 5, 3600000);
  if (!limit.success) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  await connectDB();
  const inquiry = await ContactInquiry.create({
    ...parsed.data,
    inquiryType: "contact",
    dealership: undefined,
    productInterest: parsed.data.subject,
  });

  const { subject, html } = contactEmailTemplate(parsed.data);
  await sendToContactReceiver({
    subject,
    html,
    replyTo: parsed.data.email,
  });

  return { success: true, data: { id: inquiry._id.toString() } };
}
