"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { signIn, signOut, getUserLockStatus } from "@/lib/auth/auth";
import connectDB from "@/lib/db/connect";
import User from "@/models/User";
import { sendEmail } from "@/lib/email/send";
import { passwordResetEmailTemplate } from "@/lib/email/templates";
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validation/schemas";
import { getSiteUrl } from "@/lib/utils";

export type ActionResult<T = void> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function loginAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid credentials",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { email, password } = parsed.data;

  const lockStatus = await getUserLockStatus(email);
  if (lockStatus.locked) {
    const minutes = lockStatus.lockUntil
      ? Math.ceil((lockStatus.lockUntil.getTime() - Date.now()) / 60000)
      : 15;
    return {
      success: false,
      error: `Account locked. Try again in ${minutes} minute(s).`,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      const lockStatusAfter = await getUserLockStatus(email);
      if (lockStatusAfter.locked) {
        return {
          success: false,
          error: "Too many failed attempts. Account locked for 15 minutes.",
        };
      }
      return { success: false, error: "Invalid email or password" };
    }
    throw error;
  }
}

export async function logoutAction(): Promise<ActionResult> {
  await signOut({ redirect: false });
  return { success: true };
}

export async function forgotPasswordAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid email address",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await connectDB();
  const user = await User.findOne({
    email: parsed.data.email.toLowerCase(),
    isActive: true,
  });

  if (user) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const resetUrl = `${getSiteUrl()}/admin/reset-password?token=${resetToken}`;
    const { subject, html } = passwordResetEmailTemplate({
      name: user.name,
      resetUrl,
    });

    await sendEmail({ to: user.email, subject, html });
  }

  return {
    success: true,
    message: "If an account exists with that email, a reset link has been sent.",
  };
}

export async function resetPasswordAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(parsed.data.token)
    .digest("hex");

  await connectDB();
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
    isActive: true,
  });

  if (!user) {
    return { success: false, error: "Invalid or expired reset link" };
  }

  user.password = await bcrypt.hash(parsed.data.password, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();

  return { success: true };
}
