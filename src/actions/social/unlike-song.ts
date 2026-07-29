"use server";

import { createClient } from "@/lib/supabase/server";

export const unlikeSong = async (songId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return { error: new Error("Not authenticated") };

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", user.id)
    .eq("song_id", songId);

  return { error };
};
