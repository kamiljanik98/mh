"use client";

import useAuthModal from "@/hooks/auth/use-auth-modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useUser from "@/hooks/auth/useUser";

export default function Navbar() {
  const { open } = useAuthModal();
  const { user } = useUser();

  return (
    <nav className="flex bg-neutral-800 items-center justify-between px-6 py-4">
      <div className="px-3 py-3 rounded-md bg-neutral-900 text-lg font-semibold flex gap-2 items-center">
        <Image src="/logo.svg" alt="App logo" width={24} height={24} />
        <p className="text-neutral-300  text-xs">MusicHub</p>
      </div>

      {user ? (
        <span className="text-neutral-100">
          {user.nickname ?? "No nickname"}
        </span>
      ) : (
        <div className="flex gap-2">
          <Button onClick={() => open("login")}>Sign in</Button>
          <Button onClick={() => open("register")}>Register</Button>
        </div>
      )}
    </nav>
  );
}
