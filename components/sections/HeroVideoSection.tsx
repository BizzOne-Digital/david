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

  const resetToPoster = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.load();
    setPlaying(false);
  };

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
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#0a0a12] shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
            <video
              ref={videoRef}
              className="aspect-video h-auto w-full bg-black object-cover"
              controls={playing}
              playsInline
              preload="metadata"
              poster={poster}
              onPlay={() => setPlaying(true)}
              onEnded={resetToPoster}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support embedded video playback.
            </video>

            {!playing ? (
              <>
                <img
                  src={poster}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 z-[1] h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handlePlay}
                  className={cn(
                    "absolute inset-0 z-[2] flex cursor-pointer items-center justify-center",
                    "bg-black/20 transition-colors duration-300 hover:bg-black/30"
                  )}
                  aria-label="Play overview video"
                >
                  <span
                    className={cn(
                      "flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-brand-orange text-white",
                      "shadow-[0_0_32px_rgba(255,102,0,0.45)] transition-transform duration-300",
                      "hover:scale-105 active:scale-95"
                    )}
                  >
                    <Play className="ml-1 h-8 w-8 fill-current" />
                  </span>
                </button>
              </>
            ) : null}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
