"use server";

import { createClient } from "@/lib/supabase/server";

export const likeSong = async (songId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { isLiked: false };

  const { data } = await supabase
    .from("likes")
    .select("user_id")
    .eq("user_id", user.id)
    .eq("song_id", songId)
    .maybeSingle();

  return { isLiked: !!data };
};
