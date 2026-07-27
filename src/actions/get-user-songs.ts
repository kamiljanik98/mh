import { createClient } from "@/lib/supabase/server";
import { Song } from "@/types";

export async function getUserSongs(userId: string): Promise<Song[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("uploaded_by", userId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((song) => ({ ...song, profiles: null }));
}
