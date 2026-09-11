"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  emailMarketingSlides,
  emailMarketingShowcaseCopy,
} from "@/lib/content/email-marketing-slides";
import { SectionHeading } from "@/components/sections/SectionBackground";

interface EmailMarketingSlideshowProps {
  className?: string;
  showHeading?: boolean;
  compact?: boolean;
}

export function EmailMarketingSlideshow({
  className,
  showHeading = true,
  compact = false,
}: EmailMarketingSlideshowProps) {
  const [index, setIndex] = useState(0);
  const slide = emailMarketingSlides[index];
  const total = emailMarketingSlides.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  return (
    <div className={cn("mx-auto w-full max-w-4xl", className)}>
      {showHeading ?
        <SectionHeading
          eyebrow={emailMarketingShowcaseCopy.eyebrow}
          title={emailMarketingShowcaseCopy.title}
          subtitle={emailMarketingShowcaseCopy.subtitle}
          align="center"
          className="mx-auto mb-8 w-full text-center"
        />
      : null}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
        <div
          className={cn(
            "relative flex items-center justify-center bg-[#0a0a12]",
            compact ? "min-h-[420px] sm:min-h-[480px]" : "min-h-[480px] sm:min-h-[560px] md:min-h-[620px]"
          )}
        >
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={600}
            height={900}
            className="h-full max-h-[min(72vh,720px)] w-auto max-w-full object-contain px-2 py-4"
            sizes="(max-width: 768px) 100vw, 600px"
            priority={index === 0}
          />

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-black/80 sm:left-4 sm:h-11 sm:w-11"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-black/80 sm:right-4 sm:h-11 sm:w-11"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="border-t border-white/10 px-4 py-4 sm:px-6">
          <p className="text-center text-sm text-silver">{slide.caption}</p>
          <p className="mt-2 text-center text-xs text-white/50">
            {index + 1} / {total}
          </p>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {emailMarketingSlides.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "relative h-16 w-12 shrink-0 overflow-hidden rounded-md border-2 transition sm:h-[4.5rem] sm:w-14",
                  i === index ? "border-brand-orange" : "border-transparent opacity-60 hover:opacity-100"
                )}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
