"use client";

import { Song } from "@/types";
import { useOnPlay } from "@/hooks/player/use-on-play";
import { WaveformCard } from "./waveform-card";

type ProfileSongGridProps = {
  songs: Song[];
};

export const ProfileSongGrid = ({ songs }: ProfileSongGridProps) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return (
      <p className="text-sm text-muted-foreground">No tracks uploaded yet</p>
    );
  }

  return (
    <div className="flex flex-col">
      {songs.map((song) => (
        <WaveformCard key={song.id} song={song} onPlay={onPlay} />
      ))}
    </div>
  );
};
