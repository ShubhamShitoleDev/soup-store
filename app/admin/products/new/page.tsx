import Link from "next/link";
import { createProduct } from "@/lib/admin-actions";

export default function NewProductPage() {
  return (
    <div className="max-w-xl">
      <Link href="/admin/products" className="text-sm text-ink/50 hover:text-ink mb-4 inline-block">
        ← Back to products
      </Link>
      <h1 className="font-display text-2xl text-ink mb-6">Add Product</h1>

      <form action={createProduct} className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <Field label="Product name" name="name" required placeholder="Tomato Basil Soup" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (₹)" name="price" type="number" required placeholder="240" />
          <Field label="MRP (₹)" name="mrp" type="number" required placeholder="280" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Stock quantity" name="stockQty" type="number" placeholder="100" />
          <Field label="Badge tag (optional)" name="tag" placeholder="Bestseller" />
        </div>

        {/* --- New image upload field --- */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Product image</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full border border-black/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracotta file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cream file:text-ink hover:file:bg-marigold/30 transition"
          />
          <p className="text-xs text-ink/40 mt-1">Upload a JPG, PNG or WebP image (max ~2MB).</p>
        </div>

        {/* Optional URL fallback */}
        <Field
          label="Or paste image URL"
          name="imageUrl"
          placeholder="https://example.com/soup.jpg"
        />

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Short description</label>
          <textarea
            name="shortDescription"
            rows={3}
            className="w-full border border-black/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracotta"
            placeholder="Slow-simmered tomato and basil, freeze-dried to lock in flavour."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-ink text-white font-semibold py-2.5 rounded-full hover:bg-terracotta-dark transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        step={type === "number" ? "0.01" : undefined}
        className="w-full border border-black/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracotta"
      />
    </div>
  );
}