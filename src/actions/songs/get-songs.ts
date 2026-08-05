"use server";

import { createClient } from "@/lib/supabase/server";
import { Song } from "@/types";
import { attachIsLiked } from "@/lib/attach-is-liked";

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

  return { data: await attachIsLiked(supabase, data), error: null };
};
