// components/ReelCardFull.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface Reel {
    id: string;
    video: string;
    poster: string;
    title: string;
    price: number;
    mrp: number;
}

export default function ReelCardFull({ reel }: { reel: Reel }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [muted, setMuted] = useState(true);
    const [inView, setInView] = useState(false);

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
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    }, [inView]);

    return (
        <div
            ref={wrapperRef}
            className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black/40 group"
        >
            <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={reel.video}
                poster={reel.poster}
                muted={muted}
                loop
                playsInline
            />
            <button
                aria-label={muted ? "Unmute reel" : "Mute reel"}
                onClick={() => setMuted((m) => !m)}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white text-xs flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition"
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