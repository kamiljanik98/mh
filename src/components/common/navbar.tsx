"use client";

import useAuthModal from "@/hooks/auth/use-auth-modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useUser from "@/hooks/account/use-user";
import useSignOut from "@/hooks/auth/use-sign-out";
import { LogOut, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchInput } from "../search/search-input";

export default function Navbar() {
  const user = useUser((state) => state.user);
  const router = useRouter();
  const { open } = useAuthModal();
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

      <div className="flex-1 min-w-0">
        <SearchInput />
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
