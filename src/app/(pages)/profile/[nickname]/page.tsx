import { getUserSongs } from "@/actions/songs/get-user-songs";
import { TrackList } from "@/components/profile/track-list";
import { EditProfileDialog } from "@/components/profile/edit/edit-profile-dialog";
import { getAvatarUrl } from "@/lib/r2/public";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/social/share-button";
import { FollowButton } from "@/components/social/follow-button";
import { SuggestedUsers } from "@/components/social/suggested-users";
import { getProfileByNickname } from "@/actions/profile/get-profile-by-nickname";
import { getFollowStatus } from "@/actions/social/get-follow-status";
import { getLikedSongs } from "@/actions/songs/get-liked-songs";
import { LikedSongsList } from "@/components/profile/liked-songs-list";

type ProfilePageProps = {
  params: Promise<{ nickname: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { nickname } = await params;
  const { profile } = await getProfileByNickname(nickname);
  const supabase = await createClient();

  if (!profile) notFound();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  const isOwnProfile = currentUser?.id === profile.id;

  const [songs, likedSongs, { isFollowing }] = await Promise.all([
    getUserSongs(profile.id),
    getLikedSongs(profile.id),
    isOwnProfile
      ? Promise.resolve({ isFollowing: false })
      : getFollowStatus(profile.id),
  ]);

  return (
    <div className="px-6 py-10">
      <div className="mb-10 flex items-center gap-6">
        <Image
          src={getAvatarUrl(profile.avatar_url)}
          alt={profile.nickname ?? "User Avatar"}
          width={96}
          height={96}
          className="size-24 rounded-full object-cover"
        />
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-xl font-semibold text-foreground">
            {profile.nickname}
          </h1>
          {profile.bio && (
            <p className="max-w-md text-sm text-muted-foreground">
              {profile.bio}
            </p>
          )}
        </div>
        <p className="text-xs">Since {profile.created_at.slice(0, 4)}</p>
        <div className="flex shrink-0 items-center gap-2">
          {isOwnProfile ? (
            <EditProfileDialog />
          ) : (
            <>
              <FollowButton
                profileUserId={profile.id}
                isFollowingInitially={isFollowing}
              />
              <ShareButton path={`/profile/${profile.nickname}`} />
            </>
          )}
        </div>
      </div>

      <div className="flex gap-10">
        <div className="min-w-0 flex-1">
          <h2 className="mb-4 text-lg font-semibold text-neutral-100">
            Tracks
          </h2>
          <TrackList songs={songs} />
        </div>

        <aside className="flex w-72 shrink-0 flex-col gap-8">
          <SuggestedUsers excludeUserId={profile.id} />

          {likedSongs.data.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-neutral-100">
                Likes
              </h2>
              <LikedSongsList songs={likedSongs.data} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
