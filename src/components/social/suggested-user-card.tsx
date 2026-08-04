import Image from "next/image";
import Link from "next/link";
import { getAvatarUrl } from "@/lib/r2/public";
import { FollowButton } from "@/components/social/follow-button";
import { getFollowStatus } from "@/actions/social/get-follow-status";

export async function SuggestedUserCard({
  user,
}: {
  user: { id: string; nickname: string | null; avatar_url: string | null };
}) {
  const { isFollowing } = await getFollowStatus(user.id);

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
