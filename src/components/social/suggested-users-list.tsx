import { getSuggestedUsers } from "@/actions/social/get-suggested-users";
import { SuggestedUserCard } from "./suggested-user-card";

export async function SuggestedUsersList({
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
