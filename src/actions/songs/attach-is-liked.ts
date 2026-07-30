import { Song } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const attachIsLiked = async (
  supabase: SupabaseClient,
  songs: Song[],
): Promise<Song[]> => {
  if (songs.length === 0) return songs;

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    return songs.map((s) => ({ ...s, isLiked: false }));
  }

  const { data: likes } = await supabase
    .from("likes")
    .select("song_id")
    .eq("user_id", currentUser.id)
    .in(
      "song_id",
      songs.map((s) => s.id),
    );

  const likedIds = new Set(likes?.map((i) => i.song_id));

  return songs.map((s) => ({ ...s, isLiked: likedIds.has(s.id) }));
};
