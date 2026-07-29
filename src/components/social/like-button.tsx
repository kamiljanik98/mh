"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLike } from "@/hooks/social/use-like";

type LikeButtonProps = {
  songId: string;
  isLikedInitially?: boolean;
  onToggle?: (isLiked: boolean) => void;
};

export function LikeButton({
  songId,
  isLikedInitially = false,
  onToggle,
}: LikeButtonProps) {
  const { isLiked, toggle } = useLike(songId, isLikedInitially, onToggle);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    toggle();
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isLiked ? "Unlike" : "Like"}
      className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
    >
      <Heart className={cn("size-4", isLiked && "fill-primary text-primary")} />
    </button>
  );
}
