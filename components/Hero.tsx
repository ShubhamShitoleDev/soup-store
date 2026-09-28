import Link from "next/link";

const STEPS = [
  { n: 1, label: "Tear open the pouch" },
  { n: 2, label: "Pour into a bowl" },
  { n: 3, label: "Add hot water, stir & sip" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-terracotta via-terracotta to-plum">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-white/80 font-semibold tracking-widest text-xs sm:text-sm uppercase mb-3">
            Ready in 90 seconds
          </p>
          <h1 className="font-display text-white text-4xl sm:text-6xl leading-tight mb-4">
            Real Soup.
            <br />
            Zero Prep.
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-8">
            Slow-simmered soups, freeze-dried to lock in flavour — no preservatives,
            ready whenever hunger strikes.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-ink text-white font-semibold px-8 py-3.5 rounded-full hover:bg-black transition"
          >
            Shop the range →
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center gap-4"
            >
              <span className="font-display text-white text-2xl bg-white/15 rounded-full h-11 w-11 flex items-center justify-center shrink-0">
                {step.n}
              </span>
              <p className="text-white font-medium">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
