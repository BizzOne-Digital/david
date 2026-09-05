"use server";

import connectDB from "@/lib/db/connect";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import { newsletterSchema } from "@/lib/validation/schemas";
import { rateLimit } from "@/lib/security";
import type { ActionResult } from "@/actions/auth";

export async function subscribeNewsletterAction(
  data: unknown
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid email address",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const limit = rateLimit(`newsletter:${parsed.data.email}`, 3, 3600000);
  if (!limit.success) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  await connectDB();
  const email = parsed.data.email.toLowerCase();

  const existing = await NewsletterSubscriber.findOne({ email });
  if (existing) {
    if (!existing.isActive) {
      existing.isActive = true;
      existing.subscribedAt = new Date();
      await existing.save();
    }
    return { success: true };
  }

  await NewsletterSubscriber.create({ email });
  return { success: true };
}

export async function unsubscribeNewsletterAction(
  email: string
): Promise<ActionResult> {
  await connectDB();
  await NewsletterSubscriber.findOneAndUpdate(
    { email: email.toLowerCase() },
    { isActive: false }
  );
  return { success: true };
}
