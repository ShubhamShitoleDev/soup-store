"use client";

import { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-chili text-white text-center text-sm sm:text-base py-2.5 px-10 font-medium">
      Free delivery on orders over ₹999/-
      <button
        aria-label="Dismiss announcement"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
      >
        ✕
      </button>
    </div>
  );
}
