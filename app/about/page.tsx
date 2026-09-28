// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
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

                {/* Hero section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <p className="text-terracotta-dark font-semibold tracking-widest text-xs uppercase mb-3">
                        Our story
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl text-ink mb-6">
                        Real soup,<br /> zero compromise
                    </h1>
                    <p className="text-ink/60 text-base sm:text-lg leading-relaxed">
                        Soup Up was born from a simple belief: you shouldn’t have to choose between
                        convenience and honest, slow‑cooked flavour. We make real soups — simmered in
                        small batches, then freeze‑dried to lock in every last bit of taste — ready
                        whenever you are, with nothing artificial added.
                    </p>
                </div>

                {/* Values / differentiators */}
                <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
                    {[
                        {
                            title: "Slow‑simmered",
                            desc: "We cook our soups the traditional way, for hours, so the flavours develop naturally.",
                        },
                        {
                            title: "Freeze‑dried fresh",
                            desc: "Our gentle freeze‑drying process removes water, not nutrients or taste. Just add hot water.",
                        },
                        {
                            title: "No nasties",
                            desc: "No preservatives, no artificial colours or flavours — just clean ingredients you can pronounce.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="bg-white rounded-2xl border border-black/5 p-6 text-center"
                        >
                            <h3 className="font-display text-lg text-ink mb-2">{item.title}</h3>
                            <p className="text-sm text-ink/60">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Ingredients philosophy */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4">
                        Ingredients you can trust
                    </h2>
                    <p className="text-ink/60 text-base mb-10">
                        We partner with local farms and trusted suppliers to bring you the freshest
                        vegetables, legumes, and spices. Every ingredient is traceable, every recipe is
                        tested until it tastes just like home.
                    </p>

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