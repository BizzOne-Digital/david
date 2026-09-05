"use client";



import { useEffect, useState } from "react";

import Link from "next/link";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { useSiteSettings } from "@/hooks/useSiteSettings";

import { Button } from "@/components/ui/button";

import { CartButton } from "@/components/cart/CartButton";

import { MobileMenu } from "./MobileMenu";

import { AnnouncementBar } from "./AnnouncementBar";

import { Logo } from "./Logo";



const defaultNav = [

  { label: "Home", href: "/", order: 0, isActive: true },

  { label: "About", href: "/about", order: 1, isActive: true },

  { label: "Products", href: "/products", order: 2, isActive: true },

  { label: "Services", href: "/services", order: 3, isActive: true },

  { label: "Contact", href: "/contact", order: 4, isActive: true },

];



export function Header() {

  const { settings, navigation } = useSiteSettings();

  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [announcementDismissed, setAnnouncementDismissed] = useState(false);



  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);

  }, []);



  const links = (navigation.length ? navigation : defaultNav).filter(

    (item) => item.isActive

  );



  return (

    <>

      <AnnouncementBar

        dismissed={announcementDismissed}

        onDismiss={() => setAnnouncementDismissed(true)}

      />

      <header

        className={cn(

          "fixed left-0 right-0 z-40 transition-all duration-300",

          announcementDismissed || !settings.announcementBar?.enabled

            ? "top-0"

            : "top-[42px]",

          scrolled ? "glass-dark shadow-lg" : "bg-black/20 backdrop-blur-sm"

        )}

      >

        <div className="container mx-auto grid h-16 min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-4 md:h-20 md:gap-4">

          <div className="min-w-0">
          <Logo

            logoSrc={settings.logo || undefined}

            alt={settings.businessName}

            width={220}

            height={88}

            imageClassName="h-9 w-auto max-w-[130px] sm:max-w-[160px] md:h-14 md:max-w-none"

            priority

          />
          </div>



          <nav

            className="hidden items-center justify-center gap-6 lg:flex xl:gap-8"

            aria-label="Main"

          >

            {links.map((item) => (

              <Link

                key={item.href}

                href={item.href}

                className="text-xs font-medium uppercase tracking-[0.15em] text-silver transition-colors hover:text-white xl:text-sm"

              >

                {item.label}

              </Link>

            ))}

          </nav>



          <div className="flex items-center justify-end gap-2">

            <CartButton className="hidden sm:inline-flex" />

            <Button

              asChild

              variant="outline"

              size="sm"

              className="hidden border-electric/50 bg-black/30 text-[10px] uppercase tracking-wider md:inline-flex md:text-xs"

            >

              <Link href={settings.headerCtaUrl}>{settings.headerCtaLabel}</Link>

            </Button>

            <button

              type="button"

              className="rounded-lg p-2 hover:bg-white/10 lg:hidden"

              onClick={() => setMenuOpen(true)}

              aria-label="Open menu"

            >

              <Menu className="h-5 w-5" />

            </button>

          </div>

        </div>

      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

    </>

  );

}


