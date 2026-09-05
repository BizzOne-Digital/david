import { auth } from "@/lib/auth/auth";
import type { UserRole } from "@/types";
import type { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
  return auth();
}

export async function requireAuth(): Promise<Session> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireRole(...roles: UserRole[]): Promise<Session> {
  const session = await requireAuth();
  if (!roles.includes(session.user.role)) {
    throw new Error("Forbidden");
  }
  return session;
}

export function hasRole(session: Session | null, ...roles: UserRole[]): boolean {
  return !!session?.user?.role && roles.includes(session.user.role);
}
