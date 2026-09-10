"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { homepageCopy } from "@/lib/content/revisions";
import { cn } from "@/lib/utils";

export function HeroVideoSection() {
  const { src, poster } = homepageCopy.heroVideo;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play();
    setPlaying(true);
  };

  return (
    <section aria-label="Rethink Automotive overview video" className="relative isolate w-full bg-black">
      <div className="container mx-auto px-4 pb-4 pt-2 md:pb-5 md:pt-3">
        <ScrollReveal>
          <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#0a0a12] shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
            <video
              ref={videoRef}
              className="aspect-video h-auto w-full bg-black object-cover"
              controls={playing}
              playsInline
              preload="metadata"
              poster={poster}
              onPlay={() => setPlaying(true)}
              onEnded={() => {
                setPlaying(false);
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                }
              }}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support embedded video playback.
            </video>

            {!playing ?
              <button
                type="button"
                onClick={handlePlay}
                className={cn(
                  "absolute inset-0 flex cursor-pointer items-center justify-center",
                  "bg-black/15 transition-all duration-300",
                  "max-md:bg-black/25",
                  "md:bg-black/10 md:opacity-0 md:group-hover:opacity-100"
                )}
                aria-label="Play overview video"
              >
                <span
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white",
                    "shadow-[0_0_32px_rgba(255,102,0,0.45)] transition-transform duration-300",
                    "md:h-[4.75rem] md:w-[4.75rem] md:group-hover:scale-110"
                  )}
                >
                  <Play className="ml-1 h-7 w-7 fill-current md:h-8 md:w-8" />
                </span>
              </button>
            : null}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
