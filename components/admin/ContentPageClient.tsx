"use client";

import { useState } from "react";
import { PageContentEditor } from "@/components/admin/PageContentEditor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const defaultPages = [
  { slug: "home", title: "Homepage" },
  { slug: "about", title: "About" },
  { slug: "services", title: "Services" },
  { slug: "products", title: "Products" },
  { slug: "contact", title: "Contact" },
];

interface ContentPageClientProps {
  pages: Array<{
    pageSlug: string;
    pageTitle: string;
    seoTitle?: string;
    seoDescription?: string;
    sections?: Array<{
      id: string;
      type: string;
      title?: string;
      subtitle?: string;
      content?: string;
      isVisible: boolean;
      order: number;
    }>;
  }>;
}

export function ContentPageClient({ pages }: ContentPageClientProps) {
  const [activeSlug, setActiveSlug] = useState(defaultPages[0].slug);

  const activePage =
    pages.find((p) => p.pageSlug === activeSlug) ?? {
      pageSlug: activeSlug,
      pageTitle: defaultPages.find((p) => p.slug === activeSlug)?.title ?? activeSlug,
      sections: [],
    };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Page Content</h2>
        <p className="text-sm text-silver">Edit homepage, about, and other pages</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {defaultPages.map((page) => (
          <Button
            key={page.slug}
            variant={activeSlug === page.slug ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSlug(page.slug)}
            className={cn(activeSlug !== page.slug && "text-silver")}
          >
            {page.title}
          </Button>
        ))}
      </div>

      <PageContentEditor page={activePage} />
    </div>
  );
}
