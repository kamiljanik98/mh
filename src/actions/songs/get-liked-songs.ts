"use server";

import { createClient } from "@/lib/supabase/server";
import { Song } from "@/types";

type GetLikedSongsResult = { data: Song[]; error: Error | null };

export const getLikedSongs = async (
  profileUserId: string,
): Promise<GetLikedSongsResult> => {
  const supabase = await createClient();

  const { data: likes, error } = await supabase
    .from("likes")
    .select(
      "song_id, songs!inner(*, profiles!uploaded_by(nickname, avatar_url))",
    )
    .eq("user_id", profileUserId)
    .order("created_at", { ascending: false });

  if (error || !likes) return { data: [], error };

  const songs = likes
    .map((l) => (Array.isArray(l.songs) ? l.songs[0] : l.songs))
    .filter((s): s is Song => Boolean(s));

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    return { data: songs.map((s) => ({ ...s, isLiked: false })), error: null };
  }

  const { data: currentUserLikes } = await supabase
    .from("likes")
    .select("song_id")
    .eq("user_id", currentUser.id)
    .in(
      "song_id",
      songs.map((s) => s.id),
    );

  const likedIds = new Set(currentUserLikes?.map((l) => l.song_id));

  return {
    data: songs.map((s) => ({ ...s, isLiked: likedIds.has(s.id) })),
    error: null,
  };
};
