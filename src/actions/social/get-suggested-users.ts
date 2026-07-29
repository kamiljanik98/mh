"use server";

import { createClient } from "@/lib/supabase/server";

const SUGGESTION_LIMIT = 4;

export const getSuggestedUsers = async (excludeUserId: string) => {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const excludeIds = [excludeUserId];
  if (currentUser) {
    excludeIds.push(currentUser.id);
    const { data: following } = await supabase
      .from("follows")
      .select("following_id")
      .eq("follower_id", currentUser.id);
    excludeIds.push(...(following?.map((f) => f.following_id) ?? []));
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_url")
    .not("id", "in", `(${excludeIds.join(",")})`)
    .limit(SUGGESTION_LIMIT * 3);

  if (error || !data) return { users: [] };

  const shuffled = [...data].sort(() => Math.random() - 0.5);
  return { users: shuffled.slice(0, SUGGESTION_LIMIT) };
};
