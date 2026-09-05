"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils/money";
import type { PurchaseMode } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface ProductPricingProps {
  name: string;
  slug: string;
  productId: string;
  priceCents?: number;
  compareAtPriceCents?: number;
  showPricing: boolean;
  contactForPricing: boolean;
  purchaseMode: PurchaseMode;
  ctaLabel: string;
  ctaUrl?: string;
}

export function ProductPricing({
  name,
  slug,
  productId,
  priceCents,
  compareAtPriceCents,
  showPricing,
  contactForPricing,
  purchaseMode,
  ctaLabel,
  ctaUrl,
}: ProductPricingProps) {
  const { addItem } = useCart();
  const { settings } = useSiteSettings();

  const canAddToCart =
    purchaseMode === "online_purchase" &&
    settings.purchasingEnabled &&
    priceCents != null;

  const handleAddToCart = () => {
    if (!priceCents) return;
    addItem({
      productId,
      slug,
      name,
      unitPriceCents: priceCents,
      purchaseMode,
    });
  };

  return (
    <div className="glass rounded-2xl p-6">
      {showPricing && priceCents ? (
        <div className="mb-4">
          <span className="font-mono text-3xl font-bold">{formatMoney(priceCents)}</span>
          {compareAtPriceCents && compareAtPriceCents > priceCents && (
            <span className="ml-3 text-silver line-through">
              {formatMoney(compareAtPriceCents)}
            </span>
          )}
        </div>
      ) : contactForPricing ? (
        <p className="mb-4 text-lg text-silver">{settings.contactForPricingLabel}</p>
      ) : null}

      <div className="flex flex-col gap-3">
        {canAddToCart ? (
          <Button onClick={handleAddToCart} className="w-full">
            Add to Cart
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href={ctaUrl ?? "/contact"}>{ctaLabel}</Link>
          </Button>
        )}
        {purchaseMode === "book_consultation" && (
          <Button asChild variant="outline" className="w-full">
            <Link href="/book-appointment">Book Consultation</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
