"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Wrench,
  ShoppingCart,
  Calendar,
  MessageSquare,
  Tag,
  Settings,
  FileText,
  Image,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Appointments", href: "/admin/appointments", icon: Calendar },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Coupons", href: "/admin/coupons", icon: Tag },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen flex-col border-r border-white/10 bg-graphite transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/admin" className="flex flex-col">
            <span className="text-sm font-bold text-white">Rethink</span>
            <span className="text-xs text-silver">Admin Portal</span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-silver hover:bg-white/5 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-electric/20 text-electric"
                  : "text-silver hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        {!collapsed && (
          <p className="text-xs text-silver/60">
            Rethink Automotive Inc.
          </p>
        )}
      </div>
    </aside>
  );
}
