import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/admin-actions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-ink">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-ink text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-terracotta-dark transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        {products.length === 0 ? (
          <p className="p-5 text-sm text-ink/50">
            No products yet — click &quot;Add Product&quot; to create your first one.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/40 border-b border-black/5">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-5 py-3 text-ink/60">{p.category?.name ?? "—"}</td>
                  <td className="px-5 py-3 text-ink/70">
                    ₹{Number(p.price)}{" "}
                    <span className="text-ink/30 line-through text-xs">₹{Number(p.mrp)}</span>
                  </td>
                  <td className="px-5 py-3 text-ink/70">{p.stockQty}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {p.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-terracotta-dark font-semibold text-xs"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProduct(p.id);
                      }}
                      className="inline"
                    >
                      <button type="submit" className="text-chili font-semibold text-xs">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
