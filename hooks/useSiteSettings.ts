"use client";

import { useEffect, useState } from "react";
import type { NavItem, SiteSettingsData } from "@/types";
import { defaultSiteSettings } from "@/lib/content/defaults";

interface UseSiteSettingsReturn {
  settings: SiteSettingsData;
  navigation: NavItem[];
  isLoading: boolean;
  error: string | null;
}

export function useSiteSettings(): UseSiteSettingsReturn {
  const [settings, setSettings] = useState<SiteSettingsData>(defaultSiteSettings);
  const [navigation, setNavigation] = useState<NavItem[]>(defaultNavigation);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSettings() {
      try {
        const response = await fetch("/api/site-settings");
        if (!response.ok) throw new Error("Failed to load site settings");
        const data = await response.json();
        if (!cancelled) {
          setSettings({ ...defaultSiteSettings, ...data.settings });
          setNavigation(data.navigation?.length ? data.navigation : defaultNavigation);
        }
      } catch {
        if (!cancelled) {
          setError(null);
          setSettings(defaultSiteSettings);
          setNavigation(defaultNavigation);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, navigation, isLoading, error };
}

const defaultNavigation: NavItem[] = [
  { label: "Home", href: "/", order: 0, isActive: true },
  { label: "About", href: "/about", order: 1, isActive: true },
  { label: "Products", href: "/products", order: 2, isActive: true },
  { label: "Services", href: "/services", order: 3, isActive: true },
  { label: "Contact", href: "/contact", order: 4, isActive: true },
];
