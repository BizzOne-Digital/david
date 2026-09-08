"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { cn } from "@/lib/utils";

interface AnnouncementBarProps {
  onDismiss?: () => void;
}

export function AnnouncementBar({ onDismiss }: AnnouncementBarProps) {
  const { settings } = useSiteSettings();
  const bar = settings.announcementBar;

  if (!bar?.enabled || !bar.text) return null;

  const content = (
    <span className="block text-xs font-medium leading-snug sm:text-sm">
      {bar.text}
    </span>
  );

  return (
    <div className="relative border-b border-[#e85f00]/40 bg-[#ff6b00] px-3 py-2 text-center text-white sm:px-4 sm:py-2.5">
      {bar.link ? (
        <Link href={bar.link} className="hover:underline">
          {content}
        </Link>
      ) : (
        content
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 rounded p-1",
            "hover:bg-white/20"
          )}
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
