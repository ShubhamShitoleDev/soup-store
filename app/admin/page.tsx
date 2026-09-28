import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [productCount, orderCount, pendingCount, lowStock, recentOrders, revenueAgg] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.count({ where: { orderStatus: "PENDING" } }),
      prisma.product.count({ where: { stockQty: { lt: 10 }, isActive: true } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: "PAID" },
      }),
    ]);

  const revenue = Number(revenueAgg._sum.total ?? 0);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} />
        <StatCard label="Orders" value={orderCount} />
        <StatCard label="Pending Orders" value={pendingCount} accent />
        <StatCard label="Low Stock Items" value={lowStock} accent={lowStock > 0} />
        <StatCard label="Products Listed" value={productCount} />
      </div>

      <div className="bg-white rounded-2xl border border-black/5">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
          <h2 className="font-semibold text-ink">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-terracotta-dark font-semibold">
            View all →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="p-5 text-sm text-ink/50">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/40 border-b border-black/5">
                <th className="px-5 py-3 font-medium">Order #</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{o.orderNumber}</td>
                  <td className="px-5 py-3 text-ink/70">{o.customerName}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.orderStatus} />
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-ink">
                    ₹{Number(o.total).toLocaleString("en-IN")}
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

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? "bg-chili/5 border-chili/20" : "bg-white border-black/5"
      }`}
    >
      <p className="text-xs text-ink/50 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent ? "text-chili" : "text-ink"}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    PROCESSING: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] ?? ""}`}>
      {status}
    </span>
  );
}
