"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/account/use-user";
import useSignOut from "@/hooks/auth/use-sign-out";
import { getAvatarUrl } from "@/lib/r2/public";

export const UserProfileButton = () => {
  const user = useUser((state) => state.user);
  const { signOut } = useSignOut();

  if (!user) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm text-neutral-300 hover:text-neutral-100 transition-colors cursor-pointer outline-none">
        <div className="size-8 rounded-full overflow-hidden shrink-0">
          <Image
            src={getAvatarUrl(user.avatar_url)}
            alt={user.nickname ?? "User avatar"}
            width={24}
            height={24}
            className="size-full object-cover"
          />
        </div>
        <span>{user.nickname ?? "No nickname"}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${user.nickname}`}
            className="flex items-center gap-2"
          >
            <Settings size={14} />
            Account settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2 text-destructive"
        >
          <LogOut size={14} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
