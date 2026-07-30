"use client";

import { Song } from "@/types";
import { Card } from "@/components/songs/card";
import { useOnPlay } from "@/hooks/player/use-on-play";

export function FeedSongList({ songs }: { songs: Song[] }) {
  const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col gap-1">
      {songs.map((song) => (
        <Card
          key={song.id}
          song={song}
          onPlay={onPlay}
          variant="row"
          postedAt={song.created_at}
        />
      ))}
    </div>
  );
}
