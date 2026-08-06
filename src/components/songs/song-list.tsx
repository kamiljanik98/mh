"use client";

import { useOnPlay } from "@/hooks/player/use-on-play";
import { Card } from "./card";
import { Song } from "@/types";

type SongListProps = {
  songs: Song[];
};

export function SongList({ songs }: SongListProps) {
  const onPlay = useOnPlay(songs);

  if (!songs.length) return null;

  return (
    <div className="flex flex-col gap-2.5 w-fit">
      {songs.map((song) => (
        <Card
          key={song.id}
          song={song}
          onPlay={onPlay}
          variant="row"
          postedAt={song.created_at}
          isLikedInitially={song.isLiked}
        />
      ))}
    </div>
  );
}
