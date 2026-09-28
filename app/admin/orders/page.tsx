import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "@/lib/admin-actions";

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <p className="text-sm text-ink/50">
            No orders yet — they&apos;ll show up here once checkout is wired up (Phase 3).
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const updateWithId = updateOrderStatus.bind(null, o.id);
            return (
              <div key={o.id} className="bg-white rounded-2xl border border-black/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-ink">{o.orderNumber}</p>
                    <p className="text-sm text-ink/60">
                      {o.customerName} · {o.customerPhone}
                    </p>
                    <p className="text-xs text-ink/40">
                      {o.items.map((i) => `${i.qty}× ${i.productName}`).join(", ")}
                    </p>
                  </div>
                  <p className="font-bold text-ink">₹{Number(o.total).toLocaleString("en-IN")}</p>
                </div>

                <form action={updateWithId} className="flex flex-wrap items-center gap-3">
                  <select
                    name="orderStatus"
                    defaultValue={o.orderStatus}
                    className="border border-black/15 rounded-full px-4 py-1.5 text-sm outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <input
                    name="trackingNumber"
                    defaultValue={o.trackingNumber ?? ""}
                    placeholder="Tracking number"
                    className="border border-black/15 rounded-full px-4 py-1.5 text-sm outline-none flex-1 min-w-[160px]"
                  />
                  <button
                    type="submit"
                    className="bg-ink text-white text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-terracotta-dark transition"
                  >
                    Update
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
