import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

interface ProductDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug },
        include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    if (!product || !product.isActive) notFound();

    const productData = {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        mrp: Number(product.mrp),
        stockQty: product.stockQty,
        tag: product.tag ?? undefined,
        shortDescription: product.shortDescription ?? undefined,
        image: product.images[0]?.url ?? "",
        images: product.images.map((img) => img.url),
    };

    return (
        <div className="min-h-screen bg-cream">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-ink/60 hover:text-terracotta-dark transition mb-8"
                >
                    ← Back to shop
                </Link>

                <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
                    {/* Image section */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-2xl border border-black/5 overflow-hidden relative">
                            {productData.images[0] ? (
                                <Image
                                    src={productData.images[0]}
                                    alt={productData.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-ink/20 font-display text-2xl">
                                    {productData.name}
                                </div>
                            )}
                            {productData.tag && (
                                <span className="absolute top-3 left-3 bg-chili text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {productData.tag}
                                </span>
                            )}
                        </div>

                        {/* Additional images (if any) */}
                        {productData.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {productData.images.slice(1).map((url, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square bg-white rounded-xl border border-black/5 overflow-hidden relative"
                                    >
                                        <Image
                                            src={url}
                                            alt={`${productData.name} ${i + 2}`}
                                            fill
                                            className="object-cover"
                                            sizes="25vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product info */}
                    <div>
                        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-2">
                            {productData.name}
                        </h1>

                        {productData.shortDescription && (
                            <p className="text-ink/60 text-base leading-relaxed mb-6">
                                {productData.shortDescription}
                            </p>
                        )}

                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-bold text-3xl text-terracotta-dark">
                                ₹{productData.price}
                            </span>
                            <span className="text-xl text-ink/40 line-through">
                                ₹{productData.mrp}
                            </span>
                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                You save ₹{productData.mrp - productData.price}
                            </span>
                        </div>

                        <p className="text-sm text-ink/50 mb-6">
                            {productData.stockQty > 0
                                ? `${productData.stockQty} in stock`
                                : "Currently out of stock"}
                        </p>

                        <AddToCartButton product={productData} />

                        <div className="border-t border-black/10 mt-10 pt-8">
                            <h2 className="font-semibold text-ink mb-3">Details</h2>
                            <ul className="space-y-2 text-sm text-ink/70">
                                <li>• Ready in 90 seconds – just add hot water</li>
                                <li>• No preservatives, no artificial flavours</li>
                                <li>• Freeze-dried to lock in taste and nutrition</li>
                                <li>• Vegetarian</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}