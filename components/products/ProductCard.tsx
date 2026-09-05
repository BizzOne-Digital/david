"use client";

import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils/money";
import type { PurchaseMode } from "@/types";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export interface ProductCardData {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  priceCents?: number;
  showPricing: boolean;
  contactForPricing: boolean;
  purchaseMode: PurchaseMode;
  ctaLabel: string;
  category?: string;
  isPlaceholder?: boolean;
}

interface ProductCardProps {
  product: ProductCardData;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <ScrollReveal>
      <article
        className={cn(
          "group glass flex h-full flex-col overflow-hidden rounded-2xl transition-colors hover:border-cyan/30",
          className
        )}
      >
        <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-gunmetal to-charcoal">
          <Package className="h-12 w-12 text-silver/40" />
          {product.isPlaceholder && (
            <span className="absolute left-3 top-3 rounded-full bg-violet/20 px-2 py-0.5 text-xs text-violet">
              Placeholder
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {product.category && (
            <span className="mb-2 text-xs uppercase tracking-wider text-cyan">
              {product.category}
            </span>
          )}
          <h3 className="font-heading text-xl font-semibold">{product.name}</h3>
          <p className="mt-2 flex-1 text-sm text-silver">{product.shortDescription}</p>
          <div className="mt-4 flex items-center justify-between">
            {product.showPricing && product.priceCents ? (
              <span className="font-mono text-lg font-semibold">
                {formatMoney(product.priceCents)}
              </span>
            ) : (
              <span className="text-sm text-silver">Contact for pricing</span>
            )}
            <Button asChild variant="ghost" size="sm">
              <Link href={`/products/${product.slug}`}>
                {product.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
