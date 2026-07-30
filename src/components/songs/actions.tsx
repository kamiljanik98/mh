import { LikeButton } from "@/components/social/like-button";
import { ShareButton } from "@/components/social/share-button";

type ActionsProps = {
  songId: string;
  size?: "sm" | "default";
  isLikedInitially?: boolean;
  onLikeToggle?: (isLiked: boolean) => void;
};

export function Actions({
  songId,
  isLikedInitially = false,
  onLikeToggle,
}: ActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <LikeButton
        songId={songId}
        isLikedInitially={isLikedInitially}
        onToggle={onLikeToggle}
      />
      <ShareButton path={`/songs/${songId}`} iconOnly />
    </div>
  );
}
