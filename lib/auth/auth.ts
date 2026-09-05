import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connect";
import User from "@/models/User";
import { authConfig } from "@/lib/auth/auth.config";
import type { UserRole } from "@/types";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        await connectDB();
        const user = await User.findOne({ email, isActive: true });

        if (!user) {
          return null;
        }

        if (user.lockUntil && user.lockUntil > new Date()) {
          return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          user.loginAttempts += 1;
          if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            user.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
          }
          await user.save();
          return null;
        }

        user.loginAttempts = 0;
        user.lockUntil = undefined;
        user.lastLogin = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});

export async function getUserLockStatus(email: string): Promise<{
  locked: boolean;
  lockUntil?: Date;
  remainingAttempts?: number;
}> {
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    return { locked: false };
  }

  if (user.lockUntil && user.lockUntil > new Date()) {
    return { locked: true, lockUntil: user.lockUntil };
  }

  return {
    locked: false,
    remainingAttempts: Math.max(0, MAX_LOGIN_ATTEMPTS - user.loginAttempts),
  };
}
