// components/social/suggested-users.tsx
import Image from "next/image";
import Link from "next/link";
import { getSuggestedUsers } from "@/actions/social/get-suggested-users";
import { getAvatarUrl } from "@/lib/r2/public";
import { FollowButton } from "@/components/social/follow-button";
import { getIsFollowing } from "@/actions/social/get-is-following";

export async function SuggestedUsers({
  excludeUserId,
}: {
  excludeUserId: string;
}) {
  const { users } = await getSuggestedUsers(excludeUserId);
  if (!users.length) return null;

  return (
    <div className="mb-10 flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-neutral-100">
        Suggested for you
      </h2>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <SuggestedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

async function SuggestedUserCard({
  user,
}: {
  user: { id: string; nickname: string | null; avatar_url: string | null };
}) {
  const { isFollowing } = await getIsFollowing(user.id);

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
