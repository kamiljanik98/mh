"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { likeSong } from "@/actions/social/like-song";
import { unlikeSong } from "@/actions/social/unlike-song";

export function useLike(
  songId: string,
  isLikedInitially: boolean,
  onToggle?: (isLiked: boolean) => void,
) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(isLikedInitially);

  async function toggle() {
    const next = !isLiked;
    setIsLiked(next);
    onToggle?.(next);

    const { error } = next ? await likeSong(songId) : await unlikeSong(songId);

    if (error) {
      setIsLiked(!next);
      onToggle?.(!next);
      toast.error(error.message);
      return;
    }

    router.refresh();
  }

  return { isLiked, toggle };
}
