"use client";

import { useEffect, useRef, useState } from "react";
import { reels, type Reel } from "@/lib/data";

export default function ReelsShow() {
  const railRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-reel-card]");
    const cardWidth = card ? card.offsetWidth + 20 : 260;
    rail.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  return (
    <section className="py-16 sm:py-20 bg-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-terracotta font-semibold tracking-widest text-xs uppercase mb-2">
              Straight from the kitchen
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white">The Soup Up Show</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <RailButton onClick={() => scrollByCard(-1)} label="Previous reel">
              ‹
            </RailButton>
            <RailButton onClick={() => scrollByCard(1)} label="Next reel">
              ›
            </RailButton>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-10 pb-2"
      >
        {reels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
        <div className="shrink-0 w-1 sm:w-4" aria-hidden />
      </div>
    </section>
  );
}

function RailButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="h-10 w-10 rounded-full border border-white/25 text-white text-xl flex items-center justify-center hover:bg-white/10 transition"
    >
      {children}
    </button>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);

  // Autoplay only while the card is actually visible in the rail (saves bandwidth,
  // mimics the native reels behaviour of "scroll to play").
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.65 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {
        /* autoplay can be blocked until user interacts — that's fine */
      });
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <div
      ref={wrapperRef}
      data-reel-card
      className="relative shrink-0 w-[68vw] sm:w-64 aspect-[9/16] snap-center rounded-2xl overflow-hidden bg-black/40"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={reel.video}
        poster={reel.poster}
        muted={muted}
        loop
        playsInline
        onClick={() => setMuted((m) => !m)}
      />

      <button
        aria-label={muted ? "Unmute reel" : "Mute reel"}
        onClick={() => setMuted((m) => !m)}
        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white text-xs flex items-center justify-center backdrop-blur-sm"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
        <p className="text-white font-semibold text-sm mb-1">{reel.title}</p>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm">₹{reel.price}</span>
          <span className="text-white/50 text-xs line-through">₹{reel.mrp}</span>
        </div>
      </div>
    </div>
  );
}
