import { auth } from "@/lib/auth/auth";

const UPLOAD_ROLES = ["super_admin", "admin", "content_manager"] as const;

export async function requireUploadSession() {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }
  if (!UPLOAD_ROLES.includes(session.user.role as (typeof UPLOAD_ROLES)[number])) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }
  return { ok: true as const, session };
}
