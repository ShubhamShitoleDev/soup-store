const PUBLICATIONS = [
  "The Better India",
  "LBB",
  "The Times of India",
  "Startuppedia",
  "30 Stades",
  "The Hitavada",
];

export default function FeaturedIn() {
  const doubled = [...PUBLICATIONS, ...PUBLICATIONS];

  return (
    <section className="py-14 border-y border-black/5">
      <p className="text-center text-ink/40 font-semibold tracking-widest text-xs uppercase mb-6">
        As featured in
      </p>
      <div className="overflow-hidden">
        <div className="flex gap-16 w-max animate-marquee">
          {doubled.map((name, i) => (
            <span key={i} className="font-display text-xl text-ink/30 whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
