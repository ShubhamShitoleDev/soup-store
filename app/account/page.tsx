// app/account/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default async function AccountPage() {
  const session = await auth();

  // If the user is not logged in, send them to the login page
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-black/5 shadow-sm p-8 text-center">
        <h1 className="font-display text-2xl text-ink mb-4">Your Account</h1>

        <div className="text-left space-y-3 mb-6">
          <div>
            <p className="text-sm text-ink/50">Name</p>
            <p className="font-semibold text-ink">{user.name ?? "—"}</p>
          </div>
          <div>
            <p className="text-sm text-ink/50">Email</p>
            <p className="font-semibold text-ink">{user.email ?? "—"}</p>
          </div>
        </div>

        <SignOutButton />
      </div>
    </div>
  );
}