// components/AuthCard.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-md">
        {/* Brand + Home link */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="font-display text-2xl text-ink">
            Soup Up
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-ink/60 hover:text-terracotta-dark transition"
          >
            ← Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
          <h1 className="font-display text-2xl text-ink mb-1">{title}</h1>
          <p className="text-ink/50 text-sm mb-6">{subtitle}</p>
          {children}
        </div>

        <p className="text-center text-sm text-ink/60 mt-6">{footer}</p>
      </div>
    </div>
  );
}