"use client";

import { Button } from "@/components/ui/button";
import { useFollow } from "@/hooks/social/use-follow";

type FollowButtonProps = {
  profileUserId: string;
  isFollowingInitially?: boolean;
};

export function FollowButton({
  profileUserId,
  isFollowingInitially = false,
}: FollowButtonProps) {
  const { isFollowing, isLoading, toggle } = useFollow(
    profileUserId,
    isFollowingInitially,
  );

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      size="sm"
      disabled={isLoading}
      onClick={toggle}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
