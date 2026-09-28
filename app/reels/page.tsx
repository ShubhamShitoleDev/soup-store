// app/reels/page.tsx
import Link from "next/link";
import { reels } from "@/lib/data";
import ReelCardFull from "@/components/ReelCardFull";

export default function ReelsPage() {
    return (
        <div className="min-h-screen bg-cream">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-ink/60 hover:text-terracotta-dark transition mb-8"
                >
                    ← Back to home
                </Link>

                <div className="text-center mb-12">
                    <p className="text-terracotta-dark font-semibold tracking-widest text-xs uppercase mb-2">
                        Straight from the kitchen
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl text-ink">
                        Watch the Magic
                    </h1>
                    <p className="text-ink/60 mt-3 max-w-md mx-auto">
                        See how our soups come to life — from the stove to your bowl, in 90 seconds.
                    </p>
                </div>

                {reels.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-ink/50 text-sm">No reels yet — check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {reels.map((reel) => (
                            <ReelCardFull key={reel.id} reel={reel} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="/shop"
                        className="inline-block bg-ink text-white font-semibold px-8 py-3 rounded-full hover:bg-terracotta-dark transition"
                    >
                        Explore the menu →
                    </Link>
                </div>
            </div>
        </div>
    );
}