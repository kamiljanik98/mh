import { getLikedSongs } from "@/actions/songs/get-liked-songs";
import { SongList } from "@/components/songs/song-list";
import { createClient } from "@/lib/supabase/server";
import { AuthGate } from "@/components/auth/auth-gate";
import { getFollowing } from "@/actions/social/get-following";
import { FollowedUsersList } from "@/components/social/followed-users-list";

export default async function LibraryPage() {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    return <AuthGate message="Sign in to see your library." />;
  }

  const { data: likedSongs } = await getLikedSongs(currentUser.id);
  return (
    <>
      <div className="text-sm text-foreground">
        <div>
          <h2 className="text-lg font-semibold text-neutral-100 py-8">Likes</h2>
          <SongList songs={likedSongs} />
        </div>
        <FollowedUsersList userId={currentUser.id} />
      </div>
    </>
  );
}
