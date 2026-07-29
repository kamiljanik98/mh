import { createClient } from "@/lib/supabase/server";

export const getSongById = async (id: string) => {
  const supabase = await createClient();

  const { data: song, error } = await supabase
    .from("songs")
    .select(
      `*, profiles!uploaded_by(nickname, avatar_url), stems(id, category, path)`,
    )
    .eq("id", id)
    .single();

  return { song, error };
};
