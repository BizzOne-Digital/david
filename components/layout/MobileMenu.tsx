"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DemoCtaButton } from "@/components/ui/ConversionCta";
import { BrandLockup, DEFAULT_LOGO } from "./BrandLockup";

const mockupNav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/products" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Consulting", href: "/consulting" },
  { label: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { navigation, settings } = useSiteSettings();
  const reducedMotion = useReducedMotion();
  const cmsLinks = navigation.filter((item) => item.isActive);
  const links = cmsLinks.length > 0 ? cmsLinks : mockupNav;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.nav
            initial={reducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[min(100%,320px)] flex-col border-l border-white/10 bg-[#12121c] lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <BrandLockup logoSrc={settings.logo || DEFAULT_LOGO} alt={settings.businessName} />
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-white/10"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-1 flex-col gap-1 p-4">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-lg px-4 py-3 text-lg hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 p-4" onClick={onClose}>
              <DemoCtaButton className="w-full" />
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
