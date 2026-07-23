"use server";

import { createClient } from "@/lib/supabase/server";
import { Song } from "@/types";

type GetSongsResult = { data: Song[]; error: Error | null };

export const getSongs = async (title?: string): Promise<GetSongsResult> => {
  const supabase = await createClient();

  let query = supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (title) {
    const pattern = `%${title}%`;
    query = query.or(
      `title.ilike.${pattern},genre.ilike.${pattern},scale.ilike.${pattern},tags.cs.{${title}}`,
    );
  }

  const { data, error } = await query;

  return { data: data ?? [], error };
};
