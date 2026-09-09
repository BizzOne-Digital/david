"use client";

import { useEffect, useRef, useState } from "react";
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
  const headerStackRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const showAnnouncement =
    !announcementDismissed &&
    Boolean(settings.announcementBar?.enabled && settings.announcementBar?.text);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const stack = headerStackRef.current;
    if (!stack) return;

    const syncHeaderOffset = () => {
      root.style.setProperty("--site-header-offset", `${stack.offsetHeight}px`);
    };

    syncHeaderOffset();
    const observer = new ResizeObserver(syncHeaderOffset);
    observer.observe(stack);

    return () => {
      observer.disconnect();
      root.style.setProperty("--site-header-offset", "4rem");
    };
  }, [showAnnouncement]);

  const links = defaultNavigation
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order)
    .map(({ label, href }) => ({ label, href }));

  const showHeaderDemo = pathname !== "/contact";

  return (
    <>
      <div ref={headerStackRef} className="fixed inset-x-0 top-0 z-50">
        {showAnnouncement ?
          <AnnouncementBar onDismiss={() => setAnnouncementDismissed(true)} />
        : null}
        <header
          className={cn(
            "border-b border-white/5 bg-[#12121c] transition-shadow duration-300",
            scrolled && "shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
          )}
        >
          <div className="container mx-auto px-3 md:px-4">
            {/* Mobile: logo left, menu + demo right */}
            <div className="flex h-20 items-center justify-between gap-2 lg:hidden">
              <BrandLockup
                logoSrc={settings.logo || DEFAULT_LOGO}
                alt={settings.businessName}
                priority
                className="min-w-0 shrink"
              />

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-[#0a1628] text-white hover:bg-[#121c30]"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>

                {showHeaderDemo ?
                  <DemoCtaButton className="px-3 py-2.5 text-[10px] tracking-[0.12em] sm:px-4 sm:text-[11px]" />
                : null}
              </div>
            </div>

          {/* Desktop */}
          <div className="hidden h-24 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 lg:grid xl:h-28">
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
              {showHeaderDemo ?
                <DemoCtaButton className="rounded-md px-5 py-2.5 text-[11px] tracking-[0.14em] xl:text-xs" />
              : null}
            </div>
          </div>
        </div>
      </header>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
