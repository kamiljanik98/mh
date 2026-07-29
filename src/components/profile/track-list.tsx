"use client";

import { Song } from "@/types";
import { useOnPlay } from "@/hooks/player/use-on-play";
import { Card } from "@/components/songs/card";

type TrackListProps = {
  songs: Song[];
};

export const TrackList = ({ songs }: TrackListProps) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return (
      <p className="text-sm text-muted-foreground">No tracks uploaded yet</p>
    );
  }

  return (
    <div className="flex flex-col">
      {songs.map((song) => (
        <Card
          key={song.id}
          song={song}
          onPlay={onPlay}
          variant="waveform"
          isLikedInitially={song.isLiked}
        />
      ))}
    </div>
  );
};
