import { getLikedSongs } from "@/actions/songs/get-liked-songs";
import { SongList } from "@/components/songs/song-list";
import { createClient } from "@/lib/supabase/server";
import { AuthGate } from "@/components/auth/auth-gate";
import { getFollowedUsers } from "@/actions/social/get-followed-users";
import { ProfileGrid } from "@/components/social/profile-grid";

export default async function LibraryPage() {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    return <AuthGate message="Sign in to see your library." />;
  }

  const { data: likedSongs, error: likedError } = await getLikedSongs(
    currentUser.id,
  );
  const { data: followedUsers, error: followedError } = await getFollowedUsers(
    currentUser.id,
  );

  if (likedError) {
    return <p className="text-destructive">Failed to load liked songs</p>;
  }

  if (followedError) {
    return <p className="text-destructive">Failed to load followed users</p>;
  }

  return (
    <>
      <div className="text-sm text-foreground">
        <div>
          <h2 className="text-lg font-semibold text-neutral-100 py-8">Likes</h2>
          <SongList songs={likedSongs} />
        </div>
        <ProfileGrid title="Following" users={followedUsers} />
      </div>
    </>
  );
}
