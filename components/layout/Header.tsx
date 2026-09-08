"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { MobileMenu } from "./MobileMenu";
import { AnnouncementBar } from "./AnnouncementBar";
import { BrandLockup, DEFAULT_LOGO } from "./BrandLockup";
import { DemoCtaButton } from "@/components/ui/ConversionCta";
import { defaultNavigation } from "@/lib/content/defaults";

function isNavActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) {
    return pathname === "/";
  }
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const { settings } = useSiteSettings();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = defaultNavigation
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order)
    .map(({ label, href }) => ({ label, href }));

  return (
    <>
      <AnnouncementBar
        dismissed={announcementDismissed}
        onDismiss={() => setAnnouncementDismissed(true)}
      />
      <header
        className={cn(
          "fixed left-0 right-0 z-40 border-b border-white/5 bg-[#12121c] transition-shadow duration-300",
          announcementDismissed || !settings.announcementBar?.enabled ?
            "top-0"
          : "top-[42px]",
          scrolled && "shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
        )}
      >
        <div className="container mx-auto px-3 md:px-4">
          {/* Mobile: logo | menu | demo */}
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 lg:hidden">
            <BrandLockup
              logoSrc={settings.logo || DEFAULT_LOGO}
              alt={settings.businessName}
              priority
              className="min-w-0 justify-self-start"
            />

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center justify-self-center rounded-md border border-white/10 bg-[#0a1628] text-white hover:bg-[#121c30]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <DemoCtaButton className="max-w-[7.5rem] justify-self-end px-2.5 py-2 text-[8px] leading-tight tracking-[0.1em] sm:max-w-none sm:px-3 sm:text-[9px]" />
          </div>

          {/* Desktop */}
          <div className="hidden h-[72px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 lg:grid">
            <BrandLockup
              logoSrc={settings.logo || DEFAULT_LOGO}
              alt={settings.businessName}
              priority
              className="justify-self-start"
            />

            <nav
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 xl:gap-5"
              aria-label="Main"
            >
              {links.map((item) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative whitespace-nowrap pb-1 text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors xl:text-[10px] xl:tracking-[0.18em]",
                      active ?
                        "text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-electric after:content-['']"
                      : "text-white/75 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-end">
              <DemoCtaButton className="rounded-md px-5 py-2.5 text-[11px] tracking-[0.14em] xl:text-xs" />
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
