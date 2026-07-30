"use client";

import { useOnPlay } from "@/hooks/player/use-on-play";
import { useEffect, useState } from "react";
import { Card } from "./card";
import { Song } from "@/types";

type SongListProps = {
  songs: Song[];
  removeOnUnlike?: boolean;
};

export function SongList({
  songs: initialSongs,
  removeOnUnlike,
}: SongListProps) {
  const [songs, setSongs] = useState(initialSongs);
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  if (!songs.length) return null;

  return (
    <div>
      {songs.map((song) => (
        <Card
          key={song.id}
          song={song}
          onPlay={onPlay}
          variant="row"
          postedAt={song.created_at}
          isLikedInitially={song.isLiked}
          onLikeToggle={
            removeOnUnlike
              ? (isLiked) => {
                  if (!isLiked) {
                    setSongs((prev) => prev.filter((s) => s.id !== song.id));
                  }
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}
