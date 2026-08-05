import Image from "next/image";
import Link from "next/link";
import { FollowButton } from "./follow-button";
import { getAvatarUrl } from "@/lib/r2/public";
import { ProfileSummary } from "@/types";

type ProfileCardProps = {
  user: ProfileSummary;
  variant?: "grid" | "row";
  isFollowing?: boolean;
};

export const ProfileCard = ({
  user,
  variant = "grid",
  isFollowing = false,
}: ProfileCardProps) => {
  if (variant === "row") {
    return (
      <div className="flex items-center gap-3 rounded-md p-2">
        <Link href={`/profile/${user.nickname}`} className="shrink-0">
          <Image
            src={getAvatarUrl(user.avatar_url)}
            alt={user.nickname ?? "User"}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        </Link>
        <Link
          href={`/profile/${user.nickname}`}
          className="min-w-0 flex-1 truncate text-sm font-medium text-foreground"
        >
          {user.nickname}
        </Link>
        <FollowButton
          profileUserId={user.id}
          isFollowingInitially={isFollowing}
        />
      </div>
    );
  }

  return (
    <div className="group flex max-w-64 flex-col items-center space-y-4 p-4 rounded-lg hover:bg-neutral-900">
      <Link href={`/profile/${user.nickname}`} className="shrink-0">
        <Image
          src={getAvatarUrl(user.avatar_url)}
          alt={user.nickname ?? "User"}
          width={124}
          height={124}
          className="size-36 rounded-full object-cover"
        />
      </Link>
      <Link
        href={`/profile/${user.nickname}`}
        className="min-w-0 flex-1 truncate text-xs font-medium text-foreground"
      >
        {user.nickname}
      </Link>
      <div className="opacity-0 transition-opacity group-hover:opacity-100">
        <FollowButton
          profileUserId={user.id}
          isFollowingInitially={isFollowing}
        />
      </div>
    </div>
  );
};
