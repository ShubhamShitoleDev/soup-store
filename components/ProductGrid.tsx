import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";

export default async function ProductGrid() {
  const dbProducts = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });

  const products = dbProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    mrp: Number(p.mrp),
    image: p.images?.[0]?.url ?? "",
    tag: p.tag ?? undefined,
  }));

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <p className="text-terracotta-dark font-semibold tracking-widest text-xs uppercase mb-2">
            Our Menu
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Bestselling Soups</h2>
        </div>
        {products.length === 0 ? (
          <p className="text-center text-ink/50 text-sm">
            No products yet — add some from the admin panel at /admin/products.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-block bg-ink text-white font-semibold px-8 py-3 rounded-full hover:bg-terracotta-dark transition"
          >
            Shop more
          </Link>
        </div>
      </div>
    </section>
  );
}
