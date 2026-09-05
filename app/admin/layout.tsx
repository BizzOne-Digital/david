import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { publicAdminRoutes } from "@/lib/auth/auth.config";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isPublicAdminRoute = publicAdminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const session = isPublicAdminRoute ? null : await auth();

  return (
    <AdminLayoutShell
      user={
        session?.user
          ? {
              name: session.user.name ?? "Admin",
              email: session.user.email ?? "",
              role: session.user.role,
            }
          : undefined
      }
    >
      {children}
    </AdminLayoutShell>
  );
}
