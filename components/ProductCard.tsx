"use client";

import Link from "next/link";
import type { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-lg transition-shadow block"
    >
      <div className="relative aspect-square bg-cream overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink/20 font-display text-sm">
            {product.name}
          </div>
        )}

        {product.tag && (
          <span className="absolute top-3 left-3 bg-chili text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.tag}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-ink mb-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-terracotta-dark">₹{product.price}</span>
          <span className="text-sm text-ink/40 line-through">₹{product.mrp}</span>
        </div>

        {/* Stop link navigation when clicking the button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full bg-ink text-white text-sm font-semibold py-2.5 rounded-full hover:bg-terracotta-dark transition relative z-10"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}