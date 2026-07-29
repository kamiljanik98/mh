"use server";

import { createClient } from "@/lib/supabase/server";

export const unfollowUser = async (targetUserId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return { error: new Error("Not authenticated") };

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", targetUserId);

  return { error };
};
