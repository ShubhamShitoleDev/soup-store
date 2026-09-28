"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Watch the Magic", href: "/reels" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  return (
    <header className="bg-marigold border-b border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="font-display text-2xl sm:text-3xl tracking-wide text-ink">
            Soup&nbsp;Up
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-ink">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-terracotta-dark transition">
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <button aria-label="Search" className="hover:opacity-70 transition">
              <SearchIcon />
            </button>
            <Link href="/account" aria-label="Account" className="hidden sm:block hover:opacity-70 transition">
              <UserIcon />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:block hover:opacity-70 transition">
              <HeartIcon />
            </Link>
            <button
              aria-label="Open cart"
              onClick={() => setIsOpen(true)}
              className="relative hover:opacity-70 transition"
            >
              <BagIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-chili text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              aria-label="Toggle menu"
              className="lg:hidden hover:opacity-70 transition"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden flex flex-col gap-4 pb-5 text-sm font-semibold tracking-wide text-ink">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s-7-4.35-9.5-9C.8 8.1 3 5 6.2 5c1.9 0 3.4 1 5.8 3.5C14.4 6 15.9 5 17.8 5 21 5 23.2 8.1 21.5 12c-2.5 4.65-9.5 9-9.5 9z" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 016 0v2" strokeLinecap="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}
