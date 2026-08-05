import { ProfileCard } from "./profile-card";
import { ProfileSummary } from "@/types";

type ProfileListProps = {
  users: ProfileSummary[];
  title: string;
};

export const ProfileList = ({ users, title }: ProfileListProps) => {
  if (!users.length) return null;

  return (
    <div className="mb-10 flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <ProfileCard variant="row" key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
