"use client";

import { Bell, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/types";

interface AdminHeaderProps {
  user: {
    name: string;
    email: string;
    role: UserRole;
  };
  title?: string;
}

const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  content_manager: "Content Manager",
};

export function AdminHeader({ user, title = "Dashboard" }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-graphite/80 px-6 backdrop-blur-xl">
      <div>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <p className="text-xs text-silver">Manage your dealership platform</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="hidden items-center gap-3 rounded-lg border border-white/10 bg-gunmetal px-3 py-2 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-electric/20">
            <User className="h-4 w-4 text-electric" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-silver">{roleLabels[user.role]}</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
