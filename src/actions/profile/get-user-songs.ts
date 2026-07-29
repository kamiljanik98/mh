import { createClient } from "@/lib/supabase/server";
import { Song } from "@/types";

export async function getUserSongs(userId: string): Promise<Song[]> {
  const supabase = await createClient();

  const { data: songs, error } = await supabase
    .from("songs")
    .select("*, profiles!uploaded_by(nickname, avatar_url)")
    .eq("uploaded_by", userId);

  if (error || !songs) return [];

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) return songs.map((s) => ({ ...s, isLiked: false }));

  const { data: likes } = await supabase
    .from("likes")
    .select("song_id")
    .eq("user_id", currentUser.id)
    .in(
      "song_id",
      songs.map((s) => s.id),
    );

  const likedIds = new Set(likes?.map((l) => l.song_id));
  return songs.map((s) => ({ ...s, isLiked: likedIds.has(s.id) }));
}
