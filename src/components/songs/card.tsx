"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import type { Song } from "@/types";
import { getCoverUrl } from "@/lib/r2/public";
import Link from "next/link";

interface CardProps {
  song: Song;
  onPlay: (id: string) => void;
}

export const Card = ({ song, onPlay }: CardProps) => {
  const meta = [song.bpm && `${song.bpm} BPM`, song.scale, song.genre]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className=" group/card flex flex-col gap-2 rounded-md transition">
      <Link
        href={`/profile/${song.profiles?.nickname ?? ""}`}
        className="w-fit"
      >
        <p className="truncate text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
          {song.profiles?.nickname ?? "Unknown"}
        </p>
      </Link>
      <div className="relative">
        <Image
          src={getCoverUrl(song.image_path)}
          alt={song.title}
          width={160}
          height={160}
          className="aspect-square w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 opacity-0 transition-opacity group-hover/card:opacity-100">
          <button
            onClick={() => onPlay(song.id)}
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
            aria-label={`Play ${song.title}`}
          >
            <Play className="ml-0.5 size-4" fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="truncate text-xs font-semibold text-foreground">
          {song.title}
        </p>

        {!meta ? (
          <p className="truncate text-xs text-muted-foreground">No data...</p>
        ) : (
          <p className="truncate text-xs text-muted-foreground">{meta}</p>
        )}
      </div>
    </div>
  );
};
