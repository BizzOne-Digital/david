"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images?: { url: string; alt?: string }[];
  productName: string;
  className?: string;
}

export function ProductGallery({
  images = [],
  productName,
  className,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-gunmetal to-charcoal">
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[activeIndex].url}
            alt={images[activeIndex].alt ?? productName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <Package className="mx-auto h-16 w-16 text-silver/30" />
            <p className="mt-2 text-sm text-silver">Add product images in admin</p>
          </div>
        )}
      </div>
      {hasImages && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2",
                activeIndex === index ? "border-cyan" : "border-transparent opacity-60"
              )}
              aria-label={`View image ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
