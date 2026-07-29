"use server";

import { createClient } from "@/lib/supabase/server";
import { Song } from "@/types";

type GetSongsResult = { data: Song[]; error: Error | null };

export const getSongs = async (title?: string): Promise<GetSongsResult> => {
  const supabase = await createClient();

  let query = supabase
    .from("songs")
    .select("*, profiles!uploaded_by(nickname, avatar_url)")
    .order("created_at", { ascending: false });

  if (title) {
    const pattern = `%${title}%`;
    query = query.or(
      `title.ilike.${pattern},genre.ilike.${pattern},scale.ilike.${pattern},tags.cs.{${title}}`,
    );
  }

  const { data, error } = await query;

  if (error || !data) return { data: [], error };

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    return { data: data.map((s) => ({ ...s, isLiked: false })), error: null };
  }

  const { data: likes } = await supabase
    .from("likes")
    .select("song_id")
    .eq("user_id", currentUser.id)
    .in(
      "song_id",
      data.map((s) => s.id),
    );

  const likedIds = new Set(likes?.map((l) => l.song_id));

  return {
    data: data.map((s) => ({ ...s, isLiked: likedIds.has(s.id) })),
    error: null,
  };
};
