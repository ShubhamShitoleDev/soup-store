const REVIEWS = [
  {
    name: "Annu Mishra",
    time: "last month",
    text: "Tried the soups and was genuinely impressed with both the quality and convenience. Perfect for late work nights.",
  },
  {
    name: "Romi Bhattacharjee",
    time: "6 months ago",
    text: "We recently tried the tomato basil and hot & sour combo — honestly there's absolutely nothing else like it in the ready-to-eat space.",
  },
  {
    name: "Anjali Patwardhan",
    time: "4 months ago",
    text: "I prefer home-style food, so packaged meals are usually a challenge for me. This changed my mind completely.",
  },
];

export default function Reviews() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 bg-cream">
      <div className="mx-auto max-w-7xl">
        <div className="bg-white rounded-2xl border border-black/5 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="font-semibold text-ink">Soup Up — Ready to Eat Food</p>
            <p className="text-terracotta-dark font-bold">
              4.9 ★★★★★ <span className="text-ink/50 font-normal text-sm">283 reviews on Google</span>
            </p>
          </div>
          <button className="border border-ink/20 rounded-full px-5 py-2 text-sm font-semibold hover:bg-ink hover:text-white transition">
            Leave a review
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl border border-black/5 p-5">
              <p className="font-semibold text-ink text-sm">{r.name}</p>
              <p className="text-ink/40 text-xs mb-2">{r.time}</p>
              <p className="text-amber-500 text-sm mb-2">★★★★★</p>
              <p className="text-ink/70 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
