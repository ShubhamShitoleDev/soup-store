import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/lib/admin-actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, product.id);

  return (
    <div className="max-w-xl">
      <Link href="/admin/products" className="text-sm text-ink/50 hover:text-ink mb-4 inline-block">
        ← Back to products
      </Link>
      <h1 className="font-display text-2xl text-ink mb-6">Edit Product</h1>

      <form action={updateWithId} className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <Field label="Product name" name="name" defaultValue={product.name} required />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Price (₹)"
            name="price"
            type="number"
            defaultValue={String(product.price)}
            required
          />
          <Field
            label="MRP (₹)"
            name="mrp"
            type="number"
            defaultValue={String(product.mrp)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Stock quantity"
            name="stockQty"
            type="number"
            defaultValue={String(product.stockQty)}
          />
          <Field label="Badge tag (optional)" name="tag" defaultValue={product.tag ?? ""} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Short description</label>
          <textarea
            name="shortDescription"
            rows={3}
            defaultValue={product.shortDescription ?? ""}
            className="w-full border border-black/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracotta"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="isActive" defaultChecked={product.isActive} />
          Visible in store
        </label>
        <button
          type="submit"
          className="w-full bg-ink text-white font-semibold py-2.5 rounded-full hover:bg-terracotta-dark transition"
        >
          Save Changes
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
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        step={type === "number" ? "0.01" : undefined}
        className="w-full border border-black/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracotta"
      />
    </div>
  );
}
