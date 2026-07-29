"use server";

import { createClient } from "@/lib/supabase/server";

export const getIsFollowing = async (targetUserId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { isFollowing: false };

  const { data } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("follower_id", user.id)
    .eq("following_id", targetUserId)
    .maybeSingle();

  return { isFollowing: !!data };
};
