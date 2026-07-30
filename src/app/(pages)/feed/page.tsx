import { redirect } from "next/navigation";
import { getFollowedArtistsSongs } from "@/actions/songs/get-followed-artists-songs";
import { SuggestedUsers } from "@/components/social/suggested-users";
import { createClient } from "@/lib/supabase/server";
import { FeedSongList } from "@/components/feed/song-list";

export default async function FeedPage() {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) redirect("/");

  const { data: songs, error } = await getFollowedArtistsSongs();

  if (error) {
    return <p className="text-destructive">Failed to load feed.</p>;
  }

  if (songs.length === 0) {
    return (
      <div>
        <p className="text-muted-foreground">
          You&apos;re not following anyone yet — follow some artists to see
          their tracks here.
        </p>
        <SuggestedUsers excludeUserId={currentUser.id} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <FeedSongList songs={songs} />
    </div>
  );
}
