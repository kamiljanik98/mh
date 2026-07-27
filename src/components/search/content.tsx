"use client";

import { useOnPlay } from "@/hooks/player/use-on-play";
import { Song } from "@/types";
import { Row } from "../songs/row";

type ContentProps = {
  songs: Song[];
  title?: string;
};

export const Content = ({ songs, title }: ContentProps) => {
  const onPlay = useOnPlay(songs);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-semibold text-foreground">
        {title ? `Search results for "${title}"` : "All tracks"}
      </h1>
      {songs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No results found</p>
      ) : (
        <div className="flex flex-col">
          {songs.map((song) => (
            <Row key={song.id} song={song} onPlay={onPlay} />
          ))}
        </div>
      )}
    </div>
  );
};
