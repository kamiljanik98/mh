import { getFollowing } from "@/actions/social/get-following";
import { FollowedUserCard } from "./followed-user-card";

export async function FollowedUsersList({ userId }: { userId: string }) {
  const { data: profiles } = await getFollowing(userId);
  if (!profiles.length) return null;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-neutral-100 py-8">Following</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {profiles.map((user) => (
          <FollowedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
