// app/account/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-chili text-white font-semibold px-6 py-2.5 rounded-full hover:bg-red-700 transition"
        >
            Sign out
        </button>
    );
}