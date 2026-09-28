"use client";

import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
    product: {
        id: string;
        slug: string;
        name: string;
        price: number;
        mrp: number;
        image: string;
        tag?: string;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(product)}
            className="w-full sm:w-auto bg-ink text-white font-semibold px-10 py-3 rounded-full hover:bg-terracotta-dark transition"
        >
            Add to cart — ₹{product.price}
        </button>
    );
}