"use server";

import { createClient } from "@/lib/supabase/server";

export const followUser = async (targetUserId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return { error: new Error("Not authenticated") };
  if (user.id === targetUserId)
    return { error: new Error("Cannot follow yourself") };

  const { error } = await supabase
    .from("follows")
    .insert({ follower_id: user.id, following_id: targetUserId });

  return { error };
};
