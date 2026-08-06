import Image from "next/image";
import type { Song } from "@/types";
import { getCoverUrl } from "@/lib/r2/public";

interface TrackInfoProps {
  song: Song;
}

export function TrackInfo({ song }: TrackInfoProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Image
        src={getCoverUrl(song.image_path)}
        alt={song.title}
        width={56}
        height={56}
        className="size-14 shrink-0 rounded-sm object-cover"
      />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-foreground">
          {song.title}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {song.profiles?.nickname ?? "Unknown"}
        </span>
      </div>
    </div>
  );
}
