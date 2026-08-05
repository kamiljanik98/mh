import { FollowedUserCard } from "./followed-user-card";
import { FollowedProfile } from "@/types";

export async function FollowedUsersList({
  users,
}: {
  users: FollowedProfile[];
}) {
  if (!users.length) return null;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-neutral-100 py-8">Following</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {users.map((user) => (
          <FollowedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
