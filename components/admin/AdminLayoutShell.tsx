"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { UserRole } from "@/types";

const authRoutes = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

interface AdminLayoutShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    role: UserRole;
  };
  title?: string;
}

export function AdminLayoutShell({
  children,
  user,
  title,
}: AdminLayoutShellProps) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-graphite grain">{children}</div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-obsidian">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader user={user} title={title} />
        <main className="flex-1 overflow-y-auto bg-graphite p-6">{children}</main>
      </div>
    </div>
  );
}
