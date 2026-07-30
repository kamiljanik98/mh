"use server";

import { createClient } from "@/lib/supabase/server";
import { UserProfile } from "@/types";

type FollowedProfile = Pick<UserProfile, "id" | "nickname" | "avatar_url">;

type GetFollowingResult = { data: FollowedProfile[]; error: Error | null };

export const getFollowing = async (
  userId: string,
): Promise<GetFollowingResult> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("follows")
    .select("profiles!following_id(id, nickname, avatar_url)")
    .eq("follower_id", userId);

  if (error || !data) return { data: [], error };

  const profiles = data
    .map((f) => (Array.isArray(f.profiles) ? f.profiles[0] : f.profiles))
    .filter((p): p is FollowedProfile => Boolean(p));

  return { data: profiles, error: null };
};
