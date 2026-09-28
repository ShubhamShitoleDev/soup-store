import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen flex bg-cream">
      <aside className="w-56 shrink-0 bg-ink text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="font-display text-lg">
            Soup Up
          </Link>
          <p className="text-xs text-white/40 mt-0.5">Admin panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/products">Products</NavLink>
          <NavLink href="/admin/orders">Orders</NavLink>
        </nav>
        <div className="px-5 py-4 border-t border-white/10 text-xs text-white/40">
          Logged in as {session?.user?.email}
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
    >
      {children}
    </Link>
  );
}
