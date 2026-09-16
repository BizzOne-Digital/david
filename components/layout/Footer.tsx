"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Logo, DEFAULT_LOGO } from "./Logo";
import {
  footerExploreLinks,
  footerLegalLinks,
  footerSolutionLinks,
} from "@/lib/content/footer-content";

const socialIconMap: Record<string, ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 8.98h3.96V21H3V8.98Zm7.04 0H14v1.64h.05c.55-1 1.9-2.06 3.91-2.06 4.18 0 4.95 2.75 4.95 6.33V21H18.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95V21H10.04V8.98Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.38.57A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.13C4.3 20.5 12 20.5 12 20.5s7.7 0 9.38-.57a3 3 0 0 0 2.12-2.13A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  ),
};

function SocialIcon({ platform }: { platform: string }) {
  return socialIconMap[platform.toLowerCase()] ?? socialIconMap.linkedin;
}

function FooterLinkColumn({
  columnKey,
  title,
  links,
  className,
}: {
  columnKey: string;
  title: string;
  links: readonly { id: string; label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={`${columnKey}-${link.id}`}>
            <Link
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-cyan"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { settings } = useSiteSettings();
  const activeSocials = settings.socialLinks.filter((link) => link.isActive);

  return (
    <footer className="relative isolate w-full max-w-full overflow-hidden border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1fr_0.9fr_0.9fr_1.2fr] xl:gap-5">
            <div className="min-w-0 xl:border-r xl:border-white/10 xl:pr-6">
              <Logo
                logoSrc={settings.logo || DEFAULT_LOGO}
                alt={settings.businessName}
                width={520}
                height={302}
                imageClassName="h-[clamp(3.35rem,11.2vw,5rem)] w-full max-w-[min(270px,100%)] object-contain object-left"
              />
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
                {settings.footerContent.brandStatement ||
                  "Smarter marketing systems for modern dealerships."}
              </p>
            </div>

            <FooterLinkColumn
              columnKey="explore"
              title="Explore"
              links={footerExploreLinks}
              className="xl:border-r xl:border-white/10 xl:px-5"
            />

            <FooterLinkColumn
              columnKey="solutions"
              title="Solutions"
              links={footerSolutionLinks}
              className="xl:border-r xl:border-white/10 xl:px-5"
            />

            <div className="xl:-ml-1 xl:pl-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                Let&apos;s Connect
              </p>
              <ul className="mt-3 space-y-3">
                <li>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="group flex min-w-0 items-center gap-3 text-sm text-white/80 transition-colors hover:text-cyan"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-graphite">
                      <Mail className="h-4 w-4 text-electric" />
                    </span>
                    <span className="whitespace-nowrap">{settings.contactEmail}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${settings.contactPhone.replace(/\D/g, "")}`}
                    className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-cyan"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-graphite">
                      <Phone className="h-4 w-4 text-electric" />
                    </span>
                    {settings.contactPhone}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-4 md:flex-row">
            <p className="text-xs text-white/45">{settings.footerContent.copyright}</p>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/45">
              {footerLegalLinks.map((link, index) => (
                <span key={link.id} className="inline-flex items-center gap-4">
                  {index > 0 ? <span className="text-white/20">|</span> : null}
                  <Link href={link.href} className="transition-colors hover:text-white/70">
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {activeSocials.length > 0 ? (
                activeSocials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-white/70 transition-colors hover:border-cyan/40 hover:text-cyan"
                    aria-label={social.platform}
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-white/70 transition-colors hover:border-cyan/40 hover:text-cyan"
                    aria-label="LinkedIn"
                  >
                    <SocialIcon platform="linkedin" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-white/70 transition-colors hover:border-cyan/40 hover:text-cyan"
                    aria-label="X"
                  >
                    <SocialIcon platform="x" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-white/70 transition-colors hover:border-cyan/40 hover:text-cyan"
                    aria-label="YouTube"
                  >
                    <SocialIcon platform="youtube" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
    </footer>
  );
}
