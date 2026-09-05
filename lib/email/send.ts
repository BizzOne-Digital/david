import nodemailer from "nodemailer";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export interface SendEmailResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

function isSmtpConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendEmail(
  options: SendEmailOptions
): Promise<SendEmailResult> {
  if (!isSmtpConfigured()) {
    console.warn(
      "[email] SMTP not configured. Skipping email:",
      options.subject,
      "→",
      options.to
    );
    return { sent: false, error: "SMTP not configured" };
  }

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"Rethink Automotive" <${process.env.SMTP_USER}>`,
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    return { sent: true, messageId: info.messageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error("[email] Failed to send:", message);
    return { sent: false, error: message };
  }
}

export async function sendToContactReceiver(
  options: Omit<SendEmailOptions, "to">
): Promise<SendEmailResult> {
  const receiver =
    process.env.CONTACT_RECEIVER_EMAIL ||
    process.env.SMTP_USER ||
    process.env.ADMIN_EMAIL;

  if (!receiver) {
    console.warn("[email] No contact receiver email configured");
    return { sent: false, error: "No receiver configured" };
  }

  return sendEmail({ ...options, to: receiver });
}
