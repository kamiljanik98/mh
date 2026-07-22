"use client";

import Image from "next/image";
import type { Song } from "@/types";
import { getCoverUrl } from "@/lib/r2/public";

interface CardProps {
  song: Song;
  onPlay: (id: string) => void;
}

export const Card = ({ song, onPlay }: CardProps) => {
  return (
    <div
      onClick={() => onPlay(song.id)}
      className="flex flex-col gap-2 p-3 rounded-md bg-foreground hover:bg-neutral-900 cursor-pointer transition"
    >
      <Image
        src={getCoverUrl(song.image_path)}
        alt={song.title}
        width={160}
        height={160}
        className="rounded-md object-cover aspect-square"
      />
      <p className="text-sm font-semibold truncate">{song.title}</p>
      <p className="text-xs text-muted-foreground truncate">
        {song.profiles?.nickname}
      </p>
    </div>
  );
};
