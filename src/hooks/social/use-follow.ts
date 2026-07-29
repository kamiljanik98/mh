import { followUser } from "@/actions/social/follow-user";
import { unfollowUser } from "@/actions/social/unfollow-user";
import { useState } from "react";
import { toast } from "sonner";

export function useFollow(targetUserId: string, isFollowingInitially: boolean) {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitially);
  const [isLoading, setIsLoading] = useState(false);

  async function toggle() {
    const next = !isFollowing;
    setIsFollowing(next);
    setIsLoading(true);

    const { error } = next
      ? await followUser(targetUserId)
      : await unfollowUser(targetUserId);

    setIsLoading(false);

    if (error) {
      setIsFollowing(!next);
      toast.error(error.message);
    }
  }

  return { isFollowing, isLoading, toggle };
}
