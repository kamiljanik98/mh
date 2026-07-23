"use client";

import { useOnPlay } from "@/hooks/player/use-on-play";
import { Song } from "@/types";

type SearchContentProps = {
  songs: Song[];
  title?: string;
};

export const SearchContent = ({ songs, title }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-semibold text-background">
        {title ? `Search results for "${title}"` : "All tracks"}
      </h1>
      {songs.length === 0 ? (
        <p className="text-sm text-muted-background">No results found</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {songs.map((song) => (
            <li
              key={song.id}
              className="cursor-pointer rounded-md px-3 py-2 text-sm text-background hover:bg-muted"
              onClick={() => onPlay(song.id)}
            >
              {song.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
