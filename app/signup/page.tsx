"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthCard from "@/components/AuthCard";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const body = await res.json();
      setLoading(false);
      setError(body.error ?? "Something went wrong.");
      return;
    }

    // Auto-login right after signup
    await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    router.push("/");
    router.refresh();
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Faster checkout, order history, and easy reordering."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-terracotta-dark font-semibold">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-black/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracotta"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracotta"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracotta"
            placeholder="At least 6 characters"
          />
        </div>

        {error && <p className="text-chili text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-white font-semibold py-2.5 rounded-full hover:bg-terracotta-dark transition disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-black/10 flex-1" />
        <span className="text-xs text-ink/40">OR</span>
        <div className="h-px bg-black/10 flex-1" />
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/account" })}
        className="w-full flex items-center justify-center gap-2 border border-black/15 rounded-full py-2.5 text-sm font-medium hover:bg-black/[0.03] transition"
      >
        Continue with Google
      </button>
    </AuthCard>
  );
}
