"use client";

import useAuthModal from "@/hooks/use-auth-modal";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { open } = useAuthModal();

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <span className="text-lg font-semibold">
        Music<span className="text-emerald-500">Hub</span>
      </span>

      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => open("login")}>
          Sign in
        </Button>
        <Button onClick={() => open("register")}>Register</Button>
      </div>
    </nav>
  );
}
