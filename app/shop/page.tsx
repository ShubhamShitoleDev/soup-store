// app/shop/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic"; // optional, but ensures fresh data on each visit

export default async function ShopPage() {
    const dbProducts = await prisma.product.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
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
        <div className="min-h-screen bg-cream">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
                {/* Back to home link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-ink/60 hover:text-terracotta-dark transition mb-8"
                >
                    ← Back to home
                </Link>

                <div className="text-center mb-12">
                    <p className="text-terracotta-dark font-semibold tracking-widest text-xs uppercase mb-2">
                        Full Menu
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl text-ink">All Soups</h1>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-ink/50 text-sm">No products available right now — check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}