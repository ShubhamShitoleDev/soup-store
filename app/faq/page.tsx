// app/faq/page.tsx
import Link from "next/link";

const faqs = [
    {
        q: "How do I prepare Soup Up?",
        a: "Just tear open the pouch, pour the contents into a bowl, add 200–250 ml of hot water, stir well, and let it sit for a minute. Your soup is ready to enjoy — no stove, no mess.",
    },
    {
        q: "Are your soups really preservative‑free?",
        a: "Absolutely. We never add artificial preservatives, colours, or flavours. Our freeze‑drying process naturally locks in taste and nutrition, so the only thing you'll find in the pouch is real food.",
    },
    {
        q: "Where do you deliver?",
        a: "We ship across India. Standard delivery takes 3–7 business days depending on your location. Free delivery on orders over ₹999.",
    },
    {
        q: "What is the shelf life of your soups?",
        a: "Each pouch typically has a shelf life of 9–12 months from the date of manufacture. You'll always find the exact best‑before date printed on the back of the pack.",
    },
    {
        q: "Can I return or exchange a product?",
        a: "We want you to be completely happy. If you receive a damaged or incorrect item, please contact us within 48 hours of delivery — we'll arrange a replacement or refund. For details, see our Return Policy.",
    },
    {
        q: "Are the soups vegetarian?",
        a: "Yes, all our soups are 100% vegetarian. Many are also vegan (check individual product descriptions). We clearly label each product so you can make the right choice.",
    },
    {
        q: "How can I track my order?",
        a: "Once your order ships, we'll send you an email and SMS with a tracking link. You can also check your order status in your account dashboard.",
    },
    {
        q: "Do you have subscription plans?",
        a: "Not yet — but we're working on it! For now you can stock up with multi‑packs, and we'll let you know as soon as subscriptions launch.",
    },
];

export default function FaqPage() {
    return (
        <div className="min-h-screen bg-cream">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-ink/60 hover:text-terracotta-dark transition mb-8"
                >
                    ← Back to home
                </Link>

                <div className="text-center mb-12">
                    <p className="text-terracotta-dark font-semibold tracking-widest text-xs uppercase mb-2">
                        Answers
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl text-ink">
                        Frequently Asked Questions
                    </h1>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <details
                            key={i}
                            className="group bg-white rounded-2xl border border-black/5 overflow-hidden transition-shadow hover:shadow-sm"
                        >
                            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-ink text-sm sm:text-base list-none">
                                {faq.q}
                                <span className="ml-4 shrink-0 text-lg text-ink/30 group-open:hidden">+</span>
                                <span className="ml-4 shrink-0 text-lg text-ink/30 hidden group-open:inline">−</span>
                            </summary>
                            <div className="px-6 pb-4 text-sm text-ink/70 leading-relaxed">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-sm text-ink/50">
                        Still have questions?{" "}
                        <Link href="/contact" className="text-terracotta-dark font-semibold">
                            Reach out to us
                        </Link>
                        {" "}— we're happy to help.
                    </p>
                </div>
            </div>
        </div>
    );
}