import { createClient } from "@/lib/supabase/server";
import { Song } from "@/types";
import { attachIsLiked } from "./attach-is-liked";

export async function getUserSongs(userId: string): Promise<Song[]> {
  const supabase = await createClient();

  const { data: songs, error } = await supabase
    .from("songs")
    .select("*, profiles!uploaded_by(nickname, avatar_url)")
    .eq("uploaded_by", userId);

  if (error || !songs) return [];

  return attachIsLiked(supabase, songs);
}
