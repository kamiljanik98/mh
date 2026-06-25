"use client";

import useAuthModal from "@/hooks/auth/use-auth-modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useUser from "@/hooks/auth/useUser";
import useSignOut from "@/hooks/auth/use-sign-out";
import { LogOut, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const { open } = useAuthModal();
  const { user } = useUser();
  const { signOut } = useSignOut();

  return (
    <nav className="bg-foreground flex items-center gap-6 px-6 py-4 max-w-6xl mx-auto">
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex gap-2.5 items-center shrink-0"
      >
        <Image src="/logo.svg" alt="App logo" width={50} height={50} />
        <p className="text-sm font-semibold tracking-wider uppercase text-neutral-300">
          MusicHub
        </p>
      </div>

      <div className="flex gap-4 text-[13px] font-bold text-muted-foreground shrink-0">
        <Link href="/discover">Discover</Link>
        <Link href="/feed">Feed</Link>
        <Link href="/library">Library</Link>
      </div>

      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          placeholder="Search for artist"
          className="w-full bg-neutral-800 text-neutral-200 placeholder:text-neutral-500 text-sm px-4 py-2.5 pl-10 outline-none focus:bg-neutral-700 transition-colors"
        />
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
        />
      </div>

      {user ? (
        <div className="flex gap-3 items-center shrink-0">
          <Button variant="ghost" asChild>
            <Link href="/upload" className="text-green-500">
              Upload
            </Link>
          </Button>
          <div className="flex items-center gap-1.5 text-sm text-neutral-300 hover:text-neutral-100 transition-colors cursor-pointer">
            <User size={16} />
            <span>{user.nickname ?? "No nickname"}</span>
          </div>
          <Button size="icon" onClick={() => signOut()}>
            <LogOut size={16} />
          </Button>
        </div>
      ) : (
        <div className="flex gap-4 shrink-0">
          <Button onClick={() => open("login")}>Sign in</Button>
          <Button
            variant="secondary"
            className="font-semibold"
            onClick={() => open("register")}
          >
            Create account
          </Button>
        </div>
      )}
    </nav>
  );
}
