"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { homepageCopy } from "@/lib/content/revisions";

export function HeroVideoSection() {
  const { src, poster } = homepageCopy.heroVideo;

  return (
    <section aria-label="Rethink Automotive overview video" className="relative isolate w-full bg-black">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#0a0a12] shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
            <video
              className="aspect-video h-auto w-full bg-black object-cover"
              controls
              playsInline
              preload="metadata"
              poster={poster}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support embedded video playback.
            </video>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
