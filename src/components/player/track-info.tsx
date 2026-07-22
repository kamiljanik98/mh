import Image from "next/image";
import type { Song } from "@/types";
import { getCoverUrl } from "@/lib/r2/public";

interface TrackInfoProps {
  song: Song;
}

export function TrackInfo({ song }: TrackInfoProps) {
  return (
    <div className="flex items-center gap-3">
      {song.image_path && (
        <Image
          src={getCoverUrl(song.image_path)}
          alt={song.title}
          width={48}
          height={48}
          className="rounded"
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{song.title}</span>
        <span className="text-xs text-muted-foreground">
          {song.profiles?.nickname ?? "Unknown"}
        </span>
      </div>
    </div>
  );
}
