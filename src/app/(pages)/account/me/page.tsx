"use client";

import Image from "next/image";
import useUser from "@/hooks/account/use-user";
import { getAvatarUrl } from "@/lib/r2/public";
import { EditProfileDialog } from "@/components/account/edit-profile-dialog";
import { EditPasswordField } from "@/components/account/edit-password-field";

export default function AccountMePage() {
  const user = useUser((state) => state.user);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-20 rounded-full overflow-hidden shrink-0">
          <Image
            src={getAvatarUrl(user.avatar_url)}
            alt={user.nickname ?? "User avatar"}
            width={80}
            height={80}
            className="size-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-foreground">
            {user.nickname ?? "No nickname"}
          </h1>
          <p className="text-sm text-foreground">{user.email}</p>
          {user.bio && (
            <p className="text-sm text-foreground mt-1 whitespace-pre-wrap">
              {user.bio}
            </p>
          )}
        </div>
        <EditProfileDialog />
      </div>

      <div className="rounded-lg border border-border p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3">
          <div>
            <p className="text-sm text-foreground">Email</p>
            <p className="text-sm text-foreground">{user.email}</p>
          </div>
        </div>

        <EditPasswordField />
      </div>
    </div>
  );
}
