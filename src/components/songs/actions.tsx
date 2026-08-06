import { LikeButton } from "@/components/social/like-button";
import { ShareButton } from "@/components/social/share-button";

type ActionsProps = {
  songId: string;
  isLikedInitially?: boolean;
};

export function Actions({ songId, isLikedInitially = false }: ActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <LikeButton songId={songId} isLikedInitially={isLikedInitially} />
      <ShareButton path={`/songs/${songId}`} iconOnly />
    </div>
  );
}
