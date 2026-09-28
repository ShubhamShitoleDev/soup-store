"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { lines, isOpen, setIsOpen, updateQty, removeFromCart, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
          <h2 className="font-display text-xl text-ink">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl leading-none text-ink/50 hover:text-ink">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-ink/50 text-sm">Your cart is empty — go add some soup.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 items-center">
                  <div className="h-16 w-16 bg-cream rounded-xl shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-ink">{product.name}</p>
                    <p className="text-sm text-terracotta-dark font-bold">₹{product.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQty(product.id, qty - 1)}
                        className="h-6 w-6 rounded-full border border-black/15 text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm w-4 text-center">{qty}</span>
                      <button
                        onClick={() => updateQty(product.id, qty + 1)}
                        className="h-6 w-6 rounded-full border border-black/15 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove item"
                    className="text-ink/30 hover:text-chili text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-black/10 p-5">
          <div className="flex justify-between mb-4 font-semibold text-ink">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            disabled={lines.length === 0}
            className="w-full bg-ink text-white font-semibold py-3 rounded-full hover:bg-terracotta-dark transition disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
