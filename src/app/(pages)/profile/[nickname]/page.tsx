import { getUserSongs } from "@/actions/get-user-songs";
import { ProfileSongGrid } from "@/components/profile/profile-song-grid";
import { getAvatarUrl } from "@/lib/r2/public";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

type ProfilePageProps = {
  params: Promise<{ nickname: string }>;
};
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { nickname } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_url, bio")
    .eq("nickname", nickname.toLowerCase())
    .single();

  if (!profile) notFound();

  const songs = await getUserSongs(profile.id);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10 flex items-center gap-6">
        <Image
          src={getAvatarUrl(profile.avatar_url)}
          alt={profile.nickname ?? "User Avatar"}
          width={96}
          height={96}
          className="size-24 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-foreground">
            {profile.nickname}
          </h1>
          {profile.bio && (
            <p className="max-w-md text-sm text-muted-foreground">
              {profile.bio}
            </p>
          )}
        </div>
      </div>
      <h2 className="mb-4 text-lg font-semibold text-neutral-100">Tracks</h2>
      <ProfileSongGrid songs={songs} />
    </div>
  );
}
