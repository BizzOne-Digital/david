"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SlideshowSlide = {
  src: string;
  alt: string;
  caption?: string;
};

interface ImageSlideshowProps {
  slides: readonly SlideshowSlide[];
  className?: string;
  compact?: boolean;
  embedded?: boolean;
  showCaption?: boolean;
  showSlideCounter?: boolean;
}

export function ImageSlideshow({
  slides,
  className,
  compact = false,
  embedded = false,
  showCaption = true,
  showSlideCounter = false,
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const total = slides.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  if (!slide) return null;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden bg-[#0a0a12]",
          embedded ?
            "rounded-none border-0"
          : "rounded-2xl border border-white/10 bg-black/40 shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-center",
            compact || embedded ?
              "min-h-0 py-0"
            : "min-h-[380px] sm:min-h-[440px] md:min-h-[480px]"
          )}
        >
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={600}
            height={900}
            className={cn(
              "mx-auto object-contain",
              compact || embedded ?
                "h-auto max-h-[min(50vh,400px)] w-auto max-w-full px-2 py-0 sm:max-h-[min(52vh,440px)]"
              : "max-h-[min(72vh,680px)] w-auto max-w-full px-3 py-3"
            )}
            sizes={
              embedded || compact ?
                "(max-width: 768px) 100vw, 560px"
              : "(max-width: 768px) 100vw, 720px"
            }
            priority={index === 0}
          />

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-black/80 sm:left-3 sm:h-10 sm:w-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-black/80 sm:right-3 sm:h-10 sm:w-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {(showCaption || showSlideCounter) && (
          <div className="border-t border-white/10 px-3 py-2 sm:px-4">
            {showCaption && slide.caption ?
              <p className="text-center text-xs text-silver sm:text-sm">{slide.caption}</p>
            : null}
            {showSlideCounter ?
              <p className="mt-1.5 text-center text-xs text-white/50">
                {index + 1} / {total}
              </p>
            : null}

            <div className="mt-2 flex flex-wrap justify-center gap-1.5 px-1">
              {slides.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative h-14 w-10 shrink-0 overflow-hidden rounded-md border-2 transition sm:h-16 sm:w-12",
                    i === index ? "border-brand-orange" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                  aria-label={`View slide: ${item.caption ?? item.alt}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
