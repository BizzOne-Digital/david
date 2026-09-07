import { escapeHtml } from "@/lib/security";
import { formatDate, formatDateTime } from "@/lib/utils";
import { formatMoney } from "@/lib/utils/money";

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1f2937;
`;

function wrapHtml(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head>
<body style="${baseStyles} max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="border-bottom: 3px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 22px; color: #2563eb;">Rethink Automotive Inc.</h1>
  </div>
  ${body}
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0 16px;" />
  <p style="font-size: 12px; color: #6b7280;">This is an automated message. Please do not reply directly to this email.</p>
</body>
</html>`;
}

export function inquiryEmailTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  dealership?: string;
  inquiryType: string;
  productInterest?: string;
  message: string;
}): { subject: string; html: string } {
  const body = `
    <h2 style="margin-top: 0;">New Inquiry Received</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; font-weight: 600;">Name</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td>${escapeHtml(data.email)}</td></tr>
      ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: 600;">Phone</td><td>${escapeHtml(data.phone)}</td></tr>` : ""}
      ${data.dealership ? `<tr><td style="padding: 8px 0; font-weight: 600;">Dealership</td><td>${escapeHtml(data.dealership)}</td></tr>` : ""}
      <tr><td style="padding: 8px 0; font-weight: 600;">Type</td><td>${escapeHtml(data.inquiryType)}</td></tr>
      ${data.productInterest ? `<tr><td style="padding: 8px 0; font-weight: 600;">Product Interest</td><td>${escapeHtml(data.productInterest)}</td></tr>` : ""}
    </table>
    <h3>Message</h3>
    <p style="background: #f9fafb; padding: 16px; border-radius: 8px;">${escapeHtml(data.message)}</p>
  `;
  return {
    subject: `New Inquiry from ${data.name}`,
    html: wrapHtml("New Inquiry", body),
  };
}

export function appointmentEmailTemplate(data: {
  name: string;
  dealershipName: string;
  title?: string;
  workEmail: string;
  phone: string;
  preferredDate?: Date | string;
  preferredTime?: string;
  timezone?: string;
  interestedIn?: string;
  message?: string;
}): { subject: string; html: string } {
  const body = `
    <h2 style="margin-top: 0;">New Demo Request</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; font-weight: 600;">Name</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 600;">Dealership</td><td>${escapeHtml(data.dealershipName)}</td></tr>
      ${data.title ? `<tr><td style="padding: 8px 0; font-weight: 600;">Title</td><td>${escapeHtml(data.title)}</td></tr>` : ""}
      <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td>${escapeHtml(data.workEmail)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 600;">Phone</td><td>${escapeHtml(data.phone)}</td></tr>
      ${data.preferredDate ? `<tr><td style="padding: 8px 0; font-weight: 600;">Preferred Date</td><td>${formatDate(data.preferredDate)}</td></tr>` : ""}
      ${data.preferredTime ? `<tr><td style="padding: 8px 0; font-weight: 600;">Preferred Time</td><td>${escapeHtml(data.preferredTime)}${data.timezone ? ` (${escapeHtml(data.timezone)})` : ""}</td></tr>` : ""}
      ${data.interestedIn ? `<tr><td style="padding: 8px 0; font-weight: 600;">Interested In</td><td>${escapeHtml(data.interestedIn)}</td></tr>` : ""}
    </table>
    ${data.message ? `<h3>What They Want to Improve</h3><p style="background: #f9fafb; padding: 16px; border-radius: 8px;">${escapeHtml(data.message)}</p>` : ""}
  `;
  return {
    subject: `New Demo Request from ${data.name}`,
    html: wrapHtml("New Demo Request", body),
  };
}

export function orderEmailTemplate(data: {
  orderNumber: string;
  customerName: string;
  email: string;
  items: { productName: string; quantity: number; totalPriceCents: number }[];
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  currency?: string;
}): { subject: string; html: string } {
  const currency = data.currency ?? "USD";
  const itemRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(item.productName)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatMoney(item.totalPriceCents, currency)}</td>
        </tr>`
    )
    .join("");

  const body = `
    <h2 style="margin-top: 0;">Order Confirmation</h2>
    <p>Thank you, ${escapeHtml(data.customerName)}! Your order <strong>${escapeHtml(data.orderNumber)}</strong> has been received.</p>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="padding: 8px; text-align: left;">Product</th>
          <th style="padding: 8px; text-align: center;">Qty</th>
          <th style="padding: 8px; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>
    <table style="width: 100%; margin-top: 16px;">
      <tr><td style="text-align: right; padding: 4px;">Subtotal:</td><td style="text-align: right; padding: 4px; width: 100px;">${formatMoney(data.subtotalCents, currency)}</td></tr>
      ${data.discountCents > 0 ? `<tr><td style="text-align: right; padding: 4px;">Discount:</td><td style="text-align: right; padding: 4px;">-${formatMoney(data.discountCents, currency)}</td></tr>` : ""}
      <tr><td style="text-align: right; padding: 4px;">Tax:</td><td style="text-align: right; padding: 4px;">${formatMoney(data.taxCents, currency)}</td></tr>
      <tr style="font-weight: 700; font-size: 18px;"><td style="text-align: right; padding: 8px 4px;">Total:</td><td style="text-align: right; padding: 8px 4px;">${formatMoney(data.totalCents, currency)}</td></tr>
    </table>
    <p style="color: #6b7280; font-size: 14px;">Order placed on ${formatDateTime(new Date())}</p>
  `;
  return {
    subject: `Order Confirmation - ${data.orderNumber}`,
    html: wrapHtml("Order Confirmation", body),
  };
}

export function passwordResetEmailTemplate(data: {
  name: string;
  resetUrl: string;
}): { subject: string; html: string } {
  const body = `
    <h2 style="margin-top: 0;">Reset Your Password</h2>
    <p>Hi ${escapeHtml(data.name)},</p>
    <p>We received a request to reset your password. Click the button below to choose a new password. This link expires in 1 hour.</p>
    <p style="text-align: center; margin: 32px 0;">
      <a href="${escapeHtml(data.resetUrl)}" style="background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reset Password</a>
    </p>
    <p style="font-size: 14px; color: #6b7280;">If you didn't request this, you can safely ignore this email.</p>
    <p style="font-size: 12px; color: #9ca3af; word-break: break-all;">${escapeHtml(data.resetUrl)}</p>
  `;
  return {
    subject: "Reset Your Password - Rethink Automotive Admin",
    html: wrapHtml("Password Reset", body),
  };
}

export function contactEmailTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): { subject: string; html: string } {
  const body = `
    <h2 style="margin-top: 0;">New Contact Form Submission</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; font-weight: 600;">Name</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td>${escapeHtml(data.email)}</td></tr>
      ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: 600;">Phone</td><td>${escapeHtml(data.phone)}</td></tr>` : ""}
      ${data.subject ? `<tr><td style="padding: 8px 0; font-weight: 600;">Subject</td><td>${escapeHtml(data.subject)}</td></tr>` : ""}
    </table>
    <h3>Message</h3>
    <p style="background: #f9fafb; padding: 16px; border-radius: 8px;">${escapeHtml(data.message)}</p>
  `;
  return {
    subject: data.subject ? `Contact: ${data.subject}` : `Contact from ${data.name}`,
    html: wrapHtml("Contact Form", body),
  };
}
