"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import type { Song } from "@/types";
import { getAvatarUrl, getCoverUrl } from "@/lib/r2/public";

interface RowProps {
  song: Song;
  onPlay: (id: string) => void;
}

export const Row = ({ song, onPlay }: RowProps) => {
  const meta = [song.bpm && `${song.bpm} BPM`, song.scale, song.genre]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className=" group/row flex items-center gap-3 rounded-md p-2 transition hover:bg-neutral-800">
      <div className="relative shrink-0">
        <Image
          src={getCoverUrl(song.image_path)}
          alt={song.title}
          width={48}
          height={48}
          className="size-12 rounded-sm object-cover"
        />
        <button
          onClick={() => onPlay(song.id)}
          className="absolute inset-0 flex items-center justify-center rounded-sm bg-black/50 opacity-0 transition-opacity group-hover/row:opacity-100"
          aria-label={`Play ${song.title}`}
        >
          <Play
            className="cursor-pointer size-6 text-foreground"
            fill="currentColor"
          />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm font-medium text-foreground">
          {song.title}
        </p>
        <div className="flex items-center gap-1.5">
          <Image
            src={getAvatarUrl(song.profiles?.avatar_url ?? null)}
            alt={song.profiles?.nickname ?? "Unknown"}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="cursor-pointer truncate text-xs text-muted-foreground">
            {song.profiles?.nickname ?? "Unknown"}
          </p>
        </div>
      </div>

      {meta && (
        <p className="hidden shrink-0 truncate text-xs text-muted-foreground sm:block">
          {meta}
        </p>
      )}
    </div>
  );
};
