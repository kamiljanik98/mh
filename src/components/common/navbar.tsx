"use client";

import useAuthModal from "@/hooks/auth/use-auth-modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useUser from "@/hooks/auth/useUser";
import useSignOut from "@/hooks/auth/use-sign-out";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { open } = useAuthModal();
  const { user } = useUser();
  const { signOut } = useSignOut();
  return (
    <nav className=" bg-neutral-900 flex items-center justify-between px-6 py-4">
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="App logo" width={30} height={30} />
        <p className="text-sm text-neutral-300 tracking-wide">MusicHub</p>
      </div>
      {user ? (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-1.5 text-sm text-neutral-300 hover:text-neutral-100 transition-colors cursor-pointer">
            <User size={16} />
            <span>{user.nickname ?? "No nickname"}</span>
          </div>
          <Button size="icon" onClick={() => signOut()}>
            <LogOut size={16} />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button onClick={() => open("login")}>Sign in</Button>
          <Button variant="outline" onClick={() => open("register")}>
            Register
          </Button>
        </div>
      )}
    </nav>
  );
}
