"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types";
import { useOnPlay } from "@/hooks/player/use-on-play";
import { Card } from "@/components/songs/card";

type LikedSongsListProps = {
  songs: Song[];
};

export function LikedSongsList({ songs: initialSongs }: LikedSongsListProps) {
  const [songs, setSongs] = useState(initialSongs);
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  if (!songs.length) return null;

  return (
    <div className="flex flex-col gap-1">
      {songs.map((song) => (
        <Card
          key={song.id}
          song={song}
          onPlay={onPlay}
          variant="row"
          isLikedInitially={song.isLiked}
          onLikeToggle={(isLiked) => {
            if (!isLiked) {
              setSongs((prev) => prev.filter((s) => s.id !== song.id));
            }
          }}
        />
      ))}
    </div>
  );
}
