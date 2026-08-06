"use server";

import { createClient } from "@/lib/supabase/server";

export const getProfileByNickname = async (nickname: string) => {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_url, bio, created_at")
    .eq("nickname", nickname.toLowerCase())
    .single();

  return { profile, error };
};
